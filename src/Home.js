import './App.css';
import React, {useState, useEffect, useRef} from "react";
import DateTime from "./DateTime";
import QRCode from "./assets/qrcode.jpeg";
import {Button, CardContent, Container, Grid, ImageList, styled, TextField} from "@mui/material";
import Marquee from "react-fast-marquee";
import axios from "axios";

import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_WEB_SOCKET);

function Home() {
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [errorData, setErrorData] = useState('');
    const [itemData, setItemData] = useState([]);
    const [mobile, setMobile] = useState('');
    const [showName, setShowName] = useState(null);
    const [submit, setSubmit] = useState(null);


    // Create a styled component for the ImageList to hide the scrollbar
    const StyledImageList1 = styled(ImageList)({
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '-ms-overflow-style': 'none', // for Internet Explorer and Edge
        'scrollbar-width': 'none', // for Firefox
    });

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        // Listen for 'update_names' event from the server
        socket.on('update_names', (data) => {
            console.log(data);
            setShowName(data.name);
        });

        // Clean up socket connection on unmount
        // return () => socket.disconnect();
    }, []);  // Empty dependency array ensures this effect runs only once

    const getData = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL + "getData")
            .then((data) => {
                setShowName(data.data.data[0].name)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
    }, [mobile, name, itemData, submit, showName, errorData])

    const mobileValue = (e, index) => {
        setErrorData('')
        setMobile(e.target.value);
    }

    const textValue = (e) => {
        setErrorData('')
        setName(e.target.value);
    }

    const onSubmit = () => {
        setShowName('')
        if (mobile === '' || name === '') {
            setErrorData('Missing');
            return;
        }
        let postObj = {}
        postObj.name = name;
        postObj.mobile = mobile;
        axios.post(process.env.REACT_APP_API_BASE_URL + "addData", postObj)
            .then((data) => {
                setShowName(name);
                setMobile('');
                setName('');
                setSubmit('');
            })
            .catch((err) => console.log(err))

    }
    return (
        <>
            <div className={"displayContentScreen"} style={{padding: '0 5%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '5%'}}>
                    <div>
                        <DateTime/>
                    </div>
                    <div>
                        <img
                            srcSet={QRCode}
                            src={QRCode}
                            alt={"img-1"}
                            loading="lazy"
                            style={{height: 120, objectFit: 'scale-down', borderRadius: "10px"}}
                        />
                    </div>
                </div>
                <Grid spacing={2} className={"gridHeader"}>
                    <Grid item xs={3}>
                        <div>

                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={"contentdiv"}>
                            <p className={"descLine1"}>Welcome, <b>{showName !== null ? showName : 'Nagamani'}</b></p>
                            <p className={"descLine2"}>We're glad you're here.</p>
                            <p className={"descLine3"}>Please wait a moment. Your stylist, <b>Nikhil</b>, will be with
                                you
                            </p>
                        </div>
                        <div className="progress-container">
                            <progress className="progress-bar" value={40} max="100"></progress>
                        </div>
                        <div style={{margin: "3% auto 0 auto", width: "50%"}}>
                            <Marquee className={"marqueeTag"} autoFill={true} speed={100}>
                                <p>NEW PRODUCTS FOR SALE!</p>
                                <p><b>20%</b> OFF ON PRODUCTS</p>
                                <p><b>50%</b> OFF ON PRODUCTS</p>
                            </Marquee>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>

                        </div>
                    </Grid>
                </Grid>
            </div>
            <Container className={"displayContentMob"} maxWidth={"lg"}>
                <CardContent sx={{mt: '3rem'}} className={"cardAdd"}>
                    <TextField id="standard-basic" label="Enter Your Name" variant="standard" value={name}
                               onChange={(e) => textValue(e)}/>
                    <TextField id="standard-basic" type={"number"} label="Enter Mobile No." variant="standard"
                               value={mobile}
                               onChange={(e) => mobileValue(e)}/>
                    {errorData === 'Missing' ? <div style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>
                        <p style={{color: "red"}}>Data Missing</p>
                    </div> : ''}
                    <div style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>
                        <Button variant="contained" onClick={() => onSubmit()}>Submit</Button>
                    </div>
                </CardContent>
            </Container>
        </>
    )
}

export default Home;