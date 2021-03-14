import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useQuery, gql } from '@apollo/client';
import ItemScreen from './components/ItemScreen';
import SpellScreen from './components/SpellScreen';
// import ClassScreen from './components/ClassScreen';
import ReferenceScreen from './components/ReferenceScreen';
import SEO from 'components/SEO/SEO';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ExploreScreen() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data } = useQuery(gql`
        query {
            getAllItems{
                _id
                name
                description
                properties {
                    key
                    value
                }
            }
            getAllArmor {
                _id
                name
                description
                properties {
                    key
                    value
                }
            }
            getAllWeapons {
                _id
                name
                description
                properties {
                    key
                    value
                }
            }
            getAllVehicles {
                _id
                name
                description
                properties {
                    key
                    value
                }
            }
            getAllSpells {
                _id
                name
                stats {
                    level
                    school
                    castingTime
                    range
                    components {
                        type
                        description
                    }
                    duration
                    description
                }
            }
            getAllClasses {
                _id
                name
                description
                data {
                    hitDie
                }
    
            }
        }
    `)

    return (
        <>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Paper variant="outlined">
                    <SEO>
                        <title>{"Referencias | Lierno App"}</title>
                    </SEO>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Objetos" {...a11yProps(0)} />
                            <Tab label="Hechizos" {...a11yProps(1)} />
                            <Tab label="Referencia rápida" {...a11yProps(2)} />
                            {/* <Tab label="Clases" {...a11yProps(2)} /> */}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ItemScreen
                            data={{
                                items: data?.getAllItems,
                                weapons: data?.getAllWeapons,
                                armor: data?.getAllArmor,
                                vehicles: data?.getAllVehicles
                            }} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SpellScreen
                            data={data?.getAllSpells} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ReferenceScreen />
                        {/* <ClassScreen
                            data={data?.getAllClasses} /> */}
                    </TabPanel>
                </Paper>
            </Slide>
        </>
    );
}

export default ExploreScreen;