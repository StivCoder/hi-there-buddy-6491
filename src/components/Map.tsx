import React from 'react';

const Map = () => {
  // Kutus, Kirinyaga County coordinates (near County Government HQ)
  const location = "Kutus, Kirinyaga County, Kenya";
  const encodedLocation = encodeURIComponent(location);
  
  // OpenStreetMap embed using iframe (free, no API key needed)
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=37.4228%2C-0.6767%2C37.4428%2C-0.6567&layer=mapnik&marker=-0.6667%2C37.4328`;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
      <iframe
        src={osmUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        title="Albert School Location - Kutus, Kirinyaga County"
      />
    </div>
  );
};

export default Map;
