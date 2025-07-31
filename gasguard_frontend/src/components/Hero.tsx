import { motion } from 'framer-motion';
import { Shield, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const features = [
    {
      icon: Shield,
      title: 'Gas Protection',
      description: 'Real-time gas fee monitoring'
    },
    {
      icon: Eye,
      title: 'Approval Tracking',
      description: 'Monitor token approvals'
    },
    {
      icon: Zap,
      title: 'Scam Detection',
      description: 'Identify malicious contracts'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden cyber-mesh">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15" />
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 lg:w-[500px] h-64 sm:h-96 lg:h-[500px] bg-primary/20 rounded-full blur-3xl animate-cyber-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 lg:w-[500px] h-64 sm:h-96 lg:h-[500px] bg-accent/20 rounded-full blur-3xl animate-cyber-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-secondary/20 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-orbitron font-black mb-6 sm:mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Personal Firewall
            <br />
            <span className="neon-text">for Web3</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl lg:max-w-4xl mx-auto font-space leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Protect yourself from high gas fees, malicious token approvals, and scam contracts. 
            <span className="text-accent font-medium"> Stay safe while navigating DeFi.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <Button 
              variant="hero" 
              size="xl"
              className="hover:scale-110 transition-all duration-300 text-base sm:text-lg lg:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-6"
            >
              <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
              Start Monitoring
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:scale-105 transition-cyber group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="p-3 sm:p-4 rounded-xl bg-primary/20 w-fit mx-auto mb-4 sm:mb-6 cyber-glow group-hover:animate-cyber-pulse">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base font-space leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;