import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterSelect } from "./FilterSelect";

/**
 * Component tests for the reusable dropdown filter.
 *
 * These tests check that:
 - options are rendered correctly
 - selecting a new option calls the parent callback
*/
describe("FilterSelect", () => {
  it("renders label and options", () => {
    render(
      <FilterSelect
        label="Country"
        value="AGO"
        options={["AGO", "BRA"]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "AGO" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "BRA" })).toBeInTheDocument();
  });

  it("calls onChange when user selects a new option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FilterSelect
        label="Country"
        value="AGO"
        options={["AGO", "BRA"]}
        onChange={onChange}
      />
    );

    await user.selectOptions(screen.getByRole("combobox"), "BRA");

    expect(onChange).toHaveBeenCalledWith("BRA");
  });
});