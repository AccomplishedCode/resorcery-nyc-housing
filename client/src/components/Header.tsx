import { useLocation } from "wouter";
import { Link } from "wouter";

export function Header() {
  const [location] = useLocation();
  
  // Map paths to page titles
  const pageTitles: Record<string, string> = {
    "/opportunity-finder": "Opportunity Finder",
    "/development-scenarios": "Development Scenarios",
    "/neighborhood-impact": "Neighborhood Impact",
    "/environmental-impact": "Environmental Impact",
    "/affordability-calculator": "Affordability Calculator",
    "/policy-lab": "Policy Lab",
    "/community-benefit-analyzer": "Community Benefits",
    "/ai-assistant-chat": "AI Assistant"
  };

  // Get current page title
  const currentPageTitle = pageTitles[location] || "Page Not Found";

  return (
    <header className="bg-white shadow-sm py-3 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-gray-800">{currentPageTitle}</h1>
      </div>
    </header>
  );
}
