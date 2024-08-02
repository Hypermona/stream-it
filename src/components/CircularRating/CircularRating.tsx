// reference -> https://gist.github.com/eYinka/873be69fae3ef27b103681b8a9f5e379

type Props = {
  rating: number;
  width?: string;
  height?: string;
};

const CircularRating = ({ rating, width = "14", height = "14" }: Props) => {
  const percentRate = rating * 10;
  const strokeColor =
    percentRate >= 70 ? "text-green-600" : percentRate >= 40 ? "text-yellow-600" : "text-red-600";
  return (
    <div
      className={`w-${width} h-${height} rounded-[50%] bg-black flex justify-center items-center`}
    >
      <div className={`relative w-14 h-14`}>
        <svg className={`w-${width} h-${height}`} viewBox="0 0 100 100">
          <circle
            className="text-gray-700 stroke-current"
            strokeWidth="6"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            style={{
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
            className={strokeColor + " progress-ring__circle stroke-current"}
            strokeWidth="6"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={`calc(251.2px - (251.2px * ${percentRate}) / 100)`}
          ></circle>

          <text
            x="45"
            y="55"
            fontFamily="Tahoma, sans-serif"
            fontSize="35"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="white"
            fontWeight={"bold"}
          >
            {percentRate}
          </text>
          <text
            x="65"
            y="50"
            fontFamily="Tahoma, sans-serif"
            fontSize="20"
            fill="gray"
            fontWeight={"bold"}
          >
            %
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CircularRating;
