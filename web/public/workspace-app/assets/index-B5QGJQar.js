(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function A0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var qg={exports:{}},Vl={},$g={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yo=Symbol.for("react.element"),v0=Symbol.for("react.portal"),_0=Symbol.for("react.fragment"),C0=Symbol.for("react.strict_mode"),x0=Symbol.for("react.profiler"),y0=Symbol.for("react.provider"),I0=Symbol.for("react.context"),M0=Symbol.for("react.forward_ref"),S0=Symbol.for("react.suspense"),E0=Symbol.for("react.memo"),w0=Symbol.for("react.lazy"),Rf=Symbol.iterator;function T0(t){return t===null||typeof t!="object"?null:(t=Rf&&t[Rf]||t["@@iterator"],typeof t=="function"?t:null)}var em={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},tm=Object.assign,nm={};function Bs(t,e,n){this.props=t,this.context=e,this.refs=nm,this.updater=n||em}Bs.prototype.isReactComponent={};Bs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Bs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function im(){}im.prototype=Bs.prototype;function nd(t,e,n){this.props=t,this.context=e,this.refs=nm,this.updater=n||em}var id=nd.prototype=new im;id.constructor=nd;tm(id,Bs.prototype);id.isPureReactComponent=!0;var bf=Array.isArray,rm=Object.prototype.hasOwnProperty,rd={current:null},sm={key:!0,ref:!0,__self:!0,__source:!0};function om(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)rm.call(e,i)&&!sm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Yo,type:t,key:s,ref:o,props:r,_owner:rd.current}}function R0(t,e){return{$$typeof:Yo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function sd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Yo}function b0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Pf=/\/+/g;function fc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?b0(""+t.key):e.toString(36)}function ja(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Yo:case v0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+fc(o,0):i,bf(r)?(n="",t!=null&&(n=t.replace(Pf,"$&/")+"/"),ja(r,e,n,"",function(c){return c})):r!=null&&(sd(r)&&(r=R0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Pf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",bf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+fc(s,a);o+=ja(s,e,n,l,r)}else if(l=T0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+fc(s,a++),o+=ja(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ia(t,e,n){if(t==null)return t;var i=[],r=0;return ja(t,i,"","",function(s){return e.call(n,s,r++)}),i}function P0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var en={current:null},Xa={transition:null},L0={ReactCurrentDispatcher:en,ReactCurrentBatchConfig:Xa,ReactCurrentOwner:rd};function am(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:ia,forEach:function(t,e,n){ia(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ia(t,function(){e++}),e},toArray:function(t){return ia(t,function(e){return e})||[]},only:function(t){if(!sd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=Bs;Ke.Fragment=_0;Ke.Profiler=x0;Ke.PureComponent=nd;Ke.StrictMode=C0;Ke.Suspense=S0;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L0;Ke.act=am;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=tm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=rd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)rm.call(e,l)&&!sm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Yo,type:t.type,key:r,ref:s,props:i,_owner:o}};Ke.createContext=function(t){return t={$$typeof:I0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:y0,_context:t},t.Consumer=t};Ke.createElement=om;Ke.createFactory=function(t){var e=om.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:M0,render:t}};Ke.isValidElement=sd;Ke.lazy=function(t){return{$$typeof:w0,_payload:{_status:-1,_result:t},_init:P0}};Ke.memo=function(t,e){return{$$typeof:E0,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=Xa.transition;Xa.transition={};try{t()}finally{Xa.transition=e}};Ke.unstable_act=am;Ke.useCallback=function(t,e){return en.current.useCallback(t,e)};Ke.useContext=function(t){return en.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return en.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return en.current.useEffect(t,e)};Ke.useId=function(){return en.current.useId()};Ke.useImperativeHandle=function(t,e,n){return en.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return en.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return en.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return en.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return en.current.useReducer(t,e,n)};Ke.useRef=function(t){return en.current.useRef(t)};Ke.useState=function(t){return en.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return en.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return en.current.useTransition()};Ke.version="18.3.1";$g.exports=Ke;var pe=$g.exports;const D0=A0(pe);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N0=pe,U0=Symbol.for("react.element"),O0=Symbol.for("react.fragment"),F0=Object.prototype.hasOwnProperty,k0=N0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,z0={key:!0,ref:!0,__self:!0,__source:!0};function lm(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)F0.call(e,i)&&!z0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:U0,type:t,key:s,ref:o,props:r,_owner:k0.current}}Vl.Fragment=O0;Vl.jsx=lm;Vl.jsxs=lm;qg.exports=Vl;var R=qg.exports,xu={},cm={exports:{}},_n={},um={exports:{}},hm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,J){var q=D.length;D.push(J);e:for(;0<q;){var ie=q-1>>>1,le=D[ie];if(0<r(le,J))D[ie]=J,D[q]=le,q=ie;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var J=D[0],q=D.pop();if(q!==J){D[0]=q;e:for(var ie=0,le=D.length,ve=le>>>1;ie<ve;){var V=2*(ie+1)-1,ne=D[V],oe=V+1,ae=D[oe];if(0>r(ne,q))oe<le&&0>r(ae,ne)?(D[ie]=ae,D[oe]=q,ie=oe):(D[ie]=ne,D[V]=q,ie=V);else if(oe<le&&0>r(ae,q))D[ie]=ae,D[oe]=q,ie=oe;else break e}}return J}function r(D,J){var q=D.sortIndex-J.sortIndex;return q!==0?q:D.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,u=null,f=3,p=!1,v=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(D){for(var J=n(c);J!==null;){if(J.callback===null)i(c);else if(J.startTime<=D)i(c),J.sortIndex=J.expirationTime,e(l,J);else break;J=n(c)}}function C(D){if(x=!1,m(D),!v)if(n(l)!==null)v=!0,B(w);else{var J=n(c);J!==null&&Q(C,J.startTime-D)}}function w(D,J){v=!1,x&&(x=!1,d(T),T=-1),p=!0;var q=f;try{for(m(J),u=n(l);u!==null&&(!(u.expirationTime>J)||D&&!y());){var ie=u.callback;if(typeof ie=="function"){u.callback=null,f=u.priorityLevel;var le=ie(u.expirationTime<=J);J=t.unstable_now(),typeof le=="function"?u.callback=le:u===n(l)&&i(l),m(J)}else i(l);u=n(l)}if(u!==null)var ve=!0;else{var V=n(c);V!==null&&Q(C,V.startTime-J),ve=!1}return ve}finally{u=null,f=q,p=!1}}var S=!1,I=null,T=-1,z=5,_=-1;function y(){return!(t.unstable_now()-_<z)}function L(){if(I!==null){var D=t.unstable_now();_=D;var J=!0;try{J=I(!0,D)}finally{J?N():(S=!1,I=null)}}else S=!1}var N;if(typeof A=="function")N=function(){A(L)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,Z=G.port2;G.port1.onmessage=L,N=function(){Z.postMessage(null)}}else N=function(){g(L,0)};function B(D){I=D,S||(S=!0,N())}function Q(D,J){T=g(function(){D(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,B(w))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(f){case 1:case 2:case 3:var J=3;break;default:J=f}var q=f;f=J;try{return D()}finally{f=q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,J){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var q=f;f=D;try{return J()}finally{f=q}},t.unstable_scheduleCallback=function(D,J,q){var ie=t.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?ie+q:ie):q=ie,D){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=q+le,D={id:h++,callback:J,priorityLevel:D,startTime:q,expirationTime:le,sortIndex:-1},q>ie?(D.sortIndex=q,e(c,D),n(l)===null&&D===n(c)&&(x?(d(T),T=-1):x=!0,Q(C,q-ie))):(D.sortIndex=le,e(l,D),v||p||(v=!0,B(w))),D},t.unstable_shouldYield=y,t.unstable_wrapCallback=function(D){var J=f;return function(){var q=f;f=J;try{return D.apply(this,arguments)}finally{f=q}}}})(hm);um.exports=hm;var B0=um.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G0=pe,vn=B0;function ce(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dm=new Set,Mo={};function Dr(t,e){Es(t,e),Es(t+"Capture",e)}function Es(t,e){for(Mo[t]=e,t=0;t<e.length;t++)dm.add(e[t])}var Ci=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),yu=Object.prototype.hasOwnProperty,V0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Lf={},Df={};function H0(t){return yu.call(Df,t)?!0:yu.call(Lf,t)?!1:V0.test(t)?Df[t]=!0:(Lf[t]=!0,!1)}function W0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function j0(t,e,n,i){if(e===null||typeof e>"u"||W0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function tn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Bt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Bt[t]=new tn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Bt[e]=new tn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Bt[t]=new tn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Bt[t]=new tn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Bt[t]=new tn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Bt[t]=new tn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Bt[t]=new tn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Bt[t]=new tn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Bt[t]=new tn(t,5,!1,t.toLowerCase(),null,!1,!1)});var od=/[\-:]([a-z])/g;function ad(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(od,ad);Bt[e]=new tn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(od,ad);Bt[e]=new tn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(od,ad);Bt[e]=new tn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Bt[t]=new tn(t,1,!1,t.toLowerCase(),null,!1,!1)});Bt.xlinkHref=new tn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Bt[t]=new tn(t,1,!1,t.toLowerCase(),null,!0,!0)});function ld(t,e,n,i){var r=Bt.hasOwnProperty(e)?Bt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(j0(e,n,r,i)&&(n=null),i||r===null?H0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var wi=G0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ra=Symbol.for("react.element"),es=Symbol.for("react.portal"),ts=Symbol.for("react.fragment"),cd=Symbol.for("react.strict_mode"),Iu=Symbol.for("react.profiler"),fm=Symbol.for("react.provider"),pm=Symbol.for("react.context"),ud=Symbol.for("react.forward_ref"),Mu=Symbol.for("react.suspense"),Su=Symbol.for("react.suspense_list"),hd=Symbol.for("react.memo"),Oi=Symbol.for("react.lazy"),gm=Symbol.for("react.offscreen"),Nf=Symbol.iterator;function js(t){return t===null||typeof t!="object"?null:(t=Nf&&t[Nf]||t["@@iterator"],typeof t=="function"?t:null)}var At=Object.assign,pc;function ro(t){if(pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);pc=e&&e[1]||""}return`
`+pc+t}var gc=!1;function mc(t,e){if(!t||gc)return"";gc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{gc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ro(t):""}function X0(t){switch(t.tag){case 5:return ro(t.type);case 16:return ro("Lazy");case 13:return ro("Suspense");case 19:return ro("SuspenseList");case 0:case 2:case 15:return t=mc(t.type,!1),t;case 11:return t=mc(t.type.render,!1),t;case 1:return t=mc(t.type,!0),t;default:return""}}function Eu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ts:return"Fragment";case es:return"Portal";case Iu:return"Profiler";case cd:return"StrictMode";case Mu:return"Suspense";case Su:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case pm:return(t.displayName||"Context")+".Consumer";case fm:return(t._context.displayName||"Context")+".Provider";case ud:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case hd:return e=t.displayName||null,e!==null?e:Eu(t.type)||"Memo";case Oi:e=t._payload,t=t._init;try{return Eu(t(e))}catch{}}return null}function Y0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Eu(e);case 8:return e===cd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function tr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function mm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Z0(t){var e=mm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function sa(t){t._valueTracker||(t._valueTracker=Z0(t))}function Am(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=mm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ul(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function wu(t,e){var n=e.checked;return At({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Uf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=tr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function vm(t,e){e=e.checked,e!=null&&ld(t,"checked",e,!1)}function Tu(t,e){vm(t,e);var n=tr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ru(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ru(t,e.type,tr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Of(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ru(t,e,n){(e!=="number"||ul(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var so=Array.isArray;function gs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+tr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function bu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ce(91));return At({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Ff(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ce(92));if(so(n)){if(1<n.length)throw Error(ce(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:tr(n)}}function _m(t,e){var n=tr(e.value),i=tr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function kf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Cm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Pu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Cm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var oa,xm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(oa=oa||document.createElement("div"),oa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=oa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function So(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var co={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},J0=["Webkit","ms","Moz","O"];Object.keys(co).forEach(function(t){J0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),co[e]=co[t]})});function ym(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||co.hasOwnProperty(t)&&co[t]?(""+e).trim():e+"px"}function Im(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=ym(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var K0=At({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Lu(t,e){if(e){if(K0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ce(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ce(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ce(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ce(62))}}function Du(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nu=null;function dd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Uu=null,ms=null,As=null;function zf(t){if(t=Ko(t)){if(typeof Uu!="function")throw Error(ce(280));var e=t.stateNode;e&&(e=Yl(e),Uu(t.stateNode,t.type,e))}}function Mm(t){ms?As?As.push(t):As=[t]:ms=t}function Sm(){if(ms){var t=ms,e=As;if(As=ms=null,zf(t),e)for(t=0;t<e.length;t++)zf(e[t])}}function Em(t,e){return t(e)}function wm(){}var Ac=!1;function Tm(t,e,n){if(Ac)return t(e,n);Ac=!0;try{return Em(t,e,n)}finally{Ac=!1,(ms!==null||As!==null)&&(wm(),Sm())}}function Eo(t,e){var n=t.stateNode;if(n===null)return null;var i=Yl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ce(231,e,typeof n));return n}var Ou=!1;if(Ci)try{var Xs={};Object.defineProperty(Xs,"passive",{get:function(){Ou=!0}}),window.addEventListener("test",Xs,Xs),window.removeEventListener("test",Xs,Xs)}catch{Ou=!1}function Q0(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var uo=!1,hl=null,dl=!1,Fu=null,q0={onError:function(t){uo=!0,hl=t}};function $0(t,e,n,i,r,s,o,a,l){uo=!1,hl=null,Q0.apply(q0,arguments)}function e_(t,e,n,i,r,s,o,a,l){if($0.apply(this,arguments),uo){if(uo){var c=hl;uo=!1,hl=null}else throw Error(ce(198));dl||(dl=!0,Fu=c)}}function Nr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Rm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Bf(t){if(Nr(t)!==t)throw Error(ce(188))}function t_(t){var e=t.alternate;if(!e){if(e=Nr(t),e===null)throw Error(ce(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Bf(r),t;if(s===i)return Bf(r),e;s=s.sibling}throw Error(ce(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ce(189))}}if(n.alternate!==i)throw Error(ce(190))}if(n.tag!==3)throw Error(ce(188));return n.stateNode.current===n?t:e}function bm(t){return t=t_(t),t!==null?Pm(t):null}function Pm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Pm(t);if(e!==null)return e;t=t.sibling}return null}var Lm=vn.unstable_scheduleCallback,Gf=vn.unstable_cancelCallback,n_=vn.unstable_shouldYield,i_=vn.unstable_requestPaint,yt=vn.unstable_now,r_=vn.unstable_getCurrentPriorityLevel,fd=vn.unstable_ImmediatePriority,Dm=vn.unstable_UserBlockingPriority,fl=vn.unstable_NormalPriority,s_=vn.unstable_LowPriority,Nm=vn.unstable_IdlePriority,Hl=null,$n=null;function o_(t){if($n&&typeof $n.onCommitFiberRoot=="function")try{$n.onCommitFiberRoot(Hl,t,void 0,(t.current.flags&128)===128)}catch{}}var Wn=Math.clz32?Math.clz32:c_,a_=Math.log,l_=Math.LN2;function c_(t){return t>>>=0,t===0?32:31-(a_(t)/l_|0)|0}var aa=64,la=4194304;function oo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function pl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=oo(a):(s&=o,s!==0&&(i=oo(s)))}else o=n&~r,o!==0?i=oo(o):s!==0&&(i=oo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Wn(e),r=1<<n,i|=t[n],e&=~r;return i}function u_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function h_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Wn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=u_(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function ku(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Um(){var t=aa;return aa<<=1,!(aa&4194240)&&(aa=64),t}function vc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Zo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Wn(e),t[e]=n}function d_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Wn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function pd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Wn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function Om(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Fm,gd,km,zm,Bm,zu=!1,ca=[],ji=null,Xi=null,Yi=null,wo=new Map,To=new Map,zi=[],f_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Vf(t,e){switch(t){case"focusin":case"focusout":ji=null;break;case"dragenter":case"dragleave":Xi=null;break;case"mouseover":case"mouseout":Yi=null;break;case"pointerover":case"pointerout":wo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":To.delete(e.pointerId)}}function Ys(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ko(e),e!==null&&gd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function p_(t,e,n,i,r){switch(e){case"focusin":return ji=Ys(ji,t,e,n,i,r),!0;case"dragenter":return Xi=Ys(Xi,t,e,n,i,r),!0;case"mouseover":return Yi=Ys(Yi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return wo.set(s,Ys(wo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,To.set(s,Ys(To.get(s)||null,t,e,n,i,r)),!0}return!1}function Gm(t){var e=vr(t.target);if(e!==null){var n=Nr(e);if(n!==null){if(e=n.tag,e===13){if(e=Rm(n),e!==null){t.blockedOn=e,Bm(t.priority,function(){km(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ya(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Bu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Nu=i,n.target.dispatchEvent(i),Nu=null}else return e=Ko(n),e!==null&&gd(e),t.blockedOn=n,!1;e.shift()}return!0}function Hf(t,e,n){Ya(t)&&n.delete(e)}function g_(){zu=!1,ji!==null&&Ya(ji)&&(ji=null),Xi!==null&&Ya(Xi)&&(Xi=null),Yi!==null&&Ya(Yi)&&(Yi=null),wo.forEach(Hf),To.forEach(Hf)}function Zs(t,e){t.blockedOn===e&&(t.blockedOn=null,zu||(zu=!0,vn.unstable_scheduleCallback(vn.unstable_NormalPriority,g_)))}function Ro(t){function e(r){return Zs(r,t)}if(0<ca.length){Zs(ca[0],t);for(var n=1;n<ca.length;n++){var i=ca[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ji!==null&&Zs(ji,t),Xi!==null&&Zs(Xi,t),Yi!==null&&Zs(Yi,t),wo.forEach(e),To.forEach(e),n=0;n<zi.length;n++)i=zi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<zi.length&&(n=zi[0],n.blockedOn===null);)Gm(n),n.blockedOn===null&&zi.shift()}var vs=wi.ReactCurrentBatchConfig,gl=!0;function m_(t,e,n,i){var r=it,s=vs.transition;vs.transition=null;try{it=1,md(t,e,n,i)}finally{it=r,vs.transition=s}}function A_(t,e,n,i){var r=it,s=vs.transition;vs.transition=null;try{it=4,md(t,e,n,i)}finally{it=r,vs.transition=s}}function md(t,e,n,i){if(gl){var r=Bu(t,e,n,i);if(r===null)Tc(t,e,i,ml,n),Vf(t,i);else if(p_(r,t,e,n,i))i.stopPropagation();else if(Vf(t,i),e&4&&-1<f_.indexOf(t)){for(;r!==null;){var s=Ko(r);if(s!==null&&Fm(s),s=Bu(t,e,n,i),s===null&&Tc(t,e,i,ml,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Tc(t,e,i,null,n)}}var ml=null;function Bu(t,e,n,i){if(ml=null,t=dd(i),t=vr(t),t!==null)if(e=Nr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Rm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ml=t,null}function Vm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(r_()){case fd:return 1;case Dm:return 4;case fl:case s_:return 16;case Nm:return 536870912;default:return 16}default:return 16}}var Vi=null,Ad=null,Za=null;function Hm(){if(Za)return Za;var t,e=Ad,n=e.length,i,r="value"in Vi?Vi.value:Vi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Za=r.slice(t,1<i?1-i:void 0)}function Ja(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ua(){return!0}function Wf(){return!1}function Cn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ua:Wf,this.isPropagationStopped=Wf,this}return At(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ua)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ua)},persist:function(){},isPersistent:ua}),e}var Gs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vd=Cn(Gs),Jo=At({},Gs,{view:0,detail:0}),v_=Cn(Jo),_c,Cc,Js,Wl=At({},Jo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_d,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Js&&(Js&&t.type==="mousemove"?(_c=t.screenX-Js.screenX,Cc=t.screenY-Js.screenY):Cc=_c=0,Js=t),_c)},movementY:function(t){return"movementY"in t?t.movementY:Cc}}),jf=Cn(Wl),__=At({},Wl,{dataTransfer:0}),C_=Cn(__),x_=At({},Jo,{relatedTarget:0}),xc=Cn(x_),y_=At({},Gs,{animationName:0,elapsedTime:0,pseudoElement:0}),I_=Cn(y_),M_=At({},Gs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),S_=Cn(M_),E_=At({},Gs,{data:0}),Xf=Cn(E_),w_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},T_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},R_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=R_[t])?!!e[t]:!1}function _d(){return b_}var P_=At({},Jo,{key:function(t){if(t.key){var e=w_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ja(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?T_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_d,charCode:function(t){return t.type==="keypress"?Ja(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ja(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),L_=Cn(P_),D_=At({},Wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Yf=Cn(D_),N_=At({},Jo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_d}),U_=Cn(N_),O_=At({},Gs,{propertyName:0,elapsedTime:0,pseudoElement:0}),F_=Cn(O_),k_=At({},Wl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),z_=Cn(k_),B_=[9,13,27,32],Cd=Ci&&"CompositionEvent"in window,ho=null;Ci&&"documentMode"in document&&(ho=document.documentMode);var G_=Ci&&"TextEvent"in window&&!ho,Wm=Ci&&(!Cd||ho&&8<ho&&11>=ho),Zf=" ",Jf=!1;function jm(t,e){switch(t){case"keyup":return B_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Xm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ns=!1;function V_(t,e){switch(t){case"compositionend":return Xm(e);case"keypress":return e.which!==32?null:(Jf=!0,Zf);case"textInput":return t=e.data,t===Zf&&Jf?null:t;default:return null}}function H_(t,e){if(ns)return t==="compositionend"||!Cd&&jm(t,e)?(t=Hm(),Za=Ad=Vi=null,ns=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Wm&&e.locale!=="ko"?null:e.data;default:return null}}var W_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Kf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!W_[t.type]:e==="textarea"}function Ym(t,e,n,i){Mm(i),e=Al(e,"onChange"),0<e.length&&(n=new vd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var fo=null,bo=null;function j_(t){rA(t,0)}function jl(t){var e=ss(t);if(Am(e))return t}function X_(t,e){if(t==="change")return e}var Zm=!1;if(Ci){var yc;if(Ci){var Ic="oninput"in document;if(!Ic){var Qf=document.createElement("div");Qf.setAttribute("oninput","return;"),Ic=typeof Qf.oninput=="function"}yc=Ic}else yc=!1;Zm=yc&&(!document.documentMode||9<document.documentMode)}function qf(){fo&&(fo.detachEvent("onpropertychange",Jm),bo=fo=null)}function Jm(t){if(t.propertyName==="value"&&jl(bo)){var e=[];Ym(e,bo,t,dd(t)),Tm(j_,e)}}function Y_(t,e,n){t==="focusin"?(qf(),fo=e,bo=n,fo.attachEvent("onpropertychange",Jm)):t==="focusout"&&qf()}function Z_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return jl(bo)}function J_(t,e){if(t==="click")return jl(e)}function K_(t,e){if(t==="input"||t==="change")return jl(e)}function Q_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xn=typeof Object.is=="function"?Object.is:Q_;function Po(t,e){if(Xn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!yu.call(e,r)||!Xn(t[r],e[r]))return!1}return!0}function $f(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ep(t,e){var n=$f(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$f(n)}}function Km(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Km(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Qm(){for(var t=window,e=ul();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ul(t.document)}return e}function xd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function q_(t){var e=Qm(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Km(n.ownerDocument.documentElement,n)){if(i!==null&&xd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=ep(n,s);var o=ep(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var $_=Ci&&"documentMode"in document&&11>=document.documentMode,is=null,Gu=null,po=null,Vu=!1;function tp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vu||is==null||is!==ul(i)||(i=is,"selectionStart"in i&&xd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),po&&Po(po,i)||(po=i,i=Al(Gu,"onSelect"),0<i.length&&(e=new vd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=is)))}function ha(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var rs={animationend:ha("Animation","AnimationEnd"),animationiteration:ha("Animation","AnimationIteration"),animationstart:ha("Animation","AnimationStart"),transitionend:ha("Transition","TransitionEnd")},Mc={},qm={};Ci&&(qm=document.createElement("div").style,"AnimationEvent"in window||(delete rs.animationend.animation,delete rs.animationiteration.animation,delete rs.animationstart.animation),"TransitionEvent"in window||delete rs.transitionend.transition);function Xl(t){if(Mc[t])return Mc[t];if(!rs[t])return t;var e=rs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in qm)return Mc[t]=e[n];return t}var $m=Xl("animationend"),eA=Xl("animationiteration"),tA=Xl("animationstart"),nA=Xl("transitionend"),iA=new Map,np="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(t,e){iA.set(t,e),Dr(e,[t])}for(var Sc=0;Sc<np.length;Sc++){var Ec=np[Sc],eC=Ec.toLowerCase(),tC=Ec[0].toUpperCase()+Ec.slice(1);ir(eC,"on"+tC)}ir($m,"onAnimationEnd");ir(eA,"onAnimationIteration");ir(tA,"onAnimationStart");ir("dblclick","onDoubleClick");ir("focusin","onFocus");ir("focusout","onBlur");ir(nA,"onTransitionEnd");Es("onMouseEnter",["mouseout","mouseover"]);Es("onMouseLeave",["mouseout","mouseover"]);Es("onPointerEnter",["pointerout","pointerover"]);Es("onPointerLeave",["pointerout","pointerover"]);Dr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Dr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Dr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Dr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Dr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Dr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nC=new Set("cancel close invalid load scroll toggle".split(" ").concat(ao));function ip(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,e_(i,e,void 0,t),t.currentTarget=null}function rA(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;ip(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;ip(r,a,c),s=l}}}if(dl)throw t=Fu,dl=!1,Fu=null,t}function ct(t,e){var n=e[Yu];n===void 0&&(n=e[Yu]=new Set);var i=t+"__bubble";n.has(i)||(sA(e,t,2,!1),n.add(i))}function wc(t,e,n){var i=0;e&&(i|=4),sA(n,t,i,e)}var da="_reactListening"+Math.random().toString(36).slice(2);function Lo(t){if(!t[da]){t[da]=!0,dm.forEach(function(n){n!=="selectionchange"&&(nC.has(n)||wc(n,!1,t),wc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[da]||(e[da]=!0,wc("selectionchange",!1,e))}}function sA(t,e,n,i){switch(Vm(e)){case 1:var r=m_;break;case 4:r=A_;break;default:r=md}n=r.bind(null,e,n,t),r=void 0,!Ou||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Tc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=vr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Tm(function(){var c=s,h=dd(n),u=[];e:{var f=iA.get(t);if(f!==void 0){var p=vd,v=t;switch(t){case"keypress":if(Ja(n)===0)break e;case"keydown":case"keyup":p=L_;break;case"focusin":v="focus",p=xc;break;case"focusout":v="blur",p=xc;break;case"beforeblur":case"afterblur":p=xc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=jf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=C_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=U_;break;case $m:case eA:case tA:p=I_;break;case nA:p=F_;break;case"scroll":p=v_;break;case"wheel":p=z_;break;case"copy":case"cut":case"paste":p=S_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Yf}var x=(e&4)!==0,g=!x&&t==="scroll",d=x?f!==null?f+"Capture":null:f;x=[];for(var A=c,m;A!==null;){m=A;var C=m.stateNode;if(m.tag===5&&C!==null&&(m=C,d!==null&&(C=Eo(A,d),C!=null&&x.push(Do(A,C,m)))),g)break;A=A.return}0<x.length&&(f=new p(f,v,null,n,h),u.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Nu&&(v=n.relatedTarget||n.fromElement)&&(vr(v)||v[xi]))break e;if((p||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?vr(v):null,v!==null&&(g=Nr(v),v!==g||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(x=jf,C="onMouseLeave",d="onMouseEnter",A="mouse",(t==="pointerout"||t==="pointerover")&&(x=Yf,C="onPointerLeave",d="onPointerEnter",A="pointer"),g=p==null?f:ss(p),m=v==null?f:ss(v),f=new x(C,A+"leave",p,n,h),f.target=g,f.relatedTarget=m,C=null,vr(h)===c&&(x=new x(d,A+"enter",v,n,h),x.target=m,x.relatedTarget=g,C=x),g=C,p&&v)t:{for(x=p,d=v,A=0,m=x;m;m=kr(m))A++;for(m=0,C=d;C;C=kr(C))m++;for(;0<A-m;)x=kr(x),A--;for(;0<m-A;)d=kr(d),m--;for(;A--;){if(x===d||d!==null&&x===d.alternate)break t;x=kr(x),d=kr(d)}x=null}else x=null;p!==null&&rp(u,f,p,x,!1),v!==null&&g!==null&&rp(u,g,v,x,!0)}}e:{if(f=c?ss(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var w=X_;else if(Kf(f))if(Zm)w=K_;else{w=Z_;var S=Y_}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(w=J_);if(w&&(w=w(t,c))){Ym(u,w,n,h);break e}S&&S(t,f,c),t==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&Ru(f,"number",f.value)}switch(S=c?ss(c):window,t){case"focusin":(Kf(S)||S.contentEditable==="true")&&(is=S,Gu=c,po=null);break;case"focusout":po=Gu=is=null;break;case"mousedown":Vu=!0;break;case"contextmenu":case"mouseup":case"dragend":Vu=!1,tp(u,n,h);break;case"selectionchange":if($_)break;case"keydown":case"keyup":tp(u,n,h)}var I;if(Cd)e:{switch(t){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else ns?jm(t,n)&&(T="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Wm&&n.locale!=="ko"&&(ns||T!=="onCompositionStart"?T==="onCompositionEnd"&&ns&&(I=Hm()):(Vi=h,Ad="value"in Vi?Vi.value:Vi.textContent,ns=!0)),S=Al(c,T),0<S.length&&(T=new Xf(T,t,null,n,h),u.push({event:T,listeners:S}),I?T.data=I:(I=Xm(n),I!==null&&(T.data=I)))),(I=G_?V_(t,n):H_(t,n))&&(c=Al(c,"onBeforeInput"),0<c.length&&(h=new Xf("onBeforeInput","beforeinput",null,n,h),u.push({event:h,listeners:c}),h.data=I))}rA(u,e)})}function Do(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Al(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Eo(t,n),s!=null&&i.unshift(Do(t,s,r)),s=Eo(t,e),s!=null&&i.push(Do(t,s,r))),t=t.return}return i}function kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function rp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Eo(n,s),l!=null&&o.unshift(Do(n,l,a))):r||(l=Eo(n,s),l!=null&&o.push(Do(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var iC=/\r\n?/g,rC=/\u0000|\uFFFD/g;function sp(t){return(typeof t=="string"?t:""+t).replace(iC,`
`).replace(rC,"")}function fa(t,e,n){if(e=sp(e),sp(t)!==e&&n)throw Error(ce(425))}function vl(){}var Hu=null,Wu=null;function ju(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Xu=typeof setTimeout=="function"?setTimeout:void 0,sC=typeof clearTimeout=="function"?clearTimeout:void 0,op=typeof Promise=="function"?Promise:void 0,oC=typeof queueMicrotask=="function"?queueMicrotask:typeof op<"u"?function(t){return op.resolve(null).then(t).catch(aC)}:Xu;function aC(t){setTimeout(function(){throw t})}function Rc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ro(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ro(e)}function Zi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ap(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Vs=Math.random().toString(36).slice(2),qn="__reactFiber$"+Vs,No="__reactProps$"+Vs,xi="__reactContainer$"+Vs,Yu="__reactEvents$"+Vs,lC="__reactListeners$"+Vs,cC="__reactHandles$"+Vs;function vr(t){var e=t[qn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[xi]||n[qn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ap(t);t!==null;){if(n=t[qn])return n;t=ap(t)}return e}t=n,n=t.parentNode}return null}function Ko(t){return t=t[qn]||t[xi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ce(33))}function Yl(t){return t[No]||null}var Zu=[],os=-1;function rr(t){return{current:t}}function ht(t){0>os||(t.current=Zu[os],Zu[os]=null,os--)}function at(t,e){os++,Zu[os]=t.current,t.current=e}var nr={},Zt=rr(nr),an=rr(!1),Mr=nr;function ws(t,e){var n=t.type.contextTypes;if(!n)return nr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function ln(t){return t=t.childContextTypes,t!=null}function _l(){ht(an),ht(Zt)}function lp(t,e,n){if(Zt.current!==nr)throw Error(ce(168));at(Zt,e),at(an,n)}function oA(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ce(108,Y0(t)||"Unknown",r));return At({},n,i)}function Cl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||nr,Mr=Zt.current,at(Zt,t),at(an,an.current),!0}function cp(t,e,n){var i=t.stateNode;if(!i)throw Error(ce(169));n?(t=oA(t,e,Mr),i.__reactInternalMemoizedMergedChildContext=t,ht(an),ht(Zt),at(Zt,t)):ht(an),at(an,n)}var di=null,Zl=!1,bc=!1;function aA(t){di===null?di=[t]:di.push(t)}function uC(t){Zl=!0,aA(t)}function sr(){if(!bc&&di!==null){bc=!0;var t=0,e=it;try{var n=di;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}di=null,Zl=!1}catch(r){throw di!==null&&(di=di.slice(t+1)),Lm(fd,sr),r}finally{it=e,bc=!1}}return null}var as=[],ls=0,xl=null,yl=0,Mn=[],Sn=0,Sr=null,fi=1,pi="";function fr(t,e){as[ls++]=yl,as[ls++]=xl,xl=t,yl=e}function lA(t,e,n){Mn[Sn++]=fi,Mn[Sn++]=pi,Mn[Sn++]=Sr,Sr=t;var i=fi;t=pi;var r=32-Wn(i)-1;i&=~(1<<r),n+=1;var s=32-Wn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,fi=1<<32-Wn(e)+r|n<<r|i,pi=s+t}else fi=1<<s|n<<r|i,pi=t}function yd(t){t.return!==null&&(fr(t,1),lA(t,1,0))}function Id(t){for(;t===xl;)xl=as[--ls],as[ls]=null,yl=as[--ls],as[ls]=null;for(;t===Sr;)Sr=Mn[--Sn],Mn[Sn]=null,pi=Mn[--Sn],Mn[Sn]=null,fi=Mn[--Sn],Mn[Sn]=null}var An=null,mn=null,dt=!1,Bn=null;function cA(t,e){var n=wn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function up(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,An=t,mn=Zi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,An=t,mn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Sr!==null?{id:fi,overflow:pi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=wn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,An=t,mn=null,!0):!1;default:return!1}}function Ju(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ku(t){if(dt){var e=mn;if(e){var n=e;if(!up(t,e)){if(Ju(t))throw Error(ce(418));e=Zi(n.nextSibling);var i=An;e&&up(t,e)?cA(i,n):(t.flags=t.flags&-4097|2,dt=!1,An=t)}}else{if(Ju(t))throw Error(ce(418));t.flags=t.flags&-4097|2,dt=!1,An=t}}}function hp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;An=t}function pa(t){if(t!==An)return!1;if(!dt)return hp(t),dt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ju(t.type,t.memoizedProps)),e&&(e=mn)){if(Ju(t))throw uA(),Error(ce(418));for(;e;)cA(t,e),e=Zi(e.nextSibling)}if(hp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){mn=Zi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}mn=null}}else mn=An?Zi(t.stateNode.nextSibling):null;return!0}function uA(){for(var t=mn;t;)t=Zi(t.nextSibling)}function Ts(){mn=An=null,dt=!1}function Md(t){Bn===null?Bn=[t]:Bn.push(t)}var hC=wi.ReactCurrentBatchConfig;function Ks(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ce(309));var i=n.stateNode}if(!i)throw Error(ce(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ce(284));if(!n._owner)throw Error(ce(290,t))}return t}function ga(t,e){throw t=Object.prototype.toString.call(e),Error(ce(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function dp(t){var e=t._init;return e(t._payload)}function hA(t){function e(d,A){if(t){var m=d.deletions;m===null?(d.deletions=[A],d.flags|=16):m.push(A)}}function n(d,A){if(!t)return null;for(;A!==null;)e(d,A),A=A.sibling;return null}function i(d,A){for(d=new Map;A!==null;)A.key!==null?d.set(A.key,A):d.set(A.index,A),A=A.sibling;return d}function r(d,A){return d=qi(d,A),d.index=0,d.sibling=null,d}function s(d,A,m){return d.index=m,t?(m=d.alternate,m!==null?(m=m.index,m<A?(d.flags|=2,A):m):(d.flags|=2,A)):(d.flags|=1048576,A)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,A,m,C){return A===null||A.tag!==6?(A=Fc(m,d.mode,C),A.return=d,A):(A=r(A,m),A.return=d,A)}function l(d,A,m,C){var w=m.type;return w===ts?h(d,A,m.props.children,C,m.key):A!==null&&(A.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Oi&&dp(w)===A.type)?(C=r(A,m.props),C.ref=Ks(d,A,m),C.return=d,C):(C=nl(m.type,m.key,m.props,null,d.mode,C),C.ref=Ks(d,A,m),C.return=d,C)}function c(d,A,m,C){return A===null||A.tag!==4||A.stateNode.containerInfo!==m.containerInfo||A.stateNode.implementation!==m.implementation?(A=kc(m,d.mode,C),A.return=d,A):(A=r(A,m.children||[]),A.return=d,A)}function h(d,A,m,C,w){return A===null||A.tag!==7?(A=Ir(m,d.mode,C,w),A.return=d,A):(A=r(A,m),A.return=d,A)}function u(d,A,m){if(typeof A=="string"&&A!==""||typeof A=="number")return A=Fc(""+A,d.mode,m),A.return=d,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case ra:return m=nl(A.type,A.key,A.props,null,d.mode,m),m.ref=Ks(d,null,A),m.return=d,m;case es:return A=kc(A,d.mode,m),A.return=d,A;case Oi:var C=A._init;return u(d,C(A._payload),m)}if(so(A)||js(A))return A=Ir(A,d.mode,m,null),A.return=d,A;ga(d,A)}return null}function f(d,A,m,C){var w=A!==null?A.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return w!==null?null:a(d,A,""+m,C);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ra:return m.key===w?l(d,A,m,C):null;case es:return m.key===w?c(d,A,m,C):null;case Oi:return w=m._init,f(d,A,w(m._payload),C)}if(so(m)||js(m))return w!==null?null:h(d,A,m,C,null);ga(d,m)}return null}function p(d,A,m,C,w){if(typeof C=="string"&&C!==""||typeof C=="number")return d=d.get(m)||null,a(A,d,""+C,w);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case ra:return d=d.get(C.key===null?m:C.key)||null,l(A,d,C,w);case es:return d=d.get(C.key===null?m:C.key)||null,c(A,d,C,w);case Oi:var S=C._init;return p(d,A,m,S(C._payload),w)}if(so(C)||js(C))return d=d.get(m)||null,h(A,d,C,w,null);ga(A,C)}return null}function v(d,A,m,C){for(var w=null,S=null,I=A,T=A=0,z=null;I!==null&&T<m.length;T++){I.index>T?(z=I,I=null):z=I.sibling;var _=f(d,I,m[T],C);if(_===null){I===null&&(I=z);break}t&&I&&_.alternate===null&&e(d,I),A=s(_,A,T),S===null?w=_:S.sibling=_,S=_,I=z}if(T===m.length)return n(d,I),dt&&fr(d,T),w;if(I===null){for(;T<m.length;T++)I=u(d,m[T],C),I!==null&&(A=s(I,A,T),S===null?w=I:S.sibling=I,S=I);return dt&&fr(d,T),w}for(I=i(d,I);T<m.length;T++)z=p(I,d,T,m[T],C),z!==null&&(t&&z.alternate!==null&&I.delete(z.key===null?T:z.key),A=s(z,A,T),S===null?w=z:S.sibling=z,S=z);return t&&I.forEach(function(y){return e(d,y)}),dt&&fr(d,T),w}function x(d,A,m,C){var w=js(m);if(typeof w!="function")throw Error(ce(150));if(m=w.call(m),m==null)throw Error(ce(151));for(var S=w=null,I=A,T=A=0,z=null,_=m.next();I!==null&&!_.done;T++,_=m.next()){I.index>T?(z=I,I=null):z=I.sibling;var y=f(d,I,_.value,C);if(y===null){I===null&&(I=z);break}t&&I&&y.alternate===null&&e(d,I),A=s(y,A,T),S===null?w=y:S.sibling=y,S=y,I=z}if(_.done)return n(d,I),dt&&fr(d,T),w;if(I===null){for(;!_.done;T++,_=m.next())_=u(d,_.value,C),_!==null&&(A=s(_,A,T),S===null?w=_:S.sibling=_,S=_);return dt&&fr(d,T),w}for(I=i(d,I);!_.done;T++,_=m.next())_=p(I,d,T,_.value,C),_!==null&&(t&&_.alternate!==null&&I.delete(_.key===null?T:_.key),A=s(_,A,T),S===null?w=_:S.sibling=_,S=_);return t&&I.forEach(function(L){return e(d,L)}),dt&&fr(d,T),w}function g(d,A,m,C){if(typeof m=="object"&&m!==null&&m.type===ts&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ra:e:{for(var w=m.key,S=A;S!==null;){if(S.key===w){if(w=m.type,w===ts){if(S.tag===7){n(d,S.sibling),A=r(S,m.props.children),A.return=d,d=A;break e}}else if(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Oi&&dp(w)===S.type){n(d,S.sibling),A=r(S,m.props),A.ref=Ks(d,S,m),A.return=d,d=A;break e}n(d,S);break}else e(d,S);S=S.sibling}m.type===ts?(A=Ir(m.props.children,d.mode,C,m.key),A.return=d,d=A):(C=nl(m.type,m.key,m.props,null,d.mode,C),C.ref=Ks(d,A,m),C.return=d,d=C)}return o(d);case es:e:{for(S=m.key;A!==null;){if(A.key===S)if(A.tag===4&&A.stateNode.containerInfo===m.containerInfo&&A.stateNode.implementation===m.implementation){n(d,A.sibling),A=r(A,m.children||[]),A.return=d,d=A;break e}else{n(d,A);break}else e(d,A);A=A.sibling}A=kc(m,d.mode,C),A.return=d,d=A}return o(d);case Oi:return S=m._init,g(d,A,S(m._payload),C)}if(so(m))return v(d,A,m,C);if(js(m))return x(d,A,m,C);ga(d,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,A!==null&&A.tag===6?(n(d,A.sibling),A=r(A,m),A.return=d,d=A):(n(d,A),A=Fc(m,d.mode,C),A.return=d,d=A),o(d)):n(d,A)}return g}var Rs=hA(!0),dA=hA(!1),Il=rr(null),Ml=null,cs=null,Sd=null;function Ed(){Sd=cs=Ml=null}function wd(t){var e=Il.current;ht(Il),t._currentValue=e}function Qu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function _s(t,e){Ml=t,Sd=cs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(on=!0),t.firstContext=null)}function bn(t){var e=t._currentValue;if(Sd!==t)if(t={context:t,memoizedValue:e,next:null},cs===null){if(Ml===null)throw Error(ce(308));cs=t,Ml.dependencies={lanes:0,firstContext:t}}else cs=cs.next=t;return e}var _r=null;function Td(t){_r===null?_r=[t]:_r.push(t)}function fA(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Td(e)):(n.next=r.next,r.next=n),e.interleaved=n,yi(t,i)}function yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Fi=!1;function Rd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pA(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ji(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,yi(t,n)}return r=i.interleaved,r===null?(e.next=e,Td(i)):(e.next=r.next,r.next=e),i.interleaved=e,yi(t,n)}function Ka(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,pd(t,n)}}function fp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Sl(t,e,n,i){var r=t.updateQueue;Fi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var u=r.baseState;o=0,h=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,x=a;switch(f=e,p=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){u=v.call(p,u,f);break e}u=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,f=typeof v=="function"?v.call(p,u,f):v,f==null)break e;u=At({},u,f);break e;case 2:Fi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=u):h=h.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(h===null&&(l=u),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);wr|=o,t.lanes=o,t.memoizedState=u}}function pp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ce(191,r));r.call(i)}}}var Qo={},ei=rr(Qo),Uo=rr(Qo),Oo=rr(Qo);function Cr(t){if(t===Qo)throw Error(ce(174));return t}function bd(t,e){switch(at(Oo,e),at(Uo,t),at(ei,Qo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Pu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Pu(e,t)}ht(ei),at(ei,e)}function bs(){ht(ei),ht(Uo),ht(Oo)}function gA(t){Cr(Oo.current);var e=Cr(ei.current),n=Pu(e,t.type);e!==n&&(at(Uo,t),at(ei,n))}function Pd(t){Uo.current===t&&(ht(ei),ht(Uo))}var pt=rr(0);function El(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Pc=[];function Ld(){for(var t=0;t<Pc.length;t++)Pc[t]._workInProgressVersionPrimary=null;Pc.length=0}var Qa=wi.ReactCurrentDispatcher,Lc=wi.ReactCurrentBatchConfig,Er=0,mt=null,Tt=null,Nt=null,wl=!1,go=!1,Fo=0,dC=0;function Gt(){throw Error(ce(321))}function Dd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xn(t[n],e[n]))return!1;return!0}function Nd(t,e,n,i,r,s){if(Er=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Qa.current=t===null||t.memoizedState===null?mC:AC,t=n(i,r),go){s=0;do{if(go=!1,Fo=0,25<=s)throw Error(ce(301));s+=1,Nt=Tt=null,e.updateQueue=null,Qa.current=vC,t=n(i,r)}while(go)}if(Qa.current=Tl,e=Tt!==null&&Tt.next!==null,Er=0,Nt=Tt=mt=null,wl=!1,e)throw Error(ce(300));return t}function Ud(){var t=Fo!==0;return Fo=0,t}function Kn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Nt===null?mt.memoizedState=Nt=t:Nt=Nt.next=t,Nt}function Pn(){if(Tt===null){var t=mt.alternate;t=t!==null?t.memoizedState:null}else t=Tt.next;var e=Nt===null?mt.memoizedState:Nt.next;if(e!==null)Nt=e,Tt=t;else{if(t===null)throw Error(ce(310));Tt=t,t={memoizedState:Tt.memoizedState,baseState:Tt.baseState,baseQueue:Tt.baseQueue,queue:Tt.queue,next:null},Nt===null?mt.memoizedState=Nt=t:Nt=Nt.next=t}return Nt}function ko(t,e){return typeof e=="function"?e(t):e}function Dc(t){var e=Pn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=Tt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((Er&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var u={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=u,o=i):l=l.next=u,mt.lanes|=h,wr|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Xn(i,e.memoizedState)||(on=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,mt.lanes|=s,wr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Nc(t){var e=Pn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Xn(s,e.memoizedState)||(on=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function mA(){}function AA(t,e){var n=mt,i=Pn(),r=e(),s=!Xn(i.memoizedState,r);if(s&&(i.memoizedState=r,on=!0),i=i.queue,Od(CA.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Nt!==null&&Nt.memoizedState.tag&1){if(n.flags|=2048,zo(9,_A.bind(null,n,i,r,e),void 0,null),Ut===null)throw Error(ce(349));Er&30||vA(n,e,r)}return r}function vA(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function _A(t,e,n,i){e.value=n,e.getSnapshot=i,xA(e)&&yA(t)}function CA(t,e,n){return n(function(){xA(e)&&yA(t)})}function xA(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xn(t,n)}catch{return!0}}function yA(t){var e=yi(t,1);e!==null&&jn(e,t,1,-1)}function gp(t){var e=Kn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:t},e.queue=t,t=t.dispatch=gC.bind(null,mt,t),[e.memoizedState,t]}function zo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function IA(){return Pn().memoizedState}function qa(t,e,n,i){var r=Kn();mt.flags|=t,r.memoizedState=zo(1|e,n,void 0,i===void 0?null:i)}function Jl(t,e,n,i){var r=Pn();i=i===void 0?null:i;var s=void 0;if(Tt!==null){var o=Tt.memoizedState;if(s=o.destroy,i!==null&&Dd(i,o.deps)){r.memoizedState=zo(e,n,s,i);return}}mt.flags|=t,r.memoizedState=zo(1|e,n,s,i)}function mp(t,e){return qa(8390656,8,t,e)}function Od(t,e){return Jl(2048,8,t,e)}function MA(t,e){return Jl(4,2,t,e)}function SA(t,e){return Jl(4,4,t,e)}function EA(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function wA(t,e,n){return n=n!=null?n.concat([t]):null,Jl(4,4,EA.bind(null,e,t),n)}function Fd(){}function TA(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function RA(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function bA(t,e,n){return Er&21?(Xn(n,e)||(n=Um(),mt.lanes|=n,wr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,on=!0),t.memoizedState=n)}function fC(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=Lc.transition;Lc.transition={};try{t(!1),e()}finally{it=n,Lc.transition=i}}function PA(){return Pn().memoizedState}function pC(t,e,n){var i=Qi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},LA(t))DA(e,n);else if(n=fA(t,e,n,i),n!==null){var r=qt();jn(n,t,i,r),NA(n,e,i)}}function gC(t,e,n){var i=Qi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(LA(t))DA(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Xn(a,o)){var l=e.interleaved;l===null?(r.next=r,Td(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=fA(t,e,r,i),n!==null&&(r=qt(),jn(n,t,i,r),NA(n,e,i))}}function LA(t){var e=t.alternate;return t===mt||e!==null&&e===mt}function DA(t,e){go=wl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function NA(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,pd(t,n)}}var Tl={readContext:bn,useCallback:Gt,useContext:Gt,useEffect:Gt,useImperativeHandle:Gt,useInsertionEffect:Gt,useLayoutEffect:Gt,useMemo:Gt,useReducer:Gt,useRef:Gt,useState:Gt,useDebugValue:Gt,useDeferredValue:Gt,useTransition:Gt,useMutableSource:Gt,useSyncExternalStore:Gt,useId:Gt,unstable_isNewReconciler:!1},mC={readContext:bn,useCallback:function(t,e){return Kn().memoizedState=[t,e===void 0?null:e],t},useContext:bn,useEffect:mp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,qa(4194308,4,EA.bind(null,e,t),n)},useLayoutEffect:function(t,e){return qa(4194308,4,t,e)},useInsertionEffect:function(t,e){return qa(4,2,t,e)},useMemo:function(t,e){var n=Kn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Kn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=pC.bind(null,mt,t),[i.memoizedState,t]},useRef:function(t){var e=Kn();return t={current:t},e.memoizedState=t},useState:gp,useDebugValue:Fd,useDeferredValue:function(t){return Kn().memoizedState=t},useTransition:function(){var t=gp(!1),e=t[0];return t=fC.bind(null,t[1]),Kn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=mt,r=Kn();if(dt){if(n===void 0)throw Error(ce(407));n=n()}else{if(n=e(),Ut===null)throw Error(ce(349));Er&30||vA(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,mp(CA.bind(null,i,s,t),[t]),i.flags|=2048,zo(9,_A.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Kn(),e=Ut.identifierPrefix;if(dt){var n=pi,i=fi;n=(i&~(1<<32-Wn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Fo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=dC++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},AC={readContext:bn,useCallback:TA,useContext:bn,useEffect:Od,useImperativeHandle:wA,useInsertionEffect:MA,useLayoutEffect:SA,useMemo:RA,useReducer:Dc,useRef:IA,useState:function(){return Dc(ko)},useDebugValue:Fd,useDeferredValue:function(t){var e=Pn();return bA(e,Tt.memoizedState,t)},useTransition:function(){var t=Dc(ko)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:mA,useSyncExternalStore:AA,useId:PA,unstable_isNewReconciler:!1},vC={readContext:bn,useCallback:TA,useContext:bn,useEffect:Od,useImperativeHandle:wA,useInsertionEffect:MA,useLayoutEffect:SA,useMemo:RA,useReducer:Nc,useRef:IA,useState:function(){return Nc(ko)},useDebugValue:Fd,useDeferredValue:function(t){var e=Pn();return Tt===null?e.memoizedState=t:bA(e,Tt.memoizedState,t)},useTransition:function(){var t=Nc(ko)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:mA,useSyncExternalStore:AA,useId:PA,unstable_isNewReconciler:!1};function Fn(t,e){if(t&&t.defaultProps){e=At({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function qu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:At({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Kl={isMounted:function(t){return(t=t._reactInternals)?Nr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=qt(),r=Qi(t),s=vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Ji(t,s,r),e!==null&&(jn(e,t,r,i),Ka(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=qt(),r=Qi(t),s=vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ji(t,s,r),e!==null&&(jn(e,t,r,i),Ka(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=qt(),i=Qi(t),r=vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Ji(t,r,i),e!==null&&(jn(e,t,i,n),Ka(e,t,i))}};function Ap(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Po(n,i)||!Po(r,s):!0}function UA(t,e,n){var i=!1,r=nr,s=e.contextType;return typeof s=="object"&&s!==null?s=bn(s):(r=ln(e)?Mr:Zt.current,i=e.contextTypes,s=(i=i!=null)?ws(t,r):nr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Kl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function vp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Kl.enqueueReplaceState(e,e.state,null)}function $u(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Rd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=bn(s):(s=ln(e)?Mr:Zt.current,r.context=ws(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(qu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Kl.enqueueReplaceState(r,r.state,null),Sl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ps(t,e){try{var n="",i=e;do n+=X0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Uc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function eh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var _C=typeof WeakMap=="function"?WeakMap:Map;function OA(t,e,n){n=vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){bl||(bl=!0,uh=i),eh(t,e)},n}function FA(t,e,n){n=vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){eh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){eh(t,e),typeof i!="function"&&(Ki===null?Ki=new Set([this]):Ki.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function _p(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new _C;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=DC.bind(null,t,e,n),e.then(t,t))}function Cp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function xp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=vi(-1,1),e.tag=2,Ji(n,e,1))),n.lanes|=1),t)}var CC=wi.ReactCurrentOwner,on=!1;function Qt(t,e,n,i){e.child=t===null?dA(e,null,n,i):Rs(e,t.child,n,i)}function yp(t,e,n,i,r){n=n.render;var s=e.ref;return _s(e,r),i=Nd(t,e,n,i,s,r),n=Ud(),t!==null&&!on?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(dt&&n&&yd(e),e.flags|=1,Qt(t,e,i,r),e.child)}function Ip(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!jd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,kA(t,e,s,i,r)):(t=nl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Po,n(o,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=qi(s,i),t.ref=e.ref,t.return=e,e.child=t}function kA(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Po(s,i)&&t.ref===e.ref)if(on=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(on=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return th(t,e,n,i,r)}function zA(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},at(hs,pn),pn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,at(hs,pn),pn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,at(hs,pn),pn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,at(hs,pn),pn|=i;return Qt(t,e,r,n),e.child}function BA(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function th(t,e,n,i,r){var s=ln(n)?Mr:Zt.current;return s=ws(e,s),_s(e,r),n=Nd(t,e,n,i,s,r),i=Ud(),t!==null&&!on?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(dt&&i&&yd(e),e.flags|=1,Qt(t,e,n,r),e.child)}function Mp(t,e,n,i,r){if(ln(n)){var s=!0;Cl(e)}else s=!1;if(_s(e,r),e.stateNode===null)$a(t,e),UA(e,n,i),$u(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=bn(c):(c=ln(n)?Mr:Zt.current,c=ws(e,c));var h=n.getDerivedStateFromProps,u=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&vp(e,o,i,c),Fi=!1;var f=e.memoizedState;o.state=f,Sl(e,i,o,r),l=e.memoizedState,a!==i||f!==l||an.current||Fi?(typeof h=="function"&&(qu(e,n,h,i),l=e.memoizedState),(a=Fi||Ap(e,n,a,i,f,l,c))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,pA(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Fn(e.type,a),o.props=c,u=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=bn(l):(l=ln(n)?Mr:Zt.current,l=ws(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==u||f!==l)&&vp(e,o,i,l),Fi=!1,f=e.memoizedState,o.state=f,Sl(e,i,o,r);var v=e.memoizedState;a!==u||f!==v||an.current||Fi?(typeof p=="function"&&(qu(e,n,p,i),v=e.memoizedState),(c=Fi||Ap(e,n,c,i,f,v,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return nh(t,e,n,i,s,r)}function nh(t,e,n,i,r,s){BA(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&cp(e,n,!1),Ii(t,e,s);i=e.stateNode,CC.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Rs(e,t.child,null,s),e.child=Rs(e,null,a,s)):Qt(t,e,a,s),e.memoizedState=i.state,r&&cp(e,n,!0),e.child}function GA(t){var e=t.stateNode;e.pendingContext?lp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&lp(t,e.context,!1),bd(t,e.containerInfo)}function Sp(t,e,n,i,r){return Ts(),Md(r),e.flags|=256,Qt(t,e,n,i),e.child}var ih={dehydrated:null,treeContext:null,retryLane:0};function rh(t){return{baseLanes:t,cachePool:null,transitions:null}}function VA(t,e,n){var i=e.pendingProps,r=pt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),at(pt,r&1),t===null)return Ku(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=$l(o,i,0,null),t=Ir(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=rh(n),e.memoizedState=ih,t):kd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return xC(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=qi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=qi(a,s):(s=Ir(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?rh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=ih,i}return s=t.child,t=s.sibling,i=qi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function kd(t,e){return e=$l({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ma(t,e,n,i){return i!==null&&Md(i),Rs(e,t.child,null,n),t=kd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function xC(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Uc(Error(ce(422))),ma(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=$l({mode:"visible",children:i.children},r,0,null),s=Ir(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Rs(e,t.child,null,o),e.child.memoizedState=rh(o),e.memoizedState=ih,s);if(!(e.mode&1))return ma(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ce(419)),i=Uc(s,i,void 0),ma(t,e,o,i)}if(a=(o&t.childLanes)!==0,on||a){if(i=Ut,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,yi(t,r),jn(i,t,r,-1))}return Wd(),i=Uc(Error(ce(421))),ma(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=NC.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,mn=Zi(r.nextSibling),An=e,dt=!0,Bn=null,t!==null&&(Mn[Sn++]=fi,Mn[Sn++]=pi,Mn[Sn++]=Sr,fi=t.id,pi=t.overflow,Sr=e),e=kd(e,i.children),e.flags|=4096,e)}function Ep(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Qu(t.return,e,n)}function Oc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function HA(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Qt(t,e,i.children,n),i=pt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ep(t,n,e);else if(t.tag===19)Ep(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(at(pt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&El(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Oc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&El(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Oc(e,!0,n,null,s);break;case"together":Oc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function $a(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),wr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ce(153));if(e.child!==null){for(t=e.child,n=qi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function yC(t,e,n){switch(e.tag){case 3:GA(e),Ts();break;case 5:gA(e);break;case 1:ln(e.type)&&Cl(e);break;case 4:bd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;at(Il,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(at(pt,pt.current&1),e.flags|=128,null):n&e.child.childLanes?VA(t,e,n):(at(pt,pt.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);at(pt,pt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return HA(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),at(pt,pt.current),i)break;return null;case 22:case 23:return e.lanes=0,zA(t,e,n)}return Ii(t,e,n)}var WA,sh,jA,XA;WA=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};sh=function(){};jA=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Cr(ei.current);var s=null;switch(n){case"input":r=wu(t,r),i=wu(t,i),s=[];break;case"select":r=At({},r,{value:void 0}),i=At({},i,{value:void 0}),s=[];break;case"textarea":r=bu(t,r),i=bu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=vl)}Lu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Mo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Mo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};XA=function(t,e,n,i){n!==i&&(e.flags|=4)};function Qs(t,e){if(!dt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function IC(t,e,n){var i=e.pendingProps;switch(Id(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return ln(e.type)&&_l(),Vt(e),null;case 3:return i=e.stateNode,bs(),ht(an),ht(Zt),Ld(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(pa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Bn!==null&&(fh(Bn),Bn=null))),sh(t,e),Vt(e),null;case 5:Pd(e);var r=Cr(Oo.current);if(n=e.type,t!==null&&e.stateNode!=null)jA(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return Vt(e),null}if(t=Cr(ei.current),pa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[qn]=e,i[No]=s,t=(e.mode&1)!==0,n){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<ao.length;r++)ct(ao[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":Uf(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Ff(i,s),ct("invalid",i)}Lu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&fa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&fa(i.textContent,a,t),r=["children",""+a]):Mo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ct("scroll",i)}switch(n){case"input":sa(i),Of(i,s,!0);break;case"textarea":sa(i),kf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=vl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Cm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[qn]=e,t[No]=i,WA(t,e,!1,!1),e.stateNode=t;e:{switch(o=Du(n,i),n){case"dialog":ct("cancel",t),ct("close",t),r=i;break;case"iframe":case"object":case"embed":ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<ao.length;r++)ct(ao[r],t);r=i;break;case"source":ct("error",t),r=i;break;case"img":case"image":case"link":ct("error",t),ct("load",t),r=i;break;case"details":ct("toggle",t),r=i;break;case"input":Uf(t,i),r=wu(t,i),ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=At({},i,{value:void 0}),ct("invalid",t);break;case"textarea":Ff(t,i),r=bu(t,i),ct("invalid",t);break;default:r=i}Lu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Im(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&xm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&So(t,l):typeof l=="number"&&So(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Mo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",t):l!=null&&ld(t,s,l,o))}switch(n){case"input":sa(t),Of(t,i,!1);break;case"textarea":sa(t),kf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+tr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?gs(t,!!i.multiple,s,!1):i.defaultValue!=null&&gs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=vl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Vt(e),null;case 6:if(t&&e.stateNode!=null)XA(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ce(166));if(n=Cr(Oo.current),Cr(ei.current),pa(e)){if(i=e.stateNode,n=e.memoizedProps,i[qn]=e,(s=i.nodeValue!==n)&&(t=An,t!==null))switch(t.tag){case 3:fa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[qn]=e,e.stateNode=i}return Vt(e),null;case 13:if(ht(pt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(dt&&mn!==null&&e.mode&1&&!(e.flags&128))uA(),Ts(),e.flags|=98560,s=!1;else if(s=pa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ce(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ce(317));s[qn]=e}else Ts(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),s=!1}else Bn!==null&&(fh(Bn),Bn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||pt.current&1?bt===0&&(bt=3):Wd())),e.updateQueue!==null&&(e.flags|=4),Vt(e),null);case 4:return bs(),sh(t,e),t===null&&Lo(e.stateNode.containerInfo),Vt(e),null;case 10:return wd(e.type._context),Vt(e),null;case 17:return ln(e.type)&&_l(),Vt(e),null;case 19:if(ht(pt),s=e.memoizedState,s===null)return Vt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Qs(s,!1);else{if(bt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=El(t),o!==null){for(e.flags|=128,Qs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return at(pt,pt.current&1|2),e.child}t=t.sibling}s.tail!==null&&yt()>Ls&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304)}else{if(!i)if(t=El(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Qs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!dt)return Vt(e),null}else 2*yt()-s.renderingStartTime>Ls&&n!==1073741824&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=yt(),e.sibling=null,n=pt.current,at(pt,i?n&1|2:n&1),e):(Vt(e),null);case 22:case 23:return Hd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?pn&1073741824&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),null;case 24:return null;case 25:return null}throw Error(ce(156,e.tag))}function MC(t,e){switch(Id(e),e.tag){case 1:return ln(e.type)&&_l(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bs(),ht(an),ht(Zt),Ld(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Pd(e),null;case 13:if(ht(pt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ce(340));Ts()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ht(pt),null;case 4:return bs(),null;case 10:return wd(e.type._context),null;case 22:case 23:return Hd(),null;case 24:return null;default:return null}}var Aa=!1,jt=!1,SC=typeof WeakSet=="function"?WeakSet:Set,Re=null;function us(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){_t(t,e,i)}else n.current=null}function oh(t,e,n){try{n()}catch(i){_t(t,e,i)}}var wp=!1;function EC(t,e){if(Hu=gl,t=Qm(),xd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,u=t,f=null;t:for(;;){for(var p;u!==n||r!==0&&u.nodeType!==3||(a=o+r),u!==s||i!==0&&u.nodeType!==3||(l=o+i),u.nodeType===3&&(o+=u.nodeValue.length),(p=u.firstChild)!==null;)f=u,u=p;for(;;){if(u===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++h===i&&(l=o),(p=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Wu={focusedElem:t,selectionRange:n},gl=!1,Re=e;Re!==null;)if(e=Re,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Re=t;else for(;Re!==null;){e=Re;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,g=v.memoizedState,d=e.stateNode,A=d.getSnapshotBeforeUpdate(e.elementType===e.type?x:Fn(e.type,x),g);d.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ce(163))}}catch(C){_t(e,e.return,C)}if(t=e.sibling,t!==null){t.return=e.return,Re=t;break}Re=e.return}return v=wp,wp=!1,v}function mo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&oh(e,n,s)}r=r.next}while(r!==i)}}function Ql(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function ah(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function YA(t){var e=t.alternate;e!==null&&(t.alternate=null,YA(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[qn],delete e[No],delete e[Yu],delete e[lC],delete e[cC])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ZA(t){return t.tag===5||t.tag===3||t.tag===4}function Tp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ZA(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function lh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=vl));else if(i!==4&&(t=t.child,t!==null))for(lh(t,e,n),t=t.sibling;t!==null;)lh(t,e,n),t=t.sibling}function ch(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(ch(t,e,n),t=t.sibling;t!==null;)ch(t,e,n),t=t.sibling}var Ft=null,kn=!1;function Ri(t,e,n){for(n=n.child;n!==null;)JA(t,e,n),n=n.sibling}function JA(t,e,n){if($n&&typeof $n.onCommitFiberUnmount=="function")try{$n.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 5:jt||us(n,e);case 6:var i=Ft,r=kn;Ft=null,Ri(t,e,n),Ft=i,kn=r,Ft!==null&&(kn?(t=Ft,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ft.removeChild(n.stateNode));break;case 18:Ft!==null&&(kn?(t=Ft,n=n.stateNode,t.nodeType===8?Rc(t.parentNode,n):t.nodeType===1&&Rc(t,n),Ro(t)):Rc(Ft,n.stateNode));break;case 4:i=Ft,r=kn,Ft=n.stateNode.containerInfo,kn=!0,Ri(t,e,n),Ft=i,kn=r;break;case 0:case 11:case 14:case 15:if(!jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&oh(n,e,o),r=r.next}while(r!==i)}Ri(t,e,n);break;case 1:if(!jt&&(us(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){_t(n,e,a)}Ri(t,e,n);break;case 21:Ri(t,e,n);break;case 22:n.mode&1?(jt=(i=jt)||n.memoizedState!==null,Ri(t,e,n),jt=i):Ri(t,e,n);break;default:Ri(t,e,n)}}function Rp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new SC),e.forEach(function(i){var r=UC.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Dn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ft=a.stateNode,kn=!1;break e;case 3:Ft=a.stateNode.containerInfo,kn=!0;break e;case 4:Ft=a.stateNode.containerInfo,kn=!0;break e}a=a.return}if(Ft===null)throw Error(ce(160));JA(s,o,r),Ft=null,kn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){_t(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)KA(e,t),e=e.sibling}function KA(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Dn(e,t),Zn(t),i&4){try{mo(3,t,t.return),Ql(3,t)}catch(x){_t(t,t.return,x)}try{mo(5,t,t.return)}catch(x){_t(t,t.return,x)}}break;case 1:Dn(e,t),Zn(t),i&512&&n!==null&&us(n,n.return);break;case 5:if(Dn(e,t),Zn(t),i&512&&n!==null&&us(n,n.return),t.flags&32){var r=t.stateNode;try{So(r,"")}catch(x){_t(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&vm(r,s),Du(a,o);var c=Du(a,s);for(o=0;o<l.length;o+=2){var h=l[o],u=l[o+1];h==="style"?Im(r,u):h==="dangerouslySetInnerHTML"?xm(r,u):h==="children"?So(r,u):ld(r,h,u,c)}switch(a){case"input":Tu(r,s);break;case"textarea":_m(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?gs(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?gs(r,!!s.multiple,s.defaultValue,!0):gs(r,!!s.multiple,s.multiple?[]:"",!1))}r[No]=s}catch(x){_t(t,t.return,x)}}break;case 6:if(Dn(e,t),Zn(t),i&4){if(t.stateNode===null)throw Error(ce(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){_t(t,t.return,x)}}break;case 3:if(Dn(e,t),Zn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ro(e.containerInfo)}catch(x){_t(t,t.return,x)}break;case 4:Dn(e,t),Zn(t);break;case 13:Dn(e,t),Zn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Gd=yt())),i&4&&Rp(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(jt=(c=jt)||h,Dn(e,t),jt=c):Dn(e,t),Zn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(Re=t,h=t.child;h!==null;){for(u=Re=h;Re!==null;){switch(f=Re,p=f.child,f.tag){case 0:case 11:case 14:case 15:mo(4,f,f.return);break;case 1:us(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(x){_t(i,n,x)}}break;case 5:us(f,f.return);break;case 22:if(f.memoizedState!==null){Pp(u);continue}}p!==null?(p.return=f,Re=p):Pp(u)}h=h.sibling}e:for(h=null,u=t;;){if(u.tag===5){if(h===null){h=u;try{r=u.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=u.stateNode,l=u.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=ym("display",o))}catch(x){_t(t,t.return,x)}}}else if(u.tag===6){if(h===null)try{u.stateNode.nodeValue=c?"":u.memoizedProps}catch(x){_t(t,t.return,x)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===t)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;h===u&&(h=null),u=u.return}h===u&&(h=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:Dn(e,t),Zn(t),i&4&&Rp(t);break;case 21:break;default:Dn(e,t),Zn(t)}}function Zn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(ZA(n)){var i=n;break e}n=n.return}throw Error(ce(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(So(r,""),i.flags&=-33);var s=Tp(t);ch(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Tp(t);lh(t,a,o);break;default:throw Error(ce(161))}}catch(l){_t(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function wC(t,e,n){Re=t,QA(t)}function QA(t,e,n){for(var i=(t.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Aa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||jt;a=Aa;var c=jt;if(Aa=o,(jt=l)&&!c)for(Re=r;Re!==null;)o=Re,l=o.child,o.tag===22&&o.memoizedState!==null?Lp(r):l!==null?(l.return=o,Re=l):Lp(r);for(;s!==null;)Re=s,QA(s),s=s.sibling;Re=r,Aa=a,jt=c}bp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):bp(t)}}function bp(t){for(;Re!==null;){var e=Re;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:jt||Ql(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!jt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Fn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&pp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}pp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var u=h.dehydrated;u!==null&&Ro(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ce(163))}jt||e.flags&512&&ah(e)}catch(f){_t(e,e.return,f)}}if(e===t){Re=null;break}if(n=e.sibling,n!==null){n.return=e.return,Re=n;break}Re=e.return}}function Pp(t){for(;Re!==null;){var e=Re;if(e===t){Re=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Re=n;break}Re=e.return}}function Lp(t){for(;Re!==null;){var e=Re;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ql(4,e)}catch(l){_t(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){_t(e,r,l)}}var s=e.return;try{ah(e)}catch(l){_t(e,s,l)}break;case 5:var o=e.return;try{ah(e)}catch(l){_t(e,o,l)}}}catch(l){_t(e,e.return,l)}if(e===t){Re=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Re=a;break}Re=e.return}}var TC=Math.ceil,Rl=wi.ReactCurrentDispatcher,zd=wi.ReactCurrentOwner,Rn=wi.ReactCurrentBatchConfig,Qe=0,Ut=null,Et=null,zt=0,pn=0,hs=rr(0),bt=0,Bo=null,wr=0,ql=0,Bd=0,Ao=null,sn=null,Gd=0,Ls=1/0,hi=null,bl=!1,uh=null,Ki=null,va=!1,Hi=null,Pl=0,vo=0,hh=null,el=-1,tl=0;function qt(){return Qe&6?yt():el!==-1?el:el=yt()}function Qi(t){return t.mode&1?Qe&2&&zt!==0?zt&-zt:hC.transition!==null?(tl===0&&(tl=Um()),tl):(t=it,t!==0||(t=window.event,t=t===void 0?16:Vm(t.type)),t):1}function jn(t,e,n,i){if(50<vo)throw vo=0,hh=null,Error(ce(185));Zo(t,n,i),(!(Qe&2)||t!==Ut)&&(t===Ut&&(!(Qe&2)&&(ql|=n),bt===4&&Bi(t,zt)),cn(t,i),n===1&&Qe===0&&!(e.mode&1)&&(Ls=yt()+500,Zl&&sr()))}function cn(t,e){var n=t.callbackNode;h_(t,e);var i=pl(t,t===Ut?zt:0);if(i===0)n!==null&&Gf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Gf(n),e===1)t.tag===0?uC(Dp.bind(null,t)):aA(Dp.bind(null,t)),oC(function(){!(Qe&6)&&sr()}),n=null;else{switch(Om(i)){case 1:n=fd;break;case 4:n=Dm;break;case 16:n=fl;break;case 536870912:n=Nm;break;default:n=fl}n=sv(n,qA.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function qA(t,e){if(el=-1,tl=0,Qe&6)throw Error(ce(327));var n=t.callbackNode;if(Cs()&&t.callbackNode!==n)return null;var i=pl(t,t===Ut?zt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ll(t,i);else{e=i;var r=Qe;Qe|=2;var s=ev();(Ut!==t||zt!==e)&&(hi=null,Ls=yt()+500,yr(t,e));do try{PC();break}catch(a){$A(t,a)}while(!0);Ed(),Rl.current=s,Qe=r,Et!==null?e=0:(Ut=null,zt=0,e=bt)}if(e!==0){if(e===2&&(r=ku(t),r!==0&&(i=r,e=dh(t,r))),e===1)throw n=Bo,yr(t,0),Bi(t,i),cn(t,yt()),n;if(e===6)Bi(t,i);else{if(r=t.current.alternate,!(i&30)&&!RC(r)&&(e=Ll(t,i),e===2&&(s=ku(t),s!==0&&(i=s,e=dh(t,s))),e===1))throw n=Bo,yr(t,0),Bi(t,i),cn(t,yt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ce(345));case 2:pr(t,sn,hi);break;case 3:if(Bi(t,i),(i&130023424)===i&&(e=Gd+500-yt(),10<e)){if(pl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){qt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Xu(pr.bind(null,t,sn,hi),e);break}pr(t,sn,hi);break;case 4:if(Bi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Wn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=yt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*TC(i/1960))-i,10<i){t.timeoutHandle=Xu(pr.bind(null,t,sn,hi),i);break}pr(t,sn,hi);break;case 5:pr(t,sn,hi);break;default:throw Error(ce(329))}}}return cn(t,yt()),t.callbackNode===n?qA.bind(null,t):null}function dh(t,e){var n=Ao;return t.current.memoizedState.isDehydrated&&(yr(t,e).flags|=256),t=Ll(t,e),t!==2&&(e=sn,sn=n,e!==null&&fh(e)),t}function fh(t){sn===null?sn=t:sn.push.apply(sn,t)}function RC(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Xn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Bi(t,e){for(e&=~Bd,e&=~ql,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Wn(e),i=1<<n;t[n]=-1,e&=~i}}function Dp(t){if(Qe&6)throw Error(ce(327));Cs();var e=pl(t,0);if(!(e&1))return cn(t,yt()),null;var n=Ll(t,e);if(t.tag!==0&&n===2){var i=ku(t);i!==0&&(e=i,n=dh(t,i))}if(n===1)throw n=Bo,yr(t,0),Bi(t,e),cn(t,yt()),n;if(n===6)throw Error(ce(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,pr(t,sn,hi),cn(t,yt()),null}function Vd(t,e){var n=Qe;Qe|=1;try{return t(e)}finally{Qe=n,Qe===0&&(Ls=yt()+500,Zl&&sr())}}function Tr(t){Hi!==null&&Hi.tag===0&&!(Qe&6)&&Cs();var e=Qe;Qe|=1;var n=Rn.transition,i=it;try{if(Rn.transition=null,it=1,t)return t()}finally{it=i,Rn.transition=n,Qe=e,!(Qe&6)&&sr()}}function Hd(){pn=hs.current,ht(hs)}function yr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,sC(n)),Et!==null)for(n=Et.return;n!==null;){var i=n;switch(Id(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&_l();break;case 3:bs(),ht(an),ht(Zt),Ld();break;case 5:Pd(i);break;case 4:bs();break;case 13:ht(pt);break;case 19:ht(pt);break;case 10:wd(i.type._context);break;case 22:case 23:Hd()}n=n.return}if(Ut=t,Et=t=qi(t.current,null),zt=pn=e,bt=0,Bo=null,Bd=ql=wr=0,sn=Ao=null,_r!==null){for(e=0;e<_r.length;e++)if(n=_r[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}_r=null}return t}function $A(t,e){do{var n=Et;try{if(Ed(),Qa.current=Tl,wl){for(var i=mt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}wl=!1}if(Er=0,Nt=Tt=mt=null,go=!1,Fo=0,zd.current=null,n===null||n.return===null){bt=1,Bo=e,Et=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=zt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,u=h.tag;if(!(h.mode&1)&&(u===0||u===11||u===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Cp(o);if(p!==null){p.flags&=-257,xp(p,o,a,s,e),p.mode&1&&_p(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var x=new Set;x.add(l),e.updateQueue=x}else v.add(l);break e}else{if(!(e&1)){_p(s,c,e),Wd();break e}l=Error(ce(426))}}else if(dt&&a.mode&1){var g=Cp(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),xp(g,o,a,s,e),Md(Ps(l,a));break e}}s=l=Ps(l,a),bt!==4&&(bt=2),Ao===null?Ao=[s]:Ao.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=OA(s,l,e);fp(s,d);break e;case 1:a=l;var A=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof A.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Ki===null||!Ki.has(m)))){s.flags|=65536,e&=-e,s.lanes|=e;var C=FA(s,a,e);fp(s,C);break e}}s=s.return}while(s!==null)}nv(n)}catch(w){e=w,Et===n&&n!==null&&(Et=n=n.return);continue}break}while(!0)}function ev(){var t=Rl.current;return Rl.current=Tl,t===null?Tl:t}function Wd(){(bt===0||bt===3||bt===2)&&(bt=4),Ut===null||!(wr&268435455)&&!(ql&268435455)||Bi(Ut,zt)}function Ll(t,e){var n=Qe;Qe|=2;var i=ev();(Ut!==t||zt!==e)&&(hi=null,yr(t,e));do try{bC();break}catch(r){$A(t,r)}while(!0);if(Ed(),Qe=n,Rl.current=i,Et!==null)throw Error(ce(261));return Ut=null,zt=0,bt}function bC(){for(;Et!==null;)tv(Et)}function PC(){for(;Et!==null&&!n_();)tv(Et)}function tv(t){var e=rv(t.alternate,t,pn);t.memoizedProps=t.pendingProps,e===null?nv(t):Et=e,zd.current=null}function nv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=MC(n,e),n!==null){n.flags&=32767,Et=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{bt=6,Et=null;return}}else if(n=IC(n,e,pn),n!==null){Et=n;return}if(e=e.sibling,e!==null){Et=e;return}Et=e=t}while(e!==null);bt===0&&(bt=5)}function pr(t,e,n){var i=it,r=Rn.transition;try{Rn.transition=null,it=1,LC(t,e,n,i)}finally{Rn.transition=r,it=i}return null}function LC(t,e,n,i){do Cs();while(Hi!==null);if(Qe&6)throw Error(ce(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ce(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(d_(t,s),t===Ut&&(Et=Ut=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||va||(va=!0,sv(fl,function(){return Cs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Rn.transition,Rn.transition=null;var o=it;it=1;var a=Qe;Qe|=4,zd.current=null,EC(t,n),KA(n,t),q_(Wu),gl=!!Hu,Wu=Hu=null,t.current=n,wC(n),i_(),Qe=a,it=o,Rn.transition=s}else t.current=n;if(va&&(va=!1,Hi=t,Pl=r),s=t.pendingLanes,s===0&&(Ki=null),o_(n.stateNode),cn(t,yt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(bl)throw bl=!1,t=uh,uh=null,t;return Pl&1&&t.tag!==0&&Cs(),s=t.pendingLanes,s&1?t===hh?vo++:(vo=0,hh=t):vo=0,sr(),null}function Cs(){if(Hi!==null){var t=Om(Pl),e=Rn.transition,n=it;try{if(Rn.transition=null,it=16>t?16:t,Hi===null)var i=!1;else{if(t=Hi,Hi=null,Pl=0,Qe&6)throw Error(ce(331));var r=Qe;for(Qe|=4,Re=t.current;Re!==null;){var s=Re,o=s.child;if(Re.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Re=c;Re!==null;){var h=Re;switch(h.tag){case 0:case 11:case 15:mo(8,h,s)}var u=h.child;if(u!==null)u.return=h,Re=u;else for(;Re!==null;){h=Re;var f=h.sibling,p=h.return;if(YA(h),h===c){Re=null;break}if(f!==null){f.return=p,Re=f;break}Re=p}}}var v=s.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}Re=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Re=o;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:mo(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Re=d;break e}Re=s.return}}var A=t.current;for(Re=A;Re!==null;){o=Re;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,Re=m;else e:for(o=A;Re!==null;){if(a=Re,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ql(9,a)}}catch(w){_t(a,a.return,w)}if(a===o){Re=null;break e}var C=a.sibling;if(C!==null){C.return=a.return,Re=C;break e}Re=a.return}}if(Qe=r,sr(),$n&&typeof $n.onPostCommitFiberRoot=="function")try{$n.onPostCommitFiberRoot(Hl,t)}catch{}i=!0}return i}finally{it=n,Rn.transition=e}}return!1}function Np(t,e,n){e=Ps(n,e),e=OA(t,e,1),t=Ji(t,e,1),e=qt(),t!==null&&(Zo(t,1,e),cn(t,e))}function _t(t,e,n){if(t.tag===3)Np(t,t,n);else for(;e!==null;){if(e.tag===3){Np(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ki===null||!Ki.has(i))){t=Ps(n,t),t=FA(e,t,1),e=Ji(e,t,1),t=qt(),e!==null&&(Zo(e,1,t),cn(e,t));break}}e=e.return}}function DC(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=qt(),t.pingedLanes|=t.suspendedLanes&n,Ut===t&&(zt&n)===n&&(bt===4||bt===3&&(zt&130023424)===zt&&500>yt()-Gd?yr(t,0):Bd|=n),cn(t,e)}function iv(t,e){e===0&&(t.mode&1?(e=la,la<<=1,!(la&130023424)&&(la=4194304)):e=1);var n=qt();t=yi(t,e),t!==null&&(Zo(t,e,n),cn(t,n))}function NC(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),iv(t,n)}function UC(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ce(314))}i!==null&&i.delete(e),iv(t,n)}var rv;rv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||an.current)on=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return on=!1,yC(t,e,n);on=!!(t.flags&131072)}else on=!1,dt&&e.flags&1048576&&lA(e,yl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;$a(t,e),t=e.pendingProps;var r=ws(e,Zt.current);_s(e,n),r=Nd(null,e,i,t,r,n);var s=Ud();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ln(i)?(s=!0,Cl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Rd(e),r.updater=Kl,e.stateNode=r,r._reactInternals=e,$u(e,i,t,n),e=nh(null,e,i,!0,s,n)):(e.tag=0,dt&&s&&yd(e),Qt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch($a(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=FC(i),t=Fn(i,t),r){case 0:e=th(null,e,i,t,n);break e;case 1:e=Mp(null,e,i,t,n);break e;case 11:e=yp(null,e,i,t,n);break e;case 14:e=Ip(null,e,i,Fn(i.type,t),n);break e}throw Error(ce(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),th(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Mp(t,e,i,r,n);case 3:e:{if(GA(e),t===null)throw Error(ce(387));i=e.pendingProps,s=e.memoizedState,r=s.element,pA(t,e),Sl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ps(Error(ce(423)),e),e=Sp(t,e,i,n,r);break e}else if(i!==r){r=Ps(Error(ce(424)),e),e=Sp(t,e,i,n,r);break e}else for(mn=Zi(e.stateNode.containerInfo.firstChild),An=e,dt=!0,Bn=null,n=dA(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ts(),i===r){e=Ii(t,e,n);break e}Qt(t,e,i,n)}e=e.child}return e;case 5:return gA(e),t===null&&Ku(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,ju(i,r)?o=null:s!==null&&ju(i,s)&&(e.flags|=32),BA(t,e),Qt(t,e,o,n),e.child;case 6:return t===null&&Ku(e),null;case 13:return VA(t,e,n);case 4:return bd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Rs(e,null,i,n):Qt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),yp(t,e,i,r,n);case 7:return Qt(t,e,e.pendingProps,n),e.child;case 8:return Qt(t,e,e.pendingProps.children,n),e.child;case 12:return Qt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,at(Il,i._currentValue),i._currentValue=o,s!==null)if(Xn(s.value,o)){if(s.children===r.children&&!an.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Qu(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ce(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Qu(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Qt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,_s(e,n),r=bn(r),i=i(r),e.flags|=1,Qt(t,e,i,n),e.child;case 14:return i=e.type,r=Fn(i,e.pendingProps),r=Fn(i.type,r),Ip(t,e,i,r,n);case 15:return kA(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),$a(t,e),e.tag=1,ln(i)?(t=!0,Cl(e)):t=!1,_s(e,n),UA(e,i,r),$u(e,i,r,n),nh(null,e,i,!0,t,n);case 19:return HA(t,e,n);case 22:return zA(t,e,n)}throw Error(ce(156,e.tag))};function sv(t,e){return Lm(t,e)}function OC(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wn(t,e,n,i){return new OC(t,e,n,i)}function jd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function FC(t){if(typeof t=="function")return jd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ud)return 11;if(t===hd)return 14}return 2}function qi(t,e){var n=t.alternate;return n===null?(n=wn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function nl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")jd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ts:return Ir(n.children,r,s,e);case cd:o=8,r|=8;break;case Iu:return t=wn(12,n,e,r|2),t.elementType=Iu,t.lanes=s,t;case Mu:return t=wn(13,n,e,r),t.elementType=Mu,t.lanes=s,t;case Su:return t=wn(19,n,e,r),t.elementType=Su,t.lanes=s,t;case gm:return $l(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case fm:o=10;break e;case pm:o=9;break e;case ud:o=11;break e;case hd:o=14;break e;case Oi:o=16,i=null;break e}throw Error(ce(130,t==null?t:typeof t,""))}return e=wn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Ir(t,e,n,i){return t=wn(7,t,i,e),t.lanes=n,t}function $l(t,e,n,i){return t=wn(22,t,i,e),t.elementType=gm,t.lanes=n,t.stateNode={isHidden:!1},t}function Fc(t,e,n){return t=wn(6,t,null,e),t.lanes=n,t}function kc(t,e,n){return e=wn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function kC(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vc(0),this.expirationTimes=vc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Xd(t,e,n,i,r,s,o,a,l){return t=new kC(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=wn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Rd(s),t}function zC(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:es,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function ov(t){if(!t)return nr;t=t._reactInternals;e:{if(Nr(t)!==t||t.tag!==1)throw Error(ce(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ln(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ce(171))}if(t.tag===1){var n=t.type;if(ln(n))return oA(t,n,e)}return e}function av(t,e,n,i,r,s,o,a,l){return t=Xd(n,i,!0,t,r,s,o,a,l),t.context=ov(null),n=t.current,i=qt(),r=Qi(n),s=vi(i,r),s.callback=e??null,Ji(n,s,r),t.current.lanes=r,Zo(t,r,i),cn(t,i),t}function ec(t,e,n,i){var r=e.current,s=qt(),o=Qi(r);return n=ov(n),e.context===null?e.context=n:e.pendingContext=n,e=vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Ji(r,e,o),t!==null&&(jn(t,r,o,s),Ka(t,r,o)),o}function Dl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Up(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Yd(t,e){Up(t,e),(t=t.alternate)&&Up(t,e)}function BC(){return null}var lv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Zd(t){this._internalRoot=t}tc.prototype.render=Zd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ce(409));ec(t,e,null,null)};tc.prototype.unmount=Zd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Tr(function(){ec(null,t,null,null)}),e[xi]=null}};function tc(t){this._internalRoot=t}tc.prototype.unstable_scheduleHydration=function(t){if(t){var e=zm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<zi.length&&e!==0&&e<zi[n].priority;n++);zi.splice(n,0,t),n===0&&Gm(t)}};function Jd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function nc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Op(){}function GC(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Dl(o);s.call(c)}}var o=av(e,i,t,0,null,!1,!1,"",Op);return t._reactRootContainer=o,t[xi]=o.current,Lo(t.nodeType===8?t.parentNode:t),Tr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Dl(l);a.call(c)}}var l=Xd(t,0,!1,null,null,!1,!1,"",Op);return t._reactRootContainer=l,t[xi]=l.current,Lo(t.nodeType===8?t.parentNode:t),Tr(function(){ec(e,l,n,i)}),l}function ic(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Dl(o);a.call(l)}}ec(e,o,t,r)}else o=GC(n,e,t,r,i);return Dl(o)}Fm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=oo(e.pendingLanes);n!==0&&(pd(e,n|1),cn(e,yt()),!(Qe&6)&&(Ls=yt()+500,sr()))}break;case 13:Tr(function(){var i=yi(t,1);if(i!==null){var r=qt();jn(i,t,1,r)}}),Yd(t,1)}};gd=function(t){if(t.tag===13){var e=yi(t,134217728);if(e!==null){var n=qt();jn(e,t,134217728,n)}Yd(t,134217728)}};km=function(t){if(t.tag===13){var e=Qi(t),n=yi(t,e);if(n!==null){var i=qt();jn(n,t,e,i)}Yd(t,e)}};zm=function(){return it};Bm=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};Uu=function(t,e,n){switch(e){case"input":if(Tu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Yl(i);if(!r)throw Error(ce(90));Am(i),Tu(i,r)}}}break;case"textarea":_m(t,n);break;case"select":e=n.value,e!=null&&gs(t,!!n.multiple,e,!1)}};Em=Vd;wm=Tr;var VC={usingClientEntryPoint:!1,Events:[Ko,ss,Yl,Mm,Sm,Vd]},qs={findFiberByHostInstance:vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},HC={bundleType:qs.bundleType,version:qs.version,rendererPackageName:qs.rendererPackageName,rendererConfig:qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:wi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=bm(t),t===null?null:t.stateNode},findFiberByHostInstance:qs.findFiberByHostInstance||BC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _a=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_a.isDisabled&&_a.supportsFiber)try{Hl=_a.inject(HC),$n=_a}catch{}}_n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=VC;_n.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Jd(e))throw Error(ce(200));return zC(t,e,null,n)};_n.createRoot=function(t,e){if(!Jd(t))throw Error(ce(299));var n=!1,i="",r=lv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Xd(t,1,!1,null,null,n,!1,i,r),t[xi]=e.current,Lo(t.nodeType===8?t.parentNode:t),new Zd(e)};_n.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ce(188)):(t=Object.keys(t).join(","),Error(ce(268,t)));return t=bm(e),t=t===null?null:t.stateNode,t};_n.flushSync=function(t){return Tr(t)};_n.hydrate=function(t,e,n){if(!nc(e))throw Error(ce(200));return ic(null,t,e,!0,n)};_n.hydrateRoot=function(t,e,n){if(!Jd(t))throw Error(ce(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=lv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=av(e,null,t,1,n??null,r,!1,s,o),t[xi]=e.current,Lo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new tc(e)};_n.render=function(t,e,n){if(!nc(e))throw Error(ce(200));return ic(null,t,e,!1,n)};_n.unmountComponentAtNode=function(t){if(!nc(t))throw Error(ce(40));return t._reactRootContainer?(Tr(function(){ic(null,null,t,!1,function(){t._reactRootContainer=null,t[xi]=null})}),!0):!1};_n.unstable_batchedUpdates=Vd;_n.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!nc(n))throw Error(ce(200));if(t==null||t._reactInternals===void 0)throw Error(ce(38));return ic(t,e,n,!1,i)};_n.version="18.3.1-next-f1338f8080-20240426";function cv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cv)}catch(t){console.error(t)}}cv(),cm.exports=_n;var Kd=cm.exports,Fp=Kd;xu.createRoot=Fp.createRoot,xu.hydrateRoot=Fp.hydrateRoot;const uv=()=>It("list_materials","GET"),WC=t=>It("component_mass","POST",{id:t});async function It(t,e,n){const i=await fetch(`/api/${t}`,{method:e,headers:n?{"content-type":"application/json"}:{},body:n?JSON.stringify(n):void 0});if(!i.ok)throw new Error(await i.text());return i.json()}const hv=t=>It("load_ork","POST",{path:t}),jC=t=>It("load_ork","POST",{b64:t}),kp=()=>It("snapshot","POST",{}),XC=()=>It("new","POST",{}),YC=async t=>{const e=new Uint8Array(await t.arrayBuffer());let n="";for(let i=0;i<e.length;i++)n+=String.fromCharCode(e[i]);return It("load_ork","POST",{b64:btoa(n)})},ZC=(t,e,n)=>It("component","PATCH",{id:t,key:e,value:n}),JC=t=>It("component/delete","POST",{id:t}),KC=(t,e)=>It("component/add","POST",{parent_id:t,kind:e}),QC=()=>It("undo","POST",{}),qC=()=>It("redo","POST",{}),zc=t=>{switch(t){case"Stage":return["NoseCone","BodyTube","Transition","PodSet","ParallelStage"];case"BodyTube":return["InnerTube","FinSet","TubeFinSet","LaunchLug","CenteringRing","Parachute","ShockCord","MassObject"];case"PodSet":case"ParallelStage":return["NoseCone","BodyTube","Transition"];default:return[]}},Bc=t=>It("save","POST",{path:t??null}),zp=t=>It("simulate","POST",{sim_name:t}),$C=(t,e,n)=>It("sim","PATCH",{sim_name:t,key:e,value:n}),ex=t=>It("analysis","POST",{mach:t}),tx=t=>It("optimize","POST",t),dv=()=>It("motors","GET"),nx=(t,e,n,i,r)=>It("assign_motor","POST",{mount_id:t,config_id:e,designation:n,digest:i,ejection_delay:r}),ix=(t,e)=>It("clear_motor","POST",{mount_id:t,config_id:e}),rx=async()=>{try{return await It("fixtures","GET")}catch{return[]}};function $i({options:t,value:e,onChange:n,className:i="",title:r,disabled:s=!1,placeholder:o="—"}){const[a,l]=pe.useState(!1),[c,h]=pe.useState(0),u=pe.useRef(null),f=pe.useRef(null),p=t.find(A=>A.value===e),[v,x]=pe.useState(null);pe.useLayoutEffect(()=>{if(!a)return;const A=()=>{const m=u.current?.getBoundingClientRect();m&&x({left:m.left,top:m.bottom+4,width:m.width})};return A(),window.addEventListener("scroll",A,!0),window.addEventListener("resize",A),()=>{window.removeEventListener("scroll",A,!0),window.removeEventListener("resize",A)}},[a]),pe.useEffect(()=>{if(!a)return;const A=m=>{const C=m.target;u.current&&!u.current.contains(C)&&f.current&&!f.current.contains(C)&&l(!1)};return document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[a]),pe.useEffect(()=>{a&&h(Math.max(0,t.findIndex(A=>A.value===e)))},[a,t,e]);const g=A=>{const m=t[A];m&&n(m.value),l(!1)},d=A=>{if(!s){if(A.key==="Escape")return l(!1);if(!a&&(A.key==="Enter"||A.key===" "||A.key==="ArrowDown"))return A.preventDefault(),l(!0);a&&(A.key==="ArrowDown"?(A.preventDefault(),h(m=>Math.min(t.length-1,m+1))):A.key==="ArrowUp"?(A.preventDefault(),h(m=>Math.max(0,m-1))):(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),g(c)))}};return R.jsxs("div",{ref:u,className:"uisel"+(s?" disabled":"")+(i?" "+i:""),title:r,children:[R.jsxs("button",{type:"button",className:"uisel-trigger",disabled:s,"aria-haspopup":"listbox","aria-expanded":a,onClick:()=>!s&&l(A=>!A),onKeyDown:d,children:[R.jsx("span",{className:"uisel-value",children:p?p.label:o}),R.jsx("svg",{className:"uisel-chev"+(a?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:R.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),a&&v&&Kd.createPortal(R.jsx("ul",{ref:f,className:"uisel-list",role:"listbox",onWheel:A=>A.stopPropagation(),onPointerDown:A=>A.stopPropagation(),style:{position:"fixed",left:v.left,top:v.top,minWidth:v.width},children:t.map((A,m)=>R.jsx("li",{role:"option","aria-selected":A.value===e,className:"uisel-opt"+(A.value===e?" sel":"")+(m===c?" active":""),onMouseEnter:()=>h(m),onMouseDown:C=>{C.preventDefault(),g(m)},children:A.label},A.value))}),document.body)]})}const Bp=250;function sx({fixtures:t,busy:e,hasDoc:n,canExportCsv:i,onNew:r,onOpenFile:s,onOpenExample:o,onSave:a,onSaveAs:l,onExportCsv:c,onExportPng:h,onExportObj:u,onExportOrk:f}){const[p,v]=pe.useState(!1),[x,g]=pe.useState(""),d=pe.useRef(null),A=pe.useRef(null),m=pe.useRef(null),C=pe.useRef(null),[w,S]=pe.useState(null),[I,T]=pe.useState({left:0,top:0}),z=(L,N)=>{const G=A.current?.getBoundingClientRect(),Z=N.currentTarget.getBoundingClientRect();if(!G)return;const B=G.right+Bp<=window.innerWidth;T({left:B?G.right-2:G.left-Bp+2,top:Math.max(8,Math.min(Z.top-6,window.innerHeight-60))}),g(L)};pe.useLayoutEffect(()=>{if(!p)return;const L=()=>{const N=d.current?.getBoundingClientRect();N&&S({left:N.left,top:N.bottom+4})};return L(),window.addEventListener("scroll",L,!0),window.addEventListener("resize",L),()=>{window.removeEventListener("scroll",L,!0),window.removeEventListener("resize",L)}},[p]),pe.useEffect(()=>{if(!p)return;const L=N=>{const G=N.target;d.current&&!d.current.contains(G)&&A.current&&!A.current.contains(G)&&!(m.current&&m.current.contains(G))&&(v(!1),g(""))};return document.addEventListener("mousedown",L),()=>document.removeEventListener("mousedown",L)},[p]);const _=()=>{v(!1),g("")},y=L=>{_(),L()};return R.jsxs("div",{ref:d,className:"uisel filemenu",children:[R.jsxs("button",{type:"button",className:"uisel-trigger",disabled:e,"aria-haspopup":"menu","aria-expanded":p,onClick:()=>!e&&v(L=>!L),children:[R.jsx("span",{className:"uisel-value",children:"File"}),R.jsx("svg",{className:"uisel-chev"+(p?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:R.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),R.jsx("input",{ref:C,type:"file",accept:".ork",style:{display:"none"},onChange:L=>{const N=L.target.files?.[0];L.target.value="",N&&y(()=>s(N))}}),p&&w&&Kd.createPortal(R.jsxs(R.Fragment,{children:[R.jsxs("div",{ref:A,className:"fmenu",onWheel:L=>L.stopPropagation(),onPointerDown:L=>L.stopPropagation(),style:{position:"fixed",left:w.left,top:w.top},children:[R.jsx("button",{className:"fm-item",onMouseEnter:()=>g(""),onClick:()=>y(r),children:"New"}),R.jsx("button",{className:"fm-item",onMouseEnter:()=>g(""),onClick:()=>C.current?.click(),children:"Open .ork file…"}),R.jsxs("button",{className:"fm-item fm-parent"+(x==="examples"?" on":""),onMouseEnter:L=>z("examples",L),onClick:L=>z("examples",L),children:["Open example",R.jsx("span",{className:"fm-arrow",children:"▸"})]}),R.jsx("div",{className:"fm-sep"}),R.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>g(""),onClick:()=>y(a),children:"Save"}),R.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>g(""),onClick:()=>y(()=>{const L=window.prompt("Save as (filename):","rocket.ork");L&&l(L.endsWith(".ork")?L:L+".ork")}),children:"Save as…"}),R.jsx("div",{className:"fm-sep"}),R.jsxs("button",{className:"fm-item fm-parent"+(x==="export"?" on":""),disabled:!n,onMouseEnter:L=>n&&z("export",L),onClick:L=>n&&z("export",L),children:["Export",R.jsx("span",{className:"fm-arrow",children:"▸"})]})]}),x&&R.jsx("div",{ref:m,className:"fmenu fm-fly",onWheel:L=>L.stopPropagation(),onPointerDown:L=>L.stopPropagation(),onMouseLeave:()=>g(""),style:{position:"fixed",left:I.left,top:I.top},children:x==="examples"?t.length===0?R.jsx("div",{className:"fm-empty",children:"no examples"}):t.map(L=>R.jsx("button",{className:"fm-item",onClick:()=>y(()=>o(L.path)),children:L.name},L.path)):R.jsxs(R.Fragment,{children:[R.jsx("button",{className:"fm-item",onClick:()=>y(h),children:"Design image (PNG)"}),R.jsx("button",{className:"fm-item",onClick:()=>y(u),children:"3D model (OBJ)"}),R.jsx("button",{className:"fm-item",onClick:()=>y(f),children:"OpenRocket file (.ork)"}),R.jsx("button",{className:"fm-item",disabled:!i,title:i?"":"Run a simulation first",onClick:()=>y(c),children:"Flight data (CSV)"})]})})]}),document.body)]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qd="169",xs={ROTATE:0,DOLLY:1,PAN:2},ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ox=0,Gp=1,ax=2,fv=1,lx=2,ui=3,Mi=0,Xt=1,gn=2,er=0,ys=1,Vp=2,Hp=3,Wp=4,cx=5,mr=100,ux=101,hx=102,dx=103,fx=104,px=200,gx=201,mx=202,Ax=203,ph=204,gh=205,vx=206,_x=207,Cx=208,xx=209,yx=210,Ix=211,Mx=212,Sx=213,Ex=214,mh=0,Ah=1,vh=2,Ds=3,_h=4,Ch=5,xh=6,yh=7,pv=0,wx=1,Tx=2,_i=0,Rx=1,bx=2,Px=3,Lx=4,Dx=5,Nx=6,Ux=7,gv=300,Ns=301,Us=302,Ih=303,Mh=304,rc=306,Os=1e3,Wi=1001,Nl=1002,Tn=1003,Ox=1004,Ca=1005,Gn=1006,Gc=1007,xr=1008,Si=1009,mv=1010,Av=1011,Go=1012,qd=1013,Rr=1014,gi=1015,qo=1016,$d=1017,ef=1018,Fs=1020,vv=35902,_v=1021,Cv=1022,Hn=1023,xv=1024,yv=1025,Is=1026,ks=1027,Iv=1028,tf=1029,Mv=1030,nf=1031,rf=1033,il=33776,rl=33777,sl=33778,ol=33779,Sh=35840,Eh=35841,wh=35842,Th=35843,Rh=36196,bh=37492,Ph=37496,Lh=37808,Dh=37809,Nh=37810,Uh=37811,Oh=37812,Fh=37813,kh=37814,zh=37815,Bh=37816,Gh=37817,Vh=37818,Hh=37819,Wh=37820,jh=37821,al=36492,Xh=36494,Yh=36495,Sv=36283,Zh=36284,Jh=36285,Kh=36286,Fx=3200,kx=3201,Ev=0,zx=1,Gi="",zn="srgb",Yn="srgb-linear",sf="display-p3",sc="display-p3-linear",Ul="linear",ut="srgb",Ol="rec709",Fl="p3",zr=7680,jp=519,Bx=512,Gx=513,Vx=514,wv=515,Hx=516,Wx=517,jx=518,Xx=519,Xp=35044,Yp="300 es",mi=2e3,kl=2001;class Ur{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zp=1234567;const _o=Math.PI/180,Vo=180/Math.PI;function Or(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[t&255]+Ht[t>>8&255]+Ht[t>>16&255]+Ht[t>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function Rt(t,e,n){return Math.max(e,Math.min(n,t))}function of(t,e){return(t%e+e)%e}function Yx(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function Zx(t,e,n){return t!==e?(n-t)/(e-t):0}function Co(t,e,n){return(1-n)*t+n*e}function Jx(t,e,n,i){return Co(t,e,1-Math.exp(-n*i))}function Kx(t,e=1){return e-Math.abs(of(t,e*2)-e)}function Qx(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function qx(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function $x(t,e){return t+Math.floor(Math.random()*(e-t+1))}function ey(t,e){return t+Math.random()*(e-t)}function ty(t){return t*(.5-Math.random())}function ny(t){t!==void 0&&(Zp=t);let e=Zp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function iy(t){return t*_o}function ry(t){return t*Vo}function sy(t){return(t&t-1)===0&&t!==0}function oy(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function ay(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function ly(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),h=o((e+i)/2),u=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":t.set(a*h,l*u,l*f,a*c);break;case"YZY":t.set(l*f,a*h,l*u,a*c);break;case"ZXZ":t.set(l*u,l*f,a*h,a*c);break;case"XZX":t.set(a*h,l*v,l*p,a*c);break;case"YXY":t.set(l*p,a*h,l*v,a*c);break;case"ZYZ":t.set(l*v,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function $r(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Jt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Tv={DEG2RAD:_o,RAD2DEG:Vo,generateUUID:Or,clamp:Rt,euclideanModulo:of,mapLinear:Yx,inverseLerp:Zx,lerp:Co,damp:Jx,pingpong:Kx,smoothstep:Qx,smootherstep:qx,randInt:$x,randFloat:ey,randFloatSpread:ty,seededRandom:ny,degToRad:iy,radToDeg:ry,isPowerOfTwo:sy,ceilPowerOfTwo:oy,floorPowerOfTwo:ay,setQuaternionFromProperEuler:ly,normalize:Jt,denormalize:$r};class he{constructor(e=0,n=0){he.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,n,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],v=i[8],x=r[0],g=r[3],d=r[6],A=r[1],m=r[4],C=r[7],w=r[2],S=r[5],I=r[8];return s[0]=o*x+a*A+l*w,s[3]=o*g+a*m+l*S,s[6]=o*d+a*C+l*I,s[1]=c*x+h*A+u*w,s[4]=c*g+h*m+u*S,s[7]=c*d+h*C+u*I,s[2]=f*x+p*A+v*w,s[5]=f*g+p*m+v*S,s[8]=f*d+p*C+v*I,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*s,p=c*s-o*l,v=n*u+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=u*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(h*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Vc.makeScale(e,n)),this}rotate(e){return this.premultiply(Vc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Vc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vc=new je;function Rv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ho(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function cy(){const t=Ho("canvas");return t.style.display="block",t}const Jp={};function ll(t){t in Jp||(Jp[t]=!0,console.warn(t))}function uy(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function hy(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function dy(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Kp=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qp=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$s={[Yn]:{transfer:Ul,primaries:Ol,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[zn]:{transfer:ut,primaries:Ol,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[sc]:{transfer:Ul,primaries:Fl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Qp),fromReference:t=>t.applyMatrix3(Kp)},[sf]:{transfer:ut,primaries:Fl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Qp),fromReference:t=>t.applyMatrix3(Kp).convertLinearToSRGB()}},fy=new Set([Yn,sc]),qe={enabled:!0,_workingColorSpace:Yn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!fy.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=$s[e].toReference,r=$s[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return $s[t].primaries},getTransfer:function(t){return t===Gi?Ul:$s[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray($s[e].luminanceCoefficients)}};function Ms(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Hc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Br;class py{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Br===void 0&&(Br=Ho("canvas")),Br.width=e.width,Br.height=e.height;const i=Br.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Br}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ho("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ms(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ms(n[i]/255)*255):n[i]=Ms(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gy=0;class bv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gy++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Wc(r[o].image)):s.push(Wc(r[o]))}else s=Wc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Wc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?py.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let my=0;class $t extends Ur{constructor(e=$t.DEFAULT_IMAGE,n=$t.DEFAULT_MAPPING,i=Wi,r=Wi,s=Gn,o=xr,a=Hn,l=Si,c=$t.DEFAULT_ANISOTROPY,h=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:my++}),this.uuid=Or(),this.name="",this.source=new bv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case Nl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case Nl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=gv;$t.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,n=0,i=0,r=1){Ct.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],v=l[9],x=l[2],g=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const m=(c+1)/2,C=(p+1)/2,w=(d+1)/2,S=(h+f)/4,I=(u+x)/4,T=(v+g)/4;return m>C&&m>w?m<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(m),r=S/i,s=I/i):C>w?C<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(C),i=S/r,s=T/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=I/s,r=T/s),this.set(i,r,s,n),this}let A=Math.sqrt((g-v)*(g-v)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(g-v)/A,this.y=(u-x)/A,this.z=(f-h)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ay extends Ur{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Ct(0,0,e,n),this.scissorTest=!1,this.viewport=new Ct(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new $t(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new bv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class br extends Ay{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Pv extends $t{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vy extends $t{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=v,e[n+3]=x;return}if(u!==x||l!==f||c!==p||h!==v){let g=1-a;const d=l*f+c*p+h*v+u*x,A=d>=0?1:-1,m=1-d*d;if(m>Number.EPSILON){const w=Math.sqrt(m),S=Math.atan2(w,d*A);g=Math.sin(g*S)/w,a=Math.sin(a*S)/w}const C=a*A;if(l=l*g+f*C,c=c*g+p*C,h=h*g+v*C,u=u*g+x*C,g===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+h*u+l*p-c*f,e[n+1]=l*v+h*f+c*u-a*p,e[n+2]=c*v+h*p+a*f-l*u,e[n+3]=h*v-a*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u-f*p*v;break;case"YXZ":this._x=f*h*u+c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u+f*p*v;break;case"ZXY":this._x=f*h*u-c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u-f*p*v;break;case"ZYX":this._x=f*h*u-c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u+f*p*v;break;case"YZX":this._x=f*h*u+c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u-f*p*v;break;case"XZY":this._x=f*h*u-c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],u=n[10],f=i+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-n)*h)/c,f=Math.sin(n*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,n=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(qp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(qp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),u=2*(s*i-o*n);return this.x=n+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return jc.copy(this).projectOnVector(e),this.sub(jc)}reflect(e){return this.sub(jc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jc=new O,qp=new Pr;class Hs{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Nn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Nn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Nn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Nn):Nn.fromBufferAttribute(s,o),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xa.copy(i.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(eo),ya.subVectors(this.max,eo),Gr.subVectors(e.a,eo),Vr.subVectors(e.b,eo),Hr.subVectors(e.c,eo),bi.subVectors(Vr,Gr),Pi.subVectors(Hr,Vr),ar.subVectors(Gr,Hr);let n=[0,-bi.z,bi.y,0,-Pi.z,Pi.y,0,-ar.z,ar.y,bi.z,0,-bi.x,Pi.z,0,-Pi.x,ar.z,0,-ar.x,-bi.y,bi.x,0,-Pi.y,Pi.x,0,-ar.y,ar.x,0];return!Xc(n,Gr,Vr,Hr,ya)||(n=[1,0,0,0,1,0,0,0,1],!Xc(n,Gr,Vr,Hr,ya))?!1:(Ia.crossVectors(bi,Pi),n=[Ia.x,Ia.y,Ia.z],Xc(n,Gr,Vr,Hr,ya))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new O,new O,new O,new O,new O,new O,new O,new O],Nn=new O,xa=new Hs,Gr=new O,Vr=new O,Hr=new O,bi=new O,Pi=new O,ar=new O,eo=new O,ya=new O,Ia=new O,lr=new O;function Xc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){lr.fromArray(t,s);const a=r.x*Math.abs(lr.x)+r.y*Math.abs(lr.y)+r.z*Math.abs(lr.z),l=e.dot(lr),c=n.dot(lr),h=i.dot(lr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const _y=new Hs,to=new O,Yc=new O;class af{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):_y.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;to.subVectors(e,this.center);const n=to.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(to,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(to.copy(e.center).add(Yc)),this.expandByPoint(to.copy(e.center).sub(Yc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new O,Zc=new O,Ma=new O,Li=new O,Jc=new O,Sa=new O,Kc=new O;class Lv{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,n),oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Zc.copy(e).add(n).multiplyScalar(.5),Ma.copy(n).sub(e).normalize(),Li.copy(this.origin).sub(Zc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ma),a=Li.dot(this.direction),l=-Li.dot(Ma),c=Li.lengthSq(),h=Math.abs(1-o*o);let u,f,p,v;if(h>0)if(u=o*l-a,f=o*a-l,v=s*h,u>=0)if(f>=-v)if(f<=v){const x=1/h;u*=x,f*=x,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-v?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=v?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Zc).addScaledVector(Ma,f),p}intersectSphere(e,n){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),r=oi.dot(oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,n,i,r,s){Jc.subVectors(n,e),Sa.subVectors(i,e),Kc.crossVectors(Jc,Sa);let o=this.direction.dot(Kc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,e);const l=a*this.direction.dot(Sa.crossVectors(Li,Sa));if(l<0)return null;const c=a*this.direction.dot(Jc.cross(Li));if(c<0||l+c>o)return null;const h=-a*Li.dot(Kc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g)}set(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=v,d[11]=x,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Wr.setFromMatrixColumn(e,0).length(),s=1/Wr.setFromMatrixColumn(e,1).length(),o=1/Wr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*u,v=a*h,x=a*u;n[0]=l*h,n[4]=-l*u,n[8]=c,n[1]=p+v*c,n[5]=f-x*c,n[9]=-a*l,n[2]=x-f*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,v=c*h,x=c*u;n[0]=f+x*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*u,n[5]=o*h,n[9]=-a,n[2]=p*a-v,n[6]=x+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,v=c*h,x=c*u;n[0]=f-x*a,n[4]=-o*u,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*h,n[9]=x-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*u,v=a*h,x=a*u;n[0]=l*h,n[4]=v*c-p,n[8]=f*c+x,n[1]=l*u,n[5]=x*c+f,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*h,n[4]=x-f*u,n[8]=v*u+p,n[1]=u,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*u+v,n[10]=f-x*u}else if(e.order==="XZY"){const f=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*h,n[4]=-u,n[8]=c*h,n[1]=f*u+x,n[5]=o*h,n[9]=p*u-v,n[2]=v*u-p,n[6]=a*h,n[10]=x*u+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cy,e,xy)}lookAt(e,n,i){const r=this.elements;return dn.subVectors(e,n),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),Di.crossVectors(i,dn),Di.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),Di.crossVectors(i,dn)),Di.normalize(),Ea.crossVectors(dn,Di),r[0]=Di.x,r[4]=Ea.x,r[8]=dn.x,r[1]=Di.y,r[5]=Ea.y,r[9]=dn.y,r[2]=Di.z,r[6]=Ea.z,r[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],v=i[2],x=i[6],g=i[10],d=i[14],A=i[3],m=i[7],C=i[11],w=i[15],S=r[0],I=r[4],T=r[8],z=r[12],_=r[1],y=r[5],L=r[9],N=r[13],G=r[2],Z=r[6],B=r[10],Q=r[14],D=r[3],J=r[7],q=r[11],ie=r[15];return s[0]=o*S+a*_+l*G+c*D,s[4]=o*I+a*y+l*Z+c*J,s[8]=o*T+a*L+l*B+c*q,s[12]=o*z+a*N+l*Q+c*ie,s[1]=h*S+u*_+f*G+p*D,s[5]=h*I+u*y+f*Z+p*J,s[9]=h*T+u*L+f*B+p*q,s[13]=h*z+u*N+f*Q+p*ie,s[2]=v*S+x*_+g*G+d*D,s[6]=v*I+x*y+g*Z+d*J,s[10]=v*T+x*L+g*B+d*q,s[14]=v*z+x*N+g*Q+d*ie,s[3]=A*S+m*_+C*G+w*D,s[7]=A*I+m*y+C*Z+w*J,s[11]=A*T+m*L+C*B+w*q,s[15]=A*z+m*N+C*Q+w*ie,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],v=e[3],x=e[7],g=e[11],d=e[15];return v*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*p-i*l*p)+x*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*h-s*l*h)+g*(+n*c*u-n*a*p-s*o*u+i*o*p+s*a*h-i*c*h)+d*(-r*a*h-n*l*u+n*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],v=e[12],x=e[13],g=e[14],d=e[15],A=u*g*c-x*f*c+x*l*p-a*g*p-u*l*d+a*f*d,m=v*f*c-h*g*c-v*l*p+o*g*p+h*l*d-o*f*d,C=h*x*c-v*u*c+v*a*p-o*x*p-h*a*d+o*u*d,w=v*u*l-h*x*l-v*a*f+o*x*f+h*a*g-o*u*g,S=n*A+i*m+r*C+s*w;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/S;return e[0]=A*I,e[1]=(x*f*s-u*g*s-x*r*p+i*g*p+u*r*d-i*f*d)*I,e[2]=(a*g*s-x*l*s+x*r*c-i*g*c-a*r*d+i*l*d)*I,e[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*p-i*l*p)*I,e[4]=m*I,e[5]=(h*g*s-v*f*s+v*r*p-n*g*p-h*r*d+n*f*d)*I,e[6]=(v*l*s-o*g*s-v*r*c+n*g*c+o*r*d-n*l*d)*I,e[7]=(o*f*s-h*l*s+h*r*c-n*f*c-o*r*p+n*l*p)*I,e[8]=C*I,e[9]=(v*u*s-h*x*s-v*i*p+n*x*p+h*i*d-n*u*d)*I,e[10]=(o*x*s-v*a*s+v*i*c-n*x*c-o*i*d+n*a*d)*I,e[11]=(h*a*s-o*u*s-h*i*c+n*u*c+o*i*p-n*a*p)*I,e[12]=w*I,e[13]=(h*x*r-v*u*r+v*i*f-n*x*f-h*i*g+n*u*g)*I,e[14]=(v*a*r-o*x*r-v*i*l+n*x*l+o*i*g-n*a*g)*I,e[15]=(o*u*r-h*a*r+h*i*l-n*u*l-o*i*f+n*a*f)*I,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,u=a+a,f=s*c,p=s*h,v=s*u,x=o*h,g=o*u,d=a*u,A=l*c,m=l*h,C=l*u,w=i.x,S=i.y,I=i.z;return r[0]=(1-(x+d))*w,r[1]=(p+C)*w,r[2]=(v-m)*w,r[3]=0,r[4]=(p-C)*S,r[5]=(1-(f+d))*S,r[6]=(g+A)*S,r[7]=0,r[8]=(v+m)*I,r[9]=(g-A)*I,r[10]=(1-(f+x))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Wr.set(r[0],r[1],r[2]).length();const o=Wr.set(r[4],r[5],r[6]).length(),a=Wr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const c=1/s,h=1/o,u=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=u,Un.elements[9]*=u,Un.elements[10]*=u,n.setFromRotationMatrix(Un),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=mi){const l=this.elements,c=2*s/(n-e),h=2*s/(i-r),u=(n+e)/(n-e),f=(i+r)/(i-r);let p,v;if(a===mi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===kl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=mi){const l=this.elements,c=1/(n-e),h=1/(i-r),u=1/(o-s),f=(n+e)*c,p=(i+r)*h;let v,x;if(a===mi)v=(o+s)*u,x=-2*u;else if(a===kl)v=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Wr=new O,Un=new ot,Cy=new O(0,0,0),xy=new O(1,1,1),Di=new O,Ea=new O,dn=new O,$p=new ot,eg=new Pr;class ni{constructor(e=0,n=0,i=0,r=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $p.makeRotationFromQuaternion(e),this.setFromRotationMatrix($p,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return eg.setFromEuler(this),this.setFromQuaternion(eg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Dv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yy=0;const tg=new O,jr=new Pr,ai=new ot,wa=new O,no=new O,Iy=new O,My=new Pr,ng=new O(1,0,0),ig=new O(0,1,0),rg=new O(0,0,1),sg={type:"added"},Sy={type:"removed"},Xr={type:"childadded",child:null},Qc={type:"childremoved",child:null};class Yt extends Ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yy++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new O,n=new ni,i=new Pr,r=new O(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new je}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return jr.setFromAxisAngle(e,n),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,n){return jr.setFromAxisAngle(e,n),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(ng,e)}rotateY(e){return this.rotateOnAxis(ig,e)}rotateZ(e){return this.rotateOnAxis(rg,e)}translateOnAxis(e,n){return tg.copy(e).applyQuaternion(this.quaternion),this.position.add(tg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(ng,e)}translateY(e){return this.translateOnAxis(ig,e)}translateZ(e){return this.translateOnAxis(rg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?wa.copy(e):wa.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),no.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(no,wa,this.up):ai.lookAt(wa,no,this.up),this.quaternion.setFromRotationMatrix(ai),r&&(ai.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(ai),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sg),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Sy),Qc.child=e,this.dispatchEvent(Qc),Qc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sg),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,e,Iy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,My,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Yt.DEFAULT_UP=new O(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const On=new O,li=new O,qc=new O,ci=new O,Yr=new O,Zr=new O,og=new O,$c=new O,eu=new O,tu=new O,nu=new Ct,iu=new Ct,ru=new Ct;class Vn{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),On.subVectors(e,n),r.cross(On);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){On.subVectors(r,n),li.subVectors(i,n),qc.subVectors(e,n);const o=On.dot(On),a=On.dot(li),l=On.dot(qc),c=li.dot(li),h=li.dot(qc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,v=(o*h-a*l)*f;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ci.x),l.addScaledVector(o,ci.y),l.addScaledVector(a,ci.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return nu.setScalar(0),iu.setScalar(0),ru.setScalar(0),nu.fromBufferAttribute(e,n),iu.fromBufferAttribute(e,i),ru.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(nu,s.x),o.addScaledVector(iu,s.y),o.addScaledVector(ru,s.z),o}static isFrontFacing(e,n,i,r){return On.subVectors(i,n),li.subVectors(e,n),On.cross(li).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),li.subVectors(this.a,this.b),On.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Vn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Vn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Yr.subVectors(r,i),Zr.subVectors(s,i),$c.subVectors(e,i);const l=Yr.dot($c),c=Zr.dot($c);if(l<=0&&c<=0)return n.copy(i);eu.subVectors(e,r);const h=Yr.dot(eu),u=Zr.dot(eu);if(h>=0&&u<=h)return n.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(Yr,o);tu.subVectors(e,s);const p=Yr.dot(tu),v=Zr.dot(tu);if(v>=0&&p<=v)return n.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(Zr,a);const g=h*v-p*u;if(g<=0&&u-h>=0&&p-v>=0)return og.subVectors(s,r),a=(u-h)/(u-h+(p-v)),n.copy(r).addScaledVector(og,a);const d=1/(g+x+f);return o=x*d,a=f*d,n.copy(i).addScaledVector(Yr,o).addScaledVector(Zr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function su(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Je{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=of(e,1),n=Rt(n,0,1),i=Rt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=su(o,s,e+1/3),this.g=su(o,s,e),this.b=su(o,s,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,n=zn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=zn){const i=Nv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}copyLinearToSRGB(e){return this.r=Hc(e.r),this.g=Hc(e.g),this.b=Hc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zn){return qe.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Rt(Wt.r*255,0,255))*65536+Math.round(Rt(Wt.g*255,0,255))*256+Math.round(Rt(Wt.b*255,0,255))}getHexString(e=zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=qe.workingColorSpace){return qe.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=zn){qe.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==zn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+n,Ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ni),e.getHSL(Ta);const i=Co(Ni.h,Ta.h,n),r=Co(Ni.s,Ta.s,n),s=Co(Ni.l,Ta.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Je;Je.NAMES=Nv;let Ey=0;class $o extends Ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ey++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=ys,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ph,this.blendDst=gh,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ph&&(i.blendSrc=this.blendSrc),this.blendDst!==gh&&(i.blendDst=this.blendDst),this.blendEquation!==mr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Uv extends $o{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=pv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new O,Ra=new he;class ti{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Xp,this.updateRanges=[],this.gpuType=gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ra.fromBufferAttribute(this,n),Ra.applyMatrix3(e),this.setXY(n,Ra.x,Ra.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix3(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix4(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyNormalMatrix(e),this.setXYZ(n,St.x,St.y,St.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.transformDirection(e),this.setXYZ(n,St.x,St.y,St.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=$r(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Jt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=$r(n,this.array)),n}setX(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=$r(n,this.array)),n}setY(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=$r(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=$r(n,this.array)),n}setW(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array),s=Jt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xp&&(e.usage=this.usage),e}}class Ov extends ti{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Fv extends ti{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class ft extends ti{constructor(e,n,i){super(new Float32Array(e),n,i)}}let wy=0;const In=new ot,ou=new Yt,Jr=new O,fn=new Hs,io=new Hs,Dt=new O;class xn extends Ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wy++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rv(e)?Fv:Ov)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,n,i){return In.makeTranslation(e,n,i),this.applyMatrix4(In),this}scale(e,n,i){return In.makeScale(e,n,i),this.applyMatrix4(In),this}lookAt(e){return ou.lookAt(e),ou.updateMatrix(),this.applyMatrix4(ou.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jr).negate(),this.translate(Jr.x,Jr.y,Jr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ft(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new af);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];io.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(fn.min,io.min),fn.expandByPoint(Dt),Dt.addVectors(fn.max,io.max),fn.expandByPoint(Dt)):(fn.expandByPoint(io.min),fn.expandByPoint(io.max))}fn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Dt.fromBufferAttribute(a,c),l&&(Jr.fromBufferAttribute(e,c),Dt.add(Jr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ti(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<i.count;T++)a[T]=new O,l[T]=new O;const c=new O,h=new O,u=new O,f=new he,p=new he,v=new he,x=new O,g=new O;function d(T,z,_){c.fromBufferAttribute(i,T),h.fromBufferAttribute(i,z),u.fromBufferAttribute(i,_),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,z),v.fromBufferAttribute(s,_),h.sub(c),u.sub(c),p.sub(f),v.sub(f);const y=1/(p.x*v.y-v.x*p.y);isFinite(y)&&(x.copy(h).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(y),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-v.x).multiplyScalar(y),a[T].add(x),a[z].add(x),a[_].add(x),l[T].add(g),l[z].add(g),l[_].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let T=0,z=A.length;T<z;++T){const _=A[T],y=_.start,L=_.count;for(let N=y,G=y+L;N<G;N+=3)d(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const m=new O,C=new O,w=new O,S=new O;function I(T){w.fromBufferAttribute(r,T),S.copy(w);const z=a[T];m.copy(z),m.sub(w.multiplyScalar(w.dot(z))).normalize(),C.crossVectors(S,z);const y=C.dot(l[T])<0?-1:1;o.setXYZW(T,m.x,m.y,m.z,y)}for(let T=0,z=A.length;T<z;++T){const _=A[T],y=_.start,L=_.count;for(let N=y,G=y+L;N<G;N+=3)I(e.getX(N+0)),I(e.getX(N+1)),I(e.getX(N+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ti(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new O,s=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,g),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(h),l.add(h),c.add(h),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Dt.fromBufferAttribute(e,n),Dt.normalize(),e.setXYZ(n,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,v=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let d=0;d<h;d++)f[v++]=c[p++]}return new ti(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new xn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ag=new ot,cr=new Lv,ba=new af,lg=new O,Pa=new O,La=new O,Da=new O,au=new O,Na=new O,cg=new O,Ua=new O;class kt extends Yt{constructor(e=new xn,n=new Uv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Na.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(au.fromBufferAttribute(u,e),o?Na.addScaledVector(au,h):Na.addScaledVector(au.sub(n),h))}n.add(Na)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(s),cr.copy(e.ray).recast(e.near),!(ba.containsPoint(cr.origin)===!1&&(cr.intersectSphere(ba,lg)===null||cr.origin.distanceToSquared(lg)>(e.far-e.near)**2))&&(ag.copy(s).invert(),cr.copy(e.ray).applyMatrix4(ag),!(i.boundingBox!==null&&cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,cr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],A=Math.max(g.start,p.start),m=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let C=A,w=m;C<w;C+=3){const S=a.getX(C),I=a.getX(C+1),T=a.getX(C+2);r=Oa(this,d,e,i,c,h,u,S,I,T),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const A=a.getX(g),m=a.getX(g+1),C=a.getX(g+2);r=Oa(this,o,e,i,c,h,u,A,m,C),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],A=Math.max(g.start,p.start),m=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let C=A,w=m;C<w;C+=3){const S=C,I=C+1,T=C+2;r=Oa(this,d,e,i,c,h,u,S,I,T),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const A=g,m=g+1,C=g+2;r=Oa(this,o,e,i,c,h,u,A,m,C),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Ty(t,e,n,i,r,s,o,a){let l;if(e.side===Xt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Mi,a),l===null)return null;Ua.copy(a),Ua.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Ua);return c<n.near||c>n.far?null:{distance:c,point:Ua.clone(),object:t}}function Oa(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Pa),t.getVertexPosition(l,La),t.getVertexPosition(c,Da);const h=Ty(t,e,n,i,Pa,La,Da,cg);if(h){const u=new O;Vn.getBarycoord(cg,Pa,La,Da,u),r&&(h.uv=Vn.getInterpolatedAttribute(r,a,l,c,u,new he)),s&&(h.uv1=Vn.getInterpolatedAttribute(s,a,l,c,u,new he)),o&&(h.normal=Vn.getInterpolatedAttribute(o,a,l,c,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new O,materialIndex:0};Vn.getNormal(Pa,La,Da,f.normal),h.face=f,h.barycoord=u}return h}class ea extends xn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(u,2));function v(x,g,d,A,m,C,w,S,I,T,z){const _=C/I,y=w/T,L=C/2,N=w/2,G=S/2,Z=I+1,B=T+1;let Q=0,D=0;const J=new O;for(let q=0;q<B;q++){const ie=q*y-N;for(let le=0;le<Z;le++){const ve=le*_-L;J[x]=ve*A,J[g]=ie*m,J[d]=G,c.push(J.x,J.y,J.z),J[x]=0,J[g]=0,J[d]=S>0?1:-1,h.push(J.x,J.y,J.z),u.push(le/I),u.push(1-q/T),Q+=1}}for(let q=0;q<T;q++)for(let ie=0;ie<I;ie++){const le=f+ie+Z*q,ve=f+ie+Z*(q+1),V=f+(ie+1)+Z*(q+1),ne=f+(ie+1)+Z*q;l.push(le,ve,ne),l.push(ve,V,ne),D+=6}a.addGroup(p,D,z),p+=D,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Kt(t){const e={};for(let n=0;n<t.length;n++){const i=zs(t[n]);for(const r in i)e[r]=i[r]}return e}function Ry(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function kv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const by={clone:zs,merge:Kt};var Py=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ly=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends $o{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Py,this.fragmentShader=Ly,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=Ry(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class zv extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new O,ug=new he,hg=new he;class En extends zv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Vo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_o*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(_o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,n){return this.getViewBounds(e,ug,hg),n.subVectors(hg,ug)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_o*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Kr=-90,Qr=1;class Dy extends Yt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(Kr,Qr,e,n);r.layers=this.layers,this.add(r);const s=new En(Kr,Qr,e,n);s.layers=this.layers,this.add(s);const o=new En(Kr,Qr,e,n);o.layers=this.layers,this.add(o);const a=new En(Kr,Qr,e,n);a.layers=this.layers,this.add(a);const l=new En(Kr,Qr,e,n);l.layers=this.layers,this.add(l);const c=new En(Kr,Qr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,h),e.setRenderTarget(u,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Bv extends $t{constructor(e,n,i,r,s,o,a,l,c,h){e=e!==void 0?e:[],n=n!==void 0?n:Ns,super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ny extends br{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Bv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Gn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ea(5,5,5),s=new Ei({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:er});s.uniforms.tEquirect.value=n;const o=new kt(r,s),a=n.minFilter;return n.minFilter===xr&&(n.minFilter=Gn),new Dy(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const lu=new O,Uy=new O,Oy=new je;class ki{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=lu.subVectors(i,n).cross(Uy.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(lu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Oy.getNormalMatrix(e),r=this.coplanarPoint(lu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ur=new af,Fa=new O;class lf{constructor(e=new ki,n=new ki,i=new ki,r=new ki,s=new ki,o=new ki){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=mi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],p=r[8],v=r[9],x=r[10],g=r[11],d=r[12],A=r[13],m=r[14],C=r[15];if(i[0].setComponents(l-s,f-c,g-p,C-d).normalize(),i[1].setComponents(l+s,f+c,g+p,C+d).normalize(),i[2].setComponents(l+o,f+h,g+v,C+A).normalize(),i[3].setComponents(l-o,f-h,g-v,C-A).normalize(),i[4].setComponents(l-a,f-u,g-x,C-m).normalize(),n===mi)i[5].setComponents(l+a,f+u,g+x,C+m).normalize();else if(n===kl)i[5].setComponents(a,u,x,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){return ur.center.set(0,0,0),ur.radius=.7071067811865476,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Fa.x=r.normal.x>0?e.max.x:e.min.x,Fa.y=r.normal.y>0?e.max.y:e.min.y,Fa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Fa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Fy(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(t.bindBuffer(c,a),u.length===0)t.bufferSubData(c,0,h);else{u.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<u.length;p++){const v=u[f],x=u[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,v=u.length;p<v;p++){const x=u[p];t.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class oc extends xn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,f=n/l,p=[],v=[],x=[],g=[];for(let d=0;d<h;d++){const A=d*f-o;for(let m=0;m<c;m++){const C=m*u-s;v.push(C,-A,0),x.push(0,0,1),g.push(m/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){const m=A+c*d,C=A+c*(d+1),w=A+1+c*(d+1),S=A+1+c*d;p.push(m,C,S),p.push(C,w,S)}this.setIndex(p),this.setAttribute("position",new ft(v,3)),this.setAttribute("normal",new ft(x,3)),this.setAttribute("uv",new ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.width,e.height,e.widthSegments,e.heightSegments)}}var ky=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,By=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Yy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ky=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$y=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nI=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iI=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,oI=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,aI=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lI=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cI=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uI=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hI=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dI=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fI=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pI="gl_FragColor = linearToOutputTexel( gl_FragColor );",gI=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,AI=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vI=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_I=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CI=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xI=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yI=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,II=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,MI=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SI=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,EI=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wI=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TI=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,RI=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bI=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,PI=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LI=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,DI=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NI=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,UI=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,OI=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,FI=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kI=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zI=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BI=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,GI=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VI=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HI=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,WI=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jI=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,XI=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,YI=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZI=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,JI=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,KI=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QI=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qI=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$I=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,eM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,oM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,AM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_M=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,CM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,SM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,EM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,PM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,LM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,DM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,OM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const FM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,WM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,XM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,YM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$M=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:ky,alphahash_pars_fragment:zy,alphamap_fragment:By,alphamap_pars_fragment:Gy,alphatest_fragment:Vy,alphatest_pars_fragment:Hy,aomap_fragment:Wy,aomap_pars_fragment:jy,batching_pars_vertex:Xy,batching_vertex:Yy,begin_vertex:Zy,beginnormal_vertex:Jy,bsdfs:Ky,iridescence_fragment:Qy,bumpmap_pars_fragment:qy,clipping_planes_fragment:$y,clipping_planes_pars_fragment:eI,clipping_planes_pars_vertex:tI,clipping_planes_vertex:nI,color_fragment:iI,color_pars_fragment:rI,color_pars_vertex:sI,color_vertex:oI,common:aI,cube_uv_reflection_fragment:lI,defaultnormal_vertex:cI,displacementmap_pars_vertex:uI,displacementmap_vertex:hI,emissivemap_fragment:dI,emissivemap_pars_fragment:fI,colorspace_fragment:pI,colorspace_pars_fragment:gI,envmap_fragment:mI,envmap_common_pars_fragment:AI,envmap_pars_fragment:vI,envmap_pars_vertex:_I,envmap_physical_pars_fragment:bI,envmap_vertex:CI,fog_vertex:xI,fog_pars_vertex:yI,fog_fragment:II,fog_pars_fragment:MI,gradientmap_pars_fragment:SI,lightmap_pars_fragment:EI,lights_lambert_fragment:wI,lights_lambert_pars_fragment:TI,lights_pars_begin:RI,lights_toon_fragment:PI,lights_toon_pars_fragment:LI,lights_phong_fragment:DI,lights_phong_pars_fragment:NI,lights_physical_fragment:UI,lights_physical_pars_fragment:OI,lights_fragment_begin:FI,lights_fragment_maps:kI,lights_fragment_end:zI,logdepthbuf_fragment:BI,logdepthbuf_pars_fragment:GI,logdepthbuf_pars_vertex:VI,logdepthbuf_vertex:HI,map_fragment:WI,map_pars_fragment:jI,map_particle_fragment:XI,map_particle_pars_fragment:YI,metalnessmap_fragment:ZI,metalnessmap_pars_fragment:JI,morphinstance_vertex:KI,morphcolor_vertex:QI,morphnormal_vertex:qI,morphtarget_pars_vertex:$I,morphtarget_vertex:eM,normal_fragment_begin:tM,normal_fragment_maps:nM,normal_pars_fragment:iM,normal_pars_vertex:rM,normal_vertex:sM,normalmap_pars_fragment:oM,clearcoat_normal_fragment_begin:aM,clearcoat_normal_fragment_maps:lM,clearcoat_pars_fragment:cM,iridescence_pars_fragment:uM,opaque_fragment:hM,packing:dM,premultiplied_alpha_fragment:fM,project_vertex:pM,dithering_fragment:gM,dithering_pars_fragment:mM,roughnessmap_fragment:AM,roughnessmap_pars_fragment:vM,shadowmap_pars_fragment:_M,shadowmap_pars_vertex:CM,shadowmap_vertex:xM,shadowmask_pars_fragment:yM,skinbase_vertex:IM,skinning_pars_vertex:MM,skinning_vertex:SM,skinnormal_vertex:EM,specularmap_fragment:wM,specularmap_pars_fragment:TM,tonemapping_fragment:RM,tonemapping_pars_fragment:bM,transmission_fragment:PM,transmission_pars_fragment:LM,uv_pars_fragment:DM,uv_pars_vertex:NM,uv_vertex:UM,worldpos_vertex:OM,background_vert:FM,background_frag:kM,backgroundCube_vert:zM,backgroundCube_frag:BM,cube_vert:GM,cube_frag:VM,depth_vert:HM,depth_frag:WM,distanceRGBA_vert:jM,distanceRGBA_frag:XM,equirect_vert:YM,equirect_frag:ZM,linedashed_vert:JM,linedashed_frag:KM,meshbasic_vert:QM,meshbasic_frag:qM,meshlambert_vert:$M,meshlambert_frag:eS,meshmatcap_vert:tS,meshmatcap_frag:nS,meshnormal_vert:iS,meshnormal_frag:rS,meshphong_vert:sS,meshphong_frag:oS,meshphysical_vert:aS,meshphysical_frag:lS,meshtoon_vert:cS,meshtoon_frag:uS,points_vert:hS,points_frag:dS,shadow_vert:fS,shadow_frag:pS,sprite_vert:gS,sprite_frag:mS},Ie={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Qn={basic:{uniforms:Kt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Kt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Je(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Kt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Kt([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Kt([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Je(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Kt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Kt([Ie.points,Ie.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Kt([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Kt([Ie.common,Ie.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Kt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Kt([Ie.sprite,Ie.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Kt([Ie.common,Ie.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Kt([Ie.lights,Ie.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Qn.physical={uniforms:Kt([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const ka={r:0,b:0,g:0},hr=new ni,AS=new ot;function vS(t,e,n,i,r,s,o){const a=new Je(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function v(A){let m=A.isScene===!0?A.background:null;return m&&m.isTexture&&(m=(A.backgroundBlurriness>0?n:e).get(m)),m}function x(A){let m=!1;const C=v(A);C===null?d(a,l):C&&C.isColor&&(d(C,1),m=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||m)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(A,m){const C=v(m);C&&(C.isCubeTexture||C.mapping===rc)?(h===void 0&&(h=new kt(new ea(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:zs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,S,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),hr.copy(m.backgroundRotation),hr.x*=-1,hr.y*=-1,hr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(AS.makeRotationFromEuler(hr)),h.material.toneMapped=qe.getTransfer(C.colorSpace)!==ut,(u!==C||f!==C.version||p!==t.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,p=t.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new kt(new oc(2,2),new Ei({name:"BackgroundMaterial",uniforms:zs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=qe.getTransfer(C.colorSpace)!==ut,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,p=t.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function d(A,m){A.getRGB(ka,kv(t)),i.buffers.color.setClear(ka.r,ka.g,ka.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(A,m=1){a.set(A),l=m,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,d(a,l)},render:x,addToRenderList:g}}function _S(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(_,y,L,N,G){let Z=!1;const B=u(N,L,y);s!==B&&(s=B,c(s.object)),Z=p(_,N,L,G),Z&&v(_,N,L,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,C(_,y,L,N),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(_){return t.bindVertexArray(_)}function h(_){return t.deleteVertexArray(_)}function u(_,y,L){const N=L.wireframe===!0;let G=i[_.id];G===void 0&&(G={},i[_.id]=G);let Z=G[y.id];Z===void 0&&(Z={},G[y.id]=Z);let B=Z[N];return B===void 0&&(B=f(l()),Z[N]=B),B}function f(_){const y=[],L=[],N=[];for(let G=0;G<n;G++)y[G]=0,L[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:L,attributeDivisors:N,object:_,attributes:{},index:null}}function p(_,y,L,N){const G=s.attributes,Z=y.attributes;let B=0;const Q=L.getAttributes();for(const D in Q)if(Q[D].location>=0){const q=G[D];let ie=Z[D];if(ie===void 0&&(D==="instanceMatrix"&&_.instanceMatrix&&(ie=_.instanceMatrix),D==="instanceColor"&&_.instanceColor&&(ie=_.instanceColor)),q===void 0||q.attribute!==ie||ie&&q.data!==ie.data)return!0;B++}return s.attributesNum!==B||s.index!==N}function v(_,y,L,N){const G={},Z=y.attributes;let B=0;const Q=L.getAttributes();for(const D in Q)if(Q[D].location>=0){let q=Z[D];q===void 0&&(D==="instanceMatrix"&&_.instanceMatrix&&(q=_.instanceMatrix),D==="instanceColor"&&_.instanceColor&&(q=_.instanceColor));const ie={};ie.attribute=q,q&&q.data&&(ie.data=q.data),G[D]=ie,B++}s.attributes=G,s.attributesNum=B,s.index=N}function x(){const _=s.newAttributes;for(let y=0,L=_.length;y<L;y++)_[y]=0}function g(_){d(_,0)}function d(_,y){const L=s.newAttributes,N=s.enabledAttributes,G=s.attributeDivisors;L[_]=1,N[_]===0&&(t.enableVertexAttribArray(_),N[_]=1),G[_]!==y&&(t.vertexAttribDivisor(_,y),G[_]=y)}function A(){const _=s.newAttributes,y=s.enabledAttributes;for(let L=0,N=y.length;L<N;L++)y[L]!==_[L]&&(t.disableVertexAttribArray(L),y[L]=0)}function m(_,y,L,N,G,Z,B){B===!0?t.vertexAttribIPointer(_,y,L,G,Z):t.vertexAttribPointer(_,y,L,N,G,Z)}function C(_,y,L,N){x();const G=N.attributes,Z=L.getAttributes(),B=y.defaultAttributeValues;for(const Q in Z){const D=Z[Q];if(D.location>=0){let J=G[Q];if(J===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(J=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(J=_.instanceColor)),J!==void 0){const q=J.normalized,ie=J.itemSize,le=e.get(J);if(le===void 0)continue;const ve=le.buffer,V=le.type,ne=le.bytesPerElement,oe=V===t.INT||V===t.UNSIGNED_INT||J.gpuType===qd;if(J.isInterleavedBufferAttribute){const ae=J.data,ke=ae.stride,De=J.offset;if(ae.isInstancedInterleavedBuffer){for(let Be=0;Be<D.locationSize;Be++)d(D.location+Be,ae.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Be=0;Be<D.locationSize;Be++)g(D.location+Be);t.bindBuffer(t.ARRAY_BUFFER,ve);for(let Be=0;Be<D.locationSize;Be++)m(D.location+Be,ie/D.locationSize,V,q,ke*ne,(De+ie/D.locationSize*Be)*ne,oe)}else{if(J.isInstancedBufferAttribute){for(let ae=0;ae<D.locationSize;ae++)d(D.location+ae,J.meshPerAttribute);_.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ae=0;ae<D.locationSize;ae++)g(D.location+ae);t.bindBuffer(t.ARRAY_BUFFER,ve);for(let ae=0;ae<D.locationSize;ae++)m(D.location+ae,ie/D.locationSize,V,q,ie*ne,ie/D.locationSize*ae*ne,oe)}}else if(B!==void 0){const q=B[Q];if(q!==void 0)switch(q.length){case 2:t.vertexAttrib2fv(D.location,q);break;case 3:t.vertexAttrib3fv(D.location,q);break;case 4:t.vertexAttrib4fv(D.location,q);break;default:t.vertexAttrib1fv(D.location,q)}}}}A()}function w(){T();for(const _ in i){const y=i[_];for(const L in y){const N=y[L];for(const G in N)h(N[G].object),delete N[G];delete y[L]}delete i[_]}}function S(_){if(i[_.id]===void 0)return;const y=i[_.id];for(const L in y){const N=y[L];for(const G in N)h(N[G].object),delete N[G];delete y[L]}delete i[_.id]}function I(_){for(const y in i){const L=i[y];if(L[_.id]===void 0)continue;const N=L[_.id];for(const G in N)h(N[G].object),delete N[G];delete L[_.id]}}function T(){z(),o=!0,s!==r&&(s=r,c(s.object))}function z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:z,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:g,disableUnusedAttributes:A}}function CS(t,e,n){let i;function r(c){i=c}function s(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,u){u!==0&&(t.drawArraysInstanced(i,c,h,u),n.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v];n.update(p,i,1)}function l(c,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],h[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let v=0;for(let x=0;x<u;x++)v+=h[x];for(let x=0;x<f.length;x++)n.update(v,i,f[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xS(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==Hn&&i.convert(I)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const T=I===qo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Si&&i.convert(I)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==gi&&!T)}function l(I){if(I==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const I=e.get("EXT_clip_control");I.clipControlEXT(I.LOWER_LEFT_EXT,I.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),A=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),m=t.getParameter(t.MAX_VARYING_VECTORS),C=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=v>0,S=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:A,maxVaryings:m,maxFragmentUniforms:C,vertexTextures:w,maxSamples:S}}function yS(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new ki,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||r;return r=f,i=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){n=h(u,f,0)},this.setState=function(u,f,p){const v=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,d=t.get(u);if(!r||v===null||v.length===0||s&&!g)s?h(null):c();else{const A=s?0:i,m=A*4;let C=d.clippingState||null;l.value=C,C=h(v,f,m,p);for(let w=0;w!==m;++w)C[w]=n[w];d.clippingState=C,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,v){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,v!==!0||g===null){const d=p+x*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<d)&&(g=new Float32Array(d));for(let m=0,C=p;m!==x;++m,C+=4)o.copy(u[m]).applyMatrix4(A,a),o.normal.toArray(g,C),g[C+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function IS(t){let e=new WeakMap;function n(o,a){return a===Ih?o.mapping=Ns:a===Mh&&(o.mapping=Us),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ih||a===Mh)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ny(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Vv extends zv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const fs=4,dg=[.125,.215,.35,.446,.526,.582],Ar=20,cu=new Vv,fg=new Je;let uu=null,hu=0,du=0,fu=!1;const gr=(1+Math.sqrt(5))/2,qr=1/gr,pg=[new O(-gr,qr,0),new O(gr,qr,0),new O(-qr,0,gr),new O(qr,0,gr),new O(0,gr,-qr),new O(0,gr,qr),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class gg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){uu=this._renderer.getRenderTarget(),hu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ag(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(uu,hu,du),this._renderer.xr.enabled=fu,e.scissorTest=!1,za(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ns||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uu=this._renderer.getRenderTarget(),hu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:qo,format:Hn,colorSpace:Yn,depthBuffer:!1},r=mg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mg(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MS(s)),this._blurMaterial=SS(s,e,n)}return r}_compileMaterial(e){const n=new kt(this._lodPlanes[0],e);this._renderer.compile(n,cu)}_sceneToCubeUV(e,n,i,r){const a=new En(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(fg),h.toneMapping=_i,h.autoClear=!1;const p=new Uv({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),v=new kt(new ea,p);let x=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,x=!0):(p.color.copy(fg),x=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):A===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const m=this._cubeSize;za(r,A*m,d>2?m:0,m,m),h.setRenderTarget(r),x&&h.render(v,a),h.render(e,a)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ns||e.mapping===Us;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ag());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new kt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;za(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,cu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=pg[(r-s-1)%pg.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new kt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ar-1),x=s/v,g=isFinite(s)?1+Math.floor(h*x):Ar;g>Ar&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ar}`);const d=[];let A=0;for(let I=0;I<Ar;++I){const T=I/x,z=Math.exp(-T*T/2);d.push(z),I===0?A+=z:I<g&&(A+=2*z)}for(let I=0;I<d.length;I++)d[I]=d[I]/A;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:m}=this;f.dTheta.value=v,f.mipInt.value=m-i;const C=this._sizeLods[r],w=3*C*(r>m-fs?r-m+fs:0),S=4*(this._cubeSize-C);za(n,w,S,3*C,2*C),l.setRenderTarget(n),l.render(u,cu)}}function MS(t){const e=[],n=[],i=[];let r=t;const s=t-fs+1+dg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-fs?l=dg[o-t+fs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,v=6,x=3,g=2,d=1,A=new Float32Array(x*v*p),m=new Float32Array(g*v*p),C=new Float32Array(d*v*p);for(let S=0;S<p;S++){const I=S%3*2/3-1,T=S>2?0:-1,z=[I,T,0,I+2/3,T,0,I+2/3,T+1,0,I,T,0,I+2/3,T+1,0,I,T+1,0];A.set(z,x*v*S),m.set(f,g*v*S);const _=[S,S,S,S,S,S];C.set(_,d*v*S)}const w=new xn;w.setAttribute("position",new ti(A,x)),w.setAttribute("uv",new ti(m,g)),w.setAttribute("faceIndex",new ti(C,d)),e.push(w),r>fs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function mg(t,e,n){const i=new br(t,e,n);return i.texture.mapping=rc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function za(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function SS(t,e,n){const i=new Float32Array(Ar),r=new O(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:Ar,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:cf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function Ag(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function vg(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function cf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ES(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ih||l===Mh,h=l===Ns||l===Us;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new gg(t)),u=c?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(n===null&&(n=new gg(t)),u=c?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function wS(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ll("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function TS(t,e,n,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const x=f.morphAttributes[v];for(let g=0,d=x.length;g<d;g++)e.remove(x[g])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(u){const f=u.attributes;for(const v in f)e.update(f[v],t.ARRAY_BUFFER);const p=u.morphAttributes;for(const v in p){const x=p[v];for(let g=0,d=x.length;g<d;g++)e.update(x[g],t.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,v=u.attributes.position;let x=0;if(p!==null){const A=p.array;x=p.version;for(let m=0,C=A.length;m<C;m+=3){const w=A[m+0],S=A[m+1],I=A[m+2];f.push(w,S,S,I,I,w)}}else if(v!==void 0){const A=v.array;x=v.version;for(let m=0,C=A.length/3-1;m<C;m+=3){const w=m+0,S=m+1,I=m+2;f.push(w,S,S,I,I,w)}}else return;const g=new(Rv(f)?Fv:Ov)(f,1);g.version=x;const d=s.get(u);d&&e.remove(d),s.set(u,g)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function RS(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,f*o,v),n.update(p,i,v))}function h(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,v);let g=0;for(let d=0;d<v;d++)g+=p[d];n.update(g,i,1)}function u(f,p,v,x){if(v===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],x[d]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,v);let d=0;for(let A=0;A<v;A++)d+=p[A];for(let A=0;A<x.length;A++)n.update(d,i,x[A])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bS(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function PS(t,e,n){const i=new WeakMap,r=new Ct;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let _=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",_)};var p=_;f!==void 0&&f.texture.dispose();const v=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],m=a.morphAttributes.color||[];let C=0;v===!0&&(C=1),x===!0&&(C=2),g===!0&&(C=3);let w=a.attributes.position.count*C,S=1;w>e.maxTextureSize&&(S=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const I=new Float32Array(w*S*4*u),T=new Pv(I,w,S,u);T.type=gi,T.needsUpdate=!0;const z=C*4;for(let y=0;y<u;y++){const L=d[y],N=A[y],G=m[y],Z=w*S*4*y;for(let B=0;B<L.count;B++){const Q=B*z;v===!0&&(r.fromBufferAttribute(L,B),I[Z+Q+0]=r.x,I[Z+Q+1]=r.y,I[Z+Q+2]=r.z,I[Z+Q+3]=0),x===!0&&(r.fromBufferAttribute(N,B),I[Z+Q+4]=r.x,I[Z+Q+5]=r.y,I[Z+Q+6]=r.z,I[Z+Q+7]=0),g===!0&&(r.fromBufferAttribute(G,B),I[Z+Q+8]=r.x,I[Z+Q+9]=r.y,I[Z+Q+10]=r.z,I[Z+Q+11]=G.itemSize===4?r.w:1)}}f={count:u,texture:T,size:new he(w,S)},i.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const x=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function LS(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Hv extends $t{constructor(e,n,i,r,s,o,a,l,c,h=Is){if(h!==Is&&h!==ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Is&&(i=Rr),i===void 0&&h===ks&&(i=Fs),super(null,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Tn,this.minFilter=l!==void 0?l:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Wv=new $t,_g=new Hv(1,1),jv=new Pv,Xv=new vy,Yv=new Bv,Cg=[],xg=[],yg=new Float32Array(16),Ig=new Float32Array(9),Mg=new Float32Array(4);function Ws(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Cg[r];if(s===void 0&&(s=new Float32Array(r),Cg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Pt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Lt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function ac(t,e){let n=xg[e];n===void 0&&(n=new Int32Array(e),xg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function DS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function NS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2fv(this.addr,e),Lt(n,e)}}function US(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Pt(n,e))return;t.uniform3fv(this.addr,e),Lt(n,e)}}function OS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4fv(this.addr,e),Lt(n,e)}}function FS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Mg.set(i),t.uniformMatrix2fv(this.addr,!1,Mg),Lt(n,i)}}function kS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Ig.set(i),t.uniformMatrix3fv(this.addr,!1,Ig),Lt(n,i)}}function zS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;yg.set(i),t.uniformMatrix4fv(this.addr,!1,yg),Lt(n,i)}}function BS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function GS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2iv(this.addr,e),Lt(n,e)}}function VS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3iv(this.addr,e),Lt(n,e)}}function HS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4iv(this.addr,e),Lt(n,e)}}function WS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function jS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2uiv(this.addr,e),Lt(n,e)}}function XS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3uiv(this.addr,e),Lt(n,e)}}function YS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4uiv(this.addr,e),Lt(n,e)}}function ZS(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(_g.compareFunction=wv,s=_g):s=Wv,n.setTexture2D(e||s,r)}function JS(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Xv,r)}function KS(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Yv,r)}function QS(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||jv,r)}function qS(t){switch(t){case 5126:return DS;case 35664:return NS;case 35665:return US;case 35666:return OS;case 35674:return FS;case 35675:return kS;case 35676:return zS;case 5124:case 35670:return BS;case 35667:case 35671:return GS;case 35668:case 35672:return VS;case 35669:case 35673:return HS;case 5125:return WS;case 36294:return jS;case 36295:return XS;case 36296:return YS;case 35678:case 36198:case 36298:case 36306:case 35682:return ZS;case 35679:case 36299:case 36307:return JS;case 35680:case 36300:case 36308:case 36293:return KS;case 36289:case 36303:case 36311:case 36292:return QS}}function $S(t,e){t.uniform1fv(this.addr,e)}function eE(t,e){const n=Ws(e,this.size,2);t.uniform2fv(this.addr,n)}function tE(t,e){const n=Ws(e,this.size,3);t.uniform3fv(this.addr,n)}function nE(t,e){const n=Ws(e,this.size,4);t.uniform4fv(this.addr,n)}function iE(t,e){const n=Ws(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function rE(t,e){const n=Ws(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function sE(t,e){const n=Ws(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function oE(t,e){t.uniform1iv(this.addr,e)}function aE(t,e){t.uniform2iv(this.addr,e)}function lE(t,e){t.uniform3iv(this.addr,e)}function cE(t,e){t.uniform4iv(this.addr,e)}function uE(t,e){t.uniform1uiv(this.addr,e)}function hE(t,e){t.uniform2uiv(this.addr,e)}function dE(t,e){t.uniform3uiv(this.addr,e)}function fE(t,e){t.uniform4uiv(this.addr,e)}function pE(t,e,n){const i=this.cache,r=e.length,s=ac(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Wv,s[o])}function gE(t,e,n){const i=this.cache,r=e.length,s=ac(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Xv,s[o])}function mE(t,e,n){const i=this.cache,r=e.length,s=ac(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Yv,s[o])}function AE(t,e,n){const i=this.cache,r=e.length,s=ac(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||jv,s[o])}function vE(t){switch(t){case 5126:return $S;case 35664:return eE;case 35665:return tE;case 35666:return nE;case 35674:return iE;case 35675:return rE;case 35676:return sE;case 5124:case 35670:return oE;case 35667:case 35671:return aE;case 35668:case 35672:return lE;case 35669:case 35673:return cE;case 5125:return uE;case 36294:return hE;case 36295:return dE;case 36296:return fE;case 35678:case 36198:case 36298:case 36306:case 35682:return pE;case 35679:case 36299:case 36307:return gE;case 35680:case 36300:case 36308:case 36293:return mE;case 36289:case 36303:case 36311:case 36292:return AE}}class _E{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=qS(n.type)}}class CE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=vE(n.type)}}class xE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const pu=/(\w+)(\])?(\[|\.)?/g;function Sg(t,e){t.seq.push(e),t.map[e.id]=e}function yE(t,e,n){const i=t.name,r=i.length;for(pu.lastIndex=0;;){const s=pu.exec(i),o=pu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Sg(n,c===void 0?new _E(a,t,e):new CE(a,t,e));break}else{let u=n.map[a];u===void 0&&(u=new xE(a),Sg(n,u)),n=u}}}class cl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);yE(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Eg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const IE=37297;let ME=0;function SE(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function EE(t){const e=qe.getPrimaries(qe.workingColorSpace),n=qe.getPrimaries(t);let i;switch(e===n?i="":e===Fl&&n===Ol?i="LinearDisplayP3ToLinearSRGB":e===Ol&&n===Fl&&(i="LinearSRGBToLinearDisplayP3"),t){case Yn:case sc:return[i,"LinearTransferOETF"];case zn:case sf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function wg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+SE(t.getShaderSource(e),o)}else return r}function wE(t,e){const n=EE(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function TE(t,e){let n;switch(e){case Rx:n="Linear";break;case bx:n="Reinhard";break;case Px:n="Cineon";break;case Lx:n="ACESFilmic";break;case Nx:n="AgX";break;case Ux:n="Neutral";break;case Dx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ba=new O;function RE(){qe.getLuminanceCoefficients(Ba);const t=Ba.x.toFixed(4),e=Ba.y.toFixed(4),n=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bE(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function PE(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function LE(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function lo(t){return t!==""}function Tg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const DE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qh(t){return t.replace(DE,UE)}const NE=new Map;function UE(t,e){let n=Xe[e];if(n===void 0){const i=NE.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Qh(n)}const OE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bg(t){return t.replace(OE,FE)}function FE(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Pg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function kE(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===fv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===lx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function zE(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ns:case Us:e="ENVMAP_TYPE_CUBE";break;case rc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function BE(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Us:e="ENVMAP_MODE_REFRACTION";break}return e}function GE(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case pv:e="ENVMAP_BLENDING_MULTIPLY";break;case wx:e="ENVMAP_BLENDING_MIX";break;case Tx:e="ENVMAP_BLENDING_ADD";break}return e}function VE(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function HE(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=kE(n),c=zE(n),h=BE(n),u=GE(n),f=VE(n),p=bE(n),v=PE(s),x=r.createProgram();let g,d,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(lo).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(lo).join(`
`),d.length>0&&(d+=`
`)):(g=[Pg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),d=[Pg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_i?"#define TONE_MAPPING":"",n.toneMapping!==_i?Xe.tonemapping_pars_fragment:"",n.toneMapping!==_i?TE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,wE("linearToOutputTexel",n.outputColorSpace),RE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(lo).join(`
`)),o=Qh(o),o=Tg(o,n),o=Rg(o,n),a=Qh(a),a=Tg(a,n),a=Rg(a,n),o=bg(o),a=bg(a),n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const m=A+g+o,C=A+d+a,w=Eg(r,r.VERTEX_SHADER,m),S=Eg(r,r.FRAGMENT_SHADER,C);r.attachShader(x,w),r.attachShader(x,S),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function I(y){if(t.debug.checkShaderErrors){const L=r.getProgramInfoLog(x).trim(),N=r.getShaderInfoLog(w).trim(),G=r.getShaderInfoLog(S).trim();let Z=!0,B=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Z=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,w,S);else{const Q=wg(r,w,"vertex"),D=wg(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+L+`
`+Q+`
`+D)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(N===""||G==="")&&(B=!1);B&&(y.diagnostics={runnable:Z,programLog:L,vertexShader:{log:N,prefix:g},fragmentShader:{log:G,prefix:d}})}r.deleteShader(w),r.deleteShader(S),T=new cl(r,x),z=LE(r,x)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let z;this.getAttributes=function(){return z===void 0&&I(this),z};let _=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(x,IE)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ME++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=S,this}let WE=0;class jE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new XE(e),n.set(e,i)),i}}class XE{constructor(e){this.id=WE++,this.code=e,this.usedTimes=0}}function YE(t,e,n,i,r,s,o){const a=new Dv,l=new jE,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let v=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function d(_,y,L,N,G){const Z=N.fog,B=G.geometry,Q=_.isMeshStandardMaterial?N.environment:null,D=(_.isMeshStandardMaterial?n:e).get(_.envMap||Q),J=D&&D.mapping===rc?D.image.height:null,q=x[_.type];_.precision!==null&&(v=r.getMaxPrecision(_.precision),v!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",v,"instead."));const ie=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=ie!==void 0?ie.length:0;let ve=0;B.morphAttributes.position!==void 0&&(ve=1),B.morphAttributes.normal!==void 0&&(ve=2),B.morphAttributes.color!==void 0&&(ve=3);let V,ne,oe,ae;if(q){const nn=Qn[q];V=nn.vertexShader,ne=nn.fragmentShader}else V=_.vertexShader,ne=_.fragmentShader,l.update(_),oe=l.getVertexShaderID(_),ae=l.getFragmentShaderID(_);const ke=t.getRenderTarget(),De=G.isInstancedMesh===!0,Be=G.isBatchedMesh===!0,He=!!_.map,re=!!_.matcap,P=!!D,ge=!!_.aoMap,Ae=!!_.lightMap,ue=!!_.bumpMap,_e=!!_.normalMap,Ue=!!_.displacementMap,Se=!!_.emissiveMap,b=!!_.metalnessMap,M=!!_.roughnessMap,W=_.anisotropy>0,ee=_.clearcoat>0,se=_.dispersion>0,te=_.iridescence>0,be=_.sheen>0,Ce=_.transmission>0,we=W&&!!_.anisotropyMap,Ye=ee&&!!_.clearcoatMap,de=ee&&!!_.clearcoatNormalMap,Te=ee&&!!_.clearcoatRoughnessMap,Ge=te&&!!_.iridescenceMap,H=te&&!!_.iridescenceThicknessMap,K=be&&!!_.sheenColorMap,Me=be&&!!_.sheenRoughnessMap,Pe=!!_.specularMap,Ze=!!_.specularColorMap,U=!!_.specularIntensityMap,ye=Ce&&!!_.transmissionMap,Y=Ce&&!!_.thicknessMap,$=!!_.gradientMap,xe=!!_.alphaMap,fe=_.alphaTest>0,ze=!!_.alphaHash,rt=!!_.extensions;let Mt=_i;_.toneMapped&&(ke===null||ke.isXRRenderTarget===!0)&&(Mt=t.toneMapping);const $e={shaderID:q,shaderType:_.type,shaderName:_.name,vertexShader:V,fragmentShader:ne,defines:_.defines,customVertexShaderID:oe,customFragmentShaderID:ae,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:v,batching:Be,batchingColor:Be&&G._colorsTexture!==null,instancing:De,instancingColor:De&&G.instanceColor!==null,instancingMorph:De&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ke===null?t.outputColorSpace:ke.isXRRenderTarget===!0?ke.texture.colorSpace:Yn,alphaToCoverage:!!_.alphaToCoverage,map:He,matcap:re,envMap:P,envMapMode:P&&D.mapping,envMapCubeUVHeight:J,aoMap:ge,lightMap:Ae,bumpMap:ue,normalMap:_e,displacementMap:p&&Ue,emissiveMap:Se,normalMapObjectSpace:_e&&_.normalMapType===zx,normalMapTangentSpace:_e&&_.normalMapType===Ev,metalnessMap:b,roughnessMap:M,anisotropy:W,anisotropyMap:we,clearcoat:ee,clearcoatMap:Ye,clearcoatNormalMap:de,clearcoatRoughnessMap:Te,dispersion:se,iridescence:te,iridescenceMap:Ge,iridescenceThicknessMap:H,sheen:be,sheenColorMap:K,sheenRoughnessMap:Me,specularMap:Pe,specularColorMap:Ze,specularIntensityMap:U,transmission:Ce,transmissionMap:ye,thicknessMap:Y,gradientMap:$,opaque:_.transparent===!1&&_.blending===ys&&_.alphaToCoverage===!1,alphaMap:xe,alphaTest:fe,alphaHash:ze,combine:_.combine,mapUv:He&&g(_.map.channel),aoMapUv:ge&&g(_.aoMap.channel),lightMapUv:Ae&&g(_.lightMap.channel),bumpMapUv:ue&&g(_.bumpMap.channel),normalMapUv:_e&&g(_.normalMap.channel),displacementMapUv:Ue&&g(_.displacementMap.channel),emissiveMapUv:Se&&g(_.emissiveMap.channel),metalnessMapUv:b&&g(_.metalnessMap.channel),roughnessMapUv:M&&g(_.roughnessMap.channel),anisotropyMapUv:we&&g(_.anisotropyMap.channel),clearcoatMapUv:Ye&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:H&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:K&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(_.sheenRoughnessMap.channel),specularMapUv:Pe&&g(_.specularMap.channel),specularColorMapUv:Ze&&g(_.specularColorMap.channel),specularIntensityMapUv:U&&g(_.specularIntensityMap.channel),transmissionMapUv:ye&&g(_.transmissionMap.channel),thicknessMapUv:Y&&g(_.thicknessMap.channel),alphaMapUv:xe&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_e||W),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!B.attributes.uv&&(He||xe),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:G.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:ve,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:Mt,decodeVideoTexture:He&&_.map.isVideoTexture===!0&&qe.getTransfer(_.map.colorSpace)===ut,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===Xt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:rt&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&_.extensions.multiDraw===!0||Be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function A(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)y.push(L),y.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(m(y,_),C(y,_),y.push(t.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function m(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function C(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),_.push(a.mask)}function w(_){const y=x[_.type];let L;if(y){const N=Qn[y];L=by.clone(N.uniforms)}else L=_.uniforms;return L}function S(_,y){let L;for(let N=0,G=h.length;N<G;N++){const Z=h[N];if(Z.cacheKey===y){L=Z,++L.usedTimes;break}}return L===void 0&&(L=new HE(t,y,_,s),h.push(L)),L}function I(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function T(_){l.remove(_)}function z(){l.dispose()}return{getParameters:d,getProgramCacheKey:A,getUniforms:w,acquireProgram:S,releaseProgram:I,releaseShaderCache:T,programs:h,dispose:z}}function ZE(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function JE(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Lg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Dg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(u,f,p,v,x,g){let d=t[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:v,renderOrder:u.renderOrder,z:x,group:g},t[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=v,d.renderOrder=u.renderOrder,d.z=x,d.group=g),e++,d}function a(u,f,p,v,x,g){const d=o(u,f,p,v,x,g);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(u,f,p,v,x,g){const d=o(u,f,p,v,x,g);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(u,f){n.length>1&&n.sort(u||JE),i.length>1&&i.sort(f||Lg),r.length>1&&r.sort(f||Lg)}function h(){for(let u=e,f=t.length;u<f;u++){const p=t[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function KE(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Dg,t.set(i,[o])):r>=s.length?(o=new Dg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function QE(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Je};break;case"SpotLight":n={position:new O,direction:new O,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Je,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":n={color:new Je,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function qE(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let $E=0;function ew(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function tw(t){const e=new QE,n=qE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new ot,o=new ot;function a(c){let h=0,u=0,f=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let p=0,v=0,x=0,g=0,d=0,A=0,m=0,C=0,w=0,S=0,I=0;c.sort(ew);for(let z=0,_=c.length;z<_;z++){const y=c[z],L=y.color,N=y.intensity,G=y.distance,Z=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=L.r*N,u+=L.g*N,f+=L.b*N;else if(y.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(y.sh.coefficients[B],N);I++}else if(y.isDirectionalLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const Q=y.shadow,D=n.get(y);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=Z,i.directionalShadowMatrix[p]=y.shadow.matrix,A++}i.directional[p]=B,p++}else if(y.isSpotLight){const B=e.get(y);B.position.setFromMatrixPosition(y.matrixWorld),B.color.copy(L).multiplyScalar(N),B.distance=G,B.coneCos=Math.cos(y.angle),B.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),B.decay=y.decay,i.spot[x]=B;const Q=y.shadow;if(y.map&&(i.spotLightMap[w]=y.map,w++,Q.updateMatrices(y),y.castShadow&&S++),i.spotLightMatrix[x]=Q.matrix,y.castShadow){const D=n.get(y);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,i.spotShadow[x]=D,i.spotShadowMap[x]=Z,C++}x++}else if(y.isRectAreaLight){const B=e.get(y);B.color.copy(L).multiplyScalar(N),B.halfWidth.set(y.width*.5,0,0),B.halfHeight.set(0,y.height*.5,0),i.rectArea[g]=B,g++}else if(y.isPointLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),B.distance=y.distance,B.decay=y.decay,y.castShadow){const Q=y.shadow,D=n.get(y);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,D.shadowCameraNear=Q.camera.near,D.shadowCameraFar=Q.camera.far,i.pointShadow[v]=D,i.pointShadowMap[v]=Z,i.pointShadowMatrix[v]=y.shadow.matrix,m++}i.point[v]=B,v++}else if(y.isHemisphereLight){const B=e.get(y);B.skyColor.copy(y.color).multiplyScalar(N),B.groundColor.copy(y.groundColor).multiplyScalar(N),i.hemi[d]=B,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ie.LTC_FLOAT_1,i.rectAreaLTC2=Ie.LTC_FLOAT_2):(i.rectAreaLTC1=Ie.LTC_HALF_1,i.rectAreaLTC2=Ie.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const T=i.hash;(T.directionalLength!==p||T.pointLength!==v||T.spotLength!==x||T.rectAreaLength!==g||T.hemiLength!==d||T.numDirectionalShadows!==A||T.numPointShadows!==m||T.numSpotShadows!==C||T.numSpotMaps!==w||T.numLightProbes!==I)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=m,i.pointShadowMap.length=m,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=m,i.spotLightMatrix.length=C+w-S,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=I,T.directionalLength=p,T.pointLength=v,T.spotLength=x,T.rectAreaLength=g,T.hemiLength=d,T.numDirectionalShadows=A,T.numPointShadows=m,T.numSpotShadows=C,T.numSpotMaps=w,T.numLightProbes=I,i.version=$E++)}function l(c,h){let u=0,f=0,p=0,v=0,x=0;const g=h.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){const m=c[d];if(m.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),u++}else if(m.isSpotLight){const C=i.spot[p];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),C.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),p++}else if(m.isRectAreaLight){const C=i.rectArea[v];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),o.identity(),s.copy(m.matrixWorld),s.premultiply(g),o.extractRotation(s),C.halfWidth.set(m.width*.5,0,0),C.halfHeight.set(0,m.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),v++}else if(m.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),f++}else if(m.isHemisphereLight){const C=i.hemi[x];C.direction.setFromMatrixPosition(m.matrixWorld),C.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function Ng(t){const e=new tw(t),n=[],i=[];function r(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function o(h){i.push(h)}function a(){e.setup(n)}function l(h){e.setupView(n,h)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function nw(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Ng(t),e.set(r,[a])):s>=o.length?(a=new Ng(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class iw extends $o{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rw extends $o{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ow=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function aw(t,e,n){let i=new lf;const r=new he,s=new he,o=new Ct,a=new iw({depthPacking:kx}),l=new rw,c={},h=n.maxTextureSize,u={[Mi]:Xt,[Xt]:Mi,[gn]:gn},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:sw,fragmentShader:ow}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new xn;v.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new kt(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fv;let d=this.type;this.render=function(S,I,T){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const z=t.getRenderTarget(),_=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),L=t.state;L.setBlending(er),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const N=d!==ui&&this.type===ui,G=d===ui&&this.type!==ui;for(let Z=0,B=S.length;Z<B;Z++){const Q=S[Z],D=Q.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const J=D.getFrameExtents();if(r.multiply(J),s.copy(D.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,D.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,D.mapSize.y=s.y)),D.map===null||N===!0||G===!0){const ie=this.type!==ui?{minFilter:Tn,magFilter:Tn}:{};D.map!==null&&D.map.dispose(),D.map=new br(r.x,r.y,ie),D.map.texture.name=Q.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const q=D.getViewportCount();for(let ie=0;ie<q;ie++){const le=D.getViewport(ie);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),L.viewport(o),D.updateMatrices(Q,ie),i=D.getFrustum(),C(I,T,D.camera,Q,this.type)}D.isPointLightShadow!==!0&&this.type===ui&&A(D,T),D.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(z,_,y)};function A(S,I){const T=e.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new br(r.x,r.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,t.setRenderTarget(S.mapPass),t.clear(),t.renderBufferDirect(I,null,T,f,x,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,t.setRenderTarget(S.map),t.clear(),t.renderBufferDirect(I,null,T,p,x,null)}function m(S,I,T,z){let _=null;const y=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(y!==void 0)_=y;else if(_=T.isPointLight===!0?l:a,t.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const L=_.uuid,N=I.uuid;let G=c[L];G===void 0&&(G={},c[L]=G);let Z=G[N];Z===void 0&&(Z=_.clone(),G[N]=Z,I.addEventListener("dispose",w)),_=Z}if(_.visible=I.visible,_.wireframe=I.wireframe,z===ui?_.side=I.shadowSide!==null?I.shadowSide:I.side:_.side=I.shadowSide!==null?I.shadowSide:u[I.side],_.alphaMap=I.alphaMap,_.alphaTest=I.alphaTest,_.map=I.map,_.clipShadows=I.clipShadows,_.clippingPlanes=I.clippingPlanes,_.clipIntersection=I.clipIntersection,_.displacementMap=I.displacementMap,_.displacementScale=I.displacementScale,_.displacementBias=I.displacementBias,_.wireframeLinewidth=I.wireframeLinewidth,_.linewidth=I.linewidth,T.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const L=t.properties.get(_);L.light=T}return _}function C(S,I,T,z,_){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&_===ui)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const N=e.update(S),G=S.material;if(Array.isArray(G)){const Z=N.groups;for(let B=0,Q=Z.length;B<Q;B++){const D=Z[B],J=G[D.materialIndex];if(J&&J.visible){const q=m(S,J,z,_);S.onBeforeShadow(t,S,I,T,N,q,D),t.renderBufferDirect(T,null,N,q,S,D),S.onAfterShadow(t,S,I,T,N,q,D)}}}else if(G.visible){const Z=m(S,G,z,_);S.onBeforeShadow(t,S,I,T,N,Z,null),t.renderBufferDirect(T,null,N,Z,S,null),S.onAfterShadow(t,S,I,T,N,Z,null)}}const L=S.children;for(let N=0,G=L.length;N<G;N++)C(L[N],I,T,z,_)}function w(S){S.target.removeEventListener("dispose",w);for(const T in c){const z=c[T],_=S.target.uuid;_ in z&&(z[_].dispose(),delete z[_])}}}const lw={[mh]:Ah,[vh]:xh,[_h]:yh,[Ds]:Ch,[Ah]:mh,[xh]:vh,[yh]:_h,[Ch]:Ds};function cw(t){function e(){let U=!1;const ye=new Ct;let Y=null;const $=new Ct(0,0,0,0);return{setMask:function(xe){Y!==xe&&!U&&(t.colorMask(xe,xe,xe,xe),Y=xe)},setLocked:function(xe){U=xe},setClear:function(xe,fe,ze,rt,Mt){Mt===!0&&(xe*=rt,fe*=rt,ze*=rt),ye.set(xe,fe,ze,rt),$.equals(ye)===!1&&(t.clearColor(xe,fe,ze,rt),$.copy(ye))},reset:function(){U=!1,Y=null,$.set(-1,0,0,0)}}}function n(){let U=!1,ye=!1,Y=null,$=null,xe=null;return{setReversed:function(fe){ye=fe},setTest:function(fe){fe?oe(t.DEPTH_TEST):ae(t.DEPTH_TEST)},setMask:function(fe){Y!==fe&&!U&&(t.depthMask(fe),Y=fe)},setFunc:function(fe){if(ye&&(fe=lw[fe]),$!==fe){switch(fe){case mh:t.depthFunc(t.NEVER);break;case Ah:t.depthFunc(t.ALWAYS);break;case vh:t.depthFunc(t.LESS);break;case Ds:t.depthFunc(t.LEQUAL);break;case _h:t.depthFunc(t.EQUAL);break;case Ch:t.depthFunc(t.GEQUAL);break;case xh:t.depthFunc(t.GREATER);break;case yh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}$=fe}},setLocked:function(fe){U=fe},setClear:function(fe){xe!==fe&&(t.clearDepth(fe),xe=fe)},reset:function(){U=!1,Y=null,$=null,xe=null}}}function i(){let U=!1,ye=null,Y=null,$=null,xe=null,fe=null,ze=null,rt=null,Mt=null;return{setTest:function($e){U||($e?oe(t.STENCIL_TEST):ae(t.STENCIL_TEST))},setMask:function($e){ye!==$e&&!U&&(t.stencilMask($e),ye=$e)},setFunc:function($e,nn,ri){(Y!==$e||$!==nn||xe!==ri)&&(t.stencilFunc($e,nn,ri),Y=$e,$=nn,xe=ri)},setOp:function($e,nn,ri){(fe!==$e||ze!==nn||rt!==ri)&&(t.stencilOp($e,nn,ri),fe=$e,ze=nn,rt=ri)},setLocked:function($e){U=$e},setClear:function($e){Mt!==$e&&(t.clearStencil($e),Mt=$e)},reset:function(){U=!1,ye=null,Y=null,$=null,xe=null,fe=null,ze=null,rt=null,Mt=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],p=null,v=!1,x=null,g=null,d=null,A=null,m=null,C=null,w=null,S=new Je(0,0,0),I=0,T=!1,z=null,_=null,y=null,L=null,N=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,B=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=B>=1):Q.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=B>=2);let D=null,J={};const q=t.getParameter(t.SCISSOR_BOX),ie=t.getParameter(t.VIEWPORT),le=new Ct().fromArray(q),ve=new Ct().fromArray(ie);function V(U,ye,Y,$){const xe=new Uint8Array(4),fe=t.createTexture();t.bindTexture(U,fe),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ze=0;ze<Y;ze++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(ye,0,t.RGBA,1,1,$,0,t.RGBA,t.UNSIGNED_BYTE,xe):t.texImage2D(ye+ze,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,xe);return fe}const ne={};ne[t.TEXTURE_2D]=V(t.TEXTURE_2D,t.TEXTURE_2D,1),ne[t.TEXTURE_CUBE_MAP]=V(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[t.TEXTURE_2D_ARRAY]=V(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ne[t.TEXTURE_3D]=V(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),oe(t.DEPTH_TEST),s.setFunc(Ds),Ae(!1),ue(Gp),oe(t.CULL_FACE),P(er);function oe(U){c[U]!==!0&&(t.enable(U),c[U]=!0)}function ae(U){c[U]!==!1&&(t.disable(U),c[U]=!1)}function ke(U,ye){return h[U]!==ye?(t.bindFramebuffer(U,ye),h[U]=ye,U===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=ye),U===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=ye),!0):!1}function De(U,ye){let Y=f,$=!1;if(U){Y=u.get(ye),Y===void 0&&(Y=[],u.set(ye,Y));const xe=U.textures;if(Y.length!==xe.length||Y[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,ze=xe.length;fe<ze;fe++)Y[fe]=t.COLOR_ATTACHMENT0+fe;Y.length=xe.length,$=!0}}else Y[0]!==t.BACK&&(Y[0]=t.BACK,$=!0);$&&t.drawBuffers(Y)}function Be(U){return p!==U?(t.useProgram(U),p=U,!0):!1}const He={[mr]:t.FUNC_ADD,[ux]:t.FUNC_SUBTRACT,[hx]:t.FUNC_REVERSE_SUBTRACT};He[dx]=t.MIN,He[fx]=t.MAX;const re={[px]:t.ZERO,[gx]:t.ONE,[mx]:t.SRC_COLOR,[ph]:t.SRC_ALPHA,[yx]:t.SRC_ALPHA_SATURATE,[Cx]:t.DST_COLOR,[vx]:t.DST_ALPHA,[Ax]:t.ONE_MINUS_SRC_COLOR,[gh]:t.ONE_MINUS_SRC_ALPHA,[xx]:t.ONE_MINUS_DST_COLOR,[_x]:t.ONE_MINUS_DST_ALPHA,[Ix]:t.CONSTANT_COLOR,[Mx]:t.ONE_MINUS_CONSTANT_COLOR,[Sx]:t.CONSTANT_ALPHA,[Ex]:t.ONE_MINUS_CONSTANT_ALPHA};function P(U,ye,Y,$,xe,fe,ze,rt,Mt,$e){if(U===er){v===!0&&(ae(t.BLEND),v=!1);return}if(v===!1&&(oe(t.BLEND),v=!0),U!==cx){if(U!==x||$e!==T){if((g!==mr||m!==mr)&&(t.blendEquation(t.FUNC_ADD),g=mr,m=mr),$e)switch(U){case ys:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vp:t.blendFunc(t.ONE,t.ONE);break;case Hp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Wp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ys:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Hp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Wp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}d=null,A=null,C=null,w=null,S.set(0,0,0),I=0,x=U,T=$e}return}xe=xe||ye,fe=fe||Y,ze=ze||$,(ye!==g||xe!==m)&&(t.blendEquationSeparate(He[ye],He[xe]),g=ye,m=xe),(Y!==d||$!==A||fe!==C||ze!==w)&&(t.blendFuncSeparate(re[Y],re[$],re[fe],re[ze]),d=Y,A=$,C=fe,w=ze),(rt.equals(S)===!1||Mt!==I)&&(t.blendColor(rt.r,rt.g,rt.b,Mt),S.copy(rt),I=Mt),x=U,T=!1}function ge(U,ye){U.side===gn?ae(t.CULL_FACE):oe(t.CULL_FACE);let Y=U.side===Xt;ye&&(Y=!Y),Ae(Y),U.blending===ys&&U.transparent===!1?P(er):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),r.setMask(U.colorWrite);const $=U.stencilWrite;o.setTest($),$&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ue(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?oe(t.SAMPLE_ALPHA_TO_COVERAGE):ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(U){z!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),z=U)}function ue(U){U!==ox?(oe(t.CULL_FACE),U!==_&&(U===Gp?t.cullFace(t.BACK):U===ax?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ae(t.CULL_FACE),_=U}function _e(U){U!==y&&(Z&&t.lineWidth(U),y=U)}function Ue(U,ye,Y){U?(oe(t.POLYGON_OFFSET_FILL),(L!==ye||N!==Y)&&(t.polygonOffset(ye,Y),L=ye,N=Y)):ae(t.POLYGON_OFFSET_FILL)}function Se(U){U?oe(t.SCISSOR_TEST):ae(t.SCISSOR_TEST)}function b(U){U===void 0&&(U=t.TEXTURE0+G-1),D!==U&&(t.activeTexture(U),D=U)}function M(U,ye,Y){Y===void 0&&(D===null?Y=t.TEXTURE0+G-1:Y=D);let $=J[Y];$===void 0&&($={type:void 0,texture:void 0},J[Y]=$),($.type!==U||$.texture!==ye)&&(D!==Y&&(t.activeTexture(Y),D=Y),t.bindTexture(U,ye||ne[U]),$.type=U,$.texture=ye)}function W(){const U=J[D];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ee(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ye(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ge(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function H(U){le.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),le.copy(U))}function K(U){ve.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),ve.copy(U))}function Me(U,ye){let Y=l.get(ye);Y===void 0&&(Y=new WeakMap,l.set(ye,Y));let $=Y.get(U);$===void 0&&($=t.getUniformBlockIndex(ye,U.name),Y.set(U,$))}function Pe(U,ye){const $=l.get(ye).get(U);a.get(ye)!==$&&(t.uniformBlockBinding(ye,$,U.__bindingPointIndex),a.set(ye,$))}function Ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},D=null,J={},h={},u=new WeakMap,f=[],p=null,v=!1,x=null,g=null,d=null,A=null,m=null,C=null,w=null,S=new Je(0,0,0),I=0,T=!1,z=null,_=null,y=null,L=null,N=null,le.set(0,0,t.canvas.width,t.canvas.height),ve.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:oe,disable:ae,bindFramebuffer:ke,drawBuffers:De,useProgram:Be,setBlending:P,setMaterial:ge,setFlipSided:Ae,setCullFace:ue,setLineWidth:_e,setPolygonOffset:Ue,setScissorTest:Se,activeTexture:b,bindTexture:M,unbindTexture:W,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:Te,texImage3D:Ge,updateUBOMapping:Me,uniformBlockBinding:Pe,texStorage2D:Ye,texStorage3D:de,texSubImage2D:te,texSubImage3D:be,compressedTexSubImage2D:Ce,compressedTexSubImage3D:we,scissor:H,viewport:K,reset:Ze}}function Ug(t,e,n,i){const r=uw(i);switch(n){case _v:return t*e;case xv:return t*e;case yv:return t*e*2;case Iv:return t*e/r.components*r.byteLength;case tf:return t*e/r.components*r.byteLength;case Mv:return t*e*2/r.components*r.byteLength;case nf:return t*e*2/r.components*r.byteLength;case Cv:return t*e*3/r.components*r.byteLength;case Hn:return t*e*4/r.components*r.byteLength;case rf:return t*e*4/r.components*r.byteLength;case il:case rl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case sl:case ol:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Eh:case Th:return Math.max(t,16)*Math.max(e,8)/4;case Sh:case wh:return Math.max(t,8)*Math.max(e,8)/2;case Rh:case bh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Ph:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Lh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Dh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Nh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Uh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Oh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Fh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case kh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case zh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Bh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Gh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Vh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Hh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Wh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case jh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case al:case Xh:case Yh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Sv:case Zh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Jh:case Kh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function uw(t){switch(t){case Si:case mv:return{byteLength:1,components:1};case Go:case Av:case qo:return{byteLength:2,components:1};case $d:case ef:return{byteLength:2,components:4};case Rr:case qd:case gi:return{byteLength:4,components:1};case vv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function hw(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,M){return p?new OffscreenCanvas(b,M):Ho("canvas")}function x(b,M,W){let ee=1;const se=Se(b);if((se.width>W||se.height>W)&&(ee=W/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const te=Math.floor(ee*se.width),be=Math.floor(ee*se.height);u===void 0&&(u=v(te,be));const Ce=M?v(te,be):u;return Ce.width=te,Ce.height=be,Ce.getContext("2d").drawImage(b,0,0,te,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+be+")."),Ce}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function g(b){return b.generateMipmaps&&b.minFilter!==Tn&&b.minFilter!==Gn}function d(b){t.generateMipmap(b)}function A(b,M,W,ee,se=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let te=M;if(M===t.RED&&(W===t.FLOAT&&(te=t.R32F),W===t.HALF_FLOAT&&(te=t.R16F),W===t.UNSIGNED_BYTE&&(te=t.R8)),M===t.RED_INTEGER&&(W===t.UNSIGNED_BYTE&&(te=t.R8UI),W===t.UNSIGNED_SHORT&&(te=t.R16UI),W===t.UNSIGNED_INT&&(te=t.R32UI),W===t.BYTE&&(te=t.R8I),W===t.SHORT&&(te=t.R16I),W===t.INT&&(te=t.R32I)),M===t.RG&&(W===t.FLOAT&&(te=t.RG32F),W===t.HALF_FLOAT&&(te=t.RG16F),W===t.UNSIGNED_BYTE&&(te=t.RG8)),M===t.RG_INTEGER&&(W===t.UNSIGNED_BYTE&&(te=t.RG8UI),W===t.UNSIGNED_SHORT&&(te=t.RG16UI),W===t.UNSIGNED_INT&&(te=t.RG32UI),W===t.BYTE&&(te=t.RG8I),W===t.SHORT&&(te=t.RG16I),W===t.INT&&(te=t.RG32I)),M===t.RGB_INTEGER&&(W===t.UNSIGNED_BYTE&&(te=t.RGB8UI),W===t.UNSIGNED_SHORT&&(te=t.RGB16UI),W===t.UNSIGNED_INT&&(te=t.RGB32UI),W===t.BYTE&&(te=t.RGB8I),W===t.SHORT&&(te=t.RGB16I),W===t.INT&&(te=t.RGB32I)),M===t.RGBA_INTEGER&&(W===t.UNSIGNED_BYTE&&(te=t.RGBA8UI),W===t.UNSIGNED_SHORT&&(te=t.RGBA16UI),W===t.UNSIGNED_INT&&(te=t.RGBA32UI),W===t.BYTE&&(te=t.RGBA8I),W===t.SHORT&&(te=t.RGBA16I),W===t.INT&&(te=t.RGBA32I)),M===t.RGB&&W===t.UNSIGNED_INT_5_9_9_9_REV&&(te=t.RGB9_E5),M===t.RGBA){const be=se?Ul:qe.getTransfer(ee);W===t.FLOAT&&(te=t.RGBA32F),W===t.HALF_FLOAT&&(te=t.RGBA16F),W===t.UNSIGNED_BYTE&&(te=be===ut?t.SRGB8_ALPHA8:t.RGBA8),W===t.UNSIGNED_SHORT_4_4_4_4&&(te=t.RGBA4),W===t.UNSIGNED_SHORT_5_5_5_1&&(te=t.RGB5_A1)}return(te===t.R16F||te===t.R32F||te===t.RG16F||te===t.RG32F||te===t.RGBA16F||te===t.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function m(b,M){let W;return b?M===null||M===Rr||M===Fs?W=t.DEPTH24_STENCIL8:M===gi?W=t.DEPTH32F_STENCIL8:M===Go&&(W=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Rr||M===Fs?W=t.DEPTH_COMPONENT24:M===gi?W=t.DEPTH_COMPONENT32F:M===Go&&(W=t.DEPTH_COMPONENT16),W}function C(b,M){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==Tn&&b.minFilter!==Gn?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function w(b){const M=b.target;M.removeEventListener("dispose",w),I(M),M.isVideoTexture&&h.delete(M)}function S(b){const M=b.target;M.removeEventListener("dispose",S),z(M)}function I(b){const M=i.get(b);if(M.__webglInit===void 0)return;const W=b.source,ee=f.get(W);if(ee){const se=ee[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&T(b),Object.keys(ee).length===0&&f.delete(W)}i.remove(b)}function T(b){const M=i.get(b);t.deleteTexture(M.__webglTexture);const W=b.source,ee=f.get(W);delete ee[M.__cacheKey],o.memory.textures--}function z(b){const M=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(M.__webglFramebuffer[ee]))for(let se=0;se<M.__webglFramebuffer[ee].length;se++)t.deleteFramebuffer(M.__webglFramebuffer[ee][se]);else t.deleteFramebuffer(M.__webglFramebuffer[ee]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[ee])}else{if(Array.isArray(M.__webglFramebuffer))for(let ee=0;ee<M.__webglFramebuffer.length;ee++)t.deleteFramebuffer(M.__webglFramebuffer[ee]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ee=0;ee<M.__webglColorRenderbuffer.length;ee++)M.__webglColorRenderbuffer[ee]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[ee]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const W=b.textures;for(let ee=0,se=W.length;ee<se;ee++){const te=i.get(W[ee]);te.__webglTexture&&(t.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(W[ee])}i.remove(b)}let _=0;function y(){_=0}function L(){const b=_;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),_+=1,b}function N(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function G(b,M){const W=i.get(b);if(b.isVideoTexture&&_e(b),b.isRenderTargetTexture===!1&&b.version>0&&W.__version!==b.version){const ee=b.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(W,b,M);return}}n.bindTexture(t.TEXTURE_2D,W.__webglTexture,t.TEXTURE0+M)}function Z(b,M){const W=i.get(b);if(b.version>0&&W.__version!==b.version){ve(W,b,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,W.__webglTexture,t.TEXTURE0+M)}function B(b,M){const W=i.get(b);if(b.version>0&&W.__version!==b.version){ve(W,b,M);return}n.bindTexture(t.TEXTURE_3D,W.__webglTexture,t.TEXTURE0+M)}function Q(b,M){const W=i.get(b);if(b.version>0&&W.__version!==b.version){V(W,b,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,W.__webglTexture,t.TEXTURE0+M)}const D={[Os]:t.REPEAT,[Wi]:t.CLAMP_TO_EDGE,[Nl]:t.MIRRORED_REPEAT},J={[Tn]:t.NEAREST,[Ox]:t.NEAREST_MIPMAP_NEAREST,[Ca]:t.NEAREST_MIPMAP_LINEAR,[Gn]:t.LINEAR,[Gc]:t.LINEAR_MIPMAP_NEAREST,[xr]:t.LINEAR_MIPMAP_LINEAR},q={[Bx]:t.NEVER,[Xx]:t.ALWAYS,[Gx]:t.LESS,[wv]:t.LEQUAL,[Vx]:t.EQUAL,[jx]:t.GEQUAL,[Hx]:t.GREATER,[Wx]:t.NOTEQUAL};function ie(b,M){if(M.type===gi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Gn||M.magFilter===Gc||M.magFilter===Ca||M.magFilter===xr||M.minFilter===Gn||M.minFilter===Gc||M.minFilter===Ca||M.minFilter===xr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,D[M.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,D[M.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,D[M.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,J[M.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,J[M.minFilter]),M.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,q[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Tn||M.minFilter!==Ca&&M.minFilter!==xr||M.type===gi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function le(b,M){let W=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",w));const ee=M.source;let se=f.get(ee);se===void 0&&(se={},f.set(ee,se));const te=N(M);if(te!==b.__cacheKey){se[te]===void 0&&(se[te]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,W=!0),se[te].usedTimes++;const be=se[b.__cacheKey];be!==void 0&&(se[b.__cacheKey].usedTimes--,be.usedTimes===0&&T(M)),b.__cacheKey=te,b.__webglTexture=se[te].texture}return W}function ve(b,M,W){let ee=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ee=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ee=t.TEXTURE_3D);const se=le(b,M),te=M.source;n.bindTexture(ee,b.__webglTexture,t.TEXTURE0+W);const be=i.get(te);if(te.version!==be.__version||se===!0){n.activeTexture(t.TEXTURE0+W);const Ce=qe.getPrimaries(qe.workingColorSpace),we=M.colorSpace===Gi?null:qe.getPrimaries(M.colorSpace),Ye=M.colorSpace===Gi||Ce===we?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let de=x(M.image,!1,r.maxTextureSize);de=Ue(M,de);const Te=s.convert(M.format,M.colorSpace),Ge=s.convert(M.type);let H=A(M.internalFormat,Te,Ge,M.colorSpace,M.isVideoTexture);ie(ee,M);let K;const Me=M.mipmaps,Pe=M.isVideoTexture!==!0,Ze=be.__version===void 0||se===!0,U=te.dataReady,ye=C(M,de);if(M.isDepthTexture)H=m(M.format===ks,M.type),Ze&&(Pe?n.texStorage2D(t.TEXTURE_2D,1,H,de.width,de.height):n.texImage2D(t.TEXTURE_2D,0,H,de.width,de.height,0,Te,Ge,null));else if(M.isDataTexture)if(Me.length>0){Pe&&Ze&&n.texStorage2D(t.TEXTURE_2D,ye,H,Me[0].width,Me[0].height);for(let Y=0,$=Me.length;Y<$;Y++)K=Me[Y],Pe?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,K.width,K.height,Te,Ge,K.data):n.texImage2D(t.TEXTURE_2D,Y,H,K.width,K.height,0,Te,Ge,K.data);M.generateMipmaps=!1}else Pe?(Ze&&n.texStorage2D(t.TEXTURE_2D,ye,H,de.width,de.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,de.width,de.height,Te,Ge,de.data)):n.texImage2D(t.TEXTURE_2D,0,H,de.width,de.height,0,Te,Ge,de.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Pe&&Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ye,H,Me[0].width,Me[0].height,de.depth);for(let Y=0,$=Me.length;Y<$;Y++)if(K=Me[Y],M.format!==Hn)if(Te!==null)if(Pe){if(U)if(M.layerUpdates.size>0){const xe=Ug(K.width,K.height,M.format,M.type);for(const fe of M.layerUpdates){const ze=K.data.subarray(fe*xe/K.data.BYTES_PER_ELEMENT,(fe+1)*xe/K.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,fe,K.width,K.height,1,Te,ze,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,K.width,K.height,de.depth,Te,K.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,H,K.width,K.height,de.depth,0,K.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,K.width,K.height,de.depth,Te,Ge,K.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,H,K.width,K.height,de.depth,0,Te,Ge,K.data)}else{Pe&&Ze&&n.texStorage2D(t.TEXTURE_2D,ye,H,Me[0].width,Me[0].height);for(let Y=0,$=Me.length;Y<$;Y++)K=Me[Y],M.format!==Hn?Te!==null?Pe?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,K.width,K.height,Te,K.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,H,K.width,K.height,0,K.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,K.width,K.height,Te,Ge,K.data):n.texImage2D(t.TEXTURE_2D,Y,H,K.width,K.height,0,Te,Ge,K.data)}else if(M.isDataArrayTexture)if(Pe){if(Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ye,H,de.width,de.height,de.depth),U)if(M.layerUpdates.size>0){const Y=Ug(de.width,de.height,M.format,M.type);for(const $ of M.layerUpdates){const xe=de.data.subarray($*Y/de.data.BYTES_PER_ELEMENT,($+1)*Y/de.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,$,de.width,de.height,1,Te,Ge,xe)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Te,Ge,de.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,H,de.width,de.height,de.depth,0,Te,Ge,de.data);else if(M.isData3DTexture)Pe?(Ze&&n.texStorage3D(t.TEXTURE_3D,ye,H,de.width,de.height,de.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Te,Ge,de.data)):n.texImage3D(t.TEXTURE_3D,0,H,de.width,de.height,de.depth,0,Te,Ge,de.data);else if(M.isFramebufferTexture){if(Ze)if(Pe)n.texStorage2D(t.TEXTURE_2D,ye,H,de.width,de.height);else{let Y=de.width,$=de.height;for(let xe=0;xe<ye;xe++)n.texImage2D(t.TEXTURE_2D,xe,H,Y,$,0,Te,Ge,null),Y>>=1,$>>=1}}else if(Me.length>0){if(Pe&&Ze){const Y=Se(Me[0]);n.texStorage2D(t.TEXTURE_2D,ye,H,Y.width,Y.height)}for(let Y=0,$=Me.length;Y<$;Y++)K=Me[Y],Pe?U&&n.texSubImage2D(t.TEXTURE_2D,Y,0,0,Te,Ge,K):n.texImage2D(t.TEXTURE_2D,Y,H,Te,Ge,K);M.generateMipmaps=!1}else if(Pe){if(Ze){const Y=Se(de);n.texStorage2D(t.TEXTURE_2D,ye,H,Y.width,Y.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Te,Ge,de)}else n.texImage2D(t.TEXTURE_2D,0,H,Te,Ge,de);g(M)&&d(ee),be.__version=te.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function V(b,M,W){if(M.image.length!==6)return;const ee=le(b,M),se=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+W);const te=i.get(se);if(se.version!==te.__version||ee===!0){n.activeTexture(t.TEXTURE0+W);const be=qe.getPrimaries(qe.workingColorSpace),Ce=M.colorSpace===Gi?null:qe.getPrimaries(M.colorSpace),we=M.colorSpace===Gi||be===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Ye=M.isCompressedTexture||M.image[0].isCompressedTexture,de=M.image[0]&&M.image[0].isDataTexture,Te=[];for(let $=0;$<6;$++)!Ye&&!de?Te[$]=x(M.image[$],!0,r.maxCubemapSize):Te[$]=de?M.image[$].image:M.image[$],Te[$]=Ue(M,Te[$]);const Ge=Te[0],H=s.convert(M.format,M.colorSpace),K=s.convert(M.type),Me=A(M.internalFormat,H,K,M.colorSpace),Pe=M.isVideoTexture!==!0,Ze=te.__version===void 0||ee===!0,U=se.dataReady;let ye=C(M,Ge);ie(t.TEXTURE_CUBE_MAP,M);let Y;if(Ye){Pe&&Ze&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Me,Ge.width,Ge.height);for(let $=0;$<6;$++){Y=Te[$].mipmaps;for(let xe=0;xe<Y.length;xe++){const fe=Y[xe];M.format!==Hn?H!==null?Pe?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe,0,0,fe.width,fe.height,H,fe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe,0,0,fe.width,fe.height,H,K,fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe,Me,fe.width,fe.height,0,H,K,fe.data)}}}else{if(Y=M.mipmaps,Pe&&Ze){Y.length>0&&ye++;const $=Se(Te[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Me,$.width,$.height)}for(let $=0;$<6;$++)if(de){Pe?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Te[$].width,Te[$].height,H,K,Te[$].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Me,Te[$].width,Te[$].height,0,H,K,Te[$].data);for(let xe=0;xe<Y.length;xe++){const ze=Y[xe].image[$].image;Pe?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe+1,0,0,ze.width,ze.height,H,K,ze.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe+1,Me,ze.width,ze.height,0,H,K,ze.data)}}else{Pe?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,H,K,Te[$]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Me,H,K,Te[$]);for(let xe=0;xe<Y.length;xe++){const fe=Y[xe];Pe?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe+1,0,0,H,K,fe.image[$]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+$,xe+1,Me,H,K,fe.image[$])}}}g(M)&&d(t.TEXTURE_CUBE_MAP),te.__version=se.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function ne(b,M,W,ee,se,te){const be=s.convert(W.format,W.colorSpace),Ce=s.convert(W.type),we=A(W.internalFormat,be,Ce,W.colorSpace);if(!i.get(M).__hasExternalTextures){const de=Math.max(1,M.width>>te),Te=Math.max(1,M.height>>te);se===t.TEXTURE_3D||se===t.TEXTURE_2D_ARRAY?n.texImage3D(se,te,we,de,Te,M.depth,0,be,Ce,null):n.texImage2D(se,te,we,de,Te,0,be,Ce,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),ue(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,se,i.get(W).__webglTexture,0,Ae(M)):(se===t.TEXTURE_2D||se>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ee,se,i.get(W).__webglTexture,te),n.bindFramebuffer(t.FRAMEBUFFER,null)}function oe(b,M,W){if(t.bindRenderbuffer(t.RENDERBUFFER,b),M.depthBuffer){const ee=M.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,te=m(M.stencilBuffer,se),be=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ce=Ae(M);ue(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ce,te,M.width,M.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ce,te,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,te,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,be,t.RENDERBUFFER,b)}else{const ee=M.textures;for(let se=0;se<ee.length;se++){const te=ee[se],be=s.convert(te.format,te.colorSpace),Ce=s.convert(te.type),we=A(te.internalFormat,be,Ce,te.colorSpace),Ye=Ae(M);W&&ue(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ye,we,M.width,M.height):ue(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ye,we,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,we,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ae(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),G(M.depthTexture,0);const ee=i.get(M.depthTexture).__webglTexture,se=Ae(M);if(M.depthTexture.format===Is)ue(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(M.depthTexture.format===ks)ue(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ke(b){const M=i.get(b),W=b.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==b.depthTexture){const ee=b.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ee){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=ee}if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,b)}else if(W){M.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ee]),M.__webglDepthbuffer[ee]===void 0)M.__webglDepthbuffer[ee]=t.createRenderbuffer(),oe(M.__webglDepthbuffer[ee],b,!1);else{const se=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,te=M.__webglDepthbuffer[ee];t.bindRenderbuffer(t.RENDERBUFFER,te),t.framebufferRenderbuffer(t.FRAMEBUFFER,se,t.RENDERBUFFER,te)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),oe(M.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,se),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,se)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function De(b,M,W){const ee=i.get(b);M!==void 0&&ne(ee.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),W!==void 0&&ke(b)}function Be(b){const M=b.texture,W=i.get(b),ee=i.get(M);b.addEventListener("dispose",S);const se=b.textures,te=b.isWebGLCubeRenderTarget===!0,be=se.length>1;if(be||(ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture()),ee.__version=M.version,o.memory.textures++),te){W.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer[Ce]=[];for(let we=0;we<M.mipmaps.length;we++)W.__webglFramebuffer[Ce][we]=t.createFramebuffer()}else W.__webglFramebuffer[Ce]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer=[];for(let Ce=0;Ce<M.mipmaps.length;Ce++)W.__webglFramebuffer[Ce]=t.createFramebuffer()}else W.__webglFramebuffer=t.createFramebuffer();if(be)for(let Ce=0,we=se.length;Ce<we;Ce++){const Ye=i.get(se[Ce]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=t.createTexture(),o.memory.textures++)}if(b.samples>0&&ue(b)===!1){W.__webglMultisampledFramebuffer=t.createFramebuffer(),W.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Ce=0;Ce<se.length;Ce++){const we=se[Ce];W.__webglColorRenderbuffer[Ce]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,W.__webglColorRenderbuffer[Ce]);const Ye=s.convert(we.format,we.colorSpace),de=s.convert(we.type),Te=A(we.internalFormat,Ye,de,we.colorSpace,b.isXRRenderTarget===!0),Ge=Ae(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge,Te,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,W.__webglColorRenderbuffer[Ce])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(W.__webglDepthRenderbuffer=t.createRenderbuffer(),oe(W.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(te){n.bindTexture(t.TEXTURE_CUBE_MAP,ee.__webglTexture),ie(t.TEXTURE_CUBE_MAP,M);for(let Ce=0;Ce<6;Ce++)if(M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)ne(W.__webglFramebuffer[Ce][we],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,we);else ne(W.__webglFramebuffer[Ce],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);g(M)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(be){for(let Ce=0,we=se.length;Ce<we;Ce++){const Ye=se[Ce],de=i.get(Ye);n.bindTexture(t.TEXTURE_2D,de.__webglTexture),ie(t.TEXTURE_2D,Ye),ne(W.__webglFramebuffer,b,Ye,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,0),g(Ye)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let Ce=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ce=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Ce,ee.__webglTexture),ie(Ce,M),M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)ne(W.__webglFramebuffer[we],b,M,t.COLOR_ATTACHMENT0,Ce,we);else ne(W.__webglFramebuffer,b,M,t.COLOR_ATTACHMENT0,Ce,0);g(M)&&d(Ce),n.unbindTexture()}b.depthBuffer&&ke(b)}function He(b){const M=b.textures;for(let W=0,ee=M.length;W<ee;W++){const se=M[W];if(g(se)){const te=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,be=i.get(se).__webglTexture;n.bindTexture(te,be),d(te),n.unbindTexture()}}}const re=[],P=[];function ge(b){if(b.samples>0){if(ue(b)===!1){const M=b.textures,W=b.width,ee=b.height;let se=t.COLOR_BUFFER_BIT;const te=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,be=i.get(b),Ce=M.length>1;if(Ce)for(let we=0;we<M.length;we++)n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+we,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+we,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let we=0;we<M.length;we++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=t.STENCIL_BUFFER_BIT)),Ce){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,be.__webglColorRenderbuffer[we]);const Ye=i.get(M[we]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ye,0)}t.blitFramebuffer(0,0,W,ee,0,0,W,ee,se,t.NEAREST),l===!0&&(re.length=0,P.length=0,re.push(t.COLOR_ATTACHMENT0+we),b.depthBuffer&&b.resolveDepthBuffer===!1&&(re.push(te),P.push(te),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,P)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,re))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Ce)for(let we=0;we<M.length;we++){n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+we,t.RENDERBUFFER,be.__webglColorRenderbuffer[we]);const Ye=i.get(M[we]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+we,t.TEXTURE_2D,Ye,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const M=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Ae(b){return Math.min(r.maxSamples,b.samples)}function ue(b){const M=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function _e(b){const M=o.render.frame;h.get(b)!==M&&(h.set(b,M),b.update())}function Ue(b,M){const W=b.colorSpace,ee=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||W!==Yn&&W!==Gi&&(qe.getTransfer(W)===ut?(ee!==Hn||se!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),M}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=Z,this.setTexture3D=B,this.setTextureCube=Q,this.rebindTextures=De,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=ue}function dw(t,e){function n(i,r=Gi){let s;const o=qe.getTransfer(r);if(i===Si)return t.UNSIGNED_BYTE;if(i===$d)return t.UNSIGNED_SHORT_4_4_4_4;if(i===ef)return t.UNSIGNED_SHORT_5_5_5_1;if(i===vv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===mv)return t.BYTE;if(i===Av)return t.SHORT;if(i===Go)return t.UNSIGNED_SHORT;if(i===qd)return t.INT;if(i===Rr)return t.UNSIGNED_INT;if(i===gi)return t.FLOAT;if(i===qo)return t.HALF_FLOAT;if(i===_v)return t.ALPHA;if(i===Cv)return t.RGB;if(i===Hn)return t.RGBA;if(i===xv)return t.LUMINANCE;if(i===yv)return t.LUMINANCE_ALPHA;if(i===Is)return t.DEPTH_COMPONENT;if(i===ks)return t.DEPTH_STENCIL;if(i===Iv)return t.RED;if(i===tf)return t.RED_INTEGER;if(i===Mv)return t.RG;if(i===nf)return t.RG_INTEGER;if(i===rf)return t.RGBA_INTEGER;if(i===il||i===rl||i===sl||i===ol)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===il)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===il)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sh||i===Eh||i===wh||i===Th)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Sh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Eh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Th)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rh||i===bh||i===Ph)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Rh||i===bh)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ph)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Lh||i===Dh||i===Nh||i===Uh||i===Oh||i===Fh||i===kh||i===zh||i===Bh||i===Gh||i===Vh||i===Hh||i===Wh||i===jh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Lh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Uh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jh)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===al||i===Xh||i===Yh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===al)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sv||i===Zh||i===Jh||i===Kh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===al)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Zh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class fw extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ai extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pw={type:"move"};class gu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),d=this._getHandJoint(c,x);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const gw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Aw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new $t,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ei({vertexShader:gw,fragmentShader:mw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new kt(new oc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vw extends Ur{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,v=null;const x=new Aw,g=n.getContextAttributes();let d=null,A=null;const m=[],C=[],w=new he;let S=null;const I=new En;I.layers.enable(1),I.viewport=new Ct;const T=new En;T.layers.enable(2),T.viewport=new Ct;const z=[I,T],_=new fw;_.layers.enable(1),_.layers.enable(2);let y=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ne=m[V];return ne===void 0&&(ne=new gu,m[V]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(V){let ne=m[V];return ne===void 0&&(ne=new gu,m[V]=ne),ne.getGripSpace()},this.getHand=function(V){let ne=m[V];return ne===void 0&&(ne=new gu,m[V]=ne),ne.getHandSpace()};function N(V){const ne=C.indexOf(V.inputSource);if(ne===-1)return;const oe=m[ne];oe!==void 0&&(oe.update(V.inputSource,V.frame,c||o),oe.dispatchEvent({type:V.type,data:V.inputSource}))}function G(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Z);for(let V=0;V<m.length;V++){const ne=C[V];ne!==null&&(C[V]=null,m[V].disconnect(ne))}y=null,L=null,x.reset(),e.setRenderTarget(d),p=null,f=null,u=null,r=null,A=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await n.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){const ne={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new br(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ne=null,oe=null,ae=null;g.depth&&(ae=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ne=g.stencil?ks:Is,oe=g.stencil?Fs:Rr);const ke={colorFormat:n.RGBA8,depthFormat:ae,scaleFactor:s};u=new XRWebGLBinding(r,n),f=u.createProjectionLayer(ke),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new br(f.textureWidth,f.textureHeight,{format:Hn,type:Si,depthTexture:new Hv(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ve.setContext(r),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Z(V){for(let ne=0;ne<V.removed.length;ne++){const oe=V.removed[ne],ae=C.indexOf(oe);ae>=0&&(C[ae]=null,m[ae].disconnect(oe))}for(let ne=0;ne<V.added.length;ne++){const oe=V.added[ne];let ae=C.indexOf(oe);if(ae===-1){for(let De=0;De<m.length;De++)if(De>=C.length){C.push(oe),ae=De;break}else if(C[De]===null){C[De]=oe,ae=De;break}if(ae===-1)break}const ke=m[ae];ke&&ke.connect(oe)}}const B=new O,Q=new O;function D(V,ne,oe){B.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(oe.matrixWorld);const ae=B.distanceTo(Q),ke=ne.projectionMatrix.elements,De=oe.projectionMatrix.elements,Be=ke[14]/(ke[10]-1),He=ke[14]/(ke[10]+1),re=(ke[9]+1)/ke[5],P=(ke[9]-1)/ke[5],ge=(ke[8]-1)/ke[0],Ae=(De[8]+1)/De[0],ue=Be*ge,_e=Be*Ae,Ue=ae/(-ge+Ae),Se=Ue*-ge;if(ne.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Se),V.translateZ(Ue),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ke[10]===-1)V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const b=Be+Ue,M=He+Ue,W=ue-Se,ee=_e+(ae-Se),se=re*He/M*b,te=P*He/M*b;V.projectionMatrix.makePerspective(W,ee,se,te,b,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function J(V,ne){ne===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ne.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let ne=V.near,oe=V.far;x.texture!==null&&(x.depthNear>0&&(ne=x.depthNear),x.depthFar>0&&(oe=x.depthFar)),_.near=T.near=I.near=ne,_.far=T.far=I.far=oe,(y!==_.near||L!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,L=_.far);const ae=V.parent,ke=_.cameras;J(_,ae);for(let De=0;De<ke.length;De++)J(ke[De],ae);ke.length===2?D(_,I,T):_.projectionMatrix.copy(I.projectionMatrix),q(V,_,ae)};function q(V,ne,oe){oe===null?V.matrix.copy(ne.matrixWorld):(V.matrix.copy(oe.matrixWorld),V.matrix.invert(),V.matrix.multiply(ne.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Vo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let ie=null;function le(V,ne){if(h=ne.getViewerPose(c||o),v=ne,h!==null){const oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let ae=!1;oe.length!==_.cameras.length&&(_.cameras.length=0,ae=!0);for(let De=0;De<oe.length;De++){const Be=oe[De];let He=null;if(p!==null)He=p.getViewport(Be);else{const P=u.getViewSubImage(f,Be);He=P.viewport,De===0&&(e.setRenderTargetTextures(A,P.colorTexture,f.ignoreDepthValues?void 0:P.depthStencilTexture),e.setRenderTarget(A))}let re=z[De];re===void 0&&(re=new En,re.layers.enable(De),re.viewport=new Ct,z[De]=re),re.matrix.fromArray(Be.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(Be.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(He.x,He.y,He.width,He.height),De===0&&(_.matrix.copy(re.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ae===!0&&_.cameras.push(re)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")){const De=u.getDepthInformation(oe[0]);De&&De.isValid&&De.texture&&x.init(e,De,r.renderState)}}for(let oe=0;oe<m.length;oe++){const ae=C[oe],ke=m[oe];ae!==null&&ke!==void 0&&ke.update(ae,ne,c||o)}ie&&ie(V,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),v=null}const ve=new Gv;ve.setAnimationLoop(le),this.setAnimationLoop=function(V){ie=V},this.dispose=function(){}}}const dr=new ni,_w=new ot;function Cw(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,kv(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,A,m,C){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),u(g,d)):d.isMeshPhongMaterial?(s(g,d),h(g,d)):d.isMeshStandardMaterial?(s(g,d),f(g,d),d.isMeshPhysicalMaterial&&p(g,d,C)):d.isMeshMatcapMaterial?(s(g,d),v(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),x(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,A,m):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Xt&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Xt&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const A=e.get(d),m=A.envMap,C=A.envMapRotation;m&&(g.envMap.value=m,dr.copy(C),dr.x*=-1,dr.y*=-1,dr.z*=-1,m.isCubeTexture&&m.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),g.envMapRotation.value.setFromMatrix4(_w.makeRotationFromEuler(dr)),g.flipEnvMap.value=m.isCubeTexture&&m.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,A,m){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*A,g.scale.value=m*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function h(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function u(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function f(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,A){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Xt&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,d){d.matcap&&(g.matcap.value=d.matcap)}function x(g,d){const A=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function xw(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,m){const C=m.program;i.uniformBlockBinding(A,C)}function c(A,m){let C=r[A.id];C===void 0&&(v(A),C=h(A),r[A.id]=C,A.addEventListener("dispose",g));const w=m.program;i.updateUBOMapping(A,w);const S=e.render.frame;s[A.id]!==S&&(f(A),s[A.id]=S)}function h(A){const m=u();A.__bindingPointIndex=m;const C=t.createBuffer(),w=A.__size,S=A.usage;return t.bindBuffer(t.UNIFORM_BUFFER,C),t.bufferData(t.UNIFORM_BUFFER,w,S),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,m,C),C}function u(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const m=r[A.id],C=A.uniforms,w=A.__cache;t.bindBuffer(t.UNIFORM_BUFFER,m);for(let S=0,I=C.length;S<I;S++){const T=Array.isArray(C[S])?C[S]:[C[S]];for(let z=0,_=T.length;z<_;z++){const y=T[z];if(p(y,S,z,w)===!0){const L=y.__offset,N=Array.isArray(y.value)?y.value:[y.value];let G=0;for(let Z=0;Z<N.length;Z++){const B=N[Z],Q=x(B);typeof B=="number"||typeof B=="boolean"?(y.__data[0]=B,t.bufferSubData(t.UNIFORM_BUFFER,L+G,y.__data)):B.isMatrix3?(y.__data[0]=B.elements[0],y.__data[1]=B.elements[1],y.__data[2]=B.elements[2],y.__data[3]=0,y.__data[4]=B.elements[3],y.__data[5]=B.elements[4],y.__data[6]=B.elements[5],y.__data[7]=0,y.__data[8]=B.elements[6],y.__data[9]=B.elements[7],y.__data[10]=B.elements[8],y.__data[11]=0):(B.toArray(y.__data,G),G+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,L,y.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(A,m,C,w){const S=A.value,I=m+"_"+C;if(w[I]===void 0)return typeof S=="number"||typeof S=="boolean"?w[I]=S:w[I]=S.clone(),!0;{const T=w[I];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return w[I]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function v(A){const m=A.uniforms;let C=0;const w=16;for(let I=0,T=m.length;I<T;I++){const z=Array.isArray(m[I])?m[I]:[m[I]];for(let _=0,y=z.length;_<y;_++){const L=z[_],N=Array.isArray(L.value)?L.value:[L.value];for(let G=0,Z=N.length;G<Z;G++){const B=N[G],Q=x(B),D=C%w,J=D%Q.boundary,q=D+J;C+=J,q!==0&&w-q<Q.storage&&(C+=w-q),L.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=C,C+=Q.storage}}}const S=C%w;return S>0&&(C+=w-S),A.__size=C,A.__cache={},this}function x(A){const m={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(m.boundary=4,m.storage=4):A.isVector2?(m.boundary=8,m.storage=8):A.isVector3||A.isColor?(m.boundary=16,m.storage=12):A.isVector4?(m.boundary=16,m.storage=16):A.isMatrix3?(m.boundary=48,m.storage=48):A.isMatrix4?(m.boundary=64,m.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),m}function g(A){const m=A.target;m.removeEventListener("dispose",g);const C=o.indexOf(m.__bindingPointIndex);o.splice(C,1),t.deleteBuffer(r[m.id]),delete r[m.id],delete s[m.id]}function d(){for(const A in r)t.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class yw{constructor(e={}){const{canvas:n=cy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),v=new Int32Array(4);let x=null,g=null;const d=[],A=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zn,this.toneMapping=_i,this.toneMappingExposure=1;const m=this;let C=!1,w=0,S=0,I=null,T=-1,z=null;const _=new Ct,y=new Ct;let L=null;const N=new Je(0);let G=0,Z=n.width,B=n.height,Q=1,D=null,J=null;const q=new Ct(0,0,Z,B),ie=new Ct(0,0,Z,B);let le=!1;const ve=new lf;let V=!1,ne=!1;const oe=new ot,ae=new ot,ke=new O,De=new Ct,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function re(){return I===null?Q:1}let P=i;function ge(E,F){return n.getContext(E,F)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qd}`),n.addEventListener("webglcontextlost",$,!1),n.addEventListener("webglcontextrestored",xe,!1),n.addEventListener("webglcontextcreationerror",fe,!1),P===null){const F="webgl2";if(P=ge(F,E),P===null)throw ge(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ae,ue,_e,Ue,Se,b,M,W,ee,se,te,be,Ce,we,Ye,de,Te,Ge,H,K,Me,Pe,Ze,U;function ye(){Ae=new wS(P),Ae.init(),Pe=new dw(P,Ae),ue=new xS(P,Ae,e,Pe),_e=new cw(P),ue.reverseDepthBuffer&&_e.buffers.depth.setReversed(!0),Ue=new bS(P),Se=new ZE,b=new hw(P,Ae,_e,Se,ue,Pe,Ue),M=new IS(m),W=new ES(m),ee=new Fy(P),Ze=new _S(P,ee),se=new TS(P,ee,Ue,Ze),te=new LS(P,se,ee,Ue),H=new PS(P,ue,b),de=new yS(Se),be=new YE(m,M,W,Ae,ue,Ze,de),Ce=new Cw(m,Se),we=new KE,Ye=new nw(Ae),Ge=new vS(m,M,W,_e,te,f,l),Te=new aw(m,te,ue),U=new xw(P,Ue,ue,_e),K=new CS(P,Ae,Ue),Me=new RS(P,Ae,Ue),Ue.programs=be.programs,m.capabilities=ue,m.extensions=Ae,m.properties=Se,m.renderLists=we,m.shadowMap=Te,m.state=_e,m.info=Ue}ye();const Y=new vw(m,P);this.xr=Y,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=Ae.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ae.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(Z,B,!1))},this.getSize=function(E){return E.set(Z,B)},this.setSize=function(E,F,j=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=E,B=F,n.width=Math.floor(E*Q),n.height=Math.floor(F*Q),j===!0&&(n.style.width=E+"px",n.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(Z*Q,B*Q).floor()},this.setDrawingBufferSize=function(E,F,j){Z=E,B=F,Q=j,n.width=Math.floor(E*j),n.height=Math.floor(F*j),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(_)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,F,j,X){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,F,j,X),_e.viewport(_.copy(q).multiplyScalar(Q).round())},this.getScissor=function(E){return E.copy(ie)},this.setScissor=function(E,F,j,X){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,F,j,X),_e.scissor(y.copy(ie).multiplyScalar(Q).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){_e.setScissorTest(le=E)},this.setOpaqueSort=function(E){D=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(E=!0,F=!0,j=!0){let X=0;if(E){let k=!1;if(I!==null){const me=I.texture.format;k=me===rf||me===nf||me===tf}if(k){const me=I.texture.type,Ee=me===Si||me===Rr||me===Go||me===Fs||me===$d||me===ef,Le=Ge.getClearColor(),Ne=Ge.getClearAlpha(),Ve=Le.r,We=Le.g,Oe=Le.b;Ee?(p[0]=Ve,p[1]=We,p[2]=Oe,p[3]=Ne,P.clearBufferuiv(P.COLOR,0,p)):(v[0]=Ve,v[1]=We,v[2]=Oe,v[3]=Ne,P.clearBufferiv(P.COLOR,0,v))}else X|=P.COLOR_BUFFER_BIT}F&&(X|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),j&&(X|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",$,!1),n.removeEventListener("webglcontextrestored",xe,!1),n.removeEventListener("webglcontextcreationerror",fe,!1),we.dispose(),Ye.dispose(),Se.dispose(),M.dispose(),W.dispose(),te.dispose(),Ze.dispose(),U.dispose(),be.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",xf),Y.removeEventListener("sessionend",yf),or.stop()};function $(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=Ue.autoReset,F=Te.enabled,j=Te.autoUpdate,X=Te.needsUpdate,k=Te.type;ye(),Ue.autoReset=E,Te.enabled=F,Te.autoUpdate=j,Te.needsUpdate=X,Te.type=k}function fe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ze(E){const F=E.target;F.removeEventListener("dispose",ze),rt(F)}function rt(E){Mt(E),Se.remove(E)}function Mt(E){const F=Se.get(E).programs;F!==void 0&&(F.forEach(function(j){be.releaseProgram(j)}),E.isShaderMaterial&&be.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,j,X,k,me){F===null&&(F=Be);const Ee=k.isMesh&&k.matrixWorld.determinant()<0,Le=f0(E,F,j,X,k);_e.setMaterial(X,Ee);let Ne=j.index,Ve=1;if(X.wireframe===!0){if(Ne=se.getWireframeAttribute(j),Ne===void 0)return;Ve=2}const We=j.drawRange,Oe=j.attributes.position;let nt=We.start*Ve,lt=(We.start+We.count)*Ve;me!==null&&(nt=Math.max(nt,me.start*Ve),lt=Math.min(lt,(me.start+me.count)*Ve)),Ne!==null?(nt=Math.max(nt,0),lt=Math.min(lt,Ne.count)):Oe!=null&&(nt=Math.max(nt,0),lt=Math.min(lt,Oe.count));const vt=lt-nt;if(vt<0||vt===1/0)return;Ze.setup(k,X,Le,j,Ne);let un,et=K;if(Ne!==null&&(un=ee.get(Ne),et=Me,et.setIndex(un)),k.isMesh)X.wireframe===!0?(_e.setLineWidth(X.wireframeLinewidth*re()),et.setMode(P.LINES)):et.setMode(P.TRIANGLES);else if(k.isLine){let Fe=X.linewidth;Fe===void 0&&(Fe=1),_e.setLineWidth(Fe*re()),k.isLineSegments?et.setMode(P.LINES):k.isLineLoop?et.setMode(P.LINE_LOOP):et.setMode(P.LINE_STRIP)}else k.isPoints?et.setMode(P.POINTS):k.isSprite&&et.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)et.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ae.get("WEBGL_multi_draw"))et.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Fe=k._multiDrawStarts,Ot=k._multiDrawCounts,tt=k._multiDrawCount,Ln=Ne?ee.get(Ne).bytesPerElement:1,Fr=Se.get(X).currentProgram.getUniforms();for(let hn=0;hn<tt;hn++)Fr.setValue(P,"_gl_DrawID",hn),et.render(Fe[hn]/Ln,Ot[hn])}else if(k.isInstancedMesh)et.renderInstances(nt,vt,k.count);else if(j.isInstancedBufferGeometry){const Fe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ot=Math.min(j.instanceCount,Fe);et.renderInstances(nt,vt,Ot)}else et.render(nt,vt)};function $e(E,F,j){E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=Xt,E.needsUpdate=!0,na(E,F,j),E.side=Mi,E.needsUpdate=!0,na(E,F,j),E.side=gn):na(E,F,j)}this.compile=function(E,F,j=null){j===null&&(j=E),g=Ye.get(j),g.init(F),A.push(g),j.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),E!==j&&E.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),g.setupLights();const X=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const me=k.material;if(me)if(Array.isArray(me))for(let Ee=0;Ee<me.length;Ee++){const Le=me[Ee];$e(Le,j,k),X.add(Le)}else $e(me,j,k),X.add(me)}),A.pop(),g=null,X},this.compileAsync=function(E,F,j=null){const X=this.compile(E,F,j);return new Promise(k=>{function me(){if(X.forEach(function(Ee){Se.get(Ee).currentProgram.isReady()&&X.delete(Ee)}),X.size===0){k(E);return}setTimeout(me,10)}Ae.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let nn=null;function ri(E){nn&&nn(E)}function xf(){or.stop()}function yf(){or.start()}const or=new Gv;or.setAnimationLoop(ri),typeof self<"u"&&or.setContext(self),this.setAnimationLoop=function(E){nn=E,Y.setAnimationLoop(E),E===null?or.stop():or.start()},Y.addEventListener("sessionstart",xf),Y.addEventListener("sessionend",yf),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(m,E,F,I),g=Ye.get(E,A.length),g.init(F),A.push(g),ae.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ve.setFromProjectionMatrix(ae),ne=this.localClippingEnabled,V=de.init(this.clippingPlanes,ne),x=we.get(E,d.length),x.init(),d.push(x),Y.enabled===!0&&Y.isPresenting===!0){const me=m.xr.getDepthSensingMesh();me!==null&&cc(me,F,-1/0,m.sortObjects)}cc(E,F,0,m.sortObjects),x.finish(),m.sortObjects===!0&&x.sort(D,J),He=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,He&&Ge.addToRenderList(x,E),this.info.render.frame++,V===!0&&de.beginShadows();const j=g.state.shadowsArray;Te.render(j,E,F),V===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=x.opaque,k=x.transmissive;if(g.setupLights(),F.isArrayCamera){const me=F.cameras;if(k.length>0)for(let Ee=0,Le=me.length;Ee<Le;Ee++){const Ne=me[Ee];Mf(X,k,E,Ne)}He&&Ge.render(E);for(let Ee=0,Le=me.length;Ee<Le;Ee++){const Ne=me[Ee];If(x,E,Ne,Ne.viewport)}}else k.length>0&&Mf(X,k,E,F),He&&Ge.render(E),If(x,E,F);I!==null&&(b.updateMultisampleRenderTarget(I),b.updateRenderTargetMipmap(I)),E.isScene===!0&&E.onAfterRender(m,E,F),Ze.resetDefaultState(),T=-1,z=null,A.pop(),A.length>0?(g=A[A.length-1],V===!0&&de.setGlobalState(m.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function cc(E,F,j,X){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)j=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ve.intersectsSprite(E)){X&&De.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ae);const Ee=te.update(E),Le=E.material;Le.visible&&x.push(E,Ee,Le,j,De.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ve.intersectsObject(E))){const Ee=te.update(E),Le=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),De.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),De.copy(Ee.boundingSphere.center)),De.applyMatrix4(E.matrixWorld).applyMatrix4(ae)),Array.isArray(Le)){const Ne=Ee.groups;for(let Ve=0,We=Ne.length;Ve<We;Ve++){const Oe=Ne[Ve],nt=Le[Oe.materialIndex];nt&&nt.visible&&x.push(E,Ee,nt,j,De.z,Oe)}}else Le.visible&&x.push(E,Ee,Le,j,De.z,null)}}const me=E.children;for(let Ee=0,Le=me.length;Ee<Le;Ee++)cc(me[Ee],F,j,X)}function If(E,F,j,X){const k=E.opaque,me=E.transmissive,Ee=E.transparent;g.setupLightsView(j),V===!0&&de.setGlobalState(m.clippingPlanes,j),X&&_e.viewport(_.copy(X)),k.length>0&&ta(k,F,j),me.length>0&&ta(me,F,j),Ee.length>0&&ta(Ee,F,j),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Mf(E,F,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[X.id]===void 0&&(g.state.transmissionRenderTarget[X.id]=new br(1,1,{generateMipmaps:!0,type:Ae.has("EXT_color_buffer_half_float")||Ae.has("EXT_color_buffer_float")?qo:Si,minFilter:xr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const me=g.state.transmissionRenderTarget[X.id],Ee=X.viewport||_;me.setSize(Ee.z,Ee.w);const Le=m.getRenderTarget();m.setRenderTarget(me),m.getClearColor(N),G=m.getClearAlpha(),G<1&&m.setClearColor(16777215,.5),m.clear(),He&&Ge.render(j);const Ne=m.toneMapping;m.toneMapping=_i;const Ve=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),g.setupLightsView(X),V===!0&&de.setGlobalState(m.clippingPlanes,X),ta(E,j,X),b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me),Ae.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Oe=0,nt=F.length;Oe<nt;Oe++){const lt=F[Oe],vt=lt.object,un=lt.geometry,et=lt.material,Fe=lt.group;if(et.side===gn&&vt.layers.test(X.layers)){const Ot=et.side;et.side=Xt,et.needsUpdate=!0,Sf(vt,j,X,un,et,Fe),et.side=Ot,et.needsUpdate=!0,We=!0}}We===!0&&(b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me))}m.setRenderTarget(Le),m.setClearColor(N,G),Ve!==void 0&&(X.viewport=Ve),m.toneMapping=Ne}function ta(E,F,j){const X=F.isScene===!0?F.overrideMaterial:null;for(let k=0,me=E.length;k<me;k++){const Ee=E[k],Le=Ee.object,Ne=Ee.geometry,Ve=X===null?Ee.material:X,We=Ee.group;Le.layers.test(j.layers)&&Sf(Le,F,j,Ne,Ve,We)}}function Sf(E,F,j,X,k,me){E.onBeforeRender(m,F,j,X,k,me),E.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(m,F,j,X,E,me),k.transparent===!0&&k.side===gn&&k.forceSinglePass===!1?(k.side=Xt,k.needsUpdate=!0,m.renderBufferDirect(j,F,X,k,E,me),k.side=Mi,k.needsUpdate=!0,m.renderBufferDirect(j,F,X,k,E,me),k.side=gn):m.renderBufferDirect(j,F,X,k,E,me),E.onAfterRender(m,F,j,X,k,me)}function na(E,F,j){F.isScene!==!0&&(F=Be);const X=Se.get(E),k=g.state.lights,me=g.state.shadowsArray,Ee=k.state.version,Le=be.getParameters(E,k.state,me,F,j),Ne=be.getProgramCacheKey(Le);let Ve=X.programs;X.environment=E.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(E.isMeshStandardMaterial?W:M).get(E.envMap||X.environment),X.envMapRotation=X.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ve===void 0&&(E.addEventListener("dispose",ze),Ve=new Map,X.programs=Ve);let We=Ve.get(Ne);if(We!==void 0){if(X.currentProgram===We&&X.lightsStateVersion===Ee)return wf(E,Le),We}else Le.uniforms=be.getUniforms(E),E.onBeforeCompile(Le,m),We=be.acquireProgram(Le,Ne),Ve.set(Ne,We),X.uniforms=Le.uniforms;const Oe=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Oe.clippingPlanes=de.uniform),wf(E,Le),X.needsLights=g0(E),X.lightsStateVersion=Ee,X.needsLights&&(Oe.ambientLightColor.value=k.state.ambient,Oe.lightProbe.value=k.state.probe,Oe.directionalLights.value=k.state.directional,Oe.directionalLightShadows.value=k.state.directionalShadow,Oe.spotLights.value=k.state.spot,Oe.spotLightShadows.value=k.state.spotShadow,Oe.rectAreaLights.value=k.state.rectArea,Oe.ltc_1.value=k.state.rectAreaLTC1,Oe.ltc_2.value=k.state.rectAreaLTC2,Oe.pointLights.value=k.state.point,Oe.pointLightShadows.value=k.state.pointShadow,Oe.hemisphereLights.value=k.state.hemi,Oe.directionalShadowMap.value=k.state.directionalShadowMap,Oe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Oe.spotShadowMap.value=k.state.spotShadowMap,Oe.spotLightMatrix.value=k.state.spotLightMatrix,Oe.spotLightMap.value=k.state.spotLightMap,Oe.pointShadowMap.value=k.state.pointShadowMap,Oe.pointShadowMatrix.value=k.state.pointShadowMatrix),X.currentProgram=We,X.uniformsList=null,We}function Ef(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=cl.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function wf(E,F){const j=Se.get(E);j.outputColorSpace=F.outputColorSpace,j.batching=F.batching,j.batchingColor=F.batchingColor,j.instancing=F.instancing,j.instancingColor=F.instancingColor,j.instancingMorph=F.instancingMorph,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function f0(E,F,j,X,k){F.isScene!==!0&&(F=Be),b.resetTextureUnits();const me=F.fog,Ee=X.isMeshStandardMaterial?F.environment:null,Le=I===null?m.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Yn,Ne=(X.isMeshStandardMaterial?W:M).get(X.envMap||Ee),Ve=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,We=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Oe=!!j.morphAttributes.position,nt=!!j.morphAttributes.normal,lt=!!j.morphAttributes.color;let vt=_i;X.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(vt=m.toneMapping);const un=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,et=un!==void 0?un.length:0,Fe=Se.get(X),Ot=g.state.lights;if(V===!0&&(ne===!0||E!==z)){const yn=E===z&&X.id===T;de.setState(X,E,yn)}let tt=!1;X.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Ot.state.version||Fe.outputColorSpace!==Le||k.isBatchedMesh&&Fe.batching===!1||!k.isBatchedMesh&&Fe.batching===!0||k.isBatchedMesh&&Fe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Fe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Fe.instancing===!1||!k.isInstancedMesh&&Fe.instancing===!0||k.isSkinnedMesh&&Fe.skinning===!1||!k.isSkinnedMesh&&Fe.skinning===!0||k.isInstancedMesh&&Fe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Fe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Fe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Fe.instancingMorph===!1&&k.morphTexture!==null||Fe.envMap!==Ne||X.fog===!0&&Fe.fog!==me||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==de.numPlanes||Fe.numIntersection!==de.numIntersection)||Fe.vertexAlphas!==Ve||Fe.vertexTangents!==We||Fe.morphTargets!==Oe||Fe.morphNormals!==nt||Fe.morphColors!==lt||Fe.toneMapping!==vt||Fe.morphTargetsCount!==et)&&(tt=!0):(tt=!0,Fe.__version=X.version);let Ln=Fe.currentProgram;tt===!0&&(Ln=na(X,F,k));let Fr=!1,hn=!1,uc=!1;const xt=Ln.getUniforms(),Ti=Fe.uniforms;if(_e.useProgram(Ln.program)&&(Fr=!0,hn=!0,uc=!0),X.id!==T&&(T=X.id,hn=!0),Fr||z!==E){ue.reverseDepthBuffer?(oe.copy(E.projectionMatrix),hy(oe),dy(oe),xt.setValue(P,"projectionMatrix",oe)):xt.setValue(P,"projectionMatrix",E.projectionMatrix),xt.setValue(P,"viewMatrix",E.matrixWorldInverse);const yn=xt.map.cameraPosition;yn!==void 0&&yn.setValue(P,ke.setFromMatrixPosition(E.matrixWorld)),ue.logarithmicDepthBuffer&&xt.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&xt.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),z!==E&&(z=E,hn=!0,uc=!0)}if(k.isSkinnedMesh){xt.setOptional(P,k,"bindMatrix"),xt.setOptional(P,k,"bindMatrixInverse");const yn=k.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),xt.setValue(P,"boneTexture",yn.boneTexture,b))}k.isBatchedMesh&&(xt.setOptional(P,k,"batchingTexture"),xt.setValue(P,"batchingTexture",k._matricesTexture,b),xt.setOptional(P,k,"batchingIdTexture"),xt.setValue(P,"batchingIdTexture",k._indirectTexture,b),xt.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&xt.setValue(P,"batchingColorTexture",k._colorsTexture,b));const hc=j.morphAttributes;if((hc.position!==void 0||hc.normal!==void 0||hc.color!==void 0)&&H.update(k,j,Ln),(hn||Fe.receiveShadow!==k.receiveShadow)&&(Fe.receiveShadow=k.receiveShadow,xt.setValue(P,"receiveShadow",k.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Ti.envMap.value=Ne,Ti.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(Ti.envMapIntensity.value=F.environmentIntensity),hn&&(xt.setValue(P,"toneMappingExposure",m.toneMappingExposure),Fe.needsLights&&p0(Ti,uc),me&&X.fog===!0&&Ce.refreshFogUniforms(Ti,me),Ce.refreshMaterialUniforms(Ti,X,Q,B,g.state.transmissionRenderTarget[E.id]),cl.upload(P,Ef(Fe),Ti,b)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(cl.upload(P,Ef(Fe),Ti,b),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&xt.setValue(P,"center",k.center),xt.setValue(P,"modelViewMatrix",k.modelViewMatrix),xt.setValue(P,"normalMatrix",k.normalMatrix),xt.setValue(P,"modelMatrix",k.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const yn=X.uniformsGroups;for(let dc=0,m0=yn.length;dc<m0;dc++){const Tf=yn[dc];U.update(Tf,Ln),U.bind(Tf,Ln)}}return Ln}function p0(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function g0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,F,j){Se.get(E.texture).__webglTexture=F,Se.get(E.depthTexture).__webglTexture=j;const X=Se.get(E);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=j===void 0,X.__autoAllocateDepthBuffer||Ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const j=Se.get(E);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,j=0){I=E,w=F,S=j;let X=!0,k=null,me=!1,Ee=!1;if(E){const Ne=Se.get(E);if(Ne.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(P.FRAMEBUFFER,null),X=!1;else if(Ne.__webglFramebuffer===void 0)b.setupRenderTarget(E);else if(Ne.__hasExternalTextures)b.rebindTextures(E,Se.get(E.texture).__webglTexture,Se.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Oe=E.depthTexture;if(Ne.__boundDepthTexture!==Oe){if(Oe!==null&&Se.has(Oe)&&(E.width!==Oe.image.width||E.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(E)}}const Ve=E.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ee=!0);const We=Se.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(We[F])?k=We[F][j]:k=We[F],me=!0):E.samples>0&&b.useMultisampledRTT(E)===!1?k=Se.get(E).__webglMultisampledFramebuffer:Array.isArray(We)?k=We[j]:k=We,_.copy(E.viewport),y.copy(E.scissor),L=E.scissorTest}else _.copy(q).multiplyScalar(Q).floor(),y.copy(ie).multiplyScalar(Q).floor(),L=le;if(_e.bindFramebuffer(P.FRAMEBUFFER,k)&&X&&_e.drawBuffers(E,k),_e.viewport(_),_e.scissor(y),_e.setScissorTest(L),me){const Ne=Se.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ne.__webglTexture,j)}else if(Ee){const Ne=Se.get(E.texture),Ve=F||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ne.__webglTexture,j||0,Ve)}T=-1},this.readRenderTargetPixels=function(E,F,j,X,k,me,Ee){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){_e.bindFramebuffer(P.FRAMEBUFFER,Le);try{const Ne=E.texture,Ve=Ne.format,We=Ne.type;if(!ue.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-X&&j>=0&&j<=E.height-k&&P.readPixels(F,j,X,k,Pe.convert(Ve),Pe.convert(We),me)}finally{const Ne=I!==null?Se.get(I).__webglFramebuffer:null;_e.bindFramebuffer(P.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(E,F,j,X,k,me,Ee){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){const Ne=E.texture,Ve=Ne.format,We=Ne.type;if(!ue.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-X&&j>=0&&j<=E.height-k){_e.bindFramebuffer(P.FRAMEBUFFER,Le);const Oe=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Oe),P.bufferData(P.PIXEL_PACK_BUFFER,me.byteLength,P.STREAM_READ),P.readPixels(F,j,X,k,Pe.convert(Ve),Pe.convert(We),0);const nt=I!==null?Se.get(I).__webglFramebuffer:null;_e.bindFramebuffer(P.FRAMEBUFFER,nt);const lt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await uy(P,lt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Oe),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,me),P.deleteBuffer(Oe),P.deleteSync(lt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,F=null,j=0){E.isTexture!==!0&&(ll("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const X=Math.pow(2,-j),k=Math.floor(E.image.width*X),me=Math.floor(E.image.height*X),Ee=F!==null?F.x:0,Le=F!==null?F.y:0;b.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,j,0,0,Ee,Le,k,me),_e.unbindTexture()},this.copyTextureToTexture=function(E,F,j=null,X=null,k=0){E.isTexture!==!0&&(ll("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,E=arguments[1],F=arguments[2],k=arguments[3]||0,j=null);let me,Ee,Le,Ne,Ve,We;j!==null?(me=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Le=j.min.x,Ne=j.min.y):(me=E.image.width,Ee=E.image.height,Le=0,Ne=0),X!==null?(Ve=X.x,We=X.y):(Ve=0,We=0);const Oe=Pe.convert(F.format),nt=Pe.convert(F.type);b.setTexture2D(F,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const lt=P.getParameter(P.UNPACK_ROW_LENGTH),vt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),un=P.getParameter(P.UNPACK_SKIP_PIXELS),et=P.getParameter(P.UNPACK_SKIP_ROWS),Fe=P.getParameter(P.UNPACK_SKIP_IMAGES),Ot=E.isCompressedTexture?E.mipmaps[k]:E.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Ot.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ot.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Le),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ne),E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,k,Ve,We,me,Ee,Oe,nt,Ot.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,k,Ve,We,Ot.width,Ot.height,Oe,Ot.data):P.texSubImage2D(P.TEXTURE_2D,k,Ve,We,me,Ee,Oe,nt,Ot),P.pixelStorei(P.UNPACK_ROW_LENGTH,lt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,un),P.pixelStorei(P.UNPACK_SKIP_ROWS,et),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe),k===0&&F.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(E,F,j=null,X=null,k=0){E.isTexture!==!0&&(ll("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,X=arguments[1]||null,E=arguments[2],F=arguments[3],k=arguments[4]||0);let me,Ee,Le,Ne,Ve,We,Oe,nt,lt;const vt=E.isCompressedTexture?E.mipmaps[k]:E.image;j!==null?(me=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Le=j.max.z-j.min.z,Ne=j.min.x,Ve=j.min.y,We=j.min.z):(me=vt.width,Ee=vt.height,Le=vt.depth,Ne=0,Ve=0,We=0),X!==null?(Oe=X.x,nt=X.y,lt=X.z):(Oe=0,nt=0,lt=0);const un=Pe.convert(F.format),et=Pe.convert(F.type);let Fe;if(F.isData3DTexture)b.setTexture3D(F,0),Fe=P.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)b.setTexture2DArray(F,0),Fe=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const Ot=P.getParameter(P.UNPACK_ROW_LENGTH),tt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ln=P.getParameter(P.UNPACK_SKIP_PIXELS),Fr=P.getParameter(P.UNPACK_SKIP_ROWS),hn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,vt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ne),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ve),P.pixelStorei(P.UNPACK_SKIP_IMAGES,We),E.isDataTexture||E.isData3DTexture?P.texSubImage3D(Fe,k,Oe,nt,lt,me,Ee,Le,un,et,vt.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(Fe,k,Oe,nt,lt,me,Ee,Le,un,vt.data):P.texSubImage3D(Fe,k,Oe,nt,lt,me,Ee,Le,un,et,vt),P.pixelStorei(P.UNPACK_ROW_LENGTH,Ot),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,tt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ln),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fr),P.pixelStorei(P.UNPACK_SKIP_IMAGES,hn),k===0&&F.generateMipmaps&&P.generateMipmap(Fe),_e.unbindTexture()},this.initRenderTarget=function(E){Se.get(E).__webglFramebuffer===void 0&&b.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),_e.unbindTexture()},this.resetState=function(){w=0,S=0,I=null,_e.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===sf?"display-p3":"srgb",n.unpackColorSpace=qe.workingColorSpace===sc?"display-p3":"srgb"}}class Iw extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,p=(o-h)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new he:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new O,r=[],s=[],o=[],a=new O,l=new ot;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new O)}s[0]=new O,o[0]=new O;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(Rt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,v))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Rt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class uf extends ii{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new he){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mw extends uf{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function hf(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,p*=h,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Ga=new O,mu=new hf,Au=new hf,vu=new hf;class Sw extends ii{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new O){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(Ga.subVectors(r[0],r[1]).add(r[0]),c=Ga);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Ga.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Ga),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(h),p);x<1e-4&&(x=1),v<1e-4&&(v=x),g<1e-4&&(g=x),mu.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,v,x,g),Au.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,v,x,g),vu.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,v,x,g)}else this.curveType==="catmullrom"&&(mu.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Au.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),vu.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(mu.calc(l),Au.calc(l),vu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new O().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Og(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function Ew(t,e){const n=1-t;return n*n*e}function ww(t,e){return 2*(1-t)*t*e}function Tw(t,e){return t*t*e}function xo(t,e,n,i){return Ew(t,e)+ww(t,n)+Tw(t,i)}function Rw(t,e){const n=1-t;return n*n*n*e}function bw(t,e){const n=1-t;return 3*n*n*t*e}function Pw(t,e){return 3*(1-t)*t*t*e}function Lw(t,e){return t*t*t*e}function yo(t,e,n,i,r){return Rw(t,e)+bw(t,n)+Pw(t,i)+Lw(t,r)}class Zv extends ii{constructor(e=new he,n=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new he){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(yo(e,r.x,s.x,o.x,a.x),yo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dw extends ii{constructor(e=new O,n=new O,i=new O,r=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new O){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(yo(e,r.x,s.x,o.x,a.x),yo(e,r.y,s.y,o.y,a.y),yo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Jv extends ii{constructor(e=new he,n=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new he){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new he){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nw extends ii{constructor(e=new O,n=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new O){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new O){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kv extends ii{constructor(e=new he,n=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new he){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(xo(e,r.x,s.x,o.x),xo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uw extends ii{constructor(e=new O,n=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new O){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(xo(e,r.x,s.x,o.x),xo(e,r.y,s.y,o.y),xo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qv extends ii{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new he){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(Og(a,l.x,c.x,h.x,u.x),Og(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new he().fromArray(r))}return this}}var qh=Object.freeze({__proto__:null,ArcCurve:Mw,CatmullRomCurve3:Sw,CubicBezierCurve:Zv,CubicBezierCurve3:Dw,EllipseCurve:uf,LineCurve:Jv,LineCurve3:Nw,QuadraticBezierCurve:Kv,QuadraticBezierCurve3:Uw,SplineCurve:Qv});class Ow extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qh[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new qh[r.type]().fromJSON(r))}return this}}class Fg extends Ow{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new Jv(this.currentPoint.clone(),new he(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new Kv(this.currentPoint.clone(),new he(e,n),new he(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Zv(this.currentPoint.clone(),new he(e,n),new he(i,r),new he(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Qv(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,n+h,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new uf(e,n,i,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zl extends xn{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=Rt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/n,u=new O,f=new he,p=new O,v=new O,x=new O;let g=0,d=0;for(let A=0;A<=e.length-1;A++)switch(A){case 0:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,v.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(v)}for(let A=0;A<=n;A++){const m=i+A*h*r,C=Math.sin(m),w=Math.cos(m);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*C,u.y=e[S].y,u.z=e[S].x*w,o.push(u.x,u.y,u.z),f.x=A/n,f.y=S/(e.length-1),a.push(f.x,f.y);const I=l[3*S+0]*C,T=l[3*S+1],z=l[3*S+0]*w;c.push(I,T,z)}}for(let A=0;A<n;A++)for(let m=0;m<e.length-1;m++){const C=m+A*e.length,w=C,S=C+e.length,I=C+e.length+1,T=C+1;s.push(w,S,T),s.push(I,T,S)}this.setIndex(s),this.setAttribute("position",new ft(o,3)),this.setAttribute("uv",new ft(a,2)),this.setAttribute("normal",new ft(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.points,e.segments,e.phiStart,e.phiLength)}}class df extends xn{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],c=new O,h=new he;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=n;u++,f+=3){const p=i+u/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=n;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(a,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new df(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ff extends xn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],p=[];let v=0;const x=[],g=i/2;let d=0;A(),o===!1&&(e>0&&m(!0),n>0&&m(!1)),this.setIndex(h),this.setAttribute("position",new ft(u,3)),this.setAttribute("normal",new ft(f,3)),this.setAttribute("uv",new ft(p,2));function A(){const C=new O,w=new O;let S=0;const I=(n-e)/i;for(let T=0;T<=s;T++){const z=[],_=T/s,y=_*(n-e)+e;for(let L=0;L<=r;L++){const N=L/r,G=N*l+a,Z=Math.sin(G),B=Math.cos(G);w.x=y*Z,w.y=-_*i+g,w.z=y*B,u.push(w.x,w.y,w.z),C.set(Z,I,B).normalize(),f.push(C.x,C.y,C.z),p.push(N,1-_),z.push(v++)}x.push(z)}for(let T=0;T<r;T++)for(let z=0;z<s;z++){const _=x[z][T],y=x[z+1][T],L=x[z+1][T+1],N=x[z][T+1];e>0&&(h.push(_,y,N),S+=3),n>0&&(h.push(y,L,N),S+=3)}c.addGroup(d,S,0),d+=S}function m(C){const w=v,S=new he,I=new O;let T=0;const z=C===!0?e:n,_=C===!0?1:-1;for(let L=1;L<=r;L++)u.push(0,g*_,0),f.push(0,_,0),p.push(.5,.5),v++;const y=v;for(let L=0;L<=r;L++){const G=L/r*l+a,Z=Math.cos(G),B=Math.sin(G);I.x=z*B,I.y=g*_,I.z=z*Z,u.push(I.x,I.y,I.z),f.push(0,_,0),S.x=Z*.5+.5,S.y=B*.5*_+.5,p.push(S.x,S.y),v++}for(let L=0;L<r;L++){const N=w+L,G=y+L;C===!0?h.push(G,G+1,N):h.push(G+1,G,N),T+=3}c.addGroup(d,T,C===!0?1:2),d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ff(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qv extends Fg{constructor(e){super(e),this.uuid=Or(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Fg().fromJSON(r))}return this}}const Fw={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=$v(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,p;if(i&&(s=Vw(t,e,s,n)),t.length>80*n){a=c=t[0],l=h=t[1];for(let v=n;v<r;v+=n)u=t[v],f=t[v+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return Wo(s,o,n,a,l,p,0),o}};function $v(t,e,n,i,r){let s,o;if(r===$w(t,e,n,i)>0)for(s=e;s<n;s+=i)o=kg(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=kg(s,t[s],t[s+1],o);return o&&lc(o,o.next)&&(Xo(o),o=o.next),o}function Lr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(lc(n,n.next)||gt(n.prev,n,n.next)===0)){if(Xo(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Wo(t,e,n,i,r,s,o){if(!t)return;!o&&s&&Yw(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?zw(t,i,r,s):kw(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),Xo(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=Bw(Lr(t),e,n),Wo(t,e,n,i,r,s,2)):o===2&&Gw(t,e,n,i,r,s):Wo(Lr(t),e,n,i,r,s,1);break}}}function kw(t){const e=t.prev,n=t,i=t.next;if(gt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=h&&v.x<=f&&v.y>=u&&v.y<=p&&ps(r,a,s,l,o,c,v.x,v.y)&&gt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function zw(t,e,n,i){const r=t.prev,s=t,o=t.next;if(gt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,p=a<l?a<c?a:c:l<c?l:c,v=h<u?h<f?h:f:u<f?u:f,x=a>l?a>c?a:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,d=$h(p,v,e,n,i),A=$h(x,g,e,n,i);let m=t.prevZ,C=t.nextZ;for(;m&&m.z>=d&&C&&C.z<=A;){if(m.x>=p&&m.x<=x&&m.y>=v&&m.y<=g&&m!==r&&m!==o&&ps(a,h,l,u,c,f,m.x,m.y)&&gt(m.prev,m,m.next)>=0||(m=m.prevZ,C.x>=p&&C.x<=x&&C.y>=v&&C.y<=g&&C!==r&&C!==o&&ps(a,h,l,u,c,f,C.x,C.y)&&gt(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;m&&m.z>=d;){if(m.x>=p&&m.x<=x&&m.y>=v&&m.y<=g&&m!==r&&m!==o&&ps(a,h,l,u,c,f,m.x,m.y)&&gt(m.prev,m,m.next)>=0)return!1;m=m.prevZ}for(;C&&C.z<=A;){if(C.x>=p&&C.x<=x&&C.y>=v&&C.y<=g&&C!==r&&C!==o&&ps(a,h,l,u,c,f,C.x,C.y)&&gt(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function Bw(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!lc(r,s)&&e0(r,i,i.next,s)&&jo(r,s)&&jo(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),Xo(i),Xo(i.next),i=t=s),i=i.next}while(i!==t);return Lr(i)}function Gw(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Kw(o,a)){let l=t0(o,a);o=Lr(o,o.next),l=Lr(l,l.next),Wo(o,e,n,i,r,s,0),Wo(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function Vw(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=$v(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(Jw(c));for(r.sort(Hw),s=0;s<r.length;s++)n=Ww(r[s],n);return n}function Hw(t,e){return t.x-e.x}function Ww(t,e){const n=jw(t,e);if(!n)return e;const i=t0(n,t);return Lr(i,i.next),Lr(n,n.next)}function jw(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=s&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&ps(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(s-n.x),jo(n,t)&&(u<h||u===h&&(n.x>r.x||n.x===r.x&&Xw(r,n)))&&(r=n,h=u)),n=n.next;while(n!==a);return r}function Xw(t,e){return gt(t.prev,t,e.prev)<0&&gt(e.next,t,t.next)<0}function Yw(t,e,n,i){let r=t;do r.z===0&&(r.z=$h(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,Zw(r)}function Zw(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function $h(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function Jw(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function ps(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function Kw(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!Qw(t,e)&&(jo(t,e)&&jo(e,t)&&qw(t,e)&&(gt(t.prev,t,e.prev)||gt(t,e.prev,e))||lc(t,e)&&gt(t.prev,t,t.next)>0&&gt(e.prev,e,e.next)>0)}function gt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function lc(t,e){return t.x===e.x&&t.y===e.y}function e0(t,e,n,i){const r=Ha(gt(t,e,n)),s=Ha(gt(t,e,i)),o=Ha(gt(n,i,t)),a=Ha(gt(n,i,e));return!!(r!==s&&o!==a||r===0&&Va(t,n,e)||s===0&&Va(t,i,e)||o===0&&Va(n,t,i)||a===0&&Va(n,e,i))}function Va(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Ha(t){return t>0?1:t<0?-1:0}function Qw(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&e0(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function jo(t,e){return gt(t.prev,t,t.next)<0?gt(t,e,t.next)>=0&&gt(t,t.prev,e)>=0:gt(t,e,t.prev)<0||gt(t,t.next,e)<0}function qw(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function t0(t,e){const n=new ed(t.i,t.x,t.y),i=new ed(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function kg(t,e,n,i){const r=new ed(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Xo(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function ed(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $w(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Io{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Io.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];zg(e),Bg(i,e);let o=e.length;n.forEach(zg);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Bg(i,n[l]);const a=Fw.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function zg(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Bg(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class pf extends xn{constructor(e=new qv([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new ft(r,3)),this.setAttribute("uv",new ft(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,h=n.steps!==void 0?n.steps:1,u=n.depth!==void 0?n.depth:1;let f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,v=n.bevelSize!==void 0?n.bevelSize:p-.1,x=n.bevelOffset!==void 0?n.bevelOffset:0,g=n.bevelSegments!==void 0?n.bevelSegments:3;const d=n.extrudePath,A=n.UVGenerator!==void 0?n.UVGenerator:e1;let m,C=!1,w,S,I,T;d&&(m=d.getSpacedPoints(h),C=!0,f=!1,w=d.computeFrenetFrames(h,!1),S=new O,I=new O,T=new O),f||(g=0,p=0,v=0,x=0);const z=a.extractPoints(c);let _=z.shape;const y=z.holes;if(!Io.isClockWise(_)){_=_.reverse();for(let re=0,P=y.length;re<P;re++){const ge=y[re];Io.isClockWise(ge)&&(y[re]=ge.reverse())}}const N=Io.triangulateShape(_,y),G=_;for(let re=0,P=y.length;re<P;re++){const ge=y[re];_=_.concat(ge)}function Z(re,P,ge){return P||console.error("THREE.ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(P,ge)}const B=_.length,Q=N.length;function D(re,P,ge){let Ae,ue,_e;const Ue=re.x-P.x,Se=re.y-P.y,b=ge.x-re.x,M=ge.y-re.y,W=Ue*Ue+Se*Se,ee=Ue*M-Se*b;if(Math.abs(ee)>Number.EPSILON){const se=Math.sqrt(W),te=Math.sqrt(b*b+M*M),be=P.x-Se/se,Ce=P.y+Ue/se,we=ge.x-M/te,Ye=ge.y+b/te,de=((we-be)*M-(Ye-Ce)*b)/(Ue*M-Se*b);Ae=be+Ue*de-re.x,ue=Ce+Se*de-re.y;const Te=Ae*Ae+ue*ue;if(Te<=2)return new he(Ae,ue);_e=Math.sqrt(Te/2)}else{let se=!1;Ue>Number.EPSILON?b>Number.EPSILON&&(se=!0):Ue<-Number.EPSILON?b<-Number.EPSILON&&(se=!0):Math.sign(Se)===Math.sign(M)&&(se=!0),se?(Ae=-Se,ue=Ue,_e=Math.sqrt(W)):(Ae=Ue,ue=Se,_e=Math.sqrt(W/2))}return new he(Ae/_e,ue/_e)}const J=[];for(let re=0,P=G.length,ge=P-1,Ae=re+1;re<P;re++,ge++,Ae++)ge===P&&(ge=0),Ae===P&&(Ae=0),J[re]=D(G[re],G[ge],G[Ae]);const q=[];let ie,le=J.concat();for(let re=0,P=y.length;re<P;re++){const ge=y[re];ie=[];for(let Ae=0,ue=ge.length,_e=ue-1,Ue=Ae+1;Ae<ue;Ae++,_e++,Ue++)_e===ue&&(_e=0),Ue===ue&&(Ue=0),ie[Ae]=D(ge[Ae],ge[_e],ge[Ue]);q.push(ie),le=le.concat(ie)}for(let re=0;re<g;re++){const P=re/g,ge=p*Math.cos(P*Math.PI/2),Ae=v*Math.sin(P*Math.PI/2)+x;for(let ue=0,_e=G.length;ue<_e;ue++){const Ue=Z(G[ue],J[ue],Ae);ae(Ue.x,Ue.y,-ge)}for(let ue=0,_e=y.length;ue<_e;ue++){const Ue=y[ue];ie=q[ue];for(let Se=0,b=Ue.length;Se<b;Se++){const M=Z(Ue[Se],ie[Se],Ae);ae(M.x,M.y,-ge)}}}const ve=v+x;for(let re=0;re<B;re++){const P=f?Z(_[re],le[re],ve):_[re];C?(I.copy(w.normals[0]).multiplyScalar(P.x),S.copy(w.binormals[0]).multiplyScalar(P.y),T.copy(m[0]).add(I).add(S),ae(T.x,T.y,T.z)):ae(P.x,P.y,0)}for(let re=1;re<=h;re++)for(let P=0;P<B;P++){const ge=f?Z(_[P],le[P],ve):_[P];C?(I.copy(w.normals[re]).multiplyScalar(ge.x),S.copy(w.binormals[re]).multiplyScalar(ge.y),T.copy(m[re]).add(I).add(S),ae(T.x,T.y,T.z)):ae(ge.x,ge.y,u/h*re)}for(let re=g-1;re>=0;re--){const P=re/g,ge=p*Math.cos(P*Math.PI/2),Ae=v*Math.sin(P*Math.PI/2)+x;for(let ue=0,_e=G.length;ue<_e;ue++){const Ue=Z(G[ue],J[ue],Ae);ae(Ue.x,Ue.y,u+ge)}for(let ue=0,_e=y.length;ue<_e;ue++){const Ue=y[ue];ie=q[ue];for(let Se=0,b=Ue.length;Se<b;Se++){const M=Z(Ue[Se],ie[Se],Ae);C?ae(M.x,M.y+m[h-1].y,m[h-1].x+ge):ae(M.x,M.y,u+ge)}}}V(),ne();function V(){const re=r.length/3;if(f){let P=0,ge=B*P;for(let Ae=0;Ae<Q;Ae++){const ue=N[Ae];ke(ue[2]+ge,ue[1]+ge,ue[0]+ge)}P=h+g*2,ge=B*P;for(let Ae=0;Ae<Q;Ae++){const ue=N[Ae];ke(ue[0]+ge,ue[1]+ge,ue[2]+ge)}}else{for(let P=0;P<Q;P++){const ge=N[P];ke(ge[2],ge[1],ge[0])}for(let P=0;P<Q;P++){const ge=N[P];ke(ge[0]+B*h,ge[1]+B*h,ge[2]+B*h)}}i.addGroup(re,r.length/3-re,0)}function ne(){const re=r.length/3;let P=0;oe(G,P),P+=G.length;for(let ge=0,Ae=y.length;ge<Ae;ge++){const ue=y[ge];oe(ue,P),P+=ue.length}i.addGroup(re,r.length/3-re,1)}function oe(re,P){let ge=re.length;for(;--ge>=0;){const Ae=ge;let ue=ge-1;ue<0&&(ue=re.length-1);for(let _e=0,Ue=h+g*2;_e<Ue;_e++){const Se=B*_e,b=B*(_e+1),M=P+Ae+Se,W=P+ue+Se,ee=P+ue+b,se=P+Ae+b;De(M,W,ee,se)}}}function ae(re,P,ge){l.push(re),l.push(P),l.push(ge)}function ke(re,P,ge){Be(re),Be(P),Be(ge);const Ae=r.length/3,ue=A.generateTopUV(i,r,Ae-3,Ae-2,Ae-1);He(ue[0]),He(ue[1]),He(ue[2])}function De(re,P,ge,Ae){Be(re),Be(P),Be(Ae),Be(P),Be(ge),Be(Ae);const ue=r.length/3,_e=A.generateSideWallUV(i,r,ue-6,ue-3,ue-2,ue-1);He(_e[0]),He(_e[1]),He(_e[3]),He(_e[1]),He(_e[2]),He(_e[3])}function Be(re){r.push(l[re*3+0]),r.push(l[re*3+1]),r.push(l[re*3+2])}function He(re){s.push(re.x),s.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return t1(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new qh[r.type]().fromJSON(r)),new pf(i,e.options)}}const e1={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new he(s,o),new he(a,l),new he(c,h)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],f=e[r*3],p=e[r*3+1],v=e[r*3+2],x=e[s*3],g=e[s*3+1],d=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new he(o,1-l),new he(c,1-u),new he(f,1-v),new he(x,1-d)]:[new he(a,1-l),new he(h,1-u),new he(p,1-v),new he(g,1-d)]}};function t1(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class gf extends xn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],h=[];let u=e;const f=(n-e)/r,p=new O,v=new he;for(let x=0;x<=r;x++){for(let g=0;g<=i;g++){const d=s+g/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/n+1)/2,v.y=(p.y/n+1)/2,h.push(v.x,v.y)}u+=f}for(let x=0;x<r;x++){const g=x*(i+1);for(let d=0;d<i;d++){const A=d+g,m=A,C=A+i+1,w=A+i+2,S=A+1;a.push(m,C,S),a.push(C,w,S)}}this.setIndex(a),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gf(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mf extends xn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new O,f=new O,p=[],v=[],x=[],g=[];for(let d=0;d<=i;d++){const A=[],m=d/i;let C=0;d===0&&o===0?C=.5/n:d===i&&l===Math.PI&&(C=-.5/n);for(let w=0;w<=n;w++){const S=w/n;u.x=-e*Math.cos(r+S*s)*Math.sin(o+m*a),u.y=e*Math.cos(o+m*a),u.z=e*Math.sin(r+S*s)*Math.sin(o+m*a),v.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(S+C,1-m),A.push(c++)}h.push(A)}for(let d=0;d<i;d++)for(let A=0;A<n;A++){const m=h[d][A+1],C=h[d][A],w=h[d+1][A],S=h[d+1][A+1];(d!==0||o>0)&&p.push(m,C,S),(d!==i-1||l<Math.PI)&&p.push(C,w,S)}this.setIndex(p),this.setAttribute("position",new ft(v,3)),this.setAttribute("normal",new ft(x,3)),this.setAttribute("uv",new ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mf(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class n1 extends $o{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ev,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Gg={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class i1{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],v=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return v}return null}}}const r1=new i1;class Af{constructor(e){this.manager=e!==void 0?e:r1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Af.DEFAULT_MATERIAL_NAME="__DEFAULT";class s1 extends Af{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Gg.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Ho("img");function l(){h(),Gg.add(e,this),n&&n(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class n0 extends Af{constructor(e){super(e)}load(e,n,i,r){const s=new $t,o=new s1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class i0 extends Yt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const _u=new ot,Vg=new O,Hg=new O;class o1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lf,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Vg.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vg),Hg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Hg),n.updateMatrixWorld(),_u.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_u),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_u)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class a1 extends o1{constructor(){super(new Vv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class l1 extends i0{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new a1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class c1 extends i0{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Wg{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Rt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class u1 extends Ur{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qd);class h1{parse(e){let n="",i=0,r=0,s=0;const o=new O,a=new Je,l=new O,c=new he,h=[];function u(v){let x=0,g=0,d=0;const A=v.geometry,m=new je,C=A.getAttribute("position"),w=A.getAttribute("normal"),S=A.getAttribute("uv"),I=A.getIndex();if(n+="o "+v.name+`
`,v.material&&v.material.name&&(n+="usemtl "+v.material.name+`
`),C!==void 0)for(let T=0,z=C.count;T<z;T++,x++)o.fromBufferAttribute(C,T),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(S!==void 0)for(let T=0,z=S.count;T<z;T++,d++)c.fromBufferAttribute(S,T),n+="vt "+c.x+" "+c.y+`
`;if(w!==void 0){m.getNormalMatrix(v.matrixWorld);for(let T=0,z=w.count;T<z;T++,g++)l.fromBufferAttribute(w,T),l.applyMatrix3(m).normalize(),n+="vn "+l.x+" "+l.y+" "+l.z+`
`}if(I!==null)for(let T=0,z=I.count;T<z;T+=3){for(let _=0;_<3;_++){const y=I.getX(T+_)+1;h[_]=i+y+(w||S?"/"+(S?r+y:"")+(w?"/"+(s+y):""):"")}n+="f "+h.join(" ")+`
`}else for(let T=0,z=C.count;T<z;T+=3){for(let _=0;_<3;_++){const y=T+_+1;h[_]=i+y+(w||S?"/"+(S?r+y:"")+(w?"/"+(s+y):""):"")}n+="f "+h.join(" ")+`
`}i+=x,r+=d,s+=g}function f(v){let x=0;const g=v.geometry,d=v.type,A=g.getAttribute("position");if(n+="o "+v.name+`
`,A!==void 0)for(let m=0,C=A.count;m<C;m++,x++)o.fromBufferAttribute(A,m),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(d==="Line"){n+="l ";for(let m=1,C=A.count;m<=C;m++)n+=i+m+" ";n+=`
`}if(d==="LineSegments")for(let m=1,C=m+1,w=A.count;m<w;m+=2,C=m+1)n+="l "+(i+m)+" "+(i+C)+`
`;i+=x}function p(v){let x=0;const g=v.geometry,d=g.getAttribute("position"),A=g.getAttribute("color");if(n+="o "+v.name+`
`,d!==void 0){for(let m=0,C=d.count;m<C;m++,x++)o.fromBufferAttribute(d,m),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z,A!==void 0&&(a.fromBufferAttribute(A,m),qe.fromWorkingColorSpace(a,zn),n+=" "+a.r+" "+a.g+" "+a.b),n+=`
`;n+="p ";for(let m=1,C=d.count;m<=C;m++)n+=i+m+" ";n+=`
`}i+=x}return e.traverse(function(v){v.isMesh===!0&&u(v),v.isLine===!0&&f(v),v.isPoints===!0&&p(v)}),n}}const jg={type:"change"},vf={type:"start"},r0={type:"end"},Wa=new Lv,Xg=new ki,d1=Math.cos(70*Tv.DEG2RAD),wt=new O,rn=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Cu=1e-6;class f1 extends u1{constructor(e,n=null){super(e,n),this.state=st.NONE,this.enabled=!0,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xs.ROTATE,MIDDLE:xs.DOLLY,RIGHT:xs.PAN},this.touches={ONE:ds.ROTATE,TWO:ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Pr,this._lastTargetPosition=new O,this._quat=new Pr().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wg,this._sphericalDelta=new Wg,this._scale=1,this._panOffset=new O,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new O,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=g1.bind(this),this._onPointerDown=p1.bind(this),this._onPointerUp=m1.bind(this),this._onContextMenu=I1.bind(this),this._onMouseWheel=_1.bind(this),this._onKeyDown=C1.bind(this),this._onTouchStart=x1.bind(this),this._onTouchMove=y1.bind(this),this._onMouseDown=A1.bind(this),this._onMouseMove=v1.bind(this),this._interceptControlDown=M1.bind(this),this._interceptControlUp=S1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jg),this.update(),this.state=st.NONE}update(e=null){const n=this.object.position;wt.copy(n).sub(this.target),wt.applyQuaternion(this._quat),this._spherical.setFromVector3(wt),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=rn:i>Math.PI&&(i-=rn),r<-Math.PI?r+=rn:r>Math.PI&&(r-=rn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(wt.setFromSpherical(this._spherical),wt.applyQuaternion(this._quatInverse),n.copy(this.target).add(wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=wt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Wa.origin.copy(this.object.position),Wa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wa.direction))<d1?this.object.lookAt(this.target):(Xg.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wa.intersectPlane(Xg,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Cu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Cu||this._lastTargetPosition.distanceToSquared(this.target)>Cu?(this.dispatchEvent(jg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?rn/60*this.autoRotateSpeed*e:rn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){wt.setFromMatrixColumn(n,0),wt.multiplyScalar(-e),this._panOffset.add(wt)}_panUp(e,n){this.screenSpacePanning===!0?wt.setFromMatrixColumn(n,1):(wt.setFromMatrixColumn(n,0),wt.crossVectors(this.object.up,wt)),wt.multiplyScalar(e),this._panOffset.add(wt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;wt.copy(r).sub(this.target);let s=wt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/n.clientHeight),this._rotateUp(rn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(rn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-rn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(rn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-rn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/n.clientHeight),this._rotateUp(rn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new he,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function p1(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function g1(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function m1(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(r0),this.state=st.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function A1(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case xs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=st.DOLLY;break;case xs.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}break;case xs.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(vf)}function v1(t){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function _1(t){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(t.preventDefault(),this.dispatchEvent(vf),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(r0))}function C1(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function x1(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=st.TOUCH_ROTATE;break;case ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=st.TOUCH_DOLLY_PAN;break;case ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(vf)}function y1(t){switch(this._trackPointer(t),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=st.NONE}}function I1(t){this.enabled!==!1&&t.preventDefault()}function M1(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function S1(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Jn=Math.PI/180,E1=[[0,0],[30*Jn,15*Jn],[90*Jn,0],[150*Jn,-15*Jn],[180*Jn,0],[-90*Jn,0],[0,-80*Jn],[45*Jn,-45*Jn]];function w1([t,e,n]){return new Je(t/255,e/255,n/255)}function _f(t,e){return e==="finished"?{color:t.color,shine:t.shine,decal:t.decal,translucent:!1}:{color:t.default_color,shine:t.default_shine,decal:t.default_decal,translucent:e==="unfinished"&&!!t.translucent_unfinished}}const T1=`
  varying vec3 vColor; varying vec2 vUv;
  uniform vec3 uMatColor, uSpec, uLightDir;
  uniform float uAmb, uDif, uShin;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 N = normalize(normalMatrix * normal);
    vec3 V = normalize(-mv.xyz);
    if (dot(N, V) < 0.0) N = -N;            // two-sided
    vec3 L = normalize(uLightDir);          // eye-space directional
    float d = max(dot(N, L), 0.0);
    float s = d > 0.0 ? pow(max(dot(N, normalize(L + V)), 0.0), uShin) : 0.0;
    vec3 c = uMatColor * uAmb + uMatColor * uDif * d + uSpec * s;
    vColor = clamp(c, 0.0, 1.0);
    gl_Position = projectionMatrix * mv;
  }`,R1=`
  varying vec3 vColor; varying vec2 vUv;
  uniform float uOpacity, uUseMap; uniform sampler2D uMap;
  uniform mat3 uTexMatrix;
  void main() {
    // Apply OpenRocket's decal texture matrix (scale/offset/rot/flip) —
    // custom ShaderMaterials don't auto-apply texture.matrix the way
    // built-in materials do, so we transform the UV here. CLAMP/REPEAT
    // is handled by the texture's wrap mode on sampling.
    vec2 tuv = (uTexMatrix * vec3(vUv, 1.0)).xy;
    vec4 t = uUseMap > 0.5 ? texture2D(uMap, tuv) : vec4(1.0);
    gl_FragColor = vec4(vColor * t.rgb, uOpacity * (uUseMap > 0.5 ? t.a : 1.0));
  }`;function Yg(t){const e=new Ei({vertexShader:T1,fragmentShader:R1,side:gn,uniforms:{uMatColor:{value:t.color},uSpec:{value:t.spec},uShin:{value:Math.max(t.shin,1)},uAmb:{value:t.amb},uDif:{value:t.dif},uOpacity:{value:t.opacity},uUseMap:{value:0},uMap:{value:null},uTexMatrix:{value:new je},uLightDir:{value:new O(1,4,1)}}});return t.opacity<.999&&(e.transparent=!0,e.depthWrite=!1),e}function s0(t,e){t.uniforms.uMap.value=e,t.uniforms.uUseMap.value=1,e.matrixAutoUpdate&&e.updateMatrix(),t.uniforms.uTexMatrix.value.copy(e.matrix),t.needsUpdate=!0}function td(t,e){const n=e==="figure"?1:.7692307692307692,i=(e==="figure"?.3:.5)*n,r=(e==="figure"?.7:1)*n;if(e==="figure"){const[l,c,h]=t.figure_color,u=g=>Math.max(.2,g/255)*2,f=new Je(u(l),u(c),u(h)),p=40,v=p/128,x=new Je(Math.max(f.r,.9)*v,Math.max(f.g,.9)*v,Math.max(f.b,.9)*v);return Yg({color:f,spec:x,shin:p,amb:i,dif:r,opacity:1})}const s=_f(t,e),o=Tv.clamp(s.shine,0,1),a=s.translucent?.2:(s.color[3]??255)/255;return Yg({color:w1(s.color),spec:new Je(o,o,o),shin:100*o,amb:i,dif:r,opacity:a})}function Zg(t){return t==="CLAMP"||t==="STICKER"?Wi:t==="MIRROR"?Nl:Os}const o0=t=>t.url.startsWith("/textures/");function b1(t){const e=new n0().load(t.url);e.colorSpace=Yn,e.wrapS=Zg(t.edge_mode),e.wrapT=Zg(t.edge_mode),e.matrixAutoUpdate=!1;const[n,i]=t.center,[r,s]=[t.scale[0]||1,t.scale[1]||1],[o,a]=t.offset,l=t.rotation||0,c=(g,d)=>new je().set(1,0,g,0,1,d,0,0,1),h=Math.cos(l),u=Math.sin(l),f=new je().set(h,-u,0,u,h,0,0,0,1),p=new je().set(r,0,0,0,s,0,0,0,1),v=c(-n,-i).multiply(f).multiply(c(n,i)).multiply(p).multiply(c(o,a)),x=new je().set(-1,0,1,0,-1,1,0,0,1);return e.matrix.copy(x.multiply(v)),e}function a0(t,e,n){const i=new n0().load(t);return i.colorSpace=Yn,i.wrapS=Os,i.wrapT=Os,i.repeat.set(Math.max(e,1),Math.max(n,1)),i}const Bl=.007;function P1(t,e,n){const i=new Ai,r=td(t.mat,e);n.push(r);const s=_f(t.mat,e),o=e==="figure"&&(t.kind==="BodyTube"||t.kind==="Transition"&&!(t.cap_fore&&t.cap_aft));o&&(r.transparent=!0,r.depthWrite=!1,r.side=Mi,r.uniforms.uOpacity.value=.2,i.renderOrder=3);const a=g=>g.map(([d,A])=>new he(Math.max(A,1e-5),d)),l=g=>{const d=g.attributes.position;let A=1/0,m=-1/0;for(let S=0;S<d.count;S++){const I=d.getY(S);I<A&&(A=I),I>m&&(m=I)}const C=m-A||1,w=g.attributes.uv;for(let S=0;S<d.count;S++){let I=Math.atan2(d.getX(S),d.getZ(S));I<0&&(I+=Math.PI*2),w.setXY(S,I/(Math.PI*2),(d.getY(S)-A)/C)}w.needsUpdate=!0},c=new zl(a(t.outer),96);l(c),n.push(c);const h=new kt(c,r);if(h.rotation.z=-Math.PI/2,i.add(h),e!=="figure"&&s.decal){const g=s.decal;let d;if(o0(g)){const C=t.outer.map(([,I])=>I).filter(I=>I>1e-5),w=C.length?Math.max(...C):.01,S=t.outer[t.outer.length-1][0]-t.outer[0][0]||.05;d=a0(g.url,Math.round(2*Math.PI*w/Bl),Math.round(Math.abs(S)/Bl))}else d=b1(g);n.push(d);const A=r.clone();s0(A,d),A.uniforms.uMatColor.value.setRGB(1,1,1),A.uniforms.uSpec.value.setRGB(0,0,0),A.transparent=!0,A.depthWrite=!s.translucent,A.polygonOffset=!0,A.polygonOffsetFactor=-1,A.polygonOffsetUnits=-1,n.push(A);const m=new kt(c,A);m.rotation.z=-Math.PI/2,i.add(m)}const u=g=>{g.transparent=!1,g.depthWrite=!0,g.uniforms.uOpacity.value=1,g.uniforms.uMatColor.value.multiplyScalar(.7),g.uniforms.uSpec.value.setRGB(0,0,0)},p=Math.max(...t.inner.map(([,g])=>g))>1e-4;if(p){const g=new zl(a(t.inner),96);n.push(g);const d=r.clone();d.side=Xt,o&&u(d),n.push(d);const A=new kt(g,d);A.rotation.z=-Math.PI/2,i.add(A)}else if(o){const g=r.clone();g.side=Xt,u(g),n.push(g);const d=new kt(c,g);d.rotation.z=-Math.PI/2,i.add(d)}const v=r.clone();v.side=gn,n.push(v);const x=(g,d,A)=>{const m=A>1e-4?new gf(A,d,96):new df(d,96);n.push(m);const C=new kt(m,v);return C.rotation.y=Math.PI/2,C.position.x=g,C};if(t.cap_fore){const g=t.outer[0],d=t.inner[0];i.add(x(g[0],g[1],p?d[1]:0))}if(t.cap_aft){const g=t.outer[t.outer.length-1],d=t.inner[t.inner.length-1];i.add(x(g[0],g[1],p?d[1]:0))}return s.translucent&&(i.renderOrder=2),i}function l0(t,e){const n=new Ai,i=[],r=(s,o,a)=>{if(!o)return s;s.position.y=o;const l=new Ai;return l.add(s),l.rotation.x=a||0,l};for(const s of t.lathe)s.outer.length<2||n.add(r(P1(s,e,i),s.radial,s.radial_angle));for(const s of t.fins){const o=new qv;if(s.outline&&s.outline.length>=3){o.moveTo(s.outline[0][0],s.outline[0][1]);for(let p=1;p<s.outline.length;p++)o.lineTo(s.outline[p][0],s.outline[p][1]);o.lineTo(s.outline[0][0],s.outline[0][1])}else o.moveTo(0,0),o.lineTo(s.root_chord,0),o.lineTo(s.sweep+s.tip_chord,s.height),o.lineTo(s.sweep,s.height),o.lineTo(0,0);const a=Math.max(s.thickness,1e-4),l=s.cross_section==="rounded"||s.cross_section==="airfoil",c=l?Math.min(a*.45,s.root_chord*.05):0,h=new pf(o,{depth:Math.max(a-2*c,1e-4),bevelEnabled:l,bevelThickness:c,bevelSize:c,bevelSegments:2,steps:1});h.translate(0,0,-a/2);const u=td(s.mat,e);u.side=gn;const f=_f(s.mat,e);if(e!=="figure"&&f.decal&&o0(f.decal)){const p=Math.max(s.root_chord,s.height,.02),v=a0(f.decal.url,Math.max(Math.round(p/Bl),1),Math.max(Math.round(p/Bl),1));i.push(v),s0(u,v)}i.push(h,u);for(let p=0;p<s.count;p++){const v=new kt(h,u);v.rotation.y=s.cant_angle,v.position.set(s.axial_start,s.body_radius,0);const x=new Ai;x.add(v),x.rotation.x=s.angle_offset+p/s.count*Math.PI*2,n.add(r(x,s.radial,s.radial_angle))}}for(const s of t.lugs){const o=new ff(s.outer_radius,s.outer_radius,Math.max(s.length,1e-4),24,1,!0);o.rotateZ(Math.PI/2);const a=td(s.mat,e);a.side=gn,i.push(o,a);for(let l=0;l<s.count;l++){const c=new kt(o,a);c.position.set(s.axial_start+s.length*(.5+l*1.2),s.body_radius+s.outer_radius,0);const h=new Ai;h.add(c),h.rotation.x=s.angle_offset,n.add(r(h,s.radial,s.radial_angle))}}return{group:n,bin:i}}function c0({rv:t,mode:e="finished",preset:n="3d",raw:i=null,keyBg:r=!1}){const s=pe.useRef(null);return pe.useEffect(()=>{const o=s.current;if(!o)return;const a=o.clientWidth,l=o.clientHeight;qe.enabled=!1;const c=new Iw;c.background=r?new Je(1,0,1):new Je(254/255,243/255,199/255);const h=new yw({antialias:!0,preserveDrawingBuffer:!0});h.setPixelRatio(i!=null?1:Math.min(window.devicePixelRatio,2)),h.setSize(a,l),h.toneMapping=_i,h.outputColorSpace=Yn,h.sortObjects=!0,o.appendChild(h.domElement);const u=new En(15,a/l,.01,50);c.add(u);const f=Math.PI,p=(e==="figure"?.3:.5)*f,v=(e==="figure"?.7:1)*f;c.add(new c1(16777215,p));const x=new l1(16777215,v);x.position.set(1,4,1),u.add(x),u.add(x.target),x.target.position.set(0,0,0);const{group:g,bin:d}=l0(t,e);c.add(g),g.updateWorldMatrix(!0,!0);const A=new Hs().setFromObject(g);if(A.isEmpty())return h.render(c,u),()=>{d.forEach(J=>J.dispose()),h.dispose(),o.removeChild(h.domElement)};const m=A.min,C=A.max,w=Math.max(C.x-m.x,1e-4),S=(m.x+C.x)/2,I=Math.max(Math.hypot(m.y,m.z),Math.hypot(C.y,C.z),Math.hypot(m.y,C.z),Math.hypot(C.y,m.z),1e-4),T=new O(S,0,0);if(i!=null){const[J,q]=E1[i]??[0,0],ie=Math.max(Math.hypot(m.y,m.z),Math.hypot(C.y,C.z),1e-4),le=a/Math.max(l,1),ve=15*le,V=w*1.2/2/Math.tan(ve*Math.PI/360),ne=2*ie*1.2/2/Math.tan(15*Math.PI/360),oe=Math.max(V,ne,.001),ae=new ot().makeRotationY(J),ke=new ot().makeRotationX(q),De=new ot().makeTranslation(-S,0,0),Be=new ot().makeScale(1,1,-1),He=ae.multiply(ke).multiply(De).multiply(Be);g.matrixAutoUpdate=!1,g.matrix.copy(He),g.matrixWorldNeedsUpdate=!0,g.updateMatrixWorld(!0),u.fov=15,u.aspect=le,u.near=.1,u.far=50,u.up.set(0,1,0),u.position.set(0,0,oe),u.lookAt(0,0,0),u.updateProjectionMatrix(),h.render(c,u);let re=0,P=0;const ge=()=>{h.render(c,u),++re<8&&(P=requestAnimationFrame(ge))};return P=requestAnimationFrame(ge),()=>{cancelAnimationFrame(P),d.forEach(Ae=>Ae.dispose()),h.dispose(),o.removeChild(h.domElement)}}if(e!=="figure"){const J=Math.max(Math.min(...t.lathe.flatMap(ie=>ie.outer.map(([,le])=>le)).filter(ie=>ie>1e-4),I),.0025),q=(ie,le,ve)=>{const V=new n1({color:ie,roughness:.5,metalness:0}),ne=new mf(J*ve,20,14);d.push(V,ne);const oe=new kt(ne,V);oe.position.set(le,0,0),oe.renderOrder=3,g.add(oe)};q(2845951,t.cg_axial,.95),q(14753070,t.cp_axial,.8)}const z=15,_=J=>J*Math.PI/180,y=(J,q)=>{const ie=J/Math.max(q,1),le=z*ie,ve=w*1.2/2/Math.tan(_(le)/2),V=2*I*1.2/2/Math.tan(_(z)/2);return Math.max(ve,V,.001)};let L=y(a,l);u.near=Math.max(L/100,.001),u.far=L*100+w*8,(()=>{switch(n){case"top":u.position.set(T.x,L,0),u.up.set(0,0,-1);break;case"back":u.position.set(T.x+L,0,0),u.up.set(0,1,0);break;default:u.position.set(T.x,0,L),u.up.set(0,1,0)}u.lookAt(T),u.updateProjectionMatrix()})();const G=new f1(u,h.domElement);G.enableDamping=!0,G.target.copy(T);let Z=0;const B=()=>{Z=requestAnimationFrame(B),G.update(),h.render(c,u)};B();const Q=()=>{const J=o.clientWidth,q=o.clientHeight;u.aspect=J/q,L=y(J,q),u.near=Math.max(L/100,.001),u.far=L*100+w*8;const ie=u.position.clone().sub(G.target).normalize();u.position.copy(G.target).addScaledVector(ie,L),u.updateProjectionMatrix(),h.setSize(J,q)},D=new ResizeObserver(Q);return D.observe(o),()=>{cancelAnimationFrame(Z),D.disconnect(),G.dispose(),d.forEach(J=>J.dispose()),h.dispose(),o.removeChild(h.domElement)}},[t,e,n,i,r]),R.jsx("div",{ref:s,style:{width:"100%",height:"100%"}})}function Cf(t){return(t||"rocket").replace(/\W+/g,"_").replace(/^_+|_+$/g,"")||"rocket"}function u0(t,e){const n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function L1(t,e,n){const i="time_s,altitude_m,velocity_ms,thrust_N",r=t.time.map((o,a)=>`${o},${t.altitude[a]},${t.velocity[a]},${t.thrust[a]}`),s=new Blob([i+`
`+r.join(`
`)],{type:"text/csv"});u0(s,`${Cf(e)}_${n||"sim"}.csv`)}function D1(t){const e=document.querySelector(".viewport canvas");if(!e)return!1;const n=e.toDataURL("image/png"),i=document.createElement("a");return i.href=n,i.download=`${Cf(t)}.png`,i.click(),!0}function N1(t,e){const{group:n,bin:i}=l0(t,"finished");try{n.updateMatrixWorld(!0);const r=new h1().parse(n);u0(new Blob([r],{type:"model/obj"}),`${Cf(e)}.obj`)}finally{i.forEach(r=>r.dispose())}}const Jg=30,U1=20;function Gl(t){const[e,n,i]=t.figure_color;return`rgb(${e},${n},${i})`}function O1(t,e){return t==="Motor"?{stroke:"rgb(120,120,120)",fill:"rgb(150,150,150)",dash:""}:t==="Parachute"||t==="ShockCord"||t==="MassObject"?{stroke:Gl(e),fill:"none",dash:"6 4"}:t==="InnerTube"||t==="CenteringRing"?{stroke:"rgb(170,0,100)",fill:"none",dash:""}:{stroke:Gl(e),fill:"none",dash:""}}function h0({rv:t,raw:e=!1,rollDeg:n=0,overlay:i=null,onRollDelta:r}){const s=pe.useRef(null),o=pe.useRef(r);return o.current=r,pe.useEffect(()=>{const a=s.current;if(!a||e)return;let l=null;const c=f=>{l=f.clientY,a.setPointerCapture?.(f.pointerId),a.style.cursor="ns-resize"},h=f=>{if(l==null||!o.current)return;const p=f.clientY-l;l=f.clientY,p&&o.current(p*.6)},u=()=>{l=null,a.style.cursor="grab"};return a.style.cursor="grab",a.addEventListener("pointerdown",c),a.addEventListener("pointermove",h),a.addEventListener("pointerup",u),a.addEventListener("pointerleave",u),()=>{a.removeEventListener("pointerdown",c),a.removeEventListener("pointermove",h),a.removeEventListener("pointerup",u),a.removeEventListener("pointerleave",u)}},[e]),pe.useEffect(()=>{const a=s.current;if(!a)return;const l=e?1280:a.clientWidth||1e3,c=e?720:a.clientHeight||300,h=n*Math.PI/180;a.width=l,a.height=c;const u=a.getContext("2d");u.fillStyle="rgb(254,243,199)",u.fillRect(0,0,l,c);let f=1/0,p=-1/0,v=1e-4;for(const I of t.lathe){const T=Math.abs(I.radial||0);for(const[z,_]of I.outer)f=Math.min(f,z),p=Math.max(p,z),v=Math.max(v,_+T)}for(const I of t.fins){const T=(I.radial||0)+I.body_radius,z=I.outline&&I.outline.length?I.outline.map(([y])=>y):[0,I.root_chord,I.sweep+I.tip_chord,I.sweep],_=I.outline&&I.outline.length?Math.max(...I.outline.map(([,y])=>y)):I.height;f=Math.min(f,I.axial_start+Math.min(...z)),p=Math.max(p,I.axial_start+Math.max(...z)),v=Math.max(v,T+_)}for(const I of t.lugs)f=Math.min(f,I.axial_start),p=Math.max(p,I.axial_start+I.length),v=Math.max(v,(I.radial||0)+I.body_radius+I.outer_radius);isFinite(f)||(f=0,p=Math.max(t.total_length,1e-4));const x=Math.max(p-f,1e-4),g=Math.min((l-2*Jg)/x,(c-2*U1)/(2*v)),d=(l-x*g)/2-f*g,A=c/2,m=I=>d+I*g,C=I=>A-I*g,w=(I,T)=>(I||0)*Math.cos((T||0)-h),S=(I,T,z=!0)=>{if(!(I.length<2)){u.beginPath(),u.moveTo(I[0][0],I[0][1]);for(let _=1;_<I.length;_++)u.lineTo(I[_][0],I[_][1]);z&&u.closePath(),u.setLineDash(T.dash?T.dash.split(" ").map(Number):[]),T.fill!=="none"&&(u.fillStyle=T.fill,u.fill()),u.strokeStyle=T.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([])}};u.strokeStyle="rgb(200,200,200)",u.setLineDash([4,4]),u.beginPath(),u.moveTo(m(f),A),u.lineTo(m(f+x),A),u.stroke(),u.setLineDash([]);for(const I of t.lathe){if(I.outer.length<2)continue;const T=w(I.radial,I.radial_angle),z=O1(I.kind,I.mat);if(I.kind==="Parachute"||I.kind==="ShockCord"||I.kind==="MassObject"){const L=I.outer[0][0],N=I.outer[I.outer.length-1][0],G=Math.max(...I.outer.map(([,le])=>le)),Z=Math.abs(N-L),B=Math.min(Z,2*G)*.7,Q=m(L),D=m(N),J=C(T+G),q=C(T-G),ie=B*g;if(u.beginPath(),u.roundRect(Math.min(Q,D),Math.min(J,q),Math.abs(D-Q),Math.abs(q-J),Math.max(0,Math.min(ie,Math.abs(D-Q)/2))),u.setLineDash(z.dash?z.dash.split(" ").map(Number):[]),u.strokeStyle=z.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([]),I.kind==="Parachute"){const le=(L+N)/2,ve=T,V=Z;let oe=2*G/2;oe>.75*V&&(oe=.75*V);const ae=ve+3*oe/4,ke=ve-oe/4;u.strokeStyle=z.stroke,u.lineWidth=1,u.beginPath(),u.arc(m(le),C(ke),oe/2*g,Math.PI,2*Math.PI),u.stroke();const De=(Be,He,re,P)=>{u.beginPath(),u.moveTo(m(Be),C(He)),u.lineTo(m(re),C(P)),u.stroke()};De(le-oe/2,ve-oe/4,le,ae),De(le,ae,le+oe/2,ve-oe/4),De(le-oe/4,ve-oe/4,le,ae),De(le,ae,le+oe/4,ve-oe/4),De(le,ve-oe/4,le,ae)}if(I.kind==="ShockCord"){const le=L+Z/4,ve=Z/2,V=T,ne=2*G/4,oe=ve/4;u.strokeStyle=z.stroke,u.lineWidth=1,u.beginPath(),u.moveTo(m(le),C(V));for(let ae=0;ae<4;ae++)u.bezierCurveTo(m(le+(4*ae+1)*oe/4),C(V+ne),m(le+(4*ae+1)*oe/4),C(V+ne),m(le+(4*ae+2)*oe/4),C(V)),u.bezierCurveTo(m(le+(4*ae+3)*oe/4),C(V-ne),m(le+(4*ae+3)*oe/4),C(V-ne),m(le+(4*ae+4)*oe/4),C(V));u.stroke()}continue}const _=I.outer.map(([L,N])=>[m(L),C(N+T)]),y=I.outer.slice().reverse().map(([L,N])=>[m(L),C(-N+T)]);S([..._,...y],z,!0)}for(const I of t.fins){const T=w(I.radial,I.radial_angle),z=I.body_radius;let _;I.outline&&I.outline.length>=3?_=I.outline.map(([N,G])=>[N,G]):_=[[0,0],[I.root_chord,0],[I.sweep+I.tip_chord,I.height],[I.sweep,I.height]];const y={stroke:Gl(I.mat),fill:"none",dash:""},L=Math.max(I.count,1);for(let N=0;N<L;N++){const G=(I.radial_angle||0)+I.angle_offset+N/L*Math.PI*2,Z=Math.cos(G-h);S(_.map(([B,Q])=>[m(I.axial_start+B),C(T+(z+Q)*Z)]),y,!0)}}for(const I of t.lugs){const T=w(I.radial,I.radial_angle)+I.body_radius,z={stroke:Gl(I.mat),fill:"none",dash:""};S([[m(I.axial_start),C(T)],[m(I.axial_start+I.length),C(T)],[m(I.axial_start+I.length),C(T+I.outer_radius)],[m(I.axial_start),C(T+I.outer_radius)]],z,!0)}if(i&&!e){u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.font="11px -apple-system, Helvetica, Arial, sans-serif",u.textAlign="center",u.textBaseline="top",u.lineWidth=1,u.beginPath(),u.moveTo(m(0),20),u.lineTo(m(Math.ceil(p*100)/100),20);const T=Math.ceil(p*100);for(let ve=0;ve<=T;ve++){const V=m(ve/100),ne=ve%5===0;u.moveTo(V,20),u.lineTo(V,20+(ne?9:ve%1===0?5:3)),ne&&u.fillText(String(ve),V,31)}u.stroke();const z=20,_=Math.ceil(v*100);u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.textAlign="right",u.textBaseline="middle",u.beginPath(),u.moveTo(z,Math.max(C(v),0)),u.lineTo(z,Math.min(C(-v),c));for(let ve=-_;ve<=_;ve++){const V=C(ve/100);if(V<0||V>c)continue;const ne=ve%5===0;u.moveTo(z,V),u.lineTo(z+(ne?9:5),V),ne&&u.fillText(String(Math.abs(ve)),z-3,V)}u.stroke();const y=Math.max(m(0),Jg)+8,L="13px -apple-system, Helvetica, Arial, sans-serif";u.textBaseline="alphabetic";const N=19;u.textAlign="left",u.fillStyle="rgb(28,40,90)",u.font=L;let G=54;const Z=i.mass_motors_g!=null?`${i.mass_motors_g.toFixed(i.mass_motors_g<100?1:0)} g`:"—";for(const ve of[i.name,`Length ${i.length_cm.toFixed(1)} cm, max. diameter ${i.max_diam_cm.toFixed(1)} cm`,`Mass with no motors ${i.mass_g.toFixed(1)} g`,`Mass with motors ${Z}`])u.fillText(ve,y,G),G+=N;const B=l-12;u.textAlign="right";let Q=54;u.fillStyle="rgb(28,40,90)",u.fillText(`Stability: ${i.margin_cal.toFixed(2)} cal / ${i.margin_pct.toFixed(2)} %`,B,Q),Q+=N;const D=(ve,V,ne)=>{if(ne==="cg"){u.beginPath(),u.arc(ve,V,6.5,0,Math.PI*2),u.fillStyle="#fff",u.fill();for(const ae of[-Math.PI/2,Math.PI/2])u.beginPath(),u.moveTo(ve,V),u.arc(ve,V,6.5,ae,ae+Math.PI/2),u.closePath(),u.fillStyle="#3552d6",u.fill();u.beginPath(),u.arc(ve,V,6.5,0,Math.PI*2),u.strokeStyle="#1a1a1a",u.lineWidth=1,u.stroke()}else u.beginPath(),u.arc(ve,V,6.5,0,Math.PI*2),u.fillStyle="#d3202a",u.fill(),u.strokeStyle="#7a1014",u.lineWidth=1,u.stroke()},J=`CG: ${i.cg_cm.toFixed(1)} cm`,q=`CP: ${i.cp_cm.toFixed(1)} cm`;u.fillStyle="rgb(28,40,90)",u.fillText(J,B,Q),D(B-u.measureText(J).width-12,Q-5,"cg"),Q+=N,u.fillStyle="rgb(28,40,90)",u.fillText(q,B,Q),D(B-u.measureText(q).width-12,Q-5,"cp"),Q+=N,u.fillStyle="rgb(140,140,140)",u.fillText(`at M=${i.mach.toFixed(3)}`,B,Q),u.textAlign="left",u.fillStyle="rgb(43,63,174)",u.font=L;let ie=c*.6;const le=(ve,V)=>{u.fillText(ve,y,ie),u.fillText(V,y+150,ie),ie+=N};le("Flight configuration:",i.config_name),i.apogee_m!=null&&le("Apogee:",`${i.apogee_m.toFixed(0)} m`),i.max_velocity_ms!=null&&le("Max. velocity:",`${i.max_velocity_ms.toFixed(1)} m/s`+(i.max_velocity_mach!=null?`  (Mach ${i.max_velocity_mach.toFixed(3)})`:"")),i.max_accel_ms2!=null&&le("Max. acceleration:",`${i.max_accel_ms2.toFixed(0)} m/s²`),D(m(i.cg_cm/100),A,"cg"),D(m(i.cp_cm/100),A,"cp")}},[t,e,n,i]),R.jsx("canvas",{ref:s,style:e?{width:1280,height:720,display:"block"}:{width:"100%",height:"100%"}})}function F1({fd:t}){const a=Math.max(...t.time,1),l=Math.max(...t.altitude,1),c=Math.max(...t.velocity,1),h=v=>50+v/a*800,u=v=>220-v/l*200,f=v=>220-v/c*200,p=v=>t.time.map((x,g)=>`${g===0?"M":"L"}${h(x).toFixed(1)},${v(g).toFixed(1)}`).join(" ");return R.jsxs("svg",{viewBox:"0 0 900 250",style:{width:"100%",height:"100%"},preserveAspectRatio:"xMidYMid meet",children:[R.jsx("line",{x1:50,y1:220,x2:850,y2:220,stroke:"#e7d8b0"}),R.jsx("line",{x1:50,y1:20,x2:50,y2:220,stroke:"#e7d8b0"}),R.jsx("path",{d:p(v=>u(t.altitude[v])),fill:"none",stroke:"#ec4899",strokeWidth:2}),R.jsx("path",{d:p(v=>f(t.velocity[v])),fill:"none",stroke:"#3a2a1a",strokeWidth:1.5,opacity:.7}),t.events.filter(([v])=>v<=a).map(([v,x],g)=>R.jsxs("g",{children:[R.jsx("line",{x1:h(v),y1:20,x2:h(v),y2:220,stroke:"#be2768",strokeDasharray:"3 3",opacity:.4}),R.jsx("text",{x:h(v)+3,y:30+g%3*12,fontSize:9,fill:"#9a7b56",children:x.replace(/_/g," ").toLowerCase()})]},g)),R.jsxs("text",{x:50,y:14,fontSize:11,fill:"#ec4899",children:["altitude (m), max ",l.toFixed(1)]}),R.jsxs("text",{x:730,y:14,fontSize:11,fill:"#3a2a1a",children:["velocity (m/s), max ",c.toFixed(1)]}),R.jsxs("text",{x:900/2,y:244,fontSize:10,fill:"#9a7b56",textAnchor:"middle",children:["time (s) — ",a.toFixed(1)," s"]})]})}const Kg=[{key:"general",label:"General"},{key:"shoulder",label:"Shoulder"},{key:"override",label:"Override"},{key:"appearance",label:"Appearance"},{key:"comment",label:"Comment"}];let Ss=null;function k1({f:t,materials:e,onCommit:n}){const[i,r]=pe.useState(String(t.value??"")),[s,o]=pe.useState(!1),a=String(t.value??"");if(!s&&i!==a&&r(a),t.kind==="bool")return R.jsxs("label",{className:"prop-row",children:[R.jsx("span",{className:"prop-label",children:t.label}),R.jsx("input",{type:"checkbox",checked:t.value===!0,onChange:h=>n(h.target.checked)})]});if(t.kind==="enum")return R.jsxs("div",{className:"prop-row",children:[R.jsx("span",{className:"prop-label",children:t.label}),R.jsx($i,{value:String(t.value),onChange:h=>n(h),options:(t.options??[]).map(h=>({value:h,label:h}))})]});if(t.kind==="color"){const h=a.startsWith("#")?a:`#${a.replace(/[^0-9a-fA-F]/g,"")}`,u=h.length>=7?h.slice(0,7):"#cccccc",f=h.length>=9?h.slice(7,9):"ff";return R.jsxs("label",{className:"prop-row",children:[R.jsx("span",{className:"prop-label",children:t.label}),R.jsx("span",{className:"prop-input",children:R.jsx("input",{type:"color",value:u,onChange:p=>{n(`${p.target.value}${f}`.toUpperCase())}})})]})}if(t.key==="material_name")return R.jsxs("label",{className:"prop-row",children:[R.jsx("span",{className:"prop-label",children:t.label}),R.jsxs("span",{className:"prop-input",children:[R.jsx("input",{list:"opsrocket-materials",type:"text",value:i,onChange:h=>{o(!0),r(h.target.value)},onBlur:()=>{o(!1),i!==a&&n(i)},onKeyDown:h=>{h.key==="Enter"&&h.target.blur()}}),R.jsx("datalist",{id:"opsrocket-materials",children:e.map(h=>R.jsxs("option",{value:h.name,children:[h.density," ",h.kind==="bulk"?"kg/m³":h.kind==="surface"?"kg/m²":"kg/m"," · ",h.group]},h.name))})]})]});const l=t.kind==="length"||t.kind==="number"||t.kind==="angle"||t.kind==="mass"||t.kind==="int",c=()=>{o(!1),i!==a&&n(l?Number(i):i)};return R.jsxs("label",{className:"prop-row",children:[R.jsx("span",{className:"prop-label",children:t.label}),R.jsxs("span",{className:"prop-input",children:[R.jsx("input",{type:l?"number":"text",step:t.kind==="int"?1:"any",value:i,onChange:h=>{o(!0),r(h.target.value)},onBlur:c,onKeyDown:h=>{h.key==="Enter"&&h.target.blur(),h.key==="Escape"&&(o(!1),r(a))}}),t.unit&&R.jsx("em",{className:"unit",children:t.unit})]})]})}function d0({fields:t,onCommit:e}){const[n,i]=pe.useState(Ss??[]);return pe.useEffect(()=>{Ss||uv().then(r=>{Ss=r.materials,i(r.materials)}).catch(()=>{})},[]),R.jsx(R.Fragment,{children:t.map(r=>R.jsx(k1,{f:r,materials:n,onCommit:s=>e(r.key,s)},r.key))})}function z1(t){const e=new Map,n=[];for(const s of t){const o=s.section??"general";e.has(o)||(e.set(o,[]),n.push(o)),e.get(o).push(s)}const i=Kg.map(s=>s.key);return[...i.filter(s=>e.has(s)),...n.filter(s=>!i.includes(s))].map(s=>({key:s,label:Kg.find(o=>o.key===s)?.label??s.charAt(0).toUpperCase()+s.slice(1),rows:e.get(s)}))}function B1({node:t,onPatch:e,busy:n}){const[i,r]=pe.useState(Ss??[]);pe.useEffect(()=>{Ss||uv().then(u=>{Ss=u.materials,r(u.materials)}).catch(()=>{})},[]);const[s,o]=pe.useState(null);pe.useEffect(()=>{if(!t){o(null);return}let u=!0;return WC(t.id).then(f=>{u&&o(f.mass_g)}).catch(()=>{u&&o(null)}),()=>{u=!1}},[t]);const a=pe.useMemo(()=>t?z1(t.fields):[],[t]),[l,c]=pe.useState(null);if(pe.useEffect(()=>{c(a[0]?.key??null)},[t]),!t)return R.jsx("div",{className:"empty",children:"Select a component to edit it"});const h=a.find(u=>u.key===l)??a[0];return R.jsxs("div",{className:"prop-panel"+(n?" busy":""),children:[R.jsxs("div",{className:"prop-head",children:[R.jsx("strong",{children:t.name}),R.jsx("span",{className:"k",children:t.kind}),s!==null&&R.jsxs("span",{className:"mass-readout",title:"Component mass",children:[s<10?s.toFixed(2):s.toFixed(1)," g"]})]}),a.length>1&&R.jsx("div",{className:"prop-tabs",children:a.map(u=>R.jsx("button",{type:"button",className:"prop-tab"+(u.key===h?.key?" active":""),onClick:()=>c(u.key),children:u.label},u.key))}),R.jsx(d0,{fields:h?.rows??[],onCommit:(u,f)=>e(t.id,u,f)}),R.jsx("datalist",{id:"opsrocket-materials",children:i.map(u=>R.jsxs("option",{value:u.name,children:[u.density," · ",u.group]},u.name))})]})}const Qg={BodyTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAAZiS0dEAO8A7wDvwcyDBQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAIASURBVDjLnZQ/bxNBEMV/ezN3570LdnzQ2AUuqNLjPh0fIU1akCiRa75DGlLzdTCVC5dQIJRIyPLJ55wv539LY5+dOEQJI620ejNv3mr2aQzwxhjzJYqi0Pd9AJxzGGP43/gXvyzLsiiKD8AvBT5dXFy8G4/H9Ho9AGazGcYYoig67GrAcNh0X6gsS+ZlyYt6/Q7e7/c5PT19D3z2Wq1W9/z8nMFggKqiqtTrdYIgoCiKCquO6CGmioggIqgqcRxTbzSYTqeIeFWu2+0Sx3EXwGu3223fV8qyrApEhCiKsNaS5/kdXETwPO8A24pu70EQkCQJk0lW5Wq1Gp1OpwOgYRhGi8USABG5M5ptozzPaTQaz/5rz/NoNpukaUqSJAA0m80EQJ1zbrVa4ZzD8zycA3AVOQxD1us1WZZxdHS0MxBuv2zrqgMIII5jRqMRx8fHqGoIoEVR5CLyEmC5XFLJul0L3/dZLBZkWfaw4TZOfgy31pKmKavVagmgo9Hoj6q+3hd+iLg1283NDbVa7UnC9zHf90nTNAPQq6urH1mWvRWRR4W3xNvbW6bTKdbavaLN6J/wkOvr698Aul6vv11eXp6dnJwcCD9EFhGcc0wmE6y1G1+4J01gOBwyHo+/b9YBr4wxX621cRAEz9pO9xdHZTCzm8R+zOfzeVEUH4GffwHkPeL5cv7alQAAAABJRU5ErkJggg==",CenteringRing:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XXjx4gAAAl1JREFUOI2NVEFrE0EU/mYnrSGb1MYkq7BJCwWpOVTwYFHYeKvNdSXgxRi9CMFCIT/AEk9eethjb/ZsqRfBYC8FQ3oXsdhTJSbZJqVpwYrN7szzYKvJZq1+8C7vffO+N2/4hhERvFh9uaoz4JZ2RXvSO3Fvdw8PIl7O/v4+6vU6UqkU4vH4UA8AiMdinQvB4JuvjcaLR4XCzkCRiIbiDJLosST5njyo1WqUy+VoZWWFcrkc1Wo1L+UU8i2RNP10Ar6jnoKBXIAp/TkhBCzLwsLCAgBgenoalmVhdnYWnHO/NiO+vf1W/bxcDhFgTExOPnV6vTutVmvcyxFCoNlsIp/PY3l5GVNTU4hGowMcXdcPxsbGXm1vbz9bWlpq99d8b2zeM78DeJdMpm64wr0qhRwSBoDFxUUAgKZpMAwDmUxmoM45b3HOd9Lpa23v2b+u2rbtYCikxhzHUaWUIAIYA0AEAgNjQDabBQAYhoG1tTWk02kAAGMMAKAoSnh0dOSybdvBmZnrP/5LWAoZOux2tePjbyFXSPxR/gUCUKlUUCwWUa1WYZomWrYNhTGcjgbOFTWsqjpJCgP4t/D6+usIGN2c0CciJ04vsLe3N8QRQiAcDgMAOp0Otra2ht44mUwq0YvjJx8+fQzcnZ8fbHCenYjkfSKq9BvEdV0yTZM2Nzd/h2ma5Lqun52qRPKBn865dgLgeBOcc5RKJViWhbm5OWxsbKBUKvlaiQAJMF8NXzud/VyXErGHriMyR0eHUS+n3W6j0WhA13VomuY7dSKR6KpqqLK7+6VcKBQ+99d+AnPTc/jWuLHGAAAAAElFTkSuQmCC",FinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVDhPnZSxboNADIZNBoREFlgrdgjN3KYTM8nCMyDxALxAO/AejdQhD1A6NF0yoKICI4g5ezMwsvTqI1ZVKbQcfBLy/db5jO3TSTABx3FMNPVZCXNzOBwyWo8Hk87xq+M4ZiIURcFw/xuF/zAjO4ad67rmer0m+T9JknDz0olfjEqMf/5gWdYmDEPyDJOmKTdxJ6aASTee57HT6URNHOZ4PPI2994FoYox2FRV9TmKItB1nbzDUJt7qx1MjEnnhmHUvu/DYrEgrxjU5ov5ckQq3vGE2GaSYjRNA2VZfuKyK3sU/DIFQcDatqWpibPf7/l8n+ioC/6sGIM2mqbd87nKskxecbKseyteO9GDtH3cXuHzdctmsIIv6Q4ktsrzHKqqoi3TsW0bltdLpigKlylI8A4MLcDHN21D3HmiXpQrAAAAAElFTkSuQmCC",InnerTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFvSURBVDhPvVTBSgMxFJwWWv2HhV7Wj7DePPQgXhRKUXqxX7aVHorgH7RQ+h8eZLHg0aSUxlY3zssGzdqtFCsOzM5sQt7khexWEKCf9CMOHNsqmsgqJxZZ00/9Gr1er5DxI6y1bXJI7oUkSSbkyJctoHQ3XHNJuSI7Sil0u103vlgsnO6K8XiMwWDwTNtk54/5aI5twRew6HD2ejqdYjTKN91qtZzuCgmO4/ie9o7Bop+oev0Gm/EhxGw2Q6PRcDRmiSVpjKEKQ29glqQfE8oa4oE8EhNiSzD7reSnsVqtUK/XHbWaY04qranC0CuouYaSMb4La7WalHglD8WEKA2WVAu8i5dACRcqzeIM0lKYGnrNOfFOnX/Ber2WEgfkm5gQpcFsNSOZDURRhDRNHb+Keg28dOre2bV2m1JuDSHHLMddQOnlyqw950Sb9uYPbvUT7Skv10b4Bnirz6zNbuVb3Af+O574sgUUOv6/PxfwAcCqiakft+coAAAAAElFTkSuQmCC",LaunchLug:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAI4npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja1ZhbduM6DkX/OYoegvgAQQ6Hz7XuDHr4vSHLrsRx6pZTX21XJFmiABAHOADKrf/+s91/+ESfskuiJdecDz6pphoaF+W4fdp59Ec6j7cf63rmP993R78eBG5FzvH2s+Rr/f2+fwi4nRpX8kFQGdeD/vlBTZf88iToUhTNosDFvATVS1AMtwf+EtBu2zpyLfpxC/3a2vX+zQ3FtsYh6in7IeT5d1K8N4WbMYQVfTw4xngZEO0vuNi4EI4hRlvIssZf5SjRX5bgkFd+enwqFm0zNb1c9AmVx9UTWnL30TNaKVxL4pOT8+P88r7z8hqV0/UfNKdyXYXP9/e4RZs7nrxvf3vPss89s4uWMq7O16buWzyvWEcUJlNdHKblQ/kTROj5rXwLegaozWMQsp3r6gNwbZ/89M1vv87z8AMTU1guKBchDOCymyVqqGGApI/Jvn4HBcMZC4iOE/YUw8MWf6qtx3CntoLm6VkaPMK8xcW7X/fuC3tbKnhvvgR6f8M3BHM2ZhhydmQZiPh9OVVOB9+/zx/DNYKgmJctRSqO7TcRXfwvJogn0JGFwvmWLl7nJQAXoVowxsNHHtR8FJ/9oSGo9ziyAFDD9BBT6CDgRcLEyJBizGBTgqnmFfXn0iCB2477kBlISMxRwYYsA6yUhPjRVIihJlGSiGRRKVKl5ZhTlpyzZiPFplGTU9GsqkWrthJLKlJy0VJKLa2GGiFNqblqLbXW1tDZkNx4u7GgtR567KmL67lrL732NgifkYaMPHSUUUebYcYJf8w8dZZZZ1t+EUorLVl56SqrrrYJtR3dTlt23rrLrrs9ULtg/fJ9AzV/oRZOpGyhPlDjrupdhDc6EcMMwIJLHsTVICCgg2F2FJ9SMOQMs6PCeFECRophNr0hBoJp+SDb37Fz4YaoIfdXuDlNn3ALP0XOGXRvIvcVt1eoTeO7cSJ2y0Jz6hHJPp6v0kJpVuy+nN13D949/z8K6q2R+0lhbjzffG0ZPk5l9k50wq97jKTZxXR4sPEye51HTOPQveIk0pETIiDMoJsKUevecU27X73ve+RyxFLR1PNecPaMcS+1N6/3PMXIt6x77I7QlLK9bFV7hVzaYmk3jadIAN+jlLndiumhEJhN5SuFH/Q9LP2k0V0qXyk81RFUpvCjvpcbdF8U/nCDbn9R+LMNuk8q/2KD7huFlzqNvW2pw0Mgo/rZWx7JmAzmShvCWX0ntI/u2hl89Iy/P8dplX/uw6xIbeY9IszSyhxzyGrJzZj3HN33VsQXzRxGq2sQ0bOT9GnVDoW1mrcf257HWMJYvUIluntfW8bU4uC13aGmfQypsw+li2CxrqOHOnZYQyGi1WfrPGheGtfLlw5LLSypNeTadbklMOFBR7oGTWg90obx++RyWDWpUmgIKqwWbVM66SKKaELW4GK3kNtu+M8p7K0Cx0KPjYa9gB9kRtPVaaekNV2xaFy+zkw5CD2MVH2ftjzhnzqYP0DBeTjVUPO7gMzGn1ysFaB4gSeBU3ZNfmSr+8QETaycVrF7fwuAPadAtQvc9YyUJN7ORzNICIGI85rueXaUUG0pbacgsUL8/IxnVN8lun0TeJd3SbvLMrb+IM1eNGmEIdtYKcc2ky7t2pw1t+uMjuXT3EWJct0qaW824s+X6XZIgFD7PtZp+wavM5mI8xOEFRzuGRsim/RMp+i75C9yKeinZHb1WfIp1yH4JnaFb2X+ibXud+a+Y637nbnvWOt+6txnye6nzn221j2by7Axcx8HUUfek6k7MyBshQoHa2jSZ6pLkl/jTPx9RveIrsKVYokEuay8SdKwJpMJQzTdSJy31O9bDqwRWg8hcQUWCmn1kGoZxUYntc5/URBRvfrIJKWWDCeWPNagWJa55sx00hn6SR2SmIWuRhicmI/gXoHrZoOPHm8tqGVFrBf6qloLc20Y5MlxpTX7XKgzdiKzV+9H6oGui1KeRbar5xjSK5kEZwkOKf/WMmxY4sgGDNaCEduo23XJY4L8Euu7ipkAjW7oCkce4FhIaO/XPMLUBI6BncRBSYFSNkNFxqVDIP98rNj4B+8GtHTgNBy4DYNPaGDDUzRrEOuelJgWafkCr7Y8KSKry6QftdrfqGuzDIVMaRE79KKYF808D3qUr0wXi6btaT8JJ4mtDcCrZl6l70ajurkHNFqWRuhIrUotAs73fEYyi2GtXkofto+o+AFlhcmZSOpryjr5q9JE2PJoQ3WSM/iJAd0pbhpfyGzmdKu0XC7Nqx6dLeLYOTIRUHYvoEjdc7MVChGOrIQ7wy+Nbasn9dpUfCaKzBsFE+ebgDyfQfqnWgAgoNpYrvaplB5l+qNv2DxZFXv7717VSyP0bjqtoVCH0m7/v6HcuwtK+r5I90vm34l0r8z8iUj3+53/uUj3p878N5HufXxei3R/A/lDJInn2i5QcbdpszaSY9SVGQFt6BqDaWDQl5Bq0CQ04GWYBjq+Vr0si/GYochE9sNFpGfOEeU0qGQ4nYvCVB6az0atUSgH2aQvli1aRxo3+y8NyA0ygPGm0GiFcxM5y2R4JP09g+FKNuX1tCaXpLJaHkWcUMhzbxzRNmPzrh3ReYr02Gm06EBW3JB64A501Kk+Z2Wgb20tCZRAj/TYQ2THu44Y/Vhqzcrk3ewdgzvVKBmbfzhDqpVe3T9YtrdE1zeSZ6aO9MiSdyBBvSbIvrUynFJSmGqVWrTsFbzNeAx7rBgofWeL1W2DjFt1+zCN3Wumo6KihUiv3isjPs2o321GSoT1nzMZlSAGx8UBAdN/WXzEE/0X98VGPYhkivu1gu7sm3efnvx6+4N4957e79W69/R+r9a9p9cqQk1SbaY6kejLVuNwl1tZRFsjjksiSUg0rTL0jkn55n6n+aaNCWeqodKaiBo/qHiAfSP818809CQmIegQOnlqLM6+L7nZeETpM4UwE0WbGVCEFCC1WooMXdRYylOkMUre9tuybykwi1WXCO1XjQLxVt3/AKNhqGvPP0ciAAAAZnpUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHjaPUoxEoAwDNrzCp/QQKrmOb3Wwc3B/59cBuESCMTu5522FWI3noHIWC3EH4DPBh6yg2DTAEvatUFWO9VeupyDbkxJp9dDRUz7APYTF2U6KKwlAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9biyIVBzOIiGSoTlZERRy1CkWoEGqFVh1MXvoHTRqSFBdHwbXg4M9i1cHFWVcHV0EQ/AFxdHJSdJES70sKLWK88Hgf591zeO8+IFgvM83qGAc03TZTibiYya6Kna8IQ0AAQxiTmWXMSVISvvV1T51UdzGe5d/3Z/WoOYsBAZF4lhmmTbxBPL1pG5z3iQVWlFXic+JRky5I/Mh1xeM3zgWXgzxTMNOpeWKBWCy0sdLGrGhqxFPEUVXTKT+Y8VjlvMVZK1dZ8578hZGcvrLMdVqDSGARS5AgQkEVJZRhI0a7ToqFFJ3HffwDrl8il0KuEhg5FlCBBtn1g//B79la+ckJLykSB8IvjvMxDHTuAo2a43wfO07jBAg9A1d6y1+pAzOfpNdaWvQI6N0GLq5bmrIHXO4A/U+GbMquFKIVzOeB9zP6pizQdwt0r3lza57j9AFI06ySN8DBITBSoOx1n3d3tc/t357m/H4AbdtypbcnsuwAAA0caVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjU3ZmUyYjRiLWRiNDAtNDRhZC04MTA1LTYyZGYyMjVkZjZhMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTAzZTBiMS1iNjA0LTRhNjMtOWJhZC0yNDdkNTQ0YzlkMzMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjRhYTdjYS05Y2Y3LTQ4MmMtOWRjOC1jMjA1NDg1OTYyZjMiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjUzMzU1MTkxMDQzMDc3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzAiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODAxYThlNWItYTBmYy00ZGZiLWIyZWEtYzYyNWRjZDczZjBlIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKE1hYyBPUykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMDUtMjNUMjE6MTk6NTEtMDQ6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+H5zV7AAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YFGAETM4556IwAAACzSURBVDjL7ZIxCsJQEERnIZ3kBDaCKFYeRI2kCr8PBI8kgZwiSPAA3kEUKw8gqcI3fxkrCyFg0AgWGVhYhoXHzi7Qq9ePJE3marGiqnYCKPaFtAKn25TPPo7jr6BZlgEAkk0ib4fDdUhbWZrI0FaWWiu1Vpa38qMykeFfbdwYQbAM2NUT5bu8+cYCmVM4BjETYEpgAmDkD/yhc641wDkHz/NePHu3IHmg8AziJMCRwAXA9QFOU34mj8JFigAAAABJRU5ErkJggg==",MassObject:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jexemgAAATRJREFUOI2dlL1OAkEUhb9L+IkJWvsItg4Wa2ICJYXhHXwLGyyk8EW2pjKRggI7EsPUPoAPQKHOZVcYi11IDMzu4km2mXvnnL35Zka894QkIntrxphz4A2YArfApbX249D+Iu9asBJWH5haa++A5zz8aEnZxMaYOpAe4Xlqrf2E4onrFYyugPl4PI5+1htarQZ4DyIIf1EMBoMJcANMykyrBPeAmVMXpUnC99fhpnb7DOAV6FYJrsK4G8fxvTrFafhTdcRx/JT/aKkKJ875RqoOXSWkaRLsbdR3VhfGmPaW87+Cyfi+L5fLCBH8Zh1sdE6pZcznVOBcFtwDZuo0EgGkgIx3SFavxLnwOnU6nZfR6LGvuiIL3n9Qtmo2G7tTPhw+zK2114VXtSQ4XCzXyWKx0FDxF6gHi1/NNGqOAAAAAElFTkSuQmCC",NoseCone:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABIAAAAAQAAAEgAAAABUGl4ZWxtYXRvciBQcm8gMi40LjUAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjI6MDc6MjYgMjI6MDA6NTcALR08jwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA7BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMi0wNy0yNlQyMjowMTozMi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDctMjZUMjI6MDA6NTctMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDIuNC41PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoLuYz4AAACM0lEQVQ4Ea1Uz4vaUBB+iVmLGpQtrhHdgmyD9UeMB/VQQ7eltSLa9lC8aHD1JgUR/4D+A3tb7/4D9ip73UMvnqRgBW3poYceexKKKMb0e1JDNki7u3TgkTcvM/PNvJnvMeSWkkqlDubzeRxuMZZlTzwej7xYLI5sNpuwXC7dHMcdbjabA7ogZDwec7DVrDCM9cCqi6J4zDDMKQI+A5CyXq8f2u32716v90exWHwhCALx+/2Efulyu90EtgSJkEwm8w1JidaY0+kUFnskEok8hvNbAL7RNO2+z+f7oqqqIssySSQSxOFwPIIbXX+VQqEgSpJEKpWKYQf9KxTNAA6HwxEcnKEqFYup1WoP8vk8SSaTBAl4Dc9bbCjoZDK55oEWfALW2RYYmyv0Q1IUZdJut4/j8Th7zfqOCuKQfr9v9tZLpdLRYDBIkGg0qqM6fTab6f9bMGw6bswcdtPr9T6g0EsOjWbQx6tyuSzxPP+z2WxG6RUHAgFzpnfaj0YjWpjZVx8OhzTwpXmqWQzVS/RAdTqdNSQzxrXLuVyOhEIhs/ON991ul6Bc0ul0dj56Op2ego7vzMC7nwQUuocBe46DV+j9aySDy+A/1+v1UzpsdLopbf4l1WqVtFotks1mDVNc8/tgMHi+F9iw+rPZcdnlcj1FQmlwMwye/orFYgLlMOhm8BgPypbHlMuNRsMaaqvT9t4IeJ83Mg/i/ARt+IjvBZI5XK1W9NXi0Sb6cj3Boi/XXozff/ULyDkzp7EAAAAASUVORK5CYII=",Parachute:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPlZM/aBNhGMafXHJJCOQOy6V1zJhFkKR0a4jg0MFBUKyDg3FSrGAHFaujIOqg0opOxsEhQgUHQQfBQDbp5uIYHKomwZjL3/Yudz7v9SJEmzQ+8OP57vv3fO/HdwFMqVwuF6KdJqfIPEkSxONxdLvdr4PB4BM/X5PNUqlky9gkTRXMUAlcJ1vF4qsTtVoVCSOB7W/bmDk0g1a7hdnZOSwvn3nLOXKoKwzfpI/VxGC/ygKZ33iykXJsB41fDYTDEUSjEdRrdRgJgxX34DgD6JoOJaRg5fLKF67ZIvlx1Qd931fJZPIxLbV2ay1tmiaq1So6nQ4s20KrZeJnowHL2kWv34PZNNFsNr12Nps1yuWyybVHK5XKO2+zvzS2YlZ7nnYjfyGfguNi17ZhWxbUUAguBxzXwU5/BxFWrgQUbyOLc0KqijDnsBOF5wWp/B6rfkEf0b7BDJ2jfd/72pOmaV61fER+D6DrulflUMFgELFYDO12G64rx/ujwwz/4bc9Kb6PyJ+0IE0ip15Mp9MqQ1fZLnI8IEjosC39Mp7JZFSGLvrrZP2Cv9+IJj4ukX/lD8gbcpN8JKvc7APHXAmlH2ffQ3KM3CUnyTWO/XPFQx0YLOLGBk3Cl8gzcpYcIRZRyWdSJBfJeyKhdfpYTRU8FA+Qoz0lGnlJrpP75ByRV3yJgXK9B+q/gkXMjtLukKtEfkd5bY/IbWb26VMI+A2/H99bU6xH7QAAAABJRU5ErkJggg==",ParallelStage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAFIXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7VdZluwmDP1nFVkCkhASy2E8JzvI8nPBru6u7n7zS34SUzZYyGi4kqDC/OvPFf7AxSQpJDXPJeeIK5VUuGLg8brKeVJM53m9pHuOnukhtnuCQRL0cr1avfkr6Pr6wUMGtWd68HuG/V6IXhY+l2zJezzeKgk6X/SHhqHMa5CL21tV271Qf5jir3d6Uevq9nt4Ihi8NBSChHkKSTxPvzSQfZNU9IYni4KPpJyxB3RJHrbCIU/mPfoY3zroycmPUXjvfe+fO5/rzSHvfJkfqOXPJ0jf0eVFPr8VLC8a8fMErWgfzLnvtYavNS/rasrwaL4j6jibHsuAEVGV5HyW0Qy3YmynFTSPNXZAPmJHBDaMCyGw4wqUaFClRfP0nTpUTDzZ0DN3ALVpLsaFu2yc0m602IDYEAdmnWcQAZlfdKEjtxx5nRySB4GVCYsRPvliC1+b/JEW1tp4E21nAnq6AOYd11BjI7ef4EoHiAs3PQ5+tBv++CawEKpAUI+bHQbW2K4lmtJrbMnBWcCn6K8UomDjXgAugmyFMiRAIGYSpUzRmI0IfnQAVKE5S+IGBEiVB5TkJJI5GDtv2fjG6PCycuZNRm3a6SMZueU7pwBWSor4seSIoaqiSVWzmnrQojVLTllzzpZ3kasmlkwtm5lbseriydWzm7sXr4WLoAZqycWKl1Jq5VAhqGKtCv4KSuMmLTVtuVnzVlrtCJ+euvbcrXsvvQ4eMlAmRh42fJRRJ4WJSjHT1JmnTZ9l1oVYW7LS0pWXLV9l1RfUblQ/tB9AjW7U+CC1+ewFNVCD2WMJ2uVEN2ZAjBMBcdsIIKB5YxadUuKN3MYsFkZSKENJ3diEQRsxQJgmsS56we4Vue/CLah/F278LeTChu53IBcA3UfcPkFt7H2uH8SuLNw+jYLsw/z0Gtjr3tTqr/b//kJzrE4DoJhpTakuo1xQuU8plVQCeRYftXUTHdEW0CtlrRRnSwseaAu/iSpNUwknjto29SNXuNh+foHH9+FXF3jMhJ9aQFGB0mCEiK/kbVhqMG1TnTrCsGNfdoTiwqEALl7C9bg7xm/34XsZTy+IzFhns2oZ8a69xTFGRxJhO0LgY/vybsCuSosrizaYE4tOh32yjpHY7FBRuPVxAmKlQ3XEQdI9CmUNMPjxwPFeZzgIO2Zf89AS2+5jXZKOVvDN4eU2yNa0deYD6s9arnSYbyV2DqE7SiDBntV4KHE0wOzWARqEVxVA3ErcKjwp8Cz+yIZZqEMjWU8Nkb5CVXhLSMechVFxhiYreQqnWqI0tTLHPnDumPhaH77F8L39/wv9FxeiIctNuoSSUXpmWazYtRI2U2xiFX8pfODvEs6CMjotrcN2ctBKHckxl538soFqgB5HshjMURtqnyhOXhTH4jmjl94nohyhHqvRCe/calzgGiLYxljyyUNbkNAzMinQrnjxmrc2TiKOlU/q9jSuZHaZ5XwoyKST+6ud4jE5t2z7JWxdUSNgSrUrn8FBVfbkF+YgIX8wNLy19FSjuCpk9GXtaNXmOP7wUkd5b9vDMtDDpxPY2D9YfNl7W3vbell67Azr1cyt6KsdxwdvbPwwc1m4y+22MZx6fJl5bEQd3GjqsrOfNB0ycU4hiEP1w5mtz0qlGJX9nU2t07ew8Lk0RBOOS6VaLzXpxNkb55p9aIp7U8tZOeEsa9jF8OfbSlEKvydB/rGFAMiA7eFvliENZp9IYd0AAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlIhUHO0hxyFAdxIKoiKNWoQgVQq3QqoPJpV/QpCFJcXEUXAsOfixWHVycdXVwFQTBDxA3NydFFynxf0mhRYwHx/14d+9x9w4QGhWmWV3jgKbbZjqZELO5VTH0ihCiEDCIUZlZxpwkpeA7vu4R4OtdnGf5n/tz9Kl5iwEBkXiWGaZNvEE8vWkbnPeJI6wkq8TnxGMmXZD4keuKx2+ciy4LPDNiZtLzxBFisdjBSgezkqkRTxHHVE2nfCHrscp5i7NWqbHWPfkLw3l9ZZnrNIeQxCKWIEGEghrKqMBGnFadFAtp2k/4+KOuXyKXQq4yGDkWUIUG2fWD/8Hvbq3C5ISXFE4A3S+O8zEMhHaBZt1xvo8dp3kCBJ+BK73trzaAmU/S620tdgT0bwMX121N2QMud4DBJ0M2ZVcK0hQKBeD9jL4pBwzcAr1rXm+tfZw+ABnqKnUDHBwCI0XKXvd5d09nb/+eafX3A2kDcqMkOXVkAAAQqWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MjhmNDZjZjYtZjkxMS00N2VlLWFjMGYtNWZkYTVlMzBkMzczIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmUxNDJkZWQ0LWNkY2UtNGIwZi1hNTNmLTAyY2Q3OGFlODg2MCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA0OThlMDJlLTZiMTAtNGUwYS05MDkyLWI0MGYxYjg5ZWIyNCIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjI3MjY2NTI3MDEzNjk3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMTgiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMSIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIgogICB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA3LTE4VDAwOjAxOjAwWiIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDctMTlUMDE6MzY6MDFaIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjNlMGIwMjYtNDJiMC00NzM2LTk2NTgtYzE0ZWZhNTY1YjQwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iLTA3OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Psyk3REAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBxoCHC4+/M+GAAAAVElEQVQoz82SMQ6AMAwDL9CRZ+ZZ+SQTUoeGha1IGLVDPVpJdFYMC+oCKtAAirLh7vnmR0TnmUiR4pxNz28/CT7vbayu6U9Ra4NYm3004fHQJ3AC3JijD/oG3iWyAAAAAElFTkSuQmCC",PodSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAACWSURBVCiRnZHLDcUgDATtV1aohTNdkS4oAIkD9JAOuFHA5JJI4ZMc3koWktlZW6CArKSqALq6+70BpRRR1WWi/jPpFfrScr3WGjFGWmvLxAmqtWKtlVqrXOcMAl1570kpAZBSYt93Rs80yRgjIQQ5jkNCCLJt27zf9RBdWs4Z5xw5565/+0REKKUwgmM9fQp8/slTt+8EQCyqrvdmJ/MAAAAASUVORK5CYII=",ShockCord:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVDhPrZNBaBNREIbnZYUIkXbTBJLiRWwl9FK6C4FqbXvooVoQpOBBJLdg25PXLYjiLZBCC7nYmrpBFDwIvXgQPQkBj22JPaxCSLw0aNpuD6EpTbP+k13TbpMKtn7w78yb3fdm35t5ghzMXdMyd0wqFgpU2izR6vraLMKZRCJRsr/4v3gcS3KnLPar+2Pd4e4nA6ryAaFRaEVV1VAwGHwMfYEsaBXqbUw6B80dM98Mo79ONCQE3RB1Gl5KvzjMZDJX8OoVtFwul7NIGoc/BT/Kc9qhadojmAV7RDQyMkoTE7dduVwDwzAuw1xHeIjIGtZ1PVepVNZTqVRzEQbJv8PcQ/I1O3IEkg7AfIJMbVbrFRZl6x7rjb/D/7zxgUPzqB22oB0k3YYtQ0WfzyfzixO8h27Zbgv3obdQdS45N2MJ6iJLtKzhShyJRKowvyD+AZNjp/AZ4h5oRx/E87O1Wo3HXTjWADvHObljBpOwY0E/4T+A3jWibrLQoO220MGPdDo9DRO20LdYL4BbM8bxP5ySWGzpL/Vr8E1cp692+AjUlstQQK1v2hEbjC/kcrkDJH0aj8efcQy7vYinjFq7jrslcSgc2vtRLH6EyzW80wi2ZxlK8tWCBqF5jDfz+XwUSflnA5IkOUcsAnWu9TFcXf0v8O5gktBdiPuBG27R6/WGYrEYl+cSujoIy2zguF/Lnf6EMz574r+BKzUO8xCalCQPXe3pIUVRSFVUJx/Rb0rvpw+X1b9ZAAAAAElFTkSuQmCC",Stage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAPBnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZppdhw5DoT/8xRzBO4gj8MFfG9uMMefD8ySZMlyj3vcrqdasjKZWAKBAMtO//Pv4/7FvxxidLlIq71Wz7/cc4+DN80//8Z9Dj7f5+eDvr4Ln487P19fRA4lXtPzsdXX+W/Hw/sCz8vgXflhobZeX8zPX/T8Wr99WSg+L8kssvf7tVB/LZTi80V4LTAet3ztTX50Yb5ce13/hKGZazzl9tnsnz4L0duF+6QYNYXkeY4pPgYk+wsuDd60+9w5Mdz3JQnPvH8tRkC+i5P/wSr3NSvv775kpezvk5Lqc4bjwOdg1vfXb4+H8uV4eku/hfiHO6f1ehc/H9/N61d33v7O2c2do493I1dCWl9Ovbl433EiaMvpXlZ5CH+F93IfnUdzoHeR8u0X0Jy87yGSlhNy2GGEE/S+rrAwMUeNwmuMi0TZsZYk9riSd+Qm2yOcKKmnTdZiWqQ3cTS+2xLuffu93QqNG+/AmTGwWDAoOHv6Jx6/XOgcg3wIFkxSH25+qHJLQ7AoJnvmLBISzhuOyg3w2+PrP8trIoPlhrnh4PDzWWKW8MKW4SjdRCdOLLw+tRZkvxYgRNy7YExIZMDXkEqowUuMEgJxbORnsFCLKcdJCkIpcWNlzClVktOi3ZtrJNxzY4nPYTiLRJRUKaRGgga5yhAb+JHcwNAoqeRSSi1SWull1FRzLbVWqUZ+Q5JkKVJFpEmX0VLLrbTapDXXehs99gQ5ll679NZ7H4ObDlYeXD04YYwZZ5p5llmnzDb7HAv4rLzKqktWc6uvseNOG57Ydctuu++hQYGSZi1aVbRp13GA2kknn3LqkdNOP+M9a8E9af3p8ftZC29ZizdTdqK8Z41LRd6WCEYnxXJGxmIOZFwsAwA6Ws58CzlHZ6mznPkeqYoSsbJYcnawjJHBrCGWE95z95G5T3lzOf9R3uJb5pyl7p/InLPU/SJzP+ftm6xt6zbLJ3czZGVoQfWJ8uMEbSO2YU3tt1/dL0+Yld6YAmsesp3TOT3IyftgR2mknyIkMbrPSHKWa5xkB/m6tnO/phQNY1JCOaVLm+lornUu+xZ+xWAAdFIHSsGO9aDJlft21sKd4jYjiPO1jG4bx9ldzugsRVjAkGKL3/MoKDinrmtZlQEfnTjxQ1c7Te7hFGC1uzI3SNtKUrkyg2hiK4sIa4vbrA5ps/a9yoWCqWibWe0jFtwFICOdqz1mvZn3l6/uf52Qylwdf1T6kLNPjGBotSZ2JOMe8Bm6xJ0ZgcYN2bEQnomvR7FYkx31ZK3JDXAa11r1YfHZZAsfu1I3NR3XwGoS2Wns0DsZpLoj7S/mfiLYHHNQRblpKvZXKCHgMcbVVVJ97L3ukMX5QsX5lcLIEnJtnNKAUhzt6eppQBo9zUbfGwgJWVgaqEnsnuAbeyZrb6d7LQnjdIqPUkOfndmzLr+lhzppk1Ps3BPXpnPCEXWvOSeEctZIs4+T9bTp4oUjxbfJF3jhArmwpFwFkTpupABbJCxnNRwrZcxdWZ6ukWek2lnY4Usq+2I2KLVbNeXSu4KHBoEEsYpMqwYiVKkWvKtZ++ZOde8J6ORe7VTbReymXiEbkkg4dOtJungpoLjKqgSjzHAUhOYCQRDBlUByWdpSonrcSEp6jF1QVgOyyTU1crVogHMeGl0em8yuk4A/Xa7O2rViDTi2hqi6cLO75ZWXdDCWHg9lRYgrcxpVinNhQ04Yhm+wqva+iJyeVffEfwomEEf4KdGO/OybVhxq2wuiTGuSQY0TWUQwa/LU/Zxq6vSclmO1Ewg+JEHtBYnFQOGIRQxAYs0xfdsoKQX7HQXnYW2kFVJwBQ6lsnapS4dmcFsUDJHfCE6pX19cyMXAztPx3LNMqnfUPdKeOesOlRQiZ0So4naTJtBtKX0S/+jnxoe2pTqUH6pQ0m4FAbKpN9FAkpIsStIDhr7LJFFhsiylRDS1ZnI5ek9Sdycw4odTq0Kst0nodEThMErnPVXZhR4B4QUjqij1KeOmDxl6ckxrhxKw6zjQTA1cdIuxBgRmPHfJ6rRCb/S0Dm1F7zl94+DRZAyyaJMwQz8nx+OM1qi3WxZhXbP8yyyjjHezMCA8DPoy7WXYm1nu2mVs9Bj21Sxz5bNZL6O4ySez3C3QeD4M+2LW70bLfYTrz6LlPsL1TbSAjDIGbDHOPk+E/HjOgMzvLSgM4aLHtXB9R6Fcg82nkM7vB9occj8HWtB4YVrl2PBzAjdlVdMZj5N7R3MGTdEabsEENIHlbJEnB1JOtkM/ouOLu+nXgXdYacWLN1NaRx5sQYr1iebO43DFRAfV03ukjcFaYL/YVGRdIcBbcWRaf+nM/XwJPQ0JZYssE+3IParMio0yo9ZihcXWgVEgAbipUKqnwq0l0FxW7jQFFy9BUK9IFBSa6NzDVJtn8kLhcV2ua09MRvntZaWpSBc/IBSza3r4UyMTZFvcdKIRaR+FGyA3JWoRXQyCsKJRPwMgvC4lQQamZTJ0ThZqIjxZBdlw0NkLCUFP9pwWNsjDva1IFyQL8SJQs2yYgoFhIXNQUb3yDlgz+NdAanUYjhINjqT8FXLparAQeQcYviEhg4ktuulTiwFNOrYTUXpkm4QWsdfRTFNBTMXbbIQ7CCtG0NVNbSq9HzWIBRgwinzAwX1TiNKRunWaCEGVHIxoCbK+NZC2ibIujFxIAoQYsjaWzijaamLoDU1qTAgI+vntfTSjSbvNfsakQI2oL9s8QHiAu0SnGmqCMIT9aFDX7bNptINwXTShdOGrVwhSLowCppnosjceodzaw92FMXYtTcq0kqPXEBx6lKAl6QKsheaOJKAVpCe5pcdl+kwNhbB3pgaofZHEsqxx0GYqCFG3UPunVSSLMJTS7WbkhL4CbYLgijBcUXN8f9FvekSYDo7PJlC7J8tA4oRb/YPRF/gwpIxo+Q2dq8F22MwOxm2kNV7ZF3MTatn0rgAO5HQ3eG9PsP/2sHB6szAisnAMZPu9/UU2ksAGgyWm/Jl09ZBDyAqRc9MwkdPG5Ta+HIrx+6Wua39nKRKJ4nqwj6oyvYt0uRbljtKgCMZuBwWA19AQ5RZRdFtQfIksIDHG7nNHG0p9RW1lqgwCMUUrFJv7wf/z0Ho12jUeG2ZWK/UCjlmB+p+epCCQGBGYdcZBuZ1MOdGOEDI75d1JecVtBSnK3AQRL0Q1qasTTW1bGPWUF5rfgmOD1o00sXF5P52sGu/bTHhPQNZcmGjtF9Gg8XZXBA3qcFH9K+FSW0YXlH+gaKGgPp9yhX4Edf9m9UkIeMlzQ78Y3SrjBJKHQkb80itqXIF5zsOj0ztshI1RnCZv3kZQnHi6/r63KK928lTZHFpu4+wXzHdQYYS46Yc0ur8UjPZanMSX1WTo5aZNb8g8I8inKWA15Y8EDTyr+acpNQedl+L7RDUfiI3midYu1cQm/DUh3FV1U2UdFUxf2NCZRVrX2qbwiRLcvpaNWdCzAEquB1sbpe25h2nnRRjoUYu+iWLWvC88KyL72MaCmJg3eyJsxUITdoD/WovMM0nRBIGIsiIJT8aqNrJlq3ewfzHVMvmPodIjrXkTrHotoo0+SmOKdLyR3GAvmuVkncp0iKUFBh4MfsSO/kYaN1pFGYN6O6ZJxZlSoOvTaUz7P5rDQELLoGfbtF8ubbBWlk9fID7sK74oDJXOKPj/v/zjavdnl3+c5P7s8o+r3Z9d/nG1+4vLb4G3e8HOWR4FaRsZdxK5ozwVv9NrgjQSRMsI0/ojdTnJiMQ46Z6+OwOjKY7bVugE/XAIQBeKeoadrfCiG1Y8zE/o66PlITbVTZ/NCdmiF7pp16HmQnrZtx+RbxzEuVbbjoYK4g406HftTEF2u4nGBY01MTyKlWSmB1LCdEzbf6PnTRNPTIxzJqbaXrNjpLRq4bx1twdKNzHl+zPEx6CUoqJ/1Qpr3jpAcSt+rLkvI4jJzOQ+ioD1BoQSbWU0wEIgmw6xYkb6MKtjwrn9g0UW+gVuYSCsKTCiqZuzCczQuF1/kX+xDYjdpU9FzgqTIHWOCqT/yiAGd/aHIE28KWOs7jajE3TZtD2IWXNEXZnBuxH5wuxZWjJbAUFa/hkYTIRnVetfMyM0tzmL/8iaXA++ECOFe+lAOGDEiyabw4JFh4H5jDF3x380OdRCQxmybKvoNt1UnG250GgPi4vlzkBZdoL/oBYYdxID8oU/lV72tKCHk/BuI4WnbWLU7rbtuEW1TZRaU1yL61Y/qqAUYc7kAkMWGiUlcHfXJoBiPobh0NUI1mVQRR/Bj6g1Ov7d9+vT9ORTALYtYRFhsPB33vIR3bvCICf1WPwJ0Ch4ZP3AQXMYQk8j6Xyvaq4oGjjbNiDWoPCmqVxURzm2g/S0KFodvGgsG5TQDUdL6Pu1F8ntQHfdZjxDUzGRQHsiyIwlEZ0HcPdtyRlb47YZR5mj8mi4NujSOGDbdDbNNKUoNoK2amccAw/DAtHsB6Fl1+DBd3uE7vd2GX/aVOQuN3e1NSBCIhya2UaBaXvor/HOSIAGD8CfndIjQ2wL0uY/jdQHPYvyG3e8ZMSyzRSl+ok5oUi2e7RXYVpA4s6c20B4RDzLo8flrbDxkKEOvOO835DQTLbtyAOGNINIK9NbmGiXiMKwH5qgCpvR/DqmA1ZTZJP9sJejTRq5UvTpOgcM1Fqss/1cm2pYNsB349juH7aNytCPlp+J0owJRcX8SUemCm07sEujDpGahZ4eNR5Xvf1QMLC4XVOAMmwdUegzPYIYGraQQVUFdbbMJ6O0xOgLtHOt1CLjep2QHjMKlC2151zAEgpFJQ5ybze3TSpvOwNMwgERRkunmhFqDehnPgXbT6SLAFcbm8rqHhUM7GJm9usL6kCIlm3S2eqFwlghGNAPk66ggbUiTAWJjOZwzJuoarTPtN8flv2W00O0nxkUpn028QkwQ+Khci4cbNf4ThCmNW3SGUWDo6KIe5jIc6MwCDXs0mGobSw32kiPJIGsIpKQ8Gt8DYgoYJuQe0JUFjdKU1RvjJnkxVpoHfarFFipHWOQRlScscOw/1JAjom5Rrsdg/NsF0VxtuykUFItrzGY1kgRgtJYWeKzHUg57+7+C5dmv+4HNCNeAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9bpaVUHOwg4pChOlkQK+qoVShChVArtOpg8tI/aNKQpLg4Cq4FB38Wqw4uzro6uAqC4A+Im5uToouUeF9SaBHjhcf7OO+ew3v3Af5mlalmzzigapaRSSWFXH5VCL4ihDB8mEZCYqY+J4ppeNbXPXVS3cV5lnffn9WnFEwG+ATiWaYbFvEG8dSmpXPeJ46ysqQQnxOPGXRB4keuyy6/cS457OeZUSObmSeOEgulLpa7mJUNlXiSOKaoGuX7cy4rnLc4q9U6a9+TvzBS0FaWuU5rGCksYgkiBMioo4IqLMRp10gxkaHzpId/yPGL5JLJVQEjxwJqUCE5fvA/+D1bs5iYcJMiSaD3xbY/RoDgLtBq2Pb3sW23ToDAM3Cldfy1JjDzSXqjo8WOgP5t4OK6o8l7wOUOMPikS4bkSAFa/mIReD+jb8oDA7dAeM2dW/scpw9AlmaVvgEODoHREmWve7w71D23f3va8/sBpJ1yu0dTFlwAABCpaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDozYzBmMzQ0My1jOWUxLTRjYjItYWYyMi1kY2JiNTk4OWI5OTUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2RkYjJlNmYtMGM1Yi00MGY2LTgzZmEtNTU4NGFiNjM5OGI1IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWQyZmUxY2MtNzZmOC00YWNiLWFhZmUtZWVhNjNmZGI0NGY3IgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2Mjg1NjA2NDAwNTUxMzQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjExIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDctMTdUMjM6NDc6NDFaIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0yN1QwMjowNDowOVoiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MTdkNmQxZS1kYTk0LTQ5MzEtOTA2Yi1mZjA4MmNiMTdmYTEiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSItMDc6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+8NgqrAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UICgE5FMAMuMQAAAD7SURBVDjLvZSxaoNgFIWP5YcM4tCl/I5uTuKmgi/RvaB9A0eh79Dg5lMEO/kadgsdXNpVLBWJOHi6RGiDTUL+0A/O9A13uOde4HrcAugBcJ/dmU4JTUq5zbKMJJnn+QeAlzOcGqZpPvm+P07TRJJ0HGcL4OGUUyZJktemaUiSwzDQtu1nAKtTbkYCWP/Yg2pm/nQSwFoI8eW67icAqnI4eMkJIcRbEARjXddG27b4L26Koogty9r1fQ8p5WWV1rRf2bNa8ocOZVneR1H0fsk+4zhmGIacm2sYBufmHnPKdF1353neON9qmqab+VaPuatQVdWjrutc+k5L7htzpyON+Z9ooQAAAABJRU5ErkJggg==",Transition:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++aqHwQAAAklJREFUOI2llEFLG0EUx3+T2ZhE3Qgek4qoaS0iVIgVLUIj9At4aI71C/QziBc/R/eqN++FBiq1eOrBiz2IhQielrhslOzM7OthYzC1lFAf/HlvZh7zf+/Pm1H8pzUaDQ9YBlaBV8A6sNJsNr0/c8fHx0HUCTn5plJOBL6rJ5AsVyqVYq1WY2lpiVqtRhAEnJ2dfT46OnpnkgSAiclJlBqiaQF7XvApqCpYlxwbpOoNSjZub2+HiA8PD7uVSmXiIUm9Xn9UYL1eZ2trazlJEnzfByCOY8plH/hLj1EUfYyi6GcURRKGodzd3Umv1xtge3tb2u22jGK7u7vSarXEOSfOOTHGSBiGg7Vz7otz7m0OoFQqDSFJEkQErTVaazY3Nzk9PSV1jjRNkTTzWXwPQSRlcXGRq6srlFIopdBaUy6XiaIIAOdcA8ADyOVyg+7HxsbQWpMkCUopPM9jenqam5sbjLFZknroFCCAQgH5fJ5ut4tzbkjVUqlEp9PB933b6XQy4jRNh5KUUuTzeXq9HsYYwjBkbm6OxJiMTIESYDA00t8EYwxa66E7RQSAQqFAHMdxoVAg129/CNZa0jTF8zystRwfH7O2toZLDNYYjDEkNvMZLMZkZ+fn51SrVay1WNvf78d9RX8AqFGnen5+fuLFi+fMzs6yuvqaqfJUXx7JVJCs4/fNZvvg4OBZsVh8PMWZtYC9Ud/xJLCys/Ph68XFBZeXv7i+vmZmZob7YhYWFgiCAFDs7+8P5H0S8b+KIftU6v345ag/1282snUWSFpDdAAAAABJRU5ErkJggg==",TubeFinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABkAAAAAQAAAGQAAAABUGl4ZWxtYXRvciBQcm8gMy40LjEAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjM6MDk6MjUgMTU6Mjk6MzcAVmv9YgAAAAlwSFlzAAAPYQAAD2EBqD+naQAAA7JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDMuNC4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTA5LTI1VDE1OjI5OjM3LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wOS0yNVQyMjowNTo1Ny0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+ChtzjeoAAAHPSURBVDgRxZPPSwJREMfnqQh16ZBFZYhakRERaNjFDksUYXrrWvQvFJGH/gL/jforhMgg6RBp1KVf0EpFStkvCovUtu9sbTyXUjs18NmZ997MvJ2ZXaJ/EtHovX6/X2vU1/DLZDIN5zdiqnQ4HJ6ITEe0jfUNjUU9U1lViXmP/TmuKpG0sEj2r2Zfb998aCxEO7s77ON0e9yUVbNsf4t5j/057tvBZNRtBbfYbreTo9VBiwuLtLS8ZEpRf/lTy/WLvYMBVxO9DgthHbXZRNAirENCUIeGU/GOxBZB6CvJL6CMK3rVXKks3Al5LxqJUuG2cFh8LW5SqZLRKpW95nLLqUDCGQR6QY+kPXIyw15bXaOr3JW+jMViujZfxJvyXjwep67OLm12bjaPo0twAc55xpUvytBv4BlkTahYq/2+/nxqK0XBkSCWn8LV1Zo3+/sGfAV4P4EXwHeUueIpGG7gAk7QBqzA+H3El82aAoHAJOu/SDqd3oZ/CTyAa5C34fEI7kAT4ORFwNUbF8PURUskEi60Tf/I/jLjZDJZUhSFZ8RV34MHbjW34QbwwTngth6BE3AscXKwf9At/VYrbk/tNiOW2B9x7TB5tjnAFRc+AHvu3kaAhLUbAAAAAElFTkSuQmCC"};function G1({config:t,onWorkbench:e,setBusy:n,setErr:i,busy:r}){const[s,o]=pe.useState([]),[a,l]=pe.useState(""),[c,h]=pe.useState(t.configs[0]?.config_id??""),[u,f]=pe.useState(t.mounts[0]?.id??""),[p,v]=pe.useState("0");pe.useEffect(()=>{dv().then(o).catch(w=>i(String(w)))},[i]);const x=pe.useMemo(()=>{const w=new Map;for(const S of t.simulations)S.config_id&&w.set(S.config_id,S.name);return S=>w.get(S)??S.slice(0,8)},[t.simulations]),g=t.mounts.find(w=>w.id===u)??null,d=g?.assignments.find(w=>w.config_id===c)??null,A=pe.useMemo(()=>{const w=a.trim().toLowerCase();return w?s.filter(S=>S.designation.toLowerCase().includes(w)||S.manufacturer.toLowerCase().includes(w)||S.class.toLowerCase()===w):s},[s,a]);async function m(w){n(!0),i(null);try{e(await w)}catch(S){i(String(S))}finally{n(!1)}}const C=w=>g&&m(nx(g.id,c,w.designation,w.digest,Number(p)||0));return R.jsxs("div",{className:"motors"+(r?" busy":""),children:[R.jsxs("div",{className:"motors-top",children:[R.jsxs("label",{children:["Configuration",R.jsx($i,{value:c,onChange:h,options:t.configs.map(w=>({value:w.config_id,label:w.name??x(w.config_id)}))})]}),R.jsxs("label",{children:["Mount",R.jsx($i,{value:u,onChange:f,options:t.mounts.map(w=>({value:w.id,label:`${w.name} (${w.kind})`}))})]}),R.jsxs("label",{children:["Ejection delay (s)",R.jsx("input",{type:"number",step:"any",value:p,onChange:w=>v(w.target.value),style:{width:70}})]}),R.jsxs("span",{className:"cur",children:["Loaded:"," ",R.jsx("b",{children:d?.designation??"— none —"}),d&&` · delay ${d.ejection_delay}s`,d&&R.jsx("button",{className:"link",onClick:()=>g&&m(ix(g.id,c)),children:"clear"})]})]}),R.jsx("input",{className:"motor-search",placeholder:"Filter by designation, manufacturer, or class (A/B/C…)",value:a,onChange:w=>l(w.target.value)}),R.jsx("div",{className:"motor-table",children:R.jsxs("table",{children:[R.jsx("thead",{children:R.jsxs("tr",{children:[R.jsx("th",{children:"Cls"}),R.jsx("th",{children:"Motor"}),R.jsx("th",{children:"Manufacturer"}),R.jsx("th",{children:"Ø mm"}),R.jsx("th",{children:"Impulse"}),R.jsx("th",{children:"Avg N"}),R.jsx("th",{children:"Burn s"}),R.jsx("th",{children:"Mass g"}),R.jsx("th",{children:"Delays"})]})}),R.jsx("tbody",{children:A.map(w=>{const S=d?.designation===w.designation&&(d?.digest??w.digest)===w.digest;return R.jsxs("tr",{className:S?"sel":"",onClick:()=>C(w),children:[R.jsx("td",{children:w.class}),R.jsx("td",{children:R.jsx("b",{children:w.designation})}),R.jsx("td",{children:w.manufacturer.replace(/_/g," ")}),R.jsx("td",{children:w.diameter_mm.toFixed(0)}),R.jsx("td",{children:w.total_impulse.toFixed(1)}),R.jsx("td",{children:w.avg_thrust.toFixed(1)}),R.jsx("td",{children:w.burn_time.toFixed(2)}),R.jsx("td",{children:w.total_mass_g.toFixed(1)}),R.jsx("td",{children:w.delays.filter(I=>I<100).join(",")||"—"})]},w.file)})})]})})]})}const V1=["length","number","angle","mass","int"];function H1({tree:t,sim:e,setErr:n}){const[i,r]=pe.useState(null),[s,o]=pe.useState("0.3"),a=pe.useMemo(()=>t.filter(y=>y.kind!=="Stage"),[t]),[l,c]=pe.useState(a[0]?.id??""),h=a.find(y=>y.id===l)??a[0],u=(h?.fields??[]).filter(y=>V1.includes(y.kind)),[f,p]=pe.useState(u[0]?.key??""),[v,x]=pe.useState({min:"10",max:"80",steps:"15"}),[g,d]=pe.useState("max_apogee"),[A,m]=pe.useState("100"),[C,w]=pe.useState("1"),[S,I]=pe.useState(null),[T,z]=pe.useState(!1);pe.useEffect(()=>{ex(Number(s)||.3).then(r).catch(y=>n(String(y)))},[s,n]);async function _(){if(!(!h||!f)){z(!0),n(null);try{I(await tx({sim_name:e||null,comp_id:h.id,key:f,min:Number(v.min),max:Number(v.max),steps:Number(v.steps),goal:g,target:Number(A),min_margin:Number(C)}))}catch(y){n(String(y))}finally{z(!1)}}}return R.jsxs("div",{className:"analysis",children:[R.jsxs("div",{className:"an-sec",children:[R.jsxs("div",{className:"an-head",children:[R.jsx("span",{children:"Component analysis"}),R.jsxs("label",{children:["Mach",R.jsx("input",{type:"number",step:"0.05",value:s,onChange:y=>o(y.target.value),style:{width:64}})]})]}),i&&R.jsxs("table",{children:[R.jsx("thead",{children:R.jsxs("tr",{children:[R.jsx("th",{children:"Component"}),R.jsx("th",{children:"CNα"}),R.jsx("th",{children:"CP cm"}),R.jsx("th",{children:"CD fric"}),R.jsx("th",{children:"CD press"}),R.jsx("th",{children:"CD share"})]})}),R.jsxs("tbody",{children:[i.rows.map(y=>R.jsxs("tr",{children:[R.jsxs("td",{children:[R.jsx("b",{children:y.name})," ",R.jsx("span",{className:"k",children:y.kind})]}),R.jsx("td",{children:y.cn_alpha.toFixed(3)}),R.jsx("td",{children:y.cp_cm.toFixed(2)}),R.jsx("td",{children:y.cd_friction.toFixed(4)}),R.jsx("td",{children:y.cd_pressure.toFixed(4)}),R.jsxs("td",{children:[(y.cd_share*100).toFixed(1),"%"]})]},y.id)),R.jsxs("tr",{className:"tot",children:[R.jsxs("td",{children:["Total (+ base ",i.cd_base.toFixed(3),")"]}),R.jsx("td",{children:i.cn_alpha_total.toFixed(3)}),R.jsx("td",{children:i.cp_cm.toFixed(2)}),R.jsx("td",{colSpan:2}),R.jsxs("td",{children:["CD ",i.cd_total.toFixed(4)]})]})]})]})]}),R.jsxs("div",{className:"an-sec",children:[R.jsx("div",{className:"an-head",children:R.jsx("span",{children:"Optimize (1-D sweep)"})}),R.jsxs("div",{className:"opt-form",children:[R.jsxs("label",{children:["Component",R.jsx($i,{value:l,onChange:y=>{c(y),p("")},options:a.map(y=>({value:y.id,label:`${y.name} (${y.kind})`}))})]}),R.jsxs("label",{children:["Parameter",R.jsx($i,{value:f||u[0]?.key||"",onChange:p,options:u.map(y=>({value:y.key,label:y.label+(y.unit?` (${y.unit})`:"")}))})]}),R.jsxs("label",{children:["Min",R.jsx("input",{type:"number",value:v.min,onChange:y=>x({...v,min:y.target.value})})]}),R.jsxs("label",{children:["Max",R.jsx("input",{type:"number",value:v.max,onChange:y=>x({...v,max:y.target.value})})]}),R.jsxs("label",{children:["Steps",R.jsx("input",{type:"number",value:v.steps,onChange:y=>x({...v,steps:y.target.value})})]}),R.jsxs("label",{children:["Goal",R.jsx($i,{value:g,onChange:d,options:[{value:"max_apogee",label:"Max apogee"},{value:"target_apogee",label:"Target apogee"}]})]}),g==="target_apogee"&&R.jsxs("label",{children:["Target m",R.jsx("input",{type:"number",value:A,onChange:y=>m(y.target.value)})]}),R.jsxs("label",{children:["Min stab cal",R.jsx("input",{type:"number",step:"0.5",value:C,onChange:y=>w(y.target.value)})]}),R.jsx("button",{onClick:_,disabled:T,children:T?"Running…":"Run sweep"})]}),S&&R.jsxs("div",{className:"opt-res",children:[R.jsxs("p",{children:["Baseline ",R.jsx("b",{children:S.baseline_value.toFixed(2)})," ·"," ",S.best_value!=null?R.jsxs(R.Fragment,{children:["Best"," ",R.jsx("b",{className:"hit",children:S.best_value.toFixed(2)})," ","→ apogee"," ",R.jsxs("b",{children:[S.best_apogee?.toFixed(1)," m"]})]}):R.jsx("span",{className:"bad",children:"No feasible point (all unstable)"})]}),R.jsxs("table",{children:[R.jsx("thead",{children:R.jsxs("tr",{children:[R.jsx("th",{children:"Value"}),R.jsx("th",{children:"Apogee m"}),R.jsx("th",{children:"Stability cal"}),R.jsx("th",{})]})}),R.jsx("tbody",{children:S.points.map((y,L)=>R.jsxs("tr",{className:y.value===S.best_value?"sel":"",children:[R.jsx("td",{children:y.value.toFixed(2)}),R.jsx("td",{children:y.apogee.toFixed(1)}),R.jsx("td",{children:y.margin_cal.toFixed(2)}),R.jsx("td",{children:y.feasible?"":R.jsx("span",{className:"bad",children:"unstable"})})]},L))})]})]})]})]})}function W1({spec:t}){const[e,n,i,r]=t.split("|"),[s,o]=pe.useState(null),[a,l]=pe.useState(null);return pe.useEffect(()=>{hv(decodeURIComponent(e)).then(o).catch(c=>l(String(c)))},[e]),a?R.jsx("div",{id:"raw-err",style:{color:"red"},children:a}):s?R.jsx("div",{id:"raw-ready",style:{width:1280,height:720,overflow:"hidden"},children:n==="blueprint"?R.jsx(h0,{rv:s.view,raw:!0}):R.jsx(c0,{rv:s.view,mode:n||"finished",raw:parseInt(i||"0",10),keyBg:r==="key"})}):R.jsx("div",{id:"raw-loading",children:"loading"})}function j1(){const t=typeof window<"u"?window.location.hash:"";return t.startsWith("#raw=")?R.jsx(W1,{spec:t.slice(5)}):R.jsx(X1,{})}function X1(){const[t,e]=pe.useState(null),[n,i]=pe.useState(null),[r,s]=pe.useState(""),[o,a]=pe.useState("side"),[l,c]=pe.useState(!1),[h,u]=pe.useState(null),[f,p]=pe.useState([]),[v,x]=pe.useState(null),[g,d]=pe.useState(null),[A,m]=pe.useState("design"),[C,w]=pe.useState(0),[S,I]=pe.useState([]),[T,z]=pe.useState(.5),[_,y]=pe.useState(null);pe.useEffect(()=>{rx().then(p).catch(()=>{})},[]);const L=t?.view??null,N=t?.stability??null,G=pe.useMemo(()=>t?.tree.find(H=>H.id===v)??null,[t,v]);async function Z(H,K){c(!0),u(null);try{K?.(await H())}catch(Me){u(String(Me))}finally{c(!1)}}const B=H=>{e(H),i(null),x(null),s(H.view.simulations[0]??""),dv().then(I).catch(()=>I([]))},Q=H=>Z(()=>hv(H),B),D=H=>Z(()=>jC(H),B),J=()=>Z(()=>XC(),B),q=H=>Z(()=>YC(H),B),ie=()=>{const H=ve.current;if(!H)return;const K=H.view.simulations[0]??"";Z(()=>zp(K||null),Me=>i(Me))},le=pe.useRef(null),ve=pe.useRef(null);ve.current=t,pe.useEffect(()=>{const H=new URLSearchParams(window.location.search),K=H.get("ork_b64"),Me=H.get("example"),Pe=H.get("path");K?D(K):Me?Q(`/orks/${Me}`):Pe&&Q(Pe);const Ze=ye=>{if(ye.source!==window.parent)return;const Y=ye.data;!Y||typeof Y!="object"||(Y.type==="workbench:load_design"?typeof Y.b64=="string"?D(Y.b64):typeof Y.example=="string"?Q(`/orks/${Y.example}`):typeof Y.path=="string"&&Q(Y.path):Y.type==="workbench:run_simulate"&&ie())};window.addEventListener("message",Ze),window.parent!==window&&window.parent.postMessage({type:"workbench:ready"},"*");let U=null;if(typeof BroadcastChannel<"u"){U=new BroadcastChannel("opsrocket-workbench"),le.current=U;const ye=Y=>{const $=Y.data;if(!(!$||typeof $!="object"))if($.type==="ping"){const xe=ve.current;if(!xe)return;kp().then(({ork_b64:fe})=>{U.postMessage({type:"state",state:{name:xe.view.name,ork_b64:fe,total_length_m:xe.view.total_length,components:xe.view.components.length}})}).catch(()=>{})}else $.type==="load_design"&&typeof $.b64=="string"?D($.b64):$.type==="run_simulate"&&ie()};U.addEventListener("message",ye),U.postMessage({type:"ready"})}return()=>{window.removeEventListener("message",Ze),U&&(U.close(),le.current=null)}},[]),pe.useEffect(()=>{const H=le.current;if(!H)return;if(!t){H.postMessage({type:"state",state:null});return}let K=!0;return kp().then(({ork_b64:Me})=>{K&&H.postMessage({type:"state",state:{name:t.view.name,ork_b64:Me,total_length_m:t.view.total_length,components:t.view.components.length}})}).catch(()=>{}),()=>{K=!1}},[t]);const V=(H,K,Me)=>Z(()=>ZC(H,K,Me),Pe=>e(Pe)),ne=H=>Z(()=>JC(H),K=>{e(K),v===H&&x(null)}),oe=(H,K)=>{const Me=new Set((t?.tree??[]).map(Pe=>Pe.id));y(null),Z(()=>KC(H,K),Pe=>{e(Pe);const Ze=Pe.tree.find(U=>!Me.has(U.id));Ze&&x(Ze.id)})},ae=()=>{if(!t)return;const H=t.tree.find(Me=>Me.id===v),K=H&&zc(H.kind).length>0?H:t.tree.find(Me=>zc(Me.kind).length>0);K&&(x(K.id),y(K.id))},ke=(H,K)=>Z(()=>$C(r,H,K),Me=>e(Me)),De=H=>{e(H),x(K=>K&&H.tree.some(Me=>Me.id===K)?K:null)},Be=()=>Z(()=>QC(),De),He=()=>Z(()=>qC(),De);pe.useEffect(()=>{const H=K=>{if(!t||l)return;const Me=K.target,Pe=Me?.tagName;if(Pe==="INPUT"||Pe==="TEXTAREA"||Pe==="SELECT"||Me?.isContentEditable)return;const Ze=K.key==="z"||K.key==="Z",U=K.key==="y"||K.key==="Y";(K.metaKey||K.ctrlKey)&&Ze?(K.preventDefault(),K.shiftKey?He():Be()):K.ctrlKey&&U&&(K.preventDefault(),He())};return window.addEventListener("keydown",H),()=>window.removeEventListener("keydown",H)},[t,l,r]);const re=()=>Z(()=>zp(r||null),H=>i(H)),P=pe.useRef(null),ge=pe.useRef(null),Ae=H=>{const K=P.current;!K||K.scrollWidth<=K.clientWidth||Math.abs(H.deltaX)>=Math.abs(H.deltaY)||(K.scrollLeft+=H.deltaY)},ue=H=>{const K=P.current;if(!K)return;const Me=H.target;Me!==K&&Me.tagName!=="H1"||(ge.current={x:H.clientX,left:K.scrollLeft},K.classList.add("grab"),K.setPointerCapture(H.pointerId))},_e=H=>{const K=P.current;K&&ge.current&&(K.scrollLeft=ge.current.left-(H.clientX-ge.current.x))},Ue=H=>{const K=P.current;if(K){ge.current=null,K.classList.remove("grab");try{K.releasePointerCapture(H.pointerId)}catch{}}},Se=pe.useRef(null),b=pe.useRef(!1),M=H=>{b.current=!0,H.target.setPointerCapture(H.pointerId),H.preventDefault()},W=H=>{if(!b.current||!Se.current)return;const K=Se.current.getBoundingClientRect(),Me=(H.clientY-K.top)/K.height;z(Math.min(.85,Math.max(.15,Me)))},ee=H=>{b.current=!1;try{H.target.releasePointerCapture(H.pointerId)}catch{}},se=()=>{n&&L1(n,L?.name??"flight",r)},te=()=>{D1(L?.name??"rocket")||u("Open the Side/3D view before exporting an image")},be=()=>{L&&N1(L,L.name)},Ce=t?.sims.find(H=>H.name===r)??null,we=pe.useMemo(()=>{if(!L||!N)return null;const H=t?.config,K=H?.simulations.find(fe=>fe.name===r)?.config_id??H?.default_config??H?.configs[0]?.config_id??null;let Me=L.max_radius;const Pe=L.lathe.filter(fe=>Math.abs(fe.radial??0)<1e-4);Pe.length&&(Me=Math.max(...Pe.map(fe=>Math.max(...fe.outer.map(([,ze])=>ze)))));const Ze=L.total_length*100;let U=0,ye=!1;for(const fe of H?.mounts??[]){const ze=fe.assignments.find(Mt=>Mt.config_id===K);if(!ze||!ze.digest&&!ze.designation)continue;const rt=S.find(Mt=>ze.digest&&Mt.digest===ze.digest)??S.find(Mt=>Mt.designation===ze.designation);rt&&(U+=rt.total_mass_g*Math.max(1,fe.instances??1),ye=!0)}const Y=H?.configs.find(fe=>fe.config_id===K)?.name||(()=>{const fe=(H?.mounts??[]).map(ze=>ze.assignments.find(rt=>rt.config_id===K)?.designation).filter(ze=>!!ze);return fe.length?`[${fe.join("; ")}]`:"[No motors]"})();let $=null,xe=null;if(n&&n.velocity.length>1){$=Math.max(...n.velocity);let fe=0;for(let ze=1;ze<n.velocity.length;ze++){const rt=n.time[ze]-n.time[ze-1];rt>0&&(fe=Math.max(fe,(n.velocity[ze]-n.velocity[ze-1])/rt))}xe=fe}return{name:L.name,length_cm:Ze,max_diam_cm:Me*200,mass_g:N.mass_g,mass_motors_g:ye?N.mass_g+U:null,margin_cal:N.margin_cal,margin_pct:Ze>0?(N.cp_cm-N.cg_cm)/Ze*100:0,cg_cm:N.cg_cm,cp_cm:N.cp_cm,mach:.3,config_name:Y,apogee_m:n?n.apogee:null,max_velocity_ms:$,max_velocity_mach:$!=null?$/340.3:null,max_accel_ms2:xe}},[L,N,t,r,n,S]),Ye=H=>{d(`Saved → ${H.saved}`),setTimeout(()=>d(null),2500)},de=()=>Z(()=>Bc(),Ye),Te=H=>Z(()=>Bc(H),Ye),Ge=()=>Z(()=>Bc(`${(L?.name??"rocket").replace(/\W+/g,"_")}.ork`),Ye);return R.jsxs("div",{className:"app",children:[R.jsxs("header",{ref:P,onWheel:Ae,onPointerDown:ue,onPointerMove:_e,onPointerUp:Ue,children:[R.jsx("a",{href:"/",target:"_top",className:"logo-link",title:"Home",children:R.jsx("img",{className:"logo",src:"/ops.png",alt:"OpsRocket"})}),R.jsx(sx,{fixtures:f,busy:l,hasDoc:!!t,canExportCsv:!!n,onNew:J,onOpenFile:q,onOpenExample:Q,onSave:de,onSaveAs:Te,onExportCsv:se,onExportPng:te,onExportObj:be,onExportOrk:Ge}),L&&R.jsxs(R.Fragment,{children:[R.jsx($i,{className:"simsel",value:r,onChange:s,options:L.simulations.map(H=>({value:H,label:H}))}),R.jsx("button",{onClick:re,disabled:l||!L.simulations.length,children:"Simulate"}),R.jsx("button",{className:"ghost",onClick:Be,disabled:l,title:"Undo (⌘Z / Ctrl+Z)",children:"↶ Undo"}),R.jsx("button",{className:"ghost",onClick:He,disabled:l,title:"Redo (⇧⌘Z / Ctrl+Y)",children:"↷ Redo"}),R.jsx($i,{title:"View",value:o,onChange:H=>a(H),options:[{value:"side",label:"Side view"},{value:"top",label:"Top view"},{value:"back",label:"Back view"},{value:"figure",label:"3D Figure"},{value:"unfinished",label:"3D Unfinished"},{value:"finished",label:"3D Finished"}]}),(o==="side"||o==="top"||o==="back")&&R.jsxs("span",{className:"rollctl",title:"Change the rocket's roll rotation (only affects the rocket view)",children:[R.jsx("input",{type:"number",value:C,step:1,onChange:H=>w((Number(H.target.value)%360+360)%360),style:{width:56}}),R.jsx("span",{style:{opacity:.7},children:"°"}),R.jsx("input",{type:"range",min:0,max:359,value:C,onChange:H=>w(Number(H.target.value)),title:"Roll"})]}),["design","motors","sim","analysis"].map(H=>R.jsx("button",{className:A===H?"":"ghost",onClick:()=>m(H),children:H==="design"?"Design":H==="motors"?"Motors":H==="sim"?"Conditions":"Analysis"},H))]}),g&&R.jsx("span",{className:"ok",children:g}),h&&R.jsx("span",{className:"err",children:h})]}),L&&R.jsxs("div",{className:"metabar",children:[L.name,L.designer?` — ${L.designer}`:""," ·"," ",(L.total_length*100).toFixed(1)," cm"]}),N&&R.jsxs("div",{className:"statbar",children:[R.jsxs("span",{children:["Mass ",R.jsxs("b",{children:[N.mass_g.toFixed(1)," g"]})]}),R.jsxs("span",{children:["CG ",R.jsxs("b",{children:[N.cg_cm.toFixed(2)," cm"]})]}),R.jsxs("span",{children:["CP ",R.jsxs("b",{children:[N.cp_cm.toFixed(2)," cm"]})]}),R.jsxs("span",{className:N.stable?"good":"bad",children:["Stability ",R.jsxs("b",{children:[N.margin_cal.toFixed(2)," cal"]})]}),R.jsxs("span",{children:["Ø ",R.jsxs("b",{children:[N.ref_diameter_mm.toFixed(1)," mm"]})]}),R.jsxs("span",{children:["Cᴅ ",R.jsx("b",{children:N.cd.toFixed(3)})]})]}),R.jsxs("div",{className:"main",children:[R.jsxs("aside",{className:"sidebar",children:[R.jsxs("div",{className:"sidebar-head",children:[R.jsx("h2",{children:"Components"}),t&&R.jsx("button",{className:"new-btn",onClick:ae,title:"Add a new component",children:"+ New"})]}),t?t.tree.map(H=>{const K=zc(H.kind);return R.jsxs("div",{children:[R.jsxs("div",{className:"tree-item"+(H.id===v?" sel":""),style:{paddingLeft:8+H.depth*14},onClick:()=>x(H.id),children:[Qg[H.kind]&&R.jsx("img",{className:"ci",src:Qg[H.kind],alt:"",title:H.kind,draggable:!1}),R.jsx("span",{className:"nm",children:H.name}),K.length>0&&R.jsx("button",{className:"add",title:"Add child component",onClick:Me=>{Me.stopPropagation(),y(_===H.id?null:H.id)},children:"+"}),H.kind!=="Stage"&&R.jsx("button",{className:"del",title:"Delete",onClick:Me=>{Me.stopPropagation(),ne(H.id)},children:"×"})]}),_===H.id&&K.length>0&&R.jsx("div",{className:"add-menu",style:{paddingLeft:8+(H.depth+1)*14},children:K.map(Me=>R.jsxs("button",{className:"add-opt",onClick:Pe=>{Pe.stopPropagation(),oe(H.id,Me)},children:["+ ",Me]},Me))})]},H.id)}):R.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),R.jsxs("div",{className:"viewport",ref:Se,style:{gridTemplateRows:`${T}fr 3px ${1-T}fr`},children:[R.jsxs("div",{className:"panel",children:[!(A==="design"&&(o==="side"||o==="top"||o==="back"))&&R.jsx("span",{className:"tag",children:A==="motors"?"Motors & configurations":A==="sim"?`Conditions — ${r}`:A==="analysis"?"Analysis & optimization":o==="side"?"Side view":o==="top"?"Top view":o==="back"?"Back view":`3D ${o}`}),t?A==="motors"?R.jsx(G1,{config:t.config,onWorkbench:e,setBusy:c,setErr:u,busy:l}):A==="sim"?R.jsx("div",{className:"conditions",children:Ce?R.jsx(d0,{fields:Ce.fields,onCommit:ke}):R.jsx("div",{className:"empty",children:"No simulation selected"})}):A==="analysis"?R.jsx(H1,{tree:t.tree,sim:r,setErr:u}):o==="side"||o==="top"||o==="back"?R.jsx(h0,{rv:L,overlay:we,rollDeg:C+(o==="top"?90:o==="back"?180:0),onRollDelta:H=>w(K=>(Math.round(K+H)%360+360)%360)}):R.jsx(c0,{rv:L,mode:o==="finished"?"finished":o==="unfinished"?"unfinished":"figure",preset:"3d"}):R.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),R.jsx("div",{className:"vsplit",onPointerDown:M,onPointerMove:W,onPointerUp:ee,title:"Drag to resize"}),R.jsxs("div",{className:"panel",style:{borderBottom:"none"},children:[R.jsx("span",{className:"tag",children:"Flight"}),n?R.jsx(F1,{fd:n}):R.jsx("div",{className:"empty",children:"Run a simulation"})]})]}),R.jsxs("aside",{className:"inspector",children:[R.jsx("h2",{children:"Properties"}),R.jsx(B1,{node:G,onPatch:V,busy:l})]})]}),R.jsx("footer",{children:n?R.jsxs(R.Fragment,{children:[R.jsxs("span",{children:["Apogee ",R.jsxs("b",{children:[n.apogee.toFixed(1)," m"]})]}),R.jsxs("span",{children:["t‑apogee ",R.jsxs("b",{children:[n.time_to_apogee.toFixed(2)," s"]})]}),R.jsxs("span",{children:["Flight time ",R.jsxs("b",{children:[n.flight_time.toFixed(2)," s"]})]}),R.jsxs("span",{children:["Ground hit ",R.jsxs("b",{children:[n.ground_hit_velocity.toFixed(2)," m/s"]})]})]}):R.jsx("span",{style:{color:"#9a7b56"},children:"OpsRocket — Rust core · live design workbench · React + Three.js"})})]})}xu.createRoot(document.getElementById("root")).render(R.jsx(D0.StrictMode,{children:R.jsx(j1,{})}));
