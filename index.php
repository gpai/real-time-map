<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js"></script>
		<script src="//maps.googleapis.com/maps/api/js?sensor=false&language=en&region=US"></script>
		<script src="task.js"></script>
		<link type="text/css" href="style.css" rel="stylesheet">
		<title>Realtime Map | SFPD Incidents </title>
	</head>

	<body>
		<a href="/projects/">Go Back to Grace's Portfolio</a>
		<div class="container">
			<h2> Realtime Map of SFPD Incidents </h2>
			<h3>This map includes a <a href="http://data.sfgov.org/resource/tmnf-yvry.json">dataset</a>
			 that includes all incidents devrived from the SFPD Crime Incident Reporting system from the past 3 months.</h3> 
			<h3>Map Enhancement: If you select a place from both the "Point A" and "Point B" dropdown menus, the map will show the walking
			route between the two points.</h3>
			<br>
			<h3>This was a class assignment that allowed me learn and test out API connections and creating different features using the API 
				methods.
			</h3>
			<hr>
			<div class="panel">
				<b>Point A: </b>
					<select id="start" onchange="calcRoute();"> </select>
				<b>Point B: </b>
					<select id="end" onchange="calcRoute();"/> </select>
			</div>
			<div class="mapTemplate" id= "map"></div>

			<div class ="table">
				<table class="data" id="dataJSON">
					<tr>	
						<th> Description </th>
						<th> PD District </th>
						<th> Resolution </th>
					</tr>
				</table>	
			</div>
			</br><hr></br>
		</div>
	</body>
</html>
