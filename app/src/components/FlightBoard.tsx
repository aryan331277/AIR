import { useState, useMemo } from 'react';
import type { Airport } from '@/data/airports';
import type { Flight, FlightStatus } from '@/types/flight';
import { flightService } from '@/services/flightService';
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

interface FlightBoardProps {
  airport: Airport;
  flights: Flight[];
}

type BoardType = 'departures' | 'arrivals';

export default function FlightBoard({ airport, flights }: FlightBoardProps) {
  const [boardType, setBoardType] = useState<BoardType>('departures');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FlightStatus | 'all'>('all');
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);

  const filteredFlights = useMemo(() => {
    let filtered = boardType === 'departures' 
      ? flights.filter(f => f.origin.code === airport.code)
      : flights.filter(f => f.destination.code === airport.code);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.flightNumber.toLowerCase().includes(query) ||
        f.airline.name.toLowerCase().includes(query) ||
        (boardType === 'departures' 
          ? f.destination.city.toLowerCase().includes(query)
          : f.origin.city.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(f => f.status === statusFilter);
    }

    return filtered.slice(0, 20); // Show top 20 flights
  }, [flights, boardType, airport.code, searchQuery, statusFilter]);

  const getStatusIcon = (status: FlightStatus) => {
    switch (status) {
      case 'on-time':
      case 'arrived':
      case 'departed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'delayed':
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status: FlightStatus) => {
    switch (status) {
      case 'on-time':
      case 'boarding':
        return 'badge-success';
      case 'delayed':
        return 'badge-warning';
      case 'cancelled':
        return 'badge-danger';
      case 'departed':
      case 'arrived':
        return 'badge-info';
      default:
        return 'bg-white/10 text-[#9AA3B2]';
    }
  };

  const stats = useMemo(() => {
    const relevantFlights = boardType === 'departures'
      ? flights.filter(f => f.origin.code === airport.code)
      : flights.filter(f => f.destination.code === airport.code);

    const onTime = relevantFlights.filter(f => 
      f.status === 'on-time' || f.status === 'departed' || f.status === 'arrived'
    ).length;
    const delayed = relevantFlights.filter(f => f.status === 'delayed').length;
    const cancelled = relevantFlights.filter(f => f.status === 'cancelled').length;
    const total = relevantFlights.length;

    return {
      onTime,
      delayed,
      cancelled,
      total,
      onTimePercent: total > 0 ? Math.round((onTime / total) * 100) : 0,
      avgDelay: relevantFlights
        .filter(f => f.delay)
        .reduce((acc, f) => acc + (f.delay || 0), 0) / (relevantFlights.filter(f => f.delay).length || 1),
    };
  }, [flights, boardType, airport.code]);

  return (
    <div className="space-y-6">
      {/* Board Type Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-[#111827] rounded-lg p-1">
          <button
            onClick={() => setBoardType('departures')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              boardType === 'departures'
                ? 'bg-[#39FF14] text-[#0B0F17]'
                : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
            }`}
          >
            <PlaneTakeoff className="w-4 h-4" />
            Departures
          </button>
          <button
            onClick={() => setBoardType('arrivals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              boardType === 'arrivals'
                ? 'bg-[#39FF14] text-[#0B0F17]'
                : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
            }`}
          >
            <PlaneLanding className="w-4 h-4" />
            Arrivals
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA3B2]" />
            <input
              type="text"
              placeholder="Search flights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm w-48"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FlightStatus | 'all')}
            className="px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="boarding">Boarding</option>
            <option value="departed">Departed</option>
            <option value="arrived">Arrived</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#39FF14]">{stats.onTimePercent}%</div>
          <div className="text-xs text-[#9AA3B2]">On-time</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#F59E0B]">{stats.delayed}</div>
          <div className="text-xs text-[#9AA3B2]">Delayed</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#F43F5E]">{stats.cancelled}</div>
          <div className="text-xs text-[#9AA3B2]">Cancelled</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-[#22D3EE]">
            {stats.avgDelay > 0 ? `${Math.round(stats.avgDelay)}m` : '0m'}
          </div>
          <div className="text-xs text-[#9AA3B2]">Avg Delay</div>
        </div>
      </div>

      {/* Flight Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">Flight</th>
                <th className="text-left py-3 px-4">
                  {boardType === 'departures' ? 'To' : 'From'}
                </th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Gate</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight) => (
                <>
                  <tr 
                    key={flight.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setExpandedFlight(
                      expandedFlight === flight.id ? null : flight.id
                    )}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold">{flight.airline.code}</span>
                        </div>
                        <div>
                          <div className="font-medium">{flight.flightNumber}</div>
                          <div className="text-xs text-[#9AA3B2]">{flight.airline.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        {boardType === 'departures' 
                          ? flight.destination.city 
                          : flight.origin.city}
                      </div>
                      <div className="text-xs text-[#9AA3B2]">
                        {boardType === 'departures' 
                          ? flight.destination.code 
                          : flight.origin.code}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">
                        {flightService.formatTime(
                          boardType === 'departures' 
                            ? flight.scheduledDeparture 
                            : flight.scheduledArrival
                        )}
                      </div>
                      {flight.delay && flight.delay > 0 && (
                        <div className="text-xs text-[#F59E0B]">
                          +{flight.delay}m
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{flight.gate || 'TBA'}</div>
                      <div className="text-xs text-[#9AA3B2]">{flight.terminal}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge flex items-center gap-1.5 w-fit ${getStatusClass(flight.status)}`}>
                        {getStatusIcon(flight.status)}
                        {flight.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <MoreHorizontal className="w-5 h-5 text-[#9AA3B2]" />
                    </td>
                  </tr>
                  {expandedFlight === flight.id && (
                    <tr className="bg-white/5">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <div className="text-xs text-[#9AA3B2] mb-1">Aircraft</div>
                            <div className="text-sm">{flight.aircraft || 'N/A'}</div>
                          </div>
                          {flight.baggageClaim && (
                            <div>
                              <div className="text-xs text-[#9AA3B2] mb-1">Baggage Claim</div>
                              <div className="text-sm">{flight.baggageClaim}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-xs text-[#9AA3B2] mb-1">Last Updated</div>
                            <div className="text-sm">Just now</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFlights.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-[#9AA3B2]">No flights found</div>
          </div>
        )}
      </div>
    </div>
  );
}
