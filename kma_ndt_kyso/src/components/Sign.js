import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { post_data_axios } from '../configs/axios';

const Sign = () => {
    const placeholderHeader = '{\n"typ":"JWS",\n"alg":"RS256"\n}';
    const placeholderPayload = '{\n"sub": "1234567890",\n"name": "John Doe,\n"admin": true,\n}';
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');
    const [messageSign, setMessageSign] = useState('');
    const [messageHeader, setMessageHeader] = useState('');
    const [key, setKey] = useState('');
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (isJsonString(header)) {
            const data = JSON.parse(header);
            const { alg } = data;
            console.log(alg);
            if (!isEmpty(alg)) {
                const message = alg === 'RS256' ? 'Private Key' : 'Secret';
                setMessageHeader(message);
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        } else {
            setIsShow(false);
        }
    }, [header]);

    const onChangeHeader = (e) => {
        const { value } = e.target;
        setHeader(value);
    };

    const onChangePayload = (e) => {
        const { value } = e.target;
        setPayload(value);
    };

    const onChangeKey = (e) => {
        const { value } = e.target;
        setKey(value);
    }

    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const handleClickBtn = () => {
        if (isEmpty(header)) {
            toast.error('Bạn cần nhập header');
            return;
        }
        if (isEmpty(payload)) {
            toast.error('Bạn cần nhập payload');
            return;
        }
        if (!isJsonString(header) || !isJsonString(payload)) {
            toast.error('Dữ liệu không đúng định dạng');
            return;
        }
        // Data init
        const params = {
            header: JSON.parse(header),
            payload: JSON.parse(payload),
            key: !isEmpty(key) ? key : false,
        }
        // Send message to server sign
        post_data_axios('sign-message', params).then((res) => {
            if (res.code === 200) {
                const { data, message } = res;
                setMessageSign(data);
                toast.success(message);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <div className='row'>
            <div className='col-md-5 mr-3'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Header</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={6}
                            name="header"
                            placeholder={placeholderHeader}
                            value={header}
                            onChange={onChangeHeader}
                        />
                    </div>
                </div>
                {isShow && (
                    <div className='text-box'>
                        <div className='box-header'>
                            <h5 className='box-title'>{messageHeader}</h5>
                        </div>
                        <div className='box-content'>
                            <textarea
                                className='box-input-area form-control'
                                rows={6}
                                name="privateKey"
                                value={key}
                                onChange={onChangeKey}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='col-md-7'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Your Payload</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={7}
                            name="private_key"
                            placeholder={placeholderPayload}
                            value={payload}
                            onChange={onChangePayload}
                        />
                    </div>
                </div>
                <div className='btn-group'>
                    <button
                        onClick={() => handleClickBtn()}
                        type='button'
                        className='btn btn-primary'
                        id='sign_button'
                    >Sign the message</button>
                </div>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Signed Message</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            className='box-input-area form-control'
                            rows={10}
                            name="private-key"
                            placeholder="Here you'll see the signed message."
                            disabled
                            value={messageSign}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sign;
