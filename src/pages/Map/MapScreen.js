// @flow

import React, { useState, useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from "react-redux";
import L, { divIcon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker, useMapEvent, useMap, Rectangle, Polyline } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Collapse, Typography } from '@material-ui/core';
import Api from "helpers/api";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import { addLocations } from "shared/actions/index";

const mapStateToProps = state => {
    return { locations: state.locations }
}

const mapDispatchToProps = dispatch => {
    return { addLocations: locations => dispatch(addLocations(locations)) };
}

const useStyles = makeStyles((theme) => ({
    map: {
        "& .leaflet-div-icon": {
            background: "transparent",
            border: "none"
        },
        "& .lierno-map-tag": {
            "& .h1, & .h2, & .h3, & .h4": {
                transition: "0.25s all ease-in-out",
                minWidth: "200px"
            },
            "& .h1": {
                fontSize: "32px"
            },
            "& .h2": {
                fontSize: "30px"
            },
            "& .h3, & .h4": {
                fontSize: "26px"
            },
            fontStyle: "italic",
            fontFamily: "JSL Ancient,serif",
            "--stroke-color": "#cec1a2",
            "--stroke-width": "3px",
            "color": "black",
            "text-shadow": "calc(var(--stroke-width) * 1) calc(var(--stroke-width) * 0) 0 var(--stroke-color), calc(var(--stroke-width) * 0.9239) calc(var(--stroke-width) * 0.3827) 0 var(--stroke-color), calc(var(--stroke-width) * 0.7071) calc(var(--stroke-width) * 0.7071) 0  var(--stroke-color), calc(var(--stroke-width) * 0.3827) calc(var(--stroke-width) * 0.9239) 0 var(--stroke-color), calc(var(--stroke-width) * 0) calc(var(--stroke-width) * 1) 0 var(--stroke-color), calc(var(--stroke-width) * -0.3827) calc(var(--stroke-width) * 0.9239) 0 var(--stroke-color), calc(var(--stroke-width) * -0.7071) calc(var(--stroke-width) * 0.7071) 0 var(--stroke-color),  calc(var(--stroke-width) * -0.9239) calc(var(--stroke-width) * 0.3827) 0 var(--stroke-color), calc(var(--stroke-width) * -1) calc(var(--stroke-width) * 0) 0 var(--stroke-color), calc(var(--stroke-width) * -0.9239) calc(var(--stroke-width) * -0.3827) 0 var(--stroke-color), calc(var(--stroke-width) * -0.7071) calc(var(--stroke-width) * -0.7071) 0 var(--stroke-color), calc(var(--stroke-width) * -0.3827) calc(var(--stroke-width) * -0.9239) 0 var(--stroke-color), calc(var(--stroke-width) * 0) calc(var(--stroke-width) * -1) 0 var(--stroke-color), calc(var(--stroke-width) * 0.3827) calc(var(--stroke-width) * -0.9239) 0 var(--stroke-color), calc(var(--stroke-width) * 0.7071) calc(var(--stroke-width) * -0.7071) 0 var(--stroke-color), calc(var(--stroke-width) * 0.9239) calc(var(--stroke-width) * -0.3827) 0 var(--stroke-color);"
        },
        "& .lierno-map-tag:hover": {
            "--stroke-color": "white",
            "& .h1, & .h2, & .h3, & .h4": {
                minWidth: "250px"
            },
            "& .h1": {
                fontSize: "34px"
            },
            "& .h2": {
                fontSize: "32px"
            },
            "& .h3, & .h4": {
                fontSize: "28px"
            },
        },
        "& .no-visibility": {
            opacity: 0,
        },
        "& .no-display": {
            display: "none",
        },
    },
    navMap: {
        position: "absolute",
        top: 0,
        height: "6rem",
        width: "100%",
        zIndex: 1000,
        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 80%, rgba(0,212,255,0) 100%)"
    },
    sideNav: {
        height: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1000,
        transition: "0.25s all ease-in-out",
        textOverflow: "clip",
        overflow: "hidden"
    }
}));


function MapScreen({ campaignId }) {
    const classes = useStyles();
    const [locations, setLocation] = useState();
    const [parentLocation, setParentLocation] = useState();
    const [sideBarInfo, setSideBarInfo] = useState();

    useEffect(() => {
        Api.fetchInternal('/campaignmap/' + campaignId)
            .then(res => setLocation(res[0]));
    }, []);

    const retrieveLocations = (location) => {
        setLocation();
        Api.fetchInternal('/location/' + location)
            .then(res => {
                setLocation(res)
            })
    }

    const Locations = props => {
        return (
            <>
                {props.data.map(item => {
                    let image;

                    if (item.image || item.imageLocked) {
                        image = item.unlocked ? item.image : item.imageLocked;
                    }

                    return (
                        <div key={item.name}>
                            {image && item.bounds &&
                                <ImageOverlay
                                    url={image}
                                    bounds={item.bounds} />
                            }
                            {item.children?.length && <Locations data={item.children} />}
                        </div>
                    )
                })}
            </>
        )
    }

    const Labels = ({ data, map, setSideBarInfo }) => {
        return (
            <>
                {data.map((item) => {
                    const iconMarkup = renderToStaticMarkup(
                        <div className={"lierno-map-tag"} >
                            <div className={`${item.tag?.type} no-display no-visibility`}>
                                {item.name}
                            </div>
                        </div>);

                    const marker = divIcon({
                        html: iconMarkup,
                        className: "animated-marker"
                    });

                    return (
                        <div key={item.name}>
                            {item.unlocked && <>
                                {item.tag &&
                                    <Marker
                                        position={item.tag?.pos}
                                        icon={marker}
                                        eventHandlers={{
                                            click: () => {
                                                if (item.id) {
                                                    setParentLocation(locations._id);
                                                    retrieveLocations(item.id, map);
                                                }

                                                if (item.flavor) {
                                                    console.log(item.flavor, item.name)
                                                    setSideBarInfo({
                                                        name: item.name,
                                                        flavor: item.flavor
                                                    });
                                                }
                                            }
                                        }} />
                                }
                                {item.children?.length && <Labels data={item.children} setSideBarInfo={setSideBarInfo} />}
                            </>}
                        </div>
                    )
                })}
            </>
        )
    }

    const Routes = ({ data }) => {
        console.log(data);
        return (
            <>
                {data.map(item => {
                    const marker = new L.Icon({
                        iconUrl: item.marker,
                        iconSize: [13.50, 14.50]
                    });

                    return (
                        <>
                            <Marker
                                icon={marker}
                                position={item.linePoints[0]} />
                            <Marker
                                icon={marker}
                                position={item.linePoints[item.linePoints.length - 1]} />
                            <Polyline
                                color={'#2a2217'}
                                positions={item.linePoints}
                                dashArray={'10, 10'}
                                weight={4} />
                        </>
                    )
                })}
            </>
        )
    }

    const MapContent = () => {
        const [sideBarInfo, setSideBarInfo] = useState();
        const map = useMap();
        const zoomLength = [];
        const polyPoints = [];

        useEffect(() => controlLabelZoom(), []);

        useEffect(() => controlLabelZoom(), [sideBarInfo]);

        const getZoomLength = () => {
            for (let index = locations.minZoom; index <= locations.maxZoom; index++) {
                zoomLength.push(index);
            }
        }

        const controlLabelZoom = () => {
            const zoomLevel = map.getZoom();
            if (zoomLength.length <= 0) {
                getZoomLength();
            }

            if (zoomLevel === zoomLength[0]) {
                const elementsToHide = document.querySelectorAll(".h2, .h3, .h4");
                elementsToHide.forEach(element => {
                    element.classList.add("no-visibility");
                    setTimeout(() => element.classList.add("no-display"), 250)
                });

                const elementsToShow = document.querySelectorAll(".h1");
                elementsToShow.forEach(element => {
                    element.classList.remove("no-display")
                    setTimeout(() => element.classList.remove("no-visibility"), 250)
                });
            };

            if (zoomLevel === zoomLength[1]) {
                const elementsToHide = document.querySelectorAll(".h4, .h1, .h3");
                elementsToHide.forEach(element => {
                    element.classList.add("no-visibility");
                    setTimeout(() => element.classList.add("no-display"), 250)
                });

                const elementsToShow = document.querySelectorAll(".h2");
                elementsToShow.forEach(element => {
                    element.classList.remove("no-display");
                    setTimeout(() => element.classList.remove("no-visibility"), 250)
                });
            }

            if (zoomLevel === zoomLength[2]) {
                const elementsToHide = document.querySelectorAll(".h4, .h2, .h1");
                elementsToHide.forEach(element => {
                    element.classList.add("no-visibility");
                    setTimeout(() => element.classList.add("no-display"), 250)
                });

                const elementsToShow = document.querySelectorAll(".h3");
                elementsToShow.forEach(element => {
                    element.classList.remove("no-display");
                    setTimeout(() => element.classList.remove("no-visibility"), 250)
                });
            }

            if (zoomLevel === zoomLength[3]) {
                const elementsToHide = document.querySelectorAll(".h3, .h2, .h1");
                elementsToHide.forEach(element => {
                    element.classList.add("no-visibility");
                    setTimeout(() => element.classList.add("no-display"), 250)
                });

                const elementsToShow = document.querySelectorAll(".h4");
                elementsToShow.forEach(element => {
                    element.classList.remove("no-display");
                    setTimeout(() => element.classList.remove("no-visibility"), 250)
                });
            }
        }

        useMapEvent('zoomend', controlLabelZoom);

        useMapEvent('click', (e) => console.log(Object.values(e.latlng)));
        // useMapEvent('click', (e) => {
        //     polyPoints.push(Object.values(e.latlng));
        //     console.log(polyPoints)
        // })

        return (
            <>
                <SideBar sideBarInfo={sideBarInfo} setSideBarInfo={setSideBarInfo} />
                <Locations data={locations.locales} />
                <Routes data={locations.routes} />
                <Labels data={locations.locales} setSideBarInfo={setSideBarInfo} />
            </>
        )
    }

    const SideBar = ({ sideBarInfo, setSideBarInfo }) => {
        return (
            <Box
                className={classes.sideNav}
                style={{ width: sideBarInfo ? "20%" : "0%", padding: sideBarInfo ? "1rem" : 0 }}
                component={Paper}>
                <Box component="div" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">
                        {sideBarInfo?.name}
                    </Typography>
                    <IconButton
                        onClick={() => setSideBarInfo()}
                        size="small"
                        style={{ float: "right" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {sideBarInfo?.flavor?.properties?.map(property => (
                    <Box component="p">
                        <Box component="b" display="inline">
                            {property.name + " "}
                        </Box>
                        <Box display="inline">
                            {property.value}
                        </Box>
                    </Box>
                ))}
                <Box component="div">
                    {sideBarInfo?.flavor?.description}
                </Box>
            </Box>
        )
    }

    return (
        <Paper variant="outlined" style={{ position: "relative" }}>
            {parentLocation &&
                <Box component="div" className={classes.navMap} >
                    <IconButton onClick={() => retrieveLocations(parentLocation)} style={{ margin: "1rem" }}>
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                </Box>
            }
            {(locations) &&
                <MapContainer
                    className={classes.map}
                    zoom={locations.defaultZoom}
                    minZoom={locations.minZoom}
                    maxZoom={locations.maxZoom}
                    center={locations.center}
                    crs={L.CRS.Simple}
                    attributionControl={false}
                    zoomControl={false}
                    maxBounds={locations.bounds}
                    style={{
                        backgroundImage: `url(${locations.background})`,
                        backgroundSize: "cover",
                        height: "75vh",
                        borderRadius: 4
                    }}>
                    <MapContent />
                </MapContainer>
            }
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
