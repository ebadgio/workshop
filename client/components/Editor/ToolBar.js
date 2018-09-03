import React from 'react'
import styled from 'react-emotion'

const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
`;

const ToolBar = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 2;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.5s;
`;

export default ToolBar