/* Security: No dynamic code execution, no inline handlers, addEventListener only.
   No cookies, tracking, analytics, or API keys. IIFE strict mode. */
(function() {
'use strict';

// ==================== APP STATE ====================
var state = {
    yesCount: 0,
    noCount: 0,
    angerLevel: 0.5,
    lastCompliment: null,
    lastRejectionMessage: null,
    currentScreen: 'SCAN_SCREEN',
    mediaDetected: null,
    memoryGalleryDetected: false
};

// ==================== CONSTANTS ====================
var YES_QUESTIONS = [
    'Thoda sa maaf kiya?', 'Pakka?', 'Sach mein?', '100% sure?',
    'No takebacks?', 'Still sure?', 'Very sure?', 'Absolutely sure?',
    'Officially?', 'Final confirmation?'
];

var COMPLIMENTS = [
    '1/5 Footiya is cutest.',
    'Scientists proved 1/5 Footiya is always right.',
    'Best Sister Detected.',
    'Government Approved Awesome Sister.',
    'Rare Legendary Sister Found.',
    'Breaking News: 1/5 Footiya Wins Again.',
    'Sister power level maximum.',
    'Cute level increasing.',
    '1/5 Footiya wins every argument.',
    'Certified Best Sister.'
];

var REJECTION_MESSAGES = [
    'You would do this to your brother?',
    'Think again 1/5 Footiya.',
    'Error 404: Rejection not found.',
    'Sibling bond too strong.',
    'That button seems broken.',
    'Brother sadness detected.',
    'Come on yaar.',
    'Forgiveness required.'
];

var SCAN_MESSAGES = [
    'Detecting 1/5 Footiya...',
    'Analyzing Anger Level...',
    'Checking Forgiveness Database...',
    'Activating Brother Apology Mode...',
    'Loading Cute Sister Protocol...'
];

var SUCCESS_MESSAGES = [
    'Verifying Forgiveness...',
    'Checking Acceptance...',
    'Calculating Happiness...',
    'Mission Passed.'
];

var RECORD_MESSAGES = [
    'Recording Forgiveness...',
    'Updating Brother Happiness...',
    'Calculating Celebration Level...',
    'Syncing Sibling Database...'
];

var PROTOCOL_MESSAGES = [
    'Normal Method Failed.',
    'Deploying Advanced Brother Protocol.',
    'Increasing Apology Power.'
];

var ANGER_LEVELS = [0.5, 1.5, 2.5, 3.5, 4.5];

// ==================== UTILITIES ====================
var activeIntervals = [];
var activeTimeouts = [];

function clearAllTimers() {
    activeIntervals.forEach(function(id) { clearInterval(id); });
    activeTimeouts.forEach(function(id) { clearTimeout(id); });
    activeIntervals = [];
    activeTimeouts = [];
}

function trackInterval(id) { activeIntervals.push(id); return id; }
function trackTimeout(id) { activeTimeouts.push(id); return id; }

function $(id) { return document.getElementById(id); }
function $q(sel, ctx) { return (ctx || document).querySelector(sel); }
function $qa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

function switchScreen(screenId) {
    var screens = $qa('.screen');
    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
    }
    var target = $(screenId);
    if (target) {
        target.classList.add('active');
    }
}

function getRandomItem(arr, exclude) {
    var filtered = arr;
    if (exclude !== null && exclude !== undefined) {
        filtered = arr.filter(function(item) { return item !== exclude; });
        if (filtered.length === 0) filtered = arr;
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
}

function getAngerColor(level) {
    if (level <= 0.5) return '#4ade80';
    if (level <= 1.5) return '#facc15';
    if (level <= 2.5) return '#f97316';
    return '#ef4444';
}

// ==================== STATE MACHINE ====================
var states = {};

function transition(stateName) {
    var oldState = states[state.currentScreen];
    if (oldState && oldState.exit) oldState.exit();
    clearAllTimers();
    state.currentScreen = stateName;
    var newState = states[stateName];
    if (newState && newState.enter) newState.enter();
    if (newState && newState.render) newState.render();
}

// ==================== SCAN_SCREEN ====================
states.SCAN_SCREEN = {
    enter: function() {
        switchScreen('screen-scan');
    },
    render: function() {},
    exit: function() {}
};

// ==================== ANGER_SCAN ====================
states.ANGER_SCAN = {
    enter: function() {
        switchScreen('screen-anger-scan');
        var screen = $('screen-anger-scan');
        var loading = $q('.scan-loading-container', screen);
        var result = $q('.scan-result-container', screen);
        loading.classList.remove('hidden');
        result.classList.add('hidden');
        this.runLoading();
    },
    render: function() {},
    exit: function() {},
    runLoading: function() {
        var screen = $('screen-anger-scan');
        var textEl = $q('.scan-status-text', screen);
        var barFill = $q('.scan-loading-container .progress-bar-fill', screen);
        var pctEl = $q('.scan-percentage', screen);
        var idx = 0;
        var total = SCAN_MESSAGES.length;
        var interval = trackInterval(setInterval(function() {
            if (idx < total) {
                textEl.textContent = SCAN_MESSAGES[idx];
                var pct = Math.round(((idx + 1) / total) * 100);
                barFill.style.width = pct + '%';
                pctEl.textContent = pct + '%';
                idx++;
            } else {
                clearInterval(interval);
                trackTimeout(setTimeout(function() {
                    var loading = $q('.scan-loading-container', screen);
                    var result = $q('.scan-result-container', screen);
                    loading.classList.add('hidden');
                    result.classList.remove('hidden');
                }, 500));
            }
        }, 600));
    }
};

// ==================== MAIN_APOLOGY ====================
states.MAIN_APOLOGY = {
    enter: function() {
        switchScreen('screen-main-apology');
    },
    render: function() {},
    exit: function() {}
};

// ==================== YES_FLOW ====================
states.YES_FLOW = {
    enter: function() {
        switchScreen('screen-yes-flow');
        var screen = $('screen-yes-flow');
        var complimentCard = $q('.compliment-card', screen);
        complimentCard.classList.add('hidden');
    },
    render: function() {
        var screen = $('screen-yes-flow');
        var questionEl = $q('.yes-flow-question', screen);
        var progressLabel = $q('.progress-label', screen);
        questionEl.textContent = YES_QUESTIONS[state.yesCount];
        progressLabel.textContent = 'Level ' + (state.yesCount + 1) + '/10';
    },
    exit: function() {},
    showCompliment: function() {
        var screen = $('screen-yes-flow');
        var complimentCard = $q('.compliment-card', screen);
        var complimentText = $q('.compliment-text', screen);
        var chosen = getRandomItem(COMPLIMENTS, state.lastCompliment);
        state.lastCompliment = chosen;
        complimentText.textContent = chosen;
        complimentCard.classList.remove('hidden');
        trackTimeout(setTimeout(function() {
            complimentCard.classList.add('hidden');
            state.yesCount++;
            // Start preloading video at level 5 so it's ready by the time we need it
            if (state.yesCount >= 5 && state.mediaDetected) {
                preloadVideo();
            }
            if (state.yesCount >= 10) {
                transition('SUCCESS_SCREEN');
            } else {
                states.YES_FLOW.render();
            }
        }, 1500));
    }
};

// ==================== NO_FLOW ====================
states.NO_FLOW = {
    enter: function() {
        switchScreen('screen-no-flow');
        this.resetNoButton();
    },
    render: function() {
        var screen = $('screen-no-flow');
        var badge = $q('.anger-level-badge', screen);
        var meterFill = $q('.anger-meter-fill', screen);
        var msgEl = $q('.rejection-message', screen);

        var angerIdx = Math.min(state.noCount - 1, ANGER_LEVELS.length - 1);
        if (angerIdx < 0) angerIdx = 0;
        state.angerLevel = ANGER_LEVELS[angerIdx];

        var color = getAngerColor(state.angerLevel);
        var pct = (state.angerLevel / 5) * 100;

        badge.textContent = 'Anger: ' + state.angerLevel + '/5';
        badge.style.color = color;
        meterFill.style.width = pct + '%';
        meterFill.style.background = color;

        var chosen = getRandomItem(REJECTION_MESSAGES, state.lastRejectionMessage);
        state.lastRejectionMessage = chosen;
        msgEl.textContent = chosen;
    },
    exit: function() {},
    resetNoButton: function() {
        var btn = $('btn-no-flow-no');
        if (btn) {
            btn.classList.remove('escaping');
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top = '';
            btn.style.zIndex = '';
            btn.style.margin = '';
        }
    }
};

// ==================== ADVANCED_BROTHER_PROTOCOL ====================
states.ADVANCED_BROTHER_PROTOCOL = {
    phase: 1,
    enter: function() {
        switchScreen('screen-advanced-protocol');
        this.phase = 1;
        this.showPhase1();
    },
    render: function() {},
    exit: function() { this.phase = 1; },
    hideAll: function() {
        var screen = $('screen-advanced-protocol');
        $q('.protocol-loading', screen).classList.add('hidden');
        $q('.protocol-main', screen).classList.add('hidden');
        $q('.protocol-heartbreak', screen).classList.add('hidden');
        $q('.protocol-portal', screen).classList.add('hidden');
    },
    showPhase1: function() {
        this.hideAll();
        var screen = $('screen-advanced-protocol');
        var loading = $q('.protocol-loading', screen);
        loading.classList.remove('hidden');
        var textEl = $q('.protocol-loading-text', screen);
        var barFill = $q('.protocol-loading .progress-bar-fill', screen);
        var idx = 0;
        var total = PROTOCOL_MESSAGES.length;
        var interval = trackInterval(setInterval(function() {
            if (idx < total) {
                textEl.textContent = PROTOCOL_MESSAGES[idx];
                barFill.style.width = Math.round(((idx + 1) / total) * 100) + '%';
                idx++;
            } else {
                clearInterval(interval);
                trackTimeout(setTimeout(function() {
                    states.ADVANCED_BROTHER_PROTOCOL.showPhase2();
                }, 500));
            }
        }, 1000));
    },
    showPhase2: function() {
        this.hideAll();
        this.phase = 2;
        var screen = $('screen-advanced-protocol');
        var main = $q('.protocol-main', screen);
        main.classList.remove('hidden');
        var msg = $q('.protocol-message', screen);
        msg.textContent = 'Come on 1/5 Footiya.\n\nBhaiya itne bhi bure nahi hain.';
    },
    showPhase3: function() {
        this.hideAll();
        this.phase = 3;
        var screen = $('screen-advanced-protocol');
        var hb = $q('.protocol-heartbreak', screen);
        hb.classList.remove('hidden');
        var msg = $q('.heartbreak-message', screen);
        msg.textContent = 'It hurts.\n\nDid you forget?\nWho is big brother?\nBig brother is big brother.\n\nAt least listen to the apology.';
    },
    showPhase4: function() {
        this.hideAll();
        this.phase = 4;
        var screen = $('screen-advanced-protocol');
        var portal = $q('.protocol-portal', screen);
        portal.classList.remove('hidden');
        trackTimeout(setTimeout(function() {
            state.yesCount = 0;
            state.noCount = 0;
            state.angerLevel = 0.5;
            state.lastCompliment = null;
            state.lastRejectionMessage = null;
            transition('SCAN_SCREEN');
        }, 2500));
    }
};

// ==================== SUCCESS_SCREEN ====================
states.SUCCESS_SCREEN = {
    enter: function() {
        switchScreen('screen-success');
        var screen = $('screen-success');
        var loading = $q('.success-loading', screen);
        var celebration = $q('.success-celebration', screen);
        loading.classList.remove('hidden');
        celebration.classList.add('hidden');
        this.runLoading();
    },
    render: function() {},
    exit: function() {
        var screen = $('screen-success');
        var container = $q('.confetti-container', screen);
        if (container) container.textContent = '';
    },
    runLoading: function() {
        var screen = $('screen-success');
        var textEl = $q('.success-loading-text', screen);
        var barFill = $q('.success-loading .progress-bar-fill', screen);
        var idx = 0;
        var total = SUCCESS_MESSAGES.length;
        var interval = trackInterval(setInterval(function() {
            if (idx < total) {
                textEl.textContent = SUCCESS_MESSAGES[idx];
                barFill.style.width = Math.round(((idx + 1) / total) * 100) + '%';
                idx++;
            } else {
                clearInterval(interval);
                trackTimeout(setTimeout(function() {
                    var loading = $q('.success-loading', screen);
                    var celebration = $q('.success-celebration', screen);
                    loading.classList.add('hidden');
                    celebration.classList.remove('hidden');
                    states.SUCCESS_SCREEN.createConfetti();
                }, 500));
            }
        }, 1000));
    },
    createConfetti: function() {
        var screen = $('screen-success');
        var container = $q('.confetti-container', screen);
        container.textContent = '';
        var colors = ['#d4a574', '#4ade80', '#60a5fa', '#a78bfa', '#ef4444'];
        for (var i = 0; i < 50; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = (6 + Math.random() * 8) + 'px';
            container.appendChild(piece);
        }
    },
    skipToSuccess: function() {
        switchScreen('screen-success');
        var screen = $('screen-success');
        var loading = $q('.success-loading', screen);
        var celebration = $q('.success-celebration', screen);
        loading.classList.add('hidden');
        celebration.classList.remove('hidden');
        this.createConfetti();
    }
};

// ==================== SHAYARI_SCREEN ====================
states.SHAYARI_SCREEN = {
    enter: function() { switchScreen('screen-shayari'); },
    render: function() {},
    exit: function() {}
};

// ==================== RECORD_SCREEN ====================
states.RECORD_SCREEN = {
    enter: function() {
        switchScreen('screen-record');
        var screen = $('screen-record');
        var loading = $q('.record-loading', screen);
        var result = $q('.record-result', screen);
        loading.classList.remove('hidden');
        result.classList.add('hidden');
        this.runLoading();
    },
    render: function() {},
    exit: function() {},
    runLoading: function() {
        var screen = $('screen-record');
        var textEl = $q('.record-loading-text', screen);
        var barFill = $q('.record-loading .progress-bar-fill', screen);
        var idx = 0;
        var total = RECORD_MESSAGES.length;
        var interval = trackInterval(setInterval(function() {
            if (idx < total) {
                textEl.textContent = RECORD_MESSAGES[idx];
                barFill.style.width = Math.round(((idx + 1) / total) * 100) + '%';
                idx++;
            } else {
                clearInterval(interval);
                trackTimeout(setTimeout(function() {
                    var loading = $q('.record-loading', screen);
                    var result = $q('.record-result', screen);
                    loading.classList.add('hidden');
                    result.classList.remove('hidden');
                    var happyFill = $q('.happiness-bar .progress-bar-fill', screen);
                    if (happyFill) {
                        happyFill.style.width = '0%';
                        setTimeout(function() { happyFill.style.width = '100%'; }, 100);
                    }
                }, 500));
            }
        }, 1000));
    }
};

// ==================== VIDEO PRELOADER ====================
var preloadedVideo = null;

function preloadVideo() {
    if (preloadedVideo) return; // Already preloading
    if (!state.mediaDetected || (state.mediaDetected !== 'mp4' && state.mediaDetected !== 'webm')) return;
    preloadedVideo = document.createElement('video');
    preloadedVideo.setAttribute('preload', 'auto');
    preloadedVideo.setAttribute('playsinline', '');
    preloadedVideo.setAttribute('webkit-playsinline', '');
    preloadedVideo.playsInline = true;
    preloadedVideo.preload = 'auto';
    var source = document.createElement('source');
    source.src = 'images/final-meme.' + state.mediaDetected;
    source.type = 'video/' + state.mediaDetected;
    preloadedVideo.appendChild(source);
    preloadedVideo.load();
}

// ==================== MEME_SCREEN ====================
states.MEME_SCREEN = {
    activeVideo: null,
    enter: function() {
        switchScreen('screen-meme');
        this.renderMedia();
    },
    render: function() {},
    exit: function() {
        // Stop video immediately when leaving this screen
        if (this.activeVideo) {
            this.activeVideo.pause();
            this.activeVideo.currentTime = 0;
            this.activeVideo.removeAttribute('src');
            this.activeVideo.load(); // Forces release of media resources
            this.activeVideo = null;
        }
        // Clear the container
        var screen = $('screen-meme');
        var container = $q('.meme-container', screen);
        if (container) container.textContent = '';
    },
    renderMedia: function() {
        var screen = $('screen-meme');
        var container = $q('.meme-container', screen);
        container.textContent = '';
        if (state.mediaDetected === 'mp4' || state.mediaDetected === 'webm') {
            var video;
            // Use preloaded video if available
            if (preloadedVideo) {
                video = preloadedVideo;
                preloadedVideo = null;
            } else {
                video = document.createElement('video');
                var source = document.createElement('source');
                source.src = 'images/final-meme.' + state.mediaDetected;
                source.type = 'video/' + state.mediaDetected;
                video.appendChild(source);
            }
            // Set playback attributes
            video.setAttribute('autoplay', '');
            video.setAttribute('loop', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('controls', '');
            // Properties
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.controls = true;
            video.muted = false;
            video.style.maxWidth = '100%';
            video.style.width = '100%';
            video.style.borderRadius = '12px';
            video.style.display = 'block';
            container.appendChild(video);
            this.activeVideo = video;
            // Try to play with audio (works because user just clicked NEXT button)
            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(function() {
                    // If browser blocks unmuted autoplay, start muted then unmute
                    video.muted = true;
                    video.play().then(function() {
                        video.muted = false;
                    }).catch(function() {});
                });
            }
        } else if (state.mediaDetected === 'gif' || state.mediaDetected === 'jpg') {
            var img = document.createElement('img');
            img.src = 'images/final-meme.' + state.mediaDetected;
            img.alt = 'Meme for 1/5 Footiya';
            img.style.maxWidth = '100%';
            img.style.width = '100%';
            img.style.borderRadius = '12px';
            img.style.display = 'block';
            container.appendChild(img);
        }
    }
};

// ==================== MEMORY_SCREEN ====================
states.MEMORY_SCREEN = {
    foundImages: [],
    enter: function() {
        switchScreen('screen-memory');
        this.renderGallery();
    },
    render: function() {},
    exit: function() {},
    renderGallery: function() {
        var screen = $('screen-memory');
        var grid = $q('.memory-grid', screen);
        grid.textContent = '';
        for (var i = 0; i < this.foundImages.length; i++) {
            var img = document.createElement('img');
            img.src = this.foundImages[i];
            img.alt = 'Memory with 1/5 Footiya';
            img.style.maxWidth = '100%';
            img.style.borderRadius = '12px';
            grid.appendChild(img);
        }
    }
};

// ==================== CASE_CLOSED_SCREEN ====================
states.CASE_CLOSED_SCREEN = {
    enter: function() { switchScreen('screen-case-closed'); },
    render: function() {},
    exit: function() {}
};

// ==================== MEDIA DETECTION ====================
function detectMedia() {
    var formats = ['mp4', 'webm', 'gif', 'jpg'];
    var idx = 0;
    function tryNext() {
        if (idx >= formats.length) {
            state.mediaDetected = null;
            return;
        }
        var fmt = formats[idx];
        var url = 'images/final-meme.' + fmt;
        // Use fetch HEAD to check existence - works reliably on all platforms
        fetch(url, { method: 'HEAD' }).then(function(response) {
            if (response.ok) {
                state.mediaDetected = fmt;
            } else {
                idx++;
                tryNext();
            }
        }).catch(function() {
            idx++;
            tryNext();
        });
    }
    tryNext();
}

function detectMemories() {
    var found = [];
    var checked = 0;
    for (var i = 1; i <= 5; i++) {
        (function(index) {
            var img = new Image();
            img.src = 'images/memories/memory' + index + '.jpg';
            img.addEventListener('load', function() {
                found.push(img.src);
                state.memoryGalleryDetected = true;
                states.MEMORY_SCREEN.foundImages = found;
                checked++;
            });
            img.addEventListener('error', function() {
                checked++;
            });
        })(i);
    }
}

// ==================== NO BUTTON ESCAPE ====================
function setupNoButtonEscape() {
    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isMobile) {
        document.addEventListener('mousemove', function(e) {
            if (state.currentScreen !== 'NO_FLOW') return;
            var btn = $('btn-no-flow-no');
            if (!btn) return;
            var rect = btn.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var dx = e.clientX - cx;
            var dy = e.clientY - cy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                var angle = Math.atan2(dy, dx);
                var newX = rect.left - Math.cos(angle) * 120;
                var newY = rect.top - Math.sin(angle) * 120;
                var maxX = window.innerWidth - rect.width - 10;
                var maxY = window.innerHeight - rect.height - 10;
                newX = Math.max(10, Math.min(maxX, newX));
                newY = Math.max(10, Math.min(maxY, newY));
                btn.classList.add('escaping');
                btn.style.position = 'fixed';
                btn.style.left = newX + 'px';
                btn.style.top = newY + 'px';
                btn.style.zIndex = '9999';
                btn.style.margin = '0';
            }
        });
    } else {
        document.addEventListener('touchstart', function(e) {
            if (state.currentScreen !== 'NO_FLOW') return;
            var btn = $('btn-no-flow-no');
            if (!btn) return;
            var touch = e.touches[0];
            var rect = btn.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var dx = touch.clientX - cx;
            var dy = touch.clientY - cy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                var newX = Math.random() * (window.innerWidth - rect.width - 20) + 10;
                var newY = Math.random() * (window.innerHeight - rect.height - 20) + 10;
                btn.classList.add('escaping');
                btn.style.position = 'fixed';
                btn.style.left = newX + 'px';
                btn.style.top = newY + 'px';
                btn.style.zIndex = '9999';
                btn.style.margin = '0';
            }
        }, { passive: true });
    }
}

// ==================== BACKGROUND PARTICLES ====================
function createParticles() {
    var container = $('bg-particles');
    if (!container) return;
    for (var i = 0; i < 30; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(p);
    }
}

// ==================== EVENT LISTENERS ====================
function initEvents() {
    // SCAN_SCREEN: tap anywhere
    var scanScreen = $('screen-scan');
    if (scanScreen) {
        scanScreen.addEventListener('click', function() {
            if (state.currentScreen === 'SCAN_SCREEN') {
                transition('ANGER_SCAN');
            }
        });
    }

    // ANGER_SCAN: Continue
    var btnAngerContinue = $('btn-anger-continue');
    if (btnAngerContinue) {
        btnAngerContinue.addEventListener('click', function() {
            transition('MAIN_APOLOGY');
        });
    }

    // MAIN_APOLOGY: YES / NO
    var btnMainYes = $('btn-main-yes');
    if (btnMainYes) {
        btnMainYes.addEventListener('click', function() {
            state.yesCount = 0;
            transition('YES_FLOW');
        });
    }
    var btnMainNo = $('btn-main-no');
    if (btnMainNo) {
        btnMainNo.addEventListener('click', function() {
            state.noCount++;
            transition('NO_FLOW');
        });
    }

    // YES_FLOW: YES / NO
    var btnYesYes = $('btn-yes-flow-yes');
    if (btnYesYes) {
        btnYesYes.addEventListener('click', function() {
            states.YES_FLOW.showCompliment();
        });
    }
    var btnYesNo = $('btn-yes-flow-no');
    if (btnYesNo) {
        btnYesNo.addEventListener('click', function() {
            state.noCount++;
            transition('NO_FLOW');
        });
    }

    // NO_FLOW: YES / NO
    var btnNoYes = $('btn-no-flow-yes');
    if (btnNoYes) {
        btnNoYes.addEventListener('click', function() {
            transition('YES_FLOW');
        });
    }
    var btnNoNo = $('btn-no-flow-no');
    if (btnNoNo) {
        btnNoNo.addEventListener('click', function() {
            state.noCount++;
            if (state.noCount >= 12) {
                transition('ADVANCED_BROTHER_PROTOCOL');
            } else {
                states.NO_FLOW.render();
                states.NO_FLOW.resetNoButton();
            }
        });
    }

    // ADVANCED PROTOCOL buttons
    var btnProtocolYes = $('btn-protocol-yes');
    if (btnProtocolYes) {
        btnProtocolYes.addEventListener('click', function() {
            transition('YES_FLOW');
        });
    }
    var btnProtocolNo = $('btn-protocol-no');
    if (btnProtocolNo) {
        btnProtocolNo.addEventListener('click', function() {
            states.ADVANCED_BROTHER_PROTOCOL.showPhase3();
        });
    }
    var btnProtocolContinue = $('btn-protocol-continue');
    if (btnProtocolContinue) {
        btnProtocolContinue.addEventListener('click', function() {
            transition('YES_FLOW');
        });
    }
    var btnProtocolStillBad = $('btn-protocol-still-bad');
    if (btnProtocolStillBad) {
        btnProtocolStillBad.addEventListener('click', function() {
            states.ADVANCED_BROTHER_PROTOCOL.showPhase4();
        });
    }

    // SUCCESS: Accept
    var btnSuccessAccept = $('btn-success-accept');
    if (btnSuccessAccept) {
        btnSuccessAccept.addEventListener('click', function() {
            transition('SHAYARI_SCREEN');
        });
    }

    // SHAYARI: Next
    var btnShayariNext = $('btn-shayari-next');
    if (btnShayariNext) {
        btnShayariNext.addEventListener('click', function() {
            transition('RECORD_SCREEN');
        });
    }

    // RECORD: Next
    var btnRecordNext = $('btn-record-next');
    if (btnRecordNext) {
        btnRecordNext.addEventListener('click', function() {
            if (state.mediaDetected) {
                transition('MEME_SCREEN');
            } else if (state.memoryGalleryDetected) {
                transition('MEMORY_SCREEN');
            } else {
                transition('CASE_CLOSED_SCREEN');
            }
        });
    }

    // MEME: Next
    var btnMemeNext = $('btn-meme-next');
    if (btnMemeNext) {
        btnMemeNext.addEventListener('click', function() {
            if (state.memoryGalleryDetected) {
                transition('MEMORY_SCREEN');
            } else {
                transition('CASE_CLOSED_SCREEN');
            }
        });
    }

    // MEMORY: Next
    var btnMemoryNext = $('btn-memory-next');
    if (btnMemoryNext) {
        btnMemoryNext.addEventListener('click', function() {
            transition('CASE_CLOSED_SCREEN');
        });
    }

    // TEST MODE: T key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'T' || e.key === 't') {
            state.yesCount = 10;
            var oldState = states[state.currentScreen];
            if (oldState && oldState.exit) oldState.exit();
            clearAllTimers();
            state.currentScreen = 'SUCCESS_SCREEN';
            states.SUCCESS_SCREEN.skipToSuccess();
        }
    });
}

// ==================== INITIALIZATION ====================
function init() {
    createParticles();
    detectMedia();
    detectMemories();
    setupNoButtonEscape();
    initEvents();
    transition('SCAN_SCREEN');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})();
