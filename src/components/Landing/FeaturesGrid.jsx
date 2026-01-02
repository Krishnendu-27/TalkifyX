import React from "react";
import { FeatureCard } from "./FeatureCard";
import { Globe, Shield, Zap } from "lucide-react";

export const FeaturesGrid = ({ isDark, theme }) => {
  return (
    <section
      className={`py-24 relative overflow-hidden transition-colors ${
        isDark ? "bg-slate-900/50" : "bg-slate-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why choose TalkifyX?
          </h2>
          <p className={theme.textMuted}>
            Everything you need to communicate without boundaries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Globe size={32} className="text-cyan-500" />}
            title="Instant Translation"
            description="Type in your language, they read in theirs. Supports 100+ languages with 99% accuracy."
            delay={0.1}
            theme={theme}
            isDark={isDark}
          />
          <FeatureCard
            icon={<Shield size={32} className="text-purple-500" />}
            title="End-to-End Encrypted"
            description="Your privacy is our priority. No one can read your messages, not even us."
            delay={0.2}
            theme={theme}
            isDark={isDark}
          />
          <FeatureCard
            icon={<Zap size={32} className="text-yellow-500" />}
            title="Lightning Fast"
            description="Optimized for speed. Messages are delivered in milliseconds, anywhere in the world."
            delay={0.3}
            theme={theme}
            isDark={isDark}
          />
        </div>
      </div>
    </section>
  );
};
