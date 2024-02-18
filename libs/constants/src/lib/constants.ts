export const KAFKA_CLIENT = 'KAFKA_CLIENT';

export const KAFKA_ORDER_TYPES = {
  CREATE_ORDER: 'create-order',
  ORDER_CREATED: 'order-created',
};

export const KAFKA_PRODUCT_TYPES = {
  GET_LIST: 'get_list',
  GET_PRODUCT: 'get-product',
  CREATE_PRODUCT: 'create-product',
  UPDATE_PRODUCT: 'update-product',
  REMOVE_PRODUCT: 'remove-product',
  PRODUCT_UPDATED: 'product-updated',
};

export const KAFKA_USER_TYPES = {
  LOGIN: 'login',
  CREATE_USER: 'create-user',
  USER_LOGED: 'user-loged',
  VERIFY: 'verify',
};

export const KAFKA_TOPICS = {
  PRODUCT_EVENTS: 'product-events',
  ORDER_EVENTS: 'order-events',
  USER_EVENTS: 'user-events',
  PRODUCT_MESSAGES: 'product-messages',
  ORDER_MESSAGES: 'order-messages',
  USER_MESSAGES: 'user-messages',
};
