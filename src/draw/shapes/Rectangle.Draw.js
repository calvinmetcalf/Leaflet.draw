L.Rectangle.Draw = L.SimpleShape.Draw.extend({
	type: 'rectangle',

	options: {
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		}
	},
	
	_initialLabelText: 'Click and drag to draw rectangle.',

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
		}
	},

	_fireCreatedEvent: function () {
		var b = new L.Rectangle(this._shape.getBounds()).getLatLngs();
		this._map.fire(
			'drawn', {feature: {
			"type": "Feature",
			"geometry": {type: "Polygon", coordinates: [b.map(L.Util.latLngToXY)]},
			"properties": {"Created In": "Leaflet"}
		}
		}
		);
	}
});
