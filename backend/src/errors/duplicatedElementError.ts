export default class DuplicatedElementError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, DuplicatedElementError.prototype);
  }

  printError() {
    return this.message;
  }
}
