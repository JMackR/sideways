export interface OnboardingState {
  isEditing?: boolean;
}

export type SceneObject = {
  title?: TextObject;
  wizardStep: OnboardingStep | number;
  textFields?: TextObject[];
  questionID: string;
  options?: OptionContent[];
  required?: boolean;
  questionType?: QuestionTypes;
};
export type OptionContent = {
  id: string;
  text: TextObject;
  isSelected?: boolean;
  value?: string;
  image?: string;
  planInformation?: PlanInformation;
  nextStep: OnboardingStep | string;
  prevStep: OnboardingStep | string;
  tooltipText?: string; // Helper text to add any more clarification. ya never know...
};
export type PlanInformation = {
  title: TextObject;
  skillLevel?: TextObject;
  details?: TextObject[];
  startDateInformation?: TextObject;
  description: TextObject;
};
export type QuestionTypes =
  | 'multi-select'
  | 'single-select'
  | 'text-input'
  | 'carousel'
  | 'startdate_select'
  | 'social-select'
  | 'finish';

enum OnboardingStep {
  STEP_1 = 'app_onboarding',
  STEP_2 = 'email_signin',
  STEP_3 = 'email_verification',
  STEP_4 = 'foo4',
  STEP_5 = 'foo5',
  STEP_6 = 'foo6',
  STEP_7 = 'foo7',
  STEP_8 = 'foo8',
  STEP_9 = 'foo9',
  STEP_10 = 'foo10',
  STEP_11 = 'foo11',
  STEP_12 = 'foo12',
}
export type TextObject = {
  order?: number;
  id: string;
  text: string;
  textType: TextTypes;
};
type TextTypes =
  | 'headerHeavy1'
  | 'headerHeavy2'
  | 'headerHeavy3'
  | 'headerBold1'
  | 'headerBold2'
  | 'headerBold3'
  | 'headerHeavyMedium1'
  | 'headerHeavyMedium2'
  | 'headerHeavyMedium3'
  | 'headerMedium1'
  | 'headerMedium2'
  | 'headerMedium3'
  | 'headerRegular1'
  | 'headerRegular2'
  | 'headerRegular3'
  | 'bodyHeavy1'
  | 'bodyHeavy2'
  | 'bodyHeavy3'
  | 'bodyBold1'
  | 'bodyBold2'
  | 'bodyBold3'
  | 'bodyHeavyMedium1'
  | 'bodyHeavyMedium2'
  | 'bodyHeavyMedium3'
  | 'bodyMedium1'
  | 'bodyMedium2'
  | 'bodyMedium3'
  | 'bodyRegular1'
  | 'bodyRegular2'
  | 'bodyRegular3'
  | 'bodyRegular4';
