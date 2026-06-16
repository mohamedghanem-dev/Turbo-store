import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        px-4
      "
      onClick={onClose}
    >

      <div
        className="
          bg-white dark:bg-gray-800
          rounded-xl shadow-xl
          w-full max-w-md
          max-h-[90vh]
          overflow-y-auto
          p-4 sm:p-6
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg sm:text-xl font-bold transition"
          >
            ✕
          </button>

        </div>

        {/* Content */}
        <div className="text-sm sm:text-base">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;