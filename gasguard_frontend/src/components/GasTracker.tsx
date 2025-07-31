import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fuel, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GasData {
  low: number;
  standard: number;
  high: number;
  lastUpdated: string;
}

const GasTracker = () => {
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    const getGasData = async () => {
      setLoading(true);
      try {
        const { fetchGasData } = await import('@/utils/web3');
        const data = await fetchGasData();
        setGasData(data);
        setTrend('stable'); // You can add trend logic based on previous data if needed
      } catch (error) {
        console.error('Failed to fetch gas data:', error);
        setGasData(null);
      } finally {
        setLoading(false);
      }
    };
    getGasData();
    const interval = setInterval(getGasData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const getGasColor = (type: string) => {
    switch (type) {
      case 'low': return 'text-success';
      case 'standard': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getGasBgColor = (type: string) => {
    switch (type) {
      case 'low': return 'bg-success/20';
      case 'standard': return 'bg-warning/20';
      case 'high': return 'bg-destructive/20';
      default: return 'bg-muted/20';
    }
  };

  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-primary" />
            Live Gas Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-24">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-muted h-16 w-20"></div>
              <div className="rounded-lg bg-muted h-16 w-20"></div>
              <div className="rounded-lg bg-muted h-16 w-20"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="glass-card cyber-mesh">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-orbitron text-lg sm:text-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20 cyber-glow animate-pulse-glow">
                <Fuel className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="neon-text">Live Gas Tracker</span>
            </div>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-destructive animate-bounce" />
            ) : trend === 'down' ? (
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-success animate-bounce" />
            ) : null}
          </CardTitle>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground font-space">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            Last updated: {gasData?.lastUpdated}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {gasData && [
              { label: 'Low', value: gasData.low, type: 'low' },
              { label: 'Standard', value: gasData.standard, type: 'standard' },
              { label: 'High', value: gasData.high, type: 'high' }
            ].map((gas, index) => (
              <motion.div
                key={gas.label}
                className={`p-4 sm:p-6 rounded-xl ${getGasBgColor(gas.type)} border border-primary/20 hover:scale-105 transition-cyber group relative overflow-hidden`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-orbitron font-black ${getGasColor(gas.type)} relative z-10`}>
                  {gas.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-space font-medium relative z-10">
                  {gas.label} • gwei
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl glass border border-primary/20">
            <p className="text-xs sm:text-sm text-muted-foreground text-center font-space">
              💡 <span className="text-accent font-medium">Pro Tip:</span> Use <span className="text-success font-bold neon-text">Low</span> fees for non-urgent transactions
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GasTracker;