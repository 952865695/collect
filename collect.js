function parseMa(e){
    if(_ma)
        for(var n in _ma)
            switch(_ma[n][0]){
                case"_setAccount":
                    e.account=_ma[n][1];
                    break;
                case"_trackEvent":
                    e.eventCategory=_ma[n][1],
                        e.eventAction=_ma[n][2],
                        e.eventLabel=_ma[n][3]||"",
                        e.eventValue=_ma[n][4]||""
            }
}
function sendParam(e,n){
    var t="http://i-test.com.cn/PerformanceMonitorCenter/h5/upload",
        i="";
    for(var r in e)
        ""!=i&&(i+="&"),
            i+=r+"="+encodeURIComponent(e[r]);
    var o=new Image(1,1);
    o.onload=o.onerror=function(){o=null},
        1==n?o.src=t+"/user?"+i:2==n?o.src=t+"/error?"+i:console.log("arguments missed!")
}
function errorMonitor(e,n,t,i,r){
    var o={};
    parseMa(o),
    document&&(o.orgUrl=document.URL||""),
    navigator&&(o.ua=navigator.userAgent||"",
        o.browser=detectBrowser(navigator)||"other",
        o.os=detectOS(navigator)||"",
        o.client=detectClient(navigator)||"",
        o.wechat=is_weixn(navigator)||"");
    var a=new Date;
    return o.ldate=a,
        o.ltime=a.getTime(),
        o.dateshort=[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("/"),
        o.timeshort=[a.getHours(),("0"+a.getMinutes()).slice(-2),("0"+a.getSeconds()).slice(-2)].join(":"),
        "Script error."==e||n?"Script error."==e?(o.msg=e||"unknown",
            sendParam(o,2),!0):(setTimeout(function(){
            if(i=i||window.event&&window.event.errorCharacter||0,o.url=n,o.line=t,o.col=i,r&&r.stack)
                o.msg=(""+r.stack).split("\n")[0]||"unknown";
            else if(arguments.callee){
                for(var e=[],a=arguments.callee.caller,s=3;
                    a&&--s>0&&(e.push(""+a),
                    a!==a.caller);
                )
                    a=a.caller;e=e.join(","),
                    o.msg=e||"unknown"}sendParam(o,2)
        },0),!0):!0
}
function perfMonitor(){
    var e={};
    document&&(e.url=document.URL||"",
        e.title=document.title||"",
        e.referer=document.referer||"",
        e.domain=document.domain||""),
    window&&window.screen&&(e.sw=window.screen.width||0,e.cd=window.screen.colorDepth||0),
    navigator&&(e.lang=navigator.language||"",
        e.ua=navigator.userAgent||"",
        e.browser=detectBrowser(navigator)||"other"||"",e.os=detectOS(navigator)||"",
        e.client=detectClient(navigator)||"",e.wechat=is_weixn(navigator)||"");
    var n=new Date;
    e.ldate=n,e.ltime=n.getTime(),
        e.dateshort=[n.getFullYear(),("0"+(n.getMonth()+1)).slice(-2),("0"+n.getDate()).slice(-2)].join("/"),
        e.timeshort=[n.getHours(),("0"+n.getMinutes()).slice(-2),("0"+n.getSeconds()).slice(-2)].join(":"),
        parseMa(e),
        setTimeout(function(){
            performance?(timing=performance.timing,e.dnsDuration=timing.domainLookupEnd-timing.domainLookupStart,
                e.tcpDuration=timing.connectEnd-timing.connectStart,
                e.requestDuration=timing.responseEnd-timing.requestStart,
                e.domDuration=timing.domComplete-timing.domInteractive,
                e.whiteTime=timing.responseStart-timing.navigationStart,
                e.domreadyTime=timing.domContentLoadedEventEnd-timing.navigationStart,
                e.onloadTime=timing.loadEventEnd-timing.navigationStart,e.firstTime=222,
                e.netTime=timing.responseStart-timing.domainLookupStart,sendParam(e,1)):(console.log("no performance api"),
                sendParam(e,1))
        },20)
}
function detectOS(e){
    var n=e.userAgent,
        t="Win32"==e.platform||"Windows"==e.platform,
        i="Mac68K"==e.platform||"MacPPC"==e.platform||"Macintosh"==e.platform||"MacIntel"==e.platform;
    if(i)return"Mac";
    var r="X11"==e.platform&&!t&&!i;
    if(r)return"Unix";
    var o=(e.platform+"").indexOf("Linux")>-1;
    if(o)return"Linux";
    if(t){
        var a=n.indexOf("Windows NT 5.0")>-1||n.indexOf("Windows 2000")>-1;
        if(a)return"Win2000";
        var s=n.indexOf("Windows NT 5.1")>-1||n.indexOf("Windows XP")>-1;
        if(s)return"WinXP";
        var d=n.indexOf("Windows NT 5.2")>-1||n.indexOf("Windows 2003")>-1;
        if(d)return"Win2003";
        var c=n.indexOf("Windows NT 6.0")>-1||n.indexOf("Windows Vista")>-1;
        if(c)return"WinVista";
        var m=n.indexOf("Windows NT 6.1")>-1||n.indexOf("Windows 7")>-1;
        if(m)return"Win7";
        var m=n.indexOf("Windows NT 6.1")>-1||n.indexOf("Windows 8")>-1;
        if(m)return"Win8";
        var m=n.indexOf("Windows NT 6.1")>-1||n.indexOf("Windows 10")>-1;
        if(m)return"Win10";
        var m=n.indexOf("Windows NT 6.1")>-1||n.indexOf("Windows 11")>-1;
        if(m)return"Win11"
    }
    return"other"
}
function is_weixn(e){
    var n=e.userAgent.toLowerCase();
    return"micromessenger"==n.match(/MicroMessenger/i)?"微信":"非微信"
}
function detectClient(e){
    return/(iPhone|iPad|iPod|iOS)/i.test(e.userAgent)?"iOS":/(Android)/i.test(e.userAgent)?"Android":"PC"
}
function detectBrowser(e){
    var n=e.userAgent,
        t=n.indexOf("Opera")>-1,
        i=n.indexOf("compatible")>-1&&n.indexOf("MSIE")>-1&&!t,
        r=n.indexOf("Windows NT 6.1; Trident/7.0;")>-1&&!i,
        o=n.indexOf("Firefox")>-1,a=n.indexOf("Safari")>-1&&-1==n.indexOf("Chrome"),
        s=n.indexOf("Chrome")>-1&&n.indexOf("Safari")>-1;
    if(i){
        var d=RegExp("MSIE (\\d+\\.\\d+);");
        d.test(n);
        var c=parseFloat(RegExp.$1);
        return 7==c?"IE7":8==c?"IE8":9==c?"IE9":10==c?"IE10":11==c?"IE11":"0"
    }
    return o?"FF":t?"Opera":a?"Safari":s?"Chrome":r?"Edge":void 0
}
window.onload=function(){window.onerror=errorMonitor,perfMonitor()};