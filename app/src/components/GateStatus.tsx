import { useState, useMemo } from 'react';
import type { Airport } from '@/data/airports';
import type { Flight } from '@/types/flight';
import { flightService } from '@/services/flightService';
import { 
  MapPin, 
  Plane, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Navigation
} from 'lucide-react';

interface GateStatusProps {
  airport: Airport;
  flights: Flight[];
}

interface GateWithFlight {
  gate: {
    id: string;
    number: string;
    status: 'available' | 'occupied' | 'boarding' | 'closed';
  };
  terminal: string;
  currentFlight?: Flight;
  nextFlights: Flight[];
}

export default function GateStatus({ airport, flights }: GateStatusProps) {
  const [selectedTerminal, setSelectedTerminal] = useState<string>('all');
  const [selectedGate, setSelectedGate] = useState<string | null>(null);

  const gatesWithFlights = useMemo((): GateWithFlight[] => {
    const result: GateWithFlight[] = [];
    
    airport.terminals.forEach(terminal => {
      if (selectedTerminal === 'all' || terminal.id === selectedTerminal) {
        terminal.gates.forEach(gate => {
          const gateFlights = flights.filter(f => f.gate === gate.number);
          const currentFlight = gateFlights.find(f => 
            f.status === 'boarding' || f.status === 'active'
          );
          const nextFlights = gateFlights
            .filter(f => f.status === 'scheduled')
            .sort((a, b) => 
              new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime()
            )
            .slice(0, 2);

          result.push({
            gate,
            terminal: terminal.name,
            currentFlight,
            nextFlights,
          });
        });
      }
    });

    return result;
  }, [airport, flights, selectedTerminal]);

  const stats = useMemo(() => {
    const total = gatesWithFlights.length;
    const boarding = gatesWithFlights.filter(g => g.gate.status === 'boarding').length;
    const occupied = gatesWithFlights.filter(g => g.gate.status === 'occupied').length;
    const available = gatesWithFlights.filter(g => g.gate.status === 'available').length;
    const closed = gatesWithFlights.filter(g => g.gate.status === 'closed').length;

    return { total, boarding, occupied, available, closed };
  }, [gatesWithFlights]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding':
        return '#39FF14';
      case 'occupied':
        return '#22D3EE';
      case 'available':
        return '#9AA3B2';
      case 'closed':
        return '#F43F5E';
      default:
        return '#9AA3B2';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'boarding':
        return <Plane className="w-4 h-4" />;
      case 'occupied':
        return <Clock className="w-4 h-4" />;
      case 'available':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-[#9AA3B2]">Total Gates</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#39FF14]">{stats.boarding}</div>
          <div className="text-xs text-[#9AA3B2]">Boarding</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#22D3EE]">{stats.occupied}</div>
          <div className="text-xs text-[#9AA3B2]">Occupied</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#9AA3B2]">{stats.available}</div>
          <div className="text-xs text-[#9AA3B2]">Available</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#F43F5E]">{stats.closed}</div>
          <div className="text-xs text-[#9AA3B2]">Closed</div>
        </div>
      </div>

      {/* Terminal Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTerminal('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedTerminal === 'all'
              ? 'bg-[#39FF14] text-[#0B0F17]'
              : 'glass text-[#9AA3B2] hover:text-[#F3F4F6]'
          }`}
        >
          All Terminals
        </button>
        {airport.terminals.map(terminal => (
          <button
            key={terminal.id}
            onClick={() => setSelectedTerminal(terminal.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTerminal === terminal.id
                ? 'bg-[#39FF14] text-[#0B0F17]'
                : 'glass text-[#9AA3B2] hover:text-[#F3F4F6]'
            }`}
          >
            {terminal.name}
          </button>
        ))}
      </div>

      {/* Gate Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {gatesWithFlights.map(({ gate, terminal, currentFlight }) => (
          <button
            key={gate.id}
            onClick={() => setSelectedGate(selectedGate === gate.number ? null : gate.number)}
            className={`relative p-4 rounded-xl transition-all text-left ${
              selectedGate === gate.number
                ? 'ring-2 ring-[#39FF14] bg-white/10'
                : 'glass hover:bg-white/5'
            }`}
          >
            {/* Status Indicator */}
            <div 
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(gate.status) }}
            />
            
            {/* Gate Number */}
            <div className="text-lg font-bold mb-1">{gate.number}</div>
            
            {/* Terminal */}
            <div className="text-xs text-[#9AA3B2] mb-2">{terminal}</div>
            
            {/* Status */}
            <div 
              className="flex items-center gap-1.5 text-xs"
              style={{ color: getStatusColor(gate.status) }}
            >
              {getStatusIcon(gate.status)}
              <span className="capitalize">{gate.status}</span>
            </div>

            {/* Current Flight Preview */}
            {currentFlight && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-xs font-medium truncate">{currentFlight.flightNumber}</div>
                <div className="text-xs text-[#9AA3B2] truncate">
                  {currentFlight.destination.city}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Gate Detail */}
      {selectedGate && (
        <div className="glass rounded-xl p-6 animate-fade-in">
          {(() => {
            const gateInfo = gatesWithFlights.find(g => g.gate.number === selectedGate);
            if (!gateInfo) return null;

            return (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-[#39FF14]" />
                      <h3 className="text-2xl font-bold">Gate {selectedGate}</h3>
                    </div>
                    <div className="text-[#9AA3B2] mt-1">{gateInfo.terminal}</div>
                  </div>
                  <button
                    onClick={() => setSelectedGate(null)}
                    className="text-[#9AA3B2] hover:text-[#F3F4F6]"
                  >
                    ×
                  </button>
                </div>

                {/* Current Flight */}
                {gateInfo.currentFlight ? (
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-xs text-[#9AA3B2] uppercase tracking-wider mb-2">
                      Current Flight
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold">{gateInfo.currentFlight.flightNumber}</div>
                        <div className="text-sm text-[#9AA3B2]">{gateInfo.currentFlight.airline.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium">{gateInfo.currentFlight.destination.city}</div>
                        <div className="text-sm text-[#9AA3B2]">{gateInfo.currentFlight.destination.code}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-xs text-[#9AA3B2]">Status</div>
                        <div 
                          className="text-sm font-medium"
                          style={{ color: flightService.getStatusColor(gateInfo.currentFlight.status) }}
                        >
                          {gateInfo.currentFlight.status}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[#9AA3B2]">Departure</div>
                        <div className="text-sm font-medium">
                          {flightService.formatTime(gateInfo.currentFlight.scheduledDeparture)}
                        </div>
                      </div>
                      {gateInfo.currentFlight.delay && gateInfo.currentFlight.delay > 0 && (
                        <div>
                          <div className="text-xs text-[#9AA3B2]">Delay</div>
                          <div className="text-sm font-medium text-[#F59E0B]">
                            +{gateInfo.currentFlight.delay}m
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-[#9AA3B2]">No active flight at this gate</div>
                  </div>
                )}

                {/* Next Flights */}
                {gateInfo.nextFlights.length > 0 && (
                  <div>
                    <div className="text-xs text-[#9AA3B2] uppercase tracking-wider mb-2">
                      Upcoming Flights
                    </div>
                    <div className="space-y-2">
                      {gateInfo.nextFlights.map((flight) => (
                        <div 
                          key={flight.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold">{flight.airline.code}</span>
                            </div>
                            <div>
                              <div className="font-medium">{flight.flightNumber}</div>
                              <div className="text-xs text-[#9AA3B2]">{flight.destination.city}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {flightService.formatTime(flight.scheduledDeparture)}
                            </div>
                            <div 
                              className="text-xs"
                              style={{ color: flightService.getStatusColor(flight.status) }}
                            >
                              {flight.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Walking Directions */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <Navigation className="w-4 h-4 text-[#39FF14]" />
                  <span className="text-sm text-[#9AA3B2]">
                    Get walking directions to this gate
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
