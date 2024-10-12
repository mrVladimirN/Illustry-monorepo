/* eslint-disable no-unused-vars */

type DefaultThemesProps = {
  colorPalette: { [key: string]: string[] };
  handleApplyTheme: (schemeName: string) => void;
}

const DefaultThemesAccordion = ({
  colorPalette,
  handleApplyTheme
}: DefaultThemesProps) => (
  <div className="grid grid-cols-2 gap-4">
    {Object.keys(colorPalette).map((schemeName, index) => (
      <div
        key={index}
        className="flex flex-wrap border border-gray-300 rounded cursor-pointer justify-between"
        onClick={() => handleApplyTheme(schemeName)}
      >
        {colorPalette[schemeName]?.map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color }}
            className="w-4 h-4 m-1 border border-gray-300 rounded flex items-center justify-center"
          ></div>
        ))}
      </div>
    ))}
  </div>
);

export default DefaultThemesAccordion;
