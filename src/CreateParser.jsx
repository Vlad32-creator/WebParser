import './CreateParser.css';
import { useState, useEffect, useRef, use } from 'react';
import ParserData from './ParserData';
import Loader from './loader';

const CreateParser = ({ setNav, updateParsers, changeData, setChangeData }) => {
    const [actions, setActions] = useState([]);
    const arrayRef = useRef([]);
    const [isParseData, setIsParseData] = useState(false);
    const [parserData, setParserData] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const parserNameRef = useRef();
    const alreadyRan = useRef(false);
    const urlRef = useRef();

    useEffect(() => {
        if (!changeData) {
            return;
        };
        if (alreadyRan.current) return;
        alreadyRan.current = true;
        function checkArray(data) {
            if (typeof data === 'string' && data.startsWith('[') && data.endsWith(']')) {
                const res = data.slice(data.indexOf('[') + 1, data.length - 1);
                if (data.includes(',')) {
                    const value1 = res.slice(0, res.indexOf(',')).trim();
                    const value2 = res.slice(res.indexOf(',') + 1).trim();
                    return { value1, value2 };
                }
                return res;
            } else {
                return data;
            }
        }
        parserNameRef.current.value = changeData.name;
        const data = changeData.value.split(';');
        let key, value, obj = [];

        const check = {
            url: "Url",
            input: 'Input', click: 'Click',
            alldata: "allData", wait: 'Wait',
            data: 'Data', screenshot: 'Screenshot',
        }
        for (let i = 0; i < data.length; i++) {
            key = data[i].slice(0, data[i].indexOf(':'));
            value = data[i].slice(data[i].indexOf(':') + 1);
            if (key.trim() === '') {
                continue;
            } if (key === 'url') {
                urlRef.current.value = value;
                continue;
            }
            obj.push({ action: check[key], id: new Date().getMinutes() + Math.random(), value: checkArray(value) });
        }
        setActions(prev => [...prev, ...obj]);
        setChangeData(null);
    }, []);

    const createParsers = () => {
        if (
            urlRef.current.value.trim() === '' ||
            parserNameRef.current.value.trim() === ''
        )return alert('Fill fields');
        let res = "mainPars";
        res += 'url:' + urlRef.current.value + ';';
        arrayRef.current.forEach(el => {
            if (!el.key || !el.value1 || el.value1 === '') return;
            res += el.key.textContent.toLowerCase();
            if (
                el.key.textContent === 'Data:' ||
                el.key.textContent === 'Input:' ||
                el.key.textContent === 'allData:'
            ) {
                res += '[';
            }
            res += el.value1.value || el.value1.textContent;
            if (el.value2) {
                res += ',';
                res += el.value2.value;
            }
            if (el.key.textContent === 'Data:' || el.key.textContent === 'Input:' || el.key.textContent === 'allData:') {
                res += ']';
            }
            res += ';';
        });
        localStorage.setItem(parserNameRef.current.value, res);
        setNav('parsers');
        updateParsers?.();
    }
    const logRefs = async () => {
        if (urlRef.current.value.trim() === '')return alert('fill fields');
        setIsLoader(true);
        let res = "";
        res += 'url:' + urlRef.current.value + ';';
        arrayRef.current.forEach(el => {
            if (!el.key || !el.value1 || el.value1 === '') return;
            res += el.key.textContent.toLowerCase();
            if (
                el.key.textContent === 'Data:' ||
                el.key.textContent === 'Input:' ||
                el.key.textContent === 'allData:'
            ) {
                res += '[';
            }
            res += el.value1.value || el.value1.textContent;
            if (el.value2) {
                res += ',';
                res += el.value2.value;
            }
            if (el.key.textContent === 'Data:' || el.key.textContent === 'Input:' || el.key.textContent === 'allData:') {
                res += ']';
            }
            res += ';';
        });
        let result
        try {
            result = await fetch('https://parser-x9js.onrender.com/mainPars', {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: res,
            })
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
                        }else{
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
            }
        } catch (err) {
            setIsLoader(false);
            console.log(err);
        }
    }

    const addAction = (e) => {
        setActions(prev => {
            if (prev.some(obj => obj.action === 'Screenshot') && e.target.textContent === 'Screenshot') {
                return [...prev];
            }
            return [...prev, { action: e.target.textContent, id: new Date().getMilliseconds() + Math.random() }];
        });
    }

    const delAction = (id) => {
        console.log(actions);

        setActions(prev => prev.filter(el => el.id !== id));
        arrayRef.current = arrayRef.current.filter(el => el.keyId !== id);
    }
    return (
        <>
            {isLoader && <Loader />}
            {isParseData && <ParserData exit={setIsParseData} data={parserData} />}
            <div id='createParserWrapper'>
                <section>
                    <button onClick={createParsers} style={{ background: 'rgb(34,211,238)' }}>Create Parser</button>
                    <button onClick={addAction}>Screenshot</button>
                    <button onClick={addAction}>Click</button>
                    <button onClick={addAction}>Wait</button>
                    <button onClick={addAction}>Input</button>
                    <button onClick={addAction}>Data</button>
                    <button onClick={addAction}>allData</button>
                    <button onClick={logRefs} style={{ background: 'rgb(34,211,238)' }}>Run</button>
                </section>
                <main>
                    <ul>
                        <li className='createParserItem'>
                            <span>Name:</span>
                            <label>
                                <input ref={parserNameRef} type="text" placeholder='Parser Name' />
                            </label>
                        </li>
                        <li className='createParserItem'>
                            <span>Url:</span>
                            <label>
                                <input ref={urlRef} type="text" placeholder='https://example.com' />
                            </label>
                        </li>
                        {actions.map((el, index) => {
                            return (
                                <li key={el.id} className='createParserItem'>
                                    {el.action === 'Screenshot' &&
                                        <>
                                            <span ref={(el) => {
                                                if (!arrayRef.current[index]) arrayRef.current[index] = {};
                                                arrayRef.current[index]["key"] = el ?? null;
                                                arrayRef.current[index]["keyId"] = el?.id ?? null;
                                            }} onDoubleClick={() => delAction(el.id)}>{el.action}:</span>
                                            <div>
                                                <span ref={(el) => {
                                                    if (!arrayRef.current[index]) arrayRef.current[index] = {};
                                                    arrayRef.current[index]["value1"] = el;
                                                }}>true</span>
                                            </div>
                                        </>
                                    }
                                    {el.action !== 'Screenshot' &&
                                        <>
                                            <span ref={(el) => {
                                                if (!arrayRef.current[index]) arrayRef.current[index] = {};
                                                arrayRef.current[index]["key"] = el ?? null;
                                                arrayRef.current[index]["keyId"] = el?.id ?? null;
                                            }} onDoubleClick={() => delAction(el.id)}>{el.action}:</span>
                                            <label>
                                                <span>{['Data', 'allData', 'Input'].includes(el.action) ? 'Select: ' : ''}</span>
                                                <input ref={(el) => {
                                                    if (!arrayRef.current[index]) arrayRef.current[index] = {};
                                                    arrayRef.current[index]["value1"] = el;
                                                }} type="text" defaultValue={el.value?.value1 ?? el.value} placeholder={['Data', "Input", "allData", 'Click'].includes(el.action) ? '#exampleId' : el.action === 'Url' ? 'https://exemple.com' : '1000'} />
                                            </label>
                                        </>
                                    }
                                    {['Data', 'allData', 'Input'].includes(el.action) &&
                                        <label>
                                            <span>{['Data', 'allData'].includes(el.action) ? 'Get: ' : el.action === 'Input' ? "Enter: " : ''}</span>
                                            <input ref={(el) => {
                                                if (!arrayRef.current[index]) arrayRef.current[index] = {};
                                                arrayRef.current[index]["value2"] = el;
                                            }} type="text" defaultValue={el.value?.value2 ?? ''} placeholder='text' />
                                        </label>
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </div >
        </>
    )
}

export default CreateParser;