initialized=0;

numOfCategories = 11;
probCats = [0,7.5,15,25,35,45,55,65,75,85,92.5,100];//new Array(numOfCategories);
probStrings = ['5%','10%','20%','30%','40%','50%','60%','70%','80%','90%','95%','all'];
definitionStrings = ['The return period is the average amount of time in years that you would expect a flood of a particular size to occur once. For example a flood with a return period of 100 years would be expected to occur 10 times in a century. It is very important to realise that this does not mean that if a flood with a return period has just happened that there will definitely not be another one for 100 years. Also the accuracy with which the return period can be calculated is not perfect so there is always some degree of uncertainty in this value',
'Likelihoods can be expressed as percentage values. Here an expression such as "80% chance that the 100 year flood will be larger than that shown..." means the study that estimated the size of the 100 year flood found that 80% (or 8 out of 10) of the acceptable computer simulation results showed a flood larger than the flood shown on the map.',
'This webpage shows that flood extent forecasting can never be exact. This is because flood forecasting is based on computer estimates of what might happen during a real flood. One way to communicate the range of possibilities for what might happen is to  specify the chance that a flood will be bigger than the one shown on the map. For example a likelihood of exceedance of 20% means that the computer simulation estimates that the 100 year flood has a 20% (or 1 in 5) chance of being bigger than the one shown on the map.'];
 
/*for (i=0; i<=numOfCategories; i++){
	probCats[i]=100/numOfCategories*i;
}*/
// set the initial overlay to 1
presentOverlay = 6;
showAllInundationState=0;


// pick the text for the definition
function showDefinition(){
 var pick = document.forms[1].selectList.value; 
  document.f.definitionTextArea.value = definitionStrings[pick];
}



function showAllInundation(){
el=document.getElementById("allProbLegend");
pt=document.getElementById("probText");
ps=document.getElementById("slider")//ps=document.getElementById("slider_target");
pb=document.getElementById("probBox");
 if (showAllInundationState==0){
  
  document.forms[1].showAll.value="show single";
  showAllInundationState=1;
  el.style.visibility = "visible";
  pt.style.visibility = "hidden";
  ps.style.visibility = "hidden";
  pb.style.visibility = "hidden";
 
  overlay[oldDepthIndex][oldIndex].hide();
  chooseOverlay();
  //set the text for the legend
  //<div id="allProbLegend">
   //<script type="text/javascript">
     
   //</script>
  
  //</div>
  
  }else{
  //document.forms[0].outputText.value = "This figure shows a colour code of all the inundation possibilities defined by the study with the red colours showing the flood extent that is most likely to be exceeded and the blue colours showing the flood extent that is least likely to be exceeded."
  //document.forms[0].showAll.value="show all";
  showAllInundationState=0;  
  el.style.visibility = "hidden";
  pt.style.visibility = "visible";
  ps.style.visibility = "visible";
  pb.style.visibility = "visible";
  allOverlay[oldDepthIndex].hide();
  document.forms[1].showAll.value="show all";
  chooseOverlay();
  }


}


function chooseOverlay(){


var formObj = document.forms[1];
var inundationProb = formObj.inundationProb.value.replace(/[^\d]/,'');
var newOverlayIndex = parseFloat(inundationProb);//removed -1 from the end of this line
var whichDepth = formObj.whichDepth.value.replace(/[^\d]/,'');
var newDepthIndex = Math.round(whichDepth/10);

if (showAllInundationState==0){
  overlay[oldDepthIndex][oldIndex].hide();
  overlay[newDepthIndex][newOverlayIndex].show();
  if(inundationProb/1>100)inundationProb=100;
  if(inundationProb==100)inundationProb=99.9;//allow typed in input of 100 to be recognised
  for (i=1; i<=numOfCategories; i++){
    if (inundationProb>=probCats[i-1] && inundationProb<probCats[i]){
	presentOverlay=i;
    }
       if (inundationProb>100 && inundationProb<0) presentOverlay=12;		
   }
//document.forms[0].whichOverlay.value = inundationProb + "%";	
	
 
 

 
if (initialized==1){


if (presentOverlay==1){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be very unlucky but still possible for the 1%AEP event to be as large as this";
}

if (presentOverlay==2){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be very unlucky but still possible for the 1%AEP event to be as large as this";
}

if (presentOverlay==3){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be unlucky but still possible for the 1%AEP event to be of this size";
}
if (presentOverlay==4){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be unlucky but still possible for the 1%AEP event to be of this size";
}

if (presentOverlay==5){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be a little unlucky but quite possible for the 1%AEP event to be of this size";
}

if (presentOverlay==6){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore there is an even chance for the 1%AEP event to be smaller or larger than this size";
}

if (presentOverlay==7){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be a bit lucky but quite possible for the 1%AEP event to be of this size";
}

if (presentOverlay==8){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be quite lucky but still possible for the 1%AEP event to be of this size";
}

if (presentOverlay==9){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be quite lucky but still possible for the 1%AEP event to be of this size";
}

if (presentOverlay==10){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be very lucky but still possible for the 1%AEP event to be as small as this";
}

if (presentOverlay==11){

document.forms[1].outputText.value = inundationProb + "% chance that the 1%AEP event will exceed " + document.forms[1].whichDepth.value + "cm outside the blue area. Therefore it would be very lucky but still possible for the 1%AEP event to be as small as this";
}

if (presentOverlay==12){



document.forms[1].outputText.value = "This figure shows a colour code of all the regions where the inundation is likely to exceed " + document.forms[1].whichDepth.value + "cm. Where red is most likely and blue is least likely.";
}
}
 } else {
  allOverlay[oldDepthIndex].hide();
  allOverlay[newDepthIndex].show();
  stringToWrite = 'Likelihood of<br>depth exceeding ' + document.forms[1].whichDepth.value + 'cm<br>';
  document.getElementById("allProbLegendText").innerHTML = stringToWrite;
  document.forms[1].outputText.value = "This figure shows a colour code of all the regions where the inundation is likely to exceed " + document.forms[1].whichDepth.value + "cm. Where red is most likely and blue is least likely.";
  }
 oldIndex = newOverlayIndex;
 oldDepthIndex = newDepthIndex;
//switch for show all button
//document.forms[0].showAll.value="show all";
//showAllInundationState=0;
//el=document.getElementById("allProbLegend");
//el.style.visibility = "hidden";

}
