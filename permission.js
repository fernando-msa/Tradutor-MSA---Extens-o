document.getElementById('micBtn').addEventListener('click', async () => {
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    const btn = document.getElementById('micBtn');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Permission granted
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        btn.style.display = 'none';

        // Stop the tracks to release the mic
        stream.getTracks().forEach(track => track.stop());

        // Optional: Close tab after a delay
        setTimeout(() => {
            window.close();
        }, 2000);

    } catch (err) {
        console.error("Mic Error:", err);
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        btn.textContent = 'Tentar Novamente';
    }
});
