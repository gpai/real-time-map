function inputText(t){
	return document.createTextNode(t).textContent;
}

function LoadJSON(data) {
	var html= "<tr>";
	for(var i = 0; i< data.length; i++){
		var html= "<tr>";
		html += "<td> <a href = '#' onClick=\"centerMap('"+inputText(data[i].y)+
			"','"+inputText(data[i].x)+
			"','"+inputText(data[i].descript)+
			"','"+inputText(data[i].resolution)+"')\">"
			+data[i].descript+"</td>";
		html += "<td>"+inputText(data[i].pddistrict)+ "</td>";
		html += "<td>"+inputText(data[i].resolution)+ "</td>";
		html += "</tr>";
		$("#dataJSON").append(html);

		var startOptions="<option value="+inputText(data[i].y)+","+inputText(data[i].x)+"> Incident #: "+
			inputText(data[i].incidntnum)+": "+ 
			inputText(data[i].descript)+"</option>"
		$("#start").append(startOptions);
		
		var endOptions="<option value="+inputText(data[i].y)+","+inputText(data[i].x)+"> Incident #: "+
			inputText(data[i].incidntnum)+": "+ 
			inputText(data[i].descript)+"</option>"
		$("#end").append(endOptions);
	}
	$("#start").append("</select>");
	$("#end").append("</select>");		
}

var maps, marker, placeLoc, directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initializeMap(){
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng=new google.maps.LatLng(37.7833,-122.4167);
	var myOptions = {
		zoom:16,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('map'), myOptions);
	directionsDisplay.setMap(map);	
}

function calcRoute(){
	var startValues = document.getElementById('start').value.split(",");
	var start = new google.maps.LatLng(parseFloat(startValues[0]), parseFloat(startValues[1]));
	
	var endValues = document.getElementById('end').value.split(",");
	var end = new google.maps.LatLng(parseFloat(endValues[0]), parseFloat(endValues[1]));
	
	var request = {
		origin: start ,
		destination: end ,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	directionsService.route(request , function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

function centerMap(latitude, longitude, descript, resolution){
	if(marker){
		marker.setMap(null);
	}
	var latlong=new google.maps.LatLng(latitude,longitude);
	map.setCenter(latlong);
	marker = new google.maps.Marker({
		position: latlong,
		map:map,
		title: descript.toString()+" | Resolution: "+ resolution.toString(),
		icon: 'blue-dot.png'
	});
}

function FAIL(myXMLHttpRequest,myErrorMessage,myErrorThrown) {
   	alert('status: ' + myErrorMessage + '\n' + myXMLHttpRequest.responseText);
}


function go(){
	initializeMap();
	$.ajax({
		url:"/projects/realtimeMap/myProxy.php?http://data.sfgov.org/resource/tmnf-yvry.json",
		dataType: "json",
		success: LoadJSON,
		error: FAIL
	});

	var placeMarkerListener = google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
	});
}

$(document).ready(
	go 
);

