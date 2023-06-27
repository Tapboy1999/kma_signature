const crypto = require("crypto");
const validator = require("../helper/validate");
const createKey = async (req, res) => {
  const validationRule = {
    "size": "required"
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
        size
      } = req.body;
      const {
        publicKey,
        privateKey
      } = crypto.generateKeyPairSync('rsa', {
        modulusLength: parseInt(size),
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
          // cipher: 'aes-256-cbc',
          // passphrase: 'top secret',
        }
      });

      res.send({
        code: 200,
        message: 'Tạo khóa thành công!',
        data: {
          publicKey,
          privateKey
        }
      });
    }
  });
};
module.exports = createKey;