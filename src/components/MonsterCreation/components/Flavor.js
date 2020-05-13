import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Api from '../../../helpers/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const mapStateToProps = state => {
  return { profile: state.profile }
}

function Flavor(props) {
  const classes = useStyles();
  const alignments = [
    "Sin alineamiento",
    "Legal bueno",
    "Neutral bueno",
    "Caótico bueno",
    "Legal neutral",
    "Neutral",
    "Caótico neutral",
    "Legal malo",
    "Neutral malo",
    "Caótico malo"
  ]
  const [pronoun, setPronoun] = useState('');
  const [name, setName] = useState(props.creature.name);
  const [description, setDescription] = useState(props.creature.flavor.description || '');
  const [image, setImage] = useState(props.creature.flavor.imageUrl);
  const [campaigns, setCampaigns] = useState(props.creature.campaigns || []);
  const [campaignAvailable, setCampaignAvailable] = useState([]);
  const [faction, setFaction] = useState(props.creature.flavor.faction);
  const [alignment, setAlignment] = useState(props.creature.stats.alignment || alignment[0]);

  useEffect(() => {
    Api.fetchInternal('/campaigns')
      .then(campaignList => setCampaignAvailable(
        campaignList.filter(campaign => campaign.dm === props.profile._id))
      )
  }, [props.profile])

  useEffect(() => {
    props.changeName(name);
    props.setPronoun(pronoun);
    props.addToCreatureFlavor(description, "description");
    props.addToCreatureFlavor(image, "imageUrl");
    props.addToCreatureFlavor(faction, "faction");
    props.addToCreatureStats(alignment, "alignment")
    props.addToCreatureFlavor(campaigns.map(campaign => ({
      campaignId: campaign.id,
      unlocked: campaign.unlocked
    })), "campaign")
    props.addToCreatureFlavor(props.profile._id, "owner")
  }, [pronoun, name, description, image, faction, alignment, campaigns])

  const addCampaign = () => {
    const indexOf = campaignAvailable.findIndex(campaignAvailable => campaigns.every(campaign => campaign.id !== campaignAvailable._id))
    campaigns.length < campaignAvailable.length && setCampaigns([...campaigns, {
      id: campaignAvailable[indexOf < 0 ? 0 : indexOf]._id,
      unlocked: true,
      name: campaignAvailable[indexOf < 0 ? 0 : indexOf].name
    }])
  }

  const handleCampaignChange = (event, campaignToChange, unlocked) => {

    const indexOf = campaigns.findIndex(campaign => campaign.id === campaignToChange.id);
    const newCampaign = {
      id: event.target ? event.target.value : campaignToChange.id,
      name: campaignAvailable.filter(campaign => campaign._id === (event.target ? event.target.value : campaignToChange.id))[0].name,
      unlocked
    }

    const newCampaigns = [...campaigns]
    newCampaigns[indexOf] = newCampaign;

    setCampaigns(newCampaigns);

  }

  const removeCampaign = (campaignToRemove) => {
    const newCampaigns = [...campaigns].filter(campaign => campaign.id !== campaignToRemove.id)

    setCampaigns(newCampaigns)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Detalles básicos
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Por favor detalla los datos básicos de tu monstruo.
      </Typography>
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <TextField
            id="pronoun"
            name="pronoun"
            value={pronoun}
            onChange={(e) => setPronoun(e.target.value)}
            label="Pronombre"
            fullWidth
          />
        </Grid>
        <Grid item sm={10}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombre"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              required
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              multiline
              label="Descripción"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              required
              id="image"
              name="image"
              label="URL de imagen"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.formControl}>
            <TextField
              id="faction"
              name="faction"
              onChange={(e) => setFaction(e.target.value)}
              value={faction}
              label="Facción"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Alineamiento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
            >
              {alignments.map((alignment, index) =>
                <MenuItem key={index} value={alignment}>{alignment}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <Button onClick={addCampaign}>
            AÑADIR CAMPAÑA
          </Button>
        </Grid>
        {campaigns.map((campaign, index) => (
          <>
            <Grid key={index} item sm={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Campaña</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => handleCampaignChange(e, campaign, campaign.unlocked)}
                  value={campaign.id}
                >
                  {campaignAvailable.map((item, index) => (
                    <MenuItem
                      key={index  }
                      value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={campaign.unlocked}
                    onChange={() => handleCampaignChange(campaign.id, campaign, !campaign.unlocked)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Desbloqueado"
              />
            </Grid>
            <Grid item sm={2}>
              <IconButton onClick={() => removeCampaign(campaign)}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </>
        ))}
      </Grid>

    </>
  );
}

export default connect(mapStateToProps)(Flavor);