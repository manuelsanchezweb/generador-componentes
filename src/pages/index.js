import { Blobs } from "@/components/Blobs";
import { Debug } from "@/components/Debug";
import Preview from "@/components/Preview";
import { Prompt } from "@/components/Prompt";
import { SelectFramework } from "@/components/SelectFramework";
import { useConversationsStore } from "@/stores/conversations";
import Head from "next/head";

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const response = useConversationsStore((state) => state.response);

  return (
    <>
      <Head>
        <title>Component Generator with AI</title>
        <meta
          name="description"
          content="Component Generator with AI - Generate React, Vue, Svelte, and Vanilla components with AI."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-hidden px-10 py-24 relative flex flex-col h-full items-center justify-center bg-black">
        <Blobs />
        <div className="min-h-screen max-w-[1200px] w-full mx-auto flex flex-col justify-center">
          <h1 className="block bg-gradient-to-b from-white via-white/90 to-gray-300 text-5xl font-bold text-transparent bg-clip-text mb-10 text-center">
            Component Generator with AI
          </h1>

          <SelectFramework />

          <div className="flex items-center h-full w-full">
            <div className="w-full">
              <Prompt />
            </div>
          </div>

          <div className="text-white">{response}</div>

          <Preview />
        </div>

        <Debug />
      </main>
    </>
  );
}
