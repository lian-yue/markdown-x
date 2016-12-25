(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarkdownXTest"] = factory();
	else
		root["MarkdownXTest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(5);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Token = __webpack_require__(71);
	var Node = __webpack_require__(101);
	
	(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  var data, now, node, token, textarea, timems, test;
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return fetch('./README.md');
	
	        case 2:
	          data = _context.sent;
	          _context.next = 5;
	          return data.text();
	
	        case 5:
	          data = _context.sent;
	          now = Date.now();
	          node = new Node();
	          token = new Token(data);
	
	          token.toNode(document.querySelector('#rename'));
	          console.log('timems: ' + (Date.now() - now));
	
	          _context.next = 13;
	          return fetch('./test.md');
	
	        case 13:
	          data = _context.sent;
	          _context.next = 16;
	          return data.text();
	
	        case 16:
	          data = _context.sent;
	          textarea = document.querySelector('#textarea');
	          timems = document.querySelector('#timems');
	          test = document.querySelector('#test');
	
	          textarea.value = data;
	          textarea.onchange = function () {
	            var now = Date.now();
	            var token = new Token(this.value);
	            token.toNode(test);
	            timems.innerHTML = Date.now() - now;
	          };
	          textarea.onchange();
	
	        case 23:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, this);
	}))();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(3);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _promise = __webpack_require__(6);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }
	
	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }
	
	      return step("next");
	    });
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(53);
	__webpack_require__(57);
	module.exports = __webpack_require__(17).Promise;

/***/ },
/* 8 */
/***/ function(module, exports) {



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(10)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(13)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(11)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(14)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(30)
	  , hide           = __webpack_require__(20)
	  , has            = __webpack_require__(31)
	  , Iterators      = __webpack_require__(32)
	  , $iterCreate    = __webpack_require__(33)
	  , setToStringTag = __webpack_require__(49)
	  , getPrototypeOf = __webpack_require__(51)
	  , ITERATOR       = __webpack_require__(50)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(17)
	  , ctx       = __webpack_require__(18)
	  , hide      = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(21)
	  , createDesc = __webpack_require__(29);
	module.exports = __webpack_require__(25) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(22)
	  , IE8_DOM_DEFINE = __webpack_require__(24)
	  , toPrimitive    = __webpack_require__(28)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(25) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(25) && !__webpack_require__(26)(function(){
	  return Object.defineProperty(__webpack_require__(27)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(26)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(23)
	  , document = __webpack_require__(16).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(23);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);

/***/ },
/* 31 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(34)
	  , descriptor     = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(49)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(20)(IteratorPrototype, __webpack_require__(50)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(22)
	  , dPs         = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(27)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(21)
	  , anObject = __webpack_require__(22)
	  , getKeys  = __webpack_require__(36);
	
	module.exports = __webpack_require__(25) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(47);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(31)
	  , toIObject    = __webpack_require__(38)
	  , arrayIndexOf = __webpack_require__(41)(false)
	  , IE_PROTO     = __webpack_require__(44)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(39)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(40);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(38)
	  , toLength  = __webpack_require__(42)
	  , toIndex   = __webpack_require__(43);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(11)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(11)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(45)('keys')
	  , uid    = __webpack_require__(46);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(21).f
	  , has = __webpack_require__(31)
	  , TAG = __webpack_require__(50)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(45)('wks')
	  , uid        = __webpack_require__(46)
	  , Symbol     = __webpack_require__(16).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(31)
	  , toObject    = __webpack_require__(52)
	  , IE_PROTO    = __webpack_require__(44)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	var global        = __webpack_require__(16)
	  , hide          = __webpack_require__(20)
	  , Iterators     = __webpack_require__(32)
	  , TO_STRING_TAG = __webpack_require__(50)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(55)
	  , step             = __webpack_require__(56)
	  , Iterators        = __webpack_require__(32)
	  , toIObject        = __webpack_require__(38);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(13)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(14)
	  , global             = __webpack_require__(16)
	  , ctx                = __webpack_require__(18)
	  , classof            = __webpack_require__(58)
	  , $export            = __webpack_require__(15)
	  , isObject           = __webpack_require__(23)
	  , aFunction          = __webpack_require__(19)
	  , anInstance         = __webpack_require__(59)
	  , forOf              = __webpack_require__(60)
	  , speciesConstructor = __webpack_require__(64)
	  , task               = __webpack_require__(65).set
	  , microtask          = __webpack_require__(67)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(50)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(68)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(49)($Promise, PROMISE);
	__webpack_require__(69)(PROMISE);
	Wrapper = __webpack_require__(17)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(70)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(40)
	  , TAG = __webpack_require__(50)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(18)
	  , call        = __webpack_require__(61)
	  , isArrayIter = __webpack_require__(62)
	  , anObject    = __webpack_require__(22)
	  , toLength    = __webpack_require__(42)
	  , getIterFn   = __webpack_require__(63)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(22);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(32)
	  , ITERATOR   = __webpack_require__(50)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(58)
	  , ITERATOR  = __webpack_require__(50)('iterator')
	  , Iterators = __webpack_require__(32);
	module.exports = __webpack_require__(17).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(22)
	  , aFunction = __webpack_require__(19)
	  , SPECIES   = __webpack_require__(50)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(18)
	  , invoke             = __webpack_require__(66)
	  , html               = __webpack_require__(48)
	  , cel                = __webpack_require__(27)
	  , global             = __webpack_require__(16)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(40)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , macrotask = __webpack_require__(65).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(40)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(20);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(16)
	  , core        = __webpack_require__(17)
	  , dP          = __webpack_require__(21)
	  , DESCRIPTORS = __webpack_require__(25)
	  , SPECIES     = __webpack_require__(50)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(50)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _defineProperty2 = __webpack_require__(72);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _typeof2 = __webpack_require__(76);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _assign = __webpack_require__(95);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(99);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(100);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Token$rules;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NESTING = 16;
	
	var SPACE = " ";
	
	var TAB = "\t";
	
	var NEWLINE = "\n";
	
	var NEWLINE_SPLIT = /(?:\r\n|[\r\n\u2424])/;
	
	var TAG_NAME = /[ \t\r\n\0\x0B\u00a0\/>]/;
	
	var TAG_END = /[ \t\r\n\0\x0B\u00a0>]/;
	
	var DIFF_ADD = 1;
	var DIFF_DELETE = 2;
	var DIFF_REPLACE = 3;
	
	var Token = function () {
	  (0, _createClass3.default)(Token, null, [{
	    key: "getRule",
	    value: function getRule(name) {
	      return this.rules[name];
	    }
	  }, {
	    key: "addRule",
	    value: function addRule(name, option) {
	      this.rules[name] = option;
	      return true;
	    }
	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return this.attributes[name];
	    }
	  }, {
	    key: "addAttribute",
	    value: function addAttribute(name, call) {
	      this.attributes[name] = call;
	      return true;
	    }
	  }, {
	    key: "addVariable",
	    value: function addVariable(name, option) {
	      this.variables[name] = option;
	      return true;
	    }
	  }, {
	    key: "getVariable",
	    value: function getVariable(name) {
	      return this.variables[name];
	    }
	
	    // 全部规则
	
	
	    // 缓存正则
	
	
	    // 全部变量
	
	
	    // 父节点
	
	
	    // 父节点名
	
	
	    // 快
	
	
	    // 黑名单
	
	
	    // 白名单
	
	
	    // 基础父级
	
	
	    // 基础快
	
	
	    // 基础黑名单
	
	  }]);
	
	  function Token(data, options) {
	    (0, _classCallCheck3.default)(this, Token);
	    this.rules = {};
	    this._regexp = {};
	    this.variables = {};
	    this.dataStack = [];
	    this.document = {
	      nodeName: '#document',
	      children: []
	    };
	    this.parentNodeStack = [];
	    this.parentNameStack = [];
	    this.parentNode = this.document;
	    this.blockStack = [];
	    this.block = true;
	    this.blackListStack = [];
	    this.blackList = {};
	    this.whiteListStack = [];
	    this.whiteList = null;
	    this.baseParentNodeStack = [];
	    this.baseBlockStack = [];
	    this.baseBlock = true;
	    this.baseBlackListStack = [];
	    this.baseBlackList = {};
	
	    this.options = (0, _assign2.default)({}, this.constructor.options, options || {});
	    this.parserRules();
	    this.prepare(data);
	    this.parser();
	  }
	
	  (0, _createClass3.default)(Token, [{
	    key: "escapeHtml",
	    value: function escapeHtml(html, encode) {
	      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }
	  }, {
	    key: "unescapeHtml",
	    value: function unescapeHtml(html) {
	      var htmlEscapes = this.constructor.htmlEscapes;
	      return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (_, n) {
	        n = n.toLowerCase();
	        if (n.charAt(0) === '#') {
	          return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
	        }
	        var id = htmlEscapes[n];
	        if (!id) {
	          return '';
	        }
	        return String.fromCharCode(id);
	        return '';
	      });
	    }
	  }, {
	    key: "escapeId",
	    value: function escapeId(id) {
	      return encodeURI(id.replace(/[#?&.%\s-]+/g, '-').toLowerCase().trim()).replace(/\%/g, '');
	    }
	  }, {
	    key: "parserRules",
	    value: function parserRules() {
	      var name;
	      var rule;
	      var documents = {};
	      var blocks = {};
	      var inlines = {};
	      for (name in this.constructor.rules) {
	        rule = this.constructor.rules[name];
	        if (!rule) {
	          continue;
	        }
	        rule = (0, _assign2.default)({}, rule);
	        rule.name = name;
	        if (rule.html == undefined) {
	          rule.html = name.indexOf('_') == -1 && name.charAt(0) >= 'a' && name.charAt(0) <= 'z';
	        }
	        if (rule.match) {
	          if (typeof rule.match == 'function') {
	            rule.match = rule.match.call(this);
	          }
	          if (!(rule.match instanceof RegExp)) {
	            throw new Error('规则必须是正则');
	          }
	        }
	        this.rules[name] = rule;
	
	        if (!rule.match || rule.black || !rule.prepare) {
	          continue;
	        }
	
	        if (rule.inline) {
	          inlines[name] = rule;
	        }
	
	        if (rule.block) {
	          blocks[name] = rule;
	          documents[name] = rule;
	        }
	
	        if (rule.document) {
	          documents[name] = rule;
	        }
	      }
	
	      // 处理替换 {{}}
	      for (name in this.rules) {
	        rule = this.rules[name];
	        if (rule.match) {
	          rule.match = this.regexp(rule.match);
	        }
	      }
	
	      // 处理优先级
	      documents = this.parserPriority(documents);
	      blocks = this.parserPriority(blocks);
	      inlines = this.parserPriority(inlines);
	
	      // 处理  regexp
	      documents = this.parserPriority(documents);
	      blocks = this.parserPriority(blocks);
	      inlines = this.parserPriority(inlines);
	
	      // 处理 match
	      var blockMatch = '((?:^|{{$newline}}){{$blank}}*?)(?:%s)(?:(?={{$newline}})|$)';
	      var inlineMatch = '((?:^|(?!{{$backslash}}).)(?:{{$backslash}}{2})*)(?:%s)';
	      this.documentMatch = this.parserMatch(documents, blockMatch);
	      this.blockMatch = this.parserMatch(blocks, blockMatch);
	      this.inlineMatch = this.parserMatch(inlines, inlineMatch);
	    }
	  }, {
	    key: "parserMatch",
	    value: function parserMatch(rules, regexp) {
	      var matchs = [];
	      var maps = {};
	      var mapsLength = {};
	      var mapKey = 1;
	      var rule;
	
	      var exec;
	      var search;
	      for (var name in rules) {
	        rule = rules[name];
	        mapKey++;
	        maps[mapKey] = rule;
	
	        matchs.push('(' + rule.match.source.replace(/([^\\](?:\\\\)*)\\(\d+)/g, function (result, before, id) {
	          return before + '\\' + (mapKey + parseInt(id));
	        }) + ')');
	
	        search = rule.match.source;
	        while (exec = /(?:^|[^\\])(?:\\\\)*(\((?!\?)|\[)/.exec(search)) {
	          search = search.substr(exec.index + exec[0].length);
	          if (exec[1] == '[') {
	            exec = /(?:^|[^\\])(?:\\\\)*\]/.exec(search);
	            search = exec ? search.substr(exec.index + exec[0].length) : '';
	          } else {
	            mapKey++;
	          }
	        }
	      }
	      return { regexp: this.regexp(new RegExp(regexp.replace('%s', matchs.join('|')), 'i')), rules: maps };
	    }
	  }, {
	    key: "parserPriority",
	    value: function parserPriority(rules) {
	      var array = [];
	      var rule;
	      for (var name in rules) {
	        rule = rules[name];
	        array.push({
	          name: name,
	          rule: rule
	        });
	      }
	      array.sort(function (a, b) {
	        return (a.rule.priority || 50) - (b.rule.priority || 50);
	      });
	      var results = {};
	      var i;
	      for (i = 0; i < array.length; i++) {
	        results[array[i].name] = array[i].rule;
	      }
	      return results;
	    }
	  }, {
	    key: "regexp",
	    value: function regexp(_regexp) {
	      var _this = this;
	
	      if (!this._regexp[_regexp]) {
	        this._regexp[_regexp] = new RegExp(_regexp.source.replace(/\{\{(.+?)\}\}/g, function (result, name) {
	          if (!_this.rules[name]) {
	            return result;
	          }
	          return _this.regexp(_this.rules[name].match).source;
	        }), _regexp.flags);
	      }
	      return this._regexp[_regexp];
	    }
	  }, {
	    key: "match",
	    value: function match() {
	      var data = this.data;
	      if (!data.after) {
	        return false;
	      }
	      if (data.matchResult == undefined) {} else if (!data.matchResult) {
	        return data.matchResult;
	      } else if (data.matchResult.matchIndex >= data.index) {
	        data.matchResult.index = data.matchResult.matchIndex - data.index;
	        return data.matchResult;
	      }
	
	      data.matchResult = false;
	      var match = data.match;
	      var exec = match.regexp.exec(data.after);
	      if (!exec) {
	        return false;
	      }
	      for (var key in match.rules) {
	        if (exec[key] != undefined) {
	          var rule = match.rules[key];
	          var matchIndex = data.index + exec.index + exec[1].length;
	          data.matchResult = { name: rule.name, rule: rule, matchIndex: matchIndex, index: matchIndex - data.index, match: [] };
	          do {
	            data.matchResult.match.push(exec[key]);
	            key++;
	          } while (!data.match.rules[key] && key < exec.length);
	          return data.matchResult;
	        }
	      }
	      return data.matchResult;
	    }
	  }, {
	    key: "push",
	    value: function push(node, pop) {
	      var option = node.nodeName.charAt(0) == '#' ? false : this.rules[node.nodeName];
	      if (node.nodeHtml && (!option || !option.html || option.black || this.parentNodeStack.length >= NESTING)) {
	        return false;
	      }
	
	      this.parentNode.children.push(node);
	
	      if (node.varName && node.varName.length) {
	        if (node.varName.length == 1) {
	          this.variables[node.varName[0]] = this.variables[node.varName[0]] || [];
	          this.variables[node.varName[0]].push(node);
	        } else {
	          this.variables[node.varName[0]] = this.variables[node.varName[0]] || {};
	          this.variables[node.varName[0]][node.varName[1]] = node;
	        }
	      }
	
	      if (option) {
	        if (node.attributes) {
	          var attributes = node.attributes;
	          node.attributes = {};
	          this.setAttributes(node, attributes);
	        } else {
	          node.attributes = {};
	        }
	
	        if (!option.single) {
	          var parentNode = this.parentNode;
	          // 父级
	          this.parentNodeStack.push(this.parentNode);
	          this.parentNode = node;
	
	          // 父级名称
	          this.parentNameStack.push(this.parentName);
	          this.parentName = node.nodeName;
	
	          // 块标签
	          this.blockStack.push(this.block);
	          if (this.block && (option.blackBlock || option.inline && !option.block)) {
	            this.block = false;
	          }
	
	          // 黑名单
	          this.blackListStack.push(this.blackList);
	          if (option.blackList) {
	            this.blackList = (0, _assign2.default)({}, this.blackList, option.blackList);
	          }
	
	          // 白名单
	          this.whiteListStack.push(this.whiteList);
	          if (option.whiteList) {
	            if (this.whiteList) {
	              var whiteList = this.whiteList;
	              this.whiteList = (0, _assign2.default)({}, option.whiteList);
	              for (var key in this.whiteList) {
	                if (!whiteList[key]) {
	                  delete this.whiteList[key];
	                }
	              }
	            } else {
	              this.whiteList = option.whiteList;
	            }
	          }
	
	          // 基础
	          if (!node.nodeHtml) {
	            // 父级
	            this.baseParentNodeStack.push(this.baseParentNode);
	            this.baseParentNode = node;
	
	            // 快标签
	            this.baseBlockStack.push(this.baseBlock);
	            this.baseBlock = this.block;
	
	            // 黑名单
	            this.baseBlackListStack.push(this.baseBlackList);
	            this.baseBlackList = this.blackList;
	          }
	
	          // 处理子数据
	          var children = node.children;
	          node.children = [];
	          if (children && children.length) {
	            if ((typeof children === "undefined" ? "undefined" : (0, _typeof3.default)(children)) == 'object' && (0, _typeof3.default)(children[0]) == 'object') {
	              for (var i = 0; i < children.length; i++) {
	                this.push(children[i], pop);
	              }
	            } else {
	              this.prepare(children, node.block);
	            }
	          }
	          if (pop && parentNode != this.parentNode) {
	            this.pop();
	          }
	        }
	      }
	
	      return node;
	    }
	  }, {
	    key: "pop",
	    value: function pop(nodeName) {
	      if (nodeName && (nodeName != this.parentName || this.parentNode == this.baseParentNode || this.parentNode == this.data.parentNode)) {
	        return false;
	      }
	
	      // 不能弹出 #document 文档   和 不能弹出当前解析的根目录
	      if (!this.parentName || this.data && this.parentNode == this.data.parentNode) {
	        return false;
	      }
	
	      //  弹出的节点
	      var parentNode = this.parentNode;
	
	      // 父级
	      this.parentNode = this.parentNodeStack.pop();
	
	      // 父级名
	      this.parentName = this.parentNameStack.pop();
	
	      // 快
	      this.block = this.blockStack.pop();
	
	      // 黑名单
	      this.blackList = this.blackListStack.pop();
	
	      // 白名单
	      this.whiteList = this.whiteListStack.pop();
	
	      // 基础
	      if (parentNode == this.baseParentNode) {
	        // 快标签
	        this.baseParentNode = this.baseParentNodeStack.pop();
	
	        // 快标签
	        this.baseBlock = this.baseBlockStack.pop();
	
	        // 黑名单
	        this.baseBlackList = this.baseBlackListStack.pop();
	      }
	      return parentNode;
	    }
	  }, {
	    key: "filter",
	    value: function filter(nodeName) {
	      if (nodeName.charAt(0) == '#') {
	        return true;
	      }
	      var option = this.rules[nodeName] || {};
	
	      // 基础 黑名单
	      if (this.baseBlackList[nodeName]) {
	        return false;
	      }
	
	      // 基础 块标签
	      if (!this.baseBlock && !option.inline) {
	        return false;
	      }
	
	      // 基础 连续嵌套
	      if (option.blackContinuity && nodeName == this.parentName) {
	        return false;
	      }
	
	      // inline 里面不能嵌套 block
	      while (!this.block && !option.inline && this.pop()) {}
	
	      // 不能连续嵌套的
	      if (option.blackContinuity && this.parentName == nodeName && this.pop()) {}
	
	      // 嵌套黑名单
	      while (this.blackList[nodeName] && this.pop()) {}
	      return true;
	    }
	  }, {
	    key: "setAttributes",
	    value: function setAttributes(node, attributes) {
	      var value;
	      for (var name in attributes) {
	        value = attributes[name];
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        if (this.constructor.attributes[name]) {
	          value = this.constructor.attributes[name].call(this, value, node, name);
	        } else if (node.nodeHtml) {
	          continue;
	        }
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        node.attributes[name] = value;
	      }
	    }
	  }, {
	    key: "toText",
	    value: function toText(node, separator) {
	      var text = [];
	      var child;
	      var result;
	      for (var i = 0; i < node.children.length; i++) {
	        child = node.children[i];
	        if (child.nodeName == '#text') {
	          text.push(child.nodeValue);
	        } else if (child.nodeName == '#document' || child.nodeName.charAt(0) != '#') {
	          result = this.toText(child, separator);
	          if (result) {
	            text.push(result);
	          }
	        }
	      }
	      return text.join(separator || '');
	    }
	  }, {
	    key: "toNode",
	    value: function toNode(node) {
	      var child;
	      var childNode;
	      var Node = node.constructor.createElement ? node.constructor : document;
	      var name;
	      var value;
	
	      // 解析已存在的 key
	      var diffKeys = {};
	      var nodeChildren = {};
	      var markdownx;
	      var attributes;
	      for (var i = 0; i < node.childNodes.length; i++) {
	        childNode = node.childNodes[i];
	        if (!diffKeys[childNode.nodeName]) {
	          diffKeys[childNode.nodeName] = 1;
	        } else {
	          diffKeys[childNode.nodeName]++;
	        }
	
	        if (!childNode._markdownx) {
	          if (childNode.attributes && typeof childNode.attributes.item == 'function') {
	            attributes = {};
	            for (var _i = 0; _i < childNode.attributes.length; _i++) {
	              attributes[childNode.attributes[_i].name] = childNode.attributes[_i].value;
	            }
	          } else {
	            attributes = childNode.attributes;
	          }
	          childNode._markdownx = {
	            nodeName: childNode.nodeName.toLowerCase(),
	            nodeValue: childNode.nodeValue,
	            attributes: attributes
	          };
	        }
	        nodeChildren[childNode._markdownx.nodeName + ',' + diffKeys[childNode.nodeName]] = childNode;
	      }
	
	      //  diff 算法
	      var diffKeys = {};
	      var diffKey;
	      var nodeValue;
	      for (var i = 0; i < this.parentNode.children.length; i++) {
	        child = this.parentNode.children[i];
	        if (!diffKeys[child.nodeName]) {
	          diffKeys[child.nodeName] = 1;
	        } else {
	          diffKeys[child.nodeName]++;
	        }
	        diffKey = child.nodeName + ',' + diffKeys[child.nodeName];
	
	        if (!nodeChildren[diffKey]) {
	          // 创建
	          if (child.nodeName == '#text') {
	            childNode = Node.createTextNode(this.unescapeHtml(child.nodeValue));
	          } else if (child.nodeName == '#comment') {
	            childNode = Node.createComment(child.nodeValue);
	          } else {
	            childNode = Node.createElement(child.nodeName);
	            for (name in child.attributes) {
	              childNode.setAttribute(name, child.attributes[name]);
	            }
	          }
	        } else {
	          childNode = nodeChildren[diffKey];
	
	          // 已处理的数据要删除
	          delete nodeChildren[diffKey];
	
	          // diff 算法
	          if (childNode.nodeName == '#text') {
	            nodeValue = this.unescapeHtml(child.nodeValue);
	            if (nodeValue != childNode.nodeValue) {
	              childNode.nodeValue = nodeValue;
	            }
	          } else if (childNode.nodeName == '#comment') {
	            if (child.nodeValue != childNode.nodeValue) {
	              childNode.nodeValue = nodeValue;
	            }
	          } else {
	            // 删除
	            for (name in childNode._markdownx.attributes) {
	              if (child.attributes[name] == undefined) {
	                childNode.removeAttribute(name);
	              }
	            }
	            // 修改 或者添加
	            for (name in child.attributes) {
	              // 添加
	              value = child.attributes[name];
	              if (value === true) {
	                value = '';
	              }
	              if (childNode._markdownx.attributes[name] != value) {
	                childNode.setAttribute(name, value);
	              }
	            }
	          }
	        }
	
	        // 不相同
	        if (childNode != node.childNodes[i]) {
	          if (node.childNodes[i]) {
	            node.insertBefore(childNode, node.childNodes[i]);
	          } else {
	            node.appendChild(childNode);
	          }
	        }
	
	        // 解析子数据
	        if (child.children && child.children.length && child.nodeName.charAt(0) != '#') {
	          this.parentNodeStack.push(this.parentNode);
	          this.parentNode = child;
	          this.toNode(childNode);
	          this.parentNode = this.parentNodeStack.pop();
	        }
	
	        // 设置 _markdownx
	        childNode._markdownx = child;
	      }
	
	      // 删除未使用的节点
	      for (var key in nodeChildren) {
	        node.removeChild(nodeChildren[key]);
	      }
	
	      return node;
	    }
	  }, {
	    key: "pushData",
	    value: function pushData(after, block) {
	      var lines;
	      if ((typeof after === "undefined" ? "undefined" : (0, _typeof3.default)(after)) == 'object') {
	        lines = after;
	        after = after.join(NEWLINE);
	      } else {
	        lines = after.split(NEWLINE);
	      }
	      var linesLength = [];
	      for (var i = 0; i < lines.length; i++) {
	        linesLength[i] = lines[i].length;
	      }
	
	      var match;
	      if (block) {
	        match = this.blockMatch;
	      } else if (block != undefined) {
	        match = this.inlineMatch;
	      } else if (this.parentName) {
	        var option = this.rules[this.parentName];
	        if (option && !option.blackBlock && !option.inline) {
	          match = this.blockMatch;
	          block = true;
	        } else {
	          block = false;
	          match = this.inlineMatch;
	        }
	      } else {
	        block = true;
	        match = this.documentMatch;
	      }
	
	      var data = {
	        before: '',
	        skip: '',
	        after: after,
	        lines: lines,
	        linesLength: linesLength,
	        index: 0,
	        ch: 0,
	        line: 0,
	        parentNode: this.parentNode,
	        block: block,
	        match: match,
	        htmlText: ''
	      };
	
	      this.dataStack.push(this.data);
	      this.data = data;
	      return data;
	    }
	  }, {
	    key: "popData",
	    value: function popData() {
	      var data = this.data;
	      this.data = this.dataStack.pop();
	      while (this.parentNode != data.parentNode && this.pop()) {}
	      return data;
	    }
	  }, {
	    key: "prepare",
	    value: function prepare(after, block) {
	      if (this.dataStack.length >= NESTING) {
	        return false;
	      }
	      var data = this.pushData(after, block);
	      var match;
	      var value;
	      while (match = this.match()) {
	        data._index = data.index;
	        if (match.index) {
	          this.pushText(data.after.substr(0, match.index), data.block);
	          this.skip(match.index);
	          data._index = data.index;
	        }
	
	        value = match.rule.prepare.call(this, match.match);
	        if (data.index == data._index) {
	          this.skip(match.match[0].length);
	          if (data.block) {
	            this.nextLine();
	          }
	        }
	        if (!value) {} else if (this.filter(value.nodeName)) {
	          this.push(value, true);
	        } else {
	          this.push({ nodeName: '#text', nodeValue: data.before.substr(data._index) });
	        }
	      }
	
	      if (data.after) {
	        this.pushText(data.after, data.block);
	      }
	      this.popData();
	      return this.parentNode;
	    }
	  }, {
	    key: "parser",
	    value: function parser() {
	      var option;
	      var varName;
	      var variables;
	      for (var name in this.variables) {
	        if (!(option = this.constructor.variables[name])) {
	          continue;
	        }
	        variables = this.variables[name];
	        for (varName in variables) {
	          option.call(this, varName, variables[varName]);
	        }
	      }
	    }
	  }, {
	    key: "nextLine",
	    value: function nextLine() {
	      var data = this.data;
	      if (typeof data.linesLength[data.line + 1] != 'number') {
	        if (data.after) {
	          this.skip(data.after.length);
	        }
	        return false;
	      }
	      this.skip(data.linesLength[data.line] + NEWLINE.length - data.ch);
	      return data.line;
	    }
	  }, {
	    key: "getLine",
	    value: function getLine(line) {
	      if (typeof this.data.lines[line] == 'string') {
	        var value = this.data.lines[line];
	        var trim = value.match(this.rules.$trim.match);
	        this.data.lines[line] = {
	          value: value,
	          trimValue: trim[2],
	          ltrimLength: trim[1].length,
	          rtrimLength: trim[3].length,
	          spacelength: trim[1].replace(/\t/g, '    ').length
	        };
	      }
	      return this.data.lines[line];
	    }
	  }, {
	    key: "currentLine",
	    value: function currentLine() {
	      return this.getLine(this.data.line);
	    }
	  }, {
	    key: "skip",
	    value: function skip(index) {
	      var data = this.data;
	      if (index < 0 || data.after.length < index) {
	        return false;
	      }
	
	      if (!index) {
	        return true;
	      }
	      // 索引偏移
	      data.index += index;
	
	      // 跳过的数据
	      data.skip = data.after.substr(0, index);
	
	      // 之前已处理的
	      data.before += data.skip;
	
	      // 之后需要处理的
	      data.after = data.after.substr(index);
	
	      // ch 偏移
	      data.ch += index;
	
	      // 跳过的行数等
	      while (data.ch >= data.linesLength[data.line] + NEWLINE.length) {
	        data.ch -= data.linesLength[data.line] + NEWLINE.length;
	        data.line++;
	      }
	      return true;
	    }
	  }, {
	    key: "pushText",
	    value: function pushText(text, block) {
	      if (block) {
	        text = text.trim();
	        if (!text) {
	          return false;
	        }
	        text = text.split(this.rules.$blocktext.match);
	        for (var i = 0; i < text.length; i++) {
	          this.push({ nodeName: 'p', children: text[i] }, true);
	        }
	        return true;
	      }
	      if (!text || !(text = text.replace(this.rules.$escape_replace.match, '$1'))) {
	        return false;
	      }
	      this.push({ nodeName: '#text', nodeValue: text });
	      return true;
	    }
	  }, {
	    key: "prepareHtmlAttributes",
	    value: function prepareHtmlAttributes() {
	      var data = this.data;
	      var attributes = {};
	      var attributeName;
	      var attributeValue;
	
	      var char;
	      var index;
	      while (char != '>' && (index = data.after.search(/[=>]/)) != -1) {
	        attributeName = data.after.substr(0, index);
	        char = data.after.charAt(index);
	        this.skip(index + 1);
	        if (char == '>') {
	          // 只有参数没有值的
	          index = attributeName.indexOf('/');
	          if (index != -1) {
	            attributeName = attributeName.substr(0, index);
	          }
	          attributeValue = true;
	        } else {
	          attributeValue = '';
	          index = 0;
	          char = '';
	          while (char = data.after.charAt(index)) {
	            ++index;
	            if (char == '>') {
	              break;
	            } else if (char == '"' || char == "'") {
	              this.skip(index);
	              index = data.after.indexOf(char);
	              attributeValue = index == -1 ? data.after : data.after.substr(0, index);
	              this.skip(index == -1 ? data.after.length : index + 1);
	              break;
	            } else if (char = char.trim()) {
	              this.skip(index);
	              index = data.after.search(TAG_END);
	              attributeValue = index == -1 ? data.after : data.after.substr(0, index);
	              this.skip(index == -1 ? data.after.length : index + 1);
	              break;
	            }
	          }
	        }
	        attributeName = attributeName.trim().toLowerCase();
	        if (attributeName) {
	          attributes[attributeName] = attributeValue;
	        }
	      }
	      return attributes;
	    }
	  }, {
	    key: "pushHtmlText",
	    value: function pushHtmlText(text) {
	      this.data.htmlText += text;
	      return true;
	    }
	  }, {
	    key: "saveHtmlText",
	    value: function saveHtmlText() {
	      if (this.data.htmlText) {
	        if (this.data.htmlText.trim()) {
	          this.push({ nodeName: '#text', nodeValue: this.data.htmlText });
	        }
	        this.data.htmlText = '';
	      }
	      return true;
	    }
	  }]);
	  return Token;
	}();
	
	Token.rules = (_Token$rules = {
	  a: { inline: true, blackList: { a: true, button: true, input: true, form: true, textarea: true } },
	  abbr: { inline: true },
	  acronym: { inline: true },
	  address: {},
	  applet: { inline: true, block: true },
	  area: {},
	  article: {},
	  aside: {},
	  audio: { inline: true },
	
	  b: { inline: true },
	  base: { single: true },
	  basefont: { single: true },
	  bdi: { inline: true },
	  bdo: { inline: true },
	  big: { inline: true },
	  blockquote: {},
	  body: {},
	  br: { inline: true, single: true },
	  button: { inline: true, block: true, blackList: { textarea: true, input: true, button: true, select: true, label: true, form: true, fieldset: true, iframe: true } },
	
	  canvas: {},
	  caption: {},
	  center: {},
	  cite: { inline: true },
	  code: { inline: true },
	  col: { single: true },
	  colgroup: {},
	  command: {},
	
	  datalist: {},
	  dd: { blackBlock: true, blackList: { dd: true } },
	  del: { inline: true },
	  details: {},
	  dfn: { inline: true },
	  dir: {},
	  div: {},
	  dl: {},
	  dt: { blackBlock: true, blackList: { dt: true } },
	  dialog: {},
	
	  em: { inline: true },
	  embed: { single: true, blackList: { embed: true } },
	
	  fieldset: {},
	  figcaption: {},
	  figure: {},
	  font: { inline: true },
	  footer: {},
	  form: { blackList: { form: true } },
	  frame: { inline: true, block: true, single: true },
	  frameset: {},
	
	  h1: { blackBlock: true },
	  h2: { blackBlock: true },
	  h3: { blackBlock: true },
	  h4: { blackBlock: true },
	  h5: { blackBlock: true },
	  h6: { blackBlock: true },
	  head: {},
	  header: {},
	  hgroup: {},
	  hr: { single: true },
	  html: {},
	
	  i: { inline: true },
	  iframe: { inline: true, block: true, blackList: { iframe: true } },
	  img: { inline: true, single: true },
	  input: { inline: true, single: true },
	  ins: { inline: true, block: true },
	
	  keygen: { single: true },
	  kbd: { inline: true },
	
	  label: { inline: true, blackList: { label: true } },
	  legend: {},
	  li: { blackContinuity: true },
	  link: { single: true },
	
	  map: { inline: true, block: true },
	  mark: { inline: true },
	  menu: {},
	  menuitem: {},
	  meta: { single: true },
	  meter: { inline: true },
	
	  nav: {},
	  noframes: {},
	  noscript: {},
	
	  object: { inline: true, block: true, blackList: { object: true } },
	  ol: {},
	  optgroup: { inline: true, whiteList: { option: true } },
	  option: { inline: true, whiteList: {} },
	  output: {},
	
	  p: { blackBlock: true },
	  param: { inline: true, block: true, single: true },
	  pre: { blackList: { img: true, object: true, embed: true, big: true, samll: true, sub: true, sup: true, pre: true } },
	  progress: {},
	  polygon: {},
	
	  q: { inline: true },
	
	  rp: { inline: true },
	  rt: { inline: true },
	  ruby: { inline: true },
	
	  s: { inline: true },
	  samp: { inline: true },
	  script: { inline: true, block: true, text: true },
	  select: { inline: true },
	  small: { inline: true },
	  source: { single: true },
	  span: { inline: true },
	  strike: { inline: true },
	  strong: { inline: true },
	  style: { inline: true, block: true, text: true },
	  sub: { inline: true },
	  summary: {},
	  sup: { inline: true },
	  svg: { inline: true },
	
	  table: { blackContinuity: true, inline: true, block: true },
	  tbody: { blackContinuity: true, inline: true, block: true },
	  td: { blackContinuity: true, inline: true, block: true },
	  textarea: { inline: true, block: true, text: true },
	  tfoot: {},
	  th: { blackContinuity: true, inline: true, block: true },
	  thead: { blackContinuity: true, inline: true, block: true },
	  time: { inline: true },
	  title: {},
	  tr: { blackContinuity: true, inline: true, block: true },
	  track: { single: true },
	  tt: { inline: true },
	
	  u: { inline: true },
	  ul: { blackContinuity: true },
	
	  var: { inline: true },
	  video: { inline: true },
	
	  wbr: { inline: true },
	
	  xmp: {}
	
	}, (0, _defineProperty3.default)(_Token$rules, "base", null), (0, _defineProperty3.default)(_Token$rules, "html", null), (0, _defineProperty3.default)(_Token$rules, "meta", null), (0, _defineProperty3.default)(_Token$rules, "link", null), (0, _defineProperty3.default)(_Token$rules, "style", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Token$rules, "script", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Token$rules, "head", null), (0, _defineProperty3.default)(_Token$rules, "body", null), (0, _defineProperty3.default)(_Token$rules, "title", null), (0, _defineProperty3.default)(_Token$rules, "noframes", null), (0, _defineProperty3.default)(_Token$rules, "noscript", null), (0, _defineProperty3.default)(_Token$rules, "frameset", null), (0, _defineProperty3.default)(_Token$rules, "frame", null), (0, _defineProperty3.default)(_Token$rules, "iframe", null), (0, _defineProperty3.default)(_Token$rules, "applet", null), (0, _defineProperty3.default)(_Token$rules, "polygon", null), (0, _defineProperty3.default)(_Token$rules, "svg", null), (0, _defineProperty3.default)(_Token$rules, "dialog", null), (0, _defineProperty3.default)(_Token$rules, "command", null), _Token$rules);
	Token.attributes = {};
	Token.variables = {};
	Token.htmlEscapes = {
	  quot: 34,
	  apos: 39,
	  amp: 38,
	  colon: 58,
	  lt: 60,
	  gt: 62,
	  nbsp: 160,
	  iexcl: 161,
	  cent: 162,
	  pound: 163,
	  curren: 164,
	  yen: 165,
	  brvbar: 166,
	  sect: 167,
	  uml: 168,
	  copy: 169,
	  ordf: 170,
	  laquo: 171,
	  not: 172,
	  shy: 173,
	  reg: 174,
	  macr: 175,
	  deg: 176,
	  plusmn: 177,
	  sup2: 178,
	  sup3: 179,
	  acute: 180,
	  micro: 181,
	  para: 182,
	  middot: 183,
	  cedil: 184,
	  sup1: 185,
	  ordm: 186,
	  raquo: 187,
	  frac14: 188,
	  frac12: 189,
	  frac34: 190,
	  iquest: 191,
	  times: 215,
	  divide: 247
	};
	Token.options = {
	  prefix: '',
	  protocols: ['http', 'https', 'tel', 'mailto'],
	  styles: { 'text-align': true }
	};
	
	
	Token.addRule('$newline', { match: /\n/ });
	Token.addRule('$space', { match: /[ \u00a0]/ });
	Token.addRule('$tab', { match: /(?:    |\t)/ });
	Token.addRule('$blank', { match: /(?:{{$space}}|\t)/ });
	Token.addRule('$trim', { match: /^((?:{{$blank}}|{{$newline}})*)([\s\S]*?)((?:{{$blank}}|{{$newline}})*)$/ });
	Token.addRule('$escape', { match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.]/ });
	Token.addRule('$escape_replace', { match: /{{$backslash}}({{$escape}}|{{$newline}}|$)/g });
	
	Token.addRule('$grave', { match: /`/ });
	Token.addRule('$tilde', { match: /~/ });
	Token.addRule('$gt', { match: />/ });
	Token.addRule('$lt', { match: /</ });
	Token.addRule('$number', { match: /\#/ });
	Token.addRule('$asterisk', { match: /\*/ });
	Token.addRule('$minus', { match: /\-/ });
	Token.addRule('$plus', { match: /\+/ });
	Token.addRule('$equals', { match: /\=/ });
	Token.addRule('$colon', { match: /\:/ });
	Token.addRule('$lowbar', { match: /_/ });
	Token.addRule('$verbar', { match: /\|/ });
	Token.addRule('$doc', { match: /\./ });
	Token.addRule('$backslash', { match: /\\/ });
	Token.addRule('$commat', { match: /\@/ });
	Token.addRule('$dollar', { match: /\$/ });
	Token.addRule('$apos', { match: /'/ });
	Token.addRule('$quot', { match: /"/ });
	Token.addRule('$quote', { match: /(?:{{$quot}}|{{$apos}})/ });
	Token.addRule('$blocktext', { match: /(?:{{$blank}}*?{{$newline}}){2,}/ });
	
	Token.addRule('$escape_backslash', { match: /[\s\S]*?(?!{{$backslash}}).(?:{{$backslash}}{2})*/ });
	
	Token.addRule('$header_id_replace', { match: /<.+?>|{{$escape}}/g });
	Token.addRule('$link_image', { match: /\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\](?:{{$blank}}|{{$newline}})?(?:\({{$blank}}*{{$lt}}?(.*?){{$gt}}?(?:{{$blank}}+{{$quote}}(.*?){{$quote}})?{{$blank}}*\)|\[([^\^\[\]]*)\])/ });
	
	Token.addRule('md_blockcode', {
	  match: /{{$tab}}{{$blank}}*(?!{{$blank}}.).*|({{$grave}}{3,}|{{$tilde}}{3,}){{$blank}}*(.*)/,
	  block: true,
	  priority: 10,
	  prepare: function prepare(match) {
	    var nodeValue = [];
	    var current;
	    if (match[1]) {
	      while (this.nextLine()) {
	        current = this.currentLine();
	        if (current.trimValue == match[1] && current.spacelength < 4) {
	          this.nextLine();
	          break;
	        }
	        nodeValue.push(current.trimValue ? current.value : '');
	      }
	    } else {
	      do {
	        current = this.currentLine();
	        if (current.trimValue && current.spacelength < 4) {
	          break;
	        }
	        nodeValue.push(current.trimValue ? current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.ltrimLength > 4 ? 4 : current.ltrimLength) : '');
	      } while (this.nextLine());
	      if (nodeValue.length > 1 && !nodeValue[nodeValue.length - 1]) {
	        nodeValue.pop();
	      }
	    }
	    return {
	      nodeName: 'pre',
	      attributes: {
	        class: 'highlight highlight-source-' + (match[2] ? match[2].toLowerCase().replace(/[^0-9a-z_-]/g, '') : '')
	      },
	      children: [{
	        nodeName: 'code',
	        children: [{
	          nodeName: '#text',
	          nodeValue: nodeValue.join(NEWLINE)
	        }]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_blocktag', {
	  match: function match(data) {
	    var option;
	    var names = [];
	    for (var name in this.rules) {
	      option = this.rules[name];
	      if (!option || !option.html || option.inline && !option.block) {
	        continue;
	      }
	      names.push(name);
	    }
	    return new RegExp('<(' + names.join('|') + ')(?:|\\s[\\s\\S]*?)\\/?\s*>.*');
	  },
	
	  block: true,
	  priority: 15,
	  prepare: function prepare() {
	    var data = this.data;
	    var parentNode = this.parentNode;
	    var char;
	    var index;
	    var text;
	    var nodeName;
	    var nodeValue;
	
	    var attributes;
	
	    while ((index = data.after.indexOf('<')) != -1 && (!nodeName || parentNode != this.parentNode || data.after.search(/^.*(<\!--|<\/?[a-zA-Z].*>)/) != -1)) {
	      if (index) {
	        this.pushHtmlText(data.after.substr(0, index));
	      }
	
	      this.skip(index + 1);
	      char = data.after.charAt(0);
	
	      // 最后了
	      if (!char) {
	        this.pushHtmlText('<');
	        continue;
	      }
	
	      // 注释
	      if (char == '!') {
	        if (data.after.substr(0, 3) == '!--') {
	          this.skip(3);
	          index = data.after.indexOf('-->');
	          nodeValue = index == -1 ? data.after : data.after.substr(0, index);
	          this.skip(index == -1 ? data.after.length : index + 3);
	          this.saveHtmlText();
	          this.push({ nodeName: '#comment', nodeValue: nodeValue });
	        } else {
	          this.pushHtmlText('<');
	        }
	        continue;
	      }
	
	      // 结束标签
	      if (char == '/') {
	        index = data.after.indexOf('>');
	        nodeName = index == -1 ? data.after.substr(1) : data.after.substr(1, index - 1);
	        nodeName = nodeName.trim().toLowerCase();
	        if (nodeName) {
	          this.skip(index == -1 ? data.after.length : index + 1);
	
	          this.saveHtmlText();
	          this.pop(nodeName);
	        } else {
	          this.pushHtmlText('<');
	        }
	        continue;
	      }
	
	      // 不是标签
	      if (char < 'a' && char > 'z' && char < 'A' && char > 'Z') {
	        continue;
	      }
	
	      // 没结束
	      index = data.after.search(TAG_NAME);
	      if (index == -1) {
	        break;
	      }
	
	      nodeName = data.after.substr(0, index);
	
	      this.skip(index);
	
	      attributes = this.prepareHtmlAttributes();
	      nodeName = nodeName.trim().toLowerCase();
	
	      this.saveHtmlText();
	      this.push({ nodeName: nodeName, attributes: attributes, nodeHtml: true });
	    }
	
	    var value = this.currentLine().value;
	    if (value.length > data.ch) {
	      this.pushHtmlText(value.substr(data.ch));
	    }
	    this.saveHtmlText();
	    this.nextLine();
	    while (parentNode != this.parentNode) {
	      this.pop();
	    }
	  }
	});
	
	Token.addRule('md_blockquote', {
	  match: /({{$gt}}).*/,
	  block: true,
	  priority: 20,
	  prepare: function prepare(match) {
	    var children = [];
	    var current;
	    var empty;
	    do {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        if (empty) {
	          break;
	        }
	        empty = true;
	        children.push(current.trimValue);
	      } else {
	        if (empty && (current.spacelength >= 4 || current.trimValue.charAt(0) != match[1])) {
	          break;
	        }
	        if (current.spacelength < 4) {
	          children.push(this.rules.$gt.match.test(current.trimValue[0]) ? current.trimValue.substr(1) : current.trimValue);
	        } else {
	          children.push(current.value);
	        }
	      }
	    } while (this.nextLine());
	    return {
	      nodeName: 'blockquote',
	      children: children
	    };
	  }
	});
	
	Token.addRule('md_header', {
	  match: /({{$number}}{1,6}){{$blank}}*(.*?)\#*|((?!{{$blank}})..*){{$newline}}{{$blank}}*({{$equals}}|{{$minus}}){{$blank}}?(?:\4{{$blank}}?)*/,
	  block: true,
	  priority: 25,
	  prepare: function prepare(match) {
	    if (match[1]) {
	      this.nextLine();
	      return {
	        nodeName: 'h' + match[1].length,
	        attributes: { id: this.escapeId(this.options.prefix + 'header-' + match[2].replace(this.rules.$header_id_replace.match, '')) },
	        children: match[2]
	      };
	    } else {
	      this.nextLine();
	      this.nextLine();
	      return {
	        nodeName: this.rules.$equals.match.test(match[4]) ? 'h1' : 'h2',
	        attributes: { id: this.options.prefix + 'header-' + this.escapeId(match[3].replace(this.rules.$header_id_replace.match, '')) },
	        children: match[3]
	      };
	    }
	  }
	});
	
	Token.addRule('md_list', {
	  match: /(?:({{$asterisk}}|{{$plus}}|{{$minus}})|(\d+{{$doc}})){{$blank}}(?:{{$blank}}?\[({{$space}}|x)\])?(.*)/,
	  block: true,
	  priority: 30,
	  prepare: function prepare(match) {
	    var list = [];
	    var li = [match[4]];
	    var checkboxs = [match[3]];
	
	    var current;
	    var empty;
	    var match2;
	    var tab = true;
	    var blocktexts = [];
	
	    while (this.nextLine()) {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        if (empty && !tab) {
	          break;
	        }
	        // 空行
	        li.push('');
	      } else if (li.length && current.spacelength > 1) {
	        // 行跳格大于 1
	        li.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.value.charAt(1) == '\t' ? 2 : current.ltrimLength > 4 ? 4 : current.ltrimLength));
	      } else {
	        match2 = this.match();
	        if (!match2 || match2.index > current.value.length) {
	          if (empty && !tab) {
	            break;
	          }
	          li.push(current.value);
	        } else if (match2.name == 'md_list' && match2.match[1] == match[1] && Boolean(match2.match[2]) == Boolean(match[2])) {
	          if (li.length > 1 && li.indexOf('') != -1) {
	            blocktexts.push(true);
	          } else {
	            blocktexts.push(false);
	          }
	          if (li.length > 1 && !li[li.length - 1]) {
	            li.pop();
	          }
	          list.push(li);
	          li = [match2.match[4]];
	          checkboxs.push(match2.match[3]);
	        } else {
	          break;
	        }
	      }
	
	      empty = !current.trimValue;
	      tab = li.length != 1 && (current.spacelength > 1 || !current.trimValue && tab);
	    }
	
	    if (li.length > 1 && !li[li.length - 1]) {
	      li.pop();
	    }
	
	    list.push(li);
	    blocktexts.push(blocktexts.length ? blocktexts[blocktexts.length - 1] : false);
	
	    var children = [];
	    for (var i = 0; i < list.length; i++) {
	      children.push({
	        nodeName: 'li',
	        children: list[i]
	      });
	    }
	
	    var node = {
	      nodeName: match[2] ? 'ol' : 'ul',
	      children: children
	    };
	    this.push(node, true);
	
	    var liNode;
	    var pNode;
	    var checkbox;
	    var checkboxNode;
	    for (var i = 0; i < node.children.length; i++) {
	      liNode = node.children[i];
	      if (!blocktexts[i] && (pNode = liNode.children[0]) && pNode.nodeName == 'p') {
	        // 删除第一个
	        liNode.children.splice(0, 1);
	
	        // 合并
	        liNode.children = pNode.children.concat(liNode.children);
	      }
	
	      checkbox = checkboxs[i];
	      if (checkbox) {
	        this.setAttributes(liNode, { class: 'task-list-item' });
	        if (!node.attributes.class) {
	          this.setAttributes(node, { class: 'task-list' });
	        }
	
	        checkboxNode = {
	          nodeName: 'input',
	          attributes: {},
	          children: []
	        };
	        this.setAttributes(checkboxNode, {
	          type: 'checkbox',
	          class: 'task-list-item-checkbox',
	          disabled: true,
	          checked: checkbox.toLowerCase() == 'x'
	        });
	        if (!liNode.children.length || liNode.children[0].nodeName != 'p') {
	          liNode.children.splice(0, 0, checkboxNode);
	        } else {
	          liNode.children[0].children.splice(0, 0, checkboxNode);
	        }
	      }
	    }
	  }
	});
	
	Token.addRule('md_table', {
	  match: /((?:.*?({{$verbar}}))+.*?){{$newline}}({{$blank}}*\2?(?:(?:{{$blank}}*(?:{{$colon}}|{{$minus}}){{$blank}}*)+\2)+(?:{{$blank}}*(?:{{$colon}}|{{$minus}}))+{{$blank}}*\2?){{$blank}}*((?:{{$newline}}(?:.*\2)+.*)+)/,
	  block: true,
	  priority: 35,
	  prepare: function prepare(match) {
	    var _this2 = this;
	
	    var data;
	    var index;
	    var char;
	    var text = '';
	    var regexp = this.regexp(/({{$backslash}}|{{$verbar}})/);
	
	    // 表头
	    var thead = [];
	    data = match[1];
	    while ((index = data.search(regexp)) != -1) {
	      char = data.charAt(index);
	      if (char == '\\') {
	        text += data.substr(0, index + 2);
	        data = data.substr(index + 2);
	        continue;
	      }
	      text += data.substr(0, index);
	      data = data.substr(index + 1);
	      thead.push(text ? text.match(this.rules.$trim.match)[2] : text);
	      text = '';
	    }
	    text += data;
	    thead.push(text ? text.match(this.rules.$trim.match)[2] : text);
	    if (thead.length > 1 && !thead[0]) {
	      thead.shift();
	    }
	    if (thead.length > 1 && !thead[thead.length - 1]) {
	      thead.pop();
	    }
	
	    // 位置
	    var align = match[3].split(match[2]).map(function (value) {
	      return value.match(_this2.rules.$trim.match)[2];
	    });
	    if (align.length > 1 && !align[0]) {
	      align.shift();
	    }
	    if (align.length > 1 && !align[align.length - 1]) {
	      align.pop();
	    }
	    align = align.map(function (value) {
	      if (!value) {
	        return '';
	      }
	      var left = value.charAt(0) == ':';
	      var right = value.charAt(value.length - 1) == ':';
	      if (right && left) {
	        return 'center';
	      }
	      if (left) {
	        return 'left';
	      }
	      if (right) {
	        return 'right';
	      }
	      return '';
	    });
	
	    // 表内容
	    // 表内容
	    var tbody = [];
	    var tr = [];
	    var datas = match[4].split(NEWLINE);
	    for (var i = 0; i < datas.length; i++) {
	      data = datas[i];
	      tr = [];
	      text = '';
	      while ((index = data.search(regexp)) != -1) {
	        char = data.charAt(index);
	        if (char == '\\') {
	          text += data.substr(0, index + 2);
	          data = data.substr(index + 2);
	          continue;
	        }
	        text += data.substr(0, index);
	        data = data.substr(index + 1);
	        tr.push(text ? text.match(this.rules.$trim.match)[2] : text);
	        text = '';
	      }
	      text += data;
	      if (text) {
	        text = text.match(this.rules.$trim.match)[2];
	      }
	      if (!text && !tr.length) {
	        continue;
	      }
	      tr.push(text ? text.match(this.rules.$trim.match)[2] : text);
	      if (tr.length > thead.length && !tr[0]) {
	        tr.shift();
	      }
	      if (tr.length > thead.length && !tr[tr.length - 1]) {
	        tr.pop();
	      }
	      tbody.push(tr);
	    }
	
	    for (var i = 0; i < thead.length; i++) {
	      thead[i] = {
	        nodeName: 'th',
	        block: false,
	        attributes: align[i] ? { style: 'text-align:' + align[i] } : null,
	        children: thead[i]
	      };
	    }
	
	    var tr;
	    var col;
	    for (var row = 0; row < tbody.length; row++) {
	      tr = [];
	      for (col = 0; col < thead.length; col++) {
	        tr[col] = {
	          nodeName: 'td',
	          block: false,
	          attributes: align[col] ? { style: 'text-align:' + align[col] } : null,
	          children: tbody[row][col]
	        };
	      }
	      tbody[row] = { nodeName: 'tr', children: tr };
	    }
	
	    return {
	      nodeName: 'table',
	      children: [{
	        nodeName: 'thead',
	        children: [{
	          nodeName: 'tr',
	          children: thead
	        }]
	      }, {
	        nodeName: 'tbody',
	        children: tbody
	      }]
	    };
	  }
	});
	
	Token.addRule('md_hr', {
	  match: /({{$asterisk}}|{{$minus}}|{{$lowbar}}){{$blank}}?(?:\1{{$blank}}?){2,}/,
	  block: true,
	  priority: 40,
	  prepare: function prepare() {
	    return { nodeName: 'hr' };
	  }
	});
	
	Token.addRule('md_toc', {
	  match: /\[TOC\]/,
	  document: true,
	  priority: 17,
	  prepare: function prepare() {
	    return {
	      nodeName: 'ul',
	      varName: ['toc'],
	      attributes: { class: 'toc' }
	    };
	  }
	});
	
	Token.addRule('md_footnote', {
	  match: /\[\^([^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*(.*)/,
	  document: true,
	  priority: 22,
	  prepare: function prepare(match) {
	    var children = [match[2]];
	    var current;
	    var match2;
	
	    while (this.nextLine()) {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        this.nextLine();
	        break;
	      } else if (current.spacelength > 1) {
	        children.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.value.charAt(1) == '\t' ? 2 : current.ltrimLength > 4 ? 4 : current.ltrimLength));
	      } else if (!(match2 = this.match()) || match2.index > current.value.length) {
	        children.push(current.value);
	      } else {
	        break;
	      }
	    }
	    var id = this.escapeId(match[1]);
	
	    this.refnoteId = this.refnoteId || 0;
	    this.refnoteId++;
	
	    var node = {
	      nodeName: 'li',
	      block: false,
	      refnoteId: this.refnoteId,
	      varName: ['footnote', match[1].toLowerCase()],
	      attributes: {
	        class: 'footnote',
	        id: this.options.prefix + 'footnote-' + id,
	        style: 'display:none'
	      },
	      children: children
	    };
	    this.push(node, true);
	    node.children.push({
	      nodeName: 'a',
	      attributes: {
	        href: '#' + this.options.prefix + 'refnote-' + id,
	        title: this.options.toRefnote || 'Return to article'
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: '↩'
	      }]
	    });
	  }
	});
	
	Token.addRule('md_reflink', {
	  match: /\[([^\^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*{{$lt}}?((?!{{$blank}})..*?){{$gt}}?(?:{{$newline}}?{{$blank}}*(?:{{$lt}}|{{$quote}})(.*)(?:{{$gt}}|{{$quote}}))?/,
	  document: true,
	  priority: 27,
	  prepare: function prepare(match) {
	    if (!this.variables.reflink) {
	      this.variables.reflink = {};
	    }
	    this.variables.reflink[match[1].toLowerCase()] = { uri: match[2], title: match[3] };
	  }
	});
	
	Token.addRule('md_tag', {
	  match: function match(data) {
	    var option;
	    var names = [];
	    for (var name in this.rules) {
	      option = this.rules[name];
	      if (!option || !option.html || !option.inline || option.block) {
	        continue;
	      }
	      names.push(name);
	    }
	    return new RegExp('<(\\/?)(' + names.join('|') + ')(?:|\\s[\\s\\S]*?)\\/?\s*>');
	  },
	
	  inline: true,
	  priority: 7,
	  prepare: function prepare(match) {
	    var nodeName = match[2].toLowerCase();
	    if (match[1]) {
	      this.pop(nodeName);
	      this.skip(match[0].length);
	      return;
	    }
	    this.skip(nodeName.length + 1);
	    var attributes = this.prepareHtmlAttributes();
	    this.push({ nodeName: nodeName, attributes: attributes, nodeHtml: true });
	  }
	});
	
	Token.addRule('md_comment', {
	  match: /<\!--([\s\S]*?)-->/,
	  block: true,
	  inline: true,
	  priority: 15,
	  prepare: function prepare(match) {
	    return { nodeName: '#comment', nodeValue: match[1] };
	  }
	});
	
	Token.addRule('md_code', {
	  match: /(({{$grave}})+)([\s\S]*?(?!\2)[\s\S])\1(?!\2)/,
	  inline: true,
	  priority: 20,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'code',
	      children: [{
	        nodeName: '#text',
	        nodeValue: this.escapeHtml(match[3], true)
	      }]
	    };
	  }
	});
	
	Token.addRule('md_strong', {
	  match: /(({{$lowbar}}|{{$asterisk}}){2})({{$escape_backslash}})\1(?!\2)/,
	  inline: true,
	  priority: 25,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'strong',
	      children: match[3]
	    };
	  }
	});
	
	Token.addRule('md_em', {
	  match: /({{$lowbar}}|{{$asterisk}})({{$escape_backslash}})\1(?!\1)/,
	  inline: true,
	  priority: 30,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'em',
	      children: match[2]
	    };
	  }
	});
	
	Token.addRule('md_del', {
	  match: /(({{$tilde}}){2})({{$escape_backslash}})\1(?!\2)/,
	  inline: true,
	  priority: 35,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'del',
	      children: match[3]
	    };
	  }
	});
	
	Token.addRule('md_image', {
	  match: /\!{{$link_image}}/,
	  inline: true,
	  priority: 45,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'img',
	      nodeValue: match[0],
	      varName: typeof match[4] == 'string' ? ['image', match[4].toLowerCase()] : null,
	      attributes: {
	        alt: match[1],
	        src: match[2],
	        title: match[3]
	      }
	    };
	  }
	});
	
	Token.addRule('md_link', {
	  match: /{{$link_image}}/,
	  inline: true,
	  priority: 50,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      nodeValue: match[0],
	      varName: typeof match[4] == 'string' ? ['link', match[4].toLowerCase()] : null,
	      attributes: {
	        href: match[2],
	        title: match[3]
	      },
	      children: match[1]
	    };
	  }
	});
	
	Token.addRule('md_autolink', {
	  match: /<([^ >]+?(:|@|\/)[^ >]+)>/,
	  inline: true,
	  priority: 55,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      attributes: {
	        href: match[2] == '@' ? 'mailto:' + match[1] : match[1]
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[1]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_url', {
	  match: /https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?/,
	  inline: true,
	  priority: 60,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      attributes: {
	        href: match[0]
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[0]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_refnote', {
	  match: /\[\^([^\[\]]*)\]/,
	  inline: true,
	  priority: 65,
	  prepare: function prepare(match) {
	    var id = this.escapeId(match[1]);
	    return {
	      nodeName: 'a',
	      nodeValue: match[0],
	      varName: ['refnote', match[1].toLowerCase()],
	      attributes: {
	        class: 'refnote',
	        id: this.options.prefix + 'refnote-' + id,
	        href: '#' + this.options.prefix + 'footnote-' + id,
	        title: this.options.toFootnote || 'See footnote'
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[1]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_br', {
	  match: /{{$newline}}/,
	  inline: true,
	  priority: 70,
	  prepare: function prepare() {
	    return {
	      nodeName: 'br'
	    };
	  }
	});
	
	Token.addVariable('image', function (varName, node) {
	  if (!this.variables.reflink || !this.variables.reflink[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  var reflink = this.variables.reflink[varName];
	  this.setAttributes(node, {
	    src: reflink.uri,
	    title: reflink.title
	  });
	});
	
	Token.addVariable('link', function (varName, node) {
	  if (!this.variables.reflink || !this.variables.reflink[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  var reflink = this.variables.reflink[varName];
	  this.setAttributes(node, {
	    href: reflink.uri,
	    title: reflink.title
	  });
	});
	
	Token.addVariable('refnote', function (varName, node) {
	  if (!this.variables.footnote || !this.variables.footnote[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  node.children = [{
	    nodeName: '#text',
	    nodeValue: '[' + this.variables.footnote[varName].refnoteId + ']'
	  }];
	});
	
	Token.addVariable('footnote', function (varName, node) {
	  this.document.children.splice(this.document.children.indexOf(node), 1);
	
	  if (!this.footnoteNode) {
	    this.footnoteNode = {
	      nodeName: 'ol',
	      attributes: {},
	      children: []
	    };
	    this.setAttributes(this.footnoteNode, { class: 'footnotes' });
	    this.document.children.push(this.footnoteNode);
	  }
	
	  this.footnoteNode.children.push(node);
	});
	
	Token.addVariable('toc', function (varName, node) {
	  var ulStack = [];
	  var ul = node;
	  var ul2;
	  var a;
	  var child;
	  var level;
	  var level2;
	  var index;
	  for (var i = 0; i < this.document.children.length; i++) {
	    child = this.document.children[i];
	    if (child.nodeHtml || (level2 = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(child.nodeName)) == -1 || !child.attributes.id) {
	      continue;
	    }
	    level2++;
	    if (level) {
	      if (level2 > level) {
	        ul2 = {
	          nodeName: 'ul',
	          attributes: {},
	          children: []
	        };
	        ulStack.push(ul);
	        ul.children[ul.children.length - 1].children.push(ul2);
	        ul = ul2;
	      } else if (level2 < level && ul != node) {
	        while (level2 < level && ul != node) {
	          level--;
	          ul = ulStack.pop();
	        }
	      }
	    }
	    level = level2;
	    a = {
	      nodeName: 'a',
	      attributes: {},
	      children: [{
	        nodeName: '#text',
	        nodeValue: this.toText(child)
	      }]
	    };
	    this.setAttributes(a, { href: '#' + child.attributes.id });
	
	    ul.children.push({
	      nodeName: 'li',
	      attributes: {},
	      children: [a]
	    });
	  }
	});
	
	Token.addAttribute('href', function (value) {
	  value = String(value);
	  try {
	    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
	  } catch (e) {
	    return false;
	  }
	  var match = prot.match(/^(\w+)\:/);
	  if (match && this.options.protocols.indexOf(match[1]) == -1) {
	    return false;
	  }
	  return value;
	});
	
	Token.addAttribute('src', function (value) {
	  value = String(value);
	  try {
	    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
	  } catch (e) {
	    return false;
	  }
	  var match = prot.match(/^(\w+)\:/);
	  if (match && this.options.protocols.indexOf(match[1]) == -1) {
	    return false;
	  }
	  return value;
	});
	
	Token.addAttribute('title', function (value) {
	  return value;
	});
	
	Token.addAttribute('alt', function (value) {
	  return value;
	});
	
	Token.addAttribute('style', function (value, nodeHtml) {
	  if (!nodeHtml) {
	    return value;
	  }
	  var results = [];
	  var styles = String(value).split(';');
	  var style;
	  var name;
	  var value;
	  var index;
	  for (var i = 0; i < styles.length; i++) {
	    style = styles[i];
	    index = style.indexOf(';');
	    if (index == -1) {
	      continue;
	    }
	    name = style.substr(0, index).toLowerCase().trim();
	    if (!this.options.styles[name]) {
	      continue;
	    }
	    value = style.substr(index + 1).toLowerCase().trim();
	    if (value && !/^[^\(\)\[\]'"\:&;\\]$/.test(decodeURIComponent(this.unescapeHtml(value)))) {
	      continue;
	    }
	    results.push(name + ':' + value);
	  }
	  return results.join(';');
	});
	
	module.exports = Token;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(73);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	var $Object = __webpack_require__(17).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(25), 'Object', {defineProperty: __webpack_require__(21).f});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(77);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(80);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(53);
	module.exports = __webpack_require__(79).f('iterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(50);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(8);
	__webpack_require__(93);
	__webpack_require__(94);
	module.exports = __webpack_require__(17).Symbol;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(16)
	  , has            = __webpack_require__(31)
	  , DESCRIPTORS    = __webpack_require__(25)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(30)
	  , META           = __webpack_require__(83).KEY
	  , $fails         = __webpack_require__(26)
	  , shared         = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(49)
	  , uid            = __webpack_require__(46)
	  , wks            = __webpack_require__(50)
	  , wksExt         = __webpack_require__(79)
	  , wksDefine      = __webpack_require__(84)
	  , keyOf          = __webpack_require__(85)
	  , enumKeys       = __webpack_require__(86)
	  , isArray        = __webpack_require__(89)
	  , anObject       = __webpack_require__(22)
	  , toIObject      = __webpack_require__(38)
	  , toPrimitive    = __webpack_require__(28)
	  , createDesc     = __webpack_require__(29)
	  , _create        = __webpack_require__(34)
	  , gOPNExt        = __webpack_require__(90)
	  , $GOPD          = __webpack_require__(92)
	  , $DP            = __webpack_require__(21)
	  , $keys          = __webpack_require__(36)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(91).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(88).f  = $propertyIsEnumerable;
	  __webpack_require__(87).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(14)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(20)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(46)('meta')
	  , isObject = __webpack_require__(23)
	  , has      = __webpack_require__(31)
	  , setDesc  = __webpack_require__(21).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(26)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(16)
	  , core           = __webpack_require__(17)
	  , LIBRARY        = __webpack_require__(14)
	  , wksExt         = __webpack_require__(79)
	  , defineProperty = __webpack_require__(21).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(36)
	  , toIObject = __webpack_require__(38);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(36)
	  , gOPS    = __webpack_require__(87)
	  , pIE     = __webpack_require__(88);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 88 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(40);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(38)
	  , gOPN      = __webpack_require__(91).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(37)
	  , hiddenKeys = __webpack_require__(47).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(88)
	  , createDesc     = __webpack_require__(29)
	  , toIObject      = __webpack_require__(38)
	  , toPrimitive    = __webpack_require__(28)
	  , has            = __webpack_require__(31)
	  , IE8_DOM_DEFINE = __webpack_require__(24)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(25) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('asyncIterator');

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('observable');

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(17).Object.assign;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(15);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(98)});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(36)
	  , gOPS     = __webpack_require__(87)
	  , pIE      = __webpack_require__(88)
	  , toObject = __webpack_require__(52)
	  , IObject  = __webpack_require__(39)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(26)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(73);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(99);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(100);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Node = function () {
	  (0, _createClass3.default)(Node, null, [{
	    key: 'escapeHtml',
	    value: function escapeHtml(html, encode) {
	      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }
	  }, {
	    key: 'createElement',
	    value: function createElement(tag) {
	      return new this(null, Node.ELEMENT_NODE, tag);
	    }
	  }, {
	    key: 'createComment',
	    value: function createComment(data) {
	      return new this(data, Node.COMMENT_NODE);
	    }
	  }, {
	    key: 'createTextNode',
	    value: function createTextNode(data) {
	      return new this(data, Node.TEXT_NODE);
	    }
	  }]);
	
	  function Node(nodeValue, nodeType, nodeName) {
	    (0, _classCallCheck3.default)(this, Node);
	    this.childNodes = [];
	    this.attributes = {};
	    this.nodeType = 8;
	    this.nodeName = '';
	
	    this.nodeType = nodeType || Node.DOCUMENT_NODE;
	    switch (this.nodeType) {
	      case Node.DOCUMENT_NODE:
	        {
	          this.nodeName = '#document';
	          this.nodeValue = String(nodeValue);
	          return;
	        }
	      case Node.ELEMENT_NODE:
	        {
	          this.nodeName = nodeName;
	          this.nodeValue = nodeValue;
	          return;
	        }
	      case Node.TEXT_NODE:
	        {
	          this.nodeName = '#text';
	          this.nodeValue = nodeValue;
	          return;
	        }
	      case Node.COMMENT_NODE:
	        {
	          this.nodeName = '#comment';
	          this.nodeValue = nodeValue;
	          return;
	        }
	    }
	  }
	
	  (0, _createClass3.default)(Node, [{
	    key: 'appendChild',
	    value: function appendChild(node) {
	      if (node.parentNode) {
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.childNodes.push(node);
	      return node;
	    }
	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(node, reference) {
	      if (!reference) {
	        return this.appendChild(node);
	      }
	      var index = this.childNodes.indexOf(reference);
	      if (index == -1) {
	        return node;
	      }
	      if (node.parentNode) {
	        if (node.parentNode == this) {
	          index = this.childNodes.indexOf(reference);
	        }
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.childNodes.splice(index, 0, node);
	      return node;
	    }
	  }, {
	    key: 'replaceChild',
	    value: function replaceChild(newNode, oldNode) {
	      var index = this.childNodes.indexOf(oldNode);
	      if (index == -1) {
	        return false;
	      }
	      if (newNode.parentNode) {
	        if (node.parentNode == this) {
	          index = this.childNodes.indexOf(newNode);
	        }
	        newNode.parentNode.removeChild(newNode);
	      }
	      newNode.parentNode = this;
	      this.childNodes.splice(index, 0, newNode);
	      if (oldNode.parentNode) {
	        oldNode.parentNode.removeChild(oldNode);
	      }
	      return oldNode;
	    }
	  }, {
	    key: 'removeChild',
	    value: function removeChild(node) {
	      var index = this.childNodes.indexOf(node);
	      if (index == -1) {
	        return false;
	      }
	      delete node.parentNode;
	      this.childNodes.splice(index, 1);
	      return node;
	    }
	  }, {
	    key: 'setAttributes',
	    value: function setAttributes(attributes) {
	      for (var name in attributes) {
	        this.attributes[name] = attributes[name];
	      }
	      return this;
	    }
	  }, {
	    key: 'setAttribute',
	    value: function setAttribute(name, value) {
	      this.attributes[name] = value;
	      return this;
	    }
	  }, {
	    key: 'removeAttribute',
	    value: function removeAttribute(name) {
	      var result = typeof this.attributes[name] != 'undefined';
	      delete this.attributes[name];
	      return result;
	    }
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute(name) {
	      return typeof this.attributes[name] == 'undefined' ? null : this.attributes[name];
	    }
	  }, {
	    key: 'firstChild',
	    value: function firstChild() {
	      return this.childNodes.length ? this.childNodes[0] : null;
	    }
	  }, {
	    key: 'lastChild',
	    value: function lastChild() {
	      return this.childNodes.length ? this.childNodes[this.childNodes.length - 1] : null;
	    }
	  }, {
	    key: 'toHtmlAttribute',
	    value: function toHtmlAttribute() {
	      var attributes = [];
	      var value;
	      for (var name in this.attributes) {
	        value = this.attributes[name];
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        attributes.push(value === true ? name : name + '="' + this.constructor.escapeHtml(value) + '"');
	      }
	      return attributes.join(' ');
	    }
	  }, {
	    key: 'toHtml',
	    value: function toHtml() {
	      var result;
	      switch (this.nodeType) {
	        case Node.DOCUMENT_NODE:
	          {
	            result = [];
	            for (var i = 0; i < this.childNodes.length; i++) {
	              result.push(this.childNodes[i].toHtml());
	            }
	            return result.join('');
	          }
	        case Node.ELEMENT_NODE:
	          {
	            var single = this.constructor.singles[this.nodeName];
	            var attribute = this.toHtmlAttribute();
	            if (attribute) {
	              attribute = ' ' + attribute;
	            }
	            if (single) {
	              return '<' + this.nodeName + attribute + ' />';
	            } else {
	              var childNodes = '';
	              for (var i = 0; i < this.childNodes.length; i++) {
	                childNodes += this.childNodes[i].toHtml();
	              }
	              return '<' + this.nodeName + attribute + '>' + childNodes + '</' + this.nodeName + '>';
	            }
	          }
	        case Node.COMMENT_NODE:
	          {
	            return '<!--' + this.constructor.escapeHtml(this.nodeValue).replace(/[\[\]]/g, ' ') + '-->';
	          }
	        case Node.TEXT_NODE:
	          {
	            return this.constructor.escapeHtml(this.nodeValue);
	          }
	        default:
	          {
	            return '';
	          }
	      }
	    }
	  }]);
	  return Node;
	}();
	
	Node.singles = {
	  base: true,
	  basefont: true,
	  br: true,
	  col: true,
	  embed: true,
	  frame: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true
	};
	Node.ELEMENT_NODE = 1;
	Node.TEXT_NODE = 3;
	Node.COMMENT_NODE = 8;
	Node.DOCUMENT_NODE = 9;
	
	
	module.exports = Node;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=test.js.map