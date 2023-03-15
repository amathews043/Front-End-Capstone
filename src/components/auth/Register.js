import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const[user, setUser] = useState({
        email: "", 
        password: "", 
        name: ""
    })

    let navigate = useNavigate()

    const register = () => {
        return fetch ('http://localhost:8088/users', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(createUser => {
            if(createUser.hasOwnProperty("id")){
                localStorage.setItem("app_user", JSON.stringify({
                    id: createUser.id, 
                }))
                navigate("/")
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users/email=${user.email}`)
        .then(res => res.json())
        .then(response => {
            if(response.length > 0){
                window.alert("Account with that email address already exists")
            } else {
                register()
            }
        })
    }

    return (
        <main style={{ textAlign: "center"}}> 
            <form className="form--loginn" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal"> Welcome! Please Register</h1>
                <fieldset> 
                    <label htmlFor="name"> Full Name</label>
                    <input onChange={evt => {
                        const copy = {...user}
                        copy[evt.target.id] = evt.target.value
                        setUser(copy)
                    }}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset> 
                    <label htmlFor="email">Email Address</label> 
                    <input onChange={evt => {
                        const copy = {...user}
                        copy[evt.target.id] = evt.target.value.toLowerCase()
                        setUser(copy)
                    }}
                    type="email" id="email" className="form-control"
                    placeholder="Email address" required />
                </fieldset>
                <fieldset> 
                    <label htmlFor="password">Password</label> 
                    <input onChange={evt => {
                        const copy = {...user}
                        copy[evt.target.id] = evt.target.value
                        setUser(copy)
                    }}
                    type="password" id="password" className="form-control"
                    placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>

            </form>
        </main>
    )
}