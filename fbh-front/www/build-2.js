"format register";

System.register("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
"format global";
(function() {
  window.ionic = window.ionic || {};
  window.ionic.views = {};
  window.ionic.version = '1.0.0-beta.13';
  (function(window, document, ionic) {
    var readyCallbacks = [];
    var isDomReady = document.readyState === 'complete' || document.readyState === 'interactive';
    function domReady() {
      isDomReady = true;
      for (var x = 0; x < readyCallbacks.length; x++) {
        ionic.requestAnimationFrame(readyCallbacks[x]);
      }
      readyCallbacks = [];
      document.removeEventListener('DOMContentLoaded', domReady);
    }
    if (!isDomReady) {
      document.addEventListener('DOMContentLoaded', domReady);
    }
    window._rAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 16);
      };
    })();
    var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
    ionic.DomUtil = {
      requestAnimationFrame: function(cb) {
        return window._rAF(cb);
      },
      cancelAnimationFrame: function(requestId) {
        cancelAnimationFrame(requestId);
      },
      animationFrameThrottle: function(cb) {
        var args,
            isQueued,
            context;
        return function() {
          args = arguments;
          context = this;
          if (!isQueued) {
            isQueued = true;
            ionic.requestAnimationFrame(function() {
              cb.apply(context, args);
              isQueued = false;
            });
          }
        };
      },
      getPositionInParent: function(el) {
        return {
          left: el.offsetLeft,
          top: el.offsetTop
        };
      },
      ready: function(cb) {
        if (isDomReady) {
          ionic.requestAnimationFrame(cb);
        } else {
          readyCallbacks.push(cb);
        }
      },
      getTextBounds: function(textNode) {
        if (document.createRange) {
          var range = document.createRange();
          range.selectNodeContents(textNode);
          if (range.getBoundingClientRect) {
            var rect = range.getBoundingClientRect();
            if (rect) {
              var sx = window.scrollX;
              var sy = window.scrollY;
              return {
                top: rect.top + sy,
                left: rect.left + sx,
                right: rect.left + sx + rect.width,
                bottom: rect.top + sy + rect.height,
                width: rect.width,
                height: rect.height
              };
            }
          }
        }
        return null;
      },
      getChildIndex: function(element, type) {
        if (type) {
          var ch = element.parentNode.children;
          var c;
          for (var i = 0,
              k = 0,
              j = ch.length; i < j; i++) {
            c = ch[i];
            if (c.nodeName && c.nodeName.toLowerCase() == type) {
              if (c == element) {
                return k;
              }
              k++;
            }
          }
        }
        return Array.prototype.slice.call(element.parentNode.children).indexOf(element);
      },
      swapNodes: function(src, dest) {
        dest.parentNode.insertBefore(src, dest);
      },
      elementIsDescendant: function(el, parent, stopAt) {
        var current = el;
        do {
          if (current === parent)
            return true;
          current = current.parentNode;
        } while (current && current !== stopAt);
        return false;
      },
      getParentWithClass: function(e, className, depth) {
        depth = depth || 10;
        while (e.parentNode && depth--) {
          if (e.parentNode.classList && e.parentNode.classList.contains(className)) {
            return e.parentNode;
          }
          e = e.parentNode;
        }
        return null;
      },
      getParentOrSelfWithClass: function(e, className, depth) {
        depth = depth || 10;
        while (e && depth--) {
          if (e.classList && e.classList.contains(className)) {
            return e;
          }
          e = e.parentNode;
        }
        return null;
      },
      rectContains: function(x, y, x1, y1, x2, y2) {
        if (x < x1 || x > x2)
          return false;
        if (y < y1 || y > y2)
          return false;
        return true;
      }
    };
    ionic.requestAnimationFrame = ionic.DomUtil.requestAnimationFrame;
    ionic.cancelAnimationFrame = ionic.DomUtil.cancelAnimationFrame;
    ionic.animationFrameThrottle = ionic.DomUtil.animationFrameThrottle;
  })(window, document, ionic);
  (function(ionic) {
    ionic.CustomEvent = (function() {
      if (typeof window.CustomEvent === 'function')
        return CustomEvent;
      var customEvent = function(event, params) {
        var evt;
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        try {
          evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        } catch (error) {
          evt = document.createEvent("Event");
          for (var param in params) {
            evt[param] = params[param];
          }
          evt.initEvent(event, params.bubbles, params.cancelable);
        }
        return evt;
      };
      customEvent.prototype = window.Event.prototype;
      return customEvent;
    })();
    ionic.EventController = {
      VIRTUALIZED_EVENTS: ['tap', 'swipe', 'swiperight', 'swipeleft', 'drag', 'hold', 'release'],
      trigger: function(eventType, data, bubbles, cancelable) {
        var event = new ionic.CustomEvent(eventType, {
          detail: data,
          bubbles: !!bubbles,
          cancelable: !!cancelable
        });
        data && data.target && data.target.dispatchEvent && data.target.dispatchEvent(event) || window.dispatchEvent(event);
      },
      on: function(type, callback, element) {
        var e = element || window;
        for (var i = 0,
            j = this.VIRTUALIZED_EVENTS.length; i < j; i++) {
          if (type == this.VIRTUALIZED_EVENTS[i]) {
            var gesture = new ionic.Gesture(element);
            gesture.on(type, callback);
            return gesture;
          }
        }
        e.addEventListener(type, callback);
      },
      off: function(type, callback, element) {
        element.removeEventListener(type, callback);
      },
      onGesture: function(type, callback, element, options) {
        var gesture = new ionic.Gesture(element, options);
        gesture.on(type, callback);
        return gesture;
      },
      offGesture: function(gesture, type, callback) {
        gesture.off(type, callback);
      },
      handlePopState: function(event) {}
    };
    ionic.on = function() {
      ionic.EventController.on.apply(ionic.EventController, arguments);
    };
    ionic.off = function() {
      ionic.EventController.off.apply(ionic.EventController, arguments);
    };
    ionic.trigger = ionic.EventController.trigger;
    ionic.onGesture = function() {
      return ionic.EventController.onGesture.apply(ionic.EventController.onGesture, arguments);
    };
    ionic.offGesture = function() {
      return ionic.EventController.offGesture.apply(ionic.EventController.offGesture, arguments);
    };
  })(window.ionic);
  (function(ionic) {
    ionic.Gesture = function(element, options) {
      return new ionic.Gestures.Instance(element, options || {});
    };
    ionic.Gestures = {};
    ionic.Gestures.defaults = {stop_browser_behavior: 'disable-user-behavior'};
    ionic.Gestures.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
    ionic.Gestures.HAS_TOUCHEVENTS = ('ontouchstart' in window);
    ionic.Gestures.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
    ionic.Gestures.NO_MOUSEEVENTS = ionic.Gestures.HAS_TOUCHEVENTS && window.navigator.userAgent.match(ionic.Gestures.MOBILE_REGEX);
    ionic.Gestures.EVENT_TYPES = {};
    ionic.Gestures.DIRECTION_DOWN = 'down';
    ionic.Gestures.DIRECTION_LEFT = 'left';
    ionic.Gestures.DIRECTION_UP = 'up';
    ionic.Gestures.DIRECTION_RIGHT = 'right';
    ionic.Gestures.POINTER_MOUSE = 'mouse';
    ionic.Gestures.POINTER_TOUCH = 'touch';
    ionic.Gestures.POINTER_PEN = 'pen';
    ionic.Gestures.EVENT_START = 'start';
    ionic.Gestures.EVENT_MOVE = 'move';
    ionic.Gestures.EVENT_END = 'end';
    ionic.Gestures.DOCUMENT = window.document;
    ionic.Gestures.plugins = {};
    ionic.Gestures.READY = false;
    function setup() {
      if (ionic.Gestures.READY) {
        return;
      }
      ionic.Gestures.event.determineEventTypes();
      for (var name in ionic.Gestures.gestures) {
        if (ionic.Gestures.gestures.hasOwnProperty(name)) {
          ionic.Gestures.detection.register(ionic.Gestures.gestures[name]);
        }
      }
      ionic.Gestures.event.onTouch(ionic.Gestures.DOCUMENT, ionic.Gestures.EVENT_MOVE, ionic.Gestures.detection.detect);
      ionic.Gestures.event.onTouch(ionic.Gestures.DOCUMENT, ionic.Gestures.EVENT_END, ionic.Gestures.detection.detect);
      ionic.Gestures.READY = true;
    }
    ionic.Gestures.Instance = function(element, options) {
      var self = this;
      if (element === null) {
        void 0;
        return;
      }
      setup();
      this.element = element;
      this.enabled = true;
      this.options = ionic.Gestures.utils.extend(ionic.Gestures.utils.extend({}, ionic.Gestures.defaults), options || {});
      if (this.options.stop_browser_behavior) {
        ionic.Gestures.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
      }
      ionic.Gestures.event.onTouch(element, ionic.Gestures.EVENT_START, function(ev) {
        if (self.enabled) {
          ionic.Gestures.detection.startDetect(self, ev);
        }
      });
      return this;
    };
    ionic.Gestures.Instance.prototype = {
      on: function onEvent(gesture, handler) {
        var gestures = gesture.split(' ');
        for (var t = 0; t < gestures.length; t++) {
          this.element.addEventListener(gestures[t], handler, false);
        }
        return this;
      },
      off: function offEvent(gesture, handler) {
        var gestures = gesture.split(' ');
        for (var t = 0; t < gestures.length; t++) {
          this.element.removeEventListener(gestures[t], handler, false);
        }
        return this;
      },
      trigger: function triggerEvent(gesture, eventData) {
        var event = ionic.Gestures.DOCUMENT.createEvent('Event');
        event.initEvent(gesture, true, true);
        event.gesture = eventData;
        var element = this.element;
        if (ionic.Gestures.utils.hasParent(eventData.target, element)) {
          element = eventData.target;
        }
        element.dispatchEvent(event);
        return this;
      },
      enable: function enable(state) {
        this.enabled = state;
        return this;
      }
    };
    var last_move_event = null;
    var enable_detect = false;
    var touch_triggered = false;
    ionic.Gestures.event = {
      bindDom: function(element, type, handler) {
        var types = type.split(' ');
        for (var t = 0; t < types.length; t++) {
          element.addEventListener(types[t], handler, false);
        }
      },
      onTouch: function onTouch(element, eventType, handler) {
        var self = this;
        this.bindDom(element, ionic.Gestures.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
          var sourceEventType = ev.type.toLowerCase();
          if (sourceEventType.match(/mouse/) && touch_triggered) {
            return;
          } else if (sourceEventType.match(/touch/) || sourceEventType.match(/pointerdown/) || (sourceEventType.match(/mouse/) && ev.which === 1)) {
            enable_detect = true;
          } else if (sourceEventType.match(/mouse/) && ev.which !== 1) {
            enable_detect = false;
          }
          if (sourceEventType.match(/touch|pointer/)) {
            touch_triggered = true;
          }
          var count_touches = 0;
          if (enable_detect) {
            if (ionic.Gestures.HAS_POINTEREVENTS && eventType != ionic.Gestures.EVENT_END) {
              count_touches = ionic.Gestures.PointerEvent.updatePointer(eventType, ev);
            } else if (sourceEventType.match(/touch/)) {
              count_touches = ev.touches.length;
            } else if (!touch_triggered) {
              count_touches = sourceEventType.match(/up/) ? 0 : 1;
            }
            if (count_touches > 0 && eventType == ionic.Gestures.EVENT_END) {
              eventType = ionic.Gestures.EVENT_MOVE;
            } else if (!count_touches) {
              eventType = ionic.Gestures.EVENT_END;
            }
            if (count_touches || last_move_event === null) {
              last_move_event = ev;
            }
            handler.call(ionic.Gestures.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev));
            if (ionic.Gestures.HAS_POINTEREVENTS && eventType == ionic.Gestures.EVENT_END) {
              count_touches = ionic.Gestures.PointerEvent.updatePointer(eventType, ev);
            }
          }
          if (!count_touches) {
            last_move_event = null;
            enable_detect = false;
            touch_triggered = false;
            ionic.Gestures.PointerEvent.reset();
          }
        });
      },
      determineEventTypes: function determineEventTypes() {
        var types;
        if (ionic.Gestures.HAS_POINTEREVENTS) {
          types = ionic.Gestures.PointerEvent.getEvents();
        } else if (ionic.Gestures.NO_MOUSEEVENTS) {
          types = ['touchstart', 'touchmove', 'touchend touchcancel'];
        } else {
          types = ['touchstart mousedown', 'touchmove mousemove', 'touchend touchcancel mouseup'];
        }
        ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_START] = types[0];
        ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_MOVE] = types[1];
        ionic.Gestures.EVENT_TYPES[ionic.Gestures.EVENT_END] = types[2];
      },
      getTouchList: function getTouchList(ev) {
        if (ionic.Gestures.HAS_POINTEREVENTS) {
          return ionic.Gestures.PointerEvent.getTouchList();
        } else if (ev.touches) {
          return ev.touches;
        } else {
          ev.identifier = 1;
          return [ev];
        }
      },
      collectEventData: function collectEventData(element, eventType, touches, ev) {
        var pointerType = ionic.Gestures.POINTER_TOUCH;
        if (ev.type.match(/mouse/) || ionic.Gestures.PointerEvent.matchType(ionic.Gestures.POINTER_MOUSE, ev)) {
          pointerType = ionic.Gestures.POINTER_MOUSE;
        }
        return {
          center: ionic.Gestures.utils.getCenter(touches),
          timeStamp: new Date().getTime(),
          target: ev.target,
          touches: touches,
          eventType: eventType,
          pointerType: pointerType,
          srcEvent: ev,
          preventDefault: function() {
            if (this.srcEvent.preventManipulation) {
              this.srcEvent.preventManipulation();
            }
            if (this.srcEvent.preventDefault) {}
          },
          stopPropagation: function() {
            this.srcEvent.stopPropagation();
          },
          stopDetect: function() {
            return ionic.Gestures.detection.stopDetect();
          }
        };
      }
    };
    ionic.Gestures.PointerEvent = {
      pointers: {},
      getTouchList: function() {
        var self = this;
        var touchlist = [];
        Object.keys(self.pointers).sort().forEach(function(id) {
          touchlist.push(self.pointers[id]);
        });
        return touchlist;
      },
      updatePointer: function(type, pointerEvent) {
        if (type == ionic.Gestures.EVENT_END) {
          this.pointers = {};
        } else {
          pointerEvent.identifier = pointerEvent.pointerId;
          this.pointers[pointerEvent.pointerId] = pointerEvent;
        }
        return Object.keys(this.pointers).length;
      },
      matchType: function(pointerType, ev) {
        if (!ev.pointerType) {
          return false;
        }
        var types = {};
        types[ionic.Gestures.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == ionic.Gestures.POINTER_MOUSE);
        types[ionic.Gestures.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == ionic.Gestures.POINTER_TOUCH);
        types[ionic.Gestures.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == ionic.Gestures.POINTER_PEN);
        return types[pointerType];
      },
      getEvents: function() {
        return ['pointerdown MSPointerDown', 'pointermove MSPointerMove', 'pointerup pointercancel MSPointerUp MSPointerCancel'];
      },
      reset: function() {
        this.pointers = {};
      }
    };
    ionic.Gestures.utils = {
      extend: function extend(dest, src, merge) {
        for (var key in src) {
          if (dest[key] !== undefined && merge) {
            continue;
          }
          dest[key] = src[key];
        }
        return dest;
      },
      hasParent: function(node, parent) {
        while (node) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      },
      getCenter: function getCenter(touches) {
        var valuesX = [],
            valuesY = [];
        for (var t = 0,
            len = touches.length; t < len; t++) {
          valuesX.push(touches[t].pageX);
          valuesY.push(touches[t].pageY);
        }
        return {
          pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
          pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
        };
      },
      getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
        return {
          x: Math.abs(delta_x / delta_time) || 0,
          y: Math.abs(delta_y / delta_time) || 0
        };
      },
      getAngle: function getAngle(touch1, touch2) {
        var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
        return Math.atan2(y, x) * 180 / Math.PI;
      },
      getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);
        if (x >= y) {
          return touch1.pageX - touch2.pageX > 0 ? ionic.Gestures.DIRECTION_LEFT : ionic.Gestures.DIRECTION_RIGHT;
        } else {
          return touch1.pageY - touch2.pageY > 0 ? ionic.Gestures.DIRECTION_UP : ionic.Gestures.DIRECTION_DOWN;
        }
      },
      getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x * x) + (y * y));
      },
      getScale: function getScale(start, end) {
        if (start.length >= 2 && end.length >= 2) {
          return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
        }
        return 1;
      },
      getRotation: function getRotation(start, end) {
        if (start.length >= 2 && end.length >= 2) {
          return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
        }
        return 0;
      },
      isVertical: function isVertical(direction) {
        return (direction == ionic.Gestures.DIRECTION_UP || direction == ionic.Gestures.DIRECTION_DOWN);
      },
      stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_class) {
        if (element && element.classList) {
          element.classList.add(css_class);
          element.onselectstart = function() {
            return false;
          };
        }
      }
    };
    ionic.Gestures.detection = {
      gestures: [],
      current: null,
      previous: null,
      stopped: false,
      startDetect: function startDetect(inst, eventData) {
        if (this.current) {
          return;
        }
        this.stopped = false;
        this.current = {
          inst: inst,
          startEvent: ionic.Gestures.utils.extend({}, eventData),
          lastEvent: false,
          name: ''
        };
        this.detect(eventData);
      },
      detect: function detect(eventData) {
        if (!this.current || this.stopped) {
          return;
        }
        eventData = this.extendEventData(eventData);
        var inst_options = this.current.inst.options;
        for (var g = 0,
            len = this.gestures.length; g < len; g++) {
          var gesture = this.gestures[g];
          if (!this.stopped && inst_options[gesture.name] !== false) {
            if (gesture.handler.call(gesture, eventData, this.current.inst) === false) {
              this.stopDetect();
              break;
            }
          }
        }
        if (this.current) {
          this.current.lastEvent = eventData;
        }
        if (eventData.eventType == ionic.Gestures.EVENT_END && !eventData.touches.length - 1) {
          this.stopDetect();
        }
        return eventData;
      },
      stopDetect: function stopDetect() {
        this.previous = ionic.Gestures.utils.extend({}, this.current);
        this.current = null;
        this.stopped = true;
      },
      extendEventData: function extendEventData(ev) {
        var startEv = this.current.startEvent;
        if (startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
          startEv.touches = [];
          for (var i = 0,
              len = ev.touches.length; i < len; i++) {
            startEv.touches.push(ionic.Gestures.utils.extend({}, ev.touches[i]));
          }
        }
        var delta_time = ev.timeStamp - startEv.timeStamp,
            delta_x = ev.center.pageX - startEv.center.pageX,
            delta_y = ev.center.pageY - startEv.center.pageY,
            velocity = ionic.Gestures.utils.getVelocity(delta_time, delta_x, delta_y);
        ionic.Gestures.utils.extend(ev, {
          deltaTime: delta_time,
          deltaX: delta_x,
          deltaY: delta_y,
          velocityX: velocity.x,
          velocityY: velocity.y,
          distance: ionic.Gestures.utils.getDistance(startEv.center, ev.center),
          angle: ionic.Gestures.utils.getAngle(startEv.center, ev.center),
          direction: ionic.Gestures.utils.getDirection(startEv.center, ev.center),
          scale: ionic.Gestures.utils.getScale(startEv.touches, ev.touches),
          rotation: ionic.Gestures.utils.getRotation(startEv.touches, ev.touches),
          startEvent: startEv
        });
        return ev;
      },
      register: function register(gesture) {
        var options = gesture.defaults || {};
        if (options[gesture.name] === undefined) {
          options[gesture.name] = true;
        }
        ionic.Gestures.utils.extend(ionic.Gestures.defaults, options, true);
        gesture.index = gesture.index || 1000;
        this.gestures.push(gesture);
        this.gestures.sort(function(a, b) {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        });
        return this.gestures;
      }
    };
    ionic.Gestures.gestures = ionic.Gestures.gestures || {};
    ionic.Gestures.gestures.Hold = {
      name: 'hold',
      index: 10,
      defaults: {
        hold_timeout: 500,
        hold_threshold: 1
      },
      timer: null,
      handler: function holdGesture(ev, inst) {
        switch (ev.eventType) {
          case ionic.Gestures.EVENT_START:
            clearTimeout(this.timer);
            ionic.Gestures.detection.current.name = this.name;
            this.timer = setTimeout(function() {
              if (ionic.Gestures.detection.current.name == 'hold') {
                ionic.tap.cancelClick();
                inst.trigger('hold', ev);
              }
            }, inst.options.hold_timeout);
            break;
          case ionic.Gestures.EVENT_MOVE:
            if (ev.distance > inst.options.hold_threshold) {
              clearTimeout(this.timer);
            }
            break;
          case ionic.Gestures.EVENT_END:
            clearTimeout(this.timer);
            break;
        }
      }
    };
    ionic.Gestures.gestures.Tap = {
      name: 'tap',
      index: 100,
      defaults: {
        tap_max_touchtime: 250,
        tap_max_distance: 10,
        tap_always: true,
        doubletap_distance: 20,
        doubletap_interval: 300
      },
      handler: function tapGesture(ev, inst) {
        if (ev.eventType == ionic.Gestures.EVENT_END && ev.srcEvent.type != 'touchcancel') {
          var prev = ionic.Gestures.detection.previous,
              did_doubletap = false;
          if (ev.deltaTime > inst.options.tap_max_touchtime || ev.distance > inst.options.tap_max_distance) {
            return;
          }
          if (prev && prev.name == 'tap' && (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval && ev.distance < inst.options.doubletap_distance) {
            inst.trigger('doubletap', ev);
            did_doubletap = true;
          }
          if (!did_doubletap || inst.options.tap_always) {
            ionic.Gestures.detection.current.name = 'tap';
            inst.trigger('tap', ev);
          }
        }
      }
    };
    ionic.Gestures.gestures.Swipe = {
      name: 'swipe',
      index: 40,
      defaults: {
        swipe_max_touches: 1,
        swipe_velocity: 0.7
      },
      handler: function swipeGesture(ev, inst) {
        if (ev.eventType == ionic.Gestures.EVENT_END) {
          if (inst.options.swipe_max_touches > 0 && ev.touches.length > inst.options.swipe_max_touches) {
            return;
          }
          if (ev.velocityX > inst.options.swipe_velocity || ev.velocityY > inst.options.swipe_velocity) {
            inst.trigger(this.name, ev);
            inst.trigger(this.name + ev.direction, ev);
          }
        }
      }
    };
    ionic.Gestures.gestures.Drag = {
      name: 'drag',
      index: 50,
      defaults: {
        drag_min_distance: 10,
        correct_for_drag_min_distance: true,
        drag_max_touches: 1,
        drag_block_horizontal: true,
        drag_block_vertical: true,
        drag_lock_to_axis: false,
        drag_lock_min_distance: 25
      },
      triggered: false,
      handler: function dragGesture(ev, inst) {
        if (ionic.Gestures.detection.current.name != this.name && this.triggered) {
          inst.trigger(this.name + 'end', ev);
          this.triggered = false;
          return;
        }
        if (inst.options.drag_max_touches > 0 && ev.touches.length > inst.options.drag_max_touches) {
          return;
        }
        switch (ev.eventType) {
          case ionic.Gestures.EVENT_START:
            this.triggered = false;
            break;
          case ionic.Gestures.EVENT_MOVE:
            if (ev.distance < inst.options.drag_min_distance && ionic.Gestures.detection.current.name != this.name) {
              return;
            }
            if (ionic.Gestures.detection.current.name != this.name) {
              ionic.Gestures.detection.current.name = this.name;
              if (inst.options.correct_for_drag_min_distance) {
                var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
                ionic.Gestures.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                ionic.Gestures.detection.current.startEvent.center.pageY += ev.deltaY * factor;
                ev = ionic.Gestures.detection.extendEventData(ev);
              }
            }
            if (ionic.Gestures.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance)) {
              ev.drag_locked_to_axis = true;
            }
            var last_direction = ionic.Gestures.detection.current.lastEvent.direction;
            if (ev.drag_locked_to_axis && last_direction !== ev.direction) {
              if (ionic.Gestures.utils.isVertical(last_direction)) {
                ev.direction = (ev.deltaY < 0) ? ionic.Gestures.DIRECTION_UP : ionic.Gestures.DIRECTION_DOWN;
              } else {
                ev.direction = (ev.deltaX < 0) ? ionic.Gestures.DIRECTION_LEFT : ionic.Gestures.DIRECTION_RIGHT;
              }
            }
            if (!this.triggered) {
              inst.trigger(this.name + 'start', ev);
              this.triggered = true;
            }
            inst.trigger(this.name, ev);
            inst.trigger(this.name + ev.direction, ev);
            if ((inst.options.drag_block_vertical && ionic.Gestures.utils.isVertical(ev.direction)) || (inst.options.drag_block_horizontal && !ionic.Gestures.utils.isVertical(ev.direction))) {
              ev.preventDefault();
            }
            break;
          case ionic.Gestures.EVENT_END:
            if (this.triggered) {
              inst.trigger(this.name + 'end', ev);
            }
            this.triggered = false;
            break;
        }
      }
    };
    ionic.Gestures.gestures.Transform = {
      name: 'transform',
      index: 45,
      defaults: {
        transform_min_scale: 0.01,
        transform_min_rotation: 1,
        transform_always_block: false
      },
      triggered: false,
      handler: function transformGesture(ev, inst) {
        if (ionic.Gestures.detection.current.name != this.name && this.triggered) {
          inst.trigger(this.name + 'end', ev);
          this.triggered = false;
          return;
        }
        if (ev.touches.length < 2) {
          return;
        }
        if (inst.options.transform_always_block) {
          ev.preventDefault();
        }
        switch (ev.eventType) {
          case ionic.Gestures.EVENT_START:
            this.triggered = false;
            break;
          case ionic.Gestures.EVENT_MOVE:
            var scale_threshold = Math.abs(1 - ev.scale);
            var rotation_threshold = Math.abs(ev.rotation);
            if (scale_threshold < inst.options.transform_min_scale && rotation_threshold < inst.options.transform_min_rotation) {
              return;
            }
            ionic.Gestures.detection.current.name = this.name;
            if (!this.triggered) {
              inst.trigger(this.name + 'start', ev);
              this.triggered = true;
            }
            inst.trigger(this.name, ev);
            if (rotation_threshold > inst.options.transform_min_rotation) {
              inst.trigger('rotate', ev);
            }
            if (scale_threshold > inst.options.transform_min_scale) {
              inst.trigger('pinch', ev);
              inst.trigger('pinch' + ((ev.scale < 1) ? 'in' : 'out'), ev);
            }
            break;
          case ionic.Gestures.EVENT_END:
            if (this.triggered) {
              inst.trigger(this.name + 'end', ev);
            }
            this.triggered = false;
            break;
        }
      }
    };
    ionic.Gestures.gestures.Touch = {
      name: 'touch',
      index: -Infinity,
      defaults: {
        prevent_default: false,
        prevent_mouseevents: false
      },
      handler: function touchGesture(ev, inst) {
        if (inst.options.prevent_mouseevents && ev.pointerType == ionic.Gestures.POINTER_MOUSE) {
          ev.stopDetect();
          return;
        }
        if (inst.options.prevent_default) {
          ev.preventDefault();
        }
        if (ev.eventType == ionic.Gestures.EVENT_START) {
          inst.trigger(this.name, ev);
        }
      }
    };
    ionic.Gestures.gestures.Release = {
      name: 'release',
      index: Infinity,
      handler: function releaseGesture(ev, inst) {
        if (ev.eventType == ionic.Gestures.EVENT_END) {
          inst.trigger(this.name, ev);
        }
      }
    };
  })(window.ionic);
  (function(window, document, ionic) {
    var IOS = 'ios';
    var ANDROID = 'android';
    var WINDOWS_PHONE = 'windowsphone';
    ionic.Platform = {
      navigator: window.navigator,
      isReady: false,
      isFullScreen: false,
      platforms: null,
      grade: null,
      ua: navigator.userAgent,
      ready: function(cb) {
        if (this.isReady) {
          cb();
        } else {
          readyCallbacks.push(cb);
        }
      },
      detect: function() {
        ionic.Platform._checkPlatforms();
        ionic.requestAnimationFrame(function() {
          for (var i = 0; i < ionic.Platform.platforms.length; i++) {
            document.body.classList.add('platform-' + ionic.Platform.platforms[i]);
          }
        });
      },
      setGrade: function(grade) {
        var oldGrade = this.grade;
        this.grade = grade;
        ionic.requestAnimationFrame(function() {
          if (oldGrade) {
            document.body.classList.remove('grade-' + oldGrade);
          }
          document.body.classList.add('grade-' + grade);
        });
      },
      device: function() {
        return window.device || {};
      },
      _checkPlatforms: function(platforms) {
        this.platforms = [];
        var grade = 'a';
        if (this.isWebView()) {
          this.platforms.push('webview');
          this.platforms.push('cordova');
        } else {
          this.platforms.push('browser');
        }
        if (this.isIPad())
          this.platforms.push('ipad');
        var platform = this.platform();
        if (platform) {
          this.platforms.push(platform);
          var version = this.version();
          if (version) {
            var v = version.toString();
            if (v.indexOf('.') > 0) {
              v = v.replace('.', '_');
            } else {
              v += '_0';
            }
            this.platforms.push(platform + v.split('_')[0]);
            this.platforms.push(platform + v);
            if (this.isAndroid() && version < 4.4) {
              grade = (version < 4 ? 'c' : 'b');
            } else if (this.isWindowsPhone()) {
              grade = 'b';
            }
          }
        }
        this.setGrade(grade);
      },
      isWebView: function() {
        return !(!window.cordova && !window.PhoneGap && !window.phonegap);
      },
      isIPad: function() {
        if (/iPad/i.test(ionic.Platform.navigator.platform)) {
          return true;
        }
        return /iPad/i.test(this.ua);
      },
      isIOS: function() {
        return this.is(IOS);
      },
      isAndroid: function() {
        return this.is(ANDROID);
      },
      isWindowsPhone: function() {
        return this.is(WINDOWS_PHONE);
      },
      platform: function() {
        if (platformName === null)
          this.setPlatform(this.device().platform);
        return platformName;
      },
      setPlatform: function(n) {
        if (typeof n != 'undefined' && n !== null && n.length) {
          platformName = n.toLowerCase();
        } else if (this.ua.indexOf('Android') > 0) {
          platformName = ANDROID;
        } else if (this.ua.indexOf('iPhone') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('iPod') > -1) {
          platformName = IOS;
        } else if (this.ua.indexOf('Windows Phone') > -1) {
          platformName = WINDOWS_PHONE;
        } else {
          platformName = ionic.Platform.navigator.platform && navigator.platform.toLowerCase().split(' ')[0] || '';
        }
      },
      version: function() {
        if (platformVersion === null)
          this.setVersion(this.device().version);
        return platformVersion;
      },
      setVersion: function(v) {
        if (typeof v != 'undefined' && v !== null) {
          v = v.split('.');
          v = parseFloat(v[0] + '.' + (v.length > 1 ? v[1] : 0));
          if (!isNaN(v)) {
            platformVersion = v;
            return;
          }
        }
        platformVersion = 0;
        var pName = this.platform();
        var versionMatch = {
          'android': /Android (\d+).(\d+)?/,
          'ios': /OS (\d+)_(\d+)?/,
          'windowsphone': /Windows Phone (\d+).(\d+)?/
        };
        if (versionMatch[pName]) {
          v = this.ua.match(versionMatch[pName]);
          if (v && v.length > 2) {
            platformVersion = parseFloat(v[1] + '.' + v[2]);
          }
        }
      },
      is: function(type) {
        type = type.toLowerCase();
        if (this.platforms) {
          for (var x = 0; x < this.platforms.length; x++) {
            if (this.platforms[x] === type)
              return true;
          }
        }
        var pName = this.platform();
        if (pName) {
          return pName === type.toLowerCase();
        }
        return this.ua.toLowerCase().indexOf(type) >= 0;
      },
      exitApp: function() {
        this.ready(function() {
          navigator.app && navigator.app.exitApp && navigator.app.exitApp();
        });
      },
      showStatusBar: function(val) {
        this._showStatusBar = val;
        this.ready(function() {
          ionic.requestAnimationFrame(function() {
            if (ionic.Platform._showStatusBar) {
              window.StatusBar && window.StatusBar.show();
              document.body.classList.remove('status-bar-hide');
            } else {
              window.StatusBar && window.StatusBar.hide();
              document.body.classList.add('status-bar-hide');
            }
          });
        });
      },
      fullScreen: function(showFullScreen, showStatusBar) {
        this.isFullScreen = (showFullScreen !== false);
        ionic.DomUtil.ready(function() {
          ionic.requestAnimationFrame(function() {
            panes = document.getElementsByClassName('pane');
            for (var i = 0; i < panes.length; i++) {
              panes[i].style.height = panes[i].offsetHeight + "px";
            }
            if (ionic.Platform.isFullScreen) {
              document.body.classList.add('fullscreen');
            } else {
              document.body.classList.remove('fullscreen');
            }
          });
          ionic.Platform.showStatusBar((showStatusBar === true));
        });
      }
    };
    var platformName = null,
        platformVersion = null,
        readyCallbacks = [],
        windowLoadListenderAttached;
    function onWindowLoad() {
      if (ionic.Platform.isWebView()) {
        document.addEventListener("deviceready", onPlatformReady, false);
      } else {
        onPlatformReady();
      }
      if (windowLoadListenderAttached) {
        window.removeEventListener("load", onWindowLoad, false);
      }
    }
    if (document.readyState === 'complete') {
      onWindowLoad();
    } else {
      windowLoadListenderAttached = true;
      window.addEventListener("load", onWindowLoad, false);
    }
    window.addEventListener("load", onWindowLoad, false);
    function onPlatformReady() {
      ionic.Platform.isReady = true;
      ionic.Platform.detect();
      for (var x = 0; x < readyCallbacks.length; x++) {
        readyCallbacks[x]();
      }
      readyCallbacks = [];
      ionic.trigger('platformready', {target: document});
      ionic.requestAnimationFrame(function() {
        document.body.classList.add('platform-ready');
      });
    }
  })(this, document, ionic);
  (function(document, ionic) {
    'use strict';
    ionic.CSS = {};
    (function() {
      var i,
          keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform', '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
      for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
          ionic.CSS.TRANSFORM = keys[i];
          break;
        }
      }
      keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
      for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
          ionic.CSS.TRANSITION = keys[i];
          break;
        }
      }
    })();
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
      Object.defineProperty(HTMLElement.prototype, 'classList', {get: function() {
          var self = this;
          function update(fn) {
            return function() {
              var x,
                  classes = self.className.split(/\s+/);
              for (x = 0; x < arguments.length; x++) {
                fn(classes, classes.indexOf(arguments[x]), arguments[x]);
              }
              self.className = classes.join(" ");
            };
          }
          return {
            add: update(function(classes, index, value) {
              ~index || classes.push(value);
            }),
            remove: update(function(classes, index) {
              ~index && classes.splice(index, 1);
            }),
            toggle: update(function(classes, index, value) {
              ~index ? classes.splice(index, 1) : classes.push(value);
            }),
            contains: function(value) {
              return !!~self.className.split(/\s+/).indexOf(value);
            },
            item: function(i) {
              return self.className.split(/\s+/)[i] || null;
            }
          };
        }});
    }
  })(document, ionic);
  var tapDoc;
  var tapActiveEle;
  var tapEnabledTouchEvents;
  var tapMouseResetTimer;
  var tapPointerMoved;
  var tapPointerStart;
  var tapTouchFocusedInput;
  var tapLastTouchTarget;
  var tapTouchMoveListener = 'touchmove';
  var TAP_RELEASE_TOLERANCE = 6;
  var TAP_RELEASE_BUTTON_TOLERANCE = 50;
  var tapEventListeners = {
    'click': tapClickGateKeeper,
    'mousedown': tapMouseDown,
    'mouseup': tapMouseUp,
    'mousemove': tapMouseMove,
    'touchstart': tapTouchStart,
    'touchend': tapTouchEnd,
    'touchcancel': tapTouchCancel,
    'touchmove': tapTouchMove,
    'pointerdown': tapTouchStart,
    'pointerup': tapTouchEnd,
    'pointercancel': tapTouchCancel,
    'pointermove': tapTouchMove,
    'MSPointerDown': tapTouchStart,
    'MSPointerUp': tapTouchEnd,
    'MSPointerCancel': tapTouchCancel,
    'MSPointerMove': tapTouchMove,
    'focusin': tapFocusIn,
    'focusout': tapFocusOut
  };
  ionic.tap = {
    register: function(ele) {
      tapDoc = ele;
      tapEventListener('click', true, true);
      tapEventListener('mouseup');
      tapEventListener('mousedown');
      if (window.navigator.pointerEnabled) {
        tapEventListener('pointerdown');
        tapEventListener('pointerup');
        tapEventListener('pointcancel');
        tapTouchMoveListener = 'pointermove';
      } else if (window.navigator.msPointerEnabled) {
        tapEventListener('MSPointerDown');
        tapEventListener('MSPointerUp');
        tapEventListener('MSPointerCancel');
        tapTouchMoveListener = 'MSPointerMove';
      } else {
        tapEventListener('touchstart');
        tapEventListener('touchend');
        tapEventListener('touchcancel');
      }
      tapEventListener('focusin');
      tapEventListener('focusout');
      return function() {
        for (var type in tapEventListeners) {
          tapEventListener(type, false);
        }
        tapDoc = null;
        tapActiveEle = null;
        tapEnabledTouchEvents = false;
        tapPointerMoved = false;
        tapPointerStart = null;
      };
    },
    ignoreScrollStart: function(e) {
      return (e.defaultPrevented) || (/^(file|range)$/i).test(e.target.type) || (e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute('data-prevent-scroll')) == 'true' || (!!(/^(object|embed)$/i).test(e.target.tagName)) || ionic.tap.isElementTapDisabled(e.target);
    },
    isTextInput: function(ele) {
      return !!ele && (ele.tagName == 'TEXTAREA' || ele.contentEditable === 'true' || (ele.tagName == 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset)$/i).test(ele.type)));
    },
    isDateInput: function(ele) {
      return !!ele && (ele.tagName == 'INPUT' && (/^(date|time|datetime-local|month|week)$/i).test(ele.type));
    },
    isLabelWithTextInput: function(ele) {
      var container = tapContainingElement(ele, false);
      return !!container && ionic.tap.isTextInput(tapTargetElement(container));
    },
    containsOrIsTextInput: function(ele) {
      return ionic.tap.isTextInput(ele) || ionic.tap.isLabelWithTextInput(ele);
    },
    cloneFocusedInput: function(container, scrollIntance) {
      if (ionic.tap.hasCheckedClone)
        return;
      ionic.tap.hasCheckedClone = true;
      ionic.requestAnimationFrame(function() {
        var focusInput = container.querySelector(':focus');
        if (ionic.tap.isTextInput(focusInput)) {
          var clonedInput = focusInput.parentElement.querySelector('.cloned-text-input');
          if (!clonedInput) {
            clonedInput = document.createElement(focusInput.tagName);
            clonedInput.placeholder = focusInput.placeholder;
            clonedInput.type = focusInput.type;
            clonedInput.value = focusInput.value;
            clonedInput.style = focusInput.style;
            clonedInput.className = focusInput.className;
            clonedInput.classList.add('cloned-text-input');
            clonedInput.readOnly = true;
            if (focusInput.isContentEditable) {
              clonedInput.contentEditable = focusInput.contentEditable;
              clonedInput.innerHTML = focusInput.innerHTML;
            }
            focusInput.parentElement.insertBefore(clonedInput, focusInput);
            focusInput.style.top = focusInput.offsetTop;
            focusInput.classList.add('previous-input-focus');
          }
        }
      });
    },
    hasCheckedClone: false,
    removeClonedInputs: function(container, scrollIntance) {
      ionic.tap.hasCheckedClone = false;
      ionic.requestAnimationFrame(function() {
        var clonedInputs = container.querySelectorAll('.cloned-text-input');
        var previousInputFocus = container.querySelectorAll('.previous-input-focus');
        var x;
        for (x = 0; x < clonedInputs.length; x++) {
          clonedInputs[x].parentElement.removeChild(clonedInputs[x]);
        }
        for (x = 0; x < previousInputFocus.length; x++) {
          previousInputFocus[x].classList.remove('previous-input-focus');
          previousInputFocus[x].style.top = '';
          previousInputFocus[x].focus();
        }
      });
    },
    requiresNativeClick: function(ele) {
      if (!ele || ele.disabled || (/^(file|range)$/i).test(ele.type) || (/^(object|video)$/i).test(ele.tagName) || ionic.tap.isLabelContainingFileInput(ele)) {
        return true;
      }
      return ionic.tap.isElementTapDisabled(ele);
    },
    isLabelContainingFileInput: function(ele) {
      var lbl = tapContainingElement(ele);
      if (lbl.tagName !== 'LABEL')
        return false;
      var fileInput = lbl.querySelector('input[type=file]');
      if (fileInput && fileInput.disabled === false)
        return true;
      return false;
    },
    isElementTapDisabled: function(ele) {
      if (ele && ele.nodeType === 1) {
        var element = ele;
        while (element) {
          if ((element.dataset ? element.dataset.tapDisabled : element.getAttribute('data-tap-disabled')) == 'true') {
            return true;
          }
          element = element.parentElement;
        }
      }
      return false;
    },
    setTolerance: function(releaseTolerance, releaseButtonTolerance) {
      TAP_RELEASE_TOLERANCE = releaseTolerance;
      TAP_RELEASE_BUTTON_TOLERANCE = releaseButtonTolerance;
    },
    cancelClick: function() {
      tapPointerMoved = true;
    },
    pointerCoord: function(event) {
      var c = {
        x: 0,
        y: 0
      };
      if (event) {
        var touches = event.touches && event.touches.length ? event.touches : [event];
        var e = (event.changedTouches && event.changedTouches[0]) || touches[0];
        if (e) {
          c.x = e.clientX || e.pageX || 0;
          c.y = e.clientY || e.pageY || 0;
        }
      }
      return c;
    }
  };
  function tapEventListener(type, enable, useCapture) {
    if (enable !== false) {
      tapDoc.addEventListener(type, tapEventListeners[type], useCapture);
    } else {
      tapDoc.removeEventListener(type, tapEventListeners[type]);
    }
  }
  function tapClick(e) {
    var container = tapContainingElement(e.target);
    var ele = tapTargetElement(container);
    if (ionic.tap.requiresNativeClick(ele) || tapPointerMoved)
      return false;
    var c = ionic.tap.pointerCoord(e);
    void 0;
    triggerMouseEvent('click', ele, c.x, c.y);
    tapHandleFocus(ele);
  }
  function triggerMouseEvent(type, ele, x, y) {
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent(type, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
    clickEvent.isIonicTap = true;
    ele.dispatchEvent(clickEvent);
  }
  function tapClickGateKeeper(e) {
    if (e.target.type == 'submit' && e.detail === 0) {
      return;
    }
    if ((ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target)) || (!e.isIonicTap && !ionic.tap.requiresNativeClick(e.target))) {
      void 0;
      e.stopPropagation();
      if (!ionic.tap.isLabelWithTextInput(e.target)) {
        e.preventDefault();
      }
      return false;
    }
  }
  function tapMouseDown(e) {
    if (e.isIonicTap || tapIgnoreEvent(e))
      return;
    if (tapEnabledTouchEvents) {
      void 0;
      e.stopPropagation();
      if ((!ionic.tap.isTextInput(e.target) || tapLastTouchTarget !== e.target) && !(/^(select|option)$/i).test(e.target.tagName)) {
        e.preventDefault();
      }
      return false;
    }
    tapPointerMoved = false;
    tapPointerStart = ionic.tap.pointerCoord(e);
    tapEventListener('mousemove');
    ionic.activator.start(e);
  }
  function tapMouseUp(e) {
    if (tapEnabledTouchEvents) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    if (tapIgnoreEvent(e) || (/^(select|option)$/i).test(e.target.tagName))
      return false;
    if (!tapHasPointerMoved(e)) {
      tapClick(e);
    }
    tapEventListener('mousemove', false);
    ionic.activator.end();
    tapPointerMoved = false;
  }
  function tapMouseMove(e) {
    if (tapHasPointerMoved(e)) {
      tapEventListener('mousemove', false);
      ionic.activator.end();
      tapPointerMoved = true;
      return false;
    }
  }
  function tapTouchStart(e) {
    if (tapIgnoreEvent(e))
      return;
    tapPointerMoved = false;
    tapEnableTouchEvents();
    tapPointerStart = ionic.tap.pointerCoord(e);
    tapEventListener(tapTouchMoveListener);
    ionic.activator.start(e);
    if (ionic.Platform.isIOS() && ionic.tap.isLabelWithTextInput(e.target)) {
      var textInput = tapTargetElement(tapContainingElement(e.target));
      if (textInput !== tapActiveEle) {
        e.preventDefault();
      }
    }
  }
  function tapTouchEnd(e) {
    if (tapIgnoreEvent(e))
      return;
    tapEnableTouchEvents();
    if (!tapHasPointerMoved(e)) {
      tapClick(e);
      if ((/^(select|option)$/i).test(e.target.tagName)) {
        e.preventDefault();
      }
    }
    tapLastTouchTarget = e.target;
    tapTouchCancel();
  }
  function tapTouchMove(e) {
    if (tapHasPointerMoved(e)) {
      tapPointerMoved = true;
      tapEventListener(tapTouchMoveListener, false);
      ionic.activator.end();
      return false;
    }
  }
  function tapTouchCancel(e) {
    tapEventListener(tapTouchMoveListener, false);
    ionic.activator.end();
    tapPointerMoved = false;
  }
  function tapEnableTouchEvents() {
    tapEnabledTouchEvents = true;
    clearTimeout(tapMouseResetTimer);
    tapMouseResetTimer = setTimeout(function() {
      tapEnabledTouchEvents = false;
    }, 2000);
  }
  function tapIgnoreEvent(e) {
    if (e.isTapHandled)
      return true;
    e.isTapHandled = true;
    if (ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target)) {
      e.preventDefault();
      return true;
    }
  }
  function tapHandleFocus(ele) {
    tapTouchFocusedInput = null;
    var triggerFocusIn = false;
    if (ele.tagName == 'SELECT') {
      triggerMouseEvent('mousedown', ele, 0, 0);
      ele.focus && ele.focus();
      triggerFocusIn = true;
    } else if (tapActiveElement() === ele) {
      triggerFocusIn = true;
    } else if ((/^(input|textarea)$/i).test(ele.tagName) || ele.isContentEditable) {
      triggerFocusIn = true;
      ele.focus && ele.focus();
      ele.value = ele.value;
      if (tapEnabledTouchEvents) {
        tapTouchFocusedInput = ele;
      }
    } else {
      tapFocusOutActive();
    }
    if (triggerFocusIn) {
      tapActiveElement(ele);
      ionic.trigger('ionic.focusin', {target: ele}, true);
    }
  }
  function tapFocusOutActive() {
    var ele = tapActiveElement();
    if (ele && ((/^(input|textarea|select)$/i).test(ele.tagName) || ele.isContentEditable)) {
      void 0;
      ele.blur();
    }
    tapActiveElement(null);
  }
  function tapFocusIn(e) {
    if (tapEnabledTouchEvents && ionic.tap.isTextInput(tapActiveElement()) && ionic.tap.isTextInput(tapTouchFocusedInput) && tapTouchFocusedInput !== e.target) {
      void 0;
      tapTouchFocusedInput.focus();
      tapTouchFocusedInput = null;
    }
    ionic.scroll.isScrolling = false;
  }
  function tapFocusOut() {
    tapActiveElement(null);
  }
  function tapActiveElement(ele) {
    if (arguments.length) {
      tapActiveEle = ele;
    }
    return tapActiveEle || document.activeElement;
  }
  function tapHasPointerMoved(endEvent) {
    if (!endEvent || endEvent.target.nodeType !== 1 || !tapPointerStart || (tapPointerStart.x === 0 && tapPointerStart.y === 0)) {
      return false;
    }
    var endCoordinates = ionic.tap.pointerCoord(endEvent);
    var hasClassList = !!(endEvent.target.classList && endEvent.target.classList.contains);
    var releaseTolerance = hasClassList & endEvent.target.classList.contains('button') ? TAP_RELEASE_BUTTON_TOLERANCE : TAP_RELEASE_TOLERANCE;
    return Math.abs(tapPointerStart.x - endCoordinates.x) > releaseTolerance || Math.abs(tapPointerStart.y - endCoordinates.y) > releaseTolerance;
  }
  function tapContainingElement(ele, allowSelf) {
    var climbEle = ele;
    for (var x = 0; x < 6; x++) {
      if (!climbEle)
        break;
      if (climbEle.tagName === 'LABEL')
        return climbEle;
      climbEle = climbEle.parentElement;
    }
    if (allowSelf !== false)
      return ele;
  }
  function tapTargetElement(ele) {
    if (ele && ele.tagName === 'LABEL') {
      if (ele.control)
        return ele.control;
      if (ele.querySelector) {
        var control = ele.querySelector('input,textarea,select');
        if (control)
          return control;
      }
    }
    return ele;
  }
  ionic.DomUtil.ready(function() {
    var ng = typeof angular !== 'undefined' ? angular : null;
    if (!ng || (ng && !ng.scenario)) {
      ionic.tap.register(document);
    }
  });
  (function(document, ionic) {
    'use strict';
    var queueElements = {};
    var activeElements = {};
    var keyId = 0;
    var ACTIVATED_CLASS = 'activated';
    ionic.activator = {
      start: function(e) {
        var self = this;
        ionic.requestAnimationFrame(function() {
          if (ionic.tap.requiresNativeClick(e.target))
            return;
          var ele = e.target;
          var eleToActivate;
          for (var x = 0; x < 6; x++) {
            if (!ele || ele.nodeType !== 1)
              break;
            if (eleToActivate && ele.classList.contains('item')) {
              eleToActivate = ele;
              break;
            }
            if (ele.tagName == 'A' || ele.tagName == 'BUTTON' || ele.hasAttribute('ng-click')) {
              eleToActivate = ele;
              break;
            }
            if (ele.classList.contains('button')) {
              eleToActivate = ele;
              break;
            }
            if (ele.classList.contains('pane') || ele.tagName == 'BODY' || ele.tagName == 'ION-CONTENT') {
              break;
            }
            ele = ele.parentElement;
          }
          if (eleToActivate) {
            queueElements[keyId] = eleToActivate;
            if (e.type === 'touchstart') {
              self._activateTimeout = setTimeout(activateElements, 80);
            } else {
              ionic.requestAnimationFrame(activateElements);
            }
            keyId = (keyId > 19 ? 0 : keyId + 1);
          }
        });
      },
      end: function() {
        clearTimeout(this._activateTimeout);
        setTimeout(clear, 200);
      }
    };
    function clear() {
      queueElements = {};
      ionic.requestAnimationFrame(deactivateElements);
    }
    function activateElements() {
      for (var key in queueElements) {
        if (queueElements[key]) {
          queueElements[key].classList.add(ACTIVATED_CLASS);
          activeElements[key] = queueElements[key];
        }
      }
      queueElements = {};
    }
    function deactivateElements() {
      for (var key in activeElements) {
        if (activeElements[key]) {
          activeElements[key].classList.remove(ACTIVATED_CLASS);
          delete activeElements[key];
        }
      }
    }
  })(document, ionic);
  (function(ionic) {
    var uid = ['0', '0', '0'];
    ionic.Utils = {
      arrayMove: function(arr, old_index, new_index) {
        if (new_index >= arr.length) {
          var k = new_index - arr.length;
          while ((k--) + 1) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
      },
      proxy: function(func, context) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
          return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
        };
      },
      debounce: function(func, wait, immediate) {
        var timeout,
            args,
            context,
            timestamp,
            result;
        return function() {
          context = this;
          args = arguments;
          timestamp = new Date();
          var later = function() {
            var last = (new Date()) - timestamp;
            if (last < wait) {
              timeout = setTimeout(later, wait - last);
            } else {
              timeout = null;
              if (!immediate)
                result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          if (!timeout) {
            timeout = setTimeout(later, wait);
          }
          if (callNow)
            result = func.apply(context, args);
          return result;
        };
      },
      throttle: function(func, wait, options) {
        var context,
            args,
            result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
        };
        return function() {
          var now = Date.now();
          if (!previous && options.leading === false)
            previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      },
      inherit: function(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
          child = protoProps.constructor;
        } else {
          child = function() {
            return parent.apply(this, arguments);
          };
        }
        ionic.extend(child, parent, staticProps);
        var Surrogate = function() {
          this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps)
          ionic.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
      },
      extend: function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < args.length; i++) {
          var source = args[i];
          if (source) {
            for (var prop in source) {
              obj[prop] = source[prop];
            }
          }
        }
        return obj;
      },
      nextUid: function() {
        var index = uid.length;
        var digit;
        while (index) {
          index--;
          digit = uid[index].charCodeAt(0);
          if (digit == 57) {
            uid[index] = 'A';
            return uid.join('');
          }
          if (digit == 90) {
            uid[index] = '0';
          } else {
            uid[index] = String.fromCharCode(digit + 1);
            return uid.join('');
          }
        }
        uid.unshift('0');
        return uid.join('');
      }
    };
    ionic.inherit = ionic.Utils.inherit;
    ionic.extend = ionic.Utils.extend;
    ionic.throttle = ionic.Utils.throttle;
    ionic.proxy = ionic.Utils.proxy;
    ionic.debounce = ionic.Utils.debounce;
  })(window.ionic);
  var keyboardViewportHeight = getViewportHeight();
  var keyboardIsOpen;
  var keyboardActiveElement;
  var keyboardFocusOutTimer;
  var keyboardFocusInTimer;
  var keyboardPollHeightTimer;
  var keyboardLastShow = 0;
  var KEYBOARD_OPEN_CSS = 'keyboard-open';
  var SCROLL_CONTAINER_CSS = 'scroll';
  ionic.keyboard = {
    isOpen: false,
    height: null,
    landscape: false,
    hide: function() {
      clearTimeout(keyboardFocusInTimer);
      clearTimeout(keyboardFocusOutTimer);
      clearTimeout(keyboardPollHeightTimer);
      ionic.keyboard.isOpen = false;
      ionic.trigger('resetScrollView', {target: keyboardActiveElement}, true);
      ionic.requestAnimationFrame(function() {
        document.body.classList.remove(KEYBOARD_OPEN_CSS);
      });
      if (window.navigator.msPointerEnabled) {
        document.removeEventListener("MSPointerMove", keyboardPreventDefault);
      } else {
        document.removeEventListener('touchmove', keyboardPreventDefault);
      }
      document.removeEventListener('keydown', keyboardOnKeyDown);
      if (keyboardHasPlugin()) {
        cordova.plugins.Keyboard.close();
      }
    },
    show: function() {
      if (keyboardHasPlugin()) {
        cordova.plugins.Keyboard.show();
      }
    }
  };
  function keyboardInit() {
    if (keyboardHasPlugin()) {
      window.addEventListener('native.keyboardshow', keyboardNativeShow);
      window.addEventListener('native.keyboardhide', keyboardFocusOut);
      window.addEventListener('native.showkeyboard', keyboardNativeShow);
      window.addEventListener('native.hidekeyboard', keyboardFocusOut);
    } else {
      document.body.addEventListener('focusout', keyboardFocusOut);
    }
    document.body.addEventListener('ionic.focusin', keyboardBrowserFocusIn);
    document.body.addEventListener('focusin', keyboardBrowserFocusIn);
    document.body.addEventListener('orientationchange', keyboardOrientationChange);
    if (window.navigator.msPointerEnabled) {
      document.removeEventListener("MSPointerDown", keyboardInit);
    } else {
      document.removeEventListener('touchstart', keyboardInit);
    }
  }
  function keyboardNativeShow(e) {
    clearTimeout(keyboardFocusOutTimer);
    ionic.keyboard.height = e.keyboardHeight;
  }
  function keyboardBrowserFocusIn(e) {
    if (!e.target || !ionic.tap.isTextInput(e.target) || ionic.tap.isDateInput(e.target) || !keyboardIsWithinScroll(e.target))
      return;
    document.addEventListener('keydown', keyboardOnKeyDown, false);
    document.body.scrollTop = 0;
    document.body.querySelector('.scroll-content').scrollTop = 0;
    keyboardActiveElement = e.target;
    keyboardSetShow(e);
  }
  function keyboardSetShow(e) {
    clearTimeout(keyboardFocusInTimer);
    clearTimeout(keyboardFocusOutTimer);
    keyboardFocusInTimer = setTimeout(function() {
      if (keyboardLastShow + 350 > Date.now())
        return;
      void 0;
      keyboardLastShow = Date.now();
      var keyboardHeight;
      var elementBounds = keyboardActiveElement.getBoundingClientRect();
      var count = 0;
      keyboardPollHeightTimer = setInterval(function() {
        keyboardHeight = keyboardGetHeight();
        if (count > 10) {
          clearInterval(keyboardPollHeightTimer);
          keyboardHeight = 275;
        }
        if (keyboardHeight) {
          clearInterval(keyboardPollHeightTimer);
          keyboardShow(e.target, elementBounds.top, elementBounds.bottom, keyboardViewportHeight, keyboardHeight);
        }
        count++;
      }, 100);
    }, 32);
  }
  function keyboardShow(element, elementTop, elementBottom, viewportHeight, keyboardHeight) {
    var details = {
      target: element,
      elementTop: Math.round(elementTop),
      elementBottom: Math.round(elementBottom),
      keyboardHeight: keyboardHeight,
      viewportHeight: viewportHeight
    };
    details.hasPlugin = keyboardHasPlugin();
    details.contentHeight = viewportHeight - keyboardHeight;
    void 0;
    details.isElementUnderKeyboard = (details.elementBottom > details.contentHeight);
    ionic.keyboard.isOpen = true;
    keyboardActiveElement = element;
    ionic.trigger('scrollChildIntoView', details, true);
    ionic.requestAnimationFrame(function() {
      document.body.classList.add(KEYBOARD_OPEN_CSS);
    });
    if (window.navigator.msPointerEnabled) {
      document.addEventListener("MSPointerMove", keyboardPreventDefault, false);
    } else {
      document.addEventListener('touchmove', keyboardPreventDefault, false);
    }
    return details;
  }
  function keyboardFocusOut(e) {
    clearTimeout(keyboardFocusOutTimer);
    keyboardFocusOutTimer = setTimeout(ionic.keyboard.hide, 350);
  }
  function keyboardUpdateViewportHeight() {
    if (getViewportHeight() > keyboardViewportHeight) {
      keyboardViewportHeight = getViewportHeight();
    }
  }
  function keyboardOnKeyDown(e) {
    if (ionic.scroll.isScrolling) {
      keyboardPreventDefault(e);
    }
  }
  function keyboardPreventDefault(e) {
    if (e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  }
  function keyboardOrientationChange() {
    var updatedViewportHeight = getViewportHeight();
    if (updatedViewportHeight === keyboardViewportHeight) {
      var count = 0;
      var pollViewportHeight = setInterval(function() {
        if (count > 10) {
          clearInterval(pollViewportHeight);
        }
        updatedViewportHeight = getViewportHeight();
        if (updatedViewportHeight !== keyboardViewportHeight) {
          if (updatedViewportHeight < keyboardViewportHeight) {
            ionic.keyboard.landscape = true;
          } else {
            ionic.keyboard.landscape = false;
          }
          keyboardViewportHeight = updatedViewportHeight;
          clearInterval(pollViewportHeight);
        }
        count++;
      }, 50);
    } else {
      keyboardViewportHeight = updatedViewportHeight;
    }
  }
  function keyboardGetHeight() {
    if (ionic.keyboard.height) {
      return ionic.keyboard.height;
    }
    if (ionic.Platform.isAndroid()) {
      if (ionic.Platform.isFullScreen) {
        return 275;
      }
      if (getViewportHeight() < keyboardViewportHeight) {
        return keyboardViewportHeight - getViewportHeight();
      } else {
        return 0;
      }
    }
    if (ionic.Platform.isIOS()) {
      if (ionic.keyboard.landscape) {
        return 206;
      }
      if (!ionic.Platform.isWebView()) {
        return 216;
      }
      return 260;
    }
    return 275;
  }
  function getViewportHeight() {
    return window.innerHeight || screen.height;
  }
  function keyboardIsWithinScroll(ele) {
    while (ele) {
      if (ele.classList.contains(SCROLL_CONTAINER_CSS)) {
        return true;
      }
      ele = ele.parentElement;
    }
    return false;
  }
  function keyboardHasPlugin() {
    return !!(window.cordova && cordova.plugins && cordova.plugins.Keyboard);
  }
  ionic.Platform.ready(function() {
    keyboardUpdateViewportHeight();
    setTimeout(keyboardUpdateViewportHeight, 999);
    if (window.navigator.msPointerEnabled) {
      document.addEventListener("MSPointerDown", keyboardInit, false);
    } else {
      document.addEventListener('touchstart', keyboardInit, false);
    }
  });
  var viewportTag;
  var viewportProperties = {};
  ionic.viewport = {orientation: function() {
      return (window.innerWidth > window.innerHeight ? 90 : 0);
    }};
  function viewportLoadTag() {
    var x;
    for (x = 0; x < document.head.children.length; x++) {
      if (document.head.children[x].name == 'viewport') {
        viewportTag = document.head.children[x];
        break;
      }
    }
    if (viewportTag) {
      var props = viewportTag.content.toLowerCase().replace(/\s+/g, '').split(',');
      var keyValue;
      for (x = 0; x < props.length; x++) {
        if (props[x]) {
          keyValue = props[x].split('=');
          viewportProperties[keyValue[0]] = (keyValue.length > 1 ? keyValue[1] : '_');
        }
      }
      viewportUpdate();
    }
  }
  function viewportUpdate() {
    var initWidth = viewportProperties.width;
    var initHeight = viewportProperties.height;
    var p = ionic.Platform;
    var version = p.version();
    var DEVICE_WIDTH = 'device-width';
    var DEVICE_HEIGHT = 'device-height';
    var orientation = ionic.viewport.orientation();
    delete viewportProperties.height;
    viewportProperties.width = DEVICE_WIDTH;
    if (p.isIPad()) {
      if (version > 7) {
        delete viewportProperties.width;
      } else {
        if (p.isWebView()) {
          if (orientation == 90) {
            viewportProperties.height = '0';
          } else if (version == 7) {
            viewportProperties.height = DEVICE_HEIGHT;
          }
        } else {
          if (version < 7) {
            viewportProperties.height = '0';
          }
        }
      }
    } else if (p.isIOS()) {
      if (p.isWebView()) {
        if (version > 7) {
          delete viewportProperties.width;
        } else if (version < 7) {
          if (initHeight)
            viewportProperties.height = '0';
        } else if (version == 7) {
          viewportProperties.height = DEVICE_HEIGHT;
        }
      } else {
        if (version < 7) {
          if (initHeight)
            viewportProperties.height = '0';
        }
      }
    }
    if (initWidth !== viewportProperties.width || initHeight !== viewportProperties.height) {
      viewportTagUpdate();
    }
  }
  function viewportTagUpdate() {
    var key,
        props = [];
    for (key in viewportProperties) {
      if (viewportProperties[key]) {
        props.push(key + (viewportProperties[key] == '_' ? '' : '=' + viewportProperties[key]));
      }
    }
    viewportTag.content = props.join(', ');
  }
  ionic.Platform.ready(function() {
    viewportLoadTag();
    window.addEventListener("orientationchange", function() {
      setTimeout(viewportUpdate, 1000);
    }, false);
  });
  (function(ionic) {
    'use strict';
    ionic.views.View = function() {
      this.initialize.apply(this, arguments);
    };
    ionic.views.View.inherit = ionic.inherit;
    ionic.extend(ionic.views.View.prototype, {initialize: function() {}});
  })(window.ionic);
  var zyngaCore = {effect: {}};
  (function(global) {
    var time = Date.now || function() {
      return +new Date();
    };
    var desiredFrames = 60;
    var millisecondsPerSecond = 1000;
    var running = {};
    var counter = 1;
    zyngaCore.effect.Animate = {
      requestAnimationFrame: (function() {
        var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
        var isNative = !!requestFrame;
        if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
          isNative = false;
        }
        if (isNative) {
          return function(callback, root) {
            requestFrame(callback, root);
          };
        }
        var TARGET_FPS = 60;
        var requests = {};
        var requestCount = 0;
        var rafHandle = 1;
        var intervalHandle = null;
        var lastActive = +new Date();
        return function(callback, root) {
          var callbackHandle = rafHandle++;
          requests[callbackHandle] = callback;
          requestCount++;
          if (intervalHandle === null) {
            intervalHandle = setInterval(function() {
              var time = +new Date();
              var currentRequests = requests;
              requests = {};
              requestCount = 0;
              for (var key in currentRequests) {
                if (currentRequests.hasOwnProperty(key)) {
                  currentRequests[key](time);
                  lastActive = time;
                }
              }
              if (time - lastActive > 2500) {
                clearInterval(intervalHandle);
                intervalHandle = null;
              }
            }, 1000 / TARGET_FPS);
          }
          return callbackHandle;
        };
      })(),
      stop: function(id) {
        var cleared = running[id] != null;
        if (cleared) {
          running[id] = null;
        }
        return cleared;
      },
      isRunning: function(id) {
        return running[id] != null;
      },
      start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
        var start = time();
        var lastFrame = start;
        var percent = 0;
        var dropCounter = 0;
        var id = counter++;
        if (!root) {
          root = document.body;
        }
        if (id % 20 === 0) {
          var newRunning = {};
          for (var usedId in running) {
            newRunning[usedId] = true;
          }
          running = newRunning;
        }
        var step = function(virtual) {
          var render = virtual !== true;
          var now = time();
          if (!running[id] || (verifyCallback && !verifyCallback(id))) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
            return;
          }
          if (render) {
            var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
            for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
              step(true);
              dropCounter++;
            }
          }
          if (duration) {
            percent = (now - start) / duration;
            if (percent > 1) {
              percent = 1;
            }
          }
          var value = easingMethod ? easingMethod(percent) : percent;
          if ((stepCallback(value, now, render) === false || percent === 1) && render) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
          } else if (render) {
            lastFrame = now;
            zyngaCore.effect.Animate.requestAnimationFrame(step, root);
          }
        };
        running[id] = true;
        zyngaCore.effect.Animate.requestAnimationFrame(step, root);
        return id;
      }
    };
  })(this);
  var Scroller;
  (function(ionic) {
    var NOOP = function() {};
    var easeOutCubic = function(pos) {
      return (Math.pow((pos - 1), 3) + 1);
    };
    var easeInOutCubic = function(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 3);
      }
      return 0.5 * (Math.pow((pos - 2), 3) + 2);
    };
    ionic.views.Scroll = ionic.views.View.inherit({
      initialize: function(options) {
        var self = this;
        this.__container = options.el;
        this.__content = options.el.firstElementChild;
        setTimeout(function() {
          if (self.__container && self.__content) {
            self.__container.scrollTop = 0;
            self.__content.scrollTop = 0;
          }
        });
        this.options = {
          scrollingX: false,
          scrollbarX: true,
          scrollingY: true,
          scrollbarY: true,
          startX: 0,
          startY: 0,
          wheelDampen: 6,
          minScrollbarSizeX: 5,
          minScrollbarSizeY: 5,
          scrollbarsFade: true,
          scrollbarFadeDelay: 300,
          scrollbarResizeFadeDelay: 1000,
          animating: true,
          animationDuration: 250,
          bouncing: true,
          locking: true,
          paging: false,
          snapping: false,
          zooming: false,
          minZoom: 0.5,
          maxZoom: 3,
          speedMultiplier: 1,
          deceleration: 0.97,
          scrollingComplete: NOOP,
          penetrationDeceleration: 0.03,
          penetrationAcceleration: 0.08,
          scrollEventInterval: 10,
          getContentWidth: function() {
            return Math.max(self.__content.scrollWidth, self.__content.offsetWidth);
          },
          getContentHeight: function() {
            return Math.max(self.__content.scrollHeight, self.__content.offsetHeight + (self.__content.offsetTop * 2));
          }
        };
        for (var key in options) {
          this.options[key] = options[key];
        }
        this.hintResize = ionic.debounce(function() {
          self.resize();
        }, 1000, true);
        this.onScroll = function() {
          if (!ionic.scroll.isScrolling) {
            setTimeout(self.setScrollStart, 50);
          } else {
            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(self.setScrollStop, 80);
          }
        };
        this.setScrollStart = function() {
          ionic.scroll.isScrolling = Math.abs(ionic.scroll.lastTop - self.__scrollTop) > 1;
          clearTimeout(self.scrollTimer);
          self.scrollTimer = setTimeout(self.setScrollStop, 80);
        };
        this.setScrollStop = function() {
          ionic.scroll.isScrolling = false;
          ionic.scroll.lastTop = self.__scrollTop;
        };
        this.triggerScrollEvent = ionic.throttle(function() {
          self.onScroll();
          ionic.trigger('scroll', {
            scrollTop: self.__scrollTop,
            scrollLeft: self.__scrollLeft,
            target: self.__container
          });
        }, this.options.scrollEventInterval);
        this.triggerScrollEndEvent = function() {
          ionic.trigger('scrollend', {
            scrollTop: self.__scrollTop,
            scrollLeft: self.__scrollLeft,
            target: self.__container
          });
        };
        this.__scrollLeft = this.options.startX;
        this.__scrollTop = this.options.startY;
        this.__callback = this.getRenderFn();
        this.__initEventHandlers();
        this.__createScrollbars();
      },
      run: function() {
        this.resize();
        this.__fadeScrollbars('out', this.options.scrollbarResizeFadeDelay);
      },
      __isSingleTouch: false,
      __isTracking: false,
      __didDecelerationComplete: false,
      __isGesturing: false,
      __isDragging: false,
      __isDecelerating: false,
      __isAnimating: false,
      __clientLeft: 0,
      __clientTop: 0,
      __clientWidth: 0,
      __clientHeight: 0,
      __contentWidth: 0,
      __contentHeight: 0,
      __snapWidth: 100,
      __snapHeight: 100,
      __refreshHeight: null,
      __refreshActive: false,
      __refreshActivate: null,
      __refreshDeactivate: null,
      __refreshStart: null,
      __zoomLevel: 1,
      __scrollLeft: 0,
      __scrollTop: 0,
      __maxScrollLeft: 0,
      __maxScrollTop: 0,
      __scheduledLeft: 0,
      __scheduledTop: 0,
      __scheduledZoom: 0,
      __lastTouchLeft: null,
      __lastTouchTop: null,
      __lastTouchMove: null,
      __positions: null,
      __minDecelerationScrollLeft: null,
      __minDecelerationScrollTop: null,
      __maxDecelerationScrollLeft: null,
      __maxDecelerationScrollTop: null,
      __decelerationVelocityX: null,
      __decelerationVelocityY: null,
      __transformProperty: null,
      __perspectiveProperty: null,
      __indicatorX: null,
      __indicatorY: null,
      __scrollbarFadeTimeout: null,
      __didWaitForSize: null,
      __sizerTimeout: null,
      __initEventHandlers: function() {
        var self = this;
        var container = this.__container;
        self.scrollChildIntoView = function(e) {
          var scrollBottomOffsetToTop;
          if (!self.isScrolledIntoView) {
            if (ionic.Platform.isIOS() || ionic.Platform.isFullScreen) {
              scrollBottomOffsetToTop = container.getBoundingClientRect().bottom;
              var scrollBottomOffsetToBottom = e.detail.viewportHeight - scrollBottomOffsetToTop;
              var keyboardOffset = Math.max(0, e.detail.keyboardHeight - scrollBottomOffsetToBottom);
              container.style.height = (container.clientHeight - keyboardOffset) + "px";
              container.style.overflow = "visible";
              self.resize();
            }
            self.isScrolledIntoView = true;
          }
          if (e.detail.isElementUnderKeyboard) {
            var delay;
            if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
              if (ionic.Platform.version() < 4.4) {
                delay = 500;
              } else {
                delay = 350;
              }
            } else {
              delay = 80;
            }
            ionic.scroll.isScrolling = true;
            setTimeout(function() {
              var scrollMidpointOffset = container.clientHeight * 0.5;
              scrollBottomOffsetToTop = container.getBoundingClientRect().bottom;
              var elementTopOffsetToScrollBottom = e.detail.elementTop - scrollBottomOffsetToTop;
              var scrollTop = elementTopOffsetToScrollBottom + scrollMidpointOffset;
              if (scrollTop > 0) {
                ionic.tap.cloneFocusedInput(container, self);
                self.scrollBy(0, scrollTop, true);
                self.onScroll();
              }
            }, delay);
          }
          e.stopPropagation();
        };
        self.resetScrollView = function(e) {
          if (self.isScrolledIntoView) {
            self.isScrolledIntoView = false;
            container.style.height = "";
            container.style.overflow = "";
            self.resize();
            ionic.scroll.isScrolling = false;
          }
        };
        container.addEventListener('scrollChildIntoView', self.scrollChildIntoView);
        container.addEventListener('resetScrollView', self.resetScrollView);
        function getEventTouches(e) {
          return e.touches && e.touches.length ? e.touches : [{
            pageX: e.pageX,
            pageY: e.pageY
          }];
        }
        self.touchStart = function(e) {
          self.startCoordinates = ionic.tap.pointerCoord(e);
          if (ionic.tap.ignoreScrollStart(e)) {
            return;
          }
          self.__isDown = true;
          if (ionic.tap.containsOrIsTextInput(e.target) || e.target.tagName === 'SELECT') {
            self.__hasStarted = false;
            return;
          }
          self.__isSelectable = true;
          self.__enableScrollY = true;
          self.__hasStarted = true;
          self.doTouchStart(getEventTouches(e), e.timeStamp);
          e.preventDefault();
        };
        self.touchMove = function(e) {
          if (!self.__isDown || e.defaultPrevented || (e.target.tagName === 'TEXTAREA' && e.target.parentElement.querySelector(':focus'))) {
            return;
          }
          if (!self.__hasStarted && (ionic.tap.containsOrIsTextInput(e.target) || e.target.tagName === 'SELECT')) {
            self.__hasStarted = true;
            self.doTouchStart(getEventTouches(e), e.timeStamp);
            e.preventDefault();
            return;
          }
          if (self.startCoordinates) {
            var currentCoordinates = ionic.tap.pointerCoord(e);
            if (self.__isSelectable && ionic.tap.isTextInput(e.target) && Math.abs(self.startCoordinates.x - currentCoordinates.x) > 20) {
              self.__enableScrollY = false;
              self.__isSelectable = true;
            }
            if (self.__enableScrollY && Math.abs(self.startCoordinates.y - currentCoordinates.y) > 10) {
              self.__isSelectable = false;
              ionic.tap.cloneFocusedInput(container, self);
            }
          }
          self.doTouchMove(getEventTouches(e), e.timeStamp, e.scale);
          self.__isDown = true;
        };
        self.touchEnd = function(e) {
          if (!self.__isDown)
            return;
          self.doTouchEnd(e.timeStamp);
          self.__isDown = false;
          self.__hasStarted = false;
          self.__isSelectable = true;
          self.__enableScrollY = true;
          if (!self.__isDragging && !self.__isDecelerating && !self.__isAnimating) {
            ionic.tap.removeClonedInputs(container, self);
          }
        };
        if ('ontouchstart' in window) {
          container.addEventListener("touchstart", self.touchStart, false);
          document.addEventListener("touchmove", self.touchMove, false);
          document.addEventListener("touchend", self.touchEnd, false);
          document.addEventListener("touchcancel", self.touchEnd, false);
        } else if (window.navigator.pointerEnabled) {
          container.addEventListener("pointerdown", self.touchStart, false);
          document.addEventListener("pointermove", self.touchMove, false);
          document.addEventListener("pointerup", self.touchEnd, false);
          document.addEventListener("pointercancel", self.touchEnd, false);
        } else if (window.navigator.msPointerEnabled) {
          container.addEventListener("MSPointerDown", self.touchStart, false);
          document.addEventListener("MSPointerMove", self.touchMove, false);
          document.addEventListener("MSPointerUp", self.touchEnd, false);
          document.addEventListener("MSPointerCancel", self.touchEnd, false);
        } else {
          var mousedown = false;
          self.mouseDown = function(e) {
            if (ionic.tap.ignoreScrollStart(e) || e.target.tagName === 'SELECT') {
              return;
            }
            self.doTouchStart(getEventTouches(e), e.timeStamp);
            if (!ionic.tap.isTextInput(e.target)) {
              e.preventDefault();
            }
            mousedown = true;
          };
          self.mouseMove = function(e) {
            if (!mousedown || e.defaultPrevented) {
              return;
            }
            self.doTouchMove(getEventTouches(e), e.timeStamp);
            mousedown = true;
          };
          self.mouseUp = function(e) {
            if (!mousedown) {
              return;
            }
            self.doTouchEnd(e.timeStamp);
            mousedown = false;
          };
          self.mouseWheel = ionic.animationFrameThrottle(function(e) {
            var scrollParent = ionic.DomUtil.getParentOrSelfWithClass(e.target, 'ionic-scroll');
            if (scrollParent === self.__container) {
              self.hintResize();
              self.scrollBy(e.wheelDeltaX / self.options.wheelDampen, -e.wheelDeltaY / self.options.wheelDampen);
              self.__fadeScrollbars('in');
              clearTimeout(self.__wheelHideBarTimeout);
              self.__wheelHideBarTimeout = setTimeout(function() {
                self.__fadeScrollbars('out');
              }, 100);
            }
          });
          container.addEventListener("mousedown", self.mouseDown, false);
          document.addEventListener("mousemove", self.mouseMove, false);
          document.addEventListener("mouseup", self.mouseUp, false);
          document.addEventListener('mousewheel', self.mouseWheel, false);
        }
      },
      __cleanup: function() {
        var container = this.__container;
        var self = this;
        container.removeEventListener('touchstart', self.touchStart);
        document.removeEventListener('touchmove', self.touchMove);
        document.removeEventListener('touchend', self.touchEnd);
        document.removeEventListener('touchcancel', self.touchCancel);
        container.removeEventListener("pointerdown", self.touchStart);
        document.removeEventListener("pointermove", self.touchMove);
        document.removeEventListener("pointerup", self.touchEnd);
        document.removeEventListener("pointercancel", self.touchEnd);
        container.removeEventListener("MSPointerDown", self.touchStart);
        document.removeEventListener("MSPointerMove", self.touchMove);
        document.removeEventListener("MSPointerUp", self.touchEnd);
        document.removeEventListener("MSPointerCancel", self.touchEnd);
        container.removeEventListener("mousedown", self.mouseDown);
        document.removeEventListener("mousemove", self.mouseMove);
        document.removeEventListener("mouseup", self.mouseUp);
        document.removeEventListener('mousewheel', self.mouseWheel);
        container.removeEventListener('scrollChildIntoView', self.scrollChildIntoView);
        container.removeEventListener('resetScrollView', self.resetScrollView);
        ionic.tap.removeClonedInputs(container, self);
        delete this.__container;
        delete this.__content;
        delete this.__indicatorX;
        delete this.__indicatorY;
        delete this.options.el;
        this.__callback = this.scrollChildIntoView = this.resetScrollView = angular.noop;
        this.mouseMove = this.mouseDown = this.mouseUp = this.mouseWheel = this.touchStart = this.touchMove = this.touchEnd = this.touchCancel = angular.noop;
        this.resize = this.scrollTo = this.zoomTo = this.__scrollingComplete = angular.noop;
        container = null;
      },
      __createScrollbar: function(direction) {
        var bar = document.createElement('div'),
            indicator = document.createElement('div');
        indicator.className = 'scroll-bar-indicator scroll-bar-fade-out';
        if (direction == 'h') {
          bar.className = 'scroll-bar scroll-bar-h';
        } else {
          bar.className = 'scroll-bar scroll-bar-v';
        }
        bar.appendChild(indicator);
        return bar;
      },
      __createScrollbars: function() {
        var indicatorX,
            indicatorY;
        if (this.options.scrollingX) {
          indicatorX = {
            el: this.__createScrollbar('h'),
            sizeRatio: 1
          };
          indicatorX.indicator = indicatorX.el.children[0];
          if (this.options.scrollbarX) {
            this.__container.appendChild(indicatorX.el);
          }
          this.__indicatorX = indicatorX;
        }
        if (this.options.scrollingY) {
          indicatorY = {
            el: this.__createScrollbar('v'),
            sizeRatio: 1
          };
          indicatorY.indicator = indicatorY.el.children[0];
          if (this.options.scrollbarY) {
            this.__container.appendChild(indicatorY.el);
          }
          this.__indicatorY = indicatorY;
        }
      },
      __resizeScrollbars: function() {
        var self = this;
        if (self.__indicatorX) {
          var width = Math.max(Math.round(self.__clientWidth * self.__clientWidth / (self.__contentWidth)), 20);
          if (width > self.__contentWidth) {
            width = 0;
          }
          self.__indicatorX.size = width;
          self.__indicatorX.minScale = this.options.minScrollbarSizeX / width;
          self.__indicatorX.indicator.style.width = width + 'px';
          self.__indicatorX.maxPos = self.__clientWidth - width;
          self.__indicatorX.sizeRatio = self.__maxScrollLeft ? self.__indicatorX.maxPos / self.__maxScrollLeft : 1;
        }
        if (self.__indicatorY) {
          var height = Math.max(Math.round(self.__clientHeight * self.__clientHeight / (self.__contentHeight)), 20);
          if (height > self.__contentHeight) {
            height = 0;
          }
          self.__indicatorY.size = height;
          self.__indicatorY.minScale = this.options.minScrollbarSizeY / height;
          self.__indicatorY.maxPos = self.__clientHeight - height;
          self.__indicatorY.indicator.style.height = height + 'px';
          self.__indicatorY.sizeRatio = self.__maxScrollTop ? self.__indicatorY.maxPos / self.__maxScrollTop : 1;
        }
      },
      __repositionScrollbars: function() {
        var self = this,
            width,
            heightScale,
            widthDiff,
            heightDiff,
            x,
            y,
            xstop = 0,
            ystop = 0;
        if (self.__indicatorX) {
          if (self.__indicatorY)
            xstop = 10;
          x = Math.round(self.__indicatorX.sizeRatio * self.__scrollLeft) || 0, widthDiff = self.__scrollLeft - (self.__maxScrollLeft - xstop);
          if (self.__scrollLeft < 0) {
            widthScale = Math.max(self.__indicatorX.minScale, (self.__indicatorX.size - Math.abs(self.__scrollLeft)) / self.__indicatorX.size);
            x = 0;
            self.__indicatorX.indicator.style[self.__transformOriginProperty] = 'left center';
          } else if (widthDiff > 0) {
            widthScale = Math.max(self.__indicatorX.minScale, (self.__indicatorX.size - widthDiff) / self.__indicatorX.size);
            x = self.__indicatorX.maxPos - xstop;
            self.__indicatorX.indicator.style[self.__transformOriginProperty] = 'right center';
          } else {
            x = Math.min(self.__maxScrollLeft, Math.max(0, x));
            widthScale = 1;
          }
          self.__indicatorX.indicator.style[self.__transformProperty] = 'translate3d(' + x + 'px, 0, 0) scaleX(' + widthScale + ')';
        }
        if (self.__indicatorY) {
          y = Math.round(self.__indicatorY.sizeRatio * self.__scrollTop) || 0;
          if (self.__indicatorX)
            ystop = 10;
          heightDiff = self.__scrollTop - (self.__maxScrollTop - ystop);
          if (self.__scrollTop < 0) {
            heightScale = Math.max(self.__indicatorY.minScale, (self.__indicatorY.size - Math.abs(self.__scrollTop)) / self.__indicatorY.size);
            y = 0;
            self.__indicatorY.indicator.style[self.__transformOriginProperty] = 'center top';
          } else if (heightDiff > 0) {
            heightScale = Math.max(self.__indicatorY.minScale, (self.__indicatorY.size - heightDiff) / self.__indicatorY.size);
            y = self.__indicatorY.maxPos - ystop;
            self.__indicatorY.indicator.style[self.__transformOriginProperty] = 'center bottom';
          } else {
            y = Math.min(self.__maxScrollTop, Math.max(0, y));
            heightScale = 1;
          }
          self.__indicatorY.indicator.style[self.__transformProperty] = 'translate3d(0,' + y + 'px, 0) scaleY(' + heightScale + ')';
        }
      },
      __fadeScrollbars: function(direction, delay) {
        var self = this;
        if (!this.options.scrollbarsFade) {
          return;
        }
        var className = 'scroll-bar-fade-out';
        if (self.options.scrollbarsFade === true) {
          clearTimeout(self.__scrollbarFadeTimeout);
          if (direction == 'in') {
            if (self.__indicatorX) {
              self.__indicatorX.indicator.classList.remove(className);
            }
            if (self.__indicatorY) {
              self.__indicatorY.indicator.classList.remove(className);
            }
          } else {
            self.__scrollbarFadeTimeout = setTimeout(function() {
              if (self.__indicatorX) {
                self.__indicatorX.indicator.classList.add(className);
              }
              if (self.__indicatorY) {
                self.__indicatorY.indicator.classList.add(className);
              }
            }, delay || self.options.scrollbarFadeDelay);
          }
        }
      },
      __scrollingComplete: function() {
        var self = this;
        self.options.scrollingComplete();
        ionic.tap.removeClonedInputs(self.__container, self);
        self.__fadeScrollbars('out');
      },
      resize: function() {
        if (!this.__container || !this.options)
          return;
        this.setDimensions(this.__container.clientWidth, this.__container.clientHeight, this.options.getContentWidth(), this.options.getContentHeight());
      },
      getRenderFn: function() {
        var self = this;
        var content = this.__content;
        var docStyle = document.documentElement.style;
        var engine;
        if ('MozAppearance' in docStyle) {
          engine = 'gecko';
        } else if ('WebkitAppearance' in docStyle) {
          engine = 'webkit';
        } else if (typeof navigator.cpuClass === 'string') {
          engine = 'trident';
        }
        var vendorPrefix = {
          trident: 'ms',
          gecko: 'Moz',
          webkit: 'Webkit',
          presto: 'O'
        }[engine];
        var helperElem = document.createElement("div");
        var undef;
        var perspectiveProperty = vendorPrefix + "Perspective";
        var transformProperty = vendorPrefix + "Transform";
        var transformOriginProperty = vendorPrefix + 'TransformOrigin';
        self.__perspectiveProperty = transformProperty;
        self.__transformProperty = transformProperty;
        self.__transformOriginProperty = transformOriginProperty;
        if (helperElem.style[perspectiveProperty] !== undef) {
          return function(left, top, zoom, wasResize) {
            content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
            self.__repositionScrollbars();
            if (!wasResize) {
              self.triggerScrollEvent();
            }
          };
        } else if (helperElem.style[transformProperty] !== undef) {
          return function(left, top, zoom, wasResize) {
            content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
            self.__repositionScrollbars();
            if (!wasResize) {
              self.triggerScrollEvent();
            }
          };
        } else {
          return function(left, top, zoom, wasResize) {
            content.style.marginLeft = left ? (-left / zoom) + 'px' : '';
            content.style.marginTop = top ? (-top / zoom) + 'px' : '';
            content.style.zoom = zoom || '';
            self.__repositionScrollbars();
            if (!wasResize) {
              self.triggerScrollEvent();
            }
          };
        }
      },
      setDimensions: function(clientWidth, clientHeight, contentWidth, contentHeight) {
        var self = this;
        if (clientWidth === +clientWidth) {
          self.__clientWidth = clientWidth;
        }
        if (clientHeight === +clientHeight) {
          self.__clientHeight = clientHeight;
        }
        if (contentWidth === +contentWidth) {
          self.__contentWidth = contentWidth;
        }
        if (contentHeight === +contentHeight) {
          self.__contentHeight = contentHeight;
        }
        self.__computeScrollMax();
        self.__resizeScrollbars();
        self.scrollTo(self.__scrollLeft, self.__scrollTop, true, null, true);
      },
      setPosition: function(left, top) {
        var self = this;
        self.__clientLeft = left || 0;
        self.__clientTop = top || 0;
      },
      setSnapSize: function(width, height) {
        var self = this;
        self.__snapWidth = width;
        self.__snapHeight = height;
      },
      activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback, showCallback, hideCallback, tailCallback) {
        var self = this;
        self.__refreshHeight = height;
        self.__refreshActivate = function() {
          ionic.requestAnimationFrame(activateCallback);
        };
        self.__refreshDeactivate = function() {
          ionic.requestAnimationFrame(deactivateCallback);
        };
        self.__refreshStart = function() {
          ionic.requestAnimationFrame(startCallback);
        };
        self.__refreshShow = function() {
          ionic.requestAnimationFrame(showCallback);
        };
        self.__refreshHide = function() {
          ionic.requestAnimationFrame(hideCallback);
        };
        self.__refreshTail = function() {
          ionic.requestAnimationFrame(tailCallback);
        };
        self.__refreshTailTime = 100;
        self.__minSpinTime = 600;
      },
      triggerPullToRefresh: function() {
        this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);
        var d = new Date();
        self.refreshStartTime = d.getTime();
        if (this.__refreshStart) {
          this.__refreshStart();
        }
      },
      finishPullToRefresh: function() {
        var self = this;
        var d = new Date();
        var delay = 0;
        if (self.refreshStartTime + self.__minSpinTime > d.getTime()) {
          delay = self.refreshStartTime + self.__minSpinTime - d.getTime();
        }
        setTimeout(function() {
          if (self.__refreshTail) {
            self.__refreshTail();
          }
          setTimeout(function() {
            self.__refreshActive = false;
            if (self.__refreshDeactivate) {
              self.__refreshDeactivate();
            }
            self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
          }, self.__refreshTailTime);
        }, delay);
      },
      getValues: function() {
        var self = this;
        return {
          left: self.__scrollLeft,
          top: self.__scrollTop,
          zoom: self.__zoomLevel
        };
      },
      getScrollMax: function() {
        var self = this;
        return {
          left: self.__maxScrollLeft,
          top: self.__maxScrollTop
        };
      },
      zoomTo: function(level, animate, originLeft, originTop) {
        var self = this;
        if (!self.options.zooming) {
          throw new Error("Zooming is not enabled!");
        }
        if (self.__isDecelerating) {
          zyngaCore.effect.Animate.stop(self.__isDecelerating);
          self.__isDecelerating = false;
        }
        var oldLevel = self.__zoomLevel;
        if (originLeft == null) {
          originLeft = self.__clientWidth / 2;
        }
        if (originTop == null) {
          originTop = self.__clientHeight / 2;
        }
        level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
        self.__computeScrollMax(level);
        var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
        var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;
        if (left > self.__maxScrollLeft) {
          left = self.__maxScrollLeft;
        } else if (left < 0) {
          left = 0;
        }
        if (top > self.__maxScrollTop) {
          top = self.__maxScrollTop;
        } else if (top < 0) {
          top = 0;
        }
        self.__publish(left, top, level, animate);
      },
      zoomBy: function(factor, animate, originLeft, originTop) {
        var self = this;
        self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop);
      },
      scrollTo: function(left, top, animate, zoom, wasResize) {
        var self = this;
        if (self.__isDecelerating) {
          zyngaCore.effect.Animate.stop(self.__isDecelerating);
          self.__isDecelerating = false;
        }
        if (zoom != null && zoom !== self.__zoomLevel) {
          if (!self.options.zooming) {
            throw new Error("Zooming is not enabled!");
          }
          left *= zoom;
          top *= zoom;
          self.__computeScrollMax(zoom);
        } else {
          zoom = self.__zoomLevel;
        }
        if (!self.options.scrollingX) {
          left = self.__scrollLeft;
        } else {
          if (self.options.paging) {
            left = Math.round(left / self.__clientWidth) * self.__clientWidth;
          } else if (self.options.snapping) {
            left = Math.round(left / self.__snapWidth) * self.__snapWidth;
          }
        }
        if (!self.options.scrollingY) {
          top = self.__scrollTop;
        } else {
          if (self.options.paging) {
            top = Math.round(top / self.__clientHeight) * self.__clientHeight;
          } else if (self.options.snapping) {
            top = Math.round(top / self.__snapHeight) * self.__snapHeight;
          }
        }
        left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
        top = Math.max(Math.min(self.__maxScrollTop, top), 0);
        if (left === self.__scrollLeft && top === self.__scrollTop) {
          animate = false;
        }
        self.__publish(left, top, zoom, animate, wasResize);
      },
      scrollBy: function(left, top, animate) {
        var self = this;
        var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
        var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;
        self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
      },
      doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {
        var self = this;
        var change = wheelDelta > 0 ? 0.97 : 1.03;
        return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
      },
      doTouchStart: function(touches, timeStamp) {
        this.hintResize();
        if (timeStamp instanceof Date) {
          timeStamp = timeStamp.valueOf();
        }
        if (typeof timeStamp !== "number") {
          timeStamp = Date.now();
        }
        var self = this;
        self.__interruptedAnimation = true;
        if (self.__isDecelerating) {
          zyngaCore.effect.Animate.stop(self.__isDecelerating);
          self.__isDecelerating = false;
          self.__interruptedAnimation = true;
        }
        if (self.__isAnimating) {
          zyngaCore.effect.Animate.stop(self.__isAnimating);
          self.__isAnimating = false;
          self.__interruptedAnimation = true;
        }
        var currentTouchLeft,
            currentTouchTop;
        var isSingleTouch = touches.length === 1;
        if (isSingleTouch) {
          currentTouchLeft = touches[0].pageX;
          currentTouchTop = touches[0].pageY;
        } else {
          currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
          currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
        }
        self.__initialTouchLeft = currentTouchLeft;
        self.__initialTouchTop = currentTouchTop;
        self.__initialTouches = touches;
        self.__zoomLevelStart = self.__zoomLevel;
        self.__lastTouchLeft = currentTouchLeft;
        self.__lastTouchTop = currentTouchTop;
        self.__lastTouchMove = timeStamp;
        self.__lastScale = 1;
        self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
        self.__enableScrollY = !isSingleTouch && self.options.scrollingY;
        self.__isTracking = true;
        self.__didDecelerationComplete = false;
        self.__isDragging = !isSingleTouch;
        self.__isSingleTouch = isSingleTouch;
        self.__positions = [];
      },
      doTouchMove: function(touches, timeStamp, scale) {
        if (timeStamp instanceof Date) {
          timeStamp = timeStamp.valueOf();
        }
        if (typeof timeStamp !== "number") {
          timeStamp = Date.now();
        }
        var self = this;
        if (!self.__isTracking) {
          return;
        }
        var currentTouchLeft,
            currentTouchTop;
        if (touches.length === 2) {
          currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
          currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
          if (!scale && self.options.zooming) {
            scale = self.__getScale(self.__initialTouches, touches);
          }
        } else {
          currentTouchLeft = touches[0].pageX;
          currentTouchTop = touches[0].pageY;
        }
        var positions = self.__positions;
        if (self.__isDragging) {
          var moveX = currentTouchLeft - self.__lastTouchLeft;
          var moveY = currentTouchTop - self.__lastTouchTop;
          var scrollLeft = self.__scrollLeft;
          var scrollTop = self.__scrollTop;
          var level = self.__zoomLevel;
          if (scale != null && self.options.zooming) {
            var oldLevel = level;
            level = level / self.__lastScale * scale;
            level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
            if (oldLevel !== level) {
              var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
              var currentTouchTopRel = currentTouchTop - self.__clientTop;
              scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
              scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;
              self.__computeScrollMax(level);
            }
          }
          if (self.__enableScrollX) {
            scrollLeft -= moveX * this.options.speedMultiplier;
            var maxScrollLeft = self.__maxScrollLeft;
            if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
              if (self.options.bouncing) {
                scrollLeft += (moveX / 2 * this.options.speedMultiplier);
              } else if (scrollLeft > maxScrollLeft) {
                scrollLeft = maxScrollLeft;
              } else {
                scrollLeft = 0;
              }
            }
          }
          if (self.__enableScrollY) {
            scrollTop -= moveY * this.options.speedMultiplier;
            var maxScrollTop = self.__maxScrollTop;
            if (scrollTop > maxScrollTop || scrollTop < 0) {
              if (self.options.bouncing || (self.__refreshHeight && scrollTop < 0)) {
                scrollTop += (moveY / 2 * this.options.speedMultiplier);
                if (!self.__enableScrollX && self.__refreshHeight != null) {
                  if (scrollTop < 0) {
                    self.__refreshHidden = false;
                    self.__refreshShow();
                  } else {
                    self.__refreshHide();
                    self.__refreshHidden = true;
                  }
                  if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {
                    self.__refreshActive = true;
                    if (self.__refreshActivate) {
                      self.__refreshActivate();
                    }
                  } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {
                    self.__refreshActive = false;
                    if (self.__refreshDeactivate) {
                      self.__refreshDeactivate();
                    }
                  }
                }
              } else if (scrollTop > maxScrollTop) {
                scrollTop = maxScrollTop;
              } else {
                scrollTop = 0;
              }
            } else if (self.__refreshHeight && !self.__refreshHidden) {
              self.__refreshHide();
              self.__refreshHidden = true;
            }
          }
          if (positions.length > 60) {
            positions.splice(0, 30);
          }
          positions.push(scrollLeft, scrollTop, timeStamp);
          self.__publish(scrollLeft, scrollTop, level);
        } else {
          var minimumTrackingForScroll = self.options.locking ? 3 : 0;
          var minimumTrackingForDrag = 5;
          var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
          var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
          self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
          self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;
          positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);
          self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
          if (self.__isDragging) {
            self.__interruptedAnimation = false;
            self.__fadeScrollbars('in');
          }
        }
        self.__lastTouchLeft = currentTouchLeft;
        self.__lastTouchTop = currentTouchTop;
        self.__lastTouchMove = timeStamp;
        self.__lastScale = scale;
      },
      doTouchEnd: function(timeStamp) {
        if (timeStamp instanceof Date) {
          timeStamp = timeStamp.valueOf();
        }
        if (typeof timeStamp !== "number") {
          timeStamp = Date.now();
        }
        var self = this;
        if (!self.__isTracking) {
          return;
        }
        self.__isTracking = false;
        if (self.__isDragging) {
          self.__isDragging = false;
          if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {
            var positions = self.__positions;
            var endPos = positions.length - 1;
            var startPos = endPos;
            for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
              startPos = i;
            }
            if (startPos !== endPos) {
              var timeOffset = positions[endPos] - positions[startPos];
              var movedLeft = self.__scrollLeft - positions[startPos - 2];
              var movedTop = self.__scrollTop - positions[startPos - 1];
              self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
              self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
              var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;
              if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
                if (!self.__refreshActive) {
                  self.__startDeceleration(timeStamp);
                }
              }
            } else {
              self.__scrollingComplete();
            }
          } else if ((timeStamp - self.__lastTouchMove) > 100) {
            self.__scrollingComplete();
          }
        }
        if (!self.__isDecelerating) {
          if (self.__refreshActive && self.__refreshStart) {
            self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);
            var d = new Date();
            self.refreshStartTime = d.getTime();
            if (self.__refreshStart) {
              self.__refreshStart();
            }
            if (!ionic.Platform.isAndroid())
              self.__startDeceleration();
          } else {
            if (self.__interruptedAnimation || self.__isDragging) {
              self.__scrollingComplete();
            }
            self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);
            if (self.__refreshActive) {
              self.__refreshActive = false;
              if (self.__refreshDeactivate) {
                self.__refreshDeactivate();
              }
            }
          }
        }
        self.__positions.length = 0;
      },
      __publish: function(left, top, zoom, animate, wasResize) {
        var self = this;
        var wasAnimating = self.__isAnimating;
        if (wasAnimating) {
          zyngaCore.effect.Animate.stop(wasAnimating);
          self.__isAnimating = false;
        }
        if (animate && self.options.animating) {
          self.__scheduledLeft = left;
          self.__scheduledTop = top;
          self.__scheduledZoom = zoom;
          var oldLeft = self.__scrollLeft;
          var oldTop = self.__scrollTop;
          var oldZoom = self.__zoomLevel;
          var diffLeft = left - oldLeft;
          var diffTop = top - oldTop;
          var diffZoom = zoom - oldZoom;
          var step = function(percent, now, render) {
            if (render) {
              self.__scrollLeft = oldLeft + (diffLeft * percent);
              self.__scrollTop = oldTop + (diffTop * percent);
              self.__zoomLevel = oldZoom + (diffZoom * percent);
              if (self.__callback) {
                self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel, wasResize);
              }
            }
          };
          var verify = function(id) {
            return self.__isAnimating === id;
          };
          var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
            if (animationId === self.__isAnimating) {
              self.__isAnimating = false;
            }
            if (self.__didDecelerationComplete || wasFinished) {
              self.__scrollingComplete();
            }
            if (self.options.zooming) {
              self.__computeScrollMax();
            }
          };
          self.__isAnimating = zyngaCore.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
        } else {
          self.__scheduledLeft = self.__scrollLeft = left;
          self.__scheduledTop = self.__scrollTop = top;
          self.__scheduledZoom = self.__zoomLevel = zoom;
          if (self.__callback) {
            self.__callback(left, top, zoom, wasResize);
          }
          if (self.options.zooming) {
            self.__computeScrollMax();
          }
        }
      },
      __computeScrollMax: function(zoomLevel) {
        var self = this;
        if (zoomLevel == null) {
          zoomLevel = self.__zoomLevel;
        }
        self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
        self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);
        if (!self.__didWaitForSize && !self.__maxScrollLeft && !self.__maxScrollTop) {
          self.__didWaitForSize = true;
          self.__waitForSize();
        }
      },
      __waitForSize: function() {
        var self = this;
        clearTimeout(self.__sizerTimeout);
        var sizer = function() {
          self.resize();
          if ((self.options.scrollingX && !self.__maxScrollLeft) || (self.options.scrollingY && !self.__maxScrollTop)) {}
        };
        sizer();
        self.__sizerTimeout = setTimeout(sizer, 1000);
      },
      __startDeceleration: function(timeStamp) {
        var self = this;
        if (self.options.paging) {
          var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
          var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
          var clientWidth = self.__clientWidth;
          var clientHeight = self.__clientHeight;
          self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
          self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
          self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
          self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
        } else {
          self.__minDecelerationScrollLeft = 0;
          self.__minDecelerationScrollTop = 0;
          self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
          self.__maxDecelerationScrollTop = self.__maxScrollTop;
          if (self.__refreshActive)
            self.__minDecelerationScrollTop = self.__refreshHeight * -1;
        }
        var step = function(percent, now, render) {
          self.__stepThroughDeceleration(render);
        };
        self.__minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;
        var verify = function() {
          var shouldContinue = Math.abs(self.__decelerationVelocityX) >= self.__minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= self.__minVelocityToKeepDecelerating;
          if (!shouldContinue) {
            self.__didDecelerationComplete = true;
            if (self.options.bouncing && !self.__refreshActive) {
              self.scrollTo(Math.min(Math.max(self.__scrollLeft, 0), self.__maxScrollLeft), Math.min(Math.max(self.__scrollTop, 0), self.__maxScrollTop), self.__refreshActive);
            }
          }
          return shouldContinue;
        };
        var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
          self.__isDecelerating = false;
          if (self.__didDecelerationComplete) {
            self.__scrollingComplete();
          }
          if (self.options.paging) {
            self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
          }
        };
        self.__isDecelerating = zyngaCore.effect.Animate.start(step, verify, completed);
      },
      __stepThroughDeceleration: function(render) {
        var self = this;
        var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
        var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
        if (!self.options.bouncing) {
          var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
          if (scrollLeftFixed !== scrollLeft) {
            scrollLeft = scrollLeftFixed;
            self.__decelerationVelocityX = 0;
          }
          var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
          if (scrollTopFixed !== scrollTop) {
            scrollTop = scrollTopFixed;
            self.__decelerationVelocityY = 0;
          }
        }
        if (render) {
          self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
        } else {
          self.__scrollLeft = scrollLeft;
          self.__scrollTop = scrollTop;
        }
        if (!self.options.paging) {
          var frictionFactor = self.options.deceleration;
          self.__decelerationVelocityX *= frictionFactor;
          self.__decelerationVelocityY *= frictionFactor;
        }
        if (self.options.bouncing) {
          var scrollOutsideX = 0;
          var scrollOutsideY = 0;
          var penetrationDeceleration = self.options.penetrationDeceleration;
          var penetrationAcceleration = self.options.penetrationAcceleration;
          if (scrollLeft < self.__minDecelerationScrollLeft) {
            scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
          } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
            scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
          }
          if (scrollTop < self.__minDecelerationScrollTop) {
            scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
          } else if (scrollTop > self.__maxDecelerationScrollTop) {
            scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
          }
          if (scrollOutsideX !== 0) {
            var isHeadingOutwardsX = scrollOutsideX * self.__decelerationVelocityX <= self.__minDecelerationScrollLeft;
            if (isHeadingOutwardsX) {
              self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
            }
            var isStoppedX = Math.abs(self.__decelerationVelocityX) <= self.__minVelocityToKeepDecelerating;
            if (!isHeadingOutwardsX || isStoppedX) {
              self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
            }
          }
          if (scrollOutsideY !== 0) {
            var isHeadingOutwardsY = scrollOutsideY * self.__decelerationVelocityY <= self.__minDecelerationScrollTop;
            if (isHeadingOutwardsY) {
              self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
            }
            var isStoppedY = Math.abs(self.__decelerationVelocityY) <= self.__minVelocityToKeepDecelerating;
            if (!isHeadingOutwardsY || isStoppedY) {
              self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
            }
          }
        }
      },
      __getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x * x) + (y * y));
      },
      __getScale: function getScale(start, end) {
        var self = this;
        if (start.length >= 2 && end.length >= 2) {
          return self.__getDistance(end[0], end[1]) / self.__getDistance(start[0], start[1]);
        }
        return 1;
      }
    });
    ionic.scroll = {
      isScrolling: false,
      lastTop: 0
    };
  })(ionic);
  (function(ionic) {
    'use strict';
    ionic.views.HeaderBar = ionic.views.View.inherit({
      initialize: function(opts) {
        this.el = opts.el;
        ionic.extend(this, {alignTitle: 'center'}, opts);
        this.align();
      },
      align: function(align) {
        align || (align = this.alignTitle);
        var titleEl = this.el.querySelector('.title');
        if (!titleEl) {
          return;
        }
        var self = this;
        ionic.requestAnimationFrame(function() {
          var i,
              c,
              childSize;
          var childNodes = self.el.childNodes;
          var leftWidth = 0;
          var rightWidth = 0;
          var isCountingRightWidth = false;
          for (i = 0; i < childNodes.length; i++) {
            c = childNodes[i];
            if (c.tagName && c.tagName.toLowerCase() == 'h1') {
              isCountingRightWidth = true;
              continue;
            }
            childSize = null;
            if (c.nodeType == 3) {
              var bounds = ionic.DomUtil.getTextBounds(c);
              if (bounds) {
                childSize = bounds.width;
              }
            } else if (c.nodeType == 1) {
              childSize = c.offsetWidth;
            }
            if (childSize) {
              if (isCountingRightWidth) {
                rightWidth += childSize;
              } else {
                leftWidth += childSize;
              }
            }
          }
          var margin = Math.max(leftWidth, rightWidth) + 10;
          titleEl.style.left = titleEl.style.right = '';
          if (align == 'center') {
            if (margin > 10) {
              titleEl.style.left = margin + 'px';
              titleEl.style.right = margin + 'px';
            }
            if (titleEl.offsetWidth < titleEl.scrollWidth) {
              if (rightWidth > 0) {
                titleEl.style.right = (rightWidth + 5) + 'px';
              }
            }
          } else if (align == 'left') {
            titleEl.classList.add('title-left');
            if (leftWidth > 0) {
              titleEl.style.left = (leftWidth + 15) + 'px';
            }
          } else if (align == 'right') {
            titleEl.classList.add('title-right');
            if (rightWidth > 0) {
              titleEl.style.right = (rightWidth + 15) + 'px';
            }
          }
        });
      }
    });
  })(ionic);
  (function(ionic) {
    'use strict';
    var ITEM_CLASS = 'item';
    var ITEM_CONTENT_CLASS = 'item-content';
    var ITEM_SLIDING_CLASS = 'item-sliding';
    var ITEM_OPTIONS_CLASS = 'item-options';
    var ITEM_PLACEHOLDER_CLASS = 'item-placeholder';
    var ITEM_REORDERING_CLASS = 'item-reordering';
    var ITEM_REORDER_BTN_CLASS = 'item-reorder';
    var DragOp = function() {};
    DragOp.prototype = {
      start: function(e) {},
      drag: function(e) {},
      end: function(e) {},
      isSameItem: function(item) {
        return false;
      }
    };
    var SlideDrag = function(opts) {
      this.dragThresholdX = opts.dragThresholdX || 10;
      this.el = opts.el;
      this.canSwipe = opts.canSwipe;
    };
    SlideDrag.prototype = new DragOp();
    SlideDrag.prototype.start = function(e) {
      var content,
          buttons,
          offsetX,
          buttonsWidth;
      if (!this.canSwipe()) {
        return;
      }
      if (e.target.classList.contains(ITEM_CONTENT_CLASS)) {
        content = e.target;
      } else if (e.target.classList.contains(ITEM_CLASS)) {
        content = e.target.querySelector('.' + ITEM_CONTENT_CLASS);
      } else {
        content = ionic.DomUtil.getParentWithClass(e.target, ITEM_CONTENT_CLASS);
      }
      if (!content) {
        return;
      }
      content.classList.remove(ITEM_SLIDING_CLASS);
      offsetX = parseFloat(content.style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[0]) || 0;
      buttons = content.parentNode.querySelector('.' + ITEM_OPTIONS_CLASS);
      if (!buttons) {
        return;
      }
      buttons.classList.remove('invisible');
      buttonsWidth = buttons.offsetWidth;
      this._currentDrag = {
        buttons: buttons,
        buttonsWidth: buttonsWidth,
        content: content,
        startOffsetX: offsetX
      };
    };
    SlideDrag.prototype.isSameItem = function(op) {
      if (op._lastDrag && this._currentDrag) {
        return this._currentDrag.content == op._lastDrag.content;
      }
      return false;
    };
    SlideDrag.prototype.clean = function(e) {
      var lastDrag = this._lastDrag;
      if (!lastDrag)
        return;
      lastDrag.content.style[ionic.CSS.TRANSITION] = '';
      lastDrag.content.style[ionic.CSS.TRANSFORM] = '';
      ionic.requestAnimationFrame(function() {
        setTimeout(function() {
          lastDrag.buttons && lastDrag.buttons.classList.add('invisible');
        }, 250);
      });
    };
    SlideDrag.prototype.drag = ionic.animationFrameThrottle(function(e) {
      var buttonsWidth;
      if (!this._currentDrag) {
        return;
      }
      if (!this._isDragging && ((Math.abs(e.gesture.deltaX) > this.dragThresholdX) || (Math.abs(this._currentDrag.startOffsetX) > 0))) {
        this._isDragging = true;
      }
      if (this._isDragging) {
        buttonsWidth = this._currentDrag.buttonsWidth;
        var newX = Math.min(0, this._currentDrag.startOffsetX + e.gesture.deltaX);
        if (newX < -buttonsWidth) {
          newX = Math.min(-buttonsWidth, -buttonsWidth + (((e.gesture.deltaX + buttonsWidth) * 0.4)));
        }
        this._currentDrag.content.style[ionic.CSS.TRANSFORM] = 'translate3d(' + newX + 'px, 0, 0)';
        this._currentDrag.content.style[ionic.CSS.TRANSITION] = 'none';
      }
    });
    SlideDrag.prototype.end = function(e, doneCallback) {
      var _this = this;
      if (!this._currentDrag) {
        doneCallback && doneCallback();
        return;
      }
      var restingPoint = -this._currentDrag.buttonsWidth;
      if (e.gesture.deltaX > -(this._currentDrag.buttonsWidth / 2)) {
        if (e.gesture.direction == "left" && Math.abs(e.gesture.velocityX) < 0.3) {
          restingPoint = 0;
        } else if (e.gesture.direction == "right") {
          restingPoint = 0;
        }
      }
      ionic.requestAnimationFrame(function() {
        if (restingPoint === 0) {
          _this._currentDrag.content.style[ionic.CSS.TRANSFORM] = '';
          var buttons = _this._currentDrag.buttons;
          setTimeout(function() {
            buttons && buttons.classList.add('invisible');
          }, 250);
        } else {
          _this._currentDrag.content.style[ionic.CSS.TRANSFORM] = 'translate3d(' + restingPoint + 'px, 0, 0)';
        }
        _this._currentDrag.content.style[ionic.CSS.TRANSITION] = '';
        _this._lastDrag = _this._currentDrag;
        _this._currentDrag = null;
        doneCallback && doneCallback();
      });
    };
    var ReorderDrag = function(opts) {
      this.dragThresholdY = opts.dragThresholdY || 0;
      this.onReorder = opts.onReorder;
      this.listEl = opts.listEl;
      this.el = opts.el;
      this.scrollEl = opts.scrollEl;
      this.scrollView = opts.scrollView;
      this.listElTrueTop = 0;
      if (this.listEl.offsetParent) {
        var obj = this.listEl;
        do {
          this.listElTrueTop += obj.offsetTop;
          obj = obj.offsetParent;
        } while (obj);
      }
    };
    ReorderDrag.prototype = new DragOp();
    ReorderDrag.prototype._moveElement = function(e) {
      var y = e.gesture.center.pageY + this.scrollView.getValues().top - (this._currentDrag.elementHeight / 2) - this.listElTrueTop;
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + y + 'px, 0)';
    };
    ReorderDrag.prototype.start = function(e) {
      var content;
      var startIndex = ionic.DomUtil.getChildIndex(this.el, this.el.nodeName.toLowerCase());
      var elementHeight = this.el.scrollHeight;
      var placeholder = this.el.cloneNode(true);
      placeholder.classList.add(ITEM_PLACEHOLDER_CLASS);
      this.el.parentNode.insertBefore(placeholder, this.el);
      this.el.classList.add(ITEM_REORDERING_CLASS);
      this._currentDrag = {
        elementHeight: elementHeight,
        startIndex: startIndex,
        placeholder: placeholder,
        scrollHeight: scroll,
        list: placeholder.parentNode
      };
      this._moveElement(e);
    };
    ReorderDrag.prototype.drag = ionic.animationFrameThrottle(function(e) {
      var self = this;
      if (!this._currentDrag) {
        return;
      }
      var scrollY = 0;
      var pageY = e.gesture.center.pageY;
      var offset = this.listElTrueTop;
      if (this.scrollView) {
        var container = this.scrollView.__container;
        scrollY = this.scrollView.getValues().top;
        var containerTop = container.offsetTop;
        var pixelsPastTop = containerTop - pageY + this._currentDrag.elementHeight / 2;
        var pixelsPastBottom = pageY + this._currentDrag.elementHeight / 2 - containerTop - container.offsetHeight;
        if (e.gesture.deltaY < 0 && pixelsPastTop > 0 && scrollY > 0) {
          this.scrollView.scrollBy(null, -pixelsPastTop);
          ionic.requestAnimationFrame(function() {
            self.drag(e);
          });
        }
        if (e.gesture.deltaY > 0 && pixelsPastBottom > 0) {
          if (scrollY < this.scrollView.getScrollMax().top) {
            this.scrollView.scrollBy(null, pixelsPastBottom);
            ionic.requestAnimationFrame(function() {
              self.drag(e);
            });
          }
        }
      }
      if (!this._isDragging && Math.abs(e.gesture.deltaY) > this.dragThresholdY) {
        this._isDragging = true;
      }
      if (this._isDragging) {
        this._moveElement(e);
        this._currentDrag.currentY = scrollY + pageY - offset;
      }
    });
    ReorderDrag.prototype._getReorderIndex = function() {
      var self = this;
      var placeholder = this._currentDrag.placeholder;
      var siblings = Array.prototype.slice.call(this._currentDrag.placeholder.parentNode.children).filter(function(el) {
        return el.nodeName === self.el.nodeName && el !== self.el;
      });
      var dragOffsetTop = this._currentDrag.currentY;
      var el;
      for (var i = 0,
          len = siblings.length; i < len; i++) {
        el = siblings[i];
        if (i === len - 1) {
          if (dragOffsetTop > el.offsetTop) {
            return i;
          }
        } else if (i === 0) {
          if (dragOffsetTop < el.offsetTop + el.offsetHeight) {
            return i;
          }
        } else if (dragOffsetTop > el.offsetTop - el.offsetHeight / 2 && dragOffsetTop < el.offsetTop + el.offsetHeight) {
          return i;
        }
      }
      return this._currentDrag.startIndex;
    };
    ReorderDrag.prototype.end = function(e, doneCallback) {
      if (!this._currentDrag) {
        doneCallback && doneCallback();
        return;
      }
      var placeholder = this._currentDrag.placeholder;
      var finalIndex = this._getReorderIndex();
      this.el.classList.remove(ITEM_REORDERING_CLASS);
      this.el.style[ionic.CSS.TRANSFORM] = '';
      placeholder.parentNode.insertBefore(this.el, placeholder);
      placeholder.parentNode.removeChild(placeholder);
      this.onReorder && this.onReorder(this.el, this._currentDrag.startIndex, finalIndex);
      this._currentDrag = null;
      doneCallback && doneCallback();
    };
    ionic.views.ListView = ionic.views.View.inherit({
      initialize: function(opts) {
        var _this = this;
        opts = ionic.extend({
          onReorder: function(el, oldIndex, newIndex) {},
          virtualRemoveThreshold: -200,
          virtualAddThreshold: 200,
          canSwipe: function() {
            return true;
          }
        }, opts);
        ionic.extend(this, opts);
        if (!this.itemHeight && this.listEl) {
          this.itemHeight = this.listEl.children[0] && parseInt(this.listEl.children[0].style.height, 10);
        }
        this.onRefresh = opts.onRefresh || function() {};
        this.onRefreshOpening = opts.onRefreshOpening || function() {};
        this.onRefreshHolding = opts.onRefreshHolding || function() {};
        window.ionic.onGesture('release', function(e) {
          _this._handleEndDrag(e);
        }, this.el);
        window.ionic.onGesture('drag', function(e) {
          _this._handleDrag(e);
        }, this.el);
        this._initDrag();
      },
      stopRefreshing: function() {
        var refresher = this.el.querySelector('.list-refresher');
        refresher.style.height = '0px';
      },
      didScroll: function(e) {
        if (this.isVirtual) {
          var itemHeight = this.itemHeight;
          var totalItems = this.listEl.children.length;
          var scrollHeight = e.target.scrollHeight;
          var viewportHeight = this.el.parentNode.offsetHeight;
          var scrollTop = e.scrollTop;
          var highWater = Math.max(0, e.scrollTop + this.virtualRemoveThreshold);
          var lowWater = Math.min(scrollHeight, Math.abs(e.scrollTop) + viewportHeight + this.virtualAddThreshold);
          var itemsPerViewport = Math.floor((lowWater - highWater) / itemHeight);
          var first = parseInt(Math.abs(highWater / itemHeight), 10);
          var last = parseInt(Math.abs(lowWater / itemHeight), 10);
          this._virtualItemsToRemove = Array.prototype.slice.call(this.listEl.children, 0, first);
          var nodes = Array.prototype.slice.call(this.listEl.children, first, first + itemsPerViewport);
          this.renderViewport && this.renderViewport(highWater, lowWater, first, last);
        }
      },
      didStopScrolling: function(e) {
        if (this.isVirtual) {
          for (var i = 0; i < this._virtualItemsToRemove.length; i++) {
            var el = this._virtualItemsToRemove[i];
            this.didHideItem && this.didHideItem(i);
          }
        }
      },
      clearDragEffects: function() {
        if (this._lastDragOp) {
          this._lastDragOp.clean && this._lastDragOp.clean();
          this._lastDragOp = null;
        }
      },
      _initDrag: function() {
        this._lastDragOp = this._dragOp;
        this._dragOp = null;
      },
      _getItem: function(target) {
        while (target) {
          if (target.classList && target.classList.contains(ITEM_CLASS)) {
            return target;
          }
          target = target.parentNode;
        }
        return null;
      },
      _startDrag: function(e) {
        var _this = this;
        var didStart = false;
        this._isDragging = false;
        var lastDragOp = this._lastDragOp;
        var item;
        if (ionic.DomUtil.getParentOrSelfWithClass(e.target, ITEM_REORDER_BTN_CLASS) && (e.gesture.direction == 'up' || e.gesture.direction == 'down')) {
          item = this._getItem(e.target);
          if (item) {
            this._dragOp = new ReorderDrag({
              listEl: this.el,
              el: item,
              scrollEl: this.scrollEl,
              scrollView: this.scrollView,
              onReorder: function(el, start, end) {
                _this.onReorder && _this.onReorder(el, start, end);
              }
            });
            this._dragOp.start(e);
            e.preventDefault();
          }
        } else if (!this._didDragUpOrDown && (e.gesture.direction == 'left' || e.gesture.direction == 'right') && Math.abs(e.gesture.deltaX) > 5) {
          item = this._getItem(e.target);
          if (item && item.querySelector('.item-options')) {
            this._dragOp = new SlideDrag({
              el: this.el,
              canSwipe: this.canSwipe
            });
            this._dragOp.start(e);
            e.preventDefault();
          }
        }
        if (lastDragOp && this._dragOp && !this._dragOp.isSameItem(lastDragOp) && e.defaultPrevented) {
          lastDragOp.clean && lastDragOp.clean();
        }
      },
      _handleEndDrag: function(e) {
        var _this = this;
        this._didDragUpOrDown = false;
        if (!this._dragOp) {
          return;
        }
        this._dragOp.end(e, function() {
          _this._initDrag();
        });
      },
      _handleDrag: function(e) {
        var _this = this,
            content,
            buttons;
        if (Math.abs(e.gesture.deltaY) > 5) {
          this._didDragUpOrDown = true;
        }
        if (!this.isDragging && !this._dragOp) {
          this._startDrag(e);
        }
        if (!this._dragOp) {
          return;
        }
        e.gesture.srcEvent.preventDefault();
        this._dragOp.drag(e);
      }
    });
  })(ionic);
  (function(ionic) {
    'use strict';
    ionic.views.Modal = ionic.views.View.inherit({
      initialize: function(opts) {
        opts = ionic.extend({
          focusFirstInput: false,
          unfocusOnHide: true,
          focusFirstDelay: 600,
          backdropClickToClose: true,
          hardwareBackButtonClose: true
        }, opts);
        ionic.extend(this, opts);
        this.el = opts.el;
      },
      show: function() {
        var self = this;
        if (self.focusFirstInput) {
          window.setTimeout(function() {
            var input = self.el.querySelector('input, textarea');
            input && input.focus && input.focus();
          }, self.focusFirstDelay);
        }
      },
      hide: function() {
        if (this.unfocusOnHide) {
          var inputs = this.el.querySelectorAll('input, textarea');
          window.setTimeout(function() {
            for (var i = 0; i < inputs.length; i++) {
              inputs[i].blur && inputs[i].blur();
            }
          });
        }
      }
    });
  })(ionic);
  (function(ionic) {
    'use strict';
    ionic.views.SideMenu = ionic.views.View.inherit({
      initialize: function(opts) {
        this.el = opts.el;
        this.isEnabled = (typeof opts.isEnabled === 'undefined') ? true : opts.isEnabled;
        this.setWidth(opts.width);
      },
      getFullWidth: function() {
        return this.width;
      },
      setWidth: function(width) {
        this.width = width;
        this.el.style.width = width + 'px';
      },
      setIsEnabled: function(isEnabled) {
        this.isEnabled = isEnabled;
      },
      bringUp: function() {
        if (this.el.style.zIndex !== '0') {
          this.el.style.zIndex = '0';
        }
      },
      pushDown: function() {
        if (this.el.style.zIndex !== '-1') {
          this.el.style.zIndex = '-1';
        }
      }
    });
    ionic.views.SideMenuContent = ionic.views.View.inherit({
      initialize: function(opts) {
        ionic.extend(this, {
          animationClass: 'menu-animated',
          onDrag: function(e) {},
          onEndDrag: function(e) {}
        }, opts);
        ionic.onGesture('drag', ionic.proxy(this._onDrag, this), this.el);
        ionic.onGesture('release', ionic.proxy(this._onEndDrag, this), this.el);
      },
      _onDrag: function(e) {
        this.onDrag && this.onDrag(e);
      },
      _onEndDrag: function(e) {
        this.onEndDrag && this.onEndDrag(e);
      },
      disableAnimation: function() {
        this.el.classList.remove(this.animationClass);
      },
      enableAnimation: function() {
        this.el.classList.add(this.animationClass);
      },
      getTranslateX: function() {
        return parseFloat(this.el.style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[0]);
      },
      setTranslateX: ionic.animationFrameThrottle(function(x) {
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px, 0, 0)';
      })
    });
  })(ionic);
  (function(ionic) {
    'use strict';
    ionic.views.Slider = ionic.views.View.inherit({initialize: function(options) {
        var slider = this;
        var noop = function() {};
        var offloadFn = function(fn) {
          setTimeout(fn || noop, 0);
        };
        var browser = {
          addEventListener: !!window.addEventListener,
          touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
          transitions: (function(temp) {
            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
            for (var i in props)
              if (temp.style[props[i]] !== undefined)
                return true;
            return false;
          })(document.createElement('swipe'))
        };
        var container = options.el;
        if (!container)
          return;
        var element = container.children[0];
        var slides,
            slidePos,
            width,
            length;
        options = options || {};
        var index = parseInt(options.startSlide, 10) || 0;
        var speed = options.speed || 300;
        options.continuous = options.continuous !== undefined ? options.continuous : true;
        function setup() {
          slides = element.children;
          length = slides.length;
          if (slides.length < 2)
            options.continuous = false;
          if (browser.transitions && options.continuous && slides.length < 3) {
            element.appendChild(slides[0].cloneNode(true));
            element.appendChild(element.children[1].cloneNode(true));
            slides = element.children;
          }
          slidePos = new Array(slides.length);
          width = container.offsetWidth || container.getBoundingClientRect().width;
          element.style.width = (slides.length * width) + 'px';
          var pos = slides.length;
          while (pos--) {
            var slide = slides[pos];
            slide.style.width = width + 'px';
            slide.setAttribute('data-index', pos);
            if (browser.transitions) {
              slide.style.left = (pos * -width) + 'px';
              move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
            }
          }
          if (options.continuous && browser.transitions) {
            move(circle(index - 1), -width, 0);
            move(circle(index + 1), width, 0);
          }
          if (!browser.transitions)
            element.style.left = (index * -width) + 'px';
          container.style.visibility = 'visible';
          options.slidesChanged && options.slidesChanged();
        }
        function prev() {
          if (options.continuous)
            slide(index - 1);
          else if (index)
            slide(index - 1);
        }
        function next() {
          if (options.continuous)
            slide(index + 1);
          else if (index < slides.length - 1)
            slide(index + 1);
        }
        function circle(index) {
          return (slides.length + (index % slides.length)) % slides.length;
        }
        function slide(to, slideSpeed) {
          if (index == to)
            return;
          if (browser.transitions) {
            var direction = Math.abs(index - to) / (index - to);
            if (options.continuous) {
              var natural_direction = direction;
              direction = -slidePos[circle(to)] / width;
              if (direction !== natural_direction)
                to = -direction * slides.length + to;
            }
            var diff = Math.abs(index - to) - 1;
            while (diff--)
              move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
            to = circle(to);
            move(index, width * direction, slideSpeed || speed);
            move(to, 0, slideSpeed || speed);
            if (options.continuous)
              move(circle(to - direction), -(width * direction), 0);
          } else {
            to = circle(to);
            animate(index * -width, to * -width, slideSpeed || speed);
          }
          index = to;
          offloadFn(options.callback && options.callback(index, slides[index]));
        }
        function move(index, dist, speed) {
          translate(index, dist, speed);
          slidePos[index] = dist;
        }
        function translate(index, dist, speed) {
          var slide = slides[index];
          var style = slide && slide.style;
          if (!style)
            return;
          style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';
          style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
          style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
        }
        function animate(from, to, speed) {
          if (!speed) {
            element.style.left = to + 'px';
            return;
          }
          var start = +new Date();
          var timer = setInterval(function() {
            var timeElap = +new Date() - start;
            if (timeElap > speed) {
              element.style.left = to + 'px';
              if (delay)
                begin();
              options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
              clearInterval(timer);
              return;
            }
            element.style.left = (((to - from) * (Math.floor((timeElap / speed) * 100) / 100)) + from) + 'px';
          }, 4);
        }
        var delay = options.auto || 0;
        var interval;
        function begin() {
          interval = setTimeout(next, delay);
        }
        function stop() {
          delay = options.auto || 0;
          clearTimeout(interval);
        }
        var start = {};
        var delta = {};
        var isScrolling;
        var events = {
          handleEvent: function(event) {
            if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove') {
              event.touches = [{
                pageX: event.pageX,
                pageY: event.pageY
              }];
            }
            switch (event.type) {
              case 'mousedown':
                this.start(event);
                break;
              case 'touchstart':
                this.start(event);
                break;
              case 'touchmove':
                this.touchmove(event);
                break;
              case 'mousemove':
                this.touchmove(event);
                break;
              case 'touchend':
                offloadFn(this.end(event));
                break;
              case 'mouseup':
                offloadFn(this.end(event));
                break;
              case 'webkitTransitionEnd':
              case 'msTransitionEnd':
              case 'oTransitionEnd':
              case 'otransitionend':
              case 'transitionend':
                offloadFn(this.transitionEnd(event));
                break;
              case 'resize':
                offloadFn(setup);
                break;
            }
            if (options.stopPropagation)
              event.stopPropagation();
          },
          start: function(event) {
            var touches = event.touches[0];
            start = {
              x: touches.pageX,
              y: touches.pageY,
              time: +new Date()
            };
            isScrolling = undefined;
            delta = {};
            if (browser.touch) {
              element.addEventListener('touchmove', this, false);
              element.addEventListener('touchend', this, false);
            } else {
              element.addEventListener('mousemove', this, false);
              element.addEventListener('mouseup', this, false);
              document.addEventListener('mouseup', this, false);
            }
          },
          touchmove: function(event) {
            if (event.touches.length > 1 || event.scale && event.scale !== 1 || slider.slideIsDisabled) {
              return;
            }
            if (options.disableScroll)
              event.preventDefault();
            var touches = event.touches[0];
            delta = {
              x: touches.pageX - start.x,
              y: touches.pageY - start.y
            };
            if (typeof isScrolling == 'undefined') {
              isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
            }
            if (!isScrolling) {
              event.preventDefault();
              stop();
              if (options.continuous) {
                translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
                translate(index, delta.x + slidePos[index], 0);
                translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
              } else {
                delta.x = delta.x / ((!index && delta.x > 0 || index == slides.length - 1 && delta.x < 0) ? (Math.abs(delta.x) / width + 1) : 1);
                translate(index - 1, delta.x + slidePos[index - 1], 0);
                translate(index, delta.x + slidePos[index], 0);
                translate(index + 1, delta.x + slidePos[index + 1], 0);
              }
            }
          },
          end: function(event) {
            var duration = +new Date() - start.time;
            var isValidSlide = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width / 2;
            var isPastBounds = (!index && delta.x > 0) || (index == slides.length - 1 && delta.x < 0);
            if (options.continuous)
              isPastBounds = false;
            var direction = delta.x < 0;
            if (!isScrolling) {
              if (isValidSlide && !isPastBounds) {
                if (direction) {
                  if (options.continuous) {
                    move(circle(index - 1), -width, 0);
                    move(circle(index + 2), width, 0);
                  } else {
                    move(index - 1, -width, 0);
                  }
                  move(index, slidePos[index] - width, speed);
                  move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
                  index = circle(index + 1);
                } else {
                  if (options.continuous) {
                    move(circle(index + 1), width, 0);
                    move(circle(index - 2), -width, 0);
                  } else {
                    move(index + 1, width, 0);
                  }
                  move(index, slidePos[index] + width, speed);
                  move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
                  index = circle(index - 1);
                }
                options.callback && options.callback(index, slides[index]);
              } else {
                if (options.continuous) {
                  move(circle(index - 1), -width, speed);
                  move(index, 0, speed);
                  move(circle(index + 1), width, speed);
                } else {
                  move(index - 1, -width, speed);
                  move(index, 0, speed);
                  move(index + 1, width, speed);
                }
              }
            }
            if (browser.touch) {
              element.removeEventListener('touchmove', events, false);
              element.removeEventListener('touchend', events, false);
            } else {
              element.removeEventListener('mousemove', events, false);
              element.removeEventListener('mouseup', events, false);
              document.removeEventListener('mouseup', events, false);
            }
          },
          transitionEnd: function(event) {
            if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
              if (delay)
                begin();
              options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
            }
          }
        };
        this.update = function() {
          setTimeout(setup);
        };
        this.setup = function() {
          setup();
        };
        this.enableSlide = function(shouldEnable) {
          if (arguments.length) {
            this.slideIsDisabled = !shouldEnable;
          }
          return !this.slideIsDisabled;
        }, this.slide = function(to, speed) {
          stop();
          slide(to, speed);
        };
        this.prev = this.previous = function() {
          stop();
          prev();
        };
        this.next = function() {
          stop();
          next();
        };
        this.stop = function() {
          stop();
        };
        this.start = function() {
          begin();
        };
        this.currentIndex = function() {
          return index;
        };
        this.slidesCount = function() {
          return length;
        };
        this.kill = function() {
          stop();
          element.style.width = '';
          element.style.left = '';
          var pos = slides.length;
          while (pos--) {
            var slide = slides[pos];
            slide.style.width = '';
            slide.style.left = '';
            if (browser.transitions)
              translate(pos, 0, 0);
          }
          if (browser.addEventListener) {
            element.removeEventListener('touchstart', events, false);
            element.removeEventListener('webkitTransitionEnd', events, false);
            element.removeEventListener('msTransitionEnd', events, false);
            element.removeEventListener('oTransitionEnd', events, false);
            element.removeEventListener('otransitionend', events, false);
            element.removeEventListener('transitionend', events, false);
            window.removeEventListener('resize', events, false);
          } else {
            window.onresize = null;
          }
        };
        this.load = function() {
          setup();
          if (delay)
            begin();
          if (browser.addEventListener) {
            if (browser.touch) {
              element.addEventListener('touchstart', events, false);
            } else {
              element.addEventListener('mousedown', events, false);
            }
            if (browser.transitions) {
              element.addEventListener('webkitTransitionEnd', events, false);
              element.addEventListener('msTransitionEnd', events, false);
              element.addEventListener('oTransitionEnd', events, false);
              element.addEventListener('otransitionend', events, false);
              element.addEventListener('transitionend', events, false);
            }
            window.addEventListener('resize', events, false);
          } else {
            window.onresize = function() {
              setup();
            };
          }
        };
      }});
  })(ionic);
  (function(ionic) {
    'use strict';
    ionic.views.Toggle = ionic.views.View.inherit({
      initialize: function(opts) {
        var self = this;
        this.el = opts.el;
        this.checkbox = opts.checkbox;
        this.track = opts.track;
        this.handle = opts.handle;
        this.openPercent = -1;
        this.onChange = opts.onChange || function() {};
        this.triggerThreshold = opts.triggerThreshold || 20;
        this.dragStartHandler = function(e) {
          self.dragStart(e);
        };
        this.dragHandler = function(e) {
          self.drag(e);
        };
        this.holdHandler = function(e) {
          self.hold(e);
        };
        this.releaseHandler = function(e) {
          self.release(e);
        };
        this.dragStartGesture = ionic.onGesture('dragstart', this.dragStartHandler, this.el);
        this.dragGesture = ionic.onGesture('drag', this.dragHandler, this.el);
        this.dragHoldGesture = ionic.onGesture('hold', this.holdHandler, this.el);
        this.dragReleaseGesture = ionic.onGesture('release', this.releaseHandler, this.el);
      },
      destroy: function() {
        ionic.offGesture(this.dragStartGesture, 'dragstart', this.dragStartGesture);
        ionic.offGesture(this.dragGesture, 'drag', this.dragGesture);
        ionic.offGesture(this.dragHoldGesture, 'hold', this.holdHandler);
        ionic.offGesture(this.dragReleaseGesture, 'release', this.releaseHandler);
      },
      tap: function(e) {
        if (this.el.getAttribute('disabled') !== 'disabled') {
          this.val(!this.checkbox.checked);
        }
      },
      dragStart: function(e) {
        if (this.checkbox.disabled)
          return;
        this._dragInfo = {
          width: this.el.offsetWidth,
          left: this.el.offsetLeft,
          right: this.el.offsetLeft + this.el.offsetWidth,
          triggerX: this.el.offsetWidth / 2,
          initialState: this.checkbox.checked
        };
        e.gesture.srcEvent.preventDefault();
        this.hold(e);
      },
      drag: function(e) {
        var self = this;
        if (!this._dragInfo) {
          return;
        }
        e.gesture.srcEvent.preventDefault();
        ionic.requestAnimationFrame(function(amount) {
          if (!self._dragInfo) {
            return;
          }
          var slidePageLeft = self.track.offsetLeft + (self.handle.offsetWidth / 2);
          var slidePageRight = self.track.offsetLeft + self.track.offsetWidth - (self.handle.offsetWidth / 2);
          var dx = e.gesture.deltaX;
          var px = e.gesture.touches[0].pageX - self._dragInfo.left;
          var mx = self._dragInfo.width - self.triggerThreshold;
          if (self._dragInfo.initialState) {
            if (px < self.triggerThreshold) {
              self.setOpenPercent(0);
            } else if (px > self._dragInfo.triggerX) {
              self.setOpenPercent(100);
            }
          } else {
            if (px < self._dragInfo.triggerX) {
              self.setOpenPercent(0);
            } else if (px > mx) {
              self.setOpenPercent(100);
            }
          }
        });
      },
      endDrag: function(e) {
        this._dragInfo = null;
      },
      hold: function(e) {
        this.el.classList.add('dragging');
      },
      release: function(e) {
        this.el.classList.remove('dragging');
        this.endDrag(e);
      },
      setOpenPercent: function(openPercent) {
        if (this.openPercent < 0 || (openPercent < (this.openPercent - 3) || openPercent > (this.openPercent + 3))) {
          this.openPercent = openPercent;
          if (openPercent === 0) {
            this.val(false);
          } else if (openPercent === 100) {
            this.val(true);
          } else {
            var openPixel = Math.round((openPercent / 100) * this.track.offsetWidth - (this.handle.offsetWidth));
            openPixel = (openPixel < 1 ? 0 : openPixel);
            this.handle.style[ionic.CSS.TRANSFORM] = 'translate3d(' + openPixel + 'px,0,0)';
          }
        }
      },
      val: function(value) {
        if (value === true || value === false) {
          if (this.handle.style[ionic.CSS.TRANSFORM] !== "") {
            this.handle.style[ionic.CSS.TRANSFORM] = "";
          }
          this.checkbox.checked = value;
          this.openPercent = (value ? 100 : 0);
          this.onChange && this.onChange();
        }
        return this.checkbox.checked;
      }
    });
  })(ionic);
})();



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:angular/bower-angular@1.3.4/angular.min", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
"format global";
"exports angular";
(function(U, V, u) {
  'use strict';
  function z(b) {
    return function() {
      var a = arguments[0],
          c;
      c = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.3.4/" + (b ? b + "/" : "") + a;
      for (a = 1; a < arguments.length; a++) {
        c = c + (1 == a ? "?" : "&") + "p" + (a - 1) + "=";
        var d = encodeURIComponent,
            e;
        e = arguments[a];
        e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e;
        c += d(e);
      }
      return Error(c);
    };
  }
  function Ra(b) {
    if (null == b || Sa(b))
      return !1;
    var a = b.length;
    return b.nodeType === na && a ? !0 : I(b) || D(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b;
  }
  function r(b, a, c) {
    var d,
        e;
    if (b)
      if (F(b))
        for (d in b)
          "prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d, b);
      else if (D(b) || Ra(b)) {
        var f = "object" !== typeof b;
        d = 0;
        for (e = b.length; d < e; d++)
          (f || d in b) && a.call(c, b[d], d, b);
      } else if (b.forEach && b.forEach !== r)
        b.forEach(a, c, b);
      else
        for (d in b)
          b.hasOwnProperty(d) && a.call(c, b[d], d, b);
    return b;
  }
  function Bd(b, a, c) {
    for (var d = Object.keys(b).sort(),
        e = 0; e < d.length; e++)
      a.call(c, b[d[e]], d[e]);
    return d;
  }
  function kc(b) {
    return function(a, c) {
      b(c, a);
    };
  }
  function Cd() {
    return ++kb;
  }
  function lc(b, a) {
    a ? b.$$hashKey = a : delete b.$$hashKey;
  }
  function C(b) {
    for (var a = b.$$hashKey,
        c = 1,
        d = arguments.length; c < d; c++) {
      var e = arguments[c];
      if (e)
        for (var f = Object.keys(e),
            g = 0,
            h = f.length; g < h; g++) {
          var k = f[g];
          b[k] = e[k];
        }
    }
    lc(b, a);
    return b;
  }
  function $(b) {
    return parseInt(b, 10);
  }
  function x() {}
  function oa(b) {
    return b;
  }
  function ca(b) {
    return function() {
      return b;
    };
  }
  function G(b) {
    return "undefined" === typeof b;
  }
  function y(b) {
    return "undefined" !== typeof b;
  }
  function K(b) {
    return null !== b && "object" === typeof b;
  }
  function I(b) {
    return "string" === typeof b;
  }
  function X(b) {
    return "number" === typeof b;
  }
  function fa(b) {
    return "[object Date]" === Ja.call(b);
  }
  function F(b) {
    return "function" === typeof b;
  }
  function lb(b) {
    return "[object RegExp]" === Ja.call(b);
  }
  function Sa(b) {
    return b && b.window === b;
  }
  function Ta(b) {
    return b && b.$evalAsync && b.$watch;
  }
  function Ua(b) {
    return "boolean" === typeof b;
  }
  function mc(b) {
    return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
  }
  function Dd(b) {
    var a = {};
    b = b.split(",");
    var c;
    for (c = 0; c < b.length; c++)
      a[b[c]] = !0;
    return a;
  }
  function ta(b) {
    return R(b.nodeName || b[0] && b[0].nodeName);
  }
  function Va(b, a) {
    var c = b.indexOf(a);
    0 <= c && b.splice(c, 1);
    return a;
  }
  function Ca(b, a, c, d) {
    if (Sa(b) || Ta(b))
      throw Wa("cpws");
    if (a) {
      if (b === a)
        throw Wa("cpi");
      c = c || [];
      d = d || [];
      if (K(b)) {
        var e = c.indexOf(b);
        if (-1 !== e)
          return d[e];
        c.push(b);
        d.push(a);
      }
      if (D(b))
        for (var f = a.length = 0; f < b.length; f++)
          e = Ca(b[f], null, c, d), K(b[f]) && (c.push(b[f]), d.push(e)), a.push(e);
      else {
        var g = a.$$hashKey;
        D(a) ? a.length = 0 : r(a, function(b, c) {
          delete a[c];
        });
        for (f in b)
          b.hasOwnProperty(f) && (e = Ca(b[f], null, c, d), K(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e);
        lc(a, g);
      }
    } else if (a = b)
      D(b) ? a = Ca(b, [], c, d) : fa(b) ? a = new Date(b.getTime()) : lb(b) ? (a = new RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), a.lastIndex = b.lastIndex) : K(b) && (e = Object.create(Object.getPrototypeOf(b)), a = Ca(b, e, c, d));
    return a;
  }
  function ua(b, a) {
    if (D(b)) {
      a = a || [];
      for (var c = 0,
          d = b.length; c < d; c++)
        a[c] = b[c];
    } else if (K(b))
      for (c in a = a || {}, b)
        if ("$" !== c.charAt(0) || "$" !== c.charAt(1))
          a[c] = b[c];
    return a || b;
  }
  function pa(b, a) {
    if (b === a)
      return !0;
    if (null === b || null === a)
      return !1;
    if (b !== b && a !== a)
      return !0;
    var c = typeof b,
        d;
    if (c == typeof a && "object" == c)
      if (D(b)) {
        if (!D(a))
          return !1;
        if ((c = b.length) == a.length) {
          for (d = 0; d < c; d++)
            if (!pa(b[d], a[d]))
              return !1;
          return !0;
        }
      } else {
        if (fa(b))
          return fa(a) ? pa(b.getTime(), a.getTime()) : !1;
        if (lb(b) && lb(a))
          return b.toString() == a.toString();
        if (Ta(b) || Ta(a) || Sa(b) || Sa(a) || D(a))
          return !1;
        c = {};
        for (d in b)
          if ("$" !== d.charAt(0) && !F(b[d])) {
            if (!pa(b[d], a[d]))
              return !1;
            c[d] = !0;
          }
        for (d in a)
          if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== u && !F(a[d]))
            return !1;
        return !0;
      }
    return !1;
  }
  function Xa(b, a, c) {
    return b.concat(Ya.call(a, c));
  }
  function nc(b, a) {
    var c = 2 < arguments.length ? Ya.call(arguments, 2) : [];
    return !F(a) || a instanceof RegExp ? a : c.length ? function() {
      return arguments.length ? a.apply(b, Xa(c, arguments, 0)) : a.apply(b, c);
    } : function() {
      return arguments.length ? a.apply(b, arguments) : a.call(b);
    };
  }
  function Ed(b, a) {
    var c = a;
    "string" === typeof b && "$" === b.charAt(0) && "$" === b.charAt(1) ? c = u : Sa(a) ? c = "$WINDOW" : a && V === a ? c = "$DOCUMENT" : Ta(a) && (c = "$SCOPE");
    return c;
  }
  function Za(b, a) {
    return "undefined" === typeof b ? u : JSON.stringify(b, Ed, a ? "  " : null);
  }
  function oc(b) {
    return I(b) ? JSON.parse(b) : b;
  }
  function va(b) {
    b = A(b).clone();
    try {
      b.empty();
    } catch (a) {}
    var c = A("<div>").append(b).html();
    try {
      return b[0].nodeType === mb ? R(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
        return "<" + R(b);
      });
    } catch (d) {
      return R(c);
    }
  }
  function pc(b) {
    try {
      return decodeURIComponent(b);
    } catch (a) {}
  }
  function qc(b) {
    var a = {},
        c,
        d;
    r((b || "").split("&"), function(b) {
      b && (c = b.replace(/\+/g, "%20").split("="), d = pc(c[0]), y(d) && (b = y(c[1]) ? pc(c[1]) : !0, Jb.call(a, d) ? D(a[d]) ? a[d].push(b) : a[d] = [a[d], b] : a[d] = b));
    });
    return a;
  }
  function Kb(b) {
    var a = [];
    r(b, function(b, d) {
      D(b) ? r(b, function(b) {
        a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)));
      }) : a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)));
    });
    return a.length ? a.join("&") : "";
  }
  function nb(b) {
    return Da(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
  }
  function Da(b, a) {
    return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, a ? "%20" : "+");
  }
  function Fd(b, a) {
    var c,
        d,
        e = ob.length;
    b = A(b);
    for (d = 0; d < e; ++d)
      if (c = ob[d] + a, I(c = b.attr(c)))
        return c;
    return null;
  }
  function Gd(b, a) {
    var c,
        d,
        e = {};
    r(ob, function(a) {
      a += "app";
      !c && b.hasAttribute && b.hasAttribute(a) && (c = b, d = b.getAttribute(a));
    });
    r(ob, function(a) {
      a += "app";
      var e;
      !c && (e = b.querySelector("[" + a.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(a));
    });
    c && (e.strictDi = null !== Fd(c, "strict-di"), a(c, d ? [d] : [], e));
  }
  function rc(b, a, c) {
    K(c) || (c = {});
    c = C({strictDi: !1}, c);
    var d = function() {
      b = A(b);
      if (b.injector()) {
        var d = b[0] === V ? "document" : va(b);
        throw Wa("btstrpd", d.replace(/</, "&lt;").replace(/>/, "&gt;"));
      }
      a = a || [];
      a.unshift(["$provide", function(a) {
        a.value("$rootElement", b);
      }]);
      c.debugInfoEnabled && a.push(["$compileProvider", function(a) {
        a.debugInfoEnabled(!0);
      }]);
      a.unshift("ng");
      d = Lb(a, c.strictDi);
      d.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
        a.$apply(function() {
          b.data("$injector", d);
          c(b)(a);
        });
      }]);
      return d;
    },
        e = /^NG_ENABLE_DEBUG_INFO!/,
        f = /^NG_DEFER_BOOTSTRAP!/;
    U && e.test(U.name) && (c.debugInfoEnabled = !0, U.name = U.name.replace(e, ""));
    if (U && !f.test(U.name))
      return d();
    U.name = U.name.replace(f, "");
    ha.resumeBootstrap = function(b) {
      r(b, function(b) {
        a.push(b);
      });
      d();
    };
  }
  function Hd() {
    U.name = "NG_ENABLE_DEBUG_INFO!" + U.name;
    U.location.reload();
  }
  function Id(b) {
    return ha.element(b).injector().get("$$testability");
  }
  function Mb(b, a) {
    a = a || "_";
    return b.replace(Jd, function(b, d) {
      return (d ? a : "") + b.toLowerCase();
    });
  }
  function Kd() {
    var b;
    sc || ((qa = U.jQuery) && qa.fn.on ? (A = qa, C(qa.fn, {
      scope: Ka.scope,
      isolateScope: Ka.isolateScope,
      controller: Ka.controller,
      injector: Ka.injector,
      inheritedData: Ka.inheritedData
    }), b = qa.cleanData, qa.cleanData = function(a) {
      var c;
      if (Nb)
        Nb = !1;
      else
        for (var d = 0,
            e; null != (e = a[d]); d++)
          (c = qa._data(e, "events")) && c.$destroy && qa(e).triggerHandler("$destroy");
      b(a);
    }) : A = S, ha.element = A, sc = !0);
  }
  function Ob(b, a, c) {
    if (!b)
      throw Wa("areq", a || "?", c || "required");
    return b;
  }
  function pb(b, a, c) {
    c && D(b) && (b = b[b.length - 1]);
    Ob(F(b), a, "not a function, got " + (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b));
    return b;
  }
  function La(b, a) {
    if ("hasOwnProperty" === b)
      throw Wa("badname", a);
  }
  function tc(b, a, c) {
    if (!a)
      return b;
    a = a.split(".");
    for (var d,
        e = b,
        f = a.length,
        g = 0; g < f; g++)
      d = a[g], b && (b = (e = b)[d]);
    return !c && F(b) ? nc(e, b) : b;
  }
  function qb(b) {
    var a = b[0];
    b = b[b.length - 1];
    var c = [a];
    do {
      a = a.nextSibling;
      if (!a)
        break;
      c.push(a);
    } while (a !== b);
    return A(c);
  }
  function ia() {
    return Object.create(null);
  }
  function Ld(b) {
    function a(a, b, c) {
      return a[b] || (a[b] = c());
    }
    var c = z("$injector"),
        d = z("ng");
    b = a(b, "angular", Object);
    b.$$minErr = b.$$minErr || z;
    return a(b, "module", function() {
      var b = {};
      return function(f, g, h) {
        if ("hasOwnProperty" === f)
          throw d("badname", "module");
        g && b.hasOwnProperty(f) && (b[f] = null);
        return a(b, f, function() {
          function a(c, d, e, f) {
            f || (f = b);
            return function() {
              f[e || "push"]([c, d, arguments]);
              return t;
            };
          }
          if (!g)
            throw c("nomod", f);
          var b = [],
              d = [],
              e = [],
              s = a("$injector", "invoke", "push", d),
              t = {
                _invokeQueue: b,
                _configBlocks: d,
                _runBlocks: e,
                requires: g,
                name: f,
                provider: a("$provide", "provider"),
                factory: a("$provide", "factory"),
                service: a("$provide", "service"),
                value: a("$provide", "value"),
                constant: a("$provide", "constant", "unshift"),
                animation: a("$animateProvider", "register"),
                filter: a("$filterProvider", "register"),
                controller: a("$controllerProvider", "register"),
                directive: a("$compileProvider", "directive"),
                config: s,
                run: function(a) {
                  e.push(a);
                  return this;
                }
              };
          h && s(h);
          return t;
        });
      };
    });
  }
  function Md(b) {
    C(b, {
      bootstrap: rc,
      copy: Ca,
      extend: C,
      equals: pa,
      element: A,
      forEach: r,
      injector: Lb,
      noop: x,
      bind: nc,
      toJson: Za,
      fromJson: oc,
      identity: oa,
      isUndefined: G,
      isDefined: y,
      isString: I,
      isFunction: F,
      isObject: K,
      isNumber: X,
      isElement: mc,
      isArray: D,
      version: Nd,
      isDate: fa,
      lowercase: R,
      uppercase: rb,
      callbacks: {counter: 0},
      getTestability: Id,
      $$minErr: z,
      $$csp: $a,
      reloadWithDebugInfo: Hd
    });
    ab = Ld(U);
    try {
      ab("ngLocale");
    } catch (a) {
      ab("ngLocale", []).provider("$locale", Od);
    }
    ab("ng", ["ngLocale"], ["$provide", function(a) {
      a.provider({$$sanitizeUri: Pd});
      a.provider("$compile", uc).directive({
        a: Qd,
        input: vc,
        textarea: vc,
        form: Rd,
        script: Sd,
        select: Td,
        style: Ud,
        option: Vd,
        ngBind: Wd,
        ngBindHtml: Xd,
        ngBindTemplate: Yd,
        ngClass: Zd,
        ngClassEven: $d,
        ngClassOdd: ae,
        ngCloak: be,
        ngController: ce,
        ngForm: de,
        ngHide: ee,
        ngIf: fe,
        ngInclude: ge,
        ngInit: he,
        ngNonBindable: ie,
        ngPluralize: je,
        ngRepeat: ke,
        ngShow: le,
        ngStyle: me,
        ngSwitch: ne,
        ngSwitchWhen: oe,
        ngSwitchDefault: pe,
        ngOptions: qe,
        ngTransclude: re,
        ngModel: se,
        ngList: te,
        ngChange: ue,
        pattern: wc,
        ngPattern: wc,
        required: xc,
        ngRequired: xc,
        minlength: yc,
        ngMinlength: yc,
        maxlength: zc,
        ngMaxlength: zc,
        ngValue: ve,
        ngModelOptions: we
      }).directive({ngInclude: xe}).directive(sb).directive(Ac);
      a.provider({
        $anchorScroll: ye,
        $animate: ze,
        $browser: Ae,
        $cacheFactory: Be,
        $controller: Ce,
        $document: De,
        $exceptionHandler: Ee,
        $filter: Bc,
        $interpolate: Fe,
        $interval: Ge,
        $http: He,
        $httpBackend: Ie,
        $location: Je,
        $log: Ke,
        $parse: Le,
        $rootScope: Me,
        $q: Ne,
        $$q: Oe,
        $sce: Pe,
        $sceDelegate: Qe,
        $sniffer: Re,
        $templateCache: Se,
        $templateRequest: Te,
        $$testability: Ue,
        $timeout: Ve,
        $window: We,
        $$rAF: Xe,
        $$asyncCallback: Ye
      });
    }]);
  }
  function bb(b) {
    return b.replace(Ze, function(a, b, d, e) {
      return e ? d.toUpperCase() : d;
    }).replace($e, "Moz$1");
  }
  function Cc(b) {
    b = b.nodeType;
    return b === na || !b || 9 === b;
  }
  function Dc(b, a) {
    var c,
        d,
        e = a.createDocumentFragment(),
        f = [];
    if (Pb.test(b)) {
      c = c || e.appendChild(a.createElement("div"));
      d = (af.exec(b) || ["", ""])[1].toLowerCase();
      d = ja[d] || ja._default;
      c.innerHTML = d[1] + b.replace(bf, "<$1></$2>") + d[2];
      for (d = d[0]; d--; )
        c = c.lastChild;
      f = Xa(f, c.childNodes);
      c = e.firstChild;
      c.textContent = "";
    } else
      f.push(a.createTextNode(b));
    e.textContent = "";
    e.innerHTML = "";
    r(f, function(a) {
      e.appendChild(a);
    });
    return e;
  }
  function S(b) {
    if (b instanceof S)
      return b;
    var a;
    I(b) && (b = P(b), a = !0);
    if (!(this instanceof S)) {
      if (a && "<" != b.charAt(0))
        throw Qb("nosel");
      return new S(b);
    }
    if (a) {
      a = V;
      var c;
      b = (c = cf.exec(b)) ? [a.createElement(c[1])] : (c = Dc(b, a)) ? c.childNodes : [];
    }
    Ec(this, b);
  }
  function Rb(b) {
    return b.cloneNode(!0);
  }
  function tb(b, a) {
    a || ub(b);
    if (b.querySelectorAll)
      for (var c = b.querySelectorAll("*"),
          d = 0,
          e = c.length; d < e; d++)
        ub(c[d]);
  }
  function Fc(b, a, c, d) {
    if (y(d))
      throw Qb("offargs");
    var e = (d = vb(b)) && d.events,
        f = d && d.handle;
    if (f)
      if (a)
        r(a.split(" "), function(a) {
          if (y(c)) {
            var d = e[a];
            Va(d || [], c);
            if (d && 0 < d.length)
              return;
          }
          b.removeEventListener(a, f, !1);
          delete e[a];
        });
      else
        for (a in e)
          "$destroy" !== a && b.removeEventListener(a, f, !1), delete e[a];
  }
  function ub(b, a) {
    var c = b.ng339,
        d = c && wb[c];
    d && (a ? delete d.data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), Fc(b)), delete wb[c], b.ng339 = u));
  }
  function vb(b, a) {
    var c = b.ng339,
        c = c && wb[c];
    a && !c && (b.ng339 = c = ++df, c = wb[c] = {
      events: {},
      data: {},
      handle: u
    });
    return c;
  }
  function Sb(b, a, c) {
    if (Cc(b)) {
      var d = y(c),
          e = !d && a && !K(a),
          f = !a;
      b = (b = vb(b, !e)) && b.data;
      if (d)
        b[a] = c;
      else {
        if (f)
          return b;
        if (e)
          return b && b[a];
        C(b, a);
      }
    }
  }
  function Tb(b, a) {
    return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1;
  }
  function Ub(b, a) {
    a && b.setAttribute && r(a.split(" "), function(a) {
      b.setAttribute("class", P((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + P(a) + " ", " ")));
    });
  }
  function Vb(b, a) {
    if (a && b.setAttribute) {
      var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
      r(a.split(" "), function(a) {
        a = P(a);
        -1 === c.indexOf(" " + a + " ") && (c += a + " ");
      });
      b.setAttribute("class", P(c));
    }
  }
  function Ec(b, a) {
    if (a)
      if (a.nodeType)
        b[b.length++] = a;
      else {
        var c = a.length;
        if ("number" === typeof c && a.window !== a) {
          if (c)
            for (var d = 0; d < c; d++)
              b[b.length++] = a[d];
        } else
          b[b.length++] = a;
      }
  }
  function Gc(b, a) {
    return xb(b, "$" + (a || "ngController") + "Controller");
  }
  function xb(b, a, c) {
    9 == b.nodeType && (b = b.documentElement);
    for (a = D(a) ? a : [a]; b; ) {
      for (var d = 0,
          e = a.length; d < e; d++)
        if ((c = A.data(b, a[d])) !== u)
          return c;
      b = b.parentNode || 11 === b.nodeType && b.host;
    }
  }
  function Hc(b) {
    for (tb(b, !0); b.firstChild; )
      b.removeChild(b.firstChild);
  }
  function Ic(b, a) {
    a || tb(b);
    var c = b.parentNode;
    c && c.removeChild(b);
  }
  function ef(b, a) {
    a = a || U;
    if ("complete" === a.document.readyState)
      a.setTimeout(b);
    else
      A(a).on("load", b);
  }
  function Jc(b, a) {
    var c = yb[a.toLowerCase()];
    return c && Kc[ta(b)] && c;
  }
  function ff(b, a) {
    var c = b.nodeName;
    return ("INPUT" === c || "TEXTAREA" === c) && Lc[a];
  }
  function gf(b, a) {
    var c = function(c, e) {
      c.isDefaultPrevented = function() {
        return c.defaultPrevented;
      };
      var f = a[e || c.type],
          g = f ? f.length : 0;
      if (g) {
        if (G(c.immediatePropagationStopped)) {
          var h = c.stopImmediatePropagation;
          c.stopImmediatePropagation = function() {
            c.immediatePropagationStopped = !0;
            c.stopPropagation && c.stopPropagation();
            h && h.call(c);
          };
        }
        c.isImmediatePropagationStopped = function() {
          return !0 === c.immediatePropagationStopped;
        };
        1 < g && (f = ua(f));
        for (var k = 0; k < g; k++)
          c.isImmediatePropagationStopped() || f[k].call(b, c);
      }
    };
    c.elem = b;
    return c;
  }
  function Ma(b, a) {
    var c = b && b.$$hashKey;
    if (c)
      return "function" === typeof c && (c = b.$$hashKey()), c;
    c = typeof b;
    return c = "function" == c || "object" == c && null !== b ? b.$$hashKey = c + ":" + (a || Cd)() : c + ":" + b;
  }
  function cb(b, a) {
    if (a) {
      var c = 0;
      this.nextUid = function() {
        return ++c;
      };
    }
    r(b, this.put, this);
  }
  function hf(b) {
    return (b = b.toString().replace(Mc, "").match(Nc)) ? "function(" + (b[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
  }
  function Wb(b, a, c) {
    var d;
    if ("function" === typeof b) {
      if (!(d = b.$inject)) {
        d = [];
        if (b.length) {
          if (a)
            throw I(c) && c || (c = b.name || hf(b)), Ea("strictdi", c);
          a = b.toString().replace(Mc, "");
          a = a.match(Nc);
          r(a[1].split(jf), function(a) {
            a.replace(kf, function(a, b, c) {
              d.push(c);
            });
          });
        }
        b.$inject = d;
      }
    } else
      D(b) ? (a = b.length - 1, pb(b[a], "fn"), d = b.slice(0, a)) : pb(b, "fn", !0);
    return d;
  }
  function Lb(b, a) {
    function c(a) {
      return function(b, c) {
        if (K(b))
          r(b, kc(a));
        else
          return a(b, c);
      };
    }
    function d(a, b) {
      La(a, "service");
      if (F(b) || D(b))
        b = s.instantiate(b);
      if (!b.$get)
        throw Ea("pget", a);
      return p[a + "Provider"] = b;
    }
    function e(a, b) {
      return function() {
        var c = q.invoke(b, this, u, a);
        if (G(c))
          throw Ea("undef", a);
        return c;
      };
    }
    function f(a, b, c) {
      return d(a, {$get: !1 !== c ? e(a, b) : b});
    }
    function g(a) {
      var b = [],
          c;
      r(a, function(a) {
        function d(a) {
          var b,
              c;
          b = 0;
          for (c = a.length; b < c; b++) {
            var e = a[b],
                f = s.get(e[0]);
            f[e[1]].apply(f, e[2]);
          }
        }
        if (!m.get(a)) {
          m.put(a, !0);
          try {
            I(a) ? (c = ab(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : F(a) ? b.push(s.invoke(a)) : D(a) ? b.push(s.invoke(a)) : pb(a, "module");
          } catch (e) {
            throw D(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Ea("modulerr", a, e.stack || e.message || e);
          }
        }
      });
      return b;
    }
    function h(b, c) {
      function d(a) {
        if (b.hasOwnProperty(a)) {
          if (b[a] === k)
            throw Ea("cdep", a + " <- " + l.join(" <- "));
          return b[a];
        }
        try {
          return l.unshift(a), b[a] = k, b[a] = c(a);
        } catch (e) {
          throw b[a] === k && delete b[a], e;
        } finally {
          l.shift();
        }
      }
      function e(b, c, f, g) {
        "string" === typeof f && (g = f, f = null);
        var k = [];
        g = Wb(b, a, g);
        var h,
            l,
            q;
        l = 0;
        for (h = g.length; l < h; l++) {
          q = g[l];
          if ("string" !== typeof q)
            throw Ea("itkn", q);
          k.push(f && f.hasOwnProperty(q) ? f[q] : d(q));
        }
        D(b) && (b = b[h]);
        return b.apply(c, k);
      }
      return {
        invoke: e,
        instantiate: function(a, b, c) {
          var d = Object.create((D(a) ? a[a.length - 1] : a).prototype);
          a = e(a, d, b, c);
          return K(a) || F(a) ? a : d;
        },
        get: d,
        annotate: Wb,
        has: function(a) {
          return p.hasOwnProperty(a + "Provider") || b.hasOwnProperty(a);
        }
      };
    }
    a = !0 === a;
    var k = {},
        l = [],
        m = new cb([], !0),
        p = {$provide: {
            provider: c(d),
            factory: c(f),
            service: c(function(a, b) {
              return f(a, ["$injector", function(a) {
                return a.instantiate(b);
              }]);
            }),
            value: c(function(a, b) {
              return f(a, ca(b), !1);
            }),
            constant: c(function(a, b) {
              La(a, "constant");
              p[a] = b;
              t[a] = b;
            }),
            decorator: function(a, b) {
              var c = s.get(a + "Provider"),
                  d = c.$get;
              c.$get = function() {
                var a = q.invoke(d, c);
                return q.invoke(b, null, {$delegate: a});
              };
            }
          }},
        s = p.$injector = h(p, function() {
          throw Ea("unpr", l.join(" <- "));
        }),
        t = {},
        q = t.$injector = h(t, function(a) {
          var b = s.get(a + "Provider");
          return q.invoke(b.$get, b, u, a);
        });
    r(g(b), function(a) {
      q.invoke(a || x);
    });
    return q;
  }
  function ye() {
    var b = !0;
    this.disableAutoScrolling = function() {
      b = !1;
    };
    this.$get = ["$window", "$location", "$rootScope", function(a, c, d) {
      function e(a) {
        var b = null;
        Array.prototype.some.call(a, function(a) {
          if ("a" === ta(a))
            return b = a, !0;
        });
        return b;
      }
      function f(b) {
        if (b) {
          b.scrollIntoView();
          var c;
          c = g.yOffset;
          F(c) ? c = c() : mc(c) ? (c = c[0], c = "fixed" !== a.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : X(c) || (c = 0);
          c && (b = b.getBoundingClientRect().top, a.scrollBy(0, b - c));
        } else
          a.scrollTo(0, 0);
      }
      function g() {
        var a = c.hash(),
            b;
        a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
      }
      var h = a.document;
      b && d.$watch(function() {
        return c.hash();
      }, function(a, b) {
        a === b && "" === a || ef(function() {
          d.$evalAsync(g);
        });
      });
      return g;
    }];
  }
  function Ye() {
    this.$get = ["$$rAF", "$timeout", function(b, a) {
      return b.supported ? function(a) {
        return b(a);
      } : function(b) {
        return a(b, 0, !1);
      };
    }];
  }
  function lf(b, a, c, d) {
    function e(a) {
      try {
        a.apply(null, Ya.call(arguments, 1));
      } finally {
        if (v--, 0 === v)
          for (; w.length; )
            try {
              w.pop()();
            } catch (b) {
              c.error(b);
            }
      }
    }
    function f(a, b) {
      (function ya() {
        r(O, function(a) {
          a();
        });
        E = b(ya, a);
      })();
    }
    function g() {
      h();
      k();
    }
    function h() {
      H = b.history.state;
      H = G(H) ? null : H;
      pa(H, Q) && (H = Q);
      Q = H;
    }
    function k() {
      if (B !== m.url() || M !== H)
        B = m.url(), M = H, r(W, function(a) {
          a(m.url(), H);
        });
    }
    function l(a) {
      try {
        return decodeURIComponent(a);
      } catch (b) {
        return a;
      }
    }
    var m = this,
        p = a[0],
        s = b.location,
        t = b.history,
        q = b.setTimeout,
        N = b.clearTimeout,
        n = {};
    m.isMock = !1;
    var v = 0,
        w = [];
    m.$$completeOutstandingRequest = e;
    m.$$incOutstandingRequestCount = function() {
      v++;
    };
    m.notifyWhenNoOutstandingRequests = function(a) {
      r(O, function(a) {
        a();
      });
      0 === v ? a() : w.push(a);
    };
    var O = [],
        E;
    m.addPollFn = function(a) {
      G(E) && f(100, q);
      O.push(a);
      return a;
    };
    var H,
        M,
        B = s.href,
        ea = a.find("base"),
        L = null;
    h();
    M = H;
    m.url = function(a, c, e) {
      G(e) && (e = null);
      s !== b.location && (s = b.location);
      t !== b.history && (t = b.history);
      if (a) {
        var f = M === e;
        if (B === a && (!d.history || f))
          return m;
        var g = B && Fa(B) === Fa(a);
        B = a;
        M = e;
        !d.history || g && f ? (g || (L = a), c ? s.replace(a) : s.href = a) : (t[c ? "replaceState" : "pushState"](e, "", a), h(), M = H);
        return m;
      }
      return L || s.href.replace(/%27/g, "'");
    };
    m.state = function() {
      return H;
    };
    var W = [],
        ba = !1,
        Q = null;
    m.onUrlChange = function(a) {
      if (!ba) {
        if (d.history)
          A(b).on("popstate", g);
        A(b).on("hashchange", g);
        ba = !0;
      }
      W.push(a);
      return a;
    };
    m.$$checkUrlChange = k;
    m.baseHref = function() {
      var a = ea.attr("href");
      return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
    };
    var aa = {},
        y = "",
        da = m.baseHref();
    m.cookies = function(a, b) {
      var d,
          e,
          f,
          g;
      if (a)
        b === u ? p.cookie = encodeURIComponent(a) + "=;path=" + da + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : I(b) && (d = (p.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + da).length + 1, 4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!"));
      else {
        if (p.cookie !== y)
          for (y = p.cookie, d = y.split("; "), aa = {}, f = 0; f < d.length; f++)
            e = d[f], g = e.indexOf("="), 0 < g && (a = l(e.substring(0, g)), aa[a] === u && (aa[a] = l(e.substring(g + 1))));
        return aa;
      }
    };
    m.defer = function(a, b) {
      var c;
      v++;
      c = q(function() {
        delete n[c];
        e(a);
      }, b || 0);
      n[c] = !0;
      return c;
    };
    m.defer.cancel = function(a) {
      return n[a] ? (delete n[a], N(a), e(x), !0) : !1;
    };
  }
  function Ae() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
      return new lf(b, d, a, c);
    }];
  }
  function Be() {
    this.$get = function() {
      function b(b, d) {
        function e(a) {
          a != p && (s ? s == a && (s = a.n) : s = a, f(a.n, a.p), f(a, p), p = a, p.n = null);
        }
        function f(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a));
        }
        if (b in a)
          throw z("$cacheFactory")("iid", b);
        var g = 0,
            h = C({}, d, {id: b}),
            k = {},
            l = d && d.capacity || Number.MAX_VALUE,
            m = {},
            p = null,
            s = null;
        return a[b] = {
          put: function(a, b) {
            if (l < Number.MAX_VALUE) {
              var c = m[a] || (m[a] = {key: a});
              e(c);
            }
            if (!G(b))
              return a in k || g++, k[a] = b, g > l && this.remove(s.key), b;
          },
          get: function(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];
              if (!b)
                return;
              e(b);
            }
            return k[a];
          },
          remove: function(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];
              if (!b)
                return;
              b == p && (p = b.p);
              b == s && (s = b.n);
              f(b.n, b.p);
              delete m[a];
            }
            delete k[a];
            g--;
          },
          removeAll: function() {
            k = {};
            g = 0;
            m = {};
            p = s = null;
          },
          destroy: function() {
            m = h = k = null;
            delete a[b];
          },
          info: function() {
            return C({}, h, {size: g});
          }
        };
      }
      var a = {};
      b.info = function() {
        var b = {};
        r(a, function(a, e) {
          b[e] = a.info();
        });
        return b;
      };
      b.get = function(b) {
        return a[b];
      };
      return b;
    };
  }
  function Se() {
    this.$get = ["$cacheFactory", function(b) {
      return b("templates");
    }];
  }
  function uc(b, a) {
    function c(a, b) {
      var c = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
          d = {};
      r(a, function(a, e) {
        var f = a.match(c);
        if (!f)
          throw ka("iscp", b, e, a);
        d[e] = {
          mode: f[1][0],
          collection: "*" === f[2],
          optional: "?" === f[3],
          attrName: f[4] || e
        };
      });
      return d;
    }
    var d = {},
        e = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
        f = /(([\w\-]+)(?:\:([^;]+))?;?)/,
        g = Dd("ngSrc,ngSrcset,src,srcset"),
        h = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
        k = /^(on[a-z]+|formaction)$/;
    this.directive = function p(a, e) {
      La(a, "directive");
      I(a) ? (Ob(e, "directiveFactory"), d.hasOwnProperty(a) || (d[a] = [], b.factory(a + "Directive", ["$injector", "$exceptionHandler", function(b, e) {
        var f = [];
        r(d[a], function(d, g) {
          try {
            var h = b.invoke(d);
            F(h) ? h = {compile: ca(h)} : !h.compile && h.link && (h.compile = ca(h.link));
            h.priority = h.priority || 0;
            h.index = g;
            h.name = h.name || a;
            h.require = h.require || h.controller && h.name;
            h.restrict = h.restrict || "EA";
            K(h.scope) && (h.$$isolateBindings = c(h.scope, h.name));
            f.push(h);
          } catch (k) {
            e(k);
          }
        });
        return f;
      }])), d[a].push(e)) : r(a, kc(p));
      return this;
    };
    this.aHrefSanitizationWhitelist = function(b) {
      return y(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
    };
    this.imgSrcSanitizationWhitelist = function(b) {
      return y(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
    };
    var l = !0;
    this.debugInfoEnabled = function(a) {
      return y(a) ? (l = a, this) : l;
    };
    this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, c, q, N, n, v, w, O, E, H) {
      function M(a, b) {
        try {
          a.addClass(b);
        } catch (c) {}
      }
      function B(a, b, c, d, e) {
        a instanceof A || (a = A(a));
        r(a, function(b, c) {
          b.nodeType == mb && b.nodeValue.match(/\S+/) && (a[c] = A(b).wrap("<span></span>").parent()[0]);
        });
        var f = ea(a, b, a, c, d, e);
        B.$$addScopeClass(a);
        var g = null;
        return function(b, c, d) {
          Ob(b, "scope");
          d = d || {};
          var e = d.parentBoundTranscludeFn,
              h = d.transcludeControllers;
          d = d.futureParentElement;
          e && e.$$boundTransclude && (e = e.$$boundTransclude);
          g || (g = (d = d && d[0]) ? "foreignobject" !== ta(d) && d.toString().match(/SVG/) ? "svg" : "html" : "html");
          d = "html" !== g ? A(U(g, A("<div>").append(a).html())) : c ? Ka.clone.call(a) : a;
          if (h)
            for (var k in h)
              d.data("$" + k + "Controller", h[k].instance);
          B.$$addScopeInfo(d, b);
          c && c(d, b);
          f && f(b, d, d, e);
          return d;
        };
      }
      function ea(a, b, c, d, e, f) {
        function g(a, c, d, e) {
          var f,
              k,
              l,
              q,
              s,
              n,
              w;
          if (p)
            for (w = Array(c.length), q = 0; q < h.length; q += 3)
              f = h[q], w[f] = c[f];
          else
            w = c;
          q = 0;
          for (s = h.length; q < s; )
            k = w[h[q++]], c = h[q++], f = h[q++], c ? (c.scope ? (l = a.$new(), B.$$addScopeInfo(A(k), l)) : l = a, n = c.transcludeOnThisElement ? L(a, c.transclude, e, c.elementTranscludeOnThisElement) : !c.templateOnThisElement && e ? e : !e && b ? L(a, b) : null, c(f, l, k, d, n)) : f && f(a, k.childNodes, u, e);
        }
        for (var h = [],
            k,
            l,
            q,
            s,
            p,
            n = 0; n < a.length; n++) {
          k = new X;
          l = W(a[n], [], k, 0 === n ? d : u, e);
          (f = l.length ? aa(l, a[n], k, b, c, null, [], [], f) : null) && f.scope && B.$$addScopeClass(k.$$element);
          k = f && f.terminal || !(q = a[n].childNodes) || !q.length ? null : ea(q, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b);
          if (f || k)
            h.push(n, f, k), s = !0, p = p || f;
          f = null;
        }
        return s ? g : null;
      }
      function L(a, b, c, d) {
        return function(d, e, f, g, h) {
          d || (d = a.$new(!1, h), d.$$transcluded = !0);
          return b(d, e, {
            parentBoundTranscludeFn: c,
            transcludeControllers: f,
            futureParentElement: g
          });
        };
      }
      function W(b, c, g, h, k) {
        var l = g.$attr,
            q;
        switch (b.nodeType) {
          case na:
            da(c, wa(ta(b)), "E", h, k);
            for (var s,
                n,
                w,
                N = b.attributes,
                t = 0,
                O = N && N.length; t < O; t++) {
              var H = !1,
                  v = !1;
              s = N[t];
              q = s.name;
              s = P(s.value);
              n = wa(q);
              if (w = za.test(n))
                q = Mb(n.substr(6), "-");
              var M = n.replace(/(Start|End)$/, ""),
                  E;
              a: {
                var B = M;
                if (d.hasOwnProperty(B)) {
                  E = void 0;
                  for (var B = a.get(B + "Directive"),
                      W = 0,
                      r = B.length; W < r; W++)
                    if (E = B[W], E.multiElement) {
                      E = !0;
                      break a;
                    }
                }
                E = !1;
              }
              E && n === M + "Start" && (H = q, v = q.substr(0, q.length - 5) + "end", q = q.substr(0, q.length - 6));
              n = wa(q.toLowerCase());
              l[n] = q;
              if (w || !g.hasOwnProperty(n))
                g[n] = s, Jc(b, n) && (g[n] = !0);
              S(b, c, s, n, w);
              da(c, n, "A", h, k, H, v);
            }
            b = b.className;
            if (I(b) && "" !== b)
              for (; q = f.exec(b); )
                n = wa(q[2]), da(c, n, "C", h, k) && (g[n] = P(q[3])), b = b.substr(q.index + q[0].length);
            break;
          case mb:
            T(c, b.nodeValue);
            break;
          case 8:
            try {
              if (q = e.exec(b.nodeValue))
                n = wa(q[1]), da(c, n, "M", h, k) && (g[n] = P(q[2]));
            } catch (Q) {}
        }
        c.sort(z);
        return c;
      }
      function ba(a, b, c) {
        var d = [],
            e = 0;
        if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a)
              throw ka("uterdir", b, c);
            a.nodeType == na && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
            d.push(a);
            a = a.nextSibling;
          } while (0 < e);
        } else
          d.push(a);
        return A(d);
      }
      function Q(a, b, c) {
        return function(d, e, f, g, h) {
          e = ba(e[0], b, c);
          return a(d, e, f, g, h);
        };
      }
      function aa(a, d, e, f, g, k, l, q, p) {
        function w(a, b, c, d) {
          if (a) {
            c && (a = Q(a, c, d));
            a.require = J.require;
            a.directiveName = ga;
            if (L === J || J.$$isolateScope)
              a = Y(a, {isolateScope: !0});
            l.push(a);
          }
          if (b) {
            c && (b = Q(b, c, d));
            b.require = J.require;
            b.directiveName = ga;
            if (L === J || J.$$isolateScope)
              b = Y(b, {isolateScope: !0});
            q.push(b);
          }
        }
        function O(a, b, c, d) {
          var e,
              f = "data",
              g = !1,
              k = c,
              l;
          if (I(b)) {
            l = b.match(h);
            b = b.substring(l[0].length);
            l[3] && (l[1] ? l[3] = null : l[1] = l[3]);
            "^" === l[1] ? f = "inheritedData" : "^^" === l[1] && (f = "inheritedData", k = c.parent());
            "?" === l[2] && (g = !0);
            e = null;
            d && "data" === f && (e = d[b]) && (e = e.instance);
            e = e || k[f]("$" + b + "Controller");
            if (!e && !g)
              throw ka("ctreq", b, a);
            return e || null;
          }
          D(b) && (e = [], r(b, function(b) {
            e.push(O(a, b, c, d));
          }));
          return e;
        }
        function H(a, c, f, g, h) {
          function k(a, b, c) {
            var d;
            Ta(a) || (c = b, b = a, a = u);
            C && (d = M);
            c || (c = C ? W.parent() : W);
            return h(a, b, d, c, Xb);
          }
          var p,
              w,
              t,
              v,
              M,
              db,
              W,
              Q;
          d === f ? (Q = e, W = e.$$element) : (W = A(f), Q = new X(W, e));
          L && (v = c.$new(!0));
          h && (db = k, db.$$boundTransclude = h);
          E && (ea = {}, M = {}, r(E, function(a) {
            var b = {
              $scope: a === L || a.$$isolateScope ? v : c,
              $element: W,
              $attrs: Q,
              $transclude: db
            };
            t = a.controller;
            "@" == t && (t = Q[a.name]);
            b = n(t, b, !0, a.controllerAs);
            M[a.name] = b;
            C || W.data("$" + a.name + "Controller", b.instance);
            ea[a.name] = b;
          }));
          if (L) {
            B.$$addScopeInfo(W, v, !0, !(aa && (aa === L || aa === L.$$originalDirective)));
            B.$$addScopeClass(W, !0);
            g = ea && ea[L.name];
            var ba = v;
            g && g.identifier && !0 === L.bindToController && (ba = g.instance);
            r(v.$$isolateBindings = L.$$isolateBindings, function(a, d) {
              var e = a.attrName,
                  f = a.optional,
                  g,
                  h,
                  k,
                  l;
              switch (a.mode) {
                case "@":
                  Q.$observe(e, function(a) {
                    ba[d] = a;
                  });
                  Q.$$observers[e].$$scope = c;
                  Q[e] && (ba[d] = b(Q[e])(c));
                  break;
                case "=":
                  if (f && !Q[e])
                    break;
                  h = N(Q[e]);
                  l = h.literal ? pa : function(a, b) {
                    return a === b || a !== a && b !== b;
                  };
                  k = h.assign || function() {
                    g = ba[d] = h(c);
                    throw ka("nonassign", Q[e], L.name);
                  };
                  g = ba[d] = h(c);
                  f = function(a) {
                    l(a, ba[d]) || (l(a, g) ? k(c, a = ba[d]) : ba[d] = a);
                    return g = a;
                  };
                  f.$stateful = !0;
                  f = a.collection ? c.$watchCollection(Q[e], f) : c.$watch(N(Q[e], f), null, h.literal);
                  v.$on("$destroy", f);
                  break;
                case "&":
                  h = N(Q[e]), ba[d] = function(a) {
                    return h(c, a);
                  };
              }
            });
          }
          ea && (r(ea, function(a) {
            a();
          }), ea = null);
          g = 0;
          for (p = l.length; g < p; g++)
            w = l[g], Z(w, w.isolateScope ? v : c, W, Q, w.require && O(w.directiveName, w.require, W, M), db);
          var Xb = c;
          L && (L.template || null === L.templateUrl) && (Xb = v);
          a && a(Xb, f.childNodes, u, h);
          for (g = q.length - 1; 0 <= g; g--)
            w = q[g], Z(w, w.isolateScope ? v : c, W, Q, w.require && O(w.directiveName, w.require, W, M), db);
        }
        p = p || {};
        for (var v = -Number.MAX_VALUE,
            M,
            E = p.controllerDirectives,
            ea,
            L = p.newIsolateScopeDirective,
            aa = p.templateDirective,
            da = p.nonTlbTranscludeDirective,
            x = !1,
            Na = !1,
            C = p.hasElementTranscludeDirective,
            T = e.$$element = A(d),
            J,
            ga,
            z,
            Ga = f,
            R,
            S = 0,
            za = a.length; S < za; S++) {
          J = a[S];
          var zb = J.$$start,
              $ = J.$$end;
          zb && (T = ba(d, zb, $));
          z = u;
          if (v > J.priority)
            break;
          if (z = J.scope)
            J.templateUrl || (K(z) ? (ya("new/isolated scope", L || M, J, T), L = J) : ya("new/isolated scope", L, J, T)), M = M || J;
          ga = J.name;
          !J.templateUrl && J.controller && (z = J.controller, E = E || {}, ya("'" + ga + "' controller", E[ga], J, T), E[ga] = J);
          if (z = J.transclude)
            x = !0, J.$$tlb || (ya("transclusion", da, J, T), da = J), "element" == z ? (C = !0, v = J.priority, z = T, T = e.$$element = A(V.createComment(" " + ga + ": " + e[ga] + " ")), d = T[0], Ab(g, Ya.call(z, 0), d), Ga = B(z, f, v, k && k.name, {nonTlbTranscludeDirective: da})) : (z = A(Rb(d)).contents(), T.empty(), Ga = B(z, f));
          if (J.template)
            if (Na = !0, ya("template", aa, J, T), aa = J, z = F(J.template) ? J.template(T, e) : J.template, z = Pc(z), J.replace) {
              k = J;
              z = Pb.test(z) ? Qc(U(J.templateNamespace, P(z))) : [];
              d = z[0];
              if (1 != z.length || d.nodeType !== na)
                throw ka("tplrt", ga, "");
              Ab(g, T, d);
              za = {$attr: {}};
              z = W(d, [], za);
              var mf = a.splice(S + 1, a.length - (S + 1));
              L && y(z);
              a = a.concat(z).concat(mf);
              Oc(e, za);
              za = a.length;
            } else
              T.html(z);
          if (J.templateUrl)
            Na = !0, ya("template", aa, J, T), aa = J, J.replace && (k = J), H = G(a.splice(S, a.length - S), T, e, g, x && Ga, l, q, {
              controllerDirectives: E,
              newIsolateScopeDirective: L,
              templateDirective: aa,
              nonTlbTranscludeDirective: da
            }), za = a.length;
          else if (J.compile)
            try {
              R = J.compile(T, e, Ga), F(R) ? w(null, R, zb, $) : R && w(R.pre, R.post, zb, $);
            } catch (ca) {
              c(ca, va(T));
            }
          J.terminal && (H.terminal = !0, v = Math.max(v, J.priority));
        }
        H.scope = M && !0 === M.scope;
        H.transcludeOnThisElement = x;
        H.elementTranscludeOnThisElement = C;
        H.templateOnThisElement = Na;
        H.transclude = Ga;
        p.hasElementTranscludeDirective = C;
        return H;
      }
      function y(a) {
        for (var b = 0,
            c = a.length; b < c; b++) {
          var d = b,
              e;
          e = C(Object.create(a[b]), {$$isolateScope: !0});
          a[d] = e;
        }
      }
      function da(b, e, f, g, h, k, l) {
        if (e === h)
          return null;
        h = null;
        if (d.hasOwnProperty(e)) {
          var q;
          e = a.get(e + "Directive");
          for (var s = 0,
              n = e.length; s < n; s++)
            try {
              if (q = e[s], (g === u || g > q.priority) && -1 != q.restrict.indexOf(f)) {
                if (k) {
                  var w = {
                    $$start: k,
                    $$end: l
                  };
                  q = C(Object.create(q), w);
                }
                b.push(q);
                h = q;
              }
            } catch (N) {
              c(N);
            }
        }
        return h;
      }
      function Oc(a, b) {
        var c = b.$attr,
            d = a.$attr,
            e = a.$$element;
        r(a, function(d, e) {
          "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]));
        });
        r(b, function(b, f) {
          "class" == f ? (M(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f]);
        });
      }
      function G(a, b, c, d, e, f, g, h) {
        var k = [],
            l,
            s,
            p = b[0],
            n = a.shift(),
            w = C({}, n, {
              templateUrl: null,
              transclude: null,
              replace: null,
              $$originalDirective: n
            }),
            N = F(n.templateUrl) ? n.templateUrl(b, c) : n.templateUrl,
            t = n.templateNamespace;
        b.empty();
        q(O.getTrustedResourceUrl(N)).then(function(q) {
          var v,
              O;
          q = Pc(q);
          if (n.replace) {
            q = Pb.test(q) ? Qc(U(t, P(q))) : [];
            v = q[0];
            if (1 != q.length || v.nodeType !== na)
              throw ka("tplrt", n.name, N);
            q = {$attr: {}};
            Ab(d, b, v);
            var H = W(v, [], q);
            K(n.scope) && y(H);
            a = H.concat(a);
            Oc(c, q);
          } else
            v = p, b.html(q);
          a.unshift(w);
          l = aa(a, v, c, e, b, n, f, g, h);
          r(d, function(a, c) {
            a == v && (d[c] = b[0]);
          });
          for (s = ea(b[0].childNodes, e); k.length; ) {
            q = k.shift();
            O = k.shift();
            var E = k.shift(),
                B = k.shift(),
                H = b[0];
            if (!q.$$destroyed) {
              if (O !== p) {
                var Q = O.className;
                h.hasElementTranscludeDirective && n.replace || (H = Rb(v));
                Ab(E, A(O), H);
                M(A(H), Q);
              }
              O = l.transcludeOnThisElement ? L(q, l.transclude, B) : B;
              l(s, q, H, d, O);
            }
          }
          k = null;
        });
        return function(a, b, c, d, e) {
          a = e;
          b.$$destroyed || (k ? k.push(b, c, d, a) : (l.transcludeOnThisElement && (a = L(b, l.transclude, e)), l(s, b, c, d, a)));
        };
      }
      function z(a, b) {
        var c = b.priority - a.priority;
        return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
      }
      function ya(a, b, c, d) {
        if (b)
          throw ka("multidir", b.name, c.name, a, va(d));
      }
      function T(a, c) {
        var d = b(c, !0);
        d && a.push({
          priority: 0,
          compile: function(a) {
            a = a.parent();
            var b = !!a.length;
            b && B.$$addBindingClass(a);
            return function(a, c) {
              var e = c.parent();
              b || B.$$addBindingClass(e);
              B.$$addBindingInfo(e, d.expressions);
              a.$watch(d, function(a) {
                c[0].nodeValue = a;
              });
            };
          }
        });
      }
      function U(a, b) {
        a = R(a || "html");
        switch (a) {
          case "svg":
          case "math":
            var c = V.createElement("div");
            c.innerHTML = "<" + a + ">" + b + "</" + a + ">";
            return c.childNodes[0].childNodes;
          default:
            return b;
        }
      }
      function Ga(a, b) {
        if ("srcdoc" == b)
          return O.HTML;
        var c = ta(a);
        if ("xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b))
          return O.RESOURCE_URL;
      }
      function S(a, c, d, e, f) {
        var h = b(d, !0);
        if (h) {
          if ("multiple" === e && "select" === ta(a))
            throw ka("selmulti", va(a));
          c.push({
            priority: 100,
            compile: function() {
              return {pre: function(c, d, l) {
                  d = l.$$observers || (l.$$observers = {});
                  if (k.test(e))
                    throw ka("nodomevents");
                  l[e] && (h = b(l[e], !0, Ga(a, e), g[e] || f)) && (l[e] = h(c), (d[e] || (d[e] = [])).$$inter = !0, (l.$$observers && l.$$observers[e].$$scope || c).$watch(h, function(a, b) {
                    "class" === e && a != b ? l.$updateClass(a, b) : l.$set(e, a);
                  }));
                }};
            }
          });
        }
      }
      function Ab(a, b, c) {
        var d = b[0],
            e = b.length,
            f = d.parentNode,
            g,
            h;
        if (a)
          for (g = 0, h = a.length; g < h; g++)
            if (a[g] == d) {
              a[g++] = c;
              h = g + e - 1;
              for (var k = a.length; g < k; g++, h++)
                h < k ? a[g] = a[h] : delete a[g];
              a.length -= e - 1;
              a.context === d && (a.context = c);
              break;
            }
        f && f.replaceChild(c, d);
        a = V.createDocumentFragment();
        a.appendChild(d);
        A(c).data(A(d).data());
        qa ? (Nb = !0, qa.cleanData([d])) : delete A.cache[d[A.expando]];
        d = 1;
        for (e = b.length; d < e; d++)
          f = b[d], A(f).remove(), a.appendChild(f), delete b[d];
        b[0] = c;
        b.length = 1;
      }
      function Y(a, b) {
        return C(function() {
          return a.apply(null, arguments);
        }, a, b);
      }
      function Z(a, b, d, e, f, g) {
        try {
          a(b, d, e, f, g);
        } catch (h) {
          c(h, va(d));
        }
      }
      var X = function(a, b) {
        if (b) {
          var c = Object.keys(b),
              d,
              e,
              f;
          d = 0;
          for (e = c.length; d < e; d++)
            f = c[d], this[f] = b[f];
        } else
          this.$attr = {};
        this.$$element = a;
      };
      X.prototype = {
        $normalize: wa,
        $addClass: function(a) {
          a && 0 < a.length && E.addClass(this.$$element, a);
        },
        $removeClass: function(a) {
          a && 0 < a.length && E.removeClass(this.$$element, a);
        },
        $updateClass: function(a, b) {
          var c = Rc(a, b);
          c && c.length && E.addClass(this.$$element, c);
          (c = Rc(b, a)) && c.length && E.removeClass(this.$$element, c);
        },
        $set: function(a, b, d, e) {
          var f = this.$$element[0],
              g = Jc(f, a),
              h = ff(f, a),
              f = a;
          g ? (this.$$element.prop(a, b), e = g) : h && (this[h] = b, f = h);
          this[a] = b;
          e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = Mb(a, "-"));
          g = ta(this.$$element);
          if ("a" === g && "href" === a || "img" === g && "src" === a)
            this[a] = b = H(b, "src" === a);
          else if ("img" === g && "srcset" === a) {
            for (var g = "",
                h = P(b),
                k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,
                k = /\s/.test(h) ? k : /(,)/,
                h = h.split(k),
                k = Math.floor(h.length / 2),
                l = 0; l < k; l++)
              var q = 2 * l,
                  g = g + H(P(h[q]), !0),
                  g = g + (" " + P(h[q + 1]));
            h = P(h[2 * l]).split(/\s/);
            g += H(P(h[0]), !0);
            2 === h.length && (g += " " + P(h[1]));
            this[a] = b = g;
          }
          !1 !== d && (null === b || b === u ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
          (a = this.$$observers) && r(a[f], function(a) {
            try {
              a(b);
            } catch (d) {
              c(d);
            }
          });
        },
        $observe: function(a, b) {
          var c = this,
              d = c.$$observers || (c.$$observers = ia()),
              e = d[a] || (d[a] = []);
          e.push(b);
          v.$evalAsync(function() {
            !e.$$inter && c.hasOwnProperty(a) && b(c[a]);
          });
          return function() {
            Va(e, b);
          };
        }
      };
      var Na = b.startSymbol(),
          ga = b.endSymbol(),
          Pc = "{{" == Na || "}}" == ga ? oa : function(a) {
            return a.replace(/\{\{/g, Na).replace(/}}/g, ga);
          },
          za = /^ngAttr[A-Z]/;
      B.$$addBindingInfo = l ? function(a, b) {
        var c = a.data("$binding") || [];
        D(b) ? c = c.concat(b) : c.push(b);
        a.data("$binding", c);
      } : x;
      B.$$addBindingClass = l ? function(a) {
        M(a, "ng-binding");
      } : x;
      B.$$addScopeInfo = l ? function(a, b, c, d) {
        a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
      } : x;
      B.$$addScopeClass = l ? function(a, b) {
        M(a, b ? "ng-isolate-scope" : "ng-scope");
      } : x;
      return B;
    }];
  }
  function wa(b) {
    return bb(b.replace(nf, ""));
  }
  function Rc(b, a) {
    var c = "",
        d = b.split(/\s+/),
        e = a.split(/\s+/),
        f = 0;
    a: for (; f < d.length; f++) {
      for (var g = d[f],
          h = 0; h < e.length; h++)
        if (g == e[h])
          continue a;
      c += (0 < c.length ? " " : "") + g;
    }
    return c;
  }
  function Qc(b) {
    b = A(b);
    var a = b.length;
    if (1 >= a)
      return b;
    for (; a--; )
      8 === b[a].nodeType && of.call(b, a, 1);
    return b;
  }
  function Ce() {
    var b = {},
        a = !1,
        c = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function(a, c) {
      La(a, "controller");
      K(a) ? C(b, a) : b[a] = c;
    };
    this.allowGlobals = function() {
      a = !0;
    };
    this.$get = ["$injector", "$window", function(d, e) {
      function f(a, b, c, d) {
        if (!a || !K(a.$scope))
          throw z("$controller")("noscp", d, b);
        a.$scope[b] = c;
      }
      return function(g, h, k, l) {
        var m,
            p,
            s;
        k = !0 === k;
        l && I(l) && (s = l);
        I(g) && (l = g.match(c), p = l[1], s = s || l[3], g = b.hasOwnProperty(p) ? b[p] : tc(h.$scope, p, !0) || (a ? tc(e, p, !0) : u), pb(g, p, !0));
        if (k)
          return k = (D(g) ? g[g.length - 1] : g).prototype, m = Object.create(k), s && f(h, s, m, p || g.name), C(function() {
            d.invoke(g, m, h, p);
            return m;
          }, {
            instance: m,
            identifier: s
          });
        m = d.instantiate(g, h, p);
        s && f(h, s, m, p || g.name);
        return m;
      };
    }];
  }
  function De() {
    this.$get = ["$window", function(b) {
      return A(b.document);
    }];
  }
  function Ee() {
    this.$get = ["$log", function(b) {
      return function(a, c) {
        b.error.apply(b, arguments);
      };
    }];
  }
  function Yb(b, a) {
    if (I(b)) {
      b = b.replace(pf, "");
      var c = a("Content-Type");
      if (c && 0 === c.indexOf(Sc) && b.trim() || qf.test(b) && rf.test(b))
        b = oc(b);
    }
    return b;
  }
  function Tc(b) {
    var a = ia(),
        c,
        d,
        e;
    if (!b)
      return a;
    r(b.split("\n"), function(b) {
      e = b.indexOf(":");
      c = R(P(b.substr(0, e)));
      d = P(b.substr(e + 1));
      c && (a[c] = a[c] ? a[c] + ", " + d : d);
    });
    return a;
  }
  function Uc(b) {
    var a = K(b) ? b : u;
    return function(c) {
      a || (a = Tc(b));
      return c ? (c = a[R(c)], void 0 === c && (c = null), c) : a;
    };
  }
  function Vc(b, a, c) {
    if (F(c))
      return c(b, a);
    r(c, function(c) {
      b = c(b, a);
    });
    return b;
  }
  function He() {
    var b = this.defaults = {
      transformResponse: [Yb],
      transformRequest: [function(a) {
        return K(a) && "[object File]" !== Ja.call(a) && "[object Blob]" !== Ja.call(a) ? Za(a) : a;
      }],
      headers: {
        common: {Accept: "application/json, text/plain, */*"},
        post: ua(Zb),
        put: ua(Zb),
        patch: ua(Zb)
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
    },
        a = !1;
    this.useApplyAsync = function(b) {
      return y(b) ? (a = !!b, this) : a;
    };
    var c = this.interceptors = [];
    this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(d, e, f, g, h, k) {
      function l(a) {
        function c(a) {
          var b = C({}, a);
          b.data = a.data ? Vc(a.data, a.headers, d.transformResponse) : a.data;
          a = a.status;
          return 200 <= a && 300 > a ? b : h.reject(b);
        }
        var d = {
          method: "get",
          transformRequest: b.transformRequest,
          transformResponse: b.transformResponse
        },
            e = function(a) {
              var c = b.headers,
                  d = C({}, a.headers),
                  e,
                  f,
                  c = C({}, c.common, c[R(a.method)]);
              a: for (e in c) {
                a = R(e);
                for (f in d)
                  if (R(f) === a)
                    continue a;
                d[e] = c[e];
              }
              (function(a) {
                var b;
                r(a, function(c, d) {
                  F(c) && (b = c(), null != b ? a[d] = b : delete a[d]);
                });
              })(d);
              return d;
            }(a);
        if (!ha.isObject(a))
          throw z("$http")("badreq", a);
        C(d, a);
        d.headers = e;
        d.method = rb(d.method);
        var f = [function(a) {
          e = a.headers;
          var d = Vc(a.data, Uc(e), a.transformRequest);
          G(d) && r(e, function(a, b) {
            "content-type" === R(b) && delete e[b];
          });
          G(a.withCredentials) && !G(b.withCredentials) && (a.withCredentials = b.withCredentials);
          return m(a, d, e).then(c, c);
        }, u],
            g = h.when(d);
        for (r(t, function(a) {
          (a.request || a.requestError) && f.unshift(a.request, a.requestError);
          (a.response || a.responseError) && f.push(a.response, a.responseError);
        }); f.length; ) {
          a = f.shift();
          var k = f.shift(),
              g = g.then(a, k);
        }
        g.success = function(a) {
          g.then(function(b) {
            a(b.data, b.status, b.headers, d);
          });
          return g;
        };
        g.error = function(a) {
          g.then(null, function(b) {
            a(b.data, b.status, b.headers, d);
          });
          return g;
        };
        return g;
      }
      function m(c, f, k) {
        function m(b, c, d, e) {
          function f() {
            w(c, b, d, e);
          }
          M && (200 <= b && 300 > b ? M.put(r, [b, c, Tc(d), e]) : M.remove(r));
          a ? g.$applyAsync(f) : (f(), g.$$phase || g.$apply());
        }
        function w(a, b, d, e) {
          b = Math.max(b, 0);
          (200 <= b && 300 > b ? E.resolve : E.reject)({
            data: a,
            status: b,
            headers: Uc(d),
            config: c,
            statusText: e
          });
        }
        function t() {
          var a = l.pendingRequests.indexOf(c);
          -1 !== a && l.pendingRequests.splice(a, 1);
        }
        var E = h.defer(),
            H = E.promise,
            M,
            B,
            r = p(c.url, c.params);
        l.pendingRequests.push(c);
        H.then(t, t);
        !c.cache && !b.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (M = K(c.cache) ? c.cache : K(b.cache) ? b.cache : s);
        if (M)
          if (B = M.get(r), y(B)) {
            if (B && F(B.then))
              return B.then(t, t), B;
            D(B) ? w(B[1], B[0], ua(B[2]), B[3]) : w(B, 200, {}, "OK");
          } else
            M.put(r, H);
        G(B) && ((B = Wc(c.url) ? e.cookies()[c.xsrfCookieName || b.xsrfCookieName] : u) && (k[c.xsrfHeaderName || b.xsrfHeaderName] = B), d(c.method, r, f, m, k, c.timeout, c.withCredentials, c.responseType));
        return H;
      }
      function p(a, b) {
        if (!b)
          return a;
        var c = [];
        Bd(b, function(a, b) {
          null === a || G(a) || (D(a) || (a = [a]), r(a, function(a) {
            K(a) && (a = fa(a) ? a.toISOString() : Za(a));
            c.push(Da(b) + "=" + Da(a));
          }));
        });
        0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
        return a;
      }
      var s = f("$http"),
          t = [];
      r(c, function(a) {
        t.unshift(I(a) ? k.get(a) : k.invoke(a));
      });
      l.pendingRequests = [];
      (function(a) {
        r(arguments, function(a) {
          l[a] = function(b, c) {
            return l(C(c || {}, {
              method: a,
              url: b
            }));
          };
        });
      })("get", "delete", "head", "jsonp");
      (function(a) {
        r(arguments, function(a) {
          l[a] = function(b, c, d) {
            return l(C(d || {}, {
              method: a,
              url: b,
              data: c
            }));
          };
        });
      })("post", "put", "patch");
      l.defaults = b;
      return l;
    }];
  }
  function sf() {
    return new U.XMLHttpRequest;
  }
  function Ie() {
    this.$get = ["$browser", "$window", "$document", function(b, a, c) {
      return tf(b, sf, b.defer, a.angular.callbacks, c[0]);
    }];
  }
  function tf(b, a, c, d, e) {
    function f(a, b, c) {
      var f = e.createElement("script"),
          m = null;
      f.type = "text/javascript";
      f.src = a;
      f.async = !0;
      m = function(a) {
        f.removeEventListener("load", m, !1);
        f.removeEventListener("error", m, !1);
        e.body.removeChild(f);
        f = null;
        var g = -1,
            t = "unknown";
        a && ("load" !== a.type || d[b].called || (a = {type: "error"}), t = a.type, g = "error" === a.type ? 404 : 200);
        c && c(g, t);
      };
      f.addEventListener("load", m, !1);
      f.addEventListener("error", m, !1);
      e.body.appendChild(f);
      return m;
    }
    return function(e, h, k, l, m, p, s, t) {
      function q() {
        v && v();
        w && w.abort();
      }
      function N(a, d, e, f, g) {
        E && c.cancel(E);
        v = w = null;
        a(d, e, f, g);
        b.$$completeOutstandingRequest(x);
      }
      b.$$incOutstandingRequestCount();
      h = h || b.url();
      if ("jsonp" == R(e)) {
        var n = "_" + (d.counter++).toString(36);
        d[n] = function(a) {
          d[n].data = a;
          d[n].called = !0;
        };
        var v = f(h.replace("JSON_CALLBACK", "angular.callbacks." + n), n, function(a, b) {
          N(l, a, d[n].data, "", b);
          d[n] = x;
        });
      } else {
        var w = a();
        w.open(e, h, !0);
        r(m, function(a, b) {
          y(a) && w.setRequestHeader(b, a);
        });
        w.onload = function() {
          var a = w.statusText || "",
              b = "response" in w ? w.response : w.responseText,
              c = 1223 === w.status ? 204 : w.status;
          0 === c && (c = b ? 200 : "file" == Aa(h).protocol ? 404 : 0);
          N(l, c, b, w.getAllResponseHeaders(), a);
        };
        e = function() {
          N(l, -1, null, null, "");
        };
        w.onerror = e;
        w.onabort = e;
        s && (w.withCredentials = !0);
        if (t)
          try {
            w.responseType = t;
          } catch (O) {
            if ("json" !== t)
              throw O;
          }
        w.send(k || null);
      }
      if (0 < p)
        var E = c(q, p);
      else
        p && F(p.then) && p.then(q);
    };
  }
  function Fe() {
    var b = "{{",
        a = "}}";
    this.startSymbol = function(a) {
      return a ? (b = a, this) : b;
    };
    this.endSymbol = function(b) {
      return b ? (a = b, this) : a;
    };
    this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
      function f(a) {
        return "\\\\\\" + a;
      }
      function g(f, g, t, q) {
        function N(c) {
          return c.replace(l, b).replace(m, a);
        }
        function n(a) {
          try {
            var b = a;
            a = t ? e.getTrusted(t, b) : e.valueOf(b);
            var c;
            if (q && !y(a))
              c = a;
            else if (null == a)
              c = "";
            else {
              switch (typeof a) {
                case "string":
                  break;
                case "number":
                  a = "" + a;
                  break;
                default:
                  a = Za(a);
              }
              c = a;
            }
            return c;
          } catch (g) {
            c = $b("interr", f, g.toString()), d(c);
          }
        }
        q = !!q;
        for (var v,
            w,
            O = 0,
            E = [],
            H = [],
            M = f.length,
            B = [],
            r = []; O < M; )
          if (-1 != (v = f.indexOf(b, O)) && -1 != (w = f.indexOf(a, v + h)))
            O !== v && B.push(N(f.substring(O, v))), O = f.substring(v + h, w), E.push(O), H.push(c(O, n)), O = w + k, r.push(B.length), B.push("");
          else {
            O !== M && B.push(N(f.substring(O)));
            break;
          }
        if (t && 1 < B.length)
          throw $b("noconcat", f);
        if (!g || E.length) {
          var L = function(a) {
            for (var b = 0,
                c = E.length; b < c; b++) {
              if (q && G(a[b]))
                return;
              B[r[b]] = a[b];
            }
            return B.join("");
          };
          return C(function(a) {
            var b = 0,
                c = E.length,
                e = Array(c);
            try {
              for (; b < c; b++)
                e[b] = H[b](a);
              return L(e);
            } catch (g) {
              a = $b("interr", f, g.toString()), d(a);
            }
          }, {
            exp: f,
            expressions: E,
            $$watchDelegate: function(a, b, c) {
              var d;
              return a.$watchGroup(H, function(c, e) {
                var f = L(c);
                F(b) && b.call(this, f, c !== e ? d : f, a);
                d = f;
              }, c);
            }
          });
        }
      }
      var h = b.length,
          k = a.length,
          l = new RegExp(b.replace(/./g, f), "g"),
          m = new RegExp(a.replace(/./g, f), "g");
      g.startSymbol = function() {
        return b;
      };
      g.endSymbol = function() {
        return a;
      };
      return g;
    }];
  }
  function Ge() {
    this.$get = ["$rootScope", "$window", "$q", "$$q", function(b, a, c, d) {
      function e(e, h, k, l) {
        var m = a.setInterval,
            p = a.clearInterval,
            s = 0,
            t = y(l) && !l,
            q = (t ? d : c).defer(),
            N = q.promise;
        k = y(k) ? k : 0;
        N.then(null, null, e);
        N.$$intervalId = m(function() {
          q.notify(s++);
          0 < k && s >= k && (q.resolve(s), p(N.$$intervalId), delete f[N.$$intervalId]);
          t || b.$apply();
        }, h);
        f[N.$$intervalId] = q;
        return N;
      }
      var f = {};
      e.cancel = function(b) {
        return b && b.$$intervalId in f ? (f[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), delete f[b.$$intervalId], !0) : !1;
      };
      return e;
    }];
  }
  function Od() {
    this.$get = function() {
      return {
        id: "en-us",
        NUMBER_FORMATS: {
          DECIMAL_SEP: ".",
          GROUP_SEP: ",",
          PATTERNS: [{
            minInt: 1,
            minFrac: 0,
            maxFrac: 3,
            posPre: "",
            posSuf: "",
            negPre: "-",
            negSuf: "",
            gSize: 3,
            lgSize: 3
          }, {
            minInt: 1,
            minFrac: 2,
            maxFrac: 2,
            posPre: "\u00a4",
            posSuf: "",
            negPre: "(\u00a4",
            negSuf: ")",
            gSize: 3,
            lgSize: 3
          }],
          CURRENCY_SYM: "$"
        },
        DATETIME_FORMATS: {
          MONTH: "January February March April May June July August September October November December".split(" "),
          SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
          DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
          AMPMS: ["AM", "PM"],
          medium: "MMM d, y h:mm:ss a",
          "short": "M/d/yy h:mm a",
          fullDate: "EEEE, MMMM d, y",
          longDate: "MMMM d, y",
          mediumDate: "MMM d, y",
          shortDate: "M/d/yy",
          mediumTime: "h:mm:ss a",
          shortTime: "h:mm a"
        },
        pluralCat: function(b) {
          return 1 === b ? "one" : "other";
        }
      };
    };
  }
  function ac(b) {
    b = b.split("/");
    for (var a = b.length; a--; )
      b[a] = nb(b[a]);
    return b.join("/");
  }
  function Xc(b, a) {
    var c = Aa(b);
    a.$$protocol = c.protocol;
    a.$$host = c.hostname;
    a.$$port = $(c.port) || uf[c.protocol] || null;
  }
  function Yc(b, a) {
    var c = "/" !== b.charAt(0);
    c && (b = "/" + b);
    var d = Aa(b);
    a.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname);
    a.$$search = qc(d.search);
    a.$$hash = decodeURIComponent(d.hash);
    a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
  }
  function xa(b, a) {
    if (0 === a.indexOf(b))
      return a.substr(b.length);
  }
  function Fa(b) {
    var a = b.indexOf("#");
    return -1 == a ? b : b.substr(0, a);
  }
  function bc(b) {
    return b.substr(0, Fa(b).lastIndexOf("/") + 1);
  }
  function cc(b, a) {
    this.$$html5 = !0;
    a = a || "";
    var c = bc(b);
    Xc(b, this);
    this.$$parse = function(a) {
      var b = xa(c, a);
      if (!I(b))
        throw eb("ipthprfx", a, c);
      Yc(b, this);
      this.$$path || (this.$$path = "/");
      this.$$compose();
    };
    this.$$compose = function() {
      var a = Kb(this.$$search),
          b = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (a ? "?" + a : "") + b;
      this.$$absUrl = c + this.$$url.substr(1);
    };
    this.$$parseLinkUrl = function(d, e) {
      if (e && "#" === e[0])
        return this.hash(e.slice(1)), !0;
      var f,
          g;
      (f = xa(b, d)) !== u ? (g = f, g = (f = xa(a, f)) !== u ? c + (xa("/", f) || f) : b + g) : (f = xa(c, d)) !== u ? g = c + f : c == d + "/" && (g = c);
      g && this.$$parse(g);
      return !!g;
    };
  }
  function dc(b, a) {
    var c = bc(b);
    Xc(b, this);
    this.$$parse = function(d) {
      var e = xa(b, d) || xa(c, d),
          e = "#" == e.charAt(0) ? xa(a, e) : this.$$html5 ? e : "";
      if (!I(e))
        throw eb("ihshprfx", d, a);
      Yc(e, this);
      d = this.$$path;
      var f = /^\/[A-Z]:(\/.*)/;
      0 === e.indexOf(b) && (e = e.replace(b, ""));
      f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
      this.$$path = d;
      this.$$compose();
    };
    this.$$compose = function() {
      var c = Kb(this.$$search),
          e = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
      this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
    };
    this.$$parseLinkUrl = function(a, c) {
      return Fa(b) == Fa(a) ? (this.$$parse(a), !0) : !1;
    };
  }
  function Zc(b, a) {
    this.$$html5 = !0;
    dc.apply(this, arguments);
    var c = bc(b);
    this.$$parseLinkUrl = function(d, e) {
      if (e && "#" === e[0])
        return this.hash(e.slice(1)), !0;
      var f,
          g;
      b == Fa(d) ? f = d : (g = xa(c, d)) ? f = b + a + g : c === d + "/" && (f = c);
      f && this.$$parse(f);
      return !!f;
    };
    this.$$compose = function() {
      var c = Kb(this.$$search),
          e = this.$$hash ? "#" + nb(this.$$hash) : "";
      this.$$url = ac(this.$$path) + (c ? "?" + c : "") + e;
      this.$$absUrl = b + a + this.$$url;
    };
  }
  function Bb(b) {
    return function() {
      return this[b];
    };
  }
  function $c(b, a) {
    return function(c) {
      if (G(c))
        return this[b];
      this[b] = a(c);
      this.$$compose();
      return this;
    };
  }
  function Je() {
    var b = "",
        a = {
          enabled: !1,
          requireBase: !0,
          rewriteLinks: !0
        };
    this.hashPrefix = function(a) {
      return y(a) ? (b = a, this) : b;
    };
    this.html5Mode = function(b) {
      return Ua(b) ? (a.enabled = b, this) : K(b) ? (Ua(b.enabled) && (a.enabled = b.enabled), Ua(b.requireBase) && (a.requireBase = b.requireBase), Ua(b.rewriteLinks) && (a.rewriteLinks = b.rewriteLinks), this) : a;
    };
    this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, f) {
      function g(a, b, c) {
        var e = k.url(),
            f = k.$$state;
        try {
          d.url(a, b, c), k.$$state = d.state();
        } catch (g) {
          throw k.url(e), k.$$state = f, g;
        }
      }
      function h(a, b) {
        c.$broadcast("$locationChangeSuccess", k.absUrl(), a, k.$$state, b);
      }
      var k,
          l;
      l = d.baseHref();
      var m = d.url(),
          p;
      if (a.enabled) {
        if (!l && a.requireBase)
          throw eb("nobase");
        p = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (l || "/");
        l = e.history ? cc : Zc;
      } else
        p = Fa(m), l = dc;
      k = new l(p, "#" + b);
      k.$$parseLinkUrl(m, m);
      k.$$state = d.state();
      var s = /^\s*(javascript|mailto):/i;
      f.on("click", function(b) {
        if (a.rewriteLinks && !b.ctrlKey && !b.metaKey && 2 != b.which) {
          for (var e = A(b.target); "a" !== ta(e[0]); )
            if (e[0] === f[0] || !(e = e.parent())[0])
              return;
          var g = e.prop("href"),
              h = e.attr("href") || e.attr("xlink:href");
          K(g) && "[object SVGAnimatedString]" === g.toString() && (g = Aa(g.animVal).href);
          s.test(g) || !g || e.attr("target") || b.isDefaultPrevented() || !k.$$parseLinkUrl(g, h) || (b.preventDefault(), k.absUrl() != d.url() && (c.$apply(), U.angular["ff-684208-preventDefault"] = !0));
        }
      });
      k.absUrl() != m && d.url(k.absUrl(), !0);
      var t = !0;
      d.onUrlChange(function(a, b) {
        c.$evalAsync(function() {
          var d = k.absUrl(),
              e = k.$$state,
              f;
          k.$$parse(a);
          k.$$state = b;
          f = c.$broadcast("$locationChangeStart", a, d, b, e).defaultPrevented;
          k.absUrl() === a && (f ? (k.$$parse(d), k.$$state = e, g(d, !1, e)) : (t = !1, h(d, e)));
        });
        c.$$phase || c.$digest();
      });
      c.$watch(function() {
        var a = d.url(),
            b = d.state(),
            f = k.$$replace,
            l = a !== k.absUrl() || k.$$html5 && e.history && b !== k.$$state;
        if (t || l)
          t = !1, c.$evalAsync(function() {
            var d = k.absUrl(),
                e = c.$broadcast("$locationChangeStart", d, a, k.$$state, b).defaultPrevented;
            k.absUrl() === d && (e ? (k.$$parse(a), k.$$state = b) : (l && g(d, f, b === k.$$state ? null : k.$$state), h(a, b)));
          });
        k.$$replace = !1;
      });
      return k;
    }];
  }
  function Ke() {
    var b = !0,
        a = this;
    this.debugEnabled = function(a) {
      return y(a) ? (b = a, this) : b;
    };
    this.$get = ["$window", function(c) {
      function d(a) {
        a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
        return a;
      }
      function e(a) {
        var b = c.console || {},
            e = b[a] || b.log || x;
        a = !1;
        try {
          a = !!e.apply;
        } catch (k) {}
        return a ? function() {
          var a = [];
          r(arguments, function(b) {
            a.push(d(b));
          });
          return e.apply(b, a);
        } : function(a, b) {
          e(a, null == b ? "" : b);
        };
      }
      return {
        log: e("log"),
        info: e("info"),
        warn: e("warn"),
        error: e("error"),
        debug: function() {
          var c = e("debug");
          return function() {
            b && c.apply(a, arguments);
          };
        }()
      };
    }];
  }
  function ra(b, a) {
    if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b)
      throw la("isecfld", a);
    return b;
  }
  function sa(b, a) {
    if (b) {
      if (b.constructor === b)
        throw la("isecfn", a);
      if (b.window === b)
        throw la("isecwindow", a);
      if (b.children && (b.nodeName || b.prop && b.attr && b.find))
        throw la("isecdom", a);
      if (b === Object)
        throw la("isecobj", a);
    }
    return b;
  }
  function ec(b) {
    return b.constant;
  }
  function Oa(b, a, c, d) {
    sa(b, d);
    a = a.split(".");
    for (var e,
        f = 0; 1 < a.length; f++) {
      e = ra(a.shift(), d);
      var g = sa(b[e], d);
      g || (g = {}, b[e] = g);
      b = g;
    }
    e = ra(a.shift(), d);
    sa(b[e], d);
    return b[e] = c;
  }
  function Pa(b) {
    return "constructor" == b;
  }
  function ad(b, a, c, d, e, f, g) {
    ra(b, f);
    ra(a, f);
    ra(c, f);
    ra(d, f);
    ra(e, f);
    var h = function(a) {
      return sa(a, f);
    },
        k = g || Pa(b) ? h : oa,
        l = g || Pa(a) ? h : oa,
        m = g || Pa(c) ? h : oa,
        p = g || Pa(d) ? h : oa,
        s = g || Pa(e) ? h : oa;
    return function(f, g) {
      var h = g && g.hasOwnProperty(b) ? g : f;
      if (null == h)
        return h;
      h = k(h[b]);
      if (!a)
        return h;
      if (null == h)
        return u;
      h = l(h[a]);
      if (!c)
        return h;
      if (null == h)
        return u;
      h = m(h[c]);
      if (!d)
        return h;
      if (null == h)
        return u;
      h = p(h[d]);
      return e ? null == h ? u : h = s(h[e]) : h;
    };
  }
  function vf(b, a) {
    return function(c, d) {
      return b(c, d, sa, a);
    };
  }
  function bd(b, a, c) {
    var d = a.expensiveChecks,
        e = d ? wf : xf,
        f = e[b];
    if (f)
      return f;
    var g = b.split("."),
        h = g.length;
    if (a.csp)
      f = 6 > h ? ad(g[0], g[1], g[2], g[3], g[4], c, d) : function(a, b) {
        var e = 0,
            f;
        do
          f = ad(g[e++], g[e++], g[e++], g[e++], g[e++], c, d)(a, b), b = u, a = f;
 while (e < h);
        return f;
      };
    else {
      var k = "";
      d && (k += "s = eso(s, fe);\nl = eso(l, fe);\n");
      var l = d;
      r(g, function(a, b) {
        ra(a, c);
        var e = (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a;
        if (d || Pa(a))
          e = "eso(" + e + ", fe)", l = !0;
        k += "if(s == null) return undefined;\ns=" + e + ";\n";
      });
      k += "return s;";
      a = new Function("s", "l", "eso", "fe", k);
      a.toString = ca(k);
      l && (a = vf(a, c));
      f = a;
    }
    f.sharedGetter = !0;
    f.assign = function(a, c) {
      return Oa(a, b, c, b);
    };
    return e[b] = f;
  }
  function fc(b) {
    return F(b.valueOf) ? b.valueOf() : yf.call(b);
  }
  function Le() {
    var b = ia(),
        a = ia();
    this.$get = ["$filter", "$sniffer", function(c, d) {
      function e(a) {
        var b = a;
        a.sharedGetter && (b = function(b, c) {
          return a(b, c);
        }, b.literal = a.literal, b.constant = a.constant, b.assign = a.assign);
        return b;
      }
      function f(a, b) {
        for (var c = 0,
            d = a.length; c < d; c++) {
          var e = a[c];
          e.constant || (e.inputs ? f(e.inputs, b) : -1 === b.indexOf(e) && b.push(e));
        }
        return b;
      }
      function g(a, b) {
        return null == a || null == b ? a === b : "object" === typeof a && (a = fc(a), "object" === typeof a) ? !1 : a === b || a !== a && b !== b;
      }
      function h(a, b, c, d) {
        var e = d.$$inputs || (d.$$inputs = f(d.inputs, [])),
            h;
        if (1 === e.length) {
          var k = g,
              e = e[0];
          return a.$watch(function(a) {
            var b = e(a);
            g(b, k) || (h = d(a), k = b && fc(b));
            return h;
          }, b, c);
        }
        for (var l = [],
            s = 0,
            m = e.length; s < m; s++)
          l[s] = g;
        return a.$watch(function(a) {
          for (var b = !1,
              c = 0,
              f = e.length; c < f; c++) {
            var k = e[c](a);
            if (b || (b = !g(k, l[c])))
              l[c] = k && fc(k);
          }
          b && (h = d(a));
          return h;
        }, b, c);
      }
      function k(a, b, c, d) {
        var e,
            f;
        return e = a.$watch(function(a) {
          return d(a);
        }, function(a, c, d) {
          f = a;
          F(b) && b.apply(this, arguments);
          y(a) && d.$$postDigest(function() {
            y(f) && e();
          });
        }, c);
      }
      function l(a, b, c, d) {
        function e(a) {
          var b = !0;
          r(a, function(a) {
            y(a) || (b = !1);
          });
          return b;
        }
        var f,
            g;
        return f = a.$watch(function(a) {
          return d(a);
        }, function(a, c, d) {
          g = a;
          F(b) && b.call(this, a, c, d);
          e(a) && d.$$postDigest(function() {
            e(g) && f();
          });
        }, c);
      }
      function m(a, b, c, d) {
        var e;
        return e = a.$watch(function(a) {
          return d(a);
        }, function(a, c, d) {
          F(b) && b.apply(this, arguments);
          e();
        }, c);
      }
      function p(a, b) {
        if (!b)
          return a;
        var c = a.$$watchDelegate,
            c = c !== l && c !== k ? function(c, d) {
              var e = a(c, d);
              return b(e, c, d);
            } : function(c, d) {
              var e = a(c, d),
                  f = b(e, c, d);
              return y(e) ? f : e;
            };
        a.$$watchDelegate && a.$$watchDelegate !== h ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = h, c.inputs = [a]);
        return c;
      }
      var s = {
        csp: d.csp,
        expensiveChecks: !1
      },
          t = {
            csp: d.csp,
            expensiveChecks: !0
          };
      return function(d, f, g) {
        var v,
            w,
            O;
        switch (typeof d) {
          case "string":
            O = d = d.trim();
            var E = g ? a : b;
            v = E[O];
            v || (":" === d.charAt(0) && ":" === d.charAt(1) && (w = !0, d = d.substring(2)), g = g ? t : s, v = new gc(g), v = (new fb(v, c, g)).parse(d), v.constant ? v.$$watchDelegate = m : w ? (v = e(v), v.$$watchDelegate = v.literal ? l : k) : v.inputs && (v.$$watchDelegate = h), E[O] = v);
            return p(v, f);
          case "function":
            return p(d, f);
          default:
            return p(x, f);
        }
      };
    }];
  }
  function Ne() {
    this.$get = ["$rootScope", "$exceptionHandler", function(b, a) {
      return cd(function(a) {
        b.$evalAsync(a);
      }, a);
    }];
  }
  function Oe() {
    this.$get = ["$browser", "$exceptionHandler", function(b, a) {
      return cd(function(a) {
        b.defer(a);
      }, a);
    }];
  }
  function cd(b, a) {
    function c(a, b, c) {
      function d(b) {
        return function(c) {
          e || (e = !0, b.call(a, c));
        };
      }
      var e = !1;
      return [d(b), d(c)];
    }
    function d() {
      this.$$state = {status: 0};
    }
    function e(a, b) {
      return function(c) {
        b.call(a, c);
      };
    }
    function f(c) {
      !c.processScheduled && c.pending && (c.processScheduled = !0, b(function() {
        var b,
            d,
            e;
        e = c.pending;
        c.processScheduled = !1;
        c.pending = u;
        for (var f = 0,
            g = e.length; f < g; ++f) {
          d = e[f][0];
          b = e[f][c.status];
          try {
            F(b) ? d.resolve(b(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value);
          } catch (h) {
            d.reject(h), a(h);
          }
        }
      }));
    }
    function g() {
      this.promise = new d;
      this.resolve = e(this, this.resolve);
      this.reject = e(this, this.reject);
      this.notify = e(this, this.notify);
    }
    var h = z("$q", TypeError);
    d.prototype = {
      then: function(a, b, c) {
        var d = new g;
        this.$$state.pending = this.$$state.pending || [];
        this.$$state.pending.push([d, a, b, c]);
        0 < this.$$state.status && f(this.$$state);
        return d.promise;
      },
      "catch": function(a) {
        return this.then(null, a);
      },
      "finally": function(a, b) {
        return this.then(function(b) {
          return l(b, !0, a);
        }, function(b) {
          return l(b, !1, a);
        }, b);
      }
    };
    g.prototype = {
      resolve: function(a) {
        this.promise.$$state.status || (a === this.promise ? this.$$reject(h("qcycle", a)) : this.$$resolve(a));
      },
      $$resolve: function(b) {
        var d,
            e;
        e = c(this, this.$$resolve, this.$$reject);
        try {
          if (K(b) || F(b))
            d = b && b.then;
          F(d) ? (this.promise.$$state.status = -1, d.call(b, e[0], e[1], this.notify)) : (this.promise.$$state.value = b, this.promise.$$state.status = 1, f(this.promise.$$state));
        } catch (g) {
          e[1](g), a(g);
        }
      },
      reject: function(a) {
        this.promise.$$state.status || this.$$reject(a);
      },
      $$reject: function(a) {
        this.promise.$$state.value = a;
        this.promise.$$state.status = 2;
        f(this.promise.$$state);
      },
      notify: function(c) {
        var d = this.promise.$$state.pending;
        0 >= this.promise.$$state.status && d && d.length && b(function() {
          for (var b,
              e,
              f = 0,
              g = d.length; f < g; f++) {
            e = d[f][0];
            b = d[f][3];
            try {
              e.notify(F(b) ? b(c) : c);
            } catch (h) {
              a(h);
            }
          }
        });
      }
    };
    var k = function(a, b) {
      var c = new g;
      b ? c.resolve(a) : c.reject(a);
      return c.promise;
    },
        l = function(a, b, c) {
          var d = null;
          try {
            F(c) && (d = c());
          } catch (e) {
            return k(e, !1);
          }
          return d && F(d.then) ? d.then(function() {
            return k(a, b);
          }, function(a) {
            return k(a, !1);
          }) : k(a, b);
        },
        m = function(a, b, c, d) {
          var e = new g;
          e.resolve(a);
          return e.promise.then(b, c, d);
        },
        p = function t(a) {
          if (!F(a))
            throw h("norslvr", a);
          if (!(this instanceof t))
            return new t(a);
          var b = new g;
          a(function(a) {
            b.resolve(a);
          }, function(a) {
            b.reject(a);
          });
          return b.promise;
        };
    p.defer = function() {
      return new g;
    };
    p.reject = function(a) {
      var b = new g;
      b.reject(a);
      return b.promise;
    };
    p.when = m;
    p.all = function(a) {
      var b = new g,
          c = 0,
          d = D(a) ? [] : {};
      r(a, function(a, e) {
        c++;
        m(a).then(function(a) {
          d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
        }, function(a) {
          d.hasOwnProperty(e) || b.reject(a);
        });
      });
      0 === c && b.resolve(d);
      return b.promise;
    };
    return p;
  }
  function Xe() {
    this.$get = ["$window", "$timeout", function(b, a) {
      var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame,
          d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame,
          e = !!c,
          f = e ? function(a) {
            var b = c(a);
            return function() {
              d(b);
            };
          } : function(b) {
            var c = a(b, 16.66, !1);
            return function() {
              a.cancel(c);
            };
          };
      f.supported = e;
      return f;
    }];
  }
  function Me() {
    var b = 10,
        a = z("$rootScope"),
        c = null,
        d = null;
    this.digestTtl = function(a) {
      arguments.length && (b = a);
      return b;
    };
    this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(e, f, g, h) {
      function k() {
        this.$id = ++kb;
        this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
        this.$root = this;
        this.$$destroyed = !1;
        this.$$listeners = {};
        this.$$listenerCount = {};
        this.$$isolateBindings = null;
      }
      function l(b) {
        if (q.$$phase)
          throw a("inprog", q.$$phase);
        q.$$phase = b;
      }
      function m(a, b, c) {
        do
          a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
 while (a = a.$parent);
      }
      function p() {}
      function s() {
        for (; v.length; )
          try {
            v.shift()();
          } catch (a) {
            f(a);
          }
        d = null;
      }
      function t() {
        null === d && (d = h.defer(function() {
          q.$apply(s);
        }));
      }
      k.prototype = {
        constructor: k,
        $new: function(a, b) {
          function c() {
            d.$$destroyed = !0;
          }
          var d;
          b = b || this;
          a ? (d = new k, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
            this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
            this.$$listeners = {};
            this.$$listenerCount = {};
            this.$id = ++kb;
            this.$$ChildScope = null;
          }, this.$$ChildScope.prototype = this), d = new this.$$ChildScope);
          d.$parent = b;
          d.$$prevSibling = b.$$childTail;
          b.$$childHead ? (b.$$childTail.$$nextSibling = d, b.$$childTail = d) : b.$$childHead = b.$$childTail = d;
          (a || b != this) && d.$on("$destroy", c);
          return d;
        },
        $watch: function(a, b, d) {
          var e = g(a);
          if (e.$$watchDelegate)
            return e.$$watchDelegate(this, b, d, e);
          var f = this.$$watchers,
              h = {
                fn: b,
                last: p,
                get: e,
                exp: a,
                eq: !!d
              };
          c = null;
          F(b) || (h.fn = x);
          f || (f = this.$$watchers = []);
          f.unshift(h);
          return function() {
            Va(f, h);
            c = null;
          };
        },
        $watchGroup: function(a, b) {
          function c() {
            h = !1;
            k ? (k = !1, b(e, e, g)) : b(e, d, g);
          }
          var d = Array(a.length),
              e = Array(a.length),
              f = [],
              g = this,
              h = !1,
              k = !0;
          if (!a.length) {
            var l = !0;
            g.$evalAsync(function() {
              l && b(e, e, g);
            });
            return function() {
              l = !1;
            };
          }
          if (1 === a.length)
            return this.$watch(a[0], function(a, c, f) {
              e[0] = a;
              d[0] = c;
              b(e, a === c ? e : d, f);
            });
          r(a, function(a, b) {
            var k = g.$watch(a, function(a, f) {
              e[b] = a;
              d[b] = f;
              h || (h = !0, g.$evalAsync(c));
            });
            f.push(k);
          });
          return function() {
            for (; f.length; )
              f.shift()();
          };
        },
        $watchCollection: function(a, b) {
          function c(a) {
            e = a;
            var b,
                d,
                g,
                h;
            if (!G(e)) {
              if (K(e))
                if (Ra(e))
                  for (f !== p && (f = p, n = f.length = 0, l++), a = e.length, n !== a && (l++, f.length = n = a), b = 0; b < a; b++)
                    h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g);
                else {
                  f !== s && (f = s = {}, n = 0, l++);
                  a = 0;
                  for (b in e)
                    e.hasOwnProperty(b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (n++, f[b] = g, l++));
                  if (n > a)
                    for (b in l++, f)
                      e.hasOwnProperty(b) || (n--, delete f[b]);
                }
              else
                f !== e && (f = e, l++);
              return l;
            }
          }
          c.$stateful = !0;
          var d = this,
              e,
              f,
              h,
              k = 1 < b.length,
              l = 0,
              m = g(a, c),
              p = [],
              s = {},
              q = !0,
              n = 0;
          return this.$watch(m, function() {
            q ? (q = !1, b(e, e, d)) : b(e, h, d);
            if (k)
              if (K(e))
                if (Ra(e)) {
                  h = Array(e.length);
                  for (var a = 0; a < e.length; a++)
                    h[a] = e[a];
                } else
                  for (a in h = {}, e)
                    Jb.call(e, a) && (h[a] = e[a]);
              else
                h = e;
          });
        },
        $digest: function() {
          var e,
              g,
              k,
              m,
              t,
              v,
              r = b,
              L,
              u = [],
              y,
              Q;
          l("$digest");
          h.$$checkUrlChange();
          this === q && null !== d && (h.defer.cancel(d), s());
          c = null;
          do {
            v = !1;
            for (L = this; N.length; ) {
              try {
                Q = N.shift(), Q.scope.$eval(Q.expression);
              } catch (z) {
                f(z);
              }
              c = null;
            }
            a: do {
              if (m = L.$$watchers)
                for (t = m.length; t--; )
                  try {
                    if (e = m[t])
                      if ((g = e.get(L)) !== (k = e.last) && !(e.eq ? pa(g, k) : "number" === typeof g && "number" === typeof k && isNaN(g) && isNaN(k)))
                        v = !0, c = e, e.last = e.eq ? Ca(g, null) : g, e.fn(g, k === p ? g : k, L), 5 > r && (y = 4 - r, u[y] || (u[y] = []), u[y].push({
                          msg: F(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                          newVal: g,
                          oldVal: k
                        }));
                      else if (e === c) {
                        v = !1;
                        break a;
                      }
                  } catch (A) {
                    f(A);
                  }
              if (!(m = L.$$childHead || L !== this && L.$$nextSibling))
                for (; L !== this && !(m = L.$$nextSibling); )
                  L = L.$parent;
            } while (L = m);
            if ((v || N.length) && !r--)
              throw q.$$phase = null, a("infdig", b, u);
          } while (v || N.length);
          for (q.$$phase = null; n.length; )
            try {
              n.shift()();
            } catch (da) {
              f(da);
            }
        },
        $destroy: function() {
          if (!this.$$destroyed) {
            var a = this.$parent;
            this.$broadcast("$destroy");
            this.$$destroyed = !0;
            if (this !== q) {
              for (var b in this.$$listenerCount)
                m(this, this.$$listenerCount[b], b);
              a.$$childHead == this && (a.$$childHead = this.$$nextSibling);
              a.$$childTail == this && (a.$$childTail = this.$$prevSibling);
              this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);
              this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);
              this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = x;
              this.$on = this.$watch = this.$watchGroup = function() {
                return x;
              };
              this.$$listeners = {};
              this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
            }
          }
        },
        $eval: function(a, b) {
          return g(a)(this, b);
        },
        $evalAsync: function(a) {
          q.$$phase || N.length || h.defer(function() {
            N.length && q.$digest();
          });
          N.push({
            scope: this,
            expression: a
          });
        },
        $$postDigest: function(a) {
          n.push(a);
        },
        $apply: function(a) {
          try {
            return l("$apply"), this.$eval(a);
          } catch (b) {
            f(b);
          } finally {
            q.$$phase = null;
            try {
              q.$digest();
            } catch (c) {
              throw f(c), c;
            }
          }
        },
        $applyAsync: function(a) {
          function b() {
            c.$eval(a);
          }
          var c = this;
          a && v.push(b);
          t();
        },
        $on: function(a, b) {
          var c = this.$$listeners[a];
          c || (this.$$listeners[a] = c = []);
          c.push(b);
          var d = this;
          do
            d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
 while (d = d.$parent);
          var e = this;
          return function() {
            var d = c.indexOf(b);
            -1 !== d && (c[d] = null, m(e, 1, a));
          };
        },
        $emit: function(a, b) {
          var c = [],
              d,
              e = this,
              g = !1,
              h = {
                name: a,
                targetScope: e,
                stopPropagation: function() {
                  g = !0;
                },
                preventDefault: function() {
                  h.defaultPrevented = !0;
                },
                defaultPrevented: !1
              },
              k = Xa([h], arguments, 1),
              l,
              m;
          do {
            d = e.$$listeners[a] || c;
            h.currentScope = e;
            l = 0;
            for (m = d.length; l < m; l++)
              if (d[l])
                try {
                  d[l].apply(null, k);
                } catch (p) {
                  f(p);
                }
              else
                d.splice(l, 1), l--, m--;
            if (g)
              return h.currentScope = null, h;
            e = e.$parent;
          } while (e);
          h.currentScope = null;
          return h;
        },
        $broadcast: function(a, b) {
          var c = this,
              d = this,
              e = {
                name: a,
                targetScope: this,
                preventDefault: function() {
                  e.defaultPrevented = !0;
                },
                defaultPrevented: !1
              };
          if (!this.$$listenerCount[a])
            return e;
          for (var g = Xa([e], arguments, 1),
              h,
              k; c = d; ) {
            e.currentScope = c;
            d = c.$$listeners[a] || [];
            h = 0;
            for (k = d.length; h < k; h++)
              if (d[h])
                try {
                  d[h].apply(null, g);
                } catch (l) {
                  f(l);
                }
              else
                d.splice(h, 1), h--, k--;
            if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling))
              for (; c !== this && !(d = c.$$nextSibling); )
                c = c.$parent;
          }
          e.currentScope = null;
          return e;
        }
      };
      var q = new k,
          N = q.$$asyncQueue = [],
          n = q.$$postDigestQueue = [],
          v = q.$$applyAsyncQueue = [];
      return q;
    }];
  }
  function Pd() {
    var b = /^\s*(https?|ftp|mailto|tel|file):/,
        a = /^\s*((https?|ftp|file|blob):|data:image\/)/;
    this.aHrefSanitizationWhitelist = function(a) {
      return y(a) ? (b = a, this) : b;
    };
    this.imgSrcSanitizationWhitelist = function(b) {
      return y(b) ? (a = b, this) : a;
    };
    this.$get = function() {
      return function(c, d) {
        var e = d ? a : b,
            f;
        f = Aa(c).href;
        return "" === f || f.match(e) ? c : "unsafe:" + f;
      };
    };
  }
  function zf(b) {
    if ("self" === b)
      return b;
    if (I(b)) {
      if (-1 < b.indexOf("***"))
        throw Ba("iwcard", b);
      b = dd(b).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
      return new RegExp("^" + b + "$");
    }
    if (lb(b))
      return new RegExp("^" + b.source + "$");
    throw Ba("imatcher");
  }
  function ed(b) {
    var a = [];
    y(b) && r(b, function(b) {
      a.push(zf(b));
    });
    return a;
  }
  function Qe() {
    this.SCE_CONTEXTS = ma;
    var b = ["self"],
        a = [];
    this.resourceUrlWhitelist = function(a) {
      arguments.length && (b = ed(a));
      return b;
    };
    this.resourceUrlBlacklist = function(b) {
      arguments.length && (a = ed(b));
      return a;
    };
    this.$get = ["$injector", function(c) {
      function d(a, b) {
        return "self" === a ? Wc(b) : !!a.exec(b.href);
      }
      function e(a) {
        var b = function(a) {
          this.$$unwrapTrustedValue = function() {
            return a;
          };
        };
        a && (b.prototype = new a);
        b.prototype.valueOf = function() {
          return this.$$unwrapTrustedValue();
        };
        b.prototype.toString = function() {
          return this.$$unwrapTrustedValue().toString();
        };
        return b;
      }
      var f = function(a) {
        throw Ba("unsafe");
      };
      c.has("$sanitize") && (f = c.get("$sanitize"));
      var g = e(),
          h = {};
      h[ma.HTML] = e(g);
      h[ma.CSS] = e(g);
      h[ma.URL] = e(g);
      h[ma.JS] = e(g);
      h[ma.RESOURCE_URL] = e(h[ma.URL]);
      return {
        trustAs: function(a, b) {
          var c = h.hasOwnProperty(a) ? h[a] : null;
          if (!c)
            throw Ba("icontext", a, b);
          if (null === b || b === u || "" === b)
            return b;
          if ("string" !== typeof b)
            throw Ba("itype", a);
          return new c(b);
        },
        getTrusted: function(c, e) {
          if (null === e || e === u || "" === e)
            return e;
          var g = h.hasOwnProperty(c) ? h[c] : null;
          if (g && e instanceof g)
            return e.$$unwrapTrustedValue();
          if (c === ma.RESOURCE_URL) {
            var g = Aa(e.toString()),
                p,
                s,
                t = !1;
            p = 0;
            for (s = b.length; p < s; p++)
              if (d(b[p], g)) {
                t = !0;
                break;
              }
            if (t)
              for (p = 0, s = a.length; p < s; p++)
                if (d(a[p], g)) {
                  t = !1;
                  break;
                }
            if (t)
              return e;
            throw Ba("insecurl", e.toString());
          }
          if (c === ma.HTML)
            return f(e);
          throw Ba("unsafe");
        },
        valueOf: function(a) {
          return a instanceof g ? a.$$unwrapTrustedValue() : a;
        }
      };
    }];
  }
  function Pe() {
    var b = !0;
    this.enabled = function(a) {
      arguments.length && (b = !!a);
      return b;
    };
    this.$get = ["$parse", "$sceDelegate", function(a, c) {
      if (b && 8 > Ha)
        throw Ba("iequirks");
      var d = ua(ma);
      d.isEnabled = function() {
        return b;
      };
      d.trustAs = c.trustAs;
      d.getTrusted = c.getTrusted;
      d.valueOf = c.valueOf;
      b || (d.trustAs = d.getTrusted = function(a, b) {
        return b;
      }, d.valueOf = oa);
      d.parseAs = function(b, c) {
        var e = a(c);
        return e.literal && e.constant ? e : a(c, function(a) {
          return d.getTrusted(b, a);
        });
      };
      var e = d.parseAs,
          f = d.getTrusted,
          g = d.trustAs;
      r(ma, function(a, b) {
        var c = R(b);
        d[bb("parse_as_" + c)] = function(b) {
          return e(a, b);
        };
        d[bb("get_trusted_" + c)] = function(b) {
          return f(a, b);
        };
        d[bb("trust_as_" + c)] = function(b) {
          return g(a, b);
        };
      });
      return d;
    }];
  }
  function Re() {
    this.$get = ["$window", "$document", function(b, a) {
      var c = {},
          d = $((/android (\d+)/.exec(R((b.navigator || {}).userAgent)) || [])[1]),
          e = /Boxee/i.test((b.navigator || {}).userAgent),
          f = a[0] || {},
          g,
          h = /^(Moz|webkit|ms)(?=[A-Z])/,
          k = f.body && f.body.style,
          l = !1,
          m = !1;
      if (k) {
        for (var p in k)
          if (l = h.exec(p)) {
            g = l[0];
            g = g.substr(0, 1).toUpperCase() + g.substr(1);
            break;
          }
        g || (g = "WebkitOpacity" in k && "webkit");
        l = !!("transition" in k || g + "Transition" in k);
        m = !!("animation" in k || g + "Animation" in k);
        !d || l && m || (l = I(f.body.style.webkitTransition), m = I(f.body.style.webkitAnimation));
      }
      return {
        history: !(!b.history || !b.history.pushState || 4 > d || e),
        hasEvent: function(a) {
          if ("input" == a && 9 == Ha)
            return !1;
          if (G(c[a])) {
            var b = f.createElement("div");
            c[a] = "on" + a in b;
          }
          return c[a];
        },
        csp: $a(),
        vendorPrefix: g,
        transitions: l,
        animations: m,
        android: d
      };
    }];
  }
  function Te() {
    this.$get = ["$templateCache", "$http", "$q", function(b, a, c) {
      function d(e, f) {
        d.totalPendingRequests++;
        var g = a.defaults && a.defaults.transformResponse;
        if (D(g))
          for (var h = g,
              g = [],
              k = 0; k < h.length; ++k) {
            var l = h[k];
            l !== Yb && g.push(l);
          }
        else
          g === Yb && (g = null);
        return a.get(e, {
          cache: b,
          transformResponse: g
        }).then(function(a) {
          a = a.data;
          d.totalPendingRequests--;
          b.put(e, a);
          return a;
        }, function() {
          d.totalPendingRequests--;
          if (!f)
            throw ka("tpload", e);
          return c.reject();
        });
      }
      d.totalPendingRequests = 0;
      return d;
    }];
  }
  function Ue() {
    this.$get = ["$rootScope", "$browser", "$location", function(b, a, c) {
      return {
        findBindings: function(a, b, c) {
          a = a.getElementsByClassName("ng-binding");
          var g = [];
          r(a, function(a) {
            var d = ha.element(a).data("$binding");
            d && r(d, function(d) {
              c ? (new RegExp("(^|\\s)" + dd(b) + "(\\s|\\||$)")).test(d) && g.push(a) : -1 != d.indexOf(b) && g.push(a);
            });
          });
          return g;
        },
        findModels: function(a, b, c) {
          for (var g = ["ng-", "data-ng-", "ng\\:"],
              h = 0; h < g.length; ++h) {
            var k = a.querySelectorAll("[" + g[h] + "model" + (c ? "=" : "*=") + '"' + b + '"]');
            if (k.length)
              return k;
          }
        },
        getLocation: function() {
          return c.url();
        },
        setLocation: function(a) {
          a !== c.url() && (c.url(a), b.$digest());
        },
        whenStable: function(b) {
          a.notifyWhenNoOutstandingRequests(b);
        }
      };
    }];
  }
  function Ve() {
    this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(b, a, c, d, e) {
      function f(f, k, l) {
        var m = y(l) && !l,
            p = (m ? d : c).defer(),
            s = p.promise;
        k = a.defer(function() {
          try {
            p.resolve(f());
          } catch (a) {
            p.reject(a), e(a);
          } finally {
            delete g[s.$$timeoutId];
          }
          m || b.$apply();
        }, k);
        s.$$timeoutId = k;
        g[k] = p;
        return s;
      }
      var g = {};
      f.cancel = function(b) {
        return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject("canceled"), delete g[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1;
      };
      return f;
    }];
  }
  function Aa(b) {
    Ha && (Y.setAttribute("href", b), b = Y.href);
    Y.setAttribute("href", b);
    return {
      href: Y.href,
      protocol: Y.protocol ? Y.protocol.replace(/:$/, "") : "",
      host: Y.host,
      search: Y.search ? Y.search.replace(/^\?/, "") : "",
      hash: Y.hash ? Y.hash.replace(/^#/, "") : "",
      hostname: Y.hostname,
      port: Y.port,
      pathname: "/" === Y.pathname.charAt(0) ? Y.pathname : "/" + Y.pathname
    };
  }
  function Wc(b) {
    b = I(b) ? Aa(b) : b;
    return b.protocol === fd.protocol && b.host === fd.host;
  }
  function We() {
    this.$get = ca(U);
  }
  function Bc(b) {
    function a(c, d) {
      if (K(c)) {
        var e = {};
        r(c, function(b, c) {
          e[c] = a(c, b);
        });
        return e;
      }
      return b.factory(c + "Filter", d);
    }
    this.register = a;
    this.$get = ["$injector", function(a) {
      return function(b) {
        return a.get(b + "Filter");
      };
    }];
    a("currency", gd);
    a("date", hd);
    a("filter", Af);
    a("json", Bf);
    a("limitTo", Cf);
    a("lowercase", Df);
    a("number", id);
    a("orderBy", jd);
    a("uppercase", Ef);
  }
  function Af() {
    return function(b, a, c) {
      if (!D(b))
        return b;
      var d = typeof c,
          e = [];
      e.check = function(a, b) {
        for (var c = 0; c < e.length; c++)
          if (!e[c](a, b))
            return !1;
        return !0;
      };
      "function" !== d && (c = "boolean" === d && c ? function(a, b) {
        return ha.equals(a, b);
      } : function(a, b) {
        if (a && b && "object" === typeof a && "object" === typeof b) {
          for (var d in a)
            if ("$" !== d.charAt(0) && Jb.call(a, d) && c(a[d], b[d]))
              return !0;
          return !1;
        }
        b = ("" + b).toLowerCase();
        return -1 < ("" + a).toLowerCase().indexOf(b);
      });
      var f = function(a, b) {
        if ("string" === typeof b && "!" === b.charAt(0))
          return !f(a, b.substr(1));
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
            return c(a, b);
          case "object":
            switch (typeof b) {
              case "object":
                return c(a, b);
              default:
                for (var d in a)
                  if ("$" !== d.charAt(0) && f(a[d], b))
                    return !0;
            }
            return !1;
          case "array":
            for (d = 0; d < a.length; d++)
              if (f(a[d], b))
                return !0;
            return !1;
          default:
            return !1;
        }
      };
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
          a = {$: a};
        case "object":
          for (var g in a)
            (function(b) {
              "undefined" !== typeof a[b] && e.push(function(c) {
                return f("$" == b ? c : c && c[b], a[b]);
              });
            })(g);
          break;
        case "function":
          e.push(a);
          break;
        default:
          return b;
      }
      d = [];
      for (g = 0; g < b.length; g++) {
        var h = b[g];
        e.check(h, g) && d.push(h);
      }
      return d;
    };
  }
  function gd(b) {
    var a = b.NUMBER_FORMATS;
    return function(b, d, e) {
      G(d) && (d = a.CURRENCY_SYM);
      G(e) && (e = a.PATTERNS[1].maxFrac);
      return null == b ? b : kd(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, e).replace(/\u00A4/g, d);
    };
  }
  function id(b) {
    var a = b.NUMBER_FORMATS;
    return function(b, d) {
      return null == b ? b : kd(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
    };
  }
  function kd(b, a, c, d, e) {
    if (!isFinite(b) || K(b))
      return "";
    var f = 0 > b;
    b = Math.abs(b);
    var g = b + "",
        h = "",
        k = [],
        l = !1;
    if (-1 !== g.indexOf("e")) {
      var m = g.match(/([\d\.]+)e(-?)(\d+)/);
      m && "-" == m[2] && m[3] > e + 1 ? (g = "0", b = 0) : (h = g, l = !0);
    }
    if (l)
      0 < e && -1 < b && 1 > b && (h = b.toFixed(e));
    else {
      g = (g.split(ld)[1] || "").length;
      G(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac));
      b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e);
      0 === b && (f = !1);
      b = ("" + b).split(ld);
      g = b[0];
      b = b[1] || "";
      var m = 0,
          p = a.lgSize,
          s = a.gSize;
      if (g.length >= p + s)
        for (m = g.length - p, l = 0; l < m; l++)
          0 === (m - l) % s && 0 !== l && (h += c), h += g.charAt(l);
      for (l = m; l < g.length; l++)
        0 === (g.length - l) % p && 0 !== l && (h += c), h += g.charAt(l);
      for (; b.length < e; )
        b += "0";
      e && "0" !== e && (h += d + b.substr(0, e));
    }
    k.push(f ? a.negPre : a.posPre, h, f ? a.negSuf : a.posSuf);
    return k.join("");
  }
  function Cb(b, a, c) {
    var d = "";
    0 > b && (d = "-", b = -b);
    for (b = "" + b; b.length < a; )
      b = "0" + b;
    c && (b = b.substr(b.length - a));
    return d + b;
  }
  function Z(b, a, c, d) {
    c = c || 0;
    return function(e) {
      e = e["get" + b]();
      if (0 < c || e > -c)
        e += c;
      0 === e && -12 == c && (e = 12);
      return Cb(e, a, d);
    };
  }
  function Db(b, a) {
    return function(c, d) {
      var e = c["get" + b](),
          f = rb(a ? "SHORT" + b : b);
      return d[f][e];
    };
  }
  function md(b) {
    var a = (new Date(b, 0, 1)).getDay();
    return new Date(b, 0, (4 >= a ? 5 : 12) - a);
  }
  function nd(b) {
    return function(a) {
      var c = md(a.getFullYear());
      a = +new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay())) - +c;
      a = 1 + Math.round(a / 6048E5);
      return Cb(a, b);
    };
  }
  function hd(b) {
    function a(a) {
      var b;
      if (b = a.match(c)) {
        a = new Date(0);
        var f = 0,
            g = 0,
            h = b[8] ? a.setUTCFullYear : a.setFullYear,
            k = b[8] ? a.setUTCHours : a.setHours;
        b[9] && (f = $(b[9] + b[10]), g = $(b[9] + b[11]));
        h.call(a, $(b[1]), $(b[2]) - 1, $(b[3]));
        f = $(b[4] || 0) - f;
        g = $(b[5] || 0) - g;
        h = $(b[6] || 0);
        b = Math.round(1E3 * parseFloat("0." + (b[7] || 0)));
        k.call(a, f, g, h, b);
      }
      return a;
    }
    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function(c, e, f) {
      var g = "",
          h = [],
          k,
          l;
      e = e || "mediumDate";
      e = b.DATETIME_FORMATS[e] || e;
      I(c) && (c = Ff.test(c) ? $(c) : a(c));
      X(c) && (c = new Date(c));
      if (!fa(c))
        return c;
      for (; e; )
        (l = Gf.exec(e)) ? (h = Xa(h, l, 1), e = h.pop()) : (h.push(e), e = null);
      f && "UTC" === f && (c = new Date(c.getTime()), c.setMinutes(c.getMinutes() + c.getTimezoneOffset()));
      r(h, function(a) {
        k = Hf[a];
        g += k ? k(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
      });
      return g;
    };
  }
  function Bf() {
    return function(b) {
      return Za(b, !0);
    };
  }
  function Cf() {
    return function(b, a) {
      X(b) && (b = b.toString());
      if (!D(b) && !I(b))
        return b;
      a = Infinity === Math.abs(Number(a)) ? Number(a) : $(a);
      if (I(b))
        return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : "";
      var c = [],
          d,
          e;
      a > b.length ? a = b.length : a < -b.length && (a = -b.length);
      0 < a ? (d = 0, e = a) : (d = b.length + a, e = b.length);
      for (; d < e; d++)
        c.push(b[d]);
      return c;
    };
  }
  function jd(b) {
    return function(a, c, d) {
      function e(a, b) {
        return b ? function(b, c) {
          return a(c, b);
        } : a;
      }
      function f(a, b) {
        var c = typeof a,
            d = typeof b;
        return c == d ? (fa(a) && fa(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
      }
      if (!Ra(a))
        return a;
      c = D(c) ? c : [c];
      0 === c.length && (c = ["+"]);
      c = c.map(function(a) {
        var c = !1,
            d = a || oa;
        if (I(a)) {
          if ("+" == a.charAt(0) || "-" == a.charAt(0))
            c = "-" == a.charAt(0), a = a.substring(1);
          if ("" === a)
            return e(function(a, b) {
              return f(a, b);
            }, c);
          d = b(a);
          if (d.constant) {
            var l = d();
            return e(function(a, b) {
              return f(a[l], b[l]);
            }, c);
          }
        }
        return e(function(a, b) {
          return f(d(a), d(b));
        }, c);
      });
      return Ya.call(a).sort(e(function(a, b) {
        for (var d = 0; d < c.length; d++) {
          var e = c[d](a, b);
          if (0 !== e)
            return e;
        }
        return 0;
      }, d));
    };
  }
  function Ia(b) {
    F(b) && (b = {link: b});
    b.restrict = b.restrict || "AC";
    return ca(b);
  }
  function od(b, a, c, d, e) {
    var f = this,
        g = [],
        h = f.$$parentForm = b.parent().controller("form") || Eb;
    f.$error = {};
    f.$$success = {};
    f.$pending = u;
    f.$name = e(a.name || a.ngForm || "")(c);
    f.$dirty = !1;
    f.$pristine = !0;
    f.$valid = !0;
    f.$invalid = !1;
    f.$submitted = !1;
    h.$addControl(f);
    f.$rollbackViewValue = function() {
      r(g, function(a) {
        a.$rollbackViewValue();
      });
    };
    f.$commitViewValue = function() {
      r(g, function(a) {
        a.$commitViewValue();
      });
    };
    f.$addControl = function(a) {
      La(a.$name, "input");
      g.push(a);
      a.$name && (f[a.$name] = a);
    };
    f.$$renameControl = function(a, b) {
      var c = a.$name;
      f[c] === a && delete f[c];
      f[b] = a;
      a.$name = b;
    };
    f.$removeControl = function(a) {
      a.$name && f[a.$name] === a && delete f[a.$name];
      r(f.$pending, function(b, c) {
        f.$setValidity(c, null, a);
      });
      r(f.$error, function(b, c) {
        f.$setValidity(c, null, a);
      });
      Va(g, a);
    };
    pd({
      ctrl: this,
      $element: b,
      set: function(a, b, c) {
        var d = a[b];
        d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c];
      },
      unset: function(a, b, c) {
        var d = a[b];
        d && (Va(d, c), 0 === d.length && delete a[b]);
      },
      parentForm: h,
      $animate: d
    });
    f.$setDirty = function() {
      d.removeClass(b, Qa);
      d.addClass(b, Fb);
      f.$dirty = !0;
      f.$pristine = !1;
      h.$setDirty();
    };
    f.$setPristine = function() {
      d.setClass(b, Qa, Fb + " ng-submitted");
      f.$dirty = !1;
      f.$pristine = !0;
      f.$submitted = !1;
      r(g, function(a) {
        a.$setPristine();
      });
    };
    f.$setUntouched = function() {
      r(g, function(a) {
        a.$setUntouched();
      });
    };
    f.$setSubmitted = function() {
      d.addClass(b, "ng-submitted");
      f.$submitted = !0;
      h.$setSubmitted();
    };
  }
  function hc(b) {
    b.$formatters.push(function(a) {
      return b.$isEmpty(a) ? a : a.toString();
    });
  }
  function gb(b, a, c, d, e, f) {
    var g = a[0].placeholder,
        h = {},
        k = R(a[0].type);
    if (!e.android) {
      var l = !1;
      a.on("compositionstart", function(a) {
        l = !0;
      });
      a.on("compositionend", function() {
        l = !1;
        m();
      });
    }
    var m = function(b) {
      if (!l) {
        var e = a.val(),
            f = b && b.type;
        Ha && "input" === (b || h).type && a[0].placeholder !== g ? g = a[0].placeholder : ("password" === k || c.ngTrim && "false" === c.ngTrim || (e = P(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, f));
      }
    };
    if (e.hasEvent("input"))
      a.on("input", m);
    else {
      var p,
          s = function(a) {
            p || (p = f.defer(function() {
              m(a);
              p = null;
            }));
          };
      a.on("keydown", function(a) {
        var b = a.keyCode;
        91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || s(a);
      });
      if (e.hasEvent("paste"))
        a.on("paste cut", s);
    }
    a.on("change", m);
    d.$render = function() {
      a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
    };
  }
  function Gb(b, a) {
    return function(c, d) {
      var e,
          f;
      if (fa(c))
        return c;
      if (I(c)) {
        '"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1));
        if (If.test(c))
          return new Date(c);
        b.lastIndex = 0;
        if (e = b.exec(c))
          return e.shift(), f = d ? {
            yyyy: d.getFullYear(),
            MM: d.getMonth() + 1,
            dd: d.getDate(),
            HH: d.getHours(),
            mm: d.getMinutes(),
            ss: d.getSeconds(),
            sss: d.getMilliseconds() / 1E3
          } : {
            yyyy: 1970,
            MM: 1,
            dd: 1,
            HH: 0,
            mm: 0,
            ss: 0,
            sss: 0
          }, r(e, function(b, c) {
            c < a.length && (f[a[c]] = +b);
          }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1E3 * f.sss || 0);
      }
      return NaN;
    };
  }
  function hb(b, a, c, d) {
    return function(e, f, g, h, k, l, m) {
      function p(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime());
      }
      function s(a) {
        return y(a) ? fa(a) ? a : c(a) : u;
      }
      qd(e, f, g, h);
      gb(e, f, g, h, k, l);
      var t = h && h.$options && h.$options.timezone,
          q;
      h.$$parserName = b;
      h.$parsers.push(function(b) {
        return h.$isEmpty(b) ? null : a.test(b) ? (b = c(b, q), "UTC" === t && b.setMinutes(b.getMinutes() - b.getTimezoneOffset()), b) : u;
      });
      h.$formatters.push(function(a) {
        if (a && !fa(a))
          throw Hb("datefmt", a);
        if (p(a)) {
          if ((q = a) && "UTC" === t) {
            var b = 6E4 * q.getTimezoneOffset();
            q = new Date(q.getTime() + b);
          }
          return m("date")(a, d, t);
        }
        q = null;
        return "";
      });
      if (y(g.min) || g.ngMin) {
        var r;
        h.$validators.min = function(a) {
          return !p(a) || G(r) || c(a) >= r;
        };
        g.$observe("min", function(a) {
          r = s(a);
          h.$validate();
        });
      }
      if (y(g.max) || g.ngMax) {
        var n;
        h.$validators.max = function(a) {
          return !p(a) || G(n) || c(a) <= n;
        };
        g.$observe("max", function(a) {
          n = s(a);
          h.$validate();
        });
      }
    };
  }
  function qd(b, a, c, d) {
    (d.$$hasNativeValidators = K(a[0].validity)) && d.$parsers.push(function(b) {
      var c = a.prop("validity") || {};
      return c.badInput && !c.typeMismatch ? u : b;
    });
  }
  function rd(b, a, c, d, e) {
    if (y(d)) {
      b = b(d);
      if (!b.constant)
        throw z("ngModel")("constexpr", c, d);
      return b(a);
    }
    return e;
  }
  function pd(b) {
    function a(a, b) {
      b && !f[a] ? (l.addClass(e, a), f[a] = !0) : !b && f[a] && (l.removeClass(e, a), f[a] = !1);
    }
    function c(b, c) {
      b = b ? "-" + Mb(b, "-") : "";
      a(ib + b, !0 === c);
      a(sd + b, !1 === c);
    }
    var d = b.ctrl,
        e = b.$element,
        f = {},
        g = b.set,
        h = b.unset,
        k = b.parentForm,
        l = b.$animate;
    f[sd] = !(f[ib] = e.hasClass(ib));
    d.$setValidity = function(b, e, f) {
      e === u ? (d.$pending || (d.$pending = {}), g(d.$pending, b, f)) : (d.$pending && h(d.$pending, b, f), td(d.$pending) && (d.$pending = u));
      Ua(e) ? e ? (h(d.$error, b, f), g(d.$$success, b, f)) : (g(d.$error, b, f), h(d.$$success, b, f)) : (h(d.$error, b, f), h(d.$$success, b, f));
      d.$pending ? (a(ud, !0), d.$valid = d.$invalid = u, c("", null)) : (a(ud, !1), d.$valid = td(d.$error), d.$invalid = !d.$valid, c("", d.$valid));
      e = d.$pending && d.$pending[b] ? u : d.$error[b] ? !1 : d.$$success[b] ? !0 : null;
      c(b, e);
      k.$setValidity(b, e, d);
    };
  }
  function td(b) {
    if (b)
      for (var a in b)
        return !1;
    return !0;
  }
  function ic(b, a) {
    b = "ngClass" + b;
    return ["$animate", function(c) {
      function d(a, b) {
        var c = [],
            d = 0;
        a: for (; d < a.length; d++) {
          for (var e = a[d],
              m = 0; m < b.length; m++)
            if (e == b[m])
              continue a;
          c.push(e);
        }
        return c;
      }
      function e(a) {
        if (!D(a)) {
          if (I(a))
            return a.split(" ");
          if (K(a)) {
            var b = [];
            r(a, function(a, c) {
              a && (b = b.concat(c.split(" ")));
            });
            return b;
          }
        }
        return a;
      }
      return {
        restrict: "AC",
        link: function(f, g, h) {
          function k(a, b) {
            var c = g.data("$classCounts") || {},
                d = [];
            r(a, function(a) {
              if (0 < b || c[a])
                c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
            });
            g.data("$classCounts", c);
            return d.join(" ");
          }
          function l(b) {
            if (!0 === a || f.$index % 2 === a) {
              var l = e(b || []);
              if (!m) {
                var t = k(l, 1);
                h.$addClass(t);
              } else if (!pa(b, m)) {
                var q = e(m),
                    t = d(l, q),
                    l = d(q, l),
                    t = k(t, 1),
                    l = k(l, -1);
                t && t.length && c.addClass(g, t);
                l && l.length && c.removeClass(g, l);
              }
            }
            m = ua(b);
          }
          var m;
          f.$watch(h[b], l, !0);
          h.$observe("class", function(a) {
            l(f.$eval(h[b]));
          });
          "ngClass" !== b && f.$watch("$index", function(c, d) {
            var g = c & 1;
            if (g !== (d & 1)) {
              var l = e(f.$eval(h[b]));
              g === a ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g));
            }
          });
        }
      };
    }];
  }
  var Jf = /^\/(.+)\/([a-z]*)$/,
      R = function(b) {
        return I(b) ? b.toLowerCase() : b;
      },
      Jb = Object.prototype.hasOwnProperty,
      rb = function(b) {
        return I(b) ? b.toUpperCase() : b;
      },
      Ha,
      A,
      qa,
      Ya = [].slice,
      of = [].splice,
      Kf = [].push,
      Ja = Object.prototype.toString,
      Wa = z("ng"),
      ha = U.angular || (U.angular = {}),
      ab,
      kb = 0;
  Ha = V.documentMode;
  x.$inject = [];
  oa.$inject = [];
  var D = Array.isArray,
      P = function(b) {
        return I(b) ? b.trim() : b;
      },
      dd = function(b) {
        return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
      },
      $a = function() {
        if (y($a.isActive_))
          return $a.isActive_;
        var b = !(!V.querySelector("[ng-csp]") && !V.querySelector("[data-ng-csp]"));
        if (!b)
          try {
            new Function("");
          } catch (a) {
            b = !0;
          }
        return $a.isActive_ = b;
      },
      ob = ["ng-", "data-ng-", "ng:", "x-ng-"],
      Jd = /[A-Z]/g,
      sc = !1,
      Nb,
      na = 1,
      mb = 3,
      Nd = {
        full: "1.3.4",
        major: 1,
        minor: 3,
        dot: 4,
        codeName: "highfalutin-petroglyph"
      };
  S.expando = "ng339";
  var wb = S.cache = {},
      df = 1;
  S._data = function(b) {
    return this.cache[b[this.expando]] || {};
  };
  var Ze = /([\:\-\_]+(.))/g,
      $e = /^moz([A-Z])/,
      Lf = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
      },
      Qb = z("jqLite"),
      cf = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      Pb = /<|&#?\w+;/,
      af = /<([\w:]+)/,
      bf = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      ja = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
  ja.optgroup = ja.option;
  ja.tbody = ja.tfoot = ja.colgroup = ja.caption = ja.thead;
  ja.th = ja.td;
  var Ka = S.prototype = {
    ready: function(b) {
      function a() {
        c || (c = !0, b());
      }
      var c = !1;
      "complete" === V.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), S(U).on("load", a));
    },
    toString: function() {
      var b = [];
      r(this, function(a) {
        b.push("" + a);
      });
      return "[" + b.join(", ") + "]";
    },
    eq: function(b) {
      return 0 <= b ? A(this[b]) : A(this[this.length + b]);
    },
    length: 0,
    push: Kf,
    sort: [].sort,
    splice: [].splice
  },
      yb = {};
  r("multiple selected checked disabled readOnly required open".split(" "), function(b) {
    yb[R(b)] = b;
  });
  var Kc = {};
  r("input select option textarea button form details".split(" "), function(b) {
    Kc[b] = !0;
  });
  var Lc = {
    ngMinlength: "minlength",
    ngMaxlength: "maxlength",
    ngMin: "min",
    ngMax: "max",
    ngPattern: "pattern"
  };
  r({
    data: Sb,
    removeData: ub
  }, function(b, a) {
    S[a] = b;
  });
  r({
    data: Sb,
    inheritedData: xb,
    scope: function(b) {
      return A.data(b, "$scope") || xb(b.parentNode || b, ["$isolateScope", "$scope"]);
    },
    isolateScope: function(b) {
      return A.data(b, "$isolateScope") || A.data(b, "$isolateScopeNoTemplate");
    },
    controller: Gc,
    injector: function(b) {
      return xb(b, "$injector");
    },
    removeAttr: function(b, a) {
      b.removeAttribute(a);
    },
    hasClass: Tb,
    css: function(b, a, c) {
      a = bb(a);
      if (y(c))
        b.style[a] = c;
      else
        return b.style[a];
    },
    attr: function(b, a, c) {
      var d = R(a);
      if (yb[d])
        if (y(c))
          c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d));
        else
          return b[a] || (b.attributes.getNamedItem(a) || x).specified ? d : u;
      else if (y(c))
        b.setAttribute(a, c);
      else if (b.getAttribute)
        return b = b.getAttribute(a, 2), null === b ? u : b;
    },
    prop: function(b, a, c) {
      if (y(c))
        b[a] = c;
      else
        return b[a];
    },
    text: function() {
      function b(a, b) {
        if (G(b)) {
          var d = a.nodeType;
          return d === na || d === mb ? a.textContent : "";
        }
        a.textContent = b;
      }
      b.$dv = "";
      return b;
    }(),
    val: function(b, a) {
      if (G(a)) {
        if (b.multiple && "select" === ta(b)) {
          var c = [];
          r(b.options, function(a) {
            a.selected && c.push(a.value || a.text);
          });
          return 0 === c.length ? null : c;
        }
        return b.value;
      }
      b.value = a;
    },
    html: function(b, a) {
      if (G(a))
        return b.innerHTML;
      tb(b, !0);
      b.innerHTML = a;
    },
    empty: Hc
  }, function(b, a) {
    S.prototype[a] = function(a, d) {
      var e,
          f,
          g = this.length;
      if (b !== Hc && (2 == b.length && b !== Tb && b !== Gc ? a : d) === u) {
        if (K(a)) {
          for (e = 0; e < g; e++)
            if (b === Sb)
              b(this[e], a);
            else
              for (f in a)
                b(this[e], f, a[f]);
          return this;
        }
        e = b.$dv;
        g = e === u ? Math.min(g, 1) : g;
        for (f = 0; f < g; f++) {
          var h = b(this[f], a, d);
          e = e ? e + h : h;
        }
        return e;
      }
      for (e = 0; e < g; e++)
        b(this[e], a, d);
      return this;
    };
  });
  r({
    removeData: ub,
    on: function a(c, d, e, f) {
      if (y(f))
        throw Qb("onargs");
      if (Cc(c)) {
        var g = vb(c, !0);
        f = g.events;
        var h = g.handle;
        h || (h = g.handle = gf(c, f));
        for (var g = 0 <= d.indexOf(" ") ? d.split(" ") : [d],
            k = g.length; k--; ) {
          d = g[k];
          var l = f[d];
          l || (f[d] = [], "mouseenter" === d || "mouseleave" === d ? a(c, Lf[d], function(a) {
            var c = a.relatedTarget;
            c && (c === this || this.contains(c)) || h(a, d);
          }) : "$destroy" !== d && c.addEventListener(d, h, !1), l = f[d]);
          l.push(e);
        }
      }
    },
    off: Fc,
    one: function(a, c, d) {
      a = A(a);
      a.on(c, function f() {
        a.off(c, d);
        a.off(c, f);
      });
      a.on(c, d);
    },
    replaceWith: function(a, c) {
      var d,
          e = a.parentNode;
      tb(a);
      r(new S(c), function(c) {
        d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
        d = c;
      });
    },
    children: function(a) {
      var c = [];
      r(a.childNodes, function(a) {
        a.nodeType === na && c.push(a);
      });
      return c;
    },
    contents: function(a) {
      return a.contentDocument || a.childNodes || [];
    },
    append: function(a, c) {
      var d = a.nodeType;
      if (d === na || 11 === d) {
        c = new S(c);
        for (var d = 0,
            e = c.length; d < e; d++)
          a.appendChild(c[d]);
      }
    },
    prepend: function(a, c) {
      if (a.nodeType === na) {
        var d = a.firstChild;
        r(new S(c), function(c) {
          a.insertBefore(c, d);
        });
      }
    },
    wrap: function(a, c) {
      c = A(c).eq(0).clone()[0];
      var d = a.parentNode;
      d && d.replaceChild(c, a);
      c.appendChild(a);
    },
    remove: Ic,
    detach: function(a) {
      Ic(a, !0);
    },
    after: function(a, c) {
      var d = a,
          e = a.parentNode;
      c = new S(c);
      for (var f = 0,
          g = c.length; f < g; f++) {
        var h = c[f];
        e.insertBefore(h, d.nextSibling);
        d = h;
      }
    },
    addClass: Vb,
    removeClass: Ub,
    toggleClass: function(a, c, d) {
      c && r(c.split(" "), function(c) {
        var f = d;
        G(f) && (f = !Tb(a, c));
        (f ? Vb : Ub)(a, c);
      });
    },
    parent: function(a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    },
    next: function(a) {
      return a.nextElementSibling;
    },
    find: function(a, c) {
      return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
    },
    clone: Rb,
    triggerHandler: function(a, c, d) {
      var e,
          f,
          g = c.type || c,
          h = vb(a);
      if (h = (h = h && h.events) && h[g])
        e = {
          preventDefault: function() {
            this.defaultPrevented = !0;
          },
          isDefaultPrevented: function() {
            return !0 === this.defaultPrevented;
          },
          stopImmediatePropagation: function() {
            this.immediatePropagationStopped = !0;
          },
          isImmediatePropagationStopped: function() {
            return !0 === this.immediatePropagationStopped;
          },
          stopPropagation: x,
          type: g,
          target: a
        }, c.type && (e = C(e, c)), c = ua(h), f = d ? [e].concat(d) : [e], r(c, function(c) {
          e.isImmediatePropagationStopped() || c.apply(a, f);
        });
    }
  }, function(a, c) {
    S.prototype[c] = function(c, e, f) {
      for (var g,
          h = 0,
          k = this.length; h < k; h++)
        G(g) ? (g = a(this[h], c, e, f), y(g) && (g = A(g))) : Ec(g, a(this[h], c, e, f));
      return y(g) ? g : this;
    };
    S.prototype.bind = S.prototype.on;
    S.prototype.unbind = S.prototype.off;
  });
  cb.prototype = {
    put: function(a, c) {
      this[Ma(a, this.nextUid)] = c;
    },
    get: function(a) {
      return this[Ma(a, this.nextUid)];
    },
    remove: function(a) {
      var c = this[a = Ma(a, this.nextUid)];
      delete this[a];
      return c;
    }
  };
  var Nc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      jf = /,/,
      kf = /^\s*(_?)(\S+?)\1\s*$/,
      Mc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      Ea = z("$injector");
  Lb.$$annotate = Wb;
  var Mf = z("$animate"),
      ze = ["$provide", function(a) {
        this.$$selectors = {};
        this.register = function(c, d) {
          var e = c + "-animation";
          if (c && "." != c.charAt(0))
            throw Mf("notcsel", c);
          this.$$selectors[c.substr(1)] = e;
          a.factory(e, d);
        };
        this.classNameFilter = function(a) {
          1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
          return this.$$classNameFilter;
        };
        this.$get = ["$$q", "$$asyncCallback", "$rootScope", function(a, d, e) {
          function f(d) {
            var f,
                g = a.defer();
            g.promise.$$cancelFn = function() {
              f && f();
            };
            e.$$postDigest(function() {
              f = d(function() {
                g.resolve();
              });
            });
            return g.promise;
          }
          function g(a, c) {
            var d = [],
                e = [],
                f = ia();
            r((a.attr("class") || "").split(/\s+/), function(a) {
              f[a] = !0;
            });
            r(c, function(a, c) {
              var g = f[c];
              !1 === a && g ? e.push(c) : !0 !== a || g || d.push(c);
            });
            return 0 < d.length + e.length && [d.length ? d : null, e.length ? e : null];
          }
          function h(a, c, d) {
            for (var e = 0,
                f = c.length; e < f; ++e)
              a[c[e]] = d;
          }
          function k() {
            m || (m = a.defer(), d(function() {
              m.resolve();
              m = null;
            }));
            return m.promise;
          }
          function l(a, c) {
            if (ha.isObject(c)) {
              var d = C(c.from || {}, c.to || {});
              a.css(d);
            }
          }
          var m;
          return {
            animate: function(a, c, d) {
              l(a, {
                from: c,
                to: d
              });
              return k();
            },
            enter: function(a, c, d, e) {
              l(a, e);
              d ? d.after(a) : c.prepend(a);
              return k();
            },
            leave: function(a, c) {
              a.remove();
              return k();
            },
            move: function(a, c, d, e) {
              return this.enter(a, c, d, e);
            },
            addClass: function(a, c, d) {
              return this.setClass(a, c, [], d);
            },
            $$addClassImmediately: function(a, c, d) {
              a = A(a);
              c = I(c) ? c : D(c) ? c.join(" ") : "";
              r(a, function(a) {
                Vb(a, c);
              });
              l(a, d);
              return k();
            },
            removeClass: function(a, c, d) {
              return this.setClass(a, [], c, d);
            },
            $$removeClassImmediately: function(a, c, d) {
              a = A(a);
              c = I(c) ? c : D(c) ? c.join(" ") : "";
              r(a, function(a) {
                Ub(a, c);
              });
              l(a, d);
              return k();
            },
            setClass: function(a, c, d, e) {
              var k = this,
                  l = !1;
              a = A(a);
              var m = a.data("$$animateClasses");
              m ? e && m.options && (m.options = ha.extend(m.options || {}, e)) : (m = {
                classes: {},
                options: e
              }, l = !0);
              e = m.classes;
              c = D(c) ? c : c.split(" ");
              d = D(d) ? d : d.split(" ");
              h(e, c, !0);
              h(e, d, !1);
              l && (m.promise = f(function(c) {
                var d = a.data("$$animateClasses");
                a.removeData("$$animateClasses");
                if (d) {
                  var e = g(a, d.classes);
                  e && k.$$setClassImmediately(a, e[0], e[1], d.options);
                }
                c();
              }), a.data("$$animateClasses", m));
              return m.promise;
            },
            $$setClassImmediately: function(a, c, d, e) {
              c && this.$$addClassImmediately(a, c);
              d && this.$$removeClassImmediately(a, d);
              l(a, e);
              return k();
            },
            enabled: x,
            cancel: x
          };
        }];
      }],
      ka = z("$compile");
  uc.$inject = ["$provide", "$$sanitizeUriProvider"];
  var nf = /^((?:x|data)[\:\-_])/i,
      Sc = "application/json",
      Zb = {"Content-Type": Sc + ";charset=utf-8"},
      qf = /^\s*(\[|\{[^\{])/,
      rf = /[\}\]]\s*$/,
      pf = /^\)\]\}',?\n/,
      $b = z("$interpolate"),
      Nf = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
      uf = {
        http: 80,
        https: 443,
        ftp: 21
      },
      eb = z("$location"),
      Of = {
        $$html5: !1,
        $$replace: !1,
        absUrl: Bb("$$absUrl"),
        url: function(a) {
          if (G(a))
            return this.$$url;
          var c = Nf.exec(a);
          (c[1] || "" === a) && this.path(decodeURIComponent(c[1]));
          (c[2] || c[1] || "" === a) && this.search(c[3] || "");
          this.hash(c[5] || "");
          return this;
        },
        protocol: Bb("$$protocol"),
        host: Bb("$$host"),
        port: Bb("$$port"),
        path: $c("$$path", function(a) {
          a = null !== a ? a.toString() : "";
          return "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, c) {
          switch (arguments.length) {
            case 0:
              return this.$$search;
            case 1:
              if (I(a) || X(a))
                a = a.toString(), this.$$search = qc(a);
              else if (K(a))
                a = Ca(a, {}), r(a, function(c, e) {
                  null == c && delete a[e];
                }), this.$$search = a;
              else
                throw eb("isrcharg");
              break;
            default:
              G(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
          }
          this.$$compose();
          return this;
        },
        hash: $c("$$hash", function(a) {
          return null !== a ? a.toString() : "";
        }),
        replace: function() {
          this.$$replace = !0;
          return this;
        }
      };
  r([Zc, dc, cc], function(a) {
    a.prototype = Object.create(Of);
    a.prototype.state = function(c) {
      if (!arguments.length)
        return this.$$state;
      if (a !== cc || !this.$$html5)
        throw eb("nostate");
      this.$$state = G(c) ? null : c;
      return this;
    };
  });
  var la = z("$parse"),
      Pf = Function.prototype.call,
      Qf = Function.prototype.apply,
      Rf = Function.prototype.bind,
      Ib = ia();
  r({
    "null": function() {
      return null;
    },
    "true": function() {
      return !0;
    },
    "false": function() {
      return !1;
    },
    undefined: function() {}
  }, function(a, c) {
    a.constant = a.literal = a.sharedGetter = !0;
    Ib[c] = a;
  });
  Ib["this"] = function(a) {
    return a;
  };
  Ib["this"].sharedGetter = !0;
  var jb = C(ia(), {
    "+": function(a, c, d, e) {
      d = d(a, c);
      e = e(a, c);
      return y(d) ? y(e) ? d + e : d : y(e) ? e : u;
    },
    "-": function(a, c, d, e) {
      d = d(a, c);
      e = e(a, c);
      return (y(d) ? d : 0) - (y(e) ? e : 0);
    },
    "*": function(a, c, d, e) {
      return d(a, c) * e(a, c);
    },
    "/": function(a, c, d, e) {
      return d(a, c) / e(a, c);
    },
    "%": function(a, c, d, e) {
      return d(a, c) % e(a, c);
    },
    "===": function(a, c, d, e) {
      return d(a, c) === e(a, c);
    },
    "!==": function(a, c, d, e) {
      return d(a, c) !== e(a, c);
    },
    "==": function(a, c, d, e) {
      return d(a, c) == e(a, c);
    },
    "!=": function(a, c, d, e) {
      return d(a, c) != e(a, c);
    },
    "<": function(a, c, d, e) {
      return d(a, c) < e(a, c);
    },
    ">": function(a, c, d, e) {
      return d(a, c) > e(a, c);
    },
    "<=": function(a, c, d, e) {
      return d(a, c) <= e(a, c);
    },
    ">=": function(a, c, d, e) {
      return d(a, c) >= e(a, c);
    },
    "&&": function(a, c, d, e) {
      return d(a, c) && e(a, c);
    },
    "||": function(a, c, d, e) {
      return d(a, c) || e(a, c);
    },
    "!": function(a, c, d) {
      return !d(a, c);
    },
    "=": !0,
    "|": !0
  }),
      Sf = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "\t",
        v: "\v",
        "'": "'",
        '"': '"'
      },
      gc = function(a) {
        this.options = a;
      };
  gc.prototype = {
    constructor: gc,
    lex: function(a) {
      this.text = a;
      this.index = 0;
      for (this.tokens = []; this.index < this.text.length; )
        if (a = this.text.charAt(this.index), '"' === a || "'" === a)
          this.readString(a);
        else if (this.isNumber(a) || "." === a && this.isNumber(this.peek()))
          this.readNumber();
        else if (this.isIdent(a))
          this.readIdent();
        else if (this.is(a, "(){}[].,;:?"))
          this.tokens.push({
            index: this.index,
            text: a
          }), this.index++;
        else if (this.isWhitespace(a))
          this.index++;
        else {
          var c = a + this.peek(),
              d = c + this.peek(2),
              e = jb[c],
              f = jb[d];
          jb[a] || e || f ? (a = f ? d : e ? c : a, this.tokens.push({
            index: this.index,
            text: a,
            operator: !0
          }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
        }
      return this.tokens;
    },
    is: function(a, c) {
      return -1 !== c.indexOf(a);
    },
    peek: function(a) {
      a = a || 1;
      return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
    },
    isNumber: function(a) {
      return "0" <= a && "9" >= a && "string" === typeof a;
    },
    isWhitespace: function(a) {
      return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\u00a0" === a;
    },
    isIdent: function(a) {
      return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
    },
    isExpOperator: function(a) {
      return "-" === a || "+" === a || this.isNumber(a);
    },
    throwError: function(a, c, d) {
      d = d || this.index;
      c = y(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d;
      throw la("lexerr", a, c, this.text);
    },
    readNumber: function() {
      for (var a = "",
          c = this.index; this.index < this.text.length; ) {
        var d = R(this.text.charAt(this.index));
        if ("." == d || this.isNumber(d))
          a += d;
        else {
          var e = this.peek();
          if ("e" == d && this.isExpOperator(e))
            a += d;
          else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1))
            a += d;
          else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1))
            break;
          else
            this.throwError("Invalid exponent");
        }
        this.index++;
      }
      this.tokens.push({
        index: c,
        text: a,
        constant: !0,
        value: Number(a)
      });
    },
    readIdent: function() {
      for (var a = this.index; this.index < this.text.length; ) {
        var c = this.text.charAt(this.index);
        if (!this.isIdent(c) && !this.isNumber(c))
          break;
        this.index++;
      }
      this.tokens.push({
        index: a,
        text: this.text.slice(a, this.index),
        identifier: !0
      });
    },
    readString: function(a) {
      var c = this.index;
      this.index++;
      for (var d = "",
          e = a,
          f = !1; this.index < this.text.length; ) {
        var g = this.text.charAt(this.index),
            e = e + g;
        if (f)
          "u" === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Sf[g] || g, f = !1;
        else if ("\\" === g)
          f = !0;
        else {
          if (g === a) {
            this.index++;
            this.tokens.push({
              index: c,
              text: e,
              constant: !0,
              value: d
            });
            return;
          }
          d += g;
        }
        this.index++;
      }
      this.throwError("Unterminated quote", c);
    }
  };
  var fb = function(a, c, d) {
    this.lexer = a;
    this.$filter = c;
    this.options = d;
  };
  fb.ZERO = C(function() {
    return 0;
  }, {
    sharedGetter: !0,
    constant: !0
  });
  fb.prototype = {
    constructor: fb,
    parse: function(a) {
      this.text = a;
      this.tokens = this.lexer.lex(a);
      a = this.statements();
      0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
      a.literal = !!a.literal;
      a.constant = !!a.constant;
      return a;
    },
    primary: function() {
      var a;
      this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
      for (var c,
          d; c = this.expect("(", "[", "."); )
        "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
      return a;
    },
    throwError: function(a, c) {
      throw la("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
    },
    peekToken: function() {
      if (0 === this.tokens.length)
        throw la("ueoe", this.text);
      return this.tokens[0];
    },
    peek: function(a, c, d, e) {
      return this.peekAhead(0, a, c, d, e);
    },
    peekAhead: function(a, c, d, e, f) {
      if (this.tokens.length > a) {
        a = this.tokens[a];
        var g = a.text;
        if (g === c || g === d || g === e || g === f || !(c || d || e || f))
          return a;
      }
      return !1;
    },
    expect: function(a, c, d, e) {
      return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
    },
    consume: function(a) {
      if (0 === this.tokens.length)
        throw la("ueoe", this.text);
      var c = this.expect(a);
      c || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
      return c;
    },
    unaryFn: function(a, c) {
      var d = jb[a];
      return C(function(a, f) {
        return d(a, f, c);
      }, {
        constant: c.constant,
        inputs: [c]
      });
    },
    binaryFn: function(a, c, d, e) {
      var f = jb[c];
      return C(function(c, e) {
        return f(c, e, a, d);
      }, {
        constant: a.constant && d.constant,
        inputs: !e && [a, d]
      });
    },
    identifier: function() {
      for (var a = this.consume().text; this.peek(".") && this.peekAhead(1).identifier && !this.peekAhead(2, "("); )
        a += this.consume().text + this.consume().text;
      return Ib[a] || bd(a, this.options, this.text);
    },
    constant: function() {
      var a = this.consume().value;
      return C(function() {
        return a;
      }, {
        constant: !0,
        literal: !0
      });
    },
    statements: function() {
      for (var a = []; ; )
        if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";"))
          return 1 === a.length ? a[0] : function(c, d) {
            for (var e,
                f = 0,
                g = a.length; f < g; f++)
              e = a[f](c, d);
            return e;
          };
    },
    filterChain: function() {
      for (var a = this.expression(); this.expect("|"); )
        a = this.filter(a);
      return a;
    },
    filter: function(a) {
      var c = this.$filter(this.consume().text),
          d,
          e;
      if (this.peek(":"))
        for (d = [], e = []; this.expect(":"); )
          d.push(this.expression());
      var f = [a].concat(d || []);
      return C(function(f, h) {
        var k = a(f, h);
        if (e) {
          e[0] = k;
          for (k = d.length; k--; )
            e[k + 1] = d[k](f, h);
          return c.apply(u, e);
        }
        return c(k);
      }, {
        constant: !c.$stateful && f.every(ec),
        inputs: !c.$stateful && f
      });
    },
    expression: function() {
      return this.assignment();
    },
    assignment: function() {
      var a = this.ternary(),
          c,
          d;
      return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), c = this.ternary(), C(function(d, f) {
        return a.assign(d, c(d, f), f);
      }, {inputs: [a, c]})) : a;
    },
    ternary: function() {
      var a = this.logicalOR(),
          c;
      if (this.expect("?") && (c = this.assignment(), this.consume(":"))) {
        var d = this.assignment();
        return C(function(e, f) {
          return a(e, f) ? c(e, f) : d(e, f);
        }, {constant: a.constant && c.constant && d.constant});
      }
      return a;
    },
    logicalOR: function() {
      for (var a = this.logicalAND(),
          c; c = this.expect("||"); )
        a = this.binaryFn(a, c.text, this.logicalAND(), !0);
      return a;
    },
    logicalAND: function() {
      var a = this.equality(),
          c;
      if (c = this.expect("&&"))
        a = this.binaryFn(a, c.text, this.logicalAND(), !0);
      return a;
    },
    equality: function() {
      var a = this.relational(),
          c;
      if (c = this.expect("==", "!=", "===", "!=="))
        a = this.binaryFn(a, c.text, this.equality());
      return a;
    },
    relational: function() {
      var a = this.additive(),
          c;
      if (c = this.expect("<", ">", "<=", ">="))
        a = this.binaryFn(a, c.text, this.relational());
      return a;
    },
    additive: function() {
      for (var a = this.multiplicative(),
          c; c = this.expect("+", "-"); )
        a = this.binaryFn(a, c.text, this.multiplicative());
      return a;
    },
    multiplicative: function() {
      for (var a = this.unary(),
          c; c = this.expect("*", "/", "%"); )
        a = this.binaryFn(a, c.text, this.unary());
      return a;
    },
    unary: function() {
      var a;
      return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(fb.ZERO, a.text, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.text, this.unary()) : this.primary();
    },
    fieldAccess: function(a) {
      var c = this.text,
          d = this.consume().text,
          e = bd(d, this.options, c);
      return C(function(c, d, h) {
        return e(h || a(c, d));
      }, {assign: function(e, g, h) {
          (h = a(e, h)) || a.assign(e, h = {});
          return Oa(h, d, g, c);
        }});
    },
    objectIndex: function(a) {
      var c = this.text,
          d = this.expression();
      this.consume("]");
      return C(function(e, f) {
        var g = a(e, f),
            h = d(e, f);
        ra(h, c);
        return g ? sa(g[h], c) : u;
      }, {assign: function(e, f, g) {
          var h = ra(d(e, g), c);
          (g = sa(a(e, g), c)) || a.assign(e, g = {});
          return g[h] = f;
        }});
    },
    functionCall: function(a, c) {
      var d = [];
      if (")" !== this.peekToken().text) {
        do
          d.push(this.expression());
 while (this.expect(","));
      }
      this.consume(")");
      var e = this.text,
          f = d.length ? [] : null;
      return function(g, h) {
        var k = c ? c(g, h) : g,
            l = a(g, h, k) || x;
        if (f)
          for (var m = d.length; m--; )
            f[m] = sa(d[m](g, h), e);
        sa(k, e);
        if (l) {
          if (l.constructor === l)
            throw la("isecfn", e);
          if (l === Pf || l === Qf || l === Rf)
            throw la("isecff", e);
        }
        k = l.apply ? l.apply(k, f) : l(f[0], f[1], f[2], f[3], f[4]);
        return sa(k, e);
      };
    },
    arrayDeclaration: function() {
      var a = [];
      if ("]" !== this.peekToken().text) {
        do {
          if (this.peek("]"))
            break;
          a.push(this.expression());
        } while (this.expect(","));
      }
      this.consume("]");
      return C(function(c, d) {
        for (var e = [],
            f = 0,
            g = a.length; f < g; f++)
          e.push(a[f](c, d));
        return e;
      }, {
        literal: !0,
        constant: a.every(ec),
        inputs: a
      });
    },
    object: function() {
      var a = [],
          c = [];
      if ("}" !== this.peekToken().text) {
        do {
          if (this.peek("}"))
            break;
          var d = this.consume();
          d.constant ? a.push(d.value) : d.identifier ? a.push(d.text) : this.throwError("invalid key", d);
          this.consume(":");
          c.push(this.expression());
        } while (this.expect(","));
      }
      this.consume("}");
      return C(function(d, f) {
        for (var g = {},
            h = 0,
            k = c.length; h < k; h++)
          g[a[h]] = c[h](d, f);
        return g;
      }, {
        literal: !0,
        constant: c.every(ec),
        inputs: c
      });
    }
  };
  var xf = ia(),
      wf = ia(),
      yf = Object.prototype.valueOf,
      Ba = z("$sce"),
      ma = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
      },
      ka = z("$compile"),
      Y = V.createElement("a"),
      fd = Aa(U.location.href);
  Bc.$inject = ["$provide"];
  gd.$inject = ["$locale"];
  id.$inject = ["$locale"];
  var ld = ".",
      Hf = {
        yyyy: Z("FullYear", 4),
        yy: Z("FullYear", 2, 0, !0),
        y: Z("FullYear", 1),
        MMMM: Db("Month"),
        MMM: Db("Month", !0),
        MM: Z("Month", 2, 1),
        M: Z("Month", 1, 1),
        dd: Z("Date", 2),
        d: Z("Date", 1),
        HH: Z("Hours", 2),
        H: Z("Hours", 1),
        hh: Z("Hours", 2, -12),
        h: Z("Hours", 1, -12),
        mm: Z("Minutes", 2),
        m: Z("Minutes", 1),
        ss: Z("Seconds", 2),
        s: Z("Seconds", 1),
        sss: Z("Milliseconds", 3),
        EEEE: Db("Day"),
        EEE: Db("Day", !0),
        a: function(a, c) {
          return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
          a = -1 * a.getTimezoneOffset();
          return a = (0 <= a ? "+" : "") + (Cb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Cb(Math.abs(a % 60), 2));
        },
        ww: nd(2),
        w: nd(1)
      },
      Gf = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
      Ff = /^\-?\d+$/;
  hd.$inject = ["$locale"];
  var Df = ca(R),
      Ef = ca(rb);
  jd.$inject = ["$parse"];
  var Qd = ca({
    restrict: "E",
    compile: function(a, c) {
      if (!c.href && !c.xlinkHref && !c.name)
        return function(a, c) {
          var f = "[object SVGAnimatedString]" === Ja.call(c.prop("href")) ? "xlink:href" : "href";
          c.on("click", function(a) {
            c.attr(f) || a.preventDefault();
          });
        };
    }
  }),
      sb = {};
  r(yb, function(a, c) {
    if ("multiple" != a) {
      var d = wa("ng-" + c);
      sb[d] = function() {
        return {
          restrict: "A",
          priority: 100,
          link: function(a, f, g) {
            a.$watch(g[d], function(a) {
              g.$set(c, !!a);
            });
          }
        };
      };
    }
  });
  r(Lc, function(a, c) {
    sb[c] = function() {
      return {
        priority: 100,
        link: function(a, e, f) {
          if ("ngPattern" === c && "/" == f.ngPattern.charAt(0) && (e = f.ngPattern.match(Jf))) {
            f.$set("ngPattern", new RegExp(e[1], e[2]));
            return;
          }
          a.$watch(f[c], function(a) {
            f.$set(c, a);
          });
        }
      };
    };
  });
  r(["src", "srcset", "href"], function(a) {
    var c = wa("ng-" + a);
    sb[c] = function() {
      return {
        priority: 99,
        link: function(d, e, f) {
          var g = a,
              h = a;
          "href" === a && "[object SVGAnimatedString]" === Ja.call(e.prop("href")) && (h = "xlinkHref", f.$attr[h] = "xlink:href", g = null);
          f.$observe(c, function(c) {
            c ? (f.$set(h, c), Ha && g && e.prop(g, f[h])) : "href" === a && f.$set(h, null);
          });
        }
      };
    };
  });
  var Eb = {
    $addControl: x,
    $$renameControl: function(a, c) {
      a.$name = c;
    },
    $removeControl: x,
    $setValidity: x,
    $setDirty: x,
    $setPristine: x,
    $setSubmitted: x
  };
  od.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
  var vd = function(a) {
    return ["$timeout", function(c) {
      return {
        name: "form",
        restrict: a ? "EAC" : "E",
        controller: od,
        compile: function(a) {
          a.addClass(Qa).addClass(ib);
          return {pre: function(a, d, g, h) {
              if (!("action" in g)) {
                var k = function(c) {
                  a.$apply(function() {
                    h.$commitViewValue();
                    h.$setSubmitted();
                  });
                  c.preventDefault();
                };
                d[0].addEventListener("submit", k, !1);
                d.on("$destroy", function() {
                  c(function() {
                    d[0].removeEventListener("submit", k, !1);
                  }, 0, !1);
                });
              }
              var l = h.$$parentForm,
                  m = h.$name;
              m && (Oa(a, m, h, m), g.$observe(g.name ? "name" : "ngForm", function(c) {
                m !== c && (Oa(a, m, u, m), m = c, Oa(a, m, h, m), l.$$renameControl(h, m));
              }));
              d.on("$destroy", function() {
                l.$removeControl(h);
                m && Oa(a, m, u, m);
                C(h, Eb);
              });
            }};
        }
      };
    }];
  },
      Rd = vd(),
      de = vd(!0),
      If = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
      Tf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
      Uf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
      Vf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
      wd = /^(\d{4})-(\d{2})-(\d{2})$/,
      xd = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      jc = /^(\d{4})-W(\d\d)$/,
      yd = /^(\d{4})-(\d\d)$/,
      zd = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      Wf = /(\s+|^)default(\s+|$)/,
      Hb = new z("ngModel"),
      Ad = {
        text: function(a, c, d, e, f, g) {
          gb(a, c, d, e, f, g);
          hc(e);
        },
        date: hb("date", wd, Gb(wd, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
        "datetime-local": hb("datetimelocal", xd, Gb(xd, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: hb("time", zd, Gb(zd, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
        week: hb("week", jc, function(a, c) {
          if (fa(a))
            return a;
          if (I(a)) {
            jc.lastIndex = 0;
            var d = jc.exec(a);
            if (d) {
              var e = +d[1],
                  f = +d[2],
                  g = d = 0,
                  h = 0,
                  k = 0,
                  l = md(e),
                  f = 7 * (f - 1);
              c && (d = c.getHours(), g = c.getMinutes(), h = c.getSeconds(), k = c.getMilliseconds());
              return new Date(e, 0, l.getDate() + f, d, g, h, k);
            }
          }
          return NaN;
        }, "yyyy-Www"),
        month: hb("month", yd, Gb(yd, ["yyyy", "MM"]), "yyyy-MM"),
        number: function(a, c, d, e, f, g) {
          qd(a, c, d, e);
          gb(a, c, d, e, f, g);
          e.$$parserName = "number";
          e.$parsers.push(function(a) {
            return e.$isEmpty(a) ? null : Vf.test(a) ? parseFloat(a) : u;
          });
          e.$formatters.push(function(a) {
            if (!e.$isEmpty(a)) {
              if (!X(a))
                throw Hb("numfmt", a);
              a = a.toString();
            }
            return a;
          });
          if (d.min || d.ngMin) {
            var h;
            e.$validators.min = function(a) {
              return e.$isEmpty(a) || G(h) || a >= h;
            };
            d.$observe("min", function(a) {
              y(a) && !X(a) && (a = parseFloat(a, 10));
              h = X(a) && !isNaN(a) ? a : u;
              e.$validate();
            });
          }
          if (d.max || d.ngMax) {
            var k;
            e.$validators.max = function(a) {
              return e.$isEmpty(a) || G(k) || a <= k;
            };
            d.$observe("max", function(a) {
              y(a) && !X(a) && (a = parseFloat(a, 10));
              k = X(a) && !isNaN(a) ? a : u;
              e.$validate();
            });
          }
        },
        url: function(a, c, d, e, f, g) {
          gb(a, c, d, e, f, g);
          hc(e);
          e.$$parserName = "url";
          e.$validators.url = function(a, c) {
            var d = a || c;
            return e.$isEmpty(d) || Tf.test(d);
          };
        },
        email: function(a, c, d, e, f, g) {
          gb(a, c, d, e, f, g);
          hc(e);
          e.$$parserName = "email";
          e.$validators.email = function(a, c) {
            var d = a || c;
            return e.$isEmpty(d) || Uf.test(d);
          };
        },
        radio: function(a, c, d, e) {
          G(d.name) && c.attr("name", ++kb);
          c.on("click", function(a) {
            c[0].checked && e.$setViewValue(d.value, a && a.type);
          });
          e.$render = function() {
            c[0].checked = d.value == e.$viewValue;
          };
          d.$observe("value", e.$render);
        },
        checkbox: function(a, c, d, e, f, g, h, k) {
          var l = rd(k, a, "ngTrueValue", d.ngTrueValue, !0),
              m = rd(k, a, "ngFalseValue", d.ngFalseValue, !1);
          c.on("click", function(a) {
            e.$setViewValue(c[0].checked, a && a.type);
          });
          e.$render = function() {
            c[0].checked = e.$viewValue;
          };
          e.$isEmpty = function(a) {
            return !1 === a;
          };
          e.$formatters.push(function(a) {
            return pa(a, l);
          });
          e.$parsers.push(function(a) {
            return a ? l : m;
          });
        },
        hidden: x,
        button: x,
        submit: x,
        reset: x,
        file: x
      },
      vc = ["$browser", "$sniffer", "$filter", "$parse", function(a, c, d, e) {
        return {
          restrict: "E",
          require: ["?ngModel"],
          link: {pre: function(f, g, h, k) {
              k[0] && (Ad[R(h.type)] || Ad.text)(f, g, h, k[0], c, a, d, e);
            }}
        };
      }],
      ib = "ng-valid",
      sd = "ng-invalid",
      Qa = "ng-pristine",
      Fb = "ng-dirty",
      ud = "ng-pending",
      Xf = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, c, d, e, f, g, h, k, l, m) {
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$$rawModelValue = u;
        this.$validators = {};
        this.$asyncValidators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = !0;
        this.$touched = !1;
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$error = {};
        this.$$success = {};
        this.$pending = u;
        this.$name = m(d.name || "", !1)(a);
        var p = f(d.ngModel),
            s = p.assign,
            t = p,
            q = s,
            N = null,
            n = this;
        this.$$setOptions = function(a) {
          if ((n.$options = a) && a.getterSetter) {
            var c = f(d.ngModel + "()"),
                g = f(d.ngModel + "($$$p)");
            t = function(a) {
              var d = p(a);
              F(d) && (d = c(a));
              return d;
            };
            q = function(a, c) {
              F(p(a)) ? g(a, {$$$p: n.$modelValue}) : s(a, n.$modelValue);
            };
          } else if (!p.assign)
            throw Hb("nonassign", d.ngModel, va(e));
        };
        this.$render = x;
        this.$isEmpty = function(a) {
          return G(a) || "" === a || null === a || a !== a;
        };
        var v = e.inheritedData("$formController") || Eb,
            w = 0;
        pd({
          ctrl: this,
          $element: e,
          set: function(a, c) {
            a[c] = !0;
          },
          unset: function(a, c) {
            delete a[c];
          },
          parentForm: v,
          $animate: g
        });
        this.$setPristine = function() {
          n.$dirty = !1;
          n.$pristine = !0;
          g.removeClass(e, Fb);
          g.addClass(e, Qa);
        };
        this.$setDirty = function() {
          n.$dirty = !0;
          n.$pristine = !1;
          g.removeClass(e, Qa);
          g.addClass(e, Fb);
          v.$setDirty();
        };
        this.$setUntouched = function() {
          n.$touched = !1;
          n.$untouched = !0;
          g.setClass(e, "ng-untouched", "ng-touched");
        };
        this.$setTouched = function() {
          n.$touched = !0;
          n.$untouched = !1;
          g.setClass(e, "ng-touched", "ng-untouched");
        };
        this.$rollbackViewValue = function() {
          h.cancel(N);
          n.$viewValue = n.$$lastCommittedViewValue;
          n.$render();
        };
        this.$validate = function() {
          if (!X(n.$modelValue) || !isNaN(n.$modelValue)) {
            var a = n.$$rawModelValue,
                c = n.$valid,
                d = n.$modelValue,
                e = n.$options && n.$options.allowInvalid;
            n.$$runValidators(n.$error[n.$$parserName || "parse"] ? !1 : u, a, n.$$lastCommittedViewValue, function(f) {
              e || c === f || (n.$modelValue = f ? a : u, n.$modelValue !== d && n.$$writeModelToScope());
            });
          }
        };
        this.$$runValidators = function(a, c, d, e) {
          function f() {
            var a = !0;
            r(n.$validators, function(e, f) {
              var g = e(c, d);
              a = a && g;
              h(f, g);
            });
            return a ? !0 : (r(n.$asyncValidators, function(a, c) {
              h(c, null);
            }), !1);
          }
          function g() {
            var a = [],
                e = !0;
            r(n.$asyncValidators, function(f, g) {
              var k = f(c, d);
              if (!k || !F(k.then))
                throw Hb("$asyncValidators", k);
              h(g, u);
              a.push(k.then(function() {
                h(g, !0);
              }, function(a) {
                e = !1;
                h(g, !1);
              }));
            });
            a.length ? l.all(a).then(function() {
              k(e);
            }, x) : k(!0);
          }
          function h(a, c) {
            m === w && n.$setValidity(a, c);
          }
          function k(a) {
            m === w && e(a);
          }
          w++;
          var m = w;
          (function(a) {
            var c = n.$$parserName || "parse";
            if (a === u)
              h(c, null);
            else if (h(c, a), !a)
              return r(n.$validators, function(a, c) {
                h(c, null);
              }), r(n.$asyncValidators, function(a, c) {
                h(c, null);
              }), !1;
            return !0;
          })(a) ? f() ? g() : k(!1) : k(!1);
        };
        this.$commitViewValue = function() {
          var a = n.$viewValue;
          h.cancel(N);
          if (n.$$lastCommittedViewValue !== a || "" === a && n.$$hasNativeValidators)
            n.$$lastCommittedViewValue = a, n.$pristine && this.$setDirty(), this.$$parseAndValidate();
        };
        this.$$parseAndValidate = function() {
          var c = n.$$lastCommittedViewValue,
              d = c,
              e = G(d) ? u : !0;
          if (e)
            for (var f = 0; f < n.$parsers.length; f++)
              if (d = n.$parsers[f](d), G(d)) {
                e = !1;
                break;
              }
          X(n.$modelValue) && isNaN(n.$modelValue) && (n.$modelValue = t(a));
          var g = n.$modelValue,
              h = n.$options && n.$options.allowInvalid;
          n.$$rawModelValue = d;
          h && (n.$modelValue = d, n.$modelValue !== g && n.$$writeModelToScope());
          n.$$runValidators(e, d, c, function(a) {
            h || (n.$modelValue = a ? d : u, n.$modelValue !== g && n.$$writeModelToScope());
          });
        };
        this.$$writeModelToScope = function() {
          q(a, n.$modelValue);
          r(n.$viewChangeListeners, function(a) {
            try {
              a();
            } catch (d) {
              c(d);
            }
          });
        };
        this.$setViewValue = function(a, c) {
          n.$viewValue = a;
          n.$options && !n.$options.updateOnDefault || n.$$debounceViewValueCommit(c);
        };
        this.$$debounceViewValueCommit = function(c) {
          var d = 0,
              e = n.$options;
          e && y(e.debounce) && (e = e.debounce, X(e) ? d = e : X(e[c]) ? d = e[c] : X(e["default"]) && (d = e["default"]));
          h.cancel(N);
          d ? N = h(function() {
            n.$commitViewValue();
          }, d) : k.$$phase ? n.$commitViewValue() : a.$apply(function() {
            n.$commitViewValue();
          });
        };
        a.$watch(function() {
          var c = t(a);
          if (c !== n.$modelValue) {
            n.$modelValue = n.$$rawModelValue = c;
            for (var d = n.$formatters,
                e = d.length,
                f = c; e--; )
              f = d[e](f);
            n.$viewValue !== f && (n.$viewValue = n.$$lastCommittedViewValue = f, n.$render(), n.$$runValidators(u, c, f, x));
          }
          return c;
        });
      }],
      se = ["$rootScope", function(a) {
        return {
          restrict: "A",
          require: ["ngModel", "^?form", "^?ngModelOptions"],
          controller: Xf,
          priority: 1,
          compile: function(c) {
            c.addClass(Qa).addClass("ng-untouched").addClass(ib);
            return {
              pre: function(a, c, f, g) {
                var h = g[0],
                    k = g[1] || Eb;
                h.$$setOptions(g[2] && g[2].$options);
                k.$addControl(h);
                f.$observe("name", function(a) {
                  h.$name !== a && k.$$renameControl(h, a);
                });
                a.$on("$destroy", function() {
                  k.$removeControl(h);
                });
              },
              post: function(c, e, f, g) {
                var h = g[0];
                if (h.$options && h.$options.updateOn)
                  e.on(h.$options.updateOn, function(a) {
                    h.$$debounceViewValueCommit(a && a.type);
                  });
                e.on("blur", function(e) {
                  h.$touched || (a.$$phase ? c.$evalAsync(h.$setTouched) : c.$apply(h.$setTouched));
                });
              }
            };
          }
        };
      }],
      ue = ca({
        restrict: "A",
        require: "ngModel",
        link: function(a, c, d, e) {
          e.$viewChangeListeners.push(function() {
            a.$eval(d.ngChange);
          });
        }
      }),
      xc = function() {
        return {
          restrict: "A",
          require: "?ngModel",
          link: function(a, c, d, e) {
            e && (d.required = !0, e.$validators.required = function(a, c) {
              return !d.required || !e.$isEmpty(c);
            }, d.$observe("required", function() {
              e.$validate();
            }));
          }
        };
      },
      wc = function() {
        return {
          restrict: "A",
          require: "?ngModel",
          link: function(a, c, d, e) {
            if (e) {
              var f,
                  g = d.ngPattern || d.pattern;
              d.$observe("pattern", function(a) {
                I(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));
                if (a && !a.test)
                  throw z("ngPattern")("noregexp", g, a, va(c));
                f = a || u;
                e.$validate();
              });
              e.$validators.pattern = function(a) {
                return e.$isEmpty(a) || G(f) || f.test(a);
              };
            }
          }
        };
      },
      zc = function() {
        return {
          restrict: "A",
          require: "?ngModel",
          link: function(a, c, d, e) {
            if (e) {
              var f = -1;
              d.$observe("maxlength", function(a) {
                a = $(a);
                f = isNaN(a) ? -1 : a;
                e.$validate();
              });
              e.$validators.maxlength = function(a, c) {
                return 0 > f || e.$isEmpty(a) || c.length <= f;
              };
            }
          }
        };
      },
      yc = function() {
        return {
          restrict: "A",
          require: "?ngModel",
          link: function(a, c, d, e) {
            if (e) {
              var f = 0;
              d.$observe("minlength", function(a) {
                f = $(a) || 0;
                e.$validate();
              });
              e.$validators.minlength = function(a, c) {
                return e.$isEmpty(c) || c.length >= f;
              };
            }
          }
        };
      },
      te = function() {
        return {
          restrict: "A",
          priority: 100,
          require: "ngModel",
          link: function(a, c, d, e) {
            var f = c.attr(d.$attr.ngList) || ", ",
                g = "false" !== d.ngTrim,
                h = g ? P(f) : f;
            e.$parsers.push(function(a) {
              if (!G(a)) {
                var c = [];
                a && r(a.split(h), function(a) {
                  a && c.push(g ? P(a) : a);
                });
                return c;
              }
            });
            e.$formatters.push(function(a) {
              return D(a) ? a.join(f) : u;
            });
            e.$isEmpty = function(a) {
              return !a || !a.length;
            };
          }
        };
      },
      Yf = /^(true|false|\d+)$/,
      ve = function() {
        return {
          restrict: "A",
          priority: 100,
          compile: function(a, c) {
            return Yf.test(c.ngValue) ? function(a, c, f) {
              f.$set("value", a.$eval(f.ngValue));
            } : function(a, c, f) {
              a.$watch(f.ngValue, function(a) {
                f.$set("value", a);
              });
            };
          }
        };
      },
      we = function() {
        return {
          restrict: "A",
          controller: ["$scope", "$attrs", function(a, c) {
            var d = this;
            this.$options = a.$eval(c.ngModelOptions);
            this.$options.updateOn !== u ? (this.$options.updateOnDefault = !1, this.$options.updateOn = P(this.$options.updateOn.replace(Wf, function() {
              d.$options.updateOnDefault = !0;
              return " ";
            }))) : this.$options.updateOnDefault = !0;
          }]
        };
      },
      Wd = ["$compile", function(a) {
        return {
          restrict: "AC",
          compile: function(c) {
            a.$$addBindingClass(c);
            return function(c, e, f) {
              a.$$addBindingInfo(e, f.ngBind);
              e = e[0];
              c.$watch(f.ngBind, function(a) {
                e.textContent = a === u ? "" : a;
              });
            };
          }
        };
      }],
      Yd = ["$interpolate", "$compile", function(a, c) {
        return {compile: function(d) {
            c.$$addBindingClass(d);
            return function(d, f, g) {
              d = a(f.attr(g.$attr.ngBindTemplate));
              c.$$addBindingInfo(f, d.expressions);
              f = f[0];
              g.$observe("ngBindTemplate", function(a) {
                f.textContent = a === u ? "" : a;
              });
            };
          }};
      }],
      Xd = ["$sce", "$parse", "$compile", function(a, c, d) {
        return {
          restrict: "A",
          compile: function(e, f) {
            var g = c(f.ngBindHtml),
                h = c(f.ngBindHtml, function(a) {
                  return (a || "").toString();
                });
            d.$$addBindingClass(e);
            return function(c, e, f) {
              d.$$addBindingInfo(e, f.ngBindHtml);
              c.$watch(h, function() {
                e.html(a.getTrustedHtml(g(c)) || "");
              });
            };
          }
        };
      }],
      Zd = ic("", !0),
      ae = ic("Odd", 0),
      $d = ic("Even", 1),
      be = Ia({compile: function(a, c) {
          c.$set("ngCloak", u);
          a.removeClass("ng-cloak");
        }}),
      ce = [function() {
        return {
          restrict: "A",
          scope: !0,
          controller: "@",
          priority: 500
        };
      }],
      Ac = {},
      Zf = {
        blur: !0,
        focus: !0
      };
  r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
    var c = wa("ng-" + a);
    Ac[c] = ["$parse", "$rootScope", function(d, e) {
      return {
        restrict: "A",
        compile: function(f, g) {
          var h = d(g[c], null, !0);
          return function(c, d) {
            d.on(a, function(d) {
              var f = function() {
                h(c, {$event: d});
              };
              Zf[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f);
            });
          };
        }
      };
    }];
  });
  var fe = ["$animate", function(a) {
    return {
      multiElement: !0,
      transclude: "element",
      priority: 600,
      terminal: !0,
      restrict: "A",
      $$tlb: !0,
      link: function(c, d, e, f, g) {
        var h,
            k,
            l;
        c.$watch(e.ngIf, function(c) {
          c ? k || g(function(c, f) {
            k = f;
            c[c.length++] = V.createComment(" end ngIf: " + e.ngIf + " ");
            h = {clone: c};
            a.enter(c, d.parent(), d);
          }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = qb(h.clone), a.leave(l).then(function() {
            l = null;
          }), h = null));
        });
      }
    };
  }],
      ge = ["$templateRequest", "$anchorScroll", "$animate", "$sce", function(a, c, d, e) {
        return {
          restrict: "ECA",
          priority: 400,
          terminal: !0,
          transclude: "element",
          controller: ha.noop,
          compile: function(f, g) {
            var h = g.ngInclude || g.src,
                k = g.onload || "",
                l = g.autoscroll;
            return function(f, g, s, r, q) {
              var u = 0,
                  n,
                  v,
                  w,
                  O = function() {
                    v && (v.remove(), v = null);
                    n && (n.$destroy(), n = null);
                    w && (d.leave(w).then(function() {
                      v = null;
                    }), v = w, w = null);
                  };
              f.$watch(e.parseAsResourceUrl(h), function(e) {
                var h = function() {
                  !y(l) || l && !f.$eval(l) || c();
                },
                    s = ++u;
                e ? (a(e, !0).then(function(a) {
                  if (s === u) {
                    var c = f.$new();
                    r.template = a;
                    a = q(c, function(a) {
                      O();
                      d.enter(a, null, g).then(h);
                    });
                    n = c;
                    w = a;
                    n.$emit("$includeContentLoaded", e);
                    f.$eval(k);
                  }
                }, function() {
                  s === u && (O(), f.$emit("$includeContentError", e));
                }), f.$emit("$includeContentRequested", e)) : (O(), r.template = null);
              });
            };
          }
        };
      }],
      xe = ["$compile", function(a) {
        return {
          restrict: "ECA",
          priority: -400,
          require: "ngInclude",
          link: function(c, d, e, f) {
            /SVG/.test(d[0].toString()) ? (d.empty(), a(Dc(f.template, V).childNodes)(c, function(a) {
              d.append(a);
            }, {futureParentElement: d})) : (d.html(f.template), a(d.contents())(c));
          }
        };
      }],
      he = Ia({
        priority: 450,
        compile: function() {
          return {pre: function(a, c, d) {
              a.$eval(d.ngInit);
            }};
        }
      }),
      ie = Ia({
        terminal: !0,
        priority: 1E3
      }),
      je = ["$locale", "$interpolate", function(a, c) {
        var d = /{}/g,
            e = /^when(Minus)?(.+)$/;
        return {
          restrict: "EA",
          link: function(f, g, h) {
            function k(a) {
              g.text(a || "");
            }
            var l = h.count,
                m = h.$attr.when && g.attr(h.$attr.when),
                p = h.offset || 0,
                s = f.$eval(m) || {},
                t = {},
                m = c.startSymbol(),
                q = c.endSymbol(),
                u = m + l + "-" + p + q,
                n = ha.noop,
                v;
            r(h, function(a, c) {
              var d = e.exec(c);
              d && (d = (d[1] ? "-" : "") + R(d[2]), s[d] = g.attr(h.$attr[c]));
            });
            r(s, function(a, e) {
              t[e] = c(a.replace(d, u));
            });
            f.$watch(l, function(c) {
              c = parseFloat(c);
              var d = isNaN(c);
              d || c in s || (c = a.pluralCat(c - p));
              c === v || d && isNaN(v) || (n(), n = f.$watch(t[c], k), v = c);
            });
          }
        };
      }],
      ke = ["$parse", "$animate", function(a, c) {
        var d = z("ngRepeat"),
            e = function(a, c, d, e, l, m, p) {
              a[d] = e;
              l && (a[l] = m);
              a.$index = c;
              a.$first = 0 === c;
              a.$last = c === p - 1;
              a.$middle = !(a.$first || a.$last);
              a.$odd = !(a.$even = 0 === (c & 1));
            };
        return {
          restrict: "A",
          multiElement: !0,
          transclude: "element",
          priority: 1E3,
          terminal: !0,
          $$tlb: !0,
          compile: function(f, g) {
            var h = g.ngRepeat,
                k = V.createComment(" end ngRepeat: " + h + " "),
                l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
            if (!l)
              throw d("iexp", h);
            var m = l[1],
                p = l[2],
                s = l[3],
                t = l[4],
                l = m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
            if (!l)
              throw d("iidexp", m);
            var q = l[3] || l[1],
                y = l[2];
            if (s && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(s)))
              throw d("badident", s);
            var n,
                v,
                w,
                z,
                E = {$id: Ma};
            t ? n = a(t) : (w = function(a, c) {
              return Ma(c);
            }, z = function(a) {
              return a;
            });
            return function(a, f, g, l, m) {
              n && (v = function(c, d, e) {
                y && (E[y] = c);
                E[q] = d;
                E.$index = e;
                return n(a, E);
              });
              var t = ia();
              a.$watchCollection(p, function(g) {
                var l,
                    n,
                    p = f[0],
                    B,
                    E = ia(),
                    C,
                    x,
                    G,
                    T,
                    D,
                    F,
                    I;
                s && (a[s] = g);
                if (Ra(g))
                  D = g, n = v || w;
                else {
                  n = v || z;
                  D = [];
                  for (I in g)
                    g.hasOwnProperty(I) && "$" != I.charAt(0) && D.push(I);
                  D.sort();
                }
                C = D.length;
                I = Array(C);
                for (l = 0; l < C; l++)
                  if (x = g === D ? l : D[l], G = g[x], T = n(x, G, l), t[T])
                    F = t[T], delete t[T], E[T] = F, I[l] = F;
                  else {
                    if (E[T])
                      throw r(I, function(a) {
                        a && a.scope && (t[a.id] = a);
                      }), d("dupes", h, T, G);
                    I[l] = {
                      id: T,
                      scope: u,
                      clone: u
                    };
                    E[T] = !0;
                  }
                for (B in t) {
                  F = t[B];
                  T = qb(F.clone);
                  c.leave(T);
                  if (T[0].parentNode)
                    for (l = 0, n = T.length; l < n; l++)
                      T[l].$$NG_REMOVED = !0;
                  F.scope.$destroy();
                }
                for (l = 0; l < C; l++)
                  if (x = g === D ? l : D[l], G = g[x], F = I[l], F.scope) {
                    B = p;
                    do
                      B = B.nextSibling;
 while (B && B.$$NG_REMOVED);
                    F.clone[0] != B && c.move(qb(F.clone), null, A(p));
                    p = F.clone[F.clone.length - 1];
                    e(F.scope, l, q, G, y, x, C);
                  } else
                    m(function(a, d) {
                      F.scope = d;
                      var f = k.cloneNode(!1);
                      a[a.length++] = f;
                      c.enter(a, null, A(p));
                      p = f;
                      F.clone = a;
                      E[F.id] = F;
                      e(F.scope, l, q, G, y, x, C);
                    });
                t = E;
              });
            };
          }
        };
      }],
      le = ["$animate", function(a) {
        return {
          restrict: "A",
          multiElement: !0,
          link: function(c, d, e) {
            c.$watch(e.ngShow, function(c) {
              a[c ? "removeClass" : "addClass"](d, "ng-hide", {tempClasses: "ng-hide-animate"});
            });
          }
        };
      }],
      ee = ["$animate", function(a) {
        return {
          restrict: "A",
          multiElement: !0,
          link: function(c, d, e) {
            c.$watch(e.ngHide, function(c) {
              a[c ? "addClass" : "removeClass"](d, "ng-hide", {tempClasses: "ng-hide-animate"});
            });
          }
        };
      }],
      me = Ia(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
          d && a !== d && r(d, function(a, d) {
            c.css(d, "");
          });
          a && c.css(a);
        }, !0);
      }),
      ne = ["$animate", function(a) {
        return {
          restrict: "EA",
          require: "ngSwitch",
          controller: ["$scope", function() {
            this.cases = {};
          }],
          link: function(c, d, e, f) {
            var g = [],
                h = [],
                k = [],
                l = [],
                m = function(a, c) {
                  return function() {
                    a.splice(c, 1);
                  };
                };
            c.$watch(e.ngSwitch || e.on, function(c) {
              var d,
                  e;
              d = 0;
              for (e = k.length; d < e; ++d)
                a.cancel(k[d]);
              d = k.length = 0;
              for (e = l.length; d < e; ++d) {
                var q = qb(h[d].clone);
                l[d].$destroy();
                (k[d] = a.leave(q)).then(m(k, d));
              }
              h.length = 0;
              l.length = 0;
              (g = f.cases["!" + c] || f.cases["?"]) && r(g, function(c) {
                c.transclude(function(d, e) {
                  l.push(e);
                  var f = c.element;
                  d[d.length++] = V.createComment(" end ngSwitchWhen: ");
                  h.push({clone: d});
                  a.enter(d, f.parent(), f);
                });
              });
            });
          }
        };
      }],
      oe = Ia({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
          e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
          e.cases["!" + d.ngSwitchWhen].push({
            transclude: f,
            element: c
          });
        }
      }),
      pe = Ia({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, c, d, e, f) {
          e.cases["?"] = e.cases["?"] || [];
          e.cases["?"].push({
            transclude: f,
            element: c
          });
        }
      }),
      re = Ia({
        restrict: "EAC",
        link: function(a, c, d, e, f) {
          if (!f)
            throw z("ngTransclude")("orphan", va(c));
          f(function(a) {
            c.empty();
            c.append(a);
          });
        }
      }),
      Sd = ["$templateCache", function(a) {
        return {
          restrict: "E",
          terminal: !0,
          compile: function(c, d) {
            "text/ng-template" == d.type && a.put(d.id, c[0].text);
          }
        };
      }],
      $f = z("ngOptions"),
      qe = ca({
        restrict: "A",
        terminal: !0
      }),
      Td = ["$compile", "$parse", function(a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
            e = {$setViewValue: x};
        return {
          restrict: "E",
          require: ["select", "?ngModel"],
          controller: ["$element", "$scope", "$attrs", function(a, c, d) {
            var k = this,
                l = {},
                m = e,
                p;
            k.databound = d.ngModel;
            k.init = function(a, c, d) {
              m = a;
              p = d;
            };
            k.addOption = function(c, d) {
              La(c, '"option value"');
              l[c] = !0;
              m.$viewValue == c && (a.val(c), p.parent() && p.remove());
              d && d[0].hasAttribute("selected") && (d[0].selected = !0);
            };
            k.removeOption = function(a) {
              this.hasOption(a) && (delete l[a], m.$viewValue == a && this.renderUnknownOption(a));
            };
            k.renderUnknownOption = function(c) {
              c = "? " + Ma(c) + " ?";
              p.val(c);
              a.prepend(p);
              a.val(c);
              p.prop("selected", !0);
            };
            k.hasOption = function(a) {
              return l.hasOwnProperty(a);
            };
            c.$on("$destroy", function() {
              k.renderUnknownOption = x;
            });
          }],
          link: function(e, g, h, k) {
            function l(a, c, d, e) {
              d.$render = function() {
                var a = d.$viewValue;
                e.hasOption(a) ? (E.parent() && E.remove(), c.val(a), "" === a && n.prop("selected", !0)) : G(a) && n ? c.val("") : e.renderUnknownOption(a);
              };
              c.on("change", function() {
                a.$apply(function() {
                  E.parent() && E.remove();
                  d.$setViewValue(c.val());
                });
              });
            }
            function m(a, c, d) {
              var e;
              d.$render = function() {
                var a = new cb(d.$viewValue);
                r(c.find("option"), function(c) {
                  c.selected = y(a.get(c.value));
                });
              };
              a.$watch(function() {
                pa(e, d.$viewValue) || (e = ua(d.$viewValue), d.$render());
              });
              c.on("change", function() {
                a.$apply(function() {
                  var a = [];
                  r(c.find("option"), function(c) {
                    c.selected && a.push(c.value);
                  });
                  d.$setViewValue(a);
                });
              });
            }
            function p(e, f, g) {
              function h(a, c, d) {
                U[x] = d;
                G && (U[G] = c);
                return a(e, U);
              }
              function k(a) {
                var c;
                if (t)
                  if (K && D(a)) {
                    c = new cb([]);
                    for (var d = 0; d < a.length; d++)
                      c.put(h(K, null, a[d]), !0);
                  } else
                    c = new cb(a);
                else
                  K && (a = h(K, null, a));
                return function(d, e) {
                  var f;
                  f = K ? K : C ? C : H;
                  return t ? y(c.remove(h(f, d, e))) : a === h(f, d, e);
                };
              }
              function l() {
                v || (e.$$postDigest(n), v = !0);
              }
              function m(a, c, d) {
                a[c] = a[c] || 0;
                a[c] += d ? 1 : -1;
              }
              function n() {
                v = !1;
                var a = {"": []},
                    c = [""],
                    d,
                    l,
                    p,
                    q,
                    u;
                p = g.$viewValue;
                q = M(e) || [];
                var C = G ? Object.keys(q).sort() : q,
                    x,
                    A,
                    H,
                    D,
                    Q = {};
                u = k(p);
                var P = !1,
                    V,
                    X;
                S = {};
                for (D = 0; H = C.length, D < H; D++) {
                  x = D;
                  if (G && (x = C[D], "$" === x.charAt(0)))
                    continue;
                  A = q[x];
                  d = h(I, x, A) || "";
                  (l = a[d]) || (l = a[d] = [], c.push(d));
                  d = u(x, A);
                  P = P || d;
                  A = h(E, x, A);
                  A = y(A) ? A : "";
                  X = K ? K(e, U) : G ? C[D] : D;
                  K && (S[X] = x);
                  l.push({
                    id: X,
                    label: A,
                    selected: d
                  });
                }
                t || (z || null === p ? a[""].unshift({
                  id: "",
                  label: "",
                  selected: !P
                }) : P || a[""].unshift({
                  id: "?",
                  label: "",
                  selected: !0
                }));
                x = 0;
                for (C = c.length; x < C; x++) {
                  d = c[x];
                  l = a[d];
                  R.length <= x ? (p = {
                    element: F.clone().attr("label", d),
                    label: l.label
                  }, q = [p], R.push(q), f.append(p.element)) : (q = R[x], p = q[0], p.label != d && p.element.attr("label", p.label = d));
                  P = null;
                  D = 0;
                  for (H = l.length; D < H; D++)
                    d = l[D], (u = q[D + 1]) ? (P = u.element, u.label !== d.label && (m(Q, u.label, !1), m(Q, d.label, !0), P.text(u.label = d.label), P.prop("label", u.label)), u.id !== d.id && P.val(u.id = d.id), P[0].selected !== d.selected && (P.prop("selected", u.selected = d.selected), Ha && P.prop("selected", u.selected))) : ("" === d.id && z ? V = z : (V = w.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).prop("label", d.label).text(d.label), q.push(u = {
                      element: V,
                      label: d.label,
                      id: d.id,
                      selected: d.selected
                    }), m(Q, d.label, !0), P ? P.after(V) : p.element.append(V), P = V);
                  for (D++; q.length > D; )
                    d = q.pop(), m(Q, d.label, !1), d.element.remove();
                  r(Q, function(a, c) {
                    0 < a ? s.addOption(c) : 0 > a && s.removeOption(c);
                  });
                }
                for (; R.length > x; )
                  R.pop()[0].element.remove();
              }
              var p;
              if (!(p = q.match(d)))
                throw $f("iexp", q, va(f));
              var E = c(p[2] || p[1]),
                  x = p[4] || p[6],
                  A = / as /.test(p[0]) && p[1],
                  C = A ? c(A) : null,
                  G = p[5],
                  I = c(p[3] || ""),
                  H = c(p[2] ? p[1] : x),
                  M = c(p[7]),
                  K = p[8] ? c(p[8]) : null,
                  S = {},
                  R = [[{
                    element: f,
                    label: ""
                  }]],
                  U = {};
              z && (a(z)(e), z.removeClass("ng-scope"), z.remove());
              f.empty();
              f.on("change", function() {
                e.$apply(function() {
                  var a = M(e) || [],
                      c;
                  if (t)
                    c = [], r(f.val(), function(d) {
                      d = K ? S[d] : d;
                      c.push("?" === d ? u : "" === d ? null : h(C ? C : H, d, a[d]));
                    });
                  else {
                    var d = K ? S[f.val()] : f.val();
                    c = "?" === d ? u : "" === d ? null : h(C ? C : H, d, a[d]);
                  }
                  g.$setViewValue(c);
                  n();
                });
              });
              g.$render = n;
              e.$watchCollection(M, l);
              e.$watchCollection(function() {
                var a = M(e),
                    c;
                if (a && D(a)) {
                  c = Array(a.length);
                  for (var d = 0,
                      f = a.length; d < f; d++)
                    c[d] = h(E, d, a[d]);
                } else if (a)
                  for (d in c = {}, a)
                    a.hasOwnProperty(d) && (c[d] = h(E, d, a[d]));
                return c;
              }, l);
              t && e.$watchCollection(function() {
                return g.$modelValue;
              }, l);
            }
            if (k[1]) {
              var s = k[0];
              k = k[1];
              var t = h.multiple,
                  q = h.ngOptions,
                  z = !1,
                  n,
                  v = !1,
                  w = A(V.createElement("option")),
                  F = A(V.createElement("optgroup")),
                  E = w.clone();
              h = 0;
              for (var x = g.children(),
                  C = x.length; h < C; h++)
                if ("" === x[h].value) {
                  n = z = x.eq(h);
                  break;
                }
              s.init(k, z, E);
              t && (k.$isEmpty = function(a) {
                return !a || 0 === a.length;
              });
              q ? p(e, g, k) : t ? m(e, g, k) : l(e, g, k, s);
            }
          }
        };
      }],
      Vd = ["$interpolate", function(a) {
        var c = {
          addOption: x,
          removeOption: x
        };
        return {
          restrict: "E",
          priority: 100,
          compile: function(d, e) {
            if (G(e.value)) {
              var f = a(d.text(), !0);
              f || e.$set("value", d.text());
            }
            return function(a, d, e) {
              var l = d.parent(),
                  m = l.data("$selectController") || l.parent().data("$selectController");
              m && m.databound || (m = c);
              f ? a.$watch(f, function(a, c) {
                e.$set("value", a);
                c !== a && m.removeOption(c);
                m.addOption(a, d);
              }) : m.addOption(e.value, d);
              d.on("$destroy", function() {
                m.removeOption(e.value);
              });
            };
          }
        };
      }],
      Ud = ca({
        restrict: "E",
        terminal: !1
      });
  U.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : (Kd(), Md(ha), A(V).ready(function() {
    Gd(V, rc);
  }));
})(window, document);
!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');



  this["angular"] = angular;
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, "angular");
});

System.register("github:angular/bower-angular-animate@1.3.4/angular-animate", ["angular"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["angular"]);
  (function() {
"format global";
"deps angular";
(function(window, angular, undefined) {
  'use strict';
  angular.module('ngAnimate', ['ng']).directive('ngAnimateChildren', function() {
    var NG_ANIMATE_CHILDREN = '$$ngAnimateChildren';
    return function(scope, element, attrs) {
      var val = attrs.ngAnimateChildren;
      if (angular.isString(val) && val.length === 0) {
        element.data(NG_ANIMATE_CHILDREN, true);
      } else {
        scope.$watch(val, function(value) {
          element.data(NG_ANIMATE_CHILDREN, !!value);
        });
      }
    };
  }).factory('$$animateReflow', ['$$rAF', '$document', function($$rAF, $document) {
    var bod = $document[0].body;
    return function(fn) {
      return $$rAF(function() {
        var a = bod.offsetWidth + 1;
        fn();
      });
    };
  }]).config(['$provide', '$animateProvider', function($provide, $animateProvider) {
    var noop = angular.noop;
    var forEach = angular.forEach;
    var selectors = $animateProvider.$$selectors;
    var isArray = angular.isArray;
    var isString = angular.isString;
    var isObject = angular.isObject;
    var ELEMENT_NODE = 1;
    var NG_ANIMATE_STATE = '$$ngAnimateState';
    var NG_ANIMATE_CHILDREN = '$$ngAnimateChildren';
    var NG_ANIMATE_CLASS_NAME = 'ng-animate';
    var rootAnimateState = {running: true};
    function extractElementNode(element) {
      for (var i = 0; i < element.length; i++) {
        var elm = element[i];
        if (elm.nodeType == ELEMENT_NODE) {
          return elm;
        }
      }
    }
    function prepareElement(element) {
      return element && angular.element(element);
    }
    function stripCommentsFromElement(element) {
      return angular.element(extractElementNode(element));
    }
    function isMatchingElement(elm1, elm2) {
      return extractElementNode(elm1) == extractElementNode(elm2);
    }
    $provide.decorator('$animate', ['$delegate', '$$q', '$injector', '$sniffer', '$rootElement', '$$asyncCallback', '$rootScope', '$document', '$templateRequest', function($delegate, $$q, $injector, $sniffer, $rootElement, $$asyncCallback, $rootScope, $document, $templateRequest) {
      $rootElement.data(NG_ANIMATE_STATE, rootAnimateState);
      var deregisterWatch = $rootScope.$watch(function() {
        return $templateRequest.totalPendingRequests;
      }, function(val, oldVal) {
        if (val !== 0)
          return;
        deregisterWatch();
        $rootScope.$$postDigest(function() {
          $rootScope.$$postDigest(function() {
            rootAnimateState.running = false;
          });
        });
      });
      var globalAnimationCounter = 0;
      var classNameFilter = $animateProvider.classNameFilter();
      var isAnimatableClassName = !classNameFilter ? function() {
        return true;
      } : function(className) {
        return classNameFilter.test(className);
      };
      function classBasedAnimationsBlocked(element, setter) {
        var data = element.data(NG_ANIMATE_STATE) || {};
        if (setter) {
          data.running = true;
          data.structural = true;
          element.data(NG_ANIMATE_STATE, data);
        }
        return data.disabled || (data.running && data.structural);
      }
      function runAnimationPostDigest(fn) {
        var cancelFn,
            defer = $$q.defer();
        defer.promise.$$cancelFn = function() {
          cancelFn && cancelFn();
        };
        $rootScope.$$postDigest(function() {
          cancelFn = fn(function() {
            defer.resolve();
          });
        });
        return defer.promise;
      }
      function parseAnimateOptions(options) {
        if (isObject(options)) {
          if (options.tempClasses && isString(options.tempClasses)) {
            options.tempClasses = options.tempClasses.split(/\s+/);
          }
          return options;
        }
      }
      function resolveElementClasses(element, cache, runningAnimations) {
        runningAnimations = runningAnimations || {};
        var lookup = {};
        forEach(runningAnimations, function(data, selector) {
          forEach(selector.split(' '), function(s) {
            lookup[s] = data;
          });
        });
        var hasClasses = Object.create(null);
        forEach((element.attr('class') || '').split(/\s+/), function(className) {
          hasClasses[className] = true;
        });
        var toAdd = [],
            toRemove = [];
        forEach((cache && cache.classes) || [], function(status, className) {
          var hasClass = hasClasses[className];
          var matchingAnimation = lookup[className] || {};
          if (status === false) {
            if (hasClass || matchingAnimation.event == 'addClass') {
              toRemove.push(className);
            }
          } else if (status === true) {
            if (!hasClass || matchingAnimation.event == 'removeClass') {
              toAdd.push(className);
            }
          }
        });
        return (toAdd.length + toRemove.length) > 0 && [toAdd.join(' '), toRemove.join(' ')];
      }
      function lookup(name) {
        if (name) {
          var matches = [],
              flagMap = {},
              classes = name.substr(1).split('.');
          if ($sniffer.transitions || $sniffer.animations) {
            matches.push($injector.get(selectors['']));
          }
          for (var i = 0; i < classes.length; i++) {
            var klass = classes[i],
                selectorFactoryName = selectors[klass];
            if (selectorFactoryName && !flagMap[klass]) {
              matches.push($injector.get(selectorFactoryName));
              flagMap[klass] = true;
            }
          }
          return matches;
        }
      }
      function animationRunner(element, animationEvent, className, options) {
        var node = element[0];
        if (!node) {
          return;
        }
        if (options) {
          options.to = options.to || {};
          options.from = options.from || {};
        }
        var classNameAdd;
        var classNameRemove;
        if (isArray(className)) {
          classNameAdd = className[0];
          classNameRemove = className[1];
          if (!classNameAdd) {
            className = classNameRemove;
            animationEvent = 'removeClass';
          } else if (!classNameRemove) {
            className = classNameAdd;
            animationEvent = 'addClass';
          } else {
            className = classNameAdd + ' ' + classNameRemove;
          }
        }
        var isSetClassOperation = animationEvent == 'setClass';
        var isClassBased = isSetClassOperation || animationEvent == 'addClass' || animationEvent == 'removeClass' || animationEvent == 'animate';
        var currentClassName = element.attr('class');
        var classes = currentClassName + ' ' + className;
        if (!isAnimatableClassName(classes)) {
          return;
        }
        var beforeComplete = noop,
            beforeCancel = [],
            before = [],
            afterComplete = noop,
            afterCancel = [],
            after = [];
        var animationLookup = (' ' + classes).replace(/\s+/g, '.');
        forEach(lookup(animationLookup), function(animationFactory) {
          var created = registerAnimation(animationFactory, animationEvent);
          if (!created && isSetClassOperation) {
            registerAnimation(animationFactory, 'addClass');
            registerAnimation(animationFactory, 'removeClass');
          }
        });
        function registerAnimation(animationFactory, event) {
          var afterFn = animationFactory[event];
          var beforeFn = animationFactory['before' + event.charAt(0).toUpperCase() + event.substr(1)];
          if (afterFn || beforeFn) {
            if (event == 'leave') {
              beforeFn = afterFn;
              afterFn = null;
            }
            after.push({
              event: event,
              fn: afterFn
            });
            before.push({
              event: event,
              fn: beforeFn
            });
            return true;
          }
        }
        function run(fns, cancellations, allCompleteFn) {
          var animations = [];
          forEach(fns, function(animation) {
            animation.fn && animations.push(animation);
          });
          var count = 0;
          function afterAnimationComplete(index) {
            if (cancellations) {
              (cancellations[index] || noop)();
              if (++count < animations.length)
                return;
              cancellations = null;
            }
            allCompleteFn();
          }
          forEach(animations, function(animation, index) {
            var progress = function() {
              afterAnimationComplete(index);
            };
            switch (animation.event) {
              case 'setClass':
                cancellations.push(animation.fn(element, classNameAdd, classNameRemove, progress, options));
                break;
              case 'animate':
                cancellations.push(animation.fn(element, className, options.from, options.to, progress));
                break;
              case 'addClass':
                cancellations.push(animation.fn(element, classNameAdd || className, progress, options));
                break;
              case 'removeClass':
                cancellations.push(animation.fn(element, classNameRemove || className, progress, options));
                break;
              default:
                cancellations.push(animation.fn(element, progress, options));
                break;
            }
          });
          if (cancellations && cancellations.length === 0) {
            allCompleteFn();
          }
        }
        return {
          node: node,
          event: animationEvent,
          className: className,
          isClassBased: isClassBased,
          isSetClassOperation: isSetClassOperation,
          applyStyles: function() {
            if (options) {
              element.css(angular.extend(options.from || {}, options.to || {}));
            }
          },
          before: function(allCompleteFn) {
            beforeComplete = allCompleteFn;
            run(before, beforeCancel, function() {
              beforeComplete = noop;
              allCompleteFn();
            });
          },
          after: function(allCompleteFn) {
            afterComplete = allCompleteFn;
            run(after, afterCancel, function() {
              afterComplete = noop;
              allCompleteFn();
            });
          },
          cancel: function() {
            if (beforeCancel) {
              forEach(beforeCancel, function(cancelFn) {
                (cancelFn || noop)(true);
              });
              beforeComplete(true);
            }
            if (afterCancel) {
              forEach(afterCancel, function(cancelFn) {
                (cancelFn || noop)(true);
              });
              afterComplete(true);
            }
          }
        };
      }
      return {
        animate: function(element, from, to, className, options) {
          className = className || 'ng-inline-animate';
          options = parseAnimateOptions(options) || {};
          options.from = to ? from : null;
          options.to = to ? to : from;
          return runAnimationPostDigest(function(done) {
            return performAnimation('animate', className, stripCommentsFromElement(element), null, null, noop, options, done);
          });
        },
        enter: function(element, parentElement, afterElement, options) {
          options = parseAnimateOptions(options);
          element = angular.element(element);
          parentElement = prepareElement(parentElement);
          afterElement = prepareElement(afterElement);
          classBasedAnimationsBlocked(element, true);
          $delegate.enter(element, parentElement, afterElement);
          return runAnimationPostDigest(function(done) {
            return performAnimation('enter', 'ng-enter', stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
          });
        },
        leave: function(element, options) {
          options = parseAnimateOptions(options);
          element = angular.element(element);
          cancelChildAnimations(element);
          classBasedAnimationsBlocked(element, true);
          return runAnimationPostDigest(function(done) {
            return performAnimation('leave', 'ng-leave', stripCommentsFromElement(element), null, null, function() {
              $delegate.leave(element);
            }, options, done);
          });
        },
        move: function(element, parentElement, afterElement, options) {
          options = parseAnimateOptions(options);
          element = angular.element(element);
          parentElement = prepareElement(parentElement);
          afterElement = prepareElement(afterElement);
          cancelChildAnimations(element);
          classBasedAnimationsBlocked(element, true);
          $delegate.move(element, parentElement, afterElement);
          return runAnimationPostDigest(function(done) {
            return performAnimation('move', 'ng-move', stripCommentsFromElement(element), parentElement, afterElement, noop, options, done);
          });
        },
        addClass: function(element, className, options) {
          return this.setClass(element, className, [], options);
        },
        removeClass: function(element, className, options) {
          return this.setClass(element, [], className, options);
        },
        setClass: function(element, add, remove, options) {
          options = parseAnimateOptions(options);
          var STORAGE_KEY = '$$animateClasses';
          element = angular.element(element);
          element = stripCommentsFromElement(element);
          if (classBasedAnimationsBlocked(element)) {
            return $delegate.$$setClassImmediately(element, add, remove, options);
          }
          var classes,
              cache = element.data(STORAGE_KEY);
          var hasCache = !!cache;
          if (!cache) {
            cache = {};
            cache.classes = {};
          }
          classes = cache.classes;
          add = isArray(add) ? add : add.split(' ');
          forEach(add, function(c) {
            if (c && c.length) {
              classes[c] = true;
            }
          });
          remove = isArray(remove) ? remove : remove.split(' ');
          forEach(remove, function(c) {
            if (c && c.length) {
              classes[c] = false;
            }
          });
          if (hasCache) {
            if (options && cache.options) {
              cache.options = angular.extend(cache.options || {}, options);
            }
            return cache.promise;
          } else {
            element.data(STORAGE_KEY, cache = {
              classes: classes,
              options: options
            });
          }
          return cache.promise = runAnimationPostDigest(function(done) {
            var parentElement = element.parent();
            var elementNode = extractElementNode(element);
            var parentNode = elementNode.parentNode;
            if (!parentNode || parentNode['$$NG_REMOVED'] || elementNode['$$NG_REMOVED']) {
              done();
              return;
            }
            var cache = element.data(STORAGE_KEY);
            element.removeData(STORAGE_KEY);
            var state = element.data(NG_ANIMATE_STATE) || {};
            var classes = resolveElementClasses(element, cache, state.active);
            return !classes ? done() : performAnimation('setClass', classes, element, parentElement, null, function() {
              if (classes[0])
                $delegate.$$addClassImmediately(element, classes[0]);
              if (classes[1])
                $delegate.$$removeClassImmediately(element, classes[1]);
            }, cache.options, done);
          });
        },
        cancel: function(promise) {
          promise.$$cancelFn();
        },
        enabled: function(value, element) {
          switch (arguments.length) {
            case 2:
              if (value) {
                cleanup(element);
              } else {
                var data = element.data(NG_ANIMATE_STATE) || {};
                data.disabled = true;
                element.data(NG_ANIMATE_STATE, data);
              }
              break;
            case 1:
              rootAnimateState.disabled = !value;
              break;
            default:
              value = !rootAnimateState.disabled;
              break;
          }
          return !!value;
        }
      };
      function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, options, doneCallback) {
        var noopCancel = noop;
        var runner = animationRunner(element, animationEvent, className, options);
        if (!runner) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          closeAnimation();
          return noopCancel;
        }
        animationEvent = runner.event;
        className = runner.className;
        var elementEvents = angular.element._data(runner.node);
        elementEvents = elementEvents && elementEvents.events;
        if (!parentElement) {
          parentElement = afterElement ? afterElement.parent() : element.parent();
        }
        if (animationsDisabled(element, parentElement)) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          closeAnimation();
          return noopCancel;
        }
        var ngAnimateState = element.data(NG_ANIMATE_STATE) || {};
        var runningAnimations = ngAnimateState.active || {};
        var totalActiveAnimations = ngAnimateState.totalActive || 0;
        var lastAnimation = ngAnimateState.last;
        var skipAnimation = false;
        if (totalActiveAnimations > 0) {
          var animationsToCancel = [];
          if (!runner.isClassBased) {
            if (animationEvent == 'leave' && runningAnimations['ng-leave']) {
              skipAnimation = true;
            } else {
              for (var klass in runningAnimations) {
                animationsToCancel.push(runningAnimations[klass]);
              }
              ngAnimateState = {};
              cleanup(element, true);
            }
          } else if (lastAnimation.event == 'setClass') {
            animationsToCancel.push(lastAnimation);
            cleanup(element, className);
          } else if (runningAnimations[className]) {
            var current = runningAnimations[className];
            if (current.event == animationEvent) {
              skipAnimation = true;
            } else {
              animationsToCancel.push(current);
              cleanup(element, className);
            }
          }
          if (animationsToCancel.length > 0) {
            forEach(animationsToCancel, function(operation) {
              operation.cancel();
            });
          }
        }
        if (runner.isClassBased && !runner.isSetClassOperation && animationEvent != 'animate' && !skipAnimation) {
          skipAnimation = (animationEvent == 'addClass') == element.hasClass(className);
        }
        if (skipAnimation) {
          fireDOMOperation();
          fireBeforeCallbackAsync();
          fireAfterCallbackAsync();
          fireDoneCallbackAsync();
          return noopCancel;
        }
        runningAnimations = ngAnimateState.active || {};
        totalActiveAnimations = ngAnimateState.totalActive || 0;
        if (animationEvent == 'leave') {
          element.one('$destroy', function(e) {
            var element = angular.element(this);
            var state = element.data(NG_ANIMATE_STATE);
            if (state) {
              var activeLeaveAnimation = state.active['ng-leave'];
              if (activeLeaveAnimation) {
                activeLeaveAnimation.cancel();
                cleanup(element, 'ng-leave');
              }
            }
          });
        }
        element.addClass(NG_ANIMATE_CLASS_NAME);
        if (options && options.tempClasses) {
          forEach(options.tempClasses, function(className) {
            element.addClass(className);
          });
        }
        var localAnimationCount = globalAnimationCounter++;
        totalActiveAnimations++;
        runningAnimations[className] = runner;
        element.data(NG_ANIMATE_STATE, {
          last: runner,
          active: runningAnimations,
          index: localAnimationCount,
          totalActive: totalActiveAnimations
        });
        fireBeforeCallbackAsync();
        runner.before(function(cancelled) {
          var data = element.data(NG_ANIMATE_STATE);
          cancelled = cancelled || !data || !data.active[className] || (runner.isClassBased && data.active[className].event != animationEvent);
          fireDOMOperation();
          if (cancelled === true) {
            closeAnimation();
          } else {
            fireAfterCallbackAsync();
            runner.after(closeAnimation);
          }
        });
        return runner.cancel;
        function fireDOMCallback(animationPhase) {
          var eventName = '$animate:' + animationPhase;
          if (elementEvents && elementEvents[eventName] && elementEvents[eventName].length > 0) {
            $$asyncCallback(function() {
              element.triggerHandler(eventName, {
                event: animationEvent,
                className: className
              });
            });
          }
        }
        function fireBeforeCallbackAsync() {
          fireDOMCallback('before');
        }
        function fireAfterCallbackAsync() {
          fireDOMCallback('after');
        }
        function fireDoneCallbackAsync() {
          fireDOMCallback('close');
          doneCallback();
        }
        function fireDOMOperation() {
          if (!fireDOMOperation.hasBeenRun) {
            fireDOMOperation.hasBeenRun = true;
            domOperation();
          }
        }
        function closeAnimation() {
          if (!closeAnimation.hasBeenRun) {
            if (runner) {
              runner.applyStyles();
            }
            closeAnimation.hasBeenRun = true;
            if (options && options.tempClasses) {
              forEach(options.tempClasses, function(className) {
                element.removeClass(className);
              });
            }
            var data = element.data(NG_ANIMATE_STATE);
            if (data) {
              if (runner && runner.isClassBased) {
                cleanup(element, className);
              } else {
                $$asyncCallback(function() {
                  var data = element.data(NG_ANIMATE_STATE) || {};
                  if (localAnimationCount == data.index) {
                    cleanup(element, className, animationEvent);
                  }
                });
                element.data(NG_ANIMATE_STATE, data);
              }
            }
            fireDoneCallbackAsync();
          }
        }
      }
      function cancelChildAnimations(element) {
        var node = extractElementNode(element);
        if (node) {
          var nodes = angular.isFunction(node.getElementsByClassName) ? node.getElementsByClassName(NG_ANIMATE_CLASS_NAME) : node.querySelectorAll('.' + NG_ANIMATE_CLASS_NAME);
          forEach(nodes, function(element) {
            element = angular.element(element);
            var data = element.data(NG_ANIMATE_STATE);
            if (data && data.active) {
              forEach(data.active, function(runner) {
                runner.cancel();
              });
            }
          });
        }
      }
      function cleanup(element, className) {
        if (isMatchingElement(element, $rootElement)) {
          if (!rootAnimateState.disabled) {
            rootAnimateState.running = false;
            rootAnimateState.structural = false;
          }
        } else if (className) {
          var data = element.data(NG_ANIMATE_STATE) || {};
          var removeAnimations = className === true;
          if (!removeAnimations && data.active && data.active[className]) {
            data.totalActive--;
            delete data.active[className];
          }
          if (removeAnimations || !data.totalActive) {
            element.removeClass(NG_ANIMATE_CLASS_NAME);
            element.removeData(NG_ANIMATE_STATE);
          }
        }
      }
      function animationsDisabled(element, parentElement) {
        if (rootAnimateState.disabled) {
          return true;
        }
        if (isMatchingElement(element, $rootElement)) {
          return rootAnimateState.running;
        }
        var allowChildAnimations,
            parentRunningAnimation,
            hasParent;
        do {
          if (parentElement.length === 0)
            break;
          var isRoot = isMatchingElement(parentElement, $rootElement);
          var state = isRoot ? rootAnimateState : (parentElement.data(NG_ANIMATE_STATE) || {});
          if (state.disabled) {
            return true;
          }
          if (isRoot) {
            hasParent = true;
          }
          if (allowChildAnimations !== false) {
            var animateChildrenFlag = parentElement.data(NG_ANIMATE_CHILDREN);
            if (angular.isDefined(animateChildrenFlag)) {
              allowChildAnimations = animateChildrenFlag;
            }
          }
          parentRunningAnimation = parentRunningAnimation || state.running || (state.last && !state.last.isClassBased);
        } while (parentElement = parentElement.parent());
        return !hasParent || (!allowChildAnimations && parentRunningAnimation);
      }
    }]);
    $animateProvider.register('', ['$window', '$sniffer', '$timeout', '$$animateReflow', function($window, $sniffer, $timeout, $$animateReflow) {
      var CSS_PREFIX = '',
          TRANSITION_PROP,
          TRANSITIONEND_EVENT,
          ANIMATION_PROP,
          ANIMATIONEND_EVENT;
      if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
        CSS_PREFIX = '-webkit-';
        TRANSITION_PROP = 'WebkitTransition';
        TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
      } else {
        TRANSITION_PROP = 'transition';
        TRANSITIONEND_EVENT = 'transitionend';
      }
      if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
        CSS_PREFIX = '-webkit-';
        ANIMATION_PROP = 'WebkitAnimation';
        ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
      } else {
        ANIMATION_PROP = 'animation';
        ANIMATIONEND_EVENT = 'animationend';
      }
      var DURATION_KEY = 'Duration';
      var PROPERTY_KEY = 'Property';
      var DELAY_KEY = 'Delay';
      var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
      var ANIMATION_PLAYSTATE_KEY = 'PlayState';
      var NG_ANIMATE_PARENT_KEY = '$$ngAnimateKey';
      var NG_ANIMATE_CSS_DATA_KEY = '$$ngAnimateCSS3Data';
      var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
      var CLOSING_TIME_BUFFER = 1.5;
      var ONE_SECOND = 1000;
      var lookupCache = {};
      var parentCounter = 0;
      var animationReflowQueue = [];
      var cancelAnimationReflow;
      function clearCacheAfterReflow() {
        if (!cancelAnimationReflow) {
          cancelAnimationReflow = $$animateReflow(function() {
            animationReflowQueue = [];
            cancelAnimationReflow = null;
            lookupCache = {};
          });
        }
      }
      function afterReflow(element, callback) {
        if (cancelAnimationReflow) {
          cancelAnimationReflow();
        }
        animationReflowQueue.push(callback);
        cancelAnimationReflow = $$animateReflow(function() {
          forEach(animationReflowQueue, function(fn) {
            fn();
          });
          animationReflowQueue = [];
          cancelAnimationReflow = null;
          lookupCache = {};
        });
      }
      var closingTimer = null;
      var closingTimestamp = 0;
      var animationElementQueue = [];
      function animationCloseHandler(element, totalTime) {
        var node = extractElementNode(element);
        element = angular.element(node);
        animationElementQueue.push(element);
        var futureTimestamp = Date.now() + totalTime;
        if (futureTimestamp <= closingTimestamp) {
          return;
        }
        $timeout.cancel(closingTimer);
        closingTimestamp = futureTimestamp;
        closingTimer = $timeout(function() {
          closeAllAnimations(animationElementQueue);
          animationElementQueue = [];
        }, totalTime, false);
      }
      function closeAllAnimations(elements) {
        forEach(elements, function(element) {
          var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
          if (elementData) {
            forEach(elementData.closeAnimationFns, function(fn) {
              fn();
            });
          }
        });
      }
      function getElementAnimationDetails(element, cacheKey) {
        var data = cacheKey ? lookupCache[cacheKey] : null;
        if (!data) {
          var transitionDuration = 0;
          var transitionDelay = 0;
          var animationDuration = 0;
          var animationDelay = 0;
          forEach(element, function(element) {
            if (element.nodeType == ELEMENT_NODE) {
              var elementStyles = $window.getComputedStyle(element) || {};
              var transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];
              transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);
              var transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];
              transitionDelay = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);
              var animationDelayStyle = elementStyles[ANIMATION_PROP + DELAY_KEY];
              animationDelay = Math.max(parseMaxTime(elementStyles[ANIMATION_PROP + DELAY_KEY]), animationDelay);
              var aDuration = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);
              if (aDuration > 0) {
                aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1;
              }
              animationDuration = Math.max(aDuration, animationDuration);
            }
          });
          data = {
            total: 0,
            transitionDelay: transitionDelay,
            transitionDuration: transitionDuration,
            animationDelay: animationDelay,
            animationDuration: animationDuration
          };
          if (cacheKey) {
            lookupCache[cacheKey] = data;
          }
        }
        return data;
      }
      function parseMaxTime(str) {
        var maxValue = 0;
        var values = isString(str) ? str.split(/\s*,\s*/) : [];
        forEach(values, function(value) {
          maxValue = Math.max(parseFloat(value) || 0, maxValue);
        });
        return maxValue;
      }
      function getCacheKey(element) {
        var parentElement = element.parent();
        var parentID = parentElement.data(NG_ANIMATE_PARENT_KEY);
        if (!parentID) {
          parentElement.data(NG_ANIMATE_PARENT_KEY, ++parentCounter);
          parentID = parentCounter;
        }
        return parentID + '-' + extractElementNode(element).getAttribute('class');
      }
      function animateSetup(animationEvent, element, className, styles) {
        var structural = ['ng-enter', 'ng-leave', 'ng-move'].indexOf(className) >= 0;
        var cacheKey = getCacheKey(element);
        var eventCacheKey = cacheKey + ' ' + className;
        var itemIndex = lookupCache[eventCacheKey] ? ++lookupCache[eventCacheKey].total : 0;
        var stagger = {};
        if (itemIndex > 0) {
          var staggerClassName = className + '-stagger';
          var staggerCacheKey = cacheKey + ' ' + staggerClassName;
          var applyClasses = !lookupCache[staggerCacheKey];
          applyClasses && element.addClass(staggerClassName);
          stagger = getElementAnimationDetails(element, staggerCacheKey);
          applyClasses && element.removeClass(staggerClassName);
        }
        element.addClass(className);
        var formerData = element.data(NG_ANIMATE_CSS_DATA_KEY) || {};
        var timings = getElementAnimationDetails(element, eventCacheKey);
        var transitionDuration = timings.transitionDuration;
        var animationDuration = timings.animationDuration;
        if (structural && transitionDuration === 0 && animationDuration === 0) {
          element.removeClass(className);
          return false;
        }
        var blockTransition = styles || (structural && transitionDuration > 0);
        var blockAnimation = animationDuration > 0 && stagger.animationDelay > 0 && stagger.animationDuration === 0;
        var closeAnimationFns = formerData.closeAnimationFns || [];
        element.data(NG_ANIMATE_CSS_DATA_KEY, {
          stagger: stagger,
          cacheKey: eventCacheKey,
          running: formerData.running || 0,
          itemIndex: itemIndex,
          blockTransition: blockTransition,
          closeAnimationFns: closeAnimationFns
        });
        var node = extractElementNode(element);
        if (blockTransition) {
          blockTransitions(node, true);
          if (styles) {
            element.css(styles);
          }
        }
        if (blockAnimation) {
          blockAnimations(node, true);
        }
        return true;
      }
      function animateRun(animationEvent, element, className, activeAnimationComplete, styles) {
        var node = extractElementNode(element);
        var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
        if (node.getAttribute('class').indexOf(className) == -1 || !elementData) {
          activeAnimationComplete();
          return;
        }
        var activeClassName = '';
        var pendingClassName = '';
        forEach(className.split(' '), function(klass, i) {
          var prefix = (i > 0 ? ' ' : '') + klass;
          activeClassName += prefix + '-active';
          pendingClassName += prefix + '-pending';
        });
        var style = '';
        var appliedStyles = [];
        var itemIndex = elementData.itemIndex;
        var stagger = elementData.stagger;
        var staggerTime = 0;
        if (itemIndex > 0) {
          var transitionStaggerDelay = 0;
          if (stagger.transitionDelay > 0 && stagger.transitionDuration === 0) {
            transitionStaggerDelay = stagger.transitionDelay * itemIndex;
          }
          var animationStaggerDelay = 0;
          if (stagger.animationDelay > 0 && stagger.animationDuration === 0) {
            animationStaggerDelay = stagger.animationDelay * itemIndex;
            appliedStyles.push(CSS_PREFIX + 'animation-play-state');
          }
          staggerTime = Math.round(Math.max(transitionStaggerDelay, animationStaggerDelay) * 100) / 100;
        }
        if (!staggerTime) {
          element.addClass(activeClassName);
          if (elementData.blockTransition) {
            blockTransitions(node, false);
          }
        }
        var eventCacheKey = elementData.cacheKey + ' ' + activeClassName;
        var timings = getElementAnimationDetails(element, eventCacheKey);
        var maxDuration = Math.max(timings.transitionDuration, timings.animationDuration);
        if (maxDuration === 0) {
          element.removeClass(activeClassName);
          animateClose(element, className);
          activeAnimationComplete();
          return;
        }
        if (!staggerTime && styles) {
          if (!timings.transitionDuration) {
            element.css('transition', timings.animationDuration + 's linear all');
            appliedStyles.push('transition');
          }
          element.css(styles);
        }
        var maxDelay = Math.max(timings.transitionDelay, timings.animationDelay);
        var maxDelayTime = maxDelay * ONE_SECOND;
        if (appliedStyles.length > 0) {
          var oldStyle = node.getAttribute('style') || '';
          if (oldStyle.charAt(oldStyle.length - 1) !== ';') {
            oldStyle += ';';
          }
          node.setAttribute('style', oldStyle + ' ' + style);
        }
        var startTime = Date.now();
        var css3AnimationEvents = ANIMATIONEND_EVENT + ' ' + TRANSITIONEND_EVENT;
        var animationTime = (maxDelay + maxDuration) * CLOSING_TIME_BUFFER;
        var totalTime = (staggerTime + animationTime) * ONE_SECOND;
        var staggerTimeout;
        if (staggerTime > 0) {
          element.addClass(pendingClassName);
          staggerTimeout = $timeout(function() {
            staggerTimeout = null;
            if (timings.transitionDuration > 0) {
              blockTransitions(node, false);
            }
            if (timings.animationDuration > 0) {
              blockAnimations(node, false);
            }
            element.addClass(activeClassName);
            element.removeClass(pendingClassName);
            if (styles) {
              if (timings.transitionDuration === 0) {
                element.css('transition', timings.animationDuration + 's linear all');
              }
              element.css(styles);
              appliedStyles.push('transition');
            }
          }, staggerTime * ONE_SECOND, false);
        }
        element.on(css3AnimationEvents, onAnimationProgress);
        elementData.closeAnimationFns.push(function() {
          onEnd();
          activeAnimationComplete();
        });
        elementData.running++;
        animationCloseHandler(element, totalTime);
        return onEnd;
        function onEnd() {
          element.off(css3AnimationEvents, onAnimationProgress);
          element.removeClass(activeClassName);
          element.removeClass(pendingClassName);
          if (staggerTimeout) {
            $timeout.cancel(staggerTimeout);
          }
          animateClose(element, className);
          var node = extractElementNode(element);
          for (var i in appliedStyles) {
            node.style.removeProperty(appliedStyles[i]);
          }
        }
        function onAnimationProgress(event) {
          event.stopPropagation();
          var ev = event.originalEvent || event;
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
            activeAnimationComplete();
          }
        }
      }
      function blockTransitions(node, bool) {
        node.style[TRANSITION_PROP + PROPERTY_KEY] = bool ? 'none' : '';
      }
      function blockAnimations(node, bool) {
        node.style[ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY] = bool ? 'paused' : '';
      }
      function animateBefore(animationEvent, element, className, styles) {
        if (animateSetup(animationEvent, element, className, styles)) {
          return function(cancelled) {
            cancelled && animateClose(element, className);
          };
        }
      }
      function animateAfter(animationEvent, element, className, afterAnimationComplete, styles) {
        if (element.data(NG_ANIMATE_CSS_DATA_KEY)) {
          return animateRun(animationEvent, element, className, afterAnimationComplete, styles);
        } else {
          animateClose(element, className);
          afterAnimationComplete();
        }
      }
      function animate(animationEvent, element, className, animationComplete, options) {
        var preReflowCancellation = animateBefore(animationEvent, element, className, options.from);
        if (!preReflowCancellation) {
          clearCacheAfterReflow();
          animationComplete();
          return;
        }
        var cancel = preReflowCancellation;
        afterReflow(element, function() {
          cancel = animateAfter(animationEvent, element, className, animationComplete, options.to);
        });
        return function(cancelled) {
          (cancel || noop)(cancelled);
        };
      }
      function animateClose(element, className) {
        element.removeClass(className);
        var data = element.data(NG_ANIMATE_CSS_DATA_KEY);
        if (data) {
          if (data.running) {
            data.running--;
          }
          if (!data.running || data.running === 0) {
            element.removeData(NG_ANIMATE_CSS_DATA_KEY);
          }
        }
      }
      return {
        animate: function(element, className, from, to, animationCompleted, options) {
          options = options || {};
          options.from = from;
          options.to = to;
          return animate('animate', element, className, animationCompleted, options);
        },
        enter: function(element, animationCompleted, options) {
          options = options || {};
          return animate('enter', element, 'ng-enter', animationCompleted, options);
        },
        leave: function(element, animationCompleted, options) {
          options = options || {};
          return animate('leave', element, 'ng-leave', animationCompleted, options);
        },
        move: function(element, animationCompleted, options) {
          options = options || {};
          return animate('move', element, 'ng-move', animationCompleted, options);
        },
        beforeSetClass: function(element, add, remove, animationCompleted, options) {
          options = options || {};
          var className = suffixClasses(remove, '-remove') + ' ' + suffixClasses(add, '-add');
          var cancellationMethod = animateBefore('setClass', element, className, options.from);
          if (cancellationMethod) {
            afterReflow(element, animationCompleted);
            return cancellationMethod;
          }
          clearCacheAfterReflow();
          animationCompleted();
        },
        beforeAddClass: function(element, className, animationCompleted, options) {
          options = options || {};
          var cancellationMethod = animateBefore('addClass', element, suffixClasses(className, '-add'), options.from);
          if (cancellationMethod) {
            afterReflow(element, animationCompleted);
            return cancellationMethod;
          }
          clearCacheAfterReflow();
          animationCompleted();
        },
        beforeRemoveClass: function(element, className, animationCompleted, options) {
          options = options || {};
          var cancellationMethod = animateBefore('removeClass', element, suffixClasses(className, '-remove'), options.from);
          if (cancellationMethod) {
            afterReflow(element, animationCompleted);
            return cancellationMethod;
          }
          clearCacheAfterReflow();
          animationCompleted();
        },
        setClass: function(element, add, remove, animationCompleted, options) {
          options = options || {};
          remove = suffixClasses(remove, '-remove');
          add = suffixClasses(add, '-add');
          var className = remove + ' ' + add;
          return animateAfter('setClass', element, className, animationCompleted, options.to);
        },
        addClass: function(element, className, animationCompleted, options) {
          options = options || {};
          return animateAfter('addClass', element, suffixClasses(className, '-add'), animationCompleted, options.to);
        },
        removeClass: function(element, className, animationCompleted, options) {
          options = options || {};
          return animateAfter('removeClass', element, suffixClasses(className, '-remove'), animationCompleted, options.to);
        }
      };
      function suffixClasses(classes, suffix) {
        var className = '';
        classes = isArray(classes) ? classes : classes.split(/\s+/);
        forEach(classes, function(klass, i) {
          if (klass && klass.length > 0) {
            className += (i > 0 ? ' ' : '') + klass + suffix;
          }
        });
        return className;
      }
    }]);
  }]);
})(window, window.angular);



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:angular/bower-angular-sanitize@1.3.4/angular-sanitize", ["angular"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["angular"]);
  (function() {
"format global";
"deps angular";
(function(window, angular, undefined) {
  'use strict';
  var $sanitizeMinErr = angular.$$minErr('$sanitize');
  function $SanitizeProvider() {
    this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
      return function(html) {
        var buf = [];
        htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
          return !/^unsafe/.test($$sanitizeUri(uri, isImage));
        }));
        return buf.join('');
      };
    }];
  }
  function sanitizeText(chars) {
    var buf = [];
    var writer = htmlSanitizeWriter(buf, angular.noop);
    writer.chars(chars);
    return buf.join('');
  }
  var START_TAG_REGEXP = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
      END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/,
      ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
      BEGIN_TAG_REGEXP = /^</,
      BEGING_END_TAGE_REGEXP = /^<\//,
      COMMENT_REGEXP = /<!--(.*?)-->/g,
      DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,
      CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,
      SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
  var voidElements = makeMap("area,br,col,hr,img,wbr");
  var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
      optionalEndTagInlineElements = makeMap("rp,rt"),
      optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements);
  var blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article," + "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," + "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));
  var inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," + "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," + "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
  var svgElements = makeMap("animate,animateColor,animateMotion,animateTransform,circle,defs," + "desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient," + "line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set," + "stop,svg,switch,text,title,tspan,use");
  var specialElements = makeMap("script,style");
  var validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements, svgElements);
  var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href");
  var htmlAttrs = makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' + 'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' + 'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' + 'scope,scrolling,shape,size,span,start,summary,target,title,type,' + 'valign,value,vspace,width');
  var svgAttrs = makeMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' + 'attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,' + 'color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,' + 'font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,' + 'gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,' + 'keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,' + 'markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,' + 'overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,' + 'repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,' + 'stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,' + 'stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,' + 'stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,' + 'underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,' + 'viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,' + 'xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,' + 'zoomAndPan');
  var validAttrs = angular.extend({}, uriAttrs, svgAttrs, htmlAttrs);
  function makeMap(str) {
    var obj = {},
        items = str.split(','),
        i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  function htmlParser(html, handler) {
    if (typeof html !== 'string') {
      if (html === null || typeof html === 'undefined') {
        html = '';
      } else {
        html = '' + html;
      }
    }
    var index,
        chars,
        match,
        stack = [],
        last = html,
        text;
    stack.last = function() {
      return stack[stack.length - 1];
    };
    while (html) {
      text = '';
      chars = true;
      if (!stack.last() || !specialElements[stack.last()]) {
        if (html.indexOf("<!--") === 0) {
          index = html.indexOf("--", 4);
          if (index >= 0 && html.lastIndexOf("-->", index) === index) {
            if (handler.comment)
              handler.comment(html.substring(4, index));
            html = html.substring(index + 3);
            chars = false;
          }
        } else if (DOCTYPE_REGEXP.test(html)) {
          match = html.match(DOCTYPE_REGEXP);
          if (match) {
            html = html.replace(match[0], '');
            chars = false;
          }
        } else if (BEGING_END_TAGE_REGEXP.test(html)) {
          match = html.match(END_TAG_REGEXP);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(END_TAG_REGEXP, parseEndTag);
            chars = false;
          }
        } else if (BEGIN_TAG_REGEXP.test(html)) {
          match = html.match(START_TAG_REGEXP);
          if (match) {
            if (match[4]) {
              html = html.substring(match[0].length);
              match[0].replace(START_TAG_REGEXP, parseStartTag);
            }
            chars = false;
          } else {
            text += '<';
            html = html.substring(1);
          }
        }
        if (chars) {
          index = html.indexOf("<");
          text += index < 0 ? html : html.substring(0, index);
          html = index < 0 ? "" : html.substring(index);
          if (handler.chars)
            handler.chars(decodeEntities(text));
        }
      } else {
        html = html.replace(new RegExp("(.*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'), function(all, text) {
          text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");
          if (handler.chars)
            handler.chars(decodeEntities(text));
          return "";
        });
        parseEndTag("", stack.last());
      }
      if (html == last) {
        throw $sanitizeMinErr('badparse', "The sanitizer was unable to parse the following block " + "of html: {0}", html);
      }
      last = html;
    }
    parseEndTag();
    function parseStartTag(tag, tagName, rest, unary) {
      tagName = angular.lowercase(tagName);
      if (blockElements[tagName]) {
        while (stack.last() && inlineElements[stack.last()]) {
          parseEndTag("", stack.last());
        }
      }
      if (optionalEndTagElements[tagName] && stack.last() == tagName) {
        parseEndTag("", tagName);
      }
      unary = voidElements[tagName] || !!unary;
      if (!unary)
        stack.push(tagName);
      var attrs = {};
      rest.replace(ATTR_REGEXP, function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue || singleQuotedValue || unquotedValue || '';
        attrs[name] = decodeEntities(value);
      });
      if (handler.start)
        handler.start(tagName, attrs, unary);
    }
    function parseEndTag(tag, tagName) {
      var pos = 0,
          i;
      tagName = angular.lowercase(tagName);
      if (tagName)
        for (pos = stack.length - 1; pos >= 0; pos--)
          if (stack[pos] == tagName)
            break;
      if (pos >= 0) {
        for (i = stack.length - 1; i >= pos; i--)
          if (handler.end)
            handler.end(stack[i]);
        stack.length = pos;
      }
    }
  }
  var hiddenPre = document.createElement("pre");
  var spaceRe = /^(\s*)([\s\S]*?)(\s*)$/;
  function decodeEntities(value) {
    if (!value) {
      return '';
    }
    var parts = spaceRe.exec(value);
    var spaceBefore = parts[1];
    var spaceAfter = parts[3];
    var content = parts[2];
    if (content) {
      hiddenPre.innerHTML = content.replace(/</g, "&lt;");
      content = 'textContent' in hiddenPre ? hiddenPre.textContent : hiddenPre.innerText;
    }
    return spaceBefore + content + spaceAfter;
  }
  function encodeEntities(value) {
    return value.replace(/&/g, '&amp;').replace(SURROGATE_PAIR_REGEXP, function(value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).replace(NON_ALPHANUMERIC_REGEXP, function(value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function htmlSanitizeWriter(buf, uriValidator) {
    var ignore = false;
    var out = angular.bind(buf, buf.push);
    return {
      start: function(tag, attrs, unary) {
        tag = angular.lowercase(tag);
        if (!ignore && specialElements[tag]) {
          ignore = tag;
        }
        if (!ignore && validElements[tag] === true) {
          out('<');
          out(tag);
          angular.forEach(attrs, function(value, key) {
            var lkey = angular.lowercase(key);
            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
            if (validAttrs[lkey] === true && (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
              out(' ');
              out(key);
              out('="');
              out(encodeEntities(value));
              out('"');
            }
          });
          out(unary ? '/>' : '>');
        }
      },
      end: function(tag) {
        tag = angular.lowercase(tag);
        if (!ignore && validElements[tag] === true) {
          out('</');
          out(tag);
          out('>');
        }
        if (tag == ignore) {
          ignore = false;
        }
      },
      chars: function(chars) {
        if (!ignore) {
          out(encodeEntities(chars));
        }
      }
    };
  }
  angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);
  angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
    var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,
        MAILTO_REGEXP = /^mailto:/;
    return function(text, target) {
      if (!text)
        return text;
      var match;
      var raw = text;
      var html = [];
      var url;
      var i;
      while ((match = raw.match(LINKY_URL_REGEXP))) {
        url = match[0];
        if (match[2] == match[3])
          url = 'mailto:' + url;
        i = match.index;
        addText(raw.substr(0, i));
        addLink(url, match[0].replace(MAILTO_REGEXP, ''));
        raw = raw.substring(i + match[0].length);
      }
      addText(raw);
      return $sanitize(html.join(''));
      function addText(text) {
        if (!text) {
          return;
        }
        html.push(sanitizeText(text));
      }
      function addLink(url, text) {
        html.push('<a ');
        if (angular.isDefined(target)) {
          html.push('target="', target, '" ');
        }
        html.push('href="', url.replace('"', '&quot;'), '">');
        addText(text);
        html.push('</a>');
      }
    };
  }]);
})(window, window.angular);



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:firebase/firebase-bower@2.0.5/firebase", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {
(function() {
  var h,
      aa = this;
  function n(a) {
    return void 0 !== a;
  }
  function ba() {}
  function ca(a) {
    a.Qb = function() {
      return a.ef ? a.ef : a.ef = new a;
    };
  }
  function da(a) {
    var b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array)
          return "array";
        if (a instanceof Object)
          return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c)
          return "object";
        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
          return "array";
        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
          return "function";
      } else
        return "null";
    else if ("function" == b && "undefined" == typeof a.call)
      return "object";
    return b;
  }
  function ea(a) {
    return "array" == da(a);
  }
  function fa(a) {
    var b = da(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
  }
  function p(a) {
    return "string" == typeof a;
  }
  function ga(a) {
    return "number" == typeof a;
  }
  function ha(a) {
    return "function" == da(a);
  }
  function ia(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
  }
  function ja(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ka(a, b, c) {
    if (!a)
      throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function() {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function() {
      return a.apply(b, arguments);
    };
  }
  function q(a, b, c) {
    q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ja : ka;
    return q.apply(null, arguments);
  }
  function la(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var b = c.slice();
      b.push.apply(b, arguments);
      return a.apply(this, b);
    };
  }
  var ma = Date.now || function() {
    return +new Date;
  };
  function na(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.oc = b.prototype;
    a.prototype = new c;
    a.Ag = function(a, c, f) {
      return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
    };
  }
  ;
  function oa(a) {
    a = String(a);
    if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
      try {
        return eval("(" + a + ")");
      } catch (b) {}
    throw Error("Invalid JSON string: " + a);
  }
  function pa() {
    this.Id = void 0;
  }
  function qa(a, b, c) {
    switch (typeof b) {
      case "string":
        ra(b, c);
        break;
      case "number":
        c.push(isFinite(b) && !isNaN(b) ? b : "null");
        break;
      case "boolean":
        c.push(b);
        break;
      case "undefined":
        c.push("null");
        break;
      case "object":
        if (null == b) {
          c.push("null");
          break;
        }
        if (ea(b)) {
          var d = b.length;
          c.push("[");
          for (var e = "",
              f = 0; f < d; f++)
            c.push(e), e = b[f], qa(a, a.Id ? a.Id.call(b, String(f), e) : e, c), e = ",";
          c.push("]");
          break;
        }
        c.push("{");
        d = "";
        for (f in b)
          Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), ra(f, c), c.push(":"), qa(a, a.Id ? a.Id.call(b, f, e) : e, c), d = ","));
        c.push("}");
        break;
      case "function":
        break;
      default:
        throw Error("Unknown type: " + typeof b);
    }
  }
  var sa = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\u000b"
  },
      ta = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
  function ra(a, b) {
    b.push('"', a.replace(ta, function(a) {
      if (a in sa)
        return sa[a];
      var b = a.charCodeAt(0),
          e = "\\u";
      16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
      return sa[a] = e + b.toString(16);
    }), '"');
  }
  ;
  function ua(a) {
    return "undefined" !== typeof JSON && n(JSON.parse) ? JSON.parse(a) : oa(a);
  }
  function t(a) {
    if ("undefined" !== typeof JSON && n(JSON.stringify))
      a = JSON.stringify(a);
    else {
      var b = [];
      qa(new pa, a, b);
      a = b.join("");
    }
    return a;
  }
  ;
  function u(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function v(a, b) {
    if (Object.prototype.hasOwnProperty.call(a, b))
      return a[b];
  }
  function va(a, b) {
    for (var c in a)
      Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
  }
  function wa(a) {
    var b = {};
    va(a, function(a, d) {
      b[a] = d;
    });
    return b;
  }
  ;
  function xa(a) {
    this.xc = a;
    this.Hd = "firebase:";
  }
  h = xa.prototype;
  h.set = function(a, b) {
    null == b ? this.xc.removeItem(this.Hd + a) : this.xc.setItem(this.Hd + a, t(b));
  };
  h.get = function(a) {
    a = this.xc.getItem(this.Hd + a);
    return null == a ? null : ua(a);
  };
  h.remove = function(a) {
    this.xc.removeItem(this.Hd + a);
  };
  h.ff = !1;
  h.toString = function() {
    return this.xc.toString();
  };
  function ya() {
    this.ia = {};
  }
  ya.prototype.set = function(a, b) {
    null == b ? delete this.ia[a] : this.ia[a] = b;
  };
  ya.prototype.get = function(a) {
    return u(this.ia, a) ? this.ia[a] : null;
  };
  ya.prototype.remove = function(a) {
    delete this.ia[a];
  };
  ya.prototype.ff = !0;
  function za(a) {
    try {
      if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
        var b = window[a];
        b.setItem("firebase:sentinel", "cache");
        b.removeItem("firebase:sentinel");
        return new xa(b);
      }
    } catch (c) {}
    return new ya;
  }
  var Aa = za("localStorage"),
      Ba = za("sessionStorage");
  function Ca(a, b, c, d, e) {
    this.host = a.toLowerCase();
    this.domain = this.host.substr(this.host.indexOf(".") + 1);
    this.Cb = b;
    this.yb = c;
    this.yg = d;
    this.Gd = e || "";
    this.Ka = Aa.get("host:" + a) || this.host;
  }
  function Da(a, b) {
    b !== a.Ka && (a.Ka = b, "s-" === a.Ka.substr(0, 2) && Aa.set("host:" + a.host, a.Ka));
  }
  Ca.prototype.toString = function() {
    var a = (this.Cb ? "https://" : "http://") + this.host;
    this.Gd && (a += "<" + this.Gd + ">");
    return a;
  };
  function Ea() {
    this.Ta = -1;
  }
  ;
  function Fa() {
    this.Ta = -1;
    this.Ta = 64;
    this.R = [];
    this.be = [];
    this.Af = [];
    this.Dd = [];
    this.Dd[0] = 128;
    for (var a = 1; a < this.Ta; ++a)
      this.Dd[a] = 0;
    this.Rd = this.Tb = 0;
    this.reset();
  }
  na(Fa, Ea);
  Fa.prototype.reset = function() {
    this.R[0] = 1732584193;
    this.R[1] = 4023233417;
    this.R[2] = 2562383102;
    this.R[3] = 271733878;
    this.R[4] = 3285377520;
    this.Rd = this.Tb = 0;
  };
  function Ga(a, b, c) {
    c || (c = 0);
    var d = a.Af;
    if (p(b))
      for (var e = 0; 16 > e; e++)
        d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
    else
      for (e = 0; 16 > e; e++)
        d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
    for (e = 16; 80 > e; e++) {
      var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
      d[e] = (f << 1 | f >>> 31) & 4294967295;
    }
    b = a.R[0];
    c = a.R[1];
    for (var g = a.R[2],
        k = a.R[3],
        l = a.R[4],
        m,
        e = 0; 80 > e; e++)
      40 > e ? 20 > e ? (f = k ^ c & (g ^ k), m = 1518500249) : (f = c ^ g ^ k, m = 1859775393) : 60 > e ? (f = c & g | k & (c | g), m = 2400959708) : (f = c ^ g ^ k, m = 3395469782), f = (b << 5 | b >>> 27) + f + l + m + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
    a.R[0] = a.R[0] + b & 4294967295;
    a.R[1] = a.R[1] + c & 4294967295;
    a.R[2] = a.R[2] + g & 4294967295;
    a.R[3] = a.R[3] + k & 4294967295;
    a.R[4] = a.R[4] + l & 4294967295;
  }
  Fa.prototype.update = function(a, b) {
    n(b) || (b = a.length);
    for (var c = b - this.Ta,
        d = 0,
        e = this.be,
        f = this.Tb; d < b; ) {
      if (0 == f)
        for (; d <= c; )
          Ga(this, a, d), d += this.Ta;
      if (p(a))
        for (; d < b; ) {
          if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Ta) {
            Ga(this, e);
            f = 0;
            break;
          }
        }
      else
        for (; d < b; )
          if (e[f] = a[d], ++f, ++d, f == this.Ta) {
            Ga(this, e);
            f = 0;
            break;
          }
    }
    this.Tb = f;
    this.Rd += b;
  };
  function Ha() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ma()).toString(36);
  }
  ;
  var w = Array.prototype,
      Ia = w.indexOf ? function(a, b, c) {
        return w.indexOf.call(a, b, c);
      } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))
          return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
          if (c in a && a[c] === b)
            return c;
        return -1;
      },
      Ja = w.forEach ? function(a, b, c) {
        w.forEach.call(a, b, c);
      } : function(a, b, c) {
        for (var d = a.length,
            e = p(a) ? a.split("") : a,
            f = 0; f < d; f++)
          f in e && b.call(c, e[f], f, a);
      },
      Ka = w.filter ? function(a, b, c) {
        return w.filter.call(a, b, c);
      } : function(a, b, c) {
        for (var d = a.length,
            e = [],
            f = 0,
            g = p(a) ? a.split("") : a,
            k = 0; k < d; k++)
          if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l);
          }
        return e;
      },
      La = w.map ? function(a, b, c) {
        return w.map.call(a, b, c);
      } : function(a, b, c) {
        for (var d = a.length,
            e = Array(d),
            f = p(a) ? a.split("") : a,
            g = 0; g < d; g++)
          g in f && (e[g] = b.call(c, f[g], g, a));
        return e;
      },
      Ma = w.reduce ? function(a, b, c, d) {
        d && (b = q(b, d));
        return w.reduce.call(a, b, c);
      } : function(a, b, c, d) {
        var e = c;
        Ja(a, function(c, g) {
          e = b.call(d, e, c, g, a);
        });
        return e;
      },
      Na = w.every ? function(a, b, c) {
        return w.every.call(a, b, c);
      } : function(a, b, c) {
        for (var d = a.length,
            e = p(a) ? a.split("") : a,
            f = 0; f < d; f++)
          if (f in e && !b.call(c, e[f], f, a))
            return !1;
        return !0;
      };
  function Oa(a, b) {
    var c = Pa(a, b, void 0);
    return 0 > c ? null : p(a) ? a.charAt(c) : a[c];
  }
  function Pa(a, b, c) {
    for (var d = a.length,
        e = p(a) ? a.split("") : a,
        f = 0; f < d; f++)
      if (f in e && b.call(c, e[f], f, a))
        return f;
    return -1;
  }
  function Qa(a, b) {
    var c = Ia(a, b);
    0 <= c && w.splice.call(a, c, 1);
  }
  function Ra(a, b, c, d) {
    return w.splice.apply(a, Sa(arguments, 1));
  }
  function Sa(a, b, c) {
    return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c);
  }
  function Ta(a, b) {
    a.sort(b || Ua);
  }
  function Ua(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
  ;
  var Va;
  a: {
    var Wa = aa.navigator;
    if (Wa) {
      var Xa = Wa.userAgent;
      if (Xa) {
        Va = Xa;
        break a;
      }
    }
    Va = "";
  }
  function Ya(a) {
    return -1 != Va.indexOf(a);
  }
  ;
  var Za = Ya("Opera") || Ya("OPR"),
      $a = Ya("Trident") || Ya("MSIE"),
      ab = Ya("Gecko") && -1 == Va.toLowerCase().indexOf("webkit") && !(Ya("Trident") || Ya("MSIE")),
      bb = -1 != Va.toLowerCase().indexOf("webkit");
  (function() {
    var a = "",
        b;
    if (Za && aa.opera)
      return a = aa.opera.version, ha(a) ? a() : a;
    ab ? b = /rv\:([^\);]+)(\)|;)/ : $a ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : bb && (b = /WebKit\/(\S+)/);
    b && (a = (a = b.exec(Va)) ? a[1] : "");
    return $a && (b = (b = aa.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a;
  })();
  var cb = null,
      db = null,
      eb = null;
  function fb(a, b) {
    if (!fa(a))
      throw Error("encodeByteArray takes an array as a parameter");
    gb();
    for (var c = b ? db : cb,
        d = [],
        e = 0; e < a.length; e += 3) {
      var f = a[e],
          g = e + 1 < a.length,
          k = g ? a[e + 1] : 0,
          l = e + 2 < a.length,
          m = l ? a[e + 2] : 0,
          r = f >> 2,
          f = (f & 3) << 4 | k >> 4,
          k = (k & 15) << 2 | m >> 6,
          m = m & 63;
      l || (m = 64, g || (k = 64));
      d.push(c[r], c[f], c[k], c[m]);
    }
    return d.join("");
  }
  function gb() {
    if (!cb) {
      cb = {};
      db = {};
      eb = {};
      for (var a = 0; 65 > a; a++)
        cb[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), db[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), eb[db[a]] = a;
    }
  }
  ;
  var hb = function() {
    var a = 1;
    return function() {
      return a++;
    };
  }();
  function x(a, b) {
    if (!a)
      throw ib(b);
  }
  function ib(a) {
    return Error("Firebase INTERNAL ASSERT FAILED:" + a);
  }
  function jb(a) {
    try {
      var b;
      if ("undefined" !== typeof atob)
        b = atob(a);
      else {
        gb();
        for (var c = eb,
            d = [],
            e = 0; e < a.length; ) {
          var f = c[a.charAt(e++)],
              g = e < a.length ? c[a.charAt(e)] : 0;
          ++e;
          var k = e < a.length ? c[a.charAt(e)] : 64;
          ++e;
          var l = e < a.length ? c[a.charAt(e)] : 64;
          ++e;
          if (null == f || null == g || null == k || null == l)
            throw Error();
          d.push(f << 2 | g >> 4);
          64 != k && (d.push(g << 4 & 240 | k >> 2), 64 != l && d.push(k << 6 & 192 | l));
        }
        if (8192 > d.length)
          b = String.fromCharCode.apply(null, d);
        else {
          a = "";
          for (c = 0; c < d.length; c += 8192)
            a += String.fromCharCode.apply(null, Sa(d, c, c + 8192));
          b = a;
        }
      }
      return b;
    } catch (m) {
      kb("base64Decode failed: ", m);
    }
    return null;
  }
  function lb(a) {
    var b = mb(a);
    a = new Fa;
    a.update(b);
    var b = [],
        c = 8 * a.Rd;
    56 > a.Tb ? a.update(a.Dd, 56 - a.Tb) : a.update(a.Dd, a.Ta - (a.Tb - 56));
    for (var d = a.Ta - 1; 56 <= d; d--)
      a.be[d] = c & 255, c /= 256;
    Ga(a, a.be);
    for (d = c = 0; 5 > d; d++)
      for (var e = 24; 0 <= e; e -= 8)
        b[c] = a.R[d] >> e & 255, ++c;
    return fb(b);
  }
  function nb(a) {
    for (var b = "",
        c = 0; c < arguments.length; c++)
      b = fa(arguments[c]) ? b + nb.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + t(arguments[c]) : b + arguments[c], b += " ";
    return b;
  }
  var ob = null,
      pb = !0;
  function kb(a) {
    !0 === pb && (pb = !1, null === ob && !0 === Ba.get("logging_enabled") && qb(!0));
    if (ob) {
      var b = nb.apply(null, arguments);
      ob(b);
    }
  }
  function rb(a) {
    return function() {
      kb(a, arguments);
    };
  }
  function sb(a) {
    if ("undefined" !== typeof console) {
      var b = "FIREBASE INTERNAL ERROR: " + nb.apply(null, arguments);
      "undefined" !== typeof console.error ? console.error(b) : console.log(b);
    }
  }
  function tb(a) {
    var b = nb.apply(null, arguments);
    throw Error("FIREBASE FATAL ERROR: " + b);
  }
  function z(a) {
    if ("undefined" !== typeof console) {
      var b = "FIREBASE WARNING: " + nb.apply(null, arguments);
      "undefined" !== typeof console.warn ? console.warn(b) : console.log(b);
    }
  }
  function ub(a) {
    var b = "",
        c = "",
        d = "",
        e = !0,
        f = "https",
        g = "";
    if (p(a)) {
      var k = a.indexOf("//");
      0 <= k && (f = a.substring(0, k - 1), a = a.substring(k + 2));
      k = a.indexOf("/");
      -1 === k && (k = a.length);
      b = a.substring(0, k);
      a = a.substring(k + 1);
      var l = b.split(".");
      if (3 === l.length) {
        k = l[2].indexOf(":");
        e = 0 <= k ? "https" === f || "wss" === f : !0;
        c = l[1];
        d = l[0];
        g = "";
        a = ("/" + a).split("/");
        for (k = 0; k < a.length; k++)
          if (0 < a[k].length) {
            l = a[k];
            try {
              l = decodeURIComponent(l.replace(/\+/g, " "));
            } catch (m) {}
            g += "/" + l;
          }
        d = d.toLowerCase();
      } else
        2 === l.length && (c = l[0]);
    }
    return {
      host: b,
      domain: c,
      vg: d,
      Cb: e,
      scheme: f,
      Pc: g
    };
  }
  function vb(a) {
    return ga(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY);
  }
  function wb(a) {
    if ("complete" === document.readyState)
      a();
    else {
      var b = !1,
          c = function() {
            document.body ? b || (b = !0, a()) : setTimeout(c, Math.floor(10));
          };
      document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
        "complete" === document.readyState && c();
      }), window.attachEvent("onload", c));
    }
  }
  function xb(a, b) {
    if (a === b)
      return 0;
    if ("[MIN_NAME]" === a || "[MAX_NAME]" === b)
      return -1;
    if ("[MIN_NAME]" === b || "[MAX_NAME]" === a)
      return 1;
    var c = yb(a),
        d = yb(b);
    return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1;
  }
  function zb(a, b) {
    if (b && a in b)
      return b[a];
    throw Error("Missing required key (" + a + ") in object: " + t(b));
  }
  function Ab(a) {
    if ("object" !== typeof a || null === a)
      return t(a);
    var b = [],
        c;
    for (c in a)
      b.push(c);
    b.sort();
    c = "{";
    for (var d = 0; d < b.length; d++)
      0 !== d && (c += ","), c += t(b[d]), c += ":", c += Ab(a[b[d]]);
    return c + "}";
  }
  function Bb(a, b) {
    if (a.length <= b)
      return [a];
    for (var c = [],
        d = 0; d < a.length; d += b)
      d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
    return c;
  }
  function Cb(a, b) {
    if (ea(a))
      for (var c = 0; c < a.length; ++c)
        b(c, a[c]);
    else
      A(a, b);
  }
  function Db(a) {
    x(!vb(a), "Invalid JSON number");
    var b,
        c,
        d,
        e;
    0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
    e = [];
    for (a = 52; a; a -= 1)
      e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
    for (a = 11; a; a -= 1)
      e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
    e.push(b ? 1 : 0);
    e.reverse();
    b = e.join("");
    c = "";
    for (a = 0; 64 > a; a += 8)
      d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length && (d = "0" + d), c += d;
    return c.toLowerCase();
  }
  var Eb = /^-?\d{1,10}$/;
  function yb(a) {
    return Eb.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null;
  }
  function Fb(a) {
    try {
      a();
    } catch (b) {
      setTimeout(function() {
        throw b;
      }, Math.floor(0));
    }
  }
  function B(a, b) {
    if (ha(a)) {
      var c = Array.prototype.slice.call(arguments, 1).slice();
      Fb(function() {
        a.apply(null, c);
      });
    }
  }
  ;
  function Gb(a, b, c, d) {
    this.me = b;
    this.Ld = c;
    this.Rc = d;
    this.nd = a;
  }
  Gb.prototype.Rb = function() {
    var a = this.Ld.hc();
    return "value" === this.nd ? a.path : a.parent().path;
  };
  Gb.prototype.oe = function() {
    return this.nd;
  };
  Gb.prototype.Pb = function() {
    return this.me.Pb(this);
  };
  Gb.prototype.toString = function() {
    return this.Rb().toString() + ":" + this.nd + ":" + t(this.Ld.Xe());
  };
  function Hb(a, b, c) {
    this.me = a;
    this.error = b;
    this.path = c;
  }
  Hb.prototype.Rb = function() {
    return this.path;
  };
  Hb.prototype.oe = function() {
    return "cancel";
  };
  Hb.prototype.Pb = function() {
    return this.me.Pb(this);
  };
  Hb.prototype.toString = function() {
    return this.path.toString() + ":cancel";
  };
  function Ib(a, b, c) {
    this.Kb = a;
    this.mb = b;
    this.vc = c || null;
  }
  h = Ib.prototype;
  h.pf = function(a) {
    return "value" === a;
  };
  h.createEvent = function(a, b) {
    var c = b.w.m;
    return new Gb("value", this, new C(a.Wa, b.hc(), c));
  };
  h.Pb = function(a) {
    var b = this.vc;
    if ("cancel" === a.oe()) {
      x(this.mb, "Raising a cancel event on a listener with no cancel callback");
      var c = this.mb;
      return function() {
        c.call(b, a.error);
      };
    }
    var d = this.Kb;
    return function() {
      d.call(b, a.Ld);
    };
  };
  h.Te = function(a, b) {
    return this.mb ? new Hb(this, a, b) : null;
  };
  h.matches = function(a) {
    return a instanceof Ib && (!a.Kb || !this.Kb || a.Kb === this.Kb) && a.vc === this.vc;
  };
  h.cf = function() {
    return null !== this.Kb;
  };
  function Jb(a, b, c) {
    this.ca = a;
    this.mb = b;
    this.vc = c;
  }
  h = Jb.prototype;
  h.pf = function(a) {
    a = "children_added" === a ? "child_added" : a;
    return ("children_removed" === a ? "child_removed" : a) in this.ca;
  };
  h.Te = function(a, b) {
    return this.mb ? new Hb(this, a, b) : null;
  };
  h.createEvent = function(a, b) {
    var c = b.hc().k(a.nb);
    return new Gb(a.type, this, new C(a.Wa, c, b.w.m), a.Rc);
  };
  h.Pb = function(a) {
    var b = this.vc;
    if ("cancel" === a.oe()) {
      x(this.mb, "Raising a cancel event on a listener with no cancel callback");
      var c = this.mb;
      return function() {
        c.call(b, a.error);
      };
    }
    var d = this.ca[a.nd];
    return function() {
      d.call(b, a.Ld, a.Rc);
    };
  };
  h.matches = function(a) {
    if (a instanceof Jb) {
      if (this.ca && a.ca) {
        var b = Kb(a.ca);
        if (b === Kb(this.ca)) {
          if (1 === b) {
            var b = Lb(a.ca),
                c = Lb(this.ca);
            return c === b && (!a.ca[b] || !this.ca[c] || a.ca[b] === this.ca[c]);
          }
          return Mb(this.ca, function(b, c) {
            return a.ca[c] === b;
          });
        }
        return !1;
      }
      return !0;
    }
    return !1;
  };
  h.cf = function() {
    return null !== this.ca;
  };
  function mb(a) {
    for (var b = [],
        c = 0,
        d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      55296 <= e && 56319 >= e && (e -= 55296, d++, x(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
      128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
    }
    return b;
  }
  ;
  function D(a, b, c, d) {
    var e;
    d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
    if (e)
      throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
  }
  function E(a, b, c) {
    var d = "";
    switch (b) {
      case 1:
        d = c ? "first" : "First";
        break;
      case 2:
        d = c ? "second" : "Second";
        break;
      case 3:
        d = c ? "third" : "Third";
        break;
      case 4:
        d = c ? "fourth" : "Fourth";
        break;
      default:
        throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
    }
    return a = a + " failed: " + (d + " argument ");
  }
  function F(a, b, c, d) {
    if ((!d || n(c)) && !ha(c))
      throw Error(E(a, b, d) + "must be a valid function.");
  }
  function Nb(a, b, c) {
    if (n(c) && (!ia(c) || null === c))
      throw Error(E(a, b, !0) + "must be a valid context object.");
  }
  ;
  var Ob = /[\[\].#$\/\u0000-\u001F\u007F]/,
      Pb = /[\[\].#$\u0000-\u001F\u007F]/;
  function Qb(a) {
    return p(a) && 0 !== a.length && !Ob.test(a);
  }
  function Rb(a) {
    return null === a || p(a) || ga(a) && !vb(a) || ia(a) && u(a, ".sv");
  }
  function Sb(a, b, c) {
    c && !n(b) || Tb(E(a, 1, c), b);
  }
  function Tb(a, b, c, d) {
    c || (c = 0);
    d = d || [];
    if (!n(b))
      throw Error(a + "contains undefined" + Ub(d));
    if (ha(b))
      throw Error(a + "contains a function" + Ub(d) + " with contents: " + b.toString());
    if (vb(b))
      throw Error(a + "contains " + b.toString() + Ub(d));
    if (1E3 < c)
      throw new TypeError(a + "contains a cyclic object value (" + d.slice(0, 100).join(".") + "...)");
    if (p(b) && b.length > 10485760 / 3 && 10485760 < mb(b).length)
      throw Error(a + "contains a string greater than 10485760 utf8 bytes" + Ub(d) + " ('" + b.substring(0, 50) + "...')");
    if (ia(b))
      for (var e in b)
        if (u(b, e)) {
          var f = b[e];
          if (".priority" !== e && ".value" !== e && ".sv" !== e && !Qb(e))
            throw Error(a + " contains an invalid key (" + e + ")" + Ub(d) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
          d.push(e);
          Tb(a, f, c + 1, d);
          d.pop();
        }
  }
  function Ub(a) {
    return 0 == a.length ? "" : " in property '" + a.join(".") + "'";
  }
  function Vb(a, b) {
    if (!ia(b) || ea(b))
      throw Error(E(a, 1, !1) + " must be an Object containing the children to replace.");
    Sb(a, b, !1);
  }
  function Wb(a, b, c) {
    if (vb(c))
      throw Error(E(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
    if (!Rb(c))
      throw Error(E(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
  }
  function Xb(a, b, c) {
    if (!c || n(b))
      switch (b) {
        case "value":
        case "child_added":
        case "child_removed":
        case "child_changed":
        case "child_moved":
          break;
        default:
          throw Error(E(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
      }
  }
  function Yb(a, b, c, d) {
    if ((!d || n(c)) && !Qb(c))
      throw Error(E(a, b, d) + 'was an invalid key: "' + c + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
  }
  function Zb(a, b) {
    if (!p(b) || 0 === b.length || Pb.test(b))
      throw Error(E(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
  }
  function $b(a, b) {
    if (".info" === G(b))
      throw Error(a + " failed: Can't modify data under /.info/");
  }
  function ac(a, b) {
    if (!p(b))
      throw Error(E(a, 1, !1) + "must be a valid credential (a string).");
  }
  function bc(a, b, c) {
    if (!p(c))
      throw Error(E(a, b, !1) + "must be a valid string.");
  }
  function cc(a, b, c, d) {
    if (!d || n(c))
      if (!ia(c) || null === c)
        throw Error(E(a, b, d) + "must be a valid object.");
  }
  function dc(a, b, c) {
    if (!ia(b) || null === b || !u(b, c))
      throw Error(E(a, 1, !1) + 'must contain the key "' + c + '"');
    if (!p(v(b, c)))
      throw Error(E(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
  }
  ;
  function ec(a, b) {
    return xb(a.name, b.name);
  }
  function fc(a, b) {
    return xb(a, b);
  }
  ;
  function gc() {}
  var hc = {};
  function H(a) {
    return q(a.compare, a);
  }
  gc.prototype.df = function(a, b) {
    return 0 !== this.compare(new I("[MIN_NAME]", a), new I("[MIN_NAME]", b));
  };
  gc.prototype.Ae = function() {
    return ic;
  };
  function jc(a) {
    this.Vb = a;
  }
  na(jc, gc);
  h = jc.prototype;
  h.se = function(a) {
    return !a.B(this.Vb).e();
  };
  h.compare = function(a, b) {
    var c = a.K.B(this.Vb),
        d = b.K.B(this.Vb),
        c = c.he(d);
    return 0 === c ? xb(a.name, b.name) : c;
  };
  h.ye = function(a, b) {
    var c = J(a),
        c = K.I(this.Vb, c);
    return new I(b, c);
  };
  h.ze = function() {
    var a = K.I(this.Vb, kc);
    return new I("[MAX_NAME]", a);
  };
  h.toString = function() {
    return this.Vb;
  };
  var L = new jc(".priority");
  function lc() {}
  na(lc, gc);
  h = lc.prototype;
  h.compare = function(a, b) {
    return xb(a.name, b.name);
  };
  h.se = function() {
    throw ib("KeyIndex.isDefinedOn not expected to be called.");
  };
  h.df = function() {
    return !1;
  };
  h.Ae = function() {
    return ic;
  };
  h.ze = function() {
    return new I("[MAX_NAME]", K);
  };
  h.ye = function(a) {
    x(p(a), "KeyIndex indexValue must always be a string.");
    return new I(a, K);
  };
  h.toString = function() {
    return ".key";
  };
  var mc = new lc;
  function nc() {
    this.yc = this.na = this.nc = this.ha = this.ka = !1;
    this.xb = 0;
    this.Hb = "";
    this.Bc = null;
    this.Xb = "";
    this.Ac = null;
    this.Ub = "";
    this.m = L;
  }
  var oc = new nc;
  function pc(a) {
    x(a.ha, "Only valid if start has been set");
    return a.Bc;
  }
  function qc(a) {
    x(a.ha, "Only valid if start has been set");
    return a.nc ? a.Xb : "[MIN_NAME]";
  }
  function rc(a) {
    x(a.na, "Only valid if end has been set");
    return a.Ac;
  }
  function sc(a) {
    x(a.na, "Only valid if end has been set");
    return a.yc ? a.Ub : "[MAX_NAME]";
  }
  function tc(a) {
    x(a.ka, "Only valid if limit has been set");
    return a.xb;
  }
  function uc(a) {
    var b = new nc;
    b.ka = a.ka;
    b.xb = a.xb;
    b.ha = a.ha;
    b.Bc = a.Bc;
    b.nc = a.nc;
    b.Xb = a.Xb;
    b.na = a.na;
    b.Ac = a.Ac;
    b.yc = a.yc;
    b.Ub = a.Ub;
    b.m = a.m;
    return b;
  }
  h = nc.prototype;
  h.ve = function(a) {
    var b = uc(this);
    b.ka = !0;
    b.xb = a;
    b.Hb = "";
    return b;
  };
  h.we = function(a) {
    var b = uc(this);
    b.ka = !0;
    b.xb = a;
    b.Hb = "l";
    return b;
  };
  h.xe = function(a) {
    var b = uc(this);
    b.ka = !0;
    b.xb = a;
    b.Hb = "r";
    return b;
  };
  h.Md = function(a, b) {
    var c = uc(this);
    c.ha = !0;
    c.Bc = a;
    null != b ? (c.nc = !0, c.Xb = b) : (c.nc = !1, c.Xb = "");
    return c;
  };
  h.md = function(a, b) {
    var c = uc(this);
    c.na = !0;
    c.Ac = a;
    n(b) ? (c.yc = !0, c.Ub = b) : (c.Dg = !1, c.Ub = "");
    return c;
  };
  function vc(a, b) {
    var c = uc(a);
    c.m = b;
    return c;
  }
  function wc(a) {
    return !(a.ha || a.na || a.ka);
  }
  ;
  function M(a, b, c, d) {
    this.g = a;
    this.path = b;
    this.w = c;
    this.dc = d;
  }
  function xc(a) {
    var b = null,
        c = null;
    a.ha && (b = pc(a));
    a.na && (c = rc(a));
    if (a.m === mc) {
      if (a.ha) {
        if ("[MIN_NAME]" != qc(a))
          throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
        if (null != b && "string" !== typeof b)
          throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
      }
      if (a.na) {
        if ("[MAX_NAME]" != sc(a))
          throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
        if (null != c && "string" !== typeof c)
          throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
      }
    } else if (a.m === L) {
      if (null != b && !Rb(b) || null != c && !Rb(c))
        throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
    } else if (x(a.m instanceof jc, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c)
      throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
  }
  function yc(a) {
    if (a.ha && a.na && a.ka && (!a.ka || "" === a.Hb))
      throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
  }
  function zc(a, b) {
    if (!0 === a.dc)
      throw Error(b + ": You can't combine multiple orderBy calls.");
  }
  M.prototype.hc = function() {
    D("Query.ref", 0, 0, arguments.length);
    return new O(this.g, this.path);
  };
  M.prototype.ref = M.prototype.hc;
  M.prototype.zb = function(a, b, c, d) {
    D("Query.on", 2, 4, arguments.length);
    Xb("Query.on", a, !1);
    F("Query.on", 2, b, !1);
    var e = Ac("Query.on", c, d);
    if ("value" === a)
      Bc(this.g, this, new Ib(b, e.cancel || null, e.Ha || null));
    else {
      var f = {};
      f[a] = b;
      Bc(this.g, this, new Jb(f, e.cancel, e.Ha));
    }
    return b;
  };
  M.prototype.on = M.prototype.zb;
  M.prototype.bc = function(a, b, c) {
    D("Query.off", 0, 3, arguments.length);
    Xb("Query.off", a, !0);
    F("Query.off", 2, b, !0);
    Nb("Query.off", 3, c);
    var d = null,
        e = null;
    "value" === a ? d = new Ib(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new Jb(e, null, c || null));
    e = this.g;
    d = ".info" === G(this.path) ? e.ud.hb(this, d) : e.M.hb(this, d);
    Cc(e.Z, this.path, d);
  };
  M.prototype.off = M.prototype.bc;
  M.prototype.gg = function(a, b) {
    function c(g) {
      f && (f = !1, e.bc(a, c), b.call(d.Ha, g));
    }
    D("Query.once", 2, 4, arguments.length);
    Xb("Query.once", a, !1);
    F("Query.once", 2, b, !1);
    var d = Ac("Query.once", arguments[2], arguments[3]),
        e = this,
        f = !0;
    this.zb(a, c, function(b) {
      e.bc(a, c);
      d.cancel && d.cancel.call(d.Ha, b);
    });
  };
  M.prototype.once = M.prototype.gg;
  M.prototype.ve = function(a) {
    z("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
    D("Query.limit", 1, 1, arguments.length);
    if (!ga(a) || Math.floor(a) !== a || 0 >= a)
      throw Error("Query.limit: First argument must be a positive integer.");
    if (this.w.ka)
      throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
    var b = this.w.ve(a);
    yc(b);
    return new M(this.g, this.path, b, this.dc);
  };
  M.prototype.limit = M.prototype.ve;
  M.prototype.we = function(a) {
    D("Query.limitToFirst", 1, 1, arguments.length);
    if (!ga(a) || Math.floor(a) !== a || 0 >= a)
      throw Error("Query.limitToFirst: First argument must be a positive integer.");
    if (this.w.ka)
      throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
    return new M(this.g, this.path, this.w.we(a), this.dc);
  };
  M.prototype.limitToFirst = M.prototype.we;
  M.prototype.xe = function(a) {
    D("Query.limitToLast", 1, 1, arguments.length);
    if (!ga(a) || Math.floor(a) !== a || 0 >= a)
      throw Error("Query.limitToLast: First argument must be a positive integer.");
    if (this.w.ka)
      throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
    return new M(this.g, this.path, this.w.xe(a), this.dc);
  };
  M.prototype.limitToLast = M.prototype.xe;
  M.prototype.hg = function(a) {
    D("Query.orderByChild", 1, 1, arguments.length);
    if ("$key" === a)
      throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
    if ("$priority" === a)
      throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
    Yb("Query.orderByChild", 1, a, !1);
    zc(this, "Query.orderByChild");
    var b = vc(this.w, new jc(a));
    xc(b);
    return new M(this.g, this.path, b, !0);
  };
  M.prototype.orderByChild = M.prototype.hg;
  M.prototype.ig = function() {
    D("Query.orderByKey", 0, 0, arguments.length);
    zc(this, "Query.orderByKey");
    var a = vc(this.w, mc);
    xc(a);
    return new M(this.g, this.path, a, !0);
  };
  M.prototype.orderByKey = M.prototype.ig;
  M.prototype.jg = function() {
    D("Query.orderByPriority", 0, 0, arguments.length);
    zc(this, "Query.orderByPriority");
    var a = vc(this.w, L);
    xc(a);
    return new M(this.g, this.path, a, !0);
  };
  M.prototype.orderByPriority = M.prototype.jg;
  M.prototype.Md = function(a, b) {
    D("Query.startAt", 0, 2, arguments.length);
    Sb("Query.startAt", a, !0);
    Yb("Query.startAt", 2, b, !0);
    var c = this.w.Md(a, b);
    yc(c);
    xc(c);
    if (this.w.ha)
      throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
    n(a) || (b = a = null);
    return new M(this.g, this.path, c, this.dc);
  };
  M.prototype.startAt = M.prototype.Md;
  M.prototype.md = function(a, b) {
    D("Query.endAt", 0, 2, arguments.length);
    Sb("Query.endAt", a, !0);
    Yb("Query.endAt", 2, b, !0);
    var c = this.w.md(a, b);
    yc(c);
    xc(c);
    if (this.w.na)
      throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
    return new M(this.g, this.path, c, this.dc);
  };
  M.prototype.endAt = M.prototype.md;
  M.prototype.Of = function(a, b) {
    D("Query.equalTo", 1, 2, arguments.length);
    Sb("Query.equalTo", a, !1);
    Yb("Query.equalTo", 2, b, !0);
    if (this.w.ha)
      throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
    if (this.w.na)
      throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
    return this.Md(a, b).md(a, b);
  };
  M.prototype.equalTo = M.prototype.Of;
  function Dc(a) {
    a = a.w;
    var b = {};
    a.ha && (b.sp = a.Bc, a.nc && (b.sn = a.Xb));
    a.na && (b.ep = a.Ac, a.yc && (b.en = a.Ub));
    if (a.ka) {
      b.l = a.xb;
      var c = a.Hb;
      "" === c && (c = a.ha ? "l" : "r");
      b.vf = c;
    }
    a.m !== L && (b.i = a.m.toString());
    return b;
  }
  M.prototype.Da = function() {
    var a = Ab(Dc(this));
    return "{}" === a ? "default" : a;
  };
  function Ac(a, b, c) {
    var d = {
      cancel: null,
      Ha: null
    };
    if (b && c)
      d.cancel = b, F(a, 3, d.cancel, !0), d.Ha = c, Nb(a, 4, d.Ha);
    else if (b)
      if ("object" === typeof b && null !== b)
        d.Ha = b;
      else if ("function" === typeof b)
        d.cancel = b;
      else
        throw Error(E(a, 3, !0) + " must either be a cancel callback or a context object.");
    return d;
  }
  ;
  function P(a, b) {
    if (1 == arguments.length) {
      this.n = a.split("/");
      for (var c = 0,
          d = 0; d < this.n.length; d++)
        0 < this.n[d].length && (this.n[c] = this.n[d], c++);
      this.n.length = c;
      this.ba = 0;
    } else
      this.n = a, this.ba = b;
  }
  function G(a) {
    return a.ba >= a.n.length ? null : a.n[a.ba];
  }
  function Q(a) {
    return a.n.length - a.ba;
  }
  function R(a) {
    var b = a.ba;
    b < a.n.length && b++;
    return new P(a.n, b);
  }
  P.prototype.toString = function() {
    for (var a = "",
        b = this.ba; b < this.n.length; b++)
      "" !== this.n[b] && (a += "/" + this.n[b]);
    return a || "/";
  };
  P.prototype.parent = function() {
    if (this.ba >= this.n.length)
      return null;
    for (var a = [],
        b = this.ba; b < this.n.length - 1; b++)
      a.push(this.n[b]);
    return new P(a, 0);
  };
  P.prototype.k = function(a) {
    for (var b = [],
        c = this.ba; c < this.n.length; c++)
      b.push(this.n[c]);
    if (a instanceof P)
      for (c = a.ba; c < a.n.length; c++)
        b.push(a.n[c]);
    else
      for (a = a.split("/"), c = 0; c < a.length; c++)
        0 < a[c].length && b.push(a[c]);
    return new P(b, 0);
  };
  P.prototype.e = function() {
    return this.ba >= this.n.length;
  };
  var S = new P("");
  function T(a, b) {
    var c = G(a);
    if (null === c)
      return b;
    if (c === G(b))
      return T(R(a), R(b));
    throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
  }
  P.prototype.da = function(a) {
    if (Q(this) !== Q(a))
      return !1;
    for (var b = this.ba,
        c = a.ba; b <= this.n.length; b++, c++)
      if (this.n[b] !== a.n[c])
        return !1;
    return !0;
  };
  P.prototype.contains = function(a) {
    var b = this.ba,
        c = a.ba;
    if (Q(this) > Q(a))
      return !1;
    for (; b < this.n.length; ) {
      if (this.n[b] !== a.n[c])
        return !1;
      ++b;
      ++c;
    }
    return !0;
  };
  function Ec() {
    this.children = {};
    this.dd = 0;
    this.value = null;
  }
  function Fc(a, b, c) {
    this.yd = a ? a : "";
    this.Oc = b ? b : null;
    this.D = c ? c : new Ec;
  }
  function Gc(a, b) {
    for (var c = b instanceof P ? b : new P(b),
        d = a,
        e; null !== (e = G(c)); )
      d = new Fc(e, d, v(d.D.children, e) || new Ec), c = R(c);
    return d;
  }
  h = Fc.prototype;
  h.ta = function() {
    return this.D.value;
  };
  function Hc(a, b) {
    x("undefined" !== typeof b, "Cannot set value to undefined");
    a.D.value = b;
    Ic(a);
  }
  h.clear = function() {
    this.D.value = null;
    this.D.children = {};
    this.D.dd = 0;
    Ic(this);
  };
  h.pd = function() {
    return 0 < this.D.dd;
  };
  h.e = function() {
    return null === this.ta() && !this.pd();
  };
  h.ea = function(a) {
    var b = this;
    A(this.D.children, function(c, d) {
      a(new Fc(d, b, c));
    });
  };
  function Jc(a, b, c, d) {
    c && !d && b(a);
    a.ea(function(a) {
      Jc(a, b, !0, d);
    });
    c && d && b(a);
  }
  function Kc(a, b) {
    for (var c = a.parent(); null !== c && !b(c); )
      c = c.parent();
  }
  h.path = function() {
    return new P(null === this.Oc ? this.yd : this.Oc.path() + "/" + this.yd);
  };
  h.name = function() {
    return this.yd;
  };
  h.parent = function() {
    return this.Oc;
  };
  function Ic(a) {
    if (null !== a.Oc) {
      var b = a.Oc,
          c = a.yd,
          d = a.e(),
          e = u(b.D.children, c);
      d && e ? (delete b.D.children[c], b.D.dd--, Ic(b)) : d || e || (b.D.children[c] = a.D, b.D.dd++, Ic(b));
    }
  }
  ;
  function Lc(a, b) {
    this.Ga = a;
    this.pa = b ? b : Mc;
  }
  h = Lc.prototype;
  h.Ja = function(a, b) {
    return new Lc(this.Ga, this.pa.Ja(a, b, this.Ga).W(null, null, !1, null, null));
  };
  h.remove = function(a) {
    return new Lc(this.Ga, this.pa.remove(a, this.Ga).W(null, null, !1, null, null));
  };
  h.get = function(a) {
    for (var b,
        c = this.pa; !c.e(); ) {
      b = this.Ga(a, c.key);
      if (0 === b)
        return c.value;
      0 > b ? c = c.left : 0 < b && (c = c.right);
    }
    return null;
  };
  function Nc(a, b) {
    for (var c,
        d = a.pa,
        e = null; !d.e(); ) {
      c = a.Ga(b, d.key);
      if (0 === c) {
        if (d.left.e())
          return e ? e.key : null;
        for (d = d.left; !d.right.e(); )
          d = d.right;
        return d.key;
      }
      0 > c ? d = d.left : 0 < c && (e = d, d = d.right);
    }
    throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
  }
  h.e = function() {
    return this.pa.e();
  };
  h.count = function() {
    return this.pa.count();
  };
  h.Ic = function() {
    return this.pa.Ic();
  };
  h.Zb = function() {
    return this.pa.Zb();
  };
  h.Ba = function(a) {
    return this.pa.Ba(a);
  };
  h.Aa = function(a) {
    return new Oc(this.pa, null, this.Ga, !1, a);
  };
  h.rb = function(a, b) {
    return new Oc(this.pa, a, this.Ga, !1, b);
  };
  h.Sb = function(a, b) {
    return new Oc(this.pa, a, this.Ga, !0, b);
  };
  h.bf = function(a) {
    return new Oc(this.pa, null, this.Ga, !0, a);
  };
  function Oc(a, b, c, d, e) {
    this.qf = e || null;
    this.te = d;
    this.ac = [];
    for (e = 1; !a.e(); )
      if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e)
        a = this.te ? a.left : a.right;
      else if (0 === e) {
        this.ac.push(a);
        break;
      } else
        this.ac.push(a), a = this.te ? a.right : a.left;
  }
  function U(a) {
    if (0 === a.ac.length)
      return null;
    var b = a.ac.pop(),
        c;
    c = a.qf ? a.qf(b.key, b.value) : {
      key: b.key,
      value: b.value
    };
    if (a.te)
      for (b = b.left; !b.e(); )
        a.ac.push(b), b = b.right;
    else
      for (b = b.right; !b.e(); )
        a.ac.push(b), b = b.left;
    return c;
  }
  function Pc(a, b, c, d, e) {
    this.key = a;
    this.value = b;
    this.color = null != c ? c : !0;
    this.left = null != d ? d : Mc;
    this.right = null != e ? e : Mc;
  }
  h = Pc.prototype;
  h.W = function(a, b, c, d, e) {
    return new Pc(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right);
  };
  h.count = function() {
    return this.left.count() + 1 + this.right.count();
  };
  h.e = function() {
    return !1;
  };
  h.Ba = function(a) {
    return this.left.Ba(a) || a(this.key, this.value) || this.right.Ba(a);
  };
  function Qc(a) {
    return a.left.e() ? a : Qc(a.left);
  }
  h.Ic = function() {
    return Qc(this).key;
  };
  h.Zb = function() {
    return this.right.e() ? this.key : this.right.Zb();
  };
  h.Ja = function(a, b, c) {
    var d,
        e;
    e = this;
    d = c(a, e.key);
    e = 0 > d ? e.W(null, null, null, e.left.Ja(a, b, c), null) : 0 === d ? e.W(null, b, null, null, null) : e.W(null, null, null, null, e.right.Ja(a, b, c));
    return Rc(e);
  };
  function Sc(a) {
    if (a.left.e())
      return Mc;
    a.left.aa() || a.left.left.aa() || (a = Tc(a));
    a = a.W(null, null, null, Sc(a.left), null);
    return Rc(a);
  }
  h.remove = function(a, b) {
    var c,
        d;
    c = this;
    if (0 > b(a, c.key))
      c.left.e() || c.left.aa() || c.left.left.aa() || (c = Tc(c)), c = c.W(null, null, null, c.left.remove(a, b), null);
    else {
      c.left.aa() && (c = Uc(c));
      c.right.e() || c.right.aa() || c.right.left.aa() || (c = Vc(c), c.left.left.aa() && (c = Uc(c), c = Vc(c)));
      if (0 === b(a, c.key)) {
        if (c.right.e())
          return Mc;
        d = Qc(c.right);
        c = c.W(d.key, d.value, null, null, Sc(c.right));
      }
      c = c.W(null, null, null, null, c.right.remove(a, b));
    }
    return Rc(c);
  };
  h.aa = function() {
    return this.color;
  };
  function Rc(a) {
    a.right.aa() && !a.left.aa() && (a = Wc(a));
    a.left.aa() && a.left.left.aa() && (a = Uc(a));
    a.left.aa() && a.right.aa() && (a = Vc(a));
    return a;
  }
  function Tc(a) {
    a = Vc(a);
    a.right.left.aa() && (a = a.W(null, null, null, null, Uc(a.right)), a = Wc(a), a = Vc(a));
    return a;
  }
  function Wc(a) {
    return a.right.W(null, null, a.color, a.W(null, null, !0, null, a.right.left), null);
  }
  function Uc(a) {
    return a.left.W(null, null, a.color, null, a.W(null, null, !0, a.left.right, null));
  }
  function Vc(a) {
    return a.W(null, null, !a.color, a.left.W(null, null, !a.left.color, null, null), a.right.W(null, null, !a.right.color, null, null));
  }
  function Xc() {}
  h = Xc.prototype;
  h.W = function() {
    return this;
  };
  h.Ja = function(a, b) {
    return new Pc(a, b, null);
  };
  h.remove = function() {
    return this;
  };
  h.count = function() {
    return 0;
  };
  h.e = function() {
    return !0;
  };
  h.Ba = function() {
    return !1;
  };
  h.Ic = function() {
    return null;
  };
  h.Zb = function() {
    return null;
  };
  h.aa = function() {
    return !1;
  };
  var Mc = new Xc;
  function I(a, b) {
    this.name = a;
    this.K = b;
  }
  function Yc(a, b) {
    return new I(a, b);
  }
  ;
  function Zc(a, b) {
    this.A = a;
    x(null !== this.A, "LeafNode shouldn't be created with null value.");
    this.ga = b || K;
    $c(this.ga);
    this.wb = null;
  }
  h = Zc.prototype;
  h.P = function() {
    return !0;
  };
  h.O = function() {
    return this.ga;
  };
  h.ib = function(a) {
    return new Zc(this.A, a);
  };
  h.B = function(a) {
    return ".priority" === a ? this.ga : K;
  };
  h.$ = function(a) {
    return a.e() ? this : ".priority" === G(a) ? this.ga : K;
  };
  h.Y = function() {
    return !1;
  };
  h.af = function() {
    return null;
  };
  h.I = function(a, b) {
    return ".priority" === a ? this.ib(b) : K.I(a, b).ib(this.ga);
  };
  h.L = function(a, b) {
    var c = G(a);
    if (null === c)
      return b;
    x(".priority" !== c || 1 === Q(a), ".priority must be the last token in a path");
    return this.I(c, K.L(R(a), b));
  };
  h.e = function() {
    return !1;
  };
  h.Ua = function() {
    return 0;
  };
  h.N = function(a) {
    return a && !this.O().e() ? {
      ".value": this.ta(),
      ".priority": this.O().N()
    } : this.ta();
  };
  h.hash = function() {
    if (null === this.wb) {
      var a = "";
      this.ga.e() || (a += "priority:" + ad(this.ga.N()) + ":");
      var b = typeof this.A,
          a = a + (b + ":"),
          a = "number" === b ? a + Db(this.A) : a + this.A;
      this.wb = lb(a);
    }
    return this.wb;
  };
  h.ta = function() {
    return this.A;
  };
  h.he = function(a) {
    if (a === K)
      return 1;
    if (a instanceof bd)
      return -1;
    x(a.P(), "Unknown node type");
    var b = typeof a.A,
        c = typeof this.A,
        d = Ia(cd, b),
        e = Ia(cd, c);
    x(0 <= d, "Unknown leaf type: " + b);
    x(0 <= e, "Unknown leaf type: " + c);
    return d === e ? "object" === c ? 0 : this.A < a.A ? -1 : this.A === a.A ? 0 : 1 : e - d;
  };
  var cd = ["object", "boolean", "number", "string"];
  Zc.prototype.Wd = function() {
    return this;
  };
  Zc.prototype.Yb = function() {
    return !0;
  };
  Zc.prototype.da = function(a) {
    return a === this ? !0 : a.P() ? this.A === a.A && this.ga.da(a.ga) : !1;
  };
  Zc.prototype.toString = function() {
    return "string" === typeof this.A ? this.A : '"' + this.A + '"';
  };
  function dd(a, b) {
    this.td = a;
    this.Wb = b;
  }
  dd.prototype.get = function(a) {
    var b = v(this.td, a);
    if (!b)
      throw Error("No index defined for " + a);
    return b === hc ? null : b;
  };
  function ed(a, b, c) {
    var d = fd(a.td, function(d, f) {
      var g = v(a.Wb, f);
      x(g, "Missing index implementation for " + f);
      if (d === hc) {
        if (g.se(b.K)) {
          for (var k = [],
              l = c.Aa(Yc),
              m = U(l); m; )
            m.name != b.name && k.push(m), m = U(l);
          k.push(b);
          return gd(k, H(g));
        }
        return hc;
      }
      g = c.get(b.name);
      k = d;
      g && (k = k.remove(new I(b.name, g)));
      return k.Ja(b, b.K);
    });
    return new dd(d, a.Wb);
  }
  function hd(a, b, c) {
    var d = fd(a.td, function(a) {
      if (a === hc)
        return a;
      var d = c.get(b.name);
      return d ? a.remove(new I(b.name, d)) : a;
    });
    return new dd(d, a.Wb);
  }
  var id = new dd({".priority": hc}, {".priority": L});
  function bd(a, b, c) {
    this.j = a;
    (this.ga = b) && $c(this.ga);
    this.sb = c;
    this.wb = null;
  }
  h = bd.prototype;
  h.P = function() {
    return !1;
  };
  h.O = function() {
    return this.ga || K;
  };
  h.ib = function(a) {
    return new bd(this.j, a, this.sb);
  };
  h.B = function(a) {
    if (".priority" === a)
      return this.O();
    a = this.j.get(a);
    return null === a ? K : a;
  };
  h.$ = function(a) {
    var b = G(a);
    return null === b ? this : this.B(b).$(R(a));
  };
  h.Y = function(a) {
    return null !== this.j.get(a);
  };
  h.I = function(a, b) {
    x(b, "We should always be passing snapshot nodes");
    if (".priority" === a)
      return this.ib(b);
    var c = new I(a, b),
        d;
    b.e() ? (d = this.j.remove(a), c = hd(this.sb, c, this.j)) : (d = this.j.Ja(a, b), c = ed(this.sb, c, this.j));
    return new bd(d, this.ga, c);
  };
  h.L = function(a, b) {
    var c = G(a);
    if (null === c)
      return b;
    x(".priority" !== G(a) || 1 === Q(a), ".priority must be the last token in a path");
    var d = this.B(c).L(R(a), b);
    return this.I(c, d);
  };
  h.e = function() {
    return this.j.e();
  };
  h.Ua = function() {
    return this.j.count();
  };
  var jd = /^(0|[1-9]\d*)$/;
  h = bd.prototype;
  h.N = function(a) {
    if (this.e())
      return null;
    var b = {},
        c = 0,
        d = 0,
        e = !0;
    this.ea(L, function(f, g) {
      b[f] = g.N(a);
      c++;
      e && jd.test(f) ? d = Math.max(d, Number(f)) : e = !1;
    });
    if (!a && e && d < 2 * c) {
      var f = [],
          g;
      for (g in b)
        f[g] = b[g];
      return f;
    }
    a && !this.O().e() && (b[".priority"] = this.O().N());
    return b;
  };
  h.hash = function() {
    if (null === this.wb) {
      var a = "";
      this.O().e() || (a += "priority:" + ad(this.O().N()) + ":");
      this.ea(L, function(b, c) {
        var d = c.hash();
        "" !== d && (a += ":" + b + ":" + d);
      });
      this.wb = "" === a ? "" : lb(a);
    }
    return this.wb;
  };
  h.af = function(a, b, c) {
    return (c = kd(this, c)) ? (a = Nc(c, new I(a, b))) ? a.name : null : Nc(this.j, a);
  };
  function ld(a, b) {
    var c;
    c = (c = kd(a, b)) ? (c = c.Ic()) && c.name : a.j.Ic();
    return c ? new I(c, a.j.get(c)) : null;
  }
  function md(a, b) {
    var c;
    c = (c = kd(a, b)) ? (c = c.Zb()) && c.name : a.j.Zb();
    return c ? new I(c, a.j.get(c)) : null;
  }
  h.ea = function(a, b) {
    var c = kd(this, a);
    return c ? c.Ba(function(a) {
      return b(a.name, a.K);
    }) : this.j.Ba(b);
  };
  h.Aa = function(a) {
    return this.rb(a.Ae(), a);
  };
  h.rb = function(a, b) {
    var c = kd(this, b);
    return c ? c.rb(a, function(a) {
      return a;
    }) : this.j.rb(a.name, Yc);
  };
  h.bf = function(a) {
    return this.Sb(a.ze(), a);
  };
  h.Sb = function(a, b) {
    var c = kd(this, b);
    return c ? c.Sb(a, function(a) {
      return a;
    }) : this.j.Sb(a.name, Yc);
  };
  h.he = function(a) {
    return this.e() ? a.e() ? 0 : -1 : a.P() || a.e() ? 1 : a === kc ? -1 : 0;
  };
  h.Wd = function(a) {
    if (a === mc || nd(this.sb.Wb, a.toString()))
      return this;
    var b = this.sb,
        c = this.j;
    x(a !== mc, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
    for (var d = [],
        e = !1,
        c = c.Aa(Yc),
        f = U(c); f; )
      e = e || a.se(f.K), d.push(f), f = U(c);
    d = e ? gd(d, H(a)) : hc;
    e = a.toString();
    c = od(b.Wb);
    c[e] = a;
    a = od(b.td);
    a[e] = d;
    return new bd(this.j, this.ga, new dd(a, c));
  };
  h.Yb = function(a) {
    return a === mc || nd(this.sb.Wb, a.toString());
  };
  h.da = function(a) {
    if (a === this)
      return !0;
    if (a.P())
      return !1;
    if (this.O().da(a.O()) && this.j.count() === a.j.count()) {
      var b = this.Aa(L);
      a = a.Aa(L);
      for (var c = U(b),
          d = U(a); c && d; ) {
        if (c.name !== d.name || !c.K.da(d.K))
          return !1;
        c = U(b);
        d = U(a);
      }
      return null === c && null === d;
    }
    return !1;
  };
  function kd(a, b) {
    return b === mc ? null : a.sb.get(b.toString());
  }
  h.toString = function() {
    var a = "{",
        b = !0;
    this.ea(L, function(c, d) {
      b ? b = !1 : a += ", ";
      a += '"' + c + '" : ' + d.toString();
    });
    return a += "}";
  };
  function J(a, b) {
    if (null === a)
      return K;
    var c = null;
    "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
    x(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
    "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
    if ("object" !== typeof a || ".sv" in a)
      return new Zc(a, J(c));
    if (a instanceof Array) {
      var d = K,
          e = a;
      A(e, function(a, b) {
        if (u(e, b) && "." !== b.substring(0, 1)) {
          var c = J(a);
          if (c.P() || !c.e())
            d = d.I(b, c);
        }
      });
      return d.ib(J(c));
    }
    var f = [],
        g = !1,
        k = a;
    va(k, function(a) {
      if ("string" !== typeof a || "." !== a.substring(0, 1)) {
        var b = J(k[a]);
        b.e() || (g = g || !b.O().e(), f.push(new I(a, b)));
      }
    });
    var l = gd(f, ec, function(a) {
      return a.name;
    }, fc);
    if (g) {
      var m = gd(f, H(L));
      return new bd(l, J(c), new dd({".priority": m}, {".priority": L}));
    }
    return new bd(l, J(c), id);
  }
  var pd = Math.log(2);
  function qd(a) {
    this.count = parseInt(Math.log(a + 1) / pd, 10);
    this.Ve = this.count - 1;
    this.Jf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2);
  }
  function rd(a) {
    var b = !(a.Jf & 1 << a.Ve);
    a.Ve--;
    return b;
  }
  function gd(a, b, c, d) {
    function e(b, d) {
      var f = d - b;
      if (0 == f)
        return null;
      if (1 == f) {
        var m = a[b],
            r = c ? c(m) : m;
        return new Pc(r, m.K, !1, null, null);
      }
      var m = parseInt(f / 2, 10) + b,
          f = e(b, m),
          s = e(m + 1, d),
          m = a[m],
          r = c ? c(m) : m;
      return new Pc(r, m.K, !1, f, s);
    }
    a.sort(b);
    var f = function(b) {
      function d(b, g) {
        var k = r - b,
            s = r;
        r -= b;
        var s = e(k + 1, s),
            k = a[k],
            y = c ? c(k) : k,
            s = new Pc(y, k.K, g, null, s);
        f ? f.left = s : m = s;
        f = s;
      }
      for (var f = null,
          m = null,
          r = a.length,
          s = 0; s < b.count; ++s) {
        var y = rd(b),
            N = Math.pow(2, b.count - (s + 1));
        y ? d(N, !1) : (d(N, !1), d(N, !0));
      }
      return m;
    }(new qd(a.length));
    return null !== f ? new Lc(d || b, f) : new Lc(d || b);
  }
  function ad(a) {
    return "number" === typeof a ? "number:" + Db(a) : "string:" + a;
  }
  function $c(a) {
    if (a.P()) {
      var b = a.N();
      x("string" === typeof b || "number" === typeof b || "object" === typeof b && u(b, ".sv"), "Priority must be a string or number.");
    } else
      x(a === kc || a.e(), "priority of unexpected type.");
    x(a === kc || a.O().e(), "Priority nodes can't have a priority of their own.");
  }
  var K = new bd(new Lc(fc), null, id);
  function sd() {
    bd.call(this, new Lc(fc), K, id);
  }
  na(sd, bd);
  h = sd.prototype;
  h.he = function(a) {
    return a === this ? 0 : 1;
  };
  h.da = function(a) {
    return a === this;
  };
  h.O = function() {
    throw ib("Why is this called?");
  };
  h.B = function() {
    return K;
  };
  h.e = function() {
    return !1;
  };
  var kc = new sd,
      ic = new I("[MIN_NAME]", K);
  function C(a, b, c) {
    this.D = a;
    this.U = b;
    this.m = c;
  }
  C.prototype.N = function() {
    D("Firebase.DataSnapshot.val", 0, 0, arguments.length);
    return this.D.N();
  };
  C.prototype.val = C.prototype.N;
  C.prototype.Xe = function() {
    D("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
    return this.D.N(!0);
  };
  C.prototype.exportVal = C.prototype.Xe;
  C.prototype.Qf = function() {
    D("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
    return !this.D.e();
  };
  C.prototype.exists = C.prototype.Qf;
  C.prototype.k = function(a) {
    D("Firebase.DataSnapshot.child", 0, 1, arguments.length);
    ga(a) && (a = String(a));
    Zb("Firebase.DataSnapshot.child", a);
    var b = new P(a),
        c = this.U.k(b);
    return new C(this.D.$(b), c, L);
  };
  C.prototype.child = C.prototype.k;
  C.prototype.Y = function(a) {
    D("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
    Zb("Firebase.DataSnapshot.hasChild", a);
    var b = new P(a);
    return !this.D.$(b).e();
  };
  C.prototype.hasChild = C.prototype.Y;
  C.prototype.O = function() {
    D("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
    return this.D.O().N();
  };
  C.prototype.getPriority = C.prototype.O;
  C.prototype.forEach = function(a) {
    D("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
    F("Firebase.DataSnapshot.forEach", 1, a, !1);
    if (this.D.P())
      return !1;
    var b = this;
    return !!this.D.ea(this.m, function(c, d) {
      return a(new C(d, b.U.k(c), L));
    });
  };
  C.prototype.forEach = C.prototype.forEach;
  C.prototype.pd = function() {
    D("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
    return this.D.P() ? !1 : !this.D.e();
  };
  C.prototype.hasChildren = C.prototype.pd;
  C.prototype.name = function() {
    z("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
    D("Firebase.DataSnapshot.name", 0, 0, arguments.length);
    return this.key();
  };
  C.prototype.name = C.prototype.name;
  C.prototype.key = function() {
    D("Firebase.DataSnapshot.key", 0, 0, arguments.length);
    return this.U.key();
  };
  C.prototype.key = C.prototype.key;
  C.prototype.Ua = function() {
    D("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
    return this.D.Ua();
  };
  C.prototype.numChildren = C.prototype.Ua;
  C.prototype.hc = function() {
    D("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
    return this.U;
  };
  C.prototype.ref = C.prototype.hc;
  function td(a) {
    x(ea(a) && 0 < a.length, "Requires a non-empty array");
    this.Bf = a;
    this.Gc = {};
  }
  td.prototype.Td = function(a, b) {
    for (var c = this.Gc[a] || [],
        d = 0; d < c.length; d++)
      c[d].sc.apply(c[d].Ha, Array.prototype.slice.call(arguments, 1));
  };
  td.prototype.zb = function(a, b, c) {
    ud(this, a);
    this.Gc[a] = this.Gc[a] || [];
    this.Gc[a].push({
      sc: b,
      Ha: c
    });
    (a = this.pe(a)) && b.apply(c, a);
  };
  td.prototype.bc = function(a, b, c) {
    ud(this, a);
    a = this.Gc[a] || [];
    for (var d = 0; d < a.length; d++)
      if (a[d].sc === b && (!c || c === a[d].Ha)) {
        a.splice(d, 1);
        break;
      }
  };
  function ud(a, b) {
    x(Oa(a.Bf, function(a) {
      return a === b;
    }), "Unknown event: " + b);
  }
  ;
  function vd() {
    td.call(this, ["visible"]);
    var a,
        b;
    "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
    this.qc = !0;
    if (b) {
      var c = this;
      document.addEventListener(b, function() {
        var b = !document[a];
        b !== c.qc && (c.qc = b, c.Td("visible", b));
      }, !1);
    }
  }
  na(vd, td);
  ca(vd);
  vd.prototype.pe = function(a) {
    x("visible" === a, "Unknown event type: " + a);
    return [this.qc];
  };
  function wd() {
    td.call(this, ["online"]);
    this.Lc = !0;
    if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
      var a = this;
      window.addEventListener("online", function() {
        a.Lc || a.Td("online", !0);
        a.Lc = !0;
      }, !1);
      window.addEventListener("offline", function() {
        a.Lc && a.Td("online", !1);
        a.Lc = !1;
      }, !1);
    }
  }
  na(wd, td);
  ca(wd);
  wd.prototype.pe = function(a) {
    x("online" === a, "Unknown event type: " + a);
    return [this.Lc];
  };
  function A(a, b) {
    for (var c in a)
      b.call(void 0, a[c], c, a);
  }
  function fd(a, b) {
    var c = {},
        d;
    for (d in a)
      c[d] = b.call(void 0, a[d], d, a);
    return c;
  }
  function Mb(a, b) {
    for (var c in a)
      if (!b.call(void 0, a[c], c, a))
        return !1;
    return !0;
  }
  function Kb(a) {
    var b = 0,
        c;
    for (c in a)
      b++;
    return b;
  }
  function Lb(a) {
    for (var b in a)
      return b;
  }
  function xd(a) {
    var b = [],
        c = 0,
        d;
    for (d in a)
      b[c++] = a[d];
    return b;
  }
  function yd(a) {
    var b = [],
        c = 0,
        d;
    for (d in a)
      b[c++] = d;
    return b;
  }
  function nd(a, b) {
    for (var c in a)
      if (a[c] == b)
        return !0;
    return !1;
  }
  function zd(a, b, c) {
    for (var d in a)
      if (b.call(c, a[d], d, a))
        return d;
  }
  function Ad(a, b) {
    var c = zd(a, b, void 0);
    return c && a[c];
  }
  function Bd(a) {
    for (var b in a)
      return !1;
    return !0;
  }
  function Cd(a, b) {
    return b in a ? a[b] : void 0;
  }
  function od(a) {
    var b = {},
        c;
    for (c in a)
      b[c] = a[c];
    return b;
  }
  var Dd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function Ed(a, b) {
    for (var c,
        d,
        e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d)
        a[c] = d[c];
      for (var f = 0; f < Dd.length; f++)
        c = Dd[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  ;
  function Fd() {
    this.wc = {};
  }
  function Gd(a, b, c) {
    n(c) || (c = 1);
    u(a.wc, b) || (a.wc[b] = 0);
    a.wc[b] += c;
  }
  Fd.prototype.get = function() {
    return od(this.wc);
  };
  function Hd(a) {
    this.Kf = a;
    this.vd = null;
  }
  Hd.prototype.get = function() {
    var a = this.Kf.get(),
        b = od(a);
    if (this.vd)
      for (var c in this.vd)
        b[c] -= this.vd[c];
    this.vd = a;
    return b;
  };
  function Id(a, b) {
    this.uf = {};
    this.Nd = new Hd(a);
    this.S = b;
    var c = 1E4 + 2E4 * Math.random();
    setTimeout(q(this.nf, this), Math.floor(c));
  }
  Id.prototype.nf = function() {
    var a = this.Nd.get(),
        b = {},
        c = !1,
        d;
    for (d in a)
      0 < a[d] && u(this.uf, d) && (b[d] = a[d], c = !0);
    c && (a = this.S, a.ja && (b = {c: b}, a.f("reportStats", b), a.wa("s", b)));
    setTimeout(q(this.nf, this), Math.floor(6E5 * Math.random()));
  };
  var Jd = {},
      Kd = {};
  function Ld(a) {
    a = a.toString();
    Jd[a] || (Jd[a] = new Fd);
    return Jd[a];
  }
  function Md(a, b) {
    var c = a.toString();
    Kd[c] || (Kd[c] = b());
    return Kd[c];
  }
  ;
  var Nd = null;
  "undefined" !== typeof MozWebSocket ? Nd = MozWebSocket : "undefined" !== typeof WebSocket && (Nd = WebSocket);
  function Od(a, b, c) {
    this.ie = a;
    this.f = rb(this.ie);
    this.frames = this.Cc = null;
    this.kb = this.lb = this.Oe = 0;
    this.Qa = Ld(b);
    this.Za = (b.Cb ? "wss://" : "ws://") + b.Ka + "/.ws?v=5";
    "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (this.Za += "&r=f");
    b.host !== b.Ka && (this.Za = this.Za + "&ns=" + b.yb);
    c && (this.Za = this.Za + "&s=" + c);
  }
  var Pd;
  Od.prototype.open = function(a, b) {
    this.fb = b;
    this.cg = a;
    this.f("Websocket connecting to " + this.Za);
    this.zc = !1;
    Aa.set("previous_websocket_failure", !0);
    try {
      this.oa = new Nd(this.Za);
    } catch (c) {
      this.f("Error instantiating WebSocket.");
      var d = c.message || c.data;
      d && this.f(d);
      this.eb();
      return;
    }
    var e = this;
    this.oa.onopen = function() {
      e.f("Websocket connected.");
      e.zc = !0;
    };
    this.oa.onclose = function() {
      e.f("Websocket connection was disconnected.");
      e.oa = null;
      e.eb();
    };
    this.oa.onmessage = function(a) {
      if (null !== e.oa)
        if (a = a.data, e.kb += a.length, Gd(e.Qa, "bytes_received", a.length), Qd(e), null !== e.frames)
          Rd(e, a);
        else {
          a: {
            x(null === e.frames, "We already have a frame buffer");
            if (6 >= a.length) {
              var b = Number(a);
              if (!isNaN(b)) {
                e.Oe = b;
                e.frames = [];
                a = null;
                break a;
              }
            }
            e.Oe = 1;
            e.frames = [];
          }
          null !== a && Rd(e, a);
        }
    };
    this.oa.onerror = function(a) {
      e.f("WebSocket error.  Closing connection.");
      (a = a.message || a.data) && e.f(a);
      e.eb();
    };
  };
  Od.prototype.start = function() {};
  Od.isAvailable = function() {
    var a = !1;
    if ("undefined" !== typeof navigator && navigator.userAgent) {
      var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
      b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0);
    }
    return !a && null !== Nd && !Pd;
  };
  Od.responsesRequiredToBeHealthy = 2;
  Od.healthyTimeout = 3E4;
  h = Od.prototype;
  h.wd = function() {
    Aa.remove("previous_websocket_failure");
  };
  function Rd(a, b) {
    a.frames.push(b);
    if (a.frames.length == a.Oe) {
      var c = a.frames.join("");
      a.frames = null;
      c = ua(c);
      a.cg(c);
    }
  }
  h.send = function(a) {
    Qd(this);
    a = t(a);
    this.lb += a.length;
    Gd(this.Qa, "bytes_sent", a.length);
    a = Bb(a, 16384);
    1 < a.length && this.oa.send(String(a.length));
    for (var b = 0; b < a.length; b++)
      this.oa.send(a[b]);
  };
  h.Yc = function() {
    this.ub = !0;
    this.Cc && (clearInterval(this.Cc), this.Cc = null);
    this.oa && (this.oa.close(), this.oa = null);
  };
  h.eb = function() {
    this.ub || (this.f("WebSocket is closing itself"), this.Yc(), this.fb && (this.fb(this.zc), this.fb = null));
  };
  h.close = function() {
    this.ub || (this.f("WebSocket is being closed"), this.Yc());
  };
  function Qd(a) {
    clearInterval(a.Cc);
    a.Cc = setInterval(function() {
      a.oa && a.oa.send("0");
      Qd(a);
    }, Math.floor(45E3));
  }
  ;
  function Sd(a) {
    this.cc = a;
    this.Fd = [];
    this.Mb = 0;
    this.ge = -1;
    this.Ab = null;
  }
  function Td(a, b, c) {
    a.ge = b;
    a.Ab = c;
    a.ge < a.Mb && (a.Ab(), a.Ab = null);
  }
  function Ud(a, b, c) {
    for (a.Fd[b] = c; a.Fd[a.Mb]; ) {
      var d = a.Fd[a.Mb];
      delete a.Fd[a.Mb];
      for (var e = 0; e < d.length; ++e)
        if (d[e]) {
          var f = a;
          Fb(function() {
            f.cc(d[e]);
          });
        }
      if (a.Mb === a.ge) {
        a.Ab && (clearTimeout(a.Ab), a.Ab(), a.Ab = null);
        break;
      }
      a.Mb++;
    }
  }
  ;
  function Vd() {
    this.set = {};
  }
  h = Vd.prototype;
  h.add = function(a, b) {
    this.set[a] = null !== b ? b : !0;
  };
  h.contains = function(a) {
    return u(this.set, a);
  };
  h.get = function(a) {
    return this.contains(a) ? this.set[a] : void 0;
  };
  h.remove = function(a) {
    delete this.set[a];
  };
  h.clear = function() {
    this.set = {};
  };
  h.e = function() {
    return Bd(this.set);
  };
  h.count = function() {
    return Kb(this.set);
  };
  function Wd(a, b) {
    A(a.set, function(a, d) {
      b(d, a);
    });
  }
  ;
  function Xd(a, b, c) {
    this.ie = a;
    this.f = rb(a);
    this.kb = this.lb = 0;
    this.Qa = Ld(b);
    this.Kd = c;
    this.zc = !1;
    this.bd = function(a) {
      b.host !== b.Ka && (a.ns = b.yb);
      var c = [],
          f;
      for (f in a)
        a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
      return (b.Cb ? "https://" : "http://") + b.Ka + "/.lp?" + c.join("&");
    };
  }
  var Yd,
      Zd;
  Xd.prototype.open = function(a, b) {
    this.Ue = 0;
    this.fa = b;
    this.gf = new Sd(a);
    this.ub = !1;
    var c = this;
    this.ob = setTimeout(function() {
      c.f("Timed out trying to connect.");
      c.eb();
      c.ob = null;
    }, Math.floor(3E4));
    wb(function() {
      if (!c.ub) {
        c.Na = new $d(function(a, b, d, k, l) {
          ae(c, arguments);
          if (c.Na)
            if (c.ob && (clearTimeout(c.ob), c.ob = null), c.zc = !0, "start" == a)
              c.id = b, c.mf = d;
            else if ("close" === a)
              b ? (c.Na.Jd = !1, Td(c.gf, b, function() {
                c.eb();
              })) : c.eb();
            else
              throw Error("Unrecognized command received: " + a);
        }, function(a, b) {
          ae(c, arguments);
          Ud(c.gf, a, b);
        }, function() {
          c.eb();
        }, c.bd);
        var a = {start: "t"};
        a.ser = Math.floor(1E8 * Math.random());
        c.Na.Ud && (a.cb = c.Na.Ud);
        a.v = "5";
        c.Kd && (a.s = c.Kd);
        "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
        a = c.bd(a);
        c.f("Connecting via long-poll to " + a);
        be(c.Na, a, function() {});
      }
    });
  };
  Xd.prototype.start = function() {
    var a = this.Na,
        b = this.mf;
    a.Xf = this.id;
    a.Yf = b;
    for (a.Zd = !0; ce(a); )
      ;
    a = this.id;
    b = this.mf;
    this.$b = document.createElement("iframe");
    var c = {dframe: "t"};
    c.id = a;
    c.pw = b;
    this.$b.src = this.bd(c);
    this.$b.style.display = "none";
    document.body.appendChild(this.$b);
  };
  Xd.isAvailable = function() {
    return !Zd && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.zg) && (Yd || !0);
  };
  h = Xd.prototype;
  h.wd = function() {};
  h.Yc = function() {
    this.ub = !0;
    this.Na && (this.Na.close(), this.Na = null);
    this.$b && (document.body.removeChild(this.$b), this.$b = null);
    this.ob && (clearTimeout(this.ob), this.ob = null);
  };
  h.eb = function() {
    this.ub || (this.f("Longpoll is closing itself"), this.Yc(), this.fa && (this.fa(this.zc), this.fa = null));
  };
  h.close = function() {
    this.ub || (this.f("Longpoll is being closed."), this.Yc());
  };
  h.send = function(a) {
    a = t(a);
    this.lb += a.length;
    Gd(this.Qa, "bytes_sent", a.length);
    a = mb(a);
    a = fb(a, !0);
    a = Bb(a, 1840);
    for (var b = 0; b < a.length; b++) {
      var c = this.Na;
      c.Qc.push({
        og: this.Ue,
        wg: a.length,
        We: a[b]
      });
      c.Zd && ce(c);
      this.Ue++;
    }
  };
  function ae(a, b) {
    var c = t(b).length;
    a.kb += c;
    Gd(a.Qa, "bytes_received", c);
  }
  function $d(a, b, c, d) {
    this.bd = d;
    this.fb = c;
    this.Fe = new Vd;
    this.Qc = [];
    this.ke = Math.floor(1E8 * Math.random());
    this.Jd = !0;
    this.Ud = hb();
    window["pLPCommand" + this.Ud] = a;
    window["pRTLPCB" + this.Ud] = b;
    a = document.createElement("iframe");
    a.style.display = "none";
    if (document.body) {
      document.body.appendChild(a);
      try {
        a.contentWindow.document || kb("No IE domain setting required");
      } catch (e) {
        a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())";
      }
    } else
      throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
    a.contentDocument ? a.$a = a.contentDocument : a.contentWindow ? a.$a = a.contentWindow.document : a.document && (a.$a = a.document);
    this.va = a;
    a = "";
    this.va.src && "javascript:" === this.va.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
    a = "<html><body>" + a + "</body></html>";
    try {
      this.va.$a.open(), this.va.$a.write(a), this.va.$a.close();
    } catch (f) {
      kb("frame writing exception"), f.stack && kb(f.stack), kb(f);
    }
  }
  $d.prototype.close = function() {
    this.Zd = !1;
    if (this.va) {
      this.va.$a.body.innerHTML = "";
      var a = this;
      setTimeout(function() {
        null !== a.va && (document.body.removeChild(a.va), a.va = null);
      }, Math.floor(0));
    }
    var b = this.fb;
    b && (this.fb = null, b());
  };
  function ce(a) {
    if (a.Zd && a.Jd && a.Fe.count() < (0 < a.Qc.length ? 2 : 1)) {
      a.ke++;
      var b = {};
      b.id = a.Xf;
      b.pw = a.Yf;
      b.ser = a.ke;
      for (var b = a.bd(b),
          c = "",
          d = 0; 0 < a.Qc.length; )
        if (1870 >= a.Qc[0].We.length + 30 + c.length) {
          var e = a.Qc.shift(),
              c = c + "&seg" + d + "=" + e.og + "&ts" + d + "=" + e.wg + "&d" + d + "=" + e.We;
          d++;
        } else
          break;
      de(a, b + c, a.ke);
      return !0;
    }
    return !1;
  }
  function de(a, b, c) {
    function d() {
      a.Fe.remove(c);
      ce(a);
    }
    a.Fe.add(c);
    var e = setTimeout(d, Math.floor(25E3));
    be(a, b, function() {
      clearTimeout(e);
      d();
    });
  }
  function be(a, b, c) {
    setTimeout(function() {
      try {
        if (a.Jd) {
          var d = a.va.$a.createElement("script");
          d.type = "text/javascript";
          d.async = !0;
          d.src = b;
          d.onload = d.onreadystatechange = function() {
            var a = d.readyState;
            a && "loaded" !== a && "complete" !== a || (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), c());
          };
          d.onerror = function() {
            kb("Long-poll script failed to load: " + b);
            a.Jd = !1;
            a.close();
          };
          a.va.$a.body.appendChild(d);
        }
      } catch (e) {}
    }, Math.floor(1));
  }
  ;
  function ee(a) {
    fe(this, a);
  }
  var ge = [Xd, Od];
  function fe(a, b) {
    var c = Od && Od.isAvailable(),
        d = c && !(Aa.ff || !0 === Aa.get("previous_websocket_failure"));
    b.yg && (c || z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
    if (d)
      a.$c = [Od];
    else {
      var e = a.$c = [];
      Cb(ge, function(a, b) {
        b && b.isAvailable() && e.push(b);
      });
    }
  }
  function he(a) {
    if (0 < a.$c.length)
      return a.$c[0];
    throw Error("No transports available");
  }
  ;
  function ie(a, b, c, d, e, f) {
    this.id = a;
    this.f = rb("c:" + this.id + ":");
    this.cc = c;
    this.Kc = d;
    this.fa = e;
    this.De = f;
    this.Q = b;
    this.Ed = [];
    this.Se = 0;
    this.xf = new ee(b);
    this.Pa = 0;
    this.f("Connection created");
    je(this);
  }
  function je(a) {
    var b = he(a.xf);
    a.J = new b("c:" + a.id + ":" + a.Se++, a.Q);
    a.He = b.responsesRequiredToBeHealthy || 0;
    var c = ke(a, a.J),
        d = le(a, a.J);
    a.ad = a.J;
    a.Xc = a.J;
    a.C = null;
    a.vb = !1;
    setTimeout(function() {
      a.J && a.J.open(c, d);
    }, Math.floor(0));
    b = b.healthyTimeout || 0;
    0 < b && (a.rd = setTimeout(function() {
      a.rd = null;
      a.vb || (a.J && 102400 < a.J.kb ? (a.f("Connection exceeded healthy timeout but has received " + a.J.kb + " bytes.  Marking connection healthy."), a.vb = !0, a.J.wd()) : a.J && 10240 < a.J.lb ? a.f("Connection exceeded healthy timeout but has sent " + a.J.lb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()));
    }, Math.floor(b)));
  }
  function le(a, b) {
    return function(c) {
      b === a.J ? (a.J = null, c || 0 !== a.Pa ? 1 === a.Pa && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.Q.Ka.substr(0, 2) && (Aa.remove("host:" + a.Q.host), a.Q.Ka = a.Q.host)), a.close()) : b === a.C ? (a.f("Secondary connection lost."), c = a.C, a.C = null, a.ad !== c && a.Xc !== c || a.close()) : a.f("closing an old connection");
    };
  }
  function ke(a, b) {
    return function(c) {
      if (2 != a.Pa)
        if (b === a.Xc) {
          var d = zb("t", c);
          c = zb("d", c);
          if ("c" == d) {
            if (d = zb("t", c), "d" in c)
              if (c = c.d, "h" === d) {
                var d = c.ts,
                    e = c.v,
                    f = c.h;
                a.Kd = c.s;
                Da(a.Q, f);
                0 == a.Pa && (a.J.start(), me(a, a.J, d), "5" !== e && z("Protocol version mismatch detected"), c = a.xf, (c = 1 < c.$c.length ? c.$c[1] : null) && ne(a, c));
              } else if ("n" === d) {
                a.f("recvd end transmission on primary");
                a.Xc = a.C;
                for (c = 0; c < a.Ed.length; ++c)
                  a.Bd(a.Ed[c]);
                a.Ed = [];
                oe(a);
              } else
                "s" === d ? (a.f("Connection shutdown command received. Shutting down..."), a.De && (a.De(c), a.De = null), a.fa = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), Da(a.Q, c), 1 === a.Pa ? a.close() : (pe(a), je(a))) : "e" === d ? sb("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), qe(a), re(a)) : sb("Unknown control packet command: " + d);
          } else
            "d" == d && a.Bd(c);
        } else if (b === a.C)
          if (d = zb("t", c), c = zb("d", c), "c" == d)
            "t" in c && (c = c.t, "a" === c ? se(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.C.close(), a.ad !== a.C && a.Xc !== a.C || a.close()) : "o" === c && (a.f("got pong on secondary."), a.tf--, se(a)));
          else if ("d" == d)
            a.Ed.push(c);
          else
            throw Error("Unknown protocol layer: " + d);
        else
          a.f("message on old connection");
    };
  }
  ie.prototype.wa = function(a) {
    te(this, {
      t: "d",
      d: a
    });
  };
  function oe(a) {
    a.ad === a.C && a.Xc === a.C && (a.f("cleaning up and promoting a connection: " + a.C.ie), a.J = a.C, a.C = null);
  }
  function se(a) {
    0 >= a.tf ? (a.f("Secondary connection is healthy."), a.vb = !0, a.C.wd(), a.C.start(), a.f("sending client ack on secondary"), a.C.send({
      t: "c",
      d: {
        t: "a",
        d: {}
      }
    }), a.f("Ending transmission on primary"), a.J.send({
      t: "c",
      d: {
        t: "n",
        d: {}
      }
    }), a.ad = a.C, oe(a)) : (a.f("sending ping on secondary."), a.C.send({
      t: "c",
      d: {
        t: "p",
        d: {}
      }
    }));
  }
  ie.prototype.Bd = function(a) {
    qe(this);
    this.cc(a);
  };
  function qe(a) {
    a.vb || (a.He--, 0 >= a.He && (a.f("Primary connection is healthy."), a.vb = !0, a.J.wd()));
  }
  function ne(a, b) {
    a.C = new b("c:" + a.id + ":" + a.Se++, a.Q, a.Kd);
    a.tf = b.responsesRequiredToBeHealthy || 0;
    a.C.open(ke(a, a.C), le(a, a.C));
    setTimeout(function() {
      a.C && (a.f("Timed out trying to upgrade."), a.C.close());
    }, Math.floor(6E4));
  }
  function me(a, b, c) {
    a.f("Realtime connection established.");
    a.J = b;
    a.Pa = 1;
    a.Kc && (a.Kc(c), a.Kc = null);
    0 === a.He ? (a.f("Primary connection is healthy."), a.vb = !0) : setTimeout(function() {
      re(a);
    }, Math.floor(5E3));
  }
  function re(a) {
    a.vb || 1 !== a.Pa || (a.f("sending ping on primary."), te(a, {
      t: "c",
      d: {
        t: "p",
        d: {}
      }
    }));
  }
  function te(a, b) {
    if (1 !== a.Pa)
      throw "Connection is not connected";
    a.ad.send(b);
  }
  ie.prototype.close = function() {
    2 !== this.Pa && (this.f("Closing realtime connection."), this.Pa = 2, pe(this), this.fa && (this.fa(), this.fa = null));
  };
  function pe(a) {
    a.f("Shutting down all connections");
    a.J && (a.J.close(), a.J = null);
    a.C && (a.C.close(), a.C = null);
    a.rd && (clearTimeout(a.rd), a.rd = null);
  }
  ;
  function ue(a) {
    var b = {},
        c = {},
        d = {},
        e = "";
    try {
      var f = a.split("."),
          b = ua(jb(f[0]) || ""),
          c = ua(jb(f[1]) || ""),
          e = f[2],
          d = c.d || {};
      delete c.d;
    } catch (g) {}
    return {
      Bg: b,
      fe: c,
      data: d,
      sg: e
    };
  }
  function ve(a) {
    a = ue(a).fe;
    return "object" === typeof a && a.hasOwnProperty("iat") ? v(a, "iat") : null;
  }
  function we(a) {
    a = ue(a);
    var b = a.fe;
    return !!a.sg && !!b && "object" === typeof b && b.hasOwnProperty("iat");
  }
  ;
  function xe(a, b, c, d) {
    this.id = ye++;
    this.f = rb("p:" + this.id + ":");
    this.Eb = !0;
    this.ua = {};
    this.la = [];
    this.Nc = 0;
    this.Jc = [];
    this.ja = !1;
    this.Va = 1E3;
    this.xd = 3E5;
    this.Cd = b;
    this.Ad = c;
    this.Ee = d;
    this.Q = a;
    this.Ke = null;
    this.Tc = {};
    this.ng = 0;
    this.Dc = this.ue = null;
    ze(this, 0);
    vd.Qb().zb("visible", this.fg, this);
    -1 === a.host.indexOf("fblocal") && wd.Qb().zb("online", this.dg, this);
  }
  var ye = 0,
      Ae = 0;
  h = xe.prototype;
  h.wa = function(a, b, c) {
    var d = ++this.ng;
    a = {
      r: d,
      a: a,
      b: b
    };
    this.f(t(a));
    x(this.ja, "sendRequest call when we're not connected not allowed.");
    this.La.wa(a);
    c && (this.Tc[d] = c);
  };
  function Be(a, b, c, d, e) {
    var f = b.Da(),
        g = b.path.toString();
    a.f("Listen called for " + g + " " + f);
    a.ua[g] = a.ua[g] || {};
    x(!a.ua[g][f], "listen() called twice for same path/queryId.");
    b = {
      H: e,
      qd: c,
      kg: Dc(b),
      tag: d
    };
    a.ua[g][f] = b;
    a.ja && Ce(a, g, f, b);
  }
  function Ce(a, b, c, d) {
    a.f("Listen on " + b + " for " + c);
    var e = {p: b};
    d.tag && (e.q = d.kg, e.t = d.tag);
    e.h = d.qd();
    a.wa("q", e, function(e) {
      if ((a.ua[b] && a.ua[b][c]) === d) {
        a.f("listen response", e);
        var g = e.s;
        "ok" !== g && De(a, b, c);
        e = e.d;
        d.H && d.H(g, e);
      }
    });
  }
  h.T = function(a, b, c) {
    this.Lb = {
      Mf: a,
      Ye: !1,
      sc: b,
      cd: c
    };
    this.f("Authenticating using credential: " + a);
    Ee(this);
    (b = 40 == a.length) || (a = ue(a).fe, b = "object" === typeof a && !0 === v(a, "admin"));
    b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.xd = 3E4);
  };
  h.Pe = function(a) {
    delete this.Lb;
    this.ja && this.wa("unauth", {}, function(b) {
      a(b.s, b.d);
    });
  };
  function Ee(a) {
    var b = a.Lb;
    a.ja && b && a.wa("auth", {cred: b.Mf}, function(c) {
      var d = c.s;
      c = c.d || "error";
      "ok" !== d && a.Lb === b && delete a.Lb;
      b.Ye ? "ok" !== d && b.cd && b.cd(d, c) : (b.Ye = !0, b.sc && b.sc(d, c));
    });
  }
  function Fe(a, b, c, d) {
    a.ja ? Ge(a, "o", b, c, d) : a.Jc.push({
      Pc: b,
      action: "o",
      data: c,
      H: d
    });
  }
  function He(a, b, c, d) {
    a.ja ? Ge(a, "om", b, c, d) : a.Jc.push({
      Pc: b,
      action: "om",
      data: c,
      H: d
    });
  }
  h.Ce = function(a, b) {
    this.ja ? Ge(this, "oc", a, null, b) : this.Jc.push({
      Pc: a,
      action: "oc",
      data: null,
      H: b
    });
  };
  function Ge(a, b, c, d, e) {
    c = {
      p: c,
      d: d
    };
    a.f("onDisconnect " + b, c);
    a.wa(b, c, function(a) {
      e && setTimeout(function() {
        e(a.s, a.d);
      }, Math.floor(0));
    });
  }
  h.put = function(a, b, c, d) {
    Ie(this, "p", a, b, c, d);
  };
  function Ke(a, b, c, d) {
    Ie(a, "m", b, c, d, void 0);
  }
  function Ie(a, b, c, d, e, f) {
    d = {
      p: c,
      d: d
    };
    n(f) && (d.h = f);
    a.la.push({
      action: b,
      of: d,
      H: e
    });
    a.Nc++;
    b = a.la.length - 1;
    a.ja ? Le(a, b) : a.f("Buffering put: " + c);
  }
  function Le(a, b) {
    var c = a.la[b].action,
        d = a.la[b].of,
        e = a.la[b].H;
    a.la[b].lg = a.ja;
    a.wa(c, d, function(d) {
      a.f(c + " response", d);
      delete a.la[b];
      a.Nc--;
      0 === a.Nc && (a.la = []);
      e && e(d.s, d.d);
    });
  }
  h.Bd = function(a) {
    if ("r" in a) {
      this.f("from server: " + t(a));
      var b = a.r,
          c = this.Tc[b];
      c && (delete this.Tc[b], c(a.b));
    } else {
      if ("error" in a)
        throw "A server-side error has occurred: " + a.error;
      "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.Cd(c.p, c.d, !1, c.t) : "m" === b ? this.Cd(c.p, c.d, !0, c.t) : "c" === b ? Me(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Lb, delete this.Lb, c && c.cd && c.cd(a, b)) : "sd" === b ? this.Ke ? this.Ke(c) : "msg" in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n", "\nFIREBASE: ")) : sb("Unrecognized action received from server: " + t(b) + "\nAre you using the latest client?"));
    }
  };
  h.Kc = function(a) {
    this.f("connection ready");
    this.ja = !0;
    this.Dc = (new Date).getTime();
    this.Ee({serverTimeOffset: a - (new Date).getTime()});
    Ne(this);
    this.Ad(!0);
  };
  function ze(a, b) {
    x(!a.La, "Scheduling a connect when we're already connected/ing?");
    a.Nb && clearTimeout(a.Nb);
    a.Nb = setTimeout(function() {
      a.Nb = null;
      Oe(a);
    }, Math.floor(b));
  }
  h.fg = function(a) {
    a && !this.qc && this.Va === this.xd && (this.f("Window became visible.  Reducing delay."), this.Va = 1E3, this.La || ze(this, 0));
    this.qc = a;
  };
  h.dg = function(a) {
    a ? (this.f("Browser went online.  Reconnecting."), this.Va = 1E3, this.Eb = !0, this.La || ze(this, 0)) : (this.f("Browser went offline.  Killing connection; don't reconnect."), this.Eb = !1, this.La && this.La.close());
  };
  h.jf = function() {
    this.f("data client disconnected");
    this.ja = !1;
    this.La = null;
    for (var a = 0; a < this.la.length; a++) {
      var b = this.la[a];
      b && "h" in b.of && b.lg && (b.H && b.H("disconnect"), delete this.la[a], this.Nc--);
    }
    0 === this.Nc && (this.la = []);
    if (this.Eb)
      this.qc ? this.Dc && (3E4 < (new Date).getTime() - this.Dc && (this.Va = 1E3), this.Dc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.Va = this.xd, this.ue = (new Date).getTime()), a = Math.max(0, this.Va - ((new Date).getTime() - this.ue)), a *= Math.random(), this.f("Trying to reconnect in " + a + "ms"), ze(this, a), this.Va = Math.min(this.xd, 1.3 * this.Va);
    else
      for (var c in this.Tc)
        delete this.Tc[c];
    this.Ad(!1);
  };
  function Oe(a) {
    if (a.Eb) {
      a.f("Making a connection attempt");
      a.ue = (new Date).getTime();
      a.Dc = null;
      var b = q(a.Bd, a),
          c = q(a.Kc, a),
          d = q(a.jf, a),
          e = a.id + ":" + Ae++;
      a.La = new ie(e, a.Q, b, c, d, function(b) {
        z(b + " (" + a.Q.toString() + ")");
        a.Eb = !1;
      });
    }
  }
  h.tb = function() {
    this.Eb = !1;
    this.La ? this.La.close() : (this.Nb && (clearTimeout(this.Nb), this.Nb = null), this.ja && this.jf());
  };
  h.kc = function() {
    this.Eb = !0;
    this.Va = 1E3;
    this.La || ze(this, 0);
  };
  function Me(a, b, c) {
    c = c ? La(c, function(a) {
      return Ab(a);
    }).join("$") : "default";
    (a = De(a, b, c)) && a.H && a.H("permission_denied");
  }
  function De(a, b, c) {
    b = (new P(b)).toString();
    var d = a.ua[b][c];
    delete a.ua[b][c];
    0 === Kb(a.ua[b]) && delete a.ua[b];
    return d;
  }
  function Ne(a) {
    Ee(a);
    A(a.ua, function(b, d) {
      A(b, function(b, c) {
        Ce(a, d, c, b);
      });
    });
    for (var b = 0; b < a.la.length; b++)
      a.la[b] && Le(a, b);
    for (; a.Jc.length; )
      b = a.Jc.shift(), Ge(a, b.action, b.Pc, b.data, b.H);
  }
  ;
  function Pe() {
    this.j = this.A = null;
  }
  Pe.prototype.ic = function(a, b) {
    if (a.e())
      this.A = b, this.j = null;
    else if (null !== this.A)
      this.A = this.A.L(a, b);
    else {
      null == this.j && (this.j = new Vd);
      var c = G(a);
      this.j.contains(c) || this.j.add(c, new Pe);
      c = this.j.get(c);
      a = R(a);
      c.ic(a, b);
    }
  };
  function Qe(a, b) {
    if (b.e())
      return a.A = null, a.j = null, !0;
    if (null !== a.A) {
      if (a.A.P())
        return !1;
      var c = a.A;
      a.A = null;
      c.ea(L, function(b, c) {
        a.ic(new P(b), c);
      });
      return Qe(a, b);
    }
    return null !== a.j ? (c = G(b), b = R(b), a.j.contains(c) && Qe(a.j.get(c), b) && a.j.remove(c), a.j.e() ? (a.j = null, !0) : !1) : !0;
  }
  function Re(a, b, c) {
    null !== a.A ? c(b, a.A) : a.ea(function(a, e) {
      var f = new P(b.toString() + "/" + a);
      Re(e, f, c);
    });
  }
  Pe.prototype.ea = function(a) {
    null !== this.j && Wd(this.j, function(b, c) {
      a(b, c);
    });
  };
  function Se() {
    this.Wc = K;
  }
  Se.prototype.toString = function() {
    return this.Wc.toString();
  };
  function Te() {
    this.qb = [];
  }
  function Ue(a, b) {
    for (var c = null,
        d = 0; d < b.length; d++) {
      var e = b[d],
          f = e.Rb();
      null === c || f.da(c.Rb()) || (a.qb.push(c), c = null);
      null === c && (c = new Ve(f));
      c.add(e);
    }
    c && a.qb.push(c);
  }
  function Cc(a, b, c) {
    Ue(a, c);
    We(a, function(a) {
      return a.da(b);
    });
  }
  function Xe(a, b, c) {
    Ue(a, c);
    We(a, function(a) {
      return a.contains(b) || b.contains(a);
    });
  }
  function We(a, b) {
    for (var c = !0,
        d = 0; d < a.qb.length; d++) {
      var e = a.qb[d];
      if (e)
        if (e = e.Rb(), b(e)) {
          for (var e = a.qb[d],
              f = 0; f < e.od.length; f++) {
            var g = e.od[f];
            if (null !== g) {
              e.od[f] = null;
              var k = g.Pb();
              ob && kb("event: " + g.toString());
              Fb(k);
            }
          }
          a.qb[d] = null;
        } else
          c = !1;
    }
    c && (a.qb = []);
  }
  function Ve(a) {
    this.Ca = a;
    this.od = [];
  }
  Ve.prototype.add = function(a) {
    this.od.push(a);
  };
  Ve.prototype.Rb = function() {
    return this.Ca;
  };
  var Ye = "auth.firebase.com";
  function Ze(a, b, c) {
    this.ed = a || {};
    this.Sd = b || {};
    this.lc = c || {};
    this.ed.remember || (this.ed.remember = "default");
  }
  var $e = ["remember", "redirectTo"];
  function af(a) {
    var b = {},
        c = {};
    va(a || {}, function(a, e) {
      0 <= Ia($e, a) ? b[a] = e : c[a] = e;
    });
    return new Ze(b, {}, c);
  }
  ;
  var bf = {
    NETWORK_ERROR: "Unable to contact the Firebase server.",
    SERVER_ERROR: "An unknown server error occurred.",
    TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
    REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
    USER_CANCELLED: "The user cancelled authentication."
  };
  function V(a) {
    var b = Error(v(bf, a), a);
    b.code = a;
    return b;
  }
  ;
  function cf() {
    var a = window.opener.frames,
        b;
    for (b = a.length - 1; 0 <= b; b--)
      try {
        if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name)
          return a[b];
      } catch (c) {}
    return null;
  }
  function df(a, b, c) {
    a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1);
  }
  function ef(a, b, c) {
    a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1);
  }
  function ff(a) {
    /^https?:\/\//.test(a) || (a = window.location.href);
    var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
    return b ? b[1] : a;
  }
  function gf(a) {
    var b = "";
    try {
      a = a.replace("#", "");
      var c = {},
          d = a.replace(/^\?/, "").split("&");
      for (a = 0; a < d.length; a++)
        if (d[a]) {
          var e = d[a].split("=");
          c[e[0]] = e[1];
        }
      c && u(c, "__firebase_request_key") && (b = v(c, "__firebase_request_key"));
    } catch (f) {}
    return b;
  }
  function hf(a) {
    var b = [],
        c;
    for (c in a)
      if (u(a, c)) {
        var d = v(a, c);
        if (ea(d))
          for (var e = 0; e < d.length; e++)
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d[e]));
        else
          b.push(encodeURIComponent(c) + "=" + encodeURIComponent(v(a, c)));
      }
    return b.join("&");
  }
  function jf() {
    var a = ub(Ye);
    return a.scheme + "://" + a.host + "/v2";
  }
  ;
  function kf() {
    return !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent);
  }
  function lf() {
    var a = navigator.userAgent;
    if ("Microsoft Internet Explorer" === navigator.appName) {
      if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length)
        return 8 <= parseFloat(a[1]);
    } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length)
      return 8 <= parseFloat(a[1]);
    return !1;
  }
  ;
  function mf(a) {
    a = a || {};
    a.method || (a.method = "GET");
    a.headers || (a.headers = {});
    a.headers.content_type || (a.headers.content_type = "application/json");
    a.headers.content_type = a.headers.content_type.toLowerCase();
    this.options = a;
  }
  mf.prototype.open = function(a, b, c) {
    function d() {
      c && (c(V("REQUEST_INTERRUPTED")), c = null);
    }
    var e = new XMLHttpRequest,
        f = this.options.method.toUpperCase(),
        g;
    df(window, "beforeunload", d);
    e.onreadystatechange = function() {
      if (c && 4 === e.readyState) {
        var a;
        if (200 <= e.status && 300 > e.status) {
          try {
            a = ua(e.responseText);
          } catch (b) {}
          c(null, a);
        } else
          500 <= e.status && 600 > e.status ? c(V("SERVER_ERROR")) : c(V("NETWORK_ERROR"));
        c = null;
        ef(window, "beforeunload", d);
      }
    };
    if ("GET" === f)
      a += (/\?/.test(a) ? "" : "?") + hf(b), g = null;
    else {
      var k = this.options.headers.content_type;
      "application/json" === k && (g = t(b));
      "application/x-www-form-urlencoded" === k && (g = hf(b));
    }
    e.open(f, a, !0);
    a = {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json;text/plain"
    };
    Ed(a, this.options.headers);
    for (var l in a)
      e.setRequestHeader(l, a[l]);
    e.send(g);
  };
  mf.isAvailable = function() {
    return !!window.XMLHttpRequest && "string" === typeof(new XMLHttpRequest).responseType && (!(navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) || lf());
  };
  mf.prototype.uc = function() {
    return "json";
  };
  function nf(a) {
    a = a || {};
    this.Uc = Ha() + Ha() + Ha();
    this.kf = a || {};
  }
  nf.prototype.open = function(a, b, c) {
    function d() {
      c && (c(V("USER_CANCELLED")), c = null);
    }
    var e = this,
        f = ub(Ye),
        g;
    b.requestId = this.Uc;
    b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
    a += /\?/.test(a) ? "" : "?";
    a += hf(b);
    (g = window.open(a, "_blank", "location=no")) && ha(g.addEventListener) ? (g.addEventListener("loadstart", function(a) {
      var b;
      if (b = a && a.url)
        a: {
          var f = a.url;
          try {
            var r = document.createElement("a");
            r.href = f;
            b = r.host === ub(Ye).host && "/blank/page.html" === r.pathname;
            break a;
          } catch (s) {}
          b = !1;
        }
      b && (a = gf(a.url), g.removeEventListener("exit", d), g.close(), a = new Ze(null, null, {
        requestId: e.Uc,
        requestKey: a
      }), e.kf.requestWithCredential("/auth/session", a, c), c = null);
    }), g.addEventListener("exit", d)) : c(V("TRANSPORT_UNAVAILABLE"));
  };
  nf.isAvailable = function() {
    return kf();
  };
  nf.prototype.uc = function() {
    return "redirect";
  };
  function of(a) {
    a = a || {};
    if (!a.window_features || -1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android"))
      a.window_features = void 0;
    a.window_name || (a.window_name = "_blank");
    a.relay_url || (a.relay_url = jf() + "/auth/channel");
    this.options = a;
  }
  of.prototype.open = function(a, b, c) {
    function d(a) {
      g && (document.body.removeChild(g), g = void 0);
      r && (r = clearInterval(r));
      ef(window, "message", e);
      ef(window, "unload", d);
      if (m && !a)
        try {
          m.close();
        } catch (b) {
          k.postMessage("die", l);
        }
      m = k = void 0;
    }
    function e(a) {
      if (a.origin === l)
        try {
          var b = ua(a.data);
          "ready" === b.a ? k.postMessage(s, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null));
        } catch (e) {}
    }
    var f = lf(),
        g,
        k,
        l = ff(a);
    if (l !== ff(this.options.relay_url))
      c && setTimeout(function() {
        c(Error("invalid arguments: origin of url and relay_url must match"));
      }, 0);
    else {
      f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
      a += (/\?/.test(a) ? "" : "?") + hf(b);
      var m = window.open(a, this.options.window_name, this.options.window_features);
      k || (k = m);
      var r = setInterval(function() {
        m && m.closed && (d(!1), c && (c(V("USER_CANCELLED")), c = null));
      }, 500),
          s = t({
            a: "request",
            d: b
          });
      df(window, "unload", d);
      df(window, "message", e);
    }
  };
  of.isAvailable = function() {
    return "postMessage" in window && !/^file:\//.test(location.href) && !(kf() || navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href) || navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone) && !navigator.userAgent.match(/PhantomJS/);
  };
  of.prototype.uc = function() {
    return "popup";
  };
  function pf(a) {
    a = a || {};
    a.callback_parameter || (a.callback_parameter = "callback");
    this.options = a;
    window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {};
  }
  pf.prototype.open = function(a, b, c) {
    function d() {
      c && (c(V("REQUEST_INTERRUPTED")), c = null);
    }
    function e() {
      setTimeout(function() {
        window.__firebase_auth_jsonp[f] = void 0;
        Bd(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
        try {
          var a = document.getElementById(f);
          a && a.parentNode.removeChild(a);
        } catch (b) {}
      }, 1);
      ef(window, "beforeunload", d);
    }
    var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
    b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
    a += (/\?/.test(a) ? "" : "?") + hf(b);
    df(window, "beforeunload", d);
    window.__firebase_auth_jsonp[f] = function(a) {
      c && (c(null, a), c = null);
      e();
    };
    qf(f, a, c);
  };
  function qf(a, b, c) {
    setTimeout(function() {
      try {
        var d = document.createElement("script");
        d.type = "text/javascript";
        d.id = a;
        d.async = !0;
        d.src = b;
        d.onerror = function() {
          var b = document.getElementById(a);
          null !== b && b.parentNode.removeChild(b);
          c && c(V("NETWORK_ERROR"));
        };
        var e = document.getElementsByTagName("head");
        (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d);
      } catch (f) {
        c && c(V("NETWORK_ERROR"));
      }
    }, 0);
  }
  pf.isAvailable = function() {
    return !kf();
  };
  pf.prototype.uc = function() {
    return "json";
  };
  function rf(a, b) {
    this.Ge = ["session", a.Gd, a.yb].join(":");
    this.Pd = b;
  }
  rf.prototype.set = function(a, b) {
    if (!b)
      if (this.Pd.length)
        b = this.Pd[0];
      else
        throw Error("fb.login.SessionManager : No storage options available!");
    b.set(this.Ge, a);
  };
  rf.prototype.get = function() {
    var a = La(this.Pd, q(this.Tf, this)),
        a = Ka(a, function(a) {
          return null !== a;
        });
    Ta(a, function(a, c) {
      return ve(c.token) - ve(a.token);
    });
    return 0 < a.length ? a.shift() : null;
  };
  rf.prototype.Tf = function(a) {
    try {
      var b = a.get(this.Ge);
      if (b && b.token)
        return b;
    } catch (c) {}
    return null;
  };
  rf.prototype.clear = function() {
    var a = this;
    Ja(this.Pd, function(b) {
      b.remove(a.Ge);
    });
  };
  function sf(a) {
    a = a || {};
    this.Uc = Ha() + Ha() + Ha();
    this.kf = a || {};
  }
  sf.prototype.open = function(a, b) {
    Ba.set("redirect_request_id", this.Uc);
    b.requestId = this.Uc;
    b.redirectTo = b.redirectTo || window.location.href;
    a += (/\?/.test(a) ? "" : "?") + hf(b);
    window.location = a;
  };
  sf.isAvailable = function() {
    return !/^file:\//.test(location.href) && !kf();
  };
  sf.prototype.uc = function() {
    return "redirect";
  };
  function tf(a, b, c, d) {
    td.call(this, ["auth_status"]);
    this.Q = a;
    this.Re = b;
    this.xg = c;
    this.Be = d;
    this.mc = new rf(a, [Aa, Ba]);
    this.jb = null;
    uf(this);
  }
  na(tf, td);
  h = tf.prototype;
  h.ne = function() {
    return this.jb || null;
  };
  function uf(a) {
    Ba.get("redirect_request_id") && vf(a);
    var b = a.mc.get();
    b && b.token ? (wf(a, b), a.Re(b.token, function(c, d) {
      xf(a, c, d, !1, b.token, b);
    }, function(b, d) {
      yf(a, "resumeSession()", b, d);
    })) : wf(a, null);
  }
  function zf(a, b, c, d, e, f) {
    "firebaseio-demo.com" === a.Q.domain && z("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
    a.Re(b, function(f, k) {
      xf(a, f, k, !0, b, c, d || {}, e);
    }, function(b, c) {
      yf(a, "auth()", b, c, f);
    });
  }
  function Af(a, b) {
    a.mc.clear();
    wf(a, null);
    a.xg(function(a, d) {
      if ("ok" === a)
        B(b, null);
      else {
        var e = (a || "error").toUpperCase(),
            f = e;
        d && (f += ": " + d);
        f = Error(f);
        f.code = e;
        B(b, f);
      }
    });
  }
  function xf(a, b, c, d, e, f, g, k) {
    "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = we(e) ? e : "", c = null, b && u(b, "uid") ? c = v(b, "uid") : u(f, "uid") && (c = v(f, "uid")), f.uid = c, c = "custom", b && u(b, "provider") ? c = v(b, "provider") : u(f, "provider") && (c = v(f, "provider")), f.provider = c, a.mc.clear(), we(e) && (g = g || {}, c = Aa, "sessionOnly" === g.remember && (c = Ba), "none" !== g.remember && a.mc.set(f, c)), wf(a, f)), B(k, null, f)) : (a.mc.clear(), wf(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, B(k, f));
  }
  function yf(a, b, c, d, e) {
    z(b + " was canceled: " + d);
    a.mc.clear();
    wf(a, null);
    a = Error(d);
    a.code = c.toUpperCase();
    B(e, a);
  }
  function Bf(a, b, c, d, e) {
    Cf(a);
    var f = [mf, pf];
    c = new Ze(d || {}, {}, c || {});
    Df(a, f, "/auth/" + b, c, e);
  }
  function Ef(a, b, c, d) {
    Cf(a);
    var e = [of, nf];
    c = af(c);
    "anonymous" === b || "password" === b ? setTimeout(function() {
      B(d, V("TRANSPORT_UNAVAILABLE"));
    }, 0) : (c.Sd.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.Sd.relay_url = jf() + "/" + a.Q.yb + "/auth/channel", c.Sd.requestWithCredential = q(a.Vc, a), Df(a, e, "/auth/" + b, c, d));
  }
  function vf(a) {
    var b = Ba.get("redirect_request_id");
    if (b) {
      var c = Ba.get("redirect_client_options");
      Ba.remove("redirect_request_id");
      Ba.remove("redirect_client_options");
      var d = [mf, pf],
          b = {
            requestId: b,
            requestKey: gf(document.location.hash)
          },
          c = new Ze(c, {}, b);
      try {
        document.location.hash = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, "");
      } catch (e) {}
      Df(a, d, "/auth/session", c);
    }
  }
  h.je = function(a, b) {
    Cf(this);
    var c = af(a);
    c.lc._method = "POST";
    this.Vc("/users", c, function(a, c) {
      a ? B(b, a) : B(b, a, c);
    });
  };
  h.Ie = function(a, b) {
    var c = this;
    Cf(this);
    var d = "/users/" + encodeURIComponent(a.email),
        e = af(a);
    e.lc._method = "DELETE";
    this.Vc(d, e, function(a, d) {
      !a && d && d.uid && c.jb && c.jb.uid && c.jb.uid === d.uid && Af(c);
      B(b, a);
    });
  };
  h.ee = function(a, b) {
    Cf(this);
    var c = "/users/" + encodeURIComponent(a.email) + "/password",
        d = af(a);
    d.lc._method = "PUT";
    d.lc.password = a.newPassword;
    this.Vc(c, d, function(a) {
      B(b, a);
    });
  };
  h.Je = function(a, b) {
    Cf(this);
    var c = "/users/" + encodeURIComponent(a.email) + "/password",
        d = af(a);
    d.lc._method = "POST";
    this.Vc(c, d, function(a) {
      B(b, a);
    });
  };
  h.Vc = function(a, b, c) {
    Ff(this, [mf, pf], a, b, c);
  };
  function Df(a, b, c, d, e) {
    Ff(a, b, c, d, function(b, c) {
      !b && c && c.token && c.uid ? zf(a, c.token, c, d.ed, function(a, b) {
        a ? B(e, a) : B(e, null, b);
      }) : B(e, b || V("UNKNOWN_ERROR"));
    });
  }
  function Ff(a, b, c, d, e) {
    b = Ka(b, function(a) {
      return "function" === typeof a.isAvailable && a.isAvailable();
    });
    0 === b.length ? setTimeout(function() {
      B(e, V("TRANSPORT_UNAVAILABLE"));
    }, 0) : (b = new (b.shift())(d.Sd), d = wa(d.lc), d.v = "js-2.0.5", d.transport = b.uc(), d.suppress_status_codes = !0, a = jf() + "/" + a.Q.yb + c, b.open(a, d, function(a, b) {
      if (a)
        B(e, a);
      else if (b && b.error) {
        var c = Error(b.error.message);
        c.code = b.error.code;
        c.details = b.error.details;
        B(e, c);
      } else
        B(e, null, b);
    }));
  }
  function wf(a, b) {
    var c = null !== a.jb || null !== b;
    a.jb = b;
    c && a.Td("auth_status", b);
    a.Be(null !== b);
  }
  h.pe = function(a) {
    x("auth_status" === a, 'initial event must be of type "auth_status"');
    return [this.jb];
  };
  function Cf(a) {
    var b = a.Q;
    if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === Ye)
      throw Error("This custom Firebase server ('" + a.Q.domain + "') does not support delegated login.");
  }
  ;
  function Gf(a, b) {
    return a && "object" === typeof a ? (x(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a;
  }
  function Hf(a, b) {
    var c = new Pe;
    Re(a, new P(""), function(a, e) {
      c.ic(a, If(e, b));
    });
    return c;
  }
  function If(a, b) {
    var c = a.O().N(),
        c = Gf(c, b),
        d;
    if (a.P()) {
      var e = Gf(a.ta(), b);
      return e !== a.ta() || c !== a.O().N() ? new Zc(e, J(c)) : a;
    }
    d = a;
    c !== a.O().N() && (d = d.ib(new Zc(c)));
    a.ea(L, function(a, c) {
      var e = If(c, b);
      e !== c && (d = d.I(a, e));
    });
    return d;
  }
  ;
  function W(a, b, c, d) {
    this.type = a;
    this.Wa = b;
    this.nb = c;
    this.Rc = null;
    this.$f = d;
  }
  ;
  function Jf() {}
  var Kf = new Jf;
  function Lf(a, b, c, d) {
    var e,
        f;
    f = X(c);
    e = X(b);
    if (d.e())
      return c.u ? (a = [], e ? e.da(f) || (e.P() ? a = Mf(f) : f.P() ? (a = [], e.P() || e.e() || a.push(new W("children_removed", e))) : a = Nf(e, f), a.push(new W("value", f))) : (a = Mf(f), a.push(new W("value", f))), 0 !== a.length || b.u || a.push(new W("value", f)), a) : e ? Nf(e, f) : Mf(f);
    if (".priority" === G(d))
      return !c.u || e && e.da(f) ? [] : [new W("value", f)];
    if (c.u || 1 === Q(d))
      return e = G(d), f = f.B(e), a.kd(b, c, e, f);
    e = G(d);
    return f.Y(e) ? (f = f.B(e), a.kd(b, c, e, f)) : [];
  }
  Jf.prototype.kd = function(a, b, c, d) {
    (a = X(a)) ? a.Y(c) ? (a = a.B(c), c = a.da(d) ? [] : d.e() ? [new W("child_removed", a, c)] : [new W("child_changed", d, c, a)]) : c = d.e() ? [] : [new W("child_added", d, c)] : c = d.e() ? [] : [new W("child_added", d, c)];
    0 < c.length && b.u && c.push(new W("value", X(b)));
    return c;
  };
  function Mf(a) {
    var b = [];
    a.P() || a.e() || b.push(new W("children_added", a));
    return b;
  }
  function Nf(a, b) {
    var c = [],
        d = [],
        e = [],
        f = [],
        g = {},
        k = {},
        l,
        m,
        r,
        s;
    l = a.Aa(L);
    r = U(l);
    m = b.Aa(L);
    s = U(m);
    for (var y = H(L); null !== r || null !== s; ) {
      var N;
      N = r ? s ? y(r, s) : -1 : 1;
      0 > N ? (N = v(g, r.name), n(N) ? (f.push(d[N]), d[N] = null) : (k[r.name] = e.length, e.push(r)), r = U(l)) : (0 < N ? (N = v(k, s.name), n(N) ? (f.push(s), e[N] = null) : (g[s.name] = d.length, d.push(s))) : ((r = r.K.hash() !== s.K.hash()) && f.push(s), r = U(l)), s = U(m));
    }
    for (g = 0; g < e.length; g++)
      (k = e[g]) && c.push(new W("child_removed", k.K, k.name));
    for (g = 0; g < d.length; g++)
      (e = d[g]) && c.push(new W("child_added", e.K, e.name));
    for (g = 0; g < f.length; g++)
      d = f[g], c.push(new W("child_changed", d.K, d.name, a.B(d.name)));
    return c;
  }
  function Of(a, b, c) {
    this.bb = a;
    this.Ma = c;
    this.m = b;
  }
  na(Of, Jf);
  Of.prototype.kd = function(a, b, c, d) {
    var e = X(a) || K,
        f = X(b) || K;
    if (e.Ua() < this.bb || f.Ua() < this.bb)
      return Of.oc.kd.call(this, a, b, c, d);
    x(!e.P() && !f.P(), "If it's a leaf node, we should have hit the above case.");
    a = [];
    var g = e.B(c);
    g.e() ? f.Y(c) && (e = this.Ma ? ld(e, this.m) : md(e, this.m), a.push(new W("child_removed", e.K, e.name)), a.push(new W("child_added", d, c))) : f.Y(c) ? d.da(g) || a.push(new W("child_changed", d, c, e.B(c))) : (a.push(new W("child_removed", g, c)), e = this.Ma ? ld(f, this.m) : md(f, this.m), a.push(new W("child_added", e.K, e.name)));
    0 < a.length && b.u && a.push(new W("value", f));
    return a;
  };
  function Pf() {}
  h = Pf.prototype;
  h.Xa = function(a, b, c, d) {
    var e;
    if (b.type === Qf) {
      if (b.source.$e)
        return this.Fa(a, b.path, b.Oa, c, d);
      x(b.source.Ze, "Unknown source.");
      e = b.source.wf;
      return this.Sa(a, b.path, b.Oa, c, d, e);
    }
    if (b.type === Rf) {
      if (b.source.$e)
        return this.ae(a, b.path, b.children, c, d);
      x(b.source.Ze, "Unknown source.");
      e = b.source.wf;
      return this.$d(a, b.path, b.children, c, d, e);
    }
    if (b.type === Sf) {
      if (b.sf)
        a: {
          var f = b.path;
          Tf(this, a);
          b = a.u;
          e = a.X;
          if (a.F) {
            x(a.u, "Must have event snap if we have server snap");
            var g = c.Ya(f, a.u, a.F);
            if (g)
              if (b = a.u.L(f, g), f.e())
                b = this.G(b);
              else {
                e = G(f);
                b = b.B(e);
                a = this.Ra(a, e, b, a.F, a.o, c, d);
                break a;
              }
          } else if (a.o)
            if (a.u)
              (d = c.Ob()) ? b = this.G(d) : (c = c.Ya(f, a.u, a.o)) && (b = this.G(b.L(f, c)));
            else {
              if (x(a.X, "We must at least have complete children"), x(!f.e(), "If the path were empty, we would have an event snap from the set"), c = c.Ya(f, a.X, a.o))
                e = a.X.L(f, c), e = this.G(e);
            }
          else if (a.u)
            (c = c.Ob()) && (b = this.G(c));
          else if (a.X) {
            x(!f.e(), "If the path was empty, we would have an event snap");
            g = G(f);
            if (a.X.Y(g)) {
              a = (b = c.Ib.Ob(c.Gb.k(g))) ? this.Ra(a, g, b, a.F, a.o, c, d) : this.Ra(a, g, K, a.F, a.o, c, null);
              break a;
            }
            x(1 < Q(f), "Must be a deep set being reverted");
          }
          a = new Uf(a.F, a.o, b, e);
        }
      else
        a = this.Ea(a, b.path, c, d);
      return a;
    }
    if (b.type === Vf)
      return b = b.path, Tf(this, a), this.Sa(a, b, (a.ab() || K).$(b), c, d, !1);
    throw ib("Unknown operation type: " + b.type);
  };
  function Tf(a, b) {
    Wf(a, b.F);
    Wf(a, b.o);
    Wf(a, b.u);
    Wf(a, b.X);
  }
  function Wf(a, b) {
    x(!b || a.Yb(b), "Expected an indexed snap");
  }
  h.Fa = function(a, b, c, d, e) {
    Tf(this, a);
    if (b.e())
      return b = this.G(c), new Uf(a.F, a.o, b, null);
    var f = X(a) || K,
        g = G(b);
    return 1 === Q(b) || a.u || f.Y(g) ? (c = f.B(G(b)).L(R(b), c), this.Ra(a, G(b), c, a.F, a.o, d, e)) : a;
  };
  h.ae = function(a, b, c, d, e) {
    Tf(this, a);
    var f = this,
        g = a;
    Xf(c, function(c, l) {
      var m = b.k(c);
      Yf(a, G(m)) && (g = f.Fa(g, m, l, d, e));
    });
    Xf(c, function(c, l) {
      var m = b.k(c);
      Yf(a, G(m)) || (g = f.Fa(g, m, l, d, e));
    });
    return g;
  };
  h.Ea = function(a, b, c, d) {
    var e = a.u,
        f = a.X,
        g;
    Tf(this, a);
    if (a.F) {
      x(e, "If we have a server snap, we must have an event snap");
      var k = c.Ya(b, a.u, a.F);
      if (k)
        if (b.e())
          e = this.G(k);
        else
          return g = G(b), b = e.L(b, k).B(g), this.Ra(a, g, b, a.F, a.o, c, d);
    } else if (a.o)
      if (e) {
        var l = !1;
        a.o.ea(L, function(a, b) {
          l || e.B(a).da(b) || (l = !0);
          l && (e = e.I(a, b));
        });
        l && (e = this.G(e));
      } else if (f && (x(0 < Q(b), "If it were an empty path, we would have an event snap"), g = G(b), 1 === Q(b) || f.Y(g)) && (k = c.Ya(b, f, a.o)))
        return b = f.L(b, k).B(g), this.Ra(a, g, b, a.F, a.o, c, d);
    return new Uf(a.F, a.o, e, f);
  };
  h.Sa = function(a, b, c, d, e, f) {
    var g;
    Tf(this, a);
    var k = a.F,
        l = a.o;
    if (a.F)
      k = b.e() ? this.G(c, f) : this.G(a.F.L(b, c), f);
    else if (b.e())
      k = this.G(c, f), l = null;
    else if (1 === Q(b) && (a.o || !c.e()))
      l = a.o || this.Ia(K), l = this.G(l.L(b, c), f);
    else if (a.o && (g = G(b), a.o.Y(g)))
      var m = a.o.B(g).L(R(b), c),
          l = this.G(a.o.I(g, m), f);
    g = !1;
    f = a.u;
    m = a.X;
    if (k !== a.F || l !== a.o)
      if (k && !f)
        f = this.G(d.xa(k)), m = null;
      else if (k && f && !c.e() && k.$(b).da(f.$(b)))
        g = !0;
      else if (c = d.Ya(b, f, k || l))
        if (b.e())
          f = this.G(c), m = null;
        else {
          g = G(b);
          b = R(b);
          a: {
            f = g;
            if (a.u)
              m = a.u.B(f);
            else if (a.X)
              a.X.Y(f) ? m = a.X.B(f) : (x(b.e(), "According to precondition, this must be true"), m = K);
            else {
              if (b.e()) {
                m = c;
                break a;
              }
              x(a.F || a.o, "If we do not have event data, we must have server data");
              m = (a.F || a.o).B(f);
            }
            m = m.e() && a.ab() ? a.ab().B(f).L(b, c) : m.L(b, c);
          }
          return this.Ra(a, g, m, k, l, d, e);
        }
      else
        g = !0;
    x(!g || f === a.u && m === a.X, "We thought we could skip diffing, but we changed the eventCache.");
    return new Uf(k, l, f, m);
  };
  h.$d = function(a, b, c, d, e, f) {
    if (!a.F && !a.o && b.e())
      return a;
    Tf(this, a);
    var g = this,
        k = a;
    Xf(c, function(c, m) {
      var r = b.k(c);
      Yf(a, G(r)) && (k = g.Sa(k, r, m, d, e, f));
    });
    Xf(c, function(c, m) {
      var r = b.k(c);
      Yf(a, G(r)) || (k = g.Sa(k, r, m, d, e, f));
    });
    return k;
  };
  h.Ra = function(a, b, c, d, e) {
    var f = a.u;
    a = a.X;
    f ? f = this.G(f.I(b, c)) : (a || (a = this.Ia(K)), a = this.G(a.I(b, c)));
    return new Uf(d, e, f, a);
  };
  h.G = function(a) {
    return this.Ia(a);
  };
  function Yf(a, b) {
    var c = X(a),
        d = a.ab();
    return !!(c && c.Y(b) || d && d.Y(b));
  }
  ;
  function Zf(a) {
    this.gb = a;
    this.index = a.m;
    this.gb.ha && n(pc(this.gb)) ? (a = qc(this.gb), a = this.index.ye(pc(this.gb), a)) : a = this.index.Ae();
    this.Fb = a;
    this.gb.na && n(rc(this.gb)) ? (a = sc(this.gb), a = this.index.ye(rc(this.gb), a)) : a = this.index.ze();
    this.pb = a;
  }
  na(Zf, Pf);
  Zf.prototype.Ia = function(a) {
    return a.Wd(this.index);
  };
  Zf.prototype.Yb = function(a) {
    return a.Yb(this.index);
  };
  Zf.prototype.G = function(a, b) {
    if (!1 === b)
      return Zf.oc.G.call(this, a, !1);
    if (a.P())
      return this.Ia(K);
    for (var c = this.Ia(a),
        d = this.Fb,
        e = this.pb,
        f = H(this.index),
        g = c.Aa(this.index),
        k = U(g); k && 0 < f(d, k); )
      c = c.I(k.name, K), k = U(g);
    g = c.rb(e, this.index);
    for ((k = U(g)) && 0 >= f(k, e) && (k = U(g)); k; )
      c = c.I(k.name, K), k = U(g);
    return c;
  };
  Zf.prototype.Fa = function(a, b, c, d, e) {
    Tf(this, a);
    if (1 < Q(b)) {
      var f = G(b);
      if ((null !== X(a) ? X(a) : K).Y(f))
        return Zf.oc.Fa.call(this, a, b, c, d, e);
      var g = null !== e ? e : a.ab(),
          g = null !== g && g.Y(f) ? g.B(f) : null,
          g = d.k(f).xa(g);
      return null !== g ? (b = g.L(R(b), c), this.Ra(a, f, b, a.F, a.o, d, e)) : a;
    }
    return Zf.oc.Fa.call(this, a, b, c, d, e);
  };
  function $f(a) {
    Zf.call(this, a);
    this.Ma = !("" === a.Hb ? a.ha : "l" === a.Hb);
    this.bb = tc(a);
  }
  na($f, Zf);
  $f.prototype.G = function(a, b) {
    if (!1 === b)
      return $f.oc.G.call(this, a, !1);
    if (a.P())
      return this.Ia(K);
    var c = this.Ia(a),
        d,
        e,
        f,
        g;
    if (2 * this.bb < a.Ua())
      for (d = this.Ia(K.ib(a.O())), c = this.Ma ? c.Sb(this.pb, this.index) : c.rb(this.Fb, this.index), e = U(c), f = 0; e && f < this.bb; )
        if (g = this.Ma ? 0 >= H(this.index)(this.Fb, e) : 0 >= H(this.index)(e, this.pb))
          d = d.I(e.name, e.K), f++, e = U(c);
        else
          break;
    else {
      d = this.Ia(a);
      var k,
          l,
          m = H(this.index);
      if (this.Ma) {
        c = c.bf(this.index);
        k = this.pb;
        l = this.Fb;
        var r = m,
            m = function(a, b) {
              return -1 * r(a, b);
            };
      } else
        c = c.Aa(this.index), k = this.Fb, l = this.pb;
      f = 0;
      var s = !1;
      for (e = U(c); e; )
        !s && 0 >= m(k, e) && (s = !0), (g = s && f < this.bb && 0 >= m(e, l)) ? f++ : d = d.I(e.name, K), e = U(c);
    }
    return d;
  };
  $f.prototype.Ra = function(a, b, c, d, e, f, g) {
    var k = X(a);
    return !k || k.Ua() < this.bb ? $f.oc.Ra.call(this, a, b, c, d, e, f, g) : (b = ag(this, a, b, c, f, g || d)) ? a.u ? new Uf(d, e, b, null) : new Uf(d, e, null, b) : new Uf(d, e, a.u, a.X);
  };
  function ag(a, b, c, d, e, f) {
    var g = H(a.index),
        k;
    k = a.Ma ? function(a, b) {
      return -1 * g(a, b);
    } : g;
    b = X(b);
    x(b.Ua() === a.bb, "Limit should be full.");
    var l = new I(c, d),
        m = a.Ma ? ld(b, a.index) : md(b, a.index);
    x(null != m, "Shouldn't be null, since oldEventCache shouldn't be empty.");
    var r = 0 >= H(a.index)(a.Fb, l) && 0 >= H(a.index)(l, a.pb);
    if (b.Y(c)) {
      f = e.de(f, m, 1, a.Ma, a.index);
      e = null;
      0 < f.length && (e = f[0], e.name === c && (e = 2 <= f.length ? f[1] : null));
      k = null == e ? 1 : k(e, l);
      if (r && !d.e() && 0 <= k)
        return b.I(c, d);
      c = b.I(c, K);
      return null != e && 0 >= H(a.index)(a.Fb, e) && 0 >= H(a.index)(e, a.pb) ? c.I(e.name, e.K) : c;
    }
    return d.e() ? null : r ? 0 <= k(m, l) ? b.I(c, d).I(m.name, K) : null : null;
  }
  ;
  function bg(a) {
    this.m = a;
  }
  na(bg, Pf);
  bg.prototype.Ia = function(a) {
    return a.Wd(this.m);
  };
  bg.prototype.Yb = function(a) {
    return a.Yb(this.m);
  };
  function cg(a) {
    this.U = a;
    this.m = a.w.m;
  }
  function dg(a, b, c, d) {
    var e = [],
        f = a.m,
        g = La(Ka(b, function(a) {
          return "child_changed" === a.type && f.df(a.$f, a.Wa);
        }), function(a) {
          return new W("child_moved", a.Wa, a.nb);
        }),
        k = Pa(b, function(a) {
          return "child_removed" !== a.type && "child_added" !== a.type;
        });
    for (la(Ra, b, k, 0).apply(null, g); 0 < b.length; ) {
      var g = b[0].type,
          k = eg(b, g),
          l = b.slice(0, k);
      b = b.slice(k);
      "value" === g || "children_added" === g || "children_removed" === g ? x(1 === l.length, "We should not have more than one of these at a view") : Ta(l, q(a.Lf, a));
      e = e.concat(fg(a, d, l, c));
    }
    return e;
  }
  function eg(a, b) {
    var c = Pa(a, function(a) {
      return a.type !== b;
    });
    return -1 === c ? a.length : c;
  }
  function fg(a, b, c, d) {
    for (var e = [],
        f = 0; f < c.length; ++f)
      for (var g = c[f],
          k = null,
          l = null,
          m = 0; m < b.length; ++m) {
        var r = b[m];
        if (r.pf(g.type)) {
          if (!k && !l)
            if ("children_added" === g.type) {
              var s = a,
                  y = g.Wa,
                  l = [];
              if (!y.P() && !y.e())
                for (var s = y.Aa(s.m),
                    y = null,
                    N = U(s); N; ) {
                  var Je = new W("child_added", N.K, N.name);
                  Je.Rc = y;
                  l.push(Je);
                  y = N.name;
                  N = U(s);
                }
            } else if ("children_removed" === g.type) {
              if (s = a, y = g.Wa, l = [], !y.P() && !y.e())
                for (s = y.Aa(s.m), y = U(s); y; )
                  l.push(new W("child_removed", y.K, y.name)), y = U(s);
            } else
              k = g, "value" !== k.type && "child_removed" !== k.type && (k.Rc = d.af(k.nb, k.Wa, a.m));
          if (k)
            e.push(r.createEvent(k, a.U));
          else
            for (s = 0; s < l.length; ++s)
              e.push(r.createEvent(l[s], a.U));
        }
      }
    return e;
  }
  cg.prototype.Lf = function(a, b) {
    if (null == a.nb || null == b.nb)
      throw ib("Should only compare child_ events.");
    return this.m.compare(new I(a.nb, a.Wa), new I(b.nb, b.Wa));
  };
  function gg(a, b) {
    this.U = a;
    var c = a.w;
    wc(c) ? (this.ec = new bg(c.m), this.ld = Kf) : c.ka ? (this.ec = new $f(c), this.ld = new Of(tc(c), c.m, this.ec.Ma)) : (this.ec = new Zf(c), this.ld = Kf);
    c = this.ec;
    this.ia = new Uf(b.F && c.G(b.F, !1), b.o && c.G(b.o, !1), b.u && c.G(b.u), b.X && c.G(b.X));
    this.ya = [];
    this.le = new cg(a);
  }
  function hg(a) {
    return a.U;
  }
  h = gg.prototype;
  h.ab = function() {
    return this.ia.ab();
  };
  h.za = function(a) {
    var b = this.ia.za();
    return b && (wc(this.U.w) || !a.e() && !b.B(G(a)).e()) ? b.$(a) : null;
  };
  h.e = function() {
    return 0 === this.ya.length;
  };
  h.Jb = function(a) {
    this.ya.push(a);
  };
  h.hb = function(a, b) {
    var c = [];
    if (b) {
      x(null == a, "A cancel should cancel all event registrations.");
      var d = this.U.path;
      Ja(this.ya, function(a) {
        (a = a.Te(b, d)) && c.push(a);
      });
    }
    if (a) {
      for (var e = [],
          f = 0; f < this.ya.length; ++f) {
        var g = this.ya[f];
        if (!g.matches(a))
          e.push(g);
        else if (a.cf()) {
          e = e.concat(this.ya.slice(f + 1));
          break;
        }
      }
      this.ya = e;
    } else
      this.ya = [];
    return c;
  };
  h.Xa = function(a, b, c) {
    a.type === Rf && null !== a.source.fc && (x(this.ia.za(), "We should always have a full cache before handling merges"), x(!!this.ia.u, "Missing event cache, even though we have a server cache"));
    var d = this.ia;
    b = this.ec.Xa(d, a, b, c);
    Tf(this.ec, b);
    this.ia = b;
    return X(b) !== X(d) ? (a = Lf(this.ld, d, b, a.path), d = X(b), dg(this.le, a, d, this.ya)) : b.u && !d.u ? (x(X(b) === X(d), "Caches should be the same."), d = X(b), dg(this.le, [new W("value", d)], d, this.ya)) : [];
  };
  function Uf(a, b, c, d) {
    this.F = a;
    this.o = b;
    this.u = c;
    this.X = d;
    x(null == a || null == b, "Only one of serverSnap / serverChildren can be non-null.");
    x(null == c || null == d, "Only one of eventSnap / eventChildren can be non-null.");
  }
  function X(a) {
    return a.u || a.X;
  }
  Uf.prototype.ab = function() {
    return this.F || this.o;
  };
  Uf.prototype.za = function() {
    return this.F;
  };
  var ig = new Uf(null, null, null, null);
  function jg(a, b) {
    this.value = a;
    this.children = b || kg;
  }
  var kg = new Lc(function(a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  }),
      lg = new jg(null);
  function mg(a) {
    var b = lg;
    A(a, function(a, d) {
      b = b.set(new P(d), a);
    });
    return b;
  }
  h = jg.prototype;
  h.e = function() {
    return null === this.value && this.children.e();
  };
  function ng(a, b, c) {
    if (null != a.value && c(a.value))
      return {
        path: S,
        value: a.value
      };
    if (b.e())
      return null;
    var d = G(b);
    a = a.children.get(d);
    return null !== a ? (b = ng(a, R(b), c), null != b ? {
      path: (new P(d)).k(b.path),
      value: b.value
    } : null) : null;
  }
  function og(a, b) {
    return ng(a, b, function() {
      return !0;
    });
  }
  h.subtree = function(a) {
    if (a.e())
      return this;
    var b = this.children.get(G(a));
    return null !== b ? b.subtree(R(a)) : lg;
  };
  h.set = function(a, b) {
    if (a.e())
      return new jg(b, this.children);
    var c = G(a),
        d = (this.children.get(c) || lg).set(R(a), b),
        c = this.children.Ja(c, d);
    return new jg(this.value, c);
  };
  h.remove = function(a) {
    if (a.e())
      return this.children.e() ? lg : new jg(null, this.children);
    var b = G(a),
        c = this.children.get(b);
    return c ? (a = c.remove(R(a)), b = a.e() ? this.children.remove(b) : this.children.Ja(b, a), null === this.value && b.e() ? lg : new jg(this.value, b)) : this;
  };
  h.get = function(a) {
    if (a.e())
      return this.value;
    var b = this.children.get(G(a));
    return b ? b.get(R(a)) : null;
  };
  function pg(a, b, c) {
    if (b.e())
      return c;
    var d = G(b);
    b = pg(a.children.get(d) || lg, R(b), c);
    d = b.e() ? a.children.remove(d) : a.children.Ja(d, b);
    return new jg(a.value, d);
  }
  function qg(a, b) {
    return rg(a, S, b);
  }
  function rg(a, b, c) {
    var d = {};
    a.children.Ba(function(a, f) {
      d[a] = rg(f, b.k(a), c);
    });
    return c(b, a.value, d);
  }
  function sg(a, b, c) {
    return tg(a, b, S, c);
  }
  function tg(a, b, c, d) {
    var e = a.value ? d(c, a.value) : !1;
    if (e)
      return e;
    if (b.e())
      return null;
    e = G(b);
    return (a = a.children.get(e)) ? tg(a, R(b), c.k(e), d) : null;
  }
  function ug(a, b, c) {
    if (!b.e()) {
      var d = !0;
      a.value && (d = c(S, a.value));
      !0 === d && (d = G(b), (a = a.children.get(d)) && vg(a, R(b), S.k(d), c));
    }
  }
  function vg(a, b, c, d) {
    if (b.e())
      return a;
    a.value && d(c, a.value);
    var e = G(b);
    return (a = a.children.get(e)) ? vg(a, R(b), c.k(e), d) : lg;
  }
  function Xf(a, b) {
    wg(a, S, b);
  }
  function wg(a, b, c) {
    a.children.Ba(function(a, e) {
      wg(e, b.k(a), c);
    });
    a.value && c(b, a.value);
  }
  function xg(a, b) {
    a.children.Ba(function(a, d) {
      d.value && b(a, d.value);
    });
  }
  ;
  function yg() {
    this.qa = {};
  }
  h = yg.prototype;
  h.e = function() {
    return Bd(this.qa);
  };
  h.Xa = function(a, b, c) {
    var d = a.source.fc;
    if (null !== d)
      return d = v(this.qa, d), x(null != d, "SyncTree gave us an op for an invalid query."), d.Xa(a, b, c);
    var e = [];
    A(this.qa, function(d) {
      e = e.concat(d.Xa(a, b, c));
    });
    return e;
  };
  h.Jb = function(a, b, c, d, e) {
    var f = a.Da(),
        g = v(this.qa, f);
    g || (c = (g = c.xa(d)) ? null : c.ce(e), d = new Uf(d, e, g, c), g = new gg(a, d), this.qa[f] = g);
    g.Jb(b);
    a = g;
    (f = X(a.ia)) ? (d = Lf(a.ld, ig, a.ia, S), b = dg(a.le, d, f, b ? [b] : a.ya)) : b = [];
    return b;
  };
  h.hb = function(a, b, c) {
    var d = a.Da(),
        e = [],
        f = [],
        g = null != zg(this);
    if ("default" === d) {
      var k = this;
      A(this.qa, function(a, d) {
        f = f.concat(a.hb(b, c));
        a.e() && (delete k.qa[d], wc(a.U.w) || e.push(a.U));
      });
    } else {
      var l = v(this.qa, d);
      l && (f = f.concat(l.hb(b, c)), l.e() && (delete this.qa[d], wc(l.U.w) || e.push(l.U)));
    }
    g && null == zg(this) && e.push(new O(a.g, a.path));
    return {
      mg: e,
      Pf: f
    };
  };
  function Ag(a) {
    return Ka(xd(a.qa), function(a) {
      return !wc(a.U.w);
    });
  }
  h.za = function(a) {
    var b = null;
    A(this.qa, function(c) {
      b = b || c.za(a);
    });
    return b;
  };
  function Bg(a, b) {
    if (wc(b.w))
      return zg(a);
    var c = b.Da();
    return v(a.qa, c);
  }
  function zg(a) {
    return Ad(a.qa, function(a) {
      return wc(a.U.w);
    }) || null;
  }
  ;
  function Cg() {
    this.V = lg;
    this.ra = [];
    this.Ec = -1;
  }
  function Dg(a, b) {
    var c = Pa(a.ra, function(a) {
      return a.Xd === b;
    });
    x(0 <= c, "removeWrite called with nonexistent writeId.");
    var d = a.ra[c];
    a.ra.splice(c, 1);
    for (var e = !1,
        f = !1,
        g = !1,
        k = a.ra.length - 1; !e && 0 <= k; ) {
      var l = a.ra[k];
      k >= c && Eg(l, d.path) ? e = !0 : !f && d.path.contains(l.path) && (k >= c ? f = !0 : g = !0);
      k--;
    }
    e || (f || g ? Fg(a) : d.Oa ? a.V = a.V.remove(d.path) : A(d.children, function(b, c) {
      a.V = a.V.remove(d.path.k(c));
    }));
    c = d.path;
    if (og(a.V, c)) {
      if (g)
        return c;
      x(e, "Must have found a shadow");
      return null;
    }
    return c;
  }
  h = Cg.prototype;
  h.Ob = function(a) {
    var b = og(this.V, a);
    if (b) {
      var c = b.value;
      a = T(b.path, a);
      return c.$(a);
    }
    return null;
  };
  h.xa = function(a, b, c, d) {
    var e,
        f;
    if (c || d)
      return e = this.V.subtree(a), !d && e.e() ? b : d || null !== b || null !== e.value ? (e = Gg(this.ra, function(b) {
        return (b.visible || d) && (!c || !(0 <= Ia(c, b.Xd))) && (b.path.contains(a) || a.contains(b.path));
      }, a), f = b || K, Xf(e, function(a, b) {
        f = f.L(a, b);
      }), f) : null;
    if (e = og(this.V, a))
      return b = T(e.path, a), e.value.$(b);
    e = this.V.subtree(a);
    return e.e() ? b : b || e.value ? (f = b || K, Xf(e, function(a, b) {
      f = f.L(a, b);
    }), f) : null;
  };
  h.ce = function(a, b) {
    var c = !1,
        d = K,
        e = this.Ob(a);
    if (e)
      return e.P() || e.ea(L, function(a, b) {
        d = d.I(a, b);
      }), d;
    if (b)
      return d = b, xg(this.V.subtree(a), function(a, b) {
        d = d.I(a, b);
      }), d;
    xg(this.V.subtree(a), function(a, b) {
      c = !0;
      d = d.I(a, b);
    });
    return c ? d : null;
  };
  h.Ya = function(a, b, c, d) {
    x(c || d, "Either existingEventSnap or existingServerSnap must exist");
    a = a.k(b);
    if (og(this.V, a))
      return null;
    a = this.V.subtree(a);
    if (a.e())
      return d.$(b);
    var e;
    c ? (e = !1, Xf(a, function(a, b) {
      e || c.$(a).da(b) || (e = !0);
    })) : e = !0;
    if (e) {
      var f = d.$(b);
      Xf(a, function(a, b) {
        f = f.L(a, b);
      });
      return f;
    }
    return null;
  };
  h.de = function(a, b, c, d, e, f) {
    var g;
    a = this.V.subtree(a);
    a.value ? g = a.value : b && (g = b, Xf(a, function(a, b) {
      g = g.L(a, b);
    }));
    if (g) {
      b = [];
      g = g.Wd(f);
      a = H(f);
      e = e ? g.Sb(c, f) : g.rb(c, f);
      for (f = U(e); f && b.length < d; )
        0 !== a(f, c) && b.push(f), f = U(e);
      return b;
    }
    return [];
  };
  function Eg(a, b) {
    return a.Oa ? a.path.contains(b) : !!zd(a.children, function(c, d) {
      return a.path.k(d).contains(b);
    });
  }
  function Fg(a) {
    a.V = Gg(a.ra, Hg, S);
    a.Ec = 0 < a.ra.length ? a.ra[a.ra.length - 1].Xd : -1;
  }
  function Hg(a) {
    return a.visible;
  }
  function Gg(a, b, c) {
    for (var d = lg,
        e = 0; e < a.length; ++e) {
      var f = a[e];
      if (b(f)) {
        var g = f.path,
            k;
        f.Oa ? (c.contains(g) ? (k = T(c, g), f = f.Oa) : (k = S, f = f.Oa.$(T(g, c))), d = Ig(d, k, f)) : d = Jg(d, f.path, f.children);
      }
    }
    return d;
  }
  function Ig(a, b, c) {
    var d = og(a, b);
    if (d) {
      var e = d.value,
          d = d.path;
      b = T(d, b);
      c = e.L(b, c);
      a = pg(a, d, new jg(c));
    } else
      a = pg(a, b, new jg(c));
    return a;
  }
  function Jg(a, b, c) {
    var d = og(a, b);
    if (d) {
      var e = d.value,
          d = d.path,
          f = T(d, b),
          g = e;
      A(c, function(a, b) {
        g = g.L(f.k(b), a);
      });
      a = pg(a, d, new jg(g));
    } else
      A(c, function(c, d) {
        a = pg(a, b.k(d), new jg(c));
      });
    return a;
  }
  function Kg(a, b) {
    this.Gb = a;
    this.Ib = b;
  }
  h = Kg.prototype;
  h.Ob = function() {
    return this.Ib.Ob(this.Gb);
  };
  h.xa = function(a, b, c) {
    return this.Ib.xa(this.Gb, a, b, c);
  };
  h.ce = function(a) {
    return this.Ib.ce(this.Gb, a);
  };
  h.Ya = function(a, b, c) {
    return this.Ib.Ya(this.Gb, a, b, c);
  };
  h.de = function(a, b, c, d, e) {
    return this.Ib.de(this.Gb, a, b, c, d, e);
  };
  h.k = function(a) {
    return new Kg(this.Gb.k(a), this.Ib);
  };
  function Lg(a, b, c) {
    this.type = Qf;
    this.source = a;
    this.path = b;
    this.Oa = c;
  }
  Lg.prototype.Mc = function(a) {
    return this.path.e() ? new Lg(this.source, S, this.Oa.B(a)) : new Lg(this.source, R(this.path), this.Oa);
  };
  function Mg(a, b) {
    this.type = Sf;
    this.source = Ng;
    this.path = a;
    this.sf = b;
  }
  Mg.prototype.Mc = function() {
    return this.path.e() ? this : new Mg(R(this.path), this.sf);
  };
  function Og(a, b) {
    this.type = Vf;
    this.source = a;
    this.path = b;
  }
  Og.prototype.Mc = function() {
    return this.path.e() ? new Og(this.source, S) : new Og(this.source, R(this.path));
  };
  function Pg(a, b, c) {
    this.type = Rf;
    this.source = a;
    this.path = b;
    this.children = c;
  }
  Pg.prototype.Mc = function(a) {
    if (this.path.e())
      return a = this.children.subtree(new P(a)), a.e() ? null : a.value ? new Lg(this.source, S, a.value) : new Pg(this.source, S, a);
    x(G(this.path) === a, "Can't get a merge for a child not on the path of the operation");
    return new Pg(this.source, R(this.path), this.children);
  };
  var Qf = 0,
      Rf = 1,
      Sf = 2,
      Vf = 3;
  function Qg(a, b, c, d) {
    this.$e = a;
    this.Ze = b;
    this.fc = c;
    this.wf = d;
    x(!d || b, "Tagged queries must be from server.");
  }
  var Ng = new Qg(!0, !1, null, !1),
      Rg = new Qg(!1, !0, null, !1);
  function Sg(a) {
    this.ma = lg;
    this.Bb = new Cg;
    this.Zc = {};
    this.gc = {};
    this.Fc = a;
  }
  h = Sg.prototype;
  h.Fa = function(a, b, c, d) {
    var e = this.Bb,
        f = d;
    x(c > e.Ec, "Stacking an older write on top of newer ones");
    n(f) || (f = !0);
    e.ra.push({
      path: a,
      Oa: b,
      Xd: c,
      visible: f
    });
    f && (e.V = Ig(e.V, a, b));
    e.Ec = c;
    return d ? Tg(this, new Lg(Ng, a, b)) : [];
  };
  h.ae = function(a, b, c) {
    var d = this.Bb;
    x(c > d.Ec, "Stacking an older merge on top of newer ones");
    d.ra.push({
      path: a,
      children: b,
      Xd: c,
      visible: !0
    });
    d.V = Jg(d.V, a, b);
    d.Ec = c;
    b = mg(b);
    return Tg(this, new Pg(Ng, a, b));
  };
  h.Ea = function(a, b) {
    b = b || !1;
    var c = Dg(this.Bb, a);
    return null == c ? [] : Tg(this, new Mg(c, b));
  };
  h.Sa = function(a, b) {
    return Tg(this, new Lg(Rg, a, b));
  };
  h.$d = function(a, b) {
    var c = mg(b);
    return Tg(this, new Pg(Rg, a, c));
  };
  function Ug(a, b, c, d) {
    d = Cd(a.Zc, "_" + d);
    if (null != d) {
      var e = Vg(d);
      d = e.path;
      e = e.fc;
      b = T(d, b);
      c = new Lg(new Qg(!1, !0, e, !0), b, c);
      return Wg(a, d, c);
    }
    return [];
  }
  function Xg(a, b, c, d) {
    if (d = Cd(a.Zc, "_" + d)) {
      var e = Vg(d);
      d = e.path;
      e = e.fc;
      b = T(d, b);
      c = mg(c);
      c = new Pg(new Qg(!1, !0, e, !0), b, c);
      return Wg(a, d, c);
    }
    return [];
  }
  h.Jb = function(a, b) {
    var c = a.path,
        d = null,
        e = !1;
    ug(this.ma, c, function(a, b) {
      var f = T(a, c);
      d = b.za(f);
      e = e || null != zg(b);
      return !d;
    });
    var f = this.ma.get(c);
    f ? (e = e || null != zg(f), d = d || f.za(S)) : (f = new yg, this.ma = this.ma.set(c, f));
    var g = null;
    if (!d) {
      var k = !1,
          g = K;
      xg(this.ma.subtree(c), function(a, b) {
        var c = b.za(S);
        c && (k = !0, g = g.I(a, c));
      });
      k || (g = null);
    }
    var l = null != Bg(f, a);
    if (!l && !wc(a.w)) {
      var m = Yg(a);
      x(!(m in this.gc), "View does not exist, but we have a tag");
      var r = Zg++;
      this.gc[m] = r;
      this.Zc["_" + r] = m;
    }
    m = f.Jb(a, b, new Kg(c, this.Bb), d, g);
    l || e || (f = Bg(f, a), m = m.concat($g(this, a, f)));
    return m;
  };
  h.hb = function(a, b, c) {
    var d = a.path,
        e = this.ma.get(d),
        f = [];
    if (e && ("default" === a.Da() || null != Bg(e, a))) {
      f = e.hb(a, b, c);
      e.e() && (this.ma = this.ma.remove(d));
      e = f.mg;
      f = f.Pf;
      b = -1 !== Pa(e, function(a) {
        return wc(a.w);
      });
      var g = sg(this.ma, d, function(a, b) {
        return null != zg(b);
      });
      if (b && !g && (d = this.ma.subtree(d), !d.e()))
        for (var d = ah(d),
            k = 0; k < d.length; ++k) {
          var l = d[k],
              m = l.U,
              l = bh(this, l);
          this.Fc.Le(m, ch(this, m), l.qd, l.H);
        }
      if (!g && 0 < e.length && !c)
        if (b)
          this.Fc.Od(a, null);
        else {
          var r = this;
          Ja(e, function(a) {
            a.Da();
            var b = r.gc[Yg(a)];
            r.Fc.Od(a, b);
          });
        }
      dh(this, e);
    }
    return f;
  };
  h.xa = function(a, b) {
    var c = this.Bb,
        d = sg(this.ma, a, function(b, c) {
          var d = T(b, a);
          if (d = c.za(d))
            return d;
        });
    return c.xa(a, d, b, !0);
  };
  function ah(a) {
    return qg(a, function(a, c, d) {
      if (c && null != zg(c))
        return [zg(c)];
      var e = [];
      c && (e = Ag(c));
      A(d, function(a) {
        e = e.concat(a);
      });
      return e;
    });
  }
  function dh(a, b) {
    for (var c = 0; c < b.length; ++c) {
      var d = b[c];
      if (!wc(d.w)) {
        var d = Yg(d),
            e = a.gc[d];
        delete a.gc[d];
        delete a.Zc["_" + e];
      }
    }
  }
  function $g(a, b, c) {
    var d = b.path,
        e = ch(a, b);
    c = bh(a, c);
    b = a.Fc.Le(b, e, c.qd, c.H);
    d = a.ma.subtree(d);
    if (e)
      x(null == zg(d.value), "If we're adding a query, it shouldn't be shadowed");
    else
      for (e = qg(d, function(a, b, c) {
        if (!a.e() && b && null != zg(b))
          return [hg(zg(b))];
        var d = [];
        b && (d = d.concat(La(Ag(b), function(a) {
          return a.U;
        })));
        A(c, function(a) {
          d = d.concat(a);
        });
        return d;
      }), d = 0; d < e.length; ++d)
        c = e[d], a.Fc.Od(c, ch(a, c));
    return b;
  }
  function bh(a, b) {
    var c = b.U,
        d = ch(a, c);
    return {
      qd: function() {
        return (b.ab() || K).hash();
      },
      H: function(b, f) {
        if ("ok" === b) {
          if (f && "object" === typeof f && u(f, "w")) {
            var g = v(f, "w");
            ea(g) && 0 <= Ia(g, "no_index") && z("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.w.m.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance");
          }
          if (d) {
            var k = c.path;
            if (g = Cd(a.Zc, "_" + d))
              var l = Vg(g),
                  g = l.path,
                  l = l.fc,
                  k = T(g, k),
                  k = new Og(new Qg(!1, !0, l, !0), k),
                  g = Wg(a, g, k);
            else
              g = [];
          } else
            g = Tg(a, new Og(Rg, c.path));
          return g;
        }
        g = "Unknown Error";
        "too_big" === b ? g = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? g = "Client doesn't have permission to access the desired data." : "unavailable" == b && (g = "The service is unavailable");
        g = Error(b + ": " + g);
        g.code = b.toUpperCase();
        return a.hb(c, null, g);
      }
    };
  }
  function Yg(a) {
    return a.path.toString() + "$" + a.Da();
  }
  function Vg(a) {
    var b = a.indexOf("$");
    x(-1 !== b && b < a.length - 1, "Bad queryKey.");
    return {
      fc: a.substr(b + 1),
      path: new P(a.substr(0, b))
    };
  }
  function ch(a, b) {
    var c = Yg(b);
    return v(a.gc, c);
  }
  var Zg = 1;
  function Wg(a, b, c) {
    var d = a.ma.get(b);
    x(d, "Missing sync point for query tag that we're tracking");
    return d.Xa(c, new Kg(b, a.Bb), null);
  }
  function Tg(a, b) {
    return eh(a, b, a.ma, null, new Kg(S, a.Bb));
  }
  function eh(a, b, c, d, e) {
    if (b.path.e())
      return fh(a, b, c, d, e);
    var f = c.get(S);
    null == d && null != f && (d = f.za(S));
    var g = [],
        k = G(b.path),
        l = b.Mc(k);
    if ((c = c.children.get(k)) && l)
      var m = d ? d.B(k) : null,
          k = e.k(k),
          g = g.concat(eh(a, l, c, m, k));
    f && (g = g.concat(f.Xa(b, e, d)));
    return g;
  }
  function fh(a, b, c, d, e) {
    var f = c.get(S);
    null == d && null != f && (d = f.za(S));
    var g = [];
    c.children.Ba(function(c, f) {
      var m = d ? d.B(c) : null,
          r = e.k(c),
          s = b.Mc(c);
      s && (g = g.concat(fh(a, s, f, m, r)));
    });
    f && (g = g.concat(f.Xa(b, e, d)));
    return g;
  }
  ;
  function gh(a) {
    this.Q = a;
    this.Qa = Ld(a);
    this.Z = new Te;
    this.zd = 1;
    this.S = new xe(this.Q, q(this.Cd, this), q(this.Ad, this), q(this.Ee, this));
    this.ug = Md(a, q(function() {
      return new Id(this.Qa, this.S);
    }, this));
    this.pc = new Fc;
    this.qe = new Se;
    var b = this;
    this.ud = new Sg({
      Le: function(a, d, e, f) {
        d = [];
        e = b.qe.Wc.$(a.path);
        e.e() || (d = b.ud.Sa(a.path, e), setTimeout(function() {
          f("ok");
        }, 0));
        return d;
      },
      Od: ba
    });
    hh(this, "connected", !1);
    this.fa = new Pe;
    this.T = new tf(a, q(this.S.T, this.S), q(this.S.Pe, this.S), q(this.Be, this));
    this.jd = 0;
    this.re = null;
    this.M = new Sg({
      Le: function(a, d, e, f) {
        Be(b.S, a, e, d, function(d, e) {
          var l = f(d, e);
          Xe(b.Z, a.path, l);
        });
        return [];
      },
      Od: function(a, d) {
        var e = b.S,
            f = a.path.toString(),
            g = a.Da();
        e.f("Unlisten called for " + f + " " + g);
        if (De(e, f, g) && e.ja) {
          var k = Dc(a);
          e.f("Unlisten on " + f + " for " + g);
          f = {p: f};
          d && (f.q = k, f.t = d);
          e.wa("n", f);
        }
      }
    });
  }
  h = gh.prototype;
  h.toString = function() {
    return (this.Q.Cb ? "https://" : "http://") + this.Q.host;
  };
  h.name = function() {
    return this.Q.yb;
  };
  function ih(a) {
    var b = new P(".info/serverTimeOffset");
    a = a.qe.Wc.$(b).N() || 0;
    return (new Date).getTime() + a;
  }
  function jh(a) {
    a = a = {timestamp: ih(a)};
    a.timestamp = a.timestamp || (new Date).getTime();
    return a;
  }
  h.Cd = function(a, b, c, d) {
    this.jd++;
    var e = new P(a);
    b = this.re ? this.re(a, b) : b;
    a = [];
    d ? c ? (b = fd(b, function(a) {
      return J(a);
    }), a = Xg(this.M, e, b, d)) : (b = J(b), a = Ug(this.M, e, b, d)) : c ? (d = fd(b, function(a) {
      return J(a);
    }), a = this.M.$d(e, d)) : (d = J(b), a = this.M.Sa(e, d));
    d = e;
    0 < a.length && (d = kh(this, e));
    Xe(this.Z, d, a);
  };
  h.Ad = function(a) {
    hh(this, "connected", a);
    !1 === a && lh(this);
  };
  h.Ee = function(a) {
    var b = this;
    Cb(a, function(a, d) {
      hh(b, d, a);
    });
  };
  h.Be = function(a) {
    hh(this, "authenticated", a);
  };
  function hh(a, b, c) {
    b = new P("/.info/" + b);
    c = J(c);
    var d = a.qe;
    d.Wc = d.Wc.L(b, c);
    c = a.ud.Sa(b, c);
    Xe(a.Z, b, c);
  }
  h.Db = function(a, b, c, d) {
    this.f("set", {
      path: a.toString(),
      value: b,
      Cg: c
    });
    var e = jh(this);
    b = J(b, c);
    var e = If(b, e),
        f = this.zd++,
        e = this.M.Fa(a, e, f, !0);
    Ue(this.Z, e);
    var g = this;
    this.S.put(a.toString(), b.N(!0), function(b, c) {
      var e = "ok" === b;
      e || z("set at " + a + " failed: " + b);
      e = g.M.Ea(f, !e);
      Xe(g.Z, a, e);
      mh(d, b, c);
    });
    e = nh(this, a);
    kh(this, e);
    Xe(this.Z, e, []);
  };
  h.update = function(a, b, c) {
    this.f("update", {
      path: a.toString(),
      value: b
    });
    var d = !0,
        e = jh(this),
        f = {};
    A(b, function(a, b) {
      d = !1;
      var c = J(a);
      f[b] = If(c, e);
    });
    if (d)
      kb("update() called with empty data.  Don't do anything."), mh(c, "ok");
    else {
      var g = this.zd++,
          k = this.M.ae(a, f, g);
      Ue(this.Z, k);
      var l = this;
      Ke(this.S, a.toString(), b, function(b, d) {
        x("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
        var e = "ok" === b;
        e || z("update at " + a + " failed: " + b);
        var e = l.M.Ea(g, !e),
            f = a;
        0 < e.length && (f = kh(l, a));
        Xe(l.Z, f, e);
        mh(c, b, d);
      });
      b = nh(this, a);
      kh(this, b);
      Xe(this.Z, a, []);
    }
  };
  function lh(a) {
    a.f("onDisconnectEvents");
    var b = jh(a),
        c = [];
    Re(Hf(a.fa, b), S, function(b, e) {
      c = c.concat(a.M.Sa(b, e));
      var f = nh(a, b);
      kh(a, f);
    });
    a.fa = new Pe;
    Xe(a.Z, S, c);
  }
  h.Ce = function(a, b) {
    var c = this;
    this.S.Ce(a.toString(), function(d, e) {
      "ok" === d && Qe(c.fa, a);
      mh(b, d, e);
    });
  };
  function oh(a, b, c, d) {
    var e = J(c);
    Fe(a.S, b.toString(), e.N(!0), function(c, g) {
      "ok" === c && a.fa.ic(b, e);
      mh(d, c, g);
    });
  }
  function ph(a, b, c, d, e) {
    var f = J(c, d);
    Fe(a.S, b.toString(), f.N(!0), function(c, d) {
      "ok" === c && a.fa.ic(b, f);
      mh(e, c, d);
    });
  }
  function qh(a, b, c, d) {
    var e = !0,
        f;
    for (f in c)
      e = !1;
    e ? (kb("onDisconnect().update() called with empty data.  Don't do anything."), mh(d, "ok")) : He(a.S, b.toString(), c, function(e, f) {
      if ("ok" === e)
        for (var l in c) {
          var m = J(c[l]);
          a.fa.ic(b.k(l), m);
        }
      mh(d, e, f);
    });
  }
  function Bc(a, b, c) {
    c = ".info" === G(b.path) ? a.ud.Jb(b, c) : a.M.Jb(b, c);
    Cc(a.Z, b.path, c);
  }
  h.tb = function() {
    this.S.tb();
  };
  h.kc = function() {
    this.S.kc();
  };
  h.Me = function(a) {
    if ("undefined" !== typeof console) {
      a ? (this.Nd || (this.Nd = new Hd(this.Qa)), a = this.Nd.get()) : a = this.Qa.get();
      var b = Ma(yd(a), function(a, b) {
        return Math.max(b.length, a);
      }, 0),
          c;
      for (c in a) {
        for (var d = a[c],
            e = c.length; e < b + 2; e++)
          c += " ";
        console.log(c + d);
      }
    }
  };
  h.Ne = function(a) {
    Gd(this.Qa, a);
    this.ug.uf[a] = !0;
  };
  h.f = function(a) {
    kb("r:" + this.S.id + ":", arguments);
  };
  function mh(a, b, c) {
    a && Fb(function() {
      if ("ok" == b)
        a(null);
      else {
        var d = (b || "error").toUpperCase(),
            e = d;
        c && (e += ": " + c);
        e = Error(e);
        e.code = d;
        a(e);
      }
    });
  }
  ;
  function rh(a, b, c, d, e) {
    function f() {}
    a.f("transaction on " + b);
    var g = new O(a, b);
    g.zb("value", f);
    c = {
      path: b,
      update: c,
      H: d,
      status: null,
      lf: hb(),
      Qe: e,
      rf: 0,
      Vd: function() {
        g.bc("value", f);
      },
      Yd: null,
      sa: null,
      fd: null,
      gd: null,
      hd: null
    };
    d = a.M.xa(b, void 0) || K;
    c.fd = d;
    d = c.update(d.N());
    if (n(d)) {
      Tb("transaction failed: Data returned ", d);
      c.status = 1;
      e = Gc(a.pc, b);
      var k = e.ta() || [];
      k.push(c);
      Hc(e, k);
      "object" === typeof d && null !== d && u(d, ".priority") ? (k = v(d, ".priority"), x(Rb(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) : k = (a.M.xa(b) || K).O().N();
      e = jh(a);
      d = J(d, k);
      e = If(d, e);
      c.gd = d;
      c.hd = e;
      c.sa = a.zd++;
      c = a.M.Fa(b, e, c.sa, c.Qe);
      Xe(a.Z, b, c);
      sh(a);
    } else
      c.Vd(), c.gd = null, c.hd = null, c.H && (a = new C(c.fd, new O(a, c.path), L), c.H(null, !1, a));
  }
  function sh(a, b) {
    var c = b || a.pc;
    b || th(a, c);
    if (null !== c.ta()) {
      var d = uh(a, c);
      x(0 < d.length, "Sending zero length transaction queue");
      Na(d, function(a) {
        return 1 === a.status;
      }) && vh(a, c.path(), d);
    } else
      c.pd() && c.ea(function(b) {
        sh(a, b);
      });
  }
  function vh(a, b, c) {
    for (var d = La(c, function(a) {
      return a.sa;
    }),
        e = a.M.xa(b, d) || K,
        d = e,
        e = e.hash(),
        f = 0; f < c.length; f++) {
      var g = c[f];
      x(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
      g.status = 2;
      g.rf++;
      var k = T(b, g.path),
          d = d.L(k, g.gd);
    }
    d = d.N(!0);
    a.S.put(b.toString(), d, function(d) {
      a.f("transaction put response", {
        path: b.toString(),
        status: d
      });
      var e = [];
      if ("ok" === d) {
        d = [];
        for (f = 0; f < c.length; f++) {
          c[f].status = 3;
          e = e.concat(a.M.Ea(c[f].sa));
          if (c[f].H) {
            var g = c[f].hd,
                k = new O(a, c[f].path);
            d.push(q(c[f].H, null, null, !0, new C(g, k, L)));
          }
          c[f].Vd();
        }
        th(a, Gc(a.pc, b));
        sh(a);
        Xe(a.Z, b, e);
        for (f = 0; f < d.length; f++)
          Fb(d[f]);
      } else {
        if ("datastale" === d)
          for (f = 0; f < c.length; f++)
            c[f].status = 4 === c[f].status ? 5 : 1;
        else
          for (z("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++)
            c[f].status = 5, c[f].Yd = d;
        kh(a, b);
      }
    }, e);
  }
  function kh(a, b) {
    var c = wh(a, b),
        d = c.path(),
        c = uh(a, c);
    xh(a, c, d);
    return d;
  }
  function xh(a, b, c) {
    if (0 !== b.length) {
      for (var d = [],
          e = [],
          f = La(b, function(a) {
            return a.sa;
          }),
          g = 0; g < b.length; g++) {
        var k = b[g],
            l = T(c, k.path),
            m = !1,
            r;
        x(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
        if (5 === k.status)
          m = !0, r = k.Yd, e = e.concat(a.M.Ea(k.sa, !0));
        else if (1 === k.status)
          if (25 <= k.rf)
            m = !0, r = "maxretry", e = e.concat(a.M.Ea(k.sa, !0));
          else {
            var s = a.M.xa(k.path, f) || K;
            k.fd = s;
            var y = b[g].update(s.N());
            n(y) ? (Tb("transaction failed: Data returned ", y), l = J(y), "object" === typeof y && null != y && u(y, ".priority") || (l = l.ib(s.O())), s = k.sa, y = jh(a), y = If(l, y), k.gd = l, k.hd = y, k.sa = a.zd++, Qa(f, s), e = e.concat(a.M.Fa(k.path, y, k.sa, k.Qe)), e = e.concat(a.M.Ea(s, !0))) : (m = !0, r = "nodata", e = e.concat(a.M.Ea(k.sa, !0)));
          }
        Xe(a.Z, c, e);
        e = [];
        m && (b[g].status = 3, setTimeout(b[g].Vd, Math.floor(0)), b[g].H && ("nodata" === r ? (k = new O(a, b[g].path), d.push(q(b[g].H, null, null, !1, new C(b[g].fd, k, L)))) : d.push(q(b[g].H, null, Error(r), !1, null))));
      }
      th(a, a.pc);
      for (g = 0; g < d.length; g++)
        Fb(d[g]);
      sh(a);
    }
  }
  function wh(a, b) {
    for (var c,
        d = a.pc; null !== (c = G(b)) && null === d.ta(); )
      d = Gc(d, c), b = R(b);
    return d;
  }
  function uh(a, b) {
    var c = [];
    yh(a, b, c);
    c.sort(function(a, b) {
      return a.lf - b.lf;
    });
    return c;
  }
  function yh(a, b, c) {
    var d = b.ta();
    if (null !== d)
      for (var e = 0; e < d.length; e++)
        c.push(d[e]);
    b.ea(function(b) {
      yh(a, b, c);
    });
  }
  function th(a, b) {
    var c = b.ta();
    if (c) {
      for (var d = 0,
          e = 0; e < c.length; e++)
        3 !== c[e].status && (c[d] = c[e], d++);
      c.length = d;
      Hc(b, 0 < c.length ? c : null);
    }
    b.ea(function(b) {
      th(a, b);
    });
  }
  function nh(a, b) {
    var c = wh(a, b).path(),
        d = Gc(a.pc, b);
    Kc(d, function(b) {
      zh(a, b);
    });
    zh(a, d);
    Jc(d, function(b) {
      zh(a, b);
    });
    return c;
  }
  function zh(a, b) {
    var c = b.ta();
    if (null !== c) {
      for (var d = [],
          e = [],
          f = -1,
          g = 0; g < c.length; g++)
        4 !== c[g].status && (2 === c[g].status ? (x(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].Yd = "set") : (x(1 === c[g].status, "Unexpected transaction status in abort"), c[g].Vd(), e = e.concat(a.M.Ea(c[g].sa, !0)), c[g].H && d.push(q(c[g].H, null, Error("set"), !1, null))));
      -1 === f ? Hc(b, null) : c.length = f + 1;
      Xe(a.Z, b.path(), e);
      for (g = 0; g < d.length; g++)
        Fb(d[g]);
    }
  }
  ;
  function Ah() {
    this.jc = {};
  }
  ca(Ah);
  Ah.prototype.tb = function() {
    for (var a in this.jc)
      this.jc[a].tb();
  };
  Ah.prototype.interrupt = Ah.prototype.tb;
  Ah.prototype.kc = function() {
    for (var a in this.jc)
      this.jc[a].kc();
  };
  Ah.prototype.resume = Ah.prototype.kc;
  function Bh(a) {
    var b = this;
    this.tc = a;
    this.Qd = "*";
    lf() ? this.Hc = this.sd = cf() : (this.Hc = window.opener, this.sd = window);
    if (!b.Hc)
      throw "Unable to find relay frame";
    df(this.sd, "message", q(this.cc, this));
    df(this.sd, "message", q(this.hf, this));
    try {
      Ch(this, {a: "ready"});
    } catch (c) {
      df(this.Hc, "load", function() {
        Ch(b, {a: "ready"});
      });
    }
    df(window, "unload", q(this.eg, this));
  }
  function Ch(a, b) {
    b = t(b);
    lf() ? a.Hc.doPost(b, a.Qd) : a.Hc.postMessage(b, a.Qd);
  }
  Bh.prototype.cc = function(a) {
    var b = this,
        c;
    try {
      c = ua(a.data);
    } catch (d) {}
    c && "request" === c.a && (ef(window, "message", this.cc), this.Qd = a.origin, this.tc && setTimeout(function() {
      b.tc(b.Qd, c.d, function(a, c) {
        b.If = !c;
        b.tc = void 0;
        Ch(b, {
          a: "response",
          d: a,
          forceKeepWindowOpen: c
        });
      });
    }, 0));
  };
  Bh.prototype.eg = function() {
    try {
      ef(this.sd, "message", this.hf);
    } catch (a) {}
    this.tc && (Ch(this, {
      a: "error",
      d: "unknown closed window"
    }), this.tc = void 0);
    try {
      window.close();
    } catch (b) {}
  };
  Bh.prototype.hf = function(a) {
    if (this.If && "die" === a.data)
      try {
        window.close();
      } catch (b) {}
  };
  var Y = {Rf: function() {
      Yd = Pd = !0;
    }};
  Y.forceLongPolling = Y.Rf;
  Y.Sf = function() {
    Zd = !0;
  };
  Y.forceWebSockets = Y.Sf;
  Y.rg = function(a, b) {
    a.g.S.Ke = b;
  };
  Y.setSecurityDebugCallback = Y.rg;
  Y.Me = function(a, b) {
    a.g.Me(b);
  };
  Y.stats = Y.Me;
  Y.Ne = function(a, b) {
    a.g.Ne(b);
  };
  Y.statsIncrementCounter = Y.Ne;
  Y.jd = function(a) {
    return a.g.jd;
  };
  Y.dataUpdateCount = Y.jd;
  Y.Vf = function(a, b) {
    a.g.re = b;
  };
  Y.interceptServerData = Y.Vf;
  Y.bg = function(a) {
    new Bh(a);
  };
  Y.onPopupOpen = Y.bg;
  Y.pg = function(a) {
    Ye = a;
  };
  Y.setAuthenticationServer = Y.pg;
  function Z(a, b) {
    this.Sc = a;
    this.Ca = b;
  }
  Z.prototype.cancel = function(a) {
    D("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
    F("Firebase.onDisconnect().cancel", 1, a, !0);
    this.Sc.Ce(this.Ca, a || null);
  };
  Z.prototype.cancel = Z.prototype.cancel;
  Z.prototype.remove = function(a) {
    D("Firebase.onDisconnect().remove", 0, 1, arguments.length);
    $b("Firebase.onDisconnect().remove", this.Ca);
    F("Firebase.onDisconnect().remove", 1, a, !0);
    oh(this.Sc, this.Ca, null, a);
  };
  Z.prototype.remove = Z.prototype.remove;
  Z.prototype.set = function(a, b) {
    D("Firebase.onDisconnect().set", 1, 2, arguments.length);
    $b("Firebase.onDisconnect().set", this.Ca);
    Sb("Firebase.onDisconnect().set", a, !1);
    F("Firebase.onDisconnect().set", 2, b, !0);
    oh(this.Sc, this.Ca, a, b);
  };
  Z.prototype.set = Z.prototype.set;
  Z.prototype.Db = function(a, b, c) {
    D("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
    $b("Firebase.onDisconnect().setWithPriority", this.Ca);
    Sb("Firebase.onDisconnect().setWithPriority", a, !1);
    Wb("Firebase.onDisconnect().setWithPriority", 2, b);
    F("Firebase.onDisconnect().setWithPriority", 3, c, !0);
    ph(this.Sc, this.Ca, a, b, c);
  };
  Z.prototype.setWithPriority = Z.prototype.Db;
  Z.prototype.update = function(a, b) {
    D("Firebase.onDisconnect().update", 1, 2, arguments.length);
    $b("Firebase.onDisconnect().update", this.Ca);
    if (ea(a)) {
      for (var c = {},
          d = 0; d < a.length; ++d)
        c["" + d] = a[d];
      a = c;
      z("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
    }
    Vb("Firebase.onDisconnect().update", a);
    F("Firebase.onDisconnect().update", 2, b, !0);
    qh(this.Sc, this.Ca, a, b);
  };
  Z.prototype.update = Z.prototype.update;
  var $ = {};
  $.rc = xe;
  $.DataConnection = $.rc;
  xe.prototype.tg = function(a, b) {
    this.wa("q", {p: a}, b);
  };
  $.rc.prototype.simpleListen = $.rc.prototype.tg;
  xe.prototype.Nf = function(a, b) {
    this.wa("echo", {d: a}, b);
  };
  $.rc.prototype.echo = $.rc.prototype.Nf;
  xe.prototype.interrupt = xe.prototype.tb;
  $.zf = ie;
  $.RealTimeConnection = $.zf;
  ie.prototype.sendRequest = ie.prototype.wa;
  ie.prototype.close = ie.prototype.close;
  $.Uf = function(a) {
    var b = xe.prototype.put;
    xe.prototype.put = function(c, d, e, f) {
      n(f) && (f = a());
      b.call(this, c, d, e, f);
    };
    return function() {
      xe.prototype.put = b;
    };
  };
  $.hijackHash = $.Uf;
  $.yf = Ca;
  $.ConnectionTarget = $.yf;
  $.Da = function(a) {
    return a.Da();
  };
  $.queryIdentifier = $.Da;
  $.Wf = function(a) {
    return a.g.S.ua;
  };
  $.listens = $.Wf;
  var Dh = function() {
    var a = 0,
        b = [];
    return function(c) {
      var d = c === a;
      a = c;
      for (var e = Array(8),
          f = 7; 0 <= f; f--)
        e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
      x(0 === c, "Cannot push at time == 0");
      c = e.join("");
      if (d) {
        for (f = 11; 0 <= f && 63 === b[f]; f--)
          b[f] = 0;
        b[f]++;
      } else
        for (f = 0; 12 > f; f++)
          b[f] = Math.floor(64 * Math.random());
      for (f = 0; 12 > f; f++)
        c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
      x(20 === c.length, "NextPushId: Length should be 20.");
      return c;
    };
  }();
  function O(a, b) {
    var c,
        d,
        e;
    if (a instanceof gh)
      c = a, d = b;
    else {
      D("new Firebase", 1, 2, arguments.length);
      d = ub(arguments[0]);
      c = d.vg;
      "firebase" === d.domain && tb(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
      c || tb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
      d.Cb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
      c = new Ca(d.host, d.Cb, c, "ws" === d.scheme || "wss" === d.scheme);
      d = new P(d.Pc);
      e = d.toString();
      var f;
      !(f = !p(c.host) || 0 === c.host.length || !Qb(c.yb)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(p(e) && 0 !== e.length && !Pb.test(e)));
      if (f)
        throw Error(E("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
      if (b)
        if (b instanceof Ah)
          e = b;
        else if (p(b))
          e = Ah.Qb(), c.Gd = b;
        else
          throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
      else
        e = Ah.Qb();
      f = c.toString();
      var g = v(e.jc, f);
      g || (g = new gh(c), e.jc[f] = g);
      c = g;
    }
    M.call(this, c, d, oc, !1);
  }
  na(O, M);
  var Eh = O,
      Fh = ["Firebase"],
      Gh = aa;
  Fh[0] in Gh || !Gh.execScript || Gh.execScript("var " + Fh[0]);
  for (var Hh; Fh.length && (Hh = Fh.shift()); )
    !Fh.length && n(Eh) ? Gh[Hh] = Eh : Gh = Gh[Hh] ? Gh[Hh] : Gh[Hh] = {};
  O.prototype.name = function() {
    z("Firebase.name() being deprecated. Please use Firebase.key() instead.");
    D("Firebase.name", 0, 0, arguments.length);
    return this.key();
  };
  O.prototype.name = O.prototype.name;
  O.prototype.key = function() {
    D("Firebase.key", 0, 0, arguments.length);
    var a;
    this.path.e() ? a = null : (a = this.path, a = a.ba < a.n.length ? a.n[a.n.length - 1] : null);
    return a;
  };
  O.prototype.key = O.prototype.key;
  O.prototype.k = function(a) {
    D("Firebase.child", 1, 1, arguments.length);
    if (ga(a))
      a = String(a);
    else if (!(a instanceof P))
      if (null === G(this.path)) {
        var b = a;
        b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
        Zb("Firebase.child", b);
      } else
        Zb("Firebase.child", a);
    return new O(this.g, this.path.k(a));
  };
  O.prototype.child = O.prototype.k;
  O.prototype.parent = function() {
    D("Firebase.parent", 0, 0, arguments.length);
    var a = this.path.parent();
    return null === a ? null : new O(this.g, a);
  };
  O.prototype.parent = O.prototype.parent;
  O.prototype.root = function() {
    D("Firebase.ref", 0, 0, arguments.length);
    for (var a = this; null !== a.parent(); )
      a = a.parent();
    return a;
  };
  O.prototype.root = O.prototype.root;
  O.prototype.toString = function() {
    D("Firebase.toString", 0, 0, arguments.length);
    var a;
    if (null === this.parent())
      a = this.g.toString();
    else {
      a = this.parent().toString() + "/";
      var b = this.key();
      a += encodeURIComponent(String(b));
    }
    return a;
  };
  O.prototype.toString = O.prototype.toString;
  O.prototype.set = function(a, b) {
    D("Firebase.set", 1, 2, arguments.length);
    $b("Firebase.set", this.path);
    Sb("Firebase.set", a, !1);
    F("Firebase.set", 2, b, !0);
    this.g.Db(this.path, a, null, b || null);
  };
  O.prototype.set = O.prototype.set;
  O.prototype.update = function(a, b) {
    D("Firebase.update", 1, 2, arguments.length);
    $b("Firebase.update", this.path);
    if (ea(a)) {
      for (var c = {},
          d = 0; d < a.length; ++d)
        c["" + d] = a[d];
      a = c;
      z("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
    }
    Vb("Firebase.update", a);
    F("Firebase.update", 2, b, !0);
    if (u(a, ".priority"))
      throw Error("update() does not currently support updating .priority.");
    this.g.update(this.path, a, b || null);
  };
  O.prototype.update = O.prototype.update;
  O.prototype.Db = function(a, b, c) {
    D("Firebase.setWithPriority", 2, 3, arguments.length);
    $b("Firebase.setWithPriority", this.path);
    Sb("Firebase.setWithPriority", a, !1);
    Wb("Firebase.setWithPriority", 2, b);
    F("Firebase.setWithPriority", 3, c, !0);
    if (".length" === this.key() || ".keys" === this.key())
      throw "Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
    this.g.Db(this.path, a, b, c || null);
  };
  O.prototype.setWithPriority = O.prototype.Db;
  O.prototype.remove = function(a) {
    D("Firebase.remove", 0, 1, arguments.length);
    $b("Firebase.remove", this.path);
    F("Firebase.remove", 1, a, !0);
    this.set(null, a);
  };
  O.prototype.remove = O.prototype.remove;
  O.prototype.transaction = function(a, b, c) {
    D("Firebase.transaction", 1, 3, arguments.length);
    $b("Firebase.transaction", this.path);
    F("Firebase.transaction", 1, a, !1);
    F("Firebase.transaction", 2, b, !0);
    if (n(c) && "boolean" != typeof c)
      throw Error(E("Firebase.transaction", 3, !0) + "must be a boolean.");
    if (".length" === this.key() || ".keys" === this.key())
      throw "Firebase.transaction failed: " + this.key() + " is a read-only object.";
    "undefined" === typeof c && (c = !0);
    rh(this.g, this.path, a, b || null, c);
  };
  O.prototype.transaction = O.prototype.transaction;
  O.prototype.qg = function(a, b) {
    D("Firebase.setPriority", 1, 2, arguments.length);
    $b("Firebase.setPriority", this.path);
    Wb("Firebase.setPriority", 1, a);
    F("Firebase.setPriority", 2, b, !0);
    this.g.Db(this.path.k(".priority"), a, null, b);
  };
  O.prototype.setPriority = O.prototype.qg;
  O.prototype.push = function(a, b) {
    D("Firebase.push", 0, 2, arguments.length);
    $b("Firebase.push", this.path);
    Sb("Firebase.push", a, !0);
    F("Firebase.push", 2, b, !0);
    var c = ih(this.g),
        c = Dh(c),
        c = this.k(c);
    "undefined" !== typeof a && null !== a && c.set(a, b);
    return c;
  };
  O.prototype.push = O.prototype.push;
  O.prototype.fb = function() {
    $b("Firebase.onDisconnect", this.path);
    return new Z(this.g, this.path);
  };
  O.prototype.onDisconnect = O.prototype.fb;
  O.prototype.T = function(a, b, c) {
    z("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
    D("Firebase.auth", 1, 3, arguments.length);
    ac("Firebase.auth", a);
    F("Firebase.auth", 2, b, !0);
    F("Firebase.auth", 3, b, !0);
    zf(this.g.T, a, {}, {remember: "none"}, b, c);
  };
  O.prototype.auth = O.prototype.T;
  O.prototype.Pe = function(a) {
    D("Firebase.unauth", 0, 1, arguments.length);
    F("Firebase.unauth", 1, a, !0);
    Af(this.g.T, a);
  };
  O.prototype.unauth = O.prototype.Pe;
  O.prototype.ne = function() {
    D("Firebase.getAuth", 0, 0, arguments.length);
    return this.g.T.ne();
  };
  O.prototype.getAuth = O.prototype.ne;
  O.prototype.ag = function(a, b) {
    D("Firebase.onAuth", 1, 2, arguments.length);
    F("Firebase.onAuth", 1, a, !1);
    Nb("Firebase.onAuth", 2, b);
    this.g.T.zb("auth_status", a, b);
  };
  O.prototype.onAuth = O.prototype.ag;
  O.prototype.Zf = function(a, b) {
    D("Firebase.offAuth", 1, 2, arguments.length);
    F("Firebase.offAuth", 1, a, !1);
    Nb("Firebase.offAuth", 2, b);
    this.g.T.bc("auth_status", a, b);
  };
  O.prototype.offAuth = O.prototype.Zf;
  O.prototype.Df = function(a, b, c) {
    D("Firebase.authWithCustomToken", 2, 3, arguments.length);
    ac("Firebase.authWithCustomToken", a);
    F("Firebase.authWithCustomToken", 2, b, !1);
    cc("Firebase.authWithCustomToken", 3, c, !0);
    zf(this.g.T, a, {}, c || {}, b);
  };
  O.prototype.authWithCustomToken = O.prototype.Df;
  O.prototype.Ef = function(a, b, c) {
    D("Firebase.authWithOAuthPopup", 2, 3, arguments.length);
    bc("Firebase.authWithOAuthPopup", 1, a);
    F("Firebase.authWithOAuthPopup", 2, b, !1);
    cc("Firebase.authWithOAuthPopup", 3, c, !0);
    Ef(this.g.T, a, c, b);
  };
  O.prototype.authWithOAuthPopup = O.prototype.Ef;
  O.prototype.Ff = function(a, b, c) {
    D("Firebase.authWithOAuthRedirect", 2, 3, arguments.length);
    bc("Firebase.authWithOAuthRedirect", 1, a);
    F("Firebase.authWithOAuthRedirect", 2, b, !1);
    cc("Firebase.authWithOAuthRedirect", 3, c, !0);
    var d = this.g.T;
    Cf(d);
    var e = [sf],
        f = af(c);
    "anonymous" === a || "firebase" === a ? B(b, V("TRANSPORT_UNAVAILABLE")) : (Ba.set("redirect_client_options", f.ed), Df(d, e, "/auth/" + a, f, b));
  };
  O.prototype.authWithOAuthRedirect = O.prototype.Ff;
  O.prototype.Gf = function(a, b, c, d) {
    D("Firebase.authWithOAuthToken", 3, 4, arguments.length);
    bc("Firebase.authWithOAuthToken", 1, a);
    F("Firebase.authWithOAuthToken", 3, c, !1);
    cc("Firebase.authWithOAuthToken", 4, d, !0);
    p(b) ? (bc("Firebase.authWithOAuthToken", 2, b), Bf(this.g.T, a + "/token", {access_token: b}, d, c)) : (cc("Firebase.authWithOAuthToken", 2, b, !1), Bf(this.g.T, a + "/token", b, d, c));
  };
  O.prototype.authWithOAuthToken = O.prototype.Gf;
  O.prototype.Cf = function(a, b) {
    D("Firebase.authAnonymously", 1, 2, arguments.length);
    F("Firebase.authAnonymously", 1, a, !1);
    cc("Firebase.authAnonymously", 2, b, !0);
    Bf(this.g.T, "anonymous", {}, b, a);
  };
  O.prototype.authAnonymously = O.prototype.Cf;
  O.prototype.Hf = function(a, b, c) {
    D("Firebase.authWithPassword", 2, 3, arguments.length);
    cc("Firebase.authWithPassword", 1, a, !1);
    dc("Firebase.authWithPassword", a, "email");
    dc("Firebase.authWithPassword", a, "password");
    F("Firebase.authAnonymously", 2, b, !1);
    cc("Firebase.authAnonymously", 3, c, !0);
    Bf(this.g.T, "password", a, c, b);
  };
  O.prototype.authWithPassword = O.prototype.Hf;
  O.prototype.je = function(a, b) {
    D("Firebase.createUser", 2, 2, arguments.length);
    cc("Firebase.createUser", 1, a, !1);
    dc("Firebase.createUser", a, "email");
    dc("Firebase.createUser", a, "password");
    F("Firebase.createUser", 2, b, !1);
    this.g.T.je(a, b);
  };
  O.prototype.createUser = O.prototype.je;
  O.prototype.Ie = function(a, b) {
    D("Firebase.removeUser", 2, 2, arguments.length);
    cc("Firebase.removeUser", 1, a, !1);
    dc("Firebase.removeUser", a, "email");
    dc("Firebase.removeUser", a, "password");
    F("Firebase.removeUser", 2, b, !1);
    this.g.T.Ie(a, b);
  };
  O.prototype.removeUser = O.prototype.Ie;
  O.prototype.ee = function(a, b) {
    D("Firebase.changePassword", 2, 2, arguments.length);
    cc("Firebase.changePassword", 1, a, !1);
    dc("Firebase.changePassword", a, "email");
    dc("Firebase.changePassword", a, "oldPassword");
    dc("Firebase.changePassword", a, "newPassword");
    F("Firebase.changePassword", 2, b, !1);
    this.g.T.ee(a, b);
  };
  O.prototype.changePassword = O.prototype.ee;
  O.prototype.Je = function(a, b) {
    D("Firebase.resetPassword", 2, 2, arguments.length);
    cc("Firebase.resetPassword", 1, a, !1);
    dc("Firebase.resetPassword", a, "email");
    F("Firebase.resetPassword", 2, b, !1);
    this.g.T.Je(a, b);
  };
  O.prototype.resetPassword = O.prototype.Je;
  O.goOffline = function() {
    D("Firebase.goOffline", 0, 0, arguments.length);
    Ah.Qb().tb();
  };
  O.goOnline = function() {
    D("Firebase.goOnline", 0, 0, arguments.length);
    Ah.Qb().kc();
  };
  function qb(a, b) {
    x(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
    !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? ob = q(console.log, console) : "object" === typeof console.log && (ob = function(a) {
      console.log(a);
    })), b && Ba.set("logging_enabled", !0)) : a ? ob = a : (ob = null, Ba.remove("logging_enabled"));
  }
  O.enableLogging = qb;
  O.ServerValue = {TIMESTAMP: {".sv": "timestamp"}};
  O.SDK_VERSION = "2.0.5";
  O.INTERNAL = Y;
  O.Context = Ah;
  O.TEST_ACCESS = $;
})();



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});


System.register("github:firebase/angularfire@0.9.0/angularfire", ["firebase","angular"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["firebase","angular"]);
  (function() {
"format global";
"deps firebase";
"deps angular";
(function(exports) {
  "use strict";
  angular.module("firebase", []).value("Firebase", exports.Firebase).value('firebaseBatchDelay', 50);
})(window);
(function() {
  'use strict';
  angular.module('firebase').factory('$FirebaseArray', ["$log", "$firebaseUtils", function($log, $firebaseUtils) {
    function FirebaseArray($firebase, destroyFn, readyPromise) {
      var self = this;
      this._observers = [];
      this.$list = [];
      this._inst = $firebase;
      this._promise = readyPromise;
      this._destroyFn = destroyFn;
      this._indexCache = {};
      $firebaseUtils.getPublicMethods(self, function(fn, key) {
        self.$list[key] = fn.bind(self);
      });
      return this.$list;
    }
    FirebaseArray.prototype = {
      $add: function(data) {
        this._assertNotDestroyed('$add');
        return this.$inst().$push($firebaseUtils.toJSON(data));
      },
      $save: function(indexOrItem) {
        this._assertNotDestroyed('$save');
        var self = this;
        var item = self._resolveItem(indexOrItem);
        var key = self.$keyAt(item);
        if (key !== null) {
          return self.$inst().$set(key, $firebaseUtils.toJSON(item)).then(function(ref) {
            self.$$notify('child_changed', key);
            return ref;
          });
        } else {
          return $firebaseUtils.reject('Invalid record; could determine its key: ' + indexOrItem);
        }
      },
      $remove: function(indexOrItem) {
        this._assertNotDestroyed('$remove');
        var key = this.$keyAt(indexOrItem);
        if (key !== null) {
          return this.$inst().$remove(key);
        } else {
          return $firebaseUtils.reject('Invalid record; could not find key: ' + indexOrItem);
        }
      },
      $keyAt: function(indexOrItem) {
        var item = this._resolveItem(indexOrItem);
        return this.$$getKey(item);
      },
      $indexFor: function(key) {
        var self = this;
        var cache = self._indexCache;
        if (!cache.hasOwnProperty(key) || self.$keyAt(cache[key]) !== key) {
          var pos = self.$list.findIndex(function(rec) {
            return self.$$getKey(rec) === key;
          });
          if (pos !== -1) {
            cache[key] = pos;
          }
        }
        return cache.hasOwnProperty(key) ? cache[key] : -1;
      },
      $loaded: function(resolve, reject) {
        var promise = this._promise;
        if (arguments.length) {
          promise = promise.then.call(promise, resolve, reject);
        }
        return promise;
      },
      $inst: function() {
        return this._inst;
      },
      $watch: function(cb, context) {
        var list = this._observers;
        list.push([cb, context]);
        return function() {
          var i = list.findIndex(function(parts) {
            return parts[0] === cb && parts[1] === context;
          });
          if (i > -1) {
            list.splice(i, 1);
          }
        };
      },
      $destroy: function(err) {
        if (!this._isDestroyed) {
          this._isDestroyed = true;
          this.$list.length = 0;
          $log.debug('destroy called for FirebaseArray: ' + this.$inst().$ref().toString());
          this._destroyFn(err);
        }
      },
      $getRecord: function(key) {
        var i = this.$indexFor(key);
        return i > -1 ? this.$list[i] : null;
      },
      $$added: function(snap) {
        var i = this.$indexFor($firebaseUtils.getKey(snap));
        if (i === -1) {
          var rec = snap.val();
          if (!angular.isObject(rec)) {
            rec = {$value: rec};
          }
          rec.$id = $firebaseUtils.getKey(snap);
          rec.$priority = snap.getPriority();
          $firebaseUtils.applyDefaults(rec, this.$$defaults);
          return rec;
        }
        return false;
      },
      $$removed: function(snap) {
        return this.$indexFor($firebaseUtils.getKey(snap)) > -1;
      },
      $$updated: function(snap) {
        var changed = false;
        var rec = this.$getRecord($firebaseUtils.getKey(snap));
        if (angular.isObject(rec)) {
          changed = $firebaseUtils.updateRec(rec, snap);
          $firebaseUtils.applyDefaults(rec, this.$$defaults);
        }
        return changed;
      },
      $$moved: function(snap) {
        var rec = this.$getRecord($firebaseUtils.getKey(snap));
        if (angular.isObject(rec)) {
          rec.$priority = snap.getPriority();
          return true;
        }
        return false;
      },
      $$error: function(err) {
        $log.error(err);
        this.$destroy(err);
      },
      $$getKey: function(rec) {
        return angular.isObject(rec) ? rec.$id : null;
      },
      $$process: function(event, rec, prevChild) {
        var key = this.$$getKey(rec);
        var changed = false;
        var curPos;
        switch (event) {
          case 'child_added':
            curPos = this.$indexFor(key);
            break;
          case 'child_moved':
            curPos = this.$indexFor(key);
            this._spliceOut(key);
            break;
          case 'child_removed':
            changed = this._spliceOut(key) !== null;
            break;
          case 'child_changed':
            changed = true;
            break;
          default:
            throw new Error('Invalid event type: ' + event);
        }
        if (angular.isDefined(curPos)) {
          changed = this._addAfter(rec, prevChild) !== curPos;
        }
        if (changed) {
          this.$$notify(event, key, prevChild);
        }
        return changed;
      },
      $$notify: function(event, key, prevChild) {
        var eventData = {
          event: event,
          key: key
        };
        if (angular.isDefined(prevChild)) {
          eventData.prevChild = prevChild;
        }
        angular.forEach(this._observers, function(parts) {
          parts[0].call(parts[1], eventData);
        });
      },
      _addAfter: function(rec, prevChild) {
        var i;
        if (prevChild === null) {
          i = 0;
        } else {
          i = this.$indexFor(prevChild) + 1;
          if (i === 0) {
            i = this.$list.length;
          }
        }
        this.$list.splice(i, 0, rec);
        this._indexCache[this.$$getKey(rec)] = i;
        return i;
      },
      _spliceOut: function(key) {
        var i = this.$indexFor(key);
        if (i > -1) {
          delete this._indexCache[key];
          return this.$list.splice(i, 1)[0];
        }
        return null;
      },
      _resolveItem: function(indexOrItem) {
        var list = this.$list;
        if (angular.isNumber(indexOrItem) && indexOrItem >= 0 && list.length >= indexOrItem) {
          return list[indexOrItem];
        } else if (angular.isObject(indexOrItem)) {
          var key = this.$$getKey(indexOrItem);
          var rec = this.$getRecord(key);
          return rec === indexOrItem ? rec : null;
        }
        return null;
      },
      _assertNotDestroyed: function(method) {
        if (this._isDestroyed) {
          throw new Error('Cannot call ' + method + ' method on a destroyed $FirebaseArray object');
        }
      }
    };
    FirebaseArray.$extendFactory = function(ChildClass, methods) {
      if (arguments.length === 1 && angular.isObject(ChildClass)) {
        methods = ChildClass;
        ChildClass = function() {
          return FirebaseArray.apply(this, arguments);
        };
      }
      return $firebaseUtils.inherit(ChildClass, FirebaseArray, methods);
    };
    return FirebaseArray;
  }]);
})();
(function() {
  'use strict';
  var FirebaseAuth;
  angular.module('firebase').factory('$firebaseAuth', ['$q', function($q) {
    return function(ref) {
      var auth = new FirebaseAuth($q, ref);
      return auth.construct();
    };
  }]);
  FirebaseAuth = function($q, ref) {
    this._q = $q;
    if (typeof ref === 'string') {
      throw new Error('Please provide a Firebase reference instead of a URL when creating a `$firebaseAuth` object.');
    }
    this._ref = ref;
  };
  FirebaseAuth.prototype = {
    construct: function() {
      this._object = {
        $authWithCustomToken: this.authWithCustomToken.bind(this),
        $authAnonymously: this.authAnonymously.bind(this),
        $authWithPassword: this.authWithPassword.bind(this),
        $authWithOAuthPopup: this.authWithOAuthPopup.bind(this),
        $authWithOAuthRedirect: this.authWithOAuthRedirect.bind(this),
        $authWithOAuthToken: this.authWithOAuthToken.bind(this),
        $unauth: this.unauth.bind(this),
        $onAuth: this.onAuth.bind(this),
        $getAuth: this.getAuth.bind(this),
        $requireAuth: this.requireAuth.bind(this),
        $waitForAuth: this.waitForAuth.bind(this),
        $createUser: this.createUser.bind(this),
        $changePassword: this.changePassword.bind(this),
        $removeUser: this.removeUser.bind(this),
        $sendPasswordResetEmail: this.sendPasswordResetEmail.bind(this)
      };
      return this._object;
    },
    _onLoginHandler: function(deferred, error, authData) {
      if (error !== null) {
        deferred.reject(error);
      } else {
        deferred.resolve(authData);
      }
    },
    authWithCustomToken: function(authToken, options) {
      var deferred = this._q.defer();
      this._ref.authWithCustomToken(authToken, this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    authAnonymously: function(options) {
      var deferred = this._q.defer();
      this._ref.authAnonymously(this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    authWithPassword: function(credentials, options) {
      var deferred = this._q.defer();
      this._ref.authWithPassword(credentials, this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    authWithOAuthPopup: function(provider, options) {
      var deferred = this._q.defer();
      this._ref.authWithOAuthPopup(provider, this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    authWithOAuthRedirect: function(provider, options) {
      var deferred = this._q.defer();
      this._ref.authWithOAuthRedirect(provider, this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    authWithOAuthToken: function(provider, credentials, options) {
      var deferred = this._q.defer();
      this._ref.authWithOAuthToken(provider, credentials, this._onLoginHandler.bind(this, deferred), options);
      return deferred.promise;
    },
    unauth: function() {
      if (this.getAuth() !== null) {
        this._ref.unauth();
      }
    },
    onAuth: function(callback, context) {
      var self = this;
      this._ref.onAuth(callback, context);
      return function() {
        self._ref.offAuth(callback, context);
      };
    },
    getAuth: function() {
      return this._ref.getAuth();
    },
    _routerMethodOnAuthCallback: function(deferred, rejectIfAuthDataIsNull, authData) {
      if (authData !== null) {
        deferred.resolve(authData);
      } else if (rejectIfAuthDataIsNull) {
        deferred.reject("AUTH_REQUIRED");
      } else {
        deferred.resolve(null);
      }
      this._ref.offAuth(this._routerMethodOnAuthCallback);
    },
    requireAuth: function() {
      var deferred = this._q.defer();
      this._ref.onAuth(this._routerMethodOnAuthCallback.bind(this, deferred, true));
      return deferred.promise;
    },
    waitForAuth: function() {
      var deferred = this._q.defer();
      this._ref.onAuth(this._routerMethodOnAuthCallback.bind(this, deferred, false));
      return deferred.promise;
    },
    createUser: function(email, password) {
      var deferred = this._q.defer();
      this._ref.createUser({
        email: email,
        password: password
      }, function(error) {
        if (error !== null) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },
    changePassword: function(email, oldPassword, newPassword) {
      var deferred = this._q.defer();
      this._ref.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(error) {
        if (error !== null) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },
    removeUser: function(email, password) {
      var deferred = this._q.defer();
      this._ref.removeUser({
        email: email,
        password: password
      }, function(error) {
        if (error !== null) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },
    sendPasswordResetEmail: function(email) {
      var deferred = this._q.defer();
      this._ref.resetPassword({email: email}, function(error) {
        if (error !== null) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    }
  };
})();
(function() {
  'use strict';
  angular.module('firebase').factory('$FirebaseObject', ['$parse', '$firebaseUtils', '$log', '$interval', function($parse, $firebaseUtils, $log, $interval) {
    function FirebaseObject($firebase, destroyFn, readyPromise) {
      this.$$conf = {
        promise: readyPromise,
        inst: $firebase,
        binding: new ThreeWayBinding(this),
        destroyFn: destroyFn,
        listeners: []
      };
      Object.defineProperty(this, '$$conf', {value: this.$$conf});
      this.$id = $firebaseUtils.getKey($firebase.$ref().ref());
      this.$priority = null;
      $firebaseUtils.applyDefaults(this, this.$$defaults);
    }
    FirebaseObject.prototype = {
      $save: function() {
        var self = this;
        return self.$inst().$set($firebaseUtils.toJSON(self)).then(function(ref) {
          self.$$notify();
          return ref;
        });
      },
      $remove: function() {
        var self = this;
        $firebaseUtils.trimKeys(this, {});
        this.$value = null;
        return self.$inst().$remove(self.$id).then(function(ref) {
          self.$$notify();
          return ref;
        });
      },
      $loaded: function(resolve, reject) {
        var promise = this.$$conf.promise;
        if (arguments.length) {
          promise = promise.then.call(promise, resolve, reject);
        }
        return promise;
      },
      $inst: function() {
        return this.$$conf.inst;
      },
      $bindTo: function(scope, varName) {
        var self = this;
        return self.$loaded().then(function() {
          return self.$$conf.binding.bindTo(scope, varName);
        });
      },
      $watch: function(cb, context) {
        var list = this.$$conf.listeners;
        list.push([cb, context]);
        return function() {
          var i = list.findIndex(function(parts) {
            return parts[0] === cb && parts[1] === context;
          });
          if (i > -1) {
            list.splice(i, 1);
          }
        };
      },
      $destroy: function(err) {
        var self = this;
        if (!self.$isDestroyed) {
          self.$isDestroyed = true;
          self.$$conf.binding.destroy();
          $firebaseUtils.each(self, function(v, k) {
            delete self[k];
          });
          self.$$conf.destroyFn(err);
        }
      },
      $$updated: function(snap) {
        var changed = $firebaseUtils.updateRec(this, snap);
        $firebaseUtils.applyDefaults(this, this.$$defaults);
        return changed;
      },
      $$error: function(err) {
        $log.error(err);
        this.$destroy(err);
      },
      $$scopeUpdated: function(newData) {
        return this.$inst().$set($firebaseUtils.toJSON(newData));
      },
      $$notify: function() {
        var self = this,
            list = this.$$conf.listeners.slice();
        angular.forEach(list, function(parts) {
          parts[0].call(parts[1], {
            event: 'value',
            key: self.$id
          });
        });
      },
      forEach: function(iterator, context) {
        return $firebaseUtils.each(this, iterator, context);
      }
    };
    FirebaseObject.$extendFactory = function(ChildClass, methods) {
      if (arguments.length === 1 && angular.isObject(ChildClass)) {
        methods = ChildClass;
        ChildClass = function() {
          FirebaseObject.apply(this, arguments);
        };
      }
      return $firebaseUtils.inherit(ChildClass, FirebaseObject, methods);
    };
    function ThreeWayBinding(rec) {
      this.subs = [];
      this.scope = null;
      this.key = null;
      this.rec = rec;
    }
    ThreeWayBinding.prototype = {
      assertNotBound: function(varName) {
        if (this.scope) {
          var msg = 'Cannot bind to ' + varName + ' because this instance is already bound to ' + this.key + '; one binding per instance ' + '(call unbind method or create another $firebase instance)';
          $log.error(msg);
          return $firebaseUtils.reject(msg);
        }
      },
      bindTo: function(scope, varName) {
        function _bind(self) {
          var sending = false;
          var parsed = $parse(varName);
          var rec = self.rec;
          self.scope = scope;
          self.varName = varName;
          function equals(rec) {
            var parsed = getScope();
            var newData = $firebaseUtils.scopeData(rec);
            return angular.equals(parsed, newData) && parsed.$priority === rec.$priority && parsed.$value === rec.$value;
          }
          function getScope() {
            return $firebaseUtils.scopeData(parsed(scope));
          }
          function setScope(rec) {
            parsed.assign(scope, $firebaseUtils.scopeData(rec));
          }
          var scopeUpdated = function() {
            var send = $firebaseUtils.debounce(function() {
              rec.$$scopeUpdated(getScope())['finally'](function() {
                sending = false;
              });
            }, 50, 500);
            if (!equals(rec)) {
              sending = true;
              send();
            }
          };
          var recUpdated = function() {
            if (!sending && !equals(rec)) {
              setScope(rec);
            }
          };
          function checkMetaVars() {
            var dat = parsed(scope);
            if (dat.$value !== rec.$value || dat.$priority !== rec.$priority) {
              scopeUpdated();
            }
          }
          (function() {
            var counterKey = '_firebaseCounterForVar' + varName;
            scope[counterKey] = 0;
            var to = $interval(function() {
              scope[counterKey]++;
            }, 51, 0, false);
            self.subs.push(scope.$watch(counterKey, checkMetaVars));
            self.subs.push(function() {
              $interval.cancel(to);
              delete scope[counterKey];
            });
          })();
          setScope(rec);
          self.subs.push(scope.$on('$destroy', self.unbind.bind(self)));
          self.subs.push(scope.$watch(varName, scopeUpdated, true));
          self.subs.push(rec.$watch(recUpdated));
          return self.unbind.bind(self);
        }
        return this.assertNotBound(varName) || _bind(this);
      },
      unbind: function() {
        if (this.scope) {
          angular.forEach(this.subs, function(unbind) {
            unbind();
          });
          this.subs = [];
          this.scope = null;
          this.key = null;
        }
      },
      destroy: function() {
        this.unbind();
        this.rec = null;
      }
    };
    return FirebaseObject;
  }]);
})();
(function() {
  'use strict';
  angular.module("firebase").factory("$firebase", ["$firebaseUtils", "$firebaseConfig", function($firebaseUtils, $firebaseConfig) {
    function AngularFire(ref, config) {
      if (!(this instanceof AngularFire)) {
        return new AngularFire(ref, config);
      }
      this._config = $firebaseConfig(config);
      this._ref = ref;
      this._arraySync = null;
      this._objectSync = null;
      this._assertValidConfig(ref, this._config);
    }
    AngularFire.prototype = {
      $ref: function() {
        return this._ref;
      },
      $push: function(data) {
        var def = $firebaseUtils.defer();
        var ref = this._ref.ref().push();
        var done = this._handle(def, ref);
        if (arguments.length > 0) {
          ref.set(data, done);
        } else {
          done();
        }
        return def.promise;
      },
      $set: function(key, data) {
        var ref = this._ref;
        var def = $firebaseUtils.defer();
        if (arguments.length > 1) {
          ref = ref.ref().child(key);
        } else {
          data = key;
        }
        if (angular.isFunction(ref.set) || !angular.isObject(data)) {
          ref.ref().set(data, this._handle(def, ref));
        } else {
          var dataCopy = angular.extend({}, data);
          ref.once('value', function(snap) {
            snap.forEach(function(ss) {
              if (!dataCopy.hasOwnProperty($firebaseUtils.getKey(ss))) {
                dataCopy[$firebaseUtils.getKey(ss)] = null;
              }
            });
            ref.ref().update(dataCopy, this._handle(def, ref));
          }, this);
        }
        return def.promise;
      },
      $remove: function(key) {
        var ref = this._ref,
            self = this,
            promise;
        var def = $firebaseUtils.defer();
        if (arguments.length > 0) {
          ref = ref.ref().child(key);
        }
        if (angular.isFunction(ref.remove)) {
          ref.remove(self._handle(def, ref));
          promise = def.promise;
        } else {
          var promises = [];
          ref.once('value', function(snap) {
            snap.forEach(function(ss) {
              var d = $firebaseUtils.defer();
              promises.push(d);
              ss.ref().remove(self._handle(d, ss.ref()));
            }, self);
          });
          promise = $firebaseUtils.allPromises(promises).then(function() {
            return ref;
          });
        }
        return promise;
      },
      $update: function(key, data) {
        var ref = this._ref.ref();
        var def = $firebaseUtils.defer();
        if (arguments.length > 1) {
          ref = ref.child(key);
        } else {
          data = key;
        }
        ref.update(data, this._handle(def, ref));
        return def.promise;
      },
      $transaction: function(key, valueFn, applyLocally) {
        var ref = this._ref.ref();
        if (angular.isFunction(key)) {
          applyLocally = valueFn;
          valueFn = key;
        } else {
          ref = ref.child(key);
        }
        applyLocally = !!applyLocally;
        var def = $firebaseUtils.defer();
        ref.transaction(valueFn, function(err, committed, snap) {
          if (err) {
            def.reject(err);
          } else {
            def.resolve(committed ? snap : null);
          }
        }, applyLocally);
        return def.promise;
      },
      $asObject: function() {
        if (!this._objectSync || this._objectSync.isDestroyed) {
          this._objectSync = new SyncObject(this, this._config.objectFactory);
        }
        return this._objectSync.getObject();
      },
      $asArray: function() {
        if (!this._arraySync || this._arraySync.isDestroyed) {
          this._arraySync = new SyncArray(this, this._config.arrayFactory);
        }
        return this._arraySync.getArray();
      },
      _handle: function(def) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function(err) {
          if (err) {
            def.reject(err);
          } else {
            def.resolve.apply(def, args);
          }
        };
      },
      _assertValidConfig: function(ref, cnf) {
        $firebaseUtils.assertValidRef(ref, 'Must pass a valid Firebase reference ' + 'to $firebase (not a string or URL)');
        if (!angular.isFunction(cnf.arrayFactory)) {
          throw new Error('config.arrayFactory must be a valid function');
        }
        if (!angular.isFunction(cnf.objectFactory)) {
          throw new Error('config.objectFactory must be a valid function');
        }
      }
    };
    function SyncArray($inst, ArrayFactory) {
      function destroy(err) {
        self.isDestroyed = true;
        var ref = $inst.$ref();
        ref.off('child_added', created);
        ref.off('child_moved', moved);
        ref.off('child_changed', updated);
        ref.off('child_removed', removed);
        array = null;
        resolve(err || 'destroyed');
      }
      function init() {
        var ref = $inst.$ref();
        ref.on('child_added', created, error);
        ref.on('child_moved', moved, error);
        ref.on('child_changed', updated, error);
        ref.on('child_removed', removed, error);
        ref.once('value', function() {
          resolve(null);
        }, resolve);
      }
      function _resolveFn(err) {
        if (def) {
          if (err) {
            def.reject(err);
          } else {
            def.resolve(array);
          }
          def = null;
        }
      }
      function assertArray(arr) {
        if (!angular.isArray(arr)) {
          var type = Object.prototype.toString.call(arr);
          throw new Error('arrayFactory must return a valid array that passes ' + 'angular.isArray and Array.isArray, but received "' + type + '"');
        }
      }
      var def = $firebaseUtils.defer();
      var array = new ArrayFactory($inst, destroy, def.promise);
      var batch = $firebaseUtils.batch();
      var created = batch(function(snap, prevChild) {
        var rec = array.$$added(snap, prevChild);
        if (rec) {
          array.$$process('child_added', rec, prevChild);
        }
      });
      var updated = batch(function(snap) {
        var rec = array.$getRecord($firebaseUtils.getKey(snap));
        if (rec) {
          var changed = array.$$updated(snap);
          if (changed) {
            array.$$process('child_changed', rec);
          }
        }
      });
      var moved = batch(function(snap, prevChild) {
        var rec = array.$getRecord($firebaseUtils.getKey(snap));
        if (rec) {
          var confirmed = array.$$moved(snap, prevChild);
          if (confirmed) {
            array.$$process('child_moved', rec, prevChild);
          }
        }
      });
      var removed = batch(function(snap) {
        var rec = array.$getRecord($firebaseUtils.getKey(snap));
        if (rec) {
          var confirmed = array.$$removed(snap);
          if (confirmed) {
            array.$$process('child_removed', rec);
          }
        }
      });
      var error = batch(array.$$error, array);
      var resolve = batch(_resolveFn);
      var self = this;
      self.isDestroyed = false;
      self.getArray = function() {
        return array;
      };
      assertArray(array);
      init();
    }
    function SyncObject($inst, ObjectFactory) {
      function destroy(err) {
        self.isDestroyed = true;
        ref.off('value', applyUpdate);
        obj = null;
        resolve(err || 'destroyed');
      }
      function init() {
        ref.on('value', applyUpdate, error);
        ref.once('value', function() {
          resolve(null);
        }, resolve);
      }
      function _resolveFn(err) {
        if (def) {
          if (err) {
            def.reject(err);
          } else {
            def.resolve(obj);
          }
          def = null;
        }
      }
      var def = $firebaseUtils.defer();
      var obj = new ObjectFactory($inst, destroy, def.promise);
      var ref = $inst.$ref();
      var batch = $firebaseUtils.batch();
      var applyUpdate = batch(function(snap) {
        var changed = obj.$$updated(snap);
        if (changed) {
          obj.$$notify();
        }
      });
      var error = batch(obj.$$error, obj);
      var resolve = batch(_resolveFn);
      var self = this;
      self.isDestroyed = false;
      self.getObject = function() {
        return obj;
      };
      init();
    }
    return AngularFire;
  }]);
})();
'use strict';
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    if (this === undefined || this === null) {
      throw new TypeError("'this' is null or not defined");
    }
    var length = this.length >>> 0;
    fromIndex = +fromIndex || 0;
    if (Math.abs(fromIndex) === Infinity) {
      fromIndex = 0;
    }
    if (fromIndex < 0) {
      fromIndex += length;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }
    for (; fromIndex < length; fromIndex++) {
      if (this[fromIndex] === searchElement) {
        return fromIndex;
      }
    }
    return -1;
  };
}
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return i;
          }
        }
      }
      return -1;
    }
  });
}
if (typeof Object.create != 'function') {
  (function() {
    var F = function() {};
    Object.create = function(o) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (o === null) {
        throw new Error('Cannot set a null [[Prototype]]');
      }
      if (typeof o != 'object') {
        throw new TypeError('Argument must be an object');
      }
      F.prototype = o;
      return new F();
    };
  })();
}
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;
    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      var result = [],
          prop,
          i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
if (typeof Object.getPrototypeOf !== "function") {
  if (typeof"test".__proto__ === "object") {
    Object.getPrototypeOf = function(object) {
      return object.__proto__;
    };
  } else {
    Object.getPrototypeOf = function(object) {
      return object.constructor.prototype;
    };
  }
}
(function() {
  'use strict';
  angular.module('firebase').factory('$firebaseConfig', ["$FirebaseArray", "$FirebaseObject", "$injector", function($FirebaseArray, $FirebaseObject, $injector) {
    return function(configOpts) {
      var opts = angular.extend({}, configOpts);
      if (typeof opts.objectFactory === 'string') {
        opts.objectFactory = $injector.get(opts.objectFactory);
      }
      if (typeof opts.arrayFactory === 'string') {
        opts.arrayFactory = $injector.get(opts.arrayFactory);
      }
      return angular.extend({
        arrayFactory: $FirebaseArray,
        objectFactory: $FirebaseObject
      }, opts);
    };
  }]).factory('$firebaseUtils', ["$q", "$timeout", "firebaseBatchDelay", function($q, $timeout, firebaseBatchDelay) {
    var utils = {
      batch: function(wait, maxWait) {
        wait = typeof('wait') === 'number' ? wait : firebaseBatchDelay;
        if (!maxWait) {
          maxWait = wait * 10 || 100;
        }
        var queue = [];
        var start;
        var cancelTimer;
        function createBatchFn(fn, context) {
          if (typeof(fn) !== 'function') {
            throw new Error('Must provide a function to be batched. Got ' + fn);
          }
          return function() {
            var args = Array.prototype.slice.call(arguments, 0);
            queue.push([fn, context, args]);
            resetTimer();
          };
        }
        function resetTimer() {
          if (cancelTimer) {
            cancelTimer();
            cancelTimer = null;
          }
          if (start && Date.now() - start > maxWait) {
            utils.compile(runNow);
          } else {
            if (!start) {
              start = Date.now();
            }
            cancelTimer = utils.wait(runNow, wait);
          }
        }
        function runNow() {
          cancelTimer = null;
          start = null;
          var copyList = queue.slice(0);
          queue = [];
          angular.forEach(copyList, function(parts) {
            parts[0].apply(parts[1], parts[2]);
          });
        }
        return createBatchFn;
      },
      debounce: function(fn, ctx, wait, maxWait) {
        var start,
            cancelTimer,
            args;
        if (typeof(ctx) === 'number') {
          maxWait = wait;
          wait = ctx;
          ctx = null;
        }
        if (typeof wait !== 'number') {
          throw new Error('Must provide a valid integer for wait. Try 0 for a default');
        }
        if (typeof(fn) !== 'function') {
          throw new Error('Must provide a valid function to debounce');
        }
        if (!maxWait) {
          maxWait = wait * 10 || 100;
        }
        function resetTimer() {
          if (cancelTimer) {
            cancelTimer();
            cancelTimer = null;
          }
          if (start && Date.now() - start > maxWait) {
            utils.compile(runNow);
          } else {
            if (!start) {
              start = Date.now();
            }
            cancelTimer = utils.wait(runNow, wait);
          }
        }
        function runNow() {
          cancelTimer = null;
          start = null;
          fn.apply(ctx, args);
        }
        function debounced() {
          args = Array.prototype.slice.call(arguments, 0);
          resetTimer();
        }
        debounced.running = function() {
          return start > 0;
        };
        return debounced;
      },
      assertValidRef: function(ref, msg) {
        if (!angular.isObject(ref) || typeof(ref.ref) !== 'function' || typeof(ref.ref().transaction) !== 'function') {
          throw new Error(msg || 'Invalid Firebase reference');
        }
      },
      inherit: function(ChildClass, ParentClass, methods) {
        var childMethods = ChildClass.prototype;
        ChildClass.prototype = Object.create(ParentClass.prototype);
        ChildClass.prototype.constructor = ChildClass;
        angular.forEach(Object.keys(childMethods), function(k) {
          ChildClass.prototype[k] = childMethods[k];
        });
        if (angular.isObject(methods)) {
          angular.extend(ChildClass.prototype, methods);
        }
        return ChildClass;
      },
      getPrototypeMethods: function(inst, iterator, context) {
        var methods = {};
        var objProto = Object.getPrototypeOf({});
        var proto = angular.isFunction(inst) && angular.isObject(inst.prototype) ? inst.prototype : Object.getPrototypeOf(inst);
        while (proto && proto !== objProto) {
          for (var key in proto) {
            if (proto.hasOwnProperty(key) && !methods.hasOwnProperty(key)) {
              methods[key] = true;
              iterator.call(context, proto[key], key, proto);
            }
          }
          proto = Object.getPrototypeOf(proto);
        }
      },
      getPublicMethods: function(inst, iterator, context) {
        utils.getPrototypeMethods(inst, function(m, k) {
          if (typeof(m) === 'function' && k.charAt(0) !== '_') {
            iterator.call(context, m, k);
          }
        });
      },
      defer: function() {
        return $q.defer();
      },
      reject: function(msg) {
        var def = utils.defer();
        def.reject(msg);
        return def.promise;
      },
      resolve: function() {
        var def = utils.defer();
        def.resolve.apply(def, arguments);
        return def.promise;
      },
      wait: function(fn, wait) {
        var to = $timeout(fn, wait || 0);
        return function() {
          if (to) {
            $timeout.cancel(to);
            to = null;
          }
        };
      },
      compile: function(fn) {
        return $timeout(fn || function() {});
      },
      deepCopy: function(obj) {
        if (!angular.isObject(obj)) {
          return obj;
        }
        var newCopy = angular.isArray(obj) ? obj.slice() : angular.extend({}, obj);
        for (var key in newCopy) {
          if (newCopy.hasOwnProperty(key)) {
            if (angular.isObject(newCopy[key])) {
              newCopy[key] = utils.deepCopy(newCopy[key]);
            }
          }
        }
        return newCopy;
      },
      trimKeys: function(dest, source) {
        utils.each(dest, function(v, k) {
          if (!source.hasOwnProperty(k)) {
            delete dest[k];
          }
        });
      },
      extendData: function(dest, source) {
        utils.each(source, function(v, k) {
          dest[k] = utils.deepCopy(v);
        });
        return dest;
      },
      scopeData: function(dataOrRec) {
        var data = {
          $id: dataOrRec.$id,
          $priority: dataOrRec.$priority
        };
        if (dataOrRec.hasOwnProperty('$value')) {
          data.$value = dataOrRec.$value;
        }
        return utils.extendData(data, dataOrRec);
      },
      updateRec: function(rec, snap) {
        var data = snap.val();
        var oldData = angular.extend({}, rec);
        if (!angular.isObject(data)) {
          rec.$value = data;
          data = {};
        } else {
          delete rec.$value;
        }
        utils.trimKeys(rec, data);
        angular.extend(rec, data);
        rec.$priority = snap.getPriority();
        return !angular.equals(oldData, rec) || oldData.$value !== rec.$value || oldData.$priority !== rec.$priority;
      },
      applyDefaults: function(rec, defaults) {
        if (angular.isObject(defaults)) {
          angular.forEach(defaults, function(v, k) {
            if (!rec.hasOwnProperty(k)) {
              rec[k] = v;
            }
          });
        }
        return rec;
      },
      dataKeys: function(obj) {
        var out = [];
        utils.each(obj, function(v, k) {
          out.push(k);
        });
        return out;
      },
      each: function(obj, iterator, context) {
        if (angular.isObject(obj)) {
          for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
              var c = k.charAt(0);
              if (c !== '_' && c !== '$' && c !== '.') {
                iterator.call(context, obj[k], k, obj);
              }
            }
          }
        } else if (angular.isArray(obj)) {
          for (var i = 0,
              len = obj.length; i < len; i++) {
            iterator.call(context, obj[i], i, obj);
          }
        }
        return obj;
      },
      getKey: function(refOrSnapshot) {
        return (typeof refOrSnapshot.key === 'function') ? refOrSnapshot.key() : refOrSnapshot.name();
      },
      toJSON: function(rec) {
        var dat;
        if (!angular.isObject(rec)) {
          rec = {$value: rec};
        }
        if (angular.isFunction(rec.toJSON)) {
          dat = rec.toJSON();
        } else {
          dat = {};
          utils.each(rec, function(v, k) {
            dat[k] = stripDollarPrefixedKeys(v);
          });
        }
        if (angular.isDefined(rec.$value) && Object.keys(dat).length === 0 && rec.$value !== null) {
          dat['.value'] = rec.$value;
        }
        if (angular.isDefined(rec.$priority) && Object.keys(dat).length > 0 && rec.$priority !== null) {
          dat['.priority'] = rec.$priority;
        }
        angular.forEach(dat, function(v, k) {
          if (k.match(/[.$\[\]#\/]/) && k !== '.value' && k !== '.priority') {
            throw new Error('Invalid key ' + k + ' (cannot contain .$[]#)');
          } else if (angular.isUndefined(v)) {
            throw new Error('Key ' + k + ' was undefined. Cannot pass undefined in JSON. Use null instead.');
          }
        });
        return dat;
      },
      batchDelay: firebaseBatchDelay,
      allPromises: $q.all.bind($q)
    };
    return utils;
  }]);
  function stripDollarPrefixedKeys(data) {
    if (!angular.isObject(data)) {
      return data;
    }
    var out = angular.isArray(data) ? [] : {};
    angular.forEach(data, function(v, k) {
      if (typeof k !== 'string' || k.charAt(0) !== '$') {
        out[k] = stripDollarPrefixedKeys(v);
      }
    });
    return out;
  }
})();



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular", ["../css/ionic.css!","./ionic","angular","angular-animate","angular-sanitize","angular-ui-router"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["../css/ionic.css!","./ionic","angular","angular-animate","angular-sanitize","angular-ui-router"]);
  (function() {
"format global";
"deps ../css/ionic.css!";
"deps ./ionic";
"deps angular";
"deps angular-animate";
"deps angular-sanitize";
"deps angular-ui-router";
(function() {
  var deprecated = {
    method: function(msg, log, fn) {
      var called = false;
      return function deprecatedMethod() {
        if (!called) {
          called = true;
          log(msg);
        }
        return fn.apply(this, arguments);
      };
    },
    field: function(msg, log, parent, field, val) {
      var called = false;
      var getter = function() {
        if (!called) {
          called = true;
          log(msg);
        }
        return val;
      };
      var setter = function(v) {
        if (!called) {
          called = true;
          log(msg);
        }
        val = v;
        return v;
      };
      Object.defineProperty(parent, field, {
        get: getter,
        set: setter,
        enumerable: true
      });
      return;
    }
  };
  var IonicModule = angular.module('ionic', ['ngAnimate', 'ngSanitize', 'ui.router']),
      extend = angular.extend,
      forEach = angular.forEach,
      isDefined = angular.isDefined,
      isString = angular.isString,
      jqLite = angular.element;
  IonicModule.factory('$ionicActionSheet', ['$rootScope', '$compile', '$animate', '$timeout', '$ionicTemplateLoader', '$ionicPlatform', '$ionicBody', function($rootScope, $compile, $animate, $timeout, $ionicTemplateLoader, $ionicPlatform, $ionicBody) {
    return {show: actionSheet};
    function actionSheet(opts) {
      var scope = $rootScope.$new(true);
      angular.extend(scope, {
        cancel: angular.noop,
        destructiveButtonClicked: angular.noop,
        buttonClicked: angular.noop,
        $deregisterBackButton: angular.noop,
        buttons: [],
        cancelOnStateChange: true
      }, opts || {});
      var element = scope.element = $compile('<ion-action-sheet buttons="buttons"></ion-action-sheet>')(scope);
      var sheetEl = jqLite(element[0].querySelector('.action-sheet-wrapper'));
      var stateChangeListenDone = scope.cancelOnStateChange ? $rootScope.$on('$stateChangeSuccess', function() {
        scope.cancel();
      }) : angular.noop;
      scope.removeSheet = function(done) {
        if (scope.removed)
          return;
        scope.removed = true;
        sheetEl.removeClass('action-sheet-up');
        $timeout(function() {
          $ionicBody.removeClass('action-sheet-open');
        }, 400);
        scope.$deregisterBackButton();
        stateChangeListenDone();
        $animate.removeClass(element, 'active', function() {
          scope.$destroy();
          element.remove();
          scope.cancel.$scope = null;
          (done || angular.noop)();
        });
      };
      scope.showSheet = function(done) {
        if (scope.removed)
          return;
        $ionicBody.append(element).addClass('action-sheet-open');
        $animate.addClass(element, 'active', function() {
          if (scope.removed)
            return;
          (done || angular.noop)();
        });
        $timeout(function() {
          if (scope.removed)
            return;
          sheetEl.addClass('action-sheet-up');
        }, 20, false);
      };
      scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(function() {
        $timeout(scope.cancel);
      }, PLATFORM_BACK_BUTTON_PRIORITY_ACTION_SHEET);
      scope.cancel = function() {
        scope.removeSheet(opts.cancel);
      };
      scope.buttonClicked = function(index) {
        if (opts.buttonClicked(index, opts.buttons[index]) === true) {
          scope.removeSheet();
        }
      };
      scope.destructiveButtonClicked = function() {
        if (opts.destructiveButtonClicked() === true) {
          scope.removeSheet();
        }
      };
      scope.showSheet();
      scope.cancel.$scope = scope;
      return scope.cancel;
    }
  }]);
  jqLite.prototype.addClass = function(cssClasses) {
    var x,
        y,
        cssClass,
        el,
        splitClasses,
        existingClasses;
    if (cssClasses && cssClasses != 'ng-scope' && cssClasses != 'ng-isolate-scope') {
      for (x = 0; x < this.length; x++) {
        el = this[x];
        if (el.setAttribute) {
          if (cssClasses.indexOf(' ') < 0 && el.classList.add) {
            el.classList.add(cssClasses);
          } else {
            existingClasses = (' ' + (el.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, " ");
            splitClasses = cssClasses.split(' ');
            for (y = 0; y < splitClasses.length; y++) {
              cssClass = splitClasses[y].trim();
              if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
                existingClasses += cssClass + ' ';
              }
            }
            el.setAttribute('class', existingClasses.trim());
          }
        }
      }
    }
    return this;
  };
  jqLite.prototype.removeClass = function(cssClasses) {
    var x,
        y,
        splitClasses,
        cssClass,
        el;
    if (cssClasses) {
      for (x = 0; x < this.length; x++) {
        el = this[x];
        if (el.getAttribute) {
          if (cssClasses.indexOf(' ') < 0 && el.classList.remove) {
            el.classList.remove(cssClasses);
          } else {
            splitClasses = cssClasses.split(' ');
            for (y = 0; y < splitClasses.length; y++) {
              cssClass = splitClasses[y];
              el.setAttribute('class', ((" " + (el.getAttribute('class') || '') + " ").replace(/[\n\t]/g, " ").replace(" " + cssClass.trim() + " ", " ")).trim());
            }
          }
        }
      }
    }
    return this;
  };
  IonicModule.factory('$ionicBackdrop', ['$document', '$timeout', function($document, $timeout) {
    var el = jqLite('<div class="backdrop">');
    var backdropHolds = 0;
    $document[0].body.appendChild(el[0]);
    return {
      retain: retain,
      release: release,
      getElement: getElement,
      _element: el
    };
    function retain() {
      if ((++backdropHolds) === 1) {
        el.addClass('visible');
        ionic.requestAnimationFrame(function() {
          backdropHolds && el.addClass('active');
        });
      }
    }
    function release() {
      if ((--backdropHolds) === 0) {
        el.removeClass('active');
        $timeout(function() {
          !backdropHolds && el.removeClass('visible');
        }, 400, false);
      }
    }
    function getElement() {
      return el;
    }
  }]);
  IonicModule.factory('$ionicBind', ['$parse', '$interpolate', function($parse, $interpolate) {
    var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
    return function(scope, attrs, bindDefinition) {
      forEach(bindDefinition || {}, function(definition, scopeName) {
        var match = definition.match(LOCAL_REGEXP) || [],
            attrName = match[3] || scopeName,
            mode = match[1],
            parentGet,
            unwatch;
        switch (mode) {
          case '@':
            if (!attrs[attrName]) {
              return;
            }
            attrs.$observe(attrName, function(value) {
              scope[scopeName] = value;
            });
            if (attrs[attrName]) {
              scope[scopeName] = $interpolate(attrs[attrName])(scope);
            }
            break;
          case '=':
            if (!attrs[attrName]) {
              return;
            }
            unwatch = scope.$watch(attrs[attrName], function(value) {
              scope[scopeName] = value;
            });
            scope.$on('$destroy', unwatch);
            break;
          case '&':
            if (attrs[attrName] && attrs[attrName].match(RegExp(scopeName + '\(.*?\)'))) {
              throw new Error('& expression binding "' + scopeName + '" looks like it will recursively call "' + attrs[attrName] + '" and cause a stack overflow! Please choose a different scopeName.');
            }
            parentGet = $parse(attrs[attrName]);
            scope[scopeName] = function(locals) {
              return parentGet(scope, locals);
            };
            break;
        }
      });
    };
  }]);
  IonicModule.factory('$ionicBody', ['$document', function($document) {
    return {
      addClass: function() {
        for (var x = 0; x < arguments.length; x++) {
          $document[0].body.classList.add(arguments[x]);
        }
        return this;
      },
      removeClass: function() {
        for (var x = 0; x < arguments.length; x++) {
          $document[0].body.classList.remove(arguments[x]);
        }
        return this;
      },
      enableClass: function(shouldEnableClass) {
        var args = Array.prototype.slice.call(arguments).slice(1);
        if (shouldEnableClass) {
          this.addClass.apply(this, args);
        } else {
          this.removeClass.apply(this, args);
        }
        return this;
      },
      append: function(ele) {
        $document[0].body.appendChild(ele.length ? ele[0] : ele);
        return this;
      },
      get: function() {
        return $document[0].body;
      }
    };
  }]);
  IonicModule.factory('$ionicClickBlock', ['$document', '$ionicBody', '$timeout', function($document, $ionicBody, $timeout) {
    var cb = $document[0].createElement('div');
    cb.className = 'click-block';
    return {
      show: function() {
        if (cb.parentElement) {
          cb.classList.remove('hide');
        } else {
          $ionicBody.append(cb);
        }
        $timeout(function() {
          cb.classList.add('hide');
        }, 500);
      },
      hide: function() {
        cb.classList.add('hide');
      }
    };
  }]);
  IonicModule.factory('$collectionDataSource', ['$cacheFactory', '$parse', '$rootScope', function($cacheFactory, $parse, $rootScope) {
    function hideWithTransform(element) {
      element.css(ionic.CSS.TRANSFORM, 'translate3d(-2000px,-2000px,0)');
    }
    function CollectionRepeatDataSource(options) {
      var self = this;
      this.scope = options.scope;
      this.transcludeFn = options.transcludeFn;
      this.transcludeParent = options.transcludeParent;
      this.element = options.element;
      this.keyExpr = options.keyExpr;
      this.listExpr = options.listExpr;
      this.trackByExpr = options.trackByExpr;
      this.heightGetter = options.heightGetter;
      this.widthGetter = options.widthGetter;
      this.dimensions = [];
      this.data = [];
      this.attachedItems = {};
      this.BACKUP_ITEMS_LENGTH = 20;
      this.backupItemsArray = [];
    }
    CollectionRepeatDataSource.prototype = {
      setup: function() {
        if (this.isSetup)
          return;
        this.isSetup = true;
        for (var i = 0; i < this.BACKUP_ITEMS_LENGTH; i++) {
          this.detachItem(this.createItem());
        }
      },
      destroy: function() {
        this.dimensions.length = 0;
        this.data = null;
        this.backupItemsArray.length = 0;
        this.attachedItems = {};
      },
      calculateDataDimensions: function() {
        var locals = {};
        this.dimensions = this.data.map(function(value, index) {
          locals[this.keyExpr] = value;
          locals.$index = index;
          return {
            width: this.widthGetter(this.scope, locals),
            height: this.heightGetter(this.scope, locals)
          };
        }, this);
        this.dimensions = this.beforeSiblings.concat(this.dimensions).concat(this.afterSiblings);
        this.dataStartIndex = this.beforeSiblings.length;
      },
      createItem: function() {
        var item = {};
        item.scope = this.scope.$new();
        this.transcludeFn(item.scope, function(clone) {
          clone.css('position', 'absolute');
          item.element = clone;
        });
        this.transcludeParent.append(item.element);
        return item;
      },
      getItem: function(index) {
        if ((item = this.attachedItems[index])) {} else if ((item = this.backupItemsArray.pop())) {
          reconnectScope(item.scope);
        } else {
          item = this.createItem();
        }
        return item;
      },
      attachItemAtIndex: function(index) {
        if (index < this.dataStartIndex) {
          return this.beforeSiblings[index];
        }
        index -= this.dataStartIndex;
        if (index > this.data.length - 1) {
          return this.afterSiblings[index - this.dataStartIndex];
        }
        var item = this.getItem(index);
        var value = this.data[index];
        if (item.index !== index || item.scope[this.keyExpr] !== value) {
          item.index = item.scope.$index = index;
          item.scope[this.keyExpr] = value;
          item.scope.$first = (index === 0);
          item.scope.$last = (index === (this.getLength() - 1));
          item.scope.$middle = !(item.scope.$first || item.scope.$last);
          item.scope.$odd = !(item.scope.$even = (index & 1) === 0);
          if (!$rootScope.$$phase) {
            item.scope.$digest();
          }
        }
        this.attachedItems[index] = item;
        return item;
      },
      destroyItem: function(item) {
        item.element.remove();
        item.scope.$destroy();
        item.scope = null;
        item.element = null;
      },
      detachItem: function(item) {
        delete this.attachedItems[item.index];
        if (item.isOutside) {
          hideWithTransform(item.element);
        } else if (this.backupItemsArray.length >= this.BACKUP_ITEMS_LENGTH) {
          this.destroyItem(item);
        } else {
          this.backupItemsArray.push(item);
          hideWithTransform(item.element);
          disconnectScope(item.scope);
        }
      },
      getLength: function() {
        return this.dimensions && this.dimensions.length || 0;
      },
      setData: function(value, beforeSiblings, afterSiblings) {
        this.data = value || [];
        this.beforeSiblings = beforeSiblings || [];
        this.afterSiblings = afterSiblings || [];
        this.calculateDataDimensions();
        this.afterSiblings.forEach(function(item) {
          item.element.css({
            position: 'absolute',
            top: '0',
            left: '0'
          });
          hideWithTransform(item.element);
        });
      }
    };
    return CollectionRepeatDataSource;
  }]);
  function disconnectScope(scope) {
    if (scope.$root === scope) {
      return;
    }
    var parent = scope.$parent;
    scope.$$disconnected = true;
    if (parent.$$childHead === scope) {
      parent.$$childHead = scope.$$nextSibling;
    }
    if (parent.$$childTail === scope) {
      parent.$$childTail = scope.$$prevSibling;
    }
    if (scope.$$prevSibling) {
      scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
    }
    if (scope.$$nextSibling) {
      scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;
    }
    scope.$$nextSibling = scope.$$prevSibling = null;
  }
  function reconnectScope(scope) {
    if (scope.$root === scope) {
      return;
    }
    if (!scope.$$disconnected) {
      return;
    }
    var parent = scope.$parent;
    scope.$$disconnected = false;
    scope.$$prevSibling = parent.$$childTail;
    if (parent.$$childHead) {
      parent.$$childTail.$$nextSibling = scope;
      parent.$$childTail = scope;
    } else {
      parent.$$childHead = parent.$$childTail = scope;
    }
  }
  IonicModule.factory('$collectionRepeatManager', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    function CollectionRepeatManager(options) {
      var self = this;
      this.dataSource = options.dataSource;
      this.element = options.element;
      this.scrollView = options.scrollView;
      this.isVertical = !!this.scrollView.options.scrollingY;
      this.renderedItems = {};
      this.dimensions = [];
      this.setCurrentIndex(0);
      this.scrollView.__$callback = this.scrollView.__callback;
      this.scrollView.__callback = angular.bind(this, this.renderScroll);
      function getViewportSize() {
        return self.viewportSize;
      }
      if (this.isVertical) {
        this.scrollView.options.getContentHeight = getViewportSize;
        this.scrollValue = function() {
          return this.scrollView.__scrollTop;
        };
        this.scrollMaxValue = function() {
          return this.scrollView.__maxScrollTop;
        };
        this.scrollSize = function() {
          return this.scrollView.__clientHeight;
        };
        this.secondaryScrollSize = function() {
          return this.scrollView.__clientWidth;
        };
        this.transformString = function(y, x) {
          return 'translate3d(' + x + 'px,' + y + 'px,0)';
        };
        this.primaryDimension = function(dim) {
          return dim.height;
        };
        this.secondaryDimension = function(dim) {
          return dim.width;
        };
      } else {
        this.scrollView.options.getContentWidth = getViewportSize;
        this.scrollValue = function() {
          return this.scrollView.__scrollLeft;
        };
        this.scrollMaxValue = function() {
          return this.scrollView.__maxScrollLeft;
        };
        this.scrollSize = function() {
          return this.scrollView.__clientWidth;
        };
        this.secondaryScrollSize = function() {
          return this.scrollView.__clientHeight;
        };
        this.transformString = function(x, y) {
          return 'translate3d(' + x + 'px,' + y + 'px,0)';
        };
        this.primaryDimension = function(dim) {
          return dim.width;
        };
        this.secondaryDimension = function(dim) {
          return dim.height;
        };
      }
    }
    CollectionRepeatManager.prototype = {
      destroy: function() {
        this.renderedItems = {};
        this.render = angular.noop;
        this.calculateDimensions = angular.noop;
        this.dimensions = [];
      },
      calculateDimensions: function() {
        var primaryPos = 0;
        var secondaryPos = 0;
        var secondaryScrollSize = this.secondaryScrollSize();
        var previousItem;
        this.dataSource.beforeSiblings && this.dataSource.beforeSiblings.forEach(calculateSize, this);
        var beforeSize = primaryPos + (previousItem ? previousItem.primarySize : 0);
        primaryPos = secondaryPos = 0;
        previousItem = null;
        var dimensions = this.dataSource.dimensions.map(calculateSize, this);
        var totalSize = primaryPos + (previousItem ? previousItem.primarySize : 0);
        return {
          beforeSize: beforeSize,
          totalSize: totalSize,
          dimensions: dimensions
        };
        function calculateSize(dim) {
          var rect = {
            primarySize: this.primaryDimension(dim),
            secondarySize: Math.min(this.secondaryDimension(dim), secondaryScrollSize)
          };
          if (previousItem) {
            secondaryPos += previousItem.secondarySize;
            if (previousItem.primaryPos === primaryPos && secondaryPos + rect.secondarySize > secondaryScrollSize) {
              secondaryPos = 0;
              primaryPos += previousItem.primarySize;
            }
          }
          rect.primaryPos = primaryPos;
          rect.secondaryPos = secondaryPos;
          previousItem = rect;
          return rect;
        }
      },
      resize: function() {
        var result = this.calculateDimensions();
        this.dimensions = result.dimensions;
        this.viewportSize = result.totalSize;
        this.beforeSize = result.beforeSize;
        this.setCurrentIndex(0);
        this.render(true);
        this.dataSource.setup();
      },
      setCurrentIndex: function(index, height) {
        var currentPos = (this.dimensions[index] || {}).primaryPos || 0;
        this.currentIndex = index;
        this.hasPrevIndex = index > 0;
        if (this.hasPrevIndex) {
          this.previousPos = Math.max(currentPos - this.dimensions[index - 1].primarySize, this.dimensions[index - 1].primaryPos);
        }
        this.hasNextIndex = index + 1 < this.dataSource.getLength();
        if (this.hasNextIndex) {
          this.nextPos = Math.min(currentPos + this.dimensions[index + 1].primarySize, this.dimensions[index + 1].primaryPos);
        }
      },
      renderScroll: ionic.animationFrameThrottle(function(transformLeft, transformTop, zoom, wasResize) {
        if (this.isVertical) {
          this.renderIfNeeded(transformTop);
        } else {
          this.renderIfNeeded(transformLeft);
        }
        return this.scrollView.__$callback(transformLeft, transformTop, zoom, wasResize);
      }),
      renderIfNeeded: function(scrollPos) {
        if ((this.hasNextIndex && scrollPos >= this.nextPos) || (this.hasPrevIndex && scrollPos < this.previousPos)) {
          this.render();
        }
      },
      getIndexForScrollValue: function(i, scrollValue) {
        var rect;
        if (scrollValue <= this.dimensions[i].primaryPos) {
          while ((rect = this.dimensions[i - 1]) && rect.primaryPos > scrollValue) {
            i--;
          }
        } else {
          while ((rect = this.dimensions[i + 1]) && rect.primaryPos < scrollValue) {
            i++;
          }
        }
        return i;
      },
      render: function(shouldRedrawAll) {
        var self = this;
        var i;
        var isOutOfBounds = (this.currentIndex >= this.dataSource.getLength());
        if (isOutOfBounds || shouldRedrawAll) {
          for (i in this.renderedItems) {
            this.removeItem(i);
          }
          if (isOutOfBounds)
            return;
        }
        var rect;
        var scrollValue = this.scrollValue();
        var scrollSize = this.scrollSize();
        var scrollSizeEnd = scrollSize + scrollValue;
        var startIndex = this.getIndexForScrollValue(this.currentIndex, scrollValue);
        var renderStartIndex = Math.max(startIndex - 1, 0);
        while (renderStartIndex > 0 && (rect = this.dimensions[renderStartIndex]) && rect.primaryPos === this.dimensions[startIndex - 1].primaryPos) {
          renderStartIndex--;
        }
        i = renderStartIndex;
        while ((rect = this.dimensions[i]) && (rect.primaryPos - rect.primarySize < scrollSizeEnd)) {
          doRender(i, rect);
          i++;
        }
        if (self.dimensions[i]) {
          doRender(i, self.dimensions[i]);
          i++;
        }
        if (self.dimensions[i]) {
          doRender(i, self.dimensions[i]);
        }
        var renderEndIndex = i;
        for (var renderIndex in this.renderedItems) {
          if (renderIndex < renderStartIndex || renderIndex > renderEndIndex) {
            this.removeItem(renderIndex);
          }
        }
        this.setCurrentIndex(startIndex);
        function doRender(dataIndex, rect) {
          if (dataIndex < self.dataSource.dataStartIndex) {} else {
            self.renderItem(dataIndex, rect.primaryPos - self.beforeSize, rect.secondaryPos);
          }
        }
      },
      renderItem: function(dataIndex, primaryPos, secondaryPos) {
        var item = this.dataSource.attachItemAtIndex(dataIndex);
        if (item && item.element) {
          if (item.primaryPos !== primaryPos || item.secondaryPos !== secondaryPos) {
            item.element.css(ionic.CSS.TRANSFORM, this.transformString(primaryPos, secondaryPos));
            item.primaryPos = primaryPos;
            item.secondaryPos = secondaryPos;
          }
          this.renderedItems[dataIndex] = item;
        } else {
          delete this.renderedItems[dataIndex];
        }
      },
      removeItem: function(dataIndex) {
        var item = this.renderedItems[dataIndex];
        if (item) {
          item.primaryPos = item.secondaryPos = null;
          this.dataSource.detachItem(item);
          delete this.renderedItems[dataIndex];
        }
      }
    };
    return CollectionRepeatManager;
  }]);
  function delegateService(methodNames) {
    return ['$log', function($log) {
      var delegate = this;
      var instances = this._instances = [];
      this._registerInstance = function(instance, handle) {
        instance.$$delegateHandle = handle;
        instances.push(instance);
        return function deregister() {
          var index = instances.indexOf(instance);
          if (index !== -1) {
            instances.splice(index, 1);
          }
        };
      };
      this.$getByHandle = function(handle) {
        if (!handle) {
          return delegate;
        }
        return new InstanceForHandle(handle);
      };
      function InstanceForHandle(handle) {
        this.handle = handle;
      }
      methodNames.forEach(function(methodName) {
        InstanceForHandle.prototype[methodName] = function() {
          var handle = this.handle;
          var args = arguments;
          var matchingInstancesFound = 0;
          var finalResult;
          var result;
          instances.forEach(function(instance) {
            if (instance.$$delegateHandle === handle) {
              matchingInstancesFound++;
              result = instance[methodName].apply(instance, args);
              if (matchingInstancesFound === 1) {
                finalResult = result;
              }
            }
          });
          if (!matchingInstancesFound) {
            return $log.warn('Delegate for handle "' + this.handle + '" could not find a ' + 'corresponding element with delegate-handle="' + this.handle + '"! ' + methodName + '() was not called!\n' + 'Possible cause: If you are calling ' + methodName + '() immediately, and ' + 'your element with delegate-handle="' + this.handle + '" is a child of your ' + 'controller, then your element may not be compiled yet. Put a $timeout ' + 'around your call to ' + methodName + '() and try again.');
          }
          return finalResult;
        };
        delegate[methodName] = function() {
          var args = arguments;
          var finalResult;
          var result;
          instances.forEach(function(instance, index) {
            result = instance[methodName].apply(instance, args);
            if (index === 0) {
              finalResult = result;
            }
          });
          return finalResult;
        };
        function callMethod(instancesToUse, methodName, args) {
          var finalResult;
          var result;
          instancesToUse.forEach(function(instance, index) {
            result = instance[methodName].apply(instance, args);
            if (index === 0) {
              finalResult = result;
            }
          });
          return finalResult;
        }
      });
    }];
  }
  IonicModule.factory('$ionicGesture', [function() {
    return {
      on: function(eventType, cb, $element, options) {
        return window.ionic.onGesture(eventType, cb, $element[0], options);
      },
      off: function(gesture, eventType, cb) {
        return window.ionic.offGesture(gesture, eventType, cb);
      }
    };
  }]);
  IonicModule.provider('$ionicConfig', function() {
    var provider = this;
    var config = {prefetchTemplates: true};
    this.prefetchTemplates = function(newValue) {
      if (arguments.length) {
        config.prefetchTemplates = newValue;
      }
      return config.prefetchTemplates;
    };
    this.$get = function() {
      return config;
    };
  });
  var LOADING_TPL = '<div class="loading-container">' + '<div class="loading">' + '</div>' + '</div>';
  var LOADING_HIDE_DEPRECATED = '$ionicLoading instance.hide() has been deprecated. Use $ionicLoading.hide().';
  var LOADING_SHOW_DEPRECATED = '$ionicLoading instance.show() has been deprecated. Use $ionicLoading.show().';
  var LOADING_SET_DEPRECATED = '$ionicLoading instance.setContent() has been deprecated. Use $ionicLoading.show({ template: \'my content\' }).';
  IonicModule.constant('$ionicLoadingConfig', {template: '<i class="icon ion-loading-d"></i>'}).factory('$ionicLoading', ['$ionicLoadingConfig', '$ionicBody', '$ionicTemplateLoader', '$ionicBackdrop', '$timeout', '$q', '$log', '$compile', '$ionicPlatform', function($ionicLoadingConfig, $ionicBody, $ionicTemplateLoader, $ionicBackdrop, $timeout, $q, $log, $compile, $ionicPlatform) {
    var loaderInstance;
    var deregisterBackAction = angular.noop;
    var loadingShowDelay = $q.when();
    return {
      show: showLoader,
      hide: hideLoader,
      _getLoader: getLoader
    };
    function getLoader() {
      if (!loaderInstance) {
        loaderInstance = $ionicTemplateLoader.compile({
          template: LOADING_TPL,
          appendTo: $ionicBody.get()
        }).then(function(loader) {
          var self = loader;
          loader.show = function(options) {
            var templatePromise = options.templateUrl ? $ionicTemplateLoader.load(options.templateUrl) : $q.when(options.template || options.content || '');
            if (!this.isShown) {
              this.hasBackdrop = !options.noBackdrop && options.showBackdrop !== false;
              if (this.hasBackdrop) {
                $ionicBackdrop.retain();
                $ionicBackdrop.getElement().addClass('backdrop-loading');
              }
            }
            if (options.duration) {
              $timeout.cancel(this.durationTimeout);
              this.durationTimeout = $timeout(angular.bind(this, this.hide), +options.duration);
            }
            templatePromise.then(function(html) {
              if (html) {
                var loading = self.element.children();
                loading.html(html);
                $compile(loading.contents())(self.scope);
              }
              if (self.isShown) {
                self.element.addClass('visible');
                ionic.requestAnimationFrame(function() {
                  if (self.isShown) {
                    self.element.addClass('active');
                    $ionicBody.addClass('loading-active');
                  }
                });
              }
            });
            this.isShown = true;
          };
          loader.hide = function() {
            if (this.isShown) {
              if (this.hasBackdrop) {
                $ionicBackdrop.release();
                $ionicBackdrop.getElement().removeClass('backdrop-loading');
              }
              self.element.removeClass('active');
              $ionicBody.removeClass('loading-active');
              setTimeout(function() {
                !self.isShown && self.element.removeClass('visible');
              }, 200);
            }
            $timeout.cancel(this.durationTimeout);
            this.isShown = false;
          };
          return loader;
        });
      }
      return loaderInstance;
    }
    function showLoader(options) {
      options = extend($ionicLoadingConfig || {}, options || {});
      var delay = options.delay || options.showDelay || 0;
      loadingShowDelay && $timeout.cancel(loadingShowDelay);
      loadingShowDelay = $timeout(angular.noop, delay);
      loadingShowDelay.then(getLoader).then(function(loader) {
        deregisterBackAction();
        deregisterBackAction = $ionicPlatform.registerBackButtonAction(angular.noop, PLATFORM_BACK_BUTTON_PRIORITY_LOADING);
        return loader.show(options);
      });
      return {
        hide: deprecated.method(LOADING_HIDE_DEPRECATED, $log.error, hideLoader),
        show: deprecated.method(LOADING_SHOW_DEPRECATED, $log.error, function() {
          showLoader(options);
        }),
        setContent: deprecated.method(LOADING_SET_DEPRECATED, $log.error, function(content) {
          getLoader().then(function(loader) {
            loader.show({template: content});
          });
        })
      };
    }
    function hideLoader() {
      deregisterBackAction();
      $timeout.cancel(loadingShowDelay);
      getLoader().then(function(loader) {
        loader.hide();
      });
    }
  }]);
  IonicModule.factory('$ionicModal', ['$rootScope', '$ionicBody', '$compile', '$timeout', '$ionicPlatform', '$ionicTemplateLoader', '$q', '$log', function($rootScope, $ionicBody, $compile, $timeout, $ionicPlatform, $ionicTemplateLoader, $q, $log) {
    var ModalView = ionic.views.Modal.inherit({
      initialize: function(opts) {
        ionic.views.Modal.prototype.initialize.call(this, opts);
        this.animation = opts.animation || 'slide-in-up';
      },
      show: function(target) {
        var self = this;
        if (self.scope.$$destroyed) {
          $log.error('Cannot call ' + self.viewType + '.show() after remove(). Please create a new ' + self.viewType + ' instance.');
          return;
        }
        var modalEl = jqLite(self.modalEl);
        self.el.classList.remove('hide');
        $timeout(function() {
          $ionicBody.addClass(self.viewType + '-open');
        }, 400);
        if (!self.el.parentElement) {
          modalEl.addClass(self.animation);
          $ionicBody.append(self.el);
        }
        if (target && self.positionView) {
          self.positionView(target, modalEl);
        }
        modalEl.addClass('ng-enter active').removeClass('ng-leave ng-leave-active');
        self._isShown = true;
        self._deregisterBackButton = $ionicPlatform.registerBackButtonAction(self.hardwareBackButtonClose ? angular.bind(self, self.hide) : angular.noop, PLATFORM_BACK_BUTTON_PRIORITY_MODAL);
        self._isOpenPromise = $q.defer();
        ionic.views.Modal.prototype.show.call(self);
        $timeout(function() {
          modalEl.addClass('ng-enter-active');
          ionic.trigger('resize');
          self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.shown', self);
          self.el.classList.add('active');
        }, 20);
        return $timeout(function() {
          self.$el.on('click', function(e) {
            if (self.backdropClickToClose && e.target === self.el) {
              self.hide();
            }
          });
        }, 400);
      },
      hide: function() {
        var self = this;
        var modalEl = jqLite(self.modalEl);
        self.el.classList.remove('active');
        modalEl.addClass('ng-leave');
        $timeout(function() {
          modalEl.addClass('ng-leave-active').removeClass('ng-enter ng-enter-active active');
        }, 20);
        self.$el.off('click');
        self._isShown = false;
        self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.hidden', self);
        self._deregisterBackButton && self._deregisterBackButton();
        ionic.views.Modal.prototype.hide.call(self);
        return $timeout(function() {
          $ionicBody.removeClass(self.viewType + '-open');
          self.el.classList.add('hide');
        }, self.hideDelay || 320);
      },
      remove: function() {
        var self = this;
        self.scope.$parent && self.scope.$parent.$broadcast(self.viewType + '.removed', self);
        return self.hide().then(function() {
          self.scope.$destroy();
          self.$el.remove();
        });
      },
      isShown: function() {
        return !!this._isShown;
      }
    });
    var createModal = function(templateString, options) {
      var scope = options.scope && options.scope.$new() || $rootScope.$new(true);
      options.viewType = options.viewType || 'modal';
      extend(scope, {
        $hasHeader: false,
        $hasSubheader: false,
        $hasFooter: false,
        $hasSubfooter: false,
        $hasTabs: false,
        $hasTabsTop: false
      });
      var element = $compile('<ion-' + options.viewType + '>' + templateString + '</ion-' + options.viewType + '>')(scope);
      options.$el = element;
      options.el = element[0];
      options.modalEl = options.el.querySelector('.' + options.viewType);
      var modal = new ModalView(options);
      modal.scope = scope;
      if (!options.scope) {
        scope[options.viewType] = modal;
      }
      return modal;
    };
    return {
      fromTemplate: function(templateString, options) {
        var modal = createModal(templateString, options || {});
        return modal;
      },
      fromTemplateUrl: function(url, options, _) {
        var cb;
        if (angular.isFunction(options)) {
          cb = options;
          options = _;
        }
        return $ionicTemplateLoader.load(url).then(function(templateString) {
          var modal = createModal(templateString, options || {});
          cb && cb(modal);
          return modal;
        });
      }
    };
  }]);
  IonicModule.service('$ionicNavBarDelegate', delegateService(['back', 'align', 'showBackButton', 'showBar', 'setTitle', 'changeTitle', 'getTitle', 'getPreviousTitle']));
  var PLATFORM_BACK_BUTTON_PRIORITY_VIEW = 100;
  var PLATFORM_BACK_BUTTON_PRIORITY_SIDE_MENU = 150;
  var PLATFORM_BACK_BUTTON_PRIORITY_MODAL = 200;
  var PLATFORM_BACK_BUTTON_PRIORITY_ACTION_SHEET = 300;
  var PLATFORM_BACK_BUTTON_PRIORITY_POPUP = 400;
  var PLATFORM_BACK_BUTTON_PRIORITY_LOADING = 500;
  function componentConfig(defaults) {
    defaults.$get = function() {
      return defaults;
    };
    return defaults;
  }
  IonicModule.constant('$ionicPlatformDefaults', {
    'ios': {
      '$ionicNavBarConfig': {
        transition: 'nav-title-slide-ios',
        alignTitle: 'center',
        backButtonIcon: 'ion-ios7-arrow-back'
      },
      '$ionicNavViewConfig': {transition: 'slide-ios'},
      '$ionicTabsConfig': {
        type: '',
        position: ''
      }
    },
    'android': {
      '$ionicNavBarConfig': {
        transition: 'nav-title-slide-full',
        alignTitle: 'center',
        backButtonIcon: 'ion-ios7-arrow-back'
      },
      '$ionicNavViewConfig': {transition: 'slide-full'},
      '$ionicTabsConfig': {
        type: 'tabs-striped',
        position: ''
      }
    }
  });
  IonicModule.config(['$ionicPlatformDefaults', '$injector', function($ionicPlatformDefaults, $injector) {
    var platform = ionic.Platform.platform();
    var applyConfig = function(platformDefaults) {
      forEach(platformDefaults, function(defaults, constantName) {
        extend($injector.get(constantName), defaults);
      });
    };
    switch (platform) {
      case 'ios':
        applyConfig($ionicPlatformDefaults.ios);
        break;
      case 'android':
        applyConfig($ionicPlatformDefaults.android);
        break;
    }
  }]);
  IonicModule.provider('$ionicPlatform', function() {
    return {$get: ['$q', '$rootScope', function($q, $rootScope) {
        var self = {
          onHardwareBackButton: function(cb) {
            ionic.Platform.ready(function() {
              document.addEventListener('backbutton', cb, false);
            });
          },
          offHardwareBackButton: function(fn) {
            ionic.Platform.ready(function() {
              document.removeEventListener('backbutton', fn);
            });
          },
          $backButtonActions: {},
          registerBackButtonAction: function(fn, priority, actionId) {
            if (!self._hasBackButtonHandler) {
              self.$backButtonActions = {};
              self.onHardwareBackButton(self.hardwareBackButtonClick);
              self._hasBackButtonHandler = true;
            }
            var action = {
              id: (actionId ? actionId : ionic.Utils.nextUid()),
              priority: (priority ? priority : 0),
              fn: fn
            };
            self.$backButtonActions[action.id] = action;
            return function() {
              delete self.$backButtonActions[action.id];
            };
          },
          hardwareBackButtonClick: function(e) {
            var priorityAction,
                actionId;
            for (actionId in self.$backButtonActions) {
              if (!priorityAction || self.$backButtonActions[actionId].priority >= priorityAction.priority) {
                priorityAction = self.$backButtonActions[actionId];
              }
            }
            if (priorityAction) {
              priorityAction.fn(e);
              return priorityAction;
            }
          },
          is: function(type) {
            return ionic.Platform.is(type);
          },
          on: function(type, cb) {
            ionic.Platform.ready(function() {
              document.addEventListener(type, cb, false);
            });
            return function() {
              ionic.Platform.ready(function() {
                document.removeEventListener(type, cb);
              });
            };
          },
          ready: function(cb) {
            var q = $q.defer();
            ionic.Platform.ready(function() {
              q.resolve();
              cb && cb();
            });
            return q.promise;
          }
        };
        return self;
      }]};
  });
  IonicModule.factory('$ionicPopover', ['$ionicModal', '$ionicPosition', '$document', '$window', function($ionicModal, $ionicPosition, $document, $window) {
    var POPOVER_BODY_PADDING = 6;
    var POPOVER_OPTIONS = {
      viewType: 'popover',
      hideDelay: 1,
      animation: 'none',
      positionView: positionView
    };
    function positionView(target, popoverEle) {
      var targetEle = angular.element(target.target || target);
      var buttonOffset = $ionicPosition.offset(targetEle);
      var popoverWidth = popoverEle.prop('offsetWidth');
      var popoverHeight = popoverEle.prop('offsetHeight');
      var bodyWidth = $document[0].body.clientWidth;
      var bodyHeight = $window.innerHeight;
      var popoverCSS = {left: buttonOffset.left + buttonOffset.width / 2 - popoverWidth / 2};
      var arrowEle = jqLite(popoverEle[0].querySelector('.popover-arrow'));
      if (popoverCSS.left < POPOVER_BODY_PADDING) {
        popoverCSS.left = POPOVER_BODY_PADDING;
      } else if (popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
        popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
      }
      if (buttonOffset.top + buttonOffset.height + popoverHeight > bodyHeight) {
        popoverCSS.top = buttonOffset.top - popoverHeight;
        popoverEle.addClass('popover-bottom');
      } else {
        popoverCSS.top = buttonOffset.top + buttonOffset.height;
        popoverEle.removeClass('popover-bottom');
      }
      arrowEle.css({left: buttonOffset.left + buttonOffset.width / 2 - arrowEle.prop('offsetWidth') / 2 - popoverCSS.left + 'px'});
      popoverEle.css({
        top: popoverCSS.top + 'px',
        left: popoverCSS.left + 'px',
        marginLeft: '0',
        opacity: '1'
      });
    }
    return {
      fromTemplate: function(templateString, options) {
        return $ionicModal.fromTemplate(templateString, ionic.Utils.extend(options || {}, POPOVER_OPTIONS));
      },
      fromTemplateUrl: function(url, options, _) {
        return $ionicModal.fromTemplateUrl(url, options, ionic.Utils.extend(options || {}, POPOVER_OPTIONS));
      }
    };
  }]);
  var POPUP_TPL = '<div class="popup-container">' + '<div class="popup">' + '<div class="popup-head">' + '<h3 class="popup-title" ng-bind-html="title"></h3>' + '<h5 class="popup-sub-title" ng-bind-html="subTitle" ng-if="subTitle"></h5>' + '</div>' + '<div class="popup-body">' + '</div>' + '<div class="popup-buttons">' + '<button ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="button" ng-class="button.type || \'button-default\'" ng-bind-html="button.text"></button>' + '</div>' + '</div>' + '</div>';
  IonicModule.factory('$ionicPopup', ['$ionicTemplateLoader', '$ionicBackdrop', '$q', '$timeout', '$rootScope', '$ionicBody', '$compile', '$ionicPlatform', function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $ionicBody, $compile, $ionicPlatform) {
    var config = {stackPushDelay: 75};
    var popupStack = [];
    var $ionicPopup = {
      show: showPopup,
      alert: showAlert,
      confirm: showConfirm,
      prompt: showPrompt,
      _createPopup: createPopup,
      _popupStack: popupStack
    };
    return $ionicPopup;
    function createPopup(options) {
      options = extend({
        scope: null,
        title: '',
        buttons: []
      }, options || {});
      var popupPromise = $ionicTemplateLoader.compile({
        template: POPUP_TPL,
        scope: options.scope && options.scope.$new(),
        appendTo: $ionicBody.get()
      });
      var contentPromise = options.templateUrl ? $ionicTemplateLoader.load(options.templateUrl) : $q.when(options.template || options.content || '');
      return $q.all([popupPromise, contentPromise]).then(function(results) {
        var self = results[0];
        var content = results[1];
        var responseDeferred = $q.defer();
        self.responseDeferred = responseDeferred;
        var body = jqLite(self.element[0].querySelector('.popup-body'));
        if (content) {
          body.html(content);
          $compile(body.contents())(self.scope);
        } else {
          body.remove();
        }
        extend(self.scope, {
          title: options.title,
          buttons: options.buttons,
          subTitle: options.subTitle,
          $buttonTapped: function(button, event) {
            var result = (button.onTap || angular.noop)(event);
            event = event.originalEvent || event;
            if (!event.defaultPrevented) {
              responseDeferred.resolve(result);
            }
          }
        });
        self.show = function() {
          if (self.isShown)
            return;
          self.isShown = true;
          ionic.requestAnimationFrame(function() {
            if (!self.isShown)
              return;
            self.element.removeClass('popup-hidden');
            self.element.addClass('popup-showing active');
            focusInput(self.element);
          });
        };
        self.hide = function(callback) {
          callback = callback || angular.noop;
          if (!self.isShown)
            return callback();
          self.isShown = false;
          self.element.removeClass('active');
          self.element.addClass('popup-hidden');
          $timeout(callback, 250);
        };
        self.remove = function() {
          if (self.removed)
            return;
          self.hide(function() {
            self.element.remove();
            self.scope.$destroy();
          });
          self.removed = true;
        };
        return self;
      });
    }
    function onHardwareBackButton(e) {
      popupStack[0] && popupStack[0].responseDeferred.resolve();
    }
    function showPopup(options) {
      var popupPromise = $ionicPopup._createPopup(options);
      var previousPopup = popupStack[0];
      if (previousPopup) {
        previousPopup.hide();
      }
      var resultPromise = $timeout(angular.noop, previousPopup ? config.stackPushDelay : 0).then(function() {
        return popupPromise;
      }).then(function(popup) {
        if (!previousPopup) {
          $ionicBody.addClass('popup-open');
          $ionicBackdrop.retain();
          $ionicPopup._backButtonActionDone = $ionicPlatform.registerBackButtonAction(onHardwareBackButton, PLATFORM_BACK_BUTTON_PRIORITY_POPUP);
        }
        popupStack.unshift(popup);
        popup.show();
        popup.responseDeferred.notify({close: resultPromise.close});
        return popup.responseDeferred.promise.then(function(result) {
          var index = popupStack.indexOf(popup);
          if (index !== -1) {
            popupStack.splice(index, 1);
          }
          popup.remove();
          var previousPopup = popupStack[0];
          if (previousPopup) {
            previousPopup.show();
          } else {
            $timeout(function() {
              $ionicBody.removeClass('popup-open');
            }, 400);
            $ionicBackdrop.release();
            ($ionicPopup._backButtonActionDone || angular.noop)();
          }
          return result;
        });
      });
      function close(result) {
        popupPromise.then(function(popup) {
          if (!popup.removed) {
            popup.responseDeferred.resolve(result);
          }
        });
      }
      resultPromise.close = close;
      return resultPromise;
    }
    function focusInput(element) {
      var focusOn = element[0].querySelector('[autofocus]');
      if (focusOn) {
        focusOn.focus();
      }
    }
    function showAlert(opts) {
      return showPopup(extend({buttons: [{
          text: opts.okText || 'OK',
          type: opts.okType || 'button-positive',
          onTap: function(e) {
            return true;
          }
        }]}, opts || {}));
    }
    function showConfirm(opts) {
      return showPopup(extend({buttons: [{
          text: opts.cancelText || 'Cancel',
          type: opts.cancelType || 'button-default',
          onTap: function(e) {
            return false;
          }
        }, {
          text: opts.okText || 'OK',
          type: opts.okType || 'button-positive',
          onTap: function(e) {
            return true;
          }
        }]}, opts || {}));
    }
    function showPrompt(opts) {
      var scope = $rootScope.$new(true);
      scope.data = {};
      var text = '';
      if (opts.template && /<[a-z][\s\S]*>/i.test(opts.template) === false) {
        text = '<span>' + opts.template + '</span>';
        delete opts.template;
      }
      return showPopup(extend({
        template: text + '<input ng-model="data.response" type="' + (opts.inputType || 'text') + '" placeholder="' + (opts.inputPlaceholder || '') + '">',
        scope: scope,
        buttons: [{
          text: opts.cancelText || 'Cancel',
          type: opts.cancelType || 'button-default',
          onTap: function(e) {}
        }, {
          text: opts.okText || 'OK',
          type: opts.okType || 'button-positive',
          onTap: function(e) {
            return scope.data.response || '';
          }
        }]
      }, opts || {}));
    }
  }]);
  IonicModule.factory('$ionicPosition', ['$document', '$window', function($document, $window) {
    function getStyle(el, cssprop) {
      if (el.currentStyle) {
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      return el.style[cssprop];
    }
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static') === 'static';
    }
    var parentOffsetEl = function(element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };
    return {
      position: function(element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = {
          top: 0,
          left: 0
        };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },
      offset: function(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      }
    };
  }]);
  IonicModule.service('$ionicScrollDelegate', delegateService(['resize', 'scrollTop', 'scrollBottom', 'scrollTo', 'scrollBy', 'zoomTo', 'zoomBy', 'getScrollPosition', 'anchorScroll', 'getScrollView', 'rememberScrollPosition', 'forgetScrollPosition', 'scrollToRememberedPosition']));
  IonicModule.service('$ionicSideMenuDelegate', delegateService(['toggleLeft', 'toggleRight', 'getOpenRatio', 'isOpen', 'isOpenLeft', 'isOpenRight', 'canDragContent', 'edgeDragThreshold']));
  IonicModule.service('$ionicSlideBoxDelegate', delegateService(['update', 'slide', 'enableSlide', 'previous', 'next', 'stop', 'start', 'currentIndex', 'slidesCount']));
  IonicModule.service('$ionicTabsDelegate', delegateService(['select', 'selectedIndex']));
  (function() {
    var templatesToCache = [];
    IonicModule.factory('$ionicTemplateCache', ['$http', '$templateCache', '$timeout', '$ionicConfig', function($http, $templateCache, $timeout, $ionicConfig) {
      var toCache = templatesToCache,
          hasRun = false;
      function $ionicTemplateCache(templates) {
        if (toCache.length > 500)
          return false;
        if (typeof templates === 'undefined')
          return run();
        if (isString(templates))
          templates = [templates];
        forEach(templates, function(template) {
          toCache.push(template);
        });
        if (hasRun)
          run();
      }
      var run = function() {
        if ($ionicConfig.prefetchTemplates === false)
          return;
        $ionicTemplateCache._runCount++;
        hasRun = true;
        if (toCache.length === 0)
          return;
        var i = 0;
        while (i < 5 && (template = toCache.pop())) {
          if (isString(template))
            $http.get(template, {cache: $templateCache});
          i++;
        }
        if (toCache.length)
          $timeout(function() {
            run();
          }, 1000);
      };
      $ionicTemplateCache._runCount = 0;
      return $ionicTemplateCache;
    }]).config(['$stateProvider', '$ionicConfigProvider', function($stateProvider, $ionicConfigProvider) {
      var stateProviderState = $stateProvider.state;
      $stateProvider.state = function(stateName, definition) {
        if (typeof definition === 'object' && $ionicConfigProvider.prefetchTemplates() !== false) {
          var enabled = definition.prefetchTemplate !== false;
          if (enabled && isString(definition.templateUrl))
            templatesToCache.push(definition.templateUrl);
          if (angular.isObject(definition.views)) {
            for (var key in definition.views) {
              enabled = definition.views[key].prefetchTemplate !== false;
              if (enabled && isString(definition.views[key].templateUrl))
                templatesToCache.push(definition.views[key].templateUrl);
            }
          }
        }
        return stateProviderState.call($stateProvider, stateName, definition);
      };
    }]).run(['$ionicTemplateCache', function($ionicTemplateCache) {
      $ionicTemplateCache();
    }]);
  })();
  IonicModule.factory('$ionicTemplateLoader', ['$compile', '$controller', '$http', '$q', '$rootScope', '$templateCache', function($compile, $controller, $http, $q, $rootScope, $templateCache) {
    return {
      load: fetchTemplate,
      compile: loadAndCompile
    };
    function fetchTemplate(url) {
      return $http.get(url, {cache: $templateCache}).then(function(response) {
        return response.data && response.data.trim();
      });
    }
    function loadAndCompile(options) {
      options = extend({
        template: '',
        templateUrl: '',
        scope: null,
        controller: null,
        locals: {},
        appendTo: null
      }, options || {});
      var templatePromise = options.templateUrl ? this.load(options.templateUrl) : $q.when(options.template);
      return templatePromise.then(function(template) {
        var controller;
        var scope = options.scope || $rootScope.$new();
        var element = jqLite('<div>').html(template).contents();
        if (options.controller) {
          controller = $controller(options.controller, extend(options.locals, {$scope: scope}));
          element.children().data('$ngControllerController', controller);
        }
        if (options.appendTo) {
          jqLite(options.appendTo).append(element);
        }
        $compile(element)(scope);
        return {
          element: element,
          scope: scope
        };
      });
    }
  }]);
  IonicModule.run(['$rootScope', '$state', '$location', '$document', '$animate', '$ionicPlatform', '$ionicViewService', function($rootScope, $state, $location, $document, $animate, $ionicPlatform, $ionicViewService) {
    $rootScope.$viewHistory = {
      histories: {root: {
          historyId: 'root',
          parentHistoryId: null,
          stack: [],
          cursor: -1
        }},
      views: {},
      backView: null,
      forwardView: null,
      currentView: null,
      disabledRegistrableTagNames: []
    };
    if ($ionicViewService.disableRegisterByTagName) {
      $ionicViewService.disableRegisterByTagName('ion-tabs');
      $ionicViewService.disableRegisterByTagName('ion-side-menus');
    }
    $rootScope.$on('$stateChangeStart', function() {
      ionic.keyboard.hide();
    });
    $rootScope.$on('viewState.changeHistory', function(e, data) {
      if (!data)
        return;
      var hist = (data.historyId ? $rootScope.$viewHistory.histories[data.historyId] : null);
      if (hist && hist.cursor > -1 && hist.cursor < hist.stack.length) {
        var view = hist.stack[hist.cursor];
        return view.go(data);
      }
      if (!data.url && data.uiSref) {
        data.url = $state.href(data.uiSref);
      }
      if (data.url) {
        if (data.url.indexOf('#') === 0) {
          data.url = data.url.replace('#', '');
        }
        if (data.url !== $location.url()) {
          $location.url(data.url);
        }
      }
    });
    $rootScope.$on('viewState.viewEnter', function(e, data) {
      if (data && data.title) {
        $document[0].title = data.title;
      }
    });
    function onHardwareBackButton(e) {
      if ($rootScope.$viewHistory.backView) {
        $rootScope.$viewHistory.backView.go();
      } else {
        ionic.Platform.exitApp();
      }
      e.preventDefault();
      return false;
    }
    $ionicPlatform.registerBackButtonAction(onHardwareBackButton, PLATFORM_BACK_BUTTON_PRIORITY_VIEW);
  }]).factory('$ionicViewService', ['$rootScope', '$state', '$location', '$window', '$injector', '$animate', '$ionicNavViewConfig', '$ionicClickBlock', function($rootScope, $state, $location, $window, $injector, $animate, $ionicNavViewConfig, $ionicClickBlock) {
    var View = function() {};
    View.prototype.initialize = function(data) {
      if (data) {
        for (var name in data)
          this[name] = data[name];
        return this;
      }
      return null;
    };
    View.prototype.go = function() {
      if (this.stateName) {
        return $state.go(this.stateName, this.stateParams);
      }
      if (this.url && this.url !== $location.url()) {
        if ($rootScope.$viewHistory.backView === this) {
          return $window.history.go(-1);
        } else if ($rootScope.$viewHistory.forwardView === this) {
          return $window.history.go(1);
        }
        $location.url(this.url);
        return;
      }
      return null;
    };
    View.prototype.destroy = function() {
      if (this.scope) {
        this.scope.$destroy && this.scope.$destroy();
        this.scope = null;
      }
    };
    function createViewId(stateId) {
      return ionic.Utils.nextUid();
    }
    return {
      register: function(containerScope, element) {
        var viewHistory = $rootScope.$viewHistory,
            currentStateId = this.getCurrentStateId(),
            hist = this._getHistory(containerScope),
            currentView = viewHistory.currentView,
            backView = viewHistory.backView,
            forwardView = viewHistory.forwardView,
            nextViewOptions = this.nextViewOptions(),
            rsp = {
              viewId: null,
              navAction: null,
              navDirection: null,
              historyId: hist.historyId
            };
        if (element && !this.isTagNameRegistrable(element)) {
          rsp.navAction = 'disabledByTagName';
          return rsp;
        }
        if (currentView && currentView.stateId === currentStateId && currentView.historyId === hist.historyId) {
          rsp.navAction = 'noChange';
          return rsp;
        }
        if (viewHistory.forcedNav) {
          ionic.Utils.extend(rsp, viewHistory.forcedNav);
          $rootScope.$viewHistory.forcedNav = null;
        } else if (backView && backView.stateId === currentStateId) {
          rsp.viewId = backView.viewId;
          rsp.navAction = 'moveBack';
          rsp.viewId = backView.viewId;
          if (backView.historyId === currentView.historyId) {
            rsp.navDirection = 'back';
          }
        } else if (forwardView && forwardView.stateId === currentStateId) {
          rsp.viewId = forwardView.viewId;
          rsp.navAction = 'moveForward';
          if (forwardView.historyId === currentView.historyId) {
            rsp.navDirection = 'forward';
          }
          var parentHistory = this._getParentHistoryObj(containerScope);
          if (forwardView.historyId && parentHistory.scope) {
            parentHistory.scope.$historyId = forwardView.historyId;
            rsp.historyId = forwardView.historyId;
          }
        } else if (currentView && currentView.historyId !== hist.historyId && hist.cursor > -1 && hist.stack.length > 0 && hist.cursor < hist.stack.length && hist.stack[hist.cursor].stateId === currentStateId) {
          var switchToView = hist.stack[hist.cursor];
          rsp.viewId = switchToView.viewId;
          rsp.navAction = 'moveBack';
          var switchToViewBackView = this._getViewById(switchToView.backViewId);
          if (switchToViewBackView && switchToView.historyId !== switchToViewBackView.historyId) {
            hist.stack[hist.cursor].backViewId = currentView.viewId;
          }
        } else {
          rsp.viewId = createViewId(currentStateId);
          if (currentView) {
            currentView.forwardViewId = rsp.viewId;
            if (hist.historyId === currentView.historyId) {
              rsp.navDirection = 'forward';
            }
            rsp.navAction = 'newView';
            if (forwardView && currentView.stateId !== forwardView.stateId && currentView.historyId === forwardView.historyId) {
              var forwardsHistory = this._getHistoryById(forwardView.historyId);
              if (forwardsHistory) {
                for (var x = forwardsHistory.stack.length - 1; x >= forwardView.index; x--) {
                  forwardsHistory.stack[x].destroy();
                  forwardsHistory.stack.splice(x);
                }
              }
            }
          } else {
            rsp.navAction = 'initialView';
          }
          viewHistory.views[rsp.viewId] = this.createView({
            viewId: rsp.viewId,
            index: hist.stack.length,
            historyId: hist.historyId,
            backViewId: (currentView && currentView.viewId ? currentView.viewId : null),
            forwardViewId: null,
            stateId: currentStateId,
            stateName: this.getCurrentStateName(),
            stateParams: this.getCurrentStateParams(),
            url: $location.url()
          });
          if (rsp.navAction == 'moveBack') {
            $rootScope.$emit('$viewHistory.viewBack', currentView.viewId, rsp.viewId);
          }
          hist.stack.push(viewHistory.views[rsp.viewId]);
        }
        if (nextViewOptions) {
          if (nextViewOptions.disableAnimate)
            rsp.navDirection = null;
          if (nextViewOptions.disableBack)
            viewHistory.views[rsp.viewId].backViewId = null;
          this.nextViewOptions(null);
        }
        this.setNavViews(rsp.viewId);
        hist.cursor = viewHistory.currentView.index;
        return rsp;
      },
      setNavViews: function(viewId) {
        var viewHistory = $rootScope.$viewHistory;
        viewHistory.currentView = this._getViewById(viewId);
        viewHistory.backView = this._getBackView(viewHistory.currentView);
        viewHistory.forwardView = this._getForwardView(viewHistory.currentView);
        $rootScope.$broadcast('$viewHistory.historyChange', {showBack: (viewHistory.backView && viewHistory.backView.historyId === viewHistory.currentView.historyId)});
      },
      registerHistory: function(scope) {
        scope.$historyId = ionic.Utils.nextUid();
      },
      createView: function(data) {
        var newView = new View();
        return newView.initialize(data);
      },
      getCurrentView: function() {
        return $rootScope.$viewHistory.currentView;
      },
      getBackView: function() {
        return $rootScope.$viewHistory.backView;
      },
      getForwardView: function() {
        return $rootScope.$viewHistory.forwardView;
      },
      getNavDirection: function() {
        return $rootScope.$viewHistory.navDirection;
      },
      getCurrentStateName: function() {
        return ($state && $state.current ? $state.current.name : null);
      },
      isCurrentStateNavView: function(navView) {
        return ($state && $state.current && $state.current.views && $state.current.views[navView] ? true : false);
      },
      getCurrentStateParams: function() {
        var rtn;
        if ($state && $state.params) {
          for (var key in $state.params) {
            if ($state.params.hasOwnProperty(key)) {
              rtn = rtn || {};
              rtn[key] = $state.params[key];
            }
          }
        }
        return rtn;
      },
      getCurrentStateId: function() {
        var id;
        if ($state && $state.current && $state.current.name) {
          id = $state.current.name;
          if ($state.params) {
            for (var key in $state.params) {
              if ($state.params.hasOwnProperty(key) && $state.params[key]) {
                id += "_" + key + "=" + $state.params[key];
              }
            }
          }
          return id;
        }
        return ionic.Utils.nextUid();
      },
      goToHistoryRoot: function(historyId) {
        if (historyId) {
          var hist = $rootScope.$viewHistory.histories[historyId];
          if (hist && hist.stack.length) {
            if ($rootScope.$viewHistory.currentView && $rootScope.$viewHistory.currentView.viewId === hist.stack[0].viewId) {
              return;
            }
            $rootScope.$viewHistory.forcedNav = {
              viewId: hist.stack[0].viewId,
              navAction: 'moveBack',
              navDirection: 'back'
            };
            hist.stack[0].go();
          }
        }
      },
      _getViewById: function(viewId) {
        return (viewId ? $rootScope.$viewHistory.views[viewId] : null);
      },
      _getBackView: function(view) {
        return (view ? this._getViewById(view.backViewId) : null);
      },
      _getForwardView: function(view) {
        return (view ? this._getViewById(view.forwardViewId) : null);
      },
      _getHistoryById: function(historyId) {
        return (historyId ? $rootScope.$viewHistory.histories[historyId] : null);
      },
      _getHistory: function(scope) {
        var histObj = this._getParentHistoryObj(scope);
        if (!$rootScope.$viewHistory.histories[histObj.historyId]) {
          $rootScope.$viewHistory.histories[histObj.historyId] = {
            historyId: histObj.historyId,
            parentHistoryId: this._getParentHistoryObj(histObj.scope.$parent).historyId,
            stack: [],
            cursor: -1
          };
        }
        return $rootScope.$viewHistory.histories[histObj.historyId];
      },
      _getParentHistoryObj: function(scope) {
        var parentScope = scope;
        while (parentScope) {
          if (parentScope.hasOwnProperty('$historyId')) {
            return {
              historyId: parentScope.$historyId,
              scope: parentScope
            };
          }
          parentScope = parentScope.$parent;
        }
        return {
          historyId: 'root',
          scope: $rootScope
        };
      },
      nextViewOptions: function(opts) {
        if (arguments.length) {
          this._nextOpts = opts;
        } else {
          return this._nextOpts;
        }
      },
      getRenderer: function(navViewElement, navViewAttrs, navViewScope) {
        var service = this;
        var registerData;
        var doAnimation;
        var animationClass = getParentAnimationClass(navViewElement[0]);
        function getParentAnimationClass(el) {
          var className = '';
          while (!className && el) {
            className = el.getAttribute('animation');
            el = el.parentElement;
          }
          if (!className) {
            return $ionicNavViewConfig.transition;
          }
          return className;
        }
        function setAnimationClass() {
          if (animationClass) {
            navViewElement[0].classList.add(animationClass);
          }
          if (registerData.navDirection === 'back') {
            navViewElement[0].classList.add('reverse');
          } else {
            navViewElement[0].classList.remove('reverse');
          }
        }
        return function(shouldAnimate) {
          return {
            enter: function(element) {
              if (doAnimation && shouldAnimate) {
                setAnimationClass();
                element.addClass('ng-enter');
                $ionicClickBlock.show();
                $animate.enter(element, navViewElement, null, function() {
                  $ionicClickBlock.hide();
                  if (animationClass) {
                    navViewElement[0].classList.remove(animationClass);
                  }
                });
                return;
              } else if (!doAnimation) {
                $ionicClickBlock.hide();
              }
              navViewElement.append(element);
            },
            leave: function() {
              var element = navViewElement.contents();
              if (doAnimation && shouldAnimate) {
                setAnimationClass();
                $animate.leave(element, function() {
                  element.remove();
                });
                return;
              }
              element.remove();
            },
            register: function(element) {
              registerData = service.register(navViewScope, element);
              doAnimation = (animationClass !== null && registerData.navDirection !== null);
              return registerData;
            }
          };
        };
      },
      disableRegisterByTagName: function(tagName) {
        $rootScope.$viewHistory.disabledRegistrableTagNames.push(tagName.toUpperCase());
      },
      isTagNameRegistrable: function(element) {
        var x,
            y,
            disabledTags = $rootScope.$viewHistory.disabledRegistrableTagNames;
        for (x = 0; x < element.length; x++) {
          if (element[x].nodeType !== 1)
            continue;
          for (y = 0; y < disabledTags.length; y++) {
            if (element[x].tagName === disabledTags[y]) {
              return false;
            }
          }
        }
        return true;
      },
      clearHistory: function() {
        var histories = $rootScope.$viewHistory.histories,
            currentView = $rootScope.$viewHistory.currentView;
        if (histories) {
          for (var historyId in histories) {
            if (histories[historyId].stack) {
              histories[historyId].stack = [];
              histories[historyId].cursor = -1;
            }
            if (currentView && currentView.historyId === historyId) {
              currentView.backViewId = null;
              currentView.forwardViewId = null;
              histories[historyId].stack.push(currentView);
            } else if (histories[historyId].destroy) {
              histories[historyId].destroy();
            }
          }
        }
        for (var viewId in $rootScope.$viewHistory.views) {
          if (viewId !== currentView.viewId) {
            delete $rootScope.$viewHistory.views[viewId];
          }
        }
        if (currentView) {
          this.setNavViews(currentView.viewId);
        }
      }
    };
  }]);
  IonicModule.config(['$provide', function($provide) {
    function $LocationDecorator($location, $timeout) {
      $location.__hash = $location.hash;
      $location.hash = function(value) {
        if (angular.isDefined(value)) {
          $timeout(function() {
            var scroll = document.querySelector('.scroll-content');
            if (scroll)
              scroll.scrollTop = 0;
          }, 0, false);
        }
        return $location.__hash(value);
      };
      return $location;
    }
    $provide.decorator('$location', ['$delegate', '$timeout', $LocationDecorator]);
  }]);
  IonicModule.service('$ionicListDelegate', delegateService(['showReorder', 'showDelete', 'canSwipeItems', 'closeOptionButtons'])).controller('$ionicList', ['$scope', '$attrs', '$parse', '$ionicListDelegate', function($scope, $attrs, $parse, $ionicListDelegate) {
    var isSwipeable = true;
    var isReorderShown = false;
    var isDeleteShown = false;
    var deregisterInstance = $ionicListDelegate._registerInstance(this, $attrs.delegateHandle);
    $scope.$on('$destroy', deregisterInstance);
    this.showReorder = function(show) {
      if (arguments.length) {
        isReorderShown = !!show;
      }
      return isReorderShown;
    };
    this.showDelete = function(show) {
      if (arguments.length) {
        isDeleteShown = !!show;
      }
      return isDeleteShown;
    };
    this.canSwipeItems = function(can) {
      if (arguments.length) {
        isSwipeable = !!can;
      }
      return isSwipeable;
    };
    this.closeOptionButtons = function() {
      this.listView && this.listView.clearDragEffects();
    };
  }]);
  IonicModule.controller('$ionicNavBar', ['$scope', '$element', '$attrs', '$ionicViewService', '$animate', '$compile', '$ionicNavBarDelegate', function($scope, $element, $attrs, $ionicViewService, $animate, $compile, $ionicNavBarDelegate) {
    $element.parent().data('$ionNavBarController', this);
    var deregisterInstance = $ionicNavBarDelegate._registerInstance(this, $attrs.delegateHandle);
    $scope.$on('$destroy', deregisterInstance);
    $scope.$on('$viewHistory.historyChange', function(e, data) {
      backIsShown = !!data.showBack;
    });
    var self = this;
    this.leftButtonsElement = jqLite($element[0].querySelector('.buttons.left-buttons'));
    this.rightButtonsElement = jqLite($element[0].querySelector('.buttons.right-buttons'));
    this.back = function() {
      var backView = $ionicViewService.getBackView();
      backView && backView.go();
      return false;
    };
    this.align = function(direction) {
      this._headerBarView.align(direction);
    };
    this.showBackButton = function(show) {
      if (arguments.length) {
        $scope.backButtonShown = !!show;
      }
      return !!($scope.hasBackButton && $scope.backButtonShown);
    };
    this.showBar = function(show) {
      if (arguments.length) {
        $scope.isInvisible = !show;
        $scope.$parent.$hasHeader = !!show;
      }
      return !$scope.isInvisible;
    };
    this.setTitle = function(title) {
      if ($scope.title === title) {
        return;
      }
      $scope.oldTitle = $scope.title;
      $scope.title = title || '';
    };
    this.changeTitle = function(title, direction) {
      if ($scope.title === title) {
        if (typeof backIsShown != 'undefined' && !backIsShown && $scope.backButtonShown) {
          jqLite($element[0].querySelector('.back-button')).addClass('ng-hide');
        }
        return false;
      }
      this.setTitle(title);
      $scope.isReverse = direction == 'back';
      $scope.shouldAnimate = !!direction;
      if (!$scope.shouldAnimate) {
        this._headerBarView.align();
      } else {
        this._animateTitles();
      }
      return true;
    };
    this.getTitle = function() {
      return $scope.title || '';
    };
    this.getPreviousTitle = function() {
      return $scope.oldTitle || '';
    };
    this._animateTitles = function() {
      var oldTitleEl,
          newTitleEl,
          currentTitles;
      currentTitles = $element[0].querySelectorAll('.title');
      if (currentTitles.length) {
        oldTitleEl = $compile('<h1 class="title" ng-bind-html="oldTitle"></h1>')($scope);
        jqLite(currentTitles[currentTitles.length - 1]).replaceWith(oldTitleEl);
      }
      newTitleEl = $compile('<h1 class="title invisible" ng-bind-html="title"></h1>')($scope);
      ionic.requestAnimationFrame(function() {
        oldTitleEl && $animate.leave(jqLite(oldTitleEl));
        var insert = oldTitleEl && jqLite(oldTitleEl) || null;
        $animate.enter(newTitleEl, $element, insert, function() {
          self._headerBarView.align();
        });
        forEach(currentTitles, function(el) {
          if (el && el.parentNode) {
            jqLite(el).remove();
          }
        });
        $scope.$digest();
        ionic.requestAnimationFrame(function() {
          newTitleEl[0].classList.remove('invisible');
        });
      });
    };
  }]);
  IonicModule.factory('$$scrollValueCache', function() {
    return {};
  }).controller('$ionicScroll', ['$scope', 'scrollViewOptions', '$timeout', '$window', '$$scrollValueCache', '$location', '$rootScope', '$document', '$ionicScrollDelegate', function($scope, scrollViewOptions, $timeout, $window, $$scrollValueCache, $location, $rootScope, $document, $ionicScrollDelegate) {
    var self = this;
    this.__timeout = $timeout;
    this._scrollViewOptions = scrollViewOptions;
    var element = this.element = scrollViewOptions.el;
    var $element = this.$element = jqLite(element);
    var scrollView = this.scrollView = new ionic.views.Scroll(scrollViewOptions);
    ($element.parent().length ? $element.parent() : $element).data('$$ionicScrollController', this);
    var deregisterInstance = $ionicScrollDelegate._registerInstance(this, scrollViewOptions.delegateHandle);
    if (!angular.isDefined(scrollViewOptions.bouncing)) {
      ionic.Platform.ready(function() {
        scrollView.options.bouncing = true;
        if (ionic.Platform.isAndroid()) {
          scrollView.options.bouncing = false;
          scrollView.options.deceleration = 0.95;
        } else {}
      });
    }
    var resize = angular.bind(scrollView, scrollView.resize);
    ionic.on('resize', resize, $window);
    var backListenDone = angular.noop;
    var viewContentLoaded = angular.noop;
    var scrollFunc = function(e) {
      var detail = (e.originalEvent || e).detail || {};
      $scope.$onScroll && $scope.$onScroll({
        event: e,
        scrollTop: detail.scrollTop || 0,
        scrollLeft: detail.scrollLeft || 0
      });
    };
    $element.on('scroll', scrollFunc);
    $scope.$on('$destroy', function() {
      deregisterInstance();
      scrollView.__cleanup();
      ionic.off('resize', resize, $window);
      $window.removeEventListener('resize', resize);
      viewContentLoaded();
      backListenDone();
      if (self._rememberScrollId) {
        $$scrollValueCache[self._rememberScrollId] = scrollView.getValues();
      }
      scrollViewOptions = null;
      self._scrollViewOptions = null;
      self.element = null;
      $element.off('scroll', scrollFunc);
      $element = null;
      self.$element = null;
      self.scrollView = null;
      scrollView = null;
    });
    viewContentLoaded = $scope.$on('$viewContentLoaded', function(e, historyData) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      var viewId = historyData && historyData.viewId || $scope.$historyId;
      if (viewId) {
        $timeout(function() {
          self.rememberScrollPosition(viewId);
          self.scrollToRememberedPosition();
          backListenDone = $rootScope.$on('$viewHistory.viewBack', function(e, fromViewId, toViewId) {
            if (viewId === fromViewId) {
              self.forgetScrollPosition();
            }
          });
        }, 0, false);
      }
    });
    $timeout(function() {
      scrollView && scrollView.run && scrollView.run();
    });
    this._rememberScrollId = null;
    this.getScrollView = function() {
      return this.scrollView;
    };
    this.getScrollPosition = function() {
      return this.scrollView.getValues();
    };
    this.resize = function() {
      return $timeout(resize).then(function() {
        $element && $element.triggerHandler('scroll.resize');
      });
    };
    this.scrollTop = function(shouldAnimate) {
      this.resize().then(function() {
        scrollView.scrollTo(0, 0, !!shouldAnimate);
      });
    };
    this.scrollBottom = function(shouldAnimate) {
      this.resize().then(function() {
        var max = scrollView.getScrollMax();
        scrollView.scrollTo(max.left, max.top, !!shouldAnimate);
      });
    };
    this.scrollTo = function(left, top, shouldAnimate) {
      this.resize().then(function() {
        scrollView.scrollTo(left, top, !!shouldAnimate);
      });
    };
    this.zoomTo = function(zoom, shouldAnimate, originLeft, originTop) {
      this.resize().then(function() {
        scrollView.zoomTo(zoom, !!shouldAnimate, originLeft, originTop);
      });
    };
    this.zoomBy = function(zoom, shouldAnimate, originLeft, originTop) {
      this.resize().then(function() {
        scrollView.zoomBy(zoom, !!shouldAnimate, originLeft, originTop);
      });
    };
    this.scrollBy = function(left, top, shouldAnimate) {
      this.resize().then(function() {
        scrollView.scrollBy(left, top, !!shouldAnimate);
      });
    };
    this.anchorScroll = function(shouldAnimate) {
      this.resize().then(function() {
        var hash = $location.hash();
        var elm = hash && $document[0].getElementById(hash);
        if (!(hash && elm)) {
          scrollView.scrollTo(0, 0, !!shouldAnimate);
          return;
        }
        var curElm = elm;
        var scrollLeft = 0,
            scrollTop = 0,
            levelsClimbed = 0;
        do {
          if (curElm !== null)
            scrollLeft += curElm.offsetLeft;
          if (curElm !== null)
            scrollTop += curElm.offsetTop;
          curElm = curElm.offsetParent;
          levelsClimbed++;
        } while (curElm.attributes != self.element.attributes && curElm.offsetParent);
        scrollView.scrollTo(scrollLeft, scrollTop, !!shouldAnimate);
      });
    };
    this.rememberScrollPosition = function(id) {
      if (!id) {
        throw new Error("Must supply an id to remember the scroll by!");
      }
      this._rememberScrollId = id;
    };
    this.forgetScrollPosition = function() {
      delete $$scrollValueCache[this._rememberScrollId];
      this._rememberScrollId = null;
    };
    this.scrollToRememberedPosition = function(shouldAnimate) {
      var values = $$scrollValueCache[this._rememberScrollId];
      if (values) {
        this.resize().then(function() {
          scrollView && scrollView.scrollTo && scrollView.scrollTo(+values.left, +values.top, shouldAnimate);
        });
      }
    };
    this._setRefresher = function(refresherScope, refresherElement) {
      var refresher = this.refresher = refresherElement;
      var refresherHeight = self.refresher.clientHeight || 60;
      scrollView.activatePullToRefresh(refresherHeight, function() {
        refresher.classList.add('active');
        refresherScope.$onPulling();
      }, function() {
        $timeout(function() {
          refresher.classList.remove('active');
          refresher.classList.remove('refreshing');
          refresher.classList.remove('refreshing-tail');
          refresher.classList.add('invisible');
        }, 300);
      }, function() {
        refresher.classList.add('refreshing');
        refresherScope.$onRefresh();
      }, function() {
        refresher.classList.remove('invisible');
      }, function() {
        refresher.classList.add('invisible');
      }, function() {
        refresher.classList.add('refreshing-tail');
      });
    };
  }]);
  IonicModule.controller('$ionicSideMenus', ['$scope', '$attrs', '$ionicSideMenuDelegate', '$ionicPlatform', '$ionicBody', function($scope, $attrs, $ionicSideMenuDelegate, $ionicPlatform, $ionicBody) {
    var self = this;
    var rightShowing,
        leftShowing,
        isDragging;
    var startX,
        lastX,
        offsetX,
        isAsideExposed;
    self.$scope = $scope;
    self.initialize = function(options) {
      self.left = options.left;
      self.right = options.right;
      self.setContent(options.content);
      self.dragThresholdX = options.dragThresholdX || 10;
    };
    self.setContent = function(content) {
      if (content) {
        self.content = content;
        self.content.onDrag = function(e) {
          self._handleDrag(e);
        };
        self.content.endDrag = function(e) {
          self._endDrag(e);
        };
      }
    };
    self.isOpenLeft = function() {
      return self.getOpenAmount() > 0;
    };
    self.isOpenRight = function() {
      return self.getOpenAmount() < 0;
    };
    self.toggleLeft = function(shouldOpen) {
      if (isAsideExposed || !self.left.isEnabled)
        return;
      var openAmount = self.getOpenAmount();
      if (arguments.length === 0) {
        shouldOpen = openAmount <= 0;
      }
      self.content.enableAnimation();
      if (!shouldOpen) {
        self.openPercentage(0);
      } else {
        self.openPercentage(100);
      }
    };
    self.toggleRight = function(shouldOpen) {
      if (isAsideExposed || !self.right.isEnabled)
        return;
      var openAmount = self.getOpenAmount();
      if (arguments.length === 0) {
        shouldOpen = openAmount >= 0;
      }
      self.content.enableAnimation();
      if (!shouldOpen) {
        self.openPercentage(0);
      } else {
        self.openPercentage(-100);
      }
    };
    self.close = function() {
      self.openPercentage(0);
    };
    self.getOpenAmount = function() {
      return self.content && self.content.getTranslateX() || 0;
    };
    self.getOpenRatio = function() {
      var amount = self.getOpenAmount();
      if (amount >= 0) {
        return amount / self.left.width;
      }
      return amount / self.right.width;
    };
    self.isOpen = function() {
      return self.getOpenAmount() !== 0;
    };
    self.getOpenPercentage = function() {
      return self.getOpenRatio() * 100;
    };
    self.openPercentage = function(percentage) {
      var p = percentage / 100;
      if (self.left && percentage >= 0) {
        self.openAmount(self.left.width * p);
      } else if (self.right && percentage < 0) {
        var maxRight = self.right.width;
        self.openAmount(self.right.width * p);
      }
      $ionicBody.enableClass((percentage !== 0), 'menu-open');
    };
    self.openAmount = function(amount) {
      var maxLeft = self.left && self.left.width || 0;
      var maxRight = self.right && self.right.width || 0;
      if (!(self.left && self.left.isEnabled) && amount > 0) {
        self.content.setTranslateX(0);
        return;
      }
      if (!(self.right && self.right.isEnabled) && amount < 0) {
        self.content.setTranslateX(0);
        return;
      }
      if (leftShowing && amount > maxLeft) {
        self.content.setTranslateX(maxLeft);
        return;
      }
      if (rightShowing && amount < -maxRight) {
        self.content.setTranslateX(-maxRight);
        return;
      }
      self.content.setTranslateX(amount);
      if (amount >= 0) {
        leftShowing = true;
        rightShowing = false;
        if (amount > 0) {
          self.right && self.right.pushDown && self.right.pushDown();
          self.left && self.left.bringUp && self.left.bringUp();
        }
      } else {
        rightShowing = true;
        leftShowing = false;
        self.right && self.right.bringUp && self.right.bringUp();
        self.left && self.left.pushDown && self.left.pushDown();
      }
    };
    self.snapToRest = function(e) {
      self.content.enableAnimation();
      isDragging = false;
      var ratio = self.getOpenRatio();
      if (ratio === 0) {
        self.openPercentage(0);
        return;
      }
      var velocityThreshold = 0.3;
      var velocityX = e.gesture.velocityX;
      var direction = e.gesture.direction;
      if (ratio > 0 && ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
        self.openPercentage(0);
      } else if (ratio > 0.5 && direction == 'left' && velocityX < velocityThreshold) {
        self.openPercentage(100);
      } else if (ratio < 0 && ratio > -0.5 && direction == 'left' && velocityX < velocityThreshold) {
        self.openPercentage(0);
      } else if (ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
        self.openPercentage(-100);
      } else if (direction == 'right' && ratio >= 0 && (ratio >= 0.5 || velocityX > velocityThreshold)) {
        self.openPercentage(100);
      } else if (direction == 'left' && ratio <= 0 && (ratio <= -0.5 || velocityX > velocityThreshold)) {
        self.openPercentage(-100);
      } else {
        self.openPercentage(0);
      }
    };
    self.isAsideExposed = function() {
      return !!isAsideExposed;
    };
    self.exposeAside = function(shouldExposeAside) {
      if (!self.left || !self.left.isEnabled)
        return;
      self.close();
      isAsideExposed = shouldExposeAside;
      self.content.setMarginLeft(isAsideExposed ? self.left.width : 0);
      self.$scope.$emit('$ionicExposeAside', isAsideExposed);
    };
    self.activeAsideResizing = function(isResizing) {
      $ionicBody.enableClass(isResizing, 'aside-resizing');
    };
    self._endDrag = function(e) {
      if (isAsideExposed)
        return;
      if (isDragging) {
        self.snapToRest(e);
      }
      startX = null;
      lastX = null;
      offsetX = null;
    };
    self._handleDrag = function(e) {
      if (isAsideExposed)
        return;
      if (!startX) {
        startX = e.gesture.touches[0].pageX;
        lastX = startX;
      } else {
        lastX = e.gesture.touches[0].pageX;
      }
      if (!isDragging && Math.abs(lastX - startX) > self.dragThresholdX) {
        startX = lastX;
        isDragging = true;
        self.content.disableAnimation();
        offsetX = self.getOpenAmount();
      }
      if (isDragging) {
        self.openAmount(offsetX + (lastX - startX));
      }
    };
    self.canDragContent = function(canDrag) {
      if (arguments.length) {
        $scope.dragContent = !!canDrag;
      }
      return $scope.dragContent;
    };
    self.edgeThreshold = 25;
    self.edgeThresholdEnabled = false;
    self.edgeDragThreshold = function(value) {
      if (arguments.length) {
        if (angular.isNumber(value) && value > 0) {
          self.edgeThreshold = value;
          self.edgeThresholdEnabled = true;
        } else {
          self.edgeThresholdEnabled = !!value;
        }
      }
      return self.edgeThresholdEnabled;
    };
    self.isDraggableTarget = function(e) {
      var shouldOnlyAllowEdgeDrag = self.edgeThresholdEnabled && !self.isOpen();
      var startX = e.gesture.startEvent && e.gesture.startEvent.center && e.gesture.startEvent.center.pageX;
      var dragIsWithinBounds = !shouldOnlyAllowEdgeDrag || startX <= self.edgeThreshold || startX >= self.content.element.offsetWidth - self.edgeThreshold;
      return ($scope.dragContent || self.isOpen()) && dragIsWithinBounds && !e.gesture.srcEvent.defaultPrevented && !e.target.tagName.match(/input|textarea|select|object|embed/i) && !e.target.isContentEditable && !(e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute('data-prevent-scroll') == 'true');
    };
    $scope.sideMenuContentTranslateX = 0;
    var deregisterBackButtonAction = angular.noop;
    var closeSideMenu = angular.bind(self, self.close);
    $scope.$watch(function() {
      return self.getOpenAmount() !== 0;
    }, function(isOpen) {
      deregisterBackButtonAction();
      if (isOpen) {
        deregisterBackButtonAction = $ionicPlatform.registerBackButtonAction(closeSideMenu, PLATFORM_BACK_BUTTON_PRIORITY_SIDE_MENU);
      }
    });
    var deregisterInstance = $ionicSideMenuDelegate._registerInstance(self, $attrs.delegateHandle);
    $scope.$on('$destroy', function() {
      deregisterInstance();
      deregisterBackButtonAction();
    });
    self.initialize({
      left: {width: 275},
      right: {width: 275}
    });
  }]);
  IonicModule.controller('$ionicTab', ['$scope', '$ionicViewService', '$attrs', '$location', '$state', function($scope, $ionicViewService, $attrs, $location, $state) {
    this.$scope = $scope;
    this.hrefMatchesState = function() {
      return $attrs.href && $location.path().indexOf($attrs.href.replace(/^#/, '').replace(/\/$/, '')) === 0;
    };
    this.srefMatchesState = function() {
      return $attrs.uiSref && $state.includes($attrs.uiSref.split('(')[0]);
    };
    this.navNameMatchesState = function() {
      return this.navViewName && $ionicViewService.isCurrentStateNavView(this.navViewName);
    };
    this.tabMatchesState = function() {
      return this.hrefMatchesState() || this.srefMatchesState() || this.navNameMatchesState();
    };
  }]);
  IonicModule.controller('$ionicTabs', ['$scope', '$ionicViewService', '$element', function($scope, $ionicViewService, $element) {
    var _selectedTab = null;
    var self = this;
    self.tabs = [];
    self.selectedIndex = function() {
      return self.tabs.indexOf(_selectedTab);
    };
    self.selectedTab = function() {
      return _selectedTab;
    };
    self.add = function(tab) {
      $ionicViewService.registerHistory(tab);
      self.tabs.push(tab);
      if (self.tabs.length === 1) {
        self.select(tab);
      }
    };
    self.remove = function(tab) {
      var tabIndex = self.tabs.indexOf(tab);
      if (tabIndex === -1) {
        return;
      }
      if (tab.$tabSelected) {
        self.deselect(tab);
        if (self.tabs.length === 1) {} else {
          var newTabIndex = tabIndex === self.tabs.length - 1 ? tabIndex - 1 : tabIndex + 1;
          self.select(self.tabs[newTabIndex]);
        }
      }
      self.tabs.splice(tabIndex, 1);
    };
    self.deselect = function(tab) {
      if (tab.$tabSelected) {
        _selectedTab = null;
        tab.$tabSelected = false;
        (tab.onDeselect || angular.noop)();
      }
    };
    self.select = function(tab, shouldEmitEvent) {
      var tabIndex;
      if (angular.isNumber(tab)) {
        tabIndex = tab;
        tab = self.tabs[tabIndex];
      } else {
        tabIndex = self.tabs.indexOf(tab);
      }
      if (arguments.length === 1) {
        shouldEmitEvent = !!(tab.navViewName || tab.uiSref);
      }
      if (_selectedTab && _selectedTab.$historyId == tab.$historyId) {
        if (shouldEmitEvent) {
          $ionicViewService.goToHistoryRoot(tab.$historyId);
        }
      } else {
        forEach(self.tabs, function(tab) {
          self.deselect(tab);
        });
        _selectedTab = tab;
        tab.$tabSelected = true;
        (tab.onSelect || angular.noop)();
        if (shouldEmitEvent) {
          var viewData = {
            type: 'tab',
            tabIndex: tabIndex,
            historyId: tab.$historyId,
            navViewName: tab.navViewName,
            hasNavView: !!tab.navViewName,
            title: tab.title,
            url: tab.href,
            uiSref: tab.uiSref
          };
          $scope.$emit('viewState.changeHistory', viewData);
        }
      }
    };
  }]);
  IonicModule.directive('ionActionSheet', ['$document', function($document) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      link: function($scope, $element) {
        var keyUp = function(e) {
          if (e.which == 27) {
            $scope.cancel();
            $scope.$apply();
          }
        };
        var backdropClick = function(e) {
          if (e.target == $element[0]) {
            $scope.cancel();
            $scope.$apply();
          }
        };
        $scope.$on('$destroy', function() {
          $element.remove();
          $document.unbind('keyup', keyUp);
        });
        $document.bind('keyup', keyUp);
        $element.bind('click', backdropClick);
      },
      template: '<div class="action-sheet-backdrop">' + '<div class="action-sheet-wrapper">' + '<div class="action-sheet">' + '<div class="action-sheet-group">' + '<div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div>' + '<button class="button" ng-click="buttonClicked($index)" ng-repeat="button in buttons" ng-bind-html="button.text"></button>' + '</div>' + '<div class="action-sheet-group" ng-if="destructiveText">' + '<button class="button destructive" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button>' + '</div>' + '<div class="action-sheet-group" ng-if="cancelText">' + '<button class="button" ng-click="cancel()" ng-bind-html="cancelText"></button>' + '</div>' + '</div>' + '</div>' + '</div>'
    };
  }]);
  IonicModule.directive('ionCheckbox', function() {
    return {
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      transclude: true,
      template: '<label class="item item-checkbox">' + '<div class="checkbox checkbox-input-hidden disable-pointer-events">' + '<input type="checkbox">' + '<i class="checkbox-icon"></i>' + '</div>' + '<div class="item-content disable-pointer-events" ng-transclude></div>' + '</label>',
      compile: function(element, attr) {
        var input = element.find('input');
        forEach({
          'name': attr.name,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-checked': attr.ngChecked,
          'ng-disabled': attr.ngDisabled,
          'ng-true-value': attr.ngTrueValue,
          'ng-false-value': attr.ngFalseValue,
          'ng-change': attr.ngChange
        }, function(value, name) {
          if (isDefined(value)) {
            input.attr(name, value);
          }
        });
      }
    };
  });
  var COLLECTION_REPEAT_SCROLLVIEW_XY_ERROR = "Cannot create a collection-repeat within a scrollView that is scrollable on both x and y axis.  Choose either x direction or y direction.";
  var COLLECTION_REPEAT_ATTR_HEIGHT_ERROR = "collection-repeat expected attribute collection-item-height to be a an expression that returns a number (in pixels) or percentage.";
  var COLLECTION_REPEAT_ATTR_WIDTH_ERROR = "collection-repeat expected attribute collection-item-width to be a an expression that returns a number (in pixels) or percentage.";
  var COLLECTION_REPEAT_ATTR_REPEAT_ERROR = "collection-repeat expected expression in form of '_item_ in _collection_[ track by _id_]' but got '%'";
  IonicModule.directive('collectionRepeat', ['$collectionRepeatManager', '$collectionDataSource', '$parse', function($collectionRepeatManager, $collectionDataSource, $parse) {
    return {
      priority: 1000,
      transclude: 'element',
      terminal: true,
      $$tlb: true,
      require: '^$ionicScroll',
      controller: [function() {}],
      link: function($scope, $element, $attr, scrollCtrl, $transclude) {
        var wrap = jqLite('<div style="position:relative;">');
        $element.parent()[0].insertBefore(wrap[0], $element[0]);
        wrap.append($element);
        var scrollView = scrollCtrl.scrollView;
        if (scrollView.options.scrollingX && scrollView.options.scrollingY) {
          throw new Error(COLLECTION_REPEAT_SCROLLVIEW_XY_ERROR);
        }
        var isVertical = !!scrollView.options.scrollingY;
        if (isVertical && !$attr.collectionItemHeight) {
          throw new Error(COLLECTION_REPEAT_ATTR_HEIGHT_ERROR);
        } else if (!isVertical && !$attr.collectionItemWidth) {
          throw new Error(COLLECTION_REPEAT_ATTR_WIDTH_ERROR);
        }
        var heightParsed = $parse($attr.collectionItemHeight || '"100%"');
        var widthParsed = $parse($attr.collectionItemWidth || '"100%"');
        var heightGetter = function(scope, locals) {
          var result = heightParsed(scope, locals);
          if (isString(result) && result.indexOf('%') > -1) {
            return Math.floor(parseInt(result, 10) / 100 * scrollView.__clientHeight);
          }
          return result;
        };
        var widthGetter = function(scope, locals) {
          var result = widthParsed(scope, locals);
          if (isString(result) && result.indexOf('%') > -1) {
            return Math.floor(parseInt(result, 10) / 100 * scrollView.__clientWidth);
          }
          return result;
        };
        var match = $attr.collectionRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
        if (!match) {
          throw new Error(COLLECTION_REPEAT_ATTR_REPEAT_ERROR.replace('%', $attr.collectionRepeat));
        }
        var keyExpr = match[1];
        var listExpr = match[2];
        var trackByExpr = match[3];
        var dataSource = new $collectionDataSource({
          scope: $scope,
          transcludeFn: $transclude,
          transcludeParent: $element.parent(),
          keyExpr: keyExpr,
          listExpr: listExpr,
          trackByExpr: trackByExpr,
          heightGetter: heightGetter,
          widthGetter: widthGetter
        });
        var collectionRepeatManager = new $collectionRepeatManager({
          dataSource: dataSource,
          element: scrollCtrl.$element,
          scrollView: scrollCtrl.scrollView
        });
        $scope.$watchCollection(listExpr, function(value) {
          if (value && !angular.isArray(value)) {
            throw new Error("collection-repeat expects an array to repeat over, but instead got '" + typeof value + "'.");
          }
          rerender(value);
        });
        var scrollViewContent = scrollCtrl.scrollView.__content;
        function rerender(value) {
          var beforeSiblings = [];
          var afterSiblings = [];
          var before = true;
          forEach(scrollViewContent.children, function(node, i) {
            if (ionic.DomUtil.elementIsDescendant($element[0], node, scrollViewContent)) {
              before = false;
            } else {
              if (node.hasAttribute('collection-repeat-ignore'))
                return;
              var width = node.offsetWidth;
              var height = node.offsetHeight;
              if (width && height) {
                var element = jqLite(node);
                (before ? beforeSiblings : afterSiblings).push({
                  width: node.offsetWidth,
                  height: node.offsetHeight,
                  element: element,
                  scope: element.isolateScope() || element.scope(),
                  isOutside: true
                });
              }
            }
          });
          scrollView.resize();
          dataSource.setData(value, beforeSiblings, afterSiblings);
          collectionRepeatManager.resize();
        }
        function rerenderOnResize() {
          rerender($scope.$eval(listExpr));
        }
        scrollCtrl.$element.on('scroll.resize', rerenderOnResize);
        ionic.on('resize', rerenderOnResize, window);
        $scope.$on('$destroy', function() {
          collectionRepeatManager.destroy();
          dataSource.destroy();
          ionic.off('resize', rerenderOnResize, window);
        });
      }
    };
  }]).directive({
    ngSrc: collectionRepeatSrcDirective('ngSrc', 'src'),
    ngSrcset: collectionRepeatSrcDirective('ngSrcset', 'srcset'),
    ngHref: collectionRepeatSrcDirective('ngHref', 'href')
  });
  function collectionRepeatSrcDirective(ngAttrName, attrName) {
    return [function() {
      return {
        priority: '99',
        link: function(scope, element, attr) {
          attr.$observe(ngAttrName, function(value) {
            if (!value) {
              element[0].removeAttribute(attrName);
            }
          });
        }
      };
    }];
  }
  IonicModule.directive('ionContent', ['$timeout', '$controller', '$ionicBind', function($timeout, $controller, $ionicBind) {
    return {
      restrict: 'E',
      require: '^?ionNavView',
      scope: true,
      priority: 800,
      compile: function(element, attr) {
        var innerElement;
        element.addClass('scroll-content ionic-scroll');
        if (attr.scroll != 'false') {
          innerElement = jqLite('<div class="scroll"></div>');
          innerElement.append(element.contents());
          element.append(innerElement);
        } else {
          element.addClass('scroll-content-false');
        }
        return {pre: prelink};
        function prelink($scope, $element, $attr, navViewCtrl) {
          var parentScope = $scope.$parent;
          $scope.$watch(function() {
            return (parentScope.$hasHeader ? ' has-header' : '') + (parentScope.$hasSubheader ? ' has-subheader' : '') + (parentScope.$hasFooter ? ' has-footer' : '') + (parentScope.$hasSubfooter ? ' has-subfooter' : '') + (parentScope.$hasTabs ? ' has-tabs' : '') + (parentScope.$hasTabsTop ? ' has-tabs-top' : '');
          }, function(className, oldClassName) {
            $element.removeClass(oldClassName);
            $element.addClass(className);
          });
          $scope.$hasHeader = $scope.$hasSubheader = $scope.$hasFooter = $scope.$hasSubfooter = $scope.$hasTabs = $scope.$hasTabsTop = false;
          $ionicBind($scope, $attr, {
            $onScroll: '&onScroll',
            $onScrollComplete: '&onScrollComplete',
            hasBouncing: '@',
            padding: '@',
            direction: '@',
            scrollbarX: '@',
            scrollbarY: '@',
            startX: '@',
            startY: '@',
            scrollEventInterval: '@'
          });
          $scope.direction = $scope.direction || 'y';
          if (angular.isDefined($attr.padding)) {
            $scope.$watch($attr.padding, function(newVal) {
              (innerElement || $element).toggleClass('padding', !!newVal);
            });
          }
          if ($attr.scroll === "false") {} else if (attr.overflowScroll === "true") {
            $element.addClass('overflow-scroll');
          } else {
            var scrollViewOptions = {
              el: $element[0],
              delegateHandle: attr.delegateHandle,
              locking: (attr.locking || 'true') === 'true',
              bouncing: $scope.$eval($scope.hasBouncing),
              startX: $scope.$eval($scope.startX) || 0,
              startY: $scope.$eval($scope.startY) || 0,
              scrollbarX: $scope.$eval($scope.scrollbarX) !== false,
              scrollbarY: $scope.$eval($scope.scrollbarY) !== false,
              scrollingX: $scope.direction.indexOf('x') >= 0,
              scrollingY: $scope.direction.indexOf('y') >= 0,
              scrollEventInterval: parseInt($scope.scrollEventInterval, 10) || 10,
              scrollingComplete: function() {
                $scope.$onScrollComplete({
                  scrollTop: this.__scrollTop,
                  scrollLeft: this.__scrollLeft
                });
              }
            };
            $controller('$ionicScroll', {
              $scope: $scope,
              scrollViewOptions: scrollViewOptions
            });
            $scope.$on('$destroy', function() {
              scrollViewOptions.scrollingComplete = angular.noop;
              delete scrollViewOptions.el;
              innerElement = null;
              $element = null;
              attr.$$element = null;
            });
          }
        }
      }
    };
  }]);
  IonicModule.directive('exposeAsideWhen', ['$window', function($window) {
    return {
      restrict: 'A',
      require: '^ionSideMenus',
      link: function($scope, $element, $attr, sideMenuCtrl) {
        function checkAsideExpose() {
          var mq = $attr.exposeAsideWhen == 'large' ? '(min-width:768px)' : $attr.exposeAsideWhen;
          sideMenuCtrl.exposeAside($window.matchMedia(mq).matches);
          sideMenuCtrl.activeAsideResizing(false);
        }
        function onResize() {
          sideMenuCtrl.activeAsideResizing(true);
          debouncedCheck();
        }
        var debouncedCheck = ionic.debounce(function() {
          $scope.$apply(function() {
            checkAsideExpose();
          });
        }, 300, false);
        checkAsideExpose();
        ionic.on('resize', onResize, $window);
        $scope.$on('$destroy', function() {
          ionic.off('resize', onResize, $window);
        });
      }
    };
  }]);
  var GESTURE_DIRECTIVES = 'onHold onTap onTouch onRelease onDrag onDragUp onDragRight onDragDown onDragLeft onSwipe onSwipeUp onSwipeRight onSwipeDown onSwipeLeft'.split(' ');
  GESTURE_DIRECTIVES.forEach(function(name) {
    IonicModule.directive(name, gestureDirective(name));
  });
  function gestureDirective(directiveName) {
    return ['$ionicGesture', '$parse', function($ionicGesture, $parse) {
      var eventType = directiveName.substr(2).toLowerCase();
      return function(scope, element, attr) {
        var fn = $parse(attr[directiveName]);
        var listener = function(ev) {
          scope.$apply(function() {
            fn(scope, {$event: ev});
          });
        };
        var gesture = $ionicGesture.on(eventType, listener, element);
        scope.$on('$destroy', function() {
          $ionicGesture.off(gesture, eventType, listener);
        });
      };
    }];
  }
  IonicModule.directive('ionNavBar', tapScrollToTopDirective()).directive('ionHeaderBar', tapScrollToTopDirective()).directive('ionHeaderBar', headerFooterBarDirective(true)).directive('ionFooterBar', headerFooterBarDirective(false));
  function tapScrollToTopDirective() {
    return ['$ionicScrollDelegate', function($ionicScrollDelegate) {
      return {
        restrict: 'E',
        link: function($scope, $element, $attr) {
          if ($attr.noTapScroll == 'true') {
            return;
          }
          ionic.on('tap', onTap, $element[0]);
          $scope.$on('$destroy', function() {
            ionic.off('tap', onTap, $element[0]);
          });
          function onTap(e) {
            var depth = 3;
            var current = e.target;
            while (depth-- && current) {
              if (current.classList.contains('button') || current.tagName.match(/input|textarea|select/i) || current.isContentEditable) {
                return;
              }
              current = current.parentNode;
            }
            var touch = e.gesture && e.gesture.touches[0] || e.detail.touches[0];
            var bounds = $element[0].getBoundingClientRect();
            if (ionic.DomUtil.rectContains(touch.pageX, touch.pageY, bounds.left, bounds.top - 20, bounds.left + bounds.width, bounds.top + bounds.height)) {
              $ionicScrollDelegate.scrollTop(true);
            }
          }
        }
      };
    }];
  }
  function headerFooterBarDirective(isHeader) {
    return [function() {
      return {
        restrict: 'E',
        compile: function($element, $attr) {
          $element.addClass(isHeader ? 'bar bar-header' : 'bar bar-footer');
          var parent = $element[0].parentNode;
          if (parent.querySelector('.tabs-top'))
            $element.addClass('has-tabs-top');
          return {pre: prelink};
          function prelink($scope, $element, $attr) {
            var hb = new ionic.views.HeaderBar({
              el: $element[0],
              alignTitle: $attr.alignTitle || 'center'
            });
            var el = $element[0];
            if (isHeader) {
              $scope.$watch(function() {
                return el.className;
              }, function(value) {
                var isShown = value.indexOf('ng-hide') === -1;
                var isSubheader = value.indexOf('bar-subheader') !== -1;
                $scope.$hasHeader = isShown && !isSubheader;
                $scope.$hasSubheader = isShown && isSubheader;
              });
              $scope.$on('$destroy', function() {
                delete $scope.$hasHeader;
                delete $scope.$hasSubheader;
              });
            } else {
              $scope.$watch(function() {
                return el.className;
              }, function(value) {
                var isShown = value.indexOf('ng-hide') === -1;
                var isSubfooter = value.indexOf('bar-subfooter') !== -1;
                $scope.$hasFooter = isShown && !isSubfooter;
                $scope.$hasSubfooter = isShown && isSubfooter;
              });
              $scope.$on('$destroy', function() {
                delete $scope.$hasFooter;
                delete $scope.$hasSubfooter;
              });
              $scope.$watch('$hasTabs', function(val) {
                $element.toggleClass('has-tabs', !!val);
              });
            }
          }
        }
      };
    }];
  }
  IonicModule.directive('ionInfiniteScroll', ['$timeout', function($timeout) {
    function calculateMaxValue(distance, maximum, isPercent) {
      return isPercent ? maximum * (1 - parseFloat(distance, 10) / 100) : maximum - parseFloat(distance, 10);
    }
    return {
      restrict: 'E',
      require: ['^$ionicScroll', 'ionInfiniteScroll'],
      template: '<i class="icon {{icon()}} icon-refreshing"></i>',
      scope: true,
      controller: ['$scope', '$attrs', function($scope, $attrs) {
        this.isLoading = false;
        this.scrollView = null;
        this.getMaxScroll = function() {
          var distance = ($attrs.distance || '2.5%').trim();
          var isPercent = distance.indexOf('%') !== -1;
          var maxValues = this.scrollView.getScrollMax();
          return {
            left: this.scrollView.options.scrollingX ? calculateMaxValue(distance, maxValues.left, isPercent) : -1,
            top: this.scrollView.options.scrollingY ? calculateMaxValue(distance, maxValues.top, isPercent) : -1
          };
        };
      }],
      link: function($scope, $element, $attrs, ctrls) {
        var scrollCtrl = ctrls[0];
        var infiniteScrollCtrl = ctrls[1];
        var scrollView = infiniteScrollCtrl.scrollView = scrollCtrl.scrollView;
        $scope.icon = function() {
          return angular.isDefined($attrs.icon) ? $attrs.icon : 'ion-loading-d';
        };
        var onInfinite = function() {
          $element[0].classList.add('active');
          infiniteScrollCtrl.isLoading = true;
          $scope.$parent && $scope.$parent.$apply($attrs.onInfinite || '');
        };
        var finishInfiniteScroll = function() {
          $element[0].classList.remove('active');
          $timeout(function() {
            scrollView.resize();
            checkBounds();
          }, 0, false);
          infiniteScrollCtrl.isLoading = false;
        };
        $scope.$on('scroll.infiniteScrollComplete', function() {
          finishInfiniteScroll();
        });
        $scope.$on('$destroy', function() {
          void 0;
          if (scrollCtrl && scrollCtrl.$element)
            scrollCtrl.$element.off('scroll', checkBounds);
        });
        var checkBounds = ionic.animationFrameThrottle(checkInfiniteBounds);
        setTimeout(checkBounds);
        scrollCtrl.$element.on('scroll', checkBounds);
        function checkInfiniteBounds() {
          if (infiniteScrollCtrl.isLoading)
            return;
          var scrollValues = scrollView.getValues();
          var maxScroll = infiniteScrollCtrl.getMaxScroll();
          if ((maxScroll.left !== -1 && scrollValues.left >= maxScroll.left) || (maxScroll.top !== -1 && scrollValues.top >= maxScroll.top)) {
            onInfinite();
          }
        }
      }
    };
  }]);
  var ITEM_TPL_CONTENT_ANCHOR = '<a class="item-content" ng-href="{{$href()}}" target="{{$target()}}"></a>';
  var ITEM_TPL_CONTENT = '<div class="item-content"></div>';
  IonicModule.directive('ionItem', ['$animate', '$compile', function($animate, $compile) {
    return {
      restrict: 'E',
      controller: ['$scope', '$element', function($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;
      }],
      scope: true,
      compile: function($element, $attrs) {
        var isAnchor = angular.isDefined($attrs.href) || angular.isDefined($attrs.ngHref) || angular.isDefined($attrs.uiSref);
        var isComplexItem = isAnchor || /ion-(delete|option|reorder)-button/i.test($element.html());
        if (isComplexItem) {
          var innerElement = jqLite(isAnchor ? ITEM_TPL_CONTENT_ANCHOR : ITEM_TPL_CONTENT);
          innerElement.append($element.contents());
          $element.append(innerElement);
          $element.addClass('item item-complex');
        } else {
          $element.addClass('item');
        }
        return function link($scope, $element, $attrs) {
          $scope.$href = function() {
            return $attrs.href || $attrs.ngHref;
          };
          $scope.$target = function() {
            return $attrs.target || '_self';
          };
        };
      }
    };
  }]);
  var ITEM_TPL_DELETE_BUTTON = '<div class="item-left-edit item-delete enable-pointer-events">' + '</div>';
  IonicModule.directive('ionDeleteButton', ['$animate', function($animate) {
    return {
      restrict: 'E',
      require: ['^ionItem', '^?ionList'],
      priority: Number.MAX_VALUE,
      compile: function($element, $attr) {
        $attr.$set('class', ($attr['class'] || '') + ' button icon button-icon', true);
        return function($scope, $element, $attr, ctrls) {
          var itemCtrl = ctrls[0];
          var listCtrl = ctrls[1];
          var container = jqLite(ITEM_TPL_DELETE_BUTTON);
          container.append($element);
          itemCtrl.$element.append(container).addClass('item-left-editable');
          if (listCtrl && listCtrl.showDelete()) {
            container.addClass('visible active');
          }
        };
      }
    };
  }]);
  IonicModule.directive('itemFloatingLabel', function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        var el = element[0];
        var input = el.querySelector('input, textarea');
        var inputLabel = el.querySelector('.input-label');
        if (!input || !inputLabel)
          return;
        var onInput = function() {
          if (input.value) {
            inputLabel.classList.add('has-input');
          } else {
            inputLabel.classList.remove('has-input');
          }
        };
        input.addEventListener('input', onInput);
        var ngModelCtrl = angular.element(input).controller('ngModel');
        if (ngModelCtrl) {
          ngModelCtrl.$render = function() {
            input.value = ngModelCtrl.$viewValue || '';
            onInput();
          };
        }
        scope.$on('$destroy', function() {
          input.removeEventListener('input', onInput);
        });
      }
    };
  });
  var ITEM_TPL_OPTION_BUTTONS = '<div class="item-options invisible">' + '</div>';
  IonicModule.directive('ionOptionButton', ['$compile', function($compile) {
    function stopPropagation(e) {
      e.stopPropagation();
    }
    return {
      restrict: 'E',
      require: '^ionItem',
      priority: Number.MAX_VALUE,
      compile: function($element, $attr) {
        $attr.$set('class', ($attr['class'] || '') + ' button', true);
        return function($scope, $element, $attr, itemCtrl) {
          if (!itemCtrl.optionsContainer) {
            itemCtrl.optionsContainer = jqLite(ITEM_TPL_OPTION_BUTTONS);
            itemCtrl.$element.append(itemCtrl.optionsContainer);
          }
          itemCtrl.optionsContainer.append($element);
          $element.on('click', stopPropagation);
        };
      }
    };
  }]);
  var ITEM_TPL_REORDER_BUTTON = '<div data-prevent-scroll="true" class="item-right-edit item-reorder enable-pointer-events">' + '</div>';
  IonicModule.directive('ionReorderButton', ['$animate', '$parse', function($animate, $parse) {
    return {
      restrict: 'E',
      require: ['^ionItem', '^?ionList'],
      priority: Number.MAX_VALUE,
      compile: function($element, $attr) {
        $attr.$set('class', ($attr['class'] || '') + ' button icon button-icon', true);
        $element[0].setAttribute('data-prevent-scroll', true);
        return function($scope, $element, $attr, ctrls) {
          var itemCtrl = ctrls[0];
          var listCtrl = ctrls[1];
          var onReorderFn = $parse($attr.onReorder);
          $scope.$onReorder = function(oldIndex, newIndex) {
            onReorderFn($scope, {
              $fromIndex: oldIndex,
              $toIndex: newIndex
            });
          };
          if (!$attr.ngClick && !$attr.onClick && !$attr.onclick) {
            $element[0].onclick = function(e) {
              e.stopPropagation();
              return false;
            };
          }
          var container = jqLite(ITEM_TPL_REORDER_BUTTON);
          container.append($element);
          itemCtrl.$element.append(container).addClass('item-right-editable');
          if (listCtrl && listCtrl.showReorder()) {
            container.addClass('visible active');
          }
        };
      }
    };
  }]);
  IonicModule.directive('keyboardAttach', function() {
    return function(scope, element, attrs) {
      ionic.on('native.keyboardshow', onShow, window);
      ionic.on('native.keyboardhide', onHide, window);
      ionic.on('native.showkeyboard', onShow, window);
      ionic.on('native.hidekeyboard', onHide, window);
      var scrollCtrl;
      function onShow(e) {
        if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
          return;
        }
        var keyboardHeight = e.keyboardHeight || e.detail.keyboardHeight;
        element.css('bottom', keyboardHeight + "px");
        scrollCtrl = element.controller('$ionicScroll');
        if (scrollCtrl) {
          scrollCtrl.scrollView.__container.style.bottom = keyboardHeight + keyboardAttachGetClientHeight(element[0]) + "px";
        }
      }
      function onHide() {
        if (ionic.Platform.isAndroid() && !ionic.Platform.isFullScreen) {
          return;
        }
        element.css('bottom', '');
        if (scrollCtrl) {
          scrollCtrl.scrollView.__container.style.bottom = '';
        }
      }
      scope.$on('$destroy', function() {
        ionic.off('native.keyboardshow', onShow, window);
        ionic.off('native.keyboardhide', onHide, window);
        ionic.off('native.showkeyboard', onShow, window);
        ionic.off('native.hidekeyboard', onHide, window);
      });
    };
  });
  function keyboardAttachGetClientHeight(element) {
    return element.clientHeight;
  }
  IonicModule.directive('ionList', ['$animate', '$timeout', function($animate, $timeout) {
    return {
      restrict: 'E',
      require: ['ionList', '^?$ionicScroll'],
      controller: '$ionicList',
      compile: function($element, $attr) {
        var listEl = jqLite('<div class="list">').append($element.contents()).addClass($attr.type);
        $element.append(listEl);
        return function($scope, $element, $attrs, ctrls) {
          var listCtrl = ctrls[0];
          var scrollCtrl = ctrls[1];
          $timeout(init);
          function init() {
            var listView = listCtrl.listView = new ionic.views.ListView({
              el: $element[0],
              listEl: $element.children()[0],
              scrollEl: scrollCtrl && scrollCtrl.element,
              scrollView: scrollCtrl && scrollCtrl.scrollView,
              onReorder: function(el, oldIndex, newIndex) {
                var itemScope = jqLite(el).scope();
                if (itemScope && itemScope.$onReorder) {
                  $timeout(function() {
                    itemScope.$onReorder(oldIndex, newIndex);
                  });
                }
              },
              canSwipe: function() {
                return listCtrl.canSwipeItems();
              }
            });
            if (isDefined($attr.canSwipe)) {
              $scope.$watch('!!(' + $attr.canSwipe + ')', function(value) {
                listCtrl.canSwipeItems(value);
              });
            }
            if (isDefined($attr.showDelete)) {
              $scope.$watch('!!(' + $attr.showDelete + ')', function(value) {
                listCtrl.showDelete(value);
              });
            }
            if (isDefined($attr.showReorder)) {
              $scope.$watch('!!(' + $attr.showReorder + ')', function(value) {
                listCtrl.showReorder(value);
              });
            }
            $scope.$watch(function() {
              return listCtrl.showDelete();
            }, function(isShown, wasShown) {
              if (!isShown && !wasShown) {
                return;
              }
              if (isShown)
                listCtrl.closeOptionButtons();
              listCtrl.canSwipeItems(!isShown);
              $element.children().toggleClass('list-left-editing', isShown);
              $element.toggleClass('disable-pointer-events', isShown);
              var deleteButton = jqLite($element[0].getElementsByClassName('item-delete'));
              setButtonShown(deleteButton, listCtrl.showDelete);
            });
            $scope.$watch(function() {
              return listCtrl.showReorder();
            }, function(isShown, wasShown) {
              if (!isShown && !wasShown) {
                return;
              }
              if (isShown)
                listCtrl.closeOptionButtons();
              listCtrl.canSwipeItems(!isShown);
              $element.children().toggleClass('list-right-editing', isShown);
              $element.toggleClass('disable-pointer-events', isShown);
              var reorderButton = jqLite($element[0].getElementsByClassName('item-reorder'));
              setButtonShown(reorderButton, listCtrl.showReorder);
            });
            function setButtonShown(el, shown) {
              shown() && el.addClass('visible') || el.removeClass('active');
              ionic.requestAnimationFrame(function() {
                shown() && el.addClass('active') || el.removeClass('visible');
              });
            }
          }
        };
      }
    };
  }]);
  IonicModule.directive('menuClose', ['$ionicViewService', function($ionicViewService) {
    return {
      restrict: 'AC',
      require: '^ionSideMenus',
      link: function($scope, $element, $attr, sideMenuCtrl) {
        $element.bind('click', function() {
          sideMenuCtrl.close();
        });
      }
    };
  }]);
  IonicModule.directive('menuToggle', ['$ionicViewService', function($ionicViewService) {
    return {
      restrict: 'AC',
      require: '^ionSideMenus',
      link: function($scope, $element, $attr, sideMenuCtrl) {
        var side = $attr.menuToggle || 'left';
        $element.bind('click', function() {
          if (side === 'left') {
            sideMenuCtrl.toggleLeft();
          } else if (side === 'right') {
            sideMenuCtrl.toggleRight();
          }
        });
      }
    };
  }]);
  IonicModule.directive('ionModal', [function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: [function() {}],
      template: '<div class="modal-backdrop">' + '<div class="modal-wrapper" ng-transclude></div>' + '</div>'
    };
  }]);
  IonicModule.directive('ionModalView', function() {
    return {
      restrict: 'E',
      compile: function(element, attr) {
        element.addClass('modal');
      }
    };
  });
  IonicModule.directive('ionNavBackButton', ['$animate', '$rootScope', '$sanitize', '$ionicNavBarConfig', '$ionicNgClick', function($animate, $rootScope, $sanitize, $ionicNavBarConfig, $ionicNgClick) {
    var backIsShown = false;
    $rootScope.$on('$viewHistory.historyChange', function(e, data) {
      backIsShown = !!data.showBack;
    });
    return {
      restrict: 'E',
      require: '^ionNavBar',
      compile: function(tElement, tAttrs) {
        tElement.addClass('button back-button ng-hide');
        var hasIconChild = !!(tElement.html() || '').match(/class=.*?ion-/);
        return function($scope, $element, $attr, navBarCtrl) {
          if (!hasIconChild && $element[0].className.indexOf('ion-') === -1) {
            $element.addClass($ionicNavBarConfig.backButtonIcon);
          }
          if (!isDefined($attr.ngClick)) {
            $ionicNgClick($scope, $element, navBarCtrl.back);
          }
          $scope.$watch(function() {
            if (isDefined($attr.fromTitle)) {
              $element[0].innerHTML = '<span class="back-button-title">' + $sanitize($scope.oldTitle) + '</span>';
            }
            return !!(backIsShown && $scope.backButtonShown);
          }, ionic.animationFrameThrottle(function(show) {
            if (show)
              $animate.removeClass($element, 'ng-hide');
            else
              $animate.addClass($element, 'ng-hide');
          }));
        };
      }
    };
  }]);
  IonicModule.constant('$ionicNavBarConfig', {
    transition: 'nav-title-slide-ios7',
    alignTitle: 'center',
    backButtonIcon: 'ion-ios7-arrow-back'
  });
  IonicModule.directive('ionNavBar', ['$ionicViewService', '$rootScope', '$animate', '$compile', '$ionicNavBarConfig', function($ionicViewService, $rootScope, $animate, $compile, $ionicNavBarConfig) {
    return {
      restrict: 'E',
      controller: '$ionicNavBar',
      scope: true,
      compile: function(tElement, tAttrs) {
        tElement.addClass('bar bar-header nav-bar').append('<div class="buttons left-buttons"> ' + '</div>' + '<h1 ng-bind-html="title" class="title"></h1>' + '<div class="buttons right-buttons"> ' + '</div>');
        if (isDefined(tAttrs.animation)) {
          tElement.addClass(tAttrs.animation);
        } else {
          tElement.addClass($ionicNavBarConfig.transition);
        }
        return {pre: prelink};
        function prelink($scope, $element, $attr, navBarCtrl) {
          navBarCtrl._headerBarView = new ionic.views.HeaderBar({
            el: $element[0],
            alignTitle: $attr.alignTitle || $ionicNavBarConfig.alignTitle || 'center'
          });
          $scope.backButtonShown = false;
          $scope.shouldAnimate = true;
          $scope.isReverse = false;
          $scope.isInvisible = true;
          $scope.$on('$destroy', function() {
            $scope.$parent.$hasHeader = false;
          });
          $scope.$watch(function() {
            return ($scope.isReverse ? ' reverse' : '') + ($scope.isInvisible ? ' invisible' : '') + (!$scope.shouldAnimate ? ' no-animation' : '');
          }, function(className, oldClassName) {
            $element.removeClass(oldClassName);
            $element.addClass(className);
          });
        }
      }
    };
  }]);
  IonicModule.directive('ionNavButtons', ['$compile', '$animate', function($compile, $animate) {
    return {
      require: '^ionNavBar',
      restrict: 'E',
      compile: function($element, $attrs) {
        var content = $element.contents().remove();
        return function($scope, $element, $attrs, navBarCtrl) {
          var navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
          var buttons = jqLite('<span>').append(content);
          $element.append(buttons);
          $compile(buttons)($scope);
          ionic.requestAnimationFrame(function() {
            if (!$scope.$$destroyed) {
              $animate.enter(buttons, navElement);
            }
          });
          $scope.$on('$destroy', function() {
            $animate.leave(buttons);
          });
          $element.css('display', 'none');
        };
      }
    };
  }]);
  IonicModule.directive('navClear', ['$ionicViewService', '$state', '$location', '$window', '$rootScope', function($ionicViewService, $location, $state, $window, $rootScope) {
    $rootScope.$on('$stateChangeError', function() {
      $ionicViewService.nextViewOptions(null);
    });
    return {
      priority: 100,
      restrict: 'AC',
      compile: function($element) {
        return {pre: prelink};
        function prelink($scope, $element, $attrs) {
          var unregisterListener;
          function listenForStateChange() {
            unregisterListener = $scope.$on('$stateChangeStart', function() {
              $ionicViewService.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
              unregisterListener();
            });
            $window.setTimeout(unregisterListener, 300);
          }
          $element.on('click', listenForStateChange);
        }
      }
    };
  }]);
  IonicModule.constant('$ionicNavViewConfig', {transition: 'slide-left-right-ios7'});
  IonicModule.directive('ionNavView', ['$ionicViewService', '$state', '$compile', '$controller', '$animate', function($ionicViewService, $state, $compile, $controller, $animate) {
    var viewIsUpdating = false;
    var directive = {
      restrict: 'E',
      terminal: true,
      priority: 2000,
      transclude: true,
      controller: function() {},
      compile: function(element, attr, transclude) {
        return function(scope, element, attr, navViewCtrl) {
          var viewScope,
              viewLocals,
              name = attr[directive.name] || attr.name || '',
              onloadExp = attr.onload || '',
              initialView = transclude(scope);
          element.append(initialView);
          var parent = element.parent().inheritedData('$uiView');
          if (name.indexOf('@') < 0)
            name = name + '@' + ((parent && parent.state) ? parent.state.name : '');
          var view = {
            name: name,
            state: null
          };
          element.data('$uiView', view);
          var eventHook = function() {
            if (viewIsUpdating)
              return;
            viewIsUpdating = true;
            try {
              updateView(true);
            } catch (e) {
              viewIsUpdating = false;
              throw e;
            }
            viewIsUpdating = false;
          };
          scope.$on('$stateChangeSuccess', eventHook);
          updateView(false);
          function updateView(doAnimate) {
            if ($animate.enabled() === false) {
              doAnimate = false;
            }
            var locals = $state.$current && $state.$current.locals[name];
            if (locals === viewLocals)
              return;
            var renderer = $ionicViewService.getRenderer(element, attr, scope);
            if (viewScope) {
              viewScope.$destroy();
              viewScope = null;
            }
            if (!locals) {
              viewLocals = null;
              view.state = null;
              return element.append(initialView);
            }
            var newElement = jqLite('<div></div>').html(locals.$template).contents();
            var viewRegisterData = renderer().register(newElement);
            renderer(doAnimate).leave();
            viewLocals = locals;
            view.state = locals.$$state;
            renderer(doAnimate).enter(newElement);
            var link = $compile(newElement);
            viewScope = scope.$new();
            viewScope.$navDirection = viewRegisterData.navDirection;
            if (locals.$$controller) {
              locals.$scope = viewScope;
              var controller = $controller(locals.$$controller, locals);
              element.children().data('$ngControllerController', controller);
            }
            link(viewScope);
            var viewHistoryData = $ionicViewService._getViewById(viewRegisterData.viewId) || {};
            viewScope.$broadcast('$viewContentLoaded', viewHistoryData);
            if (onloadExp)
              viewScope.$eval(onloadExp);
            newElement = null;
          }
        };
      }
    };
    return directive;
  }]);
  IonicModule.config(['$provide', function($provide) {
    $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
      $delegate.shift();
      return $delegate;
    }]);
  }]).factory('$ionicNgClick', ['$parse', function($parse) {
    return function(scope, element, clickExpr) {
      var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);
      element.on('click', function(event) {
        scope.$apply(function() {
          clickHandler(scope, {$event: (event)});
        });
      });
      element.onclick = function(event) {};
    };
  }]).directive('ngClick', ['$ionicNgClick', function($ionicNgClick) {
    return function(scope, element, attr) {
      $ionicNgClick(scope, element, attr.ngClick);
    };
  }]).directive('ionStopEvent', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        element.bind(attr.ionStopEvent, eventStopPropagation);
      }
    };
  });
  function eventStopPropagation(e) {
    e.stopPropagation();
  }
  IonicModule.directive('ionPane', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        element.addClass('pane');
      }
    };
  });
  IonicModule.directive('ionPopover', [function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: [function() {}],
      template: '<div class="popover-backdrop">' + '<div class="popover-wrapper" ng-transclude></div>' + '</div>'
    };
  }]);
  IonicModule.directive('ionPopoverView', function() {
    return {
      restrict: 'E',
      compile: function(element) {
        element.append(angular.element('<div class="popover-arrow"></div>'));
        element.addClass('popover');
      }
    };
  });
  IonicModule.directive('ionRadio', function() {
    return {
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      transclude: true,
      template: '<label class="item item-radio">' + '<input type="radio" name="radio-group">' + '<div class="item-content disable-pointer-events" ng-transclude></div>' + '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' + '</label>',
      compile: function(element, attr) {
        if (attr.icon)
          element.children().eq(2).removeClass('ion-checkmark').addClass(attr.icon);
        var input = element.find('input');
        forEach({
          'name': attr.name,
          'value': attr.value,
          'disabled': attr.disabled,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-disabled': attr.ngDisabled,
          'ng-change': attr.ngChange
        }, function(value, name) {
          if (isDefined(value)) {
            input.attr(name, value);
          }
        });
        return function(scope, element, attr) {
          scope.getValue = function() {
            return scope.ngValue || attr.value;
          };
        };
      }
    };
  });
  IonicModule.directive('ionRefresher', ['$ionicBind', function($ionicBind) {
    return {
      restrict: 'E',
      replace: true,
      require: '^$ionicScroll',
      template: '<div class="scroll-refresher" collection-repeat-ignore>' + '<div class="ionic-refresher-content" ' + 'ng-class="{\'ionic-refresher-with-text\': pullingText || refreshingText}">' + '<div class="icon-pulling" ng-class="{\'pulling-rotation-disabled\':disablePullingRotation}">' + '<i class="icon {{pullingIcon}}"></i>' + '</div>' + '<div class="text-pulling" ng-bind-html="pullingText"></div>' + '<i class="icon {{refreshingIcon}} icon-refreshing"></i>' + '<div class="text-refreshing" ng-bind-html="refreshingText"></div>' + '</div>' + '</div>',
      compile: function($element, $attrs) {
        if (angular.isUndefined($attrs.pullingIcon)) {
          $attrs.$set('pullingIcon', 'ion-ios7-arrow-down');
        }
        if (angular.isUndefined($attrs.refreshingIcon)) {
          $attrs.$set('refreshingIcon', 'ion-loading-d');
        }
        return function($scope, $element, $attrs, scrollCtrl) {
          $ionicBind($scope, $attrs, {
            pullingIcon: '@',
            pullingText: '@',
            refreshingIcon: '@',
            refreshingText: '@',
            disablePullingRotation: '@',
            $onRefresh: '&onRefresh',
            $onPulling: '&onPulling'
          });
          scrollCtrl._setRefresher($scope, $element[0]);
          $scope.$on('scroll.refreshComplete', function() {
            $scope.$evalAsync(function() {
              scrollCtrl.scrollView.finishPullToRefresh();
            });
          });
        };
      }
    };
  }]);
  IonicModule.directive('ionScroll', ['$timeout', '$controller', '$ionicBind', function($timeout, $controller, $ionicBind) {
    return {
      restrict: 'E',
      scope: true,
      controller: function() {},
      compile: function(element, attr) {
        element.addClass('scroll-view ionic-scroll');
        var innerElement = jqLite('<div class="scroll"></div>');
        innerElement.append(element.contents());
        element.append(innerElement);
        return {pre: prelink};
        function prelink($scope, $element, $attr) {
          var scrollView,
              scrollCtrl;
          $ionicBind($scope, $attr, {
            direction: '@',
            paging: '@',
            $onScroll: '&onScroll',
            scroll: '@',
            scrollbarX: '@',
            scrollbarY: '@',
            zooming: '@',
            minZoom: '@',
            maxZoom: '@'
          });
          $scope.direction = $scope.direction || 'y';
          if (angular.isDefined($attr.padding)) {
            $scope.$watch($attr.padding, function(newVal) {
              innerElement.toggleClass('padding', !!newVal);
            });
          }
          if ($scope.$eval($scope.paging) === true) {
            innerElement.addClass('scroll-paging');
          }
          if (!$scope.direction) {
            $scope.direction = 'y';
          }
          var isPaging = $scope.$eval($scope.paging) === true;
          var scrollViewOptions = {
            el: $element[0],
            delegateHandle: $attr.delegateHandle,
            locking: ($attr.locking || 'true') === 'true',
            bouncing: $scope.$eval($attr.hasBouncing),
            paging: isPaging,
            scrollbarX: $scope.$eval($scope.scrollbarX) !== false,
            scrollbarY: $scope.$eval($scope.scrollbarY) !== false,
            scrollingX: $scope.direction.indexOf('x') >= 0,
            scrollingY: $scope.direction.indexOf('y') >= 0,
            zooming: $scope.$eval($scope.zooming) === true,
            maxZoom: $scope.$eval($scope.maxZoom) || 3,
            minZoom: $scope.$eval($scope.minZoom) || 0.5
          };
          if (isPaging) {
            scrollViewOptions.speedMultiplier = 0.8;
            scrollViewOptions.bouncing = false;
          }
          scrollCtrl = $controller('$ionicScroll', {
            $scope: $scope,
            scrollViewOptions: scrollViewOptions
          });
          scrollView = $scope.$parent.scrollView = scrollCtrl.scrollView;
        }
      }
    };
  }]);
  IonicModule.directive('ionSideMenu', function() {
    return {
      restrict: 'E',
      require: '^ionSideMenus',
      scope: true,
      compile: function(element, attr) {
        angular.isUndefined(attr.isEnabled) && attr.$set('isEnabled', 'true');
        angular.isUndefined(attr.width) && attr.$set('width', '275');
        element.addClass('menu menu-' + attr.side);
        return function($scope, $element, $attr, sideMenuCtrl) {
          $scope.side = $attr.side || 'left';
          var sideMenu = sideMenuCtrl[$scope.side] = new ionic.views.SideMenu({
            width: attr.width,
            el: $element[0],
            isEnabled: true
          });
          $scope.$watch($attr.width, function(val) {
            var numberVal = +val;
            if (numberVal && numberVal == val) {
              sideMenu.setWidth(+val);
            }
          });
          $scope.$watch($attr.isEnabled, function(val) {
            sideMenu.setIsEnabled(!!val);
          });
        };
      }
    };
  });
  IonicModule.directive('ionSideMenuContent', ['$timeout', '$ionicGesture', '$window', function($timeout, $ionicGesture, $window) {
    return {
      restrict: 'EA',
      require: '^ionSideMenus',
      scope: true,
      compile: function(element, attr) {
        return {pre: prelink};
        function prelink($scope, $element, $attr, sideMenuCtrl) {
          var startCoord = null;
          var primaryScrollAxis = null;
          $element.addClass('menu-content pane');
          if (isDefined(attr.dragContent)) {
            $scope.$watch(attr.dragContent, function(value) {
              sideMenuCtrl.canDragContent(value);
            });
          } else {
            sideMenuCtrl.canDragContent(true);
          }
          if (isDefined(attr.edgeDragThreshold)) {
            $scope.$watch(attr.edgeDragThreshold, function(value) {
              sideMenuCtrl.edgeDragThreshold(value);
            });
          }
          function onContentTap(gestureEvt) {
            if (sideMenuCtrl.getOpenAmount() !== 0) {
              sideMenuCtrl.close();
              gestureEvt.gesture.srcEvent.preventDefault();
              startCoord = null;
              primaryScrollAxis = null;
            } else if (!startCoord) {
              startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
            }
          }
          function onDragX(e) {
            if (!sideMenuCtrl.isDraggableTarget(e))
              return;
            if (getPrimaryScrollAxis(e) == 'x') {
              sideMenuCtrl._handleDrag(e);
              e.gesture.srcEvent.preventDefault();
            }
          }
          function onDragY(e) {
            if (getPrimaryScrollAxis(e) == 'x') {
              e.gesture.srcEvent.preventDefault();
            }
          }
          function onDragRelease(e) {
            sideMenuCtrl._endDrag(e);
            startCoord = null;
            primaryScrollAxis = null;
          }
          function getPrimaryScrollAxis(gestureEvt) {
            if (primaryScrollAxis) {
              return primaryScrollAxis;
            }
            if (gestureEvt && gestureEvt.gesture) {
              if (!startCoord) {
                startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
              } else {
                var endCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
                var xDistance = Math.abs(endCoord.x - startCoord.x);
                var yDistance = Math.abs(endCoord.y - startCoord.y);
                var scrollAxis = (xDistance < yDistance ? 'y' : 'x');
                if (Math.max(xDistance, yDistance) > 30) {
                  primaryScrollAxis = scrollAxis;
                }
                return scrollAxis;
              }
            }
            return 'x';
          }
          var content = {
            element: element[0],
            onDrag: function(e) {},
            endDrag: function(e) {},
            getTranslateX: function() {
              return $scope.sideMenuContentTranslateX || 0;
            },
            setTranslateX: ionic.animationFrameThrottle(function(amount) {
              var xTransform = content.offsetX + amount;
              $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + xTransform + 'px,0,0)';
              $timeout(function() {
                $scope.sideMenuContentTranslateX = amount;
              });
            }),
            setMarginLeft: ionic.animationFrameThrottle(function(amount) {
              if (amount) {
                amount = parseInt(amount, 10);
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(' + amount + 'px,0,0)';
                $element[0].style.width = ($window.innerWidth - amount) + 'px';
                content.offsetX = amount;
              } else {
                $element[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
                $element[0].style.width = '';
                content.offsetX = 0;
              }
            }),
            enableAnimation: function() {
              $scope.animationEnabled = true;
              $element[0].classList.add('menu-animated');
            },
            disableAnimation: function() {
              $scope.animationEnabled = false;
              $element[0].classList.remove('menu-animated');
            },
            offsetX: 0
          };
          sideMenuCtrl.setContent(content);
          var gestureOpts = {stop_browser_behavior: false};
          var contentTapGesture = $ionicGesture.on('tap', onContentTap, $element, gestureOpts);
          var dragRightGesture = $ionicGesture.on('dragright', onDragX, $element, gestureOpts);
          var dragLeftGesture = $ionicGesture.on('dragleft', onDragX, $element, gestureOpts);
          var dragUpGesture = $ionicGesture.on('dragup', onDragY, $element, gestureOpts);
          var dragDownGesture = $ionicGesture.on('dragdown', onDragY, $element, gestureOpts);
          var releaseGesture = $ionicGesture.on('release', onDragRelease, $element, gestureOpts);
          $scope.$on('$destroy', function() {
            $ionicGesture.off(dragLeftGesture, 'dragleft', onDragX);
            $ionicGesture.off(dragRightGesture, 'dragright', onDragX);
            $ionicGesture.off(dragUpGesture, 'dragup', onDragY);
            $ionicGesture.off(dragDownGesture, 'dragdown', onDragY);
            $ionicGesture.off(releaseGesture, 'release', onDragRelease);
            $ionicGesture.off(contentTapGesture, 'tap', onContentTap);
          });
        }
      }
    };
  }]);
  IonicModule.directive('ionSideMenus', ['$ionicBody', function($ionicBody) {
    return {
      restrict: 'ECA',
      controller: '$ionicSideMenus',
      compile: function(element, attr) {
        attr.$set('class', (attr['class'] || '') + ' view');
        return {pre: prelink};
        function prelink($scope) {
          $scope.$on('$ionicExposeAside', function(evt, isAsideExposed) {
            if (!$scope.$exposeAside)
              $scope.$exposeAside = {};
            $scope.$exposeAside.active = isAsideExposed;
            $ionicBody.enableClass(isAsideExposed, 'aside-open');
          });
          $scope.$on('$destroy', function() {
            $ionicBody.removeClass('menu-open', 'aside-open');
          });
        }
      }
    };
  }]);
  IonicModule.directive('ionSlideBox', ['$timeout', '$compile', '$ionicSlideBoxDelegate', function($timeout, $compile, $ionicSlideBoxDelegate) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        autoPlay: '=',
        doesContinue: '@',
        slideInterval: '@',
        showPager: '@',
        pagerClick: '&',
        disableScroll: '@',
        onSlideChanged: '&',
        activeSlide: '=?'
      },
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var _this = this;
        var continuous = $scope.$eval($scope.doesContinue) === true;
        var shouldAutoPlay = isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
        var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;
        var slider = new ionic.views.Slider({
          el: $element[0],
          auto: slideInterval,
          continuous: continuous,
          startSlide: $scope.activeSlide,
          slidesChanged: function() {
            $scope.currentSlide = slider.currentIndex();
            $timeout(function() {});
          },
          callback: function(slideIndex) {
            $scope.currentSlide = slideIndex;
            $scope.onSlideChanged({
              index: $scope.currentSlide,
              $index: $scope.currentSlide
            });
            $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
            $scope.activeSlide = slideIndex;
            $timeout(function() {});
          }
        });
        slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);
        $scope.$watch('activeSlide', function(nv) {
          if (angular.isDefined(nv)) {
            slider.slide(nv);
          }
        });
        $scope.$on('slideBox.nextSlide', function() {
          slider.next();
        });
        $scope.$on('slideBox.prevSlide', function() {
          slider.prev();
        });
        $scope.$on('slideBox.setSlide', function(e, index) {
          slider.slide(index);
        });
        this.__slider = slider;
        var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(slider, $attrs.delegateHandle);
        $scope.$on('$destroy', deregisterInstance);
        this.slidesCount = function() {
          return slider.slidesCount();
        };
        this.onPagerClick = function(index) {
          void 0;
          $scope.pagerClick({index: index});
        };
        $timeout(function() {
          slider.load();
        });
      }],
      template: '<div class="slider">' + '<div class="slider-slides" ng-transclude>' + '</div>' + '</div>',
      link: function($scope, $element, $attr, slideBoxCtrl) {
        if ($scope.$eval($scope.showPager) !== false) {
          var childScope = $scope.$new();
          var pager = jqLite('<ion-pager></ion-pager>');
          $element.append(pager);
          $compile(pager)(childScope);
        }
      }
    };
  }]).directive('ionSlide', function() {
    return {
      restrict: 'E',
      require: '^ionSlideBox',
      compile: function(element, attr) {
        element.addClass('slider-slide');
        return function($scope, $element, $attr) {};
      }
    };
  }).directive('ionPager', function() {
    return {
      restrict: 'E',
      replace: true,
      require: '^ionSlideBox',
      template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
      link: function($scope, $element, $attr, slideBox) {
        var selectPage = function(index) {
          var children = $element[0].children;
          var length = children.length;
          for (var i = 0; i < length; i++) {
            if (i == index) {
              children[i].classList.add('active');
            } else {
              children[i].classList.remove('active');
            }
          }
        };
        $scope.pagerClick = function(index) {
          slideBox.onPagerClick(index);
        };
        $scope.numSlides = function() {
          return new Array(slideBox.slidesCount());
        };
        $scope.$watch('currentSlide', function(v) {
          selectPage(v);
        });
      }
    };
  });
  IonicModule.constant('$ionicTabConfig', {type: ''});
  IonicModule.directive('ionTab', ['$rootScope', '$animate', '$ionicBind', '$compile', function($rootScope, $animate, $ionicBind, $compile) {
    function attrStr(k, v) {
      return angular.isDefined(v) ? ' ' + k + '="' + v + '"' : '';
    }
    return {
      restrict: 'E',
      require: ['^ionTabs', 'ionTab'],
      replace: true,
      controller: '$ionicTab',
      scope: true,
      compile: function(element, attr) {
        var tabNavTemplate = '<ion-tab-nav' + attrStr('ng-click', attr.ngClick) + attrStr('title', attr.title) + attrStr('icon', attr.icon) + attrStr('icon-on', attr.iconOn) + attrStr('icon-off', attr.iconOff) + attrStr('badge', attr.badge) + attrStr('badge-style', attr.badgeStyle) + attrStr('hidden', attr.hidden) + attrStr('class', attr['class']) + '></ion-tab-nav>';
        var tabContent = jqLite('<div class="pane">').append(element.contents().remove());
        return function link($scope, $element, $attr, ctrls) {
          var childScope;
          var childElement;
          var tabsCtrl = ctrls[0];
          var tabCtrl = ctrls[1];
          var navView = tabContent[0].querySelector('ion-nav-view') || tabContent[0].querySelector('data-ion-nav-view');
          var navViewName = navView && navView.getAttribute('name');
          $ionicBind($scope, $attr, {
            animate: '=',
            onSelect: '&',
            onDeselect: '&',
            title: '@',
            uiSref: '@',
            href: '@'
          });
          tabsCtrl.add($scope);
          $scope.$on('$destroy', function() {
            if (!$scope.$tabsDestroy) {
              tabsCtrl.remove($scope);
            }
            tabNavElement.isolateScope().$destroy();
            tabNavElement.remove();
          });
          $element[0].removeAttribute('title');
          if (navViewName) {
            tabCtrl.navViewName = $scope.navViewName = navViewName;
          }
          $scope.$on('$stateChangeSuccess', selectIfMatchesState);
          selectIfMatchesState();
          function selectIfMatchesState() {
            if (tabCtrl.tabMatchesState()) {
              tabsCtrl.select($scope, false);
            }
          }
          var tabNavElement = jqLite(tabNavTemplate);
          tabNavElement.data('$ionTabsController', tabsCtrl);
          tabNavElement.data('$ionTabController', tabCtrl);
          tabsCtrl.$tabsElement.append($compile(tabNavElement)($scope));
          $scope.$watch('$tabSelected', function(value) {
            childScope && childScope.$destroy();
            childScope = null;
            childElement && $animate.leave(childElement);
            childElement = null;
            if (value) {
              childScope = $scope.$new();
              childElement = tabContent.clone();
              $animate.enter(childElement, tabsCtrl.$element);
              $compile(childElement)(childScope);
            }
          });
        };
      }
    };
  }]);
  IonicModule.directive('ionTabNav', [function() {
    return {
      restrict: 'E',
      replace: true,
      require: ['^ionTabs', '^ionTab'],
      template: '<a ng-class="{\'tab-item-active\': isTabActive(), \'has-badge\':badge, \'tab-hidden\':isHidden()}" ' + ' class="tab-item">' + '<span class="badge {{badgeStyle}}" ng-if="badge">{{badge}}</span>' + '<i class="icon {{getIconOn()}}" ng-if="getIconOn() && isTabActive()"></i>' + '<i class="icon {{getIconOff()}}" ng-if="getIconOff() && !isTabActive()"></i>' + '<span class="tab-title" ng-bind-html="title"></span>' + '</a>',
      scope: {
        title: '@',
        icon: '@',
        iconOn: '@',
        iconOff: '@',
        badge: '=',
        hidden: '@',
        badgeStyle: '@',
        'class': '@'
      },
      compile: function(element, attr, transclude) {
        return function link($scope, $element, $attrs, ctrls) {
          var tabsCtrl = ctrls[0],
              tabCtrl = ctrls[1];
          $element[0].removeAttribute('title');
          $scope.selectTab = function(e) {
            e.preventDefault();
            tabsCtrl.select(tabCtrl.$scope, true);
          };
          if (!$attrs.ngClick) {
            $element.on('click', function(event) {
              $scope.$apply(function() {
                $scope.selectTab(event);
              });
            });
          }
          $scope.isHidden = function() {
            if ($attrs.hidden === 'true' || $attrs.hidden === true)
              return true;
            return false;
          };
          $scope.getIconOn = function() {
            return $scope.iconOn || $scope.icon;
          };
          $scope.getIconOff = function() {
            return $scope.iconOff || $scope.icon;
          };
          $scope.isTabActive = function() {
            return tabsCtrl.selectedTab() === tabCtrl.$scope;
          };
        };
      }
    };
  }]);
  IonicModule.constant('$ionicTabsConfig', {
    position: '',
    type: ''
  });
  IonicModule.directive('ionTabs', ['$ionicViewService', '$ionicTabsDelegate', '$ionicTabsConfig', function($ionicViewService, $ionicTabsDelegate, $ionicTabsConfig) {
    return {
      restrict: 'E',
      scope: true,
      controller: '$ionicTabs',
      compile: function(element, attr) {
        element.addClass('view');
        var innerElement = jqLite('<div class="tabs"></div>');
        innerElement.append(element.contents());
        element.append(innerElement);
        element.addClass($ionicTabsConfig.position);
        element.addClass($ionicTabsConfig.type);
        return {pre: prelink};
        function prelink($scope, $element, $attr, tabsCtrl) {
          var deregisterInstance = $ionicTabsDelegate._registerInstance(tabsCtrl, $attr.delegateHandle);
          $scope.$on('$destroy', function() {
            $scope.$tabsDestroy = true;
            deregisterInstance();
          });
          tabsCtrl.$scope = $scope;
          tabsCtrl.$element = $element;
          tabsCtrl.$tabsElement = jqLite($element[0].querySelector('.tabs'));
          var el = $element[0];
          $scope.$watch(function() {
            return el.className;
          }, function(value) {
            var isTabsTop = value.indexOf('tabs-top') !== -1;
            var isHidden = value.indexOf('tabs-item-hide') !== -1;
            $scope.$hasTabs = !isTabsTop && !isHidden;
            $scope.$hasTabsTop = isTabsTop && !isHidden;
          });
          $scope.$on('$destroy', function() {
            delete $scope.$hasTabs;
            delete $scope.$hasTabsTop;
          });
        }
      }
    };
  }]);
  IonicModule.directive('ionToggle', ['$ionicGesture', '$timeout', function($ionicGesture, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      transclude: true,
      template: '<div class="item item-toggle">' + '<div ng-transclude></div>' + '<label class="toggle">' + '<input type="checkbox">' + '<div class="track">' + '<div class="handle"></div>' + '</div>' + '</label>' + '</div>',
      compile: function(element, attr) {
        var input = element.find('input');
        forEach({
          'name': attr.name,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-checked': attr.ngChecked,
          'ng-disabled': attr.ngDisabled,
          'ng-true-value': attr.ngTrueValue,
          'ng-false-value': attr.ngFalseValue,
          'ng-change': attr.ngChange
        }, function(value, name) {
          if (isDefined(value)) {
            input.attr(name, value);
          }
        });
        if (attr.toggleClass) {
          element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
        }
        return function($scope, $element, $attr) {
          var el,
              checkbox,
              track,
              handle;
          el = $element[0].getElementsByTagName('label')[0];
          checkbox = el.children[0];
          track = el.children[1];
          handle = track.children[0];
          var ngModelController = jqLite(checkbox).controller('ngModel');
          $scope.toggle = new ionic.views.Toggle({
            el: el,
            track: track,
            checkbox: checkbox,
            handle: handle,
            onChange: function() {
              if (checkbox.checked) {
                ngModelController.$setViewValue(true);
              } else {
                ngModelController.$setViewValue(false);
              }
              $scope.$apply();
            }
          });
          $scope.$on('$destroy', function() {
            $scope.toggle.destroy();
          });
        };
      }
    };
  }]);
  IonicModule.directive('ionView', ['$ionicViewService', '$rootScope', '$animate', function($ionicViewService, $rootScope, $animate) {
    return {
      restrict: 'EA',
      priority: 1000,
      require: ['^?ionNavBar', '^?ionModal'],
      compile: function(tElement, tAttrs, transclude) {
        tElement.addClass('pane');
        tElement[0].removeAttribute('title');
        return function link($scope, $element, $attr, ctrls) {
          var navBarCtrl = ctrls[0];
          var modalCtrl = ctrls[1];
          if (!navBarCtrl || modalCtrl) {
            return;
          }
          if (angular.isDefined($attr.title)) {
            var initialTitle = $attr.title;
            navBarCtrl.changeTitle(initialTitle, $scope.$navDirection);
            $attr.$observe('title', function(val, oldVal) {
              navBarCtrl.setTitle(val);
            });
          }
          var hideBackAttr = angular.isDefined($attr.hideBackButton) ? $attr.hideBackButton : 'false';
          $scope.$watch(hideBackAttr, function(value) {
            navBarCtrl.showBackButton(!value);
          });
          var hideNavAttr = angular.isDefined($attr.hideNavBar) ? $attr.hideNavBar : 'false';
          $scope.$watch(hideNavAttr, function(value) {
            navBarCtrl.showBar(!value);
          });
        };
      }
    };
  }]);
})();



  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});

System.register("app/constants/firebase-url.constant", [], function($__export) {
  "use strict";
  var __moduleName = "app/constants/firebase-url.constant";
  function require(path) {
    return $traceurRuntime.require("app/constants/firebase-url.constant", path);
  }
  var FIREBASE_URL;
  return {
    setters: [],
    execute: function() {
      FIREBASE_URL = $__export("FIREBASE_URL", "https://fatburnhub.firebaseio.com");
    }
  };
});



System.register("app/routes/training/training.controller", ["angular", "app/constants/firebase-url.constant"], function($__export) {
  "use strict";
  var __moduleName = "app/routes/training/training.controller";
  function require(path) {
    return $traceurRuntime.require("app/routes/training/training.controller", path);
  }
  var angular,
      FIREBASE_URL,
      trainingControllerModule;
  return {
    setters: [function(m) {
      angular = m.default;
    }, function(m) {
      FIREBASE_URL = m.FIREBASE_URL;
    }],
    execute: function() {
      trainingControllerModule = $__export("trainingControllerModule", angular.module('trainingControllerModule', []));
      trainingControllerModule.controller('MyController', ['$scope', '$firebase', function($scope, $firebase) {
        var ref = new Firebase((FIREBASE_URL + "/data"));
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();
        syncObject.$bindTo($scope, 'data');
      }]);
    }
  };
});



System.register("app/config/main.config", ["angular"], function($__export) {
  "use strict";
  var __moduleName = "app/config/main.config";
  function require(path) {
    return $traceurRuntime.require("app/config/main.config", path);
  }
  var angular,
      mainConfigModule,
      script;
  return {
    setters: [function(m) {
      angular = m.default;
    }],
    execute: function() {
      mainConfigModule = $__export("mainConfigModule", angular.module('mainConfigModule', []));
      if (document.location.protocol !== "file:") {
        script = document.createElement('base');
        script.href = '/';
        document.getElementsByTagName('head')[0].appendChild(script);
        mainConfigModule.config(['$locationProvider', function($locationProvider) {
          $locationProvider.html5Mode(true).hashPrefix('!');
        }]);
      }
    }
  };
});



System.register("app/components/firebaseAuthentication/firebaseAuthentication.controller", ["angular"], function($__export) {
  "use strict";
  var __moduleName = "app/components/firebaseAuthentication/firebaseAuthentication.controller";
  function require(path) {
    return $traceurRuntime.require("app/components/firebaseAuthentication/firebaseAuthentication.controller", path);
  }
  var angular,
      firebaseAuthenticationControllerModule;
  return {
    setters: [function(m) {
      angular = m.default;
    }],
    execute: function() {
      firebaseAuthenticationControllerModule = $__export("firebaseAuthenticationControllerModule", angular.module('firebaseAuthenticationControllerModule', []));
      firebaseAuthenticationControllerModule.controller('FirebaseAuthenticationController', ['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth) {
        var fbsAuth = this;
        fbsAuth.auth().$onAuth(function(authData) {
          $rootScope.user = authData;
          if (authData) {
            console.log("Logged in as:", authData.uid);
          } else {
            console.log("user is logged out");
          }
        });
        fbsAuth.login = function() {
          fbsAuth.auth().$authWithOAuthPopup("facebook").then(function(authData) {}).catch(function(error) {
            console.error("Authentication failed: ", error);
          });
        };
        fbsAuth.logout = function() {
          fbsAuth.auth().$unauth();
        };
      }]);
    }
  };
});



System.register("app/components/firebaseAuthentication/firebaseLogin/firebaseLogin.directive", ["angular"], function($__export) {
  "use strict";
  var __moduleName = "app/components/firebaseAuthentication/firebaseLogin/firebaseLogin.directive";
  function require(path) {
    return $traceurRuntime.require("app/components/firebaseAuthentication/firebaseLogin/firebaseLogin.directive", path);
  }
  var angular,
      firebaseLoginDirectiveModule;
  return {
    setters: [function(m) {
      angular = m.default;
    }],
    execute: function() {
      firebaseLoginDirectiveModule = $__export("firebaseLoginDirectiveModule", angular.module('firebaseLoginDirectiveModule', []).directive('firebaseLogin', function() {
        return {
          require: '^firebaseAuthentication',
          link: function(scope, element, attrs, firebaseAuthenticationCtrl) {
            element.bind('click', function() {
              firebaseAuthenticationCtrl.login();
            });
          }
        };
      }));
    }
  };
});



System.register("app/components/firebaseAuthentication/firebaseLogout/firebaseLogout.directive", ["angular"], function($__export) {
  "use strict";
  var __moduleName = "app/components/firebaseAuthentication/firebaseLogout/firebaseLogout.directive";
  function require(path) {
    return $traceurRuntime.require("app/components/firebaseAuthentication/firebaseLogout/firebaseLogout.directive", path);
  }
  var angular,
      firebaseLogoutDirectiveModule;
  return {
    setters: [function(m) {
      angular = m.default;
    }],
    execute: function() {
      firebaseLogoutDirectiveModule = $__export("firebaseLogoutDirectiveModule", angular.module('firebaseLogoutDirectiveModule', []).directive('firebaseLogout', function() {
        return {
          require: '^firebaseAuthentication',
          link: function(scope, element, attrs, firebaseAuthenticationCtrl) {
            element.bind('click', function() {
              firebaseAuthenticationCtrl.logout();
            });
          }
        };
      }));
    }
  };
});



System.register("app/routes/diet/diet.controller", ["angular", "app/constants/firebase-url.constant"], function($__export) {
  "use strict";
  var __moduleName = "app/routes/diet/diet.controller";
  function require(path) {
    return $traceurRuntime.require("app/routes/diet/diet.controller", path);
  }
  var angular,
      FIREBASE_URL,
      dietControllerModule;
  return {
    setters: [function(m) {
      angular = m.default;
    }, function(m) {
      FIREBASE_URL = m.FIREBASE_URL;
    }],
    execute: function() {
      dietControllerModule = $__export("dietControllerModule", angular.module('dietControllerModule', []));
      dietControllerModule.controller('MyControllerDiet', ['$scope', '$firebase', function($scope, $firebase) {
        var ref = new Firebase((FIREBASE_URL + "/data"));
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();
        syncObject.$bindTo($scope, 'data');
      }]);
    }
  };
});



System.register("app/routes/training/training.route", ["./training.template.html!text", "angular", "./training.controller"], function($__export) {
  "use strict";
  var __moduleName = "app/routes/training/training.route";
  function require(path) {
    return $traceurRuntime.require("app/routes/training/training.route", path);
  }
  var template,
      angular,
      trainingControllerModule,
      trainingRouteModule;
  return {
    setters: [function(m) {
      template = m.default;
    }, function(m) {
      angular = m.default;
    }, function(m) {
      trainingControllerModule = m.trainingControllerModule;
    }],
    execute: function() {
      trainingRouteModule = $__export("trainingRouteModule", angular.module('trainingRouteModule', ['ui.router', trainingControllerModule.name]).config(['$stateProvider', function trainingRoute($stateProvider) {
        $stateProvider.state('training', {
          url: '/training',
          template: template
        });
      }]));
    }
  };
});



System.register("app/components/firebaseAuthentication/firebaseAuthentication.directive", ["./firebaseAuthentication.template.html!text", "angular", "./firebaseAuthentication.controller", "./firebaseLogin/firebaseLogin.directive", "./firebaseLogout/firebaseLogout.directive"], function($__export) {
  "use strict";
  var __moduleName = "app/components/firebaseAuthentication/firebaseAuthentication.directive";
  function require(path) {
    return $traceurRuntime.require("app/components/firebaseAuthentication/firebaseAuthentication.directive", path);
  }
  var template,
      angular,
      firebaseAuthenticationControllerModule,
      firebaseLoginDirectiveModule,
      firebaseLogoutDirectiveModule,
      firebaseAuthenticationDirectiveModule;
  return {
    setters: [function(m) {
      template = m.default;
    }, function(m) {
      angular = m.default;
    }, function(m) {
      firebaseAuthenticationControllerModule = m.firebaseAuthenticationControllerModule;
    }, function(m) {
      firebaseLoginDirectiveModule = m.firebaseLoginDirectiveModule;
    }, function(m) {
      firebaseLogoutDirectiveModule = m.firebaseLogoutDirectiveModule;
    }],
    execute: function() {
      firebaseAuthenticationDirectiveModule = $__export("firebaseAuthenticationDirectiveModule", angular.module('firebaseAuthenticationDirectiveModule', [firebaseAuthenticationControllerModule.name, firebaseLoginDirectiveModule.name, firebaseLogoutDirectiveModule.name]));
      firebaseAuthenticationDirectiveModule.directive('firebaseAuthentication', function() {
        return {
          restrict: 'AE',
          replace: true,
          transclude: true,
          scope: {
            auth: '&',
            user: '='
          },
          controller: 'FirebaseAuthenticationController',
          controllerAs: 'fbsAuth',
          bindToController: true,
          template: template
        };
      });
    }
  };
});



System.register("app/routes/diet/diet.route", ["./diet.template.html!text", "angular", "./diet.controller"], function($__export) {
  "use strict";
  var __moduleName = "app/routes/diet/diet.route";
  function require(path) {
    return $traceurRuntime.require("app/routes/diet/diet.route", path);
  }
  var template,
      angular,
      dietControllerModule,
      dietRouteModule;
  return {
    setters: [function(m) {
      template = m.default;
    }, function(m) {
      angular = m.default;
    }, function(m) {
      dietControllerModule = m.dietControllerModule;
    }],
    execute: function() {
      dietRouteModule = $__export("dietRouteModule", angular.module('dietRouteModule', ['ui.router', dietControllerModule.name]).config(['$stateProvider', function dietRoute($stateProvider) {
        $stateProvider.state('diet', {
          url: '/diet',
          template: template
        });
      }]));
    }
  };
});



System.register("app/main", ["ionic", "angularfire", "angular", "./routes/diet/diet.route", "./routes/training/training.route", "./config/main.config", "./components/firebaseAuthentication/firebaseAuthentication.directive"], function($__export) {
  "use strict";
  var __moduleName = "app/main";
  function require(path) {
    return $traceurRuntime.require("app/main", path);
  }
  var angular,
      dietRouteModule,
      trainingRouteModule,
      mainConfigModule,
      firebaseAuthenticationDirectiveModule,
      mainModule;
  return {
    setters: [function(m) {}, function(m) {}, function(m) {
      angular = m.default;
    }, function(m) {
      dietRouteModule = m.dietRouteModule;
    }, function(m) {
      trainingRouteModule = m.trainingRouteModule;
    }, function(m) {
      mainConfigModule = m.mainConfigModule;
    }, function(m) {
      firebaseAuthenticationDirectiveModule = m.firebaseAuthenticationDirectiveModule;
    }],
    execute: function() {
      mainModule = $__export("mainModule", angular.module('fatburnhub', ['ionic', 'firebase', mainConfigModule.name, firebaseAuthenticationDirectiveModule.name, dietRouteModule.name, trainingRouteModule.name]).run(['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth) {
        var ref = new Firebase("https://fatburnhub.firebaseio.com/");
        $rootScope.auth = $firebaseAuth(ref);
      }]));
    }
  };
});



System.register("app/bootstrap", ["./main"], function($__export) {
  "use strict";
  var __moduleName = "app/bootstrap";
  function require(path) {
    return $traceurRuntime.require("app/bootstrap", path);
  }
  var mainModule;
  return {
    setters: [function(m) {
      mainModule = m.mainModule;
    }],
    execute: function() {
      angular.element(document).ready(function() {
        angular.bootstrap(document, [mainModule.name]);
      });
    }
  };
});



System.register("github:systemjs/plugin-css@0.1.0/css", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/systemjs/plugin-css@0.1.0/css.js";
  var __dirname = "jspm_packages/github/systemjs/plugin-css@0.1.0";
if (typeof window !== 'undefined') {
  var waitSeconds = 100;
  var head = document.getElementsByTagName('head')[0];
  var links = document.getElementsByTagName('link');
  var linkHrefs = [];
  for (var i = 0; i < links.length; i++) {
    linkHrefs.push(links[i].href);
  }
  var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
  var webkitLoadCheck = function(link, callback) {
    setTimeout(function() {
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.href == link.href)
          return callback();
      }
      webkitLoadCheck(link, callback);
    }, 10);
  };
  var noop = function() {};
  var loadCSS = function(url) {
    return new Promise(function(resolve, reject) {
      var timeout = setTimeout(function() {
        reject('Unable to load CSS');
      }, waitSeconds * 1000);
      var _callback = function() {
        clearTimeout(timeout);
        link.onload = noop;
        setTimeout(function() {
          resolve('');
        }, 7);
      };
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      if (!isWebkit)
        link.onload = _callback;
      else
        webkitLoadCheck(link, _callback);
      head.appendChild(link);
    });
  };
  exports.fetch = function(load) {
    for (var i = 0; i < linkHrefs.length; i++)
      if (load.address == linkHrefs[i])
        return '';
    return loadCSS(load.address);
  };
} else {
  exports.build = false;
}



  global.define = __define;
  return module.exports;
});

System.register("github:angular-ui/ui-router@0.2.10/release/angular-ui-router", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular-ui/ui-router@0.2.10/release/angular-ui-router.js";
  var __dirname = "jspm_packages/github/angular-ui/ui-router@0.2.10/release";
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
  module.exports = 'ui.router';
}
(function(window, angular, undefined) {
  'use strict';
  var isDefined = angular.isDefined,
      isFunction = angular.isFunction,
      isString = angular.isString,
      isObject = angular.isObject,
      isArray = angular.isArray,
      forEach = angular.forEach,
      extend = angular.extend,
      copy = angular.copy;
  function inherit(parent, extra) {
    return extend(new (extend(function() {}, {prototype: parent}))(), extra);
  }
  function merge(dst) {
    forEach(arguments, function(obj) {
      if (obj !== dst) {
        forEach(obj, function(value, key) {
          if (!dst.hasOwnProperty(key))
            dst[key] = value;
        });
      }
    });
    return dst;
  }
  function ancestors(first, second) {
    var path = [];
    for (var n in first.path) {
      if (first.path[n] !== second.path[n])
        break;
      path.push(first.path[n]);
    }
    return path;
  }
  function keys(object) {
    if (Object.keys) {
      return Object.keys(object);
    }
    var result = [];
    angular.forEach(object, function(val, key) {
      result.push(key);
    });
    return result;
  }
  function arraySearch(array, value) {
    if (Array.prototype.indexOf) {
      return array.indexOf(value, Number(arguments[2]) || 0);
    }
    var len = array.length >>> 0,
        from = Number(arguments[2]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++) {
      if (from in array && array[from] === value)
        return from;
    }
    return -1;
  }
  function inheritParams(currentParams, newParams, $current, $to) {
    var parents = ancestors($current, $to),
        parentParams,
        inherited = {},
        inheritList = [];
    for (var i in parents) {
      if (!parents[i].params || !parents[i].params.length)
        continue;
      parentParams = parents[i].params;
      for (var j in parentParams) {
        if (arraySearch(inheritList, parentParams[j]) >= 0)
          continue;
        inheritList.push(parentParams[j]);
        inherited[parentParams[j]] = currentParams[parentParams[j]];
      }
    }
    return extend({}, inherited, newParams);
  }
  function normalize(keys, values) {
    var normalized = {};
    forEach(keys, function(name) {
      var value = values[name];
      normalized[name] = (value != null) ? String(value) : null;
    });
    return normalized;
  }
  function equalForKeys(a, b, keys) {
    if (!keys) {
      keys = [];
      for (var n in a)
        keys.push(n);
    }
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (a[k] != b[k])
        return false;
    }
    return true;
  }
  function filterByKeys(keys, values) {
    var filtered = {};
    forEach(keys, function(name) {
      filtered[name] = values[name];
    });
    return filtered;
  }
  angular.module('ui.router.util', ['ng']);
  angular.module('ui.router.router', ['ui.router.util']);
  angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);
  angular.module('ui.router', ['ui.router.state']);
  angular.module('ui.router.compat', ['ui.router']);
  $Resolve.$inject = ['$q', '$injector'];
  function $Resolve($q, $injector) {
    var VISIT_IN_PROGRESS = 1,
        VISIT_DONE = 2,
        NOTHING = {},
        NO_DEPENDENCIES = [],
        NO_LOCALS = NOTHING,
        NO_PARENT = extend($q.when(NOTHING), {
          $$promises: NOTHING,
          $$values: NOTHING
        });
    this.study = function(invocables) {
      if (!isObject(invocables))
        throw new Error("'invocables' must be an object");
      var plan = [],
          cycle = [],
          visited = {};
      function visit(value, key) {
        if (visited[key] === VISIT_DONE)
          return;
        cycle.push(key);
        if (visited[key] === VISIT_IN_PROGRESS) {
          cycle.splice(0, cycle.indexOf(key));
          throw new Error("Cyclic dependency: " + cycle.join(" -> "));
        }
        visited[key] = VISIT_IN_PROGRESS;
        if (isString(value)) {
          plan.push(key, [function() {
            return $injector.get(value);
          }], NO_DEPENDENCIES);
        } else {
          var params = $injector.annotate(value);
          forEach(params, function(param) {
            if (param !== key && invocables.hasOwnProperty(param))
              visit(invocables[param], param);
          });
          plan.push(key, value, params);
        }
        cycle.pop();
        visited[key] = VISIT_DONE;
      }
      forEach(invocables, visit);
      invocables = cycle = visited = null;
      function isResolve(value) {
        return isObject(value) && value.then && value.$$promises;
      }
      return function(locals, parent, self) {
        if (isResolve(locals) && self === undefined) {
          self = parent;
          parent = locals;
          locals = null;
        }
        if (!locals)
          locals = NO_LOCALS;
        else if (!isObject(locals)) {
          throw new Error("'locals' must be an object");
        }
        if (!parent)
          parent = NO_PARENT;
        else if (!isResolve(parent)) {
          throw new Error("'parent' must be a promise returned by $resolve.resolve()");
        }
        var resolution = $q.defer(),
            result = resolution.promise,
            promises = result.$$promises = {},
            values = extend({}, locals),
            wait = 1 + plan.length / 3,
            merged = false;
        function done() {
          if (!--wait) {
            if (!merged)
              merge(values, parent.$$values);
            result.$$values = values;
            result.$$promises = true;
            resolution.resolve(values);
          }
        }
        function fail(reason) {
          result.$$failure = reason;
          resolution.reject(reason);
        }
        if (isDefined(parent.$$failure)) {
          fail(parent.$$failure);
          return result;
        }
        if (parent.$$values) {
          merged = merge(values, parent.$$values);
          done();
        } else {
          extend(promises, parent.$$promises);
          parent.then(done, fail);
        }
        for (var i = 0,
            ii = plan.length; i < ii; i += 3) {
          if (locals.hasOwnProperty(plan[i]))
            done();
          else
            invoke(plan[i], plan[i + 1], plan[i + 2]);
        }
        function invoke(key, invocable, params) {
          var invocation = $q.defer(),
              waitParams = 0;
          function onfailure(reason) {
            invocation.reject(reason);
            fail(reason);
          }
          forEach(params, function(dep) {
            if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
              waitParams++;
              promises[dep].then(function(result) {
                values[dep] = result;
                if (!(--waitParams))
                  proceed();
              }, onfailure);
            }
          });
          if (!waitParams)
            proceed();
          function proceed() {
            if (isDefined(result.$$failure))
              return;
            try {
              invocation.resolve($injector.invoke(invocable, self, values));
              invocation.promise.then(function(result) {
                values[key] = result;
                done();
              }, onfailure);
            } catch (e) {
              onfailure(e);
            }
          }
          promises[key] = invocation.promise;
        }
        return result;
      };
    };
    this.resolve = function(invocables, locals, parent, self) {
      return this.study(invocables)(locals, parent, self);
    };
  }
  angular.module('ui.router.util').service('$resolve', $Resolve);
  $TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
  function $TemplateFactory($http, $templateCache, $injector) {
    this.fromConfig = function(config, params, locals) {
      return (isDefined(config.template) ? this.fromString(config.template, params) : isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) : isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) : null);
    };
    this.fromString = function(template, params) {
      return isFunction(template) ? template(params) : template;
    };
    this.fromUrl = function(url, params) {
      if (isFunction(url))
        url = url(params);
      if (url == null)
        return null;
      else
        return $http.get(url, {cache: $templateCache}).then(function(response) {
          return response.data;
        });
    };
    this.fromProvider = function(provider, params, locals) {
      return $injector.invoke(provider, null, locals || {params: params});
    };
  }
  angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);
  function UrlMatcher(pattern) {
    var placeholder = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        names = {},
        compiled = '^',
        last = 0,
        m,
        segments = this.segments = [],
        params = this.params = [];
    function addParameter(id) {
      if (!/^\w+(-+\w+)*$/.test(id))
        throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
      if (names[id])
        throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
      names[id] = true;
      params.push(id);
    }
    function quoteRegExp(string) {
      return string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    }
    this.source = pattern;
    var id,
        regexp,
        segment;
    while ((m = placeholder.exec(pattern))) {
      id = m[2] || m[3];
      regexp = m[4] || (m[1] == '*' ? '.*' : '[^/]*');
      segment = pattern.substring(last, m.index);
      if (segment.indexOf('?') >= 0)
        break;
      compiled += quoteRegExp(segment) + '(' + regexp + ')';
      addParameter(id);
      segments.push(segment);
      last = placeholder.lastIndex;
    }
    segment = pattern.substring(last);
    var i = segment.indexOf('?');
    if (i >= 0) {
      var search = this.sourceSearch = segment.substring(i);
      segment = segment.substring(0, i);
      this.sourcePath = pattern.substring(0, last + i);
      forEach(search.substring(1).split(/[&?]/), addParameter);
    } else {
      this.sourcePath = pattern;
      this.sourceSearch = '';
    }
    compiled += quoteRegExp(segment) + '$';
    segments.push(segment);
    this.regexp = new RegExp(compiled);
    this.prefix = segments[0];
  }
  UrlMatcher.prototype.concat = function(pattern) {
    return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch);
  };
  UrlMatcher.prototype.toString = function() {
    return this.source;
  };
  UrlMatcher.prototype.exec = function(path, searchParams) {
    var m = this.regexp.exec(path);
    if (!m)
      return null;
    var params = this.params,
        nTotal = params.length,
        nPath = this.segments.length - 1,
        values = {},
        i;
    if (nPath !== m.length - 1)
      throw new Error("Unbalanced capture group in route '" + this.source + "'");
    for (i = 0; i < nPath; i++)
      values[params[i]] = m[i + 1];
    for (; i < nTotal; i++)
      values[params[i]] = searchParams[params[i]];
    return values;
  };
  UrlMatcher.prototype.parameters = function() {
    return this.params;
  };
  UrlMatcher.prototype.format = function(values) {
    var segments = this.segments,
        params = this.params;
    if (!values)
      return segments.join('');
    var nPath = segments.length - 1,
        nTotal = params.length,
        result = segments[0],
        i,
        search,
        value;
    for (i = 0; i < nPath; i++) {
      value = values[params[i]];
      if (value != null)
        result += encodeURIComponent(value);
      result += segments[i + 1];
    }
    for (; i < nTotal; i++) {
      value = values[params[i]];
      if (value != null) {
        result += (search ? '&' : '?') + params[i] + '=' + encodeURIComponent(value);
        search = true;
      }
    }
    return result;
  };
  function $UrlMatcherFactory() {
    this.compile = function(pattern) {
      return new UrlMatcher(pattern);
    };
    this.isMatcher = function(o) {
      return isObject(o) && isFunction(o.exec) && isFunction(o.format) && isFunction(o.concat);
    };
    this.$get = function() {
      return this;
    };
  }
  angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
  $UrlRouterProvider.$inject = ['$urlMatcherFactoryProvider'];
  function $UrlRouterProvider($urlMatcherFactory) {
    var rules = [],
        otherwise = null;
    function regExpPrefix(re) {
      var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
      return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
    }
    function interpolate(pattern, match) {
      return pattern.replace(/\$(\$|\d{1,2})/, function(m, what) {
        return match[what === '$' ? 0 : Number(what)];
      });
    }
    this.rule = function(rule) {
      if (!isFunction(rule))
        throw new Error("'rule' must be a function");
      rules.push(rule);
      return this;
    };
    this.otherwise = function(rule) {
      if (isString(rule)) {
        var redirect = rule;
        rule = function() {
          return redirect;
        };
      } else if (!isFunction(rule))
        throw new Error("'rule' must be a function");
      otherwise = rule;
      return this;
    };
    function handleIfMatch($injector, handler, match) {
      if (!match)
        return false;
      var result = $injector.invoke(handler, handler, {$match: match});
      return isDefined(result) ? result : true;
    }
    this.when = function(what, handler) {
      var redirect,
          handlerIsString = isString(handler);
      if (isString(what))
        what = $urlMatcherFactory.compile(what);
      if (!handlerIsString && !isFunction(handler) && !isArray(handler))
        throw new Error("invalid 'handler' in when()");
      var strategies = {
        matcher: function(what, handler) {
          if (handlerIsString) {
            redirect = $urlMatcherFactory.compile(handler);
            handler = ['$match', function($match) {
              return redirect.format($match);
            }];
          }
          return extend(function($injector, $location) {
            return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
          }, {prefix: isString(what.prefix) ? what.prefix : ''});
        },
        regex: function(what, handler) {
          if (what.global || what.sticky)
            throw new Error("when() RegExp must not be global or sticky");
          if (handlerIsString) {
            redirect = handler;
            handler = ['$match', function($match) {
              return interpolate(redirect, $match);
            }];
          }
          return extend(function($injector, $location) {
            return handleIfMatch($injector, handler, what.exec($location.path()));
          }, {prefix: regExpPrefix(what)});
        }
      };
      var check = {
        matcher: $urlMatcherFactory.isMatcher(what),
        regex: what instanceof RegExp
      };
      for (var n in check) {
        if (check[n]) {
          return this.rule(strategies[n](what, handler));
        }
      }
      throw new Error("invalid 'what' in when()");
    };
    this.$get = ['$location', '$rootScope', '$injector', function($location, $rootScope, $injector) {
      function update(evt) {
        if (evt && evt.defaultPrevented)
          return;
        function check(rule) {
          var handled = rule($injector, $location);
          if (handled) {
            if (isString(handled))
              $location.replace().url(handled);
            return true;
          }
          return false;
        }
        var n = rules.length,
            i;
        for (i = 0; i < n; i++) {
          if (check(rules[i]))
            return;
        }
        if (otherwise)
          check(otherwise);
      }
      $rootScope.$on('$locationChangeSuccess', update);
      return {sync: function() {
          update();
        }};
    }];
  }
  angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);
  $StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider'];
  function $StateProvider($urlRouterProvider, $urlMatcherFactory, $locationProvider) {
    var root,
        states = {},
        $state,
        queue = {},
        abstractKey = 'abstract';
    var stateBuilder = {
      parent: function(state) {
        if (isDefined(state.parent) && state.parent)
          return findState(state.parent);
        var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
        return compositeName ? findState(compositeName[1]) : root;
      },
      data: function(state) {
        if (state.parent && state.parent.data) {
          state.data = state.self.data = extend({}, state.parent.data, state.data);
        }
        return state.data;
      },
      url: function(state) {
        var url = state.url;
        if (isString(url)) {
          if (url.charAt(0) == '^') {
            return $urlMatcherFactory.compile(url.substring(1));
          }
          return (state.parent.navigable || root).url.concat(url);
        }
        if ($urlMatcherFactory.isMatcher(url) || url == null) {
          return url;
        }
        throw new Error("Invalid url '" + url + "' in state '" + state + "'");
      },
      navigable: function(state) {
        return state.url ? state : (state.parent ? state.parent.navigable : null);
      },
      params: function(state) {
        if (!state.params) {
          return state.url ? state.url.parameters() : state.parent.params;
        }
        if (!isArray(state.params))
          throw new Error("Invalid params in state '" + state + "'");
        if (state.url)
          throw new Error("Both params and url specicified in state '" + state + "'");
        return state.params;
      },
      views: function(state) {
        var views = {};
        forEach(isDefined(state.views) ? state.views : {'': state}, function(view, name) {
          if (name.indexOf('@') < 0)
            name += '@' + state.parent.name;
          views[name] = view;
        });
        return views;
      },
      ownParams: function(state) {
        if (!state.parent) {
          return state.params;
        }
        var paramNames = {};
        forEach(state.params, function(p) {
          paramNames[p] = true;
        });
        forEach(state.parent.params, function(p) {
          if (!paramNames[p]) {
            throw new Error("Missing required parameter '" + p + "' in state '" + state.name + "'");
          }
          paramNames[p] = false;
        });
        var ownParams = [];
        forEach(paramNames, function(own, p) {
          if (own)
            ownParams.push(p);
        });
        return ownParams;
      },
      path: function(state) {
        return state.parent ? state.parent.path.concat(state) : [];
      },
      includes: function(state) {
        var includes = state.parent ? extend({}, state.parent.includes) : {};
        includes[state.name] = true;
        return includes;
      },
      $delegates: {}
    };
    function isRelative(stateName) {
      return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
    }
    function findState(stateOrName, base) {
      var isStr = isString(stateOrName),
          name = isStr ? stateOrName : stateOrName.name,
          path = isRelative(name);
      if (path) {
        if (!base)
          throw new Error("No reference point given for path '" + name + "'");
        var rel = name.split("."),
            i = 0,
            pathLength = rel.length,
            current = base;
        for (; i < pathLength; i++) {
          if (rel[i] === "" && i === 0) {
            current = base;
            continue;
          }
          if (rel[i] === "^") {
            if (!current.parent)
              throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
            current = current.parent;
            continue;
          }
          break;
        }
        rel = rel.slice(i).join(".");
        name = current.name + (current.name && rel ? "." : "") + rel;
      }
      var state = states[name];
      if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
        return state;
      }
      return undefined;
    }
    function queueState(parentName, state) {
      if (!queue[parentName]) {
        queue[parentName] = [];
      }
      queue[parentName].push(state);
    }
    function registerState(state) {
      state = inherit(state, {
        self: state,
        resolve: state.resolve || {},
        toString: function() {
          return this.name;
        }
      });
      var name = state.name;
      if (!isString(name) || name.indexOf('@') >= 0)
        throw new Error("State must have a valid name");
      if (states.hasOwnProperty(name))
        throw new Error("State '" + name + "'' is already defined");
      var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.')) : (isString(state.parent)) ? state.parent : '';
      if (parentName && !states[parentName]) {
        return queueState(parentName, state.self);
      }
      for (var key in stateBuilder) {
        if (isFunction(stateBuilder[key]))
          state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
      }
      states[name] = state;
      if (!state[abstractKey] && state.url) {
        $urlRouterProvider.when(state.url, ['$match', '$stateParams', function($match, $stateParams) {
          if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
            $state.transitionTo(state, $match, {location: false});
          }
        }]);
      }
      if (queue[name]) {
        for (var i = 0; i < queue[name].length; i++) {
          registerState(queue[name][i]);
        }
      }
      return state;
    }
    function isGlob(text) {
      return text.indexOf('*') > -1;
    }
    function doesStateMatchGlob(glob) {
      var globSegments = glob.split('.'),
          segments = $state.$current.name.split('.');
      if (globSegments[0] === '**') {
        segments = segments.slice(segments.indexOf(globSegments[1]));
        segments.unshift('**');
      }
      if (globSegments[globSegments.length - 1] === '**') {
        segments.splice(segments.indexOf(globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
        segments.push('**');
      }
      if (globSegments.length != segments.length) {
        return false;
      }
      for (var i = 0,
          l = globSegments.length; i < l; i++) {
        if (globSegments[i] === '*') {
          segments[i] = '*';
        }
      }
      return segments.join('') === globSegments.join('');
    }
    root = registerState({
      name: '',
      url: '^',
      views: null,
      'abstract': true
    });
    root.navigable = null;
    this.decorator = decorator;
    function decorator(name, func) {
      if (isString(name) && !isDefined(func)) {
        return stateBuilder[name];
      }
      if (!isFunction(func) || !isString(name)) {
        return this;
      }
      if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
        stateBuilder.$delegates[name] = stateBuilder[name];
      }
      stateBuilder[name] = func;
      return this;
    }
    this.state = state;
    function state(name, definition) {
      if (isObject(name))
        definition = name;
      else
        definition.name = name;
      registerState(definition);
      return this;
    }
    this.$get = $get;
    $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$location', '$urlRouter', '$browser'];
    function $get($rootScope, $q, $view, $injector, $resolve, $stateParams, $location, $urlRouter, $browser) {
      var TransitionSuperseded = $q.reject(new Error('transition superseded'));
      var TransitionPrevented = $q.reject(new Error('transition prevented'));
      var TransitionAborted = $q.reject(new Error('transition aborted'));
      var TransitionFailed = $q.reject(new Error('transition failed'));
      var currentLocation = $location.url();
      var baseHref = $browser.baseHref();
      function syncUrl() {
        if ($location.url() !== currentLocation) {
          $location.url(currentLocation);
          $location.replace();
        }
      }
      root.locals = {
        resolve: null,
        globals: {$stateParams: {}}
      };
      $state = {
        params: {},
        current: root.self,
        $current: root,
        transition: null
      };
      $state.reload = function reload() {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: false
        });
      };
      $state.go = function go(to, params, options) {
        return this.transitionTo(to, params, extend({
          inherit: true,
          relative: $state.$current
        }, options));
      };
      $state.transitionTo = function transitionTo(to, toParams, options) {
        toParams = toParams || {};
        options = extend({
          location: true,
          inherit: false,
          relative: null,
          notify: true,
          reload: false,
          $retry: false
        }, options || {});
        var from = $state.$current,
            fromParams = $state.params,
            fromPath = from.path;
        var evt,
            toState = findState(to, options.relative);
        if (!isDefined(toState)) {
          var redirect = {
            to: to,
            toParams: toParams,
            options: options
          };
          evt = $rootScope.$broadcast('$stateNotFound', redirect, from.self, fromParams);
          if (evt.defaultPrevented) {
            syncUrl();
            return TransitionAborted;
          }
          if (evt.retry) {
            if (options.$retry) {
              syncUrl();
              return TransitionFailed;
            }
            var retryTransition = $state.transition = $q.when(evt.retry);
            retryTransition.then(function() {
              if (retryTransition !== $state.transition)
                return TransitionSuperseded;
              redirect.options.$retry = true;
              return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
            }, function() {
              return TransitionAborted;
            });
            syncUrl();
            return retryTransition;
          }
          to = redirect.to;
          toParams = redirect.toParams;
          options = redirect.options;
          toState = findState(to, options.relative);
          if (!isDefined(toState)) {
            if (options.relative)
              throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
            throw new Error("No such state '" + to + "'");
          }
        }
        if (toState[abstractKey])
          throw new Error("Cannot transition to abstract state '" + to + "'");
        if (options.inherit)
          toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
        to = toState;
        var toPath = to.path;
        var keep,
            state,
            locals = root.locals,
            toLocals = [];
        for (keep = 0, state = toPath[keep]; state && state === fromPath[keep] && equalForKeys(toParams, fromParams, state.ownParams) && !options.reload; keep++, state = toPath[keep]) {
          locals = toLocals[keep] = state.locals;
        }
        if (shouldTriggerReload(to, from, locals, options)) {
          if (to.self.reloadOnSearch !== false)
            syncUrl();
          $state.transition = null;
          return $q.when($state.current);
        }
        toParams = normalize(to.params, toParams || {});
        if (options.notify) {
          evt = $rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams);
          if (evt.defaultPrevented) {
            syncUrl();
            return TransitionPrevented;
          }
        }
        var resolved = $q.when(locals);
        for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
          locals = toLocals[l] = inherit(locals);
          resolved = resolveState(state, toParams, state === to, resolved, locals);
        }
        var transition = $state.transition = resolved.then(function() {
          var l,
              entering,
              exiting;
          if ($state.transition !== transition)
            return TransitionSuperseded;
          for (l = fromPath.length - 1; l >= keep; l--) {
            exiting = fromPath[l];
            if (exiting.self.onExit) {
              $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
            }
            exiting.locals = null;
          }
          for (l = keep; l < toPath.length; l++) {
            entering = toPath[l];
            entering.locals = toLocals[l];
            if (entering.self.onEnter) {
              $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
            }
          }
          if ($state.transition !== transition)
            return TransitionSuperseded;
          $state.$current = to;
          $state.current = to.self;
          $state.params = toParams;
          copy($state.params, $stateParams);
          $state.transition = null;
          var toNav = to.navigable;
          if (options.location && toNav) {
            $location.url(toNav.url.format(toNav.locals.globals.$stateParams));
            if (options.location === 'replace') {
              $location.replace();
            }
          }
          if (options.notify) {
            $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
          }
          currentLocation = $location.url();
          return $state.current;
        }, function(error) {
          if ($state.transition !== transition)
            return TransitionSuperseded;
          $state.transition = null;
          $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);
          syncUrl();
          return $q.reject(error);
        });
        return transition;
      };
      $state.is = function is(stateOrName, params) {
        var state = findState(stateOrName);
        if (!isDefined(state)) {
          return undefined;
        }
        if ($state.$current !== state) {
          return false;
        }
        return isDefined(params) && params !== null ? angular.equals($stateParams, params) : true;
      };
      $state.includes = function includes(stateOrName, params) {
        if (isString(stateOrName) && isGlob(stateOrName)) {
          if (doesStateMatchGlob(stateOrName)) {
            stateOrName = $state.$current.name;
          } else {
            return false;
          }
        }
        var state = findState(stateOrName);
        if (!isDefined(state)) {
          return undefined;
        }
        if (!isDefined($state.$current.includes[state.name])) {
          return false;
        }
        var validParams = true;
        angular.forEach(params, function(value, key) {
          if (!isDefined($stateParams[key]) || $stateParams[key] !== value) {
            validParams = false;
          }
        });
        return validParams;
      };
      $state.href = function href(stateOrName, params, options) {
        options = extend({
          lossy: true,
          inherit: false,
          absolute: false,
          relative: $state.$current
        }, options || {});
        var state = findState(stateOrName, options.relative);
        if (!isDefined(state))
          return null;
        params = inheritParams($stateParams, params || {}, $state.$current, state);
        var nav = (state && options.lossy) ? state.navigable : state;
        var url = (nav && nav.url) ? nav.url.format(normalize(state.params, params || {})) : null;
        if (!$locationProvider.html5Mode() && url) {
          url = "#" + $locationProvider.hashPrefix() + url;
        }
        if (baseHref !== '/') {
          if ($locationProvider.html5Mode()) {
            url = baseHref.slice(0, -1) + url;
          } else if (options.absolute) {
            url = baseHref.slice(1) + url;
          }
        }
        if (options.absolute && url) {
          url = $location.protocol() + '://' + $location.host() + ($location.port() == 80 || $location.port() == 443 ? '' : ':' + $location.port()) + (!$locationProvider.html5Mode() && url ? '/' : '') + url;
        }
        return url;
      };
      $state.get = function(stateOrName, context) {
        if (!isDefined(stateOrName)) {
          var list = [];
          forEach(states, function(state) {
            list.push(state.self);
          });
          return list;
        }
        var state = findState(stateOrName, context);
        return (state && state.self) ? state.self : null;
      };
      function resolveState(state, params, paramsAreFiltered, inherited, dst) {
        var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params, params);
        var locals = {$stateParams: $stateParams};
        dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
        var promises = [dst.resolve.then(function(globals) {
          dst.globals = globals;
        })];
        if (inherited)
          promises.push(inherited);
        forEach(state.views, function(view, name) {
          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
          injectables.$template = [function() {
            return $view.load(name, {
              view: view,
              locals: locals,
              params: $stateParams,
              notify: false
            }) || '';
          }];
          promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function(result) {
            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
              var injectLocals = angular.extend({}, injectables, locals);
              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
            } else {
              result.$$controller = view.controller;
            }
            result.$$state = state;
            result.$$controllerAs = view.controllerAs;
            dst[name] = result;
          }));
        });
        return $q.all(promises).then(function(values) {
          return dst;
        });
      }
      return $state;
    }
    function shouldTriggerReload(to, from, locals, options) {
      if (to === from && ((locals === from.locals && !options.reload) || (to.self.reloadOnSearch === false))) {
        return true;
      }
    }
  }
  angular.module('ui.router.state').value('$stateParams', {}).provider('$state', $StateProvider);
  $ViewProvider.$inject = [];
  function $ViewProvider() {
    this.$get = $get;
    $get.$inject = ['$rootScope', '$templateFactory'];
    function $get($rootScope, $templateFactory) {
      return {load: function load(name, options) {
          var result,
              defaults = {
                template: null,
                controller: null,
                view: null,
                locals: null,
                notify: true,
                async: true,
                params: {}
              };
          options = extend(defaults, options);
          if (options.view) {
            result = $templateFactory.fromConfig(options.view, options.params, options.locals);
          }
          if (result && options.notify) {
            $rootScope.$broadcast('$viewContentLoading', options);
          }
          return result;
        }};
    }
  }
  angular.module('ui.router.state').provider('$view', $ViewProvider);
  function $ViewScrollProvider() {
    var useAnchorScroll = false;
    this.useAnchorScroll = function() {
      useAnchorScroll = true;
    };
    this.$get = ['$anchorScroll', '$timeout', function($anchorScroll, $timeout) {
      if (useAnchorScroll) {
        return $anchorScroll;
      }
      return function($element) {
        $timeout(function() {
          $element[0].scrollIntoView();
        }, 0, false);
      };
    }];
  }
  angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);
  $ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll'];
  function $ViewDirective($state, $injector, $uiViewScroll) {
    function getService() {
      return ($injector.has) ? function(service) {
        return $injector.has(service) ? $injector.get(service) : null;
      } : function(service) {
        try {
          return $injector.get(service);
        } catch (e) {
          return null;
        }
      };
    }
    var service = getService(),
        $animator = service('$animator'),
        $animate = service('$animate');
    function getRenderer(attrs, scope) {
      var statics = function() {
        return {
          enter: function(element, target, cb) {
            target.after(element);
            cb();
          },
          leave: function(element, cb) {
            element.remove();
            cb();
          }
        };
      };
      if ($animate) {
        return {
          enter: function(element, target, cb) {
            $animate.enter(element, null, target, cb);
          },
          leave: function(element, cb) {
            $animate.leave(element, cb);
          }
        };
      }
      if ($animator) {
        var animate = $animator && $animator(scope, attrs);
        return {
          enter: function(element, target, cb) {
            animate.enter(element, null, target);
            cb();
          },
          leave: function(element, cb) {
            animate.leave(element);
            cb();
          }
        };
      }
      return statics();
    }
    var directive = {
      restrict: 'ECA',
      terminal: true,
      priority: 400,
      transclude: 'element',
      compile: function(tElement, tAttrs, $transclude) {
        return function(scope, $element, attrs) {
          var previousEl,
              currentEl,
              currentScope,
              latestLocals,
              onloadExp = attrs.onload || '',
              autoScrollExp = attrs.autoscroll,
              renderer = getRenderer(attrs, scope);
          scope.$on('$stateChangeSuccess', function() {
            updateView(false);
          });
          scope.$on('$viewContentLoading', function() {
            updateView(false);
          });
          updateView(true);
          function cleanupLastView() {
            if (previousEl) {
              previousEl.remove();
              previousEl = null;
            }
            if (currentScope) {
              currentScope.$destroy();
              currentScope = null;
            }
            if (currentEl) {
              renderer.leave(currentEl, function() {
                previousEl = null;
              });
              previousEl = currentEl;
              currentEl = null;
            }
          }
          function updateView(firstTime) {
            var newScope = scope.$new(),
                name = currentEl && currentEl.data('$uiViewName'),
                previousLocals = name && $state.$current && $state.$current.locals[name];
            if (!firstTime && previousLocals === latestLocals)
              return;
            var clone = $transclude(newScope, function(clone) {
              renderer.enter(clone, $element, function onUiViewEnter() {
                if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                  $uiViewScroll(clone);
                }
              });
              cleanupLastView();
            });
            latestLocals = $state.$current.locals[clone.data('$uiViewName')];
            currentEl = clone;
            currentScope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          }
        };
      }
    };
    return directive;
  }
  $ViewDirectiveFill.$inject = ['$compile', '$controller', '$state'];
  function $ViewDirectiveFill($compile, $controller, $state) {
    return {
      restrict: 'ECA',
      priority: -400,
      compile: function(tElement) {
        var initial = tElement.html();
        return function(scope, $element, attrs) {
          var name = attrs.uiView || attrs.name || '',
              inherited = $element.inheritedData('$uiView');
          if (name.indexOf('@') < 0) {
            name = name + '@' + (inherited ? inherited.state.name : '');
          }
          $element.data('$uiViewName', name);
          var current = $state.$current,
              locals = current && current.locals[name];
          if (!locals) {
            return;
          }
          $element.data('$uiView', {
            name: name,
            state: locals.$$state
          });
          $element.html(locals.$template ? locals.$template : initial);
          var link = $compile($element.contents());
          if (locals.$$controller) {
            locals.$scope = scope;
            var controller = $controller(locals.$$controller, locals);
            if (locals.$$controllerAs) {
              scope[locals.$$controllerAs] = controller;
            }
            $element.data('$ngControllerController', controller);
            $element.children().data('$ngControllerController', controller);
          }
          link(scope);
        };
      }
    };
  }
  angular.module('ui.router.state').directive('uiView', $ViewDirective);
  angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
  function parseStateRef(ref) {
    var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
    if (!parsed || parsed.length !== 4)
      throw new Error("Invalid state ref '" + ref + "'");
    return {
      state: parsed[1],
      paramExpr: parsed[3] || null
    };
  }
  function stateContext(el) {
    var stateData = el.parent().inheritedData('$uiView');
    if (stateData && stateData.state && stateData.state.name) {
      return stateData.state;
    }
  }
  $StateRefDirective.$inject = ['$state', '$timeout'];
  function $StateRefDirective($state, $timeout) {
    var allowedOptions = ['location', 'inherit', 'reload'];
    return {
      restrict: 'A',
      require: '?^uiSrefActive',
      link: function(scope, element, attrs, uiSrefActive) {
        var ref = parseStateRef(attrs.uiSref);
        var params = null,
            url = null,
            base = stateContext(element) || $state.$current;
        var isForm = element[0].nodeName === "FORM";
        var attr = isForm ? "action" : "href",
            nav = true;
        var options = {relative: base};
        var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {};
        angular.forEach(allowedOptions, function(option) {
          if (option in optionsOverride) {
            options[option] = optionsOverride[option];
          }
        });
        var update = function(newVal) {
          if (newVal)
            params = newVal;
          if (!nav)
            return;
          var newHref = $state.href(ref.state, params, options);
          if (uiSrefActive) {
            uiSrefActive.$$setStateInfo(ref.state, params);
          }
          if (!newHref) {
            nav = false;
            return false;
          }
          element[0][attr] = newHref;
        };
        if (ref.paramExpr) {
          scope.$watch(ref.paramExpr, function(newVal, oldVal) {
            if (newVal !== params)
              update(newVal);
          }, true);
          params = scope.$eval(ref.paramExpr);
        }
        update();
        if (isForm)
          return;
        element.bind("click", function(e) {
          var button = e.which || e.button;
          if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target'))) {
            $timeout(function() {
              $state.go(ref.state, params, options);
            });
            e.preventDefault();
          }
        });
      }
    };
  }
  $StateActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
  function $StateActiveDirective($state, $stateParams, $interpolate) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var state,
            params,
            activeClass;
        activeClass = $interpolate($attrs.uiSrefActive || '', false)($scope);
        this.$$setStateInfo = function(newState, newParams) {
          state = $state.get(newState, stateContext($element));
          params = newParams;
          update();
        };
        $scope.$on('$stateChangeSuccess', update);
        function update() {
          if ($state.$current.self === state && matchesParams()) {
            $element.addClass(activeClass);
          } else {
            $element.removeClass(activeClass);
          }
        }
        function matchesParams() {
          return !params || equalForKeys(params, $stateParams);
        }
      }]
    };
  }
  angular.module('ui.router.state').directive('uiSref', $StateRefDirective).directive('uiSrefActive', $StateActiveDirective);
  $IsStateFilter.$inject = ['$state'];
  function $IsStateFilter($state) {
    return function(state) {
      return $state.is(state);
    };
  }
  $IncludedByStateFilter.$inject = ['$state'];
  function $IncludedByStateFilter($state) {
    return function(state) {
      return $state.includes(state);
    };
  }
  angular.module('ui.router.state').filter('isState', $IsStateFilter).filter('includedByState', $IncludedByStateFilter);
  $RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
  function $RouteProvider($stateProvider, $urlRouterProvider) {
    var routes = [];
    onEnterRoute.$inject = ['$$state'];
    function onEnterRoute($$state) {
      this.locals = $$state.locals.globals;
      this.params = this.locals.$stateParams;
    }
    function onExitRoute() {
      this.locals = null;
      this.params = null;
    }
    this.when = when;
    function when(url, route) {
      if (route.redirectTo != null) {
        var redirect = route.redirectTo,
            handler;
        if (isString(redirect)) {
          handler = redirect;
        } else if (isFunction(redirect)) {
          handler = function(params, $location) {
            return redirect(params, $location.path(), $location.search());
          };
        } else {
          throw new Error("Invalid 'redirectTo' in when()");
        }
        $urlRouterProvider.when(url, handler);
      } else {
        $stateProvider.state(inherit(route, {
          parent: null,
          name: 'route:' + encodeURIComponent(url),
          url: url,
          onEnter: onEnterRoute,
          onExit: onExitRoute
        }));
      }
      routes.push(route);
      return this;
    }
    this.$get = $get;
    $get.$inject = ['$state', '$rootScope', '$routeParams'];
    function $get($state, $rootScope, $routeParams) {
      var $route = {
        routes: routes,
        params: $routeParams,
        current: undefined
      };
      function stateAsRoute(state) {
        return (state.name !== '') ? state : undefined;
      }
      $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
        $rootScope.$broadcast('$routeChangeStart', stateAsRoute(to), stateAsRoute(from));
      });
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $route.current = stateAsRoute(to);
        $rootScope.$broadcast('$routeChangeSuccess', stateAsRoute(to), stateAsRoute(from));
        copy(toParams, $route.params);
      });
      $rootScope.$on('$stateChangeError', function(ev, to, toParams, from, fromParams, error) {
        $rootScope.$broadcast('$routeChangeError', stateAsRoute(to), stateAsRoute(from), error);
      });
      return $route;
    }
  }
  angular.module('ui.router.compat').provider('$route', $RouteProvider).directive('ngView', $ViewDirective);
})(window, window.angular);



  global.define = __define;
  return module.exports;
});

System.register("app/routes/diet/diet.template.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "app/routes/diet/diet.template.html";
  var __dirname = "app/routes/diet";
module.exports = "diet\n<div ng-controller=\"MyControllerDiet\">\n\t<h1 class=\"title\">{{data.greetMe}}</h1>\n</div>";



  global.define = __define;
  return module.exports;
});

System.register("app/routes/training/training.template.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "app/routes/training/training.template.html";
  var __dirname = "app/routes/training";
module.exports = "training\n<div ng-controller=\"MyController\">\n\t<label class=\"item item-input\">\n\t  <span class=\"input-label\">greet</span>\n\t  <input type=\"text\" ng-model=\"data.greetMe\" />\n\t</label>\n</div>";



  global.define = __define;
  return module.exports;
});

System.register("app/components/firebaseAuthentication/firebaseAuthentication.template.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "app/components/firebaseAuthentication/firebaseAuthentication.template.html";
  var __dirname = "app/components/firebaseAuthentication";
module.exports = "<div ng-transclude></div>";



  global.define = __define;
  return module.exports;
});

System.register("github:systemjs/plugin-css@0.1.0", ["github:systemjs/plugin-css@0.1.0/css"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/systemjs/plugin-css@0.1.0.js";
  var __dirname = "jspm_packages/github/systemjs";
module.exports = require("github:systemjs/plugin-css@0.1.0/css");



  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular@1.3.4", ["github:angular/bower-angular@1.3.4/angular.min"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular@1.3.4.js";
  var __dirname = "jspm_packages/github/angular";
module.exports = require("github:angular/bower-angular@1.3.4/angular.min");



  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular-animate@1.3.4", ["github:angular/bower-angular-animate@1.3.4/angular-animate"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular-animate@1.3.4.js";
  var __dirname = "jspm_packages/github/angular";
module.exports = require("github:angular/bower-angular-animate@1.3.4/angular-animate");



  global.define = __define;
  return module.exports;
});

System.register("github:angular/bower-angular-sanitize@1.3.4", ["github:angular/bower-angular-sanitize@1.3.4/angular-sanitize"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular/bower-angular-sanitize@1.3.4.js";
  var __dirname = "jspm_packages/github/angular";
module.exports = require("github:angular/bower-angular-sanitize@1.3.4/angular-sanitize");



  global.define = __define;
  return module.exports;
});

System.register("github:angular-ui/ui-router@0.2.10", ["github:angular-ui/ui-router@0.2.10/release/angular-ui-router"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/angular-ui/ui-router@0.2.10.js";
  var __dirname = "jspm_packages/github/angular-ui";
module.exports = require("github:angular-ui/ui-router@0.2.10/release/angular-ui-router");



  global.define = __define;
  return module.exports;
});

System.register("github:firebase/firebase-bower@2.0.5", ["github:firebase/firebase-bower@2.0.5/firebase"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/firebase/firebase-bower@2.0.5.js";
  var __dirname = "jspm_packages/github/firebase";
module.exports = require("github:firebase/firebase-bower@2.0.5/firebase");



  global.define = __define;
  return module.exports;
});

System.register("github:firebase/angularfire@0.9.0", ["github:firebase/angularfire@0.9.0/angularfire"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/firebase/angularfire@0.9.0.js";
  var __dirname = "jspm_packages/github/firebase";
module.exports = require("github:firebase/angularfire@0.9.0/angularfire");



  global.define = __define;
  return module.exports;
});

System.register("github:driftyco/ionic-bower@1.0.0-beta.13", ["github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular"], true, function(require, exports, module) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var __filename = "jspm_packages/github/driftyco/ionic-bower@1.0.0-beta.13.js";
  var __dirname = "jspm_packages/github/driftyco";
module.exports = require("github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular");



  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=build-2.js.map