/// <reference types="cypress" />

beforeEach(() => {
    cy.visit("/");
});

const clickBtn = (name: RegExp, role?: string) => (
    cy.findByRole(role ?? "button", { name })
        .click()
);

const checkIdleText = () => (
    cy.findByText(/there's nothing here/i)
        .should("be.visible")
);

const checkPosters = () => (
    cy.findAllByRole("img", { name: /poster/i })
        .should("be.visible")
);

it("loads main page and changes pages correctly", () => {
    checkPosters()
        .should("have.length", 9);

    clickBtn(/search/i);

    checkIdleText();

    clickBtn(/top/i);

    checkPosters()
        .should("have.length", 9);
});

it("loads and empties search results correctly", () => {
    clickBtn(/search/i);

    checkIdleText();

    cy.findByRole("textbox", { name: /query/i })
        .as("searchInput")
        .type("avatar");
    checkPosters();

    cy.findByRole("combobox", { name: /type/i })
        .as("typeSelect")
        .select("series");
    checkPosters();

    cy.get("@searchInput")
        .clear();
    checkIdleText();

    cy.get("@typeSelect")
        .select("movie");
    checkIdleText();
});
