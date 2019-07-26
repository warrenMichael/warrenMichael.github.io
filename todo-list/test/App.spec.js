const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");

import App from "../src/App";

describe("App", function() {
  let component;

  beforeEach(function() {
    component = shallow(<App />);
  });

  it("renders a div tag", function() {
    expect(component).to.have.tagName("div");
  });

  it("has descriptive classname", function() {
    expect(component).to.have.className("todo-list-application");
  });

  it("renders a Header", function() {
    expect(component)
      .to.have.exactly(1)
      .descendants("Header");
  });

  it("renders a TodoList", function() {
    expect(component)
      .to.have.exactly(1)
      .descendants("TodoList");
  });
});
