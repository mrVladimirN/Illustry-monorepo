export default class DuplicatedElementError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DuplicatedElementError.prototype);
  }

  printError() {
    return this.message;
  }
}
