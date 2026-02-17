export default function Controls({ onStart, isListening }) {
    return (
        <div className="flex flex-wrap justify-center gap-6 mb-12">
            <button
                onClick={onStart}
                className="px-8 py-3 bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 text-lg"
            >
                {isListening ? "Listening..." : "Start Voice Record"}
            </button>
            <a
                href="#user-guide"
                className="px-8 py-3 bg-[#6c5ce7] hover:bg-[#5a4ad1] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 text-lg no-underline"
            >
                User-Guide
            </a>
        </div>
    );
}
