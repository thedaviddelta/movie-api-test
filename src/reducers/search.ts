import { parseFilmKeys } from "../utils/film";
import Film from "../model/Film";
import { ApiResponseSearchItem } from "../model/ApiResponse";

export const SearchType = {
    MOVIE: "movie",
    SERIES: "series",
    EPISODE: "episode",
    GAME: "game"
} as const;

export enum LoadingState {
    IDLE,
    PENDING,
    SUCCESS,
    ERROR
}

// this prob. should be separated but needed not for this simple case
// also, it will be easier in React18 with transitions & useDeferredValue
type State = {
    query: string,
    type: typeof SearchType[keyof typeof SearchType],
    delayedQuery: string
} & ({
    loading: LoadingState.IDLE
} | {
    loading: LoadingState.PENDING
} | {
    loading: LoadingState.SUCCESS,
    result: Film[]
} | {
    loading: LoadingState.ERROR,
    error: string
});

export const initialState: State = {
    query: "",
    type: SearchType.MOVIE,
    delayedQuery: "",
    loading: LoadingState.IDLE
};

export enum ActionType {
    SET_FIELD,
    RESULT,
    ERROR,
    LOADING,
    EMPTY
}

type Action = {
    type: ActionType.SET_FIELD,
    payload: {
        key: string,
        value: any
    }
} | {
    type: ActionType.RESULT,
    payload: {
        result: ApiResponseSearchItem[]
    }
} | {
    type: ActionType.ERROR,
    payload: {
        error: string
    }
} | {
    type: ActionType.LOADING
} | {
    type: ActionType.EMPTY
};

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.SET_FIELD: // for easing form change functions usage
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        case ActionType.RESULT:
            return { ...state, loading: LoadingState.SUCCESS, result: action.payload.result.map(parseFilmKeys) };
        case ActionType.ERROR:
            return { ...state, loading: LoadingState.ERROR, error: action.payload.error };
        case ActionType.LOADING:
            return { ...state, loading: LoadingState.PENDING };
        case ActionType.EMPTY:
            return { ...state, loading: LoadingState.IDLE };
        default:
            return state;
    }
}
