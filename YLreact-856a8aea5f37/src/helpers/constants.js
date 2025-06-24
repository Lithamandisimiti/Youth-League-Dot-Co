export const DEFAULT_USER_IMAGE =
  'https://139.59.139.239/ylbackend/images/user.png';

export const PostTypes = Object.freeze({
  ALL: 'ALL',
  CATEGORY: 'CATEGORY',
  HOT: 'HOT',
  USER: 'USER',
});

export const Colors = {
  boulder: '#797979',
  concrete: '#F2F2F2',
  white: '#FFFFFF',
  black: '#000000',
  azureRadiance: '#007BFF',
  red: '#FF0000',
};

export const Breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  ipad: '1025px',
  laptop: '1280px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const Device = {
  mobileS: `(max-width: ${Breakpoints.mobileS})`,
  mobileM: `(max-width: ${Breakpoints.mobileM})`,
  mobileL: `(max-width: ${Breakpoints.mobileL})`,
  tablet: `(max-width: ${Breakpoints.tablet})`,
  ipad: `(max-width: ${Breakpoints.ipad})`,
  laptop: `(max-width: ${Breakpoints.laptop})`,
  laptopL: `(max-width: ${Breakpoints.laptopL})`,
  desktop: `(max-width: ${Breakpoints.desktop})`,
  desktopL: `(max-width: ${Breakpoints.desktop})`,
};
