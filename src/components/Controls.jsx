export default function Controls({ onStart, isListening, volume, onStop }) {
    return (
        <div className="flex flex-col justify-center items-center gap-6 mb-12">
            {!isListening ? (
                <button
                    onClick={onStart}
                    className="px-8 h-14 w-[400px] bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 text-lg"
                >
                    Start Voice Record
                </button>
            ) : (
                <div className="px-8 w-[400px] flex items-center justify-evenly gap-2 bg-[#6c5ce7] hover:bg-[#5a4ad1] rounded-lg shadow-lg h-14">
                    <SoundBars volume={volume} />
                    <button
                        onClick={onStop}
                        className="h-14 flex items-center  text-white font-semibold  transition-transform transform active:scale-95 text-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-stop-icon lucide-circle-stop"><circle cx="12" cy="12" r="10" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
                    </button>
                </div>
            )}
            <a
                href="#user-guide"
                className="px-8 py-3 text-center bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 text-lg no-underline"
            >
                User-Guide
            </a>
        </div>
    );
};

const SoundBars = ({ volume }) => {
    return (
        <div className="flex items-center gap-1 h-14">
            {[...Array(30)].map((_, i) => {
                const normalized = Math.min(volume / 120, 1);
                const maxHeight = 48;
                const height = Math.max(4, normalized * maxHeight * (0.3 + i / 50));


                return (
                    <div
                        key={i}
                        className="w-1 bg-white rounded-full transition-all duration-75"
                        style={{ height: `${height}px` }}
                    />
                );
            })}
        </div>
    )
}

