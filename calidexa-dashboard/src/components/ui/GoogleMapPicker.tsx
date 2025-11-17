import { useState, useCallback, useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC8diofmJR1op6UHzP1ikKOp851Ujk_0yk';

const libraries: ('places' | 'drawing' | 'geometry' | 'marker')[] = ['places', 'marker'];

interface GoogleMapPickerProps {
  value?: {
    lat: number | null;
    lng: number | null;
    address: string | null;
  };
  onChange: (location: { lat: number; lng: number; address: string }) => void;
  error?: string;
}

export const GoogleMapPicker = ({ value, onChange, error }: GoogleMapPickerProps) => {
  const [searchValue, setSearchValue] = useState(value?.address || '');
  const [isMarkerLibraryLoaded, setIsMarkerLibraryLoaded] = useState(false);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const searchBoxInstanceRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Cargar la biblioteca de markers avanzados
  useEffect(() => {
    if (!isLoaded || isMarkerLibraryLoaded) return;

    const loadMarkerLibrary = async () => {
      try {
        await google.maps.importLibrary('marker');
        setIsMarkerLibraryLoaded(true);
      } catch (error) {
        console.error('Error loading marker library:', error);
        // Fallback: usar Marker tradicional si AdvancedMarkerElement no está disponible
        setIsMarkerLibraryLoaded(true);
      }
    };

    loadMarkerLibrary();
  }, [isLoaded, isMarkerLibraryLoaded]);

  // Función para obtener dirección desde coordenadas
  const getAddressFromCoordinates = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstanceRef.current) return;
      
      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            onChange({ lat, lng, address: results[0].formatted_address });
            setSearchValue(results[0].formatted_address);
          } else {
            // Si falla el geocoding, usar coordenadas como dirección
            onChange({ lat, lng, address: `${lat}, ${lng}` });
            setSearchValue(`${lat}, ${lng}`);
          }
        });
      } catch (err) {
        console.error('Error en geocoding:', err);
        // Fallback: usar coordenadas como dirección
        onChange({ lat, lng, address: `${lat}, ${lng}` });
        setSearchValue(`${lat}, ${lng}`);
      }
    },
    [onChange]
  );

  // Función para crear marcador (usando AdvancedMarkerElement o Marker como fallback)
  const createMarker = useCallback(
    (position: google.maps.LatLngLiteral, map: google.maps.Map, title?: string) => {
      if (isMarkerLibraryLoaded && google.maps.marker?.AdvancedMarkerElement) {
        // Usar AdvancedMarkerElement (nuevo) - necesita LatLng object
        const latLng = new google.maps.LatLng(position.lat, position.lng);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: latLng,
          title,
        });
        return marker;
      } else {
        // Fallback: usar Marker tradicional
        return new google.maps.Marker({
          map,
          position,
          title,
          draggable: true,
        });
      }
    },
    [isMarkerLibraryLoaded]
  );

  // Función para actualizar ubicación
  const updateLocation = useCallback(
    (lat: number, lng: number, address?: string) => {
      if (!mapInstanceRef.current) return;

      // Eliminar marcador anterior
      if (markerRef.current) {
        markerRef.current.map = null;
      }

      // Crear nuevo marcador
      const newMarker = createMarker(
        { lat, lng },
        mapInstanceRef.current,
        address || 'Ubicación seleccionada'
      );

      // Si es AdvancedMarkerElement, hacerlo arrastrable
      if (newMarker instanceof google.maps.marker?.AdvancedMarkerElement) {
        newMarker.gmpDraggable = true;
        newMarker.addListener('dragend', (e: any) => {
          const position = e.latLng || newMarker.position;
          if (position) {
            const newLat = typeof position.lat === 'function' ? position.lat() : position.lat;
            const newLng = typeof position.lng === 'function' ? position.lng() : position.lng;
            getAddressFromCoordinates(newLat, newLng);
          }
        });
      } else if (newMarker instanceof google.maps.Marker) {
        // Listener para arrastrar marcador tradicional
        newMarker.addListener('dragend', () => {
          const position = newMarker.getPosition();
          if (position) {
            const newLat = position.lat();
            const newLng = position.lng();
            getAddressFromCoordinates(newLat, newLng);
          }
        });
      }

      markerRef.current = newMarker as any;

      // Obtener dirección si no se proporcionó
      if (!address) {
        getAddressFromCoordinates(lat, lng);
      } else {
        onChange({ lat, lng, address });
      }
    },
    [onChange, getAddressFromCoordinates, createMarker]
  );

  // Inicializar mapa y SearchBox
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const defaultCenter = value?.lat && value?.lng
      ? { lat: value.lat, lng: value.lng }
      : { lat: -12.0464, lng: -77.0428 }; // Lima, Perú por defecto

    const newMap = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: value?.lat && value?.lng ? 15 : 10,
      mapId: 'DEMO_MAP_ID', // Necesario para AdvancedMarkerElement
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapInstanceRef.current = newMap;

    // Esperar a que el input esté disponible antes de crear el SearchBox
    const initializeSearchBox = () => {
      if (!searchBoxRef.current) {
        // Reintentar después de un breve delay
        setTimeout(initializeSearchBox, 100);
        return;
      }

      try {
        // Definir los límites de Perú para sesgar las búsquedas hacia este país
        const peruBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-18.3518, -81.3281), // Suroeste de Perú
          new google.maps.LatLng(-0.0376, -68.6531)   // Noreste de Perú
        );

        const searchBox = new google.maps.places.SearchBox(searchBoxRef.current, {
          bounds: peruBounds,
        });

        searchBoxInstanceRef.current = searchBox;

        // Bias del SearchBox hacia Perú cuando el mapa se mueve
        newMap.addListener('bounds_changed', () => {
          const bounds = newMap.getBounds();
          if (bounds) {
            searchBox.setBounds(bounds);
          }
        });

        // Manejar cuando el usuario selecciona un lugar del SearchBox
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();

          if (!places || places.length === 0) {
            return;
          }

          // Limpiar marcadores anteriores
          if (markerRef.current) {
            markerRef.current.map = null;
          }

          // Para cada lugar encontrado, crear un marcador
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
              return;
            }

            // Obtener coordenadas y dirección
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address || place.name || '';

            // Crear marcador
            const marker = createMarker(
              { lat, lng },
              newMap,
              place.name || address
            );

            markerRef.current = marker as any;

            // Si es AdvancedMarkerElement, hacerlo arrastrable
            if (marker instanceof google.maps.marker?.AdvancedMarkerElement) {
              marker.gmpDraggable = true;
              marker.addListener('dragend', (e: any) => {
                const position = e.latLng || marker.position;
                if (position) {
                  const newLat = typeof position.lat === 'function' ? position.lat() : position.lat;
                  const newLng = typeof position.lng === 'function' ? position.lng() : position.lng;
                  getAddressFromCoordinates(newLat, newLng);
                }
              });
            } else if (marker instanceof google.maps.Marker) {
              // Listener para arrastrar marcador tradicional
              marker.addListener('dragend', () => {
                const position = marker.getPosition();
                if (position) {
                  const newLat = position.lat();
                  const newLng = position.lng();
                  getAddressFromCoordinates(newLat, newLng);
                }
              });
            }

            // Actualizar ubicación
            updateLocation(lat, lng, address);
            setSearchValue(address);

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });

          // Ajustar el mapa para mostrar todos los lugares encontrados
          if (places.length > 0) {
            newMap.fitBounds(bounds);
            
            // Si solo hay un lugar, hacer zoom más cercano
            if (places.length === 1) {
              setTimeout(() => {
                newMap.setZoom(15);
              }, 100);
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando SearchBox:', err);
      }
    };

    // Inicializar SearchBox después de un breve delay para asegurar que el DOM esté listo
    setTimeout(initializeSearchBox, 200);

    // Agregar marcador inicial si hay valor (esperar a que la biblioteca de markers esté cargada)
    if (value?.lat && value?.lng) {
      const addInitialMarker = () => {
        if (!isMarkerLibraryLoaded) {
          setTimeout(addInitialMarker, 100);
          return;
        }

        const newMarker = createMarker(
          { lat: value.lat!, lng: value.lng! },
          newMap,
          value.address || 'Ubicación'
        );

        markerRef.current = newMarker as any;

        // Si es AdvancedMarkerElement, hacerlo arrastrable
        if (newMarker instanceof google.maps.marker?.AdvancedMarkerElement) {
          newMarker.gmpDraggable = true;
          newMarker.addListener('dragend', (e: any) => {
            const position = e.latLng || newMarker.position;
            if (position) {
              const newLat = typeof position.lat === 'function' ? position.lat() : position.lat;
              const newLng = typeof position.lng === 'function' ? position.lng() : position.lng;
              getAddressFromCoordinates(newLat, newLng);
            }
          });
        } else if (newMarker instanceof google.maps.Marker) {
          // Listener para arrastrar marcador inicial tradicional
          newMarker.addListener('dragend', () => {
            const position = newMarker.getPosition();
            if (position) {
              const newLat = position.lat();
              const newLng = position.lng();
              getAddressFromCoordinates(newLat, newLng);
            }
          });
        }
      };

      addInitialMarker();
    }
  }, [isLoaded, isMarkerLibraryLoaded, createMarker, getAddressFromCoordinates, updateLocation]);

  // useEffect SEPARADO para el listener de click
  useEffect(() => {
    if (!mapInstanceRef.current || !isMarkerLibraryLoaded) return;

    const clickListener = mapInstanceRef.current.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updateLocation(lat, lng);
      }
    });

    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [updateLocation, isMarkerLibraryLoaded]);

  // Actualizar marcador cuando cambia el valor (sin recrear el mapa)
  useEffect(() => {
    if (!mapInstanceRef.current || !value?.lat || !value?.lng || !isMarkerLibraryLoaded) return;

    // Actualizar posición del marcador existente o crear uno nuevo
    if (markerRef.current) {
      const position = { lat: value.lat, lng: value.lng };
      const marker = markerRef.current as any;
      
      // Verificar si es AdvancedMarkerElement
      if (marker.position !== undefined && typeof marker.position === 'object' && !marker.setPosition) {
        // Es AdvancedMarkerElement - necesita LatLng object
        const latLng = new google.maps.LatLng(position.lat, position.lng);
        marker.position = latLng;
      } else if (marker.setPosition) {
        // Es Marker tradicional
        marker.setPosition(position);
      }
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(15);
    } else {
      const newMarker = createMarker(
        { lat: value.lat, lng: value.lng },
        mapInstanceRef.current,
        value.address || 'Ubicación'
      );
      markerRef.current = newMarker as any;

      if (newMarker instanceof google.maps.marker?.AdvancedMarkerElement) {
        newMarker.gmpDraggable = true;
        newMarker.addListener('dragend', (e: any) => {
          const position = e.latLng || newMarker.position;
          if (position) {
            const newLat = typeof position.lat === 'function' ? position.lat() : position.lat;
            const newLng = typeof position.lng === 'function' ? position.lng() : position.lng;
            getAddressFromCoordinates(newLat, newLng);
          }
        });
      } else if (newMarker instanceof google.maps.Marker) {
        newMarker.addListener('dragend', () => {
          const position = newMarker.getPosition();
          if (position) {
            const newLat = position.lat();
            const newLng = position.lng();
            getAddressFromCoordinates(newLat, newLng);
          }
        });
      }
    }
  }, [value?.lat, value?.lng, isMarkerLibraryLoaded, getAddressFromCoordinates, createMarker]);

  // Actualizar searchValue cuando cambia value
  useEffect(() => {
    if (value?.address) {
      setSearchValue(value.address);
    }
  }, [value?.address]);

  if (loadError) {
    return (
      <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="font-semibold mb-2">Error al cargar Google Maps</p>
        <p className="text-xs mb-2">
          Por favor, verifica que:
        </p>
        <ul className="text-xs list-disc list-inside space-y-1 mb-2">
          <li>La API key tenga habilitadas las APIs: <strong>Maps JavaScript API</strong> y <strong>Places API</strong></li>
          <li>No haya restricciones de dominio que bloqueen tu localhost</li>
          <li>El proyecto de Google Cloud tenga facturación habilitada</li>
        </ul>
        <p className="text-xs">
          Ve a <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Console</a> para verificar la configuración.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-gray-500">Cargando mapa...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación
        </label>
        {error && <p className="mb-1 text-xs text-red-500">{error}</p>}
      </div>

      <div className="relative">
        {/* Input de búsqueda posicionado sobre el mapa */}
        <div className="absolute top-3 left-3 right-3 z-10">
          <input
            ref={searchBoxRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar lugares en Perú..."
            className="w-full rounded-lg border border-gray-300 bg-white shadow-lg pl-4 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Mapa */}
        <div
          ref={mapRef}
          className="w-full h-64 rounded-lg border border-gray-300 overflow-hidden"
        />
        
        {/* Indicador de instrucciones */}
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded shadow-sm text-xs text-gray-600 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>Haz clic en el mapa o busca un lugar</span>
        </div>
      </div>
    </div>
  );
};