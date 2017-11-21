/* @flow */
"use strict";
import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";
import { uniqueValuesInDataSets } from "./util";

import V from "./V/V";

export default class XAxis extends Component {

	/*static propTypes = {
		axisColor: PropTypes.any.isRequired,
		axisLabelColor: PropTypes.any.isRequired,
		axisLineWidth: PropTypes.number.isRequired,
		data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
		showXAxisLabels: PropTypes.bool.isRequired,
		style: PropTypes.any,
		width: PropTypes.number.isRequired,
		align: PropTypes.string,
		labelFontSize: PropTypes.number.isRequired,
		xAxisTransform: PropTypes.func,
		horizontalGridStep: PropTypes.number,
	};*/

	render() {
		var {align, axisLabelColor, labelFontSize, width, height, xAxisHeight, style, placement, axisLineWidth,
			legendStepsX, minX, maxX} = this.props;

		return (
			<View style={E(
						{backgroundColor: "transparent", justifyContent: "space-between", overflow: "visible"},
						style,
					)}>
				{Array(legendStepsX).fill().map((_, index)=> {
					var travelPercent = V.GetPercentFromXToY(0, legendStepsX - 1, index);
					let valueForTravelPercent = Math.round(V.GetValueFromXToYForPercent(minX, maxX, travelPercent));
					return (
						<Text key={index} style={{backgroundColor: "transparent", color: axisLabelColor,
								fontSize: labelFontSize, textAlign: "center",
								position: "absolute", left: (travelPercent * width) - 10, top: height - 20,
								width: 20, height: 20}}>
							{valueForTravelPercent}
						</Text>
					);
				})}
			</View>
		);
	}
}