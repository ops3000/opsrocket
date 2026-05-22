(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function x0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var tg={exports:{}},jl={},ng={exports:{}},Ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ko=Symbol.for("react.element"),y0=Symbol.for("react.portal"),I0=Symbol.for("react.fragment"),M0=Symbol.for("react.strict_mode"),S0=Symbol.for("react.profiler"),E0=Symbol.for("react.provider"),w0=Symbol.for("react.context"),T0=Symbol.for("react.forward_ref"),R0=Symbol.for("react.suspense"),b0=Symbol.for("react.memo"),P0=Symbol.for("react.lazy"),Lf=Symbol.iterator;function L0(t){return t===null||typeof t!="object"?null:(t=Lf&&t[Lf]||t["@@iterator"],typeof t=="function"?t:null)}var ig={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},rg=Object.assign,sg={};function Hs(t,e,n){this.props=t,this.context=e,this.refs=sg,this.updater=n||ig}Hs.prototype.isReactComponent={};Hs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Hs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function og(){}og.prototype=Hs.prototype;function ad(t,e,n){this.props=t,this.context=e,this.refs=sg,this.updater=n||ig}var ld=ad.prototype=new og;ld.constructor=ad;rg(ld,Hs.prototype);ld.isPureReactComponent=!0;var Nf=Array.isArray,ag=Object.prototype.hasOwnProperty,cd={current:null},lg={key:!0,ref:!0,__self:!0,__source:!0};function cg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)ag.call(e,i)&&!lg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Ko,type:t,key:s,ref:o,props:r,_owner:cd.current}}function N0(t,e){return{$$typeof:Ko,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ud(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ko}function D0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Df=/\/+/g;function gc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?D0(""+t.key):e.toString(36)}function Za(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ko:case y0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+gc(o,0):i,Nf(r)?(n="",t!=null&&(n=t.replace(Df,"$&/")+"/"),Za(r,e,n,"",function(c){return c})):r!=null&&(ud(r)&&(r=N0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Df,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Nf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+gc(s,a);o+=Za(s,e,n,l,r)}else if(l=L0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+gc(s,a++),o+=Za(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function oa(t,e,n){if(t==null)return t;var i=[],r=0;return Za(t,i,"","",function(s){return e.call(n,s,r++)}),i}function U0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var on={current:null},Ja={transition:null},O0={ReactCurrentDispatcher:on,ReactCurrentBatchConfig:Ja,ReactCurrentOwner:cd};function ug(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:oa,forEach:function(t,e,n){oa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return oa(t,function(){e++}),e},toArray:function(t){return oa(t,function(e){return e})||[]},only:function(t){if(!ud(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Component=Hs;Ze.Fragment=I0;Ze.Profiler=S0;Ze.PureComponent=ad;Ze.StrictMode=M0;Ze.Suspense=R0;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O0;Ze.act=ug;Ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=rg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=cd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)ag.call(e,l)&&!lg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Ko,type:t.type,key:r,ref:s,props:i,_owner:o}};Ze.createContext=function(t){return t={$$typeof:w0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:E0,_context:t},t.Consumer=t};Ze.createElement=cg;Ze.createFactory=function(t){var e=cg.bind(null,t);return e.type=t,e};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:T0,render:t}};Ze.isValidElement=ud;Ze.lazy=function(t){return{$$typeof:P0,_payload:{_status:-1,_result:t},_init:U0}};Ze.memo=function(t,e){return{$$typeof:b0,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=Ja.transition;Ja.transition={};try{t()}finally{Ja.transition=e}};Ze.unstable_act=ug;Ze.useCallback=function(t,e){return on.current.useCallback(t,e)};Ze.useContext=function(t){return on.current.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t){return on.current.useDeferredValue(t)};Ze.useEffect=function(t,e){return on.current.useEffect(t,e)};Ze.useId=function(){return on.current.useId()};Ze.useImperativeHandle=function(t,e,n){return on.current.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return on.current.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return on.current.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return on.current.useMemo(t,e)};Ze.useReducer=function(t,e,n){return on.current.useReducer(t,e,n)};Ze.useRef=function(t){return on.current.useRef(t)};Ze.useState=function(t){return on.current.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return on.current.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return on.current.useTransition()};Ze.version="18.3.1";ng.exports=Ze;var se=ng.exports;const F0=x0(se);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var k0=se,z0=Symbol.for("react.element"),B0=Symbol.for("react.fragment"),G0=Object.prototype.hasOwnProperty,V0=k0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,H0={key:!0,ref:!0,__self:!0,__source:!0};function hg(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)G0.call(e,i)&&!H0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:z0,type:t,key:s,ref:o,props:r,_owner:V0.current}}jl.Fragment=B0;jl.jsx=hg;jl.jsxs=hg;tg.exports=jl;var S=tg.exports,Mu={},dg={exports:{}},In={},fg={exports:{}},pg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,j){var J=D.length;D.push(j);e:for(;0<J;){var ie=J-1>>>1,re=D[ie];if(0<r(re,j))D[ie]=j,D[J]=re,J=ie;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var j=D[0],J=D.pop();if(J!==j){D[0]=J;e:for(var ie=0,re=D.length,Ae=re>>>1;ie<Ae;){var H=2*(ie+1)-1,q=D[H],ae=H+1,le=D[ae];if(0>r(q,J))ae<re&&0>r(le,q)?(D[ie]=le,D[ae]=J,ie=ae):(D[ie]=q,D[H]=J,ie=H);else if(ae<re&&0>r(le,J))D[ie]=le,D[ae]=J,ie=ae;else break e}}return j}function r(D,j){var J=D.sortIndex-j.sortIndex;return J!==0?J:D.id-j.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,u=null,f=3,p=!1,g=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(D){for(var j=n(c);j!==null;){if(j.callback===null)i(c);else if(j.startTime<=D)i(c),j.sortIndex=j.expirationTime,e(l,j);else break;j=n(c)}}function y(D){if(_=!1,v(D),!g)if(n(l)!==null)g=!0,W(P);else{var j=n(c);j!==null&&Q(y,j.startTime-D)}}function P(D,j){g=!1,_&&(_=!1,d(T),T=-1),p=!0;var J=f;try{for(v(j),u=n(l);u!==null&&(!(u.expirationTime>j)||D&&!I());){var ie=u.callback;if(typeof ie=="function"){u.callback=null,f=u.priorityLevel;var re=ie(u.expirationTime<=j);j=t.unstable_now(),typeof re=="function"?u.callback=re:u===n(l)&&i(l),v(j)}else i(l);u=n(l)}if(u!==null)var Ae=!0;else{var H=n(c);H!==null&&Q(y,H.startTime-j),Ae=!1}return Ae}finally{u=null,f=J,p=!1}}var w=!1,C=null,T=-1,B=5,x=-1;function I(){return!(t.unstable_now()-x<B)}function N(){if(C!==null){var D=t.unstable_now();x=D;var j=!0;try{j=C(!0,D)}finally{j?F():(w=!1,C=null)}}else w=!1}var F;if(typeof A=="function")F=function(){A(N)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,K=V.port2;V.port1.onmessage=N,F=function(){K.postMessage(null)}}else F=function(){m(N,0)};function W(D){C=D,w||(w=!0,F())}function Q(D,j){T=m(function(){D(t.unstable_now())},j)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,W(P))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(f){case 1:case 2:case 3:var j=3;break;default:j=f}var J=f;f=j;try{return D()}finally{f=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,j){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var J=f;f=D;try{return j()}finally{f=J}},t.unstable_scheduleCallback=function(D,j,J){var ie=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ie+J:ie):J=ie,D){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=J+re,D={id:h++,callback:j,priorityLevel:D,startTime:J,expirationTime:re,sortIndex:-1},J>ie?(D.sortIndex=J,e(c,D),n(l)===null&&D===n(c)&&(_?(d(T),T=-1):_=!0,Q(y,J-ie))):(D.sortIndex=re,e(l,D),g||p||(g=!0,W(P))),D},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(D){var j=f;return function(){var J=f;f=j;try{return D.apply(this,arguments)}finally{f=J}}}})(pg);fg.exports=pg;var W0=fg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j0=se,yn=W0;function ue(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mg=new Set,wo={};function Or(t,e){Rs(t,e),Rs(t+"Capture",e)}function Rs(t,e){for(wo[t]=e,t=0;t<e.length;t++)mg.add(e[t])}var Si=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Su=Object.prototype.hasOwnProperty,X0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Uf={},Of={};function Y0(t){return Su.call(Of,t)?!0:Su.call(Uf,t)?!1:X0.test(t)?Of[t]=!0:(Uf[t]=!0,!1)}function Z0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function J0(t,e,n,i){if(e===null||typeof e>"u"||Z0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function an(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Wt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Wt[t]=new an(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Wt[e]=new an(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Wt[t]=new an(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Wt[t]=new an(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Wt[t]=new an(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Wt[t]=new an(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Wt[t]=new an(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Wt[t]=new an(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Wt[t]=new an(t,5,!1,t.toLowerCase(),null,!1,!1)});var hd=/[\-:]([a-z])/g;function dd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(hd,dd);Wt[e]=new an(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(hd,dd);Wt[e]=new an(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(hd,dd);Wt[e]=new an(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Wt[t]=new an(t,1,!1,t.toLowerCase(),null,!1,!1)});Wt.xlinkHref=new an("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Wt[t]=new an(t,1,!1,t.toLowerCase(),null,!0,!0)});function fd(t,e,n,i){var r=Wt.hasOwnProperty(e)?Wt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(J0(e,n,r,i)&&(n=null),i||r===null?Y0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Li=j0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,aa=Symbol.for("react.element"),is=Symbol.for("react.portal"),rs=Symbol.for("react.fragment"),pd=Symbol.for("react.strict_mode"),Eu=Symbol.for("react.profiler"),gg=Symbol.for("react.provider"),Ag=Symbol.for("react.context"),md=Symbol.for("react.forward_ref"),wu=Symbol.for("react.suspense"),Tu=Symbol.for("react.suspense_list"),gd=Symbol.for("react.memo"),Gi=Symbol.for("react.lazy"),vg=Symbol.for("react.offscreen"),Ff=Symbol.iterator;function Zs(t){return t===null||typeof t!="object"?null:(t=Ff&&t[Ff]||t["@@iterator"],typeof t=="function"?t:null)}var _t=Object.assign,Ac;function ao(t){if(Ac===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ac=e&&e[1]||""}return`
`+Ac+t}var vc=!1;function _c(t,e){if(!t||vc)return"";vc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{vc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ao(t):""}function K0(t){switch(t.tag){case 5:return ao(t.type);case 16:return ao("Lazy");case 13:return ao("Suspense");case 19:return ao("SuspenseList");case 0:case 2:case 15:return t=_c(t.type,!1),t;case 11:return t=_c(t.type.render,!1),t;case 1:return t=_c(t.type,!0),t;default:return""}}function Ru(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case rs:return"Fragment";case is:return"Portal";case Eu:return"Profiler";case pd:return"StrictMode";case wu:return"Suspense";case Tu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Ag:return(t.displayName||"Context")+".Consumer";case gg:return(t._context.displayName||"Context")+".Provider";case md:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case gd:return e=t.displayName||null,e!==null?e:Ru(t.type)||"Memo";case Gi:e=t._payload,t=t._init;try{return Ru(t(e))}catch{}}return null}function Q0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ru(e);case 8:return e===pd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function sr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _g(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function q0(t){var e=_g(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function la(t){t._valueTracker||(t._valueTracker=q0(t))}function Cg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=_g(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function fl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function bu(t,e){var n=e.checked;return _t({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function kf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=sr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function xg(t,e){e=e.checked,e!=null&&fd(t,"checked",e,!1)}function Pu(t,e){xg(t,e);var n=sr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Lu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Lu(t,e.type,sr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function zf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Lu(t,e,n){(e!=="number"||fl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var lo=Array.isArray;function vs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+sr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Nu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ue(91));return _t({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Bf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ue(92));if(lo(n)){if(1<n.length)throw Error(ue(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:sr(n)}}function yg(t,e){var n=sr(e.value),i=sr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Gf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Ig(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Du(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Ig(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ca,Mg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ca=ca||document.createElement("div"),ca.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ca.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function To(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var fo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$0=["Webkit","ms","Moz","O"];Object.keys(fo).forEach(function(t){$0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),fo[e]=fo[t]})});function Sg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||fo.hasOwnProperty(t)&&fo[t]?(""+e).trim():e+"px"}function Eg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Sg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var e_=_t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Uu(t,e){if(e){if(e_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ue(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ue(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ue(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ue(62))}}function Ou(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fu=null;function Ad(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ku=null,_s=null,Cs=null;function Vf(t){if(t=$o(t)){if(typeof ku!="function")throw Error(ue(280));var e=t.stateNode;e&&(e=Kl(e),ku(t.stateNode,t.type,e))}}function wg(t){_s?Cs?Cs.push(t):Cs=[t]:_s=t}function Tg(){if(_s){var t=_s,e=Cs;if(Cs=_s=null,Vf(t),e)for(t=0;t<e.length;t++)Vf(e[t])}}function Rg(t,e){return t(e)}function bg(){}var Cc=!1;function Pg(t,e,n){if(Cc)return t(e,n);Cc=!0;try{return Rg(t,e,n)}finally{Cc=!1,(_s!==null||Cs!==null)&&(bg(),Tg())}}function Ro(t,e){var n=t.stateNode;if(n===null)return null;var i=Kl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ue(231,e,typeof n));return n}var zu=!1;if(Si)try{var Js={};Object.defineProperty(Js,"passive",{get:function(){zu=!0}}),window.addEventListener("test",Js,Js),window.removeEventListener("test",Js,Js)}catch{zu=!1}function t_(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var po=!1,pl=null,ml=!1,Bu=null,n_={onError:function(t){po=!0,pl=t}};function i_(t,e,n,i,r,s,o,a,l){po=!1,pl=null,t_.apply(n_,arguments)}function r_(t,e,n,i,r,s,o,a,l){if(i_.apply(this,arguments),po){if(po){var c=pl;po=!1,pl=null}else throw Error(ue(198));ml||(ml=!0,Bu=c)}}function Fr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Lg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Hf(t){if(Fr(t)!==t)throw Error(ue(188))}function s_(t){var e=t.alternate;if(!e){if(e=Fr(t),e===null)throw Error(ue(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Hf(r),t;if(s===i)return Hf(r),e;s=s.sibling}throw Error(ue(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ue(189))}}if(n.alternate!==i)throw Error(ue(190))}if(n.tag!==3)throw Error(ue(188));return n.stateNode.current===n?t:e}function Ng(t){return t=s_(t),t!==null?Dg(t):null}function Dg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Dg(t);if(e!==null)return e;t=t.sibling}return null}var Ug=yn.unstable_scheduleCallback,Wf=yn.unstable_cancelCallback,o_=yn.unstable_shouldYield,a_=yn.unstable_requestPaint,wt=yn.unstable_now,l_=yn.unstable_getCurrentPriorityLevel,vd=yn.unstable_ImmediatePriority,Og=yn.unstable_UserBlockingPriority,gl=yn.unstable_NormalPriority,c_=yn.unstable_LowPriority,Fg=yn.unstable_IdlePriority,Xl=null,ii=null;function u_(t){if(ii&&typeof ii.onCommitFiberRoot=="function")try{ii.onCommitFiberRoot(Xl,t,void 0,(t.current.flags&128)===128)}catch{}}var Zn=Math.clz32?Math.clz32:f_,h_=Math.log,d_=Math.LN2;function f_(t){return t>>>=0,t===0?32:31-(h_(t)/d_|0)|0}var ua=64,ha=4194304;function co(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Al(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=co(a):(s&=o,s!==0&&(i=co(s)))}else o=n&~r,o!==0?i=co(o):s!==0&&(i=co(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Zn(e),r=1<<n,i|=t[n],e&=~r;return i}function p_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function m_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Zn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=p_(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Gu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function kg(){var t=ua;return ua<<=1,!(ua&4194240)&&(ua=64),t}function xc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Qo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Zn(e),t[e]=n}function g_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Zn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function _d(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Zn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function zg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Bg,Cd,Gg,Vg,Hg,Vu=!1,da=[],Ki=null,Qi=null,qi=null,bo=new Map,Po=new Map,Wi=[],A_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function jf(t,e){switch(t){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Qi=null;break;case"mouseover":case"mouseout":qi=null;break;case"pointerover":case"pointerout":bo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Po.delete(e.pointerId)}}function Ks(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=$o(e),e!==null&&Cd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function v_(t,e,n,i,r){switch(e){case"focusin":return Ki=Ks(Ki,t,e,n,i,r),!0;case"dragenter":return Qi=Ks(Qi,t,e,n,i,r),!0;case"mouseover":return qi=Ks(qi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return bo.set(s,Ks(bo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Po.set(s,Ks(Po.get(s)||null,t,e,n,i,r)),!0}return!1}function Wg(t){var e=xr(t.target);if(e!==null){var n=Fr(e);if(n!==null){if(e=n.tag,e===13){if(e=Lg(n),e!==null){t.blockedOn=e,Hg(t.priority,function(){Gg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ka(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Hu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Fu=i,n.target.dispatchEvent(i),Fu=null}else return e=$o(n),e!==null&&Cd(e),t.blockedOn=n,!1;e.shift()}return!0}function Xf(t,e,n){Ka(t)&&n.delete(e)}function __(){Vu=!1,Ki!==null&&Ka(Ki)&&(Ki=null),Qi!==null&&Ka(Qi)&&(Qi=null),qi!==null&&Ka(qi)&&(qi=null),bo.forEach(Xf),Po.forEach(Xf)}function Qs(t,e){t.blockedOn===e&&(t.blockedOn=null,Vu||(Vu=!0,yn.unstable_scheduleCallback(yn.unstable_NormalPriority,__)))}function Lo(t){function e(r){return Qs(r,t)}if(0<da.length){Qs(da[0],t);for(var n=1;n<da.length;n++){var i=da[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Ki!==null&&Qs(Ki,t),Qi!==null&&Qs(Qi,t),qi!==null&&Qs(qi,t),bo.forEach(e),Po.forEach(e),n=0;n<Wi.length;n++)i=Wi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Wi.length&&(n=Wi[0],n.blockedOn===null);)Wg(n),n.blockedOn===null&&Wi.shift()}var xs=Li.ReactCurrentBatchConfig,vl=!0;function C_(t,e,n,i){var r=it,s=xs.transition;xs.transition=null;try{it=1,xd(t,e,n,i)}finally{it=r,xs.transition=s}}function x_(t,e,n,i){var r=it,s=xs.transition;xs.transition=null;try{it=4,xd(t,e,n,i)}finally{it=r,xs.transition=s}}function xd(t,e,n,i){if(vl){var r=Hu(t,e,n,i);if(r===null)Pc(t,e,i,_l,n),jf(t,i);else if(v_(r,t,e,n,i))i.stopPropagation();else if(jf(t,i),e&4&&-1<A_.indexOf(t)){for(;r!==null;){var s=$o(r);if(s!==null&&Bg(s),s=Hu(t,e,n,i),s===null&&Pc(t,e,i,_l,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Pc(t,e,i,null,n)}}var _l=null;function Hu(t,e,n,i){if(_l=null,t=Ad(i),t=xr(t),t!==null)if(e=Fr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Lg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return _l=t,null}function jg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(l_()){case vd:return 1;case Og:return 4;case gl:case c_:return 16;case Fg:return 536870912;default:return 16}default:return 16}}var Yi=null,yd=null,Qa=null;function Xg(){if(Qa)return Qa;var t,e=yd,n=e.length,i,r="value"in Yi?Yi.value:Yi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Qa=r.slice(t,1<i?1-i:void 0)}function qa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fa(){return!0}function Yf(){return!1}function Mn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fa:Yf,this.isPropagationStopped=Yf,this}return _t(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fa)},persist:function(){},isPersistent:fa}),e}var Ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Id=Mn(Ws),qo=_t({},Ws,{view:0,detail:0}),y_=Mn(qo),yc,Ic,qs,Yl=_t({},qo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Md,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==qs&&(qs&&t.type==="mousemove"?(yc=t.screenX-qs.screenX,Ic=t.screenY-qs.screenY):Ic=yc=0,qs=t),yc)},movementY:function(t){return"movementY"in t?t.movementY:Ic}}),Zf=Mn(Yl),I_=_t({},Yl,{dataTransfer:0}),M_=Mn(I_),S_=_t({},qo,{relatedTarget:0}),Mc=Mn(S_),E_=_t({},Ws,{animationName:0,elapsedTime:0,pseudoElement:0}),w_=Mn(E_),T_=_t({},Ws,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),R_=Mn(T_),b_=_t({},Ws,{data:0}),Jf=Mn(b_),P_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},L_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},N_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function D_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=N_[t])?!!e[t]:!1}function Md(){return D_}var U_=_t({},qo,{key:function(t){if(t.key){var e=P_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=qa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?L_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Md,charCode:function(t){return t.type==="keypress"?qa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?qa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),O_=Mn(U_),F_=_t({},Yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Kf=Mn(F_),k_=_t({},qo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Md}),z_=Mn(k_),B_=_t({},Ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),G_=Mn(B_),V_=_t({},Yl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),H_=Mn(V_),W_=[9,13,27,32],Sd=Si&&"CompositionEvent"in window,mo=null;Si&&"documentMode"in document&&(mo=document.documentMode);var j_=Si&&"TextEvent"in window&&!mo,Yg=Si&&(!Sd||mo&&8<mo&&11>=mo),Qf=" ",qf=!1;function Zg(t,e){switch(t){case"keyup":return W_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ss=!1;function X_(t,e){switch(t){case"compositionend":return Jg(e);case"keypress":return e.which!==32?null:(qf=!0,Qf);case"textInput":return t=e.data,t===Qf&&qf?null:t;default:return null}}function Y_(t,e){if(ss)return t==="compositionend"||!Sd&&Zg(t,e)?(t=Xg(),Qa=yd=Yi=null,ss=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Yg&&e.locale!=="ko"?null:e.data;default:return null}}var Z_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $f(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Z_[t.type]:e==="textarea"}function Kg(t,e,n,i){wg(i),e=Cl(e,"onChange"),0<e.length&&(n=new Id("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var go=null,No=null;function J_(t){aA(t,0)}function Zl(t){var e=ls(t);if(Cg(e))return t}function K_(t,e){if(t==="change")return e}var Qg=!1;if(Si){var Sc;if(Si){var Ec="oninput"in document;if(!Ec){var ep=document.createElement("div");ep.setAttribute("oninput","return;"),Ec=typeof ep.oninput=="function"}Sc=Ec}else Sc=!1;Qg=Sc&&(!document.documentMode||9<document.documentMode)}function tp(){go&&(go.detachEvent("onpropertychange",qg),No=go=null)}function qg(t){if(t.propertyName==="value"&&Zl(No)){var e=[];Kg(e,No,t,Ad(t)),Pg(J_,e)}}function Q_(t,e,n){t==="focusin"?(tp(),go=e,No=n,go.attachEvent("onpropertychange",qg)):t==="focusout"&&tp()}function q_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Zl(No)}function $_(t,e){if(t==="click")return Zl(e)}function eC(t,e){if(t==="input"||t==="change")return Zl(e)}function tC(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Kn=typeof Object.is=="function"?Object.is:tC;function Do(t,e){if(Kn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Su.call(e,r)||!Kn(t[r],e[r]))return!1}return!0}function np(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ip(t,e){var n=np(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=np(n)}}function $g(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$g(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function eA(){for(var t=window,e=fl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=fl(t.document)}return e}function Ed(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function nC(t){var e=eA(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&$g(n.ownerDocument.documentElement,n)){if(i!==null&&Ed(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=ip(n,s);var o=ip(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var iC=Si&&"documentMode"in document&&11>=document.documentMode,os=null,Wu=null,Ao=null,ju=!1;function rp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ju||os==null||os!==fl(i)||(i=os,"selectionStart"in i&&Ed(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ao&&Do(Ao,i)||(Ao=i,i=Cl(Wu,"onSelect"),0<i.length&&(e=new Id("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=os)))}function pa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var as={animationend:pa("Animation","AnimationEnd"),animationiteration:pa("Animation","AnimationIteration"),animationstart:pa("Animation","AnimationStart"),transitionend:pa("Transition","TransitionEnd")},wc={},tA={};Si&&(tA=document.createElement("div").style,"AnimationEvent"in window||(delete as.animationend.animation,delete as.animationiteration.animation,delete as.animationstart.animation),"TransitionEvent"in window||delete as.transitionend.transition);function Jl(t){if(wc[t])return wc[t];if(!as[t])return t;var e=as[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in tA)return wc[t]=e[n];return t}var nA=Jl("animationend"),iA=Jl("animationiteration"),rA=Jl("animationstart"),sA=Jl("transitionend"),oA=new Map,sp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ar(t,e){oA.set(t,e),Or(e,[t])}for(var Tc=0;Tc<sp.length;Tc++){var Rc=sp[Tc],rC=Rc.toLowerCase(),sC=Rc[0].toUpperCase()+Rc.slice(1);ar(rC,"on"+sC)}ar(nA,"onAnimationEnd");ar(iA,"onAnimationIteration");ar(rA,"onAnimationStart");ar("dblclick","onDoubleClick");ar("focusin","onFocus");ar("focusout","onBlur");ar(sA,"onTransitionEnd");Rs("onMouseEnter",["mouseout","mouseover"]);Rs("onMouseLeave",["mouseout","mouseover"]);Rs("onPointerEnter",["pointerout","pointerover"]);Rs("onPointerLeave",["pointerout","pointerover"]);Or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Or("onBeforeInput",["compositionend","keypress","textInput","paste"]);Or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),oC=new Set("cancel close invalid load scroll toggle".split(" ").concat(uo));function op(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,r_(i,e,void 0,t),t.currentTarget=null}function aA(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;op(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;op(r,a,c),s=l}}}if(ml)throw t=Bu,ml=!1,Bu=null,t}function ut(t,e){var n=e[Ku];n===void 0&&(n=e[Ku]=new Set);var i=t+"__bubble";n.has(i)||(lA(e,t,2,!1),n.add(i))}function bc(t,e,n){var i=0;e&&(i|=4),lA(n,t,i,e)}var ma="_reactListening"+Math.random().toString(36).slice(2);function Uo(t){if(!t[ma]){t[ma]=!0,mg.forEach(function(n){n!=="selectionchange"&&(oC.has(n)||bc(n,!1,t),bc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ma]||(e[ma]=!0,bc("selectionchange",!1,e))}}function lA(t,e,n,i){switch(jg(e)){case 1:var r=C_;break;case 4:r=x_;break;default:r=xd}n=r.bind(null,e,n,t),r=void 0,!zu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Pc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=xr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Pg(function(){var c=s,h=Ad(n),u=[];e:{var f=oA.get(t);if(f!==void 0){var p=Id,g=t;switch(t){case"keypress":if(qa(n)===0)break e;case"keydown":case"keyup":p=O_;break;case"focusin":g="focus",p=Mc;break;case"focusout":g="blur",p=Mc;break;case"beforeblur":case"afterblur":p=Mc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=M_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=z_;break;case nA:case iA:case rA:p=w_;break;case sA:p=G_;break;case"scroll":p=y_;break;case"wheel":p=H_;break;case"copy":case"cut":case"paste":p=R_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Kf}var _=(e&4)!==0,m=!_&&t==="scroll",d=_?f!==null?f+"Capture":null:f;_=[];for(var A=c,v;A!==null;){v=A;var y=v.stateNode;if(v.tag===5&&y!==null&&(v=y,d!==null&&(y=Ro(A,d),y!=null&&_.push(Oo(A,y,v)))),m)break;A=A.return}0<_.length&&(f=new p(f,g,null,n,h),u.push({event:f,listeners:_}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Fu&&(g=n.relatedTarget||n.fromElement)&&(xr(g)||g[Ei]))break e;if((p||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?xr(g):null,g!==null&&(m=Fr(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(_=Zf,y="onMouseLeave",d="onMouseEnter",A="mouse",(t==="pointerout"||t==="pointerover")&&(_=Kf,y="onPointerLeave",d="onPointerEnter",A="pointer"),m=p==null?f:ls(p),v=g==null?f:ls(g),f=new _(y,A+"leave",p,n,h),f.target=m,f.relatedTarget=v,y=null,xr(h)===c&&(_=new _(d,A+"enter",g,n,h),_.target=v,_.relatedTarget=m,y=_),m=y,p&&g)t:{for(_=p,d=g,A=0,v=_;v;v=Gr(v))A++;for(v=0,y=d;y;y=Gr(y))v++;for(;0<A-v;)_=Gr(_),A--;for(;0<v-A;)d=Gr(d),v--;for(;A--;){if(_===d||d!==null&&_===d.alternate)break t;_=Gr(_),d=Gr(d)}_=null}else _=null;p!==null&&ap(u,f,p,_,!1),g!==null&&m!==null&&ap(u,m,g,_,!0)}}e:{if(f=c?ls(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var P=K_;else if($f(f))if(Qg)P=eC;else{P=q_;var w=Q_}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(P=$_);if(P&&(P=P(t,c))){Kg(u,P,n,h);break e}w&&w(t,f,c),t==="focusout"&&(w=f._wrapperState)&&w.controlled&&f.type==="number"&&Lu(f,"number",f.value)}switch(w=c?ls(c):window,t){case"focusin":($f(w)||w.contentEditable==="true")&&(os=w,Wu=c,Ao=null);break;case"focusout":Ao=Wu=os=null;break;case"mousedown":ju=!0;break;case"contextmenu":case"mouseup":case"dragend":ju=!1,rp(u,n,h);break;case"selectionchange":if(iC)break;case"keydown":case"keyup":rp(u,n,h)}var C;if(Sd)e:{switch(t){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else ss?Zg(t,n)&&(T="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Yg&&n.locale!=="ko"&&(ss||T!=="onCompositionStart"?T==="onCompositionEnd"&&ss&&(C=Xg()):(Yi=h,yd="value"in Yi?Yi.value:Yi.textContent,ss=!0)),w=Cl(c,T),0<w.length&&(T=new Jf(T,t,null,n,h),u.push({event:T,listeners:w}),C?T.data=C:(C=Jg(n),C!==null&&(T.data=C)))),(C=j_?X_(t,n):Y_(t,n))&&(c=Cl(c,"onBeforeInput"),0<c.length&&(h=new Jf("onBeforeInput","beforeinput",null,n,h),u.push({event:h,listeners:c}),h.data=C))}aA(u,e)})}function Oo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Cl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ro(t,n),s!=null&&i.unshift(Oo(t,s,r)),s=Ro(t,e),s!=null&&i.push(Oo(t,s,r))),t=t.return}return i}function Gr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ap(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Ro(n,s),l!=null&&o.unshift(Oo(n,l,a))):r||(l=Ro(n,s),l!=null&&o.push(Oo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var aC=/\r\n?/g,lC=/\u0000|\uFFFD/g;function lp(t){return(typeof t=="string"?t:""+t).replace(aC,`
`).replace(lC,"")}function ga(t,e,n){if(e=lp(e),lp(t)!==e&&n)throw Error(ue(425))}function xl(){}var Xu=null,Yu=null;function Zu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ju=typeof setTimeout=="function"?setTimeout:void 0,cC=typeof clearTimeout=="function"?clearTimeout:void 0,cp=typeof Promise=="function"?Promise:void 0,uC=typeof queueMicrotask=="function"?queueMicrotask:typeof cp<"u"?function(t){return cp.resolve(null).then(t).catch(hC)}:Ju;function hC(t){setTimeout(function(){throw t})}function Lc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Lo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Lo(e)}function $i(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function up(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var js=Math.random().toString(36).slice(2),ni="__reactFiber$"+js,Fo="__reactProps$"+js,Ei="__reactContainer$"+js,Ku="__reactEvents$"+js,dC="__reactListeners$"+js,fC="__reactHandles$"+js;function xr(t){var e=t[ni];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ei]||n[ni]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=up(t);t!==null;){if(n=t[ni])return n;t=up(t)}return e}t=n,n=t.parentNode}return null}function $o(t){return t=t[ni]||t[Ei],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ls(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ue(33))}function Kl(t){return t[Fo]||null}var Qu=[],cs=-1;function lr(t){return{current:t}}function dt(t){0>cs||(t.current=Qu[cs],Qu[cs]=null,cs--)}function lt(t,e){cs++,Qu[cs]=t.current,t.current=e}var or={},qt=lr(or),hn=lr(!1),wr=or;function bs(t,e){var n=t.type.contextTypes;if(!n)return or;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function dn(t){return t=t.childContextTypes,t!=null}function yl(){dt(hn),dt(qt)}function hp(t,e,n){if(qt.current!==or)throw Error(ue(168));lt(qt,e),lt(hn,n)}function cA(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ue(108,Q0(t)||"Unknown",r));return _t({},n,i)}function Il(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||or,wr=qt.current,lt(qt,t),lt(hn,hn.current),!0}function dp(t,e,n){var i=t.stateNode;if(!i)throw Error(ue(169));n?(t=cA(t,e,wr),i.__reactInternalMemoizedMergedChildContext=t,dt(hn),dt(qt),lt(qt,t)):dt(hn),lt(hn,n)}var Ai=null,Ql=!1,Nc=!1;function uA(t){Ai===null?Ai=[t]:Ai.push(t)}function pC(t){Ql=!0,uA(t)}function cr(){if(!Nc&&Ai!==null){Nc=!0;var t=0,e=it;try{var n=Ai;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ai=null,Ql=!1}catch(r){throw Ai!==null&&(Ai=Ai.slice(t+1)),Ug(vd,cr),r}finally{it=e,Nc=!1}}return null}var us=[],hs=0,Ml=null,Sl=0,Tn=[],Rn=0,Tr=null,vi=1,_i="";function gr(t,e){us[hs++]=Sl,us[hs++]=Ml,Ml=t,Sl=e}function hA(t,e,n){Tn[Rn++]=vi,Tn[Rn++]=_i,Tn[Rn++]=Tr,Tr=t;var i=vi;t=_i;var r=32-Zn(i)-1;i&=~(1<<r),n+=1;var s=32-Zn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,vi=1<<32-Zn(e)+r|n<<r|i,_i=s+t}else vi=1<<s|n<<r|i,_i=t}function wd(t){t.return!==null&&(gr(t,1),hA(t,1,0))}function Td(t){for(;t===Ml;)Ml=us[--hs],us[hs]=null,Sl=us[--hs],us[hs]=null;for(;t===Tr;)Tr=Tn[--Rn],Tn[Rn]=null,_i=Tn[--Rn],Tn[Rn]=null,vi=Tn[--Rn],Tn[Rn]=null}var xn=null,Cn=null,ft=!1,Wn=null;function dA(t,e){var n=Pn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function fp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xn=t,Cn=$i(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xn=t,Cn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Tr!==null?{id:vi,overflow:_i}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Pn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xn=t,Cn=null,!0):!1;default:return!1}}function qu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function $u(t){if(ft){var e=Cn;if(e){var n=e;if(!fp(t,e)){if(qu(t))throw Error(ue(418));e=$i(n.nextSibling);var i=xn;e&&fp(t,e)?dA(i,n):(t.flags=t.flags&-4097|2,ft=!1,xn=t)}}else{if(qu(t))throw Error(ue(418));t.flags=t.flags&-4097|2,ft=!1,xn=t}}}function pp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xn=t}function Aa(t){if(t!==xn)return!1;if(!ft)return pp(t),ft=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Zu(t.type,t.memoizedProps)),e&&(e=Cn)){if(qu(t))throw fA(),Error(ue(418));for(;e;)dA(t,e),e=$i(e.nextSibling)}if(pp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Cn=$i(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Cn=null}}else Cn=xn?$i(t.stateNode.nextSibling):null;return!0}function fA(){for(var t=Cn;t;)t=$i(t.nextSibling)}function Ps(){Cn=xn=null,ft=!1}function Rd(t){Wn===null?Wn=[t]:Wn.push(t)}var mC=Li.ReactCurrentBatchConfig;function $s(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ue(309));var i=n.stateNode}if(!i)throw Error(ue(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ue(284));if(!n._owner)throw Error(ue(290,t))}return t}function va(t,e){throw t=Object.prototype.toString.call(e),Error(ue(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function mp(t){var e=t._init;return e(t._payload)}function pA(t){function e(d,A){if(t){var v=d.deletions;v===null?(d.deletions=[A],d.flags|=16):v.push(A)}}function n(d,A){if(!t)return null;for(;A!==null;)e(d,A),A=A.sibling;return null}function i(d,A){for(d=new Map;A!==null;)A.key!==null?d.set(A.key,A):d.set(A.index,A),A=A.sibling;return d}function r(d,A){return d=ir(d,A),d.index=0,d.sibling=null,d}function s(d,A,v){return d.index=v,t?(v=d.alternate,v!==null?(v=v.index,v<A?(d.flags|=2,A):v):(d.flags|=2,A)):(d.flags|=1048576,A)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,A,v,y){return A===null||A.tag!==6?(A=Bc(v,d.mode,y),A.return=d,A):(A=r(A,v),A.return=d,A)}function l(d,A,v,y){var P=v.type;return P===rs?h(d,A,v.props.children,y,v.key):A!==null&&(A.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Gi&&mp(P)===A.type)?(y=r(A,v.props),y.ref=$s(d,A,v),y.return=d,y):(y=sl(v.type,v.key,v.props,null,d.mode,y),y.ref=$s(d,A,v),y.return=d,y)}function c(d,A,v,y){return A===null||A.tag!==4||A.stateNode.containerInfo!==v.containerInfo||A.stateNode.implementation!==v.implementation?(A=Gc(v,d.mode,y),A.return=d,A):(A=r(A,v.children||[]),A.return=d,A)}function h(d,A,v,y,P){return A===null||A.tag!==7?(A=Er(v,d.mode,y,P),A.return=d,A):(A=r(A,v),A.return=d,A)}function u(d,A,v){if(typeof A=="string"&&A!==""||typeof A=="number")return A=Bc(""+A,d.mode,v),A.return=d,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case aa:return v=sl(A.type,A.key,A.props,null,d.mode,v),v.ref=$s(d,null,A),v.return=d,v;case is:return A=Gc(A,d.mode,v),A.return=d,A;case Gi:var y=A._init;return u(d,y(A._payload),v)}if(lo(A)||Zs(A))return A=Er(A,d.mode,v,null),A.return=d,A;va(d,A)}return null}function f(d,A,v,y){var P=A!==null?A.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return P!==null?null:a(d,A,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case aa:return v.key===P?l(d,A,v,y):null;case is:return v.key===P?c(d,A,v,y):null;case Gi:return P=v._init,f(d,A,P(v._payload),y)}if(lo(v)||Zs(v))return P!==null?null:h(d,A,v,y,null);va(d,v)}return null}function p(d,A,v,y,P){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(v)||null,a(A,d,""+y,P);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case aa:return d=d.get(y.key===null?v:y.key)||null,l(A,d,y,P);case is:return d=d.get(y.key===null?v:y.key)||null,c(A,d,y,P);case Gi:var w=y._init;return p(d,A,v,w(y._payload),P)}if(lo(y)||Zs(y))return d=d.get(v)||null,h(A,d,y,P,null);va(A,y)}return null}function g(d,A,v,y){for(var P=null,w=null,C=A,T=A=0,B=null;C!==null&&T<v.length;T++){C.index>T?(B=C,C=null):B=C.sibling;var x=f(d,C,v[T],y);if(x===null){C===null&&(C=B);break}t&&C&&x.alternate===null&&e(d,C),A=s(x,A,T),w===null?P=x:w.sibling=x,w=x,C=B}if(T===v.length)return n(d,C),ft&&gr(d,T),P;if(C===null){for(;T<v.length;T++)C=u(d,v[T],y),C!==null&&(A=s(C,A,T),w===null?P=C:w.sibling=C,w=C);return ft&&gr(d,T),P}for(C=i(d,C);T<v.length;T++)B=p(C,d,T,v[T],y),B!==null&&(t&&B.alternate!==null&&C.delete(B.key===null?T:B.key),A=s(B,A,T),w===null?P=B:w.sibling=B,w=B);return t&&C.forEach(function(I){return e(d,I)}),ft&&gr(d,T),P}function _(d,A,v,y){var P=Zs(v);if(typeof P!="function")throw Error(ue(150));if(v=P.call(v),v==null)throw Error(ue(151));for(var w=P=null,C=A,T=A=0,B=null,x=v.next();C!==null&&!x.done;T++,x=v.next()){C.index>T?(B=C,C=null):B=C.sibling;var I=f(d,C,x.value,y);if(I===null){C===null&&(C=B);break}t&&C&&I.alternate===null&&e(d,C),A=s(I,A,T),w===null?P=I:w.sibling=I,w=I,C=B}if(x.done)return n(d,C),ft&&gr(d,T),P;if(C===null){for(;!x.done;T++,x=v.next())x=u(d,x.value,y),x!==null&&(A=s(x,A,T),w===null?P=x:w.sibling=x,w=x);return ft&&gr(d,T),P}for(C=i(d,C);!x.done;T++,x=v.next())x=p(C,d,T,x.value,y),x!==null&&(t&&x.alternate!==null&&C.delete(x.key===null?T:x.key),A=s(x,A,T),w===null?P=x:w.sibling=x,w=x);return t&&C.forEach(function(N){return e(d,N)}),ft&&gr(d,T),P}function m(d,A,v,y){if(typeof v=="object"&&v!==null&&v.type===rs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case aa:e:{for(var P=v.key,w=A;w!==null;){if(w.key===P){if(P=v.type,P===rs){if(w.tag===7){n(d,w.sibling),A=r(w,v.props.children),A.return=d,d=A;break e}}else if(w.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Gi&&mp(P)===w.type){n(d,w.sibling),A=r(w,v.props),A.ref=$s(d,w,v),A.return=d,d=A;break e}n(d,w);break}else e(d,w);w=w.sibling}v.type===rs?(A=Er(v.props.children,d.mode,y,v.key),A.return=d,d=A):(y=sl(v.type,v.key,v.props,null,d.mode,y),y.ref=$s(d,A,v),y.return=d,d=y)}return o(d);case is:e:{for(w=v.key;A!==null;){if(A.key===w)if(A.tag===4&&A.stateNode.containerInfo===v.containerInfo&&A.stateNode.implementation===v.implementation){n(d,A.sibling),A=r(A,v.children||[]),A.return=d,d=A;break e}else{n(d,A);break}else e(d,A);A=A.sibling}A=Gc(v,d.mode,y),A.return=d,d=A}return o(d);case Gi:return w=v._init,m(d,A,w(v._payload),y)}if(lo(v))return g(d,A,v,y);if(Zs(v))return _(d,A,v,y);va(d,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,A!==null&&A.tag===6?(n(d,A.sibling),A=r(A,v),A.return=d,d=A):(n(d,A),A=Bc(v,d.mode,y),A.return=d,d=A),o(d)):n(d,A)}return m}var Ls=pA(!0),mA=pA(!1),El=lr(null),wl=null,ds=null,bd=null;function Pd(){bd=ds=wl=null}function Ld(t){var e=El.current;dt(El),t._currentValue=e}function eh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ys(t,e){wl=t,bd=ds=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(un=!0),t.firstContext=null)}function Dn(t){var e=t._currentValue;if(bd!==t)if(t={context:t,memoizedValue:e,next:null},ds===null){if(wl===null)throw Error(ue(308));ds=t,wl.dependencies={lanes:0,firstContext:t}}else ds=ds.next=t;return e}var yr=null;function Nd(t){yr===null?yr=[t]:yr.push(t)}function gA(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Nd(e)):(n.next=r.next,r.next=n),e.interleaved=n,wi(t,i)}function wi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Vi=!1;function Dd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function AA(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ii(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function er(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,wi(t,n)}return r=i.interleaved,r===null?(e.next=e,Nd(i)):(e.next=r.next,r.next=e),i.interleaved=e,wi(t,n)}function $a(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,_d(t,n)}}function gp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Tl(t,e,n,i){var r=t.updateQueue;Vi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var u=r.baseState;o=0,h=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,_=a;switch(f=e,p=n,_.tag){case 1:if(g=_.payload,typeof g=="function"){u=g.call(p,u,f);break e}u=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=_.payload,f=typeof g=="function"?g.call(p,u,f):g,f==null)break e;u=_t({},u,f);break e;case 2:Vi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=u):h=h.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(h===null&&(l=u),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);br|=o,t.lanes=o,t.memoizedState=u}}function Ap(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ue(191,r));r.call(i)}}}var ea={},ri=lr(ea),ko=lr(ea),zo=lr(ea);function Ir(t){if(t===ea)throw Error(ue(174));return t}function Ud(t,e){switch(lt(zo,e),lt(ko,t),lt(ri,ea),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Du(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Du(e,t)}dt(ri),lt(ri,e)}function Ns(){dt(ri),dt(ko),dt(zo)}function vA(t){Ir(zo.current);var e=Ir(ri.current),n=Du(e,t.type);e!==n&&(lt(ko,t),lt(ri,n))}function Od(t){ko.current===t&&(dt(ri),dt(ko))}var gt=lr(0);function Rl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Dc=[];function Fd(){for(var t=0;t<Dc.length;t++)Dc[t]._workInProgressVersionPrimary=null;Dc.length=0}var el=Li.ReactCurrentDispatcher,Uc=Li.ReactCurrentBatchConfig,Rr=0,vt=null,Pt=null,Ft=null,bl=!1,vo=!1,Bo=0,gC=0;function jt(){throw Error(ue(321))}function kd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Kn(t[n],e[n]))return!1;return!0}function zd(t,e,n,i,r,s){if(Rr=s,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,el.current=t===null||t.memoizedState===null?CC:xC,t=n(i,r),vo){s=0;do{if(vo=!1,Bo=0,25<=s)throw Error(ue(301));s+=1,Ft=Pt=null,e.updateQueue=null,el.current=yC,t=n(i,r)}while(vo)}if(el.current=Pl,e=Pt!==null&&Pt.next!==null,Rr=0,Ft=Pt=vt=null,bl=!1,e)throw Error(ue(300));return t}function Bd(){var t=Bo!==0;return Bo=0,t}function ei(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ft===null?vt.memoizedState=Ft=t:Ft=Ft.next=t,Ft}function Un(){if(Pt===null){var t=vt.alternate;t=t!==null?t.memoizedState:null}else t=Pt.next;var e=Ft===null?vt.memoizedState:Ft.next;if(e!==null)Ft=e,Pt=t;else{if(t===null)throw Error(ue(310));Pt=t,t={memoizedState:Pt.memoizedState,baseState:Pt.baseState,baseQueue:Pt.baseQueue,queue:Pt.queue,next:null},Ft===null?vt.memoizedState=Ft=t:Ft=Ft.next=t}return Ft}function Go(t,e){return typeof e=="function"?e(t):e}function Oc(t){var e=Un(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=Pt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((Rr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var u={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=u,o=i):l=l.next=u,vt.lanes|=h,br|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Kn(i,e.memoizedState)||(un=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,vt.lanes|=s,br|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Fc(t){var e=Un(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Kn(s,e.memoizedState)||(un=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function _A(){}function CA(t,e){var n=vt,i=Un(),r=e(),s=!Kn(i.memoizedState,r);if(s&&(i.memoizedState=r,un=!0),i=i.queue,Gd(IA.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ft!==null&&Ft.memoizedState.tag&1){if(n.flags|=2048,Vo(9,yA.bind(null,n,i,r,e),void 0,null),kt===null)throw Error(ue(349));Rr&30||xA(n,e,r)}return r}function xA(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yA(t,e,n,i){e.value=n,e.getSnapshot=i,MA(e)&&SA(t)}function IA(t,e,n){return n(function(){MA(e)&&SA(t)})}function MA(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Kn(t,n)}catch{return!0}}function SA(t){var e=wi(t,1);e!==null&&Jn(e,t,1,-1)}function vp(t){var e=ei();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:t},e.queue=t,t=t.dispatch=_C.bind(null,vt,t),[e.memoizedState,t]}function Vo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function EA(){return Un().memoizedState}function tl(t,e,n,i){var r=ei();vt.flags|=t,r.memoizedState=Vo(1|e,n,void 0,i===void 0?null:i)}function ql(t,e,n,i){var r=Un();i=i===void 0?null:i;var s=void 0;if(Pt!==null){var o=Pt.memoizedState;if(s=o.destroy,i!==null&&kd(i,o.deps)){r.memoizedState=Vo(e,n,s,i);return}}vt.flags|=t,r.memoizedState=Vo(1|e,n,s,i)}function _p(t,e){return tl(8390656,8,t,e)}function Gd(t,e){return ql(2048,8,t,e)}function wA(t,e){return ql(4,2,t,e)}function TA(t,e){return ql(4,4,t,e)}function RA(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function bA(t,e,n){return n=n!=null?n.concat([t]):null,ql(4,4,RA.bind(null,e,t),n)}function Vd(){}function PA(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&kd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function LA(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&kd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function NA(t,e,n){return Rr&21?(Kn(n,e)||(n=kg(),vt.lanes|=n,br|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,un=!0),t.memoizedState=n)}function AC(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=Uc.transition;Uc.transition={};try{t(!1),e()}finally{it=n,Uc.transition=i}}function DA(){return Un().memoizedState}function vC(t,e,n){var i=nr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},UA(t))OA(e,n);else if(n=gA(t,e,n,i),n!==null){var r=rn();Jn(n,t,i,r),FA(n,e,i)}}function _C(t,e,n){var i=nr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(UA(t))OA(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Kn(a,o)){var l=e.interleaved;l===null?(r.next=r,Nd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=gA(t,e,r,i),n!==null&&(r=rn(),Jn(n,t,i,r),FA(n,e,i))}}function UA(t){var e=t.alternate;return t===vt||e!==null&&e===vt}function OA(t,e){vo=bl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function FA(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,_d(t,n)}}var Pl={readContext:Dn,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useInsertionEffect:jt,useLayoutEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useMutableSource:jt,useSyncExternalStore:jt,useId:jt,unstable_isNewReconciler:!1},CC={readContext:Dn,useCallback:function(t,e){return ei().memoizedState=[t,e===void 0?null:e],t},useContext:Dn,useEffect:_p,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,tl(4194308,4,RA.bind(null,e,t),n)},useLayoutEffect:function(t,e){return tl(4194308,4,t,e)},useInsertionEffect:function(t,e){return tl(4,2,t,e)},useMemo:function(t,e){var n=ei();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ei();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=vC.bind(null,vt,t),[i.memoizedState,t]},useRef:function(t){var e=ei();return t={current:t},e.memoizedState=t},useState:vp,useDebugValue:Vd,useDeferredValue:function(t){return ei().memoizedState=t},useTransition:function(){var t=vp(!1),e=t[0];return t=AC.bind(null,t[1]),ei().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=vt,r=ei();if(ft){if(n===void 0)throw Error(ue(407));n=n()}else{if(n=e(),kt===null)throw Error(ue(349));Rr&30||xA(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,_p(IA.bind(null,i,s,t),[t]),i.flags|=2048,Vo(9,yA.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ei(),e=kt.identifierPrefix;if(ft){var n=_i,i=vi;n=(i&~(1<<32-Zn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Bo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=gC++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},xC={readContext:Dn,useCallback:PA,useContext:Dn,useEffect:Gd,useImperativeHandle:bA,useInsertionEffect:wA,useLayoutEffect:TA,useMemo:LA,useReducer:Oc,useRef:EA,useState:function(){return Oc(Go)},useDebugValue:Vd,useDeferredValue:function(t){var e=Un();return NA(e,Pt.memoizedState,t)},useTransition:function(){var t=Oc(Go)[0],e=Un().memoizedState;return[t,e]},useMutableSource:_A,useSyncExternalStore:CA,useId:DA,unstable_isNewReconciler:!1},yC={readContext:Dn,useCallback:PA,useContext:Dn,useEffect:Gd,useImperativeHandle:bA,useInsertionEffect:wA,useLayoutEffect:TA,useMemo:LA,useReducer:Fc,useRef:EA,useState:function(){return Fc(Go)},useDebugValue:Vd,useDeferredValue:function(t){var e=Un();return Pt===null?e.memoizedState=t:NA(e,Pt.memoizedState,t)},useTransition:function(){var t=Fc(Go)[0],e=Un().memoizedState;return[t,e]},useMutableSource:_A,useSyncExternalStore:CA,useId:DA,unstable_isNewReconciler:!1};function Gn(t,e){if(t&&t.defaultProps){e=_t({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function th(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:_t({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var $l={isMounted:function(t){return(t=t._reactInternals)?Fr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=rn(),r=nr(t),s=Ii(i,r);s.payload=e,n!=null&&(s.callback=n),e=er(t,s,r),e!==null&&(Jn(e,t,r,i),$a(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=rn(),r=nr(t),s=Ii(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=er(t,s,r),e!==null&&(Jn(e,t,r,i),$a(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=rn(),i=nr(t),r=Ii(n,i);r.tag=2,e!=null&&(r.callback=e),e=er(t,r,i),e!==null&&(Jn(e,t,i,n),$a(e,t,i))}};function Cp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Do(n,i)||!Do(r,s):!0}function kA(t,e,n){var i=!1,r=or,s=e.contextType;return typeof s=="object"&&s!==null?s=Dn(s):(r=dn(e)?wr:qt.current,i=e.contextTypes,s=(i=i!=null)?bs(t,r):or),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=$l,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function xp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&$l.enqueueReplaceState(e,e.state,null)}function nh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Dd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Dn(s):(s=dn(e)?wr:qt.current,r.context=bs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(th(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&$l.enqueueReplaceState(r,r.state,null),Tl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ds(t,e){try{var n="",i=e;do n+=K0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function kc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ih(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var IC=typeof WeakMap=="function"?WeakMap:Map;function zA(t,e,n){n=Ii(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Nl||(Nl=!0,fh=i),ih(t,e)},n}function BA(t,e,n){n=Ii(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){ih(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ih(t,e),typeof i!="function"&&(tr===null?tr=new Set([this]):tr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function yp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new IC;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=FC.bind(null,t,e,n),e.then(t,t))}function Ip(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Mp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ii(-1,1),e.tag=2,er(n,e,1))),n.lanes|=1),t)}var MC=Li.ReactCurrentOwner,un=!1;function nn(t,e,n,i){e.child=t===null?mA(e,null,n,i):Ls(e,t.child,n,i)}function Sp(t,e,n,i,r){n=n.render;var s=e.ref;return ys(e,r),i=zd(t,e,n,i,s,r),n=Bd(),t!==null&&!un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ti(t,e,r)):(ft&&n&&wd(e),e.flags|=1,nn(t,e,i,r),e.child)}function Ep(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Kd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,GA(t,e,s,i,r)):(t=sl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Do,n(o,i)&&t.ref===e.ref)return Ti(t,e,r)}return e.flags|=1,t=ir(s,i),t.ref=e.ref,t.return=e,e.child=t}function GA(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Do(s,i)&&t.ref===e.ref)if(un=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(un=!0);else return e.lanes=t.lanes,Ti(t,e,r)}return rh(t,e,n,i,r)}function VA(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},lt(ps,vn),vn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,lt(ps,vn),vn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,lt(ps,vn),vn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,lt(ps,vn),vn|=i;return nn(t,e,r,n),e.child}function HA(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function rh(t,e,n,i,r){var s=dn(n)?wr:qt.current;return s=bs(e,s),ys(e,r),n=zd(t,e,n,i,s,r),i=Bd(),t!==null&&!un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ti(t,e,r)):(ft&&i&&wd(e),e.flags|=1,nn(t,e,n,r),e.child)}function wp(t,e,n,i,r){if(dn(n)){var s=!0;Il(e)}else s=!1;if(ys(e,r),e.stateNode===null)nl(t,e),kA(e,n,i),nh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Dn(c):(c=dn(n)?wr:qt.current,c=bs(e,c));var h=n.getDerivedStateFromProps,u=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&xp(e,o,i,c),Vi=!1;var f=e.memoizedState;o.state=f,Tl(e,i,o,r),l=e.memoizedState,a!==i||f!==l||hn.current||Vi?(typeof h=="function"&&(th(e,n,h,i),l=e.memoizedState),(a=Vi||Cp(e,n,a,i,f,l,c))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,AA(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Gn(e.type,a),o.props=c,u=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Dn(l):(l=dn(n)?wr:qt.current,l=bs(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==u||f!==l)&&xp(e,o,i,l),Vi=!1,f=e.memoizedState,o.state=f,Tl(e,i,o,r);var g=e.memoizedState;a!==u||f!==g||hn.current||Vi?(typeof p=="function"&&(th(e,n,p,i),g=e.memoizedState),(c=Vi||Cp(e,n,c,i,f,g,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return sh(t,e,n,i,s,r)}function sh(t,e,n,i,r,s){HA(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&dp(e,n,!1),Ti(t,e,s);i=e.stateNode,MC.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ls(e,t.child,null,s),e.child=Ls(e,null,a,s)):nn(t,e,a,s),e.memoizedState=i.state,r&&dp(e,n,!0),e.child}function WA(t){var e=t.stateNode;e.pendingContext?hp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&hp(t,e.context,!1),Ud(t,e.containerInfo)}function Tp(t,e,n,i,r){return Ps(),Rd(r),e.flags|=256,nn(t,e,n,i),e.child}var oh={dehydrated:null,treeContext:null,retryLane:0};function ah(t){return{baseLanes:t,cachePool:null,transitions:null}}function jA(t,e,n){var i=e.pendingProps,r=gt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),lt(gt,r&1),t===null)return $u(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=nc(o,i,0,null),t=Er(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=ah(n),e.memoizedState=oh,t):Hd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return SC(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=ir(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=ir(a,s):(s=Er(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?ah(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=oh,i}return s=t.child,t=s.sibling,i=ir(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Hd(t,e){return e=nc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function _a(t,e,n,i){return i!==null&&Rd(i),Ls(e,t.child,null,n),t=Hd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function SC(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=kc(Error(ue(422))),_a(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=nc({mode:"visible",children:i.children},r,0,null),s=Er(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ls(e,t.child,null,o),e.child.memoizedState=ah(o),e.memoizedState=oh,s);if(!(e.mode&1))return _a(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ue(419)),i=kc(s,i,void 0),_a(t,e,o,i)}if(a=(o&t.childLanes)!==0,un||a){if(i=kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,wi(t,r),Jn(i,t,r,-1))}return Jd(),i=kc(Error(ue(421))),_a(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=kC.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Cn=$i(r.nextSibling),xn=e,ft=!0,Wn=null,t!==null&&(Tn[Rn++]=vi,Tn[Rn++]=_i,Tn[Rn++]=Tr,vi=t.id,_i=t.overflow,Tr=e),e=Hd(e,i.children),e.flags|=4096,e)}function Rp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),eh(t.return,e,n)}function zc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function XA(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(nn(t,e,i.children,n),i=gt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Rp(t,n,e);else if(t.tag===19)Rp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(lt(gt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Rl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),zc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Rl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}zc(e,!0,n,null,s);break;case"together":zc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function nl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ti(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),br|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ue(153));if(e.child!==null){for(t=e.child,n=ir(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ir(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function EC(t,e,n){switch(e.tag){case 3:WA(e),Ps();break;case 5:vA(e);break;case 1:dn(e.type)&&Il(e);break;case 4:Ud(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;lt(El,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(lt(gt,gt.current&1),e.flags|=128,null):n&e.child.childLanes?jA(t,e,n):(lt(gt,gt.current&1),t=Ti(t,e,n),t!==null?t.sibling:null);lt(gt,gt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return XA(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),lt(gt,gt.current),i)break;return null;case 22:case 23:return e.lanes=0,VA(t,e,n)}return Ti(t,e,n)}var YA,lh,ZA,JA;YA=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};lh=function(){};ZA=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Ir(ri.current);var s=null;switch(n){case"input":r=bu(t,r),i=bu(t,i),s=[];break;case"select":r=_t({},r,{value:void 0}),i=_t({},i,{value:void 0}),s=[];break;case"textarea":r=Nu(t,r),i=Nu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=xl)}Uu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(wo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(wo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};JA=function(t,e,n,i){n!==i&&(e.flags|=4)};function eo(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Xt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function wC(t,e,n){var i=e.pendingProps;switch(Td(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xt(e),null;case 1:return dn(e.type)&&yl(),Xt(e),null;case 3:return i=e.stateNode,Ns(),dt(hn),dt(qt),Fd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Wn!==null&&(gh(Wn),Wn=null))),lh(t,e),Xt(e),null;case 5:Od(e);var r=Ir(zo.current);if(n=e.type,t!==null&&e.stateNode!=null)ZA(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return Xt(e),null}if(t=Ir(ri.current),Aa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ni]=e,i[Fo]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<uo.length;r++)ut(uo[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":kf(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":Bf(i,s),ut("invalid",i)}Uu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ga(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ga(i.textContent,a,t),r=["children",""+a]):wo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":la(i),zf(i,s,!0);break;case"textarea":la(i),Gf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=xl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Ig(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[ni]=e,t[Fo]=i,YA(t,e,!1,!1),e.stateNode=t;e:{switch(o=Ou(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<uo.length;r++)ut(uo[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":kf(t,i),r=bu(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=_t({},i,{value:void 0}),ut("invalid",t);break;case"textarea":Bf(t,i),r=Nu(t,i),ut("invalid",t);break;default:r=i}Uu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Eg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Mg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&To(t,l):typeof l=="number"&&To(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(wo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&fd(t,s,l,o))}switch(n){case"input":la(t),zf(t,i,!1);break;case"textarea":la(t),Gf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+sr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?vs(t,!!i.multiple,s,!1):i.defaultValue!=null&&vs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=xl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Xt(e),null;case 6:if(t&&e.stateNode!=null)JA(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ue(166));if(n=Ir(zo.current),Ir(ri.current),Aa(e)){if(i=e.stateNode,n=e.memoizedProps,i[ni]=e,(s=i.nodeValue!==n)&&(t=xn,t!==null))switch(t.tag){case 3:ga(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ga(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ni]=e,e.stateNode=i}return Xt(e),null;case 13:if(dt(gt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ft&&Cn!==null&&e.mode&1&&!(e.flags&128))fA(),Ps(),e.flags|=98560,s=!1;else if(s=Aa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ue(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ue(317));s[ni]=e}else Ps(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Xt(e),s=!1}else Wn!==null&&(gh(Wn),Wn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||gt.current&1?Nt===0&&(Nt=3):Jd())),e.updateQueue!==null&&(e.flags|=4),Xt(e),null);case 4:return Ns(),lh(t,e),t===null&&Uo(e.stateNode.containerInfo),Xt(e),null;case 10:return Ld(e.type._context),Xt(e),null;case 17:return dn(e.type)&&yl(),Xt(e),null;case 19:if(dt(gt),s=e.memoizedState,s===null)return Xt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)eo(s,!1);else{if(Nt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Rl(t),o!==null){for(e.flags|=128,eo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return lt(gt,gt.current&1|2),e.child}t=t.sibling}s.tail!==null&&wt()>Us&&(e.flags|=128,i=!0,eo(s,!1),e.lanes=4194304)}else{if(!i)if(t=Rl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),eo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ft)return Xt(e),null}else 2*wt()-s.renderingStartTime>Us&&n!==1073741824&&(e.flags|=128,i=!0,eo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=wt(),e.sibling=null,n=gt.current,lt(gt,i?n&1|2:n&1),e):(Xt(e),null);case 22:case 23:return Zd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?vn&1073741824&&(Xt(e),e.subtreeFlags&6&&(e.flags|=8192)):Xt(e),null;case 24:return null;case 25:return null}throw Error(ue(156,e.tag))}function TC(t,e){switch(Td(e),e.tag){case 1:return dn(e.type)&&yl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ns(),dt(hn),dt(qt),Fd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Od(e),null;case 13:if(dt(gt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ue(340));Ps()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(gt),null;case 4:return Ns(),null;case 10:return Ld(e.type._context),null;case 22:case 23:return Zd(),null;case 24:return null;default:return null}}var Ca=!1,Jt=!1,RC=typeof WeakSet=="function"?WeakSet:Set,we=null;function fs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Mt(t,e,i)}else n.current=null}function ch(t,e,n){try{n()}catch(i){Mt(t,e,i)}}var bp=!1;function bC(t,e){if(Xu=vl,t=eA(),Ed(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,u=t,f=null;t:for(;;){for(var p;u!==n||r!==0&&u.nodeType!==3||(a=o+r),u!==s||i!==0&&u.nodeType!==3||(l=o+i),u.nodeType===3&&(o+=u.nodeValue.length),(p=u.firstChild)!==null;)f=u,u=p;for(;;){if(u===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++h===i&&(l=o),(p=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yu={focusedElem:t,selectionRange:n},vl=!1,we=e;we!==null;)if(e=we,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,we=t;else for(;we!==null;){e=we;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var _=g.memoizedProps,m=g.memoizedState,d=e.stateNode,A=d.getSnapshotBeforeUpdate(e.elementType===e.type?_:Gn(e.type,_),m);d.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ue(163))}}catch(y){Mt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,we=t;break}we=e.return}return g=bp,bp=!1,g}function _o(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&ch(e,n,s)}r=r.next}while(r!==i)}}function ec(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function uh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function KA(t){var e=t.alternate;e!==null&&(t.alternate=null,KA(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ni],delete e[Fo],delete e[Ku],delete e[dC],delete e[fC])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function QA(t){return t.tag===5||t.tag===3||t.tag===4}function Pp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||QA(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function hh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=xl));else if(i!==4&&(t=t.child,t!==null))for(hh(t,e,n),t=t.sibling;t!==null;)hh(t,e,n),t=t.sibling}function dh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(dh(t,e,n),t=t.sibling;t!==null;)dh(t,e,n),t=t.sibling}var Gt=null,Vn=!1;function Di(t,e,n){for(n=n.child;n!==null;)qA(t,e,n),n=n.sibling}function qA(t,e,n){if(ii&&typeof ii.onCommitFiberUnmount=="function")try{ii.onCommitFiberUnmount(Xl,n)}catch{}switch(n.tag){case 5:Jt||fs(n,e);case 6:var i=Gt,r=Vn;Gt=null,Di(t,e,n),Gt=i,Vn=r,Gt!==null&&(Vn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(Vn?(t=Gt,n=n.stateNode,t.nodeType===8?Lc(t.parentNode,n):t.nodeType===1&&Lc(t,n),Lo(t)):Lc(Gt,n.stateNode));break;case 4:i=Gt,r=Vn,Gt=n.stateNode.containerInfo,Vn=!0,Di(t,e,n),Gt=i,Vn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&ch(n,e,o),r=r.next}while(r!==i)}Di(t,e,n);break;case 1:if(!Jt&&(fs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Mt(n,e,a)}Di(t,e,n);break;case 21:Di(t,e,n);break;case 22:n.mode&1?(Jt=(i=Jt)||n.memoizedState!==null,Di(t,e,n),Jt=i):Di(t,e,n);break;default:Di(t,e,n)}}function Lp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new RC),e.forEach(function(i){var r=zC.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Fn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Gt=a.stateNode,Vn=!1;break e;case 3:Gt=a.stateNode.containerInfo,Vn=!0;break e;case 4:Gt=a.stateNode.containerInfo,Vn=!0;break e}a=a.return}if(Gt===null)throw Error(ue(160));qA(s,o,r),Gt=null,Vn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Mt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)$A(e,t),e=e.sibling}function $A(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Fn(e,t),qn(t),i&4){try{_o(3,t,t.return),ec(3,t)}catch(_){Mt(t,t.return,_)}try{_o(5,t,t.return)}catch(_){Mt(t,t.return,_)}}break;case 1:Fn(e,t),qn(t),i&512&&n!==null&&fs(n,n.return);break;case 5:if(Fn(e,t),qn(t),i&512&&n!==null&&fs(n,n.return),t.flags&32){var r=t.stateNode;try{To(r,"")}catch(_){Mt(t,t.return,_)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&xg(r,s),Ou(a,o);var c=Ou(a,s);for(o=0;o<l.length;o+=2){var h=l[o],u=l[o+1];h==="style"?Eg(r,u):h==="dangerouslySetInnerHTML"?Mg(r,u):h==="children"?To(r,u):fd(r,h,u,c)}switch(a){case"input":Pu(r,s);break;case"textarea":yg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?vs(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?vs(r,!!s.multiple,s.defaultValue,!0):vs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Fo]=s}catch(_){Mt(t,t.return,_)}}break;case 6:if(Fn(e,t),qn(t),i&4){if(t.stateNode===null)throw Error(ue(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(_){Mt(t,t.return,_)}}break;case 3:if(Fn(e,t),qn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Lo(e.containerInfo)}catch(_){Mt(t,t.return,_)}break;case 4:Fn(e,t),qn(t);break;case 13:Fn(e,t),qn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Xd=wt())),i&4&&Lp(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(Jt=(c=Jt)||h,Fn(e,t),Jt=c):Fn(e,t),qn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(we=t,h=t.child;h!==null;){for(u=we=h;we!==null;){switch(f=we,p=f.child,f.tag){case 0:case 11:case 14:case 15:_o(4,f,f.return);break;case 1:fs(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(_){Mt(i,n,_)}}break;case 5:fs(f,f.return);break;case 22:if(f.memoizedState!==null){Dp(u);continue}}p!==null?(p.return=f,we=p):Dp(u)}h=h.sibling}e:for(h=null,u=t;;){if(u.tag===5){if(h===null){h=u;try{r=u.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=u.stateNode,l=u.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Sg("display",o))}catch(_){Mt(t,t.return,_)}}}else if(u.tag===6){if(h===null)try{u.stateNode.nodeValue=c?"":u.memoizedProps}catch(_){Mt(t,t.return,_)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===t)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;h===u&&(h=null),u=u.return}h===u&&(h=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:Fn(e,t),qn(t),i&4&&Lp(t);break;case 21:break;default:Fn(e,t),qn(t)}}function qn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(QA(n)){var i=n;break e}n=n.return}throw Error(ue(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(To(r,""),i.flags&=-33);var s=Pp(t);dh(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Pp(t);hh(t,a,o);break;default:throw Error(ue(161))}}catch(l){Mt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function PC(t,e,n){we=t,ev(t)}function ev(t,e,n){for(var i=(t.mode&1)!==0;we!==null;){var r=we,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ca;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Jt;a=Ca;var c=Jt;if(Ca=o,(Jt=l)&&!c)for(we=r;we!==null;)o=we,l=o.child,o.tag===22&&o.memoizedState!==null?Up(r):l!==null?(l.return=o,we=l):Up(r);for(;s!==null;)we=s,ev(s),s=s.sibling;we=r,Ca=a,Jt=c}Np(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,we=s):Np(t)}}function Np(t){for(;we!==null;){var e=we;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Jt||ec(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Jt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Gn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Ap(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ap(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var u=h.dehydrated;u!==null&&Lo(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ue(163))}Jt||e.flags&512&&uh(e)}catch(f){Mt(e,e.return,f)}}if(e===t){we=null;break}if(n=e.sibling,n!==null){n.return=e.return,we=n;break}we=e.return}}function Dp(t){for(;we!==null;){var e=we;if(e===t){we=null;break}var n=e.sibling;if(n!==null){n.return=e.return,we=n;break}we=e.return}}function Up(t){for(;we!==null;){var e=we;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ec(4,e)}catch(l){Mt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Mt(e,r,l)}}var s=e.return;try{uh(e)}catch(l){Mt(e,s,l)}break;case 5:var o=e.return;try{uh(e)}catch(l){Mt(e,o,l)}}}catch(l){Mt(e,e.return,l)}if(e===t){we=null;break}var a=e.sibling;if(a!==null){a.return=e.return,we=a;break}we=e.return}}var LC=Math.ceil,Ll=Li.ReactCurrentDispatcher,Wd=Li.ReactCurrentOwner,Nn=Li.ReactCurrentBatchConfig,qe=0,kt=null,Rt=null,Ht=0,vn=0,ps=lr(0),Nt=0,Ho=null,br=0,tc=0,jd=0,Co=null,cn=null,Xd=0,Us=1/0,gi=null,Nl=!1,fh=null,tr=null,xa=!1,Zi=null,Dl=0,xo=0,ph=null,il=-1,rl=0;function rn(){return qe&6?wt():il!==-1?il:il=wt()}function nr(t){return t.mode&1?qe&2&&Ht!==0?Ht&-Ht:mC.transition!==null?(rl===0&&(rl=kg()),rl):(t=it,t!==0||(t=window.event,t=t===void 0?16:jg(t.type)),t):1}function Jn(t,e,n,i){if(50<xo)throw xo=0,ph=null,Error(ue(185));Qo(t,n,i),(!(qe&2)||t!==kt)&&(t===kt&&(!(qe&2)&&(tc|=n),Nt===4&&ji(t,Ht)),fn(t,i),n===1&&qe===0&&!(e.mode&1)&&(Us=wt()+500,Ql&&cr()))}function fn(t,e){var n=t.callbackNode;m_(t,e);var i=Al(t,t===kt?Ht:0);if(i===0)n!==null&&Wf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Wf(n),e===1)t.tag===0?pC(Op.bind(null,t)):uA(Op.bind(null,t)),uC(function(){!(qe&6)&&cr()}),n=null;else{switch(zg(i)){case 1:n=vd;break;case 4:n=Og;break;case 16:n=gl;break;case 536870912:n=Fg;break;default:n=gl}n=lv(n,tv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function tv(t,e){if(il=-1,rl=0,qe&6)throw Error(ue(327));var n=t.callbackNode;if(Is()&&t.callbackNode!==n)return null;var i=Al(t,t===kt?Ht:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ul(t,i);else{e=i;var r=qe;qe|=2;var s=iv();(kt!==t||Ht!==e)&&(gi=null,Us=wt()+500,Sr(t,e));do try{UC();break}catch(a){nv(t,a)}while(!0);Pd(),Ll.current=s,qe=r,Rt!==null?e=0:(kt=null,Ht=0,e=Nt)}if(e!==0){if(e===2&&(r=Gu(t),r!==0&&(i=r,e=mh(t,r))),e===1)throw n=Ho,Sr(t,0),ji(t,i),fn(t,wt()),n;if(e===6)ji(t,i);else{if(r=t.current.alternate,!(i&30)&&!NC(r)&&(e=Ul(t,i),e===2&&(s=Gu(t),s!==0&&(i=s,e=mh(t,s))),e===1))throw n=Ho,Sr(t,0),ji(t,i),fn(t,wt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ue(345));case 2:Ar(t,cn,gi);break;case 3:if(ji(t,i),(i&130023424)===i&&(e=Xd+500-wt(),10<e)){if(Al(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){rn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ju(Ar.bind(null,t,cn,gi),e);break}Ar(t,cn,gi);break;case 4:if(ji(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Zn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=wt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*LC(i/1960))-i,10<i){t.timeoutHandle=Ju(Ar.bind(null,t,cn,gi),i);break}Ar(t,cn,gi);break;case 5:Ar(t,cn,gi);break;default:throw Error(ue(329))}}}return fn(t,wt()),t.callbackNode===n?tv.bind(null,t):null}function mh(t,e){var n=Co;return t.current.memoizedState.isDehydrated&&(Sr(t,e).flags|=256),t=Ul(t,e),t!==2&&(e=cn,cn=n,e!==null&&gh(e)),t}function gh(t){cn===null?cn=t:cn.push.apply(cn,t)}function NC(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Kn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ji(t,e){for(e&=~jd,e&=~tc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Zn(e),i=1<<n;t[n]=-1,e&=~i}}function Op(t){if(qe&6)throw Error(ue(327));Is();var e=Al(t,0);if(!(e&1))return fn(t,wt()),null;var n=Ul(t,e);if(t.tag!==0&&n===2){var i=Gu(t);i!==0&&(e=i,n=mh(t,i))}if(n===1)throw n=Ho,Sr(t,0),ji(t,e),fn(t,wt()),n;if(n===6)throw Error(ue(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ar(t,cn,gi),fn(t,wt()),null}function Yd(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(Us=wt()+500,Ql&&cr())}}function Pr(t){Zi!==null&&Zi.tag===0&&!(qe&6)&&Is();var e=qe;qe|=1;var n=Nn.transition,i=it;try{if(Nn.transition=null,it=1,t)return t()}finally{it=i,Nn.transition=n,qe=e,!(qe&6)&&cr()}}function Zd(){vn=ps.current,dt(ps)}function Sr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,cC(n)),Rt!==null)for(n=Rt.return;n!==null;){var i=n;switch(Td(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&yl();break;case 3:Ns(),dt(hn),dt(qt),Fd();break;case 5:Od(i);break;case 4:Ns();break;case 13:dt(gt);break;case 19:dt(gt);break;case 10:Ld(i.type._context);break;case 22:case 23:Zd()}n=n.return}if(kt=t,Rt=t=ir(t.current,null),Ht=vn=e,Nt=0,Ho=null,jd=tc=br=0,cn=Co=null,yr!==null){for(e=0;e<yr.length;e++)if(n=yr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}yr=null}return t}function nv(t,e){do{var n=Rt;try{if(Pd(),el.current=Pl,bl){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}bl=!1}if(Rr=0,Ft=Pt=vt=null,vo=!1,Bo=0,Wd.current=null,n===null||n.return===null){Nt=1,Ho=e,Rt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ht,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,u=h.tag;if(!(h.mode&1)&&(u===0||u===11||u===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Ip(o);if(p!==null){p.flags&=-257,Mp(p,o,a,s,e),p.mode&1&&yp(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var _=new Set;_.add(l),e.updateQueue=_}else g.add(l);break e}else{if(!(e&1)){yp(s,c,e),Jd();break e}l=Error(ue(426))}}else if(ft&&a.mode&1){var m=Ip(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Mp(m,o,a,s,e),Rd(Ds(l,a));break e}}s=l=Ds(l,a),Nt!==4&&(Nt=2),Co===null?Co=[s]:Co.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=zA(s,l,e);gp(s,d);break e;case 1:a=l;var A=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof A.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(tr===null||!tr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=BA(s,a,e);gp(s,y);break e}}s=s.return}while(s!==null)}sv(n)}catch(P){e=P,Rt===n&&n!==null&&(Rt=n=n.return);continue}break}while(!0)}function iv(){var t=Ll.current;return Ll.current=Pl,t===null?Pl:t}function Jd(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),kt===null||!(br&268435455)&&!(tc&268435455)||ji(kt,Ht)}function Ul(t,e){var n=qe;qe|=2;var i=iv();(kt!==t||Ht!==e)&&(gi=null,Sr(t,e));do try{DC();break}catch(r){nv(t,r)}while(!0);if(Pd(),qe=n,Ll.current=i,Rt!==null)throw Error(ue(261));return kt=null,Ht=0,Nt}function DC(){for(;Rt!==null;)rv(Rt)}function UC(){for(;Rt!==null&&!o_();)rv(Rt)}function rv(t){var e=av(t.alternate,t,vn);t.memoizedProps=t.pendingProps,e===null?sv(t):Rt=e,Wd.current=null}function sv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=TC(n,e),n!==null){n.flags&=32767,Rt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Nt=6,Rt=null;return}}else if(n=wC(n,e,vn),n!==null){Rt=n;return}if(e=e.sibling,e!==null){Rt=e;return}Rt=e=t}while(e!==null);Nt===0&&(Nt=5)}function Ar(t,e,n){var i=it,r=Nn.transition;try{Nn.transition=null,it=1,OC(t,e,n,i)}finally{Nn.transition=r,it=i}return null}function OC(t,e,n,i){do Is();while(Zi!==null);if(qe&6)throw Error(ue(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ue(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(g_(t,s),t===kt&&(Rt=kt=null,Ht=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||xa||(xa=!0,lv(gl,function(){return Is(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Nn.transition,Nn.transition=null;var o=it;it=1;var a=qe;qe|=4,Wd.current=null,bC(t,n),$A(n,t),nC(Yu),vl=!!Xu,Yu=Xu=null,t.current=n,PC(n),a_(),qe=a,it=o,Nn.transition=s}else t.current=n;if(xa&&(xa=!1,Zi=t,Dl=r),s=t.pendingLanes,s===0&&(tr=null),u_(n.stateNode),fn(t,wt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nl)throw Nl=!1,t=fh,fh=null,t;return Dl&1&&t.tag!==0&&Is(),s=t.pendingLanes,s&1?t===ph?xo++:(xo=0,ph=t):xo=0,cr(),null}function Is(){if(Zi!==null){var t=zg(Dl),e=Nn.transition,n=it;try{if(Nn.transition=null,it=16>t?16:t,Zi===null)var i=!1;else{if(t=Zi,Zi=null,Dl=0,qe&6)throw Error(ue(331));var r=qe;for(qe|=4,we=t.current;we!==null;){var s=we,o=s.child;if(we.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(we=c;we!==null;){var h=we;switch(h.tag){case 0:case 11:case 15:_o(8,h,s)}var u=h.child;if(u!==null)u.return=h,we=u;else for(;we!==null;){h=we;var f=h.sibling,p=h.return;if(KA(h),h===c){we=null;break}if(f!==null){f.return=p,we=f;break}we=p}}}var g=s.alternate;if(g!==null){var _=g.child;if(_!==null){g.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}we=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,we=o;else e:for(;we!==null;){if(s=we,s.flags&2048)switch(s.tag){case 0:case 11:case 15:_o(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,we=d;break e}we=s.return}}var A=t.current;for(we=A;we!==null;){o=we;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,we=v;else e:for(o=A;we!==null;){if(a=we,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ec(9,a)}}catch(P){Mt(a,a.return,P)}if(a===o){we=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,we=y;break e}we=a.return}}if(qe=r,cr(),ii&&typeof ii.onPostCommitFiberRoot=="function")try{ii.onPostCommitFiberRoot(Xl,t)}catch{}i=!0}return i}finally{it=n,Nn.transition=e}}return!1}function Fp(t,e,n){e=Ds(n,e),e=zA(t,e,1),t=er(t,e,1),e=rn(),t!==null&&(Qo(t,1,e),fn(t,e))}function Mt(t,e,n){if(t.tag===3)Fp(t,t,n);else for(;e!==null;){if(e.tag===3){Fp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(tr===null||!tr.has(i))){t=Ds(n,t),t=BA(e,t,1),e=er(e,t,1),t=rn(),e!==null&&(Qo(e,1,t),fn(e,t));break}}e=e.return}}function FC(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=rn(),t.pingedLanes|=t.suspendedLanes&n,kt===t&&(Ht&n)===n&&(Nt===4||Nt===3&&(Ht&130023424)===Ht&&500>wt()-Xd?Sr(t,0):jd|=n),fn(t,e)}function ov(t,e){e===0&&(t.mode&1?(e=ha,ha<<=1,!(ha&130023424)&&(ha=4194304)):e=1);var n=rn();t=wi(t,e),t!==null&&(Qo(t,e,n),fn(t,n))}function kC(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ov(t,n)}function zC(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ue(314))}i!==null&&i.delete(e),ov(t,n)}var av;av=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||hn.current)un=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return un=!1,EC(t,e,n);un=!!(t.flags&131072)}else un=!1,ft&&e.flags&1048576&&hA(e,Sl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;nl(t,e),t=e.pendingProps;var r=bs(e,qt.current);ys(e,n),r=zd(null,e,i,t,r,n);var s=Bd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,dn(i)?(s=!0,Il(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Dd(e),r.updater=$l,e.stateNode=r,r._reactInternals=e,nh(e,i,t,n),e=sh(null,e,i,!0,s,n)):(e.tag=0,ft&&s&&wd(e),nn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(nl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=GC(i),t=Gn(i,t),r){case 0:e=rh(null,e,i,t,n);break e;case 1:e=wp(null,e,i,t,n);break e;case 11:e=Sp(null,e,i,t,n);break e;case 14:e=Ep(null,e,i,Gn(i.type,t),n);break e}throw Error(ue(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),rh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),wp(t,e,i,r,n);case 3:e:{if(WA(e),t===null)throw Error(ue(387));i=e.pendingProps,s=e.memoizedState,r=s.element,AA(t,e),Tl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ds(Error(ue(423)),e),e=Tp(t,e,i,n,r);break e}else if(i!==r){r=Ds(Error(ue(424)),e),e=Tp(t,e,i,n,r);break e}else for(Cn=$i(e.stateNode.containerInfo.firstChild),xn=e,ft=!0,Wn=null,n=mA(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ps(),i===r){e=Ti(t,e,n);break e}nn(t,e,i,n)}e=e.child}return e;case 5:return vA(e),t===null&&$u(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Zu(i,r)?o=null:s!==null&&Zu(i,s)&&(e.flags|=32),HA(t,e),nn(t,e,o,n),e.child;case 6:return t===null&&$u(e),null;case 13:return jA(t,e,n);case 4:return Ud(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ls(e,null,i,n):nn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),Sp(t,e,i,r,n);case 7:return nn(t,e,e.pendingProps,n),e.child;case 8:return nn(t,e,e.pendingProps.children,n),e.child;case 12:return nn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,lt(El,i._currentValue),i._currentValue=o,s!==null)if(Kn(s.value,o)){if(s.children===r.children&&!hn.current){e=Ti(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ii(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),eh(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ue(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),eh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}nn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ys(e,n),r=Dn(r),i=i(r),e.flags|=1,nn(t,e,i,n),e.child;case 14:return i=e.type,r=Gn(i,e.pendingProps),r=Gn(i.type,r),Ep(t,e,i,r,n);case 15:return GA(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),nl(t,e),e.tag=1,dn(i)?(t=!0,Il(e)):t=!1,ys(e,n),kA(e,i,r),nh(e,i,r,n),sh(null,e,i,!0,t,n);case 19:return XA(t,e,n);case 22:return VA(t,e,n)}throw Error(ue(156,e.tag))};function lv(t,e){return Ug(t,e)}function BC(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pn(t,e,n,i){return new BC(t,e,n,i)}function Kd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function GC(t){if(typeof t=="function")return Kd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===md)return 11;if(t===gd)return 14}return 2}function ir(t,e){var n=t.alternate;return n===null?(n=Pn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function sl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Kd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case rs:return Er(n.children,r,s,e);case pd:o=8,r|=8;break;case Eu:return t=Pn(12,n,e,r|2),t.elementType=Eu,t.lanes=s,t;case wu:return t=Pn(13,n,e,r),t.elementType=wu,t.lanes=s,t;case Tu:return t=Pn(19,n,e,r),t.elementType=Tu,t.lanes=s,t;case vg:return nc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case gg:o=10;break e;case Ag:o=9;break e;case md:o=11;break e;case gd:o=14;break e;case Gi:o=16,i=null;break e}throw Error(ue(130,t==null?t:typeof t,""))}return e=Pn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Er(t,e,n,i){return t=Pn(7,t,i,e),t.lanes=n,t}function nc(t,e,n,i){return t=Pn(22,t,i,e),t.elementType=vg,t.lanes=n,t.stateNode={isHidden:!1},t}function Bc(t,e,n){return t=Pn(6,t,null,e),t.lanes=n,t}function Gc(t,e,n){return e=Pn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function VC(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xc(0),this.expirationTimes=xc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Qd(t,e,n,i,r,s,o,a,l){return t=new VC(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Pn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dd(s),t}function HC(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:is,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function cv(t){if(!t)return or;t=t._reactInternals;e:{if(Fr(t)!==t||t.tag!==1)throw Error(ue(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(dn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ue(171))}if(t.tag===1){var n=t.type;if(dn(n))return cA(t,n,e)}return e}function uv(t,e,n,i,r,s,o,a,l){return t=Qd(n,i,!0,t,r,s,o,a,l),t.context=cv(null),n=t.current,i=rn(),r=nr(n),s=Ii(i,r),s.callback=e??null,er(n,s,r),t.current.lanes=r,Qo(t,r,i),fn(t,i),t}function ic(t,e,n,i){var r=e.current,s=rn(),o=nr(r);return n=cv(n),e.context===null?e.context=n:e.pendingContext=n,e=Ii(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=er(r,e,o),t!==null&&(Jn(t,r,o,s),$a(t,r,o)),o}function Ol(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function kp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function qd(t,e){kp(t,e),(t=t.alternate)&&kp(t,e)}function WC(){return null}var hv=typeof reportError=="function"?reportError:function(t){console.error(t)};function $d(t){this._internalRoot=t}rc.prototype.render=$d.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ue(409));ic(t,e,null,null)};rc.prototype.unmount=$d.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Pr(function(){ic(null,t,null,null)}),e[Ei]=null}};function rc(t){this._internalRoot=t}rc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Vg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Wi.length&&e!==0&&e<Wi[n].priority;n++);Wi.splice(n,0,t),n===0&&Wg(t)}};function ef(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function sc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function zp(){}function jC(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ol(o);s.call(c)}}var o=uv(e,i,t,0,null,!1,!1,"",zp);return t._reactRootContainer=o,t[Ei]=o.current,Uo(t.nodeType===8?t.parentNode:t),Pr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ol(l);a.call(c)}}var l=Qd(t,0,!1,null,null,!1,!1,"",zp);return t._reactRootContainer=l,t[Ei]=l.current,Uo(t.nodeType===8?t.parentNode:t),Pr(function(){ic(e,l,n,i)}),l}function oc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ol(o);a.call(l)}}ic(e,o,t,r)}else o=jC(n,e,t,r,i);return Ol(o)}Bg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=co(e.pendingLanes);n!==0&&(_d(e,n|1),fn(e,wt()),!(qe&6)&&(Us=wt()+500,cr()))}break;case 13:Pr(function(){var i=wi(t,1);if(i!==null){var r=rn();Jn(i,t,1,r)}}),qd(t,1)}};Cd=function(t){if(t.tag===13){var e=wi(t,134217728);if(e!==null){var n=rn();Jn(e,t,134217728,n)}qd(t,134217728)}};Gg=function(t){if(t.tag===13){var e=nr(t),n=wi(t,e);if(n!==null){var i=rn();Jn(n,t,e,i)}qd(t,e)}};Vg=function(){return it};Hg=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};ku=function(t,e,n){switch(e){case"input":if(Pu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Kl(i);if(!r)throw Error(ue(90));Cg(i),Pu(i,r)}}}break;case"textarea":yg(t,n);break;case"select":e=n.value,e!=null&&vs(t,!!n.multiple,e,!1)}};Rg=Yd;bg=Pr;var XC={usingClientEntryPoint:!1,Events:[$o,ls,Kl,wg,Tg,Yd]},to={findFiberByHostInstance:xr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},YC={bundleType:to.bundleType,version:to.version,rendererPackageName:to.rendererPackageName,rendererConfig:to.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Li.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Ng(t),t===null?null:t.stateNode},findFiberByHostInstance:to.findFiberByHostInstance||WC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ya.isDisabled&&ya.supportsFiber)try{Xl=ya.inject(YC),ii=ya}catch{}}In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=XC;In.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ef(e))throw Error(ue(200));return HC(t,e,null,n)};In.createRoot=function(t,e){if(!ef(t))throw Error(ue(299));var n=!1,i="",r=hv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Qd(t,1,!1,null,null,n,!1,i,r),t[Ei]=e.current,Uo(t.nodeType===8?t.parentNode:t),new $d(e)};In.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ue(188)):(t=Object.keys(t).join(","),Error(ue(268,t)));return t=Ng(e),t=t===null?null:t.stateNode,t};In.flushSync=function(t){return Pr(t)};In.hydrate=function(t,e,n){if(!sc(e))throw Error(ue(200));return oc(null,t,e,!0,n)};In.hydrateRoot=function(t,e,n){if(!ef(t))throw Error(ue(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=hv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=uv(e,null,t,1,n??null,r,!1,s,o),t[Ei]=e.current,Uo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new rc(e)};In.render=function(t,e,n){if(!sc(e))throw Error(ue(200));return oc(null,t,e,!1,n)};In.unmountComponentAtNode=function(t){if(!sc(t))throw Error(ue(40));return t._reactRootContainer?(Pr(function(){oc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ei]=null})}),!0):!1};In.unstable_batchedUpdates=Yd;In.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!sc(n))throw Error(ue(200));if(t==null||t._reactInternals===void 0)throw Error(ue(38));return oc(t,e,n,!1,i)};In.version="18.3.1-next-f1338f8080-20240426";function dv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dv)}catch(t){console.error(t)}}dv(),dg.exports=In;var tf=dg.exports,Bp=tf;Mu.createRoot=Bp.createRoot,Mu.hydrateRoot=Bp.hydrateRoot;const fv=()=>mt("list_materials","GET"),ZC=t=>mt("component_mass","POST",{id:t}),pv=t=>mt("sim_warnings","POST",{sim_name:t}),JC=()=>mt("flight_columns","GET"),KC=(t,e)=>mt("register_motor","POST",{name:t,eng_text:e});async function QC(t,e){const n=await fetch("/api/export_flight_csv",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sim_name:t,columns:e})});if(!n.ok)throw new Error(await n.text());return n.text()}async function mt(t,e,n){const i=await fetch(`/api/${t}`,{method:e,headers:n?{"content-type":"application/json"}:{},body:n?JSON.stringify(n):void 0});if(!i.ok)throw new Error(await i.text());return i.json()}const mv=t=>mt("load_ork","POST",{path:t}),qC=t=>mt("load_ork","POST",{b64:t}),Gp=()=>mt("snapshot","POST",{}),$C=()=>mt("new","POST",{}),ex=async t=>{const e=new Uint8Array(await t.arrayBuffer());let n="";for(let i=0;i<e.length;i++)n+=String.fromCharCode(e[i]);return mt("load_ork","POST",{b64:btoa(n)})},tx=(t,e,n)=>mt("component","PATCH",{id:t,key:e,value:n}),nx=t=>mt("component/delete","POST",{id:t}),ix=(t,e)=>mt("component/add","POST",{parent_id:t,kind:e}),rx=()=>mt("undo","POST",{}),sx=()=>mt("redo","POST",{}),Vc=t=>{switch(t){case"Stage":return["NoseCone","BodyTube","Transition","PodSet","ParallelStage"];case"BodyTube":return["InnerTube","FinSet","TubeFinSet","LaunchLug","CenteringRing","Parachute","ShockCord","MassObject"];case"PodSet":case"ParallelStage":return["NoseCone","BodyTube","Transition"];default:return[]}},Hc=t=>mt("save","POST",{path:t??null}),Vp=t=>mt("simulate","POST",{sim_name:t}),ox=(t,e,n)=>mt("sim","PATCH",{sim_name:t,key:e,value:n}),ax=t=>mt("analysis","POST",{mach:t}),lx=t=>mt("optimize","POST",t),Ah=()=>mt("motors","GET"),cx=(t,e,n,i,r)=>mt("assign_motor","POST",{mount_id:t,config_id:e,designation:n,digest:i,ejection_delay:r}),ux=(t,e)=>mt("clear_motor","POST",{mount_id:t,config_id:e}),hx=async()=>{try{return await mt("fixtures","GET")}catch{return[]}};function si({options:t,value:e,onChange:n,className:i="",title:r,disabled:s=!1,placeholder:o="—"}){const[a,l]=se.useState(!1),[c,h]=se.useState(0),u=se.useRef(null),f=se.useRef(null),p=t.find(A=>A.value===e),[g,_]=se.useState(null);se.useLayoutEffect(()=>{if(!a)return;const A=()=>{const v=u.current?.getBoundingClientRect();v&&_({left:v.left,top:v.bottom+4,width:v.width})};return A(),window.addEventListener("scroll",A,!0),window.addEventListener("resize",A),()=>{window.removeEventListener("scroll",A,!0),window.removeEventListener("resize",A)}},[a]),se.useEffect(()=>{if(!a)return;const A=v=>{const y=v.target;u.current&&!u.current.contains(y)&&f.current&&!f.current.contains(y)&&l(!1)};return document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[a]),se.useEffect(()=>{a&&h(Math.max(0,t.findIndex(A=>A.value===e)))},[a,t,e]);const m=A=>{const v=t[A];v&&n(v.value),l(!1)},d=A=>{if(!s){if(A.key==="Escape")return l(!1);if(!a&&(A.key==="Enter"||A.key===" "||A.key==="ArrowDown"))return A.preventDefault(),l(!0);a&&(A.key==="ArrowDown"?(A.preventDefault(),h(v=>Math.min(t.length-1,v+1))):A.key==="ArrowUp"?(A.preventDefault(),h(v=>Math.max(0,v-1))):(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),m(c)))}};return S.jsxs("div",{ref:u,className:"uisel"+(s?" disabled":"")+(i?" "+i:""),title:r,children:[S.jsxs("button",{type:"button",className:"uisel-trigger",disabled:s,"aria-haspopup":"listbox","aria-expanded":a,onClick:()=>!s&&l(A=>!A),onKeyDown:d,children:[S.jsx("span",{className:"uisel-value",children:p?p.label:o}),S.jsx("svg",{className:"uisel-chev"+(a?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:S.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),a&&g&&tf.createPortal(S.jsx("ul",{ref:f,className:"uisel-list",role:"listbox",onWheel:A=>A.stopPropagation(),onPointerDown:A=>A.stopPropagation(),style:{position:"fixed",left:g.left,top:g.top,minWidth:g.width},children:t.map((A,v)=>S.jsx("li",{role:"option","aria-selected":A.value===e,className:"uisel-opt"+(A.value===e?" sel":"")+(v===c?" active":""),onMouseEnter:()=>h(v),onMouseDown:y=>{y.preventDefault(),m(v)},children:A.label},A.value))}),document.body)]})}const Hp=250;function dx({fixtures:t,busy:e,hasDoc:n,canExportCsv:i,onNew:r,onOpenFile:s,onOpenExample:o,onSave:a,onSaveAs:l,onExportCsv:c,onExportPng:h,onExportObj:u,onExportOrk:f}){const[p,g]=se.useState(!1),[_,m]=se.useState(""),d=se.useRef(null),A=se.useRef(null),v=se.useRef(null),y=se.useRef(null),[P,w]=se.useState(null),[C,T]=se.useState({left:0,top:0}),B=(N,F)=>{const V=A.current?.getBoundingClientRect(),K=F.currentTarget.getBoundingClientRect();if(!V)return;const W=V.right+Hp<=window.innerWidth;T({left:W?V.right-2:V.left-Hp+2,top:Math.max(8,Math.min(K.top-6,window.innerHeight-60))}),m(N)};se.useLayoutEffect(()=>{if(!p)return;const N=()=>{const F=d.current?.getBoundingClientRect();F&&w({left:F.left,top:F.bottom+4})};return N(),window.addEventListener("scroll",N,!0),window.addEventListener("resize",N),()=>{window.removeEventListener("scroll",N,!0),window.removeEventListener("resize",N)}},[p]),se.useEffect(()=>{if(!p)return;const N=F=>{const V=F.target;d.current&&!d.current.contains(V)&&A.current&&!A.current.contains(V)&&!(v.current&&v.current.contains(V))&&(g(!1),m(""))};return document.addEventListener("mousedown",N),()=>document.removeEventListener("mousedown",N)},[p]);const x=()=>{g(!1),m("")},I=N=>{x(),N()};return S.jsxs("div",{ref:d,className:"uisel filemenu",children:[S.jsxs("button",{type:"button",className:"uisel-trigger",disabled:e,"aria-haspopup":"menu","aria-expanded":p,onClick:()=>!e&&g(N=>!N),children:[S.jsx("span",{className:"uisel-value",children:"File"}),S.jsx("svg",{className:"uisel-chev"+(p?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:S.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),S.jsx("input",{ref:y,type:"file",accept:".ork",style:{display:"none"},onChange:N=>{const F=N.target.files?.[0];N.target.value="",F&&I(()=>s(F))}}),p&&P&&tf.createPortal(S.jsxs(S.Fragment,{children:[S.jsxs("div",{ref:A,className:"fmenu",onWheel:N=>N.stopPropagation(),onPointerDown:N=>N.stopPropagation(),style:{position:"fixed",left:P.left,top:P.top},children:[S.jsx("button",{className:"fm-item",onMouseEnter:()=>m(""),onClick:()=>I(r),children:"New"}),S.jsx("button",{className:"fm-item",onMouseEnter:()=>m(""),onClick:()=>y.current?.click(),children:"Open .ork file…"}),S.jsxs("button",{className:"fm-item fm-parent"+(_==="examples"?" on":""),onMouseEnter:N=>B("examples",N),onClick:N=>B("examples",N),children:["Open example",S.jsx("span",{className:"fm-arrow",children:"▸"})]}),S.jsx("div",{className:"fm-sep"}),S.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>m(""),onClick:()=>I(a),children:"Save"}),S.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>m(""),onClick:()=>I(()=>{const N=window.prompt("Save as (filename):","rocket.ork");N&&l(N.endsWith(".ork")?N:N+".ork")}),children:"Save as…"}),S.jsx("div",{className:"fm-sep"}),S.jsxs("button",{className:"fm-item fm-parent"+(_==="export"?" on":""),disabled:!n,onMouseEnter:N=>n&&B("export",N),onClick:N=>n&&B("export",N),children:["Export",S.jsx("span",{className:"fm-arrow",children:"▸"})]})]}),_&&S.jsx("div",{ref:v,className:"fmenu fm-fly",onWheel:N=>N.stopPropagation(),onPointerDown:N=>N.stopPropagation(),onMouseLeave:()=>m(""),style:{position:"fixed",left:C.left,top:C.top},children:_==="examples"?t.length===0?S.jsx("div",{className:"fm-empty",children:"no examples"}):t.map(N=>S.jsx("button",{className:"fm-item",onClick:()=>I(()=>o(N.path)),children:N.name},N.path)):S.jsxs(S.Fragment,{children:[S.jsx("button",{className:"fm-item",onClick:()=>I(h),children:"Design image (PNG)"}),S.jsx("button",{className:"fm-item",onClick:()=>I(u),children:"3D model (OBJ)"}),S.jsx("button",{className:"fm-item",onClick:()=>I(f),children:"OpenRocket file (.ork)"}),S.jsx("button",{className:"fm-item",disabled:!i,title:i?"":"Run a simulation first",onClick:()=>I(c),children:"Flight data (CSV)"})]})})]}),document.body)]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nf="169",Ms={ROTATE:0,DOLLY:1,PAN:2},ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fx=0,Wp=1,px=2,gv=1,mx=2,mi=3,Ri=0,Kt=1,_n=2,rr=0,Ss=1,jp=2,Xp=3,Yp=4,gx=5,_r=100,Ax=101,vx=102,_x=103,Cx=104,xx=200,yx=201,Ix=202,Mx=203,vh=204,_h=205,Sx=206,Ex=207,wx=208,Tx=209,Rx=210,bx=211,Px=212,Lx=213,Nx=214,Ch=0,xh=1,yh=2,Os=3,Ih=4,Mh=5,Sh=6,Eh=7,Av=0,Dx=1,Ux=2,Mi=0,Ox=1,Fx=2,kx=3,zx=4,Bx=5,Gx=6,Vx=7,vv=300,Fs=301,ks=302,wh=303,Th=304,ac=306,zs=1e3,Ji=1001,Fl=1002,Ln=1003,Hx=1004,Ia=1005,jn=1006,Wc=1007,Mr=1008,bi=1009,_v=1010,Cv=1011,Wo=1012,rf=1013,Lr=1014,Ci=1015,ta=1016,sf=1017,of=1018,Bs=1020,xv=35902,yv=1021,Iv=1022,Yn=1023,Mv=1024,Sv=1025,Es=1026,Gs=1027,Ev=1028,af=1029,wv=1030,lf=1031,cf=1033,ol=33776,al=33777,ll=33778,cl=33779,Rh=35840,bh=35841,Ph=35842,Lh=35843,Nh=36196,Dh=37492,Uh=37496,Oh=37808,Fh=37809,kh=37810,zh=37811,Bh=37812,Gh=37813,Vh=37814,Hh=37815,Wh=37816,jh=37817,Xh=37818,Yh=37819,Zh=37820,Jh=37821,ul=36492,Kh=36494,Qh=36495,Tv=36283,qh=36284,$h=36285,ed=36286,Wx=3200,jx=3201,Rv=0,Xx=1,Xi="",Hn="srgb",Qn="srgb-linear",uf="display-p3",lc="display-p3-linear",kl="linear",ht="srgb",zl="rec709",Bl="p3",Vr=7680,Zp=519,Yx=512,Zx=513,Jx=514,bv=515,Kx=516,Qx=517,qx=518,$x=519,Jp=35044,Kp="300 es",xi=2e3,Gl=2001;class kr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qp=1234567;const yo=Math.PI/180,jo=180/Math.PI;function zr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[t&255]+Yt[t>>8&255]+Yt[t>>16&255]+Yt[t>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[n&63|128]+Yt[n>>8&255]+"-"+Yt[n>>16&255]+Yt[n>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function Lt(t,e,n){return Math.max(e,Math.min(n,t))}function hf(t,e){return(t%e+e)%e}function ey(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function ty(t,e,n){return t!==e?(n-t)/(e-t):0}function Io(t,e,n){return(1-n)*t+n*e}function ny(t,e,n,i){return Io(t,e,1-Math.exp(-n*i))}function iy(t,e=1){return e-Math.abs(hf(t,e*2)-e)}function ry(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function sy(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function oy(t,e){return t+Math.floor(Math.random()*(e-t+1))}function ay(t,e){return t+Math.random()*(e-t)}function ly(t){return t*(.5-Math.random())}function cy(t){t!==void 0&&(Qp=t);let e=Qp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function uy(t){return t*yo}function hy(t){return t*jo}function dy(t){return(t&t-1)===0&&t!==0}function fy(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function py(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function my(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),h=o((e+i)/2),u=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":t.set(a*h,l*u,l*f,a*c);break;case"YZY":t.set(l*f,a*h,l*u,a*c);break;case"ZXZ":t.set(l*u,l*f,a*h,a*c);break;case"XZX":t.set(a*h,l*g,l*p,a*c);break;case"YXY":t.set(l*p,a*h,l*g,a*c);break;case"ZYZ":t.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ns(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function en(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Pv={DEG2RAD:yo,RAD2DEG:jo,generateUUID:zr,clamp:Lt,euclideanModulo:hf,mapLinear:ey,inverseLerp:ty,lerp:Io,damp:ny,pingpong:iy,smoothstep:ry,smootherstep:sy,randInt:oy,randFloat:ay,randFloatSpread:ly,seededRandom:cy,degToRad:uy,radToDeg:hy,isPowerOfTwo:dy,ceilPowerOfTwo:fy,floorPowerOfTwo:py,setQuaternionFromProperEuler:my,normalize:en,denormalize:ns};class he{constructor(e=0,n=0){he.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,n,i,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],A=r[1],v=r[4],y=r[7],P=r[2],w=r[5],C=r[8];return s[0]=o*_+a*A+l*P,s[3]=o*m+a*v+l*w,s[6]=o*d+a*y+l*C,s[1]=c*_+h*A+u*P,s[4]=c*m+h*v+u*w,s[7]=c*d+h*y+u*C,s[2]=f*_+p*A+g*P,s[5]=f*m+p*v+g*w,s[8]=f*d+p*y+g*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*s,p=c*s-o*l,g=n*u+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-h*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(h*n-r*l)*_,e[5]=(r*s-a*n)*_,e[6]=p*_,e[7]=(i*l-c*n)*_,e[8]=(o*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(jc.makeScale(e,n)),this}rotate(e){return this.premultiply(jc.makeRotation(-e)),this}translate(e,n){return this.premultiply(jc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jc=new He;function Lv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Xo(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function gy(){const t=Xo("canvas");return t.style.display="block",t}const qp={};function hl(t){t in qp||(qp[t]=!0,console.warn(t))}function Ay(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function vy(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function _y(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $p=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),em=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),no={[Qn]:{transfer:kl,primaries:zl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Hn]:{transfer:ht,primaries:zl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[lc]:{transfer:kl,primaries:Bl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(em),fromReference:t=>t.applyMatrix3($p)},[uf]:{transfer:ht,primaries:Bl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(em),fromReference:t=>t.applyMatrix3($p).convertLinearToSRGB()}},Cy=new Set([Qn,lc]),$e={enabled:!0,_workingColorSpace:Qn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Cy.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=no[e].toReference,r=no[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return no[t].primaries},getTransfer:function(t){return t===Xi?kl:no[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(no[e].luminanceCoefficients)}};function ws(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Xc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Hr;class xy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Hr===void 0&&(Hr=Xo("canvas")),Hr.width=e.width,Hr.height=e.height;const i=Hr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Hr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Xo("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ws(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ws(n[i]/255)*255):n[i]=ws(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yy=0;class Nv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yy++}),this.uuid=zr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Yc(r[o].image)):s.push(Yc(r[o]))}else s=Yc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Yc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?xy.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Iy=0;class sn extends kr{constructor(e=sn.DEFAULT_IMAGE,n=sn.DEFAULT_MAPPING,i=Ji,r=Ji,s=jn,o=Mr,a=Yn,l=bi,c=sn.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=zr(),this.name="",this.source=new Nv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zs:e.x=e.x-Math.floor(e.x);break;case Ji:e.x=e.x<0?0:1;break;case Fl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zs:e.y=e.y-Math.floor(e.y);break;case Ji:e.y=e.y<0?0:1;break;case Fl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=vv;sn.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,n=0,i=0,r=1){St.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,y=(p+1)/2,P=(d+1)/2,w=(h+f)/4,C=(u+_)/4,T=(g+m)/4;return v>y&&v>P?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=w/i,s=C/i):y>P?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=T/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=C/s,r=T/s),this.set(i,r,s,n),this}let A=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(u-_)/A,this.z=(f-h)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class My extends kr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new St(0,0,e,n),this.scissorTest=!1,this.viewport=new St(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new sn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Nv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nr extends My{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Dv extends sn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sy extends sn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Dr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=g,e[n+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-a;const d=l*f+c*p+h*g+u*_,A=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const P=Math.sqrt(v),w=Math.atan2(P,d*A);m=Math.sin(m*w)/P,a=Math.sin(a*w)/P}const y=a*A;if(l=l*m+f*y,c=c*m+p*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+h*u+l*p-c*f,e[n+1]=l*g+h*f+c*u-a*p,e[n+2]=c*g+h*p+a*f-l*u,e[n+3]=h*g-a*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],u=n[10],f=i+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-n)*h)/c,f=Math.sin(n*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,n=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(tm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(tm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),u=2*(s*i-o*n);return this.x=n+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Zc.copy(this).projectOnVector(e),this.sub(Zc)}reflect(e){return this.sub(Zc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zc=new U,tm=new Dr;class Xs{constructor(e=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(kn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(kn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=kn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kn):kn.fromBufferAttribute(s,o),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ma.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ma.copy(i.boundingBox)),Ma.applyMatrix4(e.matrixWorld),this.union(Ma)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(io),Sa.subVectors(this.max,io),Wr.subVectors(e.a,io),jr.subVectors(e.b,io),Xr.subVectors(e.c,io),Ui.subVectors(jr,Wr),Oi.subVectors(Xr,jr),ur.subVectors(Wr,Xr);let n=[0,-Ui.z,Ui.y,0,-Oi.z,Oi.y,0,-ur.z,ur.y,Ui.z,0,-Ui.x,Oi.z,0,-Oi.x,ur.z,0,-ur.x,-Ui.y,Ui.x,0,-Oi.y,Oi.x,0,-ur.y,ur.x,0];return!Jc(n,Wr,jr,Xr,Sa)||(n=[1,0,0,0,1,0,0,0,1],!Jc(n,Wr,jr,Xr,Sa))?!1:(Ea.crossVectors(Ui,Oi),n=[Ea.x,Ea.y,Ea.z],Jc(n,Wr,jr,Xr,Sa))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ui=[new U,new U,new U,new U,new U,new U,new U,new U],kn=new U,Ma=new Xs,Wr=new U,jr=new U,Xr=new U,Ui=new U,Oi=new U,ur=new U,io=new U,Sa=new U,Ea=new U,hr=new U;function Jc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){hr.fromArray(t,s);const a=r.x*Math.abs(hr.x)+r.y*Math.abs(hr.y)+r.z*Math.abs(hr.z),l=e.dot(hr),c=n.dot(hr),h=i.dot(hr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ey=new Xs,ro=new U,Kc=new U;class df{constructor(e=new U,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Ey.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ro.subVectors(e,this.center);const n=ro.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ro,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ro.copy(e.center).add(Kc)),this.expandByPoint(ro.copy(e.center).sub(Kc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hi=new U,Qc=new U,wa=new U,Fi=new U,qc=new U,Ta=new U,$c=new U;class Uv{constructor(e=new U,n=new U(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=hi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,n),hi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Qc.copy(e).add(n).multiplyScalar(.5),wa.copy(n).sub(e).normalize(),Fi.copy(this.origin).sub(Qc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(wa),a=Fi.dot(this.direction),l=-Fi.dot(wa),c=Fi.lengthSq(),h=Math.abs(1-o*o);let u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Qc).addScaledVector(wa,f),p}intersectSphere(e,n){hi.subVectors(e.center,this.origin);const i=hi.dot(this.direction),r=hi.dot(hi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,n,i,r,s){qc.subVectors(n,e),Ta.subVectors(i,e),$c.crossVectors(qc,Ta);let o=this.direction.dot($c),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fi.subVectors(this.origin,e);const l=a*this.direction.dot(Ta.crossVectors(Fi,Ta));if(l<0)return null;const c=a*this.direction.dot(qc.cross(Fi));if(c<0||l+c>o)return null;const h=-a*Fi.dot($c);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,n,i,r,s,o,a,l,c,h,u,f,p,g,_,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,u,f,p,g,_,m)}set(e,n,i,r,s,o,a,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Yr.setFromMatrixColumn(e,0).length(),s=1/Yr.setFromMatrixColumn(e,1).length(),o=1/Yr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*u,g=a*h,_=a*u;n[0]=l*h,n[4]=-l*u,n[8]=c,n[1]=p+g*c,n[5]=f-_*c,n[9]=-a*l,n[2]=_-f*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;n[0]=f+_*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*u,n[5]=o*h,n[9]=-a,n[2]=p*a-g,n[6]=_+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;n[0]=f-_*a,n[4]=-o*u,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*h,n[9]=_-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*u,g=a*h,_=a*u;n[0]=l*h,n[4]=g*c-p,n[8]=f*c+_,n[1]=l*u,n[5]=_*c+f,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;n[0]=l*h,n[4]=_-f*u,n[8]=g*u+p,n[1]=u,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*u+g,n[10]=f-_*u}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;n[0]=l*h,n[4]=-u,n[8]=c*h,n[1]=f*u+_,n[5]=o*h,n[9]=p*u-g,n[2]=g*u-p,n[6]=a*h,n[10]=_*u+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wy,e,Ty)}lookAt(e,n,i){const r=this.elements;return gn.subVectors(e,n),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),ki.crossVectors(i,gn),ki.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),ki.crossVectors(i,gn)),ki.normalize(),Ra.crossVectors(gn,ki),r[0]=ki.x,r[4]=Ra.x,r[8]=gn.x,r[1]=ki.y,r[5]=Ra.y,r[9]=gn.y,r[2]=ki.z,r[6]=Ra.z,r[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],A=i[3],v=i[7],y=i[11],P=i[15],w=r[0],C=r[4],T=r[8],B=r[12],x=r[1],I=r[5],N=r[9],F=r[13],V=r[2],K=r[6],W=r[10],Q=r[14],D=r[3],j=r[7],J=r[11],ie=r[15];return s[0]=o*w+a*x+l*V+c*D,s[4]=o*C+a*I+l*K+c*j,s[8]=o*T+a*N+l*W+c*J,s[12]=o*B+a*F+l*Q+c*ie,s[1]=h*w+u*x+f*V+p*D,s[5]=h*C+u*I+f*K+p*j,s[9]=h*T+u*N+f*W+p*J,s[13]=h*B+u*F+f*Q+p*ie,s[2]=g*w+_*x+m*V+d*D,s[6]=g*C+_*I+m*K+d*j,s[10]=g*T+_*N+m*W+d*J,s[14]=g*B+_*F+m*Q+d*ie,s[3]=A*w+v*x+y*V+P*D,s[7]=A*C+v*I+y*K+P*j,s[11]=A*T+v*N+y*W+P*J,s[15]=A*B+v*F+y*Q+P*ie,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*p-i*l*p)+_*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*h-s*l*h)+m*(+n*c*u-n*a*p-s*o*u+i*o*p+s*a*h-i*c*h)+d*(-r*a*h-n*l*u+n*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],A=u*m*c-_*f*c+_*l*p-a*m*p-u*l*d+a*f*d,v=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,y=h*_*c-g*u*c+g*a*p-o*_*p-h*a*d+o*u*d,P=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,w=n*A+i*v+r*y+s*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=A*C,e[1]=(_*f*s-u*m*s-_*r*p+i*m*p+u*r*d-i*f*d)*C,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*C,e[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*p-i*l*p)*C,e[4]=v*C,e[5]=(h*m*s-g*f*s+g*r*p-n*m*p-h*r*d+n*f*d)*C,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*d-n*l*d)*C,e[7]=(o*f*s-h*l*s+h*r*c-n*f*c-o*r*p+n*l*p)*C,e[8]=y*C,e[9]=(g*u*s-h*_*s-g*i*p+n*_*p+h*i*d-n*u*d)*C,e[10]=(o*_*s-g*a*s+g*i*c-n*_*c-o*i*d+n*a*d)*C,e[11]=(h*a*s-o*u*s-h*i*c+n*u*c+o*i*p-n*a*p)*C,e[12]=P*C,e[13]=(h*_*r-g*u*r+g*i*f-n*_*f-h*i*m+n*u*m)*C,e[14]=(g*a*r-o*_*r-g*i*l+n*_*l+o*i*m-n*a*m)*C,e[15]=(o*u*r-h*a*r+h*i*l-n*u*l-o*i*f+n*a*f)*C,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,u=a+a,f=s*c,p=s*h,g=s*u,_=o*h,m=o*u,d=a*u,A=l*c,v=l*h,y=l*u,P=i.x,w=i.y,C=i.z;return r[0]=(1-(_+d))*P,r[1]=(p+y)*P,r[2]=(g-v)*P,r[3]=0,r[4]=(p-y)*w,r[5]=(1-(f+d))*w,r[6]=(m+A)*w,r[7]=0,r[8]=(g+v)*C,r[9]=(m-A)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Yr.set(r[0],r[1],r[2]).length();const o=Yr.set(r[4],r[5],r[6]).length(),a=Yr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],zn.copy(this);const c=1/s,h=1/o,u=1/a;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,n.setFromRotationMatrix(zn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=xi){const l=this.elements,c=2*s/(n-e),h=2*s/(i-r),u=(n+e)/(n-e),f=(i+r)/(i-r);let p,g;if(a===xi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Gl)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=xi){const l=this.elements,c=1/(n-e),h=1/(i-r),u=1/(o-s),f=(n+e)*c,p=(i+r)*h;let g,_;if(a===xi)g=(o+s)*u,_=-2*u;else if(a===Gl)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Yr=new U,zn=new at,wy=new U(0,0,0),Ty=new U(1,1,1),ki=new U,Ra=new U,gn=new U,nm=new at,im=new Dr;class ai{constructor(e=0,n=0,i=0,r=ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return im.setFromEuler(this),this.setFromQuaternion(im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ai.DEFAULT_ORDER="XYZ";class Ov{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ry=0;const rm=new U,Zr=new Dr,di=new at,ba=new U,so=new U,by=new U,Py=new Dr,sm=new U(1,0,0),om=new U(0,1,0),am=new U(0,0,1),lm={type:"added"},Ly={type:"removed"},Jr={type:"childadded",child:null},eu={type:"childremoved",child:null};class Qt extends kr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ry++}),this.uuid=zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qt.DEFAULT_UP.clone();const e=new U,n=new ai,i=new Dr,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new He}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ov,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.multiply(Zr),this}rotateOnWorldAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.premultiply(Zr),this}rotateX(e){return this.rotateOnAxis(sm,e)}rotateY(e){return this.rotateOnAxis(om,e)}rotateZ(e){return this.rotateOnAxis(am,e)}translateOnAxis(e,n){return rm.copy(e).applyQuaternion(this.quaternion),this.position.add(rm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(sm,e)}translateY(e){return this.translateOnAxis(om,e)}translateZ(e){return this.translateOnAxis(am,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ba.copy(e):ba.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(so,ba,this.up):di.lookAt(ba,so,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),Zr.setFromRotationMatrix(di),this.quaternion.premultiply(Zr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lm),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Ly),eu.child=e,this.dispatchEvent(eu),eu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lm),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,e,by),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,Py,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Qt.DEFAULT_UP=new U(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new U,fi=new U,tu=new U,pi=new U,Kr=new U,Qr=new U,cm=new U,nu=new U,iu=new U,ru=new U,su=new St,ou=new St,au=new St;class Xn{constructor(e=new U,n=new U,i=new U){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Bn.subVectors(e,n),r.cross(Bn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Bn.subVectors(r,n),fi.subVectors(i,n),tu.subVectors(e,n);const o=Bn.dot(Bn),a=Bn.dot(fi),l=Bn.dot(tu),c=fi.dot(fi),h=fi.dot(tu),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pi.x),l.addScaledVector(o,pi.y),l.addScaledVector(a,pi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return su.setScalar(0),ou.setScalar(0),au.setScalar(0),su.fromBufferAttribute(e,n),ou.fromBufferAttribute(e,i),au.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(su,s.x),o.addScaledVector(ou,s.y),o.addScaledVector(au,s.z),o}static isFrontFacing(e,n,i,r){return Bn.subVectors(i,n),fi.subVectors(e,n),Bn.cross(fi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Bn.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Xn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Xn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Kr.subVectors(r,i),Qr.subVectors(s,i),nu.subVectors(e,i);const l=Kr.dot(nu),c=Qr.dot(nu);if(l<=0&&c<=0)return n.copy(i);iu.subVectors(e,r);const h=Kr.dot(iu),u=Qr.dot(iu);if(h>=0&&u<=h)return n.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(Kr,o);ru.subVectors(e,s);const p=Kr.dot(ru),g=Qr.dot(ru);if(g>=0&&p<=g)return n.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(Qr,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return cm.subVectors(s,r),a=(u-h)/(u-h+(p-g)),n.copy(r).addScaledVector(cm,a);const d=1/(m+_+f);return o=_*d,a=f*d,n.copy(i).addScaledVector(Kr,o).addScaledVector(Qr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function lu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ye{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=$e.workingColorSpace){return this.r=e,this.g=n,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=$e.workingColorSpace){if(e=hf(e,1),n=Lt(n,0,1),i=Lt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=lu(o,s,e+1/3),this.g=lu(o,s,e),this.b=lu(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,n=Hn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Hn){const i=Fv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=Xc(e.r),this.g=Xc(e.g),this.b=Xc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Hn){return $e.fromWorkingColorSpace(Zt.copy(this),e),Math.round(Lt(Zt.r*255,0,255))*65536+Math.round(Lt(Zt.g*255,0,255))*256+Math.round(Lt(Zt.b*255,0,255))}getHexString(e=Hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=$e.workingColorSpace){$e.fromWorkingColorSpace(Zt.copy(this),n);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=$e.workingColorSpace){return $e.fromWorkingColorSpace(Zt.copy(this),n),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Hn){$e.fromWorkingColorSpace(Zt.copy(this),e);const n=Zt.r,i=Zt.g,r=Zt.b;return e!==Hn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+n,zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(zi),e.getHSL(Pa);const i=Io(zi.h,Pa.h,n),r=Io(zi.s,Pa.s,n),s=Io(zi.l,Pa.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Ye;Ye.NAMES=Fv;let Ny=0;class na extends kr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=zr(),this.name="",this.type="Material",this.blending=Ss,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vh,this.blendDst=_h,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vr,this.stencilZFail=Vr,this.stencilZPass=Vr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ss&&(i.blending=this.blending),this.side!==Ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vh&&(i.blendSrc=this.blendSrc),this.blendDst!==_h&&(i.blendDst=this.blendDst),this.blendEquation!==_r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class kv extends na{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=Av,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new U,La=new he;class oi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Jp,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)La.fromBufferAttribute(this,n),La.applyMatrix3(e),this.setXY(n,La.x,La.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyMatrix3(e),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyMatrix4(e),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.applyNormalMatrix(e),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Tt.fromBufferAttribute(this,n),Tt.transformDirection(e),this.setXYZ(n,Tt.x,Tt.y,Tt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ns(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ns(n,this.array)),n}setX(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ns(n,this.array)),n}setY(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ns(n,this.array)),n}setZ(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ns(n,this.array)),n}setW(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array),r=en(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jp&&(e.usage=this.usage),e}}class zv extends oi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Bv extends oi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class pt extends oi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let Dy=0;const wn=new at,cu=new Qt,qr=new U,An=new Xs,oo=new Xs,Ot=new U;class Sn extends kr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dy++}),this.uuid=zr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lv(e)?Bv:zv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,n,i){return wn.makeTranslation(e,n,i),this.applyMatrix4(wn),this}scale(e,n,i){return wn.makeScale(e,n,i),this.applyMatrix4(wn),this}lookAt(e){return cu.lookAt(e),cu.updateMatrix(),this.applyMatrix4(cu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];An.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new df);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(An.min,oo.min),An.expandByPoint(Ot),Ot.addVectors(An.max,oo.max),An.expandByPoint(Ot)):(An.expandByPoint(oo.min),An.expandByPoint(oo.max))}An.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ot.fromBufferAttribute(a,c),l&&(qr.fromBufferAttribute(e,c),Ot.add(qr)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<i.count;T++)a[T]=new U,l[T]=new U;const c=new U,h=new U,u=new U,f=new he,p=new he,g=new he,_=new U,m=new U;function d(T,B,x){c.fromBufferAttribute(i,T),h.fromBufferAttribute(i,B),u.fromBufferAttribute(i,x),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,B),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),a[T].add(_),a[B].add(_),a[x].add(_),l[T].add(m),l[B].add(m),l[x].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let T=0,B=A.length;T<B;++T){const x=A[T],I=x.start,N=x.count;for(let F=I,V=I+N;F<V;F+=3)d(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const v=new U,y=new U,P=new U,w=new U;function C(T){P.fromBufferAttribute(r,T),w.copy(P);const B=a[T];v.copy(B),v.sub(P.multiplyScalar(P.dot(B))).normalize(),y.crossVectors(w,B);const I=y.dot(l[T])<0?-1:1;o.setXYZW(T,v.x,v.y,v.z,I)}for(let T=0,B=A.length;T<B;++T){const x=A[T],I=x.start,N=x.count;for(let F=I,V=I+N;F<V;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new oi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new U,s=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ot.fromBufferAttribute(e,n),Ot.normalize(),e.setXYZ(n,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new oi(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Sn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const um=new at,dr=new Uv,Na=new df,hm=new U,Da=new U,Ua=new U,Oa=new U,uu=new U,Fa=new U,dm=new U,ka=new U;class Vt extends Qt{constructor(e=new Sn,n=new kv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Fa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(uu.fromBufferAttribute(u,e),o?Fa.addScaledVector(uu,h):Fa.addScaledVector(uu.sub(n),h))}n.add(Fa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(s),dr.copy(e.ray).recast(e.near),!(Na.containsPoint(dr.origin)===!1&&(dr.intersectSphere(Na,hm)===null||dr.origin.distanceToSquared(hm)>(e.far-e.near)**2))&&(um.copy(s).invert(),dr.copy(e.ray).applyMatrix4(um),!(i.boundingBox!==null&&dr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,dr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=A,P=v;y<P;y+=3){const w=a.getX(y),C=a.getX(y+1),T=a.getX(y+2);r=za(this,d,e,i,c,h,u,w,C,T),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const A=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);r=za(this,o,e,i,c,h,u,A,v,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=A,P=v;y<P;y+=3){const w=y,C=y+1,T=y+2;r=za(this,d,e,i,c,h,u,w,C,T),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const A=m,v=m+1,y=m+2;r=za(this,o,e,i,c,h,u,A,v,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function Uy(t,e,n,i,r,s,o,a){let l;if(e.side===Kt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ri,a),l===null)return null;ka.copy(a),ka.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(ka);return c<n.near||c>n.far?null:{distance:c,point:ka.clone(),object:t}}function za(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Da),t.getVertexPosition(l,Ua),t.getVertexPosition(c,Oa);const h=Uy(t,e,n,i,Da,Ua,Oa,dm);if(h){const u=new U;Xn.getBarycoord(dm,Da,Ua,Oa,u),r&&(h.uv=Xn.getInterpolatedAttribute(r,a,l,c,u,new he)),s&&(h.uv1=Xn.getInterpolatedAttribute(s,a,l,c,u,new he)),o&&(h.normal=Xn.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new U,materialIndex:0};Xn.getNormal(Da,Ua,Oa,f.normal),h.face=f,h.barycoord=u}return h}class ia extends Sn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(_,m,d,A,v,y,P,w,C,T,B){const x=y/C,I=P/T,N=y/2,F=P/2,V=w/2,K=C+1,W=T+1;let Q=0,D=0;const j=new U;for(let J=0;J<W;J++){const ie=J*I-F;for(let re=0;re<K;re++){const Ae=re*x-N;j[_]=Ae*A,j[m]=ie*v,j[d]=V,c.push(j.x,j.y,j.z),j[_]=0,j[m]=0,j[d]=w>0?1:-1,h.push(j.x,j.y,j.z),u.push(re/C),u.push(1-J/T),Q+=1}}for(let J=0;J<T;J++)for(let ie=0;ie<C;ie++){const re=f+ie+K*J,Ae=f+ie+K*(J+1),H=f+(ie+1)+K*(J+1),q=f+(ie+1)+K*J;l.push(re,Ae,q),l.push(Ae,H,q),D+=6}a.addGroup(p,D,B),p+=D,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function tn(t){const e={};for(let n=0;n<t.length;n++){const i=Vs(t[n]);for(const r in i)e[r]=i[r]}return e}function Oy(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Gv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Fy={clone:Vs,merge:tn};var ky=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends na{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ky,this.fragmentShader=zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=Oy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Vv extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=xi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new U,fm=new he,pm=new he;class bn extends Vv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=jo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jo*2*Math.atan(Math.tan(yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,n){return this.getViewBounds(e,fm,pm),n.subVectors(pm,fm)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(yo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const $r=-90,es=1;class By extends Qt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new bn($r,es,e,n);r.layers=this.layers,this.add(r);const s=new bn($r,es,e,n);s.layers=this.layers,this.add(s);const o=new bn($r,es,e,n);o.layers=this.layers,this.add(o);const a=new bn($r,es,e,n);a.layers=this.layers,this.add(a);const l=new bn($r,es,e,n);l.layers=this.layers,this.add(l);const c=new bn($r,es,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===xi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(n,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Hv extends sn{constructor(e,n,i,r,s,o,a,l,c,h){e=e!==void 0?e:[],n=n!==void 0?n:Fs,super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gy extends Nr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Hv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:jn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ia(5,5,5),s=new Pi({name:"CubemapFromEquirect",uniforms:Vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:rr});s.uniforms.tEquirect.value=n;const o=new Vt(r,s),a=n.minFilter;return n.minFilter===Mr&&(n.minFilter=jn),new By(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const hu=new U,Vy=new U,Hy=new He;class Hi{constructor(e=new U(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=hu.subVectors(i,n).cross(Vy.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(hu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Hy.getNormalMatrix(e),r=this.coplanarPoint(hu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fr=new df,Ba=new U;class ff{constructor(e=new Hi,n=new Hi,i=new Hi,r=new Hi,s=new Hi,o=new Hi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=xi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],p=r[8],g=r[9],_=r[10],m=r[11],d=r[12],A=r[13],v=r[14],y=r[15];if(i[0].setComponents(l-s,f-c,m-p,y-d).normalize(),i[1].setComponents(l+s,f+c,m+p,y+d).normalize(),i[2].setComponents(l+o,f+h,m+g,y+A).normalize(),i[3].setComponents(l-o,f-h,m-g,y-A).normalize(),i[4].setComponents(l-a,f-u,m-_,y-v).normalize(),n===xi)i[5].setComponents(l+a,f+u,m+_,y+v).normalize();else if(n===Gl)i[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fr)}intersectsSprite(e){return fr.center.set(0,0,0),fr.radius=.7071067811865476,fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(fr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ba.x=r.normal.x>0?e.max.x:e.min.x,Ba.y=r.normal.y>0?e.max.y:e.min.y,Ba.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ba)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Wy(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(t.bindBuffer(c,a),u.length===0)t.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];t.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class cc extends Sn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,f=n/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const A=d*f-o;for(let v=0;v<c;v++){const y=v*u-s;g.push(y,-A,0),_.push(0,0,1),m.push(v/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){const v=A+c*d,y=A+c*(d+1),P=A+1+c*(d+1),w=A+1+c*d;p.push(v,y,w),p.push(y,P,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cc(e.width,e.height,e.widthSegments,e.heightSegments)}}var jy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xy=`#ifdef USE_ALPHAHASH
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
#endif`,Yy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ky=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qy=`#ifdef USE_AOMAP
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
#endif`,qy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$y=`#ifdef USE_BATCHING
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
#endif`,eI=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tI=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nI=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iI=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rI=`#ifdef USE_IRIDESCENCE
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
#endif`,sI=`#ifdef USE_BUMPMAP
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
#endif`,oI=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,aI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cI=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uI=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fI=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pI=`#define PI 3.141592653589793
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
} // validated`,mI=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gI=`vec3 transformedNormal = objectNormal;
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
#endif`,AI=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vI=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_I=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CI=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xI="gl_FragColor = linearToOutputTexel( gl_FragColor );",yI=`
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
}`,II=`#ifdef USE_ENVMAP
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
#endif`,MI=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,SI=`#ifdef USE_ENVMAP
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
#endif`,EI=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wI=`#ifdef USE_ENVMAP
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
#endif`,TI=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,RI=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bI=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,PI=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,LI=`#ifdef USE_GRADIENTMAP
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
}`,NI=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,DI=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,UI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OI=`uniform bool receiveShadow;
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
#endif`,FI=`#ifdef USE_ENVMAP
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
#endif`,kI=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BI=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VI=`PhysicalMaterial material;
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
#endif`,HI=`struct PhysicalMaterial {
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
}`,WI=`
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
#endif`,jI=`#if defined( RE_IndirectDiffuse )
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
#endif`,XI=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,YI=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ZI=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,JI=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,KI=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,QI=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qI=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$I=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,eM=`#if defined( USE_POINTS_UV )
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
#endif`,tM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oM=`#ifdef USE_MORPHTARGETS
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
#endif`,aM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fM=`#ifdef USE_NORMALMAP
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
#endif`,pM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,AM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_M=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,CM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,IM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,MM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,SM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,EM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,TM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,RM=`float getShadowMask() {
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
}`,bM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,PM=`#ifdef USE_SKINNING
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
#endif`,LM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NM=`#ifdef USE_SKINNING
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
#endif`,DM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,UM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,OM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,FM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kM=`#ifdef USE_TRANSMISSION
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
#endif`,zM=`#ifdef USE_TRANSMISSION
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
#endif`,BM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,GM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jM=`uniform sampler2D t2D;
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
}`,XM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ZM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KM=`#include <common>
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
}`,QM=`#if DEPTH_PACKING == 3200
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
}`,qM=`#define DISTANCE
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
}`,$M=`#define DISTANCE
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
}`,eS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nS=`uniform float scale;
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
}`,iS=`uniform vec3 diffuse;
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
}`,rS=`#include <common>
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
}`,sS=`uniform vec3 diffuse;
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
}`,oS=`#define LAMBERT
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
}`,aS=`#define LAMBERT
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
}`,lS=`#define MATCAP
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
}`,cS=`#define MATCAP
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
}`,uS=`#define NORMAL
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
}`,hS=`#define NORMAL
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
}`,dS=`#define PHONG
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
}`,fS=`#define PHONG
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
}`,pS=`#define STANDARD
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
}`,mS=`#define STANDARD
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
}`,gS=`#define TOON
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
}`,AS=`#define TOON
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
}`,vS=`uniform float size;
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
}`,_S=`uniform vec3 diffuse;
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
}`,CS=`#include <common>
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
}`,xS=`uniform vec3 color;
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
}`,yS=`uniform float rotation;
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
}`,IS=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:jy,alphahash_pars_fragment:Xy,alphamap_fragment:Yy,alphamap_pars_fragment:Zy,alphatest_fragment:Jy,alphatest_pars_fragment:Ky,aomap_fragment:Qy,aomap_pars_fragment:qy,batching_pars_vertex:$y,batching_vertex:eI,begin_vertex:tI,beginnormal_vertex:nI,bsdfs:iI,iridescence_fragment:rI,bumpmap_pars_fragment:sI,clipping_planes_fragment:oI,clipping_planes_pars_fragment:aI,clipping_planes_pars_vertex:lI,clipping_planes_vertex:cI,color_fragment:uI,color_pars_fragment:hI,color_pars_vertex:dI,color_vertex:fI,common:pI,cube_uv_reflection_fragment:mI,defaultnormal_vertex:gI,displacementmap_pars_vertex:AI,displacementmap_vertex:vI,emissivemap_fragment:_I,emissivemap_pars_fragment:CI,colorspace_fragment:xI,colorspace_pars_fragment:yI,envmap_fragment:II,envmap_common_pars_fragment:MI,envmap_pars_fragment:SI,envmap_pars_vertex:EI,envmap_physical_pars_fragment:FI,envmap_vertex:wI,fog_vertex:TI,fog_pars_vertex:RI,fog_fragment:bI,fog_pars_fragment:PI,gradientmap_pars_fragment:LI,lightmap_pars_fragment:NI,lights_lambert_fragment:DI,lights_lambert_pars_fragment:UI,lights_pars_begin:OI,lights_toon_fragment:kI,lights_toon_pars_fragment:zI,lights_phong_fragment:BI,lights_phong_pars_fragment:GI,lights_physical_fragment:VI,lights_physical_pars_fragment:HI,lights_fragment_begin:WI,lights_fragment_maps:jI,lights_fragment_end:XI,logdepthbuf_fragment:YI,logdepthbuf_pars_fragment:ZI,logdepthbuf_pars_vertex:JI,logdepthbuf_vertex:KI,map_fragment:QI,map_pars_fragment:qI,map_particle_fragment:$I,map_particle_pars_fragment:eM,metalnessmap_fragment:tM,metalnessmap_pars_fragment:nM,morphinstance_vertex:iM,morphcolor_vertex:rM,morphnormal_vertex:sM,morphtarget_pars_vertex:oM,morphtarget_vertex:aM,normal_fragment_begin:lM,normal_fragment_maps:cM,normal_pars_fragment:uM,normal_pars_vertex:hM,normal_vertex:dM,normalmap_pars_fragment:fM,clearcoat_normal_fragment_begin:pM,clearcoat_normal_fragment_maps:mM,clearcoat_pars_fragment:gM,iridescence_pars_fragment:AM,opaque_fragment:vM,packing:_M,premultiplied_alpha_fragment:CM,project_vertex:xM,dithering_fragment:yM,dithering_pars_fragment:IM,roughnessmap_fragment:MM,roughnessmap_pars_fragment:SM,shadowmap_pars_fragment:EM,shadowmap_pars_vertex:wM,shadowmap_vertex:TM,shadowmask_pars_fragment:RM,skinbase_vertex:bM,skinning_pars_vertex:PM,skinning_vertex:LM,skinnormal_vertex:NM,specularmap_fragment:DM,specularmap_pars_fragment:UM,tonemapping_fragment:OM,tonemapping_pars_fragment:FM,transmission_fragment:kM,transmission_pars_fragment:zM,uv_pars_fragment:BM,uv_pars_vertex:GM,uv_vertex:VM,worldpos_vertex:HM,background_vert:WM,background_frag:jM,backgroundCube_vert:XM,backgroundCube_frag:YM,cube_vert:ZM,cube_frag:JM,depth_vert:KM,depth_frag:QM,distanceRGBA_vert:qM,distanceRGBA_frag:$M,equirect_vert:eS,equirect_frag:tS,linedashed_vert:nS,linedashed_frag:iS,meshbasic_vert:rS,meshbasic_frag:sS,meshlambert_vert:oS,meshlambert_frag:aS,meshmatcap_vert:lS,meshmatcap_frag:cS,meshnormal_vert:uS,meshnormal_frag:hS,meshphong_vert:dS,meshphong_frag:fS,meshphysical_vert:pS,meshphysical_frag:mS,meshtoon_vert:gS,meshtoon_frag:AS,points_vert:vS,points_frag:_S,shadow_vert:CS,shadow_frag:xS,sprite_vert:yS,sprite_frag:IS},Ce={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ti={basic:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:tn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:tn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:tn([Ce.points,Ce.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:tn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:tn([Ce.common,Ce.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:tn([Ce.sprite,Ce.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:tn([Ce.common,Ce.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:tn([Ce.lights,Ce.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ti.physical={uniforms:tn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Ga={r:0,b:0,g:0},pr=new ai,MS=new at;function SS(t,e,n,i,r,s,o){const a=new Ye(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function g(A){let v=A.isScene===!0?A.background:null;return v&&v.isTexture&&(v=(A.backgroundBlurriness>0?n:e).get(v)),v}function _(A){let v=!1;const y=g(A);y===null?d(a,l):y&&y.isColor&&(d(y,1),v=!0);const P=t.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(A,v){const y=g(v);y&&(y.isCubeTexture||y.mapping===ac)?(h===void 0&&(h=new Vt(new ia(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Vs(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),pr.copy(v.backgroundRotation),pr.x*=-1,pr.y*=-1,pr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(pr.y*=-1,pr.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(MS.makeRotationFromEuler(pr)),h.material.toneMapped=$e.getTransfer(y.colorSpace)!==ht,(u!==y||f!==y.version||p!==t.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,p=t.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Vt(new cc(2,2),new Pi({name:"BackgroundMaterial",uniforms:Vs(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=$e.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,p=t.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function d(A,v){A.getRGB(Ga,Gv(t)),i.buffers.color.setClear(Ga.r,Ga.g,Ga.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(A,v=1){a.set(A),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,d(a,l)},render:_,addToRenderList:m}}function ES(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(x,I,N,F,V){let K=!1;const W=u(F,N,I);s!==W&&(s=W,c(s.object)),K=p(x,F,N,V),K&&g(x,F,N,V),V!==null&&e.update(V,t.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,y(x,I,N,F),V!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return t.createVertexArray()}function c(x){return t.bindVertexArray(x)}function h(x){return t.deleteVertexArray(x)}function u(x,I,N){const F=N.wireframe===!0;let V=i[x.id];V===void 0&&(V={},i[x.id]=V);let K=V[I.id];K===void 0&&(K={},V[I.id]=K);let W=K[F];return W===void 0&&(W=f(l()),K[F]=W),W}function f(x){const I=[],N=[],F=[];for(let V=0;V<n;V++)I[V]=0,N[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:F,object:x,attributes:{},index:null}}function p(x,I,N,F){const V=s.attributes,K=I.attributes;let W=0;const Q=N.getAttributes();for(const D in Q)if(Q[D].location>=0){const J=V[D];let ie=K[D];if(ie===void 0&&(D==="instanceMatrix"&&x.instanceMatrix&&(ie=x.instanceMatrix),D==="instanceColor"&&x.instanceColor&&(ie=x.instanceColor)),J===void 0||J.attribute!==ie||ie&&J.data!==ie.data)return!0;W++}return s.attributesNum!==W||s.index!==F}function g(x,I,N,F){const V={},K=I.attributes;let W=0;const Q=N.getAttributes();for(const D in Q)if(Q[D].location>=0){let J=K[D];J===void 0&&(D==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),D==="instanceColor"&&x.instanceColor&&(J=x.instanceColor));const ie={};ie.attribute=J,J&&J.data&&(ie.data=J.data),V[D]=ie,W++}s.attributes=V,s.attributesNum=W,s.index=F}function _(){const x=s.newAttributes;for(let I=0,N=x.length;I<N;I++)x[I]=0}function m(x){d(x,0)}function d(x,I){const N=s.newAttributes,F=s.enabledAttributes,V=s.attributeDivisors;N[x]=1,F[x]===0&&(t.enableVertexAttribArray(x),F[x]=1),V[x]!==I&&(t.vertexAttribDivisor(x,I),V[x]=I)}function A(){const x=s.newAttributes,I=s.enabledAttributes;for(let N=0,F=I.length;N<F;N++)I[N]!==x[N]&&(t.disableVertexAttribArray(N),I[N]=0)}function v(x,I,N,F,V,K,W){W===!0?t.vertexAttribIPointer(x,I,N,V,K):t.vertexAttribPointer(x,I,N,F,V,K)}function y(x,I,N,F){_();const V=F.attributes,K=N.getAttributes(),W=I.defaultAttributeValues;for(const Q in K){const D=K[Q];if(D.location>=0){let j=V[Q];if(j===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(j=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(j=x.instanceColor)),j!==void 0){const J=j.normalized,ie=j.itemSize,re=e.get(j);if(re===void 0)continue;const Ae=re.buffer,H=re.type,q=re.bytesPerElement,ae=H===t.INT||H===t.UNSIGNED_INT||j.gpuType===rf;if(j.isInterleavedBufferAttribute){const le=j.data,Ue=le.stride,be=j.offset;if(le.isInstancedInterleavedBuffer){for(let Oe=0;Oe<D.locationSize;Oe++)d(D.location+Oe,le.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Oe=0;Oe<D.locationSize;Oe++)m(D.location+Oe);t.bindBuffer(t.ARRAY_BUFFER,Ae);for(let Oe=0;Oe<D.locationSize;Oe++)v(D.location+Oe,ie/D.locationSize,H,J,Ue*q,(be+ie/D.locationSize*Oe)*q,ae)}else{if(j.isInstancedBufferAttribute){for(let le=0;le<D.locationSize;le++)d(D.location+le,j.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let le=0;le<D.locationSize;le++)m(D.location+le);t.bindBuffer(t.ARRAY_BUFFER,Ae);for(let le=0;le<D.locationSize;le++)v(D.location+le,ie/D.locationSize,H,J,ie*q,ie/D.locationSize*le*q,ae)}}else if(W!==void 0){const J=W[Q];if(J!==void 0)switch(J.length){case 2:t.vertexAttrib2fv(D.location,J);break;case 3:t.vertexAttrib3fv(D.location,J);break;case 4:t.vertexAttrib4fv(D.location,J);break;default:t.vertexAttrib1fv(D.location,J)}}}}A()}function P(){T();for(const x in i){const I=i[x];for(const N in I){const F=I[N];for(const V in F)h(F[V].object),delete F[V];delete I[N]}delete i[x]}}function w(x){if(i[x.id]===void 0)return;const I=i[x.id];for(const N in I){const F=I[N];for(const V in F)h(F[V].object),delete F[V];delete I[N]}delete i[x.id]}function C(x){for(const I in i){const N=i[I];if(N[x.id]===void 0)continue;const F=N[x.id];for(const V in F)h(F[V].object),delete F[V];delete N[x.id]}}function T(){B(),o=!0,s!==r&&(s=r,c(s.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:B,dispose:P,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function wS(t,e,n){let i;function r(c){i=c}function s(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,u){u!==0&&(t.drawArraysInstanced(i,c,h,u),n.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];n.update(p,i,1)}function l(c,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<f.length;_++)n.update(g,i,f[_])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function TS(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Yn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const T=C===ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==bi&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Ci&&!T)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const C=e.get("EXT_clip_control");C.clipControlEXT(C.LOWER_LEFT_EXT,C.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),A=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,w=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:P,maxSamples:w}}function RS(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Hi,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||r;return r=f,i=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){n=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=t.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const A=s?0:i,v=A*4;let y=d.clippingState||null;l.value=y,y=h(g,f,v,p);for(let P=0;P!==v;++P)y[P]=n[P];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,y=p;v!==_;++v,y+=4)o.copy(u[v]).applyMatrix4(A,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function bS(t){let e=new WeakMap;function n(o,a){return a===wh?o.mapping=Fs:a===Th&&(o.mapping=ks),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===wh||a===Th)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Gy(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class jv extends Vv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const gs=4,mm=[.125,.215,.35,.446,.526,.582],Cr=20,du=new jv,gm=new Ye;let fu=null,pu=0,mu=0,gu=!1;const vr=(1+Math.sqrt(5))/2,ts=1/vr,Am=[new U(-vr,ts,0),new U(vr,ts,0),new U(-ts,0,vr),new U(ts,0,vr),new U(0,vr,-ts),new U(0,vr,ts),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class vm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){fu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fu,pu,mu),this._renderer.xr.enabled=gu,e.scissorTest=!1,Va(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Fs||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:ta,format:Yn,colorSpace:Qn,depthBuffer:!1},r=_m(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_m(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=PS(s)),this._blurMaterial=LS(s,e,n)}return r}_compileMaterial(e){const n=new Vt(this._lodPlanes[0],e);this._renderer.compile(n,du)}_sceneToCubeUV(e,n,i,r){const a=new bn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(gm),h.toneMapping=Mi,h.autoClear=!1;const p=new kv({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),g=new Vt(new ia,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(gm),_=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):A===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const v=this._cubeSize;Va(r,A*v,d>2?v:0,v,v),h.setRenderTarget(r),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Fs||e.mapping===ks;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Vt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Va(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,du)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Am[(r-s-1)%Am.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Vt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Cr-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Cr;m>Cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Cr}`);const d=[];let A=0;for(let C=0;C<Cr;++C){const T=C/_,B=Math.exp(-T*T/2);d.push(B),C===0?A+=B:C<m&&(A+=2*B)}for(let C=0;C<d.length;C++)d[C]=d[C]/A;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const y=this._sizeLods[r],P=3*y*(r>v-gs?r-v+gs:0),w=4*(this._cubeSize-y);Va(n,P,w,3*y,2*y),l.setRenderTarget(n),l.render(u,du)}}function PS(t){const e=[],n=[],i=[];let r=t;const s=t-gs+1+mm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-gs?l=mm[o-t+gs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,A=new Float32Array(_*g*p),v=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,T=w>2?0:-1,B=[C,T,0,C+2/3,T,0,C+2/3,T+1,0,C,T,0,C+2/3,T+1,0,C,T+1,0];A.set(B,_*g*w),v.set(f,m*g*w);const x=[w,w,w,w,w,w];y.set(x,d*g*w)}const P=new Sn;P.setAttribute("position",new oi(A,_)),P.setAttribute("uv",new oi(v,m)),P.setAttribute("faceIndex",new oi(y,d)),e.push(P),r>gs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function _m(t,e,n){const i=new Nr(t,e,n);return i.texture.mapping=ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Va(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function LS(t,e,n){const i=new Float32Array(Cr),r=new U(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pf(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})}function Cm(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pf(),fragmentShader:`

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
		`,blending:rr,depthTest:!1,depthWrite:!1})}function xm(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:rr,depthTest:!1,depthWrite:!1})}function pf(){return`

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
	`}function NS(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===wh||l===Th,h=l===Fs||l===ks;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new vm(t)),u=c?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(n===null&&(n=new vm(t)),u=c?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function DS(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&hl("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function US(t,e,n,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],t.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],t.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const A=p.array;_=p.version;for(let v=0,y=A.length;v<y;v+=3){const P=A[v+0],w=A[v+1],C=A[v+2];f.push(P,w,w,C,C,P)}}else if(g!==void 0){const A=g.array;_=g.version;for(let v=0,y=A.length/3-1;v<y;v+=3){const P=v+0,w=v+1,C=v+2;f.push(P,w,w,C,C,P)}}else return;const m=new(Lv(f)?Bv:zv)(f,1);m.version=_;const d=s.get(u);d&&e.remove(d),s.set(u,m)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function OS(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,f*o,g),n.update(p,i,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];n.update(m,i,1)}function u(f,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,_,0,g);let d=0;for(let A=0;A<g;A++)d+=p[A];for(let A=0;A<_.length;A++)n.update(d,i,_[A])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function FS(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function kS(t,e,n){const i=new WeakMap,r=new St;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let x=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var p=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let P=a.attributes.position.count*y,w=1;P>e.maxTextureSize&&(w=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const C=new Float32Array(P*w*4*u),T=new Dv(C,P,w,u);T.type=Ci,T.needsUpdate=!0;const B=y*4;for(let I=0;I<u;I++){const N=d[I],F=A[I],V=v[I],K=P*w*4*I;for(let W=0;W<N.count;W++){const Q=W*B;g===!0&&(r.fromBufferAttribute(N,W),C[K+Q+0]=r.x,C[K+Q+1]=r.y,C[K+Q+2]=r.z,C[K+Q+3]=0),_===!0&&(r.fromBufferAttribute(F,W),C[K+Q+4]=r.x,C[K+Q+5]=r.y,C[K+Q+6]=r.z,C[K+Q+7]=0),m===!0&&(r.fromBufferAttribute(V,W),C[K+Q+8]=r.x,C[K+Q+9]=r.y,C[K+Q+10]=r.z,C[K+Q+11]=V.itemSize===4?r.w:1)}}f={count:u,texture:T,size:new he(P,w)},i.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function zS(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Xv extends sn{constructor(e,n,i,r,s,o,a,l,c,h=Es){if(h!==Es&&h!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Es&&(i=Lr),i===void 0&&h===Gs&&(i=Bs),super(null,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Ln,this.minFilter=l!==void 0?l:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Yv=new sn,ym=new Xv(1,1),Zv=new Dv,Jv=new Sy,Kv=new Hv,Im=[],Mm=[],Sm=new Float32Array(16),Em=new Float32Array(9),wm=new Float32Array(4);function Ys(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Im[r];if(s===void 0&&(s=new Float32Array(r),Im[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Dt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function uc(t,e){let n=Mm[e];n===void 0&&(n=new Int32Array(e),Mm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function BS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function GS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function VS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Dt(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function HS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function WS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;wm.set(i),t.uniformMatrix2fv(this.addr,!1,wm),Ut(n,i)}}function jS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;Em.set(i),t.uniformMatrix3fv(this.addr,!1,Em),Ut(n,i)}}function XS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(Dt(n,i))return;Sm.set(i),t.uniformMatrix4fv(this.addr,!1,Sm),Ut(n,i)}}function YS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function ZS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function JS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function KS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function QS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function qS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function $S(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function eE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function tE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(ym.compareFunction=bv,s=ym):s=Yv,n.setTexture2D(e||s,r)}function nE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Jv,r)}function iE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Kv,r)}function rE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Zv,r)}function sE(t){switch(t){case 5126:return BS;case 35664:return GS;case 35665:return VS;case 35666:return HS;case 35674:return WS;case 35675:return jS;case 35676:return XS;case 5124:case 35670:return YS;case 35667:case 35671:return ZS;case 35668:case 35672:return JS;case 35669:case 35673:return KS;case 5125:return QS;case 36294:return qS;case 36295:return $S;case 36296:return eE;case 35678:case 36198:case 36298:case 36306:case 35682:return tE;case 35679:case 36299:case 36307:return nE;case 35680:case 36300:case 36308:case 36293:return iE;case 36289:case 36303:case 36311:case 36292:return rE}}function oE(t,e){t.uniform1fv(this.addr,e)}function aE(t,e){const n=Ys(e,this.size,2);t.uniform2fv(this.addr,n)}function lE(t,e){const n=Ys(e,this.size,3);t.uniform3fv(this.addr,n)}function cE(t,e){const n=Ys(e,this.size,4);t.uniform4fv(this.addr,n)}function uE(t,e){const n=Ys(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function hE(t,e){const n=Ys(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function dE(t,e){const n=Ys(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function fE(t,e){t.uniform1iv(this.addr,e)}function pE(t,e){t.uniform2iv(this.addr,e)}function mE(t,e){t.uniform3iv(this.addr,e)}function gE(t,e){t.uniform4iv(this.addr,e)}function AE(t,e){t.uniform1uiv(this.addr,e)}function vE(t,e){t.uniform2uiv(this.addr,e)}function _E(t,e){t.uniform3uiv(this.addr,e)}function CE(t,e){t.uniform4uiv(this.addr,e)}function xE(t,e,n){const i=this.cache,r=e.length,s=uc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Yv,s[o])}function yE(t,e,n){const i=this.cache,r=e.length,s=uc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Jv,s[o])}function IE(t,e,n){const i=this.cache,r=e.length,s=uc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Kv,s[o])}function ME(t,e,n){const i=this.cache,r=e.length,s=uc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Zv,s[o])}function SE(t){switch(t){case 5126:return oE;case 35664:return aE;case 35665:return lE;case 35666:return cE;case 35674:return uE;case 35675:return hE;case 35676:return dE;case 5124:case 35670:return fE;case 35667:case 35671:return pE;case 35668:case 35672:return mE;case 35669:case 35673:return gE;case 5125:return AE;case 36294:return vE;case 36295:return _E;case 36296:return CE;case 35678:case 36198:case 36298:case 36306:case 35682:return xE;case 35679:case 36299:case 36307:return yE;case 35680:case 36300:case 36308:case 36293:return IE;case 36289:case 36303:case 36311:case 36292:return ME}}class EE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=sE(n.type)}}class wE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=SE(n.type)}}class TE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Au=/(\w+)(\])?(\[|\.)?/g;function Tm(t,e){t.seq.push(e),t.map[e.id]=e}function RE(t,e,n){const i=t.name,r=i.length;for(Au.lastIndex=0;;){const s=Au.exec(i),o=Au.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Tm(n,c===void 0?new EE(a,t,e):new wE(a,t,e));break}else{let u=n.map[a];u===void 0&&(u=new TE(a),Tm(n,u)),n=u}}}class dl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);RE(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Rm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const bE=37297;let PE=0;function LE(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function NE(t){const e=$e.getPrimaries($e.workingColorSpace),n=$e.getPrimaries(t);let i;switch(e===n?i="":e===Bl&&n===zl?i="LinearDisplayP3ToLinearSRGB":e===zl&&n===Bl&&(i="LinearSRGBToLinearDisplayP3"),t){case Qn:case lc:return[i,"LinearTransferOETF"];case Hn:case uf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function bm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+LE(t.getShaderSource(e),o)}else return r}function DE(t,e){const n=NE(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function UE(t,e){let n;switch(e){case Ox:n="Linear";break;case Fx:n="Reinhard";break;case kx:n="Cineon";break;case zx:n="ACESFilmic";break;case Gx:n="AgX";break;case Vx:n="Neutral";break;case Bx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ha=new U;function OE(){$e.getLuminanceCoefficients(Ha);const t=Ha.x.toFixed(4),e=Ha.y.toFixed(4),n=Ha.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function FE(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function kE(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function zE(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ho(t){return t!==""}function Pm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const BE=/^[ \t]*#include +<([\w\d./]+)>/gm;function td(t){return t.replace(BE,VE)}const GE=new Map;function VE(t,e){let n=Xe[e];if(n===void 0){const i=GE.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return td(n)}const HE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nm(t){return t.replace(HE,WE)}function WE(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dm(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function jE(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===gv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===mx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===mi&&(e="SHADOWMAP_TYPE_VSM"),e}function XE(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Fs:case ks:e="ENVMAP_TYPE_CUBE";break;case ac:e="ENVMAP_TYPE_CUBE_UV";break}return e}function YE(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case ks:e="ENVMAP_MODE_REFRACTION";break}return e}function ZE(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Av:e="ENVMAP_BLENDING_MULTIPLY";break;case Dx:e="ENVMAP_BLENDING_MIX";break;case Ux:e="ENVMAP_BLENDING_ADD";break}return e}function JE(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function KE(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=jE(n),c=XE(n),h=YE(n),u=ZE(n),f=JE(n),p=FE(n),g=kE(s),_=r.createProgram();let m,d,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ho).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ho).join(`
`),d.length>0&&(d+=`
`)):(m=[Dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),d=[Dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Mi?"#define TONE_MAPPING":"",n.toneMapping!==Mi?Xe.tonemapping_pars_fragment:"",n.toneMapping!==Mi?UE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,DE("linearToOutputTexel",n.outputColorSpace),OE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ho).join(`
`)),o=td(o),o=Pm(o,n),o=Lm(o,n),a=td(a),a=Pm(a,n),a=Lm(a,n),o=Nm(o),a=Nm(a),n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===Kp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Kp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=A+m+o,y=A+d+a,P=Rm(r,r.VERTEX_SHADER,v),w=Rm(r,r.FRAGMENT_SHADER,y);r.attachShader(_,P),r.attachShader(_,w),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(I){if(t.debug.checkShaderErrors){const N=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(P).trim(),V=r.getShaderInfoLog(w).trim();let K=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(K=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,P,w);else{const Q=bm(r,P,"vertex"),D=bm(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+Q+`
`+D)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(F===""||V==="")&&(W=!1);W&&(I.diagnostics={runnable:K,programLog:N,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:d}})}r.deleteShader(P),r.deleteShader(w),T=new dl(r,_),B=zE(r,_)}let T;this.getUniforms=function(){return T===void 0&&C(this),T};let B;this.getAttributes=function(){return B===void 0&&C(this),B};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,bE)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=PE++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=w,this}let QE=0;class qE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new $E(e),n.set(e,i)),i}}class $E{constructor(e){this.id=QE++,this.code=e,this.usedTimes=0}}function ew(t,e,n,i,r,s,o){const a=new Ov,l=new qE,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let g=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function d(x,I,N,F,V){const K=F.fog,W=V.geometry,Q=x.isMeshStandardMaterial?F.environment:null,D=(x.isMeshStandardMaterial?n:e).get(x.envMap||Q),j=D&&D.mapping===ac?D.image.height:null,J=_[x.type];x.precision!==null&&(g=r.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,re=ie!==void 0?ie.length:0;let Ae=0;W.morphAttributes.position!==void 0&&(Ae=1),W.morphAttributes.normal!==void 0&&(Ae=2),W.morphAttributes.color!==void 0&&(Ae=3);let H,q,ae,le;if(J){const ot=ti[J];H=ot.vertexShader,q=ot.fragmentShader}else H=x.vertexShader,q=x.fragmentShader,l.update(x),ae=l.getVertexShaderID(x),le=l.getFragmentShaderID(x);const Ue=t.getRenderTarget(),be=V.isInstancedMesh===!0,Oe=V.isBatchedMesh===!0,je=!!x.map,ne=!!x.matcap,b=!!D,ge=!!x.aoMap,pe=!!x.lightMap,ce=!!x.bumpMap,ve=!!x.normalMap,Pe=!!x.displacementMap,xe=!!x.emissiveMap,R=!!x.metalnessMap,M=!!x.roughnessMap,X=x.anisotropy>0,$=x.clearcoat>0,oe=x.dispersion>0,ee=x.iridescence>0,Te=x.sheen>0,_e=x.transmission>0,Me=X&&!!x.anisotropyMap,Je=$&&!!x.clearcoatMap,de=$&&!!x.clearcoatNormalMap,Se=$&&!!x.clearcoatRoughnessMap,Fe=ee&&!!x.iridescenceMap,ke=ee&&!!x.iridescenceThicknessMap,Ee=Te&&!!x.sheenColorMap,Ke=Te&&!!x.sheenRoughnessMap,Be=!!x.specularMap,rt=!!x.specularColorMap,O=!!x.specularIntensityMap,ye=_e&&!!x.transmissionMap,L=_e&&!!x.thicknessMap,k=!!x.gradientMap,te=!!x.alphaMap,fe=x.alphaTest>0,We=!!x.alphaHash,Qe=!!x.extensions;let Ct=Mi;x.toneMapped&&(Ue===null||Ue.isXRRenderTarget===!0)&&(Ct=t.toneMapping);const Ge={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:H,fragmentShader:q,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:le,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:Oe,batchingColor:Oe&&V._colorsTexture!==null,instancing:be,instancingColor:be&&V.instanceColor!==null,instancingMorph:be&&V.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Ue===null?t.outputColorSpace:Ue.isXRRenderTarget===!0?Ue.texture.colorSpace:Qn,alphaToCoverage:!!x.alphaToCoverage,map:je,matcap:ne,envMap:b,envMapMode:b&&D.mapping,envMapCubeUVHeight:j,aoMap:ge,lightMap:pe,bumpMap:ce,normalMap:ve,displacementMap:p&&Pe,emissiveMap:xe,normalMapObjectSpace:ve&&x.normalMapType===Xx,normalMapTangentSpace:ve&&x.normalMapType===Rv,metalnessMap:R,roughnessMap:M,anisotropy:X,anisotropyMap:Me,clearcoat:$,clearcoatMap:Je,clearcoatNormalMap:de,clearcoatRoughnessMap:Se,dispersion:oe,iridescence:ee,iridescenceMap:Fe,iridescenceThicknessMap:ke,sheen:Te,sheenColorMap:Ee,sheenRoughnessMap:Ke,specularMap:Be,specularColorMap:rt,specularIntensityMap:O,transmission:_e,transmissionMap:ye,thicknessMap:L,gradientMap:k,opaque:x.transparent===!1&&x.blending===Ss&&x.alphaToCoverage===!1,alphaMap:te,alphaTest:fe,alphaHash:We,combine:x.combine,mapUv:je&&m(x.map.channel),aoMapUv:ge&&m(x.aoMap.channel),lightMapUv:pe&&m(x.lightMap.channel),bumpMapUv:ce&&m(x.bumpMap.channel),normalMapUv:ve&&m(x.normalMap.channel),displacementMapUv:Pe&&m(x.displacementMap.channel),emissiveMapUv:xe&&m(x.emissiveMap.channel),metalnessMapUv:R&&m(x.metalnessMap.channel),roughnessMapUv:M&&m(x.roughnessMap.channel),anisotropyMapUv:Me&&m(x.anisotropyMap.channel),clearcoatMapUv:Je&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&m(x.sheenRoughnessMap.channel),specularMapUv:Be&&m(x.specularMap.channel),specularColorMapUv:rt&&m(x.specularColorMap.channel),specularIntensityMapUv:O&&m(x.specularIntensityMap.channel),transmissionMapUv:ye&&m(x.transmissionMap.channel),thicknessMapUv:L&&m(x.thicknessMap.channel),alphaMapUv:te&&m(x.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ve||X),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!W.attributes.uv&&(je||te),fog:!!K,useFog:x.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:V.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Ae,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ct,decodeVideoTexture:je&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===ht,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===_n,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Qe&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qe&&x.extensions.multiDraw===!0||Oe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function A(x){const I=[];if(x.shaderID?I.push(x.shaderID):(I.push(x.customVertexShaderID),I.push(x.customFragmentShaderID)),x.defines!==void 0)for(const N in x.defines)I.push(N),I.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(v(I,x),y(I,x),I.push(t.outputColorSpace)),I.push(x.customProgramCacheKey),I.join()}function v(x,I){x.push(I.precision),x.push(I.outputColorSpace),x.push(I.envMapMode),x.push(I.envMapCubeUVHeight),x.push(I.mapUv),x.push(I.alphaMapUv),x.push(I.lightMapUv),x.push(I.aoMapUv),x.push(I.bumpMapUv),x.push(I.normalMapUv),x.push(I.displacementMapUv),x.push(I.emissiveMapUv),x.push(I.metalnessMapUv),x.push(I.roughnessMapUv),x.push(I.anisotropyMapUv),x.push(I.clearcoatMapUv),x.push(I.clearcoatNormalMapUv),x.push(I.clearcoatRoughnessMapUv),x.push(I.iridescenceMapUv),x.push(I.iridescenceThicknessMapUv),x.push(I.sheenColorMapUv),x.push(I.sheenRoughnessMapUv),x.push(I.specularMapUv),x.push(I.specularColorMapUv),x.push(I.specularIntensityMapUv),x.push(I.transmissionMapUv),x.push(I.thicknessMapUv),x.push(I.combine),x.push(I.fogExp2),x.push(I.sizeAttenuation),x.push(I.morphTargetsCount),x.push(I.morphAttributeCount),x.push(I.numDirLights),x.push(I.numPointLights),x.push(I.numSpotLights),x.push(I.numSpotLightMaps),x.push(I.numHemiLights),x.push(I.numRectAreaLights),x.push(I.numDirLightShadows),x.push(I.numPointLightShadows),x.push(I.numSpotLightShadows),x.push(I.numSpotLightShadowsWithMaps),x.push(I.numLightProbes),x.push(I.shadowMapType),x.push(I.toneMapping),x.push(I.numClippingPlanes),x.push(I.numClipIntersection),x.push(I.depthPacking)}function y(x,I){a.disableAll(),I.supportsVertexTextures&&a.enable(0),I.instancing&&a.enable(1),I.instancingColor&&a.enable(2),I.instancingMorph&&a.enable(3),I.matcap&&a.enable(4),I.envMap&&a.enable(5),I.normalMapObjectSpace&&a.enable(6),I.normalMapTangentSpace&&a.enable(7),I.clearcoat&&a.enable(8),I.iridescence&&a.enable(9),I.alphaTest&&a.enable(10),I.vertexColors&&a.enable(11),I.vertexAlphas&&a.enable(12),I.vertexUv1s&&a.enable(13),I.vertexUv2s&&a.enable(14),I.vertexUv3s&&a.enable(15),I.vertexTangents&&a.enable(16),I.anisotropy&&a.enable(17),I.alphaHash&&a.enable(18),I.batching&&a.enable(19),I.dispersion&&a.enable(20),I.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),I.fog&&a.enable(0),I.useFog&&a.enable(1),I.flatShading&&a.enable(2),I.logarithmicDepthBuffer&&a.enable(3),I.reverseDepthBuffer&&a.enable(4),I.skinning&&a.enable(5),I.morphTargets&&a.enable(6),I.morphNormals&&a.enable(7),I.morphColors&&a.enable(8),I.premultipliedAlpha&&a.enable(9),I.shadowMapEnabled&&a.enable(10),I.doubleSided&&a.enable(11),I.flipSided&&a.enable(12),I.useDepthPacking&&a.enable(13),I.dithering&&a.enable(14),I.transmission&&a.enable(15),I.sheen&&a.enable(16),I.opaque&&a.enable(17),I.pointsUvs&&a.enable(18),I.decodeVideoTexture&&a.enable(19),I.alphaToCoverage&&a.enable(20),x.push(a.mask)}function P(x){const I=_[x.type];let N;if(I){const F=ti[I];N=Fy.clone(F.uniforms)}else N=x.uniforms;return N}function w(x,I){let N;for(let F=0,V=h.length;F<V;F++){const K=h[F];if(K.cacheKey===I){N=K,++N.usedTimes;break}}return N===void 0&&(N=new KE(t,I,x,s),h.push(N)),N}function C(x){if(--x.usedTimes===0){const I=h.indexOf(x);h[I]=h[h.length-1],h.pop(),x.destroy()}}function T(x){l.remove(x)}function B(){l.dispose()}return{getParameters:d,getProgramCacheKey:A,getUniforms:P,acquireProgram:w,releaseProgram:C,releaseShaderCache:T,programs:h,dispose:B}}function tw(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function nw(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Um(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Om(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(u,f,p,g,_,m){let d=t[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},t[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),e++,d}function a(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(u,f){n.length>1&&n.sort(u||nw),i.length>1&&i.sort(f||Um),r.length>1&&r.sort(f||Um)}function h(){for(let u=e,f=t.length;u<f;u++){const p=t[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function iw(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Om,t.set(i,[o])):r>=s.length?(o=new Om,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function rw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new U,color:new Ye};break;case"SpotLight":n={position:new U,direction:new U,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":n={color:new Ye,position:new U,halfWidth:new U,halfHeight:new U};break}return t[e.id]=n,n}}}function sw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let ow=0;function aw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function lw(t){const e=new rw,n=sw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const r=new U,s=new at,o=new at;function a(c){let h=0,u=0,f=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,A=0,v=0,y=0,P=0,w=0,C=0;c.sort(aw);for(let B=0,x=c.length;B<x;B++){const I=c[B],N=I.color,F=I.intensity,V=I.distance,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=N.r*F,u+=N.g*F,f+=N.b*F;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],F);C++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,D=n.get(I);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=K,i.directionalShadowMatrix[p]=I.shadow.matrix,A++}i.directional[p]=W,p++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(N).multiplyScalar(F),W.distance=V,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[_]=W;const Q=I.shadow;if(I.map&&(i.spotLightMap[P]=I.map,P++,Q.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[_]=Q.matrix,I.castShadow){const D=n.get(I);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,i.spotShadow[_]=D,i.spotShadowMap[_]=K,y++}_++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(N).multiplyScalar(F),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=W,m++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const Q=I.shadow,D=n.get(I);D.shadowIntensity=Q.intensity,D.shadowBias=Q.bias,D.shadowNormalBias=Q.normalBias,D.shadowRadius=Q.radius,D.shadowMapSize=Q.mapSize,D.shadowCameraNear=Q.camera.near,D.shadowCameraFar=Q.camera.far,i.pointShadow[g]=D,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=I.shadow.matrix,v++}i.point[g]=W,g++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(F),W.groundColor.copy(I.groundColor).multiplyScalar(F),i.hemi[d]=W,d++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ce.LTC_FLOAT_1,i.rectAreaLTC2=Ce.LTC_FLOAT_2):(i.rectAreaLTC1=Ce.LTC_HALF_1,i.rectAreaLTC2=Ce.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const T=i.hash;(T.directionalLength!==p||T.pointLength!==g||T.spotLength!==_||T.rectAreaLength!==m||T.hemiLength!==d||T.numDirectionalShadows!==A||T.numPointShadows!==v||T.numSpotShadows!==y||T.numSpotMaps!==P||T.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+P-w,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,T.directionalLength=p,T.pointLength=g,T.spotLength=_,T.rectAreaLength=m,T.hemiLength=d,T.numDirectionalShadows=A,T.numPointShadows=v,T.numSpotShadows=y,T.numSpotMaps=P,T.numLightProbes=C,i.version=ow++)}function l(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){const v=c[d];if(v.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),u++}else if(v.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Fm(t){const e=new lw(t),n=[],i=[];function r(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function o(h){i.push(h)}function a(){e.setup(n)}function l(h){e.setupView(n,h)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function cw(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Fm(t),e.set(r,[a])):s>=o.length?(a=new Fm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class uw extends na{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hw extends na{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fw=`uniform sampler2D shadow_pass;
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
}`;function pw(t,e,n){let i=new ff;const r=new he,s=new he,o=new St,a=new uw({depthPacking:jx}),l=new hw,c={},h=n.maxTextureSize,u={[Ri]:Kt,[Kt]:Ri,[_n]:_n},f=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:dw,fragmentShader:fw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Sn;g.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Vt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gv;let d=this.type;this.render=function(w,C,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const B=t.getRenderTarget(),x=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),N=t.state;N.setBlending(rr),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const F=d!==mi&&this.type===mi,V=d===mi&&this.type!==mi;for(let K=0,W=w.length;K<W;K++){const Q=w[K],D=Q.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const j=D.getFrameExtents();if(r.multiply(j),s.copy(D.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/j.x),r.x=s.x*j.x,D.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/j.y),r.y=s.y*j.y,D.mapSize.y=s.y)),D.map===null||F===!0||V===!0){const ie=this.type!==mi?{minFilter:Ln,magFilter:Ln}:{};D.map!==null&&D.map.dispose(),D.map=new Nr(r.x,r.y,ie),D.map.texture.name=Q.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const J=D.getViewportCount();for(let ie=0;ie<J;ie++){const re=D.getViewport(ie);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),N.viewport(o),D.updateMatrices(Q,ie),i=D.getFrustum(),y(C,T,D.camera,Q,this.type)}D.isPointLightShadow!==!0&&this.type===mi&&A(D,T),D.needsUpdate=!1}d=this.type,m.needsUpdate=!1,t.setRenderTarget(B,x,I)};function A(w,C){const T=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Nr(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(C,null,T,f,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(C,null,T,p,_,null)}function v(w,C,T,B){let x=null;const I=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)x=I;else if(x=T.isPointLight===!0?l:a,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const N=x.uuid,F=C.uuid;let V=c[N];V===void 0&&(V={},c[N]=V);let K=V[F];K===void 0&&(K=x.clone(),V[F]=K,C.addEventListener("dispose",P)),x=K}if(x.visible=C.visible,x.wireframe=C.wireframe,B===mi?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const N=t.properties.get(x);N.light=T}return x}function y(w,C,T,B,x){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===mi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);const F=e.update(w),V=w.material;if(Array.isArray(V)){const K=F.groups;for(let W=0,Q=K.length;W<Q;W++){const D=K[W],j=V[D.materialIndex];if(j&&j.visible){const J=v(w,j,B,x);w.onBeforeShadow(t,w,C,T,F,J,D),t.renderBufferDirect(T,null,F,J,w,D),w.onAfterShadow(t,w,C,T,F,J,D)}}}else if(V.visible){const K=v(w,V,B,x);w.onBeforeShadow(t,w,C,T,F,K,null),t.renderBufferDirect(T,null,F,K,w,null),w.onAfterShadow(t,w,C,T,F,K,null)}}const N=w.children;for(let F=0,V=N.length;F<V;F++)y(N[F],C,T,B,x)}function P(w){w.target.removeEventListener("dispose",P);for(const T in c){const B=c[T],x=w.target.uuid;x in B&&(B[x].dispose(),delete B[x])}}}const mw={[Ch]:xh,[yh]:Sh,[Ih]:Eh,[Os]:Mh,[xh]:Ch,[Sh]:yh,[Eh]:Ih,[Mh]:Os};function gw(t){function e(){let O=!1;const ye=new St;let L=null;const k=new St(0,0,0,0);return{setMask:function(te){L!==te&&!O&&(t.colorMask(te,te,te,te),L=te)},setLocked:function(te){O=te},setClear:function(te,fe,We,Qe,Ct){Ct===!0&&(te*=Qe,fe*=Qe,We*=Qe),ye.set(te,fe,We,Qe),k.equals(ye)===!1&&(t.clearColor(te,fe,We,Qe),k.copy(ye))},reset:function(){O=!1,L=null,k.set(-1,0,0,0)}}}function n(){let O=!1,ye=!1,L=null,k=null,te=null;return{setReversed:function(fe){ye=fe},setTest:function(fe){fe?ae(t.DEPTH_TEST):le(t.DEPTH_TEST)},setMask:function(fe){L!==fe&&!O&&(t.depthMask(fe),L=fe)},setFunc:function(fe){if(ye&&(fe=mw[fe]),k!==fe){switch(fe){case Ch:t.depthFunc(t.NEVER);break;case xh:t.depthFunc(t.ALWAYS);break;case yh:t.depthFunc(t.LESS);break;case Os:t.depthFunc(t.LEQUAL);break;case Ih:t.depthFunc(t.EQUAL);break;case Mh:t.depthFunc(t.GEQUAL);break;case Sh:t.depthFunc(t.GREATER);break;case Eh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}k=fe}},setLocked:function(fe){O=fe},setClear:function(fe){te!==fe&&(t.clearDepth(fe),te=fe)},reset:function(){O=!1,L=null,k=null,te=null}}}function i(){let O=!1,ye=null,L=null,k=null,te=null,fe=null,We=null,Qe=null,Ct=null;return{setTest:function(Ge){O||(Ge?ae(t.STENCIL_TEST):le(t.STENCIL_TEST))},setMask:function(Ge){ye!==Ge&&!O&&(t.stencilMask(Ge),ye=Ge)},setFunc:function(Ge,ot,zt){(L!==Ge||k!==ot||te!==zt)&&(t.stencilFunc(Ge,ot,zt),L=Ge,k=ot,te=zt)},setOp:function(Ge,ot,zt){(fe!==Ge||We!==ot||Qe!==zt)&&(t.stencilOp(Ge,ot,zt),fe=Ge,We=ot,Qe=zt)},setLocked:function(Ge){O=Ge},setClear:function(Ge){Ct!==Ge&&(t.clearStencil(Ge),Ct=Ge)},reset:function(){O=!1,ye=null,L=null,k=null,te=null,fe=null,We=null,Qe=null,Ct=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],p=null,g=!1,_=null,m=null,d=null,A=null,v=null,y=null,P=null,w=new Ye(0,0,0),C=0,T=!1,B=null,x=null,I=null,N=null,F=null;const V=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,W=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Q)[1]),K=W>=1):Q.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),K=W>=2);let D=null,j={};const J=t.getParameter(t.SCISSOR_BOX),ie=t.getParameter(t.VIEWPORT),re=new St().fromArray(J),Ae=new St().fromArray(ie);function H(O,ye,L,k){const te=new Uint8Array(4),fe=t.createTexture();t.bindTexture(O,fe),t.texParameteri(O,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(O,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let We=0;We<L;We++)O===t.TEXTURE_3D||O===t.TEXTURE_2D_ARRAY?t.texImage3D(ye,0,t.RGBA,1,1,k,0,t.RGBA,t.UNSIGNED_BYTE,te):t.texImage2D(ye+We,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,te);return fe}const q={};q[t.TEXTURE_2D]=H(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=H(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=H(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=H(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ae(t.DEPTH_TEST),s.setFunc(Os),pe(!1),ce(Wp),ae(t.CULL_FACE),b(rr);function ae(O){c[O]!==!0&&(t.enable(O),c[O]=!0)}function le(O){c[O]!==!1&&(t.disable(O),c[O]=!1)}function Ue(O,ye){return h[O]!==ye?(t.bindFramebuffer(O,ye),h[O]=ye,O===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=ye),O===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=ye),!0):!1}function be(O,ye){let L=f,k=!1;if(O){L=u.get(ye),L===void 0&&(L=[],u.set(ye,L));const te=O.textures;if(L.length!==te.length||L[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,We=te.length;fe<We;fe++)L[fe]=t.COLOR_ATTACHMENT0+fe;L.length=te.length,k=!0}}else L[0]!==t.BACK&&(L[0]=t.BACK,k=!0);k&&t.drawBuffers(L)}function Oe(O){return p!==O?(t.useProgram(O),p=O,!0):!1}const je={[_r]:t.FUNC_ADD,[Ax]:t.FUNC_SUBTRACT,[vx]:t.FUNC_REVERSE_SUBTRACT};je[_x]=t.MIN,je[Cx]=t.MAX;const ne={[xx]:t.ZERO,[yx]:t.ONE,[Ix]:t.SRC_COLOR,[vh]:t.SRC_ALPHA,[Rx]:t.SRC_ALPHA_SATURATE,[wx]:t.DST_COLOR,[Sx]:t.DST_ALPHA,[Mx]:t.ONE_MINUS_SRC_COLOR,[_h]:t.ONE_MINUS_SRC_ALPHA,[Tx]:t.ONE_MINUS_DST_COLOR,[Ex]:t.ONE_MINUS_DST_ALPHA,[bx]:t.CONSTANT_COLOR,[Px]:t.ONE_MINUS_CONSTANT_COLOR,[Lx]:t.CONSTANT_ALPHA,[Nx]:t.ONE_MINUS_CONSTANT_ALPHA};function b(O,ye,L,k,te,fe,We,Qe,Ct,Ge){if(O===rr){g===!0&&(le(t.BLEND),g=!1);return}if(g===!1&&(ae(t.BLEND),g=!0),O!==gx){if(O!==_||Ge!==T){if((m!==_r||v!==_r)&&(t.blendEquation(t.FUNC_ADD),m=_r,v=_r),Ge)switch(O){case Ss:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jp:t.blendFunc(t.ONE,t.ONE);break;case Xp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ss:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Xp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}d=null,A=null,y=null,P=null,w.set(0,0,0),C=0,_=O,T=Ge}return}te=te||ye,fe=fe||L,We=We||k,(ye!==m||te!==v)&&(t.blendEquationSeparate(je[ye],je[te]),m=ye,v=te),(L!==d||k!==A||fe!==y||We!==P)&&(t.blendFuncSeparate(ne[L],ne[k],ne[fe],ne[We]),d=L,A=k,y=fe,P=We),(Qe.equals(w)===!1||Ct!==C)&&(t.blendColor(Qe.r,Qe.g,Qe.b,Ct),w.copy(Qe),C=Ct),_=O,T=!1}function ge(O,ye){O.side===_n?le(t.CULL_FACE):ae(t.CULL_FACE);let L=O.side===Kt;ye&&(L=!L),pe(L),O.blending===Ss&&O.transparent===!1?b(rr):b(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),r.setMask(O.colorWrite);const k=O.stencilWrite;o.setTest(k),k&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ae(t.SAMPLE_ALPHA_TO_COVERAGE):le(t.SAMPLE_ALPHA_TO_COVERAGE)}function pe(O){B!==O&&(O?t.frontFace(t.CW):t.frontFace(t.CCW),B=O)}function ce(O){O!==fx?(ae(t.CULL_FACE),O!==x&&(O===Wp?t.cullFace(t.BACK):O===px?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):le(t.CULL_FACE),x=O}function ve(O){O!==I&&(K&&t.lineWidth(O),I=O)}function Pe(O,ye,L){O?(ae(t.POLYGON_OFFSET_FILL),(N!==ye||F!==L)&&(t.polygonOffset(ye,L),N=ye,F=L)):le(t.POLYGON_OFFSET_FILL)}function xe(O){O?ae(t.SCISSOR_TEST):le(t.SCISSOR_TEST)}function R(O){O===void 0&&(O=t.TEXTURE0+V-1),D!==O&&(t.activeTexture(O),D=O)}function M(O,ye,L){L===void 0&&(D===null?L=t.TEXTURE0+V-1:L=D);let k=j[L];k===void 0&&(k={type:void 0,texture:void 0},j[L]=k),(k.type!==O||k.texture!==ye)&&(D!==L&&(t.activeTexture(L),D=L),t.bindTexture(O,ye||q[O]),k.type=O,k.texture=ye)}function X(){const O=j[D];O!==void 0&&O.type!==void 0&&(t.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function $(){try{t.compressedTexImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{t.compressedTexImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{t.texSubImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Te(){try{t.texSubImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Je(){try{t.texStorage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{t.texStorage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{t.texImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{t.texImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ke(O){re.equals(O)===!1&&(t.scissor(O.x,O.y,O.z,O.w),re.copy(O))}function Ee(O){Ae.equals(O)===!1&&(t.viewport(O.x,O.y,O.z,O.w),Ae.copy(O))}function Ke(O,ye){let L=l.get(ye);L===void 0&&(L=new WeakMap,l.set(ye,L));let k=L.get(O);k===void 0&&(k=t.getUniformBlockIndex(ye,O.name),L.set(O,k))}function Be(O,ye){const k=l.get(ye).get(O);a.get(ye)!==k&&(t.uniformBlockBinding(ye,k,O.__bindingPointIndex),a.set(ye,k))}function rt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},D=null,j={},h={},u=new WeakMap,f=[],p=null,g=!1,_=null,m=null,d=null,A=null,v=null,y=null,P=null,w=new Ye(0,0,0),C=0,T=!1,B=null,x=null,I=null,N=null,F=null,re.set(0,0,t.canvas.width,t.canvas.height),Ae.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ae,disable:le,bindFramebuffer:Ue,drawBuffers:be,useProgram:Oe,setBlending:b,setMaterial:ge,setFlipSided:pe,setCullFace:ce,setLineWidth:ve,setPolygonOffset:Pe,setScissorTest:xe,activeTexture:R,bindTexture:M,unbindTexture:X,compressedTexImage2D:$,compressedTexImage3D:oe,texImage2D:Se,texImage3D:Fe,updateUBOMapping:Ke,uniformBlockBinding:Be,texStorage2D:Je,texStorage3D:de,texSubImage2D:ee,texSubImage3D:Te,compressedTexSubImage2D:_e,compressedTexSubImage3D:Me,scissor:ke,viewport:Ee,reset:rt}}function km(t,e,n,i){const r=Aw(i);switch(n){case yv:return t*e;case Mv:return t*e;case Sv:return t*e*2;case Ev:return t*e/r.components*r.byteLength;case af:return t*e/r.components*r.byteLength;case wv:return t*e*2/r.components*r.byteLength;case lf:return t*e*2/r.components*r.byteLength;case Iv:return t*e*3/r.components*r.byteLength;case Yn:return t*e*4/r.components*r.byteLength;case cf:return t*e*4/r.components*r.byteLength;case ol:case al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ll:case cl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case bh:case Lh:return Math.max(t,16)*Math.max(e,8)/4;case Rh:case Ph:return Math.max(t,8)*Math.max(e,8)/2;case Nh:case Dh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Uh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Oh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case kh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case zh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Bh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Vh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Wh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case jh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Xh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Yh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Zh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Jh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ul:case Kh:case Qh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Tv:case qh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case $h:case ed:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Aw(t){switch(t){case bi:case _v:return{byteLength:1,components:1};case Wo:case Cv:case ta:return{byteLength:2,components:1};case sf:case of:return{byteLength:2,components:4};case Lr:case rf:case Ci:return{byteLength:4,components:1};case xv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function vw(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return p?new OffscreenCanvas(R,M):Xo("canvas")}function _(R,M,X){let $=1;const oe=xe(R);if((oe.width>X||oe.height>X)&&($=X/Math.max(oe.width,oe.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor($*oe.width),Te=Math.floor($*oe.height);u===void 0&&(u=g(ee,Te));const _e=M?g(ee,Te):u;return _e.width=ee,_e.height=Te,_e.getContext("2d").drawImage(R,0,0,ee,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ee+"x"+Te+")."),_e}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),R;return R}function m(R){return R.generateMipmaps&&R.minFilter!==Ln&&R.minFilter!==jn}function d(R){t.generateMipmap(R)}function A(R,M,X,$,oe=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=M;if(M===t.RED&&(X===t.FLOAT&&(ee=t.R32F),X===t.HALF_FLOAT&&(ee=t.R16F),X===t.UNSIGNED_BYTE&&(ee=t.R8)),M===t.RED_INTEGER&&(X===t.UNSIGNED_BYTE&&(ee=t.R8UI),X===t.UNSIGNED_SHORT&&(ee=t.R16UI),X===t.UNSIGNED_INT&&(ee=t.R32UI),X===t.BYTE&&(ee=t.R8I),X===t.SHORT&&(ee=t.R16I),X===t.INT&&(ee=t.R32I)),M===t.RG&&(X===t.FLOAT&&(ee=t.RG32F),X===t.HALF_FLOAT&&(ee=t.RG16F),X===t.UNSIGNED_BYTE&&(ee=t.RG8)),M===t.RG_INTEGER&&(X===t.UNSIGNED_BYTE&&(ee=t.RG8UI),X===t.UNSIGNED_SHORT&&(ee=t.RG16UI),X===t.UNSIGNED_INT&&(ee=t.RG32UI),X===t.BYTE&&(ee=t.RG8I),X===t.SHORT&&(ee=t.RG16I),X===t.INT&&(ee=t.RG32I)),M===t.RGB_INTEGER&&(X===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),X===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),X===t.UNSIGNED_INT&&(ee=t.RGB32UI),X===t.BYTE&&(ee=t.RGB8I),X===t.SHORT&&(ee=t.RGB16I),X===t.INT&&(ee=t.RGB32I)),M===t.RGBA_INTEGER&&(X===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),X===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),X===t.UNSIGNED_INT&&(ee=t.RGBA32UI),X===t.BYTE&&(ee=t.RGBA8I),X===t.SHORT&&(ee=t.RGBA16I),X===t.INT&&(ee=t.RGBA32I)),M===t.RGB&&X===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),M===t.RGBA){const Te=oe?kl:$e.getTransfer($);X===t.FLOAT&&(ee=t.RGBA32F),X===t.HALF_FLOAT&&(ee=t.RGBA16F),X===t.UNSIGNED_BYTE&&(ee=Te===ht?t.SRGB8_ALPHA8:t.RGBA8),X===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),X===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(R,M){let X;return R?M===null||M===Lr||M===Bs?X=t.DEPTH24_STENCIL8:M===Ci?X=t.DEPTH32F_STENCIL8:M===Wo&&(X=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Lr||M===Bs?X=t.DEPTH_COMPONENT24:M===Ci?X=t.DEPTH_COMPONENT32F:M===Wo&&(X=t.DEPTH_COMPONENT16),X}function y(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ln&&R.minFilter!==jn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function P(R){const M=R.target;M.removeEventListener("dispose",P),C(M),M.isVideoTexture&&h.delete(M)}function w(R){const M=R.target;M.removeEventListener("dispose",w),B(M)}function C(R){const M=i.get(R);if(M.__webglInit===void 0)return;const X=R.source,$=f.get(X);if($){const oe=$[M.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&T(R),Object.keys($).length===0&&f.delete(X)}i.remove(R)}function T(R){const M=i.get(R);t.deleteTexture(M.__webglTexture);const X=R.source,$=f.get(X);delete $[M.__cacheKey],o.memory.textures--}function B(R){const M=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let oe=0;oe<M.__webglFramebuffer[$].length;oe++)t.deleteFramebuffer(M.__webglFramebuffer[$][oe]);else t.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)t.deleteFramebuffer(M.__webglFramebuffer[$]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const X=R.textures;for(let $=0,oe=X.length;$<oe;$++){const ee=i.get(X[$]);ee.__webglTexture&&(t.deleteTexture(ee.__webglTexture),o.memory.textures--),i.remove(X[$])}i.remove(R)}let x=0;function I(){x=0}function N(){const R=x;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),x+=1,R}function F(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function V(R,M){const X=i.get(R);if(R.isVideoTexture&&ve(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){const $=R.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(X,R,M);return}}n.bindTexture(t.TEXTURE_2D,X.__webglTexture,t.TEXTURE0+M)}function K(R,M){const X=i.get(R);if(R.version>0&&X.__version!==R.version){Ae(X,R,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,X.__webglTexture,t.TEXTURE0+M)}function W(R,M){const X=i.get(R);if(R.version>0&&X.__version!==R.version){Ae(X,R,M);return}n.bindTexture(t.TEXTURE_3D,X.__webglTexture,t.TEXTURE0+M)}function Q(R,M){const X=i.get(R);if(R.version>0&&X.__version!==R.version){H(X,R,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture,t.TEXTURE0+M)}const D={[zs]:t.REPEAT,[Ji]:t.CLAMP_TO_EDGE,[Fl]:t.MIRRORED_REPEAT},j={[Ln]:t.NEAREST,[Hx]:t.NEAREST_MIPMAP_NEAREST,[Ia]:t.NEAREST_MIPMAP_LINEAR,[jn]:t.LINEAR,[Wc]:t.LINEAR_MIPMAP_NEAREST,[Mr]:t.LINEAR_MIPMAP_LINEAR},J={[Yx]:t.NEVER,[$x]:t.ALWAYS,[Zx]:t.LESS,[bv]:t.LEQUAL,[Jx]:t.EQUAL,[qx]:t.GEQUAL,[Kx]:t.GREATER,[Qx]:t.NOTEQUAL};function ie(R,M){if(M.type===Ci&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===jn||M.magFilter===Wc||M.magFilter===Ia||M.magFilter===Mr||M.minFilter===jn||M.minFilter===Wc||M.minFilter===Ia||M.minFilter===Mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,D[M.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,D[M.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,D[M.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,j[M.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,j[M.minFilter]),M.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,J[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ln||M.minFilter!==Ia&&M.minFilter!==Mr||M.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function re(R,M){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",P));const $=M.source;let oe=f.get($);oe===void 0&&(oe={},f.set($,oe));const ee=F(M);if(ee!==R.__cacheKey){oe[ee]===void 0&&(oe[ee]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,X=!0),oe[ee].usedTimes++;const Te=oe[R.__cacheKey];Te!==void 0&&(oe[R.__cacheKey].usedTimes--,Te.usedTimes===0&&T(M)),R.__cacheKey=ee,R.__webglTexture=oe[ee].texture}return X}function Ae(R,M,X){let $=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=t.TEXTURE_3D);const oe=re(R,M),ee=M.source;n.bindTexture($,R.__webglTexture,t.TEXTURE0+X);const Te=i.get(ee);if(ee.version!==Te.__version||oe===!0){n.activeTexture(t.TEXTURE0+X);const _e=$e.getPrimaries($e.workingColorSpace),Me=M.colorSpace===Xi?null:$e.getPrimaries(M.colorSpace),Je=M.colorSpace===Xi||_e===Me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let de=_(M.image,!1,r.maxTextureSize);de=Pe(M,de);const Se=s.convert(M.format,M.colorSpace),Fe=s.convert(M.type);let ke=A(M.internalFormat,Se,Fe,M.colorSpace,M.isVideoTexture);ie($,M);let Ee;const Ke=M.mipmaps,Be=M.isVideoTexture!==!0,rt=Te.__version===void 0||oe===!0,O=ee.dataReady,ye=y(M,de);if(M.isDepthTexture)ke=v(M.format===Gs,M.type),rt&&(Be?n.texStorage2D(t.TEXTURE_2D,1,ke,de.width,de.height):n.texImage2D(t.TEXTURE_2D,0,ke,de.width,de.height,0,Se,Fe,null));else if(M.isDataTexture)if(Ke.length>0){Be&&rt&&n.texStorage2D(t.TEXTURE_2D,ye,ke,Ke[0].width,Ke[0].height);for(let L=0,k=Ke.length;L<k;L++)Ee=Ke[L],Be?O&&n.texSubImage2D(t.TEXTURE_2D,L,0,0,Ee.width,Ee.height,Se,Fe,Ee.data):n.texImage2D(t.TEXTURE_2D,L,ke,Ee.width,Ee.height,0,Se,Fe,Ee.data);M.generateMipmaps=!1}else Be?(rt&&n.texStorage2D(t.TEXTURE_2D,ye,ke,de.width,de.height),O&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,de.width,de.height,Se,Fe,de.data)):n.texImage2D(t.TEXTURE_2D,0,ke,de.width,de.height,0,Se,Fe,de.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Be&&rt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ye,ke,Ke[0].width,Ke[0].height,de.depth);for(let L=0,k=Ke.length;L<k;L++)if(Ee=Ke[L],M.format!==Yn)if(Se!==null)if(Be){if(O)if(M.layerUpdates.size>0){const te=km(Ee.width,Ee.height,M.format,M.type);for(const fe of M.layerUpdates){const We=Ee.data.subarray(fe*te/Ee.data.BYTES_PER_ELEMENT,(fe+1)*te/Ee.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,L,0,0,fe,Ee.width,Ee.height,1,Se,We,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,L,0,0,0,Ee.width,Ee.height,de.depth,Se,Ee.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,L,ke,Ee.width,Ee.height,de.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?O&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,L,0,0,0,Ee.width,Ee.height,de.depth,Se,Fe,Ee.data):n.texImage3D(t.TEXTURE_2D_ARRAY,L,ke,Ee.width,Ee.height,de.depth,0,Se,Fe,Ee.data)}else{Be&&rt&&n.texStorage2D(t.TEXTURE_2D,ye,ke,Ke[0].width,Ke[0].height);for(let L=0,k=Ke.length;L<k;L++)Ee=Ke[L],M.format!==Yn?Se!==null?Be?O&&n.compressedTexSubImage2D(t.TEXTURE_2D,L,0,0,Ee.width,Ee.height,Se,Ee.data):n.compressedTexImage2D(t.TEXTURE_2D,L,ke,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?O&&n.texSubImage2D(t.TEXTURE_2D,L,0,0,Ee.width,Ee.height,Se,Fe,Ee.data):n.texImage2D(t.TEXTURE_2D,L,ke,Ee.width,Ee.height,0,Se,Fe,Ee.data)}else if(M.isDataArrayTexture)if(Be){if(rt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ye,ke,de.width,de.height,de.depth),O)if(M.layerUpdates.size>0){const L=km(de.width,de.height,M.format,M.type);for(const k of M.layerUpdates){const te=de.data.subarray(k*L/de.data.BYTES_PER_ELEMENT,(k+1)*L/de.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,k,de.width,de.height,1,Se,Fe,te)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Se,Fe,de.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,ke,de.width,de.height,de.depth,0,Se,Fe,de.data);else if(M.isData3DTexture)Be?(rt&&n.texStorage3D(t.TEXTURE_3D,ye,ke,de.width,de.height,de.depth),O&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Se,Fe,de.data)):n.texImage3D(t.TEXTURE_3D,0,ke,de.width,de.height,de.depth,0,Se,Fe,de.data);else if(M.isFramebufferTexture){if(rt)if(Be)n.texStorage2D(t.TEXTURE_2D,ye,ke,de.width,de.height);else{let L=de.width,k=de.height;for(let te=0;te<ye;te++)n.texImage2D(t.TEXTURE_2D,te,ke,L,k,0,Se,Fe,null),L>>=1,k>>=1}}else if(Ke.length>0){if(Be&&rt){const L=xe(Ke[0]);n.texStorage2D(t.TEXTURE_2D,ye,ke,L.width,L.height)}for(let L=0,k=Ke.length;L<k;L++)Ee=Ke[L],Be?O&&n.texSubImage2D(t.TEXTURE_2D,L,0,0,Se,Fe,Ee):n.texImage2D(t.TEXTURE_2D,L,ke,Se,Fe,Ee);M.generateMipmaps=!1}else if(Be){if(rt){const L=xe(de);n.texStorage2D(t.TEXTURE_2D,ye,ke,L.width,L.height)}O&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Se,Fe,de)}else n.texImage2D(t.TEXTURE_2D,0,ke,Se,Fe,de);m(M)&&d($),Te.__version=ee.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function H(R,M,X){if(M.image.length!==6)return;const $=re(R,M),oe=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+X);const ee=i.get(oe);if(oe.version!==ee.__version||$===!0){n.activeTexture(t.TEXTURE0+X);const Te=$e.getPrimaries($e.workingColorSpace),_e=M.colorSpace===Xi?null:$e.getPrimaries(M.colorSpace),Me=M.colorSpace===Xi||Te===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Je=M.isCompressedTexture||M.image[0].isCompressedTexture,de=M.image[0]&&M.image[0].isDataTexture,Se=[];for(let k=0;k<6;k++)!Je&&!de?Se[k]=_(M.image[k],!0,r.maxCubemapSize):Se[k]=de?M.image[k].image:M.image[k],Se[k]=Pe(M,Se[k]);const Fe=Se[0],ke=s.convert(M.format,M.colorSpace),Ee=s.convert(M.type),Ke=A(M.internalFormat,ke,Ee,M.colorSpace),Be=M.isVideoTexture!==!0,rt=ee.__version===void 0||$===!0,O=oe.dataReady;let ye=y(M,Fe);ie(t.TEXTURE_CUBE_MAP,M);let L;if(Je){Be&&rt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Ke,Fe.width,Fe.height);for(let k=0;k<6;k++){L=Se[k].mipmaps;for(let te=0;te<L.length;te++){const fe=L[te];M.format!==Yn?ke!==null?Be?O&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te,0,0,fe.width,fe.height,ke,fe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te,Ke,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?O&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te,0,0,fe.width,fe.height,ke,Ee,fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te,Ke,fe.width,fe.height,0,ke,Ee,fe.data)}}}else{if(L=M.mipmaps,Be&&rt){L.length>0&&ye++;const k=xe(Se[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Ke,k.width,k.height)}for(let k=0;k<6;k++)if(de){Be?O&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,Se[k].width,Se[k].height,ke,Ee,Se[k].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Ke,Se[k].width,Se[k].height,0,ke,Ee,Se[k].data);for(let te=0;te<L.length;te++){const We=L[te].image[k].image;Be?O&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te+1,0,0,We.width,We.height,ke,Ee,We.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te+1,Ke,We.width,We.height,0,ke,Ee,We.data)}}else{Be?O&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,ke,Ee,Se[k]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Ke,ke,Ee,Se[k]);for(let te=0;te<L.length;te++){const fe=L[te];Be?O&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te+1,0,0,ke,Ee,fe.image[k]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,te+1,Ke,ke,Ee,fe.image[k])}}}m(M)&&d(t.TEXTURE_CUBE_MAP),ee.__version=oe.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function q(R,M,X,$,oe,ee){const Te=s.convert(X.format,X.colorSpace),_e=s.convert(X.type),Me=A(X.internalFormat,Te,_e,X.colorSpace);if(!i.get(M).__hasExternalTextures){const de=Math.max(1,M.width>>ee),Se=Math.max(1,M.height>>ee);oe===t.TEXTURE_3D||oe===t.TEXTURE_2D_ARRAY?n.texImage3D(oe,ee,Me,de,Se,M.depth,0,Te,_e,null):n.texImage2D(oe,ee,Me,de,Se,0,Te,_e,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),ce(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,$,oe,i.get(X).__webglTexture,0,pe(M)):(oe===t.TEXTURE_2D||oe>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,$,oe,i.get(X).__webglTexture,ee),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ae(R,M,X){if(t.bindRenderbuffer(t.RENDERBUFFER,R),M.depthBuffer){const $=M.depthTexture,oe=$&&$.isDepthTexture?$.type:null,ee=v(M.stencilBuffer,oe),Te=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=pe(M);ce(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,_e,ee,M.width,M.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,ee,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ee,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Te,t.RENDERBUFFER,R)}else{const $=M.textures;for(let oe=0;oe<$.length;oe++){const ee=$[oe],Te=s.convert(ee.format,ee.colorSpace),_e=s.convert(ee.type),Me=A(ee.internalFormat,Te,_e,ee.colorSpace),Je=pe(M);X&&ce(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Je,Me,M.width,M.height):ce(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Je,Me,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Me,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function le(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const $=i.get(M.depthTexture).__webglTexture,oe=pe(M);if(M.depthTexture.format===Es)ce(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,$,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,$,0);else if(M.depthTexture.format===Gs)ce(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,$,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ue(R){const M=i.get(R),X=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const oe=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",oe)};$.addEventListener("dispose",oe),M.__depthDisposeCallback=oe}M.__boundDepthTexture=$}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");le(M.__webglFramebuffer,R)}else if(X){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=t.createRenderbuffer(),ae(M.__webglDepthbuffer[$],R,!1);else{const oe=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[$];t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,oe,t.RENDERBUFFER,ee)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),ae(M.__webglDepthbuffer,R,!1);else{const $=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,oe)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function be(R,M,X){const $=i.get(R);M!==void 0&&q($.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),X!==void 0&&Ue(R)}function Oe(R){const M=R.texture,X=i.get(R),$=i.get(M);R.addEventListener("dispose",w);const oe=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Te=oe.length>1;if(Te||($.__webglTexture===void 0&&($.__webglTexture=t.createTexture()),$.__version=M.version,o.memory.textures++),ee){X.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[_e]=[];for(let Me=0;Me<M.mipmaps.length;Me++)X.__webglFramebuffer[_e][Me]=t.createFramebuffer()}else X.__webglFramebuffer[_e]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let _e=0;_e<M.mipmaps.length;_e++)X.__webglFramebuffer[_e]=t.createFramebuffer()}else X.__webglFramebuffer=t.createFramebuffer();if(Te)for(let _e=0,Me=oe.length;_e<Me;_e++){const Je=i.get(oe[_e]);Je.__webglTexture===void 0&&(Je.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&ce(R)===!1){X.__webglMultisampledFramebuffer=t.createFramebuffer(),X.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let _e=0;_e<oe.length;_e++){const Me=oe[_e];X.__webglColorRenderbuffer[_e]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,X.__webglColorRenderbuffer[_e]);const Je=s.convert(Me.format,Me.colorSpace),de=s.convert(Me.type),Se=A(Me.internalFormat,Je,de,Me.colorSpace,R.isXRRenderTarget===!0),Fe=pe(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Fe,Se,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,X.__webglColorRenderbuffer[_e])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=t.createRenderbuffer(),ae(X.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ee){n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),ie(t.TEXTURE_CUBE_MAP,M);for(let _e=0;_e<6;_e++)if(M.mipmaps&&M.mipmaps.length>0)for(let Me=0;Me<M.mipmaps.length;Me++)q(X.__webglFramebuffer[_e][Me],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Me);else q(X.__webglFramebuffer[_e],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(M)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Te){for(let _e=0,Me=oe.length;_e<Me;_e++){const Je=oe[_e],de=i.get(Je);n.bindTexture(t.TEXTURE_2D,de.__webglTexture),ie(t.TEXTURE_2D,Je),q(X.__webglFramebuffer,R,Je,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,0),m(Je)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let _e=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_e=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(_e,$.__webglTexture),ie(_e,M),M.mipmaps&&M.mipmaps.length>0)for(let Me=0;Me<M.mipmaps.length;Me++)q(X.__webglFramebuffer[Me],R,M,t.COLOR_ATTACHMENT0,_e,Me);else q(X.__webglFramebuffer,R,M,t.COLOR_ATTACHMENT0,_e,0);m(M)&&d(_e),n.unbindTexture()}R.depthBuffer&&Ue(R)}function je(R){const M=R.textures;for(let X=0,$=M.length;X<$;X++){const oe=M[X];if(m(oe)){const ee=R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Te=i.get(oe).__webglTexture;n.bindTexture(ee,Te),d(ee),n.unbindTexture()}}}const ne=[],b=[];function ge(R){if(R.samples>0){if(ce(R)===!1){const M=R.textures,X=R.width,$=R.height;let oe=t.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Te=i.get(R),_e=M.length>1;if(_e)for(let Me=0;Me<M.length;Me++)n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Me=0;Me<M.length;Me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(oe|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(oe|=t.STENCIL_BUFFER_BIT)),_e){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);const Je=i.get(M[Me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Je,0)}t.blitFramebuffer(0,0,X,$,0,0,X,$,oe,t.NEAREST),l===!0&&(ne.length=0,b.length=0,ne.push(t.COLOR_ATTACHMENT0+Me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ne.push(ee),b.push(ee),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,b)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ne))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),_e)for(let Me=0;Me<M.length;Me++){n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.RENDERBUFFER,Te.__webglColorRenderbuffer[Me]);const Je=i.get(M[Me]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.TEXTURE_2D,Je,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function pe(R){return Math.min(r.maxSamples,R.samples)}function ce(R){const M=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ve(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Pe(R,M){const X=R.colorSpace,$=R.format,oe=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||X!==Qn&&X!==Xi&&($e.getTransfer(X)===ht?($!==Yn||oe!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),M}function xe(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=I,this.setTexture2D=V,this.setTexture2DArray=K,this.setTexture3D=W,this.setTextureCube=Q,this.rebindTextures=be,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=q,this.useMultisampledRTT=ce}function _w(t,e){function n(i,r=Xi){let s;const o=$e.getTransfer(r);if(i===bi)return t.UNSIGNED_BYTE;if(i===sf)return t.UNSIGNED_SHORT_4_4_4_4;if(i===of)return t.UNSIGNED_SHORT_5_5_5_1;if(i===xv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_v)return t.BYTE;if(i===Cv)return t.SHORT;if(i===Wo)return t.UNSIGNED_SHORT;if(i===rf)return t.INT;if(i===Lr)return t.UNSIGNED_INT;if(i===Ci)return t.FLOAT;if(i===ta)return t.HALF_FLOAT;if(i===yv)return t.ALPHA;if(i===Iv)return t.RGB;if(i===Yn)return t.RGBA;if(i===Mv)return t.LUMINANCE;if(i===Sv)return t.LUMINANCE_ALPHA;if(i===Es)return t.DEPTH_COMPONENT;if(i===Gs)return t.DEPTH_STENCIL;if(i===Ev)return t.RED;if(i===af)return t.RED_INTEGER;if(i===wv)return t.RG;if(i===lf)return t.RG_INTEGER;if(i===cf)return t.RGBA_INTEGER;if(i===ol||i===al||i===ll||i===cl)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ol)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ol)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ll)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Rh||i===bh||i===Ph||i===Lh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Rh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ph)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Lh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Nh||i===Dh||i===Uh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Nh||i===Dh)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Uh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Oh||i===Fh||i===kh||i===zh||i===Bh||i===Gh||i===Vh||i===Hh||i===Wh||i===jh||i===Xh||i===Yh||i===Zh||i===Jh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Oh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===kh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Zh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ul||i===Kh||i===Qh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ul)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Qh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tv||i===qh||i===$h||i===ed)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ul)return s.COMPRESSED_RED_RGTC1_EXT;if(i===qh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$h)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ed)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class Cw extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yi extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xw={type:"move"};class vu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=n.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new yi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const yw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Iw=`
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

}`;class Mw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new sn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Pi({vertexShader:yw,fragmentShader:Iw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Vt(new cc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sw extends kr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=new Mw,m=n.getContextAttributes();let d=null,A=null;const v=[],y=[],P=new he;let w=null;const C=new bn;C.layers.enable(1),C.viewport=new St;const T=new bn;T.layers.enable(2),T.viewport=new St;const B=[C,T],x=new Cw;x.layers.enable(1),x.layers.enable(2);let I=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let q=v[H];return q===void 0&&(q=new vu,v[H]=q),q.getTargetRaySpace()},this.getControllerGrip=function(H){let q=v[H];return q===void 0&&(q=new vu,v[H]=q),q.getGripSpace()},this.getHand=function(H){let q=v[H];return q===void 0&&(q=new vu,v[H]=q),q.getHandSpace()};function F(H){const q=y.indexOf(H.inputSource);if(q===-1)return;const ae=v[q];ae!==void 0&&(ae.update(H.inputSource,H.frame,c||o),ae.dispatchEvent({type:H.type,data:H.inputSource}))}function V(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",K);for(let H=0;H<v.length;H++){const q=y[H];q!==null&&(y[H]=null,v[H].disconnect(q))}I=null,N=null,_.reset(),e.setRenderTarget(d),p=null,f=null,u=null,r=null,A=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",V),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Nr(p.framebufferWidth,p.framebufferHeight,{format:Yn,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let q=null,ae=null,le=null;m.depth&&(le=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,q=m.stencil?Gs:Es,ae=m.stencil?Bs:Lr);const Ue={colorFormat:n.RGBA8,depthFormat:le,scaleFactor:s};u=new XRWebGLBinding(r,n),f=u.createProjectionLayer(Ue),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Nr(f.textureWidth,f.textureHeight,{format:Yn,type:bi,depthTexture:new Xv(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ae.setContext(r),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(H){for(let q=0;q<H.removed.length;q++){const ae=H.removed[q],le=y.indexOf(ae);le>=0&&(y[le]=null,v[le].disconnect(ae))}for(let q=0;q<H.added.length;q++){const ae=H.added[q];let le=y.indexOf(ae);if(le===-1){for(let be=0;be<v.length;be++)if(be>=y.length){y.push(ae),le=be;break}else if(y[be]===null){y[be]=ae,le=be;break}if(le===-1)break}const Ue=v[le];Ue&&Ue.connect(ae)}}const W=new U,Q=new U;function D(H,q,ae){W.setFromMatrixPosition(q.matrixWorld),Q.setFromMatrixPosition(ae.matrixWorld);const le=W.distanceTo(Q),Ue=q.projectionMatrix.elements,be=ae.projectionMatrix.elements,Oe=Ue[14]/(Ue[10]-1),je=Ue[14]/(Ue[10]+1),ne=(Ue[9]+1)/Ue[5],b=(Ue[9]-1)/Ue[5],ge=(Ue[8]-1)/Ue[0],pe=(be[8]+1)/be[0],ce=Oe*ge,ve=Oe*pe,Pe=le/(-ge+pe),xe=Pe*-ge;if(q.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(xe),H.translateZ(Pe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Ue[10]===-1)H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const R=Oe+Pe,M=je+Pe,X=ce-xe,$=ve+(le-xe),oe=ne*je/M*R,ee=b*je/M*R;H.projectionMatrix.makePerspective(X,$,oe,ee,R,M),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function j(H,q){q===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(q.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let q=H.near,ae=H.far;_.texture!==null&&(_.depthNear>0&&(q=_.depthNear),_.depthFar>0&&(ae=_.depthFar)),x.near=T.near=C.near=q,x.far=T.far=C.far=ae,(I!==x.near||N!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),I=x.near,N=x.far);const le=H.parent,Ue=x.cameras;j(x,le);for(let be=0;be<Ue.length;be++)j(Ue[be],le);Ue.length===2?D(x,C,T):x.projectionMatrix.copy(C.projectionMatrix),J(H,x,le)};function J(H,q,ae){ae===null?H.matrix.copy(q.matrixWorld):(H.matrix.copy(ae.matrixWorld),H.matrix.invert(),H.matrix.multiply(q.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=jo*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ie=null;function re(H,q){if(h=q.getViewerPose(c||o),g=q,h!==null){const ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let le=!1;ae.length!==x.cameras.length&&(x.cameras.length=0,le=!0);for(let be=0;be<ae.length;be++){const Oe=ae[be];let je=null;if(p!==null)je=p.getViewport(Oe);else{const b=u.getViewSubImage(f,Oe);je=b.viewport,be===0&&(e.setRenderTargetTextures(A,b.colorTexture,f.ignoreDepthValues?void 0:b.depthStencilTexture),e.setRenderTarget(A))}let ne=B[be];ne===void 0&&(ne=new bn,ne.layers.enable(be),ne.viewport=new St,B[be]=ne),ne.matrix.fromArray(Oe.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(Oe.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(je.x,je.y,je.width,je.height),be===0&&(x.matrix.copy(ne.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),le===!0&&x.cameras.push(ne)}const Ue=r.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){const be=u.getDepthInformation(ae[0]);be&&be.isValid&&be.texture&&_.init(e,be,r.renderState)}}for(let ae=0;ae<v.length;ae++){const le=y[ae],Ue=v[ae];le!==null&&Ue!==void 0&&Ue.update(le,q,c||o)}ie&&ie(H,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),g=null}const Ae=new Wv;Ae.setAnimationLoop(re),this.setAnimationLoop=function(H){ie=H},this.dispose=function(){}}}const mr=new ai,Ew=new at;function ww(t,e){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Gv(t)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,A,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),u(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,A,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Kt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Kt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const A=e.get(d),v=A.envMap,y=A.envMapRotation;v&&(m.envMap.value=v,mr.copy(y),mr.x*=-1,mr.y*=-1,mr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(mr.y*=-1,mr.z*=-1),m.envMapRotation.value.setFromMatrix4(Ew.makeRotationFromEuler(mr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,A,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=v*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Kt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const A=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Tw(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,v){const y=v.program;i.uniformBlockBinding(A,y)}function c(A,v){let y=r[A.id];y===void 0&&(g(A),y=h(A),r[A.id]=y,A.addEventListener("dispose",m));const P=v.program;i.updateUBOMapping(A,P);const w=e.render.frame;s[A.id]!==w&&(f(A),s[A.id]=w)}function h(A){const v=u();A.__bindingPointIndex=v;const y=t.createBuffer(),P=A.__size,w=A.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,P,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,y),y}function u(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const v=r[A.id],y=A.uniforms,P=A.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let w=0,C=y.length;w<C;w++){const T=Array.isArray(y[w])?y[w]:[y[w]];for(let B=0,x=T.length;B<x;B++){const I=T[B];if(p(I,w,B,P)===!0){const N=I.__offset,F=Array.isArray(I.value)?I.value:[I.value];let V=0;for(let K=0;K<F.length;K++){const W=F[K],Q=_(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,t.bufferSubData(t.UNIFORM_BUFFER,N+V,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,V),V+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,N,I.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(A,v,y,P){const w=A.value,C=v+"_"+y;if(P[C]===void 0)return typeof w=="number"||typeof w=="boolean"?P[C]=w:P[C]=w.clone(),!0;{const T=P[C];if(typeof w=="number"||typeof w=="boolean"){if(T!==w)return P[C]=w,!0}else if(T.equals(w)===!1)return T.copy(w),!0}return!1}function g(A){const v=A.uniforms;let y=0;const P=16;for(let C=0,T=v.length;C<T;C++){const B=Array.isArray(v[C])?v[C]:[v[C]];for(let x=0,I=B.length;x<I;x++){const N=B[x],F=Array.isArray(N.value)?N.value:[N.value];for(let V=0,K=F.length;V<K;V++){const W=F[V],Q=_(W),D=y%P,j=D%Q.boundary,J=D+j;y+=j,J!==0&&P-J<Q.storage&&(y+=P-J),N.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=Q.storage}}}const w=y%P;return w>0&&(y+=P-w),A.__size=y,A.__cache={},this}function _(A){const v={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(v.boundary=4,v.storage=4):A.isVector2?(v.boundary=8,v.storage=8):A.isVector3||A.isColor?(v.boundary=16,v.storage=12):A.isVector4?(v.boundary=16,v.storage=16):A.isMatrix3?(v.boundary=48,v.storage=48):A.isMatrix4?(v.boundary=64,v.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),v}function m(A){const v=A.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const A in r)t.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Rw{constructor(e={}){const{canvas:n=gy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const d=[],A=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Hn,this.toneMapping=Mi,this.toneMappingExposure=1;const v=this;let y=!1,P=0,w=0,C=null,T=-1,B=null;const x=new St,I=new St;let N=null;const F=new Ye(0);let V=0,K=n.width,W=n.height,Q=1,D=null,j=null;const J=new St(0,0,K,W),ie=new St(0,0,K,W);let re=!1;const Ae=new ff;let H=!1,q=!1;const ae=new at,le=new at,Ue=new U,be=new St,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function ne(){return C===null?Q:1}let b=i;function ge(E,z){return n.getContext(E,z)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${nf}`),n.addEventListener("webglcontextlost",k,!1),n.addEventListener("webglcontextrestored",te,!1),n.addEventListener("webglcontextcreationerror",fe,!1),b===null){const z="webgl2";if(b=ge(z,E),b===null)throw ge(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let pe,ce,ve,Pe,xe,R,M,X,$,oe,ee,Te,_e,Me,Je,de,Se,Fe,ke,Ee,Ke,Be,rt,O;function ye(){pe=new DS(b),pe.init(),Be=new _w(b,pe),ce=new TS(b,pe,e,Be),ve=new gw(b),ce.reverseDepthBuffer&&ve.buffers.depth.setReversed(!0),Pe=new FS(b),xe=new tw,R=new vw(b,pe,ve,xe,ce,Be,Pe),M=new bS(v),X=new NS(v),$=new Wy(b),rt=new ES(b,$),oe=new US(b,$,Pe,rt),ee=new zS(b,oe,$,Pe),ke=new kS(b,ce,R),de=new RS(xe),Te=new ew(v,M,X,pe,ce,rt,de),_e=new ww(v,xe),Me=new iw,Je=new cw(pe),Fe=new SS(v,M,X,ve,ee,f,l),Se=new pw(v,ee,ce),O=new Tw(b,Pe,ce,ve),Ee=new wS(b,pe,Pe),Ke=new OS(b,pe,Pe),Pe.programs=Te.programs,v.capabilities=ce,v.extensions=pe,v.properties=xe,v.renderLists=Me,v.shadowMap=Se,v.state=ve,v.info=Pe}ye();const L=new Sw(v,b);this.xr=L,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){const E=pe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=pe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(K,W,!1))},this.getSize=function(E){return E.set(K,W)},this.setSize=function(E,z,Y=!0){if(L.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=E,W=z,n.width=Math.floor(E*Q),n.height=Math.floor(z*Q),Y===!0&&(n.style.width=E+"px",n.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(K*Q,W*Q).floor()},this.setDrawingBufferSize=function(E,z,Y){K=E,W=z,Q=Y,n.width=Math.floor(E*Y),n.height=Math.floor(z*Y),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,z,Y,Z){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,z,Y,Z),ve.viewport(x.copy(J).multiplyScalar(Q).round())},this.getScissor=function(E){return E.copy(ie)},this.setScissor=function(E,z,Y,Z){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,z,Y,Z),ve.scissor(I.copy(ie).multiplyScalar(Q).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(E){ve.setScissorTest(re=E)},this.setOpaqueSort=function(E){D=E},this.setTransparentSort=function(E){j=E},this.getClearColor=function(E){return E.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(E=!0,z=!0,Y=!0){let Z=0;if(E){let G=!1;if(C!==null){const me=C.texture.format;G=me===cf||me===lf||me===af}if(G){const me=C.texture.type,Ie=me===bi||me===Lr||me===Wo||me===Bs||me===sf||me===of,Re=Fe.getClearColor(),Le=Fe.getClearAlpha(),ze=Re.r,Ve=Re.g,Ne=Re.b;Ie?(p[0]=ze,p[1]=Ve,p[2]=Ne,p[3]=Le,b.clearBufferuiv(b.COLOR,0,p)):(g[0]=ze,g[1]=Ve,g[2]=Ne,g[3]=Le,b.clearBufferiv(b.COLOR,0,g))}else Z|=b.COLOR_BUFFER_BIT}z&&(Z|=b.DEPTH_BUFFER_BIT,b.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(Z|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",k,!1),n.removeEventListener("webglcontextrestored",te,!1),n.removeEventListener("webglcontextcreationerror",fe,!1),Me.dispose(),Je.dispose(),xe.dispose(),M.dispose(),X.dispose(),ee.dispose(),rt.dispose(),O.dispose(),Te.dispose(),L.dispose(),L.removeEventListener("sessionstart",xt),L.removeEventListener("sessionend",yt),$t.stop()};function k(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function te(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=Pe.autoReset,z=Se.enabled,Y=Se.autoUpdate,Z=Se.needsUpdate,G=Se.type;ye(),Pe.autoReset=E,Se.enabled=z,Se.autoUpdate=Y,Se.needsUpdate=Z,Se.type=G}function fe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function We(E){const z=E.target;z.removeEventListener("dispose",We),Qe(z)}function Qe(E){Ct(E),xe.remove(E)}function Ct(E){const z=xe.get(E).programs;z!==void 0&&(z.forEach(function(Y){Te.releaseProgram(Y)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,Y,Z,G,me){z===null&&(z=Oe);const Ie=G.isMesh&&G.matrixWorld.determinant()<0,Re=A0(E,z,Y,Z,G);ve.setMaterial(Z,Ie);let Le=Y.index,ze=1;if(Z.wireframe===!0){if(Le=oe.getWireframeAttribute(Y),Le===void 0)return;ze=2}const Ve=Y.drawRange,Ne=Y.attributes.position;let nt=Ve.start*ze,ct=(Ve.start+Ve.count)*ze;me!==null&&(nt=Math.max(nt,me.start*ze),ct=Math.min(ct,(me.start+me.count)*ze)),Le!==null?(nt=Math.max(nt,0),ct=Math.min(ct,Le.count)):Ne!=null&&(nt=Math.max(nt,0),ct=Math.min(ct,Ne.count));const It=ct-nt;if(It<0||It===1/0)return;rt.setup(G,Z,Re,Y,Le);let pn,et=Ee;if(Le!==null&&(pn=$.get(Le),et=Ke,et.setIndex(pn)),G.isMesh)Z.wireframe===!0?(ve.setLineWidth(Z.wireframeLinewidth*ne()),et.setMode(b.LINES)):et.setMode(b.TRIANGLES);else if(G.isLine){let De=Z.linewidth;De===void 0&&(De=1),ve.setLineWidth(De*ne()),G.isLineSegments?et.setMode(b.LINES):G.isLineLoop?et.setMode(b.LINE_LOOP):et.setMode(b.LINE_STRIP)}else G.isPoints?et.setMode(b.POINTS):G.isSprite&&et.setMode(b.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)et.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(pe.get("WEBGL_multi_draw"))et.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const De=G._multiDrawStarts,Bt=G._multiDrawCounts,tt=G._multiDrawCount,On=Le?$.get(Le).bytesPerElement:1,Br=xe.get(Z).currentProgram.getUniforms();for(let mn=0;mn<tt;mn++)Br.setValue(b,"_gl_DrawID",mn),et.render(De[mn]/On,Bt[mn])}else if(G.isInstancedMesh)et.renderInstances(nt,It,G.count);else if(Y.isInstancedBufferGeometry){const De=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Bt=Math.min(Y.instanceCount,De);et.renderInstances(nt,It,Bt)}else et.render(nt,It)};function Ge(E,z,Y){E.transparent===!0&&E.side===_n&&E.forceSinglePass===!1?(E.side=Kt,E.needsUpdate=!0,sa(E,z,Y),E.side=Ri,E.needsUpdate=!0,sa(E,z,Y),E.side=_n):sa(E,z,Y)}this.compile=function(E,z,Y=null){Y===null&&(Y=E),m=Je.get(Y),m.init(z),A.push(m),Y.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),E!==Y&&E.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();const Z=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const me=G.material;if(me)if(Array.isArray(me))for(let Ie=0;Ie<me.length;Ie++){const Re=me[Ie];Ge(Re,Y,G),Z.add(Re)}else Ge(me,Y,G),Z.add(me)}),A.pop(),m=null,Z},this.compileAsync=function(E,z,Y=null){const Z=this.compile(E,z,Y);return new Promise(G=>{function me(){if(Z.forEach(function(Ie){xe.get(Ie).currentProgram.isReady()&&Z.delete(Ie)}),Z.size===0){G(E);return}setTimeout(me,10)}pe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ot=null;function zt(E){ot&&ot(E)}function xt(){$t.stop()}function yt(){$t.start()}const $t=new Wv;$t.setAnimationLoop(zt),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(E){ot=E,L.setAnimationLoop(E),E===null?$t.stop():$t.start()},L.addEventListener("sessionstart",xt),L.addEventListener("sessionend",yt),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),L.enabled===!0&&L.isPresenting===!0&&(L.cameraAutoUpdate===!0&&L.updateCamera(z),z=L.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,z,C),m=Je.get(E,A.length),m.init(z),A.push(m),le.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Ae.setFromProjectionMatrix(le),q=this.localClippingEnabled,H=de.init(this.clippingPlanes,q),_=Me.get(E,d.length),_.init(),d.push(_),L.enabled===!0&&L.isPresenting===!0){const me=v.xr.getDepthSensingMesh();me!==null&&ci(me,z,-1/0,v.sortObjects)}ci(E,z,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(D,j),je=L.enabled===!1||L.isPresenting===!1||L.hasDepthSensing()===!1,je&&Fe.addToRenderList(_,E),this.info.render.frame++,H===!0&&de.beginShadows();const Y=m.state.shadowsArray;Se.render(Y,E,z),H===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=_.opaque,G=_.transmissive;if(m.setupLights(),z.isArrayCamera){const me=z.cameras;if(G.length>0)for(let Ie=0,Re=me.length;Ie<Re;Ie++){const Le=me[Ie];wf(Z,G,E,Le)}je&&Fe.render(E);for(let Ie=0,Re=me.length;Ie<Re;Ie++){const Le=me[Ie];Ef(_,E,Le,Le.viewport)}}else G.length>0&&wf(Z,G,E,z),je&&Fe.render(E),Ef(_,E,z);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(v,E,z),rt.resetDefaultState(),T=-1,B=null,A.pop(),A.length>0?(m=A[A.length-1],H===!0&&de.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function ci(E,z,Y,Z){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)Y=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ae.intersectsSprite(E)){Z&&be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(le);const Ie=ee.update(E),Re=E.material;Re.visible&&_.push(E,Ie,Re,Y,be.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ae.intersectsObject(E))){const Ie=ee.update(E),Re=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),be.copy(E.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),be.copy(Ie.boundingSphere.center)),be.applyMatrix4(E.matrixWorld).applyMatrix4(le)),Array.isArray(Re)){const Le=Ie.groups;for(let ze=0,Ve=Le.length;ze<Ve;ze++){const Ne=Le[ze],nt=Re[Ne.materialIndex];nt&&nt.visible&&_.push(E,Ie,nt,Y,be.z,Ne)}}else Re.visible&&_.push(E,Ie,Re,Y,be.z,null)}}const me=E.children;for(let Ie=0,Re=me.length;Ie<Re;Ie++)ci(me[Ie],z,Y,Z)}function Ef(E,z,Y,Z){const G=E.opaque,me=E.transmissive,Ie=E.transparent;m.setupLightsView(Y),H===!0&&de.setGlobalState(v.clippingPlanes,Y),Z&&ve.viewport(x.copy(Z)),G.length>0&&ra(G,z,Y),me.length>0&&ra(me,z,Y),Ie.length>0&&ra(Ie,z,Y),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function wf(E,z,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Z.id]===void 0&&(m.state.transmissionRenderTarget[Z.id]=new Nr(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float")?ta:bi,minFilter:Mr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const me=m.state.transmissionRenderTarget[Z.id],Ie=Z.viewport||x;me.setSize(Ie.z,Ie.w);const Re=v.getRenderTarget();v.setRenderTarget(me),v.getClearColor(F),V=v.getClearAlpha(),V<1&&v.setClearColor(16777215,.5),v.clear(),je&&Fe.render(Y);const Le=v.toneMapping;v.toneMapping=Mi;const ze=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),m.setupLightsView(Z),H===!0&&de.setGlobalState(v.clippingPlanes,Z),ra(E,Y,Z),R.updateMultisampleRenderTarget(me),R.updateRenderTargetMipmap(me),pe.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ne=0,nt=z.length;Ne<nt;Ne++){const ct=z[Ne],It=ct.object,pn=ct.geometry,et=ct.material,De=ct.group;if(et.side===_n&&It.layers.test(Z.layers)){const Bt=et.side;et.side=Kt,et.needsUpdate=!0,Tf(It,Y,Z,pn,et,De),et.side=Bt,et.needsUpdate=!0,Ve=!0}}Ve===!0&&(R.updateMultisampleRenderTarget(me),R.updateRenderTargetMipmap(me))}v.setRenderTarget(Re),v.setClearColor(F,V),ze!==void 0&&(Z.viewport=ze),v.toneMapping=Le}function ra(E,z,Y){const Z=z.isScene===!0?z.overrideMaterial:null;for(let G=0,me=E.length;G<me;G++){const Ie=E[G],Re=Ie.object,Le=Ie.geometry,ze=Z===null?Ie.material:Z,Ve=Ie.group;Re.layers.test(Y.layers)&&Tf(Re,z,Y,Le,ze,Ve)}}function Tf(E,z,Y,Z,G,me){E.onBeforeRender(v,z,Y,Z,G,me),E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(v,z,Y,Z,E,me),G.transparent===!0&&G.side===_n&&G.forceSinglePass===!1?(G.side=Kt,G.needsUpdate=!0,v.renderBufferDirect(Y,z,Z,G,E,me),G.side=Ri,G.needsUpdate=!0,v.renderBufferDirect(Y,z,Z,G,E,me),G.side=_n):v.renderBufferDirect(Y,z,Z,G,E,me),E.onAfterRender(v,z,Y,Z,G,me)}function sa(E,z,Y){z.isScene!==!0&&(z=Oe);const Z=xe.get(E),G=m.state.lights,me=m.state.shadowsArray,Ie=G.state.version,Re=Te.getParameters(E,G.state,me,z,Y),Le=Te.getProgramCacheKey(Re);let ze=Z.programs;Z.environment=E.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(E.isMeshStandardMaterial?X:M).get(E.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,ze===void 0&&(E.addEventListener("dispose",We),ze=new Map,Z.programs=ze);let Ve=ze.get(Le);if(Ve!==void 0){if(Z.currentProgram===Ve&&Z.lightsStateVersion===Ie)return bf(E,Re),Ve}else Re.uniforms=Te.getUniforms(E),E.onBeforeCompile(Re,v),Ve=Te.acquireProgram(Re,Le),ze.set(Le,Ve),Z.uniforms=Re.uniforms;const Ne=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ne.clippingPlanes=de.uniform),bf(E,Re),Z.needsLights=_0(E),Z.lightsStateVersion=Ie,Z.needsLights&&(Ne.ambientLightColor.value=G.state.ambient,Ne.lightProbe.value=G.state.probe,Ne.directionalLights.value=G.state.directional,Ne.directionalLightShadows.value=G.state.directionalShadow,Ne.spotLights.value=G.state.spot,Ne.spotLightShadows.value=G.state.spotShadow,Ne.rectAreaLights.value=G.state.rectArea,Ne.ltc_1.value=G.state.rectAreaLTC1,Ne.ltc_2.value=G.state.rectAreaLTC2,Ne.pointLights.value=G.state.point,Ne.pointLightShadows.value=G.state.pointShadow,Ne.hemisphereLights.value=G.state.hemi,Ne.directionalShadowMap.value=G.state.directionalShadowMap,Ne.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ne.spotShadowMap.value=G.state.spotShadowMap,Ne.spotLightMatrix.value=G.state.spotLightMatrix,Ne.spotLightMap.value=G.state.spotLightMap,Ne.pointShadowMap.value=G.state.pointShadowMap,Ne.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=Ve,Z.uniformsList=null,Ve}function Rf(E){if(E.uniformsList===null){const z=E.currentProgram.getUniforms();E.uniformsList=dl.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function bf(E,z){const Y=xe.get(E);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function A0(E,z,Y,Z,G){z.isScene!==!0&&(z=Oe),R.resetTextureUnits();const me=z.fog,Ie=Z.isMeshStandardMaterial?z.environment:null,Re=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Qn,Le=(Z.isMeshStandardMaterial?X:M).get(Z.envMap||Ie),ze=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ve=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ne=!!Y.morphAttributes.position,nt=!!Y.morphAttributes.normal,ct=!!Y.morphAttributes.color;let It=Mi;Z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(It=v.toneMapping);const pn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,et=pn!==void 0?pn.length:0,De=xe.get(Z),Bt=m.state.lights;if(H===!0&&(q===!0||E!==B)){const En=E===B&&Z.id===T;de.setState(Z,E,En)}let tt=!1;Z.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Bt.state.version||De.outputColorSpace!==Re||G.isBatchedMesh&&De.batching===!1||!G.isBatchedMesh&&De.batching===!0||G.isBatchedMesh&&De.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&De.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&De.instancing===!1||!G.isInstancedMesh&&De.instancing===!0||G.isSkinnedMesh&&De.skinning===!1||!G.isSkinnedMesh&&De.skinning===!0||G.isInstancedMesh&&De.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&De.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&De.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&De.instancingMorph===!1&&G.morphTexture!==null||De.envMap!==Le||Z.fog===!0&&De.fog!==me||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==de.numPlanes||De.numIntersection!==de.numIntersection)||De.vertexAlphas!==ze||De.vertexTangents!==Ve||De.morphTargets!==Ne||De.morphNormals!==nt||De.morphColors!==ct||De.toneMapping!==It||De.morphTargetsCount!==et)&&(tt=!0):(tt=!0,De.__version=Z.version);let On=De.currentProgram;tt===!0&&(On=sa(Z,z,G));let Br=!1,mn=!1,fc=!1;const Et=On.getUniforms(),Ni=De.uniforms;if(ve.useProgram(On.program)&&(Br=!0,mn=!0,fc=!0),Z.id!==T&&(T=Z.id,mn=!0),Br||B!==E){ce.reverseDepthBuffer?(ae.copy(E.projectionMatrix),vy(ae),_y(ae),Et.setValue(b,"projectionMatrix",ae)):Et.setValue(b,"projectionMatrix",E.projectionMatrix),Et.setValue(b,"viewMatrix",E.matrixWorldInverse);const En=Et.map.cameraPosition;En!==void 0&&En.setValue(b,Ue.setFromMatrixPosition(E.matrixWorld)),ce.logarithmicDepthBuffer&&Et.setValue(b,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Et.setValue(b,"isOrthographic",E.isOrthographicCamera===!0),B!==E&&(B=E,mn=!0,fc=!0)}if(G.isSkinnedMesh){Et.setOptional(b,G,"bindMatrix"),Et.setOptional(b,G,"bindMatrixInverse");const En=G.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Et.setValue(b,"boneTexture",En.boneTexture,R))}G.isBatchedMesh&&(Et.setOptional(b,G,"batchingTexture"),Et.setValue(b,"batchingTexture",G._matricesTexture,R),Et.setOptional(b,G,"batchingIdTexture"),Et.setValue(b,"batchingIdTexture",G._indirectTexture,R),Et.setOptional(b,G,"batchingColorTexture"),G._colorsTexture!==null&&Et.setValue(b,"batchingColorTexture",G._colorsTexture,R));const pc=Y.morphAttributes;if((pc.position!==void 0||pc.normal!==void 0||pc.color!==void 0)&&ke.update(G,Y,On),(mn||De.receiveShadow!==G.receiveShadow)&&(De.receiveShadow=G.receiveShadow,Et.setValue(b,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Ni.envMap.value=Le,Ni.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&z.environment!==null&&(Ni.envMapIntensity.value=z.environmentIntensity),mn&&(Et.setValue(b,"toneMappingExposure",v.toneMappingExposure),De.needsLights&&v0(Ni,fc),me&&Z.fog===!0&&_e.refreshFogUniforms(Ni,me),_e.refreshMaterialUniforms(Ni,Z,Q,W,m.state.transmissionRenderTarget[E.id]),dl.upload(b,Rf(De),Ni,R)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(dl.upload(b,Rf(De),Ni,R),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Et.setValue(b,"center",G.center),Et.setValue(b,"modelViewMatrix",G.modelViewMatrix),Et.setValue(b,"normalMatrix",G.normalMatrix),Et.setValue(b,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const En=Z.uniformsGroups;for(let mc=0,C0=En.length;mc<C0;mc++){const Pf=En[mc];O.update(Pf,On),O.bind(Pf,On)}}return On}function v0(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function _0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,z,Y){xe.get(E.texture).__webglTexture=z,xe.get(E.depthTexture).__webglTexture=Y;const Z=xe.get(E);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=Y===void 0,Z.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,z){const Y=xe.get(E);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(E,z=0,Y=0){C=E,P=z,w=Y;let Z=!0,G=null,me=!1,Ie=!1;if(E){const Le=xe.get(E);if(Le.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(b.FRAMEBUFFER,null),Z=!1;else if(Le.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Le.__hasExternalTextures)R.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ne=E.depthTexture;if(Le.__boundDepthTexture!==Ne){if(Ne!==null&&xe.has(Ne)&&(E.width!==Ne.image.width||E.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const ze=E.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ie=!0);const Ve=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ve[z])?G=Ve[z][Y]:G=Ve[z],me=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?G=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(Ve)?G=Ve[Y]:G=Ve,x.copy(E.viewport),I.copy(E.scissor),N=E.scissorTest}else x.copy(J).multiplyScalar(Q).floor(),I.copy(ie).multiplyScalar(Q).floor(),N=re;if(ve.bindFramebuffer(b.FRAMEBUFFER,G)&&Z&&ve.drawBuffers(E,G),ve.viewport(x),ve.scissor(I),ve.setScissorTest(N),me){const Le=xe.get(E.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+z,Le.__webglTexture,Y)}else if(Ie){const Le=xe.get(E.texture),ze=z||0;b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,Le.__webglTexture,Y||0,ze)}T=-1},this.readRenderTargetPixels=function(E,z,Y,Z,G,me,Ie){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ie!==void 0&&(Re=Re[Ie]),Re){ve.bindFramebuffer(b.FRAMEBUFFER,Re);try{const Le=E.texture,ze=Le.format,Ve=Le.type;if(!ce.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ce.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-Z&&Y>=0&&Y<=E.height-G&&b.readPixels(z,Y,Z,G,Be.convert(ze),Be.convert(Ve),me)}finally{const Le=C!==null?xe.get(C).__webglFramebuffer:null;ve.bindFramebuffer(b.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(E,z,Y,Z,G,me,Ie){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ie!==void 0&&(Re=Re[Ie]),Re){const Le=E.texture,ze=Le.format,Ve=Le.type;if(!ce.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ce.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=E.width-Z&&Y>=0&&Y<=E.height-G){ve.bindFramebuffer(b.FRAMEBUFFER,Re);const Ne=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,Ne),b.bufferData(b.PIXEL_PACK_BUFFER,me.byteLength,b.STREAM_READ),b.readPixels(z,Y,Z,G,Be.convert(ze),Be.convert(Ve),0);const nt=C!==null?xe.get(C).__webglFramebuffer:null;ve.bindFramebuffer(b.FRAMEBUFFER,nt);const ct=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await Ay(b,ct,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,Ne),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,me),b.deleteBuffer(Ne),b.deleteSync(ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,z=null,Y=0){E.isTexture!==!0&&(hl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1]);const Z=Math.pow(2,-Y),G=Math.floor(E.image.width*Z),me=Math.floor(E.image.height*Z),Ie=z!==null?z.x:0,Re=z!==null?z.y:0;R.setTexture2D(E,0),b.copyTexSubImage2D(b.TEXTURE_2D,Y,0,0,Ie,Re,G,me),ve.unbindTexture()},this.copyTextureToTexture=function(E,z,Y=null,Z=null,G=0){E.isTexture!==!0&&(hl("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,E=arguments[1],z=arguments[2],G=arguments[3]||0,Y=null);let me,Ie,Re,Le,ze,Ve;Y!==null?(me=Y.max.x-Y.min.x,Ie=Y.max.y-Y.min.y,Re=Y.min.x,Le=Y.min.y):(me=E.image.width,Ie=E.image.height,Re=0,Le=0),Z!==null?(ze=Z.x,Ve=Z.y):(ze=0,Ve=0);const Ne=Be.convert(z.format),nt=Be.convert(z.type);R.setTexture2D(z,0),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,z.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,z.unpackAlignment);const ct=b.getParameter(b.UNPACK_ROW_LENGTH),It=b.getParameter(b.UNPACK_IMAGE_HEIGHT),pn=b.getParameter(b.UNPACK_SKIP_PIXELS),et=b.getParameter(b.UNPACK_SKIP_ROWS),De=b.getParameter(b.UNPACK_SKIP_IMAGES),Bt=E.isCompressedTexture?E.mipmaps[G]:E.image;b.pixelStorei(b.UNPACK_ROW_LENGTH,Bt.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Bt.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Re),b.pixelStorei(b.UNPACK_SKIP_ROWS,Le),E.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,G,ze,Ve,me,Ie,Ne,nt,Bt.data):E.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,G,ze,Ve,Bt.width,Bt.height,Ne,Bt.data):b.texSubImage2D(b.TEXTURE_2D,G,ze,Ve,me,Ie,Ne,nt,Bt),b.pixelStorei(b.UNPACK_ROW_LENGTH,ct),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,It),b.pixelStorei(b.UNPACK_SKIP_PIXELS,pn),b.pixelStorei(b.UNPACK_SKIP_ROWS,et),b.pixelStorei(b.UNPACK_SKIP_IMAGES,De),G===0&&z.generateMipmaps&&b.generateMipmap(b.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(E,z,Y=null,Z=null,G=0){E.isTexture!==!0&&(hl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,Z=arguments[1]||null,E=arguments[2],z=arguments[3],G=arguments[4]||0);let me,Ie,Re,Le,ze,Ve,Ne,nt,ct;const It=E.isCompressedTexture?E.mipmaps[G]:E.image;Y!==null?(me=Y.max.x-Y.min.x,Ie=Y.max.y-Y.min.y,Re=Y.max.z-Y.min.z,Le=Y.min.x,ze=Y.min.y,Ve=Y.min.z):(me=It.width,Ie=It.height,Re=It.depth,Le=0,ze=0,Ve=0),Z!==null?(Ne=Z.x,nt=Z.y,ct=Z.z):(Ne=0,nt=0,ct=0);const pn=Be.convert(z.format),et=Be.convert(z.type);let De;if(z.isData3DTexture)R.setTexture3D(z,0),De=b.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)R.setTexture2DArray(z,0),De=b.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,z.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,z.unpackAlignment);const Bt=b.getParameter(b.UNPACK_ROW_LENGTH),tt=b.getParameter(b.UNPACK_IMAGE_HEIGHT),On=b.getParameter(b.UNPACK_SKIP_PIXELS),Br=b.getParameter(b.UNPACK_SKIP_ROWS),mn=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,It.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,It.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Le),b.pixelStorei(b.UNPACK_SKIP_ROWS,ze),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Ve),E.isDataTexture||E.isData3DTexture?b.texSubImage3D(De,G,Ne,nt,ct,me,Ie,Re,pn,et,It.data):z.isCompressedArrayTexture?b.compressedTexSubImage3D(De,G,Ne,nt,ct,me,Ie,Re,pn,It.data):b.texSubImage3D(De,G,Ne,nt,ct,me,Ie,Re,pn,et,It),b.pixelStorei(b.UNPACK_ROW_LENGTH,Bt),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,tt),b.pixelStorei(b.UNPACK_SKIP_PIXELS,On),b.pixelStorei(b.UNPACK_SKIP_ROWS,Br),b.pixelStorei(b.UNPACK_SKIP_IMAGES,mn),G===0&&z.generateMipmaps&&b.generateMipmap(De),ve.unbindTexture()},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),ve.unbindTexture()},this.resetState=function(){P=0,w=0,C=null,ve.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===uf?"display-p3":"srgb",n.unpackColorSpace=$e.workingColorSpace===lc?"display-p3":"srgb"}}class bw extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ai,this.environmentIntensity=1,this.environmentRotation=new ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,p=(o-h)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new he:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new U,r=[],s=[],o=[],a=new U,l=new at;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new U)}s[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Lt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Lt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class mf extends li{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new he){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Pw extends mf{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gf(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,p*=h,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Wa=new U,_u=new gf,Cu=new gf,xu=new gf;class Lw extends li{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new U){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(Wa.subVectors(r[0],r[1]).add(r[0]),c=Wa);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Wa.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Wa),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),_u.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),Cu.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),xu.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(_u.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Cu.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),xu.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(_u.calc(l),Cu.calc(l),xu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new U().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function zm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function Nw(t,e){const n=1-t;return n*n*e}function Dw(t,e){return 2*(1-t)*t*e}function Uw(t,e){return t*t*e}function Mo(t,e,n,i){return Nw(t,e)+Dw(t,n)+Uw(t,i)}function Ow(t,e){const n=1-t;return n*n*n*e}function Fw(t,e){const n=1-t;return 3*n*n*t*e}function kw(t,e){return 3*(1-t)*t*t*e}function zw(t,e){return t*t*t*e}function So(t,e,n,i,r){return Ow(t,e)+Fw(t,n)+kw(t,i)+zw(t,r)}class Qv extends li{constructor(e=new he,n=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new he){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(So(e,r.x,s.x,o.x,a.x),So(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bw extends li{constructor(e=new U,n=new U,i=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new U){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(So(e,r.x,s.x,o.x,a.x),So(e,r.y,s.y,o.y,a.y),So(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qv extends li{constructor(e=new he,n=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new he){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new he){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gw extends li{constructor(e=new U,n=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new U){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new U){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $v extends li{constructor(e=new he,n=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new he){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Mo(e,r.x,s.x,o.x),Mo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vw extends li{constructor(e=new U,n=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new U){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Mo(e,r.x,s.x,o.x),Mo(e,r.y,s.y,o.y),Mo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class e0 extends li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new he){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(zm(a,l.x,c.x,h.x,u.x),zm(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new he().fromArray(r))}return this}}var nd=Object.freeze({__proto__:null,ArcCurve:Pw,CatmullRomCurve3:Lw,CubicBezierCurve:Qv,CubicBezierCurve3:Bw,EllipseCurve:mf,LineCurve:qv,LineCurve3:Gw,QuadraticBezierCurve:$v,QuadraticBezierCurve3:Vw,SplineCurve:e0});class Hw extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nd[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new nd[r.type]().fromJSON(r))}return this}}class Bm extends Hw{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new qv(this.currentPoint.clone(),new he(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new $v(this.currentPoint.clone(),new he(e,n),new he(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Qv(this.currentPoint.clone(),new he(e,n),new he(i,r),new he(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new e0(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,n+h,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new mf(e,n,i,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Vl extends Sn{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=Lt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/n,u=new U,f=new he,p=new U,g=new U,_=new U;let m=0,d=0;for(let A=0;A<=e.length-1;A++)switch(A){case 0:m=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let A=0;A<=n;A++){const v=i+A*h*r,y=Math.sin(v),P=Math.cos(v);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*y,u.y=e[w].y,u.z=e[w].x*P,o.push(u.x,u.y,u.z),f.x=A/n,f.y=w/(e.length-1),a.push(f.x,f.y);const C=l[3*w+0]*y,T=l[3*w+1],B=l[3*w+0]*P;c.push(C,T,B)}}for(let A=0;A<n;A++)for(let v=0;v<e.length-1;v++){const y=v+A*e.length,P=y,w=y+e.length,C=y+e.length+1,T=y+1;s.push(P,w,T),s.push(C,T,w)}this.setIndex(s),this.setAttribute("position",new pt(o,3)),this.setAttribute("uv",new pt(a,2)),this.setAttribute("normal",new pt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.points,e.segments,e.phiStart,e.phiLength)}}class Af extends Sn{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],c=new U,h=new he;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=n;u++,f+=3){const p=i+u/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=n;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Af(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class vf extends Sn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;A(),o===!1&&(e>0&&v(!0),n>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(p,2));function A(){const y=new U,P=new U;let w=0;const C=(n-e)/i;for(let T=0;T<=s;T++){const B=[],x=T/s,I=x*(n-e)+e;for(let N=0;N<=r;N++){const F=N/r,V=F*l+a,K=Math.sin(V),W=Math.cos(V);P.x=I*K,P.y=-x*i+m,P.z=I*W,u.push(P.x,P.y,P.z),y.set(K,C,W).normalize(),f.push(y.x,y.y,y.z),p.push(F,1-x),B.push(g++)}_.push(B)}for(let T=0;T<r;T++)for(let B=0;B<s;B++){const x=_[B][T],I=_[B+1][T],N=_[B+1][T+1],F=_[B][T+1];e>0&&(h.push(x,I,F),w+=3),n>0&&(h.push(I,N,F),w+=3)}c.addGroup(d,w,0),d+=w}function v(y){const P=g,w=new he,C=new U;let T=0;const B=y===!0?e:n,x=y===!0?1:-1;for(let N=1;N<=r;N++)u.push(0,m*x,0),f.push(0,x,0),p.push(.5,.5),g++;const I=g;for(let N=0;N<=r;N++){const V=N/r*l+a,K=Math.cos(V),W=Math.sin(V);C.x=B*W,C.y=m*x,C.z=B*K,u.push(C.x,C.y,C.z),f.push(0,x,0),w.x=K*.5+.5,w.y=W*.5*x+.5,p.push(w.x,w.y),g++}for(let N=0;N<r;N++){const F=P+N,V=I+N;y===!0?h.push(V,V+1,F):h.push(V+1,V,F),T+=3}c.addGroup(d,T,y===!0?1:2),d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vf(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class t0 extends Bm{constructor(e){super(e),this.uuid=zr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Bm().fromJSON(r))}return this}}const Ww={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=n0(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,p;if(i&&(s=Jw(t,e,s,n)),t.length>80*n){a=c=t[0],l=h=t[1];for(let g=n;g<r;g+=n)u=t[g],f=t[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return Yo(s,o,n,a,l,p,0),o}};function n0(t,e,n,i,r){let s,o;if(r===o1(t,e,n,i)>0)for(s=e;s<n;s+=i)o=Gm(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=Gm(s,t[s],t[s+1],o);return o&&hc(o,o.next)&&(Jo(o),o=o.next),o}function Ur(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(hc(n,n.next)||At(n.prev,n,n.next)===0)){if(Jo(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Yo(t,e,n,i,r,s,o){if(!t)return;!o&&s&&e1(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?Xw(t,i,r,s):jw(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),Jo(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=Yw(Ur(t),e,n),Yo(t,e,n,i,r,s,2)):o===2&&Zw(t,e,n,i,r,s):Yo(Ur(t),e,n,i,r,s,1);break}}}function jw(t){const e=t.prev,n=t,i=t.next;if(At(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&As(r,a,s,l,o,c,g.x,g.y)&&At(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xw(t,e,n,i){const r=t.prev,s=t,o=t.next;if(At(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,p=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,d=id(p,g,e,n,i),A=id(_,m,e,n,i);let v=t.prevZ,y=t.nextZ;for(;v&&v.z>=d&&y&&y.z<=A;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&As(a,h,l,u,c,f,v.x,v.y)&&At(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&As(a,h,l,u,c,f,y.x,y.y)&&At(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=d;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&As(a,h,l,u,c,f,v.x,v.y)&&At(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=A;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&As(a,h,l,u,c,f,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Yw(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!hc(r,s)&&i0(r,i,i.next,s)&&Zo(r,s)&&Zo(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),Jo(i),Jo(i.next),i=t=s),i=i.next}while(i!==t);return Ur(i)}function Zw(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&i1(o,a)){let l=r0(o,a);o=Ur(o,o.next),l=Ur(l,l.next),Yo(o,e,n,i,r,s,0),Yo(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function Jw(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=n0(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(n1(c));for(r.sort(Kw),s=0;s<r.length;s++)n=Qw(r[s],n);return n}function Kw(t,e){return t.x-e.x}function Qw(t,e){const n=qw(t,e);if(!n)return e;const i=r0(n,t);return Ur(i,i.next),Ur(n,n.next)}function qw(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=s&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&As(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(s-n.x),Zo(n,t)&&(u<h||u===h&&(n.x>r.x||n.x===r.x&&$w(r,n)))&&(r=n,h=u)),n=n.next;while(n!==a);return r}function $w(t,e){return At(t.prev,t,e.prev)<0&&At(e.next,t,t.next)<0}function e1(t,e,n,i){let r=t;do r.z===0&&(r.z=id(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,t1(r)}function t1(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function id(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function n1(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function As(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function i1(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!r1(t,e)&&(Zo(t,e)&&Zo(e,t)&&s1(t,e)&&(At(t.prev,t,e.prev)||At(t,e.prev,e))||hc(t,e)&&At(t.prev,t,t.next)>0&&At(e.prev,e,e.next)>0)}function At(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function hc(t,e){return t.x===e.x&&t.y===e.y}function i0(t,e,n,i){const r=Xa(At(t,e,n)),s=Xa(At(t,e,i)),o=Xa(At(n,i,t)),a=Xa(At(n,i,e));return!!(r!==s&&o!==a||r===0&&ja(t,n,e)||s===0&&ja(t,i,e)||o===0&&ja(n,t,i)||a===0&&ja(n,e,i))}function ja(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Xa(t){return t>0?1:t<0?-1:0}function r1(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&i0(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Zo(t,e){return At(t.prev,t,t.next)<0?At(t,e,t.next)>=0&&At(t,t.prev,e)>=0:At(t,e,t.prev)<0||At(t,t.next,e)<0}function s1(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function r0(t,e){const n=new rd(t.i,t.x,t.y),i=new rd(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Gm(t,e,n,i){const r=new rd(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jo(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function rd(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function o1(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Eo{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Eo.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Vm(e),Hm(i,e);let o=e.length;n.forEach(Vm);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Hm(i,n[l]);const a=Ww.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Vm(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Hm(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class _f extends Sn{constructor(e=new t0([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new pt(r,3)),this.setAttribute("uv",new pt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,h=n.steps!==void 0?n.steps:1,u=n.depth!==void 0?n.depth:1;let f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:p-.1,_=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3;const d=n.extrudePath,A=n.UVGenerator!==void 0?n.UVGenerator:a1;let v,y=!1,P,w,C,T;d&&(v=d.getSpacedPoints(h),y=!0,f=!1,P=d.computeFrenetFrames(h,!1),w=new U,C=new U,T=new U),f||(m=0,p=0,g=0,_=0);const B=a.extractPoints(c);let x=B.shape;const I=B.holes;if(!Eo.isClockWise(x)){x=x.reverse();for(let ne=0,b=I.length;ne<b;ne++){const ge=I[ne];Eo.isClockWise(ge)&&(I[ne]=ge.reverse())}}const F=Eo.triangulateShape(x,I),V=x;for(let ne=0,b=I.length;ne<b;ne++){const ge=I[ne];x=x.concat(ge)}function K(ne,b,ge){return b||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(b,ge)}const W=x.length,Q=F.length;function D(ne,b,ge){let pe,ce,ve;const Pe=ne.x-b.x,xe=ne.y-b.y,R=ge.x-ne.x,M=ge.y-ne.y,X=Pe*Pe+xe*xe,$=Pe*M-xe*R;if(Math.abs($)>Number.EPSILON){const oe=Math.sqrt(X),ee=Math.sqrt(R*R+M*M),Te=b.x-xe/oe,_e=b.y+Pe/oe,Me=ge.x-M/ee,Je=ge.y+R/ee,de=((Me-Te)*M-(Je-_e)*R)/(Pe*M-xe*R);pe=Te+Pe*de-ne.x,ce=_e+xe*de-ne.y;const Se=pe*pe+ce*ce;if(Se<=2)return new he(pe,ce);ve=Math.sqrt(Se/2)}else{let oe=!1;Pe>Number.EPSILON?R>Number.EPSILON&&(oe=!0):Pe<-Number.EPSILON?R<-Number.EPSILON&&(oe=!0):Math.sign(xe)===Math.sign(M)&&(oe=!0),oe?(pe=-xe,ce=Pe,ve=Math.sqrt(X)):(pe=Pe,ce=xe,ve=Math.sqrt(X/2))}return new he(pe/ve,ce/ve)}const j=[];for(let ne=0,b=V.length,ge=b-1,pe=ne+1;ne<b;ne++,ge++,pe++)ge===b&&(ge=0),pe===b&&(pe=0),j[ne]=D(V[ne],V[ge],V[pe]);const J=[];let ie,re=j.concat();for(let ne=0,b=I.length;ne<b;ne++){const ge=I[ne];ie=[];for(let pe=0,ce=ge.length,ve=ce-1,Pe=pe+1;pe<ce;pe++,ve++,Pe++)ve===ce&&(ve=0),Pe===ce&&(Pe=0),ie[pe]=D(ge[pe],ge[ve],ge[Pe]);J.push(ie),re=re.concat(ie)}for(let ne=0;ne<m;ne++){const b=ne/m,ge=p*Math.cos(b*Math.PI/2),pe=g*Math.sin(b*Math.PI/2)+_;for(let ce=0,ve=V.length;ce<ve;ce++){const Pe=K(V[ce],j[ce],pe);le(Pe.x,Pe.y,-ge)}for(let ce=0,ve=I.length;ce<ve;ce++){const Pe=I[ce];ie=J[ce];for(let xe=0,R=Pe.length;xe<R;xe++){const M=K(Pe[xe],ie[xe],pe);le(M.x,M.y,-ge)}}}const Ae=g+_;for(let ne=0;ne<W;ne++){const b=f?K(x[ne],re[ne],Ae):x[ne];y?(C.copy(P.normals[0]).multiplyScalar(b.x),w.copy(P.binormals[0]).multiplyScalar(b.y),T.copy(v[0]).add(C).add(w),le(T.x,T.y,T.z)):le(b.x,b.y,0)}for(let ne=1;ne<=h;ne++)for(let b=0;b<W;b++){const ge=f?K(x[b],re[b],Ae):x[b];y?(C.copy(P.normals[ne]).multiplyScalar(ge.x),w.copy(P.binormals[ne]).multiplyScalar(ge.y),T.copy(v[ne]).add(C).add(w),le(T.x,T.y,T.z)):le(ge.x,ge.y,u/h*ne)}for(let ne=m-1;ne>=0;ne--){const b=ne/m,ge=p*Math.cos(b*Math.PI/2),pe=g*Math.sin(b*Math.PI/2)+_;for(let ce=0,ve=V.length;ce<ve;ce++){const Pe=K(V[ce],j[ce],pe);le(Pe.x,Pe.y,u+ge)}for(let ce=0,ve=I.length;ce<ve;ce++){const Pe=I[ce];ie=J[ce];for(let xe=0,R=Pe.length;xe<R;xe++){const M=K(Pe[xe],ie[xe],pe);y?le(M.x,M.y+v[h-1].y,v[h-1].x+ge):le(M.x,M.y,u+ge)}}}H(),q();function H(){const ne=r.length/3;if(f){let b=0,ge=W*b;for(let pe=0;pe<Q;pe++){const ce=F[pe];Ue(ce[2]+ge,ce[1]+ge,ce[0]+ge)}b=h+m*2,ge=W*b;for(let pe=0;pe<Q;pe++){const ce=F[pe];Ue(ce[0]+ge,ce[1]+ge,ce[2]+ge)}}else{for(let b=0;b<Q;b++){const ge=F[b];Ue(ge[2],ge[1],ge[0])}for(let b=0;b<Q;b++){const ge=F[b];Ue(ge[0]+W*h,ge[1]+W*h,ge[2]+W*h)}}i.addGroup(ne,r.length/3-ne,0)}function q(){const ne=r.length/3;let b=0;ae(V,b),b+=V.length;for(let ge=0,pe=I.length;ge<pe;ge++){const ce=I[ge];ae(ce,b),b+=ce.length}i.addGroup(ne,r.length/3-ne,1)}function ae(ne,b){let ge=ne.length;for(;--ge>=0;){const pe=ge;let ce=ge-1;ce<0&&(ce=ne.length-1);for(let ve=0,Pe=h+m*2;ve<Pe;ve++){const xe=W*ve,R=W*(ve+1),M=b+pe+xe,X=b+ce+xe,$=b+ce+R,oe=b+pe+R;be(M,X,$,oe)}}}function le(ne,b,ge){l.push(ne),l.push(b),l.push(ge)}function Ue(ne,b,ge){Oe(ne),Oe(b),Oe(ge);const pe=r.length/3,ce=A.generateTopUV(i,r,pe-3,pe-2,pe-1);je(ce[0]),je(ce[1]),je(ce[2])}function be(ne,b,ge,pe){Oe(ne),Oe(b),Oe(pe),Oe(b),Oe(ge),Oe(pe);const ce=r.length/3,ve=A.generateSideWallUV(i,r,ce-6,ce-3,ce-2,ce-1);je(ve[0]),je(ve[1]),je(ve[3]),je(ve[1]),je(ve[2]),je(ve[3])}function Oe(ne){r.push(l[ne*3+0]),r.push(l[ne*3+1]),r.push(l[ne*3+2])}function je(ne){s.push(ne.x),s.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return l1(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new nd[r.type]().fromJSON(r)),new _f(i,e.options)}}const a1={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new he(s,o),new he(a,l),new he(c,h)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],f=e[r*3],p=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new he(o,1-l),new he(c,1-u),new he(f,1-g),new he(_,1-d)]:[new he(a,1-l),new he(h,1-u),new he(p,1-g),new he(m,1-d)]}};function l1(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class Cf extends Sn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],h=[];let u=e;const f=(n-e)/r,p=new U,g=new he;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const d=s+m/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/n+1)/2,g.y=(p.y/n+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<r;_++){const m=_*(i+1);for(let d=0;d<i;d++){const A=d+m,v=A,y=A+i+1,P=A+i+2,w=A+1;a.push(v,y,w),a.push(y,P,w)}}this.setIndex(a),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cf(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class xf extends Sn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new U,f=new U,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const A=[],v=d/i;let y=0;d===0&&o===0?y=.5/n:d===i&&l===Math.PI&&(y=-.5/n);for(let P=0;P<=n;P++){const w=P/n;u.x=-e*Math.cos(r+w*s)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(r+w*s)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+y,1-v),A.push(c++)}h.push(A)}for(let d=0;d<i;d++)for(let A=0;A<n;A++){const v=h[d][A+1],y=h[d][A],P=h[d+1][A],w=h[d+1][A+1];(d!==0||o>0)&&p.push(v,y,w),(d!==i-1||l<Math.PI)&&p.push(y,P,w)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xf(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class c1 extends na{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rv,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Wm={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class u1{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const h1=new u1;class yf{constructor(e){this.manager=e!==void 0?e:h1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}yf.DEFAULT_MATERIAL_NAME="__DEFAULT";class d1 extends yf{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Wm.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Xo("img");function l(){h(),Wm.add(e,this),n&&n(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class s0 extends yf{constructor(e){super(e)}load(e,n,i,r){const s=new sn,o=new d1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class o0 extends Qt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const yu=new at,jm=new U,Xm=new U;class f1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ff,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;jm.setFromMatrixPosition(e.matrixWorld),n.position.copy(jm),Xm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Xm),n.updateMatrixWorld(),yu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class p1 extends f1{constructor(){super(new jv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class m1 extends o0{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.shadow=new p1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class g1 extends o0{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ym{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Lt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class A1 extends kr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nf);class v1{parse(e){let n="",i=0,r=0,s=0;const o=new U,a=new Ye,l=new U,c=new he,h=[];function u(g){let _=0,m=0,d=0;const A=g.geometry,v=new He,y=A.getAttribute("position"),P=A.getAttribute("normal"),w=A.getAttribute("uv"),C=A.getIndex();if(n+="o "+g.name+`
`,g.material&&g.material.name&&(n+="usemtl "+g.material.name+`
`),y!==void 0)for(let T=0,B=y.count;T<B;T++,_++)o.fromBufferAttribute(y,T),o.applyMatrix4(g.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(w!==void 0)for(let T=0,B=w.count;T<B;T++,d++)c.fromBufferAttribute(w,T),n+="vt "+c.x+" "+c.y+`
`;if(P!==void 0){v.getNormalMatrix(g.matrixWorld);for(let T=0,B=P.count;T<B;T++,m++)l.fromBufferAttribute(P,T),l.applyMatrix3(v).normalize(),n+="vn "+l.x+" "+l.y+" "+l.z+`
`}if(C!==null)for(let T=0,B=C.count;T<B;T+=3){for(let x=0;x<3;x++){const I=C.getX(T+x)+1;h[x]=i+I+(P||w?"/"+(w?r+I:"")+(P?"/"+(s+I):""):"")}n+="f "+h.join(" ")+`
`}else for(let T=0,B=y.count;T<B;T+=3){for(let x=0;x<3;x++){const I=T+x+1;h[x]=i+I+(P||w?"/"+(w?r+I:"")+(P?"/"+(s+I):""):"")}n+="f "+h.join(" ")+`
`}i+=_,r+=d,s+=m}function f(g){let _=0;const m=g.geometry,d=g.type,A=m.getAttribute("position");if(n+="o "+g.name+`
`,A!==void 0)for(let v=0,y=A.count;v<y;v++,_++)o.fromBufferAttribute(A,v),o.applyMatrix4(g.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(d==="Line"){n+="l ";for(let v=1,y=A.count;v<=y;v++)n+=i+v+" ";n+=`
`}if(d==="LineSegments")for(let v=1,y=v+1,P=A.count;v<P;v+=2,y=v+1)n+="l "+(i+v)+" "+(i+y)+`
`;i+=_}function p(g){let _=0;const m=g.geometry,d=m.getAttribute("position"),A=m.getAttribute("color");if(n+="o "+g.name+`
`,d!==void 0){for(let v=0,y=d.count;v<y;v++,_++)o.fromBufferAttribute(d,v),o.applyMatrix4(g.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z,A!==void 0&&(a.fromBufferAttribute(A,v),$e.fromWorkingColorSpace(a,Hn),n+=" "+a.r+" "+a.g+" "+a.b),n+=`
`;n+="p ";for(let v=1,y=d.count;v<=y;v++)n+=i+v+" ";n+=`
`}i+=_}return e.traverse(function(g){g.isMesh===!0&&u(g),g.isLine===!0&&f(g),g.isPoints===!0&&p(g)}),n}}const Zm={type:"change"},If={type:"start"},a0={type:"end"},Ya=new Uv,Jm=new Hi,_1=Math.cos(70*Pv.DEG2RAD),bt=new U,ln=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Iu=1e-6;class C1 extends A1{constructor(e,n=null){super(e,n),this.state=st.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:ms.ROTATE,TWO:ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Dr,this._lastTargetPosition=new U,this._quat=new Dr().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ym,this._sphericalDelta=new Ym,this._scale=1,this._panOffset=new U,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new U,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=y1.bind(this),this._onPointerDown=x1.bind(this),this._onPointerUp=I1.bind(this),this._onContextMenu=b1.bind(this),this._onMouseWheel=E1.bind(this),this._onKeyDown=w1.bind(this),this._onTouchStart=T1.bind(this),this._onTouchMove=R1.bind(this),this._onMouseDown=M1.bind(this),this._onMouseMove=S1.bind(this),this._interceptControlDown=P1.bind(this),this._interceptControlUp=L1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zm),this.update(),this.state=st.NONE}update(e=null){const n=this.object.position;bt.copy(n).sub(this.target),bt.applyQuaternion(this._quat),this._spherical.setFromVector3(bt),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),r<-Math.PI?r+=ln:r>Math.PI&&(r-=ln),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(bt.setFromSpherical(this._spherical),bt.applyQuaternion(this._quatInverse),n.copy(this.target).add(bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=bt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ya.origin.copy(this.object.position),Ya.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ya.direction))<_1?this.object.lookAt(this.target):(Jm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ya.intersectPlane(Jm,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Iu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Iu||this._lastTargetPosition.distanceToSquared(this.target)>Iu?(this.dispatchEvent(Zm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){bt.setFromMatrixColumn(n,0),bt.multiplyScalar(-e),this._panOffset.add(bt)}_panUp(e,n){this.screenSpacePanning===!0?bt.setFromMatrixColumn(n,1):(bt.setFromMatrixColumn(n,0),bt.crossVectors(this.object.up,bt)),bt.multiplyScalar(e),this._panOffset.add(bt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;bt.copy(r).sub(this.target);let s=bt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/n.clientHeight),this._rotateUp(ln*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new he,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function x1(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function y1(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function I1(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(a0),this.state=st.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function M1(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=st.DOLLY;break;case Ms.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}break;case Ms.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(If)}function S1(t){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function E1(t){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(t.preventDefault(),this.dispatchEvent(If),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(a0))}function w1(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function T1(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case ms.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=st.TOUCH_ROTATE;break;case ms.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case ms.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=st.TOUCH_DOLLY_PAN;break;case ms.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(If)}function R1(t){switch(this._trackPointer(t),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=st.NONE}}function b1(t){this.enabled!==!1&&t.preventDefault()}function P1(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function L1(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const $n=Math.PI/180,N1=[[0,0],[30*$n,15*$n],[90*$n,0],[150*$n,-15*$n],[180*$n,0],[-90*$n,0],[0,-80*$n],[45*$n,-45*$n]];function D1([t,e,n]){return new Ye(t/255,e/255,n/255)}function Mf(t,e){return e==="finished"?{color:t.color,shine:t.shine,decal:t.decal,translucent:!1}:{color:t.default_color,shine:t.default_shine,decal:t.default_decal,translucent:e==="unfinished"&&!!t.translucent_unfinished}}const U1=`
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
  }`,O1=`
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
  }`;function Km(t){const e=new Pi({vertexShader:U1,fragmentShader:O1,side:_n,uniforms:{uMatColor:{value:t.color},uSpec:{value:t.spec},uShin:{value:Math.max(t.shin,1)},uAmb:{value:t.amb},uDif:{value:t.dif},uOpacity:{value:t.opacity},uUseMap:{value:0},uMap:{value:null},uTexMatrix:{value:new He},uLightDir:{value:new U(1,4,1)}}});return t.opacity<.999&&(e.transparent=!0,e.depthWrite=!1),e}function l0(t,e){t.uniforms.uMap.value=e,t.uniforms.uUseMap.value=1,e.matrixAutoUpdate&&e.updateMatrix(),t.uniforms.uTexMatrix.value.copy(e.matrix),t.needsUpdate=!0}function sd(t,e){const n=e==="figure"?1:.7692307692307692,i=(e==="figure"?.3:.5)*n,r=(e==="figure"?.7:1)*n;if(e==="figure"){const[l,c,h]=t.figure_color,u=m=>Math.max(.2,m/255)*2,f=new Ye(u(l),u(c),u(h)),p=40,g=p/128,_=new Ye(Math.max(f.r,.9)*g,Math.max(f.g,.9)*g,Math.max(f.b,.9)*g);return Km({color:f,spec:_,shin:p,amb:i,dif:r,opacity:1})}const s=Mf(t,e),o=Pv.clamp(s.shine,0,1),a=s.translucent?.2:(s.color[3]??255)/255;return Km({color:D1(s.color),spec:new Ye(o,o,o),shin:100*o,amb:i,dif:r,opacity:a})}function Qm(t){return t==="CLAMP"||t==="STICKER"?Ji:t==="MIRROR"?Fl:zs}const c0=t=>t.url.startsWith("/textures/");function F1(t){const e=new s0().load(t.url);e.colorSpace=Qn,e.wrapS=Qm(t.edge_mode),e.wrapT=Qm(t.edge_mode),e.matrixAutoUpdate=!1;const[n,i]=t.center,[r,s]=[t.scale[0]||1,t.scale[1]||1],[o,a]=t.offset,l=t.rotation||0,c=(m,d)=>new He().set(1,0,m,0,1,d,0,0,1),h=Math.cos(l),u=Math.sin(l),f=new He().set(h,-u,0,u,h,0,0,0,1),p=new He().set(r,0,0,0,s,0,0,0,1),g=c(-n,-i).multiply(f).multiply(c(n,i)).multiply(p).multiply(c(o,a)),_=new He().set(-1,0,1,0,-1,1,0,0,1);return e.matrix.copy(_.multiply(g)),e}function u0(t,e,n){const i=new s0().load(t);return i.colorSpace=Qn,i.wrapS=zs,i.wrapT=zs,i.repeat.set(Math.max(e,1),Math.max(n,1)),i}const Hl=.007;function k1(t,e,n){const i=new yi,r=sd(t.mat,e);n.push(r);const s=Mf(t.mat,e),o=e==="figure"&&(t.kind==="BodyTube"||t.kind==="Transition"&&!(t.cap_fore&&t.cap_aft));o&&(r.transparent=!0,r.depthWrite=!1,r.side=Ri,r.uniforms.uOpacity.value=.2,i.renderOrder=3);const a=m=>m.map(([d,A])=>new he(Math.max(A,1e-5),d)),l=m=>{const d=m.attributes.position;let A=1/0,v=-1/0;for(let w=0;w<d.count;w++){const C=d.getY(w);C<A&&(A=C),C>v&&(v=C)}const y=v-A||1,P=m.attributes.uv;for(let w=0;w<d.count;w++){let C=Math.atan2(d.getX(w),d.getZ(w));C<0&&(C+=Math.PI*2),P.setXY(w,C/(Math.PI*2),(d.getY(w)-A)/y)}P.needsUpdate=!0},c=new Vl(a(t.outer),96);l(c),n.push(c);const h=new Vt(c,r);if(h.rotation.z=-Math.PI/2,i.add(h),e!=="figure"&&s.decal){const m=s.decal;let d;if(c0(m)){const y=t.outer.map(([,C])=>C).filter(C=>C>1e-5),P=y.length?Math.max(...y):.01,w=t.outer[t.outer.length-1][0]-t.outer[0][0]||.05;d=u0(m.url,Math.round(2*Math.PI*P/Hl),Math.round(Math.abs(w)/Hl))}else d=F1(m);n.push(d);const A=r.clone();l0(A,d),A.uniforms.uMatColor.value.setRGB(1,1,1),A.uniforms.uSpec.value.setRGB(0,0,0),A.transparent=!0,A.depthWrite=!s.translucent,A.polygonOffset=!0,A.polygonOffsetFactor=-1,A.polygonOffsetUnits=-1,n.push(A);const v=new Vt(c,A);v.rotation.z=-Math.PI/2,i.add(v)}const u=m=>{m.transparent=!1,m.depthWrite=!0,m.uniforms.uOpacity.value=1,m.uniforms.uMatColor.value.multiplyScalar(.7),m.uniforms.uSpec.value.setRGB(0,0,0)},p=Math.max(...t.inner.map(([,m])=>m))>1e-4;if(p){const m=new Vl(a(t.inner),96);n.push(m);const d=r.clone();d.side=Kt,o&&u(d),n.push(d);const A=new Vt(m,d);A.rotation.z=-Math.PI/2,i.add(A)}else if(o){const m=r.clone();m.side=Kt,u(m),n.push(m);const d=new Vt(c,m);d.rotation.z=-Math.PI/2,i.add(d)}const g=r.clone();g.side=_n,n.push(g);const _=(m,d,A)=>{const v=A>1e-4?new Cf(A,d,96):new Af(d,96);n.push(v);const y=new Vt(v,g);return y.rotation.y=Math.PI/2,y.position.x=m,y};if(t.cap_fore){const m=t.outer[0],d=t.inner[0];i.add(_(m[0],m[1],p?d[1]:0))}if(t.cap_aft){const m=t.outer[t.outer.length-1],d=t.inner[t.inner.length-1];i.add(_(m[0],m[1],p?d[1]:0))}return s.translucent&&(i.renderOrder=2),i}function h0(t,e){const n=new yi,i=[],r=(s,o,a)=>{if(!o)return s;s.position.y=o;const l=new yi;return l.add(s),l.rotation.x=a||0,l};for(const s of t.lathe)s.outer.length<2||n.add(r(k1(s,e,i),s.radial,s.radial_angle));for(const s of t.fins){const o=new t0;if(s.outline&&s.outline.length>=3){o.moveTo(s.outline[0][0],s.outline[0][1]);for(let p=1;p<s.outline.length;p++)o.lineTo(s.outline[p][0],s.outline[p][1]);o.lineTo(s.outline[0][0],s.outline[0][1])}else o.moveTo(0,0),o.lineTo(s.root_chord,0),o.lineTo(s.sweep+s.tip_chord,s.height),o.lineTo(s.sweep,s.height),o.lineTo(0,0);const a=Math.max(s.thickness,1e-4),l=s.cross_section==="rounded"||s.cross_section==="airfoil",c=l?Math.min(a*.45,s.root_chord*.05):0,h=new _f(o,{depth:Math.max(a-2*c,1e-4),bevelEnabled:l,bevelThickness:c,bevelSize:c,bevelSegments:2,steps:1});h.translate(0,0,-a/2);const u=sd(s.mat,e);u.side=_n;const f=Mf(s.mat,e);if(e!=="figure"&&f.decal&&c0(f.decal)){const p=Math.max(s.root_chord,s.height,.02),g=u0(f.decal.url,Math.max(Math.round(p/Hl),1),Math.max(Math.round(p/Hl),1));i.push(g),l0(u,g)}i.push(h,u);for(let p=0;p<s.count;p++){const g=new Vt(h,u);g.rotation.y=s.cant_angle,g.position.set(s.axial_start,s.body_radius,0);const _=new yi;_.add(g),_.rotation.x=s.angle_offset+p/s.count*Math.PI*2,n.add(r(_,s.radial,s.radial_angle))}}for(const s of t.lugs){const o=new vf(s.outer_radius,s.outer_radius,Math.max(s.length,1e-4),24,1,!0);o.rotateZ(Math.PI/2);const a=sd(s.mat,e);a.side=_n,i.push(o,a);for(let l=0;l<s.count;l++){const c=new Vt(o,a);c.position.set(s.axial_start+s.length*(.5+l*1.2),s.body_radius+s.outer_radius,0);const h=new yi;h.add(c),h.rotation.x=s.angle_offset,n.add(r(h,s.radial,s.radial_angle))}}return{group:n,bin:i}}function d0({rv:t,mode:e="finished",preset:n="3d",raw:i=null,keyBg:r=!1}){const s=se.useRef(null);return se.useEffect(()=>{const o=s.current;if(!o)return;const a=o.clientWidth,l=o.clientHeight;$e.enabled=!1;const c=new bw;c.background=r?new Ye(1,0,1):new Ye(254/255,243/255,199/255);const h=new Rw({antialias:!0,preserveDrawingBuffer:!0});h.setPixelRatio(i!=null?1:Math.min(window.devicePixelRatio,2)),h.setSize(a,l),h.toneMapping=Mi,h.outputColorSpace=Qn,h.sortObjects=!0,o.appendChild(h.domElement);const u=new bn(15,a/l,.01,50);c.add(u);const f=Math.PI,p=(e==="figure"?.3:.5)*f,g=(e==="figure"?.7:1)*f;c.add(new g1(16777215,p));const _=new m1(16777215,g);_.position.set(1,4,1),u.add(_),u.add(_.target),_.target.position.set(0,0,0);const{group:m,bin:d}=h0(t,e);c.add(m),m.updateWorldMatrix(!0,!0);const A=new Xs().setFromObject(m);if(A.isEmpty())return h.render(c,u),()=>{d.forEach(j=>j.dispose()),h.dispose(),o.removeChild(h.domElement)};const v=A.min,y=A.max,P=Math.max(y.x-v.x,1e-4),w=(v.x+y.x)/2,C=Math.max(Math.hypot(v.y,v.z),Math.hypot(y.y,y.z),Math.hypot(v.y,y.z),Math.hypot(y.y,v.z),1e-4),T=new U(w,0,0);if(i!=null){const[j,J]=N1[i]??[0,0],ie=Math.max(Math.hypot(v.y,v.z),Math.hypot(y.y,y.z),1e-4),re=a/Math.max(l,1),Ae=15*re,H=P*1.2/2/Math.tan(Ae*Math.PI/360),q=2*ie*1.2/2/Math.tan(15*Math.PI/360),ae=Math.max(H,q,.001),le=new at().makeRotationY(j),Ue=new at().makeRotationX(J),be=new at().makeTranslation(-w,0,0),Oe=new at().makeScale(1,1,-1),je=le.multiply(Ue).multiply(be).multiply(Oe);m.matrixAutoUpdate=!1,m.matrix.copy(je),m.matrixWorldNeedsUpdate=!0,m.updateMatrixWorld(!0),u.fov=15,u.aspect=re,u.near=.1,u.far=50,u.up.set(0,1,0),u.position.set(0,0,ae),u.lookAt(0,0,0),u.updateProjectionMatrix(),h.render(c,u);let ne=0,b=0;const ge=()=>{h.render(c,u),++ne<8&&(b=requestAnimationFrame(ge))};return b=requestAnimationFrame(ge),()=>{cancelAnimationFrame(b),d.forEach(pe=>pe.dispose()),h.dispose(),o.removeChild(h.domElement)}}if(e!=="figure"){const j=Math.max(Math.min(...t.lathe.flatMap(ie=>ie.outer.map(([,re])=>re)).filter(ie=>ie>1e-4),C),.0025),J=(ie,re,Ae)=>{const H=new c1({color:ie,roughness:.5,metalness:0}),q=new xf(j*Ae,20,14);d.push(H,q);const ae=new Vt(q,H);ae.position.set(re,0,0),ae.renderOrder=3,m.add(ae)};J(2845951,t.cg_axial,.95),J(14753070,t.cp_axial,.8)}const B=15,x=j=>j*Math.PI/180,I=(j,J)=>{const ie=j/Math.max(J,1),re=B*ie,Ae=P*1.2/2/Math.tan(x(re)/2),H=2*C*1.2/2/Math.tan(x(B)/2);return Math.max(Ae,H,.001)};let N=I(a,l);u.near=Math.max(N/100,.001),u.far=N*100+P*8,(()=>{switch(n){case"top":u.position.set(T.x,N,0),u.up.set(0,0,-1);break;case"back":u.position.set(T.x+N,0,0),u.up.set(0,1,0);break;default:u.position.set(T.x,0,N),u.up.set(0,1,0)}u.lookAt(T),u.updateProjectionMatrix()})();const V=new C1(u,h.domElement);V.enableDamping=!0,V.target.copy(T);let K=0;const W=()=>{K=requestAnimationFrame(W),V.update(),h.render(c,u)};W();const Q=()=>{const j=o.clientWidth,J=o.clientHeight;u.aspect=j/J,N=I(j,J),u.near=Math.max(N/100,.001),u.far=N*100+P*8;const ie=u.position.clone().sub(V.target).normalize();u.position.copy(V.target).addScaledVector(ie,N),u.updateProjectionMatrix(),h.setSize(j,J)},D=new ResizeObserver(Q);return D.observe(o),()=>{cancelAnimationFrame(K),D.disconnect(),V.dispose(),d.forEach(j=>j.dispose()),h.dispose(),o.removeChild(h.domElement)}},[t,e,n,i,r]),S.jsx("div",{ref:s,style:{width:"100%",height:"100%"}})}function Sf(t){return(t||"rocket").replace(/\W+/g,"_").replace(/^_+|_+$/g,"")||"rocket"}function f0(t,e){const n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function z1(t,e,n,i){const r=["time_s"];r.push("altitude_m"),r.push("velocity_ms"),r.push("thrust_N");const s=t.time.map((a,l)=>{const c=[String(a)];return c.push(String(t.altitude[l])),c.push(String(t.velocity[l])),c.push(String(t.thrust[l])),c.join(",")}),o=new Blob([r.join(",")+`
`+s.join(`
`)],{type:"text/csv"});f0(o,`${Sf(e)}_${n||"sim"}.csv`)}function B1(t){const e=document.querySelector(".viewport canvas");if(!e)return!1;const n=e.toDataURL("image/png"),i=document.createElement("a");return i.href=n,i.download=`${Sf(t)}.png`,i.click(),!0}function G1(t,e){const{group:n,bin:i}=h0(t,"finished");try{n.updateMatrixWorld(!0);const r=new v1().parse(n);f0(new Blob([r],{type:"model/obj"}),`${Sf(e)}.obj`)}finally{i.forEach(r=>r.dispose())}}const qm=30,V1=20;function Wl(t){const[e,n,i]=t.figure_color;return`rgb(${e},${n},${i})`}function H1(t,e){return t==="Motor"?{stroke:"rgb(120,120,120)",fill:"rgb(150,150,150)",dash:""}:t==="Parachute"||t==="ShockCord"||t==="MassObject"?{stroke:Wl(e),fill:"none",dash:"6 4"}:t==="InnerTube"||t==="CenteringRing"?{stroke:"rgb(170,0,100)",fill:"none",dash:""}:{stroke:Wl(e),fill:"none",dash:""}}function p0({rv:t,raw:e=!1,rollDeg:n=0,overlay:i=null,onRollDelta:r}){const s=se.useRef(null),o=se.useRef(r);return o.current=r,se.useEffect(()=>{const a=s.current;if(!a||e)return;let l=null;const c=f=>{l=f.clientY,a.setPointerCapture?.(f.pointerId),a.style.cursor="ns-resize"},h=f=>{if(l==null||!o.current)return;const p=f.clientY-l;l=f.clientY,p&&o.current(p*.6)},u=()=>{l=null,a.style.cursor="grab"};return a.style.cursor="grab",a.addEventListener("pointerdown",c),a.addEventListener("pointermove",h),a.addEventListener("pointerup",u),a.addEventListener("pointerleave",u),()=>{a.removeEventListener("pointerdown",c),a.removeEventListener("pointermove",h),a.removeEventListener("pointerup",u),a.removeEventListener("pointerleave",u)}},[e]),se.useEffect(()=>{const a=s.current;if(!a)return;const l=e?1280:a.clientWidth||1e3,c=e?720:a.clientHeight||300,h=n*Math.PI/180;a.width=l,a.height=c;const u=a.getContext("2d");u.fillStyle="rgb(254,243,199)",u.fillRect(0,0,l,c);let f=1/0,p=-1/0,g=1e-4;for(const C of t.lathe){const T=Math.abs(C.radial||0);for(const[B,x]of C.outer)f=Math.min(f,B),p=Math.max(p,B),g=Math.max(g,x+T)}for(const C of t.fins){const T=(C.radial||0)+C.body_radius,B=C.outline&&C.outline.length?C.outline.map(([I])=>I):[0,C.root_chord,C.sweep+C.tip_chord,C.sweep],x=C.outline&&C.outline.length?Math.max(...C.outline.map(([,I])=>I)):C.height;f=Math.min(f,C.axial_start+Math.min(...B)),p=Math.max(p,C.axial_start+Math.max(...B)),g=Math.max(g,T+x)}for(const C of t.lugs)f=Math.min(f,C.axial_start),p=Math.max(p,C.axial_start+C.length),g=Math.max(g,(C.radial||0)+C.body_radius+C.outer_radius);isFinite(f)||(f=0,p=Math.max(t.total_length,1e-4));const _=Math.max(p-f,1e-4),m=Math.min((l-2*qm)/_,(c-2*V1)/(2*g)),d=(l-_*m)/2-f*m,A=c/2,v=C=>d+C*m,y=C=>A-C*m,P=(C,T)=>(C||0)*Math.cos((T||0)-h),w=(C,T,B=!0)=>{if(!(C.length<2)){u.beginPath(),u.moveTo(C[0][0],C[0][1]);for(let x=1;x<C.length;x++)u.lineTo(C[x][0],C[x][1]);B&&u.closePath(),u.setLineDash(T.dash?T.dash.split(" ").map(Number):[]),T.fill!=="none"&&(u.fillStyle=T.fill,u.fill()),u.strokeStyle=T.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([])}};u.strokeStyle="rgb(200,200,200)",u.setLineDash([4,4]),u.beginPath(),u.moveTo(v(f),A),u.lineTo(v(f+_),A),u.stroke(),u.setLineDash([]);for(const C of t.lathe){if(C.outer.length<2)continue;const T=P(C.radial,C.radial_angle),B=H1(C.kind,C.mat);if(C.kind==="Parachute"||C.kind==="ShockCord"||C.kind==="MassObject"){const N=C.outer[0][0],F=C.outer[C.outer.length-1][0],V=Math.max(...C.outer.map(([,re])=>re)),K=Math.abs(F-N),W=Math.min(K,2*V)*.7,Q=v(N),D=v(F),j=y(T+V),J=y(T-V),ie=W*m;if(u.beginPath(),u.roundRect(Math.min(Q,D),Math.min(j,J),Math.abs(D-Q),Math.abs(J-j),Math.max(0,Math.min(ie,Math.abs(D-Q)/2))),u.setLineDash(B.dash?B.dash.split(" ").map(Number):[]),u.strokeStyle=B.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([]),C.kind==="Parachute"){const re=(N+F)/2,Ae=T,H=K;let ae=2*V/2;ae>.75*H&&(ae=.75*H);const le=Ae+3*ae/4,Ue=Ae-ae/4;u.strokeStyle=B.stroke,u.lineWidth=1,u.beginPath(),u.arc(v(re),y(Ue),ae/2*m,Math.PI,2*Math.PI),u.stroke();const be=(Oe,je,ne,b)=>{u.beginPath(),u.moveTo(v(Oe),y(je)),u.lineTo(v(ne),y(b)),u.stroke()};be(re-ae/2,Ae-ae/4,re,le),be(re,le,re+ae/2,Ae-ae/4),be(re-ae/4,Ae-ae/4,re,le),be(re,le,re+ae/4,Ae-ae/4),be(re,Ae-ae/4,re,le)}if(C.kind==="ShockCord"){const re=N+K/4,Ae=K/2,H=T,q=2*V/4,ae=Ae/4;u.strokeStyle=B.stroke,u.lineWidth=1,u.beginPath(),u.moveTo(v(re),y(H));for(let le=0;le<4;le++)u.bezierCurveTo(v(re+(4*le+1)*ae/4),y(H+q),v(re+(4*le+1)*ae/4),y(H+q),v(re+(4*le+2)*ae/4),y(H)),u.bezierCurveTo(v(re+(4*le+3)*ae/4),y(H-q),v(re+(4*le+3)*ae/4),y(H-q),v(re+(4*le+4)*ae/4),y(H));u.stroke()}continue}const x=C.outer.map(([N,F])=>[v(N),y(F+T)]),I=C.outer.slice().reverse().map(([N,F])=>[v(N),y(-F+T)]);w([...x,...I],B,!0)}for(const C of t.fins){const T=P(C.radial,C.radial_angle),B=C.body_radius;let x;C.outline&&C.outline.length>=3?x=C.outline.map(([F,V])=>[F,V]):x=[[0,0],[C.root_chord,0],[C.sweep+C.tip_chord,C.height],[C.sweep,C.height]];const I={stroke:Wl(C.mat),fill:"none",dash:""},N=Math.max(C.count,1);for(let F=0;F<N;F++){const V=(C.radial_angle||0)+C.angle_offset+F/N*Math.PI*2,K=Math.cos(V-h);w(x.map(([W,Q])=>[v(C.axial_start+W),y(T+(B+Q)*K)]),I,!0)}}for(const C of t.lugs){const T=P(C.radial,C.radial_angle)+C.body_radius,B={stroke:Wl(C.mat),fill:"none",dash:""};w([[v(C.axial_start),y(T)],[v(C.axial_start+C.length),y(T)],[v(C.axial_start+C.length),y(T+C.outer_radius)],[v(C.axial_start),y(T+C.outer_radius)]],B,!0)}if(i&&!e){u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.font="11px -apple-system, Helvetica, Arial, sans-serif",u.textAlign="center",u.textBaseline="top",u.lineWidth=1,u.beginPath(),u.moveTo(v(0),20),u.lineTo(v(Math.ceil(p*100)/100),20);const T=Math.ceil(p*100);for(let Ae=0;Ae<=T;Ae++){const H=v(Ae/100),q=Ae%5===0;u.moveTo(H,20),u.lineTo(H,20+(q?9:Ae%1===0?5:3)),q&&u.fillText(String(Ae),H,31)}u.stroke();const B=20,x=Math.ceil(g*100);u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.textAlign="right",u.textBaseline="middle",u.beginPath(),u.moveTo(B,Math.max(y(g),0)),u.lineTo(B,Math.min(y(-g),c));for(let Ae=-x;Ae<=x;Ae++){const H=y(Ae/100);if(H<0||H>c)continue;const q=Ae%5===0;u.moveTo(B,H),u.lineTo(B+(q?9:5),H),q&&u.fillText(String(Math.abs(Ae)),B-3,H)}u.stroke();const I=Math.max(v(0),qm)+8,N="13px -apple-system, Helvetica, Arial, sans-serif";u.textBaseline="alphabetic";const F=19;u.textAlign="left",u.fillStyle="rgb(28,40,90)",u.font=N;let V=54;const K=i.mass_motors_g!=null?`${i.mass_motors_g.toFixed(i.mass_motors_g<100?1:0)} g`:"—";for(const Ae of[i.name,`Length ${i.length_cm.toFixed(1)} cm, max. diameter ${i.max_diam_cm.toFixed(1)} cm`,`Mass with no motors ${i.mass_g.toFixed(1)} g`,`Mass with motors ${K}`])u.fillText(Ae,I,V),V+=F;const W=l-12;u.textAlign="right";let Q=54;u.fillStyle="rgb(28,40,90)",u.fillText(`Stability: ${i.margin_cal.toFixed(2)} cal / ${i.margin_pct.toFixed(2)} %`,W,Q),Q+=F;const D=(Ae,H,q)=>{if(q==="cg"){u.beginPath(),u.arc(Ae,H,6.5,0,Math.PI*2),u.fillStyle="#fff",u.fill();for(const le of[-Math.PI/2,Math.PI/2])u.beginPath(),u.moveTo(Ae,H),u.arc(Ae,H,6.5,le,le+Math.PI/2),u.closePath(),u.fillStyle="#3552d6",u.fill();u.beginPath(),u.arc(Ae,H,6.5,0,Math.PI*2),u.strokeStyle="#1a1a1a",u.lineWidth=1,u.stroke()}else u.beginPath(),u.arc(Ae,H,6.5,0,Math.PI*2),u.fillStyle="#d3202a",u.fill(),u.strokeStyle="#7a1014",u.lineWidth=1,u.stroke()},j=`CG: ${i.cg_cm.toFixed(1)} cm`,J=`CP: ${i.cp_cm.toFixed(1)} cm`;u.fillStyle="rgb(28,40,90)",u.fillText(j,W,Q),D(W-u.measureText(j).width-12,Q-5,"cg"),Q+=F,u.fillStyle="rgb(28,40,90)",u.fillText(J,W,Q),D(W-u.measureText(J).width-12,Q-5,"cp"),Q+=F,u.fillStyle="rgb(140,140,140)",u.fillText(`at M=${i.mach.toFixed(3)}`,W,Q),u.textAlign="left",u.fillStyle="rgb(43,63,174)",u.font=N;let ie=c*.6;const re=(Ae,H)=>{u.fillText(Ae,I,ie),u.fillText(H,I+150,ie),ie+=F};re("Flight configuration:",i.config_name),i.apogee_m!=null&&re("Apogee:",`${i.apogee_m.toFixed(0)} m`),i.max_velocity_ms!=null&&re("Max. velocity:",`${i.max_velocity_ms.toFixed(1)} m/s`+(i.max_velocity_mach!=null?`  (Mach ${i.max_velocity_mach.toFixed(3)})`:"")),i.max_accel_ms2!=null&&re("Max. acceleration:",`${i.max_accel_ms2.toFixed(0)} m/s²`),D(v(i.cg_cm/100),A,"cg"),D(v(i.cp_cm/100),A,"cp")}},[t,e,n,i]),S.jsx("canvas",{ref:s,style:e?{width:1280,height:720,display:"block"}:{width:"100%",height:"100%"}})}function W1({fd:t}){const a=Math.max(...t.time,1),l=Math.max(...t.altitude,1),c=Math.max(...t.velocity,1),h=g=>50+g/a*800,u=g=>220-g/l*200,f=g=>220-g/c*200,p=g=>t.time.map((_,m)=>`${m===0?"M":"L"}${h(_).toFixed(1)},${g(m).toFixed(1)}`).join(" ");return S.jsxs("svg",{viewBox:"0 0 900 250",style:{width:"100%",height:"100%"},preserveAspectRatio:"xMidYMid meet",children:[S.jsx("line",{x1:50,y1:220,x2:850,y2:220,stroke:"#e7d8b0"}),S.jsx("line",{x1:50,y1:20,x2:50,y2:220,stroke:"#e7d8b0"}),S.jsx("path",{d:p(g=>u(t.altitude[g])),fill:"none",stroke:"#ec4899",strokeWidth:2}),S.jsx("path",{d:p(g=>f(t.velocity[g])),fill:"none",stroke:"#3a2a1a",strokeWidth:1.5,opacity:.7}),t.events.filter(([g])=>g<=a).map(([g,_],m)=>S.jsxs("g",{children:[S.jsx("line",{x1:h(g),y1:20,x2:h(g),y2:220,stroke:"#be2768",strokeDasharray:"3 3",opacity:.4}),S.jsx("text",{x:h(g)+3,y:30+m%3*12,fontSize:9,fill:"#9a7b56",children:_.replace(/_/g," ").toLowerCase()})]},m)),S.jsxs("text",{x:50,y:14,fontSize:11,fill:"#ec4899",children:["altitude (m), max ",l.toFixed(1)]}),S.jsxs("text",{x:730,y:14,fontSize:11,fill:"#3a2a1a",children:["velocity (m/s), max ",c.toFixed(1)]}),S.jsxs("text",{x:900/2,y:244,fontSize:10,fill:"#9a7b56",textAnchor:"middle",children:["time (s) — ",a.toFixed(1)," s"]})]})}const $m=[{key:"general",label:"General"},{key:"shoulder",label:"Shoulder"},{key:"override",label:"Override"},{key:"appearance",label:"Appearance"},{key:"comment",label:"Comment"}];let Ts=null;function j1({f:t,materials:e,onCommit:n}){const[i,r]=se.useState(String(t.value??"")),[s,o]=se.useState(!1),a=String(t.value??"");if(!s&&i!==a&&r(a),t.kind==="bool")return S.jsxs("label",{className:"prop-row",children:[S.jsx("span",{className:"prop-label",children:t.label}),S.jsx("input",{type:"checkbox",checked:t.value===!0,onChange:h=>n(h.target.checked)})]});if(t.kind==="enum")return S.jsxs("div",{className:"prop-row",children:[S.jsx("span",{className:"prop-label",children:t.label}),S.jsx(si,{value:String(t.value),onChange:h=>n(h),options:(t.options??[]).map(h=>({value:h,label:h}))})]});if(t.kind==="color"){const h=a.startsWith("#")?a:`#${a.replace(/[^0-9a-fA-F]/g,"")}`,u=h.length>=7?h.slice(0,7):"#cccccc",f=h.length>=9?h.slice(7,9):"ff";return S.jsxs("label",{className:"prop-row",children:[S.jsx("span",{className:"prop-label",children:t.label}),S.jsx("span",{className:"prop-input",children:S.jsx("input",{type:"color",value:u,onChange:p=>{n(`${p.target.value}${f}`.toUpperCase())}})})]})}if(t.key==="material_name"){const h=g=>g==="bulk"?"kg/m³":g==="surface"?"kg/m²":"kg/m",u=[...e].sort((g,_)=>(g.group+g.name).localeCompare(_.group+_.name)),p=[...u.some(g=>g.name===a)||!a?[]:[{value:a,label:`${a} (custom)`}],...u.map(g=>({value:g.name,label:`${g.name} — ${g.density} ${h(g.kind)} · ${g.group}`}))];return S.jsxs("div",{className:"prop-row",children:[S.jsx("span",{className:"prop-label",children:t.label}),S.jsx(si,{className:"material-select",value:a,onChange:g=>n(g),options:p})]})}const l=t.kind==="length"||t.kind==="number"||t.kind==="angle"||t.kind==="mass"||t.kind==="int",c=()=>{o(!1),i!==a&&n(l?Number(i):i)};return S.jsxs("label",{className:"prop-row",children:[S.jsx("span",{className:"prop-label",children:t.label}),S.jsxs("span",{className:"prop-input",children:[S.jsx("input",{type:l?"number":"text",step:t.kind==="int"?1:"any",value:i,onChange:h=>{o(!0),r(h.target.value)},onBlur:c,onKeyDown:h=>{h.key==="Enter"&&h.target.blur(),h.key==="Escape"&&(o(!1),r(a))}}),t.unit&&S.jsx("em",{className:"unit",children:t.unit})]})]})}function m0({fields:t,onCommit:e}){const[n,i]=se.useState(Ts??[]);return se.useEffect(()=>{Ts||fv().then(r=>{Ts=r.materials,i(r.materials)}).catch(()=>{})},[]),S.jsx(S.Fragment,{children:t.map(r=>S.jsx(j1,{f:r,materials:n,onCommit:s=>e(r.key,s)},r.key))})}function X1(t){const e=new Map,n=[];for(const s of t){const o=s.section??"general";e.has(o)||(e.set(o,[]),n.push(o)),e.get(o).push(s)}const i=$m.map(s=>s.key);return[...i.filter(s=>e.has(s)),...n.filter(s=>!i.includes(s))].map(s=>({key:s,label:$m.find(o=>o.key===s)?.label??s.charAt(0).toUpperCase()+s.slice(1),rows:e.get(s)}))}function Y1({node:t,onPatch:e,busy:n}){const[i,r]=se.useState(Ts??[]);se.useEffect(()=>{Ts||fv().then(u=>{Ts=u.materials,r(u.materials)}).catch(()=>{})},[]);const[s,o]=se.useState(null);se.useEffect(()=>{if(!t){o(null);return}let u=!0;return ZC(t.id).then(f=>{u&&o(f.mass_g)}).catch(()=>{u&&o(null)}),()=>{u=!1}},[t]);const a=se.useMemo(()=>t?X1(t.fields):[],[t]),[l,c]=se.useState(null);if(se.useEffect(()=>{c(a[0]?.key??null)},[t]),!t)return S.jsx("div",{className:"empty",children:"Select a component to edit it"});const h=a.find(u=>u.key===l)??a[0];return S.jsxs("div",{className:"prop-panel"+(n?" busy":""),children:[S.jsxs("div",{className:"prop-head",children:[S.jsx("strong",{children:t.name}),S.jsx("span",{className:"k",children:t.kind}),s!==null&&S.jsxs("span",{className:"mass-readout",title:"Component mass",children:[s<10?s.toFixed(2):s.toFixed(1)," g"]})]}),a.length>1&&S.jsx("div",{className:"prop-tabs",children:a.map(u=>S.jsx("button",{type:"button",className:"prop-tab"+(u.key===h?.key?" active":""),onClick:()=>c(u.key),children:u.label},u.key))}),S.jsx(m0,{fields:h?.rows??[],onCommit:(u,f)=>e(t.id,u,f)}),S.jsx("datalist",{id:"opsrocket-materials",children:i.map(u=>S.jsxs("option",{value:u.name,children:[u.density," · ",u.group]},u.name))})]})}const eg={BodyTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAAZiS0dEAO8A7wDvwcyDBQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAIASURBVDjLnZQ/bxNBEMV/ezN3570LdnzQ2AUuqNLjPh0fIU1akCiRa75DGlLzdTCVC5dQIJRIyPLJ55wv539LY5+dOEQJI620ejNv3mr2aQzwxhjzJYqi0Pd9AJxzGGP43/gXvyzLsiiKD8AvBT5dXFy8G4/H9Ho9AGazGcYYoig67GrAcNh0X6gsS+ZlyYt6/Q7e7/c5PT19D3z2Wq1W9/z8nMFggKqiqtTrdYIgoCiKCquO6CGmioggIqgqcRxTbzSYTqeIeFWu2+0Sx3EXwGu3223fV8qyrApEhCiKsNaS5/kdXETwPO8A24pu70EQkCQJk0lW5Wq1Gp1OpwOgYRhGi8USABG5M5ptozzPaTQaz/5rz/NoNpukaUqSJAA0m80EQJ1zbrVa4ZzD8zycA3AVOQxD1us1WZZxdHS0MxBuv2zrqgMIII5jRqMRx8fHqGoIoEVR5CLyEmC5XFLJul0L3/dZLBZkWfaw4TZOfgy31pKmKavVagmgo9Hoj6q+3hd+iLg1283NDbVa7UnC9zHf90nTNAPQq6urH1mWvRWRR4W3xNvbW6bTKdbavaLN6J/wkOvr698Aul6vv11eXp6dnJwcCD9EFhGcc0wmE6y1G1+4J01gOBwyHo+/b9YBr4wxX621cRAEz9pO9xdHZTCzm8R+zOfzeVEUH4GffwHkPeL5cv7alQAAAABJRU5ErkJggg==",CenteringRing:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XXjx4gAAAl1JREFUOI2NVEFrE0EU/mYnrSGb1MYkq7BJCwWpOVTwYFHYeKvNdSXgxRi9CMFCIT/AEk9eethjb/ZsqRfBYC8FQ3oXsdhTJSbZJqVpwYrN7szzYKvJZq1+8C7vffO+N2/4hhERvFh9uaoz4JZ2RXvSO3Fvdw8PIl7O/v4+6vU6UqkU4vH4UA8AiMdinQvB4JuvjcaLR4XCzkCRiIbiDJLosST5njyo1WqUy+VoZWWFcrkc1Wo1L+UU8i2RNP10Ar6jnoKBXIAp/TkhBCzLwsLCAgBgenoalmVhdnYWnHO/NiO+vf1W/bxcDhFgTExOPnV6vTutVmvcyxFCoNlsIp/PY3l5GVNTU4hGowMcXdcPxsbGXm1vbz9bWlpq99d8b2zeM78DeJdMpm64wr0qhRwSBoDFxUUAgKZpMAwDmUxmoM45b3HOd9Lpa23v2b+u2rbtYCikxhzHUaWUIAIYA0AEAgNjQDabBQAYhoG1tTWk02kAAGMMAKAoSnh0dOSybdvBmZnrP/5LWAoZOux2tePjbyFXSPxR/gUCUKlUUCwWUa1WYZomWrYNhTGcjgbOFTWsqjpJCgP4t/D6+usIGN2c0CciJ04vsLe3N8QRQiAcDgMAOp0Otra2ht44mUwq0YvjJx8+fQzcnZ8fbHCenYjkfSKq9BvEdV0yTZM2Nzd/h2ma5Lqun52qRPKBn865dgLgeBOcc5RKJViWhbm5OWxsbKBUKvlaiQAJMF8NXzud/VyXErGHriMyR0eHUS+n3W6j0WhA13VomuY7dSKR6KpqqLK7+6VcKBQ+99d+AnPTc/jWuLHGAAAAAElFTkSuQmCC",FinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVDhPnZSxboNADIZNBoREFlgrdgjN3KYTM8nCMyDxALxAO/AejdQhD1A6NF0yoKICI4g5ezMwsvTqI1ZVKbQcfBLy/db5jO3TSTABx3FMNPVZCXNzOBwyWo8Hk87xq+M4ZiIURcFw/xuF/zAjO4ad67rmer0m+T9JknDz0olfjEqMf/5gWdYmDEPyDJOmKTdxJ6aASTee57HT6URNHOZ4PPI2994FoYox2FRV9TmKItB1nbzDUJt7qx1MjEnnhmHUvu/DYrEgrxjU5ov5ckQq3vGE2GaSYjRNA2VZfuKyK3sU/DIFQcDatqWpibPf7/l8n+ioC/6sGIM2mqbd87nKskxecbKseyteO9GDtH3cXuHzdctmsIIv6Q4ktsrzHKqqoi3TsW0bltdLpigKlylI8A4MLcDHN21D3HmiXpQrAAAAAElFTkSuQmCC",InnerTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFvSURBVDhPvVTBSgMxFJwWWv2HhV7Wj7DePPQgXhRKUXqxX7aVHorgH7RQ+h8eZLHg0aSUxlY3zssGzdqtFCsOzM5sQt7khexWEKCf9CMOHNsqmsgqJxZZ00/9Gr1er5DxI6y1bXJI7oUkSSbkyJctoHQ3XHNJuSI7Sil0u103vlgsnO6K8XiMwWDwTNtk54/5aI5twRew6HD2ejqdYjTKN91qtZzuCgmO4/ie9o7Bop+oev0Gm/EhxGw2Q6PRcDRmiSVpjKEKQ29glqQfE8oa4oE8EhNiSzD7reSnsVqtUK/XHbWaY04qranC0CuouYaSMb4La7WalHglD8WEKA2WVAu8i5dACRcqzeIM0lKYGnrNOfFOnX/Ber2WEgfkm5gQpcFsNSOZDURRhDRNHb+Keg28dOre2bV2m1JuDSHHLMddQOnlyqw950Sb9uYPbvUT7Skv10b4Bnirz6zNbuVb3Af+O574sgUUOv6/PxfwAcCqiakft+coAAAAAElFTkSuQmCC",LaunchLug:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAI4npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja1ZhbduM6DkX/OYoegvgAQQ6Hz7XuDHr4vSHLrsRx6pZTX21XJFmiABAHOADKrf/+s91/+ESfskuiJdecDz6pphoaF+W4fdp59Ec6j7cf63rmP993R78eBG5FzvH2s+Rr/f2+fwi4nRpX8kFQGdeD/vlBTZf88iToUhTNosDFvATVS1AMtwf+EtBu2zpyLfpxC/3a2vX+zQ3FtsYh6in7IeT5d1K8N4WbMYQVfTw4xngZEO0vuNi4EI4hRlvIssZf5SjRX5bgkFd+enwqFm0zNb1c9AmVx9UTWnL30TNaKVxL4pOT8+P88r7z8hqV0/UfNKdyXYXP9/e4RZs7nrxvf3vPss89s4uWMq7O16buWzyvWEcUJlNdHKblQ/kTROj5rXwLegaozWMQsp3r6gNwbZ/89M1vv87z8AMTU1guKBchDOCymyVqqGGApI/Jvn4HBcMZC4iOE/YUw8MWf6qtx3CntoLm6VkaPMK8xcW7X/fuC3tbKnhvvgR6f8M3BHM2ZhhydmQZiPh9OVVOB9+/zx/DNYKgmJctRSqO7TcRXfwvJogn0JGFwvmWLl7nJQAXoVowxsNHHtR8FJ/9oSGo9ziyAFDD9BBT6CDgRcLEyJBizGBTgqnmFfXn0iCB2477kBlISMxRwYYsA6yUhPjRVIihJlGSiGRRKVKl5ZhTlpyzZiPFplGTU9GsqkWrthJLKlJy0VJKLa2GGiFNqblqLbXW1tDZkNx4u7GgtR567KmL67lrL732NgifkYaMPHSUUUebYcYJf8w8dZZZZ1t+EUorLVl56SqrrrYJtR3dTlt23rrLrrs9ULtg/fJ9AzV/oRZOpGyhPlDjrupdhDc6EcMMwIJLHsTVICCgg2F2FJ9SMOQMs6PCeFECRophNr0hBoJp+SDb37Fz4YaoIfdXuDlNn3ALP0XOGXRvIvcVt1eoTeO7cSJ2y0Jz6hHJPp6v0kJpVuy+nN13D949/z8K6q2R+0lhbjzffG0ZPk5l9k50wq97jKTZxXR4sPEye51HTOPQveIk0pETIiDMoJsKUevecU27X73ve+RyxFLR1PNecPaMcS+1N6/3PMXIt6x77I7QlLK9bFV7hVzaYmk3jadIAN+jlLndiumhEJhN5SuFH/Q9LP2k0V0qXyk81RFUpvCjvpcbdF8U/nCDbn9R+LMNuk8q/2KD7huFlzqNvW2pw0Mgo/rZWx7JmAzmShvCWX0ntI/u2hl89Iy/P8dplX/uw6xIbeY9IszSyhxzyGrJzZj3HN33VsQXzRxGq2sQ0bOT9GnVDoW1mrcf257HWMJYvUIluntfW8bU4uC13aGmfQypsw+li2CxrqOHOnZYQyGi1WfrPGheGtfLlw5LLSypNeTadbklMOFBR7oGTWg90obx++RyWDWpUmgIKqwWbVM66SKKaELW4GK3kNtu+M8p7K0Cx0KPjYa9gB9kRtPVaaekNV2xaFy+zkw5CD2MVH2ftjzhnzqYP0DBeTjVUPO7gMzGn1ysFaB4gSeBU3ZNfmSr+8QETaycVrF7fwuAPadAtQvc9YyUJN7ORzNICIGI85rueXaUUG0pbacgsUL8/IxnVN8lun0TeJd3SbvLMrb+IM1eNGmEIdtYKcc2ky7t2pw1t+uMjuXT3EWJct0qaW824s+X6XZIgFD7PtZp+wavM5mI8xOEFRzuGRsim/RMp+i75C9yKeinZHb1WfIp1yH4JnaFb2X+ibXud+a+Y637nbnvWOt+6txnye6nzn221j2by7Axcx8HUUfek6k7MyBshQoHa2jSZ6pLkl/jTPx9RveIrsKVYokEuay8SdKwJpMJQzTdSJy31O9bDqwRWg8hcQUWCmn1kGoZxUYntc5/URBRvfrIJKWWDCeWPNagWJa55sx00hn6SR2SmIWuRhicmI/gXoHrZoOPHm8tqGVFrBf6qloLc20Y5MlxpTX7XKgzdiKzV+9H6oGui1KeRbar5xjSK5kEZwkOKf/WMmxY4sgGDNaCEduo23XJY4L8Euu7ipkAjW7oCkce4FhIaO/XPMLUBI6BncRBSYFSNkNFxqVDIP98rNj4B+8GtHTgNBy4DYNPaGDDUzRrEOuelJgWafkCr7Y8KSKry6QftdrfqGuzDIVMaRE79KKYF808D3qUr0wXi6btaT8JJ4mtDcCrZl6l70ajurkHNFqWRuhIrUotAs73fEYyi2GtXkofto+o+AFlhcmZSOpryjr5q9JE2PJoQ3WSM/iJAd0pbhpfyGzmdKu0XC7Nqx6dLeLYOTIRUHYvoEjdc7MVChGOrIQ7wy+Nbasn9dpUfCaKzBsFE+ebgDyfQfqnWgAgoNpYrvaplB5l+qNv2DxZFXv7717VSyP0bjqtoVCH0m7/v6HcuwtK+r5I90vm34l0r8z8iUj3+53/uUj3p878N5HufXxei3R/A/lDJInn2i5QcbdpszaSY9SVGQFt6BqDaWDQl5Bq0CQ04GWYBjq+Vr0si/GYochE9sNFpGfOEeU0qGQ4nYvCVB6az0atUSgH2aQvli1aRxo3+y8NyA0ygPGm0GiFcxM5y2R4JP09g+FKNuX1tCaXpLJaHkWcUMhzbxzRNmPzrh3ReYr02Gm06EBW3JB64A501Kk+Z2Wgb20tCZRAj/TYQ2THu44Y/Vhqzcrk3ewdgzvVKBmbfzhDqpVe3T9YtrdE1zeSZ6aO9MiSdyBBvSbIvrUynFJSmGqVWrTsFbzNeAx7rBgofWeL1W2DjFt1+zCN3Wumo6KihUiv3isjPs2o321GSoT1nzMZlSAGx8UBAdN/WXzEE/0X98VGPYhkivu1gu7sm3efnvx6+4N4957e79W69/R+r9a9p9cqQk1SbaY6kejLVuNwl1tZRFsjjksiSUg0rTL0jkn55n6n+aaNCWeqodKaiBo/qHiAfSP818809CQmIegQOnlqLM6+L7nZeETpM4UwE0WbGVCEFCC1WooMXdRYylOkMUre9tuybykwi1WXCO1XjQLxVt3/AKNhqGvPP0ciAAAAZnpUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHjaPUoxEoAwDNrzCp/QQKrmOb3Wwc3B/59cBuESCMTu5522FWI3noHIWC3EH4DPBh6yg2DTAEvatUFWO9VeupyDbkxJp9dDRUz7APYTF2U6KKwlAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9biyIVBzOIiGSoTlZERRy1CkWoEGqFVh1MXvoHTRqSFBdHwbXg4M9i1cHFWVcHV0EQ/AFxdHJSdJES70sKLWK88Hgf591zeO8+IFgvM83qGAc03TZTibiYya6Kna8IQ0AAQxiTmWXMSVISvvV1T51UdzGe5d/3Z/WoOYsBAZF4lhmmTbxBPL1pG5z3iQVWlFXic+JRky5I/Mh1xeM3zgWXgzxTMNOpeWKBWCy0sdLGrGhqxFPEUVXTKT+Y8VjlvMVZK1dZ8578hZGcvrLMdVqDSGARS5AgQkEVJZRhI0a7ToqFFJ3HffwDrl8il0KuEhg5FlCBBtn1g//B79la+ckJLykSB8IvjvMxDHTuAo2a43wfO07jBAg9A1d6y1+pAzOfpNdaWvQI6N0GLq5bmrIHXO4A/U+GbMquFKIVzOeB9zP6pizQdwt0r3lza57j9AFI06ySN8DBITBSoOx1n3d3tc/t357m/H4AbdtypbcnsuwAAA0caVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjU3ZmUyYjRiLWRiNDAtNDRhZC04MTA1LTYyZGYyMjVkZjZhMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTAzZTBiMS1iNjA0LTRhNjMtOWJhZC0yNDdkNTQ0YzlkMzMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjRhYTdjYS05Y2Y3LTQ4MmMtOWRjOC1jMjA1NDg1OTYyZjMiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjUzMzU1MTkxMDQzMDc3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzAiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODAxYThlNWItYTBmYy00ZGZiLWIyZWEtYzYyNWRjZDczZjBlIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKE1hYyBPUykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMDUtMjNUMjE6MTk6NTEtMDQ6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+H5zV7AAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YFGAETM4556IwAAACzSURBVDjL7ZIxCsJQEERnIZ3kBDaCKFYeRI2kCr8PBI8kgZwiSPAA3kEUKw8gqcI3fxkrCyFg0AgWGVhYhoXHzi7Qq9ePJE3marGiqnYCKPaFtAKn25TPPo7jr6BZlgEAkk0ib4fDdUhbWZrI0FaWWiu1Vpa38qMykeFfbdwYQbAM2NUT5bu8+cYCmVM4BjETYEpgAmDkD/yhc641wDkHz/NePHu3IHmg8AziJMCRwAXA9QFOU34mj8JFigAAAABJRU5ErkJggg==",MassObject:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jexemgAAATRJREFUOI2dlL1OAkEUhb9L+IkJWvsItg4Wa2ICJYXhHXwLGyyk8EW2pjKRggI7EsPUPoAPQKHOZVcYi11IDMzu4km2mXvnnL35Zka894QkIntrxphz4A2YArfApbX249D+Iu9asBJWH5haa++A5zz8aEnZxMaYOpAe4Xlqrf2E4onrFYyugPl4PI5+1htarQZ4DyIIf1EMBoMJcANMykyrBPeAmVMXpUnC99fhpnb7DOAV6FYJrsK4G8fxvTrFafhTdcRx/JT/aKkKJ875RqoOXSWkaRLsbdR3VhfGmPaW87+Cyfi+L5fLCBH8Zh1sdE6pZcznVOBcFtwDZuo0EgGkgIx3SFavxLnwOnU6nZfR6LGvuiIL3n9Qtmo2G7tTPhw+zK2114VXtSQ4XCzXyWKx0FDxF6gHi1/NNGqOAAAAAElFTkSuQmCC",NoseCone:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABIAAAAAQAAAEgAAAABUGl4ZWxtYXRvciBQcm8gMi40LjUAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjI6MDc6MjYgMjI6MDA6NTcALR08jwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA7BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMi0wNy0yNlQyMjowMTozMi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDctMjZUMjI6MDA6NTctMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDIuNC41PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoLuYz4AAACM0lEQVQ4Ea1Uz4vaUBB+iVmLGpQtrhHdgmyD9UeMB/VQQ7eltSLa9lC8aHD1JgUR/4D+A3tb7/4D9ip73UMvnqRgBW3poYceexKKKMb0e1JDNki7u3TgkTcvM/PNvJnvMeSWkkqlDubzeRxuMZZlTzwej7xYLI5sNpuwXC7dHMcdbjabA7ogZDwec7DVrDCM9cCqi6J4zDDMKQI+A5CyXq8f2u32716v90exWHwhCALx+/2Efulyu90EtgSJkEwm8w1JidaY0+kUFnskEok8hvNbAL7RNO2+z+f7oqqqIssySSQSxOFwPIIbXX+VQqEgSpJEKpWKYQf9KxTNAA6HwxEcnKEqFYup1WoP8vk8SSaTBAl4Dc9bbCjoZDK55oEWfALW2RYYmyv0Q1IUZdJut4/j8Th7zfqOCuKQfr9v9tZLpdLRYDBIkGg0qqM6fTab6f9bMGw6bswcdtPr9T6g0EsOjWbQx6tyuSzxPP+z2WxG6RUHAgFzpnfaj0YjWpjZVx8OhzTwpXmqWQzVS/RAdTqdNSQzxrXLuVyOhEIhs/ON991ul6Bc0ul0dj56Op2ego7vzMC7nwQUuocBe46DV+j9aySDy+A/1+v1UzpsdLopbf4l1WqVtFotks1mDVNc8/tgMHi+F9iw+rPZcdnlcj1FQmlwMwye/orFYgLlMOhm8BgPypbHlMuNRsMaaqvT9t4IeJ83Mg/i/ARt+IjvBZI5XK1W9NXi0Sb6cj3Boi/XXozff/ULyDkzp7EAAAAASUVORK5CYII=",Parachute:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPlZM/aBNhGMafXHJJCOQOy6V1zJhFkKR0a4jg0MFBUKyDg3FSrGAHFaujIOqg0opOxsEhQgUHQQfBQDbp5uIYHKomwZjL3/Yudz7v9SJEmzQ+8OP57vv3fO/HdwFMqVwuF6KdJqfIPEkSxONxdLvdr4PB4BM/X5PNUqlky9gkTRXMUAlcJ1vF4qsTtVoVCSOB7W/bmDk0g1a7hdnZOSwvn3nLOXKoKwzfpI/VxGC/ygKZ33iykXJsB41fDYTDEUSjEdRrdRgJgxX34DgD6JoOJaRg5fLKF67ZIvlx1Qd931fJZPIxLbV2ay1tmiaq1So6nQ4s20KrZeJnowHL2kWv34PZNNFsNr12Nps1yuWyybVHK5XKO2+zvzS2YlZ7nnYjfyGfguNi17ZhWxbUUAguBxzXwU5/BxFWrgQUbyOLc0KqijDnsBOF5wWp/B6rfkEf0b7BDJ2jfd/72pOmaV61fER+D6DrulflUMFgELFYDO12G64rx/ujwwz/4bc9Kb6PyJ+0IE0ip15Mp9MqQ1fZLnI8IEjosC39Mp7JZFSGLvrrZP2Cv9+IJj4ukX/lD8gbcpN8JKvc7APHXAmlH2ffQ3KM3CUnyTWO/XPFQx0YLOLGBk3Cl8gzcpYcIRZRyWdSJBfJeyKhdfpYTRU8FA+Qoz0lGnlJrpP75ByRV3yJgXK9B+q/gkXMjtLukKtEfkd5bY/IbWb26VMI+A2/H99bU6xH7QAAAABJRU5ErkJggg==",ParallelStage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAFIXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7VdZluwmDP1nFVkCkhASy2E8JzvI8nPBru6u7n7zS34SUzZYyGi4kqDC/OvPFf7AxSQpJDXPJeeIK5VUuGLg8brKeVJM53m9pHuOnukhtnuCQRL0cr1avfkr6Pr6wUMGtWd68HuG/V6IXhY+l2zJezzeKgk6X/SHhqHMa5CL21tV271Qf5jir3d6Uevq9nt4Ihi8NBSChHkKSTxPvzSQfZNU9IYni4KPpJyxB3RJHrbCIU/mPfoY3zroycmPUXjvfe+fO5/rzSHvfJkfqOXPJ0jf0eVFPr8VLC8a8fMErWgfzLnvtYavNS/rasrwaL4j6jibHsuAEVGV5HyW0Qy3YmynFTSPNXZAPmJHBDaMCyGw4wqUaFClRfP0nTpUTDzZ0DN3ALVpLsaFu2yc0m602IDYEAdmnWcQAZlfdKEjtxx5nRySB4GVCYsRPvliC1+b/JEW1tp4E21nAnq6AOYd11BjI7ef4EoHiAs3PQ5+tBv++CawEKpAUI+bHQbW2K4lmtJrbMnBWcCn6K8UomDjXgAugmyFMiRAIGYSpUzRmI0IfnQAVKE5S+IGBEiVB5TkJJI5GDtv2fjG6PCycuZNRm3a6SMZueU7pwBWSor4seSIoaqiSVWzmnrQojVLTllzzpZ3kasmlkwtm5lbseriydWzm7sXr4WLoAZqycWKl1Jq5VAhqGKtCv4KSuMmLTVtuVnzVlrtCJ+euvbcrXsvvQ4eMlAmRh42fJRRJ4WJSjHT1JmnTZ9l1oVYW7LS0pWXLV9l1RfUblQ/tB9AjW7U+CC1+ewFNVCD2WMJ2uVEN2ZAjBMBcdsIIKB5YxadUuKN3MYsFkZSKENJ3diEQRsxQJgmsS56we4Vue/CLah/F278LeTChu53IBcA3UfcPkFt7H2uH8SuLNw+jYLsw/z0Gtjr3tTqr/b//kJzrE4DoJhpTakuo1xQuU8plVQCeRYftXUTHdEW0CtlrRRnSwseaAu/iSpNUwknjto29SNXuNh+foHH9+FXF3jMhJ9aQFGB0mCEiK/kbVhqMG1TnTrCsGNfdoTiwqEALl7C9bg7xm/34XsZTy+IzFhns2oZ8a69xTFGRxJhO0LgY/vybsCuSosrizaYE4tOh32yjpHY7FBRuPVxAmKlQ3XEQdI9CmUNMPjxwPFeZzgIO2Zf89AS2+5jXZKOVvDN4eU2yNa0deYD6s9arnSYbyV2DqE7SiDBntV4KHE0wOzWARqEVxVA3ErcKjwp8Cz+yIZZqEMjWU8Nkb5CVXhLSMechVFxhiYreQqnWqI0tTLHPnDumPhaH77F8L39/wv9FxeiIctNuoSSUXpmWazYtRI2U2xiFX8pfODvEs6CMjotrcN2ctBKHckxl538soFqgB5HshjMURtqnyhOXhTH4jmjl94nohyhHqvRCe/calzgGiLYxljyyUNbkNAzMinQrnjxmrc2TiKOlU/q9jSuZHaZ5XwoyKST+6ud4jE5t2z7JWxdUSNgSrUrn8FBVfbkF+YgIX8wNLy19FSjuCpk9GXtaNXmOP7wUkd5b9vDMtDDpxPY2D9YfNl7W3vbell67Azr1cyt6KsdxwdvbPwwc1m4y+22MZx6fJl5bEQd3GjqsrOfNB0ycU4hiEP1w5mtz0qlGJX9nU2t07ew8Lk0RBOOS6VaLzXpxNkb55p9aIp7U8tZOeEsa9jF8OfbSlEKvydB/rGFAMiA7eFvliENZp9IYd0AAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlIhUHO0hxyFAdxIKoiKNWoQgVQq3QqoPJpV/QpCFJcXEUXAsOfixWHVycdXVwFQTBDxA3NydFFynxf0mhRYwHx/14d+9x9w4QGhWmWV3jgKbbZjqZELO5VTH0ihCiEDCIUZlZxpwkpeA7vu4R4OtdnGf5n/tz9Kl5iwEBkXiWGaZNvEE8vWkbnPeJI6wkq8TnxGMmXZD4keuKx2+ciy4LPDNiZtLzxBFisdjBSgezkqkRTxHHVE2nfCHrscp5i7NWqbHWPfkLw3l9ZZnrNIeQxCKWIEGEghrKqMBGnFadFAtp2k/4+KOuXyKXQq4yGDkWUIUG2fWD/8Hvbq3C5ISXFE4A3S+O8zEMhHaBZt1xvo8dp3kCBJ+BK73trzaAmU/S620tdgT0bwMX121N2QMud4DBJ0M2ZVcK0hQKBeD9jL4pBwzcAr1rXm+tfZw+ABnqKnUDHBwCI0XKXvd5d09nb/+eafX3A2kDcqMkOXVkAAAQqWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MjhmNDZjZjYtZjkxMS00N2VlLWFjMGYtNWZkYTVlMzBkMzczIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmUxNDJkZWQ0LWNkY2UtNGIwZi1hNTNmLTAyY2Q3OGFlODg2MCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA0OThlMDJlLTZiMTAtNGUwYS05MDkyLWI0MGYxYjg5ZWIyNCIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjI3MjY2NTI3MDEzNjk3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMTgiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMSIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIgogICB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA3LTE4VDAwOjAxOjAwWiIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDctMTlUMDE6MzY6MDFaIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjNlMGIwMjYtNDJiMC00NzM2LTk2NTgtYzE0ZWZhNTY1YjQwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iLTA3OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Psyk3REAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBxoCHC4+/M+GAAAAVElEQVQoz82SMQ6AMAwDL9CRZ+ZZ+SQTUoeGha1IGLVDPVpJdFYMC+oCKtAAirLh7vnmR0TnmUiR4pxNz28/CT7vbayu6U9Ra4NYm3004fHQJ3AC3JijD/oG3iWyAAAAAElFTkSuQmCC",PodSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAACWSURBVCiRnZHLDcUgDATtV1aohTNdkS4oAIkD9JAOuFHA5JJI4ZMc3koWktlZW6CArKSqALq6+70BpRRR1WWi/jPpFfrScr3WGjFGWmvLxAmqtWKtlVqrXOcMAl1570kpAZBSYt93Rs80yRgjIQQ5jkNCCLJt27zf9RBdWs4Z5xw5565/+0REKKUwgmM9fQp8/slTt+8EQCyqrvdmJ/MAAAAASUVORK5CYII=",ShockCord:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVDhPrZNBaBNREIbnZYUIkXbTBJLiRWwl9FK6C4FqbXvooVoQpOBBJLdg25PXLYjiLZBCC7nYmrpBFDwIvXgQPQkBj22JPaxCSLw0aNpuD6EpTbP+k13TbpMKtn7w78yb3fdm35t5ghzMXdMyd0wqFgpU2izR6vraLMKZRCJRsr/4v3gcS3KnLPar+2Pd4e4nA6ryAaFRaEVV1VAwGHwMfYEsaBXqbUw6B80dM98Mo79ONCQE3RB1Gl5KvzjMZDJX8OoVtFwul7NIGoc/BT/Kc9qhadojmAV7RDQyMkoTE7dduVwDwzAuw1xHeIjIGtZ1PVepVNZTqVRzEQbJv8PcQ/I1O3IEkg7AfIJMbVbrFRZl6x7rjb/D/7zxgUPzqB22oB0k3YYtQ0WfzyfzixO8h27Zbgv3obdQdS45N2MJ6iJLtKzhShyJRKowvyD+AZNjp/AZ4h5oRx/E87O1Wo3HXTjWADvHObljBpOwY0E/4T+A3jWibrLQoO220MGPdDo9DRO20LdYL4BbM8bxP5ySWGzpL/Vr8E1cp692+AjUlstQQK1v2hEbjC/kcrkDJH0aj8efcQy7vYinjFq7jrslcSgc2vtRLH6EyzW80wi2ZxlK8tWCBqF5jDfz+XwUSflnA5IkOUcsAnWu9TFcXf0v8O5gktBdiPuBG27R6/WGYrEYl+cSujoIy2zguF/Lnf6EMz574r+BKzUO8xCalCQPXe3pIUVRSFVUJx/Rb0rvpw+X1b9ZAAAAAElFTkSuQmCC",Stage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAPBnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZppdhw5DoT/8xRzBO4gj8MFfG9uMMefD8ySZMlyj3vcrqdasjKZWAKBAMtO//Pv4/7FvxxidLlIq71Wz7/cc4+DN80//8Z9Dj7f5+eDvr4Ln487P19fRA4lXtPzsdXX+W/Hw/sCz8vgXflhobZeX8zPX/T8Wr99WSg+L8kssvf7tVB/LZTi80V4LTAet3ztTX50Yb5ce13/hKGZazzl9tnsnz4L0duF+6QYNYXkeY4pPgYk+wsuDd60+9w5Mdz3JQnPvH8tRkC+i5P/wSr3NSvv775kpezvk5Lqc4bjwOdg1vfXb4+H8uV4eku/hfiHO6f1ehc/H9/N61d33v7O2c2do493I1dCWl9Ovbl433EiaMvpXlZ5CH+F93IfnUdzoHeR8u0X0Jy87yGSlhNy2GGEE/S+rrAwMUeNwmuMi0TZsZYk9riSd+Qm2yOcKKmnTdZiWqQ3cTS+2xLuffu93QqNG+/AmTGwWDAoOHv6Jx6/XOgcg3wIFkxSH25+qHJLQ7AoJnvmLBISzhuOyg3w2+PrP8trIoPlhrnh4PDzWWKW8MKW4SjdRCdOLLw+tRZkvxYgRNy7YExIZMDXkEqowUuMEgJxbORnsFCLKcdJCkIpcWNlzClVktOi3ZtrJNxzY4nPYTiLRJRUKaRGgga5yhAb+JHcwNAoqeRSSi1SWull1FRzLbVWqUZ+Q5JkKVJFpEmX0VLLrbTapDXXehs99gQ5ll679NZ7H4ObDlYeXD04YYwZZ5p5llmnzDb7HAv4rLzKqktWc6uvseNOG57Ydctuu++hQYGSZi1aVbRp13GA2kknn3LqkdNOP+M9a8E9af3p8ftZC29ZizdTdqK8Z41LRd6WCEYnxXJGxmIOZFwsAwA6Ws58CzlHZ6mznPkeqYoSsbJYcnawjJHBrCGWE95z95G5T3lzOf9R3uJb5pyl7p/InLPU/SJzP+ftm6xt6zbLJ3czZGVoQfWJ8uMEbSO2YU3tt1/dL0+Yld6YAmsesp3TOT3IyftgR2mknyIkMbrPSHKWa5xkB/m6tnO/phQNY1JCOaVLm+lornUu+xZ+xWAAdFIHSsGO9aDJlft21sKd4jYjiPO1jG4bx9ldzugsRVjAkGKL3/MoKDinrmtZlQEfnTjxQ1c7Te7hFGC1uzI3SNtKUrkyg2hiK4sIa4vbrA5ps/a9yoWCqWibWe0jFtwFICOdqz1mvZn3l6/uf52Qylwdf1T6kLNPjGBotSZ2JOMe8Bm6xJ0ZgcYN2bEQnomvR7FYkx31ZK3JDXAa11r1YfHZZAsfu1I3NR3XwGoS2Wns0DsZpLoj7S/mfiLYHHNQRblpKvZXKCHgMcbVVVJ97L3ukMX5QsX5lcLIEnJtnNKAUhzt6eppQBo9zUbfGwgJWVgaqEnsnuAbeyZrb6d7LQnjdIqPUkOfndmzLr+lhzppk1Ps3BPXpnPCEXWvOSeEctZIs4+T9bTp4oUjxbfJF3jhArmwpFwFkTpupABbJCxnNRwrZcxdWZ6ukWek2lnY4Usq+2I2KLVbNeXSu4KHBoEEsYpMqwYiVKkWvKtZ++ZOde8J6ORe7VTbReymXiEbkkg4dOtJungpoLjKqgSjzHAUhOYCQRDBlUByWdpSonrcSEp6jF1QVgOyyTU1crVogHMeGl0em8yuk4A/Xa7O2rViDTi2hqi6cLO75ZWXdDCWHg9lRYgrcxpVinNhQ04Yhm+wqva+iJyeVffEfwomEEf4KdGO/OybVhxq2wuiTGuSQY0TWUQwa/LU/Zxq6vSclmO1Ewg+JEHtBYnFQOGIRQxAYs0xfdsoKQX7HQXnYW2kFVJwBQ6lsnapS4dmcFsUDJHfCE6pX19cyMXAztPx3LNMqnfUPdKeOesOlRQiZ0So4naTJtBtKX0S/+jnxoe2pTqUH6pQ0m4FAbKpN9FAkpIsStIDhr7LJFFhsiylRDS1ZnI5ek9Sdycw4odTq0Kst0nodEThMErnPVXZhR4B4QUjqij1KeOmDxl6ckxrhxKw6zjQTA1cdIuxBgRmPHfJ6rRCb/S0Dm1F7zl94+DRZAyyaJMwQz8nx+OM1qi3WxZhXbP8yyyjjHezMCA8DPoy7WXYm1nu2mVs9Bj21Sxz5bNZL6O4ySez3C3QeD4M+2LW70bLfYTrz6LlPsL1TbSAjDIGbDHOPk+E/HjOgMzvLSgM4aLHtXB9R6Fcg82nkM7vB9occj8HWtB4YVrl2PBzAjdlVdMZj5N7R3MGTdEabsEENIHlbJEnB1JOtkM/ouOLu+nXgXdYacWLN1NaRx5sQYr1iebO43DFRAfV03ukjcFaYL/YVGRdIcBbcWRaf+nM/XwJPQ0JZYssE+3IParMio0yo9ZihcXWgVEgAbipUKqnwq0l0FxW7jQFFy9BUK9IFBSa6NzDVJtn8kLhcV2ua09MRvntZaWpSBc/IBSza3r4UyMTZFvcdKIRaR+FGyA3JWoRXQyCsKJRPwMgvC4lQQamZTJ0ThZqIjxZBdlw0NkLCUFP9pwWNsjDva1IFyQL8SJQs2yYgoFhIXNQUb3yDlgz+NdAanUYjhINjqT8FXLparAQeQcYviEhg4ktuulTiwFNOrYTUXpkm4QWsdfRTFNBTMXbbIQ7CCtG0NVNbSq9HzWIBRgwinzAwX1TiNKRunWaCEGVHIxoCbK+NZC2ibIujFxIAoQYsjaWzijaamLoDU1qTAgI+vntfTSjSbvNfsakQI2oL9s8QHiAu0SnGmqCMIT9aFDX7bNptINwXTShdOGrVwhSLowCppnosjceodzaw92FMXYtTcq0kqPXEBx6lKAl6QKsheaOJKAVpCe5pcdl+kwNhbB3pgaofZHEsqxx0GYqCFG3UPunVSSLMJTS7WbkhL4CbYLgijBcUXN8f9FvekSYDo7PJlC7J8tA4oRb/YPRF/gwpIxo+Q2dq8F22MwOxm2kNV7ZF3MTatn0rgAO5HQ3eG9PsP/2sHB6szAisnAMZPu9/UU2ksAGgyWm/Jl09ZBDyAqRc9MwkdPG5Ta+HIrx+6Wua39nKRKJ4nqwj6oyvYt0uRbljtKgCMZuBwWA19AQ5RZRdFtQfIksIDHG7nNHG0p9RW1lqgwCMUUrFJv7wf/z0Ho12jUeG2ZWK/UCjlmB+p+epCCQGBGYdcZBuZ1MOdGOEDI75d1JecVtBSnK3AQRL0Q1qasTTW1bGPWUF5rfgmOD1o00sXF5P52sGu/bTHhPQNZcmGjtF9Gg8XZXBA3qcFH9K+FSW0YXlH+gaKGgPp9yhX4Edf9m9UkIeMlzQ78Y3SrjBJKHQkb80itqXIF5zsOj0ztshI1RnCZv3kZQnHi6/r63KK928lTZHFpu4+wXzHdQYYS46Yc0ur8UjPZanMSX1WTo5aZNb8g8I8inKWA15Y8EDTyr+acpNQedl+L7RDUfiI3midYu1cQm/DUh3FV1U2UdFUxf2NCZRVrX2qbwiRLcvpaNWdCzAEquB1sbpe25h2nnRRjoUYu+iWLWvC88KyL72MaCmJg3eyJsxUITdoD/WovMM0nRBIGIsiIJT8aqNrJlq3ewfzHVMvmPodIjrXkTrHotoo0+SmOKdLyR3GAvmuVkncp0iKUFBh4MfsSO/kYaN1pFGYN6O6ZJxZlSoOvTaUz7P5rDQELLoGfbtF8ubbBWlk9fID7sK74oDJXOKPj/v/zjavdnl3+c5P7s8o+r3Z9d/nG1+4vLb4G3e8HOWR4FaRsZdxK5ozwVv9NrgjQSRMsI0/ojdTnJiMQ46Z6+OwOjKY7bVugE/XAIQBeKeoadrfCiG1Y8zE/o66PlITbVTZ/NCdmiF7pp16HmQnrZtx+RbxzEuVbbjoYK4g406HftTEF2u4nGBY01MTyKlWSmB1LCdEzbf6PnTRNPTIxzJqbaXrNjpLRq4bx1twdKNzHl+zPEx6CUoqJ/1Qpr3jpAcSt+rLkvI4jJzOQ+ioD1BoQSbWU0wEIgmw6xYkb6MKtjwrn9g0UW+gVuYSCsKTCiqZuzCczQuF1/kX+xDYjdpU9FzgqTIHWOCqT/yiAGd/aHIE28KWOs7jajE3TZtD2IWXNEXZnBuxH5wuxZWjJbAUFa/hkYTIRnVetfMyM0tzmL/8iaXA++ECOFe+lAOGDEiyabw4JFh4H5jDF3x380OdRCQxmybKvoNt1UnG250GgPi4vlzkBZdoL/oBYYdxID8oU/lV72tKCHk/BuI4WnbWLU7rbtuEW1TZRaU1yL61Y/qqAUYc7kAkMWGiUlcHfXJoBiPobh0NUI1mVQRR/Bj6g1Ov7d9+vT9ORTALYtYRFhsPB33vIR3bvCICf1WPwJ0Ch4ZP3AQXMYQk8j6Xyvaq4oGjjbNiDWoPCmqVxURzm2g/S0KFodvGgsG5TQDUdL6Pu1F8ntQHfdZjxDUzGRQHsiyIwlEZ0HcPdtyRlb47YZR5mj8mi4NujSOGDbdDbNNKUoNoK2amccAw/DAtHsB6Fl1+DBd3uE7vd2GX/aVOQuN3e1NSBCIhya2UaBaXvor/HOSIAGD8CfndIjQ2wL0uY/jdQHPYvyG3e8ZMSyzRSl+ok5oUi2e7RXYVpA4s6c20B4RDzLo8flrbDxkKEOvOO835DQTLbtyAOGNINIK9NbmGiXiMKwH5qgCpvR/DqmA1ZTZJP9sJejTRq5UvTpOgcM1Fqss/1cm2pYNsB349juH7aNytCPlp+J0owJRcX8SUemCm07sEujDpGahZ4eNR5Xvf1QMLC4XVOAMmwdUegzPYIYGraQQVUFdbbMJ6O0xOgLtHOt1CLjep2QHjMKlC2151zAEgpFJQ5ybze3TSpvOwNMwgERRkunmhFqDehnPgXbT6SLAFcbm8rqHhUM7GJm9usL6kCIlm3S2eqFwlghGNAPk66ggbUiTAWJjOZwzJuoarTPtN8flv2W00O0nxkUpn028QkwQ+Khci4cbNf4ThCmNW3SGUWDo6KIe5jIc6MwCDXs0mGobSw32kiPJIGsIpKQ8Gt8DYgoYJuQe0JUFjdKU1RvjJnkxVpoHfarFFipHWOQRlScscOw/1JAjom5Rrsdg/NsF0VxtuykUFItrzGY1kgRgtJYWeKzHUg57+7+C5dmv+4HNCNeAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9bpaVUHOwg4pChOlkQK+qoVShChVArtOpg8tI/aNKQpLg4Cq4FB38Wqw4uzro6uAqC4A+Im5uToouUeF9SaBHjhcf7OO+ew3v3Af5mlalmzzigapaRSSWFXH5VCL4ihDB8mEZCYqY+J4ppeNbXPXVS3cV5lnffn9WnFEwG+ATiWaYbFvEG8dSmpXPeJ46ysqQQnxOPGXRB4keuyy6/cS457OeZUSObmSeOEgulLpa7mJUNlXiSOKaoGuX7cy4rnLc4q9U6a9+TvzBS0FaWuU5rGCksYgkiBMioo4IqLMRp10gxkaHzpId/yPGL5JLJVQEjxwJqUCE5fvA/+D1bs5iYcJMiSaD3xbY/RoDgLtBq2Pb3sW23ToDAM3Cldfy1JjDzSXqjo8WOgP5t4OK6o8l7wOUOMPikS4bkSAFa/mIReD+jb8oDA7dAeM2dW/scpw9AlmaVvgEODoHREmWve7w71D23f3va8/sBpJ1yu0dTFlwAABCpaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDozYzBmMzQ0My1jOWUxLTRjYjItYWYyMi1kY2JiNTk4OWI5OTUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2RkYjJlNmYtMGM1Yi00MGY2LTgzZmEtNTU4NGFiNjM5OGI1IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWQyZmUxY2MtNzZmOC00YWNiLWFhZmUtZWVhNjNmZGI0NGY3IgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2Mjg1NjA2NDAwNTUxMzQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjExIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDctMTdUMjM6NDc6NDFaIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0yN1QwMjowNDowOVoiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MTdkNmQxZS1kYTk0LTQ5MzEtOTA2Yi1mZjA4MmNiMTdmYTEiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSItMDc6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+8NgqrAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UICgE5FMAMuMQAAAD7SURBVDjLvZSxaoNgFIWP5YcM4tCl/I5uTuKmgi/RvaB9A0eh79Dg5lMEO/kadgsdXNpVLBWJOHi6RGiDTUL+0A/O9A13uOde4HrcAugBcJ/dmU4JTUq5zbKMJJnn+QeAlzOcGqZpPvm+P07TRJJ0HGcL4OGUUyZJktemaUiSwzDQtu1nAKtTbkYCWP/Yg2pm/nQSwFoI8eW67icAqnI4eMkJIcRbEARjXddG27b4L26Koogty9r1fQ8p5WWV1rRf2bNa8ocOZVneR1H0fsk+4zhmGIacm2sYBufmHnPKdF1353neON9qmqab+VaPuatQVdWjrutc+k5L7htzpyON+Z9ooQAAAABJRU5ErkJggg==",Transition:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++aqHwQAAAklJREFUOI2llEFLG0EUx3+T2ZhE3Qgek4qoaS0iVIgVLUIj9At4aI71C/QziBc/R/eqN++FBiq1eOrBiz2IhQielrhslOzM7OthYzC1lFAf/HlvZh7zf+/Pm1H8pzUaDQ9YBlaBV8A6sNJsNr0/c8fHx0HUCTn5plJOBL6rJ5AsVyqVYq1WY2lpiVqtRhAEnJ2dfT46OnpnkgSAiclJlBqiaQF7XvApqCpYlxwbpOoNSjZub2+HiA8PD7uVSmXiIUm9Xn9UYL1eZ2trazlJEnzfByCOY8plH/hLj1EUfYyi6GcURRKGodzd3Umv1xtge3tb2u22jGK7u7vSarXEOSfOOTHGSBiGg7Vz7otz7m0OoFQqDSFJEkQErTVaazY3Nzk9PSV1jjRNkTTzWXwPQSRlcXGRq6srlFIopdBaUy6XiaIIAOdcA8ADyOVyg+7HxsbQWpMkCUopPM9jenqam5sbjLFZknroFCCAQgH5fJ5ut4tzbkjVUqlEp9PB933b6XQy4jRNh5KUUuTzeXq9HsYYwjBkbm6OxJiMTIESYDA00t8EYwxa66E7RQSAQqFAHMdxoVAg129/CNZa0jTF8zystRwfH7O2toZLDNYYjDEkNvMZLMZkZ+fn51SrVay1WNvf78d9RX8AqFGnen5+fuLFi+fMzs6yuvqaqfJUXx7JVJCs4/fNZvvg4OBZsVh8PMWZtYC9Ud/xJLCys/Ph68XFBZeXv7i+vmZmZob7YhYWFgiCAFDs7+8P5H0S8b+KIftU6v345ag/1282snUWSFpDdAAAAABJRU5ErkJggg==",TubeFinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABkAAAAAQAAAGQAAAABUGl4ZWxtYXRvciBQcm8gMy40LjEAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjM6MDk6MjUgMTU6Mjk6MzcAVmv9YgAAAAlwSFlzAAAPYQAAD2EBqD+naQAAA7JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDMuNC4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTA5LTI1VDE1OjI5OjM3LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wOS0yNVQyMjowNTo1Ny0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+ChtzjeoAAAHPSURBVDgRxZPPSwJREMfnqQh16ZBFZYhakRERaNjFDksUYXrrWvQvFJGH/gL/jforhMgg6RBp1KVf0EpFStkvCovUtu9sbTyXUjs18NmZ997MvJ2ZXaJ/EtHovX6/X2vU1/DLZDIN5zdiqnQ4HJ6ITEe0jfUNjUU9U1lViXmP/TmuKpG0sEj2r2Zfb998aCxEO7s77ON0e9yUVbNsf4t5j/057tvBZNRtBbfYbreTo9VBiwuLtLS8ZEpRf/lTy/WLvYMBVxO9DgthHbXZRNAirENCUIeGU/GOxBZB6CvJL6CMK3rVXKks3Al5LxqJUuG2cFh8LW5SqZLRKpW95nLLqUDCGQR6QY+kPXIyw15bXaOr3JW+jMViujZfxJvyXjwep67OLm12bjaPo0twAc55xpUvytBv4BlkTahYq/2+/nxqK0XBkSCWn8LV1Zo3+/sGfAV4P4EXwHeUueIpGG7gAk7QBqzA+H3El82aAoHAJOu/SDqd3oZ/CTyAa5C34fEI7kAT4ORFwNUbF8PURUskEi60Tf/I/jLjZDJZUhSFZ8RV34MHbjW34QbwwTngth6BE3AscXKwf9At/VYrbk/tNiOW2B9x7TB5tjnAFRc+AHvu3kaAhLUbAAAAAElFTkSuQmCC"};function Z1({config:t,onWorkbench:e,setBusy:n,setErr:i,busy:r}){const[s,o]=se.useState([]),[a,l]=se.useState(""),[c,h]=se.useState(t.configs[0]?.config_id??""),[u,f]=se.useState(t.mounts[0]?.id??""),[p,g]=se.useState("0");se.useEffect(()=>{Ah().then(o).catch(C=>i(String(C)))},[i]);const _=se.useMemo(()=>{const C=new Map;for(const T of t.simulations)T.config_id&&C.set(T.config_id,T.name);return T=>C.get(T)??T.slice(0,8)},[t.simulations]),m=t.mounts.find(C=>C.id===u)??null,d=m?.assignments.find(C=>C.config_id===c)??null,A=se.useMemo(()=>{const C=a.trim().toLowerCase();return C?s.filter(T=>T.designation.toLowerCase().includes(C)||T.manufacturer.toLowerCase().includes(C)||T.class.toLowerCase()===C):s},[s,a]);async function v(C){n(!0),i(null);try{e(await C)}catch(T){i(String(T))}finally{n(!1)}}const y=C=>m&&v(cx(m.id,c,C.designation,C.digest,Number(p)||0)),P=se.useRef(null),w=async C=>{try{n(!0);const T=await C.text(),B=await KC(C.name,T),x=await Ah();o(x),i(`Imported ${B.designation}`)}catch(T){i(String(T))}finally{n(!1)}};return S.jsxs("div",{className:"motors"+(r?" busy":""),children:[S.jsxs("div",{className:"motors-top",children:[S.jsx("button",{type:"button",className:"ghost",onClick:()=>P.current?.click(),title:"Import a custom motor (.eng RASP)",children:"+ Motor…"}),S.jsx("input",{ref:P,type:"file",accept:".eng,text/plain",style:{display:"none"},onChange:C=>{const T=C.target.files?.[0];T&&w(T),C.target.value=""}}),S.jsxs("label",{children:["Configuration",S.jsx(si,{value:c,onChange:h,options:t.configs.map(C=>({value:C.config_id,label:C.name??_(C.config_id)}))})]}),S.jsxs("label",{children:["Mount",S.jsx(si,{value:u,onChange:f,options:t.mounts.map(C=>({value:C.id,label:`${C.name} (${C.kind})`}))})]}),S.jsxs("label",{children:["Ejection delay (s)",S.jsx("input",{type:"number",step:"any",value:p,onChange:C=>g(C.target.value),style:{width:70}})]}),S.jsxs("span",{className:"cur",children:["Loaded:"," ",S.jsx("b",{children:d?.designation??"— none —"}),d&&` · delay ${d.ejection_delay}s`,d&&S.jsx("button",{className:"link",onClick:()=>m&&v(ux(m.id,c)),children:"clear"})]})]}),S.jsx("input",{className:"motor-search",placeholder:"Filter by designation, manufacturer, or class (A/B/C…)",value:a,onChange:C=>l(C.target.value)}),S.jsx("div",{className:"motor-table",children:S.jsxs("table",{children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"Cls"}),S.jsx("th",{children:"Motor"}),S.jsx("th",{children:"Manufacturer"}),S.jsx("th",{children:"Ø mm"}),S.jsx("th",{children:"Impulse"}),S.jsx("th",{children:"Avg N"}),S.jsx("th",{children:"Burn s"}),S.jsx("th",{children:"Mass g"}),S.jsx("th",{children:"Delays"})]})}),S.jsx("tbody",{children:A.map(C=>{const T=d?.designation===C.designation&&(d?.digest??C.digest)===C.digest;return S.jsxs("tr",{className:T?"sel":"",onClick:()=>y(C),children:[S.jsx("td",{children:C.class}),S.jsx("td",{children:S.jsx("b",{children:C.designation})}),S.jsx("td",{children:C.manufacturer.replace(/_/g," ")}),S.jsx("td",{children:C.diameter_mm.toFixed(0)}),S.jsx("td",{children:C.total_impulse.toFixed(1)}),S.jsx("td",{children:C.avg_thrust.toFixed(1)}),S.jsx("td",{children:C.burn_time.toFixed(2)}),S.jsx("td",{children:C.total_mass_g.toFixed(1)}),S.jsx("td",{children:C.delays.filter(B=>B<100).join(",")||"—"})]},C.file)})})]})})]})}const J1=["length","number","angle","mass","int"];function K1({tree:t,sim:e,setErr:n}){const[i,r]=se.useState(null),[s,o]=se.useState("0.3"),a=se.useMemo(()=>t.filter(I=>I.kind!=="Stage"),[t]),[l,c]=se.useState(a[0]?.id??""),h=a.find(I=>I.id===l)??a[0],u=(h?.fields??[]).filter(I=>J1.includes(I.kind)),[f,p]=se.useState(u[0]?.key??""),[g,_]=se.useState({min:"10",max:"80",steps:"15"}),[m,d]=se.useState("max_apogee"),[A,v]=se.useState("100"),[y,P]=se.useState("1"),[w,C]=se.useState(null),[T,B]=se.useState(!1);se.useEffect(()=>{ax(Number(s)||.3).then(r).catch(I=>n(String(I)))},[s,n]);async function x(){if(!(!h||!f)){B(!0),n(null);try{C(await lx({sim_name:e||null,comp_id:h.id,key:f,min:Number(g.min),max:Number(g.max),steps:Number(g.steps),goal:m,target:Number(A),min_margin:Number(y)}))}catch(I){n(String(I))}finally{B(!1)}}}return S.jsxs("div",{className:"analysis",children:[S.jsxs("div",{className:"an-sec",children:[S.jsxs("div",{className:"an-head",children:[S.jsx("span",{children:"Component analysis"}),S.jsxs("label",{children:["Mach",S.jsx("input",{type:"number",step:"0.05",value:s,onChange:I=>o(I.target.value),style:{width:64}})]})]}),i&&S.jsxs("table",{children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"Component"}),S.jsx("th",{children:"CNα"}),S.jsx("th",{children:"CP cm"}),S.jsx("th",{children:"CD fric"}),S.jsx("th",{children:"CD press"}),S.jsx("th",{children:"CD share"})]})}),S.jsxs("tbody",{children:[i.rows.map(I=>S.jsxs("tr",{children:[S.jsxs("td",{children:[S.jsx("b",{children:I.name})," ",S.jsx("span",{className:"k",children:I.kind})]}),S.jsx("td",{children:I.cn_alpha.toFixed(3)}),S.jsx("td",{children:I.cp_cm.toFixed(2)}),S.jsx("td",{children:I.cd_friction.toFixed(4)}),S.jsx("td",{children:I.cd_pressure.toFixed(4)}),S.jsxs("td",{children:[(I.cd_share*100).toFixed(1),"%"]})]},I.id)),S.jsxs("tr",{className:"tot",children:[S.jsxs("td",{children:["Total (+ base ",i.cd_base.toFixed(3),")"]}),S.jsx("td",{children:i.cn_alpha_total.toFixed(3)}),S.jsx("td",{children:i.cp_cm.toFixed(2)}),S.jsx("td",{colSpan:2}),S.jsxs("td",{children:["CD ",i.cd_total.toFixed(4)]})]})]})]})]}),S.jsxs("div",{className:"an-sec",children:[S.jsx("div",{className:"an-head",children:S.jsx("span",{children:"Optimize (1-D sweep)"})}),S.jsxs("div",{className:"opt-form",children:[S.jsxs("label",{children:["Component",S.jsx(si,{value:l,onChange:I=>{c(I),p("")},options:a.map(I=>({value:I.id,label:`${I.name} (${I.kind})`}))})]}),S.jsxs("label",{children:["Parameter",S.jsx(si,{value:f||u[0]?.key||"",onChange:p,options:u.map(I=>({value:I.key,label:I.label+(I.unit?` (${I.unit})`:"")}))})]}),S.jsxs("label",{children:["Min",S.jsx("input",{type:"number",value:g.min,onChange:I=>_({...g,min:I.target.value})})]}),S.jsxs("label",{children:["Max",S.jsx("input",{type:"number",value:g.max,onChange:I=>_({...g,max:I.target.value})})]}),S.jsxs("label",{children:["Steps",S.jsx("input",{type:"number",value:g.steps,onChange:I=>_({...g,steps:I.target.value})})]}),S.jsxs("label",{children:["Goal",S.jsx(si,{value:m,onChange:d,options:[{value:"max_apogee",label:"Max apogee"},{value:"target_apogee",label:"Target apogee"}]})]}),m==="target_apogee"&&S.jsxs("label",{children:["Target m",S.jsx("input",{type:"number",value:A,onChange:I=>v(I.target.value)})]}),S.jsxs("label",{children:["Min stab cal",S.jsx("input",{type:"number",step:"0.5",value:y,onChange:I=>P(I.target.value)})]}),S.jsx("button",{onClick:x,disabled:T,children:T?"Running…":"Run sweep"})]}),w&&S.jsxs("div",{className:"opt-res",children:[S.jsxs("p",{children:["Baseline ",S.jsx("b",{children:w.baseline_value.toFixed(2)})," ·"," ",w.best_value!=null?S.jsxs(S.Fragment,{children:["Best"," ",S.jsx("b",{className:"hit",children:w.best_value.toFixed(2)})," ","→ apogee"," ",S.jsxs("b",{children:[w.best_apogee?.toFixed(1)," m"]})]}):S.jsx("span",{className:"bad",children:"No feasible point (all unstable)"})]}),S.jsxs("table",{children:[S.jsx("thead",{children:S.jsxs("tr",{children:[S.jsx("th",{children:"Value"}),S.jsx("th",{children:"Apogee m"}),S.jsx("th",{children:"Stability cal"}),S.jsx("th",{})]})}),S.jsx("tbody",{children:w.points.map((I,N)=>S.jsxs("tr",{className:I.value===w.best_value?"sel":"",children:[S.jsx("td",{children:I.value.toFixed(2)}),S.jsx("td",{children:I.apogee.toFixed(1)}),S.jsx("td",{children:I.margin_cal.toFixed(2)}),S.jsx("td",{children:I.feasible?"":S.jsx("span",{className:"bad",children:"unstable"})})]},N))})]})]})]})]})}const Q1={wind_average:[0,25],wind_standard_deviation:[0,5],wind_turbulence:[0,1],wind_direction:[0,360],launch_latitude:[-90,90],launch_longitude:[-180,180],launch_altitude:[0,5e3],launch_rod_length:[.3,3],launch_rod_angle:[0,45],launch_rod_direction:[0,360],launch_temperature:[-40,60],launch_pressure:[800,1100],time_step:[.005,.1],max_time:[30,1200]},q1=[{section:"wind",title:"Wind"},{section:"site",title:"Launch site"},{section:"atmosphere",title:"Atmospheric conditions"},{section:"rod",title:"Launch rod"}];function g0(t){const e={};for(const n of t){const i=n.section??"options";(e[i]??=[]).push(n)}return e}function od({field:t,onCommit:e,disabled:n=!1}){const[i,r]=se.useState(String(t.value??"")),[s,o]=se.useState(!1),a=String(t.value??"");if(!s&&i!==a&&r(a),t.kind==="bool")return S.jsxs("label",{className:"sim-row sim-row-bool"+(n?" disabled":""),children:[S.jsx("input",{type:"checkbox",checked:t.value===!0,disabled:n,onChange:u=>e(u.target.checked)}),S.jsx("span",{className:"sim-label",children:t.label})]});if(t.kind==="enum")return S.jsxs("div",{className:"sim-row sim-row-enum"+(n?" disabled":""),children:[S.jsx("span",{className:"sim-label",children:t.label}),S.jsx(si,{className:"sim-enum",value:a,onChange:u=>e(u),disabled:n,options:(t.options??[]).map(u=>({value:u,label:u}))})]});const l=t.kind==="length"||t.kind==="number"||t.kind==="angle"||t.kind==="mass"||t.kind==="int",c=Q1[t.key],h=()=>{o(!1),i!==a&&e(l?Number(i):i)};return S.jsxs("div",{className:"sim-row"+(n?" disabled":""),children:[S.jsx("span",{className:"sim-label",children:t.label}),S.jsx("input",{className:"sim-input",type:l?"number":"text",step:t.kind==="int"?1:"any",disabled:n,value:i,onChange:u=>{o(!0),r(u.target.value)},onBlur:h,onKeyDown:u=>{u.key==="Enter"&&u.target.blur(),u.key==="Escape"&&(o(!1),r(a))}}),S.jsx("span",{className:"sim-unit",children:t.unit??""}),l&&c&&S.jsx("input",{className:"sim-slider",type:"range",min:c[0],max:c[1],step:(c[1]-c[0])/100,disabled:n,value:Number(i)||0,onChange:u=>{o(!1);const f=Number(u.target.value);r(String(f)),e(f)}})]})}function dc({title:t,children:e}){return S.jsxs("fieldset",{className:"sim-fieldset",children:[S.jsx("legend",{children:t}),e]})}function $1({sim:t,simNode:e,onPatch:n}){const i=se.useMemo(()=>g0(e.fields),[e]),r=(i.atmosphere??[]).find(o=>o.key==="use_isa")?.value===!0,s=(i.rod??[]).find(o=>o.key==="launch_into_wind")?.value===!0;return S.jsx("div",{className:"sim-launch",children:q1.map(o=>{const a=(i[o.section]??[]).filter(l=>l.key!=="geodetic_method");return S.jsx(dc,{title:o.title,children:a.map(l=>{const c=o.section==="atmosphere"&&(l.key==="launch_temperature"||l.key==="launch_pressure")&&r||o.section==="rod"&&l.key==="launch_rod_direction"&&s;return S.jsx(od,{field:l,disabled:c,onCommit:h=>n(t,l.key,h)},l.key)})},o.section)})})}function eT({sim:t,simNode:e,onPatch:n}){const i=g0(e.fields),r=i.options??[],s=(i.site??[]).find(o=>o.key==="geodetic_method");return S.jsxs(dc,{title:"Simulator options",children:[S.jsxs("div",{className:"sim-row sim-row-static",children:[S.jsx("span",{className:"sim-label",children:"Calculation method"}),S.jsx("span",{className:"sim-static",children:"Extended Barrowman"})]}),S.jsxs("div",{className:"sim-row sim-row-static",children:[S.jsx("span",{className:"sim-label",children:"Simulation method"}),S.jsx("span",{className:"sim-static",children:"6-DOF Runge–Kutta 4 (adaptive)"})]}),s&&S.jsx(od,{field:s,onCommit:o=>n(t,s.key,o)}),r.map(o=>S.jsx(od,{field:o,onCommit:a=>n(t,o.key,a)},o.key))]})}function tT({sim:t}){const[e,n]=se.useState(null),[i,r]=se.useState(null);return se.useEffect(()=>{let s=!0;return n(null),r(null),pv(t).then(o=>{s&&n(o.warnings??[])}).catch(o=>{s&&r(String(o))}),()=>{s=!1}},[t]),i?S.jsxs("div",{className:"empty",children:["Could not load warnings: ",i]}):e===null?S.jsx("div",{className:"empty",children:"Checking…"}):e.length?S.jsx("ul",{className:"warn-list",children:e.map((s,o)=>S.jsxs("li",{className:`warn warn-${s.kind}`,children:[S.jsx("span",{className:"warn-icon","aria-hidden":"true",children:s.kind==="error"?"✕":s.kind==="warn"?"▲":"ℹ"}),S.jsxs("div",{children:[S.jsx("div",{className:"warn-msg",children:s.message}),S.jsx("div",{className:"warn-cat",children:s.category})]})]},o))}):S.jsx("div",{className:"empty",children:"No warnings — design and sim look healthy."})}function nT({sim:t,rocketName:e}){const[n,i]=se.useState(null),[r,s]=se.useState(new Set),[o,a]=se.useState(!1),[l,c]=se.useState(null);se.useEffect(()=>{let g=!0;return JC().then(_=>{g&&(i(_.columns),s(new Set(_.columns)))}).catch(_=>g&&c(String(_))),()=>{g=!1}},[]);const h=g=>{const _=new Set(r);_.has(g)?_.delete(g):_.add(g),s(_)},u=()=>s(new Set(n??[])),f=()=>s(new Set(["Time"])),p=async()=>{if(n){a(!0),c(null);try{const g=n.filter(A=>r.has(A)),_=await QC(t||null,g),m=new Blob([_],{type:"text/csv"}),d=document.createElement("a");d.href=URL.createObjectURL(m),d.download=`${(e||"rocket").replace(/\W+/g,"_")}_${t||"sim"}.csv`,d.click(),URL.revokeObjectURL(d.href)}catch(g){c(String(g))}finally{a(!1)}}};return l?S.jsxs("div",{className:"empty",children:["Error: ",l]}):n?S.jsxs(dc,{title:`Columns (${r.size} / ${n.length})`,children:[S.jsxs("div",{className:"csv-toolbar",children:[S.jsx("button",{type:"button",className:"ghost",onClick:u,children:"Select all"}),S.jsx("button",{type:"button",className:"ghost",onClick:f,children:"Time only"}),S.jsx("button",{type:"button",onClick:p,disabled:o||!t,children:o?"Running sim…":"Download CSV"})]}),S.jsx("div",{className:"csv-cols",children:n.map(g=>S.jsxs("label",{className:"csv-col",children:[S.jsx("input",{type:"checkbox",checked:r.has(g),disabled:g==="Time",onChange:()=>h(g)}),S.jsx("span",{children:g})]},g))})]}):S.jsx("div",{className:"empty",children:"Loading column list…"})}function iT({toggles:t,onChange:e,trailing:n}){const i=r=>e({...t,[r]:!t[r]});return S.jsxs(dc,{title:"Series",children:[S.jsxs("label",{className:"sim-row sim-row-bool",children:[S.jsx("input",{type:"checkbox",checked:t.altitude,onChange:()=>i("altitude")}),S.jsx("span",{className:"sim-label",children:"Altitude"})]}),S.jsxs("label",{className:"sim-row sim-row-bool",children:[S.jsx("input",{type:"checkbox",checked:t.velocity,onChange:()=>i("velocity")}),S.jsx("span",{className:"sim-label",children:"Velocity"})]}),S.jsxs("label",{className:"sim-row sim-row-bool",children:[S.jsx("input",{type:"checkbox",checked:t.thrust,onChange:()=>i("thrust")}),S.jsx("span",{className:"sim-label",children:"Thrust"})]}),n]})}const rT=[{key:"_launch",label:"Launch conditions"},{key:"_options",label:"Simulation options"},{key:"_warnings",label:"Warnings"},{key:"_plot",label:"Plot data"},{key:"_export",label:"Export data"}];function sT({open:t,sim:e,simNode:n,busy:i,rocketName:r,seriesToggles:s,onSeriesChange:o,onPatch:a,onRun:l,onClose:c}){const[h,u]=se.useState("_launch");se.useEffect(()=>{t&&u("_launch")},[t,e]);const[f,p]=se.useState(null);se.useEffect(()=>{if(!t||!e){p(null);return}let A=!0;return pv(e).then(v=>A&&p(v.warnings??[])).catch(()=>A&&p([])),()=>{A=!1}},[t,e,n]);const g=f?.filter(A=>A.kind==="error").length??0,_=f?.filter(A=>A.kind==="warn").length??0,m=f===null?"Checking…":g>0?`Errors in simulation prevent running (${g})`:_>0?`${_} warning${_>1?"s":""}`:"Ready",d=f===null?"info":g>0?"error":_>0?"warn":"ok";return t?S.jsx("div",{className:"modal-backdrop",onClick:c,role:"presentation",children:S.jsxs("div",{className:"modal sim-modal",onClick:A=>A.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Edit simulation",children:[S.jsxs("header",{className:"modal-head sim-modal-head",children:[S.jsxs("div",{className:"sim-modal-head-grid",children:[S.jsx("span",{className:"sim-head-label",children:"Name:"}),S.jsx("input",{type:"text",defaultValue:e||"Simulation 1",className:"sim-name-input",readOnly:!0,title:"Rename via the sim selector"}),S.jsx("span",{className:"sim-head-label",children:"Flight config:"}),S.jsx("span",{className:"sim-head-value",children:n?.config_id||"[default]"}),S.jsx("span",{className:"sim-head-label",children:"Status:"}),S.jsx("span",{className:`sim-status sim-status-${d}`,children:m})]}),S.jsx("button",{type:"button",className:"modal-close",onClick:c,"aria-label":"Close",children:"×"})]}),S.jsx("div",{className:"prop-tabs sim-tabs",children:rT.map(A=>S.jsx("button",{type:"button",className:"prop-tab"+(A.key===h?" active":""),onClick:()=>u(A.key),children:A.label},A.key))}),S.jsx("div",{className:"modal-body",children:n?h==="_launch"?S.jsx($1,{sim:e,simNode:n,onPatch:a}):h==="_options"?S.jsx(eT,{sim:e,simNode:n,onPatch:a}):h==="_warnings"?S.jsx(tT,{sim:e}):h==="_plot"?S.jsx(iT,{toggles:s,onChange:o}):h==="_export"?S.jsx(nT,{sim:e,rocketName:r}):null:S.jsx("div",{className:"empty",children:"No simulation selected"})}),S.jsxs("footer",{className:"modal-foot",children:[S.jsx("button",{type:"button",className:"ghost",onClick:c,children:"Cancel"}),S.jsx("button",{type:"button",onClick:()=>{l(),c()},disabled:i||!n,children:"Run simulation"})]})]})}):null}function oT({spec:t}){const[e,n,i,r]=t.split("|"),[s,o]=se.useState(null),[a,l]=se.useState(null);return se.useEffect(()=>{mv(decodeURIComponent(e)).then(o).catch(c=>l(String(c)))},[e]),a?S.jsx("div",{id:"raw-err",style:{color:"red"},children:a}):s?S.jsx("div",{id:"raw-ready",style:{width:1280,height:720,overflow:"hidden"},children:n==="blueprint"?S.jsx(p0,{rv:s.view,raw:!0}):S.jsx(d0,{rv:s.view,mode:n||"finished",raw:parseInt(i||"0",10),keyBg:r==="key"})}):S.jsx("div",{id:"raw-loading",children:"loading"})}function aT(){const t=typeof window<"u"?window.location.hash:"";return t.startsWith("#raw=")?S.jsx(oT,{spec:t.slice(5)}):S.jsx(lT,{})}function lT(){const[t,e]=se.useState(null),[n,i]=se.useState(null),[r,s]=se.useState(""),[o,a]=se.useState("side"),[l,c]=se.useState(!1),[h,u]=se.useState(null),[f,p]=se.useState([]),[g,_]=se.useState(null),[m,d]=se.useState(null),[A,v]=se.useState("design"),[y,P]=se.useState(0),[w,C]=se.useState([]),[T,B]=se.useState(.5),[x,I]=se.useState(280),N=se.useRef(null),[F,V]=se.useState(null),[K,W]=se.useState(!1),[Q,D]=se.useState({altitude:!0,velocity:!0,thrust:!1});se.useEffect(()=>{hx().then(p).catch(()=>{})},[]);const j=t?.view??null,J=t?.stability??null,ie=se.useMemo(()=>t?.tree.find(L=>L.id===g)??null,[t,g]);async function re(L,k){c(!0),u(null);try{k?.(await L())}catch(te){u(String(te))}finally{c(!1)}}const Ae=L=>{e(L),i(null),_(null),s(L.view.simulations[0]??""),Ah().then(C).catch(()=>C([]))},H=L=>re(()=>mv(L),Ae),q=L=>re(()=>qC(L),Ae),ae=()=>re(()=>$C(),Ae),le=L=>re(()=>ex(L),Ae),Ue=()=>{const L=Oe.current;if(!L)return;const k=L.view.simulations[0]??"";re(()=>Vp(k||null),te=>i(te))},be=se.useRef(null),Oe=se.useRef(null);Oe.current=t,se.useEffect(()=>{const L=new URLSearchParams(window.location.search),k=L.get("ork_b64"),te=L.get("example"),fe=L.get("path");k?q(k):te?H(`/orks/${te}`):fe&&H(fe);const We=Ct=>{if(Ct.source!==window.parent)return;const Ge=Ct.data;!Ge||typeof Ge!="object"||(Ge.type==="workbench:load_design"?typeof Ge.b64=="string"?q(Ge.b64):typeof Ge.example=="string"?H(`/orks/${Ge.example}`):typeof Ge.path=="string"&&H(Ge.path):Ge.type==="workbench:run_simulate"&&Ue())};window.addEventListener("message",We),window.parent!==window&&window.parent.postMessage({type:"workbench:ready"},"*");let Qe=null;if(typeof BroadcastChannel<"u"){Qe=new BroadcastChannel("opsrocket-workbench"),be.current=Qe;const Ct=Ge=>{const ot=Ge.data;if(!(!ot||typeof ot!="object"))if(ot.type==="ping"){const zt=Oe.current;if(!zt)return;Gp().then(({ork_b64:xt})=>{Qe.postMessage({type:"state",state:{name:zt.view.name,ork_b64:xt,total_length_m:zt.view.total_length,components:zt.view.components.length}})}).catch(()=>{})}else ot.type==="load_design"&&typeof ot.b64=="string"?q(ot.b64):ot.type==="run_simulate"&&Ue()};Qe.addEventListener("message",Ct),Qe.postMessage({type:"ready"})}return()=>{window.removeEventListener("message",We),Qe&&(Qe.close(),be.current=null)}},[]),se.useEffect(()=>{const L=be.current;if(!L)return;if(!t){L.postMessage({type:"state",state:null});return}let k=!0;return Gp().then(({ork_b64:te})=>{k&&L.postMessage({type:"state",state:{name:t.view.name,ork_b64:te,total_length_m:t.view.total_length,components:t.view.components.length}})}).catch(()=>{}),()=>{k=!1}},[t]);const je=(L,k,te)=>re(()=>tx(L,k,te),fe=>e(fe)),ne=L=>re(()=>nx(L),k=>{e(k),g===L&&_(null)}),b=(L,k)=>{const te=new Set((t?.tree??[]).map(fe=>fe.id));V(null),re(()=>ix(L,k),fe=>{e(fe);const We=fe.tree.find(Qe=>!te.has(Qe.id));We&&_(We.id)})},ge=()=>{if(!t)return;const L=t.tree.find(te=>te.id===g),k=L&&Vc(L.kind).length>0?L:t.tree.find(te=>Vc(te.kind).length>0);k&&(_(k.id),V(k.id))},pe=(L,k)=>re(()=>ox(r,L,k),te=>e(te)),ce=L=>{e(L),_(k=>k&&L.tree.some(te=>te.id===k)?k:null)},ve=()=>re(()=>rx(),ce),Pe=()=>re(()=>sx(),ce);se.useEffect(()=>{const L=k=>{if(!t||l)return;const te=k.target,fe=te?.tagName;if(fe==="INPUT"||fe==="TEXTAREA"||fe==="SELECT"||te?.isContentEditable)return;const We=k.key==="z"||k.key==="Z",Qe=k.key==="y"||k.key==="Y";(k.metaKey||k.ctrlKey)&&We?(k.preventDefault(),k.shiftKey?Pe():ve()):k.ctrlKey&&Qe&&(k.preventDefault(),Pe())};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[t,l,r]);const xe=()=>re(()=>Vp(r||null),L=>i(L)),R=se.useRef(null),M=se.useRef(null),X=L=>{const k=R.current;!k||k.scrollWidth<=k.clientWidth||Math.abs(L.deltaX)>=Math.abs(L.deltaY)||(k.scrollLeft+=L.deltaY)},$=L=>{const k=R.current;if(!k)return;const te=L.target;te!==k&&te.tagName!=="H1"||(M.current={x:L.clientX,left:k.scrollLeft},k.classList.add("grab"),k.setPointerCapture(L.pointerId))},oe=L=>{const k=R.current;k&&M.current&&(k.scrollLeft=M.current.left-(L.clientX-M.current.x))},ee=L=>{const k=R.current;if(k){M.current=null,k.classList.remove("grab");try{k.releasePointerCapture(L.pointerId)}catch{}}},Te=se.useRef(null),_e=se.useRef(!1),Me=L=>{_e.current=!0,L.target.setPointerCapture(L.pointerId),L.preventDefault()},Je=L=>{if(!_e.current||!Te.current)return;const k=Te.current.getBoundingClientRect(),te=(L.clientY-k.top)/k.height;B(Math.min(.85,Math.max(.15,te)))},de=L=>{_e.current=!1;try{L.target.releasePointerCapture(L.pointerId)}catch{}},Se=()=>{n&&z1(n,j?.name??"flight",r)},Fe=()=>{B1(j?.name??"rocket")||u("Open the Side/3D view before exporting an image")},ke=()=>{j&&G1(j,j.name)},Ee=t?.sims.find(L=>L.name===r)??null,Ke=se.useMemo(()=>{if(!j||!J)return null;const L=t?.config,k=L?.simulations.find(xt=>xt.name===r)?.config_id??L?.default_config??L?.configs[0]?.config_id??null;let te=j.max_radius;const fe=j.lathe.filter(xt=>Math.abs(xt.radial??0)<1e-4);fe.length&&(te=Math.max(...fe.map(xt=>Math.max(...xt.outer.map(([,yt])=>yt)))));const We=j.total_length*100;let Qe=0,Ct=!1;for(const xt of L?.mounts??[]){const yt=xt.assignments.find(ci=>ci.config_id===k);if(!yt||!yt.digest&&!yt.designation)continue;const $t=w.find(ci=>yt.digest&&ci.digest===yt.digest)??w.find(ci=>ci.designation===yt.designation);$t&&(Qe+=$t.total_mass_g*Math.max(1,xt.instances??1),Ct=!0)}const Ge=L?.configs.find(xt=>xt.config_id===k)?.name||(()=>{const xt=(L?.mounts??[]).map(yt=>yt.assignments.find($t=>$t.config_id===k)?.designation).filter(yt=>!!yt);return xt.length?`[${xt.join("; ")}]`:"[No motors]"})();let ot=null,zt=null;if(n&&n.velocity.length>1){ot=Math.max(...n.velocity);let xt=0;for(let yt=1;yt<n.velocity.length;yt++){const $t=n.time[yt]-n.time[yt-1];$t>0&&(xt=Math.max(xt,(n.velocity[yt]-n.velocity[yt-1])/$t))}zt=xt}return{name:j.name,length_cm:We,max_diam_cm:te*200,mass_g:J.mass_g,mass_motors_g:Ct?J.mass_g+Qe:null,margin_cal:J.margin_cal,margin_pct:We>0?(J.cp_cm-J.cg_cm)/We*100:0,cg_cm:J.cg_cm,cp_cm:J.cp_cm,mach:.3,config_name:Ge,apogee_m:n?n.apogee:null,max_velocity_ms:ot,max_velocity_mach:ot!=null?ot/340.3:null,max_accel_ms2:zt}},[j,J,t,r,n,w]),Be=L=>{d(`Saved → ${L.saved}`),setTimeout(()=>d(null),2500)},rt=()=>re(()=>Hc(),Be),O=L=>re(()=>Hc(L),Be),ye=()=>re(()=>Hc(`${(j?.name??"rocket").replace(/\W+/g,"_")}.ork`),Be);return S.jsxs("div",{className:"app",children:[S.jsx(sT,{open:K,sim:r,simNode:Ee,busy:l,rocketName:j?.name??"rocket",seriesToggles:Q,onSeriesChange:D,onPatch:(L,k,te)=>pe(k,te),onRun:xe,onClose:()=>W(!1)}),S.jsxs("header",{ref:R,onWheel:X,onPointerDown:$,onPointerMove:oe,onPointerUp:ee,children:[S.jsx("a",{href:"/",target:"_top",className:"logo-link",title:"Home",children:S.jsx("img",{className:"logo",src:"/ops.png",alt:"OpsRocket"})}),S.jsx(dx,{fixtures:f,busy:l,hasDoc:!!t,canExportCsv:!!n,onNew:ae,onOpenFile:le,onOpenExample:H,onSave:rt,onSaveAs:O,onExportCsv:Se,onExportPng:Fe,onExportObj:ke,onExportOrk:ye}),j&&S.jsxs(S.Fragment,{children:[S.jsx(si,{className:"simsel",value:r,onChange:s,options:j.simulations.map(L=>({value:L,label:L}))}),S.jsx("button",{onClick:()=>W(!0),disabled:l||!j.simulations.length||!r,title:"Edit simulation conditions and run",children:"New simulation"}),S.jsx("button",{className:"ghost",onClick:ve,disabled:l,title:"Undo (⌘Z / Ctrl+Z)",children:"↶ Undo"}),S.jsx("button",{className:"ghost",onClick:Pe,disabled:l,title:"Redo (⇧⌘Z / Ctrl+Y)",children:"↷ Redo"}),S.jsx(si,{title:"View",value:o,onChange:L=>a(L),options:[{value:"side",label:"Side view"},{value:"top",label:"Top view"},{value:"back",label:"Back view"},{value:"figure",label:"3D Figure"},{value:"unfinished",label:"3D Unfinished"},{value:"finished",label:"3D Finished"}]}),(o==="side"||o==="top"||o==="back")&&S.jsxs("span",{className:"rollctl",title:"Change the rocket's roll rotation (only affects the rocket view)",children:[S.jsx("input",{type:"number",value:y,step:1,onChange:L=>P((Number(L.target.value)%360+360)%360),style:{width:56}}),S.jsx("span",{style:{opacity:.7},children:"°"}),S.jsx("input",{type:"range",min:0,max:359,value:y,onChange:L=>P(Number(L.target.value)),title:"Roll"})]}),["design","motors","sim","analysis"].map(L=>S.jsx("button",{className:A===L?"":"ghost",onClick:()=>v(L),children:L==="design"?"Design":L==="motors"?"Motors":L==="sim"?"Conditions":"Analysis"},L))]}),m&&S.jsx("span",{className:"ok",children:m}),h&&S.jsx("span",{className:"err",children:h})]}),j&&S.jsxs("div",{className:"metabar",children:[j.name,j.designer?` — ${j.designer}`:""," ·"," ",(j.total_length*100).toFixed(1)," cm"]}),J&&S.jsxs("div",{className:"statbar",children:[S.jsxs("span",{children:["Mass ",S.jsxs("b",{children:[J.mass_g.toFixed(1)," g"]})]}),S.jsxs("span",{children:["CG ",S.jsxs("b",{children:[J.cg_cm.toFixed(2)," cm"]})]}),S.jsxs("span",{children:["CP ",S.jsxs("b",{children:[J.cp_cm.toFixed(2)," cm"]})]}),S.jsxs("span",{className:J.stable?"good":"bad",children:["Stability ",S.jsxs("b",{children:[J.margin_cal.toFixed(2)," cal"]})]}),S.jsxs("span",{children:["Ø ",S.jsxs("b",{children:[J.ref_diameter_mm.toFixed(1)," mm"]})]}),S.jsxs("span",{children:["Cᴅ ",S.jsx("b",{children:J.cd.toFixed(3)})]})]}),S.jsxs("div",{className:"main",style:{gridTemplateColumns:`240px 1fr 1px ${x}px`},children:[S.jsxs("aside",{className:"sidebar",children:[S.jsxs("div",{className:"sidebar-head",children:[S.jsx("h2",{children:"Components"}),t&&S.jsx("button",{className:"new-btn",onClick:ge,title:"Add a new component",children:"+ New"})]}),t?t.tree.map(L=>{const k=Vc(L.kind);return S.jsxs("div",{children:[S.jsxs("div",{className:"tree-item"+(L.id===g?" sel":""),style:{paddingLeft:8+L.depth*14},onClick:()=>_(L.id),children:[eg[L.kind]&&S.jsx("img",{className:"ci",src:eg[L.kind],alt:"",title:L.kind,draggable:!1}),S.jsx("span",{className:"nm",children:L.name}),k.length>0&&S.jsx("button",{className:"add",title:"Add child component",onClick:te=>{te.stopPropagation(),V(F===L.id?null:L.id)},children:"+"}),L.kind!=="Stage"&&S.jsx("button",{className:"del",title:"Delete",onClick:te=>{te.stopPropagation(),ne(L.id)},children:"×"})]}),F===L.id&&k.length>0&&S.jsx("div",{className:"add-menu",style:{paddingLeft:8+(L.depth+1)*14},children:k.map(te=>S.jsxs("button",{className:"add-opt",onClick:fe=>{fe.stopPropagation(),b(L.id,te)},children:["+ ",te]},te))})]},L.id)}):S.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),S.jsxs("div",{className:"viewport",ref:Te,style:{gridTemplateRows:`${T}fr 3px ${1-T}fr`},children:[S.jsxs("div",{className:"panel",children:[!(A==="design"&&(o==="side"||o==="top"||o==="back"))&&S.jsx("span",{className:"tag",children:A==="motors"?"Motors & configurations":A==="sim"?`Conditions — ${r}`:A==="analysis"?"Analysis & optimization":o==="side"?"Side view":o==="top"?"Top view":o==="back"?"Back view":`3D ${o}`}),t?A==="motors"?S.jsx(Z1,{config:t.config,onWorkbench:e,setBusy:c,setErr:u,busy:l}):A==="sim"?S.jsx("div",{className:"conditions",children:Ee?S.jsx(m0,{fields:Ee.fields,onCommit:pe}):S.jsx("div",{className:"empty",children:"No simulation selected"})}):A==="analysis"?S.jsx(K1,{tree:t.tree,sim:r,setErr:u}):o==="side"||o==="top"||o==="back"?S.jsx(p0,{rv:j,overlay:Ke,rollDeg:y+(o==="top"?90:o==="back"?180:0),onRollDelta:L=>P(k=>(Math.round(k+L)%360+360)%360)}):S.jsx(d0,{rv:j,mode:o==="finished"?"finished":o==="unfinished"?"unfinished":"figure",preset:"3d"}):S.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),S.jsx("div",{className:"vsplit",onPointerDown:Me,onPointerMove:Je,onPointerUp:de,title:"Drag to resize"}),S.jsxs("div",{className:"panel",style:{borderBottom:"none"},children:[S.jsx("span",{className:"tag",children:"Flight"}),n?S.jsx(W1,{fd:n}):S.jsx("div",{className:"empty",children:"Run a simulation"})]})]}),S.jsx("div",{className:"col-divider",role:"separator","aria-orientation":"vertical",title:"Drag to resize",onPointerDown:L=>{N.current={startX:L.clientX,startW:x},L.currentTarget.setPointerCapture(L.pointerId)},onPointerMove:L=>{const k=N.current;if(!k)return;const te=Math.max(200,Math.min(640,k.startW-(L.clientX-k.startX)));I(te)},onPointerUp:()=>{N.current=null},onPointerCancel:()=>{N.current=null}}),S.jsxs("aside",{className:"inspector",children:[S.jsx("h2",{children:"Properties"}),S.jsx(Y1,{node:ie,onPatch:je,busy:l})]})]}),S.jsx("footer",{children:n?S.jsxs(S.Fragment,{children:[S.jsxs("span",{children:["Apogee ",S.jsxs("b",{children:[n.apogee.toFixed(1)," m"]})]}),S.jsxs("span",{children:["t‑apogee ",S.jsxs("b",{children:[n.time_to_apogee.toFixed(2)," s"]})]}),S.jsxs("span",{children:["Flight time ",S.jsxs("b",{children:[n.flight_time.toFixed(2)," s"]})]}),S.jsxs("span",{children:["Ground hit ",S.jsxs("b",{children:[n.ground_hit_velocity.toFixed(2)," m/s"]})]})]}):S.jsx("span",{style:{color:"#9a7b56"},children:"OpsRocket — Rust core · live design workbench · React + Three.js"})})]})}Mu.createRoot(document.getElementById("root")).render(S.jsx(F0.StrictMode,{children:S.jsx(aT,{})}));
