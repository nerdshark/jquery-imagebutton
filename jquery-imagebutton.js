/*  
jQuery Image Button Plugin v0.1
Author: Dustin Mays (dustin.mays@uky.edu)
Date: 02/16/2010

This plugin automates the creation of image buttons, a problem that I found to be
absolutely baffling (due to the unnecessary complexity of example code and my
own lack of experience with HTML, CSS, and Javascript). 

ImageButton is very simple: it allows you to create a button using two static
images, which are transitioned between using fading opacity. The user
passes the plugin an optional associatve array with config options, which
then wraps each image inside div tags, finds the corresponding roll-over state 
image using the given prefix and/or suffix using regexps, wraps that image in
a div inside the first div, wraps both images in <a> tags if a url is passed,
and generates CSS and jQuery hover methods.

Example usage:
$(".myhoverimages").image_button({ speed: 700, orientation: "vertical", suffix: "_hover" });
*/

(function($) {
    $.fn.image_button = function(options) {
	var default_args = {
	    speed: 500,			// fade in/out speed
	    orientation: "horizontal",	// button layout, can be horizontal or vertical
	    //prefix: "",		// hover image differentiatior prefix
	    suffix: "_over",		// hover image differentiatior suffix
	    url: ""			// url to link to
        };
        
	// iterate through the default_args hash, and if the user hasn't passed an
	// overriding value in the options hash, use the default value
        for (var idx in default_args) {
            if (options[idx] === undefined) {
                options[idx] = default_args[idx];
            }
        } 

	// determine horizontal/vertical orientation of buttons and create style
	// accordingly
	if (options.orientation == "horizontal") {
	    var outer_style = 'style="position: relative; \
			      float: left"';
	} else {
	    var outer_style = 'style="position: relative"';
	}

	// the inner div has an inital transparency of 0, which means its hidden
	// until mouseover
	var inner_style = 'style="position: absolute; \
			   top: 0px; \
			   left: 0px; \
			   opacity: 0; \
			   filter: alpha(opacity=0); \
			   -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";';

	    

	// create the outer and inner divs
	// the css style of the inner div positions it
	// at the top left of the outer div, its parent,
	// so that buttons using normal and highlighted
	// images of the same size will have the highlighted
	// state image overlap the normal state image
	this.each(function () {	    
	    this.wrap('<div class="outer" ' + outer_style);

	    // generate url of highlighted image state
	    var regex_exp = "/.(png|jpg|jpeg|gif)$/";
	    var regexp = new RegExp(regex_exp);
	    var regex_out = RegExp.exec(this.attr("src"));
	    var new_suffix = options.suffix + "." +regex_out[0];
	    var hover_url = this.attr("src");
	    hover_url.replace(regex_exp, new_suffix);

	    this.parent().append('<div class="inner"' + inner_sytle + '><a href="' + options.url '"><img src="' + hover_url + '"></a></div>');
	});
	
	$(".outer").hover(function () {
	    $(".inner", this).stop(true, true).animate({ opacity: 1 }, options.speed);
	}, function () {
	    $(".inner", this).stop(true, true).animate({ opacity: 0 }, options.speed);
	});
    };
})(jQuery);

