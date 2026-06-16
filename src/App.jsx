import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import Loader from "./components/Loader";

// ── Main Pages ───────────────────────────────
const Home        = lazy(() => import("./pages/Home"));
const Products    = lazy(() => import("./pages/Products"));
const AppDetails  = lazy(() => import("./pages/AppDetails"));
const Categories  = lazy(() => import("./pages/Categories"));
const NotFound    = lazy(() => import("./pages/NotFound"));

// ── Info Pages ───────────────────────────────
const About     = lazy(() => import("./pages/About"));
const Contact   = lazy(() => import("./pages/Contact"));
const FAQ       = lazy(() => import("./pages/FAQ"));
const Policies  = lazy(() => import("./pages/Policies"));

// ── Admin Pages ──────────────────────────────
const AdminLogin    = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard     = lazy(() => import("./pages/admin/Dashboard"));
const AdminApps     = lazy(() => import("./pages/admin/AdminApps"));
const AddApp        = lazy(() => import("./pages/admin/AddApp"));
const EditApp       = lazy(() => import("./pages/admin/EditApp"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const App = () => (
  <HashRouter>
    <Suspense fallback={<Loader fullPage />}>
      <Routes>

        {/* ── Main Layout ───────────────────── */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products"   element={<Products />} />
          <Route path="apps/:id"   element={<AppDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about"      element={<About />} />
          <Route path="contact"    element={<Contact />} />
          <Route path="faq"        element={<FAQ />} />

          {/* Policy pages via single component */}
          <Route path=":policy" element={<Policies />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── Admin Layout ──────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"  element={<Dashboard />} />
          <Route path="apps"       element={<AdminApps />} />
          <Route path="apps/new"   element={<AddApp />} />
          <Route path="apps/:id/edit" element={<EditApp />} />
          <Route path="settings"   element={<AdminSettings />} />
        </Route>

      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;
