export interface Exception {
  title?: string;
  message?: string;
  code?: string;
  httpStatusCode?: number;
  dismissible?: boolean;
  actions?: ExceptionAction[];
  icon?: ExceptionIcon;
}

export interface ExceptionAction {
  actionPath: string;
  label: string;
  icon?: ExceptionIcon;
}

export interface ExceptionIcon {
  url: string;
  visible: boolean;
}
