// Get element shorthand.
const $ = (selector:string) : HTMLElement => {
    return document.querySelector<HTMLElement>(selector);
}

// BEM Modifier ====================================================== //

class BEMModifier {
    public elementName:string;

    // Set element name.
    constructor(elementName:string) {
        this.elementName = elementName;
    }   

    // Add modifier.
    public modifier = (modifier) : string => {
        return this.elementName + `--${modifier}`; 
    }
}

// Navbar ============================================================ // 

class Navbar {
    public static isToggle:boolean = false;
    private static firstInteraction:boolean = true;

    // Click to toggle on/off
    public static toggle = () : void => {
        Navbar.isToggle = !Navbar.isToggle;

        // Start creating modifier.
        const BEM = new BEMModifier('navbar__list');

        // This condition only runs once for the first interaction.
        if (Navbar.firstInteraction) {
            $(`.${BEM.elementName}`).classList.add(BEM.modifier('show'));
            Navbar.firstInteraction = false;
        }

        // Filter changes based on toggle on/off.
        if (!Navbar.isToggle)
            $(`.${BEM.elementName}`).classList.replace(BEM.modifier('show'),BEM.modifier('hide'));
        else
            $(`.${BEM.elementName}`).classList.replace(BEM.modifier('hide'),BEM.modifier('show'));

        // Hide element from the DOM after 'hide' animation ends.
        if ($(`.${BEM.elementName}`).classList.contains(BEM.modifier('hide'))) {

            // This relates to _navbar.scss - line 58th.
            setTimeout(() => {
                $(`.${BEM.elementName}`).classList.add('hidden');
            },1000);
        } else 
            $(`.${BEM.elementName}`).classList.remove('hidden');
    }
}

// Event.
$('.navbar').addEventListener('click',Navbar.toggle);

// =================================================================== //




