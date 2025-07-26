import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { Svg } from "@/pages/Svg";
import { Applications } from "@/pages/Applications";
import { Feedback } from "@/pages/Feedback";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={Home} />
        <Route path="/profile" component={Svg} />
        <Route path="/applications" component={Applications} />
        <Route path="/feedback" component={Feedback} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
