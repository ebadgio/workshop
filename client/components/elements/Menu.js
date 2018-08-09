import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';


const MenuWrapper = styled('div')`
    width: 250px;
    background: #fff;
    display: flex;
    flex-direction: column;
    z-index: 1;
    box-shadow: 0 1px 7px rgba(0,0,0,.05);
`


const MenuItem = styled('div')`
    width: 100%;
    padding: 10px;
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
`


class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            showMenu: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    openMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
    }
      
    closeMenu() {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {

        return (
            <div>
                {this.props.trigger}

                {this.state.showMenu
                    ? 
                    (<MenuWrapper>
                        {this.props.children}
                    </MenuWrapper>)
                    : 
                    null}
            </div>
        )
    }   
}

Menu.propTypes = {
    trigger: PropTypes.element,
    children: PropTypes.node
};

export default Menu;