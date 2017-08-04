/** 
 *
 * Side menu by *Lepistina* with:
 * - Hover effects on each menu item
 * - Menu updates 'active' section as you scroll
 * - 'Smooth scroll' to section on menu click
 * - Only the currently active menu item is presented
 * - Font Awesome Icons and text on each menu link
 * 
 */

// Keep track of the currently selected menu item
var current;

// CSS Selector for each of the menu links
var menuLinkSelector = ".sscroll";

// Font Awesome icon class to use for selected menu item 
var menuIconActive = "fa-circle";

// Font Awesome icon class to use for muted menu items
var menuIconPassive = "fa-circle-o";

/** 
 * Setup menu 
 */
$(document).ready(function () {

    // Add event handler to move between menu items as we scroll
    $(document).on("scroll", onScrollHandler);
    
    // Add event handler when menu links are clicked
    $(menuLinkSelector).on('click', onClickHandler);
    
    // When we hover over menu items we want to hide and show them
    // We need to be careful and skip removing the annotations
    // from the currently selected menu item so we just filter it out.
    $(menuLinkSelector).hover(
        function() {
            // Event handler when mouse enters
            menuAdd($(this));
        }, function() {
            // Event handler when mouse leaves
            menuRemove($(this).not(current));
        }
    );
});

/** 
 * Event handler when we scroll
 */
function onScrollHandler(event){
    // save the current position of the scroll bar
    var scrollBarPos = $(document).scrollTop();

    // add event handler to each of the menu links
    $(menuLinkSelector).each(function () {
        var currentElement = $(this);
        // find the section which corresponds to the clicked link
        // we use the ID of the section element stored in the href attribute
        var destinationSection = $(currentElement.attr("href"));

        /**
         * calculate the absolute position of the section to know if we are
         * currently scrolling through it:
         * - scrollbar must be lower(bigger) than the absolute top of the section 
         * - scrollbar must be highter(larger) than the top of section plus its height
         */
        if (destinationSection.position().top <= scrollBarPos && 
            destinationSection.position().top + destinationSection.height() > scrollBarPos) {

            // remove from all links
            menuRemove($(menuLinkSelector));
            
            // add the one we clicked
            menuAdd(currentElement);

            // keep track of selected menu item
            current = currentElement;
        }
    });
}

/** 
 * Event handler when we click on a menu item
 */
function onClickHandler(event) {      
    // cancel the event since we are handling it
    event.preventDefault();

    // remove decorations from all menu items
    menuRemove($(menuLinkSelector));

    // show decoration on the clicked menu item
    menuAdd($(this));

    // keep track of the menu item currently selected
    current = $(this);

    // find the section element where we want to navigate to
    $target = $(this.hash);

    // animate the 'smooth scroll' to the desired section
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
    }, 500, 'swing');
}

/** 
 * Hide the menu item
 * @actionElem - menu item to hide
 */
function menuRemove(actionElem) {
    // Reset everything, hide the text and swap the icon
    actionElem.find("span").addClass("hidden"); 
    actionElem.find("i").removeClass(menuIconActive);
    actionElem.find("i").addClass(menuIconPassive);
}

/** 
 * Display the menu item
 * @actionElem - menu item to display
 */
function menuAdd(actionElem) {
    // Show the text and swap the icons
    actionElem.find("span").removeClass("hidden");
    actionElem.find("i").removeClass(menuIconPassive);
    actionElem.find("i").addClass(menuIconActive);
}