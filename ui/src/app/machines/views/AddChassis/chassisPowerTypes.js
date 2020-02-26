/**
 * Hard coded chassis types. This is because there is currently no method in
 * MAAS to get a full list of supported chassis. Remove this file when this bug
 * has been fixed: https://bugs.launchpad.net/maas/+bug/1863905
 * @returns {Array.<Object>} Chassis power types.
 */

export default [
  {
    name: "mscm",
    description: "Moonshot Chassis Manager",
    fields: [
      {
        name: "hostname",
        label: "Host",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "username",
        label: "Username",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: true
      }
    ]
  },
  {
    name: "powerkvm",
    description: "PowerKVM",
    fields: [
      {
        name: "hostname",
        label: "Address",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: false
      },
      {
        name: "prefix_filter",
        label: "Prefix filter",
        field_type: "string",
        default: "",
        choices: [],
        required: false
      }
    ]
  },
  {
    name: "recs_box",
    description: "Christmann RECS|Box",
    fields: [
      {
        name: "hostname",
        label: "Hostname",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "port",
        label: "Port",
        field_type: "string",
        default: "80",
        choices: [],
        required: false
      },
      {
        name: "username",
        label: "Username",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: true
      }
    ]
  },
  {
    name: "seamicro15k",
    description: "SeaMicro 15000",
    fields: [
      {
        name: "hostname",
        label: "Hostname",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "username",
        label: "Username",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "power_control",
        label: "Power Control",
        field_type: "choice",
        default: "restapi2",
        choices: [
          ["restapi2", "REST API V2.0"],
          ["restapi", "REST API V0.9"],
          ["ipmi", "IPMI"]
        ],
        required: true
      }
    ]
  },
  {
    name: "ucsm",
    description: "UCS Chassis Manager",
    fields: [
      {
        name: "hostname",
        label: "URL",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "username",
        label: "Username",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: true
      }
    ]
  },
  {
    name: "virsh",
    description: "Virsh (virtual systems)",
    fields: [
      {
        name: "hostname",
        label: "Address",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: false
      },
      {
        name: "prefix_filter",
        label: "Prefix filter",
        field_type: "string",
        default: "",
        choices: [],
        required: false
      }
    ]
  },
  {
    name: "vmware",
    description: "VMware",
    fields: [
      {
        name: "hostname",
        label: "Host",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "username",
        label: "Username",
        field_type: "string",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "password",
        label: "Password",
        field_type: "password",
        default: "",
        choices: [],
        required: true
      },
      {
        name: "prefix_filter",
        label: "Prefix filter",
        field_type: "string",
        default: "",
        choices: [],
        required: false
      }
    ]
  }
];