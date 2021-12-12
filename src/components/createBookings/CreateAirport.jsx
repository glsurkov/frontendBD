import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import {AuthContext} from "../../context";
import axios from "axios";

const CreateAirport = () => {

    const [name,setName] = useState('')
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')

    const {token} = useContext(AuthContext)

    async function addAirport(){
        try {
            const response = await axios.post('/airports',{
                airport_name:`${name}`,
                airport_country:`${country}`,
                airport_city:`${city}`
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setCountry('');
            setCity('');
        }catch(e)
        {
            console.log(e);
        }
    }


    return (
        <div className={cl.SignForm}>
            <input value = {name} onChange = {e => setName(e.target.value)} className = {cl.Input} placeholder="Название аэропорта"/>
            <input value ={country} onChange = {e => setCountry(e.target.value)} className = {cl.Input} placeholder="Страна"/>
            <input value = {city} onChange = {e => setCity(e.target.value)} className = {cl.Input} placeholder="Город"/>
            <div onClick = {addAirport}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAirport;