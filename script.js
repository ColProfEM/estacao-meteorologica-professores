const cidadeSelect = document.getElementById("cidade-select");

// Retorna o SVG e o texto descritivo com base no código WMO
function obterClimaInfo(code) {
  const icones = {
    // Céu Limpo
    sol: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
    // Parcialmente Nublado
    solNuvem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41"/><path d="M15.9 16A5 5 0 0 1 6 18h0a5 5 0 0 1 1-9.9 5 5 0 0 1 8.9 1.9 4 4 0 0 1 0 6Z"/></svg>`,
    // Encoberto / Nublado
    nuvem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a5 5 0 0 1 0-10c.29 0 .57.03.84.08A6 6 0 0 1 21 13a4.5 4.5 0 0 1-3.5 6Z"/></svg>`,
    // Chuva
    chuva: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6M12 16v6M8 14v6"/></svg>`,
    // Tempestade
    tempestade: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></svg>`,
  };

  const mapa = {
    0: { texto: "Céu limpo", icone: icones.sol },
    1: { texto: "Predom. limpo", icone: icones.sol },
    2: { texto: "Parcial. nublado", icone: icones.solNuvem },
    3: { texto: "Encoberto", icone: icones.nuvem },
    45: { texto: "Nevoeiro", icone: icones.nuvem },
    51: { texto: "Garoa leve", icone: icones.chuva },
    61: { texto: "Chuva fraca", icone: icones.chuva },
    63: { texto: "Chuva moderada", icone: icones.chuva },
    65: { texto: "Chuva forte", icone: icones.chuva },
    80: { texto: "Pancadas chuva", icone: icones.chuva },
    95: { texto: "Tempestade", icone: icones.tempestade },
  };

  return mapa[code] || { texto: "Instável", icone: icones.solNuvem };
}

function formatarDiaSemana(dataString, index) {
  if (index === 1) return "Amanhã";
  const data = new Date(dataString + "T00:00:00");
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return dias[data.getDay()];
}

async function buscarPrevisao() {
  const [latitude, longitude] = cidadeSelect.value.split(",");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const climaAtual = obterClimaInfo(data.current.weather_code);

    // 1. Atualiza FRENTE do Card (Ícone, Temp e Texto)
    document.getElementById("condicao-icone").innerHTML = climaAtual.icone;
    document.getElementById("temp").textContent =
      `${Math.round(data.current.temperature_2m)}°C`;
    document.getElementById("umidade").textContent =
      `${data.current.relative_humidity_2m}%`;
    document.getElementById("vento").textContent =
      `${data.current.wind_speed_10m} km/h`;
    document.getElementById("condicao").textContent = climaAtual.texto;

    // 2. Atualiza VERSO do Card
    document.getElementById("sensacao").textContent =
      `${Math.round(data.current.apparent_temperature)}°C`;
    document.getElementById("pressao").textContent =
      `${Math.round(data.current.surface_pressure)} hPa`;

    const forecastList = document.getElementById("forecast-list");
    forecastList.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
      const dia = formatarDiaSemana(data.daily.time[i], i);
      const min = Math.round(data.daily.temperature_2m_min[i]);
      const max = Math.round(data.daily.temperature_2m_max[i]);
      const climaDia = obterClimaInfo(data.daily.weather_code[i]);

      const itemHtml = `
        <div class="forecast-item">
          <span class="forecast-day">${dia}</span>
          <span class="weather-icon-small">${climaDia.icone}</span>
          <span class="forecast-temp">${min}° / ${max}°C</span>
        </div>
      `;
      forecastList.innerHTML += itemHtml;
    }
  } catch (error) {
    console.error("Erro ao obter dados meteorológicos:", error);
    document.getElementById("condicao").textContent = "Erro ao carregar";
  }
}

cidadeSelect.addEventListener("change", buscarPrevisao);
buscarPrevisao();
