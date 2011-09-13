/************************************************************************************************************
Form Input Slider
Copyright (C) 2005  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, Septebmer 2005
Owner of DHTMLgoodies.com


************************************************************************************************************/

var form_widget_amount_slider_handle = 'images/slider_handle.gif';
var slider_handle_image_obj = false;
var sliderObjectArray = new Array();
var slider_counter = 0;
var slideInProgress = false;
var handle_start_x;
var event_start_x;
var currentSliderIndex;
var sliderHandleWidth = 9;

function form_widget_cancel_event()
{
	return false;
}

function getImageSliderHeight(){
	if(!slider_handle_image_obj){
		slider_handle_image_obj = new Image();
		slider_handle_image_obj.src = form_widget_amount_slider_handle;
	}
	if(slider_handle_image_obj.width>0){
		return;
	}else{
		setTimeout('getImageSliderHeight()',50);
	}
}


function positionSliderImage(e,theIndex)
{

	if(!theIndex)theIndex = this.getAttribute('sliderIndex');
	var theValue = sliderObjectArray[theIndex]['formTarget'].value;
	if(!theValue.match(/^[0-9]*$/g))theValue=sliderObjectArray[theIndex]['min'] +'';
	if(theValue/1>sliderObjectArray[theIndex]['max'])theValue = sliderObjectArray[theIndex]['max'];
	if(theValue/1<sliderObjectArray[theIndex]['min'])theValue = sliderObjectArray[theIndex]['min'];
	sliderObjectArray[theIndex]['formTarget'].value = theValue;
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentValue = sliderObjectArray[theIndex]['formTarget'].value-sliderObjectArray[theIndex]['min'];
	handleImg.style.left = Math.round(currentValue * ratio) + 'px';
if(sliderObjectArray[theIndex]['onchangeAction']){
		eval(sliderObjectArray[theIndex]['onchangeAction']);
	}
}



function adjustFormValue(theIndex)
{
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentPos = handleImg.style.left.replace('px','');
	sliderObjectArray[theIndex]['formTarget'].value = Math.round(currentPos / ratio) + sliderObjectArray[theIndex]['min'];

}

function initMoveSlider(e)
{

	if(document.all)e = event;
	slideInProgress = true;
	event_start_x = e.clientX;
	handle_start_x = this.style.left.replace('px','');
	currentSliderIndex = this.id.replace(/[^\d]/g,'');
	return false;
}

function startMoveSlider(e)
{
	if(document.all)e = event;
	if(!slideInProgress)return;
	var leftPos = handle_start_x/1 + e.clientX/1 - event_start_x;
	if(leftPos<0)leftPos = 0;
	if(leftPos/1>sliderObjectArray[currentSliderIndex]['width'])leftPos = sliderObjectArray[currentSliderIndex]['width'];
	document.getElementById('slider_handle' + currentSliderIndex).style.left = leftPos + 'px';
	adjustFormValue(currentSliderIndex);
	if(sliderObjectArray[currentSliderIndex]['onchangeAction']){
		eval(sliderObjectArray[currentSliderIndex]['onchangeAction']);
	}
}

function stopMoveSlider()
{
	slideInProgress = false;
}

var sliderPreloadedImages = new Array();
sliderPreloadedImages[0] = new Image();
sliderPreloadedImages[0].src = form_widget_amount_slider_handle;

function form_widget_amount_slider(targetElId,formTarget,width,min,max,onchangeAction)
{
	if(!slider_handle_image_obj){
		getImageSliderHeight();
	}

	slider_counter = slider_counter +1;
	sliderObjectArray[slider_counter] = new Array();
	sliderObjectArray[slider_counter] = {"width":width - sliderHandleWidth,"min":min,"max":max,"formTarget":formTarget,"onchangeAction":onchangeAction};

	formTarget.setAttribute('sliderIndex',slider_counter);
	formTarget.onchange = positionSliderImage;// overwrites any onchange attribute of the slider value text box!
	var parentObj = document.createElement('DIV');


	parentObj.style.height = '12px';	// The height of the image
	parentObj.style.position = 'relative';
	parentObj.id = 'slider_container' + slider_counter;
	document.getElementById(targetElId).appendChild(parentObj);

	var obj = document.createElement('DIV');
	obj.className = 'form_widget_amount_slider';
	obj.innerHTML = '<span></span>';
	obj.style.width = width + 'px';
	obj.id = 'slider_slider' + slider_counter;
	obj.style.position = 'absolute';
	obj.style.bottom = '0px';
	parentObj.appendChild(obj);

	var handleImg = document.createElement('IMG');
	handleImg.style.position = 'absolute';
	handleImg.style.left = '0px';
	handleImg.style.zIndex = 5;
	handleImg.src = slider_handle_image_obj.src;
	handleImg.id = 'slider_handle' + slider_counter;
	handleImg.onmousedown = initMoveSlider;

	parentObj.style.width = obj.offsetWidth + 'px';

	if(document.body.onmouseup){
		if(document.body.onmouseup.toString().indexOf('stopMoveSlider')==-1){
			alert('You allready have an onmouseup event assigned to the body tag');
		}
	}else{
		document.body.onmouseup = stopMoveSlider;
		document.body.onmousemove = startMoveSlider;
	}
	handleImg.ondragstart = form_widget_cancel_event;
	parentObj.appendChild(handleImg);
	positionSliderImage(false,slider_counter);


}
