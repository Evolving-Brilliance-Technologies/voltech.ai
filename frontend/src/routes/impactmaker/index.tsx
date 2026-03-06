import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Calendar, ChevronRight, Leaf, MapPin, Zap } from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <Header title="Good Morning, Alex" />

      <main className="flex-1 px-4 md:px-0 py-6 md:py-8 space-y-8">
        <div className="hidden md:block mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Good Morning, Alex
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your impact today.
          </p>
        </div>
        {/* Impact Summary */}
        <section>
          <div className="bg-earth-gradient text-white rounded-3xl p-6 shadow-lg shadow-emerald-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -ml-10 -mb-10" />

            <div className="relative z-10">
              <h2 className="font-display text-2xl font-semibold mb-1">
                Your Impact
              </h2>
              <p className="text-white/80 text-sm mb-6">
                You're making a real difference!
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Leaf className="text-emerald-300 mb-2" size={22} />
                  <div className="text-2xl font-bold">
                    12
                    <span className="text-xs font-normal text-white/70 ml-0.5">
                      kg
                    </span>
                  </div>
                  <div className="text-[10px] text-white/80 uppercase tracking-wider mt-1 font-medium">
                    Waste
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Zap className="text-yellow-300 mb-2" size={22} />
                  <div className="text-2xl font-bold">
                    45
                    <span className="text-xs font-normal text-white/70 ml-0.5">
                      pts
                    </span>
                  </div>
                  <div className="text-[10px] text-white/80 uppercase tracking-wider mt-1 font-medium">
                    Carbon
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Award className="text-blue-300 mb-2" size={22} />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-[10px] text-white/80 uppercase tracking-wider mt-1 font-medium">
                    Badges
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Shifts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-gray-900">
              Upcoming Shifts
            </h3>
            <button
              type="button"
              className="text-voltech-green text-sm font-medium flex items-center hover:opacity-80 transition-opacity"
            >
              View all <ChevronRight size={16} className="ml-0.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center active:scale-[0.98] transition-transform cursor-pointer">
            <div className="bg-voltech-mint text-voltech-green w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Apr
              </span>
              <span className="text-2xl font-bold leading-none mt-0.5">22</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1.5 text-base">
                ASEAN Earth Cleanup
              </h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" /> 08:00 AM -
                  12:00 PM
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <MapPin size={14} className="text-gray-400" /> Central Park,
                  KL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty & Training */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-3">
              <Award size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">1,250</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              Voltech Coins
            </p>
            <div className="mt-3 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              Silver Tier
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
              <Zap size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Level 3</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              Training
            </p>
            <div className="mt-3 text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
              Eco Warrior
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
