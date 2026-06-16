import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";
import Input from "../../components/Input";

const CATEGORY_BADGE = {
  electronics: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  clothing:    "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  accessories: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  jewelery:    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
};

const AdminProducts = () => {
  const { products, handleDelete } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="section-heading">Products</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {products.length} total products
          </p>
        </div>
        <Button onClick={() => navigate("/admin/add-product")} className="w-full sm:w-auto shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-5 w-full sm:max-w-sm">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[580px]">

            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg p-1.5 shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-100 line-clamp-1 max-w-[180px] sm:max-w-xs">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className={`badge capitalize ${CATEGORY_BADGE[product.category] ?? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        ${product.price}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="xs"
                          variant="secondary"
                          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          variant="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-14">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No products found</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">Try a different search term</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminProducts;
