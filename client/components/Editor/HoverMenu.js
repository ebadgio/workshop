import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ToolBar from './ToolBar';
import Button from '../modules/Button';
import Icon from '../modules/Icon';

class HoverMenu extends React.Component {

  // this.renderMarkButton = this.renderMarkButton.bind(this);
  // this.onClickMark = this.onClickMark.bind(this);

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <ToolBar className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'bold', {})}
        {this.renderMarkButton('italic', 'italic', {})}
        {this.renderMarkButton('underline', 'underline', {})}
        {this.renderMarkButton('title', 'type', {})}
        {this.renderMarkButton('subtitle', 'type', {width: '20px', height: '20px'})}
        {this.renderMarkButton('center', 'align-center', {})}
        {this.renderMarkButton('right', 'align-right', {})}
      </ToolBar>,
      root
    )
  }

  renderMarkButton(type, icon, iconStyle) {
    const { value } = this.props;
    const isActive = value.activeMarks.some(mark => mark.type === type);
    return (
      <Button
        type={"toolbar"}
        active={isActive}
        action={event => this.onClickMark(event, type)}
        contents={<Icon name={icon} style={iconStyle} />}/>
    )
  }

  onClickMark(event, type) {
    const { value, onChange } = this.props;
    event.preventDefault();
    const change = value.change().toggleMark(type);
    onChange(change)
  }
}

export default HoverMenu;