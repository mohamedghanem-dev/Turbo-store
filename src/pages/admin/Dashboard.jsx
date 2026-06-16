import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { getCategoryInfo } from "../../services/appsService";
import Button from "../../components/Button";

const StatCard = ({ label, value, icon, color }) => (
  <div className={`card-base p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-100 dark:bg-slate-800">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{value ?? "—"}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
  </div>
);

const Dashboard = () => {
  const { apps, loading, handleDelete } = useAdmin();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!apps.length) return null;
    return {
      total: apps.length,
      categories: new Set(apps.map((a) => a.category)).size,
      free: apps.filter((a) => a.isFree).length,
      paid: apps.filter((a) => !a.isFree).length,
    };
  }, [apps]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-heading">لوحة التحكم</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">نظرة عامة على متجر Nexus Arab Store</p>
        </div>
        <Link to="/admin/apps/new">
          <Button icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }>
            إضافة تطبيق جديد
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي التطبيقات" value={stats?.total}      icon="📦" color="border-brand-500" />
        <StatCard label="الأقسام"          value={stats?.categories} icon="🏷️" color="border-green-500" />
        <StatCard label="مجانية"           value={stats?.free}       icon="⬇️" color="border-amber-500" />
        <StatCard label="مدفوعة"           value={stats?.paid}       icon="💰" color="border-purple-500" />
      </div>

      {/* Apps Table */}
      <div className="card-base overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-semibold text-slate-800 dark:text-white">كل التطبيقات</h2>
          <span className="text-xs text-slate-400">{apps.length} عنصر</span>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-400 text-sm">جاري التحميل...</div>
        )}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">التطبيق</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">القسم</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">السعر</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                          <img src={app.icon || "./icons/icon-96x96.png"} alt={app.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-white line-clamp-1 max-w-[200px]">{app.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{getCategoryInfo(app.category).name}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {app.isFree
                        ? <span className="text-green-600 dark:text-green-400">مجاني</span>
                        : <span className="text-brand-600 dark:text-brand-400">{app.price} $</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-start gap-2">
                        <Button size="xs" variant="secondary" onClick={() => navigate(`/admin/apps/${app.id}/edit`)}>تعديل</Button>
                        <Button size="xs" variant="danger" onClick={() => handleDelete(app.id)}>حذف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && apps.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            لا يوجد تطبيقات حتى الآن.{" "}
            <Link to="/admin/apps/new" className="text-brand-600 dark:text-brand-400 hover:underline">
              أضف أول تطبيق
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
