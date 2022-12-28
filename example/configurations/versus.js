import versus from 'customcharts/versus'
import data from '../datasets/keywords.csv'

export default {
  chart: versus,
  data,
  dataTypes: {
    faculty: 'string',
    keyword: 'string',
    strength: 'number',
  },
  mapping: {
    group: { value: ['faculty'] },
    item: { value: ['keyword'] },
    strength: { value: ['strength'] },
  },
  visualOptions: { anticollision: false },
}
