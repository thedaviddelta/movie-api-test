import { FC } from "react";
import useFilmInfo, { LoadingState } from "../hooks/useFilmInfo";
import FilmView from "./FilmView";

type Props = {
    id: string
};

const FilmWrapper: FC<Props> = ({ id }) => {
    const state = useFilmInfo(id);

    return state.loading === LoadingState.PENDING ? (
        <div>
            Loading...
        </div>
    ) : state.loading === LoadingState.ERROR ? ( // this should be in a toast using a portal in a more pro. app
        <div className="error">
            Error loading '{id}': {state.error}
        </div>
    ) : (
        <FilmView {...state.film} />
    );
};

export default FilmWrapper;
