import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Microphone from './components/Microphone';
import Controls from './components/Controls';
import UserGuide from './components/UserGuide';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import ToastContainer from './components/ToastContainer';
import { useToast } from './context/ToastContext';

function App() {
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const recognitionRef = useRef(null);
    const toast = useToast();

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                toast.success('Listening... Speak your command!');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript.toLowerCase();
                toast.info(`Recognized: "${transcript}"`);
                handleCommand(transcript);
                stopListening();
            };

            recognitionRef.current.onerror = (event) => {
                toast.error(`Speech recognition error: ${event.error}`);
                stopListening();
            };
        } else {
            toast.warning('Speech Recognition is not supported in this browser.');
            console.warn("Speech Recognition API not supported in this browser.");
        }
    }, []);

    const startListening = async () => {
        if (!recognitionRef.current) return;

        try {
            recognitionRef.current.start();
            await startVolumeDetection();
        } catch (error) {
            toast.error('Failed to start voice recognition. Please try again.');
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
            toast.success('Opening YouTube...');
            window.open("https://www.youtube.com/");
        }
        else if (transcript.includes("play the")) {
            panduSpeech("here's your results!");
            toast.success('Searching for your request...');
            // Extract song name: remove "play the"
            let query = transcript.replace("play the", "").trim();
            query = query.split(" ").join("+");
            window.open(`https://www.youtube.com/results?search_query=${query}`);
        }
        else if (transcript.includes("play the favourite song")) {
            panduSpeech("playing your favourite song!");
            toast.success('Playing your favourite song!');
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
            toast.success('Playing a random song for you!');
            window.open(randomSong);
        }
        /* Facebook */
        else if (transcript.includes("open my facebook profile")) {
            panduSpeech("opening your facebook profile sir!");
            toast.success('Opening your Facebook profile...');
            window.open("https://www.facebook.com/profile.php?id=100049621998517");
        }
        else if (transcript.includes("open facebook")) {
            panduSpeech("openinig facebook !");
            toast.success('Opening Facebook...');
            window.open("https://www.facebook.com");
        }
        /* Google */
        else if (transcript.includes("open google")) {
            panduSpeech("opening google !");
            toast.success('Opening Google...');
            window.open("https://www.google.com");
        }
        /* Search anything */
        else if (transcript.includes("search for")) {
            panduSpeech("here's your results!");
            toast.success('Searching Google for your query...');
            let query = transcript.replace("search for", "").trim();
            query = query.split(" ").join("+");
            window.open(`https://www.google.com/search?q=${query}`);
        }
        /* Instagram */
        else if (transcript.includes("open my instagram profile")) {
            panduSpeech("opening your instagram sir!");
            toast.success('Opening your Instagram profile...');
            window.open("https://www.instagram.com/goalkeepersubhas/");
        }
        else if (transcript.includes("open instagram")) {
            panduSpeech("opening instagram");
            toast.success('Opening Instagram...');
            window.open("https://www.instagram.com/");
        }
        /* Github */
        else if (transcript.includes("open my github profile")) {
            panduSpeech("opening your github profile sir!");
            toast.success('Opening your GitHub profile...');
            window.open("https://github.com/Subhas6033");
        }
        else if (transcript.includes("open github")) {
            panduSpeech("opening github");
            toast.success('Opening GitHub...');
            window.open("https://github.com/");
        }
        /* Telegram */
        else if (transcript.includes("open telegram")) {
            panduSpeech("opening telegram!");
            toast.success('Opening Telegram...');
            window.open("https://web.telegram.org/k/")
        }
        /* Whatsapp */
        else if (transcript.includes("open whatsapp")) {
            panduSpeech("opening whatsapp!");
            toast.success('Opening WhatsApp...');
            window.open("https://web.whatsapp.com/");
        }
        /* Linkedin */
        else if (transcript.includes("open linkdin")) {
            panduSpeech("opening linkdin!");
            toast.success('Opening LinkedIn...');
            window.open("https://www.linkedin.com");
        }
        /* ChatGPT */
        else if (transcript.includes("open chatgpt")) {
            panduSpeech("opening chatgpt");
            toast.success('Opening ChatGPT...');
            window.open("https://www.chatgpt.com");
        }
        /* Gmail */
        else if (transcript.includes("open gmail")) {
            panduSpeech("opening gmail");
            toast.success('Opening Gmail...');
            window.open("https://www.gmail.com");
        }
        /* Twitter */
        else if (transcript.includes("open twitter") || transcript.includes("open x")) {
            panduSpeech("opening x");
            toast.success('Opening X (Twitter)...');
            window.open("https://www.twitter.com");
        }
        else {
            panduSpeech("I didn't get you! can you tell me again? please.");
            toast.warning('Command not recognized. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen px-4 py-6 transition-colors duration-300">
            <div className="flex justify-end px-2 mb-2">
                <ThemeToggle />
            </div>
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center w-full">
                <Microphone isListening={isListening} />
                <Controls onStart={startListening} onStop={stopListening} isListening={isListening} volume={volume} />
                <UserGuide />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default App
