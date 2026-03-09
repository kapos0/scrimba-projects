document.addEventListener("DOMContentLoaded", function (event) {
    const sendBtnEl = document.getElementById("sendBtn");
    const userInputEl = document.getElementById("userInput");
    const modelSelectEL = document.getElementById("model-select");
    const aiContainerEl = document.getElementById("aiContainer");
    sendBtnEl.addEventListener("click", async () => {
        const userPrompt = userInputEl.value.trim();
        const userEl = document.createElement("div");
        userEl.classList.add("usr-msg", "msg");
        userEl.textContent = userPrompt;
        aiContainerEl.appendChild(userEl);
        userInputEl.value = "";
        try {
            const response = await fetch("/api/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: modelSelectEL.value,
                    userPrompt: userPrompt,
                }),
            });
            if (!response.ok)
                throw new Error(`Response status: ${response.status}`);

            const data = await response.json();
            const assistantAnswer = data.assistantAnswer;
            const aiEl = document.createElement("div");
            aiEl.classList.add("assistant-msg", "msg");
            const htmlContent = marked.parse(assistantAnswer);
            aiEl.innerHTML = DOMPurify.sanitize(htmlContent);
            aiContainerEl.appendChild(aiEl);
        } catch (error) {
            console.error(error.message);
        }
    });
});
