import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const CATEGORIES = ["electronics", "clothing", "accessories", "jewelery", "bicycles", "watches", "toys", "swimming"];

const EditProduct = () => {
  const { id } = useParams();
  const { products, handleEdit } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const product = products.find((p) => p.id === Number(id));
    if (!product && products.length > 0) {
      navigate("/admin/products");
      return;
    }
    if (product) {
      setForm({
        title:       product.title,
        price:       String(product.price),
        category:    product.category,
        description: product.description,
        image:       product.image,
        rating:      String(product.rating?.rate ?? ""),
      });
    }
  }, [id, products, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim())       errs.title       = "Title is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      errs.price = "Valid price is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.image.trim())       errs.image       = "Image URL is required";
    if (form.rating === "" || isNaN(form.rating) || Number(form.rating) < 0 || Number(form.rating) > 5)
      errs.rating = "Rating must be 0–5";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    handleEdit(id, { ...form, price: Number(form.price) });
    navigate("/admin/products");
  };

  if (!form) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="section-heading">Edit Product</h1>
      </div>

      <div className="card-base p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Price ($)" name="price" type="number" value={form.price} onChange={handleChange} error={errors.price} required />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white outline-none focus:border-brand-500 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3.5 py-3 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white outline-none focus:border-brand-500 transition-colors resize-none"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
          <Input label="Image URL" name="image" value={form.image} onChange={handleChange} error={errors.image} required />
          {form.image && (
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img src={form.image} alt="Preview" className="max-h-full object-contain" />
            </div>
          )}
          <Input label="Rating (0–5)" name="rating" type="number" value={form.rating} onChange={handleChange} error={errors.rating} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" size="lg" className="flex-1">Save Changes</Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate("/admin/products")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
