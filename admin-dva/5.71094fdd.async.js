webpackJsonp([5],{KVNw:function(t,e,a){"use strict";function n(t){return Object(o.a)("/backend/audit/edu-audit",{method:"GET",body:t})}function r(t){return Object(o.a)("/backend/audit/set-audit",{method:"POST",body:t})}Object.defineProperty(e,"__esModule",{value:!0});var u=a("Biqn"),s=a.n(u),d=(a("UQ5M"),a("/qCn")),i=a("En79"),c=a.n(i),o=a("vLgD");e.default={namespace:"verify",state:{edu:{data:[],total:0},loading:!1},effects:{init:c.a.mark(function t(e,a){var r,u,s,d;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.data,u=a.call,s=a.put,t.next=4,s({type:"loading",loading:!0});case 4:return t.next=6,u(n,r);case 6:return d=t.sent,t.next=9,s({type:"save",payload:{edu:{data:d.data.list,total:d.data.total},loading:!1}});case 9:case"end":return t.stop()}},t,this)}),verify:c.a.mark(function t(e,a){var n,u,s,i,o;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.data,u=e.listParams,s=a.call,i=a.put,t.next=4,s(r,n);case 4:return o=t.sent,d.a.success(o.message),t.next=8,i({type:"init",data:u});case 8:case"end":return t.stop()}},t,this)})},reducers:{loading:function(t,e){return s()({},t,{loading:e.loading})},save:function(t,e){return s()({},t,e.payload)}}}}});