import { createContext, useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAdd = useCallback(async (productData) => {
    try {
      const newProduct = await addProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added successfully!");
      return newProduct;
    } catch {
      toast.error("Failed to add product");
    }
  }, []);

  const handleEdit = useCallback(async (id, updatedData) => {
    try {
      await updateProduct(id, updatedData);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === Number(id)
            ? {
                ...p,
                ...updatedData,
                rating: {
                  rate: Number(updatedData.rating) || p.rating?.rate || 0,
                  count: p.rating?.count || 0,
                },
              }
            : p
        )
      );
      toast.success("Product updated!");
    } catch {
      toast.error("Failed to update product");
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  }, []);

  const value = {
    products,
    setProducts,
    loadProducts,
    handleAdd,
    handleEdit,
    handleDelete,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
