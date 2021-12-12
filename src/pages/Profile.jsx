import React,{useContext,useState,useEffect} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import User from "../components/userinfo/User";
import {Link} from "react-router-dom"
import Button from "../components/intro/Button";

const Profile = () => {

    const {token} = useContext(AuthContext);
    const [user,setUser] = useState({});

    async function fetchUser()
    {
        try {
            const response = await axios.get('/auth/user', {
                headers: {"Authorization": `Bearer ${token}`},
                params:{
                    id:localStorage.getItem('id')
                }
            });
            setUser(response.data);
        }catch(e)
        {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUser()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className = "intro2">
            <User user={user} fetchUser={fetchUser}/>
            <Link to = "/userpage"style = {{"text-decoration":"none"}}>
                <div className = "btn_container back_btn">
                    <Button button = {{title:"Back",class:"btn btn5 btn6", click:()=>{},showText:()=>{}}}/>
                </div>
            </Link>
        </div>
    );
};

export default Profile;