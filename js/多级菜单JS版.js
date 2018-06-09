~function () {
    var box = document.getElementById("box"),
        spanList = box.getElementsByTagName("span");
    for (i = 0; i < spanList.length; i++) {
        var curSpan = spanList[i];
        var preSpan = utils.prev(curSpan);
        if (preSpan && preSpan.tagName.toLowerCase() === "em") {
            spanList[i].style.cursor = "pointer";
        }
    }

    box.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (/^(em|span)$/i.test(tar.tagName)) {
            var parent = tar.parentNode;
            var oEm = utils.children(parent, "em")[0];
            var firstUl = utils.children(parent, "ul")[0];

            var isBlock = utils.css(firstUl,"display") === "block" ? true : false;
            if (isBlock) {//当前是显示的，就隐藏
                firstUl.style.display = "none";
                if (oEm) {
                    utils.removeClass(oEm, "bg");
                }
                var nextUl = parent.getElementsByTagName("ul"),
                    nextEm = parent.getElementsByTagName("em");
                for (var i = 0; i < nextUl.length; i++) {
                    var curUl = nextUl[i];
                    curUl.style.display = "none";
                    utils.removeClass(nextEm[i], "bg");

                }

            } else {
                firstUl.style.display = "block";
                if (oEm) {
                    utils.addClass(oEm, "bg");
                }

            }

        }
    }


}();