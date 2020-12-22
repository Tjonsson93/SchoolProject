


let notes = [];
let arrayOfFiles = [];
getNotes();
getFiles();


async function addNote(e) {
    e.preventDefault();

    let files = document.querySelector('input[type=file]').files;

    let formData = new FormData();


    for(let file of files) {
        formData.append("files", file, file.name);
    }

    let uploadResult = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData 

    });


    let fileInput = await uploadResult.text(); 


    let titleInput = $("#titleInput").val();
    let textInput = $("#noteField").val();

    if (titleInput.length > 0 && textInput.length > 0) {

        let note = {
            title: titleInput,
            text: textInput,
        }

        let myFile = {
            myFile: fileInput
        }

        notes.push(note);
        if(myFile != null){
            arrayOfFiles.push(myFile)
        }
        addItemToDB(note);
        addFileToDB(myFile);

    } else {
        alert("Please enter title and text")

    }

    if (fileInput )
    location.reload();
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
        
        
        list.append(`<li><h3>${everyNote.title}</h3> <br> 
        <p id="myNote" contentEditable="true">${date}</p>
        <input id="editText" name="edit" type="text" placeholder="${everyNote.text}"></input>
        <button class="deleteButton">Delete</button> <button class="updateButton" onClick="updateNote(${everyNote.id})">Update</button></li>`);

        for (everyFile of arrayOfFiles) {
            if(everyFile.notesId === everyNote.id){
                list.append(`<li><img id="imgsrc" src=${everyFile.myFile}</li>`);
            }
            
        }

    }
    
    deleteFunction();
    deleteFile();
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

    function updateNote(everyNote) {
        let text = $("#editText").val();
    
        let newNote = {
            id: everyNote,
            text: text
        }
    
        updateNoteInDb(newNote);
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

function deleteFile() {
    let deleteButtons = $(".deleteButton");
    
    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            //let parentElement = this.parentElement;
            //parentElement.style.visibility = "none";
            $('#imgsrc').hide();
            deleteFileFromDB(arrayOfFiles[i]);
            arrayOfFiles.splice(i,1); 
            
        });
    }

}

async function addItemToDB(note) {
    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(note)
    });
}

async function addFileToDB(myFile) {
    let result = await fetch('rest/files', {
        method: 'POST',
        body: JSON.stringify(myFile)
    });
}

async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();
    
    renderList();
    renderTitles();
}

async function getFiles() {
    let result = await fetch('/rest/files');
    arrayOfFiles = await result.json();
}



async function getFilesFromNotesId(notesId) {
    notesId = note.id
    let result = await fetch('rest/files')
    files = await result.json();
    

}


async function updateNoteInDb(note) {
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
    location.reload();
}

async function deleteFileFromDB(file) {
    let result = await fetch("/rest/files/id", {
        method: "DELETE",
        body: JSON.stringify(file)
    });
    location.reload();
}

getNotes();