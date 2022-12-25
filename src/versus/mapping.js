import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator(
    'strength',
    mapping,
    dataTypes,
    dimensions
  )

  const results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        group: v[0][mapping.group.value],
        item: v[0][mapping.item.value],
        strength: mapping.strength.value
          ? sizeAggregator(v.map((d) => d[mapping.strength.value]))
          : 1,
      }
      results.push(item)
      return item
    },
    (d) => d[mapping.group.value] + d[mapping.item.value] // crossgrup functions. aggregate links among same source and target
  )

  return results
}
