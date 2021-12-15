import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import axios from "axios";
import {AuthContext} from "../../context";

const CreateCountry = () => {

    const [sent,setSent] = useState(false)
    const [error2,setError] = useState(undefined)
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
            setSent(true);
            return response
        }catch(e)
        {
            console.log(e);
            setSent(true);
        }
    }


    return (
        <div className={cl.SignForm}>
            <input value = {name} onChange={e => setName(e.target.value)} className = {cl.Input} placeholder="Страна"/>
            <input value = {population} onChange={e => setPopulation(e.target.value)} className = {cl.Input} placeholder="Насленение"/>
            <input value = {city} onChange={e => setCity(e.target.value)} className = {cl.Input} placeholder="Столица"/>
            {
                sent ?  <div> {
                    !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Данные успешно добавлены </div>
                } </div> : null
            }
            <div onClick = {() => {addCountry().then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false)}}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
}


export default CreateCountry;