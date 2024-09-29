// Ülesanne 1: Esialgne ülesande seadistus 
// Kasutaja saab sisestada ülesande ja kuvada seda ülesannete all:
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Kui ei ole midagi sisestatud, ei muutu midagi

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    // Ülesanne 3: Täitmise funktsioon - märkeruut ülesande ees
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked); // Lisa klass, kui ülesanne on täidetud
        updateCompletedCount();
    });

    li.appendChild(checkbox);
    
    // Tekst, millele läheb strikethrough, kui ülesanne on täidetud
    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;
    li.appendChild(taskLabel);

    // Ülesanne 2: Kustutamise nupp (Eemaldab ülesande, kui kasutaja vajutab kustuta ja siis uuendab täidetud ülesannete listi)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Kustuta';
    deleteButton.addEventListener('click', () => { 
        taskList.removeChild(li);
        updateCompletedCount();
    });
    li.appendChild(deleteButton);

    // Ülesanne 2: Muutmise nupp
    const editButton = document.createElement('button');
    editButton.textContent = 'Muuda';
    editButton.addEventListener('click', () => {
        const newTaskText = prompt("Muuda ülesannet:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskLabel.textContent = newTaskText.trim(); // Muudab ülesande sisu
        }
    });
    li.appendChild(editButton);

    taskList.appendChild(li);
    
    taskInput.value = ''; // Tühjendab

    updateCompletedCount();
}

// Ülesanne 3: Täidetud ülesannete loendamine ja uuendamine
function updateCompletedCount() {
    const completedCount = document.getElementById('completedCount');
    const tasks = document.querySelectorAll('#taskList li');
    const completedTasks = Array.from(tasks).filter(task => task.classList.contains('completed')).length;
    completedCount.textContent = `Täidetud ülesanded: ${completedTasks}`;
}

// Ülesanne 3: Sortimisfunktsioon (täidetud ja täitmata ülesanded)
function sortTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    const sortOption = document.getElementById('sortOptions').value;

    // Sorteerimine vastavalt valikule
    if (sortOption === 'completed_first') {
        tasks.sort((a, b) => b.classList.contains('completed') - a.classList.contains('completed'));
    } else if (sortOption === 'incomplete_first') {
        tasks.sort((a, b) => a.classList.contains('completed') - b.classList.contains('completed'));
    } else if (sortOption === 'default') {
        return;
    }

    taskList.innerHTML = ''; // Tühjendab
    tasks.forEach(task => taskList.appendChild(task)); // Lisab sorteeritud ülesanded tagasi
}

// Ülesanne 4: Ülesannete filtreerimine vastavalt soovile
function filterTasks() {
    const filter = document.getElementById('filterOptions').value;
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (filter === 'all' || (filter === 'completed' && isCompleted) || (filter === 'incomplete' && !isCompleted)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

// Ülesanne 2: Kõigi ülesannete kustutamine
function deleteAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Tühjendab
    updateCompletedCount();
}

// Ülesanne 1: Eventlistenerid nuppudele ja sisestamisväljale
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('sortOptions').addEventListener('change', sortTasks); 
document.getElementById('filterOptions').addEventListener('change', filterTasks); 
document.getElementById('deleteAllButton').addEventListener('click', deleteAllTasks); 

// Lisan eventlistener Enterile, et lisada ülesanne ka nupuga mugavuse mõistes
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
