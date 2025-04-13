"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface Incident {
  id: string;
  title: string;
  status: string;
  type: string;
  createdAt: string;
  resolvedAt?: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface NewIncident {
  title: string;
  status: string;
  type: string;
  organizationId: string;
}

const IncidentPage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [newIncident, setNewIncident] = useState<NewIncident>({
    title: "",
    status: "",
    type: "",
    organizationId: "",
  });

  const [selectedOrg, setSelectedOrg] = useState("");

  const [session, setSession] = useState<any>(null);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>(
    []
  );

  console.log(selectedOrg);

  const fetchUserOrganizations = async (email: string) => {
    try {
      const res = await fetch("/api/user/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch organizations");
      }

      setUserOrganizations(data.organizations);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    const getOrganizations = async () => {
      if (session) {
        const orgs = await fetchUserOrganizations(session?.user.email);
        console.log("User's organizations:", orgs);
      }
    };

    getOrganizations();
  }, [session]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session");
        setSession(response.data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  // Fetch incidents from the API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("/api/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  // Handle form submission to create a new incident
  const handleCreateIncident = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOrg) {
      alert("Please select an organization");
      return;
    }

    try {
      const payload = {
        ...newIncident,
        organizationId: selectedOrg,
      };

      const response = await axios.post("/api/createIncident", payload);

      setIncidents([...incidents, response.data]);
      setNewIncident({
        title: "",
        status: "",
        type: "",
        organizationId: "",
      });
      setSelectedOrg("");

      alert("Incident created successfully!");
    } catch (error) {
      console.error("Error creating incident:", error);
      alert("Failed to create incident");
    }
  };

  return (
    <main className="flex min-h-screen">
      <AppSidebar
        user={session?.user?.name ?? "Guest"}
        email={session?.user?.email ?? "guest@example.com"}
      />
      <div className="flex-1 flex">
        <SidebarTrigger />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Incidents</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Resolved At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.title}</TableCell>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>
                    {new Date(incident.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {incident.resolvedAt
                      ? new Date(incident.resolvedAt).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                Add Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 border border-gray-300 rounded shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Create New Incident
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleCreateIncident}
                className="p-4 border border-gray-300 rounded shadow-md"
              >
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Title</label>
                  <Input
                    type="text"
                    value={newIncident.title}
                    onChange={(e) =>
                      setNewIncident({ ...newIncident, title: e.target.value })
                    }
                    required
                    className="w-full"
                  />
                </div>
                <div className="z-32 mb-4">
                  <label className="block mb-2 font-medium">Status</label>
                  <Select
                    value={newIncident.status}
                    onValueChange={(value) =>
                      setNewIncident({ ...newIncident, status: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-slate-100"
                        value="ONGOING"
                      >
                        ONGOING
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-slate-100"
                        value="MONITORING"
                      >
                        MONITORING
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-slate-100"
                        value="RESOLVED"
                      >
                        RESOLVED
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="z-31 mb-4">
                  <label className="block mb-2 font-medium">Type</label>
                  <Select
                    value={newIncident.type}
                    onValueChange={(value) =>
                      setNewIncident({ ...newIncident, type: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-slate-100"
                        value="INCIDENT"
                      >
                        INCIDENT
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-slate-100"
                        value="MAINTENANCE"
                      >
                        MAINTENANCE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="z-30 mb-4">
                    <label className="mt-5 block mb-2 font-medium">
                      Organization
                    </label>
                    <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an Organization" />
                      </SelectTrigger>
                      <SelectContent className="bg-white p-0">
                        <SelectGroup>
                          <SelectLabel>Available Organizations</SelectLabel>
                          {userOrganizations.map((org) => (
                            <SelectItem
                              className="hover:bg-slate-100"
                              key={org.id}
                              value={org.id}
                            >
                              {org.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mr-2 bg-black text-white hover:bg-gray-800"
                >
                  Create Incident
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default IncidentPage;