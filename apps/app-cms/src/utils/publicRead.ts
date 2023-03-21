import { Access } from 'payload/config';

export const publicRead: Access = ({ req }) => {
  return true;
};