"use client";

import { useEffect, useState } from "react";

export const TTS_BETA_STORAGE_KEY = "mdify-tts-beta";

export default function BetaToggle() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem(TTS_BETA_STORAGE_KEY) === "true");
    setReady(true);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(TTS_BETA_STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-100">
          読み上げ機能を有効にする
        </p>
        <p className="text-xs text-gray-500">
          オンにすると、変換結果に読み上げボタンが表示されます。設定はこのブラウザに保存されます。
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="読み上げ機能(ベータ)を有効にする"
        disabled={!ready}
        onClick={toggle}
        className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-40 ${
          enabled ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
