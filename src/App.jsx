import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Microphone from './components/Microphone';
import Controls from './components/Controls';
import UserGuide from './components/UserGuide';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { processVoiceCommand } from './services/geminiService'; 
import ToastContainer from './components/ToastContainer';
import { useToast } from './context/ToastContext';

function App() {
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const recognitionRef = useRef(null);
    const streamRef = useRef(null);
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
        streamRef.current = stream;

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

    const handleCommand = async (transcript) => {
        try {
            const aiResponse = await processVoiceCommand(transcript);
            console.log("AI Response:", aiResponse);

            if (aiResponse.reply) {
                panduSpeech(aiResponse.reply);
                toast.success(aiResponse.reply);
            }

            if (aiResponse.action === "open_url" && aiResponse.url) {
                window.open(aiResponse.url, "_blank");
            } 
        } catch (error) {
            console.error("Error handling command:", error);
            panduSpeech("Sorry, I encountered an error while processing your request.");
            toast.error("Error processing request with AI.");
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
export default App;