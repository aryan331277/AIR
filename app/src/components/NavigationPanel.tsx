import { useState } from 'react';
import type { Airport } from '@/data/airports';
import { 
  Navigation, 
  MapPin, 
  Footprints, 
  Accessibility,
  Coffee,
  ShoppingBag,
  Armchair,
  Wifi,
  Zap,
  ChevronRight,
  Search
} from 'lucide-react';

interface NavigationPanelProps {
  airport: Airport;
}

interface POI {
  id: string;
  type: string;
  name: string;
  location: string;
  distance: string;
  walkingTime: string;
}

export default function NavigationPanel({ airport }: NavigationPanelProps) {
  const [activeMode, setActiveMode] = useState<'directions' | 'poi'>('directions');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample POIs based on airport data
  const pois: POI[] = [
    { id: '1', type: 'food', name: 'Starbucks', location: 'Concourse A', distance: '150m', walkingTime: '2 min' },
    { id: '2', type: 'food', name: 'Chick-fil-A', location: 'Concourse B', distance: '300m', walkingTime: '4 min' },
    { id: '3', type: 'retail', name: 'Duty Free Shop', location: 'Concourse F', distance: '500m', walkingTime: '6 min' },
    { id: '4', type: 'lounge', name: 'Delta Sky Club', location: 'Concourse A', distance: '200m', walkingTime: '3 min' },
    { id: '5', type: 'service', name: 'Charging Station', location: 'Concourse C', distance: '100m', walkingTime: '1 min' },
    { id: '6', type: 'food', name: 'Five Guys', location: 'Concourse B', distance: '350m', walkingTime: '5 min' },
    { id: '7', type: 'retail', name: 'Best Buy Express', location: 'Concourse B', distance: '320m', walkingTime: '4 min' },
    { id: '8', type: 'lounge', name: 'Centurion Lounge', location: 'Concourse E', distance: '450m', walkingTime: '6 min' },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: MapPin },
    { id: 'food', name: 'Food', icon: Coffee },
    { id: 'retail', name: 'Retail', icon: ShoppingBag },
    { id: 'lounge', name: 'Lounges', icon: Armchair },
    { id: 'service', name: 'Services', icon: Wifi },
  ];

  const filteredPOIs = pois.filter(poi => {
    const matchesCategory = selectedCategory === 'all' || poi.type === selectedCategory;
    const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poi.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPOIIcon = (type: string) => {
    switch (type) {
      case 'food':
        return <Coffee className="w-4 h-4" />;
      case 'retail':
        return <ShoppingBag className="w-4 h-4" />;
      case 'lounge':
        return <Armchair className="w-4 h-4" />;
      case 'service':
        return <Wifi className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Airport Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="text-xs text-[#9AA3B2] uppercase tracking-wider">Current Airport</div>
        <div className="font-medium text-sm truncate">{airport.name}</div>
      </div>
      
      {/* Mode Switcher */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveMode('directions')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
            activeMode === 'directions'
              ? 'bg-[#39FF14]/20 text-[#39FF14]'
              : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
          }`}
        >
          <Navigation className="w-4 h-4" />
          Directions
        </button>
        <button
          onClick={() => setActiveMode('poi')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
            activeMode === 'poi'
              ? 'bg-[#39FF14]/20 text-[#39FF14]'
              : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Points of Interest
        </button>
      </div>

      {/* Directions Mode */}
      {activeMode === 'directions' && (
        <div className="p-4 space-y-4">
          {/* Route Inputs */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
              </div>
              <input
                type="text"
                placeholder="From (e.g., Gate A1)"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 text-sm"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-[#F43F5E]" />
              </div>
              <input
                type="text"
                placeholder="To (e.g., Gate B12)"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Route Options */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#39FF14]/20 rounded-lg text-xs text-[#39FF14]">
              <Footprints className="w-3.5 h-3.5" />
              Walking
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white/5 rounded-lg text-xs text-[#9AA3B2] hover:bg-white/10">
              <Accessibility className="w-3.5 h-3.5" />
              Accessible
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white/5 rounded-lg text-xs text-[#9AA3B2] hover:bg-white/10">
              <Zap className="w-3.5 h-3.5" />
              Fastest
            </button>
          </div>

          {/* Route Preview */}
          {fromLocation && toLocation && (
            <div className="p-4 bg-white/5 rounded-lg animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-[#39FF14]" />
                  <span className="font-medium">Walking Route</span>
                </div>
                <span className="text-sm text-[#9AA3B2]">8 min</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  <span>{fromLocation}</span>
                </div>
                <div className="ml-1 pl-1 border-l-2 border-dashed border-white/20">
                  <div className="py-2 pl-4 text-xs text-[#9AA3B2]">
                    Head north toward Concourse B
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#F43F5E]" />
                  <span>{toLocation}</span>
                </div>
              </div>
              <button className="w-full mt-4 btn-primary text-sm py-2">
                Start Navigation
              </button>
            </div>
          )}

          {/* Quick Destinations */}
          <div>
            <div className="text-xs text-[#9AA3B2] uppercase tracking-wider mb-2">
              Quick Destinations
            </div>
            <div className="space-y-1">
              {['Security Checkpoint', 'Baggage Claim', 'Restrooms', 'Food Court'].map((dest, index) => (
                <button
                  key={index}
                  onClick={() => setToLocation(dest)}
                  className="w-full flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors text-left text-sm"
                >
                  <span>{dest}</span>
                  <ChevronRight className="w-4 h-4 text-[#9AA3B2]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POI Mode */}
      {activeMode === 'poi' && (
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA3B2]" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#39FF14] text-[#0B0F17]'
                    : 'bg-white/5 text-[#9AA3B2] hover:bg-white/10'
                }`}
              >
                <category.icon className="w-3.5 h-3.5" />
                {category.name}
              </button>
            ))}
          </div>

          {/* POI List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredPOIs.map(poi => (
              <div
                key={poi.id}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-[#39FF14]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getPOIIcon(poi.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{poi.name}</div>
                  <div className="text-xs text-[#9AA3B2]">{poi.location}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="flex items-center gap-1 text-[#22D3EE]">
                      <Footprints className="w-3 h-3" />
                      {poi.walkingTime}
                    </span>
                    <span className="text-[#9AA3B2]">{poi.distance}</span>
                  </div>
                </div>
                <button className="text-[#39FF14] hover:underline text-xs">
                  Go
                </button>
              </div>
            ))}
          </div>

          {filteredPOIs.length === 0 && (
            <div className="text-center py-8 text-[#9AA3B2]">
              No places found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
