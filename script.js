/* ============================================
   Operation Maaf Karo 1/5 Footiya - Script
   Security: No eval(), no inline handlers,
   all events via addEventListener.
   No cookies, tracking, analytics, or API keys.
   ============================================ */

(function () {
    'use strict';

    // Security: Strict mode enabled, IIFE to avoid global scope pollution

    // ==================== STATE ====================
    var state = {
        currentScreen: 'screen-fingerprint',
        yesLevel: 0,
        noCount: 0,
        angerLevel: 0.5,
        complimentsShown: [],
        loadingInterval: null
    };

    // ==================== CONSTANTS ====================
    var YES_QUESTIONS = [
        'Thoda sa maaf kiya?',
        'Pakka?',
        'Sach mein?',
        '100% sure?',
        'No takebacks?',
        'Still sure?',
        'Very sure?',
        'Absolutely sure?',
        'Officially?',
        'Final confirmation?'
    ];

    var LOADING_MESSAGES = [
        'Detecting 1/5 Footiya...',
        'Scanning anger level...',
        'Analyzing sibling damage...',
        'Searching forgiveness database...',
        'Activating Brother Apology Mode...',
        'Loading Cute Sister Protocol...'
    ];

    var COMPLIMENTS = [
        'You are the sweetest 1/5 Footiya in the world!',
        '1/5 Footiya, you have a heart of gold!',
        'The world is better because 1/5 Footiya exists!',
        '1/5 Footiya, your smile can light up any room!',
        'No one is as awesome as 1/5 Footiya!',
        '1/5 Footiya, you deserve all the happiness!',
        'Being siblings with 1/5 Footiya is a blessing!',
        '1/5 Footiya is officially the best sister!',
        'If kindness had a name, it would be 1/5 Footiya!',
        '1/5 Footiya, you make everything better!',
        'The universe created 1/5 Footiya for greatness!',
        '1/5 Footiya has the cutest angry face ever!'
    ];

    var NO_MESSAGES = [
        'Really? You are not going to forgive?',
        'Think again 1/5 Footiya...',
        'Bhaiya is getting sad...',
        'Are you really that angry 1/5 Footiya?',
        'Come on, give bhaiya one chance!',
        'Please 1/5 Footiya, reconsider!',
        'Your bhaiya is crying inside!',
        'The NO button does not want to be clicked!',
        '1/5 Footiya, have mercy!',
        'Even the button is running away from you!',
        'Please please please 1/5 Footiya!',
        'Last chance to be nice...'
    ];

    var ADVANCED_LOADING_MESSAGES = [
        'Activating Advanced Protocol...',
        'Loading Emergency Bhaiya Defense...',
        'Searching for mercy in 1/5 Footiya...',
        'Running Last Resort Algorithm...'
    ];

    var SUCCESS_LOADING_MESSAGES = [
        'Recording official forgiveness...',
        'Updating sibling database...',
        'Notifying happiness department...',
        'Generating celebration...',
        'Sealing the deal forever...'
    ];

    var FINAL_LOADING_MESSAGES = [
        'Creating permanent record...',
        'Encrypting forgiveness certificate...',
        'Saving to cloud of love...',
        'Finalizing 1/5 Footiya record...'
    ];

    // ==================== UTILITY FUNCTIONS ====================

    function getElement(id) {
        return document.getElementById(id);
    }

    function showScreen(screenId) {
        var screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen) {
            screen.classList.remove('active');
        });
        var target = getElement(screenId);
        if (target) {
            // Small delay for transition effect
            setTimeout(function () {
                target.classList.add('active');
            }, 50);
        }
        state.currentScreen = screenId;
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomCompliment() {
        // Try to show a compliment not yet shown
        var available = COMPLIMENTS.filter(function (c) {
            return state.complimentsShown.indexOf(c) === -1;
        });
        if (available.length === 0) {
            state.complimentsShown = [];
            available = COMPLIMENTS.slice();
        }
        var chosen = getRandomItem(available);
        state.complimentsShown.push(chosen);
        return chosen;
    }

    function getAngerColor(level) {
        if (level <= 1) return 'var(--anger-green)';
        if (level <= 2) return 'var(--anger-yellow)';
        if (level <= 3.5) return 'var(--anger-orange)';
        return 'var(--anger-red)';
    }

    // ==================== BACKGROUND EFFECTS ====================

    function createStars() {
        var container = getElement('floating-stars');
        if (!container) return;
        for (var i = 0; i < 50; i++) {
            var star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
            star.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(star);
        }
    }

    function createClouds() {
        var container = getElement('clouds');
        if (!container) return;
        for (var i = 0; i < 5; i++) {
            var cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.width = (80 + Math.random() * 120) + 'px';
            cloud.style.height = (30 + Math.random() * 40) + 'px';
            cloud.style.top = (10 + Math.random() * 60) + '%';
            cloud.style.left = '-150px';
            cloud.style.setProperty('--cloud-duration', (25 + Math.random() * 30) + 's');
            cloud.style.animationDelay = Math.random() * 20 + 's';
            container.appendChild(cloud);
        }
    }

    function createSparkles() {
        var container = getElement('sparkles');
        if (!container) return;
        container.innerHTML = '';
        for (var i = 0; i < 12; i++) {
            var sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(sparkle);
        }
    }

    function createConfetti() {
        var container = getElement('confetti-container');
        if (!container) return;
        container.innerHTML = '';
        var colors = ['#f87171', '#4ade80', '#facc15', '#60a5fa', '#f472b6', '#a78bfa', '#34d399'];
        for (var i = 0; i < 60; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.setProperty('--fall-duration', (2 + Math.random() * 3) + 's');
            piece.style.animationDelay = Math.random() * 2 + 's';
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = (6 + Math.random() * 8) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
        }
    }

    function triggerMiniConfetti() {
        // Small confetti burst for yes-level completions
        var container = getElement('confetti-container');
        if (!container) return;
        container.innerHTML = '';
        var colors = ['#4ade80', '#facc15', '#60a5fa', '#f472b6'];
        for (var i = 0; i < 20; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.setProperty('--fall-duration', (1.5 + Math.random() * 2) + 's');
            piece.style.animationDelay = Math.random() * 0.5 + 's';
            piece.style.width = (5 + Math.random() * 6) + 'px';
            piece.style.height = (5 + Math.random() * 6) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
        }
        // Clean up after animation
        setTimeout(function () {
            container.innerHTML = '';
        }, 4000);
    }

    // ==================== LOADING SCREENS ====================

    function runLoadingSequence(screenId, messages, progressId, messageId, callback) {
        showScreen(screenId);
        var index = 0;
        var progress = getElement(progressId);
        var msgEl = getElement(messageId);

        if (progress) progress.style.width = '0%';

        var interval = setInterval(function () {
            if (index < messages.length) {
                if (msgEl) {
                    // Security: use textContent not innerHTML
                    msgEl.textContent = messages[index];
                }
                if (progress) {
                    progress.style.width = ((index + 1) / messages.length * 100) + '%';
                }
                index++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 1000);

        state.loadingInterval = interval;
    }

    // ==================== SCREEN HANDLERS ====================

    // Screen 1: Fingerprint Scanner
    function handleFingerprint() {
        showScreen('screen-fingerprint');
    }

    function onFingerprintTap() {
        runLoadingSequence(
            'screen-loading',
            LOADING_MESSAGES,
            'loading-progress',
            'loading-message',
            function () {
                showScreen('screen-anger-detect');
                var fill = getElement('anger-fill-detect');
                if (fill) {
                    fill.style.width = '10%';
                    fill.style.background = 'var(--anger-green)';
                }
                var val = getElement('anger-value-detect');
                if (val) {
                    // Security: textContent used
                    val.textContent = '0.5/5 Footiya';
                }
            }
        );
    }

    // Screen 3: Continue to Apology
    function onContinueDetect() {
        showScreen('screen-apology');
    }

    // Main Apology: YES
    function onMainYes() {
        state.yesLevel = 0;
        state.noCount = 0;
        state.angerLevel = 0.5;
        showYesLevel();
    }

    // Main Apology: NO
    function onMainNo() {
        state.noCount = 1;
        state.angerLevel = 0.5;
        showNoFlow();
    }

    // ==================== YES FLOW ====================

    function showYesLevel() {
        if (state.yesLevel >= 10) {
            // SUCCESS - All 10 confirmed
            runLoadingSequence(
                'screen-success-loading',
                SUCCESS_LOADING_MESSAGES,
                'success-loading-progress',
                'success-loading-message',
                function () {
                    showScreen('screen-celebration');
                    createConfetti();
                }
            );
            return;
        }
        var question = getElement('yes-question');
        var level = getElement('yes-level');
        if (question) question.textContent = YES_QUESTIONS[state.yesLevel];
        if (level) level.textContent = 'Level ' + (state.yesLevel + 1) + '/10';
        showScreen('screen-yes-flow');
    }

    function onYesConfirm() {
        state.yesLevel++;
        triggerMiniConfetti();
        // Show compliment card
        var complimentText = getElement('compliment-text');
        if (complimentText) complimentText.textContent = getRandomCompliment();
        createSparkles();
        showScreen('screen-compliment');
        // After 2 seconds, proceed to next level
        setTimeout(function () {
            showYesLevel();
        }, 2000);
    }

    function onYesDeny() {
        // If user says NO in yes-flow, go to no flow
        state.noCount++;
        state.angerLevel = Math.min(4.5, state.angerLevel + 1);
        showNoFlow();
    }

    // ==================== NO FLOW ====================

    function showNoFlow() {
        if (state.noCount > 12) {
            // Trigger Advanced Protocol
            runLoadingSequence(
                'screen-advanced-loading',
                ADVANCED_LOADING_MESSAGES,
                'advanced-loading-progress',
                'advanced-loading-message',
                function () {
                    showScreen('screen-advanced');
                }
            );
            return;
        }

        var emoji = getElement('no-emoji');
        var msg = getElement('no-message');
        var fill = getElement('anger-fill-no');
        var val = getElement('anger-value-no');

        // Calculate anger - increases with each NO
        var angerLevels = [0.5, 1.5, 2.5, 3.5, 4.5];
        var angerIndex = Math.min(state.noCount - 1, angerLevels.length - 1);
        state.angerLevel = angerLevels[angerIndex];

        var percentage = (state.angerLevel / 5) * 100;
        var color = getAngerColor(state.angerLevel);

        if (fill) {
            fill.style.width = percentage + '%';
            fill.style.background = color;
        }
        if (val) val.textContent = state.angerLevel + '/5';
        if (msg) msg.textContent = NO_MESSAGES[Math.min(state.noCount - 1, NO_MESSAGES.length - 1)];

        // Change emoji based on anger
        if (emoji) {
            if (state.angerLevel <= 1) emoji.textContent = '\u{1F612}';
            else if (state.angerLevel <= 2) emoji.textContent = '\u{1F620}';
            else if (state.angerLevel <= 3.5) emoji.textContent = '\u{1F621}';
            else emoji.textContent = '\u{1F4A2}';
        }

        showScreen('screen-no-flow');
    }

    function onNoAccept() {
        // User clicked YES in no-flow, go to yes flow
        showYesLevel();
    }

    function onNoReject() {
        state.noCount++;
        state.angerLevel = Math.min(4.5, state.angerLevel + 1);
        showNoFlow();
    }

    // ==================== ADVANCED PROTOCOL ====================

    function onBhaiyaGood() {
        // Return to yes flow
        showYesLevel();
    }

    function onBhaiyaBad() {
        showScreen('screen-heartbreak');
    }

    function onOkayContinue() {
        showYesLevel();
    }

    function onStillBad() {
        // Portal animation, then restart
        showScreen('screen-portal');
        setTimeout(function () {
            // Reset state
            state.yesLevel = 0;
            state.noCount = 0;
            state.angerLevel = 0.5;
            showScreen('screen-fingerprint');
        }, 3000);
    }

    // ==================== POST-CELEBRATION FLOW ====================

    function onToShayari() {
        showScreen('screen-shayari');
    }

    function onConfirmRecord() {
        runLoadingSequence(
            'screen-final-loading',
            FINAL_LOADING_MESSAGES,
            'final-loading-progress',
            'final-loading-message',
            function () {
                showScreen('screen-final-record');
                // Animate progress bar to 100%
                var bar = getElement('final-progress-bar');
                if (bar) {
                    bar.style.width = '0%';
                    setTimeout(function () {
                        bar.style.width = '100%';
                    }, 100);
                }
            }
        );
    }

    function onToMeme() {
        showScreen('screen-meme');
        loadMeme();
    }

    function onToGallery() {
        showScreen('screen-gallery');
        loadGallery();
    }

    function onRestart() {
        state.yesLevel = 0;
        state.noCount = 0;
        state.angerLevel = 0.5;
        state.complimentsShown = [];
        showScreen('screen-fingerprint');
    }

    // ==================== MEME LOADING ====================

    function loadMeme() {
        var container = getElement('meme-container');
        if (!container) return;

        // Security: Create img element safely, no innerHTML with user data
        var formats = ['gif', 'jpg', 'png', 'webp'];
        var loaded = false;

        function tryFormat(index) {
            if (index >= formats.length) {
                // Show placeholder - Security: use textContent
                container.innerHTML = '';
                var placeholder = document.createElement('div');
                placeholder.className = 'meme-placeholder';
                var icon = document.createElement('span');
                icon.textContent = '\u{1F3AC}';
                var text = document.createElement('p');
                text.textContent = 'Add your meme to images/final-meme.jpg';
                placeholder.appendChild(icon);
                placeholder.appendChild(text);
                container.appendChild(placeholder);
                return;
            }

            var img = document.createElement('img');
            img.alt = 'Final Meme for 1/5 Footiya';
            img.src = 'images/final-meme.' + formats[index];

            img.addEventListener('load', function () {
                if (!loaded) {
                    loaded = true;
                    container.innerHTML = '';
                    container.appendChild(img);
                }
            });

            img.addEventListener('error', function () {
                if (!loaded) {
                    tryFormat(index + 1);
                }
            });
        }

        tryFormat(0);
    }

    // ==================== MEMORY GALLERY ====================

    function loadGallery() {
        var grid = getElement('gallery-grid');
        if (!grid) return;
        grid.innerHTML = '';

        for (var i = 1; i <= 5; i++) {
            var item = document.createElement('div');
            item.className = 'gallery-item';

            var img = document.createElement('img');
            img.alt = 'Memory ' + i + ' with 1/5 Footiya';
            img.src = 'images/memory' + i + '.jpg';

            // Create closure for error handling
            (function (imgEl, itemEl, idx) {
                imgEl.addEventListener('error', function () {
                    // Show placeholder instead
                    var placeholder = document.createElement('div');
                    placeholder.className = 'gallery-placeholder';
                    placeholder.textContent = '\u{1F4F7}';
                    itemEl.replaceChild(placeholder, imgEl);
                });
            })(img, item, i);

            item.appendChild(img);

            // Security: contenteditable for caption editing, no script injection risk
            // since we use textContent for initial value
            var caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.setAttribute('contenteditable', 'true');
            caption.textContent = 'Memory ' + i + ' - Click to edit caption';
            item.appendChild(caption);

            grid.appendChild(item);
        }
    }

    // ==================== NO BUTTON ESCAPE LOGIC ====================

    function setupNoButtonEscape() {
        var noBtn = getElement('btn-no-reject');
        if (!noBtn) return;

        var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isMobile) {
            // Desktop: mouse proximity detection
            document.addEventListener('mousemove', function (e) {
                if (state.currentScreen !== 'screen-no-flow') return;
                var btn = getElement('btn-no-reject');
                if (!btn) return;

                var rect = btn.getBoundingClientRect();
                var btnCenterX = rect.left + rect.width / 2;
                var btnCenterY = rect.top + rect.height / 2;
                var distX = e.clientX - btnCenterX;
                var distY = e.clientY - btnCenterY;
                var distance = Math.sqrt(distX * distX + distY * distY);

                // If cursor is within 80px of the button, move it away
                if (distance < 80) {
                    var moveX = 0;
                    var moveY = 0;

                    // Move away from cursor
                    if (distX !== 0 || distY !== 0) {
                        var angle = Math.atan2(distY, distX);
                        moveX = -Math.cos(angle) * 120;
                        moveY = -Math.sin(angle) * 120;
                    } else {
                        moveX = (Math.random() - 0.5) * 200;
                        moveY = (Math.random() - 0.5) * 200;
                    }

                    // Keep button within viewport
                    var newLeft = rect.left + moveX;
                    var newTop = rect.top + moveY;
                    var maxX = window.innerWidth - rect.width - 10;
                    var maxY = window.innerHeight - rect.height - 10;
                    newLeft = Math.max(10, Math.min(maxX, newLeft));
                    newTop = Math.max(10, Math.min(maxY, newTop));

                    // Calculate transform from original position
                    var origRect = btn.parentElement.getBoundingClientRect();
                    var origLeft = origRect.left + origRect.width / 2 - rect.width / 2;
                    var origTop = origRect.top + origRect.height - rect.height;

                    btn.style.position = 'fixed';
                    btn.style.left = newLeft + 'px';
                    btn.style.top = newTop + 'px';
                    btn.style.zIndex = '50';
                    btn.style.margin = '0';
                }
            });
        } else {
            // Mobile: jump on touchstart near button
            document.addEventListener('touchstart', function (e) {
                if (state.currentScreen !== 'screen-no-flow') return;
                var btn = getElement('btn-no-reject');
                if (!btn) return;

                var touch = e.touches[0];
                var rect = btn.getBoundingClientRect();
                var btnCenterX = rect.left + rect.width / 2;
                var btnCenterY = rect.top + rect.height / 2;
                var distX = touch.clientX - btnCenterX;
                var distY = touch.clientY - btnCenterY;
                var distance = Math.sqrt(distX * distX + distY * distY);

                // If touch is within 60px, jump the button
                if (distance < 60) {
                    var newX = Math.random() * (window.innerWidth - rect.width - 20) + 10;
                    var newY = Math.random() * (window.innerHeight - rect.height - 20) + 10;

                    btn.style.position = 'fixed';
                    btn.style.left = newX + 'px';
                    btn.style.top = newY + 'px';
                    btn.style.zIndex = '50';
                    btn.style.margin = '0';
                }
            }, { passive: true });
        }
    }

    // Reset NO button position when entering no-flow screen
    function resetNoButton() {
        var btn = getElement('btn-no-reject');
        if (btn) {
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top = '';
            btn.style.zIndex = '';
            btn.style.margin = '';
        }
    }

    // ==================== EVENT LISTENERS ====================

    function initEventListeners() {
        // Screen 1: Fingerprint - tap anywhere
        var fpScreen = getElement('screen-fingerprint');
        if (fpScreen) {
            fpScreen.addEventListener('click', onFingerprintTap);
        }

        // Screen 3: Continue button
        var btnContinue = getElement('btn-continue-detect');
        if (btnContinue) {
            btnContinue.addEventListener('click', onContinueDetect);
        }

        // Main Apology: YES/NO
        var btnYes = getElement('btn-yes');
        if (btnYes) {
            btnYes.addEventListener('click', onMainYes);
        }

        var btnNo = getElement('btn-no');
        if (btnNo) {
            btnNo.addEventListener('click', onMainNo);
        }

        // Yes Flow: Confirm / Deny
        var btnYesConfirm = getElement('btn-yes-confirm');
        if (btnYesConfirm) {
            btnYesConfirm.addEventListener('click', onYesConfirm);
        }

        var btnYesDeny = getElement('btn-yes-deny');
        if (btnYesDeny) {
            btnYesDeny.addEventListener('click', onYesDeny);
        }

        // No Flow: Accept / Reject
        var btnNoAccept = getElement('btn-no-accept');
        if (btnNoAccept) {
            btnNoAccept.addEventListener('click', onNoAccept);
        }

        var btnNoReject = getElement('btn-no-reject');
        if (btnNoReject) {
            btnNoReject.addEventListener('click', function () {
                onNoReject();
                resetNoButton();
            });
        }

        // Advanced Protocol
        var btnBhaiyaGood = getElement('btn-bhaiya-good');
        if (btnBhaiyaGood) {
            btnBhaiyaGood.addEventListener('click', onBhaiyaGood);
        }

        var btnBhaiyaBad = getElement('btn-bhaiya-bad');
        if (btnBhaiyaBad) {
            btnBhaiyaBad.addEventListener('click', onBhaiyaBad);
        }

        // Heartbreak
        var btnOkayContinue = getElement('btn-okay-continue');
        if (btnOkayContinue) {
            btnOkayContinue.addEventListener('click', onOkayContinue);
        }

        var btnStillBad = getElement('btn-still-bad');
        if (btnStillBad) {
            btnStillBad.addEventListener('click', onStillBad);
        }

        // Celebration -> Shayari
        var btnToShayari = getElement('btn-to-shayari');
        if (btnToShayari) {
            btnToShayari.addEventListener('click', onToShayari);
        }

        // Shayari -> Final Record
        var btnConfirmRecord = getElement('btn-confirm-record');
        if (btnConfirmRecord) {
            btnConfirmRecord.addEventListener('click', onConfirmRecord);
        }

        // Final Record -> Meme
        var btnToMeme = getElement('btn-to-meme');
        if (btnToMeme) {
            btnToMeme.addEventListener('click', onToMeme);
        }

        // Meme -> Gallery
        var btnToGallery = getElement('btn-to-gallery');
        if (btnToGallery) {
            btnToGallery.addEventListener('click', onToGallery);
        }

        // Gallery -> Restart
        var btnRestart = getElement('btn-restart');
        if (btnRestart) {
            btnRestart.addEventListener('click', onRestart);
        }
    }

    // ==================== INITIALIZATION ====================

    function init() {
        createStars();
        createClouds();
        initEventListeners();
        setupNoButtonEscape();
    }

    // Security: DOMContentLoaded ensures DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
