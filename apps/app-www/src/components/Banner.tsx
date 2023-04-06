import { AlertTriangle } from "preact-feather";

interface BannerProps {
    title: string;
    type: BannerType;
    message?: Element;
}

enum BannerType {
    Error,
    Warning,
    Info,
}

const Banner = ({ title, type, message }: BannerProps) => {
    const icon = () => {
        switch (type) {
            case BannerType.Error:
                return <AlertTriangle />;
            case BannerType.Warning:
                return <AlertTriangle  />;
            case BannerType.Info:
                return <AlertTriangle />;
        }
    };

    const colour = () => {
        switch (type) {
            case BannerType.Error:
                return "bg-red-600 text-red-100";
            case BannerType.Warning:
                return "bg-yellow-400 text-black";
            case BannerType.Info:
                return "bg-blue-600 text-blue-100";
        }
    };

    return (
        <div className={`${colour()} p-4`}>
            <div className="flex gap-2">
                <div className="flex-shrink-0">{icon()}</div>

                <p className="font-bold">{title}</p>
                {message}
            </div>
        </div>
    )
};

export default Banner;

export {
    BannerType,
}