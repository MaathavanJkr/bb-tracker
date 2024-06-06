(this["webpackJsonpbb-tracker-client"]=this["webpackJsonpbb-tracker-client"]||[]).push([[5],{183:function(e,t,r){"use strict";r.r(t);var a=r(33),n=r.n(a),o=r(35),l=r(76),c=r(8),i=r(0),s=r.n(i),u=r(14),m=r(48),h=r(59),f=r(58),d=r(32),p=r(39),y=r(1),g=r(9);t.default=function(){var e=Object(y.useParams)().id,t=["0","January","February","March","April","May","June","July","August","September","October","November","December"],r=Object(i.useState)({}),a=Object(c.a)(r,2),v=a[0],b=a[1],x=Object(i.useState)({data:{datasets:[{backgroundColor:["#dc2626","#16a34a"],label:"Shots"}],labels:["Missed","Success"]},options:{responsive:!0,cutoutPercentage:60},legend:{display:!1}}),E=Object(c.a)(x,2),w=E[0],j=E[1],N=Object(i.useState)({data:{labels:["January","February","March","April","May","June","July"],datasets:[]},options:{responsive:!0,tooltips:{mode:"index",intersect:!1},hover:{mode:"nearest",intersect:!0},scales:{x:{display:!0,scaleLabel:{display:!0,labelString:"Month"}},y:{display:!0,scaleLabel:{display:!0,labelString:"Value"}}}},legend:{display:!1}}),k=Object(c.a)(N,2),O=k[0],L=k[1],T=Object(i.useState)(1),_=Object(c.a)(T,2),S=_[0],C=_[1],P=Object(i.useState)([]),F=Object(c.a)(P,2),A=F[0],G=F[1],J=Object(i.useState)(0),M=Object(c.a)(J,2),I=M[0],B=M[1];Object(i.useEffect)((function(){fetch("http://btapi.maathavan.live/api/shot/player/"+e).then((function(e){return e.json()})).then((function(e){B(e.length),G(e.slice(10*(S-1),10*S))})).catch((function(e){console.log(e.message)}))}),[S,e]),Object(i.useEffect)((function(){fetch("http://btapi.maathavan.live/api/player/"+e).then((function(e){return e.json()})).then((function(e){b(e);var r=[],a=[],n=[];e.stat.forEach((function(e){r.push(e.two_attempts),a.push(e.two_success),n.push(t[e.month_number])}));var o={label:"Success",backgroundColor:"#15803d",borderColor:"#16a34a",data:a,fill:!1},c={label:"Attempt",fill:!1,backgroundColor:"#1d4ed8",borderColor:"#2563eb",data:r};L(Object(l.a)(Object(l.a)({},O),{},{data:{labels:n,datasets:[c,o]}})),j(Object(l.a)(Object(l.a)({},w),{},{data:Object(l.a)(Object(l.a)({},w.data),{},{datasets:[Object(l.a)(Object(l.a)({},w.data.datasets[0]),{},{data:[e.total_two_attempts-e.total_two_success,e.total_two_success]})]})}))})).catch((function(e){console.log(e.message)}))}),[]);var D=function(){var e=Object(o.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://btapi.maathavan.live/api/shot/"+t,{method:"DELETE",headers:{"Content-type":"application/json; charset=UTF-8",Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(e){e.success?alert("Deleted"):console.log(e)})).catch((function(e){console.log(e.message)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,null,"Profile"),s.a.createElement(u.Card,{className:"mb-8 shadow-md"},s.a.createElement(u.CardBody,null,s.a.createElement("h1",{className:"mt-4 text-4xl font-bold text-center text-gray-800 dark:text-gray-200 leading-none"},v.firstname+" "+v.lastname),s.a.createElement("h3",{className:"text-xl text-center text-gray-600 dark:text-gray-400"},"@"+v.username),s.a.createElement("h3",{className:"mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300"},"Position: ",v.position),s.a.createElement("h3",{className:"-mt-2 font-semibold text-xl text-center text-gray-700 dark:text-gray-300"},"Number: ",v.number),s.a.createElement("ul",{className:"py-4 mt-2 flex items-center justify-around"},s.a.createElement("li",{className:"flex flex-col items-center justify-around"},s.a.createElement("div",{className:"text-2xl font-bold text-gray-800 dark:text-gray-200"},v.total_three_attempts),s.a.createElement("div",{className:"text-md text-gray-600 dark:text-gray-400"},"Three Points")),s.a.createElement("li",{className:"flex flex-col items-center justify-between"},s.a.createElement("div",{className:"text-2xl font-bold text-gray-800 dark:text-gray-200"},v.total_two_attempts),s.a.createElement("div",{className:"text-md text-gray-600 dark:text-gray-400"},"Two Points")),s.a.createElement("li",{className:"flex flex-col items-center justify-around"},s.a.createElement("div",{className:"text-2xl font-bold text-gray-800 dark:text-gray-200"},v.total_free_attempts),s.a.createElement("div",{className:"text-md text-gray-600 dark:text-gray-400"},"Free Throws"))))),s.a.createElement("div",{className:"grid gap-6 mb-8 md:grid-cols-2"},s.a.createElement(m.a,{title:"Total Shots"},s.a.createElement(h.b,w),s.a.createElement(f.a,{legends:[{title:"Success",color:"bg-green-600"},{title:"Missed",color:"bg-red-600"}]})),s.a.createElement(m.a,{title:"Shots per Month"},s.a.createElement(h.c,O),s.a.createElement(f.a,{legends:[{title:"Attempt",color:"bg-blue-600"},{title:"Success",color:"bg-green-600"}]}))),s.a.createElement(u.TableContainer,null,s.a.createElement(u.Table,null,s.a.createElement(u.TableHeader,null,s.a.createElement("tr",null,s.a.createElement(u.TableCell,null,"Type"),s.a.createElement(u.TableCell,null,"Attempt"),s.a.createElement(u.TableCell,null,"Success"),s.a.createElement(u.TableCell,null,"Date"),s.a.createElement(u.TableCell,null,"Action"))),s.a.createElement(u.TableBody,null,A.map((function(e,t){return s.a.createElement(u.TableRow,{key:t},s.a.createElement(u.TableCell,null,s.a.createElement("div",null,s.a.createElement("p",{className:"font-semibold"},e.type))),s.a.createElement(u.TableCell,null,s.a.createElement("span",{className:"text-sm"},e.attempt)),s.a.createElement(u.TableCell,null,s.a.createElement("span",{className:"text-sm"},e.success)),s.a.createElement(u.TableCell,null,s.a.createElement("span",{className:"text-sm"},e.date.substring(0,10))),s.a.createElement(u.TableCell,null,s.a.createElement("div",{className:"flex items-center space-x-4"},s.a.createElement(g.b,{to:"/app/edit/"+e.id},s.a.createElement(u.Button,{layout:"link",size:"icon","aria-label":"Edit"},s.a.createElement(p.EditIcon,{className:"w-5 h-5","aria-hidden":"true"}))),s.a.createElement(u.Button,{onClick:function(){D(e.id)},layout:"link",size:"icon","aria-label":"Delete"},s.a.createElement(p.TrashIcon,{className:"w-5 h-5","aria-hidden":"true"})))))})))),s.a.createElement(u.TableFooter,null,s.a.createElement(u.Pagination,{totalResults:I,resultsPerPage:10,label:"Table navigation",onChange:function(e){C(e)}}))))}},32:function(e,t,r){"use strict";var a=r(0),n=r.n(a);t.a=function(e){var t=e.children;return n.a.createElement("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"},t)}},33:function(e,t,r){e.exports=r(34)},34:function(e,t,r){var a=function(e){"use strict";var t=Object.prototype,r=t.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},n=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function c(e,t,r,a){var n=t&&t.prototype instanceof u?t:u,o=Object.create(n.prototype),l=new w(a||[]);return o._invoke=function(e,t,r){var a="suspendedStart";return function(n,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===n)throw o;return N()}for(r.method=n,r.arg=o;;){var l=r.delegate;if(l){var c=b(l,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===a)throw a="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a="executing";var u=i(e,t,r);if("normal"===u.type){if(a=r.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(a="completed",r.method="throw",r.arg=u.arg)}}}(e,r,l),o}function i(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(a){return{type:"throw",arg:a}}}e.wrap=c;var s={};function u(){}function m(){}function h(){}var f={};f[n]=function(){return this};var d=Object.getPrototypeOf,p=d&&d(d(j([])));p&&p!==t&&r.call(p,n)&&(f=p);var y=h.prototype=u.prototype=Object.create(f);function g(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function v(e,t){var a;this._invoke=function(n,o){function l(){return new t((function(a,l){!function a(n,o,l,c){var s=i(e[n],e,o);if("throw"!==s.type){var u=s.arg,m=u.value;return m&&"object"===typeof m&&r.call(m,"__await")?t.resolve(m.__await).then((function(e){a("next",e,l,c)}),(function(e){a("throw",e,l,c)})):t.resolve(m).then((function(e){u.value=e,l(u)}),(function(e){return a("throw",e,l,c)}))}c(s.arg)}(n,o,a,l)}))}return a=a?a.then(l,l):l()}}function b(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,b(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var a=i(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,s;var n=a.arg;return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function w(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function j(e){if(e){var t=e[n];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function t(){for(;++a<e.length;)if(r.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return m.prototype=y.constructor=h,h.constructor=m,h[l]=m.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,l in e||(e[l]="GeneratorFunction")),e.prototype=Object.create(y),e},e.awrap=function(e){return{__await:e}},g(v.prototype),v.prototype[o]=function(){return this},e.AsyncIterator=v,e.async=function(t,r,a,n,o){void 0===o&&(o=Promise);var l=new v(c(t,r,a,n),o);return e.isGeneratorFunction(r)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},g(y),y[l]="Generator",y[n]=function(){return this},y.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var a=t.pop();if(a in e)return r.value=a,r.done=!1,r}return r.done=!0,r}},e.values=j,w.prototype={constructor:w,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(r,a){return l.type="throw",l.arg=e,t.next=r,a&&(t.method="next",t.arg=void 0),!!a}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],l=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),i=r.call(o,"finallyLoc");if(c&&i){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!i)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),E(r),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var a=r.completion;if("throw"===a.type){var n=a.arg;E(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:j(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},e}(e.exports);try{regeneratorRuntime=a}catch(n){Function("r","regeneratorRuntime = r")(a)}},35:function(e,t,r){"use strict";function a(e,t,r,a,n,o,l){try{var c=e[o](l),i=c.value}catch(s){return void r(s)}c.done?t(i):Promise.resolve(i).then(a,n)}function n(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var l=e.apply(t,r);function c(e){a(l,n,o,c,i,"next",e)}function i(e){a(l,n,o,c,i,"throw",e)}c(void 0)}))}}r.d(t,"a",(function(){return n}))},48:function(e,t,r){"use strict";var a=r(0),n=r.n(a);t.a=function(e){var t=e.children,r=e.title;return n.a.createElement("div",{className:"min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"},n.a.createElement("p",{className:"mb-4 font-semibold text-gray-800 dark:text-gray-300"},r),t)}},58:function(e,t,r){"use strict";var a=r(0),n=r.n(a);t.a=function(e){var t=e.legends;return n.a.createElement("div",{className:"flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"},t.map((function(e){return n.a.createElement("div",{className:"flex items-center",key:e.title},n.a.createElement("span",{className:"inline-block w-3 h-3 mr-1 ".concat(e.color," rounded-full")}),n.a.createElement("span",null,e.title))})))}}}]);
//# sourceMappingURL=5.8223181f.chunk.js.map