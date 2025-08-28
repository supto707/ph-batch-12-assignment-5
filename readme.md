## Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll:
1. getElementById("id") → Selects one element by its unique ID.

2. getElementsByClassName("class") → Selects all elements with that class (returns live HTMLCollection).

3. querySelector("selector") → Selects the first element matching a CSS selector.

4. querySelectorAll("selector") → Selects all elements matching a CSS selector (returns static NodeList).


## Create and insert a new element into the DOM: 

> let div = document.createElement("div");  
div.textContent = "Hello!";  
document.body.appendChild(div);  


## Event Bubbling:
When an event is triggered on an element, it bubbles up through its parent elements to the root (document). Example: clicking a button inside a div → event triggers on button → div → body → document.


## Event Delegation:
Instead of adding listeners to many child elements, you attach a single listener to a parent element and detect the target using event.target.
✅ Useful for performance and handling dynamically added elements.


## Difference between preventDefault() and stopPropagation():

# preventDefault() → Stops the default action (e.g., form submission, link navigation).

# stopPropagation() → Stops the event from bubbling up to parent elements.