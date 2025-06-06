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
var JobsPagination = (function () {
    function JobsPagination() {
        var _this = this;
        this.list = [];
        this.pagination = {
            currentPage: 0,
            maxItems: 0,
            itemsPerPage: 6,
            maxPages: 0
        };
        this.paginate = function (direction) {
            var lastPageIndex = _this.pagination.currentPage;
            switch (direction) {
                case 'prev': {
                    if (_this.pagination.currentPage > 0) {
                        _this.pagination.currentPage -= 1;
                    }
                    break;
                }
                case 'next': {
                    if (_this.pagination.currentPage < _this.pagination.maxPages - 1) {
                        _this.pagination.currentPage += 1;
                    }
                    break;
                }
                default: break;
            }
            if (lastPageIndex !== _this.pagination.currentPage) {
                _this.render();
            }
        };
        this.setList = function (list) {
            _this.list = list;
            _this.pagination.maxItems = list.length;
            _this.pagination.maxPages = Math.round(list.length / _this.pagination.itemsPerPage);
            return _this;
        };
        this.getList = function () {
            return _this.list;
        };
        this.render = function () {
            console.log(_this.pagination);
            $('.career__available-jobs__controls__current').innerText = _this.pagination.currentPage + 1 + '';
            var HTML = "";
            var from = _this.pagination.currentPage * _this.pagination.itemsPerPage;
            var to = from + _this.pagination.itemsPerPage;
            var renderList = _this.list.slice(from, to);
            console.log(renderList, from, to);
            for (var _i = 0, renderList_1 = renderList; _i < renderList_1.length; _i++) {
                var item = renderList_1[_i];
                HTML += "\n                <div class='career__available-jobs__list__job'>\n                    <div class='career__available-jobs__list__job__title'>" + item.title + "</div>\n                    <div class='career__available-jobs__list__job__position'>" + item.position + "</div>\n                    <div class='career__available-jobs__list__job__year-exp'>" + item.year_exp_required + "\u5E74</div>\n                    <div class='career__available-jobs__list__job__quantity'>" + item.quantity + " <i class=\"fas fa-user-friends\"></i></div>\n                </div>\n            ";
            }
            $('.career__available-jobs__list').innerHTML = HTML;
        };
        var _loop_1 = function (direction) {
            $(".career__available-jobs__controls__" + direction).addEventListener('click', function () { return _this.paginate(direction); });
        };
        for (var _i = 0, _a = ['prev', 'next']; _i < _a.length; _i++) {
            var direction = _a[_i];
            _loop_1(direction);
        }
    }
    return JobsPagination;
}());
var Slider = (function () {
    function Slider() {
        var _this = this;
        this.list = [];
        this.currentSlide = 0;
        this.delay = 3000;
        this.disabled = false;
        this.setList = function (list) {
            _this.list = list;
            if (_this.list.length > 0 && _this.disabled == false) {
                _this.setCurrentSlide(_this.currentSlide);
                setInterval(function () {
                    if (_this.currentSlide < _this.list.length - 1) {
                        _this.currentSlide += 1;
                    }
                    else {
                        _this.currentSlide = 0;
                    }
                    _this.setCurrentSlide(_this.currentSlide);
                }, _this.delay);
            }
            _this.renderSliderControls();
            return _this;
        };
        this.getList = function () {
            return _this.list;
        };
        this.setCurrentSlide = function (index) {
            _this.currentSlide = index;
            _this.renderSliderControls();
            _this.renderSlide();
        };
        this.renderSliderControls = function () {
            var HTML = '';
            for (var index = 0; index < _this.list.length; index++) {
                HTML += "<div class=\"slider__controls__switch " + (_this.currentSlide == index && 'slider__controls__switch--selected') + "\" onclick='_Slider.setCurrentSlide(" + index + ")'></div>";
            }
            $('.slider__controls').innerHTML = HTML;
        };
        this.renderSlide = function () {
            $('.slider__slide-show').innerHTML = "\n            <div class='slider__slide-show__slide'>\n                <div class='slider__slide-show__slide__left'>\n                    <div class='slider__slide-show__slide__left__title'>" + _this.list[_this.currentSlide].title + "</div>\n                    <div class='slider__slide-show__slide__left__subtitle'>" + _this.list[_this.currentSlide].subtitle + "</div>\n                    <div class='slider__slide-show__slide__left__description'>" + _this.list[_this.currentSlide].description + "</div>\n                    <button class='button'>\u3082\u3063\u3068\u898B\u308B</button>\n                </div>\n                <div class='slider__slide-show__slide__right'>\n                    <div class='slider__slide-show__slide__right__image'>\n                        <img src='" + _this.list[_this.currentSlide].imageUrl + "'/>\n                    </div>\n                </div>\n            </div>\n        ";
        };
    }
    return Slider;
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
        var _loop_2 = function (index) {
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
            _loop_2(index);
        }
        $('#job-form').addEventListener('submit', function (event) {
            event.preventDefault();
        });
    }
    App.prototype.main = function () {
        new Navbar()
            .setTarget('.navbar__icon')
            .setHideDelay(1000)
            .setBlock('navbar')
            .setEle('navbar__list')
            .useScrollToElement(['#_homepage', '#_services', '#_our-team', '#_career', '#_contact']);
        new JobsPagination().setList([
            { title: '野無氏遊', position: 'むお保', year_exp_required: 1, quantity: 5 },
            { title: 'ひほは', position: '課御', year_exp_required: 2, quantity: 10 },
            { title: '課舳', position: '巣雲日手', year_exp_required: 1, quantity: 6 },
            { title: '都模毛', position: '夜ミマ', year_exp_required: 1, quantity: 2 },
            { title: 'ホネル保', position: '舳巣等し', year_exp_required: 1, quantity: 1 },
            { title: 'あゃナカ', position: '樹都模毛', year_exp_required: 0, quantity: 20 },
            { title: 'ぬへ無', position: 'ら根絵ス', year_exp_required: 3, quantity: 5 },
            { title: '無瀬列', position: 'い根舳', year_exp_required: 1, quantity: 3 },
            { title: 'ま以保絵', position: 'てす留個て', year_exp_required: 1, quantity: 6 },
            { title: 'う津派まそ', position: '瀬絵むし', year_exp_required: 1, quantity: 8 },
            { title: '根舳のま', position: '雲舳知', year_exp_required: 1, quantity: 10 },
        ]).render();
    };
    return App;
}());
var _Slider = new Slider();
_Slider.setList([
    { imageUrl: './src/assets/img/slider/pic1.png', title: '等離都', subtitle: '目としらで株藤ろリ空広ヒマ市持もこレ和岩ごぎでま立万無化コレイ', description: '5態チヌ庫事りぼ国関短稿マア済72海事マタメ新笑げゃおフ結記かな新京いぶイ美毎ネヒ最記ッ善大読モ沼稚好つだおや。地モタミ財美こふろ成巨ドぴ所読セレナラ健格止せほみ子転クシカヨ重画りばゅ消九お木9適ロ育球ぶトじ福採行スげ保味フツ優海そな経位るおふゆ外建ヘヨセヌ洗保ラ投受キマ理丁侵ド。' },
    { imageUrl: './src/assets/img/slider/pic2.png', title: '瀬巣知雲', subtitle: 'ーラ公州みッどて組際ろ諸性ト百給フナク稿謙個めぐもド', description: '読とへいぱ減問ムクヤ意任りーふわ大小ッきち字済局コヨイス獲着モイシコ更書ょろべぐ載百ワアヌレ拉票リケ養紙マノ通掲ころで博染速ラセヒ夫査エシソノ必新ぴふ応刊コア出伴飯駆どにごぞ。2西ンも択読やど申侍拓坂マ稿止てさをよ保更ぽ測鼻に権止ヒ交6費大つき全行名やまど。枠先流シニロテ左祐ての懸悪記シユキウ済茨なラ断負セヒ区47注給53載ユミホ報面ずれのら比67自やッえク寿委いこ所詰るざい玲凶圭リッへの。' },
    { imageUrl: './src/assets/img/slider/pic3.png', title: '名等巣樹離', subtitle: 'フぱ攻専勝聞番ん術奪ね化商モイ風日スぼ', description: '道ヨ禁備むづらぽ入長ヲイモ連界さめ載問げ律尾いばよさ手短フエト者行ケ足62銀治ヌメチフ流芸そず後利メヨ先滋カユヤヨ経指申父孝わゅ。大ぼーフの今髪6高ッあら寄鋭ッ産堀9学ごぶね礎身択祉ロ金科抜爆間ぼくゃド。静へ投年ヨ持糸来ツナ裁後く無権ぱむいレ野体ツヲチ芸作ぶ来治てとめ草分テ困連ナミケ名月フユワ学青授員局しぜ。' },
]);
var app = new App().main();
