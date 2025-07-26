import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/App.css'; // Ensure your CSS is imported
import { 
  Home, 
  ArrowRightLeft, 
  ArrowLeftRight,
  Database,
  Target
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* AppBar */}
      <div className="fixed left-0 top-0 w-full h-[70px] bg-card shadow-lg flex items-center px-8 py-6 z-50 border-b">
        <img 
          src="https://res.cloudinary.com/dyofpgt7k/image/upload/v1742507984/ArangoDB_logo_avocado__2_mp0pna.png"
          alt="ArangoDB Logo" 
          className="h-10 mr-5"
        />
        <h4 className="text-muted-foreground font-bold mr-2">ArangoAI &gt;</h4>
        <h5 className="text-foreground font-bold">Connector</h5>
      </div>

      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <div className="fixed left-0 top-[70px] h-[calc(100vh-70px)] w-[56px] hover:w-[250px] app-sidebar transition-all duration-300 ease-in-out overflow-hidden z-40 group">
          <nav className="pt-5">
            <Link
              to="/"
              className={`flex items-center px-5 py-4 text-primary-foreground hover:bg-white/10 hover:pl-6 transition-all duration-300 whitespace-nowrap ${
                isActive('/') ? 'bg-white/20' : ''
              }`}
              title="Jira to ArangoDB"
            >
              <i className="bi bi-arrow-up-right-square-fill min-w-[20px] h-5 w-5 mr-4" />
              <span className="group-hover:block">Jira → ArangoDB</span>
            </Link>
            
            <Link
              to="/reverse"
              className={`flex items-center px-5 py-4 text-primary-foreground hover:bg-white/10 hover:pl-6 transition-all duration-300 whitespace-nowrap ${
                isActive('/reverse') ? 'bg-white/20' : ''
              }`}
              title="ArangoDB to Jira"
            >
              <i className="bi bi-database min-w-[20px] h-5 w-5 mr-4" />
              <span className="group-hover:block">ArangoDB → Jira</span>
            </Link>

            
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-[60px] transition-all duration-300 min-h-[calc(100vh-70px)]">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}