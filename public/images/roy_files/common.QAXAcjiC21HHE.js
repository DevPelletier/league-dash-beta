/*! For license information please see common.js.LICENSE.txt */
(()=>{var t,e={12245:(t,e,r)=>{"use strict";r(75828);var n=r(90207);"function"!=typeof window.Object.assign&&(window.Object.assign=r(45228)),window.ScriptRunner=new n,r(86964).polyfill(),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),n=r.length>>>0;if(0===n)return!1;for(var o,i,s=0|e,u=Math.max(s>=0?s:n-Math.abs(s),0);u<n;){if((o=r[u])===(i=t)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;u++}return!1}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),r=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<r;){var i=e[o];if(t.call(n,i,o,e))return i;o++}},configurable:!0,writable:!0})},90207:t=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}function n(t){var r=function(t){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(r)?r:r+""}var o=function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.scripts=[],this.runScript=this.runScript.bind(this),this.registerScript=this.registerScript.bind(this)},(e=[{key:"runScript",value:function(t,e){t in this.scripts?this.scripts[t](e):console.error("Failed to run script `"+t+"` - it has not been loaded (did you include the JS file?)")}},{key:"registerScript",value:function(t,e){t in this.scripts&&console.warn("Script `` has already been registered - the old one will be overwritten"),this.scripts[t]=e}}])&&r(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();t.exports=o},86964:function(t,e,r){t.exports=function(){"use strict";function t(t){return"function"==typeof t}var e=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},n=0,o=void 0,i=void 0,s=function(t,e){p[n]=t,p[n+1]=e,2===(n+=2)&&(i?i(v):m())};var u="undefined"!=typeof window?window:void 0,a=u||{},c=a.MutationObserver||a.WebKitMutationObserver,l="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),f="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function h(){var t=setTimeout;return function(){return t(v,1)}}var p=new Array(1e3);function v(){for(var t=0;t<n;t+=2)(0,p[t])(p[t+1]),p[t]=void 0,p[t+1]=void 0;n=0}var d,y,b,_,m=void 0;function w(t,e){var r=this,n=new this.constructor(j);void 0===n[S]&&R(n);var o=r._state;if(o){var i=arguments[o-1];s((function(){return N(o,n,i,r._result)}))}else k(r,n,t,e);return n}function g(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(j);return x(e,t),e}m=l?function(){return process.nextTick(v)}:c?(y=0,b=new c(v),_=document.createTextNode(""),b.observe(_,{characterData:!0}),function(){_.data=y=++y%2}):f?((d=new MessageChannel).port1.onmessage=v,function(){return d.port2.postMessage(0)}):void 0===u?function(){try{var t=Function("return this")().require("vertx");return void 0!==(o=t.runOnLoop||t.runOnContext)?function(){o(v)}:h()}catch(t){return h()}}():h();var S=Math.random().toString(36).substring(2);function j(){}var O=void 0,A=1,T=2;function P(e,r,n){r.constructor===e.constructor&&n===w&&r.constructor.resolve===g?function(t,e){e._state===A?C(t,e._result):e._state===T?M(t,e._result):k(e,void 0,(function(e){return x(t,e)}),(function(e){return M(t,e)}))}(e,r):void 0===n?C(e,r):t(n)?function(t,e,r){s((function(t){var n=!1,o=function(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}(r,e,(function(r){n||(n=!0,e!==r?x(t,r):C(t,r))}),(function(e){n||(n=!0,M(t,e))}),t._label);!n&&o&&(n=!0,M(t,o))}),t)}(e,r,n):C(e,r)}function x(t,e){if(t===e)M(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(n=e),null===n||"object"!==o&&"function"!==o)C(t,e);else{var r=void 0;try{r=e.then}catch(e){return void M(t,e)}P(t,e,r)}var n,o}function E(t){t._onerror&&t._onerror(t._result),L(t)}function C(t,e){t._state===O&&(t._result=e,t._state=A,0!==t._subscribers.length&&s(L,t))}function M(t,e){t._state===O&&(t._state=T,t._result=e,s(E,t))}function k(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+A]=r,o[i+T]=n,0===i&&t._state&&s(L,t)}function L(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?N(r,n,o,i):o(i);t._subscribers.length=0}}function N(e,r,n,o){var i=t(n),s=void 0,u=void 0,a=!0;if(i){try{s=n(o)}catch(t){a=!1,u=t}if(r===s)return void M(r,new TypeError("A promises callback cannot return that same promise."))}else s=o;r._state!==O||(i&&a?x(r,s):!1===a?M(r,u):e===A?C(r,s):e===T&&M(r,s))}var F=0;function R(t){t[S]=F++,t._state=void 0,t._result=void 0,t._subscribers=[]}var q=function(){function t(t,r){this._instanceConstructor=t,this.promise=new t(j),this.promise[S]||R(this.promise),e(r)?(this.length=r.length,this._remaining=r.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(r),0===this._remaining&&C(this.promise,this._result))):M(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===O&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===g){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===w&&t._state!==O)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===H){var u=new r(j);s?M(u,i):P(u,t,o),this._willSettleAt(u,e)}else this._willSettleAt(new r((function(e){return e(t)})),e)}else this._willSettleAt(n(t),e)},t.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===O&&(this._remaining--,t===T?M(n,r):this._result[e]=r),0===this._remaining&&C(n,this._result)},t.prototype._willSettleAt=function(t,e){var r=this;k(t,void 0,(function(t){return r._settledAt(A,e,t)}),(function(t){return r._settledAt(T,e,t)}))},t}();var H=function(){function e(t){this[S]=F++,this._result=this._state=void 0,this._subscribers=[],j!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){x(t,e)}),(function(e){M(t,e)}))}catch(e){M(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var r=this,n=r.constructor;return t(e)?r.then((function(t){return n.resolve(e()).then((function(){return t}))}),(function(t){return n.resolve(e()).then((function(){throw t}))})):r.then(e,e)},e}();return H.prototype.then=w,H.all=function(t){return new q(this,t).promise},H.race=function(t){var r=this;return e(t)?new r((function(e,n){for(var o=t.length,i=0;i<o;i++)r.resolve(t[i]).then(e,n)})):new r((function(t,e){return e(new TypeError("You must pass an array to race."))}))},H.resolve=g,H.reject=function(t){var e=new this(j);return M(e,t),e},H._setScheduler=function(t){i=t},H._setAsap=function(t){s=t},H._asap=s,H.polyfill=function(){var t=void 0;if(void 0!==r.g)t=r.g;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=H},H.Promise=H,H}()},75828:()=>{self.fetch||(self.fetch=function(t,e){return e=e||{},new Promise((function(r,n){var o=new XMLHttpRequest,i=[],s=[],u={},a=function(){return{ok:2==(o.status/100|0),statusText:o.statusText,status:o.status,url:o.responseURL,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},clone:a,headers:{keys:function(){return i},entries:function(){return s},get:function(t){return u[t.toLowerCase()]},has:function(t){return t.toLowerCase()in u}}}};for(var c in o.open(e.method||"get",t,!0),o.onload=function(){o.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,(function(t,e,r){i.push(e=e.toLowerCase()),s.push([e,r]),u[e]=u[e]?u[e]+","+r:r})),r(a())},o.onerror=n,o.withCredentials="include"==e.credentials,e.headers)o.setRequestHeader(c,e.headers[c]);o.send(e.body||null)}))})}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,loaded:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,t=[],n.O=(e,r,o,i)=>{if(!r){var s=1/0;for(l=0;l<t.length;l++){for(var[r,o,i]=t[l],u=!0,a=0;a<r.length;a++)(!1&i||s>=i)&&Object.keys(n.O).every((t=>n.O[t](r[a])))?r.splice(a--,1):(u=!1,i<s&&(s=i));if(u){t.splice(l--,1);var c=o();void 0!==c&&(e=c)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),n.j=76,(()=>{var t={76:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var o,i,[s,u,a]=r,c=0;if(s.some((e=>0!==t[e]))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(a)var l=a(n)}for(e&&e(r);c<s.length;c++)i=s[c],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self.webpackChunk_vzmi_fantasy_react_modules=self.webpackChunk_vzmi_fantasy_react_modules||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})(),n.nc=void 0;var o=n.O(void 0,[625],(()=>n(12245)));o=n.O(o)})();