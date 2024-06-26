/**
 * The animation types, our naming of them, and their intended usage come directly:
 *
 *
 * The type of the animation has semantic meaning to what is being animated.
 * Please make sure you are using the semantically-correct type for your use-case.
 * i.e. Do not use `ExitsAndClosings` when animating the puck of a slider.
 *
 */
export enum AnimationType {
  Simple = 200,
  Opens = 300,
  ExitsAndClosings = 250,

  ShapeChangeSmall = 250,
  ShapeChangeMedium = 350,
  ShapeChangeLarge = 450,

  SmallElement = 200,
  MediumElement = 250,
  LargeElement = 350,
}

/**
 * The animation curves, our naming of them, and their intended usage come directly:
 *
 */
export enum AnimationCurve {
  Standard = 'EaseInOut',
  Decelerate = 'EaseOut',
  Accelerate = 'EaseIn',
}
