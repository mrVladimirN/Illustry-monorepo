export class NoDataFoundError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoDataFoundError.prototype);
  }

  printError() {
    return this.message;
  }
}
