import { useState, FC } from 'react';
import Header from "./components/Header";
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
            <Header>
                {Object.values(Pages).map(name => (
                    <button key={name} onClick={() => setPageShown(name)} className={name === pageShown ? "currentPage" : ""}>
                        {name[0].toLocaleUpperCase() + name.slice(1)}
                    </button>
                ))}
            </Header>
            <main>
                {pageShown === Pages.TOP ? (
                    <Top />
                ) : (
                    <Search />
                )}
            </main>
        </div>
    );
};

export default App;
