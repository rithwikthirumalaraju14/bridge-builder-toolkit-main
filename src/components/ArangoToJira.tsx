import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ReverseMigrator from './ReverseMigrator';

export default function ArangoToJira() {
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');
  const [arangoUsername, setArangoUsername] = useState('');
  const [arangoPassword, setArangoPassword] = useState('');
  const [arangoDbName, setArangoDbName] = useState('');
  const [jiraProjectKey, setJiraProjectKey] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('hidden');

  const formData = new FormData();
  formData.append('jira_email', jiraEmail);
  formData.append('jira_token', jiraToken);
  formData.append('jira_domain', jiraDomain);
  formData.append('arango_username', arangoUsername);
  formData.append('arango_password', arangoPassword);
  formData.append('arango_db_name', arangoDbName);
  formData.append('jira_project_key', jiraProjectKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-wide drop-shadow-sm">
          ArangoDB → Jira Migration
        </h1>
        <p className="text-lg text-muted-foreground">
          Reverse migrate your data from ArangoDB back to Jira
        </p>
      </div>

        {/* Main Content Card */}
        <Card className="shadow-card border-0 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* ArangoDB Configuration Card */}
                <Card className="group border-2 border-border hover:border-arango hover:shadow-arango-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-arango flex items-center justify-center text-white text-xl">
                        🗃️
                      </div>
                      <div>
                        <CardTitle className="text-arango">ArangoDB Source</CardTitle>
                        <p className="text-sm text-muted-foreground">Connect to your ArangoDB instance</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="arango-username">ArangoDB Username</Label>
                      <Input
                        id="arango-username"
                        placeholder="root"
                        value={arangoUsername}
                        onChange={(e) => setArangoUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="arango-password">ArangoDB Password</Label>
                      <Input
                        id="arango-password"
                        type="password"
                        placeholder="Your database password"
                        value={arangoPassword}
                        onChange={(e) => setArangoPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="arango-db">ArangoDB Database Name</Label>
                      <Input
                        id="arango-db"
                        placeholder="e.g. jira_migration"
                        value={arangoDbName}
                        onChange={(e) => setArangoDbName(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Jira Configuration Card */}
                <Card className="group border-2 border-border hover:border-jira hover:shadow-jira-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-jira flex items-center justify-center text-white text-xl">
                        🎯
                      </div>
                      <div>
                        <CardTitle className="text-jira">Jira Destination</CardTitle>
                        <p className="text-sm text-muted-foreground">Configure your Jira target</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jira-email">Jira Email</Label>
                      <Input
                        id="jira-email"
                        type="email"
                        placeholder="your@email.com"
                        value={jiraEmail}
                        onChange={(e) => setJiraEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jira-token">Jira API Token</Label>
                      <Input
                        id="jira-token"
                        type="password"
                        placeholder="Your API token"
                        value={jiraToken}
                        onChange={(e) => setJiraToken(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jira-domain">Jira Domain</Label>
                      <Input
                        id="jira-domain"
                        placeholder="yourdomain.atlassian.net"
                        value={jiraDomain}
                        onChange={(e) => setJiraDomain(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jira-project-key">Jira Project Key</Label>
                      <Input
                        id="jira-project-key"
                        placeholder="Leave empty to create new project"
                        value={jiraProjectKey}
                        onChange={(e) => setJiraProjectKey(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty to create a new project
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions Card */}
                <Card className="group border-2 border-border hover:border-migration hover:shadow-migration-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-migration flex items-center justify-center text-white text-xl">
                        ⚡
                      </div>
                      <div>
                        <CardTitle className="text-migration">Reverse Migration</CardTitle>
                        <p className="text-sm text-muted-foreground">Execute your reverse migration</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-3 bg-gradient-migration text-migration-foreground">
                        Migration Action
                      </Badge>
                      <ReverseMigrator 
                        formData={formData} 
                        setMessage={setMessage} 
                        setMessageClass={setMessageClass} 
                      />
                    </div>

                    <div>
                      
                      
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Message Box */}
              {message && messageClass !== 'hidden' && (
                <div className="mt-8">
                  <Alert className={`border-0 ${messageClass.includes('error') || messageClass.includes('destructive') ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                    messageClass.includes('success') ? 'bg-success/10 text-success border-success/20' : 
                    'bg-accent/10 text-accent border-accent/20'}`}>
                    <AlertDescription className="font-medium">
                      {message}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </form>
          </div>
        </Card>
    </div>
  );
}