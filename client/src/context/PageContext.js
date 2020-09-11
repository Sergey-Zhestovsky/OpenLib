import { createContext } from 'react';

export const MenuContext = createContext({
  frame: true,
  setFrame: () => { },
  bodyStyle: null,
  setBodyStyle: () => { },
  header: true,
  setHeader: () => { },
  headerStyle: null,
  setHeaderStyle: () => { },
  footer: true,
  setFooter: () => { },
  footerStyle: null,
  setFooterStyle: () => { },
});

export default MenuContext;