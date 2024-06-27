// Users
export type createUserParams = {
  phone_number: string;
  password: string;
};
export type loginParams = {
  phone_number: string;
  password: string;
};
export type verifyOTP = {
  id: number;
  OTP: number;
};
export type updateUserParams = {
  old_password: string;
  new_password: string;
};

// Profiles
export type createProfileParams = {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  about: string;
};
export type updateProfileParams = {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  about: string;
};

// Chats
export type createChatParams = {
  user_id: number;
  added_user_id: number;
};

export enum Role {
  ADMIN = 'admin',
  OWNER = 'owner',
  OTHER = 'other',
}

export type createParticipantParams = {
  conversationId: number;
  userId: createChatParams;
};

export type createMessageParams = {
  text: string;
  chat_id: number;
  sender_id: number;
};
