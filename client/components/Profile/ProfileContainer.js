import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import {ProfileWrapper, ProfileInfo} from './ProfileComponents';

// Thunks
import fetchProfileItemsThunk from '../../thunks/fetchProfileItemsThunk';


class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(props);
        props.fetchProfileItems(props.match.params.username);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ profileUser: nextProps.profileUser})
    }

    render() {
        return(
            <div className="page-wrapper col-center">
                <ProfileWrapper>
                    <ProfileInfo profilePicture={this.props.profileUser.profilePicture}
                                 profileName={this.props.profileUser.fullname}
                                 profileUsername={this.props.profileUser.username}
                                 profileBio={this.props.profileUser.bio} />
                </ProfileWrapper>
            </div>
        );
    }
};

ProfileContainer.propTypes = {
    fetchProfileItems: PropTypes.func,
    profileUser: PropTypes.object
};

const mapStateToProps = (state) => ({
    profileUser: state.profileReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    fetchProfileItems: (username) => dispatch(fetchProfileItemsThunk(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);