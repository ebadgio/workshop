import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Modal from "../modules/Modal";
import {Divider, Text, Note, RowApart} from "../elements";
import {MultiSelect, Select} from "../modules/Select";
import {FlatTextArea} from "../modules/TextArea";
import {ButtonPrimary, ButtonDisabled} from "../modules/Button";
import {Loader} from "../modules/Loader";

// Thunks
import fetchTypesThunk from '../../thunks/fetchTypesThunk';
import fetchTopicsThunk from '../../thunks/fetchTopicsThunk';
import {push} from "react-router-redux";

class PublishContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: props.types,
            numCharacters: 0,
            hasType: false,
            type: '',
            options: props.topics,
            topics: [],
            hasDescription: false
        }
    }

    componentDidMount() {
        this.props.fetchTypes();
        this.props.fetchTopics();
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.types.length === 0) {
            this.setState({types: nextProps.types.map((type) => ({value: type._id, text: type.name}))});
        }

        if (this.state.options.length === 0) {
            this.setState({options: nextProps.topics.map((topic) => ({value: topic._id, text: topic.name}))});
        }

        if (this.state.waiting) {
            this.setState({saveSuccess: nextProps.publishSuccess, waiting: false});

            if (!nextProps.publishSuccess) {
                document.getElementById('failure-msg').innerText = 'Something went wrong. Please review and try again.'
            } else {
                document.getElementById('close-modal-publish').click();
                this.props.redirect();
            }
        }

    }

    onSelectBasic(option) {
        this.setState({hasType: true, type: option.value});
    }

    onSelectMulti(option) {
        this.setState({topics: this.state.topics.concat([option.value])});
    }

    onRemove(option) {
        this.setState({topics: this.state.topics.filter((topic) => topic !== option.value)});
    }

    onChangeText(e) {
        const length = e.target.value.length;
        this.setState({numCharacters: length, hasDescription: length > 0 });
    }

    publish() {
        const desc = document.getElementById('publish-description').value;
        this.props.publish(this.state.type, this.state.topics, desc);
        this.setState({waiting: true});
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
                             options={this.state.options}/>
                <Text>
                    *Tell readers what this work is about with a brief description (140 character max):
                </Text>
                <Note style={this.state.numCharacters > 140 ? {color: '#ef5350' }: {}}>
                    {this.state.numCharacters} characters
                </Note>
                <FlatTextArea rows={2}
                              id={'publish-description'}
                              onChange={(e) => this.onChangeText(e)}/>
                <RowApart>
                    <Text style={{color: '#ef5350'}} id="success-msg" />
                    <ButtonPrimary style={{marginLeft: 'auto'}}
                                   disabled={!this.state.hasType && !this.state.hasDescription}
                                   onClick={() => this.publish()}>
                        {this.state.waiting ? <Loader style={{height: '20px', width: '20px'}} /> : 'Publish'}
                    </ButtonPrimary>
                </RowApart>
            </Modal>
        )
    }
}

PublishContainer.propTypes = {
    fetchTypes: PropTypes.func,
    fetchTopics: PropTypes.func,
    types: PropTypes.array,
    topics: PropTypes.array,
    publish: PropTypes.func,
    publishSuccess: PropTypes.bool,
    redirect: PropTypes.func
};

const mapStateToProps = (state) => ({
    types: state.editReducer.types,
    topics: state.editReducer.topics,
    publishSuccess: state.workReducer.success
});

const mapDispatchToProps = (dispatch) => ({
    fetchTypes: () => dispatch(fetchTypesThunk()),
    fetchTopics: () => dispatch(fetchTopicsThunk()),
    redirect: () => dispatch(push('/my/works'))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer)