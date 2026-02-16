// src/script.js
var radioWaves = {
	minsk: [
		{ name: "Relax", wave: 87.5 },
		{ name: "Народное", wave: 87.9 },
		{ name: "Минск", wave: 92.4 },
		{ name: "Europa plus", wave: 92.8 },
		{ name: "Юмор", wave: 93.7 },
		{ name: "Легенды", wave: 94.1 },
		{ name: "Мелодии Века", wave: 96.2 },
		{ name: "Ретро", wave: 96.9 },
		{ name: "Минская волна", wave: 97.4 },
		{ name: "Авторадио", wave: 98 },
		{ name: "Новое", wave: 98.4 },
		{ name: "Русское", wave: 98.9 },
		{ name: "Unistar", wave: 99.5 },
		{ name: "Energy", wave: 100.4 },
		{ name: "Пилот", wave: 101.2 },
		{ name: "Центр", wave: 101.7 },
		{ name: "Рокс", wave: 102.1 },
		{ name: "Компас", wave: 102.5 },
		{ name: "Культура", wave: 102.9 },
		{ name: "Радиус", wave: 103.7 },
		{ name: "BA", wave: 104.6 },
		{ name: "Столица", wave: 105.1 },
		{ name: "Душевное", wave: 105.7 },
		{ name: "Первый национальный", wave: 106.2 },
		{ name: "Мир", wave: 107.1 },
		{ name: "Альфа", wave: 107.9 },
	],
	molodechno: [
		{ name: "Молодечно", wave: 89.2 },
		{ name: "Мир", wave: 93.3 },
		{ name: "Першы Канал", wave: 96.6 },
		{ name: "Легенды", wave: 97.1 },
		{ name: "Новое", wave: 100.6 },
		{ name: "Минская волна", wave: 107.4 },
	],
	smorgon: [
		{ name: "Столица", wave: 66.38 },
		{ name: "Гродно", wave: 67.19 },
		{ name: "Першы Канал", wave: 67.97 },
		{ name: "Культура", wave: 70.13 },
		{ name: "—", wave: 88 },
		{ name: "Юмор", wave: 91 },
		{ name: "Новое", wave: 92.1 },
		{ name: "Столица", wave: 94.4 },
		{ name: "—", wave: 97.7 },
		{ name: "—", wave: 99.2 },
		{ name: "Радиус", wave: 101.4 },
		{ name: "Гродно", wave: 102.8 },
		{ name: "Першы Канал", wave: 103.6 },
		{ name: "—", wave: 106.1 },
	],
	myadzel: [
		{ name: "Столица", wave: 66.86 },
		{ name: "Витебск", wave: 67.64 },
		{ name: "Першы Канал", wave: 68.69 },
		{ name: "Культура", wave: 70.31 },
		{ name: "Новое", wave: 90.5 },
		{ name: "—", wave: 91.3 },
		{ name: "—", wave: 93.1 },
		{ name: "Unistar", wave: 94.8 },
		{ name: "Столица", wave: 98.5 },
		{ name: "Беларусь", wave: 102 },
		{ name: "Минская волна", wave: 102.4 },
		{ name: "Радиус", wave: 103.9 },
		{ name: "Культура", wave: 104.9 },
		{ name: "Першы Канал", wave: 106.4 },
		{ name: "—", wave: 106.9 },
	],
};

var list = document.getElementById("radio");
var cityNames = {
	minsk: "Минск",
	molodechno: "Молодечно",
	smorgon: "Сморгонь",
	myadzel: "Мядель",
};

// Функция для форматирования частоты
function formatWave(wave) {
	return wave.toFixed(1).replace('.', ',') + ' МГц';
}

// Функция для сортировки по частоте
function sortByWave(stations) {
	return [...stations].sort((a, b) => a.wave - b.wave);
}

// Функция для создания HTML станций
function createStationsHTML(stations) {
	return sortByWave(stations)
		.map(function(radioWave) {
			var waveFormatted = formatWave(radioWave.wave);
			var name = radioWave.name || "—";
			return `<div class="row"><div class="item">${waveFormatted}</div><div class="item">${name}</div></div>`;
		})
		.join("");
}

// Создаем аккордеон (все закрыты по умолчанию)
var getWaves = function(cities) {
	return Object.entries(cities)
		.map(function(city) {
			var cityId = "city-" + city[0];
			var stationsHTML = createStationsHTML(city[1]);

			return `
				<div class="city accordion-item">
					<div class="city-header" data-city="${city[0]}">
						<h3>${cityNames[city[0]]}</h3>
						<span class="accordion-icon">▼</span>
					</div>
					<div class="table-container" id="${cityId}">
						<div class="table">${stationsHTML}</div>
					</div>
				</div>
			`;
		})
		.join("");
};

// Инициализация
list.style.opacity = '0';
list.innerHTML = getWaves(radioWaves);

// Логика аккордеона
function initAccordion() {
	var cityHeaders = document.querySelectorAll('.city-header');
	var containers = document.querySelectorAll('.table-container');

	// Функция закрытия всех контейнеров
	function closeAll() {
		containers.forEach(function(container) {
			container.classList.remove('active');
			container.style.maxHeight = null;
		});

		document.querySelectorAll('.accordion-icon').forEach(function(icon) {
			icon.classList.remove('active');
		});
	}

	// Функция открытия конкретного контейнера
	function openContainer(container, icon) {
		container.classList.add('active');
		container.style.maxHeight = container.scrollHeight + 'px';
		icon.classList.add('active');
	}

	// Добавляем обработчики кликов
	cityHeaders.forEach(function(header) {
		header.addEventListener('click', function() {
			var city = this.dataset.city;
			var container = document.getElementById('city-' + city);
			var icon = this.querySelector('.accordion-icon');
			var isActive = container.classList.contains('active');

			// Если кликнутый элемент активен - просто закрываем его
			if (isActive) {
				closeAll();
			} else {
				// Иначе закрываем все и открываем кликнутый
				closeAll();
				openContainer(container, icon);
			}
		});
	});

	// Все контейнеры изначально закрыты, ничего не открываем
}

// Ждем загрузки DOM и инициализируем аккордеон
setTimeout(function() {
	initAccordion();

	// Эффект появления
	list.style.transition = 'opacity 0.5s ease';
	list.style.opacity = '1';
}, 100);

// Добавляем обработчик для ресайза (пересчет высоты при изменении размера окна)
window.addEventListener('resize', function() {
	var activeContainer = document.querySelector('.table-container.active');
	if (activeContainer) {
		activeContainer.style.maxHeight = activeContainer.scrollHeight + 'px';
	}
});

// Интерактивность для строк
document.addEventListener('click', function(e) {
	var row = e.target.closest('.row');
	if (row) {
		row.style.backgroundColor = 'var(--vga-yellow)';
		row.style.color = 'var(--vga-black)';
		setTimeout(function() {
			row.style.backgroundColor = '';
			row.style.color = '';
		}, 200);
	}
});

// Эффект при наведении
var rows = document.querySelectorAll('.row');
rows.forEach(function(row) {
	row.addEventListener('mouseenter', function() {
		this.style.transform = 'translateX(2px)';
	});
	row.addEventListener('mouseleave', function() {
		this.style.transform = '';
	});
});

// Добавляем текущее время
var timeDiv = document.createElement('div');
timeDiv.style.position = 'fixed';
timeDiv.style.top = 'var(--space-sm)';
timeDiv.style.right = 'var(--space-sm)';
timeDiv.style.color = 'var(--vga-light-cyan)';
timeDiv.style.fontSize = 'var(--font-size-sm)';
timeDiv.style.zIndex = '10000';
document.body.appendChild(timeDiv);

function updateTime() {
	var now = new Date();
	var timeString = now.toLocaleTimeString('ru-RU', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	timeDiv.textContent = 'BIOS TIME: ' + timeString;
}

updateTime();
setInterval(updateTime, 1000);