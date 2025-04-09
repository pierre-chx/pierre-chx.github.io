function load_md(filename, elementId) {
    fetch(filename)
        .then(response => response.text())
        .then(markdown => {
            let converter = new showdown.Converter({
                ghCompatibleHeaderId: true,
                ghCodeBlocks: true, // Enables GitHub-style code blocks
                tables: true
            });

            let htmlContent = converter.makeHtml(markdown);
            document.getElementById(elementId).innerHTML = htmlContent;

            // Apply syntax highlighting
            hljs.highlightAll();

            // Add copy button to each code block
            document.querySelectorAll("pre code").forEach((codeBlock) => {
                let pre = codeBlock.parentElement;

                // Create copy button
                let button = document.createElement("button");
                button.className = "copy-btn";
                button.innerText = "Copy";

                // Copy to clipboard when clicked
                button.addEventListener("click", () => {
                    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                        button.innerText = "Copied!";
                        setTimeout(() => button.innerText = "Copy", 2000);
                    });
                });

                // Attach button to the pre block
                pre.style.position = "relative";
                pre.appendChild(button);
            });
        })
        .catch(error => console.error("Error loading " + filename + ":", error));
}


function load_part(element) {
    let text = element.textContent.replace(/\s+/g, "").toLowerCase(); // Get the text and remove extra spaces
    load_md(text+".md", "content");
}


// Function to trigger loading of Markdown when DOM is fully loaded
function loadDOM_md(filename, elementId) {
    document.addEventListener("DOMContentLoaded", function () {
        load_md(filename, elementId);
    });
}
