import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {Context, server} from "../main";
import toast from "react-hot-toast";
const Register = () => {

    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    const submitHandler =async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(name,email,password);
        try{
        const {data} = await axios.post(`${server}/users/new`,{
            name,email,password
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        });
        toast.success(data.message);
        setIsAuthenticated(true);
        setLoading(false);
    }
        catch(e){
            toast.error(e.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login">
    <section>
        <form 
        onSubmit={submitHandler}>
        <input type="text"value={name}
        onChange={(e)=>setName(e.target.value)} placeholder="name" required/>

        <input type="email" value={email}
        onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" required/>

        <input type="password" value={password}
        onChange={(e)=>setPassword(e.target.value)} placeholder ="Password" required/>
        <button disabled={loading} type ="submit">Sign up</button>
        <h4>Or</h4>
        <Link to="/login">Sign in</Link>
        </form>
    </section>
</div>
  )
}

export default Register;