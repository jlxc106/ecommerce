import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Card, Row } from 'react-materialize';

import * as actions from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllProducts();
  }

  //   renderAdminLink() {
  //     if (this.props.auth && this.props.auth.isAdmin) {
  //       return <Link to="admin">GO TO ADMIN PANEL</Link>;
  //     }
  //     return null;
  //   }

  renderProductList() {
    const { allProducts } = this.props;
    if (allProducts && allProducts.length > 0) {
      return allProducts.map((product, index) => {
        const { name, description, price, quantity, imageUrl } = product;
        console.log(product);
        return (
          <Card
            key={index}
            product={product}
            className="darken-1 blue-grey"
            textClassName="white-text"
            title={name}
            actions={[
              <Link
                key={index}
                to="/product_page"
              >{`${name} product page`}</Link>
            ]}
          >
            {description}
          </Card>
        );
      });
    }
    return <div>Loading products...</div>;
  }

  render() {
    console.log(this.props.auth);
    return (
      <div className="home-div div-horizontal-margin">
        <Row>
          <Col offset="l1 xl1 m1" l={10} xl={10} m={10} s={12}>
            {this.renderProductList()}
            {/* <Card
            className="blue darken-1"
            textClassName="white-text"
            title="Card title"
            actions={[<Link to="/">This is a link</Link>]}
            // actions={[<a key="1" href="/">This is a link</a>]}
          >
            I am a very simple card.
          </Card>
          <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            title="Card title"
            actions={[<Link to="/">This is a link</Link>]}
            // actions={[<a key="1" href="/">This is a link</a>]}
          >
            I am a very simple card.
          </Card>
          <Card
            className="green darken-1"
            textClassName="white-text"
            title="Card title"
            actions={[<Link to="/">This is a link</Link>]}
            // actions={[<a key="1" href="/">This is a link</a>]}
          >
            I am a very simple card.
          </Card>
          <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            title="Card title"
            actions={[<Link to="/">This is a link</Link>]}
            // actions={[<a key="1" href="/">This is a link</a>]}
          >
            I am a very simple card.
          </Card> */}
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, allProducts: state.product.entire };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
