import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import FabricSelect from "app/base/components/FabricSelect";
import FormikField from "app/base/components/FormikField";
import LinkModeSelect from "app/base/components/LinkModeSelect";
import SubnetSelect from "app/base/components/SubnetSelect";
import VLANSelect from "app/base/components/VLANSelect";
import fabricSelectors from "app/store/fabric/selectors";
import type { Fabric } from "app/store/fabric/types";
import subnetSelectors from "app/store/subnet/selectors";
import type { Subnet } from "app/store/subnet/types";
import { NetworkLinkMode } from "app/store/types/enum";
import type { NetworkInterfaceTypes } from "app/store/types/enum";
import type {
  NetworkInterface,
  NetworkLink,
  NodeVlan,
} from "app/store/types/node";
import type { VLAN } from "app/store/vlan/types";
import { toFormikNumber } from "app/utils";

export type NetworkValues = {
  ip_address?: NetworkLink["ip_address"];
  mode?: NetworkLinkMode | "";
  fabric: NodeVlan["fabric_id"] | "";
  subnet?: NetworkLink["subnet_id"] | "";
  vlan: NetworkInterface["vlan_id"] | "";
};

export const networkFieldsSchema = {
  ip_address: Yup.string(),
  mode: Yup.mixed().oneOf(Object.values(NetworkLinkMode)),
  fabric: Yup.number().required("Fabric is required"),
  subnet: Yup.number(),
  vlan: Yup.number().required("VLAN is required"),
};

export const networkFieldsInitialValues = {
  ip_address: "",
  mode: "",
  fabric: "",
  subnet: "",
  vlan: "",
} as NetworkValues;

const fieldOrder = ["fabric", "vlan", "subnet", "mode", "ip_address"];

type Props = {
  editing?: boolean;
  fabricDisabled?: boolean;
  includeUnconfiguredSubnet?: boolean;
  includeDefaultVlan?: boolean;
  interfaceType: NetworkInterfaceTypes;
  vlanDisabled?: boolean;
  vlans?: VLAN[] | null;
};

export enum Label {
  IPAddress = "IP address",
}

const NetworkFields = ({
  editing,
  fabricDisabled,
  includeUnconfiguredSubnet = true,
  includeDefaultVlan,
  interfaceType,
  vlanDisabled,
  vlans,
}: Props): JSX.Element | null => {
  const fabrics: Fabric[] = useSelector(fabricSelectors.all);
  const subnets: Subnet[] = useSelector(subnetSelectors.all);
  const { handleChange, setFieldValue, values } =
    useFormikContext<NetworkValues>();
  const resetFollowingFields = (
    name: keyof NetworkValues,
    hasSubnet?: boolean
  ) => {
    // Reset all fields after this one.
    const position = fieldOrder.indexOf(name);
    for (let i = position + 1; i < fieldOrder.length; i++) {
      let value = "";
      if (fieldOrder[i] === "mode") {
        // When editing and the subnet has been changed to another subnet then
        // set the mode to auto, otherwise if the subnet is set to unconfigured
        // then the link mode also needs to be set to unconfigured (LINK_UP).
        value =
          editing && hasSubnet ? NetworkLinkMode.AUTO : NetworkLinkMode.LINK_UP;
      }
      setFieldValue(fieldOrder[i], value);
    }
  };
  return (
    <>
      <FabricSelect
        defaultOption={null}
        disabled={fabricDisabled}
        name="fabric"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = evt.target;
          handleChange(evt);
          if (value || typeof value === "number") {
            const fabric = fabrics.find(
              ({ id }) => id === toFormikNumber(value)
            );
            // Update the VLAN on the node to be the default VLAN for that
            // fabric.
            setFieldValue("vlan", fabric?.default_vlan_id);
            resetFollowingFields("vlan");
          }
        }}
        required
      />
      <VLANSelect
        defaultOption={null}
        disabled={vlanDisabled}
        fabric={toFormikNumber(values.fabric)}
        includeDefaultVlan={includeDefaultVlan}
        name="vlan"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(evt);
          resetFollowingFields("vlan");
        }}
        required
        showSpinnerOnLoad
        vlans={vlans}
      />
      <SubnetSelect
        defaultOption={
          includeUnconfiguredSubnet
            ? {
                label: "Unconfigured",
                value: "",
              }
            : null
        }
        name="subnet"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(evt);
          resetFollowingFields("subnet", !!evt.target.value);
        }}
        vlan={toFormikNumber(values.vlan)}
      />
      {values.subnet ? (
        <LinkModeSelect
          defaultOption={null}
          interfaceType={interfaceType}
          name="mode"
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = evt.target;
            handleChange(evt);
            if (value === NetworkLinkMode.STATIC) {
              const subnet = subnets.find(
                ({ id }) => id === toFormikNumber(values.subnet)
              );
              setFieldValue(
                "ip_address",
                subnet?.statistics.first_address || ""
              );
            } else {
              setFieldValue("ip_address", "");
            }
          }}
          subnet={values.subnet}
        />
      ) : null}
      {values.mode === NetworkLinkMode.STATIC ? (
        <FormikField label={Label.IPAddress} name="ip_address" type="text" />
      ) : null}
    </>
  );
};

export default NetworkFields;
