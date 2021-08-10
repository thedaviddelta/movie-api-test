type State = {
    title: string,
    poster: string,
    year: string,
    runtime: string,
    director: string,
    error?: string
};

export const initialState: State = {
    title: "",
    poster: "",
    year: "",
    runtime: "",
    director: ""
};

export enum ActionType {
    SET,
    ERROR
}

type Action = {
    type: ActionType.SET,
    payload: {
        [key in Exclude<Capitalize<keyof State>, "Error">]: string
    }
} | {
    type: ActionType.ERROR,
    payload: {
        error: string
    }
};

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.SET:
            const payloadEntries = Object.entries(action.payload);
            const mappedEntries = payloadEntries.map(([key, value]) => [key.toLocaleLowerCase(), value]);
            const newState = Object.fromEntries(mappedEntries);
            return { ...state, ...newState };
        case ActionType.ERROR:
            return { ...state, error: action.payload.error };
        default:
            return state;
    }
}
