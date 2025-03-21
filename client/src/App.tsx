import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/AppLayout";
import NotFound from "@/pages/not-found";
import OpportunityFinder from "@/pages/OpportunityFinder";
import DevelopmentScenarios from "@/pages/DevelopmentScenarios";
import NeighborhoodImpact from "@/pages/NeighborhoodImpact";
import EnvironmentalImpact from "@/pages/EnvironmentalImpact";
import AffordabilityCalculator from "@/pages/AffordabilityCalculator";
import PolicyLab from "@/pages/PolicyLab";
import CommunityBenefitAnalyzer from "@/pages/CommunityBenefitAnalyzer";
import AIAssistantChat from "@/pages/AIAssistantChat";
import Home from "@/pages/Home";

function Router() {
  const [location] = useLocation();
  const isHomePage = location === "/";

  return (
    <AppLayout showHeader={false}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/opportunity-finder" component={OpportunityFinder} />
        <Route path="/development-scenarios" component={DevelopmentScenarios} />
        <Route path="/neighborhood-impact" component={NeighborhoodImpact} />
        <Route path="/environmental-impact" component={EnvironmentalImpact} />
        <Route path="/affordability-calculator" component={AffordabilityCalculator} />
        <Route path="/policy-lab" component={PolicyLab} />
        <Route path="/community-benefit-analyzer" component={CommunityBenefitAnalyzer} />
        <Route path="/ai-assistant-chat" component={AIAssistantChat} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
