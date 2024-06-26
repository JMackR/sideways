import values from 'lodash/values';

export enum NavigableRoute {
  // HOME STACK
  APP_STACK = 'APP_STACK',
  HOME_STACK = 'HOME_STACK',
  HOME = 'HOME',
  // ONBOARDING_STACK
  ONBOARDING_STACK = 'ONBOARDING_STACK',
  ONBOARDING_NAV = 'ONBOARDING_NAV',
  ONBOARDING_LANDING = 'ONBOARDING_LANDING',
  ONBOARDING_WIZARD = 'ONBOARDING_WIZARD',
  EMAIL_SIGNIN = 'EMAIL_SIGNIN',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  BIOMETRICS = 'BIOMETRICS',
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
  STEP_4 = 'STEP_4',
  STEP_5 = 'STEP_5',
  STEP_6 = 'STEP_6',
  STEP_7 = 'STEP_7',
  STEP_8 = 'STEP_8',
  STEP_9 = 'STEP_9',
  STEP_10 = 'STEP_10',
  STEP_11 = 'STEP_11',
  NOTIFICATION_PERMISSIONS = 'NOTIFICATION_PERMISSIONS',
  LOGIN_HELP = 'LOGIN_HELP',
  LOCATION_PERMISSIONS = 'LOCATION_PERMISSIONS',

  // TRAINING STACK
  TRAINING_STACK = 'TRAINING_STACK',
  TRAINING_MAIN = 'TRAINING_MAIN',
  VIEW_PLAN = 'VIEW_PLAN',
  CHANGE_PLAN = 'CHANGE_PLAN',
  CHALLENGES = 'CHALLENGES',
  TRAINING_PLANS_SELECT = 'TRAINING_PLANS_SELECT',
  TRAINING_PLAN_OVERVIEW = 'TRAINING_PLAN_OVERVIEW',
  CURRENT_CHALLENGE = 'CURRENT_CHALLENGE',
  ACTIVITY_ENTRY = 'ACTIVITY_ENTRY',
  HEALTHKIT_REQUEST = 'HEALTHKIT_REQUEST',
  GOOGLE_HEALTH_REQUEST = 'GOOGLE_HEALTH_REQUEST',

  // GROUPS STACK
  GROUPS_STACK = 'GROUPS_STACK',

  // STATS_STACK
  STATS_STACK = 'STATS_STACK',
  STATS_MAIN = 'STATS_MAIN',
  STATS_MILES = 'STATS_MILES',
  STATS_BADGES = 'STATS_BADGES',

  // STORE_STACK
  STORE_STACK = 'STORE_STACK',

  // PODCAST_STACK
  PODCAST_APP = 'PODCAST_APP',
  PODCAST_STACK = 'PODCAST_STACK',
  PODCAST_SCREEN = 'PODCAST_SCREEN',
  PODCASTS_STACK = 'PODCASTS_STACK',
  EPISODES_STACK = 'EPISODES_STACK',
  EPISODES = 'EPISODES',

  LIBRARY_STACK = 'LIBRARY_STACK',
  LIBRARY = 'LIBRARY',

  MORE_STACK = 'MORE_STACK',
  MORE = 'MORE',

  // USER ROUTES
  PROFILE_MAIN = 'PROFILE_MAIN',
  MANAGE_PROFILE = 'MANAGE_PROFILE',
  NOTIFICATIONS_MANAGEMENT = 'NOTIFICATIONS_MANAGEMENT',
  BIOMETRICS_MANAGEMENT = 'BIOMETRICS_MANAGEMENT',
  // COMMON ROUTES
  BIBLE_READER = 'BIBLE_READER',
  AFFIRM_REJECT_MODAL = 'AFFIRM_REJECT_DIALOG',
  DATE_ENTRY = 'DATE_ENTRY',
  COMPLETION_MODAL = 'COMPLETION_MODAL',
  SELECT_PLAN_MODAL = 'SELECT_PLAN_MODAL',
  LOCATION_REQUEST = 'LOCATION_REQUEST',
  PUSHNOTIFICATION_REQUEST = 'PUSHNOTIFICATION_REQUEST',
}

export const navigableRoutes: string[] = values(NavigableRoute);
