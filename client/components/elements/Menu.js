import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'react-emotion';
import PropTypes from 'prop-types';


const MenuWrapper = styled('div')`
    width: 200px;
    background: #fff;
    display: flex;
    flex-direction: column;
    z-index: 1;
    box-shadow: 0 1px 7px rgba(0,0,0,.1);
    min-height: 40px;
    border-radius: 4px;
    position: fixed;
    overflow: hidden;
    padding: 10px 0;
`;

const MenuWrapperNav = styled(MenuWrapper)`
    top: 55px;
    right: 20px;
`;


const MenuItemStyle = styled(Link)`
    width: 100%;
    padding: 10px 30px;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    color: #757575;
    &:hover {
        color: #424242;
    }

`;

export const MenuItem = (props) => <MenuItemStyle className="color-hover"
                                                  onClick={props.action}
                                                  to={props.to ? props.to : '/#'}>
    {props.children}
</MenuItemStyle>;

export const MenuDivider = styled('div')`
    width: 100%;
    border-top: 1px solid #e9e9e9;
    margin: 10px 0;
`;

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

    }

    componentDidMount() {
        try {
            document.getElementById(this.props.triggerId).addEventListener('click', this.openMenu);
        } catch (e) {
            console.log('avatar element not mounted yet')
        }
    }

    openMenu(event) {
        event.preventDefault();
        console.log('clicked');
        this.setState({ showMenu: true }, () => {
            setTimeout(() => {
                window.feather.replace();
                document.addEventListener('click', this.closeMenu)
            }, 150);
        });
    }
      
    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {

        switch(this.props.type) {
            case "nav":
                return (
                    <div>
                        {this.props.trigger}

                        {this.state.showMenu
                            ?
                            (<MenuWrapperNav>
                                {this.props.children}
                            </MenuWrapperNav>)

                            :
                            <div />}
                    </div>
                );
            default:
                return (
                    <div>
                        {this.props.trigger}

                        {this.state.showMenu
                            ?
                            (<MenuWrapper>
                                {this.props.children}
                            </MenuWrapper>)

                            :
                            <div />}
                    </div>
                )

        }
    }   
}

Menu.propTypes = {
    trigger: PropTypes.element,
    children: PropTypes.node,
    triggerId: PropTypes.string
};