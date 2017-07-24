import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Row extends Component {

    goToUrl(url) {
        document.location.href = url
    }

    deleteItem(id, event) {
        event.stopPropagation();
        this.props.deleteItem(id);
    }

    render() {
        let count = this.props.items.length;

        let className = '';
        if(count < 6) {
            className = 'col-xs-offset-' + (6 - count);
        }

        return (
            <div className="row">
                {
                    this.props.items.map((item, index) =>
                        <div
                            onClick={this.goToUrl.bind(this, item.url)}
                            className={"col-xs-2 " + item.class + " " + (index === 0 ? className : '')}
                            key={item.id}>

                            <h3>{item.name}</h3>

                            <button
                                className="btn btn-danger remove"
                                onClick={(e) => this.deleteItem(item.id, e)}>
                                remove
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
}

Row.propTypes = {
    items: PropTypes.array,
    deleteItem: PropTypes.func,
};

export default Row;
