import { Button, TextField, Box } from "@mui/material";
import React, { useContext, useEffect, useCallback, useState } from "react";
import {Token} from "../Context/context";
import axios from "axios"



const ChatComponent = () => {
    const {token} = useContext(Token)
    const [socket, setSocket] = useState(null);

    

    useEffect(()=> {
        const newSocket = new WebSocket(`ws://localhost:8000/ws/${token}`);
        setSocket(newSocket);
    }, [setSocket])

    const terminateSession = async() => {
        const response = await axios.post(baseUrl + 'token', `username=${username}&password=${password}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    
    return (<React.Fragment>
        {socket ? (
            <div>
                <MessageInput socket={socket} />
                <Messages socket={socket} />
            </div>
        ): <div>not connecting</div>}
        <Button variant="contained" onClick={()=> {terminateSession()}}>Terminate Other Session</Button>
    </React.Fragment>)
}

const Messages = ({socket}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.onmessage = (message) => {
            
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                newMessages.push(message.data);
                return newMessages;
              });
              
        }
        return () => {
            socket.offmessage = () => {
                console.log('off')
            }
        }
    }, [socket]);

    return (
    <ul>
        {messages.map((message)=> {
            return <li>{message}</li>
        })}
    </ul>)
}

const MessageInput = ({socket}) => {
    const [text, setText] = useState("")
    const sendMessage = () => {
        socket.send(text)
        setText("")
    }
    const onChangeText = useCallback(
        (e)=> {
            setText(e.target.value)
        },
        [text]
    )
    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "24px"}}>
        <TextField value={text} onChange={onChangeText}></TextField>
        <Button variant='contained' onClick={() => {sendMessage()}}>send</Button>
    </Box>
}
export default ChatComponent