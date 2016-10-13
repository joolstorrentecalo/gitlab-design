function shuffle(t) {
    for (var o, e, a = t.length; 0 !== a;) e = Math.floor(Math.random() * a), a -= 1, o = t[a], t[a] = t[e], t[e] = o;
    return t
}
$(function() {
    var t = $("#js-testimonials-slider");
    t.length && t.slick({
        arrows: !1,
        autoplay: !0,
        autoplaySpeed: 5e3,
        dots: !0
    });
    var o = $("#js-landing-community");
    if (o.length) {
        var e = Math.floor(o.height() / 100 * 40),
            a = 6,
            s = 0,
            i = 55,
            c = $(window).width();
        c >= 1200 ? (e = Math.floor(o.height() / 100 * 75), a = 20, i = 60) : c >= 990 ? (e = Math.floor(o.height() / 100 * 55), a = 10, i = 99) : c >= 768 && (e = Math.floor(o.height() / 100 * 40), a = 8, i = 96), s = Math.ceil(e / i), imgsCount = s * a, $.getJSON("team.json", function(t) {
            var e = shuffle(t.concat(t.concat(t))),
                a = [];
            $.each(e, function(t) {
                if (t < imgsCount) {
                    var o = $("<img />", {
                        src: this.picture
                    });
                    o.on("load", function() {
                        var t = $(this);
                        setTimeout(function() {
                            t.addClass("is-loaded")
                        }, 1e3)
                    }), a.push($('<div class="community-image">').append(o))
                }
            }), o.append(a)
        })
    }
    var n, r = $(".cycle-icon-row");
    $(".cycle-icon-row").removeClass("stuck"), $(document).scroll(function() {
        var t = $(".navbar-fixed-top").height(),
            o = $(".cycle-icon-row").height(),
            e = $(window).scrollTop();
        if (r.is(":visible")) {
            e < n && r.hasClass("stuck") && r.removeClass("stuck"), e >= r.offset().top - t && !r.hasClass("stuck") && (n = r.offset().top - t, r.addClass("stuck")), e >= $(".idea-to-production").offset().top && r.removeClass("stuck");
            var a;
            $(".cycle-vertical .step").each(function() {
                var s = $(this).offset().top - t - 3.5 * o;
                if ($(".cycle-icon-row .step").removeClass("active"), s - 1 < e && (a = $(this)), a) {
                    var i = a.attr("id");
                    $('a[href="#' + i + '"]').addClass("active")
                }
            })
        }
    }), $(".cycle-icon-row .step").on("click", function(t) {
        t.preventDefault();
        var o = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(o).offset().top - 200
        }, 1e3)
    })
});
