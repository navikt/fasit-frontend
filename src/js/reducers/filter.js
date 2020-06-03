import { CHANGE_FILTER, CHANGE_PAGE, SET_FILTER } from "../actionTypes";

const initialFilter = {
  environment: "",
  environmentclass: "",
  type: "",
  status: "",
  application: "",
  zone: "",
  alias: "",
};

const initialState = {
  activePage: 0,
  filters: initialFilter,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        activePage: action.value,
      });

    case CHANGE_FILTER: {
      const filters = {
        ...state.filters,
        [action.filterName]: action.filterValue,
      };
      return Object.assign({}, state, {
        filters,
      });
    }
    case SET_FILTER: {
      const parsedParms = new URLSearchParams(action.filter);
      let filters = Object.assign({}, initialFilter);
      parsedParms.forEach((value, key) => {
        filters[key] = value;
      });
      return Object.assign({}, state, { filters: filters });
    }

    default:
      return state;
  }
};
