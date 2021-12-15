import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import {AuthContext} from "../../context";
import axios from "axios";

const CreateAirport = () => {

    const [sent,setSent] = useState(false)
    const [error2,setError] = useState(undefined)
    const [name,setName] = useState(null)
    const [country,setCountry] = useState(null)
    const [city,setCity] = useState(null)

    const {token} = useContext(AuthContext)

    async function addAirport(){
        try {
            const response = await axios.post('/airports',{
                airport_name:name,
                airport_country:country,
                airport_city:city
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setCountry('');
            setCity('');
            setSent(true)
            return response
        }catch(e)
        {
            console.log(e);
            setSent(true)
        }
    }


    return (
        <div className={cl.SignForm}>
            <input value = {name} onChange = {e => setName(e.target.value)} className = {cl.Input} placeholder="Название аэропорта"/>
            <input value ={country} onChange = {e => setCountry(e.target.value)} className = {cl.Input} placeholder="Страна"/>
            <input value = {city} onChange = {e => setCity(e.target.value)} className = {cl.Input} placeholder="Город"/>
            {
                sent ?  <div> {
                    !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Данные успешно добавлены </div>
                } </div> : null
            }
            <div onClick = {() => {addAirport().then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false)}}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAirport;