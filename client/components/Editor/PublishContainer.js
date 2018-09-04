import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Modal from "../modules/Modal";
import {Divider, Text} from "../elements";
import {MultiSelect, Select} from "../modules/Select";
import {FlatTextArea} from "../modules/TextArea";
import {ButtonPrimary} from "../modules/Button";

// Thunks
import fetchTypesThunk from '../../thunks/fetchTypesThunk';

class PublishContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: props.types
        }
    }

    componentDidMount() {
        this.props.fetchTypes();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({types: nextProps.types.map((type) => ({value: type._id, text: type.name}))})
    }

    render() {
        return (
            <Modal size={'medium'}
                   triggerId={'open-modal-publish'}
                   modalId={'modal-publish'}
                   modalCloseId={'close-modal-publish'}>
                <h2>Publish</h2>
                <Divider />
                <Text>What type of work is this?</Text>
                <Select placeholder="Type of work"
                        sId={'s-publish'}
                        dId={'d-publish'}
                        spanId={'span-publish'}
                        options={this.state.types}/>
                <Text>Make this story easier to find by adding some topics (up to 3):</Text>
                <MultiSelect dId={'d-multi-publish'}
                             iId={'i-multi-publish'}
                             options={[{text: 'abc', value:'abc'}, {text: 'bcd', value:'bcd'}, {text: 'cef', value:'cef'}]}/>
                <Text>Tell readers what this work is about with a brief description (140 character max):</Text>
                <FlatTextArea rows={2}/>
                <ButtonPrimary style={{marginLeft: 'auto'}}>
                    Publish
                </ButtonPrimary>
            </Modal>
        )
    }
}

PublishContainer.propTypes = {
    fetchTypes: PropTypes.func,
    types: PropTypes.array
};

const mapStateToProps = (state) => ({
    types: state.editReducer.types
});

const mapDispatchToProps = (dispatch) => ({
    fetchTypes: () => dispatch(fetchTypesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer)