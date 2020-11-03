import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import React from "react";

import {
  machineDetails as machineDetailsFactory,
  machineState as machineStateFactory,
  rootState as rootStateFactory,
  testStatus as testStatusFactory,
} from "testing/factories";
import CpuCard from "./CpuCard";
import type { RootState } from "app/store/root/types";

const mockStore = configureStore();

describe("CpuCard", () => {
  let state: RootState;
  beforeEach(() => {
    state = rootStateFactory({
      machine: machineStateFactory({
        items: [],
      }),
    });
  });

  it("renders the cpu subtext", () => {
    const machine = machineDetailsFactory();
    machine.cpu_speed = 2000;
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("[data-test='cpu-subtext']").text()).toEqual(
      `${machine.cpu_count} core, 2 GHz`
    );
  });

  it("renders the cpu subtext for slow machines", () => {
    const machine = machineDetailsFactory();
    machine.cpu_speed = 200;
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("[data-test='cpu-subtext']").text()).toEqual(
      `${machine.cpu_count} core, 200 MHz`
    );
  });

  it("renders a link with a count of passed tests", () => {
    const machine = machineDetailsFactory();
    machine.cpu_test_status = testStatusFactory({
      passed: 2,
    });
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.find("[data-test='tests']").childAt(0).find("Button").text()
    ).toEqual("2");
  });

  it("renders a link with a count of pending and running tests", () => {
    const machine = machineDetailsFactory();
    machine.cpu_test_status = testStatusFactory({
      running: 1,
      pending: 2,
    });
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.find("[data-test='tests']").childAt(0).find("Button").text()
    ).toEqual("3");
  });

  it("renders a link with a count of failed tests", () => {
    const machine = machineDetailsFactory();
    machine.cpu_test_status = testStatusFactory({
      failed: 5,
    });
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.find("[data-test='tests']").childAt(0).find("Button").text()
    ).toEqual("5");
  });

  it("renders a results link", () => {
    const machine = machineDetailsFactory();
    machine.cpu_test_status = testStatusFactory({
      failed: 5,
    });
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.find("[data-test='tests']").childAt(1).find("Button").text()
    ).toContain("View results");
  });

  it("renders a test cpu link if no tests run", () => {
    const machine = machineDetailsFactory();
    machine.cpu_test_status = testStatusFactory();
    state.machine.items = [machine];

    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <CpuCard machine={machine} setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.find("[data-test='tests']").childAt(0).find("Button").text()
    ).toContain("Test CPU");
  });
});
