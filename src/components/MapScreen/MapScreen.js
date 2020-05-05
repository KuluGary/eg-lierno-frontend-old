// @flow

import React, { Component } from 'react'
import { Map, ImageOverlay, Marker } from 'react-leaflet'
import { connect } from "react-redux";
import { addLocations } from "../../shared/actions/index";
import 'leaflet/dist/leaflet.css';
import Api from "../../helpers/api";
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => {
    return { locations: state.locations }
}

const mapDispatchToProps = dispatch => {
    return { addLocations: locations => dispatch(addLocations(locations)) };
}

class MapScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: 60.505,
            lng: 46.155,
            zoom: 5,
            minZoom: 5,
            maxZoom: 12,
            bounds: [[0, 0], [3000, 100]]
        }
    }


    componentDidMount() {
        if (!this.props.locations) {
            Api.fetchInternal('/locations')
                .then(res => {
                    this.setState({ locations: res });
                    this.props.addLocations(res);
                })
        } else {
            this.setState({ locations: this.props.locations })
        }
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
                            style={{ height: '100vh', width: '100%', backgroundColor: "#cbc1ac" }}
                            maxBounds={this.state.bounds}>
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


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);