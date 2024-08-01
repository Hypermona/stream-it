// reference -> https://gist.github.com/eYinka/873be69fae3ef27b103681b8a9f5e379

type Props = {
  rating: number;
};

const CircularRating = ({ rating }: Props) => {
  const percentRate = rating * 10;
  const strokeColor =
    percentRate >= 70 ? "text-green-600" : percentRate >= 40 ? "text-yellow-600" : "text-red-600";
  return (
    <div className="w-14 h-14 rounded-[50%] bg-black flex justify-center items-center">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14" viewBox="0 0 100 100">
          <circle
            className="text-gray-700 stroke-current"
            stroke-width="6"
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
            stroke-width="6"
            stroke-linecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke-dasharray="251.2"
            stroke-dashoffset={`calc(251.2px - (251.2px * ${percentRate}) / 100)`}
          ></circle>

          <text
            x="45"
            y="55"
            font-family="Tahoma, sans-serif"
            font-size="35"
            text-anchor="middle"
            alignment-baseline="middle"
            fill="white"
            fontWeight={"bold"}
          >
            {percentRate}
          </text>
          <text
            x="65"
            y="50"
            font-family="Tahoma, sans-serif"
            font-size="20"
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
