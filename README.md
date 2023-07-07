#  Versus: a custom RAWGraphs chart <img src="https://github.com/rawgraphs/rawgraphs-versus/blob/master/src/versus/versus.svg" alt="versus icon" height="40px" style="vertical-align: middle"/>

This custom chart is intedend to be used in https://app.rawgraphs.io/.

<img src="https://raw.githubusercontent.com/rawgraphs/rawgraphs-versus/master/src/versus/versus_thumb.svg" alt="versus icon" height="100%" style="text-align: center"/>

The chart is inspired by a [research done at DensityDesign Lab](https://densitydesign.org/research/versus/) and then refined in a tool called [PoliMatter](https://densitydesign.github.io/Polimatters/).

The visual model displays bipartite graphs (composed by two kinds of nodes) in which one set acts as "attractors" and are dsitributed on a cicle, and the other set of nodes is disposed according to the strength of connections to the attractors.

The visual model works better with a lower amount of attractors (3 or 4), or with network whose strenghts are highly polarised.

## Install

* Download the `versus.umd.js` file from the [latest release](https://github.com/rawgraphs/rawgraphs-versus/releases).
* Open https://dev.rawgraphs.io/
* Upload your dataset, or upload [this sample dataset for Versus](https://raw.githubusercontent.com/rawgraphs/rawgraphs-versus/master/example/datasets/five-categories.csv).
- Scroll down the visual models list, click on `Load yout chart`
- In the popup window `Add a new custom chart`, upload the `versus.umd.js` file
- Click on `Load your chart` button.
- A pop-up will inform you that you are loading an external piece of code, click on `continue` to load it.
- You are now ready to use the chart.

## Tutorial

In this tutorial we'll show wich keywords are used in design theses at Politecnico di Milano, and their usage across different MSc courses.

#### Dataset

In [RAWgraphs interface](https://app.rawgraphs.io/), load the dataset you can find at [this link](https://raw.githubusercontent.com/rawgraphs/rawgraphs-versus/master/example/datasets/polimi-design-keywords.tsv). You can download it and upload in RAWGraphs interface, or load it derecly in RAWGraphs using the `from URL` section in the interface.

The dataset contains three columns: the age group, number of male people, and number of female people for that age group.

#### Chart Selection

select "Versus". If you don't see it, read the section [Installation](#Installation).

#### Mapping

Drag and drop the dimensions to the chart variables as it follows:

- `MSc Course` on `Groups`
- `Keyword` on `Item`
- `Number of theses` on `Strength`

#### Customize

The chart offers some options to customize the chart.

In the **Artboard** section you can mange the overall artboard.

* Increase **Width** and **Height** to `1000` px.

In the **Chart** section you can define the size of items and groups circles, apply an anti-overlapping algorithm, and set the padding.

* Set **Max items diameter** to `30`
* Set **Padding** to `10`

In the **Color** section you can define the color of the attractor groups

* Click on **Color Scheme** and set it to `Spectral discrete`

## Contribute

If you'd like to contribute, follow the RAWGraphs [custom template guide](https://github.com/rawgraphs/custom-rawcharts-template).


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
