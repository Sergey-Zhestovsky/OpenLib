import React, { useState, useEffect } from 'react';

import withScrollToTop from '../../../hoc/withScrollToTop';
import PageContext from '../../../context/PageContext';
import Footer, { footerStyles } from './Footer/Footer';
import Header, { headerStyles } from './Header/Header';
import Main, { bodyStyles } from './Main/Main';

function PageFrame(props) {
  const { children } = props;
  const [frame, setFrame] = useState(true);
  const [bodyStyle, setBodyStyle] = useState();
  const [header, setHeader] = useState(true);
  const [headerStyle, setHeaderStyle] = useState();
  const [footer, setFooter] = useState(true);
  const [footerStyle, setFooterStyle] = useState();


  return (
    <PageContext.Provider value={{
      frame, setFrame,
      bodyStyle, setBodyStyle, bodyStyles,
      header, setHeader,
      headerStyle, setHeaderStyle, headerStyles,
      footer, setFooter,
      footerStyle, setFooterStyle, footerStyles
    }}>
      {
        frame
          ? (
            <>
              {header && <Header style={headerStyle} />}
              <Main style={bodyStyle}>{children}</Main>
              {footer && <Footer style={footerStyle} />}
            </>
          )
          : children
      }
    </PageContext.Provider>
  );
}

export default withScrollToTop(PageFrame);