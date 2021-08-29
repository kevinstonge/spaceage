(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{172:function(e,t,n){},177:function(e,t,n){"use strict";n.r(t),n.d(t,"store",(function(){return D}));var a=n(0),c=n.n(a),r=n(23),s=n.n(r),i=(n(63),n(18)),u=n(13),o=n(4),l={getAPISwagger:"GET_API_SWAGGER",setActiveAPI:"SET_ACTIVE_API",setActiveEndpoint:"SET_ACTIVE_ENDPOINT",getEndpointParameters:"GET_API_PARAMETERS",setParams:"SET_URL_PARAMETERS",setQuery:"SET_QUERY",setQueryResults:"SET_QUERY_RESULTS",cleanUpQueryResults:"CLEAN_UP_QUERY_RESULTS"},p={APISwagger:null,activeEndpoints:{},EndpointParameters:null,URLParameters:null,queries:{},queryResults:{}},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case l.getAPISwagger:return Object(o.a)(Object(o.a)({},e),{},{APISwagger:t.payload});case l.setActiveEndpoint:return Object(o.a)(Object(o.a)({},e),{},{activeEndpoints:Object(o.a)(Object(o.a)({},e.activeEndpoints),{},Object(u.a)({},t.payload.apiName,t.payload.endpoint))});case l.getEndpointParameters:return Object(o.a)(Object(o.a)({},e),{},{EndpointParameters:Object(u.a)({},t.payload.endpoint,t.payload.parameters)});case l.setParams:var n=t.payload,a=n.pathname,c=n.search,r=a.replace(/\/$/,"").replace(/^\//,"").split("/"),s=r[0]||void 0,i=r[1]||void 0,j=s&&i?s===i?"/".concat(s,"/"):"/".concat(s,"/").concat(i.replace(/^(id)$/,"{id}").replace(/(:id)$/,"/{id}"),"/"):void 0,d=s&&i?"".concat(s,"/").concat(i):void 0,b=j?"".concat(j.replace("/{id}","")).concat(c.replace("?id=","")):"",O=d?c?"".concat(d,"/").concat(c):d:void 0;return Object(o.a)(Object(o.a)({},e),{},{URLParameters:{api:s,endpoint:i,query:c,pathStringForSwagger:j,pathStringForReact:d,fullQueryForAPI:b,fullQueryForReact:O}});case l.setQuery:return Object(o.a)(Object(o.a)({},e),{},{queries:Object(o.a)(Object(o.a)({},e.queries),{},Object(u.a)({},t.payload.path,t.payload.data))});case l.setQueryResults:return Object(o.a)(Object(o.a)({},e),{},{queryResults:Object(o.a)(Object(o.a)({},e.queryResults),{},Object(u.a)({},t.payload.query,{queryPath:t.payload.queryPath,query:t.payload.query,queryResult:t.payload.queryResult,timestamp:Date.now(),status:t.payload.status||""}))});case l.cleanUpQueryResults:var h=10,f={};return Object.entries(e.queryResults).sort((function(e,t){return t[1].timestamp-e[1].timestamp})).slice(0,h).forEach((function(e){f[e[0]]=e[1]})),Object(o.a)(Object(o.a)({},e),{},{queryResults:f});default:return e}},d=Object(i.a)({API:j}),b=n(5),O=n(15),h=n(14),f=(n(69),n(6)),y=(n(70),n(2)),g=function(){return Object(y.jsxs)("header",{children:[Object(y.jsxs)("div",{className:"left",children:[Object(y.jsx)("img",{src:"".concat("","/logo70.png"),alt:"cute purple rocket ship"}),Object(y.jsx)("h1",{children:"spaceage"})]}),Object(y.jsx)("div",{className:"right",children:Object(y.jsx)("a",{href:"/launch/upcoming/?search=spacex",children:"spacex:upcoming"})})]})},m={APIActions:l},v=n(57),A=n.n(v).a.create({baseURL:"https://spaceage.kevinstonge.com/api"});function P(e){var t=Object(b.b)(),n=Object(b.c)((function(e){return e.API.APISwagger})),c=Object(b.c)((function(e){return e.API.URLParameters.api})),r=Object(f.d)();return Object(a.useEffect)((function(){A.get("/data/apis").then((function(e){t({type:m.APIActions.getAPISwagger,payload:e.data})}))}),[t]),Object(a.useEffect)((function(){n&&n.paths&&(c&&0===Object.keys(n.paths).filter((function(e){return e.split("/")[1]===c})).length&&r.push("/"))}),[c,n,r]),Object(y.jsx)(y.Fragment,{children:(null===n||void 0===n?void 0:n.paths)&&Object(y.jsx)("nav",{children:Array.from(new Set(Object.keys(n.paths).map((function(e){return e.split("/")[1]})))).map((function(e,t){return Object(y.jsx)(O.b,{to:"/".concat(e),className:"nav ".concat(c===e?"active":"inactive"),children:e},"apiItem-".concat(t))}))})})}function x(){var e=Object(b.c)((function(e){return e.API.APISwagger})),t=Object(b.c)((function(e){return e.API.activeEndpoints})),n=Object(b.c)((function(e){return e.API.URLParameters})),c=Object(b.b)(),r=Object(f.d)(),s=n.api,i=n.endpoint;return Object(a.useEffect)((function(){if(!i&&t[s])r.push("/".concat(s,"/").concat(t[s]));else if(t[s]!==i){var n=Object.keys(e.paths).filter((function(e){return e.split("/")[1]===s&&(e.split("/").slice(2,-1).join(":").replace("{id}","id")===i||i===s)}));!(n.length>0)||t&&t.hasOwnProperty(s)||c({type:m.APIActions.setActiveEndpoint,payload:{apiName:s,endpoint:i}}),0===n.length&&r.push("/".concat(s))}}),[s,i,t,e,c,r]),Object(y.jsx)("nav",{children:s&&e&&Object.keys(e.paths).map((function(e,t){var a=e.split("/"),c=""===a[2]?s:a.slice(2,-1).join(":").replace(/[{}]/g,"");return a[1]===s?Object(y.jsx)(O.b,{to:"/".concat(s,"/").concat(c),className:"nav ".concat(n.endpoint===c?"active":"inactive"),children:c},"endpoint-".concat(c,"-").concat(t)):null}))})}var I=function(e){var t=e.pathStringForReact,n=e.fullQueryForReact,a=e.fullQueryForAPI;D.dispatch({type:m.APIActions.setQueryResults,payload:{queryPath:t,query:n,queryResult:[],status:"searching"}}),A.get("/data".concat(a)).then((function(e){e.data&&D.dispatch({type:m.APIActions.setQueryResults,payload:{queryPath:t,query:n,queryResult:e.data,status:"success"}})})).catch((function(e){D.dispatch({type:m.APIActions.setQueryResults,payload:{queryPath:t,query:n,queryResult:[],status:"unable to retrieve data from the server, try again later"}})}))},E=n(21),R=function(e){var t,n=["search"],a=[];(null===e||void 0===e||null===(t=e.get)||void 0===t?void 0:t.parameters)&&e.get.parameters.length>0&&a.push.apply(a,Object(E.a)(e.get.parameters)),(null===e||void 0===e?void 0:e.parameters)&&e.parameters.length>0&&a.push.apply(a,Object(E.a)(e.parameters));var c=a.filter((function(e){return n.includes(e.name)})),r=a.filter((function(e){var t=0;return c.forEach((function(n){n.name===e.name&&t++})),!(t>0)}));return[].concat(Object(E.a)(c),Object(E.a)(r))};function S(){var e=Object(b.b)(),t=Object(f.d)(),n=Object(b.c)((function(e){return e.API.APISwagger})),c=Object(b.c)((function(e){return e.API.EndpointParameters})),r=Object(b.c)((function(e){return e.API.URLParameters})),s=Object(b.c)((function(e){return e.API.queries})),i=Object(b.c)((function(e){return e.API.queryResults})),l=r.api,p=r.endpoint,j=r.query,d=r.pathStringForSwagger,O=r.fullQueryForAPI,g=r.pathStringForReact,v=r.fullQueryForReact;Object(a.useEffect)((function(){if(j&&n.paths["".concat(d)]){var t=JSON.parse('{"'+decodeURI(j).replace(/^\?/,"").replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}');e({type:m.APIActions.setQuery,payload:{path:v,data:t}}),(!i[v]||i[v].timestamp<Date.now()-1e4)&&I(r)}}),[j,i,n,r,v,d,e]),Object(a.useEffect)((function(){if(p&&l&&n){var t=n.paths["".concat(d)],a=R(t);e({type:m.APIActions.getEndpointParameters,payload:{endpoint:g,parameters:a}}),0===a.length&&(null===t||void 0===t?void 0:t.get)&&(!i[v]||i[v].timestamp<Date.now()-1e4)&&I(r)}}),[r,d,g,v,l,p,n,i,e]),Object(a.useEffect)((function(){v&&""!==v&&!v.includes("undefined")&&(!!s&&v in s||e({type:m.APIActions.setQuery,payload:{path:v,data:null}}))}),[s,v,e]),Object(a.useEffect)((function(){if(s&&s[v]){var e=Object.entries(s[v]).filter((function(e){return""!==e[1]})).map((function(e){return"".concat(e[0],"=").concat(e[1])})).sort().join("&");"".concat(t.location.pathname).concat(t.location.search)!=="/".concat(g,"/?").concat(e)&&0===j.length&&t.push("/".concat(g,"/?").concat(e))}}),[j,s,v,t,g]),Object(a.useEffect)((function(){s&&null===s[v]&&c&&c[g]&&c[g].length>0&&e({type:m.APIActions.setQuery,payload:{path:v,data:Object(u.a)({},c[g][0].name,"")}})}),[s,g,c,O,v,e]);return Object(y.jsx)(y.Fragment,{children:s&&s[v]&&c&&c[g]&&Object(y.jsxs)("form",{onSubmit:function(e){e.preventDefault(),function(){var e=Object.entries(s[v]).filter((function(e){return""!==e[1]})).map((function(e){return"".concat(e[0],"=").concat(e[1])})).sort().join("&");t.push("/".concat(g,"/?").concat(e))}()},children:[Object.entries(s[v]).map((function(t,n){var a=Object(h.a)(t,2),r=a[0],i=a[1];return Object(y.jsxs)("div",{children:[Object(y.jsx)("select",{value:r,id:"".concat(r,"-select"),onChange:function(t){return function(t){var n=t.target.id.substring(0,t.target.id.length-7),a=t.target.value,c=s[v];delete c[n],c[a]="",e({type:m.APIActions.setQuery,payload:{path:v,data:c}})}(t)},children:c[g]&&c[g].length>0&&c[g].map((function(e,t){var n=Object.keys(s[v]).includes(e.name)&&r!==e.name;return Object(y.jsx)("option",{disabled:n,id:"".concat(e.name,"-option"),children:e.name},"param-".concat(t))}))}),Object(y.jsx)("input",{type:"text",value:i,onChange:function(t){return function(t){var n=s[v];n[t.target.id.substring(0,t.target.id.length-6)]=t.target.value,e({type:m.APIActions.setQuery,payload:{path:v,data:n}})}(t)},id:"".concat(r,"-input")}),n>0&&Object(y.jsx)("button",{type:"button",id:"".concat(r,"-remove"),onClick:function(t){t.preventDefault(),function(t){var n=t.target.id.substring(0,t.target.id.length-7),a=s[v];delete a[n],e({type:m.APIActions.setQuery,payload:{path:v,data:a}})}(t)},children:"-"})]},"queryItem-".concat(n))})),Object.keys(s[v]).length<c[g].length&&Object(y.jsx)("p",{children:Object(y.jsx)("button",{type:"button",onClick:function(t){t.preventDefault(),function(){var t=c[g].filter((function(e){return!Object.keys(s[v]).includes(e.name)}))[0].name;e({type:m.APIActions.setQuery,payload:{path:v,data:Object(o.a)(Object(o.a)({},s[v]),{},Object(u.a)({},t,""))}})}()},children:"+"})}),Object(y.jsx)("p",{children:Object(y.jsx)("input",{type:"submit",value:"search"})})]})})}var q=n(25),_=n.n(q);function Q(e){var t=e.property,n=e.value;if(null===n||0===n.length)return null;if("object"===typeof n)return Object(y.jsx)("div",{className:"resultItem",children:Object(y.jsxs)("details",{children:[Object(y.jsx)("summary",{children:Object(y.jsx)("p",{children:Object(y.jsxs)("span",{className:"label",children:[t,n.name&&" (".concat(n.name,")"),!n.name&&n.title&&" (".concat(n.title,")")]})})}),Object.entries(n).map((function(e,n){var a=Object(h.a)(e,2),c=a[0],r=a[1];return null===r?null:Object(y.jsx)(Q,{property:c,value:r},"".concat(t,"-").concat(c,"-").concat(n))}))]})});var a=JSON.stringify(n).replace(/^"(.+)"$/,"$1");return Object(y.jsx)("div",{className:"resultItem",children:Object(y.jsxs)("p",{children:[Object(y.jsx)("span",{className:"label",children:t}),": ",_.a.isURL(a)?Object(y.jsx)("a",{href:a,children:a}):a]})})}n(55);function N(e){var t={url:null};return Object(y.jsxs)("div",{className:"resultCard",children:[Object(y.jsx)("div",{className:"left",children:Object.entries(e.data).map((function(e,n){var a=Object(h.a)(e,2),c=a[0],r=a[1];return"image"===c&&(null===r||void 0===r?void 0:r.length)>0?(t.url=r,null):null===r||0===r.length?null:Object(y.jsx)(Q,{property:c,value:r},"".concat(c,"-").concat(n))}))}),null!==t.url&&_.a.isURL(t.url)&&Object(y.jsx)("div",{className:"right",children:Object(y.jsx)("a",{href:t.url,target:"new",children:Object(y.jsx)("img",{src:t.url,alt:""})})})]})}n(172);var w=function(){return Object(y.jsxs)("div",{className:"loadingContainer",children:[Object(y.jsx)("p",{className:"loadingText",children:"...searching..."}),Object(y.jsx)("img",{className:"loadingImage",alt:"rocket flying around",src:"".concat("","/logo150.png")})]})};function U(){var e,t=Object(b.c)((function(e){return e.API.URLParameters})).fullQueryForReact,n=Object(b.b)(),c=Object(b.c)((function(e){return e.API.queryResults}));return Object(a.useEffect)((function(){var e=Object.keys(c);Object.keys(e).length>10&&n({type:m.APIActions.cleanUpQueryResults})}),[c,n]),Object(y.jsxs)(y.Fragment,{children:[c&&c[t]&&(null===(e=c[t].queryResult)||void 0===e?void 0:e.results)&&Object(y.jsx)("div",{className:"queryResults",children:c[t].queryResult.results.map((function(e,t){return Object(y.jsx)(N,{data:e},"resultCard-".concat(t))}))}),(!c||!c[t])&&Object(y.jsx)("p",{children:"no data"}),c&&c[t]&&"searching"===c[t].status&&Object(y.jsx)(w,{})]})}var F=function(){var e=Object(b.b)(),t=Object(f.e)(),n=Object(f.d)(),c=Object(a.useState)(!0),r=Object(h.a)(c,2),s=r[0],i=r[1],u=Object(b.c)((function(e){return e.API.URLParameters}));return Object(a.useEffect)((function(){if(s){i(!1),e({type:m.APIActions.setParams,payload:t});var a="".concat(t.pathname).concat(t.search);a.length>2?n.push(a):n.push("/")}else e({type:m.APIActions.setParams,payload:t})}),[t,s,i,n,e]),Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(g,{}),Object(y.jsx)(P,{}),(null===u||void 0===u?void 0:u.api)&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(x,{}),(null===u||void 0===u?void 0:u.endpoint)&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(S,{}),Object(y.jsx)(U,{})]})]})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,178)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))},L=n(58),k=n.n(L),C=Object(i.b)(k()()),D=Object(i.c)(d,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),C);s.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(b.a,{store:D,children:Object(y.jsx)(O.a,{children:Object(y.jsx)(F,{})})})}),document.getElementById("root")),T()},55:function(e,t,n){},63:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){}},[[177,1,2]]]);
//# sourceMappingURL=main.025efafb.chunk.js.map