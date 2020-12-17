let notes = [];

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
        alert("Please enter title and text")

    }

    renderList();
    renderTitles();
}

function addIdToLiElement(){
    $("#notesList li").attr("data-value", function(i) {
        return (i);
    });
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
        <button class="deleteButton">Delete</button> <button class="updateButton">Edit</button></li>`);  
    }
    deleteFunction();
    addIdToLiElement();
    updateNote();
}

//renders titles in different list
function renderTitles() {
    let list = $("#titleList");
    list.empty();
    for (everyNote of notes) {
        
        list.append(`<li id="titleLink">${everyNote.title}</li>`);
    }
    hideShowTitle();
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

function updateNote() {
    let allUpdateButtons = $(".updateButton");
    allUpdateButtons.empty();
    
    for (let i = 0; i < allUpdateButtons.length; i++) {
        $(allUpdateButtons[i]).click(function () {

            updateNoteInDb(notes);
        });
    }
}

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

async function updateNoteInDb(notes) {
    let noteToUpdate = {
        id: note.id
    }
    let result = await fetch("/rest/notes/id", {
        method: "PUT",
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