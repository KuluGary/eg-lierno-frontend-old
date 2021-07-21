import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import { addProfile } from "shared/actions/index";
import { connect } from "react-redux";
import { compose } from "redux";
import { ME_QUERY } from "helpers/graphql/queries/user";
import { apolloClient } from "./helpers/api";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AlignmentScreen from "./components/AlignmentScreen/AlignmentScreen";
import Location from "./components/Location/Location";
import InitiativeTracker from "./components/InitiativeTracker/InitiativeTracker";
import Update from "./components/Update/Update";
import Package from "../package.json";
import "react-toastify/dist/ReactToastify.css";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";
import { theme } from "./shared/theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import ExploreScreen from "./pages/Explore/ExploreScreen";

// pages
import ProfileScreen from "./pages/Profile/ProfileScreen";
import Login from "./pages/Auth/Login";
import ValidateAccount from "./pages/Auth/ValidateAccount";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import Register from "./pages/Auth/Register";
import MapScreen from "./pages/Map/MapScreen";
import CampaignCreation from "./pages/Campaign/CampaignCreation/CampaignCreation";
import CampaignList from "./pages/Campaign/CampaignList/CampaignList";
import CampaignProfile from "./pages/Campaign/CampaignProfile/CampaignProfile";
import CharacterProfile from "./pages/Character/CharacterProfile/CharacterProfile";
import CharacterList from "./pages/Character/CharacterList/CharacterList";
import FactionList from "./pages/Faction/FactionList/FactionList";
import FactionProfile from "./pages/Faction/FactionProfile/FactionProfile";
import NpcCreation from "./pages/Creature/CreatureCreation/CreatureCreation";
import NpcProfile from "./pages/Creature/CreatureProfile/CreatureProfile";
import NpcList from "./pages/Creature/CreatureList/CreatureList";
import "suneditor/dist/css/suneditor.min.css";

const electron = window?.process?.type && window.require("electron");
const ipcRenderer = electron && electron.ipcRenderer;

const styles = (theme) => ({
  "@font-face": {
    "font-family": "JSL Ancient",
    src: 'local("JSL Ancient"), url("assets/fonts/jacnient.ttf") format("truetype")',
  },
  "@global": {
    b: {
      fontWeight: 500,
    },
    strong: {
      fontWeight: 500,
    },
    "::-webkit-scrollbar": {
      width: "6px",
      opacity: 0.5,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: "20px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.5)",
      borderRadius: "20px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
    ".se-component.se-image-container.__se__float-left": {
      margin: 10,
    },
    ".sun-editor": {
      height: "100% !important",
    },
    ".se-wrapper": {
      height: "85% !important",
    },
  },
});

toast.configure();

const mapStateToProps = (state) => ({ profile: state.profile });

const mapDispatchToProps = (dispatch) => ({
  addProfile: (profile) => dispatch(addProfile(profile)),
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isLoading: true,
      drawerOpen: false,
      update: false,
      downloaded: false,
      updateVersion: "0.0.0",
      darkMode: localStorage.getItem("theme") || false,
    };
  }

  componentDidMount() {
    if (window?.process?.type) {
      ipcRenderer.on("update_available", () => {
        this.setState({
          update: true,
        });
      });

      ipcRenderer.on("update_downloaded", () => {
        ipcRenderer.removeAllListeners("update_downloaded");
        this.setState({
          downloaded: true,
        });
      });

      ipcRenderer.on("error", (e) => {
        this.setState({
          status: e,
        });
      });
    }

    this.checkUserAuthentication().then((data) => {
      if (data.me.user) {
        this.props.addProfile(data.me.user);
      }

      this.setState({
        isAuthenticated: !!data.me.user,
        isLoading: false,
      });
    });

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    if (this.state.darkMode) {
      require("components/HTMLEditor/css/darkTheme.css");
    } else {
      require("components/HTMLEditor/css/lightTheme.css");
    }
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  handleDrawerOpen() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  async checkUserAuthentication() {
    const { data } = await apolloClient.query({ query: ME_QUERY });

    return data;
  }

  authenticated() {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated,
    });
  }

  restartApp() {
    ipcRenderer.send("restart_app");
  }

  closeNotification() {
    this.setState({
      update: false,
    });
  }

  setDarkMode() {
    this.setState(
      {
        darkMode: !this.state.darkMode,
      },
      () => localStorage.setItem("theme", this.state.darkMode),
    );
  }

  updateDimensions() {
    this.setState({
      innerWidth: window.innerWidth,
    });
  }

  render() {
    let muiTheme = createMuiTheme({
      palette: {
        type: this.state.darkMode ? "dark" : "light",
      },
      ...theme(this.state.darkMode),
    });

    return (
      <>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Router>
              <Header
                mode={this.state.darkMode}
                open={this.state.drawerOpen}
                isAuthenticated={this.state.isAuthenticated}
                handleDrawer={this.handleDrawerOpen.bind(this)}
                authenticated={this.authenticated.bind(this)}
                setDarkMode={this.setDarkMode.bind(this)}
                darkMode={this.state.darkMode}
              />

              {this.state.isAuthenticated && (
                <Sidebar open={this.state.drawerOpen} handleDrawer={this.handleDrawerOpen.bind(this)} />
              )}

              <Update
                update={this.state.update}
                restartApp={this.restartApp}
                downloaded={this.state.downloaded}
                status={this.state.status}
                closeNotification={this.closeNotification.bind(this)}
              />

              <Box
                style={{
                  maxWidth: 1440,
                  margin:
                    this.state.innerWidth > 1440
                      ? "5rem auto 0 auto"
                      : this.state.innerWidth < 512
                      ? "5rem 1rem"
                      : "5rem 1rem 1rem 5rem",
                }}
              >
                <Switch>
                  <Route
                    path="/login"
                    render={() => (
                      <Login
                        isAuthenticated={this.state.isAuthenticated}
                        version={this.state.uploadVersion || Package.version}
                        authenticate={this.authenticated.bind(this)}
                      />
                    )}
                  />
                  <Route path="/activate/:token" component={ValidateAccount} />
                  <Route path="/recover/:token?" component={RecoverPassword} />
                  <Route path="/register" component={Register} />
                  <Route
                    path="/profile"
                    render={() => (
                      <ProfileScreen setDarkMode={this.setDarkMode.bind(this)} darkMode={this.state.darkMode} />
                    )}
                  />

                  <Route path="/characters/advanced/:id" component={CharacterProfile} />
                  <Route path="/characters/simple/:id" component={CharacterProfile} />

                  <Route exact path="/campaigns/:id" component={CampaignProfile} />
                  <Route exact path="/factions/:id" component={FactionProfile} />

                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/factions"
                    Component={FactionList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/campaigns"
                    Component={CampaignList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    path="/campaigns/add/:id?"
                    Component={CampaignCreation}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/characters"
                    Component={CharacterList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/npcs"
                    Component={NpcList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    path="/npc/add/:id?"
                    Component={NpcCreation}
                  />
                  <Route exact path="/npc/:id" component={NpcProfile} />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/bestiary"
                    Component={NpcList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    path="/bestiary/add/:id?"
                    Component={NpcCreation}
                  />
                  <Route exact path="/bestiary/:id" component={NpcProfile} />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/map"
                    Component={MapScreen}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/location/:id"
                    Component={Location}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    path="/alignments"
                    Component={AlignmentScreen}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    path="/initiative"
                    Component={InitiativeTracker}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/"
                    Component={CharacterList}
                  />
                  <AuthRoute
                    isLoading={this.state.isLoading}
                    isAuthenticated={this.state.isAuthenticated}
                    exact
                    path="/explore"
                    Component={ExploreScreen}
                  />
                </Switch>
              </Box>
            </Router>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(App);
