import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Dashboard from "../Dashboard";

test('On initial render, buttons are visible'), () => {
    render(<Dashboard/>)

    screen.debug()
}