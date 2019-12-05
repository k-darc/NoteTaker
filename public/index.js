console.log("Hello");
var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    body: $noteText.val()
  };

  $.ajax({
    url: "/api/notes",
    data: newNote,
    method: "POST"
  }).then(function(data) {
    location.reload();
  });
};

// Delete
var handleNoteDelete = function(event) {
  event.stopPropagation();

  var note = $(this)
    .parents(".list-group-item")
    .data();

  $.ajax({
    url: "/api/notes/" + note.id,
    method: "DELETE"
  }).then(function(data) {
    location.reload();
  });
};

// Update
var handleNoteUpdate = function(event) {
  event.stopPropagation();
  var note = $(this)
    .parents(".list-group-item")
    .data();

  var updatedNote = {
    title: $(".note-title")
      .val()
      .trim(),
    body: $(".note-textarea")
      .val()
      .trim()
  };

  var id = $(this).data("id");

  $.ajax({
    url: "api/notes/" + note.id,
    method: "PUT",
    data: updatedNote
  }).then(function() {
    console.log("Note updated!");
    location.assign("/notes");
  });
};

// Renders note
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $titleDiv = $("<div>");
    var $titleSpan = $("<span class='font-weight-bold'>").html(
      `<h4>${note.title}</h4> <p>${note.body}</p>`
    );
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    ).css("margin-left", "5px");
    var $updateBtn = $(
      "<i href='/notes/" +
        note.id +
        "'" +
        "class='fas  float-right text-warning update-note'></i>"
    );

    var $noteP = $("<p class='mt-2'>").text(note.text);

    $titleDiv.append($titleSpan, $delBtn, $updateBtn);

    $li.append($titleDiv, $noteP);
    noteListItems.push($li);
  }

  $noteList.prepend(noteListItems);
};

// Database Notes on a browser
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".delete-note", handleNoteDelete);

// Initial note table
getAndRenderNotes();
