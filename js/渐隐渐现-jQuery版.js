$(function () {
    var $banner = $("#banner"),
        $imgBox = $(".img-box"),
        $bannerTip = $(".banner-tip");
    var $bannerLeft = $(".banner-left"),
        $bannerRight = $(".banner-right"),
        $bannerLink = $banner.children("a");
    var $oDivs = null, $imgList = null, $oLis = null;
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
    //字符串绑定数据
    ~function () {
        var str = "", str2 = "";
        $.each(jsonData, function (index, item) {
            str += "<div><img src='' trueImg='" + item["img"] + "'/></div>";
            0 === index ? str2 += "<li class='bg'>" + parseInt(index + 1) + "</li>" : str2 += "<li>" + parseInt(index + 1) + "</li>";
        });
        $imgBox.html(str);
        $bannerTip.html(str2);
//->通过jQuery选择器或者筛选的方法获取到的jQuery集合是不存在DOM的映射机制的:之前获取到的集合,之后在页面中HTML结构改变了,
// 集合中的内容不会跟着自动发生变化(JS获取的元素集合有DOM映射的机制)
        $divList = $imgBox.children("div");
        $oLis = $bannerTip.children("li");
        $imgLists = $imgBox.find("img");
    }();

    //动画延迟加载
    window.setTimeout(lazyLoad, 500);

    function lazyLoad() {
        $imgLists.each(function (index, item) {
            var oImg = new Image;
            oImg.src = $(item).attr("trueImg");
            oImg.onload = function () {
                $(item).prop("src", oImg.src).css("display", "block");
            }
        });
        $divList.eq(0).css("zIndex", 1).animate({opacity: 1}, 300);
    }

    //封装一个自动轮播的方法
    function changeBan() {
        var curDiv = $divList.eq(index);
        curDiv.css("zIndex", 1).siblings().css("zIndex", 0);
        curDiv.animate({opacity: 1}, 300, function () {
            $(this).siblings().css("opacity", 0);
        });
        var curLi = $oLis.eq(index);
        curLi.addClass("bg").siblings().removeClass("bg");
    }

    //自动轮播
    var index = 0, autoTimer = null, interval = 2000;
    autoTimer = window.setInterval(move, interval);

    function move() {
        if (index === (jsonData.length - 1)) {
            index = -1

        }
        index++;
        changeBan();
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
    //绑定点击事件
    $oLis.on("click", function () {
        index = $(this).index();
        changeBan();
    });
    $bannerRight.on("click", move);
    $bannerLeft.on("click", function () {
        if (index == 0) {
            index = jsonData.length;

        }
        index--;
        changeBan();
    })

});