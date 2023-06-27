const crypto = require("crypto");
const fs = require('fs');
const appRoot = require('app-root-path');
const validator = require('../helper/validate');
const verifyRSA = (publicKey, signature, verifiableData) => {
  const isVerified = crypto.verify("sha256", Buffer.from(verifiableData), {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
  }, signature);
  return isVerified;
};
const verifyHmac = (secret, signature, verifiableData) => {
  const hash = crypto.createHmac('sha256', secret).update(verifiableData).digest('base64url');
  if (signature == hash) {
    return true;
  }
  return false;
};
const veryfySignature = async (req, res) => {
  // Validate data
  const validationRule = {
    "jws": "required|string",
    "publicKey": "required|string"
  };
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.send({
        code: 422,
        message: 'Validation failed',
        data: err
      });
    } else {
      const {
        jws,
        publicKey
      } = req.body;

      // Tách các thành phần header, payload, signature
      const arrSplit = jws.split('.');
      if (arrSplit.length < 3) {
        res.send({
          code: 422,
          message: 'Định dạng chữ ký số không hợp lệ',
          data: []
        });
        return;
      }
      const base64Header = arrSplit[0];
      const base64Payload = arrSplit[1];
      const base64Signature = arrSplit[2];
      // Xử lý dữ liệu
      const decodeHeader = Buffer.from(base64Header, 'base64url');
      const decodePayload = Buffer.from(base64Payload, 'base64url');
      const header = JSON.parse(decodeHeader.toString('utf-8'));
      const payload = decodePayload.toString('utf-8');
      const signature = Buffer.from(base64Signature, 'base64url');

      // Kiểm tra chữ ký số
      const alg = header.alg;
      const verifiableData = base64Header + '.' + base64Payload;

      // Kiểm tra định dạng khóa
      if (alg == 'RS256' && !publicKey.includes('BEGIN PUBLIC KEY') && !publicKey.includes('END PUBLIC KEY')) {
        res.send({
          code: 422,
          message: 'Khóa không hợp lệ',
          data: []
        });
        return;
      }
      const isVerified = alg === 'RS256' ? verifyRSA(publicKey, signature, verifiableData) : verifyHmac(publicKey, base64Signature, verifiableData);
      const message = isVerified ? 'Chữ ký số hợp lệ' : 'Chữ ký số không hợp lệ';
      res.send({
        code: 200,
        message,
        data: {
          header: JSON.stringify(header),
          payload,
          isVerified
        }
      });
    }
  });
};
module.exports = veryfySignature;