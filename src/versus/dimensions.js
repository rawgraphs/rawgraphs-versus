export const dimensions = [
  {
    id: 'group',
    name: 'Groups',
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'item',
    name: 'Items',
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'strength',
    name: 'Strength',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
]
