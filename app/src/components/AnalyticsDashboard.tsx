import { useState, useEffect, useMemo } from 'react';
import type { Airport } from '@/data/airports';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsDashboardProps {
  airport: Airport;
}

// Mock data generators
const generatePassengerFlowData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      passengers: Math.floor(Math.random() * 5000) + 2000,
      security: Math.floor(Math.random() * 2000) + 500,
      retail: Math.floor(Math.random() * 1500) + 300,
    });
  }
  return data;
};

const generateSecurityWaitData = () => {
  return [
    { checkpoint: 'North', waitTime: 8, passengers: 450 },
    { checkpoint: 'South', waitTime: 12, passengers: 380 },
    { checkpoint: 'Main', waitTime: 6, passengers: 520 },
    { checkpoint: 'Express', waitTime: 3, passengers: 180 },
    { checkpoint: 'TSA Pre', waitTime: 4, passengers: 290 },
  ];
};

const generateRetailData = () => {
  return [
    { category: 'Duty Free', revenue: 45000, visitors: 1200 },
    { category: 'Food', revenue: 32000, visitors: 2800 },
    { category: 'Fashion', revenue: 28000, visitors: 950 },
    { category: 'Electronics', revenue: 18000, visitors: 620 },
    { category: 'Books', revenue: 8000, visitors: 480 },
  ];
};

const generateGateUtilization = () => {
  return [
    { name: 'Active', value: 65, color: '#39FF14' },
    { name: 'Available', value: 25, color: '#22D3EE' },
    { name: 'Closed', value: 10, color: '#F43F5E' },
  ];
};

const generateAlerts = () => {
  return [
    { id: 1, type: 'warning', message: 'Security wait time > 15 min at South checkpoint', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Gate B12 flight delayed by 25 minutes', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Baggage system operating normally', time: '10 min ago' },
    { id: 4, type: 'warning', message: 'High passenger volume expected at 14:00', time: '15 min ago' },
  ];
};

export default function AnalyticsDashboard({ airport }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('6h');
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'retail' | 'gates'>('overview');
  
  const passengerFlowData = useMemo(() => generatePassengerFlowData(), []);
  const securityWaitData = useMemo(() => generateSecurityWaitData(), []);
  const retailData = useMemo(() => generateRetailData(), []);
  const gateUtilization = useMemo(() => generateGateUtilization(), []);
  const alerts = useMemo(() => generateAlerts(), []);

  // Real-time metrics with simulated updates
  const [metrics, setMetrics] = useState({
    totalPassengers: 12450,
    securityWait: 8,
    onTimePerformance: 91,
    retailRevenue: 128500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalPassengers: prev.totalPassengers + Math.floor(Math.random() * 50) - 20,
        securityWait: Math.max(3, prev.securityWait + Math.floor(Math.random() * 3) - 1),
        onTimePerformance: Math.min(100, Math.max(80, prev.onTimePerformance + Math.floor(Math.random() * 3) - 1)),
        retailRevenue: prev.retailRevenue + Math.floor(Math.random() * 1000) - 200,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />;
      default:
        return <Activity className="w-4 h-4 text-[#22D3EE]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-[#111827] rounded-lg p-1">
          {(['overview', 'security', 'retail', 'gates'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#39FF14] text-[#0B0F17]'
                  : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex bg-[#111827] rounded-lg p-1">
          {(['1h', '6h', '24h'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-white/10 text-[#F3F4F6]'
                  : 'text-[#9AA3B2] hover:text-[#F3F4F6]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#39FF14]/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#39FF14]" />
                </div>
                <span className="flex items-center gap-1 text-xs text-[#39FF14]">
                  <ArrowUpRight className="w-3 h-3" />
                  +12%
                </span>
              </div>
              <div className="text-2xl font-bold">{metrics.totalPassengers.toLocaleString()}</div>
              <div className="text-xs text-[#9AA3B2]">Passengers on floor</div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <span className="flex items-center gap-1 text-xs text-[#F59E0B]">
                  <ArrowUpRight className="w-3 h-3" />
                  +2m
                </span>
              </div>
              <div className="text-2xl font-bold">{metrics.securityWait} min</div>
              <div className="text-xs text-[#9AA3B2]">Avg security wait</div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <span className="flex items-center gap-1 text-xs text-[#39FF14]">
                  <ArrowUpRight className="w-3 h-3" />
                  +3%
                </span>
              </div>
              <div className="text-2xl font-bold">{metrics.onTimePerformance}%</div>
              <div className="text-xs text-[#9AA3B2]">On-time performance</div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <span className="flex items-center gap-1 text-xs text-[#39FF14]">
                  <ArrowUpRight className="w-3 h-3" />
                  +8%
                </span>
              </div>
              <div className="text-2xl font-bold">${(metrics.retailRevenue / 1000).toFixed(1)}k</div>
              <div className="text-xs text-[#9AA3B2]">Retail revenue (today)</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Passenger Flow Chart */}
            <div className="lg:col-span-2 glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Passenger Flow</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                    Passengers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                    Security
                  </span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={passengerFlowData}>
                    <defs>
                      <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" stroke="#9AA3B2" fontSize={10} />
                    <YAxis stroke="#9AA3B2" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#111827', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="passengers" 
                      stroke="#39FF14" 
                      fillOpacity={1} 
                      fill="url(#colorPassengers)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="security" 
                      stroke="#22D3EE" 
                      fillOpacity={1} 
                      fill="url(#colorSecurity)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts Panel */}
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-4">Live Alerts</h3>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div 
                    key={alert.id}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{alert.message}</div>
                      <div className="text-xs text-[#9AA3B2] mt-1">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Gate Utilization */}
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-4">Gate Utilization</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gateUtilization}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gateUtilization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: '#111827', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {gateUtilization.map(item => (
                  <span key={item.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    {item.name} ({item.value}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                  <Zap className="w-5 h-5 text-[#39FF14] mb-2" />
                  <div className="text-sm font-medium">Open Additional Lane</div>
                  <div className="text-xs text-[#9AA3B2]">Security checkpoint</div>
                </button>
                <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                  <Users className="w-5 h-5 text-[#22D3EE] mb-2" />
                  <div className="text-sm font-medium">Deploy Staff</div>
                  <div className="text-xs text-[#9AA3B2]">To high-traffic areas</div>
                </button>
                <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] mb-2" />
                  <div className="text-sm font-medium">Issue Alert</div>
                  <div className="text-xs text-[#9AA3B2]">Notify passengers</div>
                </button>
                <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
                  <BarChart3 className="w-5 h-5 text-[#8B5CF6] mb-2" />
                  <div className="text-sm font-medium">Generate Report</div>
                  <div className="text-xs text-[#9AA3B2]">Export analytics</div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Security Checkpoint Wait Times</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={securityWaitData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#9AA3B2" fontSize={10} />
                <YAxis dataKey="checkpoint" type="category" stroke="#9AA3B2" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#111827', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="waitTime" fill="#39FF14" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Retail Tab */}
      {activeTab === 'retail' && (
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Retail Performance by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retailData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" stroke="#9AA3B2" fontSize={12} />
                <YAxis stroke="#9AA3B2" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#111827', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#39FF14" radius={[4, 4, 0, 0]} />
                <Bar dataKey="visitors" fill="#22D3EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Gates Tab */}
      {activeTab === 'gates' && (
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Gate Activity Timeline</h3>
          <div className="space-y-3">
            {airport.terminals.slice(0, 3).map(terminal => (
              <div key={terminal.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{terminal.name}</div>
                  <div className="text-xs text-[#9AA3B2]">
                    {terminal.gates.filter(g => g.status === 'boarding').length} boarding / {terminal.gates.length} total
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {terminal.gates.slice(0, 8).map(gate => (
                    <div 
                      key={gate.id}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        gate.status === 'boarding' ? 'bg-[#39FF14]/20 text-[#39FF14]' :
                        gate.status === 'occupied' ? 'bg-[#22D3EE]/20 text-[#22D3EE]' :
                        gate.status === 'closed' ? 'bg-[#F43F5E]/20 text-[#F43F5E]' :
                        'bg-white/10 text-[#9AA3B2]'
                      }`}
                    >
                      {gate.number}
                    </div>
                  ))}
                  {terminal.gates.length > 8 && (
                    <div className="px-2 py-1 rounded text-xs text-[#9AA3B2]">
                      +{terminal.gates.length - 8} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
