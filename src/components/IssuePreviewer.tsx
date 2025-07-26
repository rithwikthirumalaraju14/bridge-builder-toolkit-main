import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface IssuePreviewerProps {
  formData: FormData;
  setMessage: (message: string) => void;
  setMessageClass: (className: string) => void;
}

export default function IssuePreviewer({ 
  formData, 
  setMessage, 
  setMessageClass 
}: IssuePreviewerProps) {
  const preview = () => {
    setMessage('Fetching preview... Please wait.');
    setMessageClass('text-accent');

    fetch('http://localhost:5000/preview-issues', { 
      method: 'POST', 
      body: formData 
    })
      .then(res => res.json())
      .then(data => {
        const previewBody = document.getElementById('previewBody');
        if (previewBody) {
          previewBody.innerHTML = '';
        }
        const previewTable = document.getElementById('previewTable');
        
        if (data.issues && data.issues.length > 0) {
          data.issues.forEach((issue: any) => {
            const row = document.createElement('tr');
            row.className = "border-b hover:bg-muted/50 transition-colors";
            row.innerHTML = `
              <td class="p-3 font-medium">${issue.key || 'N/A'}</td>
              <td class="p-3">${issue.summary || 'No summary'}</td>
              <td class="p-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  ${issue.status || 'Unknown'}
                </span>
              </td>
              <td class="p-3 text-muted-foreground">${issue.assignee || 'Unassigned'}</td>
            `;
            previewBody?.appendChild(row);
          });
          
          if (previewTable) {
            previewTable.style.display = "block";
          }
          setMessage(`Preview loaded successfully (${data.issues.length} issues).`);
          setMessageClass('text-success');
        } else {
          if (previewBody) {
            previewBody.innerHTML = '<tr><td colspan="4" class="text-center p-8 text-muted-foreground">No issues found.</td></tr>';
          }
          if (previewTable) {
            previewTable.style.display = "block";
          }
          setMessage(data.error || 'No issues found.');
          setMessageClass('text-destructive');
        }
      })
      .catch(err => {
        setMessage(`Failed to fetch issue preview: ${err.message}`);
        setMessageClass('text-destructive');
      });
  };

  return (
    <Button 
      type="button" 
      onClick={preview}
      variant="secondary"
      className="w-full"
    >
      <Eye className="w-4 h-4 mr-2" />
      Preview Issues
    </Button>
  );
}