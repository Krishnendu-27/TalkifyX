import { ArrowRight, Loader2 } from "lucide-react";

export const SubmitButton = ({ loading, text }) => (
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
