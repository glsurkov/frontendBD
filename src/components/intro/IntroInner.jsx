import React, {useState} from 'react';
import '../../styles/style.css'
import Button from "./Button";
import Title from "./Title";
import ModalWindow from "../modalWindow/ModalWindow";
import LogInForm from "../signForm/LogInForm";
import RegisterForm from "../signForm/RegisterForm";

const IntroInner = ({show,showText}) => {

    const [modal,setModal] = useState(false);
    const [modal2,setModal2] = useState(false);

    const showModal = (state) =>
    {
        setModal(state)
    }
    const showModal2 = (state) =>
    {
        setModal2(state)
    }

    return (
        <div className = "intro_inner">
            <Title title = {"Let's fly with AirBook!"}/>
            <div onClick={() => showModal(true)}>
                <Button button = {{title:"Sign In", class:"btn",showText:()=>{}, click:()=>{}}}/>
            </div>
            <ModalWindow visible={modal} setVisible={setModal}>
                <LogInForm/>
            </ModalWindow>
            <br/>
            <div onClick={() => showModal2(true)}>
                <Button button = {{title:"Sign Up", class:"btn btn2", showText:()=>{}, click:()=>{}}}/>
            </div>
            <ModalWindow visible={modal2} setVisible={setModal2}>
                <RegisterForm/>
            </ModalWindow>
        </div>
    );
};

export default IntroInner;