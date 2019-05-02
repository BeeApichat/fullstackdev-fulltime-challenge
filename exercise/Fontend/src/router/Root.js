import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import App from '../App'
import Routerchlid from '../router/Routerchlid'
export default class Root extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routerchlid />
                </Router>
            </div>
        )
    }
}
