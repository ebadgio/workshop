import React from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';

// Components
import HoverMenu from './HoverMenu';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      value: initialValue
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.renderMark = this.renderMark.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  componentDidMount() {
      this.updateMenu()
  }

  componentDidUpdate() {
      this.updateMenu()
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu() {
    const { value } = this.state;
    const menu = this.menu;
    if (!menu) return;

    try {
        if (value.isBlurred || value.isEmpty) {
          menu.removeAttribute('style');
          return
        }

        const selection = window.getSelection();

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        menu.style.opacity = 1;
        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

        menu.style.left = `${rect.left +
          window.pageXOffset -
          menu.offsetWidth / 2 +
          rect.width / 2}px`
    } catch (e) {
        // console.log(e);
    }

  }


  // On change, update the app's React state with the new editor value.
  onChange({ value }) {
    this.setState({ value })
  }

  onKeyDown(event, change) {

    if (!event.ctrlKey && !event.metaKey) return;

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault();
        change.toggleMark('bold');
        return true
      }

      case 'i': {
        event.preventDefault();
        change.toggleMark('italic');
        return true
      }
      
      case 'u': {
        event.preventDefault();
        change.toggleMark('underline');
        return true
      }

    }
  }

  // Add a `renderMark` method to render marks.
  renderMark(props) {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'underline':
        return <u>{props.children}</u>;
      case 'title':
        return <h2>{props.children}</h2>;
      case 'subtitle':
        return <h3>{props.children}</h3>;
      case 'left':
        return <div style={{textAlign: 'left'}}>{props.children}</div>;
      case 'right':
        return <div style={{textAlign: 'right'}}>{props.children}</div>;
      case 'center':
        return <div style={{textAlign: 'center'}}>{props.children}</div>;
      default:
        return <span>{props.children}</span>
    }
  }

  // Render the editor.
  render() {
    return (
      <div className="slate-editor box">
        <HoverMenu
          innerRef={menu => (this.menu = menu)}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="w-fill frame"><input id="editor-title" type="text" placeholder="Title" /></div>
        <Editor value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark} />
      </div>);
  }
}

export default TextEditor