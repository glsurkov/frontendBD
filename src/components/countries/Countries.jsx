import React, {useContext, useEffect, useState} from 'react';
import cl from "../airports/Airports.module.css";
import Country from "./Country";
import {AuthContext} from "../../context";
import axios from "axios";

const Countries = (props) => {

    const {token} = useContext(AuthContext);
    const[countries,setCountries] = useState([]);

    useEffect(() => {
        fetchCountries();
    },[props.country]); // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchCountries(){
        try{
            const response = await axios.get('/countries',{
                headers:{"Authorization":`Bearer ${token}`},
            });
            setCountries(response.data)
        }catch(e)
            {
                console.log(e);
            }
        }




            return (
        <div className = {cl.container}>
            {countries.map((country) =>
                <Country country = {country} fetchCountries = {fetchCountries} key={country.country_name}/>
            )}
        </div>
    );
};

export default Countries;