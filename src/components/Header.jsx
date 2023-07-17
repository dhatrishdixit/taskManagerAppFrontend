import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
    
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    

    const logoutHandler =async (e) =>{
      console.log("working");
         setLoading(true);
        e.preventDefault();
        try{ const {data} = await axios.get(`${server}/users/logout`,{
            withCredentials:true,
        }); 
        console.log("working");
        toast.success(data.message);
        setIsAuthenticated(false);
        setLoading(false);
        console.log("working");
     }catch(e){
        toast.error(e.response.data.message);
        setIsAuthenticated(true);
     }
       
        
    }

  return (
    <nav className="header">
       <div>
          <h2>Task Manager</h2>
    
       </div>
    <article>


        <Link to ={"/"}>
            Home
       </Link>   
        <Link to ={"/profile"}>
            Profile
        </Link>

        {
            isAuthenticated?<button disabled = {loading} className="btn" onClick={logoutHandler}>
            Logout
        </button> 
        :
         <Link to ={"/login"}>Login</Link>
        }
       

    </article>

    </nav>
  )
}

export default Header;