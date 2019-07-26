const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");
const sinon = require("sinon");

import TodoItem from "../../src/components/TodoItem";

describe("TodoItem", function() {
  let component;
  const placeholderText = "A TODO Item";

  beforeEach(function() {
    component = shallow(
      <TodoItem
        className="foo"
        handleCompletedCheckbox={() => {}}
        text={placeholderText}
      />
    );
  });

  it("renders a div", function() {
    expect(component).to.have.tagName("div");
  });

  it("adds the given class name to the component", function() {
    expect(component).to.have.className("foo");
  });

  it("sets text from text prop", function() {
    expect(component.find(".todo-item-text").text()).to.equal(placeholderText);
  });

  it("when isCompleted prop is false it does not have completed className", function() {
    expect(component).to.not.have.className("completed");
  });

  it("when isCompleted prop is set it has completed className", function() {
    component.setProps({ isCompleted: true });
    expect(component).to.have.className("completed");
  });

  it("when isCompleted prop is false checkbox is not checked", function() {
    expect(component.find(".completed-checkbox-input")).to.not.have.attr(
      "checked"
    );
  });

  it("when isCompleted prop is set checkbox is checked", function() {
    component.setProps({ isCompleted: true });
    expect(component.find(".completed-checkbox-input")).to.have.attr("checked");
  });

  it("does not render button.btn-remove if removeItem is not set", function() {
    expect(component.find(".btn-remove")).to.not.exist;
  });

  it("renders button.btn-remove if removeItem is not set", function() {
    component.setProps({ removeItem: () => {} });
    expect(component.find(".btn-remove")).to.exist;
  });

  describe("handleCompletedCheckbox", function() {
    let handleCompletedCheckbox;

    beforeEach(function() {
      handleCompletedCheckbox = sinon.spy();
      component.setProps({ handleCompletedCheckbox });
    });

    afterEach(function() {
      sinon.restore();
    });

    it("calls on change of checkbox inout", function() {
      component.find(".completed-checkbox-input").simulate("change");
      sinon.assert.called(handleCompletedCheckbox);
    });
  });
});
