import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";

const StatCard = ({ label, value, icon, trend, color }) => (
  <div className={`card-base p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-opacity-10 ${color.replace("border-", "bg-").replace("-500", "-100").replace("-600", "-100")} dark:bg-opacity-20`}>
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{value ?? "—"}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
  </div>
);

const Dashboard = () => {
  const { products, handleDelete } = useAdmin();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!products.length) return null;
    const sorted = [...products].sort((a, b) => b.price - a.price);
    const avgPrice = (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2);
    return {
      total:       products.length,
      categories:  new Set(products.map((p) => p.category)).size,
      avgPrice:    `$${avgPrice}`,
      topRated:    products.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))[0]?.rating?.rate,
    };
  }, [products]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-heading">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Overview of your store</p>
        </div>
        <Link to="/admin/add-product">
          <Button icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }>
            New Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={stats?.total}       icon="📦" color="border-brand-500" trend="+2 this week" />
        <StatCard label="Categories"     value={stats?.categories}  icon="🏷️" color="border-green-500" />
        <StatCard label="Avg. Price"     value={stats?.avgPrice}    icon="💰" color="border-amber-500" />
        <StatCard label="Top Rating"     value={stats?.topRated ? `${stats.topRated}★` : "—"} icon="⭐" color="border-purple-500" />
      </div>

      {/* Products Table */}
      <div className="card-base overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-semibold text-slate-800 dark:text-white">All Products</h2>
          <span className="text-xs text-slate-400">{products.length} items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Rating</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center p-1 shrink-0">
                        <img src={p.image} alt={p.title} className="max-h-full object-contain" />
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white line-clamp-1 max-w-[200px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-brand-600 dark:text-brand-400">${p.price}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      {p.rating?.rate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="xs" variant="secondary" onClick={() => navigate(`/admin/edit-product/${p.id}`)}>Edit</Button>
                      <Button size="xs" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No products yet.{" "}
            <Link to="/admin/add-product" className="text-brand-600 dark:text-brand-400 hover:underline">
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
