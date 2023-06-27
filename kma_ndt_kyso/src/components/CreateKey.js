import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { post_data_axios } from "../configs/axios";

const CreateKey = () => {
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [sizeKeyGen, setSizeKeyGen] = useState(1024);

    const handleCreateKey = () => {
        post_data_axios('create-key', { size: sizeKeyGen }).then((res) => {
            if (res.code === 200) {
                const { publicKey, privateKey } = res.data;
                setPublicKey(publicKey);
                setPrivateKey(privateKey);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    }

    const onChangeSizeKeyGen = (e) => {
        setSizeKeyGen(e.target.value);
    }

    return (
        <div className='row'>
            <div className='col-md-5 mr-3'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Your Public Key</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            disabled
                            className='box-input-area form-control'
                            rows={10}
                            name="private_key"
                            value={publicKey}
                        />
                    </div>
                </div>
                <div className="select-size">
                    <select className="form-control" onChange={onChangeSizeKeyGen}>
                        <option value={1024}>1024</option>
                        <option value={2048}>2048</option>
                        <option value={4096}>4096</option>
                    </select>
                </div>
            </div>
            <div className='col-md-7'>
                <div className='text-box'>
                    <div className='box-header'>
                        <h5 className='box-title'>Your Private Key</h5>
                    </div>
                    <div className='box-content'>
                        <textarea
                            disabled
                            className='box-input-area form-control'
                            rows={15}
                            name="private_key"
                            value={privateKey}
                        />
                    </div>
                </div>
                <div className='btn-group'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        id='sign_button'
                        onClick={handleCreateKey}
                    >Tạo khóa</button>
                </div>
            </div>
        </div>
    );
};

export default CreateKey;
