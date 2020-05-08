import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
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
import NpcScreen from './components/NpcScreen/NpcScreen';
import NpcProfile from './components/NpcProfile/NpcProfile';
import Reference from './components/Referencia/Referencia';
import Update from './components/Update/Update';
import Package from '../package.json';
import Box from '@material-ui/core/Box';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      hasLoaded: false,
      drawerOpen: false,
      update: false,
      downloaded: false,
      updateVersion: "0.0.0"
    }
  }

  componentDidMount() {
    if (window && window.process && window.process.type) {
      console.log('window', ipcRenderer)
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
    }
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
    ipcRenderer.sent('restart_app')
  }

  closeNotification() {
    this.setState({
      update: false
    })
  }

  render() {
    return (
      <>
        <Router>
          {Auth.loggedIn() &&
            <>
              <Header
                open={this.state.drawerOpen}
                handleDrawer={this.handleDrawerOpen.bind(this)}
                authenticated={this.authenticated.bind(this)} />
              <Sidebar
                open={this.state.drawerOpen}
                handleDrawer={this.handleDrawerOpen.bind(this)} />
            </>}
          <Update
            update={this.state.update}
            restartApp={this.restartApp}
            downloaded={this.state.downloaded}
            closeNotification={this.closeNotification}  />
          <Switch>
            <Route path="/login" render={() => (
              <Login
                version={this.state.uploadVersion || Package.version}
                authenticated={this.authenticated.bind(this)} />
            )} />
            <Box style={{
              margin: '5rem 1rem 1rem 5rem'
            }}>
              <Route path="/register" component={Register} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/character-creation" component={CharacterCreation} />
              {Auth.hasRole("ALIGNMENT_ACCESS") && <Route path="/alignments" component={AlignmentScreen} />}
              {Auth.hasRole("CHARACTER_ACCESS") && <Route path="/characters/:id" component={CharacterProfile} />}
              {Auth.hasRole("CHARACTER_ACCESS") && <Route exact path="/characters" component={CharacterScreen} />}
              {Auth.hasRole("NPC_ACCESS") && <Route exact path="/npcs" component={NpcScreen} />}
              {Auth.hasRole("NPC_ACCESS") && <Route exact path="/npc/:id" component={NpcProfile} />}
              {Auth.hasRole("INITIATIVE_ACCESS") && <Route path="/initiative" component={InitiativeTracker} />}
              {Auth.hasRole("BESTIARY_ACCESS") && <Route path="/bestiary/:id" component={MonsterProfile} />}
              {Auth.hasRole("BESTIARY_ACCESS") && <Route exact path="/bestiary" component={BestiaryScreen} />}
              {Auth.hasRole("MAP_ACCESS") && <Route exact path="/map" component={MapScreen} />}
              {Auth.hasRole("MAP_ACCESS") && <Route exact path="/location/:id" component={Location} />}
              {Auth.hasRole("REFERENCE_ACCESS") && <Route exact path="/reference" component={Reference} />}
              <Route exact path="/" component={HomeScreen} />
            </Box>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App