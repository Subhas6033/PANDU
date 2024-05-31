/* Elements */
const startBtn = document.querySelector("#vr-start");
const stopBtn = document.querySelector("#vr-stop");
const speakBtn = document.querySelector("#speak");
const image = document.querySelector(".wavy-animation");
/* Speech Recognition setup for PANDU*/

/* Corrected typo in variable name */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Corrected property name */
var recognition = new SpeechRecognition();
/* When the speech is start */
// recognition.continuous = true;       /*It will go continuous*/
recognition.onstart = function () {
};

/* When the speech is End */
recognition.onend = function () {
    image.classList.remove("wavy-animation");
};

startBtn.addEventListener('click', () => {
    recognition.start();
});

// stopBtn.addEventListener('click', () => {
//     recognition.stop();
//     image.classList.remove("wavy-animation");
// });


/* Say on Result */

recognition.onresult = (event) => {
    /* Random works on giving comand*/
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript.toLowerCase();

    /* Normal conversation between user and PANDU */
    if (transcript.includes("hello pandu") || transcript.includes("hii pandu")) {
        panduSpeech("hello sir! how are you");
        if(transcript.includes("hello pandu how are you") || transcript.includes("hii pandu how are you")){
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
        panduSpeech("i am an ai asistant created by subhas, i can do various types of work like i can play songs, search anything by your voice command etc")
    }
    else if (transcript.includes("can you help me")) {
        panduSpeech("yeah sure, how can i help you?");
    }

    /* Youtube + Music + Video section   */
    else if (transcript.includes("open youtube")) {
        panduSpeech("opening youtube !");
        window.open("https://www.youtube.com/");
    }
    else if (transcript.includes("play the")) {
        panduSpeech("here's your results!");
        let input = transcript.split("");
        console.log(input);
        input.splice(0, 8);
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.youtube.com/results?search_query=${input}`);
    }
    else if (transcript.includes("play the favourite song")) {
        panduSpeech("playing your favourite song!");
        window.open("https://youtu.be/Umqb9KENgmk");
    }
    else if (transcript.includes("play a song") || transcript.includes("Play a song for me")) {
        let songs = [
            "https://www.youtube.com/watch?v=YA0fzrnKmCs&list=RDYA0fzrnKmCs&start_radio=1",  //0
            "https://www.youtube.com/watch?v=vZ5Dfc1N17M",  //1  
            "https://www.youtube.com/results?search_query=Malang",   //2 
            "https://www.youtube.com/watch?v=-prV7sth9io&list=RD-prV7sth9io&start_radio=1",  //3 
            "https://www.youtube.com/watch?v=wnfUpOch510&list=RD-prV7sth9io&index=5",  //4 
            "https://www.youtube.com/watch?v=UIamU3ELCd8&list=RD-prV7sth9io&index=7",  //5
            "https://www.youtube.com/watch?v=2uA4XOmsrrA&list=RD-prV7sth9io&index=8",  //6
            "https://www.youtube.com/watch?v=AX7t8ZwroHQ&list=RD-prV7sth9io&index=9",       //7
            "https://www.youtube.com/watch?v=MCVDTLMQBmc&list=RD-prV7sth9io&index=12", //8
            "https://www.youtube.com/watch?v=8NbpwbrJrFA", //9
            "https://www.youtube.com/watch?v=GvXDq-P1NB8",          //      10
            "https://www.youtube.com/watch?v=iid7cxx0keU",    //11
            "https://www.youtube.com/watch?v=zFvLoiq58Nk&list=RDMMzFvLoiq58Nk&start_radio=1", //12
            "https://www.youtube.com/watch?v=TL3jqMCFKDc&list=RDMMzFvLoiq58Nk&index=2", //13
            "https://www.youtube.com/watch?v=zPdMUNoXnB4&list=RDMMzFvLoiq58Nk&index=4",       //14
            "https://www.youtube.com/watch?v=weowPNBgNZ4&list=RDMMzFvLoiq58Nk&index=5", //15
            "https://www.youtube.com/watch?v=4IWOO9luQr4&list=RDMMzFvLoiq58Nk&index=6", //16
            "https://www.youtube.com/watch?v=QJpfLoGMgqU&list=RDMMzFvLoiq58Nk&index=10", //17
            "https://www.youtube.com/watch?v=J3vd-SQvORQ&list=RDMMzFvLoiq58Nk&index=11",        //18
            "https://www.youtube.com/watch?v=E17IF68WoPc&list=RDMMzFvLoiq58Nk&index=14",  //19
        ];

        let randomIndex = Math.floor(Math.random() * songs.length);
        let randomSong = songs[randomIndex];
        panduSpeech("playing a song for you!");
        window.open(randomSong);
    }


    /* Facebook  */
    else if (transcript.includes("open my facebook profile")) {
        panduSpeech("opening your facebook profile sir!");
        window.open("https://www.facebook.com/profile.php?id=100049621998517");
    }
    else if (transcript.includes("open facebook")) {
        panduSpeech("openinig facebook !");
        window.open("https://www.facebook.com");
    }

    /* Google   */
    else if (transcript.includes("open google")) {
        panduSpeech("opening google !");
        window.open("https://www.google.com");
    }

    /* Search anything */
    else if (transcript.includes("search for")) {
        panduSpeech("here's your results!");
        let input = transcript.split("");
        input.splice(0, 11);
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.google.com/search?q=${input}`);
    }

    /* Instagram  */
    else if (transcript.includes("open my instagram profile")) {
        panduSpeech("opening your instagram sir!");
        window.open("https://www.instagram.com/goalkeepersubhas/");
    }
    else if (transcript.includes("open instagram !")) {
        panduSpeech("opening instagram");
        window.open("https://www.instagram.com/");
    }

    /* Github  */
    else if (transcript.includes("open my github profile")) {
        panduSpeech("opening your github profile sir!");
        window.open("https://github.com/Subhas6033");
    }
    else if (transcript.includes("open github")) {
        panduSpeech("opening github");
        window.open("https://github.com/");
    }

    /* Telegram  */
    else if (transcript.includes("open telegram")) {
        panduSpeech("opening telegram!");
        window.open("https://web.telegram.org/k/")
    }

    /* whatsapp  */
    else if (transcript.includes("open whatsapp")) {
        panduSpeech("opening whatsapp!");
        window.open("https://web.whatsapp.com/");
    }
    else if (transcript.includes("open my whatsapp profile")) {
        panduSpeech("opening your whatsapp profile sir!");
        window.open("");
    }

    /* Linkdin */
    else if (transcript.includes("open linkdin")) {
        panduSpeech("opening linkdin!");
        window.open("https://www.linkedin.com");
    }

    /*  ChatGpt*/
    else if (transcript.includes("open chatgpt")) {
        panduSpeech("opening chatgpt");
        window.open("https://www.chatgpt.com");
    }


    /* Gmail */
    else if (transcript.includes("open gmail")) {
        panduSpeech("opening gmail");
        window.open("https://www.gmail.com");
    }

    /* twitter */
    else if (transcript.includes("open twitter") || transcript.includes("open x")) {
        panduSpeech("opening x");
        window.open("https://www.twitter.com");
    }

    /* If any one does not match  */
    else {
        panduSpeech("I didn't get you! can you tell me again? please.");
        window.open("https://127.0.0.1");
    }
};

/*          PANDU speech        */

let panduSpeech = (message) => {
    const speech = new SpeechSynthesisUtterance();
    const differentVoices = speechSynthesis.getVoices();  /*Get different Voices */
    speech.voice = differentVoices[44]; 
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
};

/*  speakBtn.addEventListener('click', () => {
    panduSpeech(`${message}`);
});   */

/* Weather Report */
