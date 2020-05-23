// @flow

import React, { Component } from 'react'
import { Map, ImageOverlay, Marker, LayersControl } from 'react-leaflet'
import { connect } from "react-redux";
import { addLocations } from "../../shared/actions/index";
import 'leaflet/dist/leaflet.css';
import Api from "../../helpers/api";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
        Api.fetchInternal('/campaignmap/' + this.props.campaignId)
            .then(res => {
                this.setState({
                    map: res[0]
                }, () => {
                    if (this.state.map) {
                        Api.fetchInternal('/campaignmap/' + this.state.map._id)
                            .then(res => {
                                this.setState({ locations: res })
                            })
                    }
                })
            })
    }

    render() {
        const position = this.state.map && [this.state.map.mapStats.coordinates.lat, this.state.map.mapStats.coordinates.lng]
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
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Paper variant="outlined" style={{ height: "100vh", padding: "1rem" }}>
                            {this.state.map &&
                                <Map center={position}
                                    zoom={this.state.map.mapStats.zoom.zoom}
                                    minZoom={this.state.map.mapStats.zoom.minZoom}
                                    maxZoom={this.state.map.mapStats.zoom.maxZoom}
                                    style={{ height: '95vh', width: '100%', backgroundColor: "#cbc1ac" }}
                                    maxBounds={this.state.map.mapStats.bounds}>
                                    <ImageOverlay
                                        bounds={[[0, 0], [3000, 100]]}
                                        url={this.state.map.flavor.layers[0].url}
                                    />
                                    <LayersControl position="topright">
                                        {this.state.map.flavor.layers && this.state.map.flavor.layers.map(layer => (
                                            <LayersControl.BaseLayer name={layer.name} checked>
                                                <ImageOverlay
                                                    bounds={this.state.map.mapStats.bounds}
                                                    url={layer.url}
                                                />
                                            </LayersControl.BaseLayer>
                                        ))

                                        }
                                        {/* <LayersControl.BaseLayer name="Background Only" checked>
                                            <ImageOverlay
                                                bounds={location.mapStats.bounds}
                                                url={"https://svgshare.com/i/KYu.svg"}
                                            />
                                        </LayersControl.BaseLayer>
                                        {location.flavor.labels &&
                                            <LayersControl.BaseLayer name="Labels" checked>
                                                <ImageOverlay
                                                    bounds={location.mapStats.bounds}
                                                    url={location.flavor.labels}
                                                />
                                            </LayersControl.BaseLayer>
                                        } */}
                                    </LayersControl>
                                    {this.state.locations && this.state.locations.map((location, index) => (
                                        <Marker icon={myIcon}
                                            position={[location.mapStats.coordinates.lat, location.mapStats.coordinates.lng]}
                                            onClick={() => this.props.history.push("/location/" + location._id)}>
                                        </Marker>
                                    ))}
                                </Map>}
                        </Paper>
                    </Grid>
                    <Grid xs={4}>
                        <Paper variant="outlined" style={{ height: "100vh", padding: "1rem", margin: 10 }}>
                            <TreeView
                                defaultExpanded={["0"]}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
                                {this.state.map &&
                                    <TreeItem nodeId="0" label={this.state.map.name}>
                                        {this.state.locations && this.state.locations.map((location, index) => (
                                            <TreeItem nodeId={(index + 1).toString()} label={location.name} />
                                        ))}
                                    </TreeItem>
                                }
                            </TreeView>
                        </Paper>
                    </Grid>
                </Grid>
            </Slide>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);