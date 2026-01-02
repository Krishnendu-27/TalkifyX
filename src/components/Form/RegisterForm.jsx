import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { SubmitButton } from "./SubmitButton";
import { InputField } from "./InputField";
import { ErrorAlert } from "./ErrorAlert";

export const RegisterForm = ({ theme, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      useAuthStore.getState().setError("Passwords do not match");
      return;
    }
    const success = await register({
      username: formData.username,
      password: formData.password,
    });
    if (success) {
      onClose();
      navigate("/login");
      toast.success("Register Successfully !!");
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
