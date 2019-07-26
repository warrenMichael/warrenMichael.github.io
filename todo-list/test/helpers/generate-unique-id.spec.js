const { expect } = require("chai");

import GenerateUniqueId from "../../src/helpers/generate-unique-id";

describe("GenerateUniqueId", function() {
  it("be a function", function() {
    expect(GenerateUniqueId).to.be.a("function");
  });

  it("returns a string", function() {
    expect(GenerateUniqueId()).to.be.a("string");
  });

  it("when run twice does not equal the same string", function() {
    const generateIdOne = GenerateUniqueId();
    const generateIdTwo = GenerateUniqueId();
    expect(generateIdOne).to.not.equal(generateIdTwo);
  });
});
