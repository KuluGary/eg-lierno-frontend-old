import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Api from '../../helpers/api'
import CampaignInfo from './components/CampaignInfo';
import CampaignDetails from './components/CampaignDetails';
import CampaignLogs from './components/CampaignLogs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreatureList from './components/CreatureList'
import MapScreen from '../MapScreen/MapScreen';
import DiaryScreen from './components/DiaryScreen';
import CampaignStats from './components/CampaignStats';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns,
        roles: state.roles,
        characters: state.characters
    }
}

function CampaignProfile(props) {
    const [campaign, setCampaign] = useState();
    const [categories] = useState(["Detalles", "Diario de campaña", "PNJs", "Mapas", "Estadísticas", "Logs"]);
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        if (props.location.hash) {
            const value = props.location.hash.replace("#", "");

            handleChange(null, parseInt(value));
        } else {
            props.history.push("#0");
        }

        if (!props.campaigns) {
            Api.fetchInternal('/campaigns/' + props.match.params.id)
                .then(res => {
                    setCampaign(res)
                });
        } else {
            setCampaign(props.campaigns.filter(campaign => campaign._id === props.match.params.id)[0])
        }
    }, [])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        props.history.push("#" + newValue);
        setSelectedCategory(newValue);
    }

    const updateDiary = (diary) => {
        let campaignToUpdate = campaign;
        campaignToUpdate.flavor.diary = diary;

        Api.fetchInternal('/campaigns/' + campaign._id, {
            method: "PUT",
            body: JSON.stringify(campaignToUpdate)
        })
            .then(() => {
                Api.fetchInternal('/campaigns/' + props.match.params.id)
                    .then(res => {
                        setCampaign(res)
                    });
            })
    }

    function tabData() {
        switch (selectedCategory) {
            case 0: return <CampaignDetails
                campaignId={campaign._id}
                name={campaign.name}
                players={campaign.players}
                dm={campaign.dm}
                characters={campaign.characters}
                description={campaign.flavor.synopsis} />
            case 1: return <DiaryScreen
                diary={campaign.flavor.diary}
                updateDiary={updateDiary}
                user={props.profile._id}
                campaignId={campaign.dm} />
            case 2: return <CreatureList
                history={props.history}
                dm={campaign.dm}
                campaignId={campaign._id} />
            case 3: return <MapScreen campaignId={campaign._id} history={props.history} />
            case 4: return <CampaignStats
                campaignId={campaign._id}
                name={campaign.name}
                players={campaign.players}
                dm={campaign.dm}
                characters={campaign.characters}
                description={campaign.flavor.synopsis} />
            case 5: return <CampaignLogs
                name={campaign.name}
                players={campaign.players}
                dm={campaign.dm}
                characters={campaign.characters}
                campaignId={campaign._id} />
            case 6: return <Grid item component={Paper} variant="outlined" xs={12}>5</Grid>
        }
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Grid container spacing={2} style={{ padding: 10 }}>
                {campaign &&
                    <>
                        <Grid item xs={12} component={Paper} variant="outlined">
                            <CampaignInfo
                                name={campaign.name}
                                game={campaign.flavor.game}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                variant="scrollable"
                                value={selectedCategory}
                                onChange={handleChange}
                                aria-label="simple tabs example">
                                {categories.map((category, index) => {
                                    return <Tab key={index} label={category} {...a11yProps(category)} />
                                })}
                            </Tabs>
                            {tabData()}
                        </Grid>
                    </>}
            </Grid>
        </Slide>
    )

}

export default connect(mapStateToProps)(CampaignProfile);