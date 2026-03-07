// ============================================================
// HOW BROWSERS WORK — Interactive App
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavigationFlow();
    initRenderingPipeline();
    initEventLoopSimulator();
    initPerformanceDemo();
    initSmoothNav();
});

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-step, .pipeline-node, .perf-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================================
// SMOOTH NAV
// ============================================================
function initSmoothNav() {
    const nav = document.getElementById('main-nav');
    const links = nav.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                links.forEach(link => link.style.color = '');
                const activeLink = nav.querySelector(`a[href="#${section.id}"]`);
                if (activeLink) activeLink.style.color = '#00d4ff';
            }
        });
    });
}

// ============================================================
// NAVIGATION FLOW
// ============================================================
function initNavigationFlow() {
    const steps = document.querySelectorAll('.timeline-step');
    const connectors = document.querySelectorAll('.timeline-connector');
    const progressBar = document.getElementById('nav-flow-progress-bar');
    const startBtn = document.getElementById('nav-flow-start');
    const resetBtn = document.getElementById('nav-flow-reset');
    const detailPanel = document.getElementById('nav-flow-detail');

    let currentStep = -1;
    let animating = false;
    let animationTimer = null;

    function showStepDetail(index) {
        const step = steps[index];
        if (!step) return;
        const detail = step.querySelector('.step-detail');
        if (detail) {
            detailPanel.innerHTML = detail.innerHTML;
        }
    }

    function activateStep(index) {
        // Mark previous steps as completed
        steps.forEach((step, i) => {
            step.classList.remove('active');
            if (i < index) step.classList.add('completed');
            else step.classList.remove('completed');
        });

        connectors.forEach((conn, i) => {
            conn.classList.remove('active');
            if (i < index) conn.classList.add('completed');
            else conn.classList.remove('completed');
        });

        if (index < steps.length) {
            steps[index].classList.add('active');
            if (index > 0) connectors[index - 1].classList.add('active');
        }

        progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
        showStepDetail(index);
        currentStep = index;
    }

    function resetFlow() {
        clearTimeout(animationTimer);
        animating = false;
        currentStep = -1;
        steps.forEach(s => { s.classList.remove('active', 'completed'); });
        connectors.forEach(c => { c.classList.remove('active', 'completed'); });
        progressBar.style.width = '0%';
        startBtn.textContent = '▶ Start Journey';
        detailPanel.innerHTML = '<div class="detail-placeholder">👆 Click vào step hoặc nhấn "Start Journey" để xem chi tiết</div>';
    }

    function autoPlay() {
        if (currentStep >= steps.length - 1) {
            animating = false;
            startBtn.textContent = '▶ Start Journey';
            return;
        }
        activateStep(currentStep + 1);
        animationTimer = setTimeout(autoPlay, 1200);
    }

    startBtn.addEventListener('click', () => {
        if (animating) {
            clearTimeout(animationTimer);
            animating = false;
            startBtn.textContent = '▶ Continue';
            return;
        }

        if (currentStep >= steps.length - 1) resetFlow();

        animating = true;
        startBtn.textContent = '⏸ Pause';
        autoPlay();
    });

    resetBtn.addEventListener('click', resetFlow);

    // Click individual steps
    steps.forEach((step, i) => {
        step.addEventListener('click', () => {
            if (animating) return;
            activateStep(i);
        });
    });
}

// ============================================================
// RENDERING PIPELINE
// ============================================================
function initRenderingPipeline() {
    const nodes = document.querySelectorAll('.pipeline-node');
    const arrows = document.querySelectorAll('.pipeline-arrow');
    const detailPanel = document.getElementById('pipeline-detail');
    const startBtn = document.getElementById('pipeline-start');
    const resetBtn = document.getElementById('pipeline-reset');

    const nodeOrder = ['html', 'css', 'dom', 'cssom', 'render-tree', 'layout', 'paint', 'composite', 'display'];

    const details = {
        'html': {
            title: '📄 HTML',
            desc: 'Browser nhận HTML bytes từ server và bắt đầu parse.',
            code: 'Bytes → Characters → Tokens → Nodes → DOM Tree'
        },
        'css': {
            title: '🎨 CSS',
            desc: 'CSS files và inline styles cũng được parse tương tự HTML.',
            code: 'Bytes → Characters → Tokens → Nodes → CSSOM Tree'
        },
        'dom': {
            title: '🏗️ DOM Tree',
            desc: 'Document Object Model — cây biểu diễn cấu trúc HTML. Mỗi tag HTML trở thành một node trong cây.',
            code: 'Document\n├── html\n│   ├── head\n│   │   └── title → "Hello"\n│   └── body\n│       ├── h1 → "Welcome"\n│       └── p → "Hello World"'
        },
        'cssom': {
            title: '🎭 CSSOM Tree',
            desc: 'CSS Object Model — cây chứa tất cả styles, bao gồm inherited styles. CSS là render-blocking — browser KHÔNG render cho đến khi CSSOM hoàn chỉnh.',
            code: 'body { font-size: 16px }\n├── h1 { color: blue; font-weight: bold }\n└── p  { color: gray }'
        },
        'render-tree': {
            title: '🌳 Render Tree',
            desc: 'Kết hợp DOM + CSSOM. Chỉ chứa nodes hiển thị — loại bỏ <head>, <script>, display:none. Pseudo-elements (::before, ::after) ĐƯỢC thêm vào.',
            code: 'DOM + CSSOM → Render Tree\n\nLoại bỏ: <head>, <script>, display:none\nThêm vào: ::before, ::after'
        },
        'layout': {
            title: '📏 Layout (Reflow)',
            desc: 'Tính toán kích thước và vị trí chính xác (pixel) của mỗi element. Layout rất expensive — thay đổi element cha có thể trigger reflow toàn bộ cây con.',
            code: 'Mỗi element → {\n  x, y         // Vị trí\n  width, height // Kích thước\n  margin, padding, border\n}\n\nTriggers: width, height, margin, padding,\n         position, font-size, display...'
        },
        'paint': {
            title: '🖌️ Paint',
            desc: 'Vẽ các pixel thực tế theo paint layers. Tạo danh sách lệnh vẽ (paint records) cho từng element.',
            code: 'Paint Records:\n1. Vẽ background (white)\n2. Vẽ text "Welcome" (blue, bold)\n3. Vẽ text "Hello World" (gray)\n\nTriggers: color, background, box-shadow,\n         border-radius, visibility...'
        },
        'composite': {
            title: '📑 Composite',
            desc: 'Ghép các layers lại trên GPU thành frame cuối cùng. Animations dùng transform/opacity chỉ cần bước này — nhanh nhất!',
            code: 'Paint Layers → GPU Rasterization\n→ Composite → Frame → Display\n\nGPU layers cho: transform, opacity,\n  will-change, position:fixed, <video>'
        },
        'display': {
            title: '🖥️ Display',
            desc: 'Frame cuối cùng được hiển thị trên màn hình! Quá trình này lặp lại ~60 lần/giây (60 FPS) cho mỗi frame mới.',
            code: '16.67ms per frame (60 FPS)\n\nMỗi frame: Style → Layout → Paint → Composite'
        }
    };

    let currentNodeIndex = -1;
    let animating = false;
    let animTimer = null;

    function showDetail(nodeId) {
        const d = details[nodeId];
        if (!d) return;
        detailPanel.innerHTML = `<h4>${d.title}</h4><p>${d.desc}</p><pre>${d.code}</pre>`;
    }

    function activateNode(index) {
        const id = nodeOrder[index];

        nodes.forEach(n => {
            const nid = n.dataset.node;
            n.classList.remove('active');
            if (nodeOrder.indexOf(nid) < index) n.classList.add('completed');
            else n.classList.remove('completed');
        });

        const target = document.querySelector(`.pipeline-node[data-node="${id}"]`);
        if (target) {
            target.classList.add('active');
            target.classList.remove('completed');
        }

        // Activate arrows
        arrows.forEach((a, i) => {
            a.classList.toggle('active', i < index);
        });

        showDetail(id);
        currentNodeIndex = index;
    }

    function resetPipeline() {
        clearTimeout(animTimer);
        animating = false;
        currentNodeIndex = -1;
        nodes.forEach(n => n.classList.remove('active', 'completed'));
        arrows.forEach(a => a.classList.remove('active'));
        detailPanel.innerHTML = '<div class="detail-placeholder">👆 Click vào node hoặc nhấn "Animate Pipeline" để xem chi tiết</div>';
        startBtn.textContent = '▶ Animate Pipeline';
    }

    function autoAnimate() {
        if (currentNodeIndex >= nodeOrder.length - 1) {
            animating = false;
            startBtn.textContent = '▶ Animate Pipeline';
            return;
        }
        activateNode(currentNodeIndex + 1);
        animTimer = setTimeout(autoAnimate, 1500);
    }

    startBtn.addEventListener('click', () => {
        if (animating) {
            clearTimeout(animTimer);
            animating = false;
            startBtn.textContent = '▶ Continue';
            return;
        }
        if (currentNodeIndex >= nodeOrder.length - 1) resetPipeline();
        animating = true;
        startBtn.textContent = '⏸ Pause';
        autoAnimate();
    });

    resetBtn.addEventListener('click', resetPipeline);

    // Click nodes
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            if (animating) return;
            const id = node.dataset.node;
            const idx = nodeOrder.indexOf(id);
            if (idx !== -1) activateNode(idx);
        });
    });
}

// ============================================================
// EVENT LOOP SIMULATOR
// ============================================================
function initEventLoopSimulator() {
    const codeDisplay = document.getElementById('el-code-display');
    const callstack = document.querySelector('#el-callstack .el-zone-items');
    const webapis = document.querySelector('#el-webapis .el-zone-items');
    const microtaskQ = document.querySelector('#el-microtask .el-zone-items');
    const macrotaskQ = document.querySelector('#el-macrotask .el-zone-items');
    const output = document.querySelector('#el-output .el-zone-items');
    const explanation = document.getElementById('el-explanation');

    const runBtn = document.getElementById('el-run');
    const stepBtn = document.getElementById('el-step');
    const resetBtn = document.getElementById('el-reset');
    const speedInput = document.getElementById('el-speed');
    const exampleBtns = document.querySelectorAll('.el-example-btn');

    // Example definitions
    const examples = [
        {
            name: 'Basic',
            code: `console.log('1: Sync');\n\nsetTimeout(() => {\n  console.log('2: Timeout');\n}, 0);\n\nconsole.log('3: Sync');`,
            steps: [
                { action: 'push-cs', label: "console.log('1: Sync')", type: 'sync', explain: '📚 Đẩy console.log("1: Sync") vào Call Stack — thực thi ngay' },
                { action: 'output', text: '1: Sync', explain: '🖥️ In ra "1: Sync"' },
                { action: 'pop-cs', explain: '📚 Lấy console.log ra khỏi Call Stack' },
                { action: 'push-cs', label: 'setTimeout(cb, 0)', type: 'timeout', explain: '📚 Đẩy setTimeout vào Call Stack' },
                { action: 'move-webapi', label: 'Timer(0ms)', type: 'timeout', explain: '🌐 setTimeout chuyển callback sang Web API — timer 0ms bắt đầu đếm' },
                { action: 'pop-cs', explain: '📚 setTimeout trả về — lấy ra khỏi Call Stack' },
                { action: 'push-cs', label: "console.log('3: Sync')", type: 'sync', explain: '📚 Tiếp tục với console.log("3: Sync")' },
                { action: 'output', text: '3: Sync', explain: '🖥️ In ra "3: Sync"' },
                { action: 'pop-cs', explain: '📚 Lấy console.log ra khỏi Call Stack' },
                { action: 'move-macrotask', label: "cb: log('2: Timeout')", type: 'timeout', explain: '📬 Timer hết → callback chuyển vào Task Queue' },
                { action: 'clear-webapi', explain: '🌐 Web API hoàn thành' },
                { action: 'pause', explain: '🔄 Event Loop kiểm tra: Call Stack trống → lấy 1 task từ Task Queue' },
                { action: 'move-cs-from-macro', label: "console.log('2: Timeout')", type: 'timeout', explain: '📚 Callback được đẩy vào Call Stack' },
                { action: 'output', text: '2: Timeout', explain: '🖥️ In ra "2: Timeout"' },
                { action: 'pop-cs', explain: '📚 Hoàn tất!' },
            ]
        },
        {
            name: 'Promises',
            code: `console.log('A: Sync');\n\nPromise.resolve().then(() => {\n  console.log('B: Microtask');\n}).then(() => {\n  console.log('C: Microtask 2');\n});\n\nconsole.log('D: Sync');`,
            steps: [
                { action: 'push-cs', label: "console.log('A: Sync')", type: 'sync', explain: '📚 Thực thi sync code đầu tiên' },
                { action: 'output', text: 'A: Sync', explain: '🖥️ In ra "A: Sync"' },
                { action: 'pop-cs', explain: '📚 Xong console.log' },
                { action: 'push-cs', label: 'Promise.resolve().then(cb)', type: 'promise', explain: '📚 Tạo Promise — resolve ngay → callback vào Microtask Queue' },
                { action: 'add-microtask', label: "cb: log('B: Microtask')", type: 'promise', explain: '⚡ Promise.then callback vào Microtask Queue — ưu tiên cao hơn Task Queue!' },
                { action: 'pop-cs', explain: '📚 Promise trả về' },
                { action: 'push-cs', label: "console.log('D: Sync')", type: 'sync', explain: '📚 Tiếp tục sync code' },
                { action: 'output', text: 'D: Sync', explain: '🖥️ In ra "D: Sync"' },
                { action: 'pop-cs', explain: '📚 Xong console.log' },
                { action: 'pause', explain: '🔄 Call Stack trống → Event Loop drain Microtask Queue TRƯỚC' },
                { action: 'move-cs-from-micro', label: "console.log('B: Microtask')", type: 'promise', explain: '📚 Lấy microtask đầu tiên → chạy' },
                { action: 'output', text: 'B: Microtask', explain: '🖥️ In ra "B: Microtask"' },
                { action: 'add-microtask', label: "cb: log('C: Microtask 2')", type: 'promise', explain: '⚡ .then() thứ 2 vào Microtask Queue' },
                { action: 'pop-cs', explain: '📚 Xong callback' },
                { action: 'move-cs-from-micro', label: "console.log('C: Microtask 2')", type: 'promise', explain: '📚 Tiếp tục drain Microtask Queue' },
                { action: 'output', text: 'C: Microtask 2', explain: '🖥️ In ra "C: Microtask 2"' },
                { action: 'pop-cs', explain: '📚 Hoàn tất! Output: A, D, B, C — Microtask luôn chạy trước Macrotask' },
            ]
        },
        {
            name: 'Mixed',
            code: `console.log('1: Sync');\n\nsetTimeout(() => {\n  console.log('2: Timeout');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3: Promise');\n});\n\nconsole.log('4: Sync');`,
            steps: [
                { action: 'push-cs', label: "console.log('1: Sync')", type: 'sync', explain: '📚 Thực thi sync' },
                { action: 'output', text: '1: Sync', explain: '🖥️ In "1: Sync"' },
                { action: 'pop-cs', explain: '' },
                { action: 'push-cs', label: 'setTimeout(cb, 0)', type: 'timeout', explain: '📚 setTimeout — chuyển callback sang Web API' },
                { action: 'move-webapi', label: 'Timer(0ms)', type: 'timeout', explain: '🌐 Timer 0ms bắt đầu' },
                { action: 'pop-cs', explain: '' },
                { action: 'push-cs', label: 'Promise.resolve().then(cb)', type: 'promise', explain: '📚 Promise resolve → callback vào Microtask Queue' },
                { action: 'add-microtask', label: "cb: log('3: Promise')", type: 'promise', explain: '⚡ Promise.then → Microtask Queue' },
                { action: 'pop-cs', explain: '' },
                { action: 'push-cs', label: "console.log('4: Sync')", type: 'sync', explain: '📚 Thực thi sync cuối cùng' },
                { action: 'output', text: '4: Sync', explain: '🖥️ In "4: Sync"' },
                { action: 'pop-cs', explain: '' },
                { action: 'move-macrotask', label: "cb: log('2: Timeout')", type: 'timeout', explain: '📬 Timer hết → callback vào Task Queue' },
                { action: 'clear-webapi', explain: '' },
                { action: 'pause', explain: '🔄 Call Stack trống → drain Microtask Queue TRƯỚC → rồi mới Task Queue' },
                { action: 'move-cs-from-micro', label: "console.log('3: Promise')", type: 'promise', explain: '📚 Microtask ưu tiên cao hơn! Chạy trước setTimeout' },
                { action: 'output', text: '3: Promise', explain: '🖥️ In "3: Promise" — TRƯỚC "2: Timeout"!' },
                { action: 'pop-cs', explain: '📚 Microtask queue trống' },
                { action: 'pause', explain: '🔄 Microtask queue trống → lấy 1 task từ Task Queue' },
                { action: 'move-cs-from-macro', label: "console.log('2: Timeout')", type: 'timeout', explain: '📚 Cuối cùng mới đến setTimeout callback' },
                { action: 'output', text: '2: Timeout', explain: '🖥️ In "2: Timeout" — Output cuối cùng: 1, 4, 3, 2' },
                { action: 'pop-cs', explain: '📚 Hoàn tất! Sync → Microtask → Macrotask' },
            ]
        }
    ];

    let currentExample = 0;
    let stepIndex = 0;
    let running = false;
    let autoRunTimer = null;

    function selectExample(idx) {
        currentExample = idx;
        exampleBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
        codeDisplay.textContent = examples[idx].code;
        resetSimulator();
    }

    function createItem(label, type) {
        const el = document.createElement('div');
        el.className = `el-item ${type || ''}`;
        el.textContent = label;
        return el;
    }

    function clearZone(zone) {
        zone.innerHTML = '';
    }

    function resetSimulator() {
        clearTimeout(autoRunTimer);
        running = false;
        stepIndex = 0;
        clearZone(callstack);
        clearZone(webapis);
        clearZone(microtaskQ);
        clearZone(macrotaskQ);
        clearZone(output);
        explanation.innerHTML = '<p>👈 Chọn ví dụ và nhấn <strong>Run</strong> hoặc <strong>Step</strong> để bắt đầu</p>';
        codeDisplay.textContent = examples[currentExample].code;
        runBtn.textContent = '▶ Run';
    }

    function executeStep() {
        const ex = examples[currentExample];
        if (stepIndex >= ex.steps.length) {
            running = false;
            runBtn.textContent = '▶ Run';
            return false;
        }

        const step = ex.steps[stepIndex];

        switch (step.action) {
            case 'push-cs':
                callstack.prepend(createItem(step.label, step.type));
                break;
            case 'pop-cs':
                if (callstack.firstChild) {
                    callstack.firstChild.classList.add('removing');
                    setTimeout(() => callstack.firstChild?.remove(), 250);
                }
                break;
            case 'output':
                const line = document.createElement('div');
                line.className = 'output-line';
                line.textContent = `> ${step.text}`;
                output.appendChild(line);
                break;
            case 'move-webapi':
                webapis.appendChild(createItem(step.label, step.type));
                break;
            case 'clear-webapi':
                if (webapis.firstChild) {
                    webapis.firstChild.classList.add('removing');
                    setTimeout(() => webapis.firstChild?.remove(), 250);
                }
                break;
            case 'add-microtask':
                microtaskQ.appendChild(createItem(step.label, step.type));
                break;
            case 'move-macrotask':
                macrotaskQ.appendChild(createItem(step.label, step.type));
                break;
            case 'move-cs-from-micro':
                if (microtaskQ.firstChild) {
                    microtaskQ.firstChild.classList.add('removing');
                    setTimeout(() => microtaskQ.firstChild?.remove(), 250);
                }
                callstack.prepend(createItem(step.label, step.type));
                break;
            case 'move-cs-from-macro':
                if (macrotaskQ.firstChild) {
                    macrotaskQ.firstChild.classList.add('removing');
                    setTimeout(() => macrotaskQ.firstChild?.remove(), 250);
                }
                callstack.prepend(createItem(step.label, step.type));
                break;
            case 'pause':
                // Visual pause — just update explanation
                break;
        }

        if (step.explain) {
            explanation.innerHTML = `<p>${step.explain}</p>`;
        }

        stepIndex++;
        return stepIndex < ex.steps.length;
    }

    function autoRun() {
        const hasMore = executeStep();
        if (hasMore && running) {
            const speed = parseInt(speedInput.value);
            autoRunTimer = setTimeout(autoRun, speed);
        } else {
            running = false;
            runBtn.textContent = '▶ Run';
        }
    }

    runBtn.addEventListener('click', () => {
        if (running) {
            clearTimeout(autoRunTimer);
            running = false;
            runBtn.textContent = '▶ Continue';
            return;
        }

        if (stepIndex >= examples[currentExample].steps.length) {
            resetSimulator();
        }

        running = true;
        runBtn.textContent = '⏸ Pause';
        autoRun();
    });

    stepBtn.addEventListener('click', () => {
        if (running) {
            clearTimeout(autoRunTimer);
            running = false;
            runBtn.textContent = '▶ Run';
        }
        if (stepIndex >= examples[currentExample].steps.length) {
            resetSimulator();
            return;
        }
        executeStep();
    });

    resetBtn.addEventListener('click', resetSimulator);

    exampleBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => selectExample(i));
    });

    // Init first example
    selectExample(0);
}

// ============================================================
// PERFORMANCE DEMO
// ============================================================
function initPerformanceDemo() {
    const startBtn = document.getElementById('perf-start');
    const stopBtn = document.getElementById('perf-stop');
    const complexityInput = document.getElementById('perf-complexity');
    const complexityVal = document.getElementById('perf-complexity-val');
    const fpsLeft = document.getElementById('fps-left');
    const fpsTransform = document.getElementById('fps-transform');
    const boxLeft = document.getElementById('perf-box-left');
    const boxTransform = document.getElementById('perf-box-transform');
    const trackLeft = document.getElementById('perf-track-left');
    const trackTransform = document.getElementById('perf-track-transform');

    let animating = false;
    let leftRAF = null;
    let transformRAF = null;
    let stressBoxes = [];

    // FPS counter
    function createFPSCounter(display) {
        let frames = 0;
        let lastTime = performance.now();

        return function () {
            frames++;
            const now = performance.now();
            if (now - lastTime >= 500) {
                const fps = Math.round(frames / ((now - lastTime) / 1000));
                display.textContent = `${fps} FPS`;
                frames = 0;
                lastTime = now;

                // Color code
                if (fps >= 55) display.style.color = '#22c55e';
                else if (fps >= 30) display.style.color = '#f59e0b';
                else display.style.color = '#ef4444';
            }
        };
    }

    function addStressBoxes(count) {
        removeStressBoxes();
        const trackWidth = trackLeft.offsetWidth;
        const trackHeight = trackLeft.offsetHeight;

        for (let i = 0; i < count; i++) {
            // Left stress
            const lb = document.createElement('div');
            lb.className = 'stress-box left-stress';
            lb.style.top = Math.random() * (trackHeight - 8) + 'px';
            lb.style.left = Math.random() * (trackWidth - 8) + 'px';
            trackLeft.appendChild(lb);
            stressBoxes.push(lb);

            // Transform stress
            const tb = document.createElement('div');
            tb.className = 'stress-box transform-stress';
            tb.style.top = Math.random() * (trackHeight - 8) + 'px';
            tb.style.left = Math.random() * (trackWidth - 8) + 'px';
            trackTransform.appendChild(tb);
            stressBoxes.push(tb);
        }
    }

    function removeStressBoxes() {
        stressBoxes.forEach(b => b.remove());
        stressBoxes = [];
    }

    function startAnimation() {
        if (animating) return;
        animating = true;

        const complexity = parseInt(complexityInput.value);
        addStressBoxes(complexity);

        const trackWidth = trackLeft.offsetWidth - 50;
        let posLeft = 0;
        let dirLeft = 1;
        let posTransform = 0;
        let dirTransform = 1;
        const speed = 3;

        const fpsCounterLeft = createFPSCounter(fpsLeft);
        const fpsCounterTransform = createFPSCounter(fpsTransform);

        function animateLeft() {
            posLeft += speed * dirLeft;
            if (posLeft >= trackWidth || posLeft <= 0) dirLeft *= -1;

            // Use left (triggers layout)
            boxLeft.style.left = posLeft + 'px';

            // Also animate stress boxes with left to make it costly
            const leftStressBoxes = trackLeft.querySelectorAll('.stress-box');
            leftStressBoxes.forEach((box, i) => {
                box.style.left = (parseFloat(box.style.left) + Math.sin(posLeft * 0.05 + i) * 0.5) + 'px';
            });

            fpsCounterLeft();
            if (animating) leftRAF = requestAnimationFrame(animateLeft);
        }

        function animateTransform() {
            posTransform += speed * dirTransform;
            if (posTransform >= trackWidth || posTransform <= 0) dirTransform *= -1;

            // Use transform (composite only)
            boxTransform.style.transform = `translateX(${posTransform}px)`;

            // Animate stress boxes with transform
            const transformStressBoxes = trackTransform.querySelectorAll('.stress-box');
            transformStressBoxes.forEach((box, i) => {
                box.style.transform = `translateX(${Math.sin(posTransform * 0.05 + i) * 3}px)`;
            });

            fpsCounterTransform();
            if (animating) transformRAF = requestAnimationFrame(animateTransform);
        }

        leftRAF = requestAnimationFrame(animateLeft);
        transformRAF = requestAnimationFrame(animateTransform);
    }

    function stopAnimation() {
        animating = false;
        cancelAnimationFrame(leftRAF);
        cancelAnimationFrame(transformRAF);
        removeStressBoxes();
        fpsLeft.textContent = '-- FPS';
        fpsTransform.textContent = '-- FPS';
        fpsLeft.style.color = '';
        fpsTransform.style.color = '';
        boxLeft.style.left = '0px';
        boxTransform.style.transform = 'translateX(0px)';
    }

    startBtn.addEventListener('click', () => {
        if (animating) {
            stopAnimation();
            setTimeout(startAnimation, 50);
        } else {
            startAnimation();
        }
    });

    stopBtn.addEventListener('click', stopAnimation);

    complexityInput.addEventListener('input', () => {
        complexityVal.textContent = complexityInput.value;
        if (animating) {
            stopAnimation();
            setTimeout(startAnimation, 50);
        }
    });
}
