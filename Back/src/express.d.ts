import { IRol } from './src/users/user.entity'; 

declare global {
  namespace Express {
    interface Request {
      user?: {
        uuid: string;  
        email: string;
        roles: IRol[];
      };
    }
  }
}
