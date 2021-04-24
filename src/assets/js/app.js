var windowResizeDebounce = null;
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
        this.useScrollToElement = function (navItemIds) {
            for (var _i = 0, navItemIds_1 = navItemIds; _i < navItemIds_1.length; _i++) {
                var _id = navItemIds_1[_i];
                if ($(_id) !== null)
                    $(_id).addEventListener('click', function (event) {
                        var id = event.target.id;
                        id = id.slice(1, id.length);
                        $("#" + id).scrollIntoView({ behavior: 'smooth', block: 'end' });
                    });
            }
            return _this;
        };
        this.toggle = function () {
            _this.isToggle = !_this.isToggle;
            var bem_block = new BEMModifier(_this.block);
            var bem_ele = new BEMModifier(_this.ele);
            if (_this.firstInteraction) {
                $("." + bem_ele.name).classList.add(bem_ele.modifier('show'));
                _this.firstInteraction = false;
            }
            if (!_this.isToggle) {
                $("." + bem_ele.name).classList.replace(bem_ele.modifier('show'), bem_ele.modifier('hide'));
                $("." + bem_block.name).style.backgroundColor = "";
            }
            else {
                $("." + bem_ele.name).classList.replace(bem_ele.modifier('hide'), bem_ele.modifier('show'));
                $("." + bem_block.name).style.backgroundColor = "crimson";
            }
            if ($("." + bem_ele.name).classList.contains(bem_ele.modifier('hide'))) {
                setTimeout(function () {
                    if ($("." + bem_ele.name).classList.contains(bem_ele.modifier('hide')))
                        $("." + bem_ele.name).classList.add('hidden');
                }, _this.hideDelay);
            }
            else
                $("." + bem_ele.name).classList.remove('hidden');
        };
    }
    return Navbar;
}());
var App = (function () {
    function App() {
        window.onload = function () {
        };
        window.addEventListener('scroll', function () {
            if (window.scrollY > 35) {
                $('.header').classList.add('breakline');
            }
            else if (window.scrollY <= 35) {
                $('.header').classList.remove('breakline');
            }
        });
        var _loop_1 = function (index) {
            document.querySelectorAll('.form-control__input')[index].addEventListener('focus', function () {
                document.querySelectorAll('.form-control__input')[index].previousElementSibling.classList.add('form-control__label--has-value');
            });
            document.querySelectorAll('.form-control__input')[index].addEventListener('blur', function () {
                if (document.querySelectorAll('.form-control__input')[index].value == '') {
                    document.querySelectorAll('.form-control__input')[index].previousElementSibling.classList.remove('form-control__label--has-value');
                }
            });
        };
        for (var index = 0; index < document.querySelectorAll('.form-control__input').length; index++) {
            _loop_1(index);
        }
    }
    App.prototype.main = function () {
        new Navbar()
            .setTarget('.navbar__icon')
            .setHideDelay(1000)
            .setBlock('navbar')
            .setEle('navbar__list')
            .useScrollToElement(['#_homepage', '#_services', '#_our-team', '#_career', '#_contact']);
    };
    return App;
}());
var app = new App().main();
