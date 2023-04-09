export interface IGenericMessage {
  getMessage: () => string;
  consoleMessage: () => void;
}

export class GenericMessage implements IGenericMessage {
  constructor(status: number, message: string, details?: string) {
    this._status = status;
    this._message = message;
    this._details = details;
  }

  private readonly _date = new Date().toISOString();
  private readonly _status;
  private readonly _message;
  private readonly _details;

  public getMessage() {
    const object = {
      status: this._status,
      message: this._message,
    };

    if (this._details) {
      Object.assign(object, { details: this._details });
    }

    return JSON.stringify(object);
  }

  public consoleMessage() {
    console.log(`[${this._date}]: ${this.getMessage()}`);
  }
}
