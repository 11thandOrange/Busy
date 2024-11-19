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
  REM :"rem"
}
export const CUSTOMIZATON_INITIAL_STATE = {
  settings: {
    status: COUNTDOWN_TIMER_STATE.FIX_END_DATE,
    countDownStartAt: "",
    countDownEndsAt: "",
  },
  display: {
    timerForDiscountedProducts: false,
    theme: COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC,
    timerAlignment: TIMER_ALIGNMENT_OPTIONS.CENTER,
    title: "Sale Ending in",
    titleColor: "#ffffff",
    digitsColor: "#ffffff",
    backgroundColor: "#ff0000",
    borderColor: "#000000",
    gradientStartColor: "#ff0000",
    gradientEndColor: "#0000ff",
    margin:{
      top:{value:0,unit:TIMER_MARGIN_UNITS.PX},
      bottom:{value:0,unit:TIMER_MARGIN_UNITS.REM}
    }
  },
};
