import { useEffect, useState } from "react"
import {  Redirect } from "react-router-dom"
import axios from 'axios'
import { Button, TextField, MenuItem, Select } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router";
import { useForm } from 'react-hook-form'
import './style.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = ({ authenticated, setAuthenticated }) =>{
    const useStyles = makeStyles({
        buttonStyle:{
            color:"red"
        }
    })
    const history = useHistory()
    const  classes = useStyles()
    const { register, handleSubmit } = useForm()
    const [ newTechLevel, setNewTechLevel ] = useState("")
    const [ newTech, setNewTech ] = useState(null)
    const id = localStorage.getItem("@User:userId")
    const token = localStorage.getItem('@KenzieHub:token')
    console.log(classes)
    const callingApi = () =>{  
        axios.get(`https://kenziehub.herokuapp.com/users/${id}`)
        .then((response)=>{
            console.log(response.data)
            setNewTech([...response.data.techs])
               
        })
        .catch((err)=> console.log(err))
    }
    
    useEffect(()=>{

        callingApi()
        // eslint-disable-next-line
    }, [])

    
    if(!authenticated){
        return <Redirect to='/'/>

    }


    const onSubmitCreateTech = (data) =>{
        console.log(token)
        console.log(data)
        const toApi= {"title":data.newTechLevel, "status":newTechLevel}  
        console.log(toApi)
        axios.post("https://kenziehub.herokuapp.com/users/techs", toApi, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            callingApi()
            toast.success("Tecnologia cadastrada com sucesso")
        }).catch((err)=>{
            toast.error('Impossível cadastrar esta tecnologia')
        })
    }


    const deleteTech = (id) =>{
        console.log(id)
        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            callingApi()
            toast.success("Tecnologia deletada com sucesso")
        })
        console.log('deletado')
    }

    const handleLogout = () =>{
        localStorage.clear()
        setAuthenticated(false)
        toast.info("Logout!")
        history.push("/")
    }
    return (
        <>
            <div className='dashboard'>
                <form onSubmit={handleSubmit(onSubmitCreateTech)}>
                    
                    <TextField sx={{color:"white", width:"100%"}}placeholder='Digite a nova tecnologia' {...register('newTechLevel')}/>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newTechLevel}
                        label="Age"
                        onChange={(e)=> setNewTechLevel(e.target.value)}
                        sx= {{border:"1px solid white", width:"30%", color:"white"}}
                    >
                        <MenuItem value="Iniciante">Iniciante</MenuItem>
                        <MenuItem value="Intermediário">Intermediário</MenuItem>
                        <MenuItem value="Avançado">Avançado</MenuItem>
                    </Select>
                    <Button type='submit'>Nova tecnologia</Button>
                </form>
                

                <ul>
                    {newTech &&  newTech.map((tec)=>(
                        <div key={tec.id} className='tech-container'>
                        <li>
                            <p>{tec.title}</p>
                            <p>{tec.status}</p>
                            <Button onClick={() =>deleteTech(tec.id)} color="error">Deletar</Button>
                        </li>
                        </div>
                    ))}
                </ul>
                <Button sx={{color:"red", textAlign:"center"}} onClick={handleLogout}>Sair</Button>
            </div>
        
        </>
    )
}
export default Dashboard