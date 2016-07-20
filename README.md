# Seleto
#### Installation
```cli
  npm install seleto
```

####  Test
```cli
    npm test
```

*`Seleto.js`* is a lightning-fast, lightweight DOM selector; and it is highly extensible.
##Why Seleto?
One may be tempted to ask 'why seleto?' when we have the likes of `jQuery, Qwery and zepto`. The answer is as simple as `seleto` itself; I wanted a DOM selector that has the selection capabilities of the mentioned libraries but does not come with all the pletora of unwanted utilities that fused into them that we must ship with our works whether they are wanted or not.  Ok, with that out of the way, let us see what `seleto` can do.

Well, if you have ever used(is there anyone who hasn't?)  `jQuery`, using `seleto` will come natural. While `seleto` works like `jQuery`, do not expect everything that works on `jQuery` to work in `seleto`. I mean, while would anyone wants to make another `jQuery`?

### List of `seleto`'s supported selectors 
The following are the selectors/operations supported by `seleto`:

- **`Id:`**  `$('#Id')`

- **`Class: `**`$('.class')`

- **`Element:`** `$('p')`

- **`Attribute:`**`$('[type]')`

- **`Pseudos:`**` $(':radio')`, others are `:<type>` where `<type>` could be checkbox, text etc. or 'checked' for `radios and checkboxes`.

- **`Pseudo_Pseudo:`** `$('checkbox:checked')`

- **`Attribute_Pseudo:`** `$('[data-validations]:text')`

- **`Attribute_Value:`** `$('[type=text]')`

- **`Class_Class:`** `$('.tabular.row')`

- **`Element_Attribute:`** `$('img[source-path]')`

- **`Element_Pseudo:`** `$('input:text')`

- **`Element_Class:`** `$('div.wrapper')`

- **`Id_Class:`** `$('#content.main')`

- **`Pseudo_Attribute: `** `$(':text[data-validations]')`

- **`Pseudo_Attribute_Value: `** `$(':text[name=userid]')`

- **`Element_Attribute_Pseudo:`**  `$('input[data-validations]:text')`

- **`Element_Attribute_Value:`**  `$('input[name=institution]')`

- **`Attribute_Value_Pseudo:`**  `$('[type=checkbox]:checked')`

- **`Element_Pseudo_Pseudo:`**  `$('input:checkbox:checked')`

- **`Element_Attribute_Value_Pseudo:`**  `$('input[type=radio]:checked')`

- **`Attribute_Value_Attribute_Value:`**  `$('[type=text][name=username]')`

- **`Element_Attribute_Value_Attribute_Value:`**  `$('input[type=text][name=username]')`

Any of the above could be used in various forms such as with comma (,)  for combined selection such as `$('selector, selector, selector,...')` or space for subsets such as `$('selector selector, selector selector selector,..., ...')` where *selector* is any of the listed supported selectors. For instance, see:


```javascript
var selected = $('form.testform, div.content, span em a.myanchor');
var anotherOne = $('form.testform input:text, form.testform input:checkbox, form.testform select[name=city] option[value=Lagos]'); 
/*Of course I'm being unnecessarily verbose here*/
```

#### List of `seleto`'s interfaces that work similar to equivalent in `jQuery`
- **`find`** 
- **`filter`**  
- **`each`** 
- **`not`** 
- **`is`
- **`append`** 
- **`prepend`** 
- **`appendTo`**
- **`before`**
- **`after`** 
- **`clone`**
- **`empty`**
- **`html`**
- **`val`**
- **`attr`**
- **`addClass`**
- **`removeClass`**
- **`remove`**
- **`children`**
- **`wrap`**
- **`wrapAll`**
- **`text`**
- **`size`**
- **`css`**
- **`data`**
- **`hasClass`**
- **`toggleClass`**


The following are interfaces peculiar to `seleto`

-**`el:`** It returns the raw HTML Element at the passed index or null otherwise. This is not zero-based. So, to get the first element in a list `liList` of `li` we can use `liList.el(1)` where `liList` is a `seleto` instance. The equivalent in `jQuery` is `liList.get(0)` since it is zero-based in `jQuery`.

-**`nth:`** *nth* returns the matched element at the nth position in a collection of matches as an instance of `seleto`. This is also non-zero based so using the ealier example, `liList.nth(1)` returns the first matched element as `seleto` instance.

-**`prop:`** *prop* allows the setting/getting of element properties such as the `checked` properties of `checkbox and radio` or the `selected` property of the `select` element.

-**`even:`** *even* returns the matches of elements whose position in the matched collection is even as `seleto` instance. 

-**`odd:`** *odd* returns the matches of elements whose position in the matched collection is odd as `seleto` instance. 

-**`first:`** *first* returns the element on the head of  the matched collection as `seleto` instance. 

-**`last:`** *first* returns the element at the bottom of  the matched collection as `seleto` instance. 

### Events in `seleto`
All like in `jQuery`

- **`on:`** Used to subscribe to events, for instance, `button.on('event', callback);` or delegated `form.on('event','button.submit',callback);` `event` could be any of `click, change, keyup, keydown, keypress etc.`

- **`off:`** Used to unsubscribe to events, for instance, `button.off('event', callback);` or  `button.off();` - this removes all events on `button`.

- **`trigger:`** *trigger* helps us manually trigger/fire events on elements, for instance, we can trigger the click event on `button` like so: `button.trigger('click')`.

> There are also shortcuts like button.click(callback), el.change(callback) and can be triggered like so: button.click(), el.change().

Thanks for now.
