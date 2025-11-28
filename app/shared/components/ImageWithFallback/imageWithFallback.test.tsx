import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageWithFallback from "./imageWithFallback.component";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe("ImageWithFallback", () => {
  it("renders fallback black div when image fails to load", () => {
    render(
      <ImageWithFallback
        src="/invalid-url.jpg"
        alt="Test Image"
        width={100}
        height={100}
      />
    );

    const img = screen.getByAltText("Test Image") as HTMLImageElement;

    fireEvent.error(img);

    const fallbackDiv = screen.getByRole("presentation");
    expect(fallbackDiv).toBeInTheDocument();
  });
});
