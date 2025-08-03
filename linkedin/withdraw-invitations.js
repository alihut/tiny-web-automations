// ✅ Script: LinkedIn - Auto Withdraw Invitations
// 📄 Description: Automatically withdraws all sent invitations one by one using the modal "Withdraw" button.
// ⚠️ Note: Works on LinkedIn's "Sent Invitations" page. Run in browser console.
// ⏱️ Delay is added between steps to allow for DOM updates.
// 🧠 Author: Ali Hut

(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let attempt = 0;

    while (true) {
        // Find the first visible "Withdraw" button on the page (in the list view)
        const withdrawBtn = Array.from(document.querySelectorAll('button'))
            .find(btn => btn.innerText.trim().toLowerCase() === 'withdraw');

        if (!withdrawBtn) {
            alert("✅ All connection requests have been withdrawn.");
            break;
        }

        // Click the "Withdraw" button in the list
        withdrawBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        withdrawBtn.click();
        await delay(500); // Wait for the modal to open

        // Look for the second "Withdraw" button in the modal (confirmation)
        let modalWithdrawBtn;
        for (let i = 0; i < 20; i++) {
            await delay(300);
            modalWithdrawBtn = Array.from(document.querySelectorAll('button'))
                .find(btn => btn.innerText.trim().toLowerCase() === 'withdraw' && btn.offsetWidth > 100);
            if (modalWithdrawBtn) break;
        }

        if (modalWithdrawBtn) {
            modalWithdrawBtn.click();
            console.log(`✅ Withdrawn request #${++attempt}`);
            await delay(1500); // Wait for the list to update
        } else {
            console.warn("❌ 'Withdraw' button in modal not found. Exiting.");
            break;
        }
    }
})();
