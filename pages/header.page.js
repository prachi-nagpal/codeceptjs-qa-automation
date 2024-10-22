const { I } = inject();
const config = require("codeceptjs").config.get();

// Constants
const envConfig = config.envConfig;

module.exports = {

  // Locators
  locators: {
    section: "header.Header--bottom",
    logo: "a.Header-branding",
    nav: {
      section: "nav.Header-nav--primary",
      allMenus: "nav.Header-nav--primary .Header-nav-item",
      menuItemWithSubMenu: "//nav[contains(@class,'Header-nav--primary')]//a[@class='Header-nav-folder-title'][text()='MENU_NAME']",
      subMenuItem: "//nav[contains(@class,'Header-nav--primary')]//a[@class='Header-nav-folder-title'][text()='MENU_NAME']/..//a[@class='Header-nav-folder-item'][text()='MENU_SUB_NAME']",
      menuItemWithoutSubMenu: "//nav[contains(@class,'Header-nav--primary')]//a[@class='Header-nav-item'][text()='MENU_NAME']"
    },
    searchBtn: "button.Header-search-form-submit",
  },

  // Functions
  validateComponents() {
    I.waitForVisible(this.locators.section, 5);
    I.waitForVisible(this.locators.logo, 5);
    I.waitForVisible(this.locators.searchBtn, 5);
    I.waitForVisible(this.locators.nav.section, 5);
    I.waitForVisible(this.locators.nav.allMenus, 5);
  },

  navigateToMenu(menu, subMenu = "") {
    I.waitForVisible(this.locators.nav.section, 5);
    I.assertLengthAboveThan(menu, 0)
    if(subMenu) {
      // Locate Menu & Move cursor to open SubMenus
      const menuLocator = this.locators.nav.menuItemWithSubMenu.replace("MENU_NAME", menu);
      const subMenuLocator = this.locators.nav.subMenuItem.replace("MENU_NAME", menu).replace("MENU_SUB_NAME", subMenu);
      I.waitForVisible(menuLocator, 5);
      I.waitForClickable(menuLocator, 5);
      // Hover on Menu Item
      I.moveCursorTo(menuLocator);
      // Wait for Sub Menu to be visible
      I.waitForVisible(subMenuLocator, 5);
      // Hover on SubMenu Item
      I.moveCursorTo(subMenuLocator);
      I.click(subMenuLocator);
    } else {
      // Locate & Click Menu Item
      const menuLocator = this.locators.nav.menuItemWithoutSubMenu.replace("MENU_NAME", menu);
      I.waitForVisible(menuLocator, 5);
      I.waitForClickable(menuLocator, 5);
      I.click(menuLocator);
    }
  },

  clickSearchMenu() {
    I.waitForClickable(this.locators.searchBtn, 5);
    I.click(this.locators.searchBtn);
  },

};