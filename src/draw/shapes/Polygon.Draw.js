L.Polygon.Draw = L.Polyline.Draw.extend({
	Poly: L.Polygon,
	
	type: 'polygon',

	options: {
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: false
		}
	},

	_updateMarkerHandler: function () {
		// The first marker shold have a click handler to close the polygon
		if (this._markers.length === 1) {
			this._markers[0].on('click', this._finishShape, this);
		}
	},

	_getLabelText: function () {
		var text;
		if (this._markers.length === 0) {
			text = 'Click to start drawing shape.';
		} else if (this._markers.length < 3) {
			text = 'Click to continue drawing shape.';
		} else {
			text = 'Click first point to close this shape.';
		}
		return {
			text: text
		};
	},
	_finishShape: function () {
		if (!this.options.allowIntersection && this._poly.newLatLngIntersects(this._poly.getLatLngs()[0], true)) {
			this._showErrorLabel();
			return;
		}
		if (!this._shapeIsValid()) {
			this._showErrorLabel();
			return;
		}

		this._map.fire(
			'drawn', {feature: {
			"type": "Feature",
			"geometry": {type: "Polygon", coordinates: [this._poly.getLatLngs().map(L.Util.latLngToXY)]},
			"properties": {"Created In": "Leaflet"}
		}
		}
		);
		this.disable();
	},
	_shapeIsValid: function () {
		return this._markers.length >= 3;
	},

	_vertexAdded: function (latlng) {
		//calc area here
	},

	_cleanUpShape: function () {
		if (this._markers.length > 0) {
			this._markers[0].off('click', this._finishShape);
		}
	}
});
