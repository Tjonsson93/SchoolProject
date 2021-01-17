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


function renderList() {

    $("#notesList").empty();
    for(let i = 0 ; i < notes.length ; i++){
        let date = new Date(notes[i].timestamp).toLocaleString();
        let container = `<li id="myNote">`
        container += `<h3>${notes[i].title}</h3> <br> ${date}
        <textarea class="editText" >${notes[i].text}</textarea>`;
         

    for(let a = 0; a < arrayOfFiles.length; a++){
        
        if(arrayOfFiles[a].notesId == notes[i].id){
            
            container += `<img id="imgsrc" src=${arrayOfFiles[a].myFile} width="400" height="300">`;
        
        }
        
    }
    container += `<a href="${arrayOfFiles.myFile}" download>${arrayOfFiles.myFile}</a><button class="deleteButton">Delete</button> <button class="updateButton">Update</button></li>`;
    $("#notesList").append(container);
    }
    deleteFunction();
    addIdToLiElement();
    updateNote();
}



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


function deleteFunction() {
    let deleteButtons = $(".deleteButton");
    
    for (let i = 0; i < deleteButtons.length; i++) {
            $(deleteButtons[i]).click(function () {
        if(confirm("You are about to delete this note, continue?")){
            deleteNote(notes[i]);
            notes.splice(i,1); 
            $(this).parent().remove();

            getNotes();
            getFiles();     
        }
            
    })
    }
   
}
function deleteFile() {
    let deleteButtons = $(".deleteButton");
    
    for (let i = 0; i < deleteButtons.length; i++) {
            $(deleteButtons[i]).click(function () {
        if(confirm("Are you sure?")){     
            deleteFileFromDB(arrayOfFiles[i]);
            arrayOfFiles.splice(i,1);
            
            getNotes();
            getFiles(); 
        }
    })
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
    let result = await fetch("/rest/notes/:id", {
    method: "PUT",
    body: JSON.stringify(note)
    });
    
}


function updateNote(){
    let updateButton = $(".updateButton");
    for(let i = 0; i < updateButton.length; i++){
        $(updateButton[i]).click(function(){
            let newText = $(".editText").val();
            notes[i].text = newText;
            updateNoteInDb(notes[i]);
        });
    }
}  
        
async function deleteNote(note) {
    let result = await fetch("/rest/notes/:id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
    location.reload();
}

async function deleteFileFromDB(file) {
    let result = await fetch("/rest/files/:id", {
        method: "DELETE",
        body: JSON.stringify(file)
    });
    location.reload();
}

getNotes();
