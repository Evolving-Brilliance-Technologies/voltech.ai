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
      className="min-h-screen flex flex-col"
    >
      <Header title="Digital ID" />

      <main className="flex-1 px-4 py-6 space-y-6">
        {/* ID Card */}
        <div className="bg-voltech-dark text-white rounded-4xl p-6 shadow-xl relative overflow-hidden">
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
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-gray-900">
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
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    cert.verified
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {cert.verified ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <Award size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        cert.verified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
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
