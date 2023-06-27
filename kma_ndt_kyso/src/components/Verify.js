import React, { useState } from "react";
import { toast } from "react-toastify";
import { post_data_axios } from "../configs/axios";

const Verify = () => {

    const [jws, setJws] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');

    const handleChangeJws = (e) => {
        const { value } = e.target;
        setJws(value);
    }

    const handleChangePublicKey = (e) => {
        const { value } = e.target;
        setPublicKey(value);
    }

    const handleVerify = () => {
        const params = {
            jws,
            publicKey,
        };
        post_data_axios('verify-signature', params).then((res) => {
            const { code, data, message } = res;
            if (code === 200 && data.isVerified) {
                setHeader(data.header);
                setPayload(data.payload)
                toast.success(message);
            } else {
                toast.error(message);
                setHeader('');
                setPayload('');
            }
        });
    };

    return (
        <div className='row'>
            <div className='col-md-5 mr-3'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Signer's Public Key</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={5}
                            name="public_key"
                            placeholder="Paste signer's public key here."
                            value={publicKey}
                            onChange={handleChangePublicKey}
                        />
                    </div>
                </div>
            </div>
            <div className='col-md-7'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Signed Message</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={10}
                            name="signed_message"
                            placeholder='Paste Signed message here.'
                            value={jws}
                            onChange={handleChangeJws}
                        />
                    </div>
                </div>
                <div className='btn-group'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        id='verify_signature'
                        onClick={handleVerify}
                    >Verify signature</button>
                </div>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Header</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={3}
                            name="private-key"
                            placeholder="Header"
                            disabled
                            value={header}
                        />
                    </div>
                </div>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Payload</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={5}
                            placeholder="Payload"
                            disabled
                            value={payload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;
