import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/Server";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import MainInterfaceChannels from "./MainInterfaceChannels";
import Scroll from "./Scroll";

interface serverChannelProps {
    data: Server[]
}
interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}
interface sendMessageData {
    type: string;
    message: string;
    [key: string]: any;
}
const MainInterface = (props: serverChannelProps) => {
    const { data } = props;
    const server_name = data[0] ? data[0].name : 'server'
    const { server_id, channel_id } = useParams()
    const socketUrl = server_id ? `ws://127.0.0.1:8000/ws/chat/${server_id}/${channel_id}/` : null
    const [fetchUrl, setFetchUrl] = useState(`webchat/?serverId=${server_id}_0`)
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [inputValue, setInputValue] = useState('')
    const { fetchData } = useCrud<Server>([], fetchUrl)
    const theme = useTheme()
    useEffect(() => {
        if (channel_id) {
            setFetchUrl(`webchat/?serverId=${server_id}_${channel_id}`)
        } else {
            setFetchUrl(`webchat/?serverId=${server_id}_0`)
        }
    }, [server_id, channel_id])


    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: async () => {
            try {
                const data = await fetchData()
                setNewMessage([])
                setNewMessage(Array.isArray(data) ? data : [])
            } catch (error) {
                console.log(error)
            }
        },
        onClose: () => {
            console.log("disconnected")
        },
        onError: () => {
            console.log("error")
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data);
            console.log(data)
            setNewMessage((prev_message) => [...prev_message, data.new_message])
            setMessage("")
        }
    })

    // const sendHello = () =>{
    //     const message = {text:"Hello"}
    //     sendJsonMessage(message
    // }

    const sendInputValue = () => {
        const message = { text: inputValue }
        sendJsonMessage(message)
        setInputValue('')
    }
    // return (<div>
    //     {/* <button onClick={sendHello}>Hello</button>
    //     <div>r:{message}</div> */}
    //     {/* <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    //     <button onClick={sendInputValue}>hello</button>
    //     <div>r:{message}</div> */}
    //     {/* {newMessage.map((index:Message , msg:number) => {
    //         return (<div key={msg}>
    //             <p>{index.sender}</p>
    //             <p>{index.content}</p>
    //             </div>)
    //     })}
    //     <form><label>Enter Message:        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} gg96 c543/>
    //     </label></form>
    //     <button onClick={() => {sendJsonMessage({type:'message',message})}}>send</button> */}

    // </div>)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendJsonMessage({ type: 'message', message } as sendMessageData);
    }

    const keySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendJsonMessage({ type: 'message', message } as sendMessageData);
        }
    }
    function formatTimeStamp(timestamp:string) {
        const date = new Date(Date.parse(timestamp));
        const dateFormat = `${date.getMonth()+1} / ${date.getDate()} / ${date.getFullYear()}`
        const formatTime = date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true})
        return dateFormat + ' ' + formatTime
    }
    return (
        <>
            <MainInterfaceChannels data={data} />
            {!channel_id ? (<Box sx={{ overflow: 'hidden', p: { xs: 0 }, height: 'calc(80vh)', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} letterSpacing={'-0.5px'} sx={{ px: 5, maxWidth: "600px" }}>
                        Welcome to {server_name}
                    </Typography>
                    <Typography>
                        {data[0] ? data[0].description : "This is my home page"}
                    </Typography>
                </Box>
            </Box>) : (
                <>
                    <Box sx={{ overflow: 'hidden', p: 0, height: 'calc(100vh - 100px)' }}>
                        <Scroll>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {newMessage.map((index: Message, msg: number) => {
                                    return (
                                        <ListItem key={msg} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="user-image" />
                                            </ListItemAvatar>
                                            <ListItemText primaryTypographyProps={{ fontSize: '12px', variant: 'body2' }} primary={<>
                                                <Typography component='span' variant="body1" color='text.primary' sx={{ display: "inline", fontWeight: 600 }}>{index.sender}</Typography>
                                                <Typography component='span' variant="caption" color='textSecondry'>{'              '} {formatTimeStamp(index.timestamp)}</Typography>
                                                </>
                                            }
                                                secondary={<><Typography variant="body1" style={{ overflow: 'visiblle', whiteSpace: 'normal', textOverflow: 'clip' }} sx={{ display: 'inline', lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.2px" }} component='span' color='text.primary'>
                                                    {index.content}
                                                </Typography></>} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Scroll>
                    </Box>
                    <Box sx={{ position: 'sticky', bottom: 0, width: '100%' }}>
                        <form onSubmit={handleSubmit} style={{ bottom: 0, right: 0, padding: "1rem", backgroundColor: theme.palette.background.default, zIndex: 1 }}>
                            <Box sx={{ display: "flex" }}>
                                <TextField fullWidth multiline value={message} onChange={(e) => setMessage(e.target.value)} minRows={1} maxRows={4} sx={{ flexGrow: 1 }} onKeyDown={keySubmit} />
                            </Box>
                        </form>
                    </Box>
                </>
                // <div>
                //     {newMessage.map((index: Message, msg: number) => {
                //         return (<div key={msg}>
                //             <p>{index.sender}</p>
                //             <p>{index.content}</p>
                //         </div>)
                //     })}
                //     <form><label>Enter Message:        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} gg96 c543 />
                //     </label></form>
                //     <button onClick={() => { sendJsonMessage({ type: 'message', message }) }}>send</button>

                // </div>
            )
            }
        </>
    )
}
export default MainInterface