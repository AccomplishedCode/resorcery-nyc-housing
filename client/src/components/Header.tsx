import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Map, Building, BarChart3, TreePine, Calculator, FlaskConical, Users, Bot, Home, Cube, Crown, Target, Heart } from "lucide-react";
import { nycColors } from "@/lib/nyc-design-system";

const navItems = [
  { 
    path: "/executive-dashboard", 
    title: "Executive Dashboard", 
    icon: Crown, 
    color: nycColors.primary.blue,
    description: "Mayor's office overview"
  },
  { 
    path: "/opportunity-finder", 
    title: "Identify Opportunities", 
    icon: Target, 
    color: nycColors.primary.blue,
    description: "Find sites + assess needs"
  },
  { 
    path: "/development-scenarios", 
    title: "Plan Solutions", 
    icon: BarChart3, 
    color: nycColors.secondary.green,
    description: "Test scenarios + policies"
  },
  { 
    path: "/neighborhood-impact", 
    title: "Measure Impact", 
    icon: Heart, 
    color: nycColors.secondary.orange,
    description: "Track community outcomes"
  }
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm relative z-50" style={{ borderBottom: `3px solid ${nycColors.primary.blue}` }}>
      {/* NYC Gov Banner */}
      <div className="bg-nyc-blue text-white px-4 py-1.5 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-medium">NYC Housing Preservation & Development Demo</span>
          <span className="opacity-75">Presentation Mode • Not for Production Use</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-nyc-blue to-nyc-light-blue rounded-lg flex items-center justify-center shadow-md">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-nyc-blue leading-tight">Resorcery</h1>
                <span className="text-xs text-gray-600 font-medium">Urban Development Platform</span>
              </div>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex flex-wrap gap-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <button 
                        className={cn(
                          "font-medium px-4 py-2.5 rounded-md text-sm flex items-center gap-2 transition-all duration-200", 
                          isActive 
                            ? "text-white shadow-md" 
                            : "hover:bg-gray-50 text-gray-700 hover:text-nyc-blue hover:shadow-sm"
                        )}
                        style={{
                          backgroundColor: isActive ? item.color : undefined,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden border-t">
          <ul className="flex flex-col p-4 space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <button 
                      className={cn(
                        "font-medium px-4 py-3 rounded-md w-full text-left flex items-center gap-3 transition-all", 
                        isActive 
                          ? "text-white" 
                          : "hover:bg-gray-50 text-gray-700"
                      )}
                      style={{
                        backgroundColor: isActive ? item.color : undefined,
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}