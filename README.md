# Material Elements
I've made easy to use material and/or flat APIs

## Toast API
I have created a toast api that looks like the android toasts.

### How to use
#### Basic
```javascript
// First create the new toast
const toast = new Toast(1000); // The number is the amount of miliseconds the toast must be displayed.

// Let it toast
toast.toast('Hi');
```
**Note that I have used ES16 functions in this api, it's not for production or you have to change it.**

#### Buttons
```javascript
// Create a buttons array
const buttons = [
	{
		'name': 'close', // Name is required.
		'onclick': 'closeToast' // You can give the function name or use 'closeToast' to give the command to close the toast.
	},
	{
		'name': 'lol',
		'onclick': () => {console.log('hi')} // Fat arrow functions also work.
	},
	{
		'name': 'Hi',
		'onclick': hi
	}
];
      
const toast = new Toast(1000);

toast.toast('Hi', buttons);

function hi() {
	console.log('Hi');
}
```

## Pop Up
### Basic
```javascript
// Create a new Pop Up
popUp = new PopUp();

// Then show it
popUp.show('Hi');
```
The Pop Up has three functions
	- show
	- close
	- delete

**Show**
Show as you can guess shows the pop up with text and returns a [promise](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise).

**Close**
Close closes the pop up and returns a [promise](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise).

**Delete**
Deletes the whole pop up.

### Animations
You can set custom transition properties.
You can use:
	- duration (= The transition-duration in miliseconds, defaults to 1000)
	- timingFunction (defaults to 'ease')
