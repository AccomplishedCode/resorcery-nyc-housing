import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/opportunity-finder", title: "Opportunity Finder" },
  { path: "/development-scenarios", title: "Development Scenarios" },
  { path: "/neighborhood-impact", title: "Neighborhood Impact" },
  { path: "/environmental-impact", title: "Environmental Impact" },
  { path: "/affordability-calculator", title: "Affordability Calculator" },
  { path: "/policy-lab", title: "Policy Lab" },
  { path: "/community-benefit-analyzer", title: "Community Benefits" },
  { path: "/ai-assistant-chat", title: "AI Assistant" }
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img 
              src="https://www.nyc.gov/assets/home/images/global/nyc-logo.svg" 
              alt="NYC Logo" 
              className="h-12"
            />
            <div className="ml-4">
              <h1 className="font-heading font-bold text-2xl text-[#0A5796]">Housing Department</h1>
              <p className="text-[#6C757D] text-sm">Future Vision Initiative</p>
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
            {navItems.map(item => (
              <li key={item.path}>
                <Link href={item.path}>
                  <button 
                    className={cn(
                      "font-medium px-3 py-2 rounded-md text-sm", 
                      location === item.path 
                        ? "bg-[#0A5796] text-white" 
                        : "hover:bg-[#E9ECEF]"
                    )}
                  >
                    {item.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <ul className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <li key={item.path}>
                <Link href={item.path}>
                  <button 
                    className={cn(
                      "font-medium px-3 py-2 rounded-md w-full text-left", 
                      location === item.path 
                        ? "bg-[#0A5796] text-white" 
                        : "hover:bg-[#E9ECEF]"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
