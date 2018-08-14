import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import createHistory from "history/createBrowserHistory"

// import {getCurrentUser} from '../actions/index';
import Side_Nav from './Side_Nav';
import SignIn from './SignIn';
import Header from './Header';
import Home from './Home';
import Account from './Account';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }



  render() {
    console.log(this);
    const history = createHistory();

    // console.log('stripe key ', process.env.REACT_APP_STRIPE_KEY);
    // console.log('stripe key ', process.env.NODE_ENV);
    return (
      // <div>
        // <BrowserRouter>
          <div>
            <Header auth={this.props.auth} history={history}/>
            {/* <Side_Nav /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/account" component={Account} />
            </Switch>
          </div>
        // </BrowserRouter>
      // </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({getCurrentUser}, dispatch);
// }

export default connect(
  mapStateToProps,
  actions
)(App);
