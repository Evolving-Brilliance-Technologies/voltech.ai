import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";

export const Route = createFileRoute("/explore")({
  component: Explore,
});

const events = [
  {
    id: 1,
    title: "ASEAN Earth Cleanup Week",
    type: "Nationwide Multi-Campus Cleanup",
    date: "Apr 22 - Apr 24",
    location: "Multiple Locations",
    spots: "1,200 spots left",
    image: "https://picsum.photos/seed/cleanup/600/400?blur=2",
    tags: ["Environment", "Verified"],
  },
  {
    id: 2,
    title: "Local Career & Business Workshop",
    type: "Graduates and Employer Workshop",
    date: "May 10",
    location: "Kuala Lumpur Convention Centre",
    spots: "500 spots left",
    image: "https://picsum.photos/seed/workshop/600/400?blur=2",
    tags: ["Education", "Jobs"],
  },
  {
    id: 3,
    title: "Tree Planting & Carbon Offset",
    type: "Regional Campaign",
    date: "Jun 05",
    location: "Selangor State Park",
    spots: "150 spots left",
    image: "https://picsum.photos/seed/trees/600/400?blur=2",
    tags: ["Environment", "Verified"],
  },
];

function Explore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <Header title="Explore Events" />

      <div className="sticky top-0 md:top-8 z-30 bg-[#FAFAFA]/90 dark:bg-slate-900/90 backdrop-blur-md px-4 md:px-0 py-3 md:pb-6 border-b border-gray-100 dark:border-white/5 md:border-none">
        <div className="hidden md:block mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Explore Events
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Discover and join ways to make an impact.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search programs, locations..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-voltech-green/20 focus:border-voltech-green transition-all"
            />
          </div>
          <button
            type="button"
            className="bg-white border border-gray-200 p-2.5 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {["All", "Environment", "Education", "Community", "Verified"].map(
            (tag, i) => (
              <button
                key={tag}
                type="button"
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-voltech-dark text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      <main className="flex-1 px-4 md:px-0 py-6 space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {events.map(event => (
          <motion.div
            key={event.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 cursor-pointer group flex flex-col"
          >
            <div className="relative h-40">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight line-clamp-2">
                {event.title}
              </h3>
              <p className="text-voltech-green text-xs font-medium mb-4">
                {event.type}
              </p>

              <div className="space-y-2 mb-5">
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar size={14} className="mr-2 text-gray-400" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin size={14} className="mr-2 text-gray-400" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <Users size={14} className="mr-2 text-gray-400" />
                  {event.spots}
                </div>
              </div>
              <div className="mt-auto pt-4">
                <button
                  type="button"
                  className="w-full bg-voltech-mint text-voltech-green dark:bg-emerald-900/20 dark:text-emerald-400 font-semibold py-3 rounded-xl text-sm flex items-center justify-center group-hover:bg-voltech-green group-hover:text-white transition-colors"
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </motion.div>
  );
}
