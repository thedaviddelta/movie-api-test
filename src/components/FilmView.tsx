import { FC } from "react";

type Props = {
    title: string,
    poster: string,
    [key: string]: string
};

const FilmView: FC<Props> = ({ title, poster, children, ...props }) => (
    <div>
        <img src={poster} alt={`'${title}' poster`} />
        <h3>{title}</h3>
        {Object.entries(props).map(([key, value]) => (
            <p key={key}>{value}</p>
        ))}
    </div>
);

export default FilmView;
