import { Button,  TextField,  MenuItem  } from "@mui/material"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Form from "../../StyledComponents/Form/style"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import './style.css'
import { useState } from "react"
import axios from "axios"
import * as yup from 'yup'
import { useHistory, Link } from "react-router-dom"
const SignUp = ({ authenticated, setAuthenticated}) =>{
    const history = useHistory()
    if(!authenticated){
        history.push('/')
    }
    toast.configure()
    const currencies = [
        {
            value:"Primeiro módulo (Introdução ao Frontend)",
            label:"Primeiro módulo"
        },
        {
            value:"Segundo módulo (Frontend Avançado)",
            label:"Segundo módulo"
        },
        {
            value:"Terceiro módulo (Introdução ao Backend)",
            label:"Terceiro módulo"
        },
        {
            value:"Quarto módulo (Backend Avançado)",
            label:"Quarto módulo"
        }

    ]
    const [currency, setCurrency ] = useState("Primeiro módulo (Introdução ao Frontend)")
    const formScheme = yup.object().shape({
        name: yup.string().required("Nome obrigatório").min(4, 'Seu nome precisa ter no minimo 3 letras').matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'Seu nome só pode ter letras'),
        email: yup.string().required("Email obrigatório").required("Email Obrigatório").email(),
        confirmEmail: yup.string().required("Confirmação de email obrigatória").oneOf([yup.ref('email')], 'Os emails não são idênticos'),
        contact: yup.string().required("Contato obrigatório"),
        bio: yup.string().required("Bio obrigatória"),
        password: yup.string().required("Senha obrigatória").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/, 'Sua senha precisa conter: no mínimo 8 caracteres. 1 letra maiúscula no mínimo. 1 Número. 1 símbolo &@#*$.'),
        confirmPassword: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref('password')], 'As senhas não são iguais')
    })
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(formScheme)
    })
    const onSubmit = (data) => {
        const toApi = {email:data.email, password:data.password, name:data.name, bio:data.bio, contact:data.contact, course_module:currency}
        axios.post("https://kenziehub.herokuapp.com/users", toApi).then((response)=>{
            toast.success("Cadastrado com sucesso")
            history.push('/')
        })
        .catch((err)=>{
        })
    }
    const handleChange = (event) => {
        setCurrency(event.target.value);
      }
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <h1>Cadastre-se</h1>
            <TextField sx={{m:2,width:"90%"}} className='fields' label="Nome" variant="outlined" {...register("name")} helperText={errors.name?.message}/>

            <TextField sx={{m:2,width:"90%"}} className='fields'label="Email" variant="filled"  {...register("email")} helperText={errors.email?.message}/>

            <TextField sx={{m:2,width:"90%"}} className='fields'label="Confirmar email" variant="filled" {...register('confirmEmail')} helperText={errors.confirmEmail?.message}/>

            <TextField sx={{m:2,width:"90%"}}className='fields' label='Digite seu numero de telefone-celular' {...register('contact')} helperText={errors.contact?.message}/>

            <TextField sx={{m:2,width:"90%"}}placeholder='Escreva sua bio' {...register('bio')} helperText={errors.bio?.message} multiline rows={3} rowsMax={10}/>
            <TextField
                id="outlined-select-currency"
                select
                label="Insira seu módulo"
                value={currency}
                onChange={handleChange}
                helperText={errors.course_module?.message}
                sx={{m:2, width:"90%"}}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField sx={{m:2, color:"white", width:"90%"}}className='fields' label='Senha' {...register('password')} helperText={errors.password?.message} />

            <TextField sx={{m:2, color:"white", width:"90%"}}className='fields' label='Confirmar senha' {...register('confirmPassword')} helperText={errors.confirmPassword?.message}/>

            <Button type='submit'>Enviar</Button>
            <Link to='/'>Ja possuí uma conta? <span>Logar</span></Link>
        </Form> 
    )
}
export default SignUp