import crypto from "crypto";

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * hash密码
 * @param password password
 * @returns hashed password
 */
export async function hashedPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash("sha256");
      const res = hash.update(password).digest("hex");
      return resolve(res);
    } catch (error) {
      reject("error");
    }
  });
}
