import React, {useContext, useState} from 'react';
import cl from "./Airport.module.css";
import {AuthContext} from "../../context";
import axios from "axios";
import ModalWindow from "../modalWindow/ModalWindow";
import cl2 from "../signForm/SignForm.module.css";
import Button from "../intro/Button";

const Airport = (props) => {

    const [error2,setError] = useState(undefined);
    const [sent,setSent] = useState(false)
    const {token,admin} = useContext(AuthContext);
    const [airport,setAirport] = useState(props.airport.airport_name);
    const [country,setCountry] = useState(props.airport.airport_country);
    const [city,setCity] = useState(props.airport.airport_city);
    const [modal,setModal] = useState(false)

    async function deleteAirport(event,id){
        try{
            event.preventDefault();
            const response = await axios.delete('/airports',{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    airport_id:id
                }
            });
            console.log(response);
        }catch(e)
        {
            console.log(e);
        }
    }

    async function updateAirport(event){
        try{
            event.preventDefault()
            const response = await axios.put('/airports',{
                airport_name:airport,
                airport_country:country,
                airport_city:city
            },{
                headers:{"Authorization":`Bearer ${token}`},
                params:{
                    airport_id:props.airport.airport_id
                }
            })
            console.log(response);
            setSent(true);
            return response
        }catch(e)
        {
            console.log(e);
            setCountry(props.airport.airport_country);
            setAirport(props.airport.airport_name);
            setCity(props.airport.airport_city)
            setSent(true);
        }
    }

    const showModal = () =>
    {
        setModal(true);
    }

    return (
        <div>
            <div className = {cl.airport}>
                <strong className={cl.company}>
                    Название : {props.airport.airport_name}
                </strong>
                <div className={cl.card}>
                    <div>
                        Страна :
                        {props.airport.airport_country}
                    </div>
                    <div>
                        Город :
                        {props.airport.airport_city}
                    </div>
                </div>
                {admin
                    ?
                    <div>
                        <p onClick = {(e) => {deleteAirport(e,props.airport.airport_id);props.fetchAirports(e)}} className = {cl.delete}/>
                        <p onClick ={() => {showModal()}} className = {cl.update}/>
                        <ModalWindow visible={modal} setVisible={setModal}>
                            <div className = {cl2.SignForm}>
                                <input className = {cl2.Input} value = {airport} onChange = {(e) => {setAirport(e.target.value)}}/>
                                <input className = {cl2.Input} value = {country} onChange = {(e) => {setCountry(e.target.value)}}/>
                                <input className = {cl2.Input} value = {city} onChange = {(e) => {setCity(e.target.value)}}/>
                                {
                                    sent ?  <div> {
                                        !error2 ? <div className = 'error'>Ошибка! Проверьте введенные данные</div> : <div className = 'success'> Данные успешно cохранены </div>
                                    } </div> : null
                                }
                                <div onClick = {(e) => {updateAirport(e).then(res =>{ let response; if(res){response = res.status}else{response = undefined} setError(response)});setSent(false);props.fetchAirports()}}>
                                    <Button button = {{title:"Submit", class:"btn btn3", click: ()=>{}, showText:()=>{}}}/>
                                </div>
                            </div>
                        </ModalWindow>
                    </div>
                    : null}

            </div>
        </div>
    );
};

export default Airport;