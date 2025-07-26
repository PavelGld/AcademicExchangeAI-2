import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { Search } from "@/pages/Search";
import { Svg } from "@/pages/Svg";
import { ProfileEdit } from "@/pages/ProfileEdit";
import { Applications } from "@/pages/Applications";
import { Feedback } from "@/pages/Feedback";
import { Recommendations } from "@/pages/Recommendations";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={Search} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Svg} />
        <Route path="/profile/edit" component={ProfileEdit} />
        <Route path="/recommendations" component={Recommendations} />
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
