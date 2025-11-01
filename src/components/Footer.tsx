import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [schoolName, setSchoolName] = useState('Albert School, Kutus');
  const [contactInfo, setContactInfo] = useState({
    address: 'Next to County Government HQ, Kutus, Kirinyaga County, Kenya',
    phone: '+254 720 720 659',
    email: 'info@alberschool.ac.ke',
  });

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .in('setting_key', ['school_name', 'school_address', 'school_phone', 'school_email']);

      if (data) {
        const settingsMap = data.reduce((acc: any, curr: any) => {
          acc[curr.setting_key] = curr.setting_value;
          return acc;
        }, {});

        if (settingsMap.school_name) setSchoolName(settingsMap.school_name);
        setContactInfo({
          address: settingsMap.school_address || contactInfo.address,
          phone: settingsMap.school_phone || contactInfo.phone,
          email: settingsMap.school_email || contactInfo.email,
        });
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">{schoolName}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Nurturing Talents, Building Character
            </p>
            <p className="text-sm text-muted-foreground">
              Private Day School offering Playgroup to Grade 9 under the CBC curriculum.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/calendar" className="text-muted-foreground hover:text-primary transition-colors">Calendar</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
          <p className="text-xs">
            Website developed by{' '}
            <a href="tel:+254768539745" className="text-primary hover:underline font-medium">
              Stiv Tech Solutions
            </a>
            {' '}• Contact: 0768 539 745
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
