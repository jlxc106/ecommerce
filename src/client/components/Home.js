import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderAdminLink() {
    if (this.props.auth && this.props.auth.isAdmin) {
      return <Link to="admin">GO TO ADMIN PANEL</Link>;
    }
    return null;
  }

  render() {
    console.log(this.props.auth);
    return (
      <div className="home-div div-horizontal-margin">
        Home Component to be HERE
        <hr />
        {/* {this.renderAdminLink()} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);
