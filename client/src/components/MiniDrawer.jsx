import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HelpIcon from '@material-ui/icons/Help';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import {Link} from 'react-router-dom';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(0);

  const handleDrawer = () => {
    setToggle(1-toggle);
  };
  return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: toggle,
          [classes.drawerClose]: !toggle,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: toggle,
            [classes.drawerClose]: !toggle,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {!toggle? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List component="nav"  aria-label="home reports helpline bedcount">
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="secondary" fontSize='large' />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          </Link>
          <Link to={"/reports"}>
          <ListItem button>
            <ListItemIcon>
              <AssessmentIcon color="secondary" fontSize='large'/>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          </Link>
          <Link to={"helpline"}>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon color="secondary" fontSize='large'to="helpline" />
            </ListItemIcon>
            <ListItemText primary="Helpline" />
          </ListItem>
          </Link>
          <Link to={"bedcount"}>
          <ListItem button>
            <ListItemIcon>
              <LocalHotelIcon color="secondary" fontSize='large' to=""/>
            </ListItemIcon>
            <ListItemText primary="Bedcount" />
          </ListItem>
          </Link>
        </List>
      </Drawer>
  );
}
