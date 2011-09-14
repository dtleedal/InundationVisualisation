//This file sets up the JSON data transfer from a text file in the application folder to a JS object
//The function uses the json2 parser which is more secure than the eval function


function getXMLHttpRequest()
{
  var request = false;
  if (window.XMLHttpRequest)
  {
    request = new XMLHttpRequest();
  } else {
  if (window.ActiveXObject)
  {
  try
     {
      request = new ActiveXObject("Msn12.XMLHTTP");
     }
  catch(err1)
     {
     try
        {
         request = new ActiveXObject("Microsoft.XMLHTTP");
        }
     catch(err2)
        {
         request = false;
        }
      }
   }
  }
return request;
}



function callAjax(fileName){
  myRequest.onreadystatechange = responseAjax;
  myRequest.open("GET","JSONdata/"+fileName, false);
  myRequest.send(null);
}

function responseAjax(){
  if(myRequest.readyState == 4){
    if(myRequest.status == 200){
     //myData2 = myRequest.responseText;
     //alert(myData2);
    } else {
       alert("error loading inundation data: " + myRequest.statusText);
    }
  }
}



//the getProb function takes the lat and long coordinates of the map marker as input,
//it checks to see if they are within the bounding area of the model domain. If not it places a zero in each
//element of the levelExProb array
//If it is within then it converts the lat long coords to an x,y array index into the inundationData matrix and extracts
//the 16 values and puts them in an array. These can then be sent to the google chart api for plotting.


//alert(inundation.swBounds[0] + " " + inundation.swBounds[1]);
function getProb(latPos,lngPos){
 var levelExProb = [];    

if (latPos<this.swBounds[0] || latPos>this.neBounds[0] || lngPos<this.swBounds[1] || lngPos>this.neBounds[1]){
       probVal = "outside range";
       probStr = 0;
       for (var i=1;i<16;i++){
         levelExProb[i-1] = 0;
       }
    } else {
       var latOffset = this.neBounds[0]-latPos;
       var lngOffset = Math.abs(lngPos-this.swBounds[1]);
//alert(this.neBounds[0] + " " + this.neBounds[1] + " " + this.swBounds[0] + " " + this.swBounds[1]);
       var latDif = this.neBounds[0]-this.swBounds[0];
       var lngDif = Math.abs(this.swBounds[1]-this.neBounds[1]);
       var latDivs = latDif/(this.nrows);
       var lngDivs = lngDif/(this.ncols);
       var latIndex = Math.ceil((latOffset+0.000000001)/latDivs);
       var lngIndex = Math.ceil((lngOffset+0.000000001)/lngDivs);
//alert(latIndex + " " + lngIndex + "  " + this.inundationData[latIndex][lngIndex]);    
  
       probVal = (this.inundationData[latIndex][lngIndex]*100).toFixed(0);
       probStr = probVal;
       for (var i=1;i<16;i++){
         eval("levelExProb[i-1] = (levelEx"+i+".inundationData[latIndex][lngIndex]*100).toFixed(0);");
       }
    }
//these are the things added to the inundation object
  this.latIndex = latIndex;
  this.lngIndex = lngIndex;
  this.probVal = probVal;
  this.probStr = probStr;
  this.latOffset = latOffset;
  this.lngOffset = lngOffset;

// get the depth probabilities
 
 
 this.levelExProb = levelExProb;
//alert(this.levelExProb);
}



//inundation.getProbs = getProb;

    

