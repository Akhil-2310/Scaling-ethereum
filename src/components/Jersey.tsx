import React from "react";

const JerseySVG: React.FC<{ fillColor: string }> = ({ fillColor }) => (
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 128.614962, 127.237703)">
      <path
        d="M 279.007 12.595 L 261.453 48.373 C 256.678 58.12 245.172 62.291 235.265 57.894 C 227.035 54.231 217.467 49.911 209.388 46.067 L 209.388 194.077 L 204.197 196.904 C 201.858 198.183 180.259 208.84 111.788 209.97 L 111.788 210.074 C 109.752 210.074 107.776 210.063 105.812 210.046 C 103.847 210.063 101.873 210.074 99.837 210.074 L 99.837 209.97 C 31.369 208.84 9.765 198.183 7.427 196.904 L 2.235 194.077 L 2.235 46.059 C -5.841 49.902 -15.412 54.229 -23.641 57.885 C -33.556 62.291 -45.057 58.104 -49.836 48.365 L -67.326 12.702 C -71.9 3.394 -68.511 -8.072 -59.605 -13.394 C -38.173 -26.21 13.064 -56.873 25.889 -64.784 C 48.404 -78.672 99.079 -78.093 105.797 -77.961 C 109.847 -78.037 158.792 -78.774 185.087 -65.151 C 198.894 -57.993 250.133 -26.552 271.521 -13.366 C 280.378 -7.907 283.596 3.249 279.007 12.595 Z M 70.943 -56.499 C 86.632 -32.503 104.979 -32.87 105.145 -32.903 L 106.472 -32.903 C 107.162 -32.851 125.054 -32.628 140.562 -56.28 C 126.483 -57.924 112.891 -58.21 106.051 -58.038 L 105.589 -58.038 C 98.458 -58.203 84.731 -57.965 70.943 -56.499 Z"
        style={{
          stroke: "rgb(174, 195, 110)",
          paintOrder: "fill",
          fill: fillColor,
        }}
      ></path>
    </g>
  </svg>
);

export default JerseySVG;