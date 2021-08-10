import { FC } from "react";
import useFilmInfo from "../hooks/useFilmInfo";
import FilmView from "./FilmView";

type Props = {
    id: string
};

const FilmWrapper: FC<Props> = ({ id }) => {
    const { title, poster, error, ...rest } = useFilmInfo(id);

    if (error)
        return <div>Unexpected error: {error}</div>;

    return (
        <FilmView
            title={title}
            poster={poster}
            {...rest}
        />
    );
};

export default FilmWrapper;
