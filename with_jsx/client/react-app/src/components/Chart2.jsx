import React, { Component } from "react";
import StackedClusteredColumnChart from "./Charts/StackedClusteredColumnChart";

class Chart2 extends Component {
    constructor(props) {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            chartData: [],
        };
    }
    getChartData = () => {
        fetch("/api/v1/stacked-column-chart")
            .then((response) => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        chartData: result.chart_data,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    };

    componentDidMount() {
        this.getChartData();
    }
    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <StackedClusteredColumnChart
                        chartId="chart2"
                        data={this.state.chartData.data}
                        axisNames={{
                            xAxis: [this.state.chartData.label.domainAxis],
                            yAxis: [this.state.chartData.label.rangeAxis],
                        }}
                        columnForXAxis="Year"
                        columnsForYAxis={["Africa", "America", "Antartica", "Asia", "Australia", "Europe"]}
                        chartTitle={this.state.chartData.title}
                    />
                </React.Fragment>
            );
        }
    }
}

export default Chart2;
