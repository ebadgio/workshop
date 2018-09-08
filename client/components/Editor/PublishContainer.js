import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Modal from "../modules/Modal";
import {Divider, Text, Note} from "../elements";
import {MultiSelect, Select} from "../modules/Select";
import {FlatTextArea} from "../modules/TextArea";
import {ButtonPrimary, ButtonDisabled} from "../modules/Button";

// Thunks
import fetchTypesThunk from '../../thunks/fetchTypesThunk';
import fetchTopicsThunk from '../../thunks/fetchTopicsThunk';

class PublishContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: props.types,
            numCharacters: 0,
            hasType: false,
            type: '',
            topics: props.topics,
            hasDescription: false
        }
    }

    componentDidMount() {
        this.props.fetchTypes();
        this.props.fetchTopics();
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.types.length === 0) {
            this.setState({types: nextProps.types.map((type) => ({value: type._id, text: type.name}))})
        }

        if (this.state.topics.length === 0) {
            this.setState({topics: nextProps.topics.map((topic) => ({value: topic._id, text: topic.name}))})
        }

    }

    onSelectBasic(option) {
        console.log('selected', option);
        this.setState({hasType: true, type: option._id})
    }

    onSelectMulti(option) {
        console.log('selected multi', option);
        this.setState({topics: this.state.topics.concat([option._id])});
    }

    onRemove(option) {
        console.log('removed', option);
        this.setState({topics: this.state.topics.filter((topic) => topic !== option._id)});
    }

    onChangeText(e) {
        const length = e.target.value.length;
        this.setState({numCharacters: length, hasDescription: length > 0 });
    }

    publish() {
        this.props.publish(this.state.type, this.state.topics);
    }

    render() {
        return (
            <Modal size={'medium'}
                   triggerId={'open-modal-publish'}
                   modalId={'modal-publish'}
                   style={{paddingBottom: 0}}
                   modalCloseId={'close-modal-publish'}>
                <h2>Publish</h2>
                <Divider />
                <Text>*What type of work is this?</Text>
                <Select placeholder="Type of work"
                        sId={'s-publish'}
                        dId={'d-publish'}
                        spanId={'span-publish'}
                        onSelect={(option) => this.onSelectBasic(option)}
                        options={this.state.types}/>
                <Text>
                    Make this story easier to find by adding some topics (up to 3):
                </Text>
                <MultiSelect dId={'d-multi-publish'}
                             iId={'i-multi-publish'}
                             limit={3}
                             onSelect={(option) => this.onSelectMulti(option)}
                             onRemove={(option) => this.onRemove(option)}
                             options={this.state.topics}/>
                <Text>
                    *Tell readers what this work is about with a brief description (140 character max):
                </Text>
                <Note style={this.state.numCharacters > 140 ? {color: '#ef5350' }: {}}>
                    {this.state.numCharacters} characters
                </Note>
                <FlatTextArea rows={2}
                              onChange={(e) => this.onChangeText(e)}/>
                {this.state.hasType && this.state.hasDescription ?
                    <ButtonPrimary style={{marginLeft: 'auto'}}
                                   onClick={() => this.publish()}>
                        Publish
                    </ButtonPrimary> :
                    <ButtonDisabled style={{marginLeft: 'auto'}}>
                        Publish
                    </ButtonDisabled>
                }
            </Modal>
        )
    }
}

PublishContainer.propTypes = {
    fetchTypes: PropTypes.func,
    fetchTopics: PropTypes.func,
    types: PropTypes.array,
    topics: PropTypes.array,
    publish: PropTypes.func
};

const mapStateToProps = (state) => ({
    types: state.editReducer.types,
    topics: state.editReducer.topics,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTypes: () => dispatch(fetchTypesThunk()),
    fetchTopics: () => dispatch(fetchTopicsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer)