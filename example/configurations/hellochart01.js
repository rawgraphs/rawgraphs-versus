import versus from 'customcharts/versus'
import data from '../datasets/hello.csv'

export default {
  chart: versus,
  data,
  dataTypes: {
    hello_column: 'string',
  },
  mapping: {
    groups: { value: ['hello_column'] },
  },
  visualOptions: {
    color: 'green',
  },
}
