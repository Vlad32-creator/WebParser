import './EaseParsParser.css';
import { useRef, useState, useEffect } from 'react';
import Loader from './loader';
import ParserData from './ParserData';

const EaseParsParser = ({ exit, updateParsers, changeData, setChangeData }) => {
    const urlRef = useRef();
    const selectRef = useRef();
    const getRef = useRef();
    const nameRef = useRef();
    const [isLoader, setIsLoader] = useState(false);
    const [isParserData, setIsParseData] = useState(false);
    const [parserData, setParserData] = useState();
    const alreadyRan = useRef(false);

    const createParser = () => {
        try {
            const name = nameRef.current?.value.trim();
            const url = urlRef.current?.value.trim();
            const select = selectRef.current?.value.trim();
            const get = getRef.current?.value.trim();
            if (!name || !url || !select) return alert('Fill fields');
            localStorage.setItem(name, JSON.stringify({ url: url, [select]: get }));
            updateParsers?.();
            exit?.('parsers');
        } catch (err) {
            console.log(err);
        }
    }

    function checkArray(data) {
        if (typeof data === 'string' && data.trim().startsWith('[') && data.trim().endsWith(']')) {
            const res = data.trim().slice(data.indexOf('[') + 1, data.length - 1);
            if (data.includes(',')) {
                const value1 = res.slice(0, res.indexOf(',')).trim();
                const value2 = res.slice(res.indexOf(',') + 1).trim();
                return [value1, value2];
            }
            return res;
        } else {
            return data;
        }
    }

    const runParser = async () => {
        try {
            setIsLoader(true);
            const result = await fetch('https://parser-x9js.onrender.com/easePars', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: urlRef.current.value,
                    [selectRef.current.value]: checkArray(getRef.current.value)
                })
            });
            if (!result.ok) {
                console.log('Som thing went wrong');
                setIsLoader(false);
            } else {
                setIsLoader(false);
                const data = await result.json();
                if (Array.isArray(data)) {
                    setParserData(data);
                    setIsParseData(true);
                    return;
                }
                if (!Array.isArray(data)) {
                    setParserData([{ success: data.code }]);
                    setIsParseData(true);
                    return;
                }
                setParserData([...data]);
                setIsParseData(true);
            }
        } catch (err) {
            setIsLoader(false);
            console.log(err);
        }
    };

    useEffect(() => {
        if (!changeData) return;
        if (alreadyRan.current) return;
        alreadyRan.current = true;
        const data = JSON.parse(changeData.data);
        const array = Object.entries(data);
        nameRef.current.value = changeData.name;
        urlRef.current.value = array[0][1];
        selectRef.current.value = array[1][0];
        getRef.current.value = array[1][1];
        setChangeData(null);
    }, [])

    return (
        <>
            {isParserData && <ParserData exit={setIsParseData} data={parserData} />}
            {isLoader && <Loader />}
            <div id='easeParsParserWrapper'>
                <input ref={nameRef} id='easeParsName' type="text" placeholder='Name' />
                <label htmlFor="">
                    <span>Url</span>
                    <input ref={urlRef} type="text" placeholder='https://example.com' />
                </label>
                <label htmlFor="">
                    <span>Data</span>
                    <input ref={selectRef} type="text" placeholder='Select: #exampleId' />
                    <input ref={getRef} type="text" placeholder='Get: html,text,id,class' />
                </label>
                <div id='easeParsButtons'>
                    <button onClick={createParser}>Create Parser</button>
                    <button onClick={runParser}>Run Parser</button>
                </div>
            </div>
        </>
    )
}
export default EaseParsParser;