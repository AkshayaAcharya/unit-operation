let dataArray = [];
let tempArray = [];
let recordedData = "";
let obsrOptions = "";
let expDataOptions = "";

let pipeLength = 100;
let nominalPipeDia = 10;
let actualPipeDia = 20;
let denityOfProcessFluid = 165;
let viscosityOfProcessFluid = 654;
let manometricFluidDensity = 546;
let processFluid = "Water";
let manometricFluid = "Carbon Tetrachloride";

let processFluidData = [
	{
		fluid: "Water",
		density: "1000",
		viscocity: 	"820"
	},
	{
		fluid: "Kerosene",
		density: "820",
		viscocity: 	"2.15"
	}
]
let manometricFluidData = [
	{
		name: "Carbon tetrachloride",
		density: "1600"
	},
	{
		name: "Mercury",
		density: "13600"
	}
]


let flowRate = 0;
let h1 = 0;
let h2 = 0;


let controlOK = false;
let enableSetup = false;
let motorStatus = false;


let evaluateEnable = false;
let evalNominalDia = null;
let evalProcessFluid = null;
let evalManometricFluid = null;


function showPopup(ele){
	if(ele.id == "setup") {
		document.getElementById("parentPopup").style.display = "block";
		setUp();
	} else {
		hideReading();
		if(ele.id == "expData"){
			if(enableSetup){
				document.getElementById("parentPopup").style.display = "block";
			  	experimatalData();
			} else {
				document.getElementById("added").innerHTML = "Go to Setup to set data";
			}
		}
		if(ele.id == "obsr"){
			if(enableSetup){
				document.getElementById("parentPopup").style.display = "block";
			  	observations();
			}else {
				document.getElementById("added").innerHTML = "Go to Setup to set data";
			}
		}
	}
    
}


function enableSttings(){
	document.getElementById("acr").classList.remove("locked");
	document.getElementById("expData").classList.remove("locked");
	document.getElementById("obsr").classList.remove("locked");
}

function disableSettings(){
	document.getElementById("acr").classList.add("locked");
  	document.getElementById("acr").classList.add("locked");
  	document.getElementById("acr").classList.add("locked");
}
function closeModal(ev){
    if(ev.target.className == "parentPopup" || ev.target.className == "close" || ev.target.className == "cancel" || controlOK == true) {
        controlOK = false;
        document.getElementById("parentPopup").style.display = "none";
		if(document.getElementById("canvas0").style.visibility !="visible"){
			showReading();
		}
    }
}

function goToMainPage(){
    document.getElementById("canvas0").style.visibility = "hidden";
    document.getElementById("canvas1").style.visibility = "visible";
    document.getElementById("nextButton").style.visibility = "hidden";
}

function setExperiment(){
    document.getElementById("canvas0").style.visibility = "hidden";
    document.getElementById("canvas1").style.visibility = "visible";
}

function setEvaluation(){
    document.getElementById("canvas0").style.visibility = "hidden";
    document.getElementById("canvas2").style.visibility = "visible";
}




viewOptionsSet = 
` <p>Length of the pipe : <input id="length" type="number" value="1" name="view" min="1" max="50" style="width:35px;" class="styleSelect" onchange="setLength(this)"/> meter</p>
<p>Nominal diameter of the pipe : 
	<select name="dia" id="nomDia" class="styleSelect" onchange="setNominalDia(this)">
		<option value="0.25">0.25 inch</option>
		<option value="0.50">0.50 inch</option>
		<option value="1.00">1.00 inch</option>
		<option value="1.50">1.50 inch</option>
	</select>
</p>
<p>Process fluid :
	<select name="proFluid" id="proFluid" class="styleSelect"  onchange="setProcessFluid(this)">
		<option value="Water">Water</option>
		<option value="Kerosene">Kerosene</option>
	</select>
</p>
<p>Manometric fluid : 
	<select name="manoFluid" id="manoFluid" class="styleSelect" onchange="setManometricFluid(this)">
		<option value="Carbon Tetrachloride">Carbon tetrachloride</option>
		<option value="Mercury">Mercury</option>
	</select>
</p>`;

function setUp(){
	document.getElementById("added").style.visibility="";
	document.getElementById("popUpContent").innerHTML = `
	<div class="viewContent">
	    ${viewOptionsSet}
		<p><input type="button" value="OK" onclick="setData()" /></p>
		<p id="alertView"></p>
	</div>`
}


function setData(){
	controlOK = true;
	enableSetup = true;
	showReading();
	enableSttings();
	observationDataUpdate();
	expDataOptions = 
	` <table style="font-size: 14px; font-family: verdana">
		<tr><td>Pipe Length : <span class="spanColor">${pipeLength}</span> meter(s)</td></tr>
		<tr><td>Nominal pipe diameter : <span class="spanColor">${nominalPipeDia}</span> inch</td></tr
		<tr><td>Actual pipe diameter : <span class="spanColor">${actualPipeDia}</span> m</td></tr>
		<tr><td>Process fluid : <span class="spanColor">${processFluid}</span></td></tr>
		<tr><td>Density of process fluid : <span class="spanColor">${denityOfProcessFluid}</span> kg/cubimc meter</td></tr>
		<tr><td>Viscocity of process fluid : <span class="spanColor">${viscosityOfProcessFluid}</span> centiPoise</td></tr>
		<tr><td>Manometric fluid : <span class="spanColor">${manometricFluid}</span></td></tr>
		<tr><td>Manometric fluid density: <span class="spanColor">${manometricFluidDensity}</span> kg/cubimc meter</td></tr>
	</table>`;
}
function showReading(){
	document.querySelectorAll('.reading').forEach(function(ele){
		ele.style.visibility= "visible";
	})
}
function hideReading(){
	document.querySelectorAll('.reading').forEach(function(ele){
		ele.style.visibility= "hidden";
	})
}

function setLength(ele){
	pipeLength = ele.value;
	console.log(pipeLength)
}

function setNominalDia(ele){
	nominalPipeDia = ele.value;
	console.log(nominalPipeDia)
}

function setProcessFluid(ele){
	processFluid = ele.value;
	console.log(processFluid)
}
function setManometricFluid(ele){
	manometricFluid = ele.value;
	console.log(manometricFluid);
}


function addReading()
{
	// controlOK = true;
	if(enableSetup){
		document.getElementById("added").innerHTML =`Added...</br>Click on "Observations"`;
		recordedData+=
		`<tr>
			<td class="obsTd">${processFluid}</td>
			<td class="obsTd">${manometricFluid}</td>
			<td class="obsTd">${flowRate}</td>
			<td class="obsTd">${h1}</td>
			<td class="obsTd">${h2}</td>
		</tr>
		`;
		
	} else {
		document.getElementById("added").innerHTML = "Go to Setup to set data";
	}
}


function observationDataUpdate(){
	actualPipeDia = nominalPipeDia * 39.37;
	processFluidData.find(function(fluid){
		if(fluid.fluid == processFluid){
			denityOfProcessFluid = fluid.density;
			viscosityOfProcessFluid = fluid.viscocity
		}
	})
	manometricFluidData.find(function(fluid){
		if(fluid.name == manometricFluid){
			manometricFluidDensity = fluid.density;
		}
	})
	
}


function experimatalData()
{
	observationDataUpdate();
	controlOK = true;
	document.getElementById("added").style.visibility="hidden";
	document.getElementById("popUpContent").innerHTML = `
		<div  class="heading">
			<p>Experimental Data </p>
		</div>
		<div class="viewContent" id="vContent" >
			${expDataOptions}
			<p><input type="button" value="OK" onclick="closeModal(event);" /></p>
			<p id="alertView"></p>
		</div>
    `
}


function observations()
{
	document.getElementById("added").style.visibility="hidden";
	document.getElementById("popUpContent").innerHTML = `
		<div class="heading" >
			<p>Observations </p>
		</div>
		<div class="observationContent">
			<table id="obsTable">
			<thead>
			<tr>
				<td class="obsTd">Process fuild</td>
				<td class="obsTd">Manometric fluid</td>
				<td class="obsTd">Flow rate (Litre per minute)</td>
				<td class="obsTd">h1 (cm of Manometric fluid)</td>
				<td class="obsTd">h2 (cm of Manometric fluid)</td>
			</tr>
			</thead>
			<tbody id="obsBody" style="color: white">
				${recordedData}
			</tbody>
		</table>
			<p><input type="button" value="Clear"  onclick="clearObservation()"/> 
			<input type="button" style="width:150px" value="Restart Experiment" onclick="resetExperiment()" /></p>
			<p id="alertView"></p>
		</div>
    `
}

function resetExperiment()
{
	hideReading();
	controlOK = true;
	document.getElementById("canvas1").style.visibility = "hidden";
	document.getElementById("canvas2").style.visibility = "hidden";
	document.getElementById("canvas0").style.visibility = "visible";
}

function clearObservation(){
	recordedData = "";
	controlOK = false;
	observations();
}



//For Evaluation experiment
function setTableRow(ele){
    let row = "";
    dataArray = [];
    tempArray = [];
    for(let i=0; i<ele.value; i++){
        row += `
        <tr id=${'td'+i}>
            <td>${i+1}</td>
            <td><input type="text" oninput = "checkForValidity(this)"/></td>
            <td><input type="text" oninput = "checkForValidity(this)"/></td>
            <td><input type="text" oninput = "checkForValidity(this)"/></td>
            <td><input type="text" oninput = "checkForValidity(this)"/></td>
            <td></td>
            <td></td>
        </tr>
        `
    }
    document.getElementById("userData").innerHTML  = row;
}


function checkForValidity(ele){
	ele.value = ele.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}
function table_to_array() {
    dataArray = [];
    tempArray = [];
    $("table#dataTable tr").each(function() {
        let arrayOfThisRow = [];
        let count = 0;
        let tableData = $(this).find('td');
        tableData.each(function() { 
            let data = Number($(this).find("input").val());
			count = count + 1;
            if(!isNaN(data) && data!=null){
					arrayOfThisRow.push(data);
            } else {
				if(count == 6){
					let result = arrayOfThisRow[0]+arrayOfThisRow[1]+arrayOfThisRow[2]+arrayOfThisRow[3];
					arrayOfThisRow.push(result);
				}
                else if(count == 7){
				    let result = (arrayOfThisRow[0]+arrayOfThisRow[1]+arrayOfThisRow[2]+arrayOfThisRow[3])*10;
                    arrayOfThisRow.push(result);
                }
			}
        });
        tempArray.push(arrayOfThisRow);
    });
    dataArray = tempArray.slice(2);
    setResultTable();
}

function setResultTable(){
    let row = "";
    for(let i=0; i<dataArray.length; i++){
        row += `
        <tr id=${'td'+i}>
            <td>${i+1}</td>
            <td><input type="text" value = ${dataArray[i][0]} oninput = "checkForValidity(this)"/></td>
            <td><input type="text" value = ${dataArray[i][1]} oninput = "checkForValidity(this)"/></td>
            <td><input type="text" value = ${dataArray[i][2]} oninput = "checkForValidity(this)"/></td>
            <td><input type="text" value = ${dataArray[i][3]} oninput = "checkForValidity(this)"/></td>
            <td>${dataArray[i][4]}</td>
            <td>${dataArray[i][5]}</td>
        </tr>
        `
    }
    document.getElementById("userData").innerHTML  = row;
}


//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}


function valveRotate(ele){
	document.getElementById("valve").style.WebkitTransform = "rotate("+ele.value+"deg)"; 
	// Code for IE9
   document.getElementById("valve").style.msTransform = "rotate("+ele.value+"deg)";
	// Standard syntax
   document.getElementById("valve").style.transform = "rotate("+ele.value+"deg)";
//    document.getElementById("valve").style.animation = "rotation 0.5s forwards";
}

let img = $('#valve');
let downSet = false;
if(img.length > 0){
	let offset = img.offset();
	function mouse(evt){
		evt.preventDefault();
		if(downSet == true && motorStatus) {
			let center_x = (offset.left) + (img.width()/2);
			let center_y = (offset.top) + (img.height()/2);
			let mouse_x = evt.pageX; let mouse_y = evt.pageY;
			let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
			let degree = (radians * (180 / Math.PI) * -1) + 90; 
			img.css('-moz-transform', 'rotate('+degree+'deg)');
			img.css('-webkit-transform', 'rotate('+degree+'deg)');
			img.css('-o-transform', 'rotate('+degree+'deg)');
			img.css('-ms-transform', 'rotate('+degree+'deg)');
			console.log(Math.floor(degree));
		}
	}
}

function enableMove(event){
	event.preventDefault();
	downSet = true;
}

function disableMove(event){
	event.preventDefault();
	downSet = false;
}

function motorOn(ele){
	downSet=false;
	motorStatus = !motorStatus;
	let source = motorStatus == true ? "./images/off.png" : "./images/on.png";
	let url = motorStatus == true ? "url('./images/wave2.png')" : "url('./images/static.png')";
	ele.src = source;
	document.getElementsByClassName("tank")[0].style.backgroundImage = url;
	document.getElementById("needle").style.animation = "needleMoveUp 1s forwards"
	makeItRain(motorStatus);
}

var makeItRain = function(motorStatus) {
	if(motorStatus) {
		  //clear out everything
		$('.rain').empty();
		$('.rain2').empty();
		var increment = 0;
		var drops = "";
		var backDrops = "";
		while (increment < 1000) {
		  var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
		  //random number between 5 and 2
		  var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
		  //increment
		  increment += randoFiver;
		  //add in a new raindrop with various randomizations to certain CSS properties
		  drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
		  
			backDrops += '<div class="drop2" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
		}
		$('.rain.first-row').append(drops);
		$('.rain2.second-row').append(backDrops);
	} else {
		$('.rain').empty();
		$('.rain2').empty();
	}
}

function evaluateSetup(){
	evalNominalDia = document.getElementById("evalNominalDia").value;
	evalProcessFluid= document.getElementById("evalProcessFluid").value;
	evalManometricFluid = document.getElementById("evalManometricFluid").value;
	evaluateEnable = (evalManometricFluid!=null && evalNominalDia !=null && evalProcessFluid!=null) ? true : false;
	evaluateEnable == true ?(
		document.getElementById("reading").disabled = false,
		document.getElementById("eval").disabled = false
	) : (
		document.getElementById("reading").disabled = true,
		document.getElementById("eval").disabled = true
	)
}