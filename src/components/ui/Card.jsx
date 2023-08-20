import { Trash } from "lucide-react";
import React, { useState } from "react";

const Card = ({
  timestamp,
  notes,
  deleteNote,
  index,
  goToTimestamp,
  updateNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateNote(editedNotes); // Update the edited note
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNotes(notes); // Reset the edited notes to original
  };

  return (
    <div className="w-4/5 bg-[#f4dc72] min-h-[60px] h-auto rounded p-2">
      <div className="flex justify-between items-center">
        <p
          className="pl-2 hover:underline hover:text-red-500 cursor-pointer"
          onClick={() => goToTimestamp(timestamp)}
        >
          {timestamp}
        </p>
        <div className="flex items-center">
          {isEditing ? (
            <>
              <button className="text-blue-600 mr-2" onClick={handleSave}>
                ✅
              </button>
              <button className="text-red-600" onClick={handleCancel}>
                ❌
              </button>
            </>
          ) : (
            <>
              <button className="text-green-600 mr-2" onClick={handleEdit}>
                ✏️
              </button>
              <button
                className="text-red-600"
                onClick={() => deleteNote(index)}
              >
                <Trash />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="p-2 text-justify font-serif w-full h-auto">
        {isEditing ? (
          <textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            className="border rounded p-1 w-full"
          />
        ) : (
          notes
        )}
      </div>
    </div>
  );
};

export default Card;
