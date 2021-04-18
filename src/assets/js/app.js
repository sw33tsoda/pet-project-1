var $ = function (selector) {
    return document.querySelector(selector);
};
var BEMModifier = (function () {
    function BEMModifier(elementName) {
        var _this = this;
        this.modifier = function (modifier) {
            return _this.elementName + ("--" + modifier);
        };
        this.elementName = elementName;
    }
    return BEMModifier;
}());
var Navbar = (function () {
    function Navbar() {
    }
    Navbar.isToggle = false;
    Navbar.firstInteraction = true;
    Navbar.toggle = function () {
        Navbar.isToggle = !Navbar.isToggle;
        var BEM = new BEMModifier('navbar__list');
        if (Navbar.firstInteraction) {
            $("." + BEM.elementName).classList.add(BEM.modifier('show'));
            Navbar.firstInteraction = false;
        }
        if (!Navbar.isToggle)
            $("." + BEM.elementName).classList.replace(BEM.modifier('show'), BEM.modifier('hide'));
        else
            $("." + BEM.elementName).classList.replace(BEM.modifier('hide'), BEM.modifier('show'));
        if ($("." + BEM.elementName).classList.contains(BEM.modifier('hide'))) {
            setTimeout(function () {
                $("." + BEM.elementName).classList.add('hidden');
            }, 1000);
        }
        else
            $("." + BEM.elementName).classList.remove('hidden');
    };
    return Navbar;
}());
$('.navbar').addEventListener('click', Navbar.toggle);
