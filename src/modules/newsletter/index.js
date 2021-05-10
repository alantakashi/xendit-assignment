import React, {
  memo,
  useState
} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  IconButton,
  Paper,
  Snackbar,  
  TextField,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));

const Newsletter = () => {
  const classes = useStyles()
	const [open, setOpen] = useState(false)

	const handleClose = (event, reason) => {
    setOpen(false)
  }

	const handleSubscribe = async (e) => {
    if(e.keyCode === 13) {
      let email = e.target.value
      if(email) {
        axios.post('http://localhost:8080/newsletter', email).then(function (response) {
          console.log(response);
        })
      } else {
        setOpen(true)
      }
    }
	}

  return (
    <Container>
      <TextField
        label="Enter your email address"
        helperText="Press enter to subscribe"
        variant="outlined"
        onKeyDown={handleSubscribe}
        fullWidth
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message="Please enter your email address"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <div>
        <Paper className={classes.paper}>
          <Typography variant="body2">This page is calling to the backend http://localhost:8080/newsletter. Please run a separate terminal for the backend through server folder. Email will be saved to users.json</Typography>  
        </Paper>
      </div>
    </Container>
  )
}

export default memo(Newsletter);