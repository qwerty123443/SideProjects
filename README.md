# Fetch API
I have created a fetch api for xhr requests. I have taken the xhr api and added the promises api to it.

```javascript
get('http://github.com').then( response => {
  console.log(response);
}).catch( err => {
  console.error(err);
});
```
Note that I have used the fat arrow functions here, you don't have to.

You can also add a response type after the url (only json and text are available). If you don't it defaults to text.
