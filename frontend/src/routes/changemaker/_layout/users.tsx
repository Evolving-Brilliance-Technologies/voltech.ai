import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Filter,
  Mail,
  MoreHorizontal,
  PlusCircle,
  Search,
  Shield,
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

export const Route = createFileRoute("/_layout/users")({
  component: UsersComponent,
});

type User = {
  id: string;
  name: string;
  email: string;
  role: "NGO Admin" | "Volunteer" | "Corporate Partner";
  status: "Active" | "Pending" | "Inactive";
  joinedDate: string;
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "Volunteer",
    status: "Active",
    joinedDate: "2026-01-15",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    email: "sarah@voltech.ai",
    role: "NGO Admin",
    status: "Active",
    joinedDate: "2025-11-20",
  },
  {
    id: "3",
    name: "Michael Wong",
    email: "mwong@partner.com",
    role: "Corporate Partner",
    status: "Pending",
    joinedDate: "2026-03-01",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "elena@ngo.org",
    role: "NGO Admin",
    status: "Active",
    joinedDate: "2025-05-10",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@gmail.com",
    role: "Volunteer",
    status: "Inactive",
    joinedDate: "2025-08-22",
  },
];

function UsersComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return mockUsers.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-400">
            {row.original.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Mail size={14} />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-200">
          <Shield size={14} className="text-voltech-green" />
          {row.original.role}
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
              status === "Active"
                ? "default"
                : status === "Pending"
                  ? "outline"
                  : "secondary"
            }
            className={
              status === "Active"
                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border-none"
                : "dark:bg-slate-800 dark:text-gray-400 dark:border-white/5"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "joinedDate",
      header: "Joined Date",
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
            <DropdownMenuItem onClick={() => {}}>View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Edit Role</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Suspend User
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
    <div className="space-y-6 flex flex-col h-full transition-colors duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
            Talents & Volunteers
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage users, roles and invitations for your organization.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={16}
            />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-white dark:bg-slate-900 border-gray-100 dark:border-white/10 dark:text-white"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="dark:border-white/10 dark:text-gray-400"
          >
            <Filter size={20} />
          </Button>
          <Button className="bg-voltech-green hover:bg-voltech-green/90 gap-2 text-white border-none">
            <PlusCircle size={20} />
            Invite Talent
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
        <DataTable
          table={table}
          className="border-none h-[calc(100vh-250px)]"
        />
      </div>
    </div>
  );
}
