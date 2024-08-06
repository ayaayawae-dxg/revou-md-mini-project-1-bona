import Aes from 'react-native-aes-crypto';

const key = '61670b719ad5b96d603891235214856085afae2511004cd3929effa00e0dae35';
const iv = '60b5bdc8308ebfa116356be3727c37b9';

const encrypt = async (text: string) => {
  const encrypted = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
  return encrypted
};

const decrypt = async (encryptedText: string) => {
  const decrypted = await Aes.decrypt(encryptedText, key, iv, 'aes-256-cbc');
  return decrypted
};

export default {
  encrypt,
  decrypt,
}