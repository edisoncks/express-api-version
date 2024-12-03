import { createRequest, createResponse } from "node-mocks-http";
import { afterEach, describe, expect, it, vitest } from "vitest";
import { Range, version } from ".";

describe(`API version range is ">= 1.0.0 < 2.0.0"`, () => {
  const middleware = version(new Range(">= 1.0.0 < 2.0.0"));
  const mockRest = createResponse();
  const mockNext = vitest.fn();
  afterEach(() => {
    mockNext.mockClear();
  });
  it(`should skip the rest of the middleware when the requested version is v2.0.0`, async () => {
    const mockReq = createRequest({ params: { version: "v2.0.0" } });
    await middleware(mockReq, mockRest, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith("route");
  });
  it(`should pass control to the next middleware when the requested version is v1.2.0`, async () => {
    const mockReq = createRequest({ params: { version: "v1.2.0" } });
    await middleware(mockReq, mockRest, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith();
  });
  it(`should pass control to the next middleware when the requested version is v1.0.0`, async () => {
    const mockReq = createRequest({ params: { version: "v1.0.0" } });
    await middleware(mockReq, mockRest, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith();
  });
  it(`should skip the rest of the middleware when the requested version is v0.1.0`, async () => {
    const mockReq = createRequest({ params: { version: "v0.1.0" } });
    await middleware(mockReq, mockRest, mockNext);
    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith("route");
  });
});
