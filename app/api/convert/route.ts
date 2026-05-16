import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URLが必要です" }, { status: 400 });
  }

  let targetUrl: string;
  try {
    targetUrl = new URL(url).href;
  } catch {
    return NextResponse.json({ error: "無効なURLです" }, { status: 400 });
  }

  const jinaUrl = `https://r.jina.ai/${targetUrl}`;

  const response = await fetch(jinaUrl, {
    headers: {
      Accept: "text/markdown",
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Jina AIからのレスポンスエラー: ${response.status}` },
      { status: response.status }
    );
  }

  const markdown = await response.text();
  return NextResponse.json({ markdown });
}
