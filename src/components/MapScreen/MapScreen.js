// @flow

import React, { Component } from 'react'
import { Map, ImageOverlay, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Api from "../../helpers/api";
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

export default class SimpleExample extends Component {
    state = {
        lat: 60.505,
        lng: 46.155,
        zoom: 5,
        minZoom: 5,
        maxZoom: 12,
        bounds: [[0, 0], [3000, 100]]
    }

    componentDidMount() {
        const url = Api.getKey('base_url') + '/locations';

        Api.fetchInternal('/locations')
            .then(res => this.setState({ locations: res }))
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        const L = require('leaflet');

        const myIcon = L.icon({
            iconUrl: 'assets/img/Untitled-1.svg',
            iconSize: [64, 64],
            iconAnchor: [32, 32],
            popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });
        return (
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Paper variant="outlined" style={{ height: "100vh", padding: "1rem" }}>
                    {this.state.locations &&
                        <Map center={position}
                            zoom={this.state.zoom}
                            minZoom={this.state.minZoom}
                            maxZoom={this.state.maxZoom}
                            style={{ height: '100%', width: '100%' }}
                            maxBounds={this.state.bounds}
                        >
                            <img src={process.env.PUBLIC_URL + "assets/img/Lierno Apr29 14-07.svg"} />
                            {/* <TileLayer
                                url='data:image/jpeg;base64,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' /> */}
                            <ImageOverlay
                                bounds={[[0, 0], [3000, 100]]}
                                url={process.env.PUBLIC_URL + "assets/img/Lierno Apr29 14-07.svg"}
                            />
                            {this.state.locations.map((location, index) => (
                                <Marker icon={myIcon}
                                    position={[location.mapStats.coordinates.lat, location.mapStats.coordinates.lng]}
                                    onClick={() => this.props.history.push("/location/" + location._id)}>
                                </Marker>
                            ))}
                        </Map>}
                </Paper>
            </Slide>
        )
    }
}
