import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';
import { push } from 'react-router-redux';

// Components
import {ProfileWrapper} from "../Profile/components";
import {RowApart, Column, RowWrap} from "../elements";
import {DraftCard} from "./components";

// Thunks
import fetchWorksThunk from "../../thunks/fetchWorksThunk";

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

class MyWorksContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            drafts: [],
            works: []
        }
    }

    componentDidMount() {
        if (this.props.user._id) {
            this.props.fetchWorks(this.props.user._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({drafts: nextProps.user.drafts, works: nextProps.user.works})
    }

    // TODO: use moment.js instead
    daysSinceNow(timestamp) {

        const date = new Date(timestamp);
        const now = new Date();

        const utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

        return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    }

    formatCreatedAt(timestamp) {
        const date = new Date(timestamp);
        const arr = date.toDateString().split(' ');

        return arr[1] + ' ' + arr[2] + ', ' + arr[3];
    }

    loadDraft(draftId, draftValue, draftTitle) {
        this.props.loadDraft(draftId, draftValue, draftTitle);
        this.props.navigate('/edit/draft/' + draftId);
    }

    render() {

        // This page requires a logged in user
        if (!this.props.user._id) {
            return <Redirect to="/"/>
        }

        return (
            <div className="page-wrapper col-center">
                <ProfileWrapper>
                    <RowApart>
                        <h1>Your works</h1>
                    </RowApart>
                    <Column>
                        {this.state.drafts.map((draft) =>
                            <DraftCard title={draft.title}
                                       onClick={() => this.loadDraft(draft._id, draft.content, draft.title)}
                                       createdAt={this.formatCreatedAt(draft.createdAt)}
                                       updatedAt={this.daysSinceNow(draft.updatedAt)}
                                       key={draft._id}/>
                        )}
                    </Column>
                </ProfileWrapper>
            </div>
        )
    }
}

MyWorksContainer.propTypes = {
    user: PropTypes.object,
    fetchWorks: PropTypes.func,
    loadDraft: PropTypes.func,
    navigate: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    fetchWorks: (id) => dispatch(fetchWorksThunk(id)),
    loadDraft: (id, val, title) => dispatch({type: 'OPEN_EDIT',
        draftId: id, value: val, fromDraft: true, title: title}),
    navigate: (route) => dispatch(push(route))
});


export default connect(mapStateToProps, mapDispatchToProps)(MyWorksContainer);