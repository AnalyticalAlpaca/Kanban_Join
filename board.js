"use strict"

let boardContent = [
    {
        "color": "color1",
        "heading": "ToDo",
        "category": "Design",
        "title": "Website redesign",
        "description": "Modify the contents of the main website...",
        "priority": "img/add_task/urgentSymbol.png",
        "names": ["Wladimir Putin", "Recep Erdogan"],
        "nameColor": ""
    },

    {
        "color": "color2",
        "heading": "InProgress",
        "category": "Sales",
        "title": "Call potential clients",
        "description": "Make the product presentation to prospective buyers",
        "priority": "img/add_task/lowSymbol.png",
        "names": ["Olaf Scholz"],
    },

    {
        "color": "color3",
        "heading": "AwaitingFeedback",
        "category": "Backoffice",
        "title": "Accounting invoices",
        "description": "Write open invoices for customer",
        "priority": "img/add_task/mediumSymbol.png",
        "names": ["Wladimir Putin", "Recep Erdogan", "Olaf Scholz"],
    },

    {
        "color": "color4",
        "heading": "Done",
        "category": "Marketing",
        "title": "Social media strategy",
        "description": "Develop an ad campaign for brand positioning",
        "priority": "img/add_task/urgentSymbol.png",
        "names": ["Wladimir Putin", "Olaf Scholz"],
    }
]

let namesColor = {
    "Wladimir Putin": "#ffa800",
    "Recep Erdogan": "#0232cf",
    "Olaf Scholz": "#800080",
}

let currentDraggedElement;
let rotatable;
let isDraggable;
let setPrio;

function render() {
    document.getElementById("content").innerHTML = /*html*/ `
    <div class="heading">
        <h1>Board</h1>
        <div>
            <input id="searchInput" type="text" placeholder="Find task" oninput="searchTasks()">
            <button id="btn" onmouseover="btnOver()" onmouseout="btnOut()" onmousedown="btnDown()" onmouseup="btnUp()" onclick="render_addTask()">Add task<img src="img/board/buttonPlus.png" alt="Plus-Symbol"></button>
        </div>
    </div>

    <div id="mainContent">
        <div class="column marginRight">
            <h2>To Do</h2>
            <div id="ToDo" ondrop="moveTo('ToDo')" ondragover="allowDrop(event)"></div>
        </div>
        <div class="column marginRight">
            <h2>In Progress</h2>
            <div id="InProgress" ondrop="moveTo('InProgress')" ondragover="allowDrop(event)"></div>
        </div>
        <div class="column marginRight">
            <h2>Awaiting Feedback</h2>
            <div id="AwaitingFeedback" ondrop="moveTo('AwaitingFeedback')" ondragover="allowDrop(event)"></div>        
        </div>
        <div class="column">
            <h2>Done</h2>
            <div id="Done" ondrop="moveTo('Done')" ondragover="allowDrop(event)"></div>
        </div>
    </div>
    `;

    createMainContent()
}

function createMainContent() {
    for (let i = 0; i < boardContent.length; i++) {
        document.getElementById(boardContent[i].heading).innerHTML += /*html*/ `
        <div id="task${i}" class="taskDiv" draggable="true" ondragstart="startDragging(${i})" onmouseover="hoverOn('task${i}')" onmouseout="hoverOut('task${i}')" onmousedown="rotateColumn('task${i}')" onmouseup="rotateColumnBack('task${i}')">
            <p class="category ${boardContent[i].color}">${boardContent[i].category}</p>
            <img src="img/board/editTask.png" alt="Edit-Icon" onmouseover="rotatable = false; isDraggable = false" onmouseout="rotatable = true; isDraggable = true">
            <p class="title">${boardContent[i].title}</p>
            <p class="description">${boardContent[i].description}</p>
            <div class="taskFooter">
                <div id="initials${i}" class="initialDiv"></div>
                <img src="${boardContent[i].priority}" alt="Priority-Symbol">
            </div>
        </div>
        `;
    }

    renderFirstLetters()
}

function renderFirstLetters() {
    for (let i = 0; i < boardContent.length; i++) {
        const names = boardContent[i].names;
        for (let j = 0; j < names.length; j++) {
            const currentName = names[j];
            const filterInitials = names[j].split(' ').map(name => name.charAt(0)).join('');
            document.getElementById(`initials${i}`).innerHTML += /*html*/ `
            <p id="initial${j}" class="initial" style='background-color:${namesColor[currentName]}; width: 2.5rem; height: 2.5rem'>${filterInitials}</p>
            `;
        }
    }
}  

function initials_priority() {
    document.getElementById("initials").innerHTML = `${boardContent[i].names.split(" ")}`;
}

function btnOver() {
    document.getElementById("btn").style.backgroundColor = "#29ABE2";
    document.getElementById("btn").style.boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.7)";
    document.getElementById("btn").style.transitionDuration = "0.2s";
}

function btnOut() {
    document.getElementById("btn").style.backgroundColor = "#2A3647";
    document.getElementById("btn").style.boxShadow = "none";
    document.getElementById("btn").style.transitionDuration = "0.2s";
}

function btnDown() {
    document.getElementById("btn").style.transform = "scale(0.97)";
    document.getElementById("btn").style.transitionDuration = "0.05s";
}

function btnUp() {
    document.getElementById("btn").style.transform = "scale(1)";
    document.getElementById("btn").style.transitionDuration = "0.05s";
}

function hoverOn(hoveredDiv) {
    let column = document.getElementById(hoveredDiv);

    let cssProperties = {
        "box-shadow": "3px 3px 3px #2A3647, -3px -3px 3px #2A3647, -3px 3px 3px #2A3647, 3px -3px 3px #2A3647",
        "transform": "scale(1.03)",
        "transition-duration": "0.2s",
        "cursor": "all-scroll"
    };

    Object.assign(column.style, cssProperties);
    if (hoveredDiv == "ToDo") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "InProgress") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "AwaitingFeedback") {
        Object.assign(column.style, cssProperties);
    } else if (hoveredDiv == "Done") {
        Object.assign(column.style, cssProperties);
    }
}

function hoverOut(outhoveredDiv) {
    let column = document.getElementById(outhoveredDiv);

    let cssProperties = {
        "box-shadow": "none",
        "transform": "scale(1)",
        "transition-duration": "0.2s"
    };

    Object.assign(column.style, cssProperties);
    if (outhoveredDiv == "ToDo") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "InProgress") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "AwaitingFeedback") {
        Object.assign(column.style, cssProperties);
    } else if (outhoveredDiv == "Done") {
        Object.assign(column.style, cssProperties);
    }
}

function rotateColumn(rotatedDiv) {
    if (rotatable==false) {
        return
    } else{
        document.getElementById(rotatedDiv).style.transform = "rotate(3deg)";
    }
}

function rotateColumnBack(rotatedBackDiv) {
    if (rotatable==false) {
        return
    } else{
        document.getElementById(rotatedBackDiv).style.transform = "rotate(0)";
        document.getElementById(rotatedBackDiv).style.transform = "scale(1.03)";    
    }
}

function searchTasks() {
    let input, filter, div, p, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
  
    for (let i = 0; i < boardContent.length; i++) {
      div = document.getElementById(`task${i}`);
      p = div.getElementsByTagName("p");
      let matchFound = false;
      for (let j = 0; j < p.length; j++) {
        txtValue = p[j].textContent || p[j].innerText;
        if (txtValue.toUpperCase().includes(filter)) {
          matchFound = true;
          break;
        }
      }
      if (matchFound) {
        div.style.display = "";
      } else {
        div.style.display = "none";
      }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(heading) {
    if (isDraggable==false) {
        return
    } else {
        boardContent[currentDraggedElement]['heading'] = heading;
        render();
    }
}

function render_addTask() {
    document.getElementById("greyBackground").style.display = "flex";
    document.getElementById("addTask").innerHTML = /*html*/ `
    <h2>Add Task<img src="img/board/closeIcon.png" alt="Close-Icon" onclick="close_addTask()"></h2>
    <div class="mainContent">
        <div class="leftPart">
            <p>Title</p>
            <input type="text" placeholder="Enter a title">
            <p>Description</p>
            <textarea cols="30" rows="10" placeholder="Enter a description"></textarea>
            <p>Category</p>
            <div id="category" class="categoryDiv" onclick="openCategory()">
                <div id="categoryTitle" class="inputCategoryAssignedTo">
                    <p id="selectCategory">Select task category</p>
                    <img id="rotateTriangle" src="img/add_task/openTriangle.png" alt="Open-Symbol" onclick="categoryTriangle()">
                </div>
                <div id="categoryDiv"></div>
            </div>
            <div id="createCategory"></div>
            <div id="colorChoice"></div>
            <p>Assigned to</p>
            <div class="assignedToDiv">
                <div class="inputCategoryAssignedTo">
                    <p>Select contacts to assign</p>
                    <img src="img/add_task/openTriangle.png" alt="Open-Symbol">
                </div>
            </div>
        </div>
        <img src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
        <div>
    </div>
        <div class="rightPart">
            <p>Due date</p>
            <input class="calendar" type="text" placeholder="dd/mm/yyyy">
            <p>Priority</p>
            <div class="prioDiv">
                <button id="urgent" class="prioButton urgent" onclick="pressButton('urgent')" onmouseover="upperButton('urgent')" onmouseout="lowerButton('urgent')">Urgent<img id="img_urgent" src="img/add_task/urgentSymbol.png" alt="Urgent-Symbol"></button>
                <button id="medium" class="prioButton medium" onclick="pressButton('medium')" onmouseover="upperButton('medium')" onmouseout="lowerButton('medium')">Medium<img id="img_medium" src="img/add_task/mediumSymbol.png" alt="Medium-Symbol"></button>
                <button id="low" class="prioButton low" onclick="pressButton('low')" onmouseover="upperButton('low')" onmouseout="lowerButton('low')">Low<img id="img_low" src="img/add_task/lowSymbol.png" alt="Low-Symbol"></button>
            </div>
            <p>Subtasks</p>
            <div class="subtaskDiv">
                <input id="subtaskInput" oninput="subtaskInput()" type="text" placeholder="Add new subtask">
                <div id="inputIcons">
                    <img src="img/add_task/addIcon.png" alt="Subtask-Symbol">
                </div>
            </div>
            <div id="addedSubtask"></div>
        </div>
    </div>
    `;
}

function upperButton(hoveredPrio) {
    if (hoveredPrio === setPrio) {
        return
    }
    document.getElementById(hoveredPrio).style.boxShadow = "0 5px 5px #000";
    document.getElementById(hoveredPrio).style.transform = "translateY(-5%)";
    document.getElementById(hoveredPrio).style.transitionDuration = "0.2s";
}

function lowerButton(hoveredPrio) {
    document.getElementById(hoveredPrio).style.boxShadow = "none";
    document.getElementById(hoveredPrio).style.transform = "translateY(0)";
    document.getElementById(hoveredPrio).style.transitionDuration = "0.2s";
}

function pressButton(pressedBtn) {
    let urgentCSS = {
        "color": "#fff",
        "background-color": "#ff3d00",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };

    let mediumCSS = {
        "color": "#fff",
        "background-color": "#ffa800",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };

    let lowCSS = {
        "color": "#fff",
        "background-color": "#7ae229",
        "transform": "translateY(0)",
        "box-shadow": "none"
    };
    
    let CSS_before = {
        "color": "#000",
        "background-color": "#fff"
    };

    let urgent = document.getElementById('urgent'); 
    Object.assign(urgent.style, CSS_before);
    let medium = document.getElementById('medium');
    Object.assign(medium.style, CSS_before);
    let low = document.getElementById('low');
    Object.assign(low.style, CSS_before);

    if (pressedBtn == "urgent") {
        Object.assign(urgent.style, urgentCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol_white.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (pressedBtn == "medium") {
        Object.assign(medium.style, mediumCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol_white.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol.png";
    } else if (pressedBtn == "low") {
        Object.assign(low.style, lowCSS);
        document.getElementById("img_urgent").src = "img/add_task/urgentSymbol.png";
        document.getElementById("img_medium").src = "img/add_task/mediumSymbol.png";
        document.getElementById("img_low").src = "img/add_task/lowSymbol_white.png";
    }

    setPrio = pressedBtn;
}

function subtaskInput() {
    let input = document.getElementById("subtaskInput").value;
    let inputIcons = document.getElementById("inputIcons");

    if (input !== "") {
        inputIcons.innerHTML = /*html*/ `
        <div class="subtaskIcons">
            <img onclick="closeSubtaskIcons()" class="closeIcon" src="img/add_task/closeIcon.png" alt="Close-Icon">
            <img class="subtaskLine" src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
            <img onclick="createSubtask()" class="checkmarkIcon" src="img/add_task/checkmarkSymbolGrey.png" alt="Checkmark">
        </div>
        `;
        document.getElementById("subtaskInput").style.paddingRight = "4.5rem";
    } else if (input == "") {
        inputIcons.innerHTML = /*html*/ `
        <div id="inputIcons">
            <img id="addIcon" onclick="subtaskIcons()" src="img/add_task/addIcon.png" alt="Subtask-Symbol">
        </div>
        `;
    }
}

function closeSubtaskIcons() {
    document.getElementById("subtaskInput").value = "";
    subtaskInput();
}

function createSubtask() {
    let inputValue = document.getElementById("subtaskInput").value;
    document.getElementById("addedSubtask").innerHTML = /*html*/ `
    <div id="subtaskContent" class="finishedSubtask">
        <input type="checkbox">
        <p>${inputValue}</p>
        <img onclick="deleteFinishedSubtask()" src="img/add_task/closeSymbol.png" alt="Close-Icon">
    </div>
    `;
    document.getElementById("subtaskInput").value = "";
    subtaskInput();
}

function deleteFinishedSubtask() {
    document.getElementById("subtaskContent").innerHTML = "";
}

function openCategory() {
    document.getElementById("categoryTitle").style.paddingTop = "0.8rem";
    document.getElementById("categoryTitle").style.paddingBottom = "0.8rem";
    document.getElementById("rotateTriangle").style.rotate = "180deg";
    document.getElementById("categoryDiv").innerHTML = /*html*/ `
    <p class="grey" onclick="colorChoice()">New category</p>
    <p id="backoffice" class="turquoise" onclick="putInInput('backoffice')">Backoffice<span class="selectColor turquoise_point"></span></p>
    <p id="design" class="orange" onclick="putInInput('design')">Design<span class="selectColor orange_point"></span></p>
    <p id="marketing" class="blue" onclick="putInInput('marketing')">Marketing<span class="selectColor blue_point"></span></p>
    <p id="media" class="yellow" onclick="putInInput('media')">Media<span class="selectColor yellow_point"></span></p>
    <p id="sales" class="pink" onclick="putInInput('sales')">Sales<span class="selectColor pink_point"></span></p>
    `;
}

function colorChoice() {
    document.getElementById("categoryTitle").style.display = "none";
    document.getElementById("categoryTitle").style.margin = "0.8rem 0 1rem 0";
    document.getElementById("category").style.display = "none";
    document.getElementById("colorChoice").style.display = "flex";
    document.getElementById("createCategory").innerHTML = /*html*/ `
    <input id="categoryInput" class="categoryText" type="text" placeholder="New category name">
    <div class="subtaskIcons categoryIcons">
        <img onclick="returnCategory()" class="closeIcon" src="img/add_task/closeIcon.png" alt="Close-Icon">
        <img class="subtaskLine" src="img/add_task/greyVerticalLine.png" alt="Vertical Line">
        <img class="checkmarkIcon" src="img/add_task/checkmarkSymbolGrey.png" alt="Checkmark">
    </div>
    `;
    document.getElementById("colorChoice").innerHTML = /*html*/ `
    <span id="color1" onmouseover="colorFocus('color1')" onmouseout="colorUnfocus('color1')" class="green newCategory"></span>
    <span id="color2" onmouseover="colorFocus('color2')" onmouseout="colorUnfocus('color2')" class="red newCategory"></span>
    <span id="color3" onmouseover="colorFocus('color3')" onmouseout="colorUnfocus('color3')" class="violet newCategory"></span>
    <span id="color4" onmouseover="colorFocus('color4')" onmouseout="colorUnfocus('color4')" class="brightBlue newCategory"></span>
    <span id="color5" onmouseover="colorFocus('color5')" onmouseout="colorUnfocus('color5')" class="darkYellow newCategory"></span>
    `;
}

function returnCategory() {
    document.getElementById("categoryInput").value = "";
    document.getElementById("createCategory").style.display = "none";
    document.getElementById("colorChoice").style.display = "none";
    render();
}

function colorFocus(hoveredColor) {
    let hoverIn = {
        "transform": "scale(1.4)",
        "transition-duration": "0.15s",
        "border": "1px solid #000"
    };

    let color_1 = document.getElementById("color1");
    let color_2 = document.getElementById("color2");
    let color_3 = document.getElementById("color3");
    let color_4 = document.getElementById("color4");
    let color_5 = document.getElementById("color5");

    if (hoveredColor == "color1") {
        Object.assign(color_1.style, hoverIn);
    } else if (hoveredColor == "color2") {
        Object.assign(color_2.style, hoverIn);
    } else if (hoveredColor == "color3") {
        Object.assign(color_3.style, hoverIn);
    } else if (hoveredColor == "color4") {
        Object.assign(color_4.style, hoverIn);
    } else if (hoveredColor == "color5") {
        Object.assign(color_5.style, hoverIn);
    }
}

function colorUnfocus(unhoveredColor) {
    let hoverOut = {
        "transform": "scale(1)",
        "transition-duration": "0.15s",
        "border": "none"
    };

    let color_1 = document.getElementById("color1");
    let color_2 = document.getElementById("color2");
    let color_3 = document.getElementById("color3");
    let color_4 = document.getElementById("color4");
    let color_5 = document.getElementById("color5");

    if (unhoveredColor == "color1") {
        Object.assign(color_1.style, hoverOut);
    } else if (unhoveredColor == "color2") {
        Object.assign(color_2.style, hoverOut);
    } else if (unhoveredColor == "color3") {
        Object.assign(color_3.style, hoverOut);
    } else if (unhoveredColor == "color4") {
        Object.assign(color_4.style, hoverOut);
    } else if (unhoveredColor == "color5") {
        Object.assign(color_5.style, hoverOut);
    }
}

function putInInput(id) {
    document.getElementById("selectCategory").innerHTML = document.getElementById(id).innerHTML;
}

function close_addTask() {
    document.getElementById("greyBackground").style.display = "none";
    document.getElementById("addTask").innerHTML = "";
}

function randColor(){
    let backgroundColors = ["silver", "gray", "red", "purple", "fuchsia", "green", "lime", "yellow", "blue", "aqua"]
    let chosenColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    return chosenColor
};