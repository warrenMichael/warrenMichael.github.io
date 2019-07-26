const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");
const sinon = require("sinon");

import AddTodoItem from "../../src/components/AddTodoItem";

describe("AddTodoItem", function() {
  let component;

  beforeEach(function() {
    component = shallow(<AddTodoItem className="foo" />);
  });

  it("renders a form", function() {
    expect(component).to.have.tagName("form");
  });

  it("adds the given class name to the component", function() {
    expect(component).to.have.className("foo");
  });

  it("renders label text default if not set", function() {
    expect(component.find(".add-item-label").text()).to.equal("Add TODO item");
  });

  it("labelText takes prop if set", function() {
    const labelTextValue = "I AM THE LABEL TEXT NOW";
    component.setProps({ labelText: labelTextValue });
    expect(component.find(".add-item-label"))
      .text()
      .to.equal(labelTextValue);
  });

  describe("onSubmitHandler", function() {
    let onSubmitHandler;

    beforeEach(function() {
      onSubmitHandler = sinon.spy();
      component.setProps({ onSubmitHandler });
    });

    afterEach(function() {
      sinon.restore();
    });

    it("calls on submit of form", function() {
      component.simulate("submit");
      sinon.assert.called(onSubmitHandler);
    });
  });
});
