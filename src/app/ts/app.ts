let windowResizeDebounce = null;

function onWidthChanges(width:number,callback) : void {
    if (window.outerWidth > width)
        callback();
}

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

    // Click to toggle on/off
    public toggle = () : void => {
        this.isToggle = !this.isToggle;

        // Start creating modifier.
        const _block = new BEMModifier(this.block);
        const _ele = new BEMModifier(this.ele);

        // This condition only runs once for the first interaction.
        if (this.firstInteraction) {
            $(`.${_ele.name}`).classList.add(_ele.modifier('show'));
            this.firstInteraction = false;
        }

        // Filter changes based on toggle on/off.
        if (!this.isToggle) {
            $(`.${_ele.name}`).classList.replace(_ele.modifier('show'),_ele.modifier('hide'));
            $(`.${_block.name}`).style.backgroundColor = ""
        } else {
            $(`.${_ele.name}`).classList.replace(_ele.modifier('hide'),_ele.modifier('show'));
            $(`.${_block.name}`).style.backgroundColor = "crimson";
        }

        // Hide element from the DOM after 'hide' animation ends.
        if ($(`.${_ele.name}`).classList.contains(_ele.modifier('hide'))) {

            // This relates to _navbar.scss - line 58th.
            setTimeout(() => {
                if ($(`.${_ele.name}`).classList.contains(_ele.modifier('hide'))) 
                    $(`.${_ele.name}`).classList.add('hidden');
            },this.hideDelay);
        } else 
            $(`.${_ele.name}`).classList.remove('hidden');
    }
}


// =================================================================== //

// Event.


class App {
    constructor() {
        window.onload = () : void => {
            onWidthChanges(1024,() => {
    
            });
        }
        
        window.addEventListener('resize', (event) : void => {
            clearInterval(windowResizeDebounce);
                windowResizeDebounce = setTimeout(() => {
                onWidthChanges(1024,() => {
                    // thing want to change...
                });
            },50);
        });
    }
    
    public main() {
        new Navbar().setTarget('.navbar__icon').setHideDelay(1000).setBlock('navbar').setEle('navbar__list');
    }
}

const app = new App().main();



