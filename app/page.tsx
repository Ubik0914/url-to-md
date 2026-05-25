"use client";

import Link from "next/link";
import { marked } from "marked";
import { useEffect, useMemo, useRef, useState } from "react";
import { TTS_BETA_STORAGE_KEY } from "./how-to-use/BetaToggle";

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

const CodeBracketIcon = ({ className }: { className?: string }) => (
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
      d="M17.25 6.75 22.5 12l-5.25 5.25M6.75 17.25 1.5 12l5.25-5.25M14.25 4.5l-4.5 15"
    />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
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
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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

function extractYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/(?:shorts|embed|v)\/([^/?]+)/);
      if (m) return m[1];
    }
    if (host === "youtu.be")
      return u.pathname.slice(1).split(/[?/]/)[0] || null;
  } catch {}
  return null;
}

interface CaptionTrack {
  baseUrl: string;
  languageCode: string;
  kind?: string;
}

async function proxyFetch(url: string): Promise<string> {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
  ];
  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy, { signal: AbortSignal.timeout(12000) });
      if (!res.ok) continue;
      return await res.text();
    } catch {}
  }
  throw new Error("プロキシ経由での取得に失敗しました");
}

async function fetchYouTubeMarkdown(
  videoId: string
): Promise<{ title: string; markdown: string }> {
  const html = await proxyFetch(
    `https://www.youtube.com/watch?v=${videoId}&hl=ja`
  );

  const marker = "ytInitialPlayerResponse = ";
  const mi = html.indexOf(marker);
  if (mi < 0) throw new Error("動画情報が見つかりませんでした");

  let depth = 0,
    end = 0;
  for (let i = mi + marker.length; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}" && --depth === 0) {
      end = i + 1;
      break;
    }
  }

  const pr = JSON.parse(html.slice(mi + marker.length, end)) as {
    videoDetails?: {
      title?: string;
      shortDescription?: string;
      author?: string;
    };
    captions?: {
      playerCaptionsTracklistRenderer?: { captionTracks?: CaptionTrack[] };
    };
  };

  const title = pr.videoDetails?.title ?? "";
  const channel = pr.videoDetails?.author ?? "";
  const desc = pr.videoDetails?.shortDescription ?? "";
  const tracks =
    pr.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [];

  const parts: string[] = [];
  if (title) parts.push(`# ${title}`);
  if (channel) parts.push(`**チャンネル:** ${channel}`);
  if (desc) parts.push(`\n## 概要\n\n${desc}`);

  if (tracks.length === 0) {
    parts.push("\n\n*字幕なし*");
    return { title, markdown: parts.join("\n") };
  }

  const pick =
    tracks.find((t) => t.languageCode.startsWith("ja")) ??
    tracks.find(
      (t) => t.languageCode.startsWith("en") && t.kind !== "asr"
    ) ??
    tracks[0];

  const captionXml = await proxyFetch(`${pick.baseUrl}&fmt=xml`);
  const texts: string[] = [];
  for (const m of captionXml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)) {
    const t = m[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n/g, " ")
      .trim();
    if (t) texts.push(t);
  }

  if (texts.length > 0) {
    const lang =
      pick.languageCode + (pick.kind === "asr" ? " (自動生成)" : "");
    parts.push(`\n## 字幕 [${lang}]\n\n${texts.join(" ")}`);
  }

  return { title, markdown: parts.join("\n") };
}

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
const TTS_PREFETCH_AHEAD = 2;

const TTS_FETCH_ATTEMPTS = 3;
const TTS_FETCH_TIMEOUT_MS = 15000;

const fetchChunkAudio = async (text: string): Promise<HTMLAudioElement> => {
  let lastError: unknown = new Error("tts unavailable");
  for (let attempt = 0; attempt < TTS_FETCH_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(
        `https://api.tts.quest/v3/voicevox/synthesis?speaker=${TTS_SPEAKER_ID}&text=${encodeURIComponent(text)}`
      );
      if (!res.ok) throw new Error(`tts http ${res.status}`);
      const data = (await res.json()) as {
        success?: boolean;
        mp3StreamingUrl?: string;
        retryAfterSeconds?: number;
      };
      if (!data.success || !data.mp3StreamingUrl) {
        const wait = Math.min((data.retryAfterSeconds ?? 0) * 1000, 3000);
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
        throw new Error("tts synthesis not ready");
      }
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = data.mp3StreamingUrl;
      await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          audio.removeEventListener("canplay", onReady);
          audio.removeEventListener("loadedmetadata", onReady);
          audio.removeEventListener("error", onErr);
          clearTimeout(timer);
        };
        const onReady = () => {
          cleanup();
          resolve();
        };
        const onErr = () => {
          cleanup();
          reject(new Error("audio load failed"));
        };
        audio.addEventListener("canplay", onReady);
        audio.addEventListener("loadedmetadata", onReady);
        audio.addEventListener("error", onErr);
        const timer = setTimeout(() => {
          cleanup();
          reject(new Error("audio load timeout"));
        }, TTS_FETCH_TIMEOUT_MS);
        audio.load();
      });
      return audio;
    } catch (err) {
      lastError = err;
      if (attempt < TTS_FETCH_ATTEMPTS - 1) {
        await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
      }
    }
  }
  throw lastError;
};

type AbortToken = { aborted: boolean; onCleanup?: () => void };

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
  const [activeChunk, setActiveChunk] = useState(-1);
  const [viewMode, setViewMode] = useState<"source" | "preview">("source");
  const [ttsBetaEnabled, setTtsBetaEnabled] = useState(false);

  useEffect(() => {
    setTtsBetaEnabled(localStorage.getItem(TTS_BETA_STORAGE_KEY) === "true");
  }, []);

  const chunks = useMemo(() => {
    if (!markdown) return [] as string[];
    const plain = stripMarkdownForSpeech(markdown);
    return chunkForTts(plain, 150);
  }, [markdown]);

  const previewHtml = useMemo(() => {
    if (!markdown) return "";
    return marked.parse(markdown, { async: false, gfm: true }) as string;
  }, [markdown]);

  const ttsActive = ttsState !== "idle";

  const hasContent = !!markdown || !!error || loading;
  const didAutoConvert = useRef(false);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);
  const ttsAbortRef = useRef<AbortToken | null>(null);
  const prefetchCacheRef = useRef<Map<number, Promise<HTMLAudioElement>>>(
    new Map()
  );
  const chunkListRef = useRef<HTMLDivElement | null>(null);

  const stopSpeak = () => {
    const abort = ttsAbortRef.current;
    if (abort) {
      abort.aborted = true;
      abort.onCleanup?.();
    }
    const audio = ttsAudioRef.current;
    if (audio) audio.pause();
    ttsAudioRef.current = null;
    setTtsState("idle");
    setActiveChunk(-1);
  };

  const handleConvert = async (targetUrl?: string) => {
    const value = (targetUrl ?? url).trim();
    if (!value) return;
    try {
      new URL(value);
    } catch {
      setError("有効なURLを入力してください");
      return;
    }
    stopSpeak();
    setLoading(true);
    setError("");
    setMarkdown("");
    setTitle("");

    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("url", value);
    window.history.replaceState(null, "", shareUrl.toString());

    try {
      const videoId = extractYouTubeVideoId(value);
      if (videoId) {
        try {
          const { title: t, markdown: md } = await fetchYouTubeMarkdown(videoId);
          setTitle(t);
          setMarkdown(md);
          return;
        } catch {
          // fall through to Jina Reader
        }
      }

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

  useEffect(() => {
    return () => {
      stopSpeak();
    };
  }, []);

  useEffect(() => {
    prefetchCacheRef.current.clear();
  }, [chunks]);

  const getChunkAudio = (
    idx: number,
    list: string[]
  ): Promise<HTMLAudioElement> => {
    const cache = prefetchCacheRef.current;
    let p = cache.get(idx);
    if (!p) {
      p = fetchChunkAudio(list[idx]).catch((err) => {
        cache.delete(idx);
        throw err;
      });
      cache.set(idx, p);
    }
    return p;
  };

  const speakFromIndex = async (startIdx: number) => {
    const list = chunks;
    if (startIdx < 0 || startIdx >= list.length) return;
    stopSpeak();

    const abort: AbortToken = { aborted: false };
    ttsAbortRef.current = abort;
    setTtsState("loading");
    setActiveChunk(startIdx);

    try {
      for (let k = 0; k <= TTS_PREFETCH_AHEAD; k++) {
        const idx = startIdx + k;
        if (idx < list.length) {
          void getChunkAudio(idx, list).catch(() => {});
        }
      }

      for (let i = startIdx; i < list.length; i++) {
        if (abort.aborted) return;
        setActiveChunk(i);
        setTtsState("loading");
        for (let k = 1; k <= TTS_PREFETCH_AHEAD; k++) {
          if (i + k < list.length) {
            void getChunkAudio(i + k, list).catch(() => {});
          }
        }
        const audio = await getChunkAudio(i, list);
        if (abort.aborted) return;

        await new Promise<void>((resolve, reject) => {
          ttsAudioRef.current = audio;
          const cleanup = () => {
            audio.onended = null;
            audio.onerror = null;
            audio.onplaying = null;
            abort.onCleanup = undefined;
          };
          audio.onended = () => {
            cleanup();
            resolve();
          };
          audio.onerror = () => {
            cleanup();
            reject(new Error("tts playback error"));
          };
          audio.onplaying = () => {
            if (!abort.aborted) setTtsState("playing");
          };
          abort.onCleanup = () => {
            cleanup();
            resolve();
          };
          if (abort.aborted) {
            cleanup();
            resolve();
            return;
          }
          try {
            audio.currentTime = 0;
          } catch {}
          audio.play().catch((err) => {
            cleanup();
            reject(err);
          });
        });
        if (abort.aborted) return;
      }
    } catch (e) {
      console.error(e);
      if (!abort.aborted) setError("読み上げに失敗しました");
    } finally {
      if (ttsAbortRef.current === abort) {
        ttsAbortRef.current = null;
        ttsAudioRef.current = null;
        setTtsState("idle");
        setActiveChunk(-1);
      }
    }
  };

  const handleSpeak = () => {
    if (ttsState !== "idle") {
      stopSpeak();
      return;
    }
    void speakFromIndex(0);
  };

  const handleChunkClick = (idx: number) => {
    void speakFromIndex(idx);
  };

  useEffect(() => {
    if (activeChunk < 0) return;
    const container = chunkListRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(
      `[data-chunk-idx="${activeChunk}"]`
    );
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeChunk]);

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
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-md border border-gray-700 bg-gray-800 p-0.5 text-xs">
                  <button
                    onClick={() => setViewMode("source")}
                    disabled={ttsActive}
                    title="ソース"
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      viewMode === "source"
                        ? "bg-gray-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <CodeBracketIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ソース</span>
                  </button>
                  <button
                    onClick={() => setViewMode("preview")}
                    disabled={ttsActive}
                    title="プレビュー"
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      viewMode === "preview"
                        ? "bg-gray-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <EyeIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">プレビュー</span>
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {markdown.length.toLocaleString()} 文字
                </span>
                {ttsActive && chunks.length > 0 && (
                  <span className="text-xs text-blue-300 tabular-nums">
                    {Math.max(activeChunk, 0) + 1} / {chunks.length} 行
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {ttsBetaEnabled && (
                  <button
                    onClick={handleSpeak}
                    title={
                      ttsState === "playing"
                        ? "停止"
                        : ttsState === "loading"
                        ? "読み込み中..."
                        : "読み上げ (ベータ)"
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
                    <span className="text-[10px] font-medium text-amber-400 border border-amber-500/40 bg-amber-500/10 rounded px-1 leading-tight">
                      BETA
                    </span>
                  </button>
                )}
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
            {ttsActive ? (
              <div
                ref={chunkListRef}
                className="w-full h-[55vh] sm:h-[60vh] bg-gray-800 border border-gray-700 rounded-lg p-2 overflow-y-auto text-sm text-gray-200 font-mono space-y-0.5"
              >
                {chunks.length === 0 ? (
                  <p className="px-2 py-1 text-gray-500">
                    読み上げ可能な文字がありません
                  </p>
                ) : (
                  chunks.map((chunk, i) => (
                    <button
                      key={i}
                      type="button"
                      data-chunk-idx={i}
                      onClick={() => handleChunkClick(i)}
                      className={`flex w-full items-start gap-2 text-left px-2 py-1.5 rounded transition-colors whitespace-pre-wrap break-words ${
                        activeChunk === i
                          ? "bg-blue-600/40 text-white ring-1 ring-blue-400"
                          : "hover:bg-gray-700 active:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 pr-2 text-right tabular-nums select-none ${
                          activeChunk === i ? "text-blue-200" : "text-gray-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 min-w-0">{chunk}</span>
                    </button>
                  ))
                )}
              </div>
            ) : viewMode === "preview" ? (
              <div
                className="markdown-preview w-full h-[55vh] sm:h-[60vh] bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-y-auto text-sm text-gray-200"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                spellCheck={false}
                className="w-full h-[55vh] sm:h-[60vh] bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-auto text-sm text-gray-200 font-mono whitespace-pre-wrap break-words resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
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
