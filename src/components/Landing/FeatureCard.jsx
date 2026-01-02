import { motion } from "motion/react";

export const FeatureCard = ({
  icon,
  title,
  description,
  delay,
  theme,
  isDark,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
      whileHover={{ y: -5 }}
      className={`p-8 rounded-2xl border transition-all group ${theme.cardBg}`}
    >
      <div
        className={`mb-6 p-4 rounded-xl w-fit group-hover:scale-110 transition-transform ${
          isDark ? "bg-slate-900" : "bg-slate-50"
        }`}
      >
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 ${theme.text}`}>{title}</h3>
      <p className={`leading-relaxed ${theme.textMuted}`}>{description}</p>
    </motion.div>
  );
};
