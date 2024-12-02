export const COUNTDOWN_TIMER_STATE = {
  FIX_END_DATE: "FIX_END_DATE",
  EVERGREEN: "EVERGREEN",
};

export const COUNTDOWN_TIMER_DISPLAY_FORMAT = {
  CLASSIC: "CLASSIC",
  HEXAGON_TIMER: "HEXAGON_TIMER",
  PROGRESS_CIRCLES: "PROGRESS_CIRCLES",
  CARDS: "CARDS",
  MODERNS: "MODERNS",
  PROGRESS_BAR: "PROGRESS_BAR",
  MINIMALIST: "MINIMALIST",
};

export const TIMER_ALIGNMENT_OPTIONS = {
  LEFT: "LEFT",
  CENTER: "CENTER",
  RIGHT: "RIGHT",
};
export const TIMER_MARGIN_UNITS = {
  PX: "px",
  REM: "rem",
};
// const SETTINGS_INITIAL_STATE = {
//   [COUNTDOWN_TIMER_STATE.FIX_END_DATE]: {
//     countDownStartAt: "",
//     countDownEndsAt: "",
//   },
//   [COUNTDOWN_TIMER_STATE.EVERGREEN]: {
//     coolOffTimer: 0,
//     minExpTime: { days: 0, hours: 0, minutes: 0 },
//     maxExpTime: { days: 0, hours: 0, minutes: 0 },
//   },
// };
export const CUSTOMIZATON_INITIAL_STATE = {
  settings: {
    status: COUNTDOWN_TIMER_STATE.FIX_END_DATE,

    countDownStartAt: "",
    countDownEndsAt: "",
    coolOffTimer: 0,
    minExpTime: { days: 0, hours: 0, minutes: 0 },
    maxExpTime: { days: 0, hours: 0, minutes: 0 },
  },
  display: {
    timerForDiscountedProducts: false,
    theme: COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC,
    timerAlignment: TIMER_ALIGNMENT_OPTIONS.LEFT,
    title: "Sale Ending in",
    titleColor: "#808080",
    digitsColor: "#808080",
    backgroundColor: "#808080",
    borderColor: "#808080",
    gradientStartColor: "#ff0000",
    gradientEndColor: "#0000ff",
    margin: {
      top: { value: 0, unit: TIMER_MARGIN_UNITS.PX },
      bottom: { value: 0, unit: TIMER_MARGIN_UNITS.REM },
    },
  },
};

export const COUNTDOWN_ERROR_STATE = {
  minMaxExp: false,
  endDateErr: false,
};
