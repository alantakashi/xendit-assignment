import React, {
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { 
  createStyles,
  makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Header from './header';

const useStyles =  makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  wrapper: {
    flex: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}))

const Layout = ({ children, header }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      { (header) ? <Header /> : ''}
      <Toolbar id="back-to-top-anchor" />
      <Container className={classes.wrapper}>
        { children }
      </Container>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default memo(Layout);