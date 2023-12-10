import _ from 'lodash';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

export const returnResponse = (res: any, err: any, data: any, next: any) => {
  if (res && res.req && res.req.probe) {
    const urlParts = url.parse(res.req.originalUrl) || {};
    res.req.probe.stop(`Send response${urlParts.pathname}`);
  }
  if (!err) {
    res.status(200);
    return res.send(data);
  }
  if (err.msg) {
    next(err.msg);
  } else if (err.message) {
    next(err.message);
  } else {
    next(err);
  }
};

export const visualizationDetailsExtractor = (
  mapping: Record<string, unknown>,
  values: unknown[]
) => ({
  visualizationName:
      values[_.toNumber(mapping.visualizationName)]
      && typeof values[_.toNumber(mapping.visualizationName)] === 'string'
      && !_.isEmpty(values[_.toNumber(mapping.visualizationName)])
        ? values[_.toNumber(mapping.visualizationName)]
        : undefined,
  visualizationDescription:
      values[_.toNumber(mapping.visualizationDescription)]
      && typeof values[_.toNumber(mapping.visualizationDescription)] === 'string'
        ? values[_.toNumber(mapping.visualizationDescription)]
        : undefined,
  visualizationTags:
      values[_.toNumber(mapping.visualizationTags)]
      && typeof values[_.toNumber(mapping.visualizationTags)] === 'string'
        ? values[_.toNumber(mapping.visualizationTags)]
        : undefined
});
export const visualizationPropertiesExtractor = (
  arr: Record<string, unknown>[]
) => {
  let name: string = '';
  let description: string = '';
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
    description,
    tags
  };
  return extractedData;
};

export const copyDirectory = (src: string, dest: string): void => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  const files: string[] = fs.readdirSync(src);

  files.forEach((file) => {
    const srcPath: string = path.join(src, file);
    const destPath: string = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};
export const deleteDirectory = (directoryPath: string): void => {
  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        deleteDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }

    fs.rmdirSync(directoryPath);
  }
};
