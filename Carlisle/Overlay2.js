
 oldIndex = 0;//set up a global value for the first overlay to erase
 oldDepthIndex = 0; 
 probIncrement = 4;//the increment in the probability to make more or fewer overlay objects (min 1) 
 MexOverlay.prototype = new google.maps.OverlayView();
 google.maps.event.addDomListener(window,'load', initialize);






  function initialize() {
    countOverlays = 0;
    var loadDiv = document.getElementById("loadingAnimation");//the div for the 'loading' text
    //load the inundation probabilities into a set of matrices
    myRequest = getXMLHttpRequest();
    callAjax("JSONfile1.txt");
    inundation = JSON.parse(myRequest.responseText);
    inundation.getProbs = getProb;
    for (var i=1;i<16;i++){
      callAjax("levelEx"+i+".txt");
      eval("levelEx"+i+" = JSON.parse(myRequest.responseText);");
    }

// JSON data gathering functions should have been run inorder to get inundation object into memory
// get the bounds from the inundation object
   
   
// these are the old bounds not used any more but kept incase needed    
    var swBound = new google.maps.LatLng(54.883328, -2.960299);
    var neBound = new google.maps.LatLng(54.911061,  -2.886389);
//these are the new bounds for the new carlisle overlays done in grass
    var swBoundsGrass = new google.maps.LatLng(inundation.swBounds[0],inundation.swBounds[1]);
    var neBoundsGrass = new google.maps.LatLng(inundation.neBounds[0],inundation.neBounds[1]);
    var boundsGrass = new google.maps.LatLngBounds(swBoundsGrass, neBoundsGrass);
    var bounds = new google.maps.LatLngBounds(swBound, neBound);
    //var myLatLng = bounds.getCentre();
    var myLatLng = new google.maps.LatLng(54.8973945, -2.9233325);
    var myOptions = {
      zoom: 14,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
 
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
    google.maps.event.trigger(map, 'resize');//fire a resize event
    map.setZoom( map.getZoom() );
 
    var markA = new google.maps.Marker({position: myLatLng, map: map, title:"point picker", draggable: true});
    var contentsStringOnload = '<div id="disclaimerText"><b>Welcome!</b><br>Use the control in the top panel<br>'+
                        'to change map overlays.<br>'+
                        'Use this marker to view the data at<br>'+
                        'a specific point</div>';  
    
    var infowindow = new google.maps.InfoWindow();
    infowindow.close();
    infowindow.setContent(contentsStringOnload);
    infowindow.setOptions({maxWidth:2000});
    infowindow.open(map, markA);
					



       google.maps.event.addListener(markA, 'click', function() {
       
       infowindow.open(map, markA);
       var contentSet = markA.getPosition();
       var lngPos = contentSet.lng();
       var latPos = contentSet.lat();
       inundation.getProbs(latPos,lngPos);
       contentText = '<div id="disclaimerText">lat = ' + latPos.toFixed(3) + 
                     ' lng = ' + lngPos.toFixed(3) + 
                     '<br>' + 'Larger inundation likelihood: ' +
                     inundation.probVal + '%' +
                     '<br>' + '<b>Likelihood of depth ' +
                                  'being exceeded</b><br>' +
                      '<img src="http://chart.apis.google.com/chart?chs=210x110&cht=lc&chxt=x,x,y,y&chxr=0,0,150,25|2,0,100,20&chxl=1:|depth(cm)|3:|prob&chxp=1,50|3,50&chco=FF0000&chds=0,100&chd=t:'+inundation.probStr+','+inundation.levelExProb+'&chg=25,20,5,2&chls=2&chma=5,5,5,5" width="220" height="110"/></div>';
       infowindow.setContent(contentText);
      infowindow.setOptions({maxWidth:2000});
    }); 
google.maps.event.addListener(markA, 'drag', function() {
       var contentSet = markA.getPosition();
       var lngPos = contentSet.lng();
       var latPos = contentSet.lat();
       inundation.getProbs(latPos,lngPos);
       contentText = '<div id="disclaimerText">lat = ' + latPos.toFixed(3) + 
                     ' lng = ' + lngPos.toFixed(3) + 
                     '<br>' + 'Larger inundation likelihood: ' +
                     inundation.probVal + '%' +
                     '<br>' + '<b>Likelihood of depth ' +
                                  'being exceeded</b><br>' +
                      '<img src="http://chart.apis.google.com/chart?chs=210x110&cht=lc&chxt=x,x,y,y&chxr=0,0,150,25|2,0,100,20&chxl=1:|depth(cm)|3:|%&chxp=1,50|3,50&chco=FF0000&chds=0,100&chd=t:'+inundation.probStr+','+inundation.levelExProb+'&chg=25,20,5,2&chls=2&chma=5,5,5,5" width="220" height="110"/></div>';
       infowindow.setContent(contentText);
        infowindow.setOptions({maxWidth:2000});    
    }); 
google.maps.event.addListener(map, 'click', function(myEvent){ 
       //document.getElementById('myTab').tabber.tabShow(1);
       markA.setPosition(myEvent.latLng)// now process myClickLatLng 
       var lngPos = myEvent.latLng.lng();
       var latPos = myEvent.latLng.lat();
       
       
       inundation.getProbs(latPos,lngPos);
       contentText = '<div id="disclaimerText">lat = ' + latPos.toFixed(3) + 
                     ' lng = ' + lngPos.toFixed(3) + 
                     '<br>' + 'Larger inundation likelihood: ' +
                     inundation.probVal + '%' +
                     '<br>' + 'Likelihood of depth ' +
                                  'being exceeded</b><br>' +
                     '<img src="http://chart.apis.google.com/chart?chs=220x110&cht=lc&chxt=x,x,y,y&chxr=0,0,150,25|2,0,100,20&chxl=1:|depth(cm)|3:|%&chxp=1,50|3,50&chco=FF0000&chds=0,100&chd=t:'+inundation.probStr+','+inundation.levelExProb+'&chg=25,20,5,2&chls=2&chma=5,5,5,5" width="220" height="110"/></div>';
       infowindow.setContent(contentText);
       infowindow.setOptions({maxWidth:2000});
     }); 
    // probability png's generated in python
   // srcImage =    ['5thPercentile.png','10thPercentile.png','20thPercentile.png','30thPercentile.png','40thPercentile.png','50thPercentile.png','60thPercentile.png','70thPercentile.png','80thPercentile.png','90thPercentile.png','95thPercentile.png','testKMLOverlay.png'];
    //var srcImageArray = "";
    //var overlayText = 0;
    
    overlay = new Array(100);
    allOverlay = new Array(16); 
    for (var whichDepth = 1; whichDepth<17; whichDepth++){
       var folderName = ((whichDepth-1)*10)+"cm/";
       overlay[whichDepth-1] = new Array(100);
       for (whichPercentile = 0; whichPercentile<100; whichPercentile=whichPercentile+probIncrement){
           
           
           
           overlay[whichDepth-1][whichPercentile] = new MexOverlay(boundsGrass, imageOverlay[whichDepth-1][whichPercentile].src, map);
           
        }
      allOverlay[whichDepth-1] = new MexOverlay(boundsGrass, imageAllOverlay[whichDepth-1].src, map);
    
    
 
    }
   
 
 
   initialized=1;
   
   if (map){switchOffAnimation()}
   
  }
 

  function MexOverlay(bounds, image, map) {
 
    // Now initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
 
    // We define a property to hold the image's
    // div. We'll actually create this div
    // upon receipt of the add() method so we'll
    // leave it null for now.
    this.div_ = null;
 
    // Explicitly call setMap on this overlay
    this.setMap(map);
    return true
  }
 
  MexOverlay.prototype.onAdd = function() {
 
    // Note: an overlay's receipt of add() indicates that
    // the map's panes are now available for attaching
    // the overlay to the map via the DOM.
 
    // Create the DIV and set some basic attributes.
    var div = document.createElement('DIV');
    div.style.border = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";
 
    // Create an IMG element and attach it to the DIV.
    var img = document.createElement("img");
    img.src = this.image_;
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);
    // this sets the on load visibility to hidden   
    div.style.visibility = "hidden";
    // Set the overlay's div_ property to this DIV
    this.div_ = div;
 
    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the overlayImage pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div_);
    return true
  }
 
  MexOverlay.prototype.draw = function() {
 
    // Size and position the overlay. We use a southwest and northeast
    // position of the overlay to peg it to the correct position and size.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();
 
    // Retrieve the southwest and northeast coordinates of this overlay
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to resize the DIV.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
 
    // Resize the image's DIV to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
    return true
    
  }
 
  MexOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
  }
 
  // Note that the visibility property must be a string enclosed in quotes
  MexOverlay.prototype.hide = function() {
    if (this.div_) {
      this.div_.style.visibility = "hidden";
    }
  }
 
  MexOverlay.prototype.show = function() {
    if (this.div_) {
      this.div_.style.visibility = "visible";
    }
  return true
  }
 
  MexOverlay.prototype.toggle = function() {
    if (this.div_) {
      if (this.div_.style.visibility == "hidden") {
        this.show();
      } else {
        this.hide();
      }
    }
  }
 
  MexOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
      this.setMap(null);
    } else {
      this.setMap(this.map_);
    }
  }

// function to switch off loading animation
function switchOffAnimation(){
    
    var el2Id=document.getElementById("loadingText");
    
    el2Id.style.visibility = "hidden";
}

