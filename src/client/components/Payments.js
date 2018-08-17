import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { Button, Icon } from 'react-materialize';

class Payments extends Component{
    render(){
        const {description, name, price, quantity} = this.props.product;
        console.log()
        return(
            <StripeCheckout
            name={`Buy ${name}`}
            description={description}
            amount={price}
            token={token=> this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {/* <button className="btn">Add Credits</button> */}
            <Button className="blue">Purchase<Icon left>add</Icon></Button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);