import { create } from "domain";
import React from "react";
import { createPortal } from "react-dom";
import styled from 'styled-components';

const Wrapper = styled.div `
    position: absolute;
    top: 40;
    left: 40;
    display: flex
    align-items: center;
    justify_content: center;
    width: 100vw;
    hight: 100vh;
    backround: grey;
`;

// Parametrien tyyppien määritys
type Props = {
    popupOpen: boolean;
}

//Tämä metodi määrittää popup-valikon pohjan ja sijainnin.
const Popup: React.FC<Props> = ({popupOpen, children}) => {
    if (!popupOpen) return null;

    return createPortal(
        <Wrapper>
            <div>{children}</div>
        </Wrapper>,
        document.body
    );
};

export default Popup;