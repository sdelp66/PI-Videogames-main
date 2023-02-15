import React from "react";
import { shallow } from "enzyme";
import Landing from "./src/component/Landing";

describe("Landing component", () => {
  it("renders a title and a link to the home page", () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(".landingTitle").text()).toEqual("¡Bienvenido!¿Estas listo?");
    expect(wrapper.find(".start").prop("to")).toEqual("/home");
  });
});