import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { API_ENDPOINTS } from '@/config/api';

const Alerts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.ALERTS)
      .then(res => res.json())
      .then(data => setAlerts(data.data || []));
  }, []);

  const handleDismiss = async (id) => {
    setLoadingId(id);
    try {
      const res = await fetch(API_ENDPOINTS.ALERTS_DISMISS(id), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to dismiss alert');
      setAlerts(alerts => alerts.map(a => a.id === id ? { ...a, status: 'dismissed' } : a));
      toast({ title: 'Alert dismissed', description: 'The alert was marked as dismissed.', variant: 'default' });
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoadingId(null);
    }
  };

  const handleAction = async (id) => {
    setLoadingId(id);
    try {
      const res = await fetch(API_ENDPOINTS.ALERTS_ACTION(id), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to resolve alert');
      toast({ title: 'Alert resolved', description: 'The alert was marked as resolved.', variant: 'default' });
      // Optionally update alert status in UI
      setAlerts(alerts => alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoadingId(null);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 border-red-500/20 bg-red-500/10';
      case 'high': return 'text-orange-500 border-orange-500/20 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
      default: return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-5 w-5" />;
      case 'resolved': return <CheckCircle className="h-5 w-5" />;
      case 'dismissed': return <XCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-500';
      case 'resolved': return 'text-green-500';
      case 'dismissed': return 'text-gray-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="mb-4 hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Security Alerts
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Monitor and manage your security alerts and notifications.
            </p>
          </motion.div>
          {/* Alerts List */}
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${getStatusColor(alert.status)}`}>
                          {getStatusIcon(alert.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getSeverityColor(alert.severity)}`}
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-primary font-medium">{alert.currentValue}</span>
                            <span className="text-muted-foreground">{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {alert.status === 'active' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="light-theme-black-text"
                              onClick={() => handleDismiss(alert.id)}
                              disabled={loadingId === alert.id}
                            >
                              {loadingId === alert.id ? '...' : 'Dismiss'}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAction(alert.id)}
                              disabled={loadingId === alert.id}
                            >
                              {loadingId === alert.id ? '...' : 'Resolve'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Alerts;
