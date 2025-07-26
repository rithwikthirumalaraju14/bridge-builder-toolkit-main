import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface ReverseMigratorProps {
  formData: FormData;
  setMessage: (message: string) => void;
  setMessageClass: (className: string) => void;
}

export default function ReverseMigrator({ 
  formData, 
  setMessage, 
  setMessageClass 
}: ReverseMigratorProps) {
  const reverseMigrate = () => {
    setMessage('Reverse migrating... Please wait.');
    setMessageClass('text-accent');

    fetch('http://localhost:5000/reverse-migrate', { 
      method: 'POST', 
      body: formData 
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setMessageClass('text-success');
        } else {
          setMessage(data.error || 'Reverse migration failed.');
          setMessageClass('text-destructive');
        }
      })
      .catch((err) => {
        setMessage(`Unexpected error occurred: ${err.message}`);
        setMessageClass('text-destructive');
      });
  };

  return (
    <Button 
  type="button" 
  onClick={reverseMigrate}
  className="w-full text-white hover:opacity-90 transition-opacity"
  style={{ backgroundColor: '#3f51b5' }}
>
  <ArrowUp className="w-4 h-4 mr-2" />
  Reverse Migrate
</Button>

  );
}