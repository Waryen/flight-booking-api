export class ErrorMessage {
  constructor(status: number, message: string) {
    this._message = message;
    this._status = status;
  }

  private readonly date = new Date().toISOString();
  private readonly _status;
  private readonly _message;

  public getErrorMessage() {
    return {
      status: this._status,
      message: this._message,
    };
  }

  public consoleErrorMessage() {
    const log = `[${this.date}]: error ${this._status} - ${this._message}`;
    console.log(log);
  }
}
