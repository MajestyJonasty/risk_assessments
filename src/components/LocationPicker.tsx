import { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng, Map as LeafletMap } from "leaflet";

interface LocationPickerProps {
  onLocationSelect: (location: LatLng) => void;
  currentLocation?: LatLng;
}

export const LocationPicker = ({
  onLocationSelect,
  currentLocation,
}: LocationPickerProps) => {
  const [position, setPosition] = useState<LatLng | null>(
    currentLocation || null
  );
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    console.log("Current location updated:", currentLocation);
    setPosition(currentLocation || new LatLng(51.03, -13.73));
  }, [currentLocation]);

  useEffect(() => {
    if (position && mapRef.current) {
      mapRef.current.flyTo(position, mapRef.current.getZoom());
    }
  }, [position]);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });

    useEffect(() => {
      mapRef.current = map;
    }, [map]);

    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={position || [51.03, -13.73]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};
