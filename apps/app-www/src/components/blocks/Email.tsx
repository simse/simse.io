import { prettyDatetime } from "src/utils/date";
import { RichTextBlock } from "./RichText";

interface EmailBlockProps {
    to: string;
    from: string;
    subject: string;
    date: string;
    body: any;
}

const EmailBlock = ({ to, from, subject, date, body }: EmailBlockProps) => {
    return (
        <div className="border-2 border-white/20 rounded py-2 px-4 mb-4">
            <div className="gap-2 ">
                <div><span className="text-sm font-bold text-zinc-400 mr-2">TO</span> {to}</div>
                <div><span className="text-sm font-bold text-zinc-400 mr-2">FROM</span> {from}</div>
                <div><span className="text-sm font-bold text-zinc-400 mr-2">SUBJECT</span> {subject}</div>
                <div><span className="text-sm font-bold text-zinc-400 mr-2">DATE</span> {prettyDatetime(date)}</div>
            </div>

            <div className="text-white">
                <RichTextBlock elements={body} />
            </div>
        </div>
    )
}

export default EmailBlock;