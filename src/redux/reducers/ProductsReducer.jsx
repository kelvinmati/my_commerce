import * as types from "../types";
const initialState = {
  loading: true,
  products: [],
  more_products: [],
  more_products_loading: true,
  product: {},
  categories: [],
  sub_categories: [],
  cart: [],
  orderPaid: null,
  orders: [],
  sub_category_products: [],
  more_sub_category_products: [],
  more_sub_category_products_loading: false,
  category_products: [],
  total_category_products: 0,
  more_category_products: null,
  language: localStorage.getItem("lang"),
  searched_products: [],
  products_search_loading: true,
  products_loading: false,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCTS_LOADING:
      return {
        ...state,
        products_loading: true,
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        products: action.payload,
      };
    case types.GET_MORE_PRODUCTS:
      return {
        ...state,
        isAuthenticated: false,
        more_products_loading: false,
        more_products: [...state.more_products, ...action.payload],
      };
    case types.GET_SINGLE_PRODUCT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        product: action.payload,
      };
    case types.SEARCH_PRODUCTS:
      return {
        ...state,
        isAuthenticated: false,
        products_search_loading: false,
        searched_products: action.payload,
      };
    case types.GET_CATEGORIES:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        categories: action.payload,
      };
    case types.GET_SUB_CATEGORIES_BY_CATEGORY:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        sub_categories: action.payload,
      };
    case types.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        isAuthenticated: false,
        products_loading: false,
        total_category_products: action.totalProducts,
        category_products: [...state?.category_products, ...action?.payload],
      };
    case types.RESET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        isAuthenticated: false,
        category_products: [],
      };
    case types.GET_PRODUCTS_BY_SUB_CATEGORY:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        sub_category_products: action.payload,
      };
    case types.GET_MORE_PRODUCTS_BY_SUB_CATEGORY:
      return {
        ...state,
        more_sub_category_products: [
          ...state?.more_sub_category_products,
          ...action?.payload?.products,
        ],
        loading: false,
      };
    case types.CLEAR_MORE_PRODUCTS_BY_SUB_CATEGORY:
      return {
        ...state,
        more_sub_category_products: [],
      };
    case types.GET_USER_CART_ITEMS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        cart: action.payload,
      };
    case types.ADD_TO_CART:
    case types.DECREASE_CART_PRODUCT_QUANTITY:
    case types.REMOVE_CART_PRODUCT:
      return {
        ...state,
        isAuthenticated: true,
        cart: action.payload,
        loading: false,
      };
    case types.MAKE_ORDER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        orderPaid: action.payload,
      };
    case types.GET_ORDERS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        orders: action.payload,
      };

    case types.GET_LANGUAGE:
      return {
        ...state,
        isAuthenticated: false,
        language: action.payload,
      };
    default:
      return state;
  }
};
