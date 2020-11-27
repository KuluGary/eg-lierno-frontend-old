import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import Auth from "./helpers/auth";
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import CharacterScreen from "./components/CharacterScreen/CharacterScreen";
import CharacterProfile from "./components/CharacterProfile/CharacterProfile";
import CharacterCreation from "./components/CharacterCreation/CharacterCreation";
import AlignmentScreen from "./components/AlignmentScreen/AlignmentScreen";
import MapScreen from "./components/MapScreen/MapScreen";
import Location from "./components/Location/Location";
import InitiativeTracker from './components/InitiativeTracker/InitiativeTracker';
import BestiaryScreen from './components/BestiaryScreen/BestiaryScreen';
import MonsterProfile from './components/MonsterProfile/MonsterProfile';
import MonsterCreation from './components/MonsterCreation/MonsterCreation';
import NpcCreation from './components/NpcCreation/NpcCreation';
import NpcScreen from './components/NpcScreen/NpcScreen';
import NpcProfile from './components/NpcProfile/NpcProfile';
import CampaignCreation from './components/CampaignCreation/CampaignCreation';
import CampaignScreen from './components/CampaignScreen/CampaignScreen';
import CampaignProfile from './components/CampaignProfile/CampaignProfile';
import Reference from './components/Referencia/Referencia';
import Update from './components/Update/Update';
import Package from '../package.json';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@material-ui/core/Box';
import { toast } from 'react-toastify'
import { theme } from './shared/theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const electron = window && window.process && window.process.type && window.require('electron');
const ipcRenderer = electron && electron.ipcRenderer;

toast.configure();
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      hasLoaded: false,
      drawerOpen: false,
      update: false,
      downloaded: false,
      updateVersion: "0.0.0",
      darkMode: localStorage.getItem('theme') || false
    }
  }

  componentDidMount() {
    if (window && window.process && window.process.type) {
      ipcRenderer.on('update_available', () => {
        this.setState({
          update: true,
        })
      })

      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        this.setState({
          downloaded: true
        })
      })

      ipcRenderer.on('error', (e) => {
        this.setState({
          status: e
        })
      })
    }

    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  handleDrawerOpen() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  authenticated() {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    })
  }

  restartApp() {
    ipcRenderer.send('restart_app')
  }

  closeNotification() {
    this.setState({
      update: false
    })
  }

  setDarkMode() {
    this.setState({
      darkMode: !this.state.darkMode
    }, () => localStorage.setItem('theme', this.state.darkMode))
  }

  updateDimensions() {
    console.log("DIMENSIONS UPDATED")
    this.setState({
      innerWidth: window.innerWidth
    })
  }

  render() {
    let muiTheme = createMuiTheme({
      palette: {
        type: this.state.darkMode ? 'dark' : 'light',
      },
      ...theme
    })

    return (
      <>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Router>
            {console.log(window.location)}
            <Header
              mode={this.state.darkMode}
              open={this.state.drawerOpen}
              handleDrawer={this.handleDrawerOpen.bind(this)}
              authenticated={this.authenticated.bind(this)} />
            {Auth.loggedIn() &&
              <>
                <Sidebar
                  open={this.state.drawerOpen}
                  handleDrawer={this.handleDrawerOpen.bind(this)} />
              </>
            }
            {/* } */}
            <Update
              update={this.state.update}
              restartApp={this.restartApp}
              downloaded={this.state.downloaded}
              status={this.state.status}
              closeNotification={this.closeNotification.bind(this)} />
            <Box style={{
              maxWidth: 1440,
              margin: this.state.innerWidth > 1440 ? '5rem auto' : (this.state.innerWidth < 512 ? '5rem 1rem' : '5rem 1rem 1rem 5rem')
            }}>
              <Switch>

                <Route path="/login" render={() => (
                  <Login
                    version={this.state.uploadVersion || Package.version}
                    authenticated={this.authenticated.bind(this)} />
                )} />
                <Route path="/register" component={Register} />
                <Route path="/profile" render={() => (
                  <ProfileScreen
                    setDarkMode={this.setDarkMode.bind(this)}
                    darkMode={this.state.darkMode} />
                )} />

                <Route path="/characters/:id" component={CharacterProfile} />
                <Route exact path="/npc/:id" component={NpcProfile} />
                <Route exact path="/bestiary/:id" component={MonsterProfile} />
                <Route exact path="/campaigns/:id" component={CampaignProfile} />

                {Auth.loggedIn() ? <>
                  {Auth.hasRole("ALIGNMENT_ACCESS") && <Route path="/alignments" component={AlignmentScreen} />}

                  {Auth.hasRole("CHARACTER_ACCESS") && <Route path="/character-creation" component={CharacterCreation} />}
                  {Auth.hasRole("CHARACTER_ACCESS") && <Route exact path="/characters" component={CharacterScreen} />}
                  {Auth.hasRole("CHARACTER_ACCESS") && <Route path="/characters/:id" component={CharacterProfile} />}


                  {Auth.hasRole("CAMPAIGN_ACCESS") && <Route path="/campaigns/add/:id?" component={CampaignCreation} />}
                  {Auth.hasRole("CAMPAIGN_ACCESS") && <Route exact path="/campaigns" component={CampaignScreen} />}

                  {Auth.hasRole("NPC_ACCESS") && <Route path="/npc/add/:id?" component={NpcCreation} />}
                  {Auth.hasRole("NPC_ACCESS") && <Route exact path="/npcs" component={NpcScreen} />}

                  {Auth.hasRole("BESTIARY_ACCESS") && <Route path="/bestiary/add/:id?" component={MonsterCreation} />}
                  {Auth.hasRole("BESTIARY_ACCESS") && <Route exact path="/bestiary" component={BestiaryScreen} />}

                  {Auth.hasRole("INITIATIVE_ACCESS") && <Route path="/initiative" component={InitiativeTracker} />}
                  {Auth.hasRole("MAP_ACCESS") && <Route exact path="/map" component={MapScreen} />}
                  {Auth.hasRole("MAP_ACCESS") && <Route exact path="/location/:id" component={Location} />}
                  {Auth.hasRole("REFERENCE_ACCESS") && <Route exact path="/reference" component={Reference} />}
                  <Route exact path="/" component={HomeScreen} />
                </> : <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />}
              </Switch>
            </Box>
          </Router>
        </ThemeProvider>
      </>
    )
  }
}

export default App