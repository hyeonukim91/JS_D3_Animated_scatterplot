 const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;

  const my = (selection) => {

    const x = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    const icon = (d) => {
        if (d.species == 'setosa')
          return 'images/dolphin.svg'
        else if (d.species == 'versicolor')
          return 'images/whale.svg'
        else return 'images/penguin.svg'
      };

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      icon: icon(d)
    }));

    const t = d3.transition().duration(1000);

    const positionG = (g) =>{
            g.attr('transform', (d) => `translate(${d.x},${d.y})`)
    }

    const iconSvg = (svg) => {
      svg.attr("xlink:href", (d) => d.icon);
    }

    const markg = selection
      .selectAll('g')
      .data(marks)
      .attr('id', 'svgmarks')
      .join(
        (enter) =>
        enter.append('g')
          .call(positionG)
          .append('svg:image')
          .attr('y', -20)
          .attr('width', 20)
          .attr('height', 20)
          .call(iconSvg),
        (update) =>
        update.call((update) =>
        update.transition(t)
        .delay((d,i) => i*10)
        .call(positionG)
      ),
        (exit) => exit.remove()
      )//join

    selection
      .selectAll('.y-axis')
       .data([null])
       .join('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left},0)`)
       .call(d3.axisLeft(y));

    selection
      .selectAll('.x-axis')
        .data([null])
        .join('g')
        .attr('class', 'x-axis')
        .attr('fill','green')
        .attr(
          'transform',
          `translate(0,${height - margin.bottom})`)
        .transition(t)
        .call(d3.axisBottom(x));
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  return my;
};