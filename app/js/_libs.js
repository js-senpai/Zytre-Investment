// YouTube Loader
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
    if (!document.getElementsByClassName) {
        // IE8 support
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = new RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body,"youtube");
    } else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i=0; i<nb_videos; i++) {
        // Based on the YouTube ID, we can easily find the thumbnail image
        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

        // Overlay the Play icon to make it look like a video player
        var play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // Create an iFrame with autoplay set to true
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
            iframe.setAttribute("src",iframe_url);
            iframe.setAttribute("frameborder",'0');

            // The height and width of the iFrame should be the same as parent
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Replace the YouTube thumbnail with YouTube Player
            this.parentNode.replaceChild(iframe, this);
        }
    }
});

// Lazy loading img & background images using intersection observer
// Reference: https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
// Using example: <img class="lazy" src="thumb.gif" data-src="real-img.jpg" data-srcset="real-img@1x.jpg 1x, real-img@2x.jpg 2x">
// Background image class usign example: <div class="lazy-background"> with added class ".visible" for styling
// Background image style attribute lazy loading example: <div data-bg="image.jpg">

// delete window.IntersectionObserver; // Fallback Testing
document.addEventListener('DOMContentLoaded', function() {

	var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
	var lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));
	var lazyBackgroundsData = [].slice.call(document.querySelectorAll('[data-bg]'));

	if ('IntersectionObserver' in window) {

		let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					if(lazyImage.dataset.srcset !== '') {
						lazyImage.srcset = lazyImage.dataset.srcset;
					}
					lazyImage.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});
		lazyImages.forEach(function(lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});

	let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				lazyBackgroundObserver.unobserve(entry.target);
			}
		});
	});
	lazyBackgrounds.forEach(function(lazyBackground) {
		lazyBackgroundObserver.observe(lazyBackground);
	});

	let lazyBackgroundDataObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let lazyBackgroundData = entry.target;
				lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
				lazyBackgroundDataObserver.unobserve(lazyBackgroundData);
			}
		});
	});
	lazyBackgroundsData.forEach(function(lazyBackgroundData) {
		lazyBackgroundDataObserver.observe(lazyBackgroundData);
	});

	} else {

		// Fallback

		lazyImages.forEach(function(lazyImage) {
			lazyImage.src = lazyImage.dataset.src;
			if(lazyImage.dataset.srcset !== '') {
				lazyImage.srcset = lazyImage.dataset.srcset;
			}
		});
		lazyBackgrounds.forEach(function(lazyBackground) {
			lazyBackground.classList.add('visible');
		});
		lazyBackgroundsData.forEach(function(lazyBackgroundData) {
			lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
		});

	}
// Плавный скролл
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
});

