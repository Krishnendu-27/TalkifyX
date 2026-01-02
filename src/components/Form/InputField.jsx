export const InputField = ({
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
      autoComplete={name}
      className={`w-full py-4 pl-12 pr-4 rounded-xl border outline-none transition-all placeholder:text-slate-500/50 ${theme.inputBg} ${theme.text}`}
    />
  </div>
);
