import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Footer from '../../components/Footer';
import { ROUTE_ROOT } from '../../constants/routes';

class NotFound extends React.PureComponent {
  static propTypes = {
    goHome: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Segment inverted vertical textAlign="center">
        <div className="ui container">
          <div className="ui massive borderless inverted menu">
            <h1 className="header item">
          StratoTalks
            </h1>
            <div className="right item">
              <div className="ui massive secondary inverted pointing menu">
                <a className="item">Домой</a><a className="item">Подробнее</a><a className="item" href="https://stratoplan.ru" target="_blank">Стратоплан</a>
              </div>
            </div>
          </div>
        </div>
        <div className="ui text container">
          <h1 className="ui inverted header">
            404
          </h1>
          <p>
            Что-то пошло не так. Наверное, этой страницы нет.
          </p>
          <Button size="massive" onClick={this.props.goHome}>Вернуться</Button>
        </div>
        <Footer />
      </Segment>
    );
  }
}

export default connect(null, { 
  goHome: () => push(ROUTE_ROOT),
})(NotFound);
