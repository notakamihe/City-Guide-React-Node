import React, {useState, useEffect} from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import {getImageUrl} from '../utils'

export default function PlaceComponent(props) {
    const [place, setPlace] = useState({})

    useEffect(() => {
        axios.get(axios.defaults.baseURL + `api/places/${props.id}`).then(res => {
            setPlace(res.data)
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setPlace(null)
                    break
            }
        })
    }, [])

    return (
        <div style={{margin: "auto 160px"}}>
            {
                place != null ?

                <div className="d-flex" style={{margin: '64px auto'}}>
                    <div style={{flex: 5, flexWrap: 'wrap'}}>
                        <h1>{place.name}</h1>
                        <h4 className="text-muted">{place.location}</h4>
                        <div className="d-flex">
                            <div style={{marginTop: -4}}>
                                <StarRatings
                                    rating={place.averageRating}
                                    starRatedColor="#f50057"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="3px"
                                    
                                />
                            </div>
                            <span className="mx-3">&#183;</span>
                            <p>{place.averageRating} stars</p>
                        </div>
                        <p>{place.description}</p>
                        <img src={getImageUrl(place)} style={{width: "100%"}} />
                        <div className="mt-5">
                            <div className="d-flex mb-2" style={{width: 200}}>
                                <p 
                                    style={{
                                        flex: 0.3, 
                                        fontSize: 14, 
                                        fontWeight: 'bold'
                                    }} 
                                    className="m-0 text-muted"
                                >
                                    Day
                                </p> 
                                <p 
                                    style={{flex: 0.35, fontSize: 14, textAlign: 'center'}} 
                                    className="m-0 text-muted">
                                    Start
                                </p> 
                                <p 
                                    style={{flex: 0.35, fontSize: 14, textAlign: 'center'}} 
                                    className="m-0 text-muted"
                                >
                                    End
                                </p> 
                            </div>
                            {
                                Object.keys(place.hoursOpen || {}).map(d => (
                                    <div>
                                        <div className="d-flex" style={{width: 200}}>
                                            <p 
                                                style={{
                                                    flex: 0.3, 
                                                    fontSize: 14, 
                                                    fontWeight: 'bold'
                                                }} 
                                                className="m-0 text-muted"
                                            >
                                                {d.charAt(0).toUpperCase() + d.substr(1).toLowerCase()}
                                            </p> 
                                            <p 
                                                style={{flex: 0.35, fontSize: 14, textAlign: 'center'}} 
                                                className="m-0 text-muted">
                                                {d ? place.hoursOpen[d]["startTime"] : null}
                                            </p> 
                                            <p 
                                                style={{flex: 0.35, fontSize: 14, textAlign: 'center'}} 
                                                className="m-0 text-muted"
                                            >
                                                {d ? place.hoursOpen[d]["endTime"] : null}
                                            </p> 
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{flex: 2}}>
                        
                    </div>
                </div> 
                : 
                <p style={{textAlign: 'center', marginTop: 300}}>Tag not found.</p>
            }
        </div>
    )
}
