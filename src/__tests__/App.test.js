import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("Newsletter Signup Form", () => {
  test("renders a text input for name", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("type", "text");
  });

  test("renders a text input for email", () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("renders checkboxes for interests", () => {
    render(<App />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test("renders a submit button", () => {
    render(<App />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test("shows user's name and email after form submission", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.type(nameInput, "Calton");
    await user.type(emailInput, "calton@example.com");
    await user.click(submitButton);

    expect(await screen.findByText(/thank you, calton/i)).toBeInTheDocument();
    expect(await screen.findByText(/calton@example.com/i)).toBeInTheDocument();
  });
});
