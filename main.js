// Get the serial number from the URL, e.g. index.html?serial=FE-08-150
function getSerialNumber() {
    const params = new URLSearchParams(window.location.search);
    return params.get('serial');
}

function loadHandbagDetails(serial) {
    fetch('handbags.json')
        .then(res => res.json())
        .then(data => {
            const handbag = data[serial];
            const detailsDiv = document.getElementById('detailsBlock');
            if (!handbag) {
                detailsDiv.innerHTML = `<div>Product with serial <span style="color:#d6b88a">${serial}</span> not found.</div>`;
                return;
            }
            detailsDiv.innerHTML = `
                <div><span>Model</span><strong>${handbag.model}</strong></div>
                <div><span>Serial Number</span><strong>${handbag.serial}</strong></div>
                <div><span>Material</span><strong>${handbag.material}</strong></div>
                <div><span>Collection</span><strong>${handbag.collection}</strong></div>
                <div><span>Manufactured</span><strong>${handbag.manufactured}</strong></div>
            `;
        })
        .catch(err => {
            document.getElementById('detailsBlock').innerHTML = 'Error loading certificate data.';
        });
}

// Show placeholder JS function for button (optional)
function showPassport() {
    alert('Digital Passport: Secure details available soon.');
}

const serial = getSerialNumber();
if (serial) {
    loadHandbagDetails(serial);
} else {
    document.getElementById('detailsBlock').innerHTML = 'No serial number specified in URL.';
}
