import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface MigratorProps {
  formData: FormData;
  setMessage: (message: string) => void;
  setMessageClass: (className: string) => void;
}

export default function Migrator({ 
  formData, 
  setMessage, 
  setMessageClass 
}: MigratorProps) {
  const migrate = () => {
    setMessage('Migrating... Please wait.');
    setMessageClass('text-accent');

    fetch('http://localhost:5000/migrate', { 
      method: 'POST', 
      body: formData 
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setMessageClass('text-success');
        } else {
          setMessage(data.error || 'Migration failed.');
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
  onClick={migrate}
  className="w-full text-white hover:opacity-90 transition-opacity"
  style={{ backgroundColor: '#3f51b5' }}
>
  <ArrowRight className="w-4 h-4 mr-2" />
  Migrate Issues
</Button>

  );
}