import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import { AppContext } from "../App";
import { useForm } from "react-hook-form";
import Card from "../components/ui/Card";
import { Trash } from "lucide-react";
import NotesPDF from "../components/NotesPDF";
import { PDFViewer } from "@react-pdf/renderer";

const Home = () => {
  const { url, notes, setNotes, isOptions, setOptions } =
    useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [currTime, setCurrTime] = useState(0); // State for the timestamp

  const playerRef = React.createRef();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const onSubmit = (data) => {
    setCurrTime(playerRef.current.getCurrentTime());
    const formattedTime = formatTime(currTime);
    const newNote = {
      timestamp: formattedTime,
      note: data.notes,
    };
    setNotes([...notes, newNote]);
    console.log(newNote.timestamp);
  };

  const deleteHandle = (index) => {
    const updatedNotes = [...notes]; // Create a copy of the notes array
    updatedNotes.splice(index, 1); // Remove the element at the specified index
    setNotes(updatedNotes); // Update the notes state
    // setNotes(notes.splice(index, 1));
    console.log(index);
  };

  const handleOptionOpen = () => {
    setOptions(!isOptions);
    console.log(isOptions);
  };
  const [playing, setPlaying] = useState(false);

  const goToTimestamp = (timestamp) => {
    if (playerRef.current) {
      const splitTime = timestamp.split(":");
      const minutes = parseInt(splitTime[0]);
      const seconds = parseInt(splitTime[1]);
      const totalSeconds = minutes * 60 + seconds;
      playerRef.current.seekTo(totalSeconds);
      setPlaying(true);
    }
  };

  const updateNote = (index, editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index].note = editedNote;
    setNotes(updatedNotes);
  };

  const clearAllNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    reset();
  }, [notes]);

  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className=" relative w-screen min-h-screen flex flex-col justify-start items-center">
      <Header option={handleOptionOpen}></Header>

      <div
        className={
          isOptions
            ? "absolute bg-gray-400 w-[232px] h-[200px] top-[61px] rounded right-[220px] transition-all delay-75 flex flex-col justify-center items-center"
            : "w-0"
        }
      >
        {isOptions && (
          <div className="flex flex-col justify-center items-center w-3/5 gap-2 text-center">
            <div className=" w-[150px] border rounded p-2 border-black ">
              <button onClick={() => setShowPDF(true)}>Download</button>
            </div>
            <div className="flex justify-center w-[150px] items-center p-2 text-red-700 border border-red-700 rounded">
              <Trash />
              <button onClick={clearAllNotes}>Clear notes</button>
            </div>
          </div>
        )}
      </div>
      {showPDF && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center">
          <PDFViewer width="800" height="600">
            <NotesPDF notes={notes} />
          </PDFViewer>
          <button
            className="absolute top-4 right-4 bg-red-700 text-white px-3 py-2 rounded"
            onClick={() => setShowPDF(false)}
          >
            Close PDF
          </button>
        </div>
      )}
      <div className="w-4/5 flex justify-between items-start">
        <div className="mt-6 flex flex-col justify-center items-center gap-10">
          <div className=" bg-gray-400">
            <ReactPlayer
              controls={true}
              url={url}
              ref={playerRef}
              width={758}
              height={426}
              playing={playing} // Pass the playing state as a prop
              onPause={() => setPlaying(false)} // Pause the video when it's paused
            />
          </div>
          <div className=" mx-auto w-full h-[100px] flex flex-col gap-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center"
            >
              <input
                disabled={!url}
                className=" w-4/5 h-[100px] border border-black rounded p-2 "
                placeholder={
                  url ? "Write notes here" : "Add video URL to start writing"
                }
                type="text"
                {...register("notes", { required: true })}
              />
              <button
                className="bg-red-700 p-2 text-white rounded-md w-full mt-2 hidden"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 mx-auto w-1/2 max-h-[594px] overflow-x-hidden">
          <div className="border border-black py-1 px-2 rounded text-center mx-auto mb-3 w-[120px]">
            <h1 className="font-semibold text-sm">
              Total Notes: <span className="text-red-700">{notes.length}</span>
            </h1>
          </div>

          <div className="mt-3 grid gap-3 justify-items-center">
            {notes.map((element, index) => {
              return (
                <Card
                  key={index}
                  timestamp={element.timestamp}
                  notes={element.note}
                  deleteNote={deleteHandle}
                  index={index}
                  goToTimestamp={goToTimestamp}
                  updateNote={(editedNote) => updateNote(index, editedNote)}
                ></Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
