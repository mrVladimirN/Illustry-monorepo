import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../../utils/helper";
import { ScatterData, ScatterPoint } from "types/visualizations";

const computeValues = (values: unknown[], mapping: string): number[] => {
  const result: number[] = [];

  mapping.split(",").forEach((row) => {
    const index = _.toNumber(row);
    const valueAtIndex = values[index];

    if (
      !_.isNil(valueAtIndex) &&
      (typeof valueAtIndex === "number" ||
        (typeof valueAtIndex === "string" &&
          !isNaN(_.toNumber(valueAtIndex)))) &&
      result.length <= 1
    ) {
      result.push(_.toNumber(valueAtIndex));
    }
  });

  while (result.length < 2) {
    result.push(0);
  }

  return result;
};
export const scatterTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    value: computeValues(values, mapping.values as string),
    category: values[_.toNumber(mapping.categories)],
    properties: values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ points: baseValues },
        ...visualizationDetails,
      }
    : { points: baseValues };
};

export const scatterExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): ScatterData => {
  const transformedData = data.reduce(
    (result, item) => {
      let scatterData;
      const { category, value, properties } = item.points as Record<
        string,
        unknown
      >;
      scatterData = (result.points as ScatterPoint[]).find(
        (e: ScatterPoint) =>
          e.value[0] === (value as unknown[])[0] &&
          e.value[1] === (value as unknown[])[1] &&
          e.category === category
      );
      if (_.isNil(scatterData)) {
        scatterData = { category, value, properties };
        if (!_.isNil(scatterData.category) && !_.isNil(scatterData.value)) {
          (result.points as Record<string, unknown>[]).push(scatterData);
        }
      }
      return result;
    },
    { points: [] }
  );
  return transformedData as unknown as ScatterData;
};

const scatterPointsExtractorXml = (points: Record<string, unknown>[]) => {
  const transformedData = points.map((el) => {
    return {
      category: (el.category as string[])[0],
      value: (el.value as string[]).map((value: string) => Number(value)),
      properties:
        el.properties && (el.properties as Record<string, unknown>[]).length
          ? (el.properties as string[])[0]
          : undefined,
    };
  });

  // Return the transformed object inside the array
  return transformedData;
};
export const scatterExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const { name, description, tags, type, data, points } =
    xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      points: allFileDetails
        ? scatterPointsExtractorXml((data as any[])[0].points)
        : scatterPointsExtractorXml(points as Record<string, string>[]),
    },
  };
  return allFileDetails
    ? {
        ...finalData,
        ...{
          name: (name as string[])[0] as string,
          description: (description as string[])[0] as string,
          tags: tags as string[],
          type: type as string,
        },
      }
    : finalData;
};
