function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  while (str.length % 4 !== 0) {
    str += "=";
  }

  const decoded = atob(str);
  return decoded;
}

export function decodeJwt<T>(token: string): T | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload) as T;
  } catch (err) {
    console.error("Error decoding JWT:", err);
    return null;
  }
}