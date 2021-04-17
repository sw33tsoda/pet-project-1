// Get element shorthand.
const $ = (selector:string) : HTMLElement => {
    return document.querySelector<HTMLElement>(selector);
}

// BEM Modifier ====================================================== //

class BEMModifier {
    public elementName:string;
    constructor(elementName:string) {
        this.elementName = elementName;
    }   
    public modifier = (modifier) : string => {
        return this.elementName + `--${modifier}`; 
    }
}

// Navbar ============================================================ // 

class Navbar {
    public static isToggle:boolean = false;
    public static toggle = () : void => {
        Navbar.isToggle = !Navbar.isToggle;
        const BEM = new BEMModifier('navbar__list');
        if (!Navbar.isToggle)
            $(`.${BEM.elementName}`).classList.replace(BEM.modifier('show'),BEM.modifier('hide'));
        else
            $(`.${BEM.elementName}`).classList.replace(BEM.modifier('hide'),BEM.modifier('show'));
    }
}

// Event.
$('.navbar').addEventListener('click',Navbar.toggle);

// =================================================================== //




