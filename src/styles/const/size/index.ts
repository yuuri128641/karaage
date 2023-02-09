const mediaDeclaration = "@media screen and";
const breakPoint = {
  sm: 480,
  md: 768,
  lg: 1024,
};
export const mediaQuery = {
  xs: `${mediaDeclaration} (min-width: ${breakPoint.sm}px)`,
  sm: `${mediaDeclaration} (min-width: ${breakPoint.md}px)`,
  lg: `${mediaDeclaration} (min-width: ${breakPoint.lg}px)`,
};