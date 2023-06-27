const crypto = require("crypto");
const fs = require('fs');
const appRoot = require('app-root-path');
const validator = require('../helper/validate');

const signRSA = (dataSign, key) => {
    // Khởi tạo biến chữ ký số
    let base64Signature = '';

    let privateKey = '';
    if (key === false) {
        // Đọc file khóa bí mật
        const { path } = appRoot;
        privateKey = fs.readFileSync(`${path}/src/key/privatekey.pem`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            return data;
        });
    } else {
        privateKey = key;
    }

    // Ký số với lớp crypto với thuật toán mã hóa SHA256
    const signature = crypto.sign('sha256', Buffer.from(dataSign), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });
    // Base64url kết quả
    base64Signature = signature.toString("base64url");
    // Trả về kết quả
    return base64Signature;
}

const signHmac = (dataSign, key) => {
    const hash = crypto.createHmac('sha256', key).update(dataSign).digest('base64url');

    return hash;
}

const signMessage = async (req, res) => {
    // Validate data
    const validationRule = {
        "header": "required",
        "payload": "required",
    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.send({
                code: 422,
                message: 'Validation failed',
                data: err,
            });
        } else {
            const { header, payload, key } = req.body;
            if (key !== false && key == '' && !key.includes('PRIVATE KEY') && !key.includes('END') && !key.includes('BEGIN')) {
                res.send({
                    code: 422,
                    message: 'Private key không hợp lệ',
                    data: err,
                });
            }

            // get data header
            const alg = header.alg;
            const kid = header.kid;

            if (alg == 'HS256' && key === false) {
                res.send({
                    code: 422,
                    message: 'Secret key không hợp lệ',
                    data: err,
                });
            }

            // Base64 header
            const base64Header = Buffer.from(JSON.stringify(header), 'binary').toString('base64url');
            // Base64 payload
            const base64Payload = Buffer.from(JSON.stringify(payload), 'binary').toString('base64url');

            // Data sign
            const dataSign = base64Header + '.' + base64Payload;
            // Sign data
            const base64Signature = alg === 'RS256' ? signRSA(dataSign, key) : signHmac(dataSign, key);

            // Serialization JWS

            const jwsSign = base64Header + '.' + base64Payload + '.' + base64Signature;

            res.send({
                code: 200,
                message: 'Tạo chữ ký thành công',
                data: jwsSign,
            });
        }
    });

};

module.exports = signMessage;