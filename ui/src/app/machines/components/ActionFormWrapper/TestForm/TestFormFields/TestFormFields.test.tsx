import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";

import TestForm from "../TestForm";
import {
  machine as machineFactory,
  machineState as machineStateFactory,
  machineStatus as machineStatusFactory,
  rootState as rootStateFactory,
  scriptsState as scriptsStateFactory,
  scripts as scriptsFactory,
} from "testing/factories";
import { RootState } from "app/store/root/types";

const mockStore = configureStore();

describe("TestForm", () => {
  let initialState: RootState;

  beforeEach(() => {
    initialState = rootStateFactory({
      machine: machineStateFactory({
        loaded: true,
        items: [
          machineFactory({ system_id: "abc123" }),
          machineFactory({ system_id: "def456" }),
        ],
        statuses: {
          abc123: machineStatusFactory(),
          def456: machineStatusFactory(),
        },
      }),
      scripts: scriptsStateFactory({
        loaded: true,
        items: [
          scriptsFactory({
            name: "smartctl-validate",
            tags: ["commissioning", "storage"],
            parameters: {
              storage: {
                argument_format: "{path}",
                type: "storage",
              },
            },
            type: 2,
          }),
          scriptsFactory({
            name: "internet-connectivity",
            tags: ["internet", "network-validation", "network"],
            parameters: {
              url: {
                default: "https://connectivity-check.ubuntu.com",
                description:
                  "A comma seperated list of URLs, IPs, or domains to test if the specified interface has access to. Any protocol supported by curl is support. If no protocol or icmp is given the URL will be pinged.",
                required: true,
              },
            },
            type: 2,
          }),
        ],
      }),
    });
  });

  it("displays a field for URL if a selected script has url parameter", async () => {
    const state = { ...initialState };
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines/add", key: "testKey" }]}
        >
          <TestForm setSelectedAction={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("[data-test='url-script-input']").exists()).toBe(false);
    await act(async () => {
      wrapper.find("Input .tag-selector__input").simulate("focus");
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('[data-test="existing-tag"]').at(0).simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("[data-test='url-script-input']").exists()).toBe(true);
  });
});
