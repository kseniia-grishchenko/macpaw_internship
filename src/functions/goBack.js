import React from 'react';
import { useHistory } from "react-router-dom";

export const GoToPreviousPath = () => {
    let history = useHistory();
    history.goBack()
}


