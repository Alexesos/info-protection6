import { useState, useEffect } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Service from '../service/Service';
import FileUploader from '../file-load/FileUploader';
import FileDownloader from '../file-load/FileDownloader';
import './app.scss';

const _firstSequenceValue = 113;
const _stepStartRange = 70;
const _stepEndRange = 125;
const _keyBitness = 8;

const App = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');
    const [m, setM] = useState('');
    const [n, setN] = useState('');
    const [n1, setN1] = useState('');
    const { getPrivateKey, getPublicKey, encode, decode, getN } = Service();

    const getM = (key) => {
        const sum = key.reduce((acc, cur) => Number(acc) + Number(cur), 0);
        setM(sum + 1);

        return sum + 1;
    };

    const getPrivateKeyRequest = async () => {
        const res = await getPrivateKey(_firstSequenceValue, _keyBitness, _stepStartRange, _stepEndRange);

        setPrivateKey(res);
        const newM = getM(res);

        getNRequest(newM);
    };

    const getNRequest = async (newM) => {
        const res = await getN(newM);
        setN(res);
    }

    const getPublicKeyRequest = async () => {
        const res = await getPublicKey(privateKey, m, n);
        setPublicKey(res);
    }

    const crypt = async () => {
        if (!message || !privateKey || !publicKey || privateKey.includes('') || publicKey.includes('')) {
            alert('Текст, приватний або публічний ключ не вказано, або вказано невірно!');
            return;
        }
        const res = await encode(message, publicKey);
        console.log(`Encode:`, res.result);
        console.log(`Encode:`, res.textToBinary);
        setResult(res.result);
    }

    const decrypt = async () => {
        if (!Array.isArray(message)) {
            fileContentCorrection();
        }
        const res = await decode(message, privateKey, m, n1);
        console.log(`Decode:`, res);
        setResult(res);
    }

    const fileContentCorrection = () => {
        const newMessage = message.split(',');
        setMessage(newMessage);
    }

    return (
        <>
            <Header/>
            <main className="main">
                <div className="main__container">
                    <div className="main__start">
                        <input 
                            type="number" 
                            value={n1}
                            onChange={(e) => setN1(e.target.value)}
                            placeholder='N1'
                        />
                        <FileUploader title={'Повідомлення для шифрування:'} setFileText={setMessage} content={message}/>
                        <FileUploader title={'Приватний ключ:'} setFileText={setPrivateKey} content={privateKey}/>
                        <FileUploader title={'Публічний ключ:'} setFileText={setPublicKey} content={publicKey}/>
                    </div>
                    <div className="main__mid">
                        <div className="main__content">
                            <div className="main__instructions instructions">
                                <p>
                                    Для шифрування: 
                                    <span></span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => getPrivateKeyRequest()}
                        >
                            Отримати приватний ключ
                        </button>
                        <button
                            onClick={() => getPublicKeyRequest()}
                        >
                            Отримати публічний ключ
                        </button>
                        <button
                            onClick={() => crypt()}
                        >
                            Зашифрувати
                        </button>
                        <button
                            onClick={() => decrypt()}
                        >
                            Душифрувати
                        </button>
                    </div>
                    <div className="main__end">
                        <FileDownloader title={'Private Key'} fileContent={privateKey}/>
                        <FileDownloader title={'Public Key'} fileContent={publicKey}/>
                        <FileDownloader title={'Message'} fileContent={result}/>
                    </div>
                </div>
            </main>
            <Footer 
                privateKey={privateKey} 
                publicKey={publicKey}
                m={m}
                n={n}
                result={result}
            />
        </>
    )
}

export default App;
