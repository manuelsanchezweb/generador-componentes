import { Blobs } from "@/components/Blobs";
import { Debug } from "@/components/Debug";
import Preview from "@/components/Preview";
import { Prompt } from "@/components/Prompt";
import { SelectFramework } from "@/components/SelectFramework";
import { SelectLanguage } from "@/components/SelectLanguage";
import { useConversationsStore } from "@/stores/conversations";
import Head from "next/head";

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const code = useConversationsStore((state) => state.code);

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

          <div className="w-full mx-auto animate-delay-500 animate-duration-1000 animate-fadeIn">
            <Prompt />
            <div className="flex flex-col gap-4 md:flex-row items-center justify-center mt-4 gap-x-16">
              <SelectFramework />
              <SelectLanguage />
            </div>

            {code && (
              <section className="mb-20 animate-fadeIn">
                <h3 className="pt-20 pb-10 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">
                  Result
                </h3>
                <Preview />
              </section>
            )}
          </div>
        </div>

        <Debug />
      </main>

      <footer
        className={`fixed bottom-0 left-0 right-0 block pb-20 mt-10 text-center animate-delay-1000 opacity-60 text-white/80 ${
          code ? "animate-fadeOut" : "animate-delay-500 animate-fadeIn"
        }`}
      >
        Done thanks to{" "}
        <a
          className="text-white hover:underline"
          href="https://twitter.com/midudev"
        >
          @midudev
        </a>{" "}
        &bull;{" "}
        <a
          className="text-white hover:underline"
          href="https://twitch.tv/midudev"
        >
          on Twitch
        </a>
      </footer>
    </>
  );
}
