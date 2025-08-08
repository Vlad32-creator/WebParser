import { useEffect,useState } from 'react';
import './ParserData.css';

const ParserData = ({ exit, data }) => {
    const [isCopy,setIsCopy] = useState(false);

    const copy = (data) => {
        setIsCopy(true);
        navigator.clipboard.writeText(data);
    }
    return (
        <div id='parserDataWrapper'>
            <button id='parserDataExit' onClick={() => exit(false)}>
                <div id='parserDataExitEl1'></div>
                <div id='parserDataExitEl2'></div>
            </button>
            {data.map((el, index) => {
                if(!el) return;
                return (
                    <div key={index} className='cameData'>
                        <header >
                            <span>{el.Error ? 'Error' : 'Success'}</span>
                            <button onClick={() => copy(el.success || el)}>{isCopy? '..Copied':'Copy'}</button>
                        </header>
                        <main >
                            {el.Error && <p style={{ color: 'red' }}>{el.Error}</p>}
                            {el.success?.url && <img src={el.success.url}/>}
                            {!el.success?.url && <p>{JSON.stringify(el.success || el, null, 2)}</p>}
                        </main>
                    </div>
                )
            })}
        </div>
    )
}
export default ParserData;