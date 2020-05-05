import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExploreIcon from '@material-ui/icons/Explore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PetsIcon from '@material-ui/icons/Pets';
import MapIcon from '@material-ui/icons/Map';
import Auth from '../../helpers/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Auth.hasRole("CHARACTER_ACCESS") && <Link to="/characters" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Personajes'} />
            </ListItem>
          </Link>}
          {Auth.hasRole("NPC_ACCESS") && <Link to="/npcs" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'PNJs'} />
            </ListItem>
          </Link>}
          {Auth.hasRole("BESTIARY_ACCESS") && <Link to="/bestiary" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary={'Bestiario'} />
            </ListItem>
          </Link>}
          {Auth.hasRole("MAP_ACCESS") &&
            <Link to="/map" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary={'Mapa'} />
              </ListItem>
            </Link>}
          {/* {Auth.hasRole("ALIGNMENT_ACCESS") && <Link to="/alignments" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary={'Alignments'} />
            </ListItem>
          </Link>} */}
          {Auth.hasRole("INITIATIVE_ACCESS") && <Link to="/initiative" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={'Iniciativa'} />
            </ListItem>
          </Link>}
        </List>
      </Drawer>
    </div>
  );
}