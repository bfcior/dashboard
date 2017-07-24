import React, {Component} from 'react';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';
import Dashboard from './Components/Dashboard'
import Manager from './Components/Manager'

/**
 * 2DO - proptypes
 * Walidacja Manager.js
 */

class App extends Component {

    constructor(props) {
        super(props);

        this.addItem.bind(this);

        this.state = {
            items: [],
            id: 1
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentWillMount() {

        let items = JSON.parse(localStorage.getItem('items'));
        let id = localStorage.getItem('id');

        if(items === null ) {
            items = [];

            for(let i = 1; i <= 12; i++) {
                items.push({id: i, name: `Item nr ${i}`, url: 'https://www.google.com', class: `item${_.random(1,5)}`});
            }

            localStorage.setItem('items', JSON.stringify(items));

            id = items.length;
            localStorage.setItem('id', id);
        }

        this.setState({
            items,
            id
        });
    }

    deleteItem(key) {

        let items = this.state.items.filter( item => item.id !== key );
        this.setState(prevState => ({
            items
        }));

        localStorage.setItem('items', JSON.stringify(items));
    }

    addItem(item) {
        item['id'] = parseInt(this.state.id, 10) + 1;
        item['name'] = 'Item nr ' + item['id'];

        let items = [...this.state.items, item];
        this.setState({
            items,
            id: item['id']
        });

        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('id', item['id']);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>

                <Manager addItem={this.addItem} />
                <Dashboard items={this.state.items} deleteItem={this.deleteItem} />
            </div>
        );
    }
}

export default App;
