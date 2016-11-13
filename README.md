# Fetch API
I have created a fetch api for xhr requests. I have taken the xhr api and added the promises api to it.

```javascript
fetchAPI('http://github.com').then( response => {
  console.log(response);
}).catch( err => {
  console.error(err);
});
```

You can also add a response type after the url (only json and text are available). If you don't it defaults to text.
