////////////////////////////////////////////////////////////////////////////////
// jDate v1.0
// Creates dropdowns calendars for any input with class "jDate"
// Also includes date formatting function jDateFormat().
//
// jDateFormat usage:
// jDateFormat([year],[month],[day],[format]);
//
// [year] = 4 digit year
// [month] = Numeric representation of month (0-11)
// [day] = Numeric representation of day (1-31)
// [format] = Output date format, example "m/d/Y".  Note that most common php
//				values are used for format.
//
// The function will then do a regex replace on the format string, replacing the
// appropriate value for any variables.
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// jDate Options: Do not change these here.  Make changes inline in parent code.
////////////////////////////////////////////////////////////////////////////////

var jDate_options = new Array();
jDate_options['header'] = "F, Y";
jDate_options['format'] = "Y-m-d";

function jDateFormat(y_in,m_in,d_in,format){
	var days_short = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	var days_short_iso = new Array("Mon","Tue","Wed","Thu","Fri","Sat","Sun");
	var days_full = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var days_full_iso = new Array("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday");
	var months_short = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var months_full = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var output = format;
	m_in++;
	var date = new Date(m_in+"/"+d_in+"/"+y_in);
	var regex_patterns = new Array();
	regex_patterns.push(['d', ( "0" + String( date.getDate() ) ).slice(-2) ]);		// day of month, 2 digit, leading zeros
	regex_patterns.push(['j',date.getDate()]);										// day of month, no leading zeros
	regex_patterns.push(['Y',date.getFullYear()]);									// full year ( 4 digits, until the year 10000)
	regex_patterns.push(['y', ( "0" + String( date.getFullYear() ) ).slice(-2) ]);	// 2 digit version of year
	regex_patterns.push(['m', ( "0" + String( date.getMonth()+1) ).slice(-2) ]);		// 2 digit month, leading zeros
	regex_patterns.push(['n',date.getMonth()+1]);									// month number, no leading zeros
	regex_patterns.push(['w', date.getDay() ]);										// numeric day of week, 0 - 6
	regex_patterns.push(['D', days_short[date.getDay()] ]);							// text day of week, 3 letters
	regex_patterns.push(['l', days_full[date.getDay()] ]);							// text day of week, full name
	regex_patterns.push(['N', days_full_iso[date.getDay()] ]);						// text day of week, full name
	regex_patterns.push([new RegExp("F[^e]","g"), months_full[date.getMonth()] ]);						// month name, full
	regex_patterns.push([new RegExp("M[^a]","g"), months_short[date.getMonth()] ]);						// month name, 3 letter
	for ( var p in regex_patterns ){
		output = output.replace(regex_patterns[p][0],regex_patterns[p][1]);
	}
	return(output);
}

////////////////////////////////////////////////////////////////////////////////
// jDate: This function appends the calendars to inputs.
// Classes Used:
//
// .jDate_inputWrapper - div that wraps the input and the calendar
// .jDatePickerCalendar - div that contains the calendar
//
////////////////////////////////////////////////////////////////////////////////

function jDate(id,m,y,format){

	use_id = id+"_jDatePicker";

	var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

	if ( isNaN(parseInt(m)) ){
		var d = new Date();var m = d.getMonth();
	}
	if ( isNaN(parseInt(y)) ){
		var d = new Date();var y = d.getFullYear();
	}

	if ( format == undefined || format == "" ){
		format = jDate_options['format'];
	}

	if ( m >= 12 ){
		m = 0;
		y++;
	}
	else if ( m < 0 ){
		m = 11;
		y--;
	}

	var fDay = new Date(y, m, 1, 0, 0, 0).getDay();
	var mDays = new Date(y, (m+1), 0).getDate();


	if ( !document.getElementById(use_id) ){

		var el = document.getElementById(id);
		var wrapper = document.createElement('div');
		wrapper.setAttribute("class","jDate_inputWrapper");
		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);

		var container = document.createElement("div");
			container.id = use_id;
		document.getElementById(id).parentNode.appendChild(container);

		document.getElementById(id).setAttribute("onfocus","document.getElementById('"+use_id+"').style.display='block';");
		document.getElementById(use_id).setAttribute("onmouseleave","document.getElementById('"+use_id+"').style.display='none';document.getElementById('"+id+"').blur();");
	}
	else {
		document.getElementById(use_id).innerHTML = "";
	}

	document.getElementById(use_id).setAttribute("class","jDatePickerCalendar");

	var t = document.createElement("table");
		var tr = document.createElement("tr");
			var th = document.createElement("th");
				var a = document.createElement("a");
					a.innerHTML = "<";
					a.href = "javascript:void(0);";
					a.setAttribute("onclick","jDate('"+id+"',"+parseInt(m-1)+","+y+");");
				th.appendChild(a);
			tr.appendChild(th);
			var th = document.createElement("th");
				th.innerHTML = jDateFormat(y,m,1,jDate_options['header']);
				th.setAttribute("colspan","5");
			tr.appendChild(th);
			var th = document.createElement("th");
				var a = document.createElement("a");
					a.innerHTML = ">";
					a.href = "javascript:void(0);";
					a.setAttribute("onclick","jDate('"+id+"',"+parseInt(m+1)+","+y+");");
				th.appendChild(a);
			tr.appendChild(th);
		t.appendChild(tr);

		var tr = document.createElement("tr");
		for ( x = 0 ; x < fDay ; x++ ){
			var td = document.createElement("td");
			td.innerHTML = "&nbsp;";
			tr.appendChild(td);
		}
		var z = 1;
		while ( x <= 6 ){
			var td = document.createElement("td");

				var a = document.createElement("a");
					a.innerHTML = z;
					a.href = "javascript:void(0);";
					a.setAttribute("onclick","document.getElementById('"+id+"').value = jDateFormat("+y+","+m+","+z+",'"+format+"');");
				td.appendChild(a);

			tr.appendChild(td);
			x++;z++;
		}
	t.appendChild(tr);
		var wd = 0;
		while ( z <= mDays ){
			var tr = document.createElement("tr");
			while ( wd <= 6 && z<= mDays ){
				var td = document.createElement("td");
					var a = document.createElement("a");
						a.innerHTML = z;
						a.href = "javascript:void(0);";
						a.setAttribute("onclick","document.getElementById('"+id+"').value = jDateFormat("+y+","+m+","+z+",'"+format+"');");
					td.appendChild(a);
				tr.appendChild(td);
				wd++;z++;
			}
			while ( wd <= 6 && z > mDays ){
				var td = document.createElement("td");
				td.innerHTML = "&nbsp;";
				tr.appendChild(td);
				wd++;
			}

			wd = 0;
			t.appendChild(tr);
		}
	document.getElementById(use_id).appendChild(t);
}

////////////////////////////////////////////////////////////////////////////////
// This function injects the minimum css needed for the calendars
////////////////////////////////////////////////////////////////////////////////

function jDate_injectCSS(){
	var i = document.createElement("style");
	i.type = 'text/css';
	document.head.appendChild(i);
	var d = document.styleSheets[document.styleSheets.length-1];
	d.insertRule('div.jDatePickerCalendar {display:none;position:relaitve;width: auto;height: auto;clear:both;z-index:9999;background-color: #eee;}',d.cssRules.length);
	d.insertRule('div.jDatePickerCalendar table {width: 100%;border:1px solid #eee;}',d.cssRules.length);
	d.insertRule('div.jDatePickerCalendar table td{background-color: #fff;text-align: center;line-height: 11px;padding: 2px 4px;}',d.cssRules.length);
	d.insertRule('div.jDatePickerCalendar table td a,div.jDatePickerCalendar table th,div.jDatePickerCalendar table th a{font-size: 11px;text-decoration: none;color: #333;}',d.cssRules.length);
	d.insertRule('div.jDatePickerCalendar table td a:hover{text-decoration:underline;}',d.cssRules.length);
	d.insertRule('.jDate_inputWrapper{display:inline-block;}',d.cssRules.length);
	d.insertRule('.jDate_inputWrapper div{position:absolute;}',d.cssRules.length);



}

////////////////////////////////////////////////////////////////////////////////
// This function finds inputs with class "jDate" and adds the calendars.
////////////////////////////////////////////////////////////////////////////////

function jDate_init(){
	/*jDate_injectCSS(); - styles moved to default stylesheet*/
	var pickers = document.getElementsByClassName("jDate");
	for ( d = 0 ; d < pickers.length ; d++ ){
		if ( pickers[d].id != "" ){
			jDate(pickers[d].id,'','');
		}
	}
}





////////////////////////////////////////////////////////////////////////////////
// jFrame v1.0
// This script will inject css for a column based framework.
////////////////////////////////////////////////////////////////////////////////
// Usage:
// jFrame(w,c,p,m);
// w = Total Width
// c = Number of Columns
// p = Padding
// m = margin
////////////////////////////////////////////////////////////////////////////////
// Notes:
// - Includes a css reset ( * {margin:0;padding:0} )
// - Framework includes header, content and footer div.
// - Columns can be nested 2 levels.  For example a 5 column div can include
//		sub-colums and each of those can contain subcolumns.
////////////////////////////////////////////////////////////////////////////////


function jFrame(w,c,p,m){
	var i = document.createElement("style");
	i.type = 'text/css';
	document.head.appendChild(i);
	var d = document.styleSheets[document.styleSheets.length-1];
	d.insertRule('*{margin:0;padding:0;border:none;}',d.cssRules.length);
	d.insertRule('#container{display:block;width:'+w+'px;display:block;position:absolute;left:50%;margin-left:-'+(w/2)+'px;overflow:show;}',d.cssRules.length);
	d.insertRule('#header,#footer{width:100%;height:100px;clear:both;display:block;overflow:show;}',d.cssRules.length);
	d.insertRule('#content{width:100%;min-height:640px;display:block;height:auto;}',d.cssRules.length);
	var cf = Math.floor(w/c);
	for ( x = 1 ; x <= c ; x++ ){
		var colLevel1 = ((cf*x)-((m*2)+(p*2)));
		d.insertRule('div.col'+x+'{ width: '+colLevel1+'px;display:block;margin:'+m+'px;padding:'+p+'px;float:left;}',d.cssRules.length);
		if ( x >= 2 ){
			for ( y = 1 ; y <= x ; y++ ){
				var colLevel2 = ( colLevel1 / x ) * y;
				d.insertRule('div.col'+x+' div.col'+y+'{ width: '+(colLevel2-((m*2)+(p*2)))+'px;display:block;margin:'+m+'px;padding:'+p+'px;float:left;}',d.cssRules.length);
				if ( y >= 2 ){
					for ( z = 1 ; z <= y ; z++ ){
						var colLevel3 = ( ( colLevel2 / y ) * z ) - m - p;
						d.insertRule('div.col'+x+' div.col'+y+' div.col'+z+'{ width: '+(colLevel3-((m*2)+(p*2)))+'px;display:block;margin:'+m+'px;padding:'+p+'px;float:left;}',d.cssRules.length);
					}
				}
			}
		}
	}
}





////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  jGraph v.1.5
//  by Jeff Ulicny
//
// New in v 1.5
// - Renamed to jGraph to fit branding of my other libraries
// - Removed jquery dependencies to keep in line with other jLibraries.
// - Fixed cutoff of last point on line charts
//
//	New in v1.4
//	- Added variable to control what action invokes and dismisses the number layer (hover vs click)
//
//  New in v1.3
// - Added veritcal and horizontal labels
// - Added padding to center columns in grid
// - Added process to round up maximum value of vertical legend
//
//  New in v1.2
// - Added support for multiple data sets
//
//  New in v1.1
// - Added options for custom x and y axis
// - Added option for custom text shadow color on tooltip layer
// - Added option for shadows on points in line graphs
// - Added option for shadows on columns in column graphs
//
//  New in v1.0
//  - Added "Tooltip" layer on hover.  jQuery required.
//
//  New in v0.9
//  - First milestone release.  Everything is new.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEFAULT VALUES
// It is not reccomended that these be changed.  Instead change before calling the function as shown in
// the usage section at documents end.
////////////////////////////////////////////////////////////////////////////////////////////////////////

var jGraphSettings = new Array();
jGraphSettings['type'] = "column";						// graph type options: line, column
jGraphSettings['id'] = "graph";							// div id to inject graph
jGraphSettings['prefix'] = "$";							// unit jGraphSettings['prefix']
jGraphSettings['suffix'] = "";							// unit jGraphSettings['suffix']
jGraphSettings['paddingTop'] = 10;						// pixel padding above graph area
jGraphSettings['paddingRight'] = 20;						// pixel padding to right of graph area
jGraphSettings['paddingBottom'] = 50;					// pixel padding on bottom of graph area, does not include legend
jGraphSettings['paddingLeft'] = 54;						// pixel padding on left of graph area, does not include legend
jGraphSettings['canvasHeight'] = 400;					// width of graph
jGraphSettings['canvasWidth'] = 800;						// height of graph
jGraphSettings['lineColor'] = new Array();
jGraphSettings['lineColor'][0] = "black";				// color of lines
jGraphSettings['lineWidth'] = 1;							// width of lines
jGraphSettings['pointColor'] = new Array();
jGraphSettings['pointColor'][0] = "red";					// color of points
jGraphSettings['pointSize'] = 3;							// radius of points in pixels, actual width will be double.
jGraphSettings['pointShadowColor'] = "transparent";		// color of point shadows.
jGraphSettings['columnWidth'] = 80;						// Column width percentage, 100 = no gaps between columns
jGraphSettings['columnStroke'] = new Array();
jGraphSettings['columnStroke'][0] = "#333333";			// Column stroke color
jGraphSettings['columnGradStart'] = new Array();
jGraphSettings['columnGradStart'][0] = "#FAFAFA";		// Column gradient color start
jGraphSettings['columnGradEnd'] = new Array();
jGraphSettings['columnGradEnd'][0] = "#A0A0A0";			// Column gradient color end
jGraphSettings['columnShadowColor'] = "#333333";			// color of column shadows.
jGraphSettings['hLines'] = 12;							// horizontal gridlines
jGraphSettings['hLinesColor'] = "#999999";				// color of horizontal gridlines
jGraphSettings['hLinesWidth'] = 1;						// width of horizontal gridlines
jGraphSettings['vLinesColor'] = "#999999";				// color of vertical gridlines
jGraphSettings['vLinesWidth'] = 1;						// width of vertical gridlines
jGraphSettings['hBaseColor'] = "#222222";				// color of horizontal baseline
jGraphSettings['hBaseWidth'] = 2;						// width of horizontal baseline
jGraphSettings['vBaseColor'] = "#222222";				// color of vertical baseline
jGraphSettings['vBaseWidth'] = 2;						// width of vertical baseline
jGraphSettings['bGradBegin'] = "white";					// background gradient start color
jGraphSettings['bGradEnd'] = "white";					// background gradient end color
jGraphSettings['textColor'] = "#333333";					// color of text
jGraphSettings['textFont'] = "Verdana";					// font used for text
jGraphSettings['textSize'] = 10;							// pixel size of text
jGraphSettings['textShadowColor'] = "#CCCCCC";			// color of text shadow - used only in tooltip layer
jGraphSettings['vLabelText'] = "Vertical Label";			// Vertical Text Below Graph
jGraphSettings['vLabelSize'] = 12;						// Size of Vertical Text Below Graph
jGraphSettings['hLabelText'] = "Horizontal Label";		// Horizontal Text Beside Graph
jGraphSettings['hLabelSize'] = 12;						// Size of Horizontal Text Beside Graph
jGraphSettings['layer'] = 1;								// what action invokes number layer (0 = hover, 1 = click)

function jGraph(jGraphSettings,graphData) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// spawn the canvas
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var targetDiv = document.getElementById(jGraphSettings['id']);
	var newCanvas = document.createElement("canvas");
	newCanvas.setAttribute("id","graphCanvas_"+jGraphSettings['id']);
	newCanvas.setAttribute("width",jGraphSettings['canvasWidth']+"px");
	newCanvas.setAttribute("height",jGraphSettings['canvasHeight']+"px");
	if (jGraphSettings['layer'] == 0){
		newCanvas.setAttribute("onmouseover","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
		newCanvas.setAttribute("onmouseout","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
	}
	else {
		newCanvas.setAttribute("onclick","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
	}
	newCanvas.setAttribute("style","display:block;position:relative;z-index:99;");
	targetDiv.appendChild(newCanvas);

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Determine drawable dimensions
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var chartHeight = jGraphSettings['canvasHeight'] - (jGraphSettings['paddingBottom'] + jGraphSettings['paddingTop']);
	var chartWidth = jGraphSettings['canvasWidth'] - (jGraphSettings['paddingLeft'] + jGraphSettings['paddingRight']);

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Instantiate canvas for drawing
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var c = document.getElementById("graphCanvas_"+jGraphSettings['id']);
	var ctx = c.getContext("2d");

	if ( typeof graphData != "undefined" && graphData.length >= 1 ) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Normalize data array
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		var dataSets = (graphData[0].length)-1;
		maxVal = 0;
		minVal = graphData[1][0];
		for (d=1;d<=dataSets;d++)
		{
			for (n=1;n<graphData.length;n++)
			{
				if (graphData[n][d]>=maxVal)	{maxVal = graphData[n][d];}
				if (graphData[n][d]<=minVal)	{minVal = graphData[n][d];}
			}
		}

		var factor = 10;
		while (maxVal/factor > 19)	{factor = factor *10;}
		maxVal = Math.ceil(maxVal/factor)*factor;

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// convert array values to percents for more flexible graphing
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		var useNumbers = new Array();
		for (d=1;d<=dataSets;d++)
		{
			useNumbers[d] = new Array();
			for (n=1;n<graphData.length;n++)
			{
				useNumbers[d][n-1] = (graphData[n][d]/maxVal);
			}
		}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// create tooltip layer
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		var targetDiv = document.getElementById(jGraphSettings['id']);
		var newCanvas2 = document.createElement("canvas");
		newCanvas2.setAttribute("id","tooltipCanvas_"+jGraphSettings['id']);
		newCanvas2.setAttribute("width",jGraphSettings['canvasWidth']+"px");
		newCanvas2.setAttribute("height",jGraphSettings['canvasHeight']+"px");
		newCanvas2.setAttribute("style","margin-top:-"+jGraphSettings['canvasHeight']+"px;display:block;position:relative;z-index:999;opacity:0;transition:opacity 0.5s;");
		if (jGraphSettings['layer'] == 0) {
			newCanvas2.setAttribute("onmouseover","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
			newCanvas2.setAttribute("onmouseout","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
		}
		else {
			newCanvas2.setAttribute("onclick","jGraph_fadeToggle('tooltipCanvas_"+jGraphSettings['id']+"');");
		}
		targetDiv.appendChild(newCanvas2);

		var c2 = document.getElementById("tooltipCanvas_"+jGraphSettings['id']);
		var ctx2 = c2.getContext("2d");

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// find column widths and adjust drawable area to compensate for rounding
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		switch (jGraphSettings['type'])
		{
			case "line":
			var xSpacing = Math.round((chartWidth-(jGraphSettings['paddingLeft']+jGraphSettings['paddingRight']))/(useNumbers[1].length-1));
			xSpacing += (xSpacing*.5)/useNumbers[1].length;
			chartWidth = (xSpacing * (useNumbers[1].length-1));
			break;

			case "column":
			var xSpacing = Math.round((chartWidth)/(useNumbers[1].length));
			chartWidth = xSpacing * useNumbers[1].length;
			break;

		}
		var xCenter = xSpacing/2;
		var hLineSpacing = chartHeight/jGraphSettings['hLines'];
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw background gradient
////////////////////////////////////////////////////////////////////////////////////////////////////////
	var grd=ctx.createLinearGradient(0,0,0,jGraphSettings['canvasHeight']);
	grd.addColorStop(0,jGraphSettings['bGradBegin']);
	grd.addColorStop(1,jGraphSettings['bGradEnd']);
	ctx.fillStyle=grd;
	ctx.fillRect(jGraphSettings['paddingLeft'],jGraphSettings['paddingTop'],chartWidth,chartHeight);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Veritcal Legend
////////////////////////////////////////////////////////////////////////////////////////////////////////
	if ( typeof maxVal != "undefined" ) {
		ctx.font = jGraphSettings['textSize']+"px "+jGraphSettings['textFont'];
		ctx.fillStyle = jGraphSettings['textColor'];
		ctx.textAlign = "left";
		for (a=0;a<=jGraphSettings['hLines'];a++)
		{
			ctx.fillText(jGraphSettings['prefix']+Math.round(maxVal*(a/(jGraphSettings['hLines'])))+jGraphSettings['suffix'],0+jGraphSettings['vLabelSize']*1.5, chartHeight - (((hLineSpacing*a)-jGraphSettings['paddingTop'])-Math.floor(jGraphSettings['textSize']/2)));
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Horizontal Legend
////////////////////////////////////////////////////////////////////////////////////////////////////////
	if ( typeof useNumbers != "undefined" ) {
		ctx.textAlign = "center";
		var x = jGraphSettings['paddingLeft'];
		switch (jGraphSettings['type'])
		{
			case "line":
			var padHLegend = 0;
			break;

			case "column":
			var padHLegend = Math.floor((xSpacing*(jGraphSettings['columnWidth']/100))/2);
			break;

		}

		var alt = 1;
		if ( n*50 > jGraphSettings['canvasWidth']){
			alt = Math.ceil(100/n);
		}

		for (n=1;n<=useNumbers[1].length;n++)
		{
			y = chartHeight + jGraphSettings['paddingTop'] + jGraphSettings['textSize'];
			if (n%2==1)		{y += Math.ceil(jGraphSettings['textSize']*1.1);}
			if ( n/alt == Math.round(n/alt) ){
				ctx.fillText(graphData[n][0],x+padHLegend,y,xSpacing*alt);
				x += xSpacing*alt;
			}
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw vertical gridlines
////////////////////////////////////////////////////////////////////////////////////////////////////////
		ctx.strokeStyle=jGraphSettings['vLinesColor'];
		ctx.lineWidth=jGraphSettings['vLinesWidth'];
		switch (jGraphSettings['type'])
		{
			case "line":
			var useableLines = useNumbers[1].length;
			break;

			case "column":
			var useableLines = useNumbers[1].length+1;
			break;

		}

		var x = jGraphSettings['paddingLeft'];
		for (n=0;n<useableLines;n++)
		{
			ctx.beginPath();
			ctx.moveTo(x,jGraphSettings['paddingTop']);
			ctx.lineTo(x,chartHeight+jGraphSettings['paddingTop']);
			ctx.stroke();
			x += xSpacing;
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw horizontal gridlines
////////////////////////////////////////////////////////////////////////////////////////////////////////
		ctx.strokeStyle=jGraphSettings['hLinesColor'];
		ctx.lineWidth=jGraphSettings['hLinesWidth'];
		for (a=0;a<=jGraphSettings['hLines'];a++)
		{
			ctx.beginPath();
			ctx.moveTo(jGraphSettings['paddingLeft'],(hLineSpacing*a)+jGraphSettings['paddingTop']);
			ctx.lineTo(jGraphSettings['paddingLeft']+chartWidth,(hLineSpacing*a)+jGraphSettings['paddingTop']);
			ctx.stroke();
		}
	}

	if ( graphData.length >= 1 ) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// chart the data
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		switch (jGraphSettings['type'])
		{
			case "line":
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// loop through array values and draw the lines.
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		for (d=1;d<=dataSets;d++)
		{
			var x = jGraphSettings['paddingLeft'];
			var y = jGraphSettings['paddingTop'];
			ctx.beginPath();
			ctx.strokeStyle=jGraphSettings['lineColor'][(d-1)%(jGraphSettings['pointColor'].length)];
			ctx.lineWidth=jGraphSettings['lineWidth'];
			for (n=0;n<=useNumbers[d].length;n++)
			{
				y = chartHeight - (useNumbers[d][n]*chartHeight) + jGraphSettings['paddingTop'];
				if (n==0)			{ctx.moveTo(x,y);}
				else				{ctx.lineTo(x,y);}
				ctx.stroke();
				x += xSpacing;
			}
		}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// loop through array values and draw the points
	////////////////////////////////////////////////////////////////////////////////////////////////////////
			for (d=1;d<=dataSets;d++)
			{
				var x = jGraphSettings['paddingLeft'];
				var y = jGraphSettings['paddingTop'];
				var usePad = 0;
				ctx.beginPath();
				for (n=0;n<useNumbers[d].length;n++)
				{
					ctx.fillStyle=jGraphSettings['pointColor'][(d-1)%(jGraphSettings['pointColor'].length)];
					ctx.strokeStyle=jGraphSettings['pointColor'];
					y = chartHeight - (useNumbers[d][n]*chartHeight) + jGraphSettings['paddingTop'];
					ctx.moveTo(x,y);
					ctx.shadowColor = jGraphSettings['pointShadowColor'];
					ctx.shadowOffsetX = -1;
					ctx.shadowOffsetY = 1;
					ctx.shadowBlur    = 5;
					ctx.arc(x,y,jGraphSettings['pointSize'],0,2*Math.PI);
					ctx.fill();

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Add values to tooltip layer.
	////////////////////////////////////////////////////////////////////////////////////////////////////////

					if (y + jGraphSettings['textSize'] <= chartHeight + jGraphSettings['textSize'])	{yAdjust = jGraphSettings['textSize']*1.5;}
					else	{yAdjust = jGraphSettings['textSize']*-1.1;}
					y += yAdjust;
					ctx2.font = jGraphSettings['textSize']+"px "+jGraphSettings['textFont'];
					ctx2.fillStyle = jGraphSettings['textColor'];
					ctx2.textAlign = "center";
					ctx2.shadowColor = jGraphSettings['textShadowColor'];
					ctx2.shadowOffsetX = 0;
					ctx2.shadowOffsetY = 0;
					ctx2.shadowBlur = 5;
					ctx2.fillText(jGraphSettings['prefix'] + graphData[n+1][d] + jGraphSettings['suffix'] ,x + padHLegend + usePad,y);

					x += xSpacing;
				}
			}
			break;

			case "column":
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// loop through array values and draw the columns.
	////////////////////////////////////////////////////////////////////////////////////////////////////////

			for (d=1;d<=dataSets;d++)
			{
				var x = jGraphSettings['paddingLeft'];
				var y = jGraphSettings['paddingTop'];
				ctx.lineWidth=jGraphSettings['hLinesWidth'];
				var useWidth = Math.floor((xSpacing*(jGraphSettings['columnWidth']/100))/dataSets);
				var columnMargin = Math.floor((xSpacing*(1-(jGraphSettings['columnWidth']/100)))/dataSets)/2;
				var usePad = Math.floor(((xSpacing/dataSets)*d)/dataSets)*(d-1);
				usePad += columnMargin;

				ctx.strokeStyle=jGraphSettings['columnStroke'][(d-1)%(jGraphSettings['columnStroke'].length)];
				ctx.shadowColor = jGraphSettings['columnShadowColor'][(d-1)%(jGraphSettings['columnShadowColor'].length)];
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 0;
				ctx.shadowBlur    = 5;
				for (n=0;n<useNumbers[d].length;n++)
				{
					y = chartHeight - (useNumbers[d][n]*chartHeight) + jGraphSettings['paddingTop'];
					ctx.strokeRect(x+usePad,y,useWidth,(chartHeight-y+jGraphSettings['paddingTop']));
					var thisColumn = ctx.createLinearGradient(x+usePad,y,x+usePad,(chartHeight+jGraphSettings['paddingTop']));
					thisColumn.addColorStop(0,jGraphSettings['columnGradStart'][(d-1)%(jGraphSettings['columnGradStart'].length)]);
					thisColumn.addColorStop(1,jGraphSettings['columnGradEnd'][(d-1)%(jGraphSettings['columnGradEnd'].length)]);
					ctx.fillStyle=thisColumn;
					ctx.fillRect(x+usePad,y,useWidth,(chartHeight-y+jGraphSettings['paddingTop']));

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Add values to tooltip layer.
	////////////////////////////////////////////////////////////////////////////////////////////////////////

					if (y + jGraphSettings['textSize'] <= jGraphSettings['paddingTop'] + jGraphSettings['textSize'])	{yAdjust = jGraphSettings['textSize']*1.1;}
					else	{yAdjust = jGraphSettings['textSize']*-0.5;}
					y += yAdjust;

					ctx2.font = jGraphSettings['textSize']+"px "+jGraphSettings['textFont'];
					ctx2.fillStyle = jGraphSettings['textColor'];
					ctx2.textAlign = "center";
					ctx2.shadowColor = jGraphSettings['textShadowColor'];
					ctx2.shadowOffsetX = 0;
					ctx2.shadowOffsetY = 0;
					ctx2.shadowBlur = 5;
					ctx2.fillText(jGraphSettings['prefix'] + graphData[n+1][d] + jGraphSettings['suffix'] ,x + (padHLegend/dataSets) + usePad,y);

					x += xSpacing;
				}
			}
			break;
		}
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// draw vertical axis
	////////////////////////////////////////////////////////////////////////////////////////////////////////
		ctx.strokeStyle=jGraphSettings['vBaseColor'];
		ctx.lineWidth=jGraphSettings['vBaseWidth'];
		ctx.beginPath();
		ctx.moveTo(jGraphSettings['paddingLeft'],jGraphSettings['paddingTop']);
		ctx.lineTo(jGraphSettings['paddingLeft'],chartHeight+jGraphSettings['paddingTop']);
		ctx.stroke();
	}


////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw vertical label
////////////////////////////////////////////////////////////////////////////////////////////////////////
	ctx.textAlign = "center";
	ctx.fillStyle = jGraphSettings['textColor'];
	ctx.font = jGraphSettings['vLabelSize']+"px "+jGraphSettings['textFont'];
	ctx.rotate(-Math.PI/2);
	ctx.fillText(jGraphSettings['vLabelText'], ((jGraphSettings['canvasHeight']/2)-jGraphSettings['paddingTop'])*-1 , jGraphSettings['vLabelSize']);
	ctx.rotate(Math.PI/2);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw horizontal axis
////////////////////////////////////////////////////////////////////////////////////////////////////////
	ctx.strokeStyle=jGraphSettings['hBaseColor'];
	ctx.lineWidth=jGraphSettings['hBaseWidth'];
	ctx.beginPath();
	ctx.moveTo(jGraphSettings['paddingLeft'],(hLineSpacing*jGraphSettings['hLines'])+jGraphSettings['paddingTop']);
	ctx.lineTo(jGraphSettings['paddingLeft']+chartWidth,(hLineSpacing*jGraphSettings['hLines'])+jGraphSettings['paddingTop']);
	ctx.stroke();

////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw horizontal label
////////////////////////////////////////////////////////////////////////////////////////////////////////
	ctx.textAlign = "center";
	ctx.fillStyle = jGraphSettings['textColor'];
	ctx.font = jGraphSettings['hLabelSize']+"px "+jGraphSettings['textFont'];
	ctx.fillText(jGraphSettings['hLabelText'], (jGraphSettings['canvasWidth']/2) ,(jGraphSettings['canvasHeight']-jGraphSettings['hLabelSize']));

}

function jGraph_fadeToggle(id){
	if ( document.getElementById(id).style.opacity == "0" ){
		document.getElementById(id).style.opacity = "1";
	}
	else {
		document.getElementById(id).style.opacity = "0";
	}
}








var JVALErrors = {};

function jVal( field, type, rule ) {

	// JVAL 1.1
	// A rebirth of my old validation function.
	// Usage:
	// Determining attributes for validation have been moved to the field attributes.
	// This allows for a much simpler function call...  JVAL(this)

	// New in version 1.1:
	// 1. added field wrapper routine to ensure proper placement of tooltip
	// 2. added !important to tooltip background property
	// 3. Updated jValForm function to also check selects

	// field level attributes:
	// 1. JVAL-type, this determines the validation case.  Avaliable options:
	//		a. email
	//		b. notBlank
	//		c. password
	//		d. compare
	//		e. extension
	//		f. range
	//		g. phone
	//		h. banana
	//		i. length
	// 2. JVAL-comp, this is used with the compare validation type.  This attribute
	//		should contain the ID of the field to be compared to.
	// 3. JVAL-format, this is a second level of data type determination.  It is used
	//		in scenarios such as phone validation where it is used to differentiate
	//		between US and International phone formats.
	// 4. min, minimum value - used with "range" validation.
	// 5. max, maximum value - used with "range" validation.
	// 6. JVAL-text, text to display if validation fails
	// 7. JVAL-rule, validation rule.  Options:
	//		1. strict display warning, return -1 on error.  
	//			( assumed level if not defined in field ).
	//		2. warn: display warning, return 0 on error.
	//		3. silent: do not display warning, return 0 on error.
	//		Note: Successful validation will always return 1.
	//
	// Function returns array object.
	//
	//	JVALResponse.value	= The value of the field being validated.
	//	JVALResponse.type	= The type of validation being used.
	//	JVALResponse.result	= Validation result.  See rule 7 above.
	//	JVALResponse.valid	= Acceptable values used in validation.
	//	JVALResponse.min	= Minimum value.
	//	JVALResponse.max	= Maximum value.
	//	JVALResponse.format	= Acceptable data format.

	// CHECK FOR MULTIPLE VALIDATION TYPES

	var JVALResponse = {};

	if ( 
			field.getAttribute('JVAL-type') != undefined &&
			type == undefined && 
			field.getAttribute('JVAL-type').indexOf(",") != -1
		){

		var types = field.getAttribute('JVAL-type').split(",");
		for ( v = 0 ; v < types.length ; v++ ){
			jVal(field,types[v]);
		}

	}
	else {

		var useType = field.getAttribute('JVAL-type');

		if ( type != undefined ){
			var useType = type;
		}

		JVALResponse.value = field.value;
		JVALResponse.type = useType;
		JVALResponse.result = 1;

		switch (useType){

			// EMAIL VALIDATION
			case "email":
			var pattern = /^[a-zA-Z0-9!#$%&'\*/=\?\^`\{\}\|~_\-\+]+(\.[_a-zA-Z0-9!#$&'\*/=\?\^`\{\}\|~_\+\-]+)*@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*(\.[a-zA-Z]{2,4})$/;
			if (pattern.test(field.value)===false){
				JVALResponse.result = -1;
			}
			break;

			case "alpha":
			var pattern = /^[a-zA-Z]+$/;
			if (pattern.test(field.value)===false){
				JVALResponse.result = -1;
			}
			break;

			case "alphanum":
			var pattern = /^[a-zA-Z0-9]+$/;
			if (pattern.test(field.value)===false){
				JVALResponse.result = -1;
			}
			break;

			case "numeric":
			var pattern = /^[0-9]+$/;
			if (pattern.test(field.value)===false){
				JVALResponse.result = -1;
			}
			break

			// NOT BLANK
			case "notBlank":
			if (field.value==""){
				JVALResponse.result = -1;
			}
			break;

			// PASSWORD
			// REQUIRES AT LEAST 1 LOWER CASE, 1 UPPER CASE, 1 NUMBER AND 1 SHIFT CHARACTER, MINIMUM LENGTH = 8
			case "password":
			var pattern1 = /[a-z]+/g;
			var pattern2 = /[A-Z]+/g;
			var pattern3 = /[0-9]+/g;
			var pattern4 = /[!@#$%&\/(){}\[\]=?+*^~\-_\.:,;]+/g;
			if (
				pattern1.test(field.value)===false || 
				pattern2.test(field.value)===false || 
				pattern3.test(field.value)===false || 
				pattern4.test(field.value)===false ||
				field.value.length < 8 
				){
				JVALResponse.result = -1;
			}
			break;

			// COMPARES CURRENT TO FIELD REFERENCED BY ID IN THE "JVAL-comp" ATTRIBUTE
			case "compare":
			var data2 = document.getElementById(field.getAttribute('JVAL-comp')).value;
			if ( field.value != data2 ){
				JVALResponse.result = -1;
			}
			break;

			// EXTENSION
			// CHECKS TO SEE IF GIVEN EXTENSION IS AT END OF VALUE
			// CASE INSENSATIVE
			// NEED TO ADD SUPPORT MULTIPLE EXTENSIONS
			case "extension":
			var req = field.getAttribute("data-ext");
			JVALResponse.valid = req;
			if ( req.indexOf(",") != -1 ){
				exts = req.split(",");
				for ( e = 0 ; e < exts.length ; e++ ){
					var check = field.value.substr(exts[e].length*-1);
					if ( exts[e].toUpperCase() != check.toUpperCase() ){
						JVALResponse.result = -1;
					}
					else {
						JVALResponse.result = 1;
						break;
					}
				}
			}
			else {
				var check = field.value.substr(req.length*-1);
				if ( req.toUpperCase() != check.toUpperCase() ){
					JVALResponse.result = -1;
				}
			}
			break;

			// RANGE
			// VERIFIES VALUE IS BETWEEN MAX AND MIN ATTRIBUTES
			case "range":
			JVALResponse.min = field.min;
			JVALResponse.max = field.max;
			if (
					field.value == "" ||
					isNaN(field.value) || 
					parseFloat(field.value) < parseFloat(field.min) || 
					parseFloat(field.value) > parseFloat(field.max) 
				) {
				JVALResponse.result = -1;
			}
			break;

			// LENGTH
			// VERIFY LENGTH OF FIELD VALUE IS WITHIN MIN AND MAX DEFINED
			case "length":
			JVALResponse.min = field.min;
			JVALResponse.max = field.max;
			if ( 
				field.value.length < field.getAttribute("min") ||
				field.value.length > field.getAttribute("max")
			){
				JVALResponse.result = -1;
			}
			break;

			// US PHONE NUMBER
			// NOT SO MUCH A VALIDATION AS A REFORMAT
			case "phone":
			var current = field.value
			switch ( field.getAttribute("JVAL-format") ){
				case "INT":
				case "int":
				var format = "+## ## #### ####";
				var minCount = 12;
				break;

				default:
				var format = "(###)###-####";
				var minCount = 10;
				break;
			}
			var numeric = /[0-9]/g;
			var input = current.match(numeric);

			if ( field.value.length < format.length ){
				JVALResponse.result = -1;
			}

			var formatted = "";

			if ( input != null ) {
				var input_index = 0;
				for ( x = 0 ; x < format.length ; x++ ) {
					if ( format[x] != undefined && format[x] != "#" && input[input_index] != undefined ){
						formatted += format[x];
					}
					else if ( input[input_index] != undefined ) {
						formatted += input[input_index];
						input_index++;
					}
					else {
						break;
					}
				}
			}
			field.value = formatted;
			break;


			// URL
			// VERIFIES FIELD VALUE FITS MINIMUM URL REQUIREMENTS
			case "url":
			var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
			if ( field.value=="" || pattern.test(field.value.toLowerCase())===false ){
				JVALResponse.result = -1;
			}
			break;


			// DATE
			// VERIFIES FIELD VALUE MATCHES PREDEFINED DATE FORMAT
			case "date":
			JVALResponse.format = field.getAttribute("JVAL-format");
			switch ( field.getAttribute("JVAL-format") ){
				case "YYYY/MM/DD":
				var pattern = /^((19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01]))*$/;
				break;

				case "DD/MM/YYYY":
				var pattern = /^(0?[1-9]|[12][0-9]|3[01])[- /.]((0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/;
				break;

				default:
				// MM/DD/YYYY
				var pattern = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
				break;
			}

			if ( field.value == "" || pattern.test(field.value)===false ){
				JVALResponse.result = -1;
			}
			break;

			// BANANA
			// VERIFIES FIELD VALUE IS BANANA.  JUST IN CASE THIS COMES UP.
			case "banana":
			if ( field.value.toUpperCase() != "BANANA"){
				JVALResponse.result = -1;
			}
			break;

		}

		var rule = "strict";
		if ( field.getAttribute("JVAL-rule") ){
			rule = field.getAttribute("JVAL-rule");
		}
		JVALResponse.rule = rule;

		// TAKE ACTION BASED ON VALIDATION RESULTS

		var current_class = field.className;

		// FAILURE RESULTS

		if ( JVALResponse.result != 1 ){

			if ( rule != "silent" ){

				// ADD CLASS "validationFail" to element

				if ( current_class.indexOf("validationFail") == -1 ){
					field.setAttribute("class", current_class+" validationFail");
				}

				// IF HELP TEXT AVAILABLE AND TOOLTIP NOT ALREADY PRESENT, APPEND TOOLTIP TO ELEMENT

				if ( 
					field.getAttribute("JVAL-text") != "" && 
					!document.getElementById(field.name+"_JVAL_tooltip")
					){

					var ttip = document.createElement("div");
						ttip.setAttribute("class","JVAL_tooltip fadeIn");
						ttip.id = field.name+"_JVAL_tooltip";
						ttip.innerHTML = field.getAttribute("JVAL-text");
						var checkParent = field.parentNode.className;
						if ( checkParent != "jValWrapper" ){
							var jw = document.createElement("span");
								jw.setAttribute("class","jValWrapper");
							field.parentNode.insertBefore(jw, field);
							jw.appendChild(field);
							field.focus();
						}
						field.parentNode.appendChild(ttip);

				}

			}

			// IF VALIDATION RULE != "VALIDATE" AND FAIL, SET PASS TO ZERO
			if ( rule == "warn" || rule == "silent" ){
				JVALResponse.result = 0;
			}

		}

		// SUCCESS RESULTS

		else {

			// IF "validationFail" CLASS IS PRESENT, REMOVE IT

			var new_classes = current_class.replace("validationFail","");
			field.setAttribute("class",new_classes);

			// IF TOOLTIP IS PRESENT, REMOVE IT

			if ( document.getElementById(field.name+"_JVAL_tooltip") ){

				document.getElementById(field.name+"_JVAL_tooltip").parentNode.removeChild(document.getElementById(field.name+"_JVAL_tooltip"));

			}

		}

		// FIND SUBMIT BUTTON OF CURRENT FORM

		var inputs = field.form.getElementsByTagName("input");
		for ( i = 0 ; i < inputs.length ; i++ ){
			if ( inputs[i].type == "submit" ){
				var submitButton = inputs[i];
				break;
			}
		}

		// DEFINE ERROR ARRAY FOR FORM VALIDATION TRACKING
		if ( JVALErrors[submitButton.name] == undefined ){
			JVALErrors[submitButton.name] = {};
		}

		// POPULATE FORM ERROR ARRAY
		if ( JVALResponse.result == -1 && rule == "strict" ){
			JVALErrors[submitButton.name][field.name] = 1;
		}
		else {
			JVALErrors[submitButton.name][field.name] = 0;
		}

		// CHECK FORM ERROR ARRAY AND SET SUBMIT BUTTON STATUS

		submitButton.removeAttribute('disabled');

		for ( var key in JVALErrors[submitButton.name] ){
			if ( JVALErrors[submitButton.name][key] == 1 ){
				submitButton.setAttribute('disabled',true);
			}
		}

		// RETURN RESULTS ( 1,0,-1 )
		return(JVALResponse);

	}

}

// INSERT JVAL CSS STYLES

function insert_JVALStyles(){

	if ( document.styleSheets.length == 0 ) {
		var current_css = document.createElement("style");
		current_css.type = 'text/css';
		document.head.appendChild(current_css);
	}

	var dynamic_css = document.styleSheets[0];

	dynamic_css.insertRule('div.JVAL_tooltip {font: 11px Verdana !important;position: relative;display: inline;position: absolute;width: auto;max-width: 300px;color: #fff;border-color: transparent;border-width: 1px;border-style: solid;background: red !important;height: auto;line-height: 12px!important;text-align: center;border-radius: 6px;padding: 4px !important;margin: -2px 0 0 10px !important;box-shadow: 1px 1px 4px #333;z-index: 9998;}',dynamic_css.cssRules.length);
	dynamic_css.insertRule('div.JVAL_tooltip:before { content:""; position: absolute; right: 100%; width: 0; height: 0; border-top: 6px solid transparent; border-right: 12px solid red; border-bottom: 6px solid transparent; }',dynamic_css.cssRules.length);
	dynamic_css.insertRule('div.JVAL_tooltip:hover {z-index: 9999;}',dynamic_css.cssRules.length);
	dynamic_css.insertRule('@keyframes fadeIn {0% { opacity: 0; margin-top: 10px; transform: scale(0.7,0.7); } 80% { opacity: 1.0; margin-top: -3px; transform: scale(1.05,1.05); } 100% { opacity: 1.0; margin-top: -2px; transform: scale(1,1); }}',dynamic_css.cssRules.length);
	dynamic_css.insertRule('.fadeIn {animation-name: fadeIn;animation-duration: 0.5s;animation-iteration-count: 1;opacity: 1.0;}',dynamic_css.cssRules.length);
}

//document.addEventListener('DOMContentLoaded', function() { insert_JVALStyles(); }, false)


function JVALForm(form){
	var errors = 0;
	var inputs = form.querySelectorAll("input,select");
	for ( f = 0 ; f < inputs.length ; f++ ){
		if ( 
				inputs[f].style.display != "none" && 
				inputs[f].parentNode.style.display != "none" && 
				inputs[f].parentNode.parentNode.style.display != "none" &&
				inputs[f].parentNode.parentNode.parentNode.style.display != "none" 
			){
			var p = jVal(inputs[f]);
			if ( p != undefined && p.result == "-1" ){
				errors++;
			}
		}
		else {
			jVal( inputs[f], "", "silent" );
		}
	}
	if ( errors >= 1 ){
		return false;
	}
	return true;
}




////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom Select Boxes - Transforms <select> tags into fully stylable nested divs.
////////////////////////////////////////////////////////////////////////////////////////////////////////

function jSelect(){
	// find existing select tags
	var existingSelects = document.getElementsByClassName("jSelect");

	// loop through them
	for ( x = 0 ; x < existingSelects.length ; x++ ){

		// create container div for new menu
		var d = document.createElement("div");
		d.setAttribute("class","jfx_select")

		// get options of existing select
		var existingOptions = existingSelects[x].getElementsByTagName("option");

		// create "current value" div for new menu
		var z = document.createElement("div");
			z.id = "jfx_select_"+existingSelects[x].id;
			z.innerHTML = existingOptions[0].innerHTML;
		d.appendChild(z);

		// create container div for option links
		var d2 = document.createElement("div");
			d2.setAttribute("class","jfx_select_links");

		// loop through existing options
		for ( y = 0 ; y < existingOptions.length ; y++ ){

			// create option link for new menu
			var a = document.createElement("a");
				a.innerHTML = existingOptions[y].innerHTML;
				a.setAttribute("class","jfx_selectOption")

				// if option has value, add onclick attribute to modify existing menu
				if ( existingOptions[y].value ){
					a.href = "javascript:void(0);";
					var changeAction = "document.getElementById('"+existingSelects[x].id+"').value='"+existingOptions[y].value+"';"+
					"document.getElementById('jfx_select_"+existingSelects[x].id+"').innerHTML='"+existingOptions[y].innerHTML+"';"
					if ( document.getElementById(existingSelects[x].id).onchange ){
						changeAction += "document.getElementById('"+existingSelects[x].id+"').onchange();"
					}
					a.setAttribute("onclick",changeAction);
				}

			// append link to div
			d2.appendChild(a);
		}

		// append link container to div
		d.appendChild(d2);

		// add new menu after existing menu
		existingSelects[x].parentNode.insertBefore(d, existingSelects[x]);
		existingSelects[x].style.display = "none";
	}
}
/*window.onload = function(){jfx_customSelect();}*/




////////////////////////////////////////////////////////////////////////////////////////////////////////
// serializeForm - serializes forms.
////////////////////////////////////////////////////////////////////////////////////////////////////////

function serializeForm(form) {
	form = document.getElementById(form) || document.forms[0];
	var elems = form.elements;
	var serialized = [], i, len = elems.length, str='';
	for(i = 0; i < len; i += 1) {
	var element = elems[i];
	var type = element.type;
	var name = element.name;
	var value = element.value;
		switch(type) {
			case 'text':
			case 'textarea':
			case 'password':
			case 'hidden':
			case 'select-one':
				str = name + '=' + value;
				serialized.push(str);
			break;

			case 'radio':
			case 'checkbox':
			if ( element.checked === true){
				str = name + '=' + value;
				serialized.push(str);
			}
			break;

			default:
			break;
		}
	}
	return serialized.join('&');
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
// Access get variables
////////////////////////////////////////////////////////////////////////////////////////////////////////

function getVar(name) {
	url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return (results[2]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// set and get cookies.
////////////////////////////////////////////////////////////////////////////////////////////////////////

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return "";
}


////////////////////////////////////////////////////////////////////////////////
// JFX Interface Library 1.0
//
// Replaces existing progress bar script and rolls in...
//
// 1. Custom Alert Script
//		Provides functionality for doing interface alerts that are a little
//		prettier than just doing a javascript alert().
// 2. Messaging Bubbles
//		Floating, Auto-dismissing alerts in the bottom right.  These were
//		originally developed for the McAfee project.
// 3. Transition Functions
//		These are utilized internally, but can also be used for other custom
//		needs.  These were developed to remove jQuery dependencies.
//		Functions are...
//			a. JFX_popIn(id) - "pops" in the given id.
//			b. JFX_fadeIn(id) - fades in the given id.
//			c. JFX_fadeOut(id) - fades out the given id.
// 4. Simple ajax GET function
//		Developed for testing but is so small I decided to include it here.
//		Usage:
//			JFX_ajaxGET(url,format);
//				url = the GET url
//				format = JSON or nothing
//		This function returns the entire jhxr responsetext object.
//		NOTE: this is in it's infancy and should probably not be relied upon.
//
//	CONFIGURATION
//
//	All of the experimental features (drag, cancel, circular meter) have been
//	removed from the progress bar.
//
//	JFX_progress_cancel: boolean ( true | false )
//	This determines if the cancel button is shown on the progress bar.
//
//	JFX_progress_bar_color: string ( hex or css color name )
//	If you choose to define it via this variable, make sure your define it
//	before script inclusion.
//
//	Styles can also be defined via CSS.  Please note that, since this script
//	injects it's own css code, you will need to either define custom styles
//	AFTER script inclusion or use the !important  modifier.
//
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// internal variables - do not change these
////////////////////////////////////////////////////////////////////////////////

var JFX_progress_pending = 0;
var JFX_progress_complete = 0;
var JFX_killDiv;
var JFX_progress_cancel = false;
var JFX_progress_start = 0;

// TRANSITION STYLES, THIS CAN BE ANY CSS ANIMATION NAME.  DO NOT CHANGE THESE HERE.
// IF YOU MUST, CHANGE THESE VARIABLES IN THE PARENT DOCUMENT.

if ( JFX_progress_invoke == undefined )		{ var JFX_progress_invoke = "JFX_fadeIn"; }
if ( JFX_progress_dismiss == undefined )	{ var JFX_progress_dismiss = "JFX_fadeOut"; }
if ( JFX_progress_bar_color == undefined )	{ var JFX_progress_bar_color = "#666"; }

if ( JFX_alert_invoke == undefined )		{ var JFX_alert_invoke = "JFX_fadeIn"; }
if ( JFX_alert_dismiss == undefined )		{ var JFX_alert_dismiss = "JFX_fadeOut"; }

function JFX_insert_progress(){

	if ( !document.getElementById("JFX_progress") ){

		// CREATE DIV

		var div = document.createElement("div");
			div.id = "JFX_progress";
			div.setAttribute("ondragend", "JFX_dragDiv(this);"); // drag additions
			div.setAttribute("draggable", "true"); // drag additions

			// CONTROLS BAR

			var div_controls = document.createElement("div");
				div_controls.id = "JFX_progress_controls";
				div_controls.style.cursor = "all-scroll"; // drag additions
				div_controls.innerHTML = "&nbsp;";

				var c1 = document.createElement("a");
					c1.innerHTML = "i";
					c1.href = "javascript:void(0);";
					c1.setAttribute("onclick","jBlockToggle('JFX_progress_details');");

			div_controls.appendChild(c1);

		div.appendChild(div_controls);

		// MESSAGE DIV

		var div_message = document.createElement("div");
			div_message.id = "JFX_progress_message";
			div_message.innerHTML = "Please wait...";

		div.appendChild(div_message);

		// ANIMATION DIV

		var div_animation = document.createElement("div");
			div_animation.id = "JFX_progress_animation";

			// PROGRESS BAR ( NO CANCEL BUTTON )

			var div_progress_bar = document.createElement("div");
				div_progress_bar.id = "JFX_progress_bar";

				// PROGRESS BAR FILL

				var div_progress_bar_fill = document.createElement("div");
					div_progress_bar_fill.id = "JFX_progress_bar_fill";
					div_progress_bar_fill.innerHTML = "&nbsp;";

				div_progress_bar.appendChild(div_progress_bar_fill);

			div_animation.appendChild(div_progress_bar);

			// PROGRESS BAR ( WITH CANCEL BUTTON )

			var div_progress_bar_cancel = document.createElement("button");
				div_progress_bar_cancel.id = "JFX_progress_cancel";
				div_progress_bar_cancel.setAttribute("class","btn btn-small");
				div_progress_bar_cancel.setAttribute("onclick","JFX_abortRequests();");
				div_progress_bar_cancel.innerHTML = "Cancel";

			div_animation.appendChild(div_progress_bar_cancel);

		div.appendChild(div_animation);

		// DETAILS

		var div_detail = document.createElement("div");
			div_detail.id = "JFX_progress_details";

		div.appendChild(div_detail);

		// APPEND TO BODY

		document.getElementsByTagName("body")[0].appendChild(div);

	}
}

////////////////////////////////////////////////////////////////////////////////
// TRACK AJAX REQUESTS
////////////////////////////////////////////////////////////////////////////////

function JFX_ajaxBind(event) {

	if ( event.target.noTrack === true ){ return; }

	if ( JFX_progress_start == 0 ){
		JFX_progress_start = new Date().getTime();
	}

	// IF PROGRESS BAR HTML/CSS NOT PRESENT, INSERT IT

	JFX_insert_progress();

	// IS CANCEL ENABLED?

	if ( JFX_progress_cancel === true ){
		document.getElementById("JFX_progress_bar").style.width = "60%";
		document.getElementById("JFX_progress_cancel").style.display = "block";
	}
	else {
		document.getElementById("JFX_progress_bar").style.width = "80%";
		document.getElementById("JFX_progress_cancel").style.display = "none";
	}

	// AJAX STATUSES, WE MAY DO MORE WITH THIS LATER, BUT FOR NOW WE'RE JUST
	// CONCERNED WITH START AND FINISH (1 & 4);

	switch ( event.currentTarget.readyState ){
		case 0:
		// request not initialized
		break;

		case 1:
		// server connection established
		if ( !event.currentTarget.jfx_counted ){ // prevent ie double counting
			JFX_progress_pending++;
			event.currentTarget.jfx_counted = 1;
		}
		break;

		case 2:
		// request received
		break;

		case 3:
		// processing request
		break;

		case 4:
		// request finished and response is ready
		JFX_progress_complete++;
		break;
	}

	// GET CHANGING OBJECTS

	var fill = document.getElementById("JFX_progress_bar_fill");
	var box = document.getElementById("JFX_progress");

	// IF FADEOUT IS SCHEDULED, CANCEL IT.

	clearTimeout(JFX_killDiv);

	// CALCULATE PROGRESS PERCENT

	var percent =  (JFX_progress_complete / JFX_progress_pending)*100;
	if (percent == 0 ){
		percent = 1;
	}


	// UPDATE PROGRESS BAR FILL TO CURRENT PERCENT

	fill.style.width = percent+"%";

	JFX_progress_update_details(JFX_progress_start,JFX_progress_pending,JFX_progress_complete);

	// DETERMINE ANIMATION TRANSITION DURATION BASED ON NUMBER OF PENDING EVENTS
	// THIS MAKES RESET AND SINGLE EVENT ANIMATIONS LOOK MUCH BETTER.

	if ( JFX_progress_complete < 1 ){
		// WE DO THIS ON 2 OR LESS EVENTS TO ACCOUNT FOR THE TRANSITION FROM THE
		// SINGLE EVENT STYLE TO THE MULTI EVENT STYLE.
		fill.style.transition = "width 0s";
	}
	else {
		fill.style.transition = "width 0.5s";
	}


	// ACTIVE REQUEST ACTIONS...

	if ( JFX_progress_pending != JFX_progress_complete ){

		if ( JFX_progress_pending == 1 ){
			// ONLY 1 REQUEST, USE SINGLE ACTION STYLE.
			fill.setAttribute("class","progress_animated_background");
			fill.style.width = "100%";
		}
		else {
			// MORE THAN 1 REQUEST, USE STANDARD STYLE.
			fill.setAttribute("class","");
		}

		// SHOW PROGRESS BAR
		jShow(box.id,JFX_progress_invoke);
		var useX = getCookie("progress_x_coord");
		var useY = getCookie("progress_y_coord");
		if ( !isNaN(useX) && !isNaN(useY)){
			document.getElementById("JFX_progress").style.left = useX+"px";
			document.getElementById("JFX_progress").style.top = useY+"px";
		}

	}
	else {
	// all requests complete

		// FADE OUT AFTER 2 SECONDS - VARIABLIZE THIS LATER?
		JFX_killDiv = setTimeout(function(){

			jHide(box.id,JFX_progress_dismiss);

			// REMOVE ANY CLASSES ADDED PROGRAMATICALLY
			fill.setAttribute("class","");

			// RESET CALL COUNTS
			JFX_progress_pending = 0;
			JFX_progress_complete = 0;
			JFX_progress_start = 0;

		}, 2000);

	}
}

// CAPTURE AJAX EVENT

var oldOpen = XMLHttpRequest.prototype.open;

// APPEND TRACKING FUNCTION TO CAPTURED AJAX EVENT

XMLHttpRequest.prototype.open = function() {
	this.addEventListener("readystatechange", JFX_ajaxBind)
	oldOpen.apply(this, arguments);
}

// POPULATE AJAX PROGRESS "MORE INFO" CONTENT

function JFX_progress_update_details(start,pending,complete){

	var seconds_elapsed = (new Date().getTime() - start)/1000;
	var percent = (complete/pending)*100
	var time_per_task = seconds_elapsed/complete;
	var seconds_remain = time_per_task * (pending-complete);

	var JFX_progress_details = " ";
	JFX_progress_details += "&nbsp;"+Math.round(percent) + "%&nbsp;Complete&nbsp;("+complete+"/"+pending+")<br/>";
	if ( !isNaN(time_per_task)){
		JFX_progress_details += "Estimated "+Math.floor(seconds_remain)+" seconds remaining.<br/>";
		JFX_progress_details += "Time elapsed: "+seconds_elapsed+" seconds.<br/>";
		JFX_progress_details += "Average time per task: "+Math.round(time_per_task*1000)/1000+" seconds.<br/>";
	}
	document.getElementById("JFX_progress_details").innerHTML = JFX_progress_details;

}

// ABORT OUTSTANDING AJAX REQUESTS

function JFX_abortRequests(){
	try{
		window.stop();
	}
	catch (e){
		document.execCommand('Stop');
	}
}

////////////////////////////////////////////////////////////////////////////////
// CUSTOM ALERT
////////////////////////////////////////////////////////////////////////////////

/*
var JFX_custom_alert_settings = {
	message : "This is an example custom alert.  You can customize: <ul style='text-align:left;margin-left:200px;'><li>The message text</li><li>The Button Text</li><li>The button callbacks</li></ul>",
	button_confirm : {
		text: "Confirm",
		callback: "alert('this is a callback for the confirm button.');"
	},
	button_cancel: {
		text: "No Effing Way!",
		callback: "alert('this is a callback for the cancel button.');"
	},
}
*/

function custom_alert(JFX_custom_alert_settings){

	var useID = "JFX_alert_"+new Date().getTime();

	if ( typeof JFX_custom_alert_settings === 'string' || JFX_custom_alert_settings instanceof String ){
		var m = JFX_custom_alert_settings;
		JFX_custom_alert_settings = { message : m, button_confirm : { text : "OK", callback : ""} };
	}

	var d = document.createElement("div");
		d.id = useID;
		d.setAttribute("class","JFX_custom_alert "+JFX_alert_invoke);

		d.setAttribute("ondragstart", "event.dataTransfer.setData('Text', this.id);"); // drag additions
		d.setAttribute("ondragend", "JFX_dragDiv(this);"); // drag additions
		d.setAttribute("draggable", "true");

	var d2 = document.createElement("div");
		d2.setAttribute("class", "JFX_custom_alert_bar");
		d2.innerHTML = "&nbsp;";
		d2.style.cursor = "all-scroll"; // drag additions
	d.appendChild(d2);

	var p = document.createElement("div");
		p.setAttribute("class", "JFX_custom_alert_message");
		p.innerHTML = JFX_custom_alert_settings.message;
	d.appendChild(p);

	var bs = document.createElement("div");
		bs.setAttribute("class", "JFX_custom_alert_buttons");

	// confirm button settings
	if ( JFX_custom_alert_settings.button_confirm ){

		var b1 = document.createElement("button");
			b1.id = "";
			b1.setAttribute("class","btn btn-branded-2 ");

		// default callback = dismiss alert
		var callback = "jHide('"+useID+"','JFX_custom_alert "+JFX_alert_dismiss+"',true);";

		// set confirm button text
		if ( JFX_custom_alert_settings.button_confirm.text ){
			b1.innerHTML = JFX_custom_alert_settings.button_confirm.text;
		}

		// if callback defined, replace default
		if ( JFX_custom_alert_settings.button_confirm.callback ){
			callback += JFX_custom_alert_settings.button_confirm.callback;
		}

		// set callback and display button
			b1.setAttribute("onclick", callback);

		bs.appendChild(b1);

	}


	// secondary "cancel" button settings
	if ( JFX_custom_alert_settings.button_cancel ){

		var b2 = document.createElement("button");
			b2.id = "JFX_custom_alert_cancel";
			b2.setAttribute("class","btn btn-branded-2");


		// default callback = dismiss alert
		var callback = "jHide('"+useID+"','JFX_custom_alert "+JFX_alert_dismiss+"',true);";

		// set button text
		if ( JFX_custom_alert_settings.button_cancel.text ){
			b2.innerHTML = JFX_custom_alert_settings.button_cancel.text;
		}

		// if callback defined, replce default
		if ( JFX_custom_alert_settings.button_cancel.callback ){
			callback += JFX_custom_alert_settings.button_cancel.callback;
		}

		// set call back and display button
			b2.setAttribute("onclick", callback);

		bs.appendChild(b2);

	}

	d.appendChild(bs);
	document.getElementsByTagName("body")[0].appendChild(d);

	// auto dismiss
	if ( JFX_custom_alert_settings.dismiss ){
		var JFX_custom_alert_dismiss = setTimeout(function(){jHide(useID,"JFX_custom_alert "+JFX_alert_dismiss,true);},JFX_custom_alert_settings.dismiss);
	}
}

// bubble alerts

function jBubble(text){
	var bubble = document.createElement("div");
	var useID = "JFX_bubble_"+new Date().getTime();
	bubble.setAttribute("class","JFX_bubble");
	bubble.id = useID;
	bubble.innerHTML = text;
	document.body.appendChild(bubble);
	var t = setTimeout(function(){var elem = document.getElementById(useID);elem.parentNode.removeChild(elem);},5000);
}

// transitions: show

function jShow(id,useclass){
	// show class
	if ( id.charAt(0) == "." ){
		var cName = id.substring(1);
		var objs = document.getElementsByClassName(cName);
		for ( o = 0 ; o < objs.length ; o++ ){
			objs[o].style.display = "block";
			objs[o].setAttribute("class",useclass);
		}

	}
	// show id
	else {
		document.getElementById(id).style.display = "block";
		document.getElementById(id).setAttribute("class",useclass);
	}
}

// transitions: hide

function jHide(id,useclass,kill){
	// show class
	if ( id.charAt(0) == "." ){
		var cName = id.substring(1);
		var objs = document.getElementsByClassName(cName);
		for ( o = 0 ; o < objs.length ; o++ ){
			objs[o].setAttribute("class",useclass);
			if ( kill === true ){
				var JFX_killDiv = setTimeout(function(){objs[o].parentNode.removeChild(elem);},5000);
			}
		}

	}
	// show id
	else {
		document.getElementById(id).setAttribute("class",useclass);
		if ( kill === true ){
			var elem = document.getElementById(id);
			var JFX_killDiv = setTimeout(function(){var elem = document.getElementById(id);elem.parentNode.removeChild(elem);},5000);
		}
	}
}

// blockToggle

function jBlockToggle(id){
	var d = document.getElementById(id);
	if ( d.style.display == "none" || d.style.display == "" ){
		d.style.display = "block";
	}
	else {
		d.style.display = "none";
	}
}

// fadeToggle

function jFadeToggle(id){
	var hasClass = document.getElementById(id).getAttribute("class")+"";
	if ( hasClass.indexOf("JFX_fadeOut") != -1 ){
		document.getElementById(id).className = document.getElementById(id).className.replace("JFX_fadeOut","JFX_fadeIn");
		document.getElementById(id).style.display = "block";
	}
	else if ( hasClass.indexOf("JFX_fadeIn") != -1 || hasClass == "null" ){
		document.getElementById(id).className = document.getElementById(id).className.replace("JFX_fadeIn","JFX_fadeOut");
		var t = setTimeout(function(){document.getElementById(id).style.display="none";},500);
	}
	else if ( document.getElementById(id).style.display == "none" ){
		document.getElementById(id).className += " JFX_fadeIn";
		document.getElementById(id).style.display = "block";
	}
	else{
		document.getElementById(id).className += " JFX_fadeOut";
		var t = setTimeout(function(){document.getElementById(id).style.display="none";},500);
	}
}


// draggable divs!

function JFX_dragDiv(obj){
	var x = event.clientX;
	var y = event.clientY;
	obj.style.left = x+"px";
	obj.style.top = y+"px";
	setCookie("progress_x_coord",x,999);
	setCookie("progress_y_coord",y,999);
}

// simple ajax GET

function ajaxGET(url,format){
	if ( format == undefined ){
		format = "";
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(url));
	xhr.onload = function() {
		if ( format.toUpperCase() == "JSON" ){
			return(JSON.parse(xhr.responseText));
		}
		else {
			return(xhr.responseText);
		}
	};
	xhr.send();
}



////////////////////////////////////////////////////////////////////////////////
// UPDATE FAVICON - JS CONTROLLED FAVICONS WITH UNREAD COUNTS!
////////////////////////////////////////////////////////////////////////////////
// example:
// updateFavicon("http://localhost/jLib/rss_32.png","19","#000","",4);
////////////////////////////////////////////////////////////////////////////////

function updateFavicon(image,text,text_color,back_color,placement){

	var hasFavicon = false;
	var currentSRC = "";
	var l = document.getElementsByTagName("link");
	for ( i = 0 ; i < l.length ; i++ ){
		if ( l[i].rel == "shortcut icon" ){
			hasFavicon = true;
			currentSRC = l[i].href;
		}
	}
	if ( hasFavicon == false ){
		var f = document.createElement("link");
			f.setAttribute("rel","shortcut icon");
			f.setAttribute("type","image/x-icon");
			f.setAttribute("href","");
		document.getElementsByTagName("head")[0].appendChild(f);
	}


	var box = String(text).length;
	if ( placement == undefined ){
		placement = 4;
	}
	if ( box > 4 ){
		box = 4;
	}
	switch ( placement )
	{
		case 0:
			var x = 128-((box*64)/2);
			var y = 64;
			var w = box*64;
			var h = 128;
		break;
		case 1:
			var x = 0;
			var y = 0;
			var w = box*64;
			var h = 128;
		break;
		case 2:
			var x = 256-(box*64);
			var y = 0;
			var w = box*64;
			var h = 128;
		break;
		case 3:
			var x = 0;
			var y = 128;
			var w = box*64;
			var h = 128;
		break;
		default:
			var x = 256-(box*64);
			var y = 128;
			var w = box*64;
			var h = 128;
		break;
	}


	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	if ( image != "" ){
		img.src = image;
	}
	else if (currentSRC != "" ){
		img.src = currentSRC;
	}
	img.width = 256;
	img.height = 256;
	img.onload = function() {
		ctx.drawImage(img, 0, 0, 256, 256);
		if ( (text != "" || img != "" ) && back_color != "" ){
			ctx.fillStyle = back_color;
			ctx.fillRect(x, y, w, h);
		}
		else if ( img == "" && back_color != ""){
			ctx.fillStyle = back_color;
			ctx.fillRect(0, 0, 256, 256);
		}
		ctx.fillStyle = text_color;
		ctx.font = '138px sans-serif';
		ctx.fillText(text, x, y+h, w);
		var l = document.getElementsByTagName("link")
		for ( i = 0 ; i < l.length ; i++ ){
			if ( l[i].rel == "shortcut icon" ){
				l[i].href = canvas.toDataURL("image/x-icon");
			}
		}
	}
}





function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}


function localize_number(number,currency) {

	number = Number(number);

	switch ( currency ) {

	case "USD":
	var output_number = number_format(number,2,".",",");
	break;

	default:
	var output_number = number_format(number,2,",",".");
	break;

	}
	return(output_number);
}



// jSortTable

function jSortTable(id,col,dir,pag){
	if ( dir == undefined ){
		dir = 1;
	}
	if ( typeof(pag) != 'undefined' ){
		var paginate = ", "+pag;
	}
	else {
		paginate = "";
	}
	var data = [];
	var r = 0;
	var theTable = document.getElementById(id);
	var theTRs = theTable.getElementsByTagName("tr");
	for ( x = r; x < theTRs.length; x++ ){
		var rowData = [];
		var theTDs = theTRs[x].getElementsByTagName("td");
		var theTHs = theTRs[x].getElementsByTagName("th");
		if ( theTHs.length >= 1 ){ r++; }
		else {
			for ( y = 0; y < theTDs.length; y++ ){
				rowData.push(theTDs[y].innerHTML);
			}
			data.push(rowData);
		}
	}

	var percPattern = /^[0-9.]+%$/;
	var numPattern = /^[0-9]+.*[0-9]*$/;
	var sortType;
	var votes = [];
	votes.alpha = 0;
	votes.num = 0;
	votes.date = 0;
	votes.perc = 0;
	for ( var t in data ){
		if (isNaN(data[t][col].replace(/<\/?[^>]+(>|$)/g, ""))){
			votes.alpha++;
		}
		if ( numPattern.test(data[t][col].replace(/<\/?[^>]+(>|$)/g, "")) === true ) {
			votes.num++;
		}
		if ( new Date(data[t][col].replace(/<\/?[^>]+(>|$)/g, "")) != "Invalid Date"  ){
			votes.date++;
		}
		if ( percPattern.test(data[t][col].replace(/<\/?[^>]+(>|$)/g, "")) === true ){
			votes.perc++;
		}
	}

	var sortType = Object.keys(votes).reduce(function(a, b){ return votes[a] > votes[b] ? a : b });

	switch (sortType){

	case "alpha":
	data.sort(function(a,b){
	  if(a[col].replace(/<\/?[^>]+(>|$)/g, "").toUpperCase() > b[col].replace(/<\/?[^>]+(>|$)/g, "").toUpperCase()) return 1*dir;
	  if(a[col].replace(/<\/?[^>]+(>|$)/g, "").toUpperCase() < b[col].replace(/<\/?[^>]+(>|$)/g, "").toUpperCase()) return -1*dir;
	  return 0;
	});
	break;

	case "date":
	data.sort(function(a,b) {
		return (new Date(a[col].replace(/<\/?[^>]+(>|$)/g, "")).getTime() - new Date(b[col].replace(/<\/?[^>]+(>|$)/g, "")).getTime())*dir;
	});
	break;

	default:
	data.sort(function(a,b) {
		return (parseFloat(a[col].replace(/<\/?[^>]+(>|$)/g, "")) - parseFloat(b[col].replace(/<\/?[^>]+(>|$)/g, "")))*dir;
	});
	break;

	}

	while ( theTRs.length > r ){
		theTable.deleteRow(r);
	}
	var rCount = 1;
	for ( var z in data ){
		var nTR = document.createElement("tr");
		if ( typeof(pag) != 'undefined' ){
			nTR.setAttribute("class","jSortRow jSortPage_"+Math.ceil(rCount/pag));
		}
		for ( var d in data[z] ){
		  var nTD = document.createElement("td");
		  nTD.innerHTML = data[z][d];
		  if ( d == col ) {
			nTD.setAttribute("class","jSortCol");
		  }
		  nTR.appendChild(nTD);
		}
	document.getElementById(id).appendChild(nTR);
	rCount++;
	}

	var headerCell = theTRs[r-1].getElementsByTagName("th");
	for ( l = 0 ; l < headerCell.length ; l++ ){
		var headerLink = headerCell[l].getElementsByTagName("a")[0];
		headerLink.setAttribute("onclick","jSortTable('"+id+"','"+l+"','"+dir*-1+"'"+paginate+");");

		if ( l == col ){
			if ( dir == 1 ){
				headerLink.setAttribute("class","jSortLink_d");
			}
			else {
				headerLink.setAttribute("class","jSortLink_u");
			}

		}
		else {
			headerLink.setAttribute("class","");

		}
	}
/*
	if ( typeof(pag) != 'undefined' && !document.getElementById(id+"_pages") ){
		var foot = document.createElement("tfoot");
			var tr = document.createElement("tr");
				tr.id = id+"pages_row";
				var td = document.createElement("td");
					td.setAttribute("colspan",headerCell.length);
					var s = document.createElement("select");
						s.id = id+"_pages";
					td.appendChild(s);
				tr.appendChild(td);
			foot.appendChild(tr);
		document.getElementById(id).appendChild(foot);
	}
*/
	if ( typeof(pag) != 'undefined' && document.getElementById(id+"_pages") ){
		document.getElementById(id+"_pages").innerHTML = "";
		document.getElementById(id+"_pages").setAttribute("onchange","jSortTablePage('"+id+"');");
		for ( sp = 1 ; sp <= Math.ceil(rCount/pag) ; sp++ ){
			var o = document.createElement("option");
				o.innerHTML = sp;
				document.getElementById(id+"_pages").appendChild(o);
		}
		jSortTablePage(id);
	}
}

function jSortTablePage(id){
	var sp = document.getElementById(id+"_pages").value;
	var tn = document.getElementById(id);
		var trs = tn.getElementsByTagName("tr");
		for ( x = 1 ; x < trs.length; x++ ){
			var checkClass = trs[x].className;
			if ( checkClass.search('jSortPage_'+sp) == -1 ){
				trs[x].style.display = "none";
			}
			else {
				trs[x].style.display = "table-row";
			}
		}
	//document.getElementById(id+"pages_row").style.display = "table-row";
}

function jSort_init(){
	var t = document.getElementsByClassName("jSort");
	for ( x = 0 ; x < t.length ; x++ ){
		if (t[x].id == "" ){
			var d = new Date();
			var app = d.getTime();
			t[x].id = "jSortTable_ID"+app;
		}
		var r = t[x].getElementsByTagName("tr");
		for ( y = 0 ; y < r.length ; y++ ){
			var c = r[y].getElementsByTagName("th");
			for ( z = 0 ; z < c.length ; z++ ){
				var a = document.createElement("a");
					a.innerHTML = c[z].innerHTML;
					a.href = "javascript:void(0);";
					a.setAttribute("onclick","jSortTable('"+t[x].id+"',"+z+")");
				//	a.setAttribute("class","jSortLink_d");
				c[z].innerHTML = "";
				c[z].appendChild(a);
			}
		}
	}
}



function smoothMove(id,i,d){
	if (typeof(i) == "undefined" ){ var i = 1; }
	if (typeof(d) == "undefined" ){ var d = 2; }
	var goFrom = document.body.scrollTop;
	var goTo = document.getElementById(id).offsetTop;
	if ( goFrom < goTo ){
		window.scrollTo(0,goFrom+i);
		var scrollDelay = setTimeout(function(){smoothMove(id);},d);
	}
}