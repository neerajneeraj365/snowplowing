"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Snowflake,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { toast } from "sonner";

// Environment variable
const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE; // fallback for dev

// Mock data for appointments
const mockAppointments = [
  {
    id: "APT001",
    customer: "John Smith",
    email: "john@email.com",
    phone: "(555) 111-2222",
    address: "123 Oak Street, Snowville",
    service: "Snow Plowing",
    date: new Date(2025, 0, 5),
    amount: 75,
    status: "completed",
    paid: true,
  },
  {
    id: "APT002",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "(555) 333-4444",
    address: "456 Maple Ave, Wintertown",
    service: "Lawn Maintenance",
    date: new Date(2025, 0, 6),
    amount: 65,
    status: "pending",
    paid: true,
  },
  {
    id: "APT003",
    customer: "Mike Williams",
    email: "mike@email.com",
    phone: "(555) 555-6666",
    address: "789 Pine Rd, Frostburg",
    service: "Ice Management",
    date: new Date(2025, 0, 7),
    amount: 50,
    status: "scheduled",
    paid: false,
  },
  {
    id: "APT004",
    customer: "Emily Brown",
    email: "emily@email.com",
    phone: "(555) 777-8888",
    address: "321 Cedar Lane, Greendale",
    service: "Landscaping Design",
    date: new Date(2025, 0, 10),
    amount: 150,
    status: "scheduled",
    paid: true,
  },
  {
    id: "APT005",
    customer: "David Lee",
    email: "david@email.com",
    phone: "(555) 999-0000",
    address: "654 Birch Blvd, Maple Heights",
    service: "Snow Plowing (Seasonal)",
    date: new Date(2025, 0, 1),
    amount: 500,
    status: "completed",
    paid: true,
  },
  {
    id: "APT006",
    customer: "Lisa Anderson",
    email: "lisa@email.com",
    phone: "(555) 123-9876",
    address: "987 Elm Court, Oak Park",
    service: "Tree & Shrub Care",
    date: new Date(2025, 0, 12),
    amount: 100,
    status: "cancelled",
    paid: false,
  },
];

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-winter text-secondary-foreground", icon: Clock },
  pending: { label: "Pending", color: "bg-accent text-accent-foreground", icon: Clock },
  completed: { label: "Completed", color: "bg-primary text-primary-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive text-primary-foreground", icon: XCircle },
};

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isVerified, setIsVerified] = useState(false);
  const [adminInput, setAdminInput] = useState("");

  // Check localStorage for verified status
  useEffect(() => {
    const verified = sessionStorage.getItem("adminVerified") === "true";
    setIsVerified(verified);
  }, []);

  const handleVerify = () => {
    if (adminInput === ADMIN_CODE) {
      setIsVerified(true);
      sessionStorage.setItem("adminVerified", "true");
      
      toast.success("Admin code verified successfully!");
    } else {
      toast.error("Incorrect admin code!");
    }
  };

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" ||
      (paymentFilter === "paid" && apt.paid) ||
      (paymentFilter === "unpaid" && !apt.paid);

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const stats = {
    totalAppointments: mockAppointments.length,
    scheduled: mockAppointments.filter((a) => a.status === "scheduled").length,
    totalRevenue: mockAppointments.filter((a) => a.paid).reduce((acc, a) => acc + a.amount, 0),
    unpaidAmount: mockAppointments.filter((a) => !a.paid).reduce((acc, a) => acc + a.amount, 0),
  };

  return (
    <div className="min-h-screen relative">
      {/* Admin OTP Modal */}
      {!isVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card p-8 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Enter Admin Code</h2>
            <Input
              placeholder="Admin Code"
              value={adminInput}
              onChange={(e) => setAdminInput(e.target.value)}
              type="password"
              className="mb-4 text-center"
            />
            <Button onClick={handleVerify} className="w-full">
              Verify
            </Button>
          </div>
        </div>
      )}

      {/* Blur the dashboard content if not verified */}
      <div className={`${!isVerified ? "blur-md pointer-events-none select-none" : ""}`}>
        {/* Header */}
        <header className="bg-foreground text-background py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                    <Snowflake className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold">
                    FrostGreen<span className="text-primary">Pro</span>
                  </span>
                </Link>
                <span className="text-background/60">|</span>
                <span className="font-medium">Admin Dashboard</span>
              </div>
              <Link href="/">
                <Button variant="ghost" className="text-background hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalAppointments}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-winter/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-winter" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-foreground">{stats.scheduled}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unpaid</p>
                  <p className="text-2xl font-bold text-foreground">${stats.unpaidAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-card rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <h2 className="text-xl font-bold text-foreground">Appointments</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search appointments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>

                  {/* Status Filter */}
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 rounded-lg border">
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Payment Filter */}
                  <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="p-2 rounded-lg border">
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                        No appointments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments.map((apt) => {
                      const statusInfo = statusConfig[apt.status as keyof typeof statusConfig];
                      return (
                        <TableRow key={apt.id}>
                          <TableCell className="font-mono text-sm">{apt.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{apt.customer}</p>
                              <p className="text-sm text-muted-foreground">{apt.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{apt.service}</TableCell>
                          <TableCell>{format(apt.date, "MMM d, yyyy")}</TableCell>
                          <TableCell className="font-medium">${apt.amount}</TableCell>
                          <TableCell>
                            <Badge variant={apt.paid ? "default" : "outline"} className={apt.paid ? "bg-primary" : ""}>
                              {apt.paid ? "Paid" : "Unpaid"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 border-t border-border text-sm text-muted-foreground">
              Showing {filteredAppointments.length} of {mockAppointments.length} appointments
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
