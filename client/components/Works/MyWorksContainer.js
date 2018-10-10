import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';
import { push } from 'react-router-redux';

// Components
import {ProfileWrapper} from "../Profile/components";
import {RowApart, Column, ColumnCenter, RowFit} from "../elements";
import {DraftCard, WorkCard} from "./components";

// Thunks
import fetchDraftsThunk from "../../thunks/fetchDraftsThunk";
import fetchWorksThunk from "../../thunks/fetchWorksThunk";
import Tab from "../modules/Tab";

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

class MyWorksContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: 0,
            drafts: [],
            works: [],
            display: []
        }
    }

    componentDidMount() {
        if (this.props.user._id) {
            this.props.fetchDrafts(this.props.user._id, 0);
            this.props.fetchWorks(this.props.user._id, 0)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({drafts: nextProps.user.drafts, works: nextProps.user.works});
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

    loadDraft(draftId) {
        this.props.navigate('/edit/draft/' + draftId);
    }

    switchTab(tab) {
        this.setState({tab: tab})
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
                    <RowFit style={{margin:'20px 0'}}>
                        <Tab active={this.state.tab===0}
                             onClick={() => this.switchTab(0)}>
                            DRAFTS
                        </Tab>
                        <Tab active={this.state.tab===1}
                             onClick={() => this.switchTab(1)}>
                            PUBLISHED
                        </Tab>
                    </RowFit>
                    {this.state.tab === 0 ? <Column>
                        {this.state.drafts.map((draft) =>
                            <DraftCard title={draft.title}
                                       onClick={() => this.loadDraft(draft._id)}
                                       createdAt={this.formatCreatedAt(draft.createdAt)}
                                       updatedAt={this.daysSinceNow(draft.updatedAt)}
                                       key={draft._id}/>
                        )}
                    </Column> : <ColumnCenter>
                        {this.state.works.map((work) =>
                            <WorkCard work={work}
                                      formatDate={this.formatCreatedAt}
                                      key={work._id}/>
                        )}
                    </ColumnCenter>
                    }
                </ProfileWrapper>
            </div>
        )
    }
}

MyWorksContainer.propTypes = {
    user: PropTypes.object,
    fetchDrafts: PropTypes.func,
    loadDraft: PropTypes.func,
    navigate: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    fetchDrafts: (id, pageNum) => dispatch(fetchDraftsThunk(id, pageNum)),
    fetchWorks: (id, pageNum) => dispatch(fetchWorksThunk(id, pageNum)),
    loadDraft: () => dispatch({type: 'OPEN_EDIT'}),
    navigate: (route) => dispatch(push(route))
});


export default connect(mapStateToProps, mapDispatchToProps)(MyWorksContainer);