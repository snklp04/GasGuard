import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, Shield, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' }
  ];

  return (
    <motion.footer 
      className="glass-card border-t border-primary/20 mt-16 sm:mt-20 lg:mt-24 cyber-mesh relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-primary/20 cyber-glow animate-pulse-glow">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <div className="font-orbitron font-black text-base sm:text-lg lg:text-xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                GasGuard
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-space">
                © 2025 GasGuard. Built for ETHcc by Team Alpha.
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-xl glass hover:bg-primary/20 transition-cyber cyber-glow"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="cyber"
              size="sm"
              onClick={toggleTheme}
              className="p-3 sm:p-4 rounded-xl"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/20">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-muted-foreground font-space">
            <a href="/privacy" className="hover:text-accent transition-cyber hover:scale-105">Privacy Policy</a>
            <a href="/terms" className="hover:text-accent transition-cyber hover:scale-105">Terms of Service</a>
            <a href="/docs" className="hover:text-accent transition-cyber hover:scale-105">Documentation</a>
            <a href="/support" className="hover:text-accent transition-cyber hover:scale-105">Support</a>
          </div>
          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground font-space">
            Built with <span className="text-accent animate-pulse">❤️</span> for the Web3 community • 
            <span className="text-warning"> Not financial advice</span> • 
            <span className="text-destructive">Use at your own risk</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;