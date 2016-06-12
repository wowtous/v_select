# v_select
----
## Description

A vue select component. <br>
With this component,we can use the Ajax to get data from the back end api,then select components we need will be generated dynamically.

## Development Setup

``` bash
# install fis3
npm install fis3 -g

# install deps
npm install

# package with webpack
npm run dev

# build dist files
npm run build

# serve example app at localhost:8080 or localhost:8080/page/index.html
npm run test
```

## Example
#### CommonJS
html
```html
<div id="demo">
    <v-select :comps="comps"></v-select>
</div>
```

mock data

+ mock
    - data.js
    - data1    [ "九阳", "美的", "AGL" ]
    - data2
        + AGL  [ "和面","绿豆","绞肉" ]
        + 九阳  [ "榨汁","制奶昔","碎肉","切菜" ]
        + 美的  [ "打蛋","搅拌","干磨","碎冰" ]
    - data3
        + 和面  [ "51","52","53" ]
        + 绿豆  [ "61","62","63" ]
        + 绞肉  [ "71","72","73" ]
        + 榨汁  [ "500ml","2.00L","1.5L" ]
        ...
        + 碎冰  [ "41","42","43" ]

data.js
```json
{
    "comps":[
        {
            "id": "s1",
            "value": "",
            "label": {
                "text":"test1",
                "style":{ "isA" : true, "isB" : true }
            },
            "root": true,
            "cache": true,
            "url": "/mock/data1/data1",
            "refdom": "s2",
            "keyword": ""
        },
        {
            "id": "s2",
            "value": "",
            "label": {
                "text":"test2",
                "style":{ "isA" : true, "isB" : false }
            },
            "url": "/mock/data2/",
            "refdom": "s3",
            "keyword": ""
        },
        {
            "id": "s3",
            "value": "",
            "label": {
                "text":"test3",
                "style":{ "isA" : true, "isB" : false }
            },
            "url": "/mock/data3/",
            "refdom": "",
            "keyword": ""
        }
    ]
}
```

javascript
```js
var Vue = require('vue');
var v_select = require('v_select');

Vue.component('v-select', v_select);

// create a root instance
new Vue({
    el: '#demo',
    data: require('./mock/data')
})
```

OR

```html
<div id="demo">
    <v-select :comps="comps"></v-select>
</div>
<script src="vue.min.js" charset="utf-8"></script>
<script src="../mock/data.js" charset="utf-8"></script>
<script src="../dist/v_select.js" charset="utf-8"></script>
<script type="text/javascript">
    Vue.component('v-select',v_select);

    // create a root instance
    var demo = new Vue({
        el: '#demo',
        data: data
    })
</script>
```

#### Property

+ `id` - select component id (required)
+ `label` - select component label
+ `value` - select component value (required)
+ `options` - select component options
+ `refdom` - a select component id,the options of its corresponding component would be refresh when its parent component's value is changed
+ `keyword` - selected value of its parent component
+ `cache` - timestamp will be added to the url of fetching data when it is true
+ `root` - it is true when the component is the root or the first node (required)
+ `url` - url of g=fetch data from mock/api
+ `__default__` - default options value


-----
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Darebeat
