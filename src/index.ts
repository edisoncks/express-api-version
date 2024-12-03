import type { RequestHandler } from "express";
import { default as Range } from "semver/classes/range";
import { default as coerce } from "semver/functions/coerce";
import { default as satisfies } from "semver/functions/satisfies";

export { Range };

export const version =
  (range: string | Range): RequestHandler =>
  async (req, _res, next) => {
    const requestedVersion = coerce(req.params.version);
    if (requestedVersion && satisfies(requestedVersion, range)) {
      return next();
    }
    return next("route");
  };
