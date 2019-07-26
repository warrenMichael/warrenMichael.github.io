const { expect } = require("chai");
const { shallow } = require("enzyme");
const React = require("react");

import Header from "../../src/components/Header";

describe("Header", function() {
  let component;
  const headerTextExample = "A Header Title";

  beforeEach(function() {
    component = shallow(
      <Header className="foo" headerText={headerTextExample} />
    );
  });

  it("Renders a header", function() {
    expect(component).to.have.tagName("header");
  });

  it("adds the given class name to the component", function() {
    expect(component).to.have.className("foo");
  });

  it("uses headerText prop for hdr", function() {
    expect(component.find(".hdr").text()).to.equal(headerTextExample);
  });
});
