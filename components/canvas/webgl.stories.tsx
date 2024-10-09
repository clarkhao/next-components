import type { Meta, StoryObj } from "@storybook/react"
import { CanvasWebgl } from "./webgl"
import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import React from "react"

const WebglDemo = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | undefined>(undefined)
  React.useEffect(() => {
    function handleResize() {
      if (parentRef.current) {
        const { width, height } = parentRef.current.getBoundingClientRect()
        setSize({ width, height })
      }
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect()
      setSize({ width, height })
    }
  }, [])
  return (
    <div style={{width: "400px"}}>
      <AspectRatio ratio={9 / 16} ref={parentRef}>
        {size && (
          <CanvasWebgl
            vsSrc={`
          #version 300 es
          in vec4 position;
          in vec2 texcoord;
          uniform mat4 u_matrix;
          uniform vec2 iResolution;
          out vec2 vTexcoord;
          void main() {
            vec4 screen = u_matrix * position;
            vec2 zeroToOne = screen.xy / iResolution;
            gl_Position = vec4(zeroToOne, 0, 1);
            vTexcoord = texcoord;
          }
          `}
            fsSrc={[
              `
    #version 300 es
    precision highp float;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    out vec4 fragColor;
    #define R iResolution
    #define CO gl_FragCoord 
    #define PI acos(-1.) // Define pi
    #define DIST 2
    const float radius = 0.05;
    vec3 cyl = vec3(0.0);

    void main() {
      float ratio = R.x / R.y;
      vec2 uv = CO.xy * vec2(ratio, 1.) / R.xy;
      vec2 mouse = iMouse.xy * vec2(ratio, 1.) / R.xy;

      vec2 motion = vec2(0., 0.1);

      vec2 mouseDir = normalize(abs(iMouse.zw) - iMouse.xy);
      vec2 dir = normalize(vec2(2.0, 0.));

      // the intersection of DirectionVector and Leftside Page
      vec2 origin = clamp(motion - dir * motion.x / dir.x, 0., 1.);
      // from the mouse(CurlAxix) to origin in the direction of motion
      float  mouseDist = distance(motion, origin);
      // distance Of Fragment to Origin Along DirectionVector
      // uv is the fragment vector, mouseDir is normalized which means it's length is unit 1.
      float proj = dot(uv - origin, dir);
      // distance Of Fragment from CurlAxis
      float dist = proj - mouseDist;

      vec2 linePoint = uv - dist * dir;


      if(dist > radius) {
        // the next page part
        uv = uv * vec2(1. / ratio, 1.);
        fragColor = texture(iChannel1, uv);
        // shadows
        fragColor.rgb *= pow(clamp(dist - radius, 0., 1.) * 1.5, .25);
      } else if(dist >= 0.) {
        // map to cylinder point
        float theta = asin(dist / radius);
        // cylinder front and back part
        vec2 p2 = linePoint + dir * (PI - theta) * radius;
        vec2 p1 = linePoint + dir * theta * (radius);
        //
        uv = (p2.x <= ratio && p2.y <= 1. && p2.x > 0. && p2.y > 0. && p2.x > p1.x) ? p2 : p1;
        uv = uv * vec2(1. / ratio, 1.);
        fragColor = texture(iChannel0, uv);
        // back white
        fragColor = (p2.x <= ratio && p2.y <= 1. && p2.x > 0. && p2.y > 0.) ? mix(vec4(1., 1., 1., 1.), fragColor, 0.2) : fragColor;
        // back shadows
        fragColor.rgb *= pow(clamp((radius - dist) / radius, 0., 1.), .2);

      } else {
        // the unturning part
        vec2 p = linePoint + dir * (abs(dist) + PI * radius);
        uv = (p.x <= ratio && p.y <= 1. && p.x > 0. && p.y > 0.) ? p : uv;
        uv = uv * vec2(1. / ratio, 1.);
        fragColor = (p.x <= ratio && p.y <= 1. && p.x > 0. && p.y > 0.) ? mix(vec4(1., 1., 1., 1.), texture(iChannel0, uv), 0.2) : texture(iChannel0, uv);
      }
    }
    `,
              `
    #version 300 es
    precision highp float;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform float iFrame;
    out vec4 fragColor;
    #define R iResolution
    #define CO gl_FragCoord 
    #define PI acos(-1.) // Define pi
    #define DIST 2
    const float radius = 0.05;
    const float velocity = 0.008;
    vec3 cyl = vec3(0.0);

    float customCos(float x) {
      // Check if x is within the range [0, π/2)
      if (x >= 0.0 && x < PI / 2.) {
          return cos(x);
      } else {
          return 0.0;
      }
    }
    float partCos(float x) {
      return (cos(x) + 1.0) * 0.02 + 0.98;
    }

    void main() {
      float ratio = R.x / R.y;
      vec2 uv = CO.xy * vec2(ratio, 1.) / R.xy;
      vec2 mouse = iMouse.xy * vec2(ratio, 1.) / R.xy;
      vec2 motion = vec2(0.0, 0.1);

      
      if(abs(iMouse.z) > 0. && iFrame * velocity <= PI / 2.) {
        motion = vec2(ratio * abs(customCos(iFrame * velocity)), 0.1);
      } else if (iFrame * velocity > PI / 2.) {
        motion = vec2(ratio * partCos(iTime), 0.4);
      }
      vec2 mouseDir = normalize(abs(iMouse.zw) - iMouse.xy);
      vec2 dir = normalize(vec2(2.0, 0.));
      if(abs(iMouse.z) > 0. && iFrame * velocity <= PI / 2.) {
        dir = normalize(vec2(2.0, 0.1 * abs(customCos(iFrame * velocity))));
      } else if (iFrame * velocity > PI / 2.) {
        dir = normalize(vec2(0.4, 0.1 * partCos(iTime)));
      }

      // the intersection of DirectionVector and Leftside Page
      vec2 origin = clamp(motion - dir * motion.x / dir.x, 0., 1.);
      // from the mouse(CurlAxix) to origin in the direction of motion
      float  mouseDist = distance(motion, origin);
      // distance Of Fragment to Origin Along DirectionVector
      // uv is the fragment vector, mouseDir is normalized which means it's length is unit 1.
      float proj = dot(uv - origin, dir);
      // distance Of Fragment from CurlAxis
      float dist = proj - mouseDist;

      vec2 linePoint = uv - dist * dir;


      if(dist > radius) {
        // the next page part
        uv = uv * vec2(1. / ratio, 1.);
        uv = vec2(uv.x, 1. - uv.y);
        fragColor = texture(iChannel1, uv);
        // shadows
        fragColor.rgb *= pow(clamp(dist - radius, 0., 1.) * 1.5, .25);
      } else if(dist >= 0.) {
        // map to cylinder point
        float theta = asin(dist / radius);
        // cylinder front and back part
        vec2 p2 = linePoint + dir * (PI - theta) * radius;
        vec2 p1 = linePoint + dir * theta * (radius);
        //
        uv = (p2.x <= ratio && p2.y <= 1. && p2.x > 0. && p2.y > 0. && p2.x > p1.x) ? p2 : p1;
        uv = uv * vec2(1. / ratio, 1.);
        uv = vec2(uv.x, 1. - uv.y);
        fragColor = texture(iChannel0, uv);
        // back white
        fragColor = (p2.x <= ratio && p2.y <= 1. && p2.x > 0. && p2.y > 0.) ? mix(vec4(1., 1., 1., 1.), fragColor, 0.2) : fragColor;
        // back shadows
        fragColor.rgb *= pow(clamp((radius - dist) / radius, 0., 1.), .2);

      } else {
        // the unturning part
        vec2 p = linePoint + dir * (abs(dist) + PI * radius);
        uv = (p.x <= ratio && p.y <= 1. && p.x > 0. && p.y > 0.) ? p : uv;
        uv = uv * vec2(1. / ratio, 1.);
        uv = vec2(uv.x, 1. - uv.y);
        fragColor = (p.x <= ratio && p.y <= 1. && p.x > 0. && p.y > 0.) ? mix(vec4(1., 1., 1., 1.), texture(iChannel0, uv), 0.2) : texture(iChannel0, uv);
      }
    }
    `,
            ]}
            imageSrc="https://picsum.photos/id/102/1200/800"
            size={size}
          />
        )}
      </AspectRatio>
    </div>
  )
}

const meta: Meta<typeof WebglDemo> = {
  title: "UI/Canvas",
  component: WebglDemo,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => {
      return <Story />
    },
  ],
}
