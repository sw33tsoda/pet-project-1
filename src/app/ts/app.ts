let windowResizeDebounce = null;

// Get element shorthand.
const $ = (selector:string) : HTMLElement => {
    return document.querySelector<HTMLElement>(selector);
}

// BEM Modifier ====================================================== //

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

// Navbar ============================================================ // 

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

// Event.


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
                if (document.querySelectorAll('.form-control__input')[index].value == '') {
                    document.querySelectorAll('.form-control__input')[index].previousElementSibling.classList.remove('form-control__label--has-value');
                }
            });
        }
    }
    
    public main() { 
        new Navbar()
            .setTarget('.navbar__icon')
            .setHideDelay(1000)
            .setBlock('navbar')
            .setEle('navbar__list')
            .useScrollToElement(['#_homepage','#_services','#_our-team','#_career','#_contact']);
    }
}

const app = new App().main();



