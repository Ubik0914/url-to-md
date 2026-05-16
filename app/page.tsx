"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setMarkdown("");

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "変換に失敗しました");
      } else {
        setMarkdown(data.markdown);
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
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">URL to Markdown</h1>
          <p className="text-gray-400 text-sm mt-1">
            URLを入力するとJina AIを使ってMarkdownに変換します
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConvert()}
            placeholder="https://example.com"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleConvert}
            disabled={loading || !url.trim()}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
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
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-xs transition-colors"
                >
                  {copied ? "コピーしました!" : "コピー"}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-xs transition-colors"
                >
                  .md をダウンロード
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={markdown}
              className="w-full h-[60vh] bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </main>
  );
}
