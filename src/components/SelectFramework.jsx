import { useConversationsStore } from "@/stores/conversations";
import { JavaScriptIcon, ReactIcon, SvelteIcon, VueIcon } from "./Icons";

const FRAMEWORKS = [
  {
    name: "JavaScript",
    icon: <JavaScriptIcon />,
    value: "vanilla",
  },
  {
    name: "React",
    icon: <ReactIcon />,
    value: "react",
  },
  {
    name: "Vue",
    icon: <VueIcon />,
    value: "vue",
  },
  {
    name: "Svelte",
    icon: <SvelteIcon />,
    value: "svelte",
  },
];

export function SelectFramework() {
  const { framework, setFramework } = useConversationsStore((state) => ({
    framework: state.framework,
    setFramework: state.setFramework,
  }));

  return (
    <ul className="flex gap-x-12 items-center justify-center my-12">
      {FRAMEWORKS.map(({ icon, value }) => (
        <li key={value}>
          <label>
            <input
              defaultChecked={framework === value}
              onClick={() => setFramework(value)}
              className="peer"
              hidden
              type="radio"
              name="framework"
              value={value}
            />
            <span className="hover:opacity-75 hover:scale-125 transition cursor-pointer opacity-40 peer-checked:opacity-100">
              {icon}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
