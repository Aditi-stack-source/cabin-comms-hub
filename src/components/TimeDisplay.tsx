import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-card border-border p-4">
      <div className="space-y-1">
        <div className="text-muted-foreground text-xs tracking-wider uppercase">
          System Time
        </div>
        <div className="text-3xl font-bold tracking-tight tabular-nums text-primary">
          {time.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
        <div className="text-muted-foreground text-sm">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </Card>
  );
};
