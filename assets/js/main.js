/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		5,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		10,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		10,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		10,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});
// csv から　HTML現役生
			function readCsv(data) {
				var target = '#csv-body';
				var csvlist = $.csv.toArrays(data);
				var insert = '';
				for (var i = 0; i < csvlist.length; i++) {
					insert += "<tr>";
					insert += "<th>"+csvlist[i][0]+"</th>";
					if(csvlist[i][1]!=''){
						insert += '<td data-label="役職 : " class="txt">'+csvlist[i][1]+'</td>';
					}
					else{
						insert += '<td data-label="" class="txt">'+''+'</td>';
					}

					if(csvlist[i][2]!=''){
						insert += '<td data-label="してること : " class="txt">'+csvlist[i][2]+'</td>';
					}
					else{
						insert += '<td data-label="" class="txt">'+''+'</td>';
					}

					if(csvlist[i][3]!=''){
						insert += '<td data-label="ひとこと : " class="txt">'+csvlist[i][3]+'</td>';
					}
					else{
						insert += '<td data-label="" class="txt">'+''+'</td>';
					}
					insert += "</tr>";
				}
				$(target).append(insert);
			}
			var csvfile = 'assets/csv/HP.csv';
			$(function(){
				$.get(csvfile, readCsv, 'text');
			});
// OBOGcsv
			function readCsv2(data) {
				var target = '#csv-og';
				var csvlist = $.csv.toArrays(data);
				var insert = '';
				for (var i = 0; i < csvlist.length; i++) {
					insert += "<tr>";
					if (csvlist[i][2] != "") {
						insert += "<th>"+'<a href="members/'+csvlist[i][2]+'.html">'+csvlist[i][0]+"</a></th>";
					}
					else {
						insert += "<th>"+csvlist[i][0]+"</a></th>";
					}
					insert += '<td data-label="年度 : " class="txt">'+csvlist[i][1]+'</td>';
					insert += "</tr>";
				}
				$(target).append(insert);
			}
			var csvfile2 = 'assets/csv/OB.csv';
			$(function(){
				$.get(csvfile2, readCsv2, 'text');
			});

			// hamburgar
			$(document).ready(function() {
				$(".menu-trigger").click(function () {
	  				$(this).toggleClass("active");
	  				$(this).next().toggleClass("onanimation");
	  				$('ul li').hide();
	  				$('ul li').each(function(i) {
	 	 				$(this).fadeIn(1);
	  				});
				});
			});

})(jQuery);