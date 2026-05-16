"use client";

import { useState } from "react";

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

export default function Home() {
  const [url, setUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const hasContent = !!markdown || !!error || loading;

  const handleConvert = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setMarkdown("");

    try {
      const jinaUrl = `https://r.jina.ai/${url.trim()}`;
      const res = await fetch(jinaUrl, {
        headers: { Accept: "text/markdown" },
      });
      if (!res.ok) {
        setError(`取得エラー: ${res.status}`);
      } else {
        const text = await res.text();
        const cleaned = text
          .split("\n")
          .filter((line) => !line.startsWith("URL Source:"))
          .join("\n");
        setMarkdown(`${cleaned}\n\n参照リンク: ${url.trim()}`);
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            URL to Markdown
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            URLを入力するとJina AIを使ってMarkdownに変換します
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
            onClick={handleConvert}
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
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {markdown.length.toLocaleString()} 文字
              </span>
              <div className="flex gap-2">
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
      </div>
    </main>
  );
}
