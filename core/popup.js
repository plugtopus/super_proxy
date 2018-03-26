$(document).ready(function() {
    "true" == localStorage.isEnabled ? ($("#on_off_switcher").prop("checked", !0), $(".pulse1").css("animation", ""), $(".pulse1").css("box-shadow", "inset 0px 0px 15px 10px rgb(34, 29, 136)")) : ($("#on_off_switcher").prop("checked", !1), $(".pulse1").css("animation", "stop"), $(".pulse1").css("box-shadow", "none")), $("#on_off_switcher").change(function() {
        localStorage.isEnabled = $("#on_off_switcher").prop("checked"), "true" == localStorage.isEnabled ? (chrome.runtime.sendMessage({
            action: "enable"
        }), $(".pulse1").css("animation", ""), $(".pulse1").css("box-shadow", "inset 0px 0px 15px 10px rgb(34, 29, 136)")) : (chrome.runtime.sendMessage({
            action: "disable"
        }), $(".pulse1").css("animation", "stop"), $(".pulse1").css("box-shadow", "none"))
    }), localStorage.user_proxy || (localStorage.user_proxy = !1), localStorage.user_proxy_http || (localStorage.user_proxy_http = ""), localStorage.user_proxy_port || (localStorage.user_proxy_port = ""), localStorage.user_proxy_text || (localStorage.user_proxy_text = "--> \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0438 \u043F\u0440\u043E\u043A\u0441\u0438 <--"), $(".try_user_proxy").text(localStorage.user_proxy_text), $(".user_proxy").hide(), $(".e_mail").hide(), $(".bottom_open").hide(), $(".try_user_proxy").click(() => {
        $(".user_proxy").show(), $("#http-host").val(localStorage.user_proxy_http), $("#http-port").val(localStorage.user_proxy_port)
}), $("#apply").click(() => {
        $("#http-host").val() && 1 < $("#http-host").val().length && $("#http-port").val() && 1 < $("#http-port").val().length ? (localStorage.user_proxy = !0, localStorage.user_proxy_http = $("#http-host").val(), localStorage.user_proxy_port = $("#http-port").val(), localStorage.user_proxy_text = "--> \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B \u0432\u0430\u0448\u0438 \u043F\u0440\u043E\u043A\u0441\u0438 <--", $(".user_proxy").hide(), $(".try_user_proxy").text(localStorage.user_proxy_text), $(".user_message").text(""), chrome['runtime'].sendMessage({
        action: "user_proxy"
    })) : $(".user_message").text("\u041D\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u044B")
}), $("#reject").click(() => {
        "true" == localStorage.user_proxy ? (localStorage.user_proxy = !1, localStorage.user_proxy_http = "", localStorage.user_proxy_port = "", localStorage.user_proxy_text = "--> \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0438 \u043F\u0440\u043E\u043A\u0441\u0438 <--", $(".user_proxy").hide(), $(".try_user_proxy").text(localStorage.user_proxy_text), $(".user_message").text(""), chrome['runtime'].sendMessage({
        action: "user_proxy"
    })) : $(".user_proxy").hide()
})
});