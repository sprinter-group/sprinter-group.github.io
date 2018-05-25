"use strict";


/* ==============================
    meta Tags **meta [name, content]**
============================== */
(function(){
    var thisUrl = window.location.href;
    var thisTitle = document.title;
    var thisDesc = document.querySelector("meta[name='description']").getAttribute("content");
    var thisKeys = document.querySelector("meta[name='keywords']").getAttribute("content");
    var thisOGImg = document.querySelector("meta[property='og:image']").getAttribute("content");
    var metaLists = [
        { name: 'url', content: thisUrl },
        { name: 'identifier-URL', content: thisUrl },
        { name: 'pagename', content: thisTitle },
        { name: 'HandheldFriendly', content: 'true' },
        { name: 'referrer', content: 'origin-when-cross-origin' },
        { name: 'twitter:url', content: thisUrl },
        { name: 'twitter:domain', content: thisUrl },
        { name: 'twitter:title', content: thisTitle },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:description', content: thisDesc },
        { name: 'twitter:image', content: thisOGImg },
        { name: 'twitter:image:src', content: thisOGImg },
        { name: 'twitter:image:alt', content: thisTitle },
        { property: 'og:img:alt', content: thisOGImg },
        { property: 'og:img:url', content: thisOGImg },
        { property: 'og:img:secure_url', content: thisOGImg },
        { property: 'article:tag', content: thisKeys },
        { property: 'al:web:url', content: thisUrl },
        { itemprop: 'name', content: thisTitle },
        { itemprop: 'description', content: thisDesc },
        { itemprop: 'image', content: thisOGImg },
        { rel: 'apple-touch-icon', sizes: '57x57' },
        { rel: 'apple-touch-icon', sizes: '60x60' },
        { rel: 'apple-touch-icon', sizes: '72x72' },
        { rel: 'apple-touch-icon', sizes: '76x76' },
        { rel: 'apple-touch-icon', sizes: '114x114' },
        { rel: 'apple-touch-icon', sizes: '120x120' },
        { rel: 'apple-touch-icon', sizes: '144x144' },
        { rel: 'apple-touch-icon', sizes: '152x152' },
        { rel: 'apple-touch-icon', sizes: '180x180' },
        { rel: 'icon', sizes: '192x192' },
        { rel: 'icon', sizes: '32x32' },
        { rel: 'icon', sizes: '96x96' },
        { rel: 'icon', sizes: '16x16' },
        { rel: 'manifest', href: '/favicon/manifest.json' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '/favicon/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
    ];
    var headTitle = document.querySelector('head');
    metaLists.forEach(function(metaList)
    {
        if (metaList.name) {
            var setMeta = document.createElement('meta');
            setMeta.setAttribute('name', metaList.name);
            setMeta.setAttribute('content', metaList.content);
            headTitle.appendChild(setMeta);
        }
        else if (metaList.property) {
            var setMeta = document.createElement('meta');
            setMeta.setAttribute('property', metaList.property);
            setMeta.setAttribute('content', metaList.content);
            headTitle.appendChild(setMeta);
        }
        else if (metaList.itemprop) {
            var setMeta = document.createElement('meta');
            setMeta.setAttribute('itemprop', metaList.itemprop);
            setMeta.setAttribute('content', metaList.content);
            headTitle.appendChild(setMeta);
        }
        else if (metaList.rel == 'apple-touch-icon') {
            var setLink = document.createElement('link');
            setLink.setAttribute('rel', metaList.rel);
            setLink.setAttribute('sizes', metaList.sizes);
            setLink.setAttribute('href', '/favicon/apple-icon-' + metaList.sizes + '.png');
            headTitle.appendChild(setLink);
        }
        else if (metaList.rel == 'icon' || metaList.rel == 'manifest') {
            var setLink = document.createElement('link');
            setLink.setAttribute('rel', metaList.rel);
            if (metaList.rel == 'icon') {
                setLink.setAttribute('type', 'image/png');
                setLink.setAttribute('sizes', metaList.sizes);
                if (metaList.sizes == '192x192') {
                    setLink.setAttribute('href', '/favicon/android-icon-' + metaList.sizes + '.png');
                } else {
                    setLink.setAttribute('href', '/favicon/favicon-' + metaList.sizes + '.png');
                }
            } else {
                setLink.setAttribute('href', metaList.href);
            }
            headTitle.appendChild(setLink);
        }
    });
})();


/* ==============================
    get <i> tag -> set 'aria-hidden' attr
============================== */
(function(){
    var getIcons = document.querySelectorAll("i.fa");
    getIcons.forEach(function(iconEach)
    {
        var getIconAttr = iconEach.getAttribute("aria-hidden");
        if (!getIconAttr)
        {
            iconEach.setAttribute("aria-hidden","true");
        }
    });
})();


/* ==============================
    set top button
============================== */
// (function(){
//     var getTop = document.querySelector('#topbtn');
//     if (getTop)
//     {
//         var setIconFont = document.createElement('i');
//         setIconFont.className = 'fa fa-angle-up';
//         setIconFont.setAttribute('aria-hidden', 'true');

//         var setTopBtn = document.createElement('div');
//         setTopBtn.className = 'top-btn';
//         setTopBtn.setAttribute('href', '#top');
//         setTopBtn.setAttribute('onclick', 'scrollToTop();return false');

//         getTop.appendChild(setIconFont);
//         getTop.appendChild(setTopBtn);

//         getTop.setAttribute('title', 'Top');
//     }
// })();


/* ==============================
    smooth scroll
============================== */
// (function(){
//     var timeOut;
//     function scrollToTop() {
//         if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
//             window.scrollBy(0, -50);
//             timeOut=setTimeout('scrollToTop()', 1);
//         }
//         else clearTimeout(timeOut);
//     }
// })();


/* ==============================
    footer text def
============================== */
(function(){
    var y = new Date();
    var getYear = y.getFullYear();

    var footerTextList = [
        { text: " © " + getYear + " Sprinter" },
        { text: "스프린터이용약관", href: "#"},
        { text: "개인정보취급방침", href: "#"},
    ];

    var getFooterDivWrapper = document.querySelector('#footer');
    var setFooterTag = document.createElement('div');
    setFooterTag.className = "wrapper";

    footerTextList.forEach(function(eachText){
        if (eachText.href) {
            var setAnchor = document.createElement("a");
            getFooterDivWrapper.appendChild(setFooterTag);
            setFooterTag.appendChild(setAnchor);
    
            var setFooterText = document.createTextNode(eachText.text);
            setAnchor.appendChild(setFooterText);
            setAnchor.setAttribute("href", eachText.href);
            setAnchor.setAttribute("title", eachText.text + " (새 창)");
            setAnchor.setAttribute("target", "_blank");
        }
        else {
            var setParagraph = document.createElement("p");
            getFooterDivWrapper.appendChild(setFooterTag);
            setFooterTag.appendChild(setParagraph);
    
            var setFooterText = document.createTextNode(eachText.text);
            setParagraph.appendChild(setFooterText);
        }
    });
})();
