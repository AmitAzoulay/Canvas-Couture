// Store topExpensiveOrders in a data attribute
const topExpensiveOrders = JSON.parse('<%- JSON.stringify(statistics.topExpensiveOrders) %>');
// Store salesByCategory in a data attribute
const salesByCategory = JSON.parse('<%- JSON.stringify(statistics.salesByCategory) %>');

// D3.js Visualization for Top 5 Expensive Orders
const topOrdersSvg = d3.select("#top-orders-chart")
    .append("svg")
    .attr("width", 600)
    .attr("height", 300);

const topOrderBars = topOrdersSvg.selectAll(".bar")
    .data(topExpensiveOrders)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * (600 / topExpensiveOrders.length))
    .attr("y", d => 300 - (d.totalOrderCost / d3.max(topExpensiveOrders, order => order.totalOrderCost) * 300))
    .attr("width", 600 / topExpensiveOrders.length)
    .attr("height", d => (d.totalOrderCost / d3.max(topExpensiveOrders, order => order.totalOrderCost) * 300))
    .style("fill", "blue"); // Change the color to blue

// Add labels for Top 5 Expensive Orders below the bars
topOrdersSvg.selectAll(".label")
    .data(topExpensiveOrders)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d, i) => i * (600 / topExpensiveOrders.length) + (600 / topExpensiveOrders.length) / 2)
    .attr("y", 290) // Positioning below the bars
    .attr("text-anchor", "middle")
    .text(d => `$${d.totalOrderCost}`); // Display the total cost below each bar

// D3.js Visualization for Sales by Category (Pie Chart)
// D3.js Visualization for Sales by Category (Pie Chart)
const width = 600;
const height = 300;
const radius = Math.min(width, height) / 2;

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pie = d3.pie()
    .value(d => d.totalSales);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

const salesSvg = d3.select("#sales-category-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const pieData = pie(salesByCategory);

const arcs = salesSvg.selectAll(".arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i));

// Create Legend for Sales by Category
const salesLegend = d3.select("#sales-category-legend").selectAll(".legend-item")
    .data(pieData)
    .enter()
    .append("div")
    .attr("class", "legend-item");

salesLegend.append("div")
    .attr("class", "legend-color")
    .style("background-color", (d, i) => color(i)) // Set the background color to match the pie segment
    .style("width", "20px") // Set a fixed width for the color swatch
    .style("height", "20px") // Set a fixed height for the color swatch
    .style("display", "inline-block") // Align items inline
    .style("margin-right", "5px"); // Add some space between the color and text

salesLegend.append("span")
    .text(d => `${d.data._id}: ${d.data.totalSales}`); // Add the category name and total sales to the legend