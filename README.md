
<link rel="stylesheet" type="text/css" href="jLib.1_1.css" media="all">
<style>
* { font-family: Verdana, Arial, Sans-Serif; }
#header, #footer { background-color: #666; color: #fff; text-align:center;}
#content { background-color: #fff; overflow: auto;}
#content div { line-height: 1.5em; }
body { font-size: 14px; background-color: #ddd; }
.code { width: 80%; height: 75px; margin: 10px; padding: 10px; font: 12px Courier; color: lightgreen; overflow: auto; border: 1px dashed lightgreen; background-color: #000;}
ul { margin: 10px; }
li { margin: 10px 0 0 50px; }
</style>
<script>jFrame(1060,16,15,15);</script>
</HEAD>
<BODY onload="jDate_init();jSelect();jSort_init();jSortTable('jSortDEMO',0,1,10);">
<div id="container">
	<div id="header">
		<div class="col16">
			<h1>jLib.js</h1>
		</div>
	</div>
	<div id="content">

		<div class="col16">
			<a name="contents">
			<h3>Contents</h3>
			<ul>
				<li><a href='#version'>Version History</a></li>
				<li><a href='#whatis'>What is jLib?</a></li>
				<li><a href='#basestyles'>Base Styles</a></li>
				<li><a href='#jDate'>jDate: Datepicker Input</a></li>
				<li><a href='#jDateFormat'>jDateFormat: Date formatting function</a></li>
				<li><a href='#jSortTable'>jSortTable: Sortable tables</a></li>
				<li><a href='#jFrame'>jFrame: CSS Framework generation function</a></li>
				<li><a href='#jGraph'>jGraph: Column & Line graph generation</a></li>
				<li><a href='#jVal'>jVal: Form Validation Function</a></li>
				<li><a href='#jSelect'>jSelect: Custom select boxes</a></li>
				<li><a href='#jBubble'>jBubble: Notification function</a></li>
				<li><a href='#custom_alert'>custom_alert: Modern browser alers</a></li>
				<li><a href="#jHide-jShow">jHide &  jShow: transitional anmation function</a></li>
				<li><a href="#jProgress">jProgress: Ajax progress bar</a></li>
				<li><a href="#updateFavicon">updateFavicon: Dynamically change favicon</a></li>
				<li><a href="#jBlockToggle">jBlockToggle: Toggle display of object</a></li>
				<li><a href="#jFadeToggle">jFadeToggle: Toggle display of object with fade</a></li>
				<li><a href="#smoothMove">smoothMove: Scroll to element</a></li>
				<li><a href='#serializeForm'>serializeForm: serialize a form for Ajax posting</a></li>
				<li><a href='#setCookie'>setCookie & getCookie: Functions for accessing cookies</a></li>
				<li><a href='#ajaxGET'>ajaxGET: simple ajax call function</a></li>
			</ul>

		</div>

		<div class="col16">
			<a name="version">
			<h3>Version History</h3>
			<h4>New in version 1.1</h4>
			<p>Updates to jVal function:
				<ul>
					<li>Added wrapper routine to ensure proper placement of tooltip.</li>
					<li>Added !important to tooltip background property to avoid unintended inheritance.</li>
					<li>Updated jValForm function to also check select tags.</li>
					<li>Fixed issue in css for jVal tooltip style.</li>
				</ul>
			</p>
			<h4>New in version 1.0</h4>
			<p>First public release.  Technically everything is new.</p>
			<h5>Download:</h5>
			<p><a href="jLib.1_1.js" target="_blank">jLib.1_1.js</a>, <a href="jLib.1_1.min.js" target="_blank">Minified</a>.</p>
			<p><a href="jLib.1_1.css" target="_blank">jLib.1_0.css</a>, <a href="jLib.1_0.min.css" target="_blank">Minified</a>.</p>

		</div>

		<div class="col16">
			<a name="whatis">
			<h3>What is jLib.js?</h3>
			<p>jLib.js is a collection of javascript functions and CSS I've developed to solve specific problems I've encountered over the years.  As needs have changed, I've altered these functions to be more flexible to address a growing list of client needs.</p>
			<br/>
			<h3>Why not use jQuery or Bootstrap?</h3>
			<p>Initially, that's exactly what I did, but it never felt right.  Over time I realized that this feeling was caused by a few things...</p>
			<ul>
				<li>It felt like an additional layer of complexity that actually slowed me down.</li>
				<li>I didn't like the "Black Box" feel of not knowing what was in the libraries.  Sure I could read the code, but that seemed like a waste of my time.</li>
				<li>I learned enough javascript and css to make them feel like training wheels.</li>
			</ul>
			<br/>
			<h3>Why prefix everything with "j".  Are you trying to rip off jquery?</h3>
			<p>No.  I spent a lot of time trying to come up with a clever name, but in the end I just chose to use my first name initial. J as in Jeff, J as in Javascript.  Seemed natural.</p>
		</div>

		<div class="col16">
			<a name="basestyles">
			<h3>jLib CSS</h3>
			<div class="col16">
				<p>Structural CSS for elements created by jLib, as well as all custom animations, are included in the jLib CSS file.  These styles are intentionally left as basic as possible to allow for easier tailoring to client customization.  The jLib CSS file alos includes the following base css.</p>
			</div>
			<div class="col8">
				Text Input: <input type="text"><br/>
				Date Input: <input type="text" id="dinput" class="jDate"><br/>
				Select Input: <select name="sinput" id="sinput" class="jSelect">
					<option value=1>Option One</option>
					<option value=2>Option Two</option>
					<option value=3>Option Three</option>
				</select>
			</div>
			<div class="col4">
				Radio buttons:<br/>
				<input type="radio" name="rtest" id="rtest1" value="1"><label for="rtest1">One</label><br/>
				<input type="radio" name="rtest" id="rtest2" value="2"><label for="rtest2">Two</label><br/>
				<input type="radio" name="rtest" id="rtest3" value="3"><label for="rtest3">Three</label><br/>
			</div>
			<div class="col4">
				Checkboxes:<br/>
				<input type="checkbox" name="ctest1" id="ctest1" value="1"><label for="ctest1">One</label><br/>
				<input type="checkbox" name="ctest2" id="ctest2" value="2"><label for="ctest2">Two</label><br/>
				<input type="checkbox" name="ctest3" id="ctest3" value="3"><label for="ctest3">Three</label><br/>
			</div>
			<div style="display:block;width:100%;clear:both;"></div>
			<div class="col16">
				<h4>Alerts</h4>
				(Stolen from bootstrap with minor modifications)<br/>
				<div class="alert-success col4">.alert-success</div>
				<div class="alert-info col4">.alert-info</div>
				<div class="alert-warning col4">.alert-warning</div>
				<div class="alert-error col4">.alert-error</div>
				<div class="col16">
					<p>Note that these only include background color and font color.</p>
				</p>

			</div>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<h2>Included Functions</h2>
			<a name="jDate">
			<h3>jDate</h3>
			<p>jDate is my own implementation of a drop-down date picker.</p>
			<br>
			<h4>Usage</h4>
			<p>Onload, call the "jDate_init()" function.  Set the class of your input to "jDate" and the script will do the rest. Note, your text field must have an ID.  The below example uses the "readonly" property to avoid direct input, but this is optional.</p>
			<textarea readonly class="code"><input type="text" class="jDate" readonly></textarea><br/>
			<h4>Demo</h4>
			<input type="text" class="jDate" id="demo1" readonly>
			<br/>
			<br/>
			<h4>Options</h4>
			<p>You can configure the header display and the output via the below variables.  The letters used in the date format are based on the php date() method.</p>
			<ul>
				<li>d: day of month, 2 digit, leading zeros</li>
				<li>j: day of month, no leading zeros</li>
				<li>Y: full year ( 4 digits, until the year 10000)</li>
				<li>y: 2 digit version of year</li>
				<li>m: 2 digit month, leading zeros</li>
				<li>n: month number, no leading zeros</li>
				<li>w: numeric day of week, 0 - 6</li>
				<li>D: text day of week, 3 letters</li>
				<li>l: text day of week, full name</li>
				<li>N: text day of week, full name</li>
				<li>F: month name, full</li>
				<li>M: month name, 3 letter</li>
			</ul>
			<textarea readonly class="code">jDate_options['header'] = "F, Y";
jDate_options['format'] = "Y-m-d";</textarea>
			<h4>Styling</h4>
			<p>A minimal amount of css is injected to ensure the pickers are properly displayed.  For additional styling cascade down from class 'div.jDatePickerCalendar'.</p>
			<h4>Todo</h4>
			<p>Move internal variables such as day names and month names into settings for easier localization.  Include time if ever needed.</p>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jDateFormat">
			<h3>jDateFormat</h3>
			<p>The jDateFormat function is used in formatting the jDate picker, but can be used independantly.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">jDateFormat([year],[month],[day],[format]);</textarea>
			<h4>Demo</h4>
			If we pass (1970, 8, 18) and the format "F j, Y", we get the following:
			<script>
				document.write(jDateFormat(1970,8,18,"F  j, Y"));
			</script>
			<p>Note that standard javascript month numeration is expected (0-11).</p>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jSortTable">
			<h3>jSortTable</h3>
			<p>The jSortTable function will make your tables sortable by columns.</p>
			<h4>Usage</h4>
			<p>Set your table to use the class "jSort" and invoke the function "jSort_init()" on page load.  Your tables will now have clickable headers for sorting.  The following data types are supported:
			<ul>
				<li>Integer</li>
				<li>Float</li>
				<li>Percent</li>
				<li>Alphanumeric</li>
				<li>Date</li>
			</ul>
			</p>
			<p>Note: this function assumes you are using th tags for your headers.  It also assumes a single row of headers at position zero.</p>
			<h4>Demo</h4>
			<div class="col16">
				<!--Page: <select id="jSortDEMO_pages"></select>-->
				<table class="jSort" width="500px" id="jSortDEMO">
					<thead>
					  <tr>
						<th type="date">Date</th>
						<th>Stuff</th>
						<th>Things</th>
						<th>Food</th>
						<th>Percent</th>
						<th>Floats</th>
					  </tr>
					 </thead>
					 <tbody>
					  <tr>
						<td>Jun 7, 2016</td>
						<td>7</td>
						<td>4</td>
						<td>Pears</td>
						<td>33%</td>
						<td>12.7</td>
					  </tr>
					  <tr>
						<td>06/02/2016</td>
						<td>4</td>
						<td>8</td>
						<td>Apples</td>
						<td>99%</td>
						<td>37.0</td>
					  </tr>
					  <tr>
						<td>2016-06-03</td>
						<td>11</td>
						<td>5</td>
						<td>pizza</td>
						<td>75%</td>
						<td>234.22</td>
					  </tr>
					  <tr>
						<td>5/6/2016</td>
						<td>14</td>
						<td>14</td>
						<td>Ham</td>
						<td>14%</td>
						<td>123.456789</td>
					  </tr>
					  <tr>
						<td>2016-06-06</td>
						<td>18</td>
						<td>14</td>
						<td>bacon</td>
						<td>100%</td>
						<td>99.2434</td>
					  </tr>
					  <tr>
						<td>May 30, 2016</td>
						<td>9</td>
						<td>14</td>
						<td><a href='javascript:void(0);' onclick='alert("testing html tags");'>Toast</a></td>
						<td>55.56%</td>
						<td>72.44</td>
					  </tr>
					  <tr>
						<td>2016-06-08</td>
						<td>36</td>
						<td>22</td>
						<td>Cereal</td>
						<td>23%</td>
						<td>543.334</td>
					  </tr>
					  <tr>
						<td>2016-06-09</td>
						<td>4</td>
						<td>11</td>
						<td>Soup</td>
						<td>11%</td>
						<td>44.332</td>
					  </tr>
					  <tr>
						<td>2016-06-10</td>
						<td>22</td>
						<td>23</td>
						<td>Altoids</td>
						<td>43.8%</td>
						<td>543.5</td>
					  </tr>

						<tr>
						<td>9/18/1970</td>
						<td>44</td>
						<td>11</td>
						<td>Grapes</td>
						<td>6.89%</td>
						<td>98.775</td>
					  </tr>
					  <tr>
						<td>3-18-1984</td>
						<td>444</td>
						<td>32</td>
						<td>Steak</td>
						<td>55.5%</td>
						<td>0.889</td>
					  </tr>
					  <tr>
						<td>January 1, 1995</td>
						<td>44</td>
						<td>121</td>
						<td>Ice Cream</td>
						<td>41%</td>
						<td>73.55</td>
					  </tr>
					</tbody>
				</table>
				<br/>
				<p>If you would like to paginate the table, simply provide a select tag with an id equal to the id of the table plus the string "_pages".  The script will automatically populate the select and append the necessary function to support pagination.  Otherwise, all rows will be displayed.  Pagination is not part of the standard implimentation and will need to be initialized on a per table basis.  To do so, invoke the jSortTable function.  The arguments are: table id, sort column index, sort direction (1/0), and items per page.  For example, the below function will sort the table "jSortDemo" on column 0  by ascending value and paginating to 10 items per page.</p>
				<h4>Example</h4>
				<textarea class="code">jSortTable('jSortDEMO',0,1,10);</textarea><br/>
				<h4>Pagination Demo</h4>
				<select id="jSortDEMO_pages"></select>
			</div>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jFrame">
			<h3>jFrame</h3>
			<p>jFrame creates a grid based layout including a header and footer area.  Note that using a javascript generated css grid, while useful for determining an initial grid, is not the best solution for finalized pages.  Once you find a layout that fits your needs, it is reccomended you make a css file via the <a href='css_grid_generator.html'>css_grid_generator</a> tool.  This tool uses the same logic as the jFrame function, but instead outputs the css as text.  If you choose to use this function over a linked or inline css, make sure you call the function in the header to avoid the "layout jerk".</p><br/>
			<h4>Usage</h4>
			<p>In the header, after the jLib.js inclusion, call the jFrame function.</p>
			<textarea readonly class="code">jFrame([width],[columns],[padding],[margin]);</textarea>
			<h4>Inputs</h4>
			<ul>
				<li>Width: the total width of the grid.</li>
				<li>Columns: the total number of columns.</li>
				<li>Padding: the amount of padding to put in all col divs.</li>
				<li>Margin: the amount of margin to apply to all col divs.</li>
			</li>
			<h4>Results</h4>
			<ul>
				<li>Injected css for the following IDs:</li>
				<ul>
					<li>#container</li>
					<li>#header</li>
					<li>#content</li>
					<li>#footer</li>
				</ul>
				<li>Injected css for the number of specified columns.  These are classes named "col[x]" where [x] = the number of columns you'd like the div to span.</li>
			</ul>
			<h4>Demo</h4>
			<p>This page is using a framework generated by the below call.</p>
			<textarea readonly class="code">jFrame(1060,16,15,15);</textarea><br/>
			<p>Note that this can also be called after page load.  I don't know why you'd want to, but it is possible.  Click the following links to apply the new grids.</p>
			<ul>
					<li><a href="javascript:void(0);" onclick="jFrame(1060,16,15,15);">jFrame(1060,16,15,15);</a> (Page Default)</li>
					<li><a href="javascript:void(0);" onclick="jFrame(900,16,15,15);">jFrame(900,16,15,15);</a></li>
					<li><a href="javascript:void(0);" onclick="jFrame(800,16,10,5);">jFrame(800,16,10,5);</a></li>
					<li><a href="javascript:void(0);" onclick="jFrame(1060,16,5,5);">jFrame(1060,16,5,5);</a></li>
					<li><a href="javascript:void(0);" onclick="jFrame(920,16,0,0);">jFrame(920,16,0,0);</a></li>
			</ul>
		</div>
		<div class="col16">
			<h4>Examples</h4>
			<p>Below are examples of the grid in action.  Note that the classes can be nested 3 levels deep.</p>
		</div>
		<div class="col16" style="background-color:#ddd;">col16</div>
		<div class="col8" style="background-color:#ddd;">col8</div>
		<div class="col4" style="background-color:#ddd;">col4</div>
		<div class="col2" style="background-color:#ddd;">col2</div>
		<div class="col2" style="background-color:#ddd;">col2</div>


		<div class="col3" style="background-color:#ddd;">col3</div>
		<div class="col4" style="background-color:#ddd;">col4</div>
		<div class="col5" style="background-color:#ddd;">col5</div>
		<div class="col4" style="background-color:#ddd;">col4</div>

		<div class="col8" style="background-color:#ddd;">
		col8<br/>
			<div class="col4" style="background-color:#ccc;">col4<br/>
				<div class="col2" style="background-color:#ddd;">col2</div>
				<div class="col2" style="background-color:#ddd;">col2</div>
			</div>
			<div class="col4" style="background-color:#ccc;">col4</div>
		</div>
		<div class="col8" style="background-color:#ddd;">col8</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jGraph">
			<h3>jGraph</h3>
			<p>jGraph is a canvas based graphing function.</p>
			<h4>Inputs</h3>
			<p>jGraph accepts 2 inputs: the options array and the data array.  The options array is initialized by the script, so you only need to set values that differ from the results.</p>
			<p>The data array is a standard javascript array structure where the first element represents your headers</p>
			<textarea readonly class="code">
var graphData = new Array (
	["Date", "clicks"],
	["2013-01-10" , 900],
	["2013-01-11" , 715],
	["2013-01-12" , 600],
	["2013-01-13" , 400]
	);
</textarea>
		<p>There are many options in the settings array.</p>
		<textarea readonly class="code" style="height:640px;">
var jGraphSettings = new Array();
jGraphSettings['type'] = "column"; // graph type options: line, column
jGraphSettings['id'] = "graph"; // div id to inject graph
jGraphSettings['prefix'] = "$"; // unit jGraphSettings['prefix']
jGraphSettings['suffix'] = ""; // unit jGraphSettings['suffix']
jGraphSettings['paddingTop'] = 10; // pixel padding above graph area
jGraphSettings['paddingRight'] = 20; // pixel padding to right of graph area
jGraphSettings['paddingBottom'] = 50; // pixel padding on bottom of graph area, does not include legend
jGraphSettings['paddingLeft'] = 54; // pixel padding on left of graph area, does not include legend
jGraphSettings['canvasHeight'] = 400; // width of graph
jGraphSettings['canvasWidth'] = 800; // height of graph
jGraphSettings['lineColor'] = new Array();
jGraphSettings['lineColor'][0] = "black"; // color of lines
jGraphSettings['lineWidth'] = 1; // width of lines
jGraphSettings['pointColor'] = new Array();
jGraphSettings['pointColor'][0] = "red"; // color of points
jGraphSettings['pointSize'] = 3; // radius of points in pixels, actual width will be double.
jGraphSettings['pointShadowColor'] = "transparent";	// color of point shadows.
jGraphSettings['columnWidth'] = 80; // Column width percentage, 100 = no gaps between columns
jGraphSettings['columnStroke'] = new Array();
jGraphSettings['columnStroke'][0] = "#333333"; // Column stroke color
jGraphSettings['columnGradStart'] = new Array();
jGraphSettings['columnGradStart'][0] = "#FAFAFA";// Column gradient color start
jGraphSettings['columnGradEnd'] = new Array();
jGraphSettings['columnGradEnd'][0] = "#A0A0A0";// Column gradient color end
jGraphSettings['columnShadowColor'] = "#333333";// color of column shadows.
jGraphSettings['hLines'] = 12; // horizontal gridlines
jGraphSettings['hLinesColor'] = "#999999"; // color of horizontal gridlines
jGraphSettings['hLinesWidth'] = 1; // width of horizontal gridlines
jGraphSettings['vLinesColor'] = "#999999"; // color of vertical gridlines
jGraphSettings['vLinesWidth'] = 1; // width of vertical gridlines
jGraphSettings['hBaseColor'] = "#222222"; // color of horizontal baseline
jGraphSettings['hBaseWidth'] = 2; // width of horizontal baseline
jGraphSettings['vBaseColor'] = "#222222"; // color of vertical baseline
jGraphSettings['vBaseWidth'] = 2; // width of vertical baseline
jGraphSettings['bGradBegin'] = "white"; // background gradient start color
jGraphSettings['bGradEnd'] = "white"; // background gradient end color
jGraphSettings['textColor'] = "#333333"; // color of text
jGraphSettings['textFont'] = "Verdana"; // font used for text
jGraphSettings['textSize'] = 10; // pixel size of text
jGraphSettings['textShadowColor'] = "#CCCCCC"; // color of text shadow - used only in tooltip layer
jGraphSettings['vLabelText'] = "Vertical Label"; // Vertical Text Below Graph
jGraphSettings['vLabelSize'] = 12; // Size of Vertical Text Below Graph
jGraphSettings['hLabelText'] = "Horizontal Label"; // Horizontal Text Beside Graph
jGraphSettings['hLabelSize'] = 12; // Size of Horizontal Text Beside Graph
jGraphSettings['layer'] = 1; // what action invokes number layer (0 = hover, 1 = click)
		</textarea>
		<p>You can override any of these settings in your code.  Note that the override must be placed after the jLib.js inclusion.</p>
		<h4>Demo</h4>
		<div id="graph"></div>
<script>
var graphData = new Array (
	["Date", "clicks"],
	["2013-01-10" , 900],
	["2013-01-11" , 715],
	["2013-01-12" , 600],
	["2013-01-13" , 400]
	);
jGraph(jGraphSettings,graphData);
</script>

		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jVal">
			<h3>jVal</h3>
			<p>jVal is a form field validation function.</p>
			<h4>Usage</h4>
			<p>Validation type and trigger are determined by attributes on the field tag.  For example, below is the code for the email address field from the demo section below.</p>
			<textarea readonly class="code"><input name="email" type="text" jVal-type="email,length" min=6 max=14 jVal-text="Please enter a valid email." onkeyup="jVal(this);"></textarea>
			<p>This example validates against an email address of length between 6 and 14 characters.  They example triggers the validation on keyup, but this can be any valid event.</p>
			<h4>Attribute Definitions</h4>
			<p>jVal-type:</p>
			<ul>
				<li>email</li>
				<li>notBlank</li>
				<li>password</li>
				<li>compare</li>
				<li>date</li>
				<li>extension</li>
				<li>range</li>
				<li>phone</li>
				<li>length</li>
				<li>url</li>
				<li>alphabetic</li>
				<li>alphanumeric</li>
				<li>numeric</li>
			</ul>
			<p>jVal-comp: This attribute is used in combination with the "compare" jVal-type.  It represents the id of the field to compare with.</p>
			<p>jVal-format: This attribute is used as a second layer of data validation and/or formatting.  It is currently used with 2 different jVal-types.</p>
			<ul>
				<li>phone</li>
				<ol>
					<li>INT: "+## ## #### ####"</li>
					<li>default: "(###)###-####"</li>
				</ol>
				<li>date (not used since creation of date picker)</li>
				<ol>
					<li>"YYYY/MM/DD"</li>
					<li>"DD/MM/YYYY"</li>
					<li>default, "MM/DD/YYYY"</li>
				</ol>
			</ul>
			<p>min: minimum value.  This is used in combination with the "range" jVal-type.</p>
			<p>max: maximum value.  This is used in combination with the "range" jVal-type.</p>
			<p>jVal-text: Text to display if validation fails.</p>
			<p>jVal-rule: This determines the "strictness" of the validation.  Options are...</p>
			<ul>
				<li>strict: on fail display warning, return -1, this will also disable the submit button of the parent form.</li>
				<li>warn: on fail display warning, return 0</li>
				<li>silent: on fail do not display warning, return 0</li>
			</ul>
			<p>Passing validation will always return 1.</p>
			<h4>Return data</h4>
			<p>the jVal function returns the following data structure as a json object:</p>
			<textarea readonly class="code" style="height:100px;">
	//	jValResponse.value	= The value of the field being validated.
	//	jValResponse.type	= The type of validation being used.
	//	jValResponse.result	= Validation result.  See rule 7 above.
	//	jValResponse.valid	= Acceptable values used in validation.
	//	jValResponse.min	= Minimum value.
	//	jValResponse.max	= Maximum value.
	//	jValResponse.format	= Acceptable data format.
			</textarea>
			<h4>Additional notes</h4>
			<p>The class "validationFail" is added to the input upon failure.  No styling for this class is injected by default.</p>
			<p>"phone" type validation will reformat the number as it is entered.</p>
			<p>jVal-type can include multiple, comma separated types.  for example</p>
			<textarea readonly class="code"><input name="email2" type="text" jVal-type="email,length" min=20 max=30 jVal-text="Please enter an email address between 20 and 30 characters." onkeyup="jVal(this);"></textarea>
			<p>This input is live in the demo below.  See the field "Email between 20 and 30 characters"</p>
			<h4>Demo</h4>
			<form name="testform" onsubmit="return jValForm(this);" method="POST">
				<table>
					<tr>
						<td>Email Address</td>
						<td><input name="email" type="text" jVal-type="email,length" min=6 max=14 jVal-text="Please enter a valid email." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Not Blank</td>
						<td><input name="notblank" type="text" jVal-type="notBlank" jVal-text="This field cannot be blank." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Password</td>
						<td><input name="password" type="text" id="form_password" jVal-type="password" jVal-text="Passwords must be at least 8 characters long and contain at least one lowercase letter, uppercase letter, number and special character." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Compare to Password</td>
						<td><input name="password2" type="text" jVal-type="compare" jVal-comp="form_password" jVal-text="This field must match the password field." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Phone Number</td>
						<td><input name="phone" type="text" jVal-type="phone" jVal-format="us" jVal-text="Please enter a valid phone number." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Range</td>
						<td><input name="range" type="text" jVal-type="range" min=4 max=10 jVal-text="Please enter a number between 4 and 10." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Filetype</td>
						<td><input name="file" type="text" jVal-type="extension" data-ext=".jpg,.gif,.png" jVal-text="Please enter a valid image." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Length</td>
						<td><input name="sometext" type="text" jVal-type="length" min=5 max=6 jVal-text="Please enter 5-6 characters." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Alphabetic</td>
						<td><input name="alpha" type="text" jVal-type="alpha" jVal-text="This must be a alphabetic." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Alphanumeric</td>
						<td><input name="alphanum" type="text" jVal-type="alphanum" jVal-text="This must be a alphanumeric." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Numeric</td>
						<td><input name="num" type="text" jVal-type="numeric" jVal-text="This must be a numeric." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>URL</td>
						<td><input name="url" type="text" jVal-type="url" jVal-text="Please enter a valid url." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Date</td>
						<td><input name="date" type="text" jVal-type="date" jVal-format="YYYY/MM/DD" jVal-text="Please enter a valid date using format YYYY/MM/DD." onkeyup="jVal(this);"></td>
					</tr>
					<tr>
						<td>Email between 20 and 30 characters</td>
						<td><input name="email2" type="text" jVal-type="email,length" min=20 max=30 jVal-text="Please enter and email address longer than 20 characters." onkeyup="jVal(this);"></td>
					</tr>
				</table>
				<input name="the_submit_button" type="submit" value="submit">
			</form>
			<br/>
			<h3>jValForm</h3>
			<p>This function can be used to validate an entire form in one call.  It is typically used via the onsubmit action.  It is used on the demo form above.  Note that, at this time it is not ready for production use.</p>
			<textarea readonly class="code"><form name="testform" onsubmit="return jValForm(this);" method="POST"></textarea>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jSelect">
			<h3>jSelect</h3>
			<p>jSelect will replace select tags with a div-based dropdown menu.  This will allow you to apply custom styles to dropdown menus that will work across all browsers.  To do this, add the class "jSelect" to your select inputs and call the jSelect() function.</p>
			<h4>Demo</h4>
			<select name="demos" id="demos" class="jSelect">
				<option value=1>One</option>
				<option value=2>Two</option>
				<option value=3>Three</option>
			</select>
			<p>Note that the original select is still used in form submission.  The div-based select is used to control the value of the original select.</p>
			<a href='javascript:void(0);' onmouseover='document.getElementById("demos").style.display="inline";' onmouseout='document.getElementById("demos").style.display="none";'>Show original select</a>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jBubble">
			<h3>jBubble</h3>
			<p>jBubble is an alert system which will display a temporary message in the lower right-hand side of the screen.  The message will "bubble" up, meaning it will gradually drift upward and fade away.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">jBubble('message text');</textarea>
			<h4>Demo</h4>
			<input type="button" onclick="jBubble('This is a demonstration message.  How fun!');" value="Spawn bubble">
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="custom_alert">
			<h3>custom_alert</h3>
			<p>custom_alert is a function that will display browser alerts in stylable alert windows similar to those found in operating systems.</p>
			<h4>Usage</h4>
			<p>The simplest usage is to simply decalare a message when invoking the function.  Dismiss button defaults to text "OK".</p>
			<textarea readonly class="code"><input type="button" value="demo simple usage" onclick="custom_alert('This demonstrates simple usage.');"></textarea><br/>
			<input type="button" value="demo simple usage" onclick="custom_alert('This demonstrates simple usage.');">
			<h4>Advanced Usage</h4>
			<p>You can also define custom button text and define each buttons' callback function.  Define your message and callbacks in the below array format.  Then call the function.</p>
			<textarea readonly class="code" style="height:200px;">
var alert1 = {
	message : "This is an example custom alert.  You can customize: <ul style='text-align:left;margin-left:200px;'><li>The message text</li><li>The Button Text</li><li>The button callbacks</li></ul>",
	button_confirm : {
		text: "Confirm",
		callback: "alert('this is a callback for the confirm button.');"
	},
	button_cancel: {
		text: "Cancel",
		callback: "alert('this is a callback for the cancel button.');"
	},
}
custom_alert(alert1);
			</textarea>
			<h4>Demo</h4>
<script>
var alert1 = {
	message : "This is an example custom alert.  You can customize: <ul style='text-align:left;margin-left:200px;'><li>The message text</li><li>The Button Text</li><li>The button callbacks</li></ul>",
	button_confirm : {
		text: "Confirm",
		callback: "alert('this is a callback for the confirm button.');"
	},
	button_cancel: {
		text: "Cancel",
		callback: "alert('this is a callback for the cancel button.');"
	},
}
</script>
			<input type="button" onclick="custom_alert(alert1);" value="demo advanced usage">
		<h4>Options</h4>
		<p>The invoke and dismiss animations can be customized via css classes.  You can define the classes via the below variable names.  The defaults classes are also shown in this example.</p>
		<textarea readonly class='code' style="height:50px;">
var JFX_alert_invoke = "JFX_fadeIn";
var JFX_alert_dismiss = "JFX_fadeOut";
		</textarea>
		<p>The following classes are part of the jLib.css file and are available for use with alerts:
		<ul>
			<li>JFX_popIn</li>
			<li>JFX_shrinkOut</li>
			<li>JFX_spinIn</li>
			<li>JFX_spinOut</li>
			<li>JFX_implode</li>
			<li>JFX_explode</li>
			<li>JFX_fadeIn</li>
			<li>JFX_fadeOut</li>
			<li>JFX_vShow</li>
			<li>JFX_vHide</li>
			<li>JFX_hShow</li>
			<li>JFX_hHide</li>
		</ul>
		</p>
		<h4>Demo</h4>
		Invoke style: <select name='demoInvoke' id='demoInvoke' onchange='JFX_alert_invoke = this.value;' class="jSelect">
						<option value="JFX_fadeIn">JFX_fadeIn</option>
						<option value="JFX_spinIn">JFX_spinIn</option>
						<option value="JFX_popIn">JFX_popIn</option>
						<option value="JFX_implode">JFX_implode</option>
						<option value="JFX_vShow">JFX_vShow</option>
						<option value="JFX_hShow">JFX_hShow</option>
					</select>
		Dismiss style: <select name="demoDismiss" id='demoDismiss' onchange='JFX_alert_dismiss = this.value;' class="jSelect">
						<option value="JFX_fadeOut">JFX_fadeOut</option>
						<option value="JFX_spinOut">JFX_spinOut</option>
						<option value="JFX_shrinkOut">JFX_shrinkOut</option>
						<option value="JFX_explode">JFX_explode</option>
						<option value="JFX_vHide">JFX_vHide</option>
						<option value="JFX_hHide">JFX_hHide</option>
					</select>
		<input type="button" onclick="custom_alert(alert1);" value="Trigger Custom Alert">

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jHide-jShow">
			<h3>jHide & jShow</h3>
			<p>The animations used in the custom_alert function can be used with any element via the jHide and jShow functions.  Both functions apply a class to an element. jHide also allows for the removal of the provided element by passing TRUE for the "kill" argument.  The jShow function will apply the display=block style to the provided element.  if you wish to apply the transition to a class, simply prepend a period to the name, otherwise the argument is treated as an id.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">
jShow(id,useclass);
jHide(id,useclass,kill);
			</textarea>
			<h4>Demo</h4>
			<div class="col16">
				<input type="button" onclick="jHide('test1','JFX_fadeOut col3 exampleDiv')" value="jHide id: test1">
				<input type="button" onclick="jShow('test1','JFX_fadeIn col3 exampleDiv')" value="jShow id: test1">
				<input type="button" onclick="jHide('.exampleDiv','JFX_fadeOut col3 exampleDiv')" value="jHide class: exampleDiv">
				<input type="button" onclick="jShow('.exampleDiv','JFX_fadeIn col3 exampleDiv')" value="jShow class: exampleDiv"><br/>
				<div class="col3 exampleDiv" id="test1" style="border: 1px solid #000;">id:test1</div>
				<div class="col3 exampleDiv" id="test2" style="border: 1px solid #000;">id:test2</div>
				<div class="col3 exampleDiv" id="test3" style="border: 1px solid #000;">id:test3</div>
				<div class="col3 exampleDiv" id="test4" style="border: 1px solid #000;">id:test4</div>
				<div class="col3 exampleDiv" id="test5" style="border: 1px solid #000;">id:test5</div>

			</div>
			<p>Both the jHide and jShow functions are leveraged in the custom_alert function.  Please note that these functions replace all existing classes.  If there are any classes you wish to preserve throught the transition, they should be included in the classes passed into the function.  For example, the function call for the "jHide id: test1" button is as below:</p>
			<textarea readonly class="code"><input type="button" onclick="jHide('test1','JFX_fadeOut col3 exampleDiv')" value="jHide id: test1"></textarea>
			<p>Note how, in addition to the transition class "JFX_fadeOut", the "col3" and "exampleDiv" classes are also included.</p>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jProgress">
			<h3>jProgress</h3>
			<p>jProgress is a loading bar which displays progress of pending ajax requests. It does not need to be invoked as it is loaded by default.  The invoke and dismiss styles can be configured similar to the custom_alert via the below variable names.</p>
			<textarea readonly class="code">
var JFX_progress_invoke = "JFX_fadeIn";
var JFX_progress_dismiss = "JFX_fadeOut";
var JFX_progress_bar_color = "#666";
			</textarea>
			<p>Further styling can be accomplished via css.  If you want an ajax call to not be tracked by this progress bar, simply add the property "noTrack" with the value true.</p>
			<h4>Demo</h4>
			<input type="button" onclick="ajaxGET('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPBrIUqQAAAAA5JREFUeJxjYBgFgwkAAAGQAAHTuxD+AAAAAElFTkSuQmCC','');" value="Send Ajax Request">
			<p>Note: demo "fake" ajax request not supported by all browsers.</p>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="jBlockToggle">
			<h3>jBlockToggle</h3>
			<p>jBlockToggle is another css transition function used by jProgress.  It toggles the given id between display: block and display:none.</p>
			<textarea readonly class="code" id="blockToggleExample" style="display:block;">
jBlockToggle(id);
			</textarea>
			<h4>Demo</h4>
			<input type="button" value="Toggle example code" onclick="jBlockToggle('blockToggleExample');">
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>


		<div class="col16">
			<a name="jFadeToggle">
			<h3>jFadeToggle</h3>
			<p>jFadeToggle is another css transition function used by jProgress.  It toggles the given id between display: block and display:none with a fadein/fadeout animation.</p>
			<textarea readonly class="code" id="fadeToggleExample" style="display:block;">
jFadeToggle(id);
			</textarea>
			<h4>Demo</h4>
			<input type="button" value="Toggle example code" onclick="jFadeToggle('fadeToggleExample');">
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>


		<div class="col16">
			<a name="smoothMove">
			<h3>smoothMove</h3>
			Documentation Needed.
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>


		<div class="col16">
			<a name="updateFavicon">
			<h3>updateFavicon</h3>
			<p>updateFavicon will dynamically update a favicon image.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">updateFavicon(image,text,text_color,back_color,placement);</textarea>
			<h4>Parameters</h4>
			<ul>
				<li>image: url of image.</li>
				<li>text: text to superimpose</li>
				<li>text_color: color of supermiposed text</li>
				<li>back_color: optional, paint blank space behind text</li>
				<li>placement: where to place text. 0 = center, 1 = top left, 2 = top right, 3 = bottom left, 4 = bottom right</li>
			</ul>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="serializeForm">
			<h3>serializeForm</h3>
			<p>serializeForm is a function to serialize a form.  Since I stopped using jQuery, I needed to create my own function to do this.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">var formdata = serializeForm(formID);</textarea>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="getVar">
			<h3>getVar</h3>
			<p>getVar is a function to access GET variablues in the URL.  The usage example below assigns the get parameter "name" to the javascript variable "name".</p>
			<h4>Usage</h4>
			<textarea readonly class="code">var name = getVar('name');</textarea>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="setCookie">
			<h3>setCookie & getCookie</h3>
			<p>setCookie and getCookie are functions to read and write cookies.</p>
			<h4>Usage</h4>
			<textarea readonly class="code">setCookie(cname, cvalue, exdays);
var cookieVal = getCookie(cname);</textarea>
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

		<div class="col16">
			<a name="ajaxGET">
			<h3>ajaxGET</h3>
			<p>ajaxGET is a simple function for making a quick ajax call.</p>
			<textarea readonly class="code">ajaxGET(url,format);</textarea>
			<h4>Usage</h4>
			<p>url = the ajax url, format = "json" or "".
		</div>

		<div class="col16"><a href='#content'>Back to contents</a></div>

	</div>

	<div id="footer">
		2016 Jeff Ulicny
	</div>
</div>
</BODY>
</HTML>
