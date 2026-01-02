import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LoginForm } from "../../components/Form/LoginForm";
import { useThemeStore } from "../../stores/useThemeStore";
import { useTheme } from "../../theme/Theme";

const LoginPage = () => {
  const isDark = useThemeStore((state) => state.isDarkMode);
  const theme = useTheme();

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden transition-colors ${theme.bg}`}
    >
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative z-10 ${theme.container}`}
      >
        <Link
          to="/home"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 hover:text-cyan-500 transition-colors ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme.text}`}>
            Welcome Back
          </h1>
          <p className={isDark ? "text-slate-400" : "text-slate-500"}>
            Enter your credentials to access your account.
          </p>
        </div>

        <LoginForm theme={theme} onClose={() => {}} />

        <div className="mt-6 text-center text-sm">
          <span className={isDark ? "text-slate-400" : "text-slate-500"}>
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="font-bold text-cyan-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
