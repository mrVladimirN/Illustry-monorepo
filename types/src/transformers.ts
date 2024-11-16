import { with_optional_properties } from "./utils";
import { VisualizationTypesEnum } from "./visualization";

type BaseType = {
    value: string | number;
    properties?: string;
};

type VisualizationDetails = {
    visualizationName?: string;
    visualizationDescription?: string;
    visualizationTags?: string | string[];
};

type CalendarType = BaseType & {
    date: string | null;
    category: string;
    value?: number
};

type SimpleCalendarDetails = {
    calendar: CalendarType;
};

type FullCalendarDetails = VisualizationDetails & SimpleCalendarDetails;

type WordType = BaseType & {
    name: string;
};

type SimpleWordDetails = {
    word: WordType;
};

type FullWordDetails = VisualizationDetails & SimpleWordDetails;

type PointType = {
    category: string;
    value: [number, number];
    properties: string;
};

type SimplePointDetails = {
    points: PointType;
};

type FullPointDetails = VisualizationDetails & SimplePointDetails;

type NodeLinkType = BaseType & {
    name: string
    category: string;
    source: string;
    target: string;
}

type SimpleNodeLinkDetails = {
    nodeLink: NodeLinkType;
};

type FullNodeLinkDetails = VisualizationDetails & SimpleNodeLinkDetails;

type AxisChartValuesType = {
    data?: { [element: string]: number[] };
    headers: string;
};

type SimpleAxisChartValuesDetails = {
    values: AxisChartValuesType;
};

type FullAxisChartValuesDetails = VisualizationDetails & SimpleAxisChartValuesDetails;

type PieFunnelChartValuesType = {
    name: string;
    value: number;
};

type SimplePieChartValuesDetails = {
    values: PieFunnelChartValuesType;
};

type FullPieChartValuesDetails = VisualizationDetails & SimplePieChartValuesDetails;

type NodeType = BaseType & {
    children: string[];
    category: string;
    name: string;
};

type SimpleNodesDetails = {
    nodes: NodeType;
};

type FullNodesDetails = VisualizationDetails & SimpleNodesDetails;

type RowType = SimpleCalendarDetails
    | FullCalendarDetails
    | SimpleWordDetails
    | FullWordDetails
    | SimpleNodeLinkDetails
    | FullNodeLinkDetails
    | SimpleAxisChartValuesDetails
    | FullAxisChartValuesDetails
    | SimplePieChartValuesDetails
    | FullPieChartValuesDetails
    | SimplePointDetails
    | FullPointDetails
    | VisualizationDetails
    | SimpleNodesDetails
    | null;



type XMLAxisData = {
    headers: string[];
    values: { [key: string]: string[]; }[];
};

type XMLNode = { category: string[]; name: string[]; } & with_optional_properties;

type XMLLink = { source: string[]; target: string[]; value: string[]; } & with_optional_properties;

type XMLNodeLinkData = {
    nodes: XMLNode[];
    links: XMLLink[];
};

type XMLWord = { name: string[]; value: string[]; } & with_optional_properties;

type XMLWordcloudData = {
    words: XMLWord[];
};

type XMLCalendar = { category: string[]; date: string[]; value: string; } & with_optional_properties;

type XMLCalendarData = {
    calendar: XMLCalendar[];
};

type XMLPieChartFunnelData = {
    values: { [key: string]: string[]; }[];
};

type XMLPoint = { category: string[]; value: string[]; } & with_optional_properties;

type XMLScatterData = {
    points: XMLPoint[];
};

type XMLHierarchyNode = { name: string[]; category: string[]; value: string; children: XMLHierarchyNode[]; } & with_optional_properties;

type XMLHierarchyData = {
    nodes: XMLHierarchyNode[];
};

type XMLLabel = { name: string[]; value: string[]; } & with_optional_properties;

type XMLMatrixNode = {
    labels: XMLLabel[];
} & XMLNode;

type XMLMatrixLink = XMLLink;

type XMLMatrixData = {
    nodes: XMLMatrixNode[];
    links: XMLMatrixLink[];
};

type XMLVisualizationData = XMLAxisData
    | XMLNodeLinkData
    | XMLWordcloudData
    | XMLCalendarData
    | XMLPieChartFunnelData
    | XMLScatterData
    | XMLHierarchyData
    | XMLMatrixData;

type XMLVisualizationDetails = {
    root: {
        type: VisualizationTypesEnum[];
        description?: string[];
        name: string[];
        tags?: string[];
        data: XMLVisualizationData[];
    };
};

type NodeWithStyling = {
    name?: string;
    itemStyle?: {
        color?: string;
        borderColor?: string;
    },
    value?: number;
    prop?: string;
    id?: string;
    label?: {
        show?: boolean;
        color?: string;
    },
    symbolSize?: string;
    category?: number | string;
    children?: NodeWithStyling[];
};

type LinkWithStyling = {
    source?: string | number;
    target?: string | number;
    value?: number;
    prop?: string;
};

export {
    CalendarType,
    VisualizationDetails,
    FullCalendarDetails,
    SimpleCalendarDetails,
    RowType,
    SimpleWordDetails,
    FullWordDetails,
    WordType,
    XMLNode,
    XMLLink,
    XMLAxisData,
    XMLVisualizationDetails,
    XMLVisualizationData,
    XMLNodeLinkData,
    XMLWord,
    XMLWordcloudData,
    XMLCalendarData,
    XMLCalendar,
    XMLPieChartFunnelData,
    XMLPoint,
    XMLScatterData,
    XMLHierarchyNode,
    XMLHierarchyData,
    XMLMatrixNode,
    XMLMatrixLink,
    XMLMatrixData,
    XMLLabel,
    NodeLinkType,
    SimpleNodeLinkDetails,
    FullNodeLinkDetails,
    SimpleAxisChartValuesDetails,
    FullAxisChartValuesDetails,
    SimplePieChartValuesDetails,
    FullPieChartValuesDetails,
    AxisChartValuesType,
    PieFunnelChartValuesType,
    SimplePointDetails,
    FullPointDetails,
    PointType,
    NodeType,
    SimpleNodesDetails,
    FullNodesDetails,
    NodeWithStyling,
    LinkWithStyling
};
