export class ErrorMessage {
  constructor(status: number, message: string) {
    this._message = message;
    this._status = status;
  }

  private _status;
  private _message;
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  public getErrorMessage() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
