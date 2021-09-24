import { Button, TextField } from "@mui/material"
import Formulario from "../../StyledComponents/Form/style"
import { useForm } from "react-hook-form"
import axios from "axios"
const LogIn = () =>{
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) =>{
        console.log(data)
        axios.post("https://kenziehub.herokuapp.com/sessions", data).then((response)=>console.log('boaa')).catch((err)=>console.log(err))
    }
    return (
        <Formulario onSubmit={ handleSubmit(onSubmit) } >
            <TextField  className='fields' label="Email" variant="outlined" {...register("email")} />
            <TextField  className='fields' label="Senha" variant="outlined" {...register("password")}/>
            <Button type='submit'>Entrar</Button>
        </Formulario>
    )
}
export default LogIn