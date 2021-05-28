const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '..')
const rootFolders = fs.readdirSync(rootPath);
console.log(path.resolve(__dirname, ''))

// 不需要处理的文件夹
const excludesFolders = ['ExportPdf'];

/**
 * 文件夹名称中不能有.
 * 根目录第一层不要放md文件
 * 目录中除了md文件不要放其他的
 * md文件中最高目录层级为 H3
 */
const targetFolders = rootFolders.filter(fold => !fold.includes('.') && !excludesFolders.includes(fold));

let content = '';
console.log(targetFolders)

function recurseGetContent(folders, superPath) {
  folders.forEach(folder => {
    const folderPath = path.resolve(__dirname, `${superPath}/${folder}`);
    // 除了根目录，其他可能是文件也可能是文件夹
    const subNodes = fs.readdirSync(folderPath);
    subNodes.forEach((node) => {
      if (node.includes('.md')) {
        // md文件
        content += `##${node.replace('.md', '')}`;
      } else {
        // 文件夹
        console.log(`${folderPath}/${node}`)
        console.log(fs.readFileSync(`${folderPath}/${node}`))
        // content += fs.readFileSync(`${folderPath}/${node}`);
      }
    })
  })
}
recurseGetContent(targetFolders, '..');

console.log(content)
// fs.writeFileSync('test.md', `${readable}\/n${writeable}`)