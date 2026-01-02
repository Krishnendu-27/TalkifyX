import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Image } from "../../assets/image";
import { useNavigate } from "react-router-dom";

export const HeroContent = ({ isDark, isAuthenticated, theme }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
        Connect Globally. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Chat Freely.
        </span>
      </h1>

      <p
        className={`text-lg lg:text-xl mb-8 leading-relaxed max-w-lg transition-colors ${theme.textMuted}`}
      >
        Break language barriers with real-time translation and connect with
        anyone, anywhere. Secure, fast, and beautifully designed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          onClick={() => (isAuthenticated ? navigate("/") : navigate("/login"))}
        >
          Start Chatting <ArrowRight size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 border rounded-xl font-bold transition-all ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          View Demo
        </motion.button>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex -space-x-3">
          {[Image.pic1, Image.pic2, Image.pic3, Image.pic4].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`User ${i + 1}`}
              className={`h-10 w-10 rounded-full object-cover ring-2 ${
                isDark ? "ring-slate-950" : "ring-white"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex gap-0.5 text-yellow-500 mb-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className={`text-sm ${theme.textMuted}`}>
            Trusted by{" "}
            <strong className={`${theme.textMuted}`}>10,000+ users</strong>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
