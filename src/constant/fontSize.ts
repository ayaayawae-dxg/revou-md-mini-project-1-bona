type FontSize =
  | 'headingXxLarge'
  | 'headingXLarge'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'headingXSmall'
  | 'headingXxSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphXSmall'
  | 'specialLarge'
  | 'specialMedium'
  | 'specialSmall'
  | 'specialXSmall'
  | 'specialXxSmall';

const FONT_SIZE: Record<FontSize, number> = {
  headingXxLarge: 28,
  headingXLarge: 24,
  headingLarge: 20,
  headingMedium: 16,
  headingSmall: 14,
  headingXSmall: 12,
  headingXxSmall: 10,

  paragraphLarge: 16,
  paragraphMedium: 14,
  paragraphSmall: 12,
  paragraphXSmall: 10,

  specialLarge: 16,
  specialMedium: 14,
  specialSmall: 12,
  specialXSmall: 10,
  specialXxSmall: 8,
};

export default FONT_SIZE;
