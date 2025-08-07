import './MainPage.css';
import { useState, useEffect } from 'react';
import RegistrationForm from './SignUp';

const MainPage = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [enter, setEnter] = useState(false);
    const [canEnter, setCanEnter] = useState(false);

    const registration = () => {
        if (canEnter) {
            setEnter(true);
        } else {
            setSignUp(true);
        }
    }
    useEffect(() => {
        const init = async () => {
            try {
                const result = await fetch('https://simpe-backand.onrender.com/checkTokens', {
                    method: "GET",
                    credentials: 'include'
                });
                await fetch('https://parser-x9js.onrender.com');
                if (!result.ok) {
                } else {
                    const data = await result.json();
                    if (data.valid) {
                        setEnter(true);
                        setCanEnter(true);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        init();
    }, [])
    return (
        <>
            {signUp &&
                <RegistrationForm
                    setSignUp={setSignUp}
                    setEnter={setEnter}
                    enter={enter}
                    setIsSignIn={setIsSignIn}
                    isSignIn={isSignIn}
                />}
            {!signUp &&
                <>
                    <div id='startPage'>
                        <nav >
                            <a href='' className='main-navItem logo'>
                                <img src="/raketa.png" alt="logo" />
                                <h2>Web Parser</h2>
                            </a>
                            <a className='nav-item main-navItem hide-content' style={{ color: 'white' }} href='#documentation'>Documentation</a>
                            <div className='nav-item main-navItem' onClick={() => { setSignUp(true); setIsSignIn(true) }}>Sign in</div>
                            <div className='main-navItem' id='textSignup' onClick={registration}>Sign up</div>
                        </nav>
                        <main>
                            <div id='line'></div>
                            <div id='sphere'></div>
                            <h1>Parse the Web Like a Pro</h1>
                            <h3>
                                Powerful,flexible, and beautiful
                                platform to create and run your
                                own web parsers. No setup required
                                - just pure parsing magic.
                            </h3>
                            <button id='getStarted' onClick={registration}>Get started</button>
                            <button id='exploreDocs'>Explore Docs</button>
                        </main>
                    </div>
                    <div id='documentation'>
                        <header>
                            <div>
                                <h1>Documentation</h1>
                                <h4>You can read on <a href="#">github</a> or heare</h4>
                            </div>
                            <a href="#"><img src="/github.png" alt="github" /></a>
                        </header>
                        <main>
                            <h2>📌 How to Create a Parser</h2>
                            <div>
                                <h3>🔐 1. Registration</h3>
                                <ul>
                                    <li>Choose a <b>unique userName</b></li>
                                    <li>Set a secure password</li>
                                </ul>
                                <div>Once registered, you'll gain access to all parser features.</div>
                            </div>
                            <div>
                                <h3>🛠️ 2. Choosing a Parser</h3>
                                <p>There are two types of parsers available on the website:</p>
                                <p>🧠 Flexible Parser</p>
                                <ul>
                                    <li>Ideal for any type of website, including dynamic ones</li>
                                    <ul>
                                        <li>Features:</li>
                                        <li>Take screenshots</li>
                                        <li>Input data into form fields</li>
                                        <li>Wait for specific content to load</li>
                                        <li>Extract data by class, id, tag, or any attribute</li>
                                        <li>Click elements</li>
                                    </ul>
                                    <li>⚠️ Slower, but more powerful and versatile</li>
                                </ul>
                                <p>⚡ Fast Parser</p>
                                <ul>
                                    <li>Works best for static websites</li>
                                    <li>Very fast and lightweight</li>
                                    <li>Can:</li>
                                    <ul>
                                        <li>Extract data by class, id, tag, or attribute</li>
                                    </ul>
                                    <li>❗ Not suitable for dynamic or interactive sites</li>
                                </ul>
                            </div>
                            <div>
                                <h3>🧾 3. Creating a Parser</h3>
                                <p>Go to the "Create Parser" section:</p>
                                <ul>
                                    <li>To select the Flexible Parser, click once</li>
                                    <li>To select the Fast Parser, click a second time</li>
                                </ul>
                                <p>Then:</p>
                                <ol>
                                    <li>Fill out the configuration form</li>
                                    <li>Press <b>"Run Parser"</b> to test if everything works correctly</li>
                                    <li>If it works — click "Create Parser" to save it</li>
                                </ol>
                            </div>
                            <div>
                                <h3>🧪 4. Flexible Parser Features</h3>
                                <ul>
                                    <li>Data extraction functions:</li>
                                    <ul>
                                        <li>data — gets a single element</li>
                                        <li>alldata — gets all matching elements</li>
                                    </ul>
                                    <li>Other powerful features:</li>
                                    <ul>
                                        <li>Wait for content to appear</li>
                                        <li>Input text into fields</li>
                                        <li>Click buttons and elements</li>
                                        <li>Take full-page screenshots</li>
                                    </ul>
                                </ul>
                            </div>
                            <div>
                                <h3>💡 5. How to Fill Out the Form</h3>
                                <p>To correctly find the id, class, tag, or attribute of the element you want to scrape:</p>
                                <ol>
                                    <li>Open the target website</li>
                                    <li>Press F12 to open Developer Tools</li>
                                    <li>Select the element you want</li>
                                    <li>Copy the appropriate identifier (class, id, tag, or attribute)</li>
                                    <li>Paste it into the form fields on the parser page</li>
                                </ol>
                            </div>
                            <div>
                                <h3>⚠️ Notes & Tips</h3>
                                <ul>
                                    <li>For <b>dynamic websites</b>, always use the <b>Flexible Parser</b></li>
                                    <li>Use alldata when you want to grab <b>multiple elements</b></li>
                                    <li>Test your parser with <b>"Run Parser"</b> before saving</li>
                                </ul>
                            </div>
                        </main>
                        <footer>
                            <a href="https://github.com/Vlad32-creator">
                                <img src="/github.png" alt="github" />
                            </a>
                            <a href="https://www.instagram.com/valerakhovanovv">
                                <img src="/instagram.png" alt="instagram" />
                            </a>
                            <a href="https://t.me/ValerijKhovanov">
                                <img src="/telegram.png" alt="telegram" />
                            </a>
                            <div className='footEl'>
                                <span>Sole author: Valerij Khovanov</span>
                                <span>Telefone: <a href="tel:+380983380067">+380983380067</a></span>
                                <span>Email: <a href="mailto:hovanovvalera@gmail.com">hovanovvalera@gmail.com</a></span>
                            </div>
                            <div className='footEl'>
                                <span>Donate here: </span>
                                <img id='donateImg' src="/donate.jpg" alt="" />
                            </div>
                            <div className='footEl'>
                                <span>Made with ❤️ in Ukraine</span>
                                <span>2025 Web Parser. All rights reserved.</span>
                            </div>
                        </footer>
                    </div>
                </>
            }
        </>
    )
}

export default MainPage;