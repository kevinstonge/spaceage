const parameters = [
  {
    name: "search",
    type: "string",
    info: "Searches through the launch name, rocket name, launch agency, mission name & spacecraft name.",
  },
  {
    name: "name",
    type: "string",
  },
  {
    name: "lsp__name",
    type: "string",
    info: "launch service provider name",
  },
  {
    name: "slug",
    type: "string",
  },
  {
    name: "rocket__configuration__name",
    type: "string",
  },
  {
    name: "rocket__configuration__id",
    type: "integer",
  },
  {
    name: "status",
    type: "string",
  },
  {
    name: "rocket__spacecraftflight__spacecraft__name",
    type: "string",
  },
  {
    name: "rocket__spacecraftflight__spacecraft__name__icontains",
    type: "string",
  },
  {
    name: "rocket__spacecraftflight__spacecraft__id",
    type: "integer",
  },
  {
    name: "rocket__configuration__manufacturer__name",
    type: "string",
  },
  {
    name: "rocket__configuration__manufacturer__name__icontains",
    type: "string",
  },
  {
    name: "rocket__configuration__full_name",
    type: "string",
  },
  {
    name: "rocket__configuration__full_name__icontains",
    type: "string",
  },
  {
    name: "mission__orbit__name",
    type: "string",
  },
  {
    name: "mission__orbit__name__icontains",
    type: "string",
  },
  {
    name: "net__gt",
    type: "timestamp",
    info: "NET refers to the launch time and stands for 'no earlier than'. net__gt results will show launches with an NET greater than the specified value",
  },
  {
    name: "net__lt",
    type: "timestamp",
    info: "NET refers to the launch time and stands for 'no earlier than'. net__lt results will show launches with an NET less than the specified value",
  },
  {
    name: "net__gte",
    type: "timestamp",
    info: "NET refers to the launch time and stands for 'no earlier than'. net__gte results will show launches with an NET greater than or equal to the specified value",
  },
  {
    name: "net__lte",
    type: "timestamp",
    info: "NET refers to the launch time and stands for 'no earlier than'. net__lte results will show launches with an NET less than or equal to the specified value",
  },
  {
    name: "window_start__gt",
    type: "timestamp",
  },
  {
    name: "window_start__lt",
    type: "timestamp",
  },
  {
    name: "window_start__gte",
    type: "timestamp",
  },
  {
    name: "window_start__lte",
    type: "timestamp",
  },
  {
    name: "window_end__gt",
    type: "timestamp",
  },
  {
    name: "window_end__lt",
    type: "timestamp",
  },
  {
    name: "window_end__gte",
    type: "timestamp",
  },
  {
    name: "window_end__lte",
    type: "timestamp",
  },
  {
    name: "last_updated__gte",
    type: "timestamp",
  },
  {
    name: "last_updated__lte",
    type: "timestamp",
  },
  {
    name: "location__ids",
    type: "array[integer]",
  },
  {
    name: "lsp__ids",
    type: "array[integer]",
  },
  {
    name: "is_crewed",
    type: "boolean",
  },
  {
    name: "include_suborbital",
    type: "boolean",
  },
  {
    name: "serial_number",
    type: "string",
  },
  {
    name: "lsp__id",
    type: "integer",
  },
  {
    name: "launcher_config__id",
    type: "integer",
  },
  {
    name: "spacecraft_config_ids",
    type: "array[integer]",
  },
  {
    name: "related",
    type: "boolean",
  },
];

const ordering = {
  name: "ordering",
  type: "select",
  options: ["net", "name", "lsp__name"],
};

module.exports = [...parameters, ordering];
