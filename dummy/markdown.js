function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseMarkdown(markdownText) {
    if (typeof markdownText !== 'string') {
        throw new Error('Input must be a string');
    }

    let lines = markdownText.split('\n');
    let htmlText = "";
    
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let match;
        if ((match = line.match(/^# (.*$)/))) {
            htmlText += `<h1 style="color: blue;">${escapeHtml(match[1])}</h1>`;
        } else if ((match = line.match(/^## (.*$)/))) {
            htmlText += `<h2>${escapeHtml(match[1])}</h2>`;
        } else if ((match = line.match(/^(.*)\*\*(.*)\*\*(.*)$/))) {
            htmlText += `${escapeHtml(match[1])}<b>${escapeHtml(match[2])}</b>${escapeHtml(match[3])}`;
        } else if ((match = line.match(/^(.*)\*(.*)\*(.*)$/))) {
            htmlText += `${escapeHtml(match[1])}<i>${escapeHtml(match[2])}</i>${escapeHtml(match[3])}`;
        } else if ((match = line.match(/\[(.*)\]\((.*)\)/))) {
            htmlText += `<a href="${escapeHtml(match[2])}">${escapeHtml(match[1])}</a>`;
        } else if ((match = line.match(/`(.*)`/))) {
            htmlText += `<code>${escapeHtml(match[1])}</code>`;
        } else if ((match = line.match(/^>\s(.*)$/))) {
            htmlText += `<blockquote style="border-left: 2px solid grey; padding-left: 10px;">${escapeHtml(match[1])}</blockquote>`;
        } else if ((match = line.match(/^-\s(.*)$/))) {
            if(i > 0 && !lines[i-1].startsWith('- ')) {
                htmlText += `<ul>`;
            }
            htmlText += `<li style="color: green;">${escapeHtml(match[1])}</li>`;
            if(i < lines.length-1 && !lines[i+1].startsWith('- ')) {
                htmlText += `</ul>`;
            }
        } else if ((match = line.match(/^\d+.\s(.*)$/))) {
            if(i > 0 && !lines[i-1].match(/^\d+.\s(.*)$/)) {
                htmlText += `<ol>`;
            }
            htmlText += `<li style="color: red;">${escapeHtml(match[1])}</li>`;
            if(i < lines.length-1 && !lines[i+1].match(/^\d+.\s(.*)$/)) {
                htmlText += `</ol>`;
            }
        } else if ((match = line.match(/^---$/))) {
            htmlText += `<hr />`;
        } else if ((match = line.match(/^```(.*)```$/))) {
            htmlText += `<pre style="background-color: #f0f0f0; padding: 10px;">${escapeHtml(match[1])}</pre>`;
        } else {
            htmlText += `<p style="font-size: 16px;">${escapeHtml(line)}</p>`;
        }
    }

    return htmlText;
}

let markdownString = `# Hello, World!

This is a simple markdown document. 

**Bold Text**
*Italic Text*
\`inline code\`

> This is a blockquote.

Unordered list:
- Item 1
- Item 2

Ordered list:
1. First
2. Second

---

\`\`\`
This is a code block.
\`\`\`

[Link](https://google.com)`;

try {
    console.log(parseMarkdown(markdownString));
    document.getElementById('markdown').innerHTML = parseMarkdown(markdownString);
    console.log('Markdown parsed successfully');
} catch (error) {
    console.error('Error parsing Markdown:', error);
}
