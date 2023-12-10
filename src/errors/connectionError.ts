export default class ConnectionError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }

  printError() {
    return this.message;
  }
}
