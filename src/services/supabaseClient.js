import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hifoirusgzwynvnimdol.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_2kb0HTxvbzrw_aXcRs2aeQ_zHUwUXUy";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage bucket used for app icons + screenshots
export const ASSETS_BUCKET = "nexus-assets";

/**
 * Build a public URL for a file stored in the nexus-assets bucket.
 * Pass the storage path (e.g. "icons/myapp.png") returned when uploading.
 */
export const getPublicUrl = (path) => {
  if (!path) return "";
  // Already a full URL (e.g. external link) — return as-is.
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const { data } = supabase.storage.from(ASSETS_BUCKET).getPublicUrl(path);
  return data?.publicUrl || "";
};

/**
 * Upload a file to the nexus-assets bucket under a folder (e.g. "icons", "screenshots").
 * Returns the storage path to save in the database.
 */
export const uploadAsset = async (file, folder = "uploads") => {
  const ext = file.name.split(".").pop();
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${folder}/${safeName}`;

  const { error } = await supabase.storage.from(ASSETS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;
  return path;
};

/**
 * Delete a file from the nexus-assets bucket given its storage path.
 */
export const deleteAsset = async (path) => {
  if (!path || path.startsWith("http")) return; // skip external links
  const { error } = await supabase.storage.from(ASSETS_BUCKET).remove([path]);
  if (error) throw error;
};
