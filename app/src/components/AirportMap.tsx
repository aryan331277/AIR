import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Airport } from '@/data/airports';
import type { Flight } from '@/types/flight';
import { flightService } from '@/services/flightService';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from 'lucide-react';

// Mapbox token - in production, this should be from environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2w4Z3I1a3I3MDAzMzN1bnpkenZ4bmJ5eSJ9.1234567890';

interface AirportMapProps {
  airport: Airport;
  flights: Flight[];
}

interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  icon: string;
}

export default function AirportMap({ airport, flights }: AirportMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'gates', name: 'Gates', visible: true, icon: 'gate' },
    { id: 'security', name: 'Security', visible: true, icon: 'security' },
    { id: 'food', name: 'Food & Dining', visible: true, icon: 'food' },
    { id: 'retail', name: 'Retail', visible: true, icon: 'retail' },
    { id: 'lounge', name: 'Lounges', visible: true, icon: 'lounge' },
    { id: 'services', name: 'Services', visible: true, icon: 'services' },
  ]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll use a dark style without requiring a real token
    // In production, use your actual Mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: airport.coordinates,
        zoom: 15.5,
        pitch: 45,
        bearing: 0,
        antialias: true,
      });

      map.current.on('load', () => {
        // Add custom airport layers
        addAirportLayers();
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );
    } catch (error) {
      console.warn('Mapbox initialization failed, using fallback:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [airport]);

  // Add airport-specific layers
  const addAirportLayers = useCallback(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add gate markers
    airport.terminals.forEach(terminal => {
      terminal.gates.forEach(gate => {
        const gateFlights = flights.filter(f => f.gate === gate.number);
        const currentFlight = gateFlights.find(f => 
          f.status === 'boarding' || f.status === 'active'
        );

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'gate-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${getGateColor(gate.status)};
          border: 2px solid #0B0F17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: #0B0F17;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        el.textContent = gate.number;

        // Add pulse animation for boarding gates
        if (gate.status === 'boarding') {
          el.style.animation = 'pulse-glow 2s ease-in-out infinite';
        }

        const marker = new mapboxgl.Marker(el)
          .setLngLat(gate.coordinates)
          .addTo(map.current!);

        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(createGatePopup(gate, currentFlight));

        marker.setPopup(popup);

        el.addEventListener('click', () => {
          setSelectedGate(gate.number);
          marker.togglePopup();
        });

        markersRef.current.push(marker);
      });

      // Add feature markers (food, retail, etc.)
      terminal.floors.forEach(floor => {
        if (floor.level === selectedFloor) {
          floor.features.forEach(feature => {
            const el = document.createElement('div');
            el.className = 'feature-marker';
            el.style.cssText = `
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: ${getFeatureColor(feature.type)};
              border: 2px solid #0B0F17;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            `;
            el.innerHTML = getFeatureIcon(feature.type);

            const marker = new mapboxgl.Marker(el)
              .setLngLat(feature.coordinates)
              .addTo(map.current!);

            const popup = new mapboxgl.Popup({ offset: 20 })
              .setHTML(`
                <div style="padding: 8px;">
                  <div style="font-weight: 600; margin-bottom: 4px;">${feature.name}</div>
                  <div style="font-size: 12px; color: #9AA3B2;">${feature.type}</div>
                  ${feature.hours ? `<div style="font-size: 11px; color: #39FF14; margin-top: 4px;">${feature.hours}</div>` : ''}
                </div>
              `);

            marker.setPopup(popup);
            markersRef.current.push(marker);
          });
        }
      });
    });
  }, [airport, flights, selectedFloor]);

  // Update markers when data changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      addAirportLayers();
    }
  }, [addAirportLayers]);

  const getGateColor = (status: string): string => {
    const colors: Record<string, string> = {
      'available': '#9AA3B2',
      'occupied': '#22D3EE',
      'boarding': '#39FF14',
      'closed': '#F43F5E',
    };
    return colors[status] || '#9AA3B2';
  };

  const getFeatureColor = (type: string): string => {
    const colors: Record<string, string> = {
      'security': '#F59E0B',
      'food': '#F59E0B',
      'retail': '#8B5CF6',
      'lounge': '#22D3EE',
      'baggage': '#F43F5E',
      'checkpoint': '#39FF14',
      'atm': '#39FF14',
      'medical': '#F43F5E',
      'prayer': '#8B5CF6',
      'smoking': '#9AA3B2',
      'wifi': '#22D3EE',
      'charging': '#39FF14',
      'restroom': '#9AA3B2',
    };
    return colors[type] || '#9AA3B2';
  };

  const getFeatureIcon = (type: string): string => {
    const icons: Record<string, string> = {
      'security': '🔒',
      'food': '🍽️',
      'retail': '🛍️',
      'lounge': '💺',
      'baggage': '🧳',
      'checkpoint': '✓',
      'atm': '💰',
      'medical': '🏥',
      'prayer': '🙏',
      'smoking': '🚬',
      'wifi': '📶',
      'charging': '🔌',
      'restroom': '🚻',
    };
    return icons[type] || '📍';
  };

  const createGatePopup = (gate: { number: string; status: string }, flight?: Flight): string => {
    const statusColor = getGateColor(gate.status);
    return `
      <div style="min-width: 200px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-weight: 700; font-size: 16px;">Gate ${gate.number}</span>
          <span style="color: ${statusColor}; font-size: 12px; text-transform: uppercase;">${gate.status}</span>
        </div>
        ${flight ? `
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">${flight.flightNumber}</div>
            <div style="font-size: 12px; color: #9AA3B2; margin-bottom: 4px;">${flight.airline.name}</div>
            <div style="font-size: 12px; margin-bottom: 2px;">To: ${flight.destination.city}</div>
            <div style="font-size: 12px; color: ${flightService.getStatusColor(flight.status)};">${flight.status}</div>
            ${flight.scheduledDeparture ? `
              <div style="font-size: 11px; color: #9AA3B2; margin-top: 4px;">
                ${flightService.formatTime(flight.scheduledDeparture)}
              </div>
            ` : ''}
          </div>
        ` : `
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
            <div style="font-size: 12px; color: #9AA3B2;">No active flight</div>
          </div>
        `}
      </div>
    `;
  };

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const zoomIn = () => {
    map.current?.zoomIn();
  };

  const zoomOut = () => {
    map.current?.zoomOut();
  };

  const resetView = () => {
    map.current?.flyTo({
      center: airport.coordinates,
      zoom: 15.5,
      pitch: 45,
      bearing: 0,
    });
  };

  return (
    <div className="relative">
      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="w-full h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
        style={{ background: '#111827' }}
      />

      {/* Floor Selector */}
      <div className="absolute top-4 left-4 glass rounded-lg p-2">
        <div className="flex flex-col gap-1">
          {[2, 1, 0].map(floor => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                selectedFloor === floor
                  ? 'bg-[#39FF14] text-[#0B0F17]'
                  : 'text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5'
              }`}
            >
              {floor === 0 ? 'G' : `L${floor}`}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-4 right-4 glass rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-[#9AA3B2]" />
          <span className="text-xs font-medium text-[#9AA3B2]">Layers</span>
        </div>
        <div className="space-y-1">
          {layers.map(layer => (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded transition-all ${
                layer.visible
                  ? 'text-[#F3F4F6] bg-white/10'
                  : 'text-[#9AA3B2] hover:bg-white/5'
              }`}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  layer.visible ? 'bg-[#39FF14]' : 'bg-[#9AA3B2]'
                }`} 
              />
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={resetView}
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Gate Info */}
      {selectedGate && (
        <div className="absolute bottom-4 left-4 glass rounded-xl p-4 max-w-xs animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#39FF14]" />
              <span className="font-semibold">Gate {selectedGate}</span>
            </div>
            <button
              onClick={() => setSelectedGate(null)}
              className="text-[#9AA3B2] hover:text-[#F3F4F6]"
            >
              ×
            </button>
          </div>
          {(() => {
            const gateFlights = flights.filter(f => f.gate === selectedGate);
            const currentFlight = gateFlights.find(f => 
              f.status === 'boarding' || f.status === 'active'
            );
            return currentFlight ? (
              <div className="space-y-2">
                <div className="text-sm font-medium">{currentFlight.flightNumber}</div>
                <div className="text-xs text-[#9AA3B2]">{currentFlight.airline.name}</div>
                <div className="text-xs">To: {currentFlight.destination.city}</div>
                <div 
                  className="text-xs font-medium"
                  style={{ color: flightService.getStatusColor(currentFlight.status) }}
                >
                  {currentFlight.status}
                </div>
              </div>
            ) : (
              <div className="text-sm text-[#9AA3B2]">No active flight at this gate</div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-lg px-4 py-2 hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#39FF14]" />
          <span className="text-xs text-[#9AA3B2]">Boarding</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
          <span className="text-xs text-[#9AA3B2]">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#9AA3B2]" />
          <span className="text-xs text-[#9AA3B2]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
          <span className="text-xs text-[#9AA3B2]">Closed</span>
        </div>
      </div>
    </div>
  );
}
