import { FC } from "react";
import logo from "../img/logo.svg";
import github from "../img/github.svg";

const Header: FC = ({ children }) => (
    <header>
        <div>
            <img src={logo} alt="Logo" />
        </div>
        <div className="pageButtons">
            {children}
        </div>
        <div>
            <a
                href="https://github.com/TheDavidDelta/movie-api-test"
                target="_blank"
                rel="noopener noreferrer nofollow"
            >
                <img src={github} alt="GitHub" />
            </a>
        </div>
    </header>
);

export default Header;
