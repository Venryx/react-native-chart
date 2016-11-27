export default class V {
	static GetPercentFromXToY(start, end, val, clampResultTo0Through1 = true) {
		// distance-from-x / distance-from-x-required-for-result-'1'
		var result = (val - start) / (end - start);
		/*if (clampResultTo0Through1)
			result = result.Clamp(0, 1);*/
		return result;
	}
	static GetValueFromXToYForPercent(startVal, endVal, percent, clampPercentTo0Through1 = true) {
		/*if (clampPercentTo0Through1)
			percent = percent.Clamp(0, 1);*/
		// start-val + portion-of-difference-achieved-by-given-percent
		var result = startVal + ((endVal - startVal) * percent);
		return result;
	}

	static Toast(...args) {
		g.V.Toast(...args);
	}
}