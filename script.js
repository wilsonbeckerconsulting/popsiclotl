// Game states
let popsiclotlState = {
    petName: 'Popsiclotl',
    hunger: 100,
    thirst: 100,
    energy: 100,
    happiness: 100,
    startTime: Date.now(),
    lastUpdate: Date.now(),
    isAsleep: false,
    mood: 'happy'
};

let fantasyState = {
    coins: 0,
    buildings: [],
    currentQuestion: null,
    questionsAnswered: 0,
    correctAnswers: 0
};

let currentGame = 'menu';

// Navigation elements
const navElements = {
    mainMenu: document.getElementById('main-menu'),
    popsiclotlGame: document.getElementById('popsiclotl-game'),
    fantasyGame: document.getElementById('fantasy-game'),
    playPopsiclotl: document.getElementById('play-popsiclotl'),
    playFantasy: document.getElementById('play-fantasy'),
    backToMenu1: document.getElementById('back-to-menu-1'),
    backToMenu2: document.getElementById('back-to-menu-2')
};

// Popsiclotl game elements
const popsiclotlElements = {
    petName: document.getElementById('pet-name'),
    nameBtn: document.getElementById('name-btn'),
    nameModal: document.getElementById('name-modal'),
    nameInput: document.getElementById('name-input'),
    saveNameBtn: document.getElementById('save-name'),
    cancelNameBtn: document.getElementById('cancel-name'),
    axolotl: document.getElementById('axolotl'),
    statusMessage: document.getElementById('status-message'),
    timeCounter: document.getElementById('time-counter'),
    hungerBar: document.getElementById('hunger-bar'),
    thirstBar: document.getElementById('thirst-bar'),
    energyBar: document.getElementById('energy-bar'),
    happinessBar: document.getElementById('happiness-bar'),
    hungerValue: document.getElementById('hunger-value'),
    thirstValue: document.getElementById('thirst-value'),
    energyValue: document.getElementById('energy-value'),
    happinessValue: document.getElementById('happiness-value')
};

// Fantasy game elements
const fantasyElements = {
    coinCount: document.getElementById('coin-count'),
    questionText: document.getElementById('question-text'),
    questionOptions: document.getElementById('question-options'),
    newQuestionBtn: document.getElementById('new-question-btn'),
    hintBtn: document.getElementById('hint-btn'),
    kingdomGrid: document.getElementById('kingdom-grid'),
    shopItems: document.getElementById('shop-items')
};

// Popsiclotl action buttons
const popsiclotlButtons = {
    feedFish: document.getElementById('feed-fish'),
    feedWorms: document.getElementById('feed-worms'),
    feedPellets: document.getElementById('feed-pellets'),
    treatPopsicle: document.getElementById('treat-popsicle'),
    treatIce: document.getElementById('treat-ice'),
    giveWater: document.getElementById('give-water'),
    petAxolotl: document.getElementById('pet-axolotl'),
    playExercise: document.getElementById('play-exercise'),
    sleepTime: document.getElementById('sleep-time')
};

// Fantasy questions database
const fantasyQuestions = [
    {
        question: "What do dragons usually breathe?",
        options: ["Fire", "Ice", "Water", "Flowers"],
        correct: 0,
        hint: "Think about what makes dragons scary!",
        coins: 10
    },
    {
        question: "What do unicorns have on their forehead?",
        options: ["A crown", "A horn", "A star", "A flower"],
        correct: 1,
        hint: "It's something pointy and magical!",
        coins: 10
    },
    {
        question: "Where do princesses usually live?",
        options: ["In a cave", "In a castle", "In a tree", "In a boat"],
        correct: 1,
        hint: "Think about tall, fancy buildings!",
        coins: 10
    },
    {
        question: "What do fairies use to fly?",
        options: ["Wings", "Broomsticks", "Magic carpets", "Balloons"],
        correct: 0,
        hint: "They're like tiny butterflies!",
        coins: 10
    },
    {
        question: "What color is usually associated with magic?",
        options: ["Brown", "Purple", "Gray", "Yellow"],
        correct: 1,
        hint: "Think about wizards' robes!",
        coins: 15
    },
    {
        question: "What do knights wear for protection?",
        options: ["Pajamas", "Armor", "Swimsuits", "Dresses"],
        correct: 1,
        hint: "It's made of metal and protects them!",
        coins: 15
    },
    {
        question: "What magical creature is half horse, half human?",
        options: ["Dragon", "Unicorn", "Centaur", "Phoenix"],
        correct: 2,
        hint: "It has four legs and two arms!",
        coins: 20
    },
    {
        question: "What do wizards use to cast spells?",
        options: ["A wand", "A fork", "A pencil", "A stick"],
        correct: 0,
        hint: "It's magical and they wave it around!",
        coins: 15
    },
    {
        question: "What creature guards treasure in fairy tales?",
        options: ["Rabbit", "Dragon", "Butterfly", "Fish"],
        correct: 1,
        hint: "It's big, scary, and breathes fire!",
        coins: 20
    },
    {
        question: "What do you call a baby dragon?",
        options: ["Dragonling", "Dragonet", "Dragon pup", "All of these"],
        correct: 3,
        hint: "There are many cute names for baby dragons!",
        coins: 25
    }
];

// Shop items for Fantasy Land
const shopItems = [
    {
        id: 'basic-castle',
        name: 'Castle',
        icon: '🏰',
        price: 50,
        description: 'A beautiful castle for your kingdom!'
    },
    {
        id: 'unicorn',
        name: 'Unicorn',
        icon: '🦄',
        price: 30,
        description: 'A magical unicorn friend!'
    },
    {
        id: 'blacksmith',
        name: 'Blacksmith',
        icon: '⚒️',
        price: 40,
        description: 'Craft magical weapons and tools!'
    },
    {
        id: 'magic-tree',
        name: 'Magic Tree',
        icon: '🌳',
        price: 25,
        description: 'A tree that grows magical fruits!'
    },
    {
        id: 'dragon-tower',
        name: 'Dragon Tower',
        icon: '🐉',
        price: 60,
        description: 'A tower where friendly dragons live!'
    },
    {
        id: 'fairy-house',
        name: 'Fairy House',
        icon: '🧚',
        price: 35,
        description: 'A tiny house for helpful fairies!'
    },
    {
        id: 'rainbow-bridge',
        name: 'Rainbow Bridge',
        icon: '🌈',
        price: 45,
        description: 'A magical bridge across your land!'
    },
    {
        id: 'treasure-chest',
        name: 'Treasure Chest',
        icon: '💎',
        price: 55,
        description: 'Store your magical treasures!'
    }
];

// Status messages for different moods and actions
const messages = {
    happy: [
        "I'm so happy! 💕",
        "Life is great! 🌈",
        "You're the best! ✨",
        "I love being your pet! 💖"
    ],
    hungry: [
        "I'm getting hungry... 🍽️",
        "My tummy is rumbling! 😋",
        "Food would be nice! 🐟",
        "Can I have something to eat? 🥺"
    ],
    thirsty: [
        "I need some water! 💧",
        "I'm feeling thirsty... 🌊",
        "My gills need water! 💦",
        "Could you fill my water bowl? 🥤"
    ],
    tired: [
        "I'm getting sleepy... 😴",
        "Time for a nap? 💤",
        "I need some rest! 🛌",
        "Zzz... so tired... 😪"
    ],
    sad: [
        "I'm feeling a bit sad... 😢",
        "I need some attention! 🥺",
        "Please take care of me! 💔",
        "I miss you when you're gone! 😞"
    ],
    eating: [
        "Nom nom nom! 😋",
        "This is delicious! 🤤",
        "Thank you for the food! 💕",
        "Yummy! 😍"
    ],
    drinking: [
        "Glub glub glub! 💧",
        "Refreshing! 🌊",
        "My gills feel better! 💦",
        "Thank you for the water! 💙"
    ],
    playing: [
        "This is fun! 🎉",
        "I love to play! 🏃",
        "Exercise makes me happy! 💪",
        "Wheee! 🎊"
    ],
    sleeping: [
        "Zzz... sweet dreams! 💤",
        "Good night! 🌙",
        "Time to rest! 😴",
        "Sleeping peacefully... ✨"
    ],
    petting: [
        "That feels so nice! 💕",
        "I love pets! 🥰",
        "More please! 😊",
        "You're so gentle! 💖"
    ],
    treat: [
        "A popsicle! My favorite! 🍭",
        "This is the best treat ever! 🌈",
        "You spoil me! 💕",
        "Ice cold and delicious! 🧊"
    ]
};

// Initialize games
function initGames() {
    loadGameStates();
    setupNavigation();
    showMainMenu();
}

// Navigation functions
function setupNavigation() {
    navElements.playPopsiclotl.addEventListener('click', () => showGame('popsiclotl'));
    navElements.playFantasy.addEventListener('click', () => showGame('fantasy'));
    navElements.backToMenu1.addEventListener('click', showMainMenu);
    navElements.backToMenu2.addEventListener('click', showMainMenu);
}

function showMainMenu() {
    currentGame = 'menu';
    navElements.mainMenu.classList.remove('hidden');
    navElements.popsiclotlGame.classList.add('hidden');
    navElements.fantasyGame.classList.add('hidden');
}

function showGame(game) {
    currentGame = game;
    navElements.mainMenu.classList.add('hidden');
    
    if (game === 'popsiclotl') {
        navElements.popsiclotlGame.classList.remove('hidden');
        navElements.fantasyGame.classList.add('hidden');
        initPopsiclotl();
    } else if (game === 'fantasy') {
        navElements.popsiclotlGame.classList.add('hidden');
        navElements.fantasyGame.classList.remove('hidden');
        initFantasyLand();
    }
}

// Initialize Popsiclotl game
function initPopsiclotl() {
    updatePopsiclotlDisplay();
    setupPopsiclotlEventListeners();
    startPopsiclotlLoop();
    
    // Show welcome message
    showPopsiclotlMessage(getRandomMessage('happy'));
}

// Initialize Fantasy Land game
function initFantasyLand() {
    updateFantasyDisplay();
    setupFantasyEventListeners();
    createKingdomGrid();
    updateShop();
}

// Load game states from localStorage
function loadGameStates() {
    const popsiclotlSaved = localStorage.getItem('popsiclotl-save');
    if (popsiclotlSaved) {
        const savedState = JSON.parse(popsiclotlSaved);
        popsiclotlState = { ...popsiclotlState, ...savedState };
        popsiclotlState.lastUpdate = Date.now();
    }
    
    const fantasySaved = localStorage.getItem('fantasy-save');
    if (fantasySaved) {
        const savedState = JSON.parse(fantasySaved);
        fantasyState = { ...fantasyState, ...savedState };
    }
}

// Save game states to localStorage
function saveGameStates() {
    localStorage.setItem('popsiclotl-save', JSON.stringify(popsiclotlState));
    localStorage.setItem('fantasy-save', JSON.stringify(fantasyState));
}

// Setup Popsiclotl event listeners
function setupPopsiclotlEventListeners() {
    // Name functionality
    popsiclotlElements.petName.addEventListener('click', showNameModal);
    popsiclotlElements.nameBtn.addEventListener('click', showNameModal);
    popsiclotlElements.saveNameBtn.addEventListener('click', saveName);
    popsiclotlElements.cancelNameBtn.addEventListener('click', hideNameModal);
    popsiclotlElements.nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveName();
    });

    // Pet clicking
    popsiclotlElements.axolotl.addEventListener('click', () => performPopsiclotlAction('pet'));

    // Action buttons
    popsiclotlButtons.feedFish.addEventListener('click', () => performPopsiclotlAction('feed', 'fish'));
    popsiclotlButtons.feedWorms.addEventListener('click', () => performPopsiclotlAction('feed', 'worms'));
    popsiclotlButtons.feedPellets.addEventListener('click', () => performPopsiclotlAction('feed', 'pellets'));
    popsiclotlButtons.treatPopsicle.addEventListener('click', () => performPopsiclotlAction('treat', 'popsicle'));
    popsiclotlButtons.treatIce.addEventListener('click', () => performPopsiclotlAction('treat', 'ice'));
    popsiclotlButtons.giveWater.addEventListener('click', () => performPopsiclotlAction('water'));
    popsiclotlButtons.petAxolotl.addEventListener('click', () => performPopsiclotlAction('pet'));
    popsiclotlButtons.playExercise.addEventListener('click', () => performPopsiclotlAction('exercise'));
    popsiclotlButtons.sleepTime.addEventListener('click', () => performPopsiclotlAction('sleep'));
}

// Setup Fantasy Land event listeners
function setupFantasyEventListeners() {
    fantasyElements.newQuestionBtn.addEventListener('click', generateNewQuestion);
    fantasyElements.hintBtn.addEventListener('click', showHint);
}

// Popsiclotl name functions
function showNameModal() {
    popsiclotlElements.nameModal.classList.remove('hidden');
    popsiclotlElements.nameInput.value = popsiclotlState.petName;
    popsiclotlElements.nameInput.focus();
    popsiclotlElements.nameInput.select();
}

function hideNameModal() {
    popsiclotlElements.nameModal.classList.add('hidden');
}

function saveName() {
    const newName = popsiclotlElements.nameInput.value.trim();
    if (newName && newName.length > 0) {
        popsiclotlState.petName = newName;
        popsiclotlElements.petName.textContent = newName;
        showPopsiclotlMessage(`Nice to meet you! I'm ${newName}! 💕`);
        saveGameStates();
    }
    hideNameModal();
}

// Perform Popsiclotl actions
function performPopsiclotlAction(action, type = null) {
    if (popsiclotlState.isAsleep && action !== 'sleep') {
        showPopsiclotlMessage("Shhh... I'm sleeping! 😴");
        return;
    }

    let message = '';
    let happinessBoost = 5;

    switch (action) {
        case 'feed':
            if (popsiclotlState.hunger >= 95) {
                showPopsiclotlMessage("I'm already full! 🤤");
                return;
            }
            popsiclotlState.hunger = Math.min(100, popsiclotlState.hunger + 25);
            popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + happinessBoost);
            message = getRandomMessage('eating');
            addPopsiclotlEffect('happy-bounce');
            break;

        case 'water':
            if (popsiclotlState.thirst >= 95) {
                showPopsiclotlMessage("My water bowl is already full! 💧");
                return;
            }
            popsiclotlState.thirst = Math.min(100, popsiclotlState.thirst + 30);
            popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + happinessBoost);
            message = getRandomMessage('drinking');
            addPopsiclotlEffect('happy-bounce');
            break;

        case 'treat':
            if (popsiclotlState.happiness >= 95) {
                showPopsiclotlMessage("I'm already super happy! 🌈");
                return;
            }
            popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 20);
            popsiclotlState.hunger = Math.min(100, popsiclotlState.hunger + 10);
            message = getRandomMessage('treat');
            addPopsiclotlEffect('rainbow-sparkle');
            break;

        case 'pet':
            popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 15);
            message = getRandomMessage('petting');
            addPopsiclotlEffect('happy-bounce');
            break;

        case 'exercise':
            if (popsiclotlState.energy <= 20) {
                showPopsiclotlMessage("I'm too tired to exercise! 😴");
                return;
            }
            popsiclotlState.energy = Math.max(0, popsiclotlState.energy - 15);
            popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 20);
            popsiclotlState.hunger = Math.max(0, popsiclotlState.hunger - 10);
            popsiclotlState.thirst = Math.max(0, popsiclotlState.thirst - 10);
            message = getRandomMessage('playing');
            addPopsiclotlEffect('happy-bounce');
            break;

        case 'sleep':
            if (popsiclotlState.isAsleep) {
                // Wake up
                popsiclotlState.isAsleep = false;
                popsiclotlState.energy = 100;
                popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 10);
                message = "Good morning! I feel refreshed! ☀️";
                popsiclotlElements.axolotl.style.filter = 'brightness(1)';
                popsiclotlButtons.sleepTime.innerHTML = '<span class="btn-icon">😴</span><span class="btn-text">Sleep</span>';
            } else {
                // Go to sleep
                if (popsiclotlState.energy >= 80) {
                    showPopsiclotlMessage("I'm not tired yet! 😊");
                    return;
                }
                popsiclotlState.isAsleep = true;
                message = getRandomMessage('sleeping');
                popsiclotlElements.axolotl.style.filter = 'brightness(0.7)';
                popsiclotlButtons.sleepTime.innerHTML = '<span class="btn-icon">☀️</span><span class="btn-text">Wake Up</span>';
            }
            break;
    }

    showPopsiclotlMessage(message);
    updatePopsiclotlDisplay();
    saveGameStates();
}

// Popsiclotl helper functions
function addPopsiclotlEffect(effectClass) {
    popsiclotlElements.axolotl.classList.add(effectClass);
    setTimeout(() => {
        popsiclotlElements.axolotl.classList.remove(effectClass);
    }, 1000);
}

function getRandomMessage(category) {
    const messageArray = messages[category] || messages.happy;
    return messageArray[Math.floor(Math.random() * messageArray.length)];
}

function showPopsiclotlMessage(message) {
    popsiclotlElements.statusMessage.textContent = message;
    popsiclotlElements.statusMessage.style.animation = 'none';
    setTimeout(() => {
        popsiclotlElements.statusMessage.style.animation = 'message-pulse 2s ease-in-out infinite';
    }, 10);
}

function updatePopsiclotlDisplay() {
    // Update pet name
    popsiclotlElements.petName.textContent = popsiclotlState.petName;
    
    // Update need bars
    updatePopsiclotlNeedBar('hunger', popsiclotlState.hunger);
    updatePopsiclotlNeedBar('thirst', popsiclotlState.thirst);
    updatePopsiclotlNeedBar('energy', popsiclotlState.energy);
    updatePopsiclotlNeedBar('happiness', popsiclotlState.happiness);

    // Update time counter
    const timeElapsed = Math.floor((Date.now() - popsiclotlState.startTime) / 60000);
    popsiclotlElements.timeCounter.textContent = `${timeElapsed} minutes`;

    // Update axolotl appearance based on mood
    updateAxolotlMood();
}

function updatePopsiclotlNeedBar(need, value) {
    const bar = popsiclotlElements[need + 'Bar'];
    const valueDisplay = popsiclotlElements[need + 'Value'];
    
    bar.style.width = value + '%';
    valueDisplay.textContent = Math.round(value) + '%';

    // Change color based on value
    if (value < 30) {
        bar.style.filter = 'brightness(0.7) saturate(0.8)';
    } else {
        bar.style.filter = 'brightness(1) saturate(1)';
    }
}

function updateAxolotlMood() {
    const avgNeeds = (popsiclotlState.hunger + popsiclotlState.thirst + popsiclotlState.energy + popsiclotlState.happiness) / 4;
    
    let newMood = 'happy';
    if (popsiclotlState.hunger < 30) newMood = 'hungry';
    else if (popsiclotlState.thirst < 30) newMood = 'thirsty';
    else if (popsiclotlState.energy < 30) newMood = 'tired';
    else if (avgNeeds < 50) newMood = 'sad';

    if (newMood !== popsiclotlState.mood) {
        popsiclotlState.mood = newMood;
        
        // Show mood-appropriate message occasionally
        if (Math.random() < 0.3) {
            setTimeout(() => {
                showPopsiclotlMessage(getRandomMessage(newMood));
            }, 1000);
        }
    }

    // Update axolotl visual state
    const axolotlHead = popsiclotlElements.axolotl.querySelector('.axolotl-head');
    if (popsiclotlState.happiness > 80) {
        axolotlHead.style.filter = 'hue-rotate(10deg) brightness(1.1)';
    } else if (avgNeeds < 50) {
        axolotlHead.style.filter = 'hue-rotate(-10deg) brightness(0.9) saturate(0.8)';
    } else {
        axolotlHead.style.filter = 'none';
    }
}

function startPopsiclotlLoop() {
    setInterval(() => {
        if (currentGame !== 'popsiclotl') return;
        
        if (popsiclotlState.isAsleep) {
            // Sleeping restores energy faster but other needs still decrease slowly
            popsiclotlState.energy = Math.min(100, popsiclotlState.energy + 2);
            popsiclotlState.hunger = Math.max(0, popsiclotlState.hunger - 0.3);
            popsiclotlState.thirst = Math.max(0, popsiclotlState.thirst - 0.3);
        } else {
            // Normal need decay
            popsiclotlState.hunger = Math.max(0, popsiclotlState.hunger - 0.5);
            popsiclotlState.thirst = Math.max(0, popsiclotlState.thirst - 0.6);
            popsiclotlState.energy = Math.max(0, popsiclotlState.energy - 0.4);
            
            // Happiness decreases if other needs are low
            const avgNeeds = (popsiclotlState.hunger + popsiclotlState.thirst + popsiclotlState.energy) / 3;
            if (avgNeeds < 50) {
                popsiclotlState.happiness = Math.max(0, popsiclotlState.happiness - 0.8);
            } else if (avgNeeds > 80) {
                popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 0.2);
            } else {
                popsiclotlState.happiness = Math.max(0, popsiclotlState.happiness - 0.1);
            }
        }

        updatePopsiclotlDisplay();
        saveGameStates();

        // Random happy messages when all needs are high
        if (Math.random() < 0.001 && !popsiclotlState.isAsleep) {
            const avgNeeds = (popsiclotlState.hunger + popsiclotlState.thirst + popsiclotlState.energy + popsiclotlState.happiness) / 4;
            if (avgNeeds > 80) {
                showPopsiclotlMessage(getRandomMessage('happy'));
            }
        }
    }, 1000);
}

// Fantasy Land functions
function updateFantasyDisplay() {
    fantasyElements.coinCount.textContent = fantasyState.coins;
}

function generateNewQuestion() {
    const availableQuestions = fantasyQuestions.filter(q => q !== fantasyState.currentQuestion);
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    
    fantasyState.currentQuestion = randomQuestion;
    
    // Display question
    fantasyElements.questionText.textContent = randomQuestion.question;
    
    // Clear previous options
    fantasyElements.questionOptions.innerHTML = '';
    
    // Create option buttons
    randomQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => answerQuestion(index));
        fantasyElements.questionOptions.appendChild(button);
    });
    
    // Hide hint button initially
    fantasyElements.hintBtn.style.display = 'inline-block';
}

function answerQuestion(selectedIndex) {
    const question = fantasyState.currentQuestion;
    const isCorrect = selectedIndex === question.correct;
    
    // Disable all option buttons
    const optionButtons = fantasyElements.questionOptions.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    fantasyState.questionsAnswered++;
    
    if (isCorrect) {
        fantasyState.correctAnswers++;
        fantasyState.coins += question.coins;
        
        // Animate coin gain
        fantasyElements.coinCount.classList.add('coin-earned');
        setTimeout(() => {
            fantasyElements.coinCount.classList.remove('coin-earned');
        }, 800);
        
        fantasyElements.questionText.textContent = `Correct! You earned ${question.coins} coins! 🎉`;
    } else {
        fantasyElements.questionText.textContent = `Not quite right! The answer was: ${question.options[question.correct]} 😊`;
    }
    
    updateFantasyDisplay();
    updateShop();
    saveGameStates();
    
    // Reset after delay
    setTimeout(() => {
        fantasyElements.questionText.textContent = "Click 'New Question' for another question!";
        fantasyElements.questionOptions.innerHTML = '';
        fantasyElements.hintBtn.style.display = 'none';
    }, 3000);
}

function showHint() {
    if (fantasyState.currentQuestion) {
        fantasyElements.questionText.textContent = `Hint: ${fantasyState.currentQuestion.hint}`;
        fantasyElements.hintBtn.style.display = 'none';
    }
}

function createKingdomGrid() {
    fantasyElements.kingdomGrid.innerHTML = '';
    
    // Create 16 slots (4x4 grid)
    for (let i = 0; i < 16; i++) {
        const slot = document.createElement('div');
        slot.className = 'kingdom-slot';
        slot.dataset.slotId = i;
        
        // Check if this slot has a building
        const building = fantasyState.buildings.find(b => b.slotId === i);
        if (building) {
            slot.classList.add('occupied');
            const buildingElement = document.createElement('div');
            buildingElement.className = 'building';
            buildingElement.textContent = building.icon;
            buildingElement.title = building.name;
            slot.appendChild(buildingElement);
        }
        
        fantasyElements.kingdomGrid.appendChild(slot);
    }
}

function updateShop() {
    fantasyElements.shopItems.innerHTML = '';
    
    shopItems.forEach(item => {
        const shopItem = document.createElement('button');
        shopItem.className = 'shop-item';
        
        // Check if player can afford this item
        if (fantasyState.coins >= item.price) {
            shopItem.classList.add('affordable');
        } else {
            shopItem.classList.add('expensive');
        }
        
        shopItem.innerHTML = `
            <span class="shop-item-icon">${item.icon}</span>
            <div>${item.name}</div>
            <div class="shop-item-price">${item.price} coins</div>
        `;
        
        shopItem.title = item.description;
        shopItem.addEventListener('click', () => buyItem(item));
        
        fantasyElements.shopItems.appendChild(shopItem);
    });
}

function buyItem(item) {
    if (fantasyState.coins < item.price) {
        alert("You don't have enough coins! Answer more questions to earn coins! 💰");
        return;
    }
    
    // Find empty slot
    const emptySlot = fantasyElements.kingdomGrid.querySelector('.kingdom-slot:not(.occupied)');
    if (!emptySlot) {
        alert("Your kingdom is full! You've built everything! 🏰");
        return;
    }
    
    // Purchase item
    fantasyState.coins -= item.price;
    const slotId = parseInt(emptySlot.dataset.slotId);
    
    fantasyState.buildings.push({
        id: item.id,
        name: item.name,
        icon: item.icon,
        slotId: slotId
    });
    
    updateFantasyDisplay();
    createKingdomGrid();
    updateShop();
    saveGameStates();
    
    alert(`You bought a ${item.name}! It's been added to your kingdom! ✨`);
}

// Auto-save every 30 seconds
setInterval(saveGameStates, 30000);

// Initialize games when page loads
document.addEventListener('DOMContentLoaded', initGames);

// Save game states when page is about to unload
window.addEventListener('beforeunload', saveGameStates);

// Add some fun interactions
document.addEventListener('keydown', (e) => {
    // Secret rainbow effect with spacebar (only in Popsiclotl game)
    if (e.code === 'Space' && currentGame === 'popsiclotl' && !popsiclotlState.isAsleep) {
        e.preventDefault();
        addPopsiclotlEffect('rainbow-sparkle');
        popsiclotlState.happiness = Math.min(100, popsiclotlState.happiness + 5);
        showPopsiclotlMessage("Surprise rainbow! 🌈✨");
        updatePopsiclotlDisplay();
    }
});

// Add click sound effect simulation (visual feedback)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('action-btn') || e.target.classList.contains('option-btn') || e.target.classList.contains('shop-item')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});
