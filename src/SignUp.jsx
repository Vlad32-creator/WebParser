import './SignUp.css';
import UserAccount from './UserAccount';
import EnterForm from './SignIn';
import { useState, useRef } from 'react';
import Loader from './loader';

const RegistrationForm = ({ setSignUp,setEnter,enter,isSignIn,setIsSignIn }) => {
    const [loader, setLoader] = useState(false);
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error,setError] = useState({});

    const createAccount = async () => {
        try {
            setError('');
            setLoader(true);
            const userName = userNameRef.current.value;
            const password = passwordRef.current.value;
            const email = emailRef.current.value;
            const result = await fetch('https://simpe-backand.onrender.com/registration', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName,
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
                } else {
                    console.log(data.Error);
                    if (data.Error.userName) {
                        setError({userName: data.Error.userName});
                    }if (data.Error.email) {
                        setError({email: data.Error.email});
                    }if (data.Error.password) {
                        setError({password: data.Error.password});
                    }
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
            {enter && <UserAccount exit={setSignUp} />}
            {loader && <Loader />}
            {isSignIn && !enter && <EnterForm signIn={setIsSignIn} exit={setSignUp} setEnter={setEnter} />}
            {!isSignIn && !enter &&
                <div id='wrapperSignUp'>
                    <div id='sphereSignUp'></div>
                    <div id='containerSingUp'>
                        <div id='exit' onClick={() => setSignUp(false)}>&#10006;</div>
                        <h1>Create Your Account</h1>
                        <h4>Start building your web parsers today!</h4>
                        <form action="">
                            <label htmlFor="name">
                                <div style={error.userName?.trim() === ""? {color:'white'}:{color: 'red'}}>{error.userName?.trim() === ''? 'Username': error.userName}</div>
                                <input ref={userNameRef} id='name' type="text" placeholder='jone_123' />
                            </label>

                            <label htmlFor="email">
                                <div style={error.email?.trim() === ""? {color:'white'}:{color: 'red'}}>{error.email?.trim() === ''? 'Email': error.email}</div>
                                <input ref={emailRef} id='email' type="text" placeholder='exemple@.com' />
                            </label>

                            <label htmlFor="password">
                                <div style={error.password?.trim() === ""? {color:'white'}:{color: 'red'}}>{error.password?.trim() === ''? 'Password': error.password}</div>
                                <input ref={passwordRef} id='password' type="password" placeholder='*****' />
                            </label>

                            <button type='button' onClick={createAccount}>Sign up</button>
                        </form>
                        <span>
                            Already have an account?
                            <button onClick={() => setIsSignIn(true)}>Sign in</button>
                        </span>
                    </div>
                </div>
            }
        </>
    )
}

export default RegistrationForm;