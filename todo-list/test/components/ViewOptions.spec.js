const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");
const sinon = require("sinon");

import ViewOptions from "../../src/components/ViewOptions";

describe("ViewOptions", function() {
  let component;

  beforeEach(function() {
    component = shallow(
      <ViewOptions className="foo" handleViewOptions={() => {}} />
    );
  });

  it("renders a ul", function() {
    expect(component).to.have.tagName("div");
  });

  it("adds the given class name to the component", function() {
    expect(component).to.have.className("foo");
  });

  describe("handleViewOptions", function() {
    let handleViewOptions;

    beforeEach(function() {
      handleViewOptions = sinon.spy();
      component.setProps({ handleViewOptions });
    });

    afterEach(function() {
      sinon.restore();
    });

    it("calls handleViewOptions when clicking on all view list option", function() {
      component.find(".view-option-item.all").simulate("click");
      sinon.assert.called(handleViewOptions);
    });

    it('has all option returns "" as argument', function() {
      component.find(".view-option-item.all").simulate("click");
      expect(handleViewOptions.firstCall.args[0]).to.equals("");
    });

    it("calls handleViewOptions when clicking on completed view list option", function() {
      component.find(".view-option-item.uncompleted").simulate("click");
      sinon.assert.called(handleViewOptions);
    });

    it("has uncompleted option returns uncompleted as argument", function() {
      component.find(".view-option-item.uncompleted").simulate("click");
      expect(handleViewOptions.firstCall.args[0]).to.equals("uncompleted");
    });

    it("calls handleViewOptions when clicking on uncompleted view list option", function() {
      component.find(".view-option-item.completed").simulate("click");
      sinon.assert.called(handleViewOptions);
    });

    it("has completed option returns completed as argument", function() {
      component.find(".view-option-item.completed").simulate("click");
      expect(handleViewOptions.firstCall.args[0]).to.equals("completed");
    });
  });
});
