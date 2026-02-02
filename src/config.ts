export type Config = {
  baseUrl: string;
  token: string;
  debug: boolean;
};

export function loadConfig(): Config {
  const baseUrl = process.env.CLEARFEED_API_BASE_URL;
  const token = process.env.CLEARFEED_API_TOKEN;

  if (!baseUrl) {
    throw new Error('CLEARFEED_API_BASE_URL is required');
  }
  if (!token) {
    throw new Error('CLEARFEED_API_TOKEN is required');
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
    token,
    debug: process.env.DEBUG === 'true'
  };
}
