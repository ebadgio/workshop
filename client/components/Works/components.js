import React from 'react'
import styled from 'react-emotion';

import {Column, Text, RowApart, RowFit, Note} from "../elements";
import {Avatar} from "../modules/Avatar";

const DraftCardFrame = styled(Column)`
    height: 120px;
    width: 300px;
    box-sizing: border-box;
    background: #fff;
    margin: 10px;
    cursor: pointer;
    border-left: 1px solid;
    color: #e9e9e9;
    padding-left: 20px;
    &:hover {
        color: #8c9eff;
    }
`;



export const DraftCard = (props) => {
    return (
        <DraftCardFrame onClick={props.onClick} className="color-hover">
                <h3 className="mb-20">{props.title}</h3>
                <span className="faint-text">
                    Lasted edited {props.updatedAt} days ago
                </span>
                <span className="faint-text mt-10">
                    Created {props.createdAt}
                </span>
        </DraftCardFrame>
    )
};

const WorkCardFrame = styled(Column)`
    width: 400px;
    min-height: 200px;
    position: relative;
    max-width: 100%:
`;

const TitleWrap = styled('div')`
    max-width: 80%;
`;

const Type = styled(Note)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    background: rgba(0,0,0,.05);
    color: #757575;
    border-radius: 4px;
`;

const Dot = styled('div')`
    height: 3px;
    width: 3px;
    margin: 0 5px;
    background: #bdbdbd;
    border-radius: 50%;
`;

export const WorkCard = ({work, formatDate}) => {
    return (
        <WorkCardFrame>
            <TitleWrap>
                <h3 style={{marginTop: 0}}>{work.title}</h3>
            </TitleWrap>
            <Type>
                {work.type.name}
            </Type>
            <Text className="mb-20" style={{color: '#757575'}}>
                {work.description}
            </Text>
            <RowApart style={{flexWrap: 'wrap'}}>
                <RowFit>
                    <Avatar image={work.author.avatar}/>
                    <Column>
                        <Note>
                            {work.author.fullname}
                        </Note>
                        <Note>
                            {formatDate(work.createdAt)}
                        </Note>
                    </Column>
                </RowFit>
                <RowFit>
                    {work.topics.map((topic, idx) => {
                        if (idx < work.topics.length - 1) {
                            return <React.Fragment key={topic._id}>
                                <Note>{topic.name.toUpperCase()}</Note>
                                <Dot/>
                            </React.Fragment>
                        }
                        return <React.Fragment key={topic._id}>
                            <Note>{topic.name.toUpperCase()}</Note>
                        </React.Fragment>
                        })
                    }
                </RowFit>
            </RowApart>
        </WorkCardFrame>
    )
};