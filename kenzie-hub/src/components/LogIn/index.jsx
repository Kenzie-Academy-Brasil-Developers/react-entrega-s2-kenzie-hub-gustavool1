import { Button, TextField } from "@mui/material"
import Formulario from "../../StyledComponents/Form/style"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useHistory } from "react-router"
import { useEffect } from "react"
const LogIn = ({ authenticated ,setAuthenticated }) =>{
    const { register, handleSubmit } = useForm();
    const history = useHistory()
    const onSubmit = (data) =>{
        console.log(data)
        axios.post("https://kenziehub.herokuapp.com/sessions", data)
         .then((response)=>{
             const { token } = response.data
             localStorage.clear()
             localStorage.setItem("@KenzieHub:token", token)
             localStorage.setItem("@User:userId", response.data.user.id)
             setAuthenticated(true)
             history.push('/dashboard')
         })
          .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        if(authenticated){
            history.push('/dashboard')
        }
    }, [authenticated])
    
    return (
        <Formulario onSubmit={ handleSubmit(onSubmit) } >
            <h1>Login</h1>
            <TextField  className='fields' label="Email" variant="outlined" {...register("email")} />
            <TextField  className='fields' label="Senha" variant="outlined" {...register("password")}/>
            <Button type='submit'>Entrar</Button>
        </Formulario>
    )
}
export default LogIn