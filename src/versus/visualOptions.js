export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard',
  },

  groupsDiameter: {
    type: 'number',
    label: 'Groups diameter',
    default: 60,
    group: 'chart',
  },
  // groupsFillColor: {
  //   type: 'colorScale',
  //   label: 'Groups fill color',
  //   dimension: 'groupsFillColor', // as called in the mapping
  //   default: 'white',
  //   // default: {
  //   //   scaleType: 'ordinal',
  //   //   interpolator: 'interpolateSpectral',
  //   // },
  //   group: 'chart',
  // },

  maxItemsDiameter: {
    type: 'number',
    label: 'Max items diameter',
    default: 20,
    group: 'chart',
  },

  anticollision: {
    type: 'boolean',
    label: 'Avoid nodes overlappings',
    default: true,
    group: 'chart',
  },

  nodePadding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart',
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'group', // as called in the mapping
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  showLabels: {
    type: 'boolean',
    label: 'Show labels',
    default: true,
    group: 'labels',
  },

  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels',
  },
}
