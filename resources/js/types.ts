type DateTime = string;

export type Nullable<T> = T | null;

export interface Team {
  id: number;
  name: string;
  personal_team: boolean;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface User {
  id: number;
  name: string;
  email: string;
  current_team_id: Nullable<number>;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Auth {
  user: Nullable<
    User & {
      all_teams?: Team[];
      current_team?: Team;
    }
  >;
}

export type InertiaSharedProps<T = {}> = T & {
  jetstream: {
    canCreateTeams: boolean;
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTeamFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
    hasEmailVerification: boolean;
  };
  auth: Auth;
  errorBags: any;
  errors: any;
};

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

// export interface Meeting {
//     id: number;
//     title: string;
//     date: string;
//     time: string;
//     host: string;
//     attendees: string[];
//     minutesAvailable?: boolean;
//     summary?: string;
//     agenda?: string[];
//     discussionPoints?: string[];
//     actionItems?: string[];
//     notes?: string;
//   };
export type Committee = {
  id: string;
  name: string;
}
export type Note = {
  id?: string;
  committee_id: string;
  content: string,
  created_at: string,
  meeting_id: string,
  updated_at: string,
  user_id: number
}
export type Meeting = {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  time: string;
  host: string;
  attendees: string[];
  minutesAvailable?: boolean;
  summary?: string;
  agenda?: string[];
  discussionPoints?: string[];
  actionItems?: string[];
  minutesApproved?: boolean
  committees?: Committee[];
  notes?: Note[];
};
