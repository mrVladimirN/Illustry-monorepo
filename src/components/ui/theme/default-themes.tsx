import React from 'react';

interface DefaultThemesProps {
  colorPalette: { [key: string]: string[] };
  handleApplyTheme: (schemeName: string) => void;
}

const DefaultThemesAccordion: React.FC<DefaultThemesProps> = ({
  colorPalette,
  handleApplyTheme,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(colorPalette).map((schemeName, index) => (
        <div
          key={index}
          className="flex flex-wrap border border-gray-300 rounded cursor-pointer justify-between"
          onClick={() => {return handleApplyTheme(schemeName)}}
        >
          {colorPalette[schemeName]?.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color }}
              className="w-4 h-4 m-1 border border-gray-300 rounded flex items-center justify-center"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DefaultThemesAccordion;
