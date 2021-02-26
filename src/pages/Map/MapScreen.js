// @flow

import React, { useState, useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from "react-redux";
import L, { divIcon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker, useMapEvent, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Api from "helpers/api";
import { addLocations } from "shared/actions/index";

import background from "assets/images/background.png";

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
    }
}));


function MapScreen({ campaignId }) {
    const classes = useStyles();
    const [locations, setLocation] = useState({
        bounds: [[1550, 0], [6750, 4316]],
        minZoom: -3,
        maxZoom: 0,
        defaultZoom: -3,
        background: background,
        locales: [
            {
                name: "Lierno",
                unlocked: true,
                children: [
                    {
                        name: "Heredo",
                        unlocked: true,
                        tag: {
                            type: "h1",
                            maxZoomLevel: -1,
                            minZoomLevel: -5,
                            pos: [4256.367333, 1167.450309]
                        },
                        children: [
                            {
                                name: "Ribera",
                                unlocked: false,
                                bounds: [[3399, 530], [4495.00, 2514.00]],
                                tag: {
                                    type: "h2",
                                    pos: [3848.560348, 1095.887892],
                                },
                                image: "ribera.png",
                                imageLocked: "ribera-locked.png"
                            },
                            {
                                name: "El Valle",
                                unlocked: true,
                                tag: {
                                    type: "h2",
                                    pos: [4556, 1718],
                                },
                                bounds: [[4013, 1094], [5100.00, 2597.00]],
                                image: "valle.png",
                                imageLocked: "valle-locked.png",
                                children: [
                                    {
                                        name: "Cordillera de Reyes",
                                        unlocked: true,
                                        tag: {
                                            type: "h3",
                                            pos: [4687.577571379429, 1635]
                                        }
                                    },
                                    {
                                        name: "Meseta Central",
                                        unlocked: true,
                                        tag: {
                                            type: "h3",
                                            pos: [4295.6649466804265, 1825]
                                        }
                                    },
                                    {
                                        name: "Páramo Verde",
                                        unlocked: true,
                                        tag: {
                                            type: "h3",
                                            pos: [4386, 1309]
                                        },
                                        children: [
                                            {
                                                name: "Ducado de Alaminos",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4492, 2013.5]
                                                }
                                            },
                                            {
                                                name: "Vigía del Norte",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4761, 2191.5]
                                                }
                                            },
                                            {
                                                name: "Morada Fordye",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4581, 1766.5]
                                                }
                                            },
                                            {
                                                name: "Driebes",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4332.94083247334, 1239.5]
                                                }
                                            }
                                        ]
                                    }
                                ],
                            },
                            {
                                name: "Santuario",
                                unlocked: false,
                                bounds: [[3819.00, 1486.00], [4239.00, 2058.00]],
                                tag: {
                                    type: "h2",
                                    pos: [3932.197533, 1623.694054],
                                },
                                children: [
                                    {
                                        name: "Santuario",
                                        unlocked: true,
                                        tag: {
                                            type: "h3",
                                            pos: [3932.197533, 1623.694054]
                                        },
                                        children: [
                                            {
                                                name: "Ciudad de Santuario",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [3973.5218438252496, 1623]
                                                }
                                            },
                                            {
                                                name: "Templo del Equilibrio",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4059.9432404540767, 1979.5]
                                                }
                                            },
                                            {
                                                name: "Campiña blanca",
                                                unlocked: true,
                                                tag: {
                                                    type: "h4",
                                                    pos: [4136.79463364293, 1560.5]
                                                }
                                            }
                                        ],
                                    }
                                ],
                                image: "santuario.png",
                                imageLocked: "santuario-locked.png"
                            }
                        ]
                    },
                    {
                        name: "Extracto",
                        unlocked: false,
                        tag: {
                            type: "h1",
                            pos: [5638.9680082559335, 1140],
                        },
                        children: [
                            {
                                name: "Tundra",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [5517.918128654971, 2609],
                                },
                                bounds: [[4770.00, 1348.00], [6082.00, 3252.00]],
                                image: "tundra.png",
                                imageLocked: "tundra-locked.png",
                                children: [
                                    {
                                        name: "Balad Celadher",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [5139.971792225662, 1763.5]
                                        }
                                    },
                                    {
                                        name: "Kanstad",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [5196.954592363261, 2193.5]
                                        }
                                    }
                                ]
                            },
                            {
                                name: "Hierro",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [6246.394220846233, 2121],
                                },
                                bounds: [[5572.00, 1020.00], [6691.00, 2895.00]],
                                image: "hierro.png",
                                imageLocked: "hierro-locked.png"
                            },
                            {
                                name: "Liceo",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [5735.705538355693, 1782]
                                },
                                bounds: [[5256.00, 1350.00], [5888.00, 2261.00]],
                                image: "liceo.png",
                                imageLocked: "liceo-locked.png"
                            },
                            {
                                name: "Cordillera",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [5903.72686618507, 723],
                                },
                                bounds: [[4764.00, 146.00], [6519.00, 1559.00]],
                                image: "cordillera.png",
                                imageLocked: "cordillera-locked.png"
                            }
                        ]
                    },
                    {
                        name: "Marea",
                        unlocked: false,
                        tag: {
                            type: "h1",
                            pos: [4087.2418300653594, 2654],
                        },
                        children: [
                            {
                                name: "El Bajío",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [3959.479876160991, 2534],
                                },
                                bounds: [[3534.00, 2400.00], [4330.00, 3115.00]],
                                image: "bajio.png",
                                imageLocked: "bajio-locked.png"
                            },
                            {
                                name: "Altamar",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [4419.6821465428275, 2362],
                                },
                                bounds: [[4182.00, 2161.00], [4703.00, 2883.00]],
                                image: "altamar.png",
                                imageLocked: "altamar-locked.png"
                            },
                            {
                                name: "Los Bancos",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [4159.611971104231, 2842],
                                },
                                children: [
                                    {
                                        name: "Abanades",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [4105.689714482284, 2951]
                                        }
                                    }
                                ],
                                bounds: [[3823.00, 2707.00], [4421.00, 3274.00]],
                                image: "bancos.png",
                                imageLocked: "bancos-locked.png"
                            },
                            {
                                name: "Costa",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [4155.709666322669, 3262],
                                },
                                bounds: [[3900.00, 3156.00], [4614.00, 3688.00]],
                                children: [
                                    {
                                        name: "Cardiel",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [4034.8624011007914, 3297.5]
                                        }
                                    },
                                    {
                                        name: "Valentano",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [4606.989336085311, 3569.5]
                                        }
                                    },
                                    {
                                        name: "Aprilia",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [4275.861713106295, 3527]
                                        }
                                    }
                                ],
                                image: "costa.png",
                                imageLocked: "costa-locked.png"
                            },
                            {
                                name: "Bahía",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [3865.850017199862, 3299],
                                },
                                children: [
                                    {
                                        name: "Latera",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [3661.615411076711, 3447]
                                        }
                                    }
                                ],
                                bounds: [[3549.00, 3049.00], [4085.00, 3794.00]],
                                image: "bahia.png",
                                imageLocked: "bahia-locked.png"
                            },
                            {
                                name: "Perla",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [4759.63123495012, 3054],
                                },
                                bounds: [[4354.00, 2912.00], [5053.00, 3235.00]],
                                image: "perla.png",
                                imageLocked: "perla-locked.png"
                            }
                        ]
                    },
                    {
                        name: "Árida",
                        unlocked: false,
                        tag: {
                            type: "h1",
                            pos: [2927.449604403165, 1956],
                        },
                        children: [
                            {
                                name: "Destierro",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [3373.7137942896456, 1825],
                                },
                                bounds: [[3030.00, 772.00], [3702.00, 2312.00]],
                                image: "destierro.png",
                                imageLocked: "destierro-locked.png"
                            },
                            {
                                name: "Calima",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [2821.689714482284, 1657],
                                },
                                children: [
                                    {
                                        name: "Orya",
                                        unlocked: false,
                                        tag: {
                                            type: "h3",
                                            pos: [2927.6680426556586, 1559.5]
                                        }
                                    }
                                ],
                                bounds: [[2141.00, 938.00], [3277.00, 2331.00]],
                                image: "calima.png",
                                imageLocked: "calima-locked.png"
                            },
                            {
                                name: "Oasis",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [3093.7399380804954, 3231],
                                },
                                bounds: [[1857.00, 1923.00], [3519.00, 3847.00]],
                                image: "oasis.png",
                                imageLocked: "oasis-locked.png"
                            },
                            {
                                name: "Tierra de Fuego",
                                unlocked: false,
                                tag: {
                                    type: "h2",
                                    pos: [2333.4668042655658, 2177],
                                },
                                bounds: [[1636.00, 1546.00], [2981.00, 2696.00]],
                                image: "tierra-de-fuego.png",
                                imageLocked: "tierra-de-fuego-locked.png"
                            }
                        ]
                    }

                ]
            }
        ]
    });

    useEffect(() => {
        Api.fetchInternal('/campaignmap/' + campaignId)
            .then(res => { })
    }, []);

    const Location = props => {
        const map = useMap();

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
                                    url={require(`../../assets/images/map/${image}`)}
                                    bounds={item.bounds} />
                            }
                            {item.children?.length && <Location data={item.children} />}
                        </div>
                    )
                })}
            </>
        )
    }

    const Label = props => {
        return (
            <>
                {props.data.map((item) => {
                    const iconMarkup = renderToStaticMarkup(
                        <div className={"lierno-map-tag"} >
                            <div className={`${item.tag?.type}`}>
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
                                                console.log("clicked")
                                            }
                                        }} />
                                }
                                {item.children?.length && <Label data={item.children} visibleTags={props.visibleTags} />}
                            </>}
                        </div>
                    )
                })}
            </>
        )
    }

    const MapContent = () => {
        const [visibleTags, setVisibleTags] = useState("h1");
        const map = useMap();

        useMapEvent('zoomend', () => {
            const zoomLevel = map.getZoom();

            if (zoomLevel === 0) {
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

            if (zoomLevel === -1) {
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

            if (zoomLevel === -2) {
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

            if (zoomLevel === -3) {
                const elementsToHide = document.querySelectorAll(".h2, h3");
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

        });

        useMapEvent('click', (e) => console.log(Object.values(e.latlng)));

        return (
            <>
                <Location data={locations.locales} />
                <Label data={locations.locales} visibleTags={visibleTags} />
            </>
        )
    }

    return (
        <Paper variant="outlined">
            <MapContainer
                className={classes.map}
                zoom={locations.defaultZoom}
                minZoom={locations.minZoom}
                maxZoom={locations.maxZoom}
                center={[3960.2579979360166, 1527]}
                crs={L.CRS.Simple}
                attributionControl={false}
                zoomControl={false}
                maxBounds={locations.bounds}
                whenCreated={() => {
                    const elementsToHide = document.querySelectorAll(".h2, .h3, .h4");

                    elementsToHide.forEach(element => {
                        element.classList.add("no-visibility");
                        setTimeout(() => element.classList.add("no-display"), 250)
                    });
                }}
                style={{
                    backgroundImage: `url(${locations.background})`,
                    backgroundSize: "cover",
                    height: "75vh",
                    borderRadius: 4
                }}>
                <MapContent />
                {/* <Rectangle
                    bounds={locations.bounds} /> */}
            </MapContainer>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
