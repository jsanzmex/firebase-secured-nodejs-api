export {}

declare global {
  namespace Express {
    export interface Request {
      token: { uid: string }
    }
  }
}