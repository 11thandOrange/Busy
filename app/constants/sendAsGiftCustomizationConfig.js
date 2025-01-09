export const PRODUCT_SELECTION_TYPE = {
  ANY_PRODUCT: 1,
  SPECIFIC_PRODUCT: 2,
};
export const GIFT_STATUS = {
  ACTIVE: "1",
  INACTIVE: "0",
};

export const GIFT_TYPE_STATUS = {
  ENABLE: "1",
  DISABLE: "0",
};
export const GIFT_CUSTOMIZATION_STATE = {
  status: GIFT_STATUS.INACTIVE,
  selectionType: PRODUCT_SELECTION_TYPE.ANY_PRODUCT,
  selectedProductList: [],

  enableGiftWrap: GIFT_TYPE_STATUS.DISABLE,
  giftWrapImage: null,
  giftWrapTitle: "Gift",
  giftWrapPrice: "0",
  giftWrapDescription: "Description",

  enableGiftMessage: false,
  giftMessageTitle: "Title",
  giftMessageDescription: "Description",

  enableGiftReceipt: true,
  sendWithGiftReceipt: false,
  sendWithNoInvoice: false,

  enableGiftRecipientEmail: true,
  recipientEmailTitle: "Title",
  recipientEmailDescription: "Description",
  recipientEmail: "",
  sendEmailUponCheckout: false,
  sendEmailWhenItemIsShipped: false,

  giftWrapCustomizationText: "Gift 1",
  giftWrapCustomizationColor: "#000000",
  giftWrapCustomizationEmoji: "🔥",

  giftMessageCustomizationText: "Gift 2",
  giftMessageCustomizationColor: "#000000",
  giftMessageCustomizationEmoji: "🔥",

  giftReceiptCustomizationText: "Gift 2",
  giftReceiptCustomizationColor: "#000000",
  giftReceiptCustomizationEmoji: "🔥",

  giftReceiptEmailCustomizationText: "Gift 2",
  giftReceiptEmailCustomizationColor: "#000000",
  giftReceiptEmailCustomizationEmoji: "🔥",
};
export const GIFT_CUSTOMIZATION_ERROR_STATE = {
  noProductError: false,
};
