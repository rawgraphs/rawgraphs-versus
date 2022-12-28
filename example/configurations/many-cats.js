import versus from 'customcharts/versus'
import data from '../datasets/five-categories.csv'

export default {
  chart: versus,
  data,
  dataTypes: {
    item: 'string',
    cat: 'string',
    value: 'number',
  },
  mapping: {
    group: { value: ['cat'] },
    item: { value: ['item'] },
    strength: { value: ['value'] },
  },
  visualOptions: { anticollision: true },
}
