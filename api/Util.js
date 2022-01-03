export const convertSignToHtml = sign => (
    `<!DOCTYPE html><html><body>
    <svg viewBox = "0 0 500 500" style="position:absolute; height:500px; width: 500px; " xmlns="http://www.w3.org/2000/svg">
    <polyline points="${String(sign)}"
    style="fill:none;stroke:black;stroke-width:3" />
    </svg>
    </body></html>`
)