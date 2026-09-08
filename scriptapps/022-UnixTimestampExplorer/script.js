const modes = document.querySelectorAll('.mode');
const timestampFields = document.querySelector('#timestamp-fields');
const dateFields = document.querySelector('#date-fields');
const timestampInput = document.querySelector('#timestamp-input');
const timestampUnit = document.querySelector('#timestamp-unit');
const dateInput = document.querySelector('#date-input');
const secondsOutput = document.querySelector('#seconds-output');
const millisecondsOutput = document.querySelector('#milliseconds-output');
const localOutput = document.querySelector('#local-output');
const relativeOutput = document.querySelector('#relative-output');
const status = document.querySelector('#status');
const timezone = document.querySelector('#timezone');
let mode = 'timestamp';
function setStatus(message,error=false){status.className=error?'status error':'status';status.textContent=message}
function relative(ms){const diff=ms-Date.now(),abs=Math.abs(diff),amount=abs<60000?Math.round(abs/1000):abs<3600000?Math.round(abs/60000):abs<86400000?Math.round(abs/3600000):Math.round(abs/86400000),unit=abs<60000?'second':abs<3600000?'minute':abs<86400000?'hour':'day';return `${amount} ${unit}${amount===1?'':'s'} ${diff<0?'ago':'from now'}`}
function formatDate(date){return date.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}
function convert(){let date;if(mode==='timestamp'){const value=Number(timestampInput.value);if(!Number.isFinite(value))return setStatus('Enter a valid timestamp.',true);const ms=timestampUnit.value==='s'?value*1000:value;if(!Number.isFinite(ms)||Math.abs(ms)>8640000000000000)return setStatus('That timestamp is outside the supported date range.',true);date=new Date(ms)}else{if(!dateInput.value)return setStatus('Choose a date and time.',true);date=new Date(dateInput.value);if(Number.isNaN(date.getTime()))return setStatus('That date is invalid.',true)}const ms=date.getTime(),seconds=Math.floor(ms/1000);secondsOutput.textContent=seconds.toString();millisecondsOutput.textContent=ms.toString();localOutput.textContent=formatDate(date);relativeOutput.textContent=relative(ms);setStatus('Conversion updated.')}
function setMode(next){mode=next;timestampFields.hidden=mode!=='timestamp';dateFields.hidden=mode!=='date';modes.forEach(button=>{const active=button.dataset.mode===mode;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});convert()}
function useNow(){const now=new Date();if(mode==='timestamp'){timestampUnit.value='s';timestampInput.value=(now.getTime()/1000).toFixed(0)}else{const pad=value=>String(value).padStart(2,'0');dateInput.value=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`}convert()}
function resultText(){return `Unix seconds: ${secondsOutput.textContent}\nUnix milliseconds: ${millisecondsOutput.textContent}\nLocal date: ${localOutput.textContent}\nRelative: ${relativeOutput.textContent}`}
modes.forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
[timestampInput,timestampUnit,dateInput].forEach(input=>input.addEventListener('input',convert));
document.querySelector('#now-button').addEventListener('click',useNow);
document.querySelector('#reset-button').addEventListener('click',()=>{mode='timestamp';timestampInput.value=0;timestampUnit.value='s';dateInput.value='';setMode('timestamp');setStatus('Converter reset.')});
document.querySelector('#copy-button').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(resultText());setStatus('Results copied.')}catch{setStatus('Clipboard access was unavailable.',true)}});
timezone.textContent=Intl.DateTimeFormat().resolvedOptions().timeZone;
timestampInput.value=Math.floor(Date.now()/1000);convert();
