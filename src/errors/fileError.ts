export class FileError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FileError.prototype);
  }

  printError() {
    return this.message;
  }
}
