/** Bound memory before parsing untrusted JSON, including chunked requests. */
export class RequestJsonError extends Error {
  constructor(public readonly status: 400 | 413) {
    super(status === 413 ? "Request is too large" : "Invalid request");
  }
}

export async function readJsonObject(req: Request, maxBytes = 32 * 1024): Promise<Record<string, unknown>> {
  if (Number(req.headers.get("content-length")) > maxBytes) {
    throw new RequestJsonError(413);
  }
  const reader = req.body?.getReader();
  if (!reader) throw new RequestJsonError(400);
  let bytes = 0;
  let text = "";
  const decoder = new TextDecoder("utf-8", { fatal: true });
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new RequestJsonError(413);
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new RequestJsonError(400);
    }
    return parsed as Record<string, unknown>;
  } catch (error) {
    // Do not wait for an untrusted sender to finish the rejected stream.
    void reader.cancel().catch(() => {});
    throw error instanceof RequestJsonError ? error : new RequestJsonError(400);
  } finally {
    reader.releaseLock();
  }
}
