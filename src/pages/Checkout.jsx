import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useCart from "../hooks/useCart";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";

const initialShipping = { fullName: "", address: "", city: "", phone: "" };
const initialPayment = { cardNumber: "", expiry: "", cvv: "" };

const STEPS = ["Shipping", "Payment", "Review"];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center mb-8">
    {STEPS.map((step, i) => (
      <div key={step} className="flex items-center">
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-brand-600 text-white"
                : i === current
                ? "bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-900/40"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400"
            }`}
          >
            {i < current ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          <span
            className={`text-xs font-medium hidden sm:block ${
              i <= current ? "text-brand-600 dark:text-brand-400" : "text-slate-400"
            }`}
          >
            {step}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div
            className={`w-16 sm:w-24 h-0.5 mx-2 transition-all ${
              i < current ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-700"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState(initialShipping);
  const [payment, setPayment] = useState(initialPayment);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const tax = (parseFloat(totalPrice) * 0.08).toFixed(2);
  const shipping_cost = parseFloat(totalPrice) >= 50 ? 0 : 9.99;
  const grandTotal = (parseFloat(totalPrice) + parseFloat(tax) + shipping_cost).toFixed(2);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!shipping.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!payment.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (payment.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!payment.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
      newErrors.expiry = "Format must be MM/YY";
    }
    if (!payment.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (payment.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    return newErrors;
  };

  const handleNext = () => {
    if (step === 0) {
      const errs = validateShipping();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    }
    if (step === 1) {
      const errs = validatePayment();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Order placed successfully!");
    const orderNumber = `ORD-${Date.now()}`;
    clearCart();
    navigate("/order-confirmation", {
      state: { orderNumber, totalItems, totalPrice: grandTotal },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="mb-8">
        <h1 className="section-heading">Checkout</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Complete your purchase securely
        </p>
      </div>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT — form steps */}
        <div className="lg:col-span-2">

          {/* Step 0: Shipping */}
          {step === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card-base p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">Shipping Information</h2>
                  <p className="text-xs text-slate-400">Where should we deliver?</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Full Name" name="fullName" value={shipping.fullName} onChange={handleShippingChange} error={errors.fullName} placeholder="John Doe" />
                <Input label="Street Address" name="address" value={shipping.address} onChange={handleShippingChange} error={errors.address} placeholder="123 Main St, Apt 4B" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="City" name="city" value={shipping.city} onChange={handleShippingChange} error={errors.city} placeholder="New York" />
                  <Input label="Phone Number" name="phone" value={shipping.phone} onChange={handleShippingChange} error={errors.phone} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="mt-6">
                <Button size="lg" onClick={handleNext} className="w-full sm:w-auto">
                  Continue to Payment
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card-base p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white">Payment Details</h2>
                  <p className="text-xs text-slate-400">Your payment info is encrypted</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Card Number"
                  value={payment.cardNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                    setPayment((prev) => ({ ...prev, cardNumber: formatted }));
                    setErrors((prev) => ({ ...prev, cardNumber: "" }));
                  }}
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    value={payment.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
                      setPayment((prev) => ({ ...prev, expiry: value }));
                      setErrors((prev) => ({ ...prev, expiry: "" }));
                    }}
                    error={errors.expiry}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVV"
                    value={payment.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                      setPayment((prev) => ({ ...prev, cvv: value }));
                      setErrors((prev) => ({ ...prev, cvv: "" }));
                    }}
                    error={errors.cvv}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" onClick={handleNext} className="flex-1">
                  Review Order
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setStep(0)}>
                  Back
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Shipping summary */}
              <div className="card-base p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Shipping To</h3>
                  <button onClick={() => setStep(0)} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">Edit</button>
                </div>
                <p className="text-sm text-slate-800 dark:text-white font-medium">{shipping.fullName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{shipping.address}, {shipping.city}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{shipping.phone}</p>
              </div>

              {/* Payment summary */}
              <div className="card-base p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Payment Method</h3>
                  <button onClick={() => setStep(1)} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">Edit</button>
                </div>
                <p className="text-sm text-slate-800 dark:text-white">
                  •••• •••• •••• {payment.cardNumber.replace(/\s/g, "").slice(-4)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Expires {payment.expiry}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" loading={loading} onClick={handleSubmit} className="flex-1">
                  {loading ? "Processing..." : `Place Order — $${grandTotal}`}
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>

              <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                By placing your order you agree to our{" "}
                <span className="text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">Terms & Conditions</span>
              </p>
            </motion.div>
          )}
        </div>

        {/* RIGHT — order summary */}
        <div>
          <div className="card-base p-5 lg:sticky lg:top-24">
            <h2 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-100 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-slate-400">×{item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Tax (8%)</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span className={shipping_cost === 0 ? "text-emerald-500 font-medium" : ""}>
                  {shipping_cost === 0 ? "Free" : `$${shipping_cost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-700">
                <span>Total</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Secure SSL encrypted checkout
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Checkout;
