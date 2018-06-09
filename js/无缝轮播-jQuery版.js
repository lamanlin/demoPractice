function slider() {
    var $banner = $("#banner"),
        $imgBox = $(".img-box"),
        $bannerTip = $(".banner-tip");
    var $oDiv = null,
        $imgList = null,
        $oLis = null;
    var $bannerLink = $("#banner a"),
        $bannerLeft = $(".banner-left"),
        $bannerRight = $(".banner-right");

    //Ajax读取数据
    var jsonData = null;
    $.ajax({
        url: "json/banner.txt?_=" + Math.random(),
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            jsonData = data;
        }
    });
    //Ajax绑定数据
    ~function () {
        var str = "", str2 = "";
        $.each(jsonData, function (index, item) {
            str += "<div><img src='' trueImg='" + item["img"] + "'/></div>";
            index === 0 ? str2 += "<li class='bg'>" + parseInt(index + 1) + "</li>" : str2 += "<li>" + parseInt(index + 1) + "</li>";
        });
        str += '<div><img src="" trueImg="' + jsonData[0]["img"] + '"/></div>';
        $imgBox.html(str);
        $bannerTip.html(str2);

        $divList = $imgBox.children("div");
        $imgList = $imgBox.find("img");
        $oLis = $bannerTip.children("li");


        count = jsonData.length + 1;
        $imgBox.css("width", count * 1000);
    }();


    //延迟加载
    window.setTimeout(lazyImg, 500);

    function lazyImg() {
        $imgList.each(function (index, item) {
            var _this = this;
            var oImg = new Image;
            oImg.src = $(this).attr("trueImg");
            oImg.onload = function () {
                $(_this).prop("src", this.src).css("display", "block");
            }
        });
        $imgList.animate({opacity: 1}, 500);
    }

    //实现自动轮播
    var index = 0, interval = 2000, autoTimer = null;
    autoTimer = window.setInterval(move, interval);

    function move() {
        if (index === (count - 1)) {
            index = 0;
            $imgBox.css("left", 0);
        }
        index++;
        $imgBox.animate({left: -index * 1000});
        changeTip();
    }

    //焦点切换
    function changeTip() {
        var tempLi = index > $oLis.length - 1 ? 0 : index;
        $oLis.each(function (index, item) {
            var curLi = $oLis.eq(index);
            if (index === tempLi) {
                curLi.addClass("bg");
            } else {
                curLi.removeClass("bg");
            }
        })
    }

    //鼠标悬停
    $banner.on("mouseover", function () {
        window.clearInterval(autoTimer);
        $bannerLink.css("display", "block");
    });
    $banner.on("mouseout", function () {
        autoTimer = window.setInterval(move, interval);
        $bannerLink.css("display", "none");
    });
    //左右点击轮播
    $bannerRight.on("click", move);
    $bannerLeft.on("click", function () {
        if (index === 0) {
            index = count - 1;
            $imgBox.css("left", -index * 1000);
        }
        index--;
        $imgBox.animate({left: -index * 1000}, 500);
        changeTip();
    });
    //焦点绑定点击
    ~function () {
        $oLis.on("click", function () {
            index = $(this).index();
            changeTip();
            $imgBox.animate({left: -index * 1000}, 500);

        })
    }();


}
