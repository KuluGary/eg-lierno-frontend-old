import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Api from '../../helpers/api'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { Map, ImageOverlay, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    profileBox: {
        padding: "1rem",
        height: "100%"
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        color: 'inherit',
        display: "flex"
    },
    divider: {
        maxWidth: "50%",
        margin: "1rem auto"
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    bold: {
        // fontWeight: 600
    },
    image: {
        maxHeight: "50vh",
        maxWidth: "100%",
        display: "block",
        margin: "0 auto"
    }
}));

const mapStateToProps = state => {
    return { locations: state.locations }
}

function Location(props) {
    const classes = useStyles();
    const [location, setLocation] = useState();
    const information = ["Localización", "Tipo", "Población", "Líderes", "Religión", "Fuerzas militares", "Descripción"]

    useEffect(() => {
        if (!props.locations) {
            Api.fetchInternal('/location/' + props.match.params.id)
                .then(res => setLocation(res));
        } else {
            const selectedLocation = props.locations.filter(location => location._id === props.match.params.id)[0];
            selectedLocation && setLocation(selectedLocation)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {location &&
                    <Grid container spacing={1} style={{ alignItems: "stretch" }}>
                        {location.flavor.layers && <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Map center={location.mapStats.center}
                                    bounds={location.mapStats.bounds}
                                    zoom={location.mapStats.zoom}
                                    minZoom={location.mapStats.zoom.minZoom}
                                    maxZoom={location.mapStats.zoom.maxZoom}
                                    style={{ height: '100vh', width: '100%', backgroundColor: "#ccc5a3" }}
                                >

                                    <LayersControl position="topright">
                                        {location.flavor.layers && location.flavor.layers.map(layer => (
                                            <LayersControl.BaseLayer name={layer.name} checked>
                                                <ImageOverlay
                                                    bounds={location.mapStats.bounds}
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

                                </Map>
                            </Paper>
                        </Grid>}
                        <Grid item xs={12} sm={12} md={location.flavor.layers ? 6 : 8} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Typography variant={'h6'}>{location.name}</Typography>
                                {location.flavor.subtitle &&
                                    <Typography variant="subtitle1">
                                        {location.flavor.subtitle}
                                    </Typography>}
                                <img className={classes.image} src={location.flavor.banner} />
                                {Object.keys(location.flavor.information).map((key, index) => (
                                    Array.isArray(location.flavor.information[key]) ?
                                        location.flavor.information[key].map(item => (
                                            <Box component="p">
                                                {item}
                                            </Box>
                                        ))
                                        :
                                        <Box component="div">
                                            {information[index] + ": " + location.flavor.information[key]}
                                        </Box>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        </Slide>
    )
}

export default connect(mapStateToProps)(Location);