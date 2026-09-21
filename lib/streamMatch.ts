import { profileById, type ProfileItem } from "./profile";

type Handlers = {
  /** Called with each new fragment of prose as it arrives. */
  onSummary: (delta: string) => void;
  /** Called once, when the validated item list is ready. */
  onItems: (items: ProfileItem[]) => void;
};

/** Consumes the NDJSON event stream from /api/match.
 *  Resolves with an error message, or null on success. */
export async function streamMatch(
  query: string,
  { onSummary, onItems }: Handlers,
): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
  } catch {
    return "Couldn't reach the server — check your connection.";
  }

  // Failures (400 / 429 / 503) come back as plain JSON, not a stream.
  if (!res.ok || !res.body) {
    try {
      const data = await res.json();
      return data.error ?? "Search failed — try again.";
    } catch {
      return "Search failed — try again.";
    }
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let failure: string | null = null;

  const handleLine = (line: string) => {
    if (!line.trim()) return;
    let event: { type?: string; text?: string; itemIds?: string[]; error?: string };
    try {
      event = JSON.parse(line);
    } catch {
      return; // ignore a malformed line rather than killing the stream
    }

    if (event.type === "summary" && event.text) onSummary(event.text);
    else if (event.type === "items") {
      onItems(
        (event.itemIds ?? [])
          .map((id) => profileById.get(id))
          .filter((i): i is ProfileItem => Boolean(i)),
      );
    } else if (event.type === "error") {
      failure = event.error ?? "Search failed — try again.";
    }
  };

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Events are newline-delimited; the last piece may be incomplete.
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      lines.forEach(handleLine);
    }
    handleLine(buffer);
  } catch {
    return "Connection dropped mid-search — try again.";
  }

  return failure;
}
