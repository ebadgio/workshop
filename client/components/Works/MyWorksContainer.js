import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

// Components
import {ProfileWrapper} from "../Profile/ProfileComponents";
import {RowApart, Column} from "../elements";
import {DraftCard} from "./components";

// Thunks
import fetchWorksThunk from "../../thunks/fetchWorksThunk";

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
    fetchWorks: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
    fetchWorks: (id) => dispatch(fetchWorksThunk(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(MyWorksContainer);