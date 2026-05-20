"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const ClipboardDocumentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 7.5V6.10822C8.25 4.97324 9.09499 4.01015 10.2261 3.91627C10.5994 3.88529 10.9739 3.85858 11.3495 3.83619M15.75 18H18C19.2426 18 20.25 16.9926 20.25 15.75V6.10822C20.25 4.97324 19.405 4.01015 18.2739 3.91627C17.9006 3.88529 17.5261 3.85858 17.1505 3.83619M15.75 18.75V16.875C15.75 15.011 14.239 13.5 12.375 13.5H10.875C10.2537 13.5 9.75 12.9963 9.75 12.375V10.875C9.75 9.01104 8.23896 7.5 6.375 7.5H5.25M17.1505 3.83619C16.8672 2.91757 16.0116 2.25 15 2.25H13.5C12.4884 2.25 11.6328 2.91757 11.3495 3.83619M17.1505 3.83619C17.2152 4.04602 17.25 4.26894 17.25 4.5V5.25H11.25V4.5C11.25 4.26894 11.2848 4.04602 11.3495 3.83619M6.75 7.5H4.875C4.25368 7.5 3.75 8.00368 3.75 8.625V20.625C3.75 21.2463 4.25368 21.75 4.875 21.75H14.625C15.2463 21.75 15.75 21.2463 15.75 20.625V16.5C15.75 11.5294 11.7206 7.5 6.75 7.5Z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75L10.5 18.75L19.5 5.25"
    />
  </svg>
);

const ArrowDownTrayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5V18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75V16.5M16.5 12L12 16.5M12 16.5L7.5 12M12 16.5V3"
    />
  </svg>
);

const SpeakerWaveIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
    />
  </svg>
);

const StopIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
      clipRule="evenodd"
    />
  </svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="40 20"
    />
  </svg>
);

const stripMarkdownForSpeech = (md: string): string => {
  let text = md;
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/<!--[\s\S]*?-->/g, "");
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/^\s*\[[^\]]+\]:\s*\S+.*$/gm, "");
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");
  text = text.replace(/<https?:\/\/[^>\s]+>/g, "");
  text = text.replace(/<[^>]+>/g, "");
  text = text.replace(/^\s*#{1,6}\s+/gm, "");
  text = text.replace(/^\s*[=\-]{3,}\s*$/gm, "");
  text = text.replace(/^\s*(?:\*\s*){3,}\s*$/gm, "");
  text = text.replace(/^\s*(?:_\s*){3,}\s*$/gm, "");
  text = text.replace(/^\s*>+\s?/gm, "");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  text = text.replace(/^\s*\|?[\s:|\-]{3,}\|?\s*$/gm, "");
  text = text.replace(/\|/g, " ");
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, "$1");
  text = text.replace(/___([^_]+)___/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1$2");
  text = text.replace(/(^|[^_\w])_([^_\n]+)_(?!_)/g, "$1$2");
  text = text.replace(/~~([^~]+)~~/g, "$1");
  text = text.replace(/^\s*\[\^[^\]]+\]:.*$/gm, "");
  text = text.replace(/\[\^[^\]]+\]/g, "");
  text = text.replace(/[—–―−]/g, " ");
  text = text
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .join("\n");
  text = text.replace(/\n{2,}/g, "\n");
  return text.trim();
};

const chunkForTts = (text: string, maxLen = 150): string[] => {
  const chunks: string[] = [];
  for (const para of text.split(/\n+/)) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;
    const sentences =
      trimmedPara.match(/[^。！？\.!?]+(?:[。！？\.!?]+|$)/g) ?? [trimmedPara];
    let current = "";
    for (const raw of sentences) {
      const s = raw.trim();
      if (!s) continue;
      if (s.length > maxLen) {
        if (current) {
          chunks.push(current);
          current = "";
        }
        for (let i = 0; i < s.length; i += maxLen) {
          chunks.push(s.slice(i, i + maxLen));
        }
        continue;
      }
      if (current && (current + s).length > maxLen) {
        chunks.push(current);
        current = s;
      } else {
        current += s;
      }
    }
    if (current) chunks.push(current);
  }
  return chunks;
};

const TTS_SPEAKER_ID = 3;

const getInitialUrl = () => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("url") ?? "";
};

export default function Home() {
  const [url, setUrl] = useState(getInitialUrl);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [ttsState, setTtsState] = useState<"idle" | "loading" | "playing">(
    "idle"
  );

  const hasContent = !!markdown || !!error || loading;
  const didAutoConvert = useRef(false);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);
  const ttsAbortRef = useRef<{ aborted: boolean } | null>(null);

  const handleConvert = async (targetUrl?: string) => {
    const value = (targetUrl ?? url).trim();
    if (!value) return;
    try {
      new URL(value);
    } catch {
      setError("有効なURLを入力してください");
      return;
    }
    setLoading(true);
    setError("");
    setMarkdown("");
    setTitle("");

    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("url", value);
    window.history.replaceState(null, "", shareUrl.toString());

    try {
      const jinaUrl = `https://r.jina.ai/${value}`;
      const res = await fetch(jinaUrl, {
        headers: { Accept: "text/markdown" },
      });
      if (!res.ok) {
        setError(`取得エラー: ${res.status}`);
      } else {
        const text = await res.text();
        const lines = text.split("\n");
        let parsedTitle = "";
        let contentStart = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith("Title:")) {
            parsedTitle = lines[i].replace(/^Title:\s*/, "").trim();
          }
          if (lines[i].startsWith("Markdown Content:")) {
            contentStart = i + 1;
            break;
          }
        }
        setTitle(parsedTitle);
        setMarkdown(
          contentStart > 0
            ? lines.slice(contentStart).join("\n").trimStart()
            : text
        );
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didAutoConvert.current) return;
    const initial = new URLSearchParams(window.location.search).get("url");
    if (initial) {
      didAutoConvert.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleConvert(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stopSpeak = useCallback(() => {
    if (ttsAbortRef.current) ttsAbortRef.current.aborted = true;
    const audio = ttsAudioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    ttsAudioRef.current = null;
    setTtsState("idle");
  }, []);

  useEffect(() => {
    return () => {
      stopSpeak();
    };
  }, [stopSpeak]);

  const handleSpeak = async () => {
    if (ttsState !== "idle") {
      stopSpeak();
      return;
    }
    const plain = stripMarkdownForSpeech(markdown);
    if (!plain) return;
    const chunks = chunkForTts(plain, 150);
    if (chunks.length === 0) return;

    const abort = { aborted: false };
    ttsAbortRef.current = abort;
    setTtsState("loading");

    try {
      for (const chunk of chunks) {
        if (abort.aborted) return;
        const res = await fetch(
          `https://api.tts.quest/v3/voicevox/synthesis?speaker=${TTS_SPEAKER_ID}&text=${encodeURIComponent(chunk)}`
        );
        if (!res.ok) throw new Error(`tts http ${res.status}`);
        const data = (await res.json()) as {
          success?: boolean;
          mp3StreamingUrl?: string;
        };
        if (!data.success || !data.mp3StreamingUrl) {
          throw new Error("tts synthesis failed");
        }
        if (abort.aborted) return;

        await new Promise<void>((resolve, reject) => {
          const audio = new Audio(data.mp3StreamingUrl);
          ttsAudioRef.current = audio;
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("tts playback error"));
          if (abort.aborted) {
            resolve();
            return;
          }
          setTtsState("playing");
          audio.play().catch(reject);
        });
        if (abort.aborted) return;
      }
    } catch (e) {
      console.error(e);
      setError("読み上げに失敗しました");
    } finally {
      ttsAudioRef.current = null;
      ttsAbortRef.current = null;
      setTtsState("idle");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    let filename = "output.md";
    try {
      filename = new URL(url).hostname.replace(/\./g, "_") + ".md";
    } catch {}
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <main
      className="min-h-screen bg-gray-950 text-gray-100 px-4 sm:px-6 pb-6 transition-[padding-top] duration-700 ease-in-out"
      style={{ paddingTop: hasContent ? "24px" : "calc(50vh - 80px)" }}
    >
      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              MDify
            </Link>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            URLを入力するとMarkdownに変換します
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConvert()}
            placeholder="https://example.com"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 sm:py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleConvert()}
            disabled={loading || !url.trim()}
            className="w-full sm:w-auto px-5 py-3 sm:py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "変換中..." : "変換"}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {markdown && (
          <div className="space-y-2">
            {title && (
              <p className="text-base font-semibold text-white truncate" title={title}>
                {title}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {markdown.length.toLocaleString()} 文字
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSpeak}
                  title={
                    ttsState === "playing"
                      ? "停止"
                      : ttsState === "loading"
                      ? "読み込み中..."
                      : "読み上げ"
                  }
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-md text-xs transition-colors min-w-[44px] min-h-[44px] sm:min-h-0 justify-center"
                >
                  {ttsState === "playing" ? (
                    <StopIcon className="w-4 h-4 text-red-400" />
                  ) : ttsState === "loading" ? (
                    <SpinnerIcon className="w-4 h-4 animate-spin text-blue-300" />
                  ) : (
                    <SpeakerWaveIcon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {ttsState === "playing"
                      ? "停止"
                      : ttsState === "loading"
                      ? "読み込み中..."
                      : "読み上げ"}
                  </span>
                </button>
                <button
                  onClick={handleCopy}
                  title={copied ? "コピーしました!" : "コピー"}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-md text-xs transition-colors min-w-[44px] min-h-[44px] sm:min-h-0 justify-center"
                >
                  {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copied ? "コピーしました!" : "コピー"}
                  </span>
                </button>
                <button
                  onClick={handleDownload}
                  title=".md をダウンロード"
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-md text-xs transition-colors min-w-[44px] min-h-[44px] sm:min-h-0 justify-center"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">.md をダウンロード</span>
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={markdown}
              className="w-full h-[55vh] sm:h-[60vh] bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <footer className="text-center text-xs text-gray-500 pt-4 space-x-3">
          <Link
            href="/how-to-use"
            className="text-gray-400 hover:text-gray-200 underline underline-offset-2"
          >
            How To Use
          </Link>
          <span className="text-gray-700">·</span>
          <span>
            Powered by{" "}
            <a
              href="https://jina.ai/reader/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 underline underline-offset-2"
            >
              Jina Reader
            </a>
            {" / "}
            <a
              href="https://voicevox.su-shiki.com/su-shikiapis/ttsquest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 underline underline-offset-2"
            >
              TTS Quest VOICEVOX API
            </a>
          </span>
        </footer>
      </div>
    </main>
  );
}
