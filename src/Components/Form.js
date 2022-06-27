import React, {useState} from 'react'
import {Box, Typography, TextField, Button  } from '@mui/material'

const Form = ({title, onSubmit, children})=> {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "64px"}}>
            <Typography variant="h5">{title}</Typography>
            <TextField label="Username" variant="outlined" onChange={(evt)=> {setUsername(evt.target.value)}} value={username} />
            <TextField label="Password" variant="outlined" type="password" onChange={(evt)=> {setPassword(evt.target.value)}} value={password} />
            <Button variant='contained' onClick={() => {onSubmit(username, password)}} >Submit</Button>
            {children}
        </Box>
    </React.Fragment>
}

export default Form;