"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Signing up with:", data);
    // Handle auth logic here
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-12">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <div className="pb-1">
              <Label htmlFor="name">Full Name</Label>
            </div>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <div className="pb-1">
              <Label htmlFor="email">Email</Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <div className="pb-1">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          <div className="pt-2">
            <Link href="/api/auth/login">
              <Button
                type="submit"
                className="w-full text-md h-12 text-white bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up with Auth0"}
              </Button>
            </Link>
          </div>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
