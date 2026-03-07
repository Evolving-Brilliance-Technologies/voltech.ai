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
  {
    id: 4,
    title: "Tech Mentorship Program",
    type: "Youth Skill Development",
    date: "Jul 15 - Aug 15",
    location: "Online",
    spots: "50 spots left",
    image: "https://picsum.photos/seed/coding/600/400?blur=2",
    tags: ["Education", "Community"],
  },
  {
    id: 5,
    title: "Community Soup Kitchen",
    type: "Weekend Volunteer Run",
    date: "Every Saturday",
    location: "Downtown KL",
    spots: "20 spots left",
    image: "https://picsum.photos/seed/food/600/400?blur=2",
    tags: ["Community", "Verified"],
  },
  {
    id: 6,
    title: "Beach Cleanup Drive",
    type: "Coastal Restoration",
    date: "Aug 12",
    location: "Port Dickson",
    spots: "200 spots left",
    image: "https://picsum.photos/seed/beach/600/400?blur=2",
    tags: ["Environment"],
  },
  {
    id: 7,
    title: "Animal Shelter Assist",
    type: "Animal Welfare",
    date: "Flexible",
    location: "Paws Rescue Center",
    spots: "10 spots left",
    image: "https://picsum.photos/seed/pets/600/400?blur=2",
    tags: ["Community", "Verified"],
  },
  {
    id: 8,
    title: "Youth Coding Bootcamp",
    type: "Intensive Tech Training",
    date: "Sep 01 - Sep 30",
    location: "Tech Hub Cyberjaya",
    spots: "100 spots left",
    image: "https://picsum.photos/seed/tech/600/400?blur=2",
    tags: ["Education", "Jobs"],
  },
  {
    id: 9,
    title: "Urban Farming Initiative",
    type: "Sustainable Agriculture",
    date: "Oct 10",
    location: "Rooftop Garden Bangsar",
    spots: "30 spots left",
    image: "https://picsum.photos/seed/farm/600/400?blur=2",
    tags: ["Environment", "Community"],
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search programs, locations..."
              className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-voltech-green/40 focus:border-voltech-green transition-all"
            />
          </div>
          <button
            type="button"
            className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 p-2.5 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
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
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  i === 0
                    ? "bg-voltech-dark dark:bg-emerald-500 dark:text-voltech-dark text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      <main className="flex-1 px-4 md:px-0 py-6 grid content-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-6">
        {events.map(event => (
          <motion.div
            key={event.id}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-slate-800/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-white/10 cursor-pointer group flex flex-col h-full transition-all duration-300"
          >
            <div className="relative aspect-video w-full shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2 flex-wrap pr-3">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <h3 className="font-display text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight line-clamp-2">
                {event.title}
              </h3>
              <p className="text-voltech-green text-[11px] sm:text-xs font-medium mb-3 sm:mb-4">
                {event.type}
              </p>

              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 mt-auto">
                <div className="flex items-center text-gray-500 text-[11px] sm:text-xs">
                  <Calendar size={13} className="mr-2 text-gray-400 shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-500 text-[11px] sm:text-xs">
                  <MapPin size={13} className="mr-2 text-gray-400 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-[11px] sm:text-xs">
                  <Users size={13} className="mr-2 text-gray-400 shrink-0" />
                  <span className="truncate">{event.spots}</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 border-t border-gray-50 dark:border-white/5 mt-auto">
                <button
                  type="button"
                  className="w-full bg-voltech-mint text-voltech-green dark:bg-emerald-900/20 dark:text-emerald-400 font-semibold py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm flex items-center justify-center group-hover:bg-voltech-green group-hover:text-white transition-colors"
                >
                  View Details
                  <ChevronRight size={14} className="ml-1 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </motion.div>
  );
}
