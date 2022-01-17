import {atom} from 'nanostores';

export const firstName = atom<string | undefined>(undefined);

export const setFirstName = (newFirstName: string): void => {
  firstName.set(newFirstName);
};
