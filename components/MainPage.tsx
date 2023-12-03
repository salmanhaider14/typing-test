"use client";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useState, useEffect, useRef } from "react";
import ResultModal from "./Modal";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import Footer from "./Footer";
import { Open_Sans } from "next/font/google";

const texts = [
  "The sun dipped below the horizon, casting a warm glow across the tranquil lake. As the last rays of light danced on the water's surface, a gentle breeze rustled the leaves of the surrounding trees. Nature seemed to exhale in the serenity of the moment, inviting contemplation and peace.",
  "The city skyline stood tall against the canvas of the evening sky, illuminated by the myriad lights that flickered like stars on the ground. Streets buzzed with the energy of urban life as people hurried to their destinations. Each intersection told a story of intersecting lives, weaving a tapestry of diversity in the heart of the metropolis.",
  "The ancient castle, perched atop the rugged hill, commanded a majestic view of the valley below. Its weathered stones whispered tales of centuries gone by, bearing witness to the ebb and flow of history. As the wind swept through the fortress, one could almost hear the echoes of knights and maidens in the air.",
  "In the heart of the bustling market, vendors proudly displayed their wares, creating a vibrant mosaic of colors and scents. The rhythmic chatter of bargaining and laughter filled the air, creating a symphony of commerce. It was a celebration of diversity, where cultures and traditions converged in a lively dance of exchange.",
  "The scientist peered through the microscope, captivated by the intricate dance of cells unfolding before their eyes. In this microscopic world, a universe of complexity revealed itself. Each cell, a tiny powerhouse of life, held the key to unlocking the mysteries of biology, promising breakthroughs that could reshape the future of medicine.",

  // Add more texts as needed
];
const numberTexts = [
  "in a quaint town, there are 15 cozy cafes, each offering a unique blend of coffee. locals often gather at table 7, the communal spot where friends share stories and laughter. the town's population, as of the last census, is approximately 3,500 residents.",
  "the train to destination x departs platform 4 at 8:45 am every day. the journey covers 120 kilometers, passing through 6 charming villages along the way. travelers often enjoy the scenic views and take photos at mile marker 22.",
  "at the science fair, students showcased 10 innovative projects, ranging from solar-powered gadgets to experiments with liquid nitrogen. the event drew a crowd of 500 attendees, including 25 judges evaluating the participants' creativity and scientific prowess.",
  "during the annual book festival, 30 authors gathered to discuss their works, engaging with an audience of 200 book enthusiasts. the library displayed a collection of over 5,000 books, attracting avid readers from neighboring towns.",

  // Add more texts with numbers as needed
];

const punctuationTexts = [
  "The storm raged on, thunder echoing through the night, lightning illuminating the sky in erratic bursts. Rain poured relentlessly, drenching everything in its path. Trees swayed violently, their branches dancing to the rhythm of the wind. A lone figure, clad in a tattered coat, braved the tempest, forging ahead with determination.",
  "Silence. A heavy, oppressive silence enveloped the room. Not a word was spoken, yet the tension hung in the air like a thick fog. Eyes darted nervously, expressions tense. The ticking of the clock echoed, each second feeling like an eternity. Suddenly, a door slammed shut, shattering the silence, and chaos erupted.",
  "Laughter bubbled from the courtyard, punctuated by the clinking of glasses and the occasional burst of music. Friends gathered, reminiscing about old times, creating new memories. The scent of barbecue wafted through the air, mingling with the sweet aroma of blooming flowers. Night fell, and the stars emerged, witnessing the joy that punctuated the evening.",
  "Footsteps echoed in the deserted alley, each step calculated and purposeful. Shadows danced on the brick walls, concealing the figure's identity. A cat hissed in the distance, adding an eerie punctuation to the quiet night. The silhouette slipped into the shadows, disappearing as mysteriously as it had appeared.",
  "The courtroom hushed as the judge delivered the verdict. Tension hung thick, and every eye was fixed on the accused. A single gavel strike echoed, sealing a fate marked by exclamation points of finality. Gasps punctuated the silence as reality set in, the weight of the sentence sinking in like a period at the end of a somber story.",
  // Add more texts with punctuation as needed
];
const numberAndPuncTexts = [
  "In the year 2022, Jane's company, XYZ Industries, achieved a record-breaking revenue of $5.7 million! The team celebrated with a grand party, and employees received bonuses ranging from $500 to $2,000. Jane, the CEO, delivered an inspiring speech, emphasizing the importance of teamwork and dedication. The company's stock price rose by 15% after the announcement.",
  "The recipe for the delicious chocolate cake requires 2 cups of flour, 1.5 cups of sugar, and 3 eggs. Preheat the oven to 350°F and grease the baking pan with butter. Mix the ingredients thoroughly and bake for 30-35 minutes. Don't forget to add a pinch of salt for enhanced flavor. Once done, let the cake cool for 10 minutes before frosting it with a generous layer of chocolate ganache.",
  "The deadline for submitting the project proposal is Friday, March 10th, 2023, at 5:00 PM sharp! Late submissions will not be considered. Please ensure that all documents are properly formatted and include relevant data and statistics. If you have any questions, contact our support team at support@example.com or call us at (555) 123-4567.",
  "The hiking trail offers breathtaking views of the mountains, with elevations ranging from 2,000 to 4,500 feet. Ensure you have enough water, snacks, and proper hiking gear before embarking on the journey. The trail markers are numbered, so follow them closely. Remember to take breaks and enjoy the scenery along the way. The sunset at peak 7 is especially stunning.",
  "The quarterly report highlighted a 10% increase in sales compared to the previous quarter. Expenses, however, rose by 8%, impacting the overall profit margin. The marketing team plans to launch a new campaign in Q4 to boost sales further. Analysts predict a steady growth trajectory for the company in the coming months. Stay tuned for more updates on our financial performance!",
];
const openSans = Open_Sans({
  weight: "600",
  subsets: ["cyrillic"],
});

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
  const [textType, setTextType] = useState("simple");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includePunctuation, setIncludePunctuation] = useState(false);

  const handleTextTypeChange = (event: any) => {
    setTextType(event.target.value as string);
    setStarted(false); // Reset started status when text type changes
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (!started) {
      let selectedTexts: string[];

      if (includeNumbers && includePunctuation) {
        // Use texts array containing texts with both numbers and punctuation
        selectedTexts = numberAndPuncTexts;
      } else if (includeNumbers) {
        // Use number texts array
        selectedTexts = numberTexts;
      } else if (includePunctuation) {
        // Use punctuation texts array
        selectedTexts = punctuationTexts;
      } else {
        // Use normal texts array
        selectedTexts = texts.map((text) => text.toLowerCase());
      }

      const randomText =
        selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
      setText(randomText);
    }
  }, [started, includeNumbers, includePunctuation]);

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

    // handleOpenModal();
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
        <h1
          className={`text-5xl font-bold text-center my-5 text-[#31304D] drop-shadow-lg ${openSans.className}`}
        >
          TypeMasteryHub
        </h1>
        <div className="md:w-[60%] w-full flex flex-col p-2 gap-3 mt-4 ">
          <div className=" flex gap-3 justify-center items-center flex-col md:flex-row w-full">
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
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeNumbers}
                    onChange={(e: any) => setIncludeNumbers(e.target.checked)}
                    color="primary"
                  />
                }
                label="Numbers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includePunctuation}
                    onChange={(e: any) =>
                      setIncludePunctuation(e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Punctuation"
              />
            </div>
          </div>
          <Divider />
          <div className="bg-white p-3 rounded-md shadow-lg mt-3">
            {/* <p>{text}</p> */}
            {text.split(/\s+/).map((word, index) => (
              <span
                key={index}
                className={
                  input.split(/\s+/)[index] === word
                    ? " text-slate-600"
                    : input.split(/\s+/)[index] !== undefined
                    ? "text-red-500"
                    : ""
                }
              >
                {word}
                {index !== text.split(/\s+/).length - 1 && " "}
              </span>
            ))}
          </div>
          {timer > 0 && (
            <textarea
              ref={textAreaRef}
              placeholder="Start Typing..."
              className="text-white bg-gray-600 min-h-[110px] p-2 rounded-md focus:outline-[#31304D] shadow-lg border-2"
              value={input}
              onChange={handleInputChange}
              onFocus={handleStart}
            />
          )}
        </div>
        {timer === 0 && !started && (
          <Box
            className="bg-[#31304D] flex flex-col gap-3 outline-none md:w-[60%] w-full"
            style={{
              padding: "20px",
              border: "2px solid white",
              borderRadius: "8px",
            }}
          >
            <h2
              id="modal-modal-title "
              className="text-center font-bold text-2xl text-white"
            >
              Result
            </h2>
            <Divider />
            <p id="modal-modal-description" className="text-white text-xl">
              wpm: <span className="text-yellow-400"> {netSpeed} WPM</span>
            </p>
            <p className="text-white text-xl">
              {" "}
              acc: <span className="text-yellow-400"> {accuracy}% </span>
            </p>
            <Divider />
            <Button
              variant="contained"
              className="bg-[#EE7214] hover:bg-orange-700"
              onClick={() => setTimer(15)}
              endIcon={<ReplayIcon />}
              color="success"
            >
              Try Again
            </Button>
          </Box>
        )}
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
