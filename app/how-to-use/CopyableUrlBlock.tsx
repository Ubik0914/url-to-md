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

const PREFIX = "https://ubik0914.github.io/url-to-md/?url=";

export default function CopyableUrlBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PREFIX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-900 border border-gray-800 rounded-lg pl-4 pr-14 py-3 text-xs text-gray-200 font-mono overflow-x-auto">
        {PREFIX}https://example.com
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "コピーしました!" : `"${PREFIX}" をコピー`}
        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 rounded-md transition-colors"
      >
        {copied ? (
          <CheckIcon className="w-4 h-4 text-green-400" />
        ) : (
          <ClipboardDocumentIcon className="w-4 h-4 text-gray-200" />
        )}
      </button>
    </div>
  );
}
