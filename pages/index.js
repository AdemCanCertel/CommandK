import Head from "next/head";
import CommandPalette from "../components/CommandPalette";

export default function Home() {
  return (
    <div className={"bg-neutral-900 min-h-full flex items-center flex-col"}>
      <Head>
        <title>Command Palette</title>
        <meta name="description" content="Command palette construction with Nextjs" />
      </Head>

      <CommandPalette />

      <div className="flex-1 flex items-center text-neutral-500">
        Press{" "}
        <span className="bg-blue-200 mx-2 inline-block py-[1px] px-2 rounded text-gray-700">
          ⌘
        </span>{" "}
        <span className="bg-blue-200 mx-2 inline-block  py-[1px] px-2 rounded text-gray-700">
          k
        </span>{" "}
         to open command palette
      </div>
    </div>
  );
}
