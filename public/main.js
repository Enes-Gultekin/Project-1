const view = new ol.View({
  projection: "EPSG:4326",
  center: [73, 12], //Coordinates of center
  zoom: 6, //zoom level of map
});

//Define basemap
const OSMBaseMap = new ol.layer.Tile({
  source: new ol.source.OSM({
    wrapX: false,
  }),
});

// Define array of layers
const layerArray = [OSMBaseMap];

// Define our map
const map = new ol.Map({
  target: "map",
  layers: layerArray,
  view: view,
});
const draw_source = new ol.source.Vector();
const draw_layer = new ol.layer.Vector({
  source: draw_source,
});
map.addLayer(draw_layer);
let aa = [];
let geoExp;
let draw_type;
function drawVector(vectortype) {
  draw_type = new ol.interaction.Draw({
    source: draw_source,
    type: vectortype,
  });
  if (draw_source) {
    draw_source.clear();
  }

  map.addInteraction(draw_type);
  draw_type.on("drawend", function (event) {
    console.log(event.feature.getGeometry().getCoordinates()[0]);
    //export to gejson
    let geojson_export = new ol.format.GeoJSON({
      geometryName: draw_type,
    });

    geoExp = geojson_export.writeFeature(event.feature);
    //expo(geoExp);
    console.log(event.feature.getGeometry().getCoordinates()[0]);
    aa.push(event.feature);
  });
}

const button_containers = document.getElementById("button_container");

const radio_buttons_innerHTML =
  "<div class='radio-inputs'><label><input class='radio-input' type='radio' name='draw' value='Polygon' /><span class='radio-tile'><span class='radio-icon'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-hexagon' viewBox='0 0 16 16'><path d='M14 4.577v6.846L8 15l-6-3.577V4.577L8 1zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866z'/></svg></span><span class='radio-label'>Polygon</span></span></label><label><input class='radio-input' type='radio' name='draw' value='LineString'/><span class='radio-tile'><span class='radio-icon'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrows-vertical' viewBox='0 0 16 16'><path d='M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z' /></svg></span><span class='radio-label'>Line</span>  </span></label><label>    <input class='radio-input' type='radio' name='draw' value='Point'/><span class='radio-tile'><span class='radio-icon'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-dot' viewBox='0 0 16 16'><path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' /></svg></span><span class='radio-label'>Point</span></span></label></></div>";

// const collapsable_button = document.createElement("div");
// collapsable_button.innerHTML = `<p><button class='btn btn-primary' type='button'  data-bs-toggle='collapse' data-bs-target='#collapseWidthExample' aria-expanded='false' aria-controls='collapseWidthExample' id="col_but">Draw</button></p><div style='min-height: 120px;'><div class='collapse collapse-horizontal' id='collapseWidthExample'><div class='card card-body' style='width: auto;background-color: transparent;'>${radio_buttons_innerHTML}</div></div></div>`;
const collapsable_button = document.createElement("div");

const radio_elements = document.getElementsByName("draw");
const collapse_button_draw = document.getElementById("col_but");
const cancel_button_innerHTML =
  "<button id='cancel_button'><svg  xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle-fill' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z'/></svg>Cancel</button>";

const draw_button_innerHTML =
  "   <button class='Btn' id='draw_button'>Draw<svg class='svg' viewBox='0 0 512 512'><path d='M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z'></path></svg></button>";

collapsable_button.innerHTML = `<p><input class='btn btn-primary' style='display:none;' checked='' name='col_but' type='checkbox' autocomplete='off' data-bs-toggle='collapse' data-bs-target='#collapseWidthExample' aria-expanded='false' aria-controls='collapseWidthExample' id='btn-check'><label class='btn btn-primary' for='btn-check'>Draw</label></input></p><div style='min-height: 120px;'><div class='collapse collapse-horizontal' id='collapseWidthExample'><div class='card card-body' style='width: auto;background-color: transparent;'>${radio_buttons_innerHTML}${draw_button_innerHTML}${cancel_button_innerHTML}</div></div></div>`;

button_containers.append(collapsable_button);

const cancel_button = document.getElementById("cancel_button");
const draw_button = document.getElementById("draw_button");

draw_button.addEventListener("click", () => {
  for (let i = 0; i < radio_elements.length; i++) {
    console.log(radio_elements[i].checked);
    ///

    ////
    if (
      radio_elements[i].checked == true &&
      radio_elements[i].value == "Polygon"
    ) {
      cancelF();
      console.log(radio_elements[i].value);
      drawVector(radio_elements[i].value);
    } else if (
      radio_elements[i].checked == true &&
      radio_elements[i].value == "LineString"
    ) {
      //draw_source.clear();
      cancelF();
      console.log(radio_elements[i].value);
      drawVector(radio_elements[i].value);
    } else if (
      radio_elements[i].checked == true &&
      radio_elements[i].value == "Point"
    ) {
      //draw_source.clear();
      cancelF();
      console.log(radio_elements[i].value);
      drawVector("MultiPoint");
    }
  }
});
function cancelF() {
  map.removeInteraction(draw_type);
}
cancel_button.addEventListener("click", () => {
  for (let i = 0; i < radio_elements.length; i++) {
    radio_elements[i].checked = false;
    draw_source.clear();
  }
});

function expo(geoExp) {
  var geoJSONString = JSON.stringify(geoExp, null, 2);

  // Create a Blob from the GeoJSON string
  var blob = new Blob([geoJSONString], { type: "application/json" });

  // Create a download link
  var downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = "your_geojson_file.geojson";

  // Append the download link to the document
  document.body.appendChild(downloadLink);

  // Trigger a click on the download link to start the download
  downloadLink.click();

  // Remove the download link from the document
  document.body.removeChild(downloadLink);
}
