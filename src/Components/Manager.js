import React, {Component} from 'react';
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types';

class Manager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            url: '',
            picture: 1,
            saveButtonIsDisabled: true
        };
    }

    closeModal() {
        this.setState({
            open: false,
            saveButtonIsDisabled: true
        });
    }

    saveAndClose() {
        this.props.addItem({
            url: this.state.url,
            class: 'item' + this.state.picture
        });

        this.setState({
            open: false,
            url: '',
            picture: 1,
            saveButtonIsDisabled: true
        });
    }

    openModal() {
        this.setState({ open: true })
    }

    validateURL(textval) {
        let urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
    }

    setUrl(event) {
        let url = event.target.value;
        if(url === '' || ! this.validateURL(url)) {
            this.setState({
                saveButtonIsDisabled: true
            });
            return;
        }

        this.setState({
            url,
            saveButtonIsDisabled: false
        });
    }

    setPicture(event) {

        this.setState({
            picture: event.target.value,
            saveButtonIsDisabled: false
        });
    }

    render() {

        const marginStyle = {margin:'10px auto'};

        return (

            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-success" style={marginStyle } onClick={this.openModal.bind(this)}>
                                + Add new item
                            </button>
                        </div>
                    </div>
                </div>

                <Modal
                    show={this.state.open}
                    onHide={this.closeModal.bind(this)}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Add new Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label htmlFor="url">Fill the website</label>
                        <br/>
                        <input type="url" placeholder="https://www.google.com" className="form-control" pattern="https?://.+" id="url" onChange={this.setUrl.bind(this)} />

                        <br/><br/>

                        <label htmlFor="url">Fill the website</label>
                        <br/>
                        <select onChange={this.setPicture.bind(this)} className="form-control">
                            {[1,2,3,4,5].map( (val) => <option key={val} value={val}>{'Image nr ' + (val) }</option> )}
                        </select>

                        <div className="text-center" style={marginStyle}>
                            <button onClick={this.saveAndClose.bind(this)} disabled={this.state.saveButtonIsDisabled} className="btn btn-success btn-lg">Save and Close</button>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={this.closeModal.bind(this)}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Manager.propTypes = {
  addItem: PropTypes.func
};

export default Manager;
