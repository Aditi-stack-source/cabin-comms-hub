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
    <Card className="bg-card border-border p-6">
      <div className="space-y-2">
        <div className="text-muted-foreground text-sm tracking-wider uppercase">
          System Time
        </div>
        <div className="text-5xl font-bold tracking-tight tabular-nums text-primary">
          {time.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
        <div className="text-muted-foreground text-lg">
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
