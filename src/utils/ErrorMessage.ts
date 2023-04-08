export class ErrorMessage {
  constructor(status: number, message: string, details?: string) {
    this._message = message;
    this._status = status;
    this._details = details;
  }

  private readonly date = new Date().toISOString();
  private readonly _status;
  private readonly _message;
  private readonly _details;

  public getErrorMessage() {
    return {
      status: this._status,
      message: this._message,
      details: this._details,
    };
  }

  public consoleErrorMessage() {
    const log = `[${this.date}]: error ${this._status} - ${this._message} - ${this._details}`;
    console.log(log);
  }
}
