import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

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
    visualizationTags: getValue('visualizationTags'),
  };
};

const visualizationPropertiesExtractor = (
  arr: Record<string, unknown>[]
) => {
  let name = '';
  let description = '';
  let tags: string[] = [];

  arr.forEach((item) => {
    if (item.visualizationName) {
      name = item.visualizationName as string;
      delete item.visualizationName;
    }
    if (item.visualizationDescription) {
      description = item.visualizationDescription as string;
      delete item.visualizationDescription;
    }
    if (item.visualizationTags) {
      tags = item.visualizationTags as string[];
      delete item.visualizationTags;
    }
  });

  return {
    data: arr,
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
    console.error('Error copying directory:', error);
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
    console.error('Error deleting directory:', error);
    throw error;
  }
};

export { returnResponse, toStringWithDefault, visualizationDetailsExtractor, visualizationPropertiesExtractor, copyDirectory, deleteDirectory }