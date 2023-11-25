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

export const extractVisualizationProperties = (
  arr: Record<string, unknown>[]
) => {
  let name: string = "";
  let description: string = "";
  let tags: string[] = [];
  arr.forEach((item) => {
    if (!_.isNil(item.visualizationName)) {
      name = item.visualizationName as string;
      delete item.visualizationName;
    }
    if (!_.isNil(item.visualizationDescription)) {
      description = item.visualizationDescription as string;
      delete item.visualizationDescription;
    }
    if (!_.isNil(item.visualizationTags)) {
      tags = item.visualizationTags as string[];
      delete item.visualizationTags;
    }
  });
  const extractedData = {
    data: arr,
    name: !_.isEmpty(name) ? name : undefined, // this needs to fail fast on validation
    description: description,
    tags: tags,
  };
  return extractedData;
};
