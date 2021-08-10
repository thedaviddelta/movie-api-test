import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Top from "./Top";

it("loads everything correctly", async () => {
    const length = 9;
    render(<Top />);

    const loadings = screen.getAllByText(/loading/i);
    expect(loadings).toHaveLength(length);

    await waitForElementToBeRemoved(loadings);
    expect(screen.getAllByRole("img", { name: /poster/i })).toHaveLength(length);
    expect(screen.getAllByRole("heading")).toHaveLength(length);
});
