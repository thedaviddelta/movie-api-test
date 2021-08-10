import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("changes page content correctly", () => {
    render(<App />);

    const topBtn = screen.getByRole("button", { name: /top/i });
    const searchBtn = screen.getByRole("button", { name: /search/i });

    expect(screen.queryByRole("textbox", { name: /query/i })).not.toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.getByRole("textbox", { name: /query/i })).toBeInTheDocument();

    userEvent.click(topBtn);
    expect(screen.queryByRole("textbox", { name: /query/i })).not.toBeInTheDocument();
});
