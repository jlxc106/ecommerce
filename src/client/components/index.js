import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';

import {getCurrentUser} from '../actions/index';
import Header from './Header';
// import { bindActionCreators } from '../../../../../.cache/typescript/2.9/node_modules/redux';


class App extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getCurrentUser();
    }


    render(){
        console.log(this.props);

        return(
            <div>
                <Header auth={this.props.auth}/>
                Main Page for Ecommerce Website
            </div>
        )
    }
}


function mapStateToProps({auth}){
    return {auth};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getCurrentUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);