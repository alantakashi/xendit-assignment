import React, {
  memo
} from 'react';
import PropTypes from 'prop-types';
import {
  useSelector, 
  shallowEqual,
} from 'react-redux';
import { 
  Route,
  Redirect
} from 'react-router-dom';

const AppRoute = ({
  children,
  auth,
  path,
  exact
}) => {
  const loginUser = useSelector(({user}) => user.loginUser, shallowEqual);
  return (
    <Route
      path={path}
      exact={exact}
      render={matchProps=> {
        return (
          auth && !loginUser ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: matchProps.location }
              }}
            />
          ) : ( children )
        )
      }}
    />
  )
}

AppRoute.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
}

export default memo(AppRoute);