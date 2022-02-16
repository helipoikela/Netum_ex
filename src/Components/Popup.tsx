import { create } from "domain";
import React from "react";
import { createPortal } from "react-dom";

// Parametrien tyyppien määritys
type Props = {
    popupOpen: boolean;
}

//Tämä metodi määrittää popup-valikon pohjan ja sijainnin.
const Popup: React.FC<Props> = ({popupOpen, children}) => {
    if (!popupOpen) return null;

    return createPortal(
        <div className="popup">{children}</div>,
        document.body
    );
};

export default Popup;