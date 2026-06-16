import { createContext, useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import {
  fetchApps,
  createApp,
  updateApp,
  deleteApp,
} from "../services/appsService";
import { uploadAsset, deleteAsset } from "../services/supabaseClient";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApps = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchApps();
      setApps(data);
    } catch (err) {
      console.error(err);
      toast.error("فشل تحميل التطبيقات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  /**
   * Add a new app.
   * `formData` = { title, description, category, isFree, price, demoVideoUrl,
   *                 downloadLinks: string[],
   *                 iconFile: File|null, iconUrl: string|null (existing path/url),
   *                 screenshotFiles: File[], existingScreenshots: string[] }
   */
  const handleAdd = useCallback(async (formData) => {
    try {
      let iconUrl = formData.iconUrl || "";
      if (formData.iconFile) {
        iconUrl = await uploadAsset(formData.iconFile, "icons");
      }

      const screenshotPaths = [...(formData.existingScreenshots || [])];
      if (formData.screenshotFiles?.length) {
        for (const file of formData.screenshotFiles) {
          const path = await uploadAsset(file, "screenshots");
          screenshotPaths.push(path);
        }
      }

      const newApp = await createApp({
        title: formData.title,
        description: formData.description,
        iconUrl,
        screenshots: screenshotPaths,
        downloadLinks: formData.downloadLinks,
        demoVideoUrl: formData.demoVideoUrl,
        isFree: formData.isFree,
        price: formData.price,
        category: formData.category,
      });

      setApps((prev) => [newApp, ...prev]);
      toast.success("تم إضافة التطبيق بنجاح");
      return newApp;
    } catch (err) {
      console.error(err);
      toast.error("فشل إضافة التطبيق");
      throw err;
    }
  }, []);

  /** Update an existing app. Same formData shape as handleAdd. */
  const handleEdit = useCallback(async (id, formData) => {
    try {
      let iconUrl = formData.iconUrl || "";
      if (formData.iconFile) {
        iconUrl = await uploadAsset(formData.iconFile, "icons");
      }

      const screenshotPaths = [...(formData.existingScreenshots || [])];
      if (formData.screenshotFiles?.length) {
        for (const file of formData.screenshotFiles) {
          const path = await uploadAsset(file, "screenshots");
          screenshotPaths.push(path);
        }
      }

      const updated = await updateApp(id, {
        title: formData.title,
        description: formData.description,
        iconUrl,
        screenshots: screenshotPaths,
        downloadLinks: formData.downloadLinks,
        demoVideoUrl: formData.demoVideoUrl,
        isFree: formData.isFree,
        price: formData.price,
        category: formData.category,
      });

      setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      toast.success("تم تحديث التطبيق");
      return updated;
    } catch (err) {
      console.error(err);
      toast.error("فشل تحديث التطبيق");
      throw err;
    }
  }, []);

  /** Delete an app and best-effort clean up its storage files. */
  const handleDelete = useCallback(async (id) => {
    try {
      const app = apps.find((a) => a.id === id);
      await deleteApp(id);

      // Best-effort cleanup (ignore failures so deletion still succeeds)
      if (app) {
        try {
          if (app.icon) await deleteAsset(app.icon.split("/").slice(-2).join("/"));
        } catch { /* ignore */ }
      }

      setApps((prev) => prev.filter((a) => a.id !== id));
      toast.success("تم حذف التطبيق");
    } catch (err) {
      console.error(err);
      toast.error("فشل حذف التطبيق");
    }
  }, [apps]);

  const value = {
    apps,
    loading,
    loadApps,
    handleAdd,
    handleEdit,
    handleDelete,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
