function onReady(){
  let storageThings = localStorage.getItem('toDoStorage');
  let toDos = [];
  if (storageThings != null) {
    toDos = JSON.parse(storageThings);
  }

  let id = 0;
  const addToDoForm = document.getElementById('addToDoForm');

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++;

    newToDoText.value = '';

    renderTheUI();
  }

  function renderTheUI() {
    let toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      let checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = toDo.complete;

      checkbox.addEventListener('change', function() {
        if(this.checked) {
          toDo.complete = true;
        } else {
          toDo.complete = false;
        }
        localStorage.setItem('toDoStorage', JSON.stringify(toDos));
      })

      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener('click', event => {
         toDos = toDos.filter(function(item) {
           return item.id != toDo.id;
         })
         localStorage.setItem('toDoStorage', JSON.stringify(toDos));
         renderTheUI();
      });

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteBtn);
    });
  }
  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
    localStorage.setItem('toDoStorage', JSON.stringify(toDos));
  });
  renderTheUI();
}

window.onload = function() {
onReady();
};
