import Axios from 'axios'
import React, {useState, useContext} from 'react'

import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import ErrorMessage from '../../util/domain'

import './AuthForm.scss'

function Register(){
    const [formEmail, setFormEmail] = useState('')
    const [formPassword, setFormPassword] = useState('')
    const [formPasswordVerify, setFormPasswordVerify] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser} = useContext(UserContext)

    const navigate = useNavigate()

    async function register(e){
        e.preventDafault()

        const registerData = {
            email: formEmail,
            password: formPassword,
            passwordVerify: formPasswordVerify
        }

        try{
            await Axios.post(`${domain}/auth`, registerData)
        }catch(err){
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage)
                }
            }
            return
        }

        await getUser()
        navigate('/')
    }


    return (
        <div className="auth-form">
            <h2>Register a new account</h2>
            <h2>Register a new account</h2>
            <h2>Register a new account</h2>
            <h2>Register a new account</h2>
        </div>
    )
}

export default Register