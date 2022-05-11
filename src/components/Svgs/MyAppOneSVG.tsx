import * as React from "react";
import { SVGProps } from "react";
import { useAppContext } from "../../Context/AppContext";

const MyAppOneSVG = (props: SVGProps<SVGSVGElement>) => {
  const { color } = useAppContext();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 801 647" {...props}>
      <g data-name="Group 6" transform="translate(-231.222 -125)">
        <path
          data-name="Path 80"
          d="M1001.043 125.001H760.428a51.15 51.15 0 0 0-49.9 39.9L588.952 704.169a41.34 41.34 0 0 0 38.294 50.382l247.355 12.187a54.615 54.615 0 0 0 56.43-44.828l68.97-381.267 5.131 1.466 13.2-72.265-5.281-1.32 19.251-106.426a31.493 31.493 0 0 0-31.25-37.1Z"
          fill="#3f3d56"
        />
        <path
          data-name="Path 81"
          d="M792.101 136.626h-28.084a35.349 35.349 0 0 0-34.536 27.813l-116.7 534.868a21.9 21.9 0 0 0 19.969 26.524l246.551 16.16a28.367 28.367 0 0 0 29.773-23.277l99.58-552.838a24.846 24.846 0 0 0-24.452-29.25h-26.643a11.726 11.726 0 0 0-11.323 8.677 10.352 10.352 0 0 1-10 7.661H809.748a17.7 17.7 0 0 1-17.647-16.338Z"
          fill="#fff"
        />
        <path
          data-name="Path 93"
          d="M928.395 510.544a2 2 0 0 0 2.036-1.638l54.523-300.917a2.021 2.021 0 0 0-.417-1.632 1.962 1.962 0 0 0-1.5-.729l-248.059-2.93h-.023a1.988 1.988 0 0 0-1.925 1.562l-64.276 291.15a2.021 2.021 0 0 0 .356 1.648 1.964 1.964 0 0 0 1.473.785Z"
          fill="#e6e6e6"
        />
        <path
          data-name="Path 94"
          d="M713.13 530a1 1 0 0 0-.973.773l-2.323 9.956a1 1 0 0 0 .9 1.225l131.23 9.327a1.009 1.009 0 0 0 1.053-.807l2.234-11.519a1 1 0 0 0-.922-1.188l-131.138-7.765Z"
          fill="#e6e6e6"
        />
        <path
          data-name="Path 95"
          d="M872.567 588.262a1 1 0 0 0 1.051-.758l2.844-11.543a1 1 0 0 0-.9-1.237l-167.589-11.721a.989.989 0 0 0-1.029.713l-2.955 9.975a1 1 0 0 0 .878 1.28Z"
          fill="#e6e6e6"
        />
        <path
          data-name="Path 96"
          d="M863.567 625.262a1 1 0 0 0 1.051-.758l2.844-11.543a1 1 0 0 0-.9-1.237l-167.589-11.721a.989.989 0 0 0-1.029.713l-2.955 9.975a1 1 0 0 0 .878 1.28Z"
          fill="#e6e6e6"
        />
        <path
          data-name="Path 79"
          d="M573 755.52c0 8.369-76.605 9.26-170.889 15.153-94.2 5.887-170.889-6.784-170.889-15.153s77.047-25.207 170.889-15.153C496.395 750.469 573 747.151 573 755.52Z"
          fill="#e6e6e6"
        />
        <path
          data-name="Path 97"
          d="M786.382 688.514a.989.989 0 0 0 1.064-.754l6.013-24.051a1 1 0 0 0-.886-1.24l-102.916-8.656a1.018 1.018 0 0 0-1.06.779l-5.129 23.083a1 1 0 0 0 .883 1.213Z"
          fill={color.primary}
        />
        <path
          data-name="Path 111"
          d="M370.831 590.507a10.743 10.743 0 0 0 1.582-16.4l4.167-93.018-21.215 2.381 1.233 90.985a10.8 10.8 0 0 0 14.234 16.048Z"
          fill="#a0616a"
        />
        <path
          data-name="Path 112"
          d="m409.534 747.966 12.075 2.123 11.934-45.564-15.821-3.133Z"
          fill="#a0616a"
        />
        <path
          data-name="Path 113"
          d="m442.928 765.394-37.949-6.671 2.578-14.662 23.287 4.094a14.887 14.887 0 0 1 12.084 17.24Z"
          fill="#2f2e41"
        />
        <path
          data-name="Path 114"
          d="M376.392 754.01h12.26l5.832-47.288H376.39Z"
          fill="#a0616a"
        />
        <path
          data-name="Path 115"
          d="m412.292 765.396-38.531.002-.001-14.887 23.644-.002a14.887 14.887 0 0 1 14.888 14.887Z"
          fill="#2f2e41"
        />
        <path
          data-name="Path 116"
          d="M427.541 737.06a4.735 4.735 0 0 1-.572-.034l-14.43-1.187a4.881 4.881 0 0 1-4.243-5.659l14.325-70.681-9-47.474a1.627 1.627 0 0 0-3.219.16l-13.261 120.627a4.924 4.924 0 0 1-5.21 4.437l-13.595-.506a4.888 4.888 0 0 1-4.536-4.631l1.086-145.768 70.481-8.81 4.924 76.041-.02.081-17.991 79.675a4.886 4.886 0 0 1-4.739 3.729Z"
          fill="#2f2e41"
        />
        <circle
          data-name="Ellipse 16"
          cx={24.561}
          cy={24.561}
          r={24.561}
          transform="translate(373.568 371.694)"
          fill="#a0616a"
        />
        <path
          data-name="Path 117"
          d="M421.271 597.437a20.111 20.111 0 0 1-10.857-3.106c-11.9-7.436-25.411-4.481-32.407-2.057a4.88 4.88 0 0 1-4.221-.481 4.811 4.811 0 0 1-2.224-3.552l-12.721-113.625c-2.132-19.038 9.336-36.937 27.268-42.56q1.011-.317 2.055-.6a39.569 39.569 0 0 1 32.972 5.723 40.2 40.2 0 0 1 17.167 29.353l10.711 114.387a4.807 4.807 0 0 1-1.527 4.007c-3.756 3.472-14.654 12.51-26.216 12.511Z"
          fill={color.primary}
        />
        <path
          data-name="Path 118"
          d="m382.53 498.982-28.7-3.156a5.717 5.717 0 0 1-4.905-7.134l7.306-27.846a15.879 15.879 0 1 1 31.556 3.563l1.085 28.675a5.718 5.718 0 0 1-6.338 5.9Z"
          fill={color.primary}
        />
        <path
          data-name="Path 119"
          d="M448.897 586.524a10.743 10.743 0 0 0-.406-16.468l-7.073-92.842-20.789 4.68 12.2 90.414a10.8 10.8 0 0 0 16.064 14.216Z"
          fill="#a0616a"
        />
        <path
          data-name="Path 120"
          d="M412.66 493.146a5.711 5.711 0 0 1-1.818-4.4l1.085-28.675a15.878 15.878 0 1 1 31.556-3.563l7.306 27.846a5.717 5.717 0 0 1-4.905 7.134l-28.7 3.156a5.711 5.711 0 0 1-4.52-1.5Z"
          fill={color.primary}
        />
        <path
          data-name="Path 121"
          d="M396.668 421.741a5.683 5.683 0 0 1-1.3-.151l-.125-.03c-21.594-3.3-26.367-15.812-27.414-21.035-1.084-5.408.15-10.628 2.94-12.656-1.521-4.8-1.277-9.061.727-12.662 3.5-6.28 11.081-8.4 12.1-8.664 6.058-4.469 13.306-1.486 14.625-.881 11.719-4.335 16.2-.727 17.008.079 5.238.941 8.431 2.964 9.491 6.016 1.991 5.731-4.305 12.86-4.574 13.161l-.14.156-9.38.447a6.358 6.358 0 0 0-5.981 7.317 29.611 29.611 0 0 0 .96 3.355c1.6 5.006 2.8 9.283 1.254 10.909a2.51 2.51 0 0 1-2.625.455c-1.467-.392-2.462-.31-2.958.245-.77.859-.535 3.035.662 6.125a5.739 5.739 0 0 1-1.046 5.847 5.568 5.568 0 0 1-4.226 1.967Z"
          fill="#2f2e41"
        />
      </g>
    </svg>
  );
};

export default MyAppOneSVG;
