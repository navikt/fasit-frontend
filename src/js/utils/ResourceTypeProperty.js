var ResourceTypeProperty = class ResourceTypeProperty {
  constructor(type, name, displayName, required) {
    this.type = type;
    this.name = name;
    this.displayName = displayName;
    this.required = required;
  }

  hintText(hint) {
    this.hint = hint;
    return this;
  }
};

export default ResourceTypeProperty;
