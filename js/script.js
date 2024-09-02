const body = document.body;
const themeImage = document.getElementById('theme-image');
const addButton = document.getElementById("add-button");

document.getElementById('icon-container').addEventListener('click', function () {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeImage.classList.remove('light-mode');
    themeImage.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeImage.classList.remove('dark-mode');
    themeImage.classList.add('light-mode');
  }
});

// Add event listener for the Enter key in the input field
document.getElementById('newTask').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskInput = document.getElementById("newTask");
  const taskText = taskInput.value;

  if (taskText.trim() !== "") {
    const taskList = document.getElementById("taskList");

    // Check if there are already 6 items
    if (taskList.children.length >= 6) {
      alert("You can only add up to 6 tasks.");
      return;
    }

    // Create a new task item
    const newTaskItem = document.createElement("li");
    newTaskItem.className = 'todo-item'; // Assign a class for easy selection
    newTaskItem.draggable = true; // Make the task item draggable
    newTaskItem.innerHTML = `
      <div class="flex justify-between items-center">
        <button class="add-image-btn top-3 left-2 border-2 border-gray-500 rounded-full items-center hover:border-blue-500 w-5 h-5 px-1"></button>
        <span class="taskText">${taskText}</span>
        <img src="./images/icon-cross.svg" class="delete-button ml-2 cursor-pointer w-5 h-5">
      </div>
    `;

    const toggleImageOnButton = (button) => {
      const imgSrc = './images/icon-check.svg'; // Replace with your image path
      const imgHTML = `<img src="${imgSrc}" alt="Icon" class="ml-20">`;
      
      if (button.innerHTML.includes(imgHTML)) {
        // If the image exists, remove it
        button.innerHTML = button.innerHTML.replace(imgHTML, '');
      } else {
        // If the image doesn't exist, add it
        button.innerHTML += imgHTML;
      }
    };

    // Attach the event listener to the button within the new task item
    const addBtn = newTaskItem.querySelector('.add-image-btn');
    addBtn.addEventListener('click', () => {
      toggleImageOnButton(addBtn);
    });
    
    // Append the new task item to a list or container
    taskList.appendChild(newTaskItem);

    
    // Drag event handlers
    newTaskItem.addEventListener('dragstart', handleDragStart);
    newTaskItem.addEventListener('dragover', handleDragOver);
    newTaskItem.addEventListener('drop', handleDrop);
    newTaskItem.addEventListener('dragend', handleDragEnd);

    // Add line-through when clicking on the text
    newTaskItem.addEventListener('click', function () {
      newTaskItem.style.textDecoration = newTaskItem.style.textDecoration ===
        'line-through' ? 'none' : 'line-through';
    });

    // Add hover effect using JavaScript
    newTaskItem.style.transition = 'background-color 0.3s ease';
    newTaskItem.addEventListener('mouseover', function () {
      newTaskItem.style.backgroundColor = 'rgba(0, 122, 255, 0.1)'; // Light blue on hover
    });
    newTaskItem.addEventListener('mouseout', function () {
      newTaskItem.style.backgroundColor = 'rgba(37, 39, 60, 1)'; // Revert to original color
    });

    // Add event listener for the delete button
    const deleteButton = newTaskItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      newTaskItem.remove();

    });

    // Apply Tailwind CSS classes to the new task item
    newTaskItem.classList.add('bg-custom-gray');
    newTaskItem.style.borderBottom = '0.2px solid rgba(255, 255, 255, 0.5)';
    newTaskItem.style.color = 'white';
    newTaskItem.style.borderRadius = '4px';

    // Append the new item to the todo list
    taskList.appendChild(newTaskItem);
    taskInput.value = ""; // Clear input field

  }
}

// Function to create a div with buttons
const createButtonDiv = () => {
  // Create the div element
  const buttonContainer = document.createElement('div');

  const buttonTexts = ['X items left', 'X All', 'Active', 'Completed', 'Clear Completed'];
   // Create buttons with different texts and append them to the div
   buttonTexts.forEach((text, index) => {
     const span = document.createElement('span');
     span.innerText = text;
     span.className = 'text-gray-700 hover:text-blue-500 cursor-pointer';

     // Event listener for "X items left" button
     if (index === 0) {
       span.addEventListener('click', () => {
        updateLeftItems();
         updateItemCount();
         showActiveItems();
         showCompletedItems();
         buttonContainer.span.innerText;
       });
     }

     


     // Style each button (optional)
     span.style.margin = '5px';
     span.style.padding = '2px 6px';
     span.style.color = 'white';
     span.style.backgroundColor = '#5a67d8'; // Darker blue on button hover
     span.style.border = 'none';
     span.style.borderRadius = '5px';
     span.style.cursor = 'pointer';


     buttonContainer.appendChild(span);
   });

  // Initial background color for the container
  buttonContainer.style.backgroundColor = 'rgba(37, 39, 60, 1)';
  buttonContainer.style.position = 'fixed';
  buttonContainer.style.marginTop = '358px';
  buttonContainer.style.color = 'white';
  buttonContainer.style.padding = '8px';
  buttonContainer.style.borderRadius = '5px';
  buttonContainer.style.textAlign = 'center'; // Center buttons in the div
  buttonContainer.style.transition = 'background-color 0.3s ease'; // Smooth transition for hover

  // Add hover effect using JavaScript for the container
  buttonContainer.addEventListener('mouseover', () => {
    buttonContainer.style.backgroundColor = 'rgba(0, 122, 255, 0.1)'; // Light blue on hover
  });

  buttonContainer.addEventListener('mouseout', () => {
    buttonContainer.style.backgroundColor = 'rgba(37, 39, 60, 1)'; // Revert to original color
  });

  // Append the button container to the document body
  document.body.appendChild(buttonContainer);

  // Function to update the number of items left
  const updateLeftItems = () => {
    // Get all todo items
    const todoItems = document.querySelectorAll('#taskList .todo-item');
    
    // Filter active items
    const activeItems = Array.from(todoItems).filter(item => !item.style.textDecoration.includes('line-through'));

    // Update the first button text based on the number of active items
    const firstSpan = buttonContainer.querySelector('span:first-child');
    const remainingItems = activeItems.length;
    firstSpan.innerText = `${remainingItems} item${remainingItems === 1 ? '' : 's'} left`;
  };

 
// Function to display all items in the todo list
const updateItemCount = () => {
  // Get all todo items
  const todoItems = document.querySelectorAll('#taskList .todo-item');


  // Update the "X All" button text with the total number of items
  const secondSpan = buttonContainer.querySelector('span:nth-child(2)');
  secondSpan.innerText = todoItems.length > 0 ? `Total items: ${todoItems.length}` : 'No items available';

  secondSpan.addEventListener('click', () => {
    if(todoItems.length === 0) {
      alert('No items are available');
    }else{
      alert(`There are ${todoItems.length} items avaiable`);
    }
  });
};


  // Function to show the number of active items
const showActiveItems  = () => {
  // Get all todo items
  const todoItems = document.querySelectorAll('#taskList .todo-item');
  
  // Filter active items (those not marked with line-through)
  const activeItemsIn = Array.from(todoItems).filter(item => !item.style.textDecoration.includes('line-through'));
  
  // Update the third span text based on the number of active items
  const thirdSpan = buttonContainer.querySelector('span:nth-child(3)');
  const activeItems = activeItemsIn.length;
  thirdSpan.innerText = `${activeItems} active`; 
 };

// Add the event listener for the "Active" span
const activeSpan = buttonContainer.querySelector('span:nth-child(3)');
activeSpan.addEventListener('click', showActiveItems);



// Function to show the number of completed items
const showCompletedItems = () => {
  // Get all todo items
  const todoItems = document.querySelectorAll('#taskList .todo-item');
  
  // Filter completed items (those marked with line-through)
  const completedItems = Array.from(todoItems).filter(item => item.style.textDecoration.includes('line-through'));
  
  // Update the span text based on the number of completed items
  const completedSpan = buttonContainer.querySelector('span:nth-child(4)'); // Assuming the "Completed" span is the fourth one
  const completedCount = completedItems.length;
  completedSpan.innerText = `Completed: ${completedCount}`;
};

// Add the event listener for the "Completed" span
const completedSpan = buttonContainer.querySelector('span:nth-child(4)');
completedSpan.addEventListener('click', showCompletedItems);


// Initial update of the todo items
updateLeftItems();
updateItemCount();
showActiveItems();
showCompletedItems();
};

// Call the function to create the div with buttons
createButtonDiv();



// Drag and Drop Handlers
let draggedItem = null;

function handleDragStart(event) {
  draggedItem = this;
  setTimeout(() => this.style.display = 'none', 0);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  this.style.display = '';
  this.parentNode.insertBefore(draggedItem, this.nextSibling);
}

function handleDragEnd(event) {
  this.style.display = '';
}
