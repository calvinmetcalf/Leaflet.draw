L.Circle.Draw = L.SimpleShape.Draw.extend({
	type: 'circle',

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

	_initialLabelText: 'Click and drag to draw circle.',

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, this._startLatLng.distanceTo(latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(this._startLatLng.distanceTo(latlng));
		}
	},

	_fireCreatedEvent: function () {
		this._map.fire(
			'drawn',{feature:{ 
		"type": "Feature",
		"geometry": {type:"Point", coordinates:L.Util.latLngToXY(this._startLatLng)},
		"properties": {"Created In":"Leaflet",radius:this._shape.getRadius()}
	}}
			
		);
	}
});
