import React, { useEffect } from "react";
import useToastStore from "./types/useToastStore";

const Toast: React.FC = () => {
  const { toast, removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(), 4000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  if (!toast) return null;

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${`alert-${toast.type}`} text-white`}>
        <span>{toast.message}</span>
        <button onClick={removeToast} className="btn btn-sm">
          <span>x</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;
