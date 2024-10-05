/* eslint-disable no-unused-vars */
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
import logger from '../config/logger';

type Response = {
  req?: {
    originalUrl?: string;
    probe?: {
      stop: (message: string) => void;
    };
  };
  status: (code: number) => Response;
  send: (data: unknown) => void;
};

const returnResponse = (
  res: Response,
  err: Error | null,
  data: unknown,
  next: (error: string | Error) => void
): void => {
  if (res?.req?.probe) {
    const urlParts = url.parse(res.req.originalUrl || '');
    res.req.probe.stop(`Send response${urlParts.pathname}`);
  }
  if (!err) {
    res.status(200);
    res.send(data);
  } else {
    next(err.message || err);
  }
};

const toStringWithDefault = (value: unknown): string => {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

const visualizationDetailsExtractor = (
  mapping: Record<string, unknown>,
  values: (string | number)[]
) => {
  const getValue = (key: string): string | undefined => {
    const index = Number(mapping[key]);
    const value = values[index];
    return typeof value === 'string' && value.trim() !== '' ? value : undefined;
  };

  return {
    visualizationName: getValue('visualizationName'),
    visualizationDescription: getValue('visualizationDescription'),
    visualizationTags: getValue('visualizationTags')
  };
};

const visualizationPropertiesExtractor = (
  arr: Record<string, unknown>[]
) => {
  let name = '';
  let description = '';
  let tags: string[] = [];

  const sanitizedArr = arr.map((item) => {
    const newItem = { ...item };

    if (newItem.visualizationName) {
      name = newItem.visualizationName as string;
      delete newItem.visualizationName;
    }
    if (newItem.visualizationDescription) {
      description = newItem.visualizationDescription as string;
      delete newItem.visualizationDescription;
    }
    if (newItem.visualizationTags) {
      tags = newItem.visualizationTags as string[];
      delete newItem.visualizationTags;
    }

    return newItem;
  });

  return {
    data: sanitizedArr,
    name: name || undefined,
    description,
    tags
  };
};

const copyDirectory = async (src: string, dest: string): Promise<void> => {
  try {
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(src);

    await Promise.all(files.map(async (file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      const stats = await fs.promises.stat(srcPath);

      if (stats.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }));
  } catch (error) {
    logger.error('Error copying directory:', error);
    throw error;
  }
};

const deleteDirectory = async (directoryPath: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directoryPath);
    await Promise.all(files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isDirectory()) {
        await deleteDirectory(filePath);
      } else {
        await fs.promises.unlink(filePath);
      }
    }));
    await fs.promises.rmdir(directoryPath);
  } catch (error) {
    logger.error('Error deleting directory:', error);
    throw error;
  }
};

export {
  returnResponse,
  toStringWithDefault,
  visualizationDetailsExtractor,
  visualizationPropertiesExtractor,
  copyDirectory,
  deleteDirectory
};
