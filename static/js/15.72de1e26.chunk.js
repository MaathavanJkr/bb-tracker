(this["webpackJsonpbb-tracker-client"]=this["webpackJsonpbb-tracker-client"]||[]).push([[15],{184:function(e,t,a){"use strict";a.r(t);var l=a(8),n=a(0),c=a.n(n),r=a(1),s=a(9),i=a(38),o=a(32),m=a(14);t.default=function(){var e=Object(r.useHistory)(),t=Object(n.useState)(1),a=Object(l.a)(t,2),u=a[0],b=a[1],p=Object(n.useState)([]),E=Object(l.a)(p,2),f=E[0],h=E[1],d=Object(n.useState)(0),g=Object(l.a)(d,2),T=g[0],C=g[1];return Object(n.useEffect)((function(){fetch("http://btapi.maathavan.live/api/player").then((function(e){return e.json()})).then((function(e){C(e.length),h(e.slice(10*(u-1),10*u))})).catch((function(e){console.log(e.message)}))}),[u]),c.a.createElement(c.a.Fragment,null,c.a.createElement(o.a,null,"Players"),c.a.createElement(m.TableContainer,null,c.a.createElement(m.Table,null,c.a.createElement(m.TableHeader,null,c.a.createElement("tr",null,c.a.createElement(m.TableCell,null,"Player"),c.a.createElement(m.TableCell,null,"Attempt"),c.a.createElement(m.TableCell,null,"Success"),c.a.createElement(m.TableCell,null,"Position"),c.a.createElement(m.TableCell,null,"Actions"))),c.a.createElement(m.TableBody,null,f.map((function(t,a){return c.a.createElement(m.TableRow,{key:a,className:"cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"},c.a.createElement(m.TableCell,{onClick:function(){e.push("/app/profile/"+t.id)}},c.a.createElement("div",null,c.a.createElement("p",{className:"font-semibold"},t.firstname+" "+t.lastname),c.a.createElement("p",{className:"text-xs text-gray-600 dark:text-gray-400"},t.job))),c.a.createElement(m.TableCell,{onClick:function(){e.push("/app/profile/"+t.id)}},c.a.createElement("span",{className:"text-sm"},t.two_attempts)),c.a.createElement(m.TableCell,{onClick:function(){e.push("/app/profile/"+t.id)}},c.a.createElement("span",{className:"text-sm"},t.two_success)),c.a.createElement(m.TableCell,{onClick:function(){e.push("/app/profile/"+t.id)}},c.a.createElement("span",{className:"text-sm"},t.position)),c.a.createElement(m.TableCell,null,c.a.createElement("div",{className:"flex items-center space-x-4"},c.a.createElement(m.Button,{tag:s.b,to:"profile/"+t.id,layout:"link",size:"icon","aria-label":"Edit"},c.a.createElement(i.EyeIcon,{className:"w-5 h-5","aria-hidden":"true"})))))})))),c.a.createElement(m.TableFooter,null,c.a.createElement(m.Pagination,{totalResults:T,resultsPerPage:10,label:"Table navigation",onChange:function(e){b(e)}}))))}},32:function(e,t,a){"use strict";var l=a(0),n=a.n(l);t.a=function(e){var t=e.children;return n.a.createElement("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"},t)}}}]);
//# sourceMappingURL=15.72de1e26.chunk.js.map