import _ from "lodash";
import * as url from "url";

export const returnResponse = (res: any, err: any, data: any, next: any) => {
  if (res && res.req && res.req.probe) {
    var urlParts = url.parse(res.req.originalUrl) || {};
    res.req.probe.stop("Send response" + urlParts.pathname);
  }
  if (!err) {
    res.status(200);
    return res.send(data);
  } else {
    if (err.msg) {
      next(err.msg);
    } else {
      if (err.message) {
        next(err.message);
      } else {
        next(err);
      }
    }
  }
};
