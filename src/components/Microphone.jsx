import micImg from '../assets/Mic.jpg';

export default function Microphone({ isListening }) {
    return (
        <div className={`relative flex justify-center items-center my-12 transition-transform duration-500 ${isListening ? 'scale-110' : ''}`}>
            {/* Container to center everything */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex justify-center items-center">

                {/* The Rotating Gradient Ring */}
                <div className="glow-ring-border w-full h-full absolute inset-0 rounded-full"></div>

                {/* The Static Image */}
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-[#1e1e2f] shadow-2xl">
                    <img
                        src={micImg}
                        alt="Microphone"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

