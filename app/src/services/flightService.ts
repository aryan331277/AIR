import type { Flight, FlightFilters, FlightStatus, ConnectionInfo, GateInfo } from '@/types/flight';
import { airports, getAirportByCode } from '@/data/airports';

// Aviationstack API configuration
const AVIATIONSTACK_API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY || 'demo';
const AVIATIONSTACK_BASE_URL = 'http://api.aviationstack.com/v1';

// Mock flight data generator for demo purposes
// In production, this would be replaced with actual API calls
const generateMockFlights = (airportCode: string): Flight[] => {
  const airport = getAirportByCode(airportCode);
  if (!airport) return [];

  const airlines = [
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'AA', name: 'American Airlines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'BA', name: 'British Airways' },
    { code: 'LH', name: 'Lufthansa' },
    { code: 'AF', name: 'Air France' },
    { code: 'KL', name: 'KLM Royal Dutch Airlines' },
    { code: 'EK', name: 'Emirates' },
    { code: 'SQ', name: 'Singapore Airlines' },
    { code: 'VS', name: 'Virgin Atlantic' },
    { code: 'IB', name: 'Iberia' },
    { code: 'LX', name: 'SWISS' },
    { code: 'OS', name: 'Austrian Airlines' },
    { code: 'AY', name: 'Finnair' },
    { code: 'EI', name: 'Aer Lingus' },
  ];

  const destinations = [
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
    { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'USA' },
    { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'USA' },
    { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'USA' },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'USA' },
    { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'USA' },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'USA' },
    { code: 'BOS', name: 'Boston Logan International Airport', city: 'Boston', country: 'USA' },
    { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'USA' },
    { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
    { code: 'MAD', name: 'Adolfo Suarez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain' },
    { code: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
    { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
    { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
    { code: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
    { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium' },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
    { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China' },
    { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
    { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
    { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
    { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
    { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },
    { code: 'GRU', name: 'Sao Paulo/Guarulhos International Airport', city: 'Sao Paulo', country: 'Brazil' },
    { code: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires', country: 'Argentina' },
  ];

  const statuses: FlightStatus[] = ['scheduled', 'active', 'delayed', 'cancelled', 'boarding', 'departed', 'arrived', 'on-time'];
  const aircraftTypes = ['Boeing 737-800', 'Boeing 777-300ER', 'Boeing 787-9', 'Airbus A320', 'Airbus A321', 'Airbus A330-300', 'Airbus A350-900', 'Airbus A380-800'];

  const flights: Flight[] = [];
  const now = new Date();

  // Generate departures
  for (let i = 0; i < 40; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const flightNumber = `${airline.code}${Math.floor(100 + Math.random() * 8999)}`;
    
    const scheduledDeparture = new Date(now.getTime() + (Math.random() * 24 * 60 * 60 * 1000));
    const delay = Math.random() > 0.7 ? Math.floor(Math.random() * 120) : 0;
    const actualDeparture = delay > 0 ? new Date(scheduledDeparture.getTime() + delay * 60000) : undefined;
    
    const flightDuration = 120 + Math.floor(Math.random() * 600); // 2-12 hours
    const scheduledArrival = new Date(scheduledDeparture.getTime() + flightDuration * 60000);
    const actualArrival = actualDeparture ? new Date(actualDeparture.getTime() + flightDuration * 60000) : undefined;

    // Get a random gate from the airport
    const terminal = airport.terminals[Math.floor(Math.random() * airport.terminals.length)];
    const gate = terminal.gates[Math.floor(Math.random() * terminal.gates.length)];

    flights.push({
      id: `dep-${flightNumber}-${i}`,
      flightNumber,
      airline,
      origin: {
        code: airport.code,
        name: airport.name,
        city: airport.city,
        country: airport.country,
        terminal: terminal.name,
        gate: gate?.number,
      },
      destination,
      scheduledDeparture: scheduledDeparture.toISOString(),
      actualDeparture: actualDeparture?.toISOString(),
      scheduledArrival: scheduledArrival.toISOString(),
      actualArrival: actualArrival?.toISOString(),
      gate: gate?.number,
      terminal: terminal.name,
      status,
      aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
      delay: delay > 0 ? delay : undefined,
    });
  }

  // Generate arrivals
  for (let i = 0; i < 35; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const origin = destinations[Math.floor(Math.random() * destinations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const flightNumber = `${airline.code}${Math.floor(100 + Math.random() * 8999)}`;
    
    const scheduledArrival = new Date(now.getTime() + (Math.random() * 24 * 60 * 60 * 1000));
    const delay = Math.random() > 0.7 ? Math.floor(Math.random() * 120) : 0;
    const actualArrival = delay > 0 ? new Date(scheduledArrival.getTime() + delay * 60000) : undefined;
    
    const flightDuration = 120 + Math.floor(Math.random() * 600);
    const scheduledDeparture = new Date(scheduledArrival.getTime() - flightDuration * 60000);
    const actualDeparture = actualArrival ? new Date(actualArrival.getTime() - flightDuration * 60000) : undefined;

    // Get a random gate and baggage claim
    const terminal = airport.terminals[Math.floor(Math.random() * airport.terminals.length)];
    const gate = terminal.gates[Math.floor(Math.random() * terminal.gates.length)];
    const baggageClaim = `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(1 + Math.random() * 20)}`;

    flights.push({
      id: `arr-${flightNumber}-${i}`,
      flightNumber,
      airline,
      origin,
      destination: {
        code: airport.code,
        name: airport.name,
        city: airport.city,
        country: airport.country,
        terminal: terminal.name,
        gate: gate?.number,
        baggage: baggageClaim,
      },
      scheduledDeparture: scheduledDeparture.toISOString(),
      actualDeparture: actualDeparture?.toISOString(),
      scheduledArrival: scheduledArrival.toISOString(),
      actualArrival: actualArrival?.toISOString(),
      gate: gate?.number,
      terminal: terminal.name,
      baggageClaim,
      status,
      aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
      delay: delay > 0 ? delay : undefined,
    });
  }

  return flights.sort((a, b) => 
    new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime()
  );
};

// Flight service class
class FlightService {
  private flights: Map<string, Flight[]> = new Map();
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private subscribers: Set<(flights: Flight[], airportCode: string) => void> = new Set();

  constructor() {
    this.initializeMockData();
    this.startRealTimeUpdates();
  }

  private initializeMockData() {
    airports.forEach(airport => {
      this.flights.set(airport.code, generateMockFlights(airport.code));
    });
  }

  private startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    this.updateInterval = setInterval(() => {
      this.flights.forEach((flights, airportCode) => {
        // Randomly update some flights
        const updatedFlights = flights.map(flight => {
          if (Math.random() > 0.9) {
            const statuses: FlightStatus[] = ['scheduled', 'active', 'delayed', 'cancelled', 'boarding', 'departed', 'arrived', 'on-time'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return { ...flight, status: newStatus };
          }
          return flight;
        });
        
        this.flights.set(airportCode, updatedFlights);
        this.notifySubscribers(updatedFlights, airportCode);
      });
    }, 30000);
  }

  subscribe(callback: (flights: Flight[], airportCode: string) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(flights: Flight[], airportCode: string) {
    this.subscribers.forEach(callback => callback(flights, airportCode));
  }

  // Fetch flights from Aviationstack API
  async fetchFlightsFromAPI(airportCode: string): Promise<Flight[]> {
    try {
      const response = await fetch(
        `${AVIATIONSTACK_BASE_URL}/flights?access_key=${AVIATIONSTACK_API_KEY}&dep_iata=${airportCode}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      
      if (data.error) {
        console.warn('API Error:', data.error);
        return this.getMockFlights(airportCode);
      }

      return this.transformAPIData(data.data);
    } catch (error) {
      console.warn('Using mock data due to API error:', error);
      return this.getMockFlights(airportCode);
    }
  }

  private transformAPIData(apiData: unknown[]): Flight[] {
    interface APIFlightData {
      flight?: { iata?: string; icao?: string };
      flight_date?: string;
      airline?: { iata?: string; name?: string };
      departure?: { 
        iata?: string; 
        airport?: string; 
        timezone?: string; 
        terminal?: string; 
        gate?: string; 
        scheduled?: string;
        actual?: string;
        delay?: number;
      };
      arrival?: { 
        iata?: string; 
        airport?: string; 
        timezone?: string; 
        terminal?: string; 
        gate?: string; 
        baggage?: string;
        scheduled?: string;
        actual?: string;
      };
      flight_status?: string;
      aircraft?: { iata?: string };
    }

    return (apiData as APIFlightData[]).map((item) => ({
      id: `${item.flight?.iata || item.flight?.icao || 'unknown'}-${item.flight_date || ''}`,
      flightNumber: item.flight?.iata || item.flight?.icao || 'Unknown',
      airline: {
        code: item.airline?.iata || '',
        name: item.airline?.name || 'Unknown Airline',
      },
      origin: {
        code: item.departure?.iata || '',
        name: item.departure?.airport || '',
        city: item.departure?.timezone?.split('/')[1] || '',
        country: '',
        terminal: item.departure?.terminal,
        gate: item.departure?.gate,
      },
      destination: {
        code: item.arrival?.iata || '',
        name: item.arrival?.airport || '',
        city: item.arrival?.timezone?.split('/')[1] || '',
        country: '',
        terminal: item.arrival?.terminal,
        gate: item.arrival?.gate,
        baggage: item.arrival?.baggage,
      },
      scheduledDeparture: item.departure?.scheduled || '',
      actualDeparture: item.departure?.actual,
      scheduledArrival: item.arrival?.scheduled || '',
      actualArrival: item.arrival?.actual,
      gate: item.departure?.gate,
      terminal: item.departure?.terminal,
      baggageClaim: item.arrival?.baggage,
      status: this.mapAPIStatus(item.flight_status || ''),
      aircraft: item.aircraft?.iata,
      delay: item.departure?.delay,
    }));
  }

  private mapAPIStatus(apiStatus: string): FlightStatus {
    const statusMap: Record<string, FlightStatus> = {
      'scheduled': 'scheduled',
      'active': 'active',
      'landed': 'arrived',
      'delayed': 'delayed',
      'cancelled': 'cancelled',
      'diverted': 'diverted',
    };
    return statusMap[apiStatus] || 'scheduled';
  }

  getMockFlights(airportCode: string): Flight[] {
    return this.flights.get(airportCode.toUpperCase()) || [];
  }

  getDepartures(airportCode: string, filters?: FlightFilters): Flight[] {
    let flights = this.flights.get(airportCode.toUpperCase()) || [];
    flights = flights.filter(f => f.origin.code === airportCode.toUpperCase());
    
    if (filters) {
      flights = this.applyFilters(flights, filters);
    }
    
    return flights.sort((a, b) => 
      new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime()
    );
  }

  getArrivals(airportCode: string, filters?: FlightFilters): Flight[] {
    let flights = this.flights.get(airportCode.toUpperCase()) || [];
    flights = flights.filter(f => f.destination.code === airportCode.toUpperCase());
    
    if (filters) {
      flights = this.applyFilters(flights, filters);
    }
    
    return flights.sort((a, b) => 
      new Date(a.scheduledArrival).getTime() - new Date(b.scheduledArrival).getTime()
    );
  }

  getFlightByNumber(flightNumber: string, airportCode: string): Flight | undefined {
    const flights = this.flights.get(airportCode.toUpperCase()) || [];
    return flights.find(f => f.flightNumber === flightNumber.toUpperCase());
  }

  getFlightsByGate(gate: string, airportCode: string): Flight[] {
    const flights = this.flights.get(airportCode.toUpperCase()) || [];
    return flights.filter(f => f.gate === gate);
  }

  getGateInfo(gate: string, airportCode: string): GateInfo | null {
    const flights = this.getFlightsByGate(gate, airportCode);
    const airport = getAirportByCode(airportCode);
    
    if (!airport) return null;

    // Find the terminal and gate info
    let terminalName = '';
    let gateStatus: GateInfo['status'] = 'available';
    
    for (const terminal of airport.terminals) {
      const gateInfo = terminal.gates.find(g => g.number === gate);
      if (gateInfo) {
        terminalName = terminal.name;
        gateStatus = gateInfo.status;
        break;
      }
    }

    const currentFlight = flights.find(f => 
      f.status === 'boarding' || f.status === 'active'
    );

    const nextFlights = flights
      .filter(f => f.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime())
      .slice(0, 3);

    return {
      gate,
      terminal: terminalName,
      currentFlight,
      nextFlights,
      status: gateStatus,
      amenities: [],
    };
  }

  getConnectionInfo(fromGate: string, toGate: string, airportCode: string): ConnectionInfo {
    const airport = getAirportByCode(airportCode);
    
    // Default connection info
    const defaultInfo: ConnectionInfo = {
      fromGate,
      toGate,
      walkingTime: 10,
      distance: 500,
      path: [],
      minimumConnectionTime: 45,
      riskLevel: 'low',
    };

    if (!airport) return defaultInfo;

    // Find terminals for both gates
    let fromTerminal = '';
    let toTerminal = '';
    let fromCoords: [number, number] | null = null;
    let toCoords: [number, number] | null = null;

    for (const terminal of airport.terminals) {
      const fromGateInfo = terminal.gates.find(g => g.number === fromGate);
      const toGateInfo = terminal.gates.find(g => g.number === toGate);
      
      if (fromGateInfo) {
        fromTerminal = terminal.name;
        fromCoords = fromGateInfo.coordinates;
      }
      if (toGateInfo) {
        toTerminal = terminal.name;
        toCoords = toGateInfo.coordinates;
      }
    }

    // Calculate walking time based on distance
    let walkingTime = 10;
    let distance = 500;
    let riskLevel: ConnectionInfo['riskLevel'] = 'low';

    if (fromCoords && toCoords) {
      // Simple distance calculation (not accurate for real world, but good for demo)
      const latDiff = Math.abs(fromCoords[1] - toCoords[1]);
      const lonDiff = Math.abs(fromCoords[0] - toCoords[0]);
      distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111000; // Convert to meters (rough)
      
      walkingTime = Math.max(5, Math.ceil(distance / 80)); // 80 meters per minute walking speed
    }

    // Different terminals = longer connection time
    if (fromTerminal !== toTerminal) {
      walkingTime += 15; // Add time for terminal transfer
      distance += 1000;
    }

    // Determine risk level
    if (walkingTime > 20) {
      riskLevel = 'high';
    } else if (walkingTime > 12) {
      riskLevel = 'medium';
    }

    return {
      fromGate,
      toGate,
      walkingTime,
      distance,
      path: fromCoords && toCoords ? [fromCoords, toCoords] : [],
      minimumConnectionTime: fromTerminal === toTerminal ? 45 : 60,
      riskLevel,
    };
  }

  private applyFilters(flights: Flight[], filters: FlightFilters): Flight[] {
    return flights.filter(flight => {
      if (filters.airline && !flight.airline.code.toLowerCase().includes(filters.airline.toLowerCase()) && 
          !flight.airline.name.toLowerCase().includes(filters.airline.toLowerCase())) {
        return false;
      }
      if (filters.destination && !flight.destination.city.toLowerCase().includes(filters.destination.toLowerCase()) &&
          !flight.destination.code.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
      if (filters.origin && !flight.origin.city.toLowerCase().includes(filters.origin.toLowerCase()) &&
          !flight.origin.code.toLowerCase().includes(filters.origin.toLowerCase())) {
        return false;
      }
      if (filters.status && flight.status !== filters.status) {
        return false;
      }
      if (filters.gate && flight.gate !== filters.gate) {
        return false;
      }
      if (filters.terminal && flight.terminal !== filters.terminal) {
        return false;
      }
      return true;
    });
  }

  getStatusColor(status: FlightStatus): string {
    const colors: Record<FlightStatus, string> = {
      'scheduled': '#9AA3B2',
      'active': '#22D3EE',
      'landed': '#39FF14',
      'delayed': '#F59E0B',
      'cancelled': '#F43F5E',
      'diverted': '#8B5CF6',
      'boarding': '#39FF14',
      'departed': '#22D3EE',
      'arrived': '#39FF14',
      'on-time': '#39FF14',
    };
    return colors[status] || '#9AA3B2';
  }

  formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

export const flightService = new FlightService();
