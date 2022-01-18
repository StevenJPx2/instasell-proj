import {atom} from 'nanostores';

export interface User {
  firstName: string;
  phoneNumber: string;
  address: string;
}

export const firstName = atom<string | undefined>(undefined);
export const user = atom<User | undefined>(undefined);
