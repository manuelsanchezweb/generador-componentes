import { Blobs } from "@/components/Blobs";
import { Prompt } from "@/components/Prompt";
import { useConversationsStore } from "@/stores/conversations";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const response = useConversationsStore((state) => state.response);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generador de componentes de UI con Inteligencia Artificial"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative bg-black h-screen w-screen">
        <Blobs />
        <div className="grid place-content-center h-full">
          <h1 className="font-bold  text-white bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-6xl">
            Genera componentes con IA
          </h1>
          <div className="flex items-center h-full w-full">
            <div className="w-full">
              <Prompt />
            </div>
          </div>

          <div className="text-white">{response}</div>
        </div>
      </main>
    </>
  );
}
