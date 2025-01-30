export const APP_TABS = [
  { id: "all", content: "All" },
  { id: "my-apps", content: "My apps" },
  { id: "boost-sales", content: "Boost Sales" },
  { id: "ux", content: "UX" },
  { id: "engage-users", content: "Engage Users" },
  { id: "social", content: "Social" },
];

export const WIDGETS_TABS = [
  ...APP_TABS,
  { id: "favorite", content: "Favorites" },
];

export const CATEGORIES_ENUM = {
  all: 1,
  myApps: 2,
  boostSales: 3,
  engageUsers: 4,
  ux: 5,
  favorites: 6,
};

export const APP_TYPE = {
  ANNOUNCEMENT_BARS: 1,
  COUNTDOWN_TIMER: 2,
  SEND_AS_A_GIFT: 3,
  SEND_AS_A_GIFT_CUSTOMIZATION: 4,
};

export const TABS_ENUM = {
  IMPRESSIONS: 1,
  CLICK: 2,
};

export const ROUTES = {
  HOME: "/app",
  APPS: "/apps",
  WIDGETS: "/widgets",
  SETTINGS: "/settings",
  PLAN: "/plan",
  HOMEPAGE: "/homepage",
  ANNOUNCEMENT_BAR: "/announcementBar",
  COUNTDOWN_TIMER: "/countdownTimer",
  ROUTE_TEST: "/RouteTest",
  ANNOUNCEMENT_CUSTOMIZATION_ROOT: "/apps/announcementBar/customization/",
  ANNOUNCEMENT_OVERVIEW: "/apps/announcementBar",
  INACTIVE_TAB: "/apps/inactiveTabMessage",
  ANALYTICS: "/analytics",
  SEND_AS_GIFT_CUSTOMIZATION: "/apps/sendAsGift/customization",
};

export const FETCHER_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  SUBMITTING: "submitting",
};
export const APP_LISTING = {
  ANNOUNCEMENT_BARS: 1,
  COUNTDOWN_TIMER: 2,
  SEND_AS_A_GIFT: 3,
 
};
export const MAX_APP_ALLOWED_SUBSCRIPTION_TYPES = {
  FREE: 1,
  STARTER: 4,
  ENTERPRISE: 20,
};

export const APP_LINKS = {
  HOW_TO_ENABLE_LINK:
    "https://www.canva.com/design/DAGaOdJ6UjU/tLvKCz0PGaWoFhZ-uoYVhQ/view?utm_content=DAGaOdJ6UjU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc1ea38183e",
  SHIPPING_AMOUNT_TUTORIAL:"https://help.shopify.com/en/manual/fulfillment/setup/shipping-profiles/setting-up-shipping-profiles"
  };
