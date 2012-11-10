map.on('draw:poly-created', function (e) {
			L.Util.toGeoJSON(e.poly,e.poly.options.type);
		});
map.on('draw:rectangle-created', function (e) {
			L.Util.toGeoJSON(e.rect,"rectangle");
		});
map.on('draw:circle-created', function (e) {
			L.Util.toGeoJSON(e.circ,"circle");
		});
map.on('draw:marker-created', function (e) {
			L.Util.toGeoJSON(e.marker,"marker");
});

L.Util.latLngToXY = function (ll){
	return [ll.lng,ll.lat]
}

L.Util.toGeoJSON = function (shape,type){
	var base = { 
		"type": "Feature",
		"geometry": {},
		"properties": {"Created In":"Leaflet"}
	};
	switch(type){
		case "marker": 
			base.geometry.type = "Point";
			base.geometry.coordinates = L.Util.latLngToXY(shape.getLatLng());
			break;
		case "circle":
			base.geometry.type = "Point";
			base.geometry.coordinates = L.Util.latLngToXY(shape.getLatLng());
			base.properties.radius = shape.getRadius();
			break;
		case "rectangle":
			base.geometry.type = "Polygon";
			base.geometry.coordinates = [shape.getLatLngs().map(L.Util.latLngToXY)];
			break;
		case "polygon":
			base.geometry.type = "Polygon";
			base.geometry.coordinates = [shape.getLatLngs().map(L.Util.latLngToXY)];
			break;
		case "polyline":
			base.geometry.type = "LineString";
			base.geometry.coordinates = shape.getLatLngs().map(L.Util.latLngToXY);
			break;
	};
}
