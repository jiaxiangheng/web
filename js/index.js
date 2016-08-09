/**
 * 选项卡
 */
(function () {
    var oBanner = document.getElementById('banner');
    var bannerInner = oBanner.getElementsByTagName('div')[0];
    var aDiv = bannerInner.getElementsByTagName('div');
    var aImg = bannerInner.getElementsByTagName('img');
    var oUl = oBanner.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft = oBanner.getElementsByTagName('a')[0];
    var oBtnRight = oBanner.getElementsByTagName('a')[1];

    var textbtn=document.getElementById("textbtn");
    var conbtn=document.getElementById("conbtn");
    var btnI=document.getElementById("btnI");
    var btnA=document.getElementById("btnA");

    var step=0;
    var data=null,count=null;
    ~function getData() {
        var xml = new XMLHttpRequest();
        xml.open('get', 'json/data.txt', false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }();
    ~function bind() {
        var str = '',
            str2 = '',
            str3='';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<div><img src="" realImg="' + curData["imgSrc"] + '" alt=""/></div>';

        }
        str+='<div><img src="" realImg="' + data[0]["imgSrc"] + '" alt=""/></div>';
        /*str2 += '<span class="btnI" id="btnI"><i>'+data[0]["id"]+'</i><em>/'+data.length+'</em></span>';
        str3+='<span class="con" id="conbtn"><a href=""><p>'+data[0]["desc"]+'</p><p>'+data[0]["author"]+'</p></a></span>';*/
        bannerInner.innerHTML+= str;

        count=data.length+1;
        utils.css(bannerInner,"width",count*1903);
    }();

    //3.延迟加载
    ~function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            (function (index) {
                var curImg = aImg[index];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('realImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    oImg = null;
                    //默认先让第一张图片显示
                    utils.css(aDiv[0], 'zIndex', 1);
                }
            })(i);
        }
    }();
    function setMove() {
        if (step >= (count - 1)) {
            step = 0;
            utils.css(bannerInner,"left",0);
        }
        step++;
        zhufengAnimate(bannerInner,{left:-step*1903},1000,0);
        bannerTip();
    }
    function bannerTip(){
        var tmpStep=step>=data.length?0:step;
        for(var i=0; i<=data.length; i++){
            var curData=data[i];
            if(i===tmpStep){
                btnI.innerHTML='<i>'+curData["id"]+'</i><em>/'+data.length+'</em>';
                btnA.innerHTML='<p>'+curData["desc"]+'</p><p>'+curData["author"]+'</p>'
            }
        }
    }
    oBtnRight.onclick = setMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = count-1;
            utils.css(bannerInner,"left",-step*1903);
        }
        step--;
        zhufengAnimate(bannerInner,{left:-step*1903},1000,0);
        //bannerTip();
    }
})();
/**
 * 二级菜单
 */
(function tab() {
    var community = document.getElementById("community");
    var comList = document.getElementById("comList");
    var oLi = comList.getElementsByTagName("li")[0];
    var hotBox = document.getElementById("hotbox");
    var navLi = document.getElementById("navli8");
    var resUl = document.getElementById("resUl");
    community.onmouseenter = function () {
        comList.style.display = "block";
        oLi.onmouseenter = function () {
            utils.addClass(oLi, "bg");
            hotBox.style.display = "block";
        }
    };
    community.onmouseleave = function () {
        comList.style.display = "none";
        utils.removeClass(oLi, "bg");
        hotBox.style.display = "none";
    };
    oLi.onmouseleave = function () {
        //hotBox.style.display="none";
    };

    navLi.onmouseenter = function () {
        resUl.style.display = "block";
    };
    navLi.onmouseleave = function () {
        resUl.style.display = "none";
    }
})();
/**
 * 搜索菜单
 */
(function searchMenu() {
    var oDiv = document.getElementById("tab");
    var place = oDiv.getElementsByTagName("a")[0];
    var panel = document.getElementById("panel");
    var plan = oDiv.getElementsByTagName("a")[1];
    var panelCenter = document.getElementById("panel-center");
    var z = oDiv.getElementsByTagName("a")[2];
    var panelRight = document.getElementById("panel-right");
    place.onclick = function () {
        zhufengAnimate(panel, {"display": "block"}, 100, 3, function () {
            panelCenter.style.display = "none";
            panelRight.style.display = "none";

        })
    };
    plan.onclick = function () {
        zhufengAnimate(panelCenter, {"display": "block"}, 100, 3, function () {
            panel.style.display = "none";
            panelRight.style.display = "none";
        })
    };
    z.onclick = function () {
        zhufengAnimate(panelRight, {"display": "block"}, 100, 3, function () {
            panel.style.display = "none";
            panelCenter.style.display = "none";

        })
    }
})();
/**
 * 搜索目的地
 */
~function search(){
    var placesearch_txt = document.getElementById("placesearch_txt");
    var history = document.getElementById("history");
    document.body.onclick = function (ev) {
        ev = ev || window.event;
        var tar = ev.target || ev.srcElement;
        var id=tar.id;
        if (id&&tar.tagName.toUpperCase()=="INPUT") {
            history.style.display = "block"
        }else{
            history.style.display = "none"
        }
    }
}();


~function(){
    var inner=document.getElementById("inter-inner");
    var oLis=inner.getElementsByTagName("li");
    var imgmasks=utils.getByClass(inner,"imgmask");
    var liClose=utils.getByClass(inner,"close");
    for(var i=0;i<oLis.length;i++){
        oLis[i].index=i;
        oLis[i].onmouseenter=function(){
            liClose[this.index].style.display="block";
            liClose[this.index].style.zIndex=600;
            //utils.addClass(imgmasks[this.index],"imgmask1");
            //zhufengAnimate(imgmasks[this.index],{"display":"block","left":-55,"opacity":0.8},100,0)
        };
        oLis[i].onmouseleave=function(){
            liClose[this.index].style.display="none";
            //imgmasks[this.index].style.display="none";
            //imgmasks[this.index].style.display="none";
        }
    }
}();
/*倒计时*/
~function(){
    var numTop=document.getElementById("num-hour");
    var numMinute=document.getElementById("num-minute");
    var numSecond=document.getElementById("num-second");
    function toDou(n){
        return n<10?'0'+n:''+n;
    }
    function romainTime(){
        var oDate=new Date();
        var nowTime=oDate.getTime();
        var tarTime=new Date('2016/08/28 00:00:00');
        var s=Math.floor((tarTime.getTime()-nowTime)/1000);
        var h=Math.floor(s/3600);
        s%=3600;
        var m=Math.floor(s/60);
        numMinute.innerHTML=toDou(m);
        s%=60;
        numSecond.innerHTML=toDou(s);
    }
    romainTime();
    setInterval(romainTime,1200);
}()



