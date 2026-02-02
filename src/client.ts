import { Config } from './config.js';

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export type RequestOptions = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  path: string;
  query?: QueryParams;
  body?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class ClearfeedClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly debug: boolean;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.debug = config.debug;
  }

  async request<T = unknown>({ method, path, query, body }: RequestOptions): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    const params = toSearchParams(query);
    params.forEach((value, key) => url.searchParams.append(key, value));

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`
    };

    let payload: string | undefined;
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }

    const startedAt = Date.now();
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: payload
    });

    const durationMs = Date.now() - startedAt;
    if (this.debug) {
      logDebugRequest({ method, url: url.toString(), status: response.status, durationMs });
    }

    const text = await response.text();
    const parsed = parseJson(text);

    if (!response.ok) {
      throw new ApiError(
        `Clearfeed API error: ${response.status} ${response.statusText}`,
        response.status,
        parsed
      );
    }

    return parsed as T;
  }
}

function toSearchParams(query?: QueryParams): URLSearchParams {
  const params = new URLSearchParams();
  if (!query) return params;

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) continue;
        params.append(key, String(item));
      }
    } else {
      params.append(key, String(value));
    }
  }

  return params;
}

function parseJson(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function logDebugRequest({
  method,
  url,
  status,
  durationMs
}: {
  method: string;
  url: string;
  status: number;
  durationMs: number;
}) {
  const line = `[clearfeed-mcp] ${method} ${url} -> ${status} (${durationMs}ms)`;
  console.error(line);
}
