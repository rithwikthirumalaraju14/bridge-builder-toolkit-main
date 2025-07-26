import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProjectFetcher from './ProjectFetcher';
import IssuePreviewer from './IssuePreviewer';
import IssueDownloader from './IssueDownloader';
import Migrator from './Migrator';

export default function JiraToArango() {
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraApiToken, setJiraApiToken] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');
  const [jiraProjectKey, setJiraProjectKey] = useState('ALL');
  const [arangoUsername, setArangoUsername] = useState('');
  const [arangoPassword, setArangoPassword] = useState('');
  const [arangoDbName, setArangoDbName] = useState('');
  const [migrationMessage, setMigrationMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const formData = new FormData();
  formData.append('jira_email', jiraEmail);
  formData.append('jira_api_token', jiraApiToken);
  formData.append('jira_domain', jiraDomain);
  formData.append('jira_project_key', jiraProjectKey);
  formData.append('arango_username', arangoUsername);
  formData.append('arango_password', arangoPassword);
  formData.append('arango_db_name', arangoDbName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-wide drop-shadow-sm">
          Jira → ArangoDB 
        </h1>
        <p className="text-lg text-muted-foreground">
          Seamlessly migrate your Jira data to ArangoDB
        </p>
      </div>

        {/* Main Content Card */}
        <Card className="shadow-card border-0 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Jira Configuration Card */}
                <Card className="group border-2 border-border hover:border-jira hover:shadow-jira-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-jira flex items-center justify-center text-white text-xl">
                        🎯
                      </div>
                      <div>
                        <CardTitle className="text-jira">Jira Configuration</CardTitle>
                        <p className="text-sm text-muted-foreground">Connect to your Jira instance</p>
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
                        value={jiraApiToken}
                        onChange={(e) => setJiraApiToken(e.target.value)}
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

                    <ProjectFetcher
                      email={jiraEmail}
                      token={jiraApiToken}
                      domain={jiraDomain}
                      setProjectKey={setJiraProjectKey}
                      setMessage={setMigrationMessage}
                      setMessageClass={setMessageClass}
                    />
                  </CardContent>
                </Card>

                {/* ArangoDB Configuration Card */}
                <Card className="group border-2 border-border hover:border-arango hover:shadow-arango-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-arango flex items-center justify-center text-white text-xl">
                        🗃️
                      </div>
                      <div>
                        <CardTitle className="text-arango">ArangoDB Configuration</CardTitle>
                        <p className="text-sm text-muted-foreground">Set up your database connection</p>
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

                {/* Actions Card */}
                <Card className="group border-2 border-border hover:border-migration hover:shadow-migration-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-migration flex items-center justify-center text-white text-xl">
                        ⚡
                      </div>
                      <div>
                        <CardTitle className="text-migration">Migration Actions</CardTitle>
                        <p className="text-sm text-muted-foreground">Execute your data operations</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-3 bg-gradient-migration text-migration-foreground">
                        Primary Actions
                      </Badge>
                      <div className="space-y-3">
                        <Migrator 
                          formData={formData} 
                          setMessage={setMigrationMessage} 
                          setMessageClass={setMessageClass} 
                        />
                        <IssuePreviewer 
                          formData={formData} 
                          setMessage={setMigrationMessage} 
                          setMessageClass={setMessageClass} 
                        />
                      </div>
                    </div>

                    <div>
                      <Badge variant="outline" className="mb-3">
                        Export Options
                      </Badge>
                      <div className="space-y-3">
                        <IssueDownloader 
                          formData={formData} 
                          format="csv" 
                          setMessage={setMigrationMessage} 
                          setMessageClass={setMessageClass} 
                        />
                        <IssueDownloader 
                          formData={formData} 
                          format="json" 
                          setMessage={setMigrationMessage} 
                          setMessageClass={setMessageClass} 
                        />
                      </div>
                    </div>

                   
                  </CardContent>
                </Card>
              </div>

              {/* Migration Message */}
              {migrationMessage && (
                <div className="mt-8">
                  <Alert className={`border-0 ${messageClass.includes('success') ? 'bg-success/10 text-success border-success/20' : 
                    messageClass.includes('destructive') ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                    'bg-accent/10 text-accent border-accent/20'}`}>
                    <AlertDescription className="font-medium">
                      {migrationMessage}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </form>
          </div>
        </Card>

        {/* Preview Table Section */}
        <div id="previewTable" className="mt-8 hidden">
          <Card className="shadow-card border-0 overflow-hidden">
            <div className="bg-gradient-migration p-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                📋 Issue Preview
              </h3>
              <p className="text-white/90 mt-1">
                Preview your Jira issues before migration
              </p>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Key</th>
                      <th className="text-left p-3 font-semibold">Summary</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Assignee</th>
                    </tr>
                  </thead>
                  <tbody id="previewBody"></tbody>
                </table>
              </div>
            </div>
          </Card>
      </div>
    </div>
  );
}