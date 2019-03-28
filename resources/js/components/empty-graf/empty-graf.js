import React, {Component} from 'react'

import './empty-graf.scss'

class EmptyGraf extends Component {
    render() {
        return (
            <div className="emptyGraf">
                <img src="/logo.png" alt="logo" width="80%"/>
            </div>
        );
    }
}

export default EmptyGraf;
