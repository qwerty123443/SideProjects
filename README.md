# Fetch API
I have created a toast api that looks like the android toasts.

## How to use
### Basic
```javascript
// First create the new toast
let toast = new Toast(1000); // The number is the amount of miliseconds the toast must be displayed.

// Let it toast
toast.toast('Hi');
```
**Note that I have used ES16 functions in this api, it's not for production or you have to change it.**

### For buttons
```javascript
// Create a buttons array
let buttons = [
	{
		'name': 'close', // Name is required.
		'onclick': 'closeToast' // You can give the function name or use 'closeToast' to give the command to close the toast.
	},
	{
		'name': 'lol',
		'onclick': () => {console.log('hi')} // Fat arrow functions also work.
	}
];
      
let toast = new Toast(1000);

toast.toast('Hi', buttons);
```
