import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './main.css';

import { addItem, changeChoosedItem, setItemsList } from '../../actions/actions';

class Main extends Component {
    state = {
        newItemName: '',
    };

    componentDidMount() {
        axios.get('/api/servicelist')
            .then((res) => {
                this.props.setItemsList(res.data);
            });
    }

    render () {
        return (
            <div>
                <h1>Main</h1>
                <ul>
                    {this.props.list.map((item, id) => {
                        return <li key={id} onClick={() => this.changeChoosedItem(item.id)}>{item.name}</li>
                    })}
                </ul>
                <input type="text" value={this.state.newItemName}  onChange={this.handleChange}/>
                <button onClick={this.addNewItem}>Add new item</button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ newItemName: e.target.value });
    }

    addNewItem = () => {
        axios.post('/api/addnewitem', { name: this.state.newItemName })
            .then((res) => {
                this.props.addItem({ name: this.state.newItemName });
                this.setState({ newItemName: '' });
            });
    }

    changeChoosedItem = (id) => {
        axios.get('/api/getadditionaliteminfo/' + id)
            .then((res) => {
                this.props.changeChoosedItem(res.data);
                this.props.history.push('/info');
            });
    }
}

function mapStateToProps (state) {
    return {
        list: state.list,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addItem: (newItem) => dispatch(addItem(newItem)),
        changeChoosedItem: (newItem) => dispatch(changeChoosedItem(newItem)),
        setItemsList: (newList) => dispatch(setItemsList(newList)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);