import * as d3 from 'd3'
import '../d3-styles.js'
import { labelsOcclusion } from '@rawgraphs/rawgraphs-core'

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    nodePadding,
    anticollision,
    groupsDiameter,
    maxItemsDiameter,
    colorScale,
    showLabels,
    autoHideLabels,
    groupsFillColor, // @TODO: check how to expose it as option
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.right - margin.left
  const chartHeight = height - margin.top - margin.bottom

  // compute radius
  const radius = (chartWidth < chartHeight ? chartWidth : chartHeight) / 2

  // select the svg node
  const svg = d3.select(svgNode)

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // add viz group
  const vizGroup = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')
    .attr('transform', `translate(${chartWidth / 2}, ${chartHeight / 2})`)

  // compute the graph
  let graph = graphFromEdgesTable(data)
  // select group nodes
  let groupNodes = graph.nodes
    .filter((d) => d.type == 'group')
    .sort((a, b) => d3.ascending(a.name, b.name))
  const groupNames = groupNodes.map((d) => d.name)

  // scele for edges strenghts
  let strengthScale = d3.scaleLinear(
    d3.extent(graph.edges, (d) => d.value),
    [0, 5]
  )

  // scale for item nodes size
  let sizeScale = d3.scaleSqrt(
    [
      0,
      d3.max(
        graph.nodes.filter((d) => d.type == 'item'),
        (d) => d.strength
      ),
    ],
    [0, maxItemsDiameter / 2]
  )

  // compute colors
  // taken from https://github.com/densitydesign/Polimatters/blob/master/faculties.htm
  // by @fenicento

  //@TODO: nodes positions could be pre-calculated

  graph.nodes.forEach((d) => {
    let colr = 0
    let colg = 0
    let colb = 0

    d.components.forEach((e) => {
      colr += (e.strength / d.strength) * d3.color(colorScale(e.name)).r
      colg += (e.strength / d.strength) * d3.color(colorScale(e.name)).g
      colb += (e.strength / d.strength) * d3.color(colorScale(e.name)).b
    })

    d.color = d3.rgb(colr, colg, colb)
  })

  // define links (edges) force
  const forceLink = d3
    .forceLink(graph.edges)
    .id((d) => d.id)
    .strength((d) => strengthScale(d.value))

  // define anti-collision force
  const forceCollide = d3
    .forceCollide()
    .strength(1)
    .radius(
      (d) =>
        nodePadding +
        (d.type == 'group' ? groupsDiameter / 2 : sizeScale(d.strength))
    )

  //fix nodes positions
  groupNodes.forEach((d, i) => {
    const angle = ((Math.PI * 2) / groupNodes.length) * i
    d.fx = Math.cos(angle) * radius
    d.fy = Math.sin(angle) * radius
  })

  // start simulation
  const simulation = d3
    .forceSimulation(graph.nodes)
    .force('link', forceLink)
    .on('tick', ticked)

  // add collision force according to options

  if (anticollision) {
    simulation.force('collisionForce', forceCollide)
  }

  // run the simulation in background
  // @TODO move this to a web worker
  //console.log("---------------new simulation---------------")
  for (
    var i = 0,
      n = Math.ceil(
        Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
      );
    i < n;
    ++i
  ) {
    //console.log(i+"/"+n+"("+ (i/n*100) + ")")
    simulation.tick()
  }
  //console.log("---------------end of simulation---------------")

  // draw nodes
  const nodesLayer = vizGroup
    .append('g')
    .attr('id', 'labelsLayer')
    .attr('id', 'nodes')
    .selectAll('g')
    .data(graph.nodes)
    .join('g')
    .append('circle')

  // style group nodes
  nodesLayer
    .filter((d) => d.type == 'group')
    .attr('r', groupsDiameter / 2)
    .attr('fill', 'white') //@TODO: check how to expose a single color. See https://github.com/rawgraphs/rawgraphs-core/issues/67
    .attr('stroke', (d) => colorScale(d.name))

  // style item nodes
  nodesLayer
    .filter((d) => d.type == 'item')
    .attr('r', (d) => sizeScale(d.strength))
    .attr('fill', (d) => d.color)

  // add labels
  const labelsLayer = vizGroup
    .append('g')
    .attr('id', 'labelsLayer')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .selectAll('g')
    .data(graph.nodes)
    .join('g')

  // add texts according to option
  if (showLabels) {
    labelsLayer.append('text').text((d) => d.name)

    labelsLayer.filter((d) => d.type == 'group').styles(styles.seriesLabel)
    labelsLayer.filter((d) => d.type == 'item').styles(styles.labelPrimary)
  }

  // auto hide labels
  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d) => sizeScale(d.strength))
  }

  function ticked() {
    nodesLayer.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
    labelsLayer.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
  }
}

/*
 helper function to create a graph js object
 */
function graphFromEdgesTable(_edgesTable) {
  // links are a deep copy of the dataset, to avoid modification of origina data variable
  let links = _edgesTable.map((d) => Object.assign({}, d))

  let nodes = d3
    .rollups(
      links.flatMap((l) => [
        { id: l.group, type: 'group', strength: l.strength },
        { id: l.item, type: 'item', component: l.group, strength: l.strength },
      ]),
      (v) => ({
        name: v[0].id,
        type: v[0].type,
        id: v[0].id + '_' + v[0].type,
        strength: d3.sum(v, (d) => d.strength),
        components: v.map((d) => ({ name: d.component, strength: d.strength })),
      }),
      (d) => d.id + '_' + d.type
    )
    .map((d) => d[1])

  let edges = links.map((l) => {
    return {
      source: l.group + '_group',
      target: l.item + '_item',
      value: l.strength,
    }
  })

  return { nodes, edges }
}
