import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setEditing(false);
    setName(user?.name ?? "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <h1 className="section-heading mb-8">My Profile</h1>

      <div className="card-base p-6 sm:p-8">
        {/* Avatar + identity */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-brand">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-xl leading-tight">
              {name || user?.name}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{user?.email}</p>
            {user?.role && (
              <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mt-2 capitalize">
                {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Account details */}
        <div className="border-t border-slate-100 dark:border-slate-700 pt-6 space-y-5">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Account Details
          </p>

          {/* Name field */}
          <div>
            {editing ? (
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                name="name"
              />
            ) : (
              <>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Full Name
                </p>
                <p className="text-slate-800 dark:text-white font-medium">
                  {name || user?.name}
                </p>
              </>
            )}
          </div>

          {/* Email field (read-only) */}
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Email Address
            </p>
            <p className="text-slate-800 dark:text-white font-medium">{user?.email}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Email cannot be changed.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            {editing ? (
              <>
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
