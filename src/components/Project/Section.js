import { useState } from "react"

export const Section = ({id, count, name}) => {
    const [counter, setCounter] = useState({
        count: count
    })

    const add = () => {
        setCounter({
            count: counter.count += 1})

        return fetch(`http://localhost:8088/sections/${id}`,{
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(counter)
        })
        .then(res => res.json())
        .then(() => {

        })
        
    }

    const subtract = () => {
        setCounter({
            count: counter.count -= 1})
        return fetch(`http://localhost:8088/sections/${id}`,{
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(counter)
        })
        .then(res => res.json())
        .then(() => {

        })
    }
    
    return <div className="countName" key={id}> 
        <header> {name} </header>
        <div className="count" > 
        <button className="minus" onClick={subtract}> − </button> 
        <p className="sectionCount"> {counter.count} </p> 
        <button className="plus" onClick={add}> ＋ </button>
        </div>
    </div>
}