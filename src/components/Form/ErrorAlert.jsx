import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";

export const ErrorAlert = ({ theme }) => {
  const { error, clearError } = useAuthStore();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      clearError();
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div
      className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm border ${theme.errorBg}`}
    >
      <AlertCircle size={16} />
      {error}
    </div>
  );
};
