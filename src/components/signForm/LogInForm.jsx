import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context";
import cl from "./SignForm.module.css";
import Button from "../intro/Button";

const LogInForm = () => {

    const {setToken,setIsAuth} = useContext(AuthContext);

    const [inp,setInp] = useState(null);
    const [inp2,setInp2] = useState(null);
    const [error2,setError] = useState(undefined);
    const [sent,setSent] = useState(false);

    async function fetchLogin(event)
    {
        try {
            event.preventDefault();
            const response = await axios.post('/auth/login', {
                username:inp,
                password:inp2
            });
            if (response)
            {
                localStorage.setItem('token',response.data.token);
                setToken(response.data.token);
                setIsAuth(true);
                localStorage.setItem('auth','true');
                if(response.data.role === 'admin') {
                    localStorage.setItem('admin','true');
                }
            }
            setSent(true);
            setInp(null);
            setInp2(null);
            return response
        }catch(e)
        {
            console.log(false);
            console.log('Ошибка про логине',e);
            setSent(true);
        }
    }

    return (
        <div className={cl.SignForm}>
            <input className={cl.Input} value={inp} placeholder = "Login" onChange={(e)=>setInp(e.target.value)}/>
            <input className={cl.Input} value={inp2} placeholder = "Password" onChange={(e) => setInp2(e.target.value)}/>
            {
                sent ?  <div> {
                    !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Успешный вход </div>
                } </div> : null
            }
            <div onClick = {(e) => {fetchLogin(e).then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false)}}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default LogInForm;