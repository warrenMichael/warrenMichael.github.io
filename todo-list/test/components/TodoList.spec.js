const { expect } = require("chai");
const { shallow } = require("enzyme");
const sinon = require("sinon");
const React = require("react");

import TodoList from "../../src/components/TodoList";

describe("TodoList", function() {
  let component;
  let event;
  let instance;
  let querySelector;

  before(function() {
    global.localStorage = {
      getItem: function() {
        return "[]";
      },
      setItem: function() {
        return "[]";
      }
    };
  });

  beforeEach(function() {
    component = shallow(<TodoList />);
    instance = component.instance();
    querySelector = sinon.stub().returns({ value: "New Todo Item Text" });
    sinon.stub(instance, "setState");
    event = {
      preventDefault: sinon.spy(),
      target: {
        querySelector
      }
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  it("renders a div", function() {
    expect(component).to.have.tagName("div");
  });

  describe("addItem", function() {
    it("prevents event default", function() {
      instance.addItem(event);
      sinon.assert.calledOnce(event.preventDefault);
    });

    it("calls set state with expected arguments", function() {
      instance.addItem(event);

      sinon.assert.calledWith(instance.setState);
      const args = instance.setState.getCall(0).args[0];
      expect(args.todoItems[0].isCompleted).to.equal(false);
      expect(args.todoItems[0].text).to.equal("New Todo Item Text");
      // Id gets set as unique random string so just checking if string instead of actual value
      expect(args.todoItems[0].id).to.be.a("string");
    });
  });

  describe("clearAll", function() {
    it("calls set state with correct expected arguments", function() {
      instance.clearAll();
      sinon.assert.calledWith(instance.setState, {
        todoItems: []
      });
    });
  });

  describe("handleCompletedCheckbox", function() {
    const todoItems = [
      {
        id: "unique-id-1",
        isCompleted: false,
        text: "Item 1"
      },
      {
        id: "unique-id-2",
        isCompleted: false,
        text: "Item 2"
      }
    ];
    const todoItemsWithFirstItemCompleted = [
      {
        id: "unique-id-1",
        isCompleted: true,
        text: "Item 1"
      },
      {
        id: "unique-id-2",
        isCompleted: false,
        text: "Item 2"
      }
    ];

    beforeEach(function() {
      component = shallow(<TodoList />);
      component.setState({ todoItems });
      instance = component.instance();
      sinon.stub(instance, "setState");
    });

    it("calls set state with expected arguments", function() {
      instance.handleCompletedCheckbox("unique-id-1");
      sinon.assert.calledWith(instance.setState, {
        todoItems: todoItemsWithFirstItemCompleted
      });
    });
  });

  describe("handleViewOption", function() {
    it("calls set state with expected arguments", function() {
      const itemView = "completed";
      instance.handleViewOptions(itemView);
      sinon.assert.calledWith(instance.setState, {
        itemView
      });
    });
  });

  describe("removeItem", function() {
    const todoItems = [
      {
        id: "unique-id-1",
        isCompleted: false,
        text: "Item 1"
      },
      {
        id: "unique-id-2",
        isCompleted: false,
        text: "Item 2"
      }
    ];
    const todoItemsWithFirstItemRemoved = [
      {
        id: "unique-id-2",
        isCompleted: false,
        text: "Item 2"
      }
    ];

    beforeEach(function() {
      component = shallow(<TodoList />);
      component.setState({ todoItems });
      instance = component.instance();
      sinon.stub(instance, "setState");
    });

    it("calls set state with expected arguments", function() {
      instance.removeItem("unique-id-1");
      sinon.assert.calledWith(instance.setState, {
        todoItems: todoItemsWithFirstItemRemoved
      });
    });
  });

  describe("className", function() {
    beforeEach(function() {
      component = shallow(<TodoList />);
      component.setState({ itemView: "completed" });
      instance = component.instance();
      sinon.stub(instance, "setState");
    });

    it("adds state.itemView when defined", function() {
      expect(component).to.have.className("completed");
    });
  });

  describe("Text for when no task exist", function() {
    it("Renders when no todoItems exist", function() {
      component.setState({ todoItems: [] });
      expect(component.find(".no-tasks-text")).to.exist;
    });

    it("Does not render when todoItems are set", function() {
      component.setState({ todoItems: [{}] });
      expect(component.find(".no-tasks-text")).to.not.exist;
    });
  });

  it("renders ViewOptions component", function() {
    expect(component)
      .to.have.exactly(1)
      .descendants("ViewOptions");
  });

  it("renders ClearAllItems component", function() {
    expect(component)
      .to.have.exactly(1)
      .descendants("ClearAllItems");
  });

  describe("Renders a TodoItem for every item in state.todoItems", function() {
    const todoItems = [
      {
        id: "unique-id-1",
        isCompleted: false,
        text: "Item 1"
      },
      {
        id: "unique-id-2",
        isCompleted: false,
        text: "Item 2"
      },
      {
        id: "unique-id-3",
        isCompleted: false,
        text: "Item 3"
      }
    ];

    beforeEach(function() {
      component = shallow(<TodoList />);
      component.setState({ todoItems });
      instance = component.instance();
      sinon.stub(instance, "setState");
    });

    it("adds state.itemView when defined", function() {
      expect(component)
        .to.have.exactly(todoItems.length)
        .descendants("TodoItem");
    });
  });

  it("renders AddTodoItem component", function() {
    expect(component)
      .to.have.exactly(1)
      .descendants("AddTodoItem");
  });
});
