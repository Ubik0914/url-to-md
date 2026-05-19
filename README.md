# MDify

Web ページの URL を Markdown に変換するツールです。

## 使い方

1. 入力欄に変換したい URL を貼り付ける
2. 「変換」ボタン（または Enter キー）を押す
3. 結果をコピーまたは `.md` ファイルとしてダウンロード

### URL を直接渡して開く

クエリパラメータ `?url=` に対象 URL を付けてアクセスすると、ページを開いた時点で自動変換されます。

```
https://ubik0914.github.io/url-to-md/?url=https://example.com
```

ブックマークレットや他のツールと組み合わせる際に便利です。

## 技術スタック

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jina Reader](https://jina.ai/reader/) — Markdown 変換バックエンド
