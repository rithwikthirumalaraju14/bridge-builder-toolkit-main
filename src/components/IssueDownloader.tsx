import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface IssueDownloaderProps {
  formData: FormData;
  format: 'csv' | 'json';
  setMessage: (message: string) => void;
  setMessageClass: (className: string) => void;
}

export default function IssueDownloader({ 
  formData, 
  format, 
  setMessage, 
  setMessageClass 
}: IssueDownloaderProps) {
  const download = () => {
    setMessage(`Downloading issues as ${format.toUpperCase()}... Please wait.`);
    setMessageClass('text-accent');

    fetch(`http://localhost:5000/download-issues/${format}`, { 
      method: 'POST', 
      body: formData 
    })
      .then(res => {
        if (res.ok) return res.blob();
        return res.json().then(data => { 
          throw new Error(data.error); 
        });
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${formData.get('jira_project_key') === 'ALL' ? 'all' : formData.get('jira_project_key')}_issues.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setMessage(`Successfully downloaded issues as ${format.toUpperCase()}.`);
        setMessageClass('text-success');
      })
      .catch(err => {
        setMessage(`Failed to download issues: ${err.message}`);
        setMessageClass('text-destructive');
      });
  };

  return (
    <Button 
      type="button" 
      onClick={download}
      variant="outline"
      className="w-full"
    >
      <Download className="w-4 h-4 mr-2" />
      Download as {format.toUpperCase()}
    </Button>
  );
}