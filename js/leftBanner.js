var banner = document.getElementById("banner"),
    bannerInner = utils.firstChild(banner),
    bannerTip = utils.children(banner, "ul")[0];
var imgList = bannerInner.getElementsByTagName("img"),
    oLis = bannerTip.getElementsByTagName("li");
var bannerLeft = utils.children(banner, "a")[0],
    bannerRight = utils.children(banner, "a")[1];


var jsonData = null;
~function () {
    var xhr = new XMLHttpRequest;
    xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = utils.formatJSON(xhr.responseText);
        }
    };
    xhr.send(null);
}();

//绑定数据
~function () {
    //1)绑定的是轮播图区域的数据
    var str = '';
    if (jsonData) {
        for (var i = 0, len = jsonData.length; i < len; i++) {
            var curData = jsonData[i];
            str += '<div><img src="" trueImg="' + curData["img"] + '"/></div>';
        }
        //->为了实现无缝滚动我们需要把第一张图片克隆一份一模一样的放在末尾
        str += '<div><img src="" trueImg="' + jsonData[0]["img"] + '"/></div>';
    }
    bannerInner.innerHTML = str;
    count = jsonData.length + 1;
    utils.css(bannerInner, "width", count * 1000);

    //2)绑定的是焦点区域的数据
    str = '';
    if (jsonData) {
        for (i = 0, len = jsonData.length; i < len; i++) {
            i === 0 ? str += '<li class="bg">' + parseInt(i + 1) + '</li>' : str += '<li>' + parseInt(i + 1) + '</li>';
        }
    }
    bannerTip.innerHTML = str;
}();

//动画延迟加载
window.setTimeout(lazyImg, 500);

function lazyImg() {
    for (var i = 0, len = imgList.length; i < len; i++) {
        ~function (i) {
            var curImg = imgList[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = "block";
                personalAnimate(curImg, {opacity: 1}, 300);
                oImg = null;
            }
        }(i);

    }
}

//实现自动轮播
var step = 0, interval = 2000, autoTimer = null;
autoTimer = window.setInterval(autoMove, interval);

function autoMove() {
    if (step === (count - 1)) {
        step = 0;
        utils.css(bannerInner, "left", 0);
    }
    step++;
    personalAnimate(bannerInner, {left: -step * 1000}, 500);
    changeTip();
}

//焦点自动轮播
function changeTip() {
    var tempstep = step > oLis.length - 1 ? 0 : step;
    for (i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        i === tempstep ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");

    }
}

//鼠标悬停
banner.onmouseover = function () {
    window.clearInterval(autoTimer);
    bannerLeft.style.display = bannerRight.style.display = "block";
};
banner.onmouseout = function () {
    autoTimer = window.setInterval(autoMove, interval);
    bannerLeft.style.display = bannerRight.style.display = "none";
};

//Li绑定点击事件
~function () {
    for (var i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        curLi.index = i;
        curLi.onclick = function () {
            step = this.index;
            changeTip();
            personalAnimate(bannerInner, {left: -step * 1000}, 500);
        }

    }

}();
//a绑定点击事件
bannerRight.onclick = autoMove;
bannerLeft.onclick = function () {
    if (step <= 0) {
        step = count - 1;
        utils.css(bannerInner, "left", -step * 1000);
    }
    step--;
    personalAnimate(bannerInner, {left: -step * 1000}, 500);
    changeTip();
};

