// ==UserScript==
// @name         全网门户登录页快捷登录按钮
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://dws.300.cn/security/login*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.classList.add("w-daily-bg");
    var bg = document.createElement("div");
    bg.setAttribute("class", "w-bg");
    document.body.appendChild(bg);

    var account = $("#username");
    console.log(account);
    var password = $("#passwd");
    var loginBtn = $("#login > div:nth-child(4) > button");

    function clear() {
        account.val("");
        password.val("");
    }

    function login(a, p) {
        var _a = a.split("");
        var _p = p.split("");
        autoTypeIn(_a, account);
        autoTypeIn(_p, password);

    }
    var autoTypeDownSign = 1;

    function autoTypeIn(text, target, fn) {
        var n = text.length;
        var i = 0;
        var t = "";
        clearInterval(s);
        var s = setInterval(function(){
            t += text[i];
            target.val("");
            target.val(t);
            i++;
            if(i > n -1 ) {
                clearInterval(s);
                autoTypeDownSign++;
                if(autoTypeDownSign > 2) {
                    loginBtn.trigger("click");
                    autoTypeDownSign = 1;
                    accountBtnClick = false;
                }
                return true;
            }
        }, 100);
    }

    var accountBtnClick = false;
    function Account(account, password, name) {
        this.account = account;
        this.password = password;
        this.name = name;

        this.init = function() {
            var _t = this;
            var div = document.createElement("div");
            var a = document.createElement("a");
            a.setAttribute("href", "javascript:");
            a.innerText = this.name;
            div.appendChild(a);
            loginBtnDiv.appendChild(div);
            a.addEventListener("click", function() {
                if(!accountBtnClick) {
                    accountBtnClick = true;
                    _t.login();}
            });
        };

        this.login = function() {
            login(this.account, this.password);
        };
    }
    var loginBtnDiv = document.createElement("div");
    loginBtnDiv.setAttribute("id", "login-btn");
    document.querySelector("body").appendChild(loginBtnDiv);


    appendStyle();
    function appendStyle() {
        var s = '.w-daily-bg.login-page .login-form.fade-in-effect.in{background-color:transparent;position:relative}.w-daily-bg.login-page .login-form.fade-in-effect.in:after{content:"";display:block;width:100%;height:100%;background-color:#fff;opacity:.97;position:absolute;top:0;left:0}.w-daily-bg.login-page .login-form.fade-in-effect.in div{position:relative;z-index:10}';
        s += "body {background-color:#000 !important;overflow:hidden;}";
        s += "div.w-bg {animation:bg-ani 12s linear infinite;animation-direction:alternate-reverse;opacity:0.5;background:url(http://280.300.cn/wd/boss/webs/bg.jpg) no-repeat center center !important;background-size:cover;position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:-1;}";
        s += "@keyframes bg-ani {from{transform:scale(1.1);}to{transform:scale(1);}}";
        s += "#login-btn {position:fixed;top:180px;right:0px;width:30vw;height:auto;z-index:100;text-align:right;}";
        s += "#login-btn a {width:auto;height:40px;line-height:40px;margin-bottom:15px;background-color:#fff;color:#333;padding:0px 50px;display:inline-block;position:relative;left:500px;transition:.3s;text-decoration:none;}";
        s += "#login-btn a:hover {background-color:#e33;color:#fff;}";
        s += ".loaded #login-btn a {left:0px;}";

        var head = document.querySelector("head");
        var style = document.createElement("style");
        style.innerHTML = s;
        head.appendChild(style);
    }

    var a_wudong = new Account("account", "passsword", "text").init();
    //...


    var _b = document.querySelector("body");
    _b.classList.add("loaded");
    // Your code here...
})();