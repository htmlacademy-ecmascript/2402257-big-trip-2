(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=v;var g=function(t){return t instanceof w},b=function t(e,n,i){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,s=o}return!i&&s&&($=s),s||!i&&$},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},D=_;D.l=b,D.i=g,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!D.u(e)||e,f=D.p(t),p=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(a)},h=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case d:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return p(c?_-g:_+(6-g),m);case a:case u:return h($+"Hours",0);case r:return h($+"Minutes",1);case s:return h($+"Seconds",2);case i:return h($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,c=D.p(t),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[u]=f+"Date",o[l]=f+"Month",o[d]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],h=c===a?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[p](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,c){var u,f=this;n=Number(n);var p=D.p(c),h=function(t){var e=M(f);return D.w(e.date(e.date()+Math.round(t*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[p]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return D.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,f){var p,h=D.p(u),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,$=D.m(this,v);return $=(p={},p[d]=$/12,p[l]=$,p[c]=$/3,p[o]=(_-m)/6048e5,p[a]=(_-m)/864e5,p[r]=_/e,p[s]=_/t,p[i]=_/1e3,p)[h]||_,f?$:D.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),S=w.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof $},f=function(t,e,n){return new $(t,n,e.$l)},p=function(t){return e.p(t)+"s"},h=function(t){return t<0},v=function(t){return h(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},_=function(t,e){return t?h(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function h(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*d[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=h.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*d[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/o),t%=o,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/s),t%=s,this.$d.minutes=v(t/i),t%=i,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=_(n,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=_(a,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,c=s.format||r.format||o.format?"T":"",d=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},m.as=function(t){return this.$ms/d[p(t)]},m.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/d[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var i;return i=e?t*d[p(e)]:u(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return f(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},h}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=u;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return u(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return u(t)&&(t=t.asMilliseconds()),a.bind(this)(t,e)}}}()},176:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(e,n,i){var s=n.prototype,r=s.format;i.en.formats=t,s.format=function(e){void 0===e&&(e="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,i=function(e,n){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,i,s){var r=s&&s.toUpperCase();return i||n[s]||t[s]||n[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))}(e,void 0===n?{}:n);return r.call(this,i)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var i=n(484),s=n.n(i),r=n(646),a=n.n(r),o=n(176),l=n.n(o);s().extend(l()),s().extend(a());const c="HH:mm";function d(t=1e4){return Math.floor(Math.random()*t)}function u(t){return t?s()(t).format("D MMMM"):""}function f(t){return t?s()(t).format(c):""}function p(t){return t?`${s()(t).format("DD/MM/YY")} ${s()(t).format(c)}`:""}function h(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}function v(t,e,n,i,s){const{infoText:r,pictures:a}=i,{type:o,name:l,startTime:c,endTime:d,price:u}=t,f=p(c),v=p(d),m=h(l);return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                         ${function(t){const e=[...new Set(t.map((t=>t.type)))];return e&&0!==e.length?e.map((t=>{return` <div class="event__type-item">\n                          <input id="event-type-${e=t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n                          <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${h(e)}</label>\n                        </div>`;var e})).join(""):""}(s)}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                    ${o}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${m}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                    ${function(t){const e=[...new Set(t.map((t=>t.name)))];return e&&0!==e.length?e.map((t=>` <option value="${h(t)}"></option>`)).join(""):""}(s)}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${f}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${v}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${u}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                    ${function(t,e){return t.map((t=>{const n=e.some((e=>e.id===t.id));return i=t.title,s=t.price,` <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="${r=t.id}" type="checkbox" name="${t.name}" ${n?"checked":"unchecked"}="">\n              <label class="event__offer-label" for="${r}">\n                  <span class="event__offer-title">${i}</span>\n                    +€&nbsp;\n                  <span class="event__offer-price">${s}</span>\n              </label>\n            </div>`;var i,s,r})).join("")}(e,n)}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${r}</p>\n\n                    ${function(t){return`<div class="event__photos-container">\n                      <div class="event__photos-tape">\n                       ${function(t){return t&&0!==t.length?t.map((t=>` <img class="event__photo" src="${t.src}" alt="${t.description}">`)).join(""):""}(t)}\n                      </div>\n                    </div>`}(a)}\n                  </section>\n                </section>\n              </form>\n            </li>`}class m{constructor({point:t,allOffers:e,checkedOffers:n,destinationInfo:i,allPoints:s}){this.allOffers=e,this.checkedOffers=n,this.destinationInfo=i,this.point=t,this.allPoints=s}getTemplate(){return v(this.point,this.allOffers,this.checkedOffers,this.destinationInfo,this.allPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}function _(t,e,n,i,s){const{infoText:r,pictures:a}=i,{type:o,name:l,startTime:c,endTime:d,price:u}=t,f=p(c),v=p(d),m=h(l);return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                          ${function(t){const e=[...new Set(t.map((t=>t.type)))];return e&&0!==e.length?e.map((t=>{return` <div class="event__type-item">\n                          <input id="event-type-${e=t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n                          <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${h(e)}</label>\n                        </div>`;var e})).join(""):""}(s)}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${o}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${m}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      ${function(t){const e=[...new Set(t.map((t=>t.name)))];return e&&0!==e.length?e.map((t=>` <option value="${h(t)}"></option>`)).join(""):""}(s)}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${f}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${v}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${u}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                      ${function(t,e){return t.map((t=>{const n=e.some((e=>e.id===t.id));return i=t.title,s=t.price,` <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="${r=t.id}" type="checkbox" name="${t.name}" ${n?"checked":"unchecked"}="">\n              <label class="event__offer-label" for="${r}">\n                  <span class="event__offer-title">${i}</span>\n                    +€&nbsp;\n                  <span class="event__offer-price">${s}</span>\n              </label>\n            </div>`;var i,s,r})).join("")}(e,n)}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${r}</p>\n\n                    ${function(t){return`<div class="event__photos-container">\n                      <div class="event__photos-tape">\n                       ${function(t){return t&&0!==t.length?t.map((t=>` <img class="event__photo" src="${t.src}" alt="${t.description}">`)).join(""):""}(t)}\n                      </div>\n                    </div>`}(a)}\n\n                  </section>\n                </section>\n              </form>\n            </li>`}class ${constructor({point:t,allOffers:e,checkedOffers:n,destinationInfo:i,allPoints:s}){this.allOffers=e,this.checkedOffers=n,this.destinationInfo=i,this.point=t,this.allPoints=s}getTemplate(){return _(this.point,this.allOffers,this.checkedOffers,this.destinationInfo,this.allPoints)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{constructor({point:t,offers:e,descriptionInfo:n}){this.offers=e,this.destinations=n,this.point=t}getTemplate(){return function(t,e){const{type:n,name:i,startTime:r,endTime:a,price:o,isFavorite:l}=t,c=u(r),d=u(a),p=f(r),v=f(a);return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">${c}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${n}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${n} ${h(i)}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${c}">${p}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="${d}">${v}</time>\n                  </p>\n                  <p class="event__duration">${function(t,e){const n=s()(t),i=s()(e).diff(n);return`${function(t){const e=t.days(),n=t.hours(),i=t.minutes();return e>0?`${e.toString().padStart(2,"0")}D ${n.toString().padStart(2,"0")}H ${i.toString().padStart(2,"0")}M`:n>0?`${n.toString().padStart(2,"0")}H ${i.toString().padStart(2,"0")}M`:`${i.toString().padStart(2,"0")}M`}(s().duration(i))}`}(r,a)}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${o}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n\n                  ${function(t){return t&&0!==t.length?t.map((t=>` <li class="event__offer">\n              <span class="event__offer-title">${t.title}</span>\n                    &plus;&euro;&nbsp;\n              <span class="event__offer-price">${t.price}</span>\n          </li>`)).join(""):""}(e)}\n\n                </ul>\n                <button class="event__favorite-btn ${l?"event__favorite-btn--active":""}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const b=[{type:"taxi",id:1,name:"amsterdam",startTime:new Date("2025-06-12T13:00"),endTime:new Date("2025-06-12T13:10"),price:"995",isFavorite:!0,offers:[1,3,2]},{type:"flight",id:2,name:"israel",startTime:new Date("2025-03-10T10:00"),endTime:new Date("2025-03-10T15:00"),price:"3210",isFavorite:!1,offers:[1,2]},{type:"train",id:3,name:"geneva",startTime:new Date("2025-04-11T18:00"),endTime:new Date("2025-04-11T20:10"),price:"431",isFavorite:!1,offers:[2,4]},{type:"check-in",id:4,name:"moscow",startTime:new Date("2025-07-17T11:30"),endTime:new Date("2025-07-18T15:50"),price:"1067",isFavorite:!0,offers:[]}];function M(){return(t=b)[Math.floor(Math.random()*t.length)];var t}const D=[{id:1,name:"amsterdam",infoText:"Nunc fermentum tortor ac porta dapibus",pictures:[{src:`https://loremflickr.com/248/152?random=${d()}`,description:"Lorem ipsum dolor sit amet"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"consectetur adipiscing elit"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"Cras aliquet varius magna"}]},{id:2,name:"israel",infoText:"Aliquam id orci ut lectus varius viverra",pictures:[{src:`https://loremflickr.com/248/152?random=${d()}`,description:"Lorem ipsum dolor sit amet"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"consectetur adipiscing elit"}]},{id:3,name:"geneva",infoText:"Sed blandit, eros vel aliquam faucibus",pictures:[{src:`https://loremflickr.com/248/152?random=${d()}`,description:"Aliquam id orci ut lectus varius viverra."},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"condimentum sed nibh vita"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"consectetur adipiscing elit"}]},{id:4,name:"moscow",infoText:"Nullam nunc ex, convallis sed finibus eget",pictures:[{src:`https://loremflickr.com/248/152?random=${d()}`,description:"Aliquam id orci ut lectus varius viverra."},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"condimentum sed nibh vita"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"consectetur adipiscing elit"},{src:`https://loremflickr.com/248/152?random=${d()}`,description:"consectetur adipiscing elit"}]}],w=[{type:"taxi",offers:[{id:1,title:"Choose radio station",name:"radio-station",price:6},{id:2,title:"Help with luggage",name:"luggage",price:2},{id:3,title:"Change class of car",name:"change-class-of-car",price:40}]},{type:"flight",offers:[{id:1,title:"Add extra luggage",name:"luggage",price:20},{id:2,title:"Change seat",name:"change-seat",price:10},{id:3,title:"Change class",name:"change-class",price:10},{id:4,title:"Blanket",name:"get-blanket",price:2}]},{type:"check-in",offers:[{id:1,title:"Change room",name:"change-room",price:50},{id:2,title:"Children bed",name:"children-bed",price:5},{id:3,title:"Breakfast",name:"breakfast",price:10},{id:4,title:"Double Bed",name:"double-bed",price:5}]},{type:"train",offers:[{id:1,title:"Change seat",name:"change-seat",price:10},{id:2,title:"Extra luggage",name:"extra-luggage",price:20},{id:3,title:"Lunch",name:"lunch",price:20},{id:4,title:"WI-FI",name:"wi-fi",price:5}]}],S=document.querySelector(".trip-controls__filters"),T=new class{points=Array.from({length:4},M);offers=w;destinations=D;getPoints(){return this.points}getOffers(){return this.offers}getOffersByType(t){return this.getOffers().find((e=>e.type===t)).offers}getOffersById(t,e){const n=this.getOffersByType(t),i=[];return n.forEach((t=>{e.some((e=>e===t.id))&&i.push(t)})),i}getDestinations(){return this.destinations}getDestinationsByName(t){return this.getDestinations().find((e=>e.name===t))}},O=document.querySelector(".trip-events"),k=new class{eventListComponent=new y;constructor({listContainer:t,pointModel:e}){this.listContainer=t,this.pointModel=e}init(){this.eventPoints=[...this.pointModel.getPoints()],e(this.eventListComponent,this.listContainer),this.renderEditPointView(this.eventPoints[0]),this.renderAddPointView(this.eventPoints[1]),this.eventPoints.forEach((t=>this.renderEventPointView(t)))}renderEditPointView(t){const n=this.pointModel.getOffersByType(t.type),i=this.pointModel.getOffersById(t.type,t.offers),s=this.pointModel.getDestinationsByName(t.name);e(new $({point:t,allOffers:n,checkedOffers:i,destinationInfo:s,allPoints:this.eventPoints}),this.eventListComponent.getElement())}renderAddPointView(t){const n=this.pointModel.getOffersByType(t.type),i=this.pointModel.getOffersById(t.type,t.offers),s=this.pointModel.getDestinationsByName(t.name);e(new m({point:t,allOffers:n,checkedOffers:i,destinationInfo:s,allPoints:this.eventPoints}),this.eventListComponent.getElement())}renderEventPointView(t){const n=[...this.pointModel.getOffersById(t.type,t.offers)],i={...this.pointModel.getDestinationsByName(t.name)};e(new g({point:t,offers:n,destinations:i}),this.eventListComponent.getElement())}}({listContainer:O,pointModel:T});e(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get"> <div class="trip-filters__filter"> <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked> <label class="trip-filters__filter-label" for="filter-everything">Everything</label> </div> <div class="trip-filters__filter"> <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future"> <label class="trip-filters__filter-label" for="filter-future">Future</label> </div> <div class="trip-filters__filter"> <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present"> <label class="trip-filters__filter-label" for="filter-present">Present</label> </div> <div class="trip-filters__filter"> <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"> <label class="trip-filters__filter-label" for="filter-past">Past</label> </div> <button class="visually-hidden" type="submit">Accept filter</button> </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},S),e(new class{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get"> <div class="trip-sort__item  trip-sort__item--day"> <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked> <label class="trip-sort__btn" for="sort-day">Day</label> </div> <div class="trip-sort__item  trip-sort__item--event"> <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled> <label class="trip-sort__btn" for="sort-event">Event</label> </div> <div class="trip-sort__item  trip-sort__item--time"> <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time"> <label class="trip-sort__btn" for="sort-time">Time</label> </div> <div class="trip-sort__item  trip-sort__item--price"> <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price"> <label class="trip-sort__btn" for="sort-price">Price</label> </div> <div class="trip-sort__item  trip-sort__item--offer"> <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled> <label class="trip-sort__btn" for="sort-offer">Offers</label> </div> </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},O),k.init()})()})();
//# sourceMappingURL=bundle.206593296b4f7ad716a9.js.map