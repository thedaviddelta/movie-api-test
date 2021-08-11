import { parseFilmKeys } from "../utils/film";
import Film from "../model/Film";
import { ApiResponseIdItem } from "../model/ApiResponse";

export enum LoadingState {
    PENDING,
    SUCCESS,
    ERROR
}

type State = {
    loading: LoadingState.PENDING
} | {
    loading: LoadingState.SUCCESS,
    film: Film
} | {
    loading: LoadingState.ERROR,
    error: string
};

export const initialState: State = {
    loading: LoadingState.PENDING
};

export enum ActionType {
    SET,
    ERROR,
    LOADING
}

type Action = {
    type: ActionType.SET,
    payload: {
        film: ApiResponseIdItem
    }
} | {
    type: ActionType.ERROR,
    payload: {
        error: string
    }
} | {
    type: ActionType.LOADING
};

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.SET:
            return { ...state, loading: LoadingState.SUCCESS, film: parseFilmKeys(action.payload.film) };
        case ActionType.ERROR:
            return { ...state, loading: LoadingState.ERROR, error: action.payload.error };
        case ActionType.LOADING:
            return { ...state, loading: LoadingState.PENDING };
        default:
            return state;
    }
}
