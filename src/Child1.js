import React, {Component} from 'react'
import * as d3 from 'd3'

class Child1 extends Component{
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
        var data = this.props.data1
        var margin = { top: 80, right: 10, bottom: 60, left: 60},
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom

        var container = d3.select(".child1_svg")
        .attr("height", h + margin.top + margin.bottom)
        .attr("width", w + margin.right + margin.left)
        .select(".g_1")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add the X-axis
        var x_data = data.map(item => item.total_bill)
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([0, w]);
        d3.selectAll(".child1_svg").selectAll(".x_axis_g").data([0]).join('g').attr('class', "x_axis_g")
        .attr("transform", `translate(${margin.left}, ${margin.top + h})`).call(d3.axisBottom(x_scale))

        // Add the Y-axis
        var y_data = data.map(item => item.tip)
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        d3.selectAll(".child1_svg").selectAll(".y_axis_g").data([0]).join('g').attr('class', "y_axis_g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`).call(d3.axisLeft(y_scale))

        // Add the circle markers
        container.selectAll("circle").data(data).join("circle").attr("cx", function(d){
            return x_scale(d.total_bill)
        })
        .attr("cy", function(d){
            return y_scale(d.tip)
        })
        .attr("r", 3)
        .style("fill", "#69b3a2");

        // Add the labels
        d3.select('.child1_svg').selectAll(".plot_title").data([0]).join('text').attr('class', ".plot_title")
        .attr("transform", `translate(${margin.left + w/2}, ${margin.top/2})`)
        .attr("text-anchor", "middle")
        .text("Total Bill vs Tips")
        .style("font-size", "20px")
        .style('font-weight', 'bold')

        d3.select('.child1_svg').selectAll(".x_axis_label").data([0]).join('text').attr('class', ".x_axis_label")
        .attr("transform", `translate(${margin.left + w/2}, ${h + margin.top + margin.bottom/2 + 5})`)
        .attr("text-anchor", "middle")
        .style('font-weight', 'bold')
        .text("Total Bill")

        d3.select('.child1_svg').selectAll(".y_axis_label").data([0]).join('text').attr('class', ".y_axis_label")
        .attr("x", margin.left/2)
        .attr("y",  margin.top + h/2)
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90, ${margin.left/2}, ${margin.top + h/2})`)
        .style("font-weight", "bold")
        .text("Tip")
    }

    render(){
        return(
            <svg className='child1_svg'>
                <g className='g_1'></g>
            </svg>
        )
    }
}

export default Child1