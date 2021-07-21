import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { StringUtil } from "helpers/string-util";
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
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Api from 'helpers/api';
import Image from 'components/Image/Image';
import useStyles from "./MonsterFlavor.styles";

const mapStateToProps = state => {
  return { profile: state.profile }
}

function MonsterFlavor(props) {
  const classes = useStyles();
  const { addToCreatureStats, changeName, addToCreatureFlavor, profile } = props;
  const alignments = [
    "Sin alineamiento",
    StringUtil.generiza("Legal bueno", "Legal buena", "Legal buene", props.pronoun),
    StringUtil.generiza("Neutral bueno", "Neutral buena", "Neutral buene", props.pronoun),
    StringUtil.generiza("Caótico bueno", "Caótica buena", "Caótique buene", props.pronoun),
    "Legal neutral",
    "Neutral",
    StringUtil.generiza("Caótico neutral", "Caótica neutral", "Caótique neutral", props.pronoun),
    StringUtil.generiza("Legal malo", "Legal mala", "Legal male", props.pronoun),
    StringUtil.generiza("Neutral malo", "Neutral mala", "Neutal male", props.pronoun),
    StringUtil.generiza("Caótico malo", "Caótica mala", "Caótique male", props.pronoun)
  ]
  const [pronoun, setPronoun] = useState(props.creature.flavor.pronoun || 'el');
  const [gender, setGender] = useState(props.creature.flavor.gender || '');
  const [name, setName] = useState(props.creature.name);
  const [description, setDescription] = useState(props.creature.flavor.description || '');
  const [image, setImage] = useState(props.creature.flavor.portrait);
  const [characterClass, setCharacterClass] = useState(props.creature.flavor.class || '');
  const [campaignAvailable, setCampaignAvailable] = useState([]);
  const [campaigns, setCampaigns] = useState(props.creature.flavor.campaign || []);

  const [faction, setFaction] = useState(props.creature.flavor.faction);
  const [alignment, setAlignment] = useState(props.creature.stats.alignment || alignments[0]);
  const [openUploader, setOpenUploader] = useState();

  useEffect(() => {
    Api.fetchInternal('/campaigns')
      .then(campaignList => {
        setCampaignAvailable(campaignList.filter(campaign => campaign.dm === profile?._id))
      })
  }, [profile])

  useEffect(() => {
    if (campaignAvailable.length > 0) {
      changeName(name);
      addToCreatureFlavor(pronoun, "pronoun");
      addToCreatureFlavor(description.replace(/\n/g, "<br />"), "description");
      addToCreatureFlavor(image, "portrait");
      addToCreatureFlavor(faction, "faction");
      addToCreatureStats(alignment, "alignment")
      addToCreatureFlavor(gender, "gender");
      addToCreatureFlavor(characterClass, "class")
      addToCreatureFlavor(campaigns.map(campaign => ({
        campaignId: campaign.id || campaignAvailable.filter(campaignA => campaignA._id === campaign.campaignId)[0]._id,
        unlocked: campaign.unlocked
      })), "campaign")
      addToCreatureFlavor(profile._id, "owner")
    }
  }, [pronoun, name, gender, description, image, faction, alignment, campaigns, characterClass, campaignAvailable, profile])

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

  const toggleLockCampaign = (index) => {
    const newCampaigns = [...campaigns];

    newCampaigns[index].unlocked = !newCampaigns[index].unlocked;

    setCampaigns(newCampaigns);

  }

  const removeCampaign = (campaignToRemove) => {
    const newCampaigns = [...campaigns].filter(campaign => campaign.id !== campaignToRemove.id)

    setCampaigns(newCampaigns)
  }

  return (
    campaignAvailable.length > 0 &&
    <>
      <ImageUploader
        open={openUploader}
        setOpen={setOpenUploader}
        setImage={setImage} />
      <Typography variant="h6" gutterBottom>
        Detalles básicos
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Por favor detalla los datos básicos de tu monstruo.
      </Typography>
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <FormControl className={classes.formControl} required>
            <InputLabel id="demo-simple-select-label">Pronombre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pronoun}
              onChange={(e) => setPronoun(e.target.value)}>
              <MenuItem value={'el'}>{'El'}</MenuItem>
              <MenuItem value={'ella'}>{'La'}</MenuItem>
              <MenuItem value={'elle'}>{'Le'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={7}>
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
        <Grid item sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.creature.flavor.nameIsProper}
                onChange={() => props.addToCreatureFlavor(!props.creature.flavor.nameIsProper, "nameIsProper")}
                name="checkedB"
                color="default"
              />
            }
            label="¿Nombre propio?"
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
        <Grid item xs={3} style={{ display: (image?.original?.length > 0) ? 'block' : 'none' }}>
          <Image
            className={classes.image}
            errorStyle={{ width: "50%", height: "100%", margin: "0 auto" }}
            ariaLabel={`Retrato de ${name}`}
            src={image?.original}
            mode="modal" />
        </Grid>
        <Grid item xs={(image?.original?.length > 0) ? 9 : 12} container spacing={3}>
          <Grid item sm={12}>
            <FormControl className={classes.formControl}>
              <TextField
                id="image"
                name="image"
                label="URL de imagen"
                onChange={(e) => setImage(e.target.value)}
                value={image?.original}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setOpenUploader(true)}>
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  )
                }}
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
          <Grid item xs={6} sm={6}>
            <FormControl className={classes.formControl}>
              <TextField
                id="class"
                name="class"
                onChange={(e) => setCharacterClass(e.target.value)}
                value={characterClass}
                label="Clase"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                label="Género"
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Button onClick={addCampaign}>
            AÑADIR CAMPAÑA *
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
                  value={campaign.id || campaignAvailable.filter(campaignA => campaignA._id === campaign.campaignId)[0]._id}
                >
                  {campaignAvailable.map((item, index) => (
                    <MenuItem
                      key={index}
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
                    onChange={() => toggleLockCampaign(index)}
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

MonsterFlavor = connect(
  mapStateToProps
)(MonsterFlavor);

export { MonsterFlavor };