
YUI.add('gallery-outside-events',function(Y){var nativeEvents=['blur','change','click','dblclick','focus','keydown','keypress','keyup','mousedown','mousemove','mouseout','mouseover','mouseup','select','submit'];Y.Event.defineOutside=function(event,name){name=name||event+'outside';Y.Event.define(name,{on:function(node,sub,notifier){sub.onHandle=Y.one('doc').on(event,function(e){if(this.isOutside(node,e.target)){notifier.fire(e);}},this);},detach:function(node,sub,notifier){sub.onHandle.detach();},delegate:function(node,sub,notifier,filter){sub.delegateHandle=Y.one('doc').delegate(event,function(e){if(this.isOutside(node,e.target)){notifier.fire(e);}},filter,this);},detachDelegate:function(node,sub,notifier,filter){sub.delegateHandle.detach();},isOutside:function(node,target){return target!==node&&!target.ancestor(function(p){return p===node;});}});};Y.each(nativeEvents,function(event){Y.Event.defineOutside(event);});},'1.1.0',{requires:['event-focus','event-synthetic']});