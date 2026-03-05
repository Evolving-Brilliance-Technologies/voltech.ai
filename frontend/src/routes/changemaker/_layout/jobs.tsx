import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Clock,
  DollarSign,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Search,
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

export const Route = createFileRoute("/_layout/jobs")({
  component: JobsComponent,
});

type Job = {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  applicants: number;
  postedDate: string;
  status: "Active" | "Paused" | "Closed";
};

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Environmental Consultant",
    company: "Voltech Partners",
    type: "Full-time",
    salary: "$4,500 - $6,000",
    applicants: 24,
    postedDate: "2026-03-01",
    status: "Active",
  },
  {
    id: "2",
    title: "Community Manager",
    company: "EcoNGO",
    type: "Full-time",
    salary: "$3,000 - $4,200",
    applicants: 15,
    postedDate: "2026-03-02",
    status: "Active",
  },
  {
    id: "3",
    title: "Sustainable Design Intern",
    company: "Green Studio",
    type: "Internship",
    salary: "$1,200",
    applicants: 50,
    postedDate: "2026-02-15",
    status: "Active",
  },
  {
    id: "4",
    title: "Tree Care Specialist",
    company: "Selangor State Park",
    type: "Contract",
    salary: "$20/hr",
    applicants: 8,
    postedDate: "2026-03-04",
    status: "Active",
  },
  {
    id: "5",
    title: "Project Coordinator",
    company: "Global ESG",
    type: "Full-time",
    salary: "$5,000",
    applicants: 32,
    postedDate: "2026-01-20",
    status: "Paused",
  },
];

function JobsComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return mockJobs.filter(
      job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns = [
    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {row.original.title}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.company}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: any) => (
        <Badge variant="outline" className="font-medium">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "salary",
      header: "Salary Range",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
          <DollarSign size={14} className="text-voltech-green" />
          {row.original.salary}
        </div>
      ),
    },
    {
      accessorKey: "applicants",
      header: "Applicants",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          {row.original.applicants}
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
            candidates
          </span>
        </div>
      ),
    },
    {
      accessorKey: "postedDate",
      header: "Posted",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
          <Clock size={12} />
          {row.original.postedDate}
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
            variant={status === "Active" ? "default" : "secondary"}
            className={
              status === "Active"
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
            <DropdownMenuItem onClick={() => {}}>View Page</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Manage Applicants
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Edit Posting</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Close Position
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
            Job Board
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Post and manage career opportunities for your community.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search jobs..."
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
            Post a Job
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
