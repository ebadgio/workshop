import React from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';


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
// Define our app...
class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      value: initialValue
    }

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.renderMark = this.renderMark.bind(this);
  }

  // On change, update the app's React state with the new editor value.
  onChange({ value }) {
    this.setState({ value })
  }

  onKeyDown(event, change) {

    if (!event.ctrlKey && !event.metaKey) return

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        change.toggleMark('bold')
        return true
      }

      case 'i': {
        event.preventDefault()
        change.toggleMark('italic')
        return true
      }
      
      case 'u': {
        event.preventDefault()
        change.toggleMark('underline')
        return true
      }

    }
  }

  // Add a `renderMark` method to render marks.
  renderMark(props) {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      case 'italic':
        return <em>{props.children}</em>
      case 'underline':
        return <u>{props.children}</u>
    }
  }

  // Render the editor.
  render() {
    return (
      <div className="slate-editor">
        <Editor value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark} />
      </div>);
  }
}

export default TextEditor