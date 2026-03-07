import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  Bookmark,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Gift,
  HeartHandshake,
  LayoutGrid,
  Leaf,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const quickLinks = [
    {
      icon: HeartHandshake,
      label: "Volunteer",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10",
    },
    {
      icon: Users,
      label: "Community",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      href: "https://social.votlech.demoebt.com",
    },
    {
      icon: Briefcase,
      label: "Careers",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      icon: BookOpen,
      label: "Learn",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      icon: Gift,
      label: "Perks",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-500/10",
    },
    {
      icon: Star,
      label: "Rewards",
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-500/10",
    },
    {
      icon: Bookmark,
      label: "Saved",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: LayoutGrid,
      label: "More",
      color: "text-gray-500",
      bg: "bg-gray-50 dark:bg-gray-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full h-fit flex-1"
    >
      <Header title="Good Morning, Alex" />

      <main className="flex-1 px-4 md:px-0 py-4 md:py-8 space-y-8 md:space-y-10 pb-32 md:pb-8">
        <div className="hidden md:block mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-display">
            Good Morning, Alex
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Here's what's happening with your impact today.
          </p>
        </div>

        {/* Impact Summary Section */}
        <section>
          <div className="bg-earth-gradient text-white rounded-4xl md:rounded-5xl p-6 md:p-8 shadow-xl shadow-emerald-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 shrink-0" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl -ml-16 -mb-16 shrink-0" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
              <div className="max-w-xs">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
                  Your Impact
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 flex-1">
                <div className="bg-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Leaf className="text-emerald-300 mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    12
                    <span className="text-[10px] md:text-sm font-normal text-white/70 ml-0.5 md:ml-1">
                      kg
                    </span>
                  </div>
                  <div className="text-[9px] md:text-xs text-white/80 uppercase tracking-widest mt-0.5 md:mt-1 font-semibold">
                    Waste
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Zap className="text-yellow-300 mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    45
                    <span className="text-[10px] md:text-sm font-normal text-white/70 ml-0.5 md:ml-1">
                      pts
                    </span>
                  </div>
                  <div className="text-[9px] md:text-xs text-white/80 uppercase tracking-widest mt-0.5 md:mt-1 font-semibold">
                    Carbon
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-md border border-white/20 flex flex-col items-center text-center">
                  <Award className="text-blue-300 mb-1 md:mb-2 w-6 h-6 md:w-7 md:h-7" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    3
                  </div>
                  <div className="text-[9px] md:text-xs text-white/80 uppercase tracking-widest mt-0.5 md:mt-1 font-semibold">
                    Badges
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Grid */}
        <section className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 md:gap-4 px-2 md:px-0">
          {quickLinks.map(link => {
            const Icon = link.icon;
            const content = (
              <>
                <div
                  className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border border-transparent shrink-0",
                    link.bg,
                    "group-hover:scale-110 group-active:scale-95 group-hover:shadow-md group-hover:border-white/20 dark:group-hover:border-white/10"
                  )}
                >
                  <Icon className={cn("w-6 h-6 md:w-7 md:h-7", link.color)} />
                </div>
                <span className="text-[9px] md:text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest text-center truncate w-full px-1">
                  {link.label}
                </span>
              </>
            );

            if (link.href) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group transition-all"
                >
                  {content}
                </a>
              );
            }

            return (
              <button
                key={link.label}
                type="button"
                className="flex flex-col items-center gap-2 group transition-all"
              >
                {content}
              </button>
            );
          })}
        </section>

        {/* Recommended for You Section */}
        <section className="-mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center justify-between mb-6 px-4 md:px-0">
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Recommended for You
            </h3>
            <button
              type="button"
              className="text-voltech-green text-xs md:text-sm font-bold flex items-center hover:opacity-80 transition-opacity"
            >
              See all{" "}
              <ChevronRight className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x px-4 md:px-0">
            {[
              {
                type: "event",
                title: "Beach Cleanup at Port Dickson",
                date: "Jan 25, 2026",
                location: "Port Dickson",
                image: "https://picsum.photos/seed/cleanup/400/300",
                action: "Join Now",
              },
              {
                type: "job",
                title: "Junior Developer at Grab",
                date: "Apply by Feb 1",
                location: "Kuala Lumpur",
                image: "https://picsum.photos/seed/job/400/300",
                action: "Apply",
              },
              {
                type: "course",
                title: "ESG Fundamentals for Leaders",
                date: "Self-paced",
                location: "Online",
                image: "https://picsum.photos/seed/course/400/300",
                action: "Enroll",
              },
              {
                type: "community",
                title: "Urban Garden Builders",
                date: "Weekly Meetup",
                location: "Cyberjaya",
                image: "https://picsum.photos/seed/garden/400/300",
                action: "Join Group",
              },
              {
                type: "training",
                title: "Zero Waste Certification",
                date: "Starts Mar 10",
                location: "Online",
                image: "https://picsum.photos/seed/waste/400/300",
                action: "Sign Up",
              },
              {
                type: "job",
                title: "Sustainability Consultant",
                date: "Apply by Mar 1",
                location: "Singapore",
                image: "https://picsum.photos/seed/sustain/400/300",
                action: "Apply",
              },
              {
                type: "event",
                title: "Mangrove Planting Day",
                date: "Mar 15, 2026",
                location: "Klang",
                image: "https://picsum.photos/seed/mangrove/400/300",
                action: "Volunteer",
              },
              {
                type: "course",
                title: "Circular Economy 101",
                date: "Self-paced",
                location: "Online",
                image: "https://picsum.photos/seed/circular/400/300",
                action: "Enroll",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="min-w-65 md:min-w-[320px] bg-white dark:bg-slate-800/40 rounded-3xl md:rounded-4xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 snap-center group"
              >
                <div className="h-40 relative overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-tight line-clamp-2 h-12 md:h-14">
                    {item.title}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full h-12 bg-voltech-green text-white font-bold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Action and Goals Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Shifts
              </h3>
              <button
                type="button"
                className="text-voltech-green text-xs md:text-sm font-bold flex items-center hover:opacity-80 transition-opacity"
              >
                View all{" "}
                <ChevronRight className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  date: "APR 22",
                  title: "ASEAN Earth Cleanup",
                  time: "08:00 AM - 12:00 PM",
                  location: "Central Park, KL",
                },
                {
                  date: "MAY 05",
                  title: "River Banks Restoration",
                  time: "09:00 AM - 01:00 PM",
                  location: "Klang River",
                },
              ].map((shift, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 flex gap-5 items-center active:scale-[0.98] transition-transform cursor-pointer group hover:bg-gray-50 dark:hover:bg-slate-800/60 duration-300"
                >
                  <div className="bg-voltech-mint dark:bg-emerald-900/30 text-voltech-green dark:text-emerald-400 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:bg-voltech-green group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-voltech-dark transition-colors font-display">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                      {shift.date.split(" ")[0]}
                    </span>
                    <span className="text-xl md:text-2xl font-bold leading-none mt-0.5">
                      {shift.date.split(" ")[1]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2 text-base md:text-lg truncate group-hover:text-voltech-green dark:group-hover:text-emerald-400 transition-colors">
                      {shift.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <p className="text-[11px] md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 leading-none">
                        <Calendar
                          size={12}
                          className="text-gray-400 dark:text-gray-500"
                        />
                        {shift.time}
                      </p>
                      <p className="text-[11px] md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 leading-none">
                        <MapPin
                          size={12}
                          className="text-gray-400 dark:text-gray-500"
                        />
                        {shift.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Your Goals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-2xl">
                    <Target size={24} />
                  </div>
                  <span className="text-xs font-bold text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                    Active
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Weekly Volunteer
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  3/5 hours completed
                </p>
                <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 rounded-2xl">
                    <Leaf size={24} />
                  </div>
                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
                    80%
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                  Waste Reduction
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  You're close to your 15kg goal!
                </p>
                <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements and Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-4 md:gap-5 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xl md:text-2xl leading-none">
                1,250
              </h4>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
                Voltech Coins
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-4 md:gap-5 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xl md:text-2xl leading-none">
                Level 3
              </h4>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
                Rank: Eco Warrior
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-4 md:gap-5 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-xl md:text-2xl leading-none">
                +15%
              </h4>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
                Impact Growth
              </p>
            </div>
          </div>
        </section>

        {/* Community Activity Section */}
        <section className="bg-white dark:bg-slate-800/40 rounded-4xl md:rounded-5xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Community Activity
            </h3>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`}
                  className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-800"
                  alt="community member"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 border-4 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-gray-500">
                +124
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  <strong>Jane Doe</strong> joined the Earth Cleanup event.
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  <strong>John Smith</strong> earned the 'Eco Warrior' rank.
                </p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Leaf size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  <strong>Team Green</strong> recycled 500kg of waste this week!
                </p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
