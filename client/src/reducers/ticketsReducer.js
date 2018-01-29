import * as actions from '../actions';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  success: false
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_TICKET_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.CREATE_TICKET_SUCCESS:
      const newTicket = { ...action.ticket };

      return {
        ...state,
        tickets: state.tickets.concat(newTicket),
        error: null,
        loading: false,
        success: true
      };
    case actions.CREATE_TICKET_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.CREATE_TICKET_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_TICKETS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.tickets,
        loading: false,
        success: true
      };
    case actions.READ_TICKETS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_TICKETS_END:
      return {
        ...state,
        success: false
      };
    case actions.READ_TICKET_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actions.READ_TICKET_SUCCESS:
      const ticket = { ...action.ticket };
      return {
        ...state,
        tickets: state.tickets.filter(t => t._id === ticket._id),
        loading: false,
        success: true
      };
    case actions.READ_TICKET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false
      };
    case actions.READ_TICKET_END:
      return {
        ...state,
        success: false
      };
    case actions.UPDATE_TICKET_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.UPDATE_TICKET_SUCCESS:
      const updatedTicket = { ...action.ticket };

      return {
        ...state,
        tickets: state.tickets.concat(updatedTicket),
        error: null,
        loading: false,
        success: true
      };
    case actions.UPDATE_TICKET_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.UPDATE_TICKET_END:
      return {
        ...state,
        success: false
      };
    case actions.DELETE_TICKET_START:
      return {
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case actions.DELETE_TICKET_SUCCESS:
      const deletedTicket = { ...action.ticket };

      return {
        ...state,
        tickets: state.tickets.filter(
          ticket => ticket._id !== deletedTicket._id
        ),
        error: null,
        loading: false,
        success: true
      };
    case actions.DELETE_TICKET_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false
      };
    case actions.DELETE_TICKET_END:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};

export default ticketsReducer;
