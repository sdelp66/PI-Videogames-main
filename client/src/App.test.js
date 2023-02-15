// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import { shallow } from "enzyme";
import Landing from "./components/Landing";

describe("Landing component", () => {
  it("renders a title and a link to the home page", () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(".landingTitle").text()).toEqual("¡Bienvenido!¿Estas listo?");
    expect(wrapper.find(".start").prop("to")).toEqual("/home");
  });
});