import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import toast from "react-hot-toast";

import { SubmitButton } from "./SubmitButton";
import { InputField } from "./InputField";
import { ErrorAlert } from "./ErrorAlert";

export const LoginForm = ({ theme, onClose }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, loading } = useAuthStore();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({
      username: formData.username,
      password: formData.password,
    });
    if (success) {
      onClose();
      toast.success("Login Successfully !!");
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
      <ErrorAlert theme={theme} />

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
