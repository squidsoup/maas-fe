import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import MachineTests from ".";

import { HardwareType, ResultType } from "app/base/enum";
import type { RootState } from "app/store/root/types";
import {
  machineState as machineStateFactory,
  machineDetails as machineDetailsFactory,
  nodeResult as nodeResultFactory,
  nodeResults as nodeResultsFactory,
  nodeResultState as nodeResultStateFactory,
  rootState as rootStateFactory,
} from "testing/factories";

const mockStore = configureStore();

describe("MachineTests", () => {
  let state: RootState;
  beforeEach(() => {
    state = rootStateFactory({
      machine: machineStateFactory({
        loaded: true,
        items: [
          machineDetailsFactory({
            locked: false,
            permissions: ["edit"],
            system_id: "abc123",
          }),
        ],
      }),
      noderesult: nodeResultStateFactory({
        loaded: true,
      }),
    });
  });

  it("renders", () => {
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <MachineTests />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it.only("renders headings for each hardware type", () => {
    state.noderesult.items = [
      nodeResultsFactory({
        id: "abc123",
        results: [
          nodeResultFactory({
            result_type: ResultType.Testing,
            hardware_type: HardwareType.CPU,
          }),
          nodeResultFactory({
            result_type: ResultType.Testing,
            hardware_type: HardwareType.Network,
          }),
          nodeResultFactory({
            result_type: ResultType.Testing,
            hardware_type: HardwareType.Node,
          }),
        ],
      }),
    ];
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <Route path="/machine/:id">
            <MachineTests />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("[data-test='hardware-heading']").at(0).text()).toEqual(
      "CPU"
    );
    expect(wrapper.find("[data-test='hardware-heading']").at(1).text()).toEqual(
      "Network"
    );
    expect(wrapper.find("[data-test='hardware-heading']").at(2).text()).toEqual(
      "Other Results"
    );
  });

  it("renders headings for each block device", () => {
    state.noderesult.items = [
      nodeResultsFactory({
        id: "abc123",
        results: [
          nodeResultFactory({
            result_type: ResultType.Testing,
            hardware_type: HardwareType.Storage,
            physical_blockdevice: 1,
          }),
          nodeResultFactory({
            result_type: ResultType.Testing,
            hardware_type: HardwareType.Storage,
            physical_blockdevice: 2,
          }),
        ],
      }),
    ];
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machine/abc123", key: "testKey" }]}
        >
          <Route path="/machine/:id">
            <MachineTests />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("[data-test='storage-heading']").at(0).text()).toEqual(
      "1"
    );
    expect(wrapper.find("[data-test='storage-heading']").at(1).text()).toEqual(
      "2"
    );
  });
});