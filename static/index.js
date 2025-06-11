(function(){
	let secondsPerReference = window.localStorage.getItem("secs") || 30;
	let secondsRemaining = secondsPerReference;
	let paused = true;

	/** @type {HTMLDivElement} */
	const referenceElem = document.getElementById("reference");

	/** @type {HTMLDivElement} */
	const statusElem = document.getElementById("status");

	/** @type {HTMLDivElement} */
	const bottomBarElem = document.getElementById("bottom-bar");

	/** @type {number} */
	const imagesMax = window.imagesMax;

	function randomImage() {
		return Math.floor(Math.random() * imagesMax);
	}

	function setRemaining(remaining) {
		remaining = (remaining == null) ? secondsPerReference : remaining;
		secondsRemaining = remaining;
		const secs = (remaining % 60).toString().padStart(2, "0");
		const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
		statusElem.innerHTML = `${mins}:${secs}`;
	}

	function setActiveImage(image) {
		setRemaining(null);
		referenceElem.style = `background-image: url(/images/${image})`;
	}

	/** @param {HTMLImageElement} elem */
	function buttonName(elem) {
		return elem.id.replace(/\-button$/, "");
	}

	/** @this {HTMLImageElement} */
	function handleButton(name) {
		if (typeof name === 'string') {
			buttons[name](document.getElementById(`${name}-button`));
		}
		else {
			buttons[buttonName(this)](this);
		}
	}

	function icon(name) {
		return `/icons/${name}.svg`
	}

	let timerInterval;
	function timerTick() {
		setRemaining(secondsRemaining - 1);
		if (secondsRemaining === 0) {
			setRemaining(null);
			handleButton("next");
		}
	}

	function resetTimer() {
		clearInterval(timerInterval);
		if (!paused) {
			timerInterval = setInterval(timerTick, 1000);
		}
	}

	const images = [ randomImage() ];
	let index = 0;

	setActiveImage(images[index]);
	setRemaining(secondsRemaining)

	/** @type {{ [name: string]: ((button: HTMLImageElement) => void) }} */
	const buttons = {
		play: (button) => {
			paused = !paused;
			if (paused) {
				clearInterval(timerInterval);
				button.src = icon("play");
			}
			else {
				resetTimer();
				button.src = icon("pause");
			}
		},

		prev: (button) => {
			if (index === 0) {
				return;
			}
			index--;
			resetTimer();
			setActiveImage(images[index]);
		},
		
		next: (button) => {
			if (index === (images.length - 1)) {
				images.push(randomImage());
				if (index === 99) {
					images.splice(0, 1);
				}
				else {
					index++;
				}
			}
			else {
				index++;
			}
			resetTimer();
			setActiveImage(images[index]);
		},

		configure: (button) => {
			const input = prompt("Seconds per reference?");
			if (input == null) {
				return;
			}
			const newValue = parseInt(input);
			if (isNaN(newValue) || (newValue < 0)) {
				alert("Invalid input");
				return;
			}
			secondsPerReference = newValue;
			window.localStorage.setItem("secs", newValue);
		}
	};

	for (const button of document.getElementsByClassName("bar-button")) {
		button.onclick = handleButton;
		button.src = icon(buttonName(button));
	}

	document.onkeydown = function(event) {
		switch (event.code) {
			case "ArrowLeft":
				handleButton("prev");
				break;
			case "ArrowRight":
				handleButton("next");
				break;
			case "Space":
				handleButton("play");
				break;
			case "Escape":
				handleButton("configure");
				break;
		}
	}

	referenceElem.onclick = function() {
		if (bottomBarElem.classList.contains("hidden")) {
			bottomBarElem.classList.remove("hidden");
		}
		else {
			bottomBarElem.classList.add("hidden");
		}
	}
})();