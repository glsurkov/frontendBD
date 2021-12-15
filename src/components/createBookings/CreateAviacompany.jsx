import React, {useContext, useState} from 'react';
import cl from "../signForm/SignForm.module.css";
import Button from "../intro/Button";
import {AuthContext} from "../../context";
import axios from "axios";

const CreateAviacompany = () => {

    const [sent,setSent] = useState(false);
    const [error2,setError] = useState(undefined)
    const [name,setName] = useState(null)
    const [phone,setPhone] = useState(null)

    const {token} = useContext(AuthContext)

    async function addAviacompany(){
        try {
            const response = await axios.post('/aviacompanies',{
                company_name:name,
                company_phone:phone,
            },{headers:{"Authorization":`Bearer ${token}`}})
            console.log(response);
            setName('');
            setPhone('');
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
            <input value = {name} onChange = {e => setName(e.target.value)} className = {cl.Input} placeholder="Название авиакомпании"/>
            <input value = {phone} onChange = {e => setPhone(e.target.value)} className = {cl.Input} placeholder="Номер телефона"/>
            {
                sent ?  <div> {
                    !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Данные успешно добавлены </div>
                } </div> : null
            }
            <div onClick = {() => {addAviacompany().then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false)}}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default CreateAviacompany;