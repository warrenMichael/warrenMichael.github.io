const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");
const sinon = require("sinon");

import ClearAllItems from "../../src/components/ClearAllItems";

describe("ClearAllItems", function() {
  let component;

  beforeEach(function() {
    component = shallow(<ClearAllItems className="foo" />);
  });

  it("renders a div", function() {
    expect(component).to.have.tagName("div");
  });

  it("adds the given class name to the component", function() {
    expect(component).to.have.className("foo");
  });

  describe("clearAll", function() {
    let clearAll;

    beforeEach(function() {
      clearAll = sinon.spy();
      component.setProps({ clearAll });
    });

    afterEach(function() {
      sinon.restore();
    });

    it("calls click of clear all button", function() {
      component.find(".clear-all-btn").simulate("click");
      sinon.assert.called(clearAll);
    });
  });
});
