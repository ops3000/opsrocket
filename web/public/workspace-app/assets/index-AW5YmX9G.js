(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function C0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var tm={exports:{}},Hl={},nm={exports:{}},Je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zo=Symbol.for("react.element"),x0=Symbol.for("react.portal"),y0=Symbol.for("react.fragment"),I0=Symbol.for("react.strict_mode"),M0=Symbol.for("react.profiler"),S0=Symbol.for("react.provider"),E0=Symbol.for("react.context"),w0=Symbol.for("react.forward_ref"),T0=Symbol.for("react.suspense"),R0=Symbol.for("react.memo"),b0=Symbol.for("react.lazy"),bf=Symbol.iterator;function P0(t){return t===null||typeof t!="object"?null:(t=bf&&t[bf]||t["@@iterator"],typeof t=="function"?t:null)}var im={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},rm=Object.assign,sm={};function Gs(t,e,n){this.props=t,this.context=e,this.refs=sm,this.updater=n||im}Gs.prototype.isReactComponent={};Gs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Gs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function om(){}om.prototype=Gs.prototype;function id(t,e,n){this.props=t,this.context=e,this.refs=sm,this.updater=n||im}var rd=id.prototype=new om;rd.constructor=id;rm(rd,Gs.prototype);rd.isPureReactComponent=!0;var Pf=Array.isArray,am=Object.prototype.hasOwnProperty,sd={current:null},lm={key:!0,ref:!0,__self:!0,__source:!0};function cm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)am.call(e,i)&&!lm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Zo,type:t,key:s,ref:o,props:r,_owner:sd.current}}function L0(t,e){return{$$typeof:Zo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function od(t){return typeof t=="object"&&t!==null&&t.$$typeof===Zo}function N0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Lf=/\/+/g;function pc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?N0(""+t.key):e.toString(36)}function Xa(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Zo:case x0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+pc(o,0):i,Pf(r)?(n="",t!=null&&(n=t.replace(Lf,"$&/")+"/"),Xa(r,e,n,"",function(c){return c})):r!=null&&(od(r)&&(r=L0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Lf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Pf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+pc(s,a);o+=Xa(s,e,n,l,r)}else if(l=P0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+pc(s,a++),o+=Xa(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ra(t,e,n){if(t==null)return t;var i=[],r=0;return Xa(t,i,"","",function(s){return e.call(n,s,r++)}),i}function D0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nn={current:null},Ya={transition:null},U0={ReactCurrentDispatcher:nn,ReactCurrentBatchConfig:Ya,ReactCurrentOwner:sd};function um(){throw Error("act(...) is not supported in production builds of React.")}Je.Children={map:ra,forEach:function(t,e,n){ra(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ra(t,function(){e++}),e},toArray:function(t){return ra(t,function(e){return e})||[]},only:function(t){if(!od(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Je.Component=Gs;Je.Fragment=y0;Je.Profiler=M0;Je.PureComponent=id;Je.StrictMode=I0;Je.Suspense=T0;Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U0;Je.act=um;Je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=rm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=sd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)am.call(e,l)&&!lm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Zo,type:t.type,key:r,ref:s,props:i,_owner:o}};Je.createContext=function(t){return t={$$typeof:E0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:S0,_context:t},t.Consumer=t};Je.createElement=cm;Je.createFactory=function(t){var e=cm.bind(null,t);return e.type=t,e};Je.createRef=function(){return{current:null}};Je.forwardRef=function(t){return{$$typeof:w0,render:t}};Je.isValidElement=od;Je.lazy=function(t){return{$$typeof:b0,_payload:{_status:-1,_result:t},_init:D0}};Je.memo=function(t,e){return{$$typeof:R0,type:t,compare:e===void 0?null:e}};Je.startTransition=function(t){var e=Ya.transition;Ya.transition={};try{t()}finally{Ya.transition=e}};Je.unstable_act=um;Je.useCallback=function(t,e){return nn.current.useCallback(t,e)};Je.useContext=function(t){return nn.current.useContext(t)};Je.useDebugValue=function(){};Je.useDeferredValue=function(t){return nn.current.useDeferredValue(t)};Je.useEffect=function(t,e){return nn.current.useEffect(t,e)};Je.useId=function(){return nn.current.useId()};Je.useImperativeHandle=function(t,e,n){return nn.current.useImperativeHandle(t,e,n)};Je.useInsertionEffect=function(t,e){return nn.current.useInsertionEffect(t,e)};Je.useLayoutEffect=function(t,e){return nn.current.useLayoutEffect(t,e)};Je.useMemo=function(t,e){return nn.current.useMemo(t,e)};Je.useReducer=function(t,e,n){return nn.current.useReducer(t,e,n)};Je.useRef=function(t){return nn.current.useRef(t)};Je.useState=function(t){return nn.current.useState(t)};Je.useSyncExternalStore=function(t,e,n){return nn.current.useSyncExternalStore(t,e,n)};Je.useTransition=function(){return nn.current.useTransition()};Je.version="18.3.1";nm.exports=Je;var ce=nm.exports;const O0=C0(ce);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F0=ce,k0=Symbol.for("react.element"),z0=Symbol.for("react.fragment"),B0=Object.prototype.hasOwnProperty,G0=F0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,V0={key:!0,ref:!0,__self:!0,__source:!0};function hm(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)B0.call(e,i)&&!V0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:k0,type:t,key:s,ref:o,props:r,_owner:G0.current}}Hl.Fragment=z0;Hl.jsx=hm;Hl.jsxs=hm;tm.exports=Hl;var E=tm.exports,yu={},dm={exports:{}},Cn={},fm={exports:{}},pm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,W){var K=D.length;D.push(W);e:for(;0<K;){var ne=K-1>>>1,le=D[ne];if(0<r(le,W))D[ne]=W,D[K]=le,K=ne;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var W=D[0],K=D.pop();if(K!==W){D[0]=K;e:for(var ne=0,le=D.length,_e=le>>>1;ne<_e;){var V=2*(ne+1)-1,te=D[V],oe=V+1,ae=D[oe];if(0>r(te,K))oe<le&&0>r(ae,te)?(D[ne]=ae,D[oe]=K,ne=oe):(D[ne]=te,D[V]=K,ne=V);else if(oe<le&&0>r(ae,K))D[ne]=ae,D[oe]=K,ne=oe;else break e}}return W}function r(D,W){var K=D.sortIndex-W.sortIndex;return K!==0?K:D.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,u=null,f=3,p=!1,v=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(D){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=D)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function C(D){if(x=!1,m(D),!v)if(n(l)!==null)v=!0,F(T);else{var W=n(c);W!==null&&Z(C,W.startTime-D)}}function T(D,W){v=!1,x&&(x=!1,d(R),R=-1),p=!0;var K=f;try{for(m(W),u=n(l);u!==null&&(!(u.expirationTime>W)||D&&!y());){var ne=u.callback;if(typeof ne=="function"){u.callback=null,f=u.priorityLevel;var le=ne(u.expirationTime<=W);W=t.unstable_now(),typeof le=="function"?u.callback=le:u===n(l)&&i(l),m(W)}else i(l);u=n(l)}if(u!==null)var _e=!0;else{var V=n(c);V!==null&&Z(C,V.startTime-W),_e=!1}return _e}finally{u=null,f=K,p=!1}}var S=!1,I=null,R=-1,B=5,_=-1;function y(){return!(t.unstable_now()-_<B)}function N(){if(I!==null){var D=t.unstable_now();_=D;var W=!0;try{W=I(!0,D)}finally{W?O():(S=!1,I=null)}}else S=!1}var O;if(typeof A=="function")O=function(){A(N)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,Q=G.port2;G.port1.onmessage=N,O=function(){Q.postMessage(null)}}else O=function(){g(N,0)};function F(D){I=D,S||(S=!0,O())}function Z(D,W){R=g(function(){D(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,F(T))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(f){case 1:case 2:case 3:var W=3;break;default:W=f}var K=f;f=W;try{return D()}finally{f=K}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,W){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var K=f;f=D;try{return W()}finally{f=K}},t.unstable_scheduleCallback=function(D,W,K){var ne=t.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ne+K:ne):K=ne,D){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=K+le,D={id:h++,callback:W,priorityLevel:D,startTime:K,expirationTime:le,sortIndex:-1},K>ne?(D.sortIndex=K,e(c,D),n(l)===null&&D===n(c)&&(x?(d(R),R=-1):x=!0,Z(C,K-ne))):(D.sortIndex=le,e(l,D),v||p||(v=!0,F(T))),D},t.unstable_shouldYield=y,t.unstable_wrapCallback=function(D){var W=f;return function(){var K=f;f=W;try{return D.apply(this,arguments)}finally{f=K}}}})(pm);fm.exports=pm;var H0=fm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var W0=ce,_n=H0;function ue(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var gm=new Set,So={};function Dr(t,e){ws(t,e),ws(t+"Capture",e)}function ws(t,e){for(So[t]=e,t=0;t<e.length;t++)gm.add(e[t])}var Ci=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Iu=Object.prototype.hasOwnProperty,j0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Nf={},Df={};function X0(t){return Iu.call(Df,t)?!0:Iu.call(Nf,t)?!1:j0.test(t)?Df[t]=!0:(Nf[t]=!0,!1)}function Y0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Z0(t,e,n,i){if(e===null||typeof e>"u"||Y0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function rn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Vt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Vt[t]=new rn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Vt[e]=new rn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Vt[t]=new rn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Vt[t]=new rn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Vt[t]=new rn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Vt[t]=new rn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Vt[t]=new rn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Vt[t]=new rn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Vt[t]=new rn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ad=/[\-:]([a-z])/g;function ld(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ad,ld);Vt[e]=new rn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ad,ld);Vt[e]=new rn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ad,ld);Vt[e]=new rn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Vt[t]=new rn(t,1,!1,t.toLowerCase(),null,!1,!1)});Vt.xlinkHref=new rn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Vt[t]=new rn(t,1,!1,t.toLowerCase(),null,!0,!0)});function cd(t,e,n,i){var r=Vt.hasOwnProperty(e)?Vt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Z0(e,n,r,i)&&(n=null),i||r===null?X0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var wi=W0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=Symbol.for("react.element"),ts=Symbol.for("react.portal"),ns=Symbol.for("react.fragment"),ud=Symbol.for("react.strict_mode"),Mu=Symbol.for("react.profiler"),mm=Symbol.for("react.provider"),Am=Symbol.for("react.context"),hd=Symbol.for("react.forward_ref"),Su=Symbol.for("react.suspense"),Eu=Symbol.for("react.suspense_list"),dd=Symbol.for("react.memo"),Fi=Symbol.for("react.lazy"),vm=Symbol.for("react.offscreen"),Uf=Symbol.iterator;function Xs(t){return t===null||typeof t!="object"?null:(t=Uf&&t[Uf]||t["@@iterator"],typeof t=="function"?t:null)}var vt=Object.assign,gc;function so(t){if(gc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);gc=e&&e[1]||""}return`
`+gc+t}var mc=!1;function Ac(t,e){if(!t||mc)return"";mc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{mc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?so(t):""}function J0(t){switch(t.tag){case 5:return so(t.type);case 16:return so("Lazy");case 13:return so("Suspense");case 19:return so("SuspenseList");case 0:case 2:case 15:return t=Ac(t.type,!1),t;case 11:return t=Ac(t.type.render,!1),t;case 1:return t=Ac(t.type,!0),t;default:return""}}function wu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ns:return"Fragment";case ts:return"Portal";case Mu:return"Profiler";case ud:return"StrictMode";case Su:return"Suspense";case Eu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Am:return(t.displayName||"Context")+".Consumer";case mm:return(t._context.displayName||"Context")+".Provider";case hd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case dd:return e=t.displayName||null,e!==null?e:wu(t.type)||"Memo";case Fi:e=t._payload,t=t._init;try{return wu(t(e))}catch{}}return null}function K0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wu(e);case 8:return e===ud?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function nr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _m(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Q0(t){var e=_m(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function oa(t){t._valueTracker||(t._valueTracker=Q0(t))}function Cm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=_m(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function hl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Tu(t,e){var n=e.checked;return vt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Of(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=nr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function xm(t,e){e=e.checked,e!=null&&cd(t,"checked",e,!1)}function Ru(t,e){xm(t,e);var n=nr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?bu(t,e.type,n):e.hasOwnProperty("defaultValue")&&bu(t,e.type,nr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ff(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function bu(t,e,n){(e!=="number"||hl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var oo=Array.isArray;function ms(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+nr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Pu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ue(91));return vt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function kf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ue(92));if(oo(n)){if(1<n.length)throw Error(ue(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:nr(n)}}function ym(t,e){var n=nr(e.value),i=nr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function zf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Im(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Lu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Im(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var aa,Mm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(aa=aa||document.createElement("div"),aa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=aa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Eo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var uo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},q0=["Webkit","ms","Moz","O"];Object.keys(uo).forEach(function(t){q0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),uo[e]=uo[t]})});function Sm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||uo.hasOwnProperty(t)&&uo[t]?(""+e).trim():e+"px"}function Em(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Sm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var $0=vt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Nu(t,e){if(e){if($0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ue(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ue(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ue(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ue(62))}}function Du(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Uu=null;function fd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ou=null,As=null,vs=null;function Bf(t){if(t=Qo(t)){if(typeof Ou!="function")throw Error(ue(280));var e=t.stateNode;e&&(e=Zl(e),Ou(t.stateNode,t.type,e))}}function wm(t){As?vs?vs.push(t):vs=[t]:As=t}function Tm(){if(As){var t=As,e=vs;if(vs=As=null,Bf(t),e)for(t=0;t<e.length;t++)Bf(e[t])}}function Rm(t,e){return t(e)}function bm(){}var vc=!1;function Pm(t,e,n){if(vc)return t(e,n);vc=!0;try{return Rm(t,e,n)}finally{vc=!1,(As!==null||vs!==null)&&(bm(),Tm())}}function wo(t,e){var n=t.stateNode;if(n===null)return null;var i=Zl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ue(231,e,typeof n));return n}var Fu=!1;if(Ci)try{var Ys={};Object.defineProperty(Ys,"passive",{get:function(){Fu=!0}}),window.addEventListener("test",Ys,Ys),window.removeEventListener("test",Ys,Ys)}catch{Fu=!1}function e_(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var ho=!1,dl=null,fl=!1,ku=null,t_={onError:function(t){ho=!0,dl=t}};function n_(t,e,n,i,r,s,o,a,l){ho=!1,dl=null,e_.apply(t_,arguments)}function i_(t,e,n,i,r,s,o,a,l){if(n_.apply(this,arguments),ho){if(ho){var c=dl;ho=!1,dl=null}else throw Error(ue(198));fl||(fl=!0,ku=c)}}function Ur(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Lm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Gf(t){if(Ur(t)!==t)throw Error(ue(188))}function r_(t){var e=t.alternate;if(!e){if(e=Ur(t),e===null)throw Error(ue(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Gf(r),t;if(s===i)return Gf(r),e;s=s.sibling}throw Error(ue(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ue(189))}}if(n.alternate!==i)throw Error(ue(190))}if(n.tag!==3)throw Error(ue(188));return n.stateNode.current===n?t:e}function Nm(t){return t=r_(t),t!==null?Dm(t):null}function Dm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Dm(t);if(e!==null)return e;t=t.sibling}return null}var Um=_n.unstable_scheduleCallback,Vf=_n.unstable_cancelCallback,s_=_n.unstable_shouldYield,o_=_n.unstable_requestPaint,St=_n.unstable_now,a_=_n.unstable_getCurrentPriorityLevel,pd=_n.unstable_ImmediatePriority,Om=_n.unstable_UserBlockingPriority,pl=_n.unstable_NormalPriority,l_=_n.unstable_LowPriority,Fm=_n.unstable_IdlePriority,Wl=null,ei=null;function c_(t){if(ei&&typeof ei.onCommitFiberRoot=="function")try{ei.onCommitFiberRoot(Wl,t,void 0,(t.current.flags&128)===128)}catch{}}var jn=Math.clz32?Math.clz32:d_,u_=Math.log,h_=Math.LN2;function d_(t){return t>>>=0,t===0?32:31-(u_(t)/h_|0)|0}var la=64,ca=4194304;function ao(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=ao(a):(s&=o,s!==0&&(i=ao(s)))}else o=n&~r,o!==0?i=ao(o):s!==0&&(i=ao(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-jn(e),r=1<<n,i|=t[n],e&=~r;return i}function f_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function p_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-jn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=f_(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function zu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function km(){var t=la;return la<<=1,!(la&4194240)&&(la=64),t}function _c(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Jo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-jn(e),t[e]=n}function g_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-jn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function gd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-jn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var st=0;function zm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Bm,md,Gm,Vm,Hm,Bu=!1,ua=[],Xi=null,Yi=null,Zi=null,To=new Map,Ro=new Map,Bi=[],m_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hf(t,e){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":Yi=null;break;case"mouseover":case"mouseout":Zi=null;break;case"pointerover":case"pointerout":To.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ro.delete(e.pointerId)}}function Zs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Qo(e),e!==null&&md(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function A_(t,e,n,i,r){switch(e){case"focusin":return Xi=Zs(Xi,t,e,n,i,r),!0;case"dragenter":return Yi=Zs(Yi,t,e,n,i,r),!0;case"mouseover":return Zi=Zs(Zi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return To.set(s,Zs(To.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ro.set(s,Zs(Ro.get(s)||null,t,e,n,i,r)),!0}return!1}function Wm(t){var e=_r(t.target);if(e!==null){var n=Ur(e);if(n!==null){if(e=n.tag,e===13){if(e=Lm(n),e!==null){t.blockedOn=e,Hm(t.priority,function(){Gm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Za(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Gu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Uu=i,n.target.dispatchEvent(i),Uu=null}else return e=Qo(n),e!==null&&md(e),t.blockedOn=n,!1;e.shift()}return!0}function Wf(t,e,n){Za(t)&&n.delete(e)}function v_(){Bu=!1,Xi!==null&&Za(Xi)&&(Xi=null),Yi!==null&&Za(Yi)&&(Yi=null),Zi!==null&&Za(Zi)&&(Zi=null),To.forEach(Wf),Ro.forEach(Wf)}function Js(t,e){t.blockedOn===e&&(t.blockedOn=null,Bu||(Bu=!0,_n.unstable_scheduleCallback(_n.unstable_NormalPriority,v_)))}function bo(t){function e(r){return Js(r,t)}if(0<ua.length){Js(ua[0],t);for(var n=1;n<ua.length;n++){var i=ua[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Xi!==null&&Js(Xi,t),Yi!==null&&Js(Yi,t),Zi!==null&&Js(Zi,t),To.forEach(e),Ro.forEach(e),n=0;n<Bi.length;n++)i=Bi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Bi.length&&(n=Bi[0],n.blockedOn===null);)Wm(n),n.blockedOn===null&&Bi.shift()}var _s=wi.ReactCurrentBatchConfig,ml=!0;function __(t,e,n,i){var r=st,s=_s.transition;_s.transition=null;try{st=1,Ad(t,e,n,i)}finally{st=r,_s.transition=s}}function C_(t,e,n,i){var r=st,s=_s.transition;_s.transition=null;try{st=4,Ad(t,e,n,i)}finally{st=r,_s.transition=s}}function Ad(t,e,n,i){if(ml){var r=Gu(t,e,n,i);if(r===null)Rc(t,e,i,Al,n),Hf(t,i);else if(A_(r,t,e,n,i))i.stopPropagation();else if(Hf(t,i),e&4&&-1<m_.indexOf(t)){for(;r!==null;){var s=Qo(r);if(s!==null&&Bm(s),s=Gu(t,e,n,i),s===null&&Rc(t,e,i,Al,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Rc(t,e,i,null,n)}}var Al=null;function Gu(t,e,n,i){if(Al=null,t=fd(i),t=_r(t),t!==null)if(e=Ur(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Lm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Al=t,null}function jm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(a_()){case pd:return 1;case Om:return 4;case pl:case l_:return 16;case Fm:return 536870912;default:return 16}default:return 16}}var Hi=null,vd=null,Ja=null;function Xm(){if(Ja)return Ja;var t,e=vd,n=e.length,i,r="value"in Hi?Hi.value:Hi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ja=r.slice(t,1<i?1-i:void 0)}function Ka(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ha(){return!0}function jf(){return!1}function xn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ha:jf,this.isPropagationStopped=jf,this}return vt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ha)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ha)},persist:function(){},isPersistent:ha}),e}var Vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_d=xn(Vs),Ko=vt({},Vs,{view:0,detail:0}),x_=xn(Ko),Cc,xc,Ks,jl=vt({},Ko,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ks&&(Ks&&t.type==="mousemove"?(Cc=t.screenX-Ks.screenX,xc=t.screenY-Ks.screenY):xc=Cc=0,Ks=t),Cc)},movementY:function(t){return"movementY"in t?t.movementY:xc}}),Xf=xn(jl),y_=vt({},jl,{dataTransfer:0}),I_=xn(y_),M_=vt({},Ko,{relatedTarget:0}),yc=xn(M_),S_=vt({},Vs,{animationName:0,elapsedTime:0,pseudoElement:0}),E_=xn(S_),w_=vt({},Vs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),T_=xn(w_),R_=vt({},Vs,{data:0}),Yf=xn(R_),b_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},P_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},L_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function N_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=L_[t])?!!e[t]:!1}function Cd(){return N_}var D_=vt({},Ko,{key:function(t){if(t.key){var e=b_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ka(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?P_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cd,charCode:function(t){return t.type==="keypress"?Ka(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ka(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),U_=xn(D_),O_=vt({},jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zf=xn(O_),F_=vt({},Ko,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cd}),k_=xn(F_),z_=vt({},Vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),B_=xn(z_),G_=vt({},jl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),V_=xn(G_),H_=[9,13,27,32],xd=Ci&&"CompositionEvent"in window,fo=null;Ci&&"documentMode"in document&&(fo=document.documentMode);var W_=Ci&&"TextEvent"in window&&!fo,Ym=Ci&&(!xd||fo&&8<fo&&11>=fo),Jf=" ",Kf=!1;function Zm(t,e){switch(t){case"keyup":return H_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function j_(t,e){switch(t){case"compositionend":return Jm(e);case"keypress":return e.which!==32?null:(Kf=!0,Jf);case"textInput":return t=e.data,t===Jf&&Kf?null:t;default:return null}}function X_(t,e){if(is)return t==="compositionend"||!xd&&Zm(t,e)?(t=Xm(),Ja=vd=Hi=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ym&&e.locale!=="ko"?null:e.data;default:return null}}var Y_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Y_[t.type]:e==="textarea"}function Km(t,e,n,i){wm(i),e=vl(e,"onChange"),0<e.length&&(n=new _d("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var po=null,Po=null;function Z_(t){aA(t,0)}function Xl(t){var e=os(t);if(Cm(e))return t}function J_(t,e){if(t==="change")return e}var Qm=!1;if(Ci){var Ic;if(Ci){var Mc="oninput"in document;if(!Mc){var qf=document.createElement("div");qf.setAttribute("oninput","return;"),Mc=typeof qf.oninput=="function"}Ic=Mc}else Ic=!1;Qm=Ic&&(!document.documentMode||9<document.documentMode)}function $f(){po&&(po.detachEvent("onpropertychange",qm),Po=po=null)}function qm(t){if(t.propertyName==="value"&&Xl(Po)){var e=[];Km(e,Po,t,fd(t)),Pm(Z_,e)}}function K_(t,e,n){t==="focusin"?($f(),po=e,Po=n,po.attachEvent("onpropertychange",qm)):t==="focusout"&&$f()}function Q_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Xl(Po)}function q_(t,e){if(t==="click")return Xl(e)}function $_(t,e){if(t==="input"||t==="change")return Xl(e)}function eC(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Yn=typeof Object.is=="function"?Object.is:eC;function Lo(t,e){if(Yn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Iu.call(e,r)||!Yn(t[r],e[r]))return!1}return!0}function ep(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function tp(t,e){var n=ep(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ep(n)}}function $m(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$m(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function eA(){for(var t=window,e=hl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=hl(t.document)}return e}function yd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function tC(t){var e=eA(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&$m(n.ownerDocument.documentElement,n)){if(i!==null&&yd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=tp(n,s);var o=tp(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var nC=Ci&&"documentMode"in document&&11>=document.documentMode,rs=null,Vu=null,go=null,Hu=!1;function np(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hu||rs==null||rs!==hl(i)||(i=rs,"selectionStart"in i&&yd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),go&&Lo(go,i)||(go=i,i=vl(Vu,"onSelect"),0<i.length&&(e=new _d("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=rs)))}function da(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ss={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionend:da("Transition","TransitionEnd")},Sc={},tA={};Ci&&(tA=document.createElement("div").style,"AnimationEvent"in window||(delete ss.animationend.animation,delete ss.animationiteration.animation,delete ss.animationstart.animation),"TransitionEvent"in window||delete ss.transitionend.transition);function Yl(t){if(Sc[t])return Sc[t];if(!ss[t])return t;var e=ss[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in tA)return Sc[t]=e[n];return t}var nA=Yl("animationend"),iA=Yl("animationiteration"),rA=Yl("animationstart"),sA=Yl("transitionend"),oA=new Map,ip="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rr(t,e){oA.set(t,e),Dr(e,[t])}for(var Ec=0;Ec<ip.length;Ec++){var wc=ip[Ec],iC=wc.toLowerCase(),rC=wc[0].toUpperCase()+wc.slice(1);rr(iC,"on"+rC)}rr(nA,"onAnimationEnd");rr(iA,"onAnimationIteration");rr(rA,"onAnimationStart");rr("dblclick","onDoubleClick");rr("focusin","onFocus");rr("focusout","onBlur");rr(sA,"onTransitionEnd");ws("onMouseEnter",["mouseout","mouseover"]);ws("onMouseLeave",["mouseout","mouseover"]);ws("onPointerEnter",["pointerout","pointerover"]);ws("onPointerLeave",["pointerout","pointerover"]);Dr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Dr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Dr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Dr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Dr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Dr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sC=new Set("cancel close invalid load scroll toggle".split(" ").concat(lo));function rp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,i_(i,e,void 0,t),t.currentTarget=null}function aA(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;rp(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;rp(r,a,c),s=l}}}if(fl)throw t=ku,fl=!1,ku=null,t}function ut(t,e){var n=e[Zu];n===void 0&&(n=e[Zu]=new Set);var i=t+"__bubble";n.has(i)||(lA(e,t,2,!1),n.add(i))}function Tc(t,e,n){var i=0;e&&(i|=4),lA(n,t,i,e)}var fa="_reactListening"+Math.random().toString(36).slice(2);function No(t){if(!t[fa]){t[fa]=!0,gm.forEach(function(n){n!=="selectionchange"&&(sC.has(n)||Tc(n,!1,t),Tc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[fa]||(e[fa]=!0,Tc("selectionchange",!1,e))}}function lA(t,e,n,i){switch(jm(e)){case 1:var r=__;break;case 4:r=C_;break;default:r=Ad}n=r.bind(null,e,n,t),r=void 0,!Fu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Rc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=_r(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Pm(function(){var c=s,h=fd(n),u=[];e:{var f=oA.get(t);if(f!==void 0){var p=_d,v=t;switch(t){case"keypress":if(Ka(n)===0)break e;case"keydown":case"keyup":p=U_;break;case"focusin":v="focus",p=yc;break;case"focusout":v="blur",p=yc;break;case"beforeblur":case"afterblur":p=yc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Xf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=I_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=k_;break;case nA:case iA:case rA:p=E_;break;case sA:p=B_;break;case"scroll":p=x_;break;case"wheel":p=V_;break;case"copy":case"cut":case"paste":p=T_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Zf}var x=(e&4)!==0,g=!x&&t==="scroll",d=x?f!==null?f+"Capture":null:f;x=[];for(var A=c,m;A!==null;){m=A;var C=m.stateNode;if(m.tag===5&&C!==null&&(m=C,d!==null&&(C=wo(A,d),C!=null&&x.push(Do(A,C,m)))),g)break;A=A.return}0<x.length&&(f=new p(f,v,null,n,h),u.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Uu&&(v=n.relatedTarget||n.fromElement)&&(_r(v)||v[xi]))break e;if((p||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?_r(v):null,v!==null&&(g=Ur(v),v!==g||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(x=Xf,C="onMouseLeave",d="onMouseEnter",A="mouse",(t==="pointerout"||t==="pointerover")&&(x=Zf,C="onPointerLeave",d="onPointerEnter",A="pointer"),g=p==null?f:os(p),m=v==null?f:os(v),f=new x(C,A+"leave",p,n,h),f.target=g,f.relatedTarget=m,C=null,_r(h)===c&&(x=new x(d,A+"enter",v,n,h),x.target=m,x.relatedTarget=g,C=x),g=C,p&&v)t:{for(x=p,d=v,A=0,m=x;m;m=zr(m))A++;for(m=0,C=d;C;C=zr(C))m++;for(;0<A-m;)x=zr(x),A--;for(;0<m-A;)d=zr(d),m--;for(;A--;){if(x===d||d!==null&&x===d.alternate)break t;x=zr(x),d=zr(d)}x=null}else x=null;p!==null&&sp(u,f,p,x,!1),v!==null&&g!==null&&sp(u,g,v,x,!0)}}e:{if(f=c?os(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=J_;else if(Qf(f))if(Qm)T=$_;else{T=Q_;var S=K_}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(T=q_);if(T&&(T=T(t,c))){Km(u,T,n,h);break e}S&&S(t,f,c),t==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&bu(f,"number",f.value)}switch(S=c?os(c):window,t){case"focusin":(Qf(S)||S.contentEditable==="true")&&(rs=S,Vu=c,go=null);break;case"focusout":go=Vu=rs=null;break;case"mousedown":Hu=!0;break;case"contextmenu":case"mouseup":case"dragend":Hu=!1,np(u,n,h);break;case"selectionchange":if(nC)break;case"keydown":case"keyup":np(u,n,h)}var I;if(xd)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else is?Zm(t,n)&&(R="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(Ym&&n.locale!=="ko"&&(is||R!=="onCompositionStart"?R==="onCompositionEnd"&&is&&(I=Xm()):(Hi=h,vd="value"in Hi?Hi.value:Hi.textContent,is=!0)),S=vl(c,R),0<S.length&&(R=new Yf(R,t,null,n,h),u.push({event:R,listeners:S}),I?R.data=I:(I=Jm(n),I!==null&&(R.data=I)))),(I=W_?j_(t,n):X_(t,n))&&(c=vl(c,"onBeforeInput"),0<c.length&&(h=new Yf("onBeforeInput","beforeinput",null,n,h),u.push({event:h,listeners:c}),h.data=I))}aA(u,e)})}function Do(t,e,n){return{instance:t,listener:e,currentTarget:n}}function vl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=wo(t,n),s!=null&&i.unshift(Do(t,s,r)),s=wo(t,e),s!=null&&i.push(Do(t,s,r))),t=t.return}return i}function zr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function sp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=wo(n,s),l!=null&&o.unshift(Do(n,l,a))):r||(l=wo(n,s),l!=null&&o.push(Do(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var oC=/\r\n?/g,aC=/\u0000|\uFFFD/g;function op(t){return(typeof t=="string"?t:""+t).replace(oC,`
`).replace(aC,"")}function pa(t,e,n){if(e=op(e),op(t)!==e&&n)throw Error(ue(425))}function _l(){}var Wu=null,ju=null;function Xu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Yu=typeof setTimeout=="function"?setTimeout:void 0,lC=typeof clearTimeout=="function"?clearTimeout:void 0,ap=typeof Promise=="function"?Promise:void 0,cC=typeof queueMicrotask=="function"?queueMicrotask:typeof ap<"u"?function(t){return ap.resolve(null).then(t).catch(uC)}:Yu;function uC(t){setTimeout(function(){throw t})}function bc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),bo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);bo(e)}function Ji(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function lp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Hs=Math.random().toString(36).slice(2),$n="__reactFiber$"+Hs,Uo="__reactProps$"+Hs,xi="__reactContainer$"+Hs,Zu="__reactEvents$"+Hs,hC="__reactListeners$"+Hs,dC="__reactHandles$"+Hs;function _r(t){var e=t[$n];if(e)return e;for(var n=t.parentNode;n;){if(e=n[xi]||n[$n]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=lp(t);t!==null;){if(n=t[$n])return n;t=lp(t)}return e}t=n,n=t.parentNode}return null}function Qo(t){return t=t[$n]||t[xi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ue(33))}function Zl(t){return t[Uo]||null}var Ju=[],as=-1;function sr(t){return{current:t}}function dt(t){0>as||(t.current=Ju[as],Ju[as]=null,as--)}function lt(t,e){as++,Ju[as]=t.current,t.current=e}var ir={},Kt=sr(ir),ln=sr(!1),Sr=ir;function Ts(t,e){var n=t.type.contextTypes;if(!n)return ir;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function cn(t){return t=t.childContextTypes,t!=null}function Cl(){dt(ln),dt(Kt)}function cp(t,e,n){if(Kt.current!==ir)throw Error(ue(168));lt(Kt,e),lt(ln,n)}function cA(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ue(108,K0(t)||"Unknown",r));return vt({},n,i)}function xl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ir,Sr=Kt.current,lt(Kt,t),lt(ln,ln.current),!0}function up(t,e,n){var i=t.stateNode;if(!i)throw Error(ue(169));n?(t=cA(t,e,Sr),i.__reactInternalMemoizedMergedChildContext=t,dt(ln),dt(Kt),lt(Kt,t)):dt(ln),lt(ln,n)}var di=null,Jl=!1,Pc=!1;function uA(t){di===null?di=[t]:di.push(t)}function fC(t){Jl=!0,uA(t)}function or(){if(!Pc&&di!==null){Pc=!0;var t=0,e=st;try{var n=di;for(st=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}di=null,Jl=!1}catch(r){throw di!==null&&(di=di.slice(t+1)),Um(pd,or),r}finally{st=e,Pc=!1}}return null}var ls=[],cs=0,yl=null,Il=0,Sn=[],En=0,Er=null,fi=1,pi="";function pr(t,e){ls[cs++]=Il,ls[cs++]=yl,yl=t,Il=e}function hA(t,e,n){Sn[En++]=fi,Sn[En++]=pi,Sn[En++]=Er,Er=t;var i=fi;t=pi;var r=32-jn(i)-1;i&=~(1<<r),n+=1;var s=32-jn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,fi=1<<32-jn(e)+r|n<<r|i,pi=s+t}else fi=1<<s|n<<r|i,pi=t}function Id(t){t.return!==null&&(pr(t,1),hA(t,1,0))}function Md(t){for(;t===yl;)yl=ls[--cs],ls[cs]=null,Il=ls[--cs],ls[cs]=null;for(;t===Er;)Er=Sn[--En],Sn[En]=null,pi=Sn[--En],Sn[En]=null,fi=Sn[--En],Sn[En]=null}var vn=null,An=null,ft=!1,Gn=null;function dA(t,e){var n=Tn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function hp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,vn=t,An=Ji(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,vn=t,An=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Er!==null?{id:fi,overflow:pi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Tn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,vn=t,An=null,!0):!1;default:return!1}}function Ku(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Qu(t){if(ft){var e=An;if(e){var n=e;if(!hp(t,e)){if(Ku(t))throw Error(ue(418));e=Ji(n.nextSibling);var i=vn;e&&hp(t,e)?dA(i,n):(t.flags=t.flags&-4097|2,ft=!1,vn=t)}}else{if(Ku(t))throw Error(ue(418));t.flags=t.flags&-4097|2,ft=!1,vn=t}}}function dp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;vn=t}function ga(t){if(t!==vn)return!1;if(!ft)return dp(t),ft=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Xu(t.type,t.memoizedProps)),e&&(e=An)){if(Ku(t))throw fA(),Error(ue(418));for(;e;)dA(t,e),e=Ji(e.nextSibling)}if(dp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){An=Ji(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}An=null}}else An=vn?Ji(t.stateNode.nextSibling):null;return!0}function fA(){for(var t=An;t;)t=Ji(t.nextSibling)}function Rs(){An=vn=null,ft=!1}function Sd(t){Gn===null?Gn=[t]:Gn.push(t)}var pC=wi.ReactCurrentBatchConfig;function Qs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ue(309));var i=n.stateNode}if(!i)throw Error(ue(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ue(284));if(!n._owner)throw Error(ue(290,t))}return t}function ma(t,e){throw t=Object.prototype.toString.call(e),Error(ue(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function fp(t){var e=t._init;return e(t._payload)}function pA(t){function e(d,A){if(t){var m=d.deletions;m===null?(d.deletions=[A],d.flags|=16):m.push(A)}}function n(d,A){if(!t)return null;for(;A!==null;)e(d,A),A=A.sibling;return null}function i(d,A){for(d=new Map;A!==null;)A.key!==null?d.set(A.key,A):d.set(A.index,A),A=A.sibling;return d}function r(d,A){return d=$i(d,A),d.index=0,d.sibling=null,d}function s(d,A,m){return d.index=m,t?(m=d.alternate,m!==null?(m=m.index,m<A?(d.flags|=2,A):m):(d.flags|=2,A)):(d.flags|=1048576,A)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,A,m,C){return A===null||A.tag!==6?(A=kc(m,d.mode,C),A.return=d,A):(A=r(A,m),A.return=d,A)}function l(d,A,m,C){var T=m.type;return T===ns?h(d,A,m.props.children,C,m.key):A!==null&&(A.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Fi&&fp(T)===A.type)?(C=r(A,m.props),C.ref=Qs(d,A,m),C.return=d,C):(C=il(m.type,m.key,m.props,null,d.mode,C),C.ref=Qs(d,A,m),C.return=d,C)}function c(d,A,m,C){return A===null||A.tag!==4||A.stateNode.containerInfo!==m.containerInfo||A.stateNode.implementation!==m.implementation?(A=zc(m,d.mode,C),A.return=d,A):(A=r(A,m.children||[]),A.return=d,A)}function h(d,A,m,C,T){return A===null||A.tag!==7?(A=Mr(m,d.mode,C,T),A.return=d,A):(A=r(A,m),A.return=d,A)}function u(d,A,m){if(typeof A=="string"&&A!==""||typeof A=="number")return A=kc(""+A,d.mode,m),A.return=d,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case sa:return m=il(A.type,A.key,A.props,null,d.mode,m),m.ref=Qs(d,null,A),m.return=d,m;case ts:return A=zc(A,d.mode,m),A.return=d,A;case Fi:var C=A._init;return u(d,C(A._payload),m)}if(oo(A)||Xs(A))return A=Mr(A,d.mode,m,null),A.return=d,A;ma(d,A)}return null}function f(d,A,m,C){var T=A!==null?A.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return T!==null?null:a(d,A,""+m,C);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case sa:return m.key===T?l(d,A,m,C):null;case ts:return m.key===T?c(d,A,m,C):null;case Fi:return T=m._init,f(d,A,T(m._payload),C)}if(oo(m)||Xs(m))return T!==null?null:h(d,A,m,C,null);ma(d,m)}return null}function p(d,A,m,C,T){if(typeof C=="string"&&C!==""||typeof C=="number")return d=d.get(m)||null,a(A,d,""+C,T);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case sa:return d=d.get(C.key===null?m:C.key)||null,l(A,d,C,T);case ts:return d=d.get(C.key===null?m:C.key)||null,c(A,d,C,T);case Fi:var S=C._init;return p(d,A,m,S(C._payload),T)}if(oo(C)||Xs(C))return d=d.get(m)||null,h(A,d,C,T,null);ma(A,C)}return null}function v(d,A,m,C){for(var T=null,S=null,I=A,R=A=0,B=null;I!==null&&R<m.length;R++){I.index>R?(B=I,I=null):B=I.sibling;var _=f(d,I,m[R],C);if(_===null){I===null&&(I=B);break}t&&I&&_.alternate===null&&e(d,I),A=s(_,A,R),S===null?T=_:S.sibling=_,S=_,I=B}if(R===m.length)return n(d,I),ft&&pr(d,R),T;if(I===null){for(;R<m.length;R++)I=u(d,m[R],C),I!==null&&(A=s(I,A,R),S===null?T=I:S.sibling=I,S=I);return ft&&pr(d,R),T}for(I=i(d,I);R<m.length;R++)B=p(I,d,R,m[R],C),B!==null&&(t&&B.alternate!==null&&I.delete(B.key===null?R:B.key),A=s(B,A,R),S===null?T=B:S.sibling=B,S=B);return t&&I.forEach(function(y){return e(d,y)}),ft&&pr(d,R),T}function x(d,A,m,C){var T=Xs(m);if(typeof T!="function")throw Error(ue(150));if(m=T.call(m),m==null)throw Error(ue(151));for(var S=T=null,I=A,R=A=0,B=null,_=m.next();I!==null&&!_.done;R++,_=m.next()){I.index>R?(B=I,I=null):B=I.sibling;var y=f(d,I,_.value,C);if(y===null){I===null&&(I=B);break}t&&I&&y.alternate===null&&e(d,I),A=s(y,A,R),S===null?T=y:S.sibling=y,S=y,I=B}if(_.done)return n(d,I),ft&&pr(d,R),T;if(I===null){for(;!_.done;R++,_=m.next())_=u(d,_.value,C),_!==null&&(A=s(_,A,R),S===null?T=_:S.sibling=_,S=_);return ft&&pr(d,R),T}for(I=i(d,I);!_.done;R++,_=m.next())_=p(I,d,R,_.value,C),_!==null&&(t&&_.alternate!==null&&I.delete(_.key===null?R:_.key),A=s(_,A,R),S===null?T=_:S.sibling=_,S=_);return t&&I.forEach(function(N){return e(d,N)}),ft&&pr(d,R),T}function g(d,A,m,C){if(typeof m=="object"&&m!==null&&m.type===ns&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case sa:e:{for(var T=m.key,S=A;S!==null;){if(S.key===T){if(T=m.type,T===ns){if(S.tag===7){n(d,S.sibling),A=r(S,m.props.children),A.return=d,d=A;break e}}else if(S.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Fi&&fp(T)===S.type){n(d,S.sibling),A=r(S,m.props),A.ref=Qs(d,S,m),A.return=d,d=A;break e}n(d,S);break}else e(d,S);S=S.sibling}m.type===ns?(A=Mr(m.props.children,d.mode,C,m.key),A.return=d,d=A):(C=il(m.type,m.key,m.props,null,d.mode,C),C.ref=Qs(d,A,m),C.return=d,d=C)}return o(d);case ts:e:{for(S=m.key;A!==null;){if(A.key===S)if(A.tag===4&&A.stateNode.containerInfo===m.containerInfo&&A.stateNode.implementation===m.implementation){n(d,A.sibling),A=r(A,m.children||[]),A.return=d,d=A;break e}else{n(d,A);break}else e(d,A);A=A.sibling}A=zc(m,d.mode,C),A.return=d,d=A}return o(d);case Fi:return S=m._init,g(d,A,S(m._payload),C)}if(oo(m))return v(d,A,m,C);if(Xs(m))return x(d,A,m,C);ma(d,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,A!==null&&A.tag===6?(n(d,A.sibling),A=r(A,m),A.return=d,d=A):(n(d,A),A=kc(m,d.mode,C),A.return=d,d=A),o(d)):n(d,A)}return g}var bs=pA(!0),gA=pA(!1),Ml=sr(null),Sl=null,us=null,Ed=null;function wd(){Ed=us=Sl=null}function Td(t){var e=Ml.current;dt(Ml),t._currentValue=e}function qu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Cs(t,e){Sl=t,Ed=us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(an=!0),t.firstContext=null)}function Pn(t){var e=t._currentValue;if(Ed!==t)if(t={context:t,memoizedValue:e,next:null},us===null){if(Sl===null)throw Error(ue(308));us=t,Sl.dependencies={lanes:0,firstContext:t}}else us=us.next=t;return e}var Cr=null;function Rd(t){Cr===null?Cr=[t]:Cr.push(t)}function mA(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Rd(e)):(n.next=r.next,r.next=n),e.interleaved=n,yi(t,i)}function yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ki=!1;function bd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function AA(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ki(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,yi(t,n)}return r=i.interleaved,r===null?(e.next=e,Rd(i)):(e.next=r.next,r.next=e),i.interleaved=e,yi(t,n)}function Qa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gd(t,n)}}function pp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function El(t,e,n,i){var r=t.updateQueue;ki=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=t.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var u=r.baseState;o=0,h=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){h!==null&&(h=h.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,x=a;switch(f=e,p=n,x.tag){case 1:if(v=x.payload,typeof v=="function"){u=v.call(p,u,f);break e}u=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,f=typeof v=="function"?v.call(p,u,f):v,f==null)break e;u=vt({},u,f);break e;case 2:ki=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=p,l=u):h=h.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(h===null&&(l=u),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Tr|=o,t.lanes=o,t.memoizedState=u}}function gp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ue(191,r));r.call(i)}}}var qo={},ti=sr(qo),Oo=sr(qo),Fo=sr(qo);function xr(t){if(t===qo)throw Error(ue(174));return t}function Pd(t,e){switch(lt(Fo,e),lt(Oo,t),lt(ti,qo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Lu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Lu(e,t)}dt(ti),lt(ti,e)}function Ps(){dt(ti),dt(Oo),dt(Fo)}function vA(t){xr(Fo.current);var e=xr(ti.current),n=Lu(e,t.type);e!==n&&(lt(Oo,t),lt(ti,n))}function Ld(t){Oo.current===t&&(dt(ti),dt(Oo))}var gt=sr(0);function wl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Lc=[];function Nd(){for(var t=0;t<Lc.length;t++)Lc[t]._workInProgressVersionPrimary=null;Lc.length=0}var qa=wi.ReactCurrentDispatcher,Nc=wi.ReactCurrentBatchConfig,wr=0,At=null,Rt=null,Ut=null,Tl=!1,mo=!1,ko=0,gC=0;function Ht(){throw Error(ue(321))}function Dd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Yn(t[n],e[n]))return!1;return!0}function Ud(t,e,n,i,r,s){if(wr=s,At=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,qa.current=t===null||t.memoizedState===null?_C:CC,t=n(i,r),mo){s=0;do{if(mo=!1,ko=0,25<=s)throw Error(ue(301));s+=1,Ut=Rt=null,e.updateQueue=null,qa.current=xC,t=n(i,r)}while(mo)}if(qa.current=Rl,e=Rt!==null&&Rt.next!==null,wr=0,Ut=Rt=At=null,Tl=!1,e)throw Error(ue(300));return t}function Od(){var t=ko!==0;return ko=0,t}function Qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ut===null?At.memoizedState=Ut=t:Ut=Ut.next=t,Ut}function Ln(){if(Rt===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=Rt.next;var e=Ut===null?At.memoizedState:Ut.next;if(e!==null)Ut=e,Rt=t;else{if(t===null)throw Error(ue(310));Rt=t,t={memoizedState:Rt.memoizedState,baseState:Rt.baseState,baseQueue:Rt.baseQueue,queue:Rt.queue,next:null},Ut===null?At.memoizedState=Ut=t:Ut=Ut.next=t}return Ut}function zo(t,e){return typeof e=="function"?e(t):e}function Dc(t){var e=Ln(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=Rt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((wr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var u={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=u,o=i):l=l.next=u,At.lanes|=h,Tr|=h}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Yn(i,e.memoizedState)||(an=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,At.lanes|=s,Tr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Uc(t){var e=Ln(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Yn(s,e.memoizedState)||(an=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function _A(){}function CA(t,e){var n=At,i=Ln(),r=e(),s=!Yn(i.memoizedState,r);if(s&&(i.memoizedState=r,an=!0),i=i.queue,Fd(IA.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ut!==null&&Ut.memoizedState.tag&1){if(n.flags|=2048,Bo(9,yA.bind(null,n,i,r,e),void 0,null),Ot===null)throw Error(ue(349));wr&30||xA(n,e,r)}return r}function xA(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yA(t,e,n,i){e.value=n,e.getSnapshot=i,MA(e)&&SA(t)}function IA(t,e,n){return n(function(){MA(e)&&SA(t)})}function MA(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Yn(t,n)}catch{return!0}}function SA(t){var e=yi(t,1);e!==null&&Xn(e,t,1,-1)}function mp(t){var e=Qn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:t},e.queue=t,t=t.dispatch=vC.bind(null,At,t),[e.memoizedState,t]}function Bo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function EA(){return Ln().memoizedState}function $a(t,e,n,i){var r=Qn();At.flags|=t,r.memoizedState=Bo(1|e,n,void 0,i===void 0?null:i)}function Kl(t,e,n,i){var r=Ln();i=i===void 0?null:i;var s=void 0;if(Rt!==null){var o=Rt.memoizedState;if(s=o.destroy,i!==null&&Dd(i,o.deps)){r.memoizedState=Bo(e,n,s,i);return}}At.flags|=t,r.memoizedState=Bo(1|e,n,s,i)}function Ap(t,e){return $a(8390656,8,t,e)}function Fd(t,e){return Kl(2048,8,t,e)}function wA(t,e){return Kl(4,2,t,e)}function TA(t,e){return Kl(4,4,t,e)}function RA(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function bA(t,e,n){return n=n!=null?n.concat([t]):null,Kl(4,4,RA.bind(null,e,t),n)}function kd(){}function PA(t,e){var n=Ln();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function LA(t,e){var n=Ln();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function NA(t,e,n){return wr&21?(Yn(n,e)||(n=km(),At.lanes|=n,Tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,an=!0),t.memoizedState=n)}function mC(t,e){var n=st;st=n!==0&&4>n?n:4,t(!0);var i=Nc.transition;Nc.transition={};try{t(!1),e()}finally{st=n,Nc.transition=i}}function DA(){return Ln().memoizedState}function AC(t,e,n){var i=qi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},UA(t))OA(e,n);else if(n=mA(t,e,n,i),n!==null){var r=en();Xn(n,t,i,r),FA(n,e,i)}}function vC(t,e,n){var i=qi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(UA(t))OA(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Yn(a,o)){var l=e.interleaved;l===null?(r.next=r,Rd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=mA(t,e,r,i),n!==null&&(r=en(),Xn(n,t,i,r),FA(n,e,i))}}function UA(t){var e=t.alternate;return t===At||e!==null&&e===At}function OA(t,e){mo=Tl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function FA(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gd(t,n)}}var Rl={readContext:Pn,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useInsertionEffect:Ht,useLayoutEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useMutableSource:Ht,useSyncExternalStore:Ht,useId:Ht,unstable_isNewReconciler:!1},_C={readContext:Pn,useCallback:function(t,e){return Qn().memoizedState=[t,e===void 0?null:e],t},useContext:Pn,useEffect:Ap,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,$a(4194308,4,RA.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $a(4194308,4,t,e)},useInsertionEffect:function(t,e){return $a(4,2,t,e)},useMemo:function(t,e){var n=Qn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Qn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=AC.bind(null,At,t),[i.memoizedState,t]},useRef:function(t){var e=Qn();return t={current:t},e.memoizedState=t},useState:mp,useDebugValue:kd,useDeferredValue:function(t){return Qn().memoizedState=t},useTransition:function(){var t=mp(!1),e=t[0];return t=mC.bind(null,t[1]),Qn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=At,r=Qn();if(ft){if(n===void 0)throw Error(ue(407));n=n()}else{if(n=e(),Ot===null)throw Error(ue(349));wr&30||xA(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Ap(IA.bind(null,i,s,t),[t]),i.flags|=2048,Bo(9,yA.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Qn(),e=Ot.identifierPrefix;if(ft){var n=pi,i=fi;n=(i&~(1<<32-jn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ko++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=gC++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},CC={readContext:Pn,useCallback:PA,useContext:Pn,useEffect:Fd,useImperativeHandle:bA,useInsertionEffect:wA,useLayoutEffect:TA,useMemo:LA,useReducer:Dc,useRef:EA,useState:function(){return Dc(zo)},useDebugValue:kd,useDeferredValue:function(t){var e=Ln();return NA(e,Rt.memoizedState,t)},useTransition:function(){var t=Dc(zo)[0],e=Ln().memoizedState;return[t,e]},useMutableSource:_A,useSyncExternalStore:CA,useId:DA,unstable_isNewReconciler:!1},xC={readContext:Pn,useCallback:PA,useContext:Pn,useEffect:Fd,useImperativeHandle:bA,useInsertionEffect:wA,useLayoutEffect:TA,useMemo:LA,useReducer:Uc,useRef:EA,useState:function(){return Uc(zo)},useDebugValue:kd,useDeferredValue:function(t){var e=Ln();return Rt===null?e.memoizedState=t:NA(e,Rt.memoizedState,t)},useTransition:function(){var t=Uc(zo)[0],e=Ln().memoizedState;return[t,e]},useMutableSource:_A,useSyncExternalStore:CA,useId:DA,unstable_isNewReconciler:!1};function kn(t,e){if(t&&t.defaultProps){e=vt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function $u(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:vt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ql={isMounted:function(t){return(t=t._reactInternals)?Ur(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=en(),r=qi(t),s=vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Ki(t,s,r),e!==null&&(Xn(e,t,r,i),Qa(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=en(),r=qi(t),s=vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ki(t,s,r),e!==null&&(Xn(e,t,r,i),Qa(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=en(),i=qi(t),r=vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Ki(t,r,i),e!==null&&(Xn(e,t,i,n),Qa(e,t,i))}};function vp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Lo(n,i)||!Lo(r,s):!0}function kA(t,e,n){var i=!1,r=ir,s=e.contextType;return typeof s=="object"&&s!==null?s=Pn(s):(r=cn(e)?Sr:Kt.current,i=e.contextTypes,s=(i=i!=null)?Ts(t,r):ir),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ql,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function _p(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Ql.enqueueReplaceState(e,e.state,null)}function eh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},bd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Pn(s):(s=cn(e)?Sr:Kt.current,r.context=Ts(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&($u(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Ql.enqueueReplaceState(r,r.state,null),El(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ls(t,e){try{var n="",i=e;do n+=J0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Oc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function th(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var yC=typeof WeakMap=="function"?WeakMap:Map;function zA(t,e,n){n=vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Pl||(Pl=!0,hh=i),th(t,e)},n}function BA(t,e,n){n=vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){th(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){th(t,e),typeof i!="function"&&(Qi===null?Qi=new Set([this]):Qi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Cp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new yC;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=OC.bind(null,t,e,n),e.then(t,t))}function xp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function yp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=vi(-1,1),e.tag=2,Ki(n,e,1))),n.lanes|=1),t)}var IC=wi.ReactCurrentOwner,an=!1;function $t(t,e,n,i){e.child=t===null?gA(e,null,n,i):bs(e,t.child,n,i)}function Ip(t,e,n,i,r){n=n.render;var s=e.ref;return Cs(e,r),i=Ud(t,e,n,i,s,r),n=Od(),t!==null&&!an?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(ft&&n&&Id(e),e.flags|=1,$t(t,e,i,r),e.child)}function Mp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Xd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,GA(t,e,s,i,r)):(t=il(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Lo,n(o,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=$i(s,i),t.ref=e.ref,t.return=e,e.child=t}function GA(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Lo(s,i)&&t.ref===e.ref)if(an=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(an=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return nh(t,e,n,i,r)}function VA(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},lt(ds,gn),gn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,lt(ds,gn),gn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,lt(ds,gn),gn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,lt(ds,gn),gn|=i;return $t(t,e,r,n),e.child}function HA(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function nh(t,e,n,i,r){var s=cn(n)?Sr:Kt.current;return s=Ts(e,s),Cs(e,r),n=Ud(t,e,n,i,s,r),i=Od(),t!==null&&!an?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(ft&&i&&Id(e),e.flags|=1,$t(t,e,n,r),e.child)}function Sp(t,e,n,i,r){if(cn(n)){var s=!0;xl(e)}else s=!1;if(Cs(e,r),e.stateNode===null)el(t,e),kA(e,n,i),eh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Pn(c):(c=cn(n)?Sr:Kt.current,c=Ts(e,c));var h=n.getDerivedStateFromProps,u=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&_p(e,o,i,c),ki=!1;var f=e.memoizedState;o.state=f,El(e,i,o,r),l=e.memoizedState,a!==i||f!==l||ln.current||ki?(typeof h=="function"&&($u(e,n,h,i),l=e.memoizedState),(a=ki||vp(e,n,a,i,f,l,c))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,AA(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:kn(e.type,a),o.props=c,u=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Pn(l):(l=cn(n)?Sr:Kt.current,l=Ts(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==u||f!==l)&&_p(e,o,i,l),ki=!1,f=e.memoizedState,o.state=f,El(e,i,o,r);var v=e.memoizedState;a!==u||f!==v||ln.current||ki?(typeof p=="function"&&($u(e,n,p,i),v=e.memoizedState),(c=ki||vp(e,n,c,i,f,v,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return ih(t,e,n,i,s,r)}function ih(t,e,n,i,r,s){HA(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&up(e,n,!1),Ii(t,e,s);i=e.stateNode,IC.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=bs(e,t.child,null,s),e.child=bs(e,null,a,s)):$t(t,e,a,s),e.memoizedState=i.state,r&&up(e,n,!0),e.child}function WA(t){var e=t.stateNode;e.pendingContext?cp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&cp(t,e.context,!1),Pd(t,e.containerInfo)}function Ep(t,e,n,i,r){return Rs(),Sd(r),e.flags|=256,$t(t,e,n,i),e.child}var rh={dehydrated:null,treeContext:null,retryLane:0};function sh(t){return{baseLanes:t,cachePool:null,transitions:null}}function jA(t,e,n){var i=e.pendingProps,r=gt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),lt(gt,r&1),t===null)return Qu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ec(o,i,0,null),t=Mr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=sh(n),e.memoizedState=rh,t):zd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return MC(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=$i(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=$i(a,s):(s=Mr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?sh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=rh,i}return s=t.child,t=s.sibling,i=$i(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function zd(t,e){return e=ec({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Aa(t,e,n,i){return i!==null&&Sd(i),bs(e,t.child,null,n),t=zd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function MC(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Oc(Error(ue(422))),Aa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ec({mode:"visible",children:i.children},r,0,null),s=Mr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&bs(e,t.child,null,o),e.child.memoizedState=sh(o),e.memoizedState=rh,s);if(!(e.mode&1))return Aa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ue(419)),i=Oc(s,i,void 0),Aa(t,e,o,i)}if(a=(o&t.childLanes)!==0,an||a){if(i=Ot,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,yi(t,r),Xn(i,t,r,-1))}return jd(),i=Oc(Error(ue(421))),Aa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=FC.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,An=Ji(r.nextSibling),vn=e,ft=!0,Gn=null,t!==null&&(Sn[En++]=fi,Sn[En++]=pi,Sn[En++]=Er,fi=t.id,pi=t.overflow,Er=e),e=zd(e,i.children),e.flags|=4096,e)}function wp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),qu(t.return,e,n)}function Fc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function XA(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if($t(t,e,i.children,n),i=gt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&wp(t,n,e);else if(t.tag===19)wp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(lt(gt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&wl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Fc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&wl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Fc(e,!0,n,null,s);break;case"together":Fc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function el(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ue(153));if(e.child!==null){for(t=e.child,n=$i(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=$i(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function SC(t,e,n){switch(e.tag){case 3:WA(e),Rs();break;case 5:vA(e);break;case 1:cn(e.type)&&xl(e);break;case 4:Pd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;lt(Ml,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(lt(gt,gt.current&1),e.flags|=128,null):n&e.child.childLanes?jA(t,e,n):(lt(gt,gt.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);lt(gt,gt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return XA(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),lt(gt,gt.current),i)break;return null;case 22:case 23:return e.lanes=0,VA(t,e,n)}return Ii(t,e,n)}var YA,oh,ZA,JA;YA=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};oh=function(){};ZA=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,xr(ti.current);var s=null;switch(n){case"input":r=Tu(t,r),i=Tu(t,i),s=[];break;case"select":r=vt({},r,{value:void 0}),i=vt({},i,{value:void 0}),s=[];break;case"textarea":r=Pu(t,r),i=Pu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=_l)}Nu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(So.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(So.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};JA=function(t,e,n,i){n!==i&&(e.flags|=4)};function qs(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Wt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function EC(t,e,n){var i=e.pendingProps;switch(Md(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Wt(e),null;case 1:return cn(e.type)&&Cl(),Wt(e),null;case 3:return i=e.stateNode,Ps(),dt(ln),dt(Kt),Nd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ga(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Gn!==null&&(ph(Gn),Gn=null))),oh(t,e),Wt(e),null;case 5:Ld(e);var r=xr(Fo.current);if(n=e.type,t!==null&&e.stateNode!=null)ZA(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return Wt(e),null}if(t=xr(ti.current),ga(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[$n]=e,i[Uo]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<lo.length;r++)ut(lo[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":Of(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":kf(i,s),ut("invalid",i)}Nu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",""+a]):So.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":oa(i),Ff(i,s,!0);break;case"textarea":oa(i),zf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=_l)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Im(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[$n]=e,t[Uo]=i,YA(t,e,!1,!1),e.stateNode=t;e:{switch(o=Du(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<lo.length;r++)ut(lo[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":Of(t,i),r=Tu(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=vt({},i,{value:void 0}),ut("invalid",t);break;case"textarea":kf(t,i),r=Pu(t,i),ut("invalid",t);break;default:r=i}Nu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Em(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Mm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Eo(t,l):typeof l=="number"&&Eo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(So.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&cd(t,s,l,o))}switch(n){case"input":oa(t),Ff(t,i,!1);break;case"textarea":oa(t),zf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+nr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ms(t,!!i.multiple,s,!1):i.defaultValue!=null&&ms(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=_l)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Wt(e),null;case 6:if(t&&e.stateNode!=null)JA(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ue(166));if(n=xr(Fo.current),xr(ti.current),ga(e)){if(i=e.stateNode,n=e.memoizedProps,i[$n]=e,(s=i.nodeValue!==n)&&(t=vn,t!==null))switch(t.tag){case 3:pa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&pa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[$n]=e,e.stateNode=i}return Wt(e),null;case 13:if(dt(gt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ft&&An!==null&&e.mode&1&&!(e.flags&128))fA(),Rs(),e.flags|=98560,s=!1;else if(s=ga(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ue(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ue(317));s[$n]=e}else Rs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Wt(e),s=!1}else Gn!==null&&(ph(Gn),Gn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||gt.current&1?Pt===0&&(Pt=3):jd())),e.updateQueue!==null&&(e.flags|=4),Wt(e),null);case 4:return Ps(),oh(t,e),t===null&&No(e.stateNode.containerInfo),Wt(e),null;case 10:return Td(e.type._context),Wt(e),null;case 17:return cn(e.type)&&Cl(),Wt(e),null;case 19:if(dt(gt),s=e.memoizedState,s===null)return Wt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)qs(s,!1);else{if(Pt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=wl(t),o!==null){for(e.flags|=128,qs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return lt(gt,gt.current&1|2),e.child}t=t.sibling}s.tail!==null&&St()>Ns&&(e.flags|=128,i=!0,qs(s,!1),e.lanes=4194304)}else{if(!i)if(t=wl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),qs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ft)return Wt(e),null}else 2*St()-s.renderingStartTime>Ns&&n!==1073741824&&(e.flags|=128,i=!0,qs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=St(),e.sibling=null,n=gt.current,lt(gt,i?n&1|2:n&1),e):(Wt(e),null);case 22:case 23:return Wd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?gn&1073741824&&(Wt(e),e.subtreeFlags&6&&(e.flags|=8192)):Wt(e),null;case 24:return null;case 25:return null}throw Error(ue(156,e.tag))}function wC(t,e){switch(Md(e),e.tag){case 1:return cn(e.type)&&Cl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ps(),dt(ln),dt(Kt),Nd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Ld(e),null;case 13:if(dt(gt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ue(340));Rs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(gt),null;case 4:return Ps(),null;case 10:return Td(e.type._context),null;case 22:case 23:return Wd(),null;case 24:return null;default:return null}}var va=!1,Yt=!1,TC=typeof WeakSet=="function"?WeakSet:Set,we=null;function hs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){xt(t,e,i)}else n.current=null}function ah(t,e,n){try{n()}catch(i){xt(t,e,i)}}var Tp=!1;function RC(t,e){if(Wu=ml,t=eA(),yd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,h=0,u=t,f=null;t:for(;;){for(var p;u!==n||r!==0&&u.nodeType!==3||(a=o+r),u!==s||i!==0&&u.nodeType!==3||(l=o+i),u.nodeType===3&&(o+=u.nodeValue.length),(p=u.firstChild)!==null;)f=u,u=p;for(;;){if(u===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++h===i&&(l=o),(p=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(ju={focusedElem:t,selectionRange:n},ml=!1,we=e;we!==null;)if(e=we,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,we=t;else for(;we!==null;){e=we;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var x=v.memoizedProps,g=v.memoizedState,d=e.stateNode,A=d.getSnapshotBeforeUpdate(e.elementType===e.type?x:kn(e.type,x),g);d.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ue(163))}}catch(C){xt(e,e.return,C)}if(t=e.sibling,t!==null){t.return=e.return,we=t;break}we=e.return}return v=Tp,Tp=!1,v}function Ao(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&ah(e,n,s)}r=r.next}while(r!==i)}}function ql(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function lh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function KA(t){var e=t.alternate;e!==null&&(t.alternate=null,KA(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[$n],delete e[Uo],delete e[Zu],delete e[hC],delete e[dC])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function QA(t){return t.tag===5||t.tag===3||t.tag===4}function Rp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||QA(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ch(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=_l));else if(i!==4&&(t=t.child,t!==null))for(ch(t,e,n),t=t.sibling;t!==null;)ch(t,e,n),t=t.sibling}function uh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(uh(t,e,n),t=t.sibling;t!==null;)uh(t,e,n),t=t.sibling}var zt=null,zn=!1;function bi(t,e,n){for(n=n.child;n!==null;)qA(t,e,n),n=n.sibling}function qA(t,e,n){if(ei&&typeof ei.onCommitFiberUnmount=="function")try{ei.onCommitFiberUnmount(Wl,n)}catch{}switch(n.tag){case 5:Yt||hs(n,e);case 6:var i=zt,r=zn;zt=null,bi(t,e,n),zt=i,zn=r,zt!==null&&(zn?(t=zt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):zt.removeChild(n.stateNode));break;case 18:zt!==null&&(zn?(t=zt,n=n.stateNode,t.nodeType===8?bc(t.parentNode,n):t.nodeType===1&&bc(t,n),bo(t)):bc(zt,n.stateNode));break;case 4:i=zt,r=zn,zt=n.stateNode.containerInfo,zn=!0,bi(t,e,n),zt=i,zn=r;break;case 0:case 11:case 14:case 15:if(!Yt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&ah(n,e,o),r=r.next}while(r!==i)}bi(t,e,n);break;case 1:if(!Yt&&(hs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){xt(n,e,a)}bi(t,e,n);break;case 21:bi(t,e,n);break;case 22:n.mode&1?(Yt=(i=Yt)||n.memoizedState!==null,bi(t,e,n),Yt=i):bi(t,e,n);break;default:bi(t,e,n)}}function bp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new TC),e.forEach(function(i){var r=kC.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Dn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:zt=a.stateNode,zn=!1;break e;case 3:zt=a.stateNode.containerInfo,zn=!0;break e;case 4:zt=a.stateNode.containerInfo,zn=!0;break e}a=a.return}if(zt===null)throw Error(ue(160));qA(s,o,r),zt=null,zn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){xt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)$A(e,t),e=e.sibling}function $A(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Dn(e,t),Jn(t),i&4){try{Ao(3,t,t.return),ql(3,t)}catch(x){xt(t,t.return,x)}try{Ao(5,t,t.return)}catch(x){xt(t,t.return,x)}}break;case 1:Dn(e,t),Jn(t),i&512&&n!==null&&hs(n,n.return);break;case 5:if(Dn(e,t),Jn(t),i&512&&n!==null&&hs(n,n.return),t.flags&32){var r=t.stateNode;try{Eo(r,"")}catch(x){xt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&xm(r,s),Du(a,o);var c=Du(a,s);for(o=0;o<l.length;o+=2){var h=l[o],u=l[o+1];h==="style"?Em(r,u):h==="dangerouslySetInnerHTML"?Mm(r,u):h==="children"?Eo(r,u):cd(r,h,u,c)}switch(a){case"input":Ru(r,s);break;case"textarea":ym(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ms(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?ms(r,!!s.multiple,s.defaultValue,!0):ms(r,!!s.multiple,s.multiple?[]:"",!1))}r[Uo]=s}catch(x){xt(t,t.return,x)}}break;case 6:if(Dn(e,t),Jn(t),i&4){if(t.stateNode===null)throw Error(ue(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){xt(t,t.return,x)}}break;case 3:if(Dn(e,t),Jn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{bo(e.containerInfo)}catch(x){xt(t,t.return,x)}break;case 4:Dn(e,t),Jn(t);break;case 13:Dn(e,t),Jn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Vd=St())),i&4&&bp(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(Yt=(c=Yt)||h,Dn(e,t),Yt=c):Dn(e,t),Jn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(we=t,h=t.child;h!==null;){for(u=we=h;we!==null;){switch(f=we,p=f.child,f.tag){case 0:case 11:case 14:case 15:Ao(4,f,f.return);break;case 1:hs(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(x){xt(i,n,x)}}break;case 5:hs(f,f.return);break;case 22:if(f.memoizedState!==null){Lp(u);continue}}p!==null?(p.return=f,we=p):Lp(u)}h=h.sibling}e:for(h=null,u=t;;){if(u.tag===5){if(h===null){h=u;try{r=u.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=u.stateNode,l=u.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Sm("display",o))}catch(x){xt(t,t.return,x)}}}else if(u.tag===6){if(h===null)try{u.stateNode.nodeValue=c?"":u.memoizedProps}catch(x){xt(t,t.return,x)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===t)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;h===u&&(h=null),u=u.return}h===u&&(h=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:Dn(e,t),Jn(t),i&4&&bp(t);break;case 21:break;default:Dn(e,t),Jn(t)}}function Jn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(QA(n)){var i=n;break e}n=n.return}throw Error(ue(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Eo(r,""),i.flags&=-33);var s=Rp(t);uh(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Rp(t);ch(t,a,o);break;default:throw Error(ue(161))}}catch(l){xt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function bC(t,e,n){we=t,ev(t)}function ev(t,e,n){for(var i=(t.mode&1)!==0;we!==null;){var r=we,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||va;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Yt;a=va;var c=Yt;if(va=o,(Yt=l)&&!c)for(we=r;we!==null;)o=we,l=o.child,o.tag===22&&o.memoizedState!==null?Np(r):l!==null?(l.return=o,we=l):Np(r);for(;s!==null;)we=s,ev(s),s=s.sibling;we=r,va=a,Yt=c}Pp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,we=s):Pp(t)}}function Pp(t){for(;we!==null;){var e=we;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Yt||ql(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Yt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:kn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&gp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}gp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var u=h.dehydrated;u!==null&&bo(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ue(163))}Yt||e.flags&512&&lh(e)}catch(f){xt(e,e.return,f)}}if(e===t){we=null;break}if(n=e.sibling,n!==null){n.return=e.return,we=n;break}we=e.return}}function Lp(t){for(;we!==null;){var e=we;if(e===t){we=null;break}var n=e.sibling;if(n!==null){n.return=e.return,we=n;break}we=e.return}}function Np(t){for(;we!==null;){var e=we;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ql(4,e)}catch(l){xt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){xt(e,r,l)}}var s=e.return;try{lh(e)}catch(l){xt(e,s,l)}break;case 5:var o=e.return;try{lh(e)}catch(l){xt(e,o,l)}}}catch(l){xt(e,e.return,l)}if(e===t){we=null;break}var a=e.sibling;if(a!==null){a.return=e.return,we=a;break}we=e.return}}var PC=Math.ceil,bl=wi.ReactCurrentDispatcher,Bd=wi.ReactCurrentOwner,bn=wi.ReactCurrentBatchConfig,et=0,Ot=null,wt=null,Gt=0,gn=0,ds=sr(0),Pt=0,Go=null,Tr=0,$l=0,Gd=0,vo=null,on=null,Vd=0,Ns=1/0,hi=null,Pl=!1,hh=null,Qi=null,_a=!1,Wi=null,Ll=0,_o=0,dh=null,tl=-1,nl=0;function en(){return et&6?St():tl!==-1?tl:tl=St()}function qi(t){return t.mode&1?et&2&&Gt!==0?Gt&-Gt:pC.transition!==null?(nl===0&&(nl=km()),nl):(t=st,t!==0||(t=window.event,t=t===void 0?16:jm(t.type)),t):1}function Xn(t,e,n,i){if(50<_o)throw _o=0,dh=null,Error(ue(185));Jo(t,n,i),(!(et&2)||t!==Ot)&&(t===Ot&&(!(et&2)&&($l|=n),Pt===4&&Gi(t,Gt)),un(t,i),n===1&&et===0&&!(e.mode&1)&&(Ns=St()+500,Jl&&or()))}function un(t,e){var n=t.callbackNode;p_(t,e);var i=gl(t,t===Ot?Gt:0);if(i===0)n!==null&&Vf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Vf(n),e===1)t.tag===0?fC(Dp.bind(null,t)):uA(Dp.bind(null,t)),cC(function(){!(et&6)&&or()}),n=null;else{switch(zm(i)){case 1:n=pd;break;case 4:n=Om;break;case 16:n=pl;break;case 536870912:n=Fm;break;default:n=pl}n=lv(n,tv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function tv(t,e){if(tl=-1,nl=0,et&6)throw Error(ue(327));var n=t.callbackNode;if(xs()&&t.callbackNode!==n)return null;var i=gl(t,t===Ot?Gt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Nl(t,i);else{e=i;var r=et;et|=2;var s=iv();(Ot!==t||Gt!==e)&&(hi=null,Ns=St()+500,Ir(t,e));do try{DC();break}catch(a){nv(t,a)}while(!0);wd(),bl.current=s,et=r,wt!==null?e=0:(Ot=null,Gt=0,e=Pt)}if(e!==0){if(e===2&&(r=zu(t),r!==0&&(i=r,e=fh(t,r))),e===1)throw n=Go,Ir(t,0),Gi(t,i),un(t,St()),n;if(e===6)Gi(t,i);else{if(r=t.current.alternate,!(i&30)&&!LC(r)&&(e=Nl(t,i),e===2&&(s=zu(t),s!==0&&(i=s,e=fh(t,s))),e===1))throw n=Go,Ir(t,0),Gi(t,i),un(t,St()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ue(345));case 2:gr(t,on,hi);break;case 3:if(Gi(t,i),(i&130023424)===i&&(e=Vd+500-St(),10<e)){if(gl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){en(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Yu(gr.bind(null,t,on,hi),e);break}gr(t,on,hi);break;case 4:if(Gi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-jn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=St()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*PC(i/1960))-i,10<i){t.timeoutHandle=Yu(gr.bind(null,t,on,hi),i);break}gr(t,on,hi);break;case 5:gr(t,on,hi);break;default:throw Error(ue(329))}}}return un(t,St()),t.callbackNode===n?tv.bind(null,t):null}function fh(t,e){var n=vo;return t.current.memoizedState.isDehydrated&&(Ir(t,e).flags|=256),t=Nl(t,e),t!==2&&(e=on,on=n,e!==null&&ph(e)),t}function ph(t){on===null?on=t:on.push.apply(on,t)}function LC(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Yn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Gi(t,e){for(e&=~Gd,e&=~$l,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-jn(e),i=1<<n;t[n]=-1,e&=~i}}function Dp(t){if(et&6)throw Error(ue(327));xs();var e=gl(t,0);if(!(e&1))return un(t,St()),null;var n=Nl(t,e);if(t.tag!==0&&n===2){var i=zu(t);i!==0&&(e=i,n=fh(t,i))}if(n===1)throw n=Go,Ir(t,0),Gi(t,e),un(t,St()),n;if(n===6)throw Error(ue(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,gr(t,on,hi),un(t,St()),null}function Hd(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(Ns=St()+500,Jl&&or())}}function Rr(t){Wi!==null&&Wi.tag===0&&!(et&6)&&xs();var e=et;et|=1;var n=bn.transition,i=st;try{if(bn.transition=null,st=1,t)return t()}finally{st=i,bn.transition=n,et=e,!(et&6)&&or()}}function Wd(){gn=ds.current,dt(ds)}function Ir(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,lC(n)),wt!==null)for(n=wt.return;n!==null;){var i=n;switch(Md(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Cl();break;case 3:Ps(),dt(ln),dt(Kt),Nd();break;case 5:Ld(i);break;case 4:Ps();break;case 13:dt(gt);break;case 19:dt(gt);break;case 10:Td(i.type._context);break;case 22:case 23:Wd()}n=n.return}if(Ot=t,wt=t=$i(t.current,null),Gt=gn=e,Pt=0,Go=null,Gd=$l=Tr=0,on=vo=null,Cr!==null){for(e=0;e<Cr.length;e++)if(n=Cr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Cr=null}return t}function nv(t,e){do{var n=wt;try{if(wd(),qa.current=Rl,Tl){for(var i=At.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Tl=!1}if(wr=0,Ut=Rt=At=null,mo=!1,ko=0,Bd.current=null,n===null||n.return===null){Pt=1,Go=e,wt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Gt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,u=h.tag;if(!(h.mode&1)&&(u===0||u===11||u===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=xp(o);if(p!==null){p.flags&=-257,yp(p,o,a,s,e),p.mode&1&&Cp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var x=new Set;x.add(l),e.updateQueue=x}else v.add(l);break e}else{if(!(e&1)){Cp(s,c,e),jd();break e}l=Error(ue(426))}}else if(ft&&a.mode&1){var g=xp(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),yp(g,o,a,s,e),Sd(Ls(l,a));break e}}s=l=Ls(l,a),Pt!==4&&(Pt=2),vo===null?vo=[s]:vo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=zA(s,l,e);pp(s,d);break e;case 1:a=l;var A=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof A.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Qi===null||!Qi.has(m)))){s.flags|=65536,e&=-e,s.lanes|=e;var C=BA(s,a,e);pp(s,C);break e}}s=s.return}while(s!==null)}sv(n)}catch(T){e=T,wt===n&&n!==null&&(wt=n=n.return);continue}break}while(!0)}function iv(){var t=bl.current;return bl.current=Rl,t===null?Rl:t}function jd(){(Pt===0||Pt===3||Pt===2)&&(Pt=4),Ot===null||!(Tr&268435455)&&!($l&268435455)||Gi(Ot,Gt)}function Nl(t,e){var n=et;et|=2;var i=iv();(Ot!==t||Gt!==e)&&(hi=null,Ir(t,e));do try{NC();break}catch(r){nv(t,r)}while(!0);if(wd(),et=n,bl.current=i,wt!==null)throw Error(ue(261));return Ot=null,Gt=0,Pt}function NC(){for(;wt!==null;)rv(wt)}function DC(){for(;wt!==null&&!s_();)rv(wt)}function rv(t){var e=av(t.alternate,t,gn);t.memoizedProps=t.pendingProps,e===null?sv(t):wt=e,Bd.current=null}function sv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=wC(n,e),n!==null){n.flags&=32767,wt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Pt=6,wt=null;return}}else if(n=EC(n,e,gn),n!==null){wt=n;return}if(e=e.sibling,e!==null){wt=e;return}wt=e=t}while(e!==null);Pt===0&&(Pt=5)}function gr(t,e,n){var i=st,r=bn.transition;try{bn.transition=null,st=1,UC(t,e,n,i)}finally{bn.transition=r,st=i}return null}function UC(t,e,n,i){do xs();while(Wi!==null);if(et&6)throw Error(ue(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ue(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(g_(t,s),t===Ot&&(wt=Ot=null,Gt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||_a||(_a=!0,lv(pl,function(){return xs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=bn.transition,bn.transition=null;var o=st;st=1;var a=et;et|=4,Bd.current=null,RC(t,n),$A(n,t),tC(ju),ml=!!Wu,ju=Wu=null,t.current=n,bC(n),o_(),et=a,st=o,bn.transition=s}else t.current=n;if(_a&&(_a=!1,Wi=t,Ll=r),s=t.pendingLanes,s===0&&(Qi=null),c_(n.stateNode),un(t,St()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Pl)throw Pl=!1,t=hh,hh=null,t;return Ll&1&&t.tag!==0&&xs(),s=t.pendingLanes,s&1?t===dh?_o++:(_o=0,dh=t):_o=0,or(),null}function xs(){if(Wi!==null){var t=zm(Ll),e=bn.transition,n=st;try{if(bn.transition=null,st=16>t?16:t,Wi===null)var i=!1;else{if(t=Wi,Wi=null,Ll=0,et&6)throw Error(ue(331));var r=et;for(et|=4,we=t.current;we!==null;){var s=we,o=s.child;if(we.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(we=c;we!==null;){var h=we;switch(h.tag){case 0:case 11:case 15:Ao(8,h,s)}var u=h.child;if(u!==null)u.return=h,we=u;else for(;we!==null;){h=we;var f=h.sibling,p=h.return;if(KA(h),h===c){we=null;break}if(f!==null){f.return=p,we=f;break}we=p}}}var v=s.alternate;if(v!==null){var x=v.child;if(x!==null){v.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}we=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,we=o;else e:for(;we!==null;){if(s=we,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ao(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,we=d;break e}we=s.return}}var A=t.current;for(we=A;we!==null;){o=we;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,we=m;else e:for(o=A;we!==null;){if(a=we,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ql(9,a)}}catch(T){xt(a,a.return,T)}if(a===o){we=null;break e}var C=a.sibling;if(C!==null){C.return=a.return,we=C;break e}we=a.return}}if(et=r,or(),ei&&typeof ei.onPostCommitFiberRoot=="function")try{ei.onPostCommitFiberRoot(Wl,t)}catch{}i=!0}return i}finally{st=n,bn.transition=e}}return!1}function Up(t,e,n){e=Ls(n,e),e=zA(t,e,1),t=Ki(t,e,1),e=en(),t!==null&&(Jo(t,1,e),un(t,e))}function xt(t,e,n){if(t.tag===3)Up(t,t,n);else for(;e!==null;){if(e.tag===3){Up(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Qi===null||!Qi.has(i))){t=Ls(n,t),t=BA(e,t,1),e=Ki(e,t,1),t=en(),e!==null&&(Jo(e,1,t),un(e,t));break}}e=e.return}}function OC(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=en(),t.pingedLanes|=t.suspendedLanes&n,Ot===t&&(Gt&n)===n&&(Pt===4||Pt===3&&(Gt&130023424)===Gt&&500>St()-Vd?Ir(t,0):Gd|=n),un(t,e)}function ov(t,e){e===0&&(t.mode&1?(e=ca,ca<<=1,!(ca&130023424)&&(ca=4194304)):e=1);var n=en();t=yi(t,e),t!==null&&(Jo(t,e,n),un(t,n))}function FC(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ov(t,n)}function kC(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ue(314))}i!==null&&i.delete(e),ov(t,n)}var av;av=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||ln.current)an=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return an=!1,SC(t,e,n);an=!!(t.flags&131072)}else an=!1,ft&&e.flags&1048576&&hA(e,Il,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;el(t,e),t=e.pendingProps;var r=Ts(e,Kt.current);Cs(e,n),r=Ud(null,e,i,t,r,n);var s=Od();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,cn(i)?(s=!0,xl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,bd(e),r.updater=Ql,e.stateNode=r,r._reactInternals=e,eh(e,i,t,n),e=ih(null,e,i,!0,s,n)):(e.tag=0,ft&&s&&Id(e),$t(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(el(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=BC(i),t=kn(i,t),r){case 0:e=nh(null,e,i,t,n);break e;case 1:e=Sp(null,e,i,t,n);break e;case 11:e=Ip(null,e,i,t,n);break e;case 14:e=Mp(null,e,i,kn(i.type,t),n);break e}throw Error(ue(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),nh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),Sp(t,e,i,r,n);case 3:e:{if(WA(e),t===null)throw Error(ue(387));i=e.pendingProps,s=e.memoizedState,r=s.element,AA(t,e),El(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ls(Error(ue(423)),e),e=Ep(t,e,i,n,r);break e}else if(i!==r){r=Ls(Error(ue(424)),e),e=Ep(t,e,i,n,r);break e}else for(An=Ji(e.stateNode.containerInfo.firstChild),vn=e,ft=!0,Gn=null,n=gA(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Rs(),i===r){e=Ii(t,e,n);break e}$t(t,e,i,n)}e=e.child}return e;case 5:return vA(e),t===null&&Qu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Xu(i,r)?o=null:s!==null&&Xu(i,s)&&(e.flags|=32),HA(t,e),$t(t,e,o,n),e.child;case 6:return t===null&&Qu(e),null;case 13:return jA(t,e,n);case 4:return Pd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=bs(e,null,i,n):$t(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),Ip(t,e,i,r,n);case 7:return $t(t,e,e.pendingProps,n),e.child;case 8:return $t(t,e,e.pendingProps.children,n),e.child;case 12:return $t(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,lt(Ml,i._currentValue),i._currentValue=o,s!==null)if(Yn(s.value,o)){if(s.children===r.children&&!ln.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),qu(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ue(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),qu(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}$t(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Cs(e,n),r=Pn(r),i=i(r),e.flags|=1,$t(t,e,i,n),e.child;case 14:return i=e.type,r=kn(i,e.pendingProps),r=kn(i.type,r),Mp(t,e,i,r,n);case 15:return GA(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),el(t,e),e.tag=1,cn(i)?(t=!0,xl(e)):t=!1,Cs(e,n),kA(e,i,r),eh(e,i,r,n),ih(null,e,i,!0,t,n);case 19:return XA(t,e,n);case 22:return VA(t,e,n)}throw Error(ue(156,e.tag))};function lv(t,e){return Um(t,e)}function zC(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tn(t,e,n,i){return new zC(t,e,n,i)}function Xd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function BC(t){if(typeof t=="function")return Xd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===hd)return 11;if(t===dd)return 14}return 2}function $i(t,e){var n=t.alternate;return n===null?(n=Tn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function il(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Xd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ns:return Mr(n.children,r,s,e);case ud:o=8,r|=8;break;case Mu:return t=Tn(12,n,e,r|2),t.elementType=Mu,t.lanes=s,t;case Su:return t=Tn(13,n,e,r),t.elementType=Su,t.lanes=s,t;case Eu:return t=Tn(19,n,e,r),t.elementType=Eu,t.lanes=s,t;case vm:return ec(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case mm:o=10;break e;case Am:o=9;break e;case hd:o=11;break e;case dd:o=14;break e;case Fi:o=16,i=null;break e}throw Error(ue(130,t==null?t:typeof t,""))}return e=Tn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Mr(t,e,n,i){return t=Tn(7,t,i,e),t.lanes=n,t}function ec(t,e,n,i){return t=Tn(22,t,i,e),t.elementType=vm,t.lanes=n,t.stateNode={isHidden:!1},t}function kc(t,e,n){return t=Tn(6,t,null,e),t.lanes=n,t}function zc(t,e,n){return e=Tn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function GC(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_c(0),this.expirationTimes=_c(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_c(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Yd(t,e,n,i,r,s,o,a,l){return t=new GC(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Tn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bd(s),t}function VC(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ts,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function cv(t){if(!t)return ir;t=t._reactInternals;e:{if(Ur(t)!==t||t.tag!==1)throw Error(ue(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(cn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ue(171))}if(t.tag===1){var n=t.type;if(cn(n))return cA(t,n,e)}return e}function uv(t,e,n,i,r,s,o,a,l){return t=Yd(n,i,!0,t,r,s,o,a,l),t.context=cv(null),n=t.current,i=en(),r=qi(n),s=vi(i,r),s.callback=e??null,Ki(n,s,r),t.current.lanes=r,Jo(t,r,i),un(t,i),t}function tc(t,e,n,i){var r=e.current,s=en(),o=qi(r);return n=cv(n),e.context===null?e.context=n:e.pendingContext=n,e=vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Ki(r,e,o),t!==null&&(Xn(t,r,o,s),Qa(t,r,o)),o}function Dl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Op(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Zd(t,e){Op(t,e),(t=t.alternate)&&Op(t,e)}function HC(){return null}var hv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Jd(t){this._internalRoot=t}nc.prototype.render=Jd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ue(409));tc(t,e,null,null)};nc.prototype.unmount=Jd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Rr(function(){tc(null,t,null,null)}),e[xi]=null}};function nc(t){this._internalRoot=t}nc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Vm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Bi.length&&e!==0&&e<Bi[n].priority;n++);Bi.splice(n,0,t),n===0&&Wm(t)}};function Kd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ic(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Fp(){}function WC(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Dl(o);s.call(c)}}var o=uv(e,i,t,0,null,!1,!1,"",Fp);return t._reactRootContainer=o,t[xi]=o.current,No(t.nodeType===8?t.parentNode:t),Rr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Dl(l);a.call(c)}}var l=Yd(t,0,!1,null,null,!1,!1,"",Fp);return t._reactRootContainer=l,t[xi]=l.current,No(t.nodeType===8?t.parentNode:t),Rr(function(){tc(e,l,n,i)}),l}function rc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Dl(o);a.call(l)}}tc(e,o,t,r)}else o=WC(n,e,t,r,i);return Dl(o)}Bm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ao(e.pendingLanes);n!==0&&(gd(e,n|1),un(e,St()),!(et&6)&&(Ns=St()+500,or()))}break;case 13:Rr(function(){var i=yi(t,1);if(i!==null){var r=en();Xn(i,t,1,r)}}),Zd(t,1)}};md=function(t){if(t.tag===13){var e=yi(t,134217728);if(e!==null){var n=en();Xn(e,t,134217728,n)}Zd(t,134217728)}};Gm=function(t){if(t.tag===13){var e=qi(t),n=yi(t,e);if(n!==null){var i=en();Xn(n,t,e,i)}Zd(t,e)}};Vm=function(){return st};Hm=function(t,e){var n=st;try{return st=t,e()}finally{st=n}};Ou=function(t,e,n){switch(e){case"input":if(Ru(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Zl(i);if(!r)throw Error(ue(90));Cm(i),Ru(i,r)}}}break;case"textarea":ym(t,n);break;case"select":e=n.value,e!=null&&ms(t,!!n.multiple,e,!1)}};Rm=Hd;bm=Rr;var jC={usingClientEntryPoint:!1,Events:[Qo,os,Zl,wm,Tm,Hd]},$s={findFiberByHostInstance:_r,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},XC={bundleType:$s.bundleType,version:$s.version,rendererPackageName:$s.rendererPackageName,rendererConfig:$s.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:wi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Nm(t),t===null?null:t.stateNode},findFiberByHostInstance:$s.findFiberByHostInstance||HC,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ca=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ca.isDisabled&&Ca.supportsFiber)try{Wl=Ca.inject(XC),ei=Ca}catch{}}Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jC;Cn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kd(e))throw Error(ue(200));return VC(t,e,null,n)};Cn.createRoot=function(t,e){if(!Kd(t))throw Error(ue(299));var n=!1,i="",r=hv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Yd(t,1,!1,null,null,n,!1,i,r),t[xi]=e.current,No(t.nodeType===8?t.parentNode:t),new Jd(e)};Cn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ue(188)):(t=Object.keys(t).join(","),Error(ue(268,t)));return t=Nm(e),t=t===null?null:t.stateNode,t};Cn.flushSync=function(t){return Rr(t)};Cn.hydrate=function(t,e,n){if(!ic(e))throw Error(ue(200));return rc(null,t,e,!0,n)};Cn.hydrateRoot=function(t,e,n){if(!Kd(t))throw Error(ue(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=hv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=uv(e,null,t,1,n??null,r,!1,s,o),t[xi]=e.current,No(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new nc(e)};Cn.render=function(t,e,n){if(!ic(e))throw Error(ue(200));return rc(null,t,e,!1,n)};Cn.unmountComponentAtNode=function(t){if(!ic(t))throw Error(ue(40));return t._reactRootContainer?(Rr(function(){rc(null,null,t,!1,function(){t._reactRootContainer=null,t[xi]=null})}),!0):!1};Cn.unstable_batchedUpdates=Hd;Cn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!ic(n))throw Error(ue(200));if(t==null||t._reactInternals===void 0)throw Error(ue(38));return rc(t,e,n,!1,i)};Cn.version="18.3.1-next-f1338f8080-20240426";function dv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dv)}catch(t){console.error(t)}}dv(),dm.exports=Cn;var Qd=dm.exports,kp=Qd;yu.createRoot=kp.createRoot,yu.hydrateRoot=kp.hydrateRoot;const fv=()=>It("list_materials","GET"),YC=t=>It("component_mass","POST",{id:t}),ZC=t=>It("sim_warnings","POST",{sim_name:t});async function It(t,e,n){const i=await fetch(`/api/${t}`,{method:e,headers:n?{"content-type":"application/json"}:{},body:n?JSON.stringify(n):void 0});if(!i.ok)throw new Error(await i.text());return i.json()}const pv=t=>It("load_ork","POST",{path:t}),JC=t=>It("load_ork","POST",{b64:t}),zp=()=>It("snapshot","POST",{}),KC=()=>It("new","POST",{}),QC=async t=>{const e=new Uint8Array(await t.arrayBuffer());let n="";for(let i=0;i<e.length;i++)n+=String.fromCharCode(e[i]);return It("load_ork","POST",{b64:btoa(n)})},qC=(t,e,n)=>It("component","PATCH",{id:t,key:e,value:n}),$C=t=>It("component/delete","POST",{id:t}),ex=(t,e)=>It("component/add","POST",{parent_id:t,kind:e}),tx=()=>It("undo","POST",{}),nx=()=>It("redo","POST",{}),Bc=t=>{switch(t){case"Stage":return["NoseCone","BodyTube","Transition","PodSet","ParallelStage"];case"BodyTube":return["InnerTube","FinSet","TubeFinSet","LaunchLug","CenteringRing","Parachute","ShockCord","MassObject"];case"PodSet":case"ParallelStage":return["NoseCone","BodyTube","Transition"];default:return[]}},Gc=t=>It("save","POST",{path:t??null}),Bp=t=>It("simulate","POST",{sim_name:t}),ix=(t,e,n)=>It("sim","PATCH",{sim_name:t,key:e,value:n}),rx=t=>It("analysis","POST",{mach:t}),sx=t=>It("optimize","POST",t),gv=()=>It("motors","GET"),ox=(t,e,n,i,r)=>It("assign_motor","POST",{mount_id:t,config_id:e,designation:n,digest:i,ejection_delay:r}),ax=(t,e)=>It("clear_motor","POST",{mount_id:t,config_id:e}),lx=async()=>{try{return await It("fixtures","GET")}catch{return[]}};function er({options:t,value:e,onChange:n,className:i="",title:r,disabled:s=!1,placeholder:o="—"}){const[a,l]=ce.useState(!1),[c,h]=ce.useState(0),u=ce.useRef(null),f=ce.useRef(null),p=t.find(A=>A.value===e),[v,x]=ce.useState(null);ce.useLayoutEffect(()=>{if(!a)return;const A=()=>{const m=u.current?.getBoundingClientRect();m&&x({left:m.left,top:m.bottom+4,width:m.width})};return A(),window.addEventListener("scroll",A,!0),window.addEventListener("resize",A),()=>{window.removeEventListener("scroll",A,!0),window.removeEventListener("resize",A)}},[a]),ce.useEffect(()=>{if(!a)return;const A=m=>{const C=m.target;u.current&&!u.current.contains(C)&&f.current&&!f.current.contains(C)&&l(!1)};return document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[a]),ce.useEffect(()=>{a&&h(Math.max(0,t.findIndex(A=>A.value===e)))},[a,t,e]);const g=A=>{const m=t[A];m&&n(m.value),l(!1)},d=A=>{if(!s){if(A.key==="Escape")return l(!1);if(!a&&(A.key==="Enter"||A.key===" "||A.key==="ArrowDown"))return A.preventDefault(),l(!0);a&&(A.key==="ArrowDown"?(A.preventDefault(),h(m=>Math.min(t.length-1,m+1))):A.key==="ArrowUp"?(A.preventDefault(),h(m=>Math.max(0,m-1))):(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),g(c)))}};return E.jsxs("div",{ref:u,className:"uisel"+(s?" disabled":"")+(i?" "+i:""),title:r,children:[E.jsxs("button",{type:"button",className:"uisel-trigger",disabled:s,"aria-haspopup":"listbox","aria-expanded":a,onClick:()=>!s&&l(A=>!A),onKeyDown:d,children:[E.jsx("span",{className:"uisel-value",children:p?p.label:o}),E.jsx("svg",{className:"uisel-chev"+(a?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:E.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),a&&v&&Qd.createPortal(E.jsx("ul",{ref:f,className:"uisel-list",role:"listbox",onWheel:A=>A.stopPropagation(),onPointerDown:A=>A.stopPropagation(),style:{position:"fixed",left:v.left,top:v.top,minWidth:v.width},children:t.map((A,m)=>E.jsx("li",{role:"option","aria-selected":A.value===e,className:"uisel-opt"+(A.value===e?" sel":"")+(m===c?" active":""),onMouseEnter:()=>h(m),onMouseDown:C=>{C.preventDefault(),g(m)},children:A.label},A.value))}),document.body)]})}const Gp=250;function cx({fixtures:t,busy:e,hasDoc:n,canExportCsv:i,onNew:r,onOpenFile:s,onOpenExample:o,onSave:a,onSaveAs:l,onExportCsv:c,onExportPng:h,onExportObj:u,onExportOrk:f}){const[p,v]=ce.useState(!1),[x,g]=ce.useState(""),d=ce.useRef(null),A=ce.useRef(null),m=ce.useRef(null),C=ce.useRef(null),[T,S]=ce.useState(null),[I,R]=ce.useState({left:0,top:0}),B=(N,O)=>{const G=A.current?.getBoundingClientRect(),Q=O.currentTarget.getBoundingClientRect();if(!G)return;const F=G.right+Gp<=window.innerWidth;R({left:F?G.right-2:G.left-Gp+2,top:Math.max(8,Math.min(Q.top-6,window.innerHeight-60))}),g(N)};ce.useLayoutEffect(()=>{if(!p)return;const N=()=>{const O=d.current?.getBoundingClientRect();O&&S({left:O.left,top:O.bottom+4})};return N(),window.addEventListener("scroll",N,!0),window.addEventListener("resize",N),()=>{window.removeEventListener("scroll",N,!0),window.removeEventListener("resize",N)}},[p]),ce.useEffect(()=>{if(!p)return;const N=O=>{const G=O.target;d.current&&!d.current.contains(G)&&A.current&&!A.current.contains(G)&&!(m.current&&m.current.contains(G))&&(v(!1),g(""))};return document.addEventListener("mousedown",N),()=>document.removeEventListener("mousedown",N)},[p]);const _=()=>{v(!1),g("")},y=N=>{_(),N()};return E.jsxs("div",{ref:d,className:"uisel filemenu",children:[E.jsxs("button",{type:"button",className:"uisel-trigger",disabled:e,"aria-haspopup":"menu","aria-expanded":p,onClick:()=>!e&&v(N=>!N),children:[E.jsx("span",{className:"uisel-value",children:"File"}),E.jsx("svg",{className:"uisel-chev"+(p?" up":""),width:"12",height:"8",viewBox:"0 0 12 8","aria-hidden":"true",children:E.jsx("path",{d:"M1 1l5 5 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),E.jsx("input",{ref:C,type:"file",accept:".ork",style:{display:"none"},onChange:N=>{const O=N.target.files?.[0];N.target.value="",O&&y(()=>s(O))}}),p&&T&&Qd.createPortal(E.jsxs(E.Fragment,{children:[E.jsxs("div",{ref:A,className:"fmenu",onWheel:N=>N.stopPropagation(),onPointerDown:N=>N.stopPropagation(),style:{position:"fixed",left:T.left,top:T.top},children:[E.jsx("button",{className:"fm-item",onMouseEnter:()=>g(""),onClick:()=>y(r),children:"New"}),E.jsx("button",{className:"fm-item",onMouseEnter:()=>g(""),onClick:()=>C.current?.click(),children:"Open .ork file…"}),E.jsxs("button",{className:"fm-item fm-parent"+(x==="examples"?" on":""),onMouseEnter:N=>B("examples",N),onClick:N=>B("examples",N),children:["Open example",E.jsx("span",{className:"fm-arrow",children:"▸"})]}),E.jsx("div",{className:"fm-sep"}),E.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>g(""),onClick:()=>y(a),children:"Save"}),E.jsx("button",{className:"fm-item",disabled:!n,onMouseEnter:()=>g(""),onClick:()=>y(()=>{const N=window.prompt("Save as (filename):","rocket.ork");N&&l(N.endsWith(".ork")?N:N+".ork")}),children:"Save as…"}),E.jsx("div",{className:"fm-sep"}),E.jsxs("button",{className:"fm-item fm-parent"+(x==="export"?" on":""),disabled:!n,onMouseEnter:N=>n&&B("export",N),onClick:N=>n&&B("export",N),children:["Export",E.jsx("span",{className:"fm-arrow",children:"▸"})]})]}),x&&E.jsx("div",{ref:m,className:"fmenu fm-fly",onWheel:N=>N.stopPropagation(),onPointerDown:N=>N.stopPropagation(),onMouseLeave:()=>g(""),style:{position:"fixed",left:I.left,top:I.top},children:x==="examples"?t.length===0?E.jsx("div",{className:"fm-empty",children:"no examples"}):t.map(N=>E.jsx("button",{className:"fm-item",onClick:()=>y(()=>o(N.path)),children:N.name},N.path)):E.jsxs(E.Fragment,{children:[E.jsx("button",{className:"fm-item",onClick:()=>y(h),children:"Design image (PNG)"}),E.jsx("button",{className:"fm-item",onClick:()=>y(u),children:"3D model (OBJ)"}),E.jsx("button",{className:"fm-item",onClick:()=>y(f),children:"OpenRocket file (.ork)"}),E.jsx("button",{className:"fm-item",disabled:!i,title:i?"":"Run a simulation first",onClick:()=>y(c),children:"Flight data (CSV)"})]})})]}),document.body)]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qd="169",ys={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ux=0,Vp=1,hx=2,mv=1,dx=2,ui=3,Mi=0,Zt=1,mn=2,tr=0,Is=1,Hp=2,Wp=3,jp=4,fx=5,Ar=100,px=101,gx=102,mx=103,Ax=104,vx=200,_x=201,Cx=202,xx=203,gh=204,mh=205,yx=206,Ix=207,Mx=208,Sx=209,Ex=210,wx=211,Tx=212,Rx=213,bx=214,Ah=0,vh=1,_h=2,Ds=3,Ch=4,xh=5,yh=6,Ih=7,Av=0,Px=1,Lx=2,_i=0,Nx=1,Dx=2,Ux=3,Ox=4,Fx=5,kx=6,zx=7,vv=300,Us=301,Os=302,Mh=303,Sh=304,sc=306,Fs=1e3,ji=1001,Ul=1002,Rn=1003,Bx=1004,xa=1005,Vn=1006,Vc=1007,yr=1008,Si=1009,_v=1010,Cv=1011,Vo=1012,$d=1013,br=1014,gi=1015,$o=1016,ef=1017,tf=1018,ks=1020,xv=35902,yv=1021,Iv=1022,Wn=1023,Mv=1024,Sv=1025,Ms=1026,zs=1027,Ev=1028,nf=1029,wv=1030,rf=1031,sf=1033,rl=33776,sl=33777,ol=33778,al=33779,Eh=35840,wh=35841,Th=35842,Rh=35843,bh=36196,Ph=37492,Lh=37496,Nh=37808,Dh=37809,Uh=37810,Oh=37811,Fh=37812,kh=37813,zh=37814,Bh=37815,Gh=37816,Vh=37817,Hh=37818,Wh=37819,jh=37820,Xh=37821,ll=36492,Yh=36494,Zh=36495,Tv=36283,Jh=36284,Kh=36285,Qh=36286,Gx=3200,Vx=3201,Rv=0,Hx=1,Vi="",Bn="srgb",Zn="srgb-linear",of="display-p3",oc="display-p3-linear",Ol="linear",ht="srgb",Fl="rec709",kl="p3",Br=7680,Xp=519,Wx=512,jx=513,Xx=514,bv=515,Yx=516,Zx=517,Jx=518,Kx=519,Yp=35044,Zp="300 es",mi=2e3,zl=2001;class Or{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jp=1234567;const Co=Math.PI/180,Ho=180/Math.PI;function Fr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(jt[t&255]+jt[t>>8&255]+jt[t>>16&255]+jt[t>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[n&63|128]+jt[n>>8&255]+"-"+jt[n>>16&255]+jt[n>>24&255]+jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]).toLowerCase()}function bt(t,e,n){return Math.max(e,Math.min(n,t))}function af(t,e){return(t%e+e)%e}function Qx(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function qx(t,e,n){return t!==e?(n-t)/(e-t):0}function xo(t,e,n){return(1-n)*t+n*e}function $x(t,e,n,i){return xo(t,e,1-Math.exp(-n*i))}function ey(t,e=1){return e-Math.abs(af(t,e*2)-e)}function ty(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function ny(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function iy(t,e){return t+Math.floor(Math.random()*(e-t+1))}function ry(t,e){return t+Math.random()*(e-t)}function sy(t){return t*(.5-Math.random())}function oy(t){t!==void 0&&(Jp=t);let e=Jp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ay(t){return t*Co}function ly(t){return t*Ho}function cy(t){return(t&t-1)===0&&t!==0}function uy(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function hy(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function dy(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),h=o((e+i)/2),u=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":t.set(a*h,l*u,l*f,a*c);break;case"YZY":t.set(l*f,a*h,l*u,a*c);break;case"ZXZ":t.set(l*u,l*f,a*h,a*c);break;case"XZX":t.set(a*h,l*v,l*p,a*c);break;case"YXY":t.set(l*p,a*h,l*v,a*c);break;case"ZYZ":t.set(l*v,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function es(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Qt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Pv={DEG2RAD:Co,RAD2DEG:Ho,generateUUID:Fr,clamp:bt,euclideanModulo:af,mapLinear:Qx,inverseLerp:qx,lerp:xo,damp:$x,pingpong:ey,smoothstep:ty,smootherstep:ny,randInt:iy,randFloat:ry,randFloatSpread:sy,seededRandom:oy,degToRad:ay,radToDeg:ly,isPowerOfTwo:cy,ceilPowerOfTwo:uy,floorPowerOfTwo:hy,setQuaternionFromProperEuler:dy,normalize:Qt,denormalize:es};class de{constructor(e=0,n=0){de.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,n,i,r,s,o,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],v=i[8],x=r[0],g=r[3],d=r[6],A=r[1],m=r[4],C=r[7],T=r[2],S=r[5],I=r[8];return s[0]=o*x+a*A+l*T,s[3]=o*g+a*m+l*S,s[6]=o*d+a*C+l*I,s[1]=c*x+h*A+u*T,s[4]=c*g+h*m+u*S,s[7]=c*d+h*C+u*I,s[2]=f*x+p*A+v*T,s[5]=f*g+p*m+v*S,s[8]=f*d+p*C+v*I,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return n*o*h-n*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*s,p=c*s-o*l,v=n*u+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=u*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(h*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Hc.makeScale(e,n)),this}rotate(e){return this.premultiply(Hc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Hc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hc=new We;function Lv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Wo(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function fy(){const t=Wo("canvas");return t.style.display="block",t}const Kp={};function cl(t){t in Kp||(Kp[t]=!0,console.warn(t))}function py(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function gy(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function my(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Qp=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qp=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),eo={[Zn]:{transfer:Ol,primaries:Fl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Bn]:{transfer:ht,primaries:Fl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[oc]:{transfer:Ol,primaries:kl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(qp),fromReference:t=>t.applyMatrix3(Qp)},[of]:{transfer:ht,primaries:kl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(qp),fromReference:t=>t.applyMatrix3(Qp).convertLinearToSRGB()}},Ay=new Set([Zn,oc]),tt={enabled:!0,_workingColorSpace:Zn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Ay.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=eo[e].toReference,r=eo[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return eo[t].primaries},getTransfer:function(t){return t===Vi?Ol:eo[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(eo[e].luminanceCoefficients)}};function Ss(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Wc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Gr;class vy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gr===void 0&&(Gr=Wo("canvas")),Gr.width=e.width,Gr.height=e.height;const i=Gr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Gr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Wo("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ss(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ss(n[i]/255)*255):n[i]=Ss(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _y=0;class Nv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=Fr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jc(r[o].image)):s.push(jc(r[o]))}else s=jc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function jc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?vy.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cy=0;class tn extends Or{constructor(e=tn.DEFAULT_IMAGE,n=tn.DEFAULT_MAPPING,i=ji,r=ji,s=Vn,o=yr,a=Wn,l=Si,c=tn.DEFAULT_ANISOTROPY,h=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cy++}),this.uuid=Fr(),this.name="",this.source=new Nv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fs:e.x=e.x-Math.floor(e.x);break;case ji:e.x=e.x<0?0:1;break;case Ul:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fs:e.y=e.y-Math.floor(e.y);break;case ji:e.y=e.y<0?0:1;break;case Ul:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=vv;tn.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,n=0,i=0,r=1){yt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],v=l[9],x=l[2],g=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const m=(c+1)/2,C=(p+1)/2,T=(d+1)/2,S=(h+f)/4,I=(u+x)/4,R=(v+g)/4;return m>C&&m>T?m<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(m),r=S/i,s=I/i):C>T?C<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(C),i=S/r,s=R/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=I/s,r=R/s),this.set(i,r,s,n),this}let A=Math.sqrt((g-v)*(g-v)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(g-v)/A,this.y=(u-x)/A,this.z=(f-h)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xy extends Or{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new yt(0,0,e,n),this.scissorTest=!1,this.viewport=new yt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Nv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pr extends xy{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Dv extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yy extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=v,e[n+3]=x;return}if(u!==x||l!==f||c!==p||h!==v){let g=1-a;const d=l*f+c*p+h*v+u*x,A=d>=0?1:-1,m=1-d*d;if(m>Number.EPSILON){const T=Math.sqrt(m),S=Math.atan2(T,d*A);g=Math.sin(g*S)/T,a=Math.sin(a*S)/T}const C=a*A;if(l=l*g+f*C,c=c*g+p*C,h=h*g+v*C,u=u*g+x*C,g===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=u}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+h*u+l*p-c*f,e[n+1]=l*v+h*f+c*u-a*p,e[n+2]=c*v+h*p+a*f-l*u,e[n+3]=h*v-a*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u-f*p*v;break;case"YXZ":this._x=f*h*u+c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u+f*p*v;break;case"ZXY":this._x=f*h*u-c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u-f*p*v;break;case"ZYX":this._x=f*h*u-c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u+f*p*v;break;case"YZX":this._x=f*h*u+c*p*v,this._y=c*p*u+f*h*v,this._z=c*h*v-f*p*u,this._w=c*h*u-f*p*v;break;case"XZY":this._x=f*h*u-c*p*v,this._y=c*p*u-f*h*v,this._z=c*h*v+f*p*u,this._w=c*h*u+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],h=n[6],u=n[10],f=i+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-n)*h)/c,f=Math.sin(n*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,n=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion($p.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion($p.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*n-s*r),u=2*(s*i-o*n);return this.x=n+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xc.copy(this).projectOnVector(e),this.sub(Xc)}reflect(e){return this.sub(Xc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xc=new U,$p=new Lr;class Ws{constructor(e=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Un.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Un.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Un.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(s,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ya.copy(i.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(to),Ia.subVectors(this.max,to),Vr.subVectors(e.a,to),Hr.subVectors(e.b,to),Wr.subVectors(e.c,to),Pi.subVectors(Hr,Vr),Li.subVectors(Wr,Hr),lr.subVectors(Vr,Wr);let n=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-lr.z,lr.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,lr.z,0,-lr.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-lr.y,lr.x,0];return!Yc(n,Vr,Hr,Wr,Ia)||(n=[1,0,0,0,1,0,0,0,1],!Yc(n,Vr,Hr,Wr,Ia))?!1:(Ma.crossVectors(Pi,Li),n=[Ma.x,Ma.y,Ma.z],Yc(n,Vr,Hr,Wr,Ia))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new U,new U,new U,new U,new U,new U,new U,new U],Un=new U,ya=new Ws,Vr=new U,Hr=new U,Wr=new U,Pi=new U,Li=new U,lr=new U,to=new U,Ia=new U,Ma=new U,cr=new U;function Yc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){cr.fromArray(t,s);const a=r.x*Math.abs(cr.x)+r.y*Math.abs(cr.y)+r.z*Math.abs(cr.z),l=e.dot(cr),c=n.dot(cr),h=i.dot(cr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Iy=new Ws,no=new U,Zc=new U;class lf{constructor(e=new U,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Iy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;no.subVectors(e,this.center);const n=no.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(no,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(no.copy(e.center).add(Zc)),this.expandByPoint(no.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new U,Jc=new U,Sa=new U,Ni=new U,Kc=new U,Ea=new U,Qc=new U;class Uv{constructor(e=new U,n=new U(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,n),oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Jc.copy(e).add(n).multiplyScalar(.5),Sa.copy(n).sub(e).normalize(),Ni.copy(this.origin).sub(Jc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Sa),a=Ni.dot(this.direction),l=-Ni.dot(Sa),c=Ni.lengthSq(),h=Math.abs(1-o*o);let u,f,p,v;if(h>0)if(u=o*l-a,f=o*a-l,v=s*h,u>=0)if(f>=-v)if(f<=v){const x=1/h;u*=x,f*=x,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-v?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=v?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Jc).addScaledVector(Sa,f),p}intersectSphere(e,n){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),r=oi.dot(oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,n,i,r,s){Kc.subVectors(n,e),Ea.subVectors(i,e),Qc.crossVectors(Kc,Ea);let o=this.direction.dot(Qc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ni.subVectors(this.origin,e);const l=a*this.direction.dot(Ea.crossVectors(Ni,Ea));if(l<0)return null;const c=a*this.direction.dot(Kc.cross(Ni));if(c<0||l+c>o)return null;const h=-a*Ni.dot(Qc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g)}set(e,n,i,r,s,o,a,l,c,h,u,f,p,v,x,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=v,d[11]=x,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/jr.setFromMatrixColumn(e,0).length(),s=1/jr.setFromMatrixColumn(e,1).length(),o=1/jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*u,v=a*h,x=a*u;n[0]=l*h,n[4]=-l*u,n[8]=c,n[1]=p+v*c,n[5]=f-x*c,n[9]=-a*l,n[2]=x-f*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,v=c*h,x=c*u;n[0]=f+x*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*u,n[5]=o*h,n[9]=-a,n[2]=p*a-v,n[6]=x+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,v=c*h,x=c*u;n[0]=f-x*a,n[4]=-o*u,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*h,n[9]=x-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*u,v=a*h,x=a*u;n[0]=l*h,n[4]=v*c-p,n[8]=f*c+x,n[1]=l*u,n[5]=x*c+f,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*h,n[4]=x-f*u,n[8]=v*u+p,n[1]=u,n[5]=o*h,n[9]=-a*h,n[2]=-c*h,n[6]=p*u+v,n[10]=f-x*u}else if(e.order==="XZY"){const f=o*l,p=o*c,v=a*l,x=a*c;n[0]=l*h,n[4]=-u,n[8]=c*h,n[1]=f*u+x,n[5]=o*h,n[9]=p*u-v,n[2]=v*u-p,n[6]=a*h,n[10]=x*u+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(My,e,Sy)}lookAt(e,n,i){const r=this.elements;return fn.subVectors(e,n),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Di.crossVectors(i,fn),Di.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Di.crossVectors(i,fn)),Di.normalize(),wa.crossVectors(fn,Di),r[0]=Di.x,r[4]=wa.x,r[8]=fn.x,r[1]=Di.y,r[5]=wa.y,r[9]=fn.y,r[2]=Di.z,r[6]=wa.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],v=i[2],x=i[6],g=i[10],d=i[14],A=i[3],m=i[7],C=i[11],T=i[15],S=r[0],I=r[4],R=r[8],B=r[12],_=r[1],y=r[5],N=r[9],O=r[13],G=r[2],Q=r[6],F=r[10],Z=r[14],D=r[3],W=r[7],K=r[11],ne=r[15];return s[0]=o*S+a*_+l*G+c*D,s[4]=o*I+a*y+l*Q+c*W,s[8]=o*R+a*N+l*F+c*K,s[12]=o*B+a*O+l*Z+c*ne,s[1]=h*S+u*_+f*G+p*D,s[5]=h*I+u*y+f*Q+p*W,s[9]=h*R+u*N+f*F+p*K,s[13]=h*B+u*O+f*Z+p*ne,s[2]=v*S+x*_+g*G+d*D,s[6]=v*I+x*y+g*Q+d*W,s[10]=v*R+x*N+g*F+d*K,s[14]=v*B+x*O+g*Z+d*ne,s[3]=A*S+m*_+C*G+T*D,s[7]=A*I+m*y+C*Q+T*W,s[11]=A*R+m*N+C*F+T*K,s[15]=A*B+m*O+C*Z+T*ne,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],v=e[3],x=e[7],g=e[11],d=e[15];return v*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*p-i*l*p)+x*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*h-s*l*h)+g*(+n*c*u-n*a*p-s*o*u+i*o*p+s*a*h-i*c*h)+d*(-r*a*h-n*l*u+n*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],v=e[12],x=e[13],g=e[14],d=e[15],A=u*g*c-x*f*c+x*l*p-a*g*p-u*l*d+a*f*d,m=v*f*c-h*g*c-v*l*p+o*g*p+h*l*d-o*f*d,C=h*x*c-v*u*c+v*a*p-o*x*p-h*a*d+o*u*d,T=v*u*l-h*x*l-v*a*f+o*x*f+h*a*g-o*u*g,S=n*A+i*m+r*C+s*T;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/S;return e[0]=A*I,e[1]=(x*f*s-u*g*s-x*r*p+i*g*p+u*r*d-i*f*d)*I,e[2]=(a*g*s-x*l*s+x*r*c-i*g*c-a*r*d+i*l*d)*I,e[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*p-i*l*p)*I,e[4]=m*I,e[5]=(h*g*s-v*f*s+v*r*p-n*g*p-h*r*d+n*f*d)*I,e[6]=(v*l*s-o*g*s-v*r*c+n*g*c+o*r*d-n*l*d)*I,e[7]=(o*f*s-h*l*s+h*r*c-n*f*c-o*r*p+n*l*p)*I,e[8]=C*I,e[9]=(v*u*s-h*x*s-v*i*p+n*x*p+h*i*d-n*u*d)*I,e[10]=(o*x*s-v*a*s+v*i*c-n*x*c-o*i*d+n*a*d)*I,e[11]=(h*a*s-o*u*s-h*i*c+n*u*c+o*i*p-n*a*p)*I,e[12]=T*I,e[13]=(h*x*r-v*u*r+v*i*f-n*x*f-h*i*g+n*u*g)*I,e[14]=(v*a*r-o*x*r-v*i*l+n*x*l+o*i*g-n*a*g)*I,e[15]=(o*u*r-h*a*r+h*i*l-n*u*l-o*i*f+n*a*f)*I,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,h=o+o,u=a+a,f=s*c,p=s*h,v=s*u,x=o*h,g=o*u,d=a*u,A=l*c,m=l*h,C=l*u,T=i.x,S=i.y,I=i.z;return r[0]=(1-(x+d))*T,r[1]=(p+C)*T,r[2]=(v-m)*T,r[3]=0,r[4]=(p-C)*S,r[5]=(1-(f+d))*S,r[6]=(g+A)*S,r[7]=0,r[8]=(v+m)*I,r[9]=(g-A)*I,r[10]=(1-(f+x))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=jr.set(r[0],r[1],r[2]).length();const o=jr.set(r[4],r[5],r[6]).length(),a=jr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],On.copy(this);const c=1/s,h=1/o,u=1/a;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=h,On.elements[5]*=h,On.elements[6]*=h,On.elements[8]*=u,On.elements[9]*=u,On.elements[10]*=u,n.setFromRotationMatrix(On),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=mi){const l=this.elements,c=2*s/(n-e),h=2*s/(i-r),u=(n+e)/(n-e),f=(i+r)/(i-r);let p,v;if(a===mi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===zl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=mi){const l=this.elements,c=1/(n-e),h=1/(i-r),u=1/(o-s),f=(n+e)*c,p=(i+r)*h;let v,x;if(a===mi)v=(o+s)*u,x=-2*u;else if(a===zl)v=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const jr=new U,On=new at,My=new U(0,0,0),Sy=new U(1,1,1),Di=new U,wa=new U,fn=new U,eg=new at,tg=new Lr;class ii{constructor(e=0,n=0,i=0,r=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return eg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return tg.setFromEuler(this),this.setFromQuaternion(tg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Ov{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ey=0;const ng=new U,Xr=new Lr,ai=new at,Ta=new U,io=new U,wy=new U,Ty=new Lr,ig=new U(1,0,0),rg=new U(0,1,0),sg=new U(0,0,1),og={type:"added"},Ry={type:"removed"},Yr={type:"childadded",child:null},qc={type:"childremoved",child:null};class Jt extends Or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ey++}),this.uuid=Fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jt.DEFAULT_UP.clone();const e=new U,n=new ii,i=new Lr,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new We}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ov,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Xr.setFromAxisAngle(e,n),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,n){return Xr.setFromAxisAngle(e,n),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(ig,e)}rotateY(e){return this.rotateOnAxis(rg,e)}rotateZ(e){return this.rotateOnAxis(sg,e)}translateOnAxis(e,n){return ng.copy(e).applyQuaternion(this.quaternion),this.position.add(ng.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(ig,e)}translateY(e){return this.translateOnAxis(rg,e)}translateZ(e){return this.translateOnAxis(sg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ta.copy(e):Ta.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(io,Ta,this.up):ai.lookAt(Ta,io,this.up),this.quaternion.setFromRotationMatrix(ai),r&&(ai.extractRotation(r.matrixWorld),Xr.setFromRotationMatrix(ai),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(og),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Ry),qc.child=e,this.dispatchEvent(qc),qc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(og),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,wy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,Ty,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Jt.DEFAULT_UP=new U(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new U,li=new U,$c=new U,ci=new U,Zr=new U,Jr=new U,ag=new U,eu=new U,tu=new U,nu=new U,iu=new yt,ru=new yt,su=new yt;class Hn{constructor(e=new U,n=new U,i=new U){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Fn.subVectors(e,n),r.cross(Fn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Fn.subVectors(r,n),li.subVectors(i,n),$c.subVectors(e,n);const o=Fn.dot(Fn),a=Fn.dot(li),l=Fn.dot($c),c=li.dot(li),h=li.dot($c),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,v=(o*h-a*l)*f;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ci.x),l.addScaledVector(o,ci.y),l.addScaledVector(a,ci.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return iu.setScalar(0),ru.setScalar(0),su.setScalar(0),iu.fromBufferAttribute(e,n),ru.fromBufferAttribute(e,i),su.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(iu,s.x),o.addScaledVector(ru,s.y),o.addScaledVector(su,s.z),o}static isFrontFacing(e,n,i,r){return Fn.subVectors(i,n),li.subVectors(e,n),Fn.cross(li).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Fn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Hn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Hn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Zr.subVectors(r,i),Jr.subVectors(s,i),eu.subVectors(e,i);const l=Zr.dot(eu),c=Jr.dot(eu);if(l<=0&&c<=0)return n.copy(i);tu.subVectors(e,r);const h=Zr.dot(tu),u=Jr.dot(tu);if(h>=0&&u<=h)return n.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),n.copy(i).addScaledVector(Zr,o);nu.subVectors(e,s);const p=Zr.dot(nu),v=Jr.dot(nu);if(v>=0&&p<=v)return n.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(Jr,a);const g=h*v-p*u;if(g<=0&&u-h>=0&&p-v>=0)return ag.subVectors(s,r),a=(u-h)/(u-h+(p-v)),n.copy(r).addScaledVector(ag,a);const d=1/(g+x+f);return o=x*d,a=f*d,n.copy(i).addScaledVector(Zr,o).addScaledVector(Jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},Ra={h:0,s:0,l:0};function ou(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ze{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=af(e,1),n=bt(n,0,1),i=bt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=ou(o,s,e+1/3),this.g=ou(o,s,e),this.b=ou(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,n=Bn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Bn){const i=Fv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}copyLinearToSRGB(e){return this.r=Wc(e.r),this.g=Wc(e.g),this.b=Wc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bn){return tt.fromWorkingColorSpace(Xt.copy(this),e),Math.round(bt(Xt.r*255,0,255))*65536+Math.round(bt(Xt.g*255,0,255))*256+Math.round(bt(Xt.b*255,0,255))}getHexString(e=Bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.fromWorkingColorSpace(Xt.copy(this),n);const i=Xt.r,r=Xt.g,s=Xt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=tt.workingColorSpace){return tt.fromWorkingColorSpace(Xt.copy(this),n),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Bn){tt.fromWorkingColorSpace(Xt.copy(this),e);const n=Xt.r,i=Xt.g,r=Xt.b;return e!==Bn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+n,Ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ui),e.getHSL(Ra);const i=xo(Ui.h,Ra.h,n),r=xo(Ui.s,Ra.s,n),s=xo(Ui.l,Ra.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new Ze;Ze.NAMES=Fv;let by=0;class ea extends Or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:by++}),this.uuid=Fr(),this.name="",this.type="Material",this.blending=Is,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=mh,this.blendEquation=Ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Br,this.stencilZFail=Br,this.stencilZPass=Br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gh&&(i.blendSrc=this.blendSrc),this.blendDst!==mh&&(i.blendDst=this.blendDst),this.blendEquation!==Ar&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Br&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Br&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Br&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class kv extends ea{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=Av,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new U,ba=new de;class ni{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Yp,this.updateRanges=[],this.gpuType=gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ba.fromBufferAttribute(this,n),ba.applyMatrix3(e),this.setXY(n,ba.x,ba.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyMatrix3(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyMatrix4(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyNormalMatrix(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.transformDirection(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=es(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Qt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=es(n,this.array)),n}setX(e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=es(n,this.array)),n}setY(e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=es(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=es(n,this.array)),n}setW(e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Qt(n,this.array),i=Qt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Qt(n,this.array),i=Qt(i,this.array),r=Qt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Qt(n,this.array),i=Qt(i,this.array),r=Qt(r,this.array),s=Qt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yp&&(e.usage=this.usage),e}}class zv extends ni{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Bv extends ni{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class pt extends ni{constructor(e,n,i){super(new Float32Array(e),n,i)}}let Py=0;const Mn=new at,au=new Jt,Kr=new U,pn=new Ws,ro=new Ws,Dt=new U;class yn extends Or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Py++}),this.uuid=Fr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lv(e)?Bv:zv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,n,i){return Mn.makeTranslation(e,n,i),this.applyMatrix4(Mn),this}scale(e,n,i){return Mn.makeScale(e,n,i),this.applyMatrix4(Mn),this}lookAt(e){return au.lookAt(e),au.updateMatrix(),this.applyMatrix4(au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ws);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];pn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lf);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(pn.min,ro.min),pn.expandByPoint(Dt),Dt.addVectors(pn.max,ro.max),pn.expandByPoint(Dt)):(pn.expandByPoint(ro.min),pn.expandByPoint(ro.max))}pn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Dt.fromBufferAttribute(a,c),l&&(Kr.fromBufferAttribute(e,c),Dt.add(Kr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ni(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new U,l[R]=new U;const c=new U,h=new U,u=new U,f=new de,p=new de,v=new de,x=new U,g=new U;function d(R,B,_){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,B),u.fromBufferAttribute(i,_),f.fromBufferAttribute(s,R),p.fromBufferAttribute(s,B),v.fromBufferAttribute(s,_),h.sub(c),u.sub(c),p.sub(f),v.sub(f);const y=1/(p.x*v.y-v.x*p.y);isFinite(y)&&(x.copy(h).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(y),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-v.x).multiplyScalar(y),a[R].add(x),a[B].add(x),a[_].add(x),l[R].add(g),l[B].add(g),l[_].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let R=0,B=A.length;R<B;++R){const _=A[R],y=_.start,N=_.count;for(let O=y,G=y+N;O<G;O+=3)d(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const m=new U,C=new U,T=new U,S=new U;function I(R){T.fromBufferAttribute(r,R),S.copy(T);const B=a[R];m.copy(B),m.sub(T.multiplyScalar(T.dot(B))).normalize(),C.crossVectors(S,B);const y=C.dot(l[R])<0?-1:1;o.setXYZW(R,m.x,m.y,m.z,y)}for(let R=0,B=A.length;R<B;++R){const _=A[R],y=_.start,N=_.count;for(let O=y,G=y+N;O<G;O+=3)I(e.getX(O+0)),I(e.getX(O+1)),I(e.getX(O+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ni(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new U,s=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,g),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(h),l.add(h),c.add(h),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Dt.fromBufferAttribute(e,n),Dt.normalize(),e.setXYZ(n,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,v=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let d=0;d<h;d++)f[v++]=c[p++]}return new ni(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new yn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lg=new at,ur=new Uv,Pa=new lf,cg=new U,La=new U,Na=new U,Da=new U,lu=new U,Ua=new U,ug=new U,Oa=new U;class Bt extends Jt{constructor(e=new yn,n=new kv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ua.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(lu.fromBufferAttribute(u,e),o?Ua.addScaledVector(lu,h):Ua.addScaledVector(lu.sub(n),h))}n.add(Ua)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pa.copy(i.boundingSphere),Pa.applyMatrix4(s),ur.copy(e.ray).recast(e.near),!(Pa.containsPoint(ur.origin)===!1&&(ur.intersectSphere(Pa,cg)===null||ur.origin.distanceToSquared(cg)>(e.far-e.near)**2))&&(lg.copy(s).invert(),ur.copy(e.ray).applyMatrix4(lg),!(i.boundingBox!==null&&ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ur)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],A=Math.max(g.start,p.start),m=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let C=A,T=m;C<T;C+=3){const S=a.getX(C),I=a.getX(C+1),R=a.getX(C+2);r=Fa(this,d,e,i,c,h,u,S,I,R),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const A=a.getX(g),m=a.getX(g+1),C=a.getX(g+2);r=Fa(this,o,e,i,c,h,u,A,m,C),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],A=Math.max(g.start,p.start),m=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let C=A,T=m;C<T;C+=3){const S=C,I=C+1,R=C+2;r=Fa(this,d,e,i,c,h,u,S,I,R),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const A=g,m=g+1,C=g+2;r=Fa(this,o,e,i,c,h,u,A,m,C),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Ly(t,e,n,i,r,s,o,a){let l;if(e.side===Zt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Mi,a),l===null)return null;Oa.copy(a),Oa.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Oa);return c<n.near||c>n.far?null:{distance:c,point:Oa.clone(),object:t}}function Fa(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,La),t.getVertexPosition(l,Na),t.getVertexPosition(c,Da);const h=Ly(t,e,n,i,La,Na,Da,ug);if(h){const u=new U;Hn.getBarycoord(ug,La,Na,Da,u),r&&(h.uv=Hn.getInterpolatedAttribute(r,a,l,c,u,new de)),s&&(h.uv1=Hn.getInterpolatedAttribute(s,a,l,c,u,new de)),o&&(h.normal=Hn.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new U,materialIndex:0};Hn.getNormal(La,Na,Da,f.normal),h.face=f,h.barycoord=u}return h}class ta extends yn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function v(x,g,d,A,m,C,T,S,I,R,B){const _=C/I,y=T/R,N=C/2,O=T/2,G=S/2,Q=I+1,F=R+1;let Z=0,D=0;const W=new U;for(let K=0;K<F;K++){const ne=K*y-O;for(let le=0;le<Q;le++){const _e=le*_-N;W[x]=_e*A,W[g]=ne*m,W[d]=G,c.push(W.x,W.y,W.z),W[x]=0,W[g]=0,W[d]=S>0?1:-1,h.push(W.x,W.y,W.z),u.push(le/I),u.push(1-K/R),Z+=1}}for(let K=0;K<R;K++)for(let ne=0;ne<I;ne++){const le=f+ne+Q*K,_e=f+ne+Q*(K+1),V=f+(ne+1)+Q*(K+1),te=f+(ne+1)+Q*K;l.push(le,_e,te),l.push(_e,V,te),D+=6}a.addGroup(p,D,B),p+=D,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ta(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function qt(t){const e={};for(let n=0;n<t.length;n++){const i=Bs(t[n]);for(const r in i)e[r]=i[r]}return e}function Ny(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Gv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Dy={clone:Bs,merge:qt};var Uy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends ea{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uy,this.fragmentShader=Oy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=Ny(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Vv extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new U,hg=new de,dg=new de;class wn extends Vv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ho*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Co*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ho*2*Math.atan(Math.tan(Co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,n){return this.getViewBounds(e,hg,dg),n.subVectors(dg,hg)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Co*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Qr=-90,qr=1;class Fy extends Jt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(Qr,qr,e,n);r.layers=this.layers,this.add(r);const s=new wn(Qr,qr,e,n);s.layers=this.layers,this.add(s);const o=new wn(Qr,qr,e,n);o.layers=this.layers,this.add(o);const a=new wn(Qr,qr,e,n);a.layers=this.layers,this.add(a);const l=new wn(Qr,qr,e,n);l.layers=this.layers,this.add(l);const c=new wn(Qr,qr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,h),e.setRenderTarget(u,f,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Hv extends tn{constructor(e,n,i,r,s,o,a,l,c,h){e=e!==void 0?e:[],n=n!==void 0?n:Us,super(e,n,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ky extends Pr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Hv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Vn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ta(5,5,5),s=new Ei({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:tr});s.uniforms.tEquirect.value=n;const o=new Bt(r,s),a=n.minFilter;return n.minFilter===yr&&(n.minFilter=Vn),new Fy(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const cu=new U,zy=new U,By=new We;class zi{constructor(e=new U(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=cu.subVectors(i,n).cross(zy.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(cu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||By.getNormalMatrix(e),r=this.coplanarPoint(cu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hr=new lf,ka=new U;class cf{constructor(e=new zi,n=new zi,i=new zi,r=new zi,s=new zi,o=new zi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=mi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],p=r[8],v=r[9],x=r[10],g=r[11],d=r[12],A=r[13],m=r[14],C=r[15];if(i[0].setComponents(l-s,f-c,g-p,C-d).normalize(),i[1].setComponents(l+s,f+c,g+p,C+d).normalize(),i[2].setComponents(l+o,f+h,g+v,C+A).normalize(),i[3].setComponents(l-o,f-h,g-v,C-A).normalize(),i[4].setComponents(l-a,f-u,g-x,C-m).normalize(),n===mi)i[5].setComponents(l+a,f+u,g+x,C+m).normalize();else if(n===zl)i[5].setComponents(a,u,x,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hr)}intersectsSprite(e){return hr.center.set(0,0,0),hr.radius=.7071067811865476,hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(hr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ka.x=r.normal.x>0?e.max.x:e.min.x,ka.y=r.normal.y>0?e.max.y:e.min.y,ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Gy(t){const e=new WeakMap;function n(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(t.bindBuffer(c,a),u.length===0)t.bufferSubData(c,0,h);else{u.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<u.length;p++){const v=u[f],x=u[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,v=u.length;p<v;p++){const x=u[p];t.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class ac extends yn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,f=n/l,p=[],v=[],x=[],g=[];for(let d=0;d<h;d++){const A=d*f-o;for(let m=0;m<c;m++){const C=m*u-s;v.push(C,-A,0),x.push(0,0,1),g.push(m/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){const m=A+c*d,C=A+c*(d+1),T=A+1+c*(d+1),S=A+1+c*d;p.push(m,C,S),p.push(C,T,S)}this.setIndex(p),this.setAttribute("position",new pt(v,3)),this.setAttribute("normal",new pt(x,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.width,e.height,e.widthSegments,e.heightSegments)}}var Vy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hy=`#ifdef USE_ALPHAHASH
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
#endif`,Wy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zy=`#ifdef USE_AOMAP
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
#endif`,Jy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ky=`#ifdef USE_BATCHING
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
#endif`,Qy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$y=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eI=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tI=`#ifdef USE_IRIDESCENCE
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
#endif`,nI=`#ifdef USE_BUMPMAP
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
#endif`,iI=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sI=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,oI=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aI=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cI=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,uI=`#if defined( USE_COLOR_ALPHA )
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
#endif`,hI=`#define PI 3.141592653589793
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
} // validated`,dI=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fI=`vec3 transformedNormal = objectNormal;
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
#endif`,pI=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gI=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mI=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,AI=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vI="gl_FragColor = linearToOutputTexel( gl_FragColor );",_I=`
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
}`,CI=`#ifdef USE_ENVMAP
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
#endif`,xI=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yI=`#ifdef USE_ENVMAP
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
#endif`,II=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MI=`#ifdef USE_ENVMAP
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
#endif`,SI=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,EI=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wI=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,TI=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RI=`#ifdef USE_GRADIENTMAP
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
}`,bI=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PI=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,NI=`uniform bool receiveShadow;
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
#endif`,DI=`#ifdef USE_ENVMAP
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
#endif`,UI=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,OI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,FI=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kI=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zI=`PhysicalMaterial material;
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
#endif`,BI=`struct PhysicalMaterial {
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
}`,GI=`
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
#endif`,VI=`#if defined( RE_IndirectDiffuse )
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
#endif`,HI=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,WI=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jI=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XI=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YI=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ZI=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,JI=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KI=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,QI=`#if defined( USE_POINTS_UV )
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
#endif`,qI=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$I=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iM=`#ifdef USE_MORPHTARGETS
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
#endif`,rM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,oM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,aM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uM=`#ifdef USE_NORMALMAP
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
#endif`,hM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,AM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_M=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,CM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,IM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,SM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,EM=`float getShadowMask() {
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
}`,wM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,TM=`#ifdef USE_SKINNING
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
#endif`,RM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bM=`#ifdef USE_SKINNING
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
#endif`,PM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,LM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,NM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,UM=`#ifdef USE_TRANSMISSION
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
#endif`,OM=`#ifdef USE_TRANSMISSION
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
#endif`,FM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const GM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,VM=`uniform sampler2D t2D;
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
}`,HM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YM=`#include <common>
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
}`,ZM=`#if DEPTH_PACKING == 3200
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
}`,JM=`#define DISTANCE
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
}`,KM=`#define DISTANCE
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
}`,QM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$M=`uniform float scale;
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
}`,eS=`uniform vec3 diffuse;
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
}`,tS=`#include <common>
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
}`,nS=`uniform vec3 diffuse;
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
}`,iS=`#define LAMBERT
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
}`,rS=`#define LAMBERT
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
}`,sS=`#define MATCAP
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
}`,oS=`#define MATCAP
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
}`,aS=`#define NORMAL
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
}`,lS=`#define NORMAL
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
}`,cS=`#define PHONG
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
}`,uS=`#define PHONG
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
}`,hS=`#define STANDARD
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
}`,dS=`#define STANDARD
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
}`,fS=`#define TOON
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
}`,pS=`#define TOON
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
}`,gS=`uniform float size;
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
}`,mS=`uniform vec3 diffuse;
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
}`,AS=`#include <common>
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
}`,vS=`uniform vec3 color;
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
}`,_S=`uniform float rotation;
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
}`,CS=`uniform vec3 diffuse;
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
}`,Ye={alphahash_fragment:Vy,alphahash_pars_fragment:Hy,alphamap_fragment:Wy,alphamap_pars_fragment:jy,alphatest_fragment:Xy,alphatest_pars_fragment:Yy,aomap_fragment:Zy,aomap_pars_fragment:Jy,batching_pars_vertex:Ky,batching_vertex:Qy,begin_vertex:qy,beginnormal_vertex:$y,bsdfs:eI,iridescence_fragment:tI,bumpmap_pars_fragment:nI,clipping_planes_fragment:iI,clipping_planes_pars_fragment:rI,clipping_planes_pars_vertex:sI,clipping_planes_vertex:oI,color_fragment:aI,color_pars_fragment:lI,color_pars_vertex:cI,color_vertex:uI,common:hI,cube_uv_reflection_fragment:dI,defaultnormal_vertex:fI,displacementmap_pars_vertex:pI,displacementmap_vertex:gI,emissivemap_fragment:mI,emissivemap_pars_fragment:AI,colorspace_fragment:vI,colorspace_pars_fragment:_I,envmap_fragment:CI,envmap_common_pars_fragment:xI,envmap_pars_fragment:yI,envmap_pars_vertex:II,envmap_physical_pars_fragment:DI,envmap_vertex:MI,fog_vertex:SI,fog_pars_vertex:EI,fog_fragment:wI,fog_pars_fragment:TI,gradientmap_pars_fragment:RI,lightmap_pars_fragment:bI,lights_lambert_fragment:PI,lights_lambert_pars_fragment:LI,lights_pars_begin:NI,lights_toon_fragment:UI,lights_toon_pars_fragment:OI,lights_phong_fragment:FI,lights_phong_pars_fragment:kI,lights_physical_fragment:zI,lights_physical_pars_fragment:BI,lights_fragment_begin:GI,lights_fragment_maps:VI,lights_fragment_end:HI,logdepthbuf_fragment:WI,logdepthbuf_pars_fragment:jI,logdepthbuf_pars_vertex:XI,logdepthbuf_vertex:YI,map_fragment:ZI,map_pars_fragment:JI,map_particle_fragment:KI,map_particle_pars_fragment:QI,metalnessmap_fragment:qI,metalnessmap_pars_fragment:$I,morphinstance_vertex:eM,morphcolor_vertex:tM,morphnormal_vertex:nM,morphtarget_pars_vertex:iM,morphtarget_vertex:rM,normal_fragment_begin:sM,normal_fragment_maps:oM,normal_pars_fragment:aM,normal_pars_vertex:lM,normal_vertex:cM,normalmap_pars_fragment:uM,clearcoat_normal_fragment_begin:hM,clearcoat_normal_fragment_maps:dM,clearcoat_pars_fragment:fM,iridescence_pars_fragment:pM,opaque_fragment:gM,packing:mM,premultiplied_alpha_fragment:AM,project_vertex:vM,dithering_fragment:_M,dithering_pars_fragment:CM,roughnessmap_fragment:xM,roughnessmap_pars_fragment:yM,shadowmap_pars_fragment:IM,shadowmap_pars_vertex:MM,shadowmap_vertex:SM,shadowmask_pars_fragment:EM,skinbase_vertex:wM,skinning_pars_vertex:TM,skinning_vertex:RM,skinnormal_vertex:bM,specularmap_fragment:PM,specularmap_pars_fragment:LM,tonemapping_fragment:NM,tonemapping_pars_fragment:DM,transmission_fragment:UM,transmission_pars_fragment:OM,uv_pars_fragment:FM,uv_pars_vertex:kM,uv_vertex:zM,worldpos_vertex:BM,background_vert:GM,background_frag:VM,backgroundCube_vert:HM,backgroundCube_frag:WM,cube_vert:jM,cube_frag:XM,depth_vert:YM,depth_frag:ZM,distanceRGBA_vert:JM,distanceRGBA_frag:KM,equirect_vert:QM,equirect_frag:qM,linedashed_vert:$M,linedashed_frag:eS,meshbasic_vert:tS,meshbasic_frag:nS,meshlambert_vert:iS,meshlambert_frag:rS,meshmatcap_vert:sS,meshmatcap_frag:oS,meshnormal_vert:aS,meshnormal_frag:lS,meshphong_vert:cS,meshphong_frag:uS,meshphysical_vert:hS,meshphysical_frag:dS,meshtoon_vert:fS,meshtoon_frag:pS,points_vert:gS,points_frag:mS,shadow_vert:AS,shadow_frag:vS,sprite_vert:_S,sprite_frag:CS},ye={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},qn={basic:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:qt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:qt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:qt([ye.points,ye.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:qt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:qt([ye.common,ye.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:qt([ye.sprite,ye.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:qt([ye.common,ye.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:qt([ye.lights,ye.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};qn.physical={uniforms:qt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const za={r:0,b:0,g:0},dr=new ii,xS=new at;function yS(t,e,n,i,r,s,o){const a=new Ze(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function v(A){let m=A.isScene===!0?A.background:null;return m&&m.isTexture&&(m=(A.backgroundBlurriness>0?n:e).get(m)),m}function x(A){let m=!1;const C=v(A);C===null?d(a,l):C&&C.isColor&&(d(C,1),m=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||m)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(A,m){const C=v(m);C&&(C.isCubeTexture||C.mapping===sc)?(h===void 0&&(h=new Bt(new ta(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Bs(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),dr.copy(m.backgroundRotation),dr.x*=-1,dr.y*=-1,dr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xS.makeRotationFromEuler(dr)),h.material.toneMapped=tt.getTransfer(C.colorSpace)!==ht,(u!==C||f!==C.version||p!==t.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,p=t.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Bt(new ac(2,2),new Ei({name:"BackgroundMaterial",uniforms:Bs(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==ht,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,p=t.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function d(A,m){A.getRGB(za,Gv(t)),i.buffers.color.setClear(za.r,za.g,za.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(A,m=1){a.set(A),l=m,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,d(a,l)},render:x,addToRenderList:g}}function IS(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(_,y,N,O,G){let Q=!1;const F=u(O,N,y);s!==F&&(s=F,c(s.object)),Q=p(_,O,N,G),Q&&v(_,O,N,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,C(_,y,N,O),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(_){return t.bindVertexArray(_)}function h(_){return t.deleteVertexArray(_)}function u(_,y,N){const O=N.wireframe===!0;let G=i[_.id];G===void 0&&(G={},i[_.id]=G);let Q=G[y.id];Q===void 0&&(Q={},G[y.id]=Q);let F=Q[O];return F===void 0&&(F=f(l()),Q[O]=F),F}function f(_){const y=[],N=[],O=[];for(let G=0;G<n;G++)y[G]=0,N[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:N,attributeDivisors:O,object:_,attributes:{},index:null}}function p(_,y,N,O){const G=s.attributes,Q=y.attributes;let F=0;const Z=N.getAttributes();for(const D in Z)if(Z[D].location>=0){const K=G[D];let ne=Q[D];if(ne===void 0&&(D==="instanceMatrix"&&_.instanceMatrix&&(ne=_.instanceMatrix),D==="instanceColor"&&_.instanceColor&&(ne=_.instanceColor)),K===void 0||K.attribute!==ne||ne&&K.data!==ne.data)return!0;F++}return s.attributesNum!==F||s.index!==O}function v(_,y,N,O){const G={},Q=y.attributes;let F=0;const Z=N.getAttributes();for(const D in Z)if(Z[D].location>=0){let K=Q[D];K===void 0&&(D==="instanceMatrix"&&_.instanceMatrix&&(K=_.instanceMatrix),D==="instanceColor"&&_.instanceColor&&(K=_.instanceColor));const ne={};ne.attribute=K,K&&K.data&&(ne.data=K.data),G[D]=ne,F++}s.attributes=G,s.attributesNum=F,s.index=O}function x(){const _=s.newAttributes;for(let y=0,N=_.length;y<N;y++)_[y]=0}function g(_){d(_,0)}function d(_,y){const N=s.newAttributes,O=s.enabledAttributes,G=s.attributeDivisors;N[_]=1,O[_]===0&&(t.enableVertexAttribArray(_),O[_]=1),G[_]!==y&&(t.vertexAttribDivisor(_,y),G[_]=y)}function A(){const _=s.newAttributes,y=s.enabledAttributes;for(let N=0,O=y.length;N<O;N++)y[N]!==_[N]&&(t.disableVertexAttribArray(N),y[N]=0)}function m(_,y,N,O,G,Q,F){F===!0?t.vertexAttribIPointer(_,y,N,G,Q):t.vertexAttribPointer(_,y,N,O,G,Q)}function C(_,y,N,O){x();const G=O.attributes,Q=N.getAttributes(),F=y.defaultAttributeValues;for(const Z in Q){const D=Q[Z];if(D.location>=0){let W=G[Z];if(W===void 0&&(Z==="instanceMatrix"&&_.instanceMatrix&&(W=_.instanceMatrix),Z==="instanceColor"&&_.instanceColor&&(W=_.instanceColor)),W!==void 0){const K=W.normalized,ne=W.itemSize,le=e.get(W);if(le===void 0)continue;const _e=le.buffer,V=le.type,te=le.bytesPerElement,oe=V===t.INT||V===t.UNSIGNED_INT||W.gpuType===$d;if(W.isInterleavedBufferAttribute){const ae=W.data,Oe=ae.stride,Ne=W.offset;if(ae.isInstancedInterleavedBuffer){for(let ke=0;ke<D.locationSize;ke++)d(D.location+ke,ae.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ke=0;ke<D.locationSize;ke++)g(D.location+ke);t.bindBuffer(t.ARRAY_BUFFER,_e);for(let ke=0;ke<D.locationSize;ke++)m(D.location+ke,ne/D.locationSize,V,K,Oe*te,(Ne+ne/D.locationSize*ke)*te,oe)}else{if(W.isInstancedBufferAttribute){for(let ae=0;ae<D.locationSize;ae++)d(D.location+ae,W.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let ae=0;ae<D.locationSize;ae++)g(D.location+ae);t.bindBuffer(t.ARRAY_BUFFER,_e);for(let ae=0;ae<D.locationSize;ae++)m(D.location+ae,ne/D.locationSize,V,K,ne*te,ne/D.locationSize*ae*te,oe)}}else if(F!==void 0){const K=F[Z];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(D.location,K);break;case 3:t.vertexAttrib3fv(D.location,K);break;case 4:t.vertexAttrib4fv(D.location,K);break;default:t.vertexAttrib1fv(D.location,K)}}}}A()}function T(){R();for(const _ in i){const y=i[_];for(const N in y){const O=y[N];for(const G in O)h(O[G].object),delete O[G];delete y[N]}delete i[_]}}function S(_){if(i[_.id]===void 0)return;const y=i[_.id];for(const N in y){const O=y[N];for(const G in O)h(O[G].object),delete O[G];delete y[N]}delete i[_.id]}function I(_){for(const y in i){const N=i[y];if(N[_.id]===void 0)continue;const O=N[_.id];for(const G in O)h(O[G].object),delete O[G];delete N[_.id]}}function R(){B(),o=!0,s!==r&&(s=r,c(s.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:B,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:g,disableUnusedAttributes:A}}function MS(t,e,n){let i;function r(c){i=c}function s(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function o(c,h,u){u!==0&&(t.drawArraysInstanced(i,c,h,u),n.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v];n.update(p,i,1)}function l(c,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],h[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let v=0;for(let x=0;x<u;x++)v+=h[x];for(let x=0;x<f.length;x++)n.update(v,i,f[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function SS(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==Wn&&i.convert(I)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const R=I===$o&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Si&&i.convert(I)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==gi&&!R)}function l(I){if(I==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const I=e.get("EXT_clip_control");I.clipControlEXT(I.LOWER_LEFT_EXT,I.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),A=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),m=t.getParameter(t.MAX_VARYING_VECTORS),C=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=v>0,S=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:A,maxVaryings:m,maxFragmentUniforms:C,vertexTextures:T,maxSamples:S}}function ES(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new zi,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||r;return r=f,i=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){n=h(u,f,0)},this.setState=function(u,f,p){const v=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,d=t.get(u);if(!r||v===null||v.length===0||s&&!g)s?h(null):c();else{const A=s?0:i,m=A*4;let C=d.clippingState||null;l.value=C,C=h(v,f,m,p);for(let T=0;T!==m;++T)C[T]=n[T];d.clippingState=C,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,v){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,v!==!0||g===null){const d=p+x*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<d)&&(g=new Float32Array(d));for(let m=0,C=p;m!==x;++m,C+=4)o.copy(u[m]).applyMatrix4(A,a),o.normal.toArray(g,C),g[C+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function wS(t){let e=new WeakMap;function n(o,a){return a===Mh?o.mapping=Us:a===Sh&&(o.mapping=Os),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mh||a===Sh)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ky(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class jv extends Vv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ps=4,fg=[.125,.215,.35,.446,.526,.582],vr=20,uu=new jv,pg=new Ze;let hu=null,du=0,fu=0,pu=!1;const mr=(1+Math.sqrt(5))/2,$r=1/mr,gg=[new U(-mr,$r,0),new U(mr,$r,0),new U(-$r,0,mr),new U($r,0,mr),new U(0,mr,-$r),new U(0,mr,$r),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class mg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){hu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),fu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_g(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(hu,du,fu),this._renderer.xr.enabled=pu,e.scissorTest=!1,Ba(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Us||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hu=this._renderer.getRenderTarget(),du=this._renderer.getActiveCubeFace(),fu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:$o,format:Wn,colorSpace:Zn,depthBuffer:!1},r=Ag(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ag(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=TS(s)),this._blurMaterial=RS(s,e,n)}return r}_compileMaterial(e){const n=new Bt(this._lodPlanes[0],e);this._renderer.compile(n,uu)}_sceneToCubeUV(e,n,i,r){const a=new wn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(pg),h.toneMapping=_i,h.autoClear=!1;const p=new kv({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),v=new Bt(new ta,p);let x=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,x=!0):(p.color.copy(pg),x=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):A===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const m=this._cubeSize;Ba(r,A*m,d>2?m:0,m,m),h.setRenderTarget(r),x&&h.render(v,a),h.render(e,a)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Us||e.mapping===Os;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_g()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Bt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ba(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,uu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=gg[(r-s-1)%gg.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Bt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*vr-1),x=s/v,g=isFinite(s)?1+Math.floor(h*x):vr;g>vr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vr}`);const d=[];let A=0;for(let I=0;I<vr;++I){const R=I/x,B=Math.exp(-R*R/2);d.push(B),I===0?A+=B:I<g&&(A+=2*B)}for(let I=0;I<d.length;I++)d[I]=d[I]/A;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:m}=this;f.dTheta.value=v,f.mipInt.value=m-i;const C=this._sizeLods[r],T=3*C*(r>m-ps?r-m+ps:0),S=4*(this._cubeSize-C);Ba(n,T,S,3*C,2*C),l.setRenderTarget(n),l.render(u,uu)}}function TS(t){const e=[],n=[],i=[];let r=t;const s=t-ps+1+fg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ps?l=fg[o-t+ps-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,v=6,x=3,g=2,d=1,A=new Float32Array(x*v*p),m=new Float32Array(g*v*p),C=new Float32Array(d*v*p);for(let S=0;S<p;S++){const I=S%3*2/3-1,R=S>2?0:-1,B=[I,R,0,I+2/3,R,0,I+2/3,R+1,0,I,R,0,I+2/3,R+1,0,I,R+1,0];A.set(B,x*v*S),m.set(f,g*v*S);const _=[S,S,S,S,S,S];C.set(_,d*v*S)}const T=new yn;T.setAttribute("position",new ni(A,x)),T.setAttribute("uv",new ni(m,g)),T.setAttribute("faceIndex",new ni(C,d)),e.push(T),r>ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Ag(t,e,n){const i=new Pr(t,e,n);return i.texture.mapping=sc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ba(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function RS(t,e,n){const i=new Float32Array(vr),r=new U(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:uf(),fragmentShader:`

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
		`,blending:tr,depthTest:!1,depthWrite:!1})}function vg(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uf(),fragmentShader:`

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
		`,blending:tr,depthTest:!1,depthWrite:!1})}function _g(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function uf(){return`

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
	`}function bS(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mh||l===Sh,h=l===Us||l===Os;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new mg(t)),u=c?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(n===null&&(n=new mg(t)),u=c?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function PS(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&cl("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function LS(t,e,n,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const x=f.morphAttributes[v];for(let g=0,d=x.length;g<d;g++)e.remove(x[g])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(u){const f=u.attributes;for(const v in f)e.update(f[v],t.ARRAY_BUFFER);const p=u.morphAttributes;for(const v in p){const x=p[v];for(let g=0,d=x.length;g<d;g++)e.update(x[g],t.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,v=u.attributes.position;let x=0;if(p!==null){const A=p.array;x=p.version;for(let m=0,C=A.length;m<C;m+=3){const T=A[m+0],S=A[m+1],I=A[m+2];f.push(T,S,S,I,I,T)}}else if(v!==void 0){const A=v.array;x=v.version;for(let m=0,C=A.length/3-1;m<C;m+=3){const T=m+0,S=m+1,I=m+2;f.push(T,S,S,I,I,T)}}else return;const g=new(Lv(f)?Bv:zv)(f,1);g.version=x;const d=s.get(u);d&&e.remove(d),s.set(u,g)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function NS(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,f*o,v),n.update(p,i,v))}function h(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,v);let g=0;for(let d=0;d<v;d++)g+=p[d];n.update(g,i,1)}function u(f,p,v,x){if(v===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],x[d]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,v);let d=0;for(let A=0;A<v;A++)d+=p[A];for(let A=0;A<x.length;A++)n.update(d,i,x[A])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function DS(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function US(t,e,n){const i=new WeakMap,r=new yt;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let _=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",_)};var p=_;f!==void 0&&f.texture.dispose();const v=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],m=a.morphAttributes.color||[];let C=0;v===!0&&(C=1),x===!0&&(C=2),g===!0&&(C=3);let T=a.attributes.position.count*C,S=1;T>e.maxTextureSize&&(S=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const I=new Float32Array(T*S*4*u),R=new Dv(I,T,S,u);R.type=gi,R.needsUpdate=!0;const B=C*4;for(let y=0;y<u;y++){const N=d[y],O=A[y],G=m[y],Q=T*S*4*y;for(let F=0;F<N.count;F++){const Z=F*B;v===!0&&(r.fromBufferAttribute(N,F),I[Q+Z+0]=r.x,I[Q+Z+1]=r.y,I[Q+Z+2]=r.z,I[Q+Z+3]=0),x===!0&&(r.fromBufferAttribute(O,F),I[Q+Z+4]=r.x,I[Q+Z+5]=r.y,I[Q+Z+6]=r.z,I[Q+Z+7]=0),g===!0&&(r.fromBufferAttribute(G,F),I[Q+Z+8]=r.x,I[Q+Z+9]=r.y,I[Q+Z+10]=r.z,I[Q+Z+11]=G.itemSize===4?r.w:1)}}f={count:u,texture:R,size:new de(T,S)},i.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const x=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function OS(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Xv extends tn{constructor(e,n,i,r,s,o,a,l,c,h=Ms){if(h!==Ms&&h!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ms&&(i=br),i===void 0&&h===zs&&(i=ks),super(null,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Rn,this.minFilter=l!==void 0?l:Rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Yv=new tn,Cg=new Xv(1,1),Zv=new Dv,Jv=new yy,Kv=new Hv,xg=[],yg=[],Ig=new Float32Array(16),Mg=new Float32Array(9),Sg=new Float32Array(4);function js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=xg[r];if(s===void 0&&(s=new Float32Array(r),xg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Lt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Nt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function lc(t,e){let n=yg[e];n===void 0&&(n=new Int32Array(e),yg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function FS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function kS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Lt(n,e))return;t.uniform2fv(this.addr,e),Nt(n,e)}}function zS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Lt(n,e))return;t.uniform3fv(this.addr,e),Nt(n,e)}}function BS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Lt(n,e))return;t.uniform4fv(this.addr,e),Nt(n,e)}}function GS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Lt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Nt(n,e)}else{if(Lt(n,i))return;Sg.set(i),t.uniformMatrix2fv(this.addr,!1,Sg),Nt(n,i)}}function VS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Lt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Nt(n,e)}else{if(Lt(n,i))return;Mg.set(i),t.uniformMatrix3fv(this.addr,!1,Mg),Nt(n,i)}}function HS(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Lt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Nt(n,e)}else{if(Lt(n,i))return;Ig.set(i),t.uniformMatrix4fv(this.addr,!1,Ig),Nt(n,i)}}function WS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function jS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Lt(n,e))return;t.uniform2iv(this.addr,e),Nt(n,e)}}function XS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Lt(n,e))return;t.uniform3iv(this.addr,e),Nt(n,e)}}function YS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Lt(n,e))return;t.uniform4iv(this.addr,e),Nt(n,e)}}function ZS(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function JS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Lt(n,e))return;t.uniform2uiv(this.addr,e),Nt(n,e)}}function KS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Lt(n,e))return;t.uniform3uiv(this.addr,e),Nt(n,e)}}function QS(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Lt(n,e))return;t.uniform4uiv(this.addr,e),Nt(n,e)}}function qS(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Cg.compareFunction=bv,s=Cg):s=Yv,n.setTexture2D(e||s,r)}function $S(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Jv,r)}function eE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Kv,r)}function tE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Zv,r)}function nE(t){switch(t){case 5126:return FS;case 35664:return kS;case 35665:return zS;case 35666:return BS;case 35674:return GS;case 35675:return VS;case 35676:return HS;case 5124:case 35670:return WS;case 35667:case 35671:return jS;case 35668:case 35672:return XS;case 35669:case 35673:return YS;case 5125:return ZS;case 36294:return JS;case 36295:return KS;case 36296:return QS;case 35678:case 36198:case 36298:case 36306:case 35682:return qS;case 35679:case 36299:case 36307:return $S;case 35680:case 36300:case 36308:case 36293:return eE;case 36289:case 36303:case 36311:case 36292:return tE}}function iE(t,e){t.uniform1fv(this.addr,e)}function rE(t,e){const n=js(e,this.size,2);t.uniform2fv(this.addr,n)}function sE(t,e){const n=js(e,this.size,3);t.uniform3fv(this.addr,n)}function oE(t,e){const n=js(e,this.size,4);t.uniform4fv(this.addr,n)}function aE(t,e){const n=js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function lE(t,e){const n=js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function cE(t,e){const n=js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function uE(t,e){t.uniform1iv(this.addr,e)}function hE(t,e){t.uniform2iv(this.addr,e)}function dE(t,e){t.uniform3iv(this.addr,e)}function fE(t,e){t.uniform4iv(this.addr,e)}function pE(t,e){t.uniform1uiv(this.addr,e)}function gE(t,e){t.uniform2uiv(this.addr,e)}function mE(t,e){t.uniform3uiv(this.addr,e)}function AE(t,e){t.uniform4uiv(this.addr,e)}function vE(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Lt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Yv,s[o])}function _E(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Lt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Jv,s[o])}function CE(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Lt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Kv,s[o])}function xE(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Lt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Zv,s[o])}function yE(t){switch(t){case 5126:return iE;case 35664:return rE;case 35665:return sE;case 35666:return oE;case 35674:return aE;case 35675:return lE;case 35676:return cE;case 5124:case 35670:return uE;case 35667:case 35671:return hE;case 35668:case 35672:return dE;case 35669:case 35673:return fE;case 5125:return pE;case 36294:return gE;case 36295:return mE;case 36296:return AE;case 35678:case 36198:case 36298:case 36306:case 35682:return vE;case 35679:case 36299:case 36307:return _E;case 35680:case 36300:case 36308:case 36293:return CE;case 36289:case 36303:case 36311:case 36292:return xE}}class IE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=nE(n.type)}}class ME{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=yE(n.type)}}class SE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const gu=/(\w+)(\])?(\[|\.)?/g;function Eg(t,e){t.seq.push(e),t.map[e.id]=e}function EE(t,e,n){const i=t.name,r=i.length;for(gu.lastIndex=0;;){const s=gu.exec(i),o=gu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Eg(n,c===void 0?new IE(a,t,e):new ME(a,t,e));break}else{let u=n.map[a];u===void 0&&(u=new SE(a),Eg(n,u)),n=u}}}class ul{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);EE(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function wg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const wE=37297;let TE=0;function RE(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function bE(t){const e=tt.getPrimaries(tt.workingColorSpace),n=tt.getPrimaries(t);let i;switch(e===n?i="":e===kl&&n===Fl?i="LinearDisplayP3ToLinearSRGB":e===Fl&&n===kl&&(i="LinearSRGBToLinearDisplayP3"),t){case Zn:case oc:return[i,"LinearTransferOETF"];case Bn:case of:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Tg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+RE(t.getShaderSource(e),o)}else return r}function PE(t,e){const n=bE(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function LE(t,e){let n;switch(e){case Nx:n="Linear";break;case Dx:n="Reinhard";break;case Ux:n="Cineon";break;case Ox:n="ACESFilmic";break;case kx:n="AgX";break;case zx:n="Neutral";break;case Fx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ga=new U;function NE(){tt.getLuminanceCoefficients(Ga);const t=Ga.x.toFixed(4),e=Ga.y.toFixed(4),n=Ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function DE(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(co).join(`
`)}function UE(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function OE(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function co(t){return t!==""}function Rg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FE=/^[ \t]*#include +<([\w\d./]+)>/gm;function qh(t){return t.replace(FE,zE)}const kE=new Map;function zE(t,e){let n=Ye[e];if(n===void 0){const i=kE.get(e);if(i!==void 0)n=Ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qh(n)}const BE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pg(t){return t.replace(BE,GE)}function GE(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Lg(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function VE(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===mv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===dx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function HE(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Us:case Os:e="ENVMAP_TYPE_CUBE";break;case sc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function WE(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Os:e="ENVMAP_MODE_REFRACTION";break}return e}function jE(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Av:e="ENVMAP_BLENDING_MULTIPLY";break;case Px:e="ENVMAP_BLENDING_MIX";break;case Lx:e="ENVMAP_BLENDING_ADD";break}return e}function XE(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function YE(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=VE(n),c=HE(n),h=WE(n),u=jE(n),f=XE(n),p=DE(n),v=UE(s),x=r.createProgram();let g,d,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(co).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(co).join(`
`),d.length>0&&(d+=`
`)):(g=[Lg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(co).join(`
`),d=[Lg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_i?"#define TONE_MAPPING":"",n.toneMapping!==_i?Ye.tonemapping_pars_fragment:"",n.toneMapping!==_i?LE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,PE("linearToOutputTexel",n.outputColorSpace),NE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(co).join(`
`)),o=qh(o),o=Rg(o,n),o=bg(o,n),a=qh(a),a=Rg(a,n),a=bg(a,n),o=Pg(o),a=Pg(a),n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===Zp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Zp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const m=A+g+o,C=A+d+a,T=wg(r,r.VERTEX_SHADER,m),S=wg(r,r.FRAGMENT_SHADER,C);r.attachShader(x,T),r.attachShader(x,S),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function I(y){if(t.debug.checkShaderErrors){const N=r.getProgramInfoLog(x).trim(),O=r.getShaderInfoLog(T).trim(),G=r.getShaderInfoLog(S).trim();let Q=!0,F=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,T,S);else{const Z=Tg(r,T,"vertex"),D=Tg(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+N+`
`+Z+`
`+D)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||G==="")&&(F=!1);F&&(y.diagnostics={runnable:Q,programLog:N,vertexShader:{log:O,prefix:g},fragmentShader:{log:G,prefix:d}})}r.deleteShader(T),r.deleteShader(S),R=new ul(r,x),B=OE(r,x)}let R;this.getUniforms=function(){return R===void 0&&I(this),R};let B;this.getAttributes=function(){return B===void 0&&I(this),B};let _=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(x,wE)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=TE++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=S,this}let ZE=0;class JE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new KE(e),n.set(e,i)),i}}class KE{constructor(e){this.id=ZE++,this.code=e,this.usedTimes=0}}function QE(t,e,n,i,r,s,o){const a=new Ov,l=new JE,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let v=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function d(_,y,N,O,G){const Q=O.fog,F=G.geometry,Z=_.isMeshStandardMaterial?O.environment:null,D=(_.isMeshStandardMaterial?n:e).get(_.envMap||Z),W=D&&D.mapping===sc?D.image.height:null,K=x[_.type];_.precision!==null&&(v=r.getMaxPrecision(_.precision),v!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",v,"instead."));const ne=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,le=ne!==void 0?ne.length:0;let _e=0;F.morphAttributes.position!==void 0&&(_e=1),F.morphAttributes.normal!==void 0&&(_e=2),F.morphAttributes.color!==void 0&&(_e=3);let V,te,oe,ae;if(K){const qe=qn[K];V=qe.vertexShader,te=qe.fragmentShader}else V=_.vertexShader,te=_.fragmentShader,l.update(_),oe=l.getVertexShaderID(_),ae=l.getFragmentShaderID(_);const Oe=t.getRenderTarget(),Ne=G.isInstancedMesh===!0,ke=G.isBatchedMesh===!0,je=!!_.map,ie=!!_.matcap,P=!!D,Ae=!!_.aoMap,pe=!!_.lightMap,he=!!_.bumpMap,ve=!!_.normalMap,Re=!!_.displacementMap,Me=!!_.emissiveMap,b=!!_.metalnessMap,M=!!_.roughnessMap,H=_.anisotropy>0,q=_.clearcoat>0,se=_.dispersion>0,$=_.iridescence>0,be=_.sheen>0,Ce=_.transmission>0,Ee=H&&!!_.anisotropyMap,Ke=q&&!!_.clearcoatMap,fe=q&&!!_.clearcoatNormalMap,Ie=q&&!!_.clearcoatRoughnessMap,Ge=$&&!!_.iridescenceMap,ze=$&&!!_.iridescenceThicknessMap,Te=be&&!!_.sheenColorMap,Qe=be&&!!_.sheenRoughnessMap,Xe=!!_.specularMap,J=!!_.specularColorMap,L=!!_.specularIntensityMap,re=Ce&&!!_.transmissionMap,j=Ce&&!!_.thicknessMap,ee=!!_.gradientMap,ge=!!_.alphaMap,xe=_.alphaTest>0,Be=!!_.alphaHash,$e=!!_.extensions;let _t=_i;_.toneMapped&&(Oe===null||Oe.isXRRenderTarget===!0)&&(_t=t.toneMapping);const Fe={shaderID:K,shaderType:_.type,shaderName:_.name,vertexShader:V,fragmentShader:te,defines:_.defines,customVertexShaderID:oe,customFragmentShaderID:ae,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:v,batching:ke,batchingColor:ke&&G._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&G.instanceColor!==null,instancingMorph:Ne&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Oe===null?t.outputColorSpace:Oe.isXRRenderTarget===!0?Oe.texture.colorSpace:Zn,alphaToCoverage:!!_.alphaToCoverage,map:je,matcap:ie,envMap:P,envMapMode:P&&D.mapping,envMapCubeUVHeight:W,aoMap:Ae,lightMap:pe,bumpMap:he,normalMap:ve,displacementMap:p&&Re,emissiveMap:Me,normalMapObjectSpace:ve&&_.normalMapType===Hx,normalMapTangentSpace:ve&&_.normalMapType===Rv,metalnessMap:b,roughnessMap:M,anisotropy:H,anisotropyMap:Ee,clearcoat:q,clearcoatMap:Ke,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ie,dispersion:se,iridescence:$,iridescenceMap:Ge,iridescenceThicknessMap:ze,sheen:be,sheenColorMap:Te,sheenRoughnessMap:Qe,specularMap:Xe,specularColorMap:J,specularIntensityMap:L,transmission:Ce,transmissionMap:re,thicknessMap:j,gradientMap:ee,opaque:_.transparent===!1&&_.blending===Is&&_.alphaToCoverage===!1,alphaMap:ge,alphaTest:xe,alphaHash:Be,combine:_.combine,mapUv:je&&g(_.map.channel),aoMapUv:Ae&&g(_.aoMap.channel),lightMapUv:pe&&g(_.lightMap.channel),bumpMapUv:he&&g(_.bumpMap.channel),normalMapUv:ve&&g(_.normalMap.channel),displacementMapUv:Re&&g(_.displacementMap.channel),emissiveMapUv:Me&&g(_.emissiveMap.channel),metalnessMapUv:b&&g(_.metalnessMap.channel),roughnessMapUv:M&&g(_.roughnessMap.channel),anisotropyMapUv:Ee&&g(_.anisotropyMap.channel),clearcoatMapUv:Ke&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Qe&&g(_.sheenRoughnessMap.channel),specularMapUv:Xe&&g(_.specularMap.channel),specularColorMapUv:J&&g(_.specularColorMap.channel),specularIntensityMapUv:L&&g(_.specularIntensityMap.channel),transmissionMapUv:re&&g(_.transmissionMap.channel),thicknessMapUv:j&&g(_.thicknessMap.channel),alphaMapUv:ge&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ve||H),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!F.attributes.uv&&(je||ge),fog:!!Q,useFog:_.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:G.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:_e,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:_t,decodeVideoTexture:je&&_.map.isVideoTexture===!0&&tt.getTransfer(_.map.colorSpace)===ht,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===mn,flipSided:_.side===Zt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:$e&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&_.extensions.multiDraw===!0||ke)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function A(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)y.push(N),y.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(m(y,_),C(y,_),y.push(t.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function m(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function C(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),_.push(a.mask)}function T(_){const y=x[_.type];let N;if(y){const O=qn[y];N=Dy.clone(O.uniforms)}else N=_.uniforms;return N}function S(_,y){let N;for(let O=0,G=h.length;O<G;O++){const Q=h[O];if(Q.cacheKey===y){N=Q,++N.usedTimes;break}}return N===void 0&&(N=new YE(t,y,_,s),h.push(N)),N}function I(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function R(_){l.remove(_)}function B(){l.dispose()}return{getParameters:d,getProgramCacheKey:A,getUniforms:T,acquireProgram:S,releaseProgram:I,releaseShaderCache:R,programs:h,dispose:B}}function qE(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function $E(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Ng(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Dg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(u,f,p,v,x,g){let d=t[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:v,renderOrder:u.renderOrder,z:x,group:g},t[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=v,d.renderOrder=u.renderOrder,d.z=x,d.group=g),e++,d}function a(u,f,p,v,x,g){const d=o(u,f,p,v,x,g);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(u,f,p,v,x,g){const d=o(u,f,p,v,x,g);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(u,f){n.length>1&&n.sort(u||$E),i.length>1&&i.sort(f||Ng),r.length>1&&r.sort(f||Ng)}function h(){for(let u=e,f=t.length;u<f;u++){const p=t[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function ew(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Dg,t.set(i,[o])):r>=s.length?(o=new Dg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function tw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new U,color:new Ze};break;case"SpotLight":n={position:new U,direction:new U,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":n={color:new Ze,position:new U,halfWidth:new U,halfHeight:new U};break}return t[e.id]=n,n}}}function nw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let iw=0;function rw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function sw(t){const e=new tw,n=nw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const r=new U,s=new at,o=new at;function a(c){let h=0,u=0,f=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let p=0,v=0,x=0,g=0,d=0,A=0,m=0,C=0,T=0,S=0,I=0;c.sort(rw);for(let B=0,_=c.length;B<_;B++){const y=c[B],N=y.color,O=y.intensity,G=y.distance,Q=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=N.r*O,u+=N.g*O,f+=N.b*O;else if(y.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(y.sh.coefficients[F],O);I++}else if(y.isDirectionalLight){const F=e.get(y);if(F.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const Z=y.shadow,D=n.get(y);D.shadowIntensity=Z.intensity,D.shadowBias=Z.bias,D.shadowNormalBias=Z.normalBias,D.shadowRadius=Z.radius,D.shadowMapSize=Z.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=y.shadow.matrix,A++}i.directional[p]=F,p++}else if(y.isSpotLight){const F=e.get(y);F.position.setFromMatrixPosition(y.matrixWorld),F.color.copy(N).multiplyScalar(O),F.distance=G,F.coneCos=Math.cos(y.angle),F.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),F.decay=y.decay,i.spot[x]=F;const Z=y.shadow;if(y.map&&(i.spotLightMap[T]=y.map,T++,Z.updateMatrices(y),y.castShadow&&S++),i.spotLightMatrix[x]=Z.matrix,y.castShadow){const D=n.get(y);D.shadowIntensity=Z.intensity,D.shadowBias=Z.bias,D.shadowNormalBias=Z.normalBias,D.shadowRadius=Z.radius,D.shadowMapSize=Z.mapSize,i.spotShadow[x]=D,i.spotShadowMap[x]=Q,C++}x++}else if(y.isRectAreaLight){const F=e.get(y);F.color.copy(N).multiplyScalar(O),F.halfWidth.set(y.width*.5,0,0),F.halfHeight.set(0,y.height*.5,0),i.rectArea[g]=F,g++}else if(y.isPointLight){const F=e.get(y);if(F.color.copy(y.color).multiplyScalar(y.intensity),F.distance=y.distance,F.decay=y.decay,y.castShadow){const Z=y.shadow,D=n.get(y);D.shadowIntensity=Z.intensity,D.shadowBias=Z.bias,D.shadowNormalBias=Z.normalBias,D.shadowRadius=Z.radius,D.shadowMapSize=Z.mapSize,D.shadowCameraNear=Z.camera.near,D.shadowCameraFar=Z.camera.far,i.pointShadow[v]=D,i.pointShadowMap[v]=Q,i.pointShadowMatrix[v]=y.shadow.matrix,m++}i.point[v]=F,v++}else if(y.isHemisphereLight){const F=e.get(y);F.skyColor.copy(y.color).multiplyScalar(O),F.groundColor.copy(y.groundColor).multiplyScalar(O),i.hemi[d]=F,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==p||R.pointLength!==v||R.spotLength!==x||R.rectAreaLength!==g||R.hemiLength!==d||R.numDirectionalShadows!==A||R.numPointShadows!==m||R.numSpotShadows!==C||R.numSpotMaps!==T||R.numLightProbes!==I)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=m,i.pointShadowMap.length=m,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=m,i.spotLightMatrix.length=C+T-S,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=I,R.directionalLength=p,R.pointLength=v,R.spotLength=x,R.rectAreaLength=g,R.hemiLength=d,R.numDirectionalShadows=A,R.numPointShadows=m,R.numSpotShadows=C,R.numSpotMaps=T,R.numLightProbes=I,i.version=iw++)}function l(c,h){let u=0,f=0,p=0,v=0,x=0;const g=h.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){const m=c[d];if(m.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),u++}else if(m.isSpotLight){const C=i.spot[p];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),C.direction.setFromMatrixPosition(m.matrixWorld),r.setFromMatrixPosition(m.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),p++}else if(m.isRectAreaLight){const C=i.rectArea[v];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),o.identity(),s.copy(m.matrixWorld),s.premultiply(g),o.extractRotation(s),C.halfWidth.set(m.width*.5,0,0),C.halfHeight.set(0,m.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),v++}else if(m.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(m.matrixWorld),C.position.applyMatrix4(g),f++}else if(m.isHemisphereLight){const C=i.hemi[x];C.direction.setFromMatrixPosition(m.matrixWorld),C.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function Ug(t){const e=new sw(t),n=[],i=[];function r(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function o(h){i.push(h)}function a(){e.setup(n)}function l(h){e.setupView(n,h)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ow(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Ug(t),e.set(r,[a])):s>=o.length?(a=new Ug(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class aw extends ea{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lw extends ea{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const cw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uw=`uniform sampler2D shadow_pass;
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
}`;function hw(t,e,n){let i=new cf;const r=new de,s=new de,o=new yt,a=new aw({depthPacking:Vx}),l=new lw,c={},h=n.maxTextureSize,u={[Mi]:Zt,[Zt]:Mi,[mn]:mn},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:cw,fragmentShader:uw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new yn;v.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Bt(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mv;let d=this.type;this.render=function(S,I,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const B=t.getRenderTarget(),_=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),N=t.state;N.setBlending(tr),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=d!==ui&&this.type===ui,G=d===ui&&this.type!==ui;for(let Q=0,F=S.length;Q<F;Q++){const Z=S[Q],D=Z.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const W=D.getFrameExtents();if(r.multiply(W),s.copy(D.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/W.x),r.x=s.x*W.x,D.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/W.y),r.y=s.y*W.y,D.mapSize.y=s.y)),D.map===null||O===!0||G===!0){const ne=this.type!==ui?{minFilter:Rn,magFilter:Rn}:{};D.map!==null&&D.map.dispose(),D.map=new Pr(r.x,r.y,ne),D.map.texture.name=Z.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const K=D.getViewportCount();for(let ne=0;ne<K;ne++){const le=D.getViewport(ne);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),N.viewport(o),D.updateMatrices(Z,ne),i=D.getFrustum(),C(I,R,D.camera,Z,this.type)}D.isPointLightShadow!==!0&&this.type===ui&&A(D,R),D.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(B,_,y)};function A(S,I){const R=e.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Pr(r.x,r.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,t.setRenderTarget(S.mapPass),t.clear(),t.renderBufferDirect(I,null,R,f,x,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,t.setRenderTarget(S.map),t.clear(),t.renderBufferDirect(I,null,R,p,x,null)}function m(S,I,R,B){let _=null;const y=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(y!==void 0)_=y;else if(_=R.isPointLight===!0?l:a,t.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const N=_.uuid,O=I.uuid;let G=c[N];G===void 0&&(G={},c[N]=G);let Q=G[O];Q===void 0&&(Q=_.clone(),G[O]=Q,I.addEventListener("dispose",T)),_=Q}if(_.visible=I.visible,_.wireframe=I.wireframe,B===ui?_.side=I.shadowSide!==null?I.shadowSide:I.side:_.side=I.shadowSide!==null?I.shadowSide:u[I.side],_.alphaMap=I.alphaMap,_.alphaTest=I.alphaTest,_.map=I.map,_.clipShadows=I.clipShadows,_.clippingPlanes=I.clippingPlanes,_.clipIntersection=I.clipIntersection,_.displacementMap=I.displacementMap,_.displacementScale=I.displacementScale,_.displacementBias=I.displacementBias,_.wireframeLinewidth=I.wireframeLinewidth,_.linewidth=I.linewidth,R.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const N=t.properties.get(_);N.light=R}return _}function C(S,I,R,B,_){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&_===ui)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const O=e.update(S),G=S.material;if(Array.isArray(G)){const Q=O.groups;for(let F=0,Z=Q.length;F<Z;F++){const D=Q[F],W=G[D.materialIndex];if(W&&W.visible){const K=m(S,W,B,_);S.onBeforeShadow(t,S,I,R,O,K,D),t.renderBufferDirect(R,null,O,K,S,D),S.onAfterShadow(t,S,I,R,O,K,D)}}}else if(G.visible){const Q=m(S,G,B,_);S.onBeforeShadow(t,S,I,R,O,Q,null),t.renderBufferDirect(R,null,O,Q,S,null),S.onAfterShadow(t,S,I,R,O,Q,null)}}const N=S.children;for(let O=0,G=N.length;O<G;O++)C(N[O],I,R,B,_)}function T(S){S.target.removeEventListener("dispose",T);for(const R in c){const B=c[R],_=S.target.uuid;_ in B&&(B[_].dispose(),delete B[_])}}}const dw={[Ah]:vh,[_h]:yh,[Ch]:Ih,[Ds]:xh,[vh]:Ah,[yh]:_h,[Ih]:Ch,[xh]:Ds};function fw(t){function e(){let L=!1;const re=new yt;let j=null;const ee=new yt(0,0,0,0);return{setMask:function(ge){j!==ge&&!L&&(t.colorMask(ge,ge,ge,ge),j=ge)},setLocked:function(ge){L=ge},setClear:function(ge,xe,Be,$e,_t){_t===!0&&(ge*=$e,xe*=$e,Be*=$e),re.set(ge,xe,Be,$e),ee.equals(re)===!1&&(t.clearColor(ge,xe,Be,$e),ee.copy(re))},reset:function(){L=!1,j=null,ee.set(-1,0,0,0)}}}function n(){let L=!1,re=!1,j=null,ee=null,ge=null;return{setReversed:function(xe){re=xe},setTest:function(xe){xe?oe(t.DEPTH_TEST):ae(t.DEPTH_TEST)},setMask:function(xe){j!==xe&&!L&&(t.depthMask(xe),j=xe)},setFunc:function(xe){if(re&&(xe=dw[xe]),ee!==xe){switch(xe){case Ah:t.depthFunc(t.NEVER);break;case vh:t.depthFunc(t.ALWAYS);break;case _h:t.depthFunc(t.LESS);break;case Ds:t.depthFunc(t.LEQUAL);break;case Ch:t.depthFunc(t.EQUAL);break;case xh:t.depthFunc(t.GEQUAL);break;case yh:t.depthFunc(t.GREATER);break;case Ih:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ee=xe}},setLocked:function(xe){L=xe},setClear:function(xe){ge!==xe&&(t.clearDepth(xe),ge=xe)},reset:function(){L=!1,j=null,ee=null,ge=null}}}function i(){let L=!1,re=null,j=null,ee=null,ge=null,xe=null,Be=null,$e=null,_t=null;return{setTest:function(Fe){L||(Fe?oe(t.STENCIL_TEST):ae(t.STENCIL_TEST))},setMask:function(Fe){re!==Fe&&!L&&(t.stencilMask(Fe),re=Fe)},setFunc:function(Fe,qe,Ft){(j!==Fe||ee!==qe||ge!==Ft)&&(t.stencilFunc(Fe,qe,Ft),j=Fe,ee=qe,ge=Ft)},setOp:function(Fe,qe,Ft){(xe!==Fe||Be!==qe||$e!==Ft)&&(t.stencilOp(Fe,qe,Ft),xe=Fe,Be=qe,$e=Ft)},setLocked:function(Fe){L=Fe},setClear:function(Fe){_t!==Fe&&(t.clearStencil(Fe),_t=Fe)},reset:function(){L=!1,re=null,j=null,ee=null,ge=null,xe=null,Be=null,$e=null,_t=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],p=null,v=!1,x=null,g=null,d=null,A=null,m=null,C=null,T=null,S=new Ze(0,0,0),I=0,R=!1,B=null,_=null,y=null,N=null,O=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,F=0;const Z=t.getParameter(t.VERSION);Z.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Q=F>=1):Z.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Q=F>=2);let D=null,W={};const K=t.getParameter(t.SCISSOR_BOX),ne=t.getParameter(t.VIEWPORT),le=new yt().fromArray(K),_e=new yt().fromArray(ne);function V(L,re,j,ee){const ge=new Uint8Array(4),xe=t.createTexture();t.bindTexture(L,xe),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Be=0;Be<j;Be++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(re,0,t.RGBA,1,1,ee,0,t.RGBA,t.UNSIGNED_BYTE,ge):t.texImage2D(re+Be,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ge);return xe}const te={};te[t.TEXTURE_2D]=V(t.TEXTURE_2D,t.TEXTURE_2D,1),te[t.TEXTURE_CUBE_MAP]=V(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[t.TEXTURE_2D_ARRAY]=V(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),te[t.TEXTURE_3D]=V(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),oe(t.DEPTH_TEST),s.setFunc(Ds),pe(!1),he(Vp),oe(t.CULL_FACE),P(tr);function oe(L){c[L]!==!0&&(t.enable(L),c[L]=!0)}function ae(L){c[L]!==!1&&(t.disable(L),c[L]=!1)}function Oe(L,re){return h[L]!==re?(t.bindFramebuffer(L,re),h[L]=re,L===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=re),L===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=re),!0):!1}function Ne(L,re){let j=f,ee=!1;if(L){j=u.get(re),j===void 0&&(j=[],u.set(re,j));const ge=L.textures;if(j.length!==ge.length||j[0]!==t.COLOR_ATTACHMENT0){for(let xe=0,Be=ge.length;xe<Be;xe++)j[xe]=t.COLOR_ATTACHMENT0+xe;j.length=ge.length,ee=!0}}else j[0]!==t.BACK&&(j[0]=t.BACK,ee=!0);ee&&t.drawBuffers(j)}function ke(L){return p!==L?(t.useProgram(L),p=L,!0):!1}const je={[Ar]:t.FUNC_ADD,[px]:t.FUNC_SUBTRACT,[gx]:t.FUNC_REVERSE_SUBTRACT};je[mx]=t.MIN,je[Ax]=t.MAX;const ie={[vx]:t.ZERO,[_x]:t.ONE,[Cx]:t.SRC_COLOR,[gh]:t.SRC_ALPHA,[Ex]:t.SRC_ALPHA_SATURATE,[Mx]:t.DST_COLOR,[yx]:t.DST_ALPHA,[xx]:t.ONE_MINUS_SRC_COLOR,[mh]:t.ONE_MINUS_SRC_ALPHA,[Sx]:t.ONE_MINUS_DST_COLOR,[Ix]:t.ONE_MINUS_DST_ALPHA,[wx]:t.CONSTANT_COLOR,[Tx]:t.ONE_MINUS_CONSTANT_COLOR,[Rx]:t.CONSTANT_ALPHA,[bx]:t.ONE_MINUS_CONSTANT_ALPHA};function P(L,re,j,ee,ge,xe,Be,$e,_t,Fe){if(L===tr){v===!0&&(ae(t.BLEND),v=!1);return}if(v===!1&&(oe(t.BLEND),v=!0),L!==fx){if(L!==x||Fe!==R){if((g!==Ar||m!==Ar)&&(t.blendEquation(t.FUNC_ADD),g=Ar,m=Ar),Fe)switch(L){case Is:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Hp:t.blendFunc(t.ONE,t.ONE);break;case Wp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case jp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Is:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Hp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Wp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case jp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}d=null,A=null,C=null,T=null,S.set(0,0,0),I=0,x=L,R=Fe}return}ge=ge||re,xe=xe||j,Be=Be||ee,(re!==g||ge!==m)&&(t.blendEquationSeparate(je[re],je[ge]),g=re,m=ge),(j!==d||ee!==A||xe!==C||Be!==T)&&(t.blendFuncSeparate(ie[j],ie[ee],ie[xe],ie[Be]),d=j,A=ee,C=xe,T=Be),($e.equals(S)===!1||_t!==I)&&(t.blendColor($e.r,$e.g,$e.b,_t),S.copy($e),I=_t),x=L,R=!1}function Ae(L,re){L.side===mn?ae(t.CULL_FACE):oe(t.CULL_FACE);let j=L.side===Zt;re&&(j=!j),pe(j),L.blending===Is&&L.transparent===!1?P(tr):P(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);const ee=L.stencilWrite;o.setTest(ee),ee&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Re(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?oe(t.SAMPLE_ALPHA_TO_COVERAGE):ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function pe(L){B!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),B=L)}function he(L){L!==ux?(oe(t.CULL_FACE),L!==_&&(L===Vp?t.cullFace(t.BACK):L===hx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ae(t.CULL_FACE),_=L}function ve(L){L!==y&&(Q&&t.lineWidth(L),y=L)}function Re(L,re,j){L?(oe(t.POLYGON_OFFSET_FILL),(N!==re||O!==j)&&(t.polygonOffset(re,j),N=re,O=j)):ae(t.POLYGON_OFFSET_FILL)}function Me(L){L?oe(t.SCISSOR_TEST):ae(t.SCISSOR_TEST)}function b(L){L===void 0&&(L=t.TEXTURE0+G-1),D!==L&&(t.activeTexture(L),D=L)}function M(L,re,j){j===void 0&&(D===null?j=t.TEXTURE0+G-1:j=D);let ee=W[j];ee===void 0&&(ee={type:void 0,texture:void 0},W[j]=ee),(ee.type!==L||ee.texture!==re)&&(D!==j&&(t.activeTexture(j),D=j),t.bindTexture(L,re||te[L]),ee.type=L,ee.texture=re)}function H(){const L=W[D];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{t.compressedTexImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function se(){try{t.compressedTexImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{t.texSubImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{t.texSubImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{t.texStorage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{t.texStorage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(){try{t.texImage2D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ge(){try{t.texImage3D.apply(t,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(L){le.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),le.copy(L))}function Te(L){_e.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function Qe(L,re){let j=l.get(re);j===void 0&&(j=new WeakMap,l.set(re,j));let ee=j.get(L);ee===void 0&&(ee=t.getUniformBlockIndex(re,L.name),j.set(L,ee))}function Xe(L,re){const ee=l.get(re).get(L);a.get(re)!==ee&&(t.uniformBlockBinding(re,ee,L.__bindingPointIndex),a.set(re,ee))}function J(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},D=null,W={},h={},u=new WeakMap,f=[],p=null,v=!1,x=null,g=null,d=null,A=null,m=null,C=null,T=null,S=new Ze(0,0,0),I=0,R=!1,B=null,_=null,y=null,N=null,O=null,le.set(0,0,t.canvas.width,t.canvas.height),_e.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:oe,disable:ae,bindFramebuffer:Oe,drawBuffers:Ne,useProgram:ke,setBlending:P,setMaterial:Ae,setFlipSided:pe,setCullFace:he,setLineWidth:ve,setPolygonOffset:Re,setScissorTest:Me,activeTexture:b,bindTexture:M,unbindTexture:H,compressedTexImage2D:q,compressedTexImage3D:se,texImage2D:Ie,texImage3D:Ge,updateUBOMapping:Qe,uniformBlockBinding:Xe,texStorage2D:Ke,texStorage3D:fe,texSubImage2D:$,texSubImage3D:be,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Ee,scissor:ze,viewport:Te,reset:J}}function Og(t,e,n,i){const r=pw(i);switch(n){case yv:return t*e;case Mv:return t*e;case Sv:return t*e*2;case Ev:return t*e/r.components*r.byteLength;case nf:return t*e/r.components*r.byteLength;case wv:return t*e*2/r.components*r.byteLength;case rf:return t*e*2/r.components*r.byteLength;case Iv:return t*e*3/r.components*r.byteLength;case Wn:return t*e*4/r.components*r.byteLength;case sf:return t*e*4/r.components*r.byteLength;case rl:case sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ol:case al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case wh:case Rh:return Math.max(t,16)*Math.max(e,8)/4;case Eh:case Th:return Math.max(t,8)*Math.max(e,8)/2;case bh:case Ph:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Lh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Nh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Dh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Uh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Oh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Fh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case kh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case zh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Bh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Gh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Vh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Wh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case jh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Xh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ll:case Yh:case Zh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Tv:case Jh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Kh:case Qh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function pw(t){switch(t){case Si:case _v:return{byteLength:1,components:1};case Vo:case Cv:case $o:return{byteLength:2,components:1};case ef:case tf:return{byteLength:2,components:4};case br:case $d:case gi:return{byteLength:4,components:1};case xv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function gw(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,M){return p?new OffscreenCanvas(b,M):Wo("canvas")}function x(b,M,H){let q=1;const se=Me(b);if((se.width>H||se.height>H)&&(q=H/Math.max(se.width,se.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const $=Math.floor(q*se.width),be=Math.floor(q*se.height);u===void 0&&(u=v($,be));const Ce=M?v($,be):u;return Ce.width=$,Ce.height=be,Ce.getContext("2d").drawImage(b,0,0,$,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+$+"x"+be+")."),Ce}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function g(b){return b.generateMipmaps&&b.minFilter!==Rn&&b.minFilter!==Vn}function d(b){t.generateMipmap(b)}function A(b,M,H,q,se=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let $=M;if(M===t.RED&&(H===t.FLOAT&&($=t.R32F),H===t.HALF_FLOAT&&($=t.R16F),H===t.UNSIGNED_BYTE&&($=t.R8)),M===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&($=t.R8UI),H===t.UNSIGNED_SHORT&&($=t.R16UI),H===t.UNSIGNED_INT&&($=t.R32UI),H===t.BYTE&&($=t.R8I),H===t.SHORT&&($=t.R16I),H===t.INT&&($=t.R32I)),M===t.RG&&(H===t.FLOAT&&($=t.RG32F),H===t.HALF_FLOAT&&($=t.RG16F),H===t.UNSIGNED_BYTE&&($=t.RG8)),M===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&($=t.RG8UI),H===t.UNSIGNED_SHORT&&($=t.RG16UI),H===t.UNSIGNED_INT&&($=t.RG32UI),H===t.BYTE&&($=t.RG8I),H===t.SHORT&&($=t.RG16I),H===t.INT&&($=t.RG32I)),M===t.RGB_INTEGER&&(H===t.UNSIGNED_BYTE&&($=t.RGB8UI),H===t.UNSIGNED_SHORT&&($=t.RGB16UI),H===t.UNSIGNED_INT&&($=t.RGB32UI),H===t.BYTE&&($=t.RGB8I),H===t.SHORT&&($=t.RGB16I),H===t.INT&&($=t.RGB32I)),M===t.RGBA_INTEGER&&(H===t.UNSIGNED_BYTE&&($=t.RGBA8UI),H===t.UNSIGNED_SHORT&&($=t.RGBA16UI),H===t.UNSIGNED_INT&&($=t.RGBA32UI),H===t.BYTE&&($=t.RGBA8I),H===t.SHORT&&($=t.RGBA16I),H===t.INT&&($=t.RGBA32I)),M===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&($=t.RGB9_E5),M===t.RGBA){const be=se?Ol:tt.getTransfer(q);H===t.FLOAT&&($=t.RGBA32F),H===t.HALF_FLOAT&&($=t.RGBA16F),H===t.UNSIGNED_BYTE&&($=be===ht?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&($=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&($=t.RGB5_A1)}return($===t.R16F||$===t.R32F||$===t.RG16F||$===t.RG32F||$===t.RGBA16F||$===t.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function m(b,M){let H;return b?M===null||M===br||M===ks?H=t.DEPTH24_STENCIL8:M===gi?H=t.DEPTH32F_STENCIL8:M===Vo&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===br||M===ks?H=t.DEPTH_COMPONENT24:M===gi?H=t.DEPTH_COMPONENT32F:M===Vo&&(H=t.DEPTH_COMPONENT16),H}function C(b,M){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==Rn&&b.minFilter!==Vn?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function T(b){const M=b.target;M.removeEventListener("dispose",T),I(M),M.isVideoTexture&&h.delete(M)}function S(b){const M=b.target;M.removeEventListener("dispose",S),B(M)}function I(b){const M=i.get(b);if(M.__webglInit===void 0)return;const H=b.source,q=f.get(H);if(q){const se=q[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&R(b),Object.keys(q).length===0&&f.delete(H)}i.remove(b)}function R(b){const M=i.get(b);t.deleteTexture(M.__webglTexture);const H=b.source,q=f.get(H);delete q[M.__cacheKey],o.memory.textures--}function B(b){const M=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let se=0;se<M.__webglFramebuffer[q].length;se++)t.deleteFramebuffer(M.__webglFramebuffer[q][se]);else t.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)t.deleteFramebuffer(M.__webglFramebuffer[q]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=b.textures;for(let q=0,se=H.length;q<se;q++){const $=i.get(H[q]);$.__webglTexture&&(t.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(H[q])}i.remove(b)}let _=0;function y(){_=0}function N(){const b=_;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),_+=1,b}function O(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function G(b,M){const H=i.get(b);if(b.isVideoTexture&&ve(b),b.isRenderTargetTexture===!1&&b.version>0&&H.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_e(H,b,M);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+M)}function Q(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){_e(H,b,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+M)}function F(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){_e(H,b,M);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+M)}function Z(b,M){const H=i.get(b);if(b.version>0&&H.__version!==b.version){V(H,b,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+M)}const D={[Fs]:t.REPEAT,[ji]:t.CLAMP_TO_EDGE,[Ul]:t.MIRRORED_REPEAT},W={[Rn]:t.NEAREST,[Bx]:t.NEAREST_MIPMAP_NEAREST,[xa]:t.NEAREST_MIPMAP_LINEAR,[Vn]:t.LINEAR,[Vc]:t.LINEAR_MIPMAP_NEAREST,[yr]:t.LINEAR_MIPMAP_LINEAR},K={[Wx]:t.NEVER,[Kx]:t.ALWAYS,[jx]:t.LESS,[bv]:t.LEQUAL,[Xx]:t.EQUAL,[Jx]:t.GEQUAL,[Yx]:t.GREATER,[Zx]:t.NOTEQUAL};function ne(b,M){if(M.type===gi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Vn||M.magFilter===Vc||M.magFilter===xa||M.magFilter===yr||M.minFilter===Vn||M.minFilter===Vc||M.minFilter===xa||M.minFilter===yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,D[M.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,D[M.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,D[M.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,W[M.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,W[M.minFilter]),M.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,K[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Rn||M.minFilter!==xa&&M.minFilter!==yr||M.type===gi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function le(b,M){let H=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",T));const q=M.source;let se=f.get(q);se===void 0&&(se={},f.set(q,se));const $=O(M);if($!==b.__cacheKey){se[$]===void 0&&(se[$]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,H=!0),se[$].usedTimes++;const be=se[b.__cacheKey];be!==void 0&&(se[b.__cacheKey].usedTimes--,be.usedTimes===0&&R(M)),b.__cacheKey=$,b.__webglTexture=se[$].texture}return H}function _e(b,M,H){let q=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=t.TEXTURE_3D);const se=le(b,M),$=M.source;n.bindTexture(q,b.__webglTexture,t.TEXTURE0+H);const be=i.get($);if($.version!==be.__version||se===!0){n.activeTexture(t.TEXTURE0+H);const Ce=tt.getPrimaries(tt.workingColorSpace),Ee=M.colorSpace===Vi?null:tt.getPrimaries(M.colorSpace),Ke=M.colorSpace===Vi||Ce===Ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let fe=x(M.image,!1,r.maxTextureSize);fe=Re(M,fe);const Ie=s.convert(M.format,M.colorSpace),Ge=s.convert(M.type);let ze=A(M.internalFormat,Ie,Ge,M.colorSpace,M.isVideoTexture);ne(q,M);let Te;const Qe=M.mipmaps,Xe=M.isVideoTexture!==!0,J=be.__version===void 0||se===!0,L=$.dataReady,re=C(M,fe);if(M.isDepthTexture)ze=m(M.format===zs,M.type),J&&(Xe?n.texStorage2D(t.TEXTURE_2D,1,ze,fe.width,fe.height):n.texImage2D(t.TEXTURE_2D,0,ze,fe.width,fe.height,0,Ie,Ge,null));else if(M.isDataTexture)if(Qe.length>0){Xe&&J&&n.texStorage2D(t.TEXTURE_2D,re,ze,Qe[0].width,Qe[0].height);for(let j=0,ee=Qe.length;j<ee;j++)Te=Qe[j],Xe?L&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,Te.width,Te.height,Ie,Ge,Te.data):n.texImage2D(t.TEXTURE_2D,j,ze,Te.width,Te.height,0,Ie,Ge,Te.data);M.generateMipmaps=!1}else Xe?(J&&n.texStorage2D(t.TEXTURE_2D,re,ze,fe.width,fe.height),L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,fe.width,fe.height,Ie,Ge,fe.data)):n.texImage2D(t.TEXTURE_2D,0,ze,fe.width,fe.height,0,Ie,Ge,fe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Xe&&J&&n.texStorage3D(t.TEXTURE_2D_ARRAY,re,ze,Qe[0].width,Qe[0].height,fe.depth);for(let j=0,ee=Qe.length;j<ee;j++)if(Te=Qe[j],M.format!==Wn)if(Ie!==null)if(Xe){if(L)if(M.layerUpdates.size>0){const ge=Og(Te.width,Te.height,M.format,M.type);for(const xe of M.layerUpdates){const Be=Te.data.subarray(xe*ge/Te.data.BYTES_PER_ELEMENT,(xe+1)*ge/Te.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,xe,Te.width,Te.height,1,Ie,Be,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,Te.width,Te.height,fe.depth,Ie,Te.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,j,ze,Te.width,Te.height,fe.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?L&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,Te.width,Te.height,fe.depth,Ie,Ge,Te.data):n.texImage3D(t.TEXTURE_2D_ARRAY,j,ze,Te.width,Te.height,fe.depth,0,Ie,Ge,Te.data)}else{Xe&&J&&n.texStorage2D(t.TEXTURE_2D,re,ze,Qe[0].width,Qe[0].height);for(let j=0,ee=Qe.length;j<ee;j++)Te=Qe[j],M.format!==Wn?Ie!==null?Xe?L&&n.compressedTexSubImage2D(t.TEXTURE_2D,j,0,0,Te.width,Te.height,Ie,Te.data):n.compressedTexImage2D(t.TEXTURE_2D,j,ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?L&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,Te.width,Te.height,Ie,Ge,Te.data):n.texImage2D(t.TEXTURE_2D,j,ze,Te.width,Te.height,0,Ie,Ge,Te.data)}else if(M.isDataArrayTexture)if(Xe){if(J&&n.texStorage3D(t.TEXTURE_2D_ARRAY,re,ze,fe.width,fe.height,fe.depth),L)if(M.layerUpdates.size>0){const j=Og(fe.width,fe.height,M.format,M.type);for(const ee of M.layerUpdates){const ge=fe.data.subarray(ee*j/fe.data.BYTES_PER_ELEMENT,(ee+1)*j/fe.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ee,fe.width,fe.height,1,Ie,Ge,ge)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ie,Ge,fe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,ze,fe.width,fe.height,fe.depth,0,Ie,Ge,fe.data);else if(M.isData3DTexture)Xe?(J&&n.texStorage3D(t.TEXTURE_3D,re,ze,fe.width,fe.height,fe.depth),L&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ie,Ge,fe.data)):n.texImage3D(t.TEXTURE_3D,0,ze,fe.width,fe.height,fe.depth,0,Ie,Ge,fe.data);else if(M.isFramebufferTexture){if(J)if(Xe)n.texStorage2D(t.TEXTURE_2D,re,ze,fe.width,fe.height);else{let j=fe.width,ee=fe.height;for(let ge=0;ge<re;ge++)n.texImage2D(t.TEXTURE_2D,ge,ze,j,ee,0,Ie,Ge,null),j>>=1,ee>>=1}}else if(Qe.length>0){if(Xe&&J){const j=Me(Qe[0]);n.texStorage2D(t.TEXTURE_2D,re,ze,j.width,j.height)}for(let j=0,ee=Qe.length;j<ee;j++)Te=Qe[j],Xe?L&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,Ie,Ge,Te):n.texImage2D(t.TEXTURE_2D,j,ze,Ie,Ge,Te);M.generateMipmaps=!1}else if(Xe){if(J){const j=Me(fe);n.texStorage2D(t.TEXTURE_2D,re,ze,j.width,j.height)}L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ie,Ge,fe)}else n.texImage2D(t.TEXTURE_2D,0,ze,Ie,Ge,fe);g(M)&&d(q),be.__version=$.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function V(b,M,H){if(M.image.length!==6)return;const q=le(b,M),se=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+H);const $=i.get(se);if(se.version!==$.__version||q===!0){n.activeTexture(t.TEXTURE0+H);const be=tt.getPrimaries(tt.workingColorSpace),Ce=M.colorSpace===Vi?null:tt.getPrimaries(M.colorSpace),Ee=M.colorSpace===Vi||be===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ke=M.isCompressedTexture||M.image[0].isCompressedTexture,fe=M.image[0]&&M.image[0].isDataTexture,Ie=[];for(let ee=0;ee<6;ee++)!Ke&&!fe?Ie[ee]=x(M.image[ee],!0,r.maxCubemapSize):Ie[ee]=fe?M.image[ee].image:M.image[ee],Ie[ee]=Re(M,Ie[ee]);const Ge=Ie[0],ze=s.convert(M.format,M.colorSpace),Te=s.convert(M.type),Qe=A(M.internalFormat,ze,Te,M.colorSpace),Xe=M.isVideoTexture!==!0,J=$.__version===void 0||q===!0,L=se.dataReady;let re=C(M,Ge);ne(t.TEXTURE_CUBE_MAP,M);let j;if(Ke){Xe&&J&&n.texStorage2D(t.TEXTURE_CUBE_MAP,re,Qe,Ge.width,Ge.height);for(let ee=0;ee<6;ee++){j=Ie[ee].mipmaps;for(let ge=0;ge<j.length;ge++){const xe=j[ge];M.format!==Wn?ze!==null?Xe?L&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge,0,0,xe.width,xe.height,ze,xe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge,Qe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge,0,0,xe.width,xe.height,ze,Te,xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge,Qe,xe.width,xe.height,0,ze,Te,xe.data)}}}else{if(j=M.mipmaps,Xe&&J){j.length>0&&re++;const ee=Me(Ie[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,re,Qe,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(fe){Xe?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ie[ee].width,Ie[ee].height,ze,Te,Ie[ee].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Qe,Ie[ee].width,Ie[ee].height,0,ze,Te,Ie[ee].data);for(let ge=0;ge<j.length;ge++){const Be=j[ge].image[ee].image;Xe?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge+1,0,0,Be.width,Be.height,ze,Te,Be.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge+1,Qe,Be.width,Be.height,0,ze,Te,Be.data)}}else{Xe?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ze,Te,Ie[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Qe,ze,Te,Ie[ee]);for(let ge=0;ge<j.length;ge++){const xe=j[ge];Xe?L&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge+1,0,0,ze,Te,xe.image[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ge+1,Qe,ze,Te,xe.image[ee])}}}g(M)&&d(t.TEXTURE_CUBE_MAP),$.__version=se.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function te(b,M,H,q,se,$){const be=s.convert(H.format,H.colorSpace),Ce=s.convert(H.type),Ee=A(H.internalFormat,be,Ce,H.colorSpace);if(!i.get(M).__hasExternalTextures){const fe=Math.max(1,M.width>>$),Ie=Math.max(1,M.height>>$);se===t.TEXTURE_3D||se===t.TEXTURE_2D_ARRAY?n.texImage3D(se,$,Ee,fe,Ie,M.depth,0,be,Ce,null):n.texImage2D(se,$,Ee,fe,Ie,0,be,Ce,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),he(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,se,i.get(H).__webglTexture,0,pe(M)):(se===t.TEXTURE_2D||se>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,q,se,i.get(H).__webglTexture,$),n.bindFramebuffer(t.FRAMEBUFFER,null)}function oe(b,M,H){if(t.bindRenderbuffer(t.RENDERBUFFER,b),M.depthBuffer){const q=M.depthTexture,se=q&&q.isDepthTexture?q.type:null,$=m(M.stencilBuffer,se),be=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ce=pe(M);he(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ce,$,M.width,M.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ce,$,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,$,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,be,t.RENDERBUFFER,b)}else{const q=M.textures;for(let se=0;se<q.length;se++){const $=q[se],be=s.convert($.format,$.colorSpace),Ce=s.convert($.type),Ee=A($.internalFormat,be,Ce,$.colorSpace),Ke=pe(M);H&&he(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ke,Ee,M.width,M.height):he(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ke,Ee,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Ee,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ae(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),G(M.depthTexture,0);const q=i.get(M.depthTexture).__webglTexture,se=pe(M);if(M.depthTexture.format===Ms)he(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0);else if(M.depthTexture.format===zs)he(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function Oe(b){const M=i.get(b),H=b.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",se)};q.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=q}if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ae(M.__webglFramebuffer,b)}else if(H){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=t.createRenderbuffer(),oe(M.__webglDepthbuffer[q],b,!1);else{const se=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[q];t.bindRenderbuffer(t.RENDERBUFFER,$),t.framebufferRenderbuffer(t.FRAMEBUFFER,se,t.RENDERBUFFER,$)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),oe(M.__webglDepthbuffer,b,!1);else{const q=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,se),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,se)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ne(b,M,H){const q=i.get(b);M!==void 0&&te(q.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Oe(b)}function ke(b){const M=b.texture,H=i.get(b),q=i.get(M);b.addEventListener("dispose",S);const se=b.textures,$=b.isWebGLCubeRenderTarget===!0,be=se.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=t.createTexture()),q.__version=M.version,o.memory.textures++),$){H.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[Ce]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)H.__webglFramebuffer[Ce][Ee]=t.createFramebuffer()}else H.__webglFramebuffer[Ce]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let Ce=0;Ce<M.mipmaps.length;Ce++)H.__webglFramebuffer[Ce]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(be)for(let Ce=0,Ee=se.length;Ce<Ee;Ce++){const Ke=i.get(se[Ce]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=t.createTexture(),o.memory.textures++)}if(b.samples>0&&he(b)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Ce=0;Ce<se.length;Ce++){const Ee=se[Ce];H.__webglColorRenderbuffer[Ce]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[Ce]);const Ke=s.convert(Ee.format,Ee.colorSpace),fe=s.convert(Ee.type),Ie=A(Ee.internalFormat,Ke,fe,Ee.colorSpace,b.isXRRenderTarget===!0),Ge=pe(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge,Ie,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,H.__webglColorRenderbuffer[Ce])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),oe(H.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if($){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),ne(t.TEXTURE_CUBE_MAP,M);for(let Ce=0;Ce<6;Ce++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)te(H.__webglFramebuffer[Ce][Ee],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,Ee);else te(H.__webglFramebuffer[Ce],b,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);g(M)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(be){for(let Ce=0,Ee=se.length;Ce<Ee;Ce++){const Ke=se[Ce],fe=i.get(Ke);n.bindTexture(t.TEXTURE_2D,fe.__webglTexture),ne(t.TEXTURE_2D,Ke),te(H.__webglFramebuffer,b,Ke,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,0),g(Ke)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let Ce=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ce=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Ce,q.__webglTexture),ne(Ce,M),M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)te(H.__webglFramebuffer[Ee],b,M,t.COLOR_ATTACHMENT0,Ce,Ee);else te(H.__webglFramebuffer,b,M,t.COLOR_ATTACHMENT0,Ce,0);g(M)&&d(Ce),n.unbindTexture()}b.depthBuffer&&Oe(b)}function je(b){const M=b.textures;for(let H=0,q=M.length;H<q;H++){const se=M[H];if(g(se)){const $=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,be=i.get(se).__webglTexture;n.bindTexture($,be),d($),n.unbindTexture()}}}const ie=[],P=[];function Ae(b){if(b.samples>0){if(he(b)===!1){const M=b.textures,H=b.width,q=b.height;let se=t.COLOR_BUFFER_BIT;const $=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,be=i.get(b),Ce=M.length>1;if(Ce)for(let Ee=0;Ee<M.length;Ee++)n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ee,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ee,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ee=0;Ee<M.length;Ee++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=t.STENCIL_BUFFER_BIT)),Ce){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const Ke=i.get(M[Ee]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ke,0)}t.blitFramebuffer(0,0,H,q,0,0,H,q,se,t.NEAREST),l===!0&&(ie.length=0,P.length=0,ie.push(t.COLOR_ATTACHMENT0+Ee),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ie.push($),P.push($),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,P)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ie))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Ce)for(let Ee=0;Ee<M.length;Ee++){n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ee,t.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const Ke=i.get(M[Ee]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ee,t.TEXTURE_2D,Ke,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const M=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function pe(b){return Math.min(r.maxSamples,b.samples)}function he(b){const M=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ve(b){const M=o.render.frame;h.get(b)!==M&&(h.set(b,M),b.update())}function Re(b,M){const H=b.colorSpace,q=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||H!==Zn&&H!==Vi&&(tt.getTransfer(H)===ht?(q!==Wn||se!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function Me(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=Q,this.setTexture3D=F,this.setTextureCube=Z,this.rebindTextures=Ne,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=te,this.useMultisampledRTT=he}function mw(t,e){function n(i,r=Vi){let s;const o=tt.getTransfer(r);if(i===Si)return t.UNSIGNED_BYTE;if(i===ef)return t.UNSIGNED_SHORT_4_4_4_4;if(i===tf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===xv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_v)return t.BYTE;if(i===Cv)return t.SHORT;if(i===Vo)return t.UNSIGNED_SHORT;if(i===$d)return t.INT;if(i===br)return t.UNSIGNED_INT;if(i===gi)return t.FLOAT;if(i===$o)return t.HALF_FLOAT;if(i===yv)return t.ALPHA;if(i===Iv)return t.RGB;if(i===Wn)return t.RGBA;if(i===Mv)return t.LUMINANCE;if(i===Sv)return t.LUMINANCE_ALPHA;if(i===Ms)return t.DEPTH_COMPONENT;if(i===zs)return t.DEPTH_STENCIL;if(i===Ev)return t.RED;if(i===nf)return t.RED_INTEGER;if(i===wv)return t.RG;if(i===rf)return t.RG_INTEGER;if(i===sf)return t.RGBA_INTEGER;if(i===rl||i===sl||i===ol||i===al)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===rl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===rl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Eh||i===wh||i===Th||i===Rh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Eh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Th)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bh||i===Ph||i===Lh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===bh||i===Ph)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Lh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Nh||i===Dh||i===Uh||i===Oh||i===Fh||i===kh||i===zh||i===Bh||i===Gh||i===Vh||i===Hh||i===Wh||i===jh||i===Xh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Nh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Uh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===jh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===Yh||i===Zh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ll)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Zh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tv||i===Jh||i===Kh||i===Qh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ll)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Jh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ks?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class Aw extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ai extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vw={type:"move"};class mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),d=this._getHandJoint(c,x);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const _w=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cw=`
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

}`;class xw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new tn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ei({vertexShader:_w,fragmentShader:Cw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Bt(new ac(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yw extends Or{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,v=null;const x=new xw,g=n.getContextAttributes();let d=null,A=null;const m=[],C=[],T=new de;let S=null;const I=new wn;I.layers.enable(1),I.viewport=new yt;const R=new wn;R.layers.enable(2),R.viewport=new yt;const B=[I,R],_=new Aw;_.layers.enable(1),_.layers.enable(2);let y=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let te=m[V];return te===void 0&&(te=new mu,m[V]=te),te.getTargetRaySpace()},this.getControllerGrip=function(V){let te=m[V];return te===void 0&&(te=new mu,m[V]=te),te.getGripSpace()},this.getHand=function(V){let te=m[V];return te===void 0&&(te=new mu,m[V]=te),te.getHandSpace()};function O(V){const te=C.indexOf(V.inputSource);if(te===-1)return;const oe=m[te];oe!==void 0&&(oe.update(V.inputSource,V.frame,c||o),oe.dispatchEvent({type:V.type,data:V.inputSource}))}function G(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Q);for(let V=0;V<m.length;V++){const te=C[V];te!==null&&(C[V]=null,m[V].disconnect(te))}y=null,N=null,x.reset(),e.setRenderTarget(d),p=null,f=null,u=null,r=null,A=null,_e.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Q),g.xrCompatible!==!0&&await n.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0){const te={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,te),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Pr(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,oe=null,ae=null;g.depth&&(ae=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,te=g.stencil?zs:Ms,oe=g.stencil?ks:br);const Oe={colorFormat:n.RGBA8,depthFormat:ae,scaleFactor:s};u=new XRWebGLBinding(r,n),f=u.createProjectionLayer(Oe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Pr(f.textureWidth,f.textureHeight,{format:Wn,type:Si,depthTexture:new Xv(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),_e.setContext(r),_e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(V){for(let te=0;te<V.removed.length;te++){const oe=V.removed[te],ae=C.indexOf(oe);ae>=0&&(C[ae]=null,m[ae].disconnect(oe))}for(let te=0;te<V.added.length;te++){const oe=V.added[te];let ae=C.indexOf(oe);if(ae===-1){for(let Ne=0;Ne<m.length;Ne++)if(Ne>=C.length){C.push(oe),ae=Ne;break}else if(C[Ne]===null){C[Ne]=oe,ae=Ne;break}if(ae===-1)break}const Oe=m[ae];Oe&&Oe.connect(oe)}}const F=new U,Z=new U;function D(V,te,oe){F.setFromMatrixPosition(te.matrixWorld),Z.setFromMatrixPosition(oe.matrixWorld);const ae=F.distanceTo(Z),Oe=te.projectionMatrix.elements,Ne=oe.projectionMatrix.elements,ke=Oe[14]/(Oe[10]-1),je=Oe[14]/(Oe[10]+1),ie=(Oe[9]+1)/Oe[5],P=(Oe[9]-1)/Oe[5],Ae=(Oe[8]-1)/Oe[0],pe=(Ne[8]+1)/Ne[0],he=ke*Ae,ve=ke*pe,Re=ae/(-Ae+pe),Me=Re*-Ae;if(te.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Me),V.translateZ(Re),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Oe[10]===-1)V.projectionMatrix.copy(te.projectionMatrix),V.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const b=ke+Re,M=je+Re,H=he-Me,q=ve+(ae-Me),se=ie*je/M*b,$=P*je/M*b;V.projectionMatrix.makePerspective(H,q,se,$,b,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function W(V,te){te===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(te.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let te=V.near,oe=V.far;x.texture!==null&&(x.depthNear>0&&(te=x.depthNear),x.depthFar>0&&(oe=x.depthFar)),_.near=R.near=I.near=te,_.far=R.far=I.far=oe,(y!==_.near||N!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,N=_.far);const ae=V.parent,Oe=_.cameras;W(_,ae);for(let Ne=0;Ne<Oe.length;Ne++)W(Oe[Ne],ae);Oe.length===2?D(_,I,R):_.projectionMatrix.copy(I.projectionMatrix),K(V,_,ae)};function K(V,te,oe){oe===null?V.matrix.copy(te.matrixWorld):(V.matrix.copy(oe.matrixWorld),V.matrix.invert(),V.matrix.multiply(te.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(te.projectionMatrix),V.projectionMatrixInverse.copy(te.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ho*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let ne=null;function le(V,te){if(h=te.getViewerPose(c||o),v=te,h!==null){const oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let ae=!1;oe.length!==_.cameras.length&&(_.cameras.length=0,ae=!0);for(let Ne=0;Ne<oe.length;Ne++){const ke=oe[Ne];let je=null;if(p!==null)je=p.getViewport(ke);else{const P=u.getViewSubImage(f,ke);je=P.viewport,Ne===0&&(e.setRenderTargetTextures(A,P.colorTexture,f.ignoreDepthValues?void 0:P.depthStencilTexture),e.setRenderTarget(A))}let ie=B[Ne];ie===void 0&&(ie=new wn,ie.layers.enable(Ne),ie.viewport=new yt,B[Ne]=ie),ie.matrix.fromArray(ke.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(ke.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(je.x,je.y,je.width,je.height),Ne===0&&(_.matrix.copy(ie.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ae===!0&&_.cameras.push(ie)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const Ne=u.getDepthInformation(oe[0]);Ne&&Ne.isValid&&Ne.texture&&x.init(e,Ne,r.renderState)}}for(let oe=0;oe<m.length;oe++){const ae=C[oe],Oe=m[oe];ae!==null&&Oe!==void 0&&Oe.update(ae,te,c||o)}ne&&ne(V,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),v=null}const _e=new Wv;_e.setAnimationLoop(le),this.setAnimationLoop=function(V){ne=V},this.dispose=function(){}}}const fr=new ii,Iw=new at;function Mw(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,Gv(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,A,m,C){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),u(g,d)):d.isMeshPhongMaterial?(s(g,d),h(g,d)):d.isMeshStandardMaterial?(s(g,d),f(g,d),d.isMeshPhysicalMaterial&&p(g,d,C)):d.isMeshMatcapMaterial?(s(g,d),v(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),x(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,A,m):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Zt&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Zt&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const A=e.get(d),m=A.envMap,C=A.envMapRotation;m&&(g.envMap.value=m,fr.copy(C),fr.x*=-1,fr.y*=-1,fr.z*=-1,m.isCubeTexture&&m.isRenderTargetTexture===!1&&(fr.y*=-1,fr.z*=-1),g.envMapRotation.value.setFromMatrix4(Iw.makeRotationFromEuler(fr)),g.flipEnvMap.value=m.isCubeTexture&&m.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,A,m){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*A,g.scale.value=m*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function h(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function u(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function f(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,A){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Zt&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,d){d.matcap&&(g.matcap.value=d.matcap)}function x(g,d){const A=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Sw(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,m){const C=m.program;i.uniformBlockBinding(A,C)}function c(A,m){let C=r[A.id];C===void 0&&(v(A),C=h(A),r[A.id]=C,A.addEventListener("dispose",g));const T=m.program;i.updateUBOMapping(A,T);const S=e.render.frame;s[A.id]!==S&&(f(A),s[A.id]=S)}function h(A){const m=u();A.__bindingPointIndex=m;const C=t.createBuffer(),T=A.__size,S=A.usage;return t.bindBuffer(t.UNIFORM_BUFFER,C),t.bufferData(t.UNIFORM_BUFFER,T,S),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,m,C),C}function u(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const m=r[A.id],C=A.uniforms,T=A.__cache;t.bindBuffer(t.UNIFORM_BUFFER,m);for(let S=0,I=C.length;S<I;S++){const R=Array.isArray(C[S])?C[S]:[C[S]];for(let B=0,_=R.length;B<_;B++){const y=R[B];if(p(y,S,B,T)===!0){const N=y.__offset,O=Array.isArray(y.value)?y.value:[y.value];let G=0;for(let Q=0;Q<O.length;Q++){const F=O[Q],Z=x(F);typeof F=="number"||typeof F=="boolean"?(y.__data[0]=F,t.bufferSubData(t.UNIFORM_BUFFER,N+G,y.__data)):F.isMatrix3?(y.__data[0]=F.elements[0],y.__data[1]=F.elements[1],y.__data[2]=F.elements[2],y.__data[3]=0,y.__data[4]=F.elements[3],y.__data[5]=F.elements[4],y.__data[6]=F.elements[5],y.__data[7]=0,y.__data[8]=F.elements[6],y.__data[9]=F.elements[7],y.__data[10]=F.elements[8],y.__data[11]=0):(F.toArray(y.__data,G),G+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,N,y.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(A,m,C,T){const S=A.value,I=m+"_"+C;if(T[I]===void 0)return typeof S=="number"||typeof S=="boolean"?T[I]=S:T[I]=S.clone(),!0;{const R=T[I];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return T[I]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function v(A){const m=A.uniforms;let C=0;const T=16;for(let I=0,R=m.length;I<R;I++){const B=Array.isArray(m[I])?m[I]:[m[I]];for(let _=0,y=B.length;_<y;_++){const N=B[_],O=Array.isArray(N.value)?N.value:[N.value];for(let G=0,Q=O.length;G<Q;G++){const F=O[G],Z=x(F),D=C%T,W=D%Z.boundary,K=D+W;C+=W,K!==0&&T-K<Z.storage&&(C+=T-K),N.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=C,C+=Z.storage}}}const S=C%T;return S>0&&(C+=T-S),A.__size=C,A.__cache={},this}function x(A){const m={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(m.boundary=4,m.storage=4):A.isVector2?(m.boundary=8,m.storage=8):A.isVector3||A.isColor?(m.boundary=16,m.storage=12):A.isVector4?(m.boundary=16,m.storage=16):A.isMatrix3?(m.boundary=48,m.storage=48):A.isMatrix4?(m.boundary=64,m.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),m}function g(A){const m=A.target;m.removeEventListener("dispose",g);const C=o.indexOf(m.__bindingPointIndex);o.splice(C,1),t.deleteBuffer(r[m.id]),delete r[m.id],delete s[m.id]}function d(){for(const A in r)t.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Ew{constructor(e={}){const{canvas:n=fy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),v=new Int32Array(4);let x=null,g=null;const d=[],A=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Bn,this.toneMapping=_i,this.toneMappingExposure=1;const m=this;let C=!1,T=0,S=0,I=null,R=-1,B=null;const _=new yt,y=new yt;let N=null;const O=new Ze(0);let G=0,Q=n.width,F=n.height,Z=1,D=null,W=null;const K=new yt(0,0,Q,F),ne=new yt(0,0,Q,F);let le=!1;const _e=new cf;let V=!1,te=!1;const oe=new at,ae=new at,Oe=new U,Ne=new yt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function ie(){return I===null?Z:1}let P=i;function Ae(w,k){return n.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${qd}`),n.addEventListener("webglcontextlost",ee,!1),n.addEventListener("webglcontextrestored",ge,!1),n.addEventListener("webglcontextcreationerror",xe,!1),P===null){const k="webgl2";if(P=Ae(k,w),P===null)throw Ae(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let pe,he,ve,Re,Me,b,M,H,q,se,$,be,Ce,Ee,Ke,fe,Ie,Ge,ze,Te,Qe,Xe,J,L;function re(){pe=new PS(P),pe.init(),Xe=new mw(P,pe),he=new SS(P,pe,e,Xe),ve=new fw(P),he.reverseDepthBuffer&&ve.buffers.depth.setReversed(!0),Re=new DS(P),Me=new qE,b=new gw(P,pe,ve,Me,he,Xe,Re),M=new wS(m),H=new bS(m),q=new Gy(P),J=new IS(P,q),se=new LS(P,q,Re,J),$=new OS(P,se,q,Re),ze=new US(P,he,b),fe=new ES(Me),be=new QE(m,M,H,pe,he,J,fe),Ce=new Mw(m,Me),Ee=new ew,Ke=new ow(pe),Ge=new yS(m,M,H,ve,$,f,l),Ie=new hw(m,$,he),L=new Sw(P,Re,he,ve),Te=new MS(P,pe,Re),Qe=new NS(P,pe,Re),Re.programs=be.programs,m.capabilities=he,m.extensions=pe,m.properties=Me,m.renderLists=Ee,m.shadowMap=Ie,m.state=ve,m.info=Re}re();const j=new yw(m,P);this.xr=j,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=pe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=pe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(w){w!==void 0&&(Z=w,this.setSize(Q,F,!1))},this.getSize=function(w){return w.set(Q,F)},this.setSize=function(w,k,X=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=w,F=k,n.width=Math.floor(w*Z),n.height=Math.floor(k*Z),X===!0&&(n.style.width=w+"px",n.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(Q*Z,F*Z).floor()},this.setDrawingBufferSize=function(w,k,X){Q=w,F=k,Z=X,n.width=Math.floor(w*X),n.height=Math.floor(k*X),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(_)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,k,X,Y){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,k,X,Y),ve.viewport(_.copy(K).multiplyScalar(Z).round())},this.getScissor=function(w){return w.copy(ne)},this.setScissor=function(w,k,X,Y){w.isVector4?ne.set(w.x,w.y,w.z,w.w):ne.set(w,k,X,Y),ve.scissor(y.copy(ne).multiplyScalar(Z).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(w){ve.setScissorTest(le=w)},this.setOpaqueSort=function(w){D=w},this.setTransparentSort=function(w){W=w},this.getClearColor=function(w){return w.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(w=!0,k=!0,X=!0){let Y=0;if(w){let z=!1;if(I!==null){const me=I.texture.format;z=me===sf||me===rf||me===nf}if(z){const me=I.texture.type,Se=me===Si||me===br||me===Vo||me===ks||me===ef||me===tf,Pe=Ge.getClearColor(),Le=Ge.getClearAlpha(),Ve=Pe.r,He=Pe.g,De=Pe.b;Se?(p[0]=Ve,p[1]=He,p[2]=De,p[3]=Le,P.clearBufferuiv(P.COLOR,0,p)):(v[0]=Ve,v[1]=He,v[2]=De,v[3]=Le,P.clearBufferiv(P.COLOR,0,v))}else Y|=P.COLOR_BUFFER_BIT}k&&(Y|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),X&&(Y|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ee,!1),n.removeEventListener("webglcontextrestored",ge,!1),n.removeEventListener("webglcontextcreationerror",xe,!1),Ee.dispose(),Ke.dispose(),Me.dispose(),M.dispose(),H.dispose(),$.dispose(),J.dispose(),L.dispose(),be.dispose(),j.dispose(),j.removeEventListener("sessionstart",Ti),j.removeEventListener("sessionend",If),ar.stop()};function ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=Re.autoReset,k=Ie.enabled,X=Ie.autoUpdate,Y=Ie.needsUpdate,z=Ie.type;re(),Re.autoReset=w,Ie.enabled=k,Ie.autoUpdate=X,Ie.needsUpdate=Y,Ie.type=z}function xe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Be(w){const k=w.target;k.removeEventListener("dispose",Be),$e(k)}function $e(w){_t(w),Me.remove(w)}function _t(w){const k=Me.get(w).programs;k!==void 0&&(k.forEach(function(X){be.releaseProgram(X)}),w.isShaderMaterial&&be.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,X,Y,z,me){k===null&&(k=ke);const Se=z.isMesh&&z.matrixWorld.determinant()<0,Pe=m0(w,k,X,Y,z);ve.setMaterial(Y,Se);let Le=X.index,Ve=1;if(Y.wireframe===!0){if(Le=se.getWireframeAttribute(X),Le===void 0)return;Ve=2}const He=X.drawRange,De=X.attributes.position;let rt=He.start*Ve,ct=(He.start+He.count)*Ve;me!==null&&(rt=Math.max(rt,me.start*Ve),ct=Math.min(ct,(me.start+me.count)*Ve)),Le!==null?(rt=Math.max(rt,0),ct=Math.min(ct,Le.count)):De!=null&&(rt=Math.max(rt,0),ct=Math.min(ct,De.count));const Ct=ct-rt;if(Ct<0||Ct===1/0)return;J.setup(z,Y,Pe,X,Le);let hn,nt=Te;if(Le!==null&&(hn=q.get(Le),nt=Qe,nt.setIndex(hn)),z.isMesh)Y.wireframe===!0?(ve.setLineWidth(Y.wireframeLinewidth*ie()),nt.setMode(P.LINES)):nt.setMode(P.TRIANGLES);else if(z.isLine){let Ue=Y.linewidth;Ue===void 0&&(Ue=1),ve.setLineWidth(Ue*ie()),z.isLineSegments?nt.setMode(P.LINES):z.isLineLoop?nt.setMode(P.LINE_LOOP):nt.setMode(P.LINE_STRIP)}else z.isPoints?nt.setMode(P.POINTS):z.isSprite&&nt.setMode(P.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)nt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(pe.get("WEBGL_multi_draw"))nt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ue=z._multiDrawStarts,kt=z._multiDrawCounts,it=z._multiDrawCount,Nn=Le?q.get(Le).bytesPerElement:1,kr=Me.get(Y).currentProgram.getUniforms();for(let dn=0;dn<it;dn++)kr.setValue(P,"_gl_DrawID",dn),nt.render(Ue[dn]/Nn,kt[dn])}else if(z.isInstancedMesh)nt.renderInstances(rt,Ct,z.count);else if(X.isInstancedBufferGeometry){const Ue=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,kt=Math.min(X.instanceCount,Ue);nt.renderInstances(rt,Ct,kt)}else nt.render(rt,Ct)};function Fe(w,k,X){w.transparent===!0&&w.side===mn&&w.forceSinglePass===!1?(w.side=Zt,w.needsUpdate=!0,ia(w,k,X),w.side=Mi,w.needsUpdate=!0,ia(w,k,X),w.side=mn):ia(w,k,X)}this.compile=function(w,k,X=null){X===null&&(X=w),g=Ke.get(X),g.init(k),A.push(g),X.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(g.pushLight(z),z.castShadow&&g.pushShadow(z))}),w!==X&&w.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(g.pushLight(z),z.castShadow&&g.pushShadow(z))}),g.setupLights();const Y=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const me=z.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const Pe=me[Se];Fe(Pe,X,z),Y.add(Pe)}else Fe(me,X,z),Y.add(me)}),A.pop(),g=null,Y},this.compileAsync=function(w,k,X=null){const Y=this.compile(w,k,X);return new Promise(z=>{function me(){if(Y.forEach(function(Se){Me.get(Se).currentProgram.isReady()&&Y.delete(Se)}),Y.size===0){z(w);return}setTimeout(me,10)}pe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let qe=null;function Ft(w){qe&&qe(w)}function Ti(){ar.stop()}function If(){ar.start()}const ar=new Wv;ar.setAnimationLoop(Ft),typeof self<"u"&&ar.setContext(self),this.setAnimationLoop=function(w){qe=w,j.setAnimationLoop(w),w===null?ar.stop():ar.start()},j.addEventListener("sessionstart",Ti),j.addEventListener("sessionend",If),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(k),k=j.getCamera()),w.isScene===!0&&w.onBeforeRender(m,w,k,I),g=Ke.get(w,A.length),g.init(k),A.push(g),ae.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),_e.setFromProjectionMatrix(ae),te=this.localClippingEnabled,V=fe.init(this.clippingPlanes,te),x=Ee.get(w,d.length),x.init(),d.push(x),j.enabled===!0&&j.isPresenting===!0){const me=m.xr.getDepthSensingMesh();me!==null&&uc(me,k,-1/0,m.sortObjects)}uc(w,k,0,m.sortObjects),x.finish(),m.sortObjects===!0&&x.sort(D,W),je=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,je&&Ge.addToRenderList(x,w),this.info.render.frame++,V===!0&&fe.beginShadows();const X=g.state.shadowsArray;Ie.render(X,w,k),V===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=x.opaque,z=x.transmissive;if(g.setupLights(),k.isArrayCamera){const me=k.cameras;if(z.length>0)for(let Se=0,Pe=me.length;Se<Pe;Se++){const Le=me[Se];Sf(Y,z,w,Le)}je&&Ge.render(w);for(let Se=0,Pe=me.length;Se<Pe;Se++){const Le=me[Se];Mf(x,w,Le,Le.viewport)}}else z.length>0&&Sf(Y,z,w,k),je&&Ge.render(w),Mf(x,w,k);I!==null&&(b.updateMultisampleRenderTarget(I),b.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(m,w,k),J.resetDefaultState(),R=-1,B=null,A.pop(),A.length>0?(g=A[A.length-1],V===!0&&fe.setGlobalState(m.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function uc(w,k,X,Y){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||_e.intersectsSprite(w)){Y&&Ne.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ae);const Se=$.update(w),Pe=w.material;Pe.visible&&x.push(w,Se,Pe,X,Ne.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||_e.intersectsObject(w))){const Se=$.update(w),Pe=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ne.copy(w.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ne.copy(Se.boundingSphere.center)),Ne.applyMatrix4(w.matrixWorld).applyMatrix4(ae)),Array.isArray(Pe)){const Le=Se.groups;for(let Ve=0,He=Le.length;Ve<He;Ve++){const De=Le[Ve],rt=Pe[De.materialIndex];rt&&rt.visible&&x.push(w,Se,rt,X,Ne.z,De)}}else Pe.visible&&x.push(w,Se,Pe,X,Ne.z,null)}}const me=w.children;for(let Se=0,Pe=me.length;Se<Pe;Se++)uc(me[Se],k,X,Y)}function Mf(w,k,X,Y){const z=w.opaque,me=w.transmissive,Se=w.transparent;g.setupLightsView(X),V===!0&&fe.setGlobalState(m.clippingPlanes,X),Y&&ve.viewport(_.copy(Y)),z.length>0&&na(z,k,X),me.length>0&&na(me,k,X),Se.length>0&&na(Se,k,X),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Sf(w,k,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Y.id]===void 0&&(g.state.transmissionRenderTarget[Y.id]=new Pr(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float")?$o:Si,minFilter:yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const me=g.state.transmissionRenderTarget[Y.id],Se=Y.viewport||_;me.setSize(Se.z,Se.w);const Pe=m.getRenderTarget();m.setRenderTarget(me),m.getClearColor(O),G=m.getClearAlpha(),G<1&&m.setClearColor(16777215,.5),m.clear(),je&&Ge.render(X);const Le=m.toneMapping;m.toneMapping=_i;const Ve=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),g.setupLightsView(Y),V===!0&&fe.setGlobalState(m.clippingPlanes,Y),na(w,X,Y),b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me),pe.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let De=0,rt=k.length;De<rt;De++){const ct=k[De],Ct=ct.object,hn=ct.geometry,nt=ct.material,Ue=ct.group;if(nt.side===mn&&Ct.layers.test(Y.layers)){const kt=nt.side;nt.side=Zt,nt.needsUpdate=!0,Ef(Ct,X,Y,hn,nt,Ue),nt.side=kt,nt.needsUpdate=!0,He=!0}}He===!0&&(b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me))}m.setRenderTarget(Pe),m.setClearColor(O,G),Ve!==void 0&&(Y.viewport=Ve),m.toneMapping=Le}function na(w,k,X){const Y=k.isScene===!0?k.overrideMaterial:null;for(let z=0,me=w.length;z<me;z++){const Se=w[z],Pe=Se.object,Le=Se.geometry,Ve=Y===null?Se.material:Y,He=Se.group;Pe.layers.test(X.layers)&&Ef(Pe,k,X,Le,Ve,He)}}function Ef(w,k,X,Y,z,me){w.onBeforeRender(m,k,X,Y,z,me),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(m,k,X,Y,w,me),z.transparent===!0&&z.side===mn&&z.forceSinglePass===!1?(z.side=Zt,z.needsUpdate=!0,m.renderBufferDirect(X,k,Y,z,w,me),z.side=Mi,z.needsUpdate=!0,m.renderBufferDirect(X,k,Y,z,w,me),z.side=mn):m.renderBufferDirect(X,k,Y,z,w,me),w.onAfterRender(m,k,X,Y,z,me)}function ia(w,k,X){k.isScene!==!0&&(k=ke);const Y=Me.get(w),z=g.state.lights,me=g.state.shadowsArray,Se=z.state.version,Pe=be.getParameters(w,z.state,me,k,X),Le=be.getProgramCacheKey(Pe);let Ve=Y.programs;Y.environment=w.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(w.isMeshStandardMaterial?H:M).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Ve===void 0&&(w.addEventListener("dispose",Be),Ve=new Map,Y.programs=Ve);let He=Ve.get(Le);if(He!==void 0){if(Y.currentProgram===He&&Y.lightsStateVersion===Se)return Tf(w,Pe),He}else Pe.uniforms=be.getUniforms(w),w.onBeforeCompile(Pe,m),He=be.acquireProgram(Pe,Le),Ve.set(Le,He),Y.uniforms=Pe.uniforms;const De=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(De.clippingPlanes=fe.uniform),Tf(w,Pe),Y.needsLights=v0(w),Y.lightsStateVersion=Se,Y.needsLights&&(De.ambientLightColor.value=z.state.ambient,De.lightProbe.value=z.state.probe,De.directionalLights.value=z.state.directional,De.directionalLightShadows.value=z.state.directionalShadow,De.spotLights.value=z.state.spot,De.spotLightShadows.value=z.state.spotShadow,De.rectAreaLights.value=z.state.rectArea,De.ltc_1.value=z.state.rectAreaLTC1,De.ltc_2.value=z.state.rectAreaLTC2,De.pointLights.value=z.state.point,De.pointLightShadows.value=z.state.pointShadow,De.hemisphereLights.value=z.state.hemi,De.directionalShadowMap.value=z.state.directionalShadowMap,De.directionalShadowMatrix.value=z.state.directionalShadowMatrix,De.spotShadowMap.value=z.state.spotShadowMap,De.spotLightMatrix.value=z.state.spotLightMatrix,De.spotLightMap.value=z.state.spotLightMap,De.pointShadowMap.value=z.state.pointShadowMap,De.pointShadowMatrix.value=z.state.pointShadowMatrix),Y.currentProgram=He,Y.uniformsList=null,He}function wf(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=ul.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Tf(w,k){const X=Me.get(w);X.outputColorSpace=k.outputColorSpace,X.batching=k.batching,X.batchingColor=k.batchingColor,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.instancingMorph=k.instancingMorph,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function m0(w,k,X,Y,z){k.isScene!==!0&&(k=ke),b.resetTextureUnits();const me=k.fog,Se=Y.isMeshStandardMaterial?k.environment:null,Pe=I===null?m.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Zn,Le=(Y.isMeshStandardMaterial?H:M).get(Y.envMap||Se),Ve=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,He=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!X.morphAttributes.position,rt=!!X.morphAttributes.normal,ct=!!X.morphAttributes.color;let Ct=_i;Y.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ct=m.toneMapping);const hn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,nt=hn!==void 0?hn.length:0,Ue=Me.get(Y),kt=g.state.lights;if(V===!0&&(te===!0||w!==B)){const In=w===B&&Y.id===R;fe.setState(Y,w,In)}let it=!1;Y.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==kt.state.version||Ue.outputColorSpace!==Pe||z.isBatchedMesh&&Ue.batching===!1||!z.isBatchedMesh&&Ue.batching===!0||z.isBatchedMesh&&Ue.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ue.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ue.instancing===!1||!z.isInstancedMesh&&Ue.instancing===!0||z.isSkinnedMesh&&Ue.skinning===!1||!z.isSkinnedMesh&&Ue.skinning===!0||z.isInstancedMesh&&Ue.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ue.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ue.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ue.instancingMorph===!1&&z.morphTexture!==null||Ue.envMap!==Le||Y.fog===!0&&Ue.fog!==me||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==fe.numPlanes||Ue.numIntersection!==fe.numIntersection)||Ue.vertexAlphas!==Ve||Ue.vertexTangents!==He||Ue.morphTargets!==De||Ue.morphNormals!==rt||Ue.morphColors!==ct||Ue.toneMapping!==Ct||Ue.morphTargetsCount!==nt)&&(it=!0):(it=!0,Ue.__version=Y.version);let Nn=Ue.currentProgram;it===!0&&(Nn=ia(Y,k,z));let kr=!1,dn=!1,hc=!1;const Mt=Nn.getUniforms(),Ri=Ue.uniforms;if(ve.useProgram(Nn.program)&&(kr=!0,dn=!0,hc=!0),Y.id!==R&&(R=Y.id,dn=!0),kr||B!==w){he.reverseDepthBuffer?(oe.copy(w.projectionMatrix),gy(oe),my(oe),Mt.setValue(P,"projectionMatrix",oe)):Mt.setValue(P,"projectionMatrix",w.projectionMatrix),Mt.setValue(P,"viewMatrix",w.matrixWorldInverse);const In=Mt.map.cameraPosition;In!==void 0&&In.setValue(P,Oe.setFromMatrixPosition(w.matrixWorld)),he.logarithmicDepthBuffer&&Mt.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Mt.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),B!==w&&(B=w,dn=!0,hc=!0)}if(z.isSkinnedMesh){Mt.setOptional(P,z,"bindMatrix"),Mt.setOptional(P,z,"bindMatrixInverse");const In=z.skeleton;In&&(In.boneTexture===null&&In.computeBoneTexture(),Mt.setValue(P,"boneTexture",In.boneTexture,b))}z.isBatchedMesh&&(Mt.setOptional(P,z,"batchingTexture"),Mt.setValue(P,"batchingTexture",z._matricesTexture,b),Mt.setOptional(P,z,"batchingIdTexture"),Mt.setValue(P,"batchingIdTexture",z._indirectTexture,b),Mt.setOptional(P,z,"batchingColorTexture"),z._colorsTexture!==null&&Mt.setValue(P,"batchingColorTexture",z._colorsTexture,b));const dc=X.morphAttributes;if((dc.position!==void 0||dc.normal!==void 0||dc.color!==void 0)&&ze.update(z,X,Nn),(dn||Ue.receiveShadow!==z.receiveShadow)&&(Ue.receiveShadow=z.receiveShadow,Mt.setValue(P,"receiveShadow",z.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Ri.envMap.value=Le,Ri.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&k.environment!==null&&(Ri.envMapIntensity.value=k.environmentIntensity),dn&&(Mt.setValue(P,"toneMappingExposure",m.toneMappingExposure),Ue.needsLights&&A0(Ri,hc),me&&Y.fog===!0&&Ce.refreshFogUniforms(Ri,me),Ce.refreshMaterialUniforms(Ri,Y,Z,F,g.state.transmissionRenderTarget[w.id]),ul.upload(P,wf(Ue),Ri,b)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ul.upload(P,wf(Ue),Ri,b),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Mt.setValue(P,"center",z.center),Mt.setValue(P,"modelViewMatrix",z.modelViewMatrix),Mt.setValue(P,"normalMatrix",z.normalMatrix),Mt.setValue(P,"modelMatrix",z.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const In=Y.uniformsGroups;for(let fc=0,_0=In.length;fc<_0;fc++){const Rf=In[fc];L.update(Rf,Nn),L.bind(Rf,Nn)}}return Nn}function A0(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function v0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,k,X){Me.get(w.texture).__webglTexture=k,Me.get(w.depthTexture).__webglTexture=X;const Y=Me.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const X=Me.get(w);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,X=0){I=w,T=k,S=X;let Y=!0,z=null,me=!1,Se=!1;if(w){const Le=Me.get(w);if(Le.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(P.FRAMEBUFFER,null),Y=!1;else if(Le.__webglFramebuffer===void 0)b.setupRenderTarget(w);else if(Le.__hasExternalTextures)b.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const De=w.depthTexture;if(Le.__boundDepthTexture!==De){if(De!==null&&Me.has(De)&&(w.width!==De.image.width||w.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(w)}}const Ve=w.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Se=!0);const He=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(He[k])?z=He[k][X]:z=He[k],me=!0):w.samples>0&&b.useMultisampledRTT(w)===!1?z=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(He)?z=He[X]:z=He,_.copy(w.viewport),y.copy(w.scissor),N=w.scissorTest}else _.copy(K).multiplyScalar(Z).floor(),y.copy(ne).multiplyScalar(Z).floor(),N=le;if(ve.bindFramebuffer(P.FRAMEBUFFER,z)&&Y&&ve.drawBuffers(w,z),ve.viewport(_),ve.scissor(y),ve.setScissorTest(N),me){const Le=Me.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+k,Le.__webglTexture,X)}else if(Se){const Le=Me.get(w.texture),Ve=k||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Le.__webglTexture,X||0,Ve)}R=-1},this.readRenderTargetPixels=function(w,k,X,Y,z,me,Se){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(Pe=Pe[Se]),Pe){ve.bindFramebuffer(P.FRAMEBUFFER,Pe);try{const Le=w.texture,Ve=Le.format,He=Le.type;if(!he.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-Y&&X>=0&&X<=w.height-z&&P.readPixels(k,X,Y,z,Xe.convert(Ve),Xe.convert(He),me)}finally{const Le=I!==null?Me.get(I).__webglFramebuffer:null;ve.bindFramebuffer(P.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(w,k,X,Y,z,me,Se){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(Pe=Pe[Se]),Pe){const Le=w.texture,Ve=Le.format,He=Le.type;if(!he.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-Y&&X>=0&&X<=w.height-z){ve.bindFramebuffer(P.FRAMEBUFFER,Pe);const De=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,De),P.bufferData(P.PIXEL_PACK_BUFFER,me.byteLength,P.STREAM_READ),P.readPixels(k,X,Y,z,Xe.convert(Ve),Xe.convert(He),0);const rt=I!==null?Me.get(I).__webglFramebuffer:null;ve.bindFramebuffer(P.FRAMEBUFFER,rt);const ct=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await py(P,ct,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,De),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,me),P.deleteBuffer(De),P.deleteSync(ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,X=0){w.isTexture!==!0&&(cl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const Y=Math.pow(2,-X),z=Math.floor(w.image.width*Y),me=Math.floor(w.image.height*Y),Se=k!==null?k.x:0,Pe=k!==null?k.y:0;b.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,X,0,0,Se,Pe,z,me),ve.unbindTexture()},this.copyTextureToTexture=function(w,k,X=null,Y=null,z=0){w.isTexture!==!0&&(cl("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],k=arguments[2],z=arguments[3]||0,X=null);let me,Se,Pe,Le,Ve,He;X!==null?(me=X.max.x-X.min.x,Se=X.max.y-X.min.y,Pe=X.min.x,Le=X.min.y):(me=w.image.width,Se=w.image.height,Pe=0,Le=0),Y!==null?(Ve=Y.x,He=Y.y):(Ve=0,He=0);const De=Xe.convert(k.format),rt=Xe.convert(k.type);b.setTexture2D(k,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);const ct=P.getParameter(P.UNPACK_ROW_LENGTH),Ct=P.getParameter(P.UNPACK_IMAGE_HEIGHT),hn=P.getParameter(P.UNPACK_SKIP_PIXELS),nt=P.getParameter(P.UNPACK_SKIP_ROWS),Ue=P.getParameter(P.UNPACK_SKIP_IMAGES),kt=w.isCompressedTexture?w.mipmaps[z]:w.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,kt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,kt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,Le),w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,z,Ve,He,me,Se,De,rt,kt.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,z,Ve,He,kt.width,kt.height,De,kt.data):P.texSubImage2D(P.TEXTURE_2D,z,Ve,He,me,Se,De,rt,kt),P.pixelStorei(P.UNPACK_ROW_LENGTH,ct),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ct),P.pixelStorei(P.UNPACK_SKIP_PIXELS,hn),P.pixelStorei(P.UNPACK_SKIP_ROWS,nt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ue),z===0&&k.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(w,k,X=null,Y=null,z=0){w.isTexture!==!0&&(cl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],k=arguments[3],z=arguments[4]||0);let me,Se,Pe,Le,Ve,He,De,rt,ct;const Ct=w.isCompressedTexture?w.mipmaps[z]:w.image;X!==null?(me=X.max.x-X.min.x,Se=X.max.y-X.min.y,Pe=X.max.z-X.min.z,Le=X.min.x,Ve=X.min.y,He=X.min.z):(me=Ct.width,Se=Ct.height,Pe=Ct.depth,Le=0,Ve=0,He=0),Y!==null?(De=Y.x,rt=Y.y,ct=Y.z):(De=0,rt=0,ct=0);const hn=Xe.convert(k.format),nt=Xe.convert(k.type);let Ue;if(k.isData3DTexture)b.setTexture3D(k,0),Ue=P.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)b.setTexture2DArray(k,0),Ue=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);const kt=P.getParameter(P.UNPACK_ROW_LENGTH),it=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Nn=P.getParameter(P.UNPACK_SKIP_PIXELS),kr=P.getParameter(P.UNPACK_SKIP_ROWS),dn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ct.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ct.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Le),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ve),P.pixelStorei(P.UNPACK_SKIP_IMAGES,He),w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Ue,z,De,rt,ct,me,Se,Pe,hn,nt,Ct.data):k.isCompressedArrayTexture?P.compressedTexSubImage3D(Ue,z,De,rt,ct,me,Se,Pe,hn,Ct.data):P.texSubImage3D(Ue,z,De,rt,ct,me,Se,Pe,hn,nt,Ct),P.pixelStorei(P.UNPACK_ROW_LENGTH,kt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,it),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Nn),P.pixelStorei(P.UNPACK_SKIP_ROWS,kr),P.pixelStorei(P.UNPACK_SKIP_IMAGES,dn),z===0&&k.generateMipmaps&&P.generateMipmap(Ue),ve.unbindTexture()},this.initRenderTarget=function(w){Me.get(w).__webglFramebuffer===void 0&&b.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?b.setTextureCube(w,0):w.isData3DTexture?b.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?b.setTexture2DArray(w,0):b.setTexture2D(w,0),ve.unbindTexture()},this.resetState=function(){T=0,S=0,I=null,ve.reset(),J.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===of?"display-p3":"srgb",n.unpackColorSpace=tt.workingColorSpace===oc?"display-p3":"srgb"}}class ww extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class ri{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,p=(o-h)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new de:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new U,r=[],s=[],o=[],a=new U,l=new at;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new U)}s[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(bt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,v))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(bt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class hf extends ri{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new de){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Tw extends hf{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function df(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,p*=h,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Va=new U,Au=new df,vu=new df,_u=new df;class Rw extends ri{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new U){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(Va.subVectors(r[0],r[1]).add(r[0]),c=Va);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Va.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Va),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(h),p);x<1e-4&&(x=1),v<1e-4&&(v=x),g<1e-4&&(g=x),Au.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,v,x,g),vu.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,v,x,g),_u.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,v,x,g)}else this.curveType==="catmullrom"&&(Au.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),vu.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),_u.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(Au.calc(l),vu.calc(l),_u.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new U().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Fg(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function bw(t,e){const n=1-t;return n*n*e}function Pw(t,e){return 2*(1-t)*t*e}function Lw(t,e){return t*t*e}function yo(t,e,n,i){return bw(t,e)+Pw(t,n)+Lw(t,i)}function Nw(t,e){const n=1-t;return n*n*n*e}function Dw(t,e){const n=1-t;return 3*n*n*t*e}function Uw(t,e){return 3*(1-t)*t*t*e}function Ow(t,e){return t*t*t*e}function Io(t,e,n,i,r){return Nw(t,e)+Dw(t,n)+Uw(t,i)+Ow(t,r)}class Qv extends ri{constructor(e=new de,n=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Io(e,r.x,s.x,o.x,a.x),Io(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fw extends ri{constructor(e=new U,n=new U,i=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new U){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Io(e,r.x,s.x,o.x,a.x),Io(e,r.y,s.y,o.y,a.y),Io(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qv extends ri{constructor(e=new de,n=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new de){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new de){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kw extends ri{constructor(e=new U,n=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new U){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new U){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $v extends ri{constructor(e=new de,n=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(yo(e,r.x,s.x,o.x),yo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zw extends ri{constructor(e=new U,n=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new U){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(yo(e,r.x,s.x,o.x),yo(e,r.y,s.y,o.y),yo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class e0 extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new de){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(Fg(a,l.x,c.x,h.x,u.x),Fg(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new de().fromArray(r))}return this}}var $h=Object.freeze({__proto__:null,ArcCurve:Tw,CatmullRomCurve3:Rw,CubicBezierCurve:Qv,CubicBezierCurve3:Fw,EllipseCurve:hf,LineCurve:qv,LineCurve3:kw,QuadraticBezierCurve:$v,QuadraticBezierCurve3:zw,SplineCurve:e0});class Bw extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $h[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new $h[r.type]().fromJSON(r))}return this}}class kg extends Bw{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new qv(this.currentPoint.clone(),new de(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new $v(this.currentPoint.clone(),new de(e,n),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Qv(this.currentPoint.clone(),new de(e,n),new de(i,r),new de(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new e0(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,n+h,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new hf(e,n,i,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Bl extends yn{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=bt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/n,u=new U,f=new de,p=new U,v=new U,x=new U;let g=0,d=0;for(let A=0;A<=e.length-1;A++)switch(A){case 0:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,v.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(v)}for(let A=0;A<=n;A++){const m=i+A*h*r,C=Math.sin(m),T=Math.cos(m);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*C,u.y=e[S].y,u.z=e[S].x*T,o.push(u.x,u.y,u.z),f.x=A/n,f.y=S/(e.length-1),a.push(f.x,f.y);const I=l[3*S+0]*C,R=l[3*S+1],B=l[3*S+0]*T;c.push(I,R,B)}}for(let A=0;A<n;A++)for(let m=0;m<e.length-1;m++){const C=m+A*e.length,T=C,S=C+e.length,I=C+e.length+1,R=C+1;s.push(T,S,R),s.push(I,R,S)}this.setIndex(s),this.setAttribute("position",new pt(o,3)),this.setAttribute("uv",new pt(a,2)),this.setAttribute("normal",new pt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.points,e.segments,e.phiStart,e.phiLength)}}class ff extends yn{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],c=new U,h=new de;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=n;u++,f+=3){const p=i+u/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=n;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ff(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class pf extends yn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],p=[];let v=0;const x=[],g=i/2;let d=0;A(),o===!1&&(e>0&&m(!0),n>0&&m(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(p,2));function A(){const C=new U,T=new U;let S=0;const I=(n-e)/i;for(let R=0;R<=s;R++){const B=[],_=R/s,y=_*(n-e)+e;for(let N=0;N<=r;N++){const O=N/r,G=O*l+a,Q=Math.sin(G),F=Math.cos(G);T.x=y*Q,T.y=-_*i+g,T.z=y*F,u.push(T.x,T.y,T.z),C.set(Q,I,F).normalize(),f.push(C.x,C.y,C.z),p.push(O,1-_),B.push(v++)}x.push(B)}for(let R=0;R<r;R++)for(let B=0;B<s;B++){const _=x[B][R],y=x[B+1][R],N=x[B+1][R+1],O=x[B][R+1];e>0&&(h.push(_,y,O),S+=3),n>0&&(h.push(y,N,O),S+=3)}c.addGroup(d,S,0),d+=S}function m(C){const T=v,S=new de,I=new U;let R=0;const B=C===!0?e:n,_=C===!0?1:-1;for(let N=1;N<=r;N++)u.push(0,g*_,0),f.push(0,_,0),p.push(.5,.5),v++;const y=v;for(let N=0;N<=r;N++){const G=N/r*l+a,Q=Math.cos(G),F=Math.sin(G);I.x=B*F,I.y=g*_,I.z=B*Q,u.push(I.x,I.y,I.z),f.push(0,_,0),S.x=Q*.5+.5,S.y=F*.5*_+.5,p.push(S.x,S.y),v++}for(let N=0;N<r;N++){const O=T+N,G=y+N;C===!0?h.push(G,G+1,O):h.push(G+1,G,O),R+=3}c.addGroup(d,R,C===!0?1:2),d+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pf(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class t0 extends kg{constructor(e){super(e),this.uuid=Fr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new kg().fromJSON(r))}return this}}const Gw={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=n0(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,p;if(i&&(s=Xw(t,e,s,n)),t.length>80*n){a=c=t[0],l=h=t[1];for(let v=n;v<r;v+=n)u=t[v],f=t[v+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return jo(s,o,n,a,l,p,0),o}};function n0(t,e,n,i,r){let s,o;if(r===i1(t,e,n,i)>0)for(s=e;s<n;s+=i)o=zg(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=zg(s,t[s],t[s+1],o);return o&&cc(o,o.next)&&(Yo(o),o=o.next),o}function Nr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(cc(n,n.next)||mt(n.prev,n,n.next)===0)){if(Yo(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function jo(t,e,n,i,r,s,o){if(!t)return;!o&&s&&Qw(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?Hw(t,i,r,s):Vw(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),Yo(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=Ww(Nr(t),e,n),jo(t,e,n,i,r,s,2)):o===2&&jw(t,e,n,i,r,s):jo(Nr(t),e,n,i,r,s,1);break}}}function Vw(t){const e=t.prev,n=t,i=t.next;if(mt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=h&&v.x<=f&&v.y>=u&&v.y<=p&&gs(r,a,s,l,o,c,v.x,v.y)&&mt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Hw(t,e,n,i){const r=t.prev,s=t,o=t.next;if(mt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,p=a<l?a<c?a:c:l<c?l:c,v=h<u?h<f?h:f:u<f?u:f,x=a>l?a>c?a:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,d=ed(p,v,e,n,i),A=ed(x,g,e,n,i);let m=t.prevZ,C=t.nextZ;for(;m&&m.z>=d&&C&&C.z<=A;){if(m.x>=p&&m.x<=x&&m.y>=v&&m.y<=g&&m!==r&&m!==o&&gs(a,h,l,u,c,f,m.x,m.y)&&mt(m.prev,m,m.next)>=0||(m=m.prevZ,C.x>=p&&C.x<=x&&C.y>=v&&C.y<=g&&C!==r&&C!==o&&gs(a,h,l,u,c,f,C.x,C.y)&&mt(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;m&&m.z>=d;){if(m.x>=p&&m.x<=x&&m.y>=v&&m.y<=g&&m!==r&&m!==o&&gs(a,h,l,u,c,f,m.x,m.y)&&mt(m.prev,m,m.next)>=0)return!1;m=m.prevZ}for(;C&&C.z<=A;){if(C.x>=p&&C.x<=x&&C.y>=v&&C.y<=g&&C!==r&&C!==o&&gs(a,h,l,u,c,f,C.x,C.y)&&mt(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function Ww(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!cc(r,s)&&i0(r,i,i.next,s)&&Xo(r,s)&&Xo(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),Yo(i),Yo(i.next),i=t=s),i=i.next}while(i!==t);return Nr(i)}function jw(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&e1(o,a)){let l=r0(o,a);o=Nr(o,o.next),l=Nr(l,l.next),jo(o,e,n,i,r,s,0),jo(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function Xw(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=n0(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push($w(c));for(r.sort(Yw),s=0;s<r.length;s++)n=Zw(r[s],n);return n}function Yw(t,e){return t.x-e.x}function Zw(t,e){const n=Jw(t,e);if(!n)return e;const i=r0(n,t);return Nr(i,i.next),Nr(n,n.next)}function Jw(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=s&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&gs(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(s-n.x),Xo(n,t)&&(u<h||u===h&&(n.x>r.x||n.x===r.x&&Kw(r,n)))&&(r=n,h=u)),n=n.next;while(n!==a);return r}function Kw(t,e){return mt(t.prev,t,e.prev)<0&&mt(e.next,t,t.next)<0}function Qw(t,e,n,i){let r=t;do r.z===0&&(r.z=ed(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,qw(r)}function qw(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function ed(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function $w(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function gs(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function e1(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!t1(t,e)&&(Xo(t,e)&&Xo(e,t)&&n1(t,e)&&(mt(t.prev,t,e.prev)||mt(t,e.prev,e))||cc(t,e)&&mt(t.prev,t,t.next)>0&&mt(e.prev,e,e.next)>0)}function mt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function cc(t,e){return t.x===e.x&&t.y===e.y}function i0(t,e,n,i){const r=Wa(mt(t,e,n)),s=Wa(mt(t,e,i)),o=Wa(mt(n,i,t)),a=Wa(mt(n,i,e));return!!(r!==s&&o!==a||r===0&&Ha(t,n,e)||s===0&&Ha(t,i,e)||o===0&&Ha(n,t,i)||a===0&&Ha(n,e,i))}function Ha(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Wa(t){return t>0?1:t<0?-1:0}function t1(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&i0(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Xo(t,e){return mt(t.prev,t,t.next)<0?mt(t,e,t.next)>=0&&mt(t,t.prev,e)>=0:mt(t,e,t.prev)<0||mt(t,t.next,e)<0}function n1(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function r0(t,e){const n=new td(t.i,t.x,t.y),i=new td(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function zg(t,e,n,i){const r=new td(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Yo(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function td(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function i1(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Mo{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Mo.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Bg(e),Gg(i,e);let o=e.length;n.forEach(Bg);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Gg(i,n[l]);const a=Gw.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Bg(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Gg(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class gf extends yn{constructor(e=new t0([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new pt(r,3)),this.setAttribute("uv",new pt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,h=n.steps!==void 0?n.steps:1,u=n.depth!==void 0?n.depth:1;let f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,v=n.bevelSize!==void 0?n.bevelSize:p-.1,x=n.bevelOffset!==void 0?n.bevelOffset:0,g=n.bevelSegments!==void 0?n.bevelSegments:3;const d=n.extrudePath,A=n.UVGenerator!==void 0?n.UVGenerator:r1;let m,C=!1,T,S,I,R;d&&(m=d.getSpacedPoints(h),C=!0,f=!1,T=d.computeFrenetFrames(h,!1),S=new U,I=new U,R=new U),f||(g=0,p=0,v=0,x=0);const B=a.extractPoints(c);let _=B.shape;const y=B.holes;if(!Mo.isClockWise(_)){_=_.reverse();for(let ie=0,P=y.length;ie<P;ie++){const Ae=y[ie];Mo.isClockWise(Ae)&&(y[ie]=Ae.reverse())}}const O=Mo.triangulateShape(_,y),G=_;for(let ie=0,P=y.length;ie<P;ie++){const Ae=y[ie];_=_.concat(Ae)}function Q(ie,P,Ae){return P||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(P,Ae)}const F=_.length,Z=O.length;function D(ie,P,Ae){let pe,he,ve;const Re=ie.x-P.x,Me=ie.y-P.y,b=Ae.x-ie.x,M=Ae.y-ie.y,H=Re*Re+Me*Me,q=Re*M-Me*b;if(Math.abs(q)>Number.EPSILON){const se=Math.sqrt(H),$=Math.sqrt(b*b+M*M),be=P.x-Me/se,Ce=P.y+Re/se,Ee=Ae.x-M/$,Ke=Ae.y+b/$,fe=((Ee-be)*M-(Ke-Ce)*b)/(Re*M-Me*b);pe=be+Re*fe-ie.x,he=Ce+Me*fe-ie.y;const Ie=pe*pe+he*he;if(Ie<=2)return new de(pe,he);ve=Math.sqrt(Ie/2)}else{let se=!1;Re>Number.EPSILON?b>Number.EPSILON&&(se=!0):Re<-Number.EPSILON?b<-Number.EPSILON&&(se=!0):Math.sign(Me)===Math.sign(M)&&(se=!0),se?(pe=-Me,he=Re,ve=Math.sqrt(H)):(pe=Re,he=Me,ve=Math.sqrt(H/2))}return new de(pe/ve,he/ve)}const W=[];for(let ie=0,P=G.length,Ae=P-1,pe=ie+1;ie<P;ie++,Ae++,pe++)Ae===P&&(Ae=0),pe===P&&(pe=0),W[ie]=D(G[ie],G[Ae],G[pe]);const K=[];let ne,le=W.concat();for(let ie=0,P=y.length;ie<P;ie++){const Ae=y[ie];ne=[];for(let pe=0,he=Ae.length,ve=he-1,Re=pe+1;pe<he;pe++,ve++,Re++)ve===he&&(ve=0),Re===he&&(Re=0),ne[pe]=D(Ae[pe],Ae[ve],Ae[Re]);K.push(ne),le=le.concat(ne)}for(let ie=0;ie<g;ie++){const P=ie/g,Ae=p*Math.cos(P*Math.PI/2),pe=v*Math.sin(P*Math.PI/2)+x;for(let he=0,ve=G.length;he<ve;he++){const Re=Q(G[he],W[he],pe);ae(Re.x,Re.y,-Ae)}for(let he=0,ve=y.length;he<ve;he++){const Re=y[he];ne=K[he];for(let Me=0,b=Re.length;Me<b;Me++){const M=Q(Re[Me],ne[Me],pe);ae(M.x,M.y,-Ae)}}}const _e=v+x;for(let ie=0;ie<F;ie++){const P=f?Q(_[ie],le[ie],_e):_[ie];C?(I.copy(T.normals[0]).multiplyScalar(P.x),S.copy(T.binormals[0]).multiplyScalar(P.y),R.copy(m[0]).add(I).add(S),ae(R.x,R.y,R.z)):ae(P.x,P.y,0)}for(let ie=1;ie<=h;ie++)for(let P=0;P<F;P++){const Ae=f?Q(_[P],le[P],_e):_[P];C?(I.copy(T.normals[ie]).multiplyScalar(Ae.x),S.copy(T.binormals[ie]).multiplyScalar(Ae.y),R.copy(m[ie]).add(I).add(S),ae(R.x,R.y,R.z)):ae(Ae.x,Ae.y,u/h*ie)}for(let ie=g-1;ie>=0;ie--){const P=ie/g,Ae=p*Math.cos(P*Math.PI/2),pe=v*Math.sin(P*Math.PI/2)+x;for(let he=0,ve=G.length;he<ve;he++){const Re=Q(G[he],W[he],pe);ae(Re.x,Re.y,u+Ae)}for(let he=0,ve=y.length;he<ve;he++){const Re=y[he];ne=K[he];for(let Me=0,b=Re.length;Me<b;Me++){const M=Q(Re[Me],ne[Me],pe);C?ae(M.x,M.y+m[h-1].y,m[h-1].x+Ae):ae(M.x,M.y,u+Ae)}}}V(),te();function V(){const ie=r.length/3;if(f){let P=0,Ae=F*P;for(let pe=0;pe<Z;pe++){const he=O[pe];Oe(he[2]+Ae,he[1]+Ae,he[0]+Ae)}P=h+g*2,Ae=F*P;for(let pe=0;pe<Z;pe++){const he=O[pe];Oe(he[0]+Ae,he[1]+Ae,he[2]+Ae)}}else{for(let P=0;P<Z;P++){const Ae=O[P];Oe(Ae[2],Ae[1],Ae[0])}for(let P=0;P<Z;P++){const Ae=O[P];Oe(Ae[0]+F*h,Ae[1]+F*h,Ae[2]+F*h)}}i.addGroup(ie,r.length/3-ie,0)}function te(){const ie=r.length/3;let P=0;oe(G,P),P+=G.length;for(let Ae=0,pe=y.length;Ae<pe;Ae++){const he=y[Ae];oe(he,P),P+=he.length}i.addGroup(ie,r.length/3-ie,1)}function oe(ie,P){let Ae=ie.length;for(;--Ae>=0;){const pe=Ae;let he=Ae-1;he<0&&(he=ie.length-1);for(let ve=0,Re=h+g*2;ve<Re;ve++){const Me=F*ve,b=F*(ve+1),M=P+pe+Me,H=P+he+Me,q=P+he+b,se=P+pe+b;Ne(M,H,q,se)}}}function ae(ie,P,Ae){l.push(ie),l.push(P),l.push(Ae)}function Oe(ie,P,Ae){ke(ie),ke(P),ke(Ae);const pe=r.length/3,he=A.generateTopUV(i,r,pe-3,pe-2,pe-1);je(he[0]),je(he[1]),je(he[2])}function Ne(ie,P,Ae,pe){ke(ie),ke(P),ke(pe),ke(P),ke(Ae),ke(pe);const he=r.length/3,ve=A.generateSideWallUV(i,r,he-6,he-3,he-2,he-1);je(ve[0]),je(ve[1]),je(ve[3]),je(ve[1]),je(ve[2]),je(ve[3])}function ke(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function je(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return s1(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new $h[r.type]().fromJSON(r)),new gf(i,e.options)}}const r1={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new de(s,o),new de(a,l),new de(c,h)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],f=e[r*3],p=e[r*3+1],v=e[r*3+2],x=e[s*3],g=e[s*3+1],d=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new de(o,1-l),new de(c,1-u),new de(f,1-v),new de(x,1-d)]:[new de(a,1-l),new de(h,1-u),new de(p,1-v),new de(g,1-d)]}};function s1(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class mf extends yn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],h=[];let u=e;const f=(n-e)/r,p=new U,v=new de;for(let x=0;x<=r;x++){for(let g=0;g<=i;g++){const d=s+g/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/n+1)/2,v.y=(p.y/n+1)/2,h.push(v.x,v.y)}u+=f}for(let x=0;x<r;x++){const g=x*(i+1);for(let d=0;d<i;d++){const A=d+g,m=A,C=A+i+1,T=A+i+2,S=A+1;a.push(m,C,S),a.push(C,T,S)}}this.setIndex(a),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mf(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Af extends yn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new U,f=new U,p=[],v=[],x=[],g=[];for(let d=0;d<=i;d++){const A=[],m=d/i;let C=0;d===0&&o===0?C=.5/n:d===i&&l===Math.PI&&(C=-.5/n);for(let T=0;T<=n;T++){const S=T/n;u.x=-e*Math.cos(r+S*s)*Math.sin(o+m*a),u.y=e*Math.cos(o+m*a),u.z=e*Math.sin(r+S*s)*Math.sin(o+m*a),v.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(S+C,1-m),A.push(c++)}h.push(A)}for(let d=0;d<i;d++)for(let A=0;A<n;A++){const m=h[d][A+1],C=h[d][A],T=h[d+1][A],S=h[d+1][A+1];(d!==0||o>0)&&p.push(m,C,S),(d!==i-1||l<Math.PI)&&p.push(C,T,S)}this.setIndex(p),this.setAttribute("position",new pt(v,3)),this.setAttribute("normal",new pt(x,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Af(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class o1 extends ea{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rv,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Vg={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class a1{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],v=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return v}return null}}}const l1=new a1;class vf{constructor(e){this.manager=e!==void 0?e:l1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}vf.DEFAULT_MATERIAL_NAME="__DEFAULT";class c1 extends vf{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Vg.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Wo("img");function l(){h(),Vg.add(e,this),n&&n(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class s0 extends vf{constructor(e){super(e)}load(e,n,i,r){const s=new tn,o=new c1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class o0 extends Jt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Cu=new at,Hg=new U,Wg=new U;class u1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cf,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Hg.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hg),Wg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Wg),n.updateMatrixWorld(),Cu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Cu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class h1 extends u1{constructor(){super(new jv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class d1 extends o0{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new h1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class f1 extends o0{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class jg{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(bt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class p1 extends Or{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qd);class g1{parse(e){let n="",i=0,r=0,s=0;const o=new U,a=new Ze,l=new U,c=new de,h=[];function u(v){let x=0,g=0,d=0;const A=v.geometry,m=new We,C=A.getAttribute("position"),T=A.getAttribute("normal"),S=A.getAttribute("uv"),I=A.getIndex();if(n+="o "+v.name+`
`,v.material&&v.material.name&&(n+="usemtl "+v.material.name+`
`),C!==void 0)for(let R=0,B=C.count;R<B;R++,x++)o.fromBufferAttribute(C,R),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(S!==void 0)for(let R=0,B=S.count;R<B;R++,d++)c.fromBufferAttribute(S,R),n+="vt "+c.x+" "+c.y+`
`;if(T!==void 0){m.getNormalMatrix(v.matrixWorld);for(let R=0,B=T.count;R<B;R++,g++)l.fromBufferAttribute(T,R),l.applyMatrix3(m).normalize(),n+="vn "+l.x+" "+l.y+" "+l.z+`
`}if(I!==null)for(let R=0,B=I.count;R<B;R+=3){for(let _=0;_<3;_++){const y=I.getX(R+_)+1;h[_]=i+y+(T||S?"/"+(S?r+y:"")+(T?"/"+(s+y):""):"")}n+="f "+h.join(" ")+`
`}else for(let R=0,B=C.count;R<B;R+=3){for(let _=0;_<3;_++){const y=R+_+1;h[_]=i+y+(T||S?"/"+(S?r+y:"")+(T?"/"+(s+y):""):"")}n+="f "+h.join(" ")+`
`}i+=x,r+=d,s+=g}function f(v){let x=0;const g=v.geometry,d=v.type,A=g.getAttribute("position");if(n+="o "+v.name+`
`,A!==void 0)for(let m=0,C=A.count;m<C;m++,x++)o.fromBufferAttribute(A,m),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z+`
`;if(d==="Line"){n+="l ";for(let m=1,C=A.count;m<=C;m++)n+=i+m+" ";n+=`
`}if(d==="LineSegments")for(let m=1,C=m+1,T=A.count;m<T;m+=2,C=m+1)n+="l "+(i+m)+" "+(i+C)+`
`;i+=x}function p(v){let x=0;const g=v.geometry,d=g.getAttribute("position"),A=g.getAttribute("color");if(n+="o "+v.name+`
`,d!==void 0){for(let m=0,C=d.count;m<C;m++,x++)o.fromBufferAttribute(d,m),o.applyMatrix4(v.matrixWorld),n+="v "+o.x+" "+o.y+" "+o.z,A!==void 0&&(a.fromBufferAttribute(A,m),tt.fromWorkingColorSpace(a,Bn),n+=" "+a.r+" "+a.g+" "+a.b),n+=`
`;n+="p ";for(let m=1,C=d.count;m<=C;m++)n+=i+m+" ";n+=`
`}i+=x}return e.traverse(function(v){v.isMesh===!0&&u(v),v.isLine===!0&&f(v),v.isPoints===!0&&p(v)}),n}}const Xg={type:"change"},_f={type:"start"},a0={type:"end"},ja=new Uv,Yg=new zi,m1=Math.cos(70*Pv.DEG2RAD),Tt=new U,sn=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xu=1e-6;class A1 extends p1{constructor(e,n=null){super(e,n),this.state=ot.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ys.ROTATE,MIDDLE:ys.DOLLY,RIGHT:ys.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Lr,this._lastTargetPosition=new U,this._quat=new Lr().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new jg,this._sphericalDelta=new jg,this._scale=1,this._panOffset=new U,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new U,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=_1.bind(this),this._onPointerDown=v1.bind(this),this._onPointerUp=C1.bind(this),this._onContextMenu=w1.bind(this),this._onMouseWheel=I1.bind(this),this._onKeyDown=M1.bind(this),this._onTouchStart=S1.bind(this),this._onTouchMove=E1.bind(this),this._onMouseDown=x1.bind(this),this._onMouseMove=y1.bind(this),this._interceptControlDown=T1.bind(this),this._interceptControlUp=R1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xg),this.update(),this.state=ot.NONE}update(e=null){const n=this.object.position;Tt.copy(n).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),n.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Tt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ja.origin.copy(this.object.position),ja.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ja.direction))<m1?this.object.lookAt(this.target):(Yg.setFromNormalAndCoplanarPoint(this.object.up,this.target),ja.intersectPlane(Yg,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>xu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xu||this._lastTargetPosition.distanceToSquared(this.target)>xu?(this.dispatchEvent(Xg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Tt.setFromMatrixColumn(n,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,n){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(n,1):(Tt.setFromMatrixColumn(n,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Tt.copy(r).sub(this.target);let s=Tt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/n.clientHeight),this._rotateUp(sn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/n.clientHeight),this._rotateUp(sn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new de,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function v1(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function _1(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function C1(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(a0),this.state=ot.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function x1(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ys.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ot.DOLLY;break;case ys.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}break;case ys.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(_f)}function y1(t){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function I1(t){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(t.preventDefault(),this.dispatchEvent(_f),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(a0))}function M1(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function S1(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=ot.TOUCH_ROTATE;break;case fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ot.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(_f)}function E1(t){switch(this._trackPointer(t),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ot.NONE}}function w1(t){this.enabled!==!1&&t.preventDefault()}function T1(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function R1(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Kn=Math.PI/180,b1=[[0,0],[30*Kn,15*Kn],[90*Kn,0],[150*Kn,-15*Kn],[180*Kn,0],[-90*Kn,0],[0,-80*Kn],[45*Kn,-45*Kn]];function P1([t,e,n]){return new Ze(t/255,e/255,n/255)}function Cf(t,e){return e==="finished"?{color:t.color,shine:t.shine,decal:t.decal,translucent:!1}:{color:t.default_color,shine:t.default_shine,decal:t.default_decal,translucent:e==="unfinished"&&!!t.translucent_unfinished}}const L1=`
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
  }`,N1=`
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
  }`;function Zg(t){const e=new Ei({vertexShader:L1,fragmentShader:N1,side:mn,uniforms:{uMatColor:{value:t.color},uSpec:{value:t.spec},uShin:{value:Math.max(t.shin,1)},uAmb:{value:t.amb},uDif:{value:t.dif},uOpacity:{value:t.opacity},uUseMap:{value:0},uMap:{value:null},uTexMatrix:{value:new We},uLightDir:{value:new U(1,4,1)}}});return t.opacity<.999&&(e.transparent=!0,e.depthWrite=!1),e}function l0(t,e){t.uniforms.uMap.value=e,t.uniforms.uUseMap.value=1,e.matrixAutoUpdate&&e.updateMatrix(),t.uniforms.uTexMatrix.value.copy(e.matrix),t.needsUpdate=!0}function nd(t,e){const n=e==="figure"?1:.7692307692307692,i=(e==="figure"?.3:.5)*n,r=(e==="figure"?.7:1)*n;if(e==="figure"){const[l,c,h]=t.figure_color,u=g=>Math.max(.2,g/255)*2,f=new Ze(u(l),u(c),u(h)),p=40,v=p/128,x=new Ze(Math.max(f.r,.9)*v,Math.max(f.g,.9)*v,Math.max(f.b,.9)*v);return Zg({color:f,spec:x,shin:p,amb:i,dif:r,opacity:1})}const s=Cf(t,e),o=Pv.clamp(s.shine,0,1),a=s.translucent?.2:(s.color[3]??255)/255;return Zg({color:P1(s.color),spec:new Ze(o,o,o),shin:100*o,amb:i,dif:r,opacity:a})}function Jg(t){return t==="CLAMP"||t==="STICKER"?ji:t==="MIRROR"?Ul:Fs}const c0=t=>t.url.startsWith("/textures/");function D1(t){const e=new s0().load(t.url);e.colorSpace=Zn,e.wrapS=Jg(t.edge_mode),e.wrapT=Jg(t.edge_mode),e.matrixAutoUpdate=!1;const[n,i]=t.center,[r,s]=[t.scale[0]||1,t.scale[1]||1],[o,a]=t.offset,l=t.rotation||0,c=(g,d)=>new We().set(1,0,g,0,1,d,0,0,1),h=Math.cos(l),u=Math.sin(l),f=new We().set(h,-u,0,u,h,0,0,0,1),p=new We().set(r,0,0,0,s,0,0,0,1),v=c(-n,-i).multiply(f).multiply(c(n,i)).multiply(p).multiply(c(o,a)),x=new We().set(-1,0,1,0,-1,1,0,0,1);return e.matrix.copy(x.multiply(v)),e}function u0(t,e,n){const i=new s0().load(t);return i.colorSpace=Zn,i.wrapS=Fs,i.wrapT=Fs,i.repeat.set(Math.max(e,1),Math.max(n,1)),i}const Gl=.007;function U1(t,e,n){const i=new Ai,r=nd(t.mat,e);n.push(r);const s=Cf(t.mat,e),o=e==="figure"&&(t.kind==="BodyTube"||t.kind==="Transition"&&!(t.cap_fore&&t.cap_aft));o&&(r.transparent=!0,r.depthWrite=!1,r.side=Mi,r.uniforms.uOpacity.value=.2,i.renderOrder=3);const a=g=>g.map(([d,A])=>new de(Math.max(A,1e-5),d)),l=g=>{const d=g.attributes.position;let A=1/0,m=-1/0;for(let S=0;S<d.count;S++){const I=d.getY(S);I<A&&(A=I),I>m&&(m=I)}const C=m-A||1,T=g.attributes.uv;for(let S=0;S<d.count;S++){let I=Math.atan2(d.getX(S),d.getZ(S));I<0&&(I+=Math.PI*2),T.setXY(S,I/(Math.PI*2),(d.getY(S)-A)/C)}T.needsUpdate=!0},c=new Bl(a(t.outer),96);l(c),n.push(c);const h=new Bt(c,r);if(h.rotation.z=-Math.PI/2,i.add(h),e!=="figure"&&s.decal){const g=s.decal;let d;if(c0(g)){const C=t.outer.map(([,I])=>I).filter(I=>I>1e-5),T=C.length?Math.max(...C):.01,S=t.outer[t.outer.length-1][0]-t.outer[0][0]||.05;d=u0(g.url,Math.round(2*Math.PI*T/Gl),Math.round(Math.abs(S)/Gl))}else d=D1(g);n.push(d);const A=r.clone();l0(A,d),A.uniforms.uMatColor.value.setRGB(1,1,1),A.uniforms.uSpec.value.setRGB(0,0,0),A.transparent=!0,A.depthWrite=!s.translucent,A.polygonOffset=!0,A.polygonOffsetFactor=-1,A.polygonOffsetUnits=-1,n.push(A);const m=new Bt(c,A);m.rotation.z=-Math.PI/2,i.add(m)}const u=g=>{g.transparent=!1,g.depthWrite=!0,g.uniforms.uOpacity.value=1,g.uniforms.uMatColor.value.multiplyScalar(.7),g.uniforms.uSpec.value.setRGB(0,0,0)},p=Math.max(...t.inner.map(([,g])=>g))>1e-4;if(p){const g=new Bl(a(t.inner),96);n.push(g);const d=r.clone();d.side=Zt,o&&u(d),n.push(d);const A=new Bt(g,d);A.rotation.z=-Math.PI/2,i.add(A)}else if(o){const g=r.clone();g.side=Zt,u(g),n.push(g);const d=new Bt(c,g);d.rotation.z=-Math.PI/2,i.add(d)}const v=r.clone();v.side=mn,n.push(v);const x=(g,d,A)=>{const m=A>1e-4?new mf(A,d,96):new ff(d,96);n.push(m);const C=new Bt(m,v);return C.rotation.y=Math.PI/2,C.position.x=g,C};if(t.cap_fore){const g=t.outer[0],d=t.inner[0];i.add(x(g[0],g[1],p?d[1]:0))}if(t.cap_aft){const g=t.outer[t.outer.length-1],d=t.inner[t.inner.length-1];i.add(x(g[0],g[1],p?d[1]:0))}return s.translucent&&(i.renderOrder=2),i}function h0(t,e){const n=new Ai,i=[],r=(s,o,a)=>{if(!o)return s;s.position.y=o;const l=new Ai;return l.add(s),l.rotation.x=a||0,l};for(const s of t.lathe)s.outer.length<2||n.add(r(U1(s,e,i),s.radial,s.radial_angle));for(const s of t.fins){const o=new t0;if(s.outline&&s.outline.length>=3){o.moveTo(s.outline[0][0],s.outline[0][1]);for(let p=1;p<s.outline.length;p++)o.lineTo(s.outline[p][0],s.outline[p][1]);o.lineTo(s.outline[0][0],s.outline[0][1])}else o.moveTo(0,0),o.lineTo(s.root_chord,0),o.lineTo(s.sweep+s.tip_chord,s.height),o.lineTo(s.sweep,s.height),o.lineTo(0,0);const a=Math.max(s.thickness,1e-4),l=s.cross_section==="rounded"||s.cross_section==="airfoil",c=l?Math.min(a*.45,s.root_chord*.05):0,h=new gf(o,{depth:Math.max(a-2*c,1e-4),bevelEnabled:l,bevelThickness:c,bevelSize:c,bevelSegments:2,steps:1});h.translate(0,0,-a/2);const u=nd(s.mat,e);u.side=mn;const f=Cf(s.mat,e);if(e!=="figure"&&f.decal&&c0(f.decal)){const p=Math.max(s.root_chord,s.height,.02),v=u0(f.decal.url,Math.max(Math.round(p/Gl),1),Math.max(Math.round(p/Gl),1));i.push(v),l0(u,v)}i.push(h,u);for(let p=0;p<s.count;p++){const v=new Bt(h,u);v.rotation.y=s.cant_angle,v.position.set(s.axial_start,s.body_radius,0);const x=new Ai;x.add(v),x.rotation.x=s.angle_offset+p/s.count*Math.PI*2,n.add(r(x,s.radial,s.radial_angle))}}for(const s of t.lugs){const o=new pf(s.outer_radius,s.outer_radius,Math.max(s.length,1e-4),24,1,!0);o.rotateZ(Math.PI/2);const a=nd(s.mat,e);a.side=mn,i.push(o,a);for(let l=0;l<s.count;l++){const c=new Bt(o,a);c.position.set(s.axial_start+s.length*(.5+l*1.2),s.body_radius+s.outer_radius,0);const h=new Ai;h.add(c),h.rotation.x=s.angle_offset,n.add(r(h,s.radial,s.radial_angle))}}return{group:n,bin:i}}function d0({rv:t,mode:e="finished",preset:n="3d",raw:i=null,keyBg:r=!1}){const s=ce.useRef(null);return ce.useEffect(()=>{const o=s.current;if(!o)return;const a=o.clientWidth,l=o.clientHeight;tt.enabled=!1;const c=new ww;c.background=r?new Ze(1,0,1):new Ze(254/255,243/255,199/255);const h=new Ew({antialias:!0,preserveDrawingBuffer:!0});h.setPixelRatio(i!=null?1:Math.min(window.devicePixelRatio,2)),h.setSize(a,l),h.toneMapping=_i,h.outputColorSpace=Zn,h.sortObjects=!0,o.appendChild(h.domElement);const u=new wn(15,a/l,.01,50);c.add(u);const f=Math.PI,p=(e==="figure"?.3:.5)*f,v=(e==="figure"?.7:1)*f;c.add(new f1(16777215,p));const x=new d1(16777215,v);x.position.set(1,4,1),u.add(x),u.add(x.target),x.target.position.set(0,0,0);const{group:g,bin:d}=h0(t,e);c.add(g),g.updateWorldMatrix(!0,!0);const A=new Ws().setFromObject(g);if(A.isEmpty())return h.render(c,u),()=>{d.forEach(W=>W.dispose()),h.dispose(),o.removeChild(h.domElement)};const m=A.min,C=A.max,T=Math.max(C.x-m.x,1e-4),S=(m.x+C.x)/2,I=Math.max(Math.hypot(m.y,m.z),Math.hypot(C.y,C.z),Math.hypot(m.y,C.z),Math.hypot(C.y,m.z),1e-4),R=new U(S,0,0);if(i!=null){const[W,K]=b1[i]??[0,0],ne=Math.max(Math.hypot(m.y,m.z),Math.hypot(C.y,C.z),1e-4),le=a/Math.max(l,1),_e=15*le,V=T*1.2/2/Math.tan(_e*Math.PI/360),te=2*ne*1.2/2/Math.tan(15*Math.PI/360),oe=Math.max(V,te,.001),ae=new at().makeRotationY(W),Oe=new at().makeRotationX(K),Ne=new at().makeTranslation(-S,0,0),ke=new at().makeScale(1,1,-1),je=ae.multiply(Oe).multiply(Ne).multiply(ke);g.matrixAutoUpdate=!1,g.matrix.copy(je),g.matrixWorldNeedsUpdate=!0,g.updateMatrixWorld(!0),u.fov=15,u.aspect=le,u.near=.1,u.far=50,u.up.set(0,1,0),u.position.set(0,0,oe),u.lookAt(0,0,0),u.updateProjectionMatrix(),h.render(c,u);let ie=0,P=0;const Ae=()=>{h.render(c,u),++ie<8&&(P=requestAnimationFrame(Ae))};return P=requestAnimationFrame(Ae),()=>{cancelAnimationFrame(P),d.forEach(pe=>pe.dispose()),h.dispose(),o.removeChild(h.domElement)}}if(e!=="figure"){const W=Math.max(Math.min(...t.lathe.flatMap(ne=>ne.outer.map(([,le])=>le)).filter(ne=>ne>1e-4),I),.0025),K=(ne,le,_e)=>{const V=new o1({color:ne,roughness:.5,metalness:0}),te=new Af(W*_e,20,14);d.push(V,te);const oe=new Bt(te,V);oe.position.set(le,0,0),oe.renderOrder=3,g.add(oe)};K(2845951,t.cg_axial,.95),K(14753070,t.cp_axial,.8)}const B=15,_=W=>W*Math.PI/180,y=(W,K)=>{const ne=W/Math.max(K,1),le=B*ne,_e=T*1.2/2/Math.tan(_(le)/2),V=2*I*1.2/2/Math.tan(_(B)/2);return Math.max(_e,V,.001)};let N=y(a,l);u.near=Math.max(N/100,.001),u.far=N*100+T*8,(()=>{switch(n){case"top":u.position.set(R.x,N,0),u.up.set(0,0,-1);break;case"back":u.position.set(R.x+N,0,0),u.up.set(0,1,0);break;default:u.position.set(R.x,0,N),u.up.set(0,1,0)}u.lookAt(R),u.updateProjectionMatrix()})();const G=new A1(u,h.domElement);G.enableDamping=!0,G.target.copy(R);let Q=0;const F=()=>{Q=requestAnimationFrame(F),G.update(),h.render(c,u)};F();const Z=()=>{const W=o.clientWidth,K=o.clientHeight;u.aspect=W/K,N=y(W,K),u.near=Math.max(N/100,.001),u.far=N*100+T*8;const ne=u.position.clone().sub(G.target).normalize();u.position.copy(G.target).addScaledVector(ne,N),u.updateProjectionMatrix(),h.setSize(W,K)},D=new ResizeObserver(Z);return D.observe(o),()=>{cancelAnimationFrame(Q),D.disconnect(),G.dispose(),d.forEach(W=>W.dispose()),h.dispose(),o.removeChild(h.domElement)}},[t,e,n,i,r]),E.jsx("div",{ref:s,style:{width:"100%",height:"100%"}})}function xf(t){return(t||"rocket").replace(/\W+/g,"_").replace(/^_+|_+$/g,"")||"rocket"}function f0(t,e){const n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function p0(t,e,n,i){const r={altitude:i?.altitude??!0,velocity:i?.velocity??!0,thrust:i?.thrust??!0},s=["time_s"];r.altitude&&s.push("altitude_m"),r.velocity&&s.push("velocity_ms"),r.thrust&&s.push("thrust_N");const o=t.time.map((l,c)=>{const h=[String(l)];return r.altitude&&h.push(String(t.altitude[c])),r.velocity&&h.push(String(t.velocity[c])),r.thrust&&h.push(String(t.thrust[c])),h.join(",")}),a=new Blob([s.join(",")+`
`+o.join(`
`)],{type:"text/csv"});f0(a,`${xf(e)}_${n||"sim"}.csv`)}function O1(t){const e=document.querySelector(".viewport canvas");if(!e)return!1;const n=e.toDataURL("image/png"),i=document.createElement("a");return i.href=n,i.download=`${xf(t)}.png`,i.click(),!0}function F1(t,e){const{group:n,bin:i}=h0(t,"finished");try{n.updateMatrixWorld(!0);const r=new g1().parse(n);f0(new Blob([r],{type:"model/obj"}),`${xf(e)}.obj`)}finally{i.forEach(r=>r.dispose())}}const Kg=30,k1=20;function Vl(t){const[e,n,i]=t.figure_color;return`rgb(${e},${n},${i})`}function z1(t,e){return t==="Motor"?{stroke:"rgb(120,120,120)",fill:"rgb(150,150,150)",dash:""}:t==="Parachute"||t==="ShockCord"||t==="MassObject"?{stroke:Vl(e),fill:"none",dash:"6 4"}:t==="InnerTube"||t==="CenteringRing"?{stroke:"rgb(170,0,100)",fill:"none",dash:""}:{stroke:Vl(e),fill:"none",dash:""}}function g0({rv:t,raw:e=!1,rollDeg:n=0,overlay:i=null,onRollDelta:r}){const s=ce.useRef(null),o=ce.useRef(r);return o.current=r,ce.useEffect(()=>{const a=s.current;if(!a||e)return;let l=null;const c=f=>{l=f.clientY,a.setPointerCapture?.(f.pointerId),a.style.cursor="ns-resize"},h=f=>{if(l==null||!o.current)return;const p=f.clientY-l;l=f.clientY,p&&o.current(p*.6)},u=()=>{l=null,a.style.cursor="grab"};return a.style.cursor="grab",a.addEventListener("pointerdown",c),a.addEventListener("pointermove",h),a.addEventListener("pointerup",u),a.addEventListener("pointerleave",u),()=>{a.removeEventListener("pointerdown",c),a.removeEventListener("pointermove",h),a.removeEventListener("pointerup",u),a.removeEventListener("pointerleave",u)}},[e]),ce.useEffect(()=>{const a=s.current;if(!a)return;const l=e?1280:a.clientWidth||1e3,c=e?720:a.clientHeight||300,h=n*Math.PI/180;a.width=l,a.height=c;const u=a.getContext("2d");u.fillStyle="rgb(254,243,199)",u.fillRect(0,0,l,c);let f=1/0,p=-1/0,v=1e-4;for(const I of t.lathe){const R=Math.abs(I.radial||0);for(const[B,_]of I.outer)f=Math.min(f,B),p=Math.max(p,B),v=Math.max(v,_+R)}for(const I of t.fins){const R=(I.radial||0)+I.body_radius,B=I.outline&&I.outline.length?I.outline.map(([y])=>y):[0,I.root_chord,I.sweep+I.tip_chord,I.sweep],_=I.outline&&I.outline.length?Math.max(...I.outline.map(([,y])=>y)):I.height;f=Math.min(f,I.axial_start+Math.min(...B)),p=Math.max(p,I.axial_start+Math.max(...B)),v=Math.max(v,R+_)}for(const I of t.lugs)f=Math.min(f,I.axial_start),p=Math.max(p,I.axial_start+I.length),v=Math.max(v,(I.radial||0)+I.body_radius+I.outer_radius);isFinite(f)||(f=0,p=Math.max(t.total_length,1e-4));const x=Math.max(p-f,1e-4),g=Math.min((l-2*Kg)/x,(c-2*k1)/(2*v)),d=(l-x*g)/2-f*g,A=c/2,m=I=>d+I*g,C=I=>A-I*g,T=(I,R)=>(I||0)*Math.cos((R||0)-h),S=(I,R,B=!0)=>{if(!(I.length<2)){u.beginPath(),u.moveTo(I[0][0],I[0][1]);for(let _=1;_<I.length;_++)u.lineTo(I[_][0],I[_][1]);B&&u.closePath(),u.setLineDash(R.dash?R.dash.split(" ").map(Number):[]),R.fill!=="none"&&(u.fillStyle=R.fill,u.fill()),u.strokeStyle=R.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([])}};u.strokeStyle="rgb(200,200,200)",u.setLineDash([4,4]),u.beginPath(),u.moveTo(m(f),A),u.lineTo(m(f+x),A),u.stroke(),u.setLineDash([]);for(const I of t.lathe){if(I.outer.length<2)continue;const R=T(I.radial,I.radial_angle),B=z1(I.kind,I.mat);if(I.kind==="Parachute"||I.kind==="ShockCord"||I.kind==="MassObject"){const N=I.outer[0][0],O=I.outer[I.outer.length-1][0],G=Math.max(...I.outer.map(([,le])=>le)),Q=Math.abs(O-N),F=Math.min(Q,2*G)*.7,Z=m(N),D=m(O),W=C(R+G),K=C(R-G),ne=F*g;if(u.beginPath(),u.roundRect(Math.min(Z,D),Math.min(W,K),Math.abs(D-Z),Math.abs(K-W),Math.max(0,Math.min(ne,Math.abs(D-Z)/2))),u.setLineDash(B.dash?B.dash.split(" ").map(Number):[]),u.strokeStyle=B.stroke,u.lineWidth=1,u.stroke(),u.setLineDash([]),I.kind==="Parachute"){const le=(N+O)/2,_e=R,V=Q;let oe=2*G/2;oe>.75*V&&(oe=.75*V);const ae=_e+3*oe/4,Oe=_e-oe/4;u.strokeStyle=B.stroke,u.lineWidth=1,u.beginPath(),u.arc(m(le),C(Oe),oe/2*g,Math.PI,2*Math.PI),u.stroke();const Ne=(ke,je,ie,P)=>{u.beginPath(),u.moveTo(m(ke),C(je)),u.lineTo(m(ie),C(P)),u.stroke()};Ne(le-oe/2,_e-oe/4,le,ae),Ne(le,ae,le+oe/2,_e-oe/4),Ne(le-oe/4,_e-oe/4,le,ae),Ne(le,ae,le+oe/4,_e-oe/4),Ne(le,_e-oe/4,le,ae)}if(I.kind==="ShockCord"){const le=N+Q/4,_e=Q/2,V=R,te=2*G/4,oe=_e/4;u.strokeStyle=B.stroke,u.lineWidth=1,u.beginPath(),u.moveTo(m(le),C(V));for(let ae=0;ae<4;ae++)u.bezierCurveTo(m(le+(4*ae+1)*oe/4),C(V+te),m(le+(4*ae+1)*oe/4),C(V+te),m(le+(4*ae+2)*oe/4),C(V)),u.bezierCurveTo(m(le+(4*ae+3)*oe/4),C(V-te),m(le+(4*ae+3)*oe/4),C(V-te),m(le+(4*ae+4)*oe/4),C(V));u.stroke()}continue}const _=I.outer.map(([N,O])=>[m(N),C(O+R)]),y=I.outer.slice().reverse().map(([N,O])=>[m(N),C(-O+R)]);S([..._,...y],B,!0)}for(const I of t.fins){const R=T(I.radial,I.radial_angle),B=I.body_radius;let _;I.outline&&I.outline.length>=3?_=I.outline.map(([O,G])=>[O,G]):_=[[0,0],[I.root_chord,0],[I.sweep+I.tip_chord,I.height],[I.sweep,I.height]];const y={stroke:Vl(I.mat),fill:"none",dash:""},N=Math.max(I.count,1);for(let O=0;O<N;O++){const G=(I.radial_angle||0)+I.angle_offset+O/N*Math.PI*2,Q=Math.cos(G-h);S(_.map(([F,Z])=>[m(I.axial_start+F),C(R+(B+Z)*Q)]),y,!0)}}for(const I of t.lugs){const R=T(I.radial,I.radial_angle)+I.body_radius,B={stroke:Vl(I.mat),fill:"none",dash:""};S([[m(I.axial_start),C(R)],[m(I.axial_start+I.length),C(R)],[m(I.axial_start+I.length),C(R+I.outer_radius)],[m(I.axial_start),C(R+I.outer_radius)]],B,!0)}if(i&&!e){u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.font="11px -apple-system, Helvetica, Arial, sans-serif",u.textAlign="center",u.textBaseline="top",u.lineWidth=1,u.beginPath(),u.moveTo(m(0),20),u.lineTo(m(Math.ceil(p*100)/100),20);const R=Math.ceil(p*100);for(let _e=0;_e<=R;_e++){const V=m(_e/100),te=_e%5===0;u.moveTo(V,20),u.lineTo(V,20+(te?9:_e%1===0?5:3)),te&&u.fillText(String(_e),V,31)}u.stroke();const B=20,_=Math.ceil(v*100);u.strokeStyle="rgb(90,90,90)",u.fillStyle="rgb(70,70,70)",u.textAlign="right",u.textBaseline="middle",u.beginPath(),u.moveTo(B,Math.max(C(v),0)),u.lineTo(B,Math.min(C(-v),c));for(let _e=-_;_e<=_;_e++){const V=C(_e/100);if(V<0||V>c)continue;const te=_e%5===0;u.moveTo(B,V),u.lineTo(B+(te?9:5),V),te&&u.fillText(String(Math.abs(_e)),B-3,V)}u.stroke();const y=Math.max(m(0),Kg)+8,N="13px -apple-system, Helvetica, Arial, sans-serif";u.textBaseline="alphabetic";const O=19;u.textAlign="left",u.fillStyle="rgb(28,40,90)",u.font=N;let G=54;const Q=i.mass_motors_g!=null?`${i.mass_motors_g.toFixed(i.mass_motors_g<100?1:0)} g`:"—";for(const _e of[i.name,`Length ${i.length_cm.toFixed(1)} cm, max. diameter ${i.max_diam_cm.toFixed(1)} cm`,`Mass with no motors ${i.mass_g.toFixed(1)} g`,`Mass with motors ${Q}`])u.fillText(_e,y,G),G+=O;const F=l-12;u.textAlign="right";let Z=54;u.fillStyle="rgb(28,40,90)",u.fillText(`Stability: ${i.margin_cal.toFixed(2)} cal / ${i.margin_pct.toFixed(2)} %`,F,Z),Z+=O;const D=(_e,V,te)=>{if(te==="cg"){u.beginPath(),u.arc(_e,V,6.5,0,Math.PI*2),u.fillStyle="#fff",u.fill();for(const ae of[-Math.PI/2,Math.PI/2])u.beginPath(),u.moveTo(_e,V),u.arc(_e,V,6.5,ae,ae+Math.PI/2),u.closePath(),u.fillStyle="#3552d6",u.fill();u.beginPath(),u.arc(_e,V,6.5,0,Math.PI*2),u.strokeStyle="#1a1a1a",u.lineWidth=1,u.stroke()}else u.beginPath(),u.arc(_e,V,6.5,0,Math.PI*2),u.fillStyle="#d3202a",u.fill(),u.strokeStyle="#7a1014",u.lineWidth=1,u.stroke()},W=`CG: ${i.cg_cm.toFixed(1)} cm`,K=`CP: ${i.cp_cm.toFixed(1)} cm`;u.fillStyle="rgb(28,40,90)",u.fillText(W,F,Z),D(F-u.measureText(W).width-12,Z-5,"cg"),Z+=O,u.fillStyle="rgb(28,40,90)",u.fillText(K,F,Z),D(F-u.measureText(K).width-12,Z-5,"cp"),Z+=O,u.fillStyle="rgb(140,140,140)",u.fillText(`at M=${i.mach.toFixed(3)}`,F,Z),u.textAlign="left",u.fillStyle="rgb(43,63,174)",u.font=N;let ne=c*.6;const le=(_e,V)=>{u.fillText(_e,y,ne),u.fillText(V,y+150,ne),ne+=O};le("Flight configuration:",i.config_name),i.apogee_m!=null&&le("Apogee:",`${i.apogee_m.toFixed(0)} m`),i.max_velocity_ms!=null&&le("Max. velocity:",`${i.max_velocity_ms.toFixed(1)} m/s`+(i.max_velocity_mach!=null?`  (Mach ${i.max_velocity_mach.toFixed(3)})`:"")),i.max_accel_ms2!=null&&le("Max. acceleration:",`${i.max_accel_ms2.toFixed(0)} m/s²`),D(m(i.cg_cm/100),A,"cg"),D(m(i.cp_cm/100),A,"cp")}},[t,e,n,i]),E.jsx("canvas",{ref:s,style:e?{width:1280,height:720,display:"block"}:{width:"100%",height:"100%"}})}function B1({fd:t}){const a=Math.max(...t.time,1),l=Math.max(...t.altitude,1),c=Math.max(...t.velocity,1),h=v=>50+v/a*800,u=v=>220-v/l*200,f=v=>220-v/c*200,p=v=>t.time.map((x,g)=>`${g===0?"M":"L"}${h(x).toFixed(1)},${v(g).toFixed(1)}`).join(" ");return E.jsxs("svg",{viewBox:"0 0 900 250",style:{width:"100%",height:"100%"},preserveAspectRatio:"xMidYMid meet",children:[E.jsx("line",{x1:50,y1:220,x2:850,y2:220,stroke:"#e7d8b0"}),E.jsx("line",{x1:50,y1:20,x2:50,y2:220,stroke:"#e7d8b0"}),E.jsx("path",{d:p(v=>u(t.altitude[v])),fill:"none",stroke:"#ec4899",strokeWidth:2}),E.jsx("path",{d:p(v=>f(t.velocity[v])),fill:"none",stroke:"#3a2a1a",strokeWidth:1.5,opacity:.7}),t.events.filter(([v])=>v<=a).map(([v,x],g)=>E.jsxs("g",{children:[E.jsx("line",{x1:h(v),y1:20,x2:h(v),y2:220,stroke:"#be2768",strokeDasharray:"3 3",opacity:.4}),E.jsx("text",{x:h(v)+3,y:30+g%3*12,fontSize:9,fill:"#9a7b56",children:x.replace(/_/g," ").toLowerCase()})]},g)),E.jsxs("text",{x:50,y:14,fontSize:11,fill:"#ec4899",children:["altitude (m), max ",l.toFixed(1)]}),E.jsxs("text",{x:730,y:14,fontSize:11,fill:"#3a2a1a",children:["velocity (m/s), max ",c.toFixed(1)]}),E.jsxs("text",{x:900/2,y:244,fontSize:10,fill:"#9a7b56",textAnchor:"middle",children:["time (s) — ",a.toFixed(1)," s"]})]})}const Qg=[{key:"general",label:"General"},{key:"shoulder",label:"Shoulder"},{key:"override",label:"Override"},{key:"appearance",label:"Appearance"},{key:"comment",label:"Comment"}];let Es=null;function G1({f:t,materials:e,onCommit:n}){const[i,r]=ce.useState(String(t.value??"")),[s,o]=ce.useState(!1),a=String(t.value??"");if(!s&&i!==a&&r(a),t.kind==="bool")return E.jsxs("label",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:t.label}),E.jsx("input",{type:"checkbox",checked:t.value===!0,onChange:h=>n(h.target.checked)})]});if(t.kind==="enum")return E.jsxs("div",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:t.label}),E.jsx(er,{value:String(t.value),onChange:h=>n(h),options:(t.options??[]).map(h=>({value:h,label:h}))})]});if(t.kind==="color"){const h=a.startsWith("#")?a:`#${a.replace(/[^0-9a-fA-F]/g,"")}`,u=h.length>=7?h.slice(0,7):"#cccccc",f=h.length>=9?h.slice(7,9):"ff";return E.jsxs("label",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:t.label}),E.jsx("span",{className:"prop-input",children:E.jsx("input",{type:"color",value:u,onChange:p=>{n(`${p.target.value}${f}`.toUpperCase())}})})]})}if(t.key==="material_name")return E.jsxs("label",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:t.label}),E.jsxs("span",{className:"prop-input",children:[E.jsx("input",{list:"opsrocket-materials",type:"text",value:i,onChange:h=>{o(!0),r(h.target.value)},onBlur:()=>{o(!1),i!==a&&n(i)},onKeyDown:h=>{h.key==="Enter"&&h.target.blur()}}),E.jsx("datalist",{id:"opsrocket-materials",children:e.map(h=>E.jsxs("option",{value:h.name,children:[h.density," ",h.kind==="bulk"?"kg/m³":h.kind==="surface"?"kg/m²":"kg/m"," · ",h.group]},h.name))})]})]});const l=t.kind==="length"||t.kind==="number"||t.kind==="angle"||t.kind==="mass"||t.kind==="int",c=()=>{o(!1),i!==a&&n(l?Number(i):i)};return E.jsxs("label",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:t.label}),E.jsxs("span",{className:"prop-input",children:[E.jsx("input",{type:l?"number":"text",step:t.kind==="int"?1:"any",value:i,onChange:h=>{o(!0),r(h.target.value)},onBlur:c,onKeyDown:h=>{h.key==="Enter"&&h.target.blur(),h.key==="Escape"&&(o(!1),r(a))}}),t.unit&&E.jsx("em",{className:"unit",children:t.unit})]})]})}function yf({fields:t,onCommit:e}){const[n,i]=ce.useState(Es??[]);return ce.useEffect(()=>{Es||fv().then(r=>{Es=r.materials,i(r.materials)}).catch(()=>{})},[]),E.jsx(E.Fragment,{children:t.map(r=>E.jsx(G1,{f:r,materials:n,onCommit:s=>e(r.key,s)},r.key))})}function V1(t){const e=new Map,n=[];for(const s of t){const o=s.section??"general";e.has(o)||(e.set(o,[]),n.push(o)),e.get(o).push(s)}const i=Qg.map(s=>s.key);return[...i.filter(s=>e.has(s)),...n.filter(s=>!i.includes(s))].map(s=>({key:s,label:Qg.find(o=>o.key===s)?.label??s.charAt(0).toUpperCase()+s.slice(1),rows:e.get(s)}))}function H1({node:t,onPatch:e,busy:n}){const[i,r]=ce.useState(Es??[]);ce.useEffect(()=>{Es||fv().then(u=>{Es=u.materials,r(u.materials)}).catch(()=>{})},[]);const[s,o]=ce.useState(null);ce.useEffect(()=>{if(!t){o(null);return}let u=!0;return YC(t.id).then(f=>{u&&o(f.mass_g)}).catch(()=>{u&&o(null)}),()=>{u=!1}},[t]);const a=ce.useMemo(()=>t?V1(t.fields):[],[t]),[l,c]=ce.useState(null);if(ce.useEffect(()=>{c(a[0]?.key??null)},[t]),!t)return E.jsx("div",{className:"empty",children:"Select a component to edit it"});const h=a.find(u=>u.key===l)??a[0];return E.jsxs("div",{className:"prop-panel"+(n?" busy":""),children:[E.jsxs("div",{className:"prop-head",children:[E.jsx("strong",{children:t.name}),E.jsx("span",{className:"k",children:t.kind}),s!==null&&E.jsxs("span",{className:"mass-readout",title:"Component mass",children:[s<10?s.toFixed(2):s.toFixed(1)," g"]})]}),a.length>1&&E.jsx("div",{className:"prop-tabs",children:a.map(u=>E.jsx("button",{type:"button",className:"prop-tab"+(u.key===h?.key?" active":""),onClick:()=>c(u.key),children:u.label},u.key))}),E.jsx(yf,{fields:h?.rows??[],onCommit:(u,f)=>e(t.id,u,f)}),E.jsx("datalist",{id:"opsrocket-materials",children:i.map(u=>E.jsxs("option",{value:u.name,children:[u.density," · ",u.group]},u.name))})]})}const qg={BodyTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAAZiS0dEAO8A7wDvwcyDBQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAIASURBVDjLnZQ/bxNBEMV/ezN3570LdnzQ2AUuqNLjPh0fIU1akCiRa75DGlLzdTCVC5dQIJRIyPLJ55wv539LY5+dOEQJI620ejNv3mr2aQzwxhjzJYqi0Pd9AJxzGGP43/gXvyzLsiiKD8AvBT5dXFy8G4/H9Ho9AGazGcYYoig67GrAcNh0X6gsS+ZlyYt6/Q7e7/c5PT19D3z2Wq1W9/z8nMFggKqiqtTrdYIgoCiKCquO6CGmioggIqgqcRxTbzSYTqeIeFWu2+0Sx3EXwGu3223fV8qyrApEhCiKsNaS5/kdXETwPO8A24pu70EQkCQJk0lW5Wq1Gp1OpwOgYRhGi8USABG5M5ptozzPaTQaz/5rz/NoNpukaUqSJAA0m80EQJ1zbrVa4ZzD8zycA3AVOQxD1us1WZZxdHS0MxBuv2zrqgMIII5jRqMRx8fHqGoIoEVR5CLyEmC5XFLJul0L3/dZLBZkWfaw4TZOfgy31pKmKavVagmgo9Hoj6q+3hd+iLg1283NDbVa7UnC9zHf90nTNAPQq6urH1mWvRWRR4W3xNvbW6bTKdbavaLN6J/wkOvr698Aul6vv11eXp6dnJwcCD9EFhGcc0wmE6y1G1+4J01gOBwyHo+/b9YBr4wxX621cRAEz9pO9xdHZTCzm8R+zOfzeVEUH4GffwHkPeL5cv7alQAAAABJRU5ErkJggg==",CenteringRing:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NTM6NTcrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyM2M3NTYyNy00NjNkLTQ1M2UtOGU4My0xZWUxNmE3ZGMxYTciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzYzc1NjI3LTQ2M2QtNDUzZS04ZTgzLTFlZTE2YTdkYzFhNyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XXjx4gAAAl1JREFUOI2NVEFrE0EU/mYnrSGb1MYkq7BJCwWpOVTwYFHYeKvNdSXgxRi9CMFCIT/AEk9eethjb/ZsqRfBYC8FQ3oXsdhTJSbZJqVpwYrN7szzYKvJZq1+8C7vffO+N2/4hhERvFh9uaoz4JZ2RXvSO3Fvdw8PIl7O/v4+6vU6UqkU4vH4UA8AiMdinQvB4JuvjcaLR4XCzkCRiIbiDJLosST5njyo1WqUy+VoZWWFcrkc1Wo1L+UU8i2RNP10Ar6jnoKBXIAp/TkhBCzLwsLCAgBgenoalmVhdnYWnHO/NiO+vf1W/bxcDhFgTExOPnV6vTutVmvcyxFCoNlsIp/PY3l5GVNTU4hGowMcXdcPxsbGXm1vbz9bWlpq99d8b2zeM78DeJdMpm64wr0qhRwSBoDFxUUAgKZpMAwDmUxmoM45b3HOd9Lpa23v2b+u2rbtYCikxhzHUaWUIAIYA0AEAgNjQDabBQAYhoG1tTWk02kAAGMMAKAoSnh0dOSybdvBmZnrP/5LWAoZOux2tePjbyFXSPxR/gUCUKlUUCwWUa1WYZomWrYNhTGcjgbOFTWsqjpJCgP4t/D6+usIGN2c0CciJ04vsLe3N8QRQiAcDgMAOp0Otra2ht44mUwq0YvjJx8+fQzcnZ8fbHCenYjkfSKq9BvEdV0yTZM2Nzd/h2ma5Lqun52qRPKBn865dgLgeBOcc5RKJViWhbm5OWxsbKBUKvlaiQAJMF8NXzud/VyXErGHriMyR0eHUS+n3W6j0WhA13VomuY7dSKR6KpqqLK7+6VcKBQ+99d+AnPTc/jWuLHGAAAAAElFTkSuQmCC",FinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVDhPnZSxboNADIZNBoREFlgrdgjN3KYTM8nCMyDxALxAO/AejdQhD1A6NF0yoKICI4g5ezMwsvTqI1ZVKbQcfBLy/db5jO3TSTABx3FMNPVZCXNzOBwyWo8Hk87xq+M4ZiIURcFw/xuF/zAjO4ad67rmer0m+T9JknDz0olfjEqMf/5gWdYmDEPyDJOmKTdxJ6aASTee57HT6URNHOZ4PPI2994FoYox2FRV9TmKItB1nbzDUJt7qx1MjEnnhmHUvu/DYrEgrxjU5ov5ckQq3vGE2GaSYjRNA2VZfuKyK3sU/DIFQcDatqWpibPf7/l8n+ioC/6sGIM2mqbd87nKskxecbKseyteO9GDtH3cXuHzdctmsIIv6Q4ktsrzHKqqoi3TsW0bltdLpigKlylI8A4MLcDHN21D3HmiXpQrAAAAAElFTkSuQmCC",InnerTube:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFvSURBVDhPvVTBSgMxFJwWWv2HhV7Wj7DePPQgXhRKUXqxX7aVHorgH7RQ+h8eZLHg0aSUxlY3zssGzdqtFCsOzM5sQt7khexWEKCf9CMOHNsqmsgqJxZZ00/9Gr1er5DxI6y1bXJI7oUkSSbkyJctoHQ3XHNJuSI7Sil0u103vlgsnO6K8XiMwWDwTNtk54/5aI5twRew6HD2ejqdYjTKN91qtZzuCgmO4/ie9o7Bop+oev0Gm/EhxGw2Q6PRcDRmiSVpjKEKQ29glqQfE8oa4oE8EhNiSzD7reSnsVqtUK/XHbWaY04qranC0CuouYaSMb4La7WalHglD8WEKA2WVAu8i5dACRcqzeIM0lKYGnrNOfFOnX/Ber2WEgfkm5gQpcFsNSOZDURRhDRNHb+Keg28dOre2bV2m1JuDSHHLMddQOnlyqw950Sb9uYPbvUT7Skv10b4Bnirz6zNbuVb3Af+O574sgUUOv6/PxfwAcCqiakft+coAAAAAElFTkSuQmCC",LaunchLug:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAI4npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja1ZhbduM6DkX/OYoegvgAQQ6Hz7XuDHr4vSHLrsRx6pZTX21XJFmiABAHOADKrf/+s91/+ESfskuiJdecDz6pphoaF+W4fdp59Ec6j7cf63rmP993R78eBG5FzvH2s+Rr/f2+fwi4nRpX8kFQGdeD/vlBTZf88iToUhTNosDFvATVS1AMtwf+EtBu2zpyLfpxC/3a2vX+zQ3FtsYh6in7IeT5d1K8N4WbMYQVfTw4xngZEO0vuNi4EI4hRlvIssZf5SjRX5bgkFd+enwqFm0zNb1c9AmVx9UTWnL30TNaKVxL4pOT8+P88r7z8hqV0/UfNKdyXYXP9/e4RZs7nrxvf3vPss89s4uWMq7O16buWzyvWEcUJlNdHKblQ/kTROj5rXwLegaozWMQsp3r6gNwbZ/89M1vv87z8AMTU1guKBchDOCymyVqqGGApI/Jvn4HBcMZC4iOE/YUw8MWf6qtx3CntoLm6VkaPMK8xcW7X/fuC3tbKnhvvgR6f8M3BHM2ZhhydmQZiPh9OVVOB9+/zx/DNYKgmJctRSqO7TcRXfwvJogn0JGFwvmWLl7nJQAXoVowxsNHHtR8FJ/9oSGo9ziyAFDD9BBT6CDgRcLEyJBizGBTgqnmFfXn0iCB2477kBlISMxRwYYsA6yUhPjRVIihJlGSiGRRKVKl5ZhTlpyzZiPFplGTU9GsqkWrthJLKlJy0VJKLa2GGiFNqblqLbXW1tDZkNx4u7GgtR567KmL67lrL732NgifkYaMPHSUUUebYcYJf8w8dZZZZ1t+EUorLVl56SqrrrYJtR3dTlt23rrLrrs9ULtg/fJ9AzV/oRZOpGyhPlDjrupdhDc6EcMMwIJLHsTVICCgg2F2FJ9SMOQMs6PCeFECRophNr0hBoJp+SDb37Fz4YaoIfdXuDlNn3ALP0XOGXRvIvcVt1eoTeO7cSJ2y0Jz6hHJPp6v0kJpVuy+nN13D949/z8K6q2R+0lhbjzffG0ZPk5l9k50wq97jKTZxXR4sPEye51HTOPQveIk0pETIiDMoJsKUevecU27X73ve+RyxFLR1PNecPaMcS+1N6/3PMXIt6x77I7QlLK9bFV7hVzaYmk3jadIAN+jlLndiumhEJhN5SuFH/Q9LP2k0V0qXyk81RFUpvCjvpcbdF8U/nCDbn9R+LMNuk8q/2KD7huFlzqNvW2pw0Mgo/rZWx7JmAzmShvCWX0ntI/u2hl89Iy/P8dplX/uw6xIbeY9IszSyhxzyGrJzZj3HN33VsQXzRxGq2sQ0bOT9GnVDoW1mrcf257HWMJYvUIluntfW8bU4uC13aGmfQypsw+li2CxrqOHOnZYQyGi1WfrPGheGtfLlw5LLSypNeTadbklMOFBR7oGTWg90obx++RyWDWpUmgIKqwWbVM66SKKaELW4GK3kNtu+M8p7K0Cx0KPjYa9gB9kRtPVaaekNV2xaFy+zkw5CD2MVH2ftjzhnzqYP0DBeTjVUPO7gMzGn1ysFaB4gSeBU3ZNfmSr+8QETaycVrF7fwuAPadAtQvc9YyUJN7ORzNICIGI85rueXaUUG0pbacgsUL8/IxnVN8lun0TeJd3SbvLMrb+IM1eNGmEIdtYKcc2ky7t2pw1t+uMjuXT3EWJct0qaW824s+X6XZIgFD7PtZp+wavM5mI8xOEFRzuGRsim/RMp+i75C9yKeinZHb1WfIp1yH4JnaFb2X+ibXud+a+Y637nbnvWOt+6txnye6nzn221j2by7Axcx8HUUfek6k7MyBshQoHa2jSZ6pLkl/jTPx9RveIrsKVYokEuay8SdKwJpMJQzTdSJy31O9bDqwRWg8hcQUWCmn1kGoZxUYntc5/URBRvfrIJKWWDCeWPNagWJa55sx00hn6SR2SmIWuRhicmI/gXoHrZoOPHm8tqGVFrBf6qloLc20Y5MlxpTX7XKgzdiKzV+9H6oGui1KeRbar5xjSK5kEZwkOKf/WMmxY4sgGDNaCEduo23XJY4L8Euu7ipkAjW7oCkce4FhIaO/XPMLUBI6BncRBSYFSNkNFxqVDIP98rNj4B+8GtHTgNBy4DYNPaGDDUzRrEOuelJgWafkCr7Y8KSKry6QftdrfqGuzDIVMaRE79KKYF808D3qUr0wXi6btaT8JJ4mtDcCrZl6l70ajurkHNFqWRuhIrUotAs73fEYyi2GtXkofto+o+AFlhcmZSOpryjr5q9JE2PJoQ3WSM/iJAd0pbhpfyGzmdKu0XC7Nqx6dLeLYOTIRUHYvoEjdc7MVChGOrIQ7wy+Nbasn9dpUfCaKzBsFE+ebgDyfQfqnWgAgoNpYrvaplB5l+qNv2DxZFXv7717VSyP0bjqtoVCH0m7/v6HcuwtK+r5I90vm34l0r8z8iUj3+53/uUj3p878N5HufXxei3R/A/lDJInn2i5QcbdpszaSY9SVGQFt6BqDaWDQl5Bq0CQ04GWYBjq+Vr0si/GYochE9sNFpGfOEeU0qGQ4nYvCVB6az0atUSgH2aQvli1aRxo3+y8NyA0ygPGm0GiFcxM5y2R4JP09g+FKNuX1tCaXpLJaHkWcUMhzbxzRNmPzrh3ReYr02Gm06EBW3JB64A501Kk+Z2Wgb20tCZRAj/TYQ2THu44Y/Vhqzcrk3ewdgzvVKBmbfzhDqpVe3T9YtrdE1zeSZ6aO9MiSdyBBvSbIvrUynFJSmGqVWrTsFbzNeAx7rBgofWeL1W2DjFt1+zCN3Wumo6KihUiv3isjPs2o321GSoT1nzMZlSAGx8UBAdN/WXzEE/0X98VGPYhkivu1gu7sm3efnvx6+4N4957e79W69/R+r9a9p9cqQk1SbaY6kejLVuNwl1tZRFsjjksiSUg0rTL0jkn55n6n+aaNCWeqodKaiBo/qHiAfSP818809CQmIegQOnlqLM6+L7nZeETpM4UwE0WbGVCEFCC1WooMXdRYylOkMUre9tuybykwi1WXCO1XjQLxVt3/AKNhqGvPP0ciAAAAZnpUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHjaPUoxEoAwDNrzCp/QQKrmOb3Wwc3B/59cBuESCMTu5522FWI3noHIWC3EH4DPBh6yg2DTAEvatUFWO9VeupyDbkxJp9dDRUz7APYTF2U6KKwlAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9biyIVBzOIiGSoTlZERRy1CkWoEGqFVh1MXvoHTRqSFBdHwbXg4M9i1cHFWVcHV0EQ/AFxdHJSdJES70sKLWK88Hgf591zeO8+IFgvM83qGAc03TZTibiYya6Kna8IQ0AAQxiTmWXMSVISvvV1T51UdzGe5d/3Z/WoOYsBAZF4lhmmTbxBPL1pG5z3iQVWlFXic+JRky5I/Mh1xeM3zgWXgzxTMNOpeWKBWCy0sdLGrGhqxFPEUVXTKT+Y8VjlvMVZK1dZ8578hZGcvrLMdVqDSGARS5AgQkEVJZRhI0a7ToqFFJ3HffwDrl8il0KuEhg5FlCBBtn1g//B79la+ckJLykSB8IvjvMxDHTuAo2a43wfO07jBAg9A1d6y1+pAzOfpNdaWvQI6N0GLq5bmrIHXO4A/U+GbMquFKIVzOeB9zP6pizQdwt0r3lza57j9AFI06ySN8DBITBSoOx1n3d3tc/t357m/H4AbdtypbcnsuwAAA0caVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjU3ZmUyYjRiLWRiNDAtNDRhZC04MTA1LTYyZGYyMjVkZjZhMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTAzZTBiMS1iNjA0LTRhNjMtOWJhZC0yNDdkNTQ0YzlkMzMiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjRhYTdjYS05Y2Y3LTQ4MmMtOWRjOC1jMjA1NDg1OTYyZjMiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjUzMzU1MTkxMDQzMDc3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzAiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODAxYThlNWItYTBmYy00ZGZiLWIyZWEtYzYyNWRjZDczZjBlIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKE1hYyBPUykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMDUtMjNUMjE6MTk6NTEtMDQ6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+H5zV7AAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YFGAETM4556IwAAACzSURBVDjL7ZIxCsJQEERnIZ3kBDaCKFYeRI2kCr8PBI8kgZwiSPAA3kEUKw8gqcI3fxkrCyFg0AgWGVhYhoXHzi7Qq9ePJE3marGiqnYCKPaFtAKn25TPPo7jr6BZlgEAkk0ib4fDdUhbWZrI0FaWWiu1Vpa38qMykeFfbdwYQbAM2NUT5bu8+cYCmVM4BjETYEpgAmDkD/yhc641wDkHz/NePHu3IHmg8AziJMCRwAXA9QFOU34mj8JFigAAAABJRU5ErkJggg==",MassObject:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDE6NDU6NTgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWEzZGUzNy1kOGM0LTQ5MWItOWYyZi1kODhmMjU2MzNmYjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1YTNkZTM3LWQ4YzQtNDkxYi05ZjJmLWQ4OGYyNTYzM2ZiMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0Mzo1NyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jexemgAAATRJREFUOI2dlL1OAkEUhb9L+IkJWvsItg4Wa2ICJYXhHXwLGyyk8EW2pjKRggI7EsPUPoAPQKHOZVcYi11IDMzu4km2mXvnnL35Zka894QkIntrxphz4A2YArfApbX249D+Iu9asBJWH5haa++A5zz8aEnZxMaYOpAe4Xlqrf2E4onrFYyugPl4PI5+1htarQZ4DyIIf1EMBoMJcANMykyrBPeAmVMXpUnC99fhpnb7DOAV6FYJrsK4G8fxvTrFafhTdcRx/JT/aKkKJ875RqoOXSWkaRLsbdR3VhfGmPaW87+Cyfi+L5fLCBH8Zh1sdE6pZcznVOBcFtwDZuo0EgGkgIx3SFavxLnwOnU6nZfR6LGvuiIL3n9Qtmo2G7tTPhw+zK2114VXtSQ4XCzXyWKx0FDxF6gHi1/NNGqOAAAAAElFTkSuQmCC",NoseCone:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABIAAAAAQAAAEgAAAABUGl4ZWxtYXRvciBQcm8gMi40LjUAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjI6MDc6MjYgMjI6MDA6NTcALR08jwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA7BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMi0wNy0yNlQyMjowMTozMi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDctMjZUMjI6MDA6NTctMDQ6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDIuNC41PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoLuYz4AAACM0lEQVQ4Ea1Uz4vaUBB+iVmLGpQtrhHdgmyD9UeMB/VQQ7eltSLa9lC8aHD1JgUR/4D+A3tb7/4D9ip73UMvnqRgBW3poYceexKKKMb0e1JDNki7u3TgkTcvM/PNvJnvMeSWkkqlDubzeRxuMZZlTzwej7xYLI5sNpuwXC7dHMcdbjabA7ogZDwec7DVrDCM9cCqi6J4zDDMKQI+A5CyXq8f2u32716v90exWHwhCALx+/2Efulyu90EtgSJkEwm8w1JidaY0+kUFnskEok8hvNbAL7RNO2+z+f7oqqqIssySSQSxOFwPIIbXX+VQqEgSpJEKpWKYQf9KxTNAA6HwxEcnKEqFYup1WoP8vk8SSaTBAl4Dc9bbCjoZDK55oEWfALW2RYYmyv0Q1IUZdJut4/j8Th7zfqOCuKQfr9v9tZLpdLRYDBIkGg0qqM6fTab6f9bMGw6bswcdtPr9T6g0EsOjWbQx6tyuSzxPP+z2WxG6RUHAgFzpnfaj0YjWpjZVx8OhzTwpXmqWQzVS/RAdTqdNSQzxrXLuVyOhEIhs/ON991ul6Bc0ul0dj56Op2ego7vzMC7nwQUuocBe46DV+j9aySDy+A/1+v1UzpsdLopbf4l1WqVtFotks1mDVNc8/tgMHi+F9iw+rPZcdnlcj1FQmlwMwye/orFYgLlMOhm8BgPypbHlMuNRsMaaqvT9t4IeJ83Mg/i/ARt+IjvBZI5XK1W9NXi0Sb6cj3Boi/XXozff/ULyDkzp7EAAAAASUVORK5CYII=",Parachute:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPlZM/aBNhGMafXHJJCOQOy6V1zJhFkKR0a4jg0MFBUKyDg3FSrGAHFaujIOqg0opOxsEhQgUHQQfBQDbp5uIYHKomwZjL3/Yudz7v9SJEmzQ+8OP57vv3fO/HdwFMqVwuF6KdJqfIPEkSxONxdLvdr4PB4BM/X5PNUqlky9gkTRXMUAlcJ1vF4qsTtVoVCSOB7W/bmDk0g1a7hdnZOSwvn3nLOXKoKwzfpI/VxGC/ygKZ33iykXJsB41fDYTDEUSjEdRrdRgJgxX34DgD6JoOJaRg5fLKF67ZIvlx1Qd931fJZPIxLbV2ay1tmiaq1So6nQ4s20KrZeJnowHL2kWv34PZNNFsNr12Nps1yuWyybVHK5XKO2+zvzS2YlZ7nnYjfyGfguNi17ZhWxbUUAguBxzXwU5/BxFWrgQUbyOLc0KqijDnsBOF5wWp/B6rfkEf0b7BDJ2jfd/72pOmaV61fER+D6DrulflUMFgELFYDO12G64rx/ujwwz/4bc9Kb6PyJ+0IE0ip15Mp9MqQ1fZLnI8IEjosC39Mp7JZFSGLvrrZP2Cv9+IJj4ukX/lD8gbcpN8JKvc7APHXAmlH2ffQ3KM3CUnyTWO/XPFQx0YLOLGBk3Cl8gzcpYcIRZRyWdSJBfJeyKhdfpYTRU8FA+Qoz0lGnlJrpP75ByRV3yJgXK9B+q/gkXMjtLukKtEfkd5bY/IbWb26VMI+A2/H99bU6xH7QAAAABJRU5ErkJggg==",ParallelStage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAFIXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7VdZluwmDP1nFVkCkhASy2E8JzvI8nPBru6u7n7zS34SUzZYyGi4kqDC/OvPFf7AxSQpJDXPJeeIK5VUuGLg8brKeVJM53m9pHuOnukhtnuCQRL0cr1avfkr6Pr6wUMGtWd68HuG/V6IXhY+l2zJezzeKgk6X/SHhqHMa5CL21tV271Qf5jir3d6Uevq9nt4Ihi8NBSChHkKSTxPvzSQfZNU9IYni4KPpJyxB3RJHrbCIU/mPfoY3zroycmPUXjvfe+fO5/rzSHvfJkfqOXPJ0jf0eVFPr8VLC8a8fMErWgfzLnvtYavNS/rasrwaL4j6jibHsuAEVGV5HyW0Qy3YmynFTSPNXZAPmJHBDaMCyGw4wqUaFClRfP0nTpUTDzZ0DN3ALVpLsaFu2yc0m602IDYEAdmnWcQAZlfdKEjtxx5nRySB4GVCYsRPvliC1+b/JEW1tp4E21nAnq6AOYd11BjI7ef4EoHiAs3PQ5+tBv++CawEKpAUI+bHQbW2K4lmtJrbMnBWcCn6K8UomDjXgAugmyFMiRAIGYSpUzRmI0IfnQAVKE5S+IGBEiVB5TkJJI5GDtv2fjG6PCycuZNRm3a6SMZueU7pwBWSor4seSIoaqiSVWzmnrQojVLTllzzpZ3kasmlkwtm5lbseriydWzm7sXr4WLoAZqycWKl1Jq5VAhqGKtCv4KSuMmLTVtuVnzVlrtCJ+euvbcrXsvvQ4eMlAmRh42fJRRJ4WJSjHT1JmnTZ9l1oVYW7LS0pWXLV9l1RfUblQ/tB9AjW7U+CC1+ewFNVCD2WMJ2uVEN2ZAjBMBcdsIIKB5YxadUuKN3MYsFkZSKENJ3diEQRsxQJgmsS56we4Vue/CLah/F278LeTChu53IBcA3UfcPkFt7H2uH8SuLNw+jYLsw/z0Gtjr3tTqr/b//kJzrE4DoJhpTakuo1xQuU8plVQCeRYftXUTHdEW0CtlrRRnSwseaAu/iSpNUwknjto29SNXuNh+foHH9+FXF3jMhJ9aQFGB0mCEiK/kbVhqMG1TnTrCsGNfdoTiwqEALl7C9bg7xm/34XsZTy+IzFhns2oZ8a69xTFGRxJhO0LgY/vybsCuSosrizaYE4tOh32yjpHY7FBRuPVxAmKlQ3XEQdI9CmUNMPjxwPFeZzgIO2Zf89AS2+5jXZKOVvDN4eU2yNa0deYD6s9arnSYbyV2DqE7SiDBntV4KHE0wOzWARqEVxVA3ErcKjwp8Cz+yIZZqEMjWU8Nkb5CVXhLSMechVFxhiYreQqnWqI0tTLHPnDumPhaH77F8L39/wv9FxeiIctNuoSSUXpmWazYtRI2U2xiFX8pfODvEs6CMjotrcN2ctBKHckxl538soFqgB5HshjMURtqnyhOXhTH4jmjl94nohyhHqvRCe/calzgGiLYxljyyUNbkNAzMinQrnjxmrc2TiKOlU/q9jSuZHaZ5XwoyKST+6ud4jE5t2z7JWxdUSNgSrUrn8FBVfbkF+YgIX8wNLy19FSjuCpk9GXtaNXmOP7wUkd5b9vDMtDDpxPY2D9YfNl7W3vbell67Azr1cyt6KsdxwdvbPwwc1m4y+22MZx6fJl5bEQd3GjqsrOfNB0ycU4hiEP1w5mtz0qlGJX9nU2t07ew8Lk0RBOOS6VaLzXpxNkb55p9aIp7U8tZOeEsa9jF8OfbSlEKvydB/rGFAMiA7eFvliENZp9IYd0AAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlIhUHO0hxyFAdxIKoiKNWoQgVQq3QqoPJpV/QpCFJcXEUXAsOfixWHVycdXVwFQTBDxA3NydFFynxf0mhRYwHx/14d+9x9w4QGhWmWV3jgKbbZjqZELO5VTH0ihCiEDCIUZlZxpwkpeA7vu4R4OtdnGf5n/tz9Kl5iwEBkXiWGaZNvEE8vWkbnPeJI6wkq8TnxGMmXZD4keuKx2+ciy4LPDNiZtLzxBFisdjBSgezkqkRTxHHVE2nfCHrscp5i7NWqbHWPfkLw3l9ZZnrNIeQxCKWIEGEghrKqMBGnFadFAtp2k/4+KOuXyKXQq4yGDkWUIUG2fWD/8Hvbq3C5ISXFE4A3S+O8zEMhHaBZt1xvo8dp3kCBJ+BK73trzaAmU/S620tdgT0bwMX121N2QMud4DBJ0M2ZVcK0hQKBeD9jL4pBwzcAr1rXm+tfZw+ABnqKnUDHBwCI0XKXvd5d09nb/+eafX3A2kDcqMkOXVkAAAQqWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MjhmNDZjZjYtZjkxMS00N2VlLWFjMGYtNWZkYTVlMzBkMzczIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmUxNDJkZWQ0LWNkY2UtNGIwZi1hNTNmLTAyY2Q3OGFlODg2MCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA0OThlMDJlLTZiMTAtNGUwYS05MDkyLWI0MGYxYjg5ZWIyNCIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjI3MjY2NTI3MDEzNjk3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMTgiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMSIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIgogICB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA3LTE4VDAwOjAxOjAwWiIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDctMTlUMDE6MzY6MDFaIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjNlMGIwMjYtNDJiMC00NzM2LTk2NTgtYzE0ZWZhNTY1YjQwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iLTA3OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Psyk3REAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBxoCHC4+/M+GAAAAVElEQVQoz82SMQ6AMAwDL9CRZ+ZZ+SQTUoeGha1IGLVDPVpJdFYMC+oCKtAAirLh7vnmR0TnmUiR4pxNz28/CT7vbayu6U9Ra4NYm3004fHQJ3AC3JijD/oG3iWyAAAAAElFTkSuQmCC",PodSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAACWSURBVCiRnZHLDcUgDATtV1aohTNdkS4oAIkD9JAOuFHA5JJI4ZMc3koWktlZW6CArKSqALq6+70BpRRR1WWi/jPpFfrScr3WGjFGWmvLxAmqtWKtlVqrXOcMAl1570kpAZBSYt93Rs80yRgjIQQ5jkNCCLJt27zf9RBdWs4Z5xw5565/+0REKKUwgmM9fQp8/slTt+8EQCyqrvdmJ/MAAAAASUVORK5CYII=",ShockCord:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVDhPrZNBaBNREIbnZYUIkXbTBJLiRWwl9FK6C4FqbXvooVoQpOBBJLdg25PXLYjiLZBCC7nYmrpBFDwIvXgQPQkBj22JPaxCSLw0aNpuD6EpTbP+k13TbpMKtn7w78yb3fdm35t5ghzMXdMyd0wqFgpU2izR6vraLMKZRCJRsr/4v3gcS3KnLPar+2Pd4e4nA6ryAaFRaEVV1VAwGHwMfYEsaBXqbUw6B80dM98Mo79ONCQE3RB1Gl5KvzjMZDJX8OoVtFwul7NIGoc/BT/Kc9qhadojmAV7RDQyMkoTE7dduVwDwzAuw1xHeIjIGtZ1PVepVNZTqVRzEQbJv8PcQ/I1O3IEkg7AfIJMbVbrFRZl6x7rjb/D/7zxgUPzqB22oB0k3YYtQ0WfzyfzixO8h27Zbgv3obdQdS45N2MJ6iJLtKzhShyJRKowvyD+AZNjp/AZ4h5oRx/E87O1Wo3HXTjWADvHObljBpOwY0E/4T+A3jWibrLQoO220MGPdDo9DRO20LdYL4BbM8bxP5ySWGzpL/Vr8E1cp692+AjUlstQQK1v2hEbjC/kcrkDJH0aj8efcQy7vYinjFq7jrslcSgc2vtRLH6EyzW80wi2ZxlK8tWCBqF5jDfz+XwUSflnA5IkOUcsAnWu9TFcXf0v8O5gktBdiPuBG27R6/WGYrEYl+cSujoIy2zguF/Lnf6EMz574r+BKzUO8xCalCQPXe3pIUVRSFVUJx/Rb0rvpw+X1b9ZAAAAAElFTkSuQmCC",Stage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAPBnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZppdhw5DoT/8xRzBO4gj8MFfG9uMMefD8ySZMlyj3vcrqdasjKZWAKBAMtO//Pv4/7FvxxidLlIq71Wz7/cc4+DN80//8Z9Dj7f5+eDvr4Ln487P19fRA4lXtPzsdXX+W/Hw/sCz8vgXflhobZeX8zPX/T8Wr99WSg+L8kssvf7tVB/LZTi80V4LTAet3ztTX50Yb5ce13/hKGZazzl9tnsnz4L0duF+6QYNYXkeY4pPgYk+wsuDd60+9w5Mdz3JQnPvH8tRkC+i5P/wSr3NSvv775kpezvk5Lqc4bjwOdg1vfXb4+H8uV4eku/hfiHO6f1ehc/H9/N61d33v7O2c2do493I1dCWl9Ovbl433EiaMvpXlZ5CH+F93IfnUdzoHeR8u0X0Jy87yGSlhNy2GGEE/S+rrAwMUeNwmuMi0TZsZYk9riSd+Qm2yOcKKmnTdZiWqQ3cTS+2xLuffu93QqNG+/AmTGwWDAoOHv6Jx6/XOgcg3wIFkxSH25+qHJLQ7AoJnvmLBISzhuOyg3w2+PrP8trIoPlhrnh4PDzWWKW8MKW4SjdRCdOLLw+tRZkvxYgRNy7YExIZMDXkEqowUuMEgJxbORnsFCLKcdJCkIpcWNlzClVktOi3ZtrJNxzY4nPYTiLRJRUKaRGgga5yhAb+JHcwNAoqeRSSi1SWull1FRzLbVWqUZ+Q5JkKVJFpEmX0VLLrbTapDXXehs99gQ5ll679NZ7H4ObDlYeXD04YYwZZ5p5llmnzDb7HAv4rLzKqktWc6uvseNOG57Ydctuu++hQYGSZi1aVbRp13GA2kknn3LqkdNOP+M9a8E9af3p8ftZC29ZizdTdqK8Z41LRd6WCEYnxXJGxmIOZFwsAwA6Ws58CzlHZ6mznPkeqYoSsbJYcnawjJHBrCGWE95z95G5T3lzOf9R3uJb5pyl7p/InLPU/SJzP+ftm6xt6zbLJ3czZGVoQfWJ8uMEbSO2YU3tt1/dL0+Yld6YAmsesp3TOT3IyftgR2mknyIkMbrPSHKWa5xkB/m6tnO/phQNY1JCOaVLm+lornUu+xZ+xWAAdFIHSsGO9aDJlft21sKd4jYjiPO1jG4bx9ldzugsRVjAkGKL3/MoKDinrmtZlQEfnTjxQ1c7Te7hFGC1uzI3SNtKUrkyg2hiK4sIa4vbrA5ps/a9yoWCqWibWe0jFtwFICOdqz1mvZn3l6/uf52Qylwdf1T6kLNPjGBotSZ2JOMe8Bm6xJ0ZgcYN2bEQnomvR7FYkx31ZK3JDXAa11r1YfHZZAsfu1I3NR3XwGoS2Wns0DsZpLoj7S/mfiLYHHNQRblpKvZXKCHgMcbVVVJ97L3ukMX5QsX5lcLIEnJtnNKAUhzt6eppQBo9zUbfGwgJWVgaqEnsnuAbeyZrb6d7LQnjdIqPUkOfndmzLr+lhzppk1Ps3BPXpnPCEXWvOSeEctZIs4+T9bTp4oUjxbfJF3jhArmwpFwFkTpupABbJCxnNRwrZcxdWZ6ukWek2lnY4Usq+2I2KLVbNeXSu4KHBoEEsYpMqwYiVKkWvKtZ++ZOde8J6ORe7VTbReymXiEbkkg4dOtJungpoLjKqgSjzHAUhOYCQRDBlUByWdpSonrcSEp6jF1QVgOyyTU1crVogHMeGl0em8yuk4A/Xa7O2rViDTi2hqi6cLO75ZWXdDCWHg9lRYgrcxpVinNhQ04Yhm+wqva+iJyeVffEfwomEEf4KdGO/OybVhxq2wuiTGuSQY0TWUQwa/LU/Zxq6vSclmO1Ewg+JEHtBYnFQOGIRQxAYs0xfdsoKQX7HQXnYW2kFVJwBQ6lsnapS4dmcFsUDJHfCE6pX19cyMXAztPx3LNMqnfUPdKeOesOlRQiZ0So4naTJtBtKX0S/+jnxoe2pTqUH6pQ0m4FAbKpN9FAkpIsStIDhr7LJFFhsiylRDS1ZnI5ek9Sdycw4odTq0Kst0nodEThMErnPVXZhR4B4QUjqij1KeOmDxl6ckxrhxKw6zjQTA1cdIuxBgRmPHfJ6rRCb/S0Dm1F7zl94+DRZAyyaJMwQz8nx+OM1qi3WxZhXbP8yyyjjHezMCA8DPoy7WXYm1nu2mVs9Bj21Sxz5bNZL6O4ySez3C3QeD4M+2LW70bLfYTrz6LlPsL1TbSAjDIGbDHOPk+E/HjOgMzvLSgM4aLHtXB9R6Fcg82nkM7vB9occj8HWtB4YVrl2PBzAjdlVdMZj5N7R3MGTdEabsEENIHlbJEnB1JOtkM/ouOLu+nXgXdYacWLN1NaRx5sQYr1iebO43DFRAfV03ukjcFaYL/YVGRdIcBbcWRaf+nM/XwJPQ0JZYssE+3IParMio0yo9ZihcXWgVEgAbipUKqnwq0l0FxW7jQFFy9BUK9IFBSa6NzDVJtn8kLhcV2ua09MRvntZaWpSBc/IBSza3r4UyMTZFvcdKIRaR+FGyA3JWoRXQyCsKJRPwMgvC4lQQamZTJ0ThZqIjxZBdlw0NkLCUFP9pwWNsjDva1IFyQL8SJQs2yYgoFhIXNQUb3yDlgz+NdAanUYjhINjqT8FXLparAQeQcYviEhg4ktuulTiwFNOrYTUXpkm4QWsdfRTFNBTMXbbIQ7CCtG0NVNbSq9HzWIBRgwinzAwX1TiNKRunWaCEGVHIxoCbK+NZC2ibIujFxIAoQYsjaWzijaamLoDU1qTAgI+vntfTSjSbvNfsakQI2oL9s8QHiAu0SnGmqCMIT9aFDX7bNptINwXTShdOGrVwhSLowCppnosjceodzaw92FMXYtTcq0kqPXEBx6lKAl6QKsheaOJKAVpCe5pcdl+kwNhbB3pgaofZHEsqxx0GYqCFG3UPunVSSLMJTS7WbkhL4CbYLgijBcUXN8f9FvekSYDo7PJlC7J8tA4oRb/YPRF/gwpIxo+Q2dq8F22MwOxm2kNV7ZF3MTatn0rgAO5HQ3eG9PsP/2sHB6szAisnAMZPu9/UU2ksAGgyWm/Jl09ZBDyAqRc9MwkdPG5Ta+HIrx+6Wua39nKRKJ4nqwj6oyvYt0uRbljtKgCMZuBwWA19AQ5RZRdFtQfIksIDHG7nNHG0p9RW1lqgwCMUUrFJv7wf/z0Ho12jUeG2ZWK/UCjlmB+p+epCCQGBGYdcZBuZ1MOdGOEDI75d1JecVtBSnK3AQRL0Q1qasTTW1bGPWUF5rfgmOD1o00sXF5P52sGu/bTHhPQNZcmGjtF9Gg8XZXBA3qcFH9K+FSW0YXlH+gaKGgPp9yhX4Edf9m9UkIeMlzQ78Y3SrjBJKHQkb80itqXIF5zsOj0ztshI1RnCZv3kZQnHi6/r63KK928lTZHFpu4+wXzHdQYYS46Yc0ur8UjPZanMSX1WTo5aZNb8g8I8inKWA15Y8EDTyr+acpNQedl+L7RDUfiI3midYu1cQm/DUh3FV1U2UdFUxf2NCZRVrX2qbwiRLcvpaNWdCzAEquB1sbpe25h2nnRRjoUYu+iWLWvC88KyL72MaCmJg3eyJsxUITdoD/WovMM0nRBIGIsiIJT8aqNrJlq3ewfzHVMvmPodIjrXkTrHotoo0+SmOKdLyR3GAvmuVkncp0iKUFBh4MfsSO/kYaN1pFGYN6O6ZJxZlSoOvTaUz7P5rDQELLoGfbtF8ubbBWlk9fID7sK74oDJXOKPj/v/zjavdnl3+c5P7s8o+r3Z9d/nG1+4vLb4G3e8HOWR4FaRsZdxK5ozwVv9NrgjQSRMsI0/ojdTnJiMQ46Z6+OwOjKY7bVugE/XAIQBeKeoadrfCiG1Y8zE/o66PlITbVTZ/NCdmiF7pp16HmQnrZtx+RbxzEuVbbjoYK4g406HftTEF2u4nGBY01MTyKlWSmB1LCdEzbf6PnTRNPTIxzJqbaXrNjpLRq4bx1twdKNzHl+zPEx6CUoqJ/1Qpr3jpAcSt+rLkvI4jJzOQ+ioD1BoQSbWU0wEIgmw6xYkb6MKtjwrn9g0UW+gVuYSCsKTCiqZuzCczQuF1/kX+xDYjdpU9FzgqTIHWOCqT/yiAGd/aHIE28KWOs7jajE3TZtD2IWXNEXZnBuxH5wuxZWjJbAUFa/hkYTIRnVetfMyM0tzmL/8iaXA++ECOFe+lAOGDEiyabw4JFh4H5jDF3x380OdRCQxmybKvoNt1UnG250GgPi4vlzkBZdoL/oBYYdxID8oU/lV72tKCHk/BuI4WnbWLU7rbtuEW1TZRaU1yL61Y/qqAUYc7kAkMWGiUlcHfXJoBiPobh0NUI1mVQRR/Bj6g1Ov7d9+vT9ORTALYtYRFhsPB33vIR3bvCICf1WPwJ0Ch4ZP3AQXMYQk8j6Xyvaq4oGjjbNiDWoPCmqVxURzm2g/S0KFodvGgsG5TQDUdL6Pu1F8ntQHfdZjxDUzGRQHsiyIwlEZ0HcPdtyRlb47YZR5mj8mi4NujSOGDbdDbNNKUoNoK2amccAw/DAtHsB6Fl1+DBd3uE7vd2GX/aVOQuN3e1NSBCIhya2UaBaXvor/HOSIAGD8CfndIjQ2wL0uY/jdQHPYvyG3e8ZMSyzRSl+ok5oUi2e7RXYVpA4s6c20B4RDzLo8flrbDxkKEOvOO835DQTLbtyAOGNINIK9NbmGiXiMKwH5qgCpvR/DqmA1ZTZJP9sJejTRq5UvTpOgcM1Fqss/1cm2pYNsB349juH7aNytCPlp+J0owJRcX8SUemCm07sEujDpGahZ4eNR5Xvf1QMLC4XVOAMmwdUegzPYIYGraQQVUFdbbMJ6O0xOgLtHOt1CLjep2QHjMKlC2151zAEgpFJQ5ybze3TSpvOwNMwgERRkunmhFqDehnPgXbT6SLAFcbm8rqHhUM7GJm9usL6kCIlm3S2eqFwlghGNAPk66ggbUiTAWJjOZwzJuoarTPtN8flv2W00O0nxkUpn028QkwQ+Khci4cbNf4ThCmNW3SGUWDo6KIe5jIc6MwCDXs0mGobSw32kiPJIGsIpKQ8Gt8DYgoYJuQe0JUFjdKU1RvjJnkxVpoHfarFFipHWOQRlScscOw/1JAjom5Rrsdg/NsF0VxtuykUFItrzGY1kgRgtJYWeKzHUg57+7+C5dmv+4HNCNeAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9bpaVUHOwg4pChOlkQK+qoVShChVArtOpg8tI/aNKQpLg4Cq4FB38Wqw4uzro6uAqC4A+Im5uToouUeF9SaBHjhcf7OO+ew3v3Af5mlalmzzigapaRSSWFXH5VCL4ihDB8mEZCYqY+J4ppeNbXPXVS3cV5lnffn9WnFEwG+ATiWaYbFvEG8dSmpXPeJ46ysqQQnxOPGXRB4keuyy6/cS457OeZUSObmSeOEgulLpa7mJUNlXiSOKaoGuX7cy4rnLc4q9U6a9+TvzBS0FaWuU5rGCksYgkiBMioo4IqLMRp10gxkaHzpId/yPGL5JLJVQEjxwJqUCE5fvA/+D1bs5iYcJMiSaD3xbY/RoDgLtBq2Pb3sW23ToDAM3Cldfy1JjDzSXqjo8WOgP5t4OK6o8l7wOUOMPikS4bkSAFa/mIReD+jb8oDA7dAeM2dW/scpw9AlmaVvgEODoHREmWve7w71D23f3va8/sBpJ1yu0dTFlwAABCpaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDozYzBmMzQ0My1jOWUxLTRjYjItYWYyMi1kY2JiNTk4OWI5OTUiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2RkYjJlNmYtMGM1Yi00MGY2LTgzZmEtNTU4NGFiNjM5OGI1IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWQyZmUxY2MtNzZmOC00YWNiLWFhZmUtZWVhNjNmZGI0NGY3IgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2Mjg1NjA2NDAwNTUxMzQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjExIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDctMTdUMjM6NDc6NDFaIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0yN1QwMjowNDowOVoiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MTdkNmQxZS1kYTk0LTQ5MzEtOTA2Yi1mZjA4MmNiMTdmYTEiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSItMDc6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+8NgqrAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UICgE5FMAMuMQAAAD7SURBVDjLvZSxaoNgFIWP5YcM4tCl/I5uTuKmgi/RvaB9A0eh79Dg5lMEO/kadgsdXNpVLBWJOHi6RGiDTUL+0A/O9A13uOde4HrcAugBcJ/dmU4JTUq5zbKMJJnn+QeAlzOcGqZpPvm+P07TRJJ0HGcL4OGUUyZJktemaUiSwzDQtu1nAKtTbkYCWP/Yg2pm/nQSwFoI8eW67icAqnI4eMkJIcRbEARjXddG27b4L26Koogty9r1fQ8p5WWV1rRf2bNa8ocOZVneR1H0fsk+4zhmGIacm2sYBufmHnPKdF1353neON9qmqab+VaPuatQVdWjrutc+k5L7htzpyON+Z9ooQAAAABJRU5ErkJggg==",Transition:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE82lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTBUMDI6MjI6MjgrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjODc0NjdlZC1kOWM2LTQ1N2YtYmVmOS1jZmUxOGNjNTQwMzMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4NzQ2N2VkLWQ5YzYtNDU3Zi1iZWY5LWNmZTE4Y2M1NDAzMyIgc3RFdnQ6d2hlbj0iMjAyMi0wOC0xMFQwMTo0NzoyNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjIgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++aqHwQAAAklJREFUOI2llEFLG0EUx3+T2ZhE3Qgek4qoaS0iVIgVLUIj9At4aI71C/QziBc/R/eqN++FBiq1eOrBiz2IhQielrhslOzM7OthYzC1lFAf/HlvZh7zf+/Pm1H8pzUaDQ9YBlaBV8A6sNJsNr0/c8fHx0HUCTn5plJOBL6rJ5AsVyqVYq1WY2lpiVqtRhAEnJ2dfT46OnpnkgSAiclJlBqiaQF7XvApqCpYlxwbpOoNSjZub2+HiA8PD7uVSmXiIUm9Xn9UYL1eZ2trazlJEnzfByCOY8plH/hLj1EUfYyi6GcURRKGodzd3Umv1xtge3tb2u22jGK7u7vSarXEOSfOOTHGSBiGg7Vz7otz7m0OoFQqDSFJEkQErTVaazY3Nzk9PSV1jjRNkTTzWXwPQSRlcXGRq6srlFIopdBaUy6XiaIIAOdcA8ADyOVyg+7HxsbQWpMkCUopPM9jenqam5sbjLFZknroFCCAQgH5fJ5ut4tzbkjVUqlEp9PB933b6XQy4jRNh5KUUuTzeXq9HsYYwjBkbm6OxJiMTIESYDA00t8EYwxa66E7RQSAQqFAHMdxoVAg129/CNZa0jTF8zystRwfH7O2toZLDNYYjDEkNvMZLMZkZ+fn51SrVay1WNvf78d9RX8AqFGnen5+fuLFi+fMzs6yuvqaqfJUXx7JVJCs4/fNZvvg4OBZsVh8PMWZtYC9Ud/xJLCys/Ph68XFBZeXv7i+vmZmZob7YhYWFgiCAFDs7+8P5H0S8b+KIftU6v345ag/1282snUWSFpDdAAAAABJRU5ErkJggg==",TubeFinSet:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAALCAYAAABoKz2KAAAAAXNSR0IArs4c6QAAAMZlWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAAVAAAAZodpAAQAAAABAAAAfAAAAAAAAABkAAAAAQAAAGQAAAABUGl4ZWxtYXRvciBQcm8gMy40LjEAAAAEkAQAAgAAABQAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAeoAMABAAAAAEAAAALAAAAADIwMjM6MDk6MjUgMTU6Mjk6MzcAVmv9YgAAAAlwSFlzAAAPYQAAD2EBqD+naQAAA7JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4xMDAwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDMuNC4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTA5LTI1VDE1OjI5OjM3LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wOS0yNVQyMjowNTo1Ny0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjExPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+ChtzjeoAAAHPSURBVDgRxZPPSwJREMfnqQh16ZBFZYhakRERaNjFDksUYXrrWvQvFJGH/gL/jforhMgg6RBp1KVf0EpFStkvCovUtu9sbTyXUjs18NmZ997MvJ2ZXaJ/EtHovX6/X2vU1/DLZDIN5zdiqnQ4HJ6ITEe0jfUNjUU9U1lViXmP/TmuKpG0sEj2r2Zfb998aCxEO7s77ON0e9yUVbNsf4t5j/057tvBZNRtBbfYbreTo9VBiwuLtLS8ZEpRf/lTy/WLvYMBVxO9DgthHbXZRNAirENCUIeGU/GOxBZB6CvJL6CMK3rVXKks3Al5LxqJUuG2cFh8LW5SqZLRKpW95nLLqUDCGQR6QY+kPXIyw15bXaOr3JW+jMViujZfxJvyXjwep67OLm12bjaPo0twAc55xpUvytBv4BlkTahYq/2+/nxqK0XBkSCWn8LV1Zo3+/sGfAV4P4EXwHeUueIpGG7gAk7QBqzA+H3El82aAoHAJOu/SDqd3oZ/CTyAa5C34fEI7kAT4ORFwNUbF8PURUskEi60Tf/I/jLjZDJZUhSFZ8RV34MHbjW34QbwwTngth6BE3AscXKwf9At/VYrbk/tNiOW2B9x7TB5tjnAFRc+AHvu3kaAhLUbAAAAAElFTkSuQmCC"};function W1({config:t,onWorkbench:e,setBusy:n,setErr:i,busy:r}){const[s,o]=ce.useState([]),[a,l]=ce.useState(""),[c,h]=ce.useState(t.configs[0]?.config_id??""),[u,f]=ce.useState(t.mounts[0]?.id??""),[p,v]=ce.useState("0");ce.useEffect(()=>{gv().then(o).catch(T=>i(String(T)))},[i]);const x=ce.useMemo(()=>{const T=new Map;for(const S of t.simulations)S.config_id&&T.set(S.config_id,S.name);return S=>T.get(S)??S.slice(0,8)},[t.simulations]),g=t.mounts.find(T=>T.id===u)??null,d=g?.assignments.find(T=>T.config_id===c)??null,A=ce.useMemo(()=>{const T=a.trim().toLowerCase();return T?s.filter(S=>S.designation.toLowerCase().includes(T)||S.manufacturer.toLowerCase().includes(T)||S.class.toLowerCase()===T):s},[s,a]);async function m(T){n(!0),i(null);try{e(await T)}catch(S){i(String(S))}finally{n(!1)}}const C=T=>g&&m(ox(g.id,c,T.designation,T.digest,Number(p)||0));return E.jsxs("div",{className:"motors"+(r?" busy":""),children:[E.jsxs("div",{className:"motors-top",children:[E.jsxs("label",{children:["Configuration",E.jsx(er,{value:c,onChange:h,options:t.configs.map(T=>({value:T.config_id,label:T.name??x(T.config_id)}))})]}),E.jsxs("label",{children:["Mount",E.jsx(er,{value:u,onChange:f,options:t.mounts.map(T=>({value:T.id,label:`${T.name} (${T.kind})`}))})]}),E.jsxs("label",{children:["Ejection delay (s)",E.jsx("input",{type:"number",step:"any",value:p,onChange:T=>v(T.target.value),style:{width:70}})]}),E.jsxs("span",{className:"cur",children:["Loaded:"," ",E.jsx("b",{children:d?.designation??"— none —"}),d&&` · delay ${d.ejection_delay}s`,d&&E.jsx("button",{className:"link",onClick:()=>g&&m(ax(g.id,c)),children:"clear"})]})]}),E.jsx("input",{className:"motor-search",placeholder:"Filter by designation, manufacturer, or class (A/B/C…)",value:a,onChange:T=>l(T.target.value)}),E.jsx("div",{className:"motor-table",children:E.jsxs("table",{children:[E.jsx("thead",{children:E.jsxs("tr",{children:[E.jsx("th",{children:"Cls"}),E.jsx("th",{children:"Motor"}),E.jsx("th",{children:"Manufacturer"}),E.jsx("th",{children:"Ø mm"}),E.jsx("th",{children:"Impulse"}),E.jsx("th",{children:"Avg N"}),E.jsx("th",{children:"Burn s"}),E.jsx("th",{children:"Mass g"}),E.jsx("th",{children:"Delays"})]})}),E.jsx("tbody",{children:A.map(T=>{const S=d?.designation===T.designation&&(d?.digest??T.digest)===T.digest;return E.jsxs("tr",{className:S?"sel":"",onClick:()=>C(T),children:[E.jsx("td",{children:T.class}),E.jsx("td",{children:E.jsx("b",{children:T.designation})}),E.jsx("td",{children:T.manufacturer.replace(/_/g," ")}),E.jsx("td",{children:T.diameter_mm.toFixed(0)}),E.jsx("td",{children:T.total_impulse.toFixed(1)}),E.jsx("td",{children:T.avg_thrust.toFixed(1)}),E.jsx("td",{children:T.burn_time.toFixed(2)}),E.jsx("td",{children:T.total_mass_g.toFixed(1)}),E.jsx("td",{children:T.delays.filter(I=>I<100).join(",")||"—"})]},T.file)})})]})})]})}const j1=["length","number","angle","mass","int"];function X1({tree:t,sim:e,setErr:n}){const[i,r]=ce.useState(null),[s,o]=ce.useState("0.3"),a=ce.useMemo(()=>t.filter(y=>y.kind!=="Stage"),[t]),[l,c]=ce.useState(a[0]?.id??""),h=a.find(y=>y.id===l)??a[0],u=(h?.fields??[]).filter(y=>j1.includes(y.kind)),[f,p]=ce.useState(u[0]?.key??""),[v,x]=ce.useState({min:"10",max:"80",steps:"15"}),[g,d]=ce.useState("max_apogee"),[A,m]=ce.useState("100"),[C,T]=ce.useState("1"),[S,I]=ce.useState(null),[R,B]=ce.useState(!1);ce.useEffect(()=>{rx(Number(s)||.3).then(r).catch(y=>n(String(y)))},[s,n]);async function _(){if(!(!h||!f)){B(!0),n(null);try{I(await sx({sim_name:e||null,comp_id:h.id,key:f,min:Number(v.min),max:Number(v.max),steps:Number(v.steps),goal:g,target:Number(A),min_margin:Number(C)}))}catch(y){n(String(y))}finally{B(!1)}}}return E.jsxs("div",{className:"analysis",children:[E.jsxs("div",{className:"an-sec",children:[E.jsxs("div",{className:"an-head",children:[E.jsx("span",{children:"Component analysis"}),E.jsxs("label",{children:["Mach",E.jsx("input",{type:"number",step:"0.05",value:s,onChange:y=>o(y.target.value),style:{width:64}})]})]}),i&&E.jsxs("table",{children:[E.jsx("thead",{children:E.jsxs("tr",{children:[E.jsx("th",{children:"Component"}),E.jsx("th",{children:"CNα"}),E.jsx("th",{children:"CP cm"}),E.jsx("th",{children:"CD fric"}),E.jsx("th",{children:"CD press"}),E.jsx("th",{children:"CD share"})]})}),E.jsxs("tbody",{children:[i.rows.map(y=>E.jsxs("tr",{children:[E.jsxs("td",{children:[E.jsx("b",{children:y.name})," ",E.jsx("span",{className:"k",children:y.kind})]}),E.jsx("td",{children:y.cn_alpha.toFixed(3)}),E.jsx("td",{children:y.cp_cm.toFixed(2)}),E.jsx("td",{children:y.cd_friction.toFixed(4)}),E.jsx("td",{children:y.cd_pressure.toFixed(4)}),E.jsxs("td",{children:[(y.cd_share*100).toFixed(1),"%"]})]},y.id)),E.jsxs("tr",{className:"tot",children:[E.jsxs("td",{children:["Total (+ base ",i.cd_base.toFixed(3),")"]}),E.jsx("td",{children:i.cn_alpha_total.toFixed(3)}),E.jsx("td",{children:i.cp_cm.toFixed(2)}),E.jsx("td",{colSpan:2}),E.jsxs("td",{children:["CD ",i.cd_total.toFixed(4)]})]})]})]})]}),E.jsxs("div",{className:"an-sec",children:[E.jsx("div",{className:"an-head",children:E.jsx("span",{children:"Optimize (1-D sweep)"})}),E.jsxs("div",{className:"opt-form",children:[E.jsxs("label",{children:["Component",E.jsx(er,{value:l,onChange:y=>{c(y),p("")},options:a.map(y=>({value:y.id,label:`${y.name} (${y.kind})`}))})]}),E.jsxs("label",{children:["Parameter",E.jsx(er,{value:f||u[0]?.key||"",onChange:p,options:u.map(y=>({value:y.key,label:y.label+(y.unit?` (${y.unit})`:"")}))})]}),E.jsxs("label",{children:["Min",E.jsx("input",{type:"number",value:v.min,onChange:y=>x({...v,min:y.target.value})})]}),E.jsxs("label",{children:["Max",E.jsx("input",{type:"number",value:v.max,onChange:y=>x({...v,max:y.target.value})})]}),E.jsxs("label",{children:["Steps",E.jsx("input",{type:"number",value:v.steps,onChange:y=>x({...v,steps:y.target.value})})]}),E.jsxs("label",{children:["Goal",E.jsx(er,{value:g,onChange:d,options:[{value:"max_apogee",label:"Max apogee"},{value:"target_apogee",label:"Target apogee"}]})]}),g==="target_apogee"&&E.jsxs("label",{children:["Target m",E.jsx("input",{type:"number",value:A,onChange:y=>m(y.target.value)})]}),E.jsxs("label",{children:["Min stab cal",E.jsx("input",{type:"number",step:"0.5",value:C,onChange:y=>T(y.target.value)})]}),E.jsx("button",{onClick:_,disabled:R,children:R?"Running…":"Run sweep"})]}),S&&E.jsxs("div",{className:"opt-res",children:[E.jsxs("p",{children:["Baseline ",E.jsx("b",{children:S.baseline_value.toFixed(2)})," ·"," ",S.best_value!=null?E.jsxs(E.Fragment,{children:["Best"," ",E.jsx("b",{className:"hit",children:S.best_value.toFixed(2)})," ","→ apogee"," ",E.jsxs("b",{children:[S.best_apogee?.toFixed(1)," m"]})]}):E.jsx("span",{className:"bad",children:"No feasible point (all unstable)"})]}),E.jsxs("table",{children:[E.jsx("thead",{children:E.jsxs("tr",{children:[E.jsx("th",{children:"Value"}),E.jsx("th",{children:"Apogee m"}),E.jsx("th",{children:"Stability cal"}),E.jsx("th",{})]})}),E.jsx("tbody",{children:S.points.map((y,N)=>E.jsxs("tr",{className:y.value===S.best_value?"sel":"",children:[E.jsx("td",{children:y.value.toFixed(2)}),E.jsx("td",{children:y.apogee.toFixed(1)}),E.jsx("td",{children:y.margin_cal.toFixed(2)}),E.jsx("td",{children:y.feasible?"":E.jsx("span",{className:"bad",children:"unstable"})})]},N))})]})]})]})]})}const $g=[{key:"wind",label:"Wind"},{key:"site",label:"Launch site"},{key:"rod",label:"Launch rod"},{key:"atmosphere",label:"Atmosphere"},{key:"options",label:"Options"}];function Y1(t){const e=new Map,n=[];for(const s of t){const o=s.section??"options";e.has(o)||(e.set(o,[]),n.push(o)),e.get(o).push(s)}const i=$g.map(s=>s.key);return[...i.filter(s=>e.has(s)),...n.filter(s=>!i.includes(s))].map(s=>({key:s,label:$g.find(o=>o.key===s)?.label??s.charAt(0).toUpperCase()+s.slice(1),rows:e.get(s)}))}function Z1({sim:t}){const[e,n]=ce.useState(null),[i,r]=ce.useState(null);return ce.useEffect(()=>{let s=!0;return n(null),r(null),ZC(t).then(o=>{s&&n(o.warnings??[])}).catch(o=>{s&&r(String(o))}),()=>{s=!1}},[t]),i?E.jsxs("div",{className:"empty",children:["Could not load warnings: ",i]}):e===null?E.jsx("div",{className:"empty",children:"Checking…"}):e.length?E.jsx("ul",{className:"warn-list",children:e.map((s,o)=>E.jsxs("li",{className:`warn warn-${s.kind}`,children:[E.jsx("span",{className:"warn-icon","aria-hidden":"true",children:s.kind==="error"?"✕":s.kind==="warn"?"▲":"ℹ"}),E.jsxs("div",{children:[E.jsx("div",{className:"warn-msg",children:s.message}),E.jsx("div",{className:"warn-cat",children:s.category})]})]},o))}):E.jsx("div",{className:"empty",children:"No warnings — design and sim look healthy."})}function em({toggles:t,onChange:e,trailing:n}){const i=r=>e({...t,[r]:!t[r]});return E.jsxs("div",{children:[E.jsxs("div",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:"Altitude"}),E.jsx("input",{type:"checkbox",checked:t.altitude,onChange:()=>i("altitude")})]}),E.jsxs("div",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:"Velocity"}),E.jsx("input",{type:"checkbox",checked:t.velocity,onChange:()=>i("velocity")})]}),E.jsxs("div",{className:"prop-row",children:[E.jsx("span",{className:"prop-label",children:"Thrust"}),E.jsx("input",{type:"checkbox",checked:t.thrust,onChange:()=>i("thrust")})]}),n]})}function J1({open:t,sim:e,simNode:n,busy:i,fd:r,rocketName:s,seriesToggles:o,onSeriesChange:a,onPatch:l,onRun:c,onClose:h}){const u=ce.useMemo(()=>n?Y1(n.fields):[],[n]),f=[...u.map(g=>({key:g.key,label:g.label})),{key:"_warnings",label:"Warnings"},{key:"_plot",label:"Plot data"},{key:"_export",label:"Export data"}],[p,v]=ce.useState(f[0]?.key??"wind");if(ce.useEffect(()=>{t&&v(f[0]?.key??"wind")},[t,e]),!t)return null;const x=u.find(g=>g.key===p);return E.jsx("div",{className:"modal-backdrop",onClick:h,role:"presentation",children:E.jsxs("div",{className:"modal sim-modal",onClick:g=>g.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Edit simulation",children:[E.jsxs("header",{className:"modal-head",children:[E.jsxs("div",{children:[E.jsx("strong",{children:"New simulation"}),e&&E.jsxs("span",{className:"modal-sub",children:["— ",e]})]}),E.jsx("button",{type:"button",className:"modal-close",onClick:h,"aria-label":"Close",children:"×"})]}),E.jsx("div",{className:"prop-tabs sim-tabs",children:f.map(g=>E.jsx("button",{type:"button",className:"prop-tab"+(g.key===p?" active":""),onClick:()=>v(g.key),children:g.label},g.key))}),E.jsx("div",{className:"modal-body",children:p==="_warnings"?E.jsx(Z1,{sim:e}):p==="_plot"?E.jsx(em,{toggles:o,onChange:a}):p==="_export"?E.jsx(em,{toggles:o,onChange:a,trailing:E.jsxs("div",{style:{marginTop:14},children:[E.jsx("button",{type:"button",disabled:!r,onClick:()=>{r&&p0(r,s,e,o)},title:r?"Download CSV":"Run a simulation first",children:"Download CSV"}),!r&&E.jsx("div",{className:"empty",style:{paddingLeft:0},children:"No flight data yet — run a simulation first."})]})}):x?E.jsx(yf,{fields:x.rows,onCommit:(g,d)=>l(e,g,d)}):E.jsx("div",{className:"empty",children:"No simulation selected"})}),E.jsxs("footer",{className:"modal-foot",children:[E.jsx("button",{type:"button",className:"ghost",onClick:h,children:"Cancel"}),E.jsx("button",{type:"button",onClick:()=>{c(),h()},disabled:i||!n,children:"Run simulation"})]})]})})}function K1({spec:t}){const[e,n,i,r]=t.split("|"),[s,o]=ce.useState(null),[a,l]=ce.useState(null);return ce.useEffect(()=>{pv(decodeURIComponent(e)).then(o).catch(c=>l(String(c)))},[e]),a?E.jsx("div",{id:"raw-err",style:{color:"red"},children:a}):s?E.jsx("div",{id:"raw-ready",style:{width:1280,height:720,overflow:"hidden"},children:n==="blueprint"?E.jsx(g0,{rv:s.view,raw:!0}):E.jsx(d0,{rv:s.view,mode:n||"finished",raw:parseInt(i||"0",10),keyBg:r==="key"})}):E.jsx("div",{id:"raw-loading",children:"loading"})}function Q1(){const t=typeof window<"u"?window.location.hash:"";return t.startsWith("#raw=")?E.jsx(K1,{spec:t.slice(5)}):E.jsx(q1,{})}function q1(){const[t,e]=ce.useState(null),[n,i]=ce.useState(null),[r,s]=ce.useState(""),[o,a]=ce.useState("side"),[l,c]=ce.useState(!1),[h,u]=ce.useState(null),[f,p]=ce.useState([]),[v,x]=ce.useState(null),[g,d]=ce.useState(null),[A,m]=ce.useState("design"),[C,T]=ce.useState(0),[S,I]=ce.useState([]),[R,B]=ce.useState(.5),[_,y]=ce.useState(null),[N,O]=ce.useState(!1),[G,Q]=ce.useState({altitude:!0,velocity:!0,thrust:!1});ce.useEffect(()=>{lx().then(p).catch(()=>{})},[]);const F=t?.view??null,Z=t?.stability??null,D=ce.useMemo(()=>t?.tree.find(J=>J.id===v)??null,[t,v]);async function W(J,L){c(!0),u(null);try{L?.(await J())}catch(re){u(String(re))}finally{c(!1)}}const K=J=>{e(J),i(null),x(null),s(J.view.simulations[0]??""),gv().then(I).catch(()=>I([]))},ne=J=>W(()=>pv(J),K),le=J=>W(()=>JC(J),K),_e=()=>W(()=>KC(),K),V=J=>W(()=>QC(J),K),te=()=>{const J=ae.current;if(!J)return;const L=J.view.simulations[0]??"";W(()=>Bp(L||null),re=>i(re))},oe=ce.useRef(null),ae=ce.useRef(null);ae.current=t,ce.useEffect(()=>{const J=new URLSearchParams(window.location.search),L=J.get("ork_b64"),re=J.get("example"),j=J.get("path");L?le(L):re?ne(`/orks/${re}`):j&&ne(j);const ee=xe=>{if(xe.source!==window.parent)return;const Be=xe.data;!Be||typeof Be!="object"||(Be.type==="workbench:load_design"?typeof Be.b64=="string"?le(Be.b64):typeof Be.example=="string"?ne(`/orks/${Be.example}`):typeof Be.path=="string"&&ne(Be.path):Be.type==="workbench:run_simulate"&&te())};window.addEventListener("message",ee),window.parent!==window&&window.parent.postMessage({type:"workbench:ready"},"*");let ge=null;if(typeof BroadcastChannel<"u"){ge=new BroadcastChannel("opsrocket-workbench"),oe.current=ge;const xe=Be=>{const $e=Be.data;if(!(!$e||typeof $e!="object"))if($e.type==="ping"){const _t=ae.current;if(!_t)return;zp().then(({ork_b64:Fe})=>{ge.postMessage({type:"state",state:{name:_t.view.name,ork_b64:Fe,total_length_m:_t.view.total_length,components:_t.view.components.length}})}).catch(()=>{})}else $e.type==="load_design"&&typeof $e.b64=="string"?le($e.b64):$e.type==="run_simulate"&&te()};ge.addEventListener("message",xe),ge.postMessage({type:"ready"})}return()=>{window.removeEventListener("message",ee),ge&&(ge.close(),oe.current=null)}},[]),ce.useEffect(()=>{const J=oe.current;if(!J)return;if(!t){J.postMessage({type:"state",state:null});return}let L=!0;return zp().then(({ork_b64:re})=>{L&&J.postMessage({type:"state",state:{name:t.view.name,ork_b64:re,total_length_m:t.view.total_length,components:t.view.components.length}})}).catch(()=>{}),()=>{L=!1}},[t]);const Oe=(J,L,re)=>W(()=>qC(J,L,re),j=>e(j)),Ne=J=>W(()=>$C(J),L=>{e(L),v===J&&x(null)}),ke=(J,L)=>{const re=new Set((t?.tree??[]).map(j=>j.id));y(null),W(()=>ex(J,L),j=>{e(j);const ee=j.tree.find(ge=>!re.has(ge.id));ee&&x(ee.id)})},je=()=>{if(!t)return;const J=t.tree.find(re=>re.id===v),L=J&&Bc(J.kind).length>0?J:t.tree.find(re=>Bc(re.kind).length>0);L&&(x(L.id),y(L.id))},ie=(J,L)=>W(()=>ix(r,J,L),re=>e(re)),P=J=>{e(J),x(L=>L&&J.tree.some(re=>re.id===L)?L:null)},Ae=()=>W(()=>tx(),P),pe=()=>W(()=>nx(),P);ce.useEffect(()=>{const J=L=>{if(!t||l)return;const re=L.target,j=re?.tagName;if(j==="INPUT"||j==="TEXTAREA"||j==="SELECT"||re?.isContentEditable)return;const ee=L.key==="z"||L.key==="Z",ge=L.key==="y"||L.key==="Y";(L.metaKey||L.ctrlKey)&&ee?(L.preventDefault(),L.shiftKey?pe():Ae()):L.ctrlKey&&ge&&(L.preventDefault(),pe())};return window.addEventListener("keydown",J),()=>window.removeEventListener("keydown",J)},[t,l,r]);const he=()=>W(()=>Bp(r||null),J=>i(J)),ve=ce.useRef(null),Re=ce.useRef(null),Me=J=>{const L=ve.current;!L||L.scrollWidth<=L.clientWidth||Math.abs(J.deltaX)>=Math.abs(J.deltaY)||(L.scrollLeft+=J.deltaY)},b=J=>{const L=ve.current;if(!L)return;const re=J.target;re!==L&&re.tagName!=="H1"||(Re.current={x:J.clientX,left:L.scrollLeft},L.classList.add("grab"),L.setPointerCapture(J.pointerId))},M=J=>{const L=ve.current;L&&Re.current&&(L.scrollLeft=Re.current.left-(J.clientX-Re.current.x))},H=J=>{const L=ve.current;if(L){Re.current=null,L.classList.remove("grab");try{L.releasePointerCapture(J.pointerId)}catch{}}},q=ce.useRef(null),se=ce.useRef(!1),$=J=>{se.current=!0,J.target.setPointerCapture(J.pointerId),J.preventDefault()},be=J=>{if(!se.current||!q.current)return;const L=q.current.getBoundingClientRect(),re=(J.clientY-L.top)/L.height;B(Math.min(.85,Math.max(.15,re)))},Ce=J=>{se.current=!1;try{J.target.releasePointerCapture(J.pointerId)}catch{}},Ee=()=>{n&&p0(n,F?.name??"flight",r)},Ke=()=>{O1(F?.name??"rocket")||u("Open the Side/3D view before exporting an image")},fe=()=>{F&&F1(F,F.name)},Ie=t?.sims.find(J=>J.name===r)??null,Ge=ce.useMemo(()=>{if(!F||!Z)return null;const J=t?.config,L=J?.simulations.find(Fe=>Fe.name===r)?.config_id??J?.default_config??J?.configs[0]?.config_id??null;let re=F.max_radius;const j=F.lathe.filter(Fe=>Math.abs(Fe.radial??0)<1e-4);j.length&&(re=Math.max(...j.map(Fe=>Math.max(...Fe.outer.map(([,qe])=>qe)))));const ee=F.total_length*100;let ge=0,xe=!1;for(const Fe of J?.mounts??[]){const qe=Fe.assignments.find(Ti=>Ti.config_id===L);if(!qe||!qe.digest&&!qe.designation)continue;const Ft=S.find(Ti=>qe.digest&&Ti.digest===qe.digest)??S.find(Ti=>Ti.designation===qe.designation);Ft&&(ge+=Ft.total_mass_g*Math.max(1,Fe.instances??1),xe=!0)}const Be=J?.configs.find(Fe=>Fe.config_id===L)?.name||(()=>{const Fe=(J?.mounts??[]).map(qe=>qe.assignments.find(Ft=>Ft.config_id===L)?.designation).filter(qe=>!!qe);return Fe.length?`[${Fe.join("; ")}]`:"[No motors]"})();let $e=null,_t=null;if(n&&n.velocity.length>1){$e=Math.max(...n.velocity);let Fe=0;for(let qe=1;qe<n.velocity.length;qe++){const Ft=n.time[qe]-n.time[qe-1];Ft>0&&(Fe=Math.max(Fe,(n.velocity[qe]-n.velocity[qe-1])/Ft))}_t=Fe}return{name:F.name,length_cm:ee,max_diam_cm:re*200,mass_g:Z.mass_g,mass_motors_g:xe?Z.mass_g+ge:null,margin_cal:Z.margin_cal,margin_pct:ee>0?(Z.cp_cm-Z.cg_cm)/ee*100:0,cg_cm:Z.cg_cm,cp_cm:Z.cp_cm,mach:.3,config_name:Be,apogee_m:n?n.apogee:null,max_velocity_ms:$e,max_velocity_mach:$e!=null?$e/340.3:null,max_accel_ms2:_t}},[F,Z,t,r,n,S]),ze=J=>{d(`Saved → ${J.saved}`),setTimeout(()=>d(null),2500)},Te=()=>W(()=>Gc(),ze),Qe=J=>W(()=>Gc(J),ze),Xe=()=>W(()=>Gc(`${(F?.name??"rocket").replace(/\W+/g,"_")}.ork`),ze);return E.jsxs("div",{className:"app",children:[E.jsx(J1,{open:N,sim:r,simNode:Ie,busy:l,fd:n,rocketName:F?.name??"rocket",seriesToggles:G,onSeriesChange:Q,onPatch:(J,L,re)=>ie(L,re),onRun:he,onClose:()=>O(!1)}),E.jsxs("header",{ref:ve,onWheel:Me,onPointerDown:b,onPointerMove:M,onPointerUp:H,children:[E.jsx("a",{href:"/",target:"_top",className:"logo-link",title:"Home",children:E.jsx("img",{className:"logo",src:"/ops.png",alt:"OpsRocket"})}),E.jsx(cx,{fixtures:f,busy:l,hasDoc:!!t,canExportCsv:!!n,onNew:_e,onOpenFile:V,onOpenExample:ne,onSave:Te,onSaveAs:Qe,onExportCsv:Ee,onExportPng:Ke,onExportObj:fe,onExportOrk:Xe}),F&&E.jsxs(E.Fragment,{children:[E.jsx(er,{className:"simsel",value:r,onChange:s,options:F.simulations.map(J=>({value:J,label:J}))}),E.jsx("button",{onClick:()=>O(!0),disabled:l||!F.simulations.length||!r,title:"Edit simulation conditions and run",children:"New simulation"}),E.jsx("button",{className:"ghost",onClick:Ae,disabled:l,title:"Undo (⌘Z / Ctrl+Z)",children:"↶ Undo"}),E.jsx("button",{className:"ghost",onClick:pe,disabled:l,title:"Redo (⇧⌘Z / Ctrl+Y)",children:"↷ Redo"}),E.jsx(er,{title:"View",value:o,onChange:J=>a(J),options:[{value:"side",label:"Side view"},{value:"top",label:"Top view"},{value:"back",label:"Back view"},{value:"figure",label:"3D Figure"},{value:"unfinished",label:"3D Unfinished"},{value:"finished",label:"3D Finished"}]}),(o==="side"||o==="top"||o==="back")&&E.jsxs("span",{className:"rollctl",title:"Change the rocket's roll rotation (only affects the rocket view)",children:[E.jsx("input",{type:"number",value:C,step:1,onChange:J=>T((Number(J.target.value)%360+360)%360),style:{width:56}}),E.jsx("span",{style:{opacity:.7},children:"°"}),E.jsx("input",{type:"range",min:0,max:359,value:C,onChange:J=>T(Number(J.target.value)),title:"Roll"})]}),["design","motors","sim","analysis"].map(J=>E.jsx("button",{className:A===J?"":"ghost",onClick:()=>m(J),children:J==="design"?"Design":J==="motors"?"Motors":J==="sim"?"Conditions":"Analysis"},J))]}),g&&E.jsx("span",{className:"ok",children:g}),h&&E.jsx("span",{className:"err",children:h})]}),F&&E.jsxs("div",{className:"metabar",children:[F.name,F.designer?` — ${F.designer}`:""," ·"," ",(F.total_length*100).toFixed(1)," cm"]}),Z&&E.jsxs("div",{className:"statbar",children:[E.jsxs("span",{children:["Mass ",E.jsxs("b",{children:[Z.mass_g.toFixed(1)," g"]})]}),E.jsxs("span",{children:["CG ",E.jsxs("b",{children:[Z.cg_cm.toFixed(2)," cm"]})]}),E.jsxs("span",{children:["CP ",E.jsxs("b",{children:[Z.cp_cm.toFixed(2)," cm"]})]}),E.jsxs("span",{className:Z.stable?"good":"bad",children:["Stability ",E.jsxs("b",{children:[Z.margin_cal.toFixed(2)," cal"]})]}),E.jsxs("span",{children:["Ø ",E.jsxs("b",{children:[Z.ref_diameter_mm.toFixed(1)," mm"]})]}),E.jsxs("span",{children:["Cᴅ ",E.jsx("b",{children:Z.cd.toFixed(3)})]})]}),E.jsxs("div",{className:"main",children:[E.jsxs("aside",{className:"sidebar",children:[E.jsxs("div",{className:"sidebar-head",children:[E.jsx("h2",{children:"Components"}),t&&E.jsx("button",{className:"new-btn",onClick:je,title:"Add a new component",children:"+ New"})]}),t?t.tree.map(J=>{const L=Bc(J.kind);return E.jsxs("div",{children:[E.jsxs("div",{className:"tree-item"+(J.id===v?" sel":""),style:{paddingLeft:8+J.depth*14},onClick:()=>x(J.id),children:[qg[J.kind]&&E.jsx("img",{className:"ci",src:qg[J.kind],alt:"",title:J.kind,draggable:!1}),E.jsx("span",{className:"nm",children:J.name}),L.length>0&&E.jsx("button",{className:"add",title:"Add child component",onClick:re=>{re.stopPropagation(),y(_===J.id?null:J.id)},children:"+"}),J.kind!=="Stage"&&E.jsx("button",{className:"del",title:"Delete",onClick:re=>{re.stopPropagation(),Ne(J.id)},children:"×"})]}),_===J.id&&L.length>0&&E.jsx("div",{className:"add-menu",style:{paddingLeft:8+(J.depth+1)*14},children:L.map(re=>E.jsxs("button",{className:"add-opt",onClick:j=>{j.stopPropagation(),ke(J.id,re)},children:["+ ",re]},re))})]},J.id)}):E.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),E.jsxs("div",{className:"viewport",ref:q,style:{gridTemplateRows:`${R}fr 3px ${1-R}fr`},children:[E.jsxs("div",{className:"panel",children:[!(A==="design"&&(o==="side"||o==="top"||o==="back"))&&E.jsx("span",{className:"tag",children:A==="motors"?"Motors & configurations":A==="sim"?`Conditions — ${r}`:A==="analysis"?"Analysis & optimization":o==="side"?"Side view":o==="top"?"Top view":o==="back"?"Back view":`3D ${o}`}),t?A==="motors"?E.jsx(W1,{config:t.config,onWorkbench:e,setBusy:c,setErr:u,busy:l}):A==="sim"?E.jsx("div",{className:"conditions",children:Ie?E.jsx(yf,{fields:Ie.fields,onCommit:ie}):E.jsx("div",{className:"empty",children:"No simulation selected"})}):A==="analysis"?E.jsx(X1,{tree:t.tree,sim:r,setErr:u}):o==="side"||o==="top"||o==="back"?E.jsx(g0,{rv:F,overlay:Ge,rollDeg:C+(o==="top"?90:o==="back"?180:0),onRollDelta:J=>T(L=>(Math.round(L+J)%360+360)%360)}):E.jsx(d0,{rv:F,mode:o==="finished"?"finished":o==="unfinished"?"unfinished":"figure",preset:"3d"}):E.jsx("div",{className:"empty",children:"Pick a rocket and click Load"})]}),E.jsx("div",{className:"vsplit",onPointerDown:$,onPointerMove:be,onPointerUp:Ce,title:"Drag to resize"}),E.jsxs("div",{className:"panel",style:{borderBottom:"none"},children:[E.jsx("span",{className:"tag",children:"Flight"}),n?E.jsx(B1,{fd:n}):E.jsx("div",{className:"empty",children:"Run a simulation"})]})]}),E.jsxs("aside",{className:"inspector",children:[E.jsx("h2",{children:"Properties"}),E.jsx(H1,{node:D,onPatch:Oe,busy:l})]})]}),E.jsx("footer",{children:n?E.jsxs(E.Fragment,{children:[E.jsxs("span",{children:["Apogee ",E.jsxs("b",{children:[n.apogee.toFixed(1)," m"]})]}),E.jsxs("span",{children:["t‑apogee ",E.jsxs("b",{children:[n.time_to_apogee.toFixed(2)," s"]})]}),E.jsxs("span",{children:["Flight time ",E.jsxs("b",{children:[n.flight_time.toFixed(2)," s"]})]}),E.jsxs("span",{children:["Ground hit ",E.jsxs("b",{children:[n.ground_hit_velocity.toFixed(2)," m/s"]})]})]}):E.jsx("span",{style:{color:"#9a7b56"},children:"OpsRocket — Rust core · live design workbench · React + Three.js"})})]})}yu.createRoot(document.getElementById("root")).render(E.jsx(O0.StrictMode,{children:E.jsx(Q1,{})}));
