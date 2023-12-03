"use client";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useState, useEffect, useRef } from "react";
import ResultModal from "./Modal";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import Footer from "./Footer";

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
    <>
      <div
        className="flex items-center  flex-col p-2 gap-2 w-full min-h-screen "
        style={{
          backgroundImage:
            "radial-gradient( circle 1224px at 10.6% 8.8%,  rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2% )",
        }}
      >
        <h1 className="text-5xl font-bold text-center my-5 text-[#31304D] drop-shadow-lg">
          My Typo Test
        </h1>
        <div className="md:w-[60%] w-full flex flex-col p-2 gap-3 mt-4 ">
          <div className=" flex gap-3 justify-center items-center ">
            <Chip label={`Time: ${timer}`} className="shadow-md" />
            {!started && (
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="time"
                    name="time"
                    value={timer.toString()}
                    onChange={handleTimeChange}
                  >
                    <FormControlLabel
                      value="15"
                      control={<Radio color="default" />}
                      label="15 seconds"
                    />
                    <FormControlLabel
                      value="30"
                      control={<Radio color="default" />}
                      label="30 seconds"
                    />
                    <FormControlLabel
                      value="60"
                      control={<Radio color="default" />}
                      label="1 minute"
                    />
                    {/* Add more time options as needed */}
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </div>
          <div className="bg-white p-3 rounded-md shadow-lg">
            <p>{text}</p>
          </div>
          <textarea
            ref={textAreaRef}
            placeholder="Start Typing..."
            className="text-white bg-gray-600 min-h-[110px] p-2 rounded-md focus:outline-[#31304D] shadow-lg border-2"
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
      <Footer />
    </>
  );
};

export default TypingTest;
