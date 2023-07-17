import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TaskItem from "../components/taskItem";
import { Navigate } from "react-router-dom";


const Home = () => {
 
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);

  // if(!isAuthenticated){
  //   return <Navigate to={'/login'} />
  // }
  const submitHandler =async  (e) => {
    e.preventDefault();
     try {
      console.log("working")
          setLoading(true);
          console.log(title,description);
         const {data} = await axios.post(`${server}/task/new`,{
          title,description
         },{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          }
         });
         
         toast.success(data.message);
         setTitle("");
         setDescription("");
         setLoading(false);
         setRefresh((prev) => !prev);

     } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
        setRefresh((prev) => !prev);
     }
  }
  
  const updateHandler =async (id) =>{
      try {
        const {data} = await axios.put(`${server}/task/${id}`,{},{
          withCredentials:true,
        });
        toast.success(data.message);
        setRefresh((prev) => !prev);
      } catch (error) {
        toast.error(error.response.data.message);
        setRefresh((prev) => !prev);
      }


  }

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
      setRefresh((prev) => !prev);
    }

  }

  useEffect(() => {
        try {
            axios.get(`${server}/task/my`,{
                withCredentials:true,
          }).then((res)=>{
            console.log(res.data.task);
            setTasks(res.data.task);
          
          })
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
  }, [refresh])
  
  
  if(!isAuthenticated){
    return <Navigate to={'/login'} />
  }
  

  return (
    <div className="container">
      <div className="login">
    <section>
    <form onSubmit={submitHandler}>
    <input 
    type="text" 
    value={title}
    onChange={(e)=>setTitle(e.target.value)}  placeholder="Title" required/>

   <input 
  type="text"
  value={description}
  onChange={(e)=>setDescription(e.target.value)}  
  placeholder="Description" required/>


    <button disabled={loading} type ="submit">Add Task</button>

    </form>
</section></div>
<section className="todosContainer">
  
  {tasks.map((i) => (
    <TaskItem
     title={i.title}
     description={i.description} 
     isCompleted={i.isCompleted} 
     key={i._id} 
     updateHandler={updateHandler} 
     deleteHandler={deleteHandler} 
     id={i._id} />
  ))}

</section>

</div>

  )
}

export default Home
