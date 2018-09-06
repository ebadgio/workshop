import React from 'react';
import styled from 'react-emotion';

import {MenuWrapper} from "./Menu";
import {Dropdown, Option} from "./Dropdown";
import {Frame, RowWrap, Note} from "../elements";
import {Input} from "./TextInput";
import Icon from './Icon';

const SelectElement = styled('div')`
    font: inherit;
    color: #757575;
    color: #bdbdbd;
    padding: 6px 0 7px 7px;
    display: block;
    box-sizing: content-box;
    /* background: rgba(0,0,0,.1); */
    border-radius: 4px;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    min-width: 100px;
    padding-right: 32px;
    overflow: hidden;
    min-height: 1.1875em;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    border: 1px solid #bdbdbd;
    width: fit-content;
    font-size: 16px;
`;

const Arrow = styled('svg')`
    top: calc(50% - 12px);
    right: 0;
    height: 24px;
    position: absolute;
    fill: #606060;
    pointer-events: none;
    margin-right: 5px;
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

    close() {
        const d = document.getElementById(this.props.dId);
        if (d){
            d.style.display = 'none';
        }
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
                this.close()
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    select(option) {
        // console.log(option);
        const span = document.getElementById(this.props.spanId);
        span.innerText = option.text;
        span.style.color = '#424242';
        this.close();

        this.props.onSelect(option);
    }

    render() {
        return (
            <React.Fragment>
                <SelectElement id={this.props.sId}
                               onClick={() => this.open()}>
                    <span id={this.props.spanId} style={{pointerEvents: 'none'}}>{this.props.placeholder}</span>
                    <Arrow focusable="false" viewBox="0 0 24 24" aria-hidden="true"  onClick={() => this.open()}>
                        <path d="M7 10l5 5 5-5z"/>
                    </Arrow>
                </SelectElement>
                <Dropdown style={{top: this.state.top, left:this.state.left }}
                          id={this.props.dId}>
                    {this.props.options.map((option) => <Option className="background-hover"
                                                                key={option.value}
                                                                onClick={() => this.select(option)}>
                        {option.text}
                    </Option>)}
                </Dropdown>
            </React.Fragment>
        )
    }
}

const Selected = styled(Frame)`
    border-radius: 4px;
    margin: 10px;
    padding: 5px 15px;
    color: #757575;
    background: rgba(0,0,0,.05);
`;

const SelectInput = styled(Input)`
    min-width: 100px;
    width: fit-content;
    max-width: 100%;
    font-size: 16px;
`;

export class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options.slice(0, 5),
            selectedNames: [],
            selected: []
        }
    }

    open() {
        const dropdown = document.getElementById(this.props.dId);
        dropdown.style.display = 'flex';
    }

    componentDidMount() {

        const interval = setInterval(() => {
            const elem = document.getElementById(this.props.iId);

            if (elem) {
                const rect = elem.getBoundingClientRect();
                this.setState({top: rect.top + 40, left:rect.left});
            }

        }, 100);

        this.setState({interval: interval});

        window.onclick = (event) => {
            const elem = document.getElementById(this.props.iId);

            if (event.target !== elem) {
                const d = document.getElementById(this.props.dId);
                if (d) d.style.display = 'none';
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    onChange(e) {
        this.setState({
            options: this.props.options
                .filter((option) => option.text.toLowerCase().includes(e.target.value.toLowerCase()))
                .slice(0, 5)
        })
    }

    select(option) {

        if (!this.state.selectedNames.includes(option.text)) {
            this.setState({selected: this.state.selected.concat([option]),
                selectedNames: this.state.selectedNames.concat([option.text])});
            this.props.onSelect(option);
            document.getElementById(this.props.iId).value = '';
        }
    }

    remove(option) {
        //console.log('remove', option);
        this.setState({selected: this.state.selected.filter((s) => s.text !== option.text),
            selectedNames: this.state.selectedNames.filter((s) => s !== option.text)});
        this.props.onRemove(option);
    }

    render() {
        return (
            <RowWrap>
                {this.state.selected.map((s) => (<Selected key={s.value}>
                    {s.text}
                    <div onClick={() => this.remove(s)} style={{height: '27px'}}>
                        <i data-feather={'x'}
                           className="selected-icon color-hover"/>
                    </div>
                </Selected>))}
                {this.state.selected.length < this.props.limit ? <SelectInput placeholder="Add a topic..."
                             onChange={(e) => this.onChange(e)}
                             id={this.props.iId}
                             onFocus={() => this.open()}
                             type="text" /> : <Note>Topic limit reached.</Note>}
                <Dropdown style={{top: this.state.top, left:this.state.left }}
                          id={this.props.dId}>
                    {this.state.options.map((option) => <Option className="background-hover"
                                                                key={option.value}
                                                                onClick={() => this.select(option)}>
                        {option.text}
                    </Option>)}
                </Dropdown>
            </RowWrap>
        );
    }
}