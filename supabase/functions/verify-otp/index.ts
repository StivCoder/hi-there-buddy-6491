import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  phoneNumber: string;
  otpCode: string;
}

// Hash OTP code for comparison
async function hashOTP(otp: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, otpCode }: VerifyOTPRequest = await req.json();

    console.log("OTP verification for phone:", phoneNumber);

    // Validate inputs
    if (!phoneNumber || !otpCode || otpCode.length !== 6) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number or OTP code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Hash the provided OTP
    const otpHash = await hashOTP(otpCode);

    // Find the most recent OTP record for this phone
    const { data: otpRecord, error: fetchError } = await supabase
      .from("otp_logins")
      .select("*")
      .eq("phone_number", phoneNumber)
      .eq("verified", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return new Response(
        JSON.stringify({ error: "No OTP found for this phone number" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if OTP is expired
    const expiresAt = new Date(otpRecord.expires_at);
    if (new Date() > expiresAt) {
      return new Response(
        JSON.stringify({ error: "OTP has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check attempt count (max 5 attempts)
    if (otpRecord.attempt_count >= 5) {
      return new Response(
        JSON.stringify({
          error: "Too many failed attempts. Please request a new OTP.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify OTP
    if (otpRecord.otp_code_hash !== otpHash) {
      // Increment attempt count
      await supabase
        .from("otp_logins")
        .update({ attempt_count: otpRecord.attempt_count + 1 })
        .eq("otp_id", otpRecord.otp_id);

      return new Response(
        JSON.stringify({ error: "Invalid OTP code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark OTP as verified
    await supabase
      .from("otp_logins")
      .update({ verified: true })
      .eq("otp_id", otpRecord.otp_id);

    // Check if parent exists with this phone number
    const { data: parent, error: parentError } = await supabase
      .from("parents")
      .select("*, students(*)")
      .eq("phone_number", phoneNumber)
      .single();

    if (parentError || !parent) {
      return new Response(
        JSON.stringify({
          error:
            "No parent account found with this phone number. Please contact the school.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create or get auth session (passwordless)
    let authData;
    if (parent.user_id) {
      // Get existing session
      const { data, error } = await supabase.auth.admin.generateLink({
        type: "magiclink",
        email: parent.email || `${phoneNumber}@albertschool.portal`,
      });
      authData = data;
    } else {
      // Create new user and link to parent
      const { data, error } = await supabase.auth.admin.createUser({
        email: parent.email || `${phoneNumber}@albertschool.portal`,
        phone: phoneNumber,
        email_confirm: true,
        phone_confirm: true,
      });

      if (data.user) {
        // Update parent with user_id
        await supabase
          .from("parents")
          .update({ user_id: data.user.id })
          .eq("parent_id", parent.parent_id);

        // Add parent role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "parent",
        });
      }

      authData = data;
    }

    console.log("OTP verified successfully for:", phoneNumber);

    return new Response(
      JSON.stringify({
        message: "OTP verified successfully",
        parent: {
          parent_id: parent.parent_id,
          full_name: parent.full_name,
          phone_number: parent.phone_number,
          email: parent.email,
          students: parent.students,
        },
        verified: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
