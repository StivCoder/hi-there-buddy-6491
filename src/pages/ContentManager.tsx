import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Trash2, Plus, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';

const ContentManager = () => {
  const [features, setFeatures] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any[]>([]);
  const [heroContent, setHeroContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    setLoading(true);
    try {
      const [featuresRes, announcementsRes, settingsRes, heroRes] = await Promise.all([
        supabase.from('features').select('*').order('display_order'),
        supabase.from('announcements').select('*').order('display_order'),
        supabase.from('site_settings').select('*'),
        supabase.from('hero_content').select('*').limit(1).maybeSingle(),
      ]);

      if (featuresRes.data) setFeatures(featuresRes.data);
      if (announcementsRes.data) setAnnouncements(announcementsRes.data);
      if (settingsRes.data) setSiteSettings(settingsRes.data);
      if (heroRes.data) setHeroContent(heroRes.data);
    } catch (error) {
      toast.error('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ setting_value: value })
        .eq('id', id);

      if (error) throw error;
      toast.success('Setting updated successfully');
    } catch (error) {
      toast.error('Error updating setting');
    }
  };

  const addFeature = async () => {
    try {
      const { error } = await supabase.from('features').insert({
        title: 'New Feature',
        description: 'Description here',
        icon_name: 'BookOpen',
        display_order: features.length + 1,
      });

      if (error) throw error;
      toast.success('Feature added');
      fetchAllContent();
    } catch (error) {
      toast.error('Error adding feature');
    }
  };

  const updateFeature = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('features')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast.success('Feature updated');
    } catch (error) {
      toast.error('Error updating feature');
    }
  };

  const deleteFeature = async (id: string) => {
    try {
      const { error } = await supabase.from('features').delete().eq('id', id);
      if (error) throw error;
      toast.success('Feature deleted');
      fetchAllContent();
    } catch (error) {
      toast.error('Error deleting feature');
    }
  };

  const addAnnouncement = async () => {
    try {
      const { error } = await supabase.from('announcements').insert({
        title: 'New Announcement',
        content: 'Content here',
        date: new Date().toISOString().split('T')[0],
        display_order: announcements.length + 1,
      });

      if (error) throw error;
      toast.success('Announcement added');
      fetchAllContent();
    } catch (error) {
      toast.error('Error adding announcement');
    }
  };

  const updateAnnouncement = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast.success('Announcement updated');
    } catch (error) {
      toast.error('Error updating announcement');
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;
      toast.success('Announcement deleted');
      fetchAllContent();
    } catch (error) {
      toast.error('Error deleting announcement');
    }
  };

  const updateHeroContent = async (updates: any) => {
    try {
      if (heroContent?.id) {
        const { error } = await supabase
          .from('hero_content')
          .update(updates)
          .eq('id', heroContent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('hero_content').insert(updates);
        if (error) throw error;
      }
      toast.success('Hero content updated');
      fetchAllContent();
    } catch (error) {
      toast.error('Error updating hero content');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Loading content manager...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Content Manager</h1>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {siteSettings.map((setting) => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.setting_key}>
                    {setting.setting_key.replace(/_/g, ' ').toUpperCase()}
                  </Label>
                  {setting.setting_type === 'textarea' ? (
                    <Textarea
                      id={setting.setting_key}
                      value={setting.setting_value}
                      onChange={(e) => {
                        const updated = siteSettings.map((s) =>
                          s.id === setting.id ? { ...s, setting_value: e.target.value } : s
                        );
                        setSiteSettings(updated);
                      }}
                      rows={4}
                    />
                  ) : (
                    <Input
                      id={setting.setting_key}
                      value={setting.setting_value}
                      onChange={(e) => {
                        const updated = siteSettings.map((s) =>
                          s.id === setting.id ? { ...s, setting_value: e.target.value } : s
                        );
                        setSiteSettings(updated);
                      }}
                    />
                  )}
                  <Button
                    size="sm"
                    onClick={() => updateSetting(setting.id, setting.setting_value)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={heroContent?.title || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={heroContent?.subtitle || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={heroContent?.description || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input
                    value={heroContent?.cta_primary_text || ''}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, cta_primary_text: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Button Link</Label>
                  <Input
                    value={heroContent?.cta_primary_link || ''}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, cta_primary_link: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={heroContent?.cta_secondary_text || ''}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, cta_secondary_text: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Link</Label>
                  <Input
                    value={heroContent?.cta_secondary_link || ''}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, cta_secondary_link: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => updateHeroContent(heroContent)}>
                <Save className="w-4 h-4 mr-2" />
                Save Hero Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Features</h3>
            <Button onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Feature</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFeature(feature.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Title"
                    value={feature.title}
                    onChange={(e) => {
                      const updated = features.map((f) =>
                        f.id === feature.id ? { ...f, title: e.target.value } : f
                      );
                      setFeatures(updated);
                    }}
                  />
                  <Textarea
                    placeholder="Description"
                    value={feature.description}
                    onChange={(e) => {
                      const updated = features.map((f) =>
                        f.id === feature.id ? { ...f, description: e.target.value } : f
                      );
                      setFeatures(updated);
                    }}
                    rows={3}
                  />
                  <Input
                    placeholder="Icon Name (e.g., BookOpen)"
                    value={feature.icon_name}
                    onChange={(e) => {
                      const updated = features.map((f) =>
                        f.id === feature.id ? { ...f, icon_name: e.target.value } : f
                      );
                      setFeatures(updated);
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => updateFeature(feature.id, feature)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Announcements</h3>
            <Button onClick={addAnnouncement}>
              <Plus className="w-4 h-4 mr-2" />
              Add Announcement
            </Button>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Announcement</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Title"
                    value={announcement.title}
                    onChange={(e) => {
                      const updated = announcements.map((a) =>
                        a.id === announcement.id ? { ...a, title: e.target.value } : a
                      );
                      setAnnouncements(updated);
                    }}
                  />
                  <Input
                    type="date"
                    value={announcement.date}
                    onChange={(e) => {
                      const updated = announcements.map((a) =>
                        a.id === announcement.id ? { ...a, date: e.target.value } : a
                      );
                      setAnnouncements(updated);
                    }}
                  />
                  <Textarea
                    placeholder="Content"
                    value={announcement.content}
                    onChange={(e) => {
                      const updated = announcements.map((a) =>
                        a.id === announcement.id ? { ...a, content: e.target.value } : a
                      );
                      setAnnouncements(updated);
                    }}
                    rows={3}
                  />
                  <Button
                    size="sm"
                    onClick={() => updateAnnouncement(announcement.id, announcement)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;