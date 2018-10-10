import React from 'react'
import styled from 'react-emotion';

const Wrapper = styled('div')`
    height: 45px;
    min-width: 45px;
    max-width: 45px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20px;
`;

const Image = styled('img')`
    width: 100%;
`;

const WrapperClick = styled(Wrapper)`
    cursor: pointer;
`;

// const Avatar = ({image, id}) => <div className="avatar-wrapper" id={id}>
//     <img src={image} className="avatar-img" />
// </div>;

export const Avatar = ({image, id}) => <Wrapper id={id}>
    <Image src={image}/>
</Wrapper>;

export const NavAvatar = ({image, id}) => <WrapperClick id={id}>
    <Image src={image}/>
</WrapperClick>;
