import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const MainContent = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className=" px-4 md:px-6 ">
          <div className="flex flex-col items-center space-y-4 text-center ">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Communicate downtime. Build trust.
              </h1>
              <p className="pt-2 mx-auto max-w-[850px] text-gray-500 md:text-xl dark:text-gray-400">
                Real-time status pages for your organization, keeping your team
                informed at all times. Monitor system performance, track
                incidents, and communicate updates instantly. Ensure
                transparency, reduce downtime confusion with a reliable,
                automated status page that updates in real-time.
              </p>
            </div>
            <div className="space-x-4 pt-2">
              <Button className="bg-slate-800 h-12 text-lg text-white px-10">
                <Link href="/auth/login?screen_hint=signup">Get Started </Link>
              </Button>
              <Button variant="outline" className="h-12 px-10 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
