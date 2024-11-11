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

export const SETTINGS_INITIAL_STATE = {
  status: STATUS.INACTIVE,
  name: "",
  themeStyle: 1,
  themeSettings: {
    status: THEME_SETTINGS_STATUS.TOP_RELATIVE,
    backgroundColor: "#38619a",
    textColor: "#38619a",
    specialColor: "#38619a",
  },
};
export const ANNOUNCEMENT_BAR_INITIAL_STATE = {
  [ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE]: {
    generalSettings: {
      message: "",
      buttonText: "",
      buttonColor: "#38619a",
      buttonTextColor: "#fff",
      couponText: "",
      coupon: "",
    },
  },

  [ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER]: {
    generalSettings: {
      countDownStartAt: "",
      countDownEndsAt: "",
      message: "",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.FREE_SHIPPING]: {
    generalSettings: {
      initialMessage: "",
      progressMessage: "",
      message: "",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.ORDERS_COUNTER]: {
    generalSettings: {
      orderCount: 0,
      messsage: "",
    },
  },
  [ANNOUNCEMENT_BAR_TYPES.TEXT]: {
    generalSettings: {
      messsage: "Type Text Here",
    },
  },
};
