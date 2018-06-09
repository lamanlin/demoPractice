var tabFir = document.getElementById("box"),
    tabFirst = utils.firstChild(oBox),
    oLis = utils.children(tabFirst);

for (var i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function () {
        utils.addClass(this, "selected");

        var curSlibings = siblings(this);
        for (var i = 0; i < curSlibings.length; i++) {
            utils.removeClass(curSlibings[i], "selected");
        }
    };

    //再让当前的点击的这个LI的父亲元素的所有弟弟元素（三个DIV）的索引和当前点击的这个LI索引相同的有选中样式，其他则移除
    var oDivs = utils.nextAll(this.parentNode), index = utils.index(this);
    for (var i = 0; i < oDivs.length; i++) {
        i == index ? utils.addClass(oDivs[i], "selected") : utils.removeClass(oDivs[i], "selected");
    }
}
