/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Generated by CoffeeScript 2.5.1\n(function() {\n  var MAX_OFFSET, makeFreqs;\n\n  window.ogid = function(radix, rnd) {\n    return parseInt((new Date().valueOf() - new Date(2020, 0, 1).valueOf()).toString().concat(Math.floor(Math.random() * (99999 || false))).split('').reverse().join('')).toString(radix || 36);\n  };\n\n  MAX_OFFSET = 7 * 12;\n\n  window.noteNames = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];\n\n  window.notesByName = {};\n\n  window.notesByMIDINo = [];\n\n  makeFreqs = function() {\n    var a, freq, nnOffset, noteName, octave, offset, results;\n    offset = -4 * 12;\n    a = Math.pow(2, 1 / 12);\n    results = [];\n    while (offset < MAX_OFFSET) {\n      nnOffset = offset;\n      while (nnOffset < 0) {\n        nnOffset += 12;\n      }\n      noteName = noteNames[nnOffset % 12];\n      octave = Math.floor((offset - 3) / 12) + 4;\n      if (octave > -1) {\n        freq = 440 * 10000000000 * Math.pow(a, offset);\n        freq = +(Math.round(freq) * 0.0000000001).toFixed(10);\n        notesByName[noteName + octave] = freq;\n        notesByMIDINo.push({\n          name: noteName,\n          freq: freq\n        });\n      }\n      results.push(offset++);\n    }\n    return results;\n  };\n\n  makeFreqs();\n\n  window.Track = function(opts) {\n    return {\n      id: ogid(),\n      pointer: 0,\n      wrap: true,\n      steps: opts.steps || 4,\n      lastTime: -1,\n      tempo: opts.tempo,\n      current: {},\n      notes: [],\n      addNote: function(note) {\n        var pointerNote;\n        pointerNote = this.notes[this.pointer];\n        if (pointerNote && pointerNote.time > note.time) {\n          this.pointer++;\n        }\n        note.track = this;\n        note.id = ogid();\n        this.notes.push(note);\n        this.notes.sort(function(a, b) {\n          if (a.time < b.time) {\n            return -1;\n          } else {\n            return 1;\n          }\n        });\n        return note;\n      },\n      removeNote: function(note) {\n        var pointerNote;\n        pointerNote = this.notes[this.pointer];\n        if (pointerNote && pointerNote.time < note.time) {\n          this.pointer--;\n        }\n        return this.notes.splice(this.notes.indexOf(note), 1);\n      }\n    };\n  };\n\n  window.Sequencer = function(audio) {\n    var lastTime, lookahead, nextNote, playNote, playing, schedule, steps, tempo, tracks;\n    tempo = 120;\n    steps = 4;\n    lookahead = 0.1;\n    lastTime = -1;\n    playing = true;\n    tracks = [];\n    playNote = function(time, note) {\n      return console.log('Please supply a playNote function');\n    };\n    nextNote = function(track, time) {\n      var note;\n      if (note = track.notes[track.pointer]) {\n        if (note.time < time) {\n          track.pointer++;\n          return note;\n        }\n      }\n      return null;\n    };\n    schedule = function() {\n      var deg, diff, i, len, note, time, timeNow, track;\n      for (i = 0, len = tracks.length; i < len; i++) {\n        track = tracks[i];\n        deg = (track.tempo || tempo) / 60;\n        timeNow = (audio.currentTime * deg) % (track.steps || steps);\n        time = ((audio.currentTime + lookahead) * deg) % (track.steps || steps);\n        if (time < track.lastTime && track.wrap) {\n          track.pointer = 0;\n        }\n        while (note = nextNote(track, time, track.lastTime)) {\n          diff = note.time - time;\n          playNote(audio.currentTime + lookahead + diff / deg, note);\n        }\n        track.lastTime = time;\n      }\n      if (playing) {\n        return window.requestAnimationFrame(schedule);\n      }\n    };\n    return {\n      setTempo: function(newTempo) {\n        var i, len, results, track;\n        tempo = newTempo;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.tempo = newTempo);\n        }\n        return results;\n      },\n      setSteps: function(newSteps) {\n        var i, len, results, track;\n        steps = newSteps;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.steps = newSteps);\n        }\n        return results;\n      },\n      setWrap: function(newWrap) {\n        var i, len, results, track;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.wrap = newWrap);\n        }\n        return results;\n      },\n      setPlayFn: function(fn) {\n        return playNote = fn;\n      },\n      getTracks: function() {\n        return tracks;\n      },\n      addTrack: function() {\n        var newTrack;\n        newTrack = Track({\n          tempo: tempo,\n          steps: steps\n        });\n        tracks.push(newTrack);\n        return newTrack;\n      },\n      start: function(restart) {\n        var i, len, track;\n        if (restart) {\n          audio.currentTime = 0;\n          for (i = 0, len = tracks.length; i < len; i++) {\n            track = tracks[i];\n            track.pointer = 0;\n            track.lastTime = -1;\n          }\n        }\n        playing = true;\n        return schedule();\n      },\n      stop: function() {\n        var adsr, i, len, results, track;\n        playing = false;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push((function() {\n            var j, len1, ref, results1;\n            ref = track.current;\n            results1 = [];\n            for (j = 0, len1 = ref.length; j < len1; j++) {\n              adsr = ref[j];\n              results1.push(adsr.stop());\n            }\n            return results1;\n          })());\n        }\n        return results;\n      }\n    };\n  };\n\n  window.LFO = function(opts) {\n    var osc, oscGain;\n    osc = opts.audio.createOscillator();\n    osc.frequency.value = opts.frequency || 1;\n    oscGain = opts.audio.createGain();\n    oscGain.gain.value = opts.value || 10;\n    osc.connect(oscGain);\n    return {\n      connect: function(thing) {\n        return oscGain.connect(thing);\n      },\n      osc: osc,\n      gain: oscGain,\n      start: function() {\n        return osc.start();\n      },\n      stop: function() {\n        return osc.stop();\n      }\n    };\n  };\n\n  window.waveTableIndex = ['01_Saw', '02_Triangle', '03_Square', '04_Noise', '05_Pulse', '06_Warm_Saw', '07_Warm_Triangle', '08_Warm_Square', '09_Dropped_Saw', '10_Dropped_Square', '11_TB303_Square', 'Bass', 'Bass_Amp360', 'Bass_Fuzz', 'Bass_Fuzz_ 2', 'Bass_Sub_Dub', 'Bass_Sub_Dub_2', 'Brass', 'Brit_Blues', 'Brit_Blues_Driven', 'Buzzy_1', 'Buzzy_2', 'Celeste', 'Chorus_Strings', 'Dissonant Piano', 'Dissonant_1', 'Dissonant_2', 'Dyna_EP_Bright', 'Dyna_EP_Med', 'Ethnic_33', 'Full_1', 'Full_2', 'Guitar_Fuzz', 'Harsh', 'Mkl_Hard', 'Organ_2', 'Organ_3', 'Phoneme_ah', 'Phoneme_bah', 'Phoneme_ee', 'Phoneme_o', 'Phoneme_ooh', 'Phoneme_pop_ahhhs', 'Piano', 'Putney_Wavering', 'Throaty', 'Trombone', 'Twelve String Guitar 1', 'Twelve_OpTines', 'Wurlitzer', 'Wurlitzer_2'];\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });