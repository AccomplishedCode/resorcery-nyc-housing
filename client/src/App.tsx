import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import OpportunityFinder from "@/pages/OpportunityFinder";
import DevelopmentScenarios from "@/pages/DevelopmentScenarios";
import NeighborhoodImpact from "@/pages/NeighborhoodImpact";
import EnvironmentalImpact from "@/pages/EnvironmentalImpact";
import AffordabilityCalculator from "@/pages/AffordabilityCalculator";
import ThreeDVisualization from "@/pages/ThreeDVisualization";
import PolicyLab from "@/pages/PolicyLab";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/opportunity-finder" component={OpportunityFinder} />
      <Route path="/development-scenarios" component={DevelopmentScenarios} />
      <Route path="/neighborhood-impact" component={NeighborhoodImpact} />
      <Route path="/environmental-impact" component={EnvironmentalImpact} />
      <Route path="/affordability-calculator" component={AffordabilityCalculator} />
      <Route path="/3d-visualization" component={ThreeDVisualization} />
      <Route path="/policy-lab" component={PolicyLab} />
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
