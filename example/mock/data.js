
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vue = factory());
}(this, function () { 'use strict';
    var data = {
    test:"weeeee",
    comps:[
        {
            id: "s1",
            value: "",
            label: {
                text:"test1",
                style:{
                    isA : true,
                    isB : true
                }
            },
            root: true,
            cache: true,
            url: "/mock/data1/data1",
            refdom: "s2",
            keyword: ""
        },
        {
            id: "s2",
            value: "",
            label: {
                text:"test2",
                style:{
                    isA : true,
                    isB : false
                }
            },
            url: "/mock/data2/",
            refdom: "s3",
            keyword: ""
        },
        {
            id: "s3",
            value: "",
            label: {
                text:"test3",
                style:{
                    isA : true,
                    isB : false
                }
            },
            url: "/mock/data3/",
            refdom: "",
            keyword: ""
        }
    ],
    a : function(){
        data.comps[0].value = "AGL";
        data.comps[1].value = "和面";
        data.comps[2].value = "51";
    },
    b : function(){
        data.comps[0].value = "美的";
        data.comps[1].value = "干磨";
        data.comps[2].value = "51";
    },
    c : function(){
        data.comps[0].value = "美的";
        data.comps[1].value = "和面";
        data.comps[2].value = "51";
    }
};

}));
