import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TokenApprovals from '@/components/TokenApprovals';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';

const Approvals = () => {
  const { wallet } = useWallet();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="mb-4 hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Token Approvals
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Monitor and manage your token approvals to maintain security. 
              Revoke unlimited approvals that you no longer need.
            </p>
          </motion.div>

          {/* Pass wallet address to TokenApprovals if available */}
          <TokenApprovals address={wallet || ''} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Approvals;