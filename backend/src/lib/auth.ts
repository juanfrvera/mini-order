import * as jose from "jose";

async function checkToken(headers) {
  const auth = headers.Authorization;
  if (auth) {
    if (auth.startsWith("Bearer ")) {
      const token = auth.slice("Bearer ".length);
      const data = await verifyAndDecryptToken(token);
      if (data && data.payload && data.payload.sub) {
        const userId = data.payload.sub;
        return true;
      }
      throw new Error("No userId found in payload");
    }
  }
}

export async function verifyAndDecryptToken(jwt: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return jose.jwtVerify(jwt, secret, {});
}

async function getAuthResponse(userId: string) {
  const token = await this.generateToken({ sub: userId });
  const expirationDate = this.getExpirationDate();
  return { token, expirationDate };
}

export function generateToken(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const expirationTime = process.env.JWT_EXPIRATION_TIME ?? "2h";

  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expirationTime)
    .sign(secret);
}

function getExpirationDate() {
  const expirationString = process.env.JWT_EXPIRATION_TIME ?? "2h";

  const valueString = expirationString.slice(0, expirationString.length - 1);
  const hours = parseInt(valueString);

  const date = new Date(Date.now());
  date.setUTCHours(date.getUTCHours() + hours);
  return date;
}
