var comp = {
    template:
    '<label v-if="label.text" v-bind:class="label.style">{{ label.text }} : </label>' +
    '<select id="{{ id }}" v-model="value" v-bind:class="style" multiple="{{ multiple }}">' +
        '<option selected value="{{ __default__.value }}">{{ __default__.text }}</option>' +
        '<option v-for="o in options" value="{{ o.value || o }}">{{ o.value || o }}</option>' +
    '</select>',
    data: function(){ return { }; },
    activate: function(d){
        this.fetchData(null,null,d);
    },
    props: {
        /** 组件 ID */
        id:{ type: String, default: null },
        /** 标签名称 */
        label: { type: Object, default: { } },
        /** select 列表的选项值 */
        value: { type: String, twoway: true, default: null },
        /** option选项数据列表 */
        options:{ type: Array, twoway: true, default: function(){ return [] } },
        /** 是否可以多选 */
        multiple: { type: Boolean, default: false },
        /** 联动的组件 id */
        refdom:{ type: String, twoway: true, default: null },
        /** 控制组件选项值的上一级组件的选项值 */
        __refvalue__:{ type: String, default: null },
        /** 组件的选项值 */
        keyword:{ type: String, twoway: true, default: null },
        /** 数据是否动态刷新缓存 */
        cache: { type: Boolean, default: false },
        /** 是否为起始组件 */
        root: { type: Boolean, twoway: true, default: false },
        /** 组件数据的后台 api 地址 */
        url: { type: String, twoway: true, default: null },
        /** 组件的 css, 未测试 */
        style: { type: Object, default: function(){ return {} } },
        /** 默认值选项 */
        __default__: { type: Object, default: function(){ return {} } },
        /** 自定义函数或方法 */
        onChange: Function
    },
    methods: {
        fetchData:function(k,i,d){
            var s = this;
            if(s.root || (!s.root && k && k !== s.__default__.value)){
                if(s.url && s.url.trim()){
                    /** 通过 url 动态配置 */
                    var _url_ = k && k !== s.__default__.value ? s.url + k : s.url;
                        _url_ = s.cache ? _url_ : (_url_+"?t=" + Date.now());

                    var xhr = new XMLHttpRequest();
                    xhr.open("GET",_url_,true);
                    xhr.onreadystatechange = function(){
                        s.options = xhr.readyState==4
                            && xhr.status==200
                            && xhr.responseText.indexOf('<!doctype html>')===-1
                            && xhr.responseText.indexOf('[')>-1 ? JSON.parse(xhr.responseText):[];
                        if(i && s.options && s.options.length>0){
                            s.$parent.comps.forEach(function(c){
                                if(c && c.id === i){
                                    s.value = s.isContains(s.options,c.value) ? c.value : s.__default__.value;
                                    c.value = s.value;
                                    s.$parent.comps.forEach(function(t){
                                        if(t && t.id === c.refdom){
                                            t.keyword = c.value;
                                            t.value = c.keyword !== s.__default__.value ? t.value : s.__default__.value;
                                        }
                                    });
                                }
                            });
                        }
                    }
                    xhr.send();
                }else{
                    /** 通过初始化赋值静态配置 */
                    // TODO test
                    if(i){
                        s.options = [];
                        s.$parent.comps.forEach(function(c){
                            if(c && c.id === i && c.options.length>0){
                                c.options.forEach(function(t){
                                    t.group === k ? s.options.push(t) : null;
                                });
                                s.value = s.isContains(s.options,c.value) ? c.value : s.__default__.value;
                                c.value = s.value;
                            }
                        });
                    }
                }
            }else{
                s.options = [];
            }
            s.value = s.isContains(s.options,s.value) ? s.value : s.__default__.value;
            d ? d() : null;
        },
        onChangeData:function(val,old,id){
            var s = this;
            if(val){
                s.$parent.comps.forEach(function(d){
                    if(d && d.id === id && d.refdom){
                        d.value = val;
                        s.$parent.comps.forEach(function(t){ if(t && t.id === d.refdom){ t.keyword = d.value; } });
                    }
                });
            }
        },
        isContains: function(arr, value) {
            var i = arr ? arr.length : 0;
            while (i--) {
                if (arr[i] === value) return true;
            }
            return false;
        }
    },
    watch: {
        value: function(val, old) { this.onChangeData(val,old,this.id); },
        url: function(val, old){ this.fetchData(); },
        keyword: function(val,old,d){ this.fetchData(val,this.id,d); }
    }
};

module.exports = {
    template:
    '<div v-for="comp in comps" v-bind:class="comp.c_style || c_style">' +
        '<c-select' +
            ' :id="comp.id"' +
            ' :label="comp.label"' +
            ' :value.sync="comp.value"' +
            ' :options="comp.options"' +
            ' :multiple="comp.multiple"' +
            ' :refdom="comp.refdom"' +
            ' :keyword="comp.keyword"' +
            ' :cache="comp.cache"' +
            ' :root="comp.root"' +
            ' :url="comp.url"' +
            ' :style="comp.style"' +
            ' :__default__="comp.__default__ || __default__ || { value: \'\', text: \'__default__\'}">' +
        '</c-select>' +
    '</div>',
    replace: true,
    props: {
        comps: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    components: {
        "c-select": comp
    }
};
