export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
  origin: AirportInfo;
  destination: AirportInfo;
  scheduledDeparture: string;
  actualDeparture?: string;
  scheduledArrival: string;
  actualArrival?: string;
  gate?: string;
  terminal?: string;
  baggageClaim?: string;
  status: FlightStatus;
  aircraft?: string;
  delay?: number; // in minutes
}

export interface Airline {
  code: string;
  name: string;
  logo?: string;
}

export interface AirportInfo {
  code: string;
  name: string;
  city: string;
  country: string;
  terminal?: string;
  gate?: string;
  baggage?: string;
}

export type FlightStatus = 
  | 'scheduled'
  | 'active'
  | 'landed'
  | 'delayed'
  | 'cancelled'
  | 'diverted'
  | 'boarding'
  | 'departed'
  | 'arrived'
  | 'on-time';

export interface FlightFilters {
  airline?: string;
  destination?: string;
  origin?: string;
  status?: FlightStatus;
  gate?: string;
  terminal?: string;
}

export interface FlightUpdate {
  flightId: string;
  field: keyof Flight;
  oldValue: unknown;
  newValue: unknown;
  timestamp: string;
}

export interface ConnectionInfo {
  fromGate: string;
  toGate: string;
  walkingTime: number; // in minutes
  distance: number; // in meters
  path: [number, number][];
  minimumConnectionTime: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface GateInfo {
  gate: string;
  terminal: string;
  currentFlight?: Flight;
  nextFlights: Flight[];
  status: 'available' | 'occupied' | 'boarding' | 'closed';
  amenities: string[];
}
