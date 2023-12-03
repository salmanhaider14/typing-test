"use client";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useState, useEffect, useRef } from "react";
import ResultModal from "./Modal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const texts = [
  "The sun dipped below the horizon, casting a warm glow across the tranquil lake. As the last rays of light danced on the water's surface, a gentle breeze rustled the leaves of the surrounding trees. Nature seemed to exhale in the serenity of the moment, inviting contemplation and peace.",
  "The city skyline stood tall against the canvas of the evening sky, illuminated by the myriad lights that flickered like stars on the ground. Streets buzzed with the energy of urban life as people hurried to their destinations. Each intersection told a story of intersecting lives, weaving a tapestry of diversity in the heart of the metropolis.",
  "The ancient castle, perched atop the rugged hill, commanded a majestic view of the valley below. Its weathered stones whispered tales of centuries gone by, bearing witness to the ebb and flow of history. As the wind swept through the fortress, one could almost hear the echoes of knights and maidens in the air.",
  "In the heart of the bustling market, vendors proudly displayed their wares, creating a vibrant mosaic of colors and scents. The rhythmic chatter of bargaining and laughter filled the air, creating a symphony of commerce. It was a celebration of diversity, where cultures and traditions converged in a lively dance of exchange.",
  "The scientist peered through the microscope, captivated by the intricate dance of cells unfolding before their eyes. In this microscopic world, a universe of complexity revealed itself. Each cell, a tiny powerhouse of life, held the key to unlocking the mysteries of biology, promising breakthroughs that could reshape the future of medicine.",

  // Add more texts as needed
];

const TypingTest = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(15);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [netSpeed, setNetSpeed] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const textAreaRef: any = useRef(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (!started) {
      // Select a random text when the component mounts or when the user starts a new test
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      setText(randomText);
    }
  }, [started]);

  useEffect(() => {
    if (timer > 0 && started) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && started) {
      // Calculate results when the timer reaches 0
      calculateResults();
      setStarted(false);
      setInput("");
    }
  }, [timer, started]);

  const handleStart = () => {
    setStarted(true);
    setStartTime(new Date().getTime());
    setTimer(15); // Reset the timer when starting a new test
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue === text) {
      // Calculate results when the user finishes typing
      calculateResults();
      setStarted(false);
      setInput("");
    }
  };
  const handleTimeChange = (event: any) => {
    const selectedTime = Number(event.target.value);
    setTimer(selectedTime);
  };

  const calculateResults = () => {
    const endTime: any = new Date().getTime();
    const elapsedTime = (endTime - startTime) / 1000; // in seconds
    const typedWords = input.split(/\s+/).filter((word) => word !== "").length;
    const correctWords = text
      .split(/\s+/)
      .filter((word, index) => word === input.split(/\s+/)[index]).length;
    // Net Speed (WPM)
    const netSpeed = Math.round((typedWords / elapsedTime) * 60);
    setNetSpeed(netSpeed);
    // Accuracy
    const accuracy = Math.round((correctWords / typedWords) * 100);
    setAccuracy(accuracy);

    // Display or store the results as needed
    console.log("Net Speed:", netSpeed, "WPM");

    console.log("Accuracy:", accuracy, "%");
    if (textAreaRef.current) {
      textAreaRef.current.blur();
    }
    setTimer(15);
    handleOpenModal();
  };

  return (
    <div className="flex items-center  flex-col p-2 gap-2 w-full min-h-screen ">
      <h1 className="text-4xl font-bold text-center my-5 ">Typing Test</h1>
      <div className="md:w-[60%] w-full flex flex-col p-2 gap-3 mt-4 ">
        {!started && (
          <div>
            <FormControl fullWidth>
              <InputLabel id="time-select-label">Select Time</InputLabel>
              <Select
                labelId="time-select-label"
                id="time-select"
                value={timer}
                onChange={handleTimeChange}
                label="Select Time"
              >
                <MenuItem value={15}>15 seconds</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>1 minute</MenuItem>
                {/* Add more time options as needed */}
              </Select>
            </FormControl>
          </div>
        )}
        <div>
          <Chip label={`Time: ${timer}`} className="shadow-md" />
        </div>
        <div>
          <p>{text}</p>
        </div>
        <textarea
          ref={textAreaRef}
          placeholder="Start Typing..."
          className="text-white bg-gray-600 min-h-[100px] p-2 rounded-md focus:outline-blue-500 shadow-lg border-2"
          value={input}
          onChange={handleInputChange}
          onFocus={handleStart}
        />
      </div>

      <ResultModal
        netSpeed={netSpeed}
        accuracy={accuracy}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default TypingTest;
