window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data.action === 'progress') {
        startProgress(data.duration, data.label);
    } else if (data.action === 'cancel') {
        cancelProgress();
    }
});

let progressInterval = null;
let progressTimeout = null;

function startProgress(duration, label) {
    const container = document.getElementById('progressbar-container');
    const fill = document.getElementById('progressbar-fill');
    const labelEl = document.getElementById('progressbar-label');
    const percentageEl = document.getElementById('progressbar-percentage');
    
    // Reset and show
    fill.style.width = '0%';
    labelEl.textContent = label || 'Processing...';
    percentageEl.textContent = '0%';
    container.classList.add('active');
    
    const startTime = Date.now();
    const updateInterval = 50; // Update every 50ms for smooth animation
    
    // Clear any existing intervals
    if (progressInterval) clearInterval(progressInterval);
    if (progressTimeout) clearTimeout(progressTimeout);
    
    // Update progress bar
    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        fill.style.width = progress + '%';
        percentageEl.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, updateInterval);
    
    // Finish after duration
    progressTimeout = setTimeout(() => {
        finishProgress();
    }, duration);
}

function cancelProgress() {
    if (progressInterval) clearInterval(progressInterval);
    if (progressTimeout) clearTimeout(progressTimeout);
    
    const container = document.getElementById('progressbar-container');
    container.classList.remove('active');
}

function finishProgress() {
    if (progressInterval) clearInterval(progressInterval);
    
    const container = document.getElementById('progressbar-container');
    const fill = document.getElementById('progressbar-fill');
    const percentageEl = document.getElementById('progressbar-percentage');
    
    // Ensure it shows 100%
    fill.style.width = '100%';
    percentageEl.textContent = '100%';
    
    // Hide after a brief delay
    setTimeout(() => {
        container.classList.remove('active');
        
        // Notify completion
        fetch(`https://${GetParentResourceName()}/FinishAction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
    }, 300);
}

function GetParentResourceName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('resource') || 'vCore-progressbar';
}