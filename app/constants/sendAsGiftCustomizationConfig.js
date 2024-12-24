export const PRODUCT_SELECTION_TYPE = {
  ANY_PRODUCT: 1,
  SPECIFIC_PRODUCT: 2,
};
export const GIFT_CUSTOMIZATION_STATE = {
  productType: PRODUCT_SELECTION_TYPE.ANY_PRODUCT,
  selectedProductList: [],

  enableGiftWrap: false,
  giftWrapImage: null,
  giftWrapTitle: "Gift",
  giftWrapPrice: "0",
  giftWrapDescription: "",

  enableGiftMessage: false,
  giftMessageTitle: "",
  giftMessageDescription: "",

  sendWithGiftReceipt: false,
  sendWithNoInvoice: false,

  recipientEmailTitle: "",
  recipientEmailDescription: "",
  recipientEmail: "",
  sendEmailUponCheckout: false,
  sendEmailWhenItemIsShipped: false,
};
export const GIFT_CUSTOMIZATION_ERROR_STATE = {
  noProductError: false,
};
