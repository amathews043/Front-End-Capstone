import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
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
            <section> 
                <form className="form--login" onSubmit={handleLogin}> 
                    <h1> Welcome</h1>
                    <h2> Please Sign In </h2>
                    <fieldset> 
                        <label htmlFor="inputEmail"> Email Address</label>
                        <input type="email" 
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                        className="form--control"
                        placeholder="Email Address"
                        required autoFocus />
                    </fieldset>
                    <fieldset> 
                        <label htmlFor="inputPassword"> Password</label>
                        <input type="password" 
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                        className="form--control"
                        placeholder="Password"
                        required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}