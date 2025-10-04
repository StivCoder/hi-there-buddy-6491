import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Alber School, Kutus</h3>
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
                <span className="text-muted-foreground">Next to County Government HQ, Kutus, Kirinyaga County, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+254 720 720 659</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@alberschool.ac.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Alber School, Kutus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
