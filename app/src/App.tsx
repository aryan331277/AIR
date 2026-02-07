import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Map, 
  Plane, 
  Clock, 
  Search, 
  Coffee, 
  ShoppingBag, 
  Wifi, 
  Shield, 
  BarChart3, 
  Users, 
  Zap,
  ChevronRight,
  Menu,
  X,
  Building2,
  Luggage,
  Armchair,
  Utensils,
  Store,
  Monitor,
  ArrowRight
} from 'lucide-react';
import { airports } from '@/data/airports';
import { flightService } from '@/services/flightService';
import type { Flight } from '@/types/flight';
import AirportMap from '@/components/AirportMap';
import FlightBoard from '@/components/FlightBoard';
import GateStatus from '@/components/GateStatus';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import NavigationPanel from '@/components/NavigationPanel';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedAirport, setSelectedAirport] = useState(airports[0]);
  const [activeTab, setActiveTab] = useState<'passenger' | 'operations'>('passenger');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load initial flights
    const initialFlights = flightService.getMockFlights(selectedAirport.code);
    setFlights(initialFlights);

    // Subscribe to flight updates
    const unsubscribe = flightService.subscribe((updatedFlights) => {
      setFlights(updatedFlights);
    });

    return () => {
      unsubscribe();
      flightService.destroy();
    };
  }, [selectedAirport]);

  useEffect(() => {
    // Hero entrance animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
      
      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
      });
      
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out'
      });
      
      gsap.from('.data-pill', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.9,
        ease: 'power3.out'
      });
      
      gsap.from('.ticker-bar', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 1.1,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Navigation scroll effect
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add('glass');
          navRef.current.classList.remove('bg-transparent');
        } else {
          navRef.current.classList.remove('glass');
          navRef.current.classList.add('bg-transparent');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F3F4F6] overflow-x-hidden">
      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#39FF14] rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-[#0B0F17]" />
              </div>
              <span className="text-xl font-bold font-['Sora']">AeroNav</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('map')}
                className="text-sm text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                Map
              </button>
              <button 
                onClick={() => scrollToSection('flights')}
                className="text-sm text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                Flights
              </button>
              <button 
                onClick={() => scrollToSection('retail')}
                className="text-sm text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                Retail
              </button>
              <button 
                onClick={() => scrollToSection('analytics')}
                className="text-sm text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                Analytics
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-sm text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Mode Switcher */}
              <div className="hidden md:flex items-center bg-[#111827] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('passenger')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'passenger' 
                      ? 'bg-[#39FF14] text-[#0B0F17]' 
                      : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
                  }`}
                >
                  Passenger
                </button>
                <button
                  onClick={() => setActiveTab('operations')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'operations' 
                      ? 'bg-[#39FF14] text-[#0B0F17]' 
                      : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
                  }`}
                >
                  Operations
                </button>
              </div>

              {/* Search */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[#9AA3B2] hover:text-[#F3F4F6] transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 glass p-4 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search gates, flights, shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              <button 
                onClick={() => scrollToSection('map')}
                className="block w-full text-left px-4 py-2 text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5 rounded-lg transition-colors"
              >
                Map
              </button>
              <button 
                onClick={() => scrollToSection('flights')}
                className="block w-full text-left px-4 py-2 text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5 rounded-lg transition-colors"
              >
                Flights
              </button>
              <button 
                onClick={() => scrollToSection('retail')}
                className="block w-full text-left px-4 py-2 text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5 rounded-lg transition-colors"
              >
                Retail
              </button>
              <button 
                onClick={() => scrollToSection('analytics')}
                className="block w-full text-left px-4 py-2 text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5 rounded-lg transition-colors"
              >
                Analytics
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-[#9AA3B2] hover:text-[#F3F4F6] hover:bg-white/5 rounded-lg transition-colors"
              >
                Contact
              </button>
              
              {/* Mobile Mode Switcher */}
              <div className="flex items-center bg-[#111827] rounded-lg p-1 mt-4">
                <button
                  onClick={() => setActiveTab('passenger')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'passenger' 
                      ? 'bg-[#39FF14] text-[#0B0F17]' 
                      : 'text-[#9AA3B2]'
                  }`}
                >
                  Passenger
                </button>
                <button
                  onClick={() => setActiveTab('operations')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'operations' 
                      ? 'bg-[#39FF14] text-[#0B0F17]' 
                      : 'text-[#9AA3B2]'
                  }`}
                >
                  Operations
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden blueprint-bg"
      >
        {/* Background Grid Effect */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/5 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Your terminal,{' '}
                  <span className="text-[#39FF14]">decoded.</span>
                </h1>
                <p className="hero-subtitle text-lg sm:text-xl text-[#9AA3B2] max-w-lg">
                  Real-time maps, flights, and walks—built for passengers and the teams who run the airport.
                </p>
              </div>

              {/* Airport Selector */}
              <div className="hero-cta flex flex-wrap gap-4">
                <select
                  value={selectedAirport.code}
                  onChange={(e) => {
                    const airport = airports.find(a => a.code === e.target.value);
                    if (airport) setSelectedAirport(airport);
                  }}
                  className="bg-[#111827] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#39FF14] focus:outline-none"
                >
                  {airports.map(airport => (
                    <option key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name}
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={() => scrollToSection('map')}
                  className="btn-primary flex items-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  Explore the Map
                </button>
                
                <button 
                  onClick={() => {
                    setActiveTab('operations');
                    scrollToSection('analytics');
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Operations Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[#39FF14]">6</div>
                  <div className="text-sm text-[#9AA3B2]">Major Airports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#22D3EE]">500+</div>
                  <div className="text-sm text-[#9AA3B2]">Gates Mapped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#8B5CF6]">Real-time</div>
                  <div className="text-sm text-[#9AA3B2]">Flight Updates</div>
                </div>
              </div>
            </div>

            {/* Right Content - Data Pills */}
            <div className="hidden lg:block relative">
              <div className="absolute top-0 right-0 space-y-4">
                <div className="data-pill glass rounded-xl p-4 flex items-center gap-3 animate-pulse-glow">
                  <div className="w-10 h-10 bg-[#39FF14]/20 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-[#39FF14]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Gate 42</div>
                    <div className="text-xs text-[#39FF14]">Boarding</div>
                  </div>
                </div>
                
                <div className="data-pill glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Security</div>
                    <div className="text-xs text-[#22D3EE]">12 min wait</div>
                  </div>
                </div>
                
                <div className="data-pill glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Retail</div>
                    <div className="text-xs text-[#8B5CF6]">Open now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Bar */}
        <div className="ticker-bar absolute bottom-0 left-0 right-0 glass border-t border-white/10">
          <div className="overflow-hidden">
            <div className="ticker flex items-center gap-8 py-3 whitespace-nowrap">
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#39FF14]">●</span> Live updates every 5 seconds
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#22D3EE]">●</span> 3,412 passengers on floor
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#8B5CF6]">●</span> 78 departures in next 2h
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#39FF14]">●</span> On-time performance: 91%
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#22D3EE]">●</span> Avg security wait: 8 min
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#8B5CF6]">●</span> Retail occupancy: 87%
              </span>
              {/* Duplicate for seamless loop */}
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#39FF14]">●</span> Live updates every 5 seconds
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#22D3EE]">●</span> 3,412 passengers on floor
              </span>
              <span className="text-sm text-[#9AA3B2]">
                <span className="text-[#8B5CF6]">●</span> 78 departures in next 2h
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Interactive Terminal Map
            </h2>
            <p className="text-[#9AA3B2] max-w-2xl">
              Navigate the airport with real-time gate status, amenities, and services. 
              Click on any gate to see current flight information.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <AirportMap 
                airport={selectedAirport} 
                flights={flights}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              <NavigationPanel airport={selectedAirport} />
            </div>
          </div>
        </div>
      </section>

      {/* Flight Board Section */}
      <section id="flights" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real-Time Flight Board
            </h2>
            <p className="text-[#9AA3B2] max-w-2xl">
              Live departures and arrivals with gate assignments, delays, and status updates.
            </p>
          </div>

          <FlightBoard 
            airport={selectedAirport}
            flights={flights}
          />
        </div>
      </section>

      {/* Gate Status Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Gate Status Overview
            </h2>
            <p className="text-[#9AA3B2] max-w-2xl">
              Color-coded gate status showing boarding, occupied, available, and closed gates.
            </p>
          </div>

          <GateStatus 
            airport={selectedAirport}
            flights={flights}
          />
        </div>
      </section>

      {/* Retail & Dining Section */}
      <section id="retail" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Retail & Dining Discovery
            </h2>
            <p className="text-[#9AA3B2] max-w-2xl">
              Explore shops, restaurants, and services near your gate. 
              See opening hours and walking distances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Food & Dining */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Food & Dining</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                Restaurants, cafes, and food courts across all terminals
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Open now</span>
                  <span className="text-[#39FF14]">42 venues</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Near your gate</span>
                  <span className="text-[#22D3EE]">5 venues</span>
                </div>
              </div>
            </div>

            {/* Shopping */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Shopping</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                Duty-free, fashion, electronics, and convenience stores
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Open now</span>
                  <span className="text-[#39FF14]">38 stores</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Duty-free</span>
                  <span className="text-[#22D3EE]">12 stores</span>
                </div>
              </div>
            </div>

            {/* Lounges */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-xl flex items-center justify-center mb-4">
                <Armchair className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lounges</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                Airline lounges and premium relaxation areas
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Available</span>
                  <span className="text-[#39FF14]">8 lounges</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Day pass</span>
                  <span className="text-[#22D3EE]">3 lounges</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#39FF14]/20 rounded-xl flex items-center justify-center mb-4">
                <Wifi className="w-6 h-6 text-[#39FF14]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                WiFi, charging, currency exchange, and more
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Free WiFi zones</span>
                  <span className="text-[#39FF14]">Full coverage</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Charging stations</span>
                  <span className="text-[#22D3EE]">45 locations</span>
                </div>
              </div>
            </div>

            {/* Baggage */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#F43F5E]/20 rounded-xl flex items-center justify-center mb-4">
                <Luggage className="w-6 h-6 text-[#F43F5E]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Baggage</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                Claim areas, storage, and baggage services
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Carousels</span>
                  <span className="text-[#39FF14]">12 active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Storage</span>
                  <span className="text-[#22D3EE]">24 hours</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="card p-6 card-hover">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Security</h3>
              <p className="text-sm text-[#9AA3B2] mb-4">
                Checkpoints, TSA PreCheck, and customs
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Checkpoints</span>
                  <span className="text-[#39FF14]">6 open</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9AA3B2]">Avg wait time</span>
                  <span className="text-[#22D3EE]">8 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Relax, recharge, reset.
              </h2>
              <p className="text-[#9AA3B2] mb-8">
                From quiet zones to showers, spas to prayer rooms—find what you need, fast.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Armchair, label: 'Lounges', count: '8 locations' },
                  { icon: Zap, label: 'Showers', count: '6 locations' },
                  { icon: Building2, label: 'Sleep pods', count: '4 locations' },
                  { icon: Users, label: 'Prayer rooms', count: '3 locations' },
                  { icon: Coffee, label: 'Kids areas', count: '5 locations' },
                  { icon: Monitor, label: 'Business centers', count: '3 locations' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg">
                    <item.icon className="w-5 h-5 text-[#39FF14]" />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-[#9AA3B2]">{item.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary mt-8 flex items-center gap-2">
                View Amenities Map
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden glass">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop"
                  alt="Airport Lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Dashboard (B2B) */}
      {activeTab === 'operations' && (
        <section id="analytics" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#39FF14]/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#39FF14]" />
                </div>
                <span className="text-sm text-[#39FF14] font-medium uppercase tracking-wider">
                  Operations
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Operations Command Center
              </h2>
              <p className="text-[#9AA3B2] max-w-2xl">
                Live situational awareness for terminal teams. Monitor passenger flow, 
                security wait times, and retail performance in real-time.
              </p>
            </div>

            <AnalyticsDashboard airport={selectedAirport} />
          </div>
        </section>
      )}

      {/* Multi-Airport View */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One platform. Many airports.
            </h2>
            <p className="text-[#9AA3B2] max-w-2xl mx-auto">
              Compare performance, share playbooks, and manage standards across your network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {airports.slice(0, 3).map((airport, index) => (
              <div 
                key={airport.code}
                className="card p-6 card-hover cursor-pointer"
                onClick={() => setSelectedAirport(airport)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold">{airport.code}</div>
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-[#39FF14]' : 
                    index === 1 ? 'bg-[#22D3EE]' : 'bg-[#8B5CF6]'
                  }`} />
                </div>
                <h3 className="font-medium mb-1">{airport.name}</h3>
                <p className="text-sm text-[#9AA3B2] mb-4">{airport.city}, {airport.country}</p>
                
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9AA3B2]">On-time</span>
                    <span className="text-[#39FF14]">{91 - index * 3}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9AA3B2]">Security wait</span>
                    <span className="text-[#22D3EE]">{8 + index * 2} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9AA3B2]">Passenger load</span>
                    <span className="text-[#8B5CF6]">{85 - index * 5}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API & Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built to integrate.
              </h2>
              <p className="text-[#9AA3B2] mb-8">
                Maps, FIDS, sensors, and BI—connected via APIs and webhooks. 
                Build custom solutions on top of our platform.
              </p>

              <div className="space-y-4">
                {[
                  'Subscribe to gate changes',
                  'Query wait times',
                  'Push retail events',
                  'Access historical data',
                  'Real-time WebSocket feeds',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#39FF14]/20 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-[#39FF14]" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#39FF14]" />
                <span className="ml-2 text-[#9AA3B2]">example.js</span>
              </div>
              <pre className="text-[#9AA3B2] overflow-x-auto">
{`// Subscribe to gate changes
const socket = new WebSocket(
  'wss://api.aeronav.io/v1/gates/stream'
);

socket.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log('Gate update:', update);
};

// Query flight status
const response = await fetch(
  'https://api.aeronav.io/v1/flights?airport=ATL'
);
const flights = await response.json();`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to transform your terminal?
          </h2>
          <p className="text-[#9AA3B2] mb-8">
            Get a demo tailored to your airport.
          </p>

          <form className="glass rounded-2xl p-8 text-left">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#9AA3B2] mb-2">Name</label>
                <input type="text" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label className="block text-sm text-[#9AA3B2] mb-2">Work Email</label>
                <input type="email" placeholder="you@company.com" className="w-full" />
              </div>
              <div>
                <label className="block text-sm text-[#9AA3B2] mb-2">Airport/Organization</label>
                <input type="text" placeholder="Your organization" className="w-full" />
              </div>
              <button type="submit" className="btn-primary w-full mt-4">
                Request Demo
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#39FF14] rounded-md flex items-center justify-center">
              <Plane className="w-4 h-4 text-[#0B0F17]" />
            </div>
            <span className="font-semibold">AeroNav Intelligence</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[#9AA3B2]">
            <a href="#" className="hover:text-[#F3F4F6] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F3F4F6] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F3F4F6] transition-colors">API Docs</a>
          </div>
          
          <div className="text-sm text-[#9AA3B2]">
            © 2024 AeroNav Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
