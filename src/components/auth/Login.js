import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import logo from "./Stitch-Minder.png"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`${process.env.REACT_APP_API_HOST}/users?email=${email}`)
        .then(res => res.json())
        .then(foundUsers => {
            if(foundUsers.length ===1){
                const user = foundUsers[0]
                localStorage.setItem("app_user", JSON.stringify({
                    id: user.id, 
                }))
                navigate("/")
            } else {
                window.alert("Invalid login")
            }
        })

    }

    return (
        <main className="container--login"> 
            <nav className="navbar is-link"> 
            <div className="navbar__item navbar-brand content is-large">
            <img className="logo" src={logo}/>
            </div>
        </nav>
                <form className="form--login" onSubmit={handleLogin}> 
                    <h1 className="h3 mb-3 font-weight-normal"> Welcome Please Sign In</h1>
                    <fieldset> 
                        <label htmlFor="inputEmail"> Email Address</label>
                        <input type="email" 
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                        className="form-control"
                        placeholder="Email Address"
                        required autoFocus />
                    </fieldset>
                    <fieldset> 
                        <label htmlFor="inputPassword"> Password</label>
                        <input type="password" 
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="button is-link" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}