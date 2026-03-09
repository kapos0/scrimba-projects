document.addEventListener("DOMContentLoaded", (event) => {
    const textarea = document.getElementById("noteInput");
    const preview = document.getElementById("notePreview");
    const previewBtn = document.getElementById("previewBtn");
    const toggleBtnEl = document.getElementById("toggleBtn");

    let isPreview = false;

    toggleBtnEl.addEventListener("click", () =>
        document.getElementById("notesSidebar").classList.toggle("collapsed"),
    );
    previewBtn.addEventListener("click", () => {
        if (!isPreview) {
            const markdownText = textarea.value;

            preview.innerHTML = marked.parse(markdownText);

            textarea.classList.add("d-none");
            preview.classList.remove("d-none");

            previewBtn.textContent = "Edit";
            isPreview = true;
        } else {
            preview.classList.add("d-none");
            textarea.classList.remove("d-none");

            previewBtn.textContent = "Preview";
            isPreview = false;
        }
    });
});
