import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lockerinformationscreen from '../screen/Lockerinformationscreen';
import Loginscreen from '../screen/Loginscreen';
export default class Routerchlid extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Loginscreen} />
                <Route exact path="/login" component={Lockerinformationscreen} />

            </div>
        )
    }
}
