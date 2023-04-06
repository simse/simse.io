interface StatusProps {
    status: ConnectionStatus;
}

enum ConnectionStatus {
    CONNECTING = "Connecting...",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected"
}

const Status = ({ status }: StatusProps) => {
    const connectionMessage = (): string => {
        if (status === ConnectionStatus.CONNECTING) {
            return `Connecting...`;
        }

        if (status === ConnectionStatus.CONNECTED) {
            return `Connected to GPT-4`;
        }

        return "Disconnected";
    }

    const connectionColour = (): string => {
        if (status === ConnectionStatus.CONNECTING) {
            return "bg-yellow-600";
        }

        if (status === ConnectionStatus.CONNECTED) {
            return "bg-green-600";
        }

        return "bg-red-600";
    }

    return (
        <div className="py-4 flex gap-2 items-center">
            <div className={`h-2 w-2 ${connectionColour()} rounded-full`}></div>

            <p className="text-zinc-400">{connectionMessage()}</p>
        </div>
    )
}

export default Status;

export {
    ConnectionStatus,
}