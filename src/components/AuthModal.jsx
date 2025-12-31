import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";

const AuthModal = ({ isOpen, onClose, initialMode = "login", isDark }) => {
  const [mode, setMode] = useState(initialMode);
  const theme = {
    overlay: isDark ? "bg-slate-950/80" : "bg-slate-200/60",
    modal: isDark
      ? "bg-slate-900 border-white/10"
      : "bg-white border-slate-200",
    text: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-slate-400" : "text-slate-500",
    inputBg: isDark
      ? "bg-slate-950 border-white/10 focus:border-cyan-500"
      : "bg-slate-50 border-slate-200 focus:border-cyan-500",
    inputIcon: isDark ? "text-slate-500" : "text-slate-400",
    errorBg: isDark
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : "bg-red-50 text-red-600 border-red-200",
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm ${theme.overlay}`}
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl border overflow-hidden ${theme.modal}`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-cyan-500/20 blur-[60px] pointer-events-none" />

            <button
              onClick={onClose}
              className={`absolute top-6 right-6 p-1 rounded-full hover:bg-black/5 transition-colors ${theme.textMuted}`}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className={`text-3xl font-bold mb-2 ${theme.text}`}>
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className={theme.textMuted}>
                {mode === "login"
                  ? "Enter your details to sign in."
                  : "Join the community for free."}
              </p>
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <LoginForm key="login" theme={theme} onClose={onClose} />
                ) : (
                  <RegisterForm
                    key="register"
                    theme={theme}
                    onClose={onClose}
                  />
                )}
              </AnimatePresence>
            </div>

            <div
              className={`mt-6 text-center text-sm ${theme.textMuted} relative z-10`}
            >
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={switchMode}
                className="font-bold text-cyan-500 hover:underline focus:outline-none"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- LOGIN FORM ---
const LoginForm = ({ theme, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, loading, error } = useAuthStore();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <motion.form
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
    >
      {error && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm border ${theme.errorBg}`}
        >
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <InputField
        name="username"
        type="text"
        placeholder="Username"
        icon={<User size={20} />}
        theme={theme}
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        name="password"
        type="password"
        placeholder="Password"
        icon={<Lock size={20} />}
        theme={theme}
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex justify-end mb-6">
        <button type="button" className="text-xs text-cyan-500 hover:underline">
          Forgot Password?
        </button>
      </div>

      <SubmitButton loading={loading} text="Log In" />
    </motion.form>
  );
};

// --- REGISTER FORM ---
const RegisterForm = ({ theme, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [localError, setLocalError] = useState("");
  const { register, loading, error: storeError } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      setLocalError("Passwords do not match");
      return;
    }
    const success = await register({
      username: formData.username,
      password: formData.password,
    });
    if (success) {
      onClose();
    }
  };

  return (
    <motion.form
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
    >
      {(localError || storeError) && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm border ${theme.errorBg}`}
        >
          <AlertCircle size={16} /> {localError || storeError}
        </div>
      )}

      <InputField
        name="username"
        type="text"
        placeholder="Username"
        icon={<User size={20} />}
        theme={theme}
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        name="password"
        type="password"
        placeholder="Enter Password"
        icon={<Lock size={20} />}
        theme={theme}
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        name="rePassword"
        type="password"
        placeholder="Re-enter Password"
        icon={<Lock size={20} />}
        theme={theme}
        value={formData.rePassword}
        onChange={handleChange}
      />

      <div className="mt-6">
        <SubmitButton loading={loading} text="Create Account" />
      </div>
    </motion.form>
  );
};

const InputField = ({
  name,
  type,
  placeholder,
  icon,
  theme,
  value,
  onChange,
}) => (
  <div className="relative mb-4 group">
    <div
      className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.inputIcon} group-focus-within:text-cyan-500 transition-colors`}
    >
      {icon}
    </div>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className={`w-full py-4 pl-12 pr-4 rounded-xl border outline-none transition-all placeholder:text-slate-500/50 ${theme.inputBg} ${theme.text}`}
    />
  </div>
);

const SubmitButton = ({ loading, text }) => (
  <button
    disabled={loading}
    type="submit"
    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <Loader2 size={20} className="animate-spin" /> Processing...
      </>
    ) : (
      <>
        {text} <ArrowRight size={20} />
      </>
    )}
  </button>
);

export default AuthModal;
