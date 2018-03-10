import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Container, Menu } from 'semantic-ui-react';

import userActions from '../../framework/actions/user';
import Footer from '../../components/Footer';

import './index.scss';

export class Home extends React.PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;

    return (
      <Segment inverted vertical textAlign="center">
        <Container>
          <Menu size="massive" borderless inverted>
            <Menu.Item header>
            StratoTalks
            </Menu.Item>
            <div className="right item">
              <div className="ui massive secondary inverted pointing menu">
                <a className="active item">Домой</a><a className="item">Подробнее</a><a className="item" href="https://stratoplan.ru" target="_blank">Стратоплан</a>
              </div>
            </div>
          </Menu>
        </Container>
        <div className="ui text container">
          <h1 className="ui inverted header">
          Проверь свои навыки.
          </h1>
          <p>
          На этом ресурсе вы можете попрактиковаться с коллегами в переговорных поединках с заданными условиями.
          </p>
          <Button size="massive" onClick={this.props.login} loading={user.status === 'running'}>Войти</Button>
        </div>
        <Footer />
      </Segment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login: userActions.userLoginRequest })(Home);
