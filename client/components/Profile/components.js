import React from 'react'
import styled from 'react-emotion'
import profileReducer from '../../reducers/profileReducer';

export const ProfileWrapper = styled('div')`
    width: 800px;
    max-width: 100%;
    margin-top: 60px;
    box-sizing: border-box;
    padding: 0 10px;
`;

export const ProfileInfo = (props) => {
    return (
        <div className="w-fill row">
            <ProfilePicture>
                <img className="w-fill" src={props.profilePicture}/>
            </ProfilePicture>
            <div className="col">
                <h1>{props.profileName}</h1>
                <h3 className="faint-text">@{props.profileUsername}</h3>
                <p className="weak-text">{props.profileBio}</p>
            </div>
        </div>
    )
};

const ProfilePicture = styled('div')`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
    overflow: hidden;
`;


// TODO: display profile works
