

// array for the notes
let notes = [];

// array for file input
let filesRender = [];

//array for the files
let filesToNote = [];

getFiles();
getNotes();    




async function addNote() {
    

    let files = document.querySelector('input[type=file]').files;

    let formData = new FormData();


    for(let file of files) {
        formData.append("files", file, file.name);
    }

    /*for(let p of formData){
        console.log(p);
    } */


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

        let file = {
            myFile: fileInput
            
            
        }


        filesRender.push(file);
       
        notes.push(note);
        addItemToDB(note);
        addFileToDB(file);
        
    } else {
        alert("Please enter title and text")

    }

    
    console.log(filesRender);
    renderList();
    renderTitles();
    

}




















//adding a new note to the list.

                
            
            
            
//adding a data-value to the li element when added to be able to sort
//the list in frontend by latest added and oldest added
function addIdToLiElement(){
    $('#notesList li').attr('data-value', function(i) {
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
        <li><img src="${everyFile.myFile}" alt="post-image" width="200" height="150"></li>
        <button class="deleteButton">Delete</button></li>`);
        
    }
    
      
    deleteFunction();
    addIdToLiElement();
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
//frontend function for titlelist, to be able to se more or less content
//and as default not be able to see more then 9 elements
function hideShowTitle() {
    var el = $( '#titleList' );

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


function hideShowTitle() {
    var el = $( 'ul' );

//drop down menu to order elements in list
    
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




async function addFileToDB(myFile) {

    let result = await fetch('/rest/files', {
        method: 'POST',
        body: JSON.stringify(myFile)
    });
}



async function addItemToDB(note) {
    
    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(notes)
    });

    

}

async function getFiles() {
    let result = await fetch("/rest/notes");
    filesList = await result.json();
    renderList();
    renderImages();
}


async function deleteNote(note) {
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

async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();
    
    renderList();
    renderTitles();
}



