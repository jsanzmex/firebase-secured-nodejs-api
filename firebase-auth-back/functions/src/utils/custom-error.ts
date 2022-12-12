
export class CustomError extends Error {
  statusCode: number;
  data: any;
  code: string = '';

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  // set data(data: any) {
  //   this._data = data;
  // }
 
  // set code(code: string) {
  //   this._code = code;
  // }
}