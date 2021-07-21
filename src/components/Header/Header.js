import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import { addProfile, resetStore } from "../../shared/actions/index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUT } from "helpers/graphql/mutations/auth";
import ThemeToggle from "components/ThemeToggle/ThemeToggle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  flex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: "50%",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const mapStateToProps = (state) => {
  return { profile: state.profile, state: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProfile: (profile) => dispatch(addProfile(profile)),
    resetStore: (store) => dispatch(resetStore(store)),
  };
};

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [hasLoggedOut, setLogout] = useState(false);
  const [setLogout] = useMutation(LOGOUT_MUT);
  const [user, setUser] = useState();
  const [avatar] = useState();
  const open = Boolean(anchorEl);
  const { history } = props;

  useEffect(() => {
    if (props.profile && !user) {
      setUser(props.profile);
      setIsLoggedIn(true);
    }
  }, [props.profile, history.location.pathname, props.isAuthenticated]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUser();
    setLogout();
    setIsLoggedIn(false);
    props.history.push("/login");
    props.resetStore();
    handleClose();
    props.authenticated();
    // if (sessionStorage.getItem('token')) {
    //   sessionStorage.removeItem('token')
    // }

    // if (localStorage.getItem('token')) {
    //   localStorage.removeItem('token')
    // }

    // handleClose();
    // setLogout(true);
    // props.authenticated();
    // props.history.push("/login")
    // props.resetStore({});
  };

  return (
    <div className={classes.root}>
      {/* {hasLoggedOut && <Redirect to="/login" />} */}
      <AppBar
        color={props.mode ? "inherit" : "primary"}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawer}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: props.open,
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div className={classes.flex}>
            <Typography variant="h6" noWrap>
              <Link to={"/"} className={classes.link}>
                Lierno
              </Link>
            </Typography>
            <div>
              <ThemeToggle setDarkMode={props.setDarkMode} darkMode={props.darkMode} />
              {isLoggedIn ? (
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {avatar || user?.metadata.avatar ? (
                    <Avatar
                      src={avatar || user?.metadata.avatar}
                      className={classes.avatar}
                      alt={user && user.metadata.first_name + " " + user.metadata.last_name}
                    />
                  ) : (
                    <Avatar
                      className={classes.avatar}
                      alt={user && user.metadata.first_name + " " + user.metadata.last_name}
                    >
                      {user && (user.metadata.first_name + " " + user.metadata.last_name).match(/\b(\w)/g).join("")}
                    </Avatar>
                  )}
                </IconButton>
              ) : (
                <>
                  <Link to={"/register"} style={{ marginRight: "1rem" }} className={classes.link}>
                    <Button>Signup</Button>
                  </Link>
                  <Link to={"/login"} className={classes.link}>
                    <Button variant="outlined">Login</Button>
                  </Link>
                </>
              )}

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    props.history.push("/profile");
                  }}
                >
                  Mi cuenta
                </MenuItem>
                <MenuItem onClick={logout}>Salir</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Header);
