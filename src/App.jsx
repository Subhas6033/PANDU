import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Microphone from './components/Microphone';
import Controls from './components/Controls';
import UserGuide from './components/UserGuide';
import Footer from './components/Footer';

function App() {
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript.toLowerCase();
                handleCommand(transcript);
                stopListening();
            };
        } else {
            console.warn("Speech Recognition API not supported in this browser.");
        }
    }, []);

    const startListening = async () => {
        if (!recognitionRef.current) return;

        try {
            recognitionRef.current.start();
            await startVolumeDetection();
        } catch (error) {
            console.error("Speech recognition error:", error);
        }
    };

    const startVolumeDetection = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 64;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        detectVolume();
    };

    const detectVolume = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            sum += dataArrayRef.current[i];
        }

        const average = sum / dataArrayRef.current.length;
        setVolume(average);

        requestAnimationFrame(detectVolume);
    };

    const stopListening = () => {
        // Stop speech recognition
        if (recognitionRef.current) {
            recognitionRef.current.onend = null; // prevent double triggers
            try {
                recognitionRef.current.stop();
            } catch (e) { }
        }

        // Stop volume detection
        stopVolumeDetection();

        setIsListening(false);
    };

    const stopVolumeDetection = () => {
        audioContextRef.current?.close();
        audioContextRef.current = null;

        setIsListening(false);

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const panduSpeech = (message) => {
        const speech = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        // Try to find a good voice
        const voice = voices.find(v => v.name.includes("Google US English")) || voices[0];
        if (voice) speech.voice = voice;

        speech.text = message;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    };

    const handleCommand = (transcript) => {
        console.log("Command:", transcript);

        if (transcript.includes("hello pandu") || transcript.includes("hii pandu")) {
            panduSpeech("hello sir! how are you");
            if (transcript.includes("how are you")) {
                panduSpeech("i am fine what about you");
            }
        }
        else if (transcript.includes("i am fine")) {
            panduSpeech("that's great! what can i do for you?");
        }
        else if (transcript.includes("how are you")) {
            panduSpeech("i am fine! what abou you?");
        }
        else if (transcript.includes("who creates you") || transcript.includes("who create you")) {
            panduSpeech("i am created in 20th april 2024 by one and only developer subhas");
        }
        else if (transcript.includes("tell me about yourself") || transcript.includes("who are you")) {
            panduSpeech("i am an ai asistant created by subhas, i can do various types of work like i can play songs, search anything by your voice command etc");
        }
        else if (transcript.includes("can you help me")) {
            panduSpeech("yeah sure, how can i help you?");
        }
        /* Youtube + Music + Video section */
        else if (transcript.includes("open youtube")) {
            panduSpeech("opening youtube !");
            window.open("https://www.youtube.com/");
        }
        else if (transcript.includes("play the")) {
            panduSpeech("here's your results!");
            // Extract song name: remove "play the"
            let query = transcript.replace("play the", "").trim();
            query = query.split(" ").join("+");
            window.open(`https://www.youtube.com/results?search_query=${query}`);
        }
        else if (transcript.includes("play the favourite song")) {
            panduSpeech("playing your favourite song!");
            window.open("https://youtu.be/Umqb9KENgmk");
        }
        else if (transcript.includes("play a song") || transcript.includes("play a song for me")) {
            const songs = [
                "https://www.youtube.com/watch?v=YA0fzrnKmCs&list=RDYA0fzrnKmCs&start_radio=1",
                "https://www.youtube.com/watch?v=vZ5Dfc1N17M",
                "https://www.youtube.com/results?search_query=Malang",
                "https://www.youtube.com/watch?v=-prV7sth9io&list=RD-prV7sth9io&start_radio=1",
                "https://www.youtube.com/watch?v=wnfUpOch510&list=RD-prV7sth9io&index=5",
                "https://www.youtube.com/watch?v=UIamU3ELCd8&list=RD-prV7sth9io&index=7",
                "https://www.youtube.com/watch?v=2uA4XOmsrrA&list=RD-prV7sth9io&index=8",
                "https://www.youtube.com/watch?v=AX7t8ZwroHQ&list=RD-prV7sth9io&index=9",
                "https://www.youtube.com/watch?v=MCVDTLMQBmc&list=RD-prV7sth9io&index=12",
                "https://www.youtube.com/watch?v=8NbpwbrJrFA",
                "https://www.youtube.com/watch?v=GvXDq-P1NB8",
                "https://www.youtube.com/watch?v=iid7cxx0keU",
                "https://www.youtube.com/watch?v=zFvLoiq58Nk&list=RDMMzFvLoiq58Nk&start_radio=1",
                "https://www.youtube.com/watch?v=TL3jqMCFKDc&list=RDMMzFvLoiq58Nk&index=2",
                "https://www.youtube.com/watch?v=zPdMUNoXnB4&list=RDMMzFvLoiq58Nk&index=4",
                "https://www.youtube.com/watch?v=weowPNBgNZ4&list=RDMMzFvLoiq58Nk&index=5",
                "https://www.youtube.com/watch?v=4IWOO9luQr4&list=RDMMzFvLoiq58Nk&index=6",
                "https://www.youtube.com/watch?v=QJpfLoGMgqU&list=RDMMzFvLoiq58Nk&index=10",
                "https://www.youtube.com/watch?v=J3vd-SQvORQ&list=RDMMzFvLoiq58Nk&index=11",
                "https://www.youtube.com/watch?v=E17IF68WoPc&list=RDMMzFvLoiq58Nk&index=14",
            ];
            const randomSong = songs[Math.floor(Math.random() * songs.length)];
            panduSpeech("playing a song for you!");
            window.open(randomSong);
        }
        /* Facebook */
        else if (transcript.includes("open my facebook profile")) {
            panduSpeech("opening your facebook profile sir!");
            window.open("https://www.facebook.com/profile.php?id=100049621998517");
        }
        else if (transcript.includes("open facebook")) {
            panduSpeech("openinig facebook !");
            window.open("https://www.facebook.com");
        }
        /* Google */
        else if (transcript.includes("open google")) {
            panduSpeech("opening google !");
            window.open("https://www.google.com");
        }
        /* Search anything */
        else if (transcript.includes("search for")) {
            panduSpeech("here's your results!");
            let query = transcript.replace("search for", "").trim();
            query = query.split(" ").join("+");
            window.open(`https://www.google.com/search?q=${query}`);
        }
        /* Instagram */
        else if (transcript.includes("open my instagram profile")) {
            panduSpeech("opening your instagram sir!");
            window.open("https://www.instagram.com/goalkeepersubhas/");
        }
        else if (transcript.includes("open instagram")) {
            panduSpeech("opening instagram");
            window.open("https://www.instagram.com/");
        }
        /* Github */
        else if (transcript.includes("open my github profile")) {
            panduSpeech("opening your github profile sir!");
            window.open("https://github.com/Subhas6033");
        }
        else if (transcript.includes("open github")) {
            panduSpeech("opening github");
            window.open("https://github.com/");
        }
        /* Telegram */
        else if (transcript.includes("open telegram")) {
            panduSpeech("opening telegram!");
            window.open("https://web.telegram.org/k/")
        }
        /* Whatsapp */
        else if (transcript.includes("open whatsapp")) {
            panduSpeech("opening whatsapp!");
            window.open("https://web.whatsapp.com/");
        }
        /* Linkedin */
        else if (transcript.includes("open linkdin")) {
            panduSpeech("opening linkdin!");
            window.open("https://www.linkedin.com");
        }
        /* ChatGPT */
        else if (transcript.includes("open chatgpt")) {
            panduSpeech("opening chatgpt");
            window.open("https://www.chatgpt.com");
        }
        /* Gmail */
        else if (transcript.includes("open gmail")) {
            panduSpeech("opening gmail");
            window.open("https://www.gmail.com");
        }
        /* Twitter */
        else if (transcript.includes("open twitter") || transcript.includes("open x")) {
            panduSpeech("opening x");
            window.open("https://www.twitter.com");
        }
        else {
            panduSpeech("I didn't get you! can you tell me again? please.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen px-4 py-6">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center w-full">
                <Microphone isListening={isListening} />
                <Controls onStart={startListening} onStop={stopListening} isListening={isListening} volume={volume} />
                <UserGuide />
            </main>
            <Footer />
        </div>
    )
}

export default App
