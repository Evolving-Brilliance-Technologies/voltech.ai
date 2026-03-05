import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  Info,
  Search,
  Terminal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout/logs")({
  component: LogsComponent,
});

type SystemLog = {
  id: string;
  level: "Info" | "Warning" | "Error" | "Success";
  message: string;
  source: string;
  timestamp: string;
};

const mockLogs: SystemLog[] = [
  {
    id: "1",
    level: "Success",
    message: "Event 'Beach Cleanup' successfully published.",
    source: "EventService",
    timestamp: "2026-03-05 14:30:22",
  },
  {
    id: "2",
    level: "Info",
    message: "User 'Alex Chen' updated their profile.",
    source: "AuthService",
    timestamp: "2026-03-05 14:28:45",
  },
  {
    id: "3",
    level: "Warning",
    message: "Failed login attempt from IP 192.168.1.100.",
    source: "Security",
    timestamp: "2026-03-05 14:15:10",
  },
  {
    id: "4",
    level: "Error",
    message: "Database connection timeout during report generation.",
    source: "Database",
    timestamp: "2026-03-05 13:55:00",
  },
  {
    id: "5",
    level: "Info",
    message: "New job application received for 'Eco Consultant'.",
    source: "JobService",
    timestamp: "2026-03-05 13:40:12",
  },
  {
    id: "6",
    level: "Success",
    message: "System backup completed successfully.",
    source: "BackupManager",
    timestamp: "2026-03-05 12:00:00",
  },
];

function LogsComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return mockLogs.filter(
      log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns = [
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }: any) => {
        const level = row.original.level;
        const Icon =
          level === "Success"
            ? CheckCircle2
            : level === "Warning"
              ? AlertCircle
              : level === "Error"
                ? AlertCircle
                : Info;
        const colorClass =
          level === "Success"
            ? "text-emerald-500"
            : level === "Warning"
              ? "text-amber-500"
              : level === "Error"
                ? "text-red-500"
                : "text-blue-500";

        return (
          <div className={`flex items-center gap-2 font-bold ${colorClass}`}>
            <Icon size={16} />
            {level}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Log Message",
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-700 font-mono text-[11px]">
          {row.original.message}
        </span>
      ),
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }: any) => (
        <Badge variant="secondary" className="font-mono text-[10px]">
          {row.original.source}
        </Badge>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }: any) => (
        <span className="text-gray-500 font-mono text-[11px]">
          {row.original.timestamp}
        </span>
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
          <h2 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-3">
            <Terminal size={28} className="text-voltech-green" />
            System Activities
          </h2>
          <p className="text-gray-500 text-sm">
            Monitor real-time logs and system health status.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={20} />
          </Button>
          <Button variant="outline" className="gap-2">
            Clear Logs
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          table={table}
          className="border-none h-[calc(100vh-250px)]"
        />
      </div>
    </div>
  );
}
