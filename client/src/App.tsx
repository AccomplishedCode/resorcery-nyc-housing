import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import OpportunityFinderEnhanced from "@/pages/OpportunityFinderEnhanced";
import DevelopmentScenariosEnhanced from "@/pages/DevelopmentScenariosEnhanced";
import NeighborhoodImpactEnhanced from "@/pages/NeighborhoodImpactEnhanced";
import EnvironmentalImpactEnhanced from "@/pages/EnvironmentalImpactEnhanced";
import AffordabilityCalculatorEnhanced from "@/pages/AffordabilityCalculatorEnhanced";
import PolicyLabEnhanced from "@/pages/PolicyLabEnhanced";
import CommunityBenefitAnalyzerEnhanced from "@/pages/CommunityBenefitAnalyzerEnhanced";
import AIAssistantChat from "@/pages/AIAssistantChat";
import Visualization3D from "@/pages/Visualization3D";
import HomeRedesigned from "@/pages/HomeRedesigned";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedesigned} />
      <Route path="/executive-dashboard" component={ExecutiveDashboard} />
      <Route path="/opportunity-finder" component={OpportunityFinderEnhanced} />
      <Route path="/development-scenarios" component={DevelopmentScenariosEnhanced} />
      <Route path="/neighborhood-impact" component={NeighborhoodImpactEnhanced} />
      <Route path="/environmental-impact" component={EnvironmentalImpactEnhanced} />
      <Route path="/affordability-calculator" component={AffordabilityCalculatorEnhanced} />
      <Route path="/policy-lab" component={PolicyLabEnhanced} />
      <Route path="/community-benefit-analyzer" component={CommunityBenefitAnalyzerEnhanced} />
      <Route path="/ai-assistant-chat" component={AIAssistantChat} />
      <Route path="/visualization-3d" component={Visualization3D} />
      <Route component={NotFound} />
    </Switch>
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
