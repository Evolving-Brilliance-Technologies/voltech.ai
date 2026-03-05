import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Calendar,
  Filter,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout/events")({
  component: EventsComponent,
});

type VolunteerEvent = {
  id: string;
  title: string;
  category: "Environment" | "Education" | "Community";
  date: string;
  location: string;
  volunteers: number;
  maxVolunteers: number;
  status: "Draft" | "Published" | "Completed";
};

const mockEvents: VolunteerEvent[] = [
  {
    id: "1",
    title: "Beach Cleanup KL",
    category: "Environment",
    date: "2026-04-22",
    location: "Central Park Pantai",
    volunteers: 45,
    maxVolunteers: 100,
    status: "Published",
  },
  {
    id: "2",
    title: "Tree Planting Marathon",
    category: "Environment",
    date: "2026-04-28",
    location: "Selangor State Park",
    volunteers: 150,
    maxVolunteers: 200,
    status: "Published",
  },
  {
    id: "3",
    title: "Math Tutoring for Kids",
    category: "Education",
    date: "2026-05-02",
    location: "Community Center",
    volunteers: 12,
    maxVolunteers: 20,
    status: "Draft",
  },
  {
    id: "4",
    title: "Food Bank Distribution",
    category: "Community",
    date: "2026-05-10",
    location: "Brickfields",
    volunteers: 25,
    maxVolunteers: 50,
    status: "Published",
  },
  {
    id: "5",
    title: "ASEAN Earth Summit",
    category: "Environment",
    date: "2025-12-15",
    location: "Convention Center",
    volunteers: 500,
    maxVolunteers: 500,
    status: "Completed",
  },
];

function EventsComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return mockEvents.filter(
      event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns = [
    {
      accessorKey: "title",
      header: "Event Title",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {row.original.title}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.category}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Calendar size={14} />
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 max-w-50 truncate">
          <MapPin size={14} />
          {row.original.location}
        </div>
      ),
    },
    {
      accessorKey: "volunteers",
      header: "Participants",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gray-400 dark:text-gray-500" />
          <div className="flex flex-col w-24 gap-1">
            <div className="flex justify-between text-[10px] font-medium text-gray-700 dark:text-gray-300">
              <span>{row.original.volunteers}</span>
              <span className="text-gray-400 dark:text-gray-500">
                / {row.original.maxVolunteers}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-voltech-green h-full"
                style={{
                  width: `${(row.original.volunteers / row.original.maxVolunteers) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "Published"
                ? "default"
                : status === "Draft"
                  ? "outline"
                  : "secondary"
            }
            className={
              status === "Published"
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none"
                : ""
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Edit Event</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Cancel Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
            Volunteering Events
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Create and manage your organization's impact programs.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={20} />
          </Button>
          <Button className="bg-voltech-green hover:bg-voltech-green/90 gap-2">
            <PlusCircle size={20} />
            Create Event
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <DataTable
          table={table}
          className="border-none h-[calc(100vh-250px)]"
        />
      </div>
    </div>
  );
}
