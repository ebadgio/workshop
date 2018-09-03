import React from 'react';
import styled from 'react-emotion';

import {ButtonIcon} from "./Button";
import Icon from "./Icon";

const ModalBackground = styled('div')`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const ModalContent = styled('div')`
    background-color: #fff;
    margin: auto;
    padding: 20px;
    border-radius: 6px;
    max-width: 90%;
    min-height; 200px;
    box-sizing: border-box;
    position: relative;
    font-family: sans-serif
`;



export default class Modal extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        // Get the modal
        const modal = document.getElementById(this.props.modalId);

        // Get the trigger button for opening the modal
        const trigger = document.getElementById(this.props.triggerId);

        // Get the button that closes the modal
        const close = document.getElementById(this.props.modalCloseId);

        // When the user clicks the trigger, open the modal
        trigger.onpointerdown = () => {
            modal.style.display = 'block';
        };

        // When the user clicks on <span> (x), close the modal
        close.onpointerdown = () => {
            modal.style.display = 'none';
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onpointerdown = () => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }

    render() {

        const sizes = {'small': '400px', 'medium': '600px', 'large': '800px'};

        return (<ModalBackground id={this.props.modalId}>
            <ModalContent style={{width: sizes[this.props.size]}}>
                <ButtonIcon id={this.props.modalCloseId}
                            style={{position: 'absolute', top: '0', right: '10px', height: '40x', width:'40px'}}>
                    <Icon name={'x'}/>
                </ButtonIcon>
                {this.props.children}
            </ModalContent>
        </ModalBackground>);

    }
}