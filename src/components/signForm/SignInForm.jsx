import React, {useState} from 'react';
import cl from "./SignForm.module.css";

const SignInForm = ({getValue}) => {
    const [value,setValue] = useState('');
    const [posts,setPosts] = useState([
        {id:1, caption: "Login", text:''},
        {id:2, caption: "Password",text:''},
    ]);


    const TypeText = (post,e,value) =>{
        post.text = setValue(e.target.text)
        getValue(post.id,value);
    };



    return (
        <div className={cl.SignForm}>
            {posts.map(post =>
                <input key = {post.id} className = {cl.Input} value={value} onChange = {(e) => TypeText(post,e,e.target.value)} placeholder={post.caption}/>
            )}
        </div>
    );
};

export default SignInForm;