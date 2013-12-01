(function() {
window.runAfterDomBinding.add("ivory", function() {
var e, t;
return e = $(".header-container"), t = $(".header-container .nav"), Bobcat.TH.applyTouchNav(), 
Bobcat.TH.fixNavOnScroll(e, t, 30);
});
}).call(this);