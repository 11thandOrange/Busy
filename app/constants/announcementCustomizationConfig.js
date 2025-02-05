import { formatDateToCustomString } from "../utils/clientFunctions";

export const ANNOUNCEMENT_BAR_TYPES = {
  TEXT: 1,
  COUNTDOWN_TIMER: 2,
  FREE_SHIPPING: 3,
  ORDERS_COUNTER: 4,
  EMAIL_CAPTURE: 5,
};
export const announcementPopoverData = [
  {
    id: 1,
    header: "Text",
    description: "Boost sales by announcing your best offers.",
    type: ANNOUNCEMENT_BAR_TYPES.TEXT,
  },
  {
    id: 2,
    header: "Countdown Timer",
    description: "Create urgency/expectations for ongoing/future events.",
    type: ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER,
  },
  {
    id: 3,
    header: "Free Shipping",
    description: "Increase order size by setting free shipping goals.",
    type: ANNOUNCEMENT_BAR_TYPES.FREE_SHIPPING,
  },
  {
    id: 4,
    header: "Orders Counter",
    description:
      "Build trust by letting your customers know how many orders your store has shipped.",
    type: ANNOUNCEMENT_BAR_TYPES.ORDERS_COUNTER,
  },
  // {
  //   id: 5,
  //   header: "Email Capture",
  //   description: "Capture Leads to grow your business",
  //   type: ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE,
  // },
];
export const STATUS = {
  ACTIVE: "1",
  INACTIVE: "0",
};
export const THEME_SETTINGS_STATUS = {
  TOP_RELATIVE: "TOP_RELATIVE",
  TOP_FIXED: "TOP_FIXED",
  BOTTOM: "BOTTOM",
};
export const ThemeStyleGridType = {
  COLOR: "color",
  IMAGE: "image",
};
export const SETTINGS_INITIAL_STATE = {
  status: STATUS.INACTIVE,
  name: "Text Bar",
  themeStyle: {
    id: 1,
    type: ThemeStyleGridType.COLOR,
    image: "https://placehold.co/200",
  },
  themeSettings: {
    status: THEME_SETTINGS_STATUS.TOP_RELATIVE,
    backgroundColor: "#38619a",
    textColor: "#ffffff",
    specialColor: "#38619a",
  },
  enableApp: false,
  enableAppInShopify: false,
  enableAppInShopifyLater: false,
};
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
export const ANNOUNCEMENT_BAR_INITIAL_STATE = {
  [ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE]: {
    generalSettings: {
      message: "Subscribe now and get 15% off",
      buttonText: "Get Code",
      buttonColor: "#9a3859",
      buttonTextColor: "#ffffff",
      couponText: "Now you can get 15% off at checkout with Coupon #coupon#",
      coupon: "FIRST15OFF",
    },
  },

  [ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER]: {
    generalSettings: {
      countDownStartAt: formatDateToCustomString(now),
      countDownEndsAt: formatDateToCustomString(tomorrow),
      message: "Offer ends in #countdown_timer#.",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.FREE_SHIPPING]: {
    generalSettings: {
      message: "Free shipping for orders over #amount#.",
      progressMessage: "Only #amount# away from free shipping.",
      finalMessage: "Congratulations! You've got free shipping.",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.ORDERS_COUNTER]: {
    generalSettings: {
      orderCount: 0,
      message:
        "We shipped #orders_count# orders already since the very beginning.",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.TEXT]: {
    generalSettings: {
      message: "Type Text Here",
    },
  },
};

export const ANNOUNCEMENT_BARS_TABS = {
  ANNOUNCEMENT_BAR: 1,
};

export const COLOR_THEME = {
  LIGHT: "light",
  DARK: "dark",
};
export const ANNOUNCEMENT_BARS_ERROR_STATE = {
  endDateErr: false,
};
