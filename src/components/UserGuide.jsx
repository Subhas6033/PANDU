export default function UserGuide() {
    const apps = [
        "Facebook", "Youtube", "Whatsapp", "Instagram", "Telegram",
        "Github", "Linkedin", "ChatGpt", "Gmail", "Twitter or X"
    ];

    return (
        <div id="user-guide" className="max-w-4xl mx-auto bg-white dark:bg-[#242442] p-8 rounded-2xl shadow-xl mb-12 border border-gray-200 dark:border-blue-900/30 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-center text-[#00d2ff] mb-8">
                Commands you should follow to use these features:
            </h2>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-lg mb-8 list-disc pl-6">
                <li>Use only English language.</li>
                <li>Don't use bad words otherwise it won't work fine.</li>
                <li>Most probably it can't run on Google Chrome, so download Microsoft Edge to use it.</li>
                <li>To find and play a song, just say: "Play the (Your desired song name) song".</li>
                <li>List of the work which PANDU can do:</li>
                <li>He can open the app given below by your command. Command is: ("Open (your desired app name)")</li>
            </ul>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {apps.map((app) => (
                    <div key={app} className="bg-gray-100 dark:bg-[#4a4a6a] hover:bg-gray-200 dark:hover:bg-[#5b5b85] p-4 rounded-lg text-center text-gray-800 dark:text-white font-medium transition-colors cursor-default shadow-md">
                        {app}
                    </div>
                ))}
            </div>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-lg mb-6 list-disc pl-6">
                <li>He can search anything in Google.</li>
                <li>To search anything in Google just say: search for "Your desired search". Example: to search the weather, say: "search for today's weather".</li>
            </ul>

            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-xl text-center shadow-lg mt-8">
                <p className="text-xl md:text-2xl text-white font-semibold italic">
                    Hope you enjoy it... More features are on the way, stay tuned with me...
                </p>
            </div>
        </div>
    );
}
