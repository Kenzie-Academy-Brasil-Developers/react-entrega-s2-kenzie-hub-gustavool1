import { useEffect, useState } from "react"
import {  Redirect } from "react-router-dom"
import axios from 'axios'
import { Button, TextField, MenuItem } from "@mui/material"
import { useHistory } from "react-router";
import { useForm } from 'react-hook-form'
import './style.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = ({ authenticated, setAuthenticated }) =>{
    const curriencies = [
        {
            value:"Iniciante",
            label:'Iniciante'
        },
        {
            value:"Intermediário",
            label:"Intermediário"
        },
        {
            value:"Avançado",
            label:"Avançado"
        }
    ]
    const history = useHistory()
    const { register, handleSubmit } = useForm()
    const [ currency, setCurrency ] = useState('Iniciante')
    const [ newTech, setNewTech ] = useState(null)
    const id = localStorage.getItem("@User:userId")
    const token = localStorage.getItem('@KenzieHub:token')
    
    const callingApi = () =>{  
        axios.get(`https://kenziehub.herokuapp.com/users/${id}`)
        .then((response)=>{
            console.log(response.data)
            setNewTech([...response.data.techs])
               
        })
    }
    
    useEffect(()=>{

        callingApi()
        // eslint-disable-next-line
    }, [])

    
    if(!authenticated){
        return <Redirect to='/'/>

    }
    const onSubmitCreateTech = (data) =>{
        const toApi= {"title":data.newTechLevel, "status":currency}  
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
       
        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            callingApi()
            toast.success("Tecnologia deletada com sucesso")
        })
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
                    
                    <TextField sx={{m:2, width:"100%"}}placeholder='Digite a nova tecnologia' variant='outlined' {...register('newTechLevel')}/>
                    <TextField
                        id="outlined-select-currency"
                        select
                        value={currency}
                        label="Insira a seu conhecimento sobre a tec"
                        onChange={(e)=> setCurrency(e.target.value)}
                        sx= {{width:"50%", m:2}}
                    >
                    {
                        curriencies.map((option)=>(
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                    </TextField>
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