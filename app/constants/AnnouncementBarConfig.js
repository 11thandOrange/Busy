export const ANNOUNCEMENT_BAR_TYPES = {
  TEXT: "TEXT",
  FREE_SHIPPING: "FREE_SHIPPING",
  ORDERS_COUNTER: "ORDERS_COUNTER",
  COUNTDOWN_TIMER: "COUNTDOWN_TIMER",
  EMAIL_CAPTURE: "EMAIL_CAPTURE",
};
export const STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
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
  name: "",
  themeStyle: {
    id: 1,
    type: ThemeStyleGridType.COLOR,
    image: "",
  },
  themeSettings: {
    status: THEME_SETTINGS_STATUS.TOP_RELATIVE,
    backgroundColor: "#38619a",
    textColor: "#ffffff",
    specialColor: "#38619a",
  },
};
export const ANNOUNCEMENT_BAR_INITIAL_STATE = {
  [ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE]: {
    generalSettings: {
      message: "Subscribe now and get 15% off",
      buttonText: "Get Code",
      buttonColor: "#9a3859",
      buttonTextColor: "#ffffff",
      couponText: "",
      coupon: "",
    },
  },

  [ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER]: {
    generalSettings: {
      countDownStartAt: "",
      countDownEndsAt: "",
      message: "Offer ends in #countdown_timer#.",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.FREE_SHIPPING]: {
    generalSettings: {
      initialMessage: "",
      progressMessage: "",
      message: "Free shipping for orders over #amount#.",
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
