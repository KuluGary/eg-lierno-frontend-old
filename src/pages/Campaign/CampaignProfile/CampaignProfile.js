import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Api from "helpers/api";
import CampaignInfo from "./components/CampaignInfo";
import CampaignDetails from "./components/CampaignDetails";
import CampaignLogs from "./components/CampaignLogs";
import CreatureList from "./components/CreatureList";
import MapScreen from "pages/Map/MapScreen";
import DiaryScreen from "./components/DiaryScreen";
import CampaignStats from "./components/CampaignStats";
import FactionScreen from "pages/Faction/FactionList/FactionList";
import { Paper, Grid, Tabs, Tab, CircularProgress } from "@material-ui/core";
import SEO from "components/SEO/SEO";

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    campaigns: state.campaigns,
    characters: state.characters,
  };
};

function CampaignProfile(props) {
  const [campaign, setCampaign] = useState();
  const categories = ["Detalles", "Notas", "PNJs", "Facciones", "Mapas", "Estadísticas", "Logs"];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (props.location.hash) {
      const value = props.location.hash.replace("#", "");

      handleChange(null, parseInt(value));
    } else {
      props.history.push("#0");
    }

    if (!props.campaigns) {
      Api.fetchInternal("/campaigns/" + props.match.params.id).then((res) => {
        setCampaign(res);
        setIsLoading(false);
      });
    } else {
      setCampaign(props.campaigns.filter((campaign) => campaign._id === props.match.params.id)[0]);
      setIsLoading(false);
    }
  }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (_, newValue) => {
    props.history.push("#" + newValue);
    setSelectedCategory(newValue);
  };

  const updateDiary = (diary) => {
    let campaignToUpdate = campaign;
    campaignToUpdate.flavor.diary = diary;

    Api.fetchInternal("/campaigns/" + campaign._id, {
      method: "PUT",
      body: JSON.stringify(campaignToUpdate),
    }).then(() => {
      Api.fetchInternal("/campaigns/" + props.match.params.id).then((res) => {
        setCampaign(res);
      });
    });
  };

  const TabComponent = () => {
    switch (selectedCategory) {
      case 0:
        return (
          <CampaignDetails
            campaignId={campaign._id}
            name={campaign.name}
            players={campaign.players}
            dm={campaign.dm}
            characters={campaign.characters}
            description={campaign.flavor.synopsis}
            history={props.history}
          />
        );
      case 1:
        return (
          <DiaryScreen
            diary={campaign.flavor.diary}
            updateDiary={updateDiary}
            user={props.profile._id}
            dm={campaign.dm}
          />
        );
      case 2:
        return <CreatureList history={props.history} dm={campaign.dm} campaignId={campaign._id} />;
      case 3:
        return <FactionScreen campaignId={campaign._id} />;
      case 4:
        return (
          <Grid item xs={12}>
            <MapScreen campaignId={campaign._id} history={props.history} />
          </Grid>
        );
      case 5:
        return (
          <CampaignStats
            campaignId={campaign._id}
            name={campaign.name}
            players={campaign.players}
            dm={campaign.dm}
            characters={campaign.characters}
            description={campaign.flavor.synopsis}
          />
        );
      case 6:
        return (
          <Grid item xs={12} style={{ height: "75vh" }}>
            <CampaignLogs
              name={campaign.name}
              players={campaign.players}
              dm={campaign.dm}
              characters={campaign.characters}
              campaignId={campaign._id}
            />
          </Grid>
        );
      default:
        return (
          <Grid item component={Paper} variant="outlined" xs={12}>
            Pestaña desconocida
          </Grid>
        );
    }
  };

  if (isLoading) {
    return (
      <Paper variant="outlined" style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="default" style={{ margin: "1rem" }} />
      </Paper>
    );
  }

  if (campaign) {
    return (
      <Grid container spacing={1}>
        <SEO>
          <title>{`${campaign.name} | Lierno App`}</title>
        </SEO>
        <Grid item xs={12} variant="outlined">
          <CampaignInfo name={campaign.name} game={campaign.flavor.game}>
            <Tabs
              variant="scrollable"
              value={selectedCategory}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              {categories.map((category, index) => {
                return <Tab key={index} label={category} {...a11yProps(category)} />;
              })}
            </Tabs>
          </CampaignInfo>
        </Grid>
        <TabComponent />
      </Grid>
    );
  }

  return <></>;
}

export default connect(mapStateToProps)(CampaignProfile);
