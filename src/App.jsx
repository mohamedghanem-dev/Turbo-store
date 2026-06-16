import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// ── Main Pages ───────────────────────────────
const Home             = lazy(() => import("./pages/Home"));
const Products         = lazy(() => import("./pages/Products"));
const ProductDetails   = lazy(() => import("./pages/ProductDetails"));
const Categories       = lazy(() => import("./pages/Categories"));
const Deals            = lazy(() => import("./pages/Deals"));
const Cart             = lazy(() => import("./pages/Cart"));
const Wishlist         = lazy(() => import("./pages/Wishlist"));
const Profile          = lazy(() => import("./pages/Profile"));
const Orders           = lazy(() => import("./pages/Orders"));
const Checkout         = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Login            = lazy(() => import("./pages/Login"));
const Register         = lazy(() => import("./pages/Register"));
const NotFound         = lazy(() => import("./pages/NotFound"));

// ── Info Pages ───────────────────────────────
const About     = lazy(() => import("./pages/About"));
const Contact   = lazy(() => import("./pages/Contact"));
const FAQ       = lazy(() => import("./pages/FAQ"));
const Policies  = lazy(() => import("./pages/Policies"));

// ── Admin Pages ──────────────────────────────
const Dashboard     = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AddProduct    = lazy(() => import("./pages/admin/AddProduct"));
const EditProduct   = lazy(() => import("./pages/admin/EditProduct"));

const App = () => (
  <HashRouter>
    <Suspense fallback={<Loader fullPage />}>
      <Routes>

        {/* ── Main Layout ───────────────────── */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products"    element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="categories"  element={<Categories />} />
          <Route path="deals"       element={<Deals />} />
          <Route path="cart"        element={<Cart />} />
          <Route path="wishlist"    element={<Wishlist />} />
          <Route path="login"       element={<Login />} />
          <Route path="register"    element={<Register />} />
          <Route path="about"       element={<About />} />
          <Route path="contact"     element={<Contact />} />
          <Route path="faq"         element={<FAQ />} />

          {/* Policy pages via single component */}
          <Route path=":policy" element={<Policies />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── Admin Layout ──────────────────── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"        element={<Dashboard />} />
          <Route path="products"         element={<AdminProducts />} />
          <Route path="add-product"      element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;
