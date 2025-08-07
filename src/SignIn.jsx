import './SignIn.css';
import Loader from './loader';
import { useRef, useState } from 'react';

const EnterForm = ({ signIn, exit, setEnter }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loader, setLoader] = useState(false);
    const [error,setError] = useState({});

    const enterToAccount = async () => {
        try {
            setError('');
            setLoader(true);
            const password = passwordRef.current.value;
            const email = emailRef.current.value;
            const result = await fetch('https://simpe-backand.onrender.com/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            if (!result.ok) {
                console.log('Server ERROR');
                setLoader(false);
            } else {
                const data = await result.json();
                if (data.success) {
                    setEnter(true);
                    setLoader(false);
                } else {
                    console.log(data.Error);
                    if (data.Error.email) {
                        setError({email: data.Error.email});
                    }if (data.Error.password) {
                        setError({password: data.Error.password});
                    }
                    setLoader(false);
                }
                setLoader(false);
            }
        } catch (err) {
            console.log(err);
            setLoader(false);
        }
    }
    return (
        <>
            {loader && <Loader />}
            <div id='wrapperSignIn'>
                <div id='sphereSignIn'></div>
                <div id='containerSignIn'>
                    <div id='exit' onClick={() => exit(false)}>&#10006;</div>
                    <h1>Enter to Account</h1>
                    <form action="">
                        <label htmlFor="">
                            <div style={error.email?.trim() === ""? {color:'white'}:{color: 'red'}}>{error.email?.trim() === ''? 'Email': error.email}</div>
                            <input ref={emailRef} type="text" placeholder='example@.com'/>
                        </label>
                        <label htmlFor="">
                            <div style={error.password?.trim() === ""? {color:'white'}:{color: 'red'}}>{error.password?.trim() === ''?'Password': error.password}</div>
                            <input ref={passwordRef} type="password" placeholder='*******'/>
                        </label>
                        <button type='button' onClick={enterToAccount}>Sign in</button>
                    </form>
                    <span>
                        don’t have account?
                        <button onClick={() => signIn(false)}>Sign up</button>
                    </span>
                </div>
            </div>
        </>
    )
}
export default EnterForm;