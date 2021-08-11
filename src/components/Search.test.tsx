import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

const getForm = () => {
    const searchInput = screen.getByRole("textbox", { name: /query/i });
    const typeSelect = screen.getByRole("combobox", { name: /type/i });
    return { searchInput, typeSelect };
};

it("is empty on page load", () => {
    render(<Search />);

    const { searchInput, typeSelect } = getForm();
    expect(searchInput).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();

    expect(screen.queryByRole("img", { name: /poster/i })).not.toBeInTheDocument();
    expect(screen.getByText(/there's nothing here/i)).toBeInTheDocument();
});

it("loads 1 second after typing", async () => {
    render(<Search />);

    const { searchInput } = getForm();
    userEvent.type(searchInput, "inception");

    expect(screen.getByText(/there's nothing here/i)).toBeInTheDocument();

    const posters = await screen.findAllByRole("img", { name: /poster/i }, { timeout: 1500 });
    posters.forEach(poster => expect(poster).toBeInTheDocument());
    expect(screen.queryByText(/there's nothing here/i)).not.toBeInTheDocument();
});

it("empties the page after deleting query", async () => {
    render(<Search />);

    const { searchInput } = getForm();
    userEvent.type(searchInput, "inception");

    const posters = await screen.findAllByRole("img", { name: /poster/i }, { timeout: 1500 });
    posters.forEach(poster => expect(poster).toBeInTheDocument());

    userEvent.clear(searchInput);
    await waitForElementToBeRemoved(posters, { timeout: 1500 });
    expect(screen.getByText(/there's nothing here/i)).toBeInTheDocument();
});

it("doesn't load if changing type on empty query", async () => {
    render(<Search />);

    const { typeSelect } = getForm();
    userEvent.type(typeSelect, "series");

    expect(screen.queryByRole("img", { name: /poster/i })).not.toBeInTheDocument();
    expect(screen.getByText(/there's nothing here/i)).toBeInTheDocument();
});
