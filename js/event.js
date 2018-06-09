~function () {

    //改变当前方法的this
    //fn是当前要改变this的函数
    //context是要把this改变为谁
    function changeThis(fn, context) {
        var outerArg = Array.prototype.splice.call(arguments, 2);
        return function () {
            var innerArg = Array.prototype.splice.call(arguments, 0);
            fn.apply(context, outerArg.concat(innerArg));
        }
    }

    //bind：给当前元素的某一个行为绑定方法
    function bind(curEle, evenType, evenFn) {
        if ("addEventListener" in curEle) {
            curEle.addEventListener(evenType, evenFn, false);
            return;
        }
        //IE6~8下

        if (!curEle["myBind"]) {
            curEle["myBind"] = [];
        }
        var tempFn = changeThis(evenFn, curEle);
        tempFn.photo = evenFn;
        var ary = curEle["myBind" + evenType];
        for (i = 0; i < ary.length; i++) {
            if (ary[i].photo === evenFn) {
                return;
            }
        }
        ary.push(tempFn);
        curEle.attachEvent(on + "evenType", evenFn);
    }


    //unBind：解绑当前元素的某一个行为
    function unBind(curEle, evenType, evenFn) {
        if ("addEventListener" in curEle) {
            curEle.removeEventListener(evenType, evenFn);
            return;
        }
        var ary = curEle["myBind" + evenType];
        if (ary){
            for (i = 0; i < ary.length; i++) {
                if (evenFn === ary[i].photo) {
                    ary.splice(i, 1);
                    curEle.detachEvent(on + "evenType", evenFn);
                    break;
                }
            }
        }

    }

    //on:解决顺序问题，把绑定行为的方法都存储进这个容器，然后在这里进行排序
    function on(curEle, evenType, evenFn) {
        if (!curEle["myBind" + evenType]) {
            curEle["myBind" + evenType] = [];
        }
        var ary = curEle["myBind" + evenType];
        for (i = 0; i < ary.length; i++) {
            if (ary[i] === evenFn) {
                return;
            }
        }
        ary.push(evenFn);
        bind(curEle, evenType, run);
    }

    //off:在自己创建的事件池中移除对应的方法
    function off(curEle, evenType, evenFn) {
        var ary = curEle["myBind" + evenType];
        if (ary) {
            for (i = 0; i < ary.length; i++) {
                if (ary[i] === evenFn) {
                    ary[i] = null;
                    return;
                }
            }
        }

    }

    //run:当点击行为发生时，执行这个方法
    function run(e) {
        //把兼容问题都解决了

        if (window.event) {
            e = e || window.event;
            e.target = e.srcElement;
            e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };

        }

//this是curEle，evenType是当前点击的那个->e.type
        var ary = this["myBind" + e.type];
        if (ary) {
            for (i = 0; i < ary.length; i++) {
                if (typeof ary[i] === "function") {
                    ary[i].call(this, e);
                } else {
                    ary.splice(i, 1);
                    i--;
                }

            }
        }
    }
    //把方法暴露出来
    window.personalEvent = {
        on: on,
        off: off,
        changeThis: changeThis
    }

}();