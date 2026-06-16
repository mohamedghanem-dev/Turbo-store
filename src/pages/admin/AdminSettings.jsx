import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAdminAuth from "../../hooks/useAdminAuth";
import Input from "../../components/Input";
import Button from "../../components/Button";

const AdminSettings = () => {
  const { changePassword } = useAdminAuth();
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.current || !form.next || !form.confirm) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (form.next !== form.confirm) {
      setError("الباسورد الجديد غير متطابق مع التأكيد");
      return;
    }
    if (form.next.length < 4) {
      setError("الباسورد الجديد قصير جدًا (4 أحرف على الأقل)");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword(form.current, form.next);
      toast.success("تم تغيير الباسورد بنجاح");
      setForm({ current: "", next: "", confirm: "" });
    } catch (err) {
      setError(err.message || "حدث خطأ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-md"
    >
      <div className="mb-6">
        <h1 className="section-heading">الإعدادات</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          تغيير باسورد لوحة التحكم
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-base p-6 space-y-4">
        <Input
          label="الباسورد الحالي"
          name="current"
          type="password"
          value={form.current}
          onChange={handleChange}
          required
        />
        <Input
          label="الباسورد الجديد"
          name="next"
          type="password"
          value={form.next}
          onChange={handleChange}
          required
        />
        <Input
          label="تأكيد الباسورد الجديد"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" size="lg" className="w-full" loading={submitting} disabled={submitting}>
          حفظ التغييرات
        </Button>
      </form>
    </motion.div>
  );
};

export default AdminSettings;
