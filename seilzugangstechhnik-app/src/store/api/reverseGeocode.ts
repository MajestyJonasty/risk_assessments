import { LatLng } from "leaflet";
import { LocationArea } from "../../types/riskassessments";

export async function reverseGeocode(latlng: LatLng): Promise<LocationArea> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.address) {
      return {
        id: data.place_id,
        street: data.address.road || "",
        city:
          data.address.city || data.address.town || data.address.village || "",
        postalCode: data.address.postcode || "",
        country: data.address.country || "",
        latlng: new LatLng(parseFloat(data.lat), parseFloat(data.lon)),
      };
    } else {
      // Fallback, falls keine Adresse gefunden wurde
      throw new Error("No address found for the given coordinates.");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    // Gebe ein leeres Objekt oder werfe einen Fehler, wenn das für deine Anwendung sinnvoll ist
    throw error; // oder gebe einen Fallback-Adresswert zurück
  }
}

export async function geocode(searchTerm: string): Promise<LocationArea> {
  if (searchTerm === "" || searchTerm.length === 0) {
    throw new Error("No search term provided.");
  }
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    searchTerm
  )}`;

  try {
    const response = await fetch(url);
    const results = await response.json();

    if (results.length > 0) {
      const firstResult = results[0];
      return {
        id: firstResult.place_id,
        street: firstResult.display_name.split(", ")[0] || "",
        city: firstResult.display_name.split(", ")[4] || "",
        postalCode: firstResult.display_name.split(", ")[5] || "",
        country: firstResult.display_name.split(", ")[6] || "",
        latlng: new LatLng(
          parseFloat(firstResult.lat),
          parseFloat(firstResult.lon)
        ),
      };
    } else {
      // Fallback, falls keine Daten gefunden wurden
      throw new Error("No results found for the search term.");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error; // Werfen des Fehlers weiter oder Rückgabe eines Fallback-Wertes
  }
}
