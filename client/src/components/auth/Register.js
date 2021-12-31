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
    const [formUsername, setFormUsername] = useState('')

    const [formPassword, setFormPassword] = useState('')
    const [formPasswordVerify, setFormPasswordVerify] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser} = useContext(UserContext)

    const navigate = useNavigate()

    async function register(e){
        e.preventDefault()

        const registerData = {
            email: formEmail,
            username: formUsername,
            password: formPassword,
            passwordVerify: formPasswordVerify
        }

        try{
            await Axios.post(`${domain}/auth/register`, registerData)
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
            {
                errorMessage && (
                    <ErrorMessage
                        message={errorMessage}
                        clear={() => setErrorMessage(null)}
                    />
                )
            }

            <form className='form' onSubmit={register}>
                <label htmlFor="form-email">Email</label>
                <input 
                    id='form-email'
                    type="email" 
                    value={formEmail}
                    onChange={(e)=> setFormEmail(e.target.value)}
                />

                <label htmlFor="form-username">Username</label>
                <input 
                    id='form-username'
                    type="text" 
                    value={formUsername}
                    onChange={(e)=> setFormUsername(e.target.value)}
                />

                <label htmlFor="form-password">Password</label>
                <input 
                    id='form-password'
                    type="password" 
                    value={formPassword}
                    onChange={(e)=> setFormPassword(e.target.value)}
                />

                <label htmlFor="form-passwordVerify">Verify Password</label>
                <input 
                    id='form-passwordVerify'
                    type="password" 
                    value={formPasswordVerify}
                    onChange={(e)=> setFormPasswordVerify(e.target.value)}
                />

                <button className='btn-submit' type='submit'>Register</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login instead</Link></p>
        </div>
    )
}

export default Register