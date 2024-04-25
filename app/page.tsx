"use client"

import Image from "next/image";
import { useEffect } from "react";

declare global {
  interface Window { MoveoAI: any; }
}

export default function Home() {
  const startChat = async() => {
    while (typeof window == "undefined" || window.MoveoAI == undefined) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    window.MoveoAI.init({ integrationId: "0d53686e-5674-4735-a62a-4f791742c88f"})
  }

  useEffect(() => {
    startChat()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="https://moveo.ai/wp-content/uploads/2023/01/New-logo-Moveo-header-1.svg"
          alt="Moveo.ia Logo"
          width={242}
          height={48}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      </div>

    </main>
  );
}
