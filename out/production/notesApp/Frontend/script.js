let notes = [];

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
        $("#titleInput").val("");
        $("#noteField").val("");

    } else {
        alert("Please enter title and text.");
    }
    renderList();
    renderTitles();    
}

function renderList() {
    let list = $("#notesList");
    list.empty();
    
     for (everyNote of notes) {
        let date = new Date(everyNote.timestamp).toLocaleString();
        list.append(`<li><h3>${everyNote.title}</h3> <br> 
        <p id="myNote" contentEditable="true">${date}</p>
        ${everyNote.text}
        <button class="deleteButton">Delete</button> <button class="updateButton" onClick="updateNote(${everyNote.id})">Update</button></li>`);
    }

    deleteFunction();
    addIdToLiElement();
    updateNote();
}   console.log(Date);

function renderTitles() {
    let list = $("#titleList");
    list.empty();
    for (everyNote of notes) {
        
        list.append(`<li id="titleLink">${everyNote.title}</li>`);
    }
    hideShowTitle();
}

function deleteFunction() {
    let deleteButtons = $(".deleteButton");

    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNote(notes[i]);
            notes.splice(i,1); 
        })
    }
}

$(function(){

    $('#searchBar').keyup(function(){
        
        var searchText = $(this).val();
        
        $('#notesList > li').each(function(){
            
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            
            $(this).toggle(showCurrentLi);            
        });     
    });
});

function sort(selector) { 
    
    let choice = $('#filterText').val();
        
        //order list alphabeticly A-Ö
        if (choice == "1") {
            $(selector).children("li").sort(function(a, b) { 
                var A = $(a).text().toUpperCase(); 
                var B = $(b).text().toUpperCase(); 
                return (A < B) ? -1 : (A > B) ? 1 : 0; 
            }).appendTo(selector); 
        } 
        // order list alphabeticly Ö-A
        else if(choice == "2"){
            $(selector).children("li").sort(function(b, a) { 
                var A = $(a).text().toUpperCase(); 
                var B = $(b).text().toUpperCase(); 
                return (A < B) ? -1 : (A > B) ? 1 : 0; 
            }).appendTo(selector); 
        }   
        //order list latest
        else if(choice == "3"){
            $(selector).children("li").sort(function(b, a) {
                var A = parseInt(a.getAttribute('data-value'));
                var B = parseInt(b.getAttribute('data-value'));
                return (A < B) ? -1 : (A > B) ? 1 : 0; 
            }).appendTo(selector);

                
        }
        //order list oldest
        else if(choice == "4") {
            $(selector).children("li").sort(function(a, b) {
                var A = parseInt(a.getAttribute('data-value'));
                var B = parseInt(b.getAttribute('data-value'));
                return (A < B) ? -1 : (A > B) ? 1 : 0; 
            }).appendTo(selector);
        }
}    
    $('#filterText').change(function() { 
    sort("#notesList"); 
    });

function addIdToLiElement(){
    $("#notesList li").attr("data-value", function(i) {
        return (i);
    });
}

function hideShowTitle() {
    var el = $( 'ul' );

        $( el )
            .find( 'li:gt(9)' )
            .hide()
            .parent()
            .append( 
                $( '<li>more</li>' ).on( 'click', function() {              
                    var items = $( this ).siblings( ':hidden' );
                    
                    if ( items.length ) items.slice( 0, 10 ).show();                    
                    else $( el ).find( 'li:gt(9)' ).not( this ).hide();
                    
                    $( this ).text( $( this ).siblings( ':hidden' ).length ? 'more' : 'less' );                 
                })
             );

}

function updateNote(everyNote) {
    let text = $("#editText").val();

    let newNote = {
        id: everyNote,
        text: text
    }

    console.log(text);
    console.log(everyNote);

    updateNoteInDb(newNote);
}

async function addItemToDB(notes) {
    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(notes)
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
    method: "PUT",
    body: JSON.stringify(note)
    });
}

async function deleteNote(notes) {
    
    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(notes)
    });
    location.reload();
}

getNotes();