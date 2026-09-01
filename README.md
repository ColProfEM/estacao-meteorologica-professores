# 🌤️ Estação Meteorológica Escolar

Dashboard web interativo para monitoramento de dados meteorológicos locais em tempo real, desenvolvido para apresentar as condições climáticas e previsões da região de Turvo - PR e arredores.

![Tecnologias](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tecnologias](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tecnologias](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/Open--Meteo%20API-00B4D8?style=for-the-badge)

---

## 📌 Funcionalidades

* **📍 Seleção de Localidades:** Permite alternar a consulta entre diferentes regiões (Turvo - PR, Faxinal da Boa Vista, Passa Quatro, Cachoeira dos Turcos e Saudade da Santa Anita).
* **🃏 Card 3D Interativo (Flip Card):** 
  * **Frente:** Exibe a temperatura atual, umidade, velocidade do vento, condição climática e ícone ilustrativo.
  * **Verso (ao passar o mouse):** Apresenta métricas adicionais (sensação térmica e pressão atmosférica) e a previsão do tempo para os próximos 3 dias.
* **🌙 Modo Escuro Automático:** Adapta a paleta de cores da interface automaticamente às preferências do sistema/navegador do usuário (`prefers-color-scheme`).
* **🎨 Ícones Climáticos em SVG:** Renderização dinâmica de vetores SVG de acordo com os códigos de tempo WMO retornados pela API.
* **📱 Layout Responsivo:** Design adaptado tanto para telas menores (smartphones) quanto para navegadores em desktops (layout em grade/2 colunas).
* **📂 Acesso a Dados e Galeria:** Seções dedicadas para o histórico de medições (Google Drive) e registros fotográficos da estação.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica da aplicação.
* **CSS3:** Estilização com CSS Grid, Flexbox, Variáveis CSS, Transições/Transformações 3D e Media Queries.
* **JavaScript (ES6+):** Manipulação da DOM, consumo assíncrono da API Open-Meteo via `fetch()` e lógica de conversão de dados.
* **API Open-Meteo:** Fonte pública e gratuita de dados e previsões meteorológicas.

---

## 🚀 Como Executar o Projeto

Como este é um projeto estático em HTML/CSS/JS puro, não é necessário instalar dependências ou usar gerenciadores de pacotes.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
