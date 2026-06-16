import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAdminAuth from "../../hooks/useAdminAuth";

const AdminLogin = () => {
  const { isAuthed, login, checking } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthed) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login(password);
    if (ok) {
      toast.success("تم تسجيل الدخول");
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("الباسورد غير صحيح");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-sm card-base p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="./icons/icon-96x96.png"
            alt="Nexus Arab Store"
            className="w-16 h-16 rounded-2xl shadow-brand-sm mb-3"
          />
          <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            لوحة تحكم Nexus Arab Store
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            أدخل الباسورد للدخول إلى لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="sr-only">الباسورد</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-brand transition-all active:scale-95 disabled:opacity-60"
          >
            {checking ? "جاري التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
