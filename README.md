# <img src="https://github.com/rawgraphs/rawgraphs-versus/blob/master/src/versus/versus.svg" alt="versus icon" height="40px" style="vertical-align: middle"/> Versus: a custom RAWGraphs chart

**WARNING: the chart works with the [development version of RAWGraphs](dev.rawgraphs.io), currently available only on invite.**

<img src="https://raw.githubusercontent.com/rawgraphs/rawgraphs-versus/master/src/versus/versus_thumb.svg" alt="versus icon" height="100%" style="text-align: center"/>

The chart is inspired by a research done at DensityDesign Lab (https://densitydesign.org/research/versus/) and then refined in a tool called PoliMatter (https://densitydesign.github.io/Polimatters/).

The visual model displays bipartite graphs (composed by two kinds of nodes) in which one set acts as "attractors" and are dsitributed on a cicle, and the other set of nodes is disposed according to the strength of connections to the attractors.

The visual model works better with a lower amount of attractors (3 or 4), or with network whose strenghts are highly polarised.

## Install

* Download the `versus.umd.js` file from the [latest release](https://github.com/rawgraphs/rawgraphs-versus/releases).
* Open https://dev.rawgraphs.io/
* Upload your dataset, or upload [this sample dataset for Versus](https://raw.githubusercontent.com/rawgraphs/rawgraphs-versus/master/example/datasets/five-categories.csv)
* Scroll down the visual models list, click on `"Add your Chart!"`
* In the popup window `Add a new custom chart`, upload the `versus.umd.js`
* Enjoy!


## Edit the code

### Install dependencies

```sh
npm install
```

### Run Sandbox

Modify the chart on your machine with livereload thanks to Webpack.

```sh
npm run sandbox
```

You can find your charts at [http://localhost:9000](http://localhost:9000)

### Build

Build the chart to use it in RAWGraphs.

```sh
npm run build
```
