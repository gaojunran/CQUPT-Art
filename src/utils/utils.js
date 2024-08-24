export const load = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const dump = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export function normalizeRowspanTable(tableElement) {
    // 获取表格中所有的行
    const rows = tableElement.rows;

    // 遍历每一行
    for (let i = 0; i < rows.length; i++) {
        const currentRow = rows[i];
        const cells = currentRow.cells;

        // 遍历每一个单元格
        for (let j = 0; j < cells.length; j++) {
            const currentCell = cells[j];
            const rowspan = currentCell.rowSpan;

            // 如果当前单元格有 rowspan 属性
            if (rowspan > 1) {
                // 复制当前单元格的内容
                const cellContent = currentCell.innerHTML;

                // 在当前行后面插入新的行
                for (let k = 1; k < rowspan; k++) {
                    const newRow = tableElement.insertRow(i + k);
                    const newCell = newRow.insertCell(j);
                    newCell.innerHTML = cellContent;
                }

                // 设置当前单元格的 rowspan 属性为 1
                currentCell.rowSpan = 1;
            }
        }
    }
}