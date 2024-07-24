import './App.css';
import {
    Button,
    CardContent,
    Container,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    styled,
    TextField
} from "@mui/material";
import Asset1 from './assets/asset1.gif'
import Asset2 from './assets/asset2.gif'
import Asset3 from './assets/asset3.gif'
import Asset4 from './assets/asset4.gif'
import QRCode from './assets/qrcode.jpeg'
import React, { useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [errorData, setErrorData] = useState('');
    const [itemData, setItemData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
    },[])

    const getData = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL + "getData")
             .then((data) => {
                console.log(data.data);
                setItemData(data.data.data)
             })
             .catch((err) => console.log(err))
    }

    useEffect(() => {
        console.log(itemData);
        console.log(img);
        console.log(name);
    }, [img, name, itemData])

    const imageClicked = (e,index) => {
        setErrorData('')
        setImg(e.target.currentSrc);
        setSelectedItem(index)
    }

    const textValue = (e) => {
        setErrorData('')
        console.log(e.target.value);
        setName(e.target.value);
        console.log(name);
    }

    const onSubmit = () => {
        if (img === '' || name === '') return setErrorData('Missing');
        let postObj = {}
        postObj.name = name;
        postObj.img = img;
        axios.post(process.env.REACT_APP_API_BASE_URL + "addData", postObj)
            .then((data) => {
                data = {
                    gif : img,
                    name: name
                }
               setItemData([...itemData, data])
                setImg('');
                setName('');
                setSelectedItem(null);
            })
            .catch((err) => console.log(err))

    }
    // Create a styled component for the ImageList to hide the scrollbar
    const StyledImageList = styled(ImageList)({
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '-ms-overflow-style': 'none', // for Internet Explorer and Edge
        'scrollbar-width': 'none', // for Firefox
    });
    return (
        <div className="App">
            <Container className={"displayContentScreen"} maxWidth={"lg"}>
                <StyledImageList sx={{width: '100%', height: 'auto', overflow: 'hidden'}} cols={4} rowHeight={180}>
                    {itemData.slice(-11).map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                srcSet={`${item.gif}`}
                                src={`${item.gif}`}
                                alt={item.name}
                                loading="lazy"
                                style={{height: 100, objectFit: 'scale-down'}}
                            />
                            <ImageListItemBar
                                title={item.name}
                                position="below"
                                style={{color: '#fff'}}
                            />
                        </ImageListItem>
                    ))
                    }
                    <ImageListItem>
                        <img
                            srcSet={QRCode}
                            src={QRCode}
                            alt={"img-1"}
                            loading="lazy"
                            style={{height: 100, objectFit: 'scale-down'}}
                        />
                        <ImageListItemBar
                            title={"Scan QR"}
                            position="below"
                            style={{color: '#fff'}}
                        />
                    </ImageListItem>
                </StyledImageList>
            </Container>
            <Container className={"displayContentMob"} maxWidth={"lg"}>
                <CardContent sx={{mt: '3rem'}} className={"cardAdd"}>
                    <h5 style={{color: '#fff', textAlign: 'center'}}>Select one:</h5>
                    <StyledImageList1 sx={{width: '100%', height: 'auto', overflow: 'visible'}} cols={4} rowHeight={110}>
                        {itemData1.slice(-11).map((item, index) => (
                            <ImageListItem key={item.img}>
                                <img
                                    srcSet={`${item.img}`}
                                    src={`${item.img}`}
                                    alt={item.title}
                                    loading="lazy"
                                    className={`imageClass ${selectedItem === index ? "active" : ''}`}
                                    style={{height: 100, objectFit: 'scale-down'}}
                                    onClick={(e) => imageClicked(e, index)}
                                />
                            </ImageListItem>
                        ))}
                    </StyledImageList1>
                    <TextField id="standard-basic" label="Enter Your Name" variant="standard" value={name}
                               onChange={(e) => textValue(e)}/>
                    {errorData === 'Missing' ? <div style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>
                        <p style={{color: "red"}}>Data Missing</p>
                    </div> : ''}
                    <div style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>
                        <Button variant="contained" onClick={() => onSubmit()}>Submit</Button>
                    </div>
                </CardContent>
            </Container>
        </div>
    );
}

// const itemData = [
//     {
//         id: 1,
//         img: Asset1,
//         title: 'Breakfast',
//         author: '@bkristastucchio',
//     },
//     {
//         id: 2,
//         img: Asset2,
//         title: 'Burger',
//         author: '@rollelflex_graphy726',
//     },
//     {
//         id: 3,
//         img: Asset3,
//         title: 'Camera',
//         author: '@helloimnik',
//     },
//     {
//         id: 4,
//         img: Asset2,
//         title: 'Coffee',
//         author: '@nolanissac',
//     },
//     {
//         id: 5,
//         img: Asset4,
//         title: 'Hats',
//         author: '@hjrc33',
//     },
//     {
//         id: 6,
//         img: Asset3,
//         title: 'Honey',
//         author: '@arwinneil',
//     },
//     {
//         id: 7,
//         img: Asset1,
//         title: 'Basketball',
//         author: '@tjdragotta',
//     },
//     {
//         id: 8,
//         img: Asset4,
//         title: 'Fern',
//         author: '@katie_wasserman',
//     },
//     {
//         id: 9,
//         img: Asset2,
//         title: 'Mushrooms',
//         author: '@silverdalex',
//     },
//     {
//         id: 10,
//         img: Asset1,
//         title: 'Tomato basil',
//         author: '@shelleypauls',
//     },
//     {
//         id: 11,
//         img: Asset3,
//         title: 'Sea star',
//         author: '@peterlaster',
//     },
//     {
//         id: 12,
//         img: Asset4,
//         title: 'Bike',
//         author: '@southside_customs',
//     },
//     {
//         id: 13,
//         img: Asset1,
//         title: 'Tomato basil',
//         author: '@shelleypauls',
//     },
//     {
//         id: 14,
//         img: Asset3,
//         title: 'Sea star',
//         author: '@peterlaster',
//     },
//     {
//         id: 15,
//         img: Asset4,
//         title: 'Bike',
//         author: '@southside_customs',
//     },
// ];

const itemData1 = [
  {
    id: 1,
    img: Asset1
  },
  {
    id: 2,
    img: Asset2
  },
  {
    id: 3,
    img: Asset3
  },
  {
    id: 4,
    img: Asset4
  }
];

export default App;
