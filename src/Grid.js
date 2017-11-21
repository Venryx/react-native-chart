import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { uniqueValuesInDataSets } from './util';

import V from "./V/V";

export default class Grid extends Component {
	/*static propTypes = {
		showGrid: PropTypes.bool,
		data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
		verticalGridStep: PropTypes.number.isRequired,
		horizontalGridStep: PropTypes.number,
		gridLineWidth: PropTypes.number,
		gridColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		hideHorizontalGridLines: PropTypes.bool,
		hideVerticalGridLines: PropTypes.bool,
		height: PropTypes.number,
		width: PropTypes.number,
		type: PropTypes.oneOf(['line', 'bar', 'pie']).isRequired,
	};*/
	static defaultProps = {

	};

	render() {
		if (!this.props.showGrid) return null;
		const horizontalRange = [];
		const verticalRange = [];
		const xData = uniqueValuesInDataSets(this.props.data || [[]], 0);
		const yData = uniqueValuesInDataSets(this.props.data || [[]], 1);
		
		/*const horizontalSteps = (yData.length < this.props.verticalGridStep) ? yData.length : this.props.verticalGridStep;
		let stepsBetweenVerticalLines = this.props.horizontalGridStep ? Math.round(xData.length / this.props.horizontalGridStep) : 1;
		if (stepsBetweenVerticalLines < 1) stepsBetweenVerticalLines = 1;*/
		const horizontalSteps = this.props.legendStepsX;
		const stepsBetweenVerticalLines = this.props.legendStepsY;

		for (let i = horizontalSteps; i > 0; i--) horizontalRange.push(i);
		for (let i = xData.length - 1; i > 0; i -= stepsBetweenVerticalLines) verticalRange.push(i);

		const containerStyle = { width: this.props.width, height: this.props.height, position: 'absolute', left: 0, top: 0 };

		let intendedLineWidth = this.props.gridLineWidth;
		if (this.props.gridLineWidth < 1) {
			intendedLineWidth = StyleSheet.hairlineWidth;
		}

		const horizontalGridStyle = {
			height: this.props.height / this.props.verticalGridStep,
			width: this.props.width,
			borderTopColor: this.props.gridColor,
			borderTopWidth: intendedLineWidth,
		};

		const verticalGridStyle = {
			height: this.props.height + 1,
			width: (this.props.width / (xData.length - 1)) * stepsBetweenVerticalLines,
			
			borderRightWidth: intendedLineWidth,
		};

		var {legendStepsX, legendStepsY, width, height} = this.props;
		var gridWidth = width - 1;
		var gridHeight = height - 1;

		return (
			<View style={containerStyle}>
				{Array(legendStepsX).fill().map((_, index)=> {
					var travelPercent = V.GetPercentFromXToY(0, legendStepsX - 1, index);
					//if (index == 0) return;
					return (
						<View key={`x_${index}`}
							style={{
								position: "absolute", left: travelPercent * gridWidth, top: 0,
								width: 1, height: gridHeight, backgroundColor: this.props.gridColor,
								//borderColor: this.props.gridColor, borderLeftWidth: 1,
							}}/>
					);
				})}
				{Array(legendStepsY).fill().map((_, index)=> {
					var travelPercent = V.GetPercentFromXToY(0, legendStepsY - 1, index);
					//if (index == 0 || index == legendStepsY - 1) return;
					return (
						<View key={`y_${index}`}
							style={{
								position: "absolute", left: 0, top: travelPercent * gridHeight,
								width: gridWidth, height: 1, backgroundColor: this.props.gridColor,
							}}/>
					);
				})}
			</View>
		);
	}
}
