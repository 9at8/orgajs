(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{193:function(e,n,t){"use strict";t.r(n),t.d(n,"pageQuery",function(){return d});var a=t(0),r=t.n(a),u=t(199),c=t(203),i=t(216);function o(){var e=function(e,n){n||(n=e.slice(0));return e.raw=n,e}(["\ncolor: gray;\n"]);return o=function(){return e},e}var l=u.a.p(o()),s=function(e){var n=e.node,t=n.meta,a=t.title,u=t.description,c=t.date,o=n.fields.slug;return r.a.createElement(i.a,{to:o,key:"doc-link-"+o},r.a.createElement("h3",null,a),r.a.createElement("small",null,""+new Date(c)),r.a.createElement(l,null,u))};n.default=function(e){var n=e.data;return r.a.createElement(c.a,null,r.a.createElement("div",null,n.allOrgContent.edges.map(s)))};var d="1069847366"},197:function(e,n,t){"use strict";t.d(n,"b",function(){return l});var a=t(0),r=t.n(a),u=t(66),c=t.n(u);t.d(n,"a",function(){return c.a});t(198),t(7).default.enqueue;var i=r.a.createContext({});function o(e){var n=e.staticQueryData,t=e.data,a=e.query,u=e.render,c=t?t.data:n[a]&&n[a].data;return r.a.createElement(r.a.Fragment,null,c&&u(c),!c&&r.a.createElement("div",null,"Loading (StaticQuery)"))}var l=function(e){var n=e.data,t=e.query,a=e.render,u=e.children;return r.a.createElement(i.Consumer,null,function(e){return r.a.createElement(o,{data:n,query:t,render:a||u,staticQueryData:e})})}},198:function(e,n,t){var a;e.exports=(a=t(202))&&a.default||a},200:function(e,n,t){"use strict";var a=t(207),r=t.n(a),u=t(208),c=t.n(u),i=t(209),o=t.n(i);c.a.plugins=[new o.a];var l=new r.a(c.a);n.a=l},201:function(e){e.exports=JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Orga"}}}}')},202:function(e,n,t){"use strict";t.r(n);t(22);var a=t(0),r=t.n(a),u=t(92);n.default=function(e){var n=e.location,t=e.pageResources;return t?r.a.createElement(u.a,Object.assign({location:n,pageResources:t},t.json)):null}},203:function(e,n,t){"use strict";var a=t(201),r=t(0),u=t.n(r),c=t(199),i=t(205),o=t.n(i),l=t(197);t(29),t(30),t(13),t(49),t(22);var s=function(e){var n=e.children,t=e.to,a=e.activeClassName,r=function(e,n){if(null==e)return{};var t,a,r={},u=Object.keys(e);for(a=0;a<u.length;a++)t=u[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["children","to","activeClassName"]);return/^\/(?!\/)/.test(t)?u.a.createElement(l.a,Object.assign({to:t,activeClassName:a},r),n):u.a.createElement("a",Object.assign({href:t},r),n)};function d(){var e=g(["\n"]);return d=function(){return e},e}function f(){var e=g(["\ncolor: gray;\nmargin: 0 auto;\npadding-bottom: ",";\ntext-align: center;\nborder-bottom: none;\n"]);return f=function(){return e},e}function m(){var e=g(["\ndisplay: flex;\njustify-content: center;\n"]);return m=function(){return e},e}function v(){var e=g(["\ndisplay: block;\ntext-decoration: none;\nborder-radius: 0.4rem;\npadding: .5rem 1.5rem;\ntext-align: center;\n&:hover {\n  text-decoration: none;\n  cursor: pointer;\n  background-color: #f1f1f1;\n}\n"]);return v=function(){return e},e}function p(){var e=g(["\npadding-top: 3rem;\npadding-bottom: 2rem;\n"]);return p=function(){return e},e}function g(e,n){return n||(n=e.slice(0)),e.raw=n,e}var E=t(200).a.rhythm,b=c.a.header(p()),h=Object(c.a)(s)(v()),y=c.a.div(m()),x=c.a.h1(f(),E(1.5)),w=Object(c.a)(s)(d()),O=function(e){var n=e.siteTitle;return u.a.createElement(b,null,u.a.createElement(w,{to:"/"},u.a.createElement(x,null,n)),u.a.createElement(y,null,u.a.createElement(h,{to:"/docs"},"DOCS"),u.a.createElement(h,{to:"/ast"},"AST"),u.a.createElement(h,{to:"/syntax"},"SYNTAX"),u.a.createElement(h,{to:"/roadmap"},"ROADMAP"),u.a.createElement(h,{to:"https://github.com/xiaoxinghu/orgajs"},"CODE")))};O.defaultProps={siteTitle:""};var j=O;t(210);function k(){var e=function(e,n){n||(n=e.slice(0));return e.raw=n,e}(["\nmargin: auto;\nmax-width: 740px;\n"]);return k=function(){return e},e}var C=c.a.div(k());n.a=function(e){var n=e.children;return u.a.createElement(l.b,{query:"755544856",render:function(e){return u.a.createElement(C,null,u.a.createElement(o.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},u.a.createElement("html",{lang:"en"})),u.a.createElement(j,{siteTitle:e.site.siteMetadata.title}),u.a.createElement("div",{style:{padding:"0px 1.0875rem 1.45rem",paddingTop:0}},n))},data:a})}},216:function(e,n,t){"use strict";t.d(n,"a",function(){return i});var a=t(197),r=t(199);function u(){var e=function(e,n){n||(n=e.slice(0));return e.raw=n,e}(["\ndisplay: block;\ntext-decoration: none;\npadding: "," ",";\nborder-radius: ",";\n&:hover {\n  text-decoration: none;\n  cursor: pointer;\n  background-color: #f1f1f1;\n}\n"]);return u=function(){return e},e}var c=t(200).a.rhythm,i=Object(r.a)(a.a)(u(),c(.05),c(.4),c(.2))}}]);
//# sourceMappingURL=component---src-pages-docs-index-js-0db4cbec2bf0f63bedb7.js.map