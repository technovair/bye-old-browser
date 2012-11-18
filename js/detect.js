/**
 * Developed by Technova.ir/bye-old-browser 
 */

/**
 * DOMAssistant Load Module for Dom Ready Event
 */
 
// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation. Module inspiration by Dean Edwards, Matthias Miller, and John Resig: http://dean.edwards.name/weblog/2006/06/again/
/*global DOMAssistant */

var DOMAssistant = function () {}
DOMAssistant.DOMLoad = function () {
	var DOMLoaded = false,
	DOMLoadTimer = null,
	functionsToCall = [],
	addedStrings = {},
	errorHandling = null,
	execFunctions = function () {
		for (var i=0, il=functionsToCall.length; i<il; i++) {
			try {
				functionsToCall[i]();
			}
			catch (e) {
				if (errorHandling && typeof errorHandling === "function") {
					errorHandling(e);
				}
			}
		}
		functionsToCall = [];
	},
	DOMHasLoaded = function () {
		if (DOMLoaded) {
			return;
		}
		DOMLoaded = true;
		execFunctions();
	};
	/* Internet Explorer */
	/*@cc_on
	@if (@_win32 || @_win64)
		document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
		document.getElementById("ieScriptLoad").onreadystatechange = function() {
			if (this.readyState === "complete") {
				DOMHasLoaded();
			}
		};
	@end @*/
	/* Mozilla, Chrome, Opera */
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", DOMHasLoaded, false);
	}
	/* Safari, iCab, Konqueror */
	if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
		DOMLoadTimer = setInterval(function () {
			if (/loaded|complete/i.test(document.readyState)) {
				DOMHasLoaded();
				clearInterval(DOMLoadTimer);
			}
		}, 10);
	}
	/* Other web browsers */
	window.onload = DOMHasLoaded;
	
	return {
		DOMReady : function () {
			for (var i=0, il=arguments.length, funcRef; i<il; i++) {
				funcRef = arguments[i];
				if (!funcRef.DOMReady && !addedStrings[funcRef]) {
					if (typeof funcRef === "string") {
						addedStrings[funcRef] = true;
						funcRef = new Function(funcRef);
					}
					funcRef.DOMReady = true;
					functionsToCall.push(funcRef);
				}
			}
			if (DOMLoaded) {
				execFunctions();
			}
		},
		
		setErrorHandling : function (funcRef) {
			errorHandling = funcRef;
		}
	};
}();
DOMAssistant.DOMReady = DOMAssistant.DOMLoad.DOMReady;

/**
 * Define Variables for old browsers detection flag
 */
var isOldBrowser=true;
var userAgent=navigator.userAgent;

if(/^.+ MSIE [5-8]{1}[^\d]+.+$/.test(userAgent)){ // is IE 6,7,8?
}else if(/^.+Firefox\/([1-9]{1}|1[0-4]{1})[^\d]+.*$/.test(userAgent)){ // is Firefox 1-14?
}else if(/^.*Opera[\/| ]([1-9]{1}|10)[^\d]+.*$/.test(userAgent)){ // is Opera 1-10?
}else if(/^.*Chrome\/([1-9]{1}|1[0-7])[^\d]+.*$/.test(userAgent)){ // is Chrome 1-17?
}else if(/^.*Version\/4[^\d]+.*Safari.*$/.test(userAgent)){ // is safari 4?
}else{
  isOldBrowser=false;
}

/**
 * Show warning for update browser .
 */

if(isOldBrowser){
  DOMAssistant.DOMReady(function(){ // Run when Dom Object is ready
      /**
       * Define Message Style
       * styles copied from https://github.com/xPaw/CF-ABetterBrowser/blob/master/public/javascripts/abetterbrowser.js
       */
    	rules =
      '#bye-old-browser {' +
        'background:#45484d;' +
        'position:absolute;' +
        'z-index:100000;' +
        'width:100%;' +
        'height:70px;' +
        'top:0;' +
        'left:0;' +
        'overflow:hidden;' +
        'padding:8px 0;' +
        'font:14px Tahoma,sans-serif;' +
        'text-align:center;' +
        'color:#FFF' +
        'line-height:22px'+
      '}' +
      '#bye-old-browser a {' +
        'text-decoration:underline;' +
        'color:#EBEBF4' +
      '}' +

      '#bye-old-browser a:hover, #bye-old-browser a:active {' +
        'text-decoration:none;' +
        'color:#DBDBEB' +
      '}' +

      '#bye-old-browser-close{' +
        'background:#393b40;' +
        'display:block;' +
        'width:42px;' +
        'height:42px;' +
        'position:absolute;' +
        'text-decoration:none !important;' +
        'cursor:pointer;' +
        'top:0;' +
        'right:0;' +
        'font-size:30px;' +
        'line-height:42px' +
      '}' +

      '#bye-old-browser-close:hover {' +
        'background:#E04343;' +
        'color:#FFF' +
      '}',

      /**
       * Injects style rules into the document to handle formatting
       */
      style = document.createElement( 'style' );
      style.id = 'bye-old-browser';
      style.setAttribute( 'type', 'text/css' );

      if( style.styleSheet )
      {
        style.styleSheet.cssText = rules;
      }
      else
      {
        style.appendChild( document.createTextNode( rules ) );
      }

      var head = document.getElementsByTagName( 'head' )[ 0 ];
      var firstChild = head.firstChild;
      head.insertBefore( style, firstChild );
      var message = document.createElement( 'div' );
      message.id = 'bye-old-browser';
      message.innerHTML = "مرورگر اینترنتی شما قدیمی و نا امن است <br/> برای مشاهده این وب سایت و بسیاری از وب سایت های دیگر و حفظ امنیت خود همین حالا مرورگر خود را بروز کنید<br/><a href='http://www.whatbrowser.org/intl/fa' target='_blank'>بروزرسانی و اطلاعات بیشتر</a> ";
      /**
       * Create close button
       */
      var closeButton = document.createElement( 'a' );
      closeButton.id = 'bye-old-browser-close';
      closeButton.innerHTML = '&times;';

      message.appendChild( closeButton );

      closeButton.onclick = function( )
      {
        document.body.removeChild( message );
        document.body.className = document.body.className.replace( new RegExp( '(\\s|^)bye-old-browser-body(\\s|$)' ), '' );
        return false;
      };

      /**
       * Injects our message into the body
       */
      document.body.appendChild( message );
      document.body.className += ' bye-old-browser-body';
  });
}
