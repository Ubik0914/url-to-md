import Link from "next/link";
import type { Metadata } from "next";
import CopyableUrlBlock from "./CopyableUrlBlock";

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
            MDify は、Web ページの URL を Markdown に変換するツールです。
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
            他のツールと組み合わせる際に便利です。
          </p>
          <CopyableUrlBlock />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">履歴(History)</h2>
          <p className="text-sm text-gray-300">
            変換した URL は{" "}
            <Link
              href="/history"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              /history
            </Link>{" "}
            ページから一覧で確認・再変換できます。各項目の削除ボタン、または「すべて削除」ボタンでいつでも消去可能です。
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-white">履歴はサーバーには保存されません。</strong>{" "}
            お使いのブラウザの <code className="text-gray-100">localStorage</code>{" "}
            にのみ保存され、サーバーには送信されません。ブラウザのデータを消去した場合や、別の端末・別のブラウザでは履歴は引き継がれません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">うまく変換できないとき</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
            <li>URL が <code className="text-gray-100">http(s)://</code> から始まっていることを確認してください。</li>
            <li>
              ログインが必要なページや、JavaScript で DOM を生成するページは、
              本文が取得できないことがあります。
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
