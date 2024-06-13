import { Usage } from "src/interfaces/Usage";
import { Cost } from "src/interfaces/Cost";

interface State {
  usages: Usage[];
  costs: Cost[];
  typeUsage: string;
  model: string;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_DATA', payload: { usages: Usage[], costs: Cost[] } }
  | { type: 'SET_TYPE_USAGE', payload: string }
  | { type: 'SET_MODEL', payload: string }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string | null };

const initialState: State = {
  usages: [],
  costs: [],
  typeUsage: '',
  model: '',
  loading: true,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        usages: action.payload.usages,
        costs: action.payload.costs,
        loading: false,
      };
    case 'SET_TYPE_USAGE':
      return { ...state, typeUsage: action.payload };
    case 'SET_MODEL':
      return { ...state, model: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export { initialState, reducer };