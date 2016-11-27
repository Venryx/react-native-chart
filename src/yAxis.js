/* @flow */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { uniqueValuesInDataSets } from './util';

import V from "./V/V";

export default class YAxis extends Component<void, any, any> {

	static propTypes = {
		axisColor: PropTypes.any,
		axisLineWidth: PropTypes.number,
		data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
		height: PropTypes.number.isRequired,
		placement: PropTypes.oneOf(['left', 'right']),
		verticalGridStep: PropTypes.number.isRequired,
		yAxisTransform: PropTypes.func,
		yAxisUseDecimal: PropTypes.bool,
		yAxisShortLabel: PropTypes.bool
	};

	static defaultProps : any = {
		placement: 'left',
	};

	constructor(props : any) {
		super(props);
		this.state = { bounds: { min: 0, max: 0 } };
	}

	// Credits:  Martin Sznapka, StackOverflow, QuestionID: 9461621
	shortenLargeNumber(num, useDecimal) {
		let digits = (useDecimal) ? 2 : 0;
		var units = ['K', 'M', 'B', 't', 'P', 'E', 'Z', 'Y'],
				decimal;
		for (var i=units.length-1; i>=0; i--) {
				decimal = Math.pow(1000, i+1);

				if(num <= -decimal || num >= decimal) {
						return +(num / decimal).toFixed(digits) + units[i];
				}
		}
		return num;
	}

	_createLabelForYAxis = (index : number) => {
		let minBound = this.props.minVerticalBound;
		let maxBound = this.props.maxVerticalBound;

		// For all same values, create a range anyway
		if (minBound === maxBound) {
			minBound -= this.props.verticalGridStep;
			maxBound += this.props.verticalGridStep;
		}
		minBound = (minBound < 0) ? 0 : minBound;
		let label = minBound + (maxBound - minBound) / this.props.verticalGridStep * index;
		label = parseFloat(label.toFixed(3));

		if (!this.props.yAxisUseDecimal) {
			label = Math.round(label);
		}

		if (this.props.yAxisShortLabel) {
			label = this.shortenLargeNumber(label, this.props.yAxisUseDecimal);
		}


		if (this.props.yAxisTransform && typeof this.props.yAxisTransform === 'function') {
			label = this.props.yAxisTransform(label);
		}
		return (
			<Text
				style={{
					color: this.props.axisLabelColor,
					fontSize: this.props.labelFontSize,
				}}
				key={index}
			>
				{label}
			</Text>
		);
	};

	render() {
		/*const range = [];
		const data = uniqueValuesInDataSets(this.props.data || [[]], 1);
		const steps = (data.length < this.props.verticalGridStep) ? data.length : this.props.verticalGridStep;
		for (let i = steps; i >= 0; i--) range.push(i);
		return (
			<View
				style={[
					styles.yAxisContainer,
					this.props.style || {},
					this.props.placement === 'left' && { borderRightColor: this.props.axisColor, borderRightWidth: this.props.axisLineWidth },
					this.props.placement === 'right' && { borderLeftColor: this.props.axisColor, borderLeftWidth: this.props.axisLineWidth },
				]}
			>
				{range.map(this._createLabelForYAxis)}
			</View>
		);*/

		var {align, axisLabelColor, labelFontSize, height, yAxisWidth, style, placement, axisLineWidth,
			legendStepsY, minY, maxY} = this.props;

		return (
			<View style={E(
						{flexDirection: 'column', flex: 1, paddingVertical: 0, paddingRight: 5, alignItems: 'flex-end'},
						style,
						//placement === 'left' && { borderRightColor: axisColor, borderRightWidth: axisLineWidth },
						//placement === 'right' && { borderLeftColor: axisColor, borderLeftWidth: axisLineWidth },
					)}>
				{Array(legendStepsY).fill().map((_, index)=> {
					var travelPercent = V.GetPercentFromXToY(0, legendStepsY - 1, index);
					travelPercent = 1 - travelPercent; // reverse, since ui has y start at top
					let valueForTravelPercent = Math.round(V.GetValueFromXToYForPercent(minY, maxY, travelPercent));
					return (
						<Text key={index} style={{color: axisLabelColor, fontSize: labelFontSize, textAlign: "right",
								position: "absolute", right: 5, bottom: travelPercent * height, transform: [{translateY: -12}],
								width: 20, height: 20}}>
							{valueForTravelPercent}
						</Text>
					);
				})}
			</View>
		);
	}
}
