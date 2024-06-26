export interface FontTheme {
  identifier: string;
  displayName: string;
  baseMargin: number;
  fonts: TextTypes;
  lineHeight?: number;
  baseBorder: {
    cornerRadius: { small: number; large: number };
    lineWeight: { light: number; heavy: number };
  };
}

export interface TextTypes {
  headerHeavy1?: FontStyle;
  headerHeavy2?: FontStyle;
  headerHeavy3?: FontStyle;
  headerBold1?: FontStyle;
  headerBold2?: FontStyle;
  headerBold3?: FontStyle;
  headerHeavyMedium1?: FontStyle;
  headerHeavyMedium2?: FontStyle;
  headerHeavyMedium3?: FontStyle;
  headerMedium1?: FontStyle;
  headerMedium2?: FontStyle;
  headerMedium3?: FontStyle;
  headerRegular1?: FontStyle;
  headerRegular2?: FontStyle;
  headerRegular3?: FontStyle;
  bodyHeavy1?: FontStyle;
  bodyHeavy2?: FontStyle;
  bodyHeavy3?: FontStyle;
  bodyBold1?: FontStyle;
  bodyBold2?: FontStyle;
  bodyBold3?: FontStyle;
  bodyHeavyMedium1?: FontStyle;
  bodyHeavyMedium2?: FontStyle;
  bodyHeavyMedium3?: FontStyle;
  bodyMedium1?: FontStyle;
  bodyMedium2?: FontStyle;
  bodyMedium3?: FontStyle;
  bodyRegular1?: FontStyle;
  bodyRegular2?: FontStyle;
  bodyRegular3?: FontStyle;
  bodyRegular4?: FontStyle;
}

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export interface FontStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight | undefined;
  lineHeight: number;
}
