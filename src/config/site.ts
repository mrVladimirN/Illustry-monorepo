export type SiteConfig = typeof siteConfig;
export const siteConfig = {
  name: "Illustry",
  description: "An open source visualization hub",
  mainNav: [
    {
      title: "Projects",
      href: "/projects",
      description: "All projects",
      items: [],
    },
    {
      title: "Visualizations",
      href: "/visualizations",
      description: "All visualizations",
      items: [],
    },
   
    {
      title: "Theme",
      href: "/theme",
      description: "Set theme",
      items: [],
    },
  ],
  nodeLink: {
    nodes: [
      {
        name: "Data1",
        category: "1",
      },
      {
        name: "Data2",
        category: "1",
      },
      {
        name: "Data3",
        category: "2",
      },
      {
        name: "Data4",
        category: "2",
      },
      {
        name: "Data5",
        category: "3",
      },
      {
        name: "Data6",
        category: "3",
      },
      {
        name: "Data7",
        category: "4",
      },
    ],
    links: [
      {
        source: "Data1",
        target: "Data3",
        value: 5,
      },
      {
        source: "Data2",
        target: "Data3",
        value: 10,
      },
      {
        source: "Data3",
        target: "Data4",
        value: 10,
      },
      {
        source: "Data3",
        target: "Data5",
        value: 30,
      },
      {
        source: "Data5",
        target: "Data6",
        value: 4,
      },
      {
        source: "Data6",
        target: "Data7",
        value: 16,
      },
    ],
  },
  words: [
    {
      name: "Word1",
      value: 390,
    },
    {
      name: "Word2",
      value: 275,
    },
    {
      name: "Word3",
      value: 100,
    },
    {
      name: "Word4",
      value: 1000,
    },
    {
      name: "Word5",
      value: 600,
    },
    {
      name: "Word6",
      value: 146,
    },
    {
      name: "Word7",
      value: 712,
    }
  ],
  calendar: [
    {
      date: "1939-09-02",
      value: 1,
      category: "1",
    },
    {
      date: "1939-09-07",
      value: 1,
      category: "2",
    },
    {
      date: "1939-09-17",
      value: 1,
      category: "3",
    },
    {
      date: "1939-10-06",
      value: 1,
      category: "1",
    },
    {
      date: "1939-10-07",
      value: 1,
      category: "1",
    },
    {
      date: "1939-10-14",
      value: 1,
      category: "5",
    },
    {
      date: "1939-10-17",
      value: 1,
      category: "1",
    },
    {
      date: "1939-10-22",
      value: 1,
      category: "6",
    },
    {
      date: "1939-10-28",
      value: 1,
      category: "1",
    },
    {
      date: "1939-11-04",
      value: 1,
      category: "7",
    },
    {
      date: "1939-11-28",
      value: 1,
      category: "3",
    },
    {
      date: "1939-12-05",
      value: 1,
      category: "3",
    },
    {
      date: "1939-12-11",
      value: 1,
      category: "2",
    },
    {
      date: "1939-12-16",
      value: 1,
      category: "2",
    },
    {
      date: "1939-12-23",
      value: 1,
      category: "1",
    },
  ],
  axisChart: {
    headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: {
      "Statistic 1": [120, 132, 101, 134, 90, 230, 210],
      "Statistic 2": [220, 182, 191, 234, 290, 330, 310],
      "Statistic 3": [150, 232, 201, 154, 190, 330, 410],
      "Statistic 4": [320, 332, 301, 334, 390, 330, 320]
    }
  }
};
