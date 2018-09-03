import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

// Components
import {ButtonOutlinePrimary} from './modules/Button';
import {NavAvatar} from './modules/Avatar';
import {Menu, MenuItem, MenuDivider} from "./modules/Menu";
import Icon from './modules/Icon';



// Thunks
import logoutUserThunk from "../thunks/logoutUserThunk";

class NavbarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scrolled: false,
			isEditing: false,
			user: props.user
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log('next', nextProps);
		this.setState({user: nextProps.user, isEditing: nextProps.isEditing});
	}

	componentDidMount() {

		document.addEventListener('scroll', () => {
            if (window.scrollY === 0) {
                this.base()
            } else {
                if (this.state.scrolled) {
                    this.base();
                    this.setState({scrolled: false});
                } else {
                    this.lift();
                }
            }
        });
	}

	base() {
        const elem = document.getElementById('nav');
        elem.classList.remove('shadow');
    };

    lift() {
        const elem = document.getElementById('nav');
        elem.classList.add('shadow');
    }

	render() {

		if (this.state.user.username) {
			return (
				<div className="nav frame" id="nav">
					<div className="nav-content row-apart">
						<h2>
							<Link to="/">
								Workshop
							</Link>
						</h2>
						<div className="row nav-tabs">
							<Menu trigger={<NavAvatar image={this.state.user.avatar}
                                                      id={'nav-avatar'}/>}
								  triggerId={'nav-avatar'}
								  type="nav">
								<MenuItem to={'/u/' + this.state.user.username}>
                                    Profile
								</MenuItem>
								<MenuItem to={'/my/works'}>Your Works</MenuItem>
                                <MenuItem to={'/new/draft'}>New Work</MenuItem>
								<MenuDivider />
                                <MenuItem action={() => this.props.logout()}>
									<Icon name={'log-out'} style={{marginRight: '10px', height: '20px', width: '20px'}}/>
									Logout
								</MenuItem>
							</Menu>
							{/*<div className="nav-link color-hover" onClick={() => this.props.logout()}>Logout</div>*/}
						</div>
					</div>
				</div>
			);
		}
		
		return(
			<div className="nav frame" id="nav">
				<div className="nav-content row-apart">
					<h2>
                        <Link to="/">
						    Workshop
                        </Link>
					</h2>
					<div className="row nav-tabs">
						<Link className="nav-link color-hover"
								to={'/login'}>
							Sign in
						</Link>
						<Link className="nav-link"
								to={'/register'}>
							<ButtonOutlinePrimary>
								Get started
							</ButtonOutlinePrimary>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

NavbarContainer.propTypes = {
	user: PropTypes.object,
	openEdit: PropTypes.func,
    logout: PropTypes.func
};

const mapStateToProps = (state) => ({
	user: state.userReducer,
	isEditing: state.editReducer.isEditing
});

const mapDispatchToProps = (dispatch) => ({
	  logout: () => dispatch(logoutUserThunk()),
	  openEdit: () => dispatch({type: 'OPEN_EDIT'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
