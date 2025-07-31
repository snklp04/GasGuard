import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { connectWallet as connectWalletUtil } from '@/utils/web3';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/context/WalletContext';

const Header = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wallet, setWallet } = useWallet();
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Alerts', href: '/alerts' },
    { label: 'Approvals', href: '/approvals' },
    { label: 'Settings', href: '/settings' },
  ];

  const handleConnect = async () => {
    try {
      const address = await connectWalletUtil();
      setWallet(address);
    } catch (error: unknown) {
      const err = error as { code?: number; message?: string };
      if (err?.code === 4001) {
        toast({
          title: 'Wallet Connection Rejected',
          description: 'You must approve the connection in MetaMask to use GasGuard features.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Wallet Connection Error',
          description: err?.message || 'Failed to connect wallet.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20 cyber-mesh"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 sm:p-3 rounded-xl bg-primary/20 cyber-glow animate-pulse-glow">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-orbitron font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              GasGuard
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm xl:text-base font-medium font-space transition-cyber hover:text-primary hover:scale-105",
                  location.pathname === item.href ? "neon-text" : "text-muted-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Wallet Connect/Disconnect Button */}
          <div className="hidden md:flex items-center gap-2">
            {wallet ? (
              <>
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs">{wallet}</span>
                <div className="relative group">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setWallet(null)}
                    className="text-xs sm:text-sm transition-cyber"
                  >
                    Disconnect
                  </Button>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    To see the MetaMask popup again, disconnect this site from MetaMask settings.
                  </span>
                </div>
              </>
            ) : (
              <Button
                variant="cyber"
                size="default"
                onClick={handleConnect}
                className="text-xs sm:text-sm transition-cyber"
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 sm:p-3 rounded-xl glass hover:bg-primary/20 transition-cyber"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-primary" />
            ) : (
              <Menu className="h-5 w-5 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 p-4 sm:p-6 glass-card rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4 sm:space-y-6">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-sm sm:text-base font-medium font-space transition-cyber hover:text-primary hover:translate-x-2",
                    location.pathname === item.href ? "neon-text" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
              {wallet ? (
                <>
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs mb-2">{wallet}</span>
                  <div className="relative group">
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => setWallet(null)}
                      className="w-full mt-2"
                    >
                      Disconnect
                    </Button>
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      To see the MetaMask popup again, disconnect this site from MetaMask settings.
                    </span>
                  </div>
                </>
              ) : (
                <Button
                  variant="cyber"
                  size="lg"
                  onClick={handleConnect}
                  className="w-full mt-4"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;