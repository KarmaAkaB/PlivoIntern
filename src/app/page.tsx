"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
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
    if (session) {
      const createUser = async () => {
        try {
          const response = await axios.post("/api/createUser", {
            email: session.user.email,
            name: session.user.name,
          });
          console.log("User created: ", response.data);
        } catch (error) {
          console.error("Error creating user: ", error);
        }
      };

      createUser();
    }
  }, [session]);

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <div className="w-full flex flex-col justify-center min-h-screen">
        <Navbar />
        <MainContent />
      </div>
    );
  }

  // If session exists
  return (
    <main className="flex min-h-screen">
      <AppSidebar
        user={session.user.name ?? "Guest"}
        email={session.user.email ?? "guest@example.com"}
      />
      <div className="flex-1 flex">
        <SidebarTrigger />
        <div className="flex flex-row gap-2 ">
          <h1 className="ml-4">Welcome, {session.user.name}!</h1>
          <Button asChild className="text-white bg-slate-800">
            <Link href="/organization">Join an Organization</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
