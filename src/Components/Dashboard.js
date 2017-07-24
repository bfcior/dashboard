import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Row from './Row'
import _ from 'lodash';

class Dashboard extends Component {

    deleteItem(key) {
        this.props.deleteItem(key);
    }

    render() {
        return (
            <div className="container-fluid">
                {
                    _.chunk(this.props.items, 6).map(
                        (items, index) => (
                            <Row
                                key={index}
                                values={items}
                                deleteItem={this.deleteItem.bind(this)} />
                        )
                    )
                }
            </div>
        );
    }
}

Dashboard.propTypes = {
    items: PropTypes.array,
    deleteItem: PropTypes.func
};

export default Dashboard;
