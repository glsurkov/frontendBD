import React, {useContext,useState} from 'react';
import Button from "../intro/Button";
import cl from "./SignForm.module.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {AuthContext} from "../../context";
import axios from "axios";

const SignForm = ({type}) => {

    const {token,setToken,isAuth,setIsAuth} = useContext(AuthContext);
    const [form,setForm] = useState({username:"",password:""})

    const getValue = (id,value) =>
    {
        if (id === 1)
        {
            setForm({username:value,password:form.password});
        }
        if (id ===2)
        {
            setForm({username:form.username,password:value});
        }
    }

    async function fetchRegister(event)
    {
        try{
            event.preventDefault();
            const response = await axios.post('/auth/registration', form)
            if (response)
            {

            }
        }catch(e)
        {
            console.log('Ошибка про логине',e);

        }
    }

    async function fetchLogin(event)
    {
        try {
            event.preventDefault();
            const response = await axios.post('/auth/login', form);
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
        }catch(e)
        {
            console.log(false);
            console.log('Ошибка про логине',e);
        }
    }

    return (
        <div className = {cl.SignForm} >
            {type === 'Sign In' ? (<SignInForm getValue={getValue}/>) : (<SignUpForm getValue={getValue}/>)}
            <div onClick = {type === 'Sign In' ? fetchLogin : fetchRegister}>
                <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
            </div>
        </div>
    );
};

export default SignForm;