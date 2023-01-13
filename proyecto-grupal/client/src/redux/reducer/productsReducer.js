import {
  GET_USERS,
  SET_ACTIVE_INACTIVE,
  TURN_INTO_ADMIN_OR_USER,
} from "../actions/productsActions";

const initialState = {
  products: [],
  allProducts: [],
  categories: [],
  cart: [],
  reviews: {},
  orders: [],
  allOrders: [],
  detail: {},
  orderDetail: {},
  users: [],
  allUsers: [],
  user: {},
  socialUser: {},
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  userProfile: {},
  wishListItems: [],
  detailOrder:[]
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case "GET_PRODUCT_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "POST_CATEGORY":
      return {
        ...state,
      };

    case "POST_PRODUCT":
      return {
        ...state,
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case "PUT_CATEGORY":
      return {
        ...state,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        productDeleted: action.payload,
      };

    case "PUT_PRODUCT":
      return {
        ...state,
      };

    case "ALPHABETICAL_ORDER":
      let sortedArr =
        action.payload === true
          ? state.products?.sort((a, b) => b.title.localeCompare(a.title))
          : state.products?.sort((a, b) => a.title.localeCompare(b.title));
      return {
        ...state,
        products: sortedArr,
      };

    case "ORDER_BY_RATING":
      let sortedArr2 =
        action.payload === true
          ? state.products?.sort(
              (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
            )
          : state.products?.sort(
              (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
            );
      return {
        ...state,
        products: sortedArr2,
      };

    case "ORDER_BY_PRICE":
      let sortedArr3 =
        action.payload === true
          ? state.products?.sort(
              (a, b) => parseInt(a.price) - parseInt(b.price)
            )
          : state.products?.sort(
              (a, b) => parseInt(b.price) - parseInt(a.price)
            );
      return {
        ...state,
        products: sortedArr3,
      };

      case "FILTER_BY_CATEGORIES":
        const allProductsCategories = state.allProducts;
        console.log('Filtrando por categoría: ', action.payload);
        let categoriesFiltered;
        if (action.payload === "All") {
          categoriesFiltered = allProductsCategories;
        } else {
          console.log(allProductsCategories);
          categoriesFiltered = allProductsCategories.map(elementoProducto => {
            let tieneCategoria = undefined;
            if (elementoProducto.categories) {
              console.log('Entra al if de elementoProducto.categories: ', elementoProducto.categories);
              tieneCategoria = elementoProducto.categories.find(elementoCategoria => {
                console.log('Entra al .find para el elementoCategoria: ', elementoCategoria);
                console.log('elementoCategoria.name === action.payload?: ', elementoCategoria.name === action.payload);
                return elementoCategoria.name === action.payload;
              })
            }
            console.log('al terminar el .find, tieneCategoria es: ', tieneCategoria);
            if (tieneCategoria !== undefined) {
              console.log('entra a tieneCategoria !== undefined porque eso es: ', tieneCategoria !== undefined);
              console.log('el elementoProducto a devolver es: ', elementoProducto);
              return elementoProducto;
            }
          })
        }
        // console.log(action.payload);
        // const categoriesFiltered =
        //   action.payload === "All"
        //     ? allProductsCategories
        //     : allProductsCategories.map((productItem) => {
        //       let foundItem;
        //       console.log('Entra al allProductsCategories.map. productItem es: ', productItem);
        //       if(productItem.categories) {
        //         console.log('Entra al if de productItem.categories: ', productItem.categories);
        //         foundItem = productItem.categories.find(categoryItem => {
        //           return categoryItem.hasOwnProperty("name");
        //         });
        //         console.log('foundItem: ', foundItem);
        //       if (foundItem && foundItem.name.includes(action.payload)) {
        //         console.log('entra al doble if');
        //         return productItem;
        //       }
        //       }
              
        //       // if(foundItem) {
        //       //   console.log('entra al if de foundItem y lo devuelve');
        //       //   return foundItem;
        //       // }
        //       // productItem.categories
        //       //     ?.find((e) => e.hasOwnProperty("name"))
        //       //     .name.includes(action.payload)
        //         });
        console.log('categoriesFiltered: ', categoriesFiltered);
        return {
          ...state,
          products: categoriesFiltered.filter(elementoProducto => elementoProducto !== undefined),
        };

    case "SEARCH_PRODUCT":
      let productList;
      if (action.payload.length === 0) {
        productList = state.allProducts;
      } else {
        let listTitle = state.allProducts.filter((product) => {
          let nameProduct = product.title.toLowerCase();
          return nameProduct.includes(action.payload.toLowerCase());
        });
        let listDesc = state.allProducts.filter((product) => {
          let nameProduct = product.description.toLowerCase();
          return nameProduct.includes(action.payload.toLowerCase());
        });
        let listBrand = state.allProducts.filter((product) => {
          let nameProduct = product.brand.toLowerCase();
          return nameProduct.includes(action.payload.toLowerCase());
        });
        const listTotal = listTitle.concat(listDesc.concat(listBrand));
        const setTotal = new Set(listTotal);
        productList = Array.from(setTotal);
      }
      return {
        ...state,
        products: productList,
      };

    case "GET_PRODUCTS_BY_NAME":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_CART":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "GET_CART":
      return {
        ...state,
      };
    case "DELETE_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_CART":
      let itemInCart = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((i) =>
              i.productId === action.payload.productId
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    amount: i.amount + action.payload.amount,
                  }
                : i
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };

    case "ONE_ITEM_CART":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.productId === action.payload.productId
            ? {
                ...i,
                quantity: action.payload.quantity,
                amount: action.payload.amount,
              }
            : i
        ),
      };

    case "DELETE_ITEMS":
      const data = state.cart?.filter(
        (item) => item.productId !== action.payload.productId
      );

      return {
        ...state,
        cart: data,
      };

    case "POST_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    case "DELETE_REVIEWS":
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };

    case "CREATE_ORDER":
      return {
        ...state,
      };

    case "GET_ORDERS":
      return {
        ...state,
        allOrders: action.payload,
        orders: action.payload,
      };
      case "GET_ORDERSBYID":
        return {
          ...state,
          detailOrder: action.payload,
      
        };
    case "GET_ORDER_DETAIL":
      return {
        ...state,
        orderDetail: action.payload,
      };

    case "SIGN_USER":
      return {
        ...state,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };
    case SET_ACTIVE_INACTIVE:
      return {
        ...state,
      };
    case TURN_INTO_ADMIN_OR_USER:
      return {
        ...state,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: {},
      };
    case "IS_SOCIAL_USER":
      return {
        ...state,
        socialUser: action.payload,
      };
    case "FILTER_BY_STATUS":
      console.log("filtro: " + action.payload);
      if (action.payload === "all") {
        return { ...state, orders: state.allOrders };
      } else {
        const orders = state.allOrders;
        const filter = orders.filter((e) => e.status === action.payload);
        return { ...state, orders: filter };
      }
    case "GET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };
    case "UPADTE_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };

    case "CANCELL_ORDER":
      return {
        ...state,
      };
    case "CONFIRM_ORDER":
      return {
        ...state,
      };
    case "SHIPPING_ORDER":
      return {
        ...state,
      };
    case "GET_USER_WISH_LIST":
      return {
        ...state,
        wishListItems: action.payload,
      };
    case "ADD_PRODUCT_TO_WISH_LIST":
      console.log("action.payload de ADD_PRODUCT_TO_WISH_LIST", action.payload);
      const wishListItemToAdd = {
        id: action.payload.productId,
        thumbnail: action.payload.thumbnail,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
      };
      console.log("wishListItemToAdd: ", wishListItemToAdd);
      // for(let i = 0; i < state.wishListItems.length; i++) {
      //   console.log('entra al for');
      //   console.log('wishListItemToAdd.id: ', wishListItemToAdd.id);
      //   console.log('state.wishListItems[i].id: ', state.wishListItems[i].id);
      //   if(wishListItemToAdd.id === state.wishListItems[i].id) {
      //     console.log('entra a wishListItemToAdd.id === state.wishListItems[i].id: ' + wishListItemToAdd.id === state.wishListItems[i].id)
      //     return {
      //       ...state,
      //       wishListItems: [...state.wishListItems]
      //     }
      //   }
      // }
      return {
        ...state,
        wishListItems: [...state.wishListItems, wishListItemToAdd],
      };
    case "REMOVE_PRODUCT_FROM_WISH_LIST":
      console.log(
        "action.payload de REMOVE_PRODUCT_FROM_WISH_LIST: " + action.payload
      );
      return {
        ...state,
        wishListItems: state.wishListItems.filter((wishListItem) => {
          return wishListItem.id !== action.payload;
        }),
      };
    default:
      return { ...state };
  }
}
