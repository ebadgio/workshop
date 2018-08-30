import React from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import PropTypes from 'prop-types';

// Components
import HoverMenu from './HoverMenu';
import {Avatar} from '../modules/Avatar';

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
      value: initialValue,
      timeoutId: '',
      saveState: ''
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

  componentWillReceiveProps(nextProps) {
    // console.log('text editor', nextProps);
    if (!nextProps.isSaving && nextProps.saveSuccess) {
      this.setState({saveState: 'Saved'});
    }
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

    // Clear last timeout from executing (if hasn't exececuted yet)
    clearTimeout(this.state.timeoutId);

    // Start a new timeout
    const timeoutId = setTimeout(() => {
      
      console.log('called');

      // When it executes, save the draft as it is now
      try {
        this.props.saveDraft(this.props.user,
          document.getElementById('editor-title').value,
          JSON.stringify(value.toJSON()),
          this.props.draftId);
      } catch(e) {

      }

    }, 1000);

    this.setState({ value:value, timeoutId: timeoutId, saveState: 'Saving ...'});
  }

  onKeyDown(event, change) {

    // Handles tab to indent functionality
    if (event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();

      const { value } = change;
      const { isCollapsed, document, selection } = value;

      if (isCollapsed) {
        // Insert indent at place of cursor
        return change.insertText('         ').focus();
      }

      // Get the lines currently highlighted
      const lines = document
        .getBlocksAtRange(selection);

      // Indent all highlighted lines
      return lines.reduce((c, line) => {
          // Insert an indent at start of line
          const text = line.nodes.first();
          return c.insertTextByKey(text.key, 0, '        ');
      }, change);
    }
    
    // If it wasn't tab and the first key isn't command or control, then do nothing
    if (!event.ctrlKey && !event.metaKey) return;

    // Decide what to do based on the key code...
    switch (event.key) {
      
      // Bold 
      case 'b': {
        event.preventDefault();
        change.toggleMark('bold');
        return true
      }

      // Italic
      case 'i': {
        event.preventDefault();
        change.toggleMark('italic');
        return true
      }
      
      // Underline
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

        <div className="w-fill row">
          <Avatar image={this.props.user.avatar}/>
          <div className="faint-text main-font col fs-14" style={{alignSelf: 'baseline'}}>
            <span className="weak-text">{this.props.user.fullname}</span>
            {this.state.saveState ?
               <span>Draft &bull; <span>{this.state.saveState}</span></span> :
               <span>Draft</span>}
          </div>  
        </div>

        <div className="w-fill frame">
          <input id="editor-title" type="text" placeholder="Title" />
        </div>

        <Editor value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark} />
      </div>);
  }
}

TextEditor.propTypes = {
  user: PropTypes.object,
  isSaving: PropTypes.bool,
	saveSuccess: PropTypes.bool,
  saveDraft: PropTypes.func,
  draftId: PropTypes.string
};

export default TextEditor