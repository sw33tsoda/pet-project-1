// Get element shorthand.
var $ = function (selector) {
    return document.querySelector(selector);
};
// BEM Modifier ====================================================== //
var BEMModifier = /** @class */ (function () {
    function BEMModifier(elementName) {
        var _this = this;
        this.modifier = function (modifier) {
            return _this.elementName + ("--" + modifier);
        };
        this.elementName = elementName;
    }
    return BEMModifier;
}());
// Navbar ============================================================ // 
var Navbar = /** @class */ (function () {
    function Navbar() {
    }
    Navbar.isToggle = false;
    Navbar.toggle = function () {
        Navbar.isToggle = !Navbar.isToggle;
        var BEM = new BEMModifier('navbar__list');
        if (!Navbar.isToggle)
            $("." + BEM.elementName).classList.replace(BEM.modifier('show'), BEM.modifier('hide'));
        else
            $("." + BEM.elementName).classList.replace(BEM.modifier('hide'), BEM.modifier('show'));
    };
    return Navbar;
}());
// Event.
$('.navbar').addEventListener('click', Navbar.toggle);
// =================================================================== //
