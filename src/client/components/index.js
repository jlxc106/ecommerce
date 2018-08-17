import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import SignIn from './SignIn';
import Header from './Header';
import Home from './Home';
import Account from './Account';
import SignUp from './SignUp';
import * as actions from '../actions/index';
import AdminPanel from './AdminPanel';
import AdminRoute from './hoc/AdminRoute';
import UserRoute from './hoc/UserRoute';
import ProductPage from './ProductPage';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    console.log(this.props);
    const history = createHistory();
    return (
      <Router>
        <div>
          <Header auth={this.props.auth} history={history} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <UserRoute
              path="/my_account"
              auth={this.props.auth}
              component={Account}
            />
            <AdminRoute
              path="/admin"
              auth={this.props.auth}
              component={AdminPanel}
            />
            <Route path="/product_page" component={ProductPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
