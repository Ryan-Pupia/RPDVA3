import React, {Component} from 'react'
import * as d3 from 'd3'

class Child2 extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.renderChart()
    }

    componentDidUpdate(){
        this.renderChart()
    }

    renderChart(){
        // Set graph margin and dimensions
        var margin = { top: 80, right: 10, bottom: 60, left: 60},
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom

        var container = d3.select(".child2_svg")
        .attr("height", h + margin.top + margin.bottom)
        .attr("width", w + margin.right + margin.left)
        .select(".g_2")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Configure the x-axis
        const data = this.props.data2;
        var flat_data = d3.flatRollup(
            data,
            (v) => d3.mean(v, (d) => d.tip),
            (d) => d.day
        );
        var x_data = flat_data.map(item => item[0])
        var y_data = flat_data.map(item => item[1])
        const x_scale = d3.scaleBand().domain(x_data).range([0,w]).padding(0.2)
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);

        container.selectAll(".avg_tip_bar")
            .data(flat_data).join("rect")
            .attr("class", "avg_tip_bar")
            .attr("x", d => x_scale(d[0]))
            .attr("y", d => y_scale(d[1]))
            .attr("width", x_scale.bandwidth())
            .attr("height", d => h - y_scale(d[1]))
            .style("fill", "#69b3a2")

        // Adding in the X axis
        d3.selectAll(".child2_svg").selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g")
        .attr("transform", `translate(${margin.left}, ${margin.top + h})`).call(d3.axisBottom(x_scale))

        // Adding in the Y axis
        d3.selectAll(".child2_svg").selectAll("y_axis_g").data([0]).join("g").attr("class", "y_axis_g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`).call(d3.axisLeft(y_scale))

        // Add the labels
        d3.select('.child2_svg').selectAll(".plot_title").data([0]).join('text').attr('class', ".plot_title")
        .attr("transform", `translate(${margin.left + w/2}, ${margin.top/2})`)
        .attr("text-anchor", "middle")
        .text("Average Tips by Day")
        .style("font-size", "20px")
        .style('font-weight', 'bold')

        d3.select('.child2_svg').selectAll(".x_axis_label").data([0]).join('text').attr('class', ".x_axis_label")
        .attr("transform", `translate(${margin.left + w/2}, ${h + margin.top + margin.bottom/2})`)
        .attr("text-anchor", "middle")
        .style('font-weight', 'bold')
        .text("Day")

        d3.select('.child2_svg').selectAll(".y_axis_label").data([0]).join('text').attr('class', ".y_axis_label")
        .attr("x", margin.left/2)
        .attr("y",  margin.top + h/2)
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90, ${margin.left/2}, ${margin.top + h/2})`)
        .style("font-weight", "bold")
        .text("Average Tip")
    }

    render(){
        return(
            <svg className='child2_svg'>
                <g className='g_2'></g>
            </svg>
        )
    }
}

export default Child2