const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, 'portifólio');
const outputHtml = path.join(__dirname, 'portifolio.html');

// Template do cartão do projeto
function createCard(folderName) {
  const encFolder = encodeURIComponent(folderName);
  
  // Tenta criar um título mais limpo baseado no nome da pasta
  let title = folderName.replace(/-/g, ' ');
  title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return `
        <!-- Projeto Auto-gerado: ${folderName} -->
        <div class="portfolio-card reveal delay-1">
          <div class="portfolio-view">
            <iframe class="portfolio-iframe" src="portifólio/${encFolder}/index.html" loading="lazy" scrolling="no"></iframe>
          </div>
          <div class="portfolio-content">
            <h3 class="portfolio-title">${title}</h3>
            <p class="portfolio-desc">Projeto adicionado à pasta ${folderName}.</p>
            <div class="portfolio-footer">
              <div class="tech-stack">
                <span class="tech-tag">HTML</span>
                <span class="tech-tag">CSS</span>
              </div>
              <a href="portifólio/${encFolder}/index.html" target="_blank" class="btn-visit">
                Acessar
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>
        </div>`;
}

console.log('Lendo a pasta portifólio...');

if (!fs.existsSync(portfolioDir)) {
    console.error('A pasta "portifólio" não foi encontrada!');
    process.exit(1);
}

// Ler as pastas de projeto
const items = fs.readdirSync(portfolioDir);
const folders = items.filter(item => {
  return fs.statSync(path.join(portfolioDir, item)).isDirectory();
});

console.log(`Encontrados ${folders.length} projetos:`, folders);

const newCards = folders.map(folder => createCard(folder)).join('\n');

// Vamos ler o HTML atual e usar regex para substituir a grid de portfólio
let htmlContent = fs.readFileSync(outputHtml, 'utf-8');

const regex = /<div class="portfolio-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;

if (regex.test(htmlContent)) {
  const newHtml = htmlContent.replace(regex, `<div class="portfolio-grid">\n${newCards}\n      </div>\n    </div>\n  </section>`);
  fs.writeFileSync(outputHtml, newHtml, 'utf-8');
  console.log('✔ portifolio.html foi atualizado automaticamente com os seus projetos!');
} else {
  console.error('Não foi possível encontrar a área <div class="portfolio-grid"> no arquivo portifolio.html');
}
