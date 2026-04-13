import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminGuard } from "@/components/AdminGuard";

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import CreatorsPage from "@/pages/CreatorsPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import CaseStudyDetailPage from "@/pages/CaseStudyDetailPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import JoinBrandPage from "@/pages/JoinBrandPage";
import JoinCreatorPage from "@/pages/JoinCreatorPage";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminServicesPage from "@/pages/admin/AdminServicesPage";
import AdminCreatorsPage from "@/pages/admin/AdminCreatorsPage";
import AdminCaseStudiesPage from "@/pages/admin/AdminCaseStudiesPage";
import AdminBlogPage from "@/pages/admin/AdminBlogPage";
import AdminEnquiriesPage from "@/pages/admin/AdminEnquiriesPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/:id" component={ServiceDetailPage} />
      <Route path="/creators" component={CreatorsPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/case-studies/:id" component={CaseStudyDetailPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/join/brand" component={JoinBrandPage} />
      <Route path="/join/creator" component={JoinCreatorPage} />

      {/* Admin Login (unprotected) */}
      <Route path="/admin/login" component={AdminLoginPage} />

      {/* Protected Admin Routes */}
      <Route path="/admin">
        {() => <AdminGuard><AdminDashboardPage /></AdminGuard>}
      </Route>
      <Route path="/admin/services">
        {() => <AdminGuard><AdminServicesPage /></AdminGuard>}
      </Route>
      <Route path="/admin/creators">
        {() => <AdminGuard><AdminCreatorsPage /></AdminGuard>}
      </Route>
      <Route path="/admin/case-studies">
        {() => <AdminGuard><AdminCaseStudiesPage /></AdminGuard>}
      </Route>
      <Route path="/admin/blog">
        {() => <AdminGuard><AdminBlogPage /></AdminGuard>}
      </Route>
      <Route path="/admin/enquiries">
        {() => <AdminGuard><AdminEnquiriesPage /></AdminGuard>}
      </Route>
      <Route path="/admin/settings">
        {() => <AdminGuard><AdminSettingsPage /></AdminGuard>}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
