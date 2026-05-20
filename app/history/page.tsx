"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "mdify:history";

type Entry = { url: string; at: number };

const TrashIcon = ({ className }: { className?: string }) => (
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const formatDate = (ms: number) => {
  const d = new Date(ms);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function History() {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEntries(raw ? JSON.parse(raw) : []);
    } catch {
      setEntries([]);
    }
  }, []);

  const save = (next: Entry[]) => {
    setEntries(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const handleDelete = (url: string) => {
    if (!entries) return;
    save(entries.filter((e) => e.url !== url));
  };

  const handleClearAll = () => {
    if (!entries || entries.length === 0) return;
    if (!confirm("すべての履歴を削除しますか?")) return;
    save([]);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <Link
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            ← トップへ戻る
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">History</h1>
          <p className="text-gray-400 text-xs">
            この履歴は、お使いのブラウザの localStorage にのみ保存されます。
            サーバーには一切送信・保存されません。
          </p>
        </header>

        {entries === null ? (
          <p className="text-sm text-gray-500">読み込み中…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500 bg-gray-900 border border-gray-800 rounded-lg px-4 py-6 text-center">
            まだ履歴はありません。
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {entries.length} 件
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs px-3 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 rounded-md text-gray-300 transition-colors"
              >
                すべて削除
              </button>
            </div>
            <ul className="space-y-2">
              {entries.map((e) => (
                <li
                  key={e.url + e.at}
                  className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/?url=${encodeURIComponent(e.url)}`}
                      className="block text-sm text-blue-400 hover:text-blue-300 truncate"
                      title={e.url}
                    >
                      {e.url}
                    </Link>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {formatDate(e.at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(e.url)}
                    title="この履歴を削除"
                    className="flex items-center justify-center w-9 h-9 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 rounded-md text-gray-300 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
