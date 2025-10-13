import React from 'react';
import { MapPin } from 'lucide-react';

const Map = () => {
  // Accurate coordinates for Kutus, Kirinyaga County, Kenya
  // Kutus town center coordinates
  const latitude = -0.6667;
  const longitude = 37.4328;
  
  // Google Maps directions link
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center gap-4 p-6 border border-border">
      <MapPin className="w-12 h-12 text-primary" />
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-2">Albert School, Kutus</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Next to County Government HQ<br />
          Kutus, Kirinyaga County, Kenya
        </p>
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default Map;
