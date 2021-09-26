import { Button, TextField } from "@mui/material"
import Formulario from "../../StyledComponents/Form/style"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import { useEffect } from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import './style.css'
import 'react-toastify/dist/ReactToastify.css';
const LogIn = ({ authenticated ,setAuthenticated }) =>{
    toast.configure()
    const formScheme = yup.object().shape({
        email: yup.string().required("Email obrigatório").email('Insira um email válido'),
        password:yup.string().required("Senha obrigatória")
    })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(formScheme)
    });

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
             toast.success('Bem vindo ao Kenzie Hub ')
             history.push('/dashboard')
         })
          .catch((err)=>{
              
              toast.error('Senha ou email, incorretos')
          })
    }
    useEffect(()=>{
        if(authenticated){
            history.push('/dashboard')
        }
        //eslint-disable-next-line
    }, [authenticated])
    console.log(errors)
    return (
        <Formulario  className='login'onSubmit={ handleSubmit(onSubmit) } >
            <h1>Login</h1>
            <TextField sx={{m:2}} className='fields' label="Email" variant="outlined" {...register("email")}  helperText={errors.email?.message}/>
            <TextField sx={{m:2}}className='fields' label="Senha" variant="outlined" {...register("password")} helperText={errors.password?.message}/>
            <Button type='submit'>Entrar</Button><Link to='/signUp'>Não está cadastrado ainda ? <span>Cadastre-se</span></Link>
        </Formulario>
    )
}
export default LogIn