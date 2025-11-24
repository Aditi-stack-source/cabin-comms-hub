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
    <Card className="bg-card border-border p-3">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {direction === 'upline' ? (
            <ArrowUp className="w-4 h-4 text-primary" />
          ) : (
            <ArrowDown className="w-4 h-4 text-secondary" />
          )}
          <div className="text-muted-foreground text-xs tracking-wider uppercase">
            {direction === 'upline' ? 'Upline Trains' : 'Downline Trains'}
          </div>
        </div>

        <div className="space-y-2">
          {trains.map((train) => (
            <div
              key={train.id}
              className="bg-muted/30 border border-border rounded p-2 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">
                      {train.destination}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5 ml-6">
                    Location: {train.location}
                  </div>
                </div>
                <Badge variant="outline" className={`${getStatusColor(train.status)} text-xs py-0`}>
                  {train.status.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs uppercase">ETA</div>
                  <div className="text-foreground font-semibold text-sm">{train.eta}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase">Platform</div>
                  <div className="text-foreground font-semibold text-sm">{train.platform}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase">Distance</div>
                  <div className="text-foreground font-semibold text-sm">{train.distance} km</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
