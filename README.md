# smallpic-2-css
==================
[![NPM version][npm-image]][npm-url]
![][david-url]
![][travis-url]

Generate css from specify small pictures. This is not a sprite generator, we don't generate a sprite picture, but css with `url` as `background-image` instead.

`smallpic-2-css` is designed for legacy projects which you are planning to remove compass sprite usage with `url-loader` way proposed by `webpack`.

Let's say you already have a folder that contains lots of small pictures, and they were supposed to combined to sprite picture with css. Now, if you are going to do in `webpack` way, you don't need a sprite picture anymore, but css is still required. Try this library.


## Installation

```bash
npm install smallpic-2-css --save
```

## Usage

```javascript
var gen = require('smallpic-2-css');

gen('root/logo/*.png', {
    out: cssPath,
    urlRoot: '../logo/',
    picSizeLimit: 10240, //picture will be ignored while generating css
    quite: true    //warning will be ignored
}, function(err){
    if(err){
        //error occurred while generating css
    }
});
```

In above example, let's say we have following structure:

```
|root
|----logo/
|    |---es6.png
|    |---react-logo.png
```

The `css` will be generated to `root/dist/generated.css`, and content would be like this:

```css
.es6{
    width: 406px;
    height: 140px;
    background-image: url(../logo/es6.png);
}
.react-logo{
    width: 391px;
    height: 377px;
    background-image: url(../logo/react-logo.png);
}
```

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/smallpic-2-css/master/LICENSE)




[npm-url]: https://npmjs.org/package/smallpic-2-css
[npm-image]: https://badge.fury.io/js/smallpic-2-css.png
[david-url]: https://david-dm.org/leftstick/smallpic-2-css.png
[travis-url]:https://api.travis-ci.org/leftstick/smallpic-2-css.svg?branch=master
