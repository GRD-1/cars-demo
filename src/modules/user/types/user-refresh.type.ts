import { Request } from 'express';

export interface UserRefreshType extends Request {
  userId: string;
}
