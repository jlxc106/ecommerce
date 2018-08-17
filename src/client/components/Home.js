import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Card, Row, Button } from 'react-materialize';

import * as actions from '../actions';
import Payments from './Payments';

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
        let color = ['teal', 'red darken-1'];
        const { name, description, price, quantity, imageUrl } = product;
        console.log(product);
        return (
          <Card
            onClick={() => console.log(1)}
            key={index}
            product={product}
            className="border-teal"
            textClassName="black-text"
            title={name}
            actions={[
              <Link
                key={index}
                to="/product_page"
              >{`${name} product page`}</Link>
            ]}
          >
            {description}
            <div className='contain-payment'>
              <Payments product={product} />
            </div>
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
