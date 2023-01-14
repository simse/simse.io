<script>
let conversation = [
    "Hello! Welcome to the chatbot experiment.",
];

let currentMessage = "";
let sessionId = "";

// create new session
fetch('https://chatbot-v1.simse.io/session', {
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    sessionId = data.session_id;

    console.log(sessionId);
})

const submitMessage = () => {
    conversation = [...conversation, currentMessage];
    currentMessage = "";
}
</script>

<div class="max-w-lg mx-auto flex flex-col h-[50vh]">
    <div class="bg-gray-900 bg-purple-900"></div>

    {#each conversation as message, i}
    <div class={` w-4/5 p-2 mb-4 ${(i % 2 !== 0) ? 'ml-auto bg-gray-900' : 'bg-purple-900'}`}>
        <p>{message}</p>
    </div>
    {/each}

    <div class="grid grid-cols-6 gap-2 mt-auto">
        <input bind:value={currentMessage} class="bg-gray-900 p-4 col-span-5 outline-none" placeholder="Type your message here..." type="text" />
        <button on:click={submitMessage} class="col-span-1 bg-purple-900">Send</button>
    </div>
</div>