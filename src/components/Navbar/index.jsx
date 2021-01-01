import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Box, Tooltip } from '@material-ui/core';
// import InputBase from '@material-ui/core/InputBase';
import CollectionsIcon from '@material-ui/icons/Collections';
// import SearchIcon from '@material-ui/icons/Search';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { logOutAction } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    logOutAction(dispatch, history);
    setAnchorEl(null);
  };

  const navOptions = () => {
    const auth = <>
      <Box mx={1}>
        <Tooltip title="profile">
          <IconButton
            onClick={() => {
              history.push('/profile');
            }}
            color="inherit"
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box mx={1}>
        <Tooltip title="FeedPosts">
          <IconButton
            onClick={() => {
              history.push('/myFollowingPosts');
            }}
            color="inherit"
          >
            <CollectionsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box mx={1}>
        <Tooltip title="Create">
          <IconButton
            onClick={() => {
              history.push('/createPost');
            }}
            color="inherit"
          >
            < AddAPhotoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box mx={1}>
        <Tooltip title="Account">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <ArrowDropDownIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            history.push('/profile');
          }}>
            Profile
          </MenuItem>
          <MenuItem onClick={logout}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>

    const notAuth = <Box mx={1}>
        <Tooltip title="SIGN IN">
          <IconButton
            onClick={() => {
              history.push('/signin');
            }}
            color="inherit"
          >
            < LockOpenIcon />
          </IconButton>
        </Tooltip>
    </Box>

    if(isAuthenticated){
      return auth;
    }
    return notAuth;
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              history.push('/');
            }}
          >
            <Avatar src="https://i.pinimg.com/originals/63/9b/3d/639b3dafb544d6f061fcddd2d6686ddb.png" />
          </IconButton>
          <Box className={classes.title}>
            <div onClick={() => { history.push('/') }}
              style={{ fontFamily: "Grand Hotel", fontSize: 30, cursor: "pointer" }}>
              Instagram
              </div>
          </Box>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          {navOptions()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
