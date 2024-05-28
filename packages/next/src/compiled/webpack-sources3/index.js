(function(){var e={747:function(e,t,n){"use strict";const s=n(462);const r=n(17);const i=n(73);const u=n(976);const mapToBufferedMap=e=>{if(typeof e!=="object"||!e)return e;const t=Object.assign({},e);if(e.mappings){t.mappings=Buffer.from(e.mappings,"utf-8")}if(e.sourcesContent){t.sourcesContent=e.sourcesContent.map((e=>e&&Buffer.from(e,"utf-8")))}return t};const bufferedMapToMap=e=>{if(typeof e!=="object"||!e)return e;const t=Object.assign({},e);if(e.mappings){t.mappings=e.mappings.toString("utf-8")}if(e.sourcesContent){t.sourcesContent=e.sourcesContent.map((e=>e&&e.toString("utf-8")))}return t};class CachedSource extends s{constructor(e,t){super();this._source=e;this._cachedSourceType=t?t.source:undefined;this._cachedSource=undefined;this._cachedBuffer=t?t.buffer:undefined;this._cachedSize=t?t.size:undefined;this._cachedMaps=t?t.maps:new Map;this._cachedHashUpdate=t?t.hash:undefined}getCachedData(){const e=new Map;for(const t of this._cachedMaps){let n=t[1];if(n.bufferedMap===undefined){n.bufferedMap=mapToBufferedMap(this._getMapFromCacheEntry(n))}e.set(t[0],{map:undefined,bufferedMap:n.bufferedMap})}if(this._cachedSource){this.buffer()}return{buffer:this._cachedBuffer,source:this._cachedSourceType!==undefined?this._cachedSourceType:typeof this._cachedSource==="string"?true:Buffer.isBuffer(this._cachedSource)?false:undefined,size:this._cachedSize,maps:e,hash:this._cachedHashUpdate}}originalLazy(){return this._source}original(){if(typeof this._source==="function")this._source=this._source();return this._source}source(){const e=this._getCachedSource();if(e!==undefined)return e;return this._cachedSource=this.original().source()}_getMapFromCacheEntry(e){if(e.map!==undefined){return e.map}else if(e.bufferedMap!==undefined){return e.map=bufferedMapToMap(e.bufferedMap)}}_getCachedSource(){if(this._cachedSource!==undefined)return this._cachedSource;if(this._cachedBuffer&&this._cachedSourceType!==undefined){return this._cachedSource=this._cachedSourceType?this._cachedBuffer.toString("utf-8"):this._cachedBuffer}}buffer(){if(this._cachedBuffer!==undefined)return this._cachedBuffer;if(this._cachedSource!==undefined){if(Buffer.isBuffer(this._cachedSource)){return this._cachedBuffer=this._cachedSource}return this._cachedBuffer=Buffer.from(this._cachedSource,"utf-8")}if(typeof this.original().buffer==="function"){return this._cachedBuffer=this.original().buffer()}const e=this.source();if(Buffer.isBuffer(e)){return this._cachedBuffer=e}return this._cachedBuffer=Buffer.from(e,"utf-8")}size(){if(this._cachedSize!==undefined)return this._cachedSize;if(this._cachedBuffer!==undefined){return this._cachedSize=this._cachedBuffer.length}const e=this._getCachedSource();if(e!==undefined){return this._cachedSize=Buffer.byteLength(e)}return this._cachedSize=this.original().size()}sourceAndMap(e){const t=e?JSON.stringify(e):"{}";const n=this._cachedMaps.get(t);if(n!==undefined){const e=this._getMapFromCacheEntry(n);return{source:this.source(),map:e}}let s=this._getCachedSource();let r;if(s!==undefined){r=this.original().map(e)}else{const t=this.original().sourceAndMap(e);s=t.source;r=t.map;this._cachedSource=s}this._cachedMaps.set(t,{map:r,bufferedMap:undefined});return{source:s,map:r}}streamChunks(e,t,n,s){const f=e?JSON.stringify(e):"{}";if(this._cachedMaps.has(f)&&(this._cachedBuffer!==undefined||this._cachedSource!==undefined)){const{source:u,map:f}=this.sourceAndMap(e);if(f){return r(u,f,t,n,s,!!(e&&e.finalSource),true)}else{return i(u,t,n,s,!!(e&&e.finalSource))}}const{result:o,source:c,map:a}=u(this.original(),e,t,n,s);this._cachedSource=c;this._cachedMaps.set(f,{map:a,bufferedMap:undefined});return o}map(e){const t=e?JSON.stringify(e):"{}";const n=this._cachedMaps.get(t);if(n!==undefined){return this._getMapFromCacheEntry(n)}const s=this.original().map(e);this._cachedMaps.set(t,{map:s,bufferedMap:undefined});return s}updateHash(e){if(this._cachedHashUpdate!==undefined){for(const t of this._cachedHashUpdate)e.update(t);return}const t=[];let n=undefined;const s={update:e=>{if(typeof e==="string"&&e.length<10240){if(n===undefined){n=e}else{n+=e;if(n.length>102400){t.push(Buffer.from(n));n=undefined}}}else{if(n!==undefined){t.push(Buffer.from(n));n=undefined}t.push(e)}}};this.original().updateHash(s);if(n!==undefined){t.push(Buffer.from(n))}for(const n of t)e.update(n);this._cachedHashUpdate=t}}e.exports=CachedSource},683:function(e,t,n){"use strict";const s=n(462);class CompatSource extends s{static from(e){return e instanceof s?e:new CompatSource(e)}constructor(e){super();this._sourceLike=e}source(){return this._sourceLike.source()}buffer(){if(typeof this._sourceLike.buffer==="function"){return this._sourceLike.buffer()}return super.buffer()}size(){if(typeof this._sourceLike.size==="function"){return this._sourceLike.size()}return super.size()}map(e){if(typeof this._sourceLike.map==="function"){return this._sourceLike.map(e)}return super.map(e)}sourceAndMap(e){if(typeof this._sourceLike.sourceAndMap==="function"){return this._sourceLike.sourceAndMap(e)}return super.sourceAndMap(e)}updateHash(e){if(typeof this._sourceLike.updateHash==="function"){return this._sourceLike.updateHash(e)}if(typeof this._sourceLike.map==="function"){throw new Error("A Source-like object with a 'map' method must also provide an 'updateHash' method")}e.update(this.buffer())}}e.exports=CompatSource},816:function(e,t,n){"use strict";const s=n(462);const r=n(351);const i=n(718);const{getMap:u,getSourceAndMap:f}=n(754);const o=new WeakSet;class ConcatSource extends s{constructor(){super();this._children=[];for(let e=0;e<arguments.length;e++){const t=arguments[e];if(t instanceof ConcatSource){for(const e of t._children){this._children.push(e)}}else{this._children.push(t)}}this._isOptimized=arguments.length===0}getChildren(){if(!this._isOptimized)this._optimize();return this._children}add(e){if(e instanceof ConcatSource){for(const t of e._children){this._children.push(t)}}else{this._children.push(e)}this._isOptimized=false}addAllSkipOptimizing(e){for(const t of e){this._children.push(t)}}buffer(){if(!this._isOptimized)this._optimize();const e=[];for(const t of this._children){if(typeof t.buffer==="function"){e.push(t.buffer())}else{const n=t.source();if(Buffer.isBuffer(n)){e.push(n)}else{e.push(Buffer.from(n,"utf-8"))}}}return Buffer.concat(e)}source(){if(!this._isOptimized)this._optimize();let e="";for(const t of this._children){e+=t.source()}return e}size(){if(!this._isOptimized)this._optimize();let e=0;for(const t of this._children){e+=t.size()}return e}map(e){return u(this,e)}sourceAndMap(e){return f(this,e)}streamChunks(e,t,n,s){if(!this._isOptimized)this._optimize();if(this._children.length===1)return this._children[0].streamChunks(e,t,n,s);let r=0;let u=0;let f=new Map;let o=new Map;const c=!!(e&&e.finalSource);let a="";let h=false;for(const l of this._children){const d=[];const p=[];let g=0;const{generatedLine:_,generatedColumn:S,source:m}=i(l,e,((e,n,s,i,f,o,l)=>{const _=n+r;const S=n===1?s+u:s;if(h){if(n!==1||s!==0){t(undefined,r+1,u,-1,-1,-1,-1)}h=false}const m=i<0||i>=d.length?-1:d[i];const A=l<0||l>=p.length?-1:p[l];g=m<0?0:n;if(c){if(e!==undefined)a+=e;if(m>=0){t(undefined,_,S,m,f,o,A)}}else{if(m<0){t(e,_,S,-1,-1,-1,-1)}else{t(e,_,S,m,f,o,A)}}}),((e,t,s)=>{let r=f.get(t);if(r===undefined){f.set(t,r=f.size);n(r,t,s)}d[e]=r}),((e,t)=>{let n=o.get(t);if(n===undefined){o.set(t,n=o.size);s(n,t)}p[e]=n}));if(m!==undefined)a+=m;if(h){if(_!==1||S!==0){t(undefined,r+1,u,-1,-1,-1,-1);h=false}}if(_>1){u=S}else{u+=S}h=h||c&&g===_;r+=_-1}return{generatedLine:r+1,generatedColumn:u,source:c?a:undefined}}updateHash(e){if(!this._isOptimized)this._optimize();e.update("ConcatSource");for(const t of this._children){t.updateHash(e)}}_optimize(){const e=[];let t=undefined;let n=undefined;const addStringToRawSources=e=>{if(n===undefined){n=e}else if(Array.isArray(n)){n.push(e)}else{n=[typeof n==="string"?n:n.source(),e]}};const addSourceToRawSources=e=>{if(n===undefined){n=e}else if(Array.isArray(n)){n.push(e.source())}else{n=[typeof n==="string"?n:n.source(),e.source()]}};const mergeRawSources=()=>{if(Array.isArray(n)){const t=new r(n.join(""));o.add(t);e.push(t)}else if(typeof n==="string"){const t=new r(n);o.add(t);e.push(t)}else{e.push(n)}};for(const s of this._children){if(typeof s==="string"){if(t===undefined){t=s}else{t+=s}}else{if(t!==undefined){addStringToRawSources(t);t=undefined}if(o.has(s)){addSourceToRawSources(s)}else{if(n!==undefined){mergeRawSources();n=undefined}e.push(s)}}}if(t!==undefined){addStringToRawSources(t)}if(n!==undefined){mergeRawSources()}this._children=e;this._isOptimized=true}}e.exports=ConcatSource},573:function(e,t,n){"use strict";const{getMap:s,getSourceAndMap:r}=n(754);const i=n(266);const u=n(316);const f=n(462);const o=n(709);class OriginalSource extends f{constructor(e,t){super();const n=Buffer.isBuffer(e);this._value=n?undefined:e;this._valueAsBuffer=n?e:undefined;this._name=t}getName(){return this._name}source(){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}return this._value}buffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}return this._valueAsBuffer}map(e){return s(this,e)}sourceAndMap(e){return r(this,e)}streamChunks(e,t,n,s){if(this._value===undefined){this._value=this._valueAsBuffer.toString("utf-8")}n(0,this._name,this._value);const r=!!(e&&e.finalSource);if(!e||e.columns!==false){const e=o(this._value);let n=1;let s=0;if(e!==null){for(const i of e){const e=i.endsWith("\n");if(e&&i.length===1){if(!r)t(i,n,s,-1,-1,-1,-1)}else{const e=r?undefined:i;t(e,n,s,0,n,s,-1)}if(e){n++;s=0}else{s+=i.length}}}return{generatedLine:n,generatedColumn:s,source:r?this._value:undefined}}else if(r){const e=u(this._value);const{generatedLine:n,generatedColumn:s}=e;if(s===0){for(let e=1;e<n;e++)t(undefined,e,0,0,e,0,-1)}else{for(let e=1;e<=n;e++)t(undefined,e,0,0,e,0,-1)}return e}else{let e=1;const n=i(this._value);let s;for(s of n){t(r?undefined:s,e,0,0,e,0,-1);e++}return n.length===0||s.endsWith("\n")?{generatedLine:n.length+1,generatedColumn:0,source:r?this._value:undefined}:{generatedLine:n.length,generatedColumn:s.length,source:r?this._value:undefined}}}updateHash(e){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._value,"utf-8")}e.update("OriginalSource");e.update(this._valueAsBuffer);e.update(this._name||"")}}e.exports=OriginalSource},86:function(e,t,n){"use strict";const s=n(462);const r=n(351);const i=n(718);const{getMap:u,getSourceAndMap:f}=n(754);const o=/\n(?=.|\s)/g;class PrefixSource extends s{constructor(e,t){super();this._source=typeof t==="string"||Buffer.isBuffer(t)?new r(t,true):t;this._prefix=e}getPrefix(){return this._prefix}original(){return this._source}source(){const e=this._source.source();const t=this._prefix;return t+e.replace(o,"\n"+t)}map(e){return u(this,e)}sourceAndMap(e){return f(this,e)}streamChunks(e,t,n,s){const r=this._prefix;const u=r.length;const f=!!(e&&e.columns===false);const{generatedLine:c,generatedColumn:a,source:h}=i(this._source,e,((e,n,s,i,o,c,a)=>{if(s!==0){s+=u}else if(e!==undefined){if(f||i<0){e=r+e}else if(u>0){t(r,n,s,-1,-1,-1,-1);s+=u}}else if(!f){s+=u}t(e,n,s,i,o,c,a)}),n,s);return{generatedLine:c,generatedColumn:a===0?0:u+a,source:h!==undefined?r+h.replace(o,"\n"+r):undefined}}updateHash(e){e.update("PrefixSource");this._source.updateHash(e);e.update(this._prefix)}}e.exports=PrefixSource},351:function(e,t,n){"use strict";const s=n(73);const{internString:r,isDualStringBufferCachingEnabled:i}=n(912);const u=n(462);class RawSource extends u{constructor(e,t=false){super();const n=Buffer.isBuffer(e);if(!n&&typeof e!=="string"){throw new TypeError("argument 'value' must be either string of Buffer")}this._valueIsBuffer=!t&&n;this._value=t&&n?undefined:typeof e==="string"?r(e):e;this._valueAsBuffer=n?e:undefined;this._valueAsString=n?undefined:r(e)}isBuffer(){return this._valueIsBuffer}source(){if(this._value===undefined){const e=r(this._valueAsBuffer.toString("utf-8"));if(i()){this._value=e}return e}return this._value}buffer(){if(this._valueAsBuffer===undefined){const e=Buffer.from(this._value,"utf-8");if(i()){this._valueAsBuffer=e}return e}return this._valueAsBuffer}map(e){return null}streamChunks(e,t,n,u){if(this._value===undefined&&i()){this._value=Buffer.from(this._valueAsBuffer,"utf-8")}let f=this._valueAsString;if(f===undefined){f=typeof this._value==="string"?this._value:r(this._value.toString("utf-8"));if(i()){this._valueAsString=f}}return s(f,t,n,u,!!(e&&e.finalSource))}updateHash(e){e.update("RawSource");e.update(this.buffer())}}e.exports=RawSource},742:function(e,t,n){"use strict";const{getMap:s,getSourceAndMap:r}=n(754);const i=n(718);const u=n(462);const f=n(266);const o=typeof process==="object"&&process.versions&&typeof process.versions.v8==="string"&&!/^[0-6]\./.test(process.versions.v8);const c=536870912;class Replacement{constructor(e,t,n,s){this.start=e;this.end=t;this.content=n;this.name=s;if(!o){this.index=-1}}}class ReplaceSource extends u{constructor(e,t){super();this._source=e;this._name=t;this._replacements=[];this._isSorted=true}getName(){return this._name}getReplacements(){this._sortReplacements();return this._replacements}replace(e,t,n,s){if(typeof n!=="string")throw new Error("insertion must be a string, but is a "+typeof n);this._replacements.push(new Replacement(e,t,n,s));this._isSorted=false}insert(e,t,n){if(typeof t!=="string")throw new Error("insertion must be a string, but is a "+typeof t+": "+t);this._replacements.push(new Replacement(e,e-1,t,n));this._isSorted=false}source(){if(this._replacements.length===0){return this._source.source()}let e=this._source.source();let t=0;const n=[];this._sortReplacements();for(const s of this._replacements){const r=Math.floor(s.start);const i=Math.floor(s.end+1);if(t<r){const s=r-t;n.push(e.slice(0,s));e=e.slice(s);t=r}n.push(s.content);if(t<i){const n=i-t;e=e.slice(n);t=i}}n.push(e);return n.join("")}map(e){if(this._replacements.length===0){return this._source.map(e)}return s(this,e)}sourceAndMap(e){if(this._replacements.length===0){return this._source.sourceAndMap(e)}return r(this,e)}original(){return this._source}_sortReplacements(){if(this._isSorted)return;if(o){this._replacements.sort((function(e,t){const n=e.start-t.start;if(n!==0)return n;const s=e.end-t.end;if(s!==0)return s;return 0}))}else{this._replacements.forEach(((e,t)=>e.index=t));this._replacements.sort((function(e,t){const n=e.start-t.start;if(n!==0)return n;const s=e.end-t.end;if(s!==0)return s;return e.index-t.index}))}this._isSorted=true}streamChunks(e,t,n,s){this._sortReplacements();const r=this._replacements;let u=0;let o=0;let a=-1;let h=o<r.length?Math.floor(r[o].start):c;let l=0;let d=0;let p=0;const g=[];const _=new Map;const S=[];const checkOriginalContent=(e,t,n,s)=>{let r=e<g.length?g[e]:undefined;if(r===undefined)return false;if(typeof r==="string"){r=f(r);g[e]=r}const i=t<=r.length?r[t-1]:null;if(i===null)return false;return i.slice(n,n+s.length)===s};let{generatedLine:m,generatedColumn:A}=i(this._source,Object.assign({},e,{finalSource:false}),((e,n,i,g,m,A,M)=>{let B=0;let b=u+e.length;if(a>u){if(a>=b){const t=n+l;if(e.endsWith("\n")){l--;if(p===t){d+=i}}else if(p===t){d-=e.length}else{d=-e.length;p=t}u=b;return}B=a-u;if(checkOriginalContent(g,m,A,e.slice(0,B))){A+=B}u+=B;const t=n+l;if(p===t){d-=B}else{d=-B;p=t}i+=B}if(h<b){do{let C=n+l;if(h>u){const n=h-u;const s=e.slice(B,B+n);t(s,C,i+(C===p?d:0),g,m,A,M<0||M>=S.length?-1:S[M]);i+=n;B+=n;u=h;if(checkOriginalContent(g,m,A,s)){A+=s.length}}const{content:v,name:y}=r[o];let O=f(v);let w=M;if(g>=0&&y){let e=_.get(y);if(e===undefined){e=_.size;_.set(y,e);s(e,y)}w=e}for(let e=0;e<O.length;e++){const n=O[e];t(n,C,i+(C===p?d:0),g,m,A,w);w=-1;if(e===O.length-1&&!n.endsWith("\n")){if(p===C){d+=n.length}else{d=n.length;p=C}}else{l++;C++;d=-i;p=C}}a=Math.max(a,Math.floor(r[o].end+1));o++;h=o<r.length?Math.floor(r[o].start):c;const x=e.length-b+a-B;if(x>0){if(a>=b){let t=n+l;if(e.endsWith("\n")){l--;if(p===t){d+=i}}else if(p===t){d-=e.length-B}else{d=B-e.length;p=t}u=b;return}const t=n+l;if(checkOriginalContent(g,m,A,e.slice(B,B+x))){A+=x}B+=x;u+=x;if(p===t){d-=x}else{d=-x;p=t}i+=x}}while(h<b)}if(B<e.length){const s=B===0?e:e.slice(B);const r=n+l;t(s,r,i+(r===p?d:0),g,m,A,M<0?-1:S[M])}u=b}),((e,t,s)=>{while(g.length<e)g.push(undefined);g[e]=s;n(e,t,s)}),((e,t)=>{let n=_.get(t);if(n===undefined){n=_.size;_.set(t,n);s(n,t)}S[e]=n}));let M="";for(;o<r.length;o++){M+=r[o].content}let B=m+l;let b=f(M);for(let e=0;e<b.length;e++){const n=b[e];t(n,B,A+(B===p?d:0),-1,-1,-1,-1);if(e===b.length-1&&!n.endsWith("\n")){if(p===B){d+=n.length}else{d=n.length;p=B}}else{l++;B++;d=-A;p=B}}return{generatedLine:B,generatedColumn:A+(B===p?d:0)}}updateHash(e){this._sortReplacements();e.update("ReplaceSource");this._source.updateHash(e);e.update(this._name||"");for(const t of this._replacements){e.update(`${t.start}${t.end}${t.content}${t.name}`)}}}e.exports=ReplaceSource},188:function(e,t,n){"use strict";const s=n(462);class SizeOnlySource extends s{constructor(e){super();this._size=e}_error(){return new Error("Content and Map of this Source is not available (only size() is supported)")}size(){return this._size}source(){throw this._error()}buffer(){throw this._error()}map(e){throw this._error()}updateHash(){throw this._error()}}e.exports=SizeOnlySource},462:function(e){"use strict";class Source{source(){throw new Error("Abstract")}buffer(){const e=this.source();if(Buffer.isBuffer(e))return e;return Buffer.from(e,"utf-8")}size(){return this.buffer().length}map(e){return null}sourceAndMap(e){return{source:this.source(),map:this.map(e)}}updateHash(e){throw new Error("Abstract")}}e.exports=Source},582:function(e,t,n){"use strict";const s=n(462);const r=n(17);const i=n(673);const{getMap:u,getSourceAndMap:f}=n(754);class SourceMapSource extends s{constructor(e,t,n,s,r,i){super();const u=Buffer.isBuffer(e);this._valueAsString=u?undefined:e;this._valueAsBuffer=u?e:undefined;this._name=t;this._hasSourceMap=!!n;const f=Buffer.isBuffer(n);const o=typeof n==="string";this._sourceMapAsObject=f||o?undefined:n;this._sourceMapAsString=o?n:undefined;this._sourceMapAsBuffer=f?n:undefined;this._hasOriginalSource=!!s;const c=Buffer.isBuffer(s);this._originalSourceAsString=c?undefined:s;this._originalSourceAsBuffer=c?s:undefined;this._hasInnerSourceMap=!!r;const a=Buffer.isBuffer(r);const h=typeof r==="string";this._innerSourceMapAsObject=a||h?undefined:r;this._innerSourceMapAsString=h?r:undefined;this._innerSourceMapAsBuffer=a?r:undefined;this._removeOriginalSource=i}_ensureValueBuffer(){if(this._valueAsBuffer===undefined){this._valueAsBuffer=Buffer.from(this._valueAsString,"utf-8")}}_ensureValueString(){if(this._valueAsString===undefined){this._valueAsString=this._valueAsBuffer.toString("utf-8")}}_ensureOriginalSourceBuffer(){if(this._originalSourceAsBuffer===undefined&&this._hasOriginalSource){this._originalSourceAsBuffer=Buffer.from(this._originalSourceAsString,"utf-8")}}_ensureOriginalSourceString(){if(this._originalSourceAsString===undefined&&this._hasOriginalSource){this._originalSourceAsString=this._originalSourceAsBuffer.toString("utf-8")}}_ensureInnerSourceMapObject(){if(this._innerSourceMapAsObject===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsObject=JSON.parse(this._innerSourceMapAsString)}}_ensureInnerSourceMapBuffer(){if(this._innerSourceMapAsBuffer===undefined&&this._hasInnerSourceMap){this._ensureInnerSourceMapString();this._innerSourceMapAsBuffer=Buffer.from(this._innerSourceMapAsString,"utf-8")}}_ensureInnerSourceMapString(){if(this._innerSourceMapAsString===undefined&&this._hasInnerSourceMap){if(this._innerSourceMapAsBuffer!==undefined){this._innerSourceMapAsString=this._innerSourceMapAsBuffer.toString("utf-8")}else{this._innerSourceMapAsString=JSON.stringify(this._innerSourceMapAsObject)}}}_ensureSourceMapObject(){if(this._sourceMapAsObject===undefined){this._ensureSourceMapString();this._sourceMapAsObject=JSON.parse(this._sourceMapAsString)}}_ensureSourceMapBuffer(){if(this._sourceMapAsBuffer===undefined){this._ensureSourceMapString();this._sourceMapAsBuffer=Buffer.from(this._sourceMapAsString,"utf-8")}}_ensureSourceMapString(){if(this._sourceMapAsString===undefined){if(this._sourceMapAsBuffer!==undefined){this._sourceMapAsString=this._sourceMapAsBuffer.toString("utf-8")}else{this._sourceMapAsString=JSON.stringify(this._sourceMapAsObject)}}}getArgsAsBuffers(){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();return[this._valueAsBuffer,this._name,this._sourceMapAsBuffer,this._originalSourceAsBuffer,this._innerSourceMapAsBuffer,this._removeOriginalSource]}buffer(){this._ensureValueBuffer();return this._valueAsBuffer}source(){this._ensureValueString();return this._valueAsString}map(e){if(!this._hasInnerSourceMap){this._ensureSourceMapObject();return this._sourceMapAsObject}return u(this,e)}sourceAndMap(e){if(!this._hasInnerSourceMap){this._ensureValueString();this._ensureSourceMapObject();return{source:this._valueAsString,map:this._sourceMapAsObject}}return f(this,e)}streamChunks(e,t,n,s){this._ensureValueString();this._ensureSourceMapObject();this._ensureOriginalSourceString();if(this._hasInnerSourceMap){this._ensureInnerSourceMapObject();return i(this._valueAsString,this._sourceMapAsObject,this._name,this._originalSourceAsString,this._innerSourceMapAsObject,this._removeOriginalSource,t,n,s,!!(e&&e.finalSource),!!(e&&e.columns!==false))}else{return r(this._valueAsString,this._sourceMapAsObject,t,n,s,!!(e&&e.finalSource),!!(e&&e.columns!==false))}}updateHash(e){this._ensureValueBuffer();this._ensureSourceMapBuffer();this._ensureOriginalSourceBuffer();this._ensureInnerSourceMapBuffer();e.update("SourceMapSource");e.update(this._valueAsBuffer);e.update(this._sourceMapAsBuffer);if(this._hasOriginalSource){e.update(this._originalSourceAsBuffer)}if(this._hasInnerSourceMap){e.update(this._innerSourceMapAsBuffer)}e.update(this._removeOriginalSource?"true":"false")}}e.exports=SourceMapSource},139:function(e){"use strict";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");const n=32;const createMappingsSerializer=e=>{const t=e&&e.columns===false;return t?createLinesOnlyMappingsSerializer():createFullMappingsSerializer()};const createFullMappingsSerializer=()=>{let e=1;let s=0;let r=0;let i=1;let u=0;let f=0;let o=false;let c=false;let a=true;return(h,l,d,p,g,_)=>{if(o&&e===h){if(d===r&&p===i&&g===u&&!c&&_<0){return""}}else{if(d<0){return""}}let S;if(e<h){S=";".repeat(h-e);e=h;s=0;a=false}else if(a){S="";a=false}else{S=","}const writeValue=e=>{const s=e>>>31&1;const r=e>>31;const i=e+r^r;let u=i<<1|s;for(;;){const e=u&31;u>>=5;if(u===0){S+=t[e];break}else{S+=t[e|n]}}};writeValue(l-s);s=l;if(d>=0){o=true;if(d===r){S+="A"}else{writeValue(d-r);r=d}writeValue(p-i);i=p;if(g===u){S+="A"}else{writeValue(g-u);u=g}if(_>=0){writeValue(_-f);f=_;c=true}else{c=false}}else{o=false}return S}};const createLinesOnlyMappingsSerializer=()=>{let e=0;let s=1;let r=0;let i=1;return(u,f,o,c,a,h)=>{if(o<0){return""}if(e===u){return""}let l;const writeValue=e=>{const s=e>>>31&1;const r=e>>31;const i=e+r^r;let u=i<<1|s;for(;;){const e=u&31;u>>=5;if(u===0){l+=t[e];break}else{l+=t[e|n]}}};e=u;if(u===s+1){s=u;if(o===r){r=o;if(c===i+1){i=c;return";AACA"}else{l=";AA";writeValue(c-i);i=c;return l+"A"}}else{l=";A";writeValue(o-r);r=o;writeValue(c-i);i=c;return l+"A"}}else{l=";".repeat(u-s);s=u;if(o===r){r=o;if(c===i+1){i=c;return l+"AACA"}else{l+="AA";writeValue(c-i);i=c;return l+"A"}}else{l+="A";writeValue(o-r);r=o;writeValue(c-i);i=c;return l+"A"}}}};e.exports=createMappingsSerializer},754:function(e,t,n){"use strict";const s=n(139);t.getSourceAndMap=(e,t)=>{let n="";let r="";let i=[];let u=[];let f=[];const o=s(t);const{source:c}=e.streamChunks(Object.assign({},t,{finalSource:true}),((e,t,s,i,u,f,c)=>{if(e!==undefined)n+=e;r+=o(t,s,i,u,f,c)}),((e,t,n)=>{while(i.length<e){i.push(null)}i[e]=t;if(n!==undefined){while(u.length<e){u.push(null)}u[e]=n}}),((e,t)=>{while(f.length<e){f.push(null)}f[e]=t}));return{source:c!==undefined?c:n,map:r.length>0?{version:3,file:"x",mappings:r,sources:i,sourcesContent:u.length>0?u:undefined,names:f}:null}};t.getMap=(e,t)=>{let n="";let r=[];let i=[];let u=[];const f=s(t);e.streamChunks(Object.assign({},t,{source:false,finalSource:true}),((e,t,s,r,i,u,o)=>{n+=f(t,s,r,i,u,o)}),((e,t,n)=>{while(r.length<e){r.push(null)}r[e]=t;if(n!==undefined){while(i.length<e){i.push(null)}i[e]=n}}),((e,t)=>{while(u.length<e){u.push(null)}u[e]=t}));return n.length>0?{version:3,file:"x",mappings:n,sources:r,sourcesContent:i.length>0?i:undefined,names:u}:null}},316:function(e){"use strict";const t="\n".charCodeAt(0);const getGeneratedSourceInfo=e=>{if(e===undefined){return{}}const n=e.lastIndexOf("\n");if(n===-1){return{generatedLine:1,generatedColumn:e.length,source:e}}let s=2;for(let r=0;r<n;r++){if(e.charCodeAt(r)===t)s++}return{generatedLine:s,generatedColumn:e.length-n-1,source:e}};e.exports=getGeneratedSourceInfo},274:function(e){"use strict";const getSource=(e,t)=>{if(t<0)return null;const{sourceRoot:n,sources:s}=e;const r=s[t];if(!n)return r;if(n.endsWith("/"))return n+r;return n+"/"+r};e.exports=getSource},894:function(e){"use strict";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";const n=32;const s=64;const r=s|1;const i=s|2;const u=31;const f=new Uint8Array("z".charCodeAt(0)+1);{f.fill(i);for(let e=0;e<t.length;e++){f[t.charCodeAt(e)]=e}f[",".charCodeAt(0)]=s;f[";".charCodeAt(0)]=r}const o=f.length-1;const readMappings=(e,t)=>{const i=new Uint32Array([0,0,1,0,0]);let c=0;let a=0;let h=0;let l=1;let d=-1;for(let p=0;p<e.length;p++){const g=e.charCodeAt(p);if(g>o)continue;const _=f[g];if((_&s)!==0){if(i[0]>d){if(c===1){t(l,i[0],-1,-1,-1,-1)}else if(c===4){t(l,i[0],i[1],i[2],i[3],-1)}else if(c===5){t(l,i[0],i[1],i[2],i[3],i[4])}d=i[0]}c=0;if(_===r){l++;i[0]=0;d=-1}}else if((_&n)===0){a|=_<<h;const e=a&1?-(a>>1):a>>1;i[c++]+=e;h=0;a=0}else{a|=(_&u)<<h;h+=5}}if(c===1){t(l,i[0],-1,-1,-1,-1)}else if(c===4){t(l,i[0],i[1],i[2],i[3],-1)}else if(c===5){t(l,i[0],i[1],i[2],i[3],i[4])}};e.exports=readMappings},266:function(e){const splitIntoLines=e=>{const t=[];const n=e.length;let s=0;for(;s<n;){const r=e.charCodeAt(s);if(r===10){t.push("\n");s++}else{let r=s+1;while(r<n&&e.charCodeAt(r)!==10)r++;t.push(e.slice(s,r+1));s=r+1}}return t};e.exports=splitIntoLines},709:function(e){const splitIntoPotentialTokens=e=>{const t=e.length;if(t===0)return null;const n=[];let s=0;for(;s<t;){const r=s;e:{let n=e.charCodeAt(s);while(n!==10&&n!==59&&n!==123&&n!==125){if(++s>=t)break e;n=e.charCodeAt(s)}while(n===59||n===32||n===123||n===125||n===13||n===9){if(++s>=t)break e;n=e.charCodeAt(s)}if(n===10){s++}}n.push(e.slice(r,s))}return n};e.exports=splitIntoPotentialTokens},976:function(e,t,n){"use strict";const s=n(139);const r=n(718);const streamAndGetSourceAndMap=(e,t,n,i,u)=>{let f="";let o="";let c=[];let a=[];let h=[];const l=s(Object.assign({},t,{columns:true}));const d=!!(t&&t.finalSource);const{generatedLine:p,generatedColumn:g,source:_}=r(e,t,((e,t,s,r,i,u,c)=>{if(e!==undefined)f+=e;o+=l(t,s,r,i,u,c);return n(d?undefined:e,t,s,r,i,u,c)}),((e,t,n)=>{while(c.length<e){c.push(null)}c[e]=t;if(n!==undefined){while(a.length<e){a.push(null)}a[e]=n}return i(e,t,n)}),((e,t)=>{while(h.length<e){h.push(null)}h[e]=t;return u(e,t)}));const S=_!==undefined?_:f;return{result:{generatedLine:p,generatedColumn:g,source:d?S:undefined},source:S,map:o.length>0?{version:3,file:"x",mappings:o,sources:c,sourcesContent:a.length>0?a:undefined,names:h}:null}};e.exports=streamAndGetSourceAndMap},718:function(e,t,n){"use strict";const s=n(73);const r=n(17);e.exports=(e,t,n,i,u)=>{if(typeof e.streamChunks==="function"){return e.streamChunks(t,n,i,u)}else{const f=e.sourceAndMap(t);if(f.map){return r(f.source,f.map,n,i,u,!!(t&&t.finalSource),!!(t&&t.columns!==false))}else{return s(f.source,n,i,u,!!(t&&t.finalSource))}}}},673:function(e,t,n){"use strict";const s=n(17);const r=n(266);const streamChunksOfCombinedSourceMap=(e,t,n,i,u,f,o,c,a,h,l)=>{let d=new Map;let p=new Map;const g=[];const _=[];const S=[];let m=-2;const A=[];const M=[];const B=[];const b=[];const C=[];const v=[];const y=[];const findInnerMapping=(e,t)=>{if(e>y.length)return-1;const{mappingsData:n}=y[e-1];let s=0;let r=n.length/5;while(s<r){let e=s+r>>1;if(n[e*5]<=t){s=e+1}else{r=e}}if(s===0)return-1;return s-1};return s(e,t,((t,s,u,h,l,O,w)=>{if(h===m){const m=findInnerMapping(l,O);if(m!==-1){const{chunks:e,mappingsData:n}=y[l-1];const i=m*5;const f=n[i+1];const h=n[i+2];let g=n[i+3];let x=n[i+4];if(f>=0){const l=e[m];const y=n[i];const z=O-y;if(z>0){let e=f<b.length?b[f]:null;if(e===undefined){const t=B[f];e=t?r(t):null;b[f]=e}if(e!==null){const t=h<=e.length?e[h-1].slice(g,g+z):"";if(l.slice(0,z)===t){g+=z;x=-1}}}let k=f<A.length?A[f]:-2;if(k===-2){const[e,t]=f<M.length?M[f]:[null,undefined];let n=d.get(e);if(n===undefined){d.set(e,n=d.size);c(n,e,t)}k=n;A[f]=k}let L=-1;if(x>=0){L=x<C.length?C[x]:-2;if(L===-2){const e=x<v.length?v[x]:undefined;if(e){let t=p.get(e);if(t===undefined){p.set(e,t=p.size);a(t,e)}L=t}else{L=-1}C[x]=L}}else if(w>=0){let e=b[f];if(e===undefined){const t=B[f];e=t?r(t):null;b[f]=e}if(e!==null){const t=S[w];const n=h<=e.length?e[h-1].slice(g,g+t.length):"";if(t===n){L=w<_.length?_[w]:-2;if(L===-2){const e=S[w];if(e){let t=p.get(e);if(t===undefined){p.set(e,t=p.size);a(t,e)}L=t}else{L=-1}_[w]=L}}}}o(t,s,u,k,h,g,L);return}}if(f){o(t,s,u,-1,-1,-1,-1);return}else{if(g[h]===-2){let t=d.get(n);if(t===undefined){d.set(e,t=d.size);c(t,n,i)}g[h]=t}}}const x=h<0||h>=g.length?-1:g[h];if(x<0){o(t,s,u,-1,-1,-1,-1)}else{let e=-1;if(w>=0&&w<_.length){e=_[w];if(e===-2){const t=S[w];let n=p.get(t);if(n===undefined){p.set(t,n=p.size);a(n,t)}e=n;_[w]=e}}o(t,s,u,x,l,O,e)}}),((e,t,r)=>{if(t===n){m=e;if(i!==undefined)r=i;else i=r;g[e]=-2;s(r,u,((e,t,n,s,r,i,u)=>{while(y.length<t){y.push({mappingsData:[],chunks:[]})}const f=y[t-1];f.mappingsData.push(n,s,r,i,u);f.chunks.push(e)}),((e,t,n)=>{B[e]=n;b[e]=undefined;A[e]=-2;M[e]=[t,n]}),((e,t)=>{C[e]=-2;v[e]=t}),false,l)}else{let n=d.get(t);if(n===undefined){d.set(t,n=d.size);c(n,t,r)}g[e]=n}}),((e,t)=>{_[e]=-2;S[e]=t}),h,l)};e.exports=streamChunksOfCombinedSourceMap},73:function(e,t,n){"use strict";const s=n(316);const r=n(266);const streamChunksOfRawSource=(e,t,n,s)=>{let i=1;const u=r(e);let f;for(f of u){t(f,i,0,-1,-1,-1,-1);i++}return u.length===0||f.endsWith("\n")?{generatedLine:u.length+1,generatedColumn:0}:{generatedLine:u.length,generatedColumn:f.length}};e.exports=(e,t,n,r,i)=>i?s(e):streamChunksOfRawSource(e,t,n,r)},17:function(e,t,n){"use strict";const s=n(316);const r=n(274);const i=n(894);const u=n(266);const streamChunksOfSourceMapFull=(e,t,n,s,f)=>{const o=u(e);if(o.length===0){return{generatedLine:1,generatedColumn:0}}const{sources:c,sourcesContent:a,names:h,mappings:l}=t;for(let e=0;e<c.length;e++){s(e,r(t,e),a&&a[e]||undefined)}if(h){for(let e=0;e<h.length;e++){f(e,h[e])}}const d=o[o.length-1];const p=d.endsWith("\n");const g=p?o.length+1:o.length;const _=p?0:d.length;let S=1;let m=0;let A=false;let M=-1;let B=-1;let b=-1;let C=-1;const onMapping=(e,t,s,r,i,u)=>{if(A&&S<=o.length){let s;const r=S;const i=m;const u=o[S-1];if(e!==S){s=u.slice(m);S++;m=0}else{s=u.slice(m,t);m=t}if(s){n(s,r,i,M,B,b,C)}A=false}if(e>S&&m>0){if(S<=o.length){const e=o[S-1].slice(m);n(e,S,m,-1,-1,-1,-1)}S++;m=0}while(e>S){if(S<=o.length){n(o[S-1],S,0,-1,-1,-1,-1)}S++}if(t>m){if(S<=o.length){const e=o[S-1].slice(m,t);n(e,S,m,-1,-1,-1,-1)}m=t}if(s>=0&&(e<g||e===g&&t<_)){A=true;M=s;B=r;b=i;C=u}};i(l,onMapping);onMapping(g,_,-1,-1,-1,-1);return{generatedLine:g,generatedColumn:_}};const streamChunksOfSourceMapLinesFull=(e,t,n,s,f)=>{const o=u(e);if(o.length===0){return{generatedLine:1,generatedColumn:0}}const{sources:c,sourcesContent:a,mappings:h}=t;for(let e=0;e<c.length;e++){s(e,r(t,e),a&&a[e]||undefined)}let l=1;const onMapping=(e,t,s,r,i,u)=>{if(s<0||e<l||e>o.length){return}while(e>l){if(l<=o.length){n(o[l-1],l,0,-1,-1,-1,-1)}l++}if(e<=o.length){n(o[e-1],e,0,s,r,i,-1);l++}};i(h,onMapping);for(;l<=o.length;l++){n(o[l-1],l,0,-1,-1,-1,-1)}const d=o[o.length-1];const p=d.endsWith("\n");const g=p?o.length+1:o.length;const _=p?0:d.length;return{generatedLine:g,generatedColumn:_}};const streamChunksOfSourceMapFinal=(e,t,n,u,f)=>{const o=s(e);const{generatedLine:c,generatedColumn:a}=o;if(c===1&&a===0)return o;const{sources:h,sourcesContent:l,names:d,mappings:p}=t;for(let e=0;e<h.length;e++){u(e,r(t,e),l&&l[e]||undefined)}if(d){for(let e=0;e<d.length;e++){f(e,d[e])}}let g=0;const onMapping=(e,t,s,r,i,u)=>{if(e>=c&&(t>=a||e>c)){return}if(s>=0){n(undefined,e,t,s,r,i,u);g=e}else if(g===e){n(undefined,e,t,-1,-1,-1,-1);g=0}};i(p,onMapping);return o};const streamChunksOfSourceMapLinesFinal=(e,t,n,u,f)=>{const o=s(e);const{generatedLine:c,generatedColumn:a}=o;if(c===1&&a===0){return{generatedLine:1,generatedColumn:0}}const{sources:h,sourcesContent:l,mappings:d}=t;for(let e=0;e<h.length;e++){u(e,r(t,e),l&&l[e]||undefined)}const p=a===0?c-1:c;let g=1;const onMapping=(e,t,s,r,i,u)=>{if(s>=0&&g<=e&&e<=p){n(undefined,e,0,s,r,i,-1);g=e+1}};i(d,onMapping);return o};e.exports=(e,t,n,s,r,i,u)=>{if(u){return i?streamChunksOfSourceMapFinal(e,t,n,s,r):streamChunksOfSourceMapFull(e,t,n,s,r)}else{return i?streamChunksOfSourceMapLinesFinal(e,t,n,s,r):streamChunksOfSourceMapLinesFull(e,t,n,s,r)}}},912:function(e){"use strict";let t=true;function isDualStringBufferCachingEnabled(){return t}function enableDualStringBufferCaching(){t=true}function disableDualStringBufferCaching(){t=false}const n=new Map;function internString(e){if(!isStringInterningEnabled()||!e||typeof e!=="string"){return e}let t=n.get(e);if(t===undefined){t=e;n.set(e,t)}return t}let s=0;function isStringInterningEnabled(){return s>0}function enableStringInterning(){s++}function disableStringInterning(){if(--s<=0){n.clear();s=0}}e.exports={disableDualStringBufferCaching:disableDualStringBufferCaching,disableStringInterning:disableStringInterning,enableDualStringBufferCaching:enableDualStringBufferCaching,enableStringInterning:enableStringInterning,internString:internString,isDualStringBufferCachingEnabled:isDualStringBufferCachingEnabled}},913:function(e,t,n){const defineExport=(e,n)=>{let s;Object.defineProperty(t,e,{get:()=>{if(n!==undefined){s=n();n=undefined}return s},configurable:true})};defineExport("Source",(()=>n(462)));defineExport("RawSource",(()=>n(351)));defineExport("OriginalSource",(()=>n(573)));defineExport("SourceMapSource",(()=>n(582)));defineExport("CachedSource",(()=>n(747)));defineExport("ConcatSource",(()=>n(816)));defineExport("ReplaceSource",(()=>n(742)));defineExport("PrefixSource",(()=>n(86)));defineExport("SizeOnlySource",(()=>n(188)));defineExport("CompatSource",(()=>n(683)));defineExport("stringBufferUtils",(()=>n(912)))}};var t={};function __nccwpck_require__(n){var s=t[n];if(s!==undefined){return s.exports}var r=t[n]={exports:{}};var i=true;try{e[n](r,r.exports,__nccwpck_require__);i=false}finally{if(i)delete t[n]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(913);module.exports=n})();