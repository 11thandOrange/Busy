export const PRODUCT_SELECTION_TYPE = {
  ANY_PRODUCT: 1,
  SPECIFIC_PRODUCT: 2,
};
export const GIFT_CUSTOMIZATION_STATE = {
  selectionType: PRODUCT_SELECTION_TYPE.ANY_PRODUCT,
  selectedProductList: [],

  enableGiftWrap: true,
  giftWrapImage: null,
  giftWrapTitle: "Gift",
  giftWrapPrice: "0",
  giftWrapDescription: "Description",

  enableGiftMessage: false,
  giftMessageTitle: "Title",
  giftMessageDescription: "Description",

  sendWithGiftReceipt: false,
  sendWithNoInvoice: false,

  recipientEmailTitle: "Title",
  recipientEmailDescription: "Description",
  recipientEmail: "",
  sendEmailUponCheckout: false,
  sendEmailWhenItemIsShipped: false,

  giftWrapCustomizationText: "",
  giftWrapCustomizationColor: "",
  giftWrapCustomizationEmoji: "🔥",

  giftMessageCustomizationText: "",
  giftMessageCustomizationColor: "",
  giftMessageCustomizationEmoji: "🔥",
};
export const GIFT_CUSTOMIZATION_ERROR_STATE = {
  noProductError: false,
};
