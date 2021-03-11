import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { ApolloProvider } from "@apollo/client";
import Auth from "./helpers/auth";
import { apolloClient } from "./helpers/api";
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import AlignmentScreen from "./components/AlignmentScreen/AlignmentScreen";
import Location from "./components/Location/Location";
import InitiativeTracker from './components/InitiativeTracker/InitiativeTracker';
import Update from './components/Update/Update';
import Package from '../package.json';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@material-ui/core/Box';
import { toast } from 'react-toastify'
import { theme } from './shared/theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthRoute from './components/AuthRoute/AuthRoute';
import ExploreScreen from './pages/Explore/ExploreScreen';

// pages
import ProfileScreen from "./pages/Profile/ProfileScreen";
import Login from "./pages/Auth/Login";
import ValidateAccount from "./pages/Auth/ValidateAccount";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import Register from "./pages/Auth/Register";
import MapScreen from "./pages/Map/MapScreen";
import CampaignCreation from './pages/Campaign/CampaignCreation/CampaignCreation';
import CampaignList from './pages/Campaign/CampaignList/CampaignList';
import CampaignProfile from './pages/Campaign/CampaignProfile/CampaignProfile';
import CharacterProfile from "./pages/Character/CharacterProfile/CharacterProfile";
import CharacterList from "./pages/Character/CharacterList/CharacterList";
import FactionList from './pages/Faction/FactionList/FactionList';
import FactionProfile from './pages/Faction/FactionProfile/FactionProfile';
import MonsterList from './pages/Monster/MonsterList/MonsterList';
import MonsterCreation from './pages/Monster/MonsterCreation/MonsterCreation';
import MonsterProfile from './pages/Monster/MonsterProfile/MonsterProfile';
import NpcCreation from './pages/Npc/NpcCreation/NpcCreation';
import NpcProfile from './pages/Npc/NpcProfile/NpcProfile';
import NpcList from './pages/Npc/NpcList/NpcList';


const electron = window?.process?.type && window.require('electron');
const ipcRenderer = electron && electron.ipcRenderer;

const styles = theme => ({
  '@font-face': {
    "font-family": "JSL Ancient",
    src: 'local("JSL Ancient"), url("assets/fonts/jacnient.ttf") format("truetype")'
  },
  '@global': {
    b: {
      fontWeight: 500
    },
    '::-webkit-scrollbar': {
      width: "6px",
      opacity: .5
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: "20px"
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: "rgba(255,255,255,0.5)",
      borderRadius: "20px"
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: "rgba(255,255,255,0.8)",
    }
  }
});

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
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Router>
              <Header
                mode={this.state.darkMode}
                open={this.state.drawerOpen}
                handleDrawer={this.handleDrawerOpen.bind(this)}
                authenticated={this.authenticated.bind(this)} />

              {Auth.loggedIn() &&
                <Sidebar
                  open={this.state.drawerOpen}
                  handleDrawer={this.handleDrawerOpen.bind(this)} />
              }

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
                  <Route path="/activate/:token" component={ValidateAccount} />
                  <Route path="/recover/:token?" component={RecoverPassword} />
                  <Route path="/register" component={Register} />
                  <Route path="/profile" render={() => (
                    <ProfileScreen
                      setDarkMode={this.setDarkMode.bind(this)}
                      darkMode={this.state.darkMode} />
                  )} />

                  <AuthRoute exact path="/factions" Component={FactionList} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute exact path="/campaigns" Component={CampaignList} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute path="/campaigns/add/:id?" Component={CampaignCreation} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute exact path="/characters" Component={CharacterList} requiredRoles={Auth.userRoles.users} />
                  {/* <AuthRoute path="/characters/:id" Component={CharacterProfile} requiredRoles={Auth.userRoles.users} /> */}
                  <AuthRoute exact path="/npcs" Component={NpcList} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute path="/npc/add/:id?" Component={NpcCreation} requiredRoles={Auth.userRoles.users} />
                  {/* <AuthRoute exact path="/campaigns" Component={CampaignScreen} requiredRoles={Auth.userRoles.users} /> */}
                  <AuthRoute exact path="/bestiary" Component={MonsterList} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute path="/bestiary/add/:id?" Component={MonsterCreation} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute exact path="/map" Component={MapScreen} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute exact path="/location/:id" Component={Location} requiredRoles={Auth.userRoles.users} />
                  <AuthRoute path="/alignments" Component={AlignmentScreen} requiredRoles={Auth.userRoles.admins} />
                  <AuthRoute path="/initiative" Component={InitiativeTracker} requiredRoles={Auth.userRoles.admins} />
                  <AuthRoute exact path="/" Component={CharacterList} requiredRoles={Auth.userRoles.users} />

                  <Route path="/characters/:id" component={CharacterProfile} />
                  <Route exact path="/npc/:id" component={NpcProfile} />
                  <Route exact path="/bestiary/:id" component={MonsterProfile} />
                  <Route exact path="/campaigns/:id" component={CampaignProfile} />
                  <Route exact path="/factions/:id" component={FactionProfile} />
                  <Route exact path="/explore" component={ExploreScreen} />
                </Switch>
              </Box>
            </Router>
          </ThemeProvider>
        </ApolloProvider>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App);