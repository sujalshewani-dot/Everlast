import { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HeroSlider from "./components/HeroSlider";
import BestSeller from "./components/BestSeller";
import SecondBanner from "./components/SecondBanner";
import Introduction from "./components/Introduction";
import MostSeller from "./components/MostSeller";
import Reviews from "./components/Reviews";

import Men from "./pages/Men";
import Women from "./pages/Women";
import NewArrivals from "./pages/NewArrivals";
import PremiumEdition from "./pages/PremiumEdition";
import Contact from "./pages/Contact";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import "./App.css";

function SimplePage({ title }) {
  return (
    <main
      style={{
        minHeight: "45vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
      <p>This page is coming soon.</p>
    </main>
  );
}

function Home() {
  return (
    <>
      <HeroSlider />
      <BestSeller />
      <SecondBanner />
      <Introduction />
      <MostSeller />
      <Reviews />
    </>
  );
}

function ProductDetailsRoute() {
  const { id } = useParams();
  return <ProductDetails key={id} />;
}

function AppContent() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      {!isCheckout && (
        <>
          <AnnouncementBar />
          <Navbar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/premium-signature" element={<PremiumEdition />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:id" element={<ProductDetailsRoute />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route path="/login" element={<SimplePage title="Login" />} />

        <Route
          path="*"
          element={<SimplePage title="Page Not Found" />}
        />
      </Routes>

      {!isCheckout && <Footer />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}