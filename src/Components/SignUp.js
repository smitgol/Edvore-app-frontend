import React from "react";
import Form from "./Form";
import axios from "axios"
import { baseUrl } from "../config";
import Link from 'next/link';


const SignUp = () => {
    const handleSubmit = async(username, password) => {
        const response = await axios.post(baseUrl + 'signup', {username: username, hashed_password:password}, {
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        if (response.data) {
            alert("Signup successfully now try to login.")
        }
        else {
            alert("Not able to login")
        }
    }

    return <React.Fragment>
        <Form title={'Register'} onSubmit={handleSubmit}>
        <Link href="/"><a>login here</a></Link>
        </Form>
    </React.Fragment>
}

export default SignUp