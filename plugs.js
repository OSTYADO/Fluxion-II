 const fs = require("fs"); 
 const path = require("path");

async function loadPlugins(directory = "./command") { const plugins = []; const files = fs.readdirSync(directory).filter(file => file.endsWith(".js"));

for (const file of files) {
    const filePath = path.resolve(directory, file);
    try {
        delete require.cache[require.resolve(filePath)];
        const plugin = require(filePath);
        if (plugin && plugin.command) {
            plugins.push(plugin);
        }
    } catch (error) {
        console.error(`[Plugin Error] ${file}:`, error.message);
    }
}

return plugins;

}

module.exports = { loadPlugins };

