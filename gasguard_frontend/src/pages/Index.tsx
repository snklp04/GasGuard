import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GasTracker from '@/components/GasTracker';
import TokenApprovals from '@/components/TokenApprovals';
import AlertsSection from '@/components/AlertsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Security Dashboard
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor gas fees, review token approvals, and stay protected from scams with real-time alerts.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-8">
                <GasTracker />
                <AlertsSection />
              </div>
              <div>
                <TokenApprovals />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
