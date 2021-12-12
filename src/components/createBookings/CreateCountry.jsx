import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import axios from "axios";
import {AuthContext} from "../../context";

const CreateCountry = () => {

    const [name,setName] = useState('')
    const [population,setPopulation] = useState('')
    const [city,setCity] = useState('')

    const {token} = useContext(AuthContext)

    async function addCountry(){
        try {
            const response = await axios.post('/countries',{
                country_name:`${name}`,
                population:population,
                capital_city:`${city}`
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setCity('');
            setName('');
            setPopulation('');
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className={cl.SignForm}>
            <input value = {name} onChange={e => setName(e.target.value)} className = {cl.Input} placeholder="Страна"/>
            <input value = {population} onChange={e => setPopulation(e.target.value)} className = {cl.Input} placeholder="Насленение"/>
            <input value = {city} onChange={e => setCity(e.target.value)} className = {cl.Input} placeholder="Столица"/>
            <div onClick = {addCountry}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
}


export default CreateCountry;