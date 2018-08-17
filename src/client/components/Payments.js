import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { Button, Icon } from 'react-materialize';

class Payments extends Component{
    render(){
        return(
            <StripeCheckout
            name="Stripe"
            description="Add 10 cents for 5 credits"
            amount={10}
            token={token=> this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {/* <button className="btn">Add Credits</button> */}
            <Button className="blue">Add Credits<Icon left>add</Icon></Button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);