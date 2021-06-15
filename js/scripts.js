// Mapa Leaflet
    var mapa = L.map('mapid').setView([9.65, -83.95], 10);

// Conjunto de capas base

    var Esri_WorldGrayCanvas = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', 
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
       }
    ).addTo(mapa);

	var osm = L.tileLayer(
	  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
	  {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  } 
	).addTo(mapa);	
	        
// Conjunto de capas base
	var mapasBase = {
        "OSM": osm, 
        "Esri_World": Esri_WorldGrayCanvas,
	};	    
	    
// Control de capas
    control_capas = L.control.layers(mapasBase).addTo(mapa);
	
// Control de escala
    L.control.scale({ position: 'bottomright', imperial: false }).addTo(mapa);       

// Ícono personalizado para cafe
    const iconoCafe = L.divIcon({
        html: '<i class="fas fa-mug-hot fa-2x"></i>',
        className: 'estiloIconos'
});



// Capa vectorial en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea3/main/capas/fincascafe.geojson", function(geodata) {
  // Registros individuales
  var capa_fincascafe = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 3}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Finca</strong>: " + feature.properties.Nombre + "<br>" + 
                      "<strong>Tipo de Café</strong>: " + feature.properties.TipoCafe + "<br>" +
                      "<br>";
      layer.bindPopup(popupText);
    },
    pointToLayer: function(getJsonPoint, latlng) {
    return L.marker(latlng, {icon: iconoCafe});
    }
  });

  // Capa de puntos agrupados
  var capa_cafe_agrupados = L.markerClusterGroup();
  capa_cafe_agrupados.addLayer(capa_fincascafe);

  // Se añade la capa al mapa y al control de capas
  capa_cafe_agrupados.addTo(mapa);
  control_capas.addOverlay(capa_cafe_agrupados, 'Fincas agrupadas de cafe');
  control_capas.addOverlay(capa_fincascafe, 'Fincas de cafe');
});


$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea3/main/capas/viascafe.geojson", function(geodata) {
  var capa_viascafe = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Vías a Fincas</strong>: " + feature.properties.RUTA;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_viascafe, 'Vías a Fincas'); 
});

$.getJSON("https://raw.githubusercontent.com/ANALUGARITA/Tarea2/main/capas/cantonescafe.geojson", function(geodata) {
  var capa_cantones = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "black", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Cantón</strong>: " + feature.properties.canton;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_cantones, 'Cantones'); 
});

