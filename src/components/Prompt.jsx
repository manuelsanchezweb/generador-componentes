import { useConversationsStore } from "@/stores/conversations";
import { useEffect, useRef, useState } from "react";
import { MicrophoneIcon, SendIcon } from "./Icons";
import { Loading } from "./Loading";

export function Prompt() {
  const [isMicroWorking, setIsMicroWorking] = useState(false);
  const textAreaRef = useRef();
  const generateComponent = useConversationsStore(
    (state) => state.generateComponent
  );
  const streaming = useConversationsStore((state) => state.streaming);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsMicroWorking(false);

    const prompt = textAreaRef.current.value.trim();
    generateComponent({ prompt });
  }

  function handleSpeechToText() {
    setIsMicroWorking(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported by your browser");
      return;
    }

    textAreaRef.current.value = "";

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "es-ES";

    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      textAreaRef.current.value = transcript;
    });

    recognition.addEventListener("end", handleSubmit);

    recognition.start();
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleChange = (event) => {
    const el = textAreaRef.current;

    el.style.height = "0px";
    const scrollHeight = el.scrollHeight;
    el.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <textarea
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          disabled={streaming}
          ref={textAreaRef}
          autoFocus
          rows={1}
          name="prompt"
          type="text"
          placeholder=""
          className={`resize-none pr-20 sm:max-w-full ${
            streaming ? "opacity-40 pointer-events-none" : ""
          } block w-full text-md px-4 py-2 border border-gray-800 rounded-md bg-zinc-900/20 backdrop-blur-3xl sm:text-md shadow-lg min-h-[96px] ms:min-h-[48px] text-white outline-none`}
        />
        <div className="absolute right-4 top-0 h-full flex justify-center items-center">
          {streaming ? (
            <Loading />
          ) : (
            <div className="flex items-center gap-2">
              <button
                className={`${
                  isMicroWorking ? "opacity-40 pointer-events-none" : ""
                }  transition-all hover:scale-125`}
                type="button"
                onClick={handleSpeechToText}
              >
                <MicrophoneIcon />
              </button>
              <button className="transition-all hover:scale-125" type="submit">
                <SendIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
