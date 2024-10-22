/// <reference types='codeceptjs' />
type homePage = typeof import('./pages/home.page.js');
type headerPage = typeof import('./pages/header.page.js');
type footerPage = typeof import('./pages/footer.page.js');
type timelinePage = typeof import('./pages/timeline.page.js');
type searchPage = typeof import('./pages/search.page.js');
type contactPage = typeof import('./pages/contact.page.js');
type ChaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, 
    homePage: homePage, headerPage: headerPage, timelinePage: timelinePage, 
    searchPage: searchPage, contactPage: contactPage, footerPage: footerPage
    }
  interface Methods extends WebDriver, ChaiWrapper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
