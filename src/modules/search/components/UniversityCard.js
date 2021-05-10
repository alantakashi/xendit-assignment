import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	CardContent,
	CardActions,
	Divider,
	IconButton,
  Link,
  Snackbar,
  Typography
} from '@material-ui/core'
import { Close, Favorite, FavoriteBorder } from '@material-ui/icons'
import { firebaseApp } from '../../../utils/firebase'

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  content: {
  	minHeight: '15vh'
  }
})

const UniversityCard = ({prop: { name, country, web_pages, isFavorite }}) => {
	const classes = useStyles()
	const data = useSelector(state => state.universities)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const { uid } = user

	const handleClose = (event, reason) => {
    setOpen(false)
  }

	const updateFavorite = () => {
		const dataToSave = { uid, name, country, web_pages, isFavorite: true }

    let dataIndex = user.favorites.findIndex(f => {
      return f.name === name
    })

    if (dataIndex === -1) {
    	firebaseApp.firestore().collection("favorites").add(dataToSave).then((docRef) => {
				dispatch({
					type: "ADD_FAVOURITE",
					payload: { ...dataToSave, doc:docRef.id }
				})
			}).catch((error) => {
				console.error("Error adding document: ", error);
			});				
    }
	}
	
	return (
		<div>
			<Card variant="outlined" className={classes.card}>
				<CardContent className={classes.content}>
					<Typography variant="subtitle2" gutterBottom>{name}</Typography>
					<Typography variant="body2" gutterBottom>{country}</Typography>
				</CardContent>
				<Divider/>
				<CardActions disableSpacing>
	        <IconButton aria-label="add to favorites" onClick={updateFavorite}>
	          {isFavorite ? <Favorite /> : <FavoriteBorder />}
	        </IconButton>
	        <Typography variant="caption"><Link href={web_pages} target="_blank" rel="noopener" color="secondary">Visit website</Link></Typography>
	      </CardActions>
			</Card>

			<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message="Please login before add university to favorite list"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
		</div>
	)
}

export default memo(UniversityCard)