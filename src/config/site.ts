export const siteConfig = {
  name: 'Illustry',
  description: 'An open source visualization hub',
  mainNav: [
    {
      title: 'Projects',
      href: '/projects',
      description: 'All projects',
      items: []
    },
    {
      title: 'Visualizations',
      href: '/visualizations',
      description: 'All visualizations',
      items: []
    },

    {
      title: 'Theme',
      href: '/theme',
      description: 'Set theme',
      items: []
    }
  ],
  nodeLink: {
    nodes: [
      {
        name: 'Data1',
        category: '1'
      },
      {
        name: 'Data2',
        category: '1'
      },
      {
        name: 'Data3',
        category: '2'
      },
      {
        name: 'Data4',
        category: '2'
      },
      {
        name: 'Data5',
        category: '3'
      },
      {
        name: 'Data6',
        category: '3'
      },
      {
        name: 'Data7',
        category: '4'
      }
    ],
    links: [
      {
        source: 'Data1',
        target: 'Data3',
        value: 5
      },
      {
        source: 'Data2',
        target: 'Data3',
        value: 10
      },
      {
        source: 'Data3',
        target: 'Data4',
        value: 10
      },
      {
        source: 'Data3',
        target: 'Data5',
        value: 30
      },
      {
        source: 'Data5',
        target: 'Data6',
        value: 4
      },
      {
        source: 'Data6',
        target: 'Data7',
        value: 16
      }
    ]
  },
  words: [
    {
      name: 'Word1',
      value: 390
    },
    {
      name: 'Word2',
      value: 275
    },
    {
      name: 'Word3',
      value: 100
    },
    {
      name: 'Word4',
      value: 1000
    },
    {
      name: 'Word5',
      value: 600
    },
    {
      name: 'Word6',
      value: 146
    },
    {
      name: 'Word7',
      value: 712
    }
  ],
  calendar: [
    {
      date: '1939-09-02',
      value: 1,
      category: '1'
    },
    {
      date: '1939-09-07',
      value: 1,
      category: '2'
    },
    {
      date: '1939-09-17',
      value: 1,
      category: '3'
    },
    {
      date: '1939-10-06',
      value: 1,
      category: '1'
    },
    {
      date: '1939-10-07',
      value: 1,
      category: '1'
    },
    {
      date: '1939-10-14',
      value: 1,
      category: '5'
    },
    {
      date: '1939-10-17',
      value: 1,
      category: '1'
    },
    {
      date: '1939-10-22',
      value: 1,
      category: '6'
    },
    {
      date: '1939-10-28',
      value: 1,
      category: '1'
    },
    {
      date: '1939-11-04',
      value: 1,
      category: '7'
    },
    {
      date: '1939-11-28',
      value: 1,
      category: '3'
    },
    {
      date: '1939-12-05',
      value: 1,
      category: '3'
    },
    {
      date: '1939-12-11',
      value: 1,
      category: '2'
    },
    {
      date: '1939-12-16',
      value: 1,
      category: '2'
    },
    {
      date: '1939-12-23',
      value: 1,
      category: '1'
    }
  ],
  axisChart: {
    headers: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: {
      'Statistic 1': [120, 132, 101, 134, 90, 230, 210],
      'Statistic 2': [220, 182, 191, 234, 290, 330, 310],
      'Statistic 3': [150, 232, 201, 154, 190, 330, 410],
      'Statistic 4': [320, 332, 301, 334, 390, 330, 320]
    }
  },
  pieChart: {
    values: {
      'Statistic 1': 122,
      'Statistic 2': 222,
      'Statistic 3': 510,
      'Statistic 4': 320
    }
  },
  funnel: {
    values: {
      'Statistic 1': 122,
      'Statistic 2': 222,
      'Statistic 3': 510,
      'Statistic 4': 320
    }
  },
  scatter: {
    points: [
      { value: [3.275154, 2.957587], category: '3' },
      { value: [-3.344465, 2.603513], category: '2' },
      { value: [0.355083, -3.376585], category: '2' },
      { value: [1.852435, 3.547351], category: '1' },
      { value: [-2.078973, 2.552013], category: '1' }

    ]
  },
  hierarchy: {
    nodes: [
      {
        name: 'Node Group 1',
        value: 100,
        category: '1',
        children: [
          {
            name: 'Node 1',
            value: 40,
            category: '2',
            children: [
              {
                name: 'Node 1.1',
                value: 20,
                category: '3'
              },
              {
                name: 'Node 1.2',
                value: 10,
                category: '4'
              }
            ]
          },
          {
            name: 'Node 1.1',
            value: 30,
            category: '2',
            children: [
              {
                name: 'Node 1.1.1',
                value: 15,
                category: '5'
              }
            ]
          }
        ]
      },
      {
        name: 'Node group 2',
        value: 50,
        category: '6',
        children: [
          {
            name: 'Node 2',
            value: 25,
            category: '7',
            children: [
              {
                name: 'Node 2.2',
                value: 12,
                category: '8'
              }
            ]
          }
        ]
      }
    ]
  }
};
export type SiteConfig = typeof siteConfig;
