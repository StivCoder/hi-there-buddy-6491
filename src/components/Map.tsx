import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // School coordinates: Kutus, Kirinyaga County
    const schoolCoordinates: [number, number] = [37.4328, -0.6667];

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: schoolCoordinates,
      zoom: 15,
    });

    // Add marker for the school
    new mapboxgl.Marker({ color: '#0066CC' })
      .setLngLat(schoolCoordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3 style="margin: 0; color: #0066CC;">Albert School, Kutus</h3><p style="margin: 5px 0 0 0;">Next to County Government HQ</p>')
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-64 rounded-lg" />
  );
};

export default Map;
