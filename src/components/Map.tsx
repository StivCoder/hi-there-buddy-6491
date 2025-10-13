import React from 'react';

const Map = () => {
  // School coordinates: Kutus, Kirinyaga County
  const latitude = -0.6667;
  const longitude = 37.4328;
  
  // Create Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDAnMDAuMSJTIDM3wrAyNScyOC4xIkU!5e0!3m2!1sen!2ske!4v1234567890`;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Albert School Location"
      />
    </div>
  );
};

export default Map;
