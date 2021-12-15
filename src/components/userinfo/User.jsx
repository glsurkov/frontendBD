import React,{useContext,useState} from 'react';
import {AuthContext} from "../../context";
import cl from './User.module.css'
import ImageSrc from "../../img/avia.png"
import axios from "axios";
import ModalWindow from "../modalWindow/ModalWindow";
import Button from "../intro/Button";
import MiniFlights from '../flights/MiniFlights'
import MiniHotels from '../hotels/MiniHotels'


const User = (props) => {

    const [error2,setError] = useState(undefined);
    const [sent,setSent] = useState(false);
    const [modal,setModal] = useState(false);
    const [inp,setInp] = useState('');

    const {token} = useContext(AuthContext);
    const [flights,setFlights] = useState([]);
    const [hotels,setHotels] = useState([]);
    const [history_flights,setHistoryFLights] = useState([]);
    const [history_hotels,setHistoryHotels] = useState([]);
    const [shown,setShown] = useState(false);
    const [shown2,setShown2] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [modal3,setModal3] = useState(false);

    async function fetchUserFlights(event,state) {
        try {
            event.preventDefault();
            const response = await axios.get('/flights/user',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    active:state
                }
            });
            if(state === 1) {
                setFlights(response.data);
            }else
            {
                setHistoryFLights(response.data)
            }
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    async function fetchUserHotels(event,state) {
        try {
            event.preventDefault();
            const response = await axios.get('/hotels/user',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    active:state
                }
            });
            if(state === 1) {
                setHotels(response.data);
            }else{
                setHistoryHotels(response.data)
            }
            console.log(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    const showModal = (state) =>
    {
        setModal(state);
    }


    async function addBalance(event,value){
        try{
            event.preventDefault();
            const response = await axios.post('/auth/balance',{
                value:value
            },{
                headers:{"Authorization":`Bearer ${token}`},
            })
            console.log(response);
            setInp('');
            setSent(true);
            return response
        }catch(e)
        {
            console.log('ERROR');
            setSent(true);
        }
    }

    const showModal2 = (state) => {
        setModal2(state);
    }
    const showModal3 = (state) => {
        setModal3(state);
    }

    console.log(props);
    return (
        <div className = {cl.user_card}>
            <ModalWindow visible = {modal} setVisible = {setModal}>
                <div className = {cl.balance_form}>
                <input value = {inp} onChange = {e => setInp(e.target.value)} placeholder='Введите сумму'/>
                    {
                        sent ?  <div> {
                            !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Данные успешно добавлены </div>
                        } </div> : null
                    }
                    <div onClick = {(e) => {addBalance(e,inp).then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false);props.fetchUser()}}>
                        <Button button = {{title:"Submit",class:"btn btn3", click:()=>{},showText:()=>{}}}/>
                    </div>
                </div>
            </ModalWindow>
            <img className = {cl.img} src = {ImageSrc}/>
            <h2>Имя пользователя</h2>
            <div className = {cl.user_info}>
                {props.user.username}
            </div>
            <h2>Роль</h2>
            <div className = {cl.user_info}>
                {props.user.role}
            </div>
            <h2>Баланс</h2>
            <div  className = {`${cl.user_info}`}>
                {props.user.balance}
                <p onClick = {() => showModal(true)} className={cl.l}/>
            </div>
            <h2>Полеты</h2>
            <div className = {cl.parent_arrow}>
                <div onClick = {(e) => {if(!shown){fetchUserFlights(e,1); setShown(true)}else{setFlights([]);setShown(false)}}} className={cl.arrow_down}></div>
            </div>
            <div>
                <MiniFlights flights = {flights}/>
            </div>
            <h2>Отели</h2>
            <div className = {cl.parent_arrow}>
                <div onClick = {(e) => {if(!shown2){fetchUserHotels(e,1); setShown2(true)}else{setHotels([]);setShown2(false)}}} className={cl.arrow_down}></div>
            </div>
            <div>
                <MiniHotels hotels = {hotels}/>
            </div>
            <h2 className={cl.click} onClick = {(e) => {
                fetchUserFlights(e,0); showModal2(true);
            }}>История полетов</h2>
            <ModalWindow visible = {modal2} setVisible = {setModal2}>
                <MiniFlights flights = {history_flights}/>
            </ModalWindow>
            <h2 className={cl.click} onClick = {(e) => {
                fetchUserHotels(e,0); showModal3(true);
            }}>История отелей</h2>
            <ModalWindow visible = {modal3} setVisible = {setModal3}>
                <MiniHotels hotels = {history_hotels}/>
            </ModalWindow>
        </div>
    );
};

export default User;