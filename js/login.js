/*登录*/
~function (){
    var logintext = document.getElementById("logintext");
    var logintab = document.getElementById("logintab");
    var loginform = document.getElementById("loginform");
    var loginform1 = document.getElementById("loginform1");
    var account = logintab.getElementsByTagName("a")[0];
    var message = logintab.getElementsByTagName("a")[1];

    message.onclick=function(){
        message.style.borderColor="#10b041";
        loginform.style.display="none";
        loginform1.style.display="block";
        logintext.style.height="470px";
        account.style.borderColor="transparent";
    };
    account.onclick=function(){
        loginform1.style.display="none";
        loginform.style.display="block";
        account.style.borderColor="#10b041";
        message.style.borderColor="transparent";
        logintext.style.height="421px";
    };
}()

~function() {
    var tel = document.getElementById("tel");
    var remindps1 = document.getElementById("remindps1");
    tel.onkeyup=tel.onkeydown=function(){
        var val=this.value;
        if(val){

        }
    };
    tel.onclick = function () {
        if (!tel.value) {
            remindps1.innerHTML = "请输入邮箱/手机号";
            this.style.borderColor="#ff654c";
        }
    };
    tel.onblur=function(){
        var val =this.value.trim();
        var reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (reg.test(val)) {
            remindps1.innerHTML = "输入正确";
        }else{
            remindps1.innerHTML = "所输入邮箱/手机号不存在，用户名登录请点击"+'<a href="">这里</a>';
        }
    }

}();