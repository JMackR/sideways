export interface OnboardingData {
  toggle: string | undefined;
  input: string | undefined;
  date_time: string | undefined;
  input_time: string | undefined;
}
export const DEFAULT_PROPS: OnboardingData = {
  toggle: undefined,
  input: undefined,
  date_time: undefined,
  input_time: undefined,
};
