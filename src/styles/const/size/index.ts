const mediaDeclaration = "@media screen and";
const breakPoint = {
  sm: 480,
  md: 768,
  lg: 1024,
};
export const mediaQuery = {
  xs: `${mediaDeclaration} (min-width: ${breakPoint.sm}px)`,
  sm: `${mediaDeclaration} (min-width: ${breakPoint.md}px)`,
  underPc: `${mediaDeclaration} (max-width: ${breakPoint.md}px)`,
  pc: `${mediaDeclaration} (min-width: ${breakPoint.md + 1}px)`,
};