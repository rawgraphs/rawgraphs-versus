import versus from 'customcharts/versus'
import data from '../datasets/hello.csv'

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
  visualOptions: {},
}
