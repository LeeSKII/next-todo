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

export async function encryptData(plaintext, key, algorithm) {
  try {
    // 将文本转换为 Uint8Array，因为加密函数需要这样的格式
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(plaintext);

    // 定义加密算法的参数
    const encryptOptions = {
      name: algorithm, // 加密算法名称，例如 "AES-GCM"
      iv: window.crypto.getRandomValues(new Uint8Array(12)), // 生成随机初始化向量 (IV)
    };

    // 执行加密操作
    const encrypted = await crypto.subtle.encrypt(encryptOptions, key, data);

    // 返回加密结果（ArrayBuffer）
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}

// 示例用法
// (async () => {
//   // 生成一个新的对称密钥
//   const key = await crypto.subtle.generateKey(
//     {
//       name: "AES-GCM",
//       length: 256, // 密钥长度，以位为单位
//     },
//     true, // 是否可导出密钥
//     ["encrypt", "decrypt"] // 密钥的用途
//   );

//   // 要加密的文本
//   const plaintext = "This is the secret message";

//   // 加密数据
//   const encryptedData = await encryptData(plaintext, key, "AES-GCM");

//   // 打印加密结果（ArrayBuffer）
//   console.log("Encrypted data (ArrayBuffer):", encryptedData);
// })();
