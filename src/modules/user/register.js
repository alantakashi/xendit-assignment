import React, {
  memo,
  useState,
  useEffect
} from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
	Box,
	Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { firebaseApp } from '../../utils/firebase'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = () => {
	const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const [values, setValues] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(user.user) {
      history.push('/')
    }
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const { email, password } = values

    if (email && password) {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        dispatch({
          type: "USER_REGISTER",
          payload: userCredential.user.email
        })
        history.push('/')
      }).catch((error) => {
        setMessage('Something went wrong, please try again.')
        setOpen(true)
      });
    } else {
      setMessage('Please enter your email address or password')
      setOpen(true)
    }

    // if(!email || !password) {
    //   setMessage('Please enter your email address or password')
    //   setOpen(true)
    // } else {
    //   // dispatch(Actions.REGISTER_REQUEST({ email, password }))
    //   fireAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
    //     setMessage('Something went wrong, please try again.')
    //     setOpen(true)
    //   })
    // }
  }

  const handleClose = (event, reason) => {
    setOpen(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Typography component={NavLink} to="/login" variant="body2">
                {"Have an account? Login here"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center" component={NavLink} to="/">
		      Back to home
		    </Typography>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  )
}

export default memo(Login);