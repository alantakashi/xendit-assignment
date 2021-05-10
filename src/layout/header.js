import React, {
  memo
} from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { firebaseApp } from '../utils/firebase'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  url: {
    display: 'flex',
    color: '#fff'
  },
  button: {
    color: '#fff'
  },
  authUser: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const Header = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    firebaseApp.auth().signOut()
    dispatch({
      type: "USER_LOGOUT",
      payload: null
    })
  }

  const LoginUser = ({user: { email }}) => {
    return (
      <div className={classes.authUser}>
        <Typography variant="body2">{email}</Typography>
        <IconButton className={classes.button} onClick={handleLogout}><PowerSettingsNew/></IconButton>
      </div>
    )
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <List className={classes.url}>
          <ListItem button component={NavLink} to="/" activeClassName="Mui-selected" exact>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={NavLink} to="/favourite" activeClassName="Mui-selected" exact>
            <ListItemText primary="Favourite" />
          </ListItem>
          <ListItem button component={NavLink} to="/newsletter" activeClassName="Mui-selected" exact>
            <ListItemText primary="Newsletter" />
          </ListItem>
        </List>
        
        <div className={classes.grow} />
        {user.uid ? <LoginUser user={user}/> : <Button component={NavLink} to="/login" className={classes.button}>LOGIN</Button> }
      </Toolbar>
    </AppBar>      
  )
}

export default memo(Header);