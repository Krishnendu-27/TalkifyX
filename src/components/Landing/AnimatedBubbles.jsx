import { FloatingElement } from "./FloatingElement";
import { motion } from "motion/react";

export const AnimatedBubbles = ({ isDark, theme }) => {
  return (
    <div className="relative h-[400px] w-full flex items-center justify-center">
      {/* Central Large Bubble */}
      <FloatingElement delay={0} className="z-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl rounded-bl-none shadow-2xl shadow-blue-900/50 max-w-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 z-0 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-1">HELLO</h3>
            <p className="text-blue-100 text-sm">English • Just now</p>
          </div>
        </div>
      </FloatingElement>

      {/* Top Right Bubble */}
      <FloatingElement delay={1} className="absolute top-0 right-10 z-10">
        <div
          className={`backdrop-blur-md p-5 rounded-2xl rounded-br-none border transition-colors duration-300 ${theme.bubbleOther}`}
        >
          <h3 className="text-xl font-bold text-cyan-500">BONJOUR</h3>
          <p
            className={`${
              isDark ? "text-slate-400" : "text-slate-500"
            } text-xs`}
          >
            French • 2m ago
          </p>
        </div>
      </FloatingElement>

      {/* Bottom Left Bubble */}
      <FloatingElement delay={2} className="absolute bottom-10 left-10 z-30">
        <div
          className={`backdrop-blur-md p-5 rounded-2xl rounded-tr-none border transition-colors duration-300 ${theme.bubbleOther}`}
        >
          <h3 className="text-xl font-bold text-purple-500">HOLA</h3>
          <p
            className={`${
              isDark ? "text-slate-400" : "text-slate-500"
            } text-xs`}
          >
            Spanish • 5m ago
          </p>
        </div>
      </FloatingElement>

      {/* Decorative Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border rounded-full z-0 transition-colors ${
          isDark ? "border-white/5" : "border-slate-200"
        }`}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed rounded-full z-0 transition-colors ${
          isDark ? "border-white/10" : "border-slate-300"
        }`}
      />
    </div>
  );
};
