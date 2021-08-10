import { useState, FC } from 'react';
import './App.scss';
import Top from "./components/Top";
import Search from "./components/Search";

// native enums are easier to iterate
const Pages = {
    TOP: "top",
    SEARCH: "search"
} as const;

const App: FC = () => {
    const [pageShown, setPageShown] = useState<typeof Pages[keyof typeof Pages]>(Pages.TOP);

    return (
        <div>
            <div>
                {Object.values(Pages).map(name => (
                    <button key={name} onClick={() => setPageShown(name)}>
                        {name[0].toLocaleUpperCase() + name.slice(1)}
                    </button>
                ))}
            </div>
            <div>
                {pageShown === Pages.TOP ? (
                    <Top />
                ) : (
                    <Search />
                )}
            </div>
        </div>
    );
};

export default App;
