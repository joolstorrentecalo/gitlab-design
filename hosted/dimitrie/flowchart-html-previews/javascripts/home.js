$(function() {
  var n, r = $(".cycle-icon-row");
  $(".cycle-icon-row").removeClass("stuck"),
  $(document).scroll(function() {
    var t = $(".navbar-fixed-top").height()
      , o = $(".cycle-icon-row").height()
      , e = $(window).scrollTop();
    if (r.is(":visible")) {
      e < n && r.hasClass("stuck") && r.removeClass("stuck"),
      e >= r.offset().top - t && !r.hasClass("stuck") && (n = r.offset().top - t,
      r.addClass("stuck")),
      e >= $(".idea-to-production").offset().top && r.removeClass("stuck");
      var a;
      $(".cycle-vertical .step").each(function() {
        var s = $(this).offset().top - t - 3.5 * o;
        if ($(".cycle-icon-row .step").removeClass("active"),
        s - 1 < e && (a = $(this)),
        a) {
          var i = a.attr("id");
          $('a[href="#' + i + '"]').addClass("active")
        }
      })
    }
  }),
  $(".cycle-icon-row .step").on("click", function(t) {
    t.preventDefault();
    var $o = $(this);
    var anchor = $o.attr("href");
    $("html, body").animate({
      scrollTop: $(anchor).offset().top - 200
    }, 1e3)
  })
});
