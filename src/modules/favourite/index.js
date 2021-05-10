import React, {
  memo,
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import UniversityCard from '../search/components/UniversityCard'
import { firebaseApp } from '../../utils/firebase'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Favourite = () => {
  const classes = useStyles()
	const user = useSelector(state => state.user)
  const [favorites, setFavorites] = useState()
  const [loading, setLoading] = useState(true)
  const { uid } = user

  useEffect(() => {
    firebaseApp.firestore().collection('favorites')
      .onSnapshot((snapshots) => {
        const favorites = []
        snapshots.forEach((snapshot) => {
          favorites.push({
            country: snapshot.data().country,
            name: snapshot.data().name,
            web_pages: snapshot.data().web_pages,
          })
        })
        setFavorites(favorites)
        setLoading(false)
      })
  }, [])

	const NoResult = () => {
    return (
      <div>
        <Typography>No result found!</Typography>
      </div>
    )
  }

  const Content = () => {
    if (!uid) return <Paper className={classes.paper}><Typography variant="body2">Please login to view your favorite list</Typography></Paper>
    if (loading) return <Paper className={classes.paper}><Typography variant="body2">Fetching your favorite list</Typography></Paper>
    if (!loading && !favorites.length) return <Paper className={classes.paper}><Typography variant="body2">You do not have any favorite university...</Typography></Paper>
    if (!loading && favorites.length) {
      return (
        <Grid container spacing={3}>
          {favorites.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <UniversityCard prop={value} />
            </Grid>
          ))}
        </Grid>
      )
    }
  }

  return (
    <Container>
      {Content()}    	
    </Container>
  )
}

export default memo(Favourite);