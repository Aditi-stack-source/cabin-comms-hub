import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Train } from 'lucide-react';

interface TrainInfo {
  id: string;
  destination: string;
  location: string;
  eta: string;
  status: 'on-time' | 'delayed' | 'offline';
  platform: string;
  distance: number;
}

interface TrainDisplayProps {
  direction: 'upline' | 'downline';
}

export const TrainDisplay = ({ direction }: TrainDisplayProps) => {
  const [trains, setTrains] = useState<TrainInfo[]>([]);

  useEffect(() => {
    // Simulate train data (replace with real API)
    const generateTrains = (): TrainInfo[] => {
      const uplineTrains = ['Train #A402', 'Train #B305', 'Train #C118'];
      const downlineTrains = ['Train #D201', 'Train #E504', 'Train #F307'];
      const uplineLocations = ['Central Station', 'North Terminal', 'Airport'];
      const downlineLocations = ['South Harbor', 'West Junction', 'East End'];
      
      const data = direction === 'upline' ? uplineTrains : downlineTrains;
      const locations = direction === 'upline' ? uplineLocations : downlineLocations;
      
      return data.map((dest, i) => ({
        id: `${direction}-${i + 1}`,
        destination: dest,
        location: locations[i],
        eta: `${3 + i * 5} min`,
        status: ['on-time', 'on-time', 'delayed'][Math.floor(Math.random() * 3)] as TrainInfo['status'],
        platform: `${Math.floor(Math.random() * 4) + 1}`,
        distance: (i + 1) * 2.5
      }));
    };

    setTrains(generateTrains());

    const interval = setInterval(() => {
      setTrains(generateTrains());
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [direction]);

  const getStatusColor = (status: TrainInfo['status']) => {
    switch (status) {
      case 'on-time':
        return 'bg-status-online/20 text-status-online border-status-online/30';
      case 'delayed':
        return 'bg-status-delayed/20 text-status-delayed border-status-delayed/30';
      case 'offline':
        return 'bg-status-offline/20 text-status-offline border-status-offline/30';
    }
  };

  return (
    <Card className="bg-card border-border p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {direction === 'upline' ? (
            <ArrowUp className="w-6 h-6 text-primary" />
          ) : (
            <ArrowDown className="w-6 h-6 text-secondary" />
          )}
          <div className="text-muted-foreground text-sm tracking-wider uppercase">
            {direction === 'upline' ? 'Upline Trains' : 'Downline Trains'}
          </div>
        </div>

        <div className="space-y-3">
          {trains.map((train) => (
            <div
              key={train.id}
              className="bg-muted/30 border border-border rounded p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg text-foreground">
                      {train.destination}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 ml-7">
                    Location: {train.location}
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(train.status)}>
                  {train.status.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs uppercase">ETA</div>
                  <div className="text-foreground font-semibold text-lg">{train.eta}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase">Platform</div>
                  <div className="text-foreground font-semibold text-lg">{train.platform}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase">Distance</div>
                  <div className="text-foreground font-semibold text-lg">{train.distance} km</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
