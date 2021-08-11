import { FC } from "react";
import Film from "../model/Film";

const FilmView: FC<Film> = ({ title, poster, children, ...props }) => (
    <div className="filmView">
        <div>
            <img src={poster} alt={`'${title}' poster`} />
            <h3>{title}</h3>
            {Object.entries(props).map(([key, value]) => (
                key !== "imdbid" && (
                    <p key={key}>
                        {value}
                    </p>
                )
            ))}
        </div>
    </div>
);

export default FilmView;
