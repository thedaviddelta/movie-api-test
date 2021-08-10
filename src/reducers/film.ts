import Film from "../model/Film";
import { ApiResponseId } from "../model/ApiResponse";

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
        film: {
            [key in Exclude<keyof ApiResponseId, "Response">]: ApiResponseId[key]
        }
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
            const filmEntries = Object.entries(action.payload.film);
            const mappedEntries = filmEntries.map(([key, value]) => [key.toLocaleLowerCase(), value]);
            const newFilm = Object.fromEntries(mappedEntries);
            return { ...state, film: newFilm, loading: LoadingState.SUCCESS };
        case ActionType.ERROR:
            return { ...state, error: action.payload.error, loading: LoadingState.ERROR };
        case ActionType.LOADING:
            return { ...state, loading: LoadingState.PENDING };
        default:
            return state;
    }
}
