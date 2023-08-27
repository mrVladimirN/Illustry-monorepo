import { WordType } from "types/visualizations";

export const computePropertiesForToolTip = (
  properties: any,
  value?: number | string
) => {
  let prop = "";

  if (typeof properties === "object") {
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const propValue = properties[key];
        prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
      }
    }

    if (value) {
      prop += `<div style="font-weight: bold">value:${value}</div>`;
    }
  } else if (typeof properties === "string") {
    if (value) {
      prop +=
        properties + `<div style="font-weight: bold">value:${value}</div>`;
    } else {
      prop += properties;
    }
  } else if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};

const calculateMeanValue = (numbers: number[]) => {
  if (numbers.length === 0) {
    return 0; // Return 0 for an empty array (or you can handle this case differently)
  }

  const sum = numbers.reduce((total, num) => total + num, 0);
  const mean = sum / numbers.length;

  return mean;
};

const computeColor = (nr: number, meanValue: number, colors: string[]) => {
  const percent = (nr * 100) / meanValue;
  if (percent > 0 && percent <= 25) {
    return colors[0];
  }
  if (percent > 25 && percent <= 50) {
    return colors[1];
  }
  if (percent > 50 && percent <= 75) {
    return colors[2];
  }
  if (percent > 75 && percent <= 100) {
    return colors[3];
  }
  if (percent > 100) {
    return colors[4];
  }
};
export const computeWords = (words: WordType[], colors: string[]) => {
  const values = words.map((word) => {
    return word.value;
  });
  const meanValue = calculateMeanValue(values);

  return words.map((word) => {
    return {
      ...word,
      textStyle: {
        fontWeight: "bold",
        color: computeColor(word.value, meanValue, colors),
      },
    };
  });
};
