import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Docs = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto px-4 pt-32 pb-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8">Welcome to GasGuard! Here you'll find information about features, usage, and security best practices.</p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc ml-6 text-base text-muted-foreground">
          <li>Real-time gas fee monitoring</li>
          <li>Token approval tracking and revocation</li>
          <li>Scam contract detection</li>
          <li>Security alerts and notifications</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How to Use</h2>
        <ol className="list-decimal ml-6 text-base text-muted-foreground">
          <li>Connect your wallet using the Connect button.</li>
          <li>Monitor gas fees and security alerts on the dashboard.</li>
          <li>Review and revoke token approvals in the Approvals section.</li>
          <li>Check contract security before interacting with new tokens.</li>
        </ol>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Support</h2>
        <p className="text-base text-muted-foreground">For help or feedback, join our <a href="https://discord.gg/gasguard" className="text-accent underline">Discord</a> or visit our <a href="https://github.com/gasguard" className="text-accent underline">GitHub</a>.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default Docs;
