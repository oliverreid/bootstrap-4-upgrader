#! /usr/bin/env node



console.log('Starting the upgrade...');

var exec = require('child_process').exec;
const fs = require('fs');
var DOMParser = require('xmldom').DOMParser;

var jsdom = require('jsdom').jsdom;
 var document = jsdom('<html></html>', {});
 var window = document.defaultView;
 var $ = require('jquery')(window);


function replaceClass(content, oldClass, newClass){
	var regex = new RegExp('(class="|class=".*[ \'])'+oldClass+'("|[ \'].*")', 'gi')
	return content.replace(regex ,'$1'+newClass+'$2')
}

var RULESET = [
          
    {
      title: "Fix Button  Classes",
      description: "Renamed <code>.btn-default</code> to <code>.btn-secondary</code>, dropped classes <code>.btn-xs</code>, <code>.btn-group-xs</code>",
      run: function(doc) {

      	doc = replaceClass(doc, 'btn-default', 'btn-secondary')
      	doc = replaceClass(doc, 'btn-xs', '')
      	doc = replaceClass(doc, 'btn-group-xs', '')
      	doc = replaceClass(doc, 'badge', 'tag tag-pill')
      	doc = replaceClass(doc, 'badge-large', 'tag-pill-large')
      	doc = replaceClass(doc, 'badge-reverse', 'tag-pill-reverse')
      	doc = replaceClass(doc, 'badge-default', 'tag-pill-default')
      	doc = replaceClass(doc, 'badge-primary', 'tag-pill-primary')
      	doc = replaceClass(doc, 'badge-success', 'tag-pill-success')
      	doc = replaceClass(doc, 'badge-info', 'tag-pill-info')
      	doc = replaceClass(doc, 'badge-warning', 'tag-pill-warning')
      	doc = replaceClass(doc, 'badge-danger', 'tag-pill-danger')
      	doc = replaceClass(doc, 'label', 'tag')
      	doc = replaceClass(doc, 'label-primary', 'tag-primary')
      	doc = replaceClass(doc, 'label-default', 'tag-default')
      	doc = replaceClass(doc, 'label-default', 'tag-success')
      	doc = replaceClass(doc, 'label-default', 'tag-info')
      	doc = replaceClass(doc, 'label-default', 'tag-warning')
      	doc = replaceClass(doc, 'label-default', 'tag-danger')
      	return doc;
 
      }
    }, 
	  {
      title: "Navbar",
      description: "Dropped the <code>.navbar-form</code> class entirely. It’s no longer necessary.",
      run: function(doc) {
      		doc = replaceClass(doc, 'navbar-form', '')
			doc = replaceClass(doc, 'navbar-toggle', 'navbar-toggler')
      		return doc;
      }
    }, 
	{
      title: "Fix Images Classes",
      description: "Renamed <code class=\"highlighter-rouge\">.img-responsive</code> to <code class=\"highlighter-rouge\">.img-fluid</code>.",
      run: function(doc) {
		doc = replaceClass(doc, 'img-responsive', 'img-fluid')
		return doc;
      }
    },
    
    {
      title: "Pager",
      description: "Renamed <code>.previous</code> and <code>.next</code> to <code>.pager-prev</code> and <code>.pager-next</code>.",
      run: function(doc) {
			doc = replaceClass(doc, 'previous', 'pager-prev')
			doc = replaceClass(doc, 'next', 'pager-next')
			return doc;
      }
    }, 
	   
    {
      title: "Tables",
      description: "Renamed <code>.table-condensed</code> to <code>.table-sm</code> for consistency.",
	  run: function(doc) {
        doc = replaceClass(doc, 'table-condensed', 'table-sm')     
        return doc;   
      }
     
    },
    
    {
      title: "Panels, thumbnails, and wells",
      description: "Dropped entirely for the new card component.",
      run: function(doc) {
       
		doc = replaceClass(doc, 'panel-default', '')
		
		doc = replaceClass(doc, 'thumbnail', 'card')
		doc = replaceClass(doc, 'panel-heading', 'card-header')
		doc = replaceClass(doc, 'panel-title', 'card-title')
		doc = replaceClass(doc, 'panel-body', 'card-block')
		doc = replaceClass(doc, 'panel-footer', 'card-footer')
		doc = replaceClass(doc, 'panel-secondary', 'card-secondary')
		doc = replaceClass(doc, 'panel-rules-container', 'card-rules-container')
		doc = replaceClass(doc, 'panel-success', 'card-success')
		doc = replaceClass(doc, 'panel-primary', 'card-primary')
		doc = replaceClass(doc, 'panel-success', 'card-success')
		doc = replaceClass(doc, 'panel-info', 'card-info')
		doc = replaceClass(doc, 'panel-warning', 'card-warning')
		doc = replaceClass(doc, 'panel-danger', 'card-danger')
		doc = replaceClass(doc, 'panel', 'card')
     	return doc;
      }
    },
    
    {
      	title: "Utilities",
      	description: "Removed <code>.pull-left</code> and <code>.pull-right</code> since they’re redundant to <code>.pull-xs-left</code> and <code>.pull-xs-right</code>",
      	run: function (doc) {
			doc = replaceClass(doc, 'pull-left', 'float-xs-left')
			doc = replaceClass(doc, 'pull-right', 'float-xs-right')
			return doc;
	   }
    }, 
	{
      title: "Responsive utilities",
      description: "The old classes (<code class=\"highlighter-rouge\">.hidden-xs</code> <code class=\"highlighter-rouge\">.hidden-sm</code> <code class=\"highlighter-rouge\">.hidden-md</code> <code class=\"highlighter-rouge\">.hidden-lg</code> <code class=\"highlighter-rouge\">.visible-xs-block</code> <code class=\"highlighter-rouge\">.visible-xs-inline</code> <code class=\"highlighter-rouge\">.visible-xs-inline-block</code> <code class=\"highlighter-rouge\">.visible-sm-block</code> <code class=\"highlighter-rouge\">.visible-sm-inline</code> <code class=\"highlighter-rouge\">.visible-sm-inline-block</code> <code class=\"highlighter-rouge\">.visible-md-block</code> <code class=\"highlighter-rouge\">.visible-md-inline</code> <code class=\"highlighter-rouge\">.visible-md-inline-block</code> <code class=\"highlighter-rouge\">.visible-lg-block</code> <code class=\"highlighter-rouge\">.visible-lg-inline</code> <code class=\"highlighter-rouge\">.visible-lg-inline-block</code>) are gone. The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-down</code> classes hide the element when the viewport is at the given breakpoint or smaller (e.g. <code class=\"highlighter-rouge\">.hidden-md-down</code> hides an element on extra-small, small, and medium devices). <p>Rather than using explicit <code class=\"highlighter-rouge\">.visible-*</code> classes, you make an element visible by simply not hiding it at that screen size. You can combine one <code class=\"highlighter-rouge\">.hidden-*-up</code> class with one <code class=\"highlighter-rouge\">.hidden-*-down</code> class to show an element only on a given interval of screen sizes (e.g. <code class=\"highlighter-rouge\">.hidden-sm-down.hidden-xl-up</code> shows the element only on medium and large devices).</p> <p>Note that the changes to the grid breakpoints in v4 means that you’ll need to go one breakpoint larger to achieve the same results (e.g. <code class=\"highlighter-rouge\">.hidden-md</code> is more similar to <code class=\"highlighter-rouge\">.hidden-lg-down</code> than to <code class=\"highlighter-rouge\">.hidden-md-down</code>). The new responsive utility classes don’t attempt to accommodate less common cases where an element’s visibility can’t be expressed as a single contiguous range of viewport sizes; you will instead need to use custom CSS in such cases.</p>",
      run: function (doc) {
		doc = replaceClass(doc, 'hidden-xs', 'hidden-xs-up')
		doc = replaceClass(doc, 'hidden-sm', 'hidden-sm-up')
		doc = replaceClass(doc, 'hidden-md', 'hidden-md-up')
		doc = replaceClass(doc, 'hidden-lg', 'hidden-lg-up')
		return doc;
      }
    },

    {
      title: "Fix text classes",
      description: "",
      run: function(doc) {
  		doc = replaceClass(doc, 'text-help', 'form-control-feedback')
  		doc = replaceClass(doc, 'text-center', 'text-xs-center')
  		doc = replaceClass(doc, 'text-right', 'text-xs-right')
  		return doc;
      }
    },

    {
      title: "Fix offset and push classes",
      description: "",
      run: function(doc) {
        
        return doc
        .replace(/col-md-offset/, "offset-md")
        .replace(/col-lg-offset/, "offset-lg")
        .replace(/col-xs-offset/, "offset-xs")
        .replace(/col-sm-offset/, "offset-sm")
        .replace(/col-md-push/, "push-md")
        .replace(/col-lg-push/, "push-lg")
        .replace(/col-xs-push/, "push-xs")
        .replace(/col-sm-push/, "push-sm")
        .replace(/col-md-pull/, "pull-md")
        .replace(/col-lg-pull/, "pull-lg")
        .replace(/col-xs-pull/, "pull-xs")
        .replace(/col-sm-pull/, "pull-sm");

      }
    }
  
  ];
  
  var Upgrader = {
    rules: RULESET,
    perform: function(input, report) {
      let doc = input

      for (let i = 0; i < Upgrader.rules.length; i++) {
        let rule = Upgrader.rules[i];
        doc = rule.run(doc);
      }
      return doc;
      
    }
  }


/*Udpate Html files*/
 exec('find ./ -name "*.html"', function(err, stdout, stderr) {
 	let files = stdout.split('\n')
 	console.log('reading html files ================================================================')

 	for (let i = files.length - 1; i >= 0; i--) {
 		if(files[i].length > 0){
 			console.log(`reading file '${files[i]}'`)
 			let fileName = files[i].replace('\r', '')
	 		fs.readFile(fileName, 'utf8', function(err, data) {
		 		let updatedHtml = Upgrader.perform(data);
		 		fs.writeFile(fileName, updatedHtml, 'utf8', function(error){
		 			if (err) throw err;
		 			console.log(`Updated ${fileName}`);
		 		} )
			})
 		}
	} 	
});



/*Update scss files*/
 exec('find ./ -name "*.scss"', function(err, stdout, stderr) {
 	let files = stdout.split('\n')
 	console.log('reading style files ================================================================')

 	for (let i = files.length - 1; i >= 0; i--) {
 		if(files[i].length > 0){
 			console.log(`reading file '${files[i]}'`)
 			let fileName = files[i].replace('\r', '')
	 		fs.readFile(fileName, 'utf8', function(err, data) {


		 		let updatedStyle = data
		 		.replace(/\.panel/g, ".card")
		 		.replace(/\.card-body/g, ".card-block")
		 		.replace(/\.card-heading/g, ".card-header")
		 		.replace(/\.radio/g, ".form-check")
		 		.replace(/\.checkbox/g, ".form-check")
		 		.replace(/\.input-lg/g, ".form-control-lg")
		 		.replace(/\.control-label/g, ".form-control-label")
		 		.replace(/\.item/g, ".carousel-item")
		 		.replace(/\.text-center/g, ".text-xs-center")
		 		.replace(/\.text-right/g, ".text-xs-right")
		 		.replace(/\.pull-right/g, ".float-xs-right")
		 		.replace(/\.pull-left/g, ".float-xs-left")
		 		.replace(/\.center-block/g, ".mx-auto")
		 		.replace(/\.label/g, ".tag")
		 		.replace(/\.badge/g, ".tag.tag-pill")
		 		;
		 		fs.writeFile(fileName, updatedStyle, 'utf8', function(error){
		 			if (err) throw err;
		 			console.log(`Updated ${fileName}`);
		 		} )
			})
 		}
	} 	
});


 


