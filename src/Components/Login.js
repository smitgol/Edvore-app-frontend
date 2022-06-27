import React from "react";
import Form from "./Form";
import axios from "axios"
import { baseUrl } from "../config";
import {Token} from "../Context/context"
import { useContext } from "react";
import Link from 'next/link'
import Router from 'next/router'

const Login = () => {
    const {token, setToken} = useContext(Token)
    const handleSubmit = async(username, password) => {
        const response = await axios.post(baseUrl + 'token', `username=${username}&password=${password}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        })
        if (response.data.access_token) {
            setToken(response.data.access_token)
            console.log(token)
            Router.push("/chat")
        }
        else {
            alert("Not able to login")
        }
    }

    return <React.Fragment>
        <Form title={'login'} onSubmit={handleSubmit} >
        <Link href="/signup"><a>SignUp Here</a></Link>
        </Form>
    </React.Fragment>
}

export default Login