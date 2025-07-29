import "dotenv/config";

import crypto from "crypto";
import { base64url, base64urlDecode } from "./base64-util";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export class JwtUtils {
  static generateToken(payload: object, expiresInSeconds: number = 72 * 60 * 60): string {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const now = Math.floor(Date.now() / 1000);
    const fullPayload = {
      ...payload,
      iat: now,
      exp: now + expiresInSeconds
    };

    const headerEncoded = base64url(JSON.stringify(header));
    const payloadEncoded = base64url(JSON.stringify(fullPayload));

    const data = `${headerEncoded}.${payloadEncoded}`;

    const signature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(data)
      .digest();

    const signatureEncoded = base64url(signature);

    return `${data}.${signatureEncoded}`;
  }

  static verifyToken(token: string): any {
    const [headerEncoded, payloadEncoded, signatureEncoded] = token.split(".");

    if (!headerEncoded || !payloadEncoded || !signatureEncoded) {
      throw new Error("Token malformado");
    }

    const data = `${headerEncoded}.${payloadEncoded}`;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(data)
      .digest();
    const expectedSignatureEncoded = base64url(expectedSignature);

    if (signatureEncoded !== expectedSignatureEncoded) {
      throw new Error("Firma inválida");
    }

    const payloadJSON = base64urlDecode(payloadEncoded);
    const payload = JSON.parse(payloadJSON);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      throw new Error("Token expirado");
    }

    return payload;
  }
}
