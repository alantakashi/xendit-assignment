import React, {
  memo,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  Typography,
  useScrollTrigger,
  Zoom
} from '@material-ui/core'
import { KeyboardArrowUp } from '@material-ui/icons'
import UniversityCard from './components/UniversityCard'
import { firebaseApp } from '../../utils/firebase'

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: '16px 0'
  },
  noresult: {
    padding: '0 16px'
  },
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const SearchResult = (props) => {
  const classes = useStyles()
	const data = useSelector(state => state.universities)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const result = data?.universities.map((uni, index) => {
      return user.favorites.map(async (u, idx) => {
        if (u.name === uni.name) {
          uni.isFavorite = await true
        }
      })
    })
  }, [])

  const NoResult = () => {
    return (
      <div className={classes.noresult}>
        <Typography variant="h5">Hmmm ...</Typography>
        <Typography variant="body2">Couldn't find any matches for you. Try another search</Typography>
      </div>
    )
  }

  return (
    <Container>
      <Button variant="contained" component={NavLink} to="/" color="primary">Back to search</Button>
      <Divider className={classes.divider} />
    	<Grid container spacing={3}>
    		{ !data?.universities.length ? <NoResult /> : data && data?.universities.map((value, index) => {
    			return (
    				<Grid item xs={12} sm={6} md={3} key={index}>
	    				<UniversityCard prop={value} />
		      	</Grid>
  				)
    		})}
      </Grid>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Container>
  )
}

export default memo(SearchResult);