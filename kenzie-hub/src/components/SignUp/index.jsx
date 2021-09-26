import { Button,  TextField, Select, MenuItem  } from "@mui/material"

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
    const [ moduleCourse, setModuleCourse ] = useState()
    const formScheme = yup.object().shape({
        name: yup.string().required("Nome obrigatório").min(4, 'Seu nome precisa ter no minimo 3 letras').matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, 'Seu nome só pode ter letras'),
        email: yup.string().required("Email obrigatório").required("Email Obrigatório").email(),
        confirmEmail: yup.string().required("Confirmação de email obrigatória").oneOf([yup.ref('email')], 'Os emails não são idênticos'),
        contact: yup.string().required("Contato obrigatório"),
        bio: yup.string().required("Bio obrigatória"),
        course_module:yup.string().required("Módulo obrigatório"),
        password: yup.string().required("Senha obrigatória").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/, 'Sua senha precisa conter: no mínimo 8 caracteres. 1 letra maiúscula no mínimo. 1 Número. 1 símbolo &@#*$.'),
        confirmPassword: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref('password')], 'As senhas não são iguais')
    })
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(formScheme)
    })
    const onSubmit = (data) => {
        const toApi = {email:data.email, password:data.password, name:data.name, bio:data.bio, contact:data.contact, course_module:moduleCourse}
        console.log(toApi)
        console.log(data)
        setAuthenticated(true)
        history.push()
        axios.post("https://kenziehub.herokuapp.com/users", toApi).then((response)=>{
            setAuthenticated(true)
            history.push('/')
        }).catch((err)=>console.log(err))
    }
    console.log(errors)
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <h1>Cadastre-se</h1>
            <TextField sx={{m:2, color:"white"}} className='fields' label="Nome" variant="outlined" {...register("name")} helperText={errors.name?.message}/>

            <TextField sx={{m:2, color:"white"}} className='fields'label="Email" variant="filled"  {...register("email")} helperText={errors.email?.message}/>

            <TextField sx={{m:2, color:"white"}} className='fields'label="Confirmar email" variant="filled" {...register('confirmEmail')} helperText={errors.confirmEmail?.message}/>

            <TextField sx={{m:2, color:"white"}}className='fields' label='Digite seu numero de telefone-celular' {...register('contact')} helperText={errors.contact?.message}/>

            <TextField sx={{m:2, color:"white"}}placeholder='Escreva sua bio' {...register('bio')} helperText={errors.bio?.message} multiline rows={3} rowsMax={10}/>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='course_module'
                value={moduleCourse}
                {...register('course_module')}
                label="Age"
                 onChange={(e)=> setModuleCourse(e.target.value)}
                 helperText={errors.course_module?.message}
                 sx={{width:"55%"}}
            >
                <MenuItem value="Primeiro módulo (Introdução ao Frontend)">Primeiro módulo (Introdução ao Frontend)</MenuItem>
                <MenuItem value="Segundo módulo (Frontend Avançado)">Segundo módulo (Frontend Avançado)</MenuItem>
                <MenuItem value="Terceiro módulo (Introdução ao Backend)">Terceiro módulo (Introdução ao Backend)</MenuItem>
                <MenuItem value="Quarto módulo (Backend Avançado)">Quarto módulo (Backend Avançado)</MenuItem>
                
            </Select>

            <TextField sx={{m:2, color:"white"}}className='fields' label='Senha' {...register('password')} helperText={errors.password?.message} />

            <TextField sx={{m:2, color:"white"}}className='fields' label='Confirmar senha' {...register('confirmPassword')} helperText={errors.confirmPassword?.message}/>

            <Button type='submit'>Enviar</Button>
            <Link to='/'>Ja possuí uma conta? <span>Logar</span></Link>
        </Form> 
    )
}
export default SignUp