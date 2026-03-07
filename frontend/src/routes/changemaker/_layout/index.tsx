import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Calendar, HandHelping, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    {
      label: "Active Volunteers",
      value: "1,248",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Ongoing Events",
      value: "12",
      icon: Calendar,
      color: "text-voltech-green",
      bg: "bg-voltech-mint",
    },
    {
      label: "Job Openings",
      value: "45",
      icon: Briefcase,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Applications",
      value: "328",
      icon: HandHelping,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              Recent Events
            </h2>
            <button
              type="button"
              className="text-voltech-green text-sm font-semibold hover:underline"
            >
              View all
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {[
              {
                title: "Beach Cleanup KL",
                date: "April 22, 2026",
                volunteers: 85,
                status: "Planned",
              },
              {
                title: "Tree Planting Marathon",
                date: "April 28, 2026",
                volunteers: 150,
                status: "Opening",
              },
              {
                title: "Digital Literacy Workshop",
                date: "May 02, 2026",
                volunteers: 30,
                status: "Planned",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between border-b last:border-0 border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-voltech-mint dark:bg-voltech-green/10 rounded-lg flex items-center justify-center text-voltech-green">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.volunteers} Volunteers
                  </p>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
            Activity Feed
          </h2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
            {[
              {
                user: "Sarah Jenkins",
                action: "applied for",
                target: "Event Coordinator",
                time: "2m ago",
              },
              {
                user: "Global NGO",
                action: "created",
                target: "New Cleanup Event",
                time: "15m ago",
              },
              {
                user: "Alex Chen",
                action: "updated",
                target: "Profile Details",
                time: "1h ago",
              },
              {
                user: "System",
                action: "generated",
                target: "Monthly Impact Report",
                time: "2h ago",
              },
            ].map((activity, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full shrink-0" />
                <div>
                  <p className="text-gray-900 dark:text-gray-200">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="text-voltech-green font-medium">
                      {activity.target}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
