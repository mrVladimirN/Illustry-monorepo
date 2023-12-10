export class TypeError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TypeError.prototype);
  }

  printError() {
    return this.message;
  }
}
