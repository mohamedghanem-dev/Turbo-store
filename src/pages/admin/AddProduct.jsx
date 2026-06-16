import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAdmin from "../../hooks/useAdmin";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const CATEGORIES = ["electronics", "clothing", "accessories", "jewelery", "bicycles", "watches", "toys", "swimming"];

const INITIAL_FORM = {
  title: "",
  price: "",
  category: "electronics",
  description: "",
  image: "",
  rating: "",
};

const AddProduct = () => {
  const { handleAdd } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (
      form.rating === "" ||
      isNaN(form.rating) ||
      Number(form.rating) < 0 ||
      Number(form.rating) > 5
    )
      newErrors.rating = "Rating must be between 0 and 5";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    handleAdd({ ...form, price: Number(form.price), rating: { rate: Number(form.rating), count: 0 } });
    toast.success("Product added successfully!");
    navigate("/admin/products");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="section-heading">Add New Product</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-base p-6 space-y-5">

          {/* Image preview */}
          {form.image && (
            <div className="w-full h-40 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={form.image}
                alt="Preview"
                className="h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}

          <Input
            label="Product Title"
            name="title"
            placeholder="e.g. Premium Wireless Headphones"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              name="price"
              type="number"
              placeholder="99.99"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
              required
            />
            <Input
              label="Rating (0–5)"
              name="rating"
              type="number"
              placeholder="4.5"
              value={form.rating}
              onChange={handleChange}
              error={errors.rating}
              required
            />
          </div>

          {/* Category select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Description as textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the product in detail..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={`w-full border ${errors.description ? "border-red-400" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.description}
              </p>
            )}
          </div>

          <Input
            label="Image URL"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={handleChange}
            error={errors.image}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <Button type="submit" size="lg" className="flex-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate("/admin/products")} className="sm:w-auto">
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProduct;
