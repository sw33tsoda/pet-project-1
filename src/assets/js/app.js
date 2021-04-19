var windowResizeDebounce = null;
function onWidthChanges(width, callback) {
    if (window.outerWidth > width)
        callback();
}
var $ = function (selector) {
    return document.querySelector(selector);
};
var BEMModifier = (function () {
    function BEMModifier(elementName) {
        var _this = this;
        this.modifier = function (modifier) {
            return _this.name + ("--" + modifier);
        };
        this.name = elementName;
    }
    return BEMModifier;
}());
var Navbar = (function () {
    function Navbar() {
        var _this = this;
        this.isToggle = false;
        this.firstInteraction = true;
        this.hideDelay = 0;
        this.block = '';
        this.ele = '';
        this.setTarget = function (selector) {
            $(selector).addEventListener('click', _this.toggle);
            return _this;
        };
        this.setHideDelay = function (ms) {
            _this.hideDelay = ms;
            return _this;
        };
        this.setBlock = function (blockName) {
            _this.block = blockName;
            return _this;
        };
        this.setEle = function (eleName) {
            _this.ele = eleName;
            return _this;
        };
        this.toggle = function () {
            _this.isToggle = !_this.isToggle;
            var _block = new BEMModifier(_this.block);
            var _ele = new BEMModifier(_this.ele);
            if (_this.firstInteraction) {
                $("." + _ele.name).classList.add(_ele.modifier('show'));
                _this.firstInteraction = false;
            }
            if (!_this.isToggle) {
                $("." + _ele.name).classList.replace(_ele.modifier('show'), _ele.modifier('hide'));
                $("." + _block.name).style.backgroundColor = "";
            }
            else {
                $("." + _ele.name).classList.replace(_ele.modifier('hide'), _ele.modifier('show'));
                $("." + _block.name).style.backgroundColor = "crimson";
            }
            if ($("." + _ele.name).classList.contains(_ele.modifier('hide'))) {
                setTimeout(function () {
                    if ($("." + _ele.name).classList.contains(_ele.modifier('hide')))
                        $("." + _ele.name).classList.add('hidden');
                }, _this.hideDelay);
            }
            else
                $("." + _ele.name).classList.remove('hidden');
        };
    }
    return Navbar;
}());
var App = (function () {
    function App() {
        window.onload = function () {
            onWidthChanges(1024, function () {
            });
        };
        window.addEventListener('resize', function (event) {
            clearInterval(windowResizeDebounce);
            windowResizeDebounce = setTimeout(function () {
                onWidthChanges(1024, function () {
                });
            }, 50);
        });
    }
    App.prototype.main = function () {
        new Navbar().setTarget('.navbar__icon').setHideDelay(1000).setBlock('navbar').setEle('navbar__list');
    };
    return App;
}());
var app = new App().main();
