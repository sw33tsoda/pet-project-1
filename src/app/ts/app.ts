let windowResizeDebounce = null;

// Get element shorthand.
const $ = (selector:string) : HTMLElement => {
    return document.querySelector<HTMLElement>(selector);
}

class BEMModifier {
    public name:string;

    // Set element name.
    constructor(elementName:string) {
        this.name = elementName;
    }   

    // Add modifier.
    public modifier = (modifier) : string => {
        return this.name + `--${modifier}`; 
    }
}


class Navbar {
    private isToggle:boolean = false;
    private firstInteraction:boolean = true;
    private hideDelay = 0;
    private block = '';
    private ele = '';

    public setTarget = (selector:string) : Navbar => {
        $(selector).addEventListener('click',this.toggle);
        return this;
    }

    public setHideDelay = (ms:number) : Navbar => {
        this.hideDelay = ms;
        return this;
    }

    public setBlock = (blockName:string) : Navbar => {
        this.block = blockName;
        return this;
    }

    public setEle = (eleName:string) : Navbar => {
        this.ele = eleName;
        return this;
    }

    public useScrollToElement = (navItemIds:Array<string>) : Navbar => {
        for (const _id of navItemIds) {
            if ($(_id) !== null)
                $(_id).addEventListener<any>('click', (event) => {
                    let { id } = event.target;
                    id = id.slice(1,id.length);
                    $(`#${id}`).scrollIntoView({behavior:'smooth', block:'end'});
                })
        }

        return this;
    }

    // Click to toggle on/off
    public toggle = () : void => {
        this.isToggle = !this.isToggle;

        // Start creating modifier.
        const bem_block = new BEMModifier(this.block);
        const bem_ele = new BEMModifier(this.ele);

        // This condition only runs once for the first interaction.
        if (this.firstInteraction) {
            $(`.${bem_ele.name}`).classList.add(bem_ele.modifier('show'));
            this.firstInteraction = false;
        }

        // Filter changes based on toggle on/off.
        if (!this.isToggle) {
            $(`.${bem_ele.name}`).classList.replace(bem_ele.modifier('show'),bem_ele.modifier('hide'));
            $(`.${bem_block.name}`).style.backgroundColor = ""
        } else {
            $(`.${bem_ele.name}`).classList.replace(bem_ele.modifier('hide'),bem_ele.modifier('show'));
            $(`.${bem_block.name}`).style.backgroundColor = "crimson";
        }

        // Hide element from the DOM after 'hide' animation ends.
        if ($(`.${bem_ele.name}`).classList.contains(bem_ele.modifier('hide'))) {

            // This relates to _navbar.scss - line 58th.
            setTimeout(() => {
                if ($(`.${bem_ele.name}`).classList.contains(bem_ele.modifier('hide'))) 
                    $(`.${bem_ele.name}`).classList.add('hidden');
            },this.hideDelay);
        } else 
            $(`.${bem_ele.name}`).classList.remove('hidden');
    }
}


// =================================================================== //



interface Job {
    title?:string,
    position?:string,
    year_exp_required?:number,
    quantity?:number,
}

class JobsPagination {
    private list:Array<Job> = [];
    private pagination = {
        currentPage:0,
        maxItems:0,
        itemsPerPage:6,
        maxPages:0,
    };

    constructor() {
        for (const direction of ['prev','next']) {
            $(`.career__available-jobs__controls__${direction}`).addEventListener('click', () => this.paginate(direction));
        }
    }

    public paginate = (direction:string) : void => {
        const lastPageIndex = this.pagination.currentPage;
        switch (direction) {
            case 'prev' : {
                if (this.pagination.currentPage > 0) {
                    this.pagination.currentPage -=1;
                }
                break;
            }

            case 'next' : {
                if (this.pagination.currentPage < this.pagination.maxPages - 1) {
                    this.pagination.currentPage +=1;
                }
                break;
            }
            default:break;
        }
        if (lastPageIndex !== this.pagination.currentPage) {
            this.render();
        }
    }
    
    public setList = (list:Array<Job>) : JobsPagination => {
        this.list = list;
        this.pagination.maxItems = list.length;
        this.pagination.maxPages = Math.round(list.length / this.pagination.itemsPerPage);

        return this;
    }

    public getList = () : Array<Job> => {
        return this.list;
    }

    public render = () : void => {
        console.log(this.pagination);
        $('.career__available-jobs__controls__current').innerText = this.pagination.currentPage + 1 + '';
        let HTML = ``;
        const from = this.pagination.currentPage * this.pagination.itemsPerPage;
        const to = from + this.pagination.itemsPerPage;
        const renderList = this.list.slice(from,to);
        console.log(renderList,from,to);
        for (const item of renderList) {
            HTML += `
                <div class='career__available-jobs__list__job'>
                    <div class='career__available-jobs__list__job__title'>${item.title}</div>
                    <div class='career__available-jobs__list__job__position'>${item.position}</div>
                    <div class='career__available-jobs__list__job__year-exp'>${item.year_exp_required}年</div>
                    <div class='career__available-jobs__list__job__quantity'>${item.quantity} <i class="fas fa-user-friends"></i></div>
                </div>
            `;
        }
        $('.career__available-jobs__list').innerHTML = HTML;
    }
}

interface Slide {
    imageUrl?:string,
    title?:string,
    subtitle?:string,
    description?:string,
}

class Slider {
    private list:Array<Slide> = [];
    private currentSlide = 0;
    private delay = 3000;
    private disabled = false;

    constructor() {
        
    }
    
    public setList = (list:Array<Slide>) : Slider => {
        this.list = list;
        if (this.list.length > 0 && this.disabled == false) {
            this.setCurrentSlide(this.currentSlide);
            setInterval(() => {
                if (this.currentSlide < this.list.length - 1) {
                    this.currentSlide += 1;
                } else {
                    this.currentSlide = 0;
                }
                this.setCurrentSlide(this.currentSlide);
    
            },this.delay);
        }
        this.renderSliderControls();
        return this;
    }

    public getList = () : Array<Slide> => {
        return this.list;
    }

    public setCurrentSlide = (index:number) : void => {
        this.currentSlide = index;
        this.renderSliderControls();
        this.renderSlide();
    }

    public renderSliderControls = () : void => {
        let HTML = '';
        for (let index = 0; index < this.list.length; index++) {
            HTML += `<div class="slider__controls__switch ${this.currentSlide == index && 'slider__controls__switch--selected'}" onclick='_Slider.setCurrentSlide(${index})'></div>`
        }
        // console.log(HTML);
        $('.slider__controls').innerHTML = HTML;
    }

    public renderSlide = () : void => {
        $('.slider__slide-show').innerHTML = `
            <div class='slider__slide-show__slide'>
                <div class='slider__slide-show__slide__left'>
                    <div class='slider__slide-show__slide__left__title'>${this.list[this.currentSlide].title}</div>
                    <div class='slider__slide-show__slide__left__subtitle'>${this.list[this.currentSlide].subtitle}</div>
                    <div class='slider__slide-show__slide__left__description'>${this.list[this.currentSlide].description}</div>
                    <button class='button'>もっと見る</button>
                </div>
                <div class='slider__slide-show__slide__right'>
                    <div class='slider__slide-show__slide__right__image'>
                        <img src='${this.list[this.currentSlide].imageUrl}'/>
                    </div>
                </div>
            </div>
        `;
    }
}


class App {
    constructor() {
        window.onload = () : void => {
           
        }
        
        window.addEventListener('scroll', () : void => {
            if (window.scrollY > 35) {
                $('.header').classList.add('breakline');
            } else if (window.scrollY <= 35) {
                $('.header').classList.remove('breakline');
            }
        });

        for (let index = 0; index < document.querySelectorAll('.form-control__input').length; index++) {
            document.querySelectorAll('.form-control__input')[index].addEventListener('focus',() => {
                document.querySelectorAll('.form-control__input')[index].previousElementSibling.classList.add('form-control__label--has-value');
            });
            document.querySelectorAll('.form-control__input')[index].addEventListener('blur',() => {
                if (document.querySelectorAll<HTMLInputElement>('.form-control__input')[index].value == '') {
                    document.querySelectorAll('.form-control__input')[index].previousElementSibling.classList.remove('form-control__label--has-value');
                }
            });
        }

        $('#job-form').addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }
    
    public main() { 
        new Navbar()
            .setTarget('.navbar__icon')
            .setHideDelay(1000)
            .setBlock('navbar')
            .setEle('navbar__list')
            .useScrollToElement(['#_homepage','#_services','#_our-team','#_career','#_contact']);

        new JobsPagination().setList([
            {title:'野無氏遊',position:'むお保',year_exp_required:1,quantity:5},
            {title:'ひほは',position:'課御',year_exp_required:2,quantity:10},
            {title:'課舳',position:'巣雲日手',year_exp_required:1,quantity:6},
            {title:'都模毛',position:'夜ミマ',year_exp_required:1,quantity:2},
            {title:'ホネル保',position:'舳巣等し',year_exp_required:1,quantity:1},
            {title:'あゃナカ',position:'樹都模毛',year_exp_required:0,quantity:20},
            {title:'ぬへ無',position:'ら根絵ス',year_exp_required:3,quantity:5},
            {title:'無瀬列',position:'い根舳',year_exp_required:1,quantity:3},
            {title:'ま以保絵',position:'てす留個て',year_exp_required:1,quantity:6},
            {title:'う津派まそ',position:'瀬絵むし',year_exp_required:1,quantity:8},
            {title:'根舳のま',position:'雲舳知',year_exp_required:1,quantity:10},
        ]).render();

    }
}

const _Slider = new Slider();
_Slider.setList([
    {imageUrl:'./src/assets/img/slider/pic1.png',title:'等離都',subtitle:'目としらで株藤ろリ空広ヒマ市持もこレ和岩ごぎでま立万無化コレイ',description:'5態チヌ庫事りぼ国関短稿マア済72海事マタメ新笑げゃおフ結記かな新京いぶイ美毎ネヒ最記ッ善大読モ沼稚好つだおや。地モタミ財美こふろ成巨ドぴ所読セレナラ健格止せほみ子転クシカヨ重画りばゅ消九お木9適ロ育球ぶトじ福採行スげ保味フツ優海そな経位るおふゆ外建ヘヨセヌ洗保ラ投受キマ理丁侵ド。'},
    {imageUrl:'./src/assets/img/slider/pic2.png',title:'瀬巣知雲',subtitle:'ーラ公州みッどて組際ろ諸性ト百給フナク稿謙個めぐもド',description:'読とへいぱ減問ムクヤ意任りーふわ大小ッきち字済局コヨイス獲着モイシコ更書ょろべぐ載百ワアヌレ拉票リケ養紙マノ通掲ころで博染速ラセヒ夫査エシソノ必新ぴふ応刊コア出伴飯駆どにごぞ。2西ンも択読やど申侍拓坂マ稿止てさをよ保更ぽ測鼻に権止ヒ交6費大つき全行名やまど。枠先流シニロテ左祐ての懸悪記シユキウ済茨なラ断負セヒ区47注給53載ユミホ報面ずれのら比67自やッえク寿委いこ所詰るざい玲凶圭リッへの。'},
    {imageUrl:'./src/assets/img/slider/pic3.png',title:'名等巣樹離',subtitle:'フぱ攻専勝聞番ん術奪ね化商モイ風日スぼ',description:'道ヨ禁備むづらぽ入長ヲイモ連界さめ載問げ律尾いばよさ手短フエト者行ケ足62銀治ヌメチフ流芸そず後利メヨ先滋カユヤヨ経指申父孝わゅ。大ぼーフの今髪6高ッあら寄鋭ッ産堀9学ごぶね礎身択祉ロ金科抜爆間ぼくゃド。静へ投年ヨ持糸来ツナ裁後く無権ぱむいレ野体ツヲチ芸作ぶ来治てとめ草分テ困連ナミケ名月フユワ学青授員局しぜ。'},
]);

const app = new App().main();



