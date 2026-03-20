'use client';

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out our AI capabilities.",
    features: ["10 Videos per month", "Standard AI Models", "720p Export", "Community Support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "ProCreator",
    price: "$29",
    period: "/mo",
    description: "Everything you need to dominate social media.",
    features: ["Unlimited Videos", "Premium AI Models (GPT-4 / Claude 3)", "4K Export", "Auto-Translation", "Priority Support"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and high-volume creators.",
    features: ["Custom AI Training", "API Access", "Dedicated Account Manager", "Custom SLAs", "White-labeling"],
    cta: "Contact Sales",
    highlighted: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-black border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Simple plans for <br />
            <span className="text-zinc-500">every creator.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col p-8 rounded-3xl overflow-hidden transition-all duration-300
                ${plan.highlighted 
                  ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 shadow-2xl shadow-white/[0.05]' 
                  : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04]'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-10 bg-white text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-b-lg">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-sm font-bold text-zinc-500">{plan.period}</span>}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-zinc-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-zinc-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all
                ${plan.highlighted 
                  ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-white/[0.05] text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
