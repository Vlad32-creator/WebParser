import './UserAccount.css';
import CreateParser from './CreateParser';
import EaseParsParser from './EaseParsParser';
import { useState, useEffect } from 'react';
import ParserData from './ParserData';
import Loader from './loader';


const UserAccount = ({ exit }) => {
    const [nav, setNav] = useState('parsers');
    const [parsers, setParsers] = useState([]);
    const [isParseData, setIsParseData] = useState(false);
    const [parserData, setParserData] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [changeData, setChangeData] = useState();

    const changeParser = (data, name) => {
        if (data.includes('mainPars')) {
            const value = data.slice(data.indexOf('url:'));
            setChangeData({ value, name });
            setNav('createParser');
        } else {
            setChangeData({ name, data });
            setNav('easeParsParser');
        }
    }

    const runParser = async (el) => {
        try {
            setIsLoader(true);
            const res = localStorage.getItem(el);
            let result;
            if (res.includes('mainPars')) {
                const data = res.slice(8);
                console.log(data);
                result = await fetch('https://parser-x9js.onrender.com/mainPars', {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: data,
                });
                if (!result.ok) {
                    console.log('Som thing went wrong');
                    setIsLoader(false);
                } else {
                    setIsLoader(false);
                    const data = await result.json();

                    const answer = [];
                    data.forEach(el => {
                        if (el.success || el.Error) {
                            if (Array.isArray(el.success)) {
                                el.success.forEach(el => {
                                    answer.push(el);
                                });
                                console.log('was Array');
                            } else {
                                answer.push(el);
                            }

                        } if (el.type === 'Buffer') {
                            const uint8 = new Uint8Array(data[data.length - 1].data);
                            const blob = new Blob([uint8], { type: 'image/png' });
                            const url = URL.createObjectURL(blob);
                            const res = { success: { url } };
                            answer.push(res);
                        }
                    });
                    setParserData(answer);
                    setIsParseData(true);

                }} else {
                    result = await fetch('https://parser-x9js.onrender.com/easePars', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: res
                    });
                if (!result.ok) {
                    console.log('Som thing went wrong');
                    setIsLoader(false);
                } else {
                    setIsLoader(false);
                    const data = await result.json();
                    setParserData(data);
                    setIsParseData(true);
                }
                }

            } catch (err) {
                setIsLoader(false);
                console.log(err);
            }
        }

    const updateParsers = () => {
            const parsed = Object.keys(localStorage).map(key => {
                const value = localStorage.getItem(key)
                if (value.includes('mainPars')) {
                    const url = value.slice(value.indexOf('url') + 4, value.indexOf(';'));
                    return { key, value: value, url };
                } else {
                    const data = JSON.parse(value);
                    const url = data['url'];
                    return { key, value, url }
                }
            });
            setParsers(parsed);
        }
        const deleteParsers = (el) => {
            localStorage.removeItem(el);
            updateParsers();
        }

        useEffect(() => {
            updateParsers();
        }, []);

        return (
            <>
                {isLoader && <Loader />}
                {isParseData && <ParserData exit={setIsParseData} data={parserData} />}
                <div id='userAccountWrapper'>
                    <nav>
                        <div className='logoUserAccount'>
                            <img src="/raketa.png" alt="logo" />
                            <h2>Web Parser</h2>
                        </div>
                        <span onClick={() => exit(false)} className='nav-item'>Main</span>
                        <span onClick={() => setNav('parsers')} className='nav-item' >Parsers</span>
                        <span onClick={() => nav === 'createParser' ? setNav('easeParsParser') : setNav('createParser')} className='nav-item'>Create Parser</span>
                    </nav>
                    <main>
                        {nav === 'createParser' && <CreateParser setNav={setNav} updateParsers={updateParsers} changeData={changeData} setChangeData={setChangeData} />}
                        {nav === 'easeParsParser' && <EaseParsParser updateParsers={updateParsers} exit={setNav} setChangeData={setChangeData} changeData={changeData} />}
                        {nav === 'parsers' &&
                            <div id='currentParsersWrapper'>
                                <header>
                                    <div>Name</div>
                                    <div>Url</div>
                                    <div>Setting</div>
                                </header>
                                <ul>
                                    {parsers.map((el, index) => {
                                        
                                        return (
                                            <li className='parserEl' key={index}>
                                                <p onDoubleClick={() => deleteParsers(el.key)} onTouchEnd={() => deleteParsers(el.key)}>{el.key}</p>
                                                <div>{el.url}</div>
                                                <button onClick={() => changeParser(el.value, el.key)} className='change'>Change</button>
                                                <button onClick={() => runParser(el.key)} className='runBtn'>Run</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </main>
                </div>
            </>
        )
    }
    export default UserAccount;