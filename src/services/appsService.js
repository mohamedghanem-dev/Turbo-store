import { supabase, getPublicUrl } from "./supabaseClient";

/**
 * Categories shown across the store (Home circular icons, Categories page,
 * Products filter, and the Admin "Add/Edit App" form).
 *
 * `slug` is what's stored in the `apps.category` column.
 * `icon` points to the small category artwork in /public/images/categories.
 */
export const CATEGORIES = [
  {
    slug: "android-apps",
    name: "تطبيقات أندرويد",
    nameEn: "Android Apps",
    icon: "./images/categories/android-apps.png",
    color: "from-green-500 to-emerald-600",
  },
  {
    slug: "games",
    name: "ألعاب",
    nameEn: "Games",
    icon: "./images/categories/android-apps.png",
    color: "from-red-500 to-rose-600",
  },
  {
    slug: "windows-software",
    name: "برامج الكمبيوتر",
    nameEn: "Windows Software",
    icon: "./images/categories/windows-software.png",
    color: "from-blue-500 to-cyan-600",
  },
  {
    slug: "linux-software",
    name: "برامج لينكس",
    nameEn: "Linux Software",
    icon: "./images/categories/linux-software.png",
    color: "from-slate-500 to-gray-700",
  },
  {
    slug: "ios-apps",
    name: "تطبيقات آيفون",
    nameEn: "iOS Apps",
    icon: "./images/categories/ios-apps.png",
    color: "from-zinc-500 to-neutral-700",
  },
  {
    slug: "flutter-apps",
    name: "تطبيقات Flutter",
    nameEn: "Flutter Apps",
    icon: "./images/categories/flutter-apps.png",
    color: "from-sky-500 to-blue-600",
  },
  {
    slug: "systems-crm",
    name: "أنظمة وبرامج CRM",
    nameEn: "Systems & CRM",
    icon: "./images/categories/systems-crm.png",
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "ebooks",
    name: "كتب ومراجع",
    nameEn: "E-Books",
    icon: "./images/categories/ebooks.png",
    color: "from-purple-500 to-violet-600",
  },
];

export const getCategoryInfo = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) || { slug, name: slug, nameEn: slug, icon: "", color: "from-slate-500 to-slate-600" };

/**
 * Normalize a raw row from the `apps` table into the shape the UI expects,
 * resolving storage paths (icon_url / screenshots) to full public URLs.
 */
const normalizeApp = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  icon: getPublicUrl(row.icon_url),
  screenshots: (row.screenshots || []).map((s) => getPublicUrl(s)),
  downloadLinks: row.download_links || [],
  demoVideoUrl: row.demo_video_url || "",
  isFree: row.is_free !== false, // default true if null
  price: row.price ?? 0,
  category: row.category || "android-apps",
  createdAt: row.created_at,
});

/** Fetch all apps, newest first. */
export const fetchApps = async () => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeApp);
};

/** Fetch a single app by id. */
export const fetchAppById = async (id) => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return normalizeApp(data);
};

/**
 * Create a new app row.
 * `payload` should already contain storage paths for icon_url/screenshots
 * (use uploadAsset from supabaseClient before calling this).
 */
export const createApp = async (payload) => {
  const { data, error } = await supabase
    .from("apps")
    .insert([
      {
        title: payload.title,
        description: payload.description,
        icon_url: payload.iconUrl,
        screenshots: payload.screenshots || [],
        download_links: payload.downloadLinks || [],
        demo_video_url: payload.demoVideoUrl || null,
        is_free: payload.isFree,
        price: payload.isFree ? 0 : payload.price,
        category: payload.category,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return normalizeApp(data);
};

/** Update an existing app row by id. */
export const updateApp = async (id, payload) => {
  const { data, error } = await supabase
    .from("apps")
    .update({
      title: payload.title,
      description: payload.description,
      icon_url: payload.iconUrl,
      screenshots: payload.screenshots || [],
      download_links: payload.downloadLinks || [],
      demo_video_url: payload.demoVideoUrl || null,
      is_free: payload.isFree,
      price: payload.isFree ? 0 : payload.price,
      category: payload.category,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return normalizeApp(data);
};

/** Delete an app row by id. */
export const deleteApp = async (id) => {
  const { error } = await supabase.from("apps").delete().eq("id", id);
  if (error) throw error;
};
