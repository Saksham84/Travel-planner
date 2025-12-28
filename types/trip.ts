import { User } from "./user";

export type Trip = {
  _id: string;

  title: string;
  location: string;
  city: string;
  date: string;
  description: string;

  image?: {
    url: string;
    publicId: string;
  };

  userId: string | User;

  createdAt?: string;
  updatedAt?: string;
};
