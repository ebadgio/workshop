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

class PublishContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: props.types,
            numCharacters: 0,
            hasType: false,
            type: '',
            topics: [],
            hasDescription: false
        }
    }

    componentDidMount() {
        this.props.fetchTypes();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({types: nextProps.types.map((type) => ({value: type._id, text: type.name}))})
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
                             options={[{text: 'abc', value:'abc'}, {text: 'bcd', value:'bcd'}, {text: 'cef', value:'cef'}]}/>
                <Text>
                    *Tell readers what this work is about with a brief description (140 character max):
                </Text>
                <Note style={this.state.numCharacters > 140 ? {color: '#ef5350' }: {}}>
                    {this.state.numCharacters} characters
                </Note>
                <FlatTextArea rows={2}
                              onChange={(e) => this.onChangeText(e)}/>
                {this.state.hasType && this.state.hasDescription ?
                    <ButtonPrimary style={{marginLeft: 'auto'}}>
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
    types: PropTypes.array
};

const mapStateToProps = (state) => ({
    types: state.editReducer.types
});

const mapDispatchToProps = (dispatch) => ({
    fetchTypes: () => dispatch(fetchTypesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer)