import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/opportunity-finder", title: "Opportunity Finder" },
  { path: "/development-scenarios", title: "Development Scenarios" },
  { path: "/neighborhood-impact", title: "Neighborhood Impact" }
];

export function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-md">
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
        <nav>
          <ul className="flex space-x-6">
            {navItems.map(item => (
              <li key={item.path}>
                <Link href={item.path}>
                  <button 
                    className={cn(
                      "font-medium px-3 py-2 rounded-md", 
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
    </header>
  );
}
