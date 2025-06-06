import { describe, test } from "node:test"
import assert from "node:assert/strict"
import { ellipseUri } from "./url"

describe("url", () => {
    describe("ellipseUri", () => {
        test("returns undefined for invalid URLs", () => {
            assert.strictEqual(ellipseUri("not-a-url"), undefined)
            assert.strictEqual(ellipseUri(""), undefined)
            assert.strictEqual(ellipseUri("http:"), undefined)
        })

        test("shortens URLs with only protocol, hostname, and pathname", () => {
            assert.strictEqual(
                ellipseUri("https://example.com"),
                "https://example.com/"
            )
            assert.strictEqual(
                ellipseUri("http://example.org/path"),
                "http://example.org/path"
            )
            assert.strictEqual(
                ellipseUri("https://sub.domain.com/path/to/resource"),
                "https://sub.domain.com/path/to/resource"
            )
        })

        test("adds ellipses for query parameters", () => {
            assert.strictEqual(
                ellipseUri("https://example.com?param=value"),
                "https://example.com/?..."
            )
            assert.strictEqual(
                ellipseUri("https://example.com/path?param=value&other=123"),
                "https://example.com/path?..."
            )
        })

        test("adds ellipses for fragments", () => {
            assert.strictEqual(
                ellipseUri("https://example.com#section"),
                "https://example.com/#..."
            )
            assert.strictEqual(
                ellipseUri("https://example.com/path#section"),
                "https://example.com/path#..."
            )
        })

        test("handles URLs with both query parameters and fragments", () => {
            assert.strictEqual(
                ellipseUri("https://example.com?param=value#section"),
                "https://example.com/?...#..."
            )
            assert.strictEqual(
                ellipseUri("https://example.com/path?param=value#section"),
                "https://example.com/path?...#..."
            )
        })
    })
})
