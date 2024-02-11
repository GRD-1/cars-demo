import * as fs from 'fs';
import * as crypto from 'crypto';

const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

function generateDigitalSignature(data: string): string {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  return sign.sign(privateKey, 'base64');
}
