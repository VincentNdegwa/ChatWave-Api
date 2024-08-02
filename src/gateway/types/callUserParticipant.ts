export class callUserParticipant {
  start: boolean;
  mode: callMode;
  sender: Participant;
  receiver: Participant;
}

export enum callMode {
  VIDEO = 'video',
  VOICE = 'voice',
}
export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  about: string;
  created_at: string;
  updated_at: string | null;
}

export interface User {
  id: number;
  phone_number: string;
  created_at: string;
  updated_at: string | null;
  profile: Profile | null;
}

export interface Participant {
  id: number;
  role: string;
  user: User;
}
