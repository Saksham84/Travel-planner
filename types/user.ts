export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  resetOtp?: string | null;
  resetOtpExpiry?: Date | null;
};
