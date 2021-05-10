import React, {
  memo,
  useState
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import {
  Container,
  IconButton,
  Snackbar,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

const Home = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleClose = (event, reason) => {
    setOpen(false)
  };
  
  const searchQuery = async (e) => {
    if(e.keyCode === 13) {
      let query = e.target.value
      if(query) {
        return await axios({
          method: 'get',
          url: `http://universities.hipolabs.com/search?name=${query}`,
        }).then((response) => {
          dispatch({
            type: "SEARCH_UNI",
            payload: response.data
          })
          history.push('/search-result')
        });
      }

      setOpen(true)
    }
  }

  return (
    <Container>
      <TextField
        label="SEARCH UNIVERSITY DOMAIN"
        placeholder="eg: Singapore"
        helperText="Press enter to search"
        onKeyDown={searchQuery}
        variant="outlined"
        fullWidth
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message="Search is empty. Please input something"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  )
}

export default memo(Home);