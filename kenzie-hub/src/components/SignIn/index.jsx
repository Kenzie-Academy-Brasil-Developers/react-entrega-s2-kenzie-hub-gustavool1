import { Button, TextareaAutosize, TextField } from "@mui/material"
import Form from "../../StyledComponents/Form/style"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import './style.css'
import { useState } from "react"
import axios from "axios"
import * as yup from 'yup'
const SignIn = () =>{
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
        const toApi = {email:data.email, password:data.password, name:data.name, bio:data.bio, contact:data.contact, course_module:data.course_module}
        console.log(toApi)
        console.log(data)
        axios.post("https://kenziehub.herokuapp.com/users", toApi).then((response)=>console.log('boa')).catch((err)=>console.log(err))
    }
    console.log(errors)
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <TextField  className='fields' label="Nome" variant="outlined" {...register("name")} helperText={errors.name?.message}/>
            <TextField  className='fields'label="Email" variant="filled"  {...register("email")} helperText={errors.email?.message}/>
            <TextField  className='fields'label="Confirmar email" variant="filled" {...register('confirmEmail')} helperText={errors.confirmEmail?.message}/>
            <TextField className='fields' label='Digite seu numero de telefone-celular' {...register('contact')} helperText={errors.contact?.message}/>
            <textarea placeholder='Escreva sua bio' {...register('bio')} helperText={errors.bio?.message}/>
            <TextField className='fields' label='Módulo do curso'{...register('course_module')} helperText={errors.course_module?.message}/>
            <TextField className='fields' label='Senha' {...register('password')} helperText={errors.password?.message}/>
            <TextField className='fields' label='Confirmar senha' {...register('confirmPassword')} helperText={errors.confirmPassword?.message}/>
            <Button type='submit'>Enviar</Button>
        </Form> 
    )
}
export default SignIn