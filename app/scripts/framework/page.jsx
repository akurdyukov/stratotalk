import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from '../modules/history';
import RoutePublic from '../modules/RoutePublic';
import RoutePrivate from '../modules/RoutePrivate';

import config from '../config';
import { showAlert } from '../actions';

import Home from '../features/Home';
import Private from '../features/Private';
import NotFound from '../features/NotFound';
import Scenarios from '../features/Scenarios';
import GameCreator from '../features/GameCreator';

import SystemAlerts from '../components/SystemAlerts';

import { ROUTE_PRIVATE, ROUTE_SCENARIOS, ROUTE_ROOT, ROUTE_GAME_CREATOR } from '../constants/routes';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch, user } = this.props;
    const { user: nextUser } = nextProps;

    /* istanbul ignore else */
    if (!user.isAuthenticated && nextUser.isAuthenticated) {
      dispatch(showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' }));
    }
  }

  render() {
    const { app, dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en-US' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'en-US' }}
          />
          <main className="app__main">
            <Switch>
              <RoutePublic isAuthenticated={user.isAuthenticated} path={ROUTE_ROOT} exact component={Home} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path={ROUTE_PRIVATE} exact component={Private} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path={ROUTE_SCENARIOS} component={Scenarios} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path={ROUTE_GAME_CREATOR} component={GameCreator} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
