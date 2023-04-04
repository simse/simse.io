import { useState } from "preact/hooks";

interface InputProps {
    placeholder: string;
    disabled: boolean;
    onSubmit: (message: string) => void;
}

const Input = ({ placeholder, disabled, onSubmit }: InputProps) => {
    const [text, setText] = useState("");

    const handleInput = (e: any) => {
        const target = e.target as HTMLInputElement;
        // console.log(target)
        setText(target.value);
    }

    const handleSubmit = () => {
        onSubmit(text);
        setText("");
    }

    return (
        <div className={`flex gap-1 w-full`}>
                <input
                    className="bg-zinc-900 py-3 px-4 text-xl w-5/6 active:outline outline-2 inset outline-blue-600 border-0"
                    type="text"
                    placeholder={placeholder}
                    value={text}
                    onInput={handleInput}
                    onKeyDown={(e) => e.code === "Enter" ? handleSubmit() : null} />

                <button
                    className="bg-blue-600 w-1/6 disabled:bg-zinc-700 disabled:hover:cursor-not-allowed"
                    disabled={disabled}
                    onClick={handleSubmit}>Send</button>
            </div>
    );
}

export default Input;