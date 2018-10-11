import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Info extends Component {
    render () {
        return (
            <div>
                <h1>Name: {this.props.choosedItem.name}</h1>
                <p>Additional info: {this.props.choosedItem.info}</p>
                <Link to="/">Go back to main</Link>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        choosedItem: state.choosedItem,
    }
}

export default connect(mapStateToProps)(Info);