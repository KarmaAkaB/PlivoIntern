"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";

interface Organization {
  id: string;
  name: string;
}

const Page = () => {
  const [orgName, setOrgName] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState("");

  const [session, setSession] = useState<any>(null);

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

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("/api/orgs");
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleCreateOrganization = async () => {
    if (!orgName) {
      alert("Organization name is required!");
      return;
    }

    try {
      const response = await axios.post("/api/createOrg", {
        name: orgName,
      });
      setOrgName("");
      setOrganizations([...organizations, response.data]);
      alert("Organization created successfully!");
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Failed to create organization");
    }
  };

  //join organization
  const handleJoinOrganization = async () => {
    if (!selectedOrg) {
      alert("Please select an organization!");
      return;
    }

    try {
      const response = await axios.post("/api/joinOrg", {
        orgId: selectedOrg,
        currentUserEmail: session.user?.email,
      });
      alert("Joined organization successfully!");
    } catch (error) {
      console.error("Error joining organization:", error);
      alert("Failed to join organization");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 shadow-lg p-8 flex flex-col justify-center items-start">
        <h1 className="text-lg  font-semibold mb-1">
          Create or Join an Organization
        </h1>
        <p className="text-sm text-slate-500 mb-5">
          Ready? You can either create a new team or join an existing one to get
          started!
        </p>

        <div className="w-full max-w-md mb-6">
          <Input
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="mb-4"
          />
          <Button
            onClick={handleCreateOrganization}
            className="w-full bg-slate-800 text-white"
          >
            Create Organization
          </Button>
        </div>

        <div className="w-full max-w-md flex flex-row gap-4 items-center mb-6">
          <div className="w-full border-b" />
          <p className="text-slate-500">Or</p>
          <div className="w-full border-b" />
        </div>

        <div className="w-full max-w-md mb-6 flex flex-col gap-5">
          <div className="z-30">
            <Select value={selectedOrg} onValueChange={setSelectedOrg}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an Organization" />
              </SelectTrigger>
              <SelectContent className="bg-white p-0">
                <SelectGroup>
                  <SelectLabel>Available Organizations</SelectLabel>
                  {organizations.map((org) => (
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
          <Button
            onClick={handleJoinOrganization}
            className="w-full bg-slate-800 text-white"
          >
            Join Organization
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;