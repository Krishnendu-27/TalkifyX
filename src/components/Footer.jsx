import { MessageCircle } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const Footer = () => {
  const isDark = useThemeStore((state) => state.isDarkMode);
  const theme = {
    bg: isDark ? "bg-slate-950" : "bg-slate-50",
    text: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-slate-400" : "text-slate-600",
    navBg: isDark
      ? "bg-slate-950/70 border-white/5"
      : "bg-white/70 border-slate-200",
    cardBg: isDark
      ? "bg-white/5 border-white/5 hover:bg-white/10"
      : "bg-white border-slate-200 shadow-sm hover:shadow-md",
    bubbleOther: isDark
      ? "bg-slate-800/80 border-white/10"
      : "bg-white/80 border-slate-200 shadow-lg",
    bubbleTextOther: isDark ? "text-white" : "text-slate-800",
    footer: isDark
      ? "bg-slate-950 border-white/5"
      : "bg-slate-100 border-slate-200",
    blobBlue: isDark ? "bg-blue-600/20" : "bg-blue-400/20",
    blobPurple: isDark ? "bg-purple-600/20" : "bg-purple-400/20",
  };
  return (
    <footer
      className={`pt-20 pb-10 px-6 border-t transition-colors ${theme.footer} ${theme.text}`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">TalkifyX</span>
          </div>
          <p className={`${theme.textMuted} max-w-sm`}>
            Making the world smaller, one conversation at a time. The most
            advanced translation chat platform.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className={`space-y-4 text-sm ${theme.textMuted}`}>
            <li className="hover:text-cyan-500 cursor-pointer">Download</li>
            <li className="hover:text-cyan-500 cursor-pointer">Features</li>
            <li className="hover:text-cyan-500 cursor-pointer">Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className={`space-y-4 text-sm ${theme.textMuted}`}>
            <li className="hover:text-cyan-500 cursor-pointer">About Us</li>
            <li className="hover:text-cyan-500 cursor-pointer">Careers</li>
            <li className="hover:text-cyan-500 cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
      <div
        className={`text-center text-sm pt-8 border-t ${
          isDark
            ? "border-white/5 text-slate-600"
            : "border-slate-200 text-slate-500"
        }`}
      >
        © 2024 TalkifyX Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
