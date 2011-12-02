//preload images
oldDepthIndex = 0; 
//probIncrement = 1;//the increment in the probability to make more or fewer overlay objects (min 1) 
oldIndex = 15;//set up a global value for the first overlay to erase
loadingPicture = new Image();
loadingPicture.src = "ajax-loader.gif";//pre load the animated gif for the loading screen

var srcImageArray = "";
    var overlayText = 0;
    
    imageOverlay = new Array(100);
    imageAllOverlay = new Array(16); 
    for (var whichDepth = 1; whichDepth<17; whichDepth++){
       var folderName = ((whichDepth-1)*10)+"cm/";
       imageOverlay[whichDepth-1] = new Array(100);
       for (var whichPercentile=5; whichPercentile<96; whichPercentile=whichPercentile+probIncrement){
           
           overlayText = whichPercentile + 1;
           imageOverlay[whichDepth-1][whichPercentile] = new Image();
           srcImageArray = folderName + overlayText + "thPercentile.png";
           imageOverlay[whichDepth-1][whichPercentile].src = srcImageArray;
           
           
        }
       imageAllOverlay[whichDepth-1] = new Image();
       imageAllOverlay[whichDepth-1].src = folderName+"allProbs.png";
    
    
 
    }


