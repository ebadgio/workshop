import React from 'react';
import styled from 'react-emotion';

import {MenuWrapper} from "./Menu";

const SelectElement = styled('div')`
    font: inherit;
    color: #757575;
    border: 0;
    margin: 0;
    padding: 6px 0 7px 7px;
    display: block;
    min-width: 0;
    flex-grow: 1;
    box-sizing: content-box;
    /* background: rgba(0,0,0,.1); */
    border-radius: 4px;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    min-width: 100px;
    padding-right: 32px;
    width: auto;
    overflow: hidden;
    min-height: 1.1875em;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    border: 1px solid #bdbdbd;
`;

const Arrow = styled('svg')`
    top: calc(50% - 12px);
    right: 0;
    height: 24px;
    position: absolute;
    fill: #606060;
`;

const Dropdown = styled(MenuWrapper)`
    width: 150px;
    display: none;
`;

const Option = styled('div')`
    height: 40px;
    box-sizing: border-box;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    color: #757575;
    &:hover {
        background: rgba(0,0,0,.1)
    }
`;

export class Select extends React.Component{
    constructor() {
        super();
        this.state = {}
    }

    open() {
        const dropdown = document.getElementById(this.props.dId);
        dropdown.style.display = 'flex';
    }

    componentDidMount() {
        const elem = document.getElementById(this.props.sId);

        const interval = setInterval(() => {
            const rect = elem.getBoundingClientRect();
            this.setState({top: rect.top - 10, left:rect.left});
        }, 100);

        this.setState({interval: interval});

        window.onclick = (event) => {
            if (event.target !== elem) {
                document.getElementById(this.props.dId).style.display = 'none';
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <React.Fragment>
                <SelectElement id={this.props.sId}
                               onClick={() => this.open()}>
                    {this.props.placeholder}
                    <Arrow focusable="false" viewBox="0 0 24 24" aria-hidden="true"  onClick={() => this.open()}>
                        <path d="M7 10l5 5 5-5z"/>
                    </Arrow>
                </SelectElement>
                <Dropdown style={{top: this.state.top, left:this.state.left }}
                          id={this.props.dId}>
                    {this.props.options.map((option) => <Option className="background-hover"
                                                                onClick={(option) => this.props.onSelect(option)}>
                        {option.text}
                    </Option>)}
                </Dropdown>
            </React.Fragment>
        )
    }
};