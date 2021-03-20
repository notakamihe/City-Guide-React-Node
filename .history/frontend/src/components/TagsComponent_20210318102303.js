import React, {useState, useEffect} from 'react'
import { IconButton, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FaMapMarker } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from 'axios';


export default function TagsComponent() {
    const [tags, setTags] = useState([])

    useEffect(() => {
        loadTags()
    }, [])

    const loadTags = () => {
        axios.get(axios.defaults.baseURL + 'api/tags').then(res => {
            setTags(res.data)
        })
    }

    console.log(tags);

    return (
        <div className="my-5">
            <h1 
                style={{
                    textAlign: 'center', 
                    fontSize: 48, 
                    letterSpacing: 8, 
                    fontFamily: 'sans-serif', 
                    fontWeight: 'bold'
                }} 
                className="my-5"
            >
                TAGS
            </h1>
            <div className="mx-auto mb-5" style={{textAlign: 'center'}}>
                <TextField 
                    variant="outlined" 
                    type="search" 
                    className="col-5" 
                    color="secondary"
                    placeholder="Search tags"
                />
            </div>
            <div style={{justifyContent: 'center'}} className="mx-auto d-flex my-5">
                <div>
                    <InputLabel id="sort-label"></InputLabel>
                    <Select
                        value={""}
                        labelId="sort-label"
                        variant="outlined"
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>Sort</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="popular">Popular</MenuItem>
                        <MenuItem value="alpha">Alphabetical</MenuItem>
                        <MenuItem value="reverse-alpha">Reverse-alphabetical</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="d-flex px-5" style={{justifyContent: 'center', flexWrap: 'wrap'}}>
                {
                    tags.map(t => (
                        <div style={{width: 250}} className="mx-3 mb-5">
                        <p 
                            style={{
                                border: "1px solid #f50057", 
                                borderBottom: "none",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                width: "100%"
                            }} 
                            className="p-3 m-0"
                        >
                            {t.name}
                        </p>
                        <div 
                            style={{
                                backgroundColor: "black", 
                                width: "100%", 
                                height: 150,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                            }}
                        >

                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}
