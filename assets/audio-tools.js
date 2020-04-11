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

eval("// Generated by CoffeeScript 2.5.1\n(function() {\n  var MAX_OFFSET, loadSample, loadWaveTable, makeFreqs, samples, waveTables;\n\n  window.ogid = function(radix, rnd) {\n    return parseInt((new Date().valueOf() - new Date(2020, 0, 1).valueOf()).toString().concat(Math.floor(Math.random() * (99999 || false))).split('').reverse().join('')).toString(radix || 36);\n  };\n\n  MAX_OFFSET = 7 * 12;\n\n  window.noteNames = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];\n\n  window.notesByName = {};\n\n  window.notesByMIDINo = [];\n\n  makeFreqs = function() {\n    var a, freq, nnOffset, noteName, octave, offset, results;\n    offset = -4 * 12;\n    a = Math.pow(2, 1 / 12);\n    results = [];\n    while (offset < MAX_OFFSET) {\n      nnOffset = offset;\n      while (nnOffset < 0) {\n        nnOffset += 12;\n      }\n      noteName = noteNames[nnOffset % 12];\n      octave = Math.floor((offset - 3) / 12) + 4;\n      if (octave > -1) {\n        freq = 440 * 10000000000 * Math.pow(a, offset);\n        freq = +(Math.round(freq) * 0.0000000001).toFixed(10);\n        notesByName[noteName + octave] = freq;\n        notesByMIDINo.push({\n          name: noteName,\n          freq: freq\n        });\n      }\n      results.push(offset++);\n    }\n    return results;\n  };\n\n  makeFreqs();\n\n  waveTables = {};\n\n  samples = {};\n\n  window.instruments = {\n    Osc1x: function(opts) {\n      var gain, osc;\n      gain = opts.audio.createGain();\n      osc = opts.audio.createOscillator();\n      osc.frequency.value = opts.note.freq || notesByMIDINo[opts.note.noteNo];\n      if (opts.note.track.instrument.periodicWave) {\n        console.log('setting periodic wave');\n        osc.setPeriodicWave(waveTables[opts.note.track.instrument.periodicWave]);\n      }\n      osc.connect(gain);\n      if (opts.note.gain) {\n        gain.gain.value = opts.note.gain;\n      }\n      return {\n        connect: function(thing) {\n          return gain.connect(thing);\n        },\n        start: function(time) {\n          osc.start(time);\n          return console.log('starting', osc.frequency.value);\n        },\n        stop: function(time) {\n          osc.stop(time);\n          return console.log('stopping', osc.frequency.value);\n        }\n      };\n    },\n    Sample: function(opts) {\n      var gain, source;\n      gain = opts.audio.createGain();\n      source = opts.audio.createBufferSource();\n      source.buffer = samples[opts.note.track.instrument.sample];\n      if (opts.note.playbackRate || opts.note.track.instrument.playbackRate) {\n        source.playbackRate.setValueAtTime(opts.note.playbackRate || opts.note.track.instrument.playbackRate, opts.audio.currentTime);\n      }\n      if (opts.note.gain) {\n        gain.gain.value = opts.note.gain;\n      }\n      source.connect(gain);\n      return {\n        connect: function(thing) {\n          return gain.connect(thing);\n        },\n        start: function(time) {\n          return source.start(time);\n        },\n        stop: function(time) {\n          return source.stop(time);\n        }\n      };\n    }\n  };\n\n  window.ADSR = function(opts) {\n    var a, av, d, dv, gain, id, r, s, sv;\n    id = ogid();\n    gain = opts.audio.createGain();\n    gain.gain.value = 0;\n    a = opts.time + opts.attackTime;\n    d = a + opts.decayTime;\n    s = d + opts.sustainTime;\n    r = s + opts.releaseTime;\n    av = opts.attackValue;\n    dv = opts.decayValue;\n    sv = opts.sustainValue;\n    gain.gain.setValueAtTime(0, opts.time);\n    gain.gain.linearRampToValueAtTime(av, a);\n    gain.gain.linearRampToValueAtTime(dv, d);\n    if (!opts.hold) {\n      gain.gain.linearRampToValueAtTime(sv, s);\n      gain.gain.linearRampToValueAtTime(0, r);\n    }\n    if (opts.osc) {\n      opts.osc.start(opts.time);\n      if (!opts.hold) {\n        opts.osc.stop(r);\n        setTimeout(function() {\n          return typeof opts.onStop === \"function\" ? opts.onStop(id) : void 0;\n        }, (r - opts.audio.currentTime) * 1000);\n      }\n    }\n    return {\n      connect: gain.connect,\n      gain: gain,\n      stop: function() {\n        gain.gain.cancelScheduledValues();\n        gain.gain.linearRampToValueAtTime(0, opts.releaseTime);\n        if (opts.time >= opts.audio.currentTime + opts.releaseTime) {\n          opts.osc.stop(opts.time + 10);\n        } else {\n          if (opts.osc) {\n            opts.osc.stop(opts.audio.currentTime + opts.releaseTime);\n          }\n        }\n        return setTimeout(function() {\n          return typeof opts.onStop === \"function\" ? opts.onStop(id) : void 0;\n        }, opts.releaseTime * 1000);\n      }\n    };\n  };\n\n  loadSample = async function(uri) {\n    var arrayBuffer, audioBuffer, response;\n    if (samples[uri]) {\n      return;\n    }\n    response = (await fetch(uri));\n    arrayBuffer = (await response.arrayBuffer());\n    audioBuffer = (await audio.decodeAudioData(arrayBuffer));\n    return samples[uri] = audioBuffer;\n  };\n\n  loadWaveTable = async function(name) {\n    var data, response;\n    if (waveTables[name]) {\n      return;\n    }\n    response = (await fetch('https://ndxbxrme.github.io/yma-full/assets/wave-tables/' + name));\n    data = JSON.parse(((await response.text())).replace(/'/g, '\"').replace(/\\n/g, '').replace(/,\\]/g, ']').replace(/,\\}/g, '}'));\n    return waveTables[name] = audio.createPeriodicWave(data.real, data.imag);\n  };\n\n  window.Track = function(opts) {\n    return {\n      id: ogid(),\n      pointer: 0,\n      wrap: true,\n      steps: opts.steps || 4,\n      lastTime: -1,\n      tempo: opts.tempo,\n      current: {},\n      notes: [],\n      addNote: function(note) {\n        var pointerNote;\n        pointerNote = this.notes[this.pointer];\n        if (pointerNote && pointerNote.time > note.time) {\n          this.pointer++;\n        }\n        note.track = this;\n        note.id = ogid();\n        this.notes.push(note);\n        this.notes.sort(function(a, b) {\n          if (a.time < b.time) {\n            return -1;\n          } else {\n            return 1;\n          }\n        });\n        return note;\n      },\n      removeNote: function(note) {\n        var pointerNote;\n        pointerNote = this.notes[this.pointer];\n        if (pointerNote && pointerNote.time < note.time) {\n          this.pointer--;\n        }\n        return this.notes.splice(this.notes.indexOf(note), 1);\n      }\n    };\n  };\n\n  window.Sequencer = function(audio) {\n    var lastTime, lookahead, nextNote, playNote, playing, schedule, startTime, steps, tempo, tracks;\n    tempo = 120;\n    steps = 4;\n    lookahead = 0.1;\n    lastTime = -1;\n    startTime = 0;\n    playing = true;\n    tracks = [];\n    playNote = function(time, note) {\n      var adsr, attackTime, attackValue, decayTime, decayValue, id, length, ref, releaseTime, source, sustainTime, sustainValue;\n      source = null;\n      if (note.track.instrument.solo) {\n        ref = note.track.current;\n        for (id in ref) {\n          adsr = ref[id];\n          adsr.stop();\n        }\n      }\n      attackTime = note.attackTime || note.track.attackTime || 0.001;\n      attackValue = note.attackValue || note.track.attackValue || 0.8;\n      decayTime = note.decayTime || note.track.decayTime || 0.1;\n      decayValue = note.decayValue || note.track.decayValue || 0.1;\n      sustainTime = note.sustainTime || note.track.sustainTime || 0.5;\n      sustainValue = note.sustainValue || note.track.sustainValue || decayValue;\n      releaseTime = note.releaseTime || note.track.releaseTime || 0.01;\n      if (note.length) {\n        length = (note.track.tempo || seq.getTempo()) / 60 * note.length;\n        sustainTime = length - attackTime - decayTime;\n      }\n      source = instruments[note.track.instrument.type]({\n        audio: audio,\n        note: note\n      });\n      adsr = ADSR({\n        audio: audio,\n        time: time,\n        osc: source,\n        note: note,\n        hold: note.track.hold,\n        attackTime: attackTime,\n        attackValue: attackValue,\n        decayTime: decayTime,\n        decayValue: decayValue,\n        sustainTime: sustainTime,\n        sustainValue: sustainValue,\n        releaseTime: releaseTime,\n        onStop: function(id) {\n          note.playing = false;\n          return delete note.track.current[id];\n        }\n      });\n      source.connect(adsr.gain);\n      adsr.gain.connect(audio.destination);\n      note.playing = true;\n      return note.track.current[adsr.id] = adsr;\n    };\n    nextNote = function(track, time) {\n      var note;\n      if (note = track.notes[track.pointer]) {\n        if (note.time < time) {\n          track.pointer++;\n          return note;\n        }\n      }\n      return null;\n    };\n    schedule = function() {\n      var currentTime, deg, diff, i, len, note, time, timeNow, track;\n      if (playing) {\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          deg = (track.tempo || tempo) / 60;\n          currentTime = audio.currentTime - startTime;\n          timeNow = (currentTime * deg) % (track.steps || steps);\n          time = ((currentTime + lookahead) * deg) % (track.steps || steps);\n          if (time < track.lastTime && track.wrap) {\n            track.pointer = 0;\n          }\n          while (note = nextNote(track, time, track.lastTime)) {\n            diff = note.time - time;\n            playNote(audio.currentTime + lookahead + diff / deg, note);\n          }\n          track.lastTime = time;\n        }\n        return window.requestAnimationFrame(schedule);\n      }\n    };\n    return {\n      setTempo: function(newTempo) {\n        var i, len, results, track;\n        tempo = newTempo;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.tempo = newTempo);\n        }\n        return results;\n      },\n      setSteps: function(newSteps) {\n        var i, len, results, track;\n        steps = newSteps;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.steps = newSteps);\n        }\n        return results;\n      },\n      setWrap: function(newWrap) {\n        var i, len, results, track;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          results.push(track.wrap = newWrap);\n        }\n        return results;\n      },\n      setPlayFn: function(fn) {\n        return playNote = fn;\n      },\n      getTracks: function() {\n        return tracks;\n      },\n      getTempo: function() {\n        return tempo;\n      },\n      addTrack: function() {\n        var newTrack;\n        newTrack = Track({\n          tempo: tempo,\n          steps: steps\n        });\n        tracks.push(newTrack);\n        return newTrack;\n      },\n      start: function(restart) {\n        var i, len, track;\n        if (restart) {\n          startTime = audio.currentTime;\n          for (i = 0, len = tracks.length; i < len; i++) {\n            track = tracks[i];\n            track.pointer = 0;\n            track.lastTime = -1;\n          }\n        }\n        playing = true;\n        return schedule();\n      },\n      stop: function() {\n        var stopAll;\n        playing = false;\n        stopAll = function() {\n          var adsr, i, len, results, track;\n          results = [];\n          for (i = 0, len = tracks.length; i < len; i++) {\n            track = tracks[i];\n            results.push((function() {\n              var j, len1, ref, results1;\n              ref = track.current;\n              results1 = [];\n              for (j = 0, len1 = ref.length; j < len1; j++) {\n                adsr = ref[j];\n                results1.push(adsr.stop());\n              }\n              return results1;\n            })());\n          }\n          return results;\n        };\n        stopAll();\n        return setTimeout(stopAll, 50); //panic\n      },\n      load: async function() {\n        var i, len, ref, ref1, results, track;\n        results = [];\n        for (i = 0, len = tracks.length; i < len; i++) {\n          track = tracks[i];\n          if ((ref = track.instrument) != null ? ref.periodicWave : void 0) {\n            await loadWaveTable(track.instrument.periodicWave);\n          }\n          if ((ref1 = track.instrument) != null ? ref1.sample : void 0) {\n            results.push((await loadSample(track.instrument.sample)));\n          } else {\n            results.push(void 0);\n          }\n        }\n        return results;\n      }\n    };\n  };\n\n  window.LFO = function(opts) {\n    var osc, oscGain;\n    osc = opts.audio.createOscillator();\n    osc.frequency.value = opts.frequency || 1;\n    oscGain = opts.audio.createGain();\n    oscGain.gain.value = opts.value || 10;\n    osc.connect(oscGain);\n    return {\n      connect: function(thing) {\n        return oscGain.connect(thing);\n      },\n      osc: osc,\n      gain: oscGain,\n      start: function() {\n        return osc.start();\n      },\n      stop: function() {\n        return osc.stop();\n      }\n    };\n  };\n\n  window.waveTableIndex = ['01_Saw', '02_Triangle', '03_Square', '04_Noise', '05_Pulse', '06_Warm_Saw', '07_Warm_Triangle', '08_Warm_Square', '09_Dropped_Saw', '10_Dropped_Square', '11_TB303_Square', 'Bass', 'Bass_Amp360', 'Bass_Fuzz', 'Bass_Fuzz_ 2', 'Bass_Sub_Dub', 'Bass_Sub_Dub_2', 'Brass', 'Brit_Blues', 'Brit_Blues_Driven', 'Buzzy_1', 'Buzzy_2', 'Celeste', 'Chorus_Strings', 'Dissonant Piano', 'Dissonant_1', 'Dissonant_2', 'Dyna_EP_Bright', 'Dyna_EP_Med', 'Ethnic_33', 'Full_1', 'Full_2', 'Guitar_Fuzz', 'Harsh', 'Mkl_Hard', 'Organ_2', 'Organ_3', 'Phoneme_ah', 'Phoneme_bah', 'Phoneme_ee', 'Phoneme_o', 'Phoneme_ooh', 'Phoneme_pop_ahhhs', 'Piano', 'Putney_Wavering', 'Throaty', 'Trombone', 'Twelve String Guitar 1', 'Twelve_OpTines', 'Wurlitzer', 'Wurlitzer_2'];\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });