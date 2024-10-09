import { KeyRound, Mail, User } from "lucide-react"
import { HTMLAttributes } from "react"

type TSVGProps = HTMLAttributes<SVGElement>

export const PaperPlane = ({ className, ...props }: TSVGProps) => {
  return (
    <svg
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>paperplane</title>{" "}
        <path
          className={className}
          d="M3.363 4.414l4.875 19.348 9.467-3.018-8.448-10.298 10.902 9.56 8.853-2.77-25.649-12.822zM18.004 27.586v-5.324l-3.116 0.926 3.116 4.398z"
        ></path>{" "}
      </g>
    </svg>
  )
}

export const AppleIcon = ({ className, ...props }: TSVGProps) => {
  return (
    <>
      <svg
        viewBox="0 0 512.00 512.00"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
        className={className}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="7935ec95c421cee6d86eb22ecd114eed">
            {" "}
            <path
              className={className}
              style={{ display: "inline" }}
              d="M248.644,123.476c-5.45-29.71,8.598-60.285,25.516-80.89 c18.645-22.735,50.642-40.17,77.986-42.086c4.619,31.149-8.093,61.498-24.826,82.965 C309.37,106.527,278.508,124.411,248.644,123.476z M409.034,231.131c8.461-23.606,25.223-44.845,51.227-59.175 c-26.278-32.792-63.173-51.83-97.99-51.83c-46.065,0-65.542,21.947-97.538,21.947c-32.96,0-57.965-21.947-97.866-21.947 c-39.127,0-80.776,23.848-107.19,64.577c-9.712,15.055-16.291,33.758-19.879,54.59c-9.956,58.439,4.916,134.557,49.279,202.144 c21.57,32.796,50.321,69.737,87.881,70.059c33.459,0.327,42.951-21.392,88.246-21.616c45.362-0.258,53.959,21.841,87.372,21.522 c37.571-0.317,67.906-41.199,89.476-73.991c15.359-23.532,21.167-35.418,33.11-62.023 C414.435,352.487,389.459,285.571,409.034,231.131z"
            >
              {" "}
            </path>{" "}
          </g>{" "}
        </g>
      </svg>
    </>
  )
}

export const GoogleIcon = ({ className, ...props }: TSVGProps) => {
  return (
    <svg {...props} viewBox="-0.5 0 48 48" version="1.1" className={className}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs>{" "}
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          {" "}
          <g id="Color-" transform="translate(-401.000000, -860.000000)">
            {" "}
            <g id="Google" transform="translate(401.000000, 860.000000)">
              {" "}
              <path
                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                id="Fill-1"
                fill="#FBBC05"
              >
                {" "}
              </path>{" "}
              <path
                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                id="Fill-2"
                fill="#EB4335"
              >
                {" "}
              </path>{" "}
              <path
                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                id="Fill-3"
                fill="#34A853"
              >
                {" "}
              </path>{" "}
              <path
                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                id="Fill-4"
                fill="#4285F4"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  )
}

export const InputIcon = (config: string, className: string) => {
  switch (config) {
    case "name":
      return <User className={className} />
    case "email":
      return <Mail className={className} />
    case "password":
      return <KeyRound className={className} />
    default:
      return <></>
  }
}

export const HandPen = ({ className, ...props }: TSVGProps) => {
  return (
    <svg viewBox="-51.2 -51.2 614.40 614.40" className={className}>
      <g className="hand-group" strokeWidth="0.00512" stroke="#000000">
        <path
          className="st0"
          d="M495.321,273.871l-48.112-3.983l-84.553-107.053c-7.581-12.133-20.998-24.196-37.769-33.996 c-1.468-0.839-2.952-1.66-4.455-2.446l53.388-78.037c2.69-3.921,4.106-8.49,4.106-13.224c0-7.757-3.808-15.006-10.22-19.374 L350.672,4.114C346.776,1.424,342.199,0,337.395,0c-7.722,0-14.954,3.808-19.322,10.202l-69.974,102.285h-74.657 c-13.495,0.576-24.746,2.9-34.388,7.11c-9.905,4.306-18.658,10.988-25.716,19.548l-51.046,48.443 c-9.442,8.718-16.151,19.34-19.934,31.602c-2.934,9.452-3.842,18.536-4.568,25.838l-0.21,2.062l-13.033,95.682 c-1.388,6.009-2.105,11.704-2.105,16.927c-0.053,16.125,6.569,26.17,10.517,30.712c4.979,5.783,9.949,8.334,11.023,8.796 c1.765,1.057,3.616,1.86,5.486,2.402l-17.19,24.667c-0.498,0.716-0.542,1.703-0.402,2.586L13.569,507.72 c-0.315,1.397,0.244,2.856,1.433,3.668c0.594,0.411,1.292,0.612,1.974,0.612c0.69,0,1.38-0.201,1.974-0.603l66.664-45.482 c0.944-0.122,1.826-0.646,2.402-1.485l45.578-66.611c3.066,1.266,6.281,2.148,9.617,2.62c1.625,2.839,3.616,5.504,5.94,7.931 c4.787,5.066,15.679,13.565,35.01,13.565c8.717,0,18.622-1.799,29.471-5.345c6.743,5.11,13.879,9.355,21.767,12.971 c18.273,8.368,38.634,12.508,57.912,15.722c14.212,2.367,32.03,3.572,52.941,3.582c31.76-0.009,60.637-2.752,67.014-3.398 l81.409,8.324c0.122,0,0.227,0.017,0.349,0.017c0.874,0,1.695-0.323,2.342-0.908c0.734-0.656,1.153-1.599,1.153-2.586V277.357 C498.518,275.531,497.137,274.028,495.321,273.871z M329.796,18.221c1.782-2.638,4.664-4.018,7.634-4.036 c1.817,0,3.599,0.524,5.206,1.616l0.542,0.385l16.526,11.294c2.621,1.808,4.019,4.682,4.019,7.651c0,1.8-0.507,3.581-1.608,5.206 l-8.647,12.648L321.13,30.86L329.796,18.221z M42.656,478.039l-1.721,1.188l-5.337-3.651l0.471-2.027l8.945-38.537l30.31,20.736 L42.656,478.039z M54.404,398.823c0.262,0.008,0.533,0.114,0.795,0.114c0.148,0,0.279-0.044,0.42-0.053l-0.647,0.935 c-0.017-0.044,0-0.097-0.017-0.14C54.842,399.346,54.57,399.12,54.404,398.823z M89.78,349.864l-23.994,34.45 c-2.359,0.734-4.438,1.485-6.098,2.026c-1.974,0.646-3.406,0.944-4.489,0.944c-1.144-0.026-2.079-0.192-3.808-1.258l-0.385-0.236 l-0.332-0.149l-0.55-0.297c-1.266-0.716-4.428-2.795-7.206-6.769c-2.777-3.992-5.31-9.826-5.328-18.876c0-4,0.507-8.638,1.8-13.976 l0.062-0.297l13.162-96.485v-0.087c0.813-7.984,1.538-16.614,4.202-25.165c2.681-8.552,7.154-17.016,15.801-25.026l51.509-48.88 l0.226-0.28c6.088-7.442,12.744-12.526,20.746-16.02c7.984-3.485,17.426-5.38,28.912-5.869l67.957,0.017l-58.646,85.724 l-5.171-6.743l-40.32,30.895l-2.708,5.572c-0.803-0.358-1.65-0.742-2.55-1.17c-4.438-2.079-9.784-4.69-14.029-6.769 c-4.227-2.08-7.328-3.634-7.337-3.634l-5.206,10.412c0.009,0,5.572,2.795,11.984,5.913c1.223,0.603,2.481,1.197,3.73,1.808 c-0.2,0.036-0.392,0.053-0.594,0.088c-0.035,0.009-0.07,0.018-0.096,0.018v0.017c-9.32,1.895-17.278,7.652-22.134,15.67 l-0.176,0.279l-5.537,9.232l-0.262,0.428c-3.214,5.407-4.804,11.443-4.795,17.418c-0.009,8.542,3.222,17.033,9.45,23.54l1.73,1.791 L89.78,349.864z M177.617,221.698l-24.85,36.311l-5.765-3.048l-0.009,0.008c-1.171-0.794-2.393-1.511-3.651-2.166l3.764-7.722 L177.617,221.698z M139.018,383.686l15.286-22.344l20.562,15.871c-10.788,6.404-19.251,8.543-25.646,8.534 C145.185,385.73,141.848,384.917,139.018,383.686z M184.16,406.798c-12.963-0.07-19.828-4.578-24.073-8.902 c-0.507-0.532-0.856-1.056-1.293-1.58c7.687-1.625,16.29-5.276,25.89-11.512l9.005,6.952c3.38,4.368,6.892,8.316,10.508,11.95 C196.302,405.906,189.663,406.798,184.16,406.798z M483.371,437.404l-70.106-7.17l-0.611,0.07 c-0.018,0.009-1.939,0.218-5.451,0.541c-10.517,0.952-34.905,2.883-60.952,2.874c-17.347,0.009-35.428-0.865-50.461-3.371 c-21.435-3.564-39.07-7.661-54.085-14.553c-15.024-6.918-27.55-16.509-39.315-31.786l-0.463-0.603l-92.187-71.232l-3.764-3.905 l0.008,0.009c-4.106-4.289-6.21-9.861-6.219-15.486c0-3.948,1.031-7.888,3.162-11.443l-0.253,0.411l6.175-10.281 c3.25-5.346,8.482-9.102,14.578-10.325l0.158-0.036l-0.061,0.018c1.476-0.332,2.952-0.489,4.437-0.489 c1.956,0,3.904,0.28,5.834,0.821l0.105,0.035c2.446,0.646,4.769,1.764,6.988,3.337l0.332,0.244l78.299,41.403l33.157-1.8 l-0.629-11.617v-0.009l-29.934,1.616l-15.452-8.167L308.675,137.39c2.917,1.407,5.8,2.908,8.612,4.551 c14.115,8.158,26.623,19.077,32.772,29.262l0.175,0.306L439.4,284.432l43.971,3.651V437.404z"
        ></path>
      </g>
    </svg>
  )
}
