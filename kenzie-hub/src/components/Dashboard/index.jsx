import { useEffect, useState } from "react"
import {  Redirect } from "react-router-dom"
import axios from 'axios'
import { Button, TextField, MenuItem, Select } from "@mui/material"
import { useForm } from 'react-hook-form'
import Formulario from "../../StyledComponents/Form/style"
const Dashboard = ({ authenticated }) =>{
    const { register, handleSubmit } = useForm()
    const [ user, setUser ] = useState(null)
    const [ newTechLevel, setNewTechLevel ] = useState("")
    const id = localStorage.getItem("@User:userId")


    const callingApi = () =>{  
        axios.get(`https://kenziehub.herokuapp.com/users/${id}`)
        .then((response)=>{
            console.log(response.data)
            return setUser(response.data)    
        })
        .catch((err)=> console.log(err))
    }
    
    useEffect(()=>{
        callingApi()
    }, [])

    
    if(!authenticated){
        return <Redirect to='/'/>

    }
    const onSubmit = (data) =>{
        console.log(data)
        const toApi= {"title":data.newTechLevel, "status":newTechLevel}  
        console.log(toApi)
        axios.post("https://kenziehub.herokuapp.com/users/techs", toApi).then((response)=>console.log(response)).catch((err)=>console.log(err))
    }
    return (
        <div>
            <h1>Dashboard teste</h1>
            {user &&  user.techs.map((tec)=><li key={tec.id}>{tec.title}</li>)
            }
            

            <Formulario onSubmit={handleSubmit(onSubmit)}>
            <TextField placeholder='Digite a nova tecnologia' {...register('newTechLevel')}/>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newTechLevel}
                label="Age"
                onChange={(e)=> setNewTechLevel(e.target.value)}
                
            >
                <MenuItem value="Iniciante">Iniciante</MenuItem>
                <MenuItem value="Intermediário">Intermediário</MenuItem>
                <MenuItem value="Avançado">Avançado</MenuItem>
            </Select>
            <Button type='submit'>Nova tecnologia</Button>
            </Formulario>
        </div>
    )
}
export default Dashboard