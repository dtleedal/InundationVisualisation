initialized=0;


//This set of variables is used to link a probability of exceedence with a descriptive string. If the chosen probability of exceedence is in a specific category
//then the appropriate string is displayed
numOfCategories = 11;
probCats = [0,7.5,15,25,35,45,55,65,75,85,92.5,100];//new Array(numOfCategories);
probStrings = ['5%','10%','20%','30%','40%','50%','60%','70%','80%','90%','95%','all'];

 
/*for (i=0; i<=numOfCategories; i++){
	probCats[i]=100/numOfCategories*i;
}*/
// set the initial overlay to 6
presentOverlay = 6;
showAllInundationState=0;


// pick the text for the definition
function showDefinition(){
 var pick = document.forms[0].selectList.value; 
  document.f.definitionTextArea.value = definitionStrings[pick];
}



function showAllInundation(){
    el=document.getElementById("allProbLegend");
    pt=document.getElementById("probText");
    ps=document.getElementById("slider")//ps=document.getElementById("slider_target");
    pb=document.getElementById("probBox");
    if (showAllInundationState==0){
  
        document.forms[0].showAll.value="show single";
        showAllInundationState=1;
        el.style.visibility = "visible";
        pt.style.visibility = "hidden";
        ps.style.visibility = "hidden";
        pb.style.visibility = "hidden";
 
        overlay[oldDepthIndex][oldIndex].hide();
        chooseOverlay();
  
    }else{
  
        showAllInundationState=0;  
        el.style.visibility = "hidden";
        pt.style.visibility = "visible";
        ps.style.visibility = "visible";
        pb.style.visibility = "visible";
        allOverlay[oldDepthIndex].hide();
        document.forms[0].showAll.value="show all";
        chooseOverlay();
    }


}


function chooseOverlay(){


    var formObj = document.forms[0];
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
        
        
     
     

     
      if (initialized==1){


        if (presentOverlay==1){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be very unlucky but still possible for the 100 year flood to be as large as this";
        }

        if (presentOverlay==2){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be very unlucky but still possible for the 100 year flood to be as large as this";
        }

        if (presentOverlay==3){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be unlucky but still possible for the 100 year flood to be of this size";
        }
        if (presentOverlay==4){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be unlucky but still possible for the 100 year flood to be of this size";
        }

        if (presentOverlay==5){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it    would be a little unlucky but quite possible for the 100 year flood to be of this size";
        }

        if (presentOverlay==6){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore there is an even chance for the 100 year flood to be smaller or larger than this size";
        }

        if (presentOverlay==7){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be a bit lucky but quite possible for the 100 year flood to be of this size";
        }

        if (presentOverlay==8){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be quite lucky but still possible for the 100 year flood to be of this size";
        }

        if (presentOverlay==9){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be quite lucky but still possible for the 100 year flood to be of this size";
        }

        if (presentOverlay==10){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be very lucky but still possible for the 100 year flood to be as small as this";
        }

        if (presentOverlay==11){

            document.forms[0].outputText.value = inundationProb + "% chance that the 100 year flood will exceed " + document.forms[0].whichDepth.value + "cm outside the blue area. Therefore it would be very lucky but still possible for the 100 year flood to be as small as this";
        }

        if (presentOverlay==12){



            document.forms[0].outputText.value = "This figure shows a colour code of all the regions where the inundation is likely to exceed " + document.forms[0].whichDepth.value + "cm. Where red is most likely and blue is least likely.";
        }
     }
     } else {
        allOverlay[oldDepthIndex].hide();
        allOverlay[newDepthIndex].show();
        stringToWrite = 'Likelihood of<br>depth exceeding ' + document.forms[0].whichDepth.value + 'cm<br>';
        document.getElementById("allProbLegendText").innerHTML = stringToWrite;
        document.forms[0].outputText.value = "This figure shows a colour code of all the regions where the inundation is likely to exceed " + document.forms[0].whichDepth.value + "cm. Where red is most likely and blue is least likely.";
     }
     oldIndex = newOverlayIndex;
     oldDepthIndex = newDepthIndex;
    //switch for show all button
    //document.forms[0].showAll.value="show all";
    //showAllInundationState=0;
    //el=document.getElementById("allProbLegend");
    //el.style.visibility = "hidden";

}
