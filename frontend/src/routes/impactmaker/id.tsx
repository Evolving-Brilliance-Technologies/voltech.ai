import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ChevronRight, ShieldCheck } from "lucide-react";
import { QRCode } from "react-qrcode-logo";
import { Header } from "@/components/impactmaker/layout/Header";

export const Route = createFileRoute("/id")({
  component: DigitalID,
});

function DigitalID() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <Header title="Digital ID" />

      <main className="flex-1 px-4 md:px-0 py-6 md:py-8 space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-8 xl:grid-cols-3">
        <div className="hidden md:block col-span-full mb-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Digital Volunteer ID
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Your verified identity and impact credentials.
          </p>
        </div>

        {/* ID Card */}
        <div className="bg-voltech-dark text-white rounded-4xl p-6 shadow-xl relative overflow-hidden xl:col-span-1 h-fit">
          <div className="absolute top-0 right-0 w-64 h-64 bg-voltech-green/20 rounded-full blur-3xl -mr-20 -mt-20" />

          <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Alex Chen</h2>
              <p className="text-white/60 text-sm mt-1">VOL-2026-8492</p>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-full border-2 border-white/20 overflow-hidden backdrop-blur-md">
              <img
                src="https://picsum.photos/seed/alex/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="relative z-10 bg-white p-5 rounded-4xl flex items-center justify-center mb-6 shadow-inner mx-auto w-fit">
            <div className="overflow-hidden rounded-xl">
              <QRCode
                value="https://voltech.ai/"
                size={160}
                bgColor="#ffffff"
                fgColor="#1A1A1A"
                qrStyle="dots"
                eyeRadius={12}
                quietZone={0}
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Status
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                <ShieldCheck size={16} /> Verified
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Level
              </p>
              <p className="text-sm font-medium">3 - Eco Warrior</p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <section className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
              Certificates
            </h3>
            <button
              type="button"
              className="text-voltech-green text-sm font-medium flex items-center hover:opacity-80 transition-opacity"
            >
              View all <ChevronRight size={16} className="ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "ASEAN Earth Cleanup 2025",
                type: "Verified Impact",
                date: "Oct 2025",
                verified: true,
              },
              {
                title: "Basic Volunteer Orientation",
                type: "Training",
                date: "Sep 2025",
                verified: true,
              },
              {
                title: "Local Beach Cleanup",
                type: "Attendance",
                date: "Aug 2025",
                verified: false,
              },
            ].map((cert, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800/40 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                    cert.verified
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {cert.verified ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <Award size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        cert.verified
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {cert.type}
                    </span>
                    <span className="text-xs text-gray-400">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
