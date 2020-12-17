let notes = [];
getNotes();

//adding a new note to the list.
function addNote() {
    let titleInput = $("#titleInput").val();
    let textInput = $("#noteField").val();
    
    if (titleInput.length > 0 && textInput.length > 0) {
        
        let note = {
            title: titleInput,
            text: textInput
        }

        notes.push(note);
        addItemToDB(note);

    } else {

    }

    renderList();
    renderTitles();
}

// function to display the list of notes on the page.
function renderList() {
    let list = $("#notesList");
    list.empty();
    for (everyNote of notes) {
        let date = new Date(everyNote.timestamp).toLocaleString();
        
        list.append(`<li id="noteId"> <h3>${everyNote.title}</h3> <br>
        published: ${date} <br> 
        <p>${everyNote.text}</p>
        <button class="deleteButton" onClick="window.location.reload()">Delete</button> <button class="updateButton" onClick="">Edit</button></li>`
        );  

    }
    deleteFunction();
}

//renders titles in different list
function renderTitles() {
    let list = $("#titleList");
    list.empty();
    for (everyNote of notes) {
        
        
        list.append(`<li id="titleLink">${everyNote.title}</li>`);
    }
}

// searchbar function
$(function(){

    $('#searchbar').keyup(function(){
        
        var searchText = $(this).val();
        
        $('#notesList > li').each(function(){
            
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            
            $(this).toggle(showCurrentLi);            
        });     
    });
});

//drop down menu
$(function() {
    $("#filterText").change(function() {
      var choice = $('#filterText').val();
      if (choice != "all") $("ul").show().not('#' + choice).hide();
      else $("ul").show();
    });
});

function updateNote(){
    let updateButtons = $(".updateButton");
    let titleInput = $("#titleInput").val();
    let textInput = $("#noteField").val();
    
    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            console.log(notes[i]);
            deleteNote(notes[i]);
            notes.splice(i,1); 
        });
        
        let note = {
            title: titleInput,
            text: textInput
        }

        notes.push(note);
        addItemToDB(note);
    }

    renderList();
    renderTitles();
}
//drop down menu
$(function() {
    $("#filterText").change(function() {
      var choice = $('#filterText').val();
      if (choice != "all") $("ul").show().not('#' + choice).hide();
      else $("ul").show();
    });
});




//deletes from notes
function deleteFunction() {
    let deleteButtons = $(".deleteButton");
    
    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            console.log(notes[i]);
            deleteNote(notes[i]);
            notes.splice(i,1); 
        });
    }
}

async function addItemToDB(note) {
    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(note)
    });
}

async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();
    
    renderList();
    renderTitles();
}

async function updateNoteInDb(note) {
    let result = await fetch("/rest/notes/id", {
        method: "put",
        body: JSON.stringify(note)
    });
}

async function deleteNote(note) {
    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
}

getNotes();