const csvUrl = [
  'https://gist.githubusercontent.com/',
  'curran/', // User
  'a08a1080b88344b0c8a7/', // Id of the Gist
  'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/', // commit
  'iris.csv', // File name
].join('');

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const width = 700;
const height = 500 ;

// const color = (d) => {
//   if (d.species == 'setosa')
//     return '#A7D2CB'
//   else if (d.species == 'versicolor')
//     return '#F2D388'
//   else return '#874C62'
// }

const svg = d3.select('.plot')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('color', '#06283D');

const main = async () => {
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(await d3.csv(csvUrl, parseRow))
    .xValue((d) => d.petal_width)
    .yValue((d) => d.sepal_length)
    .margin({
      top: 20,
      right: 20,
      bottom: 40,
      left: 50,
    })


  svg.call(plot);

  const columns = [
    'petal_width',
    'sepal_width',
    'petal_length',
    'sepal_length',
  ];

  let i = 0;
  setInterval(() => {
    i++;
    plot.xValue((d) => d[columns[i % columns.length]]);
    svg.call(plot);
  }, 3000);

};


main();
