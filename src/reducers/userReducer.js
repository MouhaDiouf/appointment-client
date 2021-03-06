import * as ACTION_TYPE from '../actions/actions';

const defaultUserState = {
  user: {},
  isLoggedIn: false,
  loadingBeforeWelcome: true,
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.END_LOADING_BEFORE_WELCOME:
      return {
        ...state,
        loadingBeforeWelcome: false,
      };

    case ACTION_TYPE.IS_FETCHING_USER:
      return {
        ...state,
        isChecking: true,
      };

    case ACTION_TYPE.FETCH_USER_BOOKS_AND_CARS:
      return {
        ...state,
        books: action.books,
        cars: action.cars,
        fetch_user_books: true,
      };

    case ACTION_TYPE.MAKE_DELETE_BOOK_PROP_FALSE:
      return {
        ...state,
        deleting_booking: 'mouha',
      };
    case ACTION_TYPE.LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: true,
        isChecking: false,
      };
    case ACTION_TYPE.USER_LOGGED_IN:
      return {
        ...state,
        user: action.data.user,
        isLoggedIn: true,
        loginErrors: [],
        isChecking: false,
        cars: action.data.cars,
        books: action.data.books,
        id: action.data.user_id,
      };
    case ACTION_TYPE.LOGIN_ERROR:
      return {
        ...state,
        loginErrors: action.data.errors,
        isLoggedIn: false,
        isChecking: false,
      };

    case ACTION_TYPE.SIGNUP_SUCCES:
      return {
        ...state,
        signupErrors: [],
        isLoggedIn: true,
        user: action.data.user,
        status: action.data.status,
        isChecking: false,
        cars: action.data.cars,
        id: action.data.user_id,
      };
    case ACTION_TYPE.SIGNUP_ERROR:
      return {
        ...state,
        signupErrors: action.data.errors,
        isLoggedIn: false,
        status: action.data.status,
        isChecking: false,
      };

    case ACTION_TYPE.DELETING_BOOKING:
      return {
        ...state,
        deleting_booking: true,
        book_to_destroy: action.book_to_destroy,
      };

    case ACTION_TYPE.BOOK_DELETED:
      return {
        ...state,
        deleting_booking: false,
        book_to_destroy: null,
      };

    case ACTION_TYPE.LOGGED_OUT:
      return {
        ...defaultUserState,
      };

    case ACTION_TYPE.FOUND_BOOK_FOR_UPDATE:
      return {
        ...state,
        bookToUpdate: action.book,
        carToUpdate: action.car,
        should_go_to_update: true,
      };
    case ACTION_TYPE.PATCHING_BOOK:
      return {
        ...state,
        is_patching_book: true,
      };
    case ACTION_TYPE.PATCHING_BOOK_SUCCESS:
      return {
        ...state,
        is_patching_book: false,
        patching_book_success: true,
      };
    case ACTION_TYPE.REDIRECT_AFTER_PATCHING:
      return {
        ...state,
        redirect_after_patching: true,
        patching_book_success: null,
        should_go_to_update: false,
      };

    default:
      return state;
  }
};

export default userReducer;
