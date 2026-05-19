import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Use | MDify",
  description: "MDify の使い方",
};

export default function HowToUse() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <Link
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            ← トップへ戻る
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">How To Use</h1>
          <p className="text-gray-400 text-sm">
            MDify は、Web ページの URL を Markdown に変換するシンプルなツールです。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">基本の流れ</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
            <li>入力欄に変換したいページの URL を貼り付けます。</li>
            <li>「変換」ボタン(または Enter キー)を押すと変換が始まります。</li>
            <li>
              結果は下部のテキストエリアに表示されます。「コピー」または「.md
              をダウンロード」で取り出せます。
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            URL を直接渡して開く
          </h2>
          <p className="text-sm text-gray-300">
            クエリパラメータ <code className="text-gray-100">?url=</code>{" "}
            に対象 URL を付けてアクセスすると、ページを開いた時点で自動的に変換が走ります。
            ブックマークレットや他のツールと組み合わせる際に便利です。
          </p>
          <pre className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-xs text-gray-200 font-mono overflow-x-auto">
            https://&lt;このサイト&gt;/?url=https://example.com
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">仕組み</h2>
          <p className="text-sm text-gray-300">
            変換処理は{" "}
            <a
              href="https://jina.ai/reader/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Jina Reader
            </a>{" "}
            (<code className="text-gray-100">https://r.jina.ai/</code>) に委ねています。
            入力した URL はブラウザから Jina Reader に直接送信されます。
            社内情報や認証が必要なページなど、外部に渡したくない URL の入力は避けてください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">うまく変換できないとき</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
            <li>URL が <code className="text-gray-100">http(s)://</code> から始まっていることを確認してください。</li>
            <li>
              ログインが必要なページや、JavaScript で大半のコンテンツを生成するページは、
              本文が取得できないことがあります。
            </li>
            <li>
              「取得エラー」が表示される場合は、Jina Reader 側で対象 URL に到達できていない可能性があります。少し時間を置いて再試行してください。
            </li>
          </ul>
        </section>

        <footer className="text-center text-xs text-gray-500 pt-4">
          Powered by{" "}
          <a
            href="https://jina.ai/reader/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 underline underline-offset-2"
          >
            Jina Reader
          </a>
        </footer>
      </div>
    </main>
  );
}
