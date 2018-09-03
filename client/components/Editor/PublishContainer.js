import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Modal from "../modules/Modal";

class PublishContainer extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Modal size={'medium'}
                   triggerId={'open-modal-publish'}
                   modalId={'modal-publish'}
                   modalCloseId={'close-modal-publish'}>
                This is a fucking modal!
            </Modal>
        )
    }
}

PublishContainer.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer)