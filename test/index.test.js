import { describe, expect, test } from "@jest/globals";
import { act } from "";
import { PixelHolder } from "../src"

describe("PixelHolder", () => {
  test("Idempotency, instantiates using the `new` keyword (defaults)", () => {
    const placeholder = new PixelHolder();
    expect(placeholder).toBeInstanceOf(PixelHolder)
    expect(placeholder.heightInPixels).toBe(1);
    expect(placeholder.widthInPixels).toBe(1);
  });
  test("Idempotency, instantiates using the `new` keyword", () => {
    const placeholder = new PixelHolder({ widthInPixels: 10, heightInPixels: 10});
    expect(placeholder).toBeInstanceOf(PixelHolder);
    expect(placeholder.heightInPixels).toBe(10);
    expect(placeholder.widthInPixels).toBe(10);
  });
  test("Create a 10x10 pixel using create() api", () => {
    const placeholder = PixelHolder.create({ widthInPixels: 10, heightInPixels: 10 });
    expect(placeholder.heightInPixels).toEqual(10);
    expect(placeholder.widthInPixels).toEqual(10);
    expect(placeholder.options).toEqual({
      widthInPixels: 10,
      heightInPixels: 10
    });
    expect(placeholder.createDummyGif()).toEqual("X")
  });
});
