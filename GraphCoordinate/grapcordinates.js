/**
 * grapcordinates.js
 *
 * Accepts an optional `styles` object (CSS Modules map).
 * If provided, class names are resolved through it; otherwise the plain
 * string names are used directly (backwards-compatible with the old CSS).
 */

function cls(styles, name) {
    return styles ? (styles[name] || name) : name;
}

export function createAxesAndGrid(container, width, height, styles) {
    // Clear existing axes, grid, and ticks
    container
        .querySelectorAll('.axis, .grid-line, .tick, .tick-label, [class*="axis"], [class*="gridLine"], [class*="tick"]')
        .forEach(el => el.remove());

    const padding = 0.1 * width;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // ── X Axis ──
    const xAxis = document.createElement('div');
    xAxis.className = `${cls(styles, 'axis')} ${cls(styles, 'xAxis')}`;
    xAxis.style.left = `${padding}px`;
    xAxis.style.bottom = `${padding}px`;
    xAxis.style.width = `${graphWidth}px`;
    xAxis.style.height = '2px';
    xAxis.style.background = 'black';
    container.appendChild(xAxis);

    // ── Y Axis ──
    const yAxis = document.createElement('div');
    yAxis.className = `${cls(styles, 'axis')} ${cls(styles, 'yAxis')}`;
    yAxis.style.left = `${padding}px`;
    yAxis.style.bottom = `${padding}px`;
    yAxis.style.width = '2px';
    yAxis.style.height = `${graphHeight}px`;
    yAxis.style.background = 'black';
    container.appendChild(yAxis);

    // ── Grid Lines, Ticks & Labels ──
    for (let i = 0; i <= 10; i++) {
        // X grid line
        const xGrid = document.createElement('div');
        xGrid.className = `${cls(styles, 'gridLine')} ${cls(styles, 'xGrid')}`;
        xGrid.style.left = `${padding}px`;
        xGrid.style.top = `${padding + (i / 10) * graphHeight}px`;
        xGrid.style.width = `${graphWidth}px`;
        xGrid.style.height = '1px';
        xGrid.style.background = '#ccc';
        container.appendChild(xGrid);

        // Y grid line
        const yGrid = document.createElement('div');
        yGrid.className = `${cls(styles, 'gridLine')} ${cls(styles, 'yGrid')}`;
        yGrid.style.left = `${padding + (i / 10) * graphWidth}px`;
        yGrid.style.bottom = `${padding}px`;
        yGrid.style.width = '1px';
        yGrid.style.height = `${graphHeight}px`;
        yGrid.style.background = '#ccc';
        container.appendChild(yGrid);

        // X tick
        const xTick = document.createElement('div');
        xTick.className = `${cls(styles, 'tick')} ${cls(styles, 'xTick')}`;
        xTick.style.left = `${padding + (i / 10) * graphWidth}px`;
        xTick.style.bottom = `${padding - 5}px`;
        xTick.style.width = '1px';
        xTick.style.height = '5px';
        xTick.style.background = 'black';
        container.appendChild(xTick);

        // Y tick
        const yTick = document.createElement('div');
        yTick.className = `${cls(styles, 'tick')} ${cls(styles, 'yTick')}`;
        yTick.style.left = `${padding - 3}px`;
        yTick.style.top = `${padding + (i / 10) * graphHeight}px`;
        yTick.style.width = '3px';
        yTick.style.height = '1px';
        yTick.style.background = 'black';
        container.appendChild(yTick);

        // X label (skip 0)
        if (i !== 0) {
            const xLabel = document.createElement('div');
            xLabel.className = `${cls(styles, 'tickLabel')} ${cls(styles, 'xLabel')}`;
            xLabel.textContent = i.toString();
            xLabel.style.left = `${padding + (i / 10) * graphWidth - 5}px`;
            xLabel.style.bottom = `${padding - 20}px`;
            xLabel.style.textAlign = 'center';
            container.appendChild(xLabel);
        }

        // Y label (skip 0, which is at i=10)
        if (i !== 10) {
            const yLabel = document.createElement('div');
            yLabel.className = `${cls(styles, 'tickLabel')} ${cls(styles, 'yLabel')}`;
            yLabel.textContent = (10 - i).toString();
            yLabel.style.left = `${padding - 20}px`;
            yLabel.style.top = `${padding + (i / 10) * graphHeight - 5}px`;
            yLabel.style.textAlign = 'right';
            container.appendChild(yLabel);
        }
    }

    // ── Origin label "0" ──
    const originLabel = document.createElement('div');
    originLabel.className = `${cls(styles, 'tickLabel')} origin-label`;
    originLabel.textContent = '0';
    originLabel.style.left = `${padding - 15}px`;
    originLabel.style.bottom = `${padding - 15}px`;
    originLabel.style.textAlign = 'center';
    container.appendChild(originLabel);
}

export function addLabelsAtPoint(container, graphX, graphY, label, width, height, styles) {
    const padding = 0.1 * width;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    const pixelX = padding + (graphX / 10) * graphWidth;
    const pixelY = padding + ((10 - graphY) / 10) * graphHeight;

    const point = document.createElement('div');
    point.className = cls(styles, 'point');
    point.style.left = `${pixelX}px`;
    point.style.top = `${pixelY}px`;
    container.appendChild(point);

    const pointLabel = document.createElement('div');
    pointLabel.className = cls(styles, 'pointLabel');
    pointLabel.textContent = label;
    pointLabel.style.left = `${pixelX + 10}px`;
    pointLabel.style.top = `${pixelY - 10}px`;
    container.appendChild(pointLabel);

    return { point, label: pointLabel };
}

export function drawLines(ctx, points, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });

    ctx.stroke();
}