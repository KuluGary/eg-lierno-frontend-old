import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { StringUtil } from "../../../helpers/string-util";
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
  image: {
    width: "100%"
  }
}));

const mapStateToProps = state => {
  return { profile: state.profile }
}

function Flavor(props) {
  const classes = useStyles();
  const { addToCreatureFlavor, changeName, addToCreatureStats } = props;
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
  const [image, setImage] = useState(props.creature.flavor.imageUrl);
  const [characterClass, setCharacterClass] = useState(props.creature.flavor.class || '');
  const [campaignAvailable, setCampaignAvailable] = useState([]);
  const [campaigns, setCampaigns] = useState(props.creature.flavor.campaign || []);

  const [personality, setPersonality] = useState(
    (props.creature.flavor.personality.personality && props.creature.flavor.personality.personality.replace(/<br \/>/gi, "\n")) || '');
  const [physical, setPhysical] = useState(
    (props.creature.flavor.personality.physical && props.creature.flavor.personality.physical.replace(/<br \/>/gi, "\n")) || '');
  const [story, setStory] = useState(
    (props.creature.flavor.personality.backstory && props.creature.flavor.personality.backstory.replace(/<br \/>/gi, "\n")) || '');
  const [faction, setFaction] = useState(props.creature.flavor.faction);
  const [alignment, setAlignment] = useState(props.creature.stats.alignment || alignments[0]);

  useEffect(() => {
    Api.fetchInternal('/campaigns')
      .then(campaignList => {
        setCampaignAvailable(campaignList.filter(campaign => campaign.dm === props.profile._id))
      })
  }, [props.profile])

  useEffect(() => {
    if (campaignAvailable.length > 0) {
      changeName(name);
      addToCreatureFlavor(pronoun, "pronoun");
      addToCreatureFlavor(description.replace(/\n/g, "<br />"), "description");
      addToCreatureFlavor(image, "imageUrl");
      addToCreatureFlavor(faction, "faction");
      addToCreatureStats(alignment, "alignment");
      addToCreatureFlavor(gender, "gender");
      addToCreatureFlavor(characterClass, "class")
      addToCreatureFlavor(campaigns.map(campaign => ({
        campaignId: campaign.id || campaignAvailable.filter(campaignA => campaignA._id === campaign.campaignId)[0]._id,
        unlocked: campaign.unlocked
      })), "campaign")
      const perso = {
        personality: personality.replace(/\n/g, "<br />"),
        physical: physical.replace(/\n/g, "<br />"),
        backstory: story.replace(/\n/g, "<br />")
      }
      
      addToCreatureFlavor(perso, "personality")
      // props.addToCreatureFlavor(props.profile._id, "owner")
    }
  }, [pronoun, name, gender, description, image, faction, alignment, campaigns, characterClass, personality, physical, story, campaignAvailable, changeName, addToCreatureFlavor, addToCreatureStats])

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
    campaignAvailable.length > 0 &&
    <>
      <Typography variant="h6" gutterBottom>
        Detalles básicos
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Por favor detalla los datos básicos de tu personaje no jugable.
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
                color="primary"
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
        <Grid item xs={3} style={{ display: (image && image.length > 0) ? 'block' : 'none' }}>
          <img alt={'class'} className={classes.image} src={image} />
        </Grid>
        <Grid item sm={(image && image.length > 0) ? 9 : 12}>
          <FormControl className={classes.formControl}>
            <TextField
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
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            {/* <TextField
              id="personalityTrait1"
              name="personalityTrait1"
              onChange={(e) => setPersonalityTrait1(e.target.value)}
              value={personalityTrait1}
              multiline
              label="Rasgo de personalidad I"
              fullWidth
            /> */}
            <TextField
              id="personality"
              name="personality"
              onChange={(e) => setPersonality(e.target.value)}
              value={personality}
              multiline
              label="Descripción psicológica"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="physical"
              name="physical"
              onChange={(e) => setPhysical(e.target.value)}
              value={physical}
              multiline
              label="Descripción física"
              fullWidth
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="ideals"
              name="ideals"
              onChange={(e) => setIdeals(e.target.value)}
              value={ideals}
              multiline
              label="Ideales"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="bonds"
              name="bonds"
              onChange={(e) => setBonds(e.target.value)}
              value={bonds}
              multiline
              label="Vínculos"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="flaws"
              name="flaws"
              onChange={(e) => setFlaws(e.target.value)}
              value={flaws}
              multiline
              label="Defectos"
              fullWidth
            />
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id="story"
              name="story"
              onChange={(e) => setStory(e.target.value)}
              value={story}
              multiline
              label="Historia"
              fullWidth
            />
          </FormControl>
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