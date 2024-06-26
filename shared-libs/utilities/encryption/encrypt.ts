import { JSEncrypt } from 'jsencrypt';

const key = `
-----BEGIN PUBLIC KEY-----
${(import.meta as any).env.VITE_CFT_PUBLIC_KEY}
-----END PUBLIC KEY-----
`;

export const encryptPlainText = (plainText: string) => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(key);

  return jsEncrypt.encrypt(plainText);
};
